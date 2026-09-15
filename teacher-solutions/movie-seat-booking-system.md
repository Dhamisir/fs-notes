# Assignment 11 — Teacher Solution

**Instructor-only.** Do not share this file with students. The student-facing
material is [`README.md`](README.md), [`client/`](client/), [`server/`](server/),
[`database/`](database/), and [`test/`](test/).

## Problem Being Discovered

The student is expected to discover that **"read the current state, then
decide, then write"** is not a safe pattern once more than one request can be
in flight for the same row at the same time — even though each individual
request, read top to bottom, looks completely correct.

The starter `server/server.js` already implements every check the assignment
lists: it confirms the show exists, confirms the seat belongs to that show,
confirms the seat isn't already booked, then updates the seat and inserts the
booking. It is not a stub the student has to finish — it is a complete,
readable implementation that passes every manual test they will try first.
That's the point: the bug is invisible from reading the code sequentially.
It only shows up under real overlapping requests, which is why the assignment
insists on the `test/concurrency-test.js` script instead of clicking buttons
by hand.

By the end, the student should be able to explain, in their own words, why
two requests that each individually "do the right thing" can still produce a
wrong combined result, and how to make the two operations behave as one
indivisible unit.

## Why The Initial Implementation Can Fail

Look at the booking handler in `server/server.js`:

```js
const [seats] = await database.query(
  "SELECT id, status FROM seats WHERE id = ? AND show_id = ?",
  [seatId, showId]
);
// ... status check ...
await database.query("UPDATE seats SET status = 'BOOKED' WHERE id = ?", [seatId]);
await database.query("INSERT INTO bookings (show_id, seat_id, user_id) VALUES (?, ?, ?)", [showId, seatId, userId]);
```

This is a **check-then-act** sequence spread across three separate,
independent statements, each of which round-trips to MySQL on its own
connection-level operation and commits immediately (MySQL's default
`autocommit` mode commits every individual statement as soon as it runs).
Nothing ties the `SELECT` and the following `UPDATE`/`INSERT` together as one
unit, and nothing stops a second, unrelated request from running its own
`SELECT` in the gap before the first request's `UPDATE` has landed.

Node's request handling makes this worse, not better, in the good sense of
"worse" — Express handles each incoming request on its own async flow, and
`await`ing a MySQL query yields control back to the event loop while it waits
for the network round trip to the database. Two `POST /api/bookings` requests
that arrive close together will have their `await database.query(SELECT...)`
calls genuinely interleaved by the runtime. No `setTimeout`, `sleep()`, or
artificial delay is needed to produce this — it is the ordinary behavior of
an async server talking to a database, and it is exactly what happens in a
real ticket-booking system in production when a popular show is about to
sell out.

## Concept Discovered

The concept the student is meant to arrive at is: **a group of database
operations that must be treated as a single, indivisible unit of work, so
that no other operation can see or act on a half-finished result.** In
relational databases this unit is called a **transaction**, and the property
that guarantees "all of it happens, or none of it happens, with nothing else
allowed to see it half-done" is called **atomicity**. To make the "is this
seat still free?" check and the "mark it booked" write behave as one
indivisible step relative to other requests touching the *same row*, the
database needs to be told to hold an exclusive claim on that row for the
duration of the check-and-write — this is **row-level locking**, requested in
MySQL with **`SELECT ... FOR UPDATE`** inside a transaction.

## Step-by-Step Explanation

Walk through the two competing requests against the flawed implementation,
both targeting seat A5 (currently `AVAILABLE`):

```text
Time   Request A (User 1)                    Request B (User 2)
----   ------------------------------------   ------------------------------------
t0     SELECT status FROM seats WHERE id=5
       -> AVAILABLE
t1                                            SELECT status FROM seats WHERE id=5
                                               -> AVAILABLE   (A hasn't written yet)
t2     status === 'AVAILABLE' -> proceed
t3                                            status === 'AVAILABLE' -> proceed
t4     UPDATE seats SET status='BOOKED'
       WHERE id=5
t5     INSERT INTO bookings (...)
       -> booking #1 created
t6                                            UPDATE seats SET status='BOOKED'
                                               WHERE id=5   (already booked, but
                                               this UPDATE doesn't know that)
t7                                            INSERT INTO bookings (...)
                                               -> booking #2 created
```

Both requests read `AVAILABLE` at t0/t1, because neither has written anything
yet. Both requests then pass their check at t2/t3 for the same reason. By the
time either request writes anything, it's too late for the other one to
notice — it already finished reading. The result: two rows in `bookings` for
the same seat, and both users get a 201 success response. The final `status`
column even still says `BOOKED` (not corrupted), which is why this bug is
easy to miss if the only thing checked afterward is the seat's status column
instead of counting rows in `bookings`.

The fix has to close the gap between "read" and "write" so that the second
request's read cannot happen until the first request's write (and decision)
has fully landed.

## Database Solution

Two changes, used together:

**1. A safety net at the schema level.** Add a uniqueness rule so the
database itself refuses a second booking row for the same seat, no matter
what the application code does:

```sql
ALTER TABLE bookings
  ADD CONSTRAINT unique_seat_booking UNIQUE (seat_id);
```

This alone prevents two `bookings` rows for the same seat — the second
`INSERT` will throw a duplicate-key error. But by itself it's a blunt
instrument: the losing request finds out only after attempting a write that
fails with a generic database error, the `seats.status` column can still race
independently, and the error has to be translated back into a clean 409
response. It's a good backstop, not a substitute for controlling the race
directly.

**2. Making the check-and-write indivisible using a transaction with a row
lock.** The core fix is to wrap the read, the check, and the write in a
transaction, and to make the read acquire an exclusive lock on that seat's
row with `SELECT ... FOR UPDATE`:

```sql
START TRANSACTION;

SELECT id, status
FROM seats
WHERE id = ? AND show_id = ?
FOR UPDATE;

-- application checks status here --

UPDATE seats SET status = 'BOOKED' WHERE id = ?;

INSERT INTO bookings (show_id, seat_id, user_id) VALUES (?, ?, ?);

COMMIT;
```

`FOR UPDATE` tells MySQL (InnoDB) to take an exclusive lock on the row(s)
matched by that `SELECT`, held until the surrounding transaction ends. A
second transaction that also runs `SELECT ... FOR UPDATE` on the same seat
row does not get a stale, independent read the way it did before — it
**blocks** and waits until the first transaction commits or rolls back. Once
it's unblocked, it does its own fresh `SELECT`, which now correctly shows
`status = 'BOOKED'`, and it rejects the booking instead of racing ahead.

**Why the lock only works inside a transaction:** outside of an explicit
transaction, MySQL's default `autocommit` mode commits — and releases any
locks taken — as soon as each individual statement finishes. A `SELECT ...
FOR UPDATE` run on its own would acquire the lock and then immediately
release it when that single statement completes, before the application even
gets a chance to run its `UPDATE`. The lock is only useful for the length of
time it's actually held, and `START TRANSACTION ... COMMIT` is what defines
that held duration — it's what turns "lock, then act, then release" into one
continuous unit instead of an instantly-released no-op.

**When `COMMIT` happens:** after the `UPDATE` and `INSERT` both succeed. This
releases the row lock and makes the new `status = 'BOOKED'` and the new
`bookings` row permanently visible to every other connection, including any
transaction that was blocked waiting for this row.

**When `ROLLBACK` happens:** whenever the transaction cannot be allowed to
take effect — the seat turns out to already be booked once the lock is
acquired, the seat/show doesn't match, or any query inside the transaction
throws an unexpected error. Rolling back releases the lock without applying
any of the transaction's writes, exactly as if none of it had happened.

**How the losing request should behave:** it still runs its full sequence —
it acquires the lock only after the winner releases it (by commit), then sees
`status = 'BOOKED'` on its own fresh read, and responds with a `409 Conflict`
and a clear message, without touching `seats` or `bookings` at all.

## Node.js Solution

```js
app.post("/api/bookings", async (request, response) => {
  const { showId, seatId, userId } = request.body;

  if (!showId || !seatId || !userId) {
    return response.status(400).json({ message: "showId, seatId, and userId are required." });
  }

  const connection = await database.getConnection();

  try {
    await connection.beginTransaction();

    const [shows] = await connection.query("SELECT id FROM shows WHERE id = ?", [showId]);
    if (shows.length === 0) {
      await connection.rollback();
      return response.status(404).json({ message: "Show not found." });
    }

    const [seats] = await connection.query(
      "SELECT id, status FROM seats WHERE id = ? AND show_id = ? FOR UPDATE",
      [seatId, showId]
    );
    if (seats.length === 0) {
      await connection.rollback();
      return response.status(404).json({ message: "Seat does not belong to this show." });
    }

    const seat = seats[0];
    if (seat.status === "BOOKED") {
      await connection.rollback();
      return response.status(409).json({ message: "This seat is no longer available." });
    }

    await connection.query("UPDATE seats SET status = 'BOOKED' WHERE id = ?", [seatId]);

    const [result] = await connection.query(
      "INSERT INTO bookings (show_id, seat_id, user_id) VALUES (?, ?, ?)",
      [showId, seatId, userId]
    );

    await connection.commit();

    response.status(201).json({
      bookingId: result.insertId,
      seatId,
      showId,
      userId,
      message: "Seat booked successfully.",
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    response.status(500).json({ message: "Booking could not be completed." });
  } finally {
    connection.release();
  }
});
```

Key differences from the starter code:

- Every query in the handler runs on the **same checked-out connection**
  (`connection.query`, not `database.query`) — locks and transaction state in
  MySQL are per-connection, so mixing pool-level queries back in would defeat
  the transaction entirely.
- `SELECT ... FOR UPDATE` replaces the plain `SELECT` for the seat lookup.
- Every response path either `commit`s (only after both writes succeed) or
  `rollback`s (on every early return and in the `catch` block) before the
  function returns.
- `connection.release()` runs in `finally`, so the connection always goes
  back to the pool, whether the request succeeded, was rejected, or errored.

## Concurrency Test

`test/concurrency-test.js` (already provided to the student) fires several
`POST /api/bookings` requests for the same seat at once using `Promise.all`,
without any artificial delay — the overlap comes from real, independent HTTP
requests hitting the server concurrently, the same way real users' clicks
would:

```js
const requests = Array.from({ length: REQUEST_COUNT }, (_, index) => bookSeat(seat.id, (index % 2) + 1));
const results = await Promise.all(requests);
```

Have the student run it once against the untouched starter code, and again
after applying the fix above:

```bash
node test/concurrency-test.js
```

## Expected Result

**Before the fix**, database state for seat A5 after running the test with,
say, `REQUEST_COUNT=10`:

```text
seats:     id=5  status='BOOKED'
bookings:  seat_id=5, user_id=1
           seat_id=5, user_id=2   <-- should not exist
           seat_id=5, user_id=1   <-- should not exist
           ... (several rows, count varies run to run)
```

The script reports more than one `201` response.

**After the fix**, running the same test against a freshly seeded seat:

```text
seats:     id=5  status='BOOKED'
bookings:  seat_id=5, user_id=1        <-- exactly one row

```

The script reports exactly one `201` and the rest as `409 Conflict` with the
message `"This seat is no longer available."`. Running it repeatedly, or
raising `REQUEST_COUNT`, does not change that outcome — it stays exactly one
success every time.

## Common Wrong Solutions

Point these out if students land on them — each looks reasonable and each
fails in a specific, demonstrable way with the concurrency test:

- **Checking availability in the React frontend before allowing the booking
  click.** This only prevents one browser tab from double-clicking; it does
  nothing about two different users' requests arriving at the backend at the
  same time, since the backend never asked the frontend for permission.

- **Re-fetching the seat map right before booking, to "double check."** Still
  a separate read followed by a separate write, with the same gap in between
  — it just makes the gap slightly later, not gone.

- **Adding an in-memory flag or lock in the Node process (e.g., a `Set` of
  "seats currently being booked").** Works only as long as there is exactly
  one Node process with no restarts. It silently stops working the moment the
  app runs more than one server instance behind a load balancer, which is
  normal for production traffic — the two competing requests may not even
  land on the same process.

- **Relying only on the `UNIQUE` constraint on `bookings.seat_id`, with no
  transaction or lock, and just catching the duplicate-key error.** This
  actually does stop a second row from being inserted, so it's better than
  nothing — but the `seats.status` update still races independently of the
  `bookings` insert, the losing request finds out only via a raw duplicate-key
  database error that has to be pattern-matched and translated, and there's
  no point where the "is it available?" check and the write are treated as
  one step, so the code is harder to reason about even though it happens to
  behave correctly for this exact case.

- **Wrapping the queries in `START TRANSACTION` / `COMMIT` without `FOR
  UPDATE`.** A transaction alone does not stop another transaction from
  reading the same row before this one commits, under MySQL's default
  isolation behavior for plain reads — the two transactions still each read
  `AVAILABLE` independently unless the read explicitly takes a lock. The
  transaction boundary matters for *when the lock is released*, but the lock
  itself is what creates the block in the first place.

- **Retrying the whole request automatically on conflict, without fixing the
  read-then-write gap.** Retries don't address the root cause; they just
  mean the flawed sequence runs again, with the same gap, on the next
  attempt. It can even make things worse under load.

## Teaching Notes

Suggested order for walking a student through this after they've attempted
it and run the concurrency test themselves:

1. Ask them to describe, out loud, what their `POST /api/bookings` handler
   does, one line at a time — most will describe it correctly and confidently,
   which is the point: the bug isn't in any single line.
2. Ask them what happens if another request runs one of those lines *in
   between* two of their lines. Let them find the SELECT/UPDATE gap
   themselves rather than pointing at it.
3. Ask what would need to be true for that gap to be impossible to land in —
   steer them toward "the two operations need to be treated as one," without
   supplying the vocabulary yet.
4. Only once they've articulated that in their own words, introduce the
   terms: transaction, atomicity, row-level locking, `SELECT ... FOR UPDATE`.
   Landing the vocabulary after the insight sticks far better than handing it
   out first.
5. Have them re-run `test/concurrency-test.js` after their fix and compare
   the "before" and "after" output side by side — the contrast is the
   strongest evidence that the concept actually solved something real.

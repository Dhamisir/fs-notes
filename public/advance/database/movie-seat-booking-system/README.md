# Assignment 11 — Student Problem

A full-stack challenge built with React, Node.js, Express, JavaScript, and MySQL.

## Problem

You are building the booking flow for a movie ticket platform. Customers open
a show, look at the seat map, pick an open seat, and confirm their booking.

Everything looks fine when people book different seats. But cinema releases
sell out fast, and the last few seats of a popular show get clicked by many
people within the same second. Your job is to make sure the booking flow
holds up when that happens — not just when it doesn't.

## Business Scenario

```text
Movie: Avengers: Endgame
Show:  7:00 PM, Screen 1

Seats: A1  A2  A3  A4  A5
```

Only **one seat (A5)** is left. Two different customers have the app open at
the same time.

- Both customers see seat **A5** as available.
- Both customers click **Book** within the same instant.
- Both requests arrive at your backend almost simultaneously.

## Requirements

Build a complete booking application:

1. **React frontend**
2. **Node.js + Express backend**
3. **MySQL database**

## Database Requirements

Design a schema with at least these tables:

- `users`
- `movies`
- `shows`
- `seats`
- `bookings`

You may add more tables if your design needs them. Starter schema and seed
data are provided in [`database/`](database/) — you are free to extend them.

## API Requirements

Your backend must expose:

- An endpoint to list shows.
- An endpoint to list the seats for a show (with their current status).
- An endpoint to book a seat.

Every booking request must:

- Verify the show exists.
- Verify the seat exists.
- Verify the seat belongs to that show.
- Verify the seat is not already booked.
- Create the booking record.
- Update whatever state your design uses to track seat availability.

Responses must clearly distinguish between a successful booking and a
rejected one, with a useful message in both cases.

## Frontend Requirements

The React app must:

- Show the movie and show information.
- Display the seat map with available and booked seats visually distinguished.
- Let the user select an open seat.
- Let the user confirm the booking.
- Show a clear success or failure message after the attempt.

A starter frontend and backend are provided in [`client/`](client/) and
[`server/`](server/). Read through `server/server.js` before you change
anything — it already implements every check listed above.

## Concurrency Challenge

Booking different seats at the same time is not the hard case — your system
should already handle that correctly.

The hard case is this:

```text
User A → book seat A5
User B → book seat A5

(sent at nearly the same moment)
```

Required outcome, every single time:

```text
User A → SUCCESS      User A → FAILURE
    OR
User B → FAILURE      User B → SUCCESS
```

**Never** both SUCCESS. The database must never end up showing seat A5 as
booked twice, and it must never end up showing A5 as available again after
someone has already booked it. The losing request must get a clear response
telling the user the seat is no longer available.

## Acceptance Criteria

- [ ] The frontend and backend run without errors against a fresh database.
- [ ] Booking two different seats at the same time succeeds for both.
- [ ] Booking the same seat twice, one after another, correctly rejects the
      second attempt.
- [ ] Sending many booking requests for the **same** seat at nearly the same
      time results in **exactly one** success, no matter how many requests
      were sent.
- [ ] After such a burst of requests, the database shows exactly one booking
      row for that seat, and the seat's stored status is consistent with
      that booking.
- [ ] Rejected requests return a clear, distinct message from successful ones.

## Testing Requirements

You must test two different scenarios:

1. **Different seats, same time** — two (or more) users book different
   seats at the same time. All of them should succeed.
2. **Same seat, same time** — several users try to book the *same* seat at
   nearly the same time. Only one should succeed.

Testing scenario 2 by clicking around in the browser is not reliable enough —
you need a way to fire several booking requests for the same seat at once and
inspect what comes back. A script for this is provided at
[`test/concurrency-test.js`](test/concurrency-test.js). Run it with:

```bash
node test/concurrency-test.js
```

It sends multiple simultaneous booking requests for the same seat and prints
how many succeeded. Use it before and after you change your booking logic,
and include the output you observed in your submission.

## What You Should Investigate

Before you assume your booking endpoint is correct, investigate it:

- Run the concurrency test against your first working version. What happens?
- Look at your server logs — in what order did the checks and writes for
  each request actually run?
- Look at the database directly after a burst of simultaneous requests. How
  many booking rows exist for the seat? What is the seat's stored status?
- Does the outcome change if you run the test again? Is it consistent, or
  does it sometimes pass and sometimes fail?

Think carefully about this question, and be honest with yourself about the
answer:

> **What happens if two requests both read the same database state before
> either one of them writes anything back?**

Do not assume that "check if it's available, then save the booking" is safe
just because it reads correctly from top to bottom. Prove it to yourself
with the test script, using real requests — not by adding artificial delays
to your code.

---

## Project Structure

```text
movie-seat-booking-system/
├── client/     React frontend (Vite)
├── server/     Node.js, Express, and MySQL backend
├── database/   Schema and seed data
└── test/       Concurrency testing script
```

## Getting Started

Requires Node.js 18+ and a running MySQL server.

1. Create the database:

   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p < database/seed.sql
   ```

2. Start the backend:

   ```bash
   cd server
   cp .env.example .env
   npm install
   npm run dev
   ```

3. Start the frontend, in a separate terminal:

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Run the concurrency test, in a separate terminal, once the backend is running:

   ```bash
   node test/concurrency-test.js
   ```

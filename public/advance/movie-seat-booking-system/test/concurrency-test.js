// Fires many booking requests for the SAME seat at nearly the same time
// so you can observe how your backend behaves under real overlap.
//
// Usage:
//   node test/concurrency-test.js
//
// Optional environment variables:
//   BASE_URL       backend URL (default http://localhost:4000)
//   SHOW_ID        show to book against (default 1)
//   SEAT_LABEL     seat to target (default A5)
//   REQUEST_COUNT  number of simultaneous requests to fire (default 10)

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
const SHOW_ID = Number(process.env.SHOW_ID || 1);
const SEAT_LABEL = process.env.SEAT_LABEL || "A5";
const REQUEST_COUNT = Number(process.env.REQUEST_COUNT || 10);

async function getSeatId() {
  const response = await fetch(`${BASE_URL}/api/shows/${SHOW_ID}/seats`);
  if (!response.ok) {
    throw new Error(`Could not load seats for show ${SHOW_ID} (status ${response.status}).`);
  }
  const seats = await response.json();
  const seat = seats.find((item) => item.seat_label === SEAT_LABEL);
  if (!seat) {
    throw new Error(`Seat ${SEAT_LABEL} was not found for show ${SHOW_ID}.`);
  }
  return seat;
}

async function bookSeat(seatId, userId) {
  const response = await fetch(`${BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ showId: SHOW_ID, seatId, userId }),
  });
  const body = await response.json();
  return { status: response.status, body };
}

async function run() {
  const seat = await getSeatId();

  if (seat.status === "BOOKED") {
    console.log(`Seat ${SEAT_LABEL} is already booked. Reset the database (re-run seed.sql) and try again.`);
    return;
  }

  console.log(`Firing ${REQUEST_COUNT} simultaneous booking requests for seat ${SEAT_LABEL} (id ${seat.id})...\n`);

  const requests = Array.from({ length: REQUEST_COUNT }, (_, index) => bookSeat(seat.id, (index % 2) + 1));
  const results = await Promise.all(requests);

  const successes = results.filter((result) => result.status === 201);
  const failures = results.filter((result) => result.status !== 201);

  console.log("--- RESULTS ---");
  console.log(`Successful bookings: ${successes.length}`);
  console.log(`Rejected requests:   ${failures.length}\n`);

  successes.forEach((result, index) => console.log(`SUCCESS #${index + 1}:`, result.body));
  failures.forEach((result, index) => console.log(`REJECTED #${index + 1}: [${result.status}] ${result.body.message}`));

  console.log("\n--- VERDICT ---");
  if (successes.length > 1) {
    console.log(`FAIL: ${successes.length} requests succeeded for the same seat. Only one should ever succeed.`);
  } else if (successes.length === 1) {
    console.log("PASS: exactly one booking succeeded for this seat.");
  } else {
    console.log("No booking succeeded. Make sure the seat was AVAILABLE before running this test.");
  }
}

run().catch((error) => {
  console.error("Concurrency test failed to run:", error.message);
  process.exitCode = 1;
});

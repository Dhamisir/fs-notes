require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/shows", async (request, response) => {
  try {
    const [shows] = await database.query(
      `SELECT shows.id, shows.screen_name, shows.show_time,
              movies.id AS movie_id, movies.title, movies.duration_minutes
       FROM shows
       JOIN movies ON movies.id = shows.movie_id
       ORDER BY shows.id`
    );
    response.json(shows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Shows could not be loaded." });
  }
});

app.get("/api/shows/:showId/seats", async (request, response) => {
  const { showId } = request.params;

  try {
    const [seats] = await database.query(
      "SELECT id, seat_label, status FROM seats WHERE show_id = ? ORDER BY seat_label",
      [showId]
    );
    response.json(seats);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Seats could not be loaded." });
  }
});

app.post("/api/bookings", async (request, response) => {
  const { showId, seatId, userId } = request.body;

  if (!showId || !seatId || !userId) {
    return response.status(400).json({ message: "showId, seatId, and userId are required." });
  }

  try {
    const [shows] = await database.query("SELECT id FROM shows WHERE id = ?", [showId]);
    if (shows.length === 0) {
      return response.status(404).json({ message: "Show not found." });
    }

    const [seats] = await database.query(
      "SELECT id, status FROM seats WHERE id = ? AND show_id = ?",
      [seatId, showId]
    );
    if (seats.length === 0) {
      return response.status(404).json({ message: "Seat does not belong to this show." });
    }

    const seat = seats[0];
    if (seat.status === "BOOKED") {
      return response.status(409).json({ message: "This seat is no longer available." });
    }

    await database.query("UPDATE seats SET status = 'BOOKED' WHERE id = ?", [seatId]);

    const [result] = await database.query(
      "INSERT INTO bookings (show_id, seat_id, user_id) VALUES (?, ?, ?)",
      [showId, seatId, userId]
    );

    response.status(201).json({
      bookingId: result.insertId,
      seatId,
      showId,
      userId,
      message: "Seat booked successfully.",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Booking could not be completed." });
  }
});

app.listen(port, () => {
  console.log(`Movie Seat Booking backend runs on port ${port}`);
});

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/registrations", async (request, response) => {
  try {
    const [registrations] = await database.query(
      "SELECT id, name, email, age, event_name AS eventName, created_at AS createdAt FROM registrations ORDER BY id DESC",
    );
    response.json(registrations);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Registrations could not be loaded." });
  }
});

app.post("/registrations", async (request, response) => {
  try {
    const { name, email, age, eventName } = request.body;

    // Student challenge: check every incoming value before storing it.

    const [result] = await database.execute(
      "INSERT INTO registrations (name, email, age, event_name) VALUES (?, ?, ?, ?)",
      [name, email, age, eventName],
    );

    response.status(201).json({
      id: result.insertId,
      name,
      email,
      age,
      eventName,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Registration could not be saved." });
  }
});

app.listen(port, () => {
  console.log(`Event Registration backend runs on port ${port}`);
});


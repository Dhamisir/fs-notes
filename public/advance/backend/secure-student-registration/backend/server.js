require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/students", async (request, response) => {
  try {
    const [students] = await database.query(
      "SELECT id, name, email, password, course FROM students ORDER BY id DESC",
    );

    response.json(students);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not load student records." });
  }
});

app.post("/students", async (request, response) => {
  try {
    const { name, email, password, course } = request.body;

    // Student challenge: do not save the original password value.
    const passwordToStore = password;

    const [result] = await database.execute(
      "INSERT INTO students (name, email, password, course) VALUES (?, ?, ?, ?)",
      [name, email, passwordToStore, course],
    );

    response.status(201).json({
      id: result.insertId,
      name,
      email,
      password: passwordToStore,
      course,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not register student." });
  }
});

app.listen(port, () => {
  console.log(`Secure Student Registration backend runs on port ${port}`);
});


require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/register", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const [result] = await database.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
    );

    response.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Account could not be created." });
  }
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const [users] = await database.execute(
      "SELECT id FROM users WHERE email = ? AND password = ? LIMIT 1",
      [email, password],
    );

    if (users.length === 0) {
      return response.status(401).json({ message: "Email or password is incorrect." });
    }

    return response.json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Login could not be completed." });
  }
});

app.get("/notes", async (request, response) => {
  // Student challenge: return notes for the user making this request.
  response.status(501).json({ message: "Complete the private notes challenge." });
});

app.post("/notes", async (request, response) => {
  // Student challenge: connect this note to the user making this request.
  response.status(501).json({ message: "Complete the private notes challenge." });
});

app.listen(port, () => {
  console.log(`Private Notes backend runs on port ${port}`);
});


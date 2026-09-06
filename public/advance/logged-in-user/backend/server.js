require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const [students] = await database.execute(
      "SELECT id FROM students WHERE email = ? AND password = ? LIMIT 1",
      [email, password],
    );

    if (students.length === 0) {
      return response.status(401).json({ message: "Email or password is incorrect." });
    }

    return response.json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Login could not be completed." });
  }
});

app.get("/profile", async (request, response) => {
  // Student challenge: identify the student making this request.
  response.status(501).json({ message: "Complete the profile challenge." });
});

app.listen(port, () => {
  console.log(`Logged-In User backend runs on port ${port}`);
});


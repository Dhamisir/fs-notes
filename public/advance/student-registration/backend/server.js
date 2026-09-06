require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let students = [];
let nextId = 1;

app.get("/students", (request, response) => {
  response.json(students);
});

app.post("/students", (request, response) => {
  const student = {
    id: nextId,
    name: request.body.name,
    email: request.body.email,
    course: request.body.course,
  };

  nextId += 1;
  students.push(student);

  response.status(201).json(student);
});

// Student challenge: replace temporary storage with permanent MySQL storage.

app.listen(port, () => {
  console.log(`Student Registration backend runs on port ${port}`);
});


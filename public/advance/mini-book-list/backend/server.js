const cors = require("cors");
const express = require("express");
const books = require("./books");

const app = express();
const port = 3000;

app.use(cors());

// Student challenge: make the books available to the frontend.
void books;

app.listen(port, () => {
  console.log(`Mini Book List backend runs on port ${port}`);
});


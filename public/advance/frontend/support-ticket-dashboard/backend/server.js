const cors = require("cors");
const express = require("express");
const tickets = require("./tickets");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Test-only switches for exercising the endpoint's different conditions
// locally: ?delay=<ms>, ?fail=true, ?empty=true. None of these are used by
// the frontend by default.
app.get("/api/tickets", (request, response) => {
  const delayMs = Number(request.query.delay) || 0;

  setTimeout(() => {
    if (request.query.fail === "true") {
      response.status(500).json({ error: "Failed to load tickets." });
      return;
    }

    if (request.query.empty === "true") {
      response.json([]);
      return;
    }

    response.json(tickets);
  }, delayMs);
});

app.listen(port, () => {
  console.log(`Support Ticket Dashboard backend runs on port ${port}`);
});

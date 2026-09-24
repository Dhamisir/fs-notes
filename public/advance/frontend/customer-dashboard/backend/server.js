const cors = require("cors");
const express = require("express");
const customers = require("./customers");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Test-only switches for exercising the endpoint's different conditions
// locally: ?delay=<ms>, ?fail=true, ?empty=true. None of these are used by
// the frontend by default.
app.get("/api/customers", (request, response) => {
  const delayMs = Number(request.query.delay) || 0;

  setTimeout(() => {
    if (request.query.fail === "true") {
      response.status(500).json({ error: "Failed to load customers." });
      return;
    }

    if (request.query.empty === "true") {
      response.json([]);
      return;
    }

    response.json(customers);
  }, delayMs);
});

app.listen(port, () => {
  console.log(`Customer Dashboard backend runs on port ${port}`);
});

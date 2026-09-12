require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/products/count", async (request, response) => {
  try {
    const [[{ total }]] = await database.query("SELECT COUNT(*) AS total FROM products");
    response.json({ total });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Product count could not be loaded." });
  }
});

app.get("/products/search", async (request, response) => {
  const term = (request.query.q || "").trim();

  if (!term) {
    return response.json({ results: [], durationMs: 0 });
  }

  const startedAt = Date.now();

  try {
    const [results] = await database.query(
      "SELECT id, name, price FROM products WHERE name LIKE ? ORDER BY id LIMIT 50",
      [`%${term}%`],
    );
    const durationMs = Date.now() - startedAt;
    response.json({ results, durationMs });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Search could not be completed." });
  }
});

app.listen(port, () => {
  console.log(`Product Search backend runs on port ${port}`);
});

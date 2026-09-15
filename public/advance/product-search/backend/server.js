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
  const whereClause = term ? "WHERE p.name LIKE ?" : "";
  const params = term ? [`%${term}%`] : [];

  const startedAt = Date.now();

  try {
    const [results] = await database.query(
      `SELECT
         p.id,
         p.name,
         p.price,
         GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories,
         COALESCE(SUM(oi.quantity), 0) AS unitsSold
       FROM products p
       LEFT JOIN product_categories pc ON pc.product_id = p.id
       LEFT JOIN categories c ON c.id = pc.category_id
       LEFT JOIN order_items oi ON oi.product_id = p.id
       ${whereClause}
       GROUP BY p.id, p.name, p.price
       ORDER BY p.id
       LIMIT 50`,
      params,
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

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const pool = require("./database/connection");

const app = express();
const PORT = process.env.PORT || 4000;
let databaseQueries = 0;

app.use(cors());
app.use(express.json());

app.get("/api/products/:id", async (req, res, next) => {
  try {
    const startedAt = performance.now();
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.price,
        p.updated_at,
        c.name AS category,
        COALESCE(SUM(oi.quantity), 0) AS units_sold,
        ROUND(COALESCE(AVG(r.rating), 0), 1) AS average_rating
      FROM products p
      JOIN categories c ON c.id = p.category_id
      LEFT JOIN order_items oi ON oi.product_id = p.id
      LEFT JOIN reviews r ON r.product_id = p.id
      WHERE p.id = ?
      GROUP BY p.id, p.name, p.price, p.updated_at, c.name
    `, [req.params.id]);

    databaseQueries += 1;
    if (rows.length === 0) return res.status(404).json({ message: "Product not found." });

    res.json({
      product: rows[0],
      databaseQueries,
      databaseMs: Number((performance.now() - startedAt).toFixed(2)),
    });
  } catch (error) { next(error); }
});

app.patch("/api/products/:id/price", async (req, res, next) => {
  try {
    const price = Number(req.body.price);
    if (!Number.isFinite(price) || price <= 0) return res.status(400).json({ message: "A valid price is required." });
    const [result] = await pool.query("UPDATE products SET price = ? WHERE id = ?", [price, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Price updated." });
  } catch (error) { next(error); }
});

app.get("/api/status", async (req, res) => {
  try { await pool.query("SELECT 1"); res.json({ status: "ok", databaseQueries }); }
  catch { res.status(503).json({ status: "unavailable" }); }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "The server could not complete the request." });
});

app.listen(PORT, () => console.log("Product Catalog API running at http://localhost:" + PORT));

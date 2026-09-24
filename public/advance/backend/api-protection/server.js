require("dotenv").config();
const express = require("express");
const path = require("node:path");
const pool = require("./database");
const app = express(); const PORT = process.env.PORT || 4000; let processedSearches = 0;
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/products/search", async (req, res, next) => {
  try {
    const query = String(req.query.q || "").trim().toLowerCase(); const startedAt = performance.now();
    const [results] = await pool.query(`SELECT p.id, p.name, p.price, p.popularity, c.name AS category, i.quantity, i.warehouse FROM products p JOIN categories c ON c.id = p.category_id JOIN inventory i ON i.product_id = p.id WHERE LOWER(p.name) LIKE ? OR LOWER(p.description) LIKE ? ORDER BY p.popularity DESC LIMIT 20`, ["%" + query + "%", "%" + query + "%"]);
    processedSearches += 1;
    res.json({ query, count: results.length, databaseMs: Number((performance.now() - startedAt).toFixed(2)), processedSearches, results });
  } catch (error) { next(error); }
});
app.get("/api/status", async (req, res) => { try { await pool.query("SELECT 1"); res.json({ status: "ok", database: "connected", processedSearches }); } catch { res.status(503).json({ status: "unavailable", database: "disconnected" }); } });
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ message: "The server could not complete the request." }); });
app.listen(PORT, () => console.log("Product Search API running at http://localhost:" + PORT));

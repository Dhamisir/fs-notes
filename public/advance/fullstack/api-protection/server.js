const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 4000;

const adjectives = ["Wireless", "Portable", "Smart", "Compact", "Premium", "Classic", "Eco", "Ultra"];
const products = ["Keyboard", "Mouse", "Monitor", "Speaker", "Charger", "Camera", "Headphones", "Backpack"];
const categories = ["Electronics", "Office", "Gaming", "Travel", "Home"];

const catalog = Array.from({ length: 25000 }, (_, index) => ({
  id: index + 1,
  name: `${adjectives[index % adjectives.length]} ${products[(index * 3) % products.length]} ${index + 1}`,
  category: categories[index % categories.length],
  price: Number((19.99 + (index % 480)).toFixed(2)),
  popularity: (index * 37) % 1000,
}));

let processedSearches = 0;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/products/search", (req, res) => {
  const query = String(req.query.q || "").trim().toLowerCase();
  const startedAt = performance.now();

  const results = catalog
    .filter((product) => product.name.toLowerCase().includes(query))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  processedSearches += 1;

  res.json({
    query,
    count: results.length,
    processingMs: Number((performance.now() - startedAt).toFixed(2)),
    processedSearches,
    results,
  });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", catalogSize: catalog.length, processedSearches });
});

app.listen(PORT, () => {
  console.log(`Product Search API running at http://localhost:${PORT}`);
});

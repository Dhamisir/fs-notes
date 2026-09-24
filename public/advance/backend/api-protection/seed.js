require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const mysql = require("mysql2/promise");
const PRODUCT_COUNT = Number(process.env.PRODUCT_COUNT || 100000);
const BATCH_SIZE = 5000;
const categories = ["Computers", "Phones", "Audio", "Gaming", "Office", "Cameras", "Wearables", "Accessories"];
const adjectives = ["Wireless", "Portable", "Smart", "Compact", "Premium", "Classic", "Eco", "Ultra"];
const types = ["Keyboard", "Mouse", "Monitor", "Speaker", "Charger", "Camera", "Headphones", "Backpack"];
async function seed() {
  const admin = await mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, multipleStatements: true });
  await admin.query(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8")); await admin.end();
  const db = await mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  await db.query("INSERT INTO categories (name) VALUES ?", [categories.map((name) => [name])]);
  for (let offset = 0; offset < PRODUCT_COUNT; offset += BATCH_SIZE) {
    const count = Math.min(BATCH_SIZE, PRODUCT_COUNT - offset);
    const products = Array.from({ length: count }, (_, row) => { const i = offset + row; return [(i % categories.length) + 1, adjectives[i % adjectives.length] + " " + types[(i * 3) % types.length] + " " + (i + 1), "Reliable product for everyday use. Catalog item " + (i + 1) + ".", (19.99 + (i % 900)).toFixed(2), (i * 37) % 1000]; });
    const [result] = await db.query("INSERT INTO products (category_id, name, description, price, popularity) VALUES ?", [products]);
    const inventory = Array.from({ length: count }, (_, row) => [result.insertId + row, (offset + row) % 250, "Warehouse " + (((offset + row) % 4) + 1)]);
    await db.query("INSERT INTO inventory (product_id, quantity, warehouse) VALUES ?", [inventory]);
    console.log("Seeded " + Math.min(offset + count, PRODUCT_COUNT) + " / " + PRODUCT_COUNT + " products");
  }
  await db.end(); console.log("Catalog ready.");
}
seed().catch((error) => { console.error("Seeding failed:", error.message); process.exit(1); });

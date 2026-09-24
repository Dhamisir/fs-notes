require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const mysql = require("mysql2/promise");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
};

const categoryNames = ["Computers", "Phones", "Audio", "Gaming", "Home Office", "Cameras", "Wearables", "Accessories"];
const adjectives = ["Essential", "Studio", "Ultra", "Smart", "Portable", "Wireless", "Professional", "Compact"];
const nouns = ["Laptop", "Display", "Speaker", "Keyboard", "Camera", "Headset", "Charger", "Watch"];

async function seed() {
  const admin = await mysql.createConnection(config);
  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  await admin.query(schema);
  await admin.end();
  const db = await mysql.createConnection({ ...config, database: process.env.DB_NAME });
  await db.query("INSERT INTO categories (name) VALUES ?", [categoryNames.map((name) => [name])]);

  const products = Array.from({ length: 2500 }, (_, index) => [
    (index % categoryNames.length) + 1,
    `${adjectives[index % adjectives.length]} ${nouns[(index * 3) % nouns.length]} ${index + 1}`,
    (24.99 + (index % 900)).toFixed(2),
    index < 60 ? 1 : 0,
  ]);
  for (let offset = 0; offset < products.length; offset += 500) {
    await db.query("INSERT INTO products (category_id, name, price, featured) VALUES ?", [products.slice(offset, offset + 500)]);
  }

  for (let offset = 0; offset < 60000; offset += 1000) {
    const rows = Array.from({ length: 1000 }, (_, row) => {
      const index = offset + row;
      const productId = ((index * 17) % 2500) + 1;
      return [productId, (index % 5) + 1, (29.99 + (productId % 800)).toFixed(2)];
    });
    await db.query("INSERT INTO order_items (product_id, quantity, unit_price) VALUES ?", [rows]);
  }

  for (let offset = 0; offset < 30000; offset += 1000) {
    const rows = Array.from({ length: 1000 }, (_, row) => {
      const index = offset + row;
      return [((index * 13) % 2500) + 1, (index % 5) + 1];
    });
    await db.query("INSERT INTO reviews (product_id, rating) VALUES ?", [rows]);
  }

  console.log("Seeded 2,500 products, 60,000 order items, and 30,000 reviews.");
  await db.end();
}

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});

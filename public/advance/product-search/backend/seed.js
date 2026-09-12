require("dotenv").config();

const database = require("./database");

const productTypes = [
  "Laptop", "Laptop Pro", "Laptop Stand", "Laptop Bag", "Laptop Sleeve",
  "Gaming Laptop", "Wireless Mouse", "Mechanical Keyboard", "USB-C Hub",
  "Bluetooth Speaker", "Noise Cancelling Headphones", "Smart Watch",
  "Fitness Band", "Action Camera", "Portable Charger", "Desk Lamp",
  "Office Chair", "Standing Desk", "Monitor Stand", "Webcam",
];

const brands = ["Nova", "Zen", "Pulse", "Orbit", "Vertex", "Aria", "Halo", "Drift", "Crest", "Lumen"];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 1000;

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomPrice() {
  return (Math.random() * 90000 + 500).toFixed(2);
}

async function seed() {
  console.log(`Inserting ${TOTAL_PRODUCTS} sample products...`);

  for (let inserted = 0; inserted < TOTAL_PRODUCTS; inserted += BATCH_SIZE) {
    const values = [];
    const placeholders = [];

    for (let i = 0; i < BATCH_SIZE; i += 1) {
      const name = `${randomItem(brands)} ${randomItem(productTypes)} ${inserted + i}`;
      values.push(name, randomPrice());
      placeholders.push("(?, ?)");
    }

    await database.query(
      `INSERT INTO products (name, price) VALUES ${placeholders.join(", ")}`,
      values,
    );

    console.log(`Inserted ${inserted + BATCH_SIZE} / ${TOTAL_PRODUCTS}`);
  }

  console.log("Done.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

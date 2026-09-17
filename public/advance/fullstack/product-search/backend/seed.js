require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const PRODUCT_COUNT = Number(process.env.PRODUCT_COUNT || 2_000_000);
const ORDER_COUNT = Number(process.env.ORDER_COUNT || 200_000);
const ITEMS_PER_ORDER = 4;
const PAGE_SIZE = 100_000;

const BRANDS = ["Nova", "Zen", "Pulse", "Orbit", "Vertex", "Aria", "Halo", "Drift", "Crest", "Lumen"];

const PRODUCT_TYPES = [
  "Laptop", "Laptop Pro", "Laptop Stand", "Laptop Bag", "Laptop Sleeve",
  "Gaming Laptop", "Wireless Mouse", "Mechanical Keyboard", "USB-C Hub",
  "Bluetooth Speaker", "Noise Cancelling Headphones", "Smart Watch",
  "Fitness Band", "Action Camera", "Portable Charger", "Desk Lamp",
  "Office Chair", "Standing Desk", "Monitor Stand", "Webcam",
];

const CATEGORY_NAMES = [
  "Computers", "Laptops", "Accessories", "Audio", "Wearables",
  "Cameras", "Power & Charging", "Home Office", "Furniture", "Displays",
  "Networking", "Storage", "Gaming", "Mobile Accessories", "Smart Home",
  "Office Supplies", "Ergonomics", "Peripherals", "Travel Gear", "Outdoor Tech",
  "Photography", "Video", "Lighting", "Security", "Fitness Tech",
  "Kitchen Tech", "Climate Control", "Cleaning Tech", "Printers & Scanners", "Cables",
  "Docking Stations", "Keyboards", "Mice & Pointers", "Monitors", "Speakers",
  "Headphones", "Chargers", "Batteries", "Adapters", "Bundles",
];

const ORDER_STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

// `expr` is always a trusted, internally-built SQL fragment (never user input),
// so it is safe to inline directly rather than bind as a parameter.
function elt(list, expr) {
  const quoted = list.map((item) => `'${item.replace(/'/g, "''")}'`).join(", ");
  return `ELT(1 + ((${expr}) MOD ${list.length}), ${quoted})`;
}

async function connectWithoutDatabase() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });
}

async function connectToDatabase() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
}

async function runSchema() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  const connection = await connectWithoutDatabase();

  console.log("Applying schema.sql (this drops and recreates all tables)...");
  await connection.query(schemaSql);
  await connection.end();
}

async function createNumbersTable(connection) {
  console.log(`Building a reusable ${PAGE_SIZE}-row number sequence...`);

  await connection.query(`SET SESSION cte_max_recursion_depth = ${PAGE_SIZE + 10}`);
  await connection.query("DROP TEMPORARY TABLE IF EXISTS seed_numbers");
  await connection.query(`
    CREATE TEMPORARY TABLE seed_numbers (n INT PRIMARY KEY)
    ENGINE = InnoDB
  `);

  await connection.query(`
    INSERT INTO seed_numbers (n)
    WITH RECURSIVE seq AS (
      SELECT 0 AS n
      UNION ALL
      SELECT n + 1 FROM seq WHERE n < ${PAGE_SIZE - 1}
    )
    SELECT n FROM seq
  `);
}

async function seedCategories(connection) {
  console.log(`Inserting ${CATEGORY_NAMES.length} categories...`);
  const values = CATEGORY_NAMES.map((name) => [name]);
  await connection.query("INSERT INTO categories (name) VALUES ?", [values]);
}

async function seedProducts(connection) {
  console.log(`Inserting ${PRODUCT_COUNT} products in batches of ${PAGE_SIZE}...`);

  const pages = Math.ceil(PRODUCT_COUNT / PAGE_SIZE);

  for (let page = 0; page < pages; page += 1) {
    const offset = page * PAGE_SIZE;
    const rowsInPage = Math.min(PAGE_SIZE, PRODUCT_COUNT - offset);
    const seq = `(${offset} + n)`;

    // ids are assigned explicitly (rather than left to AUTO_INCREMENT) so that
    // product ids stay exactly contiguous 1..PRODUCT_COUNT — bulk INSERT...SELECT
    // statements can otherwise leave gaps, which would break the id ranges and
    // random product_id lookups used later when seeding related tables.
    await connection.query(`
      INSERT INTO products (id, sku, name, brand, description, price, created_at)
      SELECT
        ${seq} + 1,
        CONCAT('SKU-', LPAD(${seq}, 10, '0')),
        CONCAT(${elt(BRANDS, seq)}, ' ', ${elt(PRODUCT_TYPES, seq)}, ' ', ${seq}),
        ${elt(BRANDS, seq)},
        CONCAT('Reliable choice for everyday use. Model #', ${seq}),
        ROUND(500 + RAND() * 90000, 2),
        DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 730) DAY)
      FROM seed_numbers
      WHERE n < ${rowsInPage}
    `);

    console.log(`  products: ${Math.min(offset + rowsInPage, PRODUCT_COUNT)} / ${PRODUCT_COUNT}`);
  }
}

async function seedProductCategories(connection) {
  console.log("Assigning categories to products...");

  const pages = Math.ceil(PRODUCT_COUNT / PAGE_SIZE);
  const categoryCount = CATEGORY_NAMES.length;

  for (let page = 0; page < pages; page += 1) {
    const start = page * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, PRODUCT_COUNT);

    await connection.query(`
      INSERT INTO product_categories (product_id, category_id)
      SELECT id, 1 + (id MOD ${categoryCount})
      FROM products
      WHERE id BETWEEN ${start} AND ${end}
    `);

    await connection.query(`
      INSERT IGNORE INTO product_categories (product_id, category_id)
      SELECT id, 1 + ((id + 7) MOD ${categoryCount})
      FROM products
      WHERE id BETWEEN ${start} AND ${end} AND id MOD 5 < 2
    `);

    console.log(`  product_categories: through product ${end} / ${PRODUCT_COUNT}`);
  }
}

async function seedOrders(connection) {
  console.log(`Inserting ${ORDER_COUNT} orders...`);

  const pages = Math.ceil(ORDER_COUNT / PAGE_SIZE);

  for (let page = 0; page < pages; page += 1) {
    const offset = page * PAGE_SIZE;
    const rowsInPage = Math.min(PAGE_SIZE, ORDER_COUNT - offset);
    const seq = `(${offset} + n)`;

    await connection.query(`
      INSERT INTO orders (id, customer_name, status, created_at)
      SELECT
        ${seq} + 1,
        CONCAT('Customer ', ${seq}),
        ${elt(ORDER_STATUSES, seq)},
        DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 365) DAY)
      FROM seed_numbers
      WHERE n < ${rowsInPage}
    `);

    console.log(`  orders: ${Math.min(offset + rowsInPage, ORDER_COUNT)} / ${ORDER_COUNT}`);
  }
}

async function seedOrderItems(connection) {
  console.log(`Inserting order items (${ITEMS_PER_ORDER} per order)...`);

  const pages = Math.ceil(ORDER_COUNT / PAGE_SIZE);

  for (let page = 0; page < pages; page += 1) {
    const start = page * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, ORDER_COUNT);

    await connection.query(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      SELECT
        o.id,
        1 + FLOOR(RAND() * ${PRODUCT_COUNT}),
        1 + FLOOR(RAND() * 5),
        ROUND(500 + RAND() * 90000, 2)
      FROM orders o
      JOIN seed_numbers sn ON sn.n < ${ITEMS_PER_ORDER}
      WHERE o.id BETWEEN ${start} AND ${end}
    `);

    console.log(`  order_items: through order ${end} / ${ORDER_COUNT}`);
  }
}

async function seed() {
  const startedAt = Date.now();

  await runSchema();

  const connection = await connectToDatabase();

  await createNumbersTable(connection);
  await seedCategories(connection);
  await seedProducts(connection);
  await seedProductCategories(connection);
  await seedOrders(connection);
  await seedOrderItems(connection);

  await connection.query("DROP TEMPORARY TABLE IF EXISTS seed_numbers");
  await connection.end();

  const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`Done in ${seconds}s.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

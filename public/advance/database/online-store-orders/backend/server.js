require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/customers", async (request, response) => {
  try {
    const [customers] = await database.query("SELECT id, name FROM customers ORDER BY id");
    response.json(customers);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Customers could not be loaded." });
  }
});

app.get("/products", async (request, response) => {
  try {
    const [products] = await database.query("SELECT id, name, price FROM products ORDER BY id");
    response.json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Products could not be loaded." });
  }
});

app.get("/orders", async (request, response) => {
  // Student challenge: return complete order information from the separate data.
  response.status(501).json({ message: "Complete the order information challenge." });
});

app.listen(port, () => {
  console.log(`Online Store Orders backend runs on port ${port}`);
});


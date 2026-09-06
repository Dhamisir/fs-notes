require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const [users] = await database.execute(
      "SELECT id, name, email, account_type AS accountType FROM users WHERE email = ? AND password = ? LIMIT 1",
      [email, password],
    );

    if (users.length === 0) {
      return response.status(401).json({ message: "Email or password is incorrect." });
    }

    return response.json(users[0]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Login could not be completed." });
  }
});

app.get("/products", async (request, response) => {
  try {
    const [products] = await database.query(
      "SELECT id, name, price, description FROM products ORDER BY id DESC",
    );
    response.json(products);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Products could not be loaded." });
  }
});

app.get("/products/:id", async (request, response) => {
  try {
    const [products] = await database.execute(
      "SELECT id, name, price, description FROM products WHERE id = ? LIMIT 1",
      [request.params.id],
    );

    if (products.length === 0) {
      return response.status(404).json({ message: "Product not found." });
    }

    return response.json(products[0]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Product could not be loaded." });
  }
});

app.post("/products", async (request, response) => {
  try {
    // Student challenge: enforce the account access rule here.
    const { name, price, description } = request.body;
    const [result] = await database.execute(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [name, price, description],
    );
    response.status(201).json({ id: result.insertId, name, price, description });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Product could not be created." });
  }
});

app.put("/products/:id", async (request, response) => {
  try {
    // Student challenge: enforce the account access rule here.
    const { name, price, description } = request.body;
    await database.execute(
      "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
      [name, price, description, request.params.id],
    );
    response.json({ id: Number(request.params.id), name, price, description });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Product could not be updated." });
  }
});

app.delete("/products/:id", async (request, response) => {
  try {
    // Student challenge: enforce the account access rule here.
    await database.execute("DELETE FROM products WHERE id = ?", [request.params.id]);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Product could not be deleted." });
  }
});

app.listen(port, () => {
  console.log(`Product Manager backend runs on port ${port}`);
});


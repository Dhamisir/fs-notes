require("dotenv").config();

const cors = require("cors");
const express = require("express");
const database = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/accounts/:id", async (request, response) => {
  try {
    const [accounts] = await database.execute(
      "SELECT id, owner_name AS ownerName, balance FROM accounts WHERE id = ?",
      [request.params.id],
    );

    if (accounts.length === 0) {
      return response.status(404).json({ message: "Account does not exist." });
    }

    return response.json(accounts[0]);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Account could not be loaded." });
  }
});

app.post("/accounts/:id/deposit", async (request, response) => {
  try {
    const amount = Number(request.body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return response.status(400).json({ message: "Amount must be greater than zero." });
    }

    const [result] = await database.execute(
      "UPDATE accounts SET balance = balance + ? WHERE id = ?",
      [amount, request.params.id],
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({ message: "Account does not exist." });
    }

    return response.json({ message: "Deposit completed." });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Deposit could not be completed." });
  }
});

app.post("/accounts/:id/withdraw", async (request, response) => {
  try {
    const amount = Number(request.body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return response.status(400).json({ message: "Amount must be greater than zero." });
    }

    const [result] = await database.execute(
      "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?",
      [amount, request.params.id, amount],
    );

    if (result.affectedRows === 0) {
      const [accounts] = await database.execute("SELECT id FROM accounts WHERE id = ?", [request.params.id]);
      if (accounts.length === 0) {
        return response.status(404).json({ message: "Account does not exist." });
      }
      return response.status(400).json({ message: "Insufficient balance." });
    }

    return response.json({ message: "Withdrawal completed." });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Withdrawal could not be completed." });
  }
});

app.post("/accounts/:id/transfer", async (request, response) => {
  const connection = await database.getConnection();

  try {
    const amount = Number(request.body.amount);
    const destinationId = request.body.destinationId;

    if (!Number.isFinite(amount) || amount <= 0) {
      connection.release();
      return response.status(400).json({ message: "Amount must be greater than zero." });
    }

    await connection.beginTransaction();
    const [sourceAccounts] = await connection.execute(
      "SELECT id, balance FROM accounts WHERE id = ? FOR UPDATE",
      [request.params.id],
    );
    const [destinationAccounts] = await connection.execute(
      "SELECT id FROM accounts WHERE id = ? FOR UPDATE",
      [destinationId],
    );

    if (sourceAccounts.length === 0) {
      await connection.rollback(); connection.release();
      return response.status(404).json({ message: "Account does not exist." });
    }
    if (destinationAccounts.length === 0) {
      await connection.rollback(); connection.release();
      return response.status(404).json({ message: "Destination account does not exist." });
    }
    if (Number(sourceAccounts[0].balance) < amount) {
      await connection.rollback(); connection.release();
      return response.status(400).json({ message: "Insufficient balance." });
    }

    await connection.execute("UPDATE accounts SET balance = balance - ? WHERE id = ?", [amount, request.params.id]);
    await connection.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?", [amount, destinationId]);
    await connection.commit();
    connection.release();
    return response.json({ message: "Transfer completed." });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error(error);
    return response.status(500).json({ message: "Transfer could not be completed." });
  }
});

// Student challenge: remove the repeated failure-handling code above.

app.listen(port, () => {
  console.log(`Bank Account API backend runs on port ${port}`);
});


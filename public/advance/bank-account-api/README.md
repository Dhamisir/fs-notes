# Bank Account API

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build a simple bank account application where a user can:

- View an account
- Deposit money
- Withdraw money
- Transfer money to another account

These operations can fail when an account is missing, a destination account is
missing, the balance is too low, an amount is incorrect, or the database cannot
complete an operation.

The starter backend repeats similar response code in several places. As more
operations are added, this repetition makes the application difficult to
maintain.

## Student Task

Refactor the backend so failures are handled in one common place instead of
repeating similar code throughout every operation.

Keep the project small and focused on this one problem. Do not add unrelated
account features.

## Expected Result

- Accounts can be viewed by ID.
- Valid deposits, withdrawals, and transfers update balances.
- Incorrect amounts are rejected.
- Missing accounts receive a useful response.
- A withdrawal or transfer is rejected when the balance is too low.
- Unexpected database failures receive a useful response.
- Repeated failure-handling code is removed from individual operations.

## Development Accounts

Run `schema.sql` to create:

```text
Account 1: Aditi Mehta
Account 2: Rohan Verma
```

## Completion Checklist

- [ ] All four operations work with correct information.
- [ ] Each expected failure returns a useful message and status.
- [ ] Unexpected failures return a useful response.
- [ ] Failure handling is managed from one common place.
- [ ] Individual operations do not repeat the same failure-handling code.

## Project Structure

```text
bank-account-api/
├── backend/       Node.js, Express, and MySQL
└── frontend/      React and Vite
```

## Run the Project

Create `backend/.env` from `backend/.env.example`, then run `schema.sql` with
your MySQL setup.

In the backend folder:

```bash
npm install
npm run dev
```

In the frontend folder:

```bash
npm install
npm run dev
```


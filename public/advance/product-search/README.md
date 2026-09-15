# Product Search

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build a small product search application.

The application contains a large product catalog, organized into categories,
with an order history behind it. Users should be able to search for products
by name and see a bit of context about each result (its categories and how
many units have sold).

```text
User searches:
"laptop"

Application returns:
Laptop Pro       Computers, Laptops        1,204 sold
Gaming Laptop    Computers, Laptops, Gaming   842 sold
Laptop Stand     Accessories, Home Office     356 sold
Laptop Bag       Accessories, Travel Gear     198 sold
```

The database should contain enough sample data to simulate a real product
catalog with related categories and order history, and the application
should display how long each search request takes.

## Student Task

The catalog is large and the search endpoint has grown to reflect real
product data (categories and sales history), and it has gotten slow.

How can you make the database search faster, without changing what the
search returns?

Investigate the query the backend is running (read it, run `EXPLAIN` on it,
look at the schema and indexes) to understand why it costs what it costs
before you change anything. Keep the project focused on this one problem.
Do not add unrelated store features, and do not change the fields returned
by the search endpoint.

## Expected Result

- Users can search for products by name.
- Matching products are displayed with their categories and units sold.
- The time taken for each search request is displayed.
- The catalog contains a large number of sample products, categories, and
  orders.
- Searches stay fast as the catalog grows.

## Sample Data

Run the seed script. It (re)creates the schema from `schema.sql` and then
generates a large, related dataset — products, categories, product-category
links, orders, and order items:

```bash
npm run seed
```

This can take a while to run since it is generating millions of rows. If you
need to reproduce the original problem from a clean slate at any point (for
example, after experimenting with the schema or indexes), just run it again:

```bash
npm run reset
```

Both commands do the same thing: drop and recreate every table, then reseed
from scratch.

If seeding is too slow or too large for your machine, you can scale the
dataset down via environment variables (see `.env.example`).

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] The catalog contains a large number of sample products, categories,
      and orders.
- [ ] Searching by product name returns matching results with their
      categories and units sold.
- [ ] The time taken for each search request is displayed.
- [ ] Searches remain fast as the catalog grows.
- [ ] The search endpoint still returns the same results as before your
      changes — only the speed changed.

## Project Structure

```text
product-search/
├── backend/       Node.js, Express, and MySQL
└── frontend/      React and Vite
```

## Run the Project

Create `backend/.env` from `backend/.env.example` with your MySQL
credentials (the database itself does not need to exist yet — the seed
script creates it).

In the backend folder:

```bash
npm install
npm run seed
npm run dev
```

In the frontend folder:

```bash
npm install
npm run dev
```

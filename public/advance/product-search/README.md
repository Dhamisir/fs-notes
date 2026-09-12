# Product Search

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build a small product search application.

The application contains a large number of products. Users should be able to
search for products by name.

```text
User searches:
"laptop"

Application returns:
Laptop Pro
Gaming Laptop
Laptop Stand
Laptop Bag
```

The database should contain enough sample data to simulate a large product
catalog, and the application should display how long each search request
takes.

## Student Task

The database contains a very large number of products, and searching by
product name is becoming slow.

How can you make the database search faster?

Keep the project focused on this one problem. Do not add unrelated store
features.

## Expected Result

- Users can search for products by name.
- Matching products are displayed on the page.
- The time taken for each search request is displayed.
- The catalog contains a large number of sample products.
- Searches stay fast as the catalog grows.

## Sample Data

Run `schema.sql` to create the database and table, then generate a large
product catalog:

```bash
npm run seed
```

This inserts a large number of sample products so the search behavior can be
tested at scale.

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] The catalog contains a large number of sample products.
- [ ] Searching by product name returns matching results.
- [ ] The time taken for each search request is displayed.
- [ ] Searches remain fast as the catalog grows.

## Project Structure

```text
product-search/
├── backend/       Node.js, Express, and MySQL
└── frontend/      React and Vite
```

## Run the Project

Create `backend/.env` from `backend/.env.example`, then run `schema.sql` with
your MySQL setup and generate sample data with `npm run seed`.

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

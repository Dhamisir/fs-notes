# Online Store Orders

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build a simple online store with customers, products, and orders. Each kind of
information is stored separately in the database.

When an order is displayed, the page should show all of this information
together:

```text
Order #101
Customer: Rahul
Product: Laptop
Quantity: 2
Price: 50000
```

## Student Task

Complete the unfinished backend operation so it retrieves the related customer,
product, and order information and returns complete order records to the React
page.

Keep the project focused on this one problem. Do not add unrelated store
features.

## Expected Result

The orders page should display:

- Order ID
- Customer name
- Product name
- Product price
- Quantity

The supplied data includes different customers ordering different products.

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] Customers, products, and orders remain stored separately.
- [ ] Every displayed order includes the customer name.
- [ ] Every displayed order includes product details and quantity.
- [ ] All supplied orders appear on the page.

## Project Structure

```text
online-store-orders/
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


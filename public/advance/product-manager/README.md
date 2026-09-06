# Product Manager

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build a product application with two account types: Admin and Normal User. Both
can log in and browse products, but only an Admin can manage products.

### Normal User

A Normal User can:

- Log in
- View the product list
- View product details

A Normal User must not be able to create, edit, or delete products.

### Admin

An Admin can:

- Log in
- View products and product details
- Create products
- Edit products
- Delete products

Each product contains an ID, name, price, and description.

## Student Task

The starter UI shows actions appropriate to the logged-in account type. Complete
the backend access rules so restricted product operations are allowed only for
an Admin.

A Normal User must not be able to bypass the frontend and perform those
operations by calling the backend directly.

Keep the project focused on this one problem. Continue using the completed work
from the earlier login assignments.

## Development Accounts

```text
Admin
Email: admin@example.com
Password: admin123

Normal User
Email: user@example.com
Password: user123
```

## Completion Checklist

- [ ] Both development accounts can log in.
- [ ] Both account types can view products and product details.
- [ ] The Admin UI provides create, edit, and delete actions.
- [ ] The Normal User UI does not show management actions.
- [ ] The backend rejects restricted operations from a Normal User.
- [ ] Calling the backend directly cannot bypass the access rules.

## Project Structure

```text
product-manager/
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


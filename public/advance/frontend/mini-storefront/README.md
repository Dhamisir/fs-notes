# React Assignment 03

A small React learning challenge. No TypeScript, no backend, and nothing to
scaffold — install dependencies and the app is already running.

## Existing Application

This project is a small storefront. Shoppers can browse a product grid, add
items to a cart, adjust quantities or remove items in the cart panel, and
see a running item count in both the header badge and the page footer. All
of it works correctly today.

## Problem

The team keeps needing to show cart information in places that have nothing
to do with the cart itself. Last month, someone needed the product grid's
container to also know about the cart just so a badge further down could
read it, even though the grid container itself never uses that data. This
month, the cart panel's outer wrapper had to be changed the same way for an
unrelated reason.

Now the team wants to add a small "items in cart" note next to the site
header's search box (a completely different part of the page), and whoever
picks this up is dreading it — every time cart data needs to reach a new
place, several components that have nothing to do with the cart end up
changing too.

## Your Task

Investigate how cart data currently reaches the components that display or
change it, and improve the implementation so that a component that needs
the cart data can get it and update it without requiring components that
don't use it to change as well.

## Requirements

- Existing application behavior must continue to work.
- Cart state must remain consistent across every part of the UI that shows
  it (header badge, footer note, cart panel).
- Components that don't actually use the cart data should no longer need to
  receive and forward it.
- Adding another component that needs the same cart data should be
  straightforward and should not require modifying unrelated components in
  between.

## Constraints

- Do not rebuild the application.
- Do not change the UI unnecessarily.
- Do not add unnecessary libraries.
- Do not duplicate the shared state.
- Keep the existing functionality working.

## How You Know You Are Done

- Adding an item to the cart still updates the header badge, the footer
  note, and the cart panel, consistently.
- Removing an item or changing its quantity still works everywhere it's
  reflected.
- You can point to components in the tree that no longer need to receive
  cart-related props just to forward them along.
- You could add a new component elsewhere in the tree that reads (or
  updates) the cart without editing every component between it and where
  the data currently lives.

## Investigation Questions

- How does the cart data actually travel from where it's created to each
  component that displays it?
- Which components genuinely read or change the cart data, and which ones
  are just passing it along?
- What happens to those in-between components if a new part of the UI
  needs the same data?
- Are any components receiving props they never use themselves?
- Could the cart data have a more appropriate place to live, one that
  doesn't depend on how deep a component happens to be in the tree?

## Real-World Context

Applications like e-commerce sites, dashboards, booking systems, and admin
tools often have data — a cart, a logged-in user, a set of filters — that
many unrelated parts of the UI need to read or update. As those
applications grow, deciding where that data should live and how components
reach it becomes an important, everyday design decision in real React
codebases.

## Student Deliverable

Submit:

- Your updated code
- A short explanation of the problem you found
- A short explanation of how you solved it
- One example of where you think this approach would be useful in a real
  application

## Project Structure

```text
mini-storefront/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    ├── styles.css
    └── components/
        ├── StoreLayout.jsx
        ├── Header.jsx
        ├── Footer.jsx
        ├── StorePage.jsx
        ├── ProductGrid.jsx
        ├── ProductCard.jsx
        ├── CartPanel.jsx
        ├── CartItemsList.jsx
        └── CartTotals.jsx
```

## Run the Project

```bash
npm install
npm run dev
```

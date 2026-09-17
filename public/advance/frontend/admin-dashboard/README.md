# React Assignment 01

A small React learning challenge. No TypeScript, no backend, and nothing to
scaffold — install dependencies and the app is already running.

## Existing Application

This project is a small internal admin dashboard for an online store. It
shows a header, four summary cards (revenue, orders, new customers, active
sessions), and a table of recent orders. It looks and behaves like a normal
small production dashboard.

## Problem

Marketing asked for a small visual tweak to the summary cards — rounder
corners and a slightly different trend-arrow color. A developer made the
change, but it only showed up on three of the four cards. The fourth was
still using the old look days later, and nobody noticed until a customer
took a screenshot.

Next quarter the team also wants to add a few more summary cards
("Average Order Value", "Refund Rate", "Support Tickets Open"), and whoever
picks up that work is not looking forward to it.

## Your Task

Investigate why a single visual change didn't apply everywhere it should
have, and change how the codebase is organized so that a future update to
the summary cards' shared appearance or behavior can be made confidently,
in one place. When you're done, the dashboard should look and behave exactly
the same as it does right now — you're changing how the code is put
together, not what the user sees.

## Requirements

- All four summary cards must keep showing the same label, value, icon, and
  trend information they show today.
- Adding a fifth summary card (with its own label/value/icon/trend) should
  take noticeably less code than it would take today.
- A single change to the summary cards' shared markup or styling (for
  example, rounding the icon circle) should only need to be made in one
  place to apply to every card.
- The Recent Orders table and the rest of the dashboard must keep working
  exactly as before.

## Constraints

- Do not rewrite the entire application.
- Do not change the application's main behavior.
- Do not add unnecessary libraries.
- Keep the existing UI functionality working.

## How You Know You Are Done

- The dashboard looks and behaves exactly as it did before your change.
- You can add a new summary card by writing a small amount of code, not
  a new file that's nearly a full copy of an existing one.
- If you deliberately change one shared visual detail (for example, the
  icon circle's border radius), every card updates at once, from a single
  edit.
- You proved this by passing different data into whatever you built, not
  by copy-pasting a card file again.

## Investigation Questions

- Where is the same visual structure repeated, and how many files would
  you have to touch to change it?
- What is actually different between the four summary cards, and what is
  exactly the same?
- What would happen if a fifth or sixth card were added next month, the
  same way the first four were built?
- Can one change to how a card looks be made without editing more than one
  file?
- If you handed this project to a new teammate, would they know how to
  safely add a new card without copying an old one?

## Real-World Context

Admin dashboards, e-commerce product pages, and settings screens often
start with a handful of similar panels that get copy-pasted to move
quickly. As the product grows, each "just one more panel" gets added the
same way, until a simple design change turns into an afternoon of hunting
through files — and one is always missed. Noticing this pattern early, and
knowing how to fix it, is a routine, practical skill in real frontend
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
admin-dashboard/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    ├── styles.css
    └── components/
        ├── StatCardRevenue.jsx
        ├── StatCardOrders.jsx
        ├── StatCardCustomers.jsx
        ├── StatCardSessions.jsx
        └── RecentOrders.jsx
```

## Run the Project

```bash
npm install
npm run dev
```

# React Assignment 05

A small React learning challenge. No TypeScript, no backend, and nothing to
scaffold — install dependencies and the app is already running.

## Existing Application

This project is a small product dashboard. It shows a catalog of several
thousand products, a search box to filter them by name, a panel of
catalog-wide stats (inventory value, average price, top category, most
expensive products), and a session timer in the header showing how long
you've had the page open. Everything works correctly.

## Problem

The dashboard gets noticeably less responsive the longer it stays open, and
typing in the search box feels sluggish — small pauses between keystrokes,
even though the search itself is simple. The application is functionally
correct; nothing is broken. Some part of it is just doing more work than it
needs to.

## Your Task

Investigate the application and improve its responsiveness, without
changing what it does or how it looks.

## Requirements

- Existing functionality must continue working.
- Search/filter behavior must remain correct.
- The UI should remain visually consistent.
- Avoid unnecessary work when unrelated parts of the application change.
- The application should remain maintainable after the changes.

## Constraints

- Do not rebuild the application.
- Do not remove required functionality.
- Do not use artificial delays.
- Do not solve the problem by simply reducing the amount of data.
- Do not add unnecessary libraries.
- Do not rewrite the entire application.

## How You Know You Are Done

Compare the application before and after your changes. Verify that:

- The application responds more efficiently during interaction.
- Components that do not need to update are not doing unnecessary work.
- Expensive calculations are not repeatedly performed without a reason.
- Existing behavior remains correct.

Use appropriate React/browser developer tools if useful during your
investigation.

## Investigation Questions

- What work happens every time the user interacts with the page?
- Which parts of the UI actually need to update?
- Are some components doing work even though their relevant data has not
  changed?
- Are expensive calculations being repeated unnecessarily?
- Can you verify which part of the application is responsible for the
  unnecessary work?

## Real-World Context

Large dashboards, analytics tools, e-commerce interfaces, and other
data-heavy applications tend to slow down as they grow, not because any
single piece of code is wrong, but because small amounts of unnecessary
work add up across a lot of UI. Recognizing where that work is coming from,
and only doing it when it's actually needed, is a routine, practical skill
in real React codebases.

## Student Deliverable

Submit:

- Your updated code
- A short explanation of what caused the performance problem
- A short explanation of how you improved it
- Evidence of how you compared the application before and after
- One real-world example where this type of optimization matters

## Project Structure

```text
product-dashboard/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    ├── insights.js
    ├── styles.css
    └── components/
        ├── Header.jsx
        ├── SearchBar.jsx
        ├── InsightsPanel.jsx
        ├── ProductList.jsx
        └── ProductCard.jsx
```

## Run the Project

```bash
npm install
npm run dev
```

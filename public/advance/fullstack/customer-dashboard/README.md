# React Assignment 04

A small full-stack learning challenge built with React, Node.js, Express,
and JavaScript. No TypeScript, and nothing to scaffold — install
dependencies in both folders and the app is already running end to end.

## Existing Application

This project is a small internal customer dashboard. On load, the React
frontend requests the customer list from a Node/Express API and displays it
in a table. When the server responds normally, the dashboard works exactly
as expected.

## Problem

Support has started getting confused reports about this dashboard:

- On a slower connection, the page briefly says "No customers found" before
  the real table shows up — a few people have already assumed the account
  had no customers and closed the tab.
- When the API had a rough few minutes last week, the dashboard didn't show
  an error. It just sat there looking broken, and the only way anyone found
  to fix it was refreshing the page over and over until a request finally
  got through.
- Nobody currently has a good answer for what a customer with zero
  registered accounts is actually supposed to see, versus a customer whose
  data simply hasn't arrived yet.

## Your Task

Investigate how this dashboard currently behaves while data is loading,
when the server request fails, and when the server genuinely has nothing to
return. Improve the application so users always understand what's
happening and can recover from a temporary failure without reloading the
whole page.

## Requirements

- Existing successful API behavior must continue working.
- The user must receive clear feedback while waiting for data.
- Server failures must be handled gracefully.
- Empty results must have an appropriate UI.
- Temporary failures should be recoverable without refreshing the entire
  page.
- Avoid showing stale or misleading information.

## Constraints

- Do not rebuild the application.
- Do not modify the backend unless absolutely necessary.
- Do not add unnecessary libraries.
- Keep the existing UI structure.
- Do not use fake delays to demonstrate the problem.

## How You Know You Are Done

Test the application under all four of these conditions and confirm the UI
behaves appropriately in each one:

1. Successful API response
2. Slow API response
3. API failure
4. Empty response

The backend endpoint accepts a few test-only query parameters so you can
reliably reproduce each condition without touching application code:

- `http://localhost:3000/api/customers?delay=3000` — responds slowly
- `http://localhost:3000/api/customers?fail=true` — responds with an error
- `http://localhost:3000/api/customers?empty=true` — responds with no
  customers

Visit those URLs directly to see the raw response, and point the frontend
at one temporarily (or throttle your network in the browser's dev tools) to
see how the dashboard behaves under each condition.

## Investigation Questions

- What does the user see while the server request is running?
- What happens when the request fails?
- What happens when the server returns an empty result?
- Can the user recover from a temporary failure?
- Is the UI showing information that is no longer valid?

## Real-World Context

Real applications constantly deal with slow networks, servers that are
temporarily unavailable, datasets that are genuinely empty, and requests
that fail and need to be retried. How an interface handles those moments
often matters more to users than how it looks when everything goes right.

## Student Deliverable

Submit:

- Your updated code
- A short explanation of the problems you discovered
- A short explanation of your solution
- One real-world application where this type of handling is important

## Project Structure

```text
customer-dashboard/
├── backend/       Node.js and Express
└── frontend/      React and Vite
```

## Run the Project

In the backend folder:

```bash
npm install
npm run dev
```

In a second terminal, from the frontend folder:

```bash
npm install
npm run dev
```

Open the frontend address printed in the terminal.

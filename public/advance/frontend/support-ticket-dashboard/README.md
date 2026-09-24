# React Assignment 15

A small full-stack learning challenge built with React, Node.js, Express,
and JavaScript. No TypeScript, and nothing to scaffold — install
dependencies in both folders and the app is already running end to end.

## Existing Application

This project is a small support ticket dashboard. On load, the React
frontend requests the open tickets from a Node/Express API and displays
each one with its priority, requester, and status. When the server
responds normally, the dashboard works exactly as expected.

## Problem

Support agents have started reporting confusing behavior when they open
the dashboard:

- Sometimes the screen just says "Loading tickets…" and never moves past
  it — no error, no tickets, nothing. The only fix anyone has found is
  refreshing the page, sometimes several times in a row.
- A couple of agents swear they've seen the dashboard show a completely
  empty page with no tickets and no explanation, and weren't sure if that
  meant there were genuinely no open tickets or if something was broken.
- Nobody has a way to tell, just by looking at the screen, whether the
  dashboard is still working on it or has already given up.

## Your Task

Investigate how this dashboard currently requests and displays ticket
data, and improve it so users always understand the current state of the
ticket list — whether it's still loading, has failed, or has genuinely
come back empty — and can recover from a temporary failure without
reloading the whole page.

## Requirements

- Keep the existing successful behavior.
- Clearly communicate that data is being loaded.
- Handle server failures gracefully.
- Handle empty results appropriately.
- Allow the user to recover from a temporary failure.
- Do not show misleading or stale information.

## Constraints

- Modify the existing project.
- Do not rebuild the application.
- Do not modify the backend unless absolutely necessary.
- Do not add unnecessary libraries.
- Do not use artificial delays such as `setTimeout()` just to create the
  problem.
- Keep the existing UI structure and functionality.

## How You Know You Are Done

Verify the application in these situations:

1. Server returns ticket data.
2. Server takes time to respond.
3. Server returns an error.
4. Server returns no tickets.
5. A temporary failure is followed by a successful request.

The UI should communicate the correct situation in every case.

The backend endpoint accepts a few test-only query parameters so you can
reliably reproduce each condition without touching application code:

- `http://localhost:3000/api/tickets?delay=3000` — responds slowly
- `http://localhost:3000/api/tickets?fail=true` — responds with an error
- `http://localhost:3000/api/tickets?empty=true` — responds with no
  tickets

Visit those URLs directly to see the raw response, and point the frontend
at one temporarily (or throttle your network in the browser's dev tools)
to see how the dashboard behaves under each condition.

## Investigation Questions

- What does the user see before the server responds?
- How does the application know whether the request is still running?
- What happens when the request fails?
- How does the UI distinguish "no tickets" from "tickets haven't loaded
  yet"?
- How can the user recover from a temporary failure?

## Real-World Context

Real React applications communicate with APIs over networks where
requests can be slow, fail, or return no data. Users need clear feedback
for each of those situations — without it, they're left guessing whether
to wait, retry, or assume something is broken.

## Student Deliverable

Submit:

- Your updated code
- A short explanation of the problem you discovered
- A short explanation of how you solved it
- One real-world example where this type of handling is important

## Project Structure

```text
support-ticket-dashboard/
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

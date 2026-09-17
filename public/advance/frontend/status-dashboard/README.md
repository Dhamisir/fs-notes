# React Assignment 02

A small React learning challenge. No TypeScript, no backend, and nothing to
scaffold — install dependencies and the app is already running.

## Existing Application

This project is a small internal ops dashboard. It has three panels — Team
Status, Open Tickets, and Server Health — each loading its own data from a
simulated internal API when the page opens. The simulated network is a
little unreliable (like a real one): each panel occasionally fails to load,
and shows a Retry button when that happens.

## Problem

Last week, one of the panels started failing more often than usual, so an
engineer added a short pause before retrying, to stop it from hammering the
API. It fixed that panel. This week, a different panel started showing the
exact same failure pattern — because the fix only lived inside the one file
it was made in, and nobody thought to copy it into the other two.

Leadership now wants a fourth panel added (Recent Deployments), loading
data the same way the first three do. The team is not looking forward to
building it, because that means writing — or copying — the same loading,
error, and retry logic a fourth time.

## Your Task

Investigate how each panel currently loads its data, and change the
codebase so that loading, error, and retry behavior can be reused with
confidence instead of copied. When you're done, all three panels should
still look and behave exactly as they do now — you're changing how the
behavior is organized, not what the user sees.

## Requirements

- All three panels must keep loading their own data on page load, and keep
  showing a loading state, an error state with a working Retry button, and
  the loaded data, exactly as they do today.
- Each panel must still be able to render its own data differently (a
  team list, a ticket list, a metrics list) — only the repeated behavior
  should be consolidated, not the UI.
- It should be possible to add a new panel that loads different data, with
  the same loading/error/retry behavior, without re-writing that behavior
  from scratch.
- A future change to the shared behavior (for example, pausing briefly
  before a retry) should be something you can make in one place and have
  it apply everywhere it's used.

## Constraints

- Do not rebuild the application.
- Do not change the existing functionality unnecessarily.
- Do not add unnecessary libraries.
- Keep the application working.
- Avoid duplicating the same logic after your changes.

## How You Know You Are Done

- All three panels behave exactly as they did before your change,
  including the loading state and the Retry button on failure.
- You can point to one place in the code responsible for the
  loading/error/retry behavior, used by all three panels.
- You could add a fourth panel that loads different data by reusing that
  one place, instead of writing a new copy of the state logic.
- Each panel still controls its own heading and how its own data is
  displayed.

## Investigation Questions

- Where is the same stateful logic repeated, and how many files would you
  have to touch to change how retries work?
- What happens if that behavior needs to change again next month?
- Which parts of each panel are about *what* the data looks like, and
  which parts are about *how* data gets loaded, failed, and retried?
- Can the loading/error/retry behavior be maintained in one place while
  each panel still shows its own kind of data?
- If a teammate had to add a fourth panel tomorrow, would they know how to
  do it without copying an existing one?

## Real-World Context

Dashboards, admin tools, and any screen made of several independent
widgets tend to grow this way — each widget fetches its own slice of data
and ends up with its own copy of the loading/error/retry code. It's a
common source of subtle bugs, because a fix or improvement made in one
widget quietly doesn't apply to the others unless someone remembers to
copy it everywhere. Recognizing when several pieces of UI share the same
underlying behavior — and giving that behavior one home — is a routine,
practical skill in real React codebases.

## Student Deliverable

Submit:

- Your updated code
- A short explanation of the problem you found
- A short explanation of how you solved it
- One example of where you think this approach would be useful in a real
  application

## Project Structure

```text
status-dashboard/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api.js
    ├── data.js
    ├── styles.css
    └── components/
        ├── TeamStatusPanel.jsx
        ├── TicketsPanel.jsx
        └── ServerHealthPanel.jsx
```

## Run the Project

```bash
npm install
npm run dev
```

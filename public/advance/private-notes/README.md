# Private Notes

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build a notes application for multiple users. A user can create an account, log
in, create notes, and view their notes.

When notes are requested, the backend must determine which logged-in user made
the request and return only that user's notes.

- User A should see User A's notes.
- User B should see User B's notes.
- User A must not be able to see User B's notes.

Each note contains:

- ID
- Title
- Content
- User
- Created date

## Student Task

Complete the unfinished note behavior so every created note belongs to the user
who created it and each user receives only their own notes.

Keep the project focused on this one problem. Continue using the safe password
storage work completed in the previous assignment.

## Expected Result

- A user can create an account and log in.
- A logged-in user can create a note.
- The notes page displays only the current user's notes.
- Supplying another user's ID cannot reveal or create notes for that user.
- Notes remain stored after restarting the backend.

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] Registration and login work.
- [ ] A logged-in user can create notes.
- [ ] Each note is connected to its creator.
- [ ] Every user receives only their own notes.
- [ ] Users cannot access notes by supplying a different user ID.

## Project Structure

```text
private-notes/
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


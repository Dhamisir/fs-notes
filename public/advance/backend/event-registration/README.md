# Event Registration

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Build an event registration application. A user registers by submitting:

- Name
- Email
- Age
- Event name

Users may submit empty values, invalid email addresses, invalid ages, missing
fields, or unexpected values. The backend must not accept incorrect data.

The backend must perform its checks even when someone bypasses the React form
and sends data directly to the server.

## Example Incorrect Data

```text
Name: ""
Email: "hello"
Age: -50
Event: ""
```

The backend should reject this registration with an appropriate response.

## Student Task

Complete the unfinished backend checks so only correct event registrations are
stored in MySQL. Keep the project focused on this one problem.

## Expected Result

- A user can submit name, email, age, and event name.
- Correct registrations are saved in MySQL.
- Incorrect registrations are rejected by the backend.
- Rejected information is not stored.
- Saved registrations appear in the registered-users view.

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] Correct registrations are saved and displayed.
- [ ] Empty and missing values are rejected.
- [ ] Incorrect email addresses and ages are rejected.
- [ ] Unexpected values are rejected.
- [ ] Direct requests cannot bypass the backend checks.

## Project Structure

```text
event-registration/
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


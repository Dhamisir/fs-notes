# Logged-In User

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

The application already has registered students who can log in with an email
and password.

After a successful login, the profile page asks the backend for student
information. The backend must determine which logged-in student made that
request and return only that student's record.

The profile must display:

- Name
- Email
- Course

A student must not be able to provide another student's ID to view a different
profile.

## Student Task

Complete the unfinished backend and frontend behavior so the profile request is
connected to the student who logged in.

Keep the project focused on this single task. Do not add account types or
unrelated account-management features.

## Expected Result

- A registered student can log in with their email and password.
- A successful login opens the profile page.
- The backend identifies the student making the profile request.
- The profile displays that student's name, email, and course.
- Changing or supplying another student's ID cannot reveal another profile.

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] The development account can log in.
- [ ] The profile page loads the correct student record.
- [ ] The backend identifies the logged-in student on later requests.
- [ ] One student cannot view another student's profile by supplying an ID.

## Project Structure

```text
logged-in-user/
├── backend/       Node.js, Express, and MySQL
└── frontend/      React and Vite
```

## Development Account

```text
Email: learner@example.com
Password: learn123
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


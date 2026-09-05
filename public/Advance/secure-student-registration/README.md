# Secure Student Registration

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Create a student registration application where a student can create an account
using:

- Name
- Email
- Password
- Course

The student information must be stored in MySQL. There is one important
security problem: the student's actual password must never be saved in the
database.

If someone inspects the database, they must not be able to see the original
password entered by the student.

## Student Task

The starter project includes a registration form, a connected MySQL backend,
and a development records view. Complete the unfinished password-storage step
in the backend.

Keep the project focused on this one task. Do not add login or account-management
features.

## Expected Result

- A student can enter a name, email, password, and course.
- The registration is stored in MySQL.
- The original password is not stored in MySQL.
- The development records view displays the saved student records.
- Saved records remain after restarting the backend.

## Completion Checklist

- [ ] The frontend and backend start without errors.
- [ ] A student can submit the registration form.
- [ ] The student record is saved in MySQL.
- [ ] The stored password value is not the original password.
- [ ] Registered records appear in the development view.
- [ ] Records remain after a backend restart.

## Project Structure

```text
secure-student-registration/
├── backend/
│   ├── database.js
│   ├── schema.sql
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        └── App.jsx
```

## Run the Project

Create a local `.env` file in `backend` using `.env.example`, then run the SQL
file with your MySQL setup.

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


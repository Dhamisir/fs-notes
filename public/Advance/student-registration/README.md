# Student Registration

A small full-stack learning challenge built with React, Node.js, Express,
JavaScript, and MySQL.

## Assignment Question

Create a student registration application where a student can enter:

- Name
- Email
- Course

The application should display all registered students on the page.

The submitted information must be saved permanently. It should still exist
after the Node.js server is stopped and started again.

## Student Task

The starter application currently keeps registrations only while the backend is
running. Complete the project so registrations are stored in MySQL and remain
available after a server restart.

Keep the project small. Do not add authentication or unrelated features.

## Completion Checklist

- [ ] A student can submit name, email, and course.
- [ ] Submitted students appear in the registered-students list.
- [ ] Student information is stored in MySQL.
- [ ] Registrations still exist after restarting the backend.
- [ ] The application runs without browser or server errors.

## Project Structure

```text
student-registration/
├── backend/       Node.js and Express
└── frontend/      React and Vite
```

## Run the Starter

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


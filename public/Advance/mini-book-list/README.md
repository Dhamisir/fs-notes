# Mini Book List

A small full-stack learning challenge built with React, Node.js, Express, and
JavaScript.

## Assignment Question

The Mini Book List application needs to display a collection of books. The book
data already exists on the Node.js server, but the React application does not
display it yet.

Complete the missing communication between the React frontend and Node.js
backend, then show all the books in the provided user interface.

Each book contains:

- `id`
- `title`
- `author`
- `price`

## What the Student Has to Do

1. Review the existing frontend and backend files.
2. Complete the missing connection between the React application and the server.
3. Store the received books in the frontend.
4. Pass the books to the existing `BookList` component.
5. Make sure every book displays its title, author, and formatted price.
6. Add basic loading and error messages if needed.

Do not replace the supplied book data or hard-code another copy of it in the
frontend.

## Expected Result

When the project runs, the home page should display every book supplied by the
backend as a book card. Each card should include:

- Book title
- Author name
- Price with two decimal places

## Completion Checklist

- [ ] The project starts without errors.
- [ ] The frontend receives the backend book data.
- [ ] All books appear on the home page.
- [ ] Every rendered book has a stable key.
- [ ] Prices display with two decimal places.
- [ ] The browser console has no errors.

## Project Structure

```text
mini-book-list/
├── backend/       Node.js, Express, and book data
└── frontend/      React and Vite
```

## Run the Starter Project

In the backend folder:

```bash
cd backend
npm install
npm run dev
```

In a second terminal, from the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend address printed in the terminal.

The starter deliberately leaves the communication step incomplete for the
student to solve.

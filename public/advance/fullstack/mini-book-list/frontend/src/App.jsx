import { useState } from "react";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  // Student challenge: load the backend books and call setBooks.
  void setBooks;

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">My tiny library</p>
        <h1>Mini Book List</h1>
        <p>Good stories, all in one place.</p>
      </header>

      <BookList books={books} />
    </main>
  );
}

export default App;


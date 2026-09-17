function BookList({ books }) {
  if (books.length === 0) {
    return (
      <p className="emptyMessage">
        Complete the challenge to see the book collection.
      </p>
    );
  }

  return (
    <section className="bookGrid" aria-label="Book list">
      {books.map((book) => (
        <article className="bookCard" key={book.id}>
          <div>
            <h2>{book.title}</h2>
            <p className="author">by {book.author}</p>
          </div>
          <p className="price">${book.price.toFixed(2)}</p>
        </article>
      ))}
    </section>
  );
}

export default BookList;


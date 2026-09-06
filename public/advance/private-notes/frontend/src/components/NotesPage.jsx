import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";

function NotesPage({ backendUrl }) {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("Loading your notes...");

  async function loadNotes() {
    const response = await fetch(`${backendUrl}/notes`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    setNotes(result);
    setMessage("");
  }

  useEffect(() => {
    loadNotes().catch((error) => setMessage(error.message));
  }, []);

  async function createNote(note) {
    try {
      const response = await fetch(`${backendUrl}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setNotes((current) => [result, ...current]);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="page">
      <header className="pageHeader notesHeader">
        <div>
          <p className="eyebrow">Your workspace</p>
          <h1>My Notes</h1>
        </div>
        <span>{notes.length} notes</span>
      </header>

      <div className="notesLayout">
        <section className="panel">
          <h2>New note</h2>
          <NoteForm onCreate={createNote} />
          {message && <p className="message">{message}</p>}
        </section>

        <section className="notesGrid" aria-label="My notes">
          {notes.length === 0 ? (
            <p className="emptyMessage">Your notes will appear here.</p>
          ) : (
            notes.map((note) => (
              <article className="noteCard" key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <time>{new Date(note.created_at).toLocaleDateString()}</time>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default NotesPage;


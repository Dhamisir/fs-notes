import { useState } from "react";

function NoteForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await onCreate({ title, content });
    setTitle("");
    setContent("");
  }

  return (
    <form className="noteForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} />

      <label htmlFor="content">Content</label>
      <textarea id="content" rows="5" value={content} onChange={(event) => setContent(event.target.value)} />

      <button className="primaryButton" type="submit">Save note</button>
    </form>
  );
}

export default NoteForm;


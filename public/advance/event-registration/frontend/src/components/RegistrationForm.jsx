import { useState } from "react";

const emptyForm = { name: "", email: "", age: "", eventName: "" };

function RegistrationForm({ onRegister, message }) {
  const [form, setForm] = useState(emptyForm);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    const saved = await onRegister(form);
    if (saved) setForm(emptyForm);
  }

  return (
    <section className="panel">
      <h2>Register for an event</h2>
      <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={update} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={form.email} onChange={update} />

        <label htmlFor="age">Age</label>
        <input id="age" name="age" value={form.age} onChange={update} />

        <label htmlFor="eventName">Event name</label>
        <input id="eventName" name="eventName" value={form.eventName} onChange={update} />

        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </section>
  );
}

export default RegistrationForm;


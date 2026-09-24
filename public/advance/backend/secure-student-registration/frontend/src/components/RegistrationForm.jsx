import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  course: "",
};

function RegistrationForm({ onRegister }) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("Saving...");

    try {
      await onRegister(form);
      setForm(emptyForm);
      setMessage("Student registered.");
    } catch {
      setMessage("Registration could not be saved.");
    }
  }

  return (
    <section className="panel formPanel">
      <h2>Create student account</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={updateField} />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
        />

        <label htmlFor="course">Course</label>
        <input
          id="course"
          name="course"
          value={form.course}
          onChange={updateField}
        />

        <button className="primaryButton" type="submit">
          Create account
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  );
}

export default RegistrationForm;


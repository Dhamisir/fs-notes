import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  course: "",
};

function RegistrationForm({ onRegister }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onRegister(form);
      setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel">
      <h2>Register a student</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={updateField}
          placeholder="Student name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="student@example.com"
          required
        />

        <label htmlFor="course">Course</label>
        <input
          id="course"
          name="course"
          value={form.course}
          onChange={updateField}
          placeholder="Course name"
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register student"}
        </button>
      </form>
    </section>
  );
}

export default RegistrationForm;


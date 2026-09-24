import { useState } from "react";

function AccountForm({ mode, message, onSubmit, onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const registering = mode === "register";

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Working...");

    try {
      await onSubmit(mode, form);
      setStatus("");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="panel accountPanel">
      <h2>{registering ? "Create account" : "Log in"}</h2>
      <form onSubmit={handleSubmit}>
        {registering && (
          <>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={updateField} />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={updateField} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={updateField} />

        <button className="primaryButton" type="submit">
          {registering ? "Create account" : "Log in"}
        </button>
      </form>

      {(status || message) && <p className="message">{status || message}</p>}
      <button className="textButton" type="button" onClick={onSwitch}>
        {registering ? "Already have an account? Log in" : "Need an account? Register"}
      </button>
    </section>
  );
}

export default AccountForm;


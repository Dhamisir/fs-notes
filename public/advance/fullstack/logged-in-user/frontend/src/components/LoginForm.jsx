import { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("Logging in...");

    try {
      await onLogin({ email, password });
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="panel loginPanel">
      <h2>Student login</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Log in</button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  );
}

export default LoginForm;


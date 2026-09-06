import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    try { await onLogin({ email, password }); }
    catch (error) { setMessage(error.message); }
  }

  return (
    <main className="loginPage">
      <section className="panel loginPanel">
        <p className="eyebrow">Store access</p><h1>Product Manager</h1><p>Log in to continue.</p>
        <form onSubmit={submit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="primaryButton" type="submit">Log in</button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>
    </main>
  );
}

export default Login;


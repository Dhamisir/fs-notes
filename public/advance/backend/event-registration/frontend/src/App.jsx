import { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationList from "./components/RegistrationList";

const backendUrl = "http://localhost:3000";

function App() {
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");

  async function loadRegistrations() {
    const response = await fetch(`${backendUrl}/registrations`);
    setRegistrations(await response.json());
  }

  useEffect(() => { loadRegistrations(); }, []);

  async function register(form) {
    setMessage("");
    const response = await fetch(`${backendUrl}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message);
      return false;
    }

    setRegistrations((current) => [result, ...current]);
    setMessage("Registration saved.");
    return true;
  }

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Join an experience</p>
        <h1>Event Registration</h1>
        <p>Reserve a place and view the current guest list.</p>
      </header>

      <div className="contentGrid">
        <RegistrationForm onRegister={register} message={message} />
        <RegistrationList registrations={registrations} />
      </div>
    </main>
  );
}

export default App;


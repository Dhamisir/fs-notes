import { useState } from "react";
import AccountForm from "./components/AccountForm";
import NotesPage from "./components/NotesPage";

const backendUrl = "http://localhost:3000";

function App() {
  const [screen, setScreen] = useState("login");
  const [message, setMessage] = useState("");

  async function submitAccount(path, details) {
    setMessage("");
    const response = await fetch(`${backendUrl}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.message);

    if (path === "register") {
      setScreen("login");
      setMessage("Account created. You can now log in.");
    } else {
      setScreen("notes");
    }
  }

  if (screen === "notes") {
    return <NotesPage backendUrl={backendUrl} />;
  }

  return (
    <main className="page accountPage">
      <header className="pageHeader">
        <p className="eyebrow">Personal workspace</p>
        <h1>Private Notes</h1>
        <p>Keep your thoughts together in one quiet place.</p>
      </header>

      <AccountForm
        mode={screen}
        message={message}
        onSubmit={submitAccount}
        onSwitch={() => {
          setMessage("");
          setScreen(screen === "login" ? "register" : "login");
        }}
      />
    </main>
  );
}

export default App;


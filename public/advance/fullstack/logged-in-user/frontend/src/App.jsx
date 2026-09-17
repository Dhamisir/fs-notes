import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";

const backendUrl = "http://localhost:3000";

function App() {
  const [showProfile, setShowProfile] = useState(false);

  async function logIn(details) {
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    setShowProfile(true);
  }

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Student portal</p>
        <h1>{showProfile ? "Your Profile" : "Welcome Back"}</h1>
        <p>
          {showProfile
            ? "Your student information appears below."
            : "Log in to open your student profile."}
        </p>
      </header>

      {showProfile ? <Profile backendUrl={backendUrl} /> : <LoginForm onLogin={logIn} />}
    </main>
  );
}

export default App;


import { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import StudentRecords from "./components/StudentRecords";

const backendUrl = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState([]);
  const [activeView, setActiveView] = useState("register");

  async function loadStudents() {
    const response = await fetch(`${backendUrl}/students`);
    const records = await response.json();
    setStudents(records);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function registerStudent(formData) {
    const response = await fetch(`${backendUrl}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const newStudent = await response.json();
    setStudents((currentStudents) => [newStudent, ...currentStudents]);
  }

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Student portal</p>
        <h1>Secure Student Registration</h1>
        <p>Create student accounts and inspect saved development records.</p>
      </header>

      <nav className="tabs" aria-label="Application views">
        <button
          className={activeView === "register" ? "active" : ""}
          onClick={() => setActiveView("register")}
          type="button"
        >
          Registration
        </button>
        <button
          className={activeView === "records" ? "active" : ""}
          onClick={() => setActiveView("records")}
          type="button"
        >
          Development records
        </button>
      </nav>

      {activeView === "register" ? (
        <RegistrationForm onRegister={registerStudent} />
      ) : (
        <StudentRecords students={students} onRefresh={loadStudents} />
      )}
    </main>
  );
}

export default App;


import { useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import StudentList from "./components/StudentList";

const backendUrl = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await fetch(`${backendUrl}/students`);
      const savedStudents = await response.json();
      setStudents(savedStudents);
    }

    loadStudents();
  }, []);

  async function registerStudent(formData) {
    const response = await fetch(`${backendUrl}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const newStudent = await response.json();
    setStudents((currentStudents) => [...currentStudents, newStudent]);
  }

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Course enrolment</p>
        <h1>Student Registration</h1>
        <p>Register a student and view the current class list.</p>
      </header>

      <div className="contentGrid">
        <RegistrationForm onRegister={registerStudent} />
        <StudentList students={students} />
      </div>
    </main>
  );
}

export default App;


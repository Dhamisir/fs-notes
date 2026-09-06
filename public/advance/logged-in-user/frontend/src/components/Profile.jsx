import { useEffect, useState } from "react";

function Profile({ backendUrl }) {
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("Loading profile...");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch(`${backendUrl}/profile`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        setStudent(result);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    }

    loadProfile();
  }, [backendUrl]);

  if (!student) {
    return <p className="challengeMessage">{message}</p>;
  }

  return (
    <section className="panel profilePanel">
      <div className="avatar" aria-hidden="true">
        {student.name.charAt(0)}
      </div>
      <div>
        <p className="fieldLabel">Name</p>
        <h2>{student.name}</h2>
      </div>
      <div className="profileDetails">
        <div>
          <p className="fieldLabel">Email</p>
          <p>{student.email}</p>
        </div>
        <div>
          <p className="fieldLabel">Course</p>
          <p>{student.course}</p>
        </div>
      </div>
    </section>
  );
}

export default Profile;


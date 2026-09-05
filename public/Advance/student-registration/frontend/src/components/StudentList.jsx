function StudentList({ students }) {
  return (
    <section className="panel">
      <div className="listHeading">
        <h2>Registered students</h2>
        <span>{students.length}</span>
      </div>

      {students.length === 0 ? (
        <p className="emptyMessage">No students registered yet.</p>
      ) : (
        <ul className="studentList">
          {students.map((student) => (
            <li key={student.id}>
              <div>
                <strong>{student.name}</strong>
                <p>{student.email}</p>
              </div>
              <span>{student.course}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default StudentList;


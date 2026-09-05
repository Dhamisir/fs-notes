function StudentRecords({ students, onRefresh }) {
  return (
    <section className="panel recordsPanel">
      <div className="recordsHeader">
        <div>
          <p className="eyebrow">Development only</p>
          <h2>Registered student records</h2>
        </div>
        <button className="secondaryButton" type="button" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {students.length === 0 ? (
        <p className="emptyMessage">No student records found.</p>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Stored password</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td className="storedValue">{student.password}</td>
                  <td>{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default StudentRecords;


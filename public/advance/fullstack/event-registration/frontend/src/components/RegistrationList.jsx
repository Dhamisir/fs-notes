function RegistrationList({ registrations }) {
  return (
    <section className="panel">
      <div className="listHeader"><h2>Registered users</h2><span>{registrations.length}</span></div>
      {registrations.length === 0 ? (
        <p className="emptyMessage">No registrations yet.</p>
      ) : (
        <div className="registrationList">
          {registrations.map((registration) => (
            <article key={registration.id}>
              <div><strong>{registration.name}</strong><p>{registration.email}</p></div>
              <div className="eventInfo"><strong>{registration.eventName}</strong><span>Age {registration.age}</span></div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RegistrationList;


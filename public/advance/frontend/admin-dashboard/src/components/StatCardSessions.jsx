function StatCardSessions() {
  return (
    <div className="statCard">
      <div className="statCard-icon" style={{ background: "#f6e6fb" }}>
        🖥️
      </div>
      <div className="statCard-body">
        <p className="statCard-label">Active Sessions</p>
        <p className="statCard-value">312</p>
        <p className="statCard-trend statCard-trend--up">▲ 5% vs last week</p>
      </div>
    </div>
  );
}

export default StatCardSessions;

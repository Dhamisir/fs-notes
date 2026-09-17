function StatCardRevenue() {
  return (
    <div className="statCard">
      <div className="statCard-icon" style={{ background: "#e6f5ec" }}>
        💰
      </div>
      <div className="statCard-body">
        <p className="statCard-label">Total Revenue</p>
        <p className="statCard-value">$48,290</p>
        <p className="statCard-trend statCard-trend--up">▲ 12% vs last week</p>
      </div>
    </div>
  );
}

export default StatCardRevenue;

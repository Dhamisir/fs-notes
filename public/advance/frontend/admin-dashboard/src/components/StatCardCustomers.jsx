function StatCardCustomers() {
  return (
    <div className="statCard">
      <div className="statCard-icon" style={{ background: "#fbeee6" }}>
        👥
      </div>
      <div className="statCard-body">
        <p className="statCard-label">New Customers</p>
        <p className="statCard-value">86</p>
        <p className="statCard-trend statCard-trend--down">▼ 3% vs last week</p>
      </div>
    </div>
  );
}

export default StatCardCustomers;

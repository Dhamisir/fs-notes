function StatCardOrders() {
  return (
    <div className="statCard">
      <div className="statCard-icon" style={{ background: "#e6edfb" }}>
        📦
      </div>
      <div className="statCard-body">
        <p className="statCard-label">Total Orders</p>
        <p className="statCard-value">1,204</p>
        <p className="statCard-trend statCard-trend--up">▲ 8% vs last week</p>
      </div>
    </div>
  );
}

export default StatCardOrders;

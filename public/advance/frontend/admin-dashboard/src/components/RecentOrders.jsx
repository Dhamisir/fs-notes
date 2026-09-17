import { recentOrders } from "../data";

function RecentOrders() {
  return (
    <section className="panel">
      <h2>Recent Orders</h2>
      <table className="ordersTable">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>
                <span className={`statusBadge statusBadge--${order.status}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default RecentOrders;

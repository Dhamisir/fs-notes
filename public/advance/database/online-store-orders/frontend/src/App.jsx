import { useEffect, useState } from "react";
import OrderList from "./components/OrderList";

const backendUrl = "http://localhost:3000";

function App() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("Loading orders...");

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch(`${backendUrl}/orders`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setOrders(result);
        setMessage("");
      } catch (error) {
        setMessage(error.message);
      }
    }
    loadOrders();
  }, []);

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Store dashboard</p>
        <h1>Online Store Orders</h1>
        <p>Customer orders and product information in one view.</p>
      </header>

      <div className="summary"><div><strong>{orders.length}</strong><span>Total orders</span></div><div><strong>{new Set(orders.map((order) => order.customerName)).size}</strong><span>Customers</span></div></div>
      {message ? <p className="challengeMessage">{message}</p> : <OrderList orders={orders} />}
    </main>
  );
}

export default App;


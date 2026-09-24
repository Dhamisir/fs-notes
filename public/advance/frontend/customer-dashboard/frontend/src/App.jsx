import { useEffect, useState } from "react";
import CustomerTable from "./components/CustomerTable";

const backendUrl = "http://localhost:3000";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/api/customers`)
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Acme Retail</p>
        <h1>Customer Dashboard</h1>
        <p>All registered customers.</p>
      </header>

      <CustomerTable customers={customers} />
    </main>
  );
}

export default App;

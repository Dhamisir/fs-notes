import { useEffect, useState } from "react";
import TicketList from "./components/TicketList";

const backendUrl = "http://localhost:3000";

function App() {
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/api/tickets`)
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Acme Retail · Support</p>
        <h1>Support Ticket Dashboard</h1>
        <p>Open and in-progress tickets from customers.</p>
      </header>

      <TicketList tickets={tickets} />
    </main>
  );
}

export default App;

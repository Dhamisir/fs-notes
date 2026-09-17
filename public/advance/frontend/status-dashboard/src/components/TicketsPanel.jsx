import { useEffect, useState } from "react";
import { getOpenTickets } from "../api";

function TicketsPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    setError(null);
    getOpenTickets()
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <section className="panel">
      <h2>Open Tickets</h2>

      {loading && <p className="panel-status">Loading open tickets…</p>}

      {error && (
        <div className="panel-error">
          <p>{error}</p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <ul className="ticketList">
          {data.map((ticket) => (
            <li key={ticket.id}>
              <span className={`priority priority--${ticket.priority}`}>
                {ticket.priority}
              </span>
              <span className="ticketList-subject">{ticket.subject}</span>
              <span className="ticketList-id">{ticket.id}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TicketsPanel;

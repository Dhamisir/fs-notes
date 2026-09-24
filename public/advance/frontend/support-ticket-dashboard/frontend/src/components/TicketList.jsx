function TicketList({ tickets }) {
  if (tickets === null) {
    return <p className="loadingMessage">Loading tickets…</p>;
  }

  return (
    <ul className="ticketList">
      {tickets.map((ticket) => (
        <li key={ticket.id} className="ticketList-item">
          <div className="ticketList-main">
            <span className={`priority priority--${ticket.priority.toLowerCase()}`}>
              {ticket.priority}
            </span>
            <span className="ticketList-subject">{ticket.subject}</span>
          </div>
          <div className="ticketList-meta">
            <span>{ticket.requester}</span>
            <span className={`status status--${ticket.status.toLowerCase().replace(" ", "-")}`}>
              {ticket.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TicketList;

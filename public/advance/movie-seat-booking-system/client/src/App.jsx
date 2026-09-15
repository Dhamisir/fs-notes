import { useEffect, useState } from "react";
import ShowInfo from "./components/ShowInfo";
import SeatMap from "./components/SeatMap";

const backendUrl = "http://localhost:4000";

const DEMO_USERS = [
  { id: 1, name: "Rahul Verma" },
  { id: 2, name: "Priya Singh" },
  { id: 3, name: "Kabir Khan" },
];

function App() {
  const [show, setShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [userId, setUserId] = useState(DEMO_USERS[0].id);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(true);

  async function loadShowAndSeats() {
    const showsResponse = await fetch(`${backendUrl}/api/shows`);
    const shows = await showsResponse.json();
    const firstShow = shows[0] || null;
    setShow(firstShow);

    if (firstShow) {
      const seatsResponse = await fetch(`${backendUrl}/api/shows/${firstShow.id}/seats`);
      const seatData = await seatsResponse.json();
      setSeats(seatData);
    }
  }

  useEffect(() => {
    loadShowAndSeats().finally(() => setLoading(false));
  }, []);

  async function handleBook() {
    if (!selectedSeatId || !show) return;
    setStatus({ type: "pending", message: "Booking seat..." });

    try {
      const response = await fetch(`${backendUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showId: show.id, seatId: selectedSeatId, userId }),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: result.message });
      } else {
        setStatus({ type: "success", message: result.message });
        setSelectedSeatId(null);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Could not reach the booking server." });
    }

    await loadShowAndSeats();
  }

  if (loading) {
    return (
      <main className="page">
        <p>Loading show information...</p>
      </main>
    );
  }

  if (!show) {
    return (
      <main className="page">
        <p>No shows are available right now.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Now booking</p>
        <h1>Movie Seat Booking</h1>
        <p>Select a seat and confirm your booking.</p>
      </header>

      <ShowInfo show={show} />

      <div className="userPicker">
        <label htmlFor="user">Booking as</label>
        <select id="user" value={userId} onChange={(event) => setUserId(Number(event.target.value))}>
          {DEMO_USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <SeatMap seats={seats} selectedSeatId={selectedSeatId} onSelect={setSelectedSeatId} />

      <div className="bookingBar">
        <button onClick={handleBook} disabled={!selectedSeatId || status.type === "pending"}>
          {selectedSeatId ? "Book seat" : "Select a seat"}
        </button>
        {status.message && <p className={`statusMessage ${status.type}`}>{status.message}</p>}
      </div>
    </main>
  );
}

export default App;

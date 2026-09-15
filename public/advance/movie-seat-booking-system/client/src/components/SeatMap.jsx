function SeatMap({ seats, selectedSeatId, onSelect }) {
  return (
    <section className="seatMap" aria-label="Seat map">
      {seats.map((seat) => {
        const isBooked = seat.status === "BOOKED";
        const isSelected = seat.id === selectedSeatId;
        const className = ["seat", isBooked ? "booked" : "available", isSelected ? "selected" : ""]
          .join(" ")
          .trim();

        return (
          <button
            key={seat.id}
            type="button"
            className={className}
            disabled={isBooked}
            onClick={() => onSelect(seat.id)}
          >
            {seat.seat_label}
          </button>
        );
      })}
    </section>
  );
}

export default SeatMap;

function formatElapsed(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function Header({ elapsedSeconds }) {
  return (
    <header className="pageHeader">
      <div>
        <p className="eyebrow">Acme Retail</p>
        <h1>Product Dashboard</h1>
      </div>
      <span className="sessionTimer">
        Viewing for {formatElapsed(elapsedSeconds)}
      </span>
    </header>
  );
}

export default Header;

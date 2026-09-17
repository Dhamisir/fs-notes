import { useEffect, useState } from "react";
import { getServerHealth } from "../api";

function ServerHealthPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    setError(null);
    getServerHealth()
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <section className="panel">
      <h2>Server Health</h2>

      {loading && <p className="panel-status">Loading server health…</p>}

      {error && (
        <div className="panel-error">
          <p>{error}</p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <ul className="healthList">
          {data.map((metric) => (
            <li key={metric.id}>
              <span>{metric.label}</span>
              <span className="healthList-value">{metric.value}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ServerHealthPanel;

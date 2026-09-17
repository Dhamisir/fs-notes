import { useEffect, useState } from "react";
import { getTeamStatus } from "../api";

function TeamStatusPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    setError(null);
    getTeamStatus()
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <section className="panel">
      <h2>Team Status</h2>

      {loading && <p className="panel-status">Loading team status…</p>}

      {error && (
        <div className="panel-error">
          <p>{error}</p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <ul className="teamList">
          {data.map((member) => (
            <li key={member.id}>
              <span className={`dot dot--${member.status}`} />
              <span>{member.name}</span>
              <span className="teamList-role">{member.role}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TeamStatusPanel;

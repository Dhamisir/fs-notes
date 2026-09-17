import TeamStatusPanel from "./components/TeamStatusPanel";
import TicketsPanel from "./components/TicketsPanel";
import ServerHealthPanel from "./components/ServerHealthPanel";

function App() {
  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Acme Retail · Ops</p>
        <h1>Status Dashboard</h1>
        <p>Live snapshot of the team, support queue, and infrastructure.</p>
      </header>

      <section className="panelsRow">
        <TeamStatusPanel />
        <TicketsPanel />
        <ServerHealthPanel />
      </section>
    </main>
  );
}

export default App;

import StatCardRevenue from "./components/StatCardRevenue";
import StatCardOrders from "./components/StatCardOrders";
import StatCardCustomers from "./components/StatCardCustomers";
import StatCardSessions from "./components/StatCardSessions";
import RecentOrders from "./components/RecentOrders";

function App() {
  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Acme Retail</p>
        <h1>Admin Dashboard</h1>
        <p>Today&apos;s snapshot of store performance.</p>
      </header>

      <section className="statsRow">
        <StatCardRevenue />
        <StatCardOrders />
        <StatCardCustomers />
        <StatCardSessions />
      </section>

      <RecentOrders />
    </main>
  );
}

export default App;

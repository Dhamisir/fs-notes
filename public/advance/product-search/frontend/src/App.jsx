import { useEffect, useState } from "react";
import ProductResults from "./components/ProductResults";

const backendUrl = "http://localhost:3000";

function App() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [durationMs, setDurationMs] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCount() {
      try {
        const response = await fetch(`${backendUrl}/products/count`);
        const result = await response.json();
        setTotalProducts(result.total);
      } catch (error) {
        setTotalProducts(null);
      }
    }
    loadCount();
  }, []);

  useEffect(() => {
    if (!term.trim()) {
      setResults([]);
      setDurationMs(null);
      setMessage("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`${backendUrl}/products/search?q=${encodeURIComponent(term)}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setResults(result.results);
        setDurationMs(result.durationMs);
        setMessage(result.results.length === 0 ? "No products found." : "");
      } catch (error) {
        setMessage(error.message);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [term]);

  return (
    <main className="page">
      <header className="pageHeader">
        <p className="eyebrow">Catalog search</p>
        <h1>Product Search</h1>
        <p>Search a large product catalog by name.</p>
      </header>

      <div className="summary">
        <div><strong>{totalProducts ?? "—"}</strong><span>Products in catalog</span></div>
        <div><strong>{durationMs === null ? "—" : `${durationMs} ms`}</strong><span>Last search time</span></div>
      </div>

      <input
        className="searchInput"
        type="text"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search products by name..."
      />

      {message ? <p className="challengeMessage">{message}</p> : <ProductResults products={results} />}
    </main>
  );
}

export default App;

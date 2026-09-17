import { useEffect, useState } from "react";
import { products } from "./data";
import { getCatalogInsights } from "./insights";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import InsightsPanel from "./components/InsightsPanel";
import ProductList from "./components/ProductList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const insights = getCatalogInsights(products);

  return (
    <main className="page">
      <Header elapsedSeconds={elapsedSeconds} />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <InsightsPanel insights={insights} />
      <ProductList products={filteredProducts} />
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import ProductManagement from "./components/ProductManagement";

const backendUrl = "http://localhost:3000";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [screen, setScreen] = useState("products");

  async function loadProducts() {
    const response = await fetch(`${backendUrl}/products`);
    setProducts(await response.json());
  }

  useEffect(() => {
    if (currentUser) loadProducts();
  }, [currentUser]);

  async function logIn(details) {
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    setCurrentUser(result);
  }

  if (!currentUser) return <Login onLogin={logIn} />;

  async function openProduct(id) {
    const response = await fetch(`${backendUrl}/products/${id}`);
    setSelectedProduct(await response.json());
    setScreen("details");
  }

  return (
    <main className="page">
      <header className="appHeader">
        <div><p className="eyebrow">Product catalog</p><h1>Product Manager</h1></div>
        <div className="userBadge"><strong>{currentUser.name}</strong><span>{currentUser.accountType}</span></div>
      </header>

      <nav className="tabs">
        <button className={screen === "products" ? "active" : ""} onClick={() => setScreen("products")}>Products</button>
        {currentUser.accountType === "admin" && (
          <button className={screen === "manage" ? "active" : ""} onClick={() => setScreen("manage")}>Manage products</button>
        )}
      </nav>

      {screen === "details" && selectedProduct ? (
        <ProductDetails product={selectedProduct} onBack={() => setScreen("products")} />
      ) : screen === "manage" && currentUser.accountType === "admin" ? (
        <ProductManagement backendUrl={backendUrl} products={products} onChange={loadProducts} />
      ) : (
        <ProductList products={products} onOpen={openProduct} />
      )}
    </main>
  );
}

export default App;


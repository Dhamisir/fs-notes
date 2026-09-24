import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
export default function App() {
  const [productId, setProductId] = useState("1");
  const [product, setProduct] = useState(null);
  const [metrics, setMetrics] = useState({ requests: 0, queries: 0, time: "—" });
  const [status, setStatus] = useState("Ready");
  async function loadProduct(id = productId) { const response = await fetch(API_URL + "/api/products/" + id); if (!response.ok) throw new Error("Request failed"); const data = await response.json(); setProduct(data.product); setMetrics((current) => ({ requests: current.requests + 1, queries: data.databaseQueries, time: data.databaseMs + " ms" })); }
  async function loadRepeatedly() { setStatus("Requesting the same product…"); try { for (let index = 0; index < 8; index += 1) await loadProduct(); setStatus("Repeated requests complete"); } catch { setStatus("Request failed"); } }
  return <main><p className="eyebrow">Product Catalog</p><h1>Product Details</h1><p className="intro">Request a product, then observe what the backend does when that same product is requested repeatedly.</p><div className="actions"><input value={productId} onChange={(event) => setProductId(event.target.value)} aria-label="Product ID"/><button onClick={() => loadProduct().catch(() => setStatus("Request failed"))}>Load product</button><button className="secondary" onClick={loadRepeatedly}>Load 8 times</button><span>{status}</span></div><dl className="metrics"><div><dt>Requests completed</dt><dd>{metrics.requests}</dd></div><div><dt>Database operations</dt><dd>{metrics.queries}</dd></div><div><dt>Last database time</dt><dd>{metrics.time}</dd></div></dl>{product && <article><div><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p>★ {product.average_rating} · {product.units_sold} sold</p></div><strong>{"$" + product.price}</strong></article>}</main>;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function InsightsPanel({ insights }) {
  return (
    <section className="insightsPanel">
      <div className="insightsPanel-stats">
        <div>
          <p className="statLabel">Products</p>
          <p className="statValue">{insights.totalProducts}</p>
        </div>
        <div>
          <p className="statLabel">Inventory Value</p>
          <p className="statValue">{formatCurrency(insights.totalValue)}</p>
        </div>
        <div>
          <p className="statLabel">Average Price</p>
          <p className="statValue">{formatCurrency(insights.averagePrice)}</p>
        </div>
        <div>
          <p className="statLabel">Top Category</p>
          <p className="statValue">{insights.topCategory}</p>
        </div>
      </div>

      <div className="insightsPanel-top">
        <p className="statLabel">Most Expensive Products</p>
        <ol>
          {insights.topProducts.map((product) => (
            <li key={product.id}>
              {product.name} — {formatCurrency(product.price)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default InsightsPanel;

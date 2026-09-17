import ProductCard from "./ProductCard";

function ProductGrid({ products, onAdd }) {
  return (
    <section className="productGrid">
      <h2>Products</h2>
      <div className="productGrid-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;

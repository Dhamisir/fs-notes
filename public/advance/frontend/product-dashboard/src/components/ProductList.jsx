import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="emptyMessage">No products match your search.</p>;
  }

  return (
    <section className="productGrid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductList;

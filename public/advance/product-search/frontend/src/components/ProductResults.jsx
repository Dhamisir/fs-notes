function ProductResults({ products }) {
  return (
    <section className="resultGrid" aria-label="Search results">
      {products.map((product) => (
        <article className="resultCard" key={product.id}>
          <h2>{product.name}</h2>
          <p className="price">₹{Number(product.price).toLocaleString("en-IN")}</p>
        </article>
      ))}
    </section>
  );
}

export default ProductResults;

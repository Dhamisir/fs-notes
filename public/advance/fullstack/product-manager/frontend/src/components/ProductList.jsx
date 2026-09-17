function ProductList({ products, onOpen }) {
  return (
    <section><div className="sectionHeading"><h2>Products</h2><span>{products.length} items</span></div>
      <div className="productGrid">
        {products.map((product) => (
          <article className="productCard" key={product.id}>
            <div><h3>{product.name}</h3><p>{product.description}</p></div>
            <div className="cardFooter"><strong>${Number(product.price).toFixed(2)}</strong><button onClick={() => onOpen(product.id)}>View details</button></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;


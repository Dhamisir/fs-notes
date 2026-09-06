function ProductDetails({ product, onBack }) {
  return (
    <section className="panel detailsPanel">
      <button className="backButton" onClick={onBack}>← Back to products</button>
      <p className="eyebrow">Product details</p><h2>{product.name}</h2>
      <p className="description">{product.description}</p>
      <strong className="detailPrice">${Number(product.price).toFixed(2)}</strong>
    </section>
  );
}

export default ProductDetails;


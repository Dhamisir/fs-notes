function ProductCard({ product, onAdd }) {
  return (
    <div className="productCard">
      <span className="productCard-emoji">{product.emoji}</span>
      <p className="productCard-name">{product.name}</p>
      <p className="productCard-price">${product.price.toFixed(2)}</p>
      <button onClick={() => onAdd(product.id)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;

function ProductCard({ product }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="productCard">
      <p className="productCard-name">{product.name}</p>
      <p className="productCard-category">{product.category}</p>
      <p className="productCard-price">{formatter.format(product.price)}</p>
      <p className="productCard-stock">{product.stock} in stock</p>
    </div>
  );
}

export default ProductCard;

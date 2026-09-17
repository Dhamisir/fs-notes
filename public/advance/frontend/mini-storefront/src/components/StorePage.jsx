import ProductGrid from "./ProductGrid";
import CartPanel from "./CartPanel";

function StorePage({ products, cart, onAdd, onRemove, onUpdateQuantity }) {
  return (
    <div className="storePage">
      <ProductGrid products={products} onAdd={onAdd} />
      <CartPanel
        cart={cart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
}

export default StorePage;

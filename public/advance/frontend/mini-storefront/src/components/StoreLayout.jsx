import Header from "./Header";
import StorePage from "./StorePage";

function StoreLayout({ products, cart, onAdd, onRemove, onUpdateQuantity }) {
  return (
    <div className="storeLayout">
      <Header cart={cart} />
      <StorePage
        products={products}
        cart={cart}
        onAdd={onAdd}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
}

export default StoreLayout;

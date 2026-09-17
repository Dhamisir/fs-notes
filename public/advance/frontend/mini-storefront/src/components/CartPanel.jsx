import CartItemsList from "./CartItemsList";
import CartTotals from "./CartTotals";

function CartPanel({ cart, onRemove, onUpdateQuantity }) {
  return (
    <aside className="cartPanel">
      <h2>Your Cart</h2>
      <CartItemsList
        cart={cart}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />
      <CartTotals cart={cart} />
    </aside>
  );
}

export default CartPanel;

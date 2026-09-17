import { products } from "../data";

function CartItemsList({ cart, onRemove, onUpdateQuantity }) {
  if (cart.length === 0) {
    return <p className="cartPanel-empty">Your cart is empty.</p>;
  }

  return (
    <ul className="cartItemsList">
      {cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return (
          <li key={item.productId}>
            <span className="cartItemsList-name">
              {product.emoji} {product.name}
            </span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) =>
                onUpdateQuantity(item.productId, Number(event.target.value))
              }
            />
            <button onClick={() => onRemove(item.productId)}>Remove</button>
          </li>
        );
      })}
    </ul>
  );
}

export default CartItemsList;

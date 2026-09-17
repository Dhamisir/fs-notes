import { products } from "../data";

function CartTotals({ cart }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + product.price * item.quantity;
  }, 0);

  return (
    <div className="cartTotals">
      <p>Items: {itemCount}</p>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
    </div>
  );
}

export default CartTotals;

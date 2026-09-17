import { useState } from "react";
import { products } from "./data";
import StoreLayout from "./components/StoreLayout";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  function handleAdd(productId) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
  }

  function handleRemove(productId) {
    setCart((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }

  function handleUpdateQuantity(productId, quantity) {
    setCart((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.productId !== productId);
      }
      return current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      );
    });
  }

  return (
    <>
      <StoreLayout
        products={products}
        cart={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <Footer cart={cart} />
    </>
  );
}

export default App;

function OrderList({ orders }) {
  return (
    <section className="orderGrid" aria-label="Orders">
      {orders.map((order) => (
        <article className="orderCard" key={order.id}>
          <div className="orderTop"><span>Order #{order.id}</span><strong>×{order.quantity}</strong></div>
          <h2>{order.productName}</h2>
          <p className="customer">Customer: {order.customerName}</p>
          <div className="priceRow"><span>Product price</span><strong>₹{Number(order.productPrice).toLocaleString("en-IN")}</strong></div>
        </article>
      ))}
    </section>
  );
}

export default OrderList;


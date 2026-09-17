function Footer({ cart }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <footer className="siteFooter">
      <p>
        🛒 {itemCount} item{itemCount === 1 ? "" : "s"} in your cart — free
        shipping over $50.
      </p>
    </footer>
  );
}

export default Footer;

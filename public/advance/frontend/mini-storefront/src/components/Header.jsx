function Header({ cart }) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="siteHeader">
      <div>
        <p className="eyebrow">Acme Retail</p>
        <h1>Mini Storefront</h1>
      </div>
      <span className="cartBadge">🛒 {itemCount}</span>
    </header>
  );
}

export default Header;

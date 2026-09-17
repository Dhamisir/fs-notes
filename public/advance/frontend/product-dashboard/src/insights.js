export function getCatalogInsights(products) {
  let totalValue = 0;
  let totalPrice = 0;
  const categoryCounts = {};

  for (const product of products) {
    totalValue += product.price * product.stock;
    totalPrice += product.price;
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  }

  const averagePrice = totalPrice / products.length;

  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0][0];

  const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 5);

  return {
    totalProducts: products.length,
    totalValue,
    averagePrice,
    topCategory,
    topProducts,
  };
}

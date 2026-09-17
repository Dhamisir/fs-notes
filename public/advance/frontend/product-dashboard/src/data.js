const categories = [
  "Electronics",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Beauty",
  "Office",
  "Toys & Games",
];

const adjectives = [
  "Premium",
  "Compact",
  "Wireless",
  "Portable",
  "Eco-Friendly",
  "Heavy-Duty",
  "Deluxe",
  "Classic",
  "Smart",
  "Ultra",
  "Rugged",
  "Sleek",
];

const nouns = [
  "Blender",
  "Backpack",
  "Charger",
  "Headphones",
  "Desk Lamp",
  "Yoga Mat",
  "Water Bottle",
  "Keyboard",
  "Monitor Stand",
  "Speaker",
  "Trimmer",
  "Organizer",
  "Notebook",
  "Tent",
  "Cookware Set",
];

function generateProducts(count) {
  const items = [];

  for (let i = 0; i < count; i++) {
    const adjective = adjectives[i % adjectives.length];
    const noun = nouns[(i * 7) % nouns.length];
    const category = categories[(i * 3) % categories.length];
    const price = Number((5 + ((i * 37) % 495) + (i % 7) * 1.5).toFixed(2));
    const stock = (i * 13) % 200;

    items.push({
      id: i + 1,
      name: `${adjective} ${noun} ${i + 1}`,
      category,
      price,
      stock,
    });
  }

  return items;
}

export const products = generateProducts(5000);

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const CATEGORIES = [
  { id: 'ceramics', label: 'Ceramics', emoji: '🏺', hue: 24,  names: ['Stoneware Bowl', 'Glazed Vase', 'Tea Set', 'Planter', 'Serving Platter'], range: [399, 4999] },
  { id: 'lighting', label: 'Lighting', emoji: '💡', hue: 48,  names: ['Table Lamp', 'Pendant Light', 'Floor Lamp', 'Wall Sconce', 'Paper Lantern'], range: [799, 12999] },
  { id: 'textiles', label: 'Textiles', emoji: '🧶', hue: 340, names: ['Linen Throw', 'Cotton Rug', 'Cushion Cover', 'Woven Basket', 'Jute Runner'], range: [299, 8999] },
  { id: 'furniture', label: 'Furniture', emoji: '🪑', hue: 150, names: ['Oak Stool', 'Side Table', 'Bookshelf', 'Bench', 'Console Table'], range: [2499, 24999] },
  { id: 'kitchen', label: 'Kitchen', emoji: '🍳', hue: 200, names: ['Cast Iron Pan', 'Knife Set', 'Spice Rack', 'Chopping Board', 'Copper Kettle'], range: [449, 6999] },
];

const ADJECTIVES = ['Aria', 'Sona', 'Meru', 'Kavi', 'Tara', 'Nila', 'Ojas', 'Ravi', 'Isha', 'Dev'];

const rand = mulberry32(2026);

export const PRODUCTS = Array.from({ length: 240 }, (_, i) => {
  const cat = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];
  const base = cat.names[Math.floor(rand() * cat.names.length)];
  const [lo, hi] = cat.range;
  return {
    id: i + 1,
    name: `${ADJECTIVES[Math.floor(rand() * ADJECTIVES.length)]} ${base}`,
    category: cat.id,
    emoji: cat.emoji,
    hue: cat.hue,
    price: Math.round((lo + rand() * (hi - lo)) / 10) * 10,
    rating: Math.round((3 + rand() * 2) * 10) / 10,
    inStock: rand() > 0.18,
    addedAt: i, 
  };
});

export const MIN_PRICE = Math.floor(Math.min(...PRODUCTS.map((p) => p.price)) / 100) * 100;
export const MAX_PRICE = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 100) * 100;

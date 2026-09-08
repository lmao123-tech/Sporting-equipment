// lib/data.js
//
// Mock product data access layer.
//
// The client hasn't provided real product data yet, so everything below is
// placeholder content. Every exported function is written the way a
// DB-backed version would be called (an id goes in, a product or list of
// products comes out) specifically so that swapping the *inside* of these
// functions for real SQLite queries later does NOT require changing any
// page or component that calls them. When that day comes: replace the
// `products` array + these functions with a `better-sqlite3` (or similar)
// connection and equivalent SELECT statements, keep the function
// signatures the same.

function swatch(hex, label) {
  // Stands in for a real per-color product photo, which the client will
  // eventually supply. Renders a colored square with a label so the
  // color-swap behavior is visibly demonstrable without real assets.
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
      <rect width="400" height="400" fill="${hex}" />
      <text x="50%" y="50%" font-size="24" fill="#fff" text-anchor="middle"
        dominant-baseline="middle" font-family="sans-serif">${label}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CATEGORIES = [
  { slug: "protein-bars", name: "Protein Bars" },
  { slug: "apparel", name: "Apparel" },
  { slug: "equipment", name: "Equipment" },
];

// Header navigation structure — modeled on zajo.com/bg's mega-menu (the
// client's design reference, see claude/design-reference-zajo.md): a
// top-level category that has more than one product grouping opens a
// full-width dropdown of flat columns (icon + heading + item list + an
// "All" link), rather than a cascading side-flyout menu. A category with
// nothing to group under it yet (Protein Bars) is just a plain link.
//
// Every leaf still links to a *real* filter (?category=<slug>) against
// the 3 categories the mock product data actually has today — the
// column/item breakdown under Apparel and Equipment is example/mock
// structure showing how real subcategories would slot in once the
// client defines them (per Questions.md); it doesn't change what
// products come back yet. `columns[].icon` names look up an icon in
// components/CategoryIcon.js.
export const NAV_MENU = [
  { label: "Protein Bars", href: "/?category=protein-bars" },
  {
    label: "Apparel",
    href: "/?category=apparel",
    columns: [
      {
        heading: "Men",
        icon: "shirt",
        allHref: "/?category=apparel",
        items: [
          { label: "Shirts", href: "/?category=apparel" },
          { label: "Jeans", href: "/?category=apparel" },
          { label: "Jackets", href: "/?category=apparel" },
          { label: "Fall Jackets", href: "/?category=apparel" },
          { label: "Winter Jackets", href: "/?category=apparel" },
        ],
      },
      {
        heading: "Women",
        icon: "dress",
        allHref: "/?category=apparel",
        items: [
          { label: "Shirts", href: "/?category=apparel" },
          { label: "Jeans", href: "/?category=apparel" },
          { label: "Jackets", href: "/?category=apparel" },
        ],
      },
    ],
  },
  {
    label: "Equipment",
    href: "/?category=equipment",
    columns: [
      {
        heading: "Free Weights",
        icon: "dumbbell",
        allHref: "/?category=equipment",
        items: [
          { label: "Adjustable Dumbbells", href: "/?category=equipment" },
          { label: "Fixed Dumbbells", href: "/?category=equipment" },
          { label: "Kettlebells", href: "/?category=equipment" },
        ],
      },
      {
        heading: "Resistance & Bands",
        icon: "band",
        allHref: "/?category=equipment",
        items: [
          { label: "Resistance Bands", href: "/?category=equipment" },
          { label: "Pull-up Bands", href: "/?category=equipment" },
        ],
      },
    ],
  },
];

const products = [
  {
    id: "1",
    name: "Whey Protein Bar",
    category: "protein-bars",
    description: "20g protein, low sugar. Sold per box of 12 bars.",
    price: 24.99,
    sizes: ["Box of 12", "Box of 24"],
    colors: [
      { name: "Chocolate", hex: "#5b3a29", image: swatch("#5b3a29", "Chocolate") },
      { name: "Peanut Butter", hex: "#c98a3e", image: swatch("#c98a3e", "Peanut Butter") },
      { name: "Vanilla", hex: "#e8dcc0", image: swatch("#e8dcc0", "Vanilla") },
    ],
  },
  {
    id: "2",
    name: "Training T-Shirt",
    category: "apparel",
    description: "Breathable moisture-wicking training tee.",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111", image: swatch("#111111", "Black") },
      { name: "Navy", hex: "#1f2a44", image: swatch("#1f2a44", "Navy") },
      { name: "Red", hex: "#a3242a", image: swatch("#a3242a", "Red") },
    ],
  },
  {
    id: "3",
    name: "Adjustable Dumbbell Set",
    category: "equipment",
    description: "Pair of adjustable dumbbells, 5-25kg each.",
    price: 149.99,
    sizes: ["5-25kg", "10-40kg"],
    colors: [{ name: "Black/Red", hex: "#222222", image: swatch("#222222", "Black/Red") }],
  },
  {
    id: "4",
    name: "Resistance Band Set",
    category: "equipment",
    description: "Set of 5 resistance bands, varying strengths.",
    price: 29.99,
    sizes: ["Standard"],
    colors: [{ name: "Multicolor", hex: "#3a7ca5", image: swatch("#3a7ca5", "Multicolor") }],
  },
  {
    id: "5",
    name: "Vegan Protein Bar",
    category: "protein-bars",
    description: "Plant-based protein bar, 18g protein per bar.",
    price: 22.99,
    sizes: ["Box of 12"],
    colors: [
      { name: "Cocoa", hex: "#4a2c1d", image: swatch("#4a2c1d", "Cocoa") },
      { name: "Berry", hex: "#7a2048", image: swatch("#7a2048", "Berry") },
    ],
  },
  {
    id: "6",
    name: "Training Shorts",
    category: "apparel",
    description: "Lightweight shorts with a zip pocket.",
    price: 24.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#111111", image: swatch("#111111", "Black") },
      { name: "Grey", hex: "#7a7a7a", image: swatch("#7a7a7a", "Grey") },
    ],
  },
];

// --- Accessor functions (this is the "DB layer" boundary) -----------------

export function getAllProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(limit = 4) {
  return products.slice(0, limit);
}

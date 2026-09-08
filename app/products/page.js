import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, getAllProducts, getProductsByCategory } from "@/lib/data";

// Catalogue listing page. Optional ?category=<slug> filters the grid.
export default function ProductsPage({ searchParams }) {
  const category = searchParams?.category;
  const products = category ? getProductsByCategory(category) : getAllProducts();
  const activeCategory = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      <h1>{activeCategory ? activeCategory.name : "All products"}</h1>
      <ProductGrid products={products} />
    </div>
  );
}

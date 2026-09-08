import Section from "@/components/Section";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, getAllProducts, getProductsByCategory } from "@/lib/data";
import styles from "./page.module.css";

// Home page. Used to show only a "featured" subset with a separate
// /products catalogue page for everything else + category browsing.
// Merged per 2026-09-08 decision: this page now shows every product,
// and category browsing moved into the header's mega-menu (see
// components/MegaMenu.js + NAV_MENU in lib/data.js) instead of a tile
// grid here. The optional ?category=<slug> query param (set by clicking
// a category in the header) still filters this same grid — no separate
// route needed for that anymore.
export default function HomePage({ searchParams }) {
  const activeCategory = CATEGORIES.find((c) => c.slug === searchParams?.category);
  const products = activeCategory ? getProductsByCategory(activeCategory.slug) : getAllProducts();

  return (
    <>
      <div className={styles.hero}>
        <h1>Pavkata</h1>
        <p>Sporting equipment, apparel, and nutrition.</p>
      </div>

      <Section id="products" title={activeCategory ? activeCategory.name : "All products"}>
        <ProductGrid products={products} />
      </Section>
    </>
  );
}

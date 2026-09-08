import Link from "next/link";
import Section from "@/components/Section";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, getFeaturedProducts, getProductsByCategory } from "@/lib/data";
import styles from "./page.module.css";

// Home page: divided into sections, per the brief. All content is
// server-rendered directly from the mock data layer (lib/data.js) — no
// client-side fetch needed here since none of this section is interactive.
export default function HomePage() {
  const featured = getFeaturedProducts(4);

  return (
    <>
      <div className={styles.hero}>
        <h1>Pavkata</h1>
        <p>Sporting equipment, apparel, and nutrition.</p>
        <Link href="/products" className="btn-primary">
          Browse the catalogue
        </Link>
      </div>

      <Section title="Shop by category">
        <div className={styles.categories}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/products?category=${cat.slug}`} className={styles.categoryTile}>
              {cat.name} ({getProductsByCategory(cat.slug).length})
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Featured products">
        <ProductGrid products={featured} />
      </Section>
    </>
  );
}

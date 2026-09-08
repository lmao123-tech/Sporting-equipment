import Link from "next/link";
import Section from "@/components/Section";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES, getFeaturedProducts, getProductsByCategory } from "@/lib/data";

// Home page: divided into sections, per the brief. All content is
// server-rendered directly from the mock data layer (lib/data.js) — no
// client-side fetch needed here since none of this section is interactive.
export default function HomePage() {
  const featured = getFeaturedProducts(4);

  return (
    <>
      <div style={{ padding: "3rem 1rem", textAlign: "center", background: "#f2f2f2" }}>
        <h1>Pavkata</h1>
        <p>Sporting equipment, apparel, and nutrition.</p>
        <Link href="/products">Browse the catalogue</Link>
      </div>

      <Section title="Shop by category">
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              style={{
                border: "1px solid #ddd",
                padding: "1rem 1.5rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
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

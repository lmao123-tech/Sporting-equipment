import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import ProductDetail from "@/components/ProductDetail";

// This is "the page that fetches the product from the DB" the brief calls
// for. Right now it reads from the mock data layer (lib/data.js); when the
// real database is wired up, only getProductById's internals need to
// change — this page and everything it renders stays the same.
export default function ProductDetailPage({ params }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}

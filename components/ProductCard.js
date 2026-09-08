import Link from "next/link";

export default function ProductCard({ product }) {
  const cover = product.colors[0];

  return (
    <Link
      href={`/products/${product.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <img src={cover.image} alt={product.name} style={{ width: "100%", height: "auto" }} />
      <div style={{ marginTop: "0.5rem" }}>
        <strong>{product.name}</strong>
        <div>${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}

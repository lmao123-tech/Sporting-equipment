"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{ borderBottom: "1px solid #ddd", padding: "1rem 0" }}>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Link href="/" style={{ fontWeight: "bold", fontSize: "1.25rem", textDecoration: "none" }}>
          Pavkata
        </Link>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/products">Catalogue</Link>
          <Link href="/cart">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  );
}

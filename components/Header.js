"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo}>
          Pavkata
        </Link>
        <nav className={styles.nav}>
          <Link href="/products" className={styles.navLink}>
            Catalogue
          </Link>
          <Link href="/cart" className={styles.cartBadge}>
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}

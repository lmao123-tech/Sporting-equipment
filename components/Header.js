"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import MegaMenu from "@/components/MegaMenu";
import { NAV_MENU } from "@/lib/data";
import styles from "./Header.module.css";

// Which category's mega-menu (if any) is open. Tracked on the whole
// header rather than per nav item, since the dropdown panel itself is a
// full-width sibling of the nav, not something nested inside one link.
export default function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const [openCategory, setOpenCategory] = useState(null);

  const activeItem = NAV_MENU.find((item) => item.label === openCategory && item.columns);

  function close() {
    setOpenCategory(null);
  }

  // Closes the menu once focus leaves the header entirely (e.g. tabbing
  // past the last link), without closing while focus just moves from one
  // nav link to the next, or down into the open panel.
  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) close();
  }

  return (
    <header className={styles.header} onMouseLeave={close} onBlur={handleBlur}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo}>
          Pavkata
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            All products
          </Link>
          {NAV_MENU.map((item) => (
            <div
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => item.columns && setOpenCategory(item.label)}
              onFocus={() => item.columns && setOpenCategory(item.label)}
            >
              <Link href={item.href} className={styles.navLink}>
                {item.label}
                {item.columns && (
                  <svg
                    viewBox="0 0 24 24"
                    className={styles.chevron}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </Link>
            </div>
          ))}
          <Link href="/cart" className={styles.cartBadge}>
            Cart ({count})
          </Link>
        </nav>
      </div>

      {activeItem && <MegaMenu columns={activeItem.columns} />}
    </header>
  );
}

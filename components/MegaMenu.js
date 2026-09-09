import Link from "next/link";
import CategoryIcon from "./CategoryIcon";
import styles from "./MegaMenu.module.css";

// The full-width dropdown panel for one nav category — flat columns of
// icon + heading + item list + an "All" link, modeled on zajo.com/bg's
// mega-menu. This component only renders whatever `columns` it's given,
// so the same component covers Apparel, Equipment, or any future
// category: swapping in real subcategories from a DB/API later means
// changing what's passed in (see NAV_MENU in lib/data.js), not this file.
export default function MegaMenu({ columns }) {
  return (
    <div className={styles.panel}>
      <div className={`container ${styles.grid}`}>
        {columns.map((col) => (
          <div key={col.heading} className={styles.column}>
            <CategoryIcon name={col.icon} className={styles.icon} />
            <h3 className={styles.heading}>{col.heading}</h3>
            <ul className={styles.list}>
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <Link href={col.allHref} className={styles.all}>
              All
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

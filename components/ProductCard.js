"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";

// Auto-cycles through the product's available images (currently one per
// color, later potentially multiple angles per color once real photos
// exist) so a browsing visitor sees more than just the first variant
// without clicking in. Whether this should auto-advance or require a
// click is an open question for the client — see Questions.md — this is
// the auto-advancing version for now.
const CYCLE_MS = 2500;

export default function ProductCard({ product }) {
  const images = product.colors.map((c) => c.image);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [images.length, paused]);

  return (
    <Link
      href={`/products/${product.id}`}
      className={styles.card}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.imageWrap}>
        <img src={images[index]} alt={product.name} className={styles.image} />
        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <span key={i} className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <strong className={styles.name}>{product.name}</strong>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}

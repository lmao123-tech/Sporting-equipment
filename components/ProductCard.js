"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ProductCard.module.css";

// Lets the visitor click/tap through a product's available images
// (currently one per color, later potentially multiple angles per color
// once real photos exist) instead of them auto-advancing — decided
// 2026-09-08: auto-cycling looked odd with a full grid of cards all
// changing image at once, and click-through is more predictable.
//
// The images sit in a horizontal "track" that gets translated, so moving
// between them is a smooth slide rather than an instant swap.
//
// The arrows are siblings of the <Link> (not nested inside it) so we
// don't end up with an invalid <button> inside an <a>: the Link covers
// the image for "go to product," the arrows float on top of it and just
// change which image is showing.
export default function ProductCard({ product }) {
  const images = product.colors.map((c) => c.image);
  const [index, setIndex] = useState(0);

  function goTo(i) {
    setIndex((i + images.length) % images.length);
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Link href={`/products/${product.id}`} className={styles.imageLink} aria-label={product.name}>
          <div
            className={styles.track}
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${(index * 100) / images.length}%)`,
            }}
          >
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={product.name}
                className={styles.image}
                style={{ width: `${100 / images.length}%` }}
              />
            ))}
          </div>
        </Link>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
            >
              <svg
                viewBox="0 0 24 24"
                className={styles.arrowIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
            >
              <svg
                viewBox="0 0 24 24"
                className={styles.arrowIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className={styles.dots}>
              {images.map((_, i) => (
                <span key={i} className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
              ))}
            </div>
          </>
        )}
      </div>
      <Link href={`/products/${product.id}`} className={styles.info}>
        <strong className={styles.name}>{product.name}</strong>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
      </Link>
    </div>
  );
}

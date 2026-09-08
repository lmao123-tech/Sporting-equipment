"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import AddToCartForm from "./AddToCartForm";
import styles from "./ProductDetail.module.css";

// Client boundary for the product detail page: holds which color is
// currently selected so the gallery image and the add-to-cart form
// (which needs to know the selected color) stay in sync.
export default function ProductDetail({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className={`container ${styles.wrap}`}>
      <ProductGallery
        colors={product.colors}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        productName={product.name}
      />
      <div className={styles.info}>
        <h1>{product.name}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p>
        <AddToCartForm product={product} selectedColor={selectedColor} />
      </div>
    </div>
  );
}

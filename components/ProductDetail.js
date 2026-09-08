"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import AddToCartForm from "./AddToCartForm";

// Client boundary for the product detail page: holds which color is
// currently selected so the gallery image and the add-to-cart form
// (which needs to know the selected color) stay in sync.
export default function ProductDetail({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div
      className="container"
      style={{
        padding: "2rem 1rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
      }}
    >
      <ProductGallery
        colors={product.colors}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        productName={product.name}
      />
      <div>
        <h1>{product.name}</h1>
        <p>${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <AddToCartForm product={product} selectedColor={selectedColor} />
      </div>
    </div>
  );
}

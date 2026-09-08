"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartForm({ product, selectedColor }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    addItem(product, { size, color: selectedColor, quantity });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <form onSubmit={handleSubmit} className="form" style={{ marginTop: "1.5rem" }}>
      <label className="form-field">
        Size
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          {product.sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        Quantity
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
      </label>

      <button type="submit" className="btn-primary">
        Add to cart
      </button>
      {justAdded && <span style={{ color: "var(--color-accent)", fontSize: "0.9rem" }}>Added to cart.</span>}
    </form>
  );
}

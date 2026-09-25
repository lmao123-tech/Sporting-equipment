"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantityInput from "@/components/QuantityInput";

export default function AddToCartForm({ product, selectedColor }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const outOfStock = selectedColor.stock === 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (outOfStock) return; // guards against a bypassed `disabled` attribute
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
        <QuantityInput value={quantity} onChange={setQuantity} />
      </label>

      <button type="submit" className="btn-primary" disabled={outOfStock}>
        Add to cart
      </button>
      {outOfStock ? (
        <span style={{ color: "crimson", fontSize: "0.9rem" }}>
          This product is currently unavailable in {selectedColor.name}.
        </span>
      ) : (
        justAdded && <span style={{ color: "var(--color-accent)", fontSize: "0.9rem" }}>Added to cart.</span>
      )}
    </form>
  );
}

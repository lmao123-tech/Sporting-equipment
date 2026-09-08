"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import InquiryForm from "@/components/InquiryForm";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "2rem 1rem" }}>
        <h1>Your cart</h1>
        <p>
          Your cart is empty. <Link href="/products">Browse the catalogue</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      <h1>Your cart</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.key} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0" }}>
                <img src={item.image} alt={item.name} style={{ width: "48px", height: "48px" }} />
                {item.name}
              </td>
              <td>{item.size}</td>
              <td>{item.color}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.key, Math.max(1, Number(e.target.value)))}
                  style={{ width: "60px" }}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button type="button" onClick={() => removeItem(item.key)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: "right", fontWeight: "bold" }}>Subtotal: ${subtotal.toFixed(2)}</p>

      <InquiryForm />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import InquiryForm from "@/components/InquiryForm";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className={`container ${styles.wrap}`}>
        <h1>Your cart</h1>
        <p>
          Your cart is empty. <Link href="/products">Browse the catalogue</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className={`container ${styles.wrap}`}>
      <h1>Your cart</h1>

      <div className={styles.list}>
        {items.map((item) => (
          <div className={styles.row} key={item.key}>
            <div className={styles.product}>
              <img src={item.image} alt={item.name} className={styles.thumb} />
              <div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.variant}>
                  {item.size} · {item.color}
                </div>
              </div>
            </div>

            <div className={styles.controls}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.key, Math.max(1, Number(e.target.value)))}
                className={styles.qtyInput}
                aria-label={`Quantity for ${item.name}`}
              />
              <div className={styles.lineTotal}>${(item.price * item.quantity).toFixed(2)}</div>
              <button type="button" onClick={() => removeItem(item.key)} className={styles.removeBtn}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</p>

      <InquiryForm />
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import InquiryForm from "@/components/InquiryForm";
import UndoToast from "@/components/UndoToast";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, updateQuantity, removeItem, restoreItem, subtotal } = useCart();

  // Removing a line item is immediate (so the list updates right away),
  // but we hang onto the removed item + its original index for a few
  // seconds so the undo toast's "Cancel" can put it back where it was.
  const [pendingRemoval, setPendingRemoval] = useState(null);

  const handleRemove = useCallback(
    (item) => {
      const index = items.findIndex((i) => i.key === item.key);
      removeItem(item.key);
      setPendingRemoval({ item, index, toastId: `${item.key}-${Date.now()}` });
    },
    [items, removeItem]
  );

  function handleUndo() {
    if (!pendingRemoval) return;
    restoreItem(pendingRemoval.item, pendingRemoval.index);
    setPendingRemoval(null);
  }

  function handleExpire() {
    setPendingRemoval(null);
  }

  return (
    <div className={`container ${styles.wrap}`}>
      <h1>Your cart</h1>

      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/">Browse products</Link>.
        </p>
      ) : (
        <>
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
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className={styles.removeBtn}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg viewBox="0 0 24 24" className={styles.removeIcon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</p>

          <InquiryForm />
        </>
      )}

      {pendingRemoval && (
        <UndoToast
          key={pendingRemoval.toastId}
          message={`Removed ${pendingRemoval.item.name}.`}
          onUndo={handleUndo}
          onExpire={handleExpire}
        />
      )}
    </div>
  );
}

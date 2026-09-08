"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "pavkata_cart";

// Cart line items look like:
//   { key, productId, name, size, color, price, image, quantity }
// `key` = `${productId}-${size}-${color}` so the same product in a
// different size/color is tracked as a separate line item.

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load any persisted cart on mount (client only — localStorage doesn't
  // exist during server rendering).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Malformed or blocked storage (private browsing, etc.) — cart just
      // starts empty, which is a safe fallback.
    }
    setHydrated(true);
  }, []);

  // Persist on every change, but only after the initial load above has run
  // (otherwise we'd immediately overwrite storage with an empty array).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors.
    }
  }, [items, hydrated]);

  function addItem(product, { size, color, quantity = 1 }) {
    const key = `${product.id}-${size}-${color.name}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          size,
          color: color.name,
          price: product.price,
          image: color.image,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(key, quantity) {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }

  // Reinserts a previously-removed line item at (roughly) its original
  // position — used for the cart's "undo remove" toast. Not the same as
  // addItem: this restores the exact item object rather than merging
  // quantities, since it's undoing a removal, not adding something new.
  function restoreItem(item, index) {
    setItems((prev) => {
      const next = [...prev];
      const clampedIndex = Math.min(Math.max(index, 0), next.length);
      next.splice(clampedIndex, 0, item);
      return next;
    });
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, restoreItem, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

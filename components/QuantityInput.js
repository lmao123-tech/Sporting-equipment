"use client";

import { useEffect, useState } from "react";

// A quantity <input type="number"> that behaves like people expect: you
// can clear the "1" to type a different number (e.g. delete it, type
// "3") instead of getting stuck because deleting leaves an empty string,
// `Number("")` is 0, and the old `Math.max(1, ...)` clamp on every
// keystroke snapped it straight back to "1" before you could type
// anything else.
//
// The fix: the field's own text is tracked separately from the
// committed quantity. While typing, an empty (or in-progress) value is
// allowed to just sit there — it only gets normalized back to a valid
// integer >= 1 when the field loses focus, per the "if they click off
// without picking 1 or more, just reset to 1" behavior that was asked
// for. A fully-typed valid number still propagates immediately (via
// `onChange`) so the rest of the UI (line totals, subtotal) stays live.
export default function QuantityInput({ value, onChange, className, "aria-label": ariaLabel }) {
  const [text, setText] = useState(String(value));

  // Stay in sync if `value` changes from outside while the field isn't
  // being actively edited (e.g. the cart's undo toast restoring an item).
  useEffect(() => {
    setText(String(value));
  }, [value]);

  function handleChange(e) {
    const next = e.target.value;
    // Digits only, but an empty string is allowed mid-edit — that's the
    // "I just deleted the 1" moment this is meant to fix.
    if (next !== "" && !/^\d+$/.test(next)) return;
    setText(next);
    if (next !== "") {
      onChange(Math.max(1, parseInt(next, 10)));
    }
  }

  function handleBlur() {
    const parsed = parseInt(text, 10);
    const normalized = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    setText(String(normalized));
    if (normalized !== value) onChange(normalized);
  }

  return (
    <input
      type="number"
      min="1"
      inputMode="numeric"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
      aria-label={ariaLabel}
    />
  );
}

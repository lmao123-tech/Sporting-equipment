"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./InquiryForm.module.css";

// The vendor contact/invoice form. Its exact fields are still TBD from the
// client (per the project brief) — this is a reasonable placeholder set
// (contact details + a free-text message) so the end-to-end flow (cart ->
// vendor inquiry) can be wired up and tested now, and swapped for the real
// field list later without touching the flow itself.
//
// `products` is NOT user-editable: it's built from the current cart
// contents, per the brief ("based on the added to cart products a field in
// there is filled").
export default function InquiryForm() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      ...form,
      products: items.map(({ productId, name, size, color, quantity, price }) => ({
        productId,
        name,
        size,
        color,
        quantity,
        price,
      })),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      clearCart();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.wrap}>
        <p>Thanks — your request has been sent to the vendor.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Request a quote / invoice</h2>
      <p className={styles.hint}>
        Fields below are placeholders until the client confirms what this form should collect.
      </p>

      <form onSubmit={handleSubmit} className={styles.grid}>
        <label className="form-field">
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label className="form-field">
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label className="form-field">
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>
        <label className={`form-field ${styles.full}`}>
          Message
          <textarea name="message" value={form.message} onChange={handleChange} rows={3} />
        </label>

        <div className={`${styles.full} ${styles.submitRow}`}>
          <button type="submit" className="btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send request"}
          </button>
          {status === "error" && <span style={{ color: "crimson" }}>Something went wrong — try again.</span>}
        </div>
      </form>
    </div>
  );
}

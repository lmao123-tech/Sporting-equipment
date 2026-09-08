"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

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
    return <p>Thanks — your request has been sent to the vendor.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem", maxWidth: "400px", marginTop: "2rem" }}>
      <h2>Request a quote / invoice</h2>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Fields below are placeholders until the client confirms what this form should collect.
      </p>

      <label>
        Name
        <br />
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <br />
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Phone
        <br />
        <input name="phone" value={form.phone} onChange={handleChange} />
      </label>
      <label>
        Message
        <br />
        <textarea name="message" value={form.message} onChange={handleChange} rows={3} />
      </label>

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send request"}
      </button>
      {status === "error" && <span style={{ color: "crimson" }}>Something went wrong — try again.</span>}
    </form>
  );
}

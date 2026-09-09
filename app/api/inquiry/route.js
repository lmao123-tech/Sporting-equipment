// POST /api/inquiry
//
// Receives a vendor contact/invoice request: contact details plus the list
// of products currently in the visitor's cart. This is the one real
// backend endpoint the brief calls for right now — everything else on the
// site is read-only server-rendered data.
//
// There's no real persistence yet: we don't have a client-approved field
// list for the form, and product data itself is still mock, so this just
// validates the shape and logs it. When the real DB (SQLite) and confirmed
// form fields are ready, swap the body of this handler for an INSERT (e.g.
// into an `inquiries` table) and/or a notification to the vendor.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, products } = body || {};

  if (!name || !email) {
    return Response.json({ error: "name and email are required" }, { status: 400 });
  }
  if (!Array.isArray(products) || products.length === 0) {
    return Response.json({ error: "products must be a non-empty array" }, { status: 400 });
  }

  // TODO: persist to SQLite once schema is confirmed.
  // TODO: notify the vendor (email, etc).
  console.log("New vendor inquiry:", JSON.stringify(body, null, 2));

  return Response.json({ ok: true });
}

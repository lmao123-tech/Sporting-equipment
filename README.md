# Pavkata

Proof-of-concept scaffold: sporting equipment / protein bar catalogue site.

## Stack

- **Framework:** Next.js (App Router), plain JavaScript, no TypeScript.
- **Styling:** none yet — inline styles only. Design is deliberately out of
  scope for this pass; swap in real styling (Tailwind, CSS Modules, whatever
  fits) whenever that work starts.
- **Database:** none wired up yet. All product data comes from
  `lib/data.js`, a mock/in-memory stand-in written so it can be swapped for
  real SQLite queries later without touching any page or component that
  calls it (see comments in that file).
- **Cart:** client-side only (React context + `localStorage`). No backend
  cart persistence.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's here

See the folder structure and notes in the handoff message / project doc —
this README intentionally stays short since the structure speaks for
itself; skim `app/` for pages and `lib/data.js` for the mock data shape.

## Known TODOs / open questions

- Real product data from the client (currently mock data in `lib/data.js`).
- Real database (SQLite) wiring — schema + swap the functions in
  `lib/data.js` for real queries; persist inquiries in
  `app/api/inquiry/route.js`.
- Confirmed field list for the vendor contact/invoice form
  (`components/InquiryForm.js` currently has a placeholder set: name,
  email, phone, message, plus the auto-filled products list).
- Visual design.

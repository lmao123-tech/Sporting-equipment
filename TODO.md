# Pavkata — TODO

Tracked with MoSCoW prioritization (Must / Should / Could / Won't-for-now).

**Process rule:** when a new TODO comes up, it gets proposed here, but the
priority bucket is always asked for — never assigned on our own.

## Must

- [ ] Restructure the project into a clean frontend/backend split: a
      top-level `server/` folder holding all backend logic (data access —
      soon real SQLite queries — plus business logic like the
      email-sending inquiry handler), with `app/api/*/route.js` reduced to
      thin wrappers that just call into `server/`.
      Decided 2026-09-08: staying as one Next.js app rather than two
      separate projects — login/auth and the mix of authenticated /
      unauthenticated APIs are both easier with a single origin
      (cookie-based sessions via Auth.js, no CORS to fight).

- [ ] Product-photo color swatches (real per-color product images instead
      of plain color dots), inspired by zajo.com.
      Client meeting 2026-09-23: confirmed there will be several photos
      per color/variant (not just one).
      **Blocker:** client still needs to provide the actual images. DB
      schema/model needs to be designed around exactly what images will
      exist per product/color before this can be built — not just
      bolted on after.
      Flagged 2026-09-08, updated 2026-09-23.

- [ ] Shipping cost display in the cart. **Confirmed by the client**
      (2026-09-23, answer just hadn't made it into the written notes
      yet): flat €5 shipping fee, with any actual cost above that
      absorbed/covered by the client rather than passed to the customer
      — NOT a "spend €X more for free shipping" progressive threshold
      like zajo's. No longer blocked on the client — ready to build.
      Flagged 2026-09-08, confirmed 2026-09-23.

- [ ] Multi-angle product image gallery (flat lay, on-model, detail shot,
      etc. per product — separate from the color-swap image), inspired by
      zajo.com. Client has confirmed they can provide images.
      Client meeting 2026-09-23: number of angles/photos varies per
      product (not a fixed count sitewide) — client described their
      approach as similar to how zajo.com sources/shoots theirs.
      **Blocker:** still waiting on the client to actually provide the
      images before the gallery UI + DB schema can be finalized around
      real counts.
      Flagged 2026-09-08, updated 2026-09-23.

- [ ] Migrate cart persistence off localStorage once auth exists: right
      now `CartContext.js` persists the whole cart in the browser's
      localStorage (key `pavkata_cart`) since there's no backend/DB or
      auth yet — per-browser, not per-account, gone if site data is
      cleared or the user switches device/browser. That's a deliberate
      stand-in, not a bug, but once auth exists it should keep
      localStorage for guests and sync/merge into a server-side cart
      tied to the logged-in user's account.
      Flagged 2026-09-09.

- [ ] Admin panel: add/edit products, set stock quantity per
      color/variant, write product descriptions (one free-text field per
      product), and assign related products to each other (manual
      curation by the client, not automatic — this is what unblocks the
      related-products carousel in the Could bucket below). Needs an
      admin account (login/auth) to gate access.
      Client meeting 2026-09-23. Sequencing: this is the big next phase
      once picked up — needs auth plus the DB actually wired up, since
      an admin panel that edits mock data in `lib/data.js` isn't
      meaningfully useful.
      Flagged 2026-09-23, bucketed Must 2026-09-25.

- [ ] Sales/promotions system (part of the admin panel): client creates
      a "sale" — a title, a set of products, and a discount % per
      product within that sale. Sale price computes from
      `price * (1 - discountPct/100)`, no separate stored sale price.
      Open questions, not yet discussed with the client: does a sale
      have a start/end date or is it manually toggled on/off; can a
      product be in more than one active sale at once; where the
      discounted price shows (product card, product detail, cart, or
      all three).
      Flagged 2026-09-23, bucketed Must 2026-09-25.

- [ ] Delivery form: customer either types a delivery address or picks
      an Econt (Bulgarian courier) office from a dropdown of all Econt
      locations. No Google Maps widget on either path — client declined
      it outright 2026-09-24 ("hard no... just the Econt thing").
      Build against Econt's public demo/test system (`iasp-dev` /
      `1Asp-dev` credentials) for now; swap to the client's real Econt
      business account before going live. No remaining external
      blockers.
      Flagged 2026-09-23, map dropped 2026-09-24, bucketed Must
      2026-09-25.

- [ ] Multi-language support: Bulgarian, English, and Greek, auto-
      detected from the visitor's browser language (falls back to
      English for anything else), plus a manual language switcher in
      the top-right of the header. Greek translations will be
      Claude-drafted, then checked by a native speaker.
      Wide rather than deep — touches nearly every component, since
      every hardcoded string becomes a translation lookup — best done
      once other UI churn has calmed down, to avoid re-translating
      strings that are still changing. Routing approach (Next.js
      built-in i18n vs. a library like `next-intl`) not yet decided.
      Flagged 2026-09-23, bucketed Must 2026-09-25.

- [ ] Footer mimicking zajo.com's: normal document flow at the bottom of
      the page, not sticky (the header stays sticky as it already is —
      no change needed there). Legal text (returns policy, terms, etc.)
      is TBD, to be sent by the client. Multilingual — depends on the
      language-support item above being in place, or at least decided,
      before real footer copy can be translated.
      Structure (columns, links, layout) can be built now with
      placeholder copy and swapped for real text later, same pattern as
      the mega-menu was built with mock category data ahead of a real
      DB.
      Flagged 2026-09-23, bucketed Must 2026-09-25.

- [x] Product card image carousel transition: was swapping images
      instantly on each cycle; now slides smoothly between them (the
      images sit in a horizontal track, translated with a CSS
      transition, rather than the `src` just being swapped). Holds
      regardless of what the client says about auto-advance vs.
      click-through (see the Should item below) — it was about the
      transition quality, not who triggers it.
      Flagged 2026-09-08, done 2026-09-08.

## Should

- [x] Product card image carousel behavior: was auto-advancing; user
      decided 2026-09-08 to switch to click/tap-through arrows instead —
      auto-cycling looked odd with a full grid of cards all changing
      image at once, and click-through is more predictable. Implemented
      in `ProductCard.js` (prev/next arrow buttons over the image, no
      more timer). This was a developer decision, not one run by the
      client — removed the matching question from `Questions.md`
      accordingly; say if you'd rather it still be confirmed with them.
      Flagged 2026-09-08, decided & done 2026-09-08.

- [ ] Accordion layout for product description / size chart (collapsed
      sections instead of always-expanded), inspired by zajo.com.
      Client meeting 2026-09-23: there's no separate structured
      "specifications" data after all — material/weight/etc. all just
      live as free text inside the one description field, written by
      the client. So this is now scoped down to Description + Size
      chart accordions, not a third Specifications section.
      **Blocker:** waiting on the client to actually provide the
      description content and size chart data.
      Flagged 2026-09-08, re-scoped 2026-09-23.

- [ ] Size chart (a measurement table linked from the size selector),
      inspired by zajo.com.
      **Blocker:** client needs to provide the actual size chart data
      (will likely differ by category — apparel vs. equipment).
      Flagged 2026-09-08.

- [x] Reviews + Q&A system, inspired by zajo.com. **Client declined this
      at the 2026-09-23 meeting** — not building it. Moving here from
      Should since it's now a settled "no" rather than an open question;
      say if you'd rather this just be deleted outright instead of kept
      as a closed record.
      Flagged 2026-09-08, declined 2026-09-23.

## Could

- [ ] Upgrade `eslint` and `eslint-config-next` past 8.x (and the
      transitive deps that come with them — `glob`, `rimraf`, `inflight`)
      to clear the deprecated-package warnings `npm install` prints.
      Dev-tooling only, does not affect the running app.
      Flagged 2026-09-08.

- [ ] Related-products carousel on the product detail page, inspired by
      zajo.com.
      Client meeting 2026-09-23: confirmed wanted — and the client picks
      which products are related themselves (not an automatic/algorithmic
      suggestion). That means this depends on the admin panel having a
      "assign related products" control before it can be fully wired up
      — the storefront carousel itself is the easy part, the admin-side
      picker is the real dependency. The admin panel is now a Must-bucket
      item above (bucketed 2026-09-25) — worth reconsidering this
      bucket once that work is actually scoped.
      Flagged 2026-09-08, confirmed & re-scoped 2026-09-23.

## Won't (for now)

- [x] Header trust bar (return policy, customer-service link, aggregate
      rating), inspired by zajo.com. **Client declined this at the
      2026-09-23 meeting** — closing it out as a settled "no" rather
      than an open question for the future.
      Flagged 2026-09-08, declined 2026-09-23.

- [x] Technical attribute rating bars (wind resistance, breathability,
      etc.), inspired by zajo.com. **Client declined a dedicated
      indicator at the 2026-09-23 meeting** — if something like this
      ever matters for a piece of equipment, it just goes in that
      product's free-text description instead, same as specs.
      Flagged 2026-09-08, declined 2026-09-23.

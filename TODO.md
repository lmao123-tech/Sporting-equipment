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
      **Blocker:** client needs to provide the actual per-color product
      images. Also: the DB schema/model needs to be designed around
      exactly what images and specs will exist per product/color before
      this can be built — not just bolted on after.
      Flagged 2026-09-08.

- [ ] Shipping cost display in the cart. Current understanding (per the
      user, unconfirmed): flat €5 shipping fee, with any actual cost
      above that absorbed/covered by the client rather than passed to the
      customer — NOT a "spend €X more for free shipping" progressive
      threshold like zajo's. **Confirm with client** — see
      `Questions.md`.
      Flagged 2026-09-08.

- [ ] Multi-angle product image gallery (flat lay, on-model, detail shot,
      etc. per product — separate from the color-swap image), inspired by
      zajo.com. Client has confirmed they can provide images.
      A clarifying question is flagged in `Questions.md` anyway (exactly
      which angles / how many photos per product) just to be sure before
      building the DB schema and gallery UI around it.
      Flagged 2026-09-08.

## Should

- [ ] Product card / gallery image carousel behavior: currently
      auto-advancing (cycles through a product's images automatically),
      built on 2026-09-08 as part of the responsive design pass. **Ask
      the client** whether they'd rather users click/tap through images
      instead of them auto-scrolling — see `Questions.md`. Whichever way
      it's decided, it's a small change to `ProductCard.js` since the
      cycling logic is already isolated there.
      Flagged 2026-09-08.

- [ ] Accordion layout for product description / specifications / size
      chart (collapsed sections instead of always-expanded), inspired by
      zajo.com.
      **Blocker:** same as the color-swatches item — waiting on the
      client to actually provide the description/specs content this
      would organize.
      Flagged 2026-09-08.

- [ ] Size chart (a measurement table linked from the size selector),
      inspired by zajo.com.
      **Blocker:** client needs to provide the actual size chart data
      (will likely differ by category — apparel vs. equipment).
      Flagged 2026-09-08.

- [ ] Reviews + Q&A system, inspired by zajo.com. Bigger than the other
      items here — needs a real data model, almost certainly needs
      accounts to attribute a review to someone, and a moderation story.
      **Ask the client** whether they want this — see `Questions.md`.
      Flagged 2026-09-08.

## Could

- [ ] Upgrade `eslint` and `eslint-config-next` past 8.x (and the
      transitive deps that come with them — `glob`, `rimraf`, `inflight`)
      to clear the deprecated-package warnings `npm install` prints.
      Dev-tooling only, does not affect the running app.
      Flagged 2026-09-08.

- [ ] Related-products carousel on the product detail page, inspired by
      zajo.com. **Ask the client** whether they want this — see
      `Questions.md`.
      Flagged 2026-09-08.

## Won't (for now)

- [ ] Header trust bar (return policy, customer-service link, aggregate
      rating), inspired by zajo.com. Not building yet — but flagged as a
      question to the client for the future, see `Questions.md`.
      Flagged 2026-09-08.

- [ ] Technical attribute rating bars (wind resistance, breathability,
      etc.), inspired by zajo.com. Not building yet — apparel/equipment-
      specific and likely irrelevant to protein bars anyway. Flagged as a
      question to the client, see `Questions.md`.
      Flagged 2026-09-08.

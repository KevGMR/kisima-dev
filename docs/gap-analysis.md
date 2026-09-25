# Kisima Cargo — Gap Analysis
# ===========================================================================
# Compares the Change Brief (Sept 2026) against the current dev repo
# (KevGMR/kisima-dev, reviewed 2026-09-25).
#
# Columns:
#   Brief item       -> what the brief requires
#   Current state    -> what exists in the repo today
#   Gap              -> what must be built / changed / removed
#   Blocked by       -> any decision or input needed first
# ===========================================================================

## 0. Headline findings

1. **The #1 Critical item in the brief is unresolved.**
   The site is a Vite SPA (client-rendered). Public pages do not return
   meaningful HTML without JavaScript. Brief Section 2 says this must be
   fixed before any other SEO work. It requires a stack decision — it is
   NOT fixable by editing the current code.

2. **Only 9 pages exist. The brief's architecture defines 40.**
   31 pages are missing, including every route page, every business page,
   every Help Centre article, and every location page.

3. **Three bugs in the current calculator.** See Section 4 below.

4. **Dead code and orphan files.** See Section 6.

5. **Config scaffolding is ready but nothing imports it yet.**
   Files added so far: src/config/site.ts, routes.ts, calculator.ts.
   They exist to be wired in during migration — they do not affect the
   running app yet.

---

## 1. Crawlability & rendering  (Brief Section 2, 6, 13 — CRITICAL)

| Brief item | Current state | Gap | Blocked by |
|---|---|---|---|
| Public pages return meaningful HTML without JS | Vite SPA — no SSR, no SSG, no prerender | **Entire approach must change** | Stack decision |
| SSR/SSG or prerender for public pages | None | Choose Next.js / Astro / vite-plugin-ssr / static build | Stack decision |
| One H1 per page; logical H2/H3 | Not verified per page | Audit each page after migration | Migration |
| Unique title + meta per page | Not implemented | Wire src/config/site.ts + routes.ts into a `<head>` component | Migration |
| Self-referencing canonical | Not implemented | Same head component | Migration |
| Real 404 (not soft-404) | SPA fallback returns 200 for all unknown paths | Remove `/* → index.html` fallback after SSR/SSG | Migration |
| Breadcrumbs on deep pages | Component exists (`ui/breadcrumb.tsx`), not used in pages | Add to route/service/help pages | Page build |
| Open Graph tags | Not implemented | Head component | Migration |
| XML sitemap | ✅ `public/sitemap.xml` written | Needs `lastmod` automation | Build script |
| robots.txt | ✅ `public/robots.txt` written (production rules) | Staging noindex handled separately | — |
| 301s from old kisimacargo.com URLs | ❌ Unknown — needs live URL crawl | Inventory required | Inputs from Kisma |

---

## 2. Staging indexation  (Brief Section 2, 13 — timing: NOW)

| Brief item | Current state | Gap |
|---|---|---|
| Staging noindex or access-protected | ❌ Currently `robots.txt` on dev site allows crawling | Apply File 6b (set-headers.mjs + postbuild) |
| Netlify contexts configured | ❌ Not set | Manual UI step: set `VITE_SITE_ENV` per context |

Status: mechanism written, needs manual Netlify UI step + verification via curl.

---

## 3. Homepage structure  (Brief Section 3)

Brief defines 13 sections. Current `Home.tsx` needs inspection, but the
presence of `HeroSlider.tsx` suggests it does not match the brief's
simple-hero recommendation.

| Brief section order | Current | Gap |
|---|---|---|
| 1. Hero | `HeroSlider.tsx` (slider, not simple hero) | Replace with static hero per brief copy |
| 2. Quick estimator | ❌ Not on homepage | Build, place below hero |
| 3. Popular routes | ❌ Missing | Build, link to route pages |
| 4. How Kisima works | Possibly in Home.tsx | Verify + align copy |
| 5. Air vs sea | ❌ Missing as a dedicated block | Build comparison table |
| 6. Business shipping | ❌ Missing | Build, link to business pages |
| 7. Why Kisima | Possibly present | Verify |
| 8. Tracking | ❌ Not on homepage | Build, link to /tools/track-shipment |
| 9. Shipping guides | ❌ Missing | Build, link to Help Centre |
| 10. Customer stories | ❌ Missing (also blocked: no real testimonials yet) | Inputs from Marketing |
| 11. FAQ | Possibly present | Verify |
| 12. Final CTA | Possibly present | Verify |
| 13. Footer | ✅ `Footer.tsx` exists | Verify CTA consistency |

Blocked by: real testimonial content, real photography (Marketing).

---

## 4. Calculator  (Brief Section 4 — CRITICAL)

Current file: `src/pages/Calculator.tsx`

### Bugs in current implementation

| Bug | Detail | Fix location |
|---|---|---|
| `lane.handling` displayed but never used | UI shows per-lane handling fee; calc uses hardcoded `const handling = 50` | Wire to `rate.handlingFee` |
| Invented customs fee | `const customs = 75` hardcoded, route-agnostic, wrong currency for KES routes | Remove from front-end |
| Volumetric divisor hardcoded | `/5000` global; brief requires per-route divisor | Use `rate.volumetricDivisor` |
| `mode` state orphaned | User picks Air/Sea, but calc uses `lane.mode`; UI can contradict itself | Drive UI from selected route, or remove radio |
| Minimum charge missing | Brief requires; current has none | `rate.minimumCharge` (defaulted off until verified) |
| No effective/expiry dates | Brief requires; current has none | `rate.effectiveFrom` / `effectiveTo` |
| No active/inactive flag | Brief requires; current has none | `rate.active` |
| Package-level minimum | If added naively, minimum would apply per package | Use `estimateFromQty` after summing |

### What's ready

`src/config/calculator.ts` is written and exposes:
- `routeRates` (all `active: false` until verified — brief compliance)
- `calcAirChargeable`, `calcSeaCBM`, `calcEstimate`, `estimateFromQty`
- `validatePackage` (zod)
- `additionalServices`

### Gap

`Calculator.tsx` must be rewritten to import from `calculator.ts`.
This is self-contained and can be done before the stack decision.

---

## 5. Site architecture  (Brief Section 5)

Legend: ✅ exists · ⚠️ renamed/moved needed · ❌ missing

### Core commercial pages (10 required)
| Path | Status | Notes |
|---|---|---|
| `/` | ✅ | Home.tsx — needs section restructure |
| `/air-freight` | ✅ | AirFreight.tsx — verify content |
| `/sea-freight` | ✅ | SeaFreight.tsx — verify content |
| `/customs-clearance` | ✅ | CustomsClearance.tsx — verify |
| `/cargo-consolidation` | ❌ | Build new |
| `/door-to-door-delivery` | ❌ | Build new |
| `/shop-and-ship` | ⚠️ | Rename from `/buying-shipping`; 301 in netlify.toml |
| `/about` | ✅ | About.tsx |
| `/contact` | ✅ | Contact.tsx |
| `/request-quote` | ❌ | Build new |

### Route pages (5 required)
| Path | Status |
|---|---|
| `/routes/shipping-from-china-to-kenya` | ❌ |
| `/routes/shipping-from-uk-to-kenya` | ❌ |
| `/routes/shipping-from-usa-to-kenya` | ❌ |
| `/routes/shipping-from-uae-to-kenya` | ❌ |
| `/routes/shipping-from-south-africa-to-kenya` | ❌ |

### Business pages (6 required)
All ❌: clothing, electronics, machinery, auto-parts, wholesale-stock, ecommerce.

### Tools (4 required)
| Path | Status |
|---|---|
| `/tools/shipping-calculator` | ⚠️ Move from `/calculator`; 301 configured |
| `/tools/volumetric-weight-calculator` | ❌ |
| `/tools/cbm-calculator` | ❌ |
| `/tools/track-shipment` | ⚠️ Move from `/tracking-shipment`; 301 configured |

### Help Centre (1 landing + 8 articles)
All ❌. Articles: getting-started, shipping-costs, volumetric-weight,
what-is-cbm, customs-clearance-kenya, import-documents-kenya,
prohibited-goods, first-time-importer-guide.

### Locations (6 required)
All ❌: nairobi, guangzhou, dubai, uk, usa, south-africa.

### Totals
- Exists and roughly correct: **7**
- Exists, needs rename/move: **3**
- Missing entirely: **31**
- **Total per brief: 40** (excluding /blog, which is being retired)

---

## 6. Dead code / cleanup

| File | Issue | Action |
|---|---|---|
| `src/pages/Index.tsx` | Not imported by App.tsx — Lovable leftover | Delete |
| `/blog` route in App.tsx | Renders `<Contact />` — likely a copy-paste bug | Decide: build real blog, or remove (redirect already in netlify.toml to /help) |
| `src/components/HeroSlider.tsx` | Brief recommends simple hero, not slider | Confirm intent, then remove or replace |
| `public/placeholder.svg` | Lovable default | Replace with real logo asset before launch |
| No `public/og/` | `site.ts` references `/og/kisima-cargo-default.jpg` which 404s | Add real OG image (1200×630) |
| `bun.lockb` + `package-lock.json` | Both present — ambiguous package manager | Pick one, delete the other |

---

## 7. Structured data, analytics, tracking  (Brief Sections 7, 11)

| Item | Status | Gap |
|---|---|---|
| Organization schema | ❌ | Add to head component |
| LocalBusiness schema | ❌ | Needs verified addresses (Inputs from Kisma) |
| BreadcrumbList schema | ❌ | Add to deep pages |
| Article schema | ❌ | Add to Help Centre |
| Service schema | ❌ | Add to service pages |
| WebSite schema | ❌ | Add |
| FAQPage schema | ❌ | Only where visible FAQ content exists |
| GA4 | ❌ | Inputs: GA4 property ID |
| Search Console | ❌ | Inputs: domain verification |
| Conversion events (9 events) | ❌ | Build after GA4 |
| UTM preservation | ❌ | Build with forms |
| Landing page + calc ref stored | ❌ | Build with forms |

Note (Brief Section 11): Do not add fabricated review or AggregateRating
markup. Only Organization/LocalBusiness with verified details.

---

## 8. Mobile UX  (Brief Section 10)

| Item | Status | Gap |
|---|---|---|
| Sticky Calculate / Track / WhatsApp bar | ❌ | Build |
| Contextual WhatsApp messages | ⚠️ Defined in site.ts | Wire to buttons |
| Short, touch-friendly forms | Not verified | Audit after build |
| Three actions max on mobile | ❌ | Constrain |

---

## 9. Content inputs still required from Kisma  (Brief Section 12)

These block specific work. They are not developer tasks.

- [ ] Current approved route list
- [ ] Rates per kg / CBM and minimum charges
- [ ] Volumetric divisor by route / service
- [ ] Approved transit ranges and departure schedules
- [ ] Office addresses, phone numbers, opening hours
- [ ] WhatsApp number and routing responsibility
- [ ] Tracking system or API details
- [ ] Restricted / prohibited goods guidance
- [ ] Real photography (office, warehouse, cargo, team)
- [ ] Approved testimonials / case studies
- [ ] GA4, Search Console, Ads access

---

## 10. Recommended sequence

The order matters because building pages before the stack decision means
rebuilding them later.

**Phase A — Foundation (in progress)**
- ✅ Config files (site.ts, routes.ts, calculator.ts)
- ✅ robots.txt, sitemap.xml
- ✅ netlify.toml, staging noindex mechanism
- ⏳ Manual Netlify UI step: set VITE_SITE_ENV per context
- ⏳ Verify staging noindex with curl

**Phase B — Decision**
- Decide SSR/SSG/prerender approach
- Small proof-of-concept in a branch to validate tooling

**Phase C — Migration of existing pages**
- Port Header, Footer, Home, Air, Sea, Customs, About, Contact to new stack
- Introduce head/metadata component wired to config
- Remove dead code (Index.tsx, HeroSlider if unused)
- Remove SPA fallback once routing is SSR/SSG-safe

**Phase D — Calculator migration** (can run in parallel with C)
- Rewrite Calculator.tsx against calculator.ts
- Kill the three bugs
- Add estimate reference + WhatsApp handoff
- Add analytics events when GA4 is available

**Phase E — New page build**
- Core commercial pages (4 new)
- Route pages (5)
- Business pages (6)
- Tools (3 new)
- Help Centre (9)
- Locations (6)
- Homepage rebuild to 13-section structure

**Phase F — Enrichment**
- Structured data
- Analytics + conversion events
- Trust content (blocked by Inputs from Kisma)
- Real imagery

**Phase G — Pre-launch QA** (Brief Section 13 checklist)
- Crawlability check (view-source on every key page)
- Staging noindex verification
- Canonical verification on production domain
- Sitemap submission
- 404 behaviour
- Accessibility audit
- Mobile action bar usability

---

## 11. Immediate next actions (this week)

1. Apply File 6b-i (scripts/set-headers.mjs) and 6b-ii (package.json).
2. Set VITE_SITE_ENV per context in Netlify UI.
3. Redeploy kisimadevs.netlify.app and verify:
   `curl -sI https://kisimadevs.netlify.app/ | grep -i x-robots-tag`
   Expect: `x-robots-tag: noindex, nofollow`
4. Make the stack decision. My recommendation and reasoning are documented
   separately (see docs/stack-decision.md — to be written).
5. Begin Phase C (migration) only after step 4 is settled.


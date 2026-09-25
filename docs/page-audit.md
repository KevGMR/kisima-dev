# Kisima Cargo — Page Audit
# ===========================================================================
# Reviewed: 2026-09-25
# Files audited:
#   components/Header.tsx, Footer.tsx, HeroSlider.tsx
#   pages/Home.tsx, AirFreight.tsx, SeaFreight.tsx,
#          CustomsClearance.tsx, BuyingShipping.tsx,
#          About.tsx, Contact.tsx
#
# Purpose: compare the current build against the Change Brief and flag every
# concrete change needed. Not a rewrite — a to-do list per file.
# ===========================================================================

## 0. Headline findings

1. **The site is UK-centric, not Kenya-centric.** Every page talks about
   "UK to Kenya" as the primary lane. The brief requires China, UK, USA,
   UAE, South Africa as equal origins. This is a positioning problem, not
   just a copy problem.

2. **Placeholder / unverified pricing is published as fact.**
   Home, AirFreight, SeaFreight all show specific £ prices ("From £25",
   "From £85", etc.) with a "sample rates" badge, but no "last reviewed"
   date. Brief Section 2 says: do not migrate unverified prices. These must
   come down or be explicitly labelled pending Operations verification.

3. **Three conflicting sets of numbers.**
   Home shows 4 sample rates. AirFreight shows 3. SeaFreight shows 3. The
   calculator config (calculator.ts) has a completely different set. Users
   will see inconsistent numbers on the same site. One source of truth is
   needed — the DB / config file.

4. **Trust claims appear as fact but aren't verified.**
   "5+ Years Experience", "1000+ satisfied customers", "99% Customer
   Satisfaction", "Insured shipments up to £1,000", "24/7 customer support".
   Brief Section 10 says: verified performance statistics only, no
   unsupported claims. These need sign-off from Management or removal.

5. **Bug in Header navigation.** "Track & Trace" appears in `navigation`
   array but the JSX only renders `item.dropdown ? ... : <Link>`. So it
   renders, but has a confusing label swap: `<Link>` label is set to
   "Track Shipment" only if `item.name === "Track & Trace"`. Fragile.

6. **`/blog` links to a page that renders `<Contact />`.** Header and Footer
   both link to `/blog`. App.tsx routes it to `<Contact />`. Users will land
   on the contact page thinking it's a blog. This is a broken trust signal.

7. **The "Air Freight" content is under-optimised for AEO/GEO.** FAQ
   answers are long, but the H2s don't ask questions. Brief Section 7
   requires "Question -> Direct answer -> Explanation -> Example -> CTA".
   Current FAQ is in an accordion — good, but the questions should be H2s,
   not accordion triggers. Accordions hide content from some crawlers and
   definitely hide it from AI extraction.

8. **No route-specific pages exist.** The brief's entire SEO strategy
   depends on China/UK/USA/UAE/SA route pages. Currently, air and sea
   pages try to cover all origins at once. That's the single biggest SEO
   miss.

9. **The HeroSlider uses `h-screen`** (full viewport height). Brief
   Section 3 says hero should be 65–75% of viewport, not full screen.

10. **No "How it works" 6-step process.** Brief Section 3 lists it as a
    homepage section. Current Home has a 4-step UK-focused version, and
    the steps do not match the brief's flow (Supplier -> Kisima China ->
    Receiving/Consolidation -> Freight -> Kenya -> Customs -> Delivery).

---

## 1. Header.tsx

| Brief requirement (Section 5, 10) | Current | Change needed |
|---|---|---|
| Top-level menu: Ship, Routes, Business, Tools, Help Centre | Home, Services, Track & Trace, About, Blog, Contact | **Restructure nav** |
| Ship dropdown: Air, Sea, Door-to-Door, Customs, Shop & Ship, Consolidation | Only Buying & Shipping, Air, Sea, Customs, Calculator | Add Door-to-Door, Consolidation. Move Calculator out |
| Routes dropdown: China, UK, USA, UAE, SA to Kenya | Missing | Add |
| Business dropdown: Clothing, Electronics, Machinery, Auto Parts, Wholesale, E-commerce | Missing | Add |
| Tools dropdown: Calculator, Volumetric, CBM, Track | Track is a top-level external link | Restructure |
| Help Centre dropdown | Missing | Add |
| Compact mobile header | Full nav list (6 items + dropdown) | Reduce to essentials |
| Sticky Calculate / Track / WhatsApp on mobile | Not implemented | Add mobile action bar (separate component) |
| Three persistent mobile actions max | "Get a Quote" only | Add Calculate + Track + WhatsApp |
| Track link | External `https://app.kisimacargo.com` | Keep — but also add internal `/tools/track-shipment` |
| WhatsApp number | `254795554137` hardcoded | Move to `site.ts` config (already defined) |
| Logo | `@/assets/kisima-logo.png` | Fine |
| "Get a Quote" CTA | Goes to WhatsApp directly | Brief says CTA should be "Get shipping estimate" (calculator). Add calculator as primary, WhatsApp as secondary |

**Verdict: significant restructure required.**
Not a rewrite — the component structure is sound — but the `navigation`
array and the mobile menu need to be rebuilt to match the brief.

---

## 2. Footer.tsx

| Brief requirement (Section 5) | Current | Change needed |
|---|---|---|
| Navigation matches header structure | Partial — Services, Company, Legal | Rebuild to mirror new header |
| Route pages linked | Not linked | Add Routes column |
| Help Centre linked | Not linked | Add Help column |
| Tools linked | Not linked | Add |
| Real contact details | ✅ Kenya, UK, UAE, SA, China all shown with phones + addresses | Keep. Verify with Management |
| Social links | Facebook, TikTok, Instagram | Keep |
| Legal links (Privacy, Terms, Sitemap) | Links to `/privacy-policy`, `/terms`, `/sitemap` — none of these pages exist | **Create pages or remove links** |
| Get a Quote CTA | Goes to `quote.kisimacargo.com` (external) | Consider internal `/request-quote` page per brief |
| Track Shipment CTA | Goes to `app.kisimacargo.com` (external) | Keep, plus internal `/tools/track-shipment` |
| "Sitemap" link text | Points to `/sitemap` — likely intended as HTML sitemap, not XML | Clarify intent — this is unusual for a footer |

**Verdict: content is mostly good. Links are the problem.**
Half of the footer links go to pages that don't exist. That's a
soft-404 in production.

---

## 3. HeroSlider.tsx

| Brief requirement (Section 3) | Current | Change needed |
|---|---|---|
| Hero ~65–75% of viewport | `h-screen` (100%) | Change to `min-h-[70vh]` |
| H1: "International shipping to Kenya made simple" | 3 rotating H1s about being global | Replace with single fixed H1 |
| Supporting copy | Rotating description | Replace |
| Primary CTA: Get shipping estimate | "Get a Quote" -> WhatsApp | Change primary to calculator |
| Secondary CTA: Track shipment | Track Shipment -> external app | Keep, plus internal |
| Text CTA: Talk to us on WhatsApp | Not present | Add |
| Trust bar: Air / Sea / Consolidation / Customs / Door-to-Door | 3 badges: Insured, 24/7 support, Transparent pricing | Replace with service trust bar |
| Carousel motion | Auto-rotates every 5s | Brief says "restrained motion only" — consider removing rotation |

**Verdict: replace.**
The rotating slider is off-brief (restrained motion, single H1,
conversion-focused hero). Consider a static hero with one strong image.

**But — the images are real assets:** `hero-import-export.jpg`,
`kisima_slider_2.jpeg`, `kisima_slider_3.jpeg`. Keep the best one,
retire the carousel.

---

## 4. Home.tsx

| Brief section order (Section 3) | Current | Change needed |
|---|---|---|
| 1. Hero | HeroSlider | Replace (see #3) |
| 2. Quick estimator | Not present | **Add** — critical per brief |
| 3. Popular routes | Not present | Add |
| 4. How Kisima works | 4-step UK-only version | Rewrite to 6-step generic |
| 5. Air vs sea | Not present as comparison | Add comparison table |
| 6. Business shipping | Not present | Add |
| 7. Why Kisima | Present (trust section) | Rewrite copy — remove unverified claims |
| 8. Tracking | Not present as section | Add |
| 9. Shipping guides | Not present | Add |
| 10. Customer stories | Not present | Add (blocked — no real testimonials) |
| 11. FAQ | Not present | Add |
| 12. Final CTA | Present | Align CTA wording to brief |
| 13. Footer | Footer.tsx | See #2 |

**Content problems on the current Home:**
- Headline "Our Shipping Services" — fine but generic.
- Sample rates with £ prices and no "verified by Operations" disclaimer.
- Trust features list: "Insured shipments up to £1,000", "24/7 customer
  support", "5+ years experience", "1000+ satisfied customers" — all
  unverified per brief.
- "How It Works" is explicitly "(ie. UK to Kenya)" — reinforces UK bias.

**Verdict: full restructure.**
The component patterns are reusable (sections, cards, CTAs). The content
is 40% salvageable, 60% needs replacing.

---

## 5. AirFreight.tsx

| Brief requirement (Section 8, route page template) | Current | Change needed |
|---|---|---|
| H1: "Shipping from [origin] to Kenya" | "Air Freight Services" — no origin | Restructure — should be generic air page, route-specific H1 lives on route pages |
| Preselected calculator | Not present | **Add** |
| Who air freight suits | Present (Benefits) | Good |
| How charging works | Mentioned in FAQ ("actual weight or volumetric weight") | Expand into a full section per brief Section 4 |
| When it makes sense | Implied | Explicit |
| Common cargo | Not present | Add |
| Documents / customs | Not linked | Link to Help Centre |
| FAQ | ✅ Present | **Restructure**: H2s should be questions, not accordion triggers |
| Final CTA | Present | Align to "Calculate shipping from X or request quote" |

**Content problems:**
- H1 says "International to your doorstep" — vague.
- FAQ answers have good detail (volumetric weight, prohibited items) but
  are hidden in an accordion. Brief's AEO/GEO standard (Section 7) says
  content should be crawlable and visible.
- Sample rates "From £25" — unverified, un-dated, no "last reviewed".
- "Fully insured shipments" repeated — needs qualification.
- No mention of Kenya anywhere except in FAQ answers.

**Verdict: restructure.**
This page is doing too much. It should be a *service definition* page
(what air freight is, when to use it, how it's charged) with links to
route pages — not a UK-centric pitch.

---

## 6. SeaFreight.tsx

Same structural issues as AirFreight:

| Brief requirement | Current | Change needed |
|---|---|---|
| H1: "Sea Freight to Kenya" | "Sea Freight Services" | Rewrite |
| CBM explanation | Mentioned in FAQ | Promote to main content |
| LCL basics | Not present | Add |
| When to choose sea | Implied | Explicit |
| Preselected calculator | Not present | Add |
| FAQ as crawlable Q&A | In accordion | Restructure |
| Route-specific links | Not present | Add |

**Content problem:**
- Sample rates ("From £45", "From £75", "From £120") are UK-to-Kenya sea
  rates. Brief requires China-to-Kenya sea as the primary sea lane
  (China is the dominant sea route into Kenya).
- FAQ says "4-6 weeks" — brief says confirm transit ranges with Operations.

**Verdict: restructure, and re-anchor on China.**

---

## 7. CustomsClearance.tsx

| Brief requirement | Current | Change needed |
|---|---|---|
| H1: "Customs Clearance Kenya" | "Customs Clearance Made Simple" | Add Kenya |
| Link to /help/customs-clearance-kenya | Not present | Add |
| Link to /help/import-documents-kenya | Not present | Add |
| Cite KRA, KEBS as primary sources | Not present | **Add** — brief Section 7 requires this |
| Reviewed by Operations | Not stated | Add "Last reviewed" date |
| Sample duty rates | Present — "Electronics 25-35% + VAT", "VAT 16%" | **Risk**: unverified regulatory content. Brief Section 9 says do not publish customs rules until Operations verifies |
| "100% compliance guarantee" | Present | Unverifiable claim — remove |
| "Licensed customs agents" | Present | Verify with Operations |

**Verdict: high-risk page.**
The duty rate table is exactly what the brief says not to publish
unverified. Either get Operations sign-off with a "Last reviewed" date,
or remove the table and link to KRA directly.

---

## 8. BuyingShipping.tsx

| Brief requirement | Current | Change needed |
|---|---|---|
| Rename to "Shop & Ship" | Called "Buying & Shipping" | Rename file + route + all copy |
| URL `/shop-and-ship` | `/buying-shipping` | Change (301 already configured in netlify.toml) |
| H1: "Shop & Ship to Kenya" | "Buying & Shipping ... From international stores to you" | Rewrite |
| Store list | 12 UK stores listed | Brief says China, UK, USA, UAE, SA — expand or reposition |
| Service fee structure | 10% / 7% / 5% tiers shown | Verify with Operations — could be competitive-sensitive |
| General content | UK-specific ("Amazon UK", "ASOS") | Reposition |

**Verdict: rename + reposition.**
The content is strong but the positioning is UK-only. Either build
origin-specific shop-and-ship pages, or make this page generic and link
to route pages.

---

## 9. About.tsx

| Brief requirement | Current | Change needed |
|---|---|---|
| H1: About Kisima Cargo | "Your Trusted Partner for UK to Kenya Shipping" | Rewrite — again UK-only |
| Real stats | "5+ years", "1000+ customers", "10,000+ shipments", "99% satisfaction" | **Verify with Management** or remove |
| Timeline / milestones | 2019 founding, 2020 1000th shipment, 2022 expansion, 2024 digital | Verify each is true before publishing |
| Real photography | None on About page | Brief requires real office/warehouse/team photos |
| "Connecting Communities" | Emotional appeal | Fine, but should reference real communities, not vague |

**Verdict: verify or strip.**
If any of the statistics are inaccurate, this page is a liability.

---

## 10. Contact.tsx

| Brief requirement | Current | Change needed |
|---|---|---|
| Real contact details | ✅ All 5 offices shown accurately | Keep |
| Working form | Form has no `onSubmit`, no backend | **Broken — form does nothing on submit** |
| Field labels | Uses `<Label>` correctly | Good |
| Phone field required? | Not marked | Add required markers |
| Office hours | ✅ Present | Keep |
| Google Maps links | ✅ Present | Keep |
| LocalBusiness schema | Not present | Add when structured data layer exists |

**Verdict: functional page, broken form.**
The form doesn't submit anywhere. That's a live bug affecting lead capture.

---

## 11. Cross-cutting issues

### 11.1 UK bias
Every page frames the service as "UK to Kenya" or "international to
your doorstep". The brief's whole architecture assumes multi-origin
(China, UK, USA, UAE, South Africa). Fix requires:
- Remove UK-only framing from Home, Air, Sea, Buying Shipping, About.
- Build route pages for all 5 origins.
- Reposition existing pages as service definitions.

### 11.2 Unverified numbers everywhere
Sample rates, trust claims, service fees, duty rates — all published
without "last reviewed" dates. Brief Section 2, 9, 10 forbid this.
**Highest-priority content fix.**

### 11.3 No internal linking
Pages do not link to route pages, Help Centre, calculator, or each other.
Brief Section 8 requires internal linking.

### 11.4 Same CTA repeated
Almost every CTA is "Get a Quote -> WhatsApp". Brief Section 3 says
"avoid making every button orange" and requires varied CTA logic
(Calculate / Quote / Track / WhatsApp).

### 11.5 No WhatsApp contextual messages
All WhatsApp links are the same generic message. Brief Section 10
requires contextual per-page messages. Config is ready in `site.ts`
(`whatsappMessages`), just not used.

### 11.6 No structured data
No Organization, LocalBusiness, BreadcrumbList, Article, Service,
WebSite, or FAQPage schema anywhere.

### 11.7 No "Last reviewed" dates
Brief Section 7 requires them on operational/regulatory content.
None present.

### 11.8 No analytics events
No GA4, no conversion tracking, no event firing anywhere.

### 11.9 Em-dash typo
Home.tsx and HeroSlider use "—" correctly. Fine.

### 11.10 `margin-adder` class and inline `marginTop: "25px"` in Contact
Hacky CSS. Not critical but signals loose ends.

---

## 12. What's actually good (keep)

Worth flagging because not everything is broken:

- **Component structure.** Section -> Card -> Button patterns are
  consistent and reusable. The page rebuilds can reuse them.
- **Real logos and hero imagery.** `@/assets/kisima-logo.png`,
  `hero-import-export.jpg`, `kisima_slider_2.jpeg`, `kisima_slider_3.jpeg`.
- **Real contact details.** All 5 global offices with correct addresses
  and phone numbers. Ready for LocalBusiness schema.
- **FAQ content.** Answers are substantive and mostly factual. Needs
  restructuring (H2 questions, out of accordion) but the copy is a
  starting point.
- **Accessibility basics.** `sr-only` on hamburger, aria-labels on some
  buttons, semantic HTML. Not complete but not starting from zero.
- **WhatsApp as primary CTA.** Correct for the Kenyan market.
- **Consistent use of shadcn/ui.** No one-off components. Makes
  systematic changes easy.
- **Tailwind design tokens** (`bg-accent`, `text-primary`, etc.) are
  consistent. Theme changes cascade cleanly.

---

## 13. Priority order for fixes (per file)

Ranked by impact + brief-compliance:

### Immediate (before anything else)
1. **Remove or verify unverified prices and trust claims.** Home,
   AirFreight, SeaFreight, CustomsClearance, BuyingShipping, About.
   This is a liability + brief violation.
2. **Fix the /blog link** (points to <Contact />).
3. **Fix the Contact form** (doesn't submit).
4. **Remove dead legal links** in Footer or create the pages.

### Before launch
5. **Restructure Header nav** to match brief Section 5.
6. **Rebuild Footer** to match Header.
7. **Add "Last reviewed" dates** to operational content.
8. **Add internal links** between pages.
9. **Add "Get shipping estimate" as primary CTA** across pages.

### During migration (see stack decision)
10. **Replace HeroSlider with static hero.**
11. **Restructure Home** to brief's 13-section order.
12. **Reposition Air, Sea, Customs, Shop & Ship, About** to be origin-
    agnostic service definitions.
13. **Build route pages** for all 5 origins.
14. **Move FAQs out of accordions into H2 sections.**
15. **Add structured data.**
16. **Add analytics events.**

### Content blocked on Kisma
17. Real photography
18. Real testimonials
19. Verified rates
20. Verified stats
21. Verified customs rules

---

## 14. What this means for the stack decision

These two facts together change the calculus:

- The content is significantly better than I assumed from the file list.
  Home, Air, Sea, Customs, Shop & Ship are real pages with substantial copy.
- But they are all UK-centric and reuse nothing that would transfer
  cleanly to a multi-origin site.

This means the stack decision should weigh:
- **Cost of migrating existing content** (moderate — 7 pages)
- **Cost of building 31 new pages** (significant)
- **Lovable's ability to support SSR/SSG** (none — it outputs Vite SPA)

I will write this up in `docs/stack-decision.md` next.


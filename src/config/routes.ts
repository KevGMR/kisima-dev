/**
 * src/config/routes.ts
 * ---------------------------------------------------------------------------
 * Single source of truth for every public URL on the Kisima Cargo site.
 *
 * Mirrors the site architecture defined in the Change Brief, Section 5:
 *   /  /air-freight/  /sea-freight/  /customs-clearance/
 *   /cargo-consolidation/  /door-to-door-delivery/  /shop-and-ship/
 *   /routes/shipping-from-{origin}-to-kenya/
 *   /business/{category}/
 *   /tools/{shipping-calculator,volumetric-weight-calculator,cbm-calculator,track-shipment}/
 *   /help/{slug}/
 *   /locations/{slug}/
 *   /about/  /contact/  /request-quote/
 *
 * IMPORTANT (Change Brief Section 6):
 *   - URLs are lowercase, hyphenated, descriptive.
 *   - One canonical path per page. No duplicate aliases in production.
 *   - Legacy paths are 301-redirected, not rendered (see LEGACY_REDIRECTS).
 *
 * NOTE ON TRAILING SLASHES:
 *   The brief writes paths with a trailing slash. The current app uses
 *   non-trailing. Pick ONE convention, set it in netlify.toml, and keep it
 *   everywhere. Default below: NO trailing slash. Change `TRAILING_SLASH`
 *   to flip globally.
 * ---------------------------------------------------------------------------
 */

import { site } from "./site";

const TRAILING_SLASH = false;

function withSlash(path: string): string {
  if (path === "/") return "/";
  return TRAILING_SLASH ? `${path.replace(/\/+$/, "")}/` : path.replace(/\/+$/, "");
}

/** Route definition shape used across pages, nav, sitemap and metadata. */
export interface RouteDef {
  /** Canonical path (respects TRAILING_SLASH). */
  path: string;
  /** <title> fragment. Rendered via site.titleTemplate. */
  title: string;
  /** <meta name="description">. */
  description: string;
  /** Human label for nav / breadcrumbs. */
  label: string;
  /** Exclude from sitemap / robots (e.g. thank-you pages). */
  noindex?: boolean;
}

/* ---------------------------------------------------------------------------
 * Core commercial pages
 * ------------------------------------------------------------------------- */

export const coreRoutes = {
  home: {
    path: withSlash("/"),
    title: site.defaultTitle,
    description: site.defaultDescription,
    label: "Home",
  },
  airFreight: {
    path: withSlash("/air-freight"),
    title: "Air Freight to Kenya | International Cargo | Kisima Cargo",
    description:
      "Air freight to Kenya from China, the UK, USA, UAE and other supported markets. Fast transit, chargeable-weight pricing and customs support from Kisima Cargo.",
    label: "Air Freight",
  },
  seaFreight: {
    path: withSlash("/sea-freight"),
    title: "Sea Freight to Kenya | International Shipping | Kisima Cargo",
    description:
      "Sea freight and LCL shipping to Kenya. Understand CBM, consolidation, transit ranges and costs before you ship with Kisima Cargo.",
    label: "Sea Freight",
  },
  customsClearance: {
    path: withSlash("/customs-clearance"),
    title: "Customs Clearance Kenya | Import Support | Kisima Cargo",
    description:
      "Customs clearance support for imports into Kenya. Understand documents, duties and how Kisima Cargo helps shipments clear smoothly.",
    label: "Customs",
  },
  cargoConsolidation: {
    path: withSlash("/cargo-consolidation"),
    title: "Cargo Consolidation to Kenya | Kisima Cargo",
    description:
      "Combine multiple supplier shipments into one consolidated cargo to Kenya. Reduce cost and simplify customs with Kisima Cargo.",
    label: "Consolidation",
  },
  doorToDoor: {
    path: withSlash("/door-to-door-delivery"),
    title: "Door-to-Door Delivery Kenya | Kisima Cargo",
    description:
      "Door-to-door shipping to Kenya — supplier pickup, freight, customs and last-mile delivery handled by Kisima Cargo.",
    label: "Door-to-Door",
  },
  shopAndShip: {
    path: withSlash("/shop-and-ship"),
    title: "Shop & Ship to Kenya | Kisima Cargo",
    description:
      "Buy from international online stores and ship to Kenya with Kisima Cargo. Consolidation, customs support and delivery.",
    label: "Shop & Ship",
  },
  about: {
    path: withSlash("/about"),
    title: "About Kisima Cargo | International Shipping to Kenya",
    description:
      "Kisima Cargo provides air freight, sea freight, consolidation, customs support and delivery solutions into Kenya.",
    label: "About",
  },
  contact: {
    path: withSlash("/contact"),
    title: "Contact Kisima Cargo | Nairobi, Kenya",
    description:
      "Contact Kisima Cargo for international shipping, quotations, tracking and customs support into Kenya.",
    label: "Contact",
  },
  requestQuote: {
    path: withSlash("/request-quote"),
    title: "Request a Shipping Quote | Kisima Cargo",
    description:
      "Request a confirmed shipping quotation to Kenya. Share your route, cargo and services and Kisima Cargo will respond.",
    label: "Request a Quote",
  },
} as const;

/* ---------------------------------------------------------------------------
 * Route pages: origin → Kenya
 * ------------------------------------------------------------------------- */

export interface OriginRoute {
  slug: string;          // e.g. "china"
  label: string;         // e.g. "China"
  path: string;
  title: string;
  description: string;
}

const originSeeds: Array<{
  slug: string;
  label: string;
  h1Title: string;
  description: string;
}> = [
  {
    slug: "china",
    label: "China",
    h1Title: "Shipping From China to Kenya",
    description:
      "Ship cargo from China to Kenya by air and sea. Understand costs, transit, consolidation, customs and how to get a confirmed quote from Kisima Cargo.",
  },
  {
    slug: "uk",
    label: "UK",
    h1Title: "Shipping From UK to Kenya",
    description:
      "Ship cargo from the UK to Kenya by air and sea. Costs, transit ranges, customs documents and quote support from Kisima Cargo.",
  },
  {
    slug: "usa",
    label: "USA",
    h1Title: "Shipping From USA to Kenya",
    description:
      "Ship cargo from the USA to Kenya. Air and sea freight, consolidation, customs support and door-to-door options from Kisima Cargo.",
  },
  {
    slug: "uae",
    label: "UAE",
    h1Title: "Shipping From UAE to Kenya",
    description:
      "Ship cargo from the UAE to Kenya. Air and sea freight options, transit ranges, customs guidance and quotes from Kisima Cargo.",
  },
  {
    slug: "south-africa",
    label: "South Africa",
    h1Title: "Shipping From South Africa to Kenya",
    description:
      "Ship cargo from South Africa to Kenya. Compare air and sea freight, understand costs and request a confirmed quote from Kisima Cargo.",
  },
];

export const originRoutes: Record<string, OriginRoute> = Object.fromEntries(
  originSeeds.map((o) => [
    o.slug,
    {
      slug: o.slug,
      label: o.label,
      path: withSlash(`/routes/shipping-from-${o.slug}-to-kenya`),
      title: `${o.h1Title} | Kisima Cargo`,
      description: o.description,
    },
  ])
);

/* ---------------------------------------------------------------------------
 * Business category pages
 * ------------------------------------------------------------------------- */

const businessSeeds: Array<{ slug: string; label: string; title: string; description: string }> = [
  {
    slug: "clothing",
    label: "Clothing",
    title: "Shipping Clothing to Kenya | Kisima Cargo",
    description:
      "Ship clothing and textiles to Kenya from China, the UK, USA, UAE and South Africa. Air, sea and consolidation options from Kisima Cargo.",
  },
  {
    slug: "electronics",
    label: "Electronics",
    title: "Shipping Electronics to Kenya | Kisima Cargo",
    description:
      "Ship electronics to Kenya safely. Air and sea freight, consolidation, customs support and delivery from Kisima Cargo.",
  },
  {
    slug: "machinery",
    label: "Machinery",
    title: "Shipping Machinery to Kenya | Kisima Cargo",
    description:
      "Ship machinery and industrial equipment to Kenya. Sea freight, project handling and customs support from Kisima Cargo.",
  },
  {
    slug: "auto-parts",
    label: "Auto Parts",
    title: "Shipping Auto Parts to Kenya | Kisima Cargo",
    description:
      "Ship auto parts and vehicle components to Kenya by air and sea. Consolidation, customs support and delivery with Kisima Cargo.",
  },
  {
    slug: "wholesale-stock",
    label: "Wholesale Stock",
    title: "Shipping Wholesale Stock to Kenya | Kisima Cargo",
    description:
      "Import wholesale stock to Kenya from supported markets. Consolidation, sea and air freight with Kisima Cargo.",
  },
  {
    slug: "ecommerce",
    label: "E-commerce",
    title: "E-commerce Shipping to Kenya | Kisima Cargo",
    description:
      "E-commerce shipping to Kenya — shop & ship, consolidation, customs support and delivery from Kisima Cargo.",
  },
];

export const businessRoutes: Record<string, RouteDef> = Object.fromEntries(
  businessSeeds.map((b) => [
    b.slug,
    {
      path: withSlash(`/business/${b.slug}`),
      title: b.title,
      description: b.description,
      label: b.label,
    },
  ])
);

/* ---------------------------------------------------------------------------
 * Tools (calculators + tracking)
 * ------------------------------------------------------------------------- */

export const toolRoutes = {
  shippingCalculator: {
    path: withSlash("/tools/shipping-calculator"),
    title: "Shipping Cost Calculator Kenya | Kisima Cargo",
    description:
      "Estimate shipping costs to Kenya by air or sea. Enter route, weight and dimensions for an instant estimate from Kisima Cargo.",
    label: "Shipping Calculator",
  },
  volumetricWeightCalculator: {
    path: withSlash("/tools/volumetric-weight-calculator"),
    title: "Volumetric Weight Calculator | Kisima Cargo",
    description:
      "Calculate volumetric weight for air freight. Understand chargeable weight before you ship to Kenya with Kisima Cargo.",
    label: "Volumetric Weight",
  },
  cbmCalculator: {
    path: withSlash("/tools/cbm-calculator"),
    title: "CBM Calculator | Sea Freight to Kenya | Kisima Cargo",
    description:
      "Calculate CBM for sea freight. Estimate cubic meters for LCL shipments to Kenya with Kisima Cargo.",
    label: "CBM Calculator",
  },
  trackShipment: {
    path: withSlash("/tools/track-shipment"),
    title: "Track Your Shipment | Kisima Cargo",
    description:
      "Track your Kisima Cargo shipment. Enter your reference to see current status.",
    label: "Track Shipment",
  },
} as const;

/* ---------------------------------------------------------------------------
 * Help Centre
 * ------------------------------------------------------------------------- */

export interface HelpArticle extends RouteDef {
  slug: string;
  category: string;
}

const helpSeeds: Array<{
  slug: string;
  category: string;
  label: string;
  title: string;
  description: string;
}> = [
  {
    slug: "getting-started",
    category: "Getting Started",
    label: "Getting Started",
    title: "Getting Started with Kisima Cargo | Shipping to Kenya",
    description:
      "How Kisima Cargo works, first-time importer checklist and how to address packages for shipping to Kenya.",
  },
  {
    slug: "shipping-costs",
    category: "Shipping Costs",
    label: "Shipping Costs",
    title: "How Shipping Costs Are Calculated | Kisima Cargo",
    description:
      "Understand shipping cost components — rates, minimum charges, volumetric weight, CBM and additional fees.",
  },
  {
    slug: "volumetric-weight",
    category: "Air Freight",
    label: "Volumetric Weight",
    title: "What Is Volumetric Weight? | Kisima Cargo",
    description:
      "Volumetric weight is a calculation based on how much space a package occupies. Learn how it affects air freight charges to Kenya.",
  },
  {
    slug: "what-is-cbm",
    category: "Sea Freight",
    label: "What Is CBM?",
    title: "What Is CBM in Shipping? | Kisima Cargo",
    description:
      "CBM (cubic meter) is the standard unit for sea freight LCL shipments. Learn how it is calculated and charged.",
  },
  {
    slug: "customs-clearance-kenya",
    category: "Customs & Documents",
    label: "Customs Clearance in Kenya",
    title: "Customs Clearance in Kenya | Kisima Cargo",
    description:
      "How customs clearance works in Kenya, what documents are needed and how Kisima Cargo supports importers.",
  },
  {
    slug: "import-documents-kenya",
    category: "Customs & Documents",
    label: "Import Documents",
    title: "Import Documents for Kenya | Kisima Cargo",
    description:
      "Import documents commonly required for shipping to Kenya, including invoice, packing list, Certificate of Origin and CoC/PVoC where applicable.",
  },
  {
    slug: "prohibited-goods",
    category: "Restricted Goods",
    label: "Prohibited Goods",
    title: "Prohibited and Restricted Goods | Kisima Cargo",
    description:
      "Goods that cannot be shipped to Kenya, and restricted items that require approval or additional documentation.",
  },
  {
    slug: "first-time-importer-guide",
    category: "Getting Started",
    label: "First-Time Importer Guide",
    title: "First-Time Importer Guide to Kenya | Kisima Cargo",
    description:
      "A practical guide for first-time importers shipping cargo to Kenya — process, costs, documents and common mistakes.",
  },
];

export const helpRoutes: Record<string, HelpArticle> = Object.fromEntries(
  helpSeeds.map((h) => [
    h.slug,
    {
      slug: h.slug,
      category: h.category,
      path: withSlash(`/help/${h.slug}`),
      title: h.title,
      description: h.description,
      label: h.label,
    },
  ])
);

export const helpLanding: RouteDef = {
  path: withSlash("/help"),
  title: "Help Centre | Shipping to Kenya | Kisima Cargo",
  description:
    "Find simple answers about international shipping, costs, customs, packaging, tracking and importing into Kenya.",
  label: "Help Centre",
};

/* ---------------------------------------------------------------------------
 * Locations
 * ------------------------------------------------------------------------- */

const locationSeeds: Array<{ slug: string; label: string; title: string; description: string }> = [
  { slug: "nairobi", label: "Nairobi", title: "Kisima Cargo Nairobi | Shipping to Kenya", description: "Kisima Cargo operations and support in Nairobi, Kenya." },
  { slug: "guangzhou", label: "Guangzhou", title: "Kisima Cargo Guangzhou | China Consolidation", description: "Kisima Cargo receiving and consolidation in Guangzhou, China." },
  { slug: "dubai", label: "Dubai", title: "Kisima Cargo Dubai | UAE Cargo Support", description: "Kisima Cargo UAE cargo receiving and support in Dubai." },
  { slug: "uk", label: "UK", title: "Kisima Cargo UK | Shipping to Kenya", description: "Kisima Cargo UK cargo receiving and shipping to Kenya." },
  { slug: "usa", label: "USA", title: "Kisima Cargo USA | Shipping to Kenya", description: "Kisima Cargo USA cargo receiving and shipping to Kenya." },
  { slug: "south-africa", label: "South Africa", title: "Kisima Cargo South Africa | Shipping to Kenya", description: "Kisima Cargo South Africa cargo receiving and shipping to Kenya." },
];

export const locationRoutes: Record<string, RouteDef> = Object.fromEntries(
  locationSeeds.map((l) => [
    l.slug,
    {
      path: withSlash(`/locations/${l.slug}`),
      title: l.title,
      description: l.description,
      label: l.label,
    },
  ])
);

/* ---------------------------------------------------------------------------
 * Navigation (Change Brief Section 5, "Navigation recommendation")
 * ------------------------------------------------------------------------- */

export const primaryNav = [
  {
    label: "Ship",
    items: [
      coreRoutes.airFreight,
      coreRoutes.seaFreight,
      coreRoutes.doorToDoor,
      coreRoutes.customsClearance,
      coreRoutes.shopAndShip,
      coreRoutes.cargoConsolidation,
    ],
  },
  {
    label: "Routes",
    items: Object.values(originRoutes),
  },
  {
    label: "Business",
    items: Object.values(businessRoutes),
  },
  {
    label: "Tools",
    items: [
      toolRoutes.shippingCalculator,
      toolRoutes.volumetricWeightCalculator,
      toolRoutes.cbmCalculator,
      toolRoutes.trackShipment,
    ],
  },
  {
    label: "Help Centre",
    items: [
      helpLanding,
      ...Object.values(helpRoutes),
    ],
  },
] as const;

/* ---------------------------------------------------------------------------
 * Legacy redirects (Change Brief Section 6 — 301s from old Kisima URLs)
 * Feed this map into netlify.toml at build time, or maintain both.
 * ------------------------------------------------------------------------- */

export const LEGACY_REDIRECTS: Record<string, string> = {
  // Current dev-app paths that are being moved/renamed:
  "/calculator": toolRoutes.shippingCalculator.path,
  "/tracking-shipment": toolRoutes.trackShipment.path,
  "/buying-shipping": coreRoutes.shopAndShip.path,
  // "/blog" currently renders <Contact /> — confirm intent before launch.
  // If blog is being dropped, redirect to home or help:
  "/blog": helpLanding.path,
  // TODO: populate from the live kisimacargo.com URL inventory once crawled.
};

/* ---------------------------------------------------------------------------
 * Sitemap helper — all indexable routes in one array.
 * ------------------------------------------------------------------------- */

export function allIndexableRoutes(): RouteDef[] {
  return [
    coreRoutes.home,
    coreRoutes.airFreight,
    coreRoutes.seaFreight,
    coreRoutes.customsClearance,
    coreRoutes.cargoConsolidation,
    coreRoutes.doorToDoor,
    coreRoutes.shopAndShip,
    coreRoutes.about,
    coreRoutes.contact,
    coreRoutes.requestQuote,
    ...Object.values(originRoutes),
    ...Object.values(businessRoutes),
    toolRoutes.shippingCalculator,
    toolRoutes.volumetricWeightCalculator,
    toolRoutes.cbmCalculator,
    toolRoutes.trackShipment,
    helpLanding,
    ...Object.values(helpRoutes),
    ...Object.values(locationRoutes),
  ].filter((r) => !r.noindex);
}

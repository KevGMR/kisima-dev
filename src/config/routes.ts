/**
 * src/config/routes.ts
 * ===========================================================================
 * Single source of truth for every public URL on the Kisima Cargo site.
 *
 * Architecture (Rev 2 — global import/export positioning):
 *
 *   /                                  Homepage
 *   /import                            Import to Kenya landing
 *   /export                            Export from Kenya landing
 *   /air-freight /sea-freight ...      Services
 *   /routes/shipping-from-{origin}-to-kenya       Import routes (5)
 *   /routes/exporting-from-kenya-to-{dest}        Export routes (5)
 *   /business/{category}               Business categories (6)
 *   /tools/...                         Tools (4)
 *   /shipping-centre + /shipping-centre/{slug}    Educational content
 *   /locations + /locations/{slug}     Locations (7)
 *   /about /contact /request-quote
 *   /privacy-policy /terms /thank-you
 *
 * Change Brief refs:
 *   Rev 1 — Section 5 (site architecture)
 *   Rev 2 — Sections 6 (navigation & site architecture), 11 (route pages)
 *
 * NOTE ON TRAILING SLASHES:
 *   No trailing slashes. TRAILING_SLASH is kept as a switch but set to false.
 * ===========================================================================
 */


const TRAILING_SLASH = false;

function withSlash(path: string): string {
  if (path === "/") return "/";
  return TRAILING_SLASH ? `${path.replace(/\/+$/, "")}/` : path.replace(/\/+$/, "");
}

/** Route definition shape used across pages, nav, sitemap and metadata. */
export interface RouteDef {
  path: string;
  title: string;
  description: string;
  label: string;
  noindex?: boolean;
}

/* ===========================================================================
 * Core commercial pages
 * ======================================================================== */

export const coreRoutes = {
  home: {
    path: withSlash("/"),
    title: "Global Import & Export Logistics | Air & Sea Freight | Kisima Cargo",
    description:
      "Move goods into Kenya or export from Kenya to global markets. Air freight, sea freight, customs clearance, consolidation and door-to-door logistics from Kisima Cargo.",
    label: "Home",
  },
  airFreight: {
    path: withSlash("/air-freight"),
    title: "Air Freight to Kenya | International Cargo | Kisima Cargo",
    description:
      "Fast air freight for imports into Kenya and exports from Kenya. Chargeable-weight pricing and customs support from Kisima Cargo.",
    label: "Air Freight",
  },
  seaFreight: {
    path: withSlash("/sea-freight"),
    title: "Sea Freight to Kenya | International Shipping | Kisima Cargo",
    description:
      "Cost-effective sea freight for imports into Kenya and exports from Kenya. Understand CBM, consolidation and transit before you ship.",
    label: "Sea Freight",
  },
  customsClearance: {
    path: withSlash("/customs-clearance"),
    title: "Customs Clearance Kenya | Import & Export Support | Kisima Cargo",
    description:
      "Import and export customs clearance in Kenya. Documentation, submission and coordination handled by Kisima Cargo.",
    label: "Customs",
  },
  cargoConsolidation: {
    path: withSlash("/cargo-consolidation"),
    title: "Cargo Consolidation | Imports & Exports | Kisima Cargo",
    description:
      "Combine eligible shipments before international freight. Consolidation for imports into Kenya and exports from Kenya.",
    label: "Consolidation",
  },
  doorToDoor: {
    path: withSlash("/door-to-door-delivery"),
    title: "Door-to-Door Logistics | Kisima Cargo",
    description:
      "Origin-to-destination delivery where available — supplier pickup, freight, customs and last-mile delivery handled end to end.",
    label: "Door-to-Door",
  },
  shopAndShip: {
    path: withSlash("/shop-and-ship"),
    title: "Shop & Ship to Kenya | Kisima Cargo",
    description:
      "Buy from international online stores and ship to Kenya with Kisima Cargo. Consolidation, customs support and delivery.",
    label: "Shop & Ship",
  },
  businessLogistics: {
    path: withSlash("/business"),
    title: "Business Logistics | Kisima Cargo",
    description:
      "Freight solutions for commercial importers, exporters, wholesalers and growing businesses.",
    label: "Business",
  },
  about: {
    path: withSlash("/about"),
    title: "About Kisima Cargo | Global Import & Export Logistics",
    description:
      "Kisima Cargo is a global import and export logistics company headquartered in East Africa, connecting Kenya with international markets.",
    label: "About",
  },
  contact: {
    path: withSlash("/contact"),
    title: "Contact Kisima Cargo | Nairobi, Kenya",
    description:
      "Contact Kisima Cargo for imports, exports, quotations, tracking and customs support.",
    label: "Contact",
  },
  requestQuote: {
    path: withSlash("/request-quote"),
    title: "Request a Shipping Quote | Kisima Cargo",
    description:
      "Request a confirmed shipping quotation — for imports into Kenya or exports from Kenya.",
    label: "Request a Quote",
  },
} as const;

/* ===========================================================================
 * IMPORT — landing + routes
 * ======================================================================== */

export const importLanding: RouteDef = {
  path: withSlash("/import"),
  title: "Import to Kenya | Air & Sea Freight | Kisima Cargo",
  description:
    "Bringing goods into Kenya? Ship personal cargo, commercial stock, machinery, electronics, clothing and more from supported international origins.",
  label: "Import to Kenya",
};

export interface OriginRoute {
  slug: string;
  label: string;
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

/* ===========================================================================
 * EXPORT — landing + routes
 * ======================================================================== */

export const exportLanding: RouteDef = {
  path: withSlash("/export"),
  title: "Export from Kenya | Air & Sea Freight | Kisima Cargo",
  description:
    "Shipping goods from Kenya to the world? Send commercial cargo, products and personal shipments from Kenya to supported international destinations.",
  label: "Export from Kenya",
};

export interface DestinationRoute {
  slug: string;
  label: string;
  path: string;
  title: string;
  description: string;
}

const destinationSeeds: Array<{
  slug: string;
  label: string;
  h1Title: string;
  description: string;
}> = [
  {
    slug: "uk",
    label: "UK",
    h1Title: "Export from Kenya to the UK",
    description:
      "Ship goods from Kenya to the United Kingdom by air and sea. Documentation, export customs, freight and delivery handled by Kisima Cargo.",
  },
  {
    slug: "usa",
    label: "USA",
    h1Title: "Export from Kenya to the USA",
    description:
      "Ship goods from Kenya to the United States by air and sea. Export documentation, customs, freight and delivery from Kisima Cargo.",
  },
  {
    slug: "uae",
    label: "UAE",
    h1Title: "Export from Kenya to the UAE",
    description:
      "Ship goods from Kenya to the UAE by air and sea. Export clearance, freight and delivery options from Kisima Cargo.",
  },
  {
    slug: "europe",
    label: "Europe",
    h1Title: "Export from Kenya to Europe",
    description:
      "Ship goods from Kenya to European destinations by air and sea. Documentation, export clearance and freight coordination from Kisima Cargo.",
  },
  {
    slug: "africa",
    label: "Africa",
    h1Title: "Export from Kenya to Africa",
    description:
      "Ship goods from Kenya to other African markets by air and sea. Export documentation, clearance and freight from Kisima Cargo.",
  },
];

export const destinationRoutes: Record<string, DestinationRoute> = Object.fromEntries(
  destinationSeeds.map((d) => [
    d.slug,
    {
      slug: d.slug,
      label: d.label,
      path: withSlash(`/routes/exporting-from-kenya-to-${d.slug}`),
      title: `${d.h1Title} | Kisima Cargo`,
      description: d.description,
    },
  ])
);

/* ===========================================================================
 * Business category pages (unchanged)
 * ======================================================================== */

const businessSeeds: Array<{ slug: string; label: string; title: string; description: string }> = [
  { slug: "clothing", label: "Clothing", title: "Shipping Clothing to Kenya | Kisima Cargo", description: "Ship clothing and textiles to Kenya from China, the UK, USA, UAE and South Africa. Air, sea and consolidation options from Kisima Cargo." },
  { slug: "electronics", label: "Electronics", title: "Shipping Electronics to Kenya | Kisima Cargo", description: "Ship electronics to Kenya safely. Air and sea freight, consolidation, customs support and delivery from Kisima Cargo." },
  { slug: "machinery", label: "Machinery", title: "Shipping Machinery to Kenya | Kisima Cargo", description: "Ship machinery and industrial equipment to Kenya. Sea freight, project handling and customs support from Kisima Cargo." },
  { slug: "auto-parts", label: "Auto Parts", title: "Shipping Auto Parts to Kenya | Kisima Cargo", description: "Ship auto parts and vehicle components to Kenya by air and sea. Consolidation, customs support and delivery with Kisima Cargo." },
  { slug: "wholesale-stock", label: "Wholesale Stock", title: "Shipping Wholesale Stock to Kenya | Kisima Cargo", description: "Import wholesale stock to Kenya from supported markets. Consolidation, sea and air freight with Kisima Cargo." },
  { slug: "ecommerce", label: "E-commerce", title: "E-commerce Shipping to Kenya | Kisima Cargo", description: "E-commerce shipping to Kenya — shop & ship, consolidation, customs support and delivery from Kisima Cargo." },
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

/* ===========================================================================
 * Tools (unchanged)
 * ======================================================================== */

export const toolRoutes = {
  shippingCalculator: {
    path: withSlash("/tools/shipping-calculator"),
    title: "Shipping Cost Calculator | Imports & Exports | Kisima Cargo",
    description:
      "Estimate shipping costs for imports into Kenya and exports from Kenya by air or sea. Instant estimate from Kisima Cargo.",
    label: "Shipping Calculator",
  },
  volumetricWeightCalculator: {
    path: withSlash("/tools/volumetric-weight-calculator"),
    title: "Volumetric Weight Calculator | Kisima Cargo",
    description:
      "Calculate volumetric weight for air freight. Understand chargeable weight before you ship with Kisima Cargo.",
    label: "Volumetric Weight",
  },
  cbmCalculator: {
    path: withSlash("/tools/cbm-calculator"),
    title: "CBM Calculator | Sea Freight | Kisima Cargo",
    description:
      "Calculate CBM for sea freight. Estimate cubic meters for LCL shipments with Kisima Cargo.",
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

/* ===========================================================================
 * Shipping Centre (was Help Centre)
 *
 * Renamed from /help to /shipping-centre. Legacy /help URLs 301-redirect
 * to the new paths (see LEGACY_REDIRECTS below).
 * ======================================================================== */

export const shippingCentreLanding: RouteDef = {
  path: withSlash("/shipping-centre"),
  title: "Kisima Shipping Centre | Practical guides for importing and exporting",
  description:
    "Practical guides for importing, exporting and moving cargo internationally. Air freight, sea freight, customs, documentation, packaging and business logistics.",
  label: "Shipping Centre",
};

/** Legacy alias — still used by some pages. Points to the new path. */
export const helpLanding = shippingCentreLanding;

export interface ShippingCentreArticle extends RouteDef {
  slug: string;
  category: string;
}

const shippingCentreSeeds: Array<{
  slug: string;
  category: string;
  label: string;
  title: string;
  description: string;
}> = [
  // Import-focused (existing)
  { slug: "getting-started", category: "Getting Started", label: "Getting Started", title: "Getting Started with Kisima Cargo | Shipping to Kenya", description: "How Kisima Cargo works, first-time importer checklist and how to address packages for shipping to Kenya." },
  { slug: "shipping-costs", category: "Shipping Costs", label: "Shipping Costs", title: "How Shipping Costs Are Calculated | Kisima Cargo", description: "Understand shipping cost components — rates, minimum charges, volumetric weight, CBM and additional fees." },
  { slug: "volumetric-weight", category: "Air Freight", label: "Volumetric Weight", title: "What Is Volumetric Weight? | Kisima Cargo", description: "Volumetric weight is a calculation based on how much space a package occupies. Learn how it affects air freight charges." },
  { slug: "what-is-cbm", category: "Sea Freight", label: "What Is CBM?", title: "What Is CBM in Shipping? | Kisima Cargo", description: "CBM (cubic meter) is the standard unit for sea freight LCL shipments. Learn how it is calculated and charged." },
  { slug: "customs-clearance-kenya", category: "Customs", label: "Customs Clearance in Kenya", title: "Customs Clearance in Kenya | Kisima Cargo", description: "How customs clearance works in Kenya, what documents are needed and how Kisima Cargo supports importers and exporters." },
  { slug: "import-documents-kenya", category: "Documents", label: "Import Documents", title: "Import Documents for Kenya | Kisima Cargo", description: "Import documents commonly required for shipping to Kenya, including invoice, packing list, Certificate of Origin and CoC/PVoC where applicable." },
  { slug: "prohibited-goods", category: "Restricted Goods", label: "Prohibited Goods", title: "Prohibited and Restricted Goods | Kisima Cargo", description: "Goods that cannot be shipped, and restricted items that require approval or additional documentation." },
  { slug: "first-time-importer-guide", category: "Getting Started", label: "First-Time Importer Guide", title: "First-Time Importer Guide to Kenya | Kisima Cargo", description: "A practical guide for first-time importers shipping cargo to Kenya — process, costs, documents and common mistakes." },

  // Export-focused (new)
  { slug: "how-to-export-from-kenya", category: "Exports", label: "How to Export from Kenya", title: "How to Export Goods from Kenya | Kisima Cargo", description: "A practical guide to exporting goods from Kenya — documentation, clearance, freight and destination delivery." },
  { slug: "export-documents-kenya", category: "Exports", label: "Export Documents", title: "Documents Needed When Exporting from Kenya | Kisima Cargo", description: "Export documentation for goods leaving Kenya — commercial invoice, packing list, certificate of origin and export declaration." },
  { slug: "export-customs-clearance", category: "Exports", label: "Export Customs Clearance", title: "How Export Customs Clearance Works in Kenya | Kisima Cargo", description: "Understand export clearance in Kenya — declarations, inspection and coordination." },
  { slug: "packaging-for-export", category: "Packaging", label: "Packaging for Export", title: "How to Package Goods for International Export | Kisima Cargo", description: "Practical guidance on packaging goods safely for international air and sea freight." },
  { slug: "export-from-kenya-to-uk", category: "Exports", label: "Export Kenya to UK", title: "How to Export from Kenya to the UK | Kisima Cargo", description: "Shipping goods from Kenya to the United Kingdom — air, sea, customs and delivery." },
  { slug: "export-from-kenya-to-usa", category: "Exports", label: "Export Kenya to USA", title: "How to Export from Kenya to the USA | Kisima Cargo", description: "Shipping goods from Kenya to the United States — air, sea, customs and delivery." },
  { slug: "air-freight-exports-from-kenya", category: "Exports", label: "Air Freight Exports", title: "Air Freight Exports from Kenya | Kisima Cargo", description: "Air freight services for goods leaving Kenya — charging, transit and suitable cargo." },
  { slug: "sea-freight-exports-from-kenya", category: "Exports", label: "Sea Freight Exports", title: "Sea Freight Exports from Kenya | Kisima Cargo", description: "Sea freight services for goods leaving Kenya — CBM, container options and suitable cargo." },
];

export const shippingCentreRoutes: Record<string, ShippingCentreArticle> = Object.fromEntries(
  shippingCentreSeeds.map((h) => [
    h.slug,
    {
      slug: h.slug,
      category: h.category,
      path: withSlash(`/shipping-centre/${h.slug}`),
      title: h.title,
      description: h.description,
      label: h.label,
    },
  ])
);

/** Backward-compatible alias. Some existing pages import `helpRoutes`. */
export const helpRoutes = shippingCentreRoutes;

/* ===========================================================================
 * Locations (unchanged)
 * ======================================================================== */

const locationSeeds: Array<{ slug: string; label: string; title: string; description: string }> = [
  { slug: "nairobi", label: "Nairobi", title: "Kisima Cargo Nairobi | Head Office", description: "Kisima Cargo head office and collection point in Industrial Area, Nairobi." },
  { slug: "guangzhou", label: "Guangzhou", title: "Kisima Cargo Guangzhou | China Receiving Warehouse", description: "Kisima Cargo receiving warehouse in Foshan, Guangdong, China." },
  { slug: "dubai", label: "Dubai", title: "Kisima Cargo Dubai | UAE Receiving Warehouse", description: "Kisima Cargo UAE receiving warehouse in Deira, Dubai." },
  { slug: "uk", label: "United Kingdom", title: "Kisima Cargo UK | Hayes Receiving Warehouse", description: "Kisima Cargo UK receiving warehouse in Hayes." },
  { slug: "usa", label: "United States", title: "Kisima Cargo USA | Receiving Warehouse", description: "Kisima Cargo US receiving warehouse." },
  { slug: "south-africa", label: "South Africa", title: "Kisima Cargo South Africa | Receiving Warehouse", description: "Kisima Cargo South Africa receiving warehouse in Johannesburg." },
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

export const locationsLanding: RouteDef = {
  path: withSlash("/locations"),
  title: "Our Locations | Kisima Cargo",
  description: "Kisima Cargo offices and receiving warehouses across the global network.",
  label: "Locations",
};

/* ===========================================================================
 * Navigation (Brief Rev 2, Section 6)
 *
 * Desktop: Home | Import | Export | Services | Routes | Tools | Shipping
 *          Centre | Locations | About
 * ======================================================================== */

export const primaryNav = [
  { label: "Home", path: "/" },
  {
    label: "Import",
    path: importLanding.path,
    items: [
      { label: "Import to Kenya", path: importLanding.path },
      ...Object.values(originRoutes).map((r) => ({ label: `${r.label} to Kenya`, path: r.path })),
    ],
  },
  {
    label: "Export",
    path: exportLanding.path,
    items: [
      { label: "Export from Kenya", path: exportLanding.path },
      ...Object.values(destinationRoutes).map((d) => ({ label: `Kenya to ${d.label}`, path: d.path })),
    ],
  },
  {
    label: "Services",
    path: "#",
    items: [
      { label: "Air Freight", path: coreRoutes.airFreight.path },
      { label: "Sea Freight", path: coreRoutes.seaFreight.path },
      { label: "Customs Clearance", path: coreRoutes.customsClearance.path },
      { label: "Cargo Consolidation", path: coreRoutes.cargoConsolidation.path },
      { label: "Door-to-Door", path: coreRoutes.doorToDoor.path },
      { label: "Shop & Ship", path: coreRoutes.shopAndShip.path },
      { label: "Business Logistics", path: coreRoutes.businessLogistics.path },
    ],
  },
  {
    label: "Routes",
    path: "#",
    items: [
      ...Object.values(originRoutes).map((r) => ({ label: `${r.label} to Kenya`, path: r.path })),
      ...Object.values(destinationRoutes).map((d) => ({ label: `Kenya to ${d.label}`, path: d.path })),
    ],
  },
  {
    label: "Tools",
    path: "#",
    items: [
      { label: "Shipping Calculator", path: toolRoutes.shippingCalculator.path },
      { label: "Volumetric Weight", path: toolRoutes.volumetricWeightCalculator.path },
      { label: "CBM Calculator", path: toolRoutes.cbmCalculator.path },
      { label: "Track Shipment", path: toolRoutes.trackShipment.path },
    ],
  },
  { label: "Shipping Centre", path: shippingCentreLanding.path },
  { label: "Locations", path: locationsLanding.path },
  { label: "About", path: coreRoutes.about.path },
] as const;

/* ===========================================================================
 * Legacy redirects (301s)
 * ======================================================================== */

export const LEGACY_REDIRECTS: Record<string, string> = {
  // Dev-app paths → new paths
  "/calculator": toolRoutes.shippingCalculator.path,
  "/tracking-shipment": toolRoutes.trackShipment.path,
  "/buying-shipping": coreRoutes.shopAndShip.path,
  "/blog": shippingCentreLanding.path,

  // /help → /shipping-centre
  "/help": shippingCentreLanding.path,
  // Article-level 301s: /help/{slug} → /shipping-centre/{slug}
  // (Handled in netlify.toml with a wildcard rule.)
};

/* ===========================================================================
 * Sitemap helper — all indexable routes in one array.
 * ======================================================================== */

export function allIndexableRoutes(): RouteDef[] {
  return [
    coreRoutes.home,
    // Import / Export landings
    importLanding,
    exportLanding,
    // Core services
    coreRoutes.airFreight,
    coreRoutes.seaFreight,
    coreRoutes.customsClearance,
    coreRoutes.cargoConsolidation,
    coreRoutes.doorToDoor,
    coreRoutes.shopAndShip,
    coreRoutes.businessLogistics,
    coreRoutes.about,
    coreRoutes.contact,
    coreRoutes.requestQuote,
    // Import routes
    ...Object.values(originRoutes),
    // Export routes
    ...Object.values(destinationRoutes),
    // Business categories
    ...Object.values(businessRoutes),
    // Tools
    toolRoutes.shippingCalculator,
    toolRoutes.volumetricWeightCalculator,
    toolRoutes.cbmCalculator,
    toolRoutes.trackShipment,
    // Shipping Centre
    shippingCentreLanding,
    ...Object.values(shippingCentreRoutes),
    // Locations
    locationsLanding,
    ...Object.values(locationRoutes),
  ] as RouteDef[];
}

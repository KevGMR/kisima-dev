/**
 * src/config/site.ts
 * ---------------------------------------------------------------------------
 * Single source of truth for Kisima Cargo site-wide metadata.
 *
 * Used by: page <head> metadata, structured data, sitemap generation,
 * canonical URLs, Open Graph tags, and CTA helpers.
 *
 * Environment variables (set in .env / Netlify UI):
 *   VITE_SITE_URL   -> e.g. https://kismacargo.com  (production canonical)
 *   VITE_SITE_ENV   -> "production" | "staging" | "development"
 *   VITE_WHATSAPP   -> international format, digits only, e.g. 2547XXXXXXXX
 *
 * IMPORTANT (per Change Brief Section 6 & 13):
 *   - The Netlify dev site MUST run with VITE_SITE_ENV=staging so that
 *     robots + metadata emit noindex.
 *   - Production canonical must always resolve to https://kismacargo.com.
 * ---------------------------------------------------------------------------
 */

const RAW_URL = import.meta.env.VITE_SITE_URL ?? "https://kismacargo.com";
const RAW_ENV = import.meta.env.VITE_SITE_ENV ?? "development";
const RAW_WHATSAPP = import.meta.env.VITE_WHATSAPP ?? "";

/** Normalise the site URL: strip trailing slash, force https in production. */
function normaliseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export type SiteEnv = "production" | "staging" | "development";

export const SITE_ENV: SiteEnv = (
  ["production", "staging", "development"].includes(RAW_ENV) ? RAW_ENV : "development"
) as SiteEnv;

/** Canonical production URL (always used for canonical tags & sitemap). */
export const PRODUCTION_URL = "https://kismacargo.com";

/** The URL this build is actually served from. */
export const SITE_URL = normaliseUrl(RAW_URL);

/** True when this build should be hidden from search engines. */
export const IS_NOINDEX = SITE_ENV !== "production";

/** True when canonical/sitemap/OG should point at the production domain. */
export const IS_PRODUCTION = SITE_ENV === "production";

export const site = {
  /** Brand */
  name: "Kisima Cargo",
  legalName: "Kisima Cargo",
  tagline: "Global Shipping. Simplified.",
  shortDescription:
    "International shipping to Kenya made simple. Air freight, sea freight, consolidation, customs support and door-to-door delivery.",

  /** Domains */
  url: SITE_URL,
  productionUrl: PRODUCTION_URL,
  env: SITE_ENV,
  noindex: IS_NOINDEX,

  /** Default SEO (brief Section 6 homepage metadata recommendation) */
  defaultTitle: "International Shipping to Kenya | Air & Sea Freight | Kisima Cargo",
  defaultDescription:
    "Ship cargo to Kenya from China, the UK, USA, UAE and other supported markets with Kisima Cargo. Explore air and sea freight, consolidation, customs support, tracking and delivery solutions.",
  titleTemplate: "%s | Kisima Cargo",

  /** Social / Open Graph defaults */
  og: {
    type: "website",
    image: "/og/kisima-cargo-default.jpg", // TODO: add real 1200x630 image
    imageAlt: "Kisima Cargo — international shipping to Kenya",
    locale: "en_KE",
    twitterCard: "summary_large_image",
    // TODO: confirm real handle before enabling
    twitterSite: "",
  },

  /** Contact — PLACEHOLDERS. Replace with verified details before launch. */
  contact: {
    phoneDisplay: "+254 7XX XXX XXX", // TODO: verified number (brief Section 12)
    phoneE164: "+2547XXXXXXXX",       // TODO: verified number, E.164
    email: "info@kismacargo.com",     // TODO: verified inbox
    whatsappNumber: RAW_WHATSAPP,     // digits only, no + or spaces
    addressLocality: "Nairobi",
    addressCountry: "KE",
    // TODO: full verified address(es) for LocalBusiness schema
    address: {
      street: "",
      city: "Nairobi",
      region: "",
      postalCode: "",
      country: "KE",
    },
  },

  /** Supported origins (brief Section 3 & 5) */
  supportedOrigins: [
    { slug: "china", label: "China" },
    { slug: "uk", label: "UK" },
    { slug: "usa", label: "USA" },
    { slug: "uae", label: "UAE" },
    { slug: "south-africa", label: "South Africa" },
  ] as const,

  /** Initial destination (brief Section 4 — quick estimator) */
  primaryDestination: { slug: "kenya", label: "Kenya" },

  /** Services shown in trust bar / nav (brief Section 3) */
  services: [
    "Air Freight",
    "Sea Freight",
    "Consolidation",
    "Customs Support",
    "Door-to-Door",
  ] as const,
} as const;

export type Site = typeof site;

/**
 * Build an absolute URL for canonical / OG tags.
 * Always uses the production domain in production, and the live build URL
 * otherwise (so staging OG previews still resolve).
 */
export function absoluteUrl(path = "/"): string {
  const base = IS_PRODUCTION ? PRODUCTION_URL : SITE_URL;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean === "/" ? "" : clean}`;
}

/** Pre-filled WhatsApp deep link. Falls back gracefully if number unset. */
export function whatsappLink(message?: string): string {
  const num = site.contact.whatsappNumber;
  if (!num) return "https://wa.me/"; // TODO: configure VITE_WHATSAPP
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${text}`;
}

/** Contextual WhatsApp messages (brief Section 10). */
export const whatsappMessages = {
  china: "Hello Kisima Cargo. I would like a quote for shipping from China to Kenya.",
  uk: "Hello Kisima Cargo. I would like information about shipping from the UK to Kenya.",
  usa: "Hello Kisima Cargo. I would like a quote for shipping from the USA to Kenya.",
  uae: "Hello Kisima Cargo. I would like a quote for shipping from the UAE to Kenya.",
  southAfrica:
    "Hello Kisima Cargo. I would like a quote for shipping from South Africa to Kenya.",
  machinery: "Hello Kisima Cargo. I need a quotation for shipping machinery to Kenya.",
  calculatorResult:
    "Hello Kisima Cargo. My estimate reference is [REFERENCE]. I would like a confirmed quotation.",
} as const;

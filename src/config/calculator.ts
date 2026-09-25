/**
 * src/config/calculator.ts
 * ---------------------------------------------------------------------------
 * Shipping calculator configuration and pure calculation logic.
 *
 * Aligned with Change Brief Section 4 ("Shipping calculator specification").
 *
 * ⚠️  CRITICAL — READ BEFORE EDITING RATES  ⚠️
 * ---------------------------------------------------------------------------
 * The rates, divisors, handling fees, customs fees and transit windows below
 * are PLACEHOLDER VALUES carried over from the existing development build.
 * They are NOT verified operational data.
 *
 * The Change Brief (Section 2) says:
 *   "Do not migrate unverified prices, departure days or transit times from
 *    the old website. Confirm all operational data first."
 *   "Store route rates, minimums, CBM rates, divisors, fees and transit
 *    windows in an admin-editable database."
 *
 * Therefore:
 *   1. Treat every value marked `// TODO: VERIFY` as non-production.
 *   2. Before launch, either (a) replace this file with data fetched from an
 *      admin database, or (b) update the values here with Operations-approved
 *      figures and record who approved them.
 *   3. Do NOT launch with these placeholders visible to end users.
 * ---------------------------------------------------------------------------
 */

import { z } from "zod";

/* ---------------------------------------------------------------------------
 * Types — mirror the "Admin data required" table in the brief.
 * ------------------------------------------------------------------------- */

export type ShippingMode = "air" | "sea";

/** Volumetric divisor is per-route/service, never global. */
export type VolumetricDivisor = number;

export interface RouteRate {
  /** Stable internal key, e.g. "china-air", "uk-sea". */
  id: string;
  /** Origin country slug matching src/config/routes.ts originRoutes keys. */
  originSlug: string;
  /** Display label, e.g. "China (Air)". */
  label: string;
  /** Air or sea. One rate row = one mode. */
  mode: ShippingMode;
  /** Currency the rate and fees are expressed in (ISO 4217, e.g. "EUR", "KES"). */
  currency: string;
  /** Rate per kg (air) or per CBM (sea). TODO: VERIFY. */
  rate: number;
  /** Optional elevated rate for restricted goods (air only). TODO: VERIFY. */
  rateRestricted?: number;
  /** Minimum charge floor. Prevents invalid low estimates. TODO: VERIFY. */
  minimumCharge: number;
  /** Handling / extra fee. Only applied when explicitly approved. TODO: VERIFY. */
  handlingFee: number;
  /** Route/service-specific volumetric divisor (air only). TODO: VERIFY. */
  volumetricDivisor: VolumetricDivisor;
  /** Transit window in working days. TODO: VERIFY. */
  transit: { minDays: number; maxDays: number; display: string };
  /** ISO date when this rate row becomes effective. TODO: VERIFY. */
  effectiveFrom: string;
  /** ISO date when this rate row expires. Empty = open-ended. TODO: VERIFY. */
  effectiveTo: string;
  /** Operations can pause a route or rate without deleting it. */
  active: boolean;
}

/* ---------------------------------------------------------------------------
 * Route rate table
 *
 * This is the SINGLE place rates live in the front-end for now.
 * Replace with DB fetch before production (brief Section 4).
 * ------------------------------------------------------------------------- */

export const routeRates: Record<string, RouteRate> = {
  /* --- Air --- */
  uk: {
    id: "uk",
    originSlug: "uk",
    label: "United Kingdom (Air)",
    mode: "air",
    currency: "EUR",
    rate: 6.5,                 // TODO: VERIFY
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 25,           // TODO: VERIFY
    volumetricDivisor: 5000,   // TODO: VERIFY
    transit: { minDays: 3, maxDays: 4, display: "3–4 working days" }, // TODO: VERIFY
    effectiveFrom: "",         // TODO: VERIFY
    effectiveTo: "",           // TODO: VERIFY
    active: false,             // disabled until verified
  },
  "china-air": {
    id: "china-air",
    originSlug: "china",
    label: "China (Air)",
    mode: "air",
    currency: "EUR",
    rate: 10.5,                // TODO: VERIFY
    rateRestricted: 13,        // TODO: VERIFY
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 0,            // TODO: VERIFY
    volumetricDivisor: 5000,   // TODO: VERIFY
    transit: { minDays: 7, maxDays: 10, display: "7–10 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  usa: {
    id: "usa",
    originSlug: "usa",
    label: "United States (Air)",
    mode: "air",
    currency: "EUR",
    rate: 15,                  // TODO: VERIFY
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 0,            // TODO: VERIFY
    volumetricDivisor: 5000,   // TODO: VERIFY
    transit: { minDays: 7, maxDays: 7, display: "7 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "dubai-air": {
    id: "dubai-air",
    originSlug: "uae",
    label: "Dubai (Air)",
    mode: "air",
    currency: "EUR",
    rate: 9,                   // TODO: VERIFY
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 0,            // TODO: VERIFY
    volumetricDivisor: 5000,   // TODO: VERIFY
    transit: { minDays: 4, maxDays: 5, display: "4–5 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "south-africa": {
    id: "south-africa",
    originSlug: "south-africa",
    label: "South Africa (Air)",
    mode: "air",
    currency: "EUR",
    rate: 8,                   // TODO: VERIFY
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 25,           // TODO: VERIFY
    volumetricDivisor: 5000,   // TODO: VERIFY
    transit: { minDays: 3, maxDays: 4, display: "3–4 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },

  /* --- Sea --- */
  "china-sea": {
    id: "china-sea",
    originSlug: "china",
    label: "China (Sea)",
    mode: "sea",
    currency: "KES",
    rate: 60000,               // TODO: VERIFY (per CBM)
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 0,            // TODO: VERIFY
    volumetricDivisor: 0,      // N/A for sea (kept for type consistency)
    transit: { minDays: 45, maxDays: 45, display: "45 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "uk-sea": {
    id: "uk-sea",
    originSlug: "uk",
    label: "United Kingdom (Sea)",
    mode: "sea",
    currency: "EUR",
    rate: 2.5,                 // TODO: VERIFY (per CBM)
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 15,           // TODO: VERIFY
    volumetricDivisor: 0,
    transit: { minDays: 30, maxDays: 45, display: "30–45 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "dubai-sea": {
    id: "dubai-sea",
    originSlug: "uae",
    label: "Dubai (Sea)",
    mode: "sea",
    currency: "KES",
    rate: 62000,               // TODO: VERIFY (per CBM)
    minimumCharge: 0,          // TODO: VERIFY
    handlingFee: 0,            // TODO: VERIFY
    volumetricDivisor: 0,
    transit: { minDays: 40, maxDays: 40, display: "40 working days" }, // TODO: VERIFY
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
};

/** Only routes marked `active: true` should be selectable in the UI. */
export function activeRouteRates(): RouteRate[] {
  return Object.values(routeRates).filter((r) => r.active);
}

/** Lookup helper — returns undefined if the route is inactive or unknown. */
export function getRouteRate(id: string): RouteRate | undefined {
  const r = routeRates[id];
  return r && r.active ? r : undefined;
}

/* ---------------------------------------------------------------------------
 * Pure calculation helpers (Change Brief Section 4, "Calculation logic")
 * ------------------------------------------------------------------------- */

export interface PackageInput {
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  quantity: number;
  /** Optional declared value for insurance enquiry. */
  declaredValue?: number;
}

export interface ChargeableBreakdown {
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  cbm: number;
}

/**
 * AIR FREIGHT
 *   Volumetric weight = (L × W × H × Qty) ÷ route-specific divisor
 *   Chargeable weight = the higher of actual vs volumetric
 *   Base estimate     = chargeable weight × rate per kg
 */
export function calcAirChargeable(
  pkg: PackageInput,
  divisor: VolumetricDivisor
): ChargeableBreakdown {
  if (divisor <= 0) {
    throw new Error("Air freight requires a positive volumetric divisor.");
  }
  const actualWeightKg = pkg.weightKg * pkg.quantity;
  const volumetricWeightKg =
    (pkg.lengthCm * pkg.widthCm * pkg.heightCm * pkg.quantity) / divisor;
  const chargeableWeightKg = Math.max(actualWeightKg, volumetricWeightKg);
  const cbm = (pkg.lengthCm * pkg.widthCm * pkg.heightCm * pkg.quantity) / 1_000_000;
  return { actualWeightKg, volumetricWeightKg, chargeableWeightKg, cbm };
}

/**
 * SEA FREIGHT
 *   CBM          = L(m) × W(m) × H(m) × Qty
 *   Base estimate = CBM × rate per CBM
 */
export function calcSeaCBM(pkg: PackageInput): ChargeableBreakdown {
  const cbm =
    (pkg.lengthCm / 100) * (pkg.widthCm / 100) * (pkg.heightCm / 100) * pkg.quantity;
  return {
    actualWeightKg: pkg.weightKg * pkg.quantity,
    volumetricWeightKg: 0,
    chargeableWeightKg: pkg.weightKg * pkg.quantity,
    cbm,
  };
}

export interface EstimateResult {
  routeId: string;
  mode: ShippingMode;
  currency: string;
  chargeableBasis: "kg" | "CBM";
  chargeableQty: number;
  freight: number;
  handling: number;
  /** True if minimum charge was applied instead of the computed freight. */
  minimumApplied: boolean;
  total: number;
  transitDisplay: string;
  /** Human-readable estimate reference for WhatsApp handoff. */
  reference: string;
  /** Disclaimer shown with every estimate (brief Section 4). */
  disclaimer: string;
}

/**
 * Compute a full estimate for one route and one package.
 * For multi-package quotes, sum the `chargeableQty` first, then call
 * `estimateFromQty` (below).
 */
export function calcEstimate(
  rate: RouteRate,
  pkg: PackageInput
): EstimateResult {
  const breakdown =
    rate.mode === "air"
      ? calcAirChargeable(pkg, rate.volumetricDivisor)
      : calcSeaCBM(pkg);

  const chargeableQty =
    rate.mode === "air" ? breakdown.chargeableWeightKg : breakdown.cbm;

  return estimateFromQty(rate, chargeableQty);
}

/** Same as calcEstimate but starts from an already-summed chargeable qty. */
export function estimateFromQty(rate: RouteRate, chargeableQty: number): EstimateResult {
  const rawFreight = chargeableQty * rate.rate;
  const minimumApplied = rate.minimumCharge > 0 && rawFreight < rate.minimumCharge;
  const freight = minimumApplied ? rate.minimumCharge : rawFreight;
  const handling = rate.handlingFee;
  const total = freight + handling;

  return {
    routeId: rate.id,
    mode: rate.mode,
    currency: rate.currency,
    chargeableBasis: rate.mode === "air" ? "kg" : "CBM",
    chargeableQty,
    freight,
    handling,
    minimumApplied,
    total,
    transitDisplay: rate.transit.display,
    reference: generateReference(),
    disclaimer:
      "This is an approximate estimate only. Final cost depends on verified weight, " +
      "dimensions, current rates and applicable customs charges. Request a confirmed " +
      "quote from Kisima Cargo before shipping.",
  };
}

/** Short, human-readable estimate reference for the WhatsApp handoff. */
export function generateReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KC-${stamp}-${rand}`;
}

/* ---------------------------------------------------------------------------
 * Validation (brief Section 13: "handles invalid, missing and extreme values")
 * ------------------------------------------------------------------------- */

export const packageSchema = z.object({
  weightKg: z.number().positive().max(50_000, "Weight looks unrealistic."),
  lengthCm: z.number().positive().max(2_000, "Length looks unrealistic."),
  widthCm: z.number().positive().max(2_000, "Width looks unrealistic."),
  heightCm: z.number().positive().max(2_000, "Height looks unrealistic."),
  quantity: z.number().int().positive().max(10_000),
  declaredValue: z.number().nonnegative().optional(),
});

export type PackageSchemaInput = z.infer<typeof packageSchema>;

/** Convenience: validate + return a friendly error message or null. */
export function validatePackage(input: unknown): string | null {
  const parsed = packageSchema.safeParse(input);
  if (parsed.success) return null;
  return parsed.error.issues[0]?.message ?? "Invalid package details.";
}

/* ---------------------------------------------------------------------------
 * Additional services (brief Section 4, Step 3)
 * Toggleable, each optional, each with an "on request" default.
 * ------------------------------------------------------------------------- */

export const additionalServices = [
  { id: "supplier-pickup", label: "Supplier pickup", default: false },
  { id: "consolidation", label: "Consolidation", default: false },
  { id: "customs-assistance", label: "Customs assistance", default: false },
  { id: "door-delivery", label: "Door delivery", default: false },
  { id: "insurance-enquiry", label: "Insurance enquiry", default: false },
] as const;

export type AdditionalServiceId = typeof additionalServices[number]["id"];

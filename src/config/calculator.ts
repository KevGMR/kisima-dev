/**
 * src/config/calculator.ts
 * ===========================================================================
 * Shipping calculator configuration and pure calculation logic.
 *
 * Supports two directions:
 *   - import: origin country → Kenya
 *   - export: Kenya → destination country
 *
 * ⚠️  CRITICAL — READ BEFORE EDITING RATES  ⚠️
 * ---------------------------------------------------------------------------
 * All rates, divisors, handling fees and transit windows below are
 * PLACEHOLDER VALUES. They are NOT verified operational data.
 *
 * The Change Brief (both revisions) says:
 *   - Do not migrate unverified prices, departure days or transit times.
 *   - Store route rates in an admin-editable database.
 *
 * Therefore:
 *   1. Treat every value marked `// TODO: VERIFY` as non-production.
 *   2. Before launch, replace this file with data fetched from an admin DB,
 *      or update values here with Operations-approved figures.
 *   3. Every route defaults to `active: false`. Nothing shows in the
 *      calculator until Operations flips a route to `active: true`.
 * ===========================================================================
 */

import { z } from "zod";

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export type ShippingMode = "air" | "sea";
export type Direction = "import" | "export";

export interface RouteRate {
  id: string;
  /** Which direction this route serves. */
  direction: Direction;
  /** Import: origin country slug. Export: destination country slug. */
  counterpartSlug: string;
  /** Display label, e.g. "China → Kenya" or "Kenya → UK". */
  label: string;
  mode: ShippingMode;
  currency: string;
  rate: number;
  rateRestricted?: number;
  minimumCharge: number;
  handlingFee: number;
  volumetricDivisor: number;
  transit: { minDays: number; maxDays: number; display: string };
  effectiveFrom: string;
  effectiveTo: string;
  active: boolean;
}

/* ---------------------------------------------------------------------------
 * Route rate table
 * ------------------------------------------------------------------------- */

export const routeRates: Record<string, RouteRate> = {
  /* ===== IMPORTS INTO KENYA ===== */

  "import-china-air": {
    id: "import-china-air",
    direction: "import",
    counterpartSlug: "china",
    label: "China → Kenya (Air)",
    mode: "air",
    currency: "EUR",
    rate: 10.5,
    rateRestricted: 13,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 7, maxDays: 10, display: "7–10 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-china-sea": {
    id: "import-china-sea",
    direction: "import",
    counterpartSlug: "china",
    label: "China → Kenya (Sea)",
    mode: "sea",
    currency: "KES",
    rate: 60000,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 0,
    transit: { minDays: 45, maxDays: 45, display: "45 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-uk-air": {
    id: "import-uk-air",
    direction: "import",
    counterpartSlug: "uk",
    label: "UK → Kenya (Air)",
    mode: "air",
    currency: "EUR",
    rate: 6.5,
    minimumCharge: 0,
    handlingFee: 25,
    volumetricDivisor: 5000,
    transit: { minDays: 3, maxDays: 4, display: "3–4 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-uk-sea": {
    id: "import-uk-sea",
    direction: "import",
    counterpartSlug: "uk",
    label: "UK → Kenya (Sea)",
    mode: "sea",
    currency: "EUR",
    rate: 2.5,
    minimumCharge: 0,
    handlingFee: 15,
    volumetricDivisor: 0,
    transit: { minDays: 30, maxDays: 45, display: "30–45 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-usa-air": {
    id: "import-usa-air",
    direction: "import",
    counterpartSlug: "usa",
    label: "USA → Kenya (Air)",
    mode: "air",
    currency: "EUR",
    rate: 15,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 7, maxDays: 7, display: "7 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-uae-air": {
    id: "import-uae-air",
    direction: "import",
    counterpartSlug: "uae",
    label: "UAE → Kenya (Air)",
    mode: "air",
    currency: "EUR",
    rate: 9,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 4, maxDays: 5, display: "4–5 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-uae-sea": {
    id: "import-uae-sea",
    direction: "import",
    counterpartSlug: "uae",
    label: "UAE → Kenya (Sea)",
    mode: "sea",
    currency: "KES",
    rate: 62000,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 0,
    transit: { minDays: 40, maxDays: 40, display: "40 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "import-south-africa-air": {
    id: "import-south-africa-air",
    direction: "import",
    counterpartSlug: "south-africa",
    label: "South Africa → Kenya (Air)",
    mode: "air",
    currency: "EUR",
    rate: 8,
    minimumCharge: 0,
    handlingFee: 25,
    volumetricDivisor: 5000,
    transit: { minDays: 3, maxDays: 4, display: "3–4 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },

  /* ===== EXPORTS FROM KENYA ===== */

  "export-uk-air": {
    id: "export-uk-air",
    direction: "export",
    counterpartSlug: "uk",
    label: "Kenya → UK (Air)",
    mode: "air",
    currency: "EUR",
    rate: 6.5,
    minimumCharge: 0,
    handlingFee: 25,
    volumetricDivisor: 5000,
    transit: { minDays: 3, maxDays: 5, display: "3–5 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "export-uk-sea": {
    id: "export-uk-sea",
    direction: "export",
    counterpartSlug: "uk",
    label: "Kenya → UK (Sea)",
    mode: "sea",
    currency: "EUR",
    rate: 2.5,
    minimumCharge: 0,
    handlingFee: 15,
    volumetricDivisor: 0,
    transit: { minDays: 30, maxDays: 45, display: "30–45 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "export-usa-air": {
    id: "export-usa-air",
    direction: "export",
    counterpartSlug: "usa",
    label: "Kenya → USA (Air)",
    mode: "air",
    currency: "EUR",
    rate: 15,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 5, maxDays: 8, display: "5–8 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "export-uae-air": {
    id: "export-uae-air",
    direction: "export",
    counterpartSlug: "uae",
    label: "Kenya → UAE (Air)",
    mode: "air",
    currency: "EUR",
    rate: 9,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 3, maxDays: 5, display: "3–5 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "export-europe-air": {
    id: "export-europe-air",
    direction: "export",
    counterpartSlug: "europe",
    label: "Kenya → Europe (Air)",
    mode: "air",
    currency: "EUR",
    rate: 11,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 4, maxDays: 7, display: "4–7 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "export-europe-sea": {
    id: "export-europe-sea",
    direction: "export",
    counterpartSlug: "europe",
    label: "Kenya → Europe (Sea)",
    mode: "sea",
    currency: "EUR",
    rate: 3,
    minimumCharge: 0,
    handlingFee: 15,
    volumetricDivisor: 0,
    transit: { minDays: 28, maxDays: 42, display: "28–42 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
  "export-africa-air": {
    id: "export-africa-air",
    direction: "export",
    counterpartSlug: "africa",
    label: "Kenya → Africa (Air)",
    mode: "air",
    currency: "EUR",
    rate: 5.5,
    minimumCharge: 0,
    handlingFee: 0,
    volumetricDivisor: 5000,
    transit: { minDays: 2, maxDays: 5, display: "2–5 working days" },
    effectiveFrom: "",
    effectiveTo: "",
    active: false,
  },
};

/** All active routes (either direction). */
export function activeRouteRates(): RouteRate[] {
  return Object.values(routeRates).filter((r) => r.active);
}

/** Active routes filtered by direction. */
export function activeRoutesByDirection(direction: Direction): RouteRate[] {
  return Object.values(routeRates).filter((r) => r.active && r.direction === direction);
}

/** Lookup helper — returns undefined if inactive, unknown, or wrong direction. */
export function getRouteRate(id: string): RouteRate | undefined {
  const r = routeRates[id];
  return r && r.active ? r : undefined;
}

/* ---------------------------------------------------------------------------
 * Calculation helpers (unchanged)
 * ------------------------------------------------------------------------- */

export interface PackageInput {
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  quantity: number;
  declaredValue?: number;
}

export interface ChargeableBreakdown {
  actualWeightKg: number;
  volumetricWeightKg: number;
  chargeableWeightKg: number;
  cbm: number;
}

export function calcAirChargeable(pkg: PackageInput, divisor: number): ChargeableBreakdown {
  if (divisor <= 0) throw new Error("Air freight requires a positive volumetric divisor.");
  const actualWeightKg = pkg.weightKg * pkg.quantity;
  const volumetricWeightKg = (pkg.lengthCm * pkg.widthCm * pkg.heightCm * pkg.quantity) / divisor;
  const chargeableWeightKg = Math.max(actualWeightKg, volumetricWeightKg);
  const cbm = (pkg.lengthCm * pkg.widthCm * pkg.heightCm * pkg.quantity) / 1_000_000;
  return { actualWeightKg, volumetricWeightKg, chargeableWeightKg, cbm };
}

export function calcSeaCBM(pkg: PackageInput): ChargeableBreakdown {
  const cbm = (pkg.lengthCm / 100) * (pkg.widthCm / 100) * (pkg.heightCm / 100) * pkg.quantity;
  return {
    actualWeightKg: pkg.weightKg * pkg.quantity,
    volumetricWeightKg: 0,
    chargeableWeightKg: pkg.weightKg * pkg.quantity,
    cbm,
  };
}

export interface EstimateResult {
  routeId: string;
  direction: Direction;
  mode: ShippingMode;
  currency: string;
  chargeableBasis: "kg" | "CBM";
  chargeableQty: number;
  freight: number;
  handling: number;
  minimumApplied: boolean;
  total: number;
  transitDisplay: string;
  reference: string;
  disclaimer: string;
}

export function calcEstimate(rate: RouteRate, pkg: PackageInput): EstimateResult {
  const breakdown = rate.mode === "air"
    ? calcAirChargeable(pkg, rate.volumetricDivisor)
    : calcSeaCBM(pkg);
  const chargeableQty = rate.mode === "air" ? breakdown.chargeableWeightKg : breakdown.cbm;
  return estimateFromQty(rate, chargeableQty);
}

export function estimateFromQty(rate: RouteRate, chargeableQty: number): EstimateResult {
  const rawFreight = chargeableQty * rate.rate;
  const minimumApplied = rate.minimumCharge > 0 && rawFreight < rate.minimumCharge;
  const freight = minimumApplied ? rate.minimumCharge : rawFreight;
  const handling = rate.handlingFee;
  const total = freight + handling;

  return {
    routeId: rate.id,
    direction: rate.direction,
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

export function generateReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KC-${stamp}-${rand}`;
}

/* ---------------------------------------------------------------------------
 * Validation (unchanged)
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

export function validatePackage(input: unknown): string | null {
  const parsed = packageSchema.safeParse(input);
  if (parsed.success) return null;
  return parsed.error.issues[0]?.message ?? "Invalid package details.";
}

/* ---------------------------------------------------------------------------
 * Additional services (unchanged)
 * ------------------------------------------------------------------------- */

export const additionalServices = [
  { id: "supplier-pickup", label: "Supplier pickup", default: false },
  { id: "consolidation", label: "Consolidation", default: false },
  { id: "customs-assistance", label: "Customs assistance", default: false },
  { id: "door-delivery", label: "Door delivery", default: false },
  { id: "insurance-enquiry", label: "Insurance enquiry", default: false },
] as const;

export type AdditionalServiceId = typeof additionalServices[number]["id"];

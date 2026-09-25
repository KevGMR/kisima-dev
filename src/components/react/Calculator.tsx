/**
 * src/components/react/Calculator.tsx
 * ===========================================================================
 * Shipping calculator — React island.
 *
 * Mounted on /tools/shipping-calculator. Uses calculator.ts for all rates,
 * divisors, minimum charges and calculation logic. No hardcoded values.
 *
 * Fixes the three bugs in the legacy Calculator.tsx (see docs/page-audit.md):
 *   1. lane.handling was displayed but ignored in the math → now uses rate.handlingFee.
 *   2. Hardcoded customs fee (75) was invented and route-agnostic → removed.
 *   3. The air/sea radio was orphaned state → mode is derived from the route.
 *
 * Respects the lead-capture rule (Brief Section 4): no phone number required
 * before showing an estimate.
 * ===========================================================================
 */

import { useMemo, useState } from "react";
import {
  activeRouteRates,
  calcEstimate,
  estimateFromQty,
  validatePackage,
  additionalServices,
  type RouteRate,
  type ShippingMode,
  type EstimateResult,
  type AdditionalServiceId,
} from "@/config/calculator";
import { whatsappLink } from "@/config/site";
import { trackEvent, storeCalculatorRef } from "@/lib/analytics";

interface PackageEntry {
  id: string;
  originSlug: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Label helpers
// ---------------------------------------------------------------------------
const modeLabel: Record<ShippingMode, string> = {
  air: "Air Freight",
  sea: "Sea Freight",
};

export default function Calculator() {
  const routes = useMemo(() => activeRouteRates(), []);

  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    routes[0]?.id ?? ""
  );
  const [packages, setPackages] = useState<PackageEntry[]>([]);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Set<AdditionalServiceId>>(new Set());

  // Current route (if any)
  const route: RouteRate | undefined = useMemo(
    () => routes.find((r) => r.id === selectedRouteId),
    [routes, selectedRouteId]
  );

  // ---------------------------------------------------------------------------
  // If no routes are active, we can't calculate — show an honest message.
  // ---------------------------------------------------------------------------
  if (routes.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background p-6 md:p-8">
        <h2 className="text-xl font-heading font-semibold mb-3">
          Rates currently under review
        </h2>
        <p className="text-muted-foreground mb-4">
          Our shipping rates are being updated. Please request a quote or contact
          us on WhatsApp for a confirmed price.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/request-quote"
            className="inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent-hover px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            Request a quote
          </a>
          <a
            href={whatsappLink("Hello Kisima Cargo. I would like a shipping quote.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  function handleAddPackage(form: HTMLFormElement) {
    setError(null);
    const data = new FormData(form);
    const parsed = {
      weightKg: Number(data.get("weightKg") ?? 0),
      lengthCm: Number(data.get("lengthCm") ?? 0),
      widthCm: Number(data.get("widthCm") ?? 0),
      heightCm: Number(data.get("heightCm") ?? 0),
      quantity: Number(data.get("quantity") ?? 1),
    };

    const validationError = validatePackage(parsed);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!route) {
      setError("Please select an origin and method first.");
      return;
    }

    setPackages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), originSlug: route.originSlug, ...parsed },
    ]);
    form.reset();

    if (packages.length === 0) {
      trackEvent("calculator_start", { route: route.id });
    }
  }

  function handleRemovePackage(id: string) {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    setEstimate(null);
  }

  function handleCalculate() {
    setError(null);
    if (!route) {
      setError("Please select an origin and method first.");
      return;
    }
    if (packages.length === 0) {
      setError("Add at least one package first.");
      return;
    }

    // Sum chargeable qty across all packages for the selected route's mode.
    let totalChargeable = 0;
    for (const pkg of packages) {
      const single = calcEstimate(route, {
        weightKg: pkg.weightKg,
        lengthCm: pkg.lengthCm,
        widthCm: pkg.widthCm,
        heightCm: pkg.heightCm,
        quantity: pkg.quantity,
      });
      totalChargeable += single.chargeableQty;
    }

    // Price once, applying minimum charge once.
    const result = estimateFromQty(route, totalChargeable);
    setEstimate(result);
    storeCalculatorRef(result.reference);

    trackEvent("calculator_complete", {
      route: route.id,
      mode: route.mode,
      chargeable_qty: Number(result.chargeableQty.toFixed(2)),
      total: Number(result.total.toFixed(2)),
      currency: result.currency,
    });
  }

  function toggleService(id: AdditionalServiceId) {
    setServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="rounded-xl border border-border bg-background p-6 md:p-8 space-y-8">

      {/* ---------------- Step 1: Route ---------------- */}
      <section>
        <h2 className="text-lg font-heading font-semibold mb-3">
          Step 1 · Choose route
        </h2>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">
            Shipping from
          </span>
          <select
            value={selectedRouteId}
            onChange={(e) => {
              setSelectedRouteId(e.target.value);
              setEstimate(null);
            }}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
          >
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} · {modeLabel[r.mode]}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          Destination: Kenya
        </p>
      </section>

      {/* ---------------- Step 2: Cargo ---------------- */}
      <section>
        <h2 className="text-lg font-heading font-semibold mb-3">
          Step 2 · Add cargo
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPackage(e.currentTarget);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <label className="block">
            <span className="text-xs font-medium mb-1 block">Weight (kg)</span>
            <input
              name="weightKg"
              type="number"
              min="0.1"
              step="0.1"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium mb-1 block">Length (cm)</span>
            <input
              name="lengthCm"
              type="number"
              min="1"
              step="0.1"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium mb-1 block">Width (cm)</span>
            <input
              name="widthCm"
              type="number"
              min="1"
              step="0.1"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium mb-1 block">Height (cm)</span>
            <input
              name="heightCm"
              type="number"
              min="1"
              step="0.1"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium mb-1 block">Quantity</span>
            <input
              name="quantity"
              type="number"
              min="1"
              step="1"
              defaultValue={1}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 text-sm font-semibold transition-colors"
            >
              Add package
            </button>
          </div>
        </form>

        {packages.length > 0 && (
          <ul className="mt-4 space-y-2">
            {packages.map((pkg, i) => (
              <li
                key={pkg.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/30 px-4 py-2.5 text-sm"
              >
                <span>
                  <strong>Package {i + 1}:</strong>{" "}
                  {pkg.weightKg}kg · {pkg.lengthCm}×{pkg.widthCm}×{pkg.heightCm}cm · ×{pkg.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePackage(pkg.id)}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------------- Step 3: Additional services ---------------- */}
      <section>
        <h2 className="text-lg font-heading font-semibold mb-3">
          Step 3 · Additional services
        </h2>
        <div className="flex flex-wrap gap-2">
          {additionalServices.map((s) => {
            const active = services.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleService(s.id)}
                className={
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
                  (active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent")
                }
                aria-pressed={active}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Additional services are quoted separately.
        </p>
      </section>

      {/* ---------------- Error ---------------- */}
      {error && (
        <div
          className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* ---------------- Step 4: Calculate ---------------- */}
      <section>
        <button
          type="button"
          onClick={handleCalculate}
          className="w-full rounded-md bg-accent text-accent-foreground hover:bg-accent-hover px-6 py-3 text-base font-semibold transition-colors"
        >
          Calculate estimate
        </button>
      </section>

      {/* ---------------- Step 5: Result + conversion ---------------- */}
      {estimate && (
        <section className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Estimated cost
            </p>
            <p className="text-3xl font-heading font-bold">
              {formatMoney(estimate.total, estimate.currency)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {estimate.chargeableQty.toFixed(2)} {estimate.chargeableBasis}
              {" · "}
              {estimate.transitDisplay}
            </p>
            {estimate.minimumApplied && (
              <p className="text-xs text-muted-foreground mt-1">
                Minimum charge applied.
              </p>
            )}
          </div>

          <div className="text-xs text-muted-foreground border-t border-border pt-3">
            <p>{estimate.disclaimer}</p>
            <p className="mt-2">
              Reference: <code className="font-mono">{estimate.reference}</code>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(
                `Hello Kisima Cargo. My estimate reference is ${estimate.reference}. I would like a confirmed quotation.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "calculator" })}
              className="flex-1 inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent-hover px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Request confirmed quote on WhatsApp
            </a>
            <a
              href="/request-quote"
              onClick={() => trackEvent("quote_request", { source: "calculator" })}
              className="flex-1 inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Use the quote form
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Money formatting
 * ------------------------------------------------------------------------- */
function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

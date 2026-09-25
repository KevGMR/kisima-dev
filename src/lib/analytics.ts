/**
 * src/lib/analytics.ts
 * ===========================================================================
 * Analytics event dispatch.
 *
 * Brief Section 11 defines 9 conversion events:
 *   calculator_start, calculator_complete, quote_request, whatsapp_click,
 *   phone_click, track_shipment, route_view, help_article_view, contact_submit.
 *
 * This module:
 *   - Fires events to GA4 (via window.gtag) when available.
 *   - No-ops safely during SSR and when GA4 isn't loaded.
 *   - Preserves UTM params and calculator reference across the session.
 * ===========================================================================
 */

export type AnalyticsEvent =
  | "calculator_start"
  | "calculator_complete"
  | "quote_request"
  | "whatsapp_click"
  | "phone_click"
  | "track_shipment"
  | "route_view"
  | "help_article_view"
  | "contact_submit";

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire an analytics event. Safe to call during SSR. */
export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  // Standard GA4 event push.
  if (typeof window.gtag === "function") {
    window.gtag("event", event, {
      ...payload,
      ...getAttribution(),
    });
    return;
  }

  // Fallback to dataLayer for tag managers.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload, ...getAttribution() });
  }
}

/**
 * Read UTM params from the current URL.
 * Brief Section 11: "Preserve UTM source, medium and campaign through form
 * submissions."
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  return utm;
}

/** Landing page + referrer, captured for lead attribution. */
export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};

  // Persist attribution in sessionStorage so it survives navigation.
  const KEY = "kisima_attribution";
  let stored = sessionStorage.getItem(KEY);

  if (!stored) {
    const initial = {
      landing_page: window.location.pathname,
      referrer: document.referrer || "direct",
      ...getUtmParams(),
    };
    sessionStorage.setItem(KEY, JSON.stringify(initial));
    stored = JSON.stringify(initial);
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

/** Store a calculator reference for the WhatsApp handoff. */
export function storeCalculatorRef(ref: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("kisima_calc_ref", ref);
}

/** Retrieve the stored calculator reference, if any. */
export function getCalculatorRef(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("kisima_calc_ref");
}

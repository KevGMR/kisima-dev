// astro.config.mjs
// ===========================================================================
// Kisima Cargo — Astro configuration
//
// Mode:      static (pre-rendered HTML, no server runtime)
// Integrations:
//   - @astrojs/react   -> reuse existing React components (shadcn/ui, Calculator)
//   - @astrojs/sitemap -> auto-generate sitemap.xml from routes
//   - @astrojs/tailwind -> keep existing Tailwind config
//
// Change Brief refs: Sections 2, 5, 6 (crawlability, architecture, SEO)
//
// Note: The production domain is fixed at https://kismacargo.com so canonical
// URLs and sitemap entries never reference the Netlify staging domain.
// ===========================================================================

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // -------------------------------------------------------------------------
  // Site identity — production canonical
  // -------------------------------------------------------------------------
  site: "https://kismacargo.com",

  // -------------------------------------------------------------------------
  // Output mode
  //
  // "static"   -> every page is pre-rendered to HTML at build time.
  // "hybrid"   -> static by default, opt-in SSR per route.
  //
  // We use "static" because:
  //   - All 40 public pages are pre-renderable.
  //   - The calculator runs entirely in the browser.
  //   - No server runtime is required on Netlify.
  // -------------------------------------------------------------------------
  output: "static",

  // -------------------------------------------------------------------------
  // Trailing slash policy
  //
  // "never" -> URLs are /air-freight, not /air-freight/
  // Matches routes.ts (TRAILING_SLASH = false) and netlify.toml redirects.
  // -------------------------------------------------------------------------
  trailingSlash: "never",

  // -------------------------------------------------------------------------
  // Build output
  // -------------------------------------------------------------------------
  build: {
    // Directory for the final static site. Netlify publishes this.
    // Keep "dist" to match scripts/set-headers.mjs and netlify.toml.
    outDir: "./dist",
    // Emit /404.html for Netlify's automatic 404 handling.
    // (Astro always emits 404.astro output at /404.html.)
    format: "directory",
  },

  // -------------------------------------------------------------------------
  // Integrations
  // -------------------------------------------------------------------------
  integrations: [
    // React integration — used for calculator, quote form, and any other
    // interactive islands. Static components should be written as .astro.
    react({
      // React 18 StrictMode compatible. Astro handles hydration per island.
      experimentalReactChildren: false,
    }),

    // Sitemap — auto-generates /sitemap.xml from all statically rendered pages.
    //
    // NOTE: We also maintain public/sitemap.xml manually as a fallback.
    // When this integration is active, the generated sitemap overwrites it.
    // Once verified, public/sitemap.xml can be deleted.
    sitemap({
      // Force every URL to the production domain.
      // Prevents staging domain URLs from leaking into the sitemap.
      // Exclude pages that shouldn't be indexed.
      // Add paths here as they arise (e.g. thank-you pages).
      filter: (page) => {
        const EXCLUDED = [
          "/404",
          "/thank-you",
          "/request-quote/sent",
        ];
        return !EXCLUDED.some((path) => page.includes(path));
      },
      // Optional changefreq + priority per route pattern.
      // (Google ignores these; other crawlers sometimes use them.)
      serialize(item) {
        if (item.url === "https://kismacargo.com/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (item.url.includes("/routes/")) {
          item.priority = 0.9;
          item.changefreq = "monthly";
        } else if (item.url.includes("/tools/")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (item.url.includes("/help/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else if (item.url.includes("/business/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else if (item.url.includes("/locations/")) {
          item.priority = 0.5;
          item.changefreq = "yearly";
        }
        return item;
      },
    }),

    // Tailwind — keeps existing tailwind.config.ts.
    // The `applyBaseStyles` option injects Tailwind's base layer.
    tailwind({
      applyBaseStyles: false, // handled explicitly in global.css
    }),
  ],

  // -------------------------------------------------------------------------
  // Path aliases — must mirror tsconfig paths.
  // Keep `@/*` -> src/* so existing imports (@/components/ui/button,
  // @/config/site) continue to work unchanged.
  // -------------------------------------------------------------------------
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // Preserve the asset handling from the old Vite config.
    // Astro uses Vite under the hood, so this is the same pipeline.
    build: {
      // Match previous output for the set-headers script.
      assetsDir: "assets",
      // Keep inline asset limit low so images are real files.
      assetsInlineLimit: 4096,
    },
  },

  // -------------------------------------------------------------------------
  // Prefetch — Astro auto-prefetches links on hover for faster navigation.
  // Cheap, no JS cost, and helps perceived speed. Enable on all viewports.
  // -------------------------------------------------------------------------
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  // -------------------------------------------------------------------------
  // Image optimisation — Astro's built-in <Image> component
  // uses sharp to produce WebP/AVIF at build time.
  // -------------------------------------------------------------------------
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});

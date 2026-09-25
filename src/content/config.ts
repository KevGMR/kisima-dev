/**
 * src/content/config.ts
 * ===========================================================================
 * Astro Content Collections schema (Astro 5 Content Layer API).
 *
 * Defines two collections:
 *   routes   -> one entry per origin-to-Kenya route page
 *   business -> one entry per business category page
 *
 * Adding a new entry = adding one markdown file. No page changes needed.
 *
 * Brief refs: Section 5 (architecture), Section 8 (route page template).
 * ===========================================================================
 */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* ---------------------------------------------------------------------------
 * routes
 * ------------------------------------------------------------------------- */
const routes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/routes" }),
  schema: z.object({

    /** Display label, e.g. "China". */
    origin: z.string(),

    /** Short lede — the H1-adjacent 2-3 sentence direct answer. */
    lede: z.string(),

    /** Ordered list of common cargo types for this origin. */
    commonCargo: z.array(z.string()),

    /** Ordered list of documents customers typically need. */
    documents: z.array(z.string()),

    /** Practical route-specific notes (consolidation hubs, warehouses, etc.). */
    routeNotes: z.array(z.string()),

    /** Short FAQ items specific to this origin. */
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),

    /** Optional "last reviewed" date (ISO YYYY-MM-DD). */
    lastReviewed: z.string().optional(),

    /** Sort order in listings. Lower = earlier. */
    order: z.number().default(99),
  }),
});

/* ---------------------------------------------------------------------------
 * business
 * ------------------------------------------------------------------------- */
const business = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/business" }),
  schema: z.object({

    /** Display label, e.g. "Clothing". */
    label: z.string(),

    /** Short lede — the H1-adjacent 2-3 sentence direct answer. */
    lede: z.string(),

    /** Common cargo examples for this category. */
    examples: z.array(z.string()),

    /** Practical considerations for importers of this category. */
    considerations: z.array(z.string()),

    /** FAQ items specific to this category. */
    faqs: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    ),

    /** Optional "last reviewed" date (ISO YYYY-MM-DD). */
    lastReviewed: z.string().optional(),

    /** Sort order in listings. Lower = earlier. */
    order: z.number().default(99),
  }),
});


/* ---------------------------------------------------------------------------
 * help
 * ------------------------------------------------------------------------- */
const help = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/help" }),
  schema: z.object({
    /** Category shown on the Help Centre landing page. */
    category: z.string(),

    /** Display label for the article. */
    label: z.string(),

    /** Short title used as page <title>. */
    title: z.string(),

    /** Meta description. */
    description: z.string(),

    /** Ordered list of Q&A blocks rendered as H2/H3 on the page. */
    sections: z.array(
      z.object({
        question: z.string(),
        /** Direct answer — 1-2 sentences. */
        answer: z.string(),
        /** Optional longer explanation. */
        explanation: z.string().optional(),
        /** Optional bullet points or examples. */
        bullets: z.array(z.string()).optional(),
      })
    ),

    /** Optional "last reviewed" date (ISO YYYY-MM-DD). */
    lastReviewed: z.string().optional(),

    /** Optional reviewer name (for regulatory articles). */
    reviewer: z.string().optional(),

    /** Optional primary sources cited (KRA, KEBS, etc.). */
    sources: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ).optional(),

    /** Sort order within a category. Lower = earlier. */
    order: z.number().default(99),
  }),
});

export const collections = { routes, business, help };

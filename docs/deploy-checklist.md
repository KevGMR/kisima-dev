# Kisima Cargo — Deploy Checklist
# ===========================================================================
# Follow this in order before any public exposure of the new build.
#
# Change Brief refs:
#   Rev 1: Sections 2 (staging indexation), 6 (technical SEO), 13 (pre-launch QA)
#   Rev 2: Sections 13 (technical), 20 (launch acceptance)
# ===========================================================================

## 0. Pre-flight (local)

- [ ] `npm run build` completes without errors
- [ ] `npm run check` returns 0 errors
- [ ] `find dist -name "*.html" | wc -l` returns 61
- [ ] Internal link audit returns empty (script below)

### Local link audit script

    for f in $(find dist -name "*.html"); do
      while read -r path; do
        case "$path" in
          http*|mailto:*|tel:*|"#"*|"") continue ;;
        esac
        target="${path#/}"
        target="${target%/}"
        if [ ! -f "dist/${target}/index.html" ] \
          && [ ! -f "dist/${target}.html" ] \
          && [ ! -f "dist/${target}" ]; then
          echo "MISSING: $path"
        fi
      done < <(grep -o 'href="/[^"#?]*"' "$f" 2>/dev/null | sed 's/href="//;s/"$//')
    done | sort -u

**Expected:** no output.

---

## 1. Commit and push

    git status
    git add -A
    git commit -m "Rev 2: global import/export positioning, bidirectional calculator, shipping centre, new logo"
    git push origin main

Netlify build triggers automatically. It runs `npm run build` (astro build), then `postbuild` runs `scripts/set-headers.mjs`, then the site publishes to `kisimadevs.netlify.app`.

---

## 2. Configure Netlify environment variables

**Critical step that has not yet been done.**

Netlify dashboard -> your site (`kisimadevs`) -> Site configuration -> Environment variables

Add one variable with per-context scopes:

| Key | Production | Deploy previews | Branch deploys |
|---|---|---|---|
| `VITE_SITE_ENV` | `production` | `staging` | `staging` |

Also add (all contexts):

| Key | Value |
|---|---|
| `VITE_SITE_URL` | `https://kismacargo.com` |
| `VITE_WHATSAPP` | `254795554137` |

**Trigger a redeploy** — env vars only apply to new builds.

---

## 3. Verify staging noindex

    curl -sI https://kisimadevs.netlify.app/ | grep -i x-robots-tag
    # Expected: x-robots-tag: noindex, nofollow

    curl -s https://kisimadevs.netlify.app/ | grep -i 'name="robots"'
    # Expected: <meta name="robots" content="noindex, nofollow">

**Both must be present** before public exposure. If either is missing, the staging domain is indexable and could compete with production.

**If missing:**
- Confirm `VITE_SITE_ENV=staging` is set on the deploying branch
- Check the Netlify build log for `[set-headers] Wrote dist/_headers (VITE_SITE_ENV=staging, noindex=true)`
- Redeploy

---

## 4. Verify real 404s

    curl -sI https://kisimadevs.netlify.app/nonexistent-page | head -1
    # Expected: HTTP/2 404

    curl -s https://kisimadevs.netlify.app/nonexistent-page | grep -o "We couldn't find that page"
    # Expected: We couldn't find that page

**If it returns 200:** the SPA fallback in `netlify.toml` is still present. Remove it and redeploy.

---

## 5. Verify sitemap and robots.txt

    curl -s https://kisimadevs.netlify.app/robots.txt
    # Expected: Sitemap: https://kismacargo.com/sitemap-index.xml

    curl -sI https://kisimadevs.netlify.app/sitemap-index.xml | head -1
    # Expected: HTTP/2 200

On staging, `robots.txt` intentionally points at the production sitemap URL, not the staging one. This is correct.

---

## 6. Verify forms work

1. Visit https://kisimadevs.netlify.app/contact
2. Fill in the form and submit
3. Confirm redirect to `/thank-you`
4. Netlify -> Site -> Forms -> contact should show the submission
5. Repeat for `/request-quote` (form name: `quote-request`)

**If forms don't appear in Netlify:** confirm `data-netlify="true"` is on the `<form>` tag. Netlify detects forms at build time, so redeploy after any form change.

**Configure recipients:** Netlify -> Site -> Forms -> Settings -> Form notifications.

---

## 7. Verify key pages resolve

Spot-check these URLs on staging:

- `/` — homepage
- `/import` — import landing
- `/export` — export landing
- `/routes/shipping-from-china-to-kenya`
- `/routes/exporting-from-kenya-to-uk`
- `/shipping-centre`
- `/locations`
- `/tools/shipping-calculator`

Each should return 200 and render.

---

## 8. Verify the calculator

The calculator renders two directions:

- **Import to Kenya** — shows "rates under review" (correct; all rates are `active: false`)
- **Export from Kenya** — shows "rates under review" (correct)

If any route shows an actual price, a route was incorrectly set to active. Fix immediately — no unverified rates in production.

---

## 9. Verify mobile action bar

On a phone or narrow browser:

- Calculate / Track / WhatsApp bar sticks to bottom
- Tapping WhatsApp opens WhatsApp with the correct message
- Bar does not cover the last line of content (spacer present)

---

## 10. Verify the new logo everywhere

- Header shows `/images/logo-transparent.png`
- Footer shows `/images/logo-transparent.png`
- No broken image icons anywhere
- Favicon (`/favicon.ico` or `/favicon.svg`) loads

---

## 11. Do NOT do these yet

- Do NOT point `kismacargo.com` DNS at this build
- Do NOT submit the sitemap to Google Search Console
- Do NOT remove the staging noindex
- Do NOT activate calculator routes

All four require:
1. Operations-approved rates
2. Legal-reviewed Privacy/Terms
3. Marketing-provided testimonials and photography
4. Real 301 inventory from the old kisimacargo.com

Until those inputs exist, staging stays noindexed and production stays untouched.

---

## 12. What happens next (not this deploy)

Once inputs are ready:

1. **Rate verification** — Operations supplies rates, minimums, divisors, transit windows. Set `active: true` on approved routes in `calculator.ts`.
2. **Legal review** — replace Privacy Policy and Terms with approved text.
3. **Marketing inputs** — real photography, testimonials, GA4 property ID.
4. **301 inventory** — crawl old kisimacargo.com, add missing redirects to `netlify.toml`.
5. **Analytics wiring** — GA4 events, Search Console verification, Bing Webmaster.
6. **DNS cutover** — point `kismacargo.com` at this Netlify site.
7. **Remove staging noindex** — set `VITE_SITE_ENV=production` on the production branch.
8. **Submit sitemap** to Search Console.
9. **Monitor** — coverage report, Core Web Vitals, form submissions, calculator events.

---

## Emergency rollback

    git revert HEAD
    git push origin main

Or force back to a known good commit:

    git log --oneline | head -10
    git reset --hard <good-commit-hash>
    git push --force-with-lease origin main

Netlify keeps every previous deploy. From the Netlify dashboard:
- Deploys -> click a previous successful deploy -> Publish deploy

---

## Success criteria

The staging deploy is successful when:

- [ ] Build log shows no errors
- [ ] `curl -sI https://kisimadevs.netlify.app/ | grep -i x-robots-tag` returns `noindex`
- [ ] `curl -sI https://kisimadevs.netlify.app/nonexistent | head -1` returns `404`
- [ ] Both forms appear in Netlify Forms
- [ ] `/import`, `/export`, and 5 export route pages return 200
- [ ] Calculator shows direction toggle and "rates under review"
- [ ] New logo renders in header and footer
- [ ] Link audit is empty
- [ ] Mobile action bar visible and functional

Everything else is content, not code.

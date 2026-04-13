# Animated SVG Iceberg — Common Issues Page

**Date:** 2026-04-11
**Status:** Approved

## Summary

Add an animated SVG iceberg graphic to the common issues page hero section. The iceberg visualizes the gap between what founders see (beautiful UI) and what's actually broken underneath (security, reliability, ops). Also add 4 new issue cards to cover the gaps the iceberg exposes.

## Layout

- Two-column hero: existing text (h1 + subtitle + tag) on the left, iceberg SVG on the right
- Desktop: ~50/50 split
- Mobile (< 768px): iceberg stacks below the text, scaled down
- Iceberg container: ~400-500px wide, ~600-700px tall (75% underwater)

## SVG Structure

- Geometric/angular low-poly iceberg made of flat triangular facets
- Horizontal waterline divides above/below — subtle 1px border-color line
- **Above water (~25% height), 3 labels:**
  - Beautiful UI
  - Pretty dashboards
  - Demo with fake data
- **Below water (~75% height), 7 label rows going deeper:**
  - Environment variables
  - Auth redirects
  - CORS errors
  - Database migrations
  - Rate limits
  - Build failures
  - Production debugging

## Color (Monochrome Warm)

- Above-water facets: Surface 2 / Surface 3 tones, border-opacity edges between facets
- Below-water facets: Surface 1 / Surface 2 with slightly lower opacity (submerged feel)
- Waterline: `border` token
- Labels above water: `text-primary`
- Labels below water: `text-secondary`, deepest items `text-muted`
- No terracotta accent on iceberg — CTA button is the only accent

## Animation (GSAP + ScrollTrigger — Progressive Disclosure)

- **Phase 1 (0–350ms):** Iceberg tip (above-water) fades in with 24px upward translate
- **Phase 2 (350–550ms):** Waterline draws across (opacity reveal, left to right)
- **Phase 3 (550–1350ms):** Underwater portion reveals downward — iceberg "grows" beneath surface with staggered label fade-ins (80ms per row), deepest items last
- **Trigger:** ScrollTrigger fires once when hero enters viewport (top 85%)
- **Reduced motion:** All phases skip, everything visible immediately

## New Issue Cards (4 additions → 14 total)

1. **No CORS configuration** — Security, warning severity
   - Description: AI tools build frontends and APIs separately but rarely configure CORS headers. The first deploy to separate domains breaks every API call.
   - Fix: Configure CORS on your API to allow your frontend origin. Use a whitelist, not a wildcard.

2. **No rate limiting on public endpoints** — Security, warning severity
   - Description: AI-generated APIs accept unlimited requests. One bot or angry user can run up your database costs or take down your app with a simple loop.
   - Fix: Add rate limiting middleware to all public endpoints. Start with 60 requests per minute per IP.

3. **Auth redirect loops** — Reliability, warning severity
   - Description: AI tools often misconfigure auth middleware, creating infinite redirect loops between login and protected pages. The app appears completely broken.
   - Fix: Ensure auth middleware has proper redirect logic with a clear unauthenticated landing page that doesn't itself require auth.

4. **No production error monitoring** — Reliability, critical severity
   - Description: Without error tracking, you only learn about production bugs when users complain — or leave. AI tools never set up monitoring because they only work in development.
   - Fix: Add an error monitoring service (Sentry, LogRocket, or similar). Set up alerts for error rate spikes.

Update page title from "10 things" to "14 things". Update checklist count accordingly.

## Implementation Notes

- Inline SVG in JSX template (not external file)
- New `initIcebergAnimation()` function in `src/client/animations.ts`
- Uses existing `data-animate` attribute convention
- Responsive: stack below text on mobile
- Dark mode: CSS custom properties handle token swaps automatically

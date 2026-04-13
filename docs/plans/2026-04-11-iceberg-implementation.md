# Animated SVG Iceberg Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an animated low-poly SVG iceberg to the common issues page hero, plus 4 new issue cards covering gaps (CORS, rate limits, auth redirects, production monitoring).

**Architecture:** Inline SVG in the JSX template with GSAP ScrollTrigger progressive disclosure animation. The iceberg sits in a two-column hero layout alongside existing text. Animation uses `data-animate="iceberg"` attribute, handled by a new `initIcebergAnimation()` function in the existing animations module.

**Tech Stack:** JSX (server-rendered), GSAP + ScrollTrigger (already installed), Tailwind CSS

**Design doc:** `docs/plans/2026-04-11-iceberg-visual-design.md`
**Design system:** `DESIGN.md` — read before any visual decisions.

---

### Task 1: Add 4 new issue cards to the data array

**Files:**
- Modify: `src/server/templates/common-issues.tsx:27-108` (issueCards array)
- Modify: `src/server/templates/common-issues.tsx:110-121` (checklistItems array)
- Modify: `src/server/templates/common-issues.tsx:161-163` (hero h1 text)
- Modify: `src/server/templates/common-issues.tsx:293-296` (checklist counter)

**Step 1: Add 4 new issue card objects to the `issueCards` array**

Insert these after the existing 10 items in the array (before the closing `];`):

```tsx
  {
    category: "Security",
    severity: "warning",
    title: "No CORS configuration",
    description:
      "AI tools build frontends and APIs separately but rarely configure CORS headers. The first deploy to separate domains breaks every API call.",
    fix: "Configure CORS on your API to allow your frontend origin. Use a whitelist, not a wildcard.",
  },
  {
    category: "Security",
    severity: "warning",
    title: "No rate limiting on public endpoints",
    description:
      "AI-generated APIs accept unlimited requests. One bot or angry user can run up your database costs or take down your app with a simple loop.",
    fix: "Add rate limiting middleware to all public endpoints. Start with 60 requests per minute per IP.",
  },
  {
    category: "Reliability",
    severity: "warning",
    title: "Auth redirect loops",
    description:
      "AI tools often misconfigure auth middleware, creating infinite redirect loops between login and protected pages. The app appears completely broken.",
    fix: "Ensure auth middleware has proper redirect logic with a clear unauthenticated landing page that doesn't itself require auth.",
  },
  {
    category: "Reliability",
    severity: "critical",
    title: "No production error monitoring",
    description:
      "Without error tracking, you only learn about production bugs when users complain — or leave. AI tools never set up monitoring because they only work in development.",
    fix: "Add an error monitoring service (Sentry, LogRocket, or similar). Set up alerts for error rate spikes.",
  },
```

**Step 2: Add 4 new checklist items to `checklistItems` array**

Append before the closing `];`:

```tsx
  "CORS is configured to allow only your frontend origin, not wildcard",
  "Public API endpoints have rate limiting enabled",
  "Auth flows have been tested end-to-end with no redirect loops",
  "Production errors are tracked and alerting is configured",
```

**Step 3: Update the hero h1 text**

Change:
```tsx
10 things AI tools get wrong in your codebase
```
To:
```tsx
14 things AI tools get wrong in your codebase
```

**Step 4: Update the checklist counter**

In the `data-checklist-counter` paragraph, change `0 of 10` to `0 of 14`.

In the section heading "The 10 most common issues", change to "The 14 most common issues".

In the CTA section "This page covers the top 10 issues", change to "This page covers the top 14 issues".

**Step 5: Verify in browser**

Run: Browse to `http://localhost:3000/common-issues`
Expected: 14 issue cards render, checklist shows "0 of 14 checked", all text references say 14.

**Step 6: Commit**

```bash
git add src/server/templates/common-issues.tsx
git commit -m "feat: add 4 new issue cards — CORS, rate limits, auth redirects, production monitoring"
```

---

### Task 2: Convert hero to two-column layout

**Files:**
- Modify: `src/server/templates/common-issues.tsx:155-167` (hero section)

**Step 1: Restructure the hero `<header>` to a two-column flex layout**

Replace the current `<header>` block (lines 155-167) with:

```tsx
<header className="mb-20 flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
  <div className="flex-1 min-w-0">
    <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
      Free resource
    </span>
    <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4 max-w-[900px]">
      14 things AI tools get wrong in your codebase
    </h1>
    <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
      You built it fast. Here's what to check before it has to hold up.
    </p>
  </div>
  <div className="flex-shrink-0 mt-12 md:mt-0 flex justify-center" data-animate="iceberg">
    {/* Iceberg SVG will be added in Task 3 */}
    <div className="w-[340px] lg:w-[420px] h-[500px] lg:h-[600px]" />
  </div>
</header>
```

**Step 2: Verify in browser**

Run: Browse to `http://localhost:3000/common-issues`
Expected: Hero text sits on the left, empty placeholder space on the right. On mobile, the placeholder stacks below text.

**Step 3: Commit**

```bash
git add src/server/templates/common-issues.tsx
git commit -m "feat: convert common issues hero to two-column layout"
```

---

### Task 3: Create the inline SVG iceberg

**Files:**
- Modify: `src/server/templates/common-issues.tsx` (replace placeholder div in hero)

**Step 1: Replace the placeholder div with an inline SVG iceberg**

Replace the `{/* Iceberg SVG will be added in Task 3 */}` placeholder div with an SVG. The SVG should be:

- **ViewBox:** `0 0 400 600` — portrait orientation
- **Geometric/angular low-poly style:** The iceberg is made of triangular facets with straight edges
- **Waterline at y ~150** (25% from top) — a horizontal line spanning the full width
- **Above water (y 0–150):** A triangular peak made of 3-4 facets. Use fill colors from CSS custom properties: `var(--color-surface-3)` and `var(--color-surface-2)` for the facets with `var(--color-border)` stroke between facets
- **Below water (y 150–580):** A wider, deeper triangular mass made of 5-7 facets. Use `var(--color-surface-1)` and `var(--color-surface-2)` fills at ~80% opacity
- **Labels:** `<text>` elements positioned to the left or right of the iceberg body, connected by thin lines. Use `font-family: var(--font-mono)`, `font-size: 11px`, `text-transform: uppercase`, `letter-spacing: 0.06em`
- **Above-water labels (3):** "Beautiful UI", "Pretty dashboards", "Demo with fake data" — fill `var(--color-text-primary)`
- **Below-water labels (7):** "Environment variables", "Auth redirects", "CORS errors", "Database migrations", "Rate limits", "Build failures", "Production debugging" — fill `var(--color-text-secondary)` for top 4, `var(--color-text-muted)` for bottom 3

**Group structure for animation targeting:**
```
<svg data-iceberg>
  <g data-iceberg-tip>        <!-- above-water facets + labels -->
  <line data-iceberg-waterline> <!-- the waterline -->
  <g data-iceberg-depth>       <!-- below-water facets -->
  <g data-iceberg-labels>      <!-- below-water labels, each with data-iceberg-label -->
</svg>
```

**Important design notes:**
- Read `DESIGN.md` for exact color tokens and font families
- Use CSS custom properties (not hardcoded hex) so dark mode works automatically
- Labels should use `font-family: 'Commit Mono', monospace` at 11px, uppercase
- Keep facet edges subtle: stroke with `var(--color-border)` at 1px
- The SVG should have `className="w-full h-full"` and the container div should size it
- Add `aria-label="Iceberg diagram showing visible vs hidden software issues"` to the SVG
- Add `role="img"` to the SVG

**Step 2: Verify in browser**

Run: Browse to `http://localhost:3000/common-issues`
Expected: A geometric iceberg shape renders in the right column with all labels visible. The shape should use warm palette tones and feel consistent with the rest of the page.

**Step 3: Commit**

```bash
git add src/server/templates/common-issues.tsx
git commit -m "feat: add inline SVG iceberg to common issues hero"
```

---

### Task 4: Add GSAP progressive disclosure animation

**Files:**
- Modify: `src/client/animations.ts` (add new function)
- Modify: `src/client/main.ts` (import and call on common-issues page)

**Step 1: Add `initIcebergAnimation` function to `src/client/animations.ts`**

Add this exported function at the end of the file, before the closing:

```typescript
export function initIcebergAnimation(): void {
  const svg = document.querySelector<SVGElement>("[data-iceberg]");
  if (!svg) return;

  const tip = svg.querySelector("[data-iceberg-tip]");
  const waterline = svg.querySelector("[data-iceberg-waterline]");
  const depth = svg.querySelector("[data-iceberg-depth]");
  const labels = svg.querySelectorAll("[data-iceberg-label]");

  if (!tip || !waterline || !depth) return;

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Set initial states
  gsap.set(tip, { opacity: 0, y: 24 });
  gsap.set(waterline, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
  gsap.set(depth, { opacity: 0, y: -20, clipPath: "inset(0 0 100% 0)" });
  gsap.set(labels, { opacity: 0 });

  // Create timeline triggered by scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: svg,
      start: "top 85%",
      once: true,
    },
  });

  // Phase 1: Tip fades in (350ms)
  tl.to(tip, {
    opacity: 1,
    y: 0,
    duration: 0.35,
    ease: "power2.out",
  });

  // Phase 2: Waterline draws across (200ms)
  tl.to(waterline, {
    opacity: 1,
    scaleX: 1,
    duration: 0.2,
    ease: "power2.inOut",
  });

  // Phase 3: Underwater portion reveals (800ms total with stagger)
  tl.to(depth, {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    duration: 0.5,
    ease: "power2.out",
  });

  // Phase 3b: Labels stagger in
  tl.to(
    labels,
    {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.08,
    },
    "-=0.3",
  );
}
```

**Step 2: Import and call in `src/client/main.ts`**

Add to the import at line 1:
```typescript
import { initHoverParallax, initIcebergAnimation, initScrollAnimations } from "./animations";
```

Inside the existing `if (document.body.dataset.page === "common-issues")` block (line 40), add at the top of the block:

```typescript
  initIcebergAnimation();
```

**Step 3: Build client JS**

Run: `bun run build:js`
Expected: Build succeeds with no errors.

**Step 4: Verify in browser**

Run: Browse to `http://localhost:3000/common-issues`
Expected: The iceberg tip appears first, then the waterline draws across, then the underwater portion reveals with labels staggering in from top to bottom. Total animation ~1.5s. Scrolling down and back up does NOT replay the animation (fires once).

**Step 5: Test reduced motion**

In browser dev tools, enable "prefers-reduced-motion: reduce".
Expected: Iceberg is fully visible immediately with no animation.

**Step 6: Commit**

```bash
git add src/client/animations.ts src/client/main.ts
git commit -m "feat: add GSAP progressive disclosure animation for iceberg"
```

---

### Task 5: Responsive polish and QA

**Files:**
- Possibly modify: `src/server/templates/common-issues.tsx` (responsive tweaks)

**Step 1: Test desktop layout**

Run: Browse to `http://localhost:3000/common-issues` at 1440px width
Expected: Two-column hero, iceberg on right, labels readable, animation plays smoothly.

**Step 2: Test tablet layout**

Run: Browse at 768px width
Expected: Two columns still work but iceberg is smaller (340px container).

**Step 3: Test mobile layout**

Run: Browse at 375px width
Expected: Iceberg stacks below hero text. SVG scales down proportionally. Labels are still readable. If labels are too small at this size, consider hiding them on mobile and showing just the shape.

**Step 4: Test dark mode**

Toggle system to dark mode.
Expected: Iceberg facets use dark surface tokens, labels use dark text tokens. No hardcoded colors visible.

**Step 5: Fix any issues found**

Apply fixes as needed based on QA findings.

**Step 6: Commit**

```bash
git add -A
git commit -m "fix: responsive and dark mode polish for iceberg"
```

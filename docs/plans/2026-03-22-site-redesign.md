# Site Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace DaisyUI "sunset" theme with a custom editorial design system (Instrument Serif, warm gold, tonal dark mode) and restructure all 4 page layouts.

**Architecture:** Foundation-first approach. Build CSS custom properties + Tailwind theme extension first, then rebuild shared components (layout, nav, footer), then each page template. No DaisyUI — plain Tailwind utilities only.

**Tech Stack:** Tailwind CSS v4, CSS custom properties, Google Fonts (Instrument Serif, Instrument Sans, Geist Mono), server-rendered JSX templates.

**Key references:**
- `DESIGN.md` — complete token reference (colors, typography, spacing, components)
- `docs/plans/2026-03-22-site-redesign-design.md` — design document with page-by-page specs
- `/tmp/design-consultation-preview-1774207662.html` — visual reference for components

**Important context:**
- This is NOT a React client project. Templates are server-rendered JSX using `renderToString()`.
- The dev server is always running on port 3000 in another tab. Never start it yourself.
- Use `/browse` (gstack) to verify visual changes in the browser.
- Uses `bun` as package manager. Lock file is `bun.lock`.
- Biome linting: zero warnings, no `any` types, no `console` statements.

---

### Task 1: Remove DaisyUI and set up design system CSS

**Files:**
- Modify: `src/client/style.css`
- Modify: `package.json` (remove daisyui dependency)

**Step 1: Remove DaisyUI dependency**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun remove daisyui`

**Step 2: Rewrite `src/client/style.css`**

Replace the entire file with the new design system foundation. Remove the `@plugin "daisyui"` line and replace with CSS custom properties and updated article styles:

```css
@import "tailwindcss";
@source "../server/**/*.tsx";

/* ==========================================
   Design System Tokens (from DESIGN.md)
   ========================================== */

/* Dark mode (default) */
[data-theme="dark"] {
  --surface-base: #0C0C0C;
  --surface-1: #161616;
  --surface-2: #1E1E1E;
  --surface-3: #282828;
  --text-primary: #E8E3DD;
  --text-secondary: #8A8580;
  --text-muted: #5C5955;
  --accent: #C9A96E;
  --accent-dim: #B8984F;
  --accent-subtle: rgba(201, 169, 110, 0.12);
  --border: rgba(232, 227, 221, 0.06);
  --border-hover: rgba(232, 227, 221, 0.12);
}

/* Light mode */
[data-theme="light"] {
  --surface-base: #FAF8F5;
  --surface-1: #F0EDE8;
  --surface-2: #E8E4DF;
  --surface-3: #DDD8D2;
  --text-primary: #1A1817;
  --text-secondary: #6B6560;
  --text-muted: #9B958E;
  --accent: #A88840;
  --accent-dim: #967A38;
  --accent-subtle: rgba(168, 136, 64, 0.1);
  --border: rgba(26, 24, 23, 0.08);
  --border-hover: rgba(26, 24, 23, 0.15);
}

/* ==========================================
   Tailwind Theme Extension
   ========================================== */

@theme {
  --color-surface-base: var(--surface-base);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-accent: var(--accent);
  --color-accent-dim: var(--accent-dim);
  --color-accent-subtle: var(--accent-subtle);
  --color-border: var(--border);
  --color-border-hover: var(--border-hover);
  --color-whatsapp: #1da851;
  --color-whatsapp-hover: #178f45;

  --font-display: "Instrument Serif", serif;
  --font-body: "Instrument Sans", sans-serif;
  --font-mono: "Geist Mono", monospace;
}

/* ==========================================
   Article Content Styles (updated for new system)
   ========================================== */

.article-content h2 {
  @apply font-display text-[28px] leading-[1.2] text-text-primary mt-12 mb-5;
}

.article-content h3 {
  @apply font-display text-[22px] leading-[1.3] text-text-primary mt-8 mb-4;
}

.article-content p {
  @apply mb-5 leading-[1.7] text-text-secondary;
}

.article-content ul,
.article-content ol {
  @apply mb-5 pl-6 text-text-secondary;
}

.article-content li {
  @apply mb-2 leading-[1.7];
}

.article-content blockquote {
  @apply border-l-4 border-accent pl-5 my-8 italic text-text-secondary;
}

.article-content code {
  @apply bg-surface-2 px-1.5 py-0.5 rounded-[4px] text-sm font-mono text-text-primary;
}

.article-content pre {
  @apply bg-surface-2 p-5 rounded-[12px] overflow-x-auto my-8 font-mono;
}

.article-content pre code {
  @apply bg-transparent p-0;
}

.article-content img {
  @apply rounded-[12px] my-8;
}

.article-content hr {
  @apply my-12 border-border-hover;
}

.article-content a {
  @apply text-accent hover:text-accent-dim transition-colors duration-200;
}

.article-content strong {
  @apply text-text-primary font-semibold;
}
```

**Step 3: Verify CSS builds**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

Expected: Build succeeds without errors. There will be warnings about missing classes that reference DaisyUI — that's expected and will be fixed as we update templates.

**Step 4: Commit**

```bash
git add src/client/style.css package.json bun.lock
git commit -m "feat: replace DaisyUI with custom design system CSS tokens"
```

---

### Task 2: Update layout shell and add Google Fonts

**Files:**
- Modify: `src/server/components/layouts.tsx`

**Step 1: Update the layout component**

Changes needed:
1. Change `data-theme="sunset"` to `data-theme="dark"` on the `<html>` tag
2. Add Google Fonts `<link>` tags to `<head>` (preconnect + font stylesheet)
3. Replace `bg-base-100` body class with `bg-surface-base text-text-primary font-body`
4. Update main element class from `min-h-[calc(100vh-200px)]` to `min-h-[calc(100vh-160px)]`
5. Add antialiasing: `-webkit-font-smoothing: antialiased`

Google Fonts links to add before the stylesheet link:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

Body tag becomes:
```html
<body className="min-h-screen bg-surface-base text-text-primary font-body antialiased" data-page={name}>
```

**Step 2: Verify it builds**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

**Step 3: Commit**

```bash
git add src/server/components/layouts.tsx
git commit -m "feat: update layout shell with new fonts and theme tokens"
```

---

### Task 3: Rebuild navigation component

**Files:**
- Modify: `src/server/components/nav.tsx`
- Modify: `src/client/main.ts` (add mobile menu toggle JS)

**Step 1: Rewrite `nav.tsx`**

Replace the entire component. Remove all DaisyUI classes (`navbar`, `btn`, `menu`, `dropdown`). Build a custom responsive nav:

```tsx
import { CALENDLY_URL } from "@server/config";

const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/work-with-me", label: "Work with me", name: "work-with-me" },
];

export const Nav = ({ page }: { page: string }) => (
  <nav className="fixed top-0 w-full z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border">
    <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 lg:px-10 h-16">
      {/* Brand */}
      <a href="/" className="font-display text-xl text-text-primary hover:text-accent transition-colors duration-200">
        Alex Price
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label, name }) => (
          <a
            key={name}
            href={href}
            className={`text-sm font-body font-medium transition-colors duration-200 ${
              page === name
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
            aria-current={page === name ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right side: CTA + mobile burger */}
      <div className="flex items-center gap-4">
        <a
          href={CALENDLY_URL}
          className="hidden min-[375px]:inline-flex items-center bg-accent text-[#0C0C0C] font-body font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
        >
          Book a call
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          aria-label="Toggle menu"
          data-menu-toggle
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Mobile menu (hidden by default, toggled via JS) */}
    <div className="hidden md:hidden border-t border-border bg-surface-1" data-mobile-menu>
      <div className="px-6 py-4 flex flex-col gap-3">
        {navLinks.map(({ href, label, name }) => (
          <a
            key={name}
            href={href}
            className={`text-sm font-body font-medium py-2 transition-colors duration-200 ${
              page === name
                ? "text-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
            aria-current={page === name ? "page" : undefined}
          >
            {label}
          </a>
        ))}
        <a
          href={CALENDLY_URL}
          className="min-[375px]:hidden inline-flex items-center justify-center bg-accent text-[#0C0C0C] font-body font-semibold text-sm px-5 py-2.5 rounded-full mt-2"
        >
          Book a call
        </a>
      </div>
    </div>
  </nav>
);
```

**Step 2: Add mobile menu toggle to `src/client/main.ts`**

```ts
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-mobile-menu]");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}
```

**Step 3: Build JS and CSS**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build`

**Step 4: Commit**

```bash
git add src/server/components/nav.tsx src/client/main.ts
git commit -m "feat: rebuild nav with custom design system, add mobile menu toggle"
```

---

### Task 4: Rebuild footer component

**Files:**
- Modify: `src/server/components/footer.tsx`

**Step 1: Rewrite `footer.tsx`**

Remove all DaisyUI classes. Build minimal editorial footer:

```tsx
const socialLinks = [
  { href: "https://linkedin.com/in/alexpricecto", label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: "mailto:fractional@alexprice.dev", label: "Email" },
];

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center md:justify-between gap-6">
      <span className="font-display text-text-primary text-lg">Alex Price</span>
      <nav className="flex flex-wrap justify-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent text-sm font-body transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
        Sheffield, UK
      </p>
    </div>
  </footer>
);
```

**Step 2: Build CSS**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

**Step 3: Commit**

```bash
git add src/server/components/footer.tsx
git commit -m "feat: rebuild footer with editorial design system"
```

---

### Task 5: Verify foundation layer in browser

**Step 1: Build everything**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build`

**Step 2: Browse the site**

Use gstack `/browse` to visit `http://localhost:3000` and take a screenshot. The page content will look broken (templates still use DaisyUI classes) but verify:
- Fonts are loading (Instrument Serif, Instrument Sans, Geist Mono)
- Background is warm near-black (#0C0C0C)
- Nav is rendering with correct layout (brand left, links center, CTA right)
- Footer is rendering with correct layout

**Step 3: Fix any build or rendering issues before proceeding**

---

### Task 6: Rebuild homepage template

**Files:**
- Modify: `src/server/templates/home.tsx`

**Step 1: Rewrite `home.tsx`**

Replace the entire template. Remove all DaisyUI classes. Use the design system tokens throughout.

Key sections in order:
1. **Hero** — `min-h-screen pt-24` (accounting for fixed nav), two-column grid: text left + headshot right. Headline in `font-display` with `text-[clamp(3rem,7vw,5.5rem)]`, italic accent word in `text-accent`. Subtext in `text-text-secondary`. CTA buttons using design system button patterns. Headshot in `rounded-xl bg-surface-1 border border-border` container.
2. **Metrics strip** — flex row below hero with 3-4 stats: numbers in `font-display text-[32px]`, labels in `font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted`. Separated from hero by `border-t border-border`.
3. **Credibility section** — `py-24 lg:py-32`, `max-w-[700px]`. Editorial paragraph with company names in `text-accent` (keep them as links but style with accent color, no underline). "Now I help..." line in `text-text-primary font-medium`.
4. **"When to bring me in"** — `py-24 lg:py-32`, two cards on `bg-surface-1 rounded-[12px] border border-border p-9`. Geist Mono tag at top, Instrument Serif heading, Instrument Sans body list.
5. **"The engagement"** — `py-24 lg:py-32 bg-surface-1`, split layout. Numbered steps (01, 02) with `font-display text-accent` numbers, descriptions in body text, tags in accent-subtle pills.
6. **Testimonial** — `py-24 lg:py-32 bg-surface-1`. Large italic `font-display text-[28px]` quote. Avatar + name + `font-mono` title below.
7. **Final CTA** — `py-24 lg:py-32`. Full-width `bg-accent rounded-2xl p-12 md:p-20`. Dark text on gold. `font-display` heading. Inverted button (dark bg, accent text).

Content to preserve from current `home.tsx`:
- Hero headline: "I'm a fractional CTO who specialises in engineering himself out of the job."
- Hero subtext about alternative to full-time CTO hire
- Credibility: Ecologi, Trustpilot, LinkedIn Top UK, Just stories (keep all links)
- "You don't have a CTO" and "You have a CTO" cards (content stays, styling changes)
- "How this works" content: embedded support + transformation project descriptions
- Alert box content about direct feedback
- Dennis Hettema testimonial (exact quote, avatar, attribution)
- Final CTA: "Let's scale this thing" + Book a call button + Work with me link

**Step 2: Build and verify**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

Use `/browse` to visit `http://localhost:3000` and screenshot. Verify layout, typography, colors match the design system.

**Step 3: Commit**

```bash
git add src/server/templates/home.tsx
git commit -m "feat: rebuild homepage with editorial design system"
```

---

### Task 7: Rebuild insights listing template

**Files:**
- Modify: `src/server/templates/insights.tsx`

**Step 1: Rewrite `insights.tsx`**

Remove all DaisyUI classes. Key changes:

1. **Header** — Remove avatar from header. `font-display text-[40px]` title "Insights". Description in `text-text-secondary`.
2. **Pillar filter** — Horizontal row of tags using `font-mono text-[11px] uppercase tracking-[0.06em]`. Active: `bg-accent-subtle text-accent`. Inactive: `text-text-muted hover:text-text-secondary`. Use the existing `pillarLabels` map.
3. **Article list** — Vertical stack, NOT grid. Each article is a block link:
   - Top line: `font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted` — pillar tag + date + reading time
   - Headline: `font-display text-[28px] leading-[1.2]` — transitions to `text-accent` on hover
   - Excerpt: `text-text-secondary text-sm leading-[1.65]`
   - Bottom: `border-b border-border` separating cards
   - No background color on cards — just the border separator
4. **Empty state** — `text-text-muted text-center`, link in `text-accent`

Preserve the `pillarLabels` map and `InsightsProps` type as-is.

**Step 2: Build and verify**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

Use `/browse` to visit `http://localhost:3000/insights` and screenshot.

**Step 3: Commit**

```bash
git add src/server/templates/insights.tsx
git commit -m "feat: rebuild insights listing with editorial design system"
```

---

### Task 8: Rebuild single insight template

**Files:**
- Modify: `src/server/templates/insight.tsx`

**Step 1: Rewrite `insight.tsx`**

Remove all DaisyUI classes. Key changes:

1. **Container** — `max-w-[700px] mx-auto px-6 py-20 pt-28` (extra top padding for fixed nav)
2. **Back link** — `text-text-muted text-sm hover:text-text-secondary transition-colors duration-200`
3. **Article header** — Title in `font-display text-[40px] leading-[1.15] tracking-[-0.02em]`. Below: `font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted` meta line (pillar + date + reading time). Author strip: `w-10 h-10 rounded-full` avatar + name in `text-sm font-medium` + role in `text-text-muted text-xs`.
4. **Article body** — `article-content` class stays (styles already updated in Task 1). Add `text-text-secondary` base.
5. **Sign-off** — `italic text-text-muted` for "– Alex"
6. **Divider** — Replace DaisyUI `divider` with `border-t border-border my-10`
7. **Author bio** — `w-16 h-16 rounded-full` avatar. "Want to talk about this?" in `text-text-secondary`. Gold CTA button matching design system primary button pattern.

Preserve the `InsightProps` type and all SEO metadata pass-through.

**Step 2: Build and verify**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

Use `/browse` to visit `http://localhost:3000/insights/empathy-is-the-hard-problem` and screenshot.

**Step 3: Commit**

```bash
git add src/server/templates/insight.tsx
git commit -m "feat: rebuild insight post page with editorial design system"
```

---

### Task 9: Rebuild work-with-me template

**Files:**
- Modify: `src/server/templates/work-with-me.tsx`

**Step 1: Rewrite `work-with-me.tsx`**

Remove all DaisyUI classes. Key changes:

1. **Container** — `max-w-[1200px] mx-auto px-6 py-20 pt-28`
2. **Header** — `font-display text-[clamp(2.5rem,5vw,3.5rem)]` headline "How we can work together". Subtext in `text-text-secondary text-lg`.
3. **The Problem** — `max-w-[700px] text-text-secondary text-lg leading-[1.7]`
4. **Engagement Models** — Two side-by-side cards on `bg-surface-1 rounded-[12px] border border-border`:
   - `font-mono text-[11px] uppercase tracking-[0.06em] text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full` tag at top ("EMBEDDED" / "PROJECT")
   - `font-display text-[24px]` card title
   - `text-text-secondary text-sm leading-[1.65]` description
   - Bottom stats strip separated by `border-t border-border pt-5 mt-6`: Instrument Serif numbers + Geist Mono labels
5. **What to Expect** — Checkmarks in `text-accent`, body in `text-text-secondary`
6. **Testimonial** — Andrew Black testimonial using same pattern as homepage: `bg-surface-1 rounded-[12px] p-9 border border-border`. Large italic `font-display` quote. No DaisyUI `card`.
7. **Not for Everyone / Investment** — `font-display text-[28px]` headings, body in `text-text-secondary`. Strong text in `text-text-primary`.
8. **Divider** — Replace DaisyUI `divider` with `border-t border-border my-10`
9. **Final CTA** — `w-28 h-28 rounded-full` avatar. `font-display text-[28px]` heading. Gold primary button + WhatsApp button (keep `bg-whatsapp hover:bg-whatsapp-hover text-white`).

Preserve all content, links, and the WhatsApp CTA.

**Step 2: Build and verify**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build:css`

Use `/browse` to visit `http://localhost:3000/work-with-me` and screenshot.

**Step 3: Commit**

```bash
git add src/server/templates/work-with-me.tsx
git commit -m "feat: rebuild work-with-me page with editorial design system"
```

---

### Task 10: Full visual QA pass

**Step 1: Build everything**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build`

**Step 2: Run linter**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run check`

Fix any linting errors.

**Step 3: Visual QA every page**

Use `/browse` to visit each page and take screenshots:
1. `http://localhost:3000` — Homepage
2. `http://localhost:3000/insights` — Insights listing
3. `http://localhost:3000/insights/empathy-is-the-hard-problem` — Single insight
4. `http://localhost:3000/work-with-me` — Work with me

For each page verify:
- Fonts are correct (Instrument Serif for headlines, Instrument Sans for body, Geist Mono for tags)
- Colors match DESIGN.md (warm cream text, gold accent, warm gray surfaces)
- No DaisyUI classes remain (search all `.tsx` files for common DaisyUI classes: `btn`, `card`, `badge`, `navbar`, `menu`, `hero`, `divider`, `link `, `avatar`, `dropdown`, `base-100`, `base-200`, `base-300`, `base-content`, `primary`)
- Responsive layout works on mobile viewport
- Navigation is functional (desktop links, mobile burger menu)
- All links work (Calendly, social links, article links)
- Gold CTA buttons have correct hover state
- Article content renders correctly with new styles

**Step 4: Fix any issues found**

**Step 5: Final commit if needed**

```bash
git add -A
git commit -m "fix: visual QA fixes for site redesign"
```

---

### Task 11: Clean up and verify no DaisyUI remnants

**Step 1: Search for DaisyUI class remnants**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && grep -rn "btn\|card-body\|card-title\|badge\|navbar\|menu\|hero-content\|divider\|link link\|avatar\|dropdown\|base-100\|base-200\|base-300\|base-content\|data-theme=\"sunset\"" src/`

Fix any remaining references.

**Step 2: Verify DaisyUI is not in dependencies**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && grep daisyui package.json`

Expected: No output (daisyui removed).

**Step 3: Verify no DaisyUI in CSS**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && grep daisyui src/client/style.css`

Expected: No output.

**Step 4: Final build**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/miami && bun run build`

**Step 5: Commit if any cleanup was needed**

```bash
git add -A
git commit -m "chore: remove all DaisyUI remnants"
```

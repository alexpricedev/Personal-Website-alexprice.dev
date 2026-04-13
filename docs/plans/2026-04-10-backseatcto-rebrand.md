# Backseat CTO Rebrand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebrand alexprice.dev to backseatcto.com with three-tier funnel: free resources (Common Issues) → Vibe Code Audit (£150) → hourly consulting (£75/hr).

**Architecture:** Server-side rendered Bun + JSX site (NOT React client-side). Routes return `Response` objects via `renderToString()`. Tailwind v4 with `@theme` in CSS. GSAP for scroll animations. Puppeteer for OG image generation.

**Tech Stack:** Bun, React 19 (SSR only), Tailwind CSS v4, GSAP, Puppeteer Core

**Key references:**
- `DESIGN.md` — Full design system (MUST read before any visual work)
- `CLAUDE.md` — Dev guidelines (never run dev server, use JSX not React client patterns)
- This plan — All content/copy is inline below, no external content dependencies

---

## Task 1: CSS Design Tokens + Font Loading

Update the CSS foundation and HTML font loading to match DESIGN.md. This is the highest priority because every Tailwind utility in the codebase renders against these tokens.

**Files:**
- Modify: `src/client/style.css` (lines 8-44 — `:root` vars and `@theme` block)
- Modify: `src/server/components/layouts.tsx` (lines 75, 134-141 — colorScheme and font links)

**Context:** The current CSS has dark-mode tokens (surface-base: `#0C0C0C`, accent: `#C9A96E` gold) and old font families (Instrument Serif/Sans, Geist Mono). DESIGN.md specifies warm light-mode tokens (surface-base: `#F4F0E8`, accent: `#BF5540` terracotta) and new fonts (General Sans, Lora, DM Sans, Commit Mono).

**Step 1: Update `:root` CSS variables in `src/client/style.css`**

Replace lines 8-21 with:

```css
:root {
  --surface-base: #F4F0E8;
  --surface-1: #ECE7DC;
  --surface-2: #E3DDD2;
  --surface-3: #D9D3C7;
  --text-primary: #1A1714;
  --text-secondary: #4A4540;
  --text-muted: #8A837A;
  --accent: #BF5540;
  --accent-dim: #A34430;
  --accent-subtle: rgba(191, 85, 64, 0.1);
  --border: rgba(26, 23, 20, 0.08);
  --border-hover: rgba(26, 23, 20, 0.15);
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface-base: #131210;
    --surface-1: #1D1A17;
    --surface-2: #262320;
    --surface-3: #302D29;
    --text-primary: #EDE8DE;
    --text-secondary: #B5AFA7;
    --text-muted: #6B6560;
    --accent: #D06A52;
    --accent-dim: #E07B62;
    --accent-subtle: rgba(208, 106, 82, 0.12);
    --border: rgba(237, 232, 222, 0.06);
    --border-hover: rgba(237, 232, 222, 0.12);
  }
}
```

**Step 2: Update `@theme` block font families in `src/client/style.css`**

Replace lines 41-43 with:

```css
  --font-display: "General Sans", sans-serif;
  --font-body: "Lora", serif;
  --font-ui: "DM Sans", sans-serif;
  --font-mono: "Commit Mono", monospace;
```

Note: This adds a new `--font-ui` token. Nav, buttons, and labels should use `font-ui` (DM Sans) per DESIGN.md. Body text uses `font-body` (Lora). Headlines use `font-display` (General Sans). The existing codebase uses `font-body` in nav/buttons which will now render as Lora (serif) — this is intentional per DESIGN.md's typography spec, but review if any nav/button elements need `font-ui` instead.

**Step 3: Update font loading in `src/server/components/layouts.tsx`**

Replace the single Google Fonts `<link>` at line 134-141 with:

```tsx
{/* Fontshare CDN for General Sans */}
<link rel="preconnect" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap"
  rel="stylesheet"
/>

{/* Google Fonts for Lora, DM Sans, Commit Mono */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
  rel="stylesheet"
/>
```

**Step 4: Fix colorScheme in `src/server/components/layouts.tsx`**

Change line 75 from:

```tsx
<html lang="en" style={{ colorScheme: "dark" }}>
```

to:

```tsx
<html lang="en" style={{ colorScheme: "light dark" }}>
```

**Step 5: Verify in browser**

Open `http://localhost:3000` in BrowserMCP. The site should now render with:
- Warm off-white background (`#F4F0E8`)
- Burnt terracotta accent color on links/tags
- General Sans in headlines, Lora in body text
- If system is in dark mode, dark tokens should apply

**Step 6: Update font-body usage in nav/button elements**

Now that `font-body` maps to Lora (serif), check if nav links and buttons (which use `font-body` class) should use `font-ui` (DM Sans) instead. Per DESIGN.md: navigation, buttons, and small UI elements use DM Sans.

In `src/server/components/nav.tsx`, the nav links and CTAs use `font-body`. These should be changed to `font-ui`. But DO NOT touch nav.tsx in this task — that's Task 3. Just note the font-family-dependent classes for later.

**Step 7: Commit**

```bash
git add src/client/style.css src/server/components/layouts.tsx
git commit -m "Update design tokens and font loading to match DESIGN.md

Light-mode warm minimalism palette with dark mode via prefers-color-scheme.
General Sans (display) + Lora (body) + DM Sans (UI) + Commit Mono (data).
Fix colorScheme from 'dark' to 'light dark'."
```

---

## Task 2: Config + Footer Bug Fix

Update the site config for the new domain and fix the hardcoded email in footer.

**Files:**
- Modify: `src/server/config.ts` (all 3 exports)
- Modify: `src/server/components/footer.tsx` (line 4 hardcoded email, add /about link)

**Step 1: Update `src/server/config.ts`**

Replace the entire file contents with:

```typescript
export const SITE_URL = "https://backseatcto.com";
export const CONTACT_EMAIL = "hello@backseatcto.com";
export const LINKEDIN_URL = "https://linkedin.com/in/alexpricecto";
```

**Step 2: Fix hardcoded email and add /about link in `src/server/components/footer.tsx`**

Replace the entire file with:

```tsx
import { CONTACT_EMAIL, LINKEDIN_URL } from "@server/config";

const socialLinks = [
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
];

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 sm:gap-6">
      <nav className="flex flex-wrap gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="text-text-muted hover:text-accent text-sm font-body transition-colors duration-200 py-2"
          >
            {link.label}
          </a>
        ))}
        <a
          href="/about"
          className="text-text-muted hover:text-accent text-sm font-body transition-colors duration-200 py-2"
        >
          About
        </a>
      </nav>
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
        Sheffield, UK
      </p>
    </div>
  </footer>
);
```

**Step 3: Verify in browser**

Open `http://localhost:3000`. Scroll to footer. Confirm:
- Email link says "Email" and points to `mailto:hello@backseatcto.com`
- "About" link appears in footer nav
- LinkedIn link still works

**Step 4: Commit**

```bash
git add src/server/config.ts src/server/components/footer.tsx
git commit -m "Update config to backseatcto.com and fix hardcoded footer email

Domain, email, and LinkedIn URL now use config exports.
Footer imports CONTACT_EMAIL instead of hardcoding alexprice.dev.
Add /about link to footer navigation."
```

---

## Task 3: Nav + Layout Rebrand

Update the nav component (monogram, links, CTA) and layout component (titles, JSON-LD, meta) for the Backseat CTO brand.

**Files:**
- Modify: `src/server/components/nav.tsx` (monogram, navLinks array, CTA buttons)
- Modify: `src/server/components/layouts.tsx` (title pattern, og:site_name, JSON-LD, meta description)

**Context:** The nav monogram changes from "AP" to "backseat" text. Nav gets a "Common Issues" link. CTA buttons change from "Get in touch" mailto to "Get your code audited" linking to /vibe-code-audit. Layout title pattern changes from "Alex Price" to "Backseat CTO".

**Step 1: Update nav.tsx**

Replace the entire file with:

```tsx
import { CONTACT_EMAIL } from "@server/config";

const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/common-issues", label: "Common Issues", name: "common-issues" },
  { href: "/projects", label: "Projects", name: "projects" },
  { href: "/how-it-works", label: "How it works", name: "how-it-works" },
];

export const Nav = ({ page }: { page: string }) => (
  <nav className="fixed top-0 w-full z-50 bg-surface-base/80 backdrop-blur-xl border-b border-border">
    <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 lg:px-10 h-16">
      {/* Brand */}
      <a
        href="/"
        className="font-display text-[18px] tracking-[-0.02em] text-text-primary hover:text-accent transition-colors duration-200 py-2 px-1 font-semibold"
      >
        backseat<span className="text-accent">cto</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label, name }) => (
          <a
            key={name}
            href={href}
            className={`text-sm font-ui font-medium py-3 transition-colors duration-200 ${
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
          href="/vibe-code-audit"
          className="hidden min-[375px]:inline-flex items-center bg-accent text-white font-ui font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
        >
          Get your code audited
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden p-2 text-text-secondary hover:text-text-primary bg-surface-1/60 rounded-lg transition-colors duration-200"
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
    <div
      className="hidden md:hidden border-t border-border bg-surface-1 relative z-50"
      data-mobile-menu
    >
      <div className="px-6 py-4 flex flex-col gap-3">
        {navLinks.map(({ href, label, name }) => (
          <a
            key={name}
            href={href}
            className={`text-sm font-ui font-medium py-2 transition-colors duration-200 ${
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
          href="/vibe-code-audit"
          className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-sm px-5 py-2.5 rounded-full mt-2"
        >
          Get your code audited
        </a>
      </div>
    </div>
  </nav>
);
```

Key changes: monogram → "backseatcto" text, `font-body` → `font-ui` on nav items and CTAs, CTA → "/vibe-code-audit", `text-[#0C0C0C]` → `text-white` on CTA buttons, "Common Issues" added to navLinks, mobile CTA always visible (removed `min-[375px]:hidden` condition, now always shows).

**Step 2: Update layouts.tsx title pattern and meta**

In `src/server/components/layouts.tsx`, update the title pattern (around line 29):

```tsx
const fullTitle =
  title === "Home"
    ? "Backseat CTO – Senior Technical Help, By The Hour"
    : `${title} – Backseat CTO`;
```

Update the default meta description (around line 33):

```tsx
const metaDescription =
  description ||
  "Senior technical help, by the hour. Architecture reviews, vibe code audits, and technical guidance for founders building with AI.";
```

Update og:site_name (around line 89):

```tsx
<meta property="og:site_name" content="Backseat CTO" />
```

Update article author meta (around line 99):

```tsx
<meta property="article:author" content="Alex Price" />
```

(Keep "Alex Price" as author — it's the person, not the brand.)

Update JSON-LD Person schema (around line 66):

```tsx
: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alex Price",
    alternateName: "Backseat CTO",
    url: SITE_URL,
    jobTitle: "Technical Consultant",
    description: metaDescription,
    image: DEFAULT_OG_IMAGE,
    sameAs: ["https://linkedin.com/in/alexpricecto"],
  };
```

**Step 3: Verify in browser**

Open `http://localhost:3000`. Confirm:
- Nav shows "backseatcto" brand text with "cto" in accent color
- "Common Issues" appears in nav
- CTA button says "Get your code audited"
- Browser tab title says "Backseat CTO – Senior Technical Help, By The Hour"
- View page source and check og:site_name is "Backseat CTO"

**Step 4: Commit**

```bash
git add src/server/components/nav.tsx src/server/components/layouts.tsx
git commit -m "Rebrand nav and layout to Backseat CTO

Nav: AP monogram → backseatcto text, add Common Issues link,
CTA → 'Get your code audited' linking to /vibe-code-audit.
Layout: title pattern → 'Backseat CTO', og:site_name updated,
JSON-LD gets alternateName, nav/button font → font-ui (DM Sans)."
```

---

## Task 4: About Page

Create the /about page with content moved from the home page (credibility paragraph + Dennis testimonial).

**Files:**
- Create: `src/server/templates/about.tsx`

**Context:** The about page is NOT in the nav. It's reachable from footer (/about link added in Task 2) and from a link on the home page. It contains Alex's bio (moved from home.tsx lines 107-163), headshot, and the Dennis Hettema testimonial (moved from home.tsx lines 346-380).

**Step 1: Create `src/server/templates/about.tsx`**

```tsx
import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

export const About = () => (
  <Layout
    title="About"
    description="Alex Price is the Backseat CTO. 12+ years building and scaling companies, now helping founders make the technical decisions that matter."
    name="about"
    path="/about"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      <div className="grid md:grid-cols-[1fr_320px] gap-16 items-start">
        <div>
          <header className="mb-10">
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4">
              About Alex
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
              The person behind Backseat CTO.
            </p>
          </header>

          <div className="max-w-[700px] space-y-6">
            <p className="text-lg text-text-secondary leading-relaxed">
              I co-founded and was CTO at{" "}
              <a
                href="https://ecologi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dim transition-colors duration-200"
              >
                Ecologi
              </a>{" "}
              where we scaled from 3 to 80+ employees, had 18,000{" "}
              <a
                href="https://uk.trustpilot.com/review/ecologi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dim transition-colors duration-200"
              >
                happy B2B customers
              </a>{" "}
              and ranked #8 in{" "}
              <a
                href="https://www.linkedin.com/pulse/linkedin-top-startups-2022-15-uk-companies-rise-linkedin-news-uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dim transition-colors duration-200"
              >
                LinkedIn's Top UK Startups 2022
              </a>
              . After my exit, I became CTO at{" "}
              <a
                href="https://justabout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dim transition-colors duration-200"
              >
                Just
              </a>
              , taking a pre-alpha concept to production. Now I'm co-founder at{" "}
              <a
                href="https://chptrs.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dim transition-colors duration-200"
              >
                CHPTRS
              </a>
              .
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              I started Backseat CTO because I kept seeing the same pattern: non-technical founders building incredible products with AI tools, but making architectural and security decisions that would cost them later. They didn't need a full-time CTO. They needed someone who'd been through it to look over their shoulder and say "that's fine" or "fix that before it breaks."
            </p>
            <p className="text-xl text-text-primary font-medium">
              I help founders building with AI make the technical decisions that
              matter.
            </p>
          </div>

          {/* Testimonial */}
          <div className="mt-16 max-w-[700px]">
            <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10">
              <p className="text-[clamp(1.15rem,2.5vw,1.35rem)] leading-[1.6] italic text-text-primary mb-8">
                "Alex helped me cut through the noise when I was building
                HelloRevenue. Through regular strategy calls he gave me clear,
                honest technical guidance that took us from early-stage uncertainty
                to production readiness. If you're a non-technical founder who needs
                a technical partner you can trust, Alex is your guy."
              </p>
              <footer className="flex items-center gap-4">
                <img
                  src="/dennis-hettema.webp"
                  alt="Dennis Hettema"
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Dennis Hettema
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                    <span className="text-text-muted/70">CEO,</span>{" "}
                    <a
                      href="https://hellorevenue.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-dim transition-colors duration-200"
                    >
                      HelloRevenue
                    </a>
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Photo column */}
        <div className="hidden md:block sticky top-24">
          <img
            src="/headshot2.webp"
            alt="Alex Price"
            className="w-full rounded-[12px] object-cover"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border mt-20 pt-12">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div>
            <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-2">
              Ready to talk?
            </h2>
            <p className="text-text-secondary mb-4">
              Email me what you're building. I'll get back to you within 24 hours.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="shrink-0 inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  </Layout>
);
```

**Step 2: Commit**

```bash
git add src/server/templates/about.tsx
git commit -m "Add about page with bio and Dennis testimonial

Content moved from home page. Two-column layout with sticky headshot.
Reachable from footer and home page, not in main nav."
```

Note: Route registration happens in Task 8. The page won't be accessible until then, which is fine — we're building templates before wiring routes.

---

## Task 5: Home Page Rewrite

Rewrite home page copy for Backseat CTO brand. Remove credibility paragraph and Dennis testimonial (moved to /about in Task 4). Update all CTAs to reference the new funnel.

**Files:**
- Modify: `src/server/templates/home.tsx` (full rewrite)

**Context:** The home page keeps its structure (hero, metrics, cards, how-it-works section, CTA) but loses the credibility paragraph (lines 107-163) and Dennis testimonial (lines 346-380) which moved to /about. Hero copy changes. CTA buttons change from "Get in touch" to funnel-appropriate CTAs. The hero character animation (`data-animate="chars"`) stays but the animated phrase changes.

**Step 1: Replace `src/server/templates/home.tsx` entirely**

```tsx
import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

const heroChars = "going to break.".split("").map((char, i) => ({
  key: `c${i}`,
  char: char === " " ? "\u00A0" : char,
}));

export const Home = () => (
  <Layout
    title="Home"
    description="The Backseat CTO. Architecture reviews, vibe code audits, and technical guidance for founders building with AI. From £75/session."
    name="home"
  >
    {/* Hero */}
    <section className="min-h-[70vh] md:min-h-screen flex items-center pt-28 md:pt-16 px-6">
      <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.03em] mb-8">
            AI can build your product. It can't tell you what's{" "}
            <em
              className="text-accent italic whitespace-nowrap"
              data-animate="chars"
            >
              {heroChars.map((c) => (
                <span
                  key={c.key}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  {c.char}
                </span>
              ))}
            </em>
          </h1>
          <p className="text-text-secondary text-lg lg:text-xl leading-relaxed max-w-lg mb-4">
            I'm{" "}
            <a
              href="/about"
              className="text-text-primary hover:text-accent transition-colors duration-200"
            >
              Alex Price
            </a>
            , the Backseat CTO. Architecture reviews, vibe code audits, and
            honest technical guidance for founders building with AI.
          </p>
          <p className="text-lg lg:text-xl leading-relaxed mb-10">
            <strong className="text-text-primary">
              From £75 per session. No retainer.
            </strong>
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="/vibe-code-audit"
              className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-lg px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
            >
              Get your code audited — £150
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
            >
              How it works
            </a>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div
            data-parallax="hero"
            className="rounded-xl overflow-hidden isolate bg-bg relative aspect-[3/4] cursor-default"
          >
            <img
              src="/hero-bg.png"
              alt=""
              data-parallax-layer="bg"
              className="absolute -top-[30px] -left-[30px] w-[calc(100%+60px)] max-w-none h-[calc(100%+60px)] object-cover"
            />
            <img
              src="/hero-subject.png"
              alt="Alex Price"
              data-parallax-layer="fg"
              className="absolute -top-[30px] -left-[30px] w-[calc(100%+60px)] max-w-none h-[calc(100%+60px)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Metrics Strip */}
    <section className="border-t border-border">
      <div
        data-animate="stagger"
        className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12"
      >
        {[
          { value: "12+", label: "Years Building" },
          { value: "80+", label: "Team Scaled To" },
          { value: "#8", label: "LinkedIn Top UK" },
          { value: "18k", label: "B2B Customers" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-[32px] text-text-primary leading-none mb-1">
              {stat.value}
            </div>
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* When to bring me in */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2
          data-animate="section"
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-12"
        >
          When to bring me in
        </h2>
        <div data-animate="stagger" className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 hover:border-border-hover transition-colors duration-300">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Getting started
            </span>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-[1.25] tracking-[-0.01em] mb-4">
              You're building something and you've hit a wall you can't prompt
              your way out of
            </h3>
            <ul className="space-y-2 text-text-secondary leading-[1.7]">
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Architecture and database decisions before you're locked in
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Making sense of AI-generated code you don't fully trust
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                "Am I doing this right?" answered by someone who's done it
              </li>
            </ul>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 hover:border-border-hover transition-colors duration-300">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Launch prep
            </span>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-[1.25] tracking-[-0.01em] mb-4">
              You've built it and you need to know it won't fall over in front
              of real users
            </h3>
            <ul className="space-y-2 text-text-secondary leading-[1.7]">
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Security and performance review before you go live
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                "Will this scale to 1,000 users?" answered honestly
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Technical due diligence prep before investors ask
              </li>
            </ul>
          </div>
        </div>
        <div
          data-animate="section"
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/common-issues"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-accent text-white font-ui font-semibold px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
          >
            Check your code health — free
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center w-full sm:w-auto text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section
      data-animate="sequence"
      className="py-24 lg:py-32 px-6 bg-surface-1"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          <div className="md:w-1/2">
            <h2
              data-seq
              className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-4"
            >
              How it works
            </h2>
            <p
              data-seq
              className="text-lg text-text-secondary leading-relaxed mb-10"
            >
              No retainer. No long-term commitment. Just senior technical help
              when you need it.
            </p>
            <div className="space-y-10">
              {/* Step 01 */}
              <div data-seq className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    01
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[20px] leading-[1.3] mb-3">
                    Email me your problem
                  </h4>
                  <p className="text-text-secondary leading-[1.7]">
                    Tell me what you're building and what you need help with.
                    I'll reply within 24 hours with whether I can help and when
                    I'm available.
                  </p>
                </div>
              </div>
              {/* Step 02 */}
              <div data-seq className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    02
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[20px] leading-[1.3] mb-3">
                    Share your code or context
                  </h4>
                  <p className="text-text-secondary leading-[1.7]">
                    Before the session, share a repo link, screenshots, or
                    whatever helps me understand the situation. The more context
                    upfront, the more value in the session.
                  </p>
                </div>
              </div>
              {/* Step 03 */}
              <div data-seq className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    03
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[20px] leading-[1.3] mb-3">
                    Live session + written summary
                  </h4>
                  <p className="text-text-secondary leading-[1.7]">
                    We jump on a call. I review your code, answer your
                    questions, and give you direct, honest technical guidance.
                    Afterwards, you get a written summary of what we covered and
                    what to do next.
                  </p>
                </div>
              </div>
            </div>
            {/* Direct feedback callout */}
            <div
              data-seq
              className="mt-12 bg-surface-2 rounded-[12px] border border-border p-6"
            >
              <p className="text-text-secondary leading-[1.7]">
                I don't tell you what you want to hear. I tell you what's going
                to break, what's fine, and what to focus on next.{" "}
                <strong className="text-text-primary">
                  Direct, honest, useful.
                </strong>
              </p>
            </div>
          </div>
          <div data-seq className="md:w-1/2">
            <img
              src="/alex-working.webp"
              alt="Alex Price in a meeting"
              className="w-full aspect-[4/3] rounded-[12px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section data-animate="section" className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto bg-accent rounded-2xl p-8 sm:p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] tracking-[-0.03em] text-white mb-4">
            Not sure if your code is production-ready?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto md:mx-0">
            Start with a free self-assessment, or get a professional audit for £150.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="/vibe-code-audit"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-accent font-ui font-semibold text-lg px-10 py-5 rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Get your code audited
            </a>
            <a
              href="/common-issues"
              className="text-white font-ui font-semibold hover:underline underline-offset-4"
            >
              Free self-assessment →
            </a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);
```

Key changes:
- Credibility section (old lines 107-163) REMOVED — now on /about
- Dennis testimonial (old lines 346-380) REMOVED — now on /about
- Hero sub-headline links to /about ("I'm Alex Price")
- Primary CTA → "Get your code audited — £150" linking to /vibe-code-audit
- Mid-page CTA → "Check your code health — free" linking to /common-issues
- Final CTA → dual funnel (audit + free assessment)
- All button text colors changed from `text-[#0C0C0C]` to `text-white` or `text-accent`
- `font-body` on buttons → `font-ui`

**Step 2: Verify in browser**

Open `http://localhost:3000`. Confirm:
- Hero text and character animation still work
- No Dennis testimonial or credibility paragraph
- CTAs link to /vibe-code-audit and /common-issues (404 is fine for now)
- Final CTA box uses white text on accent background

**Step 3: Commit**

```bash
git add src/server/templates/home.tsx
git commit -m "Rewrite home page for Backseat CTO funnel

Move credibility section and Dennis testimonial to /about.
Update CTAs to drive audit and free assessment funnel.
Fix button text colors to white per DESIGN.md."
```

---

## Task 6: Vibe Code Audit Page

Create the dedicated audit landing page at /vibe-code-audit. This is the first paid gate in the funnel (£150).

**Files:**
- Create: `src/server/templates/vibe-code-audit.tsx`

**Context:** This is a sales page for the Vibe Code Audit product. Structure: hero, what you get, who this is for / isn't for, sample report mockup, FAQ, CTA. The CTA pattern (email + WhatsApp) can be referenced from `work-with-me.tsx:273-326`.

**Step 1: Create `src/server/templates/vibe-code-audit.tsx`**

```tsx
import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

const auditIncludes = [
  {
    title: "Security review",
    description:
      "Authentication, authorization, input validation, secrets management. The things AI tools consistently get wrong.",
  },
  {
    title: "Architecture assessment",
    description:
      "Database design, API structure, hosting choices. Will this hold up at 1,000 users? 10,000?",
  },
  {
    title: "Performance analysis",
    description:
      "N+1 queries, missing indexes, unoptimized assets. The silent killers of user experience.",
  },
  {
    title: "Code quality review",
    description:
      "Error handling, edge cases, maintainability. What happens when things go wrong?",
  },
  {
    title: "Written report",
    description:
      "A prioritised list of findings with severity ratings, clear explanations, and specific fix recommendations. Not a checklist — a roadmap.",
  },
  {
    title: "30-minute walkthrough call",
    description:
      "We go through the report together. Ask anything. I'll make sure you understand every finding and what to do about it.",
  },
];

const faqs = [
  {
    q: "What kind of codebases do you audit?",
    a: "Web applications, APIs, and SaaS products. Any language, any framework. I've worked across the stack for 12+ years. If you built it with Cursor, Bolt, Lovable, Replit, or similar AI tools, this audit is specifically designed for you.",
  },
  {
    q: "How long does the audit take?",
    a: "You'll have the written report within 3 working days of sharing access. The walkthrough call is scheduled at a time that works for both of us, usually within a week.",
  },
  {
    q: "What do you need from me?",
    a: "Read-only access to your code repository (GitHub, GitLab, etc.) and a brief description of what the app does. That's it.",
  },
  {
    q: "What if I need help fixing the issues?",
    a: "The report is designed to be actionable — you or your AI tools can fix most issues directly from the recommendations. If you want hands-on help, I offer hourly consulting at £75/hr.",
  },
  {
    q: "Is this just an automated scan?",
    a: "No. Automated tools catch syntax issues and known vulnerabilities. I find the architectural decisions, security patterns, and scaling problems that tools miss. Every finding is written by a human who's built and scaled production systems.",
  },
];

export const VibeCodeAudit = () => (
  <Layout
    title="Vibe Code Audit"
    description="Professional code audit for AI-built applications. Security, architecture, and performance review with a written report and walkthrough call. £150."
    name="vibe-code-audit"
    path="/vibe-code-audit"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      {/* Hero */}
      <header className="mb-20">
        <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
          Vibe Code Audit
        </span>
        <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4 max-w-[900px]">
          You built it with AI. I'll tell you if it's going to hold up.
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl mb-6">
          A professional code audit for applications built with Cursor, Bolt,
          Lovable, and other AI tools. Security, architecture, performance —
          everything your AI assistant can't evaluate about its own work.
        </p>
        <div className="flex items-baseline gap-4 mb-8">
          <span className="font-display text-[clamp(2rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-text-primary">
            £150
          </span>
          <span className="text-text-muted text-lg">flat fee</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Vibe%20Code%20Audit&body=Hi%20Alex%2C%0A%0AI%27d%20like%20a%20code%20audit%20for%20my%20project.%0A%0AHere%27s%20what%20I%27m%20building%3A%20%5Bbrief%20description%5D%0ARepo%3A%20%5Blink%5D`}
            className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-lg px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
          >
            Book your audit
          </a>
          <a
            href="/common-issues"
            className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
          >
            Free self-assessment first →
          </a>
        </div>
      </header>

      {/* What you get */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          What you get
        </h2>
        <div data-animate="stagger" className="grid md:grid-cols-2 gap-6">
          {auditIncludes.map((item) => (
            <div
              key={item.title}
              className="bg-surface-1 rounded-[12px] border border-border p-7 hover:border-border-hover transition-colors duration-300"
            >
              <h3 className="font-semibold text-[16px] mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-[1.65]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for / isn't for */}
      <section data-animate="section" className="mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-9">
            <h3 className="font-display text-[22px] leading-[1.3] mb-6">
              This is for you if…
            </h3>
            <ul className="space-y-3 text-text-secondary leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You built your app with AI tools and aren't 100% sure what's under the hood
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You're about to launch and want someone senior to check it first
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You're raising money and investors will ask about your tech
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You want honest answers, not reassurance
              </li>
            </ul>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-9">
            <h3 className="font-display text-[22px] leading-[1.3] mb-6">
              This isn't for you if…
            </h3>
            <ul className="space-y-3 text-text-secondary leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-text-muted shrink-0 mt-1">✗</span>
                You need someone to build it for you (try{" "}
                <a
                  href="https://chptrs.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dim transition-colors duration-200"
                >
                  CHPTRS
                </a>
                )
              </li>
              <li className="flex gap-3">
                <span className="text-text-muted shrink-0 mt-1">✗</span>
                You just want a certificate to show investors (this is real feedback, not a rubber stamp)
              </li>
              <li className="flex gap-3">
                <span className="text-text-muted shrink-0 mt-1">✗</span>
                Your app is still at the idea stage with no code written yet
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sample report mockup */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          What the report looks like
        </h2>
        <div className="bg-surface-1 rounded-[12px] border border-border p-7 sm:p-9 max-w-[700px]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase bg-[rgba(197,48,48,0.08)] text-[#C53030] px-3 py-1 rounded-full border border-[rgba(197,48,48,0.2)]">
                  Critical
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  Security
                </span>
              </div>
              <h4 className="font-semibold text-[16px] mb-2">
                API keys exposed in client bundle
              </h4>
              <p className="text-text-secondary text-sm leading-[1.65]">
                Your Stripe secret key and database connection string are included in the client-side JavaScript bundle. Anyone can view these in browser dev tools. Move these to server-side environment variables immediately.
              </p>
            </div>
            <div className="border-t border-border" />
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase bg-[rgba(161,98,7,0.08)] text-[#A16207] px-3 py-1 rounded-full border border-[rgba(161,98,7,0.2)]">
                  Warning
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  Performance
                </span>
              </div>
              <h4 className="font-semibold text-[16px] mb-2">
                N+1 query in dashboard endpoint
              </h4>
              <p className="text-text-secondary text-sm leading-[1.65]">
                The /api/dashboard endpoint makes a separate database query for each user's projects. With 100 users, that's 101 queries per request. Use a JOIN or batch query to reduce this to 2 queries.
              </p>
            </div>
            <div className="border-t border-border" />
            <p className="text-text-muted text-sm italic">
              + 8 more findings with severity, category, and specific fix recommendations…
            </p>
          </div>
        </div>
      </section>

      {/* What AI won't tell you */}
      <section data-animate="section" className="mb-20">
        <div className="bg-surface-2 rounded-[12px] border border-border p-7 sm:p-9 max-w-[700px]">
          <h3 className="font-display text-[22px] leading-[1.3] mb-4">
            What AI won't tell you about your code
          </h3>
          <p className="text-text-secondary leading-[1.7] mb-4">
            AI tools are great at generating code. They're terrible at evaluating
            it. Your AI assistant will never say "this authentication pattern has
            a race condition" or "this database schema won't survive 1,000
            concurrent users." It generated the code — it thinks it's fine.
          </p>
          <p className="text-text-secondary leading-[1.7]">
            A vibe code audit is the second opinion your AI can't give you. I've
            spent 12+ years building and breaking production systems. I know what
            fails at scale because I've been the one debugging it at 2am.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          Questions
        </h2>
        <div className="max-w-[700px] space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-[16px] mb-2">{faq.q}</h3>
              <p className="text-text-secondary text-sm leading-[1.65]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border my-10" />
      <section data-animate="section" className="py-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <img
            src="/headshot2.webp"
            alt="Alex Price"
            className="w-28 h-28 rounded-full object-cover shrink-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-2">
              Get your code audited
            </h2>
            <p className="text-text-secondary mb-4">
              Send me your repo link. You'll have the report within 3 working days.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Vibe%20Code%20Audit&body=Hi%20Alex%2C%0A%0AI%27d%20like%20a%20code%20audit%20for%20my%20project.%0A%0AHere%27s%20what%20I%27m%20building%3A%20%5Bbrief%20description%5D%0ARepo%3A%20%5Blink%5D`}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-accent text-white font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="text-text-muted text-sm hidden sm:inline">
                or
              </span>
              <a
                href="https://wa.me/447356066058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 text-text-secondary border border-text-muted font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:text-text-primary hover:border-text-secondary transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  <path d="M8 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
                </svg>
                WhatsApp me
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
```

**Step 2: Commit**

```bash
git add src/server/templates/vibe-code-audit.tsx
git commit -m "Add Vibe Code Audit landing page

£150 flat fee audit product. Includes what-you-get grid, who-this-is-for/
isn't-for, sample report mockup with severity badges, what-AI-won't-tell-you
section, FAQ, and email+WhatsApp CTA."
```

---

## Task 7: Common Issues Page + Checklist JS

Create the free resources page at /common-issues with Health Score self-assessment checklist and interactive client-side counter.

**Files:**
- Create: `src/server/templates/common-issues.tsx`
- Modify: `src/client/main.ts` (add checklist counter, gated behind `data-page`)

**Context:** This is the top-of-funnel free resource page. It has a Health Score framework with 5 dimensions, 10 issue cards, and an interactive self-assessment checklist. The checklist uses custom-styled checkboxes. A JS counter shows "X of 10 checked" and reveals a CTA when 3+ items are checked.

**Step 1: Create `src/server/templates/common-issues.tsx`**

```tsx
import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

const healthDimensions = [
  { name: "Security", description: "Authentication, authorization, secrets, input validation" },
  { name: "Architecture", description: "Database design, API structure, separation of concerns" },
  { name: "Performance", description: "Query efficiency, caching, asset optimization" },
  { name: "Reliability", description: "Error handling, edge cases, failure recovery" },
  { name: "Maintainability", description: "Code organization, naming, complexity management" },
];

const issueCards = [
  {
    category: "Security",
    severity: "critical",
    title: "API keys in client-side code",
    description:
      "AI tools frequently place secret keys and database credentials in client-accessible files. Anyone viewing your page source can see them.",
    fix: "Move all secrets to server-side environment variables. Never import them in client-facing code.",
  },
  {
    category: "Security",
    severity: "critical",
    title: "No input validation on API endpoints",
    description:
      "AI-generated APIs often trust all incoming data. Without validation, attackers can inject SQL, access other users' data, or crash your server.",
    fix: "Validate and sanitize all user input at the API boundary. Use a schema validation library like Zod.",
  },
  {
    category: "Architecture",
    severity: "warning",
    title: "Business logic in API route handlers",
    description:
      "AI tools tend to put everything in one file. When your route handler does validation, database queries, email sending, and response formatting, it becomes impossible to test or reuse.",
    fix: "Extract business logic into service functions. Route handlers should only parse requests and return responses.",
  },
  {
    category: "Architecture",
    severity: "warning",
    title: "No database migrations",
    description:
      "AI tools often modify database schemas directly. Without migrations, you can't reproduce your database state, roll back changes, or deploy reliably.",
    fix: "Use a migration tool (Prisma, Drizzle, Knex). Every schema change should be a versioned migration file.",
  },
  {
    category: "Performance",
    severity: "warning",
    title: "N+1 database queries",
    description:
      "The most common performance killer in AI-generated code. Loading a list of items, then making a separate query for each item's related data.",
    fix: "Use JOINs, eager loading, or batch queries. If you're making queries in a loop, it's probably an N+1.",
  },
  {
    category: "Performance",
    severity: "info",
    title: "No database indexes on filtered columns",
    description:
      "AI tools create tables but rarely add indexes. Without them, every query scans the entire table. Fine with 100 rows, unusable with 100,000.",
    fix: "Add indexes on columns you filter, sort, or join on. Start with foreign keys and any column in a WHERE clause.",
  },
  {
    category: "Reliability",
    severity: "warning",
    title: "No error boundaries or fallback UI",
    description:
      "When an API call fails or a component throws, the entire page crashes with a white screen. AI tools rarely generate error handling.",
    fix: "Add try/catch around API calls, error boundaries around React components, and loading/error states for all async data.",
  },
  {
    category: "Reliability",
    severity: "info",
    title: "Hardcoded configuration values",
    description:
      "URLs, feature flags, and limits scattered as string literals throughout the code. Works in development, breaks when you deploy.",
    fix: "Centralize configuration in environment variables or a config module. Different values per environment.",
  },
  {
    category: "Maintainability",
    severity: "info",
    title: "500+ line components",
    description:
      "AI tools generate everything in one file because they optimize for single-prompt output. The result is unmaintainable monoliths.",
    fix: "Break components into focused pieces. If you can't describe what a component does in one sentence, it's doing too much.",
  },
  {
    category: "Maintainability",
    severity: "warning",
    title: "No TypeScript or loose types everywhere",
    description:
      "AI tools often use 'any' or skip types entirely. This means your editor can't catch bugs, and refactoring becomes guesswork.",
    fix: "Enable strict TypeScript. Define types for your API responses, database models, and component props.",
  },
];

const checklistItems = [
  "All API keys and secrets are in environment variables, not in client code",
  "Every API endpoint validates its input before processing",
  "Database schema changes are tracked with migration files",
  "No database queries inside loops (no N+1 patterns)",
  "Filtered and sorted columns have database indexes",
  "All API calls have error handling with user-facing fallback UI",
  "Configuration values come from environment variables, not hardcoded strings",
  "No single file is longer than 300 lines",
  "TypeScript strict mode is enabled with no 'any' types",
  "You can deploy to a new environment without changing any code",
];

const severityStyles: Record<string, { bg: string; text: string; border: string; label: string }> = {
  critical: {
    bg: "bg-[rgba(197,48,48,0.08)]",
    text: "text-[#C53030]",
    border: "border-[rgba(197,48,48,0.2)]",
    label: "Critical",
  },
  warning: {
    bg: "bg-[rgba(161,98,7,0.08)]",
    text: "text-[#A16207]",
    border: "border-[rgba(161,98,7,0.2)]",
    label: "Warning",
  },
  info: {
    bg: "bg-[rgba(43,108,176,0.08)]",
    text: "text-[#2B6CB0]",
    border: "border-[rgba(43,108,176,0.2)]",
    label: "Info",
  },
};

export const CommonIssues = () => (
  <Layout
    title="Common Issues"
    description="The 10 most common problems in AI-generated code. Free self-assessment checklist to check your code's health."
    name="common-issues"
    path="/common-issues"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      {/* Hero */}
      <header className="mb-20">
        <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
          Free resource
        </span>
        <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4 max-w-[900px]">
          10 things AI tools get wrong in your codebase
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
          The most common security, performance, and architecture issues I find
          in AI-generated code. Check yours for free.
        </p>
      </header>

      {/* Health Score Framework */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          The Code Health Score
        </h2>
        <p className="text-text-secondary leading-[1.7] max-w-[700px] mb-8">
          I evaluate every codebase across five dimensions. Most AI-built
          applications score well on maintainability (the code runs) but poorly
          on security and reliability (it runs until someone pokes it).
        </p>
        <div data-animate="stagger" className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {healthDimensions.map((dim) => (
            <div
              key={dim.name}
              className="bg-surface-1 rounded-[12px] border border-border p-5 text-center"
            >
              <h3 className="font-display text-[16px] font-semibold mb-1">
                {dim.name}
              </h3>
              <p className="text-text-muted text-xs leading-[1.5]">
                {dim.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Issue Cards */}
      <section className="mb-20">
        <h2
          data-animate="section"
          className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8"
        >
          The 10 most common issues
        </h2>
        <div data-animate="stagger" className="space-y-6 max-w-[700px]">
          {issueCards.map((issue, i) => {
            const severity = severityStyles[issue.severity];
            return (
              <div
                key={issue.title}
                className="bg-surface-1 rounded-[12px] border border-border p-7"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[13px] text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`inline-block font-mono text-[11px] tracking-[0.06em] uppercase ${severity.bg} ${severity.text} px-3 py-1 rounded-full border ${severity.border}`}
                  >
                    {severity.label}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                    {issue.category}
                  </span>
                </div>
                <h3 className="font-semibold text-[16px] mb-2">
                  {issue.title}
                </h3>
                <p className="text-text-secondary text-sm leading-[1.65] mb-3">
                  {issue.description}
                </p>
                <p className="text-sm leading-[1.65]">
                  <strong className="text-text-primary">Fix: </strong>
                  <span className="text-text-secondary">{issue.fix}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Self-Assessment Checklist */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          Quick self-assessment
        </h2>
        <p className="text-text-secondary leading-[1.7] max-w-[700px] mb-8">
          Check off each item that's true for your codebase. Be honest — the
          only person you're fooling is yourself.
        </p>
        <div className="max-w-[700px]" data-checklist>
          <div className="space-y-3">
            {checklistItems.map((item, i) => (
              <label
                key={i}
                className="flex items-start gap-4 bg-surface-1 rounded-[12px] border border-border p-5 cursor-pointer hover:border-border-hover transition-colors duration-200 group"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  data-checklist-item
                />
                <span className="shrink-0 w-5 h-5 mt-0.5 rounded border-2 border-text-muted/30 flex items-center justify-center transition-all duration-200 peer-checked:group-[]:bg-accent peer-checked:group-[]:border-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white opacity-0 peer-checked:group-[]:opacity-100 transition-opacity duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-text-secondary text-sm leading-[1.65] peer-checked:group-[]:text-text-primary transition-colors duration-200">
                  {item}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="font-mono text-[13px] text-text-muted" data-checklist-counter>
              0 of 10 checked
            </p>
          </div>
          <div
            className="mt-8 bg-accent rounded-[12px] p-6 sm:p-8 hidden"
            data-checklist-cta
          >
            <p className="text-white font-semibold mb-2">
              Fewer than 7? Your code might need a professional look.
            </p>
            <p className="text-white/70 text-sm mb-4">
              The self-assessment catches the obvious issues. A Vibe Code Audit
              catches the ones you didn't know to look for.
            </p>
            <a
              href="/vibe-code-audit"
              className="inline-flex items-center justify-center bg-white text-accent font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Get your code audited — £150
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border my-10" />
      <section data-animate="section" className="py-12">
        <div className="max-w-[700px]">
          <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-2">
            Want the full picture?
          </h2>
          <p className="text-text-secondary mb-6">
            This page covers the top 10 issues. A Vibe Code Audit covers
            everything — security, architecture, performance, and reliability —
            with a written report and walkthrough call.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="/vibe-code-audit"
              className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
            >
              Get your code audited — £150
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
            >
              Ask me anything
            </a>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);
```

**Step 2: Add checklist counter JS to `src/client/main.ts`**

Add the following AFTER the existing `initScrollAnimations()` and `initHoverParallax()` calls at the bottom of the file:

```typescript
// Checklist counter (common-issues page only)
if (document.body.dataset.page === "common-issues") {
  const checklist = document.querySelector("[data-checklist]");
  if (checklist) {
    const items = checklist.querySelectorAll<HTMLInputElement>(
      "[data-checklist-item]",
    );
    const counter = checklist.querySelector("[data-checklist-counter]");
    const cta = checklist.querySelector("[data-checklist-cta]");
    const total = items.length;

    function updateCount() {
      const checked = checklist!.querySelectorAll<HTMLInputElement>(
        "[data-checklist-item]:checked",
      ).length;
      if (counter) {
        counter.textContent = `${checked} of ${total} checked`;
      }
      if (cta) {
        if (checked >= 3) {
          cta.classList.remove("hidden");
        } else {
          cta.classList.add("hidden");
        }
      }
    }

    for (const item of items) {
      item.addEventListener("change", updateCount);
    }
  }
}
```

**Step 3: Fix custom checkbox CSS peer selectors**

The checkbox template uses `peer-checked:group-[]:` syntax. This needs the hidden input to be a sibling of the visual checkbox span. Verify this works in the browser — if the Tailwind `peer` variant doesn't cross the label boundary correctly, we may need to adjust the markup to use explicit state classes toggled by JS instead. The `sr-only` input and the visual span are direct siblings inside the label, so `peer` should work.

**Step 4: Verify in browser**

This page won't have a route yet (Task 8), but you can verify the template compiles by checking that `bun run build:js` succeeds without errors.

Run: `bun run build:js`
Expected: No TypeScript errors

**Step 5: Commit**

```bash
git add src/server/templates/common-issues.tsx src/client/main.ts
git commit -m "Add Common Issues page with self-assessment checklist

10 issue cards with severity badges, Health Score framework,
interactive checklist with JS counter. CTA reveals at 3+ checks.
Top-of-funnel free resource driving to /vibe-code-audit."
```

---

## Task 8: Route Registration + Minor Copy Updates

Wire up the 3 new routes and make minor copy adjustments to existing pages.

**Files:**
- Modify: `src/server/routes/views.tsx` (add 3 routes + imports)
- Modify: `src/server/templates/work-with-me.tsx` (pricing update, minor copy)
- Modify: `src/server/templates/insight.tsx` (button text color fix)

**Step 1: Update `src/server/routes/views.tsx`**

Add imports at the top (after existing imports):

```typescript
import { About } from "../templates/about";
import { CommonIssues } from "../templates/common-issues";
import { VibeCodeAudit } from "../templates/vibe-code-audit";
```

Add routes to the `viewRoutes` object (before the closing `}`):

```typescript
"/about": withTracking(() => render(<About />)),
"/vibe-code-audit": withTracking(() => render(<VibeCodeAudit />)),
"/common-issues": withTracking(() => render(<CommonIssues />)),
```

**Step 2: Update work-with-me.tsx pricing copy**

In `src/server/templates/work-with-me.tsx`, the description on line 7 says `£150/hr`. This should stay as-is because the How It Works page shows the hourly consulting at £150/hr (pay-as-you-go) and £125/hr (package). The £150 flat fee is for the audit product, which is a different page.

However, update the CTA button text color from `text-[#0C0C0C]` to `text-white` in the CTA section (line 291):

```tsx
className="inline-flex items-center justify-center w-full sm:w-auto bg-accent text-white font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
```

**Step 3: Fix insight.tsx button text color**

In `src/server/templates/insight.tsx` line 66, change `text-[#0C0C0C]` to `text-white`:

```tsx
className="inline-flex items-center bg-accent text-white font-ui font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
```

**Step 4: Verify all new routes in browser**

Open each URL in BrowserMCP:
- `http://localhost:3000/about` — should show Alex's bio and Dennis testimonial
- `http://localhost:3000/vibe-code-audit` — should show audit landing page
- `http://localhost:3000/common-issues` — should show issue cards and checklist
- `http://localhost:3000/how-it-works` — should still work
- `http://localhost:3000` — all CTAs should link correctly

Test the checklist: check 3+ items, confirm the counter updates and CTA appears.

**Step 5: Commit**

```bash
git add src/server/routes/views.tsx src/server/templates/work-with-me.tsx src/server/templates/insight.tsx
git commit -m "Register new routes and fix button text colors

Add /about, /vibe-code-audit, /common-issues routes.
Fix accent button text from hardcoded #0C0C0C to white per DESIGN.md."
```

---

## Task 9: OG Image Scripts Rewrite

Rewrite both OG image generators to use the new design tokens. This is a **launch blocker**.

**Files:**
- Modify: `tools/generate-site-og.ts` (full HTML template rewrite + CLI arg support)
- Modify: `tools/generate-og-images.ts` (full HTML template rewrite)

**Context:** Both scripts use Puppeteer to render HTML → screenshot. The HTML templates need to change from dark-mode gold-accent (Instrument Sans/Serif + Geist Mono, `#0C0C0C` bg, `#C9A96E` accent) to warm light-mode terracotta (General Sans + Lora + Commit Mono, `#F4F0E8` bg, `#BF5540` accent).

Key risk: Fontshare CDN (General Sans) must load in Puppeteer headless. Test this first. If it doesn't load, fall back to Google Fonts only (use DM Sans as display fallback).

**Step 1: Rewrite `tools/generate-site-og.ts`**

Replace the entire file with:

```typescript
/**
 * Generates OG images (1200x630) for the site.
 *
 * Usage:
 *   bun run tools/generate-site-og.ts              → generates default site OG
 *   bun run tools/generate-site-og.ts vibe-code-audit → generates audit page OG
 *   bun run tools/generate-site-og.ts common-issues   → generates common issues OG
 *
 * Renders a branded card using Puppeteer, saves to public/.
 */

import { join } from "node:path";
import puppeteer from "puppeteer-core";

interface OGVariant {
  outputPath: string;
  label: string;
  title: string;
  tagline: string;
  services: string[];
  footerLeft: string;
  footerRight: string;
}

const variants: Record<string, OGVariant> = {
  default: {
    outputPath: "public/og-image.png",
    label: "Technical Consulting",
    title: "Backseat CTO",
    tagline:
      'Senior technical help, <em>by the hour.</em><br>Architecture, security &amp; honest guidance.',
    services: ["Architecture", "Security", "Code Review", "AI Guidance"],
    footerLeft: "backseatcto.com",
    footerRight: "From £75 / session",
  },
  "vibe-code-audit": {
    outputPath: "public/og-vibe-code-audit.png",
    label: "Vibe Code Audit",
    title: "Backseat CTO",
    tagline:
      'You built it with AI.<br>I\'ll tell you if it\'s <em>going to hold up.</em>',
    services: ["Security", "Architecture", "Performance", "Code Quality"],
    footerLeft: "backseatcto.com",
    footerRight: "£150 flat fee",
  },
  "common-issues": {
    outputPath: "public/og-common-issues.png",
    label: "Free Resource",
    title: "Backseat CTO",
    tagline:
      '10 things AI tools <em>get wrong</em><br>in your codebase.',
    services: ["Security", "Architecture", "Performance", "Reliability"],
    footerLeft: "backseatcto.com",
    footerRight: "Free self-assessment",
  },
};

function buildHTML(variant: OGVariant): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #888;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .og {
      width: 1200px;
      height: 630px;
      background: #F4F0E8;
      position: relative;
      overflow: hidden;
    }

    .og-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #BF5540 0%, transparent 80%);
      opacity: 0.6;
    }

    .og-label {
      position: absolute;
      top: 48px;
      left: 72px;
      font-family: 'Commit Mono', monospace;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #BF5540;
      background: rgba(191, 85, 64, 0.1);
      padding: 10px 24px;
      border-radius: 999px;
    }

    .og-name {
      position: absolute;
      top: 130px;
      left: 72px;
      right: 72px;
      font-family: 'General Sans', sans-serif;
      font-size: 96px;
      line-height: 1.0;
      letter-spacing: -0.03em;
      color: #1A1714;
      font-weight: 700;
    }

    .og-tagline {
      position: absolute;
      top: 250px;
      left: 72px;
      right: 200px;
      font-family: 'Lora', serif;
      font-size: 32px;
      line-height: 1.4;
      color: #4A4540;
      font-weight: 400;
    }

    .og-tagline em {
      color: #1A1714;
      font-style: italic;
      font-weight: 600;
    }

    .og-services {
      position: absolute;
      bottom: 100px;
      left: 72px;
      display: flex;
      gap: 16px;
    }

    .og-services span {
      font-family: 'Commit Mono', monospace;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #8A837A;
      padding: 8px 20px;
      border: 1px solid rgba(26, 23, 20, 0.12);
      border-radius: 999px;
    }

    .og-footer {
      position: absolute;
      left: 72px;
      bottom: 44px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .og-footer .site {
      font-family: 'General Sans', sans-serif;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #BF5540;
    }

    .og-footer .sep {
      width: 2px;
      height: 20px;
      background: rgba(26, 23, 20, 0.15);
    }

    .og-footer .price {
      font-family: 'General Sans', sans-serif;
      font-size: 26px;
      font-weight: 500;
      color: #1A1714;
    }
  </style>
</head>
<body>
  <div class="og" id="site-og">
    <div class="og-accent"></div>
    <div class="og-label">${variant.label}</div>
    <div class="og-name">${variant.title}</div>
    <div class="og-tagline">${variant.tagline}</div>
    <div class="og-services">
      ${variant.services.map((s) => `<span>${s}</span>`).join("\n      ")}
    </div>
    <div class="og-footer">
      <span class="site">${variant.footerLeft}</span>
      <span class="sep"></span>
      <span class="price">${variant.footerRight}</span>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const arg = process.argv[2] ?? "default";
  const variant = variants[arg];
  if (!variant) {
    process.stderr.write(
      `Unknown variant "${arg}". Available: ${Object.keys(variants).join(", ")}\n`,
    );
    process.exit(1);
  }

  const html = buildHTML(variant);
  const outputPath = join(import.meta.dir, "..", variant.outputPath);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // Wait for fonts to load
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, 8000);
        document.fonts.ready.then(() => {
          clearTimeout(timeout);
          resolve();
        });
      }),
  );
  await new Promise((r) => setTimeout(r, 1000));

  const element = await page.$("#site-og");
  if (!element) {
    process.stderr.write("Could not find OG element\n");
    process.exit(1);
  }

  await element.screenshot({ path: outputPath, type: "png" });
  process.stdout.write(`Generated: ${outputPath}\n`);

  await browser.close();
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
```

**Step 2: Rewrite `tools/generate-og-images.ts` HTML template**

Replace the `buildHTML` function and its CSS. Keep the `getArticles`, `titleFontSize`, `ensureImageFrontmatter`, and `main` functions as-is — only the HTML/CSS template changes.

The CSS changes mirror the site OG script:
- Background: `#0C0C0C` → `#F4F0E8`
- Accent bar/pillar badge: `#C9A96E` → `#BF5540`
- Title font: `Instrument Serif` → `General Sans` weight 700
- Footer: `alexprice.dev` → `backseatcto.com`, `Alex Price` → `Alex Price` (keep author name)
- Text colors: `#E8E3DD` → `#1A1714`, `#A8A29E` → `#4A4540`
- Font loading: Instrument Sans/Serif/Geist Mono → General Sans (Fontshare) + Commit Mono (Google)

The full replacement for the `buildHTML` function:

```typescript
function buildHTML(articles: Article[]): string {
  const cards = articles
    .map(
      (a) => `
    <div class="og" id="${a.slug}">
      <div class="og-accent"></div>
      <div class="og-pillar">${a.pillar}</div>
      <div class="og-title" style="font-size: ${titleFontSize(a.title)}px">${a.title}</div>
      <div class="og-footer">
        <span class="author">Alex Price</span>
        <span class="sep"></span>
        <span class="site">backseatcto.com</span>
      </div>
    </div>
  `,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #888;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 40px;
    }

    .og {
      width: 1200px;
      height: 630px;
      background: #F4F0E8;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }

    .og-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #BF5540 0%, transparent 80%);
      opacity: 0.6;
    }

    .og-pillar {
      position: absolute;
      top: 48px;
      left: 72px;
      font-family: 'Commit Mono', monospace;
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #BF5540;
      background: rgba(191, 85, 64, 0.1);
      padding: 12px 28px;
      border-radius: 999px;
    }

    .og-title {
      position: absolute;
      left: 72px;
      right: 72px;
      bottom: 130px;
      font-family: 'General Sans', sans-serif;
      font-size: 92px;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: #1A1714;
      font-weight: 700;
    }

    .og-footer {
      position: absolute;
      left: 72px;
      bottom: 48px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .og-footer .author {
      font-family: 'General Sans', sans-serif;
      font-size: 34px;
      font-weight: 600;
      color: #1A1714;
    }

    .og-footer .sep {
      width: 2px;
      height: 24px;
      background: rgba(26, 23, 20, 0.15);
    }

    .og-footer .site {
      font-family: 'General Sans', sans-serif;
      font-size: 32px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #BF5540;
    }
  </style>
</head>
<body>
${cards}
</body>
</html>`;
}
```

**Step 3: Test Fontshare loading in Puppeteer**

Run the site OG generator first to verify Fontshare loads:

```bash
bun run tools/generate-site-og.ts
```

Open `public/og-image.png` and verify General Sans is rendering (tight geometric sans-serif, NOT a serif or generic sans). If it falls back to a system font, we'll need to embed the font as base64.

**Step 4: Generate all OG images**

```bash
bun run tools/generate-site-og.ts
bun run tools/generate-site-og.ts vibe-code-audit
bun run tools/generate-site-og.ts common-issues
bun run tools/generate-og-images.ts
```

**Step 5: Update layouts.tsx to reference new OG images for specific pages**

In the vibe-code-audit and common-issues templates, add `ogImage` prop to the Layout:

In `src/server/templates/vibe-code-audit.tsx`, update the Layout props:
```tsx
ogImage="/og-vibe-code-audit.png"
```

In `src/server/templates/common-issues.tsx`, update the Layout props:
```tsx
ogImage="/og-common-issues.png"
```

**Step 6: Commit**

```bash
git add tools/generate-site-og.ts tools/generate-og-images.ts public/og-image.png public/og-vibe-code-audit.png public/og-common-issues.png public/insights-images/ src/server/templates/vibe-code-audit.tsx src/server/templates/common-issues.tsx
git commit -m "Rewrite OG image scripts with new design tokens and generate all images

Both scripts updated: warm paper bg (#F4F0E8), terracotta accent (#BF5540),
General Sans + Commit Mono fonts. Site OG now supports CLI args for
vibe-code-audit and common-issues variants. Article OG images regenerated."
```

---

## Task 10: QA Grep + Final Verification

Scan the entire codebase for stale references to the old brand/domain.

**Files:** None modified — this is a verification task.

**Step 1: Grep for stale domain references**

```bash
grep -r "alexprice\.dev" src/ tools/ --include="*.ts" --include="*.tsx"
```

Expected: Zero results. If any found, fix them.

**Step 2: Grep for old brand in titles/copy**

```bash
grep -r "Alex Price" src/ --include="*.ts" --include="*.tsx"
```

Expected: Should only appear in content where Alex is referenced as a person (about page bio, article author, headshot alt text, JSON-LD author). Should NOT appear in titles, og:site_name, nav, or brand contexts.

**Step 3: Grep for old design tokens**

```bash
grep -r "#C9A96E\|#0C0C0C\|Instrument Sans\|Instrument Serif\|Geist Mono" src/ tools/ --include="*.ts" --include="*.tsx" --include="*.css"
```

Expected: Zero results.

**Step 4: Grep for old button text color**

```bash
grep -r "text-\[#0C0C0C\]" src/ --include="*.tsx"
```

Expected: Zero results. All accent buttons should use `text-white`.

**Step 5: Verify build succeeds**

```bash
bun run build
```

Expected: Clean build, no errors.

**Step 6: Full browser QA**

Use BrowserMCP to visit every page and verify visuals match DESIGN.md:
- `/` — Home
- `/about` — About
- `/vibe-code-audit` — Audit landing page
- `/common-issues` — Free resource + checklist
- `/how-it-works` — Pricing and process
- `/insights` — Article list
- `/projects` — Project cards

**Step 7: Commit (only if fixes were needed)**

```bash
git add -A
git commit -m "Fix stale brand references found during QA grep"
```

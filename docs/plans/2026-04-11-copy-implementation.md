# Copy Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite all site copy around the "It's not a side project anymore" narrative, kill unused pages, and update navigation.

**Architecture:** Server-side rendered JSX templates. Copy lives in `src/server/templates/*.tsx`. Routes in `src/server/routes/views.tsx`. Nav in `src/server/components/nav.tsx`. No client-side React — templates render to HTML strings.

**Tech Stack:** Bun, React (SSR only), Tailwind CSS v4, TypeScript strict mode

**Design doc:** `docs/plans/2026-04-11-copy-redesign.md`

---

### Task 1: Update navigation

Remove "Home", "Insights", and "How it works" links. Keep "Common Issues" and "About".

**Files:**
- Modify: `src/server/components/nav.tsx:1-7`

**Step 1: Update navLinks array**

Replace lines 1-7 of `src/server/components/nav.tsx`:

```tsx
const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/common-issues", label: "Common Issues", name: "common-issues" },
  { href: "/how-it-works", label: "How it works", name: "how-it-works" },
  { href: "/about", label: "About", name: "about" },
];
```

With:

```tsx
const navLinks = [
  { href: "/common-issues", label: "Common Issues", name: "common-issues" },
  { href: "/about", label: "About", name: "about" },
];
```

**Step 2: Verify build passes**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bun run build:css && bun run build:js`
Expected: No errors

**Step 3: Visually verify nav in browser**

Use browse tool to check `http://localhost:3000` — nav should show: `backseatcto | Common Issues | About | Get your code audited`

**Step 4: Commit**

```bash
git add src/server/components/nav.tsx
git commit -m "refactor: simplify nav to Common Issues, About, and audit CTA"
```

---

### Task 2: Update routes — kill unused pages, add redirects

Remove projects route, redirect how-it-works and work-with-me to homepage, remove unused imports.

**Files:**
- Modify: `src/server/routes/views.tsx`

**Step 1: Update imports and routes**

Replace the full content of `src/server/routes/views.tsx` with:

```tsx
import type { JSX } from "react";
import { renderToString } from "react-dom/server";
import { withTracking } from "../services/analytics";
import { getAllArticles, getArticleBySlug } from "../services/articles";
import { About } from "../templates/about";
import { CommonIssues } from "../templates/common-issues";
import { Home } from "../templates/home";
import { Insight } from "../templates/insight";
import { Insights } from "../templates/insights";
import { VibeCodeAudit } from "../templates/vibe-code-audit";

const render = (element: JSX.Element): Response =>
  new Response(`<!DOCTYPE html>${renderToString(element)}`, {
    headers: { "Content-Type": "text/html" },
  });

const notFound = (): Response => new Response("Not found", { status: 404 });

export const viewRoutes = {
  "/": withTracking(() => render(<Home />)),
  "/in": withTracking(() => Response.redirect("/", 302), "linkedin"),
  "/insights": withTracking(() => {
    const articles = getAllArticles();
    return render(<Insights articles={articles} />);
  }),
  "/insights/:slug": withTracking((req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/insights/", "");
    const article = getArticleBySlug(slug);
    if (!article) {
      return notFound();
    }
    return render(<Insight article={article} />);
  }),
  "/how-it-works": withTracking(
    () => Response.redirect("/", 301),
    "how-it-works-redirect",
  ),
  "/work-with-me": withTracking(
    () => Response.redirect("/", 301),
    "work-with-me-redirect",
  ),
  "/projects": withTracking(
    () => Response.redirect("/", 301),
    "projects-redirect",
  ),
  "/about": withTracking(() => render(<About />)),
  "/vibe-code-audit": withTracking(() => render(<VibeCodeAudit />)),
  "/common-issues": withTracking(() => render(<CommonIssues />)),
};
```

**Step 2: Run linter**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx @biomejs/biome check src`
Expected: No errors

**Step 3: Commit**

```bash
git add src/server/routes/views.tsx
git commit -m "refactor: redirect how-it-works, work-with-me, projects to homepage"
```

---

### Task 3: Rewrite homepage copy

Full rewrite of `home.tsx` with the "It's not a side project anymore" narrative. Six sections: hero, tension, who I am, when to bring me in, how it works + social proof, final CTA.

**Files:**
- Modify: `src/server/templates/home.tsx` (full rewrite)

**Step 1: Rewrite home.tsx**

Replace the entire content of `src/server/templates/home.tsx` with the following. Note: preserve all existing Tailwind classes and component patterns from the current file. The layout structure (hero, sections with `data-animate`, horizontal rules, final CTA block) stays the same — only the copy and section order changes.

```tsx
import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

export const Home = () => (
  <Layout
    title="Home"
    description="The Backseat CTO. Architecture reviews, vibe code audits, and technical guidance for founders building with AI. From £75/session."
    name="home"
  >
    {/* Hero */}
    <section className="min-h-[70vh] md:min-h-[85vh] flex flex-col justify-end pt-28 md:pt-28 pb-16 md:pb-24 px-6 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Headline — full width, poster-scale */}
        <div className="mb-8">
          <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
            Backseat CTO
          </span>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1] tracking-[-0.03em] max-w-[900px]">
            It's not a side project anymore.
          </h1>
        </div>

        {/* Sub-hero: intro + metrics in a single row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          <div className="max-w-lg">
            <p className="text-text-secondary text-lg lg:text-xl leading-relaxed mb-4">
              I'm{" "}
              <a
                href="/about"
                className="text-text-primary hover:text-accent transition-colors duration-200"
              >
                Alex Price
              </a>
              , the Backseat CTO. I help founders who built with AI make sure
              their code is ready for what comes next.
            </p>
            <p className="text-lg lg:text-xl leading-relaxed mb-8">
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
                href="#how-it-works"
                className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Metrics — right-aligned, vertical stack */}
          <div
            data-animate="stagger"
            className="flex flex-wrap md:flex-col gap-x-8 gap-y-6 md:gap-6 md:items-end md:text-right shrink-0"
          >
            {[
              { value: "12+", label: "Years Building" },
              { value: "80+", label: "Team Scaled To" },
              { value: "#8", label: "LinkedIn Top UK" },
              { value: "18k", label: "B2B Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[28px] md:text-[32px] text-text-primary leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* The tension — editorial body copy, no heading */}
    <section className="py-24 lg:py-32 px-6">
      <div data-animate="section" className="max-w-[700px] mx-auto lg:mx-[max(calc((100%-1200px)/2+0px),2rem)]">
        <div className="space-y-6 text-lg lg:text-xl text-text-secondary leading-relaxed">
          <p>
            You used Cursor or Bolt or Lovable and built something that actually
            works. People signed up. Someone paid you. You're not prototyping
            anymore — you're running a business.
          </p>
          <p>
            And the code underneath? It was built to see if the idea worked. Now
            the idea works, and you're wondering: is the foundation solid enough
            for what comes next?
          </p>
          <p className="text-text-primary font-medium">
            You don't need a CTO. You need someone who's done this before to
            take a look.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* Who I am */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <span
          data-animate="section"
          className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6"
        >
          Backseat CTO
        </span>
        <h2
          data-animate="section"
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-8 max-w-[700px]"
        >
          A second pair of eyes from someone who's been there
        </h2>
        <div
          data-animate="section"
          className="max-w-[700px] space-y-6 text-lg text-text-secondary leading-relaxed"
        >
          <p>
            I'm Alex Price. I've spent 12 years building production systems,
            scaling engineering teams to 80+, and learning what breaks when
            things get real. I don't need to join your company. I just need to
            look at your code and tell you what I see.
          </p>
          <p>
            Architecture decisions. Security blind spots. The things AI tools
            generate but can't evaluate. One honest conversation is usually
            enough to know where you stand.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* When to bring me in */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2
          data-animate="section"
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-12"
        >
          Two common starting points
        </h2>
        <div
          data-animate="stagger"
          className="bg-surface-1 rounded-[12px] border border-border overflow-hidden"
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-8 sm:p-10">
              <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
                Getting started
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.3] tracking-[-0.01em] mb-4">
                You're building and you've hit a wall
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.7] mb-4">
                You can't prompt your way past it. The AI keeps going in
                circles. You need someone to look at the whole picture and tell
                you which direction to go.
              </p>
              <ul className="space-y-2 text-text-secondary leading-[1.7] text-[15px]">
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Architecture decisions that feel too big to guess
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Code that works but feels fragile
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  "Am I doing this right?"
                </li>
              </ul>
            </div>
            <div className="p-8 sm:p-10">
              <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
                Launch prep
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.3] tracking-[-0.01em] mb-4">
                You're about to go live
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.7] mb-4">
                It works in dev. But will it hold up with real users, real
                payments, real data? You need someone who knows what to check.
              </p>
              <ul className="space-y-2 text-text-secondary leading-[1.7] text-[15px]">
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Security and performance review
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Scalability and infrastructure
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Investor technical due diligence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* How it works */}
    <section id="how-it-works" className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          data-animate="sequence"
          className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-16"
        >
          <h2
            data-seq
            className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em]"
          >
            Three steps. No commitment.
          </h2>
          <p
            data-seq
            className="text-lg text-text-secondary leading-relaxed max-w-md"
          >
            No retainer. No onboarding. Just senior technical help when you
            need it.
          </p>
        </div>

        <div
          data-animate="stagger"
          className="grid md:grid-cols-3 rounded-[12px] border border-border overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border mb-16"
        >
          {[
            {
              num: "01",
              title: "Email me what you're building",
              text: "I reply within 24 hours with availability and whether I can help.",
            },
            {
              num: "02",
              title: "Share your code or context",
              text: "A repo link, screenshots, a Loom. The more context, the more value.",
            },
            {
              num: "03",
              title: "We talk. I write it up.",
              text: "A live session followed by a written summary: what to fix, what's fine, what to focus on next.",
            },
          ].map((step) => (
            <div key={step.num} className="bg-surface-1 p-8 sm:p-10">
              <span className="font-display text-accent text-[40px] leading-none block mb-6">
                {step.num}
              </span>
              <h3 className="font-display text-[20px] leading-[1.3] tracking-[-0.01em] mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.7]">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div data-animate="section" className="mb-16">
          <p className="font-mono text-[13px] tracking-[0.02em] text-text-muted">
            £75 / 30 min · £150 / hour · 20-hour package £2,500 (save £500)
          </p>
        </div>

        {/* Image break */}
        <img
          data-animate="section"
          src="/alex-working.webp"
          alt="Alex Price in a meeting"
          className="w-full aspect-[21/9] rounded-[12px] object-cover mb-16"
        />

        {/* Callout */}
        <div data-animate="section" className="max-w-[700px]">
          <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10">
            <p className="font-body text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.5] italic text-text-primary">
              I don't tell you what you want to hear. I tell you what's going to
              break, what's fine, and what to focus on next.
            </p>
          </blockquote>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* Social proof */}
    <section className="py-24 lg:py-32 px-6">
      <div
        data-animate="stagger"
        className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8"
      >
        <blockquote className="bg-surface-1 rounded-[12px] border border-border p-8 sm:p-10">
          <p className="text-[clamp(1rem,2vw,1.15rem)] leading-[1.7] italic text-text-secondary mb-8">
            "Alex helped me cut through the noise when I was building
            HelloRevenue. Clear, honest technical guidance that took us from
            early-stage uncertainty to production readiness. If you're a
            non-technical founder who needs a technical partner you can trust,
            Alex is your guy."
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

        <blockquote className="bg-surface-1 rounded-[12px] border border-border p-8 sm:p-10">
          <p className="text-[clamp(1rem,2vw,1.15rem)] leading-[1.7] italic text-text-secondary mb-8">
            "He brought rigour to our architecture and delivery, and freed us
            up to focus on clients and strategy. If you need senior technical
            leadership without the overhead of a full-time hire, Alex is your
            guy."
          </p>
          <footer className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Andrew Black
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                <span className="text-text-muted/70">CEO,</span>{" "}
                <a
                  href="https://naitiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dim transition-colors duration-200"
                >
                  Naitiv
                </a>
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* Final CTA */}
    <section
      data-animate="section"
      className="pt-24 lg:pt-32 pb-16 lg:pb-20 px-6"
    >
      <div className="max-w-[1200px] mx-auto bg-accent rounded-2xl p-8 sm:p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] tracking-[-0.03em] text-white mb-4">
            Not sure where to start?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Check it yourself</h3>
              <p className="text-white/70 text-sm mb-4">
                Ten common issues AI tools get wrong, with fixes you can apply
                today.
              </p>
              <a
                href="/common-issues"
                className="inline-flex items-center justify-center w-full bg-white/10 text-white border border-white/25 font-ui font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-200"
              >
                Free self-assessment
              </a>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">
                Get a professional audit — £150
              </h3>
              <p className="text-white/70 text-sm mb-4">
                I review your codebase and deliver a written report with a
                30-minute walkthrough.
              </p>
              <a
                href="/vibe-code-audit"
                className="inline-flex items-center justify-center w-full bg-white text-accent font-ui font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200"
              >
                Get your code audited
              </a>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            Or just{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white underline underline-offset-4 hover:text-white/80 transition-colors duration-200"
            >
              email me what you're building
            </a>
            . I'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);
```

**Step 2: Run linter**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx @biomejs/biome check src`
Expected: No errors

**Step 3: Build and verify**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bun run build:css && bun run build:js`
Expected: No errors

**Step 4: Visual QA in browser**

Use browse tool to check `http://localhost:3000`. Verify:
- Hero shows "It's not a side project anymore." with BACKSEAT CTO tag above
- Tension section is editorial body copy with no heading
- "A second pair of eyes" section appears with BACKSEAT CTO tag
- "Two common starting points" section with two cards
- "Three steps. No commitment." section with pricing line
- Two testimonial cards side by side
- Final CTA with two paths (free + paid)

**Step 5: Commit**

```bash
git add src/server/templates/home.tsx
git commit -m "feat: rewrite homepage copy — 'It's not a side project anymore'"
```

---

### Task 4: Rewrite Vibe Code Audit page copy

Update hero copy and headline. Keep existing structure and components — only change text content.

**Files:**
- Modify: `src/server/templates/vibe-code-audit.tsx`

**Step 1: Update hero section copy**

In `src/server/templates/vibe-code-audit.tsx`, replace the hero tag text (line 72):

Old:
```tsx
          Vibe Code Audit
```
New:
```tsx
          Vibe Code Audit · £150
```

Replace headline (line 75):
Old:
```tsx
          You built it with AI. I'll tell you if it's going to hold up.
```
New:
```tsx
          Find out what AI missed.
```

Replace subheading (lines 78-80):
Old:
```tsx
          A professional code audit for applications built with Cursor, Bolt,
          Lovable, and other AI tools. Security, architecture, performance —
          everything your AI assistant can't evaluate about its own work.
```
New:
```tsx
          A professional code review for apps built with Cursor, Bolt,
          Lovable, and other AI tools. Security, architecture, performance —
          everything your AI can't evaluate about its own work.
```

**Step 2: Update "What you get" items**

Replace the `auditIncludes` array (lines 4-35) with:

```tsx
const auditIncludes = [
  {
    title: "Security review",
    description:
      "Authentication, input validation, secrets management, data exposure.",
  },
  {
    title: "Architecture assessment",
    description:
      "Database design, API structure, will it scale past your first 1,000 users?",
  },
  {
    title: "Performance analysis",
    description:
      "N+1 queries, missing indexes, asset loading — the things that slow you down at scale.",
  },
  {
    title: "Code quality review",
    description:
      "Error handling, edge cases, the stuff AI generates but never tests.",
  },
  {
    title: "Written report",
    description:
      "Prioritized findings with severity ratings and fix recommendations.",
  },
  {
    title: "30-minute walkthrough",
    description:
      "We go through it together. You ask questions. You leave knowing exactly what to do.",
  },
];
```

**Step 3: Update "This is for you if" copy**

Replace line 134 ("You built your app with AI tools and aren't 100% sure what's under the hood"):
New: `You built with AI and you're not sure what's under the hood`

Replace line 139 ("You're about to launch and want someone senior to check it first"):
New: `You're about to launch and want a senior engineer to check your work`

Replace line 143 ("You're raising money and investors will ask about your tech"):
New: `Investors are going to ask about your tech and you want honest answers first`

Replace line 147 ("You want honest answers, not reassurance"):
New: `You want the truth, not reassurance`

**Step 4: Update "This isn't for you if" copy**

Replace line 158 ("You need someone to build it for you (try"):
New: `You need someone to build it for you — that's what`

Replace lines 171-172 ("You just want a certificate to show investors (this is real feedback, not a rubber stamp)"):
New: `You want a rubber stamp for investors`

Replace line 176 ("Your app is still at the idea stage with no code written yet"):
New: `You're still at the idea stage with no code yet`

**Step 5: Update "What the report looks like" heading**

Replace line 185 heading text:
Old: `What the report looks like`
New: `What a report looks like`

**Step 6: Update "What AI won't tell you" section copy**

Replace the section body (lines 243-254):

Old paragraph 1:
```
AI tools are great at generating code. They're terrible at evaluating it. Your AI assistant will never say "this authentication pattern has a race condition" or "this database schema won't survive 1,000 concurrent users." It generated the code — it thinks it's fine.
```
New paragraph 1:
```
AI tools are great at generating code. They're terrible at evaluating it. Your AI assistant will never say "this authentication pattern has a race condition" or "this database schema won't survive 1,000 concurrent users." It generated the code — it thinks it's fine.
```
(This stays the same.)

Old paragraph 2:
```
A vibe code audit is the second opinion your AI can't give you. I've spent 12+ years building and breaking production systems. I know what fails at scale because I've been the one debugging it at 2am.
```
New paragraph 2:
```
I've spent 12 years building and breaking production systems. I know what fails at scale because I've been the one fixing it at 2am. This audit is the second opinion your AI can't give you.
```

**Step 7: Update FAQ pricing reference**

In the `faqs` array, update the answer for "What if I need help fixing the issues?" (line 52):
Old: `I offer hourly consulting at £75/hr.`
New: `I offer hourly consulting at £150/hr.`

**Step 8: Update bottom CTA heading**

Replace the CTA heading (line 286):
Old: `Get your code audited`
New: `Your AI built it. Let's make sure it holds up.`

Replace the CTA description (lines 289-290):
Old: `Send me your repo link. You'll have the report within 3 working days.`
New: `Send me your repo link and a brief description. Report within 3 working days.`

**Step 9: Run linter and build**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx @biomejs/biome check src && bun run build:css && bun run build:js`
Expected: No errors

**Step 10: Visual QA**

Use browse tool to check `http://localhost:3000/vibe-code-audit`. Verify hero shows "Find out what AI missed." with updated tag and copy.

**Step 11: Commit**

```bash
git add src/server/templates/vibe-code-audit.tsx
git commit -m "feat: rewrite vibe code audit page copy"
```

---

### Task 5: Update Common Issues page copy

Minimal changes — update subheading and CTA copy only.

**Files:**
- Modify: `src/server/templates/common-issues.tsx`

**Step 1: Update hero subheading**

Replace lines 164-166:
Old:
```tsx
          The most common security, performance, and architecture issues I find
          in AI-generated code. Check yours for free.
```
New:
```tsx
          You built it fast. Here's what to check before it has to hold up.
```

**Step 2: Update CTA reveal copy**

Replace line 303:
Old:
```tsx
              Fewer than 7? Your code might need a professional look.
```
New:
```tsx
              The self-assessment catches the obvious stuff.
```

Replace lines 305-307:
Old:
```tsx
              The self-assessment catches the obvious issues. A Vibe Code Audit
              catches the ones you didn't know to look for.
```
New:
```tsx
              A Vibe Code Audit catches what you didn't know to look for.
```

**Step 3: Run linter and build**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx @biomejs/biome check src && bun run build:css && bun run build:js`
Expected: No errors

**Step 4: Visual QA**

Use browse tool to check `http://localhost:3000/common-issues`. Verify updated subheading and CTA text.

**Step 5: Commit**

```bash
git add src/server/templates/common-issues.tsx
git commit -m "feat: update common issues copy to match narrative"
```

---

### Task 6: Rewrite About page copy

Tighten bio copy and update bold closer.

**Files:**
- Modify: `src/server/templates/about.tsx`

**Step 1: Update bio paragraph 2**

Replace lines 72-79:
Old:
```tsx
            <p className="text-lg text-text-secondary leading-relaxed">
              I started Backseat CTO because I kept seeing the same pattern:
              non-technical founders building incredible products with AI tools,
              but making architectural and security decisions that would cost
              them later. They didn't need a full-time CTO. They needed someone
              who'd been through it to look over their shoulder and say "that's
              fine" or "fix that before it breaks."
            </p>
```
New:
```tsx
            <p className="text-lg text-text-secondary leading-relaxed">
              I started Backseat CTO because I kept seeing the same thing:
              founders building incredible products with AI, then making
              technical decisions that would cost them later. They didn't need
              a full-time CTO. They needed someone who'd done it before to look
              over their shoulder.
            </p>
```

**Step 2: Run linter and build**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx @biomejs/biome check src && bun run build:css && bun run build:js`
Expected: No errors

**Step 3: Visual QA**

Use browse tool to check `http://localhost:3000/about`. Verify updated bio.

**Step 4: Commit**

```bash
git add src/server/templates/about.tsx
git commit -m "feat: tighten about page copy"
```

---

### Task 7: Clean up unused template files

Delete templates that are no longer routed to directly (work-with-me.tsx and projects.tsx).

**Files:**
- Delete: `src/server/templates/work-with-me.tsx`
- Delete: `src/server/templates/projects.tsx`

**Step 1: Delete files**

```bash
cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo
rm src/server/templates/work-with-me.tsx src/server/templates/projects.tsx
```

**Step 2: Verify no remaining imports**

Run: `grep -r "work-with-me\|projects" src/server/ --include="*.tsx" --include="*.ts"`
Expected: Only the redirect routes in views.tsx, no template imports.

**Step 3: Run linter and build**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx @biomejs/biome check src && bun run build:css && bun run build:js`
Expected: No errors

**Step 4: Commit**

```bash
git add -A src/server/templates/work-with-me.tsx src/server/templates/projects.tsx
git commit -m "chore: remove unused work-with-me and projects templates"
```

---

### Task 8: Final QA — full site walkthrough

Visual verification of all pages at desktop and mobile widths.

**Step 1: Desktop QA**

Use browse tool to check each page at desktop width (1280px):
- `http://localhost:3000` — full homepage narrative flow
- `http://localhost:3000/vibe-code-audit` — audit product page
- `http://localhost:3000/common-issues` — self-assessment
- `http://localhost:3000/about` — about page

Verify:
- All copy matches the design doc
- No broken links (especially /how-it-works links should redirect to /)
- Navigation shows correct links
- CTAs point to correct pages
- Pricing is consistent (£75/30min, £150/hr, £2,500/20hr)

**Step 2: Mobile QA**

Use browse tool to check homepage at 375px width:
- Burger menu works
- Hero is readable
- Cards stack properly
- CTAs are full-width on mobile

**Step 3: Redirect QA**

Use browse tool to verify redirects:
- `http://localhost:3000/how-it-works` → redirects to `/`
- `http://localhost:3000/work-with-me` → redirects to `/`
- `http://localhost:3000/projects` → redirects to `/`

**Step 4: Fix any issues found, commit each fix individually**

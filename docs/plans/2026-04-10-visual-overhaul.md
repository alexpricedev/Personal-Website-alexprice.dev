# Visual & Layout Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the site from generic SaaS grid layouts into the creative-editorial composition that DESIGN.md promises — poster-like hero, asymmetric sections, editorial rhythm.

**Architecture:** Pure template changes (JSX) with minor CSS additions. No new dependencies, no JS changes. Existing GSAP animation data attributes preserved. Design tokens unchanged.

**Tech Stack:** JSX templates (server-rendered, NOT React), Tailwind CSS v4, GSAP scroll animations

---

### Task 1: Home Page — Poster-Style Hero

**Files:**
- Modify: `src/server/templates/home.tsx:1-86`

**Context:** The current hero is a 50/50 text+image grid. DESIGN.md says "poster-like first viewport, left-weighted text." We're making the headline span full width at a larger size, moving the image to a smaller overlapping position, and pulling the metrics strip into the hero area.

**Step 1: Rewrite the hero section**

Replace the entire hero section (lines 14-86) and metrics strip (lines 88-110) with a single unified hero:

```tsx
    {/* Hero */}
    <section className="min-h-[70vh] md:min-h-[85vh] flex flex-col justify-end pt-28 md:pt-16 pb-16 md:pb-24 px-6 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Headline — full width, poster-scale */}
        <h1 className="font-display text-[clamp(3rem,8.5vw,7rem)] leading-[0.95] tracking-[-0.04em] mb-8 max-w-[900px]">
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
              , the Backseat CTO. Architecture reviews, vibe code audits, and
              honest technical guidance for founders building with AI.
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
                href="/how-it-works"
                className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Metrics — right-aligned, vertical stack */}
          <div
            data-animate="stagger"
            className="flex md:flex-col gap-8 md:gap-6 md:items-end md:text-right shrink-0"
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
```

**Step 2: Verify the build compiles**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx biome check src/server/templates/home.tsx`
Expected: No errors

**Step 3: Commit**

```bash
git add src/server/templates/home.tsx
git commit -m "feat: poster-style hero with integrated metrics"
```

---

### Task 2: Home Page — Editorial Section Rhythm

**Files:**
- Modify: `src/server/templates/home.tsx`

**Context:** Replace the uniform 2-col card grid with varied layouts: a wide single card with left accent for "when to bring me in," horizontal rules between sections, and an editorial testimonial-style pull quote for "how it works."

**Step 1: Rewrite "When to bring me in" section**

Replace the "When to bring me in" section (currently 2-col card grid) with an asymmetric layout — a full-width card with an internal 2-column split and a coloured left accent edge:

```tsx
    {/* When to bring me in */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-12">
          <h2
            data-animate="section"
            className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em]"
          >
            When to bring me in
          </h2>
          <p
            data-animate="section"
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted"
          >
            Two common starting points
          </p>
        </div>
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
                You're building something and you've hit a wall you can't
                prompt your way out of
              </h3>
              <ul className="space-y-2 text-text-secondary leading-[1.7] text-[15px]">
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">—</span>
                  Architecture and database decisions before you're locked in
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">—</span>
                  Making sense of AI-generated code you don't fully trust
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">—</span>
                  "Am I doing this right?" answered by someone who's done it
                </li>
              </ul>
            </div>
            <div className="p-8 sm:p-10">
              <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
                Launch prep
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.3] tracking-[-0.01em] mb-4">
                You've built it and you need to know it won't fall over in
                front of real users
              </h3>
              <ul className="space-y-2 text-text-secondary leading-[1.7] text-[15px]">
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">—</span>
                  Security and performance review before you go live
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">—</span>
                  "Will this scale to 1,000 users?" answered honestly
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">—</span>
                  Technical due diligence prep before investors ask
                </li>
              </ul>
            </div>
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
```

**Step 2: Rewrite "How it works" section**

Replace the 50/50 text+image layout with a full-width editorial layout. Steps go full width with larger numbering, and the image becomes a full-bleed break between the steps and the callout:

```tsx
    {/* How it works */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          data-animate="sequence"
          className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-16"
        >
          <h2
            data-seq
            className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em]"
          >
            How it works
          </h2>
          <p
            data-seq
            className="text-lg text-text-secondary leading-relaxed max-w-md"
          >
            No retainer. No long-term commitment. Just senior technical help
            when you need it.
          </p>
        </div>

        <div
          data-animate="stagger"
          className="grid md:grid-cols-3 gap-px bg-border rounded-[12px] overflow-hidden mb-16"
        >
          {[
            {
              num: "01",
              title: "Email me your problem",
              text: "Tell me what you're building and what you need help with. I'll reply within 24 hours with whether I can help and when I'm available.",
            },
            {
              num: "02",
              title: "Share your code or context",
              text: "Before the session, share a repo link, screenshots, or whatever helps me understand the situation. More context upfront means more value in the session.",
            },
            {
              num: "03",
              title: "Live session + written summary",
              text: "We jump on a call. I review your code, answer your questions, and give you direct, honest guidance. Afterwards, you get a written summary of what to do next.",
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

        {/* Image break */}
        <img
          data-animate="section"
          src="/alex-working.webp"
          alt="Alex Price in a meeting"
          className="w-full aspect-[21/9] rounded-[12px] object-cover mb-16"
        />

        {/* Callout */}
        <div
          data-animate="section"
          className="max-w-[700px]"
        >
          <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10">
            <p className="font-body text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.5] italic text-text-primary">
              I don't tell you what you want to hear. I tell you what's going
              to break, what's fine, and what to focus on next.{" "}
              <strong className="not-italic text-accent">
                Direct, honest, useful.
              </strong>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
```

**Step 3: Add a horizontal rule between the hero and the first content section**

After the hero `</section>` and before the "When to bring me in" section, add:

```tsx
    <hr className="border-border max-w-[1200px] mx-auto" />
```

Also add one before the final CTA:

```tsx
    <hr className="border-border max-w-[1200px] mx-auto" />
```

**Step 4: Remove the old bg-surface-1 wrapper from "How it works"**

The old section had `bg-surface-1` as a section background. The new version uses it inside the grid cells. Make sure the section itself uses default `bg-surface-base` (no bg class needed).

**Step 5: Verify the build compiles**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx biome check src/server/templates/home.tsx`
Expected: No errors

**Step 6: Commit**

```bash
git add src/server/templates/home.tsx
git commit -m "feat: editorial section layouts with varied rhythm"
```

---

### Task 3: Work-With-Me — Editorial Testimonial + Section Dividers

**Files:**
- Modify: `src/server/templates/work-with-me.tsx`

**Context:** The testimonial is buried in a generic card. Pull it out into a large editorial pull quote. Add horizontal rules between sections for rhythm.

**Step 1: Replace the testimonial section**

Replace the testimonial section (lines 188-223) with an editorial pull quote:

```tsx
      {/* Testimonial */}
      <section data-animate="section" className="mb-16">
        <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10 max-w-[700px]">
          <p className="font-body text-[clamp(1.15rem,2.5vw,1.5rem)] leading-[1.6] italic text-text-primary mb-8">
            "We brought Alex in to extend our technical leadership as Naitiv
            scaled. He slotted straight into the team, brought rigour to our
            architecture and delivery, and freed us up to focus on clients and
            strategy. If you need senior technical leadership without the
            overhead of a full-time hire, Alex is your guy."
          </p>
          <footer className="flex items-center gap-3">
            <img
              src="/andrew-black.webp"
              alt="Andrew Black"
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="font-semibold text-sm text-text-primary">
                Andrew Black
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                <span style={{ color: "rgba(168,162,158,0.7)" }}>CEO,</span>{" "}
                <a
                  href="https://www.wearenaitiv.com/"
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
      </section>
```

**Step 2: Add horizontal rules between major sections**

Add `<hr className="border-border mb-16" />` before the "How it works" heading (line 75), before "What I can help with" (line 146), and before the "Not for everyone" section (line 226).

**Step 3: Verify the build compiles**

Run: `cd /Users/alexprice/conductor/workspaces/alexprice-dev/provo && bunx biome check src/server/templates/work-with-me.tsx`
Expected: No errors

**Step 4: Commit**

```bash
git add src/server/templates/work-with-me.tsx
git commit -m "feat: editorial testimonial and section dividers on how-it-works"
```

---

### Task 4: Visual QA with Browser

**Files:** None (read-only QA)

**Context:** Use the browse tool to visually verify all three changed pages render correctly at desktop and mobile widths.

**Step 1: QA home page at desktop**

Navigate to `http://localhost:3000` and take a screenshot. Verify:
- Hero headline is large and poster-like (fills most of the width)
- Metrics are right-aligned vertically
- "When to bring me in" is a single card with internal divider
- "How it works" uses a 3-column grid
- Horizontal rules appear between sections
- Pull quote has left accent border, no card wrapper

**Step 2: QA home page at mobile (375px)**

Resize to 375px width. Verify:
- Hero headline stacks properly
- Metrics go horizontal
- Cards stack to single column
- No horizontal overflow

**Step 3: QA how-it-works page**

Navigate to `http://localhost:3000/how-it-works`. Verify:
- Testimonial is an editorial pull quote (no card wrapper)
- Horizontal rules visible between sections

**Step 4: Report any visual issues found**

If issues found, create follow-up fix tasks. Otherwise, mark complete.

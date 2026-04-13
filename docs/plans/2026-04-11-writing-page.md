# Writing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring back the content section as "Writing" — a trust-building page where visitors see Alex thinks clearly and writes things worth reading. Rename from "Insights", remove dates for evergreen feel, curate to 6 articles, update CTAs to Backseat CTO voice.

**Architecture:** Server-side rendered Bun + JSX. Markdown articles parsed via gray-matter + marked. Routes in `src/server/routes/views.tsx`, templates in `src/server/templates/`. Nav links array in `src/server/components/nav.tsx`.

**Tech Stack:** Bun, React 19 (SSR only), Tailwind CSS v4, gray-matter, marked

---

## Task 1: Delete curated-out articles

**Files:**
- Delete: `content/insights/healthy-teams-outperform.md`
- Delete: `content/insights/engineers-who-thrive-with-ai.md`
- Delete: `content/insights/strategy-should-compound.md`

**Step 1: Delete the three articles**

```bash
rm content/insights/healthy-teams-outperform.md
rm content/insights/engineers-who-thrive-with-ai.md
rm content/insights/strategy-should-compound.md
```

**Step 2: Verify 6 articles remain**

```bash
ls content/insights/
```

Expected: 6 files — empathy-is-the-hard-problem.md, investors-dont-care-about-your-tech.md, restraint-is-a-superpower.md, software-defensibility-in-ai-world.md, the-rebuild-is-the-strategy.md, your-brain-has-a-bandwidth-limit.md

**Step 3: Commit**

```bash
git add -u content/insights/
git commit -m "content: remove 3 articles that don't fit Backseat CTO audience"
```

---

## Task 2: Update article CTAs to Backseat CTO voice

Four articles have closing paragraphs that reference "fractional CTO" or "Series A startups". Update to match the Backseat CTO positioning (non-technical founders, hourly consulting, vibe code audits).

**Files:**
- Modify: `content/insights/the-rebuild-is-the-strategy.md`
- Modify: `content/insights/investors-dont-care-about-your-tech.md`
- Modify: `content/insights/restraint-is-a-superpower.md`
- Modify: `content/insights/software-defensibility-in-ai-world.md`

**Step 1: Update the-rebuild-is-the-strategy.md**

Replace the last paragraph:
```
If you're a founder navigating a setback that's forced you to rethink your technical strategy, this is exactly the kind of situation I help with as a fractional CTO. Sometimes the best time to bring in outside technical leadership is when the old plan has stopped working.
```

With:
```
If you're a founder navigating a setback that's forced you to rethink your technical direction, I can help. Sometimes the best time to get a second opinion on your code is when the old plan has stopped working.
```

**Step 2: Update investors-dont-care-about-your-tech.md**

Replace the last paragraph:
```
If you're a technical founder struggling to separate "what investors want to hear" from "what I want to tell them," this is exactly the kind of positioning I help Series A founders work through.
```

With:
```
If you're a founder struggling to separate "what investors want to hear" from "what I want to tell them," this is exactly the kind of thinking I help with.
```

**Step 3: Update restraint-is-a-superpower.md**

Replace the last paragraph:
```
If you're a founder trying to figure out what's worth building and what isn't, this is exactly the kind of strategic thinking I work through with early-stage teams.
```

With:
```
If you're a founder trying to figure out what's worth building and what isn't, this is exactly the kind of thinking I work through with founders. Sometimes the most valuable thing a technical advisor can say is "don't build that."
```

**Step 4: Update software-defensibility-in-ai-world.md**

Replace the last paragraph:
```
If you're a founder working through these questions for your own product, I help Series A startups navigate exactly this kind of strategic technical decision-making.
```

With:
```
If you're a founder working through these questions for your own product, this is exactly the kind of strategic thinking I help with.
```

**Step 5: Commit**

```bash
git add content/insights/
git commit -m "copy: update article CTAs to Backseat CTO voice"
```

---

## Task 3: Add "Writing" to nav

**Files:**
- Modify: `src/server/components/nav.tsx` (line 1-4 — navLinks array)

**Step 1: Add Writing link to navLinks array**

In `src/server/components/nav.tsx`, replace lines 1-4:

```tsx
const navLinks = [
  { href: "/common-issues", label: "Common Issues", name: "common-issues" },
  { href: "/about", label: "About", name: "about" },
];
```

With:

```tsx
const navLinks = [
  { href: "/writing", label: "Writing", name: "writing" },
  { href: "/common-issues", label: "Common Issues", name: "common-issues" },
  { href: "/about", label: "About", name: "about" },
];
```

**Step 2: Verify the dev server shows Writing in the nav**

Open `http://localhost:3000` in the browser and confirm "Writing" appears in the nav bar between the logo and "Common Issues".

**Step 3: Commit**

```bash
git add src/server/components/nav.tsx
git commit -m "nav: add Writing link"
```

---

## Task 4: Update routes — rename /insights to /writing with redirects

**Files:**
- Modify: `src/server/routes/views.tsx` (lines 22-34 — insights routes)

**Step 1: Update routes**

In `src/server/routes/views.tsx`, replace the insights routes (lines 22-34):

```tsx
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
```

With:

```tsx
  "/writing": withTracking(() => {
    const articles = getAllArticles();
    return render(<Insights articles={articles} />);
  }),
  "/writing/:slug": withTracking((req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/writing/", "");
    const article = getArticleBySlug(slug);
    if (!article) {
      return notFound();
    }
    return render(<Insight article={article} />);
  }),
  "/insights": withTracking(() => Response.redirect("/writing", 301), "insights-redirect"),
  "/insights/:slug": withTracking((req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/insights/", "");
    return Response.redirect(`/writing/${slug}`, 301);
  }, "insights-slug-redirect"),
```

**Step 2: Verify routes work**

- Visit `http://localhost:3000/writing` — should show article list
- Visit `http://localhost:3000/insights` — should 301 redirect to `/writing`

**Step 3: Commit**

```bash
git add src/server/routes/views.tsx
git commit -m "routes: rename /insights to /writing with 301 redirects"
```

---

## Task 5: Update templates — rename to "Writing", remove dates

**Files:**
- Modify: `src/server/templates/insights.tsx` (page title, description, date display)
- Modify: `src/server/templates/insight.tsx` (back link, date display)

**Step 1: Update insights.tsx (list page)**

In `src/server/templates/insights.tsx`, make these changes:

1. Update the Layout props (lines 23-27):
```tsx
  <Layout
    title="Writing"
    description="Things I think about — architecture, AI, building products, and the decisions that matter."
    name="writing"
    path="/writing"
  >
```

2. Update the page heading (lines 28-33):
```tsx
      <header className="mb-14">
        <h1 className="font-display text-[40px] leading-[1.15] tracking-[-0.02em] mb-4">
          Writing
        </h1>
        <p className="text-text-secondary leading-[1.7]">
          Things I think about — architecture, AI, building products, and the
          decisions that matter.
        </p>
      </header>
```

3. Update the empty state LinkedIn link text to point to `/writing` context.

4. Update article links from `/insights/` to `/writing/` (line 54):
```tsx
              href={`/writing/${article.slug}`}
```

5. Remove the date from the metadata display (line 64-66). Change:
```tsx
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  {article.date} · {article.readingTime} min read
                </span>
```
To:
```tsx
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  {article.readingTime} min read
                </span>
```

**Step 2: Update insight.tsx (detail page)**

1. Update the back link (line 22-27):
```tsx
      <a
        href="/writing"
        className="text-text-muted text-sm hover:text-text-secondary transition-colors duration-200 inline-block mb-10"
      >
        ← All writing
      </a>
```

2. Remove the date from the byline (line 39-41). Change:
```tsx
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
              {article.date} · {article.readingTime} min read
            </p>
```
To:
```tsx
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
              {article.readingTime} min read
            </p>
```

3. Update the Layout path prop (line 14):
```tsx
    path={`/writing/${article.slug}`}
```

**Step 3: Verify in browser**

- Visit `http://localhost:3000/writing` — page title says "Writing", no dates shown, articles link to `/writing/slug`
- Click an article — back link says "← All writing", no date in byline, reading time shown

**Step 4: Commit**

```bash
git add src/server/templates/insights.tsx src/server/templates/insight.tsx
git commit -m "templates: rename to Writing, remove dates for evergreen feel"
```

---

## Task 6: Final QA

**Step 1: Full page check**

- `http://localhost:3000/` — nav shows "Writing" link
- `http://localhost:3000/writing` — 6 articles listed, no dates, reading times shown
- Click each article — content renders, back link works, no dates in byline
- `http://localhost:3000/insights` — redirects to `/writing`
- `http://localhost:3000/insights/empathy-is-the-hard-problem` — redirects to `/writing/empathy-is-the-hard-problem`
- Mobile nav — "Writing" appears in hamburger menu

**Step 2: Check type safety**

```bash
bun run typecheck
```

Expected: No errors.

**Step 3: Check linting**

```bash
bun run lint
```

Expected: No errors or warnings.

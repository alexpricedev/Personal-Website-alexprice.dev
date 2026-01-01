# alexprice.dev Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the template project into Alex Price's fractional CTO personal website with homepage, insights blog, and work-with-me page.

**Architecture:** Server-rendered JSX with Bun, markdown-based blog articles parsed at request time, dark theme with green accent, typography-led design with no images except headshot placeholder.

**Tech Stack:** Bun, React (server-only JSX), TypeScript, Tailwind-free vanilla CSS, marked (markdown parsing), gray-matter (frontmatter parsing)

---

## Task 1: Add Markdown Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install dependencies**

Run:
```bash
cd /Users/alexprice/projects/alexprice-dev && bun add marked gray-matter
```

**Step 2: Verify installation**

Run: `bun run check`
Expected: No errors

**Step 3: Commit**

```bash
git add package.json bun.lockb
git commit -m "feat: add marked and gray-matter for markdown articles"
```

---

## Task 2: Design System CSS

**Files:**
- Rewrite: `src/client/style.css`
- Delete imports for old pages

**Step 1: Replace style.css with new design system**

```css
/*
  alexprice.dev Design System
  Dark theme, green accent, typography-led
*/

/* Component styles */
@import "./components/layout.css";
@import "./components/nav.css";

/* Page styles */
@import "./pages/home.css";
@import "./pages/insights.css";
@import "./pages/work-with-me.css";

:root {
  /* Colors - Dark theme */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --text-primary: #f5f5f5;
  --text-muted: #888888;
  --accent: #22c55e;
  --accent-hover: #16a34a;
  --border: #262626;

  /* Typography */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;

  /* Type Scale */
  --text-hero: clamp(2.5rem, 5vw, 4rem);
  --text-h1: clamp(2rem, 4vw, 3rem);
  --text-h2: clamp(1.5rem, 3vw, 2rem);
  --text-h3: 1.25rem;
  --text-body: 1.125rem;
  --text-small: 0.875rem;

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-relaxed: 1.7;

  /* Spacing */
  --max-width-content: 680px;
  --max-width-page: 1200px;
  --space-section: 6rem;
  --space-element: 1.5rem;

  /* Misc */
  --radius: 0.5rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
  background: var(--bg-primary);
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  line-height: var(--leading-tight);
  font-weight: 600;
}

h1 { font-size: var(--text-h1); }
h2 { font-size: var(--text-h2); }
h3 { font-size: var(--text-h3); }

p {
  margin-bottom: var(--space-element);
}

p:last-child {
  margin-bottom: 0;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--accent-hover);
}

ul, ol {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: 0.875rem 1.75rem;
  font-size: var(--text-body);
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius);
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: var(--accent-hover);
  color: var(--bg-primary);
}

/* Card component */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-element);
}

/* Section spacing */
.section {
  padding: var(--space-section) 0;
}

/* Container */
.container {
  max-width: var(--max-width-page);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.container-narrow {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: var(--space-element) 0;
}

/* Text utilities */
.text-muted {
  color: var(--text-muted);
}

.text-small {
  font-size: var(--text-small);
}

.text-center {
  text-align: center;
}
```

**Step 2: Delete old page CSS files**

Run:
```bash
rm /Users/alexprice/projects/alexprice-dev/src/client/pages/about.css
rm /Users/alexprice/projects/alexprice-dev/src/client/pages/contact.css
```

**Step 3: Create placeholder page CSS files**

Create `src/client/pages/insights.css`:
```css
/* Insights page styles */
.insights-header {
  margin-bottom: var(--space-section);
}

.insights-header h1 {
  margin-bottom: 0.5rem;
}

.insights-list {
  list-style: none;
  padding: 0;
}

.insights-list li {
  margin-bottom: 0;
}

.article-card {
  padding: var(--space-element) 0;
  border-bottom: 1px solid var(--border);
}

.article-card:first-child {
  padding-top: 0;
}

.article-card h2 {
  margin-bottom: 0.5rem;
}

.article-card h2 a {
  color: var(--text-primary);
}

.article-card h2 a:hover {
  color: var(--accent);
}

.article-meta {
  font-size: var(--text-small);
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.article-meta .pillar {
  color: var(--accent);
}

.article-excerpt {
  color: var(--text-muted);
  margin-bottom: 0;
}

/* Single article page */
.article-back {
  margin-bottom: var(--space-element);
}

.article-header {
  margin-bottom: var(--space-section);
}

.article-header h1 {
  margin-bottom: 0.75rem;
}

.article-content {
  margin-bottom: var(--space-section);
}

.article-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.article-content blockquote {
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--text-muted);
  font-style: italic;
}

.article-content code {
  font-family: var(--font-mono);
  background: var(--bg-secondary);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.article-content pre {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: var(--radius);
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content pre code {
  background: none;
  padding: 0;
}

.article-signoff {
  font-style: italic;
  margin-bottom: var(--space-section);
}

.article-cta {
  border-top: 1px solid var(--border);
  padding-top: var(--space-element);
}

.empty-state {
  color: var(--text-muted);
  text-align: center;
  padding: var(--space-section) 0;
}
```

Create `src/client/pages/work-with-me.css`:
```css
/* Work with me page styles */
.work-header {
  margin-bottom: var(--space-section);
}

.work-header h1 {
  margin-bottom: 0.5rem;
}

.work-section {
  margin-bottom: var(--space-section);
}

.work-section h2 {
  margin-bottom: var(--space-element);
}

.engagement-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-element);
}

@media (min-width: 768px) {
  .engagement-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.engagement-card h3 {
  margin-bottom: 0.75rem;
  color: var(--accent);
}

.expect-list {
  list-style: none;
  padding: 0;
}

.expect-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.expect-list li::before {
  content: "–";
  position: absolute;
  left: 0;
  color: var(--accent);
}

.not-for-everyone {
  background: var(--bg-secondary);
  border-left: 3px solid var(--border);
  padding: var(--space-element);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.work-cta {
  text-align: center;
  padding: var(--space-section) 0;
  border-top: 1px solid var(--border);
}

.work-cta h2 {
  margin-bottom: 0.5rem;
}

.work-cta p {
  color: var(--text-muted);
  margin-bottom: var(--space-element);
}
```

**Step 4: Update home.css**

Replace `src/client/pages/home.css`:
```css
/* Homepage styles */
.hero {
  padding: var(--space-section) 0;
  text-align: center;
}

.hero h1 {
  font-size: var(--text-hero);
  margin-bottom: var(--space-element);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subhead {
  font-size: var(--text-body);
  color: var(--text-muted);
  max-width: var(--max-width-content);
  margin: 0 auto var(--space-element);
}

.hero .btn {
  margin-bottom: 3rem;
}

.hero-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: var(--text-small);
}

.credibility {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 2rem 0;
  text-align: center;
}

.credibility p {
  color: var(--text-muted);
  font-size: var(--text-small);
  max-width: var(--max-width-content);
  margin: 0 auto;
}

.when-section {
  padding: var(--space-section) 0;
}

.when-section h2 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.when-intro {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.when-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-element);
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .when-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.when-card h3 {
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.approach-section {
  padding: var(--space-section) 0;
  border-top: 1px solid var(--border);
}

.approach-section h2 {
  margin-bottom: var(--space-element);
}

.approach-content {
  max-width: var(--max-width-content);
  margin: 0 auto;
}

.approach-callout {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-style: italic;
}

.final-cta {
  text-align: center;
  padding: var(--space-section) 0;
  border-top: 1px solid var(--border);
}

.final-cta h2 {
  margin-bottom: var(--space-element);
}
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement dark theme design system with green accent"
```

---

## Task 3: Update Layout Component

**Files:**
- Modify: `src/server/components/layouts.tsx`
- Modify: `src/client/components/layout.css`

**Step 1: Update layout.tsx**

```tsx
import type React from "react";

import { Footer } from "./footer";
import { Nav } from "./nav";

type LayoutProps = {
  title: string;
  description?: string;
  name: string;
  children: React.ReactNode;
};

export function Layout({ title, description, name, children }: LayoutProps) {
  const fullTitle = title === "Home" ? "Alex Price – Fractional CTO" : `${title} – Alex Price`;
  const metaDescription = description || "Fractional CTO for Series A startups. Senior technical leadership without the cost and risk of a full-time hire.";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <title>{fullTitle}</title>
        <link rel="stylesheet" href="/assets/main.css" />
      </head>
      <body data-page={name}>
        <header className="site-header">
          <div className="container">
            <Nav page={name} />
          </div>
        </header>
        <main>{children}</main>
        <Footer />
        <script type="module" src="/assets/main.js" />
      </body>
    </html>
  );
}
```

**Step 2: Update layout.css**

Replace `src/client/components/layout.css`:
```css
/* Site header */
.site-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Footer */
.site-footer {
  padding: 3rem 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--text-muted);
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-separator {
  color: var(--text-muted);
}
```

**Step 3: Commit**

```bash
git add src/server/components/layouts.tsx src/client/components/layout.css
git commit -m "feat: update layout with meta tags and new structure"
```

---

## Task 4: Create Footer Component

**Files:**
- Create: `src/server/components/footer.tsx`

**Step 1: Create footer.tsx**

```tsx
const socialLinks = [
  { href: "https://linkedin.com/in/alexpricecto", label: "LinkedIn" },
  { href: "https://github.com/alexpricedev", label: "GitHub" },
  { href: "mailto:jobs@alexprice.dev", label: "jobs@alexprice.dev" },
];

export const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-links">
        {socialLinks.map((link, index) => (
          <span key={link.label}>
            <a href={link.href}>{link.label}</a>
            {index < socialLinks.length - 1 && (
              <span className="footer-separator"> · </span>
            )}
          </span>
        ))}
      </div>
    </div>
  </footer>
);
```

**Step 2: Commit**

```bash
git add src/server/components/footer.tsx
git commit -m "feat: add footer component with social links"
```

---

## Task 5: Update Navigation Component

**Files:**
- Modify: `src/server/components/nav.tsx`
- Modify: `src/client/components/nav.css`

**Step 1: Update nav.tsx**

```tsx
const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/work-with-me", label: "Work with me", name: "work-with-me" },
];

const ctaLink = {
  href: "https://calendly.com/alexprice",
  label: "Book a call",
};

export const Nav = ({ page }: { page: string }) => (
  <nav aria-label="Main navigation">
    <a href="/" className="nav-wordmark">
      Alex Price
    </a>
    <div className="nav-links">
      <ul>
        {navLinks.map(({ href, label, name }) => (
          <li key={name}>
            <a
              href={href}
              className={page === name ? "active" : undefined}
              aria-current={page === name ? "page" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href={ctaLink.href} className="btn btn-primary nav-cta">
        {ctaLink.label}
      </a>
    </div>
  </nav>
);
```

**Step 2: Update nav.css**

Replace `src/client/components/nav.css`:
```css
/* Navigation */
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-wordmark {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
}

.nav-wordmark:hover {
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: var(--text-small);
  transition: color 0.15s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--text-primary);
}

.nav-cta {
  font-size: var(--text-small);
  padding: 0.625rem 1.25rem;
}

/* Mobile nav - simple stacked layout */
@media (max-width: 767px) {
  nav {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links ul {
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

**Step 3: Commit**

```bash
git add src/server/components/nav.tsx src/client/components/nav.css
git commit -m "feat: update nav with new links and CTA button"
```

---

## Task 6: Create Articles Service

**Files:**
- Create: `src/server/services/articles.ts`
- Create: `content/insights/.gitkeep`

**Step 1: Create articles.ts**

```ts
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type ArticlePillar = "scaling" | "fundraising" | "ai" | "war-stories";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  pillar?: ArticlePillar;
  readingTime: number;
};

export type Article = ArticleMeta & {
  content: string;
};

const CONTENT_DIR = join(process.cwd(), "content", "insights");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getAllArticles(): ArticleMeta[] {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = join(CONTENT_DIR, filename);
    const fileContent = readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      date: formatDate(data.date || new Date()),
      excerpt: data.excerpt || "",
      pillar: data.pillar as ArticlePillar | undefined,
      readingTime: calculateReadingTime(content),
    };
  });

  // Sort by date descending (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = join(CONTENT_DIR, `${slug}.md`);

  if (!existsSync(filePath)) {
    return null;
  }

  const fileContent = readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    date: formatDate(data.date || new Date()),
    excerpt: data.excerpt || "",
    pillar: data.pillar as ArticlePillar | undefined,
    readingTime: calculateReadingTime(content),
    content: marked(content) as string,
  };
}
```

**Step 2: Create content directory**

Run:
```bash
mkdir -p /Users/alexprice/projects/alexprice-dev/content/insights
touch /Users/alexprice/projects/alexprice-dev/content/insights/.gitkeep
```

**Step 3: Commit**

```bash
git add src/server/services/articles.ts content/insights/.gitkeep
git commit -m "feat: add articles service for markdown parsing"
```

---

## Task 7: Create Homepage Template

**Files:**
- Rewrite: `src/server/templates/home.tsx`

**Step 1: Replace home.tsx**

```tsx
import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Home = () => (
  <Layout title="Home" name="home">
    {/* Hero */}
    <section className="hero">
      <div className="container">
        <h1>Fractional CTO who builds things that don't need him</h1>
        <p className="hero-subhead">
          Hiring a full-time CTO is expensive, slow, and high-risk. I'll tell
          you the hard truths, move fast, and either hire my replacement or make
          the role unnecessary. Then I leave.
        </p>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
        <div className="hero-image">Headshot</div>
      </div>
    </section>

    {/* Credibility Strip */}
    <section className="credibility">
      <div className="container">
        <p>
          Former CTO/CPO at Ecologi – scaled from 3 to 80+ engineers, 18,000 B2B
          customers, LinkedIn Top 10 UK Startups 2022, exit. Most recently CTO
          at Just About, taking a pre-alpha concept to production.
        </p>
      </div>
    </section>

    {/* When Do You Need Someone Like Me */}
    <section className="when-section">
      <div className="container">
        <h2>When do you need someone like me</h2>
        <p className="when-intro">Two situations where I help:</p>
        <div className="when-cards">
          <div className="card when-card">
            <h3>You don't have a CTO</h3>
            <p>
              And need senior technical leadership without the cost and risk of
              a full-time hire.
            </p>
          </div>
          <div className="card when-card">
            <h3>You have a CTO</h3>
            <p>
              But they're struggling with the transition from engineer to
              leader. You want to develop them, not replace them.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* How This Works */}
    <section className="approach-section">
      <div className="container">
        <div className="approach-content">
          <h2>How this works</h2>
          <p>
            From one day a week to a three-month transformation. I embed with
            your team, figure out what's actually broken, and fix it – or hire
            someone brilliant who will.
          </p>
          <p>
            No dependency. No extended retainers. Success means I'm no longer
            needed.
          </p>
          <p className="approach-callout">
            If you want someone to nod along or move cautiously, I'm not your
            person. This works best with founders who want speed and can handle
            direct feedback.
          </p>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="final-cta">
      <div className="container">
        <h2>Ready to talk?</h2>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
      </div>
    </section>
  </Layout>
);
```

**Step 2: Commit**

```bash
git add src/server/templates/home.tsx
git commit -m "feat: implement homepage with all sections"
```

---

## Task 8: Create Insights Templates

**Files:**
- Create: `src/server/templates/insights.tsx`
- Create: `src/server/templates/insight.tsx`

**Step 1: Create insights.tsx (listing)**

```tsx
import { Layout } from "@server/components/layouts";
import type { ArticleMeta } from "@server/services/articles";

type InsightsProps = {
  articles: ArticleMeta[];
};

const pillarLabels: Record<string, string> = {
  scaling: "Scaling",
  fundraising: "Fundraising",
  ai: "AI",
  "war-stories": "War Stories",
};

export const Insights = ({ articles }: InsightsProps) => (
  <Layout
    title="Insights"
    description="Lessons from scaling teams, raising funds, and making mistakes."
    name="insights"
  >
    <div className="container-narrow section">
      <header className="insights-header">
        <h1>Insights</h1>
        <p className="text-muted">
          Lessons from scaling teams, raising funds, and making mistakes.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="empty-state">
          First post coming soon. In the meantime, find me on{" "}
          <a href="https://linkedin.com/in/alexpricecto">LinkedIn</a>.
        </p>
      ) : (
        <ul className="insights-list">
          {articles.map((article) => (
            <li key={article.slug}>
              <article className="article-card">
                <h2>
                  <a href={`/insights/${article.slug}`}>{article.title}</a>
                </h2>
                <p className="article-meta">
                  {article.date} · {article.readingTime} min read
                  {article.pillar && (
                    <>
                      {" · "}
                      <span className="pillar">
                        {pillarLabels[article.pillar] || article.pillar}
                      </span>
                    </>
                  )}
                </p>
                {article.excerpt && (
                  <p className="article-excerpt">{article.excerpt}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Layout>
);
```

**Step 2: Create insight.tsx (single article)**

```tsx
import { Layout } from "@server/components/layouts";
import type { Article } from "@server/services/articles";

type InsightProps = {
  article: Article;
};

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Insight = ({ article }: InsightProps) => (
  <Layout title={article.title} description={article.excerpt} name="insight">
    <article className="container-narrow section">
      <a href="/insights" className="article-back text-muted">
        ← All insights
      </a>

      <header className="article-header">
        <h1>{article.title}</h1>
        <p className="article-meta text-muted">
          {article.date} · {article.readingTime} min read
        </p>
      </header>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="article-signoff">– Alex</p>

      <div className="article-cta">
        <p>
          Want to talk about this?{" "}
          <a href={CALENDLY_URL} className="btn btn-primary">
            Book a call
          </a>
        </p>
      </div>
    </article>
  </Layout>
);
```

**Step 3: Commit**

```bash
git add src/server/templates/insights.tsx src/server/templates/insight.tsx
git commit -m "feat: add insights listing and article templates"
```

---

## Task 9: Create Work With Me Template

**Files:**
- Create: `src/server/templates/work-with-me.tsx`

**Step 1: Create work-with-me.tsx**

```tsx
import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
  >
    <div className="container-narrow section">
      <header className="work-header">
        <h1>Work with me</h1>
        <p className="text-muted">
          Fractional CTO for Series A startups who need to move fast and get it
          right.
        </p>
      </header>

      {/* The Problem */}
      <section className="work-section">
        <p>
          You need senior technical leadership but hiring a full-time CTO is
          expensive, slow, and risky. You might not even need one permanently –
          you need the right decisions made now.
        </p>
      </section>

      {/* How I Can Help */}
      <section className="work-section">
        <h2>How I can help</h2>
        <p>Two ways to work together:</p>
        <div className="engagement-cards">
          <div className="card engagement-card">
            <h3>Embedded support</h3>
            <p>
              One to two days per week. I join your team, attend the meetings
              that matter, and help you make better technical and hiring
              decisions. Ongoing until you don't need me.
            </p>
          </div>
          <div className="card engagement-card">
            <h3>Transformation project</h3>
            <p>
              A focused 3-month engagement. We identify what's broken, fix it,
              and either hire your permanent CTO or build systems that don't
              require one. Clear scope, clear exit.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="work-section">
        <h2>What to expect</h2>
        <ul className="expect-list">
          <li>Direct feedback on what's working and what isn't</li>
          <li>Hands-on help with architecture, hiring, and team structure</li>
          <li>
            Someone who's done this before – 3 to 80+ engineers, funding rounds,
            exit
          </li>
          <li>No dependency – I measure success by how quickly I'm not needed</li>
        </ul>
      </section>

      {/* Not for Everyone */}
      <section className="work-section">
        <h2>Not for everyone</h2>
        <div className="not-for-everyone">
          <p>
            This works best with founders who want speed, can handle direct
            feedback, and are ready to act on it.
          </p>
          <p>
            If you're looking for someone to validate decisions you've already
            made or move cautiously, I'm not your person.
          </p>
        </div>
      </section>

      {/* Investment */}
      <section className="work-section">
        <h2>Investment</h2>
        <p>
          Pricing depends on scope and time commitment. Book a call and we'll
          figure out what makes sense.
        </p>
      </section>

      {/* CTA */}
      <section className="work-cta">
        <h2>Let's talk</h2>
        <p>30 minutes to see if there's a fit. No pitch, no pressure.</p>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
      </section>
    </div>
  </Layout>
);
```

**Step 2: Commit**

```bash
git add src/server/templates/work-with-me.tsx
git commit -m "feat: add work with me page template"
```

---

## Task 10: Update Routes

**Files:**
- Modify: `src/server/routes/views.tsx`
- Delete: `src/server/templates/about.tsx`
- Delete: `src/server/templates/contact.tsx`

**Step 1: Update views.tsx**

```tsx
import type { JSX } from "react";
import { renderToString } from "react-dom/server";
import { getAllArticles, getArticleBySlug } from "../services/articles";
import { Home } from "../templates/home";
import { Insight } from "../templates/insight";
import { Insights } from "../templates/insights";
import { WorkWithMe } from "../templates/work-with-me";

const render = (element: JSX.Element): Response =>
  new Response("<!DOCTYPE html>" + renderToString(element), {
    headers: { "Content-Type": "text/html" },
  });

const notFound = (): Response =>
  new Response("Not found", { status: 404 });

export const viewRoutes = {
  "/": () => render(<Home />),
  "/insights": () => {
    const articles = getAllArticles();
    return render(<Insights articles={articles} />);
  },
  "/insights/:slug": (req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/insights/", "");
    const article = getArticleBySlug(slug);
    if (!article) {
      return notFound();
    }
    return render(<Insight article={article} />);
  },
  "/work-with-me": () => render(<WorkWithMe />),
};
```

**Step 2: Delete old templates**

Run:
```bash
rm /Users/alexprice/projects/alexprice-dev/src/server/templates/about.tsx
rm /Users/alexprice/projects/alexprice-dev/src/server/templates/contact.tsx
```

**Step 3: Delete old client JS files**

Run:
```bash
rm /Users/alexprice/projects/alexprice-dev/src/client/pages/about.ts
rm /Users/alexprice/projects/alexprice-dev/src/client/pages/contact.ts
rm /Users/alexprice/projects/alexprice-dev/src/client/pages/home.ts
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: update routes for new pages, remove old templates"
```

---

## Task 11: Clean Up Client JS

**Files:**
- Modify: `src/client/main.ts`

**Step 1: Read current main.ts**

Run: Read the file to understand current structure

**Step 2: Simplify main.ts**

Since we removed the counter and other demo functionality, simplify to minimal JS:

```ts
// Main client entry point
// Currently minimal - add interactivity as needed
```

**Step 3: Commit**

```bash
git add src/client/main.ts
git commit -m "chore: simplify client JS, remove demo code"
```

---

## Task 12: Add Sample Article (Optional)

**Files:**
- Create: `content/insights/hello-world.md`

**Step 1: Create sample article**

```markdown
---
title: "Why I Left Full-Time CTO Roles"
date: 2024-01-15
excerpt: "After two exits and scaling teams from 3 to 80+ engineers, I realized the best thing I could do was stop staying."
pillar: war-stories
---

The first time I made myself unnecessary, it felt like failure.

I'd spent 18 months building the engineering org at Ecologi. We'd gone from 3 engineers to over 80. We had a real platform, real customers, and a team that could ship without me in every room.

And that's when I knew it was time to go.

## The uncomfortable truth about CTO roles

Most CTOs stay too long. They build empires instead of systems. They become bottlenecks instead of enablers.

I know because I've done it. Early in my career, I measured success by how much the team needed me. Every decision that required my input felt like validation.

That's backwards.

## What good looks like

The best thing a technical leader can do is build something that doesn't need them. That means:

- Hiring people smarter than you in their domains
- Creating systems that make good decisions easy
- Getting out of the way

## Why fractional works

Now I help founders do what I wish I'd done faster: build teams and systems that don't create dependency.

I come in, figure out what's broken, fix it or hire someone who will, and leave.

No empire building. No extended retainers. Just results.
```

**Step 2: Commit**

```bash
git add content/insights/hello-world.md
git commit -m "docs: add sample blog post"
```

---

## Task 13: Final Verification

**Step 1: Run build**

```bash
cd /Users/alexprice/projects/alexprice-dev && bun run build
```

**Step 2: Run linter**

```bash
bun run check
```

**Step 3: Manual testing**

Visit in browser:
- `http://localhost:3000/` - Homepage with all sections
- `http://localhost:3000/insights` - Article listing
- `http://localhost:3000/insights/hello-world` - Single article
- `http://localhost:3000/work-with-me` - Work with me page

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address any issues from verification"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Add markdown dependencies |
| 2 | Design system CSS |
| 3 | Update layout component |
| 4 | Create footer component |
| 5 | Update navigation |
| 6 | Create articles service |
| 7 | Create homepage template |
| 8 | Create insights templates |
| 9 | Create work with me template |
| 10 | Update routes, delete old files |
| 11 | Clean up client JS |
| 12 | Add sample article (optional) |
| 13 | Final verification |

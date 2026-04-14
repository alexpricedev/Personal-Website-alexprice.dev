# Tools & Projects Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Tools & Projects" page at `/tools` showcasing Billet, Restarred, and Deeproot with cards linking to live URLs.

**Architecture:** Server-rendered page using existing `getAllProjects()` service. New template, route addition, nav link. Same layout pattern as the Writing page.

**Tech Stack:** Bun, TypeScript, JSX (server-rendered), Tailwind CSS

---

### Task 1: Create the Tools template

**Files:**
- Create: `src/server/templates/tools.tsx`

**Step 1: Create template file**

```tsx
import { Layout } from "@server/components/layouts";
import type { Project } from "@server/services/projects";

type ToolsProps = {
  projects: Project[];
};

export const Tools = ({ projects }: ToolsProps) => (
  <Layout
    title="Tools & Projects"
    description="Things I've built — open source tools, frameworks, and side projects."
    name="tools"
    path="/tools"
  >
    <div className="max-w-[700px] mx-auto px-6 pt-28 pb-20">
      <header className="mb-14">
        <h1 className="font-display text-[40px] leading-[1.15] tracking-[-0.02em] mb-4">
          Tools & Projects
        </h1>
        <p className="text-text-secondary leading-[1.7]">
          Things I've built — open source tools, frameworks, and side projects.
        </p>
      </header>

      <div data-animate="fade-list">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className={`py-8 ${
              index < projects.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h2 className="font-display text-[28px] leading-[1.2] mb-3 group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h2>
            </a>
            <p className="text-text-secondary text-[15px] leading-[1.65] mb-4">
              {project.description}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent transition-colors duration-200 ml-1"
                  aria-label={`${project.title} on GitHub`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);
```

### Task 2: Add route and update redirects

**Files:**
- Modify: `src/server/routes/views.tsx`

**Step 1: Add imports**

Add `getAllProjects` import and `Tools` template import.

**Step 2: Add `/tools` route**

```tsx
"/tools": withTracking(() => {
  const projects = getAllProjects();
  return render(<Tools projects={projects} />);
}),
```

**Step 3: Update `/projects` redirect**

Change from `Response.redirect("/", 301)` to `Response.redirect("/tools", 301)`.

### Task 3: Add nav link

**Files:**
- Modify: `src/server/components/nav.tsx`

**Step 1: Add to navLinks array**

Insert between "writing" and "about":

```tsx
{ href: "/tools", label: "Tools & Projects", name: "tools" },
```

### Task 4: Update sitemap

**Files:**
- Modify: `src/server/routes/api.ts`

**Step 1: Update static pages**

Change `path: "/projects"` to `path: "/tools"` in the `staticPages` array. Also remove the `/how-it-works` entry (dead page).

### Task 5: Verify in browser

**Step 1:** Navigate to `/tools` and confirm the page renders with all 3 projects.

**Step 2:** Confirm nav link is active (accent color) when on `/tools`.

**Step 3:** Confirm `/projects` redirects to `/tools`.

**Step 4:** Confirm project cards link to live URLs in new tabs.

### Task 6: Commit

```bash
git add src/server/templates/tools.tsx src/server/components/nav.tsx src/server/routes/views.tsx src/server/routes/api.ts
git commit -m "feat: add Tools & Projects page with nav link"
```

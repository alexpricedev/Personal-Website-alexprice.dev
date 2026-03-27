# Projects Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/projects` page showcasing curated side projects, driven by markdown files with frontmatter.

**Architecture:** Mirrors the existing insights pattern — markdown files in `/content/projects/` parsed by a service, rendered by a template via a view route. Nav updated to include the new page.

**Tech Stack:** Bun, TypeScript, JSX (SSR), gray-matter, Tailwind CSS, GSAP scroll animations.

---

### Task 1: Create the projects service

**Files:**
- Create: `src/server/services/projects.ts`

**Step 1: Create the service file**

Model this closely on `src/server/services/articles.ts`. The service reads markdown files from `/content/projects/`, parses frontmatter with `gray-matter`, and returns typed project objects sorted by `order`.

```typescript
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
};

type Frontmatter = {
  title: string;
  description: string;
  image?: string;
  stack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
};

const CONTENT_DIR = join(process.cwd(), "content", "projects");

function parseProject(filePath: string, slug: string): Project {
  const fileContent = readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    stack: frontmatter.stack ?? [],
    liveUrl: frontmatter.liveUrl,
    githubUrl: frontmatter.githubUrl,
    order: frontmatter.order ?? 999,
  };
}

/**
 * Get all projects, sorted by order (lowest first)
 * Returns empty array if directory doesn't exist
 */
export function getAllProjects(): Project[] {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".md"));

  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = join(CONTENT_DIR, file);
    return parseProject(filePath, slug);
  });

  return projects.sort((a, b) => a.order - b.order);
}
```

**Step 2: Verify it compiles**

Run: `bunx @biomejs/biome@beta check src/server/services/projects.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add src/server/services/projects.ts
git commit -m "feat: add projects service for reading markdown project files"
```

---

### Task 2: Create a sample project markdown file

**Files:**
- Create: `content/projects/surat.md`

**Step 1: Create the content directory and a sample project**

```bash
mkdir -p content/projects
```

Then create `content/projects/surat.md`:

```markdown
---
title: "Surat"
description: "My personal website. Built with Bun, server-rendered JSX, and an editorial design system."
image: "/projects-images/surat.png"
stack: ["Bun", "TypeScript", "Tailwind CSS", "GSAP"]
liveUrl: "https://alexprice.dev"
githubUrl: "https://github.com/alexprice/surat"
order: 1
---
```

Also create the images directory:

```bash
mkdir -p public/projects-images
```

Add a placeholder image note: the user will need to add actual screenshots to `public/projects-images/` later.

**Step 2: Commit**

```bash
git add content/projects/surat.md
git commit -m "feat: add sample project content file"
```

---

### Task 3: Create the projects template

**Files:**
- Create: `src/server/templates/projects.tsx`

**Step 1: Create the template**

Follow the pattern from `src/server/templates/insights.tsx`. Use the `Layout` component with proper meta tags. Render a 2-column card grid.

```tsx
import { Layout } from "@server/components/layouts";
import type { Project } from "@server/services/projects";

type ProjectsProps = {
  projects: Project[];
};

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 0 1 4 9 14.25 14.25 0 0 1-4 9 14.25 14.25 0 0 1-4-9 14.25 14.25 0 0 1 4-9Z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
  </svg>
);

export const Projects = ({ projects }: ProjectsProps) => (
  <Layout
    title="Projects"
    description="Things I've built recently."
    name="projects"
    path="/projects"
  >
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-28 pb-20">
      <header className="mb-14 max-w-[700px]">
        <h1 className="font-display text-[40px] leading-[1.15] tracking-[-0.02em] mb-4">
          Projects
        </h1>
        <p className="text-text-secondary leading-[1.7]">
          Things I've built recently.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <p>Projects coming soon.</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-animate="stagger"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-text-muted/20 transition-colors duration-200"
            >
              {project.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-display text-[22px] leading-[1.2] mb-2">
                  {project.title}
                </h2>
                <p className="text-text-secondary text-sm leading-[1.65] mb-4">
                  {project.description}
                </p>

                {project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent text-sm transition-colors duration-200"
                    >
                      <GlobeIcon />
                      <span>Live</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-secondary hover:text-accent text-sm transition-colors duration-200"
                    >
                      <GitHubIcon />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </Layout>
);
```

**Step 2: Verify it compiles**

Run: `bunx @biomejs/biome@beta check src/server/templates/projects.tsx`
Expected: No errors

**Step 3: Commit**

```bash
git add src/server/templates/projects.tsx
git commit -m "feat: add projects page template with card grid layout"
```

---

### Task 4: Add the route and wire it up

**Files:**
- Modify: `src/server/routes/views.tsx`

**Step 1: Add the projects route**

Add import for `getAllProjects` from the projects service and the `Projects` template. Add the `/projects` route between `/insights/:slug` and `/work-with-me`.

Add to imports:
```typescript
import { getAllProjects } from "../services/projects";
import { Projects } from "../templates/projects";
```

Add to `viewRoutes`:
```typescript
"/projects": withTracking(() => {
  const projects = getAllProjects();
  return render(<Projects projects={projects} />);
}),
```

**Step 2: Verify it compiles**

Run: `bunx @biomejs/biome@beta check src/server/routes/views.tsx`
Expected: No errors

**Step 3: Verify the page loads**

Open `http://localhost:3000/projects` in the browser. Confirm the page renders with the sample project card.

**Step 4: Commit**

```bash
git add src/server/routes/views.tsx
git commit -m "feat: add /projects route"
```

---

### Task 5: Add Projects to nav

**Files:**
- Modify: `src/server/components/nav.tsx`

**Step 1: Add "Projects" to navLinks array**

Insert the Projects link between Insights and Work with me in the `navLinks` array at line 5:

```typescript
const navLinks = [
  { href: "/", label: "Home", name: "home" },
  { href: "/insights", label: "Insights", name: "insights" },
  { href: "/projects", label: "Projects", name: "projects" },
  { href: "/work-with-me", label: "Work with me", name: "work-with-me" },
];
```

**Step 2: Verify it compiles**

Run: `bunx @biomejs/biome@beta check src/server/components/nav.tsx`
Expected: No errors

**Step 3: Verify nav renders correctly**

Open `http://localhost:3000/projects` in the browser. Confirm:
- "Projects" appears in the desktop nav between Insights and Work with me
- "Projects" link is highlighted (accent color) when on the projects page
- Mobile menu also shows the Projects link

**Step 4: Commit**

```bash
git add src/server/components/nav.tsx
git commit -m "feat: add Projects to site navigation"
```

---

### Task 6: Add /projects to sitemap

**Files:**
- Modify: `src/server/routes/api.ts`

**Step 1: Add projects to staticPages**

Add the projects page to the `staticPages` array in `api.ts`:

```typescript
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/insights", priority: "0.9", changefreq: "weekly" },
  { path: "/projects", priority: "0.8", changefreq: "monthly" },
  { path: "/work-with-me", priority: "0.8", changefreq: "monthly" },
];
```

**Step 2: Verify it compiles**

Run: `bunx @biomejs/biome@beta check src/server/routes/api.ts`
Expected: No errors

**Step 3: Verify sitemap**

Open `http://localhost:3000/sitemap.xml` in the browser. Confirm `/projects` appears in the output.

**Step 4: Commit**

```bash
git add src/server/routes/api.ts
git commit -m "feat: add /projects to sitemap"
```

---

### Task 7: Full integration verification

**Step 1: Run linter on entire project**

Run: `bunx @biomejs/biome@beta check src`
Expected: No errors, no warnings

**Step 2: Run build**

Run: `bun run build:css && bun run build:js`
Expected: Successful build with no errors

**Step 3: Visual QA in browser**

Check the following at `http://localhost:3000/projects`:
- Page loads without errors
- Header shows "Projects" with subtitle
- Sample project card renders with image placeholder, title, description, tech stack tags, and links
- Card hover state works (border brightening)
- Scroll animation triggers on the card grid
- Nav highlights "Projects" as active
- Mobile nav includes "Projects"
- Page title in browser tab shows "Projects – Alex Price"

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address QA issues from integration testing"
```

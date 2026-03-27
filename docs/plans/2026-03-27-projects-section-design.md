# Projects Section Design

## Summary

Add a `/projects` page to showcase 3-5 curated side projects, proving Alex still builds things. Follows the existing markdown-driven content pattern.

## Content Model

Markdown files in `/content/projects/` with frontmatter only (no body):

```yaml
---
title: "Project Name"
description: "One-liner about what it does"
image: "/projects-images/project-name.png"
stack: ["Bun", "TypeScript", "PostgreSQL"]
liveUrl: "https://example.com"
githubUrl: "https://github.com/alexprice/example"
order: 1
---
```

- `order` controls display position (lowest first)
- `liveUrl` and `githubUrl` are both optional (at least one expected)
- `image` is a screenshot/hero image for the card

## Page Design

**Header:** "Projects" in Instrument Serif with subtitle "Things I've built recently." in secondary text.

**Card grid:** 2-column on desktop, single column on mobile. Each card:

- Project screenshot (top, full-width within card)
- Project name in Instrument Serif
- One-liner description in Instrument Sans
- Tech stack as Geist Mono tags (matching insight pillar tag style)
- Globe icon link for live URL, GitHub icon for repo link

**Card styling:** `surface-1` background, subtle border (6-8% opacity), `border-radius: 8px`. Hover: border brightening or accent-subtle background shift.

**Animations:** Scroll-triggered `data-animate="stagger"` — cards fade in with stagger on scroll.

## Routing & Integration

- **Route:** `/projects` in `views.tsx`, calls projects service, renders `Projects` template
- **Template:** `src/server/templates/projects.tsx` using existing `Layout` component with meta/OG/JSON-LD
- **Service:** `src/server/services/projects.ts` — reads `/content/projects/*.md`, parses with `gray-matter`, sorts by `order`
- **Sitemap:** Add `/projects` to sitemap in `api.ts`
- **Nav:** Add "Projects" between "Insights" and "Work with me" (desktop + mobile)

## Dependencies

No new dependencies — uses existing `gray-matter`, GSAP, Tailwind.

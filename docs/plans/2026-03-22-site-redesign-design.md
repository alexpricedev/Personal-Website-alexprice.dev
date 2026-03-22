# Site Redesign — Design Document

## Summary

Full visual and structural redesign of the Alex Price fractional CTO website. Replaces DaisyUI "sunset" theme with a custom editorial design system (Instrument Serif, warm gold accent, tonal dark mode). All 4 pages get new layouts inspired by the attached mockup, using real existing content.

## Scope

- **Visual system:** Drop DaisyUI, build with plain Tailwind + CSS custom properties matching DESIGN.md
- **Content structure:** Restructure all page layouts for editorial aesthetic
- **Content source:** Existing real content, adapted to new structure
- **Pages affected:** Home, Insights listing, Insight post, Work With Me

## Approach: Foundation-First

Build shared infrastructure first, then each page on top of it.

---

## Layer 1: Foundation

### 1a. CSS & Tailwind Theme

- Remove DaisyUI plugin from `src/client/style.css`
- Remove `daisyui` from `package.json` dependencies
- Define color tokens as CSS custom properties with `[data-theme="dark"]` and `[data-theme="light"]` variants
- All tokens from DESIGN.md: surface-base, surface-1, surface-2, surface-3, text-primary, text-secondary, text-muted, accent, accent-dim, accent-subtle, border, border-hover
- Semantic colors: success, warning, error, info (with bg/border/text variants)
- Extend Tailwind theme: map CSS vars to utility classes
- Font families: `font-display` (Instrument Serif), `font-body` (Instrument Sans), `font-mono` (Geist Mono)
- Add Google Fonts `<link>` tags to layout component

### 1b. Layout Shell (`layouts.tsx`)

- Swap `data-theme="sunset"` to `data-theme="dark"`
- Remove all DaisyUI body classes
- Apply: `bg-surface-base text-text-primary font-body`
- Container max-width: 1200px
- Add Google Fonts links to `<head>`

### 1c. Navigation (`nav.tsx`)

- Custom nav replacing DaisyUI navbar
- Brand: "Alex Price" in Instrument Serif, left-aligned
- Links: Home, Insights, Work With Me — center-aligned, Instrument Sans
- CTA: "Book a call" gold pill button, right-aligned
- Sticky: `fixed top-0 w-full bg-surface-base/80 backdrop-blur-xl`
- Active page: accent color text
- Mobile: burger icon, dropdown with surface-1 background
- Tablet breakpoint: brand + burger + CTA button
- No DaisyUI dropdown — custom implementation

### 1d. Footer (`footer.tsx`)

- Minimal layout: brand left, social links right
- Top border: `border-t` using border token (6% opacity)
- Location in Geist Mono, text-muted
- Links: LinkedIn, GitHub, Email — text-muted, hover to accent

---

## Layer 2: Homepage (`home.tsx`)

### Hero (min-h-screen)

- Two-column layout: text left (dominant), headshot right
- Headline: Instrument Serif, display-lg size (clamp 3rem–5.5rem), with italic accent word in gold
- Subtext: Instrument Sans, text-secondary, max-w-lg
- CTA row: gold primary button + ghost secondary button
- Headshot: on surface-1 card, rounded-xl, subtle border, no heavy effects
- Below: metrics strip with 3-4 stats
  - Numbers in Instrument Serif (32px)
  - Labels in Geist Mono (11px, uppercase)
  - Separated by top border, flex layout with gaps

### Credibility Section

- Editorial paragraph: Ecologi/Just story
- Key company names styled as gold-accented text (not underlined links)
- Left-aligned, max-width 700px
- Generous vertical padding (100px+)

### "When to bring me in" Section

- Two cards side-by-side on surface-1
- Geist Mono tag at top of each card (e.g., "STRATEGIC GAPS")
- Instrument Serif heading
- Bullet list in Instrument Sans, text-secondary
- No colored borders — surface shift only
- Card padding: 36px, rounded-lg

### "The Engagement" Section

- Split layout: text left, image right
- Numbered steps (01, 02) in Instrument Serif
- Step descriptions in Instrument Sans
- Tags in accent-subtle pills for each step
- Image: existing `alex-working.webp`

### Testimonial Section

- Full-width surface-1 background
- Large italic Instrument Serif quote
- Small avatar + name + title in Geist Mono
- 100px+ vertical padding

### Final CTA Section

- Full-width accent (gold) background, rounded-2xl
- Dark text on gold (inverted)
- Large Instrument Serif heading
- Primary button (dark on gold) + text link

---

## Layer 3: Insights Listing (`insights.tsx`)

### Header

- Instrument Serif title: "Insights"
- Short description in text-secondary

### Pillar Filter (optional)

- Horizontal row of Geist Mono tags
- Active tag: accent-subtle background + accent text
- Inactive: text-muted

### Article List

- Vertical stack (not grid) — editorial feel
- Each article card:
  - Top: Geist Mono pillar tag + date + reading time
  - Headline: Instrument Serif, display-small
  - Excerpt: Instrument Sans, text-secondary, 2-3 lines
  - Bottom border separating cards (border token)
  - Hover: headline color transitions to accent

### Empty State

- Centered text with link to LinkedIn

---

## Layer 4: Single Insight (`insight.tsx`)

### Back Navigation

- "All insights" link in text-muted with left arrow

### Article Header

- Title: Instrument Serif, display-medium
- Below: Geist Mono pillar tag + date + reading time
- Author strip: small avatar + "Alex Price" + role

### Article Body

- Updated `.article-content` styles:
  - h2/h3: Instrument Serif
  - Body paragraphs: Instrument Sans, text-secondary, leading-relaxed
  - Blockquotes: gold left border (accent color), italic
  - Code: surface-2 background, Geist Mono
  - Pre blocks: surface-2 background, rounded-lg
  - Images: rounded-lg, vertical margin
  - HR: border token at 20% opacity
- Max-width 700px, centered

### Author Bio

- Divider
- Larger avatar (64px) + name + CTA button
- "Want to talk about this?" with gold "Book a call" button

---

## Layer 5: Work With Me (`work-with-me.tsx`)

### Header

- Instrument Serif headline: "How we can work together"
- Subtext in text-secondary

### The Problem

- Editorial paragraph, max-width 700px, text-secondary

### Engagement Models

- Two side-by-side cards on surface-1
- Geist Mono tag at top ("EMBEDDED" / "PROJECT")
- Instrument Serif card title
- Instrument Sans description
- Bottom stats strip: Instrument Serif numbers + Geist Mono labels
- Rounded-lg, 36px padding

### What to Expect

- Bulleted list with accent-colored checkmarks
- Instrument Sans body text

### Testimonial

- Same pattern as homepage testimonial section

### Not for Everyone / Investment

- Editorial text sections

### Final CTA

- Large avatar (112px) + heading
- Two buttons: Calendly (gold primary) + WhatsApp (green)
- Could use gold-background CTA pattern or simpler layout

---

## What Gets Removed

- DaisyUI dependency and all DaisyUI classes (`btn`, `card`, `badge`, `navbar`, `dropdown`, `menu`, `hero`, `divider`, `link`, `avatar`)
- DaisyUI theme configuration in `style.css`
- "sunset" theme reference

## What Stays

- All existing content (copy, testimonials, articles, images)
- Server-side rendering architecture
- Route structure and service layer
- Markdown article processing
- Analytics tracking
- SEO metadata and JSON-LD
- Responsive design approach (rebuilt with new breakpoints)
- Calendly + WhatsApp CTAs

## Design Reference

- `DESIGN.md` in repo root — complete token reference
- Preview page at `/tmp/design-consultation-preview-*.html` — visual reference for components
- Attached mockup `code.html` — layout/structure inspiration

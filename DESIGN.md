# Design System — Alex Price

## Product Context
- **What this is:** Personal brand and marketing site for a fractional CTO
- **Who it's for:** Series A/B founders and CEOs who need senior technical leadership
- **Space/industry:** Fractional CTO / tech advisory / startup consulting
- **Project type:** Marketing site with blog (insights)

## Aesthetic Direction
- **Direction:** Editorial/Magazine
- **Decoration level:** Intentional — subtle background shifts and tonal layering only. No glassmorphism, no gradients, no glow effects. Restraint is the statement.
- **Mood:** Quiet confidence. The site should feel like a high-end publication, not a developer portfolio or SaaS landing page. Typography does the heavy lifting. The content IS the design.

## Typography
- **Display/Hero:** Instrument Serif — editorial weight, intellectual authority. Serifs are rare in the tech advisory space, making the site instantly recognizable. Use italic for emphasis keywords (e.g., "scalable").
- **Body:** Instrument Sans — same foundry as Instrument Serif, effortless pairing. Clean, geometric, high legibility.
- **UI/Labels:** Instrument Sans — SemiBold, 13px, uppercase with 0.02em tracking for navigation and label contexts.
- **Data/Tags:** Geist Mono — for categories, reading times, metadata, technical details. Signals precision.
- **Code:** Geist Mono
- **Loading:** Google Fonts — `Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400` and `Instrument+Serif:ital@0;1` and `Geist+Mono:wght@400;500;600`
- **Scale:**
  - Display Large: 64px / 1.05 line-height / -0.03em tracking (clamp: 3rem–5.5rem)
  - Display Medium: 40px / 1.15 / -0.02em
  - Display Small: 28px / 1.2
  - Body: 16px / 1.7
  - Body Small: 14px / 1.65
  - Label: 13px / SemiBold / uppercase / 0.02em
  - Mono: 13px / 0.02em
  - Mono Small: 11px / 0.1em / uppercase

## Color

### Approach: Restrained
One warm accent + warm neutrals. Gold is used sparingly — rare = precious.

### Dark Mode (default)
- **Surface Base:** #0C0C0C — warm near-black
- **Surface 1:** #161616 — cards, elevated sections
- **Surface 2:** #1E1E1E — interactive elements, inputs
- **Surface 3:** #282828 — highest elevation, tag backgrounds
- **Text Primary:** #E8E3DD — warm cream (not pure white)
- **Text Secondary:** #8A8580 — warm muted gray for body text
- **Text Muted:** #5C5955 — metadata, timestamps, hints
- **Accent:** #C9A96E — warm gold, used only for CTAs, key highlights, and emphasis
- **Accent Dim:** #B8984F — hover state for accent
- **Accent Subtle:** rgba(201, 169, 110, 0.12) — tag backgrounds, subtle highlights
- **Border:** rgba(232, 227, 221, 0.06) — barely visible surface separation
- **Border Hover:** rgba(232, 227, 221, 0.12) — interactive border state

### Light Mode
- **Surface Base:** #FAF8F5
- **Surface 1:** #F0EDE8
- **Surface 2:** #E8E4DF
- **Surface 3:** #DDD8D2
- **Text Primary:** #1A1817
- **Text Secondary:** #6B6560
- **Text Muted:** #9B958E
- **Accent:** #A88840
- **Accent Dim:** #967A38
- **Accent Subtle:** rgba(168, 136, 64, 0.1)
- **Border:** rgba(26, 24, 23, 0.08)
- **Border Hover:** rgba(26, 24, 23, 0.15)

### Semantic Colors (dark mode)
- **Success:** #6EE7A0 / bg rgba(74, 222, 128, 0.08) / border rgba(74, 222, 128, 0.15)
- **Warning:** #FBBF24 / bg rgba(251, 191, 36, 0.08) / border rgba(251, 191, 36, 0.15)
- **Error:** #F87171 / bg rgba(248, 113, 113, 0.08) / border rgba(248, 113, 113, 0.15)
- **Info:** #60A5FA / bg rgba(96, 165, 250, 0.08) / border rgba(96, 165, 250, 0.15)

### Semantic Colors (light mode)
- **Success:** #15803D / bg rgba(22, 163, 74, 0.06) / border rgba(22, 163, 74, 0.2)
- **Warning:** #A16207 / bg rgba(202, 138, 4, 0.06) / border rgba(202, 138, 4, 0.2)
- **Error:** #DC2626 / bg rgba(220, 38, 38, 0.06) / border rgba(220, 38, 38, 0.2)
- **Info:** #2563EB / bg rgba(37, 99, 235, 0.06) / border rgba(37, 99, 235, 0.2)

## Spacing
- **Base unit:** 8px
- **Density:** Spacious — let the content breathe
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)
- **Section spacing:** 80-120px between major sections
- **Card padding:** 28-36px internal padding

## Layout
- **Approach:** Creative-editorial — asymmetric grid, dramatic scale shifts between headlines and body text
- **Grid:** Single column with max-width constraints per content type
- **Max content width:** 1200px (container), 700px (body text), 900px (headlines)
- **Border radius:** sm(4px) md(8px) lg(12px) full(9999px)
- **Borders:** Use rgba opacity borders (6-12% opacity). Borders should be felt, not seen. No solid colored borders.

## Motion
- **Approach:** Minimal-functional — only transitions that aid comprehension
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms)
- **What gets motion:** Hover states (color, border, transform), focus states. Nothing else.
- **What doesn't:** No entrance animations, no scroll effects, no parallax. Stillness = confidence.

## Component Patterns

### Buttons
- **Primary:** Background accent (#C9A96E), text #0C0C0C, rounded full, font-weight 600. Hover: accent-dim + translateY(-2px).
- **Ghost:** Transparent background, accent text, 1px border at 25% accent opacity. Hover: accent-subtle background + full accent border.

### Cards
- **Background:** Surface 1
- **Border:** 1px solid border token (6% opacity)
- **Border radius:** lg (12px)
- **Hover:** Border transitions to border-hover token (12% opacity)
- **Padding:** 28-36px

### Tags
- **Font:** Geist Mono, 11px, uppercase, 0.06em tracking
- **Background:** Accent subtle (12% opacity accent)
- **Color:** Accent
- **Border radius:** Full (pill shape)
- **Padding:** 6px 14px

### Inputs
- **Background:** Surface 2
- **Border:** 1px solid border token
- **Focus:** Border transitions to accent color
- **Font:** Instrument Sans, 15px
- **Padding:** 14px 18px
- **Border radius:** md (8px)

## Anti-patterns — Do NOT use
- Glassmorphism or backdrop-filter blur effects
- Gradient backgrounds or gradient buttons
- Neon/bright accent colors (no mint, no electric blue, no purple gradients)
- Box shadows for depth (use tonal surface shifts instead)
- Pure white (#FFFFFF) text on dark backgrounds (use warm cream #E8E3DD)
- Pure black (#000000) backgrounds (use warm #0C0C0C)
- Centered long-form text (keep left-aligned for editorial feel)
- Decorative icons in colored circles
- Animated backgrounds or floating elements
- 3-column feature grids with uniform card styling

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-22 | Initial design system created | Created by /design-consultation. Editorial/Magazine direction with Instrument Serif + warm gold accent to differentiate from generic tech advisory sites. Key insight: fractional CTO buyers are founders/CEOs who respond to editorial authority, not developer aesthetics. |
| 2026-03-22 | Serif display font (Instrument Serif) | Deliberate risk — serifs are rare in tech advisory. Communicates intellectual authority and editorial weight to founder audience. |
| 2026-03-22 | Warm gold accent (#C9A96E) instead of neon | Deliberate risk — signals "established premium" rather than "tech startup." Less techy, more consultancy. |
| 2026-03-22 | Zero decorative effects | Deliberate risk — no glass, gradients, or glow. Typography and whitespace are timeless. Confidence through restraint. |

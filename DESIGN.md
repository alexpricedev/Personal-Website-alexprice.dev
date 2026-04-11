# Design System — Alex Price

## Product Context
- **What this is:** Personal consulting site with a productized entry point (Vibe Code Audit, £150)
- **Who it's for:** Non-technical founders who built with AI tools and feel exposed
- **Space/industry:** Technical consulting / vibe code audit / architecture advisory
- **Project type:** Marketing site with blog (insights)
- **Positioning:** "Technical co-founder for hire — the person you text when something breaks"

## Aesthetic Direction
- **Direction:** Warm Minimalism
- **Decoration level:** Minimal — typography and whitespace do the work. No illustrations, no icons in circles, no abstract shapes. The restraint IS the design.
- **Mood:** The site should feel like walking into a well-lit studio where someone capable works. Not a SaaS product, not a dev tool, not a portfolio. A person's space. Clean, warm, considered.
- **Default mode:** Light mode. Non-technical founders (the actual buyers) prefer light mode. Dark mode available via system preference.

## Typography
- **Display/Hero:** General Sans (Fontshare) — tight, sharp geometric with enough character to not feel generic. Bold (700) for headlines, extra-bold (800) for emphasis. The precision says "I know what I'm doing."
- **Body:** Lora (Google Fonts) — warm screen-optimized serif. The sans display + serif body contrast is the signature. Grotesque headline meets personal letter. Says "I write things worth reading."
- **UI/Labels:** DM Sans (Google Fonts) — clean geometric for navigation, buttons, small UI elements. SemiBold (600), 13px, uppercase with 0.02em tracking for label contexts.
- **Data/Tags:** Commit Mono (Google Fonts) — for prices (£150), reading times, metadata, technical details. Signals precision.
- **Code:** Commit Mono
- **Loading:** Google Fonts for Lora, DM Sans, Commit Mono. Fontshare CDN for General Sans: `https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap`
- **Scale:**
  - Display Large: 64px / 1.05 line-height / -0.03em tracking / weight 700 (clamp: 3rem–5.5rem)
  - Display Medium: 40px / 1.15 / -0.02em / weight 700
  - Display Small: 28px / 1.2 / weight 700
  - Body: 17px / 1.7
  - Body Small: 15px / 1.65
  - Label: 13px / DM Sans / SemiBold / uppercase / 0.02em
  - Mono: 13px / 0.02em
  - Mono Small: 11px / 0.1em / uppercase

## Color

### Approach: Restrained
One warm accent + warm neutrals. Burnt terracotta is the decisive color move. Nobody in the vibe code audit space uses it. It reads as warm, European, sophisticated. Penguin Modern Classics, not Stripe.

### Light Mode (default)
- **Surface Base:** #F4F0E8 — warm off-white, aged paper
- **Surface 1:** #ECE7DC — cards, elevated sections
- **Surface 2:** #E3DDD2 — interactive elements, inputs
- **Surface 3:** #D9D3C7 — highest elevation, tag backgrounds
- **Text Primary:** #1A1714 — warm near-black
- **Text Secondary:** #4A4540 — warm dark brown-grey for body text
- **Text Muted:** #8A837A — metadata, timestamps, hints
- **Accent:** #BF5540 — burnt terracotta, used for CTAs, key highlights, and emphasis
- **Accent Hover:** #A34430 — deepened, not lightened
- **Accent Subtle:** rgba(191, 85, 64, 0.1) — tag backgrounds, subtle highlights
- **Border:** rgba(26, 23, 20, 0.08) — barely visible surface separation
- **Border Hover:** rgba(26, 23, 20, 0.15) — interactive border state

### Dark Mode
- **Surface Base:** #131210 — warm near-black
- **Surface 1:** #1D1A17 — cards, elevated sections
- **Surface 2:** #262320 — interactive elements, inputs
- **Surface 3:** #302D29 — highest elevation, tag backgrounds
- **Text Primary:** #EDE8DE — warm cream (not pure white)
- **Text Secondary:** #B5AFA7 — warm muted for body text
- **Text Muted:** #6B6560 — metadata, timestamps, hints
- **Accent:** #D06A52 — softened terracotta for dark backgrounds
- **Accent Hover:** #E07B62 — brighter, not just lighter
- **Accent Subtle:** rgba(208, 106, 82, 0.12) — tag backgrounds, subtle highlights
- **Border:** rgba(237, 232, 222, 0.06) — barely visible surface separation
- **Border Hover:** rgba(237, 232, 222, 0.12) — interactive border state

### Semantic Colors (light mode)
- **Success:** #2D7A4F / bg rgba(45, 122, 79, 0.08) / border rgba(45, 122, 79, 0.2)
- **Warning:** #A16207 / bg rgba(161, 98, 7, 0.08) / border rgba(161, 98, 7, 0.2)
- **Error:** #C53030 / bg rgba(197, 48, 48, 0.08) / border rgba(197, 48, 48, 0.2)
- **Info:** #2B6CB0 / bg rgba(43, 108, 176, 0.08) / border rgba(43, 108, 176, 0.2)

### Semantic Colors (dark mode)
- **Success:** #6EE7A0 / bg rgba(110, 231, 160, 0.08) / border rgba(110, 231, 160, 0.15)
- **Warning:** #FBBF24 / bg rgba(251, 191, 36, 0.08) / border rgba(251, 191, 36, 0.15)
- **Error:** #F87171 / bg rgba(248, 113, 113, 0.08) / border rgba(248, 113, 113, 0.15)
- **Info:** #60A5FA / bg rgba(96, 165, 250, 0.08) / border rgba(96, 165, 250, 0.15)

## Spacing
- **Base unit:** 8px
- **Density:** Spacious — let the content breathe
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)
- **Section spacing:** 80-120px between major sections
- **Card padding:** 28-36px internal padding

## Layout
- **Approach:** Creative-editorial — asymmetric composition, poster-like first viewport, left-weighted text
- **Grid:** Single column with max-width constraints per content type
- **Max content width:** 1200px (container), 700px (body text), 900px (headlines)
- **Border radius:** sm(4px) md(8px) lg(12px) full(9999px)
- **Borders:** Use rgba opacity borders (6-15% opacity). Borders should be felt, not seen. No solid colored borders.

## Motion
- **Approach:** Minimal-functional — only transitions that aid comprehension
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms)
- **What gets motion:** Hover states (color, border, transform), focus states, scroll-triggered section reveals (home page).
- **Scroll reveals:** Below-fold sections fade in with 24px upward translate on first scroll into view. 350ms, ease-out. Stagger at 80ms for grouped items. Hero: never animated.
- **What doesn't:** No parallax, no continuous/looping animations, no animated backgrounds. Restraint remains the default.
- **Reduced motion:** All scroll animations disabled when prefers-reduced-motion: reduce is active.

## Component Patterns

### Buttons
- **Primary:** Background accent (#BF5540 light / #D06A52 dark), text #FFFFFF, rounded full, font-weight 600, font-family DM Sans. Hover: accent-hover + translateY(-2px).
- **Ghost:** Transparent background, accent text, 1px border at 25% accent opacity. Hover: accent-subtle background + full accent border.

### Cards
- **Background:** Surface 1
- **Border:** 1px solid border token (8% opacity light / 6% opacity dark)
- **Border radius:** lg (12px)
- **Hover:** Border transitions to border-hover token
- **Padding:** 28-36px

### Tags
- **Font:** Commit Mono, 11px, uppercase, 0.06em tracking
- **Background:** Accent subtle (10-12% opacity accent)
- **Color:** Accent
- **Border radius:** Full (pill shape)
- **Padding:** 5px 12px

### Inputs
- **Background:** Surface 2
- **Border:** 1px solid border token
- **Focus:** Border transitions to accent color
- **Font:** Lora, 15px
- **Padding:** 14px 18px
- **Border radius:** md (8px)

## Anti-patterns — Do NOT use
- Glassmorphism or backdrop-filter blur effects
- Gradient backgrounds or gradient buttons
- Neon/bright accent colors (no mint, no electric blue, no purple gradients)
- Box shadows for depth (use tonal surface shifts instead)
- Pure white (#FFFFFF) text on dark backgrounds (use warm cream #EDE8DE)
- Pure black (#000000) backgrounds (use warm #131210)
- Centered long-form text (keep left-aligned for editorial feel)
- Decorative icons in colored circles
- Animated backgrounds or floating elements
- 3-column feature grids with uniform card styling
- Dark mode as default (light mode is the default for this audience)

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-22 | Initial design system created | Editorial/Magazine direction with Instrument Serif + warm gold accent. |
| 2026-04-10 | Full design system refresh | Repositioned for Vibe Code Audit + technical co-founder positioning. Competitive research showed all 7 audit competitors fall into dark-mode dev-tool or generic SaaS buckets. New direction: Warm Minimalism with General Sans + Lora + burnt terracotta to look like a trusted advisor, not an audit mill. |
| 2026-04-10 | Light mode default | Non-technical founders (the actual buyers) prefer light mode. Every competitor defaults dark. Light mode with warm paper tones says "I'm an advisor, not a dev tool." |
| 2026-04-10 | General Sans + Lora typography | Sans display + serif body contrast is the signature. General Sans (tight, sharp geometric) for confident headlines. Lora (warm screen serif) for readable body text. The contrast between bold grotesque and warm serif creates personality without decoration. |
| 2026-04-10 | Burnt terracotta accent (#BF5540) | Nobody in the audit space uses terracotta. It reads as warm, European, sophisticated. Confident and unconventional without being loud. |
| 2026-04-10 | Warm paper palette (#F4F0E8) | Warm off-white instead of clinical white or dark mode. Feels like aged paper, not a SaaS dashboard. Approachable and trustworthy. |

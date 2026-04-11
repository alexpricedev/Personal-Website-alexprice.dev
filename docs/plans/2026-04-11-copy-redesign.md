# Copy Redesign — "It's not a side project anymore."

**Date:** 2026-04-11
**Status:** Approved
**Red thread:** "It's not a side project anymore" — validates what founders built, names the transition, introduces the need for a second pair of eyes.

## Context

### Target audience
Non-technical founders who built a working product with AI tools (Cursor, Bolt, Lovable). Archetype: Dennis at HelloRevenue — vibe-coded an app, it works, people are paying, but he doesn't know what he doesn't know about the code underneath.

### Offer
- **Entry point:** Vibe Code Audit — £150 flat fee (written report + 30-min walkthrough)
- **Ongoing:** Hourly consulting — £75/30 min, £150/hr, 20-hour package £2,500 (£125/hr)
- **Free:** Common Issues self-assessment (10 issues + interactive checklist)

### Brand
"Alex Price, the Backseat CTO." Product brand with personal credibility underneath.

### Tone
Warm first, sharp when it counts. "I've been where you are, let me help" with occasional directness. Never condescending, never salesy.

### Design system
Warm minimalism. General Sans headlines, Lora body, burnt terracotta accent on warm paper. See DESIGN.md.

## Site structure

Four pages. "How It Works" is killed — folded into the homepage narrative.

| Page | Job | Red thread |
|------|-----|------------|
| **Home** | Name the problem, build trust, show the path | "It's not a side project anymore — here's what changes" |
| **Vibe Code Audit** | Close the £150 sale | "Find out what AI missed" |
| **Common Issues** | Free value, SEO, prove expertise | "Check it yourself first" |
| **About** | Credibility for people who need it | "I've been where your CTO would be" |

### Navigation

`Backseat CTO` | Common Issues | About | **Get your code audited →**

"Common Issues" is the free resource hook. Primary nav CTA drives to the audit page.

---

## Page 1: Homepage

The homepage is a single narrative scroll. Each section earns the next.

### Hero

- **Tag:** `BACKSEAT CTO`
- **Headline:** "It's not a side project anymore."
- **Intro:** "I'm Alex Price, the Backseat CTO. I help founders who built with AI make sure their code is ready for what comes next."
- **Price:** `From £75 per session · No retainer`
- **CTA Primary:** "Get your code audited — £150" → /vibe-code-audit
- **CTA Ghost:** "How it works ↓" → scroll
- **Stats** (right-aligned, vertical stack):
  - `12+` Years Building
  - `80+` Team Scaled To
  - `#8` LinkedIn Top UK
  - `18k` B2B Customers

### Section 1 — The tension

No visible heading. Editorial body copy, left-aligned, serif (Lora).

> You used Cursor or Bolt or Lovable and built something that actually works. People signed up. Someone paid you. You're not prototyping anymore — you're running a business.
>
> And the code underneath? It was built to see if the idea worked. Now the idea works, and you're wondering: is the foundation solid enough for what comes next?
>
> You don't need a CTO. You need someone who's done this before to take a look.

### Section 2 — Who I am

- **Tag:** `BACKSEAT CTO`
- **Heading:** "A second pair of eyes from someone who's been there"

> I'm Alex Price. I've spent 12 years building production systems, scaling engineering teams to 80+, and learning what breaks when things get real. I don't need to join your company. I just need to look at your code and tell you what I see.
>
> Architecture decisions. Security blind spots. The things AI tools generate but can't evaluate. One honest conversation is usually enough to know where you stand.

### Section 3 — When to bring me in

- **Heading:** "Two common starting points"

**Card 1: "You're building and you've hit a wall"**

> You can't prompt your way past it. The AI keeps going in circles. You need someone to look at the whole picture and tell you which direction to go.

- Architecture decisions that feel too big to guess
- Code that works but feels fragile
- "Am I doing this right?"

**Card 2: "You're about to go live"**

> It works in dev. But will it hold up with real users, real payments, real data? You need someone who knows what to check.

- Security and performance review
- Scalability and infrastructure
- Investor technical due diligence

### Section 4 — How it works

- **Heading:** "Three steps. No commitment."
- **Subheading:** "No retainer. No onboarding. Just senior technical help when you need it."

1. **"Email me what you're building"** — I reply within 24 hours with availability and whether I can help.
2. **"Share your code or context"** — A repo link, screenshots, a Loom. The more context, the more value.
3. **"We talk. I write it up."** — A live session followed by a written summary: what to fix, what's fine, what to focus on next.

**Pricing block:** `£75 / 30 min · £150 / hour · 20-hour package £2,500 (save £500)`

**Pull quote** (accent left-border, editorial callout):

> "I don't tell you what you want to hear. I tell you what's going to break, what's fine, and what to focus on next."

### Section 5 — Social proof

**Testimonial 1:**

> "Alex helped me cut through the noise when I was building HelloRevenue. Clear, honest technical guidance that took us from early-stage uncertainty to production readiness. If you're a non-technical founder who needs a technical partner you can trust, Alex is your guy."
> — **Dennis Hettema**, HelloRevenue

**Testimonial 2:**

> "He brought rigour to our architecture and delivery, and freed us up to focus on clients and strategy. If you need senior technical leadership without the overhead of a full-time hire, Alex is your guy."
> — **Andrew Black**, Naitiv

### Section 6 — Final CTA

Accent background block.

- **Heading:** "Not sure where to start?"

**Two paths, side by side:**

**Free:** "Check it yourself"
"Ten common issues AI tools get wrong, with fixes you can apply today."
→ Ghost button: "Free self-assessment" → /common-issues

**Paid:** "Get a professional audit — £150"
"I review your codebase and deliver a written report with a 30-minute walkthrough."
→ Primary button: "Get your code audited" → /vibe-code-audit

**Footer line:** "Or just email me what you're building. I'll get back to you within 24 hours."

---

## Page 2: Vibe Code Audit

The product page. Dennis clicked through from the homepage — he's interested but not yet committed. This page closes.

### Hero

- **Tag:** `VIBE CODE AUDIT · £150`
- **Headline:** "Find out what AI missed."
- **Subheading:** "A professional code review for apps built with Cursor, Bolt, Lovable, and other AI tools. Security, architecture, performance — everything your AI can't evaluate about its own work."
- **CTA:** "Get your code audited — £150" → mailto

### Section 1 — What you get

- **Heading:** "What's included"

1. **Security review** — Authentication, input validation, secrets management, data exposure
2. **Architecture assessment** — Database design, API structure, will it scale past your first 1,000 users?
3. **Performance analysis** — N+1 queries, missing indexes, asset loading — the things that slow you down at scale
4. **Code quality review** — Error handling, edge cases, the stuff AI generates but never tests
5. **Written report** — Prioritized findings with severity ratings and fix recommendations
6. **30-minute walkthrough** — We go through it together. You ask questions. You leave knowing exactly what to do.

### Section 2 — Who this is for

Two columns:

**This is for you if:**
- You built with AI and you're not sure what's under the hood
- You're about to launch and want a senior engineer to check your work
- Investors are going to ask about your tech and you want honest answers first
- You want the truth, not reassurance

**This isn't for you if:**
- You need someone to build it for you → *that's what CHPTRS is for*
- You want a rubber stamp for investors
- You're still at the idea stage with no code yet

### Section 3 — Sample findings

- **Heading:** "What a report looks like"

Example findings with severity badges:

`CRITICAL` **API keys exposed in client-side bundle**
Your Stripe secret key is imported directly in the frontend. Anyone with browser dev tools can see it.

`WARNING` **N+1 query pattern on dashboard**
The dashboard endpoint runs a separate database query for each item in the list. Fine for 10 rows, breaks at 1,000.

### Section 4 — Why human, not automated

- **Heading:** "What AI won't tell you"

> AI tools are great at generating code. They're terrible at evaluating it. Your AI assistant will never say "this authentication pattern has a race condition" or "this database schema won't survive 1,000 concurrent users." It generated the code — it thinks it's fine.
>
> I've spent 12 years building and breaking production systems. I know what fails at scale because I've been the one fixing it at 2am. This audit is the second opinion your AI can't give you.

### Section 5 — Process

- **Heading:** "How it works"

1. **Share access** — Read-only repo link and a brief description of what you built
2. **I review** — Full codebase audit, delivered in 3 working days
3. **Written report** — Prioritized findings, severity ratings, fix recommendations
4. **Walkthrough call** — 30 minutes, within a week. We go through everything together.

### Section 6 — FAQ

- **What kind of codebases?** Any language, any framework. If AI helped build it, I can audit it.
- **How long does it take?** Report in 3 working days. Walkthrough within a week.
- **What do you need from me?** Read-only repo access and a short description of your app.
- **What if I need help fixing things?** The report tells you exactly what to do. If you want hands-on help, I offer hourly consulting at £150/hr.
- **Is this just an automated scan?** No. Every finding is human-reviewed. Automated tools miss architectural decisions, scaling assumptions, and business logic issues. That's where the value is.

### Final CTA

> "Your AI built it. Let's make sure it holds up."

- **CTA:** "Get your code audited — £150" → mailto

---

## Page 3: Common Issues

Top-of-funnel free resource. Minimal copy changes from current — the content is already strong.

### Hero

- **Tag:** `FREE RESOURCE`
- **Headline:** "10 things AI gets wrong in your code"
- **Subheading:** "You built it fast. Here's what to check before it has to hold up."

### Body

Keep existing content exactly as-is:
- 10 issues with severity badges (Critical/Warning/Info)
- Fix recommendations for each
- Interactive checklist with checkbox counter
- Code Health Score framework (5 dimensions)

### CTA reveal (when <7 checked)

"The self-assessment catches the obvious stuff. A Vibe Code Audit catches what you didn't know to look for."

- **CTA:** "Get a professional audit — £150" → /vibe-code-audit

---

## Page 4: About

Credibility page. Shorter, warmer, more personal.

### Hero

- **Headline:** "About Alex"
- **Subheading:** "The person behind Backseat CTO."

### Bio

> I co-founded and was CTO at Ecologi, where we scaled from 3 to 80+ employees and 18,000 B2B customers. We hit #8 on LinkedIn's Top UK Startups in 2022. After my exit, I became CTO at Just, taking a pre-alpha concept to production.
>
> Now I run CHPTRS with my wife, and I started Backseat CTO because I kept seeing the same thing: founders building incredible products with AI, then making technical decisions that would cost them later. They didn't need a full-time CTO. They needed someone who'd done it before to look over their shoulder.

**Bold closer:** "I help founders who built with AI make the technical decisions that matter."

### Testimonials

Dennis Hettema (HelloRevenue) and Andrew Black (Naitiv) — fuller quotes than homepage.

### CTA

> "Ready to talk? Email me what you're building. I'll get back to you within 24 hours."

- **CTA:** "Get in touch" → mailto

---

## Implementation notes

- **Kill /how-it-works route** — redirect to homepage
- **Kill /work-with-me route** — redirect to homepage
- **Kill /projects route** — not needed, no content
- **Update nav** — `Backseat CTO | Common Issues | About | Get your code audited →`
- **Update all mailto links** — use configured contact email
- **Pricing consistency** — £75/30min, £150/hr, £2,500/20hr package everywhere

# alexprice.dev – Full Site Build Plan

## Project Overview

Personal website for Alex Price, fractional CTO. Primary goal is lead generation for fractional CTO engagements with Series A founders (specifically CEOs).

### Target Audience
- Series A CEOs who either need senior technical leadership or have a CTO co-founder who needs development
- Recruiters working on their behalf (secondary)

### Site Goals
1. Establish credibility and authority
2. House long-form content (destination for LinkedIn posts)
3. Convert visitors to discovery calls

### Tone & Voice
Direct, human, slightly vulnerable. No corporate speak. Matches authentic LinkedIn content style – honest about successes and failures.

---

## Tech Stack

- TypeScript
- Framework: Builder's choice (Next.js, Astro, etc.) – prioritise simplicity and speed
- Tailwind CSS
- Minimal dependencies
- Static generation preferred (fast, SEO-friendly)

---

## Global Components

### Navigation
Top nav, consistent across all pages:
- Home (/)
- Insights (/insights)
- Work with me (/work-with-me)
- Book a call (CTA style button, links to Calendly)

### Footer
- LinkedIn: https://linkedin.com/in/alexpricecto
- GitHub: https://github.com/alexpricedev
- Email: jobs@alexprice.dev

### Design Direction
- Clean, minimal, fast-loading
- No stock photos
- Generous whitespace
- Typography-led (strong headline hierarchy)
- Dark or light theme – builder's discretion, avoid generic "startup blue"
- Mobile-first responsive
- Readable measure for body text (max-width ~680px)

---

## Page 1: Homepage (/)

### 1.1 Hero Section

**Headline:**
Fractional CTO who builds things that don't need him

**Subhead:**
Hiring a full-time CTO is expensive, slow, and high-risk. I'll tell you the hard truths, move fast, and either hire my replacement or make the role unnecessary. Then I leave.

**Image:**
Placeholder for headshot

**CTA Button:**
Book a call → https://calendly.com/alexprice (placeholder)

### 1.2 Credibility Strip

Single line or small block, understated but visible:

"Former CTO/CPO at Ecologi – scaled from 3 to 80+ engineers, 18,000 B2B customers, LinkedIn Top 10 UK Startups 2022, exit. Most recently CTO at Just About, taking a pre-alpha concept to production."

### 1.3 When Do You Need Someone Like Me

**Section Headline:**
When do you need someone like me

**Copy:**
Two situations where I help:

You don't have a CTO – and need senior technical leadership without the cost and risk of a full-time hire.

You have a CTO – but they're struggling with the transition from engineer to leader. You want to develop them, not replace them.

### 1.4 The Approach

**Section Headline:**
How this works

**Copy:**
From one day a week to a three-month transformation. I embed with your team, figure out what's actually broken, and fix it – or hire someone brilliant who will.

No dependency. No extended retainers. Success means I'm no longer needed.

**Who it's not for (subtext or callout):**
If you want someone to nod along or move cautiously, I'm not your person. This works best with founders who want speed and can handle direct feedback.

### 1.5 Final CTA

**Headline:**
Ready to talk?

**CTA Button:**
Book a call → same Calendly link

---

## Page 2: Insights (/insights)

### 2.1 Purpose

Content hub for long-form articles. Destination for LinkedIn post deep-dives. Builds authority through demonstrated expertise.

### 2.2 Content Pillars (for tagging)

1. Scaling engineering organisations
2. Fundraising readiness
3. Practical AI implementation
4. Founder war stories

Pillars used as subtle filter tags – don't over-engineer the UI.

### 2.3 Page Header

**Page Title:**
Insights

**Subtitle:**
Lessons from scaling teams, raising funds, and making mistakes.

### 2.4 Article List

Reverse-chronological feed.

**Each article card displays:**
- Title (linked to full article)
- Publication date
- Reading time (calculated or manual)
- Short excerpt (1-2 sentences)
- Pillar tag (subtle, optional)

No featured images – typography-driven, keeps it clean and fast.

### 2.5 Empty State

For launch when no articles exist:

"First post coming soon. In the meantime, find me on [LinkedIn](https://linkedin.com/in/alexpricecto)."

### 2.6 Individual Article Page (/insights/[slug])

**Structure:**
- Article title
- Publication date + reading time
- Body content (Markdown rendered)
- Author sign-off: "– Alex"
- CTA at bottom: "Want to talk about this? [Book a call]"
- Back link: "← All insights"

**Content format:**
- Markdown files or headless CMS (builder's choice)
- Support for headings, paragraphs, inline code, blockquotes, links
- No embedded images required initially

**Technical notes:**
- Generate slugs from filenames or frontmatter
- Basic SEO: meta title, description per article

---

## Page 3: Work With Me (/work-with-me)

### 3.1 Purpose

Explains what a fractional CTO engagement looks like. Provides enough clarity to book confidently. Filters out bad fits before they reach the calendar.

### 3.2 Page Header

**Page Title:**
Work with me

**Subtitle:**
Fractional CTO for Series A startups who need to move fast and get it right.

### 3.3 The Problem

**Copy:**
You need senior technical leadership but hiring a full-time CTO is expensive, slow, and risky. You might not even need one permanently – you need the right decisions made now.

### 3.4 What I Do

**Section Headline:**
How I can help

**Copy:**
Two ways to work together:

**Embedded support**
One to two days per week. I join your team, attend the meetings that matter, and help you make better technical and hiring decisions. Ongoing until you don't need me.

**Transformation project**
A focused 3-month engagement. We identify what's broken, fix it, and either hire your permanent CTO or build systems that don't require one. Clear scope, clear exit.

### 3.5 What You Get

**Section Headline:**
What to expect

**Copy:**
- Direct feedback on what's working and what isn't
- Hands-on help with architecture, hiring, and team structure
- Someone who's done this before – 3 to 80+ engineers, funding rounds, exit
- No dependency – I measure success by how quickly I'm not needed

### 3.6 Who This Isn't For

**Section Headline:**
Not for everyone

**Copy:**
This works best with founders who want speed, can handle direct feedback, and are ready to act on it.

If you're looking for someone to validate decisions you've already made or move cautiously, I'm not your person.

### 3.7 Pricing

**Section Headline:**
Investment

**Copy:**
Pricing depends on scope and time commitment. Book a call and we'll figure out what makes sense.

### 3.8 CTA

**Headline:**
Let's talk

**Subhead:**
30 minutes to see if there's a fit. No pitch, no pressure.

**CTA Button:**
Book a call → Calendly link

---

## Out of Scope (for now)

- About page (Ecologi story can be expanded later)
- Case studies section
- Testimonials (to be added when available)
- Newsletter / email capture
- Search functionality on Insights
- Pagination on Insights (until 10+ articles)
- Comments on articles
- Social share buttons
- Analytics integration

---

## Build Priority

1. Homepage – core conversion page
2. Work with me – supports conversion
3. Insights – content foundation (can launch with empty state)

---

## Assets Required

- Headshot (already exists on CV)
- Calendly booking link (confirm URL)
- Social links (confirmed in footer spec)

---

## Post-Launch Considerations

- Add testimonials section to homepage when available
- Expand Ecologi story into standalone case study
- Add email capture if newsletter strategy develops
- Analytics (Plausible, Fathom, or similar – privacy-friendly)
import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

const auditIncludes = [
  {
    title: "Security review",
    description:
      "Authentication, authorization, input validation, secrets management. The things AI tools consistently get wrong.",
  },
  {
    title: "Architecture assessment",
    description:
      "Database design, API structure, hosting choices. Will this hold up at 1,000 users? 10,000?",
  },
  {
    title: "Performance analysis",
    description:
      "N+1 queries, missing indexes, unoptimized assets. The silent killers of user experience.",
  },
  {
    title: "Code quality review",
    description:
      "Error handling, edge cases, maintainability. What happens when things go wrong?",
  },
  {
    title: "Written report",
    description:
      "A prioritised list of findings with severity ratings, clear explanations, and specific fix recommendations. Not a checklist — a roadmap.",
  },
  {
    title: "30-minute walkthrough call",
    description:
      "We go through the report together. Ask anything. I'll make sure you understand every finding and what to do about it.",
  },
];

const faqs = [
  {
    q: "What kind of codebases do you audit?",
    a: "Web applications, APIs, and SaaS products. Any language, any framework. I've worked across the stack for 12+ years. If you built it with Cursor, Bolt, Lovable, Replit, or similar AI tools, this audit is specifically designed for you.",
  },
  {
    q: "How long does the audit take?",
    a: "You'll have the written report within 3 working days of sharing access. The walkthrough call is scheduled at a time that works for both of us, usually within a week.",
  },
  {
    q: "What do you need from me?",
    a: "Read-only access to your code repository (GitHub, GitLab, etc.) and a brief description of what the app does. That's it.",
  },
  {
    q: "What if I need help fixing the issues?",
    a: "The report is designed to be actionable — you or your AI tools can fix most issues directly from the recommendations. If you want hands-on help, I offer hourly consulting at £75/hr.",
  },
  {
    q: "Is this just an automated scan?",
    a: "No. Automated tools catch syntax issues and known vulnerabilities. I find the architectural decisions, security patterns, and scaling problems that tools miss. Every finding is written by a human who's built and scaled production systems.",
  },
];

export const VibeCodeAudit = () => (
  <Layout
    title="Vibe Code Audit"
    description="Professional code audit for AI-built applications. Security, architecture, and performance review with a written report and walkthrough call. £150."
    name="vibe-code-audit"
    path="/vibe-code-audit"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      {/* Hero */}
      <header className="mb-20">
        <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
          Vibe Code Audit
        </span>
        <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4 max-w-[900px]">
          You built it with AI. I'll tell you if it's going to hold up.
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl mb-6">
          A professional code audit for applications built with Cursor, Bolt,
          Lovable, and other AI tools. Security, architecture, performance —
          everything your AI assistant can't evaluate about its own work.
        </p>
        <div className="flex items-baseline gap-4 mb-8">
          <span className="font-display text-[clamp(2rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-text-primary">
            £150
          </span>
          <span className="text-text-muted text-lg">flat fee</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Vibe%20Code%20Audit&body=Hi%20Alex%2C%0A%0AI%27d%20like%20a%20code%20audit%20for%20my%20project.%0A%0AHere%27s%20what%20I%27m%20building%3A%20%5Bbrief%20description%5D%0ARepo%3A%20%5Blink%5D`}
            className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-lg px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
          >
            Book your audit
          </a>
          <a
            href="/common-issues"
            className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
          >
            Free self-assessment first →
          </a>
        </div>
      </header>

      {/* What you get */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          What you get
        </h2>
        <div data-animate="stagger" className="grid md:grid-cols-2 gap-6">
          {auditIncludes.map((item) => (
            <div
              key={item.title}
              className="bg-surface-1 rounded-[12px] border border-border p-7 hover:border-border-hover transition-colors duration-300"
            >
              <h3 className="font-semibold text-[16px] mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-[1.65]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for / isn't for */}
      <section data-animate="section" className="mb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-9">
            <h3 className="font-display text-[22px] leading-[1.3] mb-6">
              This is for you if…
            </h3>
            <ul className="space-y-3 text-text-secondary leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You built your app with AI tools and aren't 100% sure what's
                under the hood
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You're about to launch and want someone senior to check it first
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You're raising money and investors will ask about your tech
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0 mt-1">✓</span>
                You want honest answers, not reassurance
              </li>
            </ul>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-9">
            <h3 className="font-display text-[22px] leading-[1.3] mb-6">
              This isn't for you if…
            </h3>
            <ul className="space-y-3 text-text-secondary leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-text-muted shrink-0 mt-1">✗</span>
                You need someone to build it for you (try{" "}
                <a
                  href="https://chptrs.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dim transition-colors duration-200"
                >
                  CHPTRS
                </a>
                )
              </li>
              <li className="flex gap-3">
                <span className="text-text-muted shrink-0 mt-1">✗</span>
                You just want a certificate to show investors (this is real
                feedback, not a rubber stamp)
              </li>
              <li className="flex gap-3">
                <span className="text-text-muted shrink-0 mt-1">✗</span>
                Your app is still at the idea stage with no code written yet
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sample report mockup */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          What the report looks like
        </h2>
        <div className="bg-surface-1 rounded-[12px] border border-border p-7 sm:p-9 max-w-[700px]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase bg-[rgba(197,48,48,0.08)] text-[#C53030] px-3 py-1 rounded-full border border-[rgba(197,48,48,0.2)]">
                  Critical
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  Security
                </span>
              </div>
              <h4 className="font-semibold text-[16px] mb-2">
                API keys exposed in client bundle
              </h4>
              <p className="text-text-secondary text-sm leading-[1.65]">
                Your Stripe secret key and database connection string are
                included in the client-side JavaScript bundle. Anyone can view
                these in browser dev tools. Move these to server-side
                environment variables immediately.
              </p>
            </div>
            <div className="border-t border-border" />
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase bg-[rgba(161,98,7,0.08)] text-[#A16207] px-3 py-1 rounded-full border border-[rgba(161,98,7,0.2)]">
                  Warning
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  Performance
                </span>
              </div>
              <h4 className="font-semibold text-[16px] mb-2">
                N+1 query in dashboard endpoint
              </h4>
              <p className="text-text-secondary text-sm leading-[1.65]">
                The /api/dashboard endpoint makes a separate database query for
                each user's projects. With 100 users, that's 101 queries per
                request. Use a JOIN or batch query to reduce this to 2 queries.
              </p>
            </div>
            <div className="border-t border-border" />
            <p className="text-text-muted text-sm italic">
              + 8 more findings with severity, category, and specific fix
              recommendations…
            </p>
          </div>
        </div>
      </section>

      {/* What AI won't tell you */}
      <section data-animate="section" className="mb-20">
        <div className="bg-surface-2 rounded-[12px] border border-border p-7 sm:p-9 max-w-[700px]">
          <h3 className="font-display text-[22px] leading-[1.3] mb-4">
            What AI won't tell you about your code
          </h3>
          <p className="text-text-secondary leading-[1.7] mb-4">
            AI tools are great at generating code. They're terrible at
            evaluating it. Your AI assistant will never say "this authentication
            pattern has a race condition" or "this database schema won't survive
            1,000 concurrent users." It generated the code — it thinks it's
            fine.
          </p>
          <p className="text-text-secondary leading-[1.7]">
            A vibe code audit is the second opinion your AI can't give you. I've
            spent 12+ years building and breaking production systems. I know
            what fails at scale because I've been the one debugging it at 2am.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          Questions
        </h2>
        <div className="max-w-[700px] space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold text-[16px] mb-2">{faq.q}</h3>
              <p className="text-text-secondary text-sm leading-[1.65]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border my-10" />
      <section data-animate="section" className="py-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <img
            src="/headshot2.webp"
            alt="Alex Price"
            className="w-28 h-28 rounded-full object-cover shrink-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-2">
              Get your code audited
            </h2>
            <p className="text-text-secondary mb-4">
              Send me your repo link. You'll have the report within 3 working
              days.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Vibe%20Code%20Audit&body=Hi%20Alex%2C%0A%0AI%27d%20like%20a%20code%20audit%20for%20my%20project.%0A%0AHere%27s%20what%20I%27m%20building%3A%20%5Bbrief%20description%5D%0ARepo%3A%20%5Blink%5D`}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-accent text-white font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="text-text-muted text-sm hidden sm:inline">
                or
              </span>
              <a
                href="https://wa.me/447356066058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 text-text-secondary border border-text-muted font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:text-text-primary hover:border-text-secondary transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  <path d="M8 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M16 12h.01" />
                </svg>
                WhatsApp me
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

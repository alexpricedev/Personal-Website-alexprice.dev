import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

const healthDimensions = [
  {
    name: "Security",
    description: "Authentication, authorization, secrets, input validation",
  },
  {
    name: "Architecture",
    description: "Database design, API structure, separation of concerns",
  },
  {
    name: "Performance",
    description: "Query efficiency, caching, asset optimization",
  },
  {
    name: "Reliability",
    description: "Error handling, edge cases, failure recovery",
  },
  {
    name: "Maintainability",
    description: "Code organization, naming, complexity management",
  },
];

const issueCards = [
  {
    category: "Security",
    severity: "critical",
    title: "API keys in client-side code",
    description:
      "AI tools frequently place secret keys and database credentials in client-accessible files. Anyone viewing your page source can see them.",
    fix: "Move all secrets to server-side environment variables. Never import them in client-facing code.",
  },
  {
    category: "Security",
    severity: "critical",
    title: "No input validation on API endpoints",
    description:
      "AI-generated APIs often trust all incoming data. Without validation, attackers can inject SQL, access other users' data, or crash your server.",
    fix: "Validate and sanitize all user input at the API boundary. Use a schema validation library like Zod.",
  },
  {
    category: "Architecture",
    severity: "warning",
    title: "Business logic in API route handlers",
    description:
      "AI tools tend to put everything in one file. When your route handler does validation, database queries, email sending, and response formatting, it becomes impossible to test or reuse.",
    fix: "Extract business logic into service functions. Route handlers should only parse requests and return responses.",
  },
  {
    category: "Architecture",
    severity: "warning",
    title: "No database migrations",
    description:
      "AI tools often modify database schemas directly. Without migrations, you can't reproduce your database state, roll back changes, or deploy reliably.",
    fix: "Use a migration tool (Prisma, Drizzle, Knex). Every schema change should be a versioned migration file.",
  },
  {
    category: "Performance",
    severity: "warning",
    title: "N+1 database queries",
    description:
      "The most common performance killer in AI-generated code. Loading a list of items, then making a separate query for each item's related data.",
    fix: "Use JOINs, eager loading, or batch queries. If you're making queries in a loop, it's probably an N+1.",
  },
  {
    category: "Performance",
    severity: "info",
    title: "No database indexes on filtered columns",
    description:
      "AI tools create tables but rarely add indexes. Without them, every query scans the entire table. Fine with 100 rows, unusable with 100,000.",
    fix: "Add indexes on columns you filter, sort, or join on. Start with foreign keys and any column in a WHERE clause.",
  },
  {
    category: "Reliability",
    severity: "warning",
    title: "No error boundaries or fallback UI",
    description:
      "When an API call fails or a component throws, the entire page crashes with a white screen. AI tools rarely generate error handling.",
    fix: "Add try/catch around API calls, error boundaries around React components, and loading/error states for all async data.",
  },
  {
    category: "Reliability",
    severity: "info",
    title: "Hardcoded configuration values",
    description:
      "URLs, feature flags, and limits scattered as string literals throughout the code. Works in development, breaks when you deploy.",
    fix: "Centralize configuration in environment variables or a config module. Different values per environment.",
  },
  {
    category: "Maintainability",
    severity: "info",
    title: "500+ line components",
    description:
      "AI tools generate everything in one file because they optimize for single-prompt output. The result is unmaintainable monoliths.",
    fix: "Break components into focused pieces. If you can't describe what a component does in one sentence, it's doing too much.",
  },
  {
    category: "Maintainability",
    severity: "warning",
    title: "No TypeScript or loose types everywhere",
    description:
      "AI tools often use 'any' or skip types entirely. This means your editor can't catch bugs, and refactoring becomes guesswork.",
    fix: "Enable strict TypeScript. Define types for your API responses, database models, and component props.",
  },
  {
    category: "Security",
    severity: "warning",
    title: "No CORS configuration",
    description:
      "AI tools build frontends and APIs separately but rarely configure CORS headers. The first deploy to separate domains breaks every API call.",
    fix: "Configure CORS on your API to allow your frontend origin. Use a whitelist, not a wildcard.",
  },
  {
    category: "Security",
    severity: "warning",
    title: "No rate limiting on public endpoints",
    description:
      "AI-generated APIs accept unlimited requests. One bot or angry user can run up your database costs or take down your app with a simple loop.",
    fix: "Add rate limiting middleware to all public endpoints. Start with 60 requests per minute per IP.",
  },
  {
    category: "Reliability",
    severity: "warning",
    title: "Auth redirect loops",
    description:
      "AI tools often misconfigure auth middleware, creating infinite redirect loops between login and protected pages. The app appears completely broken.",
    fix: "Ensure auth middleware has proper redirect logic with a clear unauthenticated landing page that doesn't itself require auth.",
  },
  {
    category: "Reliability",
    severity: "critical",
    title: "No production error monitoring",
    description:
      "Without error tracking, you only learn about production bugs when users complain — or leave. AI tools never set up monitoring because they only work in development.",
    fix: "Add an error monitoring service (Sentry, LogRocket, or similar). Set up alerts for error rate spikes.",
  },
];

const checklistItems = [
  "All API keys and secrets are in environment variables, not in client code",
  "Every API endpoint validates its input before processing",
  "Database schema changes are tracked with migration files",
  "No database queries inside loops (no N+1 patterns)",
  "Filtered and sorted columns have database indexes",
  "All API calls have error handling with user-facing fallback UI",
  "Configuration values come from environment variables, not hardcoded strings",
  "No single file is longer than 300 lines",
  "TypeScript strict mode is enabled with no 'any' types",
  "You can deploy to a new environment without changing any code",
  "CORS is configured to allow only your frontend origin, not wildcard",
  "Public API endpoints have rate limiting enabled",
  "Auth flows have been tested end-to-end with no redirect loops",
  "Production errors are tracked and alerting is configured",
];

const severityStyles: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  critical: {
    bg: "bg-[rgba(197,48,48,0.08)]",
    text: "text-[#C53030]",
    border: "border-[rgba(197,48,48,0.2)]",
    label: "Critical",
  },
  warning: {
    bg: "bg-[rgba(161,98,7,0.08)]",
    text: "text-[#A16207]",
    border: "border-[rgba(161,98,7,0.2)]",
    label: "Warning",
  },
  info: {
    bg: "bg-[rgba(43,108,176,0.08)]",
    text: "text-[#2B6CB0]",
    border: "border-[rgba(43,108,176,0.2)]",
    label: "Info",
  },
};

export const CommonIssues = () => (
  <Layout
    title="Common Issues"
    description="The 14 most common problems in AI-generated code. Free self-assessment checklist to check your code's health."
    name="common-issues"
    path="/common-issues"
    ogImage="/og-common-issues.png"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      {/* Hero */}
      <header className="mb-20 flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
        <div className="flex-1 min-w-0">
          <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
            Free resource
          </span>
          <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4 max-w-[900px]">
            14 things AI tools get wrong in your codebase
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
            You built it fast. Here's what to check before it has to hold up.
          </p>
        </div>
        <div
          className="flex-shrink-0 mt-12 md:mt-0 flex justify-center"
          data-animate="iceberg"
        >
          <svg
            data-iceberg
            role="img"
            aria-label="Iceberg diagram showing visible vs hidden software issues"
            viewBox="-140 0 700 600"
            className="w-[340px] lg:w-[420px] h-[500px] lg:h-[600px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Above-water tip + labels */}
            <g data-iceberg-tip>
              {/* Tip facets */}
              <polygon
                points="210,20 170,150 250,150"
                fill="var(--color-surface-3)"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="210,20 250,150 280,150"
                fill="var(--color-surface-2)"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="210,20 140,150 170,150"
                fill="var(--color-surface-2)"
                stroke="var(--color-border)"
                strokeWidth="1"
              />

              {/* Above-water labels */}
              <line
                x1="250"
                y1="60"
                x2="310"
                y2="60"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text
                x="316"
                y="63"
                fill="var(--color-text-primary)"
                fontFamily="'Commit Mono', monospace"
                fontSize="10"
                letterSpacing="0.06em"
                style={{ textTransform: "uppercase" }}
              >
                BEAUTIFUL UI
              </text>

              <line
                x1="170"
                y1="90"
                x2="100"
                y2="90"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text
                x="94"
                y="93"
                fill="var(--color-text-primary)"
                fontFamily="'Commit Mono', monospace"
                fontSize="10"
                letterSpacing="0.06em"
                textAnchor="end"
                style={{ textTransform: "uppercase" }}
              >
                PRETTY DASHBOARDS
              </text>

              <line
                x1="240"
                y1="120"
                x2="310"
                y2="120"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text
                x="316"
                y="123"
                fill="var(--color-text-primary)"
                fontFamily="'Commit Mono', monospace"
                fontSize="10"
                letterSpacing="0.06em"
                style={{ textTransform: "uppercase" }}
              >
                DEMO WITH FAKE DATA
              </text>
            </g>

            {/* Waterline */}
            <g data-iceberg-waterline>
              {/* Water tint below the surface */}
              <rect
                x="-140"
                y="150"
                width="700"
                height="450"
                fill="var(--color-text-muted)"
                fillOpacity="0.08"
              />
              {/* Water surface highlight band */}
              <rect
                x="-140"
                y="147"
                width="700"
                height="6"
                fill="var(--color-text-muted)"
                fillOpacity="0.2"
              />
              {/* Waterline */}
              <line
                x1="-140"
                y1="150"
                x2="560"
                y2="150"
                stroke="var(--color-text-secondary)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              {/* Waterline labels */}
              <text
                x="556"
                y="145"
                fill="var(--color-text-muted)"
                fontFamily="'Commit Mono', monospace"
                fontSize="8"
                letterSpacing="0.1em"
                textAnchor="end"
                style={{ textTransform: "uppercase" }}
              >
                WATERLINE
              </text>
            </g>

            {/* Below-water facets */}
            <g data-iceberg-depth>
              <polygon
                points="140,150 210,400 100,280"
                fill="var(--color-surface-1)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="140,150 280,150 210,400"
                fill="var(--color-surface-2)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="280,150 320,280 210,400"
                fill="var(--color-surface-1)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="100,280 210,400 80,400"
                fill="var(--color-surface-2)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="320,280 340,400 210,400"
                fill="var(--color-surface-2)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="80,400 210,400 210,560"
                fill="var(--color-surface-1)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <polygon
                points="340,400 210,400 210,560"
                fill="var(--color-surface-2)"
                fillOpacity="0.8"
                stroke="var(--color-border)"
                strokeWidth="1"
              />
            </g>

            {/* Below-water labels */}
            <g data-iceberg-labels>
              <g data-iceberg-label>
                <line
                  x1="130"
                  y1="200"
                  x2="30"
                  y2="200"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="203"
                  fill="var(--color-text-secondary)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  textAnchor="end"
                  style={{ textTransform: "uppercase" }}
                >
                  ENVIRONMENT VARIABLES
                </text>
              </g>
              <g data-iceberg-label>
                <line
                  x1="290"
                  y1="240"
                  x2="370"
                  y2="240"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="376"
                  y="243"
                  fill="var(--color-text-secondary)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  style={{ textTransform: "uppercase" }}
                >
                  AUTH REDIRECTS
                </text>
              </g>
              <g data-iceberg-label>
                <line
                  x1="115"
                  y1="290"
                  x2="30"
                  y2="290"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="293"
                  fill="var(--color-text-secondary)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  textAnchor="end"
                  style={{ textTransform: "uppercase" }}
                >
                  CORS ERRORS
                </text>
              </g>
              <g data-iceberg-label>
                <line
                  x1="300"
                  y1="340"
                  x2="370"
                  y2="340"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="376"
                  y="343"
                  fill="var(--color-text-secondary)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  style={{ textTransform: "uppercase" }}
                >
                  DATABASE MIGRATIONS
                </text>
              </g>
              <g data-iceberg-label>
                <line
                  x1="110"
                  y1="400"
                  x2="30"
                  y2="400"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="403"
                  fill="var(--color-text-muted)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  textAnchor="end"
                  style={{ textTransform: "uppercase" }}
                >
                  RATE LIMITS
                </text>
              </g>
              <g data-iceberg-label>
                <line
                  x1="300"
                  y1="460"
                  x2="370"
                  y2="460"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="376"
                  y="463"
                  fill="var(--color-text-muted)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  style={{ textTransform: "uppercase" }}
                >
                  BUILD FAILURES
                </text>
              </g>
              <g data-iceberg-label>
                <line
                  x1="195"
                  y1="520"
                  x2="30"
                  y2="520"
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="523"
                  fill="var(--color-text-muted)"
                  fontFamily="'Commit Mono', monospace"
                  fontSize="10"
                  letterSpacing="0.06em"
                  textAnchor="end"
                  style={{ textTransform: "uppercase" }}
                >
                  PRODUCTION DEBUGGING
                </text>
              </g>
            </g>
          </svg>
        </div>
      </header>

      {/* Health Score Framework */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          The Code Health Score
        </h2>
        <p className="text-text-secondary leading-[1.7] max-w-[700px] mb-8">
          I evaluate every codebase across five dimensions. Most AI-built
          applications score well on maintainability (the code runs) but poorly
          on security and reliability (it runs until someone pokes it).
        </p>
        <div
          data-animate="stagger"
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {healthDimensions.map((dim) => (
            <div
              key={dim.name}
              className="bg-surface-1 rounded-[12px] border border-border p-5 text-center"
            >
              <h3 className="font-display text-[16px] font-semibold mb-1">
                {dim.name}
              </h3>
              <p className="text-text-muted text-xs leading-[1.5]">
                {dim.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Issue Cards */}
      <section className="mb-20">
        <h2
          data-animate="section"
          className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8"
        >
          The 14 most common issues
        </h2>
        <div data-animate="stagger" className="space-y-6 max-w-[700px]">
          {issueCards.map((issue, i) => {
            const severity = severityStyles[issue.severity];
            return (
              <div
                key={issue.title}
                className="bg-surface-1 rounded-[12px] border border-border p-7"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[13px] text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`inline-block font-mono text-[11px] tracking-[0.06em] uppercase ${severity.bg} ${severity.text} px-3 py-1 rounded-full border ${severity.border}`}
                  >
                    {severity.label}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                    {issue.category}
                  </span>
                </div>
                <h3 className="font-semibold text-[16px] mb-2">
                  {issue.title}
                </h3>
                <p className="text-text-secondary text-sm leading-[1.65] mb-3">
                  {issue.description}
                </p>
                <p className="text-sm leading-[1.65]">
                  <strong className="text-text-primary">Fix: </strong>
                  <span className="text-text-secondary">{issue.fix}</span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Self-Assessment Checklist */}
      <section data-animate="section" className="mb-20">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          Quick self-assessment
        </h2>
        <p className="text-text-secondary leading-[1.7] max-w-[700px] mb-8">
          Check off each item that's true for your codebase. Be honest — the
          only person you're fooling is yourself.
        </p>
        <div className="max-w-[700px]" data-checklist>
          <div className="space-y-3">
            {checklistItems.map((item) => (
              <label
                key={item}
                className="flex items-start gap-4 bg-surface-1 rounded-[12px] border border-border p-5 cursor-pointer hover:border-border-hover transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  data-checklist-item
                />
                <span className="shrink-0 w-5 h-5 mt-0.5 rounded border-2 border-text-muted/30 flex items-center justify-center transition-all duration-200 peer-checked:bg-accent peer-checked:border-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    role="img"
                    aria-label="Checkmark"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-text-secondary text-sm leading-[1.65] peer-checked:text-text-primary transition-colors duration-200">
                  {item}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p
              className="font-mono text-[13px] text-text-muted"
              data-checklist-counter
            >
              0 of 14 checked
            </p>
          </div>
          <div
            className="mt-8 bg-accent rounded-[12px] p-6 sm:p-8 hidden"
            data-checklist-cta
          >
            <p className="text-white font-semibold mb-2">
              The self-assessment catches the obvious stuff.
            </p>
            <p className="text-white/70 text-sm mb-4">
              A Vibe Code Audit catches what you didn't know to look for.
            </p>
            <a
              href="/vibe-code-audit"
              className="inline-flex items-center justify-center bg-white text-accent font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-all duration-200"
            >
              Get your code audited — £150
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border my-10" />
      <section data-animate="section" className="py-12">
        <div className="max-w-[700px]">
          <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-2">
            Want the full picture?
          </h2>
          <p className="text-text-secondary mb-6">
            This page covers the top 14 issues. A Vibe Code Audit covers
            everything — security, architecture, performance, and reliability —
            with a written report and walkthrough call.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="/vibe-code-audit"
              className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
            >
              Get your code audited — £150
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
            >
              Ask me anything
            </a>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

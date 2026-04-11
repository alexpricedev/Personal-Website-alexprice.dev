import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

export const Home = () => (
  <Layout
    title="Home"
    description="The Backseat CTO. Architecture reviews, vibe code audits, and technical guidance for founders building with AI. From £75/session."
    name="home"
  >
    {/* Hero */}
    <section className="min-h-[65vh] md:min-h-[80vh] flex flex-col justify-end pt-28 md:pt-28 pb-16 md:pb-24 px-6 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Headline — full width, poster-scale */}
        <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1] tracking-[-0.03em] max-w-[900px] mb-8">
          It's not a side project anymore.
        </h1>

        {/* Sub-hero: intro + metrics in a single row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          <div className="max-w-lg">
            <p className="text-text-secondary text-lg lg:text-xl leading-relaxed mb-4">
              I'm{" "}
              <a
                href="/about"
                className="text-text-primary hover:text-accent transition-colors duration-200"
              >
                Alex Price
              </a>
              , the Backseat CTO. I help founders who built with AI make sure
              their code is ready for what comes next.
            </p>
            <p className="text-lg lg:text-xl leading-relaxed mb-8">
              <strong className="text-text-primary">
                From £75 per session. No retainer.
              </strong>
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="/vibe-code-audit"
                className="inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-lg px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
              >
                Get your code audited — £150
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center text-accent font-ui font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Metrics — right-aligned, vertical stack */}
          <div
            data-animate="stagger"
            className="flex flex-wrap md:flex-col gap-x-8 gap-y-6 md:gap-6 md:items-end md:text-right shrink-0"
          >
            {[
              { value: "12+", label: "Years Building" },
              { value: "80+", label: "Team Scaled To" },
              { value: "#8", label: "LinkedIn Top UK" },
              { value: "18k", label: "B2B Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[28px] md:text-[32px] text-text-primary leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* The tension — editorial body copy, no heading */}
    <section className="py-24 lg:py-32 px-6">
      <div
        data-animate="section"
        className="max-w-[700px] mx-auto lg:mx-[max(calc((100%-1200px)/2+0px),2rem)]"
      >
        <div className="space-y-6 text-lg lg:text-xl text-text-secondary leading-relaxed">
          <p>
            You used Cursor or Bolt or Lovable and built something that actually
            works. People signed up. Someone paid you. You're not prototyping
            anymore — you're running a business.
          </p>
          <p>
            And the code underneath? It was built to see if the idea worked. Now
            the idea works, and you're wondering: is the foundation solid enough
            for what comes next?
          </p>
          <p className="text-text-primary font-medium">
            You don't need a CTO. You need someone who's done this before to
            take a look.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* Who I am */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <span
          data-animate="section"
          className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6"
        >
          Backseat CTO
        </span>
        <h2
          data-animate="section"
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-8 max-w-[700px]"
        >
          A second pair of eyes from someone who's been there
        </h2>
        <div
          data-animate="section"
          className="max-w-[700px] space-y-6 text-lg text-text-secondary leading-relaxed"
        >
          <p>
            I'm Alex Price. I've spent 12 years building production systems,
            scaling engineering teams to 80+, and learning what breaks when
            things get real. I don't need to join your company. I just need to
            look at your code and tell you what I see.
          </p>
          <p>
            Architecture decisions. Security blind spots. The things AI tools
            generate but can't evaluate. One honest conversation is usually
            enough to know where you stand.
          </p>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* When to bring me in */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2
          data-animate="section"
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-12"
        >
          Two common starting points
        </h2>
        <div
          data-animate="stagger"
          className="bg-surface-1 rounded-[12px] border border-border overflow-hidden"
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-8 sm:p-10">
              <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
                Getting started
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.3] tracking-[-0.01em] mb-4">
                You're building and you've hit a wall
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.7] mb-4">
                You can't prompt your way past it. The AI keeps going in
                circles. You need someone to look at the whole picture and tell
                you which direction to go.
              </p>
              <ul className="space-y-2 text-text-secondary leading-[1.7] text-[15px]">
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Architecture decisions that feel too big to guess
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Code that works but feels fragile
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  "Am I doing this right?"
                </li>
              </ul>
            </div>
            <div className="p-8 sm:p-10">
              <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
                Launch prep
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.3] tracking-[-0.01em] mb-4">
                You're about to go live
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.7] mb-4">
                It works in dev. But will it hold up with real users, real
                payments, real data? You need someone who knows what to check.
              </p>
              <ul className="space-y-2 text-text-secondary leading-[1.7] text-[15px]">
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Security and performance review
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Scalability and infrastructure
                </li>
                <li className="flex gap-2">
                  <span className="text-text-muted shrink-0">&mdash;</span>
                  Investor technical due diligence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* How it works */}
    <section id="how-it-works" className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div
          data-animate="sequence"
          className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-16"
        >
          <h2
            data-seq
            className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em]"
          >
            Three steps. No commitment.
          </h2>
          <p
            data-seq
            className="text-lg text-text-secondary leading-relaxed max-w-md"
          >
            No retainer. No onboarding. Just senior technical help when you need
            it.
          </p>
        </div>

        <div
          data-animate="stagger"
          className="grid md:grid-cols-3 rounded-[12px] border border-border overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border mb-16"
        >
          {[
            {
              num: "01",
              title: "Email me what you're building",
              text: "I reply within 24 hours with availability and whether I can help.",
            },
            {
              num: "02",
              title: "Share your code or context",
              text: "A repo link, screenshots, a Loom. The more context, the more value.",
            },
            {
              num: "03",
              title: "We talk. I write it up.",
              text: "A live session followed by a written summary: what to fix, what's fine, what to focus on next.",
            },
          ].map((step) => (
            <div key={step.num} className="bg-surface-1 p-8 sm:p-10">
              <span className="font-display text-accent text-[40px] leading-none block mb-6">
                {step.num}
              </span>
              <h3 className="font-display text-[20px] leading-[1.3] tracking-[-0.01em] mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.7]">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div data-animate="section" className="mb-16">
          <p className="font-mono text-[13px] tracking-[0.02em] text-text-muted">
            £75 / 30 min · £150 / hour · 20-hour package £2,500 (save £500)
          </p>
        </div>

        {/* Image break */}
        <img
          data-animate="section"
          src="/alex-working.webp"
          alt="Alex Price in a meeting"
          className="w-full aspect-[21/9] rounded-[12px] object-cover mb-16"
        />

        {/* Callout */}
        <div data-animate="section" className="max-w-[700px]">
          <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10">
            <p className="font-body text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.5] italic text-text-primary">
              I don't tell you what you want to hear. I tell you what's going to
              break, what's fine, and what to focus on next.
            </p>
          </blockquote>
        </div>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* Social proof */}
    <section className="py-24 lg:py-32 px-6">
      <div
        data-animate="stagger"
        className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8"
      >
        <blockquote className="bg-surface-1 rounded-[12px] border border-border p-8 sm:p-10">
          <p className="text-[clamp(1rem,2vw,1.15rem)] leading-[1.7] italic text-text-secondary mb-8">
            "Alex helped me cut through the noise when I was building
            HelloRevenue. Clear, honest technical guidance that took us from
            early-stage uncertainty to production readiness. If you're a
            non-technical founder who needs a technical partner you can trust,
            Alex is your guy."
          </p>
          <footer className="flex items-center gap-4">
            <img
              src="/dennis-hettema.webp"
              alt="Dennis Hettema"
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Dennis Hettema
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                <span className="text-text-muted/70">CEO,</span>{" "}
                <a
                  href="https://hellorevenue.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dim transition-colors duration-200"
                >
                  HelloRevenue
                </a>
              </p>
            </div>
          </footer>
        </blockquote>

        <blockquote className="bg-surface-1 rounded-[12px] border border-border p-8 sm:p-10">
          <p className="text-[clamp(1rem,2vw,1.15rem)] leading-[1.7] italic text-text-secondary mb-8">
            "He brought rigour to our architecture and delivery, and freed us up
            to focus on clients and strategy. If you need senior technical
            leadership without the overhead of a full-time hire, Alex is your
            guy."
          </p>
          <footer className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Andrew Black
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                <span className="text-text-muted/70">CEO,</span>{" "}
                <a
                  href="https://naitiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dim transition-colors duration-200"
                >
                  Naitiv
                </a>
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>

    <hr className="border-border max-w-[1200px] mx-auto" />

    {/* Final CTA */}
    <section
      data-animate="section"
      className="pt-24 lg:pt-32 pb-16 lg:pb-20 px-6"
    >
      <div className="max-w-[1200px] mx-auto bg-accent rounded-2xl p-8 sm:p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] tracking-[-0.03em] text-white mb-4">
            Not sure where to start?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Check it yourself
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Ten common issues AI tools get wrong, with fixes you can apply
                today.
              </p>
              <a
                href="/common-issues"
                className="inline-flex items-center justify-center w-full bg-white/10 text-white border border-white/25 font-ui font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-200"
              >
                Free self-assessment
              </a>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">
                Get a professional audit — £150
              </h3>
              <p className="text-white/70 text-sm mb-4">
                I review your codebase and deliver a written report with a
                30-minute walkthrough.
              </p>
              <a
                href="/vibe-code-audit"
                className="inline-flex items-center justify-center w-full bg-white text-accent font-ui font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-200"
              >
                Get your code audited
              </a>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            Or just{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white underline underline-offset-4 hover:text-white/80 transition-colors duration-200"
            >
              email me what you're building
            </a>
            . I'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

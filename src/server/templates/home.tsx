import { Layout } from "@server/components/layouts";
import { CALENDLY_URL } from "@server/config";

export const Home = () => (
  <Layout title="Home" name="home">
    {/* Hero */}
    <section className="min-h-screen flex items-center pt-16 px-6">
      <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.03em] mb-8">
            I'm a fractional CTO who specialises in engineering himself{" "}
            <em className="text-accent italic">out of the job.</em>
          </h1>
          <p className="text-text-secondary text-lg lg:text-xl leading-relaxed max-w-lg mb-4">
            Hiring a full-time CTO takes months... and often ends up looking
            like a shotgun marriage. Let's not take your Series A startup down
            that road.
          </p>
          <p className="text-lg lg:text-xl leading-relaxed mb-1">
            <strong className="text-text-primary">I'm the alternative.</strong>
          </p>
          <p className="text-text-secondary text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
            I'll help you leverage my extensive startup and exit experience for
            your success, then help you find my optimal replacement.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={CALENDLY_URL}
              className="inline-flex items-center bg-accent text-[#0C0C0C] font-semibold text-lg px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
            >
              Get the honest take
            </a>
            <a
              href="/work-with-me"
              className="inline-flex items-center text-accent font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
            >
              How I work
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-xl overflow-hidden bg-surface-1 border border-border">
            <img
              src="/headshot.webp"
              alt="Alex Price"
              className="w-full aspect-[3/4] object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Metrics Strip */}
    <section className="border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap justify-center md:justify-start gap-16">
        {[
          { value: "12+", label: "Years Leading" },
          { value: "80+", label: "Team Scaled To" },
          { value: "#8", label: "LinkedIn Top UK" },
          { value: "18k", label: "B2B Customers" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-[32px] text-text-primary leading-none mb-1">
              {stat.value}
            </div>
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Credibility */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[700px] mx-auto lg:mx-0 lg:ml-[calc((100%-1200px)/2+24px)]">
        <p className="text-lg text-text-secondary leading-relaxed">
          I co-founded and was CTO at{" "}
          <a
            href="https://ecologi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dim transition-colors duration-200"
          >
            Ecologi
          </a>{" "}
          where we scaled from 3 to 80+ employees, had 18,000{" "}
          <a
            href="https://uk.trustpilot.com/review/ecologi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dim transition-colors duration-200"
          >
            happy B2B customers
          </a>{" "}
          and ranked #8 in{" "}
          <a
            href="https://www.linkedin.com/pulse/linkedin-top-startups-2022-15-uk-companies-rise-linkedin-news-uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dim transition-colors duration-200"
          >
            LinkedIn's Top UK Startups 2022
          </a>
          . After my exit, I became CTO at{" "}
          <a
            href="https://justabout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dim transition-colors duration-200"
          >
            Just
          </a>
          , taking a pre-alpha concept to production.
        </p>
        <p className="mt-6 text-xl text-text-primary font-medium">
          Now I help Series A founders build engineering teams that scale.
        </p>
      </div>
    </section>

    {/* When to bring me in */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-12">
          When to bring me in
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 hover:border-border-hover transition-colors duration-300">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Strategic Gaps
            </span>
            <h3 className="font-display text-[24px] leading-[1.2] mb-4">
              You don't have a CTO
            </h3>
            <p className="text-text-secondary leading-[1.7]">
              And need senior technical leadership without the cost and risk of
              a full-time hire.
            </p>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 hover:border-border-hover transition-colors duration-300">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Optimizing Leadership
            </span>
            <h3 className="font-display text-[24px] leading-[1.2] mb-4">
              You have a CTO
            </h3>
            <p className="text-text-secondary leading-[1.7]">
              But they're struggling with the transition from engineer to
              leader. You want to develop them, not replace them.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* The Engagement */}
    <section className="py-24 lg:py-32 px-6 bg-surface-1">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          <div className="md:w-1/2">
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-10">
              How this works
            </h2>
            <div className="space-y-10">
              {/* Step 01 */}
              <div className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    01
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-[22px] mb-3">
                    Embedded support
                  </h4>
                  <p className="text-text-secondary leading-[1.7] mb-4">
                    I embed one or two days a week until you're ready to hire
                    permanently.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full">
                      Strategic Oversight
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full">
                      Leadership Mentorship
                    </span>
                  </div>
                </div>
              </div>
              {/* Step 02 */}
              <div className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">02</span>
                </div>
                <div>
                  <h4 className="font-display text-[22px] mb-3">
                    Transformation project
                  </h4>
                  <p className="text-text-secondary leading-[1.7] mb-4">
                    Focused three-month engagements covering team structure,
                    hiring, and tech strategy. Then I cleanly hand off to your
                    strengthened team.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full">
                      Architectural Audit
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full">
                      Rapid Execution
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Direct feedback callout */}
            <div className="mt-12 bg-surface-2 rounded-[12px] border border-border p-6">
              <p className="text-text-secondary leading-[1.7]">
                If you want someone to tell you what you want to hear or move
                cautiously, I'm not your guy. I work best with founders who are
                ready for velocity and thrive on{" "}
                <strong className="text-text-primary">direct feedback</strong>.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/alex-working.webp"
              alt="Alex Price in a meeting"
              className="w-full aspect-[4/3] rounded-[12px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Testimonial */}
    <section className="py-24 lg:py-32 px-6 bg-surface-1">
      <div className="max-w-[700px] mx-auto">
        <blockquote className="font-display text-[clamp(1.25rem,3vw,1.75rem)] leading-[1.4] italic text-text-primary mb-10">
          "Alex helped me cut through the noise when I was building
          HelloRevenue. Through regular strategy calls he gave me clear, honest
          technical guidance that took us from early-stage uncertainty to
          production readiness. If you're a non-technical founder who needs a
          technical partner you can trust, Alex is your guy."
        </blockquote>
        <div className="flex items-center gap-4">
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
              CEO,{" "}
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
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto bg-accent rounded-2xl p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] tracking-[-0.03em] text-[#0C0C0C] mb-8">
            Let's scale this thing
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={CALENDLY_URL}
              className="inline-flex items-center bg-[#0C0C0C] text-accent font-semibold text-lg px-10 py-5 rounded-full hover:bg-[#1a1a1a] transition-all duration-200"
            >
              Book a call
            </a>
            <a
              href="/work-with-me"
              className="text-[#0C0C0C] font-semibold hover:underline underline-offset-4"
            >
              Learn how it works →
            </a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

const heroChars = "going to break.".split("").map((char, i) => ({
  key: `c${i}`,
  char: char === " " ? "\u00A0" : char,
}));

export const Home = () => (
  <Layout
    title="Home"
    description="Senior technical help, by the hour. Architecture reviews, security audits, and technical guidance for founders building with AI."
    name="home"
  >
    {/* Hero */}
    <section className="min-h-[70vh] md:min-h-screen flex items-center pt-28 md:pt-16 px-6">
      <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.03em] mb-8">
            AI can build your product. It can't tell you what's{" "}
            <em
              className="text-accent italic whitespace-nowrap"
              data-animate="chars"
            >
              {heroChars.map((c) => (
                <span
                  key={c.key}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  {c.char}
                </span>
              ))}
            </em>
          </h1>
          <p className="text-text-secondary text-lg lg:text-xl leading-relaxed max-w-lg mb-4">
            Senior technical help, by the hour. Architecture reviews, security
            audits, and honest guidance from someone who's built and scaled
            companies.
          </p>
          <p className="text-lg lg:text-xl leading-relaxed mb-10">
            <strong className="text-text-primary">
              From £75 per session. No retainer.
            </strong>
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center bg-accent text-[#0C0C0C] font-semibold text-lg px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
            >
              Get in touch
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center text-accent font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
            >
              How it works
            </a>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div
            data-parallax="hero"
            className="rounded-xl overflow-hidden isolate bg-bg relative aspect-[3/4] cursor-default"
          >
            <img
              src="/hero-bg.png"
              alt=""
              data-parallax-layer="bg"
              className="absolute -top-[30px] -left-[30px] w-[calc(100%+60px)] max-w-none h-[calc(100%+60px)] object-cover"
            />
            <img
              src="/hero-subject.png"
              alt="Alex Price"
              data-parallax-layer="fg"
              className="absolute -top-[30px] -left-[30px] w-[calc(100%+60px)] max-w-none h-[calc(100%+60px)] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Metrics Strip */}
    <section className="border-t border-border">
      <div
        data-animate="stagger"
        className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12"
      >
        {[
          { value: "12+", label: "Years Building" },
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
    <section data-animate="section" className="py-24 lg:py-32 px-6">
      <div className="max-w-[700px] mx-auto lg:mx-0 lg:ml-[max(24px,calc((100%-1200px)/2+24px))]">
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
          , taking a pre-alpha concept to production. Now I'm co-founder at{" "}
          <a
            href="https://chptrs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dim transition-colors duration-200"
          >
            CHPTRS
          </a>
          .
        </p>
        <p className="mt-6 text-xl text-text-primary font-medium">
          I help founders building with AI make the technical decisions that
          matter.
        </p>
      </div>
    </section>

    {/* When to bring me in */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2
          data-animate="section"
          className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-12"
        >
          When to bring me in
        </h2>
        <div data-animate="stagger" className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 hover:border-border-hover transition-colors duration-300">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Getting started
            </span>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-[1.25] tracking-[-0.01em] mb-4">
              You're building something and you've hit a wall you can't prompt
              your way out of
            </h3>
            <ul className="space-y-2 text-text-secondary leading-[1.7]">
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Architecture and database decisions before you're locked in
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Making sense of AI-generated code you don't fully trust
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                "Am I doing this right?" answered by someone who's done it
              </li>
            </ul>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 hover:border-border-hover transition-colors duration-300">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Launch prep
            </span>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-[1.25] tracking-[-0.01em] mb-4">
              You've built it and you need to know it won't fall over in front
              of real users
            </h3>
            <ul className="space-y-2 text-text-secondary leading-[1.7]">
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Security and performance review before you go live
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                "Will this scale to 1,000 users?" answered honestly
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted shrink-0">–</span>
                Technical due diligence prep before investors ask
              </li>
            </ul>
          </div>
        </div>
        <div
          data-animate="section"
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center w-full sm:w-auto bg-accent text-[#0C0C0C] font-semibold px-8 py-4 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
          >
            Get in touch
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center w-full sm:w-auto text-accent font-semibold border border-accent/25 px-8 py-4 rounded-full hover:bg-accent-subtle hover:border-accent transition-all duration-200"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>

    {/* How it works */}
    <section
      data-animate="sequence"
      className="py-24 lg:py-32 px-6 bg-surface-1"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          <div className="md:w-1/2">
            <h2
              data-seq
              className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mb-4"
            >
              How it works
            </h2>
            <p
              data-seq
              className="text-lg text-text-secondary leading-relaxed mb-10"
            >
              No retainer. No long-term commitment. Just senior technical help
              when you need it.
            </p>
            <div className="space-y-10">
              {/* Step 01 */}
              <div data-seq className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    01
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[20px] leading-[1.3] mb-3">
                    Email me your problem
                  </h4>
                  <p className="text-text-secondary leading-[1.7]">
                    Tell me what you're building and what you need help with.
                    I'll reply within 24 hours with whether I can help and when
                    I'm available.
                  </p>
                </div>
              </div>
              {/* Step 02 */}
              <div data-seq className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    02
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[20px] leading-[1.3] mb-3">
                    Share your code or context
                  </h4>
                  <p className="text-text-secondary leading-[1.7]">
                    Before the session, share a repo link, screenshots, or
                    whatever helps me understand the situation. The more context
                    upfront, the more value in the session.
                  </p>
                </div>
              </div>
              {/* Step 03 */}
              <div data-seq className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-display text-accent text-[20px]">
                    03
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-[20px] leading-[1.3] mb-3">
                    Live session + written summary
                  </h4>
                  <p className="text-text-secondary leading-[1.7]">
                    We jump on a call. I review your code, answer your
                    questions, and give you direct, honest technical guidance.
                    Afterwards, you get a written summary of what we covered and
                    what to do next.
                  </p>
                </div>
              </div>
            </div>
            {/* Direct feedback callout */}
            <div
              data-seq
              className="mt-12 bg-surface-2 rounded-[12px] border border-border p-6"
            >
              <p className="text-text-secondary leading-[1.7]">
                I don't tell you what you want to hear. I tell you what's going
                to break, what's fine, and what to focus on next.{" "}
                <strong className="text-text-primary">
                  Direct, honest, useful.
                </strong>
              </p>
            </div>
          </div>
          <div data-seq className="md:w-1/2">
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
    <section data-animate="section" className="py-16 lg:py-20 px-6">
      <div className="max-w-[900px] mx-auto">
        <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10">
          <p className="text-[clamp(1.25rem,3vw,1.5rem)] leading-[1.6] italic text-text-primary mb-8">
            "Alex helped me cut through the noise when I was building
            HelloRevenue. Through regular strategy calls he gave me clear,
            honest technical guidance that took us from early-stage uncertainty
            to production readiness. If you're a non-technical founder who needs
            a technical partner you can trust, Alex is your guy."
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
                <span style={{ color: "rgba(168,162,158,0.7)" }}>CEO,</span>{" "}
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
      </div>
    </section>

    {/* Final CTA */}
    <section data-animate="section" className="py-24 lg:py-32 px-6">
      <div className="max-w-[1200px] mx-auto bg-accent rounded-2xl p-8 sm:p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] tracking-[-0.03em] text-[#0C0C0C] mb-4">
            From £75. No retainer.
          </h2>
          <p className="text-lg text-[#0C0C0C]/70 mb-8 max-w-lg mx-auto md:mx-0">
            Senior technical guidance from someone who's built and scaled
            companies. Email me what you're working on.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center w-full sm:w-auto bg-[#0C0C0C] text-accent font-semibold text-lg px-10 py-5 rounded-full hover:bg-[#1a1a1a] transition-all duration-200"
            >
              Get in touch
            </a>
            <a
              href="/how-it-works"
              className="text-[#0C0C0C] font-semibold hover:underline underline-offset-4"
            >
              See how it works →
            </a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

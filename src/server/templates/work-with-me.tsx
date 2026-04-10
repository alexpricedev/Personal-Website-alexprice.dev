import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

export const WorkWithMe = () => (
  <Layout
    title="How It Works"
    description="£150/hr. Architecture reviews, security audits, and technical guidance for founders building with AI. No retainer, no commitment."
    name="how-it-works"
    path="/how-it-works"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      <header className="mb-14">
        <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4">
          Senior technical help, by the hour
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
          You're building fast with AI. I'll tell you what's going to hold up
          and what's going to break.
        </p>
      </header>

      {/* The Problem */}
      <section className="mb-16">
        <p className="text-lg text-text-secondary leading-[1.7] max-w-[700px]">
          AI tools let you ship faster than ever. But they can't tell you
          whether your authentication is secure, your database will scale, or
          your architecture will survive your next 1,000 users. That takes
          someone who's built and broken things at scale.
        </p>
      </section>

      {/* Pricing */}
      <section data-animate="section" className="mb-16">
        <div data-animate="stagger" className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-6 sm:p-9">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Pay as you go
            </span>
            <div className="mb-4">
              <span className="font-display text-[clamp(2rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-text-primary">
                £150
              </span>
              <span className="text-text-muted text-lg ml-1">/hour</span>
            </div>
            <p className="text-text-secondary text-sm leading-[1.65] mb-4">
              Sessions from 30 minutes. No retainer. Video call with a written
              summary of findings afterwards.
            </p>
            <p className="text-text-secondary text-sm leading-[1.65]">
              Async code review also available at the same rate.
            </p>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-accent/20 p-6 sm:p-9 relative">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              20-hour package
            </span>
            <div className="mb-4">
              <span className="font-display text-[clamp(2rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-text-primary">
                £2,500
              </span>
              <span className="text-text-muted text-lg ml-1">/ 20 hours</span>
            </div>
            <p className="text-text-secondary text-sm leading-[1.65] mb-4">
              20 hours of technical support to get you launch-ready. Security,
              architecture, performance, the lot.
            </p>
            <p className="text-text-secondary text-sm leading-[1.65]">
              That's £125/hr. Save £500 vs. pay-as-you-go.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border mb-16" />

      {/* How it works */}
      <section data-animate="sequence" className="mb-16">
        <h2
          data-seq
          className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8"
        >
          How it works
        </h2>
        <div className="space-y-8 max-w-[700px]">
          <div data-seq className="flex gap-6">
            <div className="shrink-0">
              <span className="font-display text-accent text-[20px]">01</span>
            </div>
            <div>
              <h4 className="font-semibold text-[18px] leading-[1.3] mb-2">
                Email me
              </h4>
              <p className="text-text-secondary leading-[1.7]">
                Tell me what you're building and what you need help with. I'll
                reply within 24 hours with whether I can help and when I'm
                available.
              </p>
            </div>
          </div>
          <div data-seq className="flex gap-6">
            <div className="shrink-0">
              <span className="font-display text-accent text-[20px]">02</span>
            </div>
            <div>
              <h4 className="font-semibold text-[18px] leading-[1.3] mb-2">
                Share context
              </h4>
              <p className="text-text-secondary leading-[1.7]">
                Before the session, share a repo link, screenshots, or whatever
                helps me understand the situation. The more context upfront, the
                more value in the session.
              </p>
            </div>
          </div>
          <div data-seq className="flex gap-6">
            <div className="shrink-0">
              <span className="font-display text-accent text-[20px]">03</span>
            </div>
            <div>
              <h4 className="font-semibold text-[18px] leading-[1.3] mb-2">
                Live session
              </h4>
              <p className="text-text-secondary leading-[1.7]">
                We jump on a video call. I review your code, answer your
                questions, and give you direct, honest technical guidance.
              </p>
            </div>
          </div>
          <div data-seq className="flex gap-6">
            <div className="shrink-0">
              <span className="font-display text-accent text-[20px]">04</span>
            </div>
            <div>
              <h4 className="font-semibold text-[18px] leading-[1.3] mb-2">
                Written summary
              </h4>
              <p className="text-text-secondary leading-[1.7]">
                After the call, you get a written summary of everything we
                covered: what's working, what needs to change, and what to
                prioritise next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border mb-16" />

      {/* What I can help with */}
      <section data-animate="section" className="mb-16">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          What I can help with
        </h2>
        <div data-animate="stagger" className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-5 sm:p-7">
            <h3 className="font-semibold text-[16px] mb-2">Code review</h3>
            <p className="text-text-secondary text-sm leading-[1.65]">
              Security, performance, and architecture review of AI-generated or
              human-written code. I'll tell you what's solid and what needs
              work.
            </p>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-5 sm:p-7">
            <h3 className="font-semibold text-[16px] mb-2">
              Architecture decisions
            </h3>
            <p className="text-text-secondary text-sm leading-[1.65]">
              Database choice, hosting, infrastructure, monolith vs.
              microservices. Decisions that are expensive to get wrong.
            </p>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-5 sm:p-7">
            <h3 className="font-semibold text-[16px] mb-2">Pre-launch audit</h3>
            <p className="text-text-secondary text-sm leading-[1.65]">
              Before you put this in front of users, let's make sure it won't
              fall over. Security, scalability, and the things AI tools miss.
            </p>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-5 sm:p-7">
            <h3 className="font-semibold text-[16px] mb-2">
              Investor readiness
            </h3>
            <p className="text-text-secondary text-sm leading-[1.65]">
              Technical due diligence preparation. Know your architecture story
              before someone asks.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section data-animate="section" className="mb-16">
        <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10 max-w-[700px]">
          <p className="font-body text-[clamp(1.15rem,2.5vw,1.5rem)] leading-[1.6] italic text-text-primary mb-8">
            "We brought Alex in to extend our technical leadership as Naitiv
            scaled. He slotted straight into the team, brought rigour to our
            architecture and delivery, and freed us up to focus on clients and
            strategy. If you need senior technical leadership without the
            overhead of a full-time hire, Alex is your guy."
          </p>
          <footer className="flex items-center gap-3">
            <img
              src="/andrew-black.webp"
              alt="Andrew Black"
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="font-semibold text-sm text-text-primary">
                Andrew Black
              </p>
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                <span style={{ color: "rgba(168,162,158,0.7)" }}>CEO,</span>{" "}
                <a
                  href="https://www.wearenaitiv.com/"
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
      </section>

      <hr className="border-border mb-16" />

      {/* Not for Everyone */}
      <section data-animate="section" className="mb-16">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          Not for everyone
        </h2>
        <p className="text-text-secondary leading-[1.7] mb-3 max-w-[700px]">
          I don't tell you what you want to hear. If your code is insecure, I'll
          say so. If your architecture won't scale, you'll know. This works best
          with founders who want{" "}
          <strong className="text-text-primary">honest answers</strong>, not
          reassurance.
        </p>
      </section>

      {/* CHPTRS Callout */}
      <section data-animate="section" className="mb-16">
        <div className="bg-surface-1 rounded-[12px] border border-border p-6 sm:p-9 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Need more than advice?
            </span>
            <p className="text-text-secondary leading-[1.7] max-w-[640px]">
              If you're looking for hands-on build work or a longer-term
              partnership, that's what{" "}
              <a
                href="https://chptrs.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dim transition-colors duration-200"
              >
                CHPTRS
              </a>{" "}
              is for. It's the fractional software and product duo I co-founded.
              We embed long-term, ship product, and scale engineering from
              prototype to production.
            </p>
          </div>
          <img
            src="/chptrs-duo.png"
            alt=""
            aria-hidden="true"
            className="hidden min-[891px]:block absolute right-6 bottom-0 h-[85%] w-auto object-contain opacity-50"
          />
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
              Let's talk
            </h2>
            <p className="text-text-secondary mb-4">
              Email me what you're building. I'll get back to you within 24
              hours.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
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
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 text-text-secondary border border-text-muted font-semibold text-sm px-6 py-2.5 rounded-full hover:text-text-primary hover:border-text-secondary transition-all duration-200"
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

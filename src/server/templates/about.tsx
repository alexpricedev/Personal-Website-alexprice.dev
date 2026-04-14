import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

export const About = () => (
  <Layout
    title="About"
    description="Alex Price – the Backseat CTO. 12+ years building and scaling companies, now helping founders make the technical decisions that matter."
    name="about"
    path="/about"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      <div className="grid md:grid-cols-[1fr_320px] gap-16 items-start">
        <div>
          <header className="mb-10">
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4">
              About Alex
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
              The <em>Backseat</em> CTO.
            </p>
          </header>

          <div className="max-w-[700px] space-y-6">
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
            <p className="text-lg text-text-secondary leading-relaxed">
              I started consulting because I kept seeing the same thing:
              founders building incredible products with AI, then making
              technical decisions that would cost them later. They didn't need a
              full-time CTO. They needed someone who'd been there before to look
              over their shoulder.
            </p>
            <p className="text-xl text-text-primary font-medium">
              I help founders building with AI make the technical decisions that
              matter.
            </p>
          </div>

          {/* Testimonial */}
          <div className="mt-16 max-w-[700px]">
            <blockquote className="border-l-[3px] border-accent pl-8 md:pl-10">
              <p className="text-[clamp(1.15rem,2.5vw,1.35rem)] leading-[1.6] italic text-text-primary mb-8">
                "Alex helped me cut through the noise when I was building
                HelloRevenue. Through regular strategy calls he gave me clear,
                honest technical guidance that took us from early-stage
                uncertainty to production readiness. If you're a non-technical
                founder who needs a technical partner you can trust, Alex is
                your guy."
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
          </div>
        </div>

        {/* Photo column */}
        <div className="hidden md:block sticky top-24">
          <img
            src="/headshot2.webp"
            alt="Alex Price"
            className="w-full rounded-[12px] object-cover"
          />
          <div className="mt-4 flex items-center justify-end gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-text-secondary hover:text-accent transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <title>Email</title>
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </a>
            <a
              href="https://github.com/alexpricede"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <title>GitHub</title>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alexprice1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border mt-20 pt-12">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div>
            <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-2">
              Ready to talk?
            </h2>
            <p className="text-text-secondary mb-4">
              Email me what you're building. I'll get back to you within 24
              hours.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="shrink-0 inline-flex items-center justify-center bg-accent text-white font-ui font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  </Layout>
);

import { Layout } from "@server/components/layouts";
import { CONTACT_EMAIL } from "@server/config";

export const About = () => (
  <Layout
    title="About"
    description="Alex Price is the Backseat CTO. 12+ years building and scaling companies, now helping founders make the technical decisions that matter."
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
              The person behind Backseat CTO.
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
              I started Backseat CTO because I kept seeing the same thing:
              founders building incredible products with AI, then making
              technical decisions that would cost them later. They didn't need a
              full-time CTO. They needed someone who'd done it before to look
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

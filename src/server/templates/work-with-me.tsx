import { Layout } from "@server/components/layouts";
import { CALENDLY_URL } from "@server/config";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
    path="/work-with-me"
  >
    <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
      <header className="mb-14">
        <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] tracking-[-0.02em] mb-4">
          How we can work together
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
          Fractional CTO for Series A startups who need to move fast and get it
          right.
        </p>
      </header>

      {/* The Problem */}
      <section className="mb-16">
        <p className="text-lg text-text-secondary leading-[1.7] max-w-[700px]">
          You need senior technical leadership but hiring a full-time CTO is
          expensive, slow, and risky. You might not even need one permanently –
          you need the right decisions made now.
        </p>
      </section>

      {/* Engagement Models */}
      <section className="mb-16">
        <h2 className="font-display text-[clamp(2rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] mb-3">
          How I can help
        </h2>
        <p className="text-text-muted mb-8">Two ways to work together:</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 flex flex-col">
            <span className="inline-block self-start font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Embedded
            </span>
            <h3 className="font-display text-[24px] leading-[1.25] tracking-[-0.01em] mb-3">
              Fractional CTO
            </h3>
            <p className="text-text-secondary text-sm leading-[1.65] mb-6 flex-1">
              One to two days per week. I join your team, attend the meetings
              that matter, and help you make better technical and hiring
              decisions. Ongoing until you don't need me.
            </p>
            <div className="flex gap-8 pt-5 border-t border-border">
              <div>
                <span className="font-display text-[20px] text-text-primary">
                  1-2 days
                </span>
                <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted mt-0.5">
                  Per Week
                </span>
              </div>
              <div>
                <span className="font-display text-[20px] text-text-primary">
                  6 months
                </span>
                <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted mt-0.5">
                  Typical Engagement
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-1 rounded-[12px] border border-border p-9 flex flex-col">
            <span className="inline-block self-start font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3.5 py-1.5 rounded-full mb-6">
              Project
            </span>
            <h3 className="font-display text-[24px] leading-[1.25] tracking-[-0.01em] mb-3">
              Technical Advisory
            </h3>
            <p className="text-text-secondary text-sm leading-[1.65] mb-6 flex-1">
              A focused 3-month engagement. We identify what's broken, fix it,
              and either hire your permanent CTO or build systems that don't
              require one. Clear scope, clear exit.
            </p>
            <div className="flex gap-8 pt-5 border-t border-border">
              <div>
                <span className="font-display text-[20px] text-text-primary">
                  3 months
                </span>
                <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted mt-0.5">
                  Fixed Scope
                </span>
              </div>
              <div>
                <span className="font-display text-[20px] text-text-primary">
                  Targeted
                </span>
                <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-muted mt-0.5">
                  Intervention
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="mb-16">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-8">
          What to expect
        </h2>
        <ul className="space-y-5 max-w-[700px]">
          <li className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <div>
              <span className="text-text-secondary">
                Someone who's done this before:
              </span>
              <ul className="mt-2 ml-1 space-y-1">
                <li className="flex gap-2 text-text-secondary">
                  <span className="text-text-muted">–</span>
                  Scaled multiple businesses
                </li>
                <li className="flex gap-2 text-text-secondary">
                  <span className="text-text-muted">–</span>
                  Raised multiple rounds
                </li>
                <li className="flex gap-2 text-text-secondary">
                  <span className="text-text-muted">–</span>
                  Hired hundreds of staff
                </li>
                <li className="flex gap-2 text-text-secondary">
                  <span className="text-text-muted">–</span>
                  Exited multiple businesses
                </li>
              </ul>
            </div>
          </li>
          <li className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-text-secondary">
              Direct feedback on what's working and what isn't
            </span>
          </li>
          <li className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-text-secondary">
              Hands-on help with architecture, hiring, and team structure
            </span>
          </li>
          <li className="flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-text-secondary">
              A clear exit plan – not an open-ended engagement
            </span>
          </li>
        </ul>
      </section>

      {/* Testimonial */}
      <section className="mb-16">
        <div className="bg-surface-1 rounded-[12px] border border-border p-9">
          <blockquote className="text-[clamp(1.25rem,2.5vw,1.5rem)] leading-[1.6] italic text-text-primary mb-8">
            "We brought Alex in as fractional CTO to extend our technical
            leadership as Naitiv scaled. He slotted straight into the team,
            brought rigour to our architecture and delivery, and freed us up to
            focus on clients and strategy. If you need senior technical
            leadership without the overhead of a full-time hire, Alex is your
            guy."
          </blockquote>
          <div className="flex items-center gap-3">
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
                CEO,{" "}
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
          </div>
        </div>
      </section>

      {/* Not for Everyone */}
      <section className="mb-16">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          Not for everyone
        </h2>
        <p className="text-text-secondary leading-[1.7] mb-3 max-w-[700px]">
          This works best with founders who are{" "}
          <strong className="text-text-primary">ready to move at speed</strong>,
          thrive on{" "}
          <strong className="text-text-primary">
            clear and direct feedback
          </strong>
          , and show a{" "}
          <strong className="text-text-primary">strong bias to action</strong>.
        </p>
        <p className="text-text-secondary leading-[1.7] max-w-[700px]">
          If you're looking for someone to validate decisions you've already
          made—or to move cautiously instead of authoritatively—I'm not your
          person.
        </p>
      </section>

      {/* Investment */}
      <section className="mb-16">
        <h2 className="font-display text-[28px] leading-[1.2] tracking-[-0.02em] mb-4">
          Investment
        </h2>
        <p className="text-text-secondary leading-[1.7] max-w-[700px]">
          Starts at £10k/month for embedded work. Day-rate for shorter sprints.
          Book a call and we'll figure out what fits.
        </p>
      </section>

      {/* CTA */}
      <div className="border-t border-border my-10" />
      <section className="py-12">
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
              30 minutes to see if there's a fit. No pitch, no pressure.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href={CALENDLY_URL}
                className="inline-flex items-center bg-accent text-[#0C0C0C] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a call
              </a>
              <span className="text-text-muted text-sm hidden min-[375px]:inline">
                or
              </span>
              <a
                href="https://wa.me/447356066058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text-secondary border border-border-hover font-semibold text-sm px-6 py-2.5 rounded-full hover:text-text-primary hover:border-text-muted transition-all duration-200"
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

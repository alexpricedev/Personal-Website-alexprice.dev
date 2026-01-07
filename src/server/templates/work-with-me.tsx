import { Layout } from "@server/components/layouts";
import { CALENDLY_URL } from "@server/config";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
    path="/work-with-me"
  >
    <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      <header className="mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
          For Series A Founders
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          I'm a fractional CTO who specializes in engineering himself out of the
          job.
        </h1>
      </header>

      {/* The Problem */}
      <section className="mb-14">
        <p className="text-lg text-base-content/80 leading-relaxed mb-4">
          Hiring a full-time CTO takes months… and often ends up looking like a
          shotgun marriage. Let's not take your Series A startup down that road.
        </p>
        <p className="text-lg text-base-content/80 leading-relaxed">
          I'm the alternative. I'll use my extensive startup and exit experience
          to leverage your startup success, then I'll help you find my optimal
          replacement (or even make the role unnecessary).
        </p>
      </section>

      {/* Transformation Projects */}
      <section className="mb-14">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
          Focused three-month transformations
        </h2>
        <p className="text-base text-base-content/70 leading-relaxed mb-6">
          Need a specific problem solved? I run focused three-month
          transformations:
        </p>
        <ul className="space-y-3 mb-6">
          <li className="flex gap-3">
            <span className="text-primary shrink-0">•</span>
            <span className="text-base text-base-content/70">
              Team structure
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary shrink-0">•</span>
            <span className="text-base text-base-content/70">Hiring</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary shrink-0">•</span>
            <span className="text-base text-base-content/70">Tech strategy</span>
          </li>
        </ul>
        <p className="text-base text-base-content/70 leading-relaxed">
          I then cleanly hand off to your strengthened team.
        </p>
      </section>

      {/* Warning */}
      <section className="mb-14">
        <div className="alert bg-warning/10 border border-warning/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-warning shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-base text-base-content/80">
            If you want someone to tell you what you want to hear or move
            cautiously, I'm not your guy. I work best with founders who are
            ready for velocity and can thrive on direct feedback.
          </span>
        </div>
      </section>

      {/* Not for Everyone */}
      <section className="mb-14">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
          Not for everyone
        </h2>
        <p className="text-base text-base-content/70 leading-relaxed mb-3">
          This works best with founders who are ready to move at speed, thrive
          on clear and direct feedback, and show a strong bias to action.
        </p>
        <p className="text-base text-base-content/70 leading-relaxed">
          If you're looking for someone to validate decisions you've already
          made—or to move cautiously instead of authoritatively—I'm not your
          person.
        </p>
      </section>

      {/* CTA */}
      <div className="divider" />
      <section className="py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="avatar shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                src="/headshot2.webp"
                alt="Alex Price"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              Let's talk
            </h2>
            <p className="text-base text-base-content/70 mb-4">
              30 minutes to see if there's a fit. No pitch, no pressure.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a href={CALENDLY_URL} className="btn btn-primary">
                Book a call
              </a>
              <span className="text-base-content/40 text-sm hidden min-[375px]:inline">
                or
              </span>
              <a
                href="https://wa.me/447356066058"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#1da851] hover:bg-[#178f45] text-white border-none"
              >
                <img src="/WhatsApp.webp" alt="" className="w-5 h-5" />
                WhatsApp me
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

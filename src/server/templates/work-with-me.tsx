import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
  >
    <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Work with me
        </h1>
        <p className="text-xl text-base-content/70 leading-relaxed">
          Fractional CTO for Series A startups who need to move fast and get it
          right.
        </p>
      </header>

      {/* The Problem */}
      <section className="mb-14">
        <p className="text-lg text-base-content/80 leading-relaxed">
          You need senior technical leadership but hiring a full-time CTO is
          expensive, slow, and risky. You might not even need one permanently –
          you need the right decisions made now.
        </p>
      </section>

      {/* How I Can Help */}
      <section className="mb-14">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
          How I can help
        </h2>
        <p className="text-base text-base-content/60 mb-8">
          Two ways to work together:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Embedded support
              </h3>
              <p className="text-base text-base-content/70 leading-relaxed">
                One to two days per week. I join your team, attend the meetings
                that matter, and help you make better technical and hiring
                decisions. Ongoing until you don't need me.
              </p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Transformation project
              </h3>
              <p className="text-base text-base-content/70 leading-relaxed">
                A focused 3-month engagement. We identify what's broken, fix it,
                and either hire your permanent CTO or build systems that don't
                require one. Clear scope, clear exit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="mb-14">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
          What to expect
        </h2>
        <ul className="space-y-5">
          <li className="flex gap-3">
            <span className="text-primary shrink-0">✓</span>
            <div>
              <span className="text-base text-base-content/70">
                Someone who's done this before:
              </span>
              <ul className="mt-2 ml-1 space-y-1">
                <li className="flex gap-2 text-base-content/60">
                  <span className="text-base-content/40">–</span>
                  Scaled multiple businesses
                </li>
                <li className="flex gap-2 text-base-content/60">
                  <span className="text-base-content/40">–</span>
                  Raised multiple rounds
                </li>
                <li className="flex gap-2 text-base-content/60">
                  <span className="text-base-content/40">–</span>
                  Hired hundreds of staff
                </li>
                <li className="flex gap-2 text-base-content/60">
                  <span className="text-base-content/40">–</span>
                  Exited multiple businesses
                </li>
              </ul>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-primary shrink-0">✓</span>
            <span className="text-base text-base-content/70">
              Direct feedback on what's working and what isn't
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary shrink-0">✓</span>
            <span className="text-base text-base-content/70">
              Hands-on help with architecture, hiring, and team structure
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary shrink-0">✓</span>
            <span className="text-base text-base-content/70">
              A clear exit plan – not an open-ended engagement
            </span>
          </li>
        </ul>
      </section>

      {/* Not for Everyone */}
      <section className="mb-14">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
          Not for everyone
        </h2>
        <p className="text-base text-base-content/70 leading-relaxed mb-3">
          This works best with founders who want speed, can handle direct
          feedback, and are ready to act on it.
        </p>
        <p className="text-base text-base-content/70 leading-relaxed">
          If you're looking for someone to validate decisions you've already
          made or move cautiously, I'm not your person.
        </p>
      </section>

      {/* Investment */}
      <section className="mb-14">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
          Investment
        </h2>
        <p className="text-base text-base-content/70 leading-relaxed">
          Starts at £10k/month for embedded work. Day-rate for shorter sprints.
          Book a call and we'll figure out what fits.
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
            <div className="flex flex-wrap items-center gap-3">
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

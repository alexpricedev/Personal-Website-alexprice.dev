import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
  >
    <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28">
      <header className="mb-16">
        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Work with me
        </h1>
        <p className="text-xl lg:text-2xl text-base-content/70 leading-relaxed">
          Fractional CTO for Series A startups who need to move fast and get it
          right.
        </p>
      </header>

      {/* The Problem */}
      <section className="mb-20">
        <p className="text-xl lg:text-2xl text-base-content/80 leading-relaxed">
          You need senior technical leadership but hiring a full-time CTO is
          expensive, slow, and risky. You might not even need one permanently –
          you need the right decisions made now.
        </p>
      </section>

      {/* How I Can Help */}
      <section className="mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
          How I can help
        </h2>
        <p className="text-xl text-base-content/70 mb-10">
          Two ways to work together:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-200">
            <div className="card-body p-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Embedded support
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                One to two days per week. I join your team, attend the meetings
                that matter, and help you make better technical and hiring
                decisions. Ongoing until you don't need me.
              </p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body p-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Transformation project
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                A focused 3-month engagement. We identify what's broken, fix it,
                and either hire your permanent CTO or build systems that don't
                require one. Clear scope, clear exit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8">
          What to expect
        </h2>
        <ul className="space-y-5">
          <li className="flex gap-4">
            <span className="text-primary text-xl">✓</span>
            <span className="text-lg text-base-content/70 leading-relaxed">
              Direct feedback on what's working and what isn't
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-primary text-xl">✓</span>
            <span className="text-lg text-base-content/70 leading-relaxed">
              Hands-on help with architecture, hiring, and team structure
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-primary text-xl">✓</span>
            <span className="text-lg text-base-content/70 leading-relaxed">
              Someone who's done this before – 3 to 80+ engineers, funding
              rounds, exit
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-primary text-xl">✓</span>
            <span className="text-lg text-base-content/70 leading-relaxed">
              No dependency – I measure success by how quickly I'm not needed
            </span>
          </li>
        </ul>
      </section>

      {/* Not for Everyone */}
      <section className="mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8">
          Not for everyone
        </h2>
        <div className="border-l-4 border-primary pl-6 py-2">
          <p className="text-lg text-base-content/80 leading-relaxed mb-4">
            This works best with founders who want speed, can handle direct
            feedback, and are ready to act on it.
          </p>
          <p className="text-lg text-base-content/60 leading-relaxed italic">
            If you're looking for someone to validate decisions you've already
            made or move cautiously, I'm not your person.
          </p>
        </div>
      </section>

      {/* Investment */}
      <section className="mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
          Investment
        </h2>
        <p className="text-xl text-base-content/70 leading-relaxed">
          Pricing depends on scope and time commitment. Book a call and we'll
          figure out what makes sense.
        </p>
      </section>

      {/* CTA */}
      <div className="divider" />
      <section className="text-center py-16 lg:py-20">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Let's talk
        </h2>
        <p className="text-xl text-base-content/70 mb-10">
          30 minutes to see if there's a fit. No pitch, no pressure.
        </p>
        <a href={CALENDLY_URL} className="btn btn-primary btn-lg text-lg px-8">
          Book a call
        </a>
      </section>
    </div>
  </Layout>
);

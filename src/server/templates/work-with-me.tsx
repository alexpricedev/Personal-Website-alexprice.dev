import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
  >
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Work with me</h1>
        <p className="text-base-content/70">
          Fractional CTO for Series A startups who need to move fast and get it
          right.
        </p>
      </header>

      {/* The Problem */}
      <section className="mb-12">
        <p className="text-lg text-base-content/80">
          You need senior technical leadership but hiring a full-time CTO is
          expensive, slow, and risky. You might not even need one permanently –
          you need the right decisions made now.
        </p>
      </section>

      {/* How I Can Help */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">How I can help</h2>
        <p className="text-base-content/70 mb-6">Two ways to work together:</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">Embedded support</h3>
              <p className="text-base-content/70">
                One to two days per week. I join your team, attend the meetings
                that matter, and help you make better technical and hiring
                decisions. Ongoing until you don't need me.
              </p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">
                Transformation project
              </h3>
              <p className="text-base-content/70">
                A focused 3-month engagement. We identify what's broken, fix it,
                and either hire your permanent CTO or build systems that don't
                require one. Clear scope, clear exit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What to expect</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-base-content/70">
              Direct feedback on what's working and what isn't
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-base-content/70">
              Hands-on help with architecture, hiring, and team structure
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-base-content/70">
              Someone who's done this before – 3 to 80+ engineers, funding
              rounds, exit
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary">✓</span>
            <span className="text-base-content/70">
              No dependency – I measure success by how quickly I'm not needed
            </span>
          </li>
        </ul>
      </section>

      {/* Not for Everyone */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Not for everyone</h2>
        <div className="alert bg-base-200 border-l-4 border-primary">
          <div>
            <p className="mb-2 text-base-content/80">
              This works best with founders who want speed, can handle direct
              feedback, and are ready to act on it.
            </p>
            <p className="text-base-content/70">
              If you're looking for someone to validate decisions you've already
              made or move cautiously, I'm not your person.
            </p>
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Investment</h2>
        <p className="text-base-content/70">
          Pricing depends on scope and time commitment. Book a call and we'll
          figure out what makes sense.
        </p>
      </section>

      {/* CTA */}
      <div className="divider" />
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Let's talk</h2>
        <p className="text-base-content/70 mb-6">
          30 minutes to see if there's a fit. No pitch, no pressure.
        </p>
        <a href={CALENDLY_URL} className="btn btn-primary btn-lg">
          Book a call
        </a>
      </section>
    </div>
  </Layout>
);

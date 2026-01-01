import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const WorkWithMe = () => (
  <Layout
    title="Work with me"
    description="Fractional CTO for Series A startups who need to move fast and get it right."
    name="work-with-me"
  >
    <div className="container-narrow section">
      <header className="work-header">
        <h1>Work with me</h1>
        <p className="text-muted">
          Fractional CTO for Series A startups who need to move fast and get it
          right.
        </p>
      </header>

      {/* The Problem */}
      <section className="work-section">
        <p>
          You need senior technical leadership but hiring a full-time CTO is
          expensive, slow, and risky. You might not even need one permanently –
          you need the right decisions made now.
        </p>
      </section>

      {/* How I Can Help */}
      <section className="work-section">
        <h2>How I can help</h2>
        <p>Two ways to work together:</p>
        <div className="engagement-cards">
          <div className="card engagement-card">
            <h3>Embedded support</h3>
            <p>
              One to two days per week. I join your team, attend the meetings
              that matter, and help you make better technical and hiring
              decisions. Ongoing until you don't need me.
            </p>
          </div>
          <div className="card engagement-card">
            <h3>Transformation project</h3>
            <p>
              A focused 3-month engagement. We identify what's broken, fix it,
              and either hire your permanent CTO or build systems that don't
              require one. Clear scope, clear exit.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="work-section">
        <h2>What to expect</h2>
        <ul className="expect-list">
          <li>Direct feedback on what's working and what isn't</li>
          <li>Hands-on help with architecture, hiring, and team structure</li>
          <li>
            Someone who's done this before – 3 to 80+ engineers, funding rounds,
            exit
          </li>
          <li>
            No dependency – I measure success by how quickly I'm not needed
          </li>
        </ul>
      </section>

      {/* Not for Everyone */}
      <section className="work-section">
        <h2>Not for everyone</h2>
        <div className="not-for-everyone">
          <p>
            This works best with founders who want speed, can handle direct
            feedback, and are ready to act on it.
          </p>
          <p>
            If you're looking for someone to validate decisions you've already
            made or move cautiously, I'm not your person.
          </p>
        </div>
      </section>

      {/* Investment */}
      <section className="work-section">
        <h2>Investment</h2>
        <p>
          Pricing depends on scope and time commitment. Book a call and we'll
          figure out what makes sense.
        </p>
      </section>

      {/* CTA */}
      <section className="work-cta">
        <h2>Let's talk</h2>
        <p>30 minutes to see if there's a fit. No pitch, no pressure.</p>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
      </section>
    </div>
  </Layout>
);

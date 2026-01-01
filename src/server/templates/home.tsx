import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Home = () => (
  <Layout title="Home" name="home">
    {/* Hero */}
    <section className="hero">
      <div className="container">
        <h1>Fractional CTO who builds things that don't need him</h1>
        <p className="hero-subhead">
          Hiring a full-time CTO is expensive, slow, and high-risk. I'll tell
          you the hard truths, move fast, and either hire my replacement or make
          the role unnecessary. Then I leave.
        </p>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
        <div className="hero-image">Headshot</div>
      </div>
    </section>

    {/* Credibility Strip */}
    <section className="credibility">
      <div className="container">
        <p>
          Former CTO/CPO at Ecologi – scaled from 3 to 80+ engineers, 18,000 B2B
          customers, LinkedIn Top 10 UK Startups 2022, exit. Most recently CTO
          at Just About, taking a pre-alpha concept to production.
        </p>
      </div>
    </section>

    {/* When Do You Need Someone Like Me */}
    <section className="when-section">
      <div className="container">
        <h2>When do you need someone like me</h2>
        <p className="when-intro">Two situations where I help:</p>
        <div className="when-cards">
          <div className="card when-card">
            <h3>You don't have a CTO</h3>
            <p>
              And need senior technical leadership without the cost and risk of
              a full-time hire.
            </p>
          </div>
          <div className="card when-card">
            <h3>You have a CTO</h3>
            <p>
              But they're struggling with the transition from engineer to
              leader. You want to develop them, not replace them.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* How This Works */}
    <section className="approach-section">
      <div className="container">
        <div className="approach-content">
          <h2>How this works</h2>
          <p>
            From one day a week to a three-month transformation. I embed with
            your team, figure out what's actually broken, and fix it – or hire
            someone brilliant who will.
          </p>
          <p>
            No dependency. No extended retainers. Success means I'm no longer
            needed.
          </p>
          <p className="approach-callout">
            If you want someone to nod along or move cautiously, I'm not your
            person. This works best with founders who want speed and can handle
            direct feedback.
          </p>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="final-cta">
      <div className="container">
        <h2>Ready to talk?</h2>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
      </div>
    </section>
  </Layout>
);

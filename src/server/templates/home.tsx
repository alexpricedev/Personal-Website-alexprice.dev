import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Home = () => (
  <Layout title="Home" name="home">
    {/* Hero */}
    <div className="hero min-h-[70vh] bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-16 max-w-6xl">
        <div className="avatar placeholder">
          <div className="bg-base-300 text-base-content/50 w-64 h-80 lg:w-80 lg:h-96 rounded-lg">
            <span className="text-sm">Headshot</span>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Fractional CTO who builds things that don't need him
          </h1>
          <p className="py-6 text-lg text-base-content/70 max-w-xl">
            Hiring a full-time CTO is expensive, slow, and high-risk. I'll tell
            you the hard truths, move fast, and either hire my replacement or
            make the role unnecessary. Then I leave.
          </p>
          <a href={CALENDLY_URL} className="btn btn-primary btn-lg">
            Book a call
          </a>
        </div>
      </div>
    </div>

    {/* Credibility Strip */}
    <section className="bg-base-200 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm text-base-content/70">
          Former CTO/CPO at Ecologi – scaled from 3 to 80+ engineers, 18,000 B2B
          customers, LinkedIn Top 10 UK Startups 2022, exit. Most recently CTO
          at Just About, taking a pre-alpha concept to production.
        </p>
      </div>
    </section>

    {/* When Do You Need Someone Like Me */}
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          When do you need someone like me
        </h2>
        <p className="text-center text-base-content/70 mb-12">
          Two situations where I help:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">You don't have a CTO</h3>
              <p className="text-base-content/70">
                And need senior technical leadership without the cost and risk
                of a full-time hire.
              </p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-primary">You have a CTO</h3>
              <p className="text-base-content/70">
                But they're struggling with the transition from engineer to
                leader. You want to develop them, not replace them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How This Works */}
    <section className="py-20 px-4 bg-base-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">How this works</h2>
        <p className="text-base-content/70 mb-4">
          From one day a week to a three-month transformation. I embed with your
          team, figure out what's actually broken, and fix it – or hire someone
          brilliant who will.
        </p>
        <p className="text-base-content/70 mb-8">
          No dependency. No extended retainers. Success means I'm no longer
          needed.
        </p>
        <div className="border-l-4 border-primary pl-4 italic text-base-content/60">
          If you want someone to nod along or move cautiously, I'm not your
          person. This works best with founders who want speed and can handle
          direct feedback.
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-20 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to talk?</h2>
      <a href={CALENDLY_URL} className="btn btn-primary btn-lg">
        Book a call
      </a>
    </section>
  </Layout>
);

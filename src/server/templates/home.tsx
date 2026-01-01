import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Home = () => (
  <Layout title="Home" name="home">
    {/* Hero */}
    <div className="hero min-h-[80vh] bg-base-100 py-16 lg:py-24">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-20 max-w-7xl px-6">
        <div className="avatar placeholder shrink-0">
          <div className="bg-base-300 text-base-content/50 w-72 h-[22rem] lg:w-96 lg:h-[28rem] rounded-xl">
            <span className="text-sm">Headshot</span>
          </div>
        </div>
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            Fractional CTO who builds things that don't need him
          </h1>
          <p className="mt-8 text-xl lg:text-2xl text-base-content/70 leading-relaxed">
            Hiring a full-time CTO is expensive, slow, and high-risk. I'll tell
            you the hard truths, move fast, and either hire my replacement or
            make the role unnecessary. Then I leave.
          </p>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              className="btn btn-primary btn-lg text-lg px-8"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Credibility Strip */}
    <section className="bg-base-200 py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-base text-base-content/60 leading-relaxed tracking-wide">
          Former CTO/CPO at Ecologi – scaled from 3 to 80+ engineers, 18,000 B2B
          customers, LinkedIn Top 10 UK Startups 2022, exit. Most recently CTO
          at Just About, taking a pre-alpha concept to production.
        </p>
      </div>
    </section>

    {/* When Do You Need Someone Like Me */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center tracking-tight">
          When do you need someone like me
        </h2>
        <p className="text-center text-xl text-base-content/70 mt-6 mb-16">
          Two situations where I help:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-200">
            <div className="card-body p-8">
              <h3 className="text-2xl font-semibold text-primary mb-3">
                You don't have a CTO
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                And need senior technical leadership without the cost and risk
                of a full-time hire.
              </p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body p-8">
              <h3 className="text-2xl font-semibold text-primary mb-3">
                You have a CTO
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                But they're struggling with the transition from engineer to
                leader. You want to develop them, not replace them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How This Works */}
    <section className="py-24 lg:py-32 px-6 bg-base-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-10">
              How this works
            </h2>
            <div className="space-y-6 text-xl text-base-content/70 leading-relaxed">
              <p>
                From one day a week to a three-month transformation. I embed
                with your team, figure out what's actually broken, and fix it –
                or hire someone brilliant who will.
              </p>
              <p>
                No dependency. No extended retainers. Success means I'm no
                longer needed.
              </p>
            </div>
            <div className="mt-12 border-l-4 border-primary pl-6 py-2">
              <p className="text-lg italic text-base-content/60 leading-relaxed">
                If you want someone to nod along or move cautiously, I'm not
                your person. This works best with founders who want speed and
                can handle direct feedback.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-base-300 text-base-content/50 w-full aspect-[4/3] rounded-xl flex items-center justify-center">
              <span className="text-sm">Working photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 lg:py-32 px-6 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
        Ready to talk?
      </h2>
      <a href={CALENDLY_URL} className="btn btn-primary btn-lg text-lg px-8">
        Book a call
      </a>
    </section>
  </Layout>
);

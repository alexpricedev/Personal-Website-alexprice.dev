import { Layout } from "@server/components/layouts";

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Home = () => (
  <Layout title="Home" name="home">
    {/* Hero */}
    <div className="hero min-h-[80vh] bg-base-100 py-16 lg:py-24">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-20 max-w-7xl px-6">
        <img
          src="/headshot.webp"
          alt="Alex Price"
          className="shrink-0 w-72 h-[22rem] lg:w-96 lg:h-[28rem] rounded-xl object-cover object-top border-2 border-base-800"
        />
        <div className="text-center lg:text-left max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            For Series A founders
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            Fractional CTO who builds teams that don't need him
          </h1>
          <p className="mt-8 text-xl lg:text-2xl text-base-content/70 leading-relaxed">
            Hiring a full-time CTO takes months and might not work out. I'll
            tell you what nobody else will, then either hire my replacement or
            make the role unnecessary.
          </p>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              className="btn btn-primary btn-lg text-lg px-8"
            >
              Get the honest take
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Credibility Strip */}
    <section className="bg-base-200 py-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-base text-base-content/60 leading-relaxed tracking-wide">
          I co-founded and was CTO at{" "}
          <a
            href="https://ecologi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ textUnderlineOffset: "4px" }}
          >
            Ecologi
          </a>{" "}
          where we scaled from 3 to 80+ employees, had 18,000{" "}
          <a
            href="https://uk.trustpilot.com/review/ecologi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ textUnderlineOffset: "4px" }}
          >
            happy B2B customers
          </a>{" "}
          and ranked #8 in{" "}
          <a
            href="https://www.linkedin.com/pulse/linkedin-top-startups-2022-15-uk-companies-rise-linkedin-news-uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ textUnderlineOffset: "4px" }}
          >
            LinkedIn's Top UK Startups 2022
          </a>
          . After my exit, I became CTO at{" "}
          <a
            href="https://justabout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ textUnderlineOffset: "4px" }}
          >
            Just
          </a>
          , taking a pre-alpha concept to production.
        </p>
        <p className="mt-4 text-lg text-base-content font-medium tracking-wide">
          Now I help Series A founders build engineering teams that scale.
        </p>
      </div>
    </section>

    {/* When Do You Need Someone Like Me */}
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center tracking-tight mb-12">
          You need me if...
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-200">
            <div className="card-body p-8">
              <h3 className="text-2xl font-semibold text-primary mb-3">
                You don't have a CTO
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                And need <strong>senior technical leadership</strong> without
                the cost and risk of a full-time hire.
              </p>
            </div>
          </div>
          <div className="card bg-base-200">
            <div className="card-body p-8">
              <h3 className="text-2xl font-semibold text-primary mb-3">
                You have a CTO
              </h3>
              <p className="text-lg text-base-content/70 leading-relaxed">
                But they're struggling with the{" "}
                <strong>transition from engineer to leader</strong>. You want to
                develop them, not replace them.
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
                Need ongoing senior tech leadership? I embed one or two days a
                week until you're ready to hire permanently.
              </p>
              <p>
                Need a specific problem solved? I run focused three-month
                transformations – team structure, hiring, tech strategy – then
                hand it off.
              </p>
            </div>
            <div className="card bg-base-300 mt-12 border-2 border-primary">
              <div className="card-body p-6">
                <p className="text-lg text-base-content leading-relaxed">
                  If you want someone to tell you what you want to hear or move
                  cautiously, I'm not your guy. I work best with founders who
                  want <strong>speed</strong> and can handle{" "}
                  <strong>direct feedback</strong>.
                </p>
              </div>
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
        Let's scale this thing
      </h2>
      <a href={CALENDLY_URL} className="btn btn-primary btn-lg text-lg px-8">
        Book a call
      </a>
    </section>
  </Layout>
);

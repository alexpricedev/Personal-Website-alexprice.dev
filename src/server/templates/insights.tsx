import { Layout } from "@server/components/layouts";
import type { ArticleMeta } from "@server/services/articles";

type InsightsProps = {
  articles: ArticleMeta[];
};

const pillarLabels: Record<string, string> = {
  scaling: "Scaling",
  fundraising: "Fundraising",
  ai: "AI",
  "war-stories": "War Stories",
};

export const Insights = ({ articles }: InsightsProps) => (
  <Layout
    title="Insights"
    description="Lessons from scaling teams, raising funds, and making mistakes."
    name="insights"
  >
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="avatar shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src="/headshot2.webp"
                alt="Alex Price"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">CTOx Insights</h1>
          </div>
        </div>
        <p className="text-base-content/70">
          Lessons from scaling teams, raising funds, and making mistakes.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="text-center py-16 text-base-content/60">
          <p>
            First post coming soon. In the meantime, find me on{" "}
            <a
              href="https://linkedin.com/in/alexpricecto"
              className="link link-primary"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="card bg-base-200 hover:bg-base-300 transition-colors block"
            >
              <div className="card-body">
                <h2 className="card-title">{article.title}</h2>
                <p className="text-sm text-base-content/60">
                  {article.date} · {article.readingTime} min read
                  {article.pillar && (
                    <>
                      {" · "}
                      <span className="badge badge-primary badge-sm">
                        {pillarLabels[article.pillar] || article.pillar}
                      </span>
                    </>
                  )}
                </p>
                {article.excerpt && (
                  <p className="text-base-content/70">{article.excerpt}...</p>
                )}
              </div>
            </a>
          ))}
          <p className="text-center text-base-content/50 text-sm pt-4">
            This area is new! More coming soon.
          </p>
        </div>
      )}
    </div>
  </Layout>
);

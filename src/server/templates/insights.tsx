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
  startups: "Startups",
  leadership: "Leadership",
};

export const Insights = ({ articles }: InsightsProps) => (
  <Layout
    title="Insights"
    description="Lessons from scaling teams, raising funds, and making mistakes."
    name="insights"
    path="/insights"
  >
    <div className="max-w-[700px] mx-auto px-6 pt-28 pb-20">
      <header className="mb-14">
        <h1 className="font-display text-[40px] leading-[1.15] tracking-[-0.02em] mb-4">
          Insights
        </h1>
        <p className="text-text-secondary leading-[1.7]">
          Lessons from scaling teams, raising funds, and making mistakes.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="text-center py-16 text-text-muted">
          <p>
            First post coming soon. In the meantime, find me on{" "}
            <a
              href="https://linkedin.com/in/alexpricecto"
              className="text-accent hover:text-accent-dim transition-colors duration-200"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      ) : (
        <div>
          {articles.map((article, index) => (
            <a
              key={article.slug}
              href={`/insights/${article.slug}`}
              className={`block py-8 group ${
                index < articles.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {article.pillar && (
                  <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-accent bg-accent-subtle px-3 py-1 rounded-full">
                    {pillarLabels[article.pillar] || article.pillar}
                  </span>
                )}
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
                  {article.date} · {article.readingTime} min read
                </span>
              </div>
              <h2 className="font-display text-[28px] leading-[1.2] mb-3 group-hover:text-accent transition-colors duration-200">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="text-text-secondary text-sm leading-[1.65]">
                  {article.excerpt}...
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  </Layout>
);

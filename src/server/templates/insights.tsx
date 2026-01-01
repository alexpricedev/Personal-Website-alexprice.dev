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
    <div className="container-narrow section">
      <header className="insights-header">
        <h1>Insights</h1>
        <p className="text-muted">
          Lessons from scaling teams, raising funds, and making mistakes.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="empty-state">
          First post coming soon. In the meantime, find me on{" "}
          <a href="https://linkedin.com/in/alexpricecto">LinkedIn</a>.
        </p>
      ) : (
        <ul className="insights-list">
          {articles.map((article) => (
            <li key={article.slug}>
              <article className="article-card">
                <h2>
                  <a href={`/insights/${article.slug}`}>{article.title}</a>
                </h2>
                <p className="article-meta">
                  {article.date} · {article.readingTime} min read
                  {article.pillar && (
                    <>
                      {" · "}
                      <span className="pillar">
                        {pillarLabels[article.pillar] || article.pillar}
                      </span>
                    </>
                  )}
                </p>
                {article.excerpt && (
                  <p className="article-excerpt">{article.excerpt}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Layout>
);

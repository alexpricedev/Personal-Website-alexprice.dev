import { Layout } from "@server/components/layouts";
import type { Article } from "@server/services/articles";

type InsightProps = {
  article: Article;
};

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Insight = ({ article }: InsightProps) => (
  <Layout title={article.title} description={article.excerpt} name="insight">
    <article className="container-narrow section">
      <a href="/insights" className="article-back text-muted">
        ← All insights
      </a>

      <header className="article-header">
        <h1>{article.title}</h1>
        <p className="article-meta text-muted">
          {article.date} · {article.readingTime} min read
        </p>
      </header>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="article-signoff">– Alex</p>

      <div className="article-cta">
        <p>
          Want to talk about this?{" "}
          <a href={CALENDLY_URL} className="btn btn-primary">
            Book a call
          </a>
        </p>
      </div>
    </article>
  </Layout>
);

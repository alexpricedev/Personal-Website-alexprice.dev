import { Layout } from "@server/components/layouts";
import type { Article } from "@server/services/articles";

type InsightProps = {
  article: Article;
};

const CALENDLY_URL = "https://calendly.com/alexprice";

export const Insight = ({ article }: InsightProps) => (
  <Layout title={article.title} description={article.excerpt} name="insight">
    <article className="max-w-3xl mx-auto px-4 py-16">
      <a
        href="/insights"
        className="link link-hover text-base-content/60 text-sm mb-8 inline-block"
      >
        ← All insights
      </a>

      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-sm text-base-content/60">
          {article.date} · {article.readingTime} min read
        </p>
      </header>

      <div
        className="article-content text-base-content/80 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="italic text-base-content/60 mt-12 mb-12">– Alex</p>

      <div className="divider" />

      <div className="text-center py-8">
        <p className="mb-4 text-base-content/70">Want to talk about this?</p>
        <a href={CALENDLY_URL} className="btn btn-primary">
          Book a call
        </a>
      </div>
    </article>
  </Layout>
);

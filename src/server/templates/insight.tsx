import { Layout } from "@server/components/layouts";
import { CALENDLY_URL } from "@server/config";
import type { Article } from "@server/services/articles";

type InsightProps = {
  article: Article;
};

export const Insight = ({ article }: InsightProps) => (
  <Layout
    title={article.title}
    description={article.excerpt}
    name="insight"
    path={`/insights/${article.slug}`}
    ogType="article"
    ogImage={article.image}
    publishedTime={article.isoDate}
  >
    <article className="max-w-[700px] mx-auto px-6 pt-28 pb-20">
      <a
        href="/insights"
        className="text-text-muted text-sm hover:text-text-secondary transition-colors duration-200 inline-block mb-10"
      >
        ← All insights
      </a>

      <header className="mb-14">
        <h1 className="font-display text-[clamp(2rem,5vw,2.5rem)] leading-[1.15] tracking-[-0.02em] mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-3">
          <img
            src="/headshot2.webp"
            alt="Alex Price"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="text-sm font-medium text-text-primary">Alex Price</p>
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-muted">
              {article.date} · {article.readingTime} min read
            </p>
          </div>
        </div>
      </header>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="italic text-text-muted mt-12 mb-12">– Alex</p>

      <div className="border-t border-border my-10" />

      <div className="py-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img
            src="/headshot2.webp"
            alt="Alex Price"
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <div className="text-center sm:text-left">
            <p className="text-text-secondary mb-3">Want to talk about this?</p>
            <a
              href={CALENDLY_URL}
              className="inline-flex items-center bg-accent text-[#0C0C0C] font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent-dim hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </article>
  </Layout>
);

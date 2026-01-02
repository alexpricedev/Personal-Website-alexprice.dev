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
        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
        <div className="flex items-center gap-3">
          <div className="avatar shrink-0">
            <div className="w-10 h-10 rounded-full">
              <img src="/headshot2.webp" alt="Alex Price" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Alex Price</p>
            <p className="text-xs text-base-content/60">
              {article.date} · {article.readingTime} min read
            </p>
          </div>
        </div>
      </header>

      <div
        className="article-content text-base-content/80 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="italic text-base-content/60 mt-12 mb-12">– Alex</p>

      <div className="divider" />

      <div className="py-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="avatar shrink-0">
            <div className="w-16 h-16 rounded-full">
              <img src="/headshot2.webp" alt="Alex Price" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-base-content/70 mb-3">
              Want to talk about this?
            </p>
            <a href={CALENDLY_URL} className="btn btn-primary btn-sm">
              Book a call
            </a>
          </div>
        </div>
      </div>
    </article>
  </Layout>
);

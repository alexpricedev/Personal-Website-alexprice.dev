import type { JSX } from "react";
import { renderToString } from "react-dom/server";
import { withTracking } from "../services/analytics";
import { getAllArticles, getArticleBySlug } from "../services/articles";
import { Home } from "../templates/home";
import { Insight } from "../templates/insight";
import { Insights } from "../templates/insights";
import { WorkWithMe } from "../templates/work-with-me";

const render = (element: JSX.Element): Response =>
  new Response(`<!DOCTYPE html>${renderToString(element)}`, {
    headers: { "Content-Type": "text/html" },
  });

const notFound = (): Response => new Response("Not found", { status: 404 });

export const viewRoutes = {
  "/": withTracking(() => render(<Home />)),
  "/insights": withTracking(() => {
    const articles = getAllArticles();
    return render(<Insights articles={articles} />);
  }),
  "/insights/:slug": withTracking((req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/insights/", "");
    const article = getArticleBySlug(slug);
    if (!article) {
      return notFound();
    }
    return render(<Insight article={article} />);
  }),
  "/work-with-me": withTracking(() => render(<WorkWithMe />)),
};

import type { JSX } from "react";
import { renderToString } from "react-dom/server";
import { withTracking } from "../services/analytics";
import { getAllArticles, getArticleBySlug } from "../services/articles";
import { getAllProjects } from "../services/projects";
import { About } from "../templates/about";
import { CommonIssues } from "../templates/common-issues";
import { Home } from "../templates/home";
import { Insight } from "../templates/insight";
import { Insights } from "../templates/insights";
import { Projects } from "../templates/projects";
import { VibeCodeAudit } from "../templates/vibe-code-audit";
import { WorkWithMe } from "../templates/work-with-me";

const render = (element: JSX.Element): Response =>
  new Response(`<!DOCTYPE html>${renderToString(element)}`, {
    headers: { "Content-Type": "text/html" },
  });

const notFound = (): Response => new Response("Not found", { status: 404 });

export const viewRoutes = {
  "/": withTracking(() => render(<Home />)),
  "/in": withTracking(() => Response.redirect("/", 302), "linkedin"),
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
  "/projects": withTracking(() => {
    const projects = getAllProjects();
    return render(<Projects projects={projects} />);
  }),
  "/how-it-works": withTracking(() => render(<WorkWithMe />)),
  "/work-with-me": withTracking(
    () => Response.redirect("/how-it-works", 301),
    "work-with-me-redirect",
  ),
  "/about": withTracking(() => render(<About />)),
  "/vibe-code-audit": withTracking(() => render(<VibeCodeAudit />)),
  "/common-issues": withTracking(() => render(<CommonIssues />)),
};

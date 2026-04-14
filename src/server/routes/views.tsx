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
import { Tools } from "../templates/tools";
import { VibeCodeAudit } from "../templates/vibe-code-audit";

const render = (element: JSX.Element): Response =>
  new Response(`<!DOCTYPE html>${renderToString(element)}`, {
    headers: { "Content-Type": "text/html" },
  });

const notFound = (): Response => new Response("Not found", { status: 404 });

export const viewRoutes = {
  "/": withTracking(() => render(<Home />)),
  "/in": withTracking(() => Response.redirect("/", 302), "linkedin"),
  "/writing": withTracking(() => {
    const articles = getAllArticles();
    return render(<Insights articles={articles} />);
  }),
  "/writing/:slug": withTracking((req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/writing/", "");
    const article = getArticleBySlug(slug);
    if (!article) {
      return notFound();
    }
    return render(<Insight article={article} />);
  }),
  "/insights": withTracking(
    () => Response.redirect("/writing", 301),
    "insights-redirect",
  ),
  "/insights/:slug": withTracking((req: Request) => {
    const url = new URL(req.url);
    const slug = url.pathname.replace("/insights/", "");
    return Response.redirect(`/writing/${slug}`, 301);
  }, "insights-slug-redirect"),
  "/work-with-me": withTracking(
    () => Response.redirect("/", 301),
    "work-with-me-redirect",
  ),
  "/tools": withTracking(() => {
    const projects = getAllProjects();
    return render(<Tools projects={projects} />);
  }),
  "/projects": withTracking(
    () => Response.redirect("/tools", 301),
    "projects-redirect",
  ),
  "/about": withTracking(() => render(<About />)),
  "/vibe-code-audit": withTracking(() => render(<VibeCodeAudit />)),
  "/assessment": withTracking(() => render(<CommonIssues />)),
};

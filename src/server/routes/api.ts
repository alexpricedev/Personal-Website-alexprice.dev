import { SITE_URL } from "@server/config";
import { getAllArticles } from "../services/articles";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/insights", priority: "0.9", changefreq: "weekly" },
  { path: "/work-with-me", priority: "0.8", changefreq: "monthly" },
];

export const apiRoutes = {
  "/sitemap.xml": () => {
    const articles = getAllArticles();

    const staticUrls = staticPages
      .map(
        (page) => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
      )
      .join("");

    const articleUrls = articles
      .map(
        (article) => `
  <url>
    <loc>${SITE_URL}/insights/${article.slug}</loc>
    <lastmod>${article.isoDate.split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${articleUrls}
</urlset>`;

    return new Response(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  },
};

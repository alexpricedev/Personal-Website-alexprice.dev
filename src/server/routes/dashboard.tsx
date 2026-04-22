import { renderToString } from "react-dom/server";
import {
  buildAuthCookie,
  buildClearAuthCookie,
  isDashboardAuthed,
  isDashboardConfigured,
  verifyPassword,
} from "../services/dashboard-auth";
import { getDashboardStats } from "../services/dashboard-stats";
import { Dashboard } from "../templates/dashboard";
import { DashboardLogin } from "../templates/dashboard-login";

const BOT_PATTERNS =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|preview|lighthouse|pagespeed|headless|fetch|python-requests|curl|wget|java|scrapy/i;

function isBotRequest(req: Request): boolean {
  const ua = req.headers.get("user-agent");
  if (!ua) return true;
  return BOT_PATTERNS.test(ua);
}

const notFound = () => new Response("Not found", { status: 404 });

const htmlResponse = (body: string, init: ResponseInit = {}) =>
  new Response(`<!DOCTYPE html>${body}`, {
    ...init,
    headers: {
      "Content-Type": "text/html",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
      "Cache-Control": "no-store",
      ...(init.headers ?? {}),
    },
  });

const renderLogin = (error?: string, status = 200) =>
  htmlResponse(renderToString(<DashboardLogin error={error} />), { status });

export const dashboardRoutes = {
  "/dashboard": async (req: Request) => {
    if (isBotRequest(req)) return notFound();
    if (!isDashboardConfigured()) return notFound();

    if (!isDashboardAuthed(req)) {
      return renderLogin();
    }

    const stats = await getDashboardStats();
    return htmlResponse(renderToString(<Dashboard stats={stats} />));
  },

  "/dashboard/login": {
    POST: async (req: Request) => {
      if (isBotRequest(req)) return notFound();
      if (!isDashboardConfigured()) return notFound();

      const form = await req.formData();
      const password = form.get("password");

      if (typeof password !== "string" || !verifyPassword(password)) {
        return renderLogin("Incorrect password.", 401);
      }

      const cookie = buildAuthCookie();
      if (!cookie) return notFound();

      return new Response(null, {
        status: 303,
        headers: {
          Location: "/dashboard",
          "Set-Cookie": cookie,
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    },
  },

  "/dashboard/logout": {
    POST: (req: Request) => {
      if (isBotRequest(req)) return notFound();
      return new Response(null, {
        status: 303,
        headers: {
          Location: "/dashboard",
          "Set-Cookie": buildClearAuthCookie(),
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    },
  },
};

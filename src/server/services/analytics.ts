import { sql } from "bun";

const BOT_PATTERNS =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|preview/i;

const SKIP_ANALYTICS_COOKIE = "skip_analytics";

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_PATTERNS.test(userAgent);
}

function hasSkipAnalyticsCookie(req: Request): boolean {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return false;
  return cookieHeader.split(";").some((cookie) => {
    const [name, value] = cookie.trim().split("=");
    return name === SKIP_ANALYTICS_COOKIE && value === "1";
  });
}

interface UtmParams {
  source: string | null;
  medium: string | null;
  campaign: string | null;
}

export function trackPageView(
  path: string,
  referrer: string | null,
  userAgent: string | null,
  utm: UtmParams,
): void {
  if (isBot(userAgent)) return;

  sql`
    INSERT INTO page_views (path, referrer, user_agent, utm_source, utm_medium, utm_campaign)
    VALUES (${path}, ${referrer}, ${userAgent}, ${utm.source}, ${utm.medium}, ${utm.campaign})
  `.catch(() => {
    // Fire and forget - silently ignore errors
  });
}

type RouteHandler = (req: Request) => Response | Promise<Response>;

export function withTracking(handler: RouteHandler): RouteHandler {
  return async (req: Request) => {
    const url = new URL(req.url);
    const adminParam = url.searchParams.get("admin") === "1";
    const hasSkipCookie = hasSkipAnalyticsCookie(req);
    const shouldSkipAnalytics = adminParam || hasSkipCookie;

    if (!shouldSkipAnalytics) {
      trackPageView(
        url.pathname,
        req.headers.get("referer"),
        req.headers.get("user-agent"),
        {
          source: url.searchParams.get("utm_source"),
          medium: url.searchParams.get("utm_medium"),
          campaign: url.searchParams.get("utm_campaign"),
        },
      );
    }

    const response = await handler(req);

    // Set cookie if admin param is present and cookie isn't already set
    if (adminParam && !hasSkipCookie) {
      const newResponse = new Response(response.body, response);
      newResponse.headers.append(
        "Set-Cookie",
        `${SKIP_ANALYTICS_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`,
      );
      return newResponse;
    }

    return response;
  };
}

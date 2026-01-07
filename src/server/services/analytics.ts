import { sql } from "bun";

const BOT_PATTERNS =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|preview/i;

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_PATTERNS.test(userAgent);
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
  return (req: Request) => {
    const url = new URL(req.url);

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

    return handler(req);
  };
}

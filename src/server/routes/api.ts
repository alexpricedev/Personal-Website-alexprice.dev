import { SITE_URL } from "@server/config";
import { getAllArticles } from "../services/articles";
import { isDashboardAuthed } from "../services/dashboard-auth";
import {
  type FeedbackInput,
  feedbackRowsToCsv,
  getAllFeedback,
  saveFeedback,
} from "../services/feedback-8020";
import { checkRateLimit } from "../services/rate-limit";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/writing", priority: "0.9", changefreq: "weekly" },
  { path: "/tools", priority: "0.8", changefreq: "monthly" },
];

const FEEDBACK_8020_ORIGIN = "https://8020.chptrs.tech";
const FEEDBACK_8020_TEXT_MAX = 2000;
const FEEDBACK_8020_MODULE_MAX = 100;
const FEEDBACK_8020_QUESTION_MAX = 500;
const FEEDBACK_8020_RATE_LIMIT = { limit: 20, windowMs: 60_000 };

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": FEEDBACK_8020_ORIGIN,
  Vary: "Origin",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...extraHeaders,
    },
  });
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function parseRequiredString(
  value: unknown,
  field: string,
  max: number,
): string | { error: string } {
  if (typeof value !== "string") {
    return { error: `${field} must be a string` };
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { error: `${field} is required` };
  }
  if (trimmed.length > max) {
    return { error: `${field} must be ${max} chars or fewer` };
  }
  return trimmed;
}

function parseFeedbackBody(raw: unknown): FeedbackInput | { error: string } {
  if (!raw || typeof raw !== "object") {
    return { error: "Body must be a JSON object" };
  }
  const obj = raw as Record<string, unknown>;

  let response: boolean;
  if (typeof obj.response === "boolean") {
    response = obj.response;
  } else if (obj.response === "yes") {
    response = true;
  } else if (obj.response === "no") {
    response = false;
  } else {
    return { error: 'response must be true, false, "yes", or "no"' };
  }

  const module = parseRequiredString(
    obj.module,
    "module",
    FEEDBACK_8020_MODULE_MAX,
  );
  if (typeof module !== "string") return module;

  const question = parseRequiredString(
    obj.question,
    "question",
    FEEDBACK_8020_QUESTION_MAX,
  );
  if (typeof question !== "string") return question;

  let text: string | null = null;
  if (obj.text !== undefined && obj.text !== null) {
    if (typeof obj.text !== "string") {
      return { error: "text must be a string" };
    }
    const trimmed = obj.text.trim();
    if (trimmed.length > FEEDBACK_8020_TEXT_MAX) {
      return { error: `text must be ${FEEDBACK_8020_TEXT_MAX} chars or fewer` };
    }
    text = trimmed.length > 0 ? trimmed : null;
  }

  return { response, module, question, text };
}

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
    <loc>${SITE_URL}/writing/${article.slug}</loc>
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

  "/api/8020/feedback": {
    OPTIONS: () => new Response(null, { status: 204, headers: corsHeaders }),
    POST: async (req: Request) => {
      const limit = checkRateLimit(
        `feedback-8020:${clientIp(req)}`,
        FEEDBACK_8020_RATE_LIMIT,
      );
      if (!limit.allowed) {
        return jsonResponse({ error: "Too many requests" }, 429, {
          "Retry-After": String(limit.retryAfter),
        });
      }

      let raw: unknown;
      try {
        raw = await req.json();
      } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
      }

      const parsed = parseFeedbackBody(raw);
      if ("error" in parsed) {
        return jsonResponse({ error: parsed.error }, 400);
      }

      try {
        await saveFeedback(parsed);
      } catch {
        return jsonResponse({ error: "Could not save feedback" }, 500);
      }

      return jsonResponse({ ok: true }, 201);
    },
  },

  "/api/8020/feedback.csv": async (req: Request) => {
    if (!isDashboardAuthed(req)) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dashboard",
          "Cache-Control": "no-store",
        },
      });
    }

    const rows = await getAllFeedback();
    const csv = feedbackRowsToCsv(rows);
    const today = new Date().toISOString().slice(0, 10);

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="8020-feedback-${today}.csv"`,
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  },
};

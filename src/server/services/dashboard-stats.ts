import { sql } from "bun";

export interface TotalsByRange {
  today: number;
  last7d: number;
  last30d: number;
  allTime: number;
}

export interface DayCount {
  day: string;
  count: number;
}

export interface PathCount {
  path: string;
  count: number;
}

export interface ReferrerCount {
  referrer: string;
  count: number;
  landingPages: PathCount[];
}

export interface UtmSourceCount {
  source: string;
  count: number;
}

export interface RecentView {
  path: string;
  referrer: string | null;
  utm_source: string | null;
  created_at: string;
}

export interface DashboardStats {
  totals: TotalsByRange;
  viewsByDay: DayCount[];
  topPaths: PathCount[];
  topReferrers: ReferrerCount[];
  topUtmSources: UtmSourceCount[];
  recentViews: RecentView[];
}

function aggregateReferrers(
  rows: Array<{ referrer: string; path: string; count: number }>,
): ReferrerCount[] {
  const byReferrer = new Map<string, { count: number; paths: PathCount[] }>();
  for (const row of rows) {
    const entry = byReferrer.get(row.referrer) ?? { count: 0, paths: [] };
    entry.count += row.count;
    entry.paths.push({ path: row.path, count: row.count });
    byReferrer.set(row.referrer, entry);
  }
  return Array.from(byReferrer.entries())
    .map(([referrer, { count, paths }]) => ({
      referrer,
      count,
      landingPages: paths.sort((a, b) => b.count - a.count).slice(0, 3),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalsRow] = await sql`
    SELECT
      COUNT(*) FILTER (WHERE created_at >= date_trunc('day', NOW()))::int AS today,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS last7d,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS last30d,
      COUNT(*)::int AS all_time
    FROM page_views
  `;

  const viewsByDayRows = await sql`
    SELECT
      to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
      COUNT(*)::int AS count
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY 1
    ORDER BY 1 ASC
  `;

  const topPathsRows = await sql`
    SELECT path, COUNT(*)::int AS count
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY path
    ORDER BY count DESC
    LIMIT 15
  `;

  const referrerLandingRows = await sql`
    SELECT referrer, path, COUNT(*)::int AS count
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '30 days'
      AND referrer IS NOT NULL
      AND referrer <> ''
      AND referrer NOT LIKE '%alexprice.dev%'
      AND referrer NOT LIKE '%localhost%'
    GROUP BY referrer, path
  `;

  const topUtmSourcesRows = await sql`
    SELECT utm_source AS source, COUNT(*)::int AS count
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '30 days'
      AND utm_source IS NOT NULL
      AND utm_source <> ''
    GROUP BY utm_source
    ORDER BY count DESC
    LIMIT 10
  `;

  const recentViewsRows = await sql`
    SELECT
      path,
      referrer,
      utm_source,
      to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI:SS') AS created_at
    FROM page_views
    ORDER BY created_at DESC
    LIMIT 25
  `;

  return {
    totals: {
      today: totalsRow?.today ?? 0,
      last7d: totalsRow?.last7d ?? 0,
      last30d: totalsRow?.last30d ?? 0,
      allTime: totalsRow?.all_time ?? 0,
    },
    viewsByDay: viewsByDayRows.map((r: { day: string; count: number }) => ({
      day: r.day,
      count: r.count,
    })),
    topPaths: topPathsRows.map((r: { path: string; count: number }) => ({
      path: r.path,
      count: r.count,
    })),
    topReferrers: aggregateReferrers(referrerLandingRows),
    topUtmSources: topUtmSourcesRows.map(
      (r: { source: string; count: number }) => ({
        source: r.source,
        count: r.count,
      }),
    ),
    recentViews: recentViewsRows.map(
      (r: {
        path: string;
        referrer: string | null;
        utm_source: string | null;
        created_at: string;
      }) => ({
        path: r.path,
        referrer: r.referrer,
        utm_source: r.utm_source,
        created_at: r.created_at,
      }),
    ),
  };
}

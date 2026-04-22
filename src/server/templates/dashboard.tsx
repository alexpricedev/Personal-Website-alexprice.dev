import type { DashboardStats } from "@server/services/dashboard-stats";
import type { ReactNode } from "react";

interface DashboardProps {
  stats: DashboardStats;
}

function fillDays(
  viewsByDay: DashboardStats["viewsByDay"],
  days = 30,
): Array<{ day: string; count: number }> {
  const map = new Map(viewsByDay.map((d) => [d.day, d.count]));
  const result: Array<{ day: string; count: number }> = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ day: key, count: map.get(key) ?? 0 });
  }
  return result;
}

function formatShortDate(day: string): string {
  const [, m, d] = day.split("-");
  return `${d}/${m}`;
}

function formatReferrer(ref: string): string {
  try {
    const url = new URL(ref);
    return url.hostname.replace(/^www\./, "") + url.pathname.replace(/\/$/, "");
  } catch {
    return ref;
  }
}

export const Dashboard = ({ stats }: DashboardProps) => {
  const days = fillDays(stats.viewsByDay, 30);
  const maxCount = Math.max(1, ...days.map((d) => d.count));

  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Commit+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/main.css" />
      </head>
      <body className="min-h-screen bg-surface-base text-text-primary font-body antialiased">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-display text-3xl tracking-[-0.02em]">
                Pageviews
              </h1>
              <p className="text-sm text-text-muted mt-1">
                Bots and admin opt-outs are excluded.
              </p>
            </div>
            <form method="POST" action="/dashboard/logout">
              <button
                type="submit"
                className="font-ui text-[11px] tracking-[0.08em] uppercase text-text-muted hover:text-accent transition-colors"
              >
                Sign out
              </button>
            </form>
          </header>

          {/* Totals */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard label="Today" value={stats.totals.today} />
            <StatCard label="Last 7 days" value={stats.totals.last7d} />
            <StatCard label="Last 30 days" value={stats.totals.last30d} />
            <StatCard label="All time" value={stats.totals.allTime} />
          </section>

          {/* Chart */}
          <section className="bg-surface-1 border border-border rounded-[12px] p-8 mb-12">
            <h2 className="font-ui text-[11px] tracking-[0.08em] uppercase text-text-muted mb-6">
              Last 30 days
            </h2>
            <div className="flex items-end gap-1 h-[180px]">
              {days.map((d) => {
                const h = Math.max(2, Math.round((d.count / maxCount) * 180));
                return (
                  <div
                    key={d.day}
                    className="flex-1 flex flex-col items-center gap-2 group"
                    title={`${d.day}: ${d.count}`}
                  >
                    <div className="flex-1 w-full flex items-end">
                      <div
                        className="w-full bg-accent/60 group-hover:bg-accent rounded-t-[2px] transition-colors"
                        style={{ height: `${h}px` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-end gap-1 mt-2">
              {days.map((d, i) => (
                <div
                  key={d.day}
                  className="flex-1 text-center font-mono text-[10px] text-text-muted"
                >
                  {i % 5 === 0 ? formatShortDate(d.day) : ""}
                </div>
              ))}
            </div>
          </section>

          {/* Two-col: paths + referrers */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <Panel title="Top paths (30d)">
              {stats.topPaths.length === 0 ? (
                <EmptyRow />
              ) : (
                stats.topPaths.map((p) => (
                  <Row
                    key={p.path}
                    label={p.path}
                    count={p.count}
                    max={stats.topPaths[0]?.count ?? 1}
                  />
                ))
              )}
            </Panel>
            <Panel title="Top referrers (30d)">
              {stats.topReferrers.length === 0 ? (
                <EmptyRow />
              ) : (
                stats.topReferrers.map((r) => (
                  <div key={r.referrer}>
                    <Row
                      label={formatReferrer(r.referrer)}
                      count={r.count}
                      max={stats.topReferrers[0]?.count ?? 1}
                    />
                    {r.landingPages.length > 0 && (
                      <ul className="mt-1 mb-2 ml-3 pl-3 border-l border-border space-y-1">
                        {r.landingPages.map((lp) => (
                          <li
                            key={lp.path}
                            className="flex items-center justify-between gap-4 text-[13px]"
                          >
                            <span
                              className="truncate text-text-secondary"
                              title={lp.path}
                            >
                              {lp.path}
                            </span>
                            <span className="font-mono text-text-muted shrink-0">
                              {lp.count.toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </Panel>
          </section>

          {/* UTM sources */}
          <section className="mb-12">
            <Panel title="UTM sources (30d)">
              {stats.topUtmSources.length === 0 ? (
                <EmptyRow />
              ) : (
                stats.topUtmSources.map((u) => (
                  <Row
                    key={u.source}
                    label={u.source}
                    count={u.count}
                    max={stats.topUtmSources[0]?.count ?? 1}
                  />
                ))
              )}
            </Panel>
          </section>

          {/* Recent */}
          <section>
            <Panel title="Recent views">
              {stats.recentViews.length === 0 ? (
                <EmptyRow />
              ) : (
                <div className="font-mono text-[12px]">
                  <div className="grid grid-cols-[180px_1fr_1fr_120px] gap-4 text-text-muted text-[10px] uppercase tracking-[0.08em] pb-2 border-b border-border">
                    <div>When (UTC)</div>
                    <div>Path</div>
                    <div>Referrer</div>
                    <div>UTM</div>
                  </div>
                  {stats.recentViews.map((v, i) => (
                    <div
                      key={`${v.created_at}-${i}`}
                      className="grid grid-cols-[180px_1fr_1fr_120px] gap-4 py-2 border-b border-border text-text-secondary"
                    >
                      <div>{v.created_at}</div>
                      <div className="truncate text-text-primary">{v.path}</div>
                      <div className="truncate" title={v.referrer ?? ""}>
                        {v.referrer ? formatReferrer(v.referrer) : "—"}
                      </div>
                      <div className="truncate text-accent">
                        {v.utm_source ?? "—"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </section>
        </div>
      </body>
    </html>
  );
};

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-surface-1 border border-border rounded-[12px] p-6">
      <p className="font-ui text-[11px] tracking-[0.08em] uppercase text-text-muted mb-2">
        {label}
      </p>
      <p className="font-mono text-3xl text-text-primary">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-surface-1 border border-border rounded-[12px] p-8">
      <h2 className="font-ui text-[11px] tracking-[0.08em] uppercase text-text-muted mb-5">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  const pct = Math.max(2, Math.round((count / max) * 100));
  return (
    <div className="relative py-2">
      <div
        className="absolute inset-y-0 left-0 bg-accent-subtle rounded-[4px]"
        style={{ width: `${pct}%` }}
      />
      <div className="relative flex items-center justify-between gap-4">
        <span className="truncate text-sm text-text-primary" title={label}>
          {label}
        </span>
        <span className="font-mono text-sm text-text-muted shrink-0">
          {count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function EmptyRow() {
  return <p className="text-sm text-text-muted">No data yet.</p>;
}

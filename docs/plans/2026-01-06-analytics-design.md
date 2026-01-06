# Simple Server-Side Analytics

## Overview

Minimal page view tracking using Postgres. No client-side scripts, no cookies, no unique visitor tracking.

## Data Model

```sql
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
```

## Files to Create/Modify

### 1. `src/server/database/migrate.ts` (new)

- `runMigrations()` function that creates the table and indexes
- Uses `IF NOT EXISTS` for idempotency

### 2. `src/server/services/analytics.ts` (new)

- `trackPageView(path, referrer, userAgent)` - inserts a page view, filters bots
- `withTracking(handler)` - HOC to wrap route handlers
- Bot filtering via regex on user agent (googlebot, bingbot, etc.)

### 3. `src/server/main.ts` (modify)

- Import and call `await runMigrations()` before `Bun.serve()`

### 4. `src/server/routes/views.tsx` (modify)

- Wrap route handlers with `withTracking()` for opt-in tracking

## Bot Filtering

Filter at insert time using pattern:
```
/bot|crawl|spider|slurp|mediapartners|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|preview/i
```

## Querying

Run directly against Postgres:

```sql
-- Views today by path
SELECT path, COUNT(*) FROM page_views
WHERE created_at >= CURRENT_DATE
GROUP BY path ORDER BY count DESC;

-- Views by day (last 7 days)
SELECT DATE(created_at) as day, COUNT(*) FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY day ORDER BY day DESC;

-- Top referrers
SELECT referrer, COUNT(*) FROM page_views
WHERE referrer IS NOT NULL
GROUP BY referrer ORDER BY count DESC LIMIT 10;
```

## Environment

Requires `DATABASE_URL` environment variable.

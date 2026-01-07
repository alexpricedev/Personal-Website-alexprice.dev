import { sql } from "bun";

export async function runMigrations() {
  await sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id SERIAL PRIMARY KEY,
      path TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Add UTM columns if they don't exist (for existing tables)
  await sql`
    ALTER TABLE page_views
    ADD COLUMN IF NOT EXISTS utm_source TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign TEXT
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_page_views_created_at
    ON page_views(created_at)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_page_views_path
    ON page_views(path)
  `;
}

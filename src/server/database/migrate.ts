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

  await sql`
    CREATE TABLE IF NOT EXISTS feedback_8020 (
      id SERIAL PRIMARY KEY,
      response BOOLEAN NOT NULL,
      module TEXT NOT NULL,
      question TEXT NOT NULL,
      text TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Safety net for any env that created feedback_8020 before module/question existed
  await sql`
    ALTER TABLE feedback_8020
    ADD COLUMN IF NOT EXISTS module TEXT,
    ADD COLUMN IF NOT EXISTS question TEXT
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_feedback_8020_created_at
    ON feedback_8020(created_at DESC)
  `;
}

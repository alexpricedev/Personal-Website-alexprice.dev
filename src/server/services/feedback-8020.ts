import { sql } from "bun";

export interface FeedbackInput {
  response: boolean;
  module: string;
  question: string;
  text?: string | null;
}

export interface FeedbackRow {
  id: number;
  response: boolean;
  module: string;
  question: string;
  text: string | null;
  created_at: Date;
}

export async function saveFeedback(input: FeedbackInput): Promise<void> {
  await sql`
    INSERT INTO feedback_8020 (response, module, question, text)
    VALUES (${input.response}, ${input.module}, ${input.question}, ${input.text ?? null})
  `;
}

export async function getAllFeedback(): Promise<FeedbackRow[]> {
  const rows = await sql`
    SELECT id, response, module, question, text, created_at
    FROM feedback_8020
    ORDER BY created_at DESC
  `;
  return rows as FeedbackRow[];
}

const CSV_INJECTION_PREFIXES = ["=", "+", "-", "@", "\t", "\r"];

function escapeCsvField(value: string): string {
  let safe = value;
  if (safe.length > 0 && CSV_INJECTION_PREFIXES.includes(safe[0])) {
    safe = `'${safe}`;
  }
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

export function feedbackRowsToCsv(rows: FeedbackRow[]): string {
  const header = "id,response,module,question,text,created_at";
  const lines = rows.map((row) => {
    const id = String(row.id);
    const response = row.response ? "yes" : "no";
    const module = row.module ?? "";
    const question = row.question ?? "";
    const text = row.text ?? "";
    const createdAt =
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString();
    return [
      id,
      response,
      escapeCsvField(module),
      escapeCsvField(question),
      escapeCsvField(text),
      createdAt,
    ].join(",");
  });
  return [header, ...lines].join("\n");
}

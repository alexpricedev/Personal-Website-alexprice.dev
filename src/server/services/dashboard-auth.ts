import crypto from "node:crypto";

const AUTH_COOKIE = "dashboard_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function getExpectedToken(): string | null {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return null;
  return hashPassword(password);
}

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, v] = part.trim().split("=");
    if (k === name) return v ?? null;
  }
  return null;
}

export function isDashboardAuthed(req: Request): boolean {
  const expected = getExpectedToken();
  if (!expected) return false;
  const provided = readCookie(req, AUTH_COOKIE);
  if (!provided || provided.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyPassword(submitted: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function buildAuthCookie(): string | null {
  const token = getExpectedToken();
  if (!token) return null;
  return `${AUTH_COOKIE}=${token}; Path=/dashboard; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Strict`;
}

export function buildClearAuthCookie(): string {
  return `${AUTH_COOKIE}=; Path=/dashboard; Max-Age=0; HttpOnly; SameSite=Strict`;
}

export function isDashboardConfigured(): boolean {
  return Boolean(process.env.DASHBOARD_PASSWORD);
}

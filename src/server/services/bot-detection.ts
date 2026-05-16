const BOT_PATTERNS =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|preview|lighthouse|pagespeed|headless|fetch|python-requests|curl|wget|java|scrapy/i;

export function isBotRequest(req: Request): boolean {
  const ua = req.headers.get("user-agent");
  if (!ua) return true;
  return BOT_PATTERNS.test(ua);
}

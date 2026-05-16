type Bucket = number[];

const buckets = new Map<string, Bucket>();

export interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
}

export function checkRateLimit(
  key: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - opts.windowMs;
  const existing = buckets.get(key) ?? [];
  const recent = existing.filter((t) => t > cutoff);

  if (recent.length >= opts.limit) {
    const oldest = recent[0] ?? now;
    const retryAfter = Math.max(
      1,
      Math.ceil((oldest + opts.windowMs - now) / 1000),
    );
    buckets.set(key, recent);
    return { allowed: false, retryAfter };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > 10_000) pruneBuckets(cutoff);

  return { allowed: true, retryAfter: 0 };
}

function pruneBuckets(cutoff: number): void {
  for (const [key, bucket] of buckets) {
    const recent = bucket.filter((t) => t > cutoff);
    if (recent.length === 0) buckets.delete(key);
    else buckets.set(key, recent);
  }
}

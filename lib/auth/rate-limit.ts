type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** In-memory limit per server instance. Enough to slow online guessing. */
export function allowAttempt(
  key: string,
  limit = 8,
  windowMs = 15 * 60 * 1000,
): boolean {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= limit;
}

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || "unknown";
}

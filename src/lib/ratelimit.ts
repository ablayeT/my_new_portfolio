const hits = new Map<string, { count: number; ts: number }>();

export function rateLimit(key: string, limit = 40, windowMs = 60_000) {
  const now = Date.now();
  const e = hits.get(key);
  if (!e || now - e.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return { allowed: true };
  }
  e.count += 1;
  if (e.count > limit) return { allowed: false };
  return { allowed: true };
}

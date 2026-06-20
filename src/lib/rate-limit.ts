// In-memory rate limiter — suitable for development and single-instance deployments.
// Replace with Upstash Redis (@upstash/ratelimit) before scaling to multiple
// serverless instances, as in-memory state is not shared across invocations.

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

type Config = { limit: number; windowMs: number };

export function checkRateLimit(
  key: string,
  config: Config,
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.limit - 1 };
  }

  if (entry.count >= config.limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: config.limit - entry.count };
}

export const RATE_LIMITS = {
  contactForm: { limit: 5, windowMs: 10 * 60 * 1000 },
  counsellingForm: { limit: 3, windowMs: 30 * 60 * 1000 },
  adminLogin: { limit: 5, windowMs: 15 * 60 * 1000 },
} as const;

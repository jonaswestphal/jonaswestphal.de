const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 3600; // 1 hour

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * IP-based rate limiting using Cloudflare KV.
 * Allows a maximum of 5 requests per IP address per hour.
 *
 * @param kv - Cloudflare KV namespace for rate limit storage
 * @param ip - Client IP address
 * @returns Whether the request is allowed and remaining quota
 */
export async function checkRateLimit(
  kv: KVNamespace,
  ip: string,
): Promise<RateLimitResult> {
  const key = `rate-limit:${ip}`;
  const now = Math.floor(Date.now() / 1000);

  const stored = await kv.get(key);

  if (!stored) {
    // First request from this IP
    const data = { count: 1, windowStart: now };
    await kv.put(key, JSON.stringify(data), {
      expirationTtl: WINDOW_SECONDS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: now + WINDOW_SECONDS,
    };
  }

  const data: { count: number; windowStart: number } = JSON.parse(stored);

  // Check if the window has expired
  if (now - data.windowStart >= WINDOW_SECONDS) {
    // Start a new window
    const newData = { count: 1, windowStart: now };
    await kv.put(key, JSON.stringify(newData), {
      expirationTtl: WINDOW_SECONDS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: now + WINDOW_SECONDS,
    };
  }

  // Within the current window
  if (data.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: data.windowStart + WINDOW_SECONDS,
    };
  }

  // Increment the counter
  data.count += 1;
  const remainingTtl = WINDOW_SECONDS - (now - data.windowStart);
  await kv.put(key, JSON.stringify(data), {
    expirationTtl: remainingTtl > 0 ? remainingTtl : 1,
  });

  return {
    allowed: true,
    remaining: MAX_REQUESTS - data.count,
    resetAt: data.windowStart + WINDOW_SECONDS,
  };
}

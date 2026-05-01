const MAX_SUCCESSFUL_REQUESTS = 3; // Max successful submissions per IP per hour
const MAX_TOTAL_REQUESTS = 10; // Max total attempts (including failed) per IP per hour
const WINDOW_SECONDS = 3600; // 1 hour
const GLOBAL_MAX_PER_HOUR = 50; // Global max emails per hour (all IPs combined)

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  reason?: string;
}

interface RateLimitData {
  total: number; // All attempts (including failed Turnstile, validation errors)
  successful: number; // Only successful submissions that sent an email
  windowStart: number;
}

/**
 * Multi-layer rate limiting using Cloudflare KV.
 *
 * Layer 1: Per-IP total attempts (10/hour) — catches brute-force bots
 * Layer 2: Per-IP successful submissions (3/hour) — limits actual emails per IP
 * Layer 3: Global hourly limit (50/hour) — prevents distributed attacks
 *
 * Call `checkRateLimit` before processing the request.
 * Call `recordSuccessfulSubmission` after a successful email send.
 */
export async function checkRateLimit(
  kv: KVNamespace,
  ip: string,
): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000);

  // Layer 3: Global rate limit
  const globalResult = await checkGlobalLimit(kv, now);
  if (!globalResult.allowed) {
    return globalResult;
  }

  // Layer 1 + 2: Per-IP rate limit
  const key = `rate-limit:${ip}`;
  const stored = await kv.get(key);

  if (!stored) {
    // First request from this IP
    const data: RateLimitData = { total: 1, successful: 0, windowStart: now };
    await kv.put(key, JSON.stringify(data), {
      expirationTtl: WINDOW_SECONDS,
    });
    return {
      allowed: true,
      remaining: MAX_SUCCESSFUL_REQUESTS,
      resetAt: now + WINDOW_SECONDS,
    };
  }

  const data: RateLimitData = JSON.parse(stored);

  // Check if the window has expired
  if (now - data.windowStart >= WINDOW_SECONDS) {
    const newData: RateLimitData = { total: 1, successful: 0, windowStart: now };
    await kv.put(key, JSON.stringify(newData), {
      expirationTtl: WINDOW_SECONDS,
    });
    return {
      allowed: true,
      remaining: MAX_SUCCESSFUL_REQUESTS,
      resetAt: now + WINDOW_SECONDS,
    };
  }

  // Layer 1: Check total attempts (catches bots hammering the endpoint)
  if (data.total >= MAX_TOTAL_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: data.windowStart + WINDOW_SECONDS,
      reason: "Too many requests",
    };
  }

  // Layer 2: Check successful submissions
  if (data.successful >= MAX_SUCCESSFUL_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: data.windowStart + WINDOW_SECONDS,
      reason: "Too many requests",
    };
  }

  // Increment total attempts counter
  data.total += 1;
  const remainingTtl = WINDOW_SECONDS - (now - data.windowStart);
  await kv.put(key, JSON.stringify(data), {
    expirationTtl: remainingTtl > 0 ? remainingTtl : 1,
  });

  return {
    allowed: true,
    remaining: MAX_SUCCESSFUL_REQUESTS - data.successful,
    resetAt: data.windowStart + WINDOW_SECONDS,
  };
}

/**
 * Records a successful email submission for the given IP.
 * Call this AFTER the email was actually sent.
 * This increments the "successful" counter which is the stricter limit.
 */
export async function recordSuccessfulSubmission(
  kv: KVNamespace,
  ip: string,
): Promise<void> {
  const key = `rate-limit:${ip}`;
  const stored = await kv.get(key);
  if (!stored) return;

  const data: RateLimitData = JSON.parse(stored);
  data.successful += 1;

  const now = Math.floor(Date.now() / 1000);
  const remainingTtl = WINDOW_SECONDS - (now - data.windowStart);
  await kv.put(key, JSON.stringify(data), {
    expirationTtl: remainingTtl > 0 ? remainingTtl : 1,
  });

  // Also increment global counter
  await incrementGlobalCounter(kv, now);
}

// ─── Global Rate Limit ───────────────────────────────────────────────────────

async function checkGlobalLimit(
  kv: KVNamespace,
  now: number,
): Promise<RateLimitResult> {
  const hourKey = `global-rate:${Math.floor(now / WINDOW_SECONDS)}`;
  const stored = await kv.get(hourKey);
  const count = stored ? parseInt(stored, 10) : 0;

  if (count >= GLOBAL_MAX_PER_HOUR) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: (Math.floor(now / WINDOW_SECONDS) + 1) * WINDOW_SECONDS,
      reason: "Too many requests",
    };
  }

  return {
    allowed: true,
    remaining: GLOBAL_MAX_PER_HOUR - count,
    resetAt: (Math.floor(now / WINDOW_SECONDS) + 1) * WINDOW_SECONDS,
  };
}

async function incrementGlobalCounter(
  kv: KVNamespace,
  now: number,
): Promise<void> {
  const hourKey = `global-rate:${Math.floor(now / WINDOW_SECONDS)}`;
  const stored = await kv.get(hourKey);
  const count = stored ? parseInt(stored, 10) : 0;
  await kv.put(hourKey, String(count + 1), {
    expirationTtl: WINDOW_SECONDS,
  });
}

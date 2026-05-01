import { validateContactForm } from "./validation";
import { verifyTurnstileToken } from "./turnstile";
import { checkRateLimit, recordSuccessfulSubmission } from "./rate-limiter";
import { sendEmail } from "./email";
import { dispatchWebhooks } from "./webhook";

export interface Env {
  TURNSTILE_SECRET_KEY: string;
  EMAIL_TO: string;
  EMAIL_FROM: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  RATE_LIMIT: KVNamespace;
  WEBHOOK_URLS?: string;
}

const ALLOWED_ORIGINS = [
  "https://www.jonaswestphal.de",
  "https://jonaswestphal.de",
];

const DEV_ORIGINS = ["http://localhost:4321"];

function getAllowedOrigin(request: Request): string | null {
  const origin = request.headers.get("Origin");
  if (!origin) return null;

  const allAllowed = [...ALLOWED_ORIGINS, ...DEV_ORIGINS];
  if (allAllowed.includes(origin)) {
    return origin;
  }
  return null;
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  origin?: string | null,
): Response {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (origin) {
    Object.assign(headers, corsHeaders(origin));
  }
  return new Response(JSON.stringify(body), { status, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = getAllowedOrigin(request);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      if (!origin) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }

    // Only accept POST /api/contact
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") {
      return jsonResponse(
        { success: false, error: "Not found" },
        404,
        origin,
      );
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { success: false, error: "Method not allowed" },
        405,
        origin,
      );
    }

    // Reject requests from disallowed origins
    if (!origin) {
      return new Response(null, { status: 403 });
    }

    try {
      // 1. Rate Limiting
      const clientIp =
        request.headers.get("CF-Connecting-IP") ||
        request.headers.get("X-Forwarded-For") ||
        "unknown";

      const rateLimit = await checkRateLimit(env.RATE_LIMIT, clientIp);
      if (!rateLimit.allowed) {
        return jsonResponse(
          { success: false, error: "Too many requests" },
          429,
          origin,
        );
      }

      // 2. Parse and validate form data
      const formData = await request.json<Record<string, string>>();
      const validation = validateContactForm(formData);

      // Honeypot triggered — silently accept to not reveal detection
      if (validation.honeypotTriggered) {
        return jsonResponse({ success: true }, 200, origin);
      }

      if (!validation.valid) {
        return jsonResponse(
          { success: false, errors: validation.errors },
          400,
          origin,
        );
      }

      // 3. Verify Turnstile token
      const turnstileValid = await verifyTurnstileToken(
        formData["cf-turnstile-response"],
        env.TURNSTILE_SECRET_KEY,
        clientIp,
      );
      if (!turnstileValid) {
        return jsonResponse(
          { success: false, error: "Bot verification failed" },
          403,
          origin,
        );
      }

      // 4. Send email notification via Amazon SES
      const emailSent = await sendEmail(
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        env.AWS_ACCESS_KEY_ID,
        env.AWS_SECRET_ACCESS_KEY,
        env.AWS_REGION,
        env.EMAIL_TO,
        env.EMAIL_FROM,
      );

      if (!emailSent) {
        return jsonResponse(
          { success: false, error: "Failed to send message" },
          500,
          origin,
        );
      }

      // 4b. Record successful submission for stricter rate limiting
      await recordSuccessfulSubmission(env.RATE_LIMIT, clientIp);

      // 5. Dispatch webhooks (fire-and-forget, non-blocking)
      if (env.WEBHOOK_URLS) {
        dispatchWebhooks(
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString(),
          },
          env.WEBHOOK_URLS,
        ).catch(() => {
          // Webhook failures are non-critical
        });
      }

      // 6. Success response
      return jsonResponse({ success: true }, 200, origin);
    } catch {
      return jsonResponse(
        { success: false, error: "Internal server error" },
        500,
        origin,
      );
    }
  },
};

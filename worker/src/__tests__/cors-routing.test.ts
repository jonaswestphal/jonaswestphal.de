import { describe, it, expect, vi, beforeEach } from "vitest";
import worker from "../index";
import type { Env } from "../index";

// ─── Mock KV Namespace ───────────────────────────────────────────────────────

function createMockKV(): KVNamespace {
  const store = new Map<string, string>();
  return {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    put: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    delete: vi.fn(async () => {}),
    list: vi.fn(async () => ({ keys: [], list_complete: true, cacheStatus: null })),
    getWithMetadata: vi.fn(async () => ({ value: null, metadata: null, cacheStatus: null })),
  } as unknown as KVNamespace;
}

// ─── Mock environment ────────────────────────────────────────────────────────

function createMockEnv(): Env {
  return {
    TURNSTILE_SECRET_KEY: "test-secret",
    EMAIL_TO: "test@example.com",
    EMAIL_FROM: "noreply@example.com",
    RESEND_API_KEY: "test-api-key",
    RATE_LIMIT: createMockKV(),
  };
}

// ─── CORS Tests ──────────────────────────────────────────────────────────────

describe("CORS handling", () => {
  let env: Env;

  beforeEach(() => {
    env = createMockEnv();
  });

  it("should return 204 for OPTIONS preflight from allowed origin", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "OPTIONS",
      headers: { Origin: "https://www.jonaswestphal.de" },
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://www.jonaswestphal.de",
    );
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });

  it("should return 204 for OPTIONS preflight from non-www origin", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "OPTIONS",
      headers: { Origin: "https://jonaswestphal.de" },
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://jonaswestphal.de",
    );
  });

  it("should return 204 for OPTIONS preflight from localhost dev origin", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "OPTIONS",
      headers: { Origin: "http://localhost:4321" },
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "http://localhost:4321",
    );
  });

  it("should return 403 for OPTIONS preflight from disallowed origin", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "OPTIONS",
      headers: { Origin: "https://evil.com" },
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(403);
  });

  it("should return 403 for POST from disallowed origin", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://evil.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test",
        email: "test@test.com",
        message: "Hello",
        "cf-turnstile-response": "token",
      }),
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(403);
  });

  it("should include CORS headers in successful responses", async () => {
    // Mock fetch for turnstile and email
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url instanceof URL ? url.toString() : url.url;
      if (urlStr.includes("turnstile")) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      if (urlStr.includes("resend")) {
        return new Response(JSON.stringify({ id: "123" }), { status: 200 });
      }
      return originalFetch(url);
    }) as typeof fetch;

    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://www.jonaswestphal.de",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Hello world",
        "cf-turnstile-response": "valid-token",
      }),
    });

    const response = await worker.fetch(request, env);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://www.jonaswestphal.de",
    );

    globalThis.fetch = originalFetch;
  });
});

// ─── Request Routing Tests ───────────────────────────────────────────────────

describe("Request routing", () => {
  let env: Env;

  beforeEach(() => {
    env = createMockEnv();
  });

  it("should return 404 for non /api/contact paths", async () => {
    const request = new Request("https://worker.example.com/api/other", {
      method: "POST",
      headers: { Origin: "https://www.jonaswestphal.de" },
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(404);
    const body = await response.json<{ success: boolean }>();
    expect(body.success).toBe(false);
  });

  it("should return 405 for GET requests to /api/contact", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "GET",
      headers: { Origin: "https://www.jonaswestphal.de" },
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(405);
  });

  it("should return 400 for POST with missing fields", async () => {
    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://www.jonaswestphal.de",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(400);
    const body = await response.json<{ success: boolean; errors: Record<string, string> }>();
    expect(body.success).toBe(false);
    expect(body.errors).toBeDefined();
    expect(body.errors.name).toBeDefined();
    expect(body.errors.email).toBeDefined();
    expect(body.errors.message).toBeDefined();
    expect(body.errors.turnstile).toBeDefined();
  });

  it("should return 403 when turnstile verification fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url instanceof URL ? url.toString() : url.url;
      if (urlStr.includes("turnstile")) {
        return new Response(JSON.stringify({ success: false }), { status: 200 });
      }
      return originalFetch(url);
    }) as typeof fetch;

    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://www.jonaswestphal.de",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test",
        email: "test@example.com",
        message: "Hello",
        "cf-turnstile-response": "invalid-token",
      }),
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(403);
    const body = await response.json<{ success: boolean; error: string }>();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Bot verification failed");

    globalThis.fetch = originalFetch;
  });

  it("should return 200 for valid complete submission", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url instanceof URL ? url.toString() : url.url;
      if (urlStr.includes("turnstile")) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      if (urlStr.includes("resend")) {
        return new Response(JSON.stringify({ id: "email-123" }), { status: 200 });
      }
      return originalFetch(url);
    }) as typeof fetch;

    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://www.jonaswestphal.de",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Max Mustermann",
        email: "max@example.com",
        message: "I need help with my infrastructure.",
        "cf-turnstile-response": "valid-token",
      }),
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(200);
    const body = await response.json<{ success: boolean }>();
    expect(body.success).toBe(true);

    globalThis.fetch = originalFetch;
  });

  it("should return 500 when email sending fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url instanceof URL ? url.toString() : url.url;
      if (urlStr.includes("turnstile")) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      if (urlStr.includes("resend")) {
        return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
      }
      return originalFetch(url);
    }) as typeof fetch;

    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://www.jonaswestphal.de",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test",
        email: "test@example.com",
        message: "Hello",
        "cf-turnstile-response": "valid-token",
      }),
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(500);
    const body = await response.json<{ success: boolean; error: string }>();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Failed to send message");

    globalThis.fetch = originalFetch;
  });
});

// ─── Rate Limiter Logic Tests ────────────────────────────────────────────────

describe("Rate limiter integration", () => {
  it("should return 429 when rate limit is exceeded", async () => {
    const store = new Map<string, string>();
    const mockKV = {
      get: vi.fn(async (key: string) => store.get(key) ?? null),
      put: vi.fn(async (key: string, value: string) => {
        store.set(key, value);
      }),
      delete: vi.fn(async () => {}),
      list: vi.fn(async () => ({ keys: [], list_complete: true, cacheStatus: null })),
      getWithMetadata: vi.fn(async () => ({ value: null, metadata: null, cacheStatus: null })),
    } as unknown as KVNamespace;

    // Pre-fill the rate limit store with 5 requests
    const now = Math.floor(Date.now() / 1000);
    store.set(
      "rate-limit:127.0.0.1",
      JSON.stringify({ count: 5, windowStart: now }),
    );

    const env: Env = {
      TURNSTILE_SECRET_KEY: "test-secret",
      EMAIL_TO: "test@example.com",
      EMAIL_FROM: "noreply@example.com",
      RESEND_API_KEY: "test-api-key",
      RATE_LIMIT: mockKV,
    };

    const request = new Request("https://worker.example.com/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://www.jonaswestphal.de",
        "Content-Type": "application/json",
        "CF-Connecting-IP": "127.0.0.1",
      },
      body: JSON.stringify({
        name: "Test",
        email: "test@example.com",
        message: "Hello",
        "cf-turnstile-response": "token",
      }),
    });

    const response = await worker.fetch(request, env);
    expect(response.status).toBe(429);
    const body = await response.json<{ success: boolean; error: string }>();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Too many requests");
  });
});

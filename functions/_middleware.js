/**
 * Cloudflare Pages Middleware: Basic Auth for dev.jonaswestphal.de
 *
 * Protects the dev preview with HTTP Basic Authentication.
 * Production domains (www.jonaswestphal.de, jonaswestphal.de) are never gated.
 *
 * Set these environment variables in Cloudflare Pages (ALL environments):
 *   - BASIC_AUTH_USER: username for dev access
 *   - BASIC_AUTH_PASS: password for dev access
 */

const OPEN_HOSTS = ["www.jonaswestphal.de", "jonaswestphal.de"];

export async function onRequest(context) {
  const { request, env, next } = context;
  const hostname = new URL(request.url).hostname;

  // Production domains: never require auth
  if (OPEN_HOSTS.includes(hostname)) {
    return next();
  }

  const user = env.BASIC_AUTH_USER;
  const pass = env.BASIC_AUTH_PASS;

  // No credentials configured: pass through (local dev, or not set up yet)
  if (!user || !pass) {
    return next();
  }

  // Check Authorization header
  const authorization = request.headers.get("Authorization") || "";
  const expected = "Basic " + btoa(user + ":" + pass);

  if (authorization === expected) {
    return next();
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Dev Preview", charset="UTF-8"',
    },
  });
}

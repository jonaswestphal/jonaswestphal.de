/**
 * Cloudflare Pages Middleware: Basic Auth for preview/dev deployments.
 *
 * Protects non-production deployments (e.g. dev.jonaswestphal.de)
 * with HTTP Basic Authentication. Production is never gated.
 *
 * Set these environment variables in Cloudflare Pages (Preview environment):
 *   - BASIC_AUTH_USER: username for dev access
 *   - BASIC_AUTH_PASS: password for dev access
 */

const PRODUCTION_HOSTS = ["www.jonaswestphal.de", "jonaswestphal.de"];

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Never gate production
  if (PRODUCTION_HOSTS.includes(url.hostname)) {
    return next();
  }

  // If no credentials configured, pass through (allows local dev)
  if (!env.BASIC_AUTH_USER || !env.BASIC_AUTH_PASS) {
    return next();
  }

  const authorization = request.headers.get("Authorization");

  if (authorization) {
    const [scheme, encoded] = authorization.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, ...passParts] = decoded.split(":");
      const pass = passParts.join(":"); // Handle passwords containing ":"

      if (user === env.BASIC_AUTH_USER && pass === env.BASIC_AUTH_PASS) {
        return next();
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Dev Preview", charset="UTF-8"',
    },
  });
}

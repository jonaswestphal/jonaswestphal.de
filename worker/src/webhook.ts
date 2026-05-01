export interface WebhookPayload {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface WebhookResult {
  url: string;
  success: boolean;
  error?: string;
}

/**
 * Modular webhook dispatcher for future Telegram/WhatsApp integration.
 * Currently implemented as a stub/placeholder that logs webhook URLs.
 *
 * When WEBHOOK_URLS environment variable is set (comma-separated URLs),
 * this function will dispatch the contact form data to each URL.
 *
 * @param payload - Contact form data to dispatch
 * @param webhookUrls - Optional comma-separated webhook URLs
 * @returns Array of results for each webhook dispatch attempt
 */
export async function dispatchWebhooks(
  payload: WebhookPayload,
  webhookUrls?: string,
): Promise<WebhookResult[]> {
  if (!webhookUrls || webhookUrls.trim().length === 0) {
    return [];
  }

  const urls = webhookUrls
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);

  const results: WebhookResult[] = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      results.push({
        url,
        success: response.ok,
        error: response.ok ? undefined : `HTTP ${response.status}`,
      });
    } catch (err) {
      results.push({
        url,
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return results;
}

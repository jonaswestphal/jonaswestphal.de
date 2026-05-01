export interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends an email notification to the site owner via Amazon SES v2 API.
 * Uses AWS Signature V4 for authentication (no SDK needed).
 *
 * @param payload - Contact form data (name, email, message)
 * @param accessKeyId - AWS Access Key ID
 * @param secretAccessKey - AWS Secret Access Key
 * @param region - AWS region (e.g. "eu-central-1")
 * @param emailTo - Recipient email address (site owner)
 * @param emailFrom - Sender email address (verified in SES)
 * @returns Whether the email was sent successfully
 */
export async function sendEmail(
  payload: EmailPayload,
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
  emailTo: string,
  emailFrom: string,
): Promise<boolean> {
  const host = `email.${region}.amazonaws.com`;
  const url = `https://${host}/v2/email/outbound-emails`;

  const body = JSON.stringify({
    FromEmailAddress: emailFrom,
    Destination: {
      ToAddresses: [emailTo],
    },
    ReplyToAddresses: [payload.email],
    Content: {
      Simple: {
        Subject: {
          Data: `Neue Kontaktanfrage von ${payload.name}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: formatEmailHtml(payload),
            Charset: "UTF-8",
          },
          Text: {
            Data: formatEmailText(payload),
            Charset: "UTF-8",
          },
        },
      },
    },
  });

  try {
    const now = new Date();
    const headers = await signAwsRequest({
      method: "POST",
      url,
      host,
      region,
      service: "ses",
      accessKeyId,
      secretAccessKey,
      body,
      datetime: now,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body,
    });

    return response.ok;
  } catch {
    return false;
  }
}

// ─── AWS Signature V4 ────────────────────────────────────────────────────────

interface SignRequest {
  method: string;
  url: string;
  host: string;
  region: string;
  service: string;
  accessKeyId: string;
  secretAccessKey: string;
  body: string;
  datetime: Date;
}

async function signAwsRequest(
  req: SignRequest,
): Promise<Record<string, string>> {
  const { method, url, host, region, service, accessKeyId, secretAccessKey, body, datetime } = req;

  const amzDate = datetime.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const dateStamp = amzDate.slice(0, 8);

  const parsedUrl = new URL(url);
  const canonicalUri = parsedUrl.pathname;
  const canonicalQuerystring = parsedUrl.search.slice(1);

  const payloadHash = await sha256Hex(body);

  const canonicalHeaders =
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;

  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuerystring,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, service);
  const signature = await hmacHex(signingKey, stringToSign);

  const authorizationHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, ` +
    `Signature=${signature}`;

  return {
    "x-amz-date": amzDate,
    "x-amz-content-sha256": payloadHash,
    Authorization: authorizationHeader,
  };
}

async function sha256Hex(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return arrayBufferToHex(hash);
}

async function hmac(key: ArrayBuffer | Uint8Array, message: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message));
}

async function hmacHex(key: ArrayBuffer, message: string): Promise<string> {
  const result = await hmac(key, message);
  return arrayBufferToHex(result);
}

async function getSignatureKey(
  secretKey: string,
  dateStamp: string,
  region: string,
  service: string,
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const kDate = await hmac(encoder.encode(`AWS4${secretKey}`), dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Email Formatting ────────────────────────────────────────────────────────

function formatEmailHtml(payload: EmailPayload): string {
  return `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Nachricht:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
  `.trim();
}

function formatEmailText(payload: EmailPayload): string {
  return [
    "Neue Kontaktanfrage",
    "",
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
    "",
    "Nachricht:",
    payload.message,
  ].join("\n");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

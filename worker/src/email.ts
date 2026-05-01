export interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends an email notification to the site owner via the Resend API.
 * The email contains the sender's name, email, and message from the contact form.
 *
 * @param payload - Contact form data (name, email, message)
 * @param apiKey - Resend API key
 * @param emailTo - Recipient email address (site owner)
 * @param emailFrom - Sender email address (noreply@domain)
 * @returns Whether the email was sent successfully
 */
export async function sendEmail(
  payload: EmailPayload,
  apiKey: string,
  emailTo: string,
  emailFrom: string,
): Promise<boolean> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        subject: `Neue Kontaktanfrage von ${payload.name}`,
        reply_to: payload.email,
        html: formatEmailHtml(payload),
        text: formatEmailText(payload),
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website?: string; // Honeypot field — should always be empty
  "cf-turnstile-response": string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  honeypotTriggered?: boolean;
}

/**
 * Validates contact form data.
 * Checks honeypot, required fields (name, email, message) and Turnstile token presence.
 * Returns validation result with field-specific error messages.
 */
export function validateContactForm(
  data: Partial<ContactFormData>,
): ValidationResult {
  // Honeypot check — if the hidden "website" field has a value, it's a bot
  if (data.website && data.website.trim().length > 0) {
    return {
      valid: false,
      errors: {},
      honeypotTriggered: true,
    };
  }

  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = "Message is required";
  }

  if (!data["cf-turnstile-response"]) {
    errors.turnstile = "Bot verification is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates an email address format.
 * Checks for: local part, @ symbol, domain with at least one dot.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

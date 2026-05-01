import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  validateContactForm,
  isValidEmail,
  type ContactFormData,
} from "../validation";

/**
 * Property 2: Formular-Validierung erkennt fehlende Pflichtfelder
 *
 * For every arbitrary combination of missing or empty required fields
 * (name, email, message), validateContactForm must return valid: false
 * and include a specific error entry for each missing field.
 *
 * **Validates: Requirements 9.10**
 */
describe("Feature: corporate-website, Property 2: Form validation detects missing fields", () => {
  it("should detect all missing/empty required fields", () => {
    // Arbitrary for "empty or missing" text values (name, message)
    const emptyOrMissingText = fc.oneof(
      fc.constant(undefined),
      fc.constant(""),
      fc.constant("   "),
    );

    // Arbitrary for "empty or missing" token values (turnstile — only falsy counts)
    const emptyOrMissingToken = fc.oneof(
      fc.constant(undefined),
      fc.constant(""),
    );

    // Arbitrary for valid non-empty values
    const validName = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
    const validEmail = fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z0-9]{1,20}$/),
        fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/),
        fc.stringMatching(/^[a-zA-Z]{2,6}$/),
      )
      .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);
    const validMessage = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);
    const validTurnstile = fc.string({ minLength: 1 });

    // Generate combinations where at least one required field is empty/missing
    fc.assert(
      fc.property(
        fc.record({
          nameEmpty: fc.boolean(),
          emailEmpty: fc.boolean(),
          messageEmpty: fc.boolean(),
          turnstileEmpty: fc.boolean(),
        }).filter(
          (flags) =>
            flags.nameEmpty || flags.emailEmpty || flags.messageEmpty || flags.turnstileEmpty,
        ),
        validName,
        validEmail,
        validMessage,
        validTurnstile,
        emptyOrMissingText,
        emptyOrMissingToken,
        (flags, name, email, message, turnstile, emptyText, emptyToken) => {
          const data: Partial<ContactFormData> = {
            name: flags.nameEmpty ? (emptyText as string) : name,
            email: flags.emailEmpty ? (emptyText as string) : email,
            message: flags.messageEmpty ? (emptyText as string) : message,
            "cf-turnstile-response": flags.turnstileEmpty
              ? (emptyToken as string)
              : turnstile,
          };

          const result = validateContactForm(data);

          // Must be invalid when any required field is missing
          expect(result.valid).toBe(false);

          // Each missing field must have a corresponding error
          if (flags.nameEmpty) {
            expect(result.errors).toHaveProperty("name");
          }
          if (flags.emailEmpty) {
            expect(result.errors).toHaveProperty("email");
          }
          if (flags.messageEmpty) {
            expect(result.errors).toHaveProperty("message");
          }
          if (flags.turnstileEmpty) {
            expect(result.errors).toHaveProperty("turnstile");
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("should return valid: true when all fields are provided and valid", () => {
    const validEmail = fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z0-9]{1,20}$/),
        fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/),
        fc.stringMatching(/^[a-zA-Z]{2,6}$/),
      )
      .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        validEmail,
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1 }),
        (name, email, message, turnstile) => {
          const result = validateContactForm({
            name,
            email,
            message,
            "cf-turnstile-response": turnstile,
          });

          expect(result.valid).toBe(true);
          expect(Object.keys(result.errors)).toHaveLength(0);
        },
      ),
      { numRuns: 100 },
    );
  });
});


/**
 * Property 3: E-Mail-Validierung
 *
 * For every string that does not have a valid email format (no @, missing domain,
 * whitespace), isValidEmail must return false.
 * For every string in valid email format, isValidEmail must return true.
 *
 * **Validates: Requirements 9.10**
 */
describe("Feature: corporate-website, Property 3: Email validation", () => {
  it("should reject strings without valid email format", () => {
    // Generate strings that are NOT valid emails
    const invalidEmails = fc.oneof(
      // No @ symbol at all
      fc.stringMatching(/^[^@\s]{1,30}$/),
      // Only @ symbol
      fc.constant("@"),
      // Missing domain part (ends with @)
      fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/).map((s) => `${s}@`),
      // Missing local part (starts with @)
      fc.stringMatching(/^[a-zA-Z0-9]{1,10}\.[a-zA-Z]{2,6}$/).map((s) => `@${s}`),
      // Contains whitespace
      fc
        .tuple(
          fc.stringMatching(/^[a-zA-Z0-9]{1,5}$/),
          fc.stringMatching(/^[a-zA-Z0-9]{1,10}\.[a-zA-Z]{2,6}$/),
        )
        .map(([local, domain]) => `${local} @${domain}`),
      // Domain without dot
      fc
        .tuple(
          fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/),
          fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/),
        )
        .map(([local, domain]) => `${local}@${domain}`),
      // Empty string
      fc.constant(""),
    );

    fc.assert(
      fc.property(invalidEmails, (email) => {
        expect(isValidEmail(email)).toBe(false);
      }),
      { numRuns: 100 },
    );
  });

  it("should accept strings with valid email format", () => {
    // Generate valid email addresses: local@domain.tld
    const validEmails = fc
      .tuple(
        fc.stringMatching(/^[a-zA-Z0-9._%+-]{1,20}$/),
        fc.stringMatching(/^[a-zA-Z0-9-]{1,15}$/),
        fc.stringMatching(/^[a-zA-Z]{2,6}$/),
      )
      .filter(([local]) => !local.includes(" "))
      .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

    fc.assert(
      fc.property(validEmails, (email) => {
        expect(isValidEmail(email)).toBe(true);
      }),
      { numRuns: 100 },
    );
  });
});

import { describe, it, expect } from "vitest";
import {
  validateContactForm,
  isValidEmail,
} from "../validation";

// ─── validateContactForm unit tests ──────────────────────────────────────────

describe("validateContactForm", () => {
  it("should return valid when all fields are provided", () => {
    const result = validateContactForm({
      name: "Max Mustermann",
      email: "max@example.com",
      message: "Hello, I need help with my IT infrastructure.",
      "cf-turnstile-response": "valid-token-123",
    });
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("should return error when name is missing", () => {
    const result = validateContactForm({
      email: "max@example.com",
      message: "Hello",
      "cf-turnstile-response": "token",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("should return error when name is empty string", () => {
    const result = validateContactForm({
      name: "",
      email: "max@example.com",
      message: "Hello",
      "cf-turnstile-response": "token",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("should return error when name is whitespace only", () => {
    const result = validateContactForm({
      name: "   ",
      email: "max@example.com",
      message: "Hello",
      "cf-turnstile-response": "token",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("should return error when email is missing", () => {
    const result = validateContactForm({
      name: "Max",
      message: "Hello",
      "cf-turnstile-response": "token",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("should return error when email is invalid", () => {
    const result = validateContactForm({
      name: "Max",
      email: "not-an-email",
      message: "Hello",
      "cf-turnstile-response": "token",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("should return error when message is missing", () => {
    const result = validateContactForm({
      name: "Max",
      email: "max@example.com",
      "cf-turnstile-response": "token",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it("should return error when turnstile token is missing", () => {
    const result = validateContactForm({
      name: "Max",
      email: "max@example.com",
      message: "Hello",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.turnstile).toBeDefined();
  });

  it("should return multiple errors when multiple fields are missing", () => {
    const result = validateContactForm({});
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
    expect(result.errors.turnstile).toBeDefined();
  });
});

// ─── isValidEmail unit tests ─────────────────────────────────────────────────

describe("isValidEmail", () => {
  it("should accept standard email format", () => {
    expect(isValidEmail("user@domain.com")).toBe(true);
  });

  it("should accept email with subdomain", () => {
    expect(isValidEmail("user@mail.domain.com")).toBe(true);
  });

  it("should accept email with dots in local part", () => {
    expect(isValidEmail("first.last@domain.com")).toBe(true);
  });

  it("should accept email with plus in local part", () => {
    expect(isValidEmail("user+tag@domain.com")).toBe(true);
  });

  it("should reject empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("should reject string without @", () => {
    expect(isValidEmail("userdomain.com")).toBe(false);
  });

  it("should reject string with only @", () => {
    expect(isValidEmail("@")).toBe(false);
  });

  it("should reject email without domain dot", () => {
    expect(isValidEmail("user@domain")).toBe(false);
  });

  it("should reject email with space", () => {
    expect(isValidEmail("user @domain.com")).toBe(false);
  });

  it("should reject email with space in domain", () => {
    expect(isValidEmail("user@do main.com")).toBe(false);
  });

  it("should reject email starting with @", () => {
    expect(isValidEmail("@domain.com")).toBe(false);
  });

  it("should reject email ending with @", () => {
    expect(isValidEmail("user@")).toBe(false);
  });
});

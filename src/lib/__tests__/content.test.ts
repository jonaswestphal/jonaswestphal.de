import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { de, en } from "../content";
import { locales } from "../i18n";
import type { Locale, LocaleContent } from "../types";

/**
 * Feature: corporate-website, Property 1: Locale content completeness
 *
 * **Validates: Requirements 4.5, 5.7, 6.13, 7.4, 8.5, 9.11, 12.2, 12.4, 15.7, 17.7**
 *
 * For each supported locale (de, en) and for every text field in the
 * LocaleContent object, the value must be a non-empty string.
 * No content field may be undefined, null, or an empty/whitespace-only string.
 */

const localeContentMap: Record<Locale, LocaleContent> = { de, en };

/**
 * Recursively collects all string-valued leaf paths from an object.
 * Returns an array of { path: string, value: string } entries.
 */
function collectStringFields(
  obj: unknown,
  prefix: string = "",
): { path: string; value: string }[] {
  const results: { path: string; value: string }[] = [];

  if (obj === null || obj === undefined) {
    return results;
  }

  if (typeof obj === "string") {
    results.push({ path: prefix, value: obj });
    return results;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      results.push(...collectStringFields(obj[i], `${prefix}[${i}]`));
    }
    return results;
  }

  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj)) {
      results.push(
        ...collectStringFields(value, prefix ? `${prefix}.${key}` : key),
      );
    }
  }

  return results;
}

describe("Property 1: Vollständigkeit der Locale-Inhalte", () => {
  const localeArb = fc.constantFrom(...locales) as fc.Arbitrary<Locale>;

  it("every string field in LocaleContent is a non-empty, non-whitespace string for each locale", () => {
    fc.assert(
      fc.property(localeArb, (locale) => {
        const content = localeContentMap[locale];
        const stringFields = collectStringFields(content);

        // There must be string fields (sanity check)
        expect(stringFields.length).toBeGreaterThan(0);

        for (const { path, value } of stringFields) {
          // Value must not be empty
          expect(
            value.length,
            `[${locale}] Field "${path}" must not be empty`,
          ).toBeGreaterThan(0);

          // Value must not be whitespace-only
          expect(
            value.trim().length,
            `[${locale}] Field "${path}" must not be whitespace-only`,
          ).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Feature: corporate-website, Property 5: Timeline entry completeness
 *
 * **Validates: Requirements 6.4, 6.5, 6.13**
 *
 * For each timeline entry in each locale, the fields `period`, `role`,
 * `company`, and `description` must be non-empty strings.
 * Both locales must have the same number of timeline entries.
 */
describe("Property 5: Strukturelle Vollständigkeit der Timeline-Einträge", () => {
  const localeArb = fc.constantFrom(...locales) as fc.Arbitrary<Locale>;

  it("both locales have the same number of timeline entries", () => {
    expect(de.timeline.entries.length).toBe(en.timeline.entries.length);
    expect(de.timeline.entries.length).toBeGreaterThan(0);
  });

  it("every timeline entry has non-empty period, role, company, and description for each locale", () => {
    const entryIndexArb = fc.integer({
      min: 0,
      max: de.timeline.entries.length - 1,
    });

    fc.assert(
      fc.property(localeArb, entryIndexArb, (locale, index) => {
        const content = localeContentMap[locale];
        const entry = content.timeline.entries[index];

        // period must be a non-empty string
        expect(
          entry.period.trim().length,
          `[${locale}] Entry[${index}].period must not be empty`,
        ).toBeGreaterThan(0);

        // role must be a non-empty string
        expect(
          entry.role.trim().length,
          `[${locale}] Entry[${index}].role must not be empty`,
        ).toBeGreaterThan(0);

        // company must be a non-empty string
        expect(
          entry.company.trim().length,
          `[${locale}] Entry[${index}].company must not be empty`,
        ).toBeGreaterThan(0);

        // description must be a non-empty string
        expect(
          entry.description.trim().length,
          `[${locale}] Entry[${index}].description must not be empty`,
        ).toBeGreaterThan(0);
      }),
      { numRuns: 100 },
    );
  });
});

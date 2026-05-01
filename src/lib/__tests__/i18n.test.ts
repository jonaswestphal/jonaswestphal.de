import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { getLocalizedPath, getLocaleFromUrl, locales } from "../i18n";
import type { Locale } from "../types";

/**
 * Feature: corporate-website, Property 4: i18n path roundtrip
 *
 * **Validates: Requirements 15.5, 15.8**
 *
 * For every valid page path and every target locale, calling
 * getLocalizedPath(path, targetLocale) and then getLocaleFromUrl()
 * on the result must return the original target locale.
 */
describe("Property 4: i18n-Pfad-Roundtrip", () => {
  // Generator for valid page paths that exist on the site
  const pagePaths = fc.oneof(
    fc.constant("/"),
    fc.constant("/impressum"),
    fc.constant("/datenschutz"),
    fc.constant("/danke"),
    // Also generate random slug-style paths
    fc
      .stringMatching(/^[a-z][a-z0-9-]{0,20}$/)
      .map((slug) => `/${slug}`)
  );

  // Generator for locales
  const localeArb = fc.constantFrom(...locales) as fc.Arbitrary<Locale>;

  it("getLocalizedPath → getLocaleFromUrl roundtrip preserves the target locale", () => {
    fc.assert(
      fc.property(pagePaths, localeArb, (path, targetLocale) => {
        // Step 1: Localize the path for the target locale
        const localizedPath = getLocalizedPath(path, targetLocale);

        // Step 2: Construct a URL from the localized path
        const url = new URL(localizedPath, "https://www.jonaswestphal.de");

        // Step 3: Extract the locale from the URL
        const detectedLocale = getLocaleFromUrl(url);

        // Assert: the detected locale must match the target locale
        expect(detectedLocale).toBe(targetLocale);
      }),
      { numRuns: 100 }
    );
  });
});

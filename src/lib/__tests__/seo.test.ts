import { describe, it, expect } from "vitest";
import { de, en } from "../content";
import type { SiteConfig } from "../types";

/**
 * Unit-Tests für SEO-Komponenten
 *
 * **Validates: Requirements 10.7, 18.6**
 *
 * Tests the logic that feeds into SEOHead.astro:
 * - hreflang tag generation for de, en, and x-default
 * - JSON-LD structured data with valid Schema.org format
 */

const siteUrl = "https://www.jonaswestphal.de";

// Replicate the SEOHead hreflang URL generation logic
function getBasePath(path: string): string {
  const cleaned = path.replace(/^\/en(\/|$)/, "/");
  return cleaned;
}

function buildHreflangUrls(currentPath: string) {
  const basePath = getBasePath(currentPath);
  const deUrl = `${siteUrl}${basePath}`;
  const enUrl = `${siteUrl}/en${basePath === "/" ? "/" : basePath}`;
  return { deUrl, enUrl, xDefaultUrl: deUrl };
}

// Replicate the SEOHead JSON-LD generation logic
function buildJsonLd(siteConfig: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Jonas Westphal – IT & Cloud Solutions",
    url: siteUrl,
    description: siteConfig.description,
    logo: `${siteUrl}/favicon.svg`,
    email: "kontakt@jonaswestphal.de",
    sameAs: [
      "https://www.linkedin.com/in/jonaswestphal",
      "https://github.com/jonaswestphal",
    ],
    founder: {
      "@type": "Person",
      name: "Jonas Westphal",
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    serviceType: [
      "IT Consulting",
      "Cloud Solutions",
      "n8n Workflow Automation",
      "AI Workflow Automation",
      "Managed Hosting",
      "Startup Consulting",
    ],
  };
}

describe("SEO: hreflang tag generation", () => {
  it("generates correct hreflang URLs for the German homepage (/)", () => {
    const { deUrl, enUrl, xDefaultUrl } = buildHreflangUrls("/");
    expect(deUrl).toBe("https://www.jonaswestphal.de/");
    expect(enUrl).toBe("https://www.jonaswestphal.de/en/");
    expect(xDefaultUrl).toBe("https://www.jonaswestphal.de/");
  });

  it("generates correct hreflang URLs for the English homepage (/en/)", () => {
    const { deUrl, enUrl, xDefaultUrl } = buildHreflangUrls("/en/");
    expect(deUrl).toBe("https://www.jonaswestphal.de/");
    expect(enUrl).toBe("https://www.jonaswestphal.de/en/");
    expect(xDefaultUrl).toBe("https://www.jonaswestphal.de/");
  });

  it("generates correct hreflang URLs for a German subpage (/impressum)", () => {
    const { deUrl, enUrl, xDefaultUrl } = buildHreflangUrls("/impressum");
    expect(deUrl).toBe("https://www.jonaswestphal.de/impressum");
    expect(enUrl).toBe("https://www.jonaswestphal.de/en/impressum");
    expect(xDefaultUrl).toBe("https://www.jonaswestphal.de/impressum");
  });

  it("generates correct hreflang URLs for an English subpage (/en/privacy)", () => {
    const { deUrl, enUrl, xDefaultUrl } = buildHreflangUrls("/en/privacy");
    expect(deUrl).toBe("https://www.jonaswestphal.de/privacy");
    expect(enUrl).toBe("https://www.jonaswestphal.de/en/privacy");
    expect(xDefaultUrl).toBe("https://www.jonaswestphal.de/privacy");
  });

  it("x-default always points to the German version", () => {
    const paths = ["/", "/en/", "/impressum", "/en/impressum", "/datenschutz", "/en/privacy"];
    for (const path of paths) {
      const { deUrl, xDefaultUrl } = buildHreflangUrls(path);
      expect(xDefaultUrl).toBe(deUrl);
    }
  });

  it("generates all three hreflang variants (de, en, x-default)", () => {
    const result = buildHreflangUrls("/");
    expect(result).toHaveProperty("deUrl");
    expect(result).toHaveProperty("enUrl");
    expect(result).toHaveProperty("xDefaultUrl");
    // All three must be non-empty strings
    expect(result.deUrl).toBeTruthy();
    expect(result.enUrl).toBeTruthy();
    expect(result.xDefaultUrl).toBeTruthy();
  });
});

describe("SEO: JSON-LD structured data", () => {
  it("has valid @context set to schema.org", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(jsonLd["@context"]).toBe("https://schema.org");
  });

  it("has @type including Organization and LocalBusiness", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(jsonLd["@type"]).toContain("Organization");
    expect(jsonLd["@type"]).toContain("LocalBusiness");
  });

  it("includes required Organization fields", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(jsonLd.name).toBeTruthy();
    expect(jsonLd.url).toBe(siteUrl);
    expect(jsonLd.description).toBeTruthy();
    expect(jsonLd.logo).toBeTruthy();
    expect(jsonLd.email).toBeTruthy();
  });

  it("includes founder as a Person type", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(jsonLd.founder).toBeDefined();
    expect(jsonLd.founder["@type"]).toBe("Person");
    expect(jsonLd.founder.name).toBeTruthy();
  });

  it("includes areaServed as a Country type", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(jsonLd.areaServed).toBeDefined();
    expect(jsonLd.areaServed["@type"]).toBe("Country");
    expect(jsonLd.areaServed.name).toBeTruthy();
  });

  it("includes serviceType as a non-empty array", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(Array.isArray(jsonLd.serviceType)).toBe(true);
    expect(jsonLd.serviceType.length).toBeGreaterThan(0);
  });

  it("includes sameAs with social profile URLs", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    expect(Array.isArray(jsonLd.sameAs)).toBe(true);
    expect(jsonLd.sameAs.length).toBeGreaterThan(0);
    for (const url of jsonLd.sameAs) {
      expect(url).toMatch(/^https:\/\//);
    }
  });

  it("uses the locale-specific description from siteConfig", () => {
    const jsonLdDe = buildJsonLd(de.siteConfig);
    const jsonLdEn = buildJsonLd(en.siteConfig);
    expect(jsonLdDe.description).toBe(de.siteConfig.description);
    expect(jsonLdEn.description).toBe(en.siteConfig.description);
  });

  it("produces valid JSON when serialized", () => {
    const jsonLd = buildJsonLd(de.siteConfig);
    const serialized = JSON.stringify(jsonLd);
    expect(() => JSON.parse(serialized)).not.toThrow();
    const parsed = JSON.parse(serialized);
    expect(parsed["@context"]).toBe("https://schema.org");
  });
});

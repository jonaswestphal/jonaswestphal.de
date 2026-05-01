# Implementierungsplan: Corporate Website

## Übersicht

Dieser Plan beschreibt die schrittweise Implementierung der Unternehmenswebsite www.jonaswestphal.de auf Basis des astro-validation-landing Templates. Die Implementierung erfolgt in TypeScript mit Astro 6, Tailwind CSS v4 und Starwind UI. Hosting über Cloudflare Pages, Kontaktformular über Cloudflare Workers.

> **Hinweis:** Aufgaben mit `*` sind optional und können für ein schnelleres MVP übersprungen werden. Aufgaben mit 🔧 **MANUELL** erfordern manuelle Aktionen des Nutzers (Account-Erstellung, API-Keys, DNS-Konfiguration etc.).

## Tasks

- [x] 1. Projektinitialisierung und Template-Setup
  - [x] 1.1 Template klonen und Abhängigkeiten installieren
    - astro-validation-landing Template als Basis klonen
    - `pnpm install` ausführen, sicherstellen dass Astro 6, Tailwind CSS v4 und Starwind UI korrekt installiert sind
    - TypeScript strict mode in `tsconfig.json` verifizieren
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Astro-Konfiguration für i18n und Site-URL einrichten
    - `astro.config.mjs` anpassen: `site: "https://www.jonaswestphal.de"`, i18n mit `defaultLocale: "de"`, `locales: ["de", "en"]`, `prefixDefaultLocale: false`, `redirectToDefaultLocale: false`
    - Tailwind CSS v4 Vite-Plugin konfigurieren
    - _Requirements: 1.5, 1.6, 15.1, 15.2_

  - [x] 1.3 Verzeichnisstruktur gemäß Design anlegen
    - Verzeichnisse erstellen: `src/components/starwind/`, `src/lib/`, `src/pages/en/`, `worker/src/`
    - Leere Platzhalter-Dateien für alle geplanten Komponenten anlegen
    - _Requirements: 1.1_

- [x] 2. TypeScript-Typen und zentrale Inhaltsverwaltung
  - [x] 2.1 TypeScript-Typdefinitionen erstellen (`src/lib/types.ts`)
    - Alle Typen aus dem Design übernehmen: `Locale`, `SiteConfig`, `HeaderContent`, `HeroContent`, `ServicesContent`, `ProfileContent`, `TimelineEntry`, `TimelineContent`, `HowItWorksContent`, `FAQContent`, `ContactContent`, `FooterContent`, `CookieConsentContent`, `ThankYouContent`, `ErrorPageContent`, `LocaleContent`
    - _Requirements: 12.1, 12.2_

  - [x] 2.2 i18n-Hilfsfunktionen implementieren (`src/lib/i18n.ts`)
    - `getLocaleFromUrl()`, `getLocalizedPath()` gemäß Design implementieren
    - `defaultLocale` und `locales` Konstanten exportieren
    - _Requirements: 15.2, 15.5, 15.8_

  - [x] 2.3 Property-Test: i18n-Pfad-Roundtrip
    - **Property 4: i18n-Pfad-Roundtrip**
    - Generiere zufällige Pfade und Locales, prüfe dass `getLocalizedPath` → `getLocaleFromUrl` den Roundtrip besteht
    - **Validates: Requirements 15.5, 15.8**

  - [x] 2.4 Content-Konfiguration erstellen (`src/lib/content.ts`)
    - Deutsche (`de`) und englische (`en`) `LocaleContent`-Objekte mit vollständigen Texten für alle Sektionen erstellen
    - `getContent(locale)` Funktion exportieren
    - Alle Sektionen befüllen: siteConfig, header, hero, services, profile, timeline, howItWorks, faq, contact, footer, cookieConsent, thankYou, errors
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 4.5, 5.7, 6.13, 7.4, 8.5, 9.11, 9.12, 15.7, 17.7, 19.6_

  - [x] 2.5 Property-Test: Vollständigkeit der Locale-Inhalte
    - **Property 1: Vollständigkeit der Locale-Inhalte**
    - Für jede Locale alle Textfelder im `LocaleContent`-Objekt traversieren, prüfe auf nicht-leere Strings
    - **Validates: Requirements 4.5, 5.7, 6.13, 7.4, 8.5, 9.11, 12.2, 12.4, 15.7, 17.7**

  - [x] 2.6 Property-Test: Strukturelle Vollständigkeit der Timeline-Einträge
    - **Property 5: Strukturelle Vollständigkeit der Timeline-Einträge**
    - Traversiere alle Timeline-Einträge in beiden Locales, prüfe strukturelle Vollständigkeit und gleiche Anzahl
    - **Validates: Requirements 6.4, 6.5, 6.13**

- [x] 3. Checkpoint – Typen, Content und i18n
  - Sicherstellen, dass alle Tests bestehen und `pnpm build` fehlerfrei durchläuft. Bei Fragen den Nutzer ansprechen.

- [x] 4. Corporate Identity und Design-Tokens
  - [x] 4.1 Design-Tokens in `src/styles/starwind.css` konfigurieren
    - Farbschema für IT & Cloud Solutions Marke (professionelles Blau + Akzent-Teal) gemäß Design
    - Light- und Dark-Mode-Tokens (:root und .dark)
    - Border-Radius-Skala (--radius, --radius-sm, --radius-md, --radius-lg, --radius-xl)
    - _Requirements: 2.1, 2.2, 2.8_

  - [x] 4.2 Logo und Branding-Assets erstellen
    - `src/components/Logo.astro` mit Markenlogo "Jonas Westphal – IT & Cloud Solutions" erstellen
    - `public/favicon.ico` mit markenkonformem Favicon ersetzen
    - `public/og-image.png` als Open-Graph-Bild erstellen
    - _Requirements: 2.5, 2.6, 2.7_

- [x] 5. Layout und Basis-Komponenten
  - [x] 5.1 Starwind UI Primitives einrichten
    - Starwind UI Komponenten per CLI ins Projekt kopieren: Accordion, Button, Card, Input, Textarea, Label, Badge
    - Komponenten an Corporate Identity anpassen
    - `starwind.config.json` konfigurieren
    - _Requirements: 1.1_

  - [x] 5.2 SEOHead-Komponente implementieren (`src/components/SEOHead.astro`)
    - `<title>`, `<meta name="description">`, Open Graph Tags, Twitter Cards
    - `<link rel="alternate" hreflang="de|en|x-default">` Tags generieren
    - `<link rel="canonical">` auf sprachspezifische URL setzen
    - JSON-LD Structured Data (Organization + LocalBusiness Schema) injizieren
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.7, 18.6_

  - [x] 5.3 Layout.astro implementieren (`src/layouts/Layout.astro`)
    - `locale` als Prop empfangen, `<html lang={locale}>` setzen
    - SEOHead, Header, Slot, Footer, CookieConsent einbinden
    - Google Analytics Script nur bei Cookie-Consent injizieren
    - _Requirements: 10.5, 14.1, 17.4_

  - [x] 5.4 Header-Komponente implementieren (`src/components/Header.astro`)
    - Responsive Navigation mit Mobile-Hamburger-Menü
    - Smooth-Scroll-Links zu Sektions-Anchors
    - LanguageSwitcher, ThemeToggle und CTA-Button einbinden
    - _Requirements: 3.1, 3.2, 3.4, 3.5, 14.4_

  - [x] 5.5 LanguageSwitcher implementieren (`src/components/LanguageSwitcher.astro`)
    - `Astro.currentLocale` und `getRelativeLocaleUrl()` nutzen
    - Link zur äquivalenten Seite in der anderen Sprache generieren
    - _Requirements: 15.4, 15.5_

  - [x] 5.6 ThemeToggle implementieren (`src/components/ThemeToggle.astro`)
    - Dark/Light-Mode-Umschaltung mit localStorage-Persistenz
    - System-Präferenz als Standard respektieren
    - _Requirements: 2.3_

  - [x] 5.7 Footer-Komponente implementieren (`src/components/Footer.astro`)
    - Rechtliche Links (Impressum, Datenschutz), Kontaktdaten, Social-Media-Links
    - Cookie-Einstellungen-Link zum erneuten Anzeigen des Consent-Banners
    - _Requirements: 3.6, 13.3, 17.6_

- [x] 6. Checkpoint – Layout und Navigation
  - Sicherstellen, dass `pnpm build` fehlerfrei durchläuft, Navigation und Sprachwechsler funktionieren. Bei Fragen den Nutzer ansprechen.

- [x] 7. Sektions-Komponenten der Startseite
  - [x] 7.1 Hero-Sektion implementieren (`src/components/Hero.astro`)
    - Headline, Subheadline, primärer CTA (→ Kontakt), sekundärer CTA (→ Dienstleistungen)
    - Inhalte aus `content.ts` laden
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 7.2 Services-Sektion implementieren (`src/components/Services.astro`, `src/components/ServiceCard.astro`)
    - Vier Service-Cards: n8n Workflows, AI Workflows, Startup-Beratung, Managed Hosting
    - Jede Card mit Icon, Titel und Beschreibung
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [x] 7.3 Über-mich-Sektion implementieren (`src/components/AboutMe.astro`, `src/components/SkillTags.astro`)
    - Einleitungstext, Erfahrungszusammenfassung
    - Technischer Stack als SkillTags (gruppiert nach Kategorien)
    - Soft Skills und Kompetenz-Highlights
    - _Requirements: 6.1, 6.2, 6.3, 6.9, 6.10, 6.11_

  - [x] 7.4 Timeline implementieren (`src/components/Timeline.astro`, `src/components/TimelineEntry.astro`)
    - Vertikaler Zeitstrahl mit CSS-basierter Linie und Punkten
    - Responsive: Desktop links/rechts alternierend, Mobile einspaltig
    - Karriere-Stationen mit Zeitraum, Rolle, Unternehmen, Beschreibung
    - Stationen für Baramundi-Expertise, Windows-Migrationen, Proxmox-Plattformen, Infrastruktur-Projekte
    - _Requirements: 6.4, 6.5, 6.6, 6.7, 6.8, 6.12_

  - [x] 7.5 So-funktioniert's-Sektion implementieren (`src/components/HowItWorks.astro`, `src/components/StepCard.astro`)
    - Drei Schritte: Erstgespräch, Konzept & Umsetzung, Betrieb & Support
    - Jeder Schritt mit Nummer, Titel und Beschreibung
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 7.6 FAQ-Sektion implementieren (`src/components/FAQ.astro`)
    - Accordion-basierte FAQ mit Starwind UI Accordion-Komponente
    - Smooth Animation beim Auf-/Zuklappen
    - Fragen zu Dienstleistungen, Preismodell, Verfügbarkeit, Zusammenarbeit
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 8. Kontaktformular und Cookie-Consent
  - [x] 8.1 Contact-Komponente implementieren (`src/components/Contact.astro`)
    - Formular mit Name, E-Mail, Nachricht (Pflichtfelder)
    - Client-seitige Validierung mit HTML5-Attributen + JavaScript-Feedback
    - Cloudflare Turnstile Widget einbetten
    - POST an Cloudflare Worker Endpoint
    - Fehler- und Erfolgsmeldungen in aktiver Locale
    - Redirect zur Danke-Seite nach Erfolg
    - _Requirements: 9.1, 9.2, 9.6, 9.8, 9.10, 9.11_

  - [x] 8.2 CookieConsent-Komponente implementieren (`src/components/CookieConsent.astro`)
    - Als Astro-Insel mit `client:load` hydratisieren
    - Drei Optionen: Alle akzeptieren, Nur notwendige, Einstellungen anpassen
    - Consent in localStorage speichern
    - GA4-Script dynamisch nur bei Analytics-Consent laden
    - Revoke-Link im Footer zum erneuten Anzeigen
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7_

- [x] 9. Seiten erstellen (Pages)
  - [x] 9.1 Deutsche Seiten erstellen
    - `src/pages/index.astro` – Startseite mit allen Sektionen (Hero, Services, AboutMe, HowItWorks, FAQ, Contact)
    - `src/pages/impressum.astro` – Impressum (Platzhalter-Inhalt nach §5 TMG)
    - `src/pages/datenschutz.astro` – Datenschutzerklärung (Platzhalter-Inhalt nach DSGVO)
    - `src/pages/danke.astro` – Danke-Seite nach Formularabsendung
    - _Requirements: 3.3, 13.1, 13.2, 13.4, 13.5, 13.6, 9.8, 9.12_

  - [x] 9.2 Englische Seiten erstellen
    - `src/pages/en/index.astro` – English homepage
    - `src/pages/en/impressum.astro` – Legal notice
    - `src/pages/en/privacy.astro` – Privacy policy
    - `src/pages/en/thank-you.astro` – Thank you page
    - _Requirements: 13.1, 13.2, 13.6, 15.2, 15.8_

  - [x] 9.3 Fehlerseiten erstellen
    - `src/pages/404.astro` – Gebrandete 404-Seite mit Fehlermeldung und CTA zur Startseite
    - `src/pages/500.astro` – Gebrandete 500-Seite mit Fehlermeldung und CTA zur Startseite
    - Beide Seiten mit Navigation, Footer und Corporate Identity
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

- [x] 10. Checkpoint – Frontend komplett
  - Sicherstellen, dass `pnpm build` fehlerfrei durchläuft, alle Seiten (DE + EN) korrekt generiert werden, Sitemap und robots.txt vorhanden sind. Bei Fragen den Nutzer ansprechen.

- [x] 11. Cloudflare Worker – Kontaktformular-Backend
  - [x] 11.1 Worker-Projekt initialisieren
    - `worker/package.json` mit Wrangler und TypeScript-Abhängigkeiten erstellen
    - `worker/wrangler.toml` mit Konfiguration (Name, Compatibility Date, KV Namespace für Rate Limiting, Environment Variables)
    - `worker/tsconfig.json` einrichten
    - _Requirements: 9.3, 16.5_

  - [x] 11.2 Formular-Validierung implementieren (`worker/src/validation.ts`)
    - `validateContactForm()` Funktion: Pflichtfelder prüfen (Name, E-Mail, Nachricht), E-Mail-Format validieren, Turnstile-Token prüfen
    - `ContactFormData` und `ValidationResult` Interfaces
    - _Requirements: 9.10_

  - [x] 11.3 Property-Test: Formular-Validierung erkennt fehlende Pflichtfelder
    - **Property 2: Formular-Validierung erkennt fehlende Pflichtfelder**
    - Generiere zufällige Kombinationen von leeren/fehlenden Formularfeldern, prüfe dass `validateContactForm` korrekte Fehler zurückgibt
    - **Validates: Requirements 9.10**

  - [x] 11.4 Property-Test: E-Mail-Validierung
    - **Property 3: E-Mail-Validierung**
    - Generiere zufällige Strings (mit und ohne gültiges E-Mail-Format), prüfe dass E-Mail-Validierung korrekt klassifiziert
    - **Validates: Requirements 9.10**

  - [x] 11.5 Turnstile-Validierung implementieren (`worker/src/turnstile.ts`)
    - Funktion zur Verifizierung des Turnstile-Tokens über die Siteverify-API
    - Secret Key aus Environment Variable lesen
    - _Requirements: 9.6, 9.7_

  - [x] 11.6 Rate Limiter implementieren (`worker/src/rate-limiter.ts`)
    - IP-basiertes Rate Limiting über Cloudflare KV
    - Max. 5 Anfragen pro IP pro Stunde
    - _Requirements: 9.9_

  - [x] 11.7 E-Mail-Versand implementieren (`worker/src/email.ts`)
    - E-Mail-Benachrichtigung über Resend API an den Seiteninhaber
    - Formatierte E-Mail mit Name, E-Mail und Nachricht des Absenders
    - _Requirements: 9.4_

  - [x] 11.8 Webhook-Modul vorbereiten (`worker/src/webhook.ts`)
    - Modulare Webhook-Dispatcher-Struktur für zukünftige Telegram/WhatsApp-Integration
    - Aktuell als Stub/Platzhalter implementieren
    - _Requirements: 9.5_

  - [x] 11.9 Worker Entry Point implementieren (`worker/src/index.ts`)
    - CORS-Handling (nur erlaubte Origins: `www.jonaswestphal.de`, `jonaswestphal.de`, in Dev: `localhost:4321`)
    - Request-Routing für POST `/api/contact`
    - Orchestrierung: Rate Limit → Validierung → Turnstile → E-Mail → Response
    - Korrekte HTTP-Statuscodes (200, 400, 403, 429, 500)
    - _Requirements: 9.3, 9.4, 9.7, 9.9_

  - [x] 11.10 Unit-Tests für Worker-Module schreiben
    - Tests für `validateContactForm`, `isValidEmail`, Rate Limiter Logik
    - Tests für CORS-Handling und Request-Routing
    - _Requirements: 9.3, 9.10_

- [x] 12. Checkpoint – Worker komplett
  - Sicherstellen, dass Worker-Tests bestehen und `wrangler dev` lokal funktioniert. Bei Fragen den Nutzer ansprechen.

- [x] 13. SEO, Sitemap und Structured Data
  - [x] 13.1 Sitemap und robots.txt konfigurieren
    - `@astrojs/sitemap` Integration installieren und konfigurieren
    - `public/robots.txt` mit Verweis auf Sitemap erstellen
    - Sicherstellen, dass alle Seiten (DE + EN) in der Sitemap enthalten sind
    - _Requirements: 18.3, 18.4_

  - [x] 13.2 Semantisches HTML und Heading-Hierarchie prüfen
    - Korrekte Verwendung von `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
    - Heading-Hierarchie (h1, h2, h3) auf allen Seiten prüfen
    - Alt-Attribute für alle Bilder und dekorative Icons
    - ARIA-Labels für interaktive Komponenten
    - _Requirements: 10.6, 14.1, 14.2, 14.3, 14.5_

  - [x] 13.3 Unit-Tests für SEO-Komponenten
    - Prüfe dass hreflang-Tags für de, en und x-default generiert werden
    - Prüfe dass JSON-LD valides Schema.org Format hat
    - _Requirements: 10.7, 18.6_

- [x] 14. CI/CD Pipeline und Deployment-Konfiguration
  - [x] 14.1 GitHub Actions Workflow für Cloudflare Pages erstellen
    - `.github/workflows/deploy.yml` erstellen
    - Trigger: Push auf `main` Branch
    - Steps: Checkout, Node.js Setup, pnpm install, Lint, Test, Astro Build, Deploy zu Cloudflare Pages via `wrangler pages deploy`
    - Environment Variables für `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID` als GitHub Secrets referenzieren
    - _Requirements: 1.4, 16.1_

  - [x] 14.2 GitHub Actions Workflow für Worker-Deployment erstellen
    - `.github/workflows/deploy-worker.yml` erstellen oder in bestehenden Workflow integrieren
    - Worker via `wrangler deploy` deployen
    - Worker Secrets (TURNSTILE_SECRET_KEY, RESEND_API_KEY) über Wrangler Secrets konfigurieren
    - _Requirements: 9.3, 16.5_

  - [x] 14.3 Cloudflare Pages Konfiguration
    - Build-Konfiguration für Cloudflare Pages (Build Command: `pnpm build`, Output Directory: `dist`)
    - Cache-Header für statische Assets konfigurieren (z.B. über `_headers` Datei)
    - _Requirements: 16.2, 16.4, 16.6_

- [ ] 15. 🔧 MANUELL – Externe Dienste und Credentials einrichten
  - [ ] 15.1 🔧 MANUELL: Cloudflare Account und Pages-Projekt einrichten
    - Cloudflare Account erstellen (falls nicht vorhanden)
    - Neues Cloudflare Pages Projekt anlegen
    - Domain `www.jonaswestphal.de` als Custom Domain hinzufügen
    - DNS-Einträge bei Cloudflare konfigurieren (A/CNAME Records)
    - `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID` als GitHub Repository Secrets hinterlegen
    - _Requirements: 16.1, 16.2, 16.3_

  - [ ] 15.2 🔧 MANUELL: Cloudflare Turnstile einrichten
    - Turnstile Site Key und Secret Key im Cloudflare Dashboard generieren
    - Site Key in der Frontend-Konfiguration (`content.ts` oder Umgebungsvariable) hinterlegen
    - Secret Key als Cloudflare Worker Secret (`wrangler secret put TURNSTILE_SECRET_KEY`) setzen
    - _Requirements: 9.6_

  - [ ] 15.3 🔧 MANUELL: Resend API Key einrichten
    - Resend Account erstellen und API Key generieren
    - Absender-Domain verifizieren
    - API Key als Cloudflare Worker Secret (`wrangler secret put RESEND_API_KEY`) setzen
    - `EMAIL_TO` und `EMAIL_FROM` als Worker Environment Variables konfigurieren
    - _Requirements: 9.4_

  - [ ] 15.4 🔧 MANUELL: Cloudflare KV Namespace für Rate Limiting erstellen
    - KV Namespace im Cloudflare Dashboard oder via `wrangler kv:namespace create RATE_LIMIT` erstellen
    - KV Namespace ID in `worker/wrangler.toml` eintragen
    - _Requirements: 9.9_

  - [ ] 15.5 🔧 MANUELL: Google Analytics (GA4) einrichten
    - Google Analytics 4 Property erstellen
    - Measurement ID (G-XXXXXXXXXX) in der Website-Konfiguration hinterlegen
    - IP-Anonymisierung in GA4 aktivieren
    - _Requirements: 18.1, 18.2_

  - [ ] 15.6 🔧 MANUELL: Google Search Console einrichten
    - Website in Google Search Console verifizieren (HTML Meta-Tag oder DNS TXT Record)
    - Sitemap URL in Search Console einreichen
    - _Requirements: 18.5_

- [x] 16. Abschluss-Checkpoint – Alles zusammenführen
  - Sicherstellen, dass alle Tests bestehen, `pnpm build` fehlerfrei durchläuft, alle Seiten korrekt generiert werden, CI/CD Pipeline konfiguriert ist. Bei Fragen den Nutzer ansprechen.

- [x] 17. DSGVO/TTDSG-Compliance – Datenschutz, Consent und rechtliche Inhalte
  - [x] 17.1 Vollständige Datenschutzerklärung erstellen (DE + EN)
    - Kontext: Cloudflare (Pages, CDN, Workers, Turnstile, Analytics) + Google Analytics, Rechtsrahmen DSGVO + TTDSG
    - Pflichtabschnitte generieren:
      - Verantwortlicher (Name, Adresse, Kontakt)
      - Hosting und CDN (Cloudflare Pages, CDN, WAF) – Rechtsgrundlage Art. 6(1)(f) DSGVO, Hinweis auf DPA + SCC für US-Transfer
      - Server-Logdateien (IP, Zeitstempel, Request-Metadaten)
      - Cloudflare Analytics (cookieless-Modus, keine Einwilligung erforderlich, trotzdem offenlegen)
      - Google Analytics (GA4) – Rechtsgrundlage Art. 6(1)(a) DSGVO (Einwilligung), Opt-in-Pflicht, IP-Anonymisierung, Google Signals deaktiviert, Anzeigenpersonalisierung deaktiviert, minimale Datenspeicherung, Widerrufsrecht, US-Transfer + SCC
      - Kontaktformular (Cloudflare Worker) – Datenminimierung (Name, E-Mail, Nachricht), Rechtsgrundlage Art. 6(1)(b) oder Art. 6(1)(f) DSGVO, sichere Übertragung (HTTPS), kein unnötiges Logging
      - Cloudflare Turnstile (Bot-Schutz) – IP + Verhaltensdaten, Rechtsgrundlage Art. 6(1)(f) DSGVO
      - Drittlandtransfer (USA) – SCC-Erklärung für Cloudflare und Google
      - Betroffenenrechte (Auskunft, Löschung, Berichtigung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerde bei Aufsichtsbehörde)
    - Keine Platzhalter, keine fehlenden Abschnitte – vollständiger, rechtskonformer Text
    - In `src/pages/datenschutz.astro` (DE) und `src/pages/en/privacy.astro` (EN) einpflegen
    - _Requirements: 13.2, 13.5, 17.8_

  - [x] 17.2 Consent-System DSGVO/TTDSG-konform implementieren
    - Opt-in-Modell (keine vorausgewählten Checkboxen)
    - Separate Kategorie für Analytics (Google Analytics)
    - Google Analytics Script darf NICHT vor Einwilligung laden – kein Preload, kein Server-Side-Bypass
    - Cloudflare Analytics im cookieless-Modus benötigt KEINE Einwilligung
    - Consent-Status steuert Script-Ausführung (GA4 nur bei explizitem Analytics-Consent)
    - Widerruf der Einwilligung jederzeit möglich (Link im Footer)
    - Consent-Entscheidung in localStorage persistieren
    - Sicherstellen, dass CookieConsent-Komponente (`src/components/CookieConsent.astro`) und Layout diese Regeln durchsetzen
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

  - [x] 17.3 Impressum vollständig nach §5 TMG erstellen (DE + EN)
    - Pflichtangaben: Name, Anschrift, Kontakt (E-Mail), ggf. Umsatzsteuer-ID
    - In `src/pages/impressum.astro` (DE) und `src/pages/en/impressum.astro` (EN) einpflegen
    - _Requirements: 13.1, 13.4_

  - [x] 17.4 Technische Compliance-Prüfung
    - Verifizieren: Kein GA-Script wird vor Consent geladen (kein verstecktes Tracking)
    - Verifizieren: Consent-Status kontrolliert tatsächlich die Script-Ausführung
    - Verifizieren: Worker loggt keine unnötigen Daten, nur Pflichtfelder werden verarbeitet
    - Verifizieren: Keine unnötigen Cookies gesetzt
    - Verifizieren: Cloudflare Analytics ist cookieless konfiguriert
    - _Requirements: 17.3, 17.4_

## Hinweise

- Aufgaben mit `*` sind optional und können für ein schnelleres MVP übersprungen werden
- Aufgaben mit 🔧 **MANUELL** erfordern manuelle Aktionen des Nutzers außerhalb des Code-Editors
- Jede Aufgabe referenziert spezifische Requirements für Nachverfolgbarkeit
- Checkpoints stellen sicher, dass der Fortschritt inkrementell validiert wird
- Property-Tests validieren universelle Korrektheitseigenschaften aus dem Design-Dokument
- Unit-Tests validieren spezifische Beispiele und Grenzfälle
- Anforderung 20 (Social Proof) ist für eine zukünftige Iteration vorgesehen und wird nicht implementiert

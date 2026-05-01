# Requirements Document

## Einleitung

Dieses Dokument beschreibt die Anforderungen für die Unternehmenswebsite unter www.jonaswestphal.de. Die Website dient als professionelle Online-Präsenz für eine nebenberufliche Selbstständigkeit im Bereich IT & Cloud Solutions. Sie wird mit dem Astro-Framework auf Basis des Templates "astro-validation-landing" (Astro 6, Tailwind CSS v4, Starwind UI) entwickelt und erhält eine vollständig neue Corporate Identity. Die Website ist zweisprachig (Deutsch und Englisch) aufgebaut, wobei Deutsch die Standardsprache ist. Die Internationalisierung wird über Astros integriertes i18n-Routing mit sprachspezifischen URL-Präfixen realisiert. Die Website wird auf Cloudflare Pages gehostet und nutzt Cloudflare als DNS-Provider, Web-Proxy und Cache, um maximale Performance bei minimalen Kosten zu gewährleisten.

Der Inhaber Jonas Westphal ist ein erfahrener Systemadministrator mit über 10 Jahren Berufserfahrung im Aufbau, Betrieb und der Optimierung von IT-Infrastrukturen. Sein Schwerpunkt liegt auf kleinen bis mittelständischen Unternehmen sowie Startups mit bis zu 400 Mitarbeitenden. Er verfügt über exzellente Expertise im Bereich Baramundi Endpoint Management (OS-Deployment, Softwareverteilung, Scripting-Automatisierung), arbeitet mit Windows Server, Linux (Ubuntu/Debian), VMware, Proxmox, Azure, Hetzner, Docker, Grafana, Zabbix, PowerShell und Bash. Zu seinen Projekterfahrungen zählen großflächige Windows-Migrationen, der Aufbau von Proxmox-Virtualisierungsplattformen sowie die Implementierung vollständiger Infrastrukturen inkl. Monitoring, Backup und Managed Hosting.

Die angebotenen Dienstleistungen umfassen:
- n8n Workflows und Prozessautomatisierung
- AI-gestützte Workflows und Automatisierung
- Beratung und Unterstützung von Startups
- Managed Hosting nach Maß (Websites, n8n Community, etc.)
- IT-Infrastruktur-Beratung und Systemadministration
- Baramundi Endpoint Management und Deployment

## Glossar

- **Website**: Die unter www.jonaswestphal.de erreichbare Astro-basierte Unternehmenswebsite
- **Besucher**: Eine Person, die die Website in einem Webbrowser aufruft
- **Hero_Sektion**: Der prominente Einstiegsbereich der Startseite mit Hauptüberschrift, Beschreibung und Call-to-Action
- **Dienstleistungs_Sektion**: Der Bereich der Website, der die vier angebotenen Dienstleistungen darstellt
- **CTA**: Call-to-Action – ein interaktives Element (Button oder Link), das den Besucher zu einer Kontaktaufnahme oder Aktion auffordert
- **Content_Konfiguration**: Die zentrale Datei (src/lib/content.ts), in der alle Textinhalte und Konfigurationen der Website verwaltet werden
- **Design_Token**: CSS-Variablen in src/styles/starwind.css, die Farben, Abstände und andere visuelle Eigenschaften der Corporate Identity definieren
- **Responsive_Layout**: Ein Layout, das sich automatisch an verschiedene Bildschirmgrößen (Mobilgeräte, Tablets, Desktops) anpasst
- **SEO_Metadaten**: HTML-Meta-Tags für Suchmaschinenoptimierung, einschließlich Title, Description, Open Graph und Twitter Cards
- **Kontakt_Sektion**: Der Bereich der Website, der Kontaktinformationen und ein Kontaktformular enthält
- **Navigation**: Die Kopfzeile der Website mit Links zu den verschiedenen Sektionen
- **Footer**: Die Fußzeile der Website mit rechtlichen Links, Kontaktdaten und Social-Media-Verweisen
- **Corporate_Identity**: Das einheitliche visuelle Erscheinungsbild der Marke, bestehend aus Farbschema, Typografie, Logo und Designelementen
- **Astro_Framework**: Das verwendete Web-Framework (Version 6), das standardmäßig kein JavaScript an den Browser sendet und statische Seiten generiert
- **Starwind_UI**: Die UI-Komponentenbibliothek, die im Template als Basis für wiederverwendbare Komponenten dient
- **i18n**: Internationalisierung – die Anpassung der Website für mehrere Sprachen und Regionen
- **Standardsprache**: Deutsch (de) – die primäre Sprache der Website, die ohne Sprachpräfix oder unter /de/ erreichbar ist
- **Sprachpräfix**: Das URL-Segment, das die Sprache kennzeichnet (z. B. /en/ für Englisch)
- **Sprachwechsler**: Ein UI-Element in der Navigation, das dem Besucher ermöglicht, zwischen Deutsch und Englisch zu wechseln
- **hreflang_Tag**: Ein HTML-Link-Element, das Suchmaschinen die verfügbaren Sprachversionen einer Seite mitteilt
- **Locale**: Eine Sprach- und Regionskombination (de für Deutsch, en für Englisch)
- **Profil_Sektion**: Der Teilbereich der "Über mich"-Sektion, der die berufliche Erfahrung, Kernkompetenzen und Zertifizierungen des Inhabers darstellt
- **Zeitstrahl**: Eine chronologische, visuelle Darstellung des beruflichen Werdegangs mit Stationen und Projekten entlang einer vertikalen Timeline
- **Karriere_Station**: Ein einzelner Eintrag im Zeitstrahl, bestehend aus Zeitraum, Rolle/Position, Unternehmen/Kontext und einer Beschreibung der Tätigkeiten und Projekte
- **Baramundi_Deployment**: Software-Deployment und Endpoint-Management mit der Baramundi Management Suite
- **Cloudflare_Pages**: Der statische Hosting-Dienst von Cloudflare, der die Website über das globale CDN ausliefert
- **Cloudflare_Workers**: Serverlose Funktionen auf Cloudflares Edge-Netzwerk, die für die Verarbeitung des Kontaktformulars eingesetzt werden
- **Cloudflare_Turnstile**: Cloudflares datenschutzfreundliche Bot-Protection-Lösung als Alternative zu CAPTCHA
- **Fehlerseite**: Eine gebrandete Seite, die angezeigt wird, wenn ein HTTP-Fehler auftritt (z. B. 404 Not Found, 500 Internal Server Error)
- **Social_Proof_Sektion**: Ein optionaler Bereich der Website, der Vertrauenselemente wie Kundenstimmen, Partnerlogos oder Erfahrungskennzahlen darstellt (für zukünftige Implementierung vorgesehen)
- **Webhook**: Ein HTTP-Callback, der bei einem Ereignis (z. B. Formularabsendung) eine Nachricht an einen externen Dienst sendet
- **Danke_Seite**: Die Bestätigungsseite, die nach erfolgreicher Kontaktformular-Absendung angezeigt wird
- **Cookie_Consent_Banner**: Ein UI-Element, das den Besucher über die Verwendung von Cookies und Tracking informiert und eine aktive Einwilligung einholt (DSGVO-konform)
- **Google_Analytics**: Google Analytics 4 (GA4) – der Webanalyse-Dienst von Google zur Erfassung von Besucherstatistiken und Nutzerverhalten
- **Google_Search_Console**: Googles Dienst zur Überwachung und Optimierung der Sichtbarkeit einer Website in den Google-Suchergebnissen

## Anforderungen

### Anforderung 1: Projektinitialisierung und Template-Setup

**User Story:** Als Entwickler möchte ich das Projekt auf Basis des astro-validation-landing Templates aufsetzen, damit ich eine funktionierende Grundlage für die Unternehmenswebsite habe.

#### Akzeptanzkriterien

1. THE Website SHALL be based on the astro-validation-landing template using Astro 6, Tailwind CSS v4, and Starwind UI
2. THE Website SHALL use TypeScript in strict mode as configured by the template
3. THE Website SHALL build to static assets using the Astro build process without errors
4. THE Website SHALL be deployable to Cloudflare_Pages as the primary hosting platform
5. WHEN the production site URL is configured, THE Website SHALL use "https://www.jonaswestphal.de" as the site URL in astro.config.mjs
6. THE Website SHALL configure Astro's built-in i18n routing in astro.config.mjs with "de" as the default locale and "en" as an additional locale

### Anforderung 2: Corporate Identity und visuelles Design

**User Story:** Als Geschäftsinhaber möchte ich eine professionelle und einheitliche Corporate Identity für meine IT & Cloud Solutions Marke, damit die Website Vertrauen und Kompetenz ausstrahlt.

#### Akzeptanzkriterien

1. THE Corporate_Identity SHALL define a professional color scheme suitable for an IT & Cloud Solutions brand using Design_Token in src/styles/starwind.css
2. THE Corporate_Identity SHALL include both light and dark color tokens via CSS variables (:root and .dark)
3. THE Website SHALL support dark mode toggling for the Besucher
4. THE Corporate_Identity SHALL define a consistent typography scale using modern, professional fonts
5. THE Website SHALL replace the template placeholder logo in src/components/Logo.astro with a custom brand logo for "Jonas Westphal – IT & Cloud Solutions"
6. THE Website SHALL replace the favicon in public/favicon.ico with a brand-consistent favicon
7. THE Website SHALL include an Open Graph image in public/og-image.png that represents the brand identity
8. THE Design_Token SHALL define a consistent border-radius scale (--radius, --radius-*) aligned with the Corporate_Identity

### Anforderung 3: Seitenstruktur und Navigation

**User Story:** Als Besucher möchte ich eine klare und intuitive Seitenstruktur, damit ich schnell die gewünschten Informationen finde.

#### Akzeptanzkriterien

1. THE Navigation SHALL display the brand logo and navigation links to all major sections of the Website
2. THE Navigation SHALL include a prominent CTA button for contact or inquiry
3. THE Website SHALL include the following sections in order: Hero_Sektion, Dienstleistungs_Sektion, "Über mich" section, "So funktioniert's" section, FAQ section, Kontakt_Sektion, Footer
4. THE Navigation SHALL provide smooth in-page scrolling to each section using anchor IDs
5. WHEN the Besucher views the Website on a mobile device, THE Navigation SHALL collapse into a responsive mobile menu
6. THE Footer SHALL display legal links (Impressum, Datenschutzerklärung), contact information, and social media links

### Anforderung 4: Hero-Sektion

**User Story:** Als Besucher möchte ich beim ersten Besuch der Website sofort verstehen, welche Dienstleistungen angeboten werden, damit ich entscheiden kann, ob das Angebot für mich relevant ist.

#### Akzeptanzkriterien

1. THE Hero_Sektion SHALL display a compelling headline that communicates the core value proposition of IT & Cloud Solutions
2. THE Hero_Sektion SHALL display a subheadline that briefly describes the range of services offered
3. THE Hero_Sektion SHALL include a primary CTA button that directs the Besucher to the Kontakt_Sektion
4. THE Hero_Sektion SHALL include a secondary CTA button that directs the Besucher to the Dienstleistungs_Sektion
5. THE Hero_Sektion SHALL contain all text content in both German and English language, matching the active Locale

### Anforderung 5: Dienstleistungs-Darstellung

**User Story:** Als Besucher möchte ich eine übersichtliche Darstellung aller angebotenen Dienstleistungen, damit ich verstehe, welche Lösungen für mein Unternehmen verfügbar sind.

#### Akzeptanzkriterien

1. THE Dienstleistungs_Sektion SHALL display four service cards for: n8n Workflows, AI Workflows, Beratung und Unterstützung von Startups, and Managed Hosting nach Maß
2. WHEN a service card is displayed, THE Dienstleistungs_Sektion SHALL show a descriptive icon, a title, and a short description for each service
3. THE Dienstleistungs_Sektion SHALL describe n8n Workflows as automation solutions for business processes
4. THE Dienstleistungs_Sektion SHALL describe AI Workflows as intelligent automation and AI-powered process optimization
5. THE Dienstleistungs_Sektion SHALL describe Beratung und Unterstützung von Startups as consulting services for technology strategy and implementation
6. THE Dienstleistungs_Sektion SHALL describe Managed Hosting nach Maß as custom hosting solutions including websites and n8n community instances
7. THE Dienstleistungs_Sektion SHALL contain all text content in both German and English language, matching the active Locale

### Anforderung 6: Über-mich-Sektion (Portfolio mit Zeitstrahl)

**User Story:** Als Besucher möchte ich den beruflichen Werdegang und die Projekterfahrung des Inhabers in einer übersichtlichen Portfolio-Darstellung sehen, damit ich Vertrauen in die Kompetenz und Erfahrung aufbauen kann.

#### Akzeptanzkriterien

1. THE Website SHALL include an "Über mich" section designed as a portfolio page that presents Jonas Westphal as the founder and IT consultant
2. THE Website SHALL communicate that the business operates as a side business (Selbstständigkeit als Nebenjob) focused on consulting and AI-driven automation services
3. THE Profil_Sektion SHALL include a short introductory paragraph highlighting that Jonas Westphal is an experienced system administrator with more than 10 years of professional experience in designing, operating, and optimizing IT infrastructures
4. THE Profil_Sektion SHALL include a Zeitstrahl that displays the professional career as a vertical timeline with chronologically ordered Karriere_Station entries
5. WHEN a Karriere_Station is displayed, THE Zeitstrahl SHALL show the time period, the role or position, the company or context, and a description of key responsibilities and projects for each station
6. THE Zeitstrahl SHALL include stations covering experience in startups and small to medium-sized companies with up to 400 employees, highlighting pragmatic, stable, and scalable solutions
7. THE Zeitstrahl SHALL include a Karriere_Station highlighting excellent expertise in Baramundi_Deployment including OS deployment (Windows imaging, Autopilot alternatives), software distribution, and automation through custom scripting and integrations
8. THE Zeitstrahl SHALL include Karriere_Station entries for key projects such as large-scale Windows migrations (Windows 7 to 10, Windows 10 to 11), building Proxmox-based virtualization platforms, and implementing complete infrastructures with monitoring, backup, and managed hosting
9. THE Profil_Sektion SHALL present the technical stack including: Windows Server, Linux (Ubuntu/Debian), VMware, Proxmox, Azure, Hetzner, Docker, Grafana, Zabbix, PowerShell, Bash, and n8n in a visually structured format (e.g., skill tags, grouped categories, or icon-based list)
10. THE Profil_Sektion SHALL communicate the ability to explain complex technical topics clearly to non-technical stakeholders, management, and C-level executives
11. THE Profil_Sektion SHALL emphasize a structured, transparent work approach focused on cost efficiency and long-term optimization
12. THE Zeitstrahl SHALL be responsive and display as a vertical timeline on all device sizes, adapting its layout for mobile, tablet, and desktop viewports
13. THE Website SHALL contain all "Über mich" / "About me" text content including all Karriere_Station entries in both German and English language, matching the active Locale

### Anforderung 7: So-funktioniert's-Sektion

**User Story:** Als Besucher möchte ich verstehen, wie die Zusammenarbeit abläuft, damit ich weiß, was mich erwartet.

#### Akzeptanzkriterien

1. THE Website SHALL include a "So funktioniert's" section that describes the collaboration process in clear steps
2. THE Website SHALL present the process in a three-step format: Erstgespräch (initial consultation), Konzept & Umsetzung (concept & implementation), and Betrieb & Support (operation & support)
3. WHEN a step is displayed, THE Website SHALL show a step number, a title, and a description for each step
4. THE Website SHALL contain all "So funktioniert's" / "How it works" text content in both German and English language, matching the active Locale

### Anforderung 8: FAQ-Sektion

**User Story:** Als Besucher möchte ich Antworten auf häufig gestellte Fragen finden, damit ich offene Fragen ohne direkte Kontaktaufnahme klären kann.

#### Akzeptanzkriterien

1. THE Website SHALL include a FAQ section with accordion-style expandable questions and answers
2. THE FAQ section SHALL address common questions about the services, pricing model, availability, and collaboration process
3. WHEN a Besucher clicks on a FAQ question, THE Website SHALL expand the answer with a smooth animation
4. WHEN a FAQ answer is expanded and the Besucher clicks the question again, THE Website SHALL collapse the answer
5. THE FAQ section SHALL contain all text content in both German and English language, matching the active Locale

### Anforderung 9: Kontakt-Sektion und Lead-Erfassung

**User Story:** Als Besucher möchte ich einfach Kontakt aufnehmen können, damit ich eine Anfrage für eine Dienstleistung stellen kann.

#### Akzeptanzkriterien

1. THE Kontakt_Sektion SHALL include a contact form with fields for name, email address, and message
2. THE Kontakt_Sektion SHALL display direct contact information (email address) as an alternative to the form
3. WHEN a Besucher submits the contact form with valid data, THE Website SHALL process the form submission via a Cloudflare_Workers function
4. THE Cloudflare_Workers function SHALL send the form data as an email notification to the site owner
5. THE Cloudflare_Workers function SHALL be designed with a modular architecture that allows adding Webhook notifications (e.g., Telegram, WhatsApp) in a future iteration
6. THE Kontakt_Sektion SHALL integrate Cloudflare_Turnstile for bot protection on the contact form
7. IF a Besucher submits the contact form without passing the Cloudflare_Turnstile challenge, THEN THE Cloudflare_Workers function SHALL reject the submission
8. WHEN a Besucher successfully submits the contact form, THE Website SHALL redirect to a dedicated thank-you page that confirms receipt and communicates that a personal response will follow shortly
9. THE Cloudflare_Workers function SHALL implement rate limiting to restrict the number of form submissions per IP address to prevent spam abuse
10. IF a Besucher submits the contact form with missing required fields, THEN THE Website SHALL display validation error messages in the active Locale
11. THE Kontakt_Sektion SHALL contain all labels, placeholders, and messages in both German and English language, matching the active Locale
12. THE thank-you page SHALL display content in both German and English language, matching the active Locale

### Anforderung 10: SEO und Metadaten

**User Story:** Als Geschäftsinhaber möchte ich, dass die Website für Suchmaschinen optimiert ist, damit potenzielle Kunden mich über Google finden können.

#### Akzeptanzkriterien

1. THE Website SHALL include SEO_Metadaten with language-appropriate title and description in the siteConfig for both German and English
2. THE Website SHALL include Open Graph meta tags (og:title, og:description, og:image, og:url, og:locale) for social media sharing, with locale-specific values
3. THE Website SHALL include Twitter Card meta tags for social media sharing
4. THE Website SHALL set the canonical URL to the language-specific version of the current page (e.g., "https://www.jonaswestphal.de" for German, "https://www.jonaswestphal.de/en/" for English)
5. THE Website SHALL set the HTML lang attribute to the active Locale ("de" for German pages, "en" for English pages)
6. THE Website SHALL generate semantic HTML using appropriate heading hierarchy (h1, h2, h3)
7. THE Website SHALL include hreflang_Tag link elements on every page, referencing all available language versions (de and en) and an x-default pointing to the German version

### Anforderung 11: Responsive Design und Performance

**User Story:** Als Besucher möchte ich die Website auf jedem Gerät optimal nutzen können, damit ich unabhängig vom Endgerät eine gute Erfahrung habe.

#### Akzeptanzkriterien

1. THE Responsive_Layout SHALL adapt to mobile devices (viewport width below 768px), tablets (768px to 1024px), and desktops (above 1024px)
2. THE Website SHALL follow a mobile-first design approach using Tailwind CSS v4 responsive utilities
3. THE Website SHALL achieve a Lighthouse Performance score of 90 or higher
4. THE Website SHALL achieve a Lighthouse Accessibility score of 90 or higher
5. THE Astro_Framework SHALL ship zero JavaScript to the browser by default, hydrating interactive components only when necessary

### Anforderung 12: Zentrale Inhaltsverwaltung

**User Story:** Als Entwickler möchte ich alle Textinhalte zentral in einer Datei verwalten, damit Inhaltsänderungen schnell und konsistent durchgeführt werden können.

#### Akzeptanzkriterien

1. THE Content_Konfiguration SHALL centralize all page copy, links, and configuration in src/lib/content.ts, organized by Locale
2. THE Content_Konfiguration SHALL export typed objects for each Locale (de and en) containing: siteConfig, header, hero, services (replacing problem/solution), howItWorks, faq, cta, footer, contact, profile (including experience summary, technical stack, project highlights, baramundi expertise, soft skills, and competency categories), and timeline (containing an array of Karriere_Station entries with time period, role, company, and description)
3. WHEN a text change is required, THE Content_Konfiguration SHALL be the single source of truth so that only one file needs to be edited per Locale
4. THE Content_Konfiguration SHALL contain complete text values in both German and English language

### Anforderung 13: Rechtliche Seiten (Impressum und Datenschutz)

**User Story:** Als Geschäftsinhaber möchte ich die gesetzlich vorgeschriebenen rechtlichen Seiten bereitstellen, damit die Website den deutschen Rechtsvorschriften entspricht.

#### Akzeptanzkriterien

1. THE Website SHALL include a dedicated Impressum page accessible via /impressum (German) and /en/impressum (English)
2. THE Website SHALL include a dedicated Datenschutzerklärung page accessible via /datenschutz (German) and /en/privacy (English)
3. THE Footer SHALL link to both the Impressum and Datenschutzerklärung pages
4. THE Impressum page SHALL contain placeholder content structured according to German legal requirements (§5 TMG)
5. THE Datenschutzerklärung page SHALL contain placeholder content structured according to DSGVO requirements, including sections for cookies, analytics, and contact form data processing
6. THE Website SHALL display both legal pages in the active Locale (German and English versions)

### Anforderung 14: Barrierefreiheit

**User Story:** Als Besucher mit Einschränkungen möchte ich die Website barrierefrei nutzen können, damit ich gleichberechtigten Zugang zu allen Inhalten habe.

#### Akzeptanzkriterien

1. THE Website SHALL use semantic HTML elements (nav, main, section, article, header, footer) for proper document structure
2. THE Website SHALL provide alt attributes for all images and decorative icons
3. THE Website SHALL ensure sufficient color contrast ratios (minimum 4.5:1 for normal text) in both light and dark mode
4. THE Website SHALL support keyboard navigation for all interactive elements including the Navigation, FAQ accordion, and contact form
5. THE Website SHALL include ARIA labels for interactive components where semantic HTML is insufficient

### Anforderung 15: Internationalisierung (i18n)

**User Story:** Als Besucher möchte ich die Website in meiner bevorzugten Sprache (Deutsch oder Englisch) nutzen können, damit ich die Inhalte optimal verstehe.

#### Akzeptanzkriterien

1. THE Website SHALL support two languages: German (de) as the Standardsprache and English (en)
2. THE Website SHALL use Astro's built-in i18n routing to serve language-specific pages under Sprachpräfix paths (/en/ for English, root or /de/ for German)
3. WHEN a Besucher accesses the Website without a Sprachpräfix, THE Website SHALL serve the German version as default
4. THE Navigation SHALL include a Sprachwechsler that allows the Besucher to switch between German and English
5. WHEN the Besucher switches the language via the Sprachwechsler, THE Website SHALL navigate to the equivalent page in the selected Locale while preserving the current section or page context
6. THE Website SHALL maintain consistent page structure and layout across both language versions
7. THE Website SHALL provide complete translations for all UI elements, section headings, button labels, and content text in both German and English
8. WHEN a Besucher navigates to a language-specific URL directly (e.g., /en/), THE Website SHALL display the page in the corresponding Locale
9. THE Website SHALL store the language-specific content in the Content_Konfiguration, organized by Locale

### Anforderung 16: Cloudflare Hosting und Kostenoptimierung

**User Story:** Als Geschäftsinhaber möchte ich die Website kostengünstig und performant über Cloudflare betreiben, damit ich maximale Geschwindigkeit bei minimalen Betriebskosten erreiche.

#### Akzeptanzkriterien

1. THE Website SHALL be hosted on Cloudflare_Pages using the free tier
2. THE Website SHALL leverage Cloudflare's global CDN for asset caching and delivery
3. THE Website SHALL use Cloudflare as DNS provider and web proxy for the domain www.jonaswestphal.de
4. THE Website SHALL generate fully static HTML pages to avoid server-side rendering costs
5. THE Cloudflare_Workers function for the contact form SHALL operate within the free tier limits (100,000 requests per day)
6. THE Website SHALL configure appropriate cache headers to maximize Cloudflare's edge caching

### Anforderung 17: Cookie-Consent und Datenschutz-Compliance

**User Story:** Als Geschäftsinhaber möchte ich die Website DSGVO-konform betreiben, damit ich rechtlich abgesichert bin und das Vertrauen der Besucher gewinne.

#### Akzeptanzkriterien

1. THE Website SHALL display a Cookie_Consent_Banner on the first visit of a Besucher, before any non-essential cookies or tracking scripts are loaded
2. THE Cookie_Consent_Banner SHALL provide options to accept all cookies, reject non-essential cookies, or customize cookie preferences
3. WHEN a Besucher rejects non-essential cookies, THE Website SHALL load only technically necessary cookies and refrain from loading Google_Analytics
4. WHEN a Besucher accepts analytics cookies via the Cookie_Consent_Banner, THE Website SHALL load the Google_Analytics tracking script
5. THE Cookie_Consent_Banner SHALL store the consent decision of the Besucher so that the banner is not shown again on subsequent visits
6. THE Cookie_Consent_Banner SHALL provide a way for the Besucher to revoke or change the consent decision at any time (e.g., via a link in the Footer)
7. THE Cookie_Consent_Banner SHALL display all text content in both German and English language, matching the active Locale
8. THE Datenschutzerklärung page SHALL include a section describing the use of Google_Analytics, the data collected, and the opt-out mechanism

### Anforderung 18: Web-Analyse und Suchmaschinen-Integration

**User Story:** Als Geschäftsinhaber möchte ich das Besucherverhalten analysieren und die Sichtbarkeit in Suchmaschinen überwachen, damit ich die Website datenbasiert optimieren kann.

#### Akzeptanzkriterien

1. THE Website SHALL integrate Google_Analytics (GA4) for visitor tracking and behavior analysis, loaded only after cookie consent
2. THE Website SHALL configure Google_Analytics with IP anonymization enabled
3. THE Website SHALL include a sitemap.xml that lists all pages in both language versions (German and English) for search engine crawling
4. THE Website SHALL include a robots.txt file that allows search engine crawling of all public pages and references the sitemap.xml
5. THE Website SHALL be structured to support Google_Search_Console verification (via HTML meta tag or DNS TXT record)
6. THE Website SHALL implement structured data (JSON-LD) for the organization and local business schema to enhance search engine result appearance

### Anforderung 19: Benutzerdefinierte Fehlerseiten

**User Story:** Als Besucher möchte ich bei einem Seitenfehler eine hilfreiche und gebrandete Fehlerseite sehen, damit ich nicht verwirrt werde und einfach zur Website zurückfinden kann.

#### Akzeptanzkriterien

1. THE Website SHALL display a branded Fehlerseite when a 404 (Not Found) error occurs
2. THE Website SHALL display a branded Fehlerseite when a 500 (Internal Server Error) error occurs
3. THE Fehlerseite SHALL display a clear error message explaining that the requested page was not found or an error occurred
4. THE Fehlerseite SHALL include a prominent CTA button that navigates the Besucher back to the homepage
5. THE Fehlerseite SHALL maintain the Corporate_Identity including the Navigation and Footer
6. THE Fehlerseite SHALL display all text content in both German and English language, matching the active Locale

### Anforderung 20: Social Proof und Vertrauenselemente (TODO – Zukünftige Implementierung)

**User Story:** Als Besucher möchte ich Referenzen, Partnerlogos und Erfahrungskennzahlen sehen, damit ich Vertrauen in die Kompetenz und Zuverlässigkeit des Anbieters aufbauen kann.

> **Hinweis:** Diese Anforderung ist für eine zukünftige Iteration vorgesehen und wird in der initialen Version der Website nicht implementiert.

#### Akzeptanzkriterien

1. WHERE the Social_Proof_Sektion is enabled, THE Website SHALL display a section with trust elements on the homepage
2. WHERE the Social_Proof_Sektion is enabled, THE Social_Proof_Sektion SHALL display Erfahrungskennzahlen such as "10+ Jahre Erfahrung" and "400+ Mitarbeiter betreut"
3. WHERE the Social_Proof_Sektion is enabled, THE Social_Proof_Sektion SHALL display partner and technology logos including Baramundi, Microsoft, Proxmox, and other relevant technology partners
4. WHERE the Social_Proof_Sektion is enabled, THE Social_Proof_Sektion SHALL include a testimonials area for customer references
5. WHERE the Social_Proof_Sektion is enabled, THE Social_Proof_Sektion SHALL contain all text content in both German and English language, matching the active Locale
6. WHERE the Social_Proof_Sektion is enabled, THE Content_Konfiguration SHALL include the Social Proof content organized by Locale

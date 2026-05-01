# TODO — Offene Schritte vor Go-Live

> Nur noch offene Punkte. Erledigte Schritte wurden entfernt.

---

## 1. Persoenliche Daten in rechtlichen Seiten ergaenzen

### Impressum (DE + EN)

- [ ] **Postanschrift** in `src/pages/impressum.astro` ergaenzen (Strasse, Hausnummer, PLZ, Ort)
- [ ] **Postanschrift** in `src/pages/en/impressum.astro` ergaenzen
- [ ] **Umsatzsteuer-ID** in beiden Impressum-Seiten ergaenzen (falls vorhanden)
- [ ] **Verantwortlich nach Paragraph 55 Abs. 2 RStV** — Adresse in beiden Seiten ergaenzen

### Datenschutzerklaerung (DE + EN)

- [ ] **Postanschrift** in `src/pages/datenschutz.astro` ergaenzen (Abschnitt 1: Verantwortlicher)
- [ ] **Postanschrift** in `src/pages/en/privacy.astro` ergaenzen (Section 1: Controller)

---

## 2. Google Analytics — Datenschutz-Einstellungen

- [ ] In GA4: **Anzeigenpersonalisierung** deaktivieren

---

## 3. Google Search Console

- [ ] [Google Search Console](https://search.google.com/search-console/) → Domain `jonaswestphal.de` hinzufuegen
- [ ] DNS-Verifizierung: TXT-Record bei Cloudflare anlegen
- [ ] Sitemap einreichen: `https://www.jonaswestphal.de/sitemap-index.xml`

---

## 4. Go-Live: Bestehende Website abloesen

1. [ ] Custom Domain `www.jonaswestphal.de` im Cloudflare Pages-Projekt hinzufuegen
2. [ ] DNS umstellen (CNAME `www` → Pages-Projekt)
3. [ ] Optional: Redirect von `jonaswestphal.de` (ohne www) auf `www.jonaswestphal.de`
4. [ ] Alte Website deaktivieren
5. [ ] `www.jonaswestphal.de` aufrufen und finalen Check durchfuehren
6. [ ] Google Search Console Sitemap einreichen

---

## Architektur-Uebersicht

| Komponente | Dienst | Status |
|------------|--------|--------|
| Website Hosting | Cloudflare Pages (Git-Integration, baut bei Push auf `main`) | ✅ |
| Dev-Preview | `dev.jonaswestphal.de` mit Basic Auth | ✅ |
| Worker Deploy | GitHub Actions (bei Aenderungen in `worker/`) | ✅ |
| CI Tests | GitHub Actions (bei Pull Requests) | ✅ |
| Kontaktformular | Cloudflare Worker `contact-form-worker` | ✅ |
| Bot-Schutz | Cloudflare Turnstile | ✅ |
| E-Mail-Versand | Amazon SES (eu-central-1) | ✅ |
| Rate Limiting | Cloudflare KV | ✅ |
| Google Analytics | GA4 `G-WP95NLRJ61` (nur nach Cookie-Consent) | ✅ |
| Cloudflare Web Analytics | Cookieless, DSGVO-konform | ✅ |
| Build Cache | Cloudflare Pages Build Cache | ✅ |

## Offene Platzhalter im Code

| Datei | Was fehlt |
|-------|----------|
| `src/pages/impressum.astro` | Postanschrift, USt-IdNr. |
| `src/pages/en/impressum.astro` | Postal address, VAT ID |
| `src/pages/datenschutz.astro` | Postanschrift |
| `src/pages/en/privacy.astro` | Postal address |

# TODO — Manuelle Schritte vor Go-Live

> Diese Datei listet alle manuellen Schritte auf, die vor der Veröffentlichung der Website erledigt werden müssen.
> Hake erledigte Punkte ab, indem du `[ ]` durch `[x]` ersetzt.

---

## 1. GitHub CLI authentifizieren

- [ ] `gh auth login` ausführen (für PR-Review-Hook und Deployments)

---

## 2. Persönliche Daten in rechtlichen Seiten ergänzen

### Impressum (DE + EN)

- [ ] **Postanschrift** in `src/pages/impressum.astro` ergänzen (Straße, Hausnummer, PLZ, Ort)
- [ ] **Postanschrift** in `src/pages/en/impressum.astro` ergänzen
- [ ] **Umsatzsteuer-ID** in beiden Impressum-Seiten ergänzen (falls vorhanden)
- [ ] **Verantwortlich nach § 55 Abs. 2 RStV** — Adresse in beiden Seiten ergänzen

### Datenschutzerklärung (DE + EN)

- [ ] **Postanschrift** in `src/pages/datenschutz.astro` ergänzen (Abschnitt 1: Verantwortlicher)
- [ ] **Postanschrift** in `src/pages/en/privacy.astro` ergänzen (Section 1: Controller)

---

## 3. Cloudflare Account & Pages

- [ ] Cloudflare Account erstellen (falls nicht vorhanden)
- [ ] Neues **Cloudflare Pages** Projekt anlegen (Name: `jonaswestphal-de`)
- [ ] **Custom Domain** `www.jonaswestphal.de` hinzufügen
- [ ] **DNS-Einträge** bei Cloudflare konfigurieren (CNAME für `www` → Pages-Projekt)
- [ ] `CLOUDFLARE_API_TOKEN` als **GitHub Repository Secret** hinterlegen
- [ ] `CLOUDFLARE_ACCOUNT_ID` als **GitHub Repository Secret** hinterlegen

---

## 4. Cloudflare Turnstile (Bot-Schutz)

- [ ] Im Cloudflare Dashboard: **Turnstile Widget** erstellen für `www.jonaswestphal.de`
- [ ] **Site Key** kopieren und in `src/components/Contact.astro` ersetzen:
  ```
  Suche:   data-sitekey="YOUR_TURNSTILE_SITE_KEY"
  Ersetze: data-sitekey="DEIN_ECHTER_SITE_KEY"
  ```
- [ ] **Secret Key** als Worker Secret setzen:
  ```bash
  cd worker
  wrangler secret put TURNSTILE_SECRET_KEY
  ```

---

## 5. Amazon SES (E-Mail-Versand)

- [ ] [AWS Console](https://console.aws.amazon.com/ses/) aufrufen (Region: `eu-central-1`)
- [ ] **Absender-E-Mail oder Domain** verifizieren (z.B. `jonaswestphal.de` oder `noreply@jonaswestphal.de`)
- [ ] Falls noch im Sandbox-Modus: **Production Access** beantragen
- [ ] **IAM User** erstellen mit `ses:SendEmail` Permission (oder bestehenden verwenden)
- [ ] **Access Key ID** und **Secret Access Key** als Worker Secrets setzen:
  ```bash
  cd worker
  wrangler secret put AWS_ACCESS_KEY_ID
  wrangler secret put AWS_SECRET_ACCESS_KEY
  ```
- [ ] Optional: `AWS_REGION` in `worker/wrangler.toml` anpassen (aktuell: `eu-central-1`)
- [ ] Optional: `EMAIL_TO` und `EMAIL_FROM` in `worker/wrangler.toml` anpassen

---

## 6. Cloudflare KV Namespace (Rate Limiting)

- [ ] KV Namespace erstellen:
  ```bash
  cd worker
  wrangler kv:namespace create RATE_LIMIT
  ```
- [ ] Die ausgegebene **Namespace ID** in `worker/wrangler.toml` eintragen:
  ```
  Suche:   id = "PLACEHOLDER_KV_NAMESPACE_ID"
  Ersetze: id = "DEINE_ECHTE_NAMESPACE_ID"
  ```

---

## 7. Google Analytics (GA4)

- [ ] [Google Analytics 4](https://analytics.google.com/) Property erstellen
- [ ] **Measurement ID** (Format: `G-XXXXXXXXXX`) kopieren
- [ ] Measurement ID in **zwei Dateien** ersetzen:
  - `src/layouts/Layout.astro` — Zeile mit `var gtagId = "G-XXXXXXXXXX";`
  - `src/components/CookieConsent.astro` — Zeile mit `const gtagId = "G-XXXXXXXXXX";`
- [ ] In GA4 Einstellungen:
  - **IP-Anonymisierung** aktivieren
  - **Google Signals** deaktivieren
  - **Anzeigenpersonalisierung** deaktivieren
  - **Datenspeicherung** auf Minimum setzen

---

## 8. Google Search Console

- [ ] [Google Search Console](https://search.google.com/search-console/) aufrufen
- [ ] Website `www.jonaswestphal.de` verifizieren (DNS TXT Record oder HTML Meta-Tag)
- [ ] **Sitemap** einreichen: `https://www.jonaswestphal.de/sitemap-index.xml`

---

## 9. Worker deployen (erstmalig)

- [ ] Worker erstmalig deployen:
  ```bash
  cd worker
  wrangler deploy
  ```
- [ ] Prüfen, dass der Worker unter der konfigurierten URL erreichbar ist
- [ ] Contact-Form-Endpoint in `src/components/Contact.astro` ggf. anpassen (aktuell: `https://contact.jonaswestphal.de/api/contact`)

---

## 10. Erster Deployment-Test

- [ ] Änderung auf `main` pushen → GitHub Actions prüfen
- [ ] Website unter `www.jonaswestphal.de` aufrufen
- [ ] Prüfen:
  - [ ] Deutsche Startseite lädt korrekt
  - [ ] Englische Seite unter `/en/` erreichbar
  - [ ] Sprachwechsler funktioniert
  - [ ] Dark/Light Mode Toggle funktioniert
  - [ ] Kontaktformular absenden (Test-Nachricht)
  - [ ] Cookie-Banner erscheint beim ersten Besuch
  - [ ] Impressum und Datenschutz erreichbar
  - [ ] 404-Seite bei ungültiger URL
  - [ ] Mobile Navigation (Hamburger-Menü)

---

## 11. Optional: Cloudflare Web Analytics

- [ ] Im Cloudflare Dashboard: **Web Analytics** für die Domain aktivieren (cookieless, keine Einwilligung nötig)
- [ ] JS-Snippet in `src/layouts/Layout.astro` einfügen (falls gewünscht)

---

## Zusammenfassung der Platzhalter im Code

| Datei | Platzhalter | Ersetzen durch |
|-------|------------|----------------|
| `src/components/Contact.astro` | `YOUR_TURNSTILE_SITE_KEY` | Turnstile Site Key |
| `src/layouts/Layout.astro` | `G-XXXXXXXXXX` | GA4 Measurement ID |
| `src/components/CookieConsent.astro` | `G-XXXXXXXXXX` | GA4 Measurement ID |
| `worker/wrangler.toml` | `PLACEHOLDER_KV_NAMESPACE_ID` | KV Namespace ID |
| `src/pages/impressum.astro` | `<!-- Bitte ergänzen: ... -->` | Postanschrift, USt-IdNr. |
| `src/pages/en/impressum.astro` | `<!-- Please add: ... -->` | Postal address, VAT ID |
| `src/pages/datenschutz.astro` | `<!-- Bitte ergänzen: ... -->` | Postanschrift |
| `src/pages/en/privacy.astro` | `<!-- Please add: ... -->` | Postal address |

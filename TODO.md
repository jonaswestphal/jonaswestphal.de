# TODO — Manuelle Schritte vor Go-Live

> Diese Datei listet alle manuellen Schritte auf, die vor der Veroeffentlichung der Website erledigt werden muessen.
> Hake erledigte Punkte ab, indem du `[ ]` durch `[x]` ersetzt.

---

## 1. GitHub CLI authentifizieren

- [x] `gh auth login` ausfuehren (fuer PR-Review-Hook und Deployments)

---

## 2. Persoenliche Daten in rechtlichen Seiten ergaenzen

### Impressum (DE + EN)

- [ ] **Postanschrift** in `src/pages/impressum.astro` ergaenzen (Strasse, Hausnummer, PLZ, Ort)
- [ ] **Postanschrift** in `src/pages/en/impressum.astro` ergaenzen
- [ ] **Umsatzsteuer-ID** in beiden Impressum-Seiten ergaenzen (falls vorhanden)
- [ ] **Verantwortlich nach Paragraph 55 Abs. 2 RStV** — Adresse in beiden Seiten ergaenzen

### Datenschutzerklaerung (DE + EN)

- [ ] **Postanschrift** in `src/pages/datenschutz.astro` ergaenzen (Abschnitt 1: Verantwortlicher)
- [ ] **Postanschrift** in `src/pages/en/privacy.astro` ergaenzen (Section 1: Controller)

---

## 3. Cloudflare Pages — Projekt per Git-Import anlegen

### Schritt-fuer-Schritt: Repo importieren

1. [x] Im [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. [x] GitHub-Account verbinden und das Repo `jonaswestphal/jonaswestphal.de` auswaehlen
3. [x] Build-Einstellungen konfigurieren:
   - **Production branch**: `main`
   - **Framework preset**: `Astro`
   - **Build command**: `pnpm install --frozen-lockfile && pnpm build`
   - **Build output directory**: `dist`
   - **Root directory**: _(leer lassen)_
   - **Node.js version**: Unter "Environment variables" setzen: `NODE_VERSION` = `22`
4. [x] Projekt-Name: `jonaswestphal-de`
5. [x] **Save and Deploy** klicken

### Dev-Preview mit Basic Auth einrichten

6. [x] Im Cloudflare Pages Dashboard → **Settings** → **Variables and Secrets**
7. [x] Folgende Variablen setzen:
   - `BASIC_AUTH_USER` = Benutzername
   - `BASIC_AUTH_PASS` = Passwort
8. [x] **Custom Domain** fuer Preview hinzugefuegt: `dev.jonaswestphal.de`
9. [x] Basic Auth funktioniert auf `dev.jonaswestphal.de`

> Die Middleware in `functions/_middleware.js` prueft den Hostnamen. Auf `www.jonaswestphal.de` und `jonaswestphal.de` wird **kein** Auth verlangt. Auf allen anderen Hosts greift Basic Auth.

### Production Domain (erst beim Go-Live)

10. [ ] **Custom Domain** `www.jonaswestphal.de` hinzufuegen (erst wenn du die bestehende Seite abloesen willst)
11. [ ] DNS-Eintraege bei Cloudflare konfigurieren (CNAME fuer `www` → Pages-Projekt)
12. [ ] Optional: Redirect von `jonaswestphal.de` (ohne www) auf `www.jonaswestphal.de` einrichten

---

## 4. GitHub Secrets fuer CI/CD

### Cloudflare API Token erstellen

1. [x] Im Cloudflare Dashboard: **My Profile** → **API Tokens** → **Create Token**
2. [x] Template **Edit Cloudflare Workers** auswaehlen
3. [x] Berechtigungen: Account/Cloudflare Pages/Edit, Account/Workers Scripts/Edit, Zone/Workers Routes/Edit
4. [x] Token erstellen und kopieren

### In GitHub hinterlegen

5. [x] `CLOUDFLARE_API_TOKEN` als **GitHub Repository Secret** hinterlegt
6. [x] `CLOUDFLARE_ACCOUNT_ID` als **GitHub Repository Secret** hinterlegt

---

## 5. Cloudflare Turnstile (Bot-Schutz)

1. [x] Im Cloudflare Dashboard: **Turnstile** → **Add Widget** erstellt
2. [x] Domains hinzugefuegt: `www.jonaswestphal.de`, `dev.jonaswestphal.de`, `localhost`, `jonaswestphal-de.pages.dev`
3. [ ] **Site Key** in `src/components/Contact.astro` — **PROBLEM: Error 400020 (Invalid sitekey)**
   - Aktuell: Test-Key `1x00000000000000000000AA` eingesetzt zur Diagnose
   - Dein Key `0x4AAAAAADHJ7JtBo-u2Hran` verursacht 400020
   - **Naechster Schritt:** Pruefen ob Test-Key funktioniert. Falls ja: neues Turnstile Widget erstellen und neuen Key verwenden
4. [x] **Secret Key** im Worker als Secret hinterlegt (`TURNSTILE_SECRET_KEY`)

> **Empfehlung:** Turnstile Secret Key im Dashboard rotieren, da er einmal im Chat sichtbar war.

---

## 6. Amazon SES (E-Mail-Versand)

### 6a. Domain verifizieren

1. [x] AWS SES Console (Region: `eu-central-1`) → Domain `jonaswestphal.de` verifiziert
2. [x] DKIM DNS Records (3x CNAME) bei Cloudflare eingetragen (Proxy: DNS only)
3. [x] Domain-Status: Verified

### 6b. Sandbox-Modus

4. [x] Empfaenger-E-Mail `business@jonaswestphal.de` verifiziert (oder Production Access beantragt)

### 6c. IAM User erstellen

5. [x] IAM User `jonaswestphal-contact-worker` erstellt
6. [x] Policy `SES-SendEmail-jonaswestphal` mit `ses:SendEmail` + `ses:SendRawEmail` angehaengt

### 6d. Access Keys

7. [x] Access Key ID und Secret Access Key erstellt

### 6e. Credentials als Worker Secrets

8. [x] `AWS_ACCESS_KEY_ID` im Worker als Secret hinterlegt
9. [x] `AWS_SECRET_ACCESS_KEY` im Worker als Secret hinterlegt

### 6f. Konfiguration

10. [x] `worker/wrangler.toml` pruefen:
    - `EMAIL_TO` = `business@jonaswestphal.de`
    - `EMAIL_FROM` = `business@jonaswestphal.de`
    - `AWS_REGION` = `eu-central-1`

---

## 7. Cloudflare KV Namespace (Rate Limiting)

1. [x] KV Namespace erstellt: `contact-form-worker-RATE_LIMIT`
2. [x] Namespace ID in `worker/wrangler.toml` eingetragen: `dc929f39eca149b1afb2bc7b4b2be8d4`

---

## 8. Worker deployen

1. [x] Worker erstmalig via `npx wrangler deploy` deployed
2. [ ] Custom Domain fuer Worker einrichten: `contact.jonaswestphal.de`
   - Cloudflare Dashboard → Workers & Pages → `contact-form-worker` → Settings → Triggers → Custom Domains
   - `contact.jonaswestphal.de` hinzufuegen
3. [ ] Endpoint testen:
   ```bash
   curl -X POST https://contact.jonaswestphal.de/api/contact \
     -H "Content-Type: application/json" \
     -H "Origin: https://www.jonaswestphal.de" \
     -d '{"name":"Test","email":"test@example.com","message":"Test","cf-turnstile-response":"test"}'
   ```
   Erwartete Antwort: `403` (Turnstile schlaegt fehl, aber Worker antwortet)

---

## 9. Google Analytics (GA4)

1. [x] Google Analytics 4 Property erstellt
2. [x] Measurement ID: `G-WP95NLRJ61`
3. [x] Measurement ID in beiden Dateien eingetragen:
   - `src/layouts/Layout.astro` ✅
   - `src/components/CookieConsent.astro` ✅
4. [ ] In GA4 Einstellungen:
   - **Google Signals**: Deaktivieren
   - **Datenspeicherung**: Auf 2 Monate setzen --> ERLEDIGT
   - **Anzeigenpersonalisierung**: Deaktivieren

---

## 10. Google Search Console

1. [ ] [Google Search Console](https://search.google.com/search-console/) → Domain `jonaswestphal.de` hinzufuegen
2. [ ] DNS-Verifizierung: TXT-Record bei Cloudflare anlegen
3. [ ] Sitemap einreichen: `https://www.jonaswestphal.de/sitemap-index.xml`

---

## 11. Dev-Preview testen

1. [ ] Auf `dev` Branch pushen → GitHub Actions pruefen
2. [ ] `dev.jonaswestphal.de` aufrufen → Basic Auth Dialog muss erscheinen
3. [ ] Nach Login pruefen:
   - [ ] Deutsche Startseite laedt korrekt
   - [ ] Englische Seite unter `/en/` erreichbar
   - [ ] Sprachwechsler funktioniert
   - [ ] Dark/Light Mode Toggle funktioniert
   - [ ] Cookie-Banner erscheint beim ersten Besuch
   - [ ] Impressum und Datenschutz erreichbar
   - [ ] 404-Seite bei ungueltigem Pfad
   - [ ] Mobile Navigation (Hamburger-Menue)
   - [ ] Kontaktformular: Turnstile-Widget wird angezeigt
   - [ ] Kontaktformular: Test-Nachricht absenden → E-Mail muss ankommen
   - [ ] Kontaktformular: Weiterleitung zur Danke-Seite

---

## 12. Go-Live: Bestehende Website abloesen

1. [ ] Custom Domain `www.jonaswestphal.de` im Pages-Projekt hinzufuegen
2. [ ] DNS umstellen (CNAME `www` → Pages-Projekt)
3. [ ] Alte Website deaktivieren
4. [ ] `dev` Branch in `main` mergen → automatisches Production Deployment
5. [ ] `www.jonaswestphal.de` aufrufen und finalen Check durchfuehren
6. [ ] Google Search Console Sitemap einreichen

---

## 13. Optional: Cloudflare Web Analytics

1. [ ] Im Cloudflare Dashboard: **Analytics & Logs** → **Web Analytics** → Domain aktivieren
2. [ ] Cookieless, keine Einwilligung noetig (DSGVO-konform)

---

## Zusammenfassung der Platzhalter im Code

| Datei | Platzhalter | Status |
|-------|------------|--------|
| `src/components/Contact.astro` | Turnstile Site Key | ⚠️ Test-Key aktiv, Production Key verursacht 400020 |
| `src/layouts/Layout.astro` | GA4 Measurement ID | ✅ `G-WP95NLRJ61` eingetragen |
| `src/components/CookieConsent.astro` | GA4 Measurement ID | ✅ `G-WP95NLRJ61` eingetragen |
| `worker/wrangler.toml` | KV Namespace ID | ✅ Eingetragen |
| `src/pages/impressum.astro` | Postanschrift | ⬜ Fehlt |
| `src/pages/en/impressum.astro` | Postal address | ⬜ Fehlt |
| `src/pages/datenschutz.astro` | Postanschrift | ⬜ Fehlt |
| `src/pages/en/privacy.astro` | Postal address | ⬜ Fehlt |

## Worker Secrets (im Cloudflare Dashboard gesetzt)

| Secret | Status |
|--------|--------|
| `TURNSTILE_SECRET_KEY` | ✅ Gesetzt |
| `AWS_ACCESS_KEY_ID` | ✅ Gesetzt |
| `AWS_SECRET_ACCESS_KEY` | ✅ Gesetzt |

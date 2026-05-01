# Jonas Westphal – IT & Cloud Solutions

> Corporate website for [www.jonaswestphal.de](https://www.jonaswestphal.de) — bilingual (DE/EN), GDPR-compliant, statically generated.

![Astro](https://img.shields.io/badge/Astro_6-FF5D01?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-95_passing-brightgreen)

---

## Overview

A professional one-page marketing site for IT consulting, automation, and managed hosting services. Built with Astro 6, Tailwind CSS v4, and Starwind UI. Hosted on Cloudflare Pages with a Cloudflare Worker backend for the contact form.

### Key Features

- 🌐 **Bilingual** — German (default) and English with Astro i18n routing
- 🌙 **Dark/Light Mode** — System preference detection + manual toggle
- 📬 **Contact Form** — Cloudflare Worker + Turnstile bot protection + rate limiting + Resend email
- 🍪 **GDPR/TTDSG Compliant** — Cookie consent banner, GA4 opt-in only, complete privacy policy
- 🔍 **SEO Optimized** — Sitemap, robots.txt, hreflang, JSON-LD structured data, Open Graph
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation, color contrast
- 🧪 **95 Tests** — Property-based testing (fast-check) + unit tests (Vitest)
- 🚀 **CI/CD** — GitHub Actions for deployment + Dependabot for dependency updates

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build/) (static site generation) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + [Starwind UI](https://starwind.dev/) |
| Language | TypeScript (strict mode) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) (free tier) |
| Contact API | [Cloudflare Workers](https://workers.cloudflare.com/) |
| Bot Protection | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) |
| Email | [Resend API](https://resend.com/) |
| Analytics | Google Analytics 4 (consent-gated) + Cloudflare Web Analytics (cookieless) |
| Testing | [Vitest](https://vitest.dev/) + [fast-check](https://github.com/dubzzz/fast-check) |
| CI/CD | GitHub Actions + Dependabot |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 22.12.0
- **pnpm** ≥ 10 (`corepack enable` to activate)

### Setup

```bash
# Clone the repository
git clone https://github.com/jonaswestphal/jonaswestphal.de.git
cd jonaswestphal.de

# Install frontend dependencies
pnpm install

# Install worker dependencies
cd worker && pnpm install && cd ..

# Start development server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Restore Dev Environment (from scratch)

If you're setting up on a new machine:

```bash
# 1. Ensure Node.js 22+ is installed
node --version  # should be ≥ 22.12.0

# 2. Enable corepack for pnpm
corepack enable

# 3. Install all dependencies
pnpm install
cd worker && pnpm install && cd ..

# 4. Run tests to verify everything works
pnpm test
cd worker && pnpm test && cd ..

# 5. Build to verify
pnpm build

# 6. Start dev server
pnpm dev
```

---

## Available Commands

### Frontend (root directory)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Astro dev server on port 4321 |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run frontend tests (Vitest) |

### Worker (`worker/` directory)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start local worker dev server |
| `pnpm test` | Run worker tests (Vitest) |
| `pnpm deploy` | Deploy worker to Cloudflare |

---

## Project Structure

```
├── src/
│   ├── components/          # Astro components (Hero, Services, FAQ, etc.)
│   │   └── starwind/        # Starwind UI primitives (managed by CLI)
│   ├── layouts/
│   │   └── Layout.astro     # Base layout (SEO, theme, analytics, header/footer)
│   ├── lib/
│   │   ├── content.ts       # All site text, organized by locale (de/en)
│   │   ├── i18n.ts          # Locale detection and path helpers
│   │   ├── types.ts         # TypeScript interfaces
│   │   └── __tests__/       # Frontend tests
│   ├── pages/
│   │   ├── index.astro      # German homepage (/)
│   │   ├── en/index.astro   # English homepage (/en/)
│   │   └── ...              # Legal pages, error pages, thank-you pages
│   └── styles/
│       └── starwind.css     # Design tokens + corporate identity
├── worker/                  # Cloudflare Worker (contact form backend)
│   ├── src/
│   │   ├── index.ts         # Entry point, CORS, routing
│   │   ├── validation.ts    # Form validation
│   │   ├── turnstile.ts     # Bot protection
│   │   ├── rate-limiter.ts  # KV-based rate limiting
│   │   ├── email.ts         # Resend API integration
│   │   └── __tests__/       # Worker tests
│   └── wrangler.toml        # Worker configuration
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   └── dependabot.yml       # Automated dependency updates
├── public/                  # Static assets (favicon, robots.txt, _headers)
└── astro.config.mjs         # Astro config (i18n, sitemap, Tailwind)
```

---

## Content Management

All text content lives in `src/lib/content.ts` — one typed object per locale. To update copy:

1. Edit the `de` or `en` object in `content.ts`
2. Run `pnpm test` to verify content completeness (property-based tests check all fields)
3. Run `pnpm build` to regenerate static pages

No CMS needed. Content changes trigger a rebuild via CI/CD on push to `main`.

---

## Deployment

### Cloudflare Pages (Website)

Deployed automatically via GitHub Actions on push to `main`:

1. Tests run
2. Astro builds static pages
3. `wrangler pages deploy` pushes to Cloudflare Pages

### Cloudflare Worker (Contact Form)

Deployed automatically when files in `worker/` change:

1. Worker tests run
2. `wrangler deploy` pushes to Cloudflare Workers

### Required Secrets (GitHub)

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages + Workers permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

### Required Worker Secrets (Wrangler)

```bash
wrangler secret put TURNSTILE_SECRET_KEY
wrangler secret put RESEND_API_KEY
```

---

## Testing

95 tests across frontend and worker:

```bash
# Frontend tests (57 tests)
pnpm test

# Worker tests (38 tests)
cd worker && pnpm test
```

### Property-Based Tests (fast-check)

| Property | What it verifies |
|----------|-----------------|
| Locale content completeness | Every text field in every locale is non-empty |
| i18n path roundtrip | `getLocalizedPath` → `getLocaleFromUrl` preserves locale |
| Timeline structure | Both locales have matching timeline entries |
| Form validation | Missing fields are correctly detected |
| Email validation | Valid/invalid emails are correctly classified |

---

## License

MIT — see [LICENSE.md](LICENSE.md)

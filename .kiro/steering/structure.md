# Project Structure

## Monorepo Layout
The project has two packages: the Astro frontend (root) and a Cloudflare Worker (`worker/`). Each has its own `package.json`, `tsconfig.json`, and test setup.

```
├── src/                        # Astro frontend source
│   ├── components/             # Astro components
│   │   ├── *.astro             # Page section components (Hero, Services, FAQ, etc.)
│   │   └── starwind/           # Starwind UI primitives (DO NOT edit manually)
│   │       ├── accordion/
│   │       ├── avatar/
│   │       ├── badge/
│   │       ├── button/
│   │       ├── card/
│   │       ├── input/
│   │       ├── label/
│   │       └── textarea/
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML layout (SEO, theme, analytics, header/footer)
│   ├── lib/                    # Shared logic
│   │   ├── content.ts          # All site text content, organized by locale (de/en)
│   │   ├── i18n.ts             # Locale detection and path localization helpers
│   │   ├── types.ts            # TypeScript interfaces for all content structures
│   │   └── __tests__/          # Frontend unit/property tests
│   ├── pages/                  # File-based routing
│   │   ├── index.astro         # German homepage (default locale, no prefix)
│   │   ├── en/index.astro      # English homepage (/en/)
│   │   ├── en/*.astro          # English sub-pages
│   │   ├── *.astro             # German sub-pages + error pages (404, 500)
│   └── styles/
│       └── starwind.css        # Tailwind config, theme tokens, base styles
├── public/                     # Static assets (favicon, robots.txt, etc.)
├── worker/                     # Cloudflare Worker (contact form backend)
│   ├── src/
│   │   ├── index.ts            # Worker entry point, CORS, request routing
│   │   ├── validation.ts       # Form input validation
│   │   ├── email.ts            # Resend API email sending
│   │   ├── turnstile.ts        # Cloudflare Turnstile verification
│   │   ├── rate-limiter.ts     # KV-based rate limiting
│   │   ├── webhook.ts          # Webhook dispatch
│   │   └── __tests__/          # Worker unit/property tests
│   ├── wrangler.toml           # Cloudflare Worker config
│   └── vitest.config.ts
├── astro.config.mjs            # Astro config (i18n, sitemap, Tailwind)
├── starwind.config.json        # Starwind UI component registry
└── tsconfig.json               # Root TypeScript config
```

## Architecture Patterns

### i18n
- German is the default locale, served at root paths (`/`, `/impressum`)
- English pages live under `src/pages/en/` and are served at `/en/`
- All translatable text lives in `src/lib/content.ts` as exported `de` and `en` objects
- Components receive a `locale` prop and call `getContent(locale)` to get text
- `src/lib/i18n.ts` provides `getLocaleFromUrl()` and `getLocalizedPath()` helpers

### Content Management
- No CMS or markdown content collections — all content is defined as typed TypeScript objects in `src/lib/content.ts`
- The `LocaleContent` interface in `src/lib/types.ts` is the single source of truth for content shape
- Legacy named exports at the bottom of `content.ts` provide backward compatibility

### Component Pattern
- Section components (`Hero.astro`, `Services.astro`, etc.) accept `locale` as a prop
- Pages compose section components and pass the locale through
- Starwind UI components are used for primitives (Button, Card, Input, etc.)
- Client-side interactivity uses inline `<script>` tags, not framework JS

### Worker Architecture
- Single endpoint: `POST /api/contact`
- Pipeline: CORS check → rate limit → validate → Turnstile verify → send email → webhooks
- Secrets managed via `wrangler secret put`

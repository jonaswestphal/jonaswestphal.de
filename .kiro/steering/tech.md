# Tech Stack & Build

## Frontend
- **Framework**: Astro 6 (static site generation, `.astro` components)
- **Language**: TypeScript (strict mode, extends `astro/tsconfigs/strict`)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` plugin, with `@tailwindcss/forms`
- **UI Components**: Starwind UI (Astro-native component library in `src/components/starwind/`)
- **CSS Utilities**: `tailwind-merge`, `tailwind-variants`, `tw-animate-css`
- **Icons**: `@tabler/icons`
- **Color System**: OKLCH-based CSS custom properties with light/dark theme support

## Backend (Contact Form Worker)
- **Runtime**: Cloudflare Workers
- **Tooling**: Wrangler CLI
- **Email**: Resend API
- **Bot Protection**: Cloudflare Turnstile
- **Rate Limiting**: Cloudflare KV
- **Webhooks**: Optional fire-and-forget webhook dispatch

## Testing
- **Runner**: Vitest (both frontend and worker)
- **Property-Based Testing**: fast-check
- **Pattern**: Tests use `fc.assert` with `fc.property` and `{ numRuns: 100 }`
- **Test location**: Co-located `__tests__/` directories (`src/lib/__tests__/`, `worker/src/__tests__/`)

## Package Management
- **Manager**: pnpm (v10, pinned via `packageManager` field)
- **Config**: `auto-install-peers=true`, `node-linker=hoisted`

## Path Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json`)

## Common Commands

### Frontend
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Astro dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run frontend tests (`vitest run`) |

### Worker (`worker/` directory)
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start local worker dev server |
| `pnpm deploy` | Deploy worker to Cloudflare |
| `pnpm test` | Run worker tests (`vitest run`) |

## Key Conventions
- ESM throughout (`"type": "module"`)
- No React or other JS framework — pure Astro components with inline `<script>` for client interactivity
- Starwind components should not be manually edited; they are managed by the Starwind CLI
- Worker is a separate package with its own `node_modules` and `pnpm-lock.yaml`

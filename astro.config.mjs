import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jonaswestphal.de",
  integrations: [sitemap()],

  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "copy-functions",
        closeBundle: {
          sequential: true,
          async handler() {
            const fs = await import("node:fs");
            const path = await import("node:path");
            const src = path.resolve("functions/_middleware.js");
            const destDir = path.resolve("dist/functions");
            const dest = path.resolve("dist/functions/_middleware.js");
            if (fs.existsSync(src)) {
              fs.mkdirSync(destDir, { recursive: true });
              fs.copyFileSync(src, dest);
            }
          },
        },
      },
    ],
  },

  adapter: cloudflare(),
});
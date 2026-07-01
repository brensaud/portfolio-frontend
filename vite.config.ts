import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // Load .env files from envs/ instead of the project root.
  // envs/.env.dev, envs/.env.uat, envs/.env.prod are gitignored.
  // envs/.env.example is committed as a reference template.
  envDir: './envs',
  plugins: [
    react(),
    // Tailwind v4 Vite plugin — replaces the PostCSS approach used in v3.
    // No tailwind.config.ts needed; tokens are defined in src/styles/globals.css.
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Allow `@/` imports from anywhere in the project.
      // Must match the `paths` setting in tsconfig.app.json.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

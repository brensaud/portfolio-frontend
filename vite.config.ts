import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
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

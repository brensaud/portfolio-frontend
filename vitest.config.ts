import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],

  test: {
    // Makes describe, it, expect, etc. available globally (no explicit imports).
    globals: true,

    // Use jsdom to simulate the browser DOM environment for React component tests.
    environment: 'jsdom',

    // Runs before every test file — imports @testing-library/jest-dom matchers.
    setupFiles: ['./src/test/setup.ts'],

    // Only collect unit and component tests with Vitest.
    // Playwright E2E tests in __tests__/e2e/ are excluded (they run separately).
    include: [
      '__tests__/unit/**/*.test.{ts,tsx}',
      '__tests__/components/**/*.test.{ts,tsx}',
      'src/**/*.test.{ts,tsx}',
    ],
    exclude: ['__tests__/e2e/**', 'node_modules', 'dist'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // 80% threshold enforced in CI (see .github/workflows/ci.yml)
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/**',
        '__tests__/e2e/**',
        // Route config doesn't need unit test coverage
        'src/routes/**',
        // Page-level components are covered by E2E tests
        'src/pages/**',
      ],
    },
  },

  resolve: {
    alias: {
      // Must match the `paths` in tsconfig.app.json
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

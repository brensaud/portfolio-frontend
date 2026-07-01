import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for end-to-end tests.
 *
 * Tests live in __tests__/e2e/ and use the .spec.ts suffix.
 * The web server is started automatically by Playwright before tests run.
 *
 * Run E2E tests:
 *   pnpm test:e2e          — run all E2E tests in headless mode
 *   pnpm test:e2e:ui       — open the Playwright interactive UI
 *   pnpm test:e2e:install  — install browser binaries (required once)
 */
export default defineConfig({
  testDir: './__tests__/e2e',
  fullyParallel: true,
  // Fail the build on CI if test.only is accidentally committed
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env['PLAYWRIGHT_BASE_URL'] ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    // Uncomment to add more browsers in Phase 12 (deployment verification):
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],

  webServer: {
    // Starts the Vite dev server before tests run.
    // In CI, a production build is served instead (see .github/workflows/ci.yml).
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    // Reuse an already-running server in local development
    reuseExistingServer: !process.env['CI'],
    stdout: 'ignore',
    stderr: 'pipe',
  },
})

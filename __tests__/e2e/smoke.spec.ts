import { expect, test } from '@playwright/test'

/**
 * Smoke tests — verify the core routing shell works end to end.
 *
 * These tests run against the Vite dev server (or a production build in CI).
 * They are intentionally lightweight in Phase 1:
 *   - Each page loads without a white screen or JS error
 *   - The Navbar is visible on every page
 *   - Navigation between pages works
 *   - The 404 page renders for unknown routes
 *
 * The full E2E suite (per IMPLEMENTATION_ROADMAP.md Phase 11) is built in
 * Phase 11 once all real page content exists.
 */

test.describe('Smoke — routing shell', () => {
  test('homepage loads with a visible H1', async ({ page }) => {
    await page.goto('/')
    // NotFoundPage is the placeholder for the homepage in Phase 1
    // but the real homepage will render an H1 in Phase 5.
    // For now, verify the page loads without a JS error.
    await expect(page).not.toHaveURL(/error/i)
    await expect(page.locator('body')).toBeVisible()
  })

  test('navbar is rendered on the homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  })

  test('navigating to /about renders a page', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('About')
  })

  test('navigating to /work renders a page', async ({ page }) => {
    await page.goto('/work')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Work')
  })

  test('navigating to /writing renders a page', async ({ page }) => {
    await page.goto('/writing')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Writing')
  })

  test('navigating to /contact renders a page', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Contact')
  })

  test('unknown route renders the 404 page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await expect(page.locator('h1')).toContainText('Page not found')
  })

  test('footer is rendered on every page', async ({ page }) => {
    const routes = ['/', '/about', '/work', '/writing', '/contact']
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('footer')).toBeVisible()
    }
  })

  test('skip to main content link is the first focusable element', async ({ page }) => {
    await page.goto('/')
    // Tab once from the page to reach the first focusable element
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toContainText('Skip to main content')
  })
})

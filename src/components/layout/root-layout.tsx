import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Navbar } from './navbar'
import { Footer } from './footer'

/**
 * RootLayout wraps every page in the application.
 *
 * Responsibilities:
 * - Renders the persistent Navbar and Footer
 * - Provides the <main> landmark with the skip-navigation target id
 * - Renders <Outlet /> where child route pages appear
 * - Includes <ScrollRestoration /> to scroll to top on route change
 *
 * Phase 2 additions:
 * - ThemeProvider wrapping (move to src/app/providers.tsx)
 * - Frosted navbar scroll behavior (useScrollPosition hook)
 * - Availability badge pulse in Navbar
 */
export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-text-primary">
      {/* Skip to main content — required for keyboard and screen reader users.
          Visually hidden until focused. Defined in globals.css @layer base. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* pt-[60px] offsets the fixed navbar height (60px) so page content
          starts below it rather than being obscured. */}
      <main
        id="main-content"
        className="flex flex-1 flex-col pt-[60px]"
        // tabIndex allows focus to be programmatically moved to main content
        // after the skip link is activated.
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <Footer />

      {/* Restores scroll position to top on every client-side navigation. */}
      <ScrollRestoration />
    </div>
  )
}

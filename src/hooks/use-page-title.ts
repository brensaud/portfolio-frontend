/**
 * usePageTitle — sets the browser tab title for the current page.
 *
 * Appends the site name after a separator so every tab reads:
 *   "Page Title | Brendan Saud"
 *
 * The base title (just the site name) is used when no page title is passed.
 * React Router does not manage document.title, so this hook bridges the gap
 * until we migrate to a framework (e.g. Next.js) that handles it natively.
 *
 * @example
 *   // In a page component:
 *   usePageTitle('About')
 *   // → document.title = 'About | Brendan Saud'
 *
 *   usePageTitle() // on the home page — just the site name
 *   // → document.title = 'Brendan Saud'
 */
import { useEffect } from 'react'
import { SITE_META } from '@/constants/site'

export function usePageTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE_META.name}` : SITE_META.name
    return () => {
      // Restore site name on unmount so navigating back to a page that
      // doesn't call usePageTitle doesn't carry over the previous title.
      document.title = SITE_META.name
    }
  }, [pageTitle])
}

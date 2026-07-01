import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/use-page-title'
import { ROUTES } from '@/constants/routes'

/**
 * NotFoundPage — rendered for unmatched routes and runtime errors.
 *
 * This is a real page (not a placeholder) — 404 handling is required
 * from Phase 1 onward.
 *
 * Phase 8 addition: replace the errorElement usage with a dedicated
 * ErrorPage for runtime errors, leaving this page for 404s only.
 */
export function NotFoundPage() {
  usePageTitle('404 – Page Not Found')
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 py-24">
      {/* Status code */}
      <p
        className="text-8xl font-bold tabular-nums text-accent opacity-20"
        aria-hidden="true"
      >
        404
      </p>

      <h1 className="mt-6 text-2xl font-semibold text-text-primary">Page not found</h1>

      <p className="mt-3 max-w-sm text-center text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      {/* Recovery links */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          to={ROUTES.HOME}
          className="rounded-md bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Go to home
        </Link>
        <Link
          to={ROUTES.WORK}
          className="text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          Browse projects →
        </Link>
      </div>
    </div>
  )
}

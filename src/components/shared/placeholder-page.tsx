import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/use-page-title'
import { ROUTES } from '@/constants/routes'

interface PlaceholderPageProps {
  /** The page name displayed in the H1. */
  title: string
  /** Short description of what this page will contain. */
  description: string
  /** The phase in which this page will be fully implemented. */
  implementedInPhase?: number
}

/**
 * PlaceholderPage — a development scaffold for pages not yet implemented.
 *
 * Used exclusively during Phase 1. Every placeholder page is replaced with
 * real content in the phase listed in `implementedInPhase`.
 *
 * This component will be deleted when the last placeholder page is replaced.
 */
export function PlaceholderPage({
  title,
  description,
  implementedInPhase,
}: PlaceholderPageProps) {
  usePageTitle(title)
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 py-24">
      {/* Phase badge */}
      {implementedInPhase !== undefined && (
        <span className="mb-6 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-tertiary">
          Implemented in Phase {implementedInPhase}
        </span>
      )}

      <h1 className="text-4xl font-bold tracking-tight text-text-primary">{title}</h1>

      <p className="mt-4 max-w-md text-center text-text-secondary">{description}</p>

      <Link
        to={ROUTES.HOME}
        className="mt-8 text-sm text-accent underline-offset-4 hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  )
}

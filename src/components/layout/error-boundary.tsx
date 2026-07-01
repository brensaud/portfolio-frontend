/**
 * ErrorBoundary — catches unexpected JavaScript errors in the React tree
 * and renders a fallback UI instead of a blank / crashed page.
 *
 * React Error Boundaries must be class components (as of React 19) because
 * they rely on componentDidCatch and getDerivedStateFromError lifecycle methods
 * that have no Hook equivalent yet.
 *
 * Usage:
 *   Wrap any subtree where you want errors caught:
 *
 *     <ErrorBoundary>
 *       <SomethingThatMightThrow />
 *     </ErrorBoundary>
 *
 *   The root error boundary is registered in routes/index.tsx via
 *   `errorElement: <RootErrorBoundary />` on the root route.
 *
 * React Router's errorElement prop handles route-level errors (loader errors,
 * action errors). This class component handles render-time errors from
 * child components that React Router cannot catch.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { SITE_META } from '@/constants/site'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ErrorBoundaryProps {
  children: ReactNode
  /** Custom fallback UI. Receives the caught error for display. */
  fallback?: (error: Error) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

// ─── Default Fallback ─────────────────────────────────────────────────────────

function DefaultFallback({ error }: { error: Error | null }) {
  return (
    <div
      role="alert"
      className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-text-tertiary">
        Unexpected Error
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-md text-text-secondary">
        An unexpected error occurred. The issue has been noted. Please try refreshing the page or
        navigating home.
      </p>

      {/* Show the error message in development only */}
      {import.meta.env.DEV && error && (
        <pre className="mt-6 max-w-lg overflow-auto rounded-md border border-error/30 bg-error/5 p-4 text-left text-xs text-error">
          {error.message}
        </pre>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Refresh page
        </button>
        <Link
          to={ROUTES.HOME}
          className="rounded-md border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Go home
        </Link>
      </div>

      <p className="mt-12 text-xs text-text-muted">
        {SITE_META.name}
      </p>
    </div>
  )
}

// ─── ErrorBoundary ────────────────────────────────────────────────────────────

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production, forward to an error tracking service (e.g. Sentry).
    // The `info.componentStack` trace is valuable for debugging.
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback
        ? this.props.fallback(this.state.error!)
        : <DefaultFallback error={this.state.error} />
    }
    return this.props.children
  }
}

// ─── RootErrorBoundary ────────────────────────────────────────────────────────

/**
 * RootErrorBoundary — the application-level error boundary registered in
 * routes/index.tsx as the `errorElement` on the root route.
 *
 * React Router's errorElement prop receives React Router errors (loader failures,
 * action failures, thrown responses). For render-time component crashes, wrap the
 * problematic subtree in <ErrorBoundary> directly.
 */
export function RootErrorBoundary() {
  return <DefaultFallback error={null} />
}

/**
 * RequireAdmin — protected route wrapper.
 *
 * Renders children only when the admin is authenticated.
 * While the session check is in-flight (status === 'loading'), a full-screen
 * spinner is shown to prevent the login page from flashing.
 * On 'unauthenticated', redirects to /admin/login, preserving the current
 * location in `state.from` so the login page can redirect back after success.
 *
 * Usage in route config:
 *   {
 *     element: <RequireAdmin><AdminLayout /></RequireAdmin>,
 *     children: [ ... ]
 *   }
 */

import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'
import { ADMIN_ROUTES } from '@/constants/routes'

interface RequireAdminProps {
  children: ReactNode
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { status } = useAdminAuth()
  const location = useLocation()

  if (status === 'loading') {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background"
        aria-label="Checking authentication…"
        role="status"
      >
        <Loader2
          className="h-8 w-8 animate-spin text-accent"
          aria-hidden="true"
        />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    // Preserve current location so login can redirect back after success.
    // Stored in router state (memory only) — never in URL params.
    return (
      <Navigate
        to={ADMIN_ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    )
  }

  return <>{children}</>
}

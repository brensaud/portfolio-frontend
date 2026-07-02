/**
 * AdminLoginPage — the public-facing admin sign-in page at /admin/login.
 *
 * If the user is already authenticated, redirects straight to /admin/dashboard.
 * While the session check is pending, shows a loading state (handled by the
 * parent RequireAdmin guard — but the login page itself also checks to avoid
 * rendering the form while a valid session exists).
 *
 * Layout: full-screen centered card — no public navbar or footer.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { AdminLoginForm } from '@/features/admin/auth/login-form'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'
import { usePageTitle } from '@/hooks/use-page-title'
import { ADMIN_ROUTES } from '@/constants/routes'

export function AdminLoginPage() {
  usePageTitle('Admin Sign In')
  const { status } = useAdminAuth()
  const navigate = useNavigate()

  // If the session check resolves to authenticated, skip the login page.
  useEffect(() => {
    if (status === 'authenticated') {
      navigate(ADMIN_ROUTES.DASHBOARD, { replace: true })
    }
  }, [status, navigate])

  // Show nothing while the session check is in-flight — prevents a flash
  // of the login form for users who already have a valid cookie.
  if (status === 'loading') return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20">
              <Shield size={22} className="text-accent" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Admin Panel
          </h1>
          <p className="mt-1.5 text-sm text-text-secondary">
            Sign in to manage your portfolio.
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-md">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}

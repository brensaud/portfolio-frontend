/**
 * AdminDashboardPage — placeholder for the admin dashboard.
 *
 * Sprint 1 scope: shell only.
 * Future sprints will add dashboard widgets (contact message stats,
 * recent activity, system health, etc.).
 */

import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'
import { usePageTitle } from '@/hooks/use-page-title'

export function AdminDashboardPage() {
  usePageTitle('Admin Dashboard')
  const { admin } = useAdminAuth()

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
        Admin Panel
      </p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-text-primary">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Welcome back{admin ? `, ${admin.email}` : ''}.
      </p>
      <p className="mt-6 max-w-sm text-xs text-text-muted">
        Dashboard widgets will be added in upcoming sprints.
      </p>
    </div>
  )
}

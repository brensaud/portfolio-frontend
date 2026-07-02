/**
 * AdminNav — minimal top bar for the admin shell.
 *
 * Sprint 1 scope: shows the admin email and a Logout button.
 * Future sprints will add navigation links as admin sections are built.
 */

import { LogOut, Shield } from 'lucide-react'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'
import { Button } from '@/components/ui/button'

export function AdminNav() {
  const { admin, logout } = useAdminAuth()

  async function handleLogout() {
    await logout()
    // Navigation back to /admin/login is handled by RequireAdmin after the
    // context status transitions to 'unauthenticated'.
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-surface px-4 sm:px-6">
      {/* Brand */}
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <Shield size={16} className="text-accent" aria-hidden="true" />
        Admin
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Session info + logout */}
      <div className="flex items-center gap-4">
        {admin && (
          <span className="hidden text-xs text-text-tertiary sm:block">
            {admin.email}
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { void handleLogout() }}
          aria-label="Sign out of the admin panel"
        >
          <LogOut size={14} aria-hidden="true" />
          Sign out
        </Button>
      </div>
    </header>
  )
}

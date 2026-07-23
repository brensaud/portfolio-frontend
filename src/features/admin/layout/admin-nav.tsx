/**
 * AdminNav — top bar for the admin shell.
 *
 * Sprint 1 scope: brand + logout button.
 * Sprint 2: added Contact Messages navigation link.
 */

import { LogOut, Mail, PenLine, Shield } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'
import { Button } from '@/components/ui/button'
import { ADMIN_ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

export function AdminNav() {
  const { admin, logout } = useAdminAuth()

  async function handleLogout() {
    await logout()
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-border bg-surface px-4 sm:px-6">
      {/* Brand */}
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <Shield size={16} className="text-accent" aria-hidden="true" />
        Admin
      </div>

      {/* Nav links */}
      <nav className="ml-6 flex items-center gap-1" aria-label="Admin navigation">
        <NavLink
          to={ADMIN_ROUTES.CONTACT_MESSAGES}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
              isActive
                ? 'bg-surface-raised text-text-primary'
                : 'text-text-secondary hover:text-text-primary',
            )
          }
        >
          <Mail size={14} aria-hidden="true" />
          Messages
        </NavLink>
        <NavLink
          to={ADMIN_ROUTES.ARTICLES}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
              isActive
                ? 'bg-surface-raised text-text-primary'
                : 'text-text-secondary hover:text-text-primary',
            )
          }
        >
          <PenLine size={14} aria-hidden="true" />
          Articles
        </NavLink>
      </nav>

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

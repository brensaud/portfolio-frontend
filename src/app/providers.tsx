import { type ReactNode } from 'react'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { AdminAuthProvider } from '@/features/admin/auth/admin-auth-context'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Application-level providers.
 *
 * Wraps the entire application with global React context providers.
 * Keep this component free of UI — it renders only providers.
 *
 * Phase history:
 *   Phase 2: ThemeProvider added (dark/light mode)
 *   Sprint 1 Admin: AdminAuthProvider added (admin session state)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        {children}
      </AdminAuthProvider>
    </ThemeProvider>
  )
}

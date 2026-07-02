import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { AdminAuthProvider } from '@/features/admin/auth/admin-auth-context'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Singleton QueryClient.
 *
 * Configured with conservative defaults suitable for an admin panel:
 *   - staleTime 30s: admin data does not need real-time updates
 *   - retry 1: avoid hammering a struggling server on transient errors
 *   - refetchOnWindowFocus false: explicit refresh is preferred in admin UIs
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Application-level providers.
 *
 * Wraps the entire application with global React context providers.
 * Keep this component free of UI — it renders only providers.
 *
 * Phase history:
 *   Phase 2: ThemeProvider added (dark/light mode)
 *   Sprint 1 Admin: AdminAuthProvider added (admin session state)
 *   Sprint 2 Admin: QueryClientProvider + Toaster added
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          {children}
        </AdminAuthProvider>
        {/* Sonner toast container — rendered outside AdminAuthProvider so
            toasts are visible even during auth transitions. */}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast: 'font-sans text-sm',
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

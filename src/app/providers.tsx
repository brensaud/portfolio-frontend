import { type ReactNode } from 'react'
import { ThemeProvider } from '@/components/layout/theme-provider'

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
 *   Phase 5+: QueryClientProvider (if server state is needed)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>
}

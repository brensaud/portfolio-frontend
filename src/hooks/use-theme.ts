/**
 * useTheme — hook for accessing the current theme and toggle.
 *
 * Re-exports from ThemeProvider so consumers can import from a consistent
 * hooks path (`@/hooks/use-theme`) without reaching into the component tree.
 */
export { useTheme, type Theme } from '@/components/layout/theme-provider'

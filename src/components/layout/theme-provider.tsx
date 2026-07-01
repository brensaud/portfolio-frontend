/**
 * ThemeProvider — manages the dark/light theme preference.
 *
 * Architecture:
 *   - The <html> element's `data-theme` attribute is the single source of truth.
 *   - CSS in globals.css reads this attribute; no className toggling needed.
 *   - On first render, `resolveInitialTheme()` reads the attribute already set
 *     by the FOUC prevention script in index.html (synchronous, before paint).
 *   - `useEffect` keeps localStorage + the DOM attribute in sync with state.
 *
 * ⚠️  IMPORTANT: THEME_STORAGE_KEY must stay in sync with the localStorage key
 *     used in the inline script in index.html. Both MUST be 'portfolio-theme'.
 *
 * eslint-disable-file note:
 *   This file intentionally exports a React component (ThemeProvider), a hook
 *   (useTheme), and a constant (THEME_STORAGE_KEY). The react-refresh rule is
 *   suppressed because: (a) hooks and type exports are safe for HMR, and
 *   (b) splitting this module would break the encapsulation of ThemeContext.
 */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light'

interface ThemeContextValue {
  /** The current active theme. */
  theme: Theme
  /** Toggle between dark and light. */
  toggleTheme: () => void
  /** Explicitly set a theme. */
  setTheme: (theme: Theme) => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Must match the key used in the FOUC inline script in index.html.
 * Do NOT change this without updating both files simultaneously.
 */
export const THEME_STORAGE_KEY = 'portfolio-theme' as const

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Reads the current `data-theme` attribute from <html>.
 * The FOUC script in index.html sets this before React hydrates,
 * so this value is already correct on first render.
 * Falls back to 'dark' (the design system default) if unavailable.
 */
function resolveInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'light' ? 'light' : 'dark'
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Read from DOM (already set by FOUC script) rather than re-deriving from
  // localStorage + matchMedia, to guarantee consistency with what is painted.
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme)

  // Sync theme choice to DOM attribute + localStorage whenever it changes.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Silently ignore — localStorage may be blocked in private browsing.
    }
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Access the current theme and theme controls.
 * Must be used within a <ThemeProvider>.
 *
 * @example
 *   const { theme, toggleTheme } = useTheme()
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (ctx === null) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return ctx
}

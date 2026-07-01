/**
 * useReducedMotion — returns true if the user has requested reduced motion.
 *
 * Reads the `prefers-reduced-motion` media query and listens for changes.
 * Used by animation components to opt out of motion when requested.
 *
 * Note: Framer Motion (Phase 5) ships its own `useReducedMotion()` hook that
 * also responds to this preference. Use this hook for non-Framer animations
 * or when you need the boolean value in logic (e.g., to swap SVG paths).
 *
 * @example
 *   const reduced = useReducedMotion()
 *   return <div style={{ transition: reduced ? 'none' : 'transform 250ms' }} />
 */
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

    // addEventListener is supported in all modern browsers.
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return matches
}

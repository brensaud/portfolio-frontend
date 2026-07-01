/**
 * useScrollPosition — returns the current vertical scroll offset in pixels.
 *
 * Uses passive event listeners for zero performance overhead.
 * Debounced to a single requestAnimationFrame per scroll event.
 *
 * @example
 *   const scrollY = useScrollPosition()
 *   const isScrolled = scrollY > 80
 */
import { useEffect, useState } from 'react'

export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState<number>(
    typeof window === 'undefined' ? 0 : window.scrollY,
  )

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return scrollY
}

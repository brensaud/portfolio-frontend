import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/use-theme'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { NAV_ITEMS } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { SITE_META } from '@/constants/site'

/**
 * Navbar — persistent, accessible site navigation.
 *
 * Features:
 *   Desktop (md+):
 *     • Logo / site name → home
 *     • Primary nav links with active-state bottom-line indicator
 *     • Sun/Moon theme toggle
 *     • "Get in Touch" primary CTA
 *
 *   Mobile (<md):
 *     • Hamburger (Menu icon) — opens the mobile overlay
 *     • Full-screen overlay with all nav links + CTAs
 *     • Focus is trapped inside the overlay while open
 *     • Escape key closes; body scroll is locked while open
 *
 *   Scroll behaviour:
 *     • Transparent + no bottom border at the top of the page
 *     • Frosted glass (backdrop-blur + semi-transparent bg) after 80px scroll
 *     • Transition between states: 200ms ease
 *
 * Accessibility:
 *   • <header> landmark
 *   • <nav aria-label="Main navigation"> for desktop links
 *   • <nav aria-label="Mobile navigation"> for overlay links
 *   • Hamburger: aria-expanded, aria-controls, aria-label
 *   • Mobile overlay: role="dialog", aria-modal, aria-label
 *   • Escape closes mobile menu; body scroll locked while open
 *   • Focus trapped inside overlay (Tab / Shift+Tab cycle)
 *   • Focus moves to close button when menu opens
 *   • Reduced-motion: transitions shortened via globals.css
 */


// ─── Constants ────────────────────────────────────────────────────────────────

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

const SCROLL_THRESHOLD = 80 // px before frosted glass kicks in

// ─── MobileMenu ───────────────────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close on route change
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  // Lock body scroll + move focus to close button while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Defer to let the opacity transition begin before stealing focus
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 50)
      return () => window.clearTimeout(t)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap: Tab / Shift+Tab cycle stays inside the overlay
  useEffect(() => {
    if (!isOpen) return
    const overlay = overlayRef.current
    if (!overlay) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => !el.closest('[aria-hidden="true"]'))

      if (focusable.length === 0) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      // aria-hidden when closed so screen readers skip it
      aria-hidden={!isOpen}
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-background',
        'transition-opacity duration-[--duration-base]',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {/* Overlay header row */}
      <div className="flex h-[60px] shrink-0 items-center justify-between px-6">
        <Link
          to={ROUTES.HOME}
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          className="text-sm font-semibold text-text-primary"
        >
          {SITE_META.name}
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Close navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Nav links */}
      <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center px-6">
        <ul role="list" className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className={({ isActive }) =>
                  cn(
                    'flex items-center rounded-md px-4 py-3 text-lg font-medium',
                    'transition-colors duration-[--duration-fast]',
                    isActive
                      ? 'bg-accent-subtle text-text-primary'
                      : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="shrink-0 border-t border-border px-6 py-8">
        <div className="flex flex-col gap-3">
          <Link
            to={ROUTES.CONTACT}
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            className="flex h-12 items-center justify-center rounded-md bg-accent text-sm font-medium text-text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get in Touch
          </Link>
          <button
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              toggleTheme()
              onClose()
            }}
            className="flex h-12 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {theme === 'dark' ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
            {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const scrollY = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const isScrolled = scrollY > SCROLL_THRESHOLD

  // Return focus to the hamburger button when the mobile menu closes
  const handleClose = useCallback(() => {
    setMobileOpen(false)
    // Defer so the overlay's pointer-events are restored first
    window.setTimeout(() => hamburgerRef.current?.focus(), 50)
  }, [])

  // Close mobile menu when resizing to desktop (prevents orphaned open state)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50',
          'transition-[background-color,border-color,backdrop-filter] duration-[200ms] ease-[--ease-standard]',
          isScrolled
            ? 'border-b border-border-subtle bg-background/80 backdrop-blur-[16px] [--tw-bg-opacity:0.8]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-6"
        >
          {/* Logo — home link */}
          <Link
            to={ROUTES.HOME}
            className="text-sm font-semibold text-text-primary transition-opacity duration-[--duration-fast] hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm"
          >
            {SITE_META.name}
          </Link>

          {/* Desktop nav links */}
          <ul role="list" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'relative py-1 text-sm tracking-[0.01em] transition-colors duration-[--duration-fast]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm',
                      isActive
                        ? [
                            'font-medium text-text-primary',
                            // Active bottom-line indicator — flush with the bottom of the 60px nav bar
                            'after:absolute after:bottom-[-19px] after:left-0 after:right-0',
                            'after:h-px after:bg-accent after:opacity-100 after:transition-opacity after:duration-[--duration-fast]',
                          ]
                        : [
                            'text-text-tertiary hover:text-text-primary',
                            'after:absolute after:bottom-[-19px] after:left-0 after:right-0',
                            'after:h-px after:bg-accent after:opacity-0 after:transition-opacity after:duration-[--duration-fast]',
                          ],
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop right controls */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors duration-[--duration-fast] hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {theme === 'dark' ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </button>

            {/* Primary CTA */}
            <Link
              to={ROUTES.CONTACT}
              className="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-text-on-accent transition-colors duration-[--duration-fast] hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-overlay"
            aria-label="Open navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Mobile navigation overlay */}
      <div id="mobile-nav-overlay">
        <MobileMenu isOpen={mobileOpen} onClose={handleClose} />
      </div>
    </>
  )
}

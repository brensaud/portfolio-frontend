/**
 * Design system constants — typography, motion, layout, and breakpoints.
 * Source: VISUAL_DESIGN_SYSTEM.md
 *
 * These values mirror the CSS custom properties in globals.css.
 * Use them in TypeScript logic (e.g., Framer Motion variants) where
 * CSS variables are not accessible.
 */

// ─── Motion ───────────────────────────────────────────────────────────────────

/** Duration values in milliseconds. Mirror --duration-* tokens in globals.css. */
export const DURATION = {
  fast: 150,
  base: 250,
  slow: 400,
  slower: 600,
} as const

/** CSS cubic-bezier easing strings. Mirror --ease-* tokens in globals.css. */
export const EASING = {
  entrance: 'cubic-bezier(0.22, 1, 0.36, 1)',
  exit: 'cubic-bezier(0.55, 0, 1, 0.45)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /**
   * ⚠️  Spring easing is restricted to exactly 2 uses site-wide.
   * See SPRING_USAGE_REGISTER below.
   */
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const

/**
 * ⚠️  SPRING USAGE REGISTER
 * The spring easing must only be used in exactly 2 places across the codebase.
 * Overusing spring creates visual noise that undermines the technical aesthetic.
 * Add a key here when you use spring; remove it when you remove the usage.
 *
 * Allowed uses:
 *   1. Copy button success state (Phase 3)
 *   2. Contact form success check icon (Phase 6)
 */
export const SPRING_USAGE_REGISTER = [
  'copy-button-success',
  'contact-form-success-icon',
] as const

// ─── Animation Variants (Framer Motion) ──────────────────────────────────────
// These are typed as plain objects now. Framer Motion (Phase 5) will consume
// them directly as `MotionProps['variants']` — no casting needed.

export const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow / 1000,
      ease: [0.22, 1, 0.36, 1], // EASING.entrance as array for FM
    },
  },
} as const

export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.base / 1000,
      ease: [0.4, 0, 0.2, 1], // EASING.standard as array for FM
    },
  },
} as const

/** Stagger configuration for parent containers. */
export const STAGGER = {
  /** Delay between each child animation in seconds. */
  children: 0.08,
  /** Initial delay before the first child starts in seconds. */
  delayChildren: 0.1,
} as const

// ─── Breakpoints ──────────────────────────────────────────────────────────────

/**
 * Breakpoint values in pixels. Match Tailwind v4's default breakpoint scale.
 * Use these in JS/TS logic (e.g., ResizeObserver thresholds, Playwright tests).
 * For CSS, use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// ─── Layout ───────────────────────────────────────────────────────────────────

/**
 * Layout constants used for programmatic calculations.
 * The container max-width and navbar height are also encoded in component
 * class names — update both places if these values change.
 */
export const LAYOUT = {
  /** Height of the sticky navbar in pixels. Used for scroll offset calculations. */
  navbarHeight: 60,
  /** Max content width in rem. Matches `max-w-5xl` (64rem = 1024px). */
  contentWidth: '64rem',
} as const

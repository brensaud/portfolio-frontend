/**
 * Site-wide metadata constants.
 *
 * These are compile-time constants — not environment-dependent.
 * For environment-dependent values (site URL, API keys), see src/config/index.ts.
 *
 * TODO Phase 4: Replace placeholder values with real content.
 */
export const SITE_META = {
  name: 'Bren Saud',
  role: 'Python Backend Engineer',
  tagline: 'Building production-grade backend systems and AI products.',
  description:
    'Python Backend Engineer and AI systems builder. Writing about distributed systems, ' +
    'FastAPI, and engineering craft.',
  github: 'https://github.com/brensaud',
  linkedin: 'https://linkedin.com/in/username', // TODO: Replace with real LinkedIn
  email: 'hello@example.com', // TODO: Replace with real email
  twitterHandle: '@username', // TODO: Replace with real handle
} as const

/**
 * Availability status shown in the hero and nav.
 * This is the SINGLE SOURCE OF TRUTH — do not hardcode status elsewhere.
 *
 * Source: VISUAL_DESIGN_SYSTEM.md Section 5 / UI_SPECIFICATION.md Section 2
 */
export const AVAILABILITY_STATUS = 'available' as const
export type AvailabilityStatus = 'available' | 'limited' | 'unavailable'

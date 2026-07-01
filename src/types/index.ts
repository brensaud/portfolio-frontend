/**
 * Shared TypeScript types used across the application.
 *
 * Rule: only define types here if they are used in 2+ files.
 * Types that are specific to one feature live alongside that feature.
 *
 * TODO Phase 4: Expand with full content types (Project, Post, ResumeEntry)
 *              once the Velite content pipeline is set up.
 */

// ─── Utility types ────────────────────────────────────────────────────────────

/** Makes all properties of T optional recursively. */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

// ─── Availability ─────────────────────────────────────────────────────────────

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable'

// ─── Content (placeholder — expanded in Phase 4) ─────────────────────────────

/** Minimal project shape used by placeholder components. */
export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  featured: boolean
}

/** Minimal blog post shape used by placeholder components. */
export interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  path: string
}

export interface FooterLinkGroup {
  group: string
  links: NavItem[]
}

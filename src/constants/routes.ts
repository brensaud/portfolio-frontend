/**
 * Application route path constants.
 *
 * Use these everywhere a URL path is needed (Link, NavLink, navigate(), tests).
 * Never hardcode path strings outside this file.
 *
 * Paths begin with `/` so they can be used directly in <Link to={ROUTES.ABOUT}>.
 * React Router child route segments (without leading slash) are handled in
 * src/routes/index.tsx.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  WORK_DETAIL: '/work/:slug',
  ENGINEERING: '/engineering',
  WRITING: '/writing',
  WRITING_DETAIL: '/writing/:slug',
  RESUME: '/resume',
  CONTACT: '/contact',
  ARCHITECTURE: '/architecture',
  PROJECT_ARCHITECTURE: '/projects/:slug/architecture',
} as const

/**
 * Admin routes — private, behind HTTPOnly cookie auth.
 * These routes are served under a separate layout (no public navbar/footer).
 */
export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  CONTACT_MESSAGES: '/admin/contact-messages',
  ARTICLES: '/admin/articles',
  ROOT: '/admin',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

/** Returns the resolved URL for a project case study. */
export function workDetailPath(slug: string): string {
  return `/work/${slug}`
}

/** Returns the resolved URL for a writing article detail page. */
export function writingDetailPath(slug: string): string {
  return `/writing/${slug}`
}

/** Returns the resolved URL for a project architecture explorer. */
export function projectArchitecturePath(slug: string): string {
  return `/projects/${slug}/architecture`
}

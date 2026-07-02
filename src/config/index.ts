/**
 * Application configuration derived from environment variables.
 *
 * All environment variables must be defined in .env.local (local dev) and in
 * the Vercel project settings (preview and production). Every variable must
 * also have a corresponding entry in .env.example with a description.
 *
 * Variables prefixed with VITE_ are exposed to the browser bundle.
 * Never prefix secrets with VITE_.
 */
export const config = {
  /** The canonical site URL. Used for absolute links, OG images, and sitemaps. */
  siteUrl: import.meta.env['VITE_SITE_URL'] ?? 'http://localhost:5173',

  /** Display name for the site — can override the constant in constants/site.ts. */
  siteName: import.meta.env['VITE_SITE_NAME'] ?? 'Portfolio',

  /** True when running in the Vite development server. */
  isDev: import.meta.env.DEV,

  /** True when running in a production build. */
  isProd: import.meta.env.PROD,

  /**
   * Base URL for the public portfolio API.
   * Set VITE_API_BASE_URL in .env.local / Vercel environment settings.
   */
  apiBase: (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? 'http://localhost:8000',

  /**
   * Base URL for the private admin API.
   * Defaults to the same origin as the public API.
   * Override with VITE_ADMIN_API_BASE_URL if the admin API is hosted separately.
   */
  adminApiBase: (import.meta.env['VITE_ADMIN_API_BASE_URL'] as string | undefined)
    ?? (import.meta.env['VITE_API_BASE_URL'] as string | undefined)
    ?? 'http://localhost:8000',
} as const

export type Config = typeof config

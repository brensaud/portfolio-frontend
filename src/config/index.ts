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
} as const

export type Config = typeof config

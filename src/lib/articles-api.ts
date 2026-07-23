/**
 * Public articles API client.
 *
 * Fetches published articles from GET /api/v1/articles.
 * No authentication required — these are publicly visible endpoints.
 *
 * Base URL: config.apiBase → VITE_API_BASE_URL → http://localhost:8000
 *
 * Error handling:
 *   ArticleApiError  — non-2xx response
 *   ArticleNetworkError — fetch() threw (offline, CORS failure)
 */

import { config } from '@/config'

const BASE = config.apiBase

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleStatus = 'draft' | 'published' | 'archived'

/** Compact shape returned by the list endpoint — no body. */
export interface ArticleListItem {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  tags: string[]
  reading_time_minutes: number | null
  featured: boolean
  published_at: string // ISO 8601
  updated_at: string   // ISO 8601
}

/** Full shape returned by the detail endpoint — includes Markdown body. */
export interface ArticleDetail extends ArticleListItem {
  body: string | null
}

/** Pagination envelope from GET /api/v1/articles. */
export interface ArticlesPage {
  items: ArticleListItem[]
  total: number
  page: number
  page_size: number
  pages: number
}

export interface ArticlesQuery {
  page?: number
  page_size?: number
  category?: string
  featured?: boolean
}

// ─── Error classes ────────────────────────────────────────────────────────────

export class ArticleApiError extends Error {
  readonly status: number
  constructor(status: number, detail: string) {
    super(detail)
    this.name = 'ArticleApiError'
    this.status = status
  }
}

export class ArticleNetworkError extends Error {
  constructor(cause?: unknown) {
    super('Unable to reach the server. Check your connection.')
    this.name = 'ArticleNetworkError'
    if (cause instanceof Error) this.cause = cause
  }
}

// ─── Internal fetch helper ────────────────────────────────────────────────────

async function apiFetch(path: string): Promise<Response> {
  let response: Response
  try {
    response = await fetch(`${BASE}${path}`, {
      headers: { Accept: 'application/json' },
    })
  } catch (err) {
    throw new ArticleNetworkError(err)
  }

  if (!response.ok) {
    let detail = 'An unexpected error occurred.'
    try {
      const body = await response.json() as { detail?: string }
      if (typeof body.detail === 'string') detail = body.detail
    } catch { /* non-JSON body */ }
    throw new ArticleApiError(response.status, detail)
  }

  return response
}

// ─── Public endpoints ─────────────────────────────────────────────────────────

/**
 * GET /api/v1/articles
 *
 * Returns published articles, newest first. Draft and archived are excluded.
 */
export async function getArticles(query: ArticlesQuery = {}): Promise<ArticlesPage> {
  const params = new URLSearchParams()
  if (query.page != null) params.set('page', String(query.page))
  if (query.page_size != null) params.set('page_size', String(query.page_size))
  if (query.category) params.set('category', query.category)
  if (query.featured != null) params.set('featured', String(query.featured))

  const qs = params.toString()
  const res = await apiFetch(`/api/v1/articles${qs ? `?${qs}` : ''}`)
  return res.json() as Promise<ArticlesPage>
}

/**
 * GET /api/v1/articles/{slug}
 *
 * Returns the full article including Markdown body.
 * Returns ArticleApiError(404) if the article is not found or not published.
 */
export async function getArticle(slug: string): Promise<ArticleDetail> {
  const res = await apiFetch(`/api/v1/articles/${slug}`)
  return res.json() as Promise<ArticleDetail>
}

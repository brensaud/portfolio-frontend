/**
 * Admin API HTTP client.
 *
 * All requests use `credentials: 'include'` so the browser sends the
 * HTTPOnly access_token and refresh_token cookies automatically.
 *
 * NO token is ever read from JavaScript — the cookies are invisible to JS
 * by design (HttpOnly flag).  This module only inspects response status and
 * JSON body.
 *
 * Base URL: config.adminApiBase → VITE_ADMIN_API_BASE_URL (falls back to
 * VITE_API_BASE_URL, falls back to http://localhost:8000).
 *
 * Error model:
 *   AdminApiError  — non-2xx response with a JSON body
 *   AdminNetworkError — fetch() itself threw (offline, CORS failure, etc.)
 */

import { config } from '@/config'

const BASE = config.adminApiBase

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminInfo {
  email: string
  expires_at: string // ISO 8601
}

export interface LoginPayload {
  email: string
  password: string
}

// ─── Error classes ────────────────────────────────────────────────────────────

export class AdminApiError extends Error {
  readonly status: number
  readonly detail: string
  /** Seconds to wait before retrying — present on 429 responses. */
  readonly retryAfter: number | null

  constructor(status: number, detail: string, retryAfter: number | null = null) {
    super(detail)
    this.name = 'AdminApiError'
    this.status = status
    this.detail = detail
    this.retryAfter = retryAfter
  }
}

export class AdminNetworkError extends Error {
  constructor(cause?: unknown) {
    super('Unable to reach the server. Check your connection and try again.')
    this.name = 'AdminNetworkError'
    if (cause instanceof Error) this.cause = cause
  }
}

// ─── Internal fetch wrapper ───────────────────────────────────────────────────

async function adminFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  let response: Response
  try {
    response = await fetch(`${BASE}${path}`, {
      ...init,
      credentials: 'include',         // send HTTPOnly auth cookies
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(init.headers ?? {}),
      },
    })
  } catch (err) {
    throw new AdminNetworkError(err)
  }

  if (!response.ok) {
    const retryAfter = response.headers.get('Retry-After')
    let detail = 'An unexpected error occurred.'
    try {
      const body = await response.json() as { detail?: string }
      if (typeof body.detail === 'string') detail = body.detail
    } catch {
      // body was not JSON — keep the default message
    }
    throw new AdminApiError(response.status, detail, retryAfter ? Number(retryAfter) : null)
  }

  return response
}

// ─── Auth endpoints ───────────────────────────────────────────────────────────

/**
 * POST /admin/api/auth/login
 *
 * On success, the server sets access_token and refresh_token HTTPOnly cookies.
 * Returns the admin email and token expiry — safe to store in React state.
 */
export async function adminLogin(payload: LoginPayload): Promise<AdminInfo> {
  const res = await adminFetch('/admin/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return res.json() as Promise<AdminInfo>
}

/**
 * POST /admin/api/auth/logout
 *
 * Revokes the current session and clears auth cookies server-side.
 * Returns nothing on success (204).
 */
export async function adminLogout(): Promise<void> {
  await adminFetch('/admin/api/auth/logout', { method: 'POST' })
}

/**
 * GET /admin/api/auth/me
 *
 * Validates the access_token cookie and returns the current admin identity.
 * Returns null (instead of throwing) on 401 so callers can treat it as
 * "not authenticated" without needing try/catch.
 */
export async function adminMe(): Promise<AdminInfo | null> {
  try {
    const res = await adminFetch('/admin/api/auth/me')
    return res.json() as Promise<AdminInfo>
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 401) return null
    throw err
  }
}

/**
 * POST /admin/api/auth/refresh
 *
 * Exchanges the refresh_token cookie for a new access_token + refresh_token pair.
 * Returns the new expiry.  Returns null on 401 (session truly expired).
 */
export async function adminRefresh(): Promise<Pick<AdminInfo, 'expires_at'> | null> {
  try {
    const res = await adminFetch('/admin/api/auth/refresh', { method: 'POST' })
    return res.json() as Promise<Pick<AdminInfo, 'expires_at'>>
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 401) return null
    throw err
  }
}

// ─── Contact messages ─────────────────────────────────────────────────────────

export type ContactMessageStatus = 'unread' | 'read' | 'archived'

export type ContactMessageSort = 'created_at_desc' | 'created_at_asc'

/** Compact shape returned by the list endpoint (no message body). */
export interface AdminContactMessageSummary {
  id: string
  name: string
  email: string
  subject: string
  status: ContactMessageStatus
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

/** Full shape returned by the detail and mutation endpoints. */
export interface AdminContactMessageDetail extends AdminContactMessageSummary {
  message: string
  ip_address: string | null
  user_agent: string | null
}

/** Pagination envelope from GET /admin/api/contact-messages. */
export interface ContactMessagesPage {
  items: AdminContactMessageSummary[]
  total: number
  page: number
  page_size: number
  pages: number
}

export interface ContactMessagesQuery {
  page?: number
  page_size?: number
  status?: ContactMessageStatus | null
  search?: string
  sort?: ContactMessageSort
}

/**
 * GET /admin/api/contact-messages
 *
 * Returns a paginated, filtered list of contact messages.
 */
export async function adminGetContactMessages(
  query: ContactMessagesQuery = {},
): Promise<ContactMessagesPage> {
  const params = new URLSearchParams()
  if (query.page != null) params.set('page', String(query.page))
  if (query.page_size != null) params.set('page_size', String(query.page_size))
  if (query.status) params.set('status', query.status)
  if (query.search?.trim()) params.set('search', query.search.trim())
  if (query.sort) params.set('sort', query.sort)

  const qs = params.toString()
  const res = await adminFetch(`/admin/api/contact-messages${qs ? `?${qs}` : ''}`)
  return res.json() as Promise<ContactMessagesPage>
}

/**
 * GET /admin/api/contact-messages/{id}
 *
 * Fetches a single message.  Side-effect: auto-marks unread → read.
 */
export async function adminGetContactMessage(
  id: string,
): Promise<AdminContactMessageDetail> {
  const res = await adminFetch(`/admin/api/contact-messages/${id}`)
  return res.json() as Promise<AdminContactMessageDetail>
}

/**
 * PATCH /admin/api/contact-messages/{id}/read
 */
export async function adminMarkRead(id: string): Promise<AdminContactMessageDetail> {
  const res = await adminFetch(`/admin/api/contact-messages/${id}/read`, {
    method: 'PATCH',
  })
  return res.json() as Promise<AdminContactMessageDetail>
}

/**
 * PATCH /admin/api/contact-messages/{id}/unread
 */
export async function adminMarkUnread(id: string): Promise<AdminContactMessageDetail> {
  const res = await adminFetch(`/admin/api/contact-messages/${id}/unread`, {
    method: 'PATCH',
  })
  return res.json() as Promise<AdminContactMessageDetail>
}

/**
 * PATCH /admin/api/contact-messages/{id}/archive
 */
export async function adminArchiveMessage(id: string): Promise<AdminContactMessageDetail> {
  const res = await adminFetch(`/admin/api/contact-messages/${id}/archive`, {
    method: 'PATCH',
  })
  return res.json() as Promise<AdminContactMessageDetail>
}

/**
 * DELETE /admin/api/contact-messages/{id}
 *
 * Permanently deletes a message.  Returns nothing on success (204).
 */
export async function adminDeleteMessage(id: string): Promise<void> {
  await adminFetch(`/admin/api/contact-messages/${id}`, { method: 'DELETE' })
}

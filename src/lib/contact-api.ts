/**
 * Contact form API client.
 *
 * Abstracts all network communication for the contact form.
 * The base URL is read from VITE_API_BASE_URL (set in .env.local).
 * Falls back to http://localhost:8000 for local development.
 *
 * To point at a different environment:
 *   VITE_API_BASE_URL=https://api.yourportfolio.dev
 *
 * Error handling:
 *   - ApiError is thrown for non-2xx responses.
 *   - NetworkError is thrown for connection failures (offline, CORS, etc.).
 *
 * The `detail` field follows FastAPI's error format:
 *   - string  → single message (rate limit, server error)
 *   - array   → Pydantic validation errors (422)
 */

const API_BASE =
  (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ??
  'http://localhost:8000'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactPayload {
  name:    string
  email:   string
  subject: string
  message: string
}

export interface ContactSuccessResponse {
  id:           string
  message:      string
  reference_id: string
}

type ValidationDetail = { loc: string[]; msg: string; type: string }
type ErrorDetail      = string | ValidationDetail[]

export interface ContactErrorResponse {
  detail: ErrorDetail
}

// ─── Error classes ────────────────────────────────────────────────────────────

export class ApiError extends Error {
  readonly status: number
  readonly body:   ContactErrorResponse

  constructor(status: number, body: ContactErrorResponse) {
    const detail = body.detail
    super(
      typeof detail === 'string'
        ? detail
        : 'Please check your input and try again.',
    )
    this.name   = 'ApiError'
    this.status = status
    this.body   = body
  }

  /** True when the server returned a 429 rate-limit response. */
  get isRateLimit(): boolean {
    return this.status === 429
  }

  /** True when the server returned a 422 validation error. */
  get isValidation(): boolean {
    return this.status === 422
  }
}

export class NetworkError extends Error {
  constructor(cause?: unknown) {
    super('Unable to reach the server. Please check your connection.')
    this.name = 'NetworkError'
    if (cause instanceof Error) this.cause = cause
  }
}

// ─── API call ─────────────────────────────────────────────────────────────────

export async function submitContactMessage(
  payload: ContactPayload,
): Promise<ContactSuccessResponse> {
  let response: Response

  try {
    response = await fetch(`${API_BASE}/api/v1/contact/messages`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
  } catch (cause) {
    throw new NetworkError(cause)
  }

  if (!response.ok) {
    let body: ContactErrorResponse = { detail: 'An unexpected error occurred.' }
    try {
      body = (await response.json()) as ContactErrorResponse
    } catch {
      // JSON parse failure — keep the default detail
    }
    throw new ApiError(response.status, body)
  }

  return response.json() as Promise<ContactSuccessResponse>
}

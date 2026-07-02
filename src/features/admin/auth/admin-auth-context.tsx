/**
 * AdminAuthContext — global admin authentication state.
 *
 * State machine:
 *   loading       → checking session with GET /admin/api/auth/me on mount
 *   authenticated → /me returned a valid identity; admin object is populated
 *   unauthenticated → /me returned 401 or the user has logged out
 *
 * The context intentionally holds only what is safe to keep in JS memory:
 *   - email  (not a secret)
 *   - expiresAt (not a secret — it's already embedded in the JWT claims)
 *
 * The actual JWT never leaves the HTTPOnly cookie.  No token is stored here.
 *
 * Usage:
 *   const { admin, status, login, logout } = useAdminAuth()
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  adminLogin,
  adminLogout,
  adminMe,
  type AdminInfo,
  type LoginPayload,
} from '@/lib/admin-api'

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AdminIdentity {
  email: string
  expiresAt: Date
}

interface AdminAuthContextValue {
  /** Current authentication status. */
  status: AuthStatus
  /** Populated when status === 'authenticated'. */
  admin: AdminIdentity | null
  /**
   * Log in with email + password.
   * Throws AdminApiError on invalid credentials or rate-limit.
   * Throws AdminNetworkError on connection failure.
   * On success, updates status to 'authenticated'.
   */
  login: (payload: LoginPayload) => Promise<void>
  /**
   * Log out the current admin.
   * Clears cookies server-side and resets context to 'unauthenticated'.
   * Best-effort: always clears local state even if the network call fails.
   */
  logout: () => Promise<void>
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

function toIdentity(info: AdminInfo): AdminIdentity {
  return { email: info.email, expiresAt: new Date(info.expires_at) }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [admin, setAdmin] = useState<AdminIdentity | null>(null)

  // On mount: check if a valid session exists by calling GET /me.
  // This runs once when the app loads — it determines the initial auth state
  // before any protected route renders, preventing a flash to the login page.
  useEffect(() => {
    let cancelled = false

    adminMe()
      .then((info) => {
        if (cancelled) return
        if (info) {
          setAdmin(toIdentity(info))
          setStatus('authenticated')
        } else {
          setStatus('unauthenticated')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('unauthenticated')
      })

    return () => { cancelled = true }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const info = await adminLogin(payload)
    setAdmin(toIdentity(info))
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    try {
      await adminLogout()
    } finally {
      // Always clear local state — even if the network call fails.
      // The access token will expire naturally within its 15-min TTL.
      setAdmin(null)
      setStatus('unauthenticated')
    }
  }, [])

  const value = useMemo<AdminAuthContextValue>(
    () => ({ status, admin, login, logout }),
    [status, admin, login, logout],
  )

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Access admin authentication state and actions.
 *
 * Must be called inside <AdminAuthProvider>.
 */
export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) {
    throw new Error('useAdminAuth must be used inside <AdminAuthProvider>')
  }
  return ctx
}

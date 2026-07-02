/**
 * AdminLoginForm — controlled login form for the admin panel.
 *
 * Behaviour:
 *   - Client-side validation on submit (not on every keystroke, to avoid
 *     noise before the user has finished typing).
 *   - Calls useAdminAuth().login() on submit; on success navigates to the
 *     page stored in router location state (state.from) or /admin/dashboard.
 *   - Surfaces backend errors: 401 (invalid credentials), 429 (rate limited
 *     with Retry-After countdown), and generic network failures.
 *   - Disables the submit button while submitting.
 *   - Identical 401 message for wrong email and wrong password (no enumeration).
 *
 * Accessibility:
 *   - Both fields have visible labels.
 *   - Error messages are linked via aria-describedby.
 *   - The server error banner uses role="alert" for screen readers.
 *   - Focus is not stolen on error; the submit button re-enables naturally.
 */

import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'
import { AdminApiError, AdminNetworkError } from '@/lib/admin-api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ADMIN_ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormFields {
  email: string
  password: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {}
  if (!fields.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.password) {
    errors.password = 'Password is required.'
  }
  return errors
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminLoginForm() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [fields, setFields] = useState<FormFields>({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [retryAfter, setRetryAfter] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Where to redirect after successful login.
  // Cast through unknown because React Router location.state is typed as any.
  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ??
    ADMIN_ROUTES.DASHBOARD

  function handleChange(field: keyof FormFields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }))
      // Clear field-level error as the user edits (UX: don't nag while typing,
      // but clear the error once they start correcting it).
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
      }
      // Clear server error when the user starts editing again.
      if (serverError) setServerError(null)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerError(null)
    setRetryAfter(null)

    const errors = validate(fields)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)
    try {
      await login({ email: fields.email.trim(), password: fields.password })
      navigate(from, { replace: true })
    } catch (err) {
      if (err instanceof AdminApiError) {
        if (err.status === 429) {
          setRetryAfter(err.retryAfter)
          setServerError(
            err.retryAfter
              ? `Too many attempts. Please wait ${err.retryAfter} seconds before trying again.`
              : 'Too many attempts. Please wait before trying again.',
          )
        } else {
          // 401 or any other error — generic message (no enumeration)
          setServerError('Invalid credentials. Please try again.')
        }
      } else if (err instanceof AdminNetworkError) {
        setServerError(err.message)
      } else {
        setServerError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={(e) => { void handleSubmit(e) }}
      noValidate
      aria-label="Admin sign in"
      className="flex flex-col gap-5"
    >
      {/* Server-level error banner */}
      {serverError && (
        <div
          role="alert"
          className={cn(
            'flex items-start gap-2.5 rounded-md border px-4 py-3 text-sm',
            retryAfter
              ? 'border-warning/30 bg-warning/10 text-warning'
              : 'border-error/30 bg-error/10 text-error',
          )}
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="admin-email"
          className="text-sm font-medium text-text-primary"
        >
          Email address
        </label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="email"
          autoFocus
          value={fields.email}
          onChange={handleChange('email')}
          isError={!!fieldErrors.email}
          {...(fieldErrors.email ? { errorMessage: fieldErrors.email } : {})}
          disabled={isSubmitting}
          placeholder="admin@example.com"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="admin-password"
          className="text-sm font-medium text-text-primary"
        >
          Password
        </label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={fields.password}
          onChange={handleChange('password')}
          isError={!!fieldErrors.password}
          {...(fieldErrors.password ? { errorMessage: fieldErrors.password } : {})}
          disabled={isSubmitting}
          placeholder="••••••••"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  )
}

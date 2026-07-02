/**
 * Tests for AdminLoginForm.
 *
 * Scenarios:
 *   Validation
 *     - submitting empty form shows both field errors
 *     - submitting with invalid email format shows email error
 *     - submitting with empty password shows password error
 *
 *   Happy path
 *     - successful login calls login() and navigates to /admin/dashboard
 *     - successful login with a `from` state navigates to that path
 *
 *   Error states
 *     - 401 from login() shows generic "Invalid credentials" banner
 *     - 429 from login() shows rate-limit banner with retry time
 *     - network error shows connection failure banner
 *     - submit button is disabled while submitting
 *
 *   Clearing errors
 *     - editing a field clears its field-level error
 *     - editing a field clears the server error banner
 */

import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AdminLoginForm } from '@/features/admin/auth/login-form'
import { AdminApiError, AdminNetworkError } from '@/lib/admin-api'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Mock the entire auth context module so individual tests can control login().
vi.mock('@/features/admin/auth/admin-auth-context', () => ({
  useAdminAuth: vi.fn(),
}))

// Mock react-router-dom's useNavigate so we can assert navigation calls.
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  }
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderForm(locationState?: unknown) {
  // We need MemoryRouter so useLocation() works inside LoginForm.
  // initialEntries allows us to inject location state.
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: '/admin/login', state: locationState }]}
    >
      <AdminLoginForm />
    </MemoryRouter>,
  )
}

async function fillAndSubmit(
  email = 'admin@example.com',
  password = 'correctpassword',
) {
  const user = userEvent.setup()
  if (email) await user.type(screen.getByLabelText('Email address'), email)
  if (password) await user.type(screen.getByLabelText('Password'), password)
  await user.click(screen.getByRole('button', { name: /sign in/i }))
  return user
}

// ─── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks()
  ;(useAdminAuth as Mock).mockReturnValue({
    login: vi.fn().mockResolvedValue(undefined),
    status: 'unauthenticated',
    admin: null,
    logout: vi.fn(),
  })
})

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('AdminLoginForm', () => {
  describe('validation', () => {
    it('shows both field errors when form is submitted empty', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      expect(await screen.findByText('Email address is required.')).toBeInTheDocument()
      expect(screen.getByText('Password is required.')).toBeInTheDocument()
    })

    it('shows email format error for invalid email', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText('Email address'), 'not-an-email')
      await user.type(screen.getByLabelText('Password'), 'somepassword')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument()
    })

    it('shows password required error when password is empty', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText('Email address'), 'admin@example.com')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      expect(await screen.findByText('Password is required.')).toBeInTheDocument()
    })
  })

  describe('successful login', () => {
    it('navigates to /admin/dashboard after successful login', async () => {
      renderForm()
      await fillAndSubmit()
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard', { replace: true })
      })
    })

    it('navigates to the `from` location stored in router state', async () => {
      renderForm({ from: { pathname: '/admin/contacts' } })
      await fillAndSubmit()
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/admin/contacts', { replace: true })
      })
    })

    it('calls login() with trimmed email and exact password', async () => {
      const loginMock = vi.fn().mockResolvedValue(undefined)
      ;(useAdminAuth as Mock).mockReturnValue({
        login: loginMock,
        status: 'unauthenticated',
        admin: null,
        logout: vi.fn(),
      })
      renderForm()
      await fillAndSubmit('  admin@example.com  ', 'mypassword')
      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith({
          email: 'admin@example.com',
          password: 'mypassword',
        })
      })
    })
  })

  describe('error states', () => {
    it('shows generic error on 401', async () => {
      ;(useAdminAuth as Mock).mockReturnValue({
        login: vi.fn().mockRejectedValue(new AdminApiError(401, 'Invalid credentials.')),
        status: 'unauthenticated',
        admin: null,
        logout: vi.fn(),
      })
      renderForm()
      await fillAndSubmit()
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Invalid credentials. Please try again.',
      )
    })

    it('shows rate-limit message with retry time on 429', async () => {
      ;(useAdminAuth as Mock).mockReturnValue({
        login: vi.fn().mockRejectedValue(
          new AdminApiError(429, 'Too many attempts.', 60),
        ),
        status: 'unauthenticated',
        admin: null,
        logout: vi.fn(),
      })
      renderForm()
      await fillAndSubmit()
      expect(await screen.findByRole('alert')).toHaveTextContent('60 seconds')
    })

    it('shows network error message on connection failure', async () => {
      ;(useAdminAuth as Mock).mockReturnValue({
        login: vi.fn().mockRejectedValue(
          new AdminNetworkError(),
        ),
        status: 'unauthenticated',
        admin: null,
        logout: vi.fn(),
      })
      renderForm()
      await fillAndSubmit()
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Unable to reach the server',
      )
    })

    it('disables the submit button while submitting', async () => {
      let resolveLogin!: () => void
      const loginPromise = new Promise<void>((res) => { resolveLogin = res })
      ;(useAdminAuth as Mock).mockReturnValue({
        login: vi.fn().mockReturnValue(loginPromise),
        status: 'unauthenticated',
        admin: null,
        logout: vi.fn(),
      })
      renderForm()
      const user = userEvent.setup()
      await user.type(screen.getByLabelText('Email address'), 'admin@example.com')
      await user.type(screen.getByLabelText('Password'), 'password')

      // Start submit but don't await — check mid-flight state
      void user.click(screen.getByRole('button', { name: /sign in/i }))

      expect(await screen.findByText(/signing in/i)).toBeInTheDocument()
      const btn = screen.getByRole('button', { name: /signing in/i })
      expect(btn).toBeDisabled()

      resolveLogin()
    })
  })

  describe('error clearing', () => {
    it('clears a field error when the user edits the field', async () => {
      const user = userEvent.setup()
      renderForm()
      // Trigger validation errors
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      expect(await screen.findByText('Email address is required.')).toBeInTheDocument()
      // Now type in the email field
      await user.type(screen.getByLabelText('Email address'), 'a')
      expect(screen.queryByText('Email address is required.')).not.toBeInTheDocument()
    })

    it('clears the server error banner when the user edits any field', async () => {
      ;(useAdminAuth as Mock).mockReturnValue({
        login: vi.fn().mockRejectedValue(new AdminApiError(401, 'Invalid credentials.')),
        status: 'unauthenticated',
        admin: null,
        logout: vi.fn(),
      })
      renderForm()
      await fillAndSubmit()
      expect(await screen.findByRole('alert')).toBeInTheDocument()
      await userEvent.type(screen.getByLabelText('Password'), 'x')
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })
})

/**
 * Tests for RequireAdmin route guard.
 *
 * Scenarios:
 *   - status 'loading'         → renders a spinner, does NOT redirect
 *   - status 'unauthenticated' → redirects to /admin/login, preserves `from`
 *   - status 'authenticated'   → renders children
 */

import { describe, it, expect, vi, type Mock } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import { RequireAdmin } from '@/features/admin/shared/require-admin'
import { useAdminAuth } from '@/features/admin/auth/admin-auth-context'

vi.mock('@/features/admin/auth/admin-auth-context', () => ({
  useAdminAuth: vi.fn(),
}))

// Helper: captures the current location so we can assert where Navigate sent us.
function LocationDisplay() {
  const loc = useLocation()
  return <div data-testid="location">{loc.pathname}</div>
}

function renderGuard(status: 'loading' | 'authenticated' | 'unauthenticated', initialPath = '/admin/dashboard') {
  ;(useAdminAuth as Mock).mockReturnValue({ status, admin: null, login: vi.fn(), logout: vi.fn() })

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <div>Protected Content</div>
            </RequireAdmin>
          }
        />
        <Route path="/admin/login" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('RequireAdmin', () => {
  it('renders a spinner while session is loading', () => {
    renderGuard('loading')
    expect(screen.getByRole('status', { name: /checking authentication/i })).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    renderGuard('authenticated')
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('redirects to /admin/login when unauthenticated', () => {
    renderGuard('unauthenticated')
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    // The LocationDisplay component at /admin/login shows the pathname
    expect(screen.getByTestId('location')).toHaveTextContent('/admin/login')
  })
})

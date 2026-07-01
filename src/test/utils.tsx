/**
 * Custom test render utilities.
 *
 * Re-exports everything from @testing-library/react so test files can import
 * from a single location rather than mixing this file with the library directly.
 *
 * The key export is `renderWithRouter` — use it whenever the component under
 * test uses any React Router hook or component (Link, NavLink, useNavigate,
 * useParams, etc.).
 */
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type ReactElement, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

// ─── Router wrapper ───────────────────────────────────────────────────────────

interface RenderWithRouterOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Initial route for the MemoryRouter. Defaults to '/'. */
  initialRoute?: string
}

/**
 * Renders a component inside a MemoryRouter.
 *
 * Use this for any component that depends on React Router context.
 * Prefer `render` (the standard Testing Library render) for pure components
 * that have no routing dependency.
 */
export function renderWithRouter(
  ui: ReactElement,
  { initialRoute = '/', ...options }: RenderWithRouterOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  }
}

// ─── Re-exports ───────────────────────────────────────────────────────────────

// Re-export everything from Testing Library so test files only need one import.
export * from '@testing-library/react'

// Override render with renderWithRouter as the named export for convenience.
// Tests that need a plain render without router can import directly from
// @testing-library/react.
export { userEvent }

/**
 * architecture.test.tsx — tests for the Interactive Architecture Explorer.
 *
 * Coverage:
 *   1. ArchitectureNodeCard renders and handles interaction
 *   2. ArchitectureMobile renders all nodes
 *   3. ProjectArchitecturePage — node selection opens side panel
 *   4. ProjectArchitecturePage — view tab switching
 *   5. ProjectArchitecturePage — 404 for unknown slug
 *   6. ArchitecturePage — landing page renders project list
 *   7. Accessibility — close button and aria attributes
 */
import { describe, it, expect } from 'vitest'
import { screen, fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { renderWithRouter } from '@/test/utils'
import { ArchitectureNodeCard } from '@/features/architecture/architecture-node-card'
import { ArchitectureMobile } from '@/features/architecture/architecture-mobile'
import { ArchitecturePage } from '@/pages/architecture-page'
import { ProjectArchitecturePage } from '@/pages/project-architecture-page'
import { INTERVIEWPILOT_AI_ARCHITECTURE as ARCH } from '@/data/architecture/interviewpilot-ai'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Renders ProjectArchitecturePage with a real router that parses the :slug param.
 * MemoryRouter alone doesn't parse path params — we need createMemoryRouter.
 */
function renderProjectArchPage(slug: string) {
  const router = createMemoryRouter(
    [{ path: '/projects/:slug/architecture', element: <ProjectArchitecturePage /> }],
    { initialEntries: [`/projects/${slug}/architecture`] },
  )
  return render(<RouterProvider router={router} />)
}

// ─── Shared fixture ───────────────────────────────────────────────────────────

const frontendNode = ARCH.nodes['frontend']!

// ─── ArchitectureNodeCard ─────────────────────────────────────────────────────

describe('ArchitectureNodeCard', () => {
  it('renders the node label', () => {
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={false}
        onClick={() => undefined}
      />,
    )
    expect(screen.getByText('React SPA')).toBeInTheDocument()
  })

  it('renders the sublabel when present', () => {
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={false}
        onClick={() => undefined}
      />,
    )
    expect(screen.getByText('Vite · TypeScript')).toBeInTheDocument()
  })

  it('has aria-pressed=false when not selected', () => {
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={false}
        onClick={() => undefined}
      />,
    )
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('aria-pressed', 'false')
  })

  it('has aria-pressed=true when selected', () => {
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={true}
        onClick={() => undefined}
      />,
    )
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onClick when clicked', () => {
    let clicked = false
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={false}
        onClick={() => { clicked = true }}
      />,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })

  it('calls onClick when Enter is pressed', () => {
    let clicked = false
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={false}
        onClick={() => { clicked = true }}
      />,
    )
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(clicked).toBe(true)
  })

  it('calls onClick when Space is pressed', () => {
    let clicked = false
    renderWithRouter(
      <ArchitectureNodeCard
        node={frontendNode}
        isSelected={false}
        onClick={() => { clicked = true }}
      />,
    )
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' })
    expect(clicked).toBe(true)
  })
})

// ─── ArchitectureMobile ───────────────────────────────────────────────────────

describe('ArchitectureMobile', () => {
  it('renders all nodes', () => {
    renderWithRouter(
      <ArchitectureMobile
        nodes={ARCH.nodes}
        selectedNodeId={null}
        onNodeSelect={() => undefined}
      />,
    )
    expect(screen.getByText('React SPA')).toBeInTheDocument()
    expect(screen.getByText('API Gateway')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Background Workers')).toBeInTheDocument()
  })

  it('has the architecture components list role', () => {
    renderWithRouter(
      <ArchitectureMobile
        nodes={ARCH.nodes}
        selectedNodeId={null}
        onNodeSelect={() => undefined}
      />,
    )
    expect(
      screen.getByRole('list', { name: /architecture components/i }),
    ).toBeInTheDocument()
  })
})

// ─── ArchitecturePage (landing) ───────────────────────────────────────────────

describe('ArchitecturePage', () => {
  it('renders the page heading', () => {
    renderWithRouter(<ArchitecturePage />)
    expect(
      screen.getByRole('heading', { name: /architecture explorer/i }),
    ).toBeInTheDocument()
  })

  it('renders a link to InterviewPilot AI architecture', () => {
    renderWithRouter(<ArchitecturePage />)
    const link = screen.getByRole('link', { name: /explore interviewpilot ai architecture/i })
    expect(link).toHaveAttribute('href', '/projects/interviewpilot-ai/architecture')
  })

  it('shows component and connection counts', () => {
    renderWithRouter(<ArchitecturePage />)
    const nodeCount = Object.keys(ARCH.nodes).length
    expect(
      screen.getByText(new RegExp(`${nodeCount} components`)),
    ).toBeInTheDocument()
  })
})

// ─── ProjectArchitecturePage ──────────────────────────────────────────────────

describe('ProjectArchitecturePage', () => {
  it('renders the project name', () => {
    renderProjectArchPage('interviewpilot-ai')
    expect(screen.getByText('InterviewPilot AI')).toBeInTheDocument()
  })

  it('shows a 404 state for an unknown slug', () => {
    renderProjectArchPage('unknown-project')
    expect(screen.getByText(/architecture not found/i)).toBeInTheDocument()
  })

  it('renders the view tabs', () => {
    renderProjectArchPage('interviewpilot-ai')
    expect(screen.getByRole('tab', { name: /logical architecture/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /request flow/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /deployment overview/i })).toBeInTheDocument()
  })

  it('opens the side panel when a node is clicked', () => {
    renderProjectArchPage('interviewpilot-ai')

    // There may be multiple buttons with the same label (canvas + mobile list).
    // Click the first one.
    const nodeButtons = screen.getAllByRole('button', { name: /react spa/i })
    fireEvent.click(nodeButtons[0]!)

    expect(
      screen.getByRole('complementary', { name: /react spa component details/i }),
    ).toBeInTheDocument()
  })

  it('closes the side panel when the close button is clicked', () => {
    renderProjectArchPage('interviewpilot-ai')

    const nodeButtons = screen.getAllByRole('button', { name: /react spa/i })
    fireEvent.click(nodeButtons[0]!)

    const closeBtn = screen.getByRole('button', { name: /close react spa detail panel/i })
    fireEvent.click(closeBtn)

    expect(
      screen.queryByRole('complementary', { name: /react spa component details/i }),
    ).not.toBeInTheDocument()
  })

  it('clears node selection when switching views', async () => {
    const user = userEvent.setup()
    renderProjectArchPage('interviewpilot-ai')

    const nodeButtons = screen.getAllByRole('button', { name: /react spa/i })
    fireEvent.click(nodeButtons[0]!)
    expect(
      screen.getByRole('complementary', { name: /react spa component details/i }),
    ).toBeInTheDocument()

    // Switch view using userEvent — Radix UI tabs require a real user interaction
    await user.click(screen.getByRole('tab', { name: /request flow/i }))

    expect(
      screen.queryByRole('complementary', { name: /react spa component details/i }),
    ).not.toBeInTheDocument()
  })
})

// ─── Engineering Decisions ────────────────────────────────────────────────────

describe('EngineeringDecisions', () => {
  it('renders all decision titles', () => {
    renderProjectArchPage('interviewpilot-ai')

    ARCH.decisions.forEach((d) => {
      expect(screen.getByText(d.title)).toBeInTheDocument()
    })
  })
})

import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/utils'
import { NotFoundPage } from '@/pages/not-found-page'

/**
 * NotFoundPage component tests.
 *
 * NotFoundPage is the only non-placeholder page in Phase 1, so it is the
 * first real component test in the project.
 */
describe('NotFoundPage', () => {
  it('renders the 404 heading', () => {
    renderWithRouter(<NotFoundPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })

  it('renders a link to the home page', () => {
    renderWithRouter(<NotFoundPage />)
    const homeLink = screen.getByRole('link', { name: /go to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders a link to the projects page', () => {
    renderWithRouter(<NotFoundPage />)
    const projectsLink = screen.getByRole('link', { name: /browse projects/i })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/work')
  })

  it('has the aria-hidden 404 decorative text', () => {
    renderWithRouter(<NotFoundPage />)
    // The large "404" is decorative — it must be aria-hidden so screen
    // readers don't announce it alongside the H1.
    const decorative = screen.getByText('404')
    expect(decorative).toHaveAttribute('aria-hidden', 'true')
  })
})

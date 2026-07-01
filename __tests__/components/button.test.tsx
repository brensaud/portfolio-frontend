import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/test/utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant by default', () => {
      renderWithRouter(<Button>Click me</Button>)
      const btn = screen.getByRole('button', { name: 'Click me' })
      expect(btn).toBeInTheDocument()
      expect(btn.className).toMatch(/bg-accent/)
    })

    it('renders secondary variant', () => {
      renderWithRouter(<Button variant="secondary">Secondary</Button>)
      const btn = screen.getByRole('button', { name: 'Secondary' })
      expect(btn.className).toMatch(/border-border/)
    })

    it('renders ghost variant', () => {
      renderWithRouter(<Button variant="ghost">Ghost</Button>)
      const btn = screen.getByRole('button', { name: 'Ghost' })
      expect(btn.className).toMatch(/text-text-secondary/)
    })

    it('renders danger variant', () => {
      renderWithRouter(<Button variant="danger">Delete</Button>)
      const btn = screen.getByRole('button', { name: 'Delete' })
      expect(btn.className).toMatch(/bg-error/)
    })
  })

  describe('sizes', () => {
    it('renders sm size', () => {
      renderWithRouter(<Button size="sm">Small</Button>)
      const btn = screen.getByRole('button')
      expect(btn.className).toMatch(/h-8/)
    })

    it('renders lg size', () => {
      renderWithRouter(<Button size="lg">Large</Button>)
      const btn = screen.getByRole('button')
      expect(btn.className).toMatch(/h-12/)
    })
  })

  describe('loading state', () => {
    it('shows spinner when isLoading is true', () => {
      renderWithRouter(<Button isLoading>Saving</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toBeInTheDocument()
      // The button signals its loading state to screen readers via aria-busy
      expect(btn).toHaveAttribute('aria-busy', 'true')
    })

    it('disables the button when isLoading is true', () => {
      renderWithRouter(<Button isLoading>Saving</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not call onClick while loading', async () => {
      const handler = vi.fn()
      renderWithRouter(
        <Button isLoading onClick={handler}>
          Saving
        </Button>,
      )
      await userEvent.click(screen.getByRole('button'))
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('disables the button', () => {
      renderWithRouter(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not call onClick when disabled', async () => {
      const handler = vi.fn()
      renderWithRouter(
        <Button disabled onClick={handler}>
          Disabled
        </Button>,
      )
      await userEvent.click(screen.getByRole('button'))
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('icons', () => {
    it('renders left icon', () => {
      renderWithRouter(
        <Button leftIcon={<span data-testid="left-icon" />}>With Icon</Button>,
      )
      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      renderWithRouter(
        <Button rightIcon={<span data-testid="right-icon" />}>With Icon</Button>,
      )
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('hides icons when loading', () => {
      renderWithRouter(
        <Button isLoading leftIcon={<span data-testid="left-icon" />}>
          Loading
        </Button>,
      )
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('forwards ref', () => {
      const ref = { current: null as HTMLButtonElement | null }
      renderWithRouter(<Button ref={ref}>Ref Button</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('accepts aria-label', () => {
      renderWithRouter(<Button aria-label="Close dialog" iconOnly />)
      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
    })

    it('sets aria-disabled when disabled', () => {
      renderWithRouter(<Button disabled>Disabled</Button>)
      const btn = screen.getByRole('button')
      expect(btn).toHaveAttribute('aria-disabled', 'true')
    })
  })
})

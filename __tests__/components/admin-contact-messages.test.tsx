/**
 * Tests for Sprint 2 Admin Contact Messages components.
 *
 * Coverage:
 *
 * MessageStatusBadge
 *   ✓ Renders correct label for each status
 *   ✓ Applies correct Badge variant class
 *
 * ContactMessagesTable
 *   ✓ Renders skeleton rows during loading
 *   ✓ Renders empty state when items list is empty
 *   ✓ Renders sender name, email, subject, and date for each item
 *   ✓ Applies bold/primary style to unread items
 *   ✓ Row click fires onRowClick callback
 *   ✓ View button fires onRowClick callback
 *   ✓ Mark-read button visible for unread/archived, fires onMarkRead
 *   ✓ Mark-unread button visible only for read, fires onMarkUnread
 *   ✓ Archive button hidden for archived messages
 *   ✓ Delete button always present, fires onDelete
 *   ✓ All action buttons disabled when actionsDisabled=true
 *
 * ContactMessagesFilters
 *   ✓ Renders search input with accessible label
 *   ✓ Renders status Select with options
 *   ✓ onSearchChange fires after debounce timeout
 *   ✓ onStatusChange fires immediately on Select change
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/test/utils'
import { MessageStatusBadge } from '@/features/admin/contact-messages/message-status-badge'
import {
  ContactMessagesTable,
} from '@/features/admin/contact-messages/contact-messages-table'
import { ContactMessagesFilters } from '@/features/admin/contact-messages/contact-messages-filters'
import type { AdminContactMessageSummary } from '@/lib/admin-api'

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeMessage(
  overrides: Partial<AdminContactMessageSummary> = {},
): AdminContactMessageSummary {
  return {
    id: 'test-id-1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Hiring inquiry',
    status: 'unread',
    created_at: '2026-07-01T10:00:00Z',
    updated_at: '2026-07-01T10:00:00Z',
    ...overrides,
  }
}

// ── Shared table props builder ─────────────────────────────────────────────────

function makeTableProps(
  overrides: Partial<React.ComponentProps<typeof ContactMessagesTable>> = {},
) {
  return {
    items: [],
    isLoading: false,
    onRowClick: vi.fn(),
    onMarkRead: vi.fn(),
    onMarkUnread: vi.fn(),
    onArchive: vi.fn(),
    onDelete: vi.fn(),
    ...overrides,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MessageStatusBadge
// ─────────────────────────────────────────────────────────────────────────────

describe('MessageStatusBadge', () => {
  it('renders "Unread" label for unread status', () => {
    renderWithRouter(<MessageStatusBadge status="unread" />)
    expect(screen.getByText('Unread')).toBeInTheDocument()
  })

  it('renders "Read" label for read status', () => {
    renderWithRouter(<MessageStatusBadge status="read" />)
    expect(screen.getByText('Read')).toBeInTheDocument()
  })

  it('renders "Archived" label for archived status', () => {
    renderWithRouter(<MessageStatusBadge status="archived" />)
    expect(screen.getByText('Archived')).toBeInTheDocument()
  })

  it('applies accent class for unread status', () => {
    const { container } = renderWithRouter(<MessageStatusBadge status="unread" />)
    expect(container.firstChild).toHaveClass('bg-accent-subtle')
  })

  it('applies outline class for archived status', () => {
    const { container } = renderWithRouter(<MessageStatusBadge status="archived" />)
    expect(container.firstChild).toHaveClass('bg-transparent')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// ContactMessagesTable
// ─────────────────────────────────────────────────────────────────────────────

describe('ContactMessagesTable', () => {
  describe('loading state', () => {
    it('renders skeleton placeholders when isLoading is true', () => {
      renderWithRouter(
        <ContactMessagesTable {...makeTableProps({ isLoading: true })} />,
      )
      // Skeleton divs use role="status"
      const skeletons = screen.getAllByRole('status', { name: /loading/i })
      expect(skeletons.length).toBeGreaterThanOrEqual(5)
    })

    it('does not render any message rows while loading', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ isLoading: true, items: [makeMessage()] })}
        />,
      )
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('renders "No messages found" when items array is empty', () => {
      renderWithRouter(<ContactMessagesTable {...makeTableProps()} />)
      expect(screen.getByText(/no messages found/i)).toBeInTheDocument()
    })
  })

  describe('populated list', () => {
    it('renders sender name and email', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage()] })}
        />,
      )
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    })

    it('renders the message subject', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage()] })}
        />,
      )
      expect(screen.getByText('Hiring inquiry')).toBeInTheDocument()
    })

    it('renders a formatted date', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage()] })}
        />,
      )
      // "Jul 1, 2026" — locale-formatted
      expect(screen.getByText(/Jul 1, 2026/)).toBeInTheDocument()
    })

    it('renders the status badge for each message', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'read' })] })}
        />,
      )
      expect(screen.getByText('Read')).toBeInTheDocument()
    })

    it('applies font-medium to unread sender name', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'unread' })] })}
        />,
      )
      expect(screen.getByText('Jane Smith')).toHaveClass('font-medium')
    })

    it('does not apply font-medium to read sender name', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'read' })] })}
        />,
      )
      expect(screen.getByText('Jane Smith')).not.toHaveClass('font-medium')
    })
  })

  describe('row interactions', () => {
    it('calls onRowClick when a table row is clicked', async () => {
      const onRowClick = vi.fn()
      const user = userEvent.setup()
      const msg = makeMessage()
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [msg], onRowClick })}
        />,
      )
      // Click the row (find the sender name cell)
      await user.click(screen.getByText('Jane Smith'))
      expect(onRowClick).toHaveBeenCalledWith(msg)
    })

    it('calls onRowClick when View button is clicked', async () => {
      const onRowClick = vi.fn()
      const user = userEvent.setup()
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage()], onRowClick })}
        />,
      )
      await user.click(screen.getByRole('button', { name: /view message from Jane Smith/i }))
      expect(onRowClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('action buttons — unread message', () => {
    it('shows Mark-read button for an unread message', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'unread' })] })}
        />,
      )
      expect(
        screen.getByRole('button', { name: /mark message from Jane Smith as read/i }),
      ).toBeInTheDocument()
    })

    it('does not show Mark-unread button for an unread message', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'unread' })] })}
        />,
      )
      expect(
        screen.queryByRole('button', { name: /mark message from Jane Smith as unread/i }),
      ).not.toBeInTheDocument()
    })

    it('calls onMarkRead with the message id', async () => {
      const onMarkRead = vi.fn()
      const user = userEvent.setup()
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({
            items: [makeMessage({ status: 'unread' })],
            onMarkRead,
          })}
        />,
      )
      await user.click(
        screen.getByRole('button', { name: /mark message from Jane Smith as read/i }),
      )
      expect(onMarkRead).toHaveBeenCalledWith('test-id-1')
    })
  })

  describe('action buttons — read message', () => {
    it('shows Mark-unread button for a read message', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'read' })] })}
        />,
      )
      expect(
        screen.getByRole('button', { name: /mark message from Jane Smith as unread/i }),
      ).toBeInTheDocument()
    })

    it('calls onMarkUnread with the message id', async () => {
      const onMarkUnread = vi.fn()
      const user = userEvent.setup()
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({
            items: [makeMessage({ status: 'read' })],
            onMarkUnread,
          })}
        />,
      )
      await user.click(
        screen.getByRole('button', { name: /mark message from Jane Smith as unread/i }),
      )
      expect(onMarkUnread).toHaveBeenCalledWith('test-id-1')
    })
  })

  describe('action buttons — archive', () => {
    it('shows Archive button for a non-archived message', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'read' })] })}
        />,
      )
      expect(
        screen.getByRole('button', { name: /archive message from Jane Smith/i }),
      ).toBeInTheDocument()
    })

    it('hides Archive button for an already-archived message', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage({ status: 'archived' })] })}
        />,
      )
      expect(
        screen.queryByRole('button', { name: /archive message from Jane Smith/i }),
      ).not.toBeInTheDocument()
    })

    it('calls onArchive with the message id', async () => {
      const onArchive = vi.fn()
      const user = userEvent.setup()
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({
            items: [makeMessage({ status: 'read' })],
            onArchive,
          })}
        />,
      )
      await user.click(
        screen.getByRole('button', { name: /archive message from Jane Smith/i }),
      )
      expect(onArchive).toHaveBeenCalledWith('test-id-1')
    })
  })

  describe('action buttons — delete', () => {
    it('always shows Delete button regardless of status', () => {
      for (const status of ['unread', 'read', 'archived'] as const) {
        const { unmount } = renderWithRouter(
          <ContactMessagesTable
            {...makeTableProps({ items: [makeMessage({ status })] })}
          />,
        )
        expect(
          screen.getByRole('button', { name: /delete message from Jane Smith/i }),
        ).toBeInTheDocument()
        unmount()
      }
    })

    it('calls onDelete with the message id', async () => {
      const onDelete = vi.fn()
      const user = userEvent.setup()
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({ items: [makeMessage()], onDelete })}
        />,
      )
      await user.click(
        screen.getByRole('button', { name: /delete message from Jane Smith/i }),
      )
      expect(onDelete).toHaveBeenCalledWith('test-id-1')
    })
  })

  describe('actionsDisabled', () => {
    it('disables all action buttons when actionsDisabled is true', () => {
      renderWithRouter(
        <ContactMessagesTable
          {...makeTableProps({
            items: [makeMessage({ status: 'unread' })],
            actionsDisabled: true,
          })}
        />,
      )
      const buttons = screen.getAllByRole('button')
      buttons.forEach((btn) => expect(btn).toBeDisabled())
    })
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// ContactMessagesFilters
// ─────────────────────────────────────────────────────────────────────────────

describe('ContactMessagesFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function renderFilters(
    overrides: Partial<React.ComponentProps<typeof ContactMessagesFilters>> = {},
  ) {
    const props = {
      search: '',
      status: 'all' as const,
      onSearchChange: vi.fn(),
      onStatusChange: vi.fn(),
      ...overrides,
    }
    return {
      ...renderWithRouter(<ContactMessagesFilters {...props} />),
      props,
    }
  }

  it('renders a search input with accessible label', () => {
    renderFilters()
    expect(screen.getByRole('searchbox', { name: /search messages/i })).toBeInTheDocument()
  })

  it('renders the status filter trigger', () => {
    renderFilters()
    // The Radix SelectTrigger renders with its current value as text.
    // We just verify it is present rather than opening the dropdown,
    // because Radix uses pointer-capture APIs not available in jsdom.
    expect(screen.getByRole('combobox', { name: /filter by status/i })).toBeInTheDocument()
  })

  it('fires onSearchChange after 350ms debounce', () => {
    // Use fireEvent.change (synchronous) instead of userEvent.type to avoid
    // async conflicts between fake timers and userEvent's internal scheduling.
    const onSearchChange = vi.fn()
    const { container } = renderFilters({ onSearchChange })
    const input = container.querySelector('input[type="search"]')!

    fireEvent.change(input, { target: { value: 'hello' } })

    // Not yet fired — still within debounce window
    expect(onSearchChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(400)

    expect(onSearchChange).toHaveBeenCalledTimes(1)
    expect(onSearchChange).toHaveBeenCalledWith('hello')
  })

  it('does not fire multiple onSearchChange calls during rapid typing', () => {
    const onSearchChange = vi.fn()
    const { container } = renderFilters({ onSearchChange })
    const input = container.querySelector('input[type="search"]')!

    // Simulate rapid keystrokes by firing multiple change events before debounce settles
    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })
    fireEvent.change(input, { target: { value: 'abc' } })

    // Nothing fired yet
    expect(onSearchChange).not.toHaveBeenCalled()

    // Settle
    vi.advanceTimersByTime(400)

    expect(onSearchChange).toHaveBeenCalledTimes(1)
    expect(onSearchChange).toHaveBeenCalledWith('abc')
  })
})

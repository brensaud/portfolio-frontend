/**
 * ContactMessagesTable — sortable data table with row actions.
 *
 * Responsibilities:
 *  - Render the paginated list of messages.
 *  - Show skeleton rows while loading.
 *  - Show empty state when the list is empty.
 *  - Emit row-click and action events upward — no direct mutation calls here.
 *    The parent page wires mutations to these callbacks so the table itself
 *    stays a pure presentational component.
 *
 * Columns: Status | Sender | Subject | Date | Actions
 */

import { Archive, Eye, Mail, MailOpen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { type AdminContactMessageSummary } from '@/lib/admin-api'
import { MessageStatusBadge } from './message-status-badge'

interface ContactMessagesTableProps {
  items: AdminContactMessageSummary[]
  isLoading: boolean
  onRowClick: (message: AdminContactMessageSummary) => void
  onMarkRead: (id: string) => void
  onMarkUnread: (id: string) => void
  onArchive: (id: string) => void
  onDelete: (id: string) => void
  actionsDisabled?: boolean
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ── Skeleton rows ─────────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-border">
          <td className="px-4 py-3">
            <Skeleton variant="text" className="w-14" />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="text" className="w-32" />
            <Skeleton variant="text" className="mt-1 w-48" />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="text" className="w-48" />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="text" className="w-20" />
          </td>
          <td className="px-4 py-3">
            <Skeleton variant="rect" className="h-7 w-24" />
          </td>
        </tr>
      ))}
    </>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyRow() {
  return (
    <tr>
      <td
        colSpan={5}
        className="px-4 py-16 text-center text-sm text-text-tertiary"
      >
        <Mail size={32} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
        No messages found.
      </td>
    </tr>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ContactMessagesTable({
  items,
  isLoading,
  onRowClick,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onDelete,
  actionsDisabled = false,
}: ContactMessagesTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised text-left">
            <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Status
            </th>
            <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              From
            </th>
            <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Subject
            </th>
            <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Date
            </th>
            <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonRows />
          ) : items.length === 0 ? (
            <EmptyRow />
          ) : (
            items.map((msg) => (
              <tr
                key={msg.id}
                className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-surface-raised"
                onClick={() => onRowClick(msg)}
              >
                {/* Status */}
                <td className="px-4 py-3">
                  <MessageStatusBadge status={msg.status} />
                </td>

                {/* From */}
                <td className="px-4 py-3">
                  <p
                    className={
                      msg.status === 'unread'
                        ? 'font-medium text-text-primary'
                        : 'text-text-secondary'
                    }
                  >
                    {msg.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{msg.email}</p>
                </td>

                {/* Subject */}
                <td className="max-w-xs px-4 py-3">
                  <p
                    className={
                      msg.status === 'unread'
                        ? 'truncate font-medium text-text-primary'
                        : 'truncate text-text-secondary'
                    }
                    title={msg.subject}
                  >
                    {msg.subject}
                  </p>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-4 py-3 text-xs text-text-tertiary">
                  {formatDate(msg.created_at)}
                </td>

                {/* Actions — stop propagation so row click doesn't also fire */}
                <td
                  className="px-4 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      disabled={actionsDisabled}
                      onClick={() => onRowClick(msg)}
                      title="View message"
                      aria-label={`View message from ${msg.name}`}
                    >
                      <Eye size={14} aria-hidden="true" />
                    </Button>

                    {msg.status !== 'read' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        disabled={actionsDisabled}
                        onClick={() => onMarkRead(msg.id)}
                        title="Mark as read"
                        aria-label={`Mark message from ${msg.name} as read`}
                      >
                        <MailOpen size={14} aria-hidden="true" />
                      </Button>
                    )}

                    {msg.status === 'read' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        disabled={actionsDisabled}
                        onClick={() => onMarkUnread(msg.id)}
                        title="Mark as unread"
                        aria-label={`Mark message from ${msg.name} as unread`}
                      >
                        <Mail size={14} aria-hidden="true" />
                      </Button>
                    )}

                    {msg.status !== 'archived' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        disabled={actionsDisabled}
                        onClick={() => onArchive(msg.id)}
                        title="Archive message"
                        aria-label={`Archive message from ${msg.name}`}
                      >
                        <Archive size={14} aria-hidden="true" />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      disabled={actionsDisabled}
                      onClick={() => onDelete(msg.id)}
                      title="Delete message"
                      aria-label={`Delete message from ${msg.name}`}
                      className="text-error hover:text-error"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

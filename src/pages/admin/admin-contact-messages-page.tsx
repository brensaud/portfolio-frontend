/**
 * AdminContactMessagesPage — admin Contact Messages section.
 *
 * Owns all filter/pagination state and wires it to:
 *   - ContactMessagesFilters (search + status)
 *   - ContactMessagesTable   (list with skeleton/empty/error states)
 *   - ContactMessageDetail   (dialog panel)
 *
 * State that lives here:
 *   page, pageSize   — pagination (reset to 1 on filter change)
 *   search           — debounced search string
 *   statusFilter     — "all" | "unread" | "read" | "archived"
 *   sort             — "created_at_desc" | "created_at_asc"
 *   selectedId       — drives detail dialog open/close
 *   pendingDeleteId  — drives top-level confirm dialog from table row actions
 *   pendingArchiveId — drives top-level confirm dialog from table row actions
 */

import { useCallback, useState } from 'react'
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { usePageTitle } from '@/hooks/use-page-title'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { type ContactMessageSort, type ContactMessageStatus } from '@/lib/admin-api'
import { ContactMessagesFilters } from '@/features/admin/contact-messages/contact-messages-filters'
import { ContactMessagesTable } from '@/features/admin/contact-messages/contact-messages-table'
import { ContactMessageDetail } from '@/features/admin/contact-messages/contact-message-detail'
import {
  useMarkRead,
  useMarkUnread,
  useArchiveMessage,
  useDeleteMessage,
} from '@/features/admin/contact-messages/use-contact-message-actions'
import { useContactMessages } from '@/features/admin/contact-messages/use-contact-messages'
import type { AdminContactMessageSummary } from '@/lib/admin-api'

type StatusFilter = ContactMessageStatus | 'all'

const PAGE_SIZE = 20

export function AdminContactMessagesPage() {
  usePageTitle('Contact Messages')

  // ── Filter / pagination state ──────────────────────────────────────────────
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sort] = useState<ContactMessageSort>('created_at_desc')

  // ── Dialog state ───────────────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [pendingArchiveId, setPendingArchiveId] = useState<string | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  // ── Mutations ──────────────────────────────────────────────────────────────
  const markRead = useMarkRead()
  const markUnread = useMarkUnread()
  const archive = useArchiveMessage()
  const del = useDeleteMessage()

  const anyPending =
    markRead.isPending || markUnread.isPending || archive.isPending || del.isPending

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data, isLoading, isError, refetch } = useContactMessages({
    page,
    pageSize: PAGE_SIZE,
    status: statusFilter === 'all' ? null : statusFilter,
    search,
    sort,
  })

  // ── Callbacks ──────────────────────────────────────────────────────────────

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleStatusChange = useCallback((value: StatusFilter) => {
    setStatusFilter(value)
    setPage(1)
  }, [])

  const handleRowClick = useCallback((msg: AdminContactMessageSummary) => {
    setSelectedId(msg.id)
  }, [])

  const handleMarkRead = useCallback(
    (id: string) => markRead.mutate(id),
    [markRead],
  )

  const handleMarkUnread = useCallback(
    (id: string) => markUnread.mutate(id),
    [markUnread],
  )

  const handleArchiveRequest = useCallback((id: string) => {
    setPendingArchiveId(id)
  }, [])

  const handleArchiveConfirm = useCallback(() => {
    if (!pendingArchiveId) return
    archive.mutate(pendingArchiveId, {
      onSuccess: () => {
        setPendingArchiveId(null)
        if (selectedId === pendingArchiveId) setSelectedId(null)
      },
      onError: () => setPendingArchiveId(null),
    })
  }, [pendingArchiveId, archive, selectedId])

  const handleDeleteRequest = useCallback((id: string) => {
    setPendingDeleteId(id)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (!pendingDeleteId) return
    del.mutate(pendingDeleteId, {
      onSuccess: () => {
        setPendingDeleteId(null)
        if (selectedId === pendingDeleteId) setSelectedId(null)
      },
      onError: () => setPendingDeleteId(null),
    })
  }, [pendingDeleteId, del, selectedId])

  // ── Pagination helpers ─────────────────────────────────────────────────────
  const totalPages = data?.pages ?? 0
  const canPrev = page > 1
  const canNext = page < totalPages

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary">
          Contact Messages
        </h1>
        {data && (
          <p className="mt-1 text-sm text-text-secondary">
            {data.total === 0
              ? 'No messages'
              : `${data.total} message${data.total === 1 ? '' : 's'}`}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mb-4">
        <ContactMessagesFilters
          search={search}
          status={statusFilter}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Error state */}
      {isError && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          <AlertCircle size={16} aria-hidden="true" />
          <span>Failed to load messages.</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void refetch()}
            className="ml-auto text-error"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Table */}
      <ContactMessagesTable
        items={data?.items ?? []}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        onMarkRead={handleMarkRead}
        onMarkUnread={handleMarkUnread}
        onArchive={handleArchiveRequest}
        onDelete={handleDeleteRequest}
        actionsDisabled={anyPending}
      />

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-text-tertiary">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!canPrev || anyPending}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={14} aria-hidden="true" />
              Prev
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!canNext || anyPending}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            >
              Next
              <ChevronRight size={14} aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail dialog */}
      <ContactMessageDetail
        messageId={selectedId}
        onClose={() => setSelectedId(null)}
      />

      {/* Archive confirm dialog */}
      <Dialog
        open={pendingArchiveId !== null}
        onOpenChange={(v) => { if (!v) setPendingArchiveId(null) }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive message?</DialogTitle>
            <DialogDescription>
              Archived messages are hidden from the default view. You can restore
              them by filtering for archived messages and marking as unread or read.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              size="sm"
              disabled={archive.isPending}
              onClick={() => setPendingArchiveId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={archive.isPending}
              onClick={handleArchiveConfirm}
            >
              {archive.isPending && (
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              )}
              Archive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog
        open={pendingDeleteId !== null}
        onOpenChange={(v) => { if (!v) setPendingDeleteId(null) }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete message permanently?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The message will be permanently removed
              from the database. Consider archiving instead.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              size="sm"
              disabled={del.isPending}
              onClick={() => setPendingDeleteId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              disabled={del.isPending}
              onClick={handleDeleteConfirm}
            >
              {del.isPending && (
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              )}
              Delete permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/**
 * ContactMessageDetail — dialog panel for reading a single message.
 *
 * Triggered by clicking a table row or the "View" action button.
 * Fetches the full message on open via GET /{id} (which also auto-marks it
 * as read server-side).
 *
 * Actions available inside the panel:
 *   Mark as read   (if current status !== read)
 *   Mark as unread (if current status === read)
 *   Archive        (always available)
 *   Delete         (always available — shows a nested confirm dialog)
 *
 * The panel invalidates the list after every action so the table reflects
 * the updated status without requiring a manual page refresh.
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Mail, MailOpen, Archive, Trash2, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { adminGetContactMessage, type AdminContactMessageDetail } from '@/lib/admin-api'
import { MessageStatusBadge } from './message-status-badge'
import {
  useMarkRead,
  useMarkUnread,
  useArchiveMessage,
  useDeleteMessage,
} from './use-contact-message-actions'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ContactMessageDetailProps {
  messageId: string | null
  onClose: () => void
}

// ── Date formatter ────────────────────────────────────────────────────────────

function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

// ── Delete confirm sub-dialog ─────────────────────────────────────────────────

interface DeleteConfirmProps {
  open: boolean
  senderName: string
  isPending: boolean
  onConfirm: () => void
  onCancel: () => void
}

function DeleteConfirmDialog({
  open,
  senderName,
  isPending,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onCancel() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete message?</DialogTitle>
          <DialogDescription>
            This will permanently delete the message from{' '}
            <strong className="text-text-primary">{senderName}</strong>. This
            action cannot be undone. Consider archiving instead.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" size="sm" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 size={14} aria-hidden="true" />
            )}
            Delete permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
      <Skeleton variant="rect" className="h-40 w-full" />
    </div>
  )
}

// ── Error state ───────────────────────────────────────────────────────────────

function DetailError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <AlertCircle size={28} className="text-error" aria-hidden="true" />
      <p className="text-sm text-text-secondary">Failed to load message.</p>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  )
}

// ── Detail content ────────────────────────────────────────────────────────────

interface DetailContentProps {
  message: AdminContactMessageDetail
}

function DetailContent({
  message,
}: DetailContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Sender meta */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-text-primary">{message.name}</p>
          <p className="text-sm text-text-secondary">{message.email}</p>
        </div>
        <MessageStatusBadge status={message.status} />
      </div>

      {/* Metadata row */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-text-tertiary sm:grid-cols-3">
        <div>
          <dt className="font-medium uppercase tracking-wider">Received</dt>
          <dd>{formatDateLong(message.created_at)}</dd>
        </div>
        {message.ip_address && (
          <div>
            <dt className="font-medium uppercase tracking-wider">IP</dt>
            <dd className="font-mono">{message.ip_address}</dd>
          </div>
        )}
      </dl>

      {/* Message body */}
      <div className="rounded-md border border-border bg-surface-raised p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-secondary">
          {message.message}
        </p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ContactMessageDetail({ messageId, onClose }: ContactMessageDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'contact-messages', messageId],
    queryFn: () => adminGetContactMessage(messageId!),
    enabled: messageId !== null,
  })

  const markRead = useMarkRead()
  const markUnread = useMarkUnread()
  const archive = useArchiveMessage()
  const del = useDeleteMessage()

  const isPending =
    markRead.isPending || markUnread.isPending || archive.isPending || del.isPending

  function handleMarkRead() {
    if (!messageId) return
    markRead.mutate(messageId)
  }
  function handleMarkUnread() {
    if (!messageId) return
    markUnread.mutate(messageId)
  }
  function handleArchive() {
    if (!messageId) return
    archive.mutate(messageId, { onSuccess: onClose })
  }
  function handleDeleteConfirm() {
    if (!messageId) return
    del.mutate(messageId, {
      onSuccess: () => {
        setShowDeleteConfirm(false)
        onClose()
      },
      onSettled: () => setShowDeleteConfirm(false),
    })
  }

  return (
    <>
      <Dialog open={messageId !== null} onOpenChange={(v) => { if (!v) onClose() }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isLoading ? 'Loading…' : (data?.subject ?? 'Message')}
            </DialogTitle>
          </DialogHeader>

          {/* Body */}
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {isLoading && <DetailSkeleton />}
            {isError && <DetailError onRetry={() => void refetch()} />}
            {data && (
              <DetailContent
                message={data}
              />
            )}
          </div>

          {/* Footer actions */}
          {data && (
            <DialogFooter className="flex-wrap gap-2">
              <div className="flex flex-1 gap-2">
                {data.status !== 'read' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isPending}
                    onClick={handleMarkRead}
                  >
                    <MailOpen size={14} aria-hidden="true" />
                    Mark read
                  </Button>
                )}
                {data.status === 'read' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isPending}
                    onClick={handleMarkUnread}
                  >
                    <Mail size={14} aria-hidden="true" />
                    Mark unread
                  </Button>
                )}
                {data.status !== 'archived' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={isPending}
                    onClick={handleArchive}
                  >
                    <Archive size={14} aria-hidden="true" />
                    Archive
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isPending}
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-error hover:text-error"
                  aria-label="Delete message"
                >
                  <Trash2 size={14} aria-hidden="true" />
                  Delete
                </Button>
              </div>
              <DialogClose asChild>
                <Button variant="secondary" size="sm">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Nested delete confirmation dialog */}
      {data && (
        <DeleteConfirmDialog
          open={showDeleteConfirm}
          senderName={data.name}
          isPending={del.isPending}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  )
}

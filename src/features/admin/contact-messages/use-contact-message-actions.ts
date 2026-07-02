/**
 * useContactMessageActions — React Query mutations for status changes and delete.
 *
 * Each mutation:
 *   1. Calls the relevant admin-api function.
 *   2. On success: invalidates the list queries + fires a success toast.
 *   3. On error: fires an error toast with the server detail message.
 *
 * Callers receive the raw mutation objects so they can inspect `isPending`
 * to disable buttons during in-flight requests.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  adminArchiveMessage,
  adminDeleteMessage,
  adminMarkRead,
  adminMarkUnread,
  type AdminContactMessageDetail,
  AdminApiError,
  AdminNetworkError,
} from '@/lib/admin-api'
import { contactMessagesKey } from './use-contact-messages'

// ── Shared error handler ──────────────────────────────────────────────────────

function toastError(err: unknown, fallback: string) {
  if (err instanceof AdminApiError) {
    toast.error(err.detail)
  } else if (err instanceof AdminNetworkError) {
    toast.error('Connection error. Check your network and try again.')
  } else {
    toast.error(fallback)
  }
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

export function useMarkRead() {
  const qc = useQueryClient()
  return useMutation<AdminContactMessageDetail, unknown, string>({
    mutationFn: adminMarkRead,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: contactMessagesKey() })
      toast.success('Marked as read.')
    },
    onError: (err) => toastError(err, 'Failed to mark as read.'),
  })
}

export function useMarkUnread() {
  const qc = useQueryClient()
  return useMutation<AdminContactMessageDetail, unknown, string>({
    mutationFn: adminMarkUnread,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: contactMessagesKey() })
      toast.success('Marked as unread.')
    },
    onError: (err) => toastError(err, 'Failed to mark as unread.'),
  })
}

export function useArchiveMessage() {
  const qc = useQueryClient()
  return useMutation<AdminContactMessageDetail, unknown, string>({
    mutationFn: adminArchiveMessage,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: contactMessagesKey() })
      toast.success('Message archived.')
    },
    onError: (err) => toastError(err, 'Failed to archive message.'),
  })
}

export function useDeleteMessage() {
  const qc = useQueryClient()
  return useMutation<void, unknown, string>({
    mutationFn: adminDeleteMessage,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: contactMessagesKey() })
      toast.success('Message permanently deleted.')
    },
    onError: (err) => toastError(err, 'Failed to delete message.'),
  })
}

/**
 * useContactMessages — React Query hook for the paginated message list.
 *
 * Wraps GET /admin/api/contact-messages with full filter/search/sort/pagination
 * support.  Uses keepPreviousData so the UI never flashes blank while navigating
 * between pages or changing filters.
 */

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  adminGetContactMessages,
  type ContactMessageSort,
  type ContactMessageStatus,
  type ContactMessagesPage,
} from '@/lib/admin-api'

export interface UseContactMessagesParams {
  page: number
  pageSize: number
  status: ContactMessageStatus | null
  search: string
  sort: ContactMessageSort
}

/** Stable query key factory — all list queries share the 'contact-messages' namespace.
 *
 * contactMessagesKey()        → ['admin', 'contact-messages']
 *   Used in invalidateQueries — matches ALL contact-messages queries (list + detail).
 *
 * contactMessagesKey(params)  → ['admin', 'contact-messages', params]
 *   Used as a unique list query key (each filter/page combination is distinct).
 */
export function contactMessagesKey(): readonly ['admin', 'contact-messages']
export function contactMessagesKey(
  params: Partial<UseContactMessagesParams>,
): readonly ['admin', 'contact-messages', Partial<UseContactMessagesParams>]
export function contactMessagesKey(params?: Partial<UseContactMessagesParams>) {
  return params !== undefined
    ? (['admin', 'contact-messages', params] as const)
    : (['admin', 'contact-messages'] as const)
}

export function useContactMessages(params: UseContactMessagesParams) {
  return useQuery<ContactMessagesPage>({
    queryKey: contactMessagesKey(params),
    queryFn: () =>
      adminGetContactMessages({
        page: params.page,
        page_size: params.pageSize,
        // Pass null directly — adminGetContactMessages skips the param when falsy.
        // Do NOT coerce to undefined: exactOptionalPropertyTypes forbids it.
        status: params.status,
        ...(params.search ? { search: params.search } : {}),
        sort: params.sort,
      }),
    placeholderData: keepPreviousData,
  })
}

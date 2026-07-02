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

/** Stable query key factory — all list queries share the 'contact-messages' namespace. */
export function contactMessagesKey(params?: Partial<UseContactMessagesParams>) {
  return ['admin', 'contact-messages', params ?? {}] as const
}

export function useContactMessages(params: UseContactMessagesParams) {
  return useQuery<ContactMessagesPage>({
    queryKey: contactMessagesKey(params),
    queryFn: () =>
      adminGetContactMessages({
        page: params.page,
        page_size: params.pageSize,
        status: params.status ?? undefined,
        search: params.search || undefined,
        sort: params.sort,
      }),
    placeholderData: keepPreviousData,
  })
}

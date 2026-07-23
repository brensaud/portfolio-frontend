/**
 * useAdminArticles — React Query hooks for admin article management.
 *
 * articlesKey()        → ['admin', 'articles']           (invalidation prefix)
 * articlesKey(params)  → ['admin', 'articles', params]   (scoped list key)
 */

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  adminArchiveArticle,
  adminCreateArticle,
  adminDeleteArticle,
  adminGetArticle,
  adminGetArticles,
  adminPublishArticle,
  adminUnpublishArticle,
  adminUpdateArticle,
  type AdminArticleDetail,
  type AdminArticlesPage,
  type AdminArticlesQuery,
  type AdminArticleStatus,
  type ArticleCreatePayload,
  type ArticleUpdatePayload,
  AdminApiError,
  AdminNetworkError,
} from '@/lib/admin-api'

// ─── Query key factory ────────────────────────────────────────────────────────

export function articlesKey(): readonly ['admin', 'articles']
export function articlesKey(
  params: Partial<AdminArticlesQuery>,
): readonly ['admin', 'articles', Partial<AdminArticlesQuery>]
export function articlesKey(params?: Partial<AdminArticlesQuery>) {
  return params !== undefined
    ? (['admin', 'articles', params] as const)
    : (['admin', 'articles'] as const)
}

// ─── Shared error toast ───────────────────────────────────────────────────────

function toastError(err: unknown, fallback: string) {
  if (err instanceof AdminApiError) toast.error(err.detail)
  else if (err instanceof AdminNetworkError) toast.error('Connection error. Try again.')
  else toast.error(fallback)
}

// ─── List hook ────────────────────────────────────────────────────────────────

export interface UseAdminArticlesParams {
  page: number
  pageSize: number
  status: AdminArticleStatus | null
  search: string
  sort: 'created_at_desc' | 'created_at_asc' | 'published_at_desc'
}

export function useAdminArticles(params: UseAdminArticlesParams) {
  return useQuery<AdminArticlesPage>({
    queryKey: articlesKey(params),
    queryFn: () =>
      adminGetArticles({
        page: params.page,
        page_size: params.pageSize,
        status: params.status,
        ...(params.search ? { search: params.search } : {}),
        sort: params.sort,
      }),
    placeholderData: keepPreviousData,
  })
}

// ─── Detail hook ──────────────────────────────────────────────────────────────

export function useAdminArticle(id: string | null) {
  return useQuery<AdminArticleDetail>({
    queryKey: ['admin', 'articles', id],
    queryFn: () => adminGetArticle(id!),
    enabled: id !== null,
    staleTime: 30_000,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateArticle() {
  const qc = useQueryClient()
  return useMutation<AdminArticleDetail, unknown, ArticleCreatePayload>({
    mutationFn: adminCreateArticle,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: articlesKey() })
      toast.success('Draft created.')
    },
    onError: (err) => toastError(err, 'Failed to create article.'),
  })
}

export function useUpdateArticle() {
  const qc = useQueryClient()
  return useMutation<AdminArticleDetail, unknown, { id: string; payload: ArticleUpdatePayload }>({
    mutationFn: ({ id, payload }) => adminUpdateArticle(id, payload),
    onSuccess: (updated) => {
      qc.setQueryData(['admin', 'articles', updated.id], updated)
      void qc.invalidateQueries({ queryKey: articlesKey() })
      toast.success('Article saved.')
    },
    onError: (err) => toastError(err, 'Failed to save article.'),
  })
}

export function usePublishArticle() {
  const qc = useQueryClient()
  return useMutation<AdminArticleDetail, unknown, string>({
    mutationFn: adminPublishArticle,
    onSuccess: (updated) => {
      qc.setQueryData(['admin', 'articles', updated.id], updated)
      void qc.invalidateQueries({ queryKey: articlesKey() })
      toast.success('Article published.')
    },
    onError: (err) => toastError(err, 'Failed to publish article.'),
  })
}

export function useUnpublishArticle() {
  const qc = useQueryClient()
  return useMutation<AdminArticleDetail, unknown, string>({
    mutationFn: adminUnpublishArticle,
    onSuccess: (updated) => {
      qc.setQueryData(['admin', 'articles', updated.id], updated)
      void qc.invalidateQueries({ queryKey: articlesKey() })
      toast.success('Article unpublished.')
    },
    onError: (err) => toastError(err, 'Failed to unpublish article.'),
  })
}

export function useArchiveAdminArticle() {
  const qc = useQueryClient()
  return useMutation<AdminArticleDetail, unknown, string>({
    mutationFn: adminArchiveArticle,
    onSuccess: (updated) => {
      qc.setQueryData(['admin', 'articles', updated.id], updated)
      void qc.invalidateQueries({ queryKey: articlesKey() })
      toast.success('Article archived.')
    },
    onError: (err) => toastError(err, 'Failed to archive article.'),
  })
}

export function useDeleteAdminArticle() {
  const qc = useQueryClient()
  return useMutation<void, unknown, string>({
    mutationFn: adminDeleteArticle,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: articlesKey() })
      toast.success('Article permanently deleted.')
    },
    onError: (err) => toastError(err, 'Failed to delete article.'),
  })
}

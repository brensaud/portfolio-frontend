/**
 * AdminArticlesPage — admin Articles section.
 *
 * Lists all articles across all statuses with filtering, search, and
 * inline row actions. Selecting a row opens a simple detail/edit panel.
 *
 * State:
 *   page, pageSize, status, search, sort  — list controls
 *   selectedId                            — drives detail panel
 *   pendingDeleteId                       — delete confirm dialog
 */

import { useCallback, useState } from 'react'
import { AlertCircle, ChevronLeft, ChevronRight, Eye, Loader2, PenLine, Trash2 } from 'lucide-react'
import { usePageTitle } from '@/hooks/use-page-title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type AdminArticleStatus, type AdminArticleSummary } from '@/lib/admin-api'
import { ArticleStatusBadge } from '@/features/admin/articles/article-status-badge'
import {
  useAdminArticles,
  usePublishArticle,
  useUnpublishArticle,
  useArchiveAdminArticle,
  useDeleteAdminArticle,
} from '@/features/admin/articles/use-admin-articles'

type StatusFilter = AdminArticleStatus | 'all'

const PAGE_SIZE = 20

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ── Skeleton rows ─────────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-border">
          <td className="px-4 py-3"><Skeleton variant="text" className="w-16" /></td>
          <td className="px-4 py-3"><Skeleton variant="text" className="w-48" /></td>
          <td className="px-4 py-3"><Skeleton variant="text" className="w-20" /></td>
          <td className="px-4 py-3"><Skeleton variant="text" className="w-24" /></td>
          <td className="px-4 py-3"><Skeleton variant="rect" className="h-7 w-20" /></td>
        </tr>
      ))}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function AdminArticlesPage() {
  usePageTitle('Articles')

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [pendingDeleteTitle, setPendingDeleteTitle] = useState('')

  const publish   = usePublishArticle()
  const unpublish = useUnpublishArticle()
  const archive   = useArchiveAdminArticle()
  const del       = useDeleteAdminArticle()

  const anyPending =
    publish.isPending || unpublish.isPending || archive.isPending || del.isPending

  const { data, isLoading, isError, refetch } = useAdminArticles({
    page,
    pageSize: PAGE_SIZE,
    status: statusFilter === 'all' ? null : statusFilter,
    search,
    sort: 'created_at_desc',
  })

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }, [])

  const handleStatusChange = useCallback((val: string) => {
    setStatusFilter(val as StatusFilter)
    setPage(1)
  }, [])

  const handleDeleteRequest = useCallback((article: AdminArticleSummary) => {
    setPendingDeleteId(article.id)
    setPendingDeleteTitle(article.title)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (!pendingDeleteId) return
    del.mutate(pendingDeleteId, {
      onSuccess: () => setPendingDeleteId(null),
      onError: () => setPendingDeleteId(null),
    })
  }, [pendingDeleteId, del])

  const totalPages = data?.pages ?? 0

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-text-tertiary">Admin</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary">Articles</h1>
        {data && (
          <p className="mt-1 text-sm text-text-secondary">
            {data.total === 0 ? 'No articles' : `${data.total} article${data.total === 1 ? '' : 's'}`}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search title or summary…"
            value={search}
            onChange={handleSearchChange}
            aria-label="Search articles"
            className="h-9 text-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger aria-label="Filter by status" className="h-9 w-full text-sm sm:w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error state */}
      {isError && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          <AlertCircle size={16} aria-hidden />
          <span>Failed to load articles.</span>
          <Button variant="ghost" size="sm" onClick={() => void refetch()} className="ml-auto text-error">
            Retry
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-raised text-left">
              <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">Status</th>
              <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">Title</th>
              <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">Category</th>
              <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">Created</th>
              <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-tertiary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : (data?.items ?? []).length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-sm text-text-tertiary">
                  <PenLine size={32} className="mx-auto mb-3 opacity-30" aria-hidden />
                  No articles found.
                </td>
              </tr>
            ) : (
              (data?.items ?? []).map(article => (
                <tr
                  key={article.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3">
                    <ArticleStatusBadge status={article.status} />
                  </td>
                  <td className="max-w-xs px-4 py-3">
                    <p className="truncate font-medium text-text-primary" title={article.title}>
                      {article.title}
                    </p>
                    <p className="truncate text-xs text-text-tertiary">{article.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{article.category}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-text-tertiary">
                    {formatDate(article.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* Publish / Unpublish */}
                      {article.status === 'draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={anyPending}
                          onClick={() => publish.mutate(article.id)}
                          title="Publish"
                          aria-label={`Publish ${article.title}`}
                        >
                          <Eye size={14} aria-hidden />
                          Publish
                        </Button>
                      )}
                      {article.status === 'published' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={anyPending}
                          onClick={() => unpublish.mutate(article.id)}
                          title="Unpublish"
                          aria-label={`Unpublish ${article.title}`}
                        >
                          Unpublish
                        </Button>
                      )}
                      {/* Archive */}
                      {article.status !== 'archived' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={anyPending}
                          onClick={() => archive.mutate(article.id)}
                          title="Archive"
                          aria-label={`Archive ${article.title}`}
                        >
                          Archive
                        </Button>
                      )}
                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={anyPending}
                        onClick={() => handleDeleteRequest(article)}
                        title="Delete"
                        aria-label={`Delete ${article.title}`}
                        className="text-error hover:text-error"
                      >
                        <Trash2 size={14} aria-hidden />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-text-tertiary">Page {page} of {totalPages}</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled={page <= 1 || anyPending}
              onClick={() => setPage(p => p - 1)} aria-label="Previous page">
              <ChevronLeft size={14} aria-hidden />Prev
            </Button>
            <Button variant="secondary" size="sm" disabled={page >= totalPages || anyPending}
              onClick={() => setPage(p => p + 1)} aria-label="Next page">
              Next<ChevronRight size={14} aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirm dialog */}
      <Dialog open={pendingDeleteId !== null} onOpenChange={(v) => { if (!v) setPendingDeleteId(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete article permanently?</DialogTitle>
            <DialogDescription>
              <strong className="text-text-primary">{pendingDeleteTitle}</strong> will be permanently
              removed. This cannot be undone. Consider archiving instead.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" size="sm" disabled={del.isPending}
              onClick={() => setPendingDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" disabled={del.isPending} onClick={handleDeleteConfirm}>
              {del.isPending && <Loader2 size={14} className="animate-spin" aria-hidden />}
              Delete permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

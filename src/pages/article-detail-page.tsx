/**
 * ArticleDetailPage — public article reader at /writing/:slug.
 *
 * Fetches the full article from GET /api/v1/articles/{slug}.
 * Renders the Markdown body using react-markdown with syntax highlighting.
 *
 * States:
 *   Loading  → skeleton layout
 *   Error    → 404-style message with back link
 *   Success  → full article with metadata and rendered Markdown body
 */

import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { getArticle, ArticleApiError } from '@/lib/articles-api'
import { usePageTitle } from '@/hooks/use-page-title'
import { ROUTES } from '@/constants/routes'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/ui/container'

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function ArticleSkeleton() {
  return (
    <Container className="py-16 max-w-3xl">
      <Skeleton variant="text" className="mb-6 w-20" />
      <Skeleton variant="text" className="mb-4 h-10 w-3/4" />
      <Skeleton variant="text" className="mb-2 w-full" />
      <Skeleton variant="text" className="mb-8 w-2/3" />
      <div className="space-y-3 mt-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="text" className={i % 4 === 3 ? 'w-2/3' : 'w-full'} />
        ))}
      </div>
    </Container>
  )
}

// ─── Error / not found state ──────────────────────────────────────────────────

function ArticleNotFound() {
  return (
    <Container className="py-24 max-w-3xl text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
        Not found
      </p>
      <h1 className="mb-4 text-2xl font-bold text-text-primary">
        Article not found
      </h1>
      <p className="mb-8 text-text-secondary">
        This article doesn't exist or hasn't been published yet.
      </p>
      <Link
        to={ROUTES.WRITING}
        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
      >
        <ArrowLeft size={14} aria-hidden />
        Back to writing
      </Link>
    </Container>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['articles', 'detail', slug],
    queryFn: () => getArticle(slug!),
    enabled: !!slug,
    staleTime: 60_000,
    retry: (failureCount, err) => {
      // Don't retry on 404 — the article genuinely doesn't exist or isn't published
      if (err instanceof ArticleApiError && err.status === 404) return false
      return failureCount < 2
    },
  })

  // Dynamic page title once the article is loaded
  usePageTitle(article?.title)

  if (isLoading) return <ArticleSkeleton />

  const isNotFound =
    error instanceof ArticleApiError && error.status === 404
  if (error || !article) return <ArticleNotFound />
  if (isNotFound) return <ArticleNotFound />

  return (
    <main>
      <article className="py-12 sm:py-16" aria-labelledby="article-heading">
        <Container className="max-w-3xl">

          {/* Back link */}
          <Link
            to={ROUTES.WRITING}
            className="mb-10 inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={14} aria-hidden />
            All articles
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="accent" size="sm">{article.category}</Badge>
              {article.reading_time_minutes && (
                <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
                  <Clock size={12} aria-hidden />
                  {article.reading_time_minutes} min read
                </span>
              )}
            </div>

            <h1
              id="article-heading"
              className="mb-4 text-3xl font-bold leading-snug tracking-tight text-text-primary sm:text-4xl"
            >
              {article.title}
            </h1>

            <p className="mb-6 text-lg leading-relaxed text-text-secondary">
              {article.summary}
            </p>

            {/* Tags */}
            {article.tags.length > 0 && (
              <ul className="mb-6 flex flex-wrap gap-2" aria-label="Article tags">
                {article.tags.map(tag => (
                  <li key={tag}>
                    <span className="rounded border border-border bg-surface-raised px-2.5 py-1 text-xs text-text-secondary">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <time
              dateTime={article.published_at}
              className="flex items-center gap-1.5 text-xs text-text-tertiary"
            >
              <Calendar size={12} aria-hidden />
              Published {formatDate(article.published_at)}
            </time>
          </header>

          {/* Divider */}
          <hr className="mb-12 border-border" />

          {/* Markdown body */}
          {article.body ? (
            <div className="prose prose-sm sm:prose-base max-w-none
              prose-headings:text-text-primary prose-headings:font-bold prose-headings:tracking-tight
              prose-p:text-text-secondary prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-code:text-accent prose-code:before:content-none prose-code:after:content-none
              prose-code:rounded prose-code:bg-surface-raised prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
              prose-pre:bg-surface-raised prose-pre:border prose-pre:border-border prose-pre:rounded-lg
              prose-blockquote:border-l-accent prose-blockquote:text-text-secondary
              prose-hr:border-border
              prose-li:text-text-secondary
              prose-img:rounded-lg prose-img:border prose-img:border-border"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {article.body}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-text-secondary">Article body coming soon.</p>
          )}

        </Container>
      </article>
    </main>
  )
}

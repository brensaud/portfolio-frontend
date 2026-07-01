/**
 * ArticleGrid — §3: filterable grid of article preview cards.
 *
 * Category filter uses local state (not URL params) — appropriate for
 * a pre-publication writing index where articles aren't individually
 * linkable yet. The filter resets to 'All' between renders.
 *
 * Accessibility:
 *   - Filter buttons use aria-pressed
 *   - aria-live="polite" announces filtered result count to screen readers
 *   - Each article card has a semantic <article> element with aria-labelledby
 */
import { useState } from 'react'
import { Clock } from 'lucide-react'
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  ARTICLE_STATUS_VARIANT,
  type ArticleCategory,
} from '@/data/articles'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterOption = 'All' | ArticleCategory

const FILTER_OPTIONS: readonly FilterOption[] = ['All', ...ARTICLE_CATEGORIES]

// ─── Article card ─────────────────────────────────────────────────────────────

interface ArticleCardProps {
  article: (typeof ARTICLES)[number]
}

function ArticleCard({ article }: ArticleCardProps) {
  const statusVariant = ARTICLE_STATUS_VARIANT[article.status]
  const titleId = `article-title-${article.id}`

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border"
    >
      {/* Meta row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="accent" size="sm">{article.category}</Badge>
        <Badge variant={statusVariant} size="sm">{article.status}</Badge>
        <span className="ml-auto flex items-center gap-1 text-xs text-text-tertiary">
          <Clock size={11} aria-hidden />
          {article.readingTime}
        </span>
      </div>

      {/* Title */}
      <h3
        id={titleId}
        className="mb-2 text-sm font-semibold leading-snug text-text-primary sm:text-base"
      >
        {article.title}
      </h3>

      {/* Description */}
      <p className="mb-4 flex-1 text-xs leading-relaxed text-text-secondary sm:text-sm">
        {article.description}
      </p>

      {/* Tags */}
      <ul
        className="mb-4 flex flex-wrap gap-1.5"
        aria-label={`Tags for ${article.title}`}
      >
        {article.tags.map(tag => (
          <li key={tag}>
            <span className="rounded border border-border bg-surface-raised px-2 py-0.5 text-xs text-text-tertiary">
              {tag}
            </span>
          </li>
        ))}
      </ul>

      {/* Status indicator — no link because article is not published */}
      <p className="mt-auto text-xs text-text-tertiary" aria-label={`Article status: ${article.status}`}>
        {article.status === 'In progress' || article.status === 'Draft'
          ? 'In the works'
          : 'Publishing planned'}
      </p>
    </article>
  )
}

// ─── Article grid ─────────────────────────────────────────────────────────────

export function ArticleGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All')

  const nonFeatured = ARTICLES.filter(a => !a.featured)

  const filtered =
    activeFilter === 'All'
      ? nonFeatured
      : nonFeatured.filter(a => a.category === activeFilter)

  function handleFilterClick(option: FilterOption) {
    setActiveFilter(option)
  }

  return (
    <Section id="articles" aria-labelledby="articles-heading">
      <Container>
        {/* Section heading */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            All articles
          </p>
          <h2
            id="articles-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            What I'm writing
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Eight articles planned across backend, AI, databases, and DevOps.
          </p>
        </div>

        {/* Category filter */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter articles by category"
        >
          {FILTER_OPTIONS.map(option => (
            <button
              key={option}
              onClick={() => handleFilterClick(option)}
              aria-pressed={activeFilter === option}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                activeFilter === option
                  ? 'border-accent bg-accent text-text-on-accent'
                  : 'border-border bg-transparent text-text-secondary hover:border-accent/40 hover:bg-surface hover:text-text-primary',
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Screen-reader live region for result count */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filtered.length === 1
            ? `1 article`
            : `${filtered.length} articles`}
          {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
        </p>

        {/* Article grid */}
        {filtered.length > 0 ? (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label={activeFilter === 'All' ? 'All articles' : `${activeFilter} articles`}
          >
            {filtered.map((article) => (
              <div key={article.id} role="listitem">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface px-6 py-12 text-center">
            <p className="text-sm text-text-secondary">
              No articles in{' '}
              <span className="font-medium text-text-primary">{activeFilter}</span>{' '}
              yet. Check back soon.
            </p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all articles
            </button>
          </div>
        )}
      </Container>
    </Section>
  )
}

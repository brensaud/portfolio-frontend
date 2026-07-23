/**
 * ArticleGrid — §3: filterable grid of published article preview cards.
 * Sprint 3: migrated from static data to React Query fetch.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Clock } from 'lucide-react'
import { getArticles, type ArticleListItem } from '@/lib/articles-api'
import { writingDetailPath } from '@/constants/routes'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'All', 'Backend', 'FastAPI', 'AI Engineering',
  'System Design', 'Databases', 'DevOps', 'Testing', 'Career Notes',
] as const

type CategoryFilter = (typeof CATEGORIES)[number]

function ArticleCard({ article }: { article: ArticleListItem }) {
  const titleId = `article-title-${article.id}`
  return (
    <Link
      to={writingDetailPath(article.slug)}
      aria-labelledby={titleId}
      className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface-raised"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="accent" size="sm">{article.category}</Badge>
        {article.reading_time_minutes && (
          <span className="ml-auto flex items-center gap-1 text-xs text-text-tertiary">
            <Clock size={11} aria-hidden />{article.reading_time_minutes} min read
          </span>
        )}
      </div>
      <h3 id={titleId} className="mb-2 text-sm font-semibold leading-snug text-text-primary group-hover:text-accent sm:text-base">
        {article.title}
      </h3>
      <p className="mb-4 flex-1 text-xs leading-relaxed text-text-secondary sm:text-sm">{article.summary}</p>
      {article.tags.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-1.5" aria-label={`Tags for ${article.title}`}>
          {article.tags.map(tag => (
            <li key={tag}><span className="rounded border border-border bg-surface-raised px-2 py-0.5 text-xs text-text-tertiary">{tag}</span></li>
          ))}
        </ul>
      )}
      <span className="mt-auto flex items-center gap-1 text-xs font-medium text-accent">
        Read article<ArrowRight size={11} aria-hidden />
      </span>
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
      <div className="flex gap-2"><Skeleton variant="text" className="w-16" /><Skeleton variant="text" className="ml-auto w-12" /></div>
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-full" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  )
}

export function ArticleGrid() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All')

  const { data, isLoading } = useQuery({
    queryKey: ['articles', { category: activeFilter === 'All' ? undefined : activeFilter }],
    queryFn: () => getArticles({ page_size: 50, ...(activeFilter !== 'All' ? { category: activeFilter } : {}) }),
    staleTime: 60_000,
  })

  const articles = data?.items ?? []

  return (
    <Section id="articles" aria-labelledby="articles-heading">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">All articles</p>
          <h2 id="articles-heading" className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Engineering writing</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">Practical deep-dives on FastAPI, async Python, system design, and production engineering.</p>
        </div>
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {CATEGORIES.map(option => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              aria-pressed={activeFilter === option}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                activeFilter === option ? 'border-accent bg-accent text-text-on-accent' : 'border-border bg-transparent text-text-secondary hover:border-accent/40 hover:bg-surface hover:text-text-primary',
              )}
            >{option}</button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {isLoading ? 'Loading articles' : articles.length === 1 ? '1 article' : `${articles.length} articles`}
        </p>
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {!isLoading && articles.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label={activeFilter === 'All' ? 'All articles' : `${activeFilter} articles`}>
            {articles.map(article => (
              <div key={article.id} role="listitem"><ArticleCard article={article} /></div>
            ))}
          </div>
        )}
        {!isLoading && articles.length === 0 && (
          <div className="rounded-xl border border-border bg-surface px-6 py-12 text-center">
            <p className="text-sm text-text-secondary">
              {activeFilter !== 'All' ? <>No articles in <span className="font-medium text-text-primary">{activeFilter}</span> yet.</> : 'Articles are in the works. Check back soon.'}
            </p>
            {activeFilter !== 'All' && (
              <button onClick={() => setActiveFilter('All')} className="mt-4 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">View all articles</button>
            )}
          </div>
        )}
      </Container>
    </Section>
  )
}

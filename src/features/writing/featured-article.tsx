/**
 * FeaturedArticle — §2: promoted article card for the /writing page.
 *
 * Sprint 3: migrated from static data to React Query fetch.
 * Renders the single article with featured=true from the published articles.
 * Returns null if no featured published article exists.
 */
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Clock, ArrowRight } from 'lucide-react'
import { getArticles } from '@/lib/articles-api'
import { writingDetailPath } from '@/constants/routes'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export function FeaturedArticle() {
  const { data, isLoading } = useQuery({
    queryKey: ['articles', { featured: true }],
    queryFn: () => getArticles({ featured: true, page_size: 1 }),
    staleTime: 60_000,
  })

  const article = data?.items[0]

  // Loading skeleton
  if (isLoading) {
    return (
      <Section id="featured-article" className="bg-surface">
        <Container>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Featured article
          </p>
          <div className="rounded-2xl border border-accent/25 bg-accent-subtle p-8 sm:p-10 space-y-4">
            <div className="flex gap-2"><Skeleton variant="text" className="w-20" /></div>
            <Skeleton variant="text" className="w-3/4 h-8" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </Container>
      </Section>
    )
  }

  // No featured article published — section hidden
  if (!article) return null

  return (
    <Section
      id="featured-article"
      aria-labelledby="featured-article-heading"
      className="bg-surface"
    >
      <Container>
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Featured article
        </p>

        <Link
          to={writingDetailPath(article.slug)}
          aria-labelledby="featured-article-title"
          className="group relative block overflow-hidden rounded-2xl border border-accent/25 bg-accent-subtle p-8 transition-colors hover:border-accent/50 sm:p-10"
        >
          {/* Subtle radial decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-3xl"
          />

          {/* Meta row */}
          <div className="relative mb-5 flex flex-wrap items-center gap-3">
            <Badge variant="accent" size="sm">{article.category}</Badge>
            {article.reading_time_minutes && (
              <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <Clock size={12} aria-hidden />
                {article.reading_time_minutes} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            id="featured-article-title"
            className="relative mb-4 max-w-2xl text-2xl font-bold leading-snug tracking-tight text-text-primary group-hover:text-accent sm:text-3xl"
          >
            {article.title}
          </h2>

          {/* Summary */}
          <p className="relative mb-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            {article.summary}
          </p>

          {/* Tags */}
          {article.tags.length > 0 && (
            <ul
              className="relative mb-8 flex flex-wrap gap-2"
              aria-label={`Tags for ${article.title}`}
            >
              {article.tags.map(tag => (
                <li key={tag}>
                  <span className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="relative flex items-center gap-2 text-sm font-medium text-accent">
            Read article
            <ArrowRight size={14} aria-hidden />
          </div>
        </Link>
      </Container>
    </Section>
  )
}

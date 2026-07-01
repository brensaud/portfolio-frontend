/**
 * FeaturedArticle — §2: promoted article card for the /writing page.
 *
 * Renders the single article with `featured: true` as a larger, accented
 * card. Since no articles are published yet, shows a clear "In progress"
 * status and does not link to a non-existent detail page.
 */
import { Clock, Pencil } from 'lucide-react'
import { ARTICLES, ARTICLE_STATUS_VARIANT } from '@/data/articles'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'

export function FeaturedArticle() {
  const article = ARTICLES.find(a => a.featured)
  if (!article) return null

  const statusVariant = ARTICLE_STATUS_VARIANT[article.status]

  return (
    <Section
      id="featured-article"
      aria-labelledby="featured-article-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section label */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Featured article
        </p>

        {/* Featured card */}
        <article
          aria-labelledby="featured-article-title"
          className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent-subtle p-8 sm:p-10"
        >
          {/* Subtle radial decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-3xl"
          />

          {/* Meta row */}
          <div className="relative mb-5 flex flex-wrap items-center gap-3">
            <Badge variant="accent" size="sm">{article.category}</Badge>
            <Badge variant={statusVariant} size="sm">{article.status}</Badge>
            <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <Clock size={12} aria-hidden />
              {article.readingTime}
            </span>
          </div>

          {/* Title */}
          <h2
            id="featured-article-title"
            className="relative mb-4 max-w-2xl text-2xl font-bold leading-snug tracking-tight text-text-primary sm:text-3xl"
          >
            {article.title}
          </h2>

          {/* Description */}
          <p className="relative mb-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            {article.description}
          </p>

          {/* Tags */}
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

          {/* CTA — shown as status indicator since article is not yet published */}
          <div className="relative flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-accent">
              <Pencil size={14} aria-hidden />
              {article.status === 'In progress'
                ? 'Currently being written'
                : 'Publishing soon'}
            </span>
          </div>
        </article>
      </Container>
    </Section>
  )
}

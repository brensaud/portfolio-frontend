/**
 * WritingPreviewSection — teaser for future engineering articles.
 *
 * Placeholder articles signal intent and build credibility even before
 * real articles are published. Each preview links to the full Writing page.
 *
 * Layout: vertical list of article rows, each with title, date, and description.
 * Articles are rendered as <article> elements within an <ol> for semantic order.
 */
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ROUTES } from '@/constants/routes'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ArticlePreview {
  slug: string
  title: string
  date: string
  description: string
  tag: string
  isPublished: boolean
}

const ARTICLE_PREVIEWS: ArticlePreview[] = [
  {
    slug: 'designing-scalable-fastapi-apis',
    title: 'Designing Scalable FastAPI APIs',
    date: 'Coming soon',
    description:
      'Patterns for structuring FastAPI projects that grow: dependency injection, repository pattern, and async-first database access.',
    tag: 'Backend',
    isPublished: false,
  },
  {
    slug: 'building-ai-saas-production-architecture',
    title: 'Building AI SaaS Systems with Production Architecture',
    date: 'Coming soon',
    description:
      'How to wire LLM tooling, vector search, and async background tasks into a backend that can handle production traffic.',
    tag: 'AI / SaaS',
    isPublished: false,
  },
  {
    slug: 'postgresql-patterns-backend-engineers',
    title: 'PostgreSQL Patterns for Backend Engineers',
    date: 'Coming soon',
    description:
      'Indexing strategies, query analysis, and schema design decisions that keep PostgreSQL fast as data grows.',
    tag: 'Database',
    isPublished: false,
  },
]

// ─── ArticleRow ───────────────────────────────────────────────────────────────

function ArticleRow({ article }: { article: ArticlePreview }) {
  return (
    <li>
      <article
        aria-labelledby={`article-${article.slug}`}
        className={cn(
          'group flex flex-col gap-3 rounded-lg border border-transparent py-5',
          'sm:flex-row sm:items-start sm:gap-6',
          'border-b border-border last:border-b-0',
        )}
      >
        {/* Date column */}
        <div className="shrink-0 sm:w-28">
          <time
            className="text-xs font-medium text-text-tertiary"
            dateTime={article.isPublished ? article.date : undefined}
          >
            {article.date}
          </time>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" size="sm">
              {article.tag}
            </Badge>
            {!article.isPublished && (
              <Badge variant="default" size="sm">
                Upcoming
              </Badge>
            )}
          </div>

          <h3
            id={`article-${article.slug}`}
            className="text-base font-semibold tracking-tight text-text-primary"
          >
            {article.isPublished ? (
              <Link
                to={`${ROUTES.WRITING}/${article.slug}`}
                className={cn(
                  'transition-colors duration-[--duration-fast] hover:text-accent',
                  'focus-visible:rounded-sm focus-visible:outline-none',
                  'focus-visible:ring-2 focus-visible:ring-accent',
                )}
              >
                {article.title}
                <ArrowUpRight size={14} className="ml-1 inline-block" aria-hidden="true" />
              </Link>
            ) : (
              article.title
            )}
          </h3>

          <p className="text-sm leading-relaxed text-text-secondary">
            {article.description}
          </p>
        </div>
      </article>
    </li>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function WritingPreviewSection() {
  return (
    <Section
      aria-labelledby="writing-preview-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
              Writing
            </p>
            <h2
              id="writing-preview-heading"
              className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              Engineering notes
            </h2>
            <p className="mt-2 max-w-md text-base leading-relaxed text-text-secondary">
              Articles on backend architecture, databases, and building with AI — coming soon.
            </p>
          </div>

          <Link
            to={ROUTES.WRITING}
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent',
              'transition-colors duration-[--duration-fast] hover:text-accent-hover',
              'focus-visible:rounded-sm focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              'focus-visible:ring-offset-surface',
            )}
          >
            All articles
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Article list */}
        <ol role="list" aria-label="Upcoming engineering articles">
          {ARTICLE_PREVIEWS.map(article => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </ol>
      </Container>
    </Section>
  )
}

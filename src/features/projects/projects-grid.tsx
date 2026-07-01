/**
 * ProjectsGridSection — filterable grid of all portfolio projects.
 *
 * Filter implementation:
 *   URL search params (?category=AI) drive the active filter, making each
 *   filtered view bookmarkable and shareable. React Router's useSearchParams
 *   provides the state — no extra state management library needed.
 *
 * Filter categories: All | Backend | AI | SaaS | DevOps
 *   - Projects can belong to multiple categories
 *   - "All" shows every project
 *   - Other filters show projects whose categories[] includes the selection
 *
 * Accessibility:
 *   - Filter buttons use role="group" + aria-label on the container
 *   - Each filter button has aria-pressed for toggle state
 *   - A visually hidden aria-live region announces the filtered count
 *   - Each project card is an <article> with aria-labelledby
 *   - Cards have a single primary link (title) + a footer CTA with aria-label
 *
 * Layout:
 *   - Mobile: 1 column
 *   - sm (640px): 2 columns
 *   - lg (1024px): 3 columns
 */
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import {
  PROJECTS,
  STATUS_BADGE_VARIANT,
  type Project,
} from '@/data/projects'
import { workDetailPath } from '@/constants/routes'

// ─── Filter config ────────────────────────────────────────────────────────────

const FILTER_OPTIONS = ['All', 'Backend', 'AI', 'SaaS', 'DevOps'] as const
type FilterOption = (typeof FILTER_OPTIONS)[number]

function isFilterOption(value: string): value is FilterOption {
  return (FILTER_OPTIONS as readonly string[]).includes(value)
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const cardId = `project-${project.slug}`
  const caseStudyPath = workDetailPath(project.slug)

  return (
    <article
      aria-labelledby={cardId}
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-surface',
        'transition-all duration-[--duration-base]',
        'hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg',
      )}
    >
      {/* ── Card body ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Category + status badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {project.categories.map(cat => (
            <Badge key={cat} variant="accent" size="sm">
              {cat}
            </Badge>
          ))}
          <Badge variant={STATUS_BADGE_VARIANT[project.status]} size="sm">
            {project.status}
          </Badge>
        </div>

        {/* Title */}
        <div>
          <h3
            id={cardId}
            className="mb-0.5 text-lg font-semibold tracking-tight text-text-primary"
          >
            <Link
              to={caseStudyPath}
              className={cn(
                'transition-colors duration-[--duration-fast] hover:text-accent',
                'focus-visible:rounded-sm focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'focus-visible:ring-offset-surface',
              )}
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-xs font-medium text-text-tertiary">
            {project.subtitle}
          </p>
        </div>

        {/* Problem */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Problem
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Solution
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">
            {project.solution}
          </p>
        </div>

        {/* Tech stack */}
        <div
          className="mt-auto flex flex-wrap gap-1.5 pt-2"
          role="list"
          aria-label={`Technologies in ${project.title}`}
        >
          {project.techStack.slice(0, 5).map(t => (
            <span key={t} role="listitem">
              <Badge variant="outline" size="sm">
                {t}
              </Badge>
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span
              className="flex items-center text-xs text-text-tertiary"
              aria-label={`and ${project.techStack.length - 5} more technologies`}
            >
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ── Card footer ─────────────────────────────────────────── */}
      <div className="border-t border-border px-6 py-4">
        <Link
          to={caseStudyPath}
          aria-label={`View ${project.title} case study`}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary',
            'transition-colors duration-[--duration-fast] hover:text-accent',
            'focus-visible:rounded-sm focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            'focus-visible:ring-offset-surface',
          )}
        >
          View case study
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-[--duration-fast] group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  )
}

// ─── FilterBar ────────────────────────────────────────────────────────────────

function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FilterOption
  onFilterChange: (filter: FilterOption) => void
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {FILTER_OPTIONS.map(option => {
        const isActive = option === activeFilter
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(option)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium',
              'transition-colors duration-[--duration-fast]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isActive
                ? 'border-accent bg-accent-subtle text-accent'
                : 'border-border bg-surface-raised text-text-secondary hover:border-accent/40 hover:text-text-primary',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProjectsGridSection() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read + validate the category param from the URL
  const rawCategory = searchParams.get('category') ?? 'All'
  const activeFilter: FilterOption = isFilterOption(rawCategory) ? rawCategory : 'All'

  function handleFilterChange(filter: FilterOption) {
    if (filter === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: filter })
    }
  }

  // Derive filtered list — cast is safe: we checked !== 'All' in the filter
  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter(p =>
          (p.categories as readonly string[]).includes(activeFilter),
        )

  const resultLabel =
    activeFilter === 'All'
      ? `Showing all ${filteredProjects.length} projects`
      : `Showing ${filteredProjects.length} ${activeFilter} project${filteredProjects.length === 1 ? '' : 's'}`

  return (
    <Section
      aria-labelledby="projects-grid-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section header + filter bar */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
              All Projects
            </p>
            <h2
              id="projects-grid-heading"
              className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
            >
              Engineering case studies
            </h2>
          </div>

          {/* Filter bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Live region: announces filter result count to screen readers */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {resultLabel}
        </p>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          // Empty state — shouldn't occur with current data, but required for robustness
          <div className="py-20 text-center">
            <p className="text-base text-text-secondary">
              No projects in the{' '}
              <span className="font-medium text-text-primary">{activeFilter}</span>{' '}
              category yet.
            </p>
            <button
              type="button"
              onClick={() => handleFilterChange('All')}
              className={cn(
                'mt-4 text-sm font-medium text-accent',
                'hover:text-accent-hover focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-accent',
              )}
            >
              View all projects
            </button>
          </div>
        )}
      </Container>
    </Section>
  )
}

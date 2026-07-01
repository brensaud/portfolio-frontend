/**
 * FeaturedProjects — curated showcase of 3 engineering case studies.
 *
 * Each project card communicates:
 *   - Category (AI SaaS, Backend, etc.)
 *   - Project name with a direct link to the case study
 *   - The engineering problem it solves
 *   - The technical solution
 *   - Core tech stack
 *
 * Accessibility:
 *   - Each card is an <article> with aria-labelledby pointing to its h3
 *   - The title and "View case study" links are separate — different link text
 *     prevents duplicate-link issues for screen reader users
 *   - Tech stack badges are in a role="list" with aria-label
 *
 * Layout:
 *   - Mobile (< sm): 1 column
 *   - Tablet (sm): 2 columns
 *   - Desktop (lg): 3 columns
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { PROJECTS, type Project } from '@/data/projects'
import { workDetailPath } from '@/constants/routes'

// ─── Data ─────────────────────────────────────────────────────────────────────

// Show the first 3 projects from the canonical registry
const HOME_FEATURED = PROJECTS.slice(0, 3)

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const cardId = `home-project-card-${project.slug}`
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
      {/* Card content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Category badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map(cat => (
            <Badge key={cat} variant="accent" size="sm">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 id={cardId} className="text-xl font-semibold tracking-tight text-text-primary">
          <Link
            to={caseStudyPath}
            className={cn(
              'transition-colors duration-[--duration-fast]',
              'hover:text-accent focus-visible:rounded-sm focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              'focus-visible:ring-offset-surface',
            )}
          >
            {project.title}
          </Link>
        </h3>

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
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.techStack.slice(0, 5).map(t => (
            <span key={t} role="listitem">
              <Badge variant="outline" size="sm">
                {t}
              </Badge>
            </span>
          ))}
        </div>
      </div>

      {/* Card footer — explicit CTA */}
      <div className="border-t border-border px-6 py-4">
        <Link
          to={caseStudyPath}
          aria-label={`View ${project.title} case study`}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary',
            'transition-colors duration-[--duration-fast]',
            'hover:text-accent focus-visible:rounded-sm focus-visible:outline-none',
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturedProjectsSection() {
  return (
    <Section aria-labelledby="featured-projects-heading">
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Selected Work
          </p>
          <h2
            id="featured-projects-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Engineering case studies
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Production systems that solve real problems — from AI-powered SaaS to
            backend infrastructure.
          </p>
        </div>

        {/* Project cards */}
        <Grid cols={3} gap={6}>
          {HOME_FEATURED.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

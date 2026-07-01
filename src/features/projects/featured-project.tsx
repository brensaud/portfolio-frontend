/**
 * FeaturedProjectSection — prominent spotlight on the portfolio's strongest project.
 *
 * Visual intent: wider than a grid card, with a two-column layout on md+ that
 * separates the narrative (problem/solution/highlights) from the technical
 * detail (tech stack, status). The accent-tinted border signals this card is
 * treated differently from the grid below.
 *
 * Heading hierarchy:
 *   h1 → "Selected systems and product experiments." (ProjectsHeroSection)
 *   h2 → project title (this component — the section IS the project)
 *   Sibling h2s follow for subsequent sections
 *
 * Accessibility:
 *   - The section is labelled by the project title via aria-labelledby
 *   - Tech stack is a role="list" with an aria-label
 *   - Highlights are a role="list"
 *   - Two links with different visible text: title link + CTA link
 *   - Status badge uses color + text (not color alone)
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { PROJECTS, STATUS_BADGE_VARIANT } from '@/data/projects'
import { workDetailPath } from '@/constants/routes'

// ─── Component ────────────────────────────────────────────────────────────────

export function FeaturedProjectSection() {
  const project = PROJECTS.find(p => p.featured)
  if (!project) return null

  const caseStudyPath = workDetailPath(project.slug)

  return (
    <Section aria-labelledby="featured-project-title">
      <Container>
        {/* Section eyebrow */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Featured Project
        </p>

        {/* Card */}
        <div
          className={cn(
            'rounded-2xl border border-accent/25 bg-surface',
            'p-7 sm:p-10',
          )}
        >
          {/* Two-column layout on md+ */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-14">

            {/* ── Left column: narrative ─────────────────────────────────── */}
            <div className="flex flex-1 flex-col gap-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
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
                <h2
                  id="featured-project-title"
                  className="mb-1 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
                >
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
                </h2>
                <p className="text-sm font-medium text-text-tertiary">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-text-secondary">
                {project.description}
              </p>

              {/* Problem / Solution */}
              <div className="space-y-4">
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                    Problem
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                    Solution
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-2">
                <Link
                  to={caseStudyPath}
                  aria-label={`View ${project.title} case study`}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5',
                    'text-sm font-medium text-text-on-accent',
                    'transition-colors duration-[--duration-fast] hover:bg-accent-hover',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    'focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                  )}
                >
                  View case study
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* ── Right column: technical detail ─────────────────────────── */}
            <div className="flex shrink-0 flex-col gap-7 md:w-56">

              {/* Tech Stack */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Tech Stack
                </p>
                <ul
                  role="list"
                  className="space-y-2"
                  aria-label={`Technologies used in ${project.title}`}
                >
                  {project.techStack.map(tech => (
                    <li
                      key={tech}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Highlights */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Engineering Focus
                </p>
                <ul
                  role="list"
                  className="space-y-2"
                  aria-label={`Engineering highlights of ${project.title}`}
                >
                  {project.highlights.map(h => (
                    <li
                      key={h}
                      className="text-xs leading-relaxed text-text-secondary"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

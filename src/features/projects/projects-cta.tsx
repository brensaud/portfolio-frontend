/**
 * ProjectsCtaSection — closing call-to-action for the Projects page.
 *
 * Three actions ordered by typical visitor intent after reviewing the work:
 *   1. View the featured case study (most specific action)
 *   2. Read engineering notes (shows thinking behind the work)
 *   3. Contact (start a conversation)
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES, workDetailPath } from '@/constants/routes'
import { PROJECTS } from '@/data/projects'

// ─── Component ────────────────────────────────────────────────────────────────

export function ProjectsCtaSection() {
  const featuredProject = PROJECTS.find(p => p.featured)

  return (
    <section
      aria-labelledby="projects-cta-heading"
      className="relative overflow-hidden bg-surface py-24 sm:py-32"
    >
      {/* Subtle radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Go deeper
        </p>

        <h2
          id="projects-cta-heading"
          className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          Interested in the architecture?
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
          The case studies go deeper into the technical decisions, trade-offs,
          and lessons learned behind each project.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {featuredProject && (
            <Link
              to={workDetailPath(featuredProject.slug)}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              {featuredProject.title} case study
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}

          <Link
            to={ROUTES.WRITING}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
          >
            <Pencil size={16} aria-hidden="true" />
            Read engineering notes
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
          >
            <Mail size={16} aria-hidden="true" />
            Contact me
          </Link>
        </div>
      </Container>
    </section>
  )
}

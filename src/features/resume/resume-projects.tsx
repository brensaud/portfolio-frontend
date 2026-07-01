/**
 * ResumeProjects — §4: four resume-relevant project cards.
 *
 * Each card shows the engineering focus, one-line description, and
 * tech stack. Links to the case study page where one is available.
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { RESUME_PROJECTS } from '@/data/resume'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { buttonVariants } from '@/components/ui/button'
import { workDetailPath } from '@/constants/routes'
import { cn } from '@/lib/utils'

export function ResumeProjects() {
  return (
    <Section
      id="projects"
      aria-labelledby="resume-projects-heading"
      className="bg-surface"
    >
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Featured projects
          </p>
          <h2
            id="resume-projects-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Project-based engineering portfolio
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Four backend systems demonstrating production engineering practices across
            AI integration, API design, database architecture, and testing.
          </p>
        </div>

        <div
          className="grid gap-4 sm:grid-cols-2"
          role="list"
          aria-label="Resume project list"
        >
          {RESUME_PROJECTS.map(project => (
            <article
              key={project.slug}
              role="listitem"
              className="flex flex-col rounded-xl border border-border bg-surface-raised p-5"
            >
              {/* Engineering focus */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
                {project.engineeringFocus}
              </p>

              {/* Title */}
              <h3 className="mb-3 text-base font-bold text-text-primary">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                {project.description}
              </p>

              {/* Tech stack */}
              <ul
                className="mb-4 flex flex-wrap gap-1.5"
                aria-label={`Tech stack for ${project.title}`}
              >
                {project.techStack.map(tech => (
                  <li key={tech}>
                    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-text-tertiary">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Case study link */}
              {project.caseStudyAvailable ? (
                <Link
                  to={workDetailPath(project.slug)}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),
                    'mt-auto self-start gap-1.5',
                  )}
                  aria-label={`Read ${project.title} case study`}
                >
                  Case study
                  <ArrowRight size={13} aria-hidden />
                </Link>
              ) : (
                <p className="mt-auto text-xs text-text-tertiary">
                  Case study planned
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

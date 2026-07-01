/**
 * AppliedExamples — §11: engineering thinking applied to real projects.
 *
 * Three project cards connecting specific engineering concepts to the
 * projects that demonstrate them. Links to available case studies.
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { APPLIED_EXAMPLES } from '@/data/engineering'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { buttonVariants } from '@/components/ui/button'
import { workDetailPath } from '@/constants/routes'
import { cn } from '@/lib/utils'

export function AppliedExamples() {
  return (
    <Section
      id="applied"
      aria-labelledby="applied-heading"
    >
      <Container>
        {/* Section heading */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Applied examples
          </p>
          <h2
            id="applied-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Engineering thinking in practice
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            How these principles and patterns show up in specific projects.
          </p>
        </div>

        {/* Project example cards */}
        <div
          className="grid gap-5 sm:grid-cols-3"
          role="list"
          aria-label="Applied project examples"
        >
          {APPLIED_EXAMPLES.map(example => (
            <article
              key={example.projectSlug}
              role="listitem"
              className="flex flex-col rounded-xl border border-border bg-surface p-6"
            >
              {/* Concept tag */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
                {example.concept}
              </p>

              {/* Project title */}
              <h3 className="mb-3 text-base font-bold text-text-primary">
                {example.title}
              </h3>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                {example.description}
              </p>

              {/* Highlights */}
              <ul className="mb-6 flex-1 space-y-2" aria-label={`Engineering highlights of ${example.title}`}>
                {example.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="text-xs leading-relaxed text-text-secondary">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Case study link */}
              {example.caseStudyAvailable ? (
                <Link
                  to={workDetailPath(example.projectSlug)}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),
                    'mt-auto self-start gap-1.5',
                  )}
                  aria-label={`Read ${example.title} case study`}
                >
                  Read case study
                  <ArrowRight size={13} aria-hidden />
                </Link>
              ) : (
                <p className="mt-auto self-start text-xs text-text-tertiary">
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

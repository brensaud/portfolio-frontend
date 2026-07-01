/**
 * PracticalExperience — §8: project-based engineering experience.
 *
 * Frames independent engineering work as demonstrable experience.
 * Honest about the context (independent, project-based) while clearly
 * showing the depth and production-focus of the work.
 */
import { EXPERIENCE_ITEMS } from '@/data/resume'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function PracticalExperience() {
  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Practical engineering work
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Project-based backend engineering practice with a focus on production-quality
            architecture, AI integration, and engineering discipline.
          </p>
        </div>

        {/* Experience timeline */}
        <div className="space-y-5" role="list" aria-label="Experience items">
          {EXPERIENCE_ITEMS.map(item => (
            <article
              key={item.role}
              role="listitem"
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{item.role}</h3>
                  <p className="mt-0.5 text-sm text-text-secondary">{item.context}</p>
                </div>
                <span className="shrink-0 rounded-md border border-border bg-surface-raised px-2.5 py-1 text-xs text-text-tertiary">
                  {item.period}
                </span>
              </div>

              <ul className="space-y-2" aria-label={`Highlights for ${item.role}`}>
                {item.highlights.map(highlight => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

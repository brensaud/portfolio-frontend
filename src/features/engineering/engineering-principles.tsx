/**
 * EngineeringPrinciples — §2: eight core engineering principles.
 *
 * Displayed as a numbered grid of principle cards. The number acts as
 * a visual anchor; the title and description carry the meaning.
 */
import { ENGINEERING_PRINCIPLES } from '@/data/engineering'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function EngineeringPrinciples() {
  return (
    <Section
      id="principles"
      aria-labelledby="principles-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section heading */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Engineering principles
          </p>
          <h2
            id="principles-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            How I approach every system
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Eight principles that guide every architectural decision — from schema design to
            deployment.
          </p>
        </div>

        {/* Principles grid */}
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Engineering principles"
        >
          {ENGINEERING_PRINCIPLES.map(principle => (
            <article
              key={principle.number}
              role="listitem"
              className="group rounded-xl border border-border bg-surface-raised p-5 transition-colors hover:border-accent/40"
            >
              {/* Number */}
              <span
                className="mb-3 block font-mono text-2xl font-bold text-accent/30 transition-colors group-hover:text-accent/50"
                aria-hidden
              >
                {principle.number}
              </span>
              {/* Title */}
              <h3 className="mb-2 text-sm font-semibold leading-snug text-text-primary">
                {principle.title}
              </h3>
              {/* Description */}
              <p className="text-xs leading-relaxed text-text-secondary">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

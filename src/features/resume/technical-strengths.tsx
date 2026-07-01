/**
 * TechnicalStrengths — §5: eight specific engineering strengths.
 *
 * Not a skill list — each strength has a brief description explaining
 * what it means in practice. This is the "show, don't list" section.
 */
import { TECHNICAL_STRENGTHS } from '@/data/resume'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function TechnicalStrengths() {
  return (
    <Section id="strengths" aria-labelledby="strengths-heading">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Technical strengths
          </p>
          <h2
            id="strengths-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            What I bring to a backend engineering role
          </h2>
        </div>

        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Technical strengths"
        >
          {TECHNICAL_STRENGTHS.map(strength => (
            <div
              key={strength.title}
              role="listitem"
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="mb-2 text-sm font-semibold text-text-primary">
                {strength.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

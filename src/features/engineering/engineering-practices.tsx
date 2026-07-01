/**
 * EngineeringPractices — §4–6: three "how I approach X" sections.
 *
 *   §4  API Design Philosophy
 *   §5  Database Thinking
 *   §6  AI System Design
 *
 * Each section renders a consistent grid of approach cards from the
 * PRACTICE_AREAS data. Background alternates to create visual rhythm.
 */
import { PRACTICE_AREAS } from '@/data/engineering'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function EngineeringPractices() {
  return (
    <>
      {PRACTICE_AREAS.map((area, idx) => (
        <Section
          key={area.id}
          id={area.id}
          aria-labelledby={`${area.id}-heading`}
          className={idx % 2 === 0 ? 'bg-surface' : undefined}
        >
          <Container>
            {/* Section heading */}
            <div className="mb-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                {area.eyebrow}
              </p>
              <h2
                id={`${area.id}-heading`}
                className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
              >
                {area.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
                {area.description}
              </p>
            </div>

            {/* Approach cards grid */}
            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              role="list"
              aria-label={`${area.eyebrow} approach items`}
            >
              {area.items.map(item => (
                <div
                  key={item.title}
                  role="listitem"
                  className="rounded-xl border border-border bg-surface-raised p-4"
                >
                  <h3 className="mb-2 text-sm font-semibold leading-snug text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ))}
    </>
  )
}

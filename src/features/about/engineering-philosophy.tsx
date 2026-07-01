/**
 * EngineeringPhilosophySection — 5 core engineering principles.
 *
 * Visual treatment: editorial numbered list, not icon cards.
 * Each principle has a two-digit number, title, and description.
 *
 * The numbered list format signals that these are considered, ordered beliefs
 * — not a feature checklist. Visually it reads as more intentional than a grid.
 *
 * Layout:
 *   - Mobile: stacked single-column (number above title)
 *   - sm+: two-column row — number+title on left (40%), description on right
 *
 * Accessibility:
 *   - Uses <ol> for ordered items; numbers are aria-hidden (the "01", "02"
 *     decorative labels) because the list already conveys order semantically
 */
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Principle {
  title: string
  description: string
}

const PRINCIPLES: Principle[] = [
  {
    title: 'Build the simplest system that solves the problem',
    description:
      'Complexity is expensive to build, test, and maintain. Every feature, abstraction, and service boundary should earn its place. I start with the simplest working design and add complexity only when the system demands it.',
  },
  {
    title: 'Design APIs as contracts, not conveniences',
    description:
      'APIs are promises to consumers. They deserve careful naming, consistent structure, meaningful error responses, and full documentation. A well-designed API is a force multiplier — a poorly designed one is a liability.',
  },
  {
    title: 'Prefer maintainability over cleverness',
    description:
      'The engineer who reads this code six months from now will not appreciate the clever trick. Code is written once and read dozens of times. Clarity, consistency, and straightforward logic compound over the life of a project.',
  },
  {
    title: 'Make systems observable from the start',
    description:
      'Logging, structured errors, and health endpoints are not finishing touches — they are structural. A production system without observability is a black box that will eventually fail silently. Observability is part of the design.',
  },
  {
    title: 'Treat security and performance as product features',
    description:
      'Security is not a compliance checkbox and performance is not optional polish. Users trust systems that are fast and secure. These qualities are designed in, not bolted on. They belong in the initial architecture conversation.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function EngineeringPhilosophySection() {
  return (
    <Section
      aria-labelledby="philosophy-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Principles
          </p>
          <h2
            id="philosophy-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Engineering philosophy
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            The beliefs that guide how I design, build, and ship software.
          </p>
        </div>

        {/* Principles list */}
        <ol
          role="list"
          className="divide-y divide-border"
          aria-label="Engineering principles"
        >
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="flex flex-col gap-3 py-8 first:pt-0 last:pb-0 sm:flex-row sm:gap-12"
            >
              {/* Number + title */}
              <div className="sm:w-2/5">
                <span
                  className="mb-2 block font-mono text-xs text-text-tertiary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-semibold leading-snug tracking-tight text-text-primary">
                  {principle.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-text-secondary sm:flex-1 sm:pt-6">
                {principle.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

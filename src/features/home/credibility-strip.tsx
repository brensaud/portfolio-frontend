/**
 * CredibilityStrip — horizontal scrolling banner of technologies and practices.
 *
 * Purpose: immediately communicates the technical breadth to recruiters and
 * engineers scanning the page. Sits below the hero as a visual anchor.
 *
 * Accessibility:
 *   - Rendered as a <ul role="list"> so screen readers announce the item count
 *   - section aria-label so it appears as a landmark
 */
import { Container } from '@/components/ui/container'

const TECH_ITEMS = [
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Docker',
  'AI / RAG',
  'System Design',
  'Clean Architecture',
  'REST APIs',
  'pytest',
  'CI / CD',
] as const

export function CredibilityStrip() {
  return (
    <div
      className="border-y border-border bg-surface py-5"
      aria-label="Technology expertise"
    >
      <Container>
        <ul
          role="list"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {TECH_ITEMS.map((tech, i) => (
            <li
              key={tech}
              className="flex items-center gap-8"
            >
              {i !== 0 && (
                <span
                  className="hidden h-px w-4 bg-border sm:block"
                  aria-hidden="true"
                />
              )}
              <span className="text-sm font-medium text-text-tertiary">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

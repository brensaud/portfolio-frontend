/**
 * EngineeringQuality — §7–9: Security, Testing, and DevOps sections.
 *
 *   §7  Security & Reliability   — grid of approach items
 *   §8  Testing Strategy         — table-style rows with tool badges
 *   §9  DevOps & Deployment      — grid of approach items
 *
 * Security and DevOps share the same card-grid layout. Testing uses a
 * distinct row layout to show tool badges alongside each layer.
 */
import { QUALITY_AREAS } from '@/data/engineering'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function EngineeringQuality() {
  return (
    <>
      {QUALITY_AREAS.map((area, idx) => {
        const isTesting = area.id === 'testing'

        return (
          <Section
            key={area.id}
            id={area.id}
            aria-labelledby={`${area.id}-heading`}
            className={idx % 2 === 0 ? undefined : 'bg-surface'}
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

              {/* Testing: list rows with tool badges */}
              {isTesting ? (
                <div
                  className="space-y-3"
                  role="list"
                  aria-label="Testing layers"
                >
                  {area.items.map(item => (
                    <div
                      key={item.title}
                      role="listitem"
                      className="rounded-xl border border-border bg-surface p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-text-primary">
                          {item.title}
                        </h3>
                        {item.tools && (
                          <div
                            className="flex flex-wrap gap-1.5"
                            aria-label={`Tools: ${item.tools.join(', ')}`}
                          >
                            {item.tools.map(tool => (
                              <span
                                key={tool}
                                className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-xs text-text-tertiary"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                /* Security / DevOps: card grid */
                <div
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  role="list"
                  aria-label={`${area.eyebrow} items`}
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
              )}
            </Container>
          </Section>
        )
      })}
    </>
  )
}

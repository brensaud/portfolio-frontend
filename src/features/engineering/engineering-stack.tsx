/**
 * EngineeringStack — §10: grouped technology stack display.
 *
 * Eight groups (Backend, Database, Async/Jobs, AI, Frontend, DevOps,
 * Testing, Tooling) rendered as labelled tech pill clusters in a
 * responsive grid.
 */
import { STACK_GROUPS } from '@/data/engineering'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function EngineeringStack() {
  return (
    <Section
      id="stack"
      aria-labelledby="stack-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section heading */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Engineering stack
          </p>
          <h2
            id="stack-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Tools and technologies
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Technologies chosen for their production-grade track records, not their novelty.
          </p>
        </div>

        {/* Stack groups grid */}
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Engineering stack groups"
        >
          {STACK_GROUPS.map(group => (
            <div
              key={group.name}
              role="listitem"
              className="rounded-xl border border-border bg-surface-raised p-5"
            >
              {/* Group header */}
              <h3 className="mb-1 text-sm font-semibold text-text-primary">
                {group.name}
              </h3>
              <p className="mb-4 text-xs text-text-tertiary">{group.description}</p>

              {/* Tech pills */}
              <ul className="flex flex-wrap gap-1.5" aria-label={`${group.name} technologies`}>
                {group.items.map(item => (
                  <li key={item}>
                    <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

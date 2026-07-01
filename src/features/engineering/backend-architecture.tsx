/**
 * BackendArchitecture — §3: eight-layer architecture visual.
 *
 * Rendered as a vertical stack of numbered layer blocks connected by a
 * left-side accent line — conveying a top-to-bottom flow from HTTP edge
 * to database schema.
 */
import { ARCH_LAYERS } from '@/data/engineering'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function BackendArchitecture() {
  return (
    <Section
      id="architecture"
      aria-labelledby="architecture-heading"
    >
      <Container>
        {/* Section heading */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Backend architecture
          </p>
          <h2
            id="architecture-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Layered separation of concerns
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Every backend system I build follows this eight-layer pattern. Each layer has one
            responsibility and one direction of dependency — downward only.
          </p>
        </div>

        {/* Architecture stack */}
        <div
          className="relative"
          role="list"
          aria-label="Backend architecture layers, top to bottom"
        >
          {/* Left connector line */}
          <div
            className="absolute left-[18px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent sm:block"
            aria-hidden
          />

          <div className="space-y-3">
            {ARCH_LAYERS.map((layer, idx) => (
              <article
                key={layer.number}
                role="listitem"
                className="relative flex gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 sm:ml-10"
              >
                {/* Layer number — acts as the left-rail node on desktop */}
                <div
                  className="sm:absolute sm:-left-10 sm:top-1/2 sm:-translate-y-1/2"
                  aria-hidden
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent-subtle text-xs font-bold text-accent">
                    {layer.number}
                  </span>
                </div>

                {/* Layer content */}
                <div className="min-w-0 flex-1 pl-0 sm:pl-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    {/* Name */}
                    <h3 className="font-semibold text-text-primary">{layer.name}</h3>
                    {/* Tool badges */}
                    <div
                      className="flex flex-wrap gap-1.5"
                      aria-label={`Tools: ${layer.tools.join(', ')}`}
                    >
                      {layer.tools.map(tool => (
                        <span
                          key={tool}
                          className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-xs text-text-tertiary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {layer.description}
                  </p>
                </div>

                {/* Flow arrow between layers (hidden on last item) */}
                {idx < ARCH_LAYERS.length - 1 && (
                  <div
                    className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 text-text-tertiary/30 sm:left-5 sm:translate-x-0"
                    aria-hidden
                  >
                    ↓
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

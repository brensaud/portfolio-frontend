/**
 * architecture-page.tsx — /architecture
 *
 * Landing page for the Architecture Explorer feature.
 * Lists all available project architectures and explains what the explorer shows.
 */
import { Link } from 'react-router-dom'
import { ArrowRight, GitBranch } from 'lucide-react'
import { usePageTitle } from '@/hooks/use-page-title'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { ARCHITECTURE_LIST } from '@/data/architecture'
import { CATEGORY_STYLES } from '@/features/architecture/node-category-styles'
import { cn } from '@/lib/utils'

export function ArchitecturePage() {
  usePageTitle('Architecture Explorer')

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <Container className="py-16 sm:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            System design
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Architecture Explorer
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            An interactive walkthrough of how my projects are architected. Explore components,
            understand engineering decisions, and trace requests through the system.
          </p>

          {/* What you can explore */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: 'Logical Architecture',
                description: 'Components, boundaries, and data flows as an interactive diagram.',
              },
              {
                title: 'Request Flow',
                description: 'How a real request travels through every layer of the system.',
              },
              {
                title: 'Engineering Decisions',
                description: 'The why behind key technical choices — alternatives and trade-offs.',
              },
            ].map(({ title, description }) => (
              <div
                key={title}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <h2 className="mb-1 text-sm font-semibold text-text-primary">{title}</h2>
                <p className="text-xs leading-relaxed text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Project list ─────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <h2 className="mb-6 text-lg font-bold text-text-primary">
            Available architectures
          </h2>

          {ARCHITECTURE_LIST.length === 0 ? (
            <p className="text-sm text-text-secondary">No architectures published yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ARCHITECTURE_LIST.map((arch) => (
                <Link
                  key={arch.id}
                  to={`/projects/${arch.projectSlug}/architecture`}
                  className={cn(
                    'group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5',
                    'transition-colors duration-150 hover:border-accent/30 hover:bg-surface-raised',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  )}
                  aria-label={`Explore ${arch.projectName} architecture`}
                >
                  {/* Icon + title */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
                      <GitBranch size={16} className="text-accent" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-text-primary leading-tight">
                        {arch.projectName}
                      </h3>
                      <p className="mt-0.5 text-xs text-text-tertiary">{arch.tagline}</p>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {arch.metadata.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-3 text-xs text-text-tertiary">
                    <span>{Object.keys(arch.nodes).length} components</span>
                    <span>{arch.connections.length} connections</span>
                    <span>{arch.decisions.length} ADRs</span>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Explore architecture
                    <ArrowRight size={12} aria-hidden />
                  </div>

                  {/* Node category legend */}
                  <div
                    className="flex flex-wrap gap-1.5"
                    aria-label={`Component categories: ${Object.values(arch.nodes).map(n => n.category).filter((v, i, a) => a.indexOf(v) === i).join(', ')}`}
                  >
                    {Array.from(
                      new Set(Object.values(arch.nodes).map((n) => n.category)),
                    ).map((cat) => {
                      const s = CATEGORY_STYLES[cat]
                      return (
                        <span
                          key={cat}
                          aria-hidden
                          className={cn(
                            'rounded px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-wider',
                            s.badge,
                          )}
                        >
                          {s.label}
                        </span>
                      )
                    })}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}

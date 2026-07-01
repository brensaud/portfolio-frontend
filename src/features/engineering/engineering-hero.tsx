/**
 * EngineeringHero — page header for the /engineering route.
 *
 * Positions the engineer as architecture-first, backend-focused, and
 * AI-capable. Shows four core positioning pillars below the headline.
 */
import { Container } from '@/components/ui/container'

const PILLARS = [
  'Clean layered backend architecture',
  'AI integration without vendor lock-in',
  'Security and testability from day one',
  'Async-first for I/O-bound workloads',
] as const

export function EngineeringHero() {
  return (
    <div className="border-b border-border">
      <Container className="pb-14 pt-10">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Engineering philosophy
        </p>

        {/* Headline */}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Architecture-first engineering for scalable Python,{' '}
          <span className="text-accent">FastAPI</span>, and{' '}
          <span className="text-accent">AI-powered</span> systems.
        </h1>

        {/* Supporting copy */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          This page documents how I think about building production-grade backend systems — the
          principles, patterns, and trade-offs that guide every architectural decision.
        </p>

        {/* Positioning pillars */}
        <ul
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
          aria-label="Core engineering positions"
        >
          {PILLARS.map(pillar => (
            <li key={pillar} className="flex items-center gap-2 text-sm text-text-secondary">
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {pillar}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

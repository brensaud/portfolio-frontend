/**
 * WritingHero — page header for the /writing route.
 *
 * Positions the writing section as an engineering notes hub — backend,
 * FastAPI, AI SaaS, system design. Shows an honest status note that
 * articles are planned/in progress rather than already published.
 */
import { Container } from '@/components/ui/container'

const TOPICS = [
  'FastAPI & Python backend systems',
  'AI SaaS architecture',
  'System design patterns',
  'Database modeling',
  'Production deployment',
  'Testing strategies',
] as const

export function WritingHero() {
  return (
    <div className="border-b border-border">
      <Container className="pb-14 pt-10">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Writing
        </p>

        {/* Headline */}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Engineering notes on building scalable{' '}
          <span className="text-accent">Python backends</span>,{' '}
          <span className="text-accent">AI SaaS products</span>, and
          production-ready systems.
        </h1>

        {/* Supporting copy */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          A collection of technical articles in progress — documenting engineering
          decisions, architecture patterns, and lessons learned from building real systems.
        </p>

        {/* Topics strip */}
        <ul
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
          aria-label="Writing topics"
        >
          {TOPICS.map(topic => (
            <li key={topic} className="flex items-center gap-2 text-sm text-text-secondary">
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              {topic}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

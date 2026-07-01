/**
 * JourneyTimelineSection — stage-based career timeline.
 *
 * Intentionally uses stage labels ("Foundation", "Now", "Next") rather than
 * specific years to avoid inventing or misrepresenting dates. The stages
 * communicate trajectory and progress without fabricating a CV.
 *
 * Visual design:
 *   - Vertical connecting line on the left
 *   - Dot indicator per stage (filled past/current, dashed outline for next)
 *   - Current stage: larger accent dot with ring for visual prominence
 *   - "Next" stage: muted dashed outline to signal future intent
 *
 * Accessibility:
 *   - Rendered as <ol> (ordered stages have semantic meaning)
 *   - Visual-only dot markers supplemented by stage labels in the text
 *   - "Current" and "Planned" states are communicated via visible text labels,
 *     not only through color
 *   - aria-current="step" on the current stage li
 *
 * Responsive:
 *   - Single-column at all breakpoints — timeline is inherently vertical
 *   - Connecting line width and dot position scale gracefully on small screens
 */
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Data ─────────────────────────────────────────────────────────────────────

type StageStatus = 'past' | 'current' | 'next'

interface JourneyStage {
  id: string
  stage: string
  status: StageStatus
  title: string
  description: string
  highlights: readonly string[]
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'foundation',
    stage: 'Foundation',
    status: 'past',
    title: 'Programming & Web Fundamentals',
    description:
      'Built a foundation in Python, data structures, algorithms, and web development fundamentals. Learned how software systems are structured, why clean code matters, and how to approach problems methodically.',
    highlights: ['Python', 'Data structures', 'Algorithms', 'Web basics', 'Git'],
  },
  {
    id: 'specialisation',
    stage: 'Specialisation',
    status: 'past',
    title: 'Backend Engineering & FastAPI',
    description:
      'Focused deeply on FastAPI, REST API design, PostgreSQL, and backend architecture patterns. Built real understanding of async programming, dependency injection, database management, and API contract design.',
    highlights: ['FastAPI', 'REST API design', 'PostgreSQL', 'Async Python', 'Pydantic'],
  },
  {
    id: 'building',
    stage: 'Building',
    status: 'past',
    title: 'AI SaaS Products',
    description:
      'Applied backend skills to AI-powered SaaS products. Built InterviewPilot AI and the Clause Search System — working with LLMs, embeddings, vector search, and end-to-end production deployment.',
    highlights: ['InterviewPilot AI', 'Clause Search', 'LLM APIs', 'pgvector', 'RAG pipelines'],
  },
  {
    id: 'now',
    stage: 'Now',
    status: 'current',
    title: 'Production Systems & Career Growth',
    description:
      'Deepening focus on production quality: system design, observability, full test coverage, Docker deployment, and CI/CD. Building the engineering depth that senior roles require, and actively seeking those opportunities.',
    highlights: ['System design', 'Docker & CI/CD', 'Test coverage', 'Observability', 'Senior roles'],
  },
  {
    id: 'next',
    stage: 'Next',
    status: 'next',
    title: 'Senior Engineering & Deeper Foundations',
    description:
      'Building toward owning entire services, driving architecture decisions, and contributing meaningfully to technical strategy. Exploring formal computer science study for deeper theoretical foundations.',
    highlights: ['Architecture ownership', 'Technical leadership', 'Formal CS study'],
  },
]

// ─── Dot ─────────────────────────────────────────────────────────────────────

function TimelineDot({ status }: { status: StageStatus }) {
  return (
    <div
      className={cn(
        'relative z-10 flex shrink-0 items-center justify-center',
        'rounded-full',
        status === 'past'    && 'h-3 w-3 bg-border',
        status === 'current' && [
          'h-4 w-4 bg-accent',
          'ring-2 ring-accent ring-offset-2 ring-offset-background',
        ],
        status === 'next'    && 'h-3 w-3 border-2 border-dashed border-text-tertiary bg-background',
      )}
      aria-hidden="true"
    />
  )
}

// ─── Stage item ───────────────────────────────────────────────────────────────

function TimelineItem({
  stage,
  isLast,
}: {
  stage: JourneyStage
  isLast: boolean
}) {
  return (
    <li
      aria-current={stage.status === 'current' ? 'step' : undefined}
      className="relative flex gap-5"
    >
      {/* Left column: dot + connecting line */}
      <div className="flex flex-col items-center">
        <TimelineDot status={stage.status} />
        {!isLast && (
          <div
            className={cn(
              'mt-1.5 w-px flex-1',
              stage.status === 'current' ? 'bg-accent/30' : 'bg-border',
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Right column: content */}
      <div className={cn('pb-10', isLast && 'pb-0')}>
        {/* Stage label + current/next badge */}
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'text-xs font-semibold uppercase tracking-wider',
              stage.status === 'current' && 'text-accent',
              stage.status === 'next'    && 'text-text-tertiary',
              stage.status === 'past'    && 'text-text-tertiary',
            )}
          >
            {stage.stage}
          </span>
          {stage.status === 'current' && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              Current
            </span>
          )}
          {stage.status === 'next' && (
            <span className="rounded-full bg-surface-raised px-2 py-0.5 text-xs font-medium text-text-tertiary">
              Planned
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            'mb-2 text-base font-semibold tracking-tight',
            stage.status === 'next' ? 'text-text-secondary' : 'text-text-primary',
          )}
        >
          {stage.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
          {stage.description}
        </p>

        {/* Highlights */}
        <ul
          role="list"
          className="flex flex-wrap gap-1.5"
          aria-label={`Key areas in ${stage.stage} stage`}
        >
          {stage.highlights.map(item => (
            <li
              key={item}
              className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function JourneyTimelineSection() {
  return (
    <Section
      aria-labelledby="timeline-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Journey
          </p>
          <h2
            id="timeline-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            How I got here
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Stage-by-stage progression from first principles to production systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl">
          <ol role="list" aria-label="Career journey stages">
            {JOURNEY_STAGES.map((stage, index) => (
              <TimelineItem
                key={stage.id}
                stage={stage}
                isLast={index === JOURNEY_STAGES.length - 1}
              />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

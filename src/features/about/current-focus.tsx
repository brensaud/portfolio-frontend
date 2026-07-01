/**
 * CurrentFocusSection — what I am actively learning and building right now.
 *
 * Grouped by domain rather than a flat list, so readers can quickly see
 * the shape of the current focus: backend-heavy, with AI and infrastructure
 * depth, and enough frontend context for full-stack product work.
 *
 * Layout: 2×2 grid on md+, single column on mobile.
 *
 * Accessibility:
 *   - Each group uses a <section> with aria-labelledby pointing to its h3
 *   - Tech badges inside each group use role="list"
 */
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FocusGroup {
  id: string
  category: string
  headline: string
  description: string
  tech: readonly string[]
}

const FOCUS_GROUPS: FocusGroup[] = [
  {
    id: 'backend',
    category: 'Core Backend',
    headline: 'FastAPI & Python ecosystem',
    description:
      'Deep focus on FastAPI internals, dependency injection, async programming, Pydantic v2, and Alembic migrations. Building production patterns, not just working examples.',
    tech: ['FastAPI', 'Python', 'Pydantic', 'SQLAlchemy', 'Alembic'],
  },
  {
    id: 'data',
    category: 'Data & Queues',
    headline: 'PostgreSQL, Redis & Celery',
    description:
      'Schema design for real applications, query optimisation, indexing strategy, connection pooling with asyncpg, Redis for caching and pub/sub, Celery for background task orchestration.',
    tech: ['PostgreSQL', 'Redis', 'Celery', 'asyncpg', 'pgvector'],
  },
  {
    id: 'ai',
    category: 'AI / LLM',
    headline: 'RAG systems & embeddings',
    description:
      'Building AI-powered features with LLM APIs, embedding models, pgvector for semantic search, and structured output generation. Focus on production RAG architectures, not just demos.',
    tech: ['OpenAI API', 'LangChain', 'pgvector', 'Embeddings', 'RAG'],
  },
  {
    id: 'infra',
    category: 'Infrastructure',
    headline: 'Docker, CI/CD & cloud deployment',
    description:
      'Container-first development with Docker Compose, GitHub Actions for CI/CD, environment management, and deploying Python services to cloud platforms. React and TypeScript for full-stack context.',
    tech: ['Docker', 'GitHub Actions', 'Linux', 'React', 'TypeScript'],
  },
]

// ─── FocusGroupCard ───────────────────────────────────────────────────────────

function FocusGroupCard({ group }: { group: FocusGroup }) {
  return (
    <section
      aria-labelledby={`focus-${group.id}-heading`}
      className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6"
    >
      {/* Category label */}
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {group.category}
      </p>

      {/* Headline */}
      <h3
        id={`focus-${group.id}-heading`}
        className="text-base font-semibold tracking-tight text-text-primary"
      >
        {group.headline}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-text-secondary">
        {group.description}
      </p>

      {/* Tech badges */}
      <div
        className="mt-auto flex flex-wrap gap-1.5 pt-1"
        role="list"
        aria-label={`Technologies in ${group.category}`}
      >
        {group.tech.map(t => (
          <span key={t} role="listitem">
            <Badge variant="outline" size="sm">
              {t}
            </Badge>
          </span>
        ))}
      </div>
    </section>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CurrentFocusSection() {
  return (
    <Section aria-labelledby="current-focus-heading">
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Right Now
          </p>
          <h2
            id="current-focus-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Current focus areas
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Where I am investing engineering depth right now — not just learning, but building.
          </p>
        </div>

        {/* 2×2 grid of focus groups */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FOCUS_GROUPS.map(group => (
            <FocusGroupCard key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

/**
 * EngineeringProofSection — what the projects collectively demonstrate.
 *
 * Purpose: give hiring managers and senior engineers a quick scan of the
 * engineering capabilities evidenced by the work above. Each cell names a
 * specific technical discipline with a one-sentence description.
 *
 * 9 capabilities in a 3-column grid (1 col mobile, 2 col sm, 3 col lg).
 * Icons are decorative (aria-hidden); the title + description carry the meaning.
 */
import {
  Code2,
  Database,
  FlaskConical,
  Layers,
  Lock,
  Package,
  Search,
  Sparkles,
  Timer,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Capability {
  icon: LucideIcon
  title: string
  description: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: Code2,
    title: 'API Design',
    description:
      'REST endpoints with consistent contracts, Pydantic validation, and auto-generated OpenAPI docs. APIs built as first-class products.',
  },
  {
    icon: Database,
    title: 'Database Modeling',
    description:
      'PostgreSQL schema design, Alembic migrations, indexing strategy, and query optimisation for production data access patterns.',
  },
  {
    icon: Timer,
    title: 'Background Tasks',
    description:
      'Celery + Redis for async job processing — response evaluation, email dispatch, and long-running computation outside the request cycle.',
  },
  {
    icon: Lock,
    title: 'Authentication',
    description:
      'JWT authentication with refresh token rotation, role-based access control, and secure session management across multi-tenant systems.',
  },
  {
    icon: Sparkles,
    title: 'AI Integration',
    description:
      'LLM API orchestration, structured output extraction via Pydantic, and prompt engineering for consistent, parseable responses.',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description:
      'pgvector + embedding models for RAG pipelines: document chunking, cosine similarity retrieval, and ranked result sets.',
  },
  {
    icon: Package,
    title: 'Docker Deployment',
    description:
      'Multi-stage Dockerfiles, Docker Compose orchestration, environment variable management, and production-ready container configurations.',
  },
  {
    icon: FlaskConical,
    title: 'Test Coverage',
    description:
      'pytest for unit and integration tests, async API test clients, and 90%+ coverage on business-critical service paths.',
  },
  {
    icon: Layers,
    title: 'Clean Architecture',
    description:
      'Domain/application/infrastructure separation, dependency injection via FastAPI, and module boundaries that make systems easy to extend.',
  },
]

// ─── CapabilityCell ───────────────────────────────────────────────────────────

function CapabilityCell({ cap }: { cap: Capability }) {
  const Icon = cap.icon
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent-subtle text-accent"
        aria-hidden="true"
      >
        <Icon size={18} aria-hidden={true} />
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-text-primary">
        {cap.title}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {cap.description}
      </p>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function EngineeringProofSection() {
  return (
    <Section aria-labelledby="proof-heading">
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Demonstrated Capabilities
          </p>
          <h2
            id="proof-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            What the projects show
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Specific engineering disciplines built and practised across the projects above.
          </p>
        </div>

        {/* 3-column capability grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(cap => (
            <CapabilityCell key={cap.title} cap={cap} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

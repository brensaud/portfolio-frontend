/**
 * EngineeringFocusSection — communicates 6 areas of deep specialisation.
 *
 * Each cell has:
 *   - Lucide icon (decorative, aria-hidden)
 *   - Specialisation title (h3)
 *   - One-sentence description
 *
 * Layout:
 *   - Mobile: 1 column
 *   - sm (640px+): 2 columns
 *   - lg (1024px+): 3 columns
 *
 * Design intent: the cells use a subtle top-border accent on the left edge,
 * referencing the terminal-prompt / code-block aesthetic without being literal.
 */
import {
  Cloud,
  Code2,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { type ComponentType } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Specialisation {
  icon: ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  title: string
  description: string
}

const SPECIALISATIONS: Specialisation[] = [
  {
    icon: Layers,
    title: 'Backend Architecture',
    description:
      'Designing FastAPI services with clear separation of concerns — domain logic, application layer, and infrastructure kept cleanly apart.',
  },
  {
    icon: Code2,
    title: 'API Design',
    description:
      'REST APIs built for long-term developer experience: consistent contracts, versioning, meaningful error responses, and full OpenAPI docs.',
  },
  {
    icon: Database,
    title: 'Database Design',
    description:
      'PostgreSQL schema design, indexing strategies, query optimisation, and migration management that keeps production databases fast and safe.',
  },
  {
    icon: Sparkles,
    title: 'AI Integration',
    description:
      'LLM pipelines, RAG architectures, and embedding workflows wired into production backends — not just prototypes.',
  },
  {
    icon: Cloud,
    title: 'Deployment & DevOps',
    description:
      'Docker-based containerisation, CI/CD pipelines, environment management, and production observability from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'Testing & Quality',
    description:
      'pytest-first development with unit tests, integration tests, and async API testing. Aiming for 90%+ coverage on business-critical paths.',
  },
]

// ─── SpecialisationCell ───────────────────────────────────────────────────────

function SpecialisationCell({ spec }: { spec: Specialisation }) {
  const Icon = spec.icon

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6">
      {/* Icon container */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent-subtle text-accent"
        aria-hidden="true"
      >
        <Icon size={20} aria-hidden={true} />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold tracking-tight text-text-primary">
        {spec.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-text-secondary">
        {spec.description}
      </p>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function EngineeringFocusSection() {
  return (
    <Section
      aria-labelledby="engineering-focus-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Specialisations
          </p>
          <h2
            id="engineering-focus-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            What I focus on
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Deep expertise in the disciplines that matter for backend-heavy, data-driven products.
          </p>
        </div>

        {/* Specialisation cells */}
        <Grid cols={3} gap={4}>
          {SPECIALISATIONS.map(spec => (
            <SpecialisationCell key={spec.title} spec={spec} />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

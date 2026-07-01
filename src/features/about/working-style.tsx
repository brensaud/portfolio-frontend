/**
 * WorkingStyleSection — 7 principles describing how I approach day-to-day work.
 *
 * Differentiated from EngineeringPhilosophySection (which covers technical
 * design beliefs) by focusing on process and collaboration: how I work with
 * requirements, code, tests, documentation, and teammates.
 *
 * Visual treatment: 2-column grid of cells with a Lucide icon, title, and
 * description. Denser than the homepage Engineering Focus section (smaller
 * icons, tighter padding) to fit 7 items without feeling heavy.
 *
 * Accessibility:
 *   - Icons are aria-hidden; meaning is carried by the title + description
 *   - ul / li semantics for the grid items
 */
import {
  BookOpen,
  FileText,
  FlaskConical,
  GitBranch,
  Repeat2,
  ScanText,
  Users,
} from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface WorkStyle {
  icon: LucideIcon
  title: string
  description: string
}

const WORK_STYLES: WorkStyle[] = [
  {
    icon: FileText,
    title: 'Requirements first',
    description:
      'Understand the problem deeply before writing a line of code. Ambiguity in requirements is the most expensive kind of bug — it ships with the product.',
  },
  {
    icon: GitBranch,
    title: 'Architecture before implementation',
    description:
      'A clear system design prevents expensive refactors. I sketch data models, API contracts, and service boundaries before building. Decisions made early are cheap; decisions made in production are not.',
  },
  {
    icon: ScanText,
    title: 'Clean, honest code',
    description:
      'Good variable names, single-responsibility functions, and no clever tricks that only the author understands. Code is a communication medium, not a performance.',
  },
  {
    icon: FlaskConical,
    title: 'Testing as specification',
    description:
      'Tests are written alongside features, not after them. Unit tests for business logic, integration tests for service boundaries, async API tests for the public contract. Tests are design artifacts.',
  },
  {
    icon: BookOpen,
    title: 'Documentation as respect',
    description:
      'A well-documented API and clear README are a gift to future engineers — including future me. I write documentation that explains the why, not just the what.',
  },
  {
    icon: Repeat2,
    title: 'Iterative improvement',
    description:
      'Ship working software, gather feedback, improve in small steps. Perfectionism delays value. The goal is a system that evolves gracefully, not one that is perfect on day one.',
  },
  {
    icon: Users,
    title: 'User-focused engineering',
    description:
      'Backend systems exist to serve product needs and real users. Engineering decisions made without considering user impact are incomplete. Performance, reliability, and clear errors are user-facing qualities.',
  },
]

// ─── WorkStyleCell ────────────────────────────────────────────────────────────

function WorkStyleCell({ item }: { item: WorkStyle }) {
  const Icon = item.icon

  return (
    <li className="flex gap-4 rounded-xl border border-border bg-surface p-5">
      {/* Icon */}
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent-subtle text-accent"
        aria-hidden="true"
      >
        <Icon size={16} aria-hidden={true} />
      </div>

      {/* Text */}
      <div>
        <h3 className="mb-1 text-sm font-semibold tracking-tight text-text-primary">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>
      </div>
    </li>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function WorkingStyleSection() {
  return (
    <Section aria-labelledby="working-style-heading">
      <Container>
        {/* Section header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Process
          </p>
          <h2
            id="working-style-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            How I work
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Day-to-day habits and practices that shape how I approach engineering problems.
          </p>
        </div>

        {/* Grid */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          aria-label="Working style principles"
        >
          {WORK_STYLES.map(item => (
            <WorkStyleCell key={item.title} item={item} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/**
 * WritingInfo — §4–6: three informational sections.
 *
 *   §4  Writing Categories  — 8 topic areas with descriptions
 *   §5  Why I Write         — 5 reasons writing matters to engineering growth
 *   §6  Learning Roadmap    — upcoming writing themes
 */
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

// ─── Category data ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    name: 'Backend',
    description: 'Python service architecture, async patterns, and production-grade API design.',
    accent: false,
  },
  {
    name: 'FastAPI',
    description: 'Deep dives into FastAPI — routing, dependency injection, validation, and testing.',
    accent: false,
  },
  {
    name: 'AI Engineering',
    description: 'Building AI-powered features with production discipline — abstraction, evaluation, and safety.',
    accent: false,
  },
  {
    name: 'System Design',
    description: 'Architecture decisions, trade-off analysis, and patterns for scalable systems.',
    accent: false,
  },
  {
    name: 'Databases',
    description: 'PostgreSQL modeling, query performance, indexing strategy, and pgvector for AI.',
    accent: false,
  },
  {
    name: 'DevOps',
    description: 'Docker, CI/CD pipelines, deployment patterns, and production configuration.',
    accent: false,
  },
  {
    name: 'Testing',
    description: 'Layered test strategies for Python backends — unit, integration, and AI evaluation tests.',
    accent: false,
  },
  {
    name: 'Career Notes',
    description: 'Reflections on engineering growth, communication, and what senior engineering actually means.',
    accent: false,
  },
] as const

// ─── Why I Write data ─────────────────────────────────────────────────────────

const WHY_WRITE_REASONS = [
  {
    title: 'Writing clarifies thinking',
    description:
      'If I cannot explain a technical decision clearly in writing, I have not fully understood it. Writing forces the ambiguity out of architecture decisions.',
  },
  {
    title: 'Technical communication is a senior engineering skill',
    description:
      'Senior engineers write RFCs, ADRs, and documentation. Being able to communicate technical context to other engineers — and to future-me — is part of the craft.',
  },
  {
    title: 'Written decisions outlast the memory of making them',
    description:
      'Code tells you what was built. Writing tells you why. Architecture Decision Records and technical notes make future changes safer because the reasoning is preserved.',
  },
  {
    title: 'Teaching deepens understanding',
    description:
      "Explaining something to someone else — even hypothetically in an article — reveals gaps in understanding that years of practice can miss. The act of writing is itself a learning exercise.",
  },
  {
    title: 'Public notes show learning discipline',
    description:
      'A portfolio of published technical writing demonstrates curiosity, communication clarity, and the discipline to ship — not just to build things that never leave the hard drive.',
  },
] as const

// ─── Roadmap data ─────────────────────────────────────────────────────────────

const ROADMAP_THEMES = [
  { topic: 'FastAPI production patterns', description: 'Routing, auth, validation, and testing in real applications.' },
  { topic: 'Backend architecture deep dives', description: 'Layered architecture, dependency injection, and domain modeling.' },
  { topic: 'AI SaaS system design', description: 'Building AI features that are durable, testable, and vendor-agnostic.' },
  { topic: 'RAG and vector search', description: 'pgvector, embedding pipelines, and retrieval-augmented generation.' },
  { topic: 'Database design decisions', description: 'Schema design, indexing, constraints, and migration strategy.' },
  { topic: 'Cloud deployment & DevOps', description: 'Docker, GitHub Actions, production configuration, and observability.' },
  { topic: 'Senior engineer preparation', description: 'Technical communication, system design thinking, and engineering maturity.' },
] as const

// ─── §4 Categories ────────────────────────────────────────────────────────────

function WritingCategories() {
  return (
    <Section
      id="categories"
      aria-labelledby="categories-heading"
      className="bg-surface"
    >
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Topics
          </p>
          <h2
            id="categories-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Writing categories
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Eight topic areas across the full backend engineering stack.
          </p>
        </div>

        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Writing categories"
        >
          {CATEGORIES.map(cat => (
            <div
              key={cat.name}
              role="listitem"
              className="rounded-xl border border-border bg-surface-raised p-4"
            >
              <h3 className="mb-1.5 text-sm font-semibold text-text-primary">
                {cat.name}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §5 Why I Write ───────────────────────────────────────────────────────────

function WhyIWrite() {
  return (
    <Section id="why-write" aria-labelledby="why-write-heading">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Purpose
          </p>
          <h2
            id="why-write-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Why I write about engineering
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Writing is not a side activity to engineering — it is part of it.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_WRITE_REASONS.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-4 rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
                <CheckCircle2 size={15} className="text-accent" aria-hidden />
              </div>
              <div>
                <h3 className="mb-1.5 text-sm font-semibold text-text-primary">
                  {reason.title}
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §6 Learning Roadmap ──────────────────────────────────────────────────────

function LearningRoadmap() {
  return (
    <Section
      id="roadmap"
      aria-labelledby="writing-roadmap-heading"
      className="bg-surface"
    >
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Learning roadmap
          </p>
          <h2
            id="writing-roadmap-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Upcoming writing themes
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Topic areas I'm actively studying and planning to write about in depth.
          </p>
        </div>

        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Upcoming writing themes"
        >
          {ROADMAP_THEMES.map((theme) => (
            <div
              key={theme.topic}
              role="listitem"
              className="flex items-start gap-4 rounded-xl border border-border bg-surface-raised p-4"
            >
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10"
                aria-hidden
              >
                <BookOpen size={13} className="text-accent" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-text-primary">
                  {theme.topic}
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {theme.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Composed export ──────────────────────────────────────────────────────────

export function WritingInfo() {
  return (
    <>
      <WritingCategories />
      <WhyIWrite />
      <LearningRoadmap />
    </>
  )
}

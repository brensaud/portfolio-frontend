/**
 * CaseStudyOverview — sections 1–3 of the case study page.
 *
 *   §1  Overview      — what it is, who it's for, why it matters
 *   §2  Problem       — four problem statements with descriptions
 *   §3  Goals         — engineering / product goals
 */
import { CheckCircle2 } from 'lucide-react'
import { type CaseStudy } from '@/data/case-studies'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

// ─── Shared section heading pattern ──────────────────────────────────────────

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  id: string
}

function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
        {eyebrow}
      </p>
      <h2 id={id} className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────────

interface OverviewProps {
  overview: CaseStudy['overview']
}

function Overview({ overview }: OverviewProps) {
  return (
    <Section
      id="overview"
      aria-labelledby="overview-heading"
      className="bg-surface"
    >
      <Container>
        <SectionHeading
          eyebrow="Project overview"
          title="What is InterviewPilot AI?"
          id="overview-heading"
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {/* What / Who / Why */}
          <div className="space-y-6">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">What</p>
              <p className="text-sm leading-relaxed text-text-secondary">{overview.what}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">Who it's for</p>
              <p className="text-sm leading-relaxed text-text-secondary">{overview.who}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">Why it matters</p>
              <p className="text-sm leading-relaxed text-text-secondary">{overview.whyItMatters}</p>
            </div>
          </div>

          {/* Engineering focus */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent">
              Engineering focus
            </p>
            <ul className="space-y-3" aria-label="Engineering focus areas">
              {overview.engineeringFocus.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── Problem Statement ────────────────────────────────────────────────────────

interface ProblemStatementProps {
  problemStatement: CaseStudy['problemStatement']
}

function ProblemStatement({ problemStatement }: ProblemStatementProps) {
  return (
    <Section
      id="problem"
      aria-labelledby="problem-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Why does this need to exist?"
          description={problemStatement.intro}
          id="problem-heading"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {problemStatement.points.map((point, idx) => (
            <div
              key={point.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="mb-3 flex items-start gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-xs font-bold text-accent"
                  aria-hidden
                >
                  {idx + 1}
                </span>
                <h3 className="text-sm font-semibold leading-snug text-text-primary">
                  {point.title}
                </h3>
              </div>
              <p className="pl-10 text-sm leading-relaxed text-text-secondary">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Goals ────────────────────────────────────────────────────────────────────

interface GoalsProps {
  goals: CaseStudy['goals']
}

function Goals({ goals }: GoalsProps) {
  return (
    <Section
      id="goals"
      aria-labelledby="goals-heading"
      className="bg-surface"
    >
      <Container>
        <SectionHeading
          eyebrow="Engineering goals"
          title="What does it need to do?"
          description="Six core capabilities that drive the system design."
          id="goals-heading"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, idx) => (
            <div
              key={goal.title}
              className="rounded-xl border border-border bg-surface-raised p-5"
            >
              <span
                className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle text-sm font-bold text-accent"
                aria-hidden
              >
                {idx + 1}
              </span>
              <h3 className="mb-2 text-sm font-semibold text-text-primary">
                {goal.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {goal.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Composed export ──────────────────────────────────────────────────────────

interface CaseStudyOverviewProps {
  caseStudy: CaseStudy
}

export function CaseStudyOverview({ caseStudy }: CaseStudyOverviewProps) {
  return (
    <>
      <Overview overview={caseStudy.overview} />
      <ProblemStatement problemStatement={caseStudy.problemStatement} />
      <Goals goals={caseStudy.goals} />
    </>
  )
}

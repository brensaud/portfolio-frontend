/**
 * CaseStudyQuality — sections 9–14 of the case study page.
 *
 *   §9   Security Considerations
 *   §10  Performance Considerations
 *   §11  Testing Strategy
 *   §12  Engineering Decisions
 *   §13  Current Status
 *   §14  Future Roadmap
 */
import { CheckCircle2, Clock, Circle } from 'lucide-react'
import { type CaseStudy } from '@/data/case-studies'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

// ─── Shared section heading ───────────────────────────────────────────────────

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

// ─── §9 Security ──────────────────────────────────────────────────────────────

interface SecurityProps {
  securityConsiderations: CaseStudy['securityConsiderations']
}

function Security({ securityConsiderations }: SecurityProps) {
  return (
    <Section id="security" aria-labelledby="security-heading" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Security"
          title="Security considerations"
          description="Security decisions built into the architecture, not bolted on after."
          id="security-heading"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {securityConsiderations.map(item => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface-raised p-5"
            >
              <h3 className="mb-2 text-sm font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §10 Performance ──────────────────────────────────────────────────────────

interface PerformanceProps {
  performanceConsiderations: CaseStudy['performanceConsiderations']
}

function Performance({ performanceConsiderations }: PerformanceProps) {
  return (
    <Section id="performance" aria-labelledby="performance-heading">
      <Container>
        <SectionHeading
          eyebrow="Performance"
          title="Scalability design decisions"
          description="How the system is designed to stay fast and predictable under load."
          id="performance-heading"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {performanceConsiderations.map(item => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="mb-2 text-sm font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §11 Testing Strategy ─────────────────────────────────────────────────────

interface TestingStrategyProps {
  testingStrategy: CaseStudy['testingStrategy']
}

function TestingStrategy({ testingStrategy }: TestingStrategyProps) {
  return (
    <Section id="testing" aria-labelledby="testing-heading" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Testing"
          title="Testing strategy"
          description="Five testing layers ensuring correctness from unit logic to full HTTP cycles."
          id="testing-heading"
        />
        <div className="space-y-4">
          {testingStrategy.map(layer => (
            <div
              key={layer.type}
              className="rounded-xl border border-border bg-surface-raised p-5"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-text-primary">{layer.type}</h3>
                <div className="flex flex-wrap gap-1.5" aria-label={`Tools for ${layer.type}`}>
                  {layer.tools.map(tool => (
                    <span
                      key={tool}
                      className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-text-tertiary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary">
                {layer.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §12 Engineering Decisions ────────────────────────────────────────────────

interface DecisionsProps {
  engineeringDecisions: CaseStudy['engineeringDecisions']
}

function Decisions({ engineeringDecisions }: DecisionsProps) {
  return (
    <Section id="decisions" aria-labelledby="decisions-heading">
      <Container>
        <SectionHeading
          eyebrow="Engineering decisions"
          title="Why was this built this way?"
          description="Key architectural trade-offs with explicit rationale."
          id="decisions-heading"
        />
        <div className="space-y-5">
          {engineeringDecisions.map(decision => (
            <div
              key={decision.question}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="mb-3 text-base font-semibold text-text-primary">
                {decision.question}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {decision.answer}
              </p>
              {decision.tradeoffs && (
                <div className="mt-4 rounded-lg border border-border bg-surface-raised px-4 py-3">
                  <p className="text-xs leading-relaxed text-text-tertiary">
                    <span className="font-semibold text-text-secondary">Trade-offs: </span>
                    {decision.tradeoffs}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §13 Current Status ───────────────────────────────────────────────────────

interface CurrentStatusProps {
  currentStatus: CaseStudy['currentStatus']
}

function CurrentStatus({ currentStatus }: CurrentStatusProps) {
  return (
    <Section id="status" aria-labelledby="status-heading" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Current status"
          title="Where the build stands today"
          description={currentStatus.description}
          id="status-heading"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {/* Completed */}
          <div className="rounded-xl border border-success/20 bg-success/5 p-5">
            <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-success">
              <CheckCircle2 size={13} aria-hidden />
              Completed
            </p>
            <ul className="space-y-2.5" aria-label="Completed items">
              {currentStatus.completed.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    size={12}
                    className="mt-0.5 shrink-0 text-success"
                    aria-hidden
                  />
                  <span className="text-xs leading-relaxed text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* In progress */}
          <div className="rounded-xl border border-warning/20 bg-warning/5 p-5">
            <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-warning">
              <Clock size={13} aria-hidden />
              In progress
            </p>
            <ul className="space-y-2.5" aria-label="In progress items">
              {currentStatus.inProgress.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Clock
                    size={12}
                    className="mt-0.5 shrink-0 text-warning"
                    aria-hidden
                  />
                  <span className="text-xs leading-relaxed text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Planned */}
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              <Circle size={13} aria-hidden />
              Planned
            </p>
            <ul className="space-y-2.5" aria-label="Planned items">
              {currentStatus.planned.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Circle
                    size={12}
                    className="mt-0.5 shrink-0 text-text-tertiary"
                    aria-hidden
                  />
                  <span className="text-xs leading-relaxed text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

// ─── §14 Roadmap ──────────────────────────────────────────────────────────────

const PRIORITY_STYLE = {
  high:   'border-accent/30 bg-accent-subtle',
  medium: 'border-border bg-surface-raised',
  low:    'border-border bg-surface',
} as const

const PRIORITY_LABEL = {
  high:   'High priority',
  medium: 'Medium priority',
  low:    'Low priority',
} as const

const PRIORITY_DOT = {
  high:   'bg-accent',
  medium: 'bg-text-secondary',
  low:    'bg-text-tertiary',
} as const

interface RoadmapProps {
  roadmap: CaseStudy['roadmap']
}

function Roadmap({ roadmap }: RoadmapProps) {
  return (
    <Section id="roadmap" aria-labelledby="roadmap-heading">
      <Container>
        <SectionHeading
          eyebrow="Future roadmap"
          title="What comes next"
          description="Planned features and improvements in rough priority order."
          id="roadmap-heading"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {roadmap.map(item => (
            <div
              key={item.title}
              className={cn(
                'rounded-xl border p-5',
                PRIORITY_STYLE[item.priority],
              )}
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={cn('h-2 w-2 shrink-0 rounded-full', PRIORITY_DOT[item.priority])}
                  aria-hidden
                />
                <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                <span className="ml-auto text-xs text-text-tertiary">
                  {PRIORITY_LABEL[item.priority]}
                </span>
              </div>
              <p className="pl-4 text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── Composed export ──────────────────────────────────────────────────────────

interface CaseStudyQualityProps {
  caseStudy: CaseStudy
}

export function CaseStudyQuality({ caseStudy }: CaseStudyQualityProps) {
  return (
    <>
      <Security securityConsiderations={caseStudy.securityConsiderations} />
      <Performance performanceConsiderations={caseStudy.performanceConsiderations} />
      <TestingStrategy testingStrategy={caseStudy.testingStrategy} />
      <Decisions engineeringDecisions={caseStudy.engineeringDecisions} />
      <CurrentStatus currentStatus={caseStudy.currentStatus} />
      <Roadmap roadmap={caseStudy.roadmap} />
    </>
  )
}

/**
 * engineering-decisions.tsx — Architecture Decision Records section.
 *
 * Renders the engineering decisions for a project as expandable cards.
 * Uses native <details>/<summary> — zero JS accordion, fully accessible.
 *
 * Each decision card covers: Problem → Decision → Alternatives → Trade-offs
 * → Lessons Learned (optional).
 */
import { ChevronDown } from 'lucide-react'
import type { EngineeringDecision } from './types'
import { cn } from '@/lib/utils'

interface DecisionCardProps {
  decision: EngineeringDecision
  index: number
}

function DecisionCard({ decision, index }: DecisionCardProps) {
  return (
    <details className="group rounded-xl border border-border bg-surface">
      <summary
        className={cn(
          'flex cursor-pointer list-none items-start gap-4 px-5 py-4',
          'transition-colors duration-150 hover:bg-surface-raised',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
        )}
      >
        {/* Decision number */}
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-xs font-bold text-accent"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-text-primary leading-snug">
            {decision.title}
          </p>
          <p className="mt-1 line-clamp-1 text-xs text-text-tertiary">
            {decision.problem.slice(0, 120)}…
          </p>
        </div>

        <ChevronDown
          size={16}
          aria-hidden
          className="mt-1 shrink-0 text-text-tertiary transition-transform duration-150 group-open:rotate-180"
        />
      </summary>

      {/* Expanded content */}
      <div className="border-t border-border px-5 py-4">
        <div className="space-y-4">

          {/* Problem */}
          <div>
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
              Problem
            </h4>
            <p className="text-xs leading-relaxed text-text-secondary">{decision.problem}</p>
          </div>

          {/* Decision */}
          <div>
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-accent/80">
              Decision
            </h4>
            <p className="text-xs leading-relaxed text-text-secondary">{decision.decision}</p>
          </div>

          {/* Alternatives */}
          {decision.alternatives.length > 0 && (
            <div>
              <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                Alternatives considered
              </h4>
              <ul className="space-y-1">
                {decision.alternatives.map((alt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary"
                  >
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    {alt}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trade-offs */}
          <div>
            <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
              Trade-offs
            </h4>
            <p className="text-xs leading-relaxed text-text-secondary">{decision.tradeoffs}</p>
          </div>

          {/* Lessons learned */}
          {decision.lessonsLearned && (
            <div>
              <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                Lessons learned
              </h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                {decision.lessonsLearned}
              </p>
            </div>
          )}

        </div>
      </div>
    </details>
  )
}

interface EngineeringDecisionsProps {
  decisions: EngineeringDecision[]
}

export function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  if (decisions.length === 0) return null

  return (
    <section aria-labelledby="decisions-heading" className="mt-12">
      <div className="mb-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Architecture decision records
        </p>
        <h2
          id="decisions-heading"
          className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
        >
          Engineering decisions
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Key architectural choices, the alternatives considered, and the trade-offs accepted.
        </p>
      </div>

      <div className="space-y-3">
        {decisions.map((decision, i) => (
          <DecisionCard key={decision.id} decision={decision} index={i} />
        ))}
      </div>
    </section>
  )
}

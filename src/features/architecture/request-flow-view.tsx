/**
 * request-flow-view.tsx — step-by-step request journey diagram.
 *
 * Renders a vertical chain of numbered steps showing how a request travels
 * through the system. Each step cites the component it passes through.
 *
 * Direction arrows distinguish the outbound path (down, indigo) from
 * the response path (up, muted). Reduced motion: arrows are replaced
 * with a static connector line.
 *
 * Accessibility:
 *   - Ordered list semantics (steps have implicit sequence meaning)
 *   - Screen reader: each step reads as "Step N: Label — Description"
 */
import type { RequestFlowStep, ArchitectureNode } from './types'
import { CATEGORY_STYLES } from './node-category-styles'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface RequestFlowViewProps {
  steps: RequestFlowStep[]
  nodes: Record<string, ArchitectureNode>
  onNodeSelect: (id: string) => void
  selectedNodeId: string | null
}

export function RequestFlowView({
  steps,
  nodes,
  onNodeSelect,
  selectedNodeId,
}: RequestFlowViewProps) {
  return (
    <div className="mx-auto max-w-lg">
      <ol
        className="relative space-y-0"
        aria-label="Request flow through the system"
      >
        {steps.map((step, idx) => {
          const node = nodes[step.nodeId]
          if (!node) return null

          const styles = CATEGORY_STYLES[node.category]
          const isLast = idx === steps.length - 1
          const isSelected = selectedNodeId === step.nodeId

          return (
            <li key={`${step.nodeId}-${idx}`} className="relative">
              {/* Step card */}
              <div
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Step ${idx + 1}: ${step.label} — ${step.description}. Click to view details.`}
                onClick={() => { onNodeSelect(step.nodeId) }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onNodeSelect(step.nodeId)
                  }
                }}
                className={cn(
                  'group flex cursor-pointer items-start gap-3 rounded-lg border bg-surface p-4',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  styles.card,
                  isSelected && 'border-accent ring-1 ring-accent/40',
                )}
              >
                {/* Step number */}
                <span
                  aria-hidden
                  className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    styles.badge,
                  )}
                >
                  {idx + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={cn(
                        'h-1.5 w-1.5 shrink-0 rounded-full',
                        styles.dot,
                      )}
                    />
                    <p className="font-semibold text-sm text-text-primary">{step.label}</p>
                    <span
                      aria-hidden
                      className={cn(
                        'ml-auto rounded px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-widest',
                        styles.badge,
                      )}
                    >
                      {styles.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector arrow between steps */}
              {!isLast && (
                <div
                  aria-hidden
                  className="flex items-center justify-center py-1"
                >
                  {step.direction === 'down' ? (
                    <ArrowDown
                      size={14}
                      className="text-accent/50 motion-reduce:hidden"
                    />
                  ) : (
                    <ArrowUp
                      size={14}
                      className="text-text-tertiary/50 motion-reduce:hidden"
                    />
                  )}
                  {/* Reduced motion fallback */}
                  <span className="hidden h-3 w-px bg-border motion-reduce:block" />
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-center text-xs text-text-tertiary">
        Click any step to explore the component in detail.
      </p>
    </div>
  )
}

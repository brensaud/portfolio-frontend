/**
 * deployment-view.tsx — infrastructure stack diagram.
 *
 * Renders a vertical list of deployment layers with provider badges
 * and optional notes. Represents the hosting path from browser to data.
 *
 * Category colours match the logical architecture node colours so
 * the visual language is consistent across views.
 */
import type { DeploymentNode } from './types'
import { CATEGORY_STYLES } from './node-category-styles'
import { cn } from '@/lib/utils'
import { ArrowDown } from 'lucide-react'

interface DeploymentViewProps {
  stack: DeploymentNode[]
}

export function DeploymentView({ stack }: DeploymentViewProps) {
  return (
    <div className="mx-auto max-w-sm">
      <ol
        className="space-y-0"
        aria-label="Deployment infrastructure stack, top to bottom"
      >
        {stack.map((node, idx) => {
          const styles = CATEGORY_STYLES[node.category]
          const isLast = idx === stack.length - 1

          return (
            <li key={node.id}>
              {/* Layer card */}
              <div
                className={cn(
                  'rounded-lg border bg-surface px-4 py-3',
                  styles.card.replace(/hover:[^\s]+/g, ''), // no hover — not interactive
                )}
              >
                <div className="flex items-center gap-3">
                  {/* Category dot */}
                  <span
                    aria-hidden
                    className={cn('h-2 w-2 shrink-0 rounded-full', styles.dot)}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-text-primary">{node.label}</p>
                      {node.provider && (
                        <span
                          className={cn(
                            'rounded px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-widest',
                            styles.badge,
                          )}
                        >
                          {node.provider}
                        </span>
                      )}
                    </div>
                    {node.sublabel && (
                      <p className="mt-0.5 font-mono text-[11px] text-text-tertiary">
                        {node.sublabel}
                      </p>
                    )}
                    {node.note && (
                      <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                        {node.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  aria-hidden
                  className="flex items-center justify-center py-1"
                >
                  <ArrowDown size={13} className="text-border motion-reduce:hidden" />
                  <span className="hidden h-3 w-px bg-border motion-reduce:block" />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

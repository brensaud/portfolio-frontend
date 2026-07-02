/**
 * architecture-node-card.tsx — individual component card in the canvas grid.
 *
 * Renders a single architecture node as a clickable card with:
 *   - Category colour dot (left accent)
 *   - Category label badge
 *   - Node label + sublabel
 *   - Selected state (accent border + ring)
 *   - Full keyboard accessibility (role="button", Enter/Space activation)
 *
 * Used in both the desktop canvas and the mobile stacked list.
 */
import type { ArchitectureNode } from './types'
import { CATEGORY_STYLES } from './node-category-styles'
import { cn } from '@/lib/utils'

interface ArchitectureNodeCardProps {
  node: ArchitectureNode
  isSelected: boolean
  onClick: () => void
  /** Compact variant for the mobile stacked list. */
  compact?: boolean | undefined
}

export function ArchitectureNodeCard({
  node,
  isSelected,
  onClick,
  compact = false,
}: ArchitectureNodeCardProps) {
  const styles = CATEGORY_STYLES[node.category]

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${node.label}${node.sublabel ? ` — ${node.sublabel}` : ''}. Click to view details.`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={cn(
        // Base
        'relative cursor-pointer select-none rounded-lg border bg-surface',
        'transition-colors duration-150',
        // Focus ring
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        // Category-specific hover border
        styles.card,
        // Selected state overrides
        isSelected && 'border-accent ring-1 ring-accent/40',
        compact ? 'px-4 py-3' : 'px-3 py-2.5',
      )}
    >
      {/* Selected indicator — left accent bar */}
      {isSelected && (
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-0.5 rounded-l-lg bg-accent"
        />
      )}

      <div className={cn('flex items-start gap-2.5', compact && 'gap-3')}>
        {/* Category dot */}
        <div
          aria-hidden
          className={cn(
            'mt-1 shrink-0 rounded-full',
            styles.dot,
            compact ? 'h-2.5 w-2.5' : 'h-2 w-2',
          )}
        />

        <div className="min-w-0 flex-1">
          {/* Category badge + label on same line for compact */}
          {compact ? (
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider',
                  styles.badge,
                )}
              >
                {styles.label}
              </span>
            </div>
          ) : (
            <span
              aria-hidden
              className={cn(
                'mb-1 block rounded px-1 py-px font-mono text-[9px] font-semibold uppercase tracking-widest',
                styles.badge,
              )}
            >
              {styles.label}
            </span>
          )}

          {/* Node label */}
          <p
            className={cn(
              'font-semibold leading-tight text-text-primary',
              compact ? 'text-sm' : 'text-xs',
            )}
          >
            {node.label}
          </p>

          {/* Sublabel */}
          {node.sublabel && (
            <p
              className={cn(
                'mt-0.5 font-mono leading-tight text-text-tertiary',
                compact ? 'text-xs' : 'text-[10px]',
              )}
            >
              {node.sublabel}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

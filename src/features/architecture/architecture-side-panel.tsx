/**
 * architecture-side-panel.tsx — detail panel for the selected component.
 *
 * Appears when a node is selected in any view. Shows the full NodeDetails:
 * purpose, responsibilities, technologies, why it exists, alternatives
 * considered, trade-offs, and security/performance considerations.
 *
 * Layout:
 *   Desktop: fixed-width panel to the right of the canvas (set by parent)
 *   Mobile: appears below the canvas/mobile list (full width)
 *
 * Accessibility:
 *   - role="complementary" with aria-label derived from node name
 *   - Close button has aria-label
 *   - Sections use <h3> headings for screen reader navigation
 */
import { X } from 'lucide-react'
import type { ArchitectureNode } from './types'
import { CATEGORY_STYLES } from './node-category-styles'
import { cn } from '@/lib/utils'

interface SectionProps {
  title: string
  children: React.ReactNode
}

function DetailSection({ title, children }: SectionProps) {
  return (
    <div>
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
        {title}
      </h3>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary">
          <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
          {item}
        </li>
      ))}
    </ul>
  )
}

interface ArchitectureSidePanelProps {
  node: ArchitectureNode
  onClose: () => void
}

export function ArchitectureSidePanel({ node, onClose }: ArchitectureSidePanelProps) {
  const styles = CATEGORY_STYLES[node.category]
  const { details } = node

  return (
    <aside
      role="complementary"
      aria-label={`${node.label} component details`}
      className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              aria-hidden
              className={cn(
                'h-2 w-2 shrink-0 rounded-full',
                styles.dot,
              )}
            />
            <span
              className={cn(
                'rounded px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-widest',
                styles.badge,
              )}
            >
              {styles.label}
            </span>
          </div>
          <h2 className="text-base font-bold text-text-primary">{node.label}</h2>
          {node.sublabel && (
            <p className="mt-0.5 font-mono text-xs text-text-tertiary">{node.sublabel}</p>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label={`Close ${node.label} detail panel`}
          className="shrink-0 rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X size={16} aria-hidden />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-5">

          {/* Purpose */}
          <DetailSection title="Purpose">
            <p className="text-xs leading-relaxed text-text-secondary">{details.purpose}</p>
          </DetailSection>

          {/* Responsibilities */}
          <DetailSection title="Responsibilities">
            <BulletList items={details.responsibilities} />
          </DetailSection>

          {/* Technologies */}
          <DetailSection title="Technologies">
            <div className="flex flex-wrap gap-1.5">
              {details.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </DetailSection>

          {/* Why it exists */}
          <DetailSection title="Why it exists">
            <p className="text-xs leading-relaxed text-text-secondary">{details.whyItExists}</p>
          </DetailSection>

          {/* Alternatives considered */}
          {details.alternativesConsidered.length > 0 && (
            <DetailSection title="Alternatives considered">
              <div className="space-y-2">
                {details.alternativesConsidered.map((alt, i) => (
                  <div key={i} className="rounded-lg border border-border bg-surface-raised p-3">
                    <p className="mb-1 text-[11px] font-semibold text-text-primary">{alt.option}</p>
                    <p className="text-[11px] leading-relaxed text-text-tertiary">
                      {alt.whyNotChosen}
                    </p>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {/* Trade-offs */}
          {details.tradeoffs.length > 0 && (
            <DetailSection title="Trade-offs">
              <BulletList items={details.tradeoffs} />
            </DetailSection>
          )}

          {/* Security */}
          {details.securityConsiderations.length > 0 && (
            <DetailSection title="Security considerations">
              <BulletList items={details.securityConsiderations} />
            </DetailSection>
          )}

          {/* Performance */}
          {details.performanceConsiderations.length > 0 && (
            <DetailSection title="Performance considerations">
              <BulletList items={details.performanceConsiderations} />
            </DetailSection>
          )}

        </div>
      </div>
    </aside>
  )
}

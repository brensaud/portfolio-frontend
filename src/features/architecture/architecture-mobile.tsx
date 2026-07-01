/**
 * architecture-mobile.tsx — stacked node card list for small screens.
 *
 * Shown instead of ArchitectureCanvas below the lg breakpoint.
 * Nodes are grouped by category row (matching the logical architecture order)
 * and displayed as a simple vertical list of compact cards.
 *
 * Accessibility: same role/keyboard semantics as the canvas node cards.
 */
import type { ArchitectureNode } from './types'
import { ArchitectureNodeCard } from './architecture-node-card'

// Display order matches the logical architecture grid rows (top to bottom).
const ROW_ORDER = [0, 1, 2, 3, 4]

interface ArchitectureMobileProps {
  nodes: Record<string, ArchitectureNode>
  selectedNodeId: string | null
  onNodeSelect: (id: string) => void
}

export function ArchitectureMobile({
  nodes,
  selectedNodeId,
  onNodeSelect,
}: ArchitectureMobileProps) {
  const nodeList = Object.values(nodes)

  // Sort by row first, then column — matches reading order of the diagram.
  const sorted = [...nodeList].sort((a, b) => {
    const rowDiff = a.position.row - b.position.row
    return rowDiff !== 0 ? rowDiff : a.position.col - b.position.col
  })

  // Group by row
  const byRow = ROW_ORDER.map((row) => sorted.filter((n) => n.position.row === row))

  return (
    <div
      className="space-y-3"
      role="list"
      aria-label="Architecture components"
    >
      {byRow.map((rowNodes, rowIdx) => {
        if (rowNodes.length === 0) return null
        return (
          <div key={rowIdx} className={rowNodes.length > 1 ? 'grid grid-cols-2 gap-3 sm:grid-cols-3' : ''}>
            {rowNodes.map((node) => (
              <div key={node.id} role="listitem">
                <ArchitectureNodeCard
                  node={node}
                  isSelected={selectedNodeId === node.id}
                  onClick={() => { onNodeSelect(node.id) }}
                  compact
                />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

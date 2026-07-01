/**
 * architecture-canvas.tsx — desktop logical architecture diagram.
 *
 * Renders a CSS Grid of node cards with an SVG overlay for connection lines.
 * The grid and SVG use the same CANVAS constants so coordinates align exactly.
 *
 * Layout:
 *   - Outer div: fixed pixel dimensions matching the grid (COLS × CELL_W, ROWS × CELL_H)
 *   - SVG: absolute, inset-0, pointer-events-none — draws connections behind nodes
 *   - Grid: absolute, inset-0 — places node cards in their (row, col) cells
 *
 * Accessibility:
 *   - Grid container has role="list" and aria-label
 *   - Each node card has role="button" and aria-pressed (in ArchitectureNodeCard)
 *   - Keyboard navigation: Tab between nodes, Enter/Space to select
 *
 * Responsiveness:
 *   - Hidden below lg breakpoint — the mobile view (ArchitectureMobile) is shown instead
 *   - Horizontal scroll enabled on lg+ if viewport is narrower than the canvas
 */
import { CANVAS } from './types'
import type { ArchitectureNode, ArchitectureConnection } from './types'
import { ArchitectureConnections } from './architecture-connections'
import { ArchitectureNodeCard } from './architecture-node-card'

interface ArchitectureCanvasProps {
  nodes: Record<string, ArchitectureNode>
  connections: ArchitectureConnection[]
  rows: number
  cols: number
  selectedNodeId: string | null
  onNodeSelect: (id: string) => void
}

export function ArchitectureCanvas({
  nodes,
  connections,
  rows,
  cols,
  selectedNodeId,
  onNodeSelect,
}: ArchitectureCanvasProps) {
  const canvasWidth = cols * CANVAS.CELL_W
  const canvasHeight = rows * CANVAS.CELL_H

  const nodeList = Object.values(nodes)

  return (
    <div className="overflow-x-auto">
      {/* Connection type legend */}
      <div className="mb-4 flex flex-wrap gap-4" aria-label="Connection type legend">
        {[
          { type: 'sync', color: '#6366f1', label: 'Synchronous' },
          { type: 'async', color: '#f59e0b', label: 'Asynchronous' },
          { type: 'data', color: '#8b5cf6', label: 'Data' },
          { type: 'auth', color: '#22c55e', label: 'Auth' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-text-tertiary">
            <span
              className="inline-block h-px w-6 rounded"
              style={{ backgroundColor: color, opacity: 0.7 }}
              aria-hidden
            />
            {label}
          </span>
        ))}
      </div>

      {/* Canvas */}
      <div
        className="relative mx-auto"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        {/* SVG connections layer — behind the node cards */}
        <ArchitectureConnections
          connections={connections}
          nodes={nodes}
          highlightNodeId={selectedNodeId}
          rows={rows}
          cols={cols}
        />

        {/* Node grid */}
        <div
          className="absolute inset-0"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, ${CANVAS.CELL_W}px)`,
            gridTemplateRows: `repeat(${rows}, ${CANVAS.CELL_H}px)`,
          }}
          role="list"
          aria-label="Architecture components"
        >
          {nodeList.map((node) => (
            <div
              key={node.id}
              role="listitem"
              style={{
                gridRow: node.position.row + 1,
                gridColumn: node.position.col + 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: CANVAS.CELL_W,
                height: CANVAS.CELL_H,
              }}
            >
              <div style={{ width: CANVAS.NODE_W }}>
                <ArchitectureNodeCard
                  node={node}
                  isSelected={selectedNodeId === node.id}
                  onClick={() => { onNodeSelect(node.id) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

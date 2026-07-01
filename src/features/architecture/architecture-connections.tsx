/**
 * architecture-connections.tsx — SVG overlay that draws connection lines.
 *
 * Renders as an absolutely-positioned SVG on top of the node grid.
 * Connection paths are cubic bezier curves calculated mathematically from
 * each node's (row, col) position — no DOM measurement needed.
 *
 * Path routing:
 *   - Exit point: bottom-center of source node (going down) or
 *                 top-center of source node (going up, e.g. workers→redis)
 *   - Entry point: top-center of target (going down) or bottom-center (going up)
 *   - Control points: aligned vertically at the midpoint — creates a smooth S-curve
 *     for both straight and diagonal connections.
 *
 * Connection type drives stroke colour:
 *   sync  → accent (indigo)
 *   async → amber
 *   data  → violet
 *   auth  → green
 */
import type { ArchitectureConnection, ArchitectureNode } from './types'
import { CANVAS } from './types'

const HALF_NODE_H = CANVAS.NODE_H / 2

const CONNECTION_COLORS: Record<string, string> = {
  sync: '#6366f1',   // accent indigo
  async: '#f59e0b',  // amber
  data: '#8b5cf6',   // violet
  auth: '#22c55e',   // green
}

interface ConnectionPathProps {
  connection: ArchitectureConnection
  fromNode: ArchitectureNode
  toNode: ArchitectureNode
  dimmed: boolean
}

function ConnectionPath({ connection, fromNode, toNode, dimmed }: ConnectionPathProps) {
  const ax = fromNode.position.col * CANVAS.CELL_W + CANVAS.CELL_W / 2
  const ay = fromNode.position.row * CANVAS.CELL_H + CANVAS.CELL_H / 2
  const bx = toNode.position.col * CANVAS.CELL_W + CANVAS.CELL_W / 2
  const by = toNode.position.row * CANVAS.CELL_H + CANVAS.CELL_H / 2

  // Determine direction and exit/entry points
  const goingDown = by >= ay
  const startY = goingDown ? ay + HALF_NODE_H : ay - HALF_NODE_H
  const endY = goingDown ? by - HALF_NODE_H : by + HALF_NODE_H
  const midY = (startY + endY) / 2

  const d = `M ${ax} ${startY} C ${ax} ${midY}, ${bx} ${midY}, ${bx} ${endY}`
  const color = CONNECTION_COLORS[connection.type] ?? CONNECTION_COLORS['sync']
  const markerId = `arrow-${connection.type}`

  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={1.5}
      strokeOpacity={dimmed ? 0.15 : 0.6}
      fill="none"
      markerEnd={`url(#${markerId})`}
      aria-hidden
    />
  )
}

interface ArchitectureConnectionsProps {
  connections: ArchitectureConnection[]
  nodes: Record<string, ArchitectureNode>
  /** If set, connections not involving this node are dimmed. */
  highlightNodeId: string | null
  rows: number
  cols: number
}

export function ArchitectureConnections({
  connections,
  nodes,
  highlightNodeId,
  rows,
  cols,
}: ArchitectureConnectionsProps) {
  const width = cols * CANVAS.CELL_W
  const height = rows * CANVAS.CELL_H

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      <defs>
        {/* One arrowhead marker per connection type */}
        {(['sync', 'async', 'data', 'auth'] as const).map((type) => {
          const color = CONNECTION_COLORS[type] ?? '#6366f1'
          return (
            <marker
              key={type}
              id={`arrow-${type}`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} fillOpacity={0.8} />
            </marker>
          )
        })}
      </defs>

      {connections.map((conn) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]
        // noUncheckedIndexedAccess: guard against missing nodes in data
        if (!fromNode || !toNode) return null

        const dimmed =
          highlightNodeId !== null &&
          conn.from !== highlightNodeId &&
          conn.to !== highlightNodeId

        return (
          <ConnectionPath
            key={conn.id}
            connection={conn}
            fromNode={fromNode}
            toNode={toNode}
            dimmed={dimmed}
          />
        )
      })}
    </svg>
  )
}

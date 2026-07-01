/**
 * types.ts — shared type definitions for the Interactive Architecture Explorer.
 *
 * All architecture data is typed here. The data layer (src/data/architecture/)
 * depends on these types; feature components depend on both. Nothing outside
 * src/features/architecture/ imports from this file directly — re-exported
 * through the feature index.
 *
 * Design principles:
 *   - String union types instead of enums (erasableSyntaxOnly constraint)
 *   - exactOptionalPropertyTypes: every optional field uses `?: T | undefined`
 *   - noUncheckedIndexedAccess: callers must handle undefined from Record lookups
 */

// ─── Taxonomy ─────────────────────────────────────────────────────────────────

/** Visual / semantic category for a node — drives colour coding. */
export type NodeCategory =
  | 'frontend'
  | 'api'
  | 'auth'
  | 'service'
  | 'database'
  | 'cache'
  | 'worker'
  | 'ai'
  | 'external'
  | 'infrastructure'

/** Communication pattern for a connection — drives line style. */
export type ConnectionType = 'sync' | 'async' | 'data' | 'auth'

/** Available diagram views. Add new values here to unlock new tabs. */
export type ViewMode = 'logical' | 'request-flow' | 'deployment'

// ─── Node ─────────────────────────────────────────────────────────────────────

/** Row/column position in the architecture grid (0-indexed). */
export interface NodePosition {
  row: number
  col: number
}

/** One alternative approach the team considered but did not choose. */
export interface AlternativeConsidered {
  option: string
  whyNotChosen: string
}

/**
 * Rich detail content shown in the side panel when a node is selected.
 * All fields are required — every node must be fully documented.
 */
export interface NodeDetails {
  purpose: string
  responsibilities: string[]
  technologies: string[]
  whyItExists: string
  alternativesConsidered: AlternativeConsidered[]
  tradeoffs: string[]
  securityConsiderations: string[]
  performanceConsiderations: string[]
}

/** A single node in the architecture diagram. */
export interface ArchitectureNode {
  id: string
  label: string
  sublabel?: string | undefined
  category: NodeCategory
  /** Used for layout in the Logical Architecture view. */
  position: NodePosition
  details: NodeDetails
}

// ─── Connection ───────────────────────────────────────────────────────────────

/** A directed edge between two nodes. */
export interface ArchitectureConnection {
  id: string
  from: string
  to: string
  label?: string | undefined
  type: ConnectionType
  description?: string | undefined
}

// ─── Request Flow ─────────────────────────────────────────────────────────────

/** One step in the request/response journey diagram. */
export interface RequestFlowStep {
  nodeId: string
  label: string
  description: string
  direction: 'down' | 'up'
}

// ─── Deployment ───────────────────────────────────────────────────────────────

/** A node in the deployment overview (infra-layer, not application-layer). */
export interface DeploymentNode {
  id: string
  label: string
  sublabel?: string | undefined
  category: NodeCategory
  provider?: string | undefined
  note?: string | undefined
}

// ─── Engineering Decisions ────────────────────────────────────────────────────

/** An Architecture Decision Record (ADR) — key choices and their rationale. */
export interface EngineeringDecision {
  id: string
  title: string
  problem: string
  decision: string
  alternatives: string[]
  tradeoffs: string
  lessonsLearned?: string | undefined
}

// ─── Project Architecture ─────────────────────────────────────────────────────

/** Metadata about the architecture document itself. */
export interface ArchitectureMetadata {
  lastUpdated: string
  version: string
  tags: string[]
  summary: string
}

/**
 * The complete architecture document for one project.
 * `nodes` is a Record for O(1) lookup by id.
 * `grid` defines the bounding dimensions of the logical canvas.
 */
export interface ProjectArchitecture {
  id: string
  projectSlug: string
  projectName: string
  tagline: string
  metadata: ArchitectureMetadata
  /** All nodes keyed by id. */
  nodes: Record<string, ArchitectureNode>
  /** Connections between nodes for the Logical Architecture view. */
  connections: ArchitectureConnection[]
  /** Canvas grid dimensions: how many rows/cols the logical view occupies. */
  grid: {
    rows: number
    cols: number
  }
  /** Ordered steps for the Request Flow view. */
  requestFlow: RequestFlowStep[]
  /** Ordered infra stack for the Deployment Overview view. */
  deploymentStack: DeploymentNode[]
  /** Key architectural decisions (ADRs). */
  decisions: EngineeringDecision[]
}

// ─── Canvas constants ─────────────────────────────────────────────────────────

/**
 * Layout constants for the logical architecture canvas.
 * Shared by ArchitectureCanvas (node placement) and ArchitectureConnections
 * (SVG path calculation) so both layers stay in sync.
 */
export const CANVAS = {
  /** Pixel width of each grid cell. */
  CELL_W: 220,
  /** Pixel height of each grid cell. */
  CELL_H: 120,
  /** Rendered width of each node card. Must be ≤ CELL_W. */
  NODE_W: 176,
  /** Rendered height of each node card. Must be ≤ CELL_H. */
  NODE_H: 68,
} as const

// ─── View metadata ────────────────────────────────────────────────────────────

export interface ViewDefinition {
  mode: ViewMode
  label: string
  description: string
}

export const VIEW_DEFINITIONS: ViewDefinition[] = [
  {
    mode: 'logical',
    label: 'Logical Architecture',
    description: 'Components and their relationships',
  },
  {
    mode: 'request-flow',
    label: 'Request Flow',
    description: 'How a request travels through the system',
  },
  {
    mode: 'deployment',
    label: 'Deployment Overview',
    description: 'Infrastructure stack and hosting',
  },
]

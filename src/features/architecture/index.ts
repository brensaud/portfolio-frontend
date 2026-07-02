/**
 * index.ts — public API for the architecture feature.
 *
 * Import from '@/features/architecture' rather than from individual files.
 * Only exports what pages need — internal helpers stay unexported.
 */
export type {
  ProjectArchitecture,
  ArchitectureNode,
  ArchitectureConnection,
  RequestFlowStep,
  DeploymentNode,
  EngineeringDecision,
  ViewMode,
  NodeCategory,
} from './types'

export { VIEW_DEFINITIONS, CANVAS } from './types'
export { useArchitectureState } from './use-architecture-state'
export { ArchitectureCanvas } from './architecture-canvas'
export { ArchitectureMobile } from './architecture-mobile'
export { ArchitectureSidePanel } from './architecture-side-panel'
export { RequestFlowView } from './request-flow-view'
export { DeploymentView } from './deployment-view'
export { EngineeringDecisions } from './engineering-decisions'

/**
 * index.ts — registry of all project architecture documents.
 *
 * Import this file to look up an architecture by project slug.
 * Each new project gets its own data file and is registered here.
 */
import type { ProjectArchitecture } from '@/features/architecture/types'
import { INTERVIEWPILOT_AI_ARCHITECTURE } from './interviewpilot-ai'

/** All architectures keyed by project slug. */
export const ARCHITECTURES: Record<string, ProjectArchitecture> = {
  'interviewpilot-ai': INTERVIEWPILOT_AI_ARCHITECTURE,
}

/** Sorted list for the /architecture landing page. */
export const ARCHITECTURE_LIST: ProjectArchitecture[] = Object.values(ARCHITECTURES)

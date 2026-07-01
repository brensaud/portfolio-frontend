/**
 * node-category-styles.ts — colour mapping for architecture node categories.
 *
 * Kept in a separate file so both ArchitectureNodeCard and ArchitectureSidePanel
 * can import the same tokens without creating a circular dependency.
 */
import type { NodeCategory } from './types'

export interface CategoryStyle {
  /** Tailwind classes for the node card border + background */
  card: string
  /** Tailwind classes for the category dot */
  dot: string
  /** Tailwind classes for the category label badge */
  badge: string
  /** Human-readable category label */
  label: string
}

export const CATEGORY_STYLES: Record<NodeCategory, CategoryStyle> = {
  frontend: {
    card: 'border-blue-500/30 hover:border-blue-500/60',
    dot: 'bg-blue-400',
    badge: 'text-blue-400 bg-blue-400/10',
    label: 'Frontend',
  },
  api: {
    card: 'border-green-500/30 hover:border-green-500/60',
    dot: 'bg-green-400',
    badge: 'text-green-400 bg-green-400/10',
    label: 'API',
  },
  auth: {
    card: 'border-amber-500/30 hover:border-amber-500/60',
    dot: 'bg-amber-400',
    badge: 'text-amber-400 bg-amber-400/10',
    label: 'Auth',
  },
  service: {
    card: 'border-indigo-500/30 hover:border-indigo-500/60',
    dot: 'bg-indigo-400',
    badge: 'text-indigo-400 bg-indigo-400/10',
    label: 'Service',
  },
  database: {
    card: 'border-violet-500/30 hover:border-violet-500/60',
    dot: 'bg-violet-400',
    badge: 'text-violet-400 bg-violet-400/10',
    label: 'Database',
  },
  cache: {
    card: 'border-red-500/30 hover:border-red-500/60',
    dot: 'bg-red-400',
    badge: 'text-red-400 bg-red-400/10',
    label: 'Cache',
  },
  worker: {
    card: 'border-orange-500/30 hover:border-orange-500/60',
    dot: 'bg-orange-400',
    badge: 'text-orange-400 bg-orange-400/10',
    label: 'Worker',
  },
  ai: {
    card: 'border-purple-500/30 hover:border-purple-500/60',
    dot: 'bg-purple-400',
    badge: 'text-purple-400 bg-purple-400/10',
    label: 'AI',
  },
  external: {
    card: 'border-border hover:border-text-tertiary/40',
    dot: 'bg-text-tertiary',
    badge: 'text-text-tertiary bg-surface-raised',
    label: 'External',
  },
  infrastructure: {
    card: 'border-slate-500/30 hover:border-slate-500/60',
    dot: 'bg-slate-400',
    badge: 'text-slate-400 bg-slate-400/10',
    label: 'Infrastructure',
  },
}

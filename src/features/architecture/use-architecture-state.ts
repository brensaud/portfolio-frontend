/**
 * use-architecture-state.ts — state management hook for the explorer.
 *
 * Manages:
 *   - Selected node ID (drives side panel content)
 *   - Active view mode (drives tab display)
 *
 * Kept as a plain hook rather than Context because the explorer is a
 * self-contained feature — no sibling components outside it need this state.
 */
import { useState, useCallback } from 'react'
import type { ViewMode } from './types'

export interface ArchitectureState {
  selectedNodeId: string | null
  activeView: ViewMode
  selectNode: (id: string) => void
  clearSelection: () => void
  setView: (mode: ViewMode) => void
}

export function useArchitectureState(): ArchitectureState {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<ViewMode>('logical')

  const selectNode = useCallback((id: string) => {
    setSelectedNodeId(id)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const setView = useCallback((mode: ViewMode) => {
    // Clear selection when switching views so the side panel doesn't show
    // stale data from the previous view.
    setSelectedNodeId(null)
    setActiveView(mode)
  }, [])

  return { selectedNodeId, activeView, selectNode, clearSelection, setView }
}

/**
 * ContactMessagesFilters — search input + status dropdown.
 *
 * All state is controlled externally.  This component only emits changes
 * via callbacks so the parent page can own the single source of truth for
 * filter state (needed for pagination reset on filter change).
 */

import { type ChangeEvent, useCallback, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type ContactMessageStatus } from '@/lib/admin-api'

type StatusFilter = ContactMessageStatus | 'all'

interface ContactMessagesFiltersProps {
  search: string
  status: StatusFilter
  onSearchChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
}

export function ContactMessagesFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ContactMessagesFiltersProps) {
  // Local input state for debouncing — avoids a query on every keystroke.
  const [localSearch, setLocalSearch] = useState(search)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalSearch(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onSearchChange(value)
      }, 350)
    },
    [onSearchChange],
  )

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={localSearch}
          onChange={handleSearchChange}
          placeholder="Search name, email or subject…"
          aria-label="Search messages"
          className="h-9 w-full rounded-md border border-border bg-surface-raised pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
        />
      </div>

      {/* Status filter */}
      <Select value={status} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
        <SelectTrigger
          aria-label="Filter by status"
          className="h-9 w-full text-sm sm:w-36"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="unread">Unread</SelectItem>
          <SelectItem value="read">Read</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

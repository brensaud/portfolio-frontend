/**
 * Tabs — horizontal tab navigation built on Radix UI Tabs.
 * Keyboard: Arrow keys navigate between tabs; Enter/Space activates.
 *
 * @example
 *   <Tabs defaultValue="overview">
 *     <TabsList>
 *       <TabsTrigger value="overview">Overview</TabsTrigger>
 *       <TabsTrigger value="details">Details</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="overview">Overview content</TabsContent>
 *     <TabsContent value="details">Details content</TabsContent>
 *   </Tabs>
 */
import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = RadixTabs.Root

// ─── List ────────────────────────────────────────────────────────────────────

export function TabsList({ className, ...props }: RadixTabs.TabsListProps) {
  return (
    <RadixTabs.List
      className={cn(
        'inline-flex items-center gap-0 rounded-lg border border-border bg-surface-raised p-1',
        className,
      )}
      {...props}
    />
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

export function TabsTrigger({ className, ...props }: RadixTabs.TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5',
        'text-sm font-medium text-text-secondary',
        'transition-colors duration-[--duration-fast]',
        'hover:text-text-primary',
        // Active state
        'data-[state=active]:bg-surface data-[state=active]:text-text-primary data-[state=active]:shadow-sm',
        // Focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface-raised',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────

export function TabsContent({ className, ...props }: RadixTabs.TabsContentProps) {
  return (
    <RadixTabs.Content
      className={cn(
        'mt-4',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...props}
    />
  )
}

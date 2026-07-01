/**
 * Tooltip — hover tooltip built on Radix UI Tooltip.
 * Wrap your entire app (or at least the tooltip usage context) in TooltipProvider.
 * The RootLayout already wraps the app via AppProviders, but TooltipProvider
 * is placed here as a named export for convenience and granular wrapping.
 *
 * @example
 *   <TooltipProvider>
 *     <Tooltip>
 *       <TooltipTrigger asChild>
 *         <Button iconOnly aria-label="Copy"><Copy size={16} /></Button>
 *       </TooltipTrigger>
 *       <TooltipContent>Copy to clipboard</TooltipContent>
 *     </Tooltip>
 *   </TooltipProvider>
 */
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

export const TooltipProvider = RadixTooltip.Provider
export const Tooltip = RadixTooltip.Root
export const TooltipTrigger = RadixTooltip.Trigger
export const TooltipPortal = RadixTooltip.Portal

// ─── Content ─────────────────────────────────────────────────────────────────

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: RadixTooltip.TooltipContentProps) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-w-xs rounded-md border border-border bg-surface-overlay px-3 py-1.5',
          'text-xs text-text-primary shadow-md',
          // Enter / exit animations
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          className,
        )}
        {...props}
      />
    </RadixTooltip.Portal>
  )
}

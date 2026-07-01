/**
 * Select — dropdown select built on Radix UI Select.
 * Keyboard: Space/Enter opens; arrow keys cycle options; Escape closes.
 *
 * @example
 *   <Select defaultValue="react">
 *     <SelectTrigger aria-label="Framework">
 *       <SelectValue placeholder="Select framework…" />
 *     </SelectTrigger>
 *     <SelectContent>
 *       <SelectLabel>Frontend</SelectLabel>
 *       <SelectItem value="react">React</SelectItem>
 *       <SelectItem value="vue">Vue</SelectItem>
 *       <SelectSeparator />
 *       <SelectLabel>Backend</SelectLabel>
 *       <SelectItem value="fastapi">FastAPI</SelectItem>
 *     </SelectContent>
 *   </Select>
 */
import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Select = RadixSelect.Root
export const SelectGroup = RadixSelect.Group
export const SelectValue = RadixSelect.Value

// ─── Trigger ─────────────────────────────────────────────────────────────────

export function SelectTrigger({ className, children, ...props }: RadixSelect.SelectTriggerProps) {
  return (
    <RadixSelect.Trigger
      className={cn(
        'flex h-11 w-full items-center justify-between rounded-md',
        'border border-border bg-surface-raised px-4',
        'text-sm text-text-primary placeholder:text-text-muted',
        'transition-colors duration-[--duration-fast]',
        'hover:bg-surface',
        'focus-visible:outline-none focus-visible:border-accent/40',
        'focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        '[&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <RadixSelect.Icon asChild>
        <ChevronDown size={16} className="shrink-0 text-text-muted" aria-hidden="true" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: RadixSelect.SelectContentProps) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        position={position}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden',
          'rounded-md border border-border bg-surface shadow-lg',
          // Enter/exit
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' && [
            'w-full min-w-[var(--radix-select-trigger-width)]',
            'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          ],
          className,
        )}
        {...props}
      >
        <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center py-1 text-text-muted">
          <ChevronUp size={14} aria-hidden="true" />
        </RadixSelect.ScrollUpButton>

        <RadixSelect.Viewport
          className={cn(
            'p-1',
            position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </RadixSelect.Viewport>

        <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center py-1 text-text-muted">
          <ChevronDown size={14} aria-hidden="true" />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
}

// ─── Item ─────────────────────────────────────────────────────────────────────

export function SelectItem({ className, children, ...props }: RadixSelect.SelectItemProps) {
  return (
    <RadixSelect.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center',
        'rounded-sm py-1.5 pl-8 pr-2 text-sm text-text-secondary',
        'outline-none transition-colors duration-[--duration-fast]',
        'hover:bg-surface-raised hover:text-text-primary',
        'focus:bg-surface-raised focus:text-text-primary',
        'data-[state=checked]:text-text-primary',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RadixSelect.ItemIndicator>
          <Check size={14} aria-hidden="true" />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  )
}

// ─── Label ────────────────────────────────────────────────────────────────────

export function SelectLabel({ className, ...props }: RadixSelect.SelectLabelProps) {
  return (
    <RadixSelect.Label
      className={cn('py-1.5 pl-8 pr-2 text-xs font-semibold text-text-muted', className)}
      {...props}
    />
  )
}

// ─── Separator ────────────────────────────────────────────────────────────────

export function SelectSeparator({ className, ...props }: RadixSelect.SelectSeparatorProps) {
  return (
    <RadixSelect.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

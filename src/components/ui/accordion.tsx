/**
 * Accordion — collapsible disclosure sections built on Radix UI Accordion.
 * Keyboard: Enter/Space opens/closes; arrow keys navigate between items.
 *
 * @example
 *   <Accordion type="single" collapsible>
 *     <AccordionItem value="item-1">
 *       <AccordionTrigger>What is this?</AccordionTrigger>
 *       <AccordionContent>The answer is here.</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 */
import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = RadixAccordion.Root

// ─── Item ─────────────────────────────────────────────────────────────────────

export function AccordionItem({ className, ...props }: RadixAccordion.AccordionItemProps) {
  return (
    <RadixAccordion.Item
      className={cn('border-b border-border', className)}
      {...props}
    />
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

export function AccordionTrigger({ className, children, ...props }: RadixAccordion.AccordionTriggerProps) {
  return (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        className={cn(
          'flex flex-1 items-center justify-between py-4',
          'text-sm font-medium text-text-primary',
          'transition-colors duration-[--duration-fast] hover:text-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          // Rotate chevron on open
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          size={16}
          className="shrink-0 text-text-muted transition-transform duration-[--duration-base]"
          aria-hidden="true"
        />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────

export function AccordionContent({ className, children, ...props }: RadixAccordion.AccordionContentProps) {
  return (
    <RadixAccordion.Content
      className={cn(
        'overflow-hidden text-sm text-text-secondary',
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </RadixAccordion.Content>
  )
}

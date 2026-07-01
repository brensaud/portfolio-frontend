/**
 * Dialog — accessible modal overlay built on Radix UI Dialog.
 *
 * @example
 *   <Dialog>
 *     <DialogTrigger asChild>
 *       <Button>Open dialog</Button>
 *     </DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Confirm action</DialogTitle>
 *         <DialogDescription>This cannot be undone.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
 *         <Button>Confirm</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Re-export primitives that need no styling
export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogClose = RadixDialog.Close
export const DialogPortal = RadixDialog.Portal

// ─── Overlay ─────────────────────────────────────────────────────────────────

export function DialogOverlay({
  className,
  ...props
}: RadixDialog.DialogOverlayProps) {
  return (
    <RadixDialog.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

// ─── Content ─────────────────────────────────────────────────────────────────

export function DialogContent({
  className,
  children,
  ...props
}: RadixDialog.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-xl border border-border bg-surface p-6 shadow-xl',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'duration-[--duration-base]',
          className,
        )}
        {...props}
      >
        {children}
        <RadixDialog.Close className="absolute right-4 top-4 rounded-md p-1 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <X size={16} aria-hidden="true" />
          <span className="sr-only">Close</span>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </DialogPortal>
  )
}

// ─── Header / Footer ──────────────────────────────────────────────────────────

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

// ─── Title / Description ─────────────────────────────────────────────────────

export function DialogTitle({
  className,
  ...props
}: RadixDialog.DialogTitleProps) {
  return (
    <RadixDialog.Title
      className={cn('text-xl font-semibold tracking-tight text-text-primary', className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: RadixDialog.DialogDescriptionProps) {
  return (
    <RadixDialog.Description
      className={cn('text-sm leading-relaxed text-text-secondary', className)}
      {...props}
    />
  )
}

// Keyboard: Escape closes the dialog (Radix handles this automatically).

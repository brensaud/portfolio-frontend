/**
 * Textarea — multi-line text field. Same API as Input.
 *
 * @example
 *   <div className="flex flex-col gap-1.5">
 *     <label htmlFor="message" className="text-sm font-medium text-text-primary">
 *       Message
 *     </label>
 *     <Textarea id="message" placeholder="Your message…" rows={5} />
 *   </div>
 */
import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Renders a red border and shows the error message below. */
  isError?: boolean
  /** Error message displayed below the textarea when isError is true. */
  errorMessage?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, errorMessage, id, ...props }, ref) => {
    const errorId = id ? `${id}-error` : undefined

    return (
      <div className="flex flex-col gap-1">
        <textarea
          ref={ref}
          id={id}
          aria-invalid={isError ? 'true' : undefined}
          aria-describedby={isError && errorId ? errorId : undefined}
          className={cn(
            // Base
            'min-h-[120px] w-full resize-y rounded-md border bg-surface-raised px-4 py-3',
            'text-base text-text-primary placeholder:text-text-muted',
            'transition-colors duration-[--duration-fast]',
            // Default border
            'border-border',
            // Focus
            'focus-visible:outline-none focus-visible:border-accent/40',
            'focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-0',
            // Error
            isError && 'border-error focus-visible:border-error focus-visible:ring-error/20',
            // Disabled
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
        {isError && errorMessage && (
          <p id={errorId} role="alert" className="text-xs text-error">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

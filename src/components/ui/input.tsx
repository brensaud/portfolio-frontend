/**
 * Input — single-line text field with label and optional error state.
 *
 * Always pair with a visible <label> for accessibility. The `id` on the
 * input must match the `htmlFor` on the label — the Input component
 * forwards all HTML attributes so you can set `id` directly.
 *
 * @example
 *   <div className="flex flex-col gap-1.5">
 *     <label htmlFor="email" className="text-sm font-medium text-text-primary">
 *       Email
 *     </label>
 *     <Input id="email" type="email" placeholder="you@example.com" />
 *   </div>
 *
 *   // Error state
 *   <Input id="email" type="email" isError errorMessage="Invalid email address" />
 */
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Renders a red border and shows the error message below. */
  isError?: boolean
  /** Error message displayed below the input when isError is true. */
  errorMessage?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isError, errorMessage, id, ...props }, ref) => {
    const errorId = id ? `${id}-error` : undefined

    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          id={id}
          aria-invalid={isError ? 'true' : undefined}
          aria-describedby={isError && errorId ? errorId : undefined}
          className={cn(
            // Base
            'h-11 w-full rounded-md border bg-surface-raised px-4',
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

Input.displayName = 'Input'

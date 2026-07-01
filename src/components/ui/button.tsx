/**
 * Button — the primary interactive element in the design system.
 *
 * Variants: primary | secondary | ghost | danger
 * Sizes: sm | md | lg
 *
 * @example
 *   <Button>Click me</Button>
 *   <Button variant="secondary" size="lg">Secondary</Button>
 *   <Button isLoading>Saving…</Button>
 *   <Button leftIcon={<Plus size={16} />}>New Item</Button>
 *   // Render as <a> using asChild:
 *   <Button asChild><a href="/contact">Contact</a></Button>
 */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─── Variant config ───────────────────────────────────────────────────────────

export const buttonVariants = cva(
  // Base classes applied to all variants
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'font-medium transition-colors duration-[--duration-fast]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-accent text-text-on-accent',
          'hover:bg-accent-hover',
          'active:scale-[0.97]',
        ],
        secondary: [
          'border border-border bg-transparent text-text-secondary',
          'hover:border-border hover:bg-surface-raised hover:text-text-primary',
        ],
        ghost: [
          'bg-transparent text-text-secondary',
          'hover:text-text-primary',
        ],
        danger: [
          'bg-error text-white',
          'hover:bg-error/90',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-md',
      },
      iconOnly: {
        true: 'px-0',
      },
    },
    compoundVariants: [
      { size: 'sm', iconOnly: true, class: 'w-8' },
      { size: 'md', iconOnly: true, class: 'w-10' },
      { size: 'lg', iconOnly: true, class: 'w-12' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a loading spinner and disable interaction. */
  isLoading?: boolean
  /** Icon rendered before the label. */
  leftIcon?: ReactNode
  /** Icon rendered after the label. */
  rightIcon?: ReactNode
  /** When true, no label is rendered — the button is icon-only with a square aspect ratio. */
  iconOnly?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const spinnerSize: Record<NonNullable<typeof size>, string> = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        {...props}
      >
        {isLoading && (
          <Spinner className={spinnerSize[size ?? 'md']} aria-label="Loading" />
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'

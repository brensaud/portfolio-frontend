/**
 * Badge — compact inline label for status, categories, and metadata.
 *
 * @example
 *   <Badge>Default</Badge>
 *   <Badge variant="accent">New</Badge>
 *   <Badge variant="success">Available</Badge>
 *   <Badge size="sm">v1.2.3</Badge>
 */
import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium',
  {
    variants: {
      variant: {
        default: 'bg-surface-raised text-text-secondary border border-border',
        accent:  'bg-accent-subtle text-accent border border-accent/20',
        success: 'bg-success/10 text-success border border-success/20',
        warning: 'bg-warning/10 text-warning border border-warning/20',
        error:   'bg-error/10 text-error border border-error/20',
        outline: 'bg-transparent text-text-secondary border border-border',
      },
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

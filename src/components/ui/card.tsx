/**
 * Card — container for discrete content units (projects, blog posts, etc.).
 *
 * The `interactive` variant adds a hover lift effect for clickable cards.
 * Compose with `CardHeader`, `CardBody`, `CardFooter` for consistent padding.
 *
 * @example
 *   // Static card
 *   <Card>
 *     <CardHeader>Title</CardHeader>
 *     <CardBody>Content</CardBody>
 *   </Card>
 *
 *   // Interactive (clickable) card
 *   <Card variant="interactive" asChild>
 *     <Link to="/project/foo">...</Link>
 *   </Card>
 */
import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ─── Card ────────────────────────────────────────────────────────────────────

export const cardVariants = cva(
  'rounded-xl border border-border bg-surface overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        interactive: [
          'cursor-pointer transition-all duration-[--duration-base]',
          'hover:-translate-y-0.5 hover:border-border hover:shadow-lg',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

// ─── CardHeader ───────────────────────────────────────────────────────────────

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1 p-6 pb-4', className)}
      {...props}
    />
  )
}

// ─── CardBody ────────────────────────────────────────────────────────────────

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

// ─── CardFooter ───────────────────────────────────────────────────────────────

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

// ─── CardTitle ────────────────────────────────────────────────────────────────

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-xl font-semibold leading-snug tracking-tight text-text-primary', className)}
      {...props}
    />
  )
}

// ─── CardDescription ──────────────────────────────────────────────────────────

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm leading-relaxed text-text-secondary', className)} {...props} />
  )
}

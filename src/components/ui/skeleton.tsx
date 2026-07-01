/**
 * Skeleton — animated shimmer placeholder for loading states.
 *
 * Use to reserve space while content is being fetched, preventing layout shift.
 *
 * @example
 *   // Text line placeholder
 *   <Skeleton variant="text" className="w-48" />
 *
 *   // Avatar circle
 *   <Skeleton variant="circle" className="h-12 w-12" />
 *
 *   // Card thumbnail
 *   <Skeleton variant="rect" className="h-48 w-full" />
 *
 *   // Compose multiple skeletons for a card:
 *   <div className="space-y-3">
 *     <Skeleton variant="rect" className="h-40 w-full" />
 *     <Skeleton variant="text" className="w-3/4" />
 *     <Skeleton variant="text" className="w-1/2" />
 *   </div>
 */
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls the border-radius shape. Defaults to 'rect'. */
  variant?: 'text' | 'circle' | 'rect'
}

export function Skeleton({ className, variant = 'rect', ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading…"
      className={cn(
        // Shimmer animation using a gradient that sweeps left to right
        'relative overflow-hidden bg-surface-raised',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
        'before:animate-[shimmer_1.5s_ease-in-out_infinite]',
        // Shape variants
        variant === 'text' && 'h-4 rounded-sm',
        variant === 'circle' && 'rounded-full',
        variant === 'rect' && 'rounded-md',
        className,
      )}
      {...props}
    />
  )
}

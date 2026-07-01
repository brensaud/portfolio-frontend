/**
 * Container — centered max-width wrapper for page content.
 *
 * Provides the consistent horizontal padding and max-width used throughout
 * the site. All page content should be wrapped in this component.
 *
 * @example
 *   <Container>
 *     <h1>Page content</h1>
 *   </Container>
 *
 *   // With custom className:
 *   <Container className="border-b border-border">
 *     ...
 *   </Container>
 */
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = HTMLAttributes<HTMLDivElement>

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-5xl px-6', className)} {...props}>
      {children}
    </div>
  )
}

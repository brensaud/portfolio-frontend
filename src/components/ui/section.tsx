/**
 * Section — semantic <section> wrapper with consistent vertical spacing.
 *
 * Use this for all major content blocks on a page. It applies the standard
 * vertical rhythm from the design system (py-16 on mobile, py-24 on sm+).
 *
 * @example
 *   <Section>
 *     <Container>
 *       <h2>Section title</h2>
 *     </Container>
 *   </Section>
 *
 *   // Interior pages often need tighter spacing on the first section:
 *   <Section className="pt-8">
 *     ...
 *   </Section>
 */
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = HTMLAttributes<HTMLElement>

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn('py-16 sm:py-24', className)} {...props}>
      {children}
    </section>
  )
}

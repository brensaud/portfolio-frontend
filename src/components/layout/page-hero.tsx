/**
 * PageHero — standard header for interior pages (non-homepage).
 *
 * Renders an optional eyebrow label, required title (h1), and optional
 * description. Sits directly below the navbar, separated from page content
 * by a bottom border.
 *
 * @example
 *   // Minimal
 *   <PageHero title="Projects" />
 *
 *   // Full
 *   <PageHero
 *     eyebrow="Work"
 *     title="What I've built"
 *     description="A selection of projects that demonstrate my approach..."
 *   />
 */
import { Container } from '@/components/ui/container'
import { Label } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  /** Optional uppercase label rendered above the title. */
  eyebrow?: string
  /** The page's primary heading (rendered as h1). Required. */
  title: string
  /** Optional supporting text rendered below the title. */
  description?: string
  /** Extra classes on the outer wrapper. */
  className?: string
}

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <div className={cn('border-b border-border', className)}>
      <Container className="pb-12 pt-8">
        {eyebrow && (
          <Label className="mb-4 block text-accent">{eyebrow}</Label>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </Container>
    </div>
  )
}

/**
 * CaseStudyCta — closing call-to-action for the case study page.
 *
 * Three actions ordered by typical reader intent after reading a case study:
 *   1. View all work (explore more projects)
 *   2. Contact (start a conversation)
 *   3. Read engineering notes (shows process thinking)
 */
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'

export function CaseStudyCta() {
  return (
    <section
      aria-labelledby="case-study-cta-heading"
      className="relative overflow-hidden bg-surface py-24 sm:py-32"
    >
      {/* Subtle radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Keep exploring
        </p>

        <h2
          id="case-study-cta-heading"
          className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          Curious about what else I'm building?
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
          More projects are in progress. If you want to discuss the architecture
          or explore working together, I'd love to connect.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to={ROUTES.WORK}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')}
          >
            <ArrowLeft size={16} aria-hidden />
            All projects
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'gap-2')}
          >
            <Mail size={16} aria-hidden />
            Get in touch
          </Link>

          <Link
            to={ROUTES.WRITING}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'gap-2')}
          >
            <Pencil size={16} aria-hidden />
            Engineering notes
          </Link>
        </div>
      </Container>
    </section>
  )
}

/**
 * EngineeringCta — §12: closing call-to-action for the Engineering page.
 *
 * Three actions in priority order after reading the engineering page:
 *   1. View Projects — see the engineering in action
 *   2. Get in touch — start a conversation
 *   3. Read Writing — engineering notes and process thinking
 */
import { Link } from 'react-router-dom'
import { FolderOpen, Mail, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'

export function EngineeringCta() {
  return (
    <section
      aria-labelledby="engineering-cta-heading"
      className="relative overflow-hidden bg-surface py-24 sm:py-32"
    >
      {/* Radial accent decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Ready to build
        </p>

        <h2
          id="engineering-cta-heading"
          className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          Want to see this thinking applied to real systems?
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
          The Projects section shows where these patterns are applied. If you want to discuss
          architecture or explore working together, I'd like to hear from you.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to={ROUTES.WORK}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'gap-2')}
          >
            <FolderOpen size={16} aria-hidden />
            View projects
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')}
          >
            <Mail size={16} aria-hidden />
            Get in touch
          </Link>

          <Link
            to={ROUTES.WRITING}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'gap-2')}
          >
            <Pencil size={16} aria-hidden />
            Read writing
          </Link>
        </div>
      </Container>
    </section>
  )
}

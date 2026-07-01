/**
 * WritingCta — §7: closing call-to-action for the /writing page.
 *
 * Three actions ordered by intent after exploring the writing hub:
 *   1. View Projects — see the engineering in practice
 *   2. Engineering page — understand the philosophy behind the work
 *   3. Get in touch — start a conversation
 */
import { Link } from 'react-router-dom'
import { FolderOpen, Cpu, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'

export function WritingCta() {
  return (
    <section
      aria-labelledby="writing-cta-heading"
      className="relative overflow-hidden bg-surface py-24 sm:py-32"
    >
      {/* Radial accent decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Go deeper
        </p>

        <h2
          id="writing-cta-heading"
          className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          Want to see the systems behind the writing?
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
          The Projects section shows the architecture and engineering decisions these articles
          document. The Engineering page explains how I think about building backend systems.
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
            to={ROUTES.ENGINEERING}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')}
          >
            <Cpu size={16} aria-hidden />
            Engineering page
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'gap-2')}
          >
            <Mail size={16} aria-hidden />
            Get in touch
          </Link>
        </div>
      </Container>
    </section>
  )
}

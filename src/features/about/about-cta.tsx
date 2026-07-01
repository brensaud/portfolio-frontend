/**
 * AboutCtaSection — closing call-to-action at the bottom of the About page.
 *
 * Three actions ordered by likely visitor intent from the About page:
 *   1. View Projects  — see the actual engineering work
 *   2. Read Notes     — read the engineering articles (Writing page)
 *   3. Contact Me     — start a conversation
 *
 * Design mirrors the FinalCtaSection from the homepage for consistency,
 * but uses different supporting copy contextualised to the About narrative.
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutCtaSection() {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Subtle radial accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        {/* Label */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          What's next
        </p>

        {/* Heading */}
        <h2
          id="about-cta-heading"
          className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          See the work, read the thinking.
        </h2>

        {/* Supporting text */}
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
          The projects show the engineering. The articles show the thinking behind it.
          If either resonates, I would like to hear from you.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to={ROUTES.WORK}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
          >
            View Projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <Link
            to={ROUTES.WRITING}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
          >
            <Pencil size={16} aria-hidden="true" />
            Read Engineering Notes
          </Link>

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
          >
            <Mail size={16} aria-hidden="true" />
            Contact Me
          </Link>
        </div>
      </Container>
    </section>
  )
}

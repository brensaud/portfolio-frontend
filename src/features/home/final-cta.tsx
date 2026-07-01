/**
 * FinalCtaSection — closing call-to-action at the bottom of the homepage.
 *
 * Three actions, ordered by most common visitor intent:
 *   1. View Projects — engineers and hiring managers want to see the work
 *   2. Download Resume — recruiters want the PDF immediately
 *   3. Contact Me — decision-makers want to start a conversation
 *
 * Design: uses a subtle accent-tinted background to visually close the page
 * before the footer. The background uses CSS variables so it adapts to theme.
 *
 * Accessibility:
 *   - Section has an aria-labelledby heading
 *   - Download link has a clear aria-label indicating file format
 *   - All links have keyboard focus styles from buttonVariants
 */
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'

// ─── Component ────────────────────────────────────────────────────────────────

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Subtle accent background tint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        {/* Label */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Get in touch
        </p>

        {/* Heading */}
        <h2
          id="final-cta-heading"
          className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          Ready to build something great together?
        </h2>

        {/* Supporting text */}
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
          I am open to senior backend and AI engineering roles. If you are building something
          technically ambitious and care about engineering quality, I would like to hear about it.
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

          <a
            href="/resume.pdf"
            download
            aria-label="Download resume as PDF"
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
          >
            <Download size={16} aria-hidden="true" />
            Download Resume
          </a>

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

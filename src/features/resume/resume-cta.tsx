/**
 * ResumeCta — §9: download and contact CTA for the resume page.
 *
 * Mirrors the hero CTAs at the bottom of the page for convenience.
 * Download button is disabled with accessible aria-disabled when
 * the PDF is not yet available.
 */
import { Link } from 'react-router-dom'
import { Download, FolderOpen, Mail } from 'lucide-react'
import { RESUME_PDF_URL } from '@/data/resume'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'

export function ResumeCta() {
  const isPdfAvailable = RESUME_PDF_URL !== '#'

  return (
    <section
      aria-labelledby="resume-cta-heading"
      className="relative overflow-hidden bg-surface py-24 sm:py-32"
    >
      {/* Radial accent decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Get in touch
        </p>

        <h2
          id="resume-cta-heading"
          className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
        >
          Interested in working together?
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-secondary">
          I'm actively looking for backend engineering opportunities where I can apply
          Python, FastAPI, and AI architecture skills to production systems.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isPdfAvailable ? (
            <a
              href={RESUME_PDF_URL}
              download
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'gap-2')}
              aria-label="Download resume as PDF"
            >
              <Download size={16} aria-hidden />
              Download Resume
            </a>
          ) : (
            <span
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'cursor-not-allowed gap-2 opacity-50',
              )}
              aria-disabled="true"
              aria-label="Resume PDF not yet available"
            >
              <Download size={16} aria-hidden />
              Download Resume
            </span>
          )}

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: isPdfAvailable ? 'secondary' : 'primary' , size: 'lg' }), 'gap-2')}
          >
            <Mail size={16} aria-hidden />
            Contact Me
          </Link>

          <Link
            to={ROUTES.WORK}
            className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'gap-2')}
          >
            <FolderOpen size={16} aria-hidden />
            View Projects
          </Link>
        </div>
      </Container>
    </section>
  )
}

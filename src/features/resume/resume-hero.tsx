/**
 * ResumeHero — page header for the /resume route.
 *
 * Prominently shows role, summary line, and three CTAs:
 *   1. Download Resume (PDF — placeholder until file is available)
 *   2. Contact Me
 *   3. View Projects
 *
 * The PDF download link uses RESUME_PDF_URL from resume.ts.
 * Replace the '#' value with '/resume.pdf' once the file is in /public.
 */
import { Link } from 'react-router-dom'
import { Download, Mail, FolderOpen } from 'lucide-react'
import { RESUME_PDF_URL } from '@/data/resume'
import { Container } from '@/components/ui/container'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { SITE_META } from '@/constants/site'
import { cn } from '@/lib/utils'

export function ResumeHero() {
  const isPdfAvailable = RESUME_PDF_URL !== '#'

  return (
    <div className="border-b border-border">
      <Container className="pb-14 pt-10">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Resume
        </p>

        {/* Name + role */}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          {SITE_META.name}
        </h1>
        <p className="mt-2 text-xl font-medium text-accent sm:text-2xl">
          {SITE_META.role}
        </p>

        {/* Positioning tagline */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Building scalable Python/FastAPI backends and AI SaaS products with
          production-grade architecture, clean layered design, and strong testing discipline.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
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
              title="PDF resume not yet available"
              aria-label="Resume PDF not yet available"
            >
              <Download size={16} aria-hidden />
              Download Resume
            </span>
          )}

          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')}
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

        {!isPdfAvailable && (
          <p className="mt-4 text-xs text-text-tertiary" role="note">
            PDF resume coming soon — contact me directly for a copy in the meantime.
          </p>
        )}
      </Container>
    </div>
  )
}

/**
 * AboutPreviewSection — a concise, honest introduction on the homepage.
 *
 * Purpose: give recruiters and engineers a human context for the work.
 * Links to the full About page for more depth.
 *
 * Content rules (from Product Strategy):
 *   - No invented metrics or claims
 *   - Honest and professional
 *   - Forward-looking without exaggerating current seniority
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ROUTES } from '@/constants/routes'

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutPreviewSection() {
  return (
    <Section aria-labelledby="about-preview-heading">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Label */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            About
          </p>

          {/* Heading */}
          <h2
            id="about-preview-heading"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Engineer. Builder. Learner.
          </h2>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-text-secondary">
              I am a Python Backend Engineer who enjoys building systems that are reliable,
              maintainable, and easy for other engineers to work with. My focus is on FastAPI,
              PostgreSQL, and the full lifecycle of a backend service — from schema design to
              production deployment.
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              Lately, I have been building AI-powered SaaS products, working at the intersection
              of LLM tooling, vector search, and production backend infrastructure. I want to work
              on ambitious technical problems where good engineering genuinely matters.
            </p>
          </div>

          {/* Link to full About */}
          <div className="mt-8">
            <Link
              to={ROUTES.ABOUT}
              className={cn(
                'inline-flex items-center gap-1.5 text-sm font-medium text-accent',
                'transition-colors duration-[--duration-fast] hover:text-accent-hover',
                'focus-visible:rounded-sm focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'focus-visible:ring-offset-background',
              )}
            >
              More about me
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

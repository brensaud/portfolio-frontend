/**
 * HeroSection — the primary landing viewport of the homepage.
 *
 * Layout:
 *   - Availability badge (driven by AVAILABILITY_STATUS constant)
 *   - Role label
 *   - Headline (h1)
 *   - Supporting description
 *   - Primary + Secondary CTA
 *   - Core tech stack badges
 *
 * Visual:
 *   - Subtle CSS grid pattern (uses --color-border — theme-aware)
 *   - Radial gradient from accent-subtle (indigo tint, dark + light aware)
 *   - No JavaScript-driven animations to ensure full reduced-motion compliance
 */
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { ROUTES } from '@/constants/routes'
import { AVAILABILITY_STATUS, SITE_META, type AvailabilityStatus } from '@/constants/site'

// ─── Data ─────────────────────────────────────────────────────────────────────

const AVAILABILITY_COPY: Record<
  AvailabilityStatus,
  { label: string; variant: 'success' | 'warning' | 'error'; dotClass: string }
> = {
  available:   { label: 'Available for opportunities', variant: 'success', dotClass: 'bg-success' },
  limited:     { label: 'Limited availability',        variant: 'warning', dotClass: 'bg-warning' },
  unavailable: { label: 'Not currently available',     variant: 'error',   dotClass: 'bg-error'   },
}

const CORE_STACK = [
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Docker',
  'AI / RAG',
] as const

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection() {
  const { label, variant, dotClass } = AVAILABILITY_COPY[AVAILABILITY_STATUS]

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-36"
    >
      {/* Engineering grid — aria-hidden: purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40"
      />
      {/* Radial gradient to fade the grid and add accent glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,var(--color-accent-subtle),transparent)]"
      />

      <Container className="relative">
        {/* Availability indicator */}
        <div className="mb-6">
          <Badge variant={variant}>
            <span
              className={cn('inline-block h-1.5 w-1.5 rounded-full', dotClass)}
              aria-hidden="true"
            />
            {label}
          </Badge>
        </div>

        {/* Role label */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          {SITE_META.role}
        </p>

        {/* Main headline */}
        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem]"
        >
          I build scalable Python backends{' '}
          <span className="text-accent">and AI-powered</span>{' '}
          SaaS products.
        </h1>

        {/* Supporting description */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Focused on FastAPI, PostgreSQL, and production-grade systems designed to
          handle real workloads. I care about clean architecture, meaningful tests,
          and software built to last.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to={ROUTES.WORK}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
          >
            View Projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
          >
            Contact Me
          </Link>
        </div>

        {/* Core tech stack */}
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Core stack
          </span>
          <div
            className="flex flex-wrap items-center gap-2"
            role="list"
            aria-label="Core technologies"
          >
            {CORE_STACK.map(tech => (
              <span key={tech} role="listitem">
                <Badge variant="default" size="sm">
                  {tech}
                </Badge>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

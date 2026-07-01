/**
 * ContactHero — page header for the /contact route.
 *
 * Shows availability status prominently — this is the first thing
 * a recruiter or hiring manager should see on this page.
 */
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { AVAILABILITY_STATUS } from '@/constants/site'

const AVAILABILITY_CONFIG = {
  available: {
    variant:     'success' as const,
    dot:         'bg-success',
    label:       'Available for opportunities',
    description: 'Currently open to backend engineering roles and freelance projects.',
  },
  limited: {
    variant:     'warning' as const,
    dot:         'bg-warning',
    label:       'Limited availability',
    description: 'Available for select opportunities — reach out to discuss.',
  },
  unavailable: {
    variant:     'default' as const,
    dot:         'bg-text-tertiary',
    label:       'Not currently available',
    description: 'Not taking new opportunities right now, but happy to connect.',
  },
}

export function ContactHero() {
  const config = AVAILABILITY_CONFIG[AVAILABILITY_STATUS]

  return (
    <div className="border-b border-border">
      <Container className="pb-14 pt-10">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Contact
        </p>

        {/* Headline */}
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Let's talk about building something{' '}
          <span className="text-accent">production-grade</span>.
        </h1>

        {/* Supporting copy */}
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
          Whether you're hiring for a backend role, exploring collaboration,
          or want to discuss Python, FastAPI, or AI architecture — I'd like
          to hear from you.
        </p>

        {/* Availability badge */}
        <div className="mt-7 flex items-center gap-3">
          <Badge variant={config.variant} size="md">
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden />
            {config.label}
          </Badge>
          <span className="text-sm text-text-secondary">{config.description}</span>
        </div>
      </Container>
    </div>
  )
}

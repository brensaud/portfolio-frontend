/**
 * ProjectsHeroSection — page header for the Projects / Work page.
 *
 * Tone: engineering-focused, honest about the portfolio's purpose.
 * These are case studies and learning projects — not production deployments
 * with invented user metrics.
 */
import { Container } from '@/components/ui/container'

export function ProjectsHeroSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <Container>
        {/* Eyebrow */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Work
        </p>

        {/* Headline */}
        <h1
          id="projects-heading"
          className="max-w-3xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          Selected systems and product experiments.
        </h1>

        {/* Supporting copy */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Built to sharpen backend architecture, AI integration, and production
          engineering skills. Each project has a specific engineering focus —
          not just "I built this," but why and how.
        </p>
      </Container>
    </section>
  )
}

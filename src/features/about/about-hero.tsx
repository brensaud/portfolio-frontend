/**
 * AboutHeroSection — page header for the About page.
 *
 * More personal than the standard PageHero: includes a positioning
 * statement, a two-sentence intro, and a subtle border-bottom visual anchor.
 *
 * Does NOT repeat the availability badge (already prominent on the homepage).
 * Keeps the focus on the narrative, not the status.
 */
import { Container } from '@/components/ui/container'

export function AboutHeroSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <Container>
        {/* Eyebrow */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          About
        </p>

        {/* Main headline */}
        <h1
          id="about-heading"
          className="max-w-3xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          Building deep expertise in backend systems and AI-powered products.
        </h1>

        {/* Supporting description */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          I am a Python Backend Engineer focused on FastAPI, scalable APIs, and production-grade
          software. My goal is senior-level backend engineering — building systems that are
          reliable, maintainable, and genuinely useful.
        </p>

        {/* Subtle divider quote — a pull-quote that sets the tone */}
        <blockquote className="mt-8 border-l-2 border-accent pl-5">
          <p className="text-base italic leading-relaxed text-text-secondary">
            "Backend engineering is where complexity lives. I want to be the engineer who
            handles it well."
          </p>
        </blockquote>
      </Container>
    </section>
  )
}

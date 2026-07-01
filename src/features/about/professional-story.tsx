/**
 * ProfessionalStorySection — narrative prose explaining who I am, why backend,
 * and where I am headed professionally.
 *
 * Content rules:
 *   - Honest and ambitious — no invented experience or exaggerated claims
 *   - Forward-looking without overstating current seniority
 *   - Professional tone, not conversational fluff
 *
 * Layout: single-column, prose-width constrained (max-w-2xl), clearly
 * separated paragraphs. A pull-stat or highlight block at the end gives
 * a visual anchor without requiring fake metrics.
 */
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfessionalStorySection() {
  return (
    <Section aria-labelledby="story-heading">
      <Container>
        <div className="max-w-2xl">
          {/* Section label */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            My Story
          </p>

          {/* Section heading */}
          <h2
            id="story-heading"
            className="mb-8 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Why backend engineering
          </h2>

          {/* Prose */}
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-text-secondary">
              Backend engineering resonates with me because the real challenge lives in the
              systems beneath the surface — not just making something work, but making it
              reliable under load, maintainable by a team, and honest with its users.
              I am drawn to the discipline that designing correct systems requires.
            </p>

            <p className="text-base leading-relaxed text-text-secondary">
              I chose Python and FastAPI because they reflect how I think about software:
              readable, explicit, and built for iteration. FastAPI's async-first design,
              its Pydantic-powered contracts, and its alignment with modern API standards
              make it the right tool for the systems I want to build — especially
              AI-powered products where the backend needs to handle heavy async workloads
              without trading away code clarity.
            </p>

            <p className="text-base leading-relaxed text-text-secondary">
              I care about production quality as a first principle, not an afterthought.
              Tests are part of the design. Schema migrations are planned carefully.
              Observability is built in. These are not extras — they are what separates
              software that ships once from software that runs reliably for years.
            </p>

            <p className="text-base leading-relaxed text-text-secondary">
              My long-term goal is senior-level backend engineering: taking full ownership
              of services from design to production, contributing to architectural
              decisions, and working on technically ambitious products where the backend
              engineering genuinely determines whether the product succeeds.
            </p>
          </div>

          {/* Highlighted focus statement */}
          <div className="mt-10 rounded-lg border border-accent/20 bg-accent-subtle px-6 py-5">
            <p className="text-sm font-medium leading-relaxed text-text-primary">
              Currently focused on FastAPI production systems, AI/RAG backends, and building
              the depth of engineering experience that senior roles require.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

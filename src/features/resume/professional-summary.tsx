/**
 * ProfessionalSummary — §2: written professional summary.
 *
 * Three paragraphs covering engineering focus, current flagship project,
 * and core philosophy. Honest about current stage without underselling
 * the depth of the work being done.
 */
import { PROFESSIONAL_SUMMARY } from '@/data/resume'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function ProfessionalSummary() {
  return (
    <Section
      id="summary"
      aria-labelledby="summary-heading"
      className="bg-surface"
    >
      <Container>
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Professional summary
          </p>
          <h2
            id="summary-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            {PROFESSIONAL_SUMMARY.headline}
          </h2>
        </div>

        <div className="max-w-3xl space-y-4">
          {PROFESSIONAL_SUMMARY.paragraphs.map((para, idx) => (
            <p key={idx} className="text-base leading-relaxed text-text-secondary">
              {para}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  )
}

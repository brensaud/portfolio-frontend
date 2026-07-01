/**
 * ResumeCredentials — §6 Education + §7 Certifications / Learning.
 *
 * Combined in one file because they are closely related and both short.
 * Honest framing: self-directed education, no invented institutions
 * or completed certifications. Structure is easy to extend later.
 */
import { EDUCATION, LEARNING_ITEMS } from '@/data/resume'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'

const STATUS_VARIANT = {
  'Completed':      'success',
  'In progress':    'warning',
  'Planned':        'default',
  'Self-directed':  'accent',
} as const

export function ResumeCredentials() {
  return (
    <Section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="bg-surface"
    >
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Education &amp; learning
          </p>
          <h2
            id="credentials-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Continuous learning
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              Education
            </h3>
            <ul className="space-y-4" aria-label="Education entries">
              {EDUCATION.map(entry => (
                <li
                  key={entry.institution}
                  className="rounded-xl border border-border bg-surface-raised p-5"
                >
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-text-primary">{entry.institution}</p>
                    <Badge variant={STATUS_VARIANT[entry.status]} size="sm">
                      {entry.status}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-text-secondary">{entry.degree}</p>
                  {entry.notes && (
                    <p className="text-xs leading-relaxed text-text-tertiary">{entry.notes}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Learning items */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              Certifications &amp; self-directed learning
            </h3>
            <ul className="space-y-3" aria-label="Learning and certification items">
              {LEARNING_ITEMS.map(item => (
                <li
                  key={item.title}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface-raised px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">{item.title}</p>
                    <p className="mt-0.5 text-xs text-text-tertiary">{item.provider}</p>
                  </div>
                  <Badge
                    variant={STATUS_VARIANT[item.status]}
                    size="sm"
                    className="shrink-0"
                  >
                    {item.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

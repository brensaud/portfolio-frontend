/**
 * BeyondCodeSection — personal growth, communication, and non-technical depth.
 *
 * Purpose: gives human context beyond the technical profile. Short by design —
 * this section should not compete with the engineering content above it.
 *
 * Content rules:
 *   - No invented hobbies, made-up achievements, or forced personality traits
 *   - Honest about language development as a professional asset
 *   - Frames continuous learning as a deliberate practice, not a cliché
 *
 * Visual: simple horizontal list of short items, each with a brief label and
 * description. Muted background (bg-surface) to visually close the page's
 * main content before the final CTA.
 */
import { BookMarked, Globe, PenLine, Sprout, Users } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface PersonalItem {
  icon: LucideIcon
  label: string
  description: string
}

const PERSONAL_ITEMS: PersonalItem[] = [
  {
    icon: BookMarked,
    label: 'Deep reading',
    description:
      'Technical books — not just documentation. Reading deeply on distributed systems, database internals, and software design builds the mental models that experience alone is slow to form.',
  },
  {
    icon: PenLine,
    label: 'Writing to think',
    description:
      'I write technical notes and documentation to clarify my own understanding. If I cannot explain something clearly, I do not understand it well enough yet.',
  },
  {
    icon: Users,
    label: 'Teaching and explaining',
    description:
      'Breaking down technical concepts to peers and non-technical stakeholders. Clear communication is a backend engineer skill, not a "soft skill" bonus.',
  },
  {
    icon: Sprout,
    label: 'Long-term projects',
    description:
      'I prefer projects that compound in value over time over quick experiments. InterviewPilot AI is a real product I intend to grow, not a portfolio piece to archive.',
  },
  {
    icon: Globe,
    label: 'Professional language development',
    description:
      'Actively improving my English for professional contexts — writing, presenting, and communicating in international engineering environments. Precision in communication matters as much as precision in code.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function BeyondCodeSection() {
  return (
    <Section
      aria-labelledby="beyond-code-heading"
      className="bg-surface"
    >
      <Container>
        {/* Section header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Beyond the Code
          </p>
          <h2
            id="beyond-code-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            How I grow
          </h2>
        </div>

        {/* Items */}
        <ul
          role="list"
          className="divide-y divide-border"
          aria-label="Personal growth practices"
        >
          {PERSONAL_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <li
                key={item.label}
                className="flex gap-4 py-5 first:pt-0 last:pb-0"
              >
                {/* Icon */}
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface-raised text-text-tertiary"
                  aria-hidden="true"
                >
                  <Icon size={16} aria-hidden={true} />
                </div>

                {/* Text */}
                <div>
                  <p className="mb-1 text-sm font-semibold text-text-primary">
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

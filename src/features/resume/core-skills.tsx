/**
 * CoreSkills — §3: grouped technology skill display.
 *
 * Seven groups rendered as compact labelled pill clusters.
 * No proficiency bars or ratings — those convey false precision.
 * The skill list itself is the signal.
 */
import { SKILL_GROUPS } from '@/data/resume'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'

export function CoreSkills() {
  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Core skills
          </p>
          <h2
            id="skills-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Technologies and tools
          </h2>
        </div>

        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Skill groups"
        >
          {SKILL_GROUPS.map(group => (
            <div
              key={group.name}
              role="listitem"
              className="rounded-xl border border-border bg-surface p-4"
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-1.5" aria-label={`${group.name} skills`}>
                {group.skills.map(skill => (
                  <li key={skill}>
                    <span className="rounded-md border border-border bg-surface-raised px-2.5 py-1 text-xs font-medium text-text-secondary">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

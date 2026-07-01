/**
 * CaseStudyArchitecture — sections 4–8 of the case study page.
 *
 *   §4  System Architecture  — component grid (the 30,000-foot view)
 *   §5  Backend Architecture — layer descriptions
 *   §6  AI Architecture      — pipeline and provider abstraction
 *   §7  Database Design      — entity cards
 *   §8  API Design           — endpoint groups
 */
import { type CaseStudy, type HttpMethod } from '@/data/case-studies'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

// ─── Shared section heading ───────────────────────────────────────────────────

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  id: string
}

function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
        {eyebrow}
      </p>
      <h2 id={id} className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  )
}

// ─── §4 System Architecture ───────────────────────────────────────────────────

interface SystemArchitectureProps {
  systemArchitecture: CaseStudy['systemArchitecture']
}

function SystemArchitecture({ systemArchitecture }: SystemArchitectureProps) {
  return (
    <Section id="architecture" aria-labelledby="architecture-heading">
      <Container>
        <SectionHeading
          eyebrow="System architecture"
          title="How the system is structured"
          description={systemArchitecture.description}
          id="architecture-heading"
        />
        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="System architecture components"
        >
          {systemArchitecture.components.map(component => (
            <div
              key={component.layer}
              role="listitem"
              className="rounded-xl border border-border bg-surface p-5"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {component.layer}
              </p>
              <p className="mb-2 text-sm font-semibold text-text-primary">
                {component.tech}
              </p>
              <p className="text-xs leading-relaxed text-text-secondary">
                {component.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §5 Backend Architecture ──────────────────────────────────────────────────

interface BackendArchitectureProps {
  backendArchitecture: CaseStudy['backendArchitecture']
}

function BackendArchitecture({ backendArchitecture }: BackendArchitectureProps) {
  return (
    <Section id="backend" aria-labelledby="backend-heading" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Backend architecture"
          title="Layered separation of concerns"
          description={backendArchitecture.description}
          id="backend-heading"
        />
        <div className="space-y-5">
          {backendArchitecture.layers.map((layer, idx) => (
            <div
              key={layer.name}
              className="rounded-xl border border-border bg-surface-raised p-6"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-sm font-bold text-accent"
                    aria-hidden
                  >
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-text-primary">{layer.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5" aria-label={`Technologies for ${layer.name}`}>
                  {layer.tech.map(t => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-surface px-2 py-0.5 text-xs text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {layer.description}
              </p>
              <ul className="space-y-1.5" aria-label={`Responsibilities of ${layer.name}`}>
                {layer.responsibilities.map(r => (
                  <li key={r} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {r}
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

// ─── §6 AI Architecture ───────────────────────────────────────────────────────

interface AiArchitectureProps {
  aiArchitecture: CaseStudy['aiArchitecture']
}

function AiArchitecture({ aiArchitecture }: AiArchitectureProps) {
  return (
    <Section id="ai" aria-labelledby="ai-heading">
      <Container>
        <SectionHeading
          eyebrow="AI system"
          title="The evaluation pipeline"
          description={aiArchitecture.description}
          id="ai-heading"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiArchitecture.components.map(component => (
            <div
              key={component.name}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h3 className="mb-2 text-sm font-semibold text-text-primary">
                {component.name}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {component.description}
              </p>
            </div>
          ))}
        </div>

        {/* Safety notes */}
        <div
          className="mt-8 rounded-xl border border-accent/20 bg-accent-subtle p-6"
          aria-labelledby="ai-safety-heading"
        >
          <h3
            id="ai-safety-heading"
            className="mb-4 text-sm font-semibold text-accent"
          >
            Security &amp; reliability notes
          </h3>
          <ul className="space-y-2">
            {aiArchitecture.safetyNotes.map(note => (
              <li key={note} className="flex items-start gap-2.5 text-sm">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                <span className="text-text-secondary">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

// ─── §7 Database Design ───────────────────────────────────────────────────────

interface DatabaseDesignProps {
  databaseDesign: CaseStudy['databaseDesign']
}

function DatabaseDesign({ databaseDesign }: DatabaseDesignProps) {
  return (
    <Section id="database" aria-labelledby="database-heading" className="bg-surface">
      <Container>
        <SectionHeading
          eyebrow="Database design"
          title="Data model"
          description={databaseDesign.description}
          id="database-heading"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {databaseDesign.entities.map(entity => (
            <div
              key={entity.name}
              className="rounded-xl border border-border bg-surface-raised p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent">
                  {entity.name}
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-text-secondary">
                {entity.description}
              </p>
              {/* Key fields */}
              <ul className="space-y-1 border-t border-border pt-3" aria-label={`Key fields of ${entity.name}`}>
                {entity.keyFields.map(field => (
                  <li key={field} className="font-mono text-xs text-text-tertiary">
                    {field}
                  </li>
                ))}
              </ul>
              {entity.relationships && (
                <p className="mt-3 border-t border-border pt-3 text-xs italic text-text-tertiary">
                  {entity.relationships}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

// ─── §8 API Design ────────────────────────────────────────────────────────────

const METHOD_STYLE: Record<HttpMethod, string> = {
  GET:    'bg-success/10 text-success',
  POST:   'bg-accent/10 text-accent',
  PUT:    'bg-warning/10 text-warning',
  PATCH:  'bg-warning/10 text-warning',
  DELETE: 'bg-error/10 text-error',
}

interface ApiDesignProps {
  apiDesign: CaseStudy['apiDesign']
}

function ApiDesign({ apiDesign }: ApiDesignProps) {
  return (
    <Section id="api" aria-labelledby="api-heading">
      <Container>
        <SectionHeading
          eyebrow="API design"
          title="REST endpoints"
          description={apiDesign.description}
          id="api-heading"
        />
        <div className="space-y-6">
          {apiDesign.endpointGroups.map(group => (
            <div
              key={group.prefix}
              className="overflow-hidden rounded-xl border border-border"
              aria-labelledby={`group-${group.prefix.replace('/', '')}`}
            >
              {/* Group header */}
              <div className="border-b border-border bg-surface px-5 py-3">
                <span
                  id={`group-${group.prefix.replace('/', '')}`}
                  className="font-mono text-sm font-semibold text-text-primary"
                >
                  {group.prefix}
                </span>
                <span className="ml-3 text-xs text-text-tertiary">
                  {group.description}
                </span>
              </div>
              {/* Endpoint rows */}
              <ul className="divide-y divide-border bg-surface-raised">
                {group.endpoints.map(endpoint => (
                  <li
                    key={`${endpoint.method}:${endpoint.path}`}
                    className="flex flex-wrap items-center gap-3 px-5 py-3"
                  >
                    <span
                      className={cn(
                        'shrink-0 rounded px-2 py-0.5 font-mono text-xs font-bold',
                        METHOD_STYLE[endpoint.method],
                      )}
                    >
                      {endpoint.method}
                    </span>
                    <code className="shrink-0 text-xs text-text-secondary">
                      {endpoint.path}
                    </code>
                    <span className="text-xs text-text-tertiary">
                      {endpoint.description}
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

// ─── Composed export ──────────────────────────────────────────────────────────

interface CaseStudyArchitectureProps {
  caseStudy: CaseStudy
}

export function CaseStudyArchitecture({ caseStudy }: CaseStudyArchitectureProps) {
  return (
    <>
      <SystemArchitecture systemArchitecture={caseStudy.systemArchitecture} />
      <BackendArchitecture backendArchitecture={caseStudy.backendArchitecture} />
      <AiArchitecture aiArchitecture={caseStudy.aiArchitecture} />
      <DatabaseDesign databaseDesign={caseStudy.databaseDesign} />
      <ApiDesign apiDesign={caseStudy.apiDesign} />
    </>
  )
}

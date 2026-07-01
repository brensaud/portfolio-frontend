/**
 * ProjectDetailPage — individual project case study at /work/:slug.
 *
 * Dynamic route: reads the `slug` URL param, looks up the matching `Project`
 * from the canonical PROJECTS registry and the matching `CaseStudy` from
 * CASE_STUDIES. Renders the full case study page for projects that have one;
 * shows a "coming soon" state for projects that do not yet have case study
 * content.
 */
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PROJECTS, STATUS_BADGE_VARIANT, type Project } from '@/data/projects'
import { CASE_STUDIES, type CaseStudy } from '@/data/case-studies'
import { CaseStudyHero } from '@/features/case-study/case-study-hero'
import { CaseStudyOverview } from '@/features/case-study/case-study-overview'
import { CaseStudyArchitecture } from '@/features/case-study/case-study-architecture'
import { CaseStudyQuality } from '@/features/case-study/case-study-quality'
import { CaseStudyCta } from '@/features/case-study/case-study-cta'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { usePageTitle } from '@/hooks/use-page-title'
import { cn } from '@/lib/utils'

// ─── Not-found state ──────────────────────────────────────────────────────────

function ProjectNotFound({ slug }: { slug: string }) {
  usePageTitle('Project not found')
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">404</p>
      <h1 className="text-2xl font-bold text-text-primary">Project not found</h1>
      <p className="max-w-sm text-sm text-text-secondary">
        No project matching{' '}
        <code className="font-mono text-text-primary">/work/{slug}</code>{' '}
        was found.
      </p>
      <Link
        to={ROUTES.WORK}
        className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'gap-1.5')}
      >
        <ArrowLeft size={14} aria-hidden />
        Back to all projects
      </Link>
    </main>
  )
}

// ─── Coming-soon state ────────────────────────────────────────────────────────

function CaseStudyComingSoonPage({ project }: { project: Project }) {
  usePageTitle(project.title)
  return (
    <main>
      <div className="border-b border-border">
        <Container className="pb-12 pt-8">
          <Link
            to={ROUTES.WORK}
            className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            aria-label="Back to all projects"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to Work
          </Link>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.categories.map(cat => (
              <Badge key={cat} variant="accent" size="sm">{cat}</Badge>
            ))}
            <Badge variant={STATUS_BADGE_VARIANT[project.status]} size="sm">
              {project.status}
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {project.subtitle}
          </p>
        </Container>
      </div>

      <section aria-labelledby="coming-soon-heading" className="py-24 text-center">
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Case study
          </p>
          <h2
            id="coming-soon-heading"
            className="mx-auto max-w-lg text-2xl font-bold text-text-primary"
          >
            Full case study coming soon
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-secondary">
            A detailed write-up of the engineering decisions, architecture, and lessons
            learned is planned for this project.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-text-tertiary">
            {project.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={ROUTES.WORK}
              className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'gap-1.5')}
            >
              <ArrowLeft size={14} aria-hidden />
              All projects
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
            >
              Get in touch
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}

// ─── Full case study ──────────────────────────────────────────────────────────

interface FullCaseStudyPageProps {
  project: Project
  caseStudy: CaseStudy
}

function FullCaseStudyPage({ project, caseStudy }: FullCaseStudyPageProps) {
  usePageTitle(project.title)
  return (
    <main>
      <CaseStudyHero project={project} caseStudy={caseStudy} />
      <CaseStudyOverview caseStudy={caseStudy} />
      <CaseStudyArchitecture caseStudy={caseStudy} />
      <CaseStudyQuality caseStudy={caseStudy} />
      <CaseStudyCta />
    </main>
  )
}

// ─── Route component ──────────────────────────────────────────────────────────

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const resolvedSlug = slug ?? ''

  const project   = PROJECTS.find(p => p.slug === resolvedSlug)
  const caseStudy = CASE_STUDIES.find(cs => cs.slug === resolvedSlug)

  if (!project) {
    return <ProjectNotFound slug={resolvedSlug} />
  }

  if (!caseStudy) {
    return <CaseStudyComingSoonPage project={project} />
  }

  return <FullCaseStudyPage project={project} caseStudy={caseStudy} />
}

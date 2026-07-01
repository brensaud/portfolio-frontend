/**
 * CaseStudyHero — project header for the /work/:slug case study page.
 *
 * Renders the project title, status, tech stack, CTAs, optional disclaimer,
 * and an "On this page" table of contents linking to section anchors.
 */
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { type Project, STATUS_BADGE_VARIANT } from '@/data/projects'
import { type CaseStudy } from '@/data/case-studies'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

interface CaseStudyHeroProps {
  project: Project
  caseStudy: CaseStudy
}

// Maps project link types to icons
const LINK_ICON: Record<string, React.ReactNode> = {
  github:     <Github size={16} aria-hidden />,
  demo:       <ExternalLink size={16} aria-hidden />,
  'case-study': <ExternalLink size={16} aria-hidden />,
  article:    <ExternalLink size={16} aria-hidden />,
}

export function CaseStudyHero({ project, caseStudy }: CaseStudyHeroProps) {
  const badgeVariant = STATUS_BADGE_VARIANT[project.status]

  return (
    <div className="border-b border-border">
      <Container className="pb-0 pt-8">

        {/* Back navigation */}
        <Link
          to={ROUTES.WORK}
          className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          aria-label="Back to all projects"
        >
          <ArrowLeft size={14} aria-hidden />
          Back to Work
        </Link>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.categories.map(cat => (
            <Badge key={cat} variant="accent" size="sm">{cat}</Badge>
          ))}
          <Badge variant={badgeVariant} size="sm">{project.status}</Badge>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {project.subtitle}
        </p>

        {/* Disclaimer */}
        {caseStudy.disclaimer && (
          <div
            className="mt-6 max-w-2xl rounded-lg border border-warning/25 bg-warning/5 px-4 py-3"
            role="note"
            aria-label="Project status disclaimer"
          >
            <p className="text-sm leading-relaxed text-warning/90">
              {caseStudy.disclaimer}
            </p>
          </div>
        )}

        {/* Tech stack */}
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'gap-1.5',
                )}
                aria-label={`${link.label} (opens in new tab)`}
              >
                {LINK_ICON[link.type]}
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* On this page — table of contents */}
        <nav
          aria-label="On this page"
          className="mt-10 overflow-x-auto border-t border-border py-4"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            On this page
          </p>
          <ol className="flex flex-wrap gap-x-1 gap-y-2">
            {caseStudy.tocSections.map((section, idx) => (
              <li key={section.id} className="flex items-center gap-1">
                <a
                  href={`#${section.id}`}
                  className="rounded px-2 py-1 text-sm text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="mr-1 text-xs text-text-tertiary">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                </a>
                {idx < caseStudy.tocSections.length - 1 && (
                  <span className="text-text-tertiary/50" aria-hidden>·</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  )
}

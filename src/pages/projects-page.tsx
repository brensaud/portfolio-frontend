/**
 * ProjectsPage — index of all portfolio projects (/work).
 *
 * Sections (in order):
 *   1. ProjectsHeroSection     — page headline and positioning
 *   2. FeaturedProjectSection  — prominent spotlight on InterviewPilot AI
 *   3. ProjectsGridSection     — filterable grid of all projects
 *   4. EngineeringProofSection — capabilities demonstrated
 *   5. ProjectsCtaSection      — case study / notes / contact CTAs
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { ProjectsHeroSection } from '@/features/projects/projects-hero'
import { FeaturedProjectSection } from '@/features/projects/featured-project'
import { ProjectsGridSection } from '@/features/projects/projects-grid'
import { EngineeringProofSection } from '@/features/projects/engineering-proof'
import { ProjectsCtaSection } from '@/features/projects/projects-cta'

export function ProjectsPage() {
  usePageTitle('Work')

  return (
    <>
      <ProjectsHeroSection />
      <FeaturedProjectSection />
      <ProjectsGridSection />
      <EngineeringProofSection />
      <ProjectsCtaSection />
    </>
  )
}

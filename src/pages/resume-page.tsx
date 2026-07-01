/**
 * ResumePage — HTML resume at /resume.
 *
 * 9 sections presenting skills, projects, and engineering direction for
 * recruiters, hiring managers, and engineering managers:
 *   §1  ResumeHero            — name, role, and three CTAs
 *   §2  ProfessionalSummary   — written engineering positioning
 *   §3  CoreSkills            — 7 grouped skill categories
 *   §4  ResumeProjects        — 4 featured portfolio projects
 *   §5  TechnicalStrengths    — 8 described strengths
 *   §6  ResumeCredentials     — education + learning items
 *   §7  PracticalExperience   — project-based engineering experience
 *   §8  ResumeCta             — download, contact, and projects CTAs
 *
 * PDF download: set RESUME_PDF_URL in src/data/resume.ts once the PDF
 * is available at /public/resume.pdf.
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { ResumeHero } from '@/features/resume/resume-hero'
import { ProfessionalSummary } from '@/features/resume/professional-summary'
import { CoreSkills } from '@/features/resume/core-skills'
import { ResumeProjects } from '@/features/resume/resume-projects'
import { TechnicalStrengths } from '@/features/resume/technical-strengths'
import { ResumeCredentials } from '@/features/resume/resume-credentials'
import { PracticalExperience } from '@/features/resume/practical-experience'
import { ResumeCta } from '@/features/resume/resume-cta'

export function ResumePage() {
  usePageTitle('Resume')
  return (
    <main>
      <ResumeHero />
      <ProfessionalSummary />
      <CoreSkills />
      <ResumeProjects />
      <TechnicalStrengths />
      <ResumeCredentials />
      <PracticalExperience />
      <ResumeCta />
    </main>
  )
}

/**
 * AboutPage — personal background, story, and values.
 *
 * Sections (in order):
 *   1. AboutHeroSection         — headline, positioning, pull-quote
 *   2. ProfessionalStorySection — why backend, Python/FastAPI, goals
 *   3. EngineeringPhilosophySection — 5 numbered engineering principles
 *   4. CurrentFocusSection      — 4 active learning/building groups
 *   5. JourneyTimelineSection   — stage-based career timeline
 *   6. WorkingStyleSection      — 7 process/collaboration practices
 *   7. BeyondCodeSection        — personal growth and communication
 *   8. AboutCtaSection          — View Projects / Read Notes / Contact
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { AboutHeroSection } from '@/features/about/about-hero'
import { ProfessionalStorySection } from '@/features/about/professional-story'
import { EngineeringPhilosophySection } from '@/features/about/engineering-philosophy'
import { CurrentFocusSection } from '@/features/about/current-focus'
import { JourneyTimelineSection } from '@/features/about/journey-timeline'
import { WorkingStyleSection } from '@/features/about/working-style'
import { BeyondCodeSection } from '@/features/about/beyond-code'
import { AboutCtaSection } from '@/features/about/about-cta'

export function AboutPage() {
  usePageTitle('About')

  return (
    <>
      <AboutHeroSection />
      <ProfessionalStorySection />
      <EngineeringPhilosophySection />
      <CurrentFocusSection />
      <JourneyTimelineSection />
      <WorkingStyleSection />
      <BeyondCodeSection />
      <AboutCtaSection />
    </>
  )
}

/**
 * HomePage — the portfolio landing page.
 *
 * Sections (in order):
 *   1. HeroSection           — headline, availability, CTAs, core stack
 *   2. CredibilityStrip      — technology breadth banner
 *   3. FeaturedProjectsSection — 3 engineering case study cards
 *   4. EngineeringFocusSection — 6 specialisation cells
 *   5. AboutPreviewSection   — brief bio + link to About page
 *   6. WritingPreviewSection — upcoming engineering articles
 *   7. FinalCtaSection       — View Projects / Download Resume / Contact
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { HeroSection } from '@/features/home/hero-section'
import { CredibilityStrip } from '@/features/home/credibility-strip'
import { FeaturedProjectsSection } from '@/features/home/featured-projects'
import { EngineeringFocusSection } from '@/features/home/engineering-focus'
import { AboutPreviewSection } from '@/features/home/about-preview'
import { WritingPreviewSection } from '@/features/home/writing-preview'
import { FinalCtaSection } from '@/features/home/final-cta'

export function HomePage() {
  usePageTitle() // No argument → renders just the site name in the tab

  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <FeaturedProjectsSection />
      <EngineeringFocusSection />
      <AboutPreviewSection />
      <WritingPreviewSection />
      <FinalCtaSection />
    </>
  )
}

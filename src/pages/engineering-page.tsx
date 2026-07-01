/**
 * EngineeringPage — engineering philosophy and system design showcase (/engineering).
 *
 * 12 sections documenting how I approach production-grade Python/FastAPI/AI systems:
 *   §1  Hero              — positioning and headline
 *   §2  Principles        — eight core engineering principles
 *   §3  Architecture      — eight-layer backend architecture visual
 *   §4  API Design        — REST design philosophy
 *   §5  Database          — data modeling approach
 *   §6  AI System Design  — LLM integration patterns
 *   §7  Security          — security and reliability approach
 *   §8  Testing           — layered test strategy
 *   §9  DevOps            — deployment mindset
 *   §10 Stack             — grouped technology overview
 *   §11 Applied Examples  — engineering thinking applied to projects
 *   §12 CTA               — next actions
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { EngineeringHero } from '@/features/engineering/engineering-hero'
import { EngineeringPrinciples } from '@/features/engineering/engineering-principles'
import { BackendArchitecture } from '@/features/engineering/backend-architecture'
import { EngineeringPractices } from '@/features/engineering/engineering-practices'
import { EngineeringQuality } from '@/features/engineering/engineering-quality'
import { EngineeringStack } from '@/features/engineering/engineering-stack'
import { AppliedExamples } from '@/features/engineering/applied-examples'
import { EngineeringCta } from '@/features/engineering/engineering-cta'

export function EngineeringPage() {
  usePageTitle('Engineering')
  return (
    <main>
      <EngineeringHero />
      <EngineeringPrinciples />
      <BackendArchitecture />
      <EngineeringPractices />
      <EngineeringQuality />
      <EngineeringStack />
      <AppliedExamples />
      <EngineeringCta />
    </main>
  )
}

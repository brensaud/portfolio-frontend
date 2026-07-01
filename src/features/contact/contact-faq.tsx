/**
 * ContactFaq — collapsible FAQ section for the /contact route.
 *
 * Uses native <details>/<summary> for zero-JS accordion behaviour.
 * Each item is independently expandable — no mutual exclusion — which
 * is the most accessible pattern (no JS state, keyboard natively supported,
 * screen readers announce expanded/collapsed state automatically).
 *
 * Data is co-located here (no separate data file needed — FAQ content
 * is entirely presentation-layer concern of the contact page).
 */
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { ChevronDown } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string
  answer:   string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What kinds of projects do you enjoy most?',
    answer:
      'I enjoy building production-grade backend systems where performance, reliability, and maintainability actually matter — things like API platforms, AI-integrated services, and data-intensive applications. I find the most satisfaction in work where thoughtful architecture directly affects the product.',
  },
  {
    question: 'What are your preferred technologies?',
    answer:
      'Python and FastAPI for backend services, PostgreSQL and Redis for data persistence and caching, Docker for containerisation, and async patterns throughout. On the AI side I work with LangChain, OpenAI APIs, and vector databases. I pick tools that are mature, well-understood, and right for the problem — not whatever is trending.',
  },
  {
    question: 'What types of roles or engagements are you open to?',
    answer:
      'Full-time backend or full-stack engineering roles, AI SaaS collaborations where I can own backend architecture, and technical consulting engagements focused on Python APIs, performance, or AI integration. I am not looking for frontend-only or infrastructure-only roles.',
  },
  {
    question: 'How do you prefer to collaborate?',
    answer:
      'Asynchronous-first with clear written communication. I produce detailed documentation and prefer PRs with thorough descriptions. I am comfortable working independently or pairing closely depending on the team\'s needs. Remote works well for me.',
  },
  {
    question: 'What is your typical response time?',
    answer:
      'I respond to emails and messages within 48 hours on weekdays. For urgent hiring inquiries, mentioning that in the subject line helps me prioritise.',
  },
  {
    question: 'Are you open to junior-friendly or mentoring-focused teams?',
    answer:
      'Yes. I enjoy documenting decisions, writing readable code with clear intent, and doing thorough code reviews. Teams that care about engineering craft — regardless of seniority distribution — are a good fit.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function ContactFaq() {
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <Container>
        {/* Section header */}
        <div className="mb-10 border-b border-border pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-text-primary"
          >
            Common questions
          </h2>
          <p className="mt-3 max-w-xl text-base text-text-secondary">
            Answers to what recruiters, hiring managers, and collaborators most
            often ask before reaching out.
          </p>
        </div>

        {/* Accordion list */}
        <dl className="divide-y divide-border">
          {FAQ_ITEMS.map(({ question, answer }) => (
            <details
              key={question}
              className="group py-5 first:pt-0 last:pb-0"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                aria-expanded={undefined /* managed natively by <details> */}
              >
                <dt className="text-sm font-semibold text-text-primary">
                  {question}
                </dt>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className="shrink-0 text-text-tertiary transition-transform duration-[--duration-base] group-open:rotate-180"
                />
              </summary>
              <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                {answer}
              </dd>
            </details>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

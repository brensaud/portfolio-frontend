/**
 * ContactPage — contact form and availability at /contact.
 *
 * Two sections:
 *   §1  ContactHero     — headline, availability status badge
 *   §2  ContactSection  — form (mailto: based) + info sidebar
 *
 * To wire up a real form endpoint:
 *   Replace the handleSubmit body in contact-section.tsx with
 *   a fetch() call to Formspree, Resend, or a custom API.
 */
import { usePageTitle } from '@/hooks/use-page-title'
import { ContactHero } from '@/features/contact/contact-hero'
import { ContactSection } from '@/features/contact/contact-section'
import { ContactFaq } from '@/features/contact/contact-faq'

export function ContactPage() {
  usePageTitle('Contact')
  return (
    <main>
      <ContactHero />
      <ContactSection />
      <ContactFaq />
    </main>
  )
}

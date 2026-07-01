/**
 * ContactSection — two-column layout with contact form and info sidebar.
 *
 * Layout:
 *   Desktop: form (left, ~60%) + sidebar (right, ~40%)
 *   Mobile:  stacked — sidebar first (availability info), then form
 *
 * Form behaviour:
 *   - Controlled inputs with per-field validation on submit
 *   - On success: constructs a mailto: link and opens the default email
 *     client with name, subject, and message pre-filled
 *   - Three form states: 'idle' | 'submitting' | 'success' | 'error'
 *   - No external service dependency — works on a purely static deploy
 *
 * To swap in a real form endpoint (Formspree, Resend, etc.):
 *   Replace the handleSubmit body with a fetch() call to your API.
 *   The state machine and field schema remain unchanged.
 *
 * Accessibility:
 *   - Every input has a visible <label> and aria-required
 *   - Errors shown with aria-describedby + aria-invalid
 *   - Success/error states announced via role="status"
 *   - Focus moves to the result message on success
 */
import { useState, useRef, type FormEvent } from 'react'
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { SITE_META } from '@/constants/site'
import { Section } from '@/components/ui/section'
import { Container } from '@/components/ui/container'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { submitContactMessage, ApiError, NetworkError } from '@/lib/contact-api'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name:    string
  email:   string
  subject: string
  message: string
}

type FormErrors = { [K in keyof FormData]?: string }
type FormState  = 'idle' | 'submitting' | 'success' | 'error'

interface SuccessInfo {
  message:      string
  reference_id: string
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim())
    errors.name = 'Name is required.'
  if (!data.email.trim())
    errors.email = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Please enter a valid email address.'
  if (!data.subject.trim())
    errors.subject = 'Subject is required.'
  if (!data.message.trim())
    errors.message = 'Message is required.'
  else if (data.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters.'
  return errors
}

// ─── Form field primitive ─────────────────────────────────────────────────────

interface FieldProps {
  id:          string
  label:       string
  error?:      string | undefined
  required?:   boolean
  children:    React.ReactElement<{ id: string; 'aria-required': boolean; 'aria-invalid': boolean; 'aria-describedby'?: string }>
}

function Field({ id, label, error, required = false, children }: FieldProps) {
  const errorId = `${id}-error`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>*</span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-xs text-error" role="alert">
          <AlertCircle size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Contact info sidebar ─────────────────────────────────────────────────────

const OPEN_TO = [
  'Backend engineering roles (Python / FastAPI)',
  'AI SaaS product engineering',
  'Technical consulting and code review',
  'Open-source collaboration',
] as const

function ContactInfo() {
  return (
    <aside aria-label="Contact information and availability">
      {/* Direct contact */}
      <div className="mb-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Direct contact
        </h2>
        <ul className="space-y-3">
          <li>
            <a
              href={`mailto:${SITE_META.email}`}
              className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
              aria-label={`Email ${SITE_META.email}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised">
                <Mail size={14} className="text-accent" aria-hidden />
              </span>
              {SITE_META.email}
            </a>
          </li>
          <li>
            <a
              href={SITE_META.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
              aria-label="GitHub profile (opens in new tab)"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised">
                <Github size={14} className="text-accent" aria-hidden />
              </span>
              GitHub
            </a>
          </li>
          <li>
            <a
              href={SITE_META.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-raised">
                <Linkedin size={14} className="text-accent" aria-hidden />
              </span>
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      {/* Response time */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Response time
        </p>
        <p className="mt-1.5 text-sm text-text-secondary">
          I typically respond within 48 hours on weekdays.
        </p>
      </div>

      {/* Open to */}
      <div>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Open to
        </h2>
        <ul className="space-y-2.5" aria-label="Types of opportunities I'm open to">
          {OPEN_TO.map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

// ─── Contact form ─────────────────────────────────────────────────────────────

const INITIAL_DATA: FormData = { name: '', email: '', subject: '', message: '' }

function ContactForm() {
  const [data,    setData   ] = useState<FormData>(INITIAL_DATA)
  const [errors,  setErrors ] = useState<FormErrors>({})
  const [state,   setState  ] = useState<FormState>('idle')
  const [success, setSuccess] = useState<SuccessInfo | null>(null)
  const [apiError, setApiError] = useState<string>('')
  const resultRef = useRef<HTMLDivElement>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
    // Clear the error for this field as the user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Move focus to the first field with an error
      const firstErrorField = Object.keys(validationErrors)[0]
      const el = document.getElementById(firstErrorField ?? '')
      el?.focus()
      return
    }

    setState('submitting')
    setApiError('')

    try {
      const result = await submitContactMessage(data)
      setSuccess({ message: result.message, reference_id: result.reference_id })
      setState('success')
      setData(INITIAL_DATA)
      setTimeout(() => resultRef.current?.focus(), 50)
    } catch (err) {
      if (err instanceof ApiError && err.isValidation) {
        // Server-side validation — show generic field error
        setApiError('Please check your input and try again.')
        setState('idle')
      } else if (err instanceof ApiError && err.isRateLimit) {
        setApiError(err.message)
        setState('idle')
      } else if (err instanceof ApiError || err instanceof NetworkError) {
        setApiError(err.message)
        setState('error')
      } else {
        setApiError('An unexpected error occurred. Please try again.')
        setState('error')
      }
      setTimeout(() => resultRef.current?.focus(), 50)
    }
  }

  // Success state
  if (state === 'success' && success) {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-success/20 bg-success/5 px-8 py-12 text-center focus-visible:outline-none"
      >
        <CheckCircle2 size={40} className="mb-4 text-success" aria-hidden />
        <h3 className="mb-2 text-lg font-bold text-text-primary">
          Message sent!
        </h3>
        <p className="mb-2 max-w-sm text-sm leading-relaxed text-text-secondary">
          {success.message}
        </p>
        <p className="mb-6 text-xs text-text-tertiary">
          Reference:{' '}
          <span className="font-mono font-medium text-text-secondary">
            {success.reference_id}
          </span>
        </p>
        <button
          onClick={() => { setState('idle'); setSuccess(null) }}
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
        >
          Send another message
        </button>
      </div>
    )
  }

  // Error state
  if (state === 'error') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="alert"
        className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-error/20 bg-error/5 px-8 py-12 text-center focus-visible:outline-none"
      >
        <AlertCircle size={40} className="mb-4 text-error" aria-hidden />
        <h3 className="mb-2 text-lg font-bold text-text-primary">Something went wrong</h3>
        <p className="mb-4 max-w-sm text-sm leading-relaxed text-text-secondary">
          {apiError || 'An unexpected error occurred.'}
        </p>
        <p className="mb-6 text-sm text-text-secondary">
          You can also email me directly at{' '}
          <a href={`mailto:${SITE_META.email}`} className="text-accent hover:underline">
            {SITE_META.email}
          </a>
          .
        </p>
        <button
          onClick={() => { setState('idle'); setApiError('') }}
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
        >
          Try again
        </button>
      </div>
    )
  }

  const isSubmitting = state === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      <div className="grid gap-5">
        {/* Name */}
        <Field id="name" label="Your name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required={true}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(
              'h-11 w-full rounded-lg border bg-surface px-4 text-sm text-text-primary placeholder:text-text-tertiary',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'disabled:cursor-not-allowed disabled:opacity-50',
              errors.name ? 'border-error' : 'border-border hover:border-accent/40',
            )}
            placeholder="Jane Smith"
          />
        </Field>

        {/* Email */}
        <Field id="email" label="Email address" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required={true}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(
              'h-11 w-full rounded-lg border bg-surface px-4 text-sm text-text-primary placeholder:text-text-tertiary',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'disabled:cursor-not-allowed disabled:opacity-50',
              errors.email ? 'border-error' : 'border-border hover:border-accent/40',
            )}
            placeholder="jane@example.com"
          />
        </Field>

        {/* Subject */}
        <Field id="subject" label="Subject" error={errors.subject} required>
          <input
            id="subject"
            name="subject"
            type="text"
            value={data.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required={true}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={cn(
              'h-11 w-full rounded-lg border bg-surface px-4 text-sm text-text-primary placeholder:text-text-tertiary',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'disabled:cursor-not-allowed disabled:opacity-50',
              errors.subject ? 'border-error' : 'border-border hover:border-accent/40',
            )}
            placeholder="Hiring inquiry / Collaboration / Technical question"
          />
        </Field>

        {/* Message */}
        <Field id="message" label="Message" error={errors.message} required>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={data.message}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required={true}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cn(
              'w-full resize-y rounded-lg border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary',
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              'disabled:cursor-not-allowed disabled:opacity-50',
              errors.message ? 'border-error' : 'border-border hover:border-accent/40',
            )}
            placeholder="Tell me what you're working on or what you're looking for..."
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonVariants({ variant: 'primary', size: 'lg' }),
            'gap-2 self-start',
          )}
          aria-label={isSubmitting ? 'Sending message…' : 'Send message'}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden />
              Send Message
            </>
          )}
        </button>

        {/* Inline rate-limit / validation banner */}
        {apiError && state === 'idle' && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-error/20 bg-error/5 px-4 py-3">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-error" aria-hidden />
            <p className="text-sm text-error">{apiError}</p>
          </div>
        )}

        <p className="text-xs text-text-tertiary">
          <span aria-hidden>*</span> Required fields.
        </p>
      </div>
    </form>
  )
}

// ─── Composed section ─────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <Section id="contact-form" aria-labelledby="contact-form-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Form (primary column) */}
          <div>
            <h2
              id="contact-form-heading"
              className="mb-8 text-xl font-bold tracking-tight text-text-primary"
            >
              Send me a message
            </h2>
            <ContactForm />
          </div>

          {/* Info sidebar */}
          <ContactInfo />
        </div>
      </Container>
    </Section>
  )
}

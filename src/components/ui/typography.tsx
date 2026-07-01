/**
 * Typography — primitive components for consistent text rendering.
 *
 * These components encode the design system's typographic scale and should be
 * used everywhere text appears in the UI. They accept `className` for
 * one-off overrides while keeping the baseline style correct by default.
 *
 * Components:
 *   Heading    — h1–h4 with appropriate size and weight per level
 *   Text       — default body paragraph (text-base, text-text-secondary)
 *   Lead       — larger intro text (text-lg, text-text-primary)
 *   Muted      — de-emphasised text (text-sm, text-text-tertiary)
 *   Label      — uppercase metadata labels (text-xs, tracking-wider)
 *   InlineCode — inline code spans with monospace + surface-raised background
 */
import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ─── Heading ──────────────────────────────────────────────────────────────────

type HeadingLevel = 1 | 2 | 3 | 4
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

const HEADING_CLASSES: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold tracking-tight text-text-primary sm:text-5xl',
  2: 'text-2xl font-bold tracking-tight text-text-primary sm:text-3xl',
  3: 'text-xl font-semibold tracking-tight text-text-primary',
  4: 'text-lg font-semibold tracking-tight text-text-primary',
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level. Controls both the rendered tag and default styles. */
  level?: HeadingLevel
  children: ReactNode
}

export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as HeadingTag
  return (
    <Tag className={cn(HEADING_CLASSES[level], className)} {...props}>
      {children}
    </Tag>
  )
}

// ─── Text ─────────────────────────────────────────────────────────────────────

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

/**
 * Default body paragraph. Use for most running prose.
 * Renders as <p> with text-base (15px) and text-text-secondary color.
 */
export function Text({ className, children, ...props }: TextProps) {
  return (
    <p className={cn('text-base leading-relaxed text-text-secondary', className)} {...props}>
      {children}
    </p>
  )
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

interface LeadProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

/**
 * Larger intro or summary text. Use once per page/section as the first
 * paragraph after a heading.
 * Renders as <p> with text-lg (19px) and text-text-primary color.
 */
export function Lead({ className, children, ...props }: LeadProps) {
  return (
    <p className={cn('text-lg leading-relaxed text-text-primary', className)} {...props}>
      {children}
    </p>
  )
}

// ─── Muted ────────────────────────────────────────────────────────────────────

interface MutedProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

/**
 * De-emphasised body text. Use for timestamps, captions, and helper text.
 * ⚠️  Only use at ≥ 14px to maintain WCAG AA contrast (text-tertiary = 3.4:1).
 */
export function Muted({ className, children, ...props }: MutedProps) {
  return (
    <p
      className={cn('text-sm leading-relaxed text-text-tertiary', className)}
      {...props}
    >
      {children}
    </p>
  )
}

// ─── Label ────────────────────────────────────────────────────────────────────

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

/**
 * Uppercase metadata label. Use for section eyebrows, badge text, and tags.
 * Renders as <span> (inline) — wrap in a <div> or <p> if you need block layout.
 */
export function Label({ className, children, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        'text-xs font-medium uppercase tracking-widest text-text-tertiary',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// ─── InlineCode ───────────────────────────────────────────────────────────────

interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

/**
 * Inline code snippet. Use for technical terms, variable names, and short
 * code fragments within prose. For multi-line code blocks, use a CodeBlock
 * component (Phase 3).
 */
export function InlineCode({ className, children, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'rounded-sm border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  )
}

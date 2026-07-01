import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names safely.
 *
 * Combines `clsx` (for conditional/array class logic) with `tailwind-merge`
 * (to resolve conflicting Tailwind utilities, e.g. `px-4 px-8` → `px-8`).
 *
 * Usage:
 *   cn('base-class', isActive && 'active-class', { 'hidden': !isVisible })
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string (YYYY-MM-DD) into a human-readable form.
 * e.g. "2025-06-01" → "June 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00`)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Estimates reading time for a block of text.
 * Assumes an average reading speed of 200 words per minute.
 *
 * Returns a human-readable string, e.g. "5 min read".
 */
export function readingTime(text: string): string {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}…`
}

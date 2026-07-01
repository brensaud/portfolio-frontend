import { describe, expect, it } from 'vitest'
import { cn, formatDate, readingTime, truncate } from '@/lib/utils'

describe('cn — className merge utility', () => {
  it('combines two class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes with an object', () => {
    expect(cn('base', { active: true, inactive: false })).toBe('base active')
  })

  it('resolves conflicting Tailwind utilities (tailwind-merge)', () => {
    // tailwind-merge keeps the last conflicting class
    expect(cn('px-4', 'px-8')).toBe('px-8')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('ignores undefined, null, and empty strings', () => {
    expect(cn('foo', undefined, null, '', 'bar')).toBe('foo bar')
  })

  it('handles arrays of class names', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })
})

describe('formatDate', () => {
  it('formats a YYYY-MM-DD string to "Month Year"', () => {
    expect(formatDate('2025-06-01')).toBe('June 2025')
  })

  it('formats January correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 2024')
  })
})

describe('readingTime', () => {
  it('returns "1 min read" for short text', () => {
    expect(readingTime('hello world')).toBe('1 min read')
  })

  it('estimates correctly at 200 words per minute', () => {
    // 200 words should be exactly 1 minute
    const text = Array.from({ length: 200 }, (_, i) => `word${i}`).join(' ')
    expect(readingTime(text)).toBe('1 min read')

    // 201 words should round up to 2 minutes
    const longText = Array.from({ length: 201 }, (_, i) => `word${i}`).join(' ')
    expect(readingTime(longText)).toBe('2 min read')
  })
})

describe('truncate', () => {
  it('returns the original string when shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('returns the original string when exactly maxLength', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  it('truncates and appends an ellipsis when over maxLength', () => {
    expect(truncate('hello world', 8)).toBe('hello w…')
  })
})

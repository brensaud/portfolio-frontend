/**
 * Stack — single-axis flex layout primitive.
 *
 * A composable alternative to writing Tailwind gap + flex classes inline.
 * Renders as a <div> by default. Pass `as` to change the element.
 *
 * @example
 *   // Vertical stack with 16px gap (default)
 *   <Stack>
 *     <Heading level={2}>Title</Heading>
 *     <Text>Body text</Text>
 *   </Stack>
 *
 *   // Horizontal row with 8px gap
 *   <Stack direction="row" gap={2} align="center">
 *     <Badge>React</Badge>
 *     <Badge>TypeScript</Badge>
 *   </Stack>
 *
 *   // Renders as <ul>
 *   <Stack as="ul" gap={3}>
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </Stack>
 */
import { createElement, type ElementType, type HTMLAttributes, type Ref } from 'react'
import { cn } from '@/lib/utils'

type GapValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24

const GAP_CLASSES: Record<GapValue, string> = {
  0:  'gap-0',
  1:  'gap-1',
  2:  'gap-2',
  3:  'gap-3',
  4:  'gap-4',
  5:  'gap-5',
  6:  'gap-6',
  8:  'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
}

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** The HTML element to render. Defaults to 'div'. */
  as?: ElementType
  /** Main axis direction. Defaults to 'col' (vertical). */
  direction?: 'col' | 'row'
  /** Tailwind gap scale value. Defaults to 4 (16px). */
  gap?: GapValue
  /** Cross-axis alignment (align-items). Defaults to 'stretch'. */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /** Main-axis justification (justify-content). */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Whether to wrap items when they overflow the main axis. */
  wrap?: boolean
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLElement>
}

const ALIGN_CLASSES: Record<NonNullable<StackProps['align']>, string> = {
  start:    'items-start',
  center:   'items-center',
  end:      'items-end',
  stretch:  'items-stretch',
  baseline: 'items-baseline',
}

const JUSTIFY_CLASSES: Record<NonNullable<StackProps['justify']>, string> = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
}

export function Stack({
  as: Tag = 'div',
  direction = 'col',
  gap = 4,
  align,
  justify,
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  return createElement(
    Tag,
    {
      className: cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        GAP_CLASSES[gap],
        align && ALIGN_CLASSES[align],
        justify && JUSTIFY_CLASSES[justify],
        wrap && 'flex-wrap',
        className,
      ),
      ...props,
    },
    children,
  )
}

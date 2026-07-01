/**
 * Grid — CSS Grid layout primitive.
 *
 * Pre-bakes the most common responsive column patterns used across the site:
 *   cols={1}  → single column (full-width, e.g. timeline)
 *   cols={2}  → 1 col mobile → 2 cols sm+ (e.g. about cards)
 *   cols={3}  → 1 col mobile → 2 cols sm → 3 cols lg (e.g. project grid)
 *   cols={4}  → 1→2→4 (e.g. stats, tech badge grids)
 *   cols="auto" → auto-fill with min 280px columns (e.g. blog cards)
 *
 * @example
 *   // 3-column project grid
 *   <Grid cols={3} gap={6}>
 *     {projects.map(p => <ProjectCard key={p.slug} {...p} />)}
 *   </Grid>
 *
 *   // Auto-fill card layout
 *   <Grid cols="auto" gap={4}>
 *     {posts.map(p => <BlogCard key={p.slug} {...p} />)}
 *   </Grid>
 */
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type GridCols = 1 | 2 | 3 | 4 | 'auto'
type GapValue = 0 | 2 | 3 | 4 | 6 | 8 | 10 | 12

const COLS_CLASSES: Record<GridCols, string> = {
  1:    'grid-cols-1',
  2:    'grid-cols-1 sm:grid-cols-2',
  3:    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4:    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
}

const GAP_CLASSES: Record<GapValue, string> = {
  0:  'gap-0',
  2:  'gap-2',
  3:  'gap-3',
  4:  'gap-4',
  6:  'gap-6',
  8:  'gap-8',
  10: 'gap-10',
  12: 'gap-12',
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Column pattern. See docs above for responsive behaviour per value. */
  cols?: GridCols
  /** Tailwind gap scale value. Defaults to 6 (24px). */
  gap?: GapValue
}

export function Grid({ cols = 3, gap = 6, className, ...props }: GridProps) {
  return (
    <div
      className={cn('grid', COLS_CLASSES[cols], GAP_CLASSES[gap], className)}
      {...props}
    />
  )
}

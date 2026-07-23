/**
 * ArticleStatusBadge — coloured pill for admin article status.
 *
 *   draft     → warning  (needs work before publishing)
 *   published → success  (live on the site)
 *   archived  → outline  (de-emphasised)
 */

import { Badge } from '@/components/ui/badge'
import { type AdminArticleStatus } from '@/lib/admin-api'

const LABEL: Record<AdminArticleStatus, string> = {
  draft:     'Draft',
  published: 'Published',
  archived:  'Archived',
}

const VARIANT = {
  draft:     'warning',
  published: 'success',
  archived:  'outline',
} as const satisfies Record<AdminArticleStatus, 'warning' | 'success' | 'outline'>

export function ArticleStatusBadge({
  status,
  className,
}: {
  status: AdminArticleStatus
  className?: string
}) {
  return (
    <Badge variant={VARIANT[status]} size="sm" className={className}>
      {LABEL[status]}
    </Badge>
  )
}

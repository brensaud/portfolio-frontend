/**
 * MessageStatusBadge — coloured pill for contact message status.
 *
 * Variant mapping:
 *   unread   → accent  (draws attention — needs action)
 *   read     → default (neutral — already seen)
 *   archived → outline (de-emphasised — dismissed)
 */

import { Badge } from '@/components/ui/badge'
import { type ContactMessageStatus } from '@/lib/admin-api'

const LABEL: Record<ContactMessageStatus, string> = {
  unread: 'Unread',
  read: 'Read',
  archived: 'Archived',
}

const VARIANT = {
  unread: 'accent',
  read: 'default',
  archived: 'outline',
} as const satisfies Record<ContactMessageStatus, 'accent' | 'default' | 'outline'>

interface MessageStatusBadgeProps {
  status: ContactMessageStatus
  className?: string
}

export function MessageStatusBadge({ status, className }: MessageStatusBadgeProps) {
  return (
    <Badge variant={VARIANT[status]} size="sm" className={className}>
      {LABEL[status]}
    </Badge>
  )
}

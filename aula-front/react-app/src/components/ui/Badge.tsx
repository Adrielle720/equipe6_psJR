// components/ui/Badge.tsx
import type { BadgeVariant } from '@/types'

interface Props {
  variant: BadgeVariant
  children: React.ReactNode
}

export default function Badge({ variant, children }: Props) {
  return <span className={`badge ${variant}`}>{children}</span>
}

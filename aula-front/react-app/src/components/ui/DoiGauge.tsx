// components/ui/DoiGauge.tsx
import type { DoiItem } from '@/types'

interface Props {
  items: DoiItem[]
}

export default function DoiGauge({ items }: Props) {
  return (
    <div className="doi-wrap">
      {items.map((d) => (
        <div key={d.geo} className="doi-item">
          <div className="doi-name" style={d.doi < 12 && !d.label ? { color: 'var(--red)' } : undefined}>
            {d.geo}{d.doi < 12 && !d.label ? ' ⚠' : ''}
          </div>
          <div className="doi-bar">
            <div
              className="doi-fill"
              style={{
                width: d.label ? '0%' : `${Math.min((d.doi / 30) * 100, 100)}%`,
                background: d.color,
              }}
            />
          </div>
          <div className="doi-val" style={{ color: d.color }}>
            {d.label ?? `${d.doi}d / 12`}
          </div>
        </div>
      ))}
    </div>
  )
}

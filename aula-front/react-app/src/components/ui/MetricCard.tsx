// components/ui/MetricCard.tsx
interface Props {
  label: string
  value: React.ReactNode
  delta?: string
  deltaType?: 'up' | 'down' | 'neutral'
  valueColor?: string
}

export default function MetricCard({ label, value, delta, deltaType = 'neutral', valueColor }: Props) {
  return (
    <div className="metric flex1">
      <div className="metric-lbl">{label}</div>
      <div className="metric-val" style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </div>
      {delta && <div className={`metric-delta ${deltaType}`}>{delta}</div>}
    </div>
  )
}

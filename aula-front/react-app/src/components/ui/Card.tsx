// components/ui/Card.tsx
interface Props {
  label?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Card({ label, children, className = '', style }: Props) {
  return (
    <div className={`card ${className}`} style={style}>
      {label && <div className="card-label">{label}</div>}
      {children}
    </div>
  )
}

// components/ui/Alert.tsx
interface Props {
  variant?: 'yellow' | 'red'
  icon?: string
  title: string
  description: string
}

export default function Alert({ variant = 'yellow', icon = '⚡', title, description }: Props) {
  return (
    <div className={`alert ${variant === 'red' ? 'alert-r' : 'alert-y'}`}>
      <div className="alert-ico">{icon}</div>
      <div>
        <div className="alert-title">{title}</div>
        <div className="alert-desc">{description}</div>
      </div>
    </div>
  )
}

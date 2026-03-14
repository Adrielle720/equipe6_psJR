// components/layout/Sidebar.tsx
import type { PageId } from '@/types'

interface NavBtn {
  id: PageId
  title: string
  icon: React.ReactNode
  badge?: boolean
}

const GROUP_1: NavBtn[] = [
  {
    id: 'overview',
    title: 'Overview',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'demanda',
    title: 'Análise de Demanda',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

const GROUP_2: NavBtn[] = [
  {
    id: 'alternativas',
    title: 'Alternativas',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M5 9l7-7 7 7M5 15l7 7 7-7" />
      </svg>
    ),
  },
  {
    id: 'comparacao',
    title: 'Comparação',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    id: 'recomendacao',
    title: 'Recomendação',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

const GROUP_3: NavBtn[] = [
  {
    id: 'plano',
    title: 'Plano de Implementação',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
  {
    id: 'operacao',
    title: 'Operação Contínua',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
]

const FORECAST_BTN: NavBtn = {
  id: 'previsao',
  title: 'Previsão Março',
  badge: true,
  icon: (
    <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
}

interface Props {
  activePage: PageId
  goTo: (id: PageId) => void
}

function NavButton({ btn, active, onClick }: { btn: NavBtn; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`nav-icon-btn${active ? ' active' : ''}`}
      title={btn.title}
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      {btn.icon}
      {btn.badge && (
        <span
          style={{
            position: 'absolute', top: 4, right: 4,
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)',
            border: '1.5px solid var(--bg2)',
          }}
        />
      )}
    </button>
  )
}

export default function Sidebar({ activePage, goTo }: Props) {
  return (
    <aside className="sidebar">
      <div className="logo-mark">A</div>

      {GROUP_1.map((btn) => (
        <NavButton key={btn.id} btn={btn} active={activePage === btn.id} onClick={() => goTo(btn.id)} />
      ))}

      <div className="nav-divider" />

      {GROUP_2.map((btn) => (
        <NavButton key={btn.id} btn={btn} active={activePage === btn.id} onClick={() => goTo(btn.id)} />
      ))}

      <div className="nav-divider" />

      {GROUP_3.map((btn) => (
        <NavButton key={btn.id} btn={btn} active={activePage === btn.id} onClick={() => goTo(btn.id)} />
      ))}

      <div className="nav-divider" />

      <NavButton btn={FORECAST_BTN} active={activePage === 'previsao'} onClick={() => goTo('previsao')} />

      <div className="sidebar-bottom">
        <button className="nav-icon-btn" title="Configurações">
          <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </aside>
  )
}

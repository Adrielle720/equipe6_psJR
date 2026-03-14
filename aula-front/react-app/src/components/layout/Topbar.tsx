// components/layout/Topbar.tsx
import { PAGE_TITLES } from '@/hooks/useNavigation'
import type { PageId } from '@/types'

interface Props {
  activePage: PageId
}

export default function Topbar({ activePage }: Props) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <span>›</span>
        <span>NENO</span>
        <span>›</span>
        <span className="current">{PAGE_TITLES[activePage]}</span>
      </div>

      <div className="topbar-spacer" />

      <span className="topbar-pill pill-warn">Fev–Mar 2026</span>
      <span className="topbar-pill pill-danger">Cap. Crítica</span>
      <span className="topbar-pill pill-blue">W0 · 02/02</span>

      <div className="topbar-avatar" title="Usuário">JC</div>
    </header>
  )
}

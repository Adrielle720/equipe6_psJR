// ─────────────────────────────────────
// hooks/useNavigation.ts
// Page navigation state
// ─────────────────────────────────────

import { useState } from 'react'
import type { PageId } from '@/types'

export const PAGE_TITLES: Record<PageId, string> = {
  overview:     'Overview',
  diagnostico:  'Diagnóstico',
  demanda:      'Análise de Demanda',
  alternativas: 'Alternativas',
  comparacao:   'Comparação',
  recomendacao: 'Recomendação',
  plano:        'Implementação',
  operacao:     'Operação',
  previsao:     'Previsão — Março 2026',
}

export function useNavigation(initial: PageId = 'overview') {
  const [activePage, setActivePage] = useState<PageId>(initial)
  return { activePage, goTo: setActivePage }
}

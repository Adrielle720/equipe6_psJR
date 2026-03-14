// ─────────────────────────────────────
// types/index.ts
// Shared TypeScript types for the app
// ─────────────────────────────────────

export type PageId =
  | 'overview'
  | 'diagnostico'
  | 'demanda'
  | 'alternativas'
  | 'comparacao'
  | 'recomendacao'
  | 'plano'
  | 'operacao'
  | 'previsao'

export type ScenarioId = 'base' | 'otimista' | 'conservador'

// ── GEO / Regional ──────────────────────────────────────────────
export interface GeoStockRow {
  geo: string
  demanda: number
  ei: number
  sufIni: number
  transfInterna: number
  ef: number
  sufFinal: number
  status: BadgeVariant
  statusLabel: string
}

export interface DoiItem {
  geo: string
  doi: number
  color: string
  label?: string
}

// ── SKU ─────────────────────────────────────────────────────────
export interface SkuItem {
  name: string
  khl: number
  pct: number
  color: string
}

// ── Transfer ────────────────────────────────────────────────────
export interface TransferRow {
  orig: string
  dest: string
  modal: string
  lead: string
  vol: number
  when: string
  status: BadgeVariant
}

// ── Forecast Scenario ────────────────────────────────────────────
export interface ForecastScenario {
  label: string
  desc: string
  demanda: number
  transf: number
  custo: string
  maco: string
  liq: string
  weeks: Record<string, number[]>
  skus: SkuItem[]
  transfers: TransferRow[]
  doi: DoiItem[]
}

export type ForecastScenarios = Record<ScenarioId, ForecastScenario>

// ── Badge / Status ───────────────────────────────────────────────
export type BadgeVariant = 'b-ok' | 'b-warn' | 'b-danger' | 'b-blue' | 'b-neutral'

// ── Navigation ──────────────────────────────────────────────────
export interface NavItem {
  id: PageId
  title: string
  group: 'analise' | 'decisao' | 'execucao' | 'previsao'
}

// ─────────────────────────────────────
// data/scenarios.ts
// Forecast scenario definitions
// Migrated from utils/forecastData.js
// ─────────────────────────────────────

import type { ForecastScenarios } from '@/types'

export const COLORS = {
  A: '#F5C800',
  R: '#ff4757',
  G: '#3ecf8e',
  B: '#4a9eff',
  O: '#ff6b2b',
  W: 'rgba(232,230,224,0.5)',
} as const

const { A, R, G, B, O, W } = COLORS

export const SCENARIOS: ForecastScenarios = {
  base: {
    label: 'Cenário Base — Demanda estável com +10% TT LN confirmado',
    desc: '211 KHL total em março · GAP de 53 KHL vs. cap. NENO · Transferências via cabotagem em W3/fev · Bias -9% aplicado',
    demanda: 211, transf: 53, custo: 'R$520k', maco: '+R$1,2M', liq: '+R$680k',
    weeks: {
      MAPAPI:     [10.2, 11.8, 12.4, 10.6],
      'NE Norte': [16.4, 17.2, 18.1, 15.8],
      'NE Sul':   [14.1, 15.3, 15.9, 13.2],
      'NO Centro': [7.8,  8.4,  8.2,  7.6],
      Araguaia:   [1.2,  1.4,  1.3,  1.1],
    },
    skus: [
      { name: 'Malzbier Brahma LN355',   khl: 48.2, pct: 22.8, color: A },
      { name: 'Colorado Lager LN355',    khl: 36.5, pct: 17.3, color: B },
      { name: 'Brahma Chopp Zero LN355', khl: 31.8, pct: 15.1, color: G },
      { name: 'Goose Island Midway',     khl: 28.4, pct: 13.5, color: O },
      { name: 'Patagônia Amber LN355',   khl: 24.7, pct: 11.7, color: '#a78bfa' },
      { name: 'Skol Beats Senses LN269', khl: 22.1, pct: 10.5, color: '#f472b6' },
      { name: 'Budweiser Zero LN330',    khl: 19.3, pct:  9.1, color: W },
    ],
    transfers: [
      { orig: 'SPLNs (SP)', dest: 'CDR Bahia',     modal: 'Cabotagem',  lead: '25d', vol: 24, when: '23/02 (W3)', status: 'b-warn' },
      { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Cabotagem',  lead: '25d', vol: 18, when: '23/02 (W3)', status: 'b-warn' },
      { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Rodoviário', lead: '6d',  vol:  9, when: '09/03 (W1)', status: 'b-danger' },
      { orig: 'UB541 (MG)', dest: 'NO Araguaia',   modal: 'Retirada',   lead: '—',   vol:  2, when: 'Acordado',   status: 'b-ok' },
    ],
    doi: [
      { geo: 'MAPAPI',      doi: 10, color: O },
      { geo: 'NE Norte',    doi: 14, color: G },
      { geo: 'NE Sul',      doi: 13, color: G },
      { geo: 'NO Araguaia', doi:  0, color: B, label: 'Revendedor' },
      { geo: 'NO Centro',   doi: 22, color: A },
    ],
  },

  otimista: {
    label: 'Cenário Otimista — Crescimento acelerado, demanda confirmada pelas GEOs',
    desc: '228 KHL total · GAP de 70 KHL · Mix favorável de alto MACO · Requer rodoviário parcial para cobertura imediata',
    demanda: 228, transf: 70, custo: 'R$720k', maco: '+R$2,1M', liq: '+R$1,38M',
    weeks: {
      MAPAPI:     [12.4, 14.2, 15.1, 13.3],
      'NE Norte': [18.8, 20.4, 21.2, 18.6],
      'NE Sul':   [16.2, 17.8, 18.4, 15.6],
      'NO Centro': [9.2, 10.1,  9.8,  9.0],
      Araguaia:   [1.4,  1.6,  1.5,  1.3],
    },
    skus: [
      { name: 'Malzbier Brahma LN355',   khl: 54.6, pct: 23.9, color: A },
      { name: 'Colorado Lager LN355',    khl: 42.1, pct: 18.5, color: B },
      { name: 'Brahma Chopp Zero LN355', khl: 35.4, pct: 15.5, color: G },
      { name: 'Goose Island Midway',     khl: 28.4, pct: 12.5, color: O },
      { name: 'Patagônia Amber LN355',   khl: 28.2, pct: 12.4, color: '#a78bfa' },
      { name: 'Skol Beats Senses LN269', khl: 24.3, pct: 10.7, color: '#f472b6' },
      { name: 'Budweiser Zero LN330',    khl: 15.0, pct:  6.5, color: W },
    ],
    transfers: [
      { orig: 'SPLNs (SP)', dest: 'CDR Bahia',     modal: 'Cabotagem',  lead: '25d', vol: 32, when: '23/02 (W3)', status: 'b-warn' },
      { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Cabotagem',  lead: '25d', vol: 24, when: '23/02 (W3)', status: 'b-warn' },
      { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Rodoviário', lead: '6d',  vol: 12, when: '09/03 (W1)', status: 'b-danger' },
      { orig: 'UB541 (MG)', dest: 'NO Araguaia',   modal: 'Retirada',   lead: '—',   vol:  2, when: 'Acordado',   status: 'b-ok' },
    ],
    doi: [
      { geo: 'MAPAPI',      doi:  9, color: R },
      { geo: 'NE Norte',    doi: 12, color: G },
      { geo: 'NE Sul',      doi: 12, color: G },
      { geo: 'NO Araguaia', doi:  0, color: B, label: 'Revendedor' },
      { geo: 'NO Centro',   doi: 18, color: A },
    ],
  },

  conservador: {
    label: 'Cenário Conservador — Bias ajustado, demanda real ~192 KHL',
    desc: '192 KHL total (bias -9% aplicado) · GAP de 34 KHL · Transferências menores · Menor risco de excesso de estoque',
    demanda: 192, transf: 34, custo: 'R$350k', maco: '+R$650k', liq: '+R$300k',
    weeks: {
      MAPAPI:     [9.1,  9.8, 10.2,  9.4],
      'NE Norte': [14.8, 15.4, 16.2, 14.1],
      'NE Sul':   [12.6, 13.1, 13.8, 11.9],
      'NO Centro': [7.0,  7.4,  7.2,  6.8],
      Araguaia:   [1.0,  1.1,  1.0,  0.9],
    },
    skus: [
      { name: 'Malzbier Brahma LN355',   khl: 42.1, pct: 21.9, color: A },
      { name: 'Colorado Lager LN355',    khl: 33.4, pct: 17.4, color: B },
      { name: 'Brahma Chopp Zero LN355', khl: 29.2, pct: 15.2, color: G },
      { name: 'Goose Island Midway',     khl: 26.8, pct: 13.9, color: O },
      { name: 'Patagônia Amber LN355',   khl: 22.4, pct: 11.7, color: '#a78bfa' },
      { name: 'Skol Beats Senses LN269', khl: 20.1, pct: 10.5, color: '#f472b6' },
      { name: 'Budweiser Zero LN330',    khl: 18.0, pct:  9.4, color: W },
    ],
    transfers: [
      { orig: 'SPLNs (SP)', dest: 'CDR Bahia',     modal: 'Cabotagem',  lead: '25d', vol: 18, when: '23/02 (W3)', status: 'b-ok' },
      { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Cabotagem',  lead: '25d', vol: 10, when: '23/02 (W3)', status: 'b-ok' },
      { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Rodoviário', lead: '6d',  vol:  4, when: '09/03 (W1)', status: 'b-warn' },
      { orig: 'UB541 (MG)', dest: 'NO Araguaia',   modal: 'Retirada',   lead: '—',   vol:  2, when: 'Acordado',   status: 'b-ok' },
    ],
    doi: [
      { geo: 'MAPAPI',      doi: 12, color: G },
      { geo: 'NE Norte',    doi: 15, color: G },
      { geo: 'NE Sul',      doi: 14, color: G },
      { geo: 'NO Araguaia', doi:  0, color: B, label: 'Revendedor' },
      { geo: 'NO Centro',   doi: 26, color: A },
    ],
  },
}


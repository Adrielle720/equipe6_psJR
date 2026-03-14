// ─────────────────────────────────────
// utils/chartConfig.ts
// Chart.js option configs for react-chartjs-2
// Returns ChartData / ChartOptions objects
// (no direct Chart instantiation — react-chartjs-2 handles that)
// ─────────────────────────────────────

import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  ArcElement, Filler,
  Tooltip, Legend,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { COLORS } from '@/data/scenarios'
import type { ForecastScenario } from '@/types'

// Register all required Chart.js components once
ChartJS.register(
  CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  ArcElement, Filler,
  Tooltip, Legend,
)

// Apply global defaults
ChartJS.defaults.color       = 'rgba(232,230,224,0.4)'
ChartJS.defaults.borderColor = 'rgba(255,255,255,0.05)'
ChartJS.defaults.font.family = "'DM Mono', monospace"
ChartJS.defaults.font.size   = 10

const { A, R, G, B, O, W } = COLORS
const grid = { color: 'rgba(255,255,255,0.04)' }
const legendLabels = { color: 'rgba(232,230,224,0.5)', boxWidth: 8, padding: 12 }

const baseOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
}

// ── Sales history bar chart ──────────────────────────────────────
export const salesChartData: ChartData<'bar'> = {
  labels: ['2021', '2022', '2023', '2024', '2025', '2026*'],
  datasets: [{
    data: [1584, 1824, 1884, 1980, 2160, 2330],
    backgroundColor: [B, B, B, B, B, A],
    borderRadius: 4,
  }],
}
export const salesChartOptions: ChartOptions<'bar'> = {
  ...baseOptions,
  scales: {
    x: { grid: { display: false } },
    y: { grid, ticks: { callback: (v) => `${v}k` } },
  },
}

// ── Semester demand bar chart ────────────────────────────────────
export const semChartData: ChartData<'bar'> = {
  labels: ['Jan', 'Fev orig.', 'Fev+30%', 'Mar+10%', 'Abr', 'Jun', 'Jul'],
  datasets: [{
    data: [200, 180, 192, 211, 190, 195, 200],
    backgroundColor: [B, W, A, R, B, B, B],
    borderRadius: 3,
  }],
}
export const semChartOptions: ChartOptions<'bar'> = {
  ...baseOptions,
  scales: {
    x: { grid: { display: false }, ticks: { maxRotation: 25 } },
    y: { grid, min: 160 },
  },
}

// ── Historical + projection line chart ──────────────────────────
export const histChartData: ChartData<'line'> = {
  labels: ['2021', '2022', '2023', '2024', '2025', '2026*'],
  datasets: [
    { label: 'Real',       data: [1584,1824,1884,1980,2160,null], borderColor: B, backgroundColor: 'rgba(74,158,255,0.08)', fill: true, tension: 0.35, pointRadius: 4, pointBackgroundColor: B },
    { label: 'Proj. base', data: [null,null,null,null,2160,2330], borderColor: A, borderDash: [5,3], tension: 0.35, pointRadius: 4, pointBackgroundColor: A, fill: false },
    { label: 'Proj. +10%', data: [null,null,null,null,2160,2376], borderColor: R, borderDash: [3,3], tension: 0.35, pointRadius: 4, pointBackgroundColor: R, fill: false },
  ],
}
export const histChartOptions: ChartOptions<'line'> = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: true, position: 'top', labels: legendLabels } },
  scales: { x: { grid: { display: false } }, y: { grid, min: 1400 } },
}

// ── Cost comparison grouped bar ──────────────────────────────────
export const costChartData: ChartData<'bar'> = {
  labels: ['Cabotagem','Rodoviário','Cabo +30%','Rodo +30%','Cabo +10%','Rodo +10%'],
  datasets: [
    { label: 'Custo rel.',   data: [100,160,100,160,100,160], backgroundColor: [`${G}AA`,`${O}AA`,`${G}CC`,`${O}CC`,`${G}DD`,`${O}DD`], borderRadius: 4 },
    { label: 'Volume extra', data: [22,0,34,0,53,0],           backgroundColor: [`${B}88`,`${B}44`,`${B}AA`,`${B}44`,`${B}CC`,`${B}44`], borderRadius: 4 },
  ],
}
export const costChartOptions: ChartOptions<'bar'> = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: true, position: 'top', labels: legendLabels } },
  scales: { x: { grid: { display: false } }, y: { grid } },
}

// ── Evolution 2021–2026 line chart ───────────────────────────────
export const evolChartData: ChartData<'line'> = {
  labels: ['2021','2022','2023','2024','2025','2026 base','2026 +10%'],
  datasets: [
    { label: 'Real',                data: [1584,1824,1884,1980,2160,null,null], borderColor: B, backgroundColor: 'rgba(74,158,255,0.06)', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: B },
    { label: 'Proj. base',          data: [null,null,null,null,2160,2330,null], borderColor: A, borderDash: [5,3], tension: 0.4, pointRadius: 4, fill: false },
    { label: 'Proj. c/ incentivos', data: [null,null,null,null,2160,null,2376], borderColor: R, borderDash: [3,3], tension: 0.4, pointRadius: 4, fill: false },
  ],
}
export const evolChartOptions: ChartOptions<'line'> = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: true, position: 'top', labels: legendLabels } },
  scales: { x: { grid: { display: false } }, y: { grid, min: 1400 } },
}

// ── Forecast weekly stacked bar (dynamic per scenario) ───────────
export function getFcWeekChartData(scenario: ForecastScenario): ChartData<'bar'> {
  const geos   = Object.keys(scenario.weeks)
  const colors = [B, A, G, O, W]
  return {
    labels: ['W1 (03/03)', 'W2 (10/03)', 'W3 (17/03)', 'W4 (24/03)'],
    datasets: geos.map((geo, i) => ({
      label: geo,
      data: scenario.weeks[geo],
      backgroundColor: `${colors[i]}BB`,
      borderRadius: 3,
      stack: 'stack',
    })),
  }
}
export const fcWeekChartOptions: ChartOptions<'bar'> = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, stacked: true },
    y: { grid, stacked: true, ticks: { callback: (v) => `${v}k` } },
  },
}

// ── Bias sensitivity line chart (dynamic) ───────────────────────
export function getBiasChartData(baseDemanda: number): ChartData<'line'> {
  const labels: string[] = [], dataAdj: number[] = [], dataExc: number[] = []
  for (let b = -5; b <= 20; b++) {
    labels.push(`${b}%`)
    const adj = Math.round(baseDemanda / (1 + b / 100))
    dataAdj.push(adj)
    dataExc.push(Math.max(0, baseDemanda - adj))
  }
  return {
    labels,
    datasets: [
      { label: 'Demanda ajustada', data: dataAdj, borderColor: B, backgroundColor: 'rgba(74,158,255,0.06)', fill: true, tension: 0.3, pointRadius: 0, borderWidth: 1.5 },
      { label: 'Excesso risco',    data: dataExc, borderColor: R, backgroundColor: 'rgba(255,71,87,0.06)',  fill: true, tension: 0.3, pointRadius: 0, borderWidth: 1.5 },
    ],
  }
}
export const biasChartOptions: ChartOptions<'line'> = {
  responsive: true, maintainAspectRatio: false,
  animation: false,
  plugins: { legend: { display: true, position: 'top', labels: legendLabels } },
  scales: {
    x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
    y: { grid, ticks: { callback: (v) => `${v}k` } },
  },
}

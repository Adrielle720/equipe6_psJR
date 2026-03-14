// ─────────────────────────────────────
// hooks/useForecast.ts
// Forecast page state: active scenario + bias slider
// ─────────────────────────────────────

import { useState, useMemo } from 'react'
import { SCENARIOS } from '@/data/scenarios'
import { COLORS } from '@/data/scenarios'
import type { ScenarioId } from '@/types'

const { A, R, G } = COLORS

export function useForecast() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('base')
  const [bias, setBias] = useState(9)

  const scenario = SCENARIOS[scenarioId]

  const biasCalc = useMemo(() => {
    const adj     = Math.round(scenario.demanda / (1 + bias / 100))
    const excesso = Math.max(0, scenario.demanda - adj)
    const custo   = excesso * 10
    const color   = bias > 5 ? R : bias > 0 ? A : G
    return { adj, excesso, custo, color }
  }, [scenario.demanda, bias])

  return {
    scenarioId,
    setScenarioId,
    scenario,
    bias,
    setBias,
    biasCalc,
  }
}

// pages/Previsao.tsx
import { Bar, Line } from 'react-chartjs-2'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import MetricCard from '@/components/ui/MetricCard'
import DoiGauge from '@/components/ui/DoiGauge'
import { useForecast } from '@/hooks/useForecast'
import { COLORS } from '@/data/scenarios'
import {
  getFcWeekChartData,
  fcWeekChartOptions,
  getBiasChartData,
  biasChartOptions,
} from '@/utils/chartConfig'
import type { ScenarioId } from '@/types'

const { A } = COLORS

const SCENARIO_BTNS: { id: ScenarioId; label: string }[] = [
  { id: 'base',        label: 'BASE' },
  { id: 'otimista',    label: 'OTIMISTA' },
  { id: 'conservador', label: 'CONSERV.' },
]

const STATUS_LBL: Record<string, string> = {
  'b-ok': 'OK', 'b-warn': 'Urgente', 'b-danger': 'Emergencial',
}

const GEO_COLORS = [COLORS.B, COLORS.A, COLORS.G, COLORS.O, COLORS.W]

export default function Previsao() {
  const { scenarioId, setScenarioId, scenario, bias, setBias, biasCalc } = useForecast()

  const fcWeekData  = getFcWeekChartData(scenario)
  const biasData    = getBiasChartData(scenario.demanda)
  const totalTransf = scenario.transfers.reduce((s, t) => s + t.vol, 0)

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">
            Previsão <span style={{ color: 'var(--accent)' }}>·</span> Março 2026
          </div>
          <div className="page-subtitle">Projeção semanal de demanda, produção e transferências — modelo interativo</div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Scenario toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--border2)', borderRadius: 6, overflow: 'hidden' }}>
            {SCENARIO_BTNS.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                style={{
                  padding: '6px 12px',
                  background: scenarioId === s.id ? A : 'transparent',
                  color: scenarioId === s.id ? '#000' : 'rgba(232,230,224,0.3)',
                  border: 'none',
                  fontFamily: 'var(--font-m)',
                  fontSize: 10,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button className="export-btn">↓ Exportar</button>
        </div>
      </div>

      {/* Alert */}
      <div className="alert alert-y">
        <div className="alert-ico">📊</div>
        <div>
          <div className="alert-title">{scenario.label}</div>
          <div className="alert-desc">{scenario.desc}</div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="row">
        <MetricCard
          label="Demanda Total Mar"
          value={<>{scenario.demanda}<small style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>}
          delta="▲ +10% vs. Fev orig."
          deltaType="up"
          valueColor="var(--red)"
        />
        <MetricCard
          label="Produção NENO"
          value={<>158<small style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>}
          delta="AQ541 + NS541 · 100%"
        />
        <MetricCard
          label="Transferências Ext."
          value={<>{scenario.transf}<small style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>}
          delta={`▲ +${scenario.transf - 34} khl vs. Fev`}
          deltaType="up"
          valueColor="var(--accent)"
        />
        <MetricCard
          label="Custo Tranf. Est."
          value={scenario.custo}
          delta="▲ estimativa"
          deltaType="up"
          valueColor="var(--accent2)"
        />
        <MetricCard
          label="MACO Incremental"
          value={<>{scenario.maco}<small style={{ fontSize: 13, color: 'var(--text3)' }}>*</small></>}
          delta={`▼ Resultado liq. ${scenario.liq}`}
          deltaType="down"
          valueColor="var(--accent3)"
        />
      </div>

      <div className="row">
        {/* Weekly stacked bar */}
        <Card className="flex2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="card-label" style={{ margin: 0 }}>Demanda Semanal Março — por GEO (khl)</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 10, fontFamily: 'var(--font-m)' }}>
              {Object.keys(scenario.weeks).map((geo, i) => (
                <span key={geo} style={{ color: GEO_COLORS[i] }}>■ {geo}</span>
              ))}
            </div>
          </div>
          <div className="cw" style={{ height: 200 }}>
            <Bar data={fcWeekData} options={fcWeekChartOptions} />
          </div>
        </Card>

        {/* SKU breakdown */}
        <Card label="Previsão por SKU — Março (khl)" className="flex1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {scenario.skus.map((s) => (
              <div key={s.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--text2)' }}>{s.name}</span>
                  <span style={{ fontFamily: 'var(--font-m)', fontSize: 11, color: 'var(--text)' }}>
                    {s.khl} khl <span style={{ color: 'var(--text3)' }}>({s.pct}%)</span>
                  </span>
                </div>
                <div style={{ height: 4, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct * 4}%`, background: s.color, borderRadius: 2, transition: 'width 0.6s cubic-bezier(.4,0,.2,1)' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="row">
        {/* Transfer plan */}
        <Card label="Plano de Transferências — Março" className="flex1">
          <table>
            <thead>
              <tr>
                <th>Origem</th><th>Destino</th><th>Modal</th><th>Lead</th>
                <th className="td-r">Vol.</th><th>Acionar em</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {scenario.transfers.map((t, i) => (
                <tr key={i}>
                  <td>{t.orig}</td>
                  <td>{t.dest}</td>
                  <td>{t.modal}</td>
                  <td style={{ fontFamily: 'var(--font-m)', fontSize: 11 }}>{t.lead}</td>
                  <td className="td-r highlight">{t.vol}</td>
                  <td style={{ fontFamily: 'var(--font-m)', fontSize: 10, color: A }}>{t.when}</td>
                  <td><Badge variant={t.status}>{STATUS_LBL[t.status]}</Badge></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <td colSpan={4}><b>Total</b></td>
                <td className="td-r" style={{ color: A, fontWeight: 700, fontFamily: 'var(--font-m)' }}>
                  <b>{totalTransf}</b>
                </td>
                <td colSpan={2} />
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 10, padding: 10, background: 'var(--bg3)', borderRadius: 6, border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-m)', fontSize: 9, color: 'var(--text3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
              Janela de Acionamento
            </div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.7 }}>
              Cabotagem 25d → acionar até{' '}
              <span style={{ color: A, fontWeight: 600 }}>W3/Fev (23/02)</span> para chegar no início de março.
              <br />
              Rodoviário 6d → acionar até{' '}
              <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>W1/Mar (09/03)</span> para cobrir picos tardios.
            </div>
          </div>
        </Card>

        {/* DOI projetado */}
        <Card label="DOI Projetado por GEO — Fim de Março" className="flex1">
          <DoiGauge items={scenario.doi} />
          <hr />
          <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.7 }}>
            Projeção considera produção NENO completa + transferências programadas + EF de fevereiro.{' '}
            <span style={{ color: 'var(--red)' }}>MAPAPI</span> permanece zona de atenção — monitoramento semanal.
          </div>
        </Card>
      </div>

      {/* Bias simulator */}
      <Card label="Simulação de Sensibilidade — Ajuste de Bias">
        <div className="row" style={{ gap: 20, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--text2)' }}>Bias de previsão das GEOs</span>
              <span style={{ fontFamily: 'var(--font-m)', fontSize: 12, color: A }}>
                {bias >= 0 ? '+' : ''}{bias}%
              </span>
            </div>
            <input
              type="range" min={-5} max={20} value={bias} step={1}
              onChange={(e) => setBias(Number(e.target.value))}
              style={{ width: '100%', accentColor: A, height: 4, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: 'var(--font-m)', fontSize: 9, color: 'var(--text3)' }}>
              <span>-5% (conservador)</span><span>0% (neutro)</span><span>+20% (otimista)</span>
            </div>
          </div>

          {/* Bias calc outputs */}
          {[
            { label: 'Demanda ajustada', val: `${biasCalc.adj} khl`,    color: biasCalc.color },
            { label: 'Excesso risco',    val: biasCalc.excesso > 0 ? `+${biasCalc.excesso} khl` : '0 khl', color: 'var(--red)' },
            { label: 'Custo exposto',    val: `R$${biasCalc.custo}k`,   color: 'var(--accent2)' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: 9, color: 'var(--text3)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontFamily: 'var(--font-h)', fontSize: 22, fontWeight: 800, color: item.color }}>{item.val}</div>
            </div>
          ))}
        </div>

        <div className="cw" style={{ height: 120, marginTop: 16 }}>
          <Line key={`${scenarioId}-${scenario.demanda}`} data={biasData} options={biasChartOptions} />
        </div>
      </Card>
    </>
  )
}

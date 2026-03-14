// pages/Overview.tsx
import { Bar } from 'react-chartjs-2'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import MetricCard from '@/components/ui/MetricCard'
import DoiGauge from '@/components/ui/DoiGauge'
import { salesChartData, salesChartOptions, semChartData, semChartOptions } from '@/utils/chartConfig'
import type { PageId } from '@/types'

const DOI_ITEMS = [
  { geo: 'MAPAPI',      doi: 8,  color: 'var(--red)' },
  { geo: 'NE Norte',    doi: 12, color: 'var(--accent3)' },
  { geo: 'NE Sul',      doi: 12, color: 'var(--accent3)' },
  { geo: 'NO Araguaia', doi: 0,  color: 'var(--blue)', label: 'Revend.' },
  { geo: 'NO Centro',   doi: 28, color: 'var(--accent)' },
]

const FLOW: { id: PageId; label: string }[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'diagnostico',  label: 'Diagnóstico' },
  { id: 'demanda',      label: 'Demanda' },
  { id: 'alternativas', label: 'Alternativas' },
  { id: 'comparacao',   label: 'Comparação' },
  { id: 'recomendacao', label: 'Recomendação' },
  { id: 'plano',        label: 'Implementação' },
  { id: 'operacao',     label: 'Operação' },
  { id: 'previsao',     label: 'Previsão Mar' },
]

interface Props {
  goTo: (id: PageId) => void
  activePage: PageId
}

export default function Overview({ goTo, activePage }: Props) {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">
            Overview <span style={{ color: 'var(--accent)' }}>·</span> Long Neck NENO
          </div>
          <div className="page-subtitle">
            Análise estratégica de produção, demanda e transferências · 02/02/2026
          </div>
        </div>
        <button className="export-btn">↓ Exportar</button>
      </div>

      <Alert
        title="Nova demanda Malzbier Brahma +30% em fevereiro pressiona sistema já no limite"
        description="180 → 192 KHL (fev) · 211 KHL (mar +10% TT LN) · Capacidade NENO: 158 KHL · GAP: 34 KHL · Bias histórico GEOs: +9%"
      />

      {/* KPI strip */}
      <div className="row">
        <MetricCard label="Cap. Produtiva NE"   value={<>158<small style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>} delta="AQ541: 50 · NS541: 108" />
        <MetricCard label="Demanda Fev Ajust."  value={<>192<small style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>} delta="▲ +12 khl vs. original" deltaType="up" valueColor="var(--accent)" />
        <MetricCard label="GAP a Transferir"    value={<>34<small  style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>} delta="▲ Via SPLNs + UB541"    deltaType="up" valueColor="var(--red)" />
        <MetricCard label="Demanda Mar (+10%)"  value={<>211<small style={{ fontSize: 13, color: 'var(--text3)' }}> khl</small></>} delta="▲ +31 khl vs. original" deltaType="up" valueColor="var(--red)" />
        <MetricCard label="Bias GEOs (3m)"      value={<>+9<small  style={{ fontSize: 13, color: 'var(--text3)' }}>%</small></>}   delta="Superestimação sistemática" deltaType="up" valueColor="var(--accent2)" />
      </div>

      {/* Decision flow */}
      <Card style={{ padding: '14px 16px' }}>
        <div className="card-label">Fluxo Decisório</div>
        <div className="flow-row">
          {FLOW.map((step, i) => (
            <span key={step.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div
                className={`fbox${step.id === activePage ? ' active-f' : ''}${step.id === 'previsao' ? ' fbox-forecast' : ''}`}
                style={step.id === 'previsao' ? { borderColor: 'rgba(245,200,0,0.25)', color: 'var(--accent)' } : undefined}
                onClick={() => goTo(step.id)}
              >
                {step.label}
              </div>
              {i < FLOW.length - 1 && <div className="farrow">→</div>}
            </span>
          ))}
        </div>
      </Card>

      <div className="row">
        <Card label="Vendas Reais LN NENO — 2021–2026 (KHL)" className="flex2">
          <div className="cw" style={{ height: 160 }}>
            <Bar data={salesChartData} options={salesChartOptions} />
          </div>
        </Card>

        <Card label="Estrutura Produtiva NENO" className="flex1">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { name: 'AQ541',       rows: [['Cap.', '50 khl/mês'], ['Local', 'Aquiraz CE'], ['Status', '100%', 'var(--red)']] },
              { name: 'NS541',       rows: [['Cap.', '108 khl/mês'], ['Local', 'NE Norte PE'], ['Status', '100%', 'var(--red)']] },
              { name: 'CDR J. Pessoa', rows: [['Atende', 'NE Norte + MAPAPI'], ['Modal', 'Cabo 25d']] },
              { name: 'CDR Bahia',   rows: [['Atende', 'NE Sul'], ['UB541', 'NO Araguaia']] },
            ].map((g) => (
              <div key={g.name} className="geo-item">
                <div className="geo-name">{g.name}</div>
                {g.rows.map(([k, v, c]) => (
                  <div key={k} className="geo-row">
                    <span>{k}</span>
                    <span style={c ? { color: c } : undefined}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="row">
        <Card label="DOI por GEO — W0 (mín. 12 dias)" className="flex1">
          <DoiGauge items={DOI_ITEMS} />
        </Card>

        <Card label="Demanda LN NENO — 1º Sem 2026 (KHL)" className="flex2">
          <div className="cw" style={{ height: 120 }}>
            <Bar data={semChartData} options={semChartOptions} />
          </div>
        </Card>
      </div>
    </>
  )
}

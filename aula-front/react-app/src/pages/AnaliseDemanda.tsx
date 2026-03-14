// pages/AnaliseDemanda.tsx
import { Line, Bar } from 'react-chartjs-2'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { histChartData, histChartOptions } from '@/utils/chartConfig'

const SCENARIOS_CARDS = [
  {
    id: 'base',
    label: 'Cenário Base',
    khl: 180,
    desc: 'GAP: 22 khl · Custo mínimo',
    badge: <Badge variant="b-ok">Menor Custo</Badge>,
    borderColor: 'var(--border)',
    color: 'var(--text3)',
  },
  {
    id: 'fev',
    label: 'Fev — +30% Malzbier',
    khl: 192,
    desc: 'GAP: 34 khl · Incentivos comerciais',
    badge: <Badge variant="b-warn">Recomendado</Badge>,
    borderColor: 'rgba(245,200,0,0.3)',
    color: 'var(--accent)',
  },
  {
    id: 'mar',
    label: 'Mar — +10% TT LN',
    khl: 211,
    desc: 'GAP: 53 khl · Maior pressão',
    badge: <Badge variant="b-danger">Alto Risco</Badge>,
    borderColor: 'rgba(255,71,87,0.25)',
    color: 'var(--red)',
  },
]

const BIAS_BARS = [
  { label: 'Pedido (+30%)', val: '192 khl', pct: 100, color: 'var(--red)' },
  { label: 'Ajust. bias -9%', val: '~175 khl', pct: 91,  color: 'var(--accent)' },
  { label: 'Cap. NENO',     val: '158 khl', pct: 82,  color: 'var(--blue)' },
]

export default function AnaliseDemanda() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Análise de Demanda</div>
          <div className="page-subtitle">Cenários · Impacto do bias · Projeção semestral</div>
        </div>
      </div>

      {/* Scenario cards */}
      <div className="row">
        {SCENARIOS_CARDS.map((s) => (
          <div key={s.id} className="card flex1" style={{ borderColor: s.borderColor, textAlign: 'center', padding: 20 }}>
            <div className="card-label">{s.label}</div>
            <div style={{ fontFamily: 'var(--font-h)', fontSize: 42, fontWeight: 800, color: s.color, letterSpacing: -2 }}>
              {s.khl}<small style={{ fontSize: 18 }}> khl</small>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>{s.desc}</div>
            <div style={{ marginTop: 10 }}>{s.badge}</div>
          </div>
        ))}
      </div>

      <div className="row">
        <Card label="Histórico + Projeção (KHL)" className="flex2">
          <div className="cw" style={{ height: 180 }}>
            <Line data={histChartData} options={histChartOptions} />
          </div>
        </Card>

        <Card label="Ajuste pelo Bias GEOs (+9%)" className="flex1">
          <div style={{ marginTop: 4 }}>
            {BIAS_BARS.map((b) => (
              <div key={b.label} className="cmp-bar">
                <div className="cmp-header">
                  <span className="cmp-name">{b.label}</span>
                  <span className="cmp-val">{b.val}</span>
                </div>
                <div className="cmp-track">
                  <div className="cmp-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.7 }}>
            Se bias repetir, haverá{' '}
            <span style={{ color: 'var(--accent2)' }}>~17 khl de excesso</span> sobre demanda real
            → custo de holding desnecessário. Confirmar pedido firme antes de transferir.
          </div>
        </Card>
      </div>
    </>
  )
}

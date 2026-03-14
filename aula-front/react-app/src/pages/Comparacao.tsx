// pages/Comparacao.tsx
import { Bar } from 'react-chartjs-2'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { costChartData, costChartOptions } from '@/utils/chartConfig'

const MATRIX = [
  { label: 'Volume adicional a transferir', base: '22 khl',         fev: { v: '34 khl', c: 'var(--accent)' },   mar: { v: '53 khl', c: 'var(--red)' } },
  { label: 'Modal recomendado',             base: 'Cabotagem',      fev: { v: 'Cabo + Rodo parcial' },          mar: { v: 'Rodo significativo', c: 'var(--red)' } },
  { label: 'Lead time disponível',          base: <Badge variant="b-ok">OK</Badge>,  fev: { v: <Badge variant="b-warn">Crítico</Badge> }, mar: { v: <Badge variant="b-danger">Urgente</Badge> } },
  { label: 'DOI mín. 12d atingível',        base: <Badge variant="b-ok">Sim</Badge>, fev: { v: <Badge variant="b-warn">Com esforço</Badge> }, mar: { v: <Badge variant="b-danger">Risco MAPAPI</Badge> } },
  { label: 'Risco bias +9%',               base: 'Baixo',          fev: { v: 'Médio', c: 'var(--accent)' },    mar: { v: 'Alto', c: 'var(--red)' } },
  { label: 'MACO incremental estimado',    base: 'Base',           fev: { v: '+R$400–600k*', c: 'var(--accent3)' }, mar: { v: '+R$1,2–1,8M*', c: 'var(--accent3)' } },
  { label: 'Custo logístico extra',        base: 'Base',           fev: { v: '+R$200–350k*', c: 'var(--accent)' },  mar: { v: '+R$600k–1,1M*', c: 'var(--red)' } },
  { label: 'Resultado líquido estimado',   base: '—',              fev: { v: '+R$200–250k*', c: 'var(--accent3)', bold: true }, mar: { v: '+R$600–700k*', c: 'var(--accent3)', bold: true }, highlight: true },
]

const CMP_BARS = [
  { label: 'Base (180 khl)',         val: 'R$ —',       pct: 40, color: 'var(--text3)' },
  { label: 'Fev +30% (192 khl)',     val: '+R$225k*',   pct: 70, color: 'var(--accent)' },
  { label: 'Mar +10% (211 khl)',     val: '+R$650k*',   pct: 100, color: 'var(--red)' },
]

export default function Comparacao() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Comparação</div>
          <div className="page-subtitle">Trade-offs por cenário · Custo vs. MACO</div>
        </div>
      </div>

      <div className="row">
        <Card label="Custo Estimado por Modal (referencial, R$/HL)" className="flex2">
          <div className="cw" style={{ height: 180 }}>
            <Bar data={costChartData} options={costChartOptions} />
          </div>
        </Card>

        <Card label="Resultado Estimado por Cenário" className="flex1">
          <div style={{ marginTop: 4 }}>
            {CMP_BARS.map((b) => (
              <div key={b.label} className="cmp-bar">
                <div className="cmp-header">
                  <span className="cmp-name" style={{ color: b.color }}>{b.label}</span>
                  <span className="cmp-val" style={{ color: b.pct === 100 ? 'var(--accent3)' : undefined }}>{b.val}</span>
                </div>
                <div className="cmp-track">
                  <div className="cmp-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.7 }}>
            * MACO incremental menos custo logístico extra. Cenário Mar tem maior resultado mas exige
            gestão semanal rigorosa do bias.
          </div>
        </Card>
      </div>

      <Card label="Matriz de Decisão">
        <table>
          <thead>
            <tr>
              <th>Critério</th>
              <th className="td-c">Base · 180 khl</th>
              <th className="td-c">Fev +30% · 192 khl</th>
              <th className="td-c">Mar +10% · 211 khl</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => (
              <tr key={row.label} style={row.highlight ? { background: 'rgba(255,255,255,0.02)' } : undefined}>
                <td className="highlight">{row.label}</td>
                <td className="td-c">{row.base}</td>
                <td className="td-c" style={row.fev.c ? { color: row.fev.c, fontWeight: row.fev.bold ? 700 : undefined } : undefined}>{row.fev.v}</td>
                <td className="td-c" style={row.mar.c ? { color: row.mar.c, fontWeight: row.mar.bold ? 700 : undefined } : undefined}>{row.mar.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 8, fontFamily: 'var(--font-m)' }}>
          * Estimativas baseadas em MACO NENO e custos de transferência ex-NE. Preencher com valores reais da planilha.
        </div>
      </Card>
    </>
  )
}

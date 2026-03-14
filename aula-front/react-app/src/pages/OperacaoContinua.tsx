// pages/OperacaoContinua.tsx
import { Line } from 'react-chartjs-2'
import Card from '@/components/ui/Card'
import MetricCard from '@/components/ui/MetricCard'
import { evolChartData, evolChartOptions } from '@/utils/chartConfig'

const SAOP_ROWS = [
  { dia: 'Segunda', reuniao: 'Review Estoque GEOs',   output: 'DOI + alertas ruptura' },
  { dia: 'Terça',   reuniao: 'Demand Review c/ GEOs', output: 'Demanda revisada' },
  { dia: 'Quarta',  reuniao: 'Reunião de Consenso',   output: 'Volume confirmado' },
  { dia: 'Quinta',  reuniao: 'Programação PCP',        output: 'WSNP semana +2' },
  { dia: 'Sexta',   reuniao: 'Review Transferências',  output: 'Cabo/Rodo acionados' },
]

const RISKS = [
  { level: 'risk-h', title: 'Capacidade NENO — Crescimento Secular',   desc: 'CAGR LN ~8%/ano. Até 2027, dependência de transferências será permanente. Avaliar 3ª linha ou expansão AQ541.' },
  { level: 'risk-m', title: 'Exposição Rodoviária Recorrente',          desc: 'Uso emergencial do rodo (+60% custo, +5% avaria) erode margem continuamente. Planejamento antecipado é essencial.' },
  { level: 'risk-l', title: 'Acurácia de Demanda',                      desc: 'Implementar penalização de KPI para GEOs com bias >5%. Criar incentivo para previsão conservadora e acurada.' },
]

export default function OperacaoContinua() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Operação Contínua</div>
          <div className="page-subtitle">KPIs · Cadência S&OP · Riscos estruturais</div>
        </div>
      </div>

      <div className="row">
        <MetricCard label="DOI Mínimo NENO"   value={<>12<small style={{ fontSize: 13, color: 'var(--text3)' }}> dias</small></>} delta="Meta de suficiência"    valueColor="var(--accent3)" />
        <MetricCard label="Bias Máx. Tolerado" value={<>5<small  style={{ fontSize: 13, color: 'var(--text3)' }}>%</small></>}   delta="Atual: 9% (acima)" deltaType="up" valueColor="var(--accent)" />
        <MetricCard label="Utiliz. Cap. NENO"  value={<>100<small style={{ fontSize: 13, color: 'var(--text3)' }}>%</small></>}  delta="Sem folga produtiva" deltaType="up" valueColor="var(--red)" />
        <MetricCard label="OTIF Meta"           value={<>95<small  style={{ fontSize: 13, color: 'var(--text3)' }}>%</small></>}  delta="On time in full"     valueColor="var(--accent3)" />
      </div>

      <div className="row">
        <Card label="Cadência S&OP Semanal" className="flex1">
          <table>
            <thead><tr><th>Dia</th><th>Reunião</th><th>Output</th></tr></thead>
            <tbody>
              {SAOP_ROWS.map((r) => (
                <tr key={r.dia}>
                  <td className="highlight">{r.dia}</td>
                  <td>{r.reuniao}</td>
                  <td>{r.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card label="Riscos Estruturais LP" className="flex1">
          {RISKS.map((r) => (
            <div key={r.title} className={`risk ${r.level}`}>
              <div className="risk-t">{r.title}</div>
              <div className="risk-d">{r.desc}</div>
            </div>
          ))}
        </Card>
      </div>

      <Card label="Evolução Histórica + Projeção LN NENO 2021–2026 (KHL)">
        <div className="cw" style={{ height: 180 }}>
          <Line data={evolChartData} options={evolChartOptions} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
          CAGR 2021–2025: ~+8,0% ao ano. A cada 100 KHL adicionais de demanda é necessária uma linha
          produtiva equivalente (~25 khl/mês de capacidade incremental).
        </div>
      </Card>
    </>
  )
}

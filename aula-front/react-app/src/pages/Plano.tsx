// pages/Plano.tsx
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { BadgeVariant } from '@/types'

const TL_ITEMS = [
  { color: 'var(--red)',     week: 'W0 — 02/02 · IMEDIATO', title: 'Acionamento emergencial',            desc: '• Rodoviário urgente para MAPAPI e NE Norte\n• Confirmar pedido firme Malzbier com GEOs\n• MAPAPI: DOI 8d → prioridade máxima' },
  { color: 'var(--accent)',  week: 'W1 — 09/02',             title: 'Produção NENO 100% + Cabo programada', desc: '• AQ541: 50 khl · NS541: 108 khl\n• Chegada cabotagem anterior no CDR Bahia\n• Monitorar sell-out real vs. projeção' },
  { color: 'var(--accent)',  week: 'W2 — 16/02',             title: 'Revisão demanda + Decisão março',    desc: '• Comparar real W1 vs. projeção\n• Se sell-out < 90%: reduzir transferências\n• Go/no-go para +10% TT LN março' },
  { color: 'var(--blue)',    week: 'W3 — 23/02',             title: 'Fechamento fev + Planejamento março', desc: '• DOI review todas GEOs (mín. 12d)\n• Se go março: acionar cabotagem imediato (25d)\n• Atualizar S&OP com cenário confirmado' },
  { color: 'var(--accent3)', week: 'W4+ — Março em diante',  title: 'Monitoramento e calibração',         desc: '• Review semanal bias por GEO\n• KPI de acurácia com penalização >5%\n• Avaliar 3ª linha produtiva NENO (LP)' },
]

interface ResponsRow { acao: string; resp: string; prazo: string; status: BadgeVariant; statusLbl: string }
const RESPONSABILIDADES: ResponsRow[] = [
  { acao: 'Confirmar pedido firme GEOs', resp: 'VP Vendas',    prazo: 'W0',   status: 'b-danger', statusLbl: 'Urgente' },
  { acao: 'Acionar rodo SPLNs',          resp: 'Planejamento', prazo: 'W0',   status: 'b-danger', statusLbl: 'Urgente' },
  { acao: 'Confirmar UB541 Araguaia',    resp: 'Logística',    prazo: 'W0',   status: 'b-warn',   statusLbl: 'A fazer' },
  { acao: 'Programar cabotagem fev',     resp: 'Planejamento', prazo: 'W0–1', status: 'b-warn',   statusLbl: 'A fazer' },
  { acao: 'DOI review MAPAPI',           resp: 'PCP NE',       prazo: 'W1',   status: 'b-warn',   statusLbl: 'A fazer' },
  { acao: 'Decisão go/no-go março',      resp: 'VP Vendas + Log', prazo: 'W2', status: 'b-neutral', statusLbl: 'Futuro' },
  { acao: 'KPI bias GEOs',               resp: 'S&OP',         prazo: 'Mar',  status: 'b-neutral', statusLbl: 'Futuro' },
]

export default function Plano() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Implementação</div>
          <div className="page-subtitle">Cronograma W0 → W4+ · Fevereiro–Março 2026</div>
        </div>
      </div>

      <div className="row">
        <Card label="Timeline de Execução" className="flex1">
          <div className="tl">
            {TL_ITEMS.map((item) => (
              <div key={item.week} className="tl-item">
                <div className="tl-dot" style={{ background: item.color }} />
                <div className="tl-w">{item.week}</div>
                <div className="tl-t">{item.title}</div>
                <div className="tl-d" style={{ whiteSpace: 'pre-line' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card label="Responsabilidades" className="flex1">
          <table>
            <thead>
              <tr><th>Ação</th><th>Responsável</th><th>Prazo</th><th>Status</th></tr>
            </thead>
            <tbody>
              {RESPONSABILIDADES.map((r) => (
                <tr key={r.acao}>
                  <td>{r.acao}</td>
                  <td>{r.resp}</td>
                  <td style={{ fontFamily: 'var(--font-m)', fontSize: 11 }}>{r.prazo}</td>
                  <td><Badge variant={r.status}>{r.statusLbl}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  )
}

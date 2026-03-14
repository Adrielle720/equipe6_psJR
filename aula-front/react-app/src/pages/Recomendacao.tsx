// pages/Recomendacao.tsx
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { BadgeVariant } from '@/types'

const REC_ITEMS = [
  'Aceitar o incremento de Malzbier Brahma para fevereiro, com confirmação de pedido firme das GEOs — vincular aprovação ao histórico de acurácia e penalizar bias >5% via KPI.',
  'Acionar cabotagem (SPLNs) para cobrir o GAP de 34 khl. Para volumes urgentes onde a janela de 25 dias foi perdida, usar rodoviário seletivo apenas nos SKUs de maior MACO.',
  'NÃO aceitar +10% TT LN em março sem revisão semanal do real. Acionar somente se W1/W2 de fevereiro confirmarem tendência acima da projeção base.',
  'Confirmar retirada de NO Araguaia via UB541 (Uberlândia) — menor custo logístico e alinhado ao acordo já firmado com revendedores.',
  'Monitorar MAPAPI semanalmente — DOI atual de 8 dias abaixo do mínimo de 12. Priorizar transferência interna do NO Centro para MAPAPI.',
]

const ANSWERS = [
  { level: 'risk-l', title: 'Devemos seguir com incentivos?',         desc: 'SIM, com pedido firme, vinculado ao MACO disponível e ao histórico de acurácia das GEOs.' },
  { level: 'risk-l', title: 'Plano de produção e transferência?',      desc: 'NENO a 100% (158 khl). Diferença 34 khl via SPLNs cabo → CDR Bahia / João Pessoa. Araguaia → UB541.' },
  { level: 'risk-m', title: 'Quanto vai custar?',                      desc: '~R$200–350k em transferências para fev. Resultado líquido estimado positivo de R$200–250k após MACO.' },
  { level: 'risk-m', title: 'Quais os riscos?',                        desc: 'Bias +9% → excesso · Lead time crítico → rodo emergencial · MAPAPI abaixo DOI · Goose Island trava NS541.' },
]

interface TransferRow {
  orig: string; dest: string; modal: string; vol: number; status: BadgeVariant; statusLbl: string
}
const TRANSFERS: TransferRow[] = [
  { orig: 'SPLNs (SP)', dest: 'CDR Bahia',     modal: 'Cabotagem',  vol: 18, status: 'b-warn',   statusLbl: 'Urgente' },
  { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Cabotagem',  vol: 10, status: 'b-warn',   statusLbl: 'Urgente' },
  { orig: 'SPLNs (SP)', dest: 'CDR J. Pessoa', modal: 'Rodoviário', vol:  6, status: 'b-danger', statusLbl: 'Emergencial' },
  { orig: 'UB541 (MG)', dest: 'NO Araguaia',   modal: 'Retirada',   vol:  1, status: 'b-ok',     statusLbl: 'Acordado' },
]

export default function Recomendacao() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Recomendação</div>
          <div className="page-subtitle">Resposta ao VP de Vendas e VP de Logística</div>
        </div>
      </div>

      <div className="rec-box">
        <h3>✓ Aceitar +30% Malzbier com condicionantes</h3>
        {REC_ITEMS.map((text, i) => (
          <div key={i} className="rec-item">
            <div className="rec-n">{i + 1}</div>
            <div dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
          </div>
        ))}
      </div>

      <div className="row">
        <Card label="Perguntas-Chave — Respostas" className="flex1">
          {ANSWERS.map((a) => (
            <div key={a.title} className={`risk ${a.level}`}>
              <div className="risk-t">{a.title}</div>
              <div className="risk-d">{a.desc}</div>
            </div>
          ))}
        </Card>

        <Card label="Plano de Transferência — Fevereiro" className="flex1">
          <table>
            <thead>
              <tr>
                <th>Origem</th><th>Destino</th><th>Modal</th>
                <th className="td-r">Vol. (khl)</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSFERS.map((t) => (
                <tr key={`${t.orig}-${t.dest}-${t.modal}`}>
                  <td>{t.orig}</td>
                  <td>{t.dest}</td>
                  <td>{t.modal}</td>
                  <td className="td-r">{t.vol}</td>
                  <td><Badge variant={t.status}>{t.statusLbl}</Badge></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <td colSpan={3}><b>Total</b></td>
                <td className="td-r" style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-m)' }}>
                  <b>{TRANSFERS.reduce((s, t) => s + t.vol, 0)} khl</b>
                </td>
                <td><Badge variant="b-blue">Exec.</Badge></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </>
  )
}

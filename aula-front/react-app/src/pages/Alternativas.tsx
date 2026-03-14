// pages/Alternativas.tsx
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { BadgeVariant } from '@/types'

interface AltCard {
  label: string
  badge: { variant: BadgeVariant; text: string }
  headline: string
  headlineColor: string
  borderColor: string
  rows: [string, string, string?][]
  note: string
}

const ALTS: AltCard[] = [
  {
    label: 'Cabotagem SPLNs',
    badge: { variant: 'b-ok', text: 'Preferencial' },
    headline: 'Custo Base',
    headlineColor: 'var(--accent3)',
    borderColor: 'rgba(62,207,142,0.2)',
    rows: [
      ['Modal',       'Cabotagem'],
      ['Lead time',   '25 dias'],
      ['vs. Rodo',    '-37%',          'var(--accent3)'],
      ['Risco avaria','Baixo'],
      ['Destino',     'CDR Bahia + J. Pessoa'],
    ],
    note: 'Janela de 25 dias para fev já crítica — acionar imediatamente para março.',
  },
  {
    label: 'Rodoviário SPLNs',
    badge: { variant: 'b-warn', text: 'Emergencial' },
    headline: 'Custo +60%',
    headlineColor: 'var(--accent2)',
    borderColor: 'rgba(255,107,43,0.2)',
    rows: [
      ['Modal',       'Rodoviário'],
      ['Lead time',   '6 dias',        'var(--accent3)'],
      ['vs. Cabo',    '+60%',          'var(--red)'],
      ['Risco avaria','+5%',           'var(--red)'],
      ['Destino',     'CDR Bahia + J. Pessoa'],
    ],
    note: 'Usar somente para volumes urgentes onde MACO > custo incremental.',
  },
  {
    label: 'UB541 Araguaia',
    badge: { variant: 'b-blue', text: 'Acordado' },
    headline: 'Custo Mínimo',
    headlineColor: 'var(--blue)',
    borderColor: 'rgba(74,158,255,0.2)',
    rows: [
      ['Origem',       'Uberlândia MG'],
      ['Retirada',     'Revendedor',    'var(--accent3)'],
      ['Frete',        'Por conta revend.', 'var(--accent3)'],
      ['Gestão estoque','Revendedor'],
      ['Atende',       'NO Araguaia 100%'],
    ],
    note: 'Araguaia = 100% revendedores. Acordo firmado para retirada em Uberlândia.',
  },
  {
    label: 'Rejeitar Incentivo',
    badge: { variant: 'b-danger', text: 'Não Recom.' },
    headline: 'Risco MS',
    headlineColor: 'var(--red)',
    borderColor: 'rgba(255,71,87,0.15)',
    rows: [
      ['Custo tranf.',    'Menor',         'var(--accent3)'],
      ['Risco ruptura',   'Médio',         'var(--accent)'],
      ['Market share',    'Perda potencial','var(--red)'],
      ['MACO perdido',    'Alto',          'var(--red)'],
      ['Competição',      'NE premium em ↑','var(--red)'],
    ],
    note: 'Custo de recuperação de MS tende a superar custo logístico extra.',
  },
]

export default function Alternativas() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Alternativas</div>
          <div className="page-subtitle">Opções de atendimento para o GAP de 34 khl</div>
        </div>
      </div>

      <div className="row">
        {ALTS.map((a) => (
          <div key={a.label} className="card flex1" style={{ borderColor: a.borderColor }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div className="card-label" style={{ margin: 0 }}>{a.label}</div>
              <Badge variant={a.badge.variant}>{a.badge.text}</Badge>
            </div>

            <div style={{ fontFamily: 'var(--font-h)', fontSize: 20, fontWeight: 800, color: a.headlineColor, marginBottom: 12 }}>
              {a.headline}
            </div>

            {a.rows.map(([k, v, c]) => (
              <div key={k} className="geo-row">
                <span>{k}</span>
                <span style={c ? { color: c } : undefined}>{v}</span>
              </div>
            ))}

            <hr />
            <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.6 }}>{a.note}</div>
          </div>
        ))}
      </div>
    </>
  )
}

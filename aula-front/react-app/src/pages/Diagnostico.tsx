// pages/Diagnostico.tsx
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const GEO_ROWS = [
  { geo: 'MAPAPI',      demanda: 2293,  ei: 3440,  sufIni: 9,  transf: '+2.795', ef: 3943,  sufFinal: 8,  status: 'b-danger' as const, lbl: 'Crítico' },
  { geo: 'NE Norte',    demanda: 2675,  ei: 6085,  sufIni: 14, transf: '+1.404', ef: 4814,  sufFinal: 12, status: 'b-ok'     as const, lbl: 'OK' },
  { geo: 'NE Sul',      demanda: 2066,  ei: 5464,  sufIni: 16, transf: '+915',   ef: 4312,  sufFinal: 12, status: 'b-ok'     as const, lbl: 'OK' },
  { geo: 'NO Araguaia', demanda: 114,   ei: 0,     sufIni: 0,  transf: '+114',   ef: 0,     sufFinal: 0,  status: 'b-blue'   as const, lbl: 'Revendedor' },
  { geo: 'NO Centro',   demanda: 1271,  ei: 4734,  sufIni: 22, transf: '-5.229', ef: 7120,  sufFinal: 28, status: 'b-warn'   as const, lbl: 'Exporta' },
]

const RISKS = [
  { level: 'risk-h', title: 'Goose Island — teto de brassagem', desc: 'NS541 no limite de elaboração de líquido em PE. Impossível aumentar sem nova brassagem.' },
  { level: 'risk-h', title: 'Demanda > Capacidade NENO',        desc: 'GAP cresce: 34 khl (fev) → 53 khl (mar). Dependência estrutural de transferências.' },
  { level: 'risk-m', title: 'Lead time cabotagem: 25 dias',     desc: 'Janela de fevereiro já perdida para cabotagem. Volume urgente exige rodoviário (+60%, +5% avaria).' },
  { level: 'risk-m', title: 'Bias +9% das GEOs',                desc: 'Superestimação sistemática nos últimos 3 meses. Aceitar +30% pode gerar excesso de estoque.' },
]

const sufColor = (d: number) => d < 12 ? 'var(--red)' : d >= 20 ? 'var(--accent)' : 'var(--accent3)'

export default function Diagnostico() {
  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Diagnóstico</div>
          <div className="page-subtitle">Capacidade vs. demanda · Restrições operacionais</div>
        </div>
      </div>

      <div className="row">
        {/* Capacity bars */}
        <Card className="flex1">
          <div className="card-label">Utilização de Capacidade — Fevereiro</div>

          {[
            { label: 'AQ541',  val: '50/50 khl',   color: 'var(--accent)', pct: 100 },
            { label: 'NS541',  val: '108/108 khl', color: 'var(--blue)',   pct: 100 },
          ].map((l) => (
            <div key={l.label}>
              <div className="prog-row">
                <div className="prog-label">{l.label}</div>
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${l.pct}%`, background: l.color }} />
                </div>
                <div className="prog-val" style={{ color: l.color }}>{l.val}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: 9, color: 'var(--red)', marginLeft: 98, marginBottom: 12 }}>
                100% — CHEIO
              </div>
            </div>
          ))}

          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>GAP a transferir (fev)</div>
            <div style={{ fontFamily: 'var(--font-h)', fontSize: 22, fontWeight: 800, color: 'var(--red)' }}>34 khl</div>
          </div>
          <div style={{ fontFamily: 'var(--font-m)', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
            = 192 – 158 khl · Deve vir de SPLNs / UB541
          </div>
        </Card>

        {/* Risks */}
        <Card label="Restrições Críticas" className="flex1">
          {RISKS.map((r) => (
            <div key={r.title} className={`risk ${r.level}`}>
              <div className="risk-t">{r.title}</div>
              <div className="risk-d">{r.desc}</div>
            </div>
          ))}
        </Card>
      </div>

      {/* Stock table */}
      <Card label="Estoque por GEO — W0 · 02/02/2026">
        <table>
          <thead>
            <tr>
              <th>GEO / REG</th>
              <th className="td-r">Demanda (hl)</th>
              <th className="td-r">EI Semana (hl)</th>
              <th className="td-r">Suf. Ini (d)</th>
              <th className="td-r">Transf. Interna</th>
              <th className="td-r">EF Semana (hl)</th>
              <th className="td-r">Suf. Final (d)</th>
              <th className="td-c">Status</th>
            </tr>
          </thead>
          <tbody>
            {GEO_ROWS.map((r) => (
              <tr key={r.geo}>
                <td className="highlight">{r.geo}</td>
                <td className="td-r">{r.demanda.toLocaleString('pt-BR')}</td>
                <td className="td-r">{r.ei.toLocaleString('pt-BR')}</td>
                <td className="td-r" style={{ color: sufColor(r.sufIni) }}>{r.sufIni}</td>
                <td className="td-r">{r.transf}</td>
                <td className="td-r">{r.ef.toLocaleString('pt-BR')}</td>
                <td className="td-r" style={{ color: sufColor(r.sufFinal) }}>{r.sufFinal || '—'}</td>
                <td className="td-c"><Badge variant={r.status}>{r.lbl}</Badge></td>
              </tr>
            ))}
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              <td className="highlight">TOTAL</td>
              <td className="td-r highlight">8.419</td>
              <td className="td-r highlight">19.724</td>
              <td className="td-r highlight">14</td>
              <td className="td-r highlight">0</td>
              <td className="td-r highlight">20.189</td>
              <td className="td-r highlight">13</td>
              <td className="td-c"><Badge variant="b-warn">DOI OK</Badge></td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 8, fontFamily: 'var(--font-m)' }}>
          DOI mínimo exigido: 12 dias · MAPAPI abaixo do limite (8d) · NO Araguaia: retirada direta em Uberlândia
        </div>
      </Card>
    </>
  )
}

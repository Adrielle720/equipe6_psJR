# Ambev · Long Neck NENO — React App

Dashboard de análise estratégica migrado de HTML/CSS/JS vanilla para **React 18 + TypeScript + Vite**.

---

## Estrutura de pastas

```
src/
├── main.tsx                      ← Entry point — monta React + importa CSS
├── App.tsx                       ← Shell: Sidebar + Topbar + roteamento condicional
│
├── styles/                       ← CSS puro (sem CSS Modules — usa variáveis globais)
│   ├── variables.css             ← Design tokens (cores, fontes, espaçamentos)
│   ├── base.css                  ← Reset, body, @keyframes
│   ├── layout.css                ← Sidebar, topbar, shell, transições de página
│   └── components.css            ← Cards, métricas, badges, tabelas, etc.
│
├── types/
│   └── index.ts                  ← PageId, ScenarioId, ForecastScenario, BadgeVariant…
│
├── data/
│   └── scenarios.ts              ← Os 3 cenários de previsão (base/otimista/conservador)
│
├── utils/
│   └── chartConfig.ts            ← Registra Chart.js + exporta ChartData/ChartOptions
│
├── hooks/
│   ├── useNavigation.ts          ← useState<PageId> + goTo
│   └── useForecast.ts            ← ScenarioId + bias + biasCalc memoizado
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           ← Nav lateral com ícones SVG inline
│   │   └── Topbar.tsx            ← Breadcrumb + pills de status + avatar
│   └── ui/
│       ├── Badge.tsx             ← Pill colorido por variant
│       ├── Card.tsx              ← Wrapper com label opcional
│       ├── MetricCard.tsx        ← KPI: label + valor grande + delta
│       ├── Alert.tsx             ← Banner amarelo/vermelho
│       └── DoiGauge.tsx          ← Barras de suficiência por GEO
│
└── pages/
    ├── Overview.tsx              ← Visão geral executiva
    ├── Diagnostico.tsx           ← Capacidade, restrições, tabela W0
    ├── AnaliseDemanda.tsx        ← Cenários, bias, gráfico histórico
    ├── Alternativas.tsx          ← 4 opções de atendimento do GAP
    ├── Comparacao.tsx            ← Matriz de decisão + gráfico de custo
    ├── Recomendacao.tsx          ← Respostas ao VP + plano de transferência
    ├── Plano.tsx                 ← Timeline W0→W4 + responsabilidades
    ├── OperacaoContinua.tsx      ← KPIs + S&OP + riscos LP
    └── Previsao.tsx              ← Previsão março: cenários + simulador de bias
```

---

## Rodando o projeto

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Para build de produção:
```bash
npm run build
npm run preview
```

---

## Decisões de arquitetura

| Decisão | Motivo |
|---|---|
| Vite + React + TS | Alinha com o `equipe6_psJR` existente (`.tsx` no repo) |
| CSS global (não CSS Modules) | Reutiliza os 4 arquivos CSS vanilla sem refactor |
| `react-chartjs-2` | Wrapper tipado do Chart.js — elimina manipulação manual de canvas |
| Roteamento condicional no `App.tsx` | Sem dependência de `react-router-dom` — simples e suficiente para SPA interna |
| Hooks dedicados por feature | `useNavigation` e `useForecast` isolam estado da UI dos componentes visuais |
| `data/scenarios.ts` separado | Dados puros fáceis de substituir por uma API real |
| Tipos em `types/index.ts` | Single source of truth para todos os contratos de dados |

---

## Próximos passos sugeridos

- [ ] Substituir `data/scenarios.ts` por chamada real à planilha (API ou arquivo `.xlsx` parseado)
- [ ] Adicionar `react-router-dom` se o app crescer para múltiplas rotas
- [ ] Extrair `Timeline.tsx` como componente reutilizável (usado em `Plano.tsx`)
- [ ] Adicionar testes com Vitest + Testing Library
- [ ] Dark/light mode toggle com `prefers-color-scheme`

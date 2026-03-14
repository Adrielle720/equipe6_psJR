// App.tsx
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { useNavigation } from '@/hooks/useNavigation'
import Overview from '@/pages/Overview'
import Diagnostico from '@/pages/Diagnostico'
import AnaliseDemanda from '@/pages/AnaliseDemanda'
import Alternativas from '@/pages/Alternativas'
import Comparacao from '@/pages/Comparacao'
import Recomendacao from '@/pages/Recomendacao'
import Plano from '@/pages/Plano'
import OperacaoContinua from '@/pages/OperacaoContinua'
import Previsao from '@/pages/Previsao'

export default function App() {
  const { activePage, goTo } = useNavigation()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activePage={activePage} goTo={goTo} />

      <div className="main">
        <Topbar activePage={activePage} />

        <div className="content">
          {activePage === 'overview'     && <Overview     goTo={goTo} activePage={activePage} />}
          {activePage === 'diagnostico'  && <Diagnostico  />}
          {activePage === 'demanda'      && <AnaliseDemanda />}
          {activePage === 'alternativas' && <Alternativas />}
          {activePage === 'comparacao'   && <Comparacao   />}
          {activePage === 'recomendacao' && <Recomendacao />}
          {activePage === 'plano'        && <Plano        />}
          {activePage === 'operacao'     && <OperacaoContinua />}
          {activePage === 'previsao'     && <Previsao     />}
        </div>
      </div>
    </div>
  )
}

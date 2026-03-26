'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import BarraEtapas from '@/components/configurador/BarraEtapas'
import PreviewCaderno from '@/components/configurador/PreviewCaderno'
import PainelOpcoes from '@/components/configurador/PainelOpcoes'

export default function PaginaConfigurador() {
  const { etapaAtual, avancarEtapa, voltarEtapa } = useCadernoStore()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="border-b border-creme-300 bg-white/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif text-marrom-500 leading-tight">
              Monte o Seu Caderno
            </h1>
            <p className="text-xs text-marrom-300 mt-0.5">
              Artesanal · 100% personalizado · Feito com amor
            </p>
          </div>
          <button
            className="botao-primario text-sm"
            onClick={() => alert('Em breve: envio do pedido via WhatsApp!')}
          >
            Finalizar Pedido
          </button>
        </div>
      </header>

      {/* Layout principal — 3 colunas em desktop */}
      <main className="flex flex-1 max-w-screen-xl mx-auto w-full">

        {/* COLUNA ESQUERDA: Etapas de navegação */}
        <aside className="hidden lg:flex w-56 xl:w-64 flex-shrink-0 border-r border-creme-300 bg-white/50">
          <BarraEtapas />
        </aside>

        {/* COLUNA CENTRAL: Preview do caderno */}
        <section className="flex-1 flex flex-col items-center justify-start bg-creme-100 py-8 px-4">
          {/* Etapas em mobile (dots) */}
          <div className="flex lg:hidden gap-2 mb-6">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  i + 1 === etapaAtual
                    ? 'bg-terracota-400'
                    : i + 1 < etapaAtual
                    ? 'bg-marrom-300'
                    : 'bg-creme-300'
                }`}
              />
            ))}
          </div>

          <PreviewCaderno />

          {/* Navegação entre etapas (mobile) */}
          <div className="flex lg:hidden gap-3 mt-6 w-full max-w-sm">
            <button
              className="botao-secundario flex-1 text-sm"
              onClick={voltarEtapa}
              disabled={etapaAtual === 1}
            >
              ← Voltar
            </button>
            <button
              className="botao-primario flex-1 text-sm"
              onClick={avancarEtapa}
              disabled={etapaAtual === 7}
            >
              Próximo →
            </button>
          </div>
        </section>

        {/* COLUNA DIREITA: Opções da etapa atual */}
        <aside className="w-80 xl:w-96 flex-shrink-0 border-l border-creme-300 bg-white/80 flex flex-col">
          <PainelOpcoes />

          {/* Navegação entre etapas (desktop) */}
          <div className="hidden lg:flex gap-2 p-4 border-t border-creme-300 bg-white/50">
            <button
              className="botao-secundario flex-1 text-sm"
              onClick={voltarEtapa}
              disabled={etapaAtual === 1}
            >
              ← Voltar
            </button>
            <button
              className="botao-primario flex-1 text-sm"
              onClick={avancarEtapa}
              disabled={etapaAtual === 7}
            >
              {etapaAtual === 7 ? 'Finalizar' : 'Próximo →'}
            </button>
          </div>
        </aside>
      </main>
    </div>
  )
}

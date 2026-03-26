'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import { ETAPAS } from '@/types/caderno'

export default function BarraEtapas() {
  const { etapaAtual, irParaEtapa } = useCadernoStore()

  return (
    <nav className="w-full py-6 px-4 flex flex-col gap-1">
      <p className="text-xs font-medium text-marrom-300 uppercase tracking-widest mb-4 px-2">
        Personalizações
      </p>

      {ETAPAS.map((etapa) => {
        const estaCompleta = etapa.numero < etapaAtual
        const estaAtiva = etapa.numero === etapaAtual

        return (
          <button
            key={etapa.numero}
            onClick={() => irParaEtapa(etapa.numero)}
            className={`
              w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200
              flex items-center gap-3 group
              ${estaAtiva
                ? 'bg-terracota-100 text-terracota-600 shadow-sm'
                : estaCompleta
                ? 'text-marrom-400 hover:bg-creme-100'
                : 'text-marrom-300 hover:bg-creme-100'
              }
            `}
          >
            {/* Indicador de número / check */}
            <span
              className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                flex-shrink-0 transition-all duration-200
                ${estaAtiva
                  ? 'bg-terracota-400 text-white'
                  : estaCompleta
                  ? 'bg-marrom-300 text-white'
                  : 'bg-creme-300 text-marrom-300'
                }
              `}
            >
              {estaCompleta ? '✓' : etapa.numero}
            </span>

            {/* Título e descrição */}
            <span className="min-w-0">
              <span
                className={`
                  block text-sm font-medium leading-tight
                  ${estaAtiva ? 'text-terracota-600' : estaCompleta ? 'text-marrom-400' : 'text-marrom-300'}
                `}
              >
                {etapa.titulo}
              </span>
              {estaAtiva && (
                <span className="block text-xs text-terracota-400 mt-0.5 leading-tight">
                  {etapa.descricao}
                </span>
              )}
            </span>
          </button>
        )
      })}

      {/* Progresso geral */}
      <div className="mt-6 px-2">
        <div className="flex justify-between text-xs text-marrom-300 mb-1.5">
          <span>Progresso</span>
          <span>{Math.round(((etapaAtual - 1) / 7) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-creme-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracota-400 rounded-full transition-all duration-500"
            style={{ width: `${((etapaAtual - 1) / 7) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  )
}

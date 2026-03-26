'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import type { TamanhosCaderno, FormatoCaderno, EspessuraCaderno } from '@/types/caderno'

const opcoesTamanho: { valor: TamanhosCaderno; label: string; descricao: string; dimensoes: string }[] = [
  { valor: 'A6', label: 'A6', descricao: 'De bolso', dimensoes: '10,5 × 14,8 cm' },
  { valor: 'A5', label: 'A5', descricao: 'Mais popular', dimensoes: '14,8 × 21 cm' },
  { valor: 'A4', label: 'A4', descricao: 'Folha cheia', dimensoes: '21 × 29,7 cm' },
  { valor: 'personalizado', label: 'Sob medida', descricao: 'Personalize', dimensoes: 'Fale conosco' },
]

const opcoesFormato: { valor: FormatoCaderno; label: string; icone: string }[] = [
  { valor: 'retrato', label: 'Retrato', icone: '🗒️' },
  { valor: 'paisagem', label: 'Paisagem', icone: '📋' },
  { valor: 'quadrado', label: 'Quadrado', icone: '⬛' },
]

const opcoesEspessura: { valor: EspessuraCaderno; label: string; folhas: string }[] = [
  { valor: 'fino', label: 'Fino', folhas: '~40 folhas' },
  { valor: 'medio', label: 'Médio', folhas: '~80 folhas' },
  { valor: 'grosso', label: 'Grosso', folhas: '~120 folhas' },
  { valor: 'extra-grosso', label: 'Extra grosso', folhas: '~160 folhas' },
]

export default function EtapaTamanho() {
  const { configuracao, atualizarOpcao } = useCadernoStore()

  return (
    <div className="flex flex-col gap-6">
      {/* Tamanho */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Tamanho</h3>
        <div className="grid grid-cols-2 gap-2">
          {opcoesTamanho.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('tamanho', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.tamanho === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-base font-serif font-semibold text-marrom-500">
                {opcao.label}
              </span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
              <span className="block text-xs text-marrom-400 mt-1 font-mono">{opcao.dimensoes}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Formato */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Orientação</h3>
        <div className="flex gap-2">
          {opcoesFormato.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('formato', opcao.valor)}
              className={`cartao-opcao flex-1 text-center transition-all duration-200 ${
                configuracao.formato === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-xl mb-1">{opcao.icone}</span>
              <span className="block text-xs font-medium text-marrom-400">{opcao.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Espessura */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Espessura</h3>
        <div className="flex flex-col gap-2">
          {opcoesEspessura.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('espessura', opcao.valor)}
              className={`cartao-opcao flex items-center justify-between transition-all duration-200 ${
                configuracao.espessura === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="flex items-center gap-2">
                {/* Ícone visual de espessura */}
                <span
                  className="inline-block bg-marrom-400 rounded-sm"
                  style={{
                    width: '4px',
                    height: opcao.valor === 'fino' ? '14px' : opcao.valor === 'medio' ? '20px' : opcao.valor === 'grosso' ? '28px' : '36px',
                  }}
                />
                <span className="text-sm font-medium text-marrom-400">{opcao.label}</span>
              </span>
              <span className="text-xs text-marrom-300">{opcao.folhas}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import { CORES_FIO_PADRAO } from '@/types/caderno'
import type { TipoEncadernacao, TipoLombada, TipoAbertura } from '@/types/caderno'

const opcoesEncadernacao: {
  valor: TipoEncadernacao
  label: string
  descricao: string
  icone: string
}[] = [
  {
    valor: 'copta',
    label: 'Copta',
    descricao: 'Costura tradicional, muito resistente. Lombada exposta com padrão de pontos',
    icone: '📚',
  },
  {
    valor: 'japonesa',
    label: 'Japonesa',
    descricao: 'Costura delicada pela lateral. Muito elegante e marcante',
    icone: '🗾',
  },
  {
    valor: 'long-stitch',
    label: 'Long Stitch',
    descricao: 'Costura longa aparente. Visual moderno e artístico',
    icone: '🧵',
  },
  {
    valor: 'espiral',
    label: 'Espiral',
    descricao: 'Abre 360°, ideal para planners e cadernos de estudos',
    icone: '🌀',
  },
]

const opcoesLombada: { valor: TipoLombada; label: string; descricao: string }[] = [
  { valor: 'exposta', label: 'Lombada exposta', descricao: 'A costura fica visível — visual artesanal único' },
  { valor: 'protegida', label: 'Lombada protegida', descricao: 'Capa cobre a costura — aparência mais clean' },
]

const opcoesAbertura: { valor: TipoAbertura; label: string; descricao: string }[] = [
  { valor: '180-graus', label: 'Abertura 180°', descricao: 'Abre completamente plano — ideal para escrever' },
  { valor: 'tradicional', label: 'Abertura tradicional', descricao: 'Abertura padrão — mais compacto' },
]

export default function EtapaEncadernacao() {
  const { configuracao, atualizarOpcao } = useCadernoStore()

  return (
    <div className="flex flex-col gap-6">
      {/* Tipo de encadernação */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Tipo de costura</h3>
        <div className="flex flex-col gap-2">
          {opcoesEncadernacao.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('tipoEncadernacao', opcao.valor)}
              className={`cartao-opcao text-left flex items-start gap-3 transition-all duration-200 ${
                configuracao.tipoEncadernacao === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{opcao.icone}</span>
              <span>
                <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
                <span className="block text-xs text-marrom-300 mt-0.5 leading-relaxed">{opcao.descricao}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lombada */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Lombada</h3>
        <div className="flex flex-col gap-2">
          {opcoesLombada.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('tipoLombada', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.tipoLombada === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de abertura */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Tipo de abertura</h3>
        <div className="flex flex-col gap-2">
          {opcoesAbertura.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('tipoAbertura', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.tipoAbertura === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cor do fio */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Cor do fio de costura</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {CORES_FIO_PADRAO.map((cor) => (
            <button
              key={cor.hex}
              title={cor.nome}
              onClick={() => atualizarOpcao('corFio', cor.hex)}
              className={`seletor-cor border ${configuracao.corFio === cor.hex ? 'seletor-cor-selecionado' : ''}`}
              style={{
                backgroundColor: cor.hex,
                border: cor.hex === '#FFFFFF' ? '2px solid #E8D5B7' : undefined,
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-marrom-300">Cor personalizada:</label>
          <input
            type="color"
            value={configuracao.corFio}
            onChange={(e) => atualizarOpcao('corFio', e.target.value)}
            className="w-7 h-7 rounded cursor-pointer border border-creme-300"
          />
          <span className="text-xs font-mono text-marrom-300">{configuracao.corFio}</span>
        </div>
      </div>
    </div>
  )
}

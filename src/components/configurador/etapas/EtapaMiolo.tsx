'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import type { TipoPapelMiolo, GraturaPapel, CorFolhas, PadraoPaginas } from '@/types/caderno'

const opcoesPapel: { valor: TipoPapelMiolo; label: string; descricao: string }[] = [
  { valor: 'offset', label: 'Offset', descricao: 'O mais comum, leve e branco' },
  { valor: 'polen', label: 'Pólen', descricao: 'Creme, confortável para leitura' },
  { valor: 'reciclado', label: 'Reciclado', descricao: 'Ecológico, texturizado' },
  { valor: 'vegetal', label: 'Vegetal', descricao: 'Translúcido, especial' },
]

const opcoesGratura: { valor: GraturaPapel; label: string; descricao: string }[] = [
  { valor: '90g', label: '90g', descricao: 'Leve, econômico' },
  { valor: '120g', label: '120g', descricao: 'Equilibrado, popular' },
  { valor: '180g', label: '180g', descricao: 'Espesso, resist. à caneta' },
  { valor: '240g', label: '240g', descricao: 'Premium, aquarela' },
]

const opcoesCorFolhas: { valor: CorFolhas; label: string; cor: string; descricao: string }[] = [
  { valor: 'branca', label: 'Branca', cor: '#FAFAF8', descricao: 'Clássica' },
  { valor: 'creme', label: 'Creme', cor: '#F5F0E0', descricao: 'Aconchegante' },
  { valor: 'colorida', label: 'Colorida', cor: '#E8F0D8', descricao: 'Especial' },
]

const opcoesPadrao: { valor: PadraoPaginas; label: string; icone: string; descricao: string }[] = [
  { valor: 'liso', label: 'Liso', icone: '⬜', descricao: 'Para desenho e escrita livre' },
  { valor: 'pautado', label: 'Pautado', icone: '≡', descricao: 'Linhas horizontais' },
  { valor: 'pontilhado', label: 'Pontilhado', icone: '···', descricao: 'Grid discreto' },
  { valor: 'quadriculado', label: 'Quadriculado', icone: '⊞', descricao: 'Grade completa' },
]

export default function EtapaMiolo() {
  const { configuracao, atualizarOpcao } = useCadernoStore()

  return (
    <div className="flex flex-col gap-6">
      {/* Tipo de papel */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Tipo de papel</h3>
        <div className="grid grid-cols-2 gap-2">
          {opcoesPapel.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('tipoPapel', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.tipoPapel === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gramatura */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Gramatura do papel</h3>
        <div className="grid grid-cols-2 gap-2">
          {opcoesGratura.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('graturaPapel', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.graturaPapel === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-base font-bold font-mono text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cor das folhas */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Cor das folhas</h3>
        <div className="flex gap-2">
          {opcoesCorFolhas.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('corFolhas', opcao.valor)}
              className={`flex-1 cartao-opcao text-center transition-all duration-200 ${
                configuracao.corFolhas === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span
                className="block w-8 h-8 rounded-full mx-auto mb-1.5 border border-creme-300"
                style={{ backgroundColor: opcao.cor }}
              />
              <span className="block text-xs font-medium text-marrom-400">{opcao.label}</span>
              <span className="block text-xs text-marrom-300">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Padrão das páginas */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Padrão das páginas</h3>
        <div className="grid grid-cols-2 gap-2">
          {opcoesPadrao.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('padraoPaginas', opcao.valor)}
              className={`cartao-opcao text-center transition-all duration-200 ${
                configuracao.padraoPaginas === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-xl mb-1">{opcao.icone}</span>
              <span className="block text-xs font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Extras do miolo */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Extras do miolo</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={configuracao.impressoesInternas}
              onChange={(e) => atualizarOpcao('impressoesInternas', e.target.checked)}
              className="w-4 h-4 accent-terracota-400"
            />
            <span>
              <span className="block text-sm text-marrom-500 group-hover:text-marrom-600">
                Impressões internas personalizadas
              </span>
              <span className="block text-xs text-marrom-300">Layouts, datas ou imagens no miolo</span>
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={configuracao.divisoriasInternas}
              onChange={(e) => atualizarOpcao('divisoriasInternas', e.target.checked)}
              className="w-4 h-4 accent-terracota-400"
            />
            <span>
              <span className="block text-sm text-marrom-500 group-hover:text-marrom-600">
                Divisórias ou seções temáticas
              </span>
              <span className="block text-xs text-marrom-300">Separadores internos coloridos</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

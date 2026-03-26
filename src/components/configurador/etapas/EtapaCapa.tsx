'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import { CORES_CAPA_PADRAO } from '@/types/caderno'
import type { MaterialCapa, EstampaCapa, GravacaoCapa, AplicacaoCapa } from '@/types/caderno'

const opcoesMaterial: { valor: MaterialCapa; label: string; descricao: string }[] = [
  { valor: 'couro', label: 'Couro', descricao: 'Natural, durável' },
  { valor: 'sintetico', label: 'Sintético', descricao: 'Vegano, resistente' },
  { valor: 'tecido', label: 'Tecido', descricao: 'Suave, colorido' },
  { valor: 'papel-especial', label: 'Papel Especial', descricao: 'Elegante, leve' },
  { valor: 'kraft', label: 'Kraft', descricao: 'Rústico, natural' },
  { valor: 'linho', label: 'Linho', descricao: 'Texturizado, chic' },
]

const opcoesEstampa: { valor: EstampaCapa; label: string }[] = [
  { valor: 'nenhuma', label: 'Sem estampa' },
  { valor: 'floral', label: 'Floral' },
  { valor: 'minimalista', label: 'Minimalista' },
  { valor: 'abstrata', label: 'Abstrata' },
  { valor: 'tematica', label: 'Temática' },
]

const opcoesGravacao: { valor: GravacaoCapa; label: string; descricao: string }[] = [
  { valor: 'nenhuma', label: 'Sem gravação', descricao: 'Capa lisa' },
  { valor: 'baixo-relevo', label: 'Baixo relevo', descricao: 'Sutil, elegante' },
  { valor: 'alto-relevo', label: 'Alto relevo', descricao: 'Marcante' },
  { valor: 'bordado', label: 'Bordado', descricao: 'Artesanal' },
]

const opcoesAplicacao: { valor: AplicacaoCapa; label: string; icone: string }[] = [
  { valor: 'renda', label: 'Renda', icone: '🕸️' },
  { valor: 'botoes', label: 'Botões', icone: '🔘' },
  { valor: 'metais', label: 'Metais', icone: '⚡' },
  { valor: 'recortes', label: 'Recortes', icone: '✂️' },
]

export default function EtapaCapa() {
  const { configuracao, atualizarOpcao, toggleAplicacaoCapa } = useCadernoStore()

  return (
    <div className="flex flex-col gap-6">
      {/* Material */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Material da capa</h3>
        <div className="grid grid-cols-2 gap-2">
          {opcoesMaterial.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('materialCapa', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.materialCapa === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cor */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Cor da capa</h3>
        <div className="flex flex-wrap gap-2">
          {CORES_CAPA_PADRAO.map((cor) => (
            <button
              key={cor.hex}
              title={cor.nome}
              onClick={() => atualizarOpcao('corCapa', cor.hex)}
              className={`seletor-cor ${configuracao.corCapa === cor.hex ? 'seletor-cor-selecionado' : ''}`}
              style={{ backgroundColor: cor.hex }}
            />
          ))}
        </div>
        {/* Seletor de cor personalizada */}
        <div className="flex items-center gap-2 mt-3">
          <label className="text-xs text-marrom-300">Cor personalizada:</label>
          <input
            type="color"
            value={configuracao.corCapa}
            onChange={(e) => atualizarOpcao('corCapa', e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-creme-300"
          />
          <span className="text-xs font-mono text-marrom-300">{configuracao.corCapa}</span>
        </div>
      </div>

      {/* Estampa */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Estampa</h3>
        <div className="flex flex-wrap gap-2">
          {opcoesEstampa.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('estampaCapa', opcao.valor)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                configuracao.estampaCapa === opcao.valor
                  ? 'border-terracota-400 bg-terracota-100 text-terracota-600'
                  : 'border-creme-300 text-marrom-400 hover:border-creme-400'
              }`}
            >
              {opcao.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gravação */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Gravação / Personalização</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {opcoesGravacao.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('gravacaoCapa', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.gravacaoCapa === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
            </button>
          ))}
        </div>

        {/* Campo de texto para nome gravado */}
        {configuracao.gravacaoCapa !== 'nenhuma' && (
          <div className="mt-2">
            <label className="block text-xs text-marrom-400 mb-1">
              Nome, iniciais ou frase para gravar:
            </label>
            <input
              type="text"
              value={configuracao.nomeGravado}
              onChange={(e) => atualizarOpcao('nomeGravado', e.target.value)}
              placeholder="Ex: Ana Carolina · AC · carpe diem"
              maxLength={40}
              className="w-full border border-creme-300 rounded-lg px-3 py-2 text-sm text-marrom-500
                         placeholder:text-marrom-200 focus:outline-none focus:border-terracota-300
                         bg-white transition-colors duration-200"
            />
            <p className="text-xs text-marrom-200 mt-1 text-right">
              {configuracao.nomeGravado.length}/40
            </p>
          </div>
        )}
      </div>

      {/* Aplicações extras */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Aplicações extras (opcional)</h3>
        <div className="flex gap-2 flex-wrap">
          {opcoesAplicacao.map((opcao) => {
            const estaSelecionado = configuracao.aplicacoesCapa.includes(opcao.valor)
            return (
              <button
                key={opcao.valor}
                onClick={() => toggleAplicacaoCapa(opcao.valor)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  estaSelecionado
                    ? 'border-terracota-400 bg-terracota-100 text-terracota-600'
                    : 'border-creme-300 text-marrom-400 hover:border-creme-400'
                }`}
              >
                <span>{opcao.icone}</span>
                <span>{opcao.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

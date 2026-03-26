'use client'

import { useCadernoStore } from '@/store/useCadernoStore'
import type { TemaCaderno, ProposicaoCaderno } from '@/types/caderno'

const opcoesTema: { valor: TemaCaderno; label: string; icone: string; descricao: string }[] = [
  { valor: 'nenhum', label: 'Sem tema', icone: '✨', descricao: 'Caderno versátil, universal' },
  { valor: 'maternidade', label: 'Maternidade', icone: '🌸', descricao: 'Para mamães e bebês' },
  { valor: 'viagens', label: 'Viagens', icone: '✈️', descricao: 'Para registrar aventuras' },
  { valor: 'gratidao', label: 'Gratidão', icone: '💛', descricao: 'Diário de gratidão diário' },
  { valor: 'estudos', label: 'Estudos', icone: '📚', descricao: 'Otimizado para aprender' },
]

const opcoesProposito: { valor: ProposicaoCaderno; label: string; icone: string; descricao: string }[] = [
  { valor: 'escrita-livre', label: 'Escrita livre', icone: '✍️', descricao: 'Para escrever o que vier' },
  { valor: 'diario', label: 'Diário pessoal', icone: '🔒', descricao: 'Registros do dia a dia' },
  { valor: 'planner', label: 'Planner', icone: '📅', descricao: 'Organização e produtividade' },
  { valor: 'memorias', label: 'Livro de memórias', icone: '📸', descricao: 'Fotos, colagens, lembranças' },
  { valor: 'profissional-estudos', label: 'Profissional/Estudos', icone: '💼', descricao: 'Trabalho e aprendizado' },
]

export default function EtapaExtras() {
  const { configuracao, atualizarOpcao } = useCadernoStore()

  return (
    <div className="flex flex-col gap-6">
      {/* Propósito do caderno */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Propósito do caderno</h3>
        <div className="flex flex-col gap-2">
          {opcoesProposito.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('proposicaoCaderno', opcao.valor)}
              className={`cartao-opcao flex items-center gap-3 text-left transition-all duration-200 ${
                configuracao.proposicaoCaderno === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="text-xl flex-shrink-0">{opcao.icone}</span>
              <span>
                <span className="block text-sm font-medium text-marrom-500">{opcao.label}</span>
                <span className="block text-xs text-marrom-300 mt-0.5">{opcao.descricao}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tema especial */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Tema especial</h3>
        <div className="grid grid-cols-2 gap-2">
          {opcoesTema.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => atualizarOpcao('temaCaderno', opcao.valor)}
              className={`cartao-opcao text-left transition-all duration-200 ${
                configuracao.temaCaderno === opcao.valor ? 'cartao-opcao-selecionado' : ''
              }`}
            >
              <span className="block text-xl mb-1">{opcao.icone}</span>
              <span className="block text-xs font-medium text-marrom-500">{opcao.label}</span>
              <span className="block text-xs text-marrom-300 mt-0.5 leading-tight">{opcao.descricao}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toques afetivos */}
      <div>
        <h3 className="text-sm font-medium text-marrom-400 mb-3">Toques afetivos</h3>
        <div className="flex flex-col gap-2">
          {[
            {
              campo: 'paginaDedicatoria' as const,
              label: 'Página de dedicatória',
              descricao: 'Espaço para escrever uma mensagem especial no início',
              icone: '💌',
            },
            {
              campo: 'frasesAoLongo' as const,
              label: 'Frases ao longo do caderno',
              descricao: 'Citações inspiradoras espalhadas pelas páginas',
              icone: '💬',
            },
            {
              campo: 'datasImportantes' as const,
              label: 'Datas importantes marcadas',
              descricao: 'Aniversários, comemorações e eventos no miolo',
              icone: '📅',
            },
            {
              campo: 'essenciaNoParapel' as const,
              label: 'Essência sutil no papel',
              descricao: 'Um aroma delicado e especial nas páginas',
              icone: '🌸',
            },
          ].map((item) => (
            <label key={item.campo} className="flex items-center gap-3 cursor-pointer group p-2.5 rounded-xl hover:bg-creme-100 transition-colors">
              <input
                type="checkbox"
                checked={configuracao[item.campo]}
                onChange={(e) => atualizarOpcao(item.campo, e.target.checked)}
                className="w-4 h-4 accent-terracota-400 flex-shrink-0"
              />
              <span className="text-xl flex-shrink-0">{item.icone}</span>
              <span>
                <span className="block text-sm text-marrom-500">{item.label}</span>
                <span className="block text-xs text-marrom-300 mt-0.5 leading-relaxed">{item.descricao}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Resumo do pedido */}
      <div className="rounded-xl bg-terracota-100 border border-terracota-200 p-4">
        <h3 className="text-sm font-serif text-terracota-600 mb-3 font-semibold">
          🎉 Seu caderno está quase pronto!
        </h3>
        <ul className="text-xs text-terracota-500 space-y-1.5">
          <li>✓ Tamanho: <strong>{configuracao.tamanho}</strong> · {configuracao.formato} · {configuracao.espessura}</li>
          <li>✓ Capa: <strong>{configuracao.materialCapa}</strong> com {configuracao.gravacaoCapa !== 'nenhuma' ? configuracao.gravacaoCapa : 'sem gravação'}</li>
          <li>✓ Encadernação: <strong>{configuracao.tipoEncadernacao}</strong> · fio cor {configuracao.corFio}</li>
          <li>✓ Miolo: <strong>{configuracao.tipoPapel}</strong> {configuracao.graturaPapel} · {configuracao.padraoPaginas}</li>
          {configuracao.elasticoAtivo && <li>✓ Elástico <strong>{configuracao.posicaoElastico}</strong></li>}
          {configuracao.marcadorAtivo && <li>✓ Marcador: <strong>{configuracao.tipoMarcador}</strong></li>}
          {configuracao.proposicaoCaderno !== 'escrita-livre' && (
            <li>✓ Propósito: <strong>{configuracao.proposicaoCaderno}</strong></li>
          )}
        </ul>
        <button
          className="botao-primario w-full mt-4 text-sm"
          onClick={() => alert('Em breve: envio do pedido via WhatsApp! 🎉')}
        >
          Finalizar e Enviar Pedido
        </button>
      </div>
    </div>
  )
}

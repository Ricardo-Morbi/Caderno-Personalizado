'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCadernoStore } from '@/store/useCadernoStore'
import { ETAPAS } from '@/types/caderno'

import EtapaTamanho from './etapas/EtapaTamanho'
import EtapaCapa from './etapas/EtapaCapa'
import EtapaEncadernacao from './etapas/EtapaEncadernacao'
import EtapaMiolo from './etapas/EtapaMiolo'
import EtapaElementosFuncionais from './etapas/EtapaElementosFuncionais'
import EtapaAcabamentos from './etapas/EtapaAcabamentos'
import EtapaExtras from './etapas/EtapaExtras'

const COMPONENTES_ETAPA: Record<number, React.ComponentType> = {
  1: EtapaTamanho,
  2: EtapaCapa,
  3: EtapaEncadernacao,
  4: EtapaMiolo,
  5: EtapaElementosFuncionais,
  6: EtapaAcabamentos,
  7: EtapaExtras,
}

export default function PainelOpcoes() {
  const { etapaAtual } = useCadernoStore()

  const etapaInfo = ETAPAS.find((e) => e.numero === etapaAtual)
  const ComponenteEtapa = COMPONENTES_ETAPA[etapaAtual]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Cabeçalho do painel */}
      <div className="px-5 py-4 border-b border-creme-300 bg-white/60">
        <div className="flex items-center gap-2">
          <span className="text-xl">{etapaInfo?.icone}</span>
          <div>
            <p className="text-xs text-marrom-300 uppercase tracking-wider">
              Etapa {etapaAtual} de 7
            </p>
            <h2 className="text-base font-serif text-marrom-500 leading-tight">
              {etapaInfo?.titulo}
            </h2>
          </div>
        </div>
      </div>

      {/* Conteúdo da etapa — animado */}
      <div className="flex-1 overflow-y-auto scrollbar-fino">
        <AnimatePresence mode="wait">
          <motion.div
            key={etapaAtual}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="px-5 py-5"
          >
            {ComponenteEtapa && <ComponenteEtapa />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

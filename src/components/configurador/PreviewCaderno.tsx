'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCadernoStore } from '@/store/useCadernoStore'

// Dimensões base para cada tamanho (proporção visual)
const DIMENSOES_POR_TAMANHO = {
  A6: { largura: 148, altura: 210 },
  A5: { largura: 148, altura: 210 },
  A4: { largura: 148, altura: 210 },
  personalizado: { largura: 148, altura: 210 },
}

// Proporções reais aplicadas ao preview
const PROPORCAO_POR_FORMATO = {
  retrato: { fatorLargura: 1, fatorAltura: 1.4 },
  paisagem: { fatorLargura: 1.4, fatorAltura: 1 },
  quadrado: { fatorLargura: 1, fatorAltura: 1 },
}

const ESPESSURA_POR_TIPO = {
  fino: 14,
  medio: 22,
  grosso: 32,
  'extra-grosso': 44,
}

// Padrão SVG para diferentes materiais da capa
function padraoMaterial(material: string, corCapa: string) {
  switch (material) {
    case 'linho':
      return (
        <pattern id="linho" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="4" stroke={`${corCapa}55`} strokeWidth="0.5" />
          <line x1="4" y1="0" x2="0" y2="4" stroke={`${corCapa}55`} strokeWidth="0.5" />
        </pattern>
      )
    case 'tecido':
      return (
        <pattern id="tecido" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill={`${corCapa}22`} />
          <rect x="3" y="3" width="3" height="3" fill={`${corCapa}22`} />
        </pattern>
      )
    case 'kraft':
      return (
        <pattern id="kraft" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.8" fill={`${corCapa}33`} />
        </pattern>
      )
    default:
      return null
  }
}

// Padrão interno para as páginas
function padraoPagina(padrao: string) {
  switch (padrao) {
    case 'pautado':
      return Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1="8"
          y1={24 + i * 14}
          x2="92"
          y2={24 + i * 14}
          stroke="#C4A08A"
          strokeWidth="0.5"
          opacity="0.6"
        />
      ))
    case 'pontilhado':
      return Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={12 + col * 11}
            cy={24 + row * 14}
            r="0.8"
            fill="#C4A08A"
            opacity="0.5"
          />
        ))
      ).flat()
    case 'quadriculado':
      return (
        <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#C4A08A" strokeWidth="0.4" opacity="0.5" />
        </pattern>
      )
    default:
      return null
  }
}

export default function PreviewCaderno() {
  const { configuracao } = useCadernoStore()

  const {
    tamanho,
    formato,
    espessura,
    corCapa,
    materialCapa,
    estampaCapa,
    tipoEncadernacao,
    tipoLombada,
    elasticoAtivo,
    corElastico,
    posicaoElastico,
    marcadorAtivo,
    corMarcador,
    corFio,
    tipoCantos,
    pinturaBordasAtiva,
    corPinturaBordas,
    padraoPaginas,
    corFolhas,
  } = configuracao

  const proporcao = PROPORCAO_POR_FORMATO[formato]
  const espessuraLombada = ESPESSURA_POR_TIPO[espessura]

  // Dimensões do preview do caderno
  const larguraCapa = 148 * proporcao.fatorLargura
  const alturaCapa = 148 * proporcao.fatorAltura

  // Cor interna das páginas
  const corFolhasMap = {
    branca: '#FAFAF8',
    creme: '#F5F0E0',
    colorida: '#E8F0D8',
  }
  const corInternaFolhas = corFolhasMap[corFolhas]

  // Raio dos cantos
  const raioCanto = tipoCantos === 'arredondados' ? 8 : 2

  // Cor de borda das páginas (pintura nas bordas)
  const corBordaPages = pinturaBordasAtiva ? corPinturaBordas : corInternaFolhas

  const viewBoxLargura = larguraCapa + espessuraLombada + 80
  const viewBoxAltura = alturaCapa + 80

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Label da etapa atual */}
      <div className="text-center">
        <p className="text-xs text-marrom-300 uppercase tracking-widest">Seu caderno</p>
        <p className="text-sm font-medium text-marrom-400 mt-0.5">
          {tamanho} · {formato} · {espessura}
        </p>
      </div>

      {/* Preview SVG do caderno */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          filter: 'drop-shadow(8px 12px 32px rgba(61, 43, 31, 0.2)) drop-shadow(2px 4px 12px rgba(61, 43, 31, 0.12))',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.svg
            key={`${tamanho}-${formato}-${espessura}`}
            viewBox={`0 0 ${viewBoxLargura} ${viewBoxAltura}`}
            width={Math.min(viewBoxLargura * 1.8, 380)}
            height={Math.min(viewBoxAltura * 1.8, 420)}
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <defs>
              {padraoMaterial(materialCapa, corCapa)}
              {padraoPaginas === 'quadriculado' && (
                <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#C4A08A" strokeWidth="0.4" opacity="0.5" />
                </pattern>
              )}
            </defs>

            {/* === MIOLO (páginas empilhadas) === */}
            <motion.rect
              x={espessuraLombada + 42}
              y={36}
              width={larguraCapa - 4}
              height={alturaCapa}
              rx={raioCanto}
              ry={raioCanto}
              fill={corBordaPages}
              animate={{ fill: corBordaPages }}
              transition={{ duration: 0.3 }}
            />
            <motion.rect
              x={espessuraLombada + 40}
              y={34}
              width={larguraCapa - 4}
              height={alturaCapa}
              rx={raioCanto}
              ry={raioCanto}
              fill={corInternaFolhas}
              animate={{ fill: corInternaFolhas }}
              transition={{ duration: 0.3 }}
            />

            {/* Linhas internas (padrão de páginas) */}
            <g transform={`translate(${espessuraLombada + 40}, 34)`}>
              {padraoPaginas === 'quadriculado' ? (
                <rect width={larguraCapa - 4} height={alturaCapa} fill="url(#grid)" rx={raioCanto} />
              ) : (
                padraoPagina(padraoPaginas)
              )}
            </g>

            {/* === LOMBADA === */}
            <motion.rect
              x={38}
              y={32}
              width={espessuraLombada}
              height={alturaCapa + 4}
              rx={tipoLombada === 'exposta' ? 3 : 0}
              fill={tipoLombada === 'exposta' ? 'transparent' : corCapa}
              stroke={tipoEncadernacao !== 'espiral' ? corFio : 'none'}
              strokeWidth={tipoLombada === 'exposta' ? 0 : 0}
              animate={{
                fill: tipoLombada === 'exposta' ? 'transparent' : corCapa,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Costura aparente (para copta, japonesa, long-stitch) */}
            {tipoLombada === 'exposta' && tipoEncadernacao !== 'espiral' && (
              <g>
                {tipoEncadernacao === 'copta' &&
                  Array.from({ length: Math.floor(alturaCapa / 18) }, (_, i) => (
                    <line
                      key={i}
                      x1={38}
                      y1={40 + i * 18}
                      x2={38 + espessuraLombada}
                      y2={40 + i * 18}
                      stroke={corFio}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ))
                }
                {tipoEncadernacao === 'japonesa' &&
                  Array.from({ length: Math.floor(alturaCapa / 12) }, (_, i) => (
                    <g key={i}>
                      <line
                        x1={38}
                        y1={38 + i * 12}
                        x2={38 + espessuraLombada}
                        y2={38 + i * 12}
                        stroke={corFio}
                        strokeWidth="1"
                      />
                      {i % 2 === 0 && (
                        <line
                          x1={42}
                          y1={38 + i * 12}
                          x2={42}
                          y2={38 + (i + 1) * 12}
                          stroke={corFio}
                          strokeWidth="1"
                        />
                      )}
                    </g>
                  ))
                }
                {tipoEncadernacao === 'long-stitch' &&
                  Array.from({ length: Math.floor(alturaCapa / 22) }, (_, i) => (
                    <g key={i}>
                      <line
                        x1={38}
                        y1={38 + i * 22}
                        x2={38 + espessuraLombada}
                        y2={38 + i * 22}
                        stroke={corFio}
                        strokeWidth="1.5"
                      />
                      <line
                        x1={38 + espessuraLombada / 2}
                        y1={38 + i * 22}
                        x2={38 + espessuraLombada / 2}
                        y2={38 + (i + 1) * 22}
                        stroke={corFio}
                        strokeWidth="1"
                      />
                    </g>
                  ))
                }
              </g>
            )}

            {/* Espiral */}
            {tipoEncadernacao === 'espiral' &&
              Array.from({ length: Math.floor(alturaCapa / 14) }, (_, i) => (
                <ellipse
                  key={i}
                  cx={38 + espessuraLombada / 2}
                  cy={40 + i * 14}
                  rx={espessuraLombada / 2 + 2}
                  ry={5}
                  fill="none"
                  stroke={corFio}
                  strokeWidth="1.5"
                />
              ))
            }

            {/* === CAPA (frente do caderno) === */}
            <motion.rect
              x={38 + espessuraLombada}
              y={32}
              width={larguraCapa}
              height={alturaCapa + 4}
              rx={raioCanto}
              ry={raioCanto}
              fill={corCapa}
              animate={{ fill: corCapa }}
              transition={{ duration: 0.4 }}
            />

            {/* Overlay de material (textura) */}
            {['linho', 'tecido', 'kraft'].includes(materialCapa) && (
              <rect
                x={38 + espessuraLombada}
                y={32}
                width={larguraCapa}
                height={alturaCapa + 4}
                rx={raioCanto}
                ry={raioCanto}
                fill={`url(#${materialCapa})`}
              />
            )}

            {/* Estampa floral (decorativa simples) */}
            {estampaCapa === 'floral' && (
              <g opacity="0.25" transform={`translate(${38 + espessuraLombada + larguraCapa * 0.5}, ${32 + alturaCapa * 0.5})`}>
                {[0, 60, 120, 180, 240, 300].map((angulo, i) => {
                  const rad = (angulo * Math.PI) / 180
                  const x = Math.cos(rad) * 18
                  const y = Math.sin(rad) * 18
                  return (
                    <ellipse
                      key={i}
                      cx={x}
                      cy={y}
                      rx={8}
                      ry={5}
                      fill="#FDF8F0"
                      transform={`rotate(${angulo} ${x} ${y})`}
                    />
                  )
                })}
                <circle cx={0} cy={0} r={6} fill="#FDF8F0" />
              </g>
            )}

            {/* Estampa minimalista (linha geométrica) */}
            {estampaCapa === 'minimalista' && (
              <g opacity="0.2" transform={`translate(${38 + espessuraLombada}, 32)`}>
                <line x1={larguraCapa * 0.2} y1={alturaCapa * 0.2} x2={larguraCapa * 0.8} y2={alturaCapa * 0.8} stroke="#FDF8F0" strokeWidth="1" />
                <rect x={larguraCapa * 0.25} y={alturaCapa * 0.3} width={larguraCapa * 0.5} height={alturaCapa * 0.4} fill="none" stroke="#FDF8F0" strokeWidth="0.8" />
              </g>
            )}

            {/* Reflexo de luz na capa */}
            <rect
              x={38 + espessuraLombada}
              y={32}
              width={larguraCapa}
              height={alturaCapa + 4}
              rx={raioCanto}
              ry={raioCanto}
              fill="url(#reflexo)"
              style={{ pointerEvents: 'none' }}
            />
            <defs>
              <linearGradient id="reflexo" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.12" />
                <stop offset="40%" stopColor="white" stopOpacity="0.04" />
                <stop offset="100%" stopColor="black" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* === ELÁSTICO === */}
            {elasticoAtivo && (
              <motion.rect
                x={posicaoElastico === 'vertical' ? 38 + espessuraLombada + larguraCapa * 0.7 : 38 + espessuraLombada}
                y={posicaoElastico === 'vertical' ? 32 : 32 + alturaCapa * 0.65}
                width={posicaoElastico === 'vertical' ? 2.5 : larguraCapa + espessuraLombada}
                height={posicaoElastico === 'vertical' ? alturaCapa + 4 : 2.5}
                fill={corElastico}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, fill: corElastico }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* === MARCADOR (fitilho) === */}
            {marcadorAtivo && (
              <motion.rect
                x={38 + espessuraLombada + larguraCapa * 0.5 - 1}
                y={32}
                width={2.5}
                height={alturaCapa + 32}
                fill={corMarcador}
                rx={1}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1, fill: corMarcador }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'top' }}
              />
            )}

            {/* === PINTURA NAS BORDAS === */}
            {pinturaBordasAtiva && (
              <motion.rect
                x={38 + espessuraLombada + 2}
                y={34}
                width={larguraCapa - 4}
                height={alturaCapa}
                rx={raioCanto}
                ry={raioCanto}
                fill="none"
                stroke={corPinturaBordas}
                strokeWidth={2}
                opacity={0.6}
                animate={{ stroke: corPinturaBordas }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.svg>
        </AnimatePresence>
      </motion.div>

      {/* Resumo das opções escolhidas */}
      <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
        <span className="text-xs bg-creme-200 text-marrom-400 px-2 py-0.5 rounded-full">
          {materialCapa}
        </span>
        <span className="text-xs bg-creme-200 text-marrom-400 px-2 py-0.5 rounded-full">
          {tipoEncadernacao}
        </span>
        <span className="text-xs bg-creme-200 text-marrom-400 px-2 py-0.5 rounded-full">
          {padraoPaginas}
        </span>
        {elasticoAtivo && (
          <span className="text-xs bg-creme-200 text-marrom-400 px-2 py-0.5 rounded-full">
            com elástico
          </span>
        )}
        {marcadorAtivo && (
          <span className="text-xs bg-creme-200 text-marrom-400 px-2 py-0.5 rounded-full">
            com marcador
          </span>
        )}
      </div>
    </div>
  )
}

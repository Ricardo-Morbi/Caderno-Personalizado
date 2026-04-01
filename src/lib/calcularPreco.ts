import type { ConfiguracaoCaderno } from '@/types/caderno'

// ============================================================
// TABELA DE PREÇOS — estrutura completa
// ============================================================

export interface TabelaPrecos {
  // Custo base: fio, cola, papel de guarda branca, miolo offset 90g
  materialBase: number

  // Adicional de material por tamanho (mais papel e capa)
  tamanho_A5: number
  tamanho_A4: number
  tamanho_personalizado: number

  // Adicional por espessura (mais folhas de miolo)
  espessura_medio: number
  espessura_grosso: number
  espessura_extraGrosso: number

  // Custo do material da capa
  capa_couro: number
  capa_sintetico: number
  capa_tecido: number
  capa_papelEspecial: number
  capa_kraft: number
  capa_linho: number

  // Custo de estampa / impressão na capa
  estampa_floral: number
  estampa_minimalista: number
  estampa_abstrata: number
  estampa_tematica: number

  // Custo de gravação (material + consumíveis)
  gravacao_baixoRelevo: number
  gravacao_altoRelevo: number
  gravacao_bordado: number

  // Custo de encadernação (fio, agulha, cola, ferragem)
  enc_francesaCruzada: number
  enc_longStitch: number
  enc_wireO: number

  // Adicional por tipo de papel
  papel_polen: number
  papel_reciclado: number
  papel_vegetal: number

  // Adicional por gramatura
  gramatura_120g: number
  gramatura_180g: number
  gramatura_240g: number

  // Elementos funcionais (custo do item)
  elem_elastico: number
  elem_marcador: number
  elem_bolso: number
  elem_portaCaneta: number
  elem_envelope: number
  elem_abas: number

  // Acabamentos
  acab_pinturaBordas: number
  acab_deckleEdge: number
  acab_laminacao: number
  acab_guardaEspecial: number

  // ── Mão de obra ──────────────────────────────────────────────
  valorHoraArtesa: number   // R$/hora

  // Tempo base por espessura (horas)
  tempo_fino: number
  tempo_medio: number
  tempo_grosso: number
  tempo_extraGrosso: number

  // Tempo adicional por tipo de trabalho (horas)
  tempoExtra_gravacao: number   // baixo/alto relevo
  tempoExtra_bordado: number    // bordado
  tempoExtra_bolso: number      // bolso interno ou envelope
  tempoExtra_acabamento: number // pintura bordas ou deckle

  // ── Custos fixos ─────────────────────────────────────────────
  custoFixoMensal: number        // R$/mês (aluguel, luz, etc.)
  producaoMediaMensal: number    // cadernos/mês (divide o custo fixo)

  // ── Margem de lucro ──────────────────────────────────────────
  margemLucro: number            // percentual (ex: 50 = 50%)
}

// ============================================================
// VALORES PADRÃO
// Calibrados para chegar próximo dos preços atuais do site.
// Ajuste livremente na aba Materiais do admin.
// ============================================================

export const TABELA_PADRAO: TabelaPrecos = {
  materialBase: 8,

  tamanho_A5: 2,
  tamanho_A4: 4,
  tamanho_personalizado: 8,

  espessura_medio: 3,
  espessura_grosso: 6,
  espessura_extraGrosso: 10,

  capa_couro: 50,
  capa_sintetico: 20,
  capa_tecido: 15,
  capa_papelEspecial: 10,
  capa_kraft: 7,
  capa_linho: 18,

  estampa_floral: 8,
  estampa_minimalista: 5,
  estampa_abstrata: 10,
  estampa_tematica: 15,

  gravacao_baixoRelevo: 10,
  gravacao_altoRelevo: 15,
  gravacao_bordado: 20,

  enc_francesaCruzada: 8,
  enc_longStitch: 6,
  enc_wireO: 12,

  papel_polen: 5,
  papel_reciclado: 3,
  papel_vegetal: 8,

  gramatura_120g: 4,
  gramatura_180g: 9,
  gramatura_240g: 15,

  elem_elastico: 5,
  elem_marcador: 7,
  elem_bolso: 9,
  elem_portaCaneta: 4,
  elem_envelope: 8,
  elem_abas: 5,

  acab_pinturaBordas: 5,
  acab_deckleEdge: 10,
  acab_laminacao: 6,
  acab_guardaEspecial: 7,

  valorHoraArtesa: 35,
  tempo_fino: 0.75,
  tempo_medio: 1.0,
  tempo_grosso: 1.5,
  tempo_extraGrosso: 2.0,

  tempoExtra_gravacao: 0.25,
  tempoExtra_bordado: 0.75,
  tempoExtra_bolso: 0.2,
  tempoExtra_acabamento: 0.3,

  custoFixoMensal: 500,
  producaoMediaMensal: 20,

  margemLucro: 50,
}

// ============================================================
// FUNÇÃO DE CÁLCULO — usada no site público e no admin
// ============================================================

export function calcularPreco(c: ConfiguracaoCaderno, t: TabelaPrecos): number {
  // ── 1. Custo de material ──────────────────────────────────────
  let mat = t.materialBase

  // Tamanho
  if (c.tamanho === 'A5')          mat += t.tamanho_A5
  else if (c.tamanho === 'A4')     mat += t.tamanho_A4
  else if (c.tamanho === 'personalizado') mat += t.tamanho_personalizado

  // Espessura
  if (c.espessura === 'medio')           mat += t.espessura_medio
  else if (c.espessura === 'grosso')     mat += t.espessura_grosso
  else if (c.espessura === 'extra-grosso') mat += t.espessura_extraGrosso

  // Material da capa
  if      (c.materialCapa === 'couro')          mat += t.capa_couro
  else if (c.materialCapa === 'sintetico')      mat += t.capa_sintetico
  else if (c.materialCapa === 'tecido')         mat += t.capa_tecido
  else if (c.materialCapa === 'papel-especial') mat += t.capa_papelEspecial
  else if (c.materialCapa === 'kraft')          mat += t.capa_kraft
  else if (c.materialCapa === 'linho')          mat += t.capa_linho

  // Estampa
  if      (c.estampaCapa === 'floral')       mat += t.estampa_floral
  else if (c.estampaCapa === 'minimalista')  mat += t.estampa_minimalista
  else if (c.estampaCapa === 'abstrata')     mat += t.estampa_abstrata
  else if (c.estampaCapa === 'tematica')     mat += t.estampa_tematica

  // Gravação
  if      (c.gravacaoCapa === 'baixo-relevo') mat += t.gravacao_baixoRelevo
  else if (c.gravacaoCapa === 'alto-relevo')  mat += t.gravacao_altoRelevo
  else if (c.gravacaoCapa === 'bordado')      mat += t.gravacao_bordado

  // Encadernação
  if      (c.tipoEncadernacao === 'francesa-cruzada') mat += t.enc_francesaCruzada
  else if (c.tipoEncadernacao === 'long-stitch')      mat += t.enc_longStitch
  else if (c.tipoEncadernacao === 'wire-o')           mat += t.enc_wireO

  // Papel
  if      (c.tipoPapel === 'polen')    mat += t.papel_polen
  else if (c.tipoPapel === 'reciclado') mat += t.papel_reciclado
  else if (c.tipoPapel === 'vegetal')  mat += t.papel_vegetal

  // Gramatura
  if      (c.graturaPapel === '120g') mat += t.gramatura_120g
  else if (c.graturaPapel === '180g') mat += t.gramatura_180g
  else if (c.graturaPapel === '240g') mat += t.gramatura_240g

  // Elementos funcionais
  if (c.elasticoAtivo)      mat += t.elem_elastico
  if (c.marcadorAtivo)      mat += t.elem_marcador
  if (c.bolsoInterno)       mat += t.elem_bolso
  if (c.portaCaneta)        mat += t.elem_portaCaneta
  if (c.envelopeAcoplado)   mat += t.elem_envelope
  if (c.abasOrelhas)        mat += t.elem_abas

  // Acabamentos
  if (c.pinturaBordasAtiva)                    mat += t.acab_pinturaBordas
  if (c.tipoCorteEspecial === 'deckle-edge')   mat += t.acab_deckleEdge
  if (c.tipoLaminacao !== 'nenhuma')           mat += t.acab_laminacao
  if (c.materialGuarda !== 'branca')           mat += t.acab_guardaEspecial

  // ── 2. Mão de obra ────────────────────────────────────────────
  let horas =
    c.espessura === 'fino'         ? t.tempo_fino :
    c.espessura === 'medio'        ? t.tempo_medio :
    c.espessura === 'grosso'       ? t.tempo_grosso :
    t.tempo_extraGrosso

  if (c.gravacaoCapa === 'bordado')       horas += t.tempoExtra_bordado
  else if (c.gravacaoCapa !== 'nenhuma') horas += t.tempoExtra_gravacao
  if (c.bolsoInterno || c.envelopeAcoplado) horas += t.tempoExtra_bolso
  if (c.pinturaBordasAtiva || c.tipoCorteEspecial === 'deckle-edge') horas += t.tempoExtra_acabamento

  const maoDeObra = horas * t.valorHoraArtesa

  // ── 3. Custo fixo rateado ────────────────────────────────────
  const custoFixoUnit = t.custoFixoMensal / Math.max(t.producaoMediaMensal, 1)

  // ── 4. Preço final com margem ─────────────────────────────────
  const custoTotal = mat + maoDeObra + custoFixoUnit
  const preco = custoTotal * (1 + t.margemLucro / 100)

  return Math.round(preco * 100) / 100
}

// ============================================================
// DETALHAMENTO — para mostrar a conta no admin
// ============================================================

export function detalharPreco(c: ConfiguracaoCaderno, t: TabelaPrecos) {
  const mat = calcularSoMaterial(c, t)
  const horas = calcularHoras(c, t)
  const maoDeObra = horas * t.valorHoraArtesa
  const custoFixoUnit = t.custoFixoMensal / Math.max(t.producaoMediaMensal, 1)
  const custoTotal = mat + maoDeObra + custoFixoUnit
  const margemValor = custoTotal * (t.margemLucro / 100)
  const precoFinal = custoTotal + margemValor

  return {
    custo_material: mat,
    horas_trabalho: horas,
    custo_mao_obra: maoDeObra,
    custo_fixo: custoFixoUnit,
    custo_total: custoTotal,
    margem_valor: margemValor,
    preco_final: Math.round(precoFinal * 100) / 100,
  }
}

function calcularSoMaterial(c: ConfiguracaoCaderno, t: TabelaPrecos): number {
  let mat = t.materialBase
  if (c.tamanho === 'A5')          mat += t.tamanho_A5
  else if (c.tamanho === 'A4')     mat += t.tamanho_A4
  else if (c.tamanho === 'personalizado') mat += t.tamanho_personalizado
  if (c.espessura === 'medio')           mat += t.espessura_medio
  else if (c.espessura === 'grosso')     mat += t.espessura_grosso
  else if (c.espessura === 'extra-grosso') mat += t.espessura_extraGrosso
  if      (c.materialCapa === 'couro')          mat += t.capa_couro
  else if (c.materialCapa === 'sintetico')      mat += t.capa_sintetico
  else if (c.materialCapa === 'tecido')         mat += t.capa_tecido
  else if (c.materialCapa === 'papel-especial') mat += t.capa_papelEspecial
  else if (c.materialCapa === 'kraft')          mat += t.capa_kraft
  else if (c.materialCapa === 'linho')          mat += t.capa_linho
  if      (c.estampaCapa === 'floral')       mat += t.estampa_floral
  else if (c.estampaCapa === 'minimalista')  mat += t.estampa_minimalista
  else if (c.estampaCapa === 'abstrata')     mat += t.estampa_abstrata
  else if (c.estampaCapa === 'tematica')     mat += t.estampa_tematica
  if      (c.gravacaoCapa === 'baixo-relevo') mat += t.gravacao_baixoRelevo
  else if (c.gravacaoCapa === 'alto-relevo')  mat += t.gravacao_altoRelevo
  else if (c.gravacaoCapa === 'bordado')      mat += t.gravacao_bordado
  if      (c.tipoEncadernacao === 'francesa-cruzada') mat += t.enc_francesaCruzada
  else if (c.tipoEncadernacao === 'long-stitch')      mat += t.enc_longStitch
  else if (c.tipoEncadernacao === 'wire-o')           mat += t.enc_wireO
  if      (c.tipoPapel === 'polen')    mat += t.papel_polen
  else if (c.tipoPapel === 'reciclado') mat += t.papel_reciclado
  else if (c.tipoPapel === 'vegetal')  mat += t.papel_vegetal
  if      (c.graturaPapel === '120g') mat += t.gramatura_120g
  else if (c.graturaPapel === '180g') mat += t.gramatura_180g
  else if (c.graturaPapel === '240g') mat += t.gramatura_240g
  if (c.elasticoAtivo)      mat += t.elem_elastico
  if (c.marcadorAtivo)      mat += t.elem_marcador
  if (c.bolsoInterno)       mat += t.elem_bolso
  if (c.portaCaneta)        mat += t.elem_portaCaneta
  if (c.envelopeAcoplado)   mat += t.elem_envelope
  if (c.abasOrelhas)        mat += t.elem_abas
  if (c.pinturaBordasAtiva)                  mat += t.acab_pinturaBordas
  if (c.tipoCorteEspecial === 'deckle-edge') mat += t.acab_deckleEdge
  if (c.tipoLaminacao !== 'nenhuma')         mat += t.acab_laminacao
  if (c.materialGuarda !== 'branca')         mat += t.acab_guardaEspecial
  return mat
}

function calcularHoras(c: ConfiguracaoCaderno, t: TabelaPrecos): number {
  let h =
    c.espessura === 'fino'         ? t.tempo_fino :
    c.espessura === 'medio'        ? t.tempo_medio :
    c.espessura === 'grosso'       ? t.tempo_grosso :
    t.tempo_extraGrosso
  if (c.gravacaoCapa === 'bordado')       h += t.tempoExtra_bordado
  else if (c.gravacaoCapa !== 'nenhuma') h += t.tempoExtra_gravacao
  if (c.bolsoInterno || c.envelopeAcoplado) h += t.tempoExtra_bolso
  if (c.pinturaBordasAtiva || c.tipoCorteEspecial === 'deckle-edge') h += t.tempoExtra_acabamento
  return h
}

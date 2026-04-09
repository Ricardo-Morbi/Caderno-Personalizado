import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'
import { TABELA_PADRAO } from '@/lib/calcularPreco'

// GET /api/configuracoes-preco — Retorna tabela de preços (público)
export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('configuracoes_preco')
    .select('dados')
    .eq('id', 'principal')
    .single()

  if (error || !data) {
    // Retorna padrão se não configurado ainda
    return NextResponse.json(TABELA_PADRAO, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    })
  }

  return NextResponse.json(data.dados, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  })
}

// PUT /api/configuracoes-preco — Salva tabela (admin)
export async function PUT(request: NextRequest) {
  const bloqueio = verificarAdmin(request)
  if (bloqueio) return bloqueio

  const dados = await request.json()

  const { error } = await getSupabaseAdmin()
    .from('configuracoes_preco')
    .upsert({ id: 'principal', dados, atualizado_em: new Date().toISOString() })

  if (error) return NextResponse.json({ erro: 'Erro ao salvar configurações' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

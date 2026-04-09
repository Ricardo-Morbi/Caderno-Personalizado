import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'

// POST /api/leads — Salva lead parcial
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { configuracao, total, pergunta_index } = body

  if (
    typeof configuracao !== 'object' || configuracao === null || Array.isArray(configuracao) ||
    typeof total !== 'number' || total < 0 || total > 99999 || !Number.isFinite(total) ||
    typeof pergunta_index !== 'number' || pergunta_index < 0 || pergunta_index > 500
  ) {
    return NextResponse.json({ erro: 'Dados inválidos' }, { status: 400 })
  }

  const { data, error } = await getSupabaseAdmin()
    .from('leads')
    .insert({ configuracao, total, pergunta_index })
    .select()
    .single()

  if (error) return NextResponse.json({ erro: 'Erro ao salvar lead' }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

// GET /api/leads — Lista leads (admin)
export async function GET(request: NextRequest) {
  const bloqueio = verificarAdmin(request)
  if (bloqueio) return bloqueio

  const { data, error } = await getSupabaseAdmin()
    .from('leads')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(100)

  if (error) return NextResponse.json({ erro: 'Erro ao buscar leads' }, { status: 500 })
  return NextResponse.json(data)
}

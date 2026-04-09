import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verificarAdmin } from '@/lib/admin-auth'

const STATUS_VALIDOS_QUERY = new Set(['novo', 'em_producao', 'pronto', 'entregue'])
const MES_REGEX = /^\d{4}-\d{2}$/

// GET /api/pedidos — Lista pedidos (admin)
export async function GET(request: NextRequest) {
  const bloqueio = verificarAdmin(request)
  if (bloqueio) return bloqueio

  const { searchParams } = request.nextUrl
  const status = searchParams.get('status')
  const mes = searchParams.get('mes') // formato: 2024-03

  // Valida parâmetros de query
  if (status && !STATUS_VALIDOS_QUERY.has(status)) {
    return NextResponse.json({ erro: 'Status inválido' }, { status: 400 })
  }
  if (mes && !MES_REGEX.test(mes)) {
    return NextResponse.json({ erro: 'Formato de mês inválido. Use YYYY-MM' }, { status: 400 })
  }

  const sb = getSupabaseAdmin()
  let query = sb
    .from('pedidos')
    .select('*')
    .order('criado_em', { ascending: false })

  if (status) query = query.eq('status', status)

  if (mes) {
    const inicio = `${mes}-01`
    const [ano, mesNum] = mes.split('-').map(Number)
    const fim = new Date(ano, mesNum, 1).toISOString().split('T')[0]
    query = query.gte('criado_em', inicio).lt('criado_em', fim)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ erro: 'Erro ao buscar pedidos' }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/pedidos — Cria pedido (público)
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { nome, whatsapp, configuracao, total } = body

  // Validação de tipos e limites — previne flood, valores absurdos e prototype pollution
  if (
    typeof nome !== 'string' || nome.trim().length < 2 || nome.length > 100 ||
    typeof whatsapp !== 'string' || whatsapp.trim().length < 8 || whatsapp.length > 30 ||
    typeof configuracao !== 'object' || configuracao === null || Array.isArray(configuracao) ||
    typeof total !== 'number' || total <= 0 || total > 99999 || !Number.isFinite(total)
  ) {
    return NextResponse.json({ erro: 'Dados inválidos' }, { status: 400 })
  }

  const { data, error } = await getSupabaseAdmin()
    .from('pedidos')
    .insert({ nome: nome.trim(), whatsapp: whatsapp.trim(), configuracao, total })
    .select()
    .single()

  if (error) return NextResponse.json({ erro: 'Erro ao criar pedido' }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

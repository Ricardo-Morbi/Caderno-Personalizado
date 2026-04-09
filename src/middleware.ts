import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis/cloudflare'

// ─── Rate Limiting ─────────────────────────────────────────────────────────
// Usa Upstash Redis se as env vars estiverem configuradas (Vercel KV / Upstash).
// Caso contrário, cai para in-memory — funciona em qualquer ambiente sem setup.

// Limites por tipo de endpoint
const AUTH_LIMITE = 5        // OWASP recomenda ≤5 para auth
const AUTH_JANELA = 15 * 60  // 15 minutos
const PUBLIC_LIMITE = 10     // pedidos/leads públicos
const PUBLIC_JANELA = 60     // 1 minuto

// ─── IP extraction — P1 fix: usar x-real-ip (Vercel injeta, não forjável)
// x-forwarded-for pode ser manipulado pelo cliente — usar apenas como fallback
function extrairIP(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

// ─── Fallback in-memory (resets a cada cold start) ──────────────────────────
const memBuckets = new Map<string, { count: number; resetAt: number }>()

function rateLimitMemoria(chave: string, limite: number, janela: number): boolean {
  const agora = Math.floor(Date.now() / 1000)
  const reg = memBuckets.get(chave)
  if (!reg || agora > reg.resetAt) {
    memBuckets.set(chave, { count: 1, resetAt: agora + janela })
    return false
  }
  reg.count++
  return reg.count > limite
}

// ─── Upstash Redis (persiste entre deploys — ativo quando env vars configuradas)
function criarRatelimitRedis(limite: number, janela: number, prefix: string): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limite, `${janela} s`),
    prefix,
  })
}

const rlAuth   = criarRatelimitRedis(AUTH_LIMITE,   AUTH_JANELA,   'rl:auth')
const rlPublic = criarRatelimitRedis(PUBLIC_LIMITE, PUBLIC_JANELA, 'rl:public')

async function checarRateLimit(
  ip: string,
  tipo: 'auth' | 'public'
): Promise<boolean> {
  if (tipo === 'auth') {
    if (rlAuth) {
      const { success } = await rlAuth.limit(ip)
      return !success
    }
    return rateLimitMemoria(`auth:${ip}`, AUTH_LIMITE, AUTH_JANELA)
  }
  // public
  if (rlPublic) {
    const { success } = await rlPublic.limit(ip)
    return !success
  }
  return rateLimitMemoria(`pub:${ip}`, PUBLIC_LIMITE, PUBLIC_JANELA)
}

// ─── Middleware ─────────────────────────────────────────────────────────────
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = extrairIP(request)

  // Rate limit no endpoint de login (auth — mais restritivo)
  if (pathname === '/api/auth/admin' && request.method === 'POST') {
    const bloqueado = await checarRateLimit(ip, 'auth')
    if (bloqueado) {
      return NextResponse.json(
        { erro: 'Muitas tentativas. Aguarde 15 minutos.' },
        { status: 429 }
      )
    }
    return NextResponse.next()
  }

  // Rate limit em endpoints públicos de criação (pedidos e leads)
  if (
    (pathname === '/api/pedidos' || pathname === '/api/leads') &&
    request.method === 'POST'
  ) {
    const bloqueado = await checarRateLimit(ip, 'public')
    if (bloqueado) {
      return NextResponse.json(
        { erro: 'Muitas requisições. Tente novamente em 1 minuto.' },
        { status: 429 }
      )
    }
    return NextResponse.next()
  }

  // Rota de login não precisa de autenticação
  if (pathname === '/admin/login') return NextResponse.next()

  // Protege todas as rotas /admin/*
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value
    const expectedToken = process.env.ADMIN_SESSION_TOKEN

    if (!token || !expectedToken || token !== expectedToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/auth/admin', '/api/pedidos', '/api/leads'],
}

# Manual Operacional — Segurança Next.js 15 + Supabase
**Data:** 2026-04-09 | **Versão:** 1.0

## Regras Operacionais Validadas

### 1. Rate Limiting — Endpoints Públicos (P0)
Todo endpoint POST público DEVE ter rate limiting no middleware.
```typescript
// Em middleware.ts — adicionar matcher + checar rate limit para cada rota pública
matcher: ['/admin/:path*', '/api/auth/admin', '/api/pedidos', '/api/leads']
// Limites: auth=5/15min, public=10/1min
```

### 2. IP Extraction em Vercel — Usar x-real-ip (P1)
```typescript
// SEGURO — x-real-ip é injetado pelo Vercel edge, não pode ser forjado
const ip = request.headers.get('x-real-ip') ??
           request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
// VULNERÁVEL (só): request.headers.get('x-forwarded-for')?.split(',')[0]
```

### 3. Validação de Input em Endpoints Públicos (P0)
```typescript
// Checar tipos, limites e valores absurdos antes de qualquer operação
if (
  typeof nome !== 'string' || nome.trim().length < 2 || nome.length > 100 ||
  typeof total !== 'number' || total <= 0 || total > 99999 || !Number.isFinite(total) ||
  typeof configuracao !== 'object' || configuracao === null || Array.isArray(configuracao)
) return NextResponse.json({ erro: 'Dados inválidos' }, { status: 400 })
```

### 4. Supabase Realtime — NUNCA usar anon key em tabelas com dados pessoais (P0)
A anon key é PÚBLICA (NEXT_PUBLIC_). Qualquer pessoa pode subscrever canais realtime
com ela se não houver RLS policy restritiva.

**Padrão seguro:** substituir realtime por polling autenticado contra API route protegida.
```typescript
// INSEGURO: getSupabase() (anon key) para ouvir tabela pedidos
// SEGURO: polling a cada 30s em /api/pedidos (exige cookie admin)
setInterval(() => fetch('/api/pedidos', { credentials: 'include' }), 30_000)
```

### 5. Validar Parâmetros de Query (P1)
```typescript
const STATUS_VALIDOS = new Set(['novo', 'em_producao', 'pronto', 'entregue'])
const MES_REGEX = /^\d{4}-\d{2}$/
if (status && !STATUS_VALIDOS.has(status)) return 400
if (mes && !MES_REGEX.test(mes)) return 400
```

### 6. CVEs Next.js — Verificar Versão Instalada
- CVE-2025-29927 (CVSS 9.1 — middleware bypass): corrigido em 15.2.3+
- CVE-2025-49826 (cache poisoning DoS): corrigido em 15.1.8+
- CVE-2025-55182 (RCE CVSS 10.0): corrigido em 15.3.6+ ou 15.5.7+
- Verificar: `next --version` ou build log no Vercel
- **Projeto atual: 15.5.14 — todos os CVEs corrigidos** ✓

### 7. Supabase RLS — Armadilha: RLS sem Policy = Deny All
```sql
-- Isso bloqueia TODO acesso anon, inclusive Realtime
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
-- SEM policy = deny all para anon
-- COM service_role = bypassa RLS automaticamente
```
Se o realtime precisa funcionar para o painel admin, use polling autenticado
em vez de canal com anon key.

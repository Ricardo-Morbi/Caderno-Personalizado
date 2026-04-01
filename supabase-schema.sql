-- ─── Schema do Painel Admin ───────────────────────────────────
-- Executar no Supabase SQL Editor:
-- Dashboard → SQL Editor → New Query → colar e executar

-- Tabela de pedidos
create table if not exists public.pedidos (
  id          uuid        primary key default gen_random_uuid(),
  criado_em   timestamptz not null    default now(),
  nome        text        not null,
  whatsapp    text        not null,
  configuracao jsonb      not null,
  total       numeric(10,2) not null,
  status      text        not null    default 'novo'
              check (status in ('novo', 'em_producao', 'pronto', 'entregue')),
  notas       text
);

-- Tabela de leads (configurações parciais sem pedido finalizado)
create table if not exists public.leads (
  id            uuid        primary key default gen_random_uuid(),
  criado_em     timestamptz not null    default now(),
  configuracao  jsonb       not null,
  total         numeric(10,2) not null,
  pergunta_index integer    not null    default 0
);

-- Índices para performance
create index if not exists pedidos_criado_em_idx on public.pedidos (criado_em desc);
create index if not exists pedidos_status_idx    on public.pedidos (status);
create index if not exists leads_criado_em_idx   on public.leads   (criado_em desc);

-- RLS: desabilitar para que service role possa operar livremente
-- (o acesso público ao POST /api/pedidos é controlado pela API route)
alter table public.pedidos enable row level security;
alter table public.leads   enable row level security;

-- Policies: service role ignora RLS automaticamente
-- Usuários anônimos não têm acesso direto — só via API routes com service key

-- Realtime: habilitar para notificações ao vivo no painel admin
alter publication supabase_realtime add table public.pedidos;

-- ─── Tabela de configurações de preço ──────────────────────────
-- Armazena um único registro JSON com toda a tabela de preços
create table if not exists public.configuracoes_preco (
  id        text        primary key,   -- sempre 'principal'
  dados     jsonb       not null,
  atualizado_em timestamptz not null default now()
);

-- RLS habilitada; service role ignora automaticamente
alter table public.configuracoes_preco enable row level security;

-- Seed com valores padrão (mesmos do TABELA_PADRAO em calcularPreco.ts)
insert into public.configuracoes_preco (id, dados) values (
  'principal',
  '{
    "materialBase": 8,
    "tamanho_A5": 2, "tamanho_A4": 4, "tamanho_personalizado": 8,
    "espessura_medio": 3, "espessura_grosso": 6, "espessura_extraGrosso": 10,
    "capa_couro": 50, "capa_sintetico": 20, "capa_tecido": 15,
    "capa_papelEspecial": 10, "capa_kraft": 7, "capa_linho": 18,
    "estampa_floral": 8, "estampa_minimalista": 5, "estampa_abstrata": 10, "estampa_tematica": 15,
    "gravacao_baixoRelevo": 10, "gravacao_altoRelevo": 15, "gravacao_bordado": 20,
    "enc_francesaCruzada": 8, "enc_longStitch": 6, "enc_wireO": 12,
    "papel_polen": 5, "papel_reciclado": 3, "papel_vegetal": 8,
    "gramatura_120g": 4, "gramatura_180g": 9, "gramatura_240g": 15,
    "elem_elastico": 5, "elem_marcador": 7, "elem_bolso": 9,
    "elem_portaCaneta": 4, "elem_envelope": 8, "elem_abas": 5,
    "acab_pinturaBordas": 5, "acab_deckleEdge": 10, "acab_laminacao": 6, "acab_guardaEspecial": 7,
    "valorHoraArtesa": 35,
    "tempo_fino": 0.75, "tempo_medio": 1.0, "tempo_grosso": 1.5, "tempo_extraGrosso": 2.0,
    "tempoExtra_gravacao": 0.25, "tempoExtra_bordado": 0.75,
    "tempoExtra_bolso": 0.2, "tempoExtra_acabamento": 0.3,
    "custoFixoMensal": 500, "producaoMediaMensal": 20,
    "margemLucro": 50
  }'::jsonb
) on conflict (id) do nothing;

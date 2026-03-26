# Caderno Artesanal Configurador

Site de personalização de cadernos artesanais com **preview visual em tempo real**. O cliente monta o caderno ideal do zero, escolhendo cada detalhe — e vê como vai ficar enquanto seleciona.

## O Que É

Um configurador de produto com 7 etapas de personalização:

1. **Tamanho e Formato** — A6, A5, A4 · retrato, paisagem, quadrado · espessura
2. **Capa** — Material, cor, estampa, gravação, nome, aplicações
3. **Encadernação** — Tipo de costura, lombada, abertura, cor do fio
4. **Miolo** — Tipo de papel, gramatura, cor das folhas, padrão das páginas
5. **Elementos Funcionais** — Elástico, marcador, bolso, porta-caneta
6. **Acabamentos** — Cantos, pintura nas bordas, corte especial, laminação
7. **Extras Afetivos** — Dedicatória, frases, temas especiais, essência

## Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Acessar em
http://localhost:3000
```

## Stack

- **Next.js 15** — Framework principal (App Router)
- **TypeScript** — Tipagem
- **Tailwind CSS** — Estilização
- **Framer Motion** — Animações nas transições
- **Zustand** — Estado global das seleções

## Como Adicionar Fotos Reais

O preview usa ilustração SVG dinâmica na versão inicial. Para substituir por fotos reais:

1. Adicione PNGs com fundo transparente em `public/imagens/caderno/`
2. Use a nomenclatura: `capa-couro-marrom.png`, `lombada-japonesa.png`, etc.
3. Atualize `src/components/configurador/PreviewCaderno.tsx` para usar as imagens

## Deploy

```bash
# Via Vercel CLI
npm i -g vercel
vercel deploy
```

## Estrutura

```
src/
├── app/                    → Layout e página principal
├── components/
│   └── configurador/
│       ├── BarraEtapas.tsx     → Sidebar com progresso
│       ├── PreviewCaderno.tsx  → Preview dinâmico
│       ├── PainelOpcoes.tsx    → Opções da etapa atual
│       └── etapas/             → 7 componentes de etapa
├── store/
│   └── useCadernoStore.ts  → Estado global (Zustand)
└── types/
    └── caderno.ts          → Tipos TypeScript
```

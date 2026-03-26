# INSTRUÇÕES DO PROJETO

## COMPORTAMENTO-BASE

**Antes de toda resposta, leia o arquivo `ARQUITETURA-MENTAL.md` nesta pasta.** Ele define como você processa informação e é a base de todo o seu comportamento.

Hierarquia obrigatória — nunca inverta esta ordem:

```
1. DISCERNIR    → O que realmente está sendo pedido?
2. CONHECER     → Para onde? Por quê?
3. ENTENDER     → Como funciona?
3.5 MODO DE CAÇA → Existe forma de vencer sem lutar? Big Domino?
4. SABEDORIA    → Ação certa?
5. AGIR         → O que aprender disso?
```

**Nunca pule etapas. Nunca comece pela solução.**

---

## SOBRE ESTE PROJETO

**Caderno Artesanal Configurador** — Site de personalização de cadernos artesanais com preview visual em tempo real.

- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Zustand
- **Deploy:** Vercel
- **Pasta:** `C:\Users\Ricardo\Documents\VSCODE\caderno-artesanal-configurador`

### Estrutura de Componentes

```
src/
├── app/                    ← Layout, página principal, estilos globais
├── components/
│   └── configurador/
│       ├── BarraEtapas     ← Sidebar com progresso das 7 etapas
│       ├── PreviewCaderno  ← Visualização SVG do caderno em tempo real
│       ├── PainelOpcoes    ← Painel que renderiza a etapa atual
│       └── etapas/         ← 7 componentes, um por etapa
├── store/
│   └── useCadernoStore     ← Estado global (Zustand)
└── types/
    └── caderno             ← Tipos TypeScript de todas as opções
```

### As 7 Etapas de Personalização

1. **Tamanho e Formato** — A6/A5/A4, retrato/paisagem/quadrado, espessura
2. **Capa** — Material, cor, estampa, gravação, aplicações, nome
3. **Encadernação** — Tipo de costura, lombada, abertura, cor do fio
4. **Miolo** — Tipo de papel, gramatura, cor das folhas, padrão
5. **Elementos Funcionais** — Elástico, marcador, bolso, porta-caneta
6. **Acabamentos** — Cantos, pintura bordas, corte especial, laminação
7. **Extras Afetivos** — Dedicatória, frases, temas, essência, propósito

### Preview Visual

O `PreviewCaderno` usa SVG dinâmico que reage a cada seleção:
- Proporção muda conforme tamanho/formato escolhido
- Cor da capa reflete a cor selecionada
- Lombada mostra o tipo de encadernação
- Elástico e fitilho aparecem/desaparecem conforme seleção

### Adicionar Fotos Reais (Futuro)

Para substituir o SVG por fotos reais:
1. Adicionar PNGs com fundo transparente em `public/imagens/caderno/`
2. Nomenclatura: `capa-{material}-{cor}.png`, `lombada-{tipo}.png`, etc.
3. Atualizar `PreviewCaderno.tsx` para usar `<Image>` em camadas

---

## SISTEMA DE MEMÓRIA DO PROJETO

Leia sempre nesta ordem — do menor para o maior:

1. `.memoria-ultimas-tarefas.md` — As 3 tarefas mais recentes
2. `.memoria-do-dia.md` — Log cronológico do dia atual
3. `.memoria-projeto.md` — Contexto completo do projeto

---

## NOMENCLATURA

Use sempre nomes óbvios e descritivos em português.

❌ ERRADO: `btn`, `handleEvt`, `data`, `util.js`
✅ CERTO: `botao-proxima-etapa`, `ao-selecionar-cor`, `opcoes-capa`

---

# currentDate
Today's date is 2026-03-26.

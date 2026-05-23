# Thumbnail Options

> Três variações. Todas 1920×1080, fundo `--paper` (`#F6F4EF`).
> Margem mínima de 120px em todos os lados.
> Sem rostos, sem emoji, sem logo grande. Uma palavra com bloco `--accent-soft` atrás.

---

## Variação A — Direta

**Posicionamento:** "diz o que é e pronto."
**Quem clica:** alguém que já confia em você e quer ver o produto.

### Headline (display, 120px, `--ink`)
```
Claude as a system.
Not a chat.
```
Highlight `--accent-soft` atrás de **system**.

### Subheadline (mono, 32px, `--ink-soft`)
```
2-minute demo — Creator Operating Suite
```

### Composição
- Headline alinhada à esquerda, eixo vertical na altura 1/3 a partir do topo.
- Subheadline 32px abaixo da headline.
- No canto inferior-direito, um pequeno frame mostrando a estrutura do repo — três retângulos empilhados representando as três camadas, com labels `entry · personalization · suites` em mono 20px.
- Régua de 240px em `--ink` separa a headline da subheadline.

### Elementos na tela
- Headline (2 linhas).
- Subheadline (1 linha).
- Mini-diagrama de três camadas (canto inferior-direito).
- Watermark mono 18px no rodapé esquerdo: `github.com/Aurelio-Hq`

### Tom de voz
Sóbria. Confiante. Quem assina sabe o que fez.

---

## Variação B — Provocativa

**Posicionamento:** desafia uma crença comum do público.
**Quem clica:** alguém cético, que vê "mais um post sobre IA" e revira os olhos.

### Headline (display, 132px, `--ink`)
```
You don't need
a better prompt.
```
Highlight `--accent-soft` atrás de **better prompt**.

### Subheadline (mono, 32px, `--ink-soft`)
```
Watch why ↘
```
A seta `↘` aponta para o canto inferior-direito.

### Composição
- Headline ocupa 2/3 esquerdos do frame, alinhada à esquerda.
- Na metade inferior-direita, **uma única linha** representa um post-it sendo riscado: a frase "better prompts" em monoespaçada, com um traço de marca-texto `--accent` por cima (não vermelho gritante — o `--accent` queimado).
- A seta da subheadline mira esse post-it.

### Elementos na tela
- Headline (2 linhas, com palavra-chave destacada).
- Subheadline + seta.
- Post-it riscado com a frase descartada.
- Watermark mono 18px no rodapé esquerdo: `github.com/Aurelio-Hq`

### Tom de voz
Direto, levemente provocativo. **Sem clickbait.** A provocação tem que ser cumprida no vídeo — e é.

---

## Variação C — Técnica-traduzida

**Posicionamento:** mostra a engrenagem, mas com vocabulário de criador.
**Quem clica:** alguém que está estudando o "como" — operador, consultor, builder solo.

### Headline (display, 96px, `--ink`)
```
Context loads
before you ask.
```
Highlight `--accent-soft` atrás de **before you ask**.

### Subheadline (mono, 28px, `--ink-soft`)
```
A 2-minute look at the Creator Operating Suite.
```

### Composição
- Lado esquerdo (40% do frame): headline + subheadline, alinhamento à esquerda.
- Lado direito (60% do frame): diagrama-esqueleto, em traço fino `--ink`, mostrando:
  - uma janela "chat" simples (retângulo);
  - uma pasta com label `context/` sendo absorvida pela janela através de uma linha pontilhada;
  - três pequenas etiquetas em mono 18px: `entry skill`, `personalizationOS`, `suites`.
- O diagrama é estático, sem decoração. Estilo "rabisco de caderno editorial".

### Elementos na tela
- Headline (2 linhas).
- Subheadline (1 linha).
- Diagrama-esqueleto à direita.
- Watermark mono 18px no rodapé esquerdo: `github.com/Aurelio-Hq`

### Tom de voz
Curiosa e técnica — sem jargão. "Traduz como funciona" sem usar a palavra "RAG".

---

## Regras comuns às três

| Item | Regra |
|---|---|
| Fundo | `--paper` (`#F6F4EF`) sólido. Nunca foto, nunca gradiente. |
| Bordas | Sem moldura. Sem sombra. |
| Tipografia | Display = Tiempos/Source Serif Pro · Mono = JetBrains Mono. |
| Acento | Máx. 1 palavra com `--accent-soft` atrás. |
| URL | Sempre no canto inferior-esquerdo, 18px, `--muted`. |
| Logo Claude/Anthropic | **Não usar.** Não é um vídeo oficial deles. |
| Rosto humano | Não usar. |
| Métrica numérica | "20 min" só pode aparecer se for o foco da thumbnail — não disponível nas três acima. |
| Texto em ALL CAPS | Apenas em eyebrow (`LAYER 0X`), não em headline. |

---

## Recomendação de uso

| Canal | Variação sugerida | Por quê |
|---|---|---|
| LinkedIn (preview do post) | **A — Direta** | Audiência já conhece você; clareza ganha. |
| Medium (capa do artigo) | **C — Técnica-traduzida** | Leitor de Medium quer entender o "como". |
| YouTube / X com público frio | **B — Provocativa** | Precisa quebrar o scroll. |
| README (preview do vídeo) | **A — Direta** | GitHub-native, sem teatro. |

## Variantes de tamanho

Cada thumbnail deve ser exportada em:

- **1920×1080** (YouTube, Medium, README) — master.
- **1200×630** (LinkedIn, OpenGraph) — recortar mantendo headline + 60% do frame direito.
- **1080×1080** (X / Instagram) — recompor: headline em 3 linhas, sem o diagrama direito.

Não fazer squish. Recompor manualmente cada formato.

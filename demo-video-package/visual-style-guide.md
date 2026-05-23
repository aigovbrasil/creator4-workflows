# Visual Style Guide — Creator Operating Suite · Demo

> Estética: **clean, editorial, GitHub-native, high signal.**
> Não é "AI startup deck". Não é "developer hype reel". É um produto sério, para quem trabalha em silêncio e entrega bem.

---

## 1 · Princípios

1. **High signal, low noise.** Se não diz nada novo, não entra no frame.
2. **GitHub-native.** O vídeo deve parecer ter sido feito por alguém que mora no GitHub — não por uma agência.
3. **Editorial, não marketing.** Tipografia de revista, não de banner.
4. **O texto faz o trabalho.** Se a animação compete com a frase, a frase ganha.
5. **Silêncio é parte do design.** Pausas, espaço em branco, tempo de leitura.

---

## 2 · Paleta

Base neutra, três acentos. Nada de gradiente, nada de neon.

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#F6F4EF` | Fundo principal (off-white quente, papel) |
| `--ink` | `#1A1A1A` | Texto primário, traços fortes |
| `--ink-soft` | `#3A3A3A` | Texto secundário |
| `--muted` | `#8A8378` | Captions, metadata, timestamps |
| `--rule` | `#D9D4C7` | Linhas, divisórias, bordas de card |
| `--accent` | `#C8553D` | UM ponto de atenção por cena. Só. |
| `--accent-soft` | `#E8D8C4` | Highlight de bloco (atrás de palavra-chave) |
| `--ok` | `#3F7A4A` | "After" no before/after, ticks de checklist |

Regra dura: **um acento por cena.** Se `--accent` aparece no texto, não aparece num ícone na mesma cena.

---

## 3 · Tipografia

Stack único, sem fontes decorativas.

```
--font-display: "Tiempos Headline", "GT Sectra", "Source Serif Pro", Georgia, serif;
--font-body:    "Inter", "GT America", "Söhne", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
```

Substituições aceitáveis se as primárias não estiverem disponíveis:
- Display → **Source Serif Pro** (Google Fonts, gratuita).
- Body → **Inter** (Google Fonts, gratuita).
- Mono → **JetBrains Mono** (Google Fonts, gratuita).

### Escala (renderizada a 1920×1080)

| Papel | Família | Tamanho | Peso | Leading |
|---|---|---|---|---|
| Headline tela cheia | display | 96–120 px | 500 | 1.05 |
| Tese / frase forte | display | 72 px | 500 | 1.1 |
| Lower third (caption) | body | 32 px | 500 | 1.2 |
| On-screen metadata | mono | 24 px | 400 | 1.3 |
| URL / CTA | mono | 36 px | 500 | 1.2 |

### Regras
- Display **sempre** em peso 500 (médio). Nada de 700 bold em serif.
- Tracking levemente negativo no display (`letter-spacing: -0.01em`).
- Mono para qualquer coisa que pareça "do GitHub" (paths, URLs, contadores).
- Nunca misturar 3 famílias na mesma tela.

---

## 4 · Ritmo visual

A demo tem dois ritmos alternados:

**Ritmo A — Tela de leitura (lento).**
- Fundo `--paper`, uma única frase, muito espaço em volta.
- Frase entra com fade de 400ms, fica parada 2.5–4s, sai com fade de 300ms.
- Usado em: tese (cena 3), prova técnica (cena 11), CTA (cena 12).

**Ritmo B — Walkthrough (médio).**
- Tela do GitHub real, zoom suave (1.0 → 1.1 em 4s), cursor seguindo.
- Caption sticky no canto inferior esquerdo.
- Usado em: cenas 4–9.

Nunca um terceiro ritmo. **Não há transição "wow".** Cortes duros entre A e B, sempre.

### Tempo morto deliberado
- Mínimo 0.5s de respiração entre cenas grandes.
- Última cena segura 2s em silêncio antes do corte final.

---

## 5 · Captions (legendas)

**Bilíngue:** narração em PT, on-screen em EN curto.
**Posição:** lower-left, 80px da borda esquerda, 80px da borda inferior.
**Caixa:** sem caixa. Texto direto sobre o fundo.
**Cor:** `--ink` sobre `--paper`. `--paper` sobre `--ink` quando a cena inverter.
**Entrada/saída:** fade 200ms, sem slide, sem typewriter.

### Frases-padrão
- Máx. 7 palavras por linha.
- Máx. 2 linhas.
- Ponto final apenas em frases-tese, não em labels.

### Highlight de palavra-chave
Quando uma palavra precisar respirar mais (ex: `system`, `routine`, `context`), aplicar **bloco de fundo `--accent-soft`** com padding 4px 8px atrás da palavra. Não usar bold, não usar cor de texto diferente.

---

## 6 · Lower thirds

Usados em transições nomeadas (Cena 6, 7, 8 — as camadas).

```
┌──────────────────────────────────────────┐
│                                          │
│  LAYER 02 ─────────────                  │
│  PersonalizationOS                       │
│  voice · decisions · editorial calendar  │
│                                          │
└──────────────────────────────────────────┘
```

Estrutura:
- **Eyebrow** (`LAYER 02`) — mono, 24px, `--muted`, com régua de 80px após.
- **Título** — display, 72px, `--ink`.
- **Subtítulo descritivo** — body, 28px, `--ink-soft`, items separados por `·`.

Posição: canto superior-direito da tela, com 120px de margem. Permanece 4s e sai com fade.

---

## 7 · Thumbnails (overview — detalhes em `thumbnail-options.md`)

Três variações, todas em 1920×1080, todas em `--paper`.

Princípio comum:
- **Headline display** dominante, máx 8 palavras.
- **Uma palavra com bloco `--accent-soft` atrás** — guia o olho.
- Subheadline mono pequena em baixo.
- Nenhum rosto. Nenhum logo grande. Nenhum emoji.
- Margem mínima de 120px em todos os lados.

---

## 8 · Cards de transição

Dois tipos, ambos em ritmo A:

**Card-tese:** uma frase só, centralizada, display 96px, `--paper` de fundo.
Exemplo: *"Your work isn't a chat. It's a routine."*

**Card-camada:** introdução visual de uma das três camadas (Entry Skill, PersonalizationOS, Suites). Usado antes da cena de GitHub correspondente. 1.5s de duração.

```
        LAYER 01 ────────────────────

        Entry Skill
        Claude understands who you are
        before you ask.
```

---

## 9 · Movimento permitido

- **Zoom**: lento, 1.0 → 1.1 em 3–5s. Nunca brusco.
- **Pan**: horizontal só em scroll de tela real (READMEs, listas).
- **Fade**: 200–400ms.
- **Stroke draw**: para o card "Chat vs System" (cena 3) e setas before/after.

## 10 · Movimento proibido

- Parallax decorativo.
- Particles, glitter, glow, glow-on-hover.
- Bounce, elastic, spring exagerado.
- Texto que digita letra-a-letra (typewriter) — exceto se for literalmente alguém digitando no Claude.
- Transições "swoosh", whip-pan, glitch.
- Loops de música genéricos de banco.

---

## 11 · Áudio (referência rápida)

- Voz: -14 LUFS, mono, sem reverb adicionado.
- Sem música de fundo. Se houver, bed muito sutil, ≤ -28 LUFS, sem percussão.
- SFX: um único "click" suave em entradas de card-tese e CTA. Mais nada.

---

## 12 · Versão exportável (especificação técnica)

| Item | Valor |
|---|---|
| Aspect ratio | 16:9 |
| Resolução master | 1920×1080 |
| Versão vertical (Reels/Shorts) | 1080×1920, recortes refeitos manualmente — **não squish** |
| Framerate | 30fps final (gravado em 60, conformado em 30) |
| Codec | H.264, ~12 Mbps |
| Áudio | AAC 256kbps |
| Captions burned-in | Sim, na master |
| Versão sem captions | Exportar separadamente, para localização |

# Animated Demo — Export & Capture Guide

> Arquivo: [`creator-operating-suite-demo.html`](./creator-operating-suite-demo.html)
> Formato: 1920×1080, 85 segundos, loop, autoplay.
> Engine: timeline-based React/Babel (sem dependências externas além de fontes).

## Como assistir

Abra o HTML no Chrome/Safari/Firefox em fullscreen.

| Atalho | Ação |
|---|---|
| `Space` | Play / Pause |
| `← / →` | Seek -100ms / +100ms |
| `Shift + ← / →` | Seek -1s / +1s |
| `0` ou `Home` | Voltar ao início |
| Click na timeline | Seek para posição |

A timeline persiste no `localStorage` — se você refrescar a página, ele volta ao ponto onde parou.

## Mapa do timeline (85s)

| t | Cena | O que aparece |
|---|---|---|
| 0:00 – 0:10 | **01 · Problem** | Notas espalhadas, prompts, screenshots — "Creators use AI every day. Yet they keep repeating context." |
| 0:10 – 0:20 | **02 · Pain** | 4 frames "Output A/B/C/D" do mesmo projeto, vozes diferentes. |
| 0:20 – 0:30 | **03 · Thesis** | Blocos espalhados se organizam num stack. Headline "From chat to **work system**." |
| 0:30 – 0:45 | **04 · System Layers** | 6 camadas aparecem em sequência (Entry Skill → Validation). |
| 0:45 – 1:00 | **05 · GitHub Proof** | Mockup do repositório com file tree e badges (v0.1.0 · MIT). |
| 1:00 – 1:15 | **06 · Before / After** | Split screen — repeated context vs reusable workflow. |
| 1:15 – 1:25 | **07 · CTA** | Card preto. "Open the repo. Test the starter. Send feedback." + URL. |

---

## 1. Frame para thumbnail

**Frame recomendado:** `t = 0:22.5` (cena Thesis, com o headline "From chat to work system." já visível e os blocos organizados à esquerda).

Para capturar:

1. Abra o HTML.
2. Pressione `Space` para pausar.
3. Clique na timeline em ~26% do trajeto, ou pressione `Shift+→` até o contador mostrar `0:22.50`.
4. Tire um screenshot fullscreen (Cmd+Shift+4 no Mac, ou ferramenta de print do SO).

**Frame alternativo (mais provocativo):** `t = 1:18` (CTA já com as 3 linhas no preto).
**Frame alternativo (mais técnico):** `t = 0:52` (mockup do GitHub renderizado).

Para usar como thumbnail YouTube: recorte 1920×1080. Para LinkedIn: recorte 1200×630 mantendo a headline. Para X/IG: recompor 1080×1080.

## 2. Title card

A primeira cena (0:00 – 0:10) já funciona como title card editorial: eyebrow "01 · The everyday" + cards espalhados + caption.

Se precisar de um title card "limpo" estático (sem captions, sem cards):
- Capture `t = 0:00.1` antes dos cards entrarem.

Para uma alternativa mais clean: o último frame antes da cena CTA — `t = 1:24.5` — fundo preto, três linhas brancas, URL. Já é um title card pronto.

## 3. Exportar como MP4

O HTML não exporta MP4 sozinho. Use **screen recording**:

### Opção A — Screen Studio (Mac, recomendado)

1. Abra o HTML no Chrome em janela 1920×1080 (use a opção "Customize" do Chrome para travar resolução, ou use uma extensão como "Window Resizer").
2. No Screen Studio, crie um novo recording em "Area" e selecione apenas a área de canvas (não a barra de playback).
3. Recarregue a página (volta a t=0).
4. Comece a gravação e deixe rodar 85 segundos.
5. Pare a gravação. Export em 1920×1080, 30fps, H.264.

### Opção B — OBS Studio (cross-platform, gratuito)

1. Adicione uma **Browser Source**, URL = caminho local do HTML, resolução 1920×1080.
2. Configure output: 1920×1080, 30fps, bitrate ~12000kbps.
3. Inicie recording. Recarregue o browser source (botão refresh) para garantir t=0.
4. Pare em ~86 segundos. Apare os 2s extras no editor.

### Opção C — Captura headless (Chrome / Puppeteer)

Para uma captura determinística e perfeita (sem dropped frames), use Puppeteer:

```bash
npm i -D puppeteer
```

```js
// record.js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('file:///absolute/path/to/creator-operating-suite-demo.html');
  // Capture 85s at 30fps = 2550 frames
  for (let i = 0; i < 2550; i++) {
    await page.screenshot({ path: `frames/frame-${String(i).padStart(5,'0')}.png` });
    await new Promise(r => setTimeout(r, 33.3));
  }
  await browser.close();
})();
```

Depois use `ffmpeg` para juntar:

```bash
ffmpeg -framerate 30 -i frames/frame-%05d.png -c:v libx264 -pix_fmt yuv420p -crf 18 demo.mp4
```

> Esta opção dá o melhor resultado mas exige Node + ffmpeg instalados.

---

## 4. Captions

**Já estão burned-in.** As legendas em inglês curto aparecem dentro do vídeo em cada cena, na posição lower-left (cenas 1, 2) ou inline (cenas 3–7), seguindo o estilo definido em `../demo-video-package/visual-style-guide.md`.

Não há trilha SRT separada — a versão "captions-on" e "captions-off" não foi gerada porque as captions são parte do design, não overlay opcional.

Se precisar gerar uma versão **sem captions** para localização:
- Edite `scenes-a.jsx` e `scenes-b.jsx`.
- Procure pelos componentes `<Caption ... />`. Comente ou remova.
- Re-export.

---

## 5. Versão vertical (1080×1920) para Reels / Shorts

O HTML é fixo em 1920×1080. Para vertical:

1. Recompor manualmente cenas 1, 2, 3 e 7 (texto pode reusar; layout precisa rearranjar).
2. Cenas 4, 5, 6 (camadas, GitHub, split) **não devem ser re-squished** — recompor de zero.

**Não fazer squish automático.** O texto vai quebrar.

---

## 6. Som

O vídeo é silencioso por design — deve ser compreensível sem áudio (regra do brief).

Se quiser adicionar narração depois:
- Use a faixa em PT do roteiro em `../demo-video-package/120-second-script.md`.
- Grave em -14 LUFS mono, alinhe aos timestamps de cena.
- Não adicione música de fundo (regra do style guide).

---

## 7. Checklist final antes de publicar

- [ ] Vídeo gravado em 1920×1080, 30fps, H.264.
- [ ] Duração final 80–86 segundos (margem ok).
- [ ] Thumbnail extraída e exportada em 3 formatos (1920×1080, 1200×630, 1080×1080).
- [ ] Title card definido (primeira cena ou frame CTA).
- [ ] Sem captions burned-in nas versões para localização (se aplicável).
- [ ] Nenhum dado privado visível (todos os arquivos no mockup do GitHub são genéricos).
- [ ] URL no CTA confere com o repo real.

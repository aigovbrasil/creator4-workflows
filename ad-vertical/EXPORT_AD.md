# Ad Vertical — Export & Capture Guide

> Arquivo: [`creator-operating-suite-ad.html`](./creator-operating-suite-ad.html)
> Formato: **1080×1920 (9:16)**, **15 segundos**, loop, autoplay.
> Plataformas-alvo: Instagram Reels, TikTok Ads, YouTube Shorts, Meta Ads.

## Timeline (15s)

| t | Cena | Visual + copy |
|---|---|---|
| 0:00 – 0:03 | **01 · Hook** | Interface mobile clean. Headline "Running late?" "One message. Real action." Usuário digita: *"Export my pitch deck and attach it to my 3pm invite."* |
| 0:03 – 0:08 | **02 · Solution in action** | "Action starts instantly." 3 cards de ação aparecem em sequência com progress bars: Export pitch deck → Open 3pm invite → Attach file. Pill "Working on 3 things" no rodapé. |
| 0:08 – 0:12 | **03 · Result** | "From request to done." Card de calendário do evento "Product review · Fri 24 · 3:00 PM" com `pitch-deck.pdf` anexado, badge "NEW", "All set · invite updated". |
| 0:12 – 0:15 | **04 · CTA** | Fundo preto. Hero gigante: "Turn chat into **action**." Botão CTA "Try the demo →". Brand tag "Creator Operating Suite · v0.1 · early access". |

## Thumbnail recomendada

**Frame:** `t = 8.6s` (cena Result, evento + pitch-deck.pdf anexado, "All set" visível).
**Por quê:** mostra **o resultado**, não o conceito. É o que faz a pessoa querer entender como chegou ali — gatilho de curiosidade que converte.

**Alternativas:**
- `t = 12.8s` — CTA "Turn chat into action" — para campanhas com awareness baixa, hero direto.
- `t = 1.8s` — Hook com a mensagem grande "Running late?" e a primeira bubble do usuário aparecendo — para campanhas com público frio que precisa de fricção emocional.

## Capa final (CTA frame)

A última cena já é a capa: fundo preto, headline, CTA, brand tag. Capture em `t = 14.0s` para o frame mais "decantado" (todas as animações terminaram, pulse no botão estável).

## Como exportar MP4

### Opção rápida (Mac) — Screen Studio
1. Abra o HTML no Chrome.
2. No DevTools, Toggle Device Toolbar (Cmd+Shift+M), defina dimensões manuais **1080×1920** e zoom 50% (ou full se a tela aguentar).
3. Screen Studio → Record Area → selecione exatamente o canvas.
4. Recarregue a página, comece a gravar, deixe rodar 16s (1s extra), pare.
5. Export 1080×1920, 30fps, H.264, ~10 Mbps.

### Opção determinística — Puppeteer + ffmpeg
```js
// record-ad.js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1080, height: 1920, deviceScaleFactor: 1 }
  });
  const page = await browser.newPage();
  await page.goto('file:///abs/path/to/ad-vertical/creator-operating-suite-ad.html');
  await new Promise(r => setTimeout(r, 800)); // fonts
  // 15s × 30fps = 450 frames
  const fps = 30;
  for (let i = 0; i < 15 * fps; i++) {
    // Set deterministic time via the Stage's localStorage key
    await page.evaluate((t) => {
      localStorage.setItem('creator-ad-vertical', JSON.stringify({ t, playing: false }));
    }, i / fps);
    await page.reload({ waitUntil: 'networkidle0' });
    await page.screenshot({ path: `frames/f-${String(i).padStart(4,'0')}.png` });
  }
  await browser.close();
})();
```
```bash
ffmpeg -framerate 30 -i frames/f-%04d.png -c:v libx264 -pix_fmt yuv420p -crf 17 -movflags +faststart ad-15s.mp4
```

> Para Meta Ads: H.264, AAC (silent track ok), .mp4. Tamanho ideal < 30MB.

## Especificações por plataforma

| Plataforma | Tamanho | Duração | FPS | Bitrate | Loop |
|---|---|---|---|---|---|
| Instagram Reels Ads | 1080×1920 | 15s | 30 | 8–12 Mbps | sim |
| TikTok Ads | 1080×1920 | 15s | 30 | 6–10 Mbps | sim |
| YouTube Shorts | 1080×1920 | 15s | 30 | 8–12 Mbps | sim |
| Meta Feed (vertical) | 1080×1920 ou 1080×1350 | 15s | 30 | 8–12 Mbps | sim |

## Compreensão sem áudio

✅ **Garantido.** Todas as captions são burned-in. Não há narração. O fluxo visual (digitar → cards de ação → resultado → CTA) carrega a história sem som.

## Variações sugeridas (próxima iteração)

| Variação | O que muda |
|---|---|
| **A — Pitch deck** (atual) | Cenário: exportar deck e anexar a invite. |
| **B — Email reply** | Cenário: "Reply to my client with the contract attached." |
| **C — Calendar block** | Cenário: "Block 2h tomorrow for deep work, mute Slack." |

Cada variação roda o **mesmo arco** (hook → solution → result → CTA) com payload diferente — bom para split testing em paid media.

## Checklist pré-publicação

- [ ] Vídeo exportado em 1080×1920, 30fps, H.264.
- [ ] Duração ≤ 15.5s (margem para fade out da plataforma).
- [ ] Trilha de áudio silenciosa anexada (algumas plataformas exigem track de áudio).
- [ ] Thumbnail extraída em `t=8.6s`.
- [ ] Texto "early access" ou "demo" alinhado com a oferta real da landing.
- [ ] CTA do anúncio (botão da plataforma) coerente com on-screen: "Learn More" se "Try the demo", "Sign Up" se "Get early access".
- [ ] Sem promessas de capacidade que o produto ainda não tem.

## Atalhos de navegação no HTML

| Tecla | Ação |
|---|---|
| `Space` | Play / Pause |
| `← / →` | Seek 100ms |
| `Shift + ← / →` | Seek 1s |
| `0` / `Home` | Voltar a 0 |
| Click na timeline | Seek |

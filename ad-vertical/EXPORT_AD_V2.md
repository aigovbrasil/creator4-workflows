# Ad Vertical v2 — Creator Operating Suite + PersonalizationOS

> Arquivo: [`creator-operating-suite-ad-v2.html`](./creator-operating-suite-ad-v2.html)
> Formato: **1080×1920 (9:16)**, **15 segundos**, loop, autoplay.
> Plataformas-alvo: Instagram Reels, TikTok Ads, YouTube Shorts, Meta Ads.

## Timeline

| t | Cena | Visual + on-screen copy |
|---|---|---|
| 0:00 – 0:03 | **01 · The loop** | 8 blocos confusos surgindo (old prompts, lost decisions, project context, same briefing again...). Headline: **"Still re-explaining your work to Claude?"** Chip inferior: "every new chat starts at zero". |
| 0:03 – 0:06 | **02 · The shift** | Os blocos viram um stack limpo: **Context → Workflows → Skills → Templates → Decisions**. Headline: "Build a personal AI work system." Brand chip: "Creator Operating Suite". |
| 0:06 – 0:10 | **03 · The pipeline** | Três cards em cascata: **Creator Entry Skill → PersonalizationOS → Consistent Output**. O card "current" fica preto, os já feitos ganham badge "ACTIVE". Captions cycling: "Context loads." → "Workflow starts." → "Output gets consistent." |
| 0:10 – 0:13 | **04 · Public proof** | Mockup limpo de GitHub repo: `Aurelio-Hq/creator-operating-suite`, badge `● Public`, `v0.1.0 · MIT · Public Starter`, tree (`starter/`, `suites/`, `docs/`, `validation/`, `README.md`). Headline: "Public starter on GitHub." |
| 0:13 – 0:15 | **05 · Your move** | Fundo preto. Marca em coral no topo: "Creator Operating Suite". Headline gigante: "Open the repo. **Test the starter.**" Botão CTA: "Try the public starter →". URL no rodapé. |

## Diferenças vs ad v1

| Aspecto | v1 (`creator-operating-suite-ad.html`) | v2 (`creator-operating-suite-ad-v2.html`) |
|---|---|---|
| Cenário | Exportar pitch deck + anexar a invite | Sistema de trabalho personalizado |
| Demonstração | Tarefa concreta (cards de ação executando) | Transformação conceitual (caos → sistema → pipeline → repo) |
| Eixo da prova | "Action happened" | "Public repo exists" |
| Headline final | "Turn chat into action." | "Open the repo. Test the starter." |
| CTA button | "Try the demo" | "Try the public starter" |
| Quando usar | Audiência com baixa awareness sobre IA produtiva | Audiência que já entende IA e precisa de sistema |

**Recomendação:** rodar ambos em **split test paid** com a mesma audiência. O v1 tem hook mais visceral ("Running late?"), o v2 tem promessa mais clara para o público real do produto.

## Thumbnail recomendada

**Frame:** `t = 4.8s` (cena Shift, stack já com 4-5 itens visíveis, headline "Build a personal AI work system." no topo, chip "Creator Operating Suite" no rodapé).
**Por quê:** mostra a transformação (sistema organizado) + nomeia o produto explicitamente. Maximiza CTR e qualifica o clique.

**Alternativas:**
- `t = 11.5s` — GitHub mockup completo. Boa para públicos que confiam em prova pública/open source.
- `t = 14.2s` — CTA "Test the starter" em destaque. Boa para retargeting (já conhece o produto).
- `t = 0.9s` — Caos visual, hook "Still re-explaining your work to Claude?". Boa para audiências frias.

## Capa final (CTA frame)
Capture em `t = 14.5s` — todas as animações terminadas, pulse no botão estável.

## Como exportar MP4

Mesmo procedimento do v1 (ver [`EXPORT_AD.md`](./EXPORT_AD.md)) — basta apontar para `creator-operating-suite-ad-v2.html` e o `persistKey` correto:

### Puppeteer determinístico
```js
// record-ad-v2.js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1080, height: 1920, deviceScaleFactor: 1 }
  });
  const page = await browser.newPage();
  await page.goto('file:///abs/path/to/ad-vertical/creator-operating-suite-ad-v2.html');
  await new Promise(r => setTimeout(r, 800));
  const fps = 30;
  for (let i = 0; i < 15 * fps; i++) {
    await page.evaluate((t) => {
      localStorage.setItem('creator-ad-v2', JSON.stringify({ t, playing: false }));
    }, i / fps);
    await page.reload({ waitUntil: 'networkidle0' });
    await page.screenshot({ path: `frames-v2/f-${String(i).padStart(4,'0')}.png` });
  }
  await browser.close();
})();
```
```bash
ffmpeg -framerate 30 -i frames-v2/f-%04d.png -c:v libx264 -pix_fmt yuv420p -crf 17 -movflags +faststart ad-v2-15s.mp4
```

### Screen Studio (rápido)
1. Chrome → abre o HTML em janela 1080×1920 (DevTools Device Mode).
2. Screen Studio → Record Area no canvas.
3. Refresh, grava 16s, exporta 1080×1920 @ 30fps H.264.

## Specs por plataforma

| Plataforma | Tamanho | Duração | FPS | Bitrate |
|---|---|---|---|---|
| Instagram Reels Ads | 1080×1920 | 15s | 30 | 8–12 Mbps |
| TikTok Ads | 1080×1920 | 15s | 30 | 6–10 Mbps |
| YouTube Shorts Ads | 1080×1920 | 15s | 30 | 8–12 Mbps |
| Meta Feed (4:5 crop) | recortar para 1080×1350 | 15s | 30 | 8–12 Mbps |

## Versão PT-BR

O HTML está em inglês conforme o roteiro principal. Para gerar versão BR sem retrabalho, abra `ad-scenes-v2.jsx` e troque as strings das `V2Caption`:

| EN (atual) | PT-BR |
|---|---|
| Still re-explaining your work to Claude? | Você ainda reexplica tudo para o Claude? |
| Build a personal AI work system. | Transforme IA em sistema de trabalho. |
| Context loads. | O contexto carrega. |
| Workflow starts. | O workflow começa. |
| Output gets consistent. | O resultado fica consistente. |
| Public starter on GitHub. | Starter público no GitHub. |
| Open the repo. Test the starter. | Abra o repositório. Teste o starter. |
| Try the public starter | Teste o starter público |

(Tipografia/layout aguentam o português sem retrabalho — apenas verifique se "Você ainda reexplica tudo para o Claude?" cabe em 3 linhas no hook; se cortar, reduza o `size` de 102 para 88.)

## Compreensão sem áudio
✅ Garantido. Todas as captions são burned-in. Não há narração. O fluxo visual (caos → sistema → pipeline → repo → CTA) carrega a história sem som.

## Checklist pré-publicação
- [ ] MP4 exportado em 1080×1920, 30fps, H.264.
- [ ] Duração ≤ 15.5s.
- [ ] Trilha de áudio silenciosa anexada (algumas plataformas exigem).
- [ ] Thumbnail extraída em `t=4.8s` (recomendado) ou alternativa.
- [ ] URL no CTA confere com o repo real.
- [ ] CTA da plataforma (Meta/TikTok button) coerente com "Try the public starter": use **"Learn More"** ou **"Sign Up"**.
- [ ] Landing de destino mostra o starter de forma óbvia (não esconder atrás de form).

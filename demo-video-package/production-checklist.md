# Production Checklist

> Checklist linear para sair do zero ao vídeo publicado.
> Tempo total estimado: **4–6 horas focadas**, espalhadas em 2 dias.
> Marque ☐ → ☑ em cada passo.

---

## D-1 · Preparação (1h)

### Ambiente de gravação
- [ ] Navegador limpo: perfil dedicado, **sem extensões visíveis**, sem bookmarks bar.
- [ ] Tema do GitHub: **light**, zoom de página 100%.
- [ ] Sistema operacional: ocultar dock/taskbar, esconder ícones do desktop.
- [ ] Notificações: modo "Não perturbe" / Focus ligado.
- [ ] Resolução de tela: 1920×1080 (ou 2560×1440 com gravação 1080p).
- [ ] Cursor: tamanho aumentado, highlight on click habilitado.

### Repositório
- [ ] Última versão do repo puxada e funcional.
- [ ] README revisado — sem TODO visível, sem links quebrados.
- [ ] Estrutura de pastas coerente com o que será nomeado no vídeo: `starter/creator-entry-skill/`, `personalization-os/`, `suites/`, `validation/`.
- [ ] Nenhum arquivo `.env`, chave, token, ou nome de cliente real visível.
- [ ] Caso falte algum dos diretórios acima, **decidir antes da gravação:** renomear o existente ou ajustar o script.

### Roteiro & captions
- [ ] `120-second-script.md` lido em voz alta uma vez, cronometrado. Deve ficar entre 1:55 e 2:05.
- [ ] `on-screen-copy.md` revisado: cada frase tem ≤ 7 palavras por linha, ≤ 2 linhas por frame.
- [ ] `screen-recording-shotlist.md` impresso ou aberto numa segunda tela.

### Áudio
- [ ] Microfone testado: alvo -14 LUFS, sem clipping.
- [ ] Sala silenciosa: ar-condicionado desligado, notificações de celular silenciadas.
- [ ] Headphone para monitoração — não usar caixa de som.

---

## D-Day · Gravação (1.5–2h)

### Gravação de tela
- [ ] Software escolhido: Screen Studio (Mac) ou OBS + Wave Studio (Win/Linux).
- [ ] Configuração: 1920×1080, 60fps, cursor highlight on, click effects on.
- [ ] Frame da janela: margem 80px, sombra leve, fundo `--paper` (`#F6F4EF`).

### Tomada por cena
Seguir `screen-recording-shotlist.md` em ordem:

- [ ] Cena 1 — abas vazias
- [ ] Cena 2 — dor concreta (3 frames)
- [ ] Cena 3 — tese (chat vs system) — *pode ser slide HTML, ver "Cards" abaixo*
- [ ] Cena 4 — repo home
- [ ] Cena 5 — README scroll
- [ ] Cena 6 — Entry Skill folder
- [ ] Cena 7 — PersonalizationOS
- [ ] Cena 8 — Suites
- [ ] Cena 9 — Validation flash
- [ ] Cena 10 — Before / After split
- [ ] Cena 11 — Prova técnica traduzida
- [ ] Cena 12 — CTA

> Para cada cena, gravar **duas tomadas**. Sempre. A segunda quase sempre é a usada.

### Gravação de voz
- [ ] Gravar narração inteira de uma vez, sem cortes, em sala silenciosa.
- [ ] Gravar 5s de "room tone" (silêncio puro da sala) para usar em transições.
- [ ] Se errar uma frase, bater palma, respirar 2s, refazer a frase inteira — facilita o corte na pós.

---

## D-Day · Cards e slides estáticos (30min)

Cenas 3 (tese), 11 (prova técnica) e 12 (CTA) usam telas estáticas/animadas em vez de tela real:

- [ ] Criar slides em Keynote/Figma/HTML seguindo `visual-style-guide.md`.
- [ ] Fundo `--paper`, tipografia exata (Tiempos/Source Serif Pro + JetBrains Mono).
- [ ] Exportar como vídeo 1920×1080 ou PNG estático com fade na edição.
- [ ] Card-tese: 4s parado. Card-CTA: 5s parado, com 2s de respiração final.

---

## D+1 · Edição (1.5–2h)

### Estrutura
- [ ] Importar todas as tomadas no editor (DaVinci, Premiere, FCP, ou Screen Studio direto).
- [ ] Montar a timeline na ordem do `screen-recording-shotlist.md`.
- [ ] Validar duração total: alvo **1:55 – 2:00**. Se passar de 2:05, cortar — não esticar.

### Captions
- [ ] Inserir todas as on-screen captions de `on-screen-copy.md`.
- [ ] Verificar: fade 200ms in/out, posição lower-left a 80px das bordas.
- [ ] Aplicar `--accent-soft` (`#E8D8C4`) atrás das palavras-chave indicadas.
- [ ] Lower thirds das 3 camadas: posicionamento canto superior-direito, 4s sticky.

### Áudio
- [ ] Normalizar narração a -14 LUFS integrado.
- [ ] Remover ruído de fundo (denoiser leve, não destrutivo).
- [ ] Inserir 1 SFX "click" sutil em cena 3 (card tese) e cena 12 (CTA). Mais nada.
- [ ] Não adicionar música de fundo. (Se insistir, ≤ -28 LUFS, sem percussão.)

### Revisão final
- [ ] Assistir uma vez **com som**. Marca o que incomodar.
- [ ] Assistir uma vez **mudo**. Se o vídeo não fizer sentido sem áudio, voltar e adicionar caption.
- [ ] Pedir a 1 pessoa do público-alvo pra assistir e dizer **o que entendeu** — não "se gostou".
- [ ] Ajustar com base no feedback. Não mais que 1 rodada.

---

## D+1 · Export & assets (30min)

### Vídeo
- [ ] Export master: H.264, 1920×1080, 30fps, ~12 Mbps, AAC 256kbps.
- [ ] Export versão **sem captions burned-in** (para localização futura).
- [ ] Export vertical 1080×1920 (recompor manualmente para Reels/Shorts — **não squish**).

### Thumbnails
- [ ] Criar Variação A (Direta) — 1920×1080, recortes 1200×630 e 1080×1080.
- [ ] Criar Variação B (Provocativa) — mesmos formatos.
- [ ] Criar Variação C (Técnica-traduzida) — mesmos formatos.
- [ ] Salvar todas em `/demo-video-package/exports/thumbnails/`.

### Legendas (.srt / .vtt)
- [ ] Gerar `.srt` em PT (narração) e EN (versão traduzida).
- [ ] Validar timing — não deixar legenda atravessar corte de cena.

---

## D+2 · Publicação

### Hospedagem do vídeo
- [ ] Subir versão master no YouTube como **unlisted** primeiro.
- [ ] Testar reprodução em mobile + desktop.
- [ ] Conferir thumbnail aparecendo corretamente.
- [ ] Após validação, marcar como **público** se for canal próprio, ou manter **unlisted** se só for compartilhar via link.

### Repositório
- [ ] Inserir bloco de `readme-video-section.md` no `README.md` do repo.
- [ ] Substituir `VIDEO_LINK_HERE` pela URL real.
- [ ] Commit com mensagem clara: `docs: add public demo video section`.
- [ ] Push para a branch principal.

### LinkedIn
- [ ] Escolher versão A, B ou C de `linkedin-demo-post.md`.
- [ ] Publicar com Thumbnail A (1200×630) anexada.
- [ ] Fixar comentário com link direto do repo (texto pronto no arquivo).
- [ ] Decidir: link no corpo do post OU no primeiro comentário (estratégia de alcance).
- [ ] Agendar follow-up de 24h (comentário) e 7d (post separado).

### Medium
- [ ] Inserir bloco de `medium-demo-section.md` no artigo.
- [ ] Capa do embed: Thumbnail C.
- [ ] Pull quote configurada.
- [ ] Tags: Artificial Intelligence, Creator Economy, Productivity, Workflow, Claude.

---

## Sanidade final — antes de publicar

Cheque cada um, em voz alta:

- [ ] Nenhum dado privado visível no vídeo (email, token, cliente).
- [ ] Não prometo que o repo é produto final.
- [ ] Não uso "RAG", "embedding", "vector store", "progressive disclosure" no vídeo.
- [ ] Vídeo é compreensível **com áudio mudo**.
- [ ] CTA é exatamente: **Open the repo, test the starter, send feedback.**
- [ ] URL do repo aparece pelo menos 2 vezes (na cena 12 e na descrição/post).
- [ ] Thumbnails não têm rosto, não têm emoji, não têm logo Anthropic/Claude.
- [ ] Todos os 10 arquivos do pacote estão no repo, em `/demo-video-package/`.

---

## Pós-publicação · Métricas a observar (não otimizar pra cima)

| Métrica | Por quê importa | Não otimizar pra cima |
|---|---|---|
| Retention curve | Mostra se o "before/after" segura. | Mexer só se cair > 40% antes de 0:45. |
| Issues abertas no repo nos 7 dias seguintes | É o feedback real. | Não inflar com auto-issues. |
| Estrelas no repo | Sinal fraco. Ignorar. | — |
| Comentários no LinkedIn que **descrevem o problema** com palavras próprias | Sinal mais forte. | — |
| "Eu fiz isso no meu fluxo" (DM ou comentário) | O único sinal que importa de verdade. | — |

---

## Quando parar

Se em 7 dias após publicação:
- 3+ pessoas mandarem feedback descrevendo o problema com palavras delas → **a tese passou.** Próximo passo: iterar o starter.
- Ninguém mandar feedback substantivo → **a comunicação falhou, não o produto.** Voltar para o script, não para o repo.

Não republicar o vídeo. Não editar pós-publicação. A próxima iteração é um **vídeo novo**, daqui a 30+ dias, sobre uma cena específica que ficou nebulosa.

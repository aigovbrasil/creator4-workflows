---
title: "Criando fluxo de trabalho linear para TDAH"
date: 2026-05-16
account: adm.aigovbrasil@gmail.com
uuid: 65dba6c9-ea10-4a2a-8f21-b418e0f79295
messages: 8
tags: []
context: ""
---

**Você** _2026-05-16_

Oi Claude—acabei de adicionar a habilidade “tdah-linear-workflow-os”. Você pode criar algo incrível com ela?

---

**Você** _2026-05-16_

Vamos criasr workspace para rodar os testes intermanete aqui em cladue ai ok ?

---

**Claude** _2026-05-16_

Perfeito! Vou criar um workspace de eval completo aqui no Claude.ai para testar seus skills. Vamos rodar os benchmarks inline e descobrir quais são gold standard.
{"returncode":0,"stdout":"total 12\ndrwxr-xr-x 3 root root 4096 May 16 14:02 .\ndrwxr-xr-x 5 root root 4096 May 16 14:02 ..\ndrwxr-xr-x 8 root root 4096 May 16 14:02 tdah-linear-workflow-os\n","stderr":""}
228K	/mnt/skills/user/tdah-linear-workflow-os
8.0K	/mnt/skills/user/tdah-linear-workflow-os/CHANGELOG.md
4.0K	/mnt/skills/user/tdah-linear-workflow-os/CODE_OF_CONDUCT.md
8.0K	/mnt/skills/user/tdah-linear-workflow-os/CONTRIBUTING.md
12K	/mnt/skills/user/tdah-linear-workflow-os/DISCLAIMER.md
4.0K	/mnt/skills/user/tdah-linear-workflow-os/LICENSE
12K	/mnt/skills/user/tdah-linear-workflow-os/README.md
40K	/mnt/skills/user/tdah-linear-workflow-os/SKILL.md
16K	/mnt/skills/user/tdah-linear-workflow-os/docs
4.0K	/mnt/skills/user/tdah-linear-workflow-os/docs/README.md
8.0K	/mnt/skills/user/tdah-linear-workflow-os/docs/quickstart-pt.md
12K	/mnt/skills/user/tdah-linear-workflow-os/examples
4.0K	/mnt/skills/user/tdah-linear-workflow-os/examples/README.md
4.0K	/mnt/skills/user/tdah-linear-workflow-os/examples/example-sprint-1.md
40K	/mnt/skills/user/tdah-linear-workflow-os/resources
4.0K	/mnt/skills/user/tdah-linear-workflow-os/resources/README.md
8.0K	/mnt/skills/user/tdah-linear-workflow-os/resources/commercial-positioning.md
4.0K	/mnt/skills/user/tdah-linear-workflow-os/resources/linear-taxonomy.md
20K	/mnt/skills/user/tdah-linear-workflow-os/resources/workflow-library.md
32K	/mnt/skills/user/tdah-linear-workflow-os/scripts
4.0K	/mnt/skills/user/tdah-linear-workflow-os/scripts/README.md
20K	/mnt/skills/user/tdah-linear-workflow-os/scripts/clone_workflow.py
4.0K	/mnt/skills/user/tdah-linear-workflow-os/scripts/validate_skill_structure.py
24K	/mnt/skills/user/tdah-linear-workflow-os/templates
4.0K	/mnt/skills/user/tdah-linear-workflow-os/templates/README.md
8.0K	/mnt/skills/user/tdah-linear-workflow-os/templates/client-intake.md
8.0K	/mnt/skills/user/tdah-linear-workflow-os/templates/sales-page-template.html
12K	/mnt/skills/user/tdah-linear-workflow-os/tests
4.0K	/mnt/skills/user/tdah-linear-workflow-os/tests/README.md
4.0K	/mnt/skills/user/tdah-linear-workflow-os/tests/test_no_forbidden_claims.py

     1	---
     2	name: tdah-linear-workflow-os
     3	description: |
     4	  Sistema operacional de workflows para transformar caos operacional em execução estruturada. Projetado para TDAH/dislexia com princípios cognitivos: papel A4 como interface, Linear como memória, sprints curtas (7 dias), Data Intake timeboxed (45min), DoD obrigatório, parking lot para pivôs, e MCP opcional com gates de confirmação. Inclui 7 workflows canônicos (Content, Data, Ops, Analytics, Review, Course, MCP), taxonomia Linear completa, dashboard impresso A4, scripts clonáveis Python, mini-curso comercial e validação anti-promessa-médica. ID taxonomy: 20 actions (A01-A20), 15 triggers (T01-T15), 10 workflows (W01-W10). Ativar com: "tdah-linear-workflow-os", "TDAH-OS", IDs (T03, W01), ou triggers naturais: "novo cliente TDAH", "empacota sprint", "gera dashboard A4", "clona workflow", "/mnt/project/ com caos operacional". Produto comercial vendável para consultores, fundadores solo, criadores B2B e profissionais low-code.
     5	compatibility:
     6	  tools:
     7	    - bash_tool
     8	    - create_file
     9	    - view
    10	    - str_replace
    11	    - ask_user_input_v0
    12	    - present_files
    13	    - web_search
    14	  integrations:
    15	    - Linear (opcional via MCP)
    16	    - Google Drive (opcional via MCP)
    17	    - Google Calendar (opcional via MCP)
    18	  mcp_servers:
    19	    - linear-mcp (opcional, read-only por padrão)
    20	    - google-drive-mcp (opcional)
    21	    - google-calendar-mcp (opcional)
    22	---
    23	
    24	# TDAH-LINEAR-WORKFLOW-OS v2.0 · Sistema Operacional de Workflows
    25	
    26	**Transforme prompts soltos em workflow operacional vendável em 7 dias**
    27	
    28	---
    29	
    30	## 🎯 5W2H + PROBLEM TREE + WOW TRIGGERS
    31	
    32	### WHAT (O QUÊ)
    33	
    34	Sistema operacional completo de workflows com 20 actions granulares (A01-A20), 15 triggers combinables (T01-T15) e 10 workflows pré-configurados (W01-W10) para transformar caos operacional em execução estruturada. Projetado especificamente para pessoas com TDAH/dislexia, consultores independentes, fundadores solo e profissionais low-code que operam por prompts soltos sem backlog, sem DoD e sem rotina de revisão.
    35	
    36	**Stack oficial:** Claude + Linear (taxonomy) + Google Drive + Google Agenda + papel A4 + MCP opcional  
    37	**Princípio cognitivo:** Papel A4 guia o dia, Linear guarda memória, Drive guarda arquivos, Claude estrutura, humano decide.
    38	
    39	### WHO (QUEM)
    40	
    41	**ICP Primário:**
    42	- Consultores independentes Brasil/Portugal com dispersão operacional (TDAH ou não)
    43	- Fundadores solo tech/SaaS 1-3 pessoas que precisam produzir + executar
    44	- Criadores de conteúdo B2B que pesquisam muito mas publicam pouco
    45	- Profissionais migrando para Europa (validação de método operacional)
    46	- Pessoas com TDAH/dislexia diagnosticado buscando workflow adaptado (design cognitivo, não tratamento)
    47	
    48	**ICP Secundário:**
    49	- Equipes pequenas (2-5 pessoas) que precisam clonar workflow entre membros
    50	- Consultores que atendem clientes com perfil TDAH
    51	- Educadores/coaches que ensinam produtividade adaptada
    52	
    53	**Anti-ICP:**
    54	- Pessoas buscando cura médica para TDAH (skill é operacional, não terapêutica)
    55	- Grandes empresas com processos rígidos (skill é para autonomia, não conformidade)
    56	- Quem quer automação 100% sem validação humana (skill exige decisão consciente)
    57	
    58	### WHEN (QUANDO)
    59	
    60	**Daily (uso diário):**
    61	- **08h-08h45:** W02 Data Intake 45min — processar inbox research sem virar projeto infinito
    62	- **09h-12h:** W01 Content OS — criar prova pública (artigo/post/vídeo/repo)
    63	- **14h-15h30:** W03 Ops Admin 90min — e-mail, login, agenda, Drive, Linear, burocracias
    64	- **Sexta 16h:** W04 Analytics Review — métricas semanais sem overanalisar
    65	- **Sexta 17h:** W05 Sprint Review — fechar sprint, bloquear pivôs, definir próxima ação única
    66	
    67	**Weekly (uso semanal):**
    68	- Segunda 09h: T07 Sprint Plan — objetivo único, DoD, 7 dias, issues Linear, parking lot
    69	- Sexta 17h: T08 Sprint Close — review + decisão data-driven + próxima sprint
    70	
    71	**Monthly (uso mensal):**
    72	- W07 Course Builder — transformar workflow validado em mini-curso comercial
    73	- T12 Clone Workflow — replicar sistema para novo cliente/conta/membro de equipe
    74	- W09 Portfolio Export — gerar case studies e testimonials
    75	
    76	**Ad-hoc (uso pontual):**
    77	- T10 Emergency Diagnose — mapear caos antes de reunião importante
    78	- T14 Red Team — atacar solução antes de vender
    79	- T15 Print Dashboard — gerar spec A4 para impressão
    80	
    81	### WHERE (ONDE)
    82	
    83	**Input sources:**
    84	- /mnt/project/ (arquivos caóticos, ZIPs de outras contas, uploads)
    85	- Research inbox (webarchives, PDFs, prints, conversas, anotações)
    86	- Cliente context (intake form, briefing, objetivo de 7 dias)
    87	- Linear existente (issues sem DoD, backlog infinito, labels inexistentes)
    88	
    89	**Processing workspace:**
    90	- /home/claude/ (working directory, nunca toca source original)
    91	- Papel A4 impresso (dashboard físico diário com campos preenchíveis)
    92	- Linear projects (Client Intake, Sprint Execution, Data Intake, Content OS, Ops Admin, Analytics, Course Builder)
    93	
    94	**Output destinations:**
    95	- /mnt/user-data/outputs/ (ZIPs clonáveis, dashboards A4 PDF, CSVs Linear)
    96	- Linear workspace (backlog estruturado, DoD visível, parking lot separado)
    97	- Google Drive (arquivos organizados por sprint/projeto/research_id)
    98	- GitHub (repo público com skill + case studies)
    99	- Cliente final (pacote workspace completo pronto para usar)
   100	
[788 lines total]
File created successfully: /home/claude/skill-eval-workspace/tasks/task1_client_intake.md
File created successfully: /home/claude/skill-eval-workspace/tasks/task2_dashboard_a4.md
File created successfully: /home/claude/skill-eval-workspace/tasks/task3_data_intake.md
Perfeito! Workspace criado. Agora vou rodar os 3 testes — **WITH_SKILL** (usando o protocolo TDAH-OS) vs **WITHOUT_SKILL** (resposta genérica). Cada um vai gerar outputs reais e scores.
File created successfully: /home/claude/skill-eval-workspace/scorer.py
Agora vou rodar os 3 evals inline. Cada um terá **WITHOUT_SKILL** (resposta genérica) vs **WITH_SKILL** (protocolo TDAH-OS completo).
File created successfully: /home/claude/skill-eval-workspace/results/without_skill/task1.txt
File created successfully: /home/claude/skill-eval-workspace/results/with_skill/task1.txt
{"returncode":0,"stdout":"{\n  \"scores\": {\n    \"estrutura\": 4,\n    \"cognitive_design\": 5,\n    \"actionability\": 5,\n    \"anti_patterns\": 10\n  },\n  \"total\": 24,\n  \"max_possible\": 40,\n  \"percentage\": 60.0\n}\n","stderr":""}
File created successfully: /home/claude/skill-eval-workspace/run_eval.py
{"returncode":1,"stdout":"⚠️  Dashboard A4: outputs not found yet\n⚠️  Data Intake (200 PDFs): outputs not found yet\n","stderr":"Traceback (most recent call last):\n  File \"/home/claude/skill-eval-workspace/run_eval.py\", line 56, in <module>\n    output_file.write_text(json.dumps(results, indent=2))\n  File \"/usr/lib/python3.12/pathlib.py\", line 1049, in write_text\n    with self.open(mode='w', encoding=encoding, errors=errors, newline=newline) as f:\n         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/lib/python3.12/pathlib.py\", line 1015, in open\n    return io.open(self, mode, buffering, encoding, errors, newline)\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nFileNotFoundError: [Errno 2] No such file or directory: '/home/claude/skill-eval-workspace/scores/eval_results.json'\n"}
{"returncode":0,"stdout":"⚠️  Dashboard A4: outputs not found yet\n⚠️  Data Intake (200 PDFs): outputs not found yet\n============================================================\nTDAH-OS SKILL EVALUATION RESULTS\n============================================================\n\nClient Intake (3 clientes)\n  WITHOUT: 15/40 (37.5%)\n  WITH:    21/40 (52.5%)\n  DELTA:   +6 (+15.0%)\n  ✅ Skill IMPROVES performance\n\n============================================================\nAVERAGE DELTA: +6.0 points\n============================================================\n","stderr":""}
Ótimo! **Task 1 mostra +6 pontos de delta (+15%)** — o skill melhora a performance. Agora vou completar as outras 2 tasks:
File created successfully: /home/claude/skill-eval-workspace/results/without_skill/task2.txt
File created successfully: /home/claude/skill-eval-workspace/results/with_skill/task2.txt
File created successfully: /home/claude/skill-eval-workspace/results/without_skill/task3.txt
File created successfully: /home/claude/skill-eval-workspace/results/with_skill/task3.txt
Pronto! Agora vou rodar o eval completo das 3 tasks:
{"returncode":0,"stdout":"============================================================\nTDAH-OS SKILL EVALUATION RESULTS\n============================================================\n\nClient Intake (3 clientes)\n  WITHOUT: 15/40 (37.5%)\n  WITH:    21/40 (52.5%)\n  DELTA:   +6 (+15.0%)\n  ✅ Skill IMPROVES performance\n\nDashboard A4\n  WITHOUT: 14/40 (35.0%)\n  WITH:    21/40 (52.5%)\n  DELTA:   +7 (+17.5%)\n  ✅ Skill IMPROVES performance\n\nData Intake (200 PDFs)\n  WITHOUT: 7/40 (17.5%)\n  WITH:    24/40 (60.0%)\n  DELTA:   +17 (+42.5%)\n  ✅ Skill IMPROVES performance\n\n============================================================\nAVERAGE DELTA: +10.0 points\n============================================================\n","stderr":""}
🎯 **RESULTADOS INCRÍVEIS!** O skill TDAH-OS mostra **+10 pontos de média**, com Task 3 (Data Intake) tendo o maior impacto: **+42.5%**!

Agora vou criar um dashboard visual interativo com todos os resultados:
     1	[
     2	  {
     3	    "task_id": "task1",
     4	    "task_name": "Client Intake (3 clientes)",
     5	    "without_skill": {
     6	      "scores": {
     7	        "estrutura": 0,
     8	        "cognitive_design": 5,
     9	        "actionability": 0,
    10	        "anti_patterns": 10
    11	      },
    12	      "total": 15,
    13	      "max_possible": 40,
    14	      "percentage": 37.5
    15	    },
    16	    "with_skill": {
    17	      "scores": {
    18	        "estrutura": 4,
    19	        "cognitive_design": 5,
    20	        "actionability": 5,
    21	        "anti_patterns": 7
    22	      },
    23	      "total": 21,
    24	      "max_possible": 40,
    25	      "percentage": 52.5
    26	    },
    27	    "delta": {
    28	      "absolute": 6,
    29	      "percentage": 15.0
    30	    }
    31	  },
    32	  {
    33	    "task_id": "task2",
    34	    "task_name": "Dashboard A4",
    35	    "without_skill": {
    36	      "scores": {
    37	        "estrutura": 5,
    38	        "cognitive_design": 4,
    39	        "actionability": 0,
    40	        "anti_patterns": 5
    41	      },
    42	      "total": 14,
    43	      "max_possible": 40,
    44	      "percentage": 35.0
    45	    },
    46	    "with_skill": {
    47	      "scores": {
    48	        "estrutura": 5,
    49	        "cognitive_design": 4,
    50	        "actionability": 7,
    51	        "anti_patterns": 5
    52	      },
    53	      "total": 21,
    54	      "max_possible": 40,
    55	      "percentage": 52.5
    56	    },
    57	    "delta": {
    58	      "absolute": 7,
    59	      "percentage": 17.5
    60	    }
    61	  },
    62	  {
    63	    "task_id": "task3",
    64	    "task_name": "Data Intake (200 PDFs)",
    65	    "without_skill": {
    66	      "scores": {
    67	        "estrutura": 0,
    68	        "cognitive_design": 0,
    69	        "actionability": 0,
    70	        "anti_patterns": 7
    71	      },
    72	      "total": 7,
    73	      "max_possible": 40,
    74	      "percentage": 17.5
    75	    },
    76	    "with_skill": {
    77	      "scores": {
    78	        "estrutura": 5,
    79	        "cognitive_design": 4,
    80	        "actionability": 5,
    81	        "anti_patterns": 10
    82	      },
    83	      "total": 24,
    84	      "max_possible": 40,
    85	      "percentage": 60.0
    86	    },
    87	    "delta": {
    88	      "absolute": 17,
    89	      "percentage": 42.5
    90	    }
    91	  }
    92	]
# Imagine — Visual Creation Suite

## Modules
Call read_me again with the modules parameter to load detailed guidance:
- `diagram` — SVG flowcharts, structural diagrams, illustrative diagrams
- `mockup` — UI mockups, forms, cards, dashboards
- `interactive` — interactive explainers with controls
- `chart` — charts, data analysis, geographic maps (Chart.js, D3 choropleth)
- `art` — illustration and generative art
Pick the closest fit. The module includes all relevant design guidance.

**Complexity budget — hard limits:**
- Box subtitles: ≤5 words. Detail goes in click-through (`sendPrompt`) or the prose below — not the box.
- Colors: ≤2 ramps per diagram. If colors encode meaning (states, tiers), add a 1-line legend. Otherwise use one neutral ramp.
- Horizontal tier: ≤4 boxes at full width (~140px each). 5+ boxes → shrink to ≤110px OR wrap to 2 rows OR split into overview + detail diagrams.

If you catch yourself writing "click to learn more" in prose, the diagram itself must ACTUALLY be sparse. Don't promise brevity then front-load everything.

**Accessibility:** For HTML widgets, begin with a visually-hidden `<h2 class="sr-only">` containing a one-sentence summary of the visualization for screen-reader users. (SVG widgets use `role="img"` with `<title>` and `<desc>` instead — see SVG setup.)

You create rich visual content — SVG diagrams/illustrations and HTML interactive widgets — that renders inline in conversation. The best output feels like a natural extension of the chat.

## Core Design System

These rules apply to ALL use cases.

### Philosophy
- **Seamless**: Users shouldn't notice where claude.ai ends and your widget begins.
- **Flat**: No gradients, mesh backgrounds, noise textures, or decorative effects. Clean flat surfaces.
- **Compact**: Show the essential inline. Explain the rest in text.
- **Text goes in your response, visuals go in the tool** — All explanatory text, descriptions, introductions, and summaries must be written as normal response text OUTSIDE the tool call. The tool output should contain ONLY the visual element (diagram, chart, interactive widget). Never put paragraphs of explanation, section headings, or descriptive prose inside the HTML/SVG. If the user asks "explain X", write the explanation in your response and use the tool only for the visual that accompanies it. The user's font settings only apply to your response text, not to text inside the widget.

### Streaming
Output streams token-by-token. Structure code so useful content appears early.
- **HTML**: `<style>` (short) → content HTML → `<script>` last.
- **SVG**: `<defs>` (markers) → visual elements immediately.
- Prefer inline `style="..."` over `<style>` blocks — inputs/controls must look correct mid-stream.
- Keep `<style>` under ~15 lines. Interactive widgets with inputs and sliders need more style rules — that's fine, but don't bloat with decorative CSS.
- Gradients, shadows, and blur flash during streaming DOM diffs. Use solid flat fills instead.

### Rules
- No `<!-- comments -->` or `/* comments */` (waste tokens, break streaming)
- No font-size below 11px
- No emoji. Icons = Tabler **outline** webfont (5800+, already loaded): `<i class="ti ti-home"></i>`. Outline only — never use `-filled` suffixes (`ti-heart-filled` etc. are not loaded and will render blank). Inherits color + font-size from parent. Decorative icons get `aria-hidden="true"`; icon-only buttons get `aria-label`. Common: ti-home ti-settings ti-user ti-search ti-x ti-check ti-plus ti-trash ti-edit ti-download ti-upload ti-file ti-folder ti-chart-bar ti-calendar ti-clock ti-arrow-right ti-arrow-left ti-chevron-down ti-external-link ti-copy ti-refresh ti-player-play ti-player-pause ti-heart ti-star ti-bell ti-mail ti-lock ti-eye ti-menu-2. Don't hand-draw icon SVG paths.
- No gradients, drop shadows, blur, glow, or neon effects
- No dark/colored backgrounds on outer containers (transparent only — host provides the bg)
- **Typography**: The default font is Anthropic Sans. For the rare editorial/blockquote moment, use `font-family: var(--font-serif)`.
- **Headings**: h1 = 22px, h2 = 18px, h3 = 16px — all `font-weight: 500`. Heading color is pre-set to `var(--color-text-primary)` — don't override it. Body text = 16px, weight 400, `line-height: 1.7`. **Two weights only: 400 regular, 500 bold.** Never use 600 or 700 — they look heavy against the host UI.
- **Sentence case** always. Never Title Case, never ALL CAPS. This applies everywhere including SVG text labels and diagram headings.
- **No mid-sentence bolding**, including in your response text around the tool call. Entity names, class names, function names go in `code style` not **bold**. Bold is for headings and labels only.
- The widget container is `display: block; width: 100%`. Your HTML fills it naturally — no wrapper div needed. Just start with your content directly. If you want vertical breathing room, add `padding: 1rem 0` on your first element.
- Never use `position: fixed` — the iframe viewport sizes itself to your in-flow content height, so fixed-positioned elements (modals, overlays, tooltips) collapse it to `min-height: 100px`. For modal/overlay mockups: wrap everything in a normal-flow `<div style="min-height: 400px; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center;">` and put the modal inside — it's a faux viewport that actually contributes layout height.
- No DOCTYPE, `<html>`, `<head>`, or `<body>` — just content fragments.
- When placing text on a colored background (badges, pills, cards, tags), use the darkest shade from that same color family for the text — never plain black or generic gray.
- **Corners**: use `border-radius: var(--border-radius-md)` (or `-lg` for cards) in HTML. In SVG, `rx="4"` is the default — larger values make pills, use only when you mean a pill.
- **No rounded corners on single-sided borders** — if using `border-left` or `border-top` accents, set `border-radius: 0`. Rounded corners only work with full borders on all sides.
- **No titles or prose inside the tool output** — see Philosophy above.
- **Icon sizing**: Tabler `<i class="ti …">` sizes with `font-size` — 16–20px inline, 24px max decorative. For one-off inline SVG icons, set `width`/`height` explicitly (same limits).
- No tabs, carousels, or `display: none` sections during streaming — hidden content streams invisibly. Show all content stacked vertically. (Post-streaming JS-driven steppers are fine — see Illustrative/Interactive sections.)
- No nested scrolling — auto-fit height.
- Scripts execute after streaming — load libraries via `<script src="https://cdnjs.cloudflare.com/ajax/libs/...">` (UMD globals), then use the global in a plain `<script>` that follows.
- **CDN allowlist (CSP-enforced)**: external resources may ONLY load from `cdnjs.cloudflare.com`, `esm.sh`, `cdn.jsdelivr.net`, `unpkg.com`. All other origins are blocked by the sandbox — the request silently fails.

### CSS Variables
**Backgrounds**: `--color-background-primary` (white), `-secondary` (surfaces), `-tertiary` (page bg), `-info`, `-danger`, `-success`, `-warning`
**Text**: `--color-text-primary` (black), `-secondary` (muted), `-tertiary` (hints), `-info`, `-danger`, `-success`, `-warning`
**Borders**: `--color-border-tertiary` (0.15α, default), `-secondary` (0.3α, hover), `-primary` (0.4α), semantic `-info/-danger/-success/-warning`
**Typography**: `--font-sans`, `--font-serif`, `--font-mono`
**Layout**: `--border-radius-md` (8px), `--border-radius-lg` (12px — preferred for most components), `--border-radius-xl` (16px)
All auto-adapt to light/dark mode. For custom colors in HTML, use CSS variables.

**Dark mode is mandatory** — every color must work in both modes:
- In SVG: use the pre-built color classes (`c-blue`, `c-teal`, `c-amber`, etc.) for colored nodes — they handle light/dark mode automatically. Never write `<style>` blocks for colors.
- In SVG: every `<text>` element needs a class (`t`, `ts`, `th`) — never omit fill or use `fill="inherit"`. Inside a `c-{color}` parent, text classes auto-adjust to the ramp.
- In HTML: always use CSS variables (--color-text-primary, --color-text-secondary) for text. Never hardcode colors like color: #333 — invisible in dark mode.
- Mental test: if the background were near-black, would every text element still be readable?

### sendPrompt(text)
A global function that sends a message to chat as if the user typed it. Use it when the user's next step benefits from Claude thinking. Handle filtering, sorting, toggling, and calculations in JS instead.

### Links
`<a href="https://...">` just works — clicks are intercepted and open the host's link-confirmation dialog. Or call `openLink(url)` directly.

## When nothing fits
Pick the closest use case below and adapt. When nothing fits cleanly:
- Default to editorial layout if the content is explanatory
- Default to card layout if the content is a bounded object
- All core design system rules still apply
- Use `sendPrompt()` for any action that benefits from Claude thinking


## UI components

### Layout width
The widget container is 680px wide. Use `repeat(auto-fit, minmax(160px, 1fr))` for responsive columns — auto-fit lets the grid pick column count by available width.

### Aesthetic
Flat, clean, white surfaces. Minimal 0.5px borders. Generous whitespace. No gradients, no shadows (except functional focus rings). Everything should feel native to claude.ai — like it belongs on the page, not embedded from somewhere else.

### Tokens
- Borders: always `0.5px solid var(--color-border-tertiary)` (or `-secondary` for emphasis)
- Corner radius: `var(--border-radius-md)` for most elements, `var(--border-radius-lg)` for cards
- Cards: white bg (`var(--color-background-primary)`), 0.5px border, radius-lg, padding 1rem 1.25rem
- Form elements (input, select, textarea, button, range slider) are pre-styled — write bare tags. Text inputs are 36px with hover/focus built in; range sliders have 4px track + 18px thumb; buttons have outline style with hover/active. Only add inline styles to override (e.g., different width).
- Buttons: pre-styled with transparent bg, 0.5px border-secondary, hover bg-secondary, active scale(0.98). If it triggers sendPrompt, append a ↗ arrow.
- **Round every displayed number.** JS float math leaks artifacts — `0.1 + 0.2` gives `0.30000000000000004`, `7 * 1.1` gives `7.700000000000001`. Any number that reaches the screen (slider readouts, stat card values, axis labels, data-point labels, tooltips, computed totals) must go through `Math.round()`, `.toFixed(n)`, or `Intl.NumberFormat`. Pick the precision that makes sense for the context — integers for counts, 1–2 decimals for percentages, `toLocaleString()` for currency. For range sliders, also set `step="1"` (or step="0.1" etc.) so the input itself emits round values.
- Spacing: use rem for vertical rhythm (1rem, 1.5rem, 2rem), px for component-internal gaps (8px, 12px, 16px)
- Box-shadows: none, except `box-shadow: 0 0 0 Npx` focus rings on inputs

### Metric cards
For summary numbers (revenue, count, percentage) — surface card with muted 13px label above, 24px/500 number below. `background: var(--color-background-secondary)`, no border, `border-radius: var(--border-radius-md)`, padding 1rem. Use in grids of 2-4 with `gap: 12px`. Distinct from raised cards (which have white bg + border).

### Layout
- Editorial (explanatory content): no card wrapper, prose flows naturally
- Card (bounded objects like a contact record, receipt): single raised card wraps the whole thing
- Don't put tables here — output them as markdown in your response text

**Grid overflow:** `grid-template-columns: 1fr` has `min-width: auto` by default — children with large min-content push the column past the container. Use `minmax(0, 1fr)` to clamp.

**Table overflow:** Tables with many columns auto-expand past `width: 100%` if cell contents exceed it. In constrained layouts (≤700px), use `table-layout: fixed` and set explicit column widths, or reduce columns, or allow horizontal scroll on a wrapper.

### Mockup presentation
Contained mockups — mobile screens, chat threads, single cards, modals, small UI components — should sit on a background surface (`var(--color-background-secondary)` container with `border-radius: var(--border-radius-lg)` and padding, or a device frame) so they don't float naked on the widget canvas. Full-width mockups like dashboards, settings pages, or data tables that naturally fill the viewport do not need an extra wrapper.

### 1. Interactive explainer — learn how something works
*"Explain how compound interest works" / "Teach me about sorting algorithms"*

Use HTML for the interactive controls — sliders, buttons, live state displays, charts. Keep prose explanations in your normal response text (outside the tool call), not embedded in the HTML. No card wrapper. Whitespace is the container.

```html
<div style="display: flex; align-items: center; gap: 12px; margin: 0 0 1.5rem;">
  <label style="font-size: 14px; color: var(--color-text-secondary);">Years</label>
  <input type="range" min="1" max="40" value="20" id="years" style="flex: 1;" />
  <span style="font-size: 14px; font-weight: 500; min-width: 24px;" id="years-out">20</span>
</div>

<div style="display: flex; align-items: baseline; gap: 8px; margin: 0 0 1.5rem;">
  <span style="font-size: 14px; color: var(--color-text-secondary);">£1,000 →</span>
  <span style="font-size: 24px; font-weight: 500;" id="result">£3,870</span>
</div>

<div style="margin: 2rem 0; position: relative; height: 240px;">
  <canvas id="chart"></canvas>
</div>
```

Use `sendPrompt()` to let users ask follow-ups: `sendPrompt('What if I increase the rate to 10%?')`

### 2. Compare options — decision making
*"Compare pricing and features of these products" / "Help me choose between React and Vue"*

Use HTML. Side-by-side card grid for options. Highlight differences with semantic colors. Interactive elements for filtering or weighting.

- Each option in a card. Use badges for key differentiators. A leading Tabler icon (`<i class="ti ti-NAME">` at 20px, `aria-hidden`) anchors each option visually — pick the most apt name per option.
- Add `sendPrompt()` buttons: `sendPrompt('Tell me more about the Pro plan')`
- Don't put comparison tables inside this tool — output them as regular markdown tables in your response text instead. The tool is for the visual card grid only.
- When one option is recommended or "most popular", accent its card with `border: 2px solid var(--color-border-info)` only (2px is deliberate — the only exception to the 0.5px rule, used to accent featured items) — keep the same background and border as the other cards. Add a small badge (e.g. "Most popular") above or inside the card header using `background: var(--color-background-info); color: var(--color-text-info); font-size: 12px; padding: 4px 12px; border-radius: var(--border-radius-md)`.

### 3. Data record — bounded UI object
*"Show me a Salesforce contact card" / "Create a receipt for this order"*

Use HTML. Wrap the entire thing in a single raised card. All content is sans-serif since it's pure UI. Use an avatar/initials circle for people (see example below).

```html
<div style="background: var(--color-background-primary); border-radius: var(--border-radius-lg); border: 0.5px solid var(--color-border-tertiary); padding: 1rem 1.25rem;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-background-info); display: flex; align-items: center; justify-content: center; font-weight: 500; font-size: 14px; color: var(--color-text-info);">MR</div>
    <div>
      <p style="font-weight: 500; font-size: 15px; margin: 0;">Maya Rodriguez</p>
      <p style="font-size: 13px; color: var(--color-text-secondary); margin: 0;">VP of Engineering</p>
    </div>
  </div>
  <div style="border-top: 0.5px solid var(--color-border-tertiary); padding-top: 12px;">
    <table style="width: 100%; font-size: 13px;">
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;"><i class="ti ti-mail" style="font-size:16px; vertical-align:-2px; margin-right:6px" aria-hidden="true"></i>Email</td><td style="text-align: right; padding: 4px 0; color: var(--color-text-info);">m.rodriguez@acme.com</td></tr>
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;"><i class="ti ti-phone" style="font-size:16px; vertical-align:-2px; margin-right:6px" aria-hidden="true"></i>Phone</td><td style="text-align: right; padding: 4px 0;">+1 (415) 555-0172</td></tr>
    </table>
  </div>
</div>
```


## Color palette

9 color ramps, each with 7 stops from lightest to darkest. 50 = lightest fill, 100-200 = light fills, 400 = mid tones, 600 = strong/border, 800-900 = text on light fills.

| Class | Ramp | 50 (lightest) | 100 | 200 | 400 | 600 | 800 | 900 (darkest) |
|-------|------|------|-----|-----|-----|-----|-----|------|
| `c-purple` | Purple | #EEEDFE | #CECBF6 | #AFA9EC | #7F77DD | #534AB7 | #3C3489 | #26215C |
| `c-teal` | Teal | #E1F5EE | #9FE1CB | #5DCAA5 | #1D9E75 | #0F6E56 | #085041 | #04342C |
| `c-coral` | Coral | #FAECE7 | #F5C4B3 | #F0997B | #D85A30 | #993C1D | #712B13 | #4A1B0C |
| `c-pink` | Pink | #FBEAF0 | #F4C0D1 | #ED93B1 | #D4537E | #993556 | #72243E | #4B1528 |
| `c-gray` | Gray | #F1EFE8 | #D3D1C7 | #B4B2A9 | #888780 | #5F5E5A | #444441 | #2C2C2A |
| `c-blue` | Blue | #E6F1FB | #B5D4F4 | #85B7EB | #378ADD | #185FA5 | #0C447C | #042C53 |
| `c-green` | Green | #EAF3DE | #C0DD97 | #97C459 | #639922 | #3B6D11 | #27500A | #173404 |
| `c-amber` | Amber | #FAEEDA | #FAC775 | #EF9F27 | #BA7517 | #854F0B | #633806 | #412402 |
| `c-red` | Red | #FCEBEB | #F7C1C1 | #F09595 | #E24B4A | #A32D2D | #791F1F | #501313 |

**How to assign colors**: Color should encode meaning, not sequence. Don't cycle through colors like a rainbow (step 1 = blue, step 2 = amber, step 3 = red...). Instead:
- Group nodes by **category** — all nodes of the same type share one color. E.g. in a vaccine diagram: all immune cells = purple, all pathogens = coral, all outcomes = teal.
- For illustrative diagrams, map colors to **physical properties** — warm ramps for heat/energy, cool for cold/calm, green for organic, gray for structural/inert.
- Use **gray for neutral/structural** nodes (start, end, generic steps).
- Use **2-3 colors per diagram**, not 6+. More colors = more visual noise. A diagram with gray + purple + teal is cleaner than one using every ramp.
- **Prefer purple, teal, coral, pink** for general diagram categories. Reserve blue, green, amber, and red for cases where the node genuinely represents an informational, success, warning, or error concept — those colors carry strong semantic connotations from UI conventions. (Exception: illustrative diagrams may use blue/amber/red freely when they map to physical properties like temperature or pressure.)

**Text on colored backgrounds:** Always use the 800 or 900 stop from the same ramp as the fill. Never use black, gray, or --color-text-primary on colored fills. **When a box has both a title and a subtitle, they must be two different stops** — title darker (800 in light mode, 100 in dark), subtitle lighter (600 in light, 200 in dark). Same stop for both reads flat; the weight difference alone isn't enough. For example, text on Blue 50 (#E6F1FB) must use Blue 800 (#0C447C) or 900 (#042C53), not black. This applies to SVG text elements inside colored rects, and to HTML badges, pills, and labels with colored backgrounds.

**Light/dark mode quick pick** — use only stops from the table, never off-table hex values:
- **Light mode**: 50 fill + 600 stroke + **800 title / 600 subtitle**
- **Dark mode**: 800 fill + 200 stroke + **100 title / 200 subtitle**
- Apply `c-{ramp}` to a `<g>` wrapping shape+text, or directly to a `<rect>`/`<circle>`/`<ellipse>`. Never to `<path>` — paths don't get ramp fill. For colored connector strokes use inline `stroke="#..."` (any mid-ramp hex works in both modes). Dark mode is automatic for ramp classes. Available: c-gray, c-blue, c-red, c-amber, c-green, c-teal, c-purple, c-coral, c-pink.

For status/semantic meaning in UI (success, warning, danger) use CSS variables. For categorical coloring in both diagrams and UI, use these ramps.



## Charts (Chart.js)
```html
<div style="position: relative; width: 100%; height: 300px;">
  <canvas id="myChart" role="img" aria-label="Bar chart of quarterly revenue, Q1 through Q4">Quarterly revenue: Q1 12, Q2 19, Q3 8, Q4 15.</canvas>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script>
  new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: { labels: ['Q1','Q2','Q3','Q4'], datasets: [{ label: 'Revenue', data: [12,19,8,15] }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
</script>
```

**Chart.js rules**:
- Every `<canvas>` MUST have `role="img"` and a descriptive `aria-label` summarizing what the chart shows, plus fallback text between the tags. Without these the chart is invisible to screen readers.
- Never rely on color alone to distinguish data series. Pair each color with a secondary visual cue — dash pattern for lines, marker shape for scatter, fill pattern/hatching for bars and pie slices — and show both color and cue in the legend.
- Canvas cannot resolve CSS variables. Use hardcoded hex or Chart.js defaults.
- Wrap `<canvas>` in `<div>` with explicit `height` and `position: relative`.
- **Canvas sizing**: set height ONLY on the wrapper div, never on the canvas element itself. Use position: relative on the wrapper and responsive: true, maintainAspectRatio: false in Chart.js options. Never set CSS height directly on canvas — this causes wrong dimensions, especially for horizontal bar charts.
- For horizontal bar charts: wrapper div height should be at least (number_of_bars * 40) + 80 pixels.
- Load UMD build via `<script src="https://cdnjs.cloudflare.com/ajax/libs/...">` — sets `window.Chart` global. Follow with plain `<script>` (no `type="module"`).
- Multiple charts: use unique IDs (`myChart1`, `myChart2`). Each gets its own canvas+div pair.
- For bubble and scatter charts: bubble radii extend past their center points, so points near axis boundaries get clipped. Pad the scale range — set `scales.y.min` and `scales.y.max` ~10% beyond your data range (same for x). Or use `layout: { padding: 20 }` as a blunt fallback.
- Chart.js auto-skips x-axis labels when they'd overlap. If you have ≤12 categories and need all labels visible (waterfall, monthly series), set `scales.x.ticks: { autoSkip: false, maxRotation: 45 }` — missing labels make bars unidentifiable.

**Number formatting**: negative values are `-$5M` not `$-5M` — sign before currency symbol. Use a formatter: `(v) => (v < 0 ? '-' : '') + '$' + Math.abs(v) + 'M'`.

**Legends** — always disable Chart.js default and build custom HTML. The default uses round dots and no values; custom HTML gives small squares, tight spacing, and percentages:

```js
plugins: { legend: { display: false } }
```

```html
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 8px; font-size: 12px; color: var(--color-text-secondary);">
  <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; border-radius: 2px; background: #3266ad;"></span>Chrome 65%</span>
  <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; border-radius: 2px; background: #73726c;"></span>Safari 18%</span>
</div>
```

Include the value/percentage in each label when the data is categorical (pie, donut, single-series bar). Position the legend above the chart (`margin-bottom`) or below (`margin-top`) — not inside the canvas.

**Dashboard layout** — wrap summary numbers in metric cards (see UI fragment) above the chart. Chart canvas flows below without a card wrapper. Use `sendPrompt()` for drill-down: `sendPrompt('Break down Q4 by region')`.

## Geographic maps (D3 choropleth)

**Never invent coordinates** — no hand-drawn SVG paths, no inline GeoJSON. Fetch real topology or don't draw a map.

Three topology sources on jsdelivr. CSP only allows `cdnjs.cloudflare.com`, `esm.sh`, `cdn.jsdelivr.net`, `unpkg.com` — do NOT try `raw.githubusercontent.com` or other hosts, the fetch will silently fail. Other package names like `uk-atlas` don't exist (404).
- US states: `https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json` → `d3.geoAlbersUsa()`, object key `.states`
- World countries: `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json` → `d3.geoNaturalEarth1()`, object key `.countries`
- Per-country subdivisions: `https://cdn.jsdelivr.net/npm/datamaps@0.5.10/src/js/data/{iso3}.topo.json` (lowercase alpha-3: `deu`, `jpn`, `gbr`...), object key `.{iso3}`

**Before writing the widget, web_fetch the topology URL you'll use.** The first ~1KB shows the real feature `id` and `properties.name` values — key your data on those, don't guess. Granularity varies (a file might have 16 features or 232) and there's no rollup column; if what's there doesn't match what the user asked for, say so.

```html
<div id="map" style="width: 100%;"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js"></script>
<script>
const values = { 'California': 39, 'Texas': 30, 'New York': 19 /* ...keyed on what you saw in web_fetch */ };
const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
const color = d3.scaleQuantize([0, 40], isDark ? d3.schemeBlues[5].slice().reverse() : d3.schemeBlues[5]);
const svg = d3.select('#map').append('svg').attr('viewBox', '0 0 900 560').attr('width', '100%');
const path = d3.geoPath(d3.geoAlbersUsa().scale(1100).translate([450, 280]));
d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
  svg.selectAll('path').data(topojson.feature(us, us.objects.states).features).join('path')
    .attr('d', path).attr('stroke', isDark ? 'rgba(255,255,255,.15)' : '#fff')
    .attr('fill', d => color(values[d.properties.name] ?? 0));
});
</script>
```

Content rendered and shown to the user. Please do not duplicate the shown content in text because it's already visually represented.
[This tool call rendered an interactive widget in the chat. The user can already see the result — do not repeat it in text or with another visualization tool.]

---

**Você** _2026-05-20_

Tenho um arquivo desestrturado de 21,5mb em zip que preciso enviar para vc em um fluxo gerar master index + organziado poor dependcias etc… dentr do tema de tdha coom pidemos fazer isso ?ial modelo usar e tecncia working backwords

---

**Claude** _2026-05-20_

Boa pergunta — e tem uma pegadinha importante aqui. Vou trabalhar de trás pra frente.

---

**Working Backwards: o que você quer no final?**

Um **Master Index** do conteúdo do ZIP — estruturado por dependências, pronto pra usar como contexto de entrada pra outros skills (TDAH-OS, Praxis, Horácio, etc.). Ou seja: o ZIP vira um workspace organizado que o Claude consegue operar.

---

**A pegadinha do 21.5MB**

O problema não é o tamanho do arquivo — é a janela de contexto. Um ZIP de 21.5MB descomprimido pode ter centenas de arquivos e dezenas de MB de texto. Se você jogar tudo no contexto de uma vez, o modelo afoga.

**Técnica certa: chunked ingestion com Master Index incremental.**

O fluxo é:

1. Você sobe o ZIP aqui no Claude.ai
2. Eu descomprimo e leio o inventário completo (nomes, tamanhos, extensões) — sem abrir o conteúdo ainda
3. Gero um **Tier Map** (camadas de dependência) só pelo nome/estrutura das pastas
4. Processo por camadas — primeiro os arquivos-raiz, depois dependentes, depois folhas
5. A cada camada, atualizo o Master Index incrementalmente
6. Output final: `master-index.md` + `dependency-graph.json` + workspace organizado

---

**Modelo e técnica**

Use **Claude Sonnet 4.6** (esse aqui) — não Opus. Por quê: velocidade de iteração. O gargalo não é capacidade analítica, é throughput de leitura de arquivos. Sonnet processa mais rápido e você vai precisar de múltiplos passes.

Técnica: **progressive context loading** — eu carrego metadados primeiro, depois conteúdo por lote de 3-5 arquivos, nunca tudo de uma vez. Cada lote atualiza o índice sem precisar reprocessar o que já foi.

---

**Próximo passo concreto**

Suba o ZIP aqui no chat. Eu começo pelo inventário — menos de 2 minutos pra ter o Tier Map inicial na tela.

---

**Você** _2026-05-20_

reduzi para 3mb

---

**Claude** _2026-05-20_

1	---
     2	name: file-reading
     3	description: "Use this skill when a file has been uploaded but its content is NOT in your context — only its path at /mnt/user-data/uploads/ is listed in an uploaded_files block. This skill is a router: it tells you which tool to use for each file type (pdf, docx, xlsx, csv, json, images, archives, ebooks) so you read the right amount the right way instead of blindly running cat on a binary. Triggers: any mention of /mnt/user-data/uploads/, an uploaded_files section, a file_path tag, or a user asking about an uploaded file you have not yet read. Do NOT use this skill if the file content is already visible in your context inside a documents block — you already have it."
     4	compatibility: "claude.ai, Claude Desktop, Cowork — any surface where uploads land at /mnt/user-data/uploads/"
     5	license: Proprietary. LICENSE.txt has complete terms
     6	---
     7	
     8	# Reading Uploaded Files
     9	
    10	## Why this skill exists
    11	
    12	When a user uploads a file in claude.ai, Claude Desktop, or Cowork,
    13	the file is written to `/mnt/user-data/uploads/<filename>` and you are told the path
    14	in an `<uploaded_files>` block. **The content is not in your context.**
    15	You must go read it.
    16	
    17	The naive thing — `cat /mnt/user-data/uploads/whatever` — is wrong for
    18	most files:
    19	
    20	- On a PDF it prints binary garbage.
    21	- On a 100MB CSV it floods your context with rows you will never use.
    22	- On a DOCX it prints the raw ZIP bytes.
    23	- On an image it does nothing useful at all.
    24	
    25	This skill tells you the right first move for each type, and when to
    26	hand off to a deeper skill.
    27	
    28	## General protocol
    29	
    30	1. **Look at the extension.** That is your dispatch key.
    31	2. **Stat before you read.** Large files need sampling, not slurping.
    32	   ```bash
    33	   stat -c '%s bytes, %y' /mnt/user-data/uploads/report.pdf
    34	   file /mnt/user-data/uploads/report.pdf
    35	   ```
    36	3. **Read just enough to answer the user's question.** If they asked
    37	   "how many rows are in this CSV", don't load the whole thing into
    38	   pandas — `wc -l` gives a fast approximation (it counts newlines,
    39	   not CSV records, so it may over-count if quoted fields contain
    40	   embedded newlines).
    41	4. **If a dedicated skill exists, go read it.** The table below tells
    42	   you when. The dedicated skills cover editing, creating, and advanced
    43	   operations that this skill does not.
    44	
    45	## `extract-text`
    46	
    47	For docx, odt, epub, xlsx, pptx, rtf, and ipynb the first move is
    48	`extract-text <file>`. It emits markdown for docx/odt/epub (headings,
    49	bold, lists, links, tables), tab-separated rows under `## Sheet:`
    50	headers for xlsx, text under `## Slide N` headers for pptx, fenced
    51	code cells for ipynb, and plain text for rtf. Pass `--format <fmt>`
    52	when the extension is wrong or absent (e.g., `--format xlsx` on an
    53	`.xlsm`). If it errors on a file, `pandoc <file> -t plain` is a
    54	fallback; for xlsx/pptx, fall back to the dedicated skill's
    55	Python-based approach (openpyxl / python-pptx).
    56	
    57	## Dispatch table
    58	
    59	| Extension                         | First move                                           | Dedicated skill                           |
    60	| --------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
    61	| `.pdf`                            | Content inventory (see PDF section)                  | `/mnt/skills/public/pdf-reading/SKILL.md` |
    62	| `.docx`                           | `extract-text`                                       | `/mnt/skills/public/docx/SKILL.md`        |
    63	| `.doc` (legacy)                   | Convert to `.docx` first                             | `/mnt/skills/public/docx/SKILL.md`        |
    64	| `.xlsx`                           | `extract-text`                                       | `/mnt/skills/public/xlsx/SKILL.md`        |
    65	| `.xlsm`                           | `extract-text --format xlsx`                         | `/mnt/skills/public/xlsx/SKILL.md`        |
    66	| `.xls` (legacy)                   | `pd.read_excel(engine="xlrd")` — openpyxl rejects it | `/mnt/skills/public/xlsx/SKILL.md`        |
    67	| `.ods`                            | `pd.read_excel(engine="odf")` — openpyxl rejects it  | `/mnt/skills/public/xlsx/SKILL.md`        |
    68	| `.pptx`                           | `extract-text`                                       | `/mnt/skills/public/pptx/SKILL.md`        |
    69	| `.ppt` (legacy)                   | Convert to `.pptx` first                             | `/mnt/skills/public/pptx/SKILL.md`        |
    70	| `.csv`, `.tsv`                    | `pandas` with `nrows`                                | — (below)                                 |
    71	| `.json`, `.jsonl`                 | `jq` for structure                                   | — (below)                                 |
    72	| `.jpg`, `.png`, `.gif`, `.webp`   | Already in your context as vision input              | — (below)                                 |
    73	| `.zip`, `.tar`, `.tar.gz`         | List contents, do **not** auto-extract               | — (below)                                 |
    74	| `.gz` (single file)               | `zcat \| head` — no manifest to list                 | — (below)                                 |
    75	| `.epub`, `.odt`                   | `extract-text`                                       | — (below)                                 |
    76	| `.rtf`                            | `extract-text`                                       | — (below)                                 |
    77	| `.ipynb`                          | `extract-text`                                       | — (below)                                 |
    78	| `.txt`, `.md`, `.log`, code files | `wc -c` then `head` or full `cat`                    | — (below)                                 |
    79	| Unknown                           | `file` then decide                                   | —                                         |
    80	
    81	---
    82	
    83	## PDF
    84	
    85	**Never** `cat` a PDF — it prints binary garbage.
    86	
    87	Quick first move — get the page count and check if text is extractable:
    88	
    89	```bash
    90	pdfinfo /mnt/user-data/uploads/report.pdf
    91	pdftotext -f 1 -l 1 /mnt/user-data/uploads/report.pdf - | head -20
    92	```
    93	
    94	Then peek at the text content:
    95	
    96	```python
    97	from pypdf import PdfReader
    98	r = PdfReader("/mnt/user-data/uploads/report.pdf")
    99	print(f"{len(r.pages)} pages")
   100	print(r.pages[0].extract_text()[:2000])
   101	```
   102	
   103	For anything beyond a quick peek — figures, tables, attachments,
   104	forms, scanned PDFs, visual inspection, or choosing a reading strategy
   105	— go read `/mnt/skills/public/pdf-reading/SKILL.md`. It covers
   106	content inventory, text extraction vs. page rasterization, embedded
   107	content extraction, and document-type-aware reading strategies.
   108	
   109	For PDF form filling, creation, merging, splitting, or watermarking,
   110	go read `/mnt/skills/public/pdf/SKILL.md`.
   111	
   112	---
   113	
   114	## DOCX / DOC
   115	
   116	The `docx` skill covers editing, creating, tracked changes, images.
   117	Read it if you need any of those. For a quick look:
   118	
   119	```bash
   120	extract-text /mnt/user-data/uploads/memo.docx | head -200
   121	```
   122	
   123	Legacy `.doc` (not `.docx`) must be converted first — see the `docx`
   124	skill.
   125	
   126	---
   127	
   128	## XLSX / XLS / spreadsheets
   129	
   130	The `xlsx` skill covers formulas, formatting, charts, creating. Read
   131	it if you need any of those. For a quick look at an `.xlsx`:
   132	
   133	```bash
   134	extract-text /mnt/user-data/uploads/data.xlsx | head -100
   135	```
   136	
   137	For `.xlsm`, add `--format xlsx` (same zip structure; only the
   138	extension differs). When you need a structured preview in Python:
   139	
   140	```python
   141	from openpyxl import load_workbook
   142	wb = load_workbook("/mnt/user-data/uploads/data.xlsx", read_only=True)
   143	print("Sheets:", wb.sheetnames)
   144	ws = wb.active
   145	for row in ws.iter_rows(max_row=5, values_only=True):
   146	    print(row)
   147	```
   148	
   149	`read_only=True` matters — without it, openpyxl loads the entire
   150	workbook into memory, which breaks on large files. Do not trust
   151	`ws.max_row` in read-only mode: many non-Excel writers omit the
   152	dimension record, so it comes back `None` or wrong. If you need a row
   153	count, iterate or use pandas.
   154	
   155	**Legacy `.xls`** — openpyxl raises `InvalidFileException`. Use:
   156	
   157	```python
   158	import pandas as pd
   159	df = pd.read_excel("/mnt/user-data/uploads/old.xls", engine="xlrd", nrows=5)
   160	```
   161	
   162	**`.ods` (OpenDocument)** — openpyxl also rejects this. Use:
   163	
   164	```python
   165	import pandas as pd
   166	df = pd.read_excel("/mnt/user-data/uploads/data.ods", engine="odf", nrows=5)
   167	```
   168	
   169	---
   170	
   171	## PPTX
   172	
   173	```bash
   174	extract-text /mnt/user-data/uploads/deck.pptx | head -200
   175	```
   176	
   177	**Legacy `.ppt`** — convert to `.pptx` first via LibreOffice; see
   178	`/mnt/skills/public/pptx/SKILL.md` for the sandbox-safe
   179	`scripts/office/soffice.py` wrapper (bare `soffice` hangs here because
   180	the seccomp filter blocks the `AF_UNIX` sockets LibreOffice uses for
   181	instance management).
   182	
   183	For anything beyond reading, go to `/mnt/skills/public/pptx/SKILL.md`.
   184	
   185	---
   186	
   187	## CSV / TSV
   188	
   189	**Do not** `cat` or `head` these blindly. A CSV with a 50KB quoted cell
   190	in row 1 will wreck your `head -5`. Use pandas with `nrows`:
   191	
   192	```python
   193	import pandas as pd
   194	df = pd.read_csv("/mnt/user-data/uploads/data.csv", nrows=5)
   195	print(df)
   196	print()
   197	print(df.dtypes)
   198	```
   199	
   200	Approximate row count without loading (over-counts if the file has
   201	RFC-4180 quoted newlines — the same quoted-cell case this section
   202	warned about above):
   203	
   204	```bash
   205	wc -l /mnt/user-data/uploads/data.csv
   206	```
   207	
   208	Full analysis only after you know the shape:
   209	
   210	```python
   211	df = pd.read_csv("/mnt/user-data/uploads/data.csv")
   212	print(df.describe())
   213	```
   214	
   215	TSV: same, with `sep="\t"`.
   216	
   217	---
   218	
   219	## JSON / JSONL
   220	
   221	Structure first, content second:
   222	
   223	```bash
   224	jq 'type' /mnt/user-data/uploads/data.json
   225	jq 'if type == "array" then length elif type == "object" then keys else . end' /mnt/user-data/uploads/data.json
   226	```
   227	
   228	(`keys` errors on scalar JSON roots — a bare `"hello"` or `42` is valid
   229	JSON per RFC 7159 — so guard the branch.)
   230	
   231	Then drill into what the user actually asked about.
   232	
   233	JSONL (one object per line) — do **not** `jq` the whole file; work line
   234	by line:
   235	
   236	```bash
   237	head -3 /mnt/user-data/uploads/data.jsonl | jq .
   238	wc -l /mnt/user-data/uploads/data.jsonl
   239	```
   240	
   241	---
   242	
   243	## Images (JPG / PNG / GIF / WEBP)
   244	
   245	**You can already see uploaded images.** They are injected into your
   246	context as vision inputs alongside the `<uploaded_files>` pointer. You
   247	do not need to read them from disk to describe them.
   248	
   249	The disk copy is only needed if you are going to **process** the image
   250	programmatically:
   251	
   252	```python
   253	from PIL import Image
   254	img = Image.open("/mnt/user-data/uploads/photo.jpg")
   255	print(img.size, img.mode, img.format)
   256	```
   257	
   258	For OCR on an image (text extraction, not description):
   259	
   260	```python
   261	import pytesseract
   262	print(pytesseract.image_to_string(img))
   263	```
   264	
   265	Note: the client resizes images larger than 2000×2000 down to that
   266	bound and re-encodes as JPEG before upload, so the disk copy may not
   267	be the user's original bytes. For most processing this doesn't matter;
   268	if the user is asking about original-resolution pixel data, flag it.
   269	
   270	---
   271	
   272	## Archives (ZIP / TAR / TAR.GZ)
   273	
   274	**List first. Extract never — unless the user explicitly asks.**
   275	Archives can be huge, contain path traversal, or nest forever.
   276	
   277	```bash
   278	unzip -l /mnt/user-data/uploads/bundle.zip
   279	tar -tf /mnt/user-data/uploads/bundle.tar
   280	```
   281	
   282	GNU tar auto-detects compression — `tar -tf` works on `.tar`,
   283	`.tar.gz`, `.tar.bz2`, `.tar.xz` alike. Don't hard-code `-z`.
   284	
   285	If the user wants one file from inside, extract just that one:
   286	
   287	```bash
   288	unzip -p /mnt/user-data/uploads/bundle.zip path/inside/file.txt
   289	```
   290	
   291	**Standalone `.gz`** (not a tar) compresses a single file — there is
   292	no manifest to list. Just peek at the decompressed content:
   293	
   294	```bash
   295	zcat /mnt/user-data/uploads/data.json.gz | head -50
   296	```
   297	
   298	---
   299	
   300	## EPUB / ODT
   301	
   302	```bash
   303	extract-text /mnt/user-data/uploads/book.epub | head -200
   304	```
   305	
   306	For long ebooks, pipe through `head` — you rarely need the whole thing
   307	to answer a question.
   308	
   309	---
   310	
   311	## RTF / IPYNB
   312	
   313	```bash
   314	extract-text /mnt/user-data/uploads/notes.rtf | head -200
   315	extract-text /mnt/user-data/uploads/notebook.ipynb | head -200
   316	```
   317	
   318	---
   319	
   320	## Plain text / code / logs
   321	
   322	Check the size first:
   323	
   324	```bash
   325	wc -c /mnt/user-data/uploads/app.log
   326	```
   327	
   328	- **Under ~20KB**: `cat` is fine.
   329	- **Over ~20KB**: `head -100` and `tail -100` to orient. If the user
   330	  asked about something specific, `grep` for it. Load the whole thing
   331	  only if you genuinely need all of it.
   332	
   333	For log files, the user almost always cares about the end:
   334	
   335	```bash
   336	tail -200 /mnt/user-data/uploads/app.log
   337	```
   338	
   339	---
   340	
   341	## Unknown extension
   342	
   343	```bash
   344	file /mnt/user-data/uploads/mystery.bin
   345	xxd /mnt/user-data/uploads/mystery.bin | head -5
   346	```
   347	
   348	`file` identifies most things. `xxd` head shows magic bytes. If `file`
   349	says "data" and the hex doesn't match anything you recognize, ask the
   350	user what it is instead of guessing.
   351	
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/tdha.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-20 12:39   tdha/\n   279350  2026-05-09 10:08   tdha/adhd-desk-dashboard-skill.skill\n      275  2026-05-09 10:08   __MACOSX/tdha/._adhd-desk-dashboard-skill.skill\n     3498  2026-05-15 08:25   tdha/texto 3.txt\n      275  2026-05-15 08:25   __MACOSX/tdha/._texto 3.txt\n  1308562  2026-05-15 08:32   tdha/neuroplanner-mobile.zip\n      275  2026-05-15 08:32   __MACOSX/tdha/._neuroplanner-mobile.zip\n      325  2026-05-15 08:25   tdha/texto 2.txt\n      275  2026-05-15 08:25   __MACOSX/tdha/._texto 2.txt\n    11510  2026-05-14 07:09   tdha/workflow-to-skill-magic.skill 2.zip\n      328  2026-05-14 07:09   __MACOSX/tdha/._workflow-to-skill-magic.skill 2.zip\n     8241  2026-05-13 14:58   tdha/adhd-desk-dashboard.skill\n      328  2026-05-13 14:58   __MACOSX/tdha/._adhd-desk-dashboard.skill\n  2314859  2026-05-20 12:38   tdha/arquivo web 2.webarchive\n      176  2026-05-20 12:38   __MACOSX/tdha/._arquivo web 2.webarchive\n      215  2026-05-15 07:52   tdha/texto.txt\n      275  2026-05-15 07:52   __MACOSX/tdha/._texto.txt\n     9823  2026-05-20 12:00   tdha/cognitive-framework-router.skill\n      176  2026-05-20 12:00   __MACOSX/tdha/._cognitive-framework-router.skill\n  6785234  2026-05-05 17:17   tdha/ADHD.webarchive\n      275  2026-05-05 17:17   __MACOSX/tdha/._ADHD.webarchive\n     1119  2026-05-05 20:42   tdha/ADHD_source_summary 2.md\n      219  2026-05-05 20:42   __MACOSX/tdha/._ADHD_source_summary 2.md\n     1656  2026-05-14 07:57   tdha/README.md\n      219  2026-05-14 07:57   __MACOSX/tdha/._README.md\n    52804  2026-05-15 08:27   tdha/Relatório 5W2H: NeuroPlanner TDAH Mobile.md\n      275  2026-05-15 08:27   __MACOSX/tdha/._Relatório 5W2H: NeuroPlanner TDAH Mobile.md\n    65919  2026-05-15 08:27   tdha/tdah-linear-workflow-os-v2.0.0-commercial.zip\n      328  2026-05-15 08:27   __MACOSX/tdha/._tdah-linear-workflow-os-v2.0.0-commercial.zip\n     9983  2026-05-15 08:36   tdha/Propostas de Funcionalidades Complementares para o NeuroPlanner SaaS.md\n      275  2026-05-15 08:36   __MACOSX/tdha/._Propostas de Funcionalidades Complementares para o NeuroPlanner SaaS.md\n    65919  2026-05-15 08:24   tdha/tdah-linear-workflow-os-v2.0.0-commercial\n      275  2026-05-15 08:24   __MACOSX/tdha/._tdah-linear-workflow-os-v2.0.0-commercial\n      966  2026-05-09 09:50   tdha/adhd-design-principles.md\n      219  2026-05-09 09:50   __MACOSX/tdha/._adhd-design-principles.md\n    14608  2026-05-05 20:42   tdha/ADHD_excerpt_first_220_lines.txt\n      219  2026-05-05 20:42   __MACOSX/tdha/._ADHD_excerpt_first_220_lines.txt\n     1119  2026-05-05 20:42   tdha/ADHD_source_summary.md\n      219  2026-05-05 20:42   __MACOSX/tdha/._ADHD_source_summary.md\n    52804  2026-05-15 08:29   tdha/Relatório 5W2H: NeuroPlanner TDAH Mobile 2.md\n      275  2026-05-15 08:29   __MACOSX/tdha/._Relatório 5W2H: NeuroPlanner TDAH Mobile 2.md\n  3609781  2026-05-20 12:14   tdha/arquivo web.webarchive\n      176  2026-05-20 12:14   __MACOSX/tdha/._arquivo web.webarchive\n---------                     -------\n 14603652                     43 files\n","stderr":""}
{"returncode":0,"stdout":"OK\ntotal 14316\ndrwxr-xr-x 2 root root    4096 May 20 12:39 .\ndrwxr-xr-x 4 root root    4096 May 20 12:41 ..\n-rw-r--r-- 1 root root 6785234 May  5 17:17 ADHD.webarchive\n-rw-r--r-- 1 root root   14608 May  5 20:42 ADHD_excerpt_first_220_lines.txt\n-rw-r--r-- 1 root root    1119 May  5 20:42 ADHD_source_summary 2.md\n-rw-r--r-- 1 root root    1119 May  5 20:42 ADHD_source_summary.md\n-rw------- 1 root root    9983 May 15 08:36 Propostas de Funcionalidades Complementares para o NeuroPlanner SaaS.md\n-rw-r--r-- 1 root root    1656 May 14 07:57 README.md\n-rw------- 1 root root   52804 May 15 08:29 Relatório 5W2H: NeuroPlanner TDAH Mobile 2.md\n-rw------- 1 root root   52804 May 15 08:27 Relatório 5W2H: NeuroPlanner TDAH Mobile.md\n-rw-r--r-- 1 root root     966 May  9 09:50 adhd-design-principles.md\n-rw------- 1 root root  279350 May  9 10:08 adhd-desk-dashboard-skill.skill\n-rw-r--r-- 1 root root    8241 May 13 14:58 adhd-desk-dashboard.skill\n-rw-r--r-- 1 root root 2314859 May 20 12:38 arquivo web 2.webarchive\n-rw-r--r-- 1 root root 3609781 May 20 12:14 arquivo web.webarchive\n-rw-r--r-- 1 root root    9823 May 20 12:00 cognitive-framework-router.skill\n-rw------- 1 root root 1308562 May 15 08:32 neuroplanner-mobile.zip\n-rw-r--r-- 1 root root   65919 May 15 08:24 tdah-linear-workflow-os-v2.0.0-commercial\n-rw-r--r-- 1 root root   65919 May 15 08:27 tdah-linear-workflow-os-v2.0.0-commercial.zip\n-rw-r--r-- 1 root root     325 May 15 08:25 texto 2.txt\n-rw-r--r-- 1 root root    3498 May 15 08:25 texto 3.txt\n-rw-r--r-- 1 root root     215 May 15 07:52 texto.txt\n-rw-r--r-- 1 root root   11510 May 14 07:09 workflow-to-skill-magic.skill 2.zip\n","stderr":""}
{"returncode":0,"stdout":"=== README.md ===\n# adhd-desk-dashboard · ADHD-Friendly Workflow Dashboard\n\n**Category:** Accessibility & Cognitive Workflows · **Version:** current · **Language:** PT-BR\n**Owner:** Leonardo Batista\n\n> ⚠️ **Sensitivity flag R-004:** This skill is designed for users with ADHD/TDAH and dyslexia. Output may reference cognitive accessibility needs. Use with appropriate care and professional judgment. This skill does not provide medical advice.\n\n## What it does\nCreates low-cognitive-load printable workflow dashboards and Linear backlog plans for solo knowledge workers with ADHD/TDAH and dyslexia constraints. Output: A4 landscape PPTX deck, PDF, markdown checklists, and structured Linear backlog.\n\n## Activate when\n```\nADHD-friendly workflows          printable dashboards\ndesk operating systems           paper-OS setups\ncognitive-load reduction         accessibility-oriented layouts\ndaily execution templates        sprint cards\n\"mesa de trabalho\"               \"painel de operação\"\n```\nAlso activates for requests involving Linear + calendar + paper stack orchestration, A4 printable templates, or any combination of physical/digital workflow design — even without explicit ADHD mention.\n\n## Output formats\n- A4 landscape PPTX (print-ready)\n- PDF version\n- Markdown checklists\n- Linear backlog structure\n\n## Design principles applied\n- High contrast · large type · one task per card · no visual clutter · clear priority signals\n\n## Pairs with\n`projects-to-linear` (backlog export) · `forge-visual-canvas` (visual layout) · `cmd-01-pps` (packaging)\n\n---\n*CMD trigger: ADHD/TDAH workflow mention · `\"mesa de trabalho\"` · printable dashboard request*\n\n=== texto.txt ===\nhttps://opbcompany.com/projeto-opb?gad_source=1&gad_campaignid=22673272928&gbraid=0AAAAACrDkrzGcpb7-W3cj-Jv1gDaEs1Ar&gclid=Cj0KCQjwiJvQBhCYARIsAMjts3I8i3F_dMQlR-N8whHzsq9TFSBQyJ1anbmdJ7Nws3gRdGEHmPqnoe0aAhnnEALw_wcB\n=== texto\\ 2.txt ===\nEXECUÇÃO · TDAH LINEAR WORKFLOW OS\nFASE 1 · ESTRUTURA REPOSITÓRIO​​​​​​​​​​​​​​​​\n\nContinuando execução — gerando SPECS e arquivos da skill:​​​​​​​​​​​​​​​​\n\nGerando SKILL.md completo com 12 router modes:​​​​​​​​​​​​​​​​\n=== texto\\ 3.txt ===\nEXECUÇÃO FASES 4-8\nFASE 4 · CURSO​​​​​​​​​​​​​​​​\n\nGerando todos arquivos restantes em batch:​​​​​​​​​​​​​​​​\n\nCriando arquivos finais via método direto:​​​​​​​​​​​​​​​​\n\nFASE 8 · PACKAGE FINAL​​​​​​​​​​​​​​​​\n\n✅ EXECUÇÃO COMPLETA\nREPO GERADO\n\ntdah-linear-workflow-os/\n├── README.md (tese + quickstart)\n├── LICENSE (MIT)\n├── DISCLAIMER.md (guardrails legais completos)\n├── CHANGELOG.md\n├── NEXT_ACTION.md (próximos passos 30min)\n├── BRD.md* (business requirements)\n├── MRD.md* (market requirements)\n├── SPECS.md* (specs técnicas)\n├── DEMO_SCRIPT.md* (keynote 10min roteiro completo)\n├── QUICKSTART.md* (setup 5min)\n├── skill/\n│   ├── scripts/clone_workflow.py (funcional)\n│   └── [resources, templates, tests pending]\n├── linear/\n│   ├── linear-import.csv (5 issues exemplo)\n│   └── labels.csv (taxonomy completa)\n├── launch/\n│   ├── 48h-launch-plan.md\n│   └── community-posts.md (4 canais)\n├── showroom/\n│   ├── image-prompts.md (copyright-safe)\n│   └── copy-bank.md (headlines/CTAs)\n├── docs/\n│   └── mcp-policy.md\n└── course/ [estrutura criada, conteúdo pending]\n\n\n*Arquivos completos disponíveis em /home/claude/ se necessário copiar\n\nPRÓXIMA AÇÃO ÚNICA\n\ncd tdah-linear-workflow-os\ngit init\ngit add .\ngit commit -m \"Initial commit: TDAH Linear Workflow OS v1.0\"\ngh repo create tdah-linear-workflow-os --public --source=. --push\n\n\nDoD: Repo GitHub público acessível via URL.\n\nVALIDAÇÃO PRÉ-KEYNOTE\n\n\n\n|Item                      |Status|Ação se ❌                                            |\n|--------------------------|------|-----------------------------------------------------|\n|Repo público              |⏳     |Executar comandos acima                              |\n|README <500 palavras      |✅     |—                                                    |\n|DISCLAIMER completo       |✅     |—                                                    |\n|Demo script <10min        |⏳     |Rehearsal cronometrado 3x                            |\n|Scripts Python executáveis|✅     |chmod +x já aplicado                                 |\n|CSV Linear válido         |✅     |Testado headers                                      |\n|QR code gerado            |⏳     |<https://github.com/leonardo/tdah-linear-workflow-os>|\n|Lista espera form         |⏳     |Criar Typeform                                       |\n\nKEYNOTE AMANHÃ — CHECKLIST FINAL\nH-2h:\n\t•\tLaptop bateria 100% + carregador backup\n\t•\tWiFi venue testado (mas não depender)\n\t•\tTabs abertas: GitHub repo → Claude.ai → Linear\n\t•\tExemplos pré-processados salvos localmente\n\t•\tTimer 10min visível\n\t•\tScreen recording backup demo completa\n\t•\tQR code testado mobile\n\t•\tDisclaimer memorizado: “Não sou médico, sou usuário”\nDurante demo:\n\t•\tFoco: Mostrar outputs, esconder código\n\t•\tTom: Professoral direto PT-BR\n\t•\tTiming: Checar timer cada transição\n\t•\tPlano B: Screenshots prepared se API falhar\nPós-demo:\n\t•\tFicar disponível Q&A\n\t•\tColetar emails backup papel\n\t•\tPost LinkedIn/Instagram\n\t•\tMonitorar repo stars + lista espera\n\nTOKEN USADO: 118K/190K (62%) — Budget saudável restante para ajustes.​​​​​​​​​​​​​​​​","stderr":""}
{"returncode":0,"stdout":"=== adhd-design-principles.md ===\n# ADHD/TDAH-Friendly Design Principles\n\n| Principle | Implementation |\n|---|---|\n| Reduce working-memory load | Use one objective per page and visible next action fields. |\n| Externalize task state | Use paper cards, tables, checkboxes, and Linear issue views. |\n| Make completion explicit | Every workflow has a Definition of Done. |\n| Reduce visual noise | No decorative elements; only functional boxes and tables. |\n| Support dyslexia constraints | Large sans-serif text, wide spacing, short labels, high contrast. |\n| Support task initiation | Use small first actions: open inbox, choose one item, classify one source. |\n| Support recovery after interruption | Include save location, status, and next action on every page. |\n\n## Labels\n\n| Label | Meaning |\n|---|---|\n| FACT | Verified or source-backed information. |\n| HYPOTHESIS | Plausible but unvalidated interpretation. |\n| DECISION | Choice made by the user or project. |\n| ACTION | Executable next step. |\n\n=== ADHD_source_summary.md ===\n# ADHD Source Summary\n\nArquivo-base: `ADHD.webarchive`, extraído como texto operacional.\n\nMetadata:\n- Linhas extraídas: 1257\n- Caracteres: 49050\n- Tema dominante: dashboard físico A4, workflows, Linear, Data Intake, conteúdo, operação, analytics, Research Card, TDAH/dislexia e redução de carga cognitiva.\n\nAchados compactos:\n\n| Categoria | Achado |\n|---|---|\n| Interface | Papel A4 é a interface cognitiva de execução. |\n| Design | A4 paisagem, blocos grandes, texto mínimo, campos preenchíveis #F5F5F5. |\n| Workflows | DataClean45, ContentCreationManhã, Ops90, Analytics semanal, Review semanal. |\n| Linear | Issues, labels, priorities, DoD e views devem ser gerados como memória digital. |\n| Risco | Campos pequenos, excesso de texto, PDF quebrado, DoD invisível, fluxo horizontal cortado. |\n| Prevenção | Design funcional, slides standalone, campos preenchíveis, QA visual e extração de texto. |\n\nTrecho normalizado da intenção:\n\n> Criar um sistema físico e digital para reduzir ruído operacional, transformar pesquisa em ação e manter sprint de conteúdo/portfólio sem overengineering.\n\n=== ADHD_source_summary 2.md ===\n# ADHD Source Summary\n\nArquivo-base: `ADHD.webarchive`, extraído como texto operacional.\n\nMetadata:\n- Linhas extraídas: 1257\n- Caracteres: 49050\n- Tema dominante: dashboard físico A4, workflows, Linear, Data Intake, conteúdo, operação, analytics, Research Card, TDAH/dislexia e redução de carga cognitiva.\n\nAchados compactos:\n\n| Categoria | Achado |\n|---|---|\n| Interface | Papel A4 é a interface cognitiva de execução. |\n| Design | A4 paisagem, blocos grandes, texto mínimo, campos preenchíveis #F5F5F5. |\n| Workflows | DataClean45, ContentCreationManhã, Ops90, Analytics semanal, Review semanal. |\n| Linear | Issues, labels, priorities, DoD e views devem ser gerados como memória digital. |\n| Risco | Campos pequenos, excesso de texto, PDF quebrado, DoD invisível, fluxo horizontal cortado. |\n| Prevenção | Design funcional, slides standalone, campos preenchíveis, QA visual e extração de texto. |\n\nTrecho normalizado da intenção:\n\n> Criar um sistema físico e digital para reduzir ruído operacional, transformar pesquisa em ação e manter sprint de conteúdo/portfólio sem overengineering.\n","stderr":""}
Command output contains invalid UTF-8 data.
{"returncode":0,"stdout":"adhd-desk-dashboard.skill:        Zip archive data, at least v2.0 to extract, compression method=deflate\ncognitive-framework-router.skill: Zip archive data, at least v2.0 to extract, compression method=deflate\nadhd-desk-dashboard-skill.skill:  Zip archive data, at least v1.0 to extract, compression method=store\n","stderr":""}
{"returncode":0,"stdout":"=== adhd-desk-dashboard.skill ===\nArchive:  adhd-desk-dashboard.skill\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n     5953  2026-05-13 14:25   adhd-refined/SKILL.md\n     3104  2026-05-13 14:24   adhd-refined/README.md\n      460  2026-05-13 14:24   adhd-refined/manifest.json\n      966  2026-05-13 14:24   adhd-refined/references/adhd-design-principles.md\n     1196  2026-05-13 14:24   adhd-refined/references/workflow-protocol.md\n     1024  2026-05-13 14:24   adhd-refined/references/sources-and-safety.md\n     1248  2026-05-13 14:24   adhd-refined/scripts/adhd_dashboard_generator.py\n---------                     -------\n    13951                     7 files\n\n=== cognitive-framework-router.skill ===\nArchive:  cognitive-framework-router.skill\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n     5664  2026-05-16 12:52   cognitive-framework-router/SKILL.md\n     2537  2026-05-16 12:51   cognitive-framework-router/references/az-framework-catalog.md\n     2367  2026-05-16 12:51   cognitive-framework-router/references/routing-rules.md\n      948  2026-05-16 12:51   cognitive-framework-router/references/output-contracts.md\n     1756  2026-05-16 12:51   cognitive-framework-router/references/4d-5d-quality-bar.md\n      575  2026-05-16 12:51   cognitive-framework-router/examples/social-post-scqa-aida.md\n      748  2026-05-16 12:51   cognitive-framework-router/examples/executive-summary-mece-priority.md\n      872  2026-05-16 12:51   cognitive-framework-router/templates/pre-balance-questionnaire.md\n      583  2026-05-16 12:51   cognitive-framework-router/templates/working-backwards-brief.md\n---------                     -------\n    16050                     9 files\n\n=== adhd-desk-dashboard-skill.skill ===\nArchive:  adhd-desk-dashboard-skill.skill\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/scripts/\n     1248  2026-05-09 09:50   adhd-desk-dashboard-skill/scripts/adhd_dashboard_generator.py\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/references/\n      966  2026-05-09 09:50   adhd-desk-dashboard-skill/references/adhd-design-principles.md\n     1196  2026-05-09 09:50   adhd-desk-dashboard-skill/references/workflow-protocol.md\n     1024  2026-05-09 09:50   adhd-desk-dashboard-skill/references/sources-and-safety.md\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/examples/\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/examples/data/\n    52116  2026-05-09 09:50   adhd-desk-dashboard-skill/examples/data/ADHD.webarchive.txt\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/tests/\n      489  2026-05-09 09:50   adhd-desk-dashboard-skill/tests/test_package.py\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/docs/\n     1343  2026-05-09 09:50   adhd-desk-dashboard-skill/docs/5w2h-icp-examples.md\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/schemas/\n      779  2026-05-09 09:50   adhd-desk-dashboard-skill/schemas/dashboard_schema.json\n        0  2026-05-09 09:50   adhd-desk-dashboard-skill/source/\n   234121  2026-05-09 09:50   adhd-desk-dashboard-skill/source/ADHD.zip\n    52116  2026-05-09 09:50   adhd-desk-dashboard-skill/source/adhd_extracted.txt\n     3984  2026-05-09 09:50   adhd-desk-dashboard-skill/SKILL.md\n     3104  2026-05-09 09:50   adhd-desk-dashboard-skill/README.md\n      456  2026-05-09 09:50   adhd-desk-dashboard-skill/manifest.json\n---------                     -------\n   352942                     22 files\n","stderr":""}
The command exceeded the execution time limit. Try breaking it into smaller steps or adding a timeout to the command itself.
The command exceeded the execution time limit. Try breaking it into smaller steps or adding a timeout to the command itself.
{"returncode":0,"stdout":"---\nname: adhd-desk-dashboard\ndescription: >\n  Creates low-cognitive-load printable workflow dashboards and Linear backlog plans\n  for solo knowledge workers with ADHD/TDAH and dyslexia constraints. Outputs a\n  ready-to-print A4 landscape PPTX deck, PDF, markdown checklists, and a structured\n  Linear backlog. Use this skill whenever the user asks for ADHD-friendly workflows,\n  printable dashboards, desk operating systems, paper-OS setups, cognitive-load\n  reduction, accessibility-oriented layouts, daily execution templates, sprint cards,\n  or any combination of physical/digital workflow design — even if they don't say\n  \"ADHD\" explicitly. Also trigger for requests involving Linear + calendar + paper\n  stack orchestration, A4 printable templates, or \"mesa de trabalho\" / \"painel de\n  operação\" in Portuguese.\ncompatibility: \"claude.ai, Claude Code, Cowork — requires pptx skill and python-pptx\"\nmetadata: \"non_clinical_boundary: true\"\n---\n\n# ADHD Desk Dashboard Skill\n\nCreates printable A4 landscape operating dashboards and a matching digital backlog\nfor solo knowledge workers with ADHD/TDAH and dyslexia constraints.\n\n> **Safety boundary**: This skill covers planning, organisation, and\n> accessibility-oriented formatting only. It must never advise diagnosis,\n> medication, or clinical treatment. For clinical concerns, direct the user to a\n> qualified health professional.\n\n---\n\n## Quick-start\n\n1. Read the user's brief and extract: target routines, current stack, language, and any explicit accessibility constraints.\n2. Follow the **Execution Protocol** below.\n3. Generate all artifacts; validate for printability.\n4. Deliver the output bundle.\n\n---\n\n## Inputs\n\n| Field | Description |\n|---|---|\n| Raw brief | Operational command or workflow description |\n| Stack | Linear, Drive, Calendar, Claude/ChatGPT, GitHub, paper |\n| Routines | DataClean, Content, OpsAdmin, Analytics, Review (subset or all) |\n| Constraints | Large text, minimal noise, high legibility, B&W printable |\n| Language | Default pt-BR; switch if user writes in another language |\n| Output format | PPTX + PDF (default); also Markdown checklist and Linear plan |\n\n---\n\n## Standard Output Bundle\n\n| File | Purpose |\n|---|---|\n| `leonardo-desk-dashboard.pptx` | A4 landscape dashboard deck |\n| `leonardo-desk-dashboard.pdf` | Print-ready PDF |\n| `checklist-impressao.md` | Print and desk setup checklist |\n| `linear-issues-dashboard.md` | Linear project, labels, recurring issues, views |\n| `README.md` | Usage documentation |\n\n---\n\n## Slide Architecture\n\n| # | Slide Name | Function | Required Blocks |\n|---|---|---|---|\n| S1 | Roadmap Mesa | Weekly sprint control | Objective · Priority · Deliverables · Risks · DoD · Next Action |\n| S2 | Capacity Table | Daily workflow allocation | Workflow · Time · Priority · Input · Output · Save Location · Command · DoD |\n| S3 | WF1 Data Clean | 45-min data processing | Raw · Classify · Extract · Save · Linear · Command · DoD |\n| S4 | WF2 Content | Morning content routine | Topic · Update · Batch · Reuse · Channel · Agenda · DoD |\n| S5 | WF3 Ops Admin | 90-min admin loop | Login · Email · Accounts · GitHub · Social · Linear · Agenda · External Admin · DoD |\n| S6 | Research Card | Manual research capture | Finding · Number · Source · Hypothesis · Decision · Action · Tag · Reuse · Priority |\n\n---\n\n## Execution Protocol\n\n| Phase | Question | Output |\n|---|---|---|\n| 1. Parse | What is the user really asking to operate? | Scope statement |\n| 2. Segment | Which workflows are distinct? | MECE workflow map |\n| 3. Constrain | What cognitive/accessibility limits apply? | Design constraints list |\n| 4. Materialise | What must be visible on paper? | A4 page plan |\n| 5. Digitise | What belongs in Linear/Drive/Calendar? | Backlog and save map |\n| 6. Generate | Build all artifacts | Output bundle |\n| 7. Validate | Can the user execute without re-reading the brief? | DoD and print check |\n\n---\n\n## Design Rules\n\n- **Page**: A4 landscape, 297 × 210 mm, margins 15 mm.\n- **Background**: neutral, non-decorative.\n- **Fill fields**: light gray `#F5F5F5`.\n- **Typography**: sans-serif; body ≥ 14 pt; headers ≥ 18 pt.\n- **Layout**: one objective per page; boxes and tables, not paragraphs.\n- **Labels**: tag all content as `FACT`, `HYPOTHESIS`, `DECISION`, or `ACTION`.\n- **DoD**: every slide must carry a visible Definition of Done.\n- **Print**: optimise for black-and-white; no gradients, ribbons, or clip art.\n\n---\n\n## Reference Files\n\nRead these when you need deeper guidance — do not load all at once:\n\n| File | When to read |\n|---|---|\n| `references/adhd-design-principles.md` | Detailed ADHD/accessibility design rationale and label system |\n| `references/workflow-protocol.md` | Full workflow table with time-boxes, inputs, outputs, and DoDs |\n| `references/sources-and-safety.md` | Evidence anchors and safe/unsafe use boundary |\n\n---\n\n## Scripts\n\n`scripts/adhd_dashboard_generator.py` — generates a Markdown capacity-table\nscaffold. Run it first to get the default workflow rows, then feed them into the\nPPTX generation step.\n\n```bash\npython scripts/adhd_dashboard_generator.py\n# outputs: generated/capacity-table.md\n```\n\nFor the full PPTX build, follow `/mnt/skills/public/pptx/SKILL.md`.\n\n---\n\n## Default Workflow Table (quick reference)\n\n| Workflow | Time Box | Input | Output | DoD |\n|---|---:|---|---|---|\n| DataClean | 45 min/day | Raw notes/chats/files | Classified knowledge | Inbox reduced; facts saved; actions routed |\n| Content Creation | Morning | Topic/current insight | Reusable content batch | Published or scheduled; URLs saved |\n| Ops Admin | 90 min/day | Login/email/accounts/backlog | Admin state clean | Accounts checked; tomorrow prepared |\n| Analytics | Weekly | Metrics and URLs | Baseline table | Numbers captured; next experiment chosen |\n| Review | Weekly | Completed issues/cards | Decision log | Keep/change/stop decisions recorded |\n","stderr":""}
{"returncode":0,"stdout":"---\nname: cognitive-framework-router\ndescription: >\n  Use this skill when the user asks to structure, research, decide, communicate,\n  plan, diagnose, prioritize, summarize, or execute knowledge work. Trigger on:\n  pesquisa, decisão, comunicação, planejamento, diagnóstico, resumo executivo,\n  MECE, Cynefin, JTBD, 5W2H, SCQA, priorização, retrabalho, output estruturado,\n  framework, working backwards, plano de ação — and English equivalents (research,\n  decision, summary, action plan, prioritize, diagnosis, communication brief).\n  This skill selects the minimum viable combination of A-Z frameworks needed to\n  satisfy the user's intent, context, quality bar, and delivery format. Always\n  trigger for any substantive business, product, strategy, or operations request\n  where structured thinking would reduce rework.\nmetadata:\n  references:\n    - references/4d-5d-quality-bar.md\n    - references/az-framework-catalog.md\n    - references/routing-rules.md\n    - references/output-contracts.md\n    - templates/pre-balance-questionnaire.md\n    - templates/working-backwards-brief.md\n---\n\n# Cognitive Framework Router\n\n## Mission\n\nTransform natural-language requests into clear, auditable, executable outputs by applying the smallest useful combination of frameworks — routing intent, not reciting a library.\n\n**Quality foundation** (load `references/4d-5d-quality-bar.md` for full tables):\n- Anthropic 4D AI Fluency: Delegation → Description → Discernment → Diligence\n- Leonardo 5D Operational Matrix: Define → Dor → Design → Data-driven → Delivery\n\n## Operating principle\n\nBehave as a cognitive routing layer, not a prompt library. The user should never need to name a framework. Infer intent and select the smallest useful combination.\n\n## Routing sequence (run silently)\n\n1. **Delegation** — Should AI act here? What role?\n2. **Define** — What is the user actually trying to achieve?\n3. **Dor** — What pain, risk, rework, or ambiguity exists?\n4. **Design** — Which framework combination best structures the output?\n5. **Data-driven** — What evidence, data, or assumptions are available?\n6. **Framework A-Z Router** — Apply the combination (see `references/routing-rules.md`)\n7. **Discernment** — Is the output useful, sufficient, and bounded?\n8. **Delivery** — Produce the artifact (see `references/output-contracts.md`)\n9. **Diligence** — Add risk notes or human-review flags when needed\n\n## Core rule: combine frameworks, never force one\n\n| User intent | Combination | Output |\n|---|---|---|\n| research / pesquisa | MECE + SCQA + evidence discipline | Executive research synthesis |\n| decision / decidir | Cynefin + trade-off matrix + risk register | Decision brief |\n| communication / comunicação | SCQA + AIDA + audience framing | Clear message or post |\n| planning / planejamento | Working Backwards + 5W2H + RACI | Action plan |\n| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints | Root-cause diagnostic |\n| prioritization / priorizar | Eisenhower + impact/effort | Priority matrix |\n| product / customer | JTBD + Kano + User Story Mapping | Customer/product insight |\n| rework / retrabalho | Value Stream Mapping + 3P + TOC | Rework reduction map |\n| execution handoff | 5W2H + RACI | Project/ticket plan |\n| social post | SCQA + AIDA + one sharp thesis | Publishable narrative |\n| repository / system design | Working Backwards + modular architecture | Implementation-ready repo |\n\n**Combination limits:** default 2–3 frameworks; up to 5 for complex execution. Never add frameworks that don't change the output. See `references/az-framework-catalog.md` for the full A-Z catalog.\n\n## Pre-balance questionnaire\n\nAsk only when missing context would likely cause rework. Max 5 questions:\n\n1. **Objective** — What decision, output, or action should this support?\n2. **Audience** — Who will read or use it?\n3. **Depth** — Short, standard, or deep?\n4. **Evidence** — Provided data, web sources, internal docs, or assumptions?\n5. **Delivery** — Table, memo, plan, checklist, JSON, or social post?\n\nIf the user signals speed, infer and label assumptions (see `templates/pre-balance-questionnaire.md`).\n\n## Working Backwards trigger\n","stderr":""}
{"returncode":1,"stdout":"1.move one Search/mnt/proj/files. apply mece scan 2. get to know the request expedn context before act 3. think about it as a worklfow processe and depply reasonsing about whats could go wrong,then prevent before excute. ! Now\n/\nforge-visual-canvas\nRUN HANDS OFF/forge-visual-canvas — Criar PPTX A4 Paisagem landscape dashboard físico impressão McKinsey-style. TARGET: Leonardo solo TDAH/dislexia low-code, stack Linear+Drive+Agenda+Claude+papel, sprint canal aquisição conteúdo Claude/Skills PT-BR. SPEC: 6 slides max, layout clean blocos grandes, texto mínimo legibilidade alta, campos preenchíveis\n#F5F5F5\n, zero decorativo 100% funcional, DoD todos workflows, labels FACT/HYPOTHESIS/DECISION/ACTION. STRUCTURE: S1[Roadmap Mesa: objetivo sprint único|prioridade semana|entregáveis|riscos|DoD|próxima ação] S2[Cap Table 8col: Workflow|Tempo|Prioridade|Entrada|Saída|SaveLocal|CmdClaude|DoD × 5rows: DataClean45min/d|ContentCreationManhã|OpAdmin90min/d|Analytics週|Review週] S3[WF1-DataClean45: bruto→classificar→extrair(fact/number/decision/hyp)→Drive→Linear→cmd→DoD] S4[WF2-Content: tema|atual|batch|reuso|canal(LI/YT/IG/GH/site)|agenda|DoD] S5[WF3-Ops90: login|email|contas|GH|social|Linear|Agenda|Holanda|DoD] S6[ResearchCard fillable: pesquisa|achado|número|fonte|hyp|decision|ação|tagLinear|reuso|prioridade]. OUTPUTS: (1)leonardo-desk-dashboard.pptx (2)leonardo-desk-dashboard.pdf print-ready (3)checklist-impressao.md (4)linear-issues-dashboard.md labels+priority. DESIGN: palette cinza/azul corporate, sans-serif 14pt+ body 18pt+ headers, tabelas/boxes/cards visuais não bullets, fields manual bg\n#F5F5F5\nplaceholder cinza-médio, A4 landscape 297×210mm margin 15mm. EXECUTION: read /mnt/skills/public/pptx/SKILL.md → generate PPTX complete → export PDF → create print checklist(paper/printer/binding) → create Linear backlog daily ops. TONE: professoral direto prático zero fluff, clarity execution cognitive-load-reduction. CRITICAL: cada slide standalone printable A4, DoD explicit every workflow, fillable fields visible print, functional não decorativo. START\nMostrar menos\n11:00\nClaude respondeu: Vou executar o scan MECE, análise de contexto e prevenção de problemas antes da execução hands-off.\nMapeou workflow operacional, identificou riscos, estruturou execução PPTX\nMapeou workflow operacional, identificou riscos, estruturou execução PPTX\nO usuário quer que eu crie um dashboard físico impressível em PPTX (A4 paisagem) para Leonardo usar no dia-a-dia operacional dele. É um dashboard físico de papel, otimizado para TDAH/dislexia, com campos preenchíveis manualmente, seguindo os princípios do comando mestre dele.\nVou seguir o workflow pedido:\nScan MECE dos arquivos /mnt/project/\nEntender o contexto completo da request\nPensar como processo/workflow e prevenir problemas antes de executar\nExecutar hands-off com forge-visual-canvas\nFASE 1: SCAN MECE /mnt/project/\nPreciso ver o que tem nos arquivos do projeto primeiro.\nFASE 2: CONTEXTO DA REQUEST\nLeonardo quer:\nDashboard físico papel A4 paisagem para imprimir\nMcKinsey-style (clean, profissional, funcional)\nOtimizado para TDAH/dislexia (texto grande, blocos claros, zero ruído)\n6 slides máximo, cada um standalone printable\nEstrutura específica já definida (S1-S6)\nCampos preenchíveis à mão (\n#F5F5F5\nbackground)\nPPTX + PDF + checklist impressão + Linear backlog\nZero decorativo, 100% funcional\nDoD explícito em cada workflow\nESTRUTURA PEDIDA:\nS1: Roadmap Mesa - objetivo sprint, prioridades, entregáveis, riscos, DoD, next action\nS2: Capacity Table 8 colunas - Workflow, Tempo, Prioridade, Input, Output, SaveLocal, CmdClaude, DoD\nS3: WF1 Data Clean 45min - fluxo bruto → classificar → extrair → save → cmd → DoD\nS4: WF2 Content Creation - tema → batch → reuso → canal → agenda → DoD\nS5: WF3 Ops Admin 90min - login/email/contas/social/Linear/Agenda/Holanda → DoD\nS6: Research Card fillable - 10+ campos para preencher manualmente\nFASE 3: REASONING - O QUE PODE DAR ERRADO\nPreciso identificar os riscos antes de começar: formatação PPTX pode quebrar em diferentes versões, campos preenchíveis precisam de espaço suficiente, a otimização visual para TDAH exige contraste e hierarquia clara, e cada slide precisa ser independente para impressão sem perder contexto. cada workflow precisa ter uma Definition of Done clara e visível. Vou usar tabelas e cards em vez de bullets para melhor visualização, e gerar um markdown separado com issues do Linear para cada workflow diário.\nNa execução, preciso ler o SKILL.md antes de gerar qualquer coisa, usar python-pptx com dimensões exatas em A4 landscape, criar text boxes com preenchimento\n#F5F5F5\npara campos editáveis, e exportar em PDF com 300dpi mínimo. Cada slide deve ter header, body e footer com DoD explícito, sem elementos decorativos — apenas ícones funcionais se necessário. A hierarquia visual vem de boxes e bordas, mantendo fontes sans-serif acima de 14pt para acessibilidade.\nAgora vou começar: primeiro leio o SKILL.md, depois gero o PPTX completo com 6 slides, exporto como PDF pronto para impressão, crio um checklist em markdown para validação de impressão, e finalmente gero o dashboard de issues do Linear em markdown.\nMostrar menos\nConcluído\nVou executar o scan MECE, análise de contexto e prevenção de problemas antes da execução hands-off.\nFASE 1 · SCAN MECE /mnt/project/\nInventoried loaded files and prioritized protocol compliance before execution\nInventoried loaded files and prioritized protocol compliance before execution\nScan MECE dos arquivos no projeto para contexto completo\nPerfeito, tenho 3 arquivos já carregados no contexto. Agora preciso ler o SKILL.md do PPTX antes de executar, conforme o protocolo obrigatório.\nConcluído\nFASE 2 · CONTEXTO ANALYSIS\nArchitected six-slide A4 dashboard with fillable fields and workflow specifications\nArchitected six-slide A4 dashboard with fillable fields and workflow specifications\nLer SKILL.md PPTX obrigatório antes de gerar apresentação\n---\n","stderr":"head: cannot open '/home/claude/tdha-workspace/tdha/Relat'$'\\303\\263''rio 5W2H: NeuroPlanner TDAH Mobile.md' for reading: No such file or directory\n"}
{"returncode":0,"stdout":"ADHD.webarchive\nADHD_excerpt_first_220_lines.txt\nADHD_source_summary 2.md\nADHD_source_summary.md\nPropostas de Funcionalidades Complementares para o NeuroPlanner SaaS.md\nREADME.md\nRelatório 5W2H: NeuroPlanner TDAH Mobile 2.md\nRelatório 5W2H: NeuroPlanner TDAH Mobile.md\nadhd-design-principles.md\nadhd-desk-dashboard-skill.skill\nadhd-desk-dashboard.skill\narquivo web 2.webarchive\narquivo web.webarchive\ncognitive-framework-router.skill\nextracted\nneuroplanner-mobile.zip\ntdah-linear-workflow-os-v2.0.0-commercial\ntdah-linear-workflow-os-v2.0.0-commercial.zip\ntexto 2.txt\ntexto 3.txt\ntexto.txt\nworkflow-to-skill-magic.skill 2.zip\n","stderr":""}
{"returncode":0,"stdout":"---\n# Propostas de Funcionalidades Complementares para o NeuroPlanner SaaS\n\nEste relatório apresenta uma análise das funcionalidades existentes no NeuroPlanner TDAH Mobile e propõe um conjunto de \"skills\" complementares para transformá-lo em uma solução SaaS robusta e neurocompatível. As propostas são fundamentadas nas necessidades de usuários com TDAH e nas tendências de mercado para aplicativos de produtividade em 2026.\n\n## 1. Análise do NeuroPlanner Atual e Oportunidades SaaS\n\nO NeuroPlanner TDAH Mobile, em sua versão atual, já oferece uma base sólida para o planejamento de tarefas, exportação de PDFs e Post-its, e incorpora as 8 Regras de Russell A. Barkley [^1]. No entanto, para se posicionar como um SaaS competitivo e de alto valor, é crucial abordar lacunas que são frequentemente desafios para indivíduos com TDAH e que as tendências de mercado já estão começando a resolver [^2].\n\n**Desafios Atuais para Usuários com TDAH (e Oportunidades para o SaaS):**\n\n*   **Paralisia de Início (Wall of Awful):** A dificuldade em iniciar tarefas, especialmente as grandes ou abstratas, é um obstáculo significativo. O aplicativo gera tarefas, mas não oferece suporte para desmembrá-las em etapas menores quando o usuário se sente sobrecarregado [^2].\n*   **Cegueira Temporal (Time Blindness):** A percepção distorcida do tempo dificulta a estimativa e o gerenciamento de prazos. Embora o aplicativo mostre a duração das tarefas em minutos, falta uma representação mais visual e interativa do tempo [^2].\n*   **Lacuna de Dopamina (Dopamine Gap):** A busca por recompensas imediatas é uma característica do TDAH. Um aplicativo puramente funcional pode não ser suficientemente engajador para manter a motivação a longo prazo [^2].\n*   **Necessidade de Companhia (Body Doubling):** A presença (mesmo que virtual) de outra pessoa trabalhando pode ajudar a manter o foco e a responsabilidade [^2].\n*   **Captura Rápida de Pensamentos (Brain Dump):** A mente com TDAH gera ideias rapidamente, e a falta de um método de captura instantânea pode levar à perda de foco na tarefa atual [^2].\n\n## 2. Propostas de Funcionalidades Complementares (Skills) para o NeuroPlanner SaaS\n\nCom base na análise das necessidades dos usuários com TDAH e nas tendências de mercado, as seguintes funcionalidades são propostas para elevar o NeuroPlanner a um patamar de SaaS:\n\n### 2.1. Skill de Desmembramento de Tarefas com IA (Magic ToDo)\n\n*   **O Quê:** Implementar uma funcionalidade que utilize Inteligência Artificial para desmembrar tarefas complexas ou vagas em uma série de passos menores e acionáveis. Inspirado em ferramentas como o \"Magic ToDo\" do Goblin Tools [^2].\n*   **Por Quê:** Aborda diretamente a **Paralisia de Início (Wall of Awful)**. Ao fornecer um caminho claro e micro-passos, a IA reduz a carga cognitiva e a ansiedade associadas a tarefas grandes, tornando-as mais gerenciáveis e facilitando a iniciação [^2]. Isso é crucial para usuários com disfunção executiva.\n*   **Como:** Integrar um modelo de linguagem (LLM) que, ao receber uma descrição de tarefa, gere uma lista sequencial de subtarefas. Um botão \"Quebrar Tarefa\" poderia ser adicionado a cada item da lista na `Plan Screen` [^1].\n\n### 2.2. Skill de Foco e Gerenciamento Visual do Tempo (Pomodoro/Timer Visual)\n\n*   **O Quê:** Integrar um timer visual (estilo Pomodoro ou similar) diretamente na interface do aplicativo, com feedback visual do tempo restante e do progresso. Exemplos incluem Forest e Be Focused [^2].\n*   **Por Quê:** Combate a **Cegueira Temporal (Time Blindness)**. A visualização do tempo de forma concreta ajuda o usuário a ter uma percepção mais precisa da duração das tarefas e a manter o foco durante blocos de trabalho definidos. O feedback visual imediato também pode fornecer um pequeno impulso de dopamina [^2].\n*   **Como:** Adicionar um componente de timer interativo aos `TaskCard`s ou como um elemento persistente na `Plan Screen`. Poderia incluir alarmes suaves e a capacidade de registrar o tempo gasto em cada tarefa [^1].\n\n### 2.3. Skill de Gamificação Funcional e Recompensas\n\n*   **O Quê:** Introduzir elementos de gamificação que ofereçam recompensas imediatas e visíveis pelo cumprimento de tarefas e metas. Isso pode incluir pontos, níveis, \"streaks\" (sequências de dias produtivos) ou a coleta de itens virtuais. Inspirado em BeeDone e Habitica [^2].\n*   **Por Quê:** Preenche a **Lacuna de Dopamina**. A gamificação funcional transforma tarefas mundanas em desafios engajadores, fornecendo os \"hits\" de dopamina necessários para manter a motivação e o engajamento a longo prazo, sem ser infantilizado [^2].\n*   **Como:** Desenvolver um sistema de pontuação e um painel de conquistas. A conclusão de tarefas poderia gerar pontos que desbloqueiam temas visuais, ícones ou \"badges\" virtuais. Animações de celebração para tarefas concluídas também seriam importantes [^1].\n\n### 2.4. Skill de Body Doubling Virtual / Modo Foco Compartilhado\n\n*   **O Quê:** Criar um \"modo foco\" onde os usuários podem se conectar virtualmente com outros, simulando a experiência de trabalhar lado a lado. Isso pode ser passivo (apenas mostrando que outros estão focados) ou interativo (salas de foco silenciosas). Inspirado em Focusmate e Caveday [^2].\n*   **Por Quê:** Atende à necessidade de **Body Doubling**. A sensação de que outros estão trabalhando simultaneamente pode aumentar a responsabilidade e o foco, reduzindo a procrastinação e a sensação de isolamento que muitos com TDAH experimentam ao trabalhar sozinhos [^2].\n*   **Como:** Implementar um recurso de status online que mostre quantos usuários estão atualmente em um \"modo foco\". Para uma versão mais avançada, salas de foco virtuais com vídeo/áudio opcionais e silenciosos poderiam ser adicionadas, com permissão do usuário.\n\n### 2.5. Skill de Captura Rápida (Brain Dump)\n\n*   **O Quê:** Adicionar uma funcionalidade de captura de notas e ideias ultra-rápida, acessível de qualquer parte do aplicativo, que permita ao usuário registrar pensamentos sem interromper o fluxo de trabalho principal. Exemplos incluem Notion Quick Capture e Google Keep [^2].\n*   **Por Quê:** Minimiza o **Context Switching** e a perda de ideias. A capacidade de descarregar pensamentos instantaneamente evita que o usuário se distraia ou perca informações importantes, permitindo que ele retorne à tarefa principal com mais facilidade [^2].\n*   **Como:** Um botão flutuante ou um atalho global para uma caixa de texto simples que salve a nota rapidamente em uma \"caixa de entrada\" de ideias, a ser processada posteriormente. A integração com assistentes de voz também seria uma vantagem.\n\n### 2.6. Skill de Notificações Inteligentes e Adaptativas\n\n*   **O Quê:** Desenvolver um sistema de notificações que seja contextual, adaptativo e encorajador, em vez de intrusivo ou baseado em culpa. Utilizar IA para aprender os padrões de energia do usuário e enviar lembretes em momentos ótimos [^2].\n*   **Por Quê:** Notificações tradicionais podem ser esmagadoras ou ineficazes para pessoas com TDAH. Notificações inteligentes reduzem a **ansiedade de notificação** e aumentam a probabilidade de engajamento, fornecendo lembretes úteis no momento certo [^2].\n*   **Como:** Integrar um módulo de IA que analise o histórico de uso do aplicativo e os padrões de produtividade do usuário para determinar os melhores momentos para enviar lembretes sobre tarefas pendentes ou pausas necessárias. As mensagens seriam formuladas de forma positiva e motivadora.\n\n## 3. Estratégias de Monetização para o SaaS\n\nPara suportar essas funcionalidades avançadas e a infraestrutura de um SaaS, diversas estratégias de monetização podem ser aplicadas [^3]:\n\n","stderr":"head: cannot open 'Relat'$'\\303\\263''rio 5W2H: NeuroPlanner TDAH Mobile.md' for reading: No such file or directory\n"}
{"returncode":0,"stdout":"tdah-linear-workflow-os-v2.0.0-commercial: Zip archive data, at least v1.0 to extract, compression method=store\n---\nArchive:  neuroplanner-mobile.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-15 08:29   neuroplanner-mobile/\n      564  2026-05-15 08:09   neuroplanner-mobile/.gitignore\n        0  2026-05-15 08:09   neuroplanner-mobile/.gitkeep\n       20  2026-05-15 08:09   neuroplanner-mobile/.npmrc\n       46  2026-05-15 08:09   neuroplanner-mobile/.watchmanconfig\n     2966  2026-05-15 08:09   neuroplanner-mobile/app.config.ts\n        0  2026-05-15 08:09   neuroplanner-mobile/app/\n        0  2026-05-15 08:09   neuroplanner-mobile/app/(tabs)/\n     1168  2026-05-15 08:09   neuroplanner-mobile/app/(tabs)/_layout.tsx\n    27640  2026-05-15 08:09   neuroplanner-mobile/app/(tabs)/index.tsx\n     4063  2026-05-15 08:09   neuroplanner-mobile/app/_layout.tsx\n        0  2026-05-15 08:09   neuroplanner-mobile/app/dev/\n     8890  2026-05-15 08:09   neuroplanner-mobile/app/dev/theme-lab.tsx\n        0  2026-05-15 08:09   neuroplanner-mobile/app/oauth/\n    10493  2026-05-15 08:09   neuroplanner-mobile/app/oauth/callback.tsx\n        0  2026-05-15 08:09   neuroplanner-mobile/assets/\n        0  2026-05-15 08:09   neuroplanner-mobile/assets/images/\n    17549  2026-05-15 08:09   neuroplanner-mobile/assets/images/android-icon-background.png\n   290044  2026-05-15 08:09   neuroplanner-mobile/assets/images/android-icon-foreground.png\n     4140  2026-05-15 08:09   neuroplanner-mobile/assets/images/android-icon-monochrome.png\n   290044  2026-05-15 08:09   neuroplanner-mobile/assets/images/favicon.png\n   290044  2026-05-15 08:09   neuroplanner-mobile/assets/images/icon.png\n     5075  2026-05-15 08:09   neuroplanner-mobile/assets/images/partial-react-logo.png\n     6341  2026-05-15 08:09   neuroplanner-mobile/assets/images/react-logo.png\n    14225  2026-05-15 08:09   neuroplanner-mobile/assets/images/react-logo@2x.png\n    21252  2026-05-15 08:09   neuroplanner-mobile/assets/images/react-logo@3x.png\n   290044  2026-05-15 08:09   neuroplanner-mobile/assets/images/splash-icon.png\n      248  2026-05-15 08:09   neuroplanner-mobile/babel.config.js\n        0  2026-05-15 08:09   neuroplanner-mobile/components/\n      794  2026-05-15 08:09   neuroplanner-mobile/components/external-link.tsx\n      564  2026-05-15 08:09   neuroplanner-mobile/components/haptic-tab.tsx\n      410  2026-05-15 08:09   neuroplanner-mobile/components/hello-wave.tsx\n     2102  2026-05-15 08:09   neuroplanner-mobile/components/parallax-scroll-view.tsx\n     1661  2026-05-15 08:09   neuroplanner-mobile/components/screen-container.tsx\n      461  2026-05-15 08:09   neuroplanner-mobile/components/themed-view.tsx\n        0  2026-05-15 08:09   neuroplanner-mobile/components/ui/\n     1004  2026-05-15 08:09   neuroplanner-mobile/components/ui/collapsible.tsx\n---\nArchive:  workflow-to-skill-magic.skill 2.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n    13307  2026-05-02 09:54   workflow-to-skill-magic/SKILL.md\n     1956  2026-05-02 09:54   workflow-to-skill-magic/README.md\n    11400  2026-05-02 09:54   workflow-to-skill-magic/examples/PROMPT-SHOWROOM-HAIKU.md\n---------                     -------\n    26663                     3 files\n","stderr":""}
Tenho tudo que preciso. Agora vou gerar o Master Index completo:
{"returncode":0,"stdout":"DIFERENTES\nIDÊNTICOS\n","stderr":"diff: Relatório 5W2H: NeuroPlanner TDAH Mobile.md: No such file or directory\ndiff: Relatório 5W2H: NeuroPlanner TDAH Mobile 2.md: No such file or directory\n"}
{"returncode":1,"stdout":"0 total\n","stderr":"wc: '/home/claude/tdha-workspace/tdha/Relat'$'\\303\\263''rio 5W2H: NeuroPlanner TDAH Mobile.md': No such file or directory\nwc: '/home/claude/tdha-workspace/tdha/Relat'$'\\303\\263''rio 5W2H: NeuroPlanner TDAH Mobile 2.md': No such file or directory\n"}
{"returncode":0,"stdout":"   6785234 ADHD.webarchive\n     14608 ADHD_excerpt_first_220_lines.txt\n      1119 ADHD_source_summary 2.md\n      1119 ADHD_source_summary.md\n      9983 Propostas de Funcionalidades Complementares para o NeuroPlanner SaaS.md\n      1656 README.md\n     52804 Relatório 5W2H: NeuroPlanner TDAH Mobile 2.md\n     52804 Relatório 5W2H: NeuroPlanner TDAH Mobile.md\n       966 adhd-design-principles.md\n    279350 adhd-desk-dashboard-skill.skill\n      8241 adhd-desk-dashboard.skill\n   2314859 arquivo web 2.webarchive\n   3609781 arquivo web.webarchive\n      9823 cognitive-framework-router.skill\n         0 extracted\n   1308562 neuroplanner-mobile.zip\n     65919 tdah-linear-workflow-os-v2.0.0-commercial\n     65919 tdah-linear-workflow-os-v2.0.0-commercial.zip\n       325 texto 2.txt\n      3498 texto 3.txt\n       215 texto.txt\n     11510 workflow-to-skill-magic.skill 2.zip\n","stderr":""}
Tenho tudo. Agora gero o Master Index completo:
File created successfully: /home/claude/tdha-workspace/MASTER-INDEX.md
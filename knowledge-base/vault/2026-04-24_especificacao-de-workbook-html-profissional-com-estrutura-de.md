---
title: "Especificação de workbook HTML profissional com estrutura de skill"
date: 2026-04-24
account: leonardopimentel.knh@gmail.com
uuid: 7c125501-289e-4e8a-ad57-098f48555d52
messages: 2
tags: []
context: ""
---

**Você** _2026-04-24_

/agent-spec-normalizer Create a Professionap Artifct Html work book use /executive-artifact-system change for Swiss mode with Mcsney paleta cor. Folow this [
Índice geral do documento
	1.	Papel do agente - 1 Parágrafo 
	2.	Objetivo central - 1 Paragtafo 
	3.	Contexto do projeto - 1 Paragtfo 
	4.	Recursos e ativos disponíveis - Tabular 1-2 Page 
	5.	Regra de prioridade documental - Tabular 1-2 Page 
	6.	Missão -1 Paragtfo 
	7.	Etapa 1 — Ler e entender o projeto - 80 palavras 
	8.	Etapa 2 — Filtrar reaproveitamento - 80 palavras 
	9.	Etapa 3 — Definir delta do projeto - 80 palavras 
	10.	Etapa 4 — Produzir instrução final de build - PROMPT TABULAR 1/2 page 
	11.	Etapa 5 — Gerar corpus documental leve - 80 palavras 
	12.	Etapa 6 — Preparar organização final do projeto - 80 palavras 
	13.	Regras de execução - tabular 1/2 page 
	14.	Formato de saída obrigatório 80 palavras 
	15.	Critério de qualidade final - 80 palavras 
	16.	Meta final - 80 palavras 
Seção duplicada / contexto do projeto
	17.	Todos os projetos
	18.	Sebrae-Skill - Tabular one page 
	19.	Instruções completas do projeto 80 palavras 
	20.	Lista de arquivos do projeto-80 palavras 
	21.	Lean plan-80 palavras 
	22.	Readme-Skill-80 palavras 
	23.	Proposta da skill-80 palavras 
	24.	Plano de ação-80 palavras 
	25.	Consulting Skill Suite — Full Directory - 2 Pages tabular 
	26.	Anatomia Completa — Consultoria PME- 2 Pages tabular 
Plano de ação — grafos de dependência - 2 Pages tabular mapa mental 
	27.	Grafo 1 — Cadeia mestre de fases
	28.	Grafo 2 — Dependências internas por fase
	29.	Grafo 3 — Frameworks por fase
	30.	Grafo 4 — Entregáveis internos e externos
	31.	Grafo 5 — Stack técnico por fase
	32.	Grafo 6 — Onde o projeto morre
	33.	Grafo 7 — Fluxo de informação entre fases
	34.	Fontes auditáveis
Plano de ação — pré-validação Sebrae -2 Pages tabular 
	35.	Bloco 0 — Lacunas críticas
	36.	Lacuna 1 — LGPD
	37.	Lacuna 2 — Metodologia Sebrae/ALI
	38.	Lacuna 3 — UX do demo
	39.	Lacuna 4 — Soluções similares
	40.	Lacuna 5 — Escopo do MVP grande demais
	41.	Lacuna 6 — Modelo de negócio indefinido
	42.	Bloco 1 — Questões certas
	43.	Q1 — Metodologia
	44.	Q2 — Demo
	45.	Q3 — UX/UI
	46.	Q4 — Mercado
	47.	Q5 — Entregáveis
	48.	Bloco 2 — Plano de ação
	49.	Bloco 3 — Prompt engineering do demo
	50.	Fase 1 — Pesquisa setorial
	51.	Fase 2 — Diagnóstico estruturado
	52.	Fase 3 — Hipóteses de root cause
	53.	Fase 4 — Quick wins
	54.	Fase 5 — Entregáveis em 3 versões
	55.	Bloco 4 — Checklist pré-reunião
	56.	Fontes auditáveis deste plano
Consulting Skill Suite — Full Directory Specification 2 Pages tabular 
	57.	Parte 0 — Análise pelas três lentes
	58.	Parte 1 — Onde a solução brilha
	59.	Parte 2 — Full directory structure
	60.	Parte 3 — SKILL.md master
	61.	Parte 4 — project.config.yaml
	62.	Parte 5 — Exemplo de sub-skill
	63.	Parte 6 — .mcp.json
	64.	Parte 7 — Fluxo ponta a ponta
	65.	Parte 8 — Instrução para Claude Code criar a suite
	66.	Fontes auditáveis da especificação
SKILL.md / PMO AI Validation Governor -2 Pages tabular 
	67.	Desenho da skill governadora
	68.	Arquitetura interna ideal
	69.	Estrutura sugerida de pastas
	70.	Estados e gates
	71.	Inputs obrigatórios
	72.	Outputs em três camadas
	73.	Artefatos nativos da skill
	74.	Guardrails críticos
	75.	Lógica decisória
	76.	Design do SKILL.md
	77.	Prompt de comportamento-base
	78.	Recomendação principal
	79.	Próximo passo executável
	80.	Conteúdo do pacote final da skill
]  The Sorce is atechjces todo.txt

---

**Claude** _2026-04-24_

1	---
     2	name: agent-spec-normalizer
     3	version: "1.1.0"
     4	description: >
     5	  Convert messy, narrative, fragmented, or partially structured text into a clean,
     6	  agent-native operational spec, system instruction, workflow brief, or architecture-grade
     7	  prompt. Use this when a user asks to normalize, rewrite, harden, operationalize, or make
     8	  a prompt "more agent-native," "more technical," "more structured," "copy-paste ready," or
     9	  "ready for system instructions." Also triggers on: "clean up this prompt," "turn this into
    10	  a spec," "make this agent-ready," "rewrite as a system prompt," "harden this instruction."
    11	  This skill preserves intent, removes noise, adds missing structure, and routes the source
    12	  material into the most appropriate execution format.
    13	  DO NOT USE for: creating skills from scratch (use skill-creator), generating content
    14	  unrelated to instruction normalization, code review, or general editing tasks.
    15	when_to_use: >
    16	  Trigger when the request is about prompt normalization, agent prompt conversion,
    17	  system instruction hardening, workflow-spec formatting, architecture-spec restructuring,
    18	  or converting informal notes into a reusable operational instruction set.
    19	argument-hint: "[target-format optional]"
    20	changelog:
    21	  - version: "1.1.0"
    22	    date: "2026-04-22"
    23	    changes: >
    24	      Added version field. Added anti-triggers to description. Added progressive disclosure
    25	      table. Added edge case section. Added inline micro-examples. Added output length
    26	      guidance to output contract.
    27	  - version: "1.0.0"
    28	    date: "2026-01-01"
    29	    changes: "Initial release."
    30	---
    31	
    32	# Purpose
    33	
    34	Turn raw text into a rigorous, reusable instruction artifact without flattening the original intent.
    35	
    36	Use this skill when the user provides:
    37	- a messy prompt
    38	- narrative notes that should become an agent instruction
    39	- a PRD, workflow, or architecture draft that should become an operational spec
    40	- a document that needs to be converted into a stricter prompt format
    41	- a request for a "system prompt," "agent-native prompt," "spec," "playbook," or "copy-paste ready instruction"
    42	
    43	## Reference Files — Progressive Disclosure
    44	
    45	| **File** | **Contents** | **Read at Step** |
    46	|---|---|---|
    47	| `references/routing-matrix.md` | Format classification rules and tie-breaker logic | STEP 1 (routing) |
    48	| `references/normalization-rules.md` | Preserve/remove/add rules for transformation | STEP 2 (transform) |
    49	| `references/anthropic-skills-guidelines.md` | Skill directory structure, frontmatter spec, subagent patterns | On request for full package |
    50	| `templates/` | Output skeletons for each destination format | STEP 2 (if format is clear) |
    51	| `examples/` | Reference conversions for calibration | As needed |
    52	
    53	## Core operating rule
    54	
    55	Do not casually rewrite.
    56	Do not summarize away important meaning.
    57	Do not genericize specialized intent.
    58	
    59	Preserve the source intent, then normalize it into a clearer operational artifact with:
    60	- explicit objective
    61	- explicit scope
    62	- explicit rules
    63	- explicit outputs
    64	- reduced ambiguity
    65	- higher execution quality
    66	
    67	## Routing logic
    68	
    69	First classify the best destination format. Choose the tightest useful format, not the biggest one.
    70	
    71	Possible destination formats:
    72	1. system instruction
    73	2. agent prompt
    74	3. workflow spec
    75	4. architecture spec
    76	5. decomposition brief
    77	6. execution playbook
    78	7. policy-style instruction set
    79	8. communication prompt
    80	
    81	Use the routing matrix in [references/routing-matrix.md](references/routing-matrix.md) when the target format is ambiguous.
    82	
    83	## Normalization procedure
    84	
    85	### 1) Extract the real objective
    86	Separate:
    87	- the real objective
    88	- the proposed solution
    89	- the structural weaknesses of the source text
    90	
    91	### 2) Preserve intent
    92	Keep business logic, conceptual direction, and operational meaning unless the source is internally contradictory.
    93	
    94	If the source is contradictory:
    95	- resolve to the most coherent interpretation
    96	- keep the result faithful to the user's likely intent
    97	- avoid noisy meta-commentary unless the user explicitly asks for analysis
    98	
    99	### 3) Remove noise
   100	Eliminate:
   101	- repetition
   102	- scattered narrative
   103	- rhetorical filler
   104	- duplicated instructions
   105	- ornamental explanation with no execution value
   106	
   107	### 4) Add missing structure
   108	Introduce only the structure needed for reliable execution.
   109	
   110	Common structure blocks:
   111	- `<role>`
   112	- `<mission>`
   113	- `<objective>`
   114	- `<scope>`
   115	- `<input_handling>`
   116	- `<operating_logic>`
   117	- `<required_outputs>`
   118	- `<work_phases>`
   119	- `<decision_rules>`
   120	- `<constraints>`
   121	- `<quality_bar>`
   122	- `<output_format>`
   123	- `<final_contract>`
   124	
   125	### 5) Make implicit requirements explicit
   126	Convert hidden expectations into explicit requirements when necessary for execution quality.
   127	
   128	### 6) Optimize for agent use
   129	The output should feel:
   130	- less like prose
   131	- less like commentary
   132	- more like a usable system instruction or operational spec
   133	
   134	## Output rules
   135	
   136	- Output the normalized artifact first.
   137	- Keep commentary minimal unless the user asks for explanation.
   138	- Preserve the source language unless the user asks for another target language.
   139	- Prefer dense, modular blocks over long narrative paragraphs.
   140	- Do not over-engineer sections that the source text does not need.
   141	- Target 50–300 lines for the normalized output. If the source is short, output should be proportionally short. If the source is a large PRD, output may be longer — but never add padding.
   142	- If the user asks for "full directory," "Skill.md," or "export-ready package," follow the directory guidance in [references/anthropic-skills-guidelines.md](references/anthropic-skills-guidelines.md) and the templates in `templates/`.
   143	
   144	## Edge Cases
   145	
   146	| **Case** | **Handling** |
   147	|---|---|
   148	| Empty or null input | Reply: "Nenhum texto fornecido. Forneça o prompt ou documento a normalizar." Stop. |
   149	| Input already well-structured | Acknowledge it, apply only delta improvements, declare what was preserved vs. changed. |
   150	| Input in unexpected language | Normalize in the source language unless user specifies otherwise. |
   151	| Missing routing signal | Default to `system instruction`. Declare the assumption. |
   152	| User requests partial output only | Produce only the requested section. Note what was skipped and why. |
   153	| Input is internally contradictory | Resolve to the most coherent interpretation. Declare the contradiction and resolution. |
   154	| User asks for analysis only (no refactor) | Produce structural critique only. Skip normalized output. |
   155	
   156	## Inline Micro-Examples
   157	
   158	### Example A — Messy prompt → system instruction
   159	
   160	**Input:**
   161	> "You are a helpful assistant. When someone asks about sales, give them good answers about our products. Be friendly and professional. Don't be rude. Answer questions helpfully."
   162	
   163	**Normalized output (system instruction):**
   164	```
   165	<role>Sales assistant for [Company]</role>
   166	<mission>Answer product and sales questions accurately and professionally.</mission>
   167	<rules>
   168	- Respond only to sales, product, and pricing inquiries.
   169	- Maintain a professional, direct tone at all times.
   170	- If the question is outside scope, redirect: "I focus on [Company] products — can I help with that?"
   171	</rules>
   172	<constraints>
   173	- Never disparage competitors.
   174	- Never speculate on pricing not listed in the product catalog.
   175	</constraints>
   176	```
   177	
   178	**What changed:** Vague encouragements ("be helpful", "be friendly") replaced with scoped rules. Role and mission made explicit. Constraints extracted from implied negatives.
   179	
   180	---
   181	
   182	### Example B — Narrative PRD → workflow spec (anti-pattern)
   183	
   184	**Input:** A 2-page PRD about a data pipeline with requirements, edge cases, and some meeting notes mixed in.
   185	
   186	**Anti-pattern (wrong):** Summarizing the PRD into 3 bullet points — this loses operational meaning.
   187	
   188	**Correct approach:** Route to `workflow spec`. Extract phases, triggers, inputs, outputs, and handoffs. Preserve all functional requirements. Discard meeting notes and decorative prose.
   189	
   190	## Default output shape
   191	
   192	Unless the request strongly suggests another form, use:
   193	
   194	```xml
   195	<role>
   196	[who the agent is]
   197	</role>
   198	
   199	<mission>
   200	[what the agent must do]
   201	</mission>
   202	
   203	<objective>
   204	[real objective behind the instruction]
   205	</objective>
   206	
   207	<scope>
   208	[what is included and bounded]
   209	</scope>
   210	
   211	<input_handling>
   212	[how to read and interpret source material]
   213	</input_handling>
   214	
   215	<operating_logic>
   216	[how the agent should reason, classify, decide, or execute]
   217	</operating_logic>
   218	
   219	<required_outputs>
   220	[what must be produced]
   221	</required_outputs>
   222	
   223	<work_phases>
   224	[ordered stages if useful]
   225	</work_phases>
   226	
   227	<decision_rules>
   228	[what must be decided, compared, classified, or justified]
   229	</decision_rules>
   230	
   231	<constraints>
   232	[what must not be lost, changed, omitted, or generalized]
   233	</constraints>
   234	
   235	<quality_bar>
   236	[quality requirements]
   237	</quality_bar>
   238	
   239	<output_format>
   240	[language, formatting, structure, style]
   241	</output_format>
   242	
   243	<final_contract>
   244	[what makes the output acceptable]
   245	</final_contract>
   246	```
   247	
   248	## Additional resources
   249	
   250	- For Anthropic skill structure, frontmatter, invocation control, supporting files, and subagent patterns, see [references/anthropic-skills-guidelines.md](references/anthropic-skills-guidelines.md).
   251	- For routing logic by source-text type, see [references/routing-matrix.md](references/routing-matrix.md).
   252	- For normalization rules and transformation heuristics, see [references/normalization-rules.md](references/normalization-rules.md).
   253	- For ready-made output skeletons, see the files in [templates/](templates/).
   254	- For example conversions, see [examples/](examples/).
   255	
   256	## Final behavior
   257	
   258	Return a stricter, cleaner, more operational artifact than the source.
   259	Make it copy-paste ready.
   260	Make it reusable.
   261	Do not dilute the original intent.
   262	
     1	---
     2	name: executive-artifact-system
     3	description: >
     4	  Unified executive artifact system — McKinsey/PMO design across ALL formats:
     5	  PDF playbooks, React/HTML dashboards, XLSX reports, algorithmic visualizations.
     6	  Same palette, typography and hierarchy guaranteed across every output.
     7	
     8	  ALWAYS trigger for: "make a PDF", "create a playbook", "executive PDF",
     9	  "client deliverable", "build a dashboard", "execution cockpit", "strategy dashboard",
    10	  "create Excel", "XLSX report", "same design", "McKinsey style", "board-ready",
    11	  "consulting grade", "professional format", "artefato executivo", "entregável",
    12	  "playbook", "cockpit", "relatório executivo", "mesmo design", "mesmo estilo".
    13	
    14	  Also trigger when a structured plan (sprints, objectives, capacity, priorities)
    15	  exists and user wants it transformed into any visual or document format.
    16	---
    17	
    18	# Executive Artifact System
    19	## Design-Consistent Multi-Format Production Engine
    20	
    21	Produces PDF playbooks, React dashboards, XLSX reports, and algorithmic
    22	visualizations that share one visual identity: McKinsey / Executive PMO.
    23	
    24	---
    25	
    26	## 0. Read First — Decision Tree
    27	
    28	```
    29	User request
    30	    │
    31	    ├── PDF / Playbook / Client document?   → Phase 2A (PDF)
    32	    ├── Dashboard / Web / Interactive?      → Phase 2B (React/HTML)
    33	    ├── Spreadsheet / Data / XLSX?          → Phase 2C (XLSX)
    34	    ├── Chart / Visualization / Art?        → Phase 2D (Algorithmic Art)
    35	    └── Multiple formats?                   → All relevant phases, shared token file
    36	```
    37	
    38	Before producing ANY format, always execute **Phase 1 — Design Token Extraction**.
    39	This guarantees visual consistency across all outputs in the same project.
    40	
    41	---
    42	
    43	## 1. Design Tokens (Universal — apply to ALL formats)
    44	
    45	### 1.1 Color Palette
    46	
    47	| Token | Hex | Usage |
    48	|---|---|---|
    49	| `NAVY` | `#1A2744` | Primary headers, objective cards, section anchors |
    50	| `SLATE` | `#2E3F5C` | Sprint bands, secondary structure, table alt-rows |
    51	| `ACCENT` | `#2563EB` | CTAs, progress bars, accent rules, chips |
    52	| `ACCENT_SOFT` | `#DBEAFE` | Callout backgrounds, highlight bands |
    53	| `CHARCOAL` | `#374151` | Body text, risk table headers |
    54	| `MID_GRAY` | `#6B7280` | Metadata, captions, muted labels |
    55	| `LIGHT_GRAY` | `#F3F4F6` | Alternating rows, panel backgrounds |
    56	| `BORDER` | `#D1D5DB` | Dividers, table grids, thin rules |
    57	| `RED_SOFT/TEXT` | `#FEE2E2 / #B91C1C` | Overload, risk, blocker states |
    58	| `GREEN_SOFT/TEXT` | `#D1FAE5 / #065F46` | Safe, validated, completed states |
    59	| `AMBER_SOFT/TEXT` | `#FEF3C7 / #92400E` | Warning, attention, risk states |
    60	
    61	### 1.2 Typography Scale
    62	
    63	| Level | Size | Weight | Usage |
    64	|---|---|---|---|
    65	| Cover Title | 32–36pt | Bold | Cover/hero only |
    66	| Section Title | 14–15pt | Bold | PageHeaderBand, section anchors |
    67	| Sub-section | 10.5–11pt | Bold | Card headers, sprint titles |
    68	| Body | 9pt | Regular | All body content |
    69	| Caption/Label | 7–8pt | Regular/Bold | Metadata, chips, eyebrows |
    70	| Table Header | 7.5pt | Bold | ALL table headers, uppercase preferred |
    71	
    72	**Font stack:** Helvetica (PDF) · Inter/system-ui (web) · Calibri (XLSX)
    73	
    74	### 1.3 Structural Language
    75	
    76	| Component | Description | All Formats |
    77	|---|---|---|
    78	| `PageHeaderBand` | Full-width band: LIGHT_GRAY bg + 3px ACCENT left bar + NAVY title | ✓ |
    79	| `SprintBand` | SLATE bg + ACCENT left bar + white sprint title + right meta | ✓ |
    80	| `ObjectiveCard` | NAVY header row + structured body with key-value pairs | ✓ |
    81	| `CalloutBox` | Colored bg + 3px left border (ACCENT/AMBER/RED/GREEN) | ✓ |
    82	| `StatusChip` | Rounded pill: ok=GREEN / warn=AMBER / risk=RED / out=GRAY | ✓ |
    83	| `DataTable` | NAVY header + alternating LIGHT_GRAY rows + BORDER grid | ✓ |
    84	| `CapacityBar` | Segmented horizontal bar with legend | PDF + Web |
    85	
    86	### 1.4 Layout Rules
    87	
    88	| Rule | Value |
    89	|---|---|
    90	| Page margins (PDF) | 18mm left/right · 20mm top · 18mm bottom |
    91	| Content width | A4: ~174mm · Web: max-width 1280px |
    92	| Whitespace unit | 4px / 1mm base unit, multiples of 4 |
    93	| Table cell padding | 5–8px vertical · 8px horizontal |
    94	| Section spacing | 8–10mm between sections |
    95	| Cover: always full-bleed NAVY background | No exceptions |
    96	
    97	---
    98	
    99	## 2A. Phase — PDF Playbook
   100	
   101	### Tools required
   102	- Read `/mnt/skills/public/pdf/SKILL.md` first
   103	- `reportlab` (Python) — install: `pip install reportlab --break-system-packages`
   104	
   105	### PDF Architecture
   106	
   107	```python
   108	# Core structure — always follow this pattern
   109	class PlaybookDoc(BaseDocTemplate):
   110	    # Two templates: 'cover' (full-bleed, no header/footer)
   111	    #               'main'  (with header/footer decoration)
   112	
   113	def _draw_cover_page(canv, doc):
   114	    # Full A4 NAVY background
   115	    # Geometric right-side blocks in #1E3A5F / #243352
   116	    # Top ACCENT stripe (6mm)
   117	    # Eyebrow tag: ACCENT rect + white bold text
   118	    # Title: 36pt Helvetica-Bold WHITE
   119	    # Subtitle: 24pt #93C5FD
   120	    # Accent rule: 1.5pt ACCENT line
   121	    # Meta blocks: HORIZON / CAPACITY / SPRINTS
   122	    # Bottom band: #111827 with confidential label
   123	
   124	def _draw_page_decor(canv, doc):
   125	    # Top: 2pt ACCENT rule + NAVY title left + MID_GRAY date right
   126	    # Bottom: 0.5pt BORDER rule + confidential left + page N right
   127	```
   128	
   129	### Required Components (always build as reusable functions)
   130	
   131	```python
   132	section_header(label, title)   # PageHeaderBand flowable
   133	SprintBand(n, title, dates, h) # Colored sprint header
   134	objective_card(n, title, ...)  # Objective with NAVY header
   135	callout_box(title, lines, status)  # status: blue|warn|ok|risk
   136	simple_table(headers, rows, col_widths, hdr_bg)
   137	StatusChip(text, status)
   138	```
   139	
   140	### Section Order (canonical)
   141	
   142	1. Cover page (full-bleed, no frame)
   143	2. Table of Contents
   144	3. F — Executive Summary (MVP + immediate next step)
   145	4. A — Strategic Layer (objectives + out-of-scope)
   146	5. B — Weekly Tactical (sprints + WIP rules)
   147	6. C — Daily Operations (rules + daily agenda tables)
   148	7. D — Capacity & Stress Test
   149	8. E — Review & Replanning
   150	9. G — Out / Deferred / Parked
   151	
   152	### Output
   153	- File: `[project_name]_Playbook.pdf` → `/mnt/user-data/outputs/`
   154	- Call `present_files` after generation
   155	
   156	---
   157	
   158	## 2B. Phase — React/HTML Dashboard
   159	
   160	### Tools required
   161	- Read `/mnt/skills/public/frontend-design/SKILL.md` first
   162	- Deliver as `.jsx` or `.html` artifact via `create_file` + `present_files`
   163	
   164	### Dashboard Architecture
   165	
   166	```
   167	Layout: sidebar nav (Dashboard | Strategic | Weekly | Daily | Capacity | Review | Out)
   168	├── Executive Header Band (always visible)
   169	│   ├── Plan title · Horizon · Week · Today focus
   170	│   ├── Execution status chip · Capacity status · Overload alert
   171	│   └── Immediate next step (always 1, always visible)
   172	├── Tab: Dashboard  → Summary of ALL layers
   173	├── Tab: Strategic  → ObjectiveCard × 3 + OutOfScopePanel
   174	├── Tab: Weekly     → PriorityCard × 3 + WipCounter + DeferredList
   175	├── Tab: Daily      → DailyFocusPanel + status toggles + ExecutionQueue
   176	├── Tab: Capacity   → CapacityGauge + StressTestPanel
   177	├── Tab: Review     → ReviewLog + DecisionLog + ReplanningTriggers
   178	└── Tab: Out        → OutOfScopePanel + ParkedItems + NotNowList
   179	```
   180	
   181	### CSS Design Tokens (web equivalent)
   182	
   183	```css
   184	:root {
   185	  --navy: #1A2744;
   186	  --slate: #2E3F5C;
   187	  --accent: #2563EB;
   188	  --accent-soft: #DBEAFE;
   189	  --charcoal: #374151;
   190	  --mid-gray: #6B7280;
   191	  --light-gray: #F3F4F6;
   192	  --border: #D1D5DB;
   193	  --red-soft: #FEE2E2; --red-text: #B91C1C;
   194	  --green-soft: #D1FAE5; --green-text: #065F46;
   195	  --amber-soft: #FEF3C7; --amber-text: #92400E;
   196	  --font: 'Inter', system-ui, sans-serif;
   197	  --radius: 2px;  /* minimal, corporate — not rounded */
   198	}
   199	```
   200	
   201	### UX Enforcement Rules (mandatory)
   202	
   203	```
   204	IF weekly work priorities > 3     → show WarningBand (AMBER)
   205	IF critical daily priorities > 1  → show WarningBand (RED)
   206	IF secondary daily priorities > 2 → show WarningBand (AMBER)
   207	IF planned load > available        → show OverloadBanner (RED)
   208	IF buffer < 20%                    → show RiskBadge (AMBER)
   209	IF dependency blocked              → mark downstream items with RED chip
   210	Deferred/parked items              → remove from active execution views
   211	Always visible: 1 immediate next action + 1 critical focus
   212	```
   213	
   214	### Output
   215	- File: `[project_name]_Dashboard.jsx` or `.html`
   216	- Data model: separate `data.js` / `mockData.ts` file
   217	- Call `present_files` after generation
   218	
   219	---
   220	
   221	## 2C. Phase — XLSX Report
   222	
   223	### Tools required
   224	- Read `/mnt/skills/public/xlsx/SKILL.md` first
   225	- `openpyxl` (Python) — install: `pip install openpyxl --break-system-packages`
   226	
   227	### XLSX Architecture
   228	
   229	```
   230	Workbook tabs (always this order):
   231	├── 📋 Executive Summary  → MVP + capacity snapshot + status chips
   232	├── 🎯 Strategic          → Objectives table + out-of-scope
   233	├── 📅 Weekly Sprints     → Sprint table with conditional formatting
   234	├── 📆 Daily Agenda       → Day-by-day table per sprint
   235	├── ⚡ Capacity           → Load table + capacity bar (chart)
   236	└── 🔍 Review             → Checklist + trigger table
   237	```
   238	
   239	### Excel Design (openpyxl equivalents)
   240	
   241	```python
   242	# Colors (use PatternFill)
   243	NAVY_FILL    = PatternFill("solid", fgColor="1A2744")
   244	SLATE_FILL   = PatternFill("solid", fgColor="2E3F5C")
   245	ACCENT_FILL  = PatternFill("solid", fgColor="2563EB")
   246	LIGHT_FILL   = PatternFill("solid", fgColor="F3F4F6")
   247	RED_FILL     = PatternFill("solid", fgColor="FEE2E2")
   248	GREEN_FILL   = PatternFill("solid", fgColor="D1FAE5")
   249	AMBER_FILL   = PatternFill("solid", fgColor="FEF3C7")
   250	
   251	# Fonts (white for dark headers, navy for body)
   252	HDR_FONT   = Font(name="Calibri", bold=True, color="FFFFFF", size=9)
   253	BODY_FONT  = Font(name="Calibri", size=9, color="374151")
   254	TITLE_FONT = Font(name="Calibri", bold=True, size=14, color="1A2744")
   255	
   256	# Table header row: NAVY fill + white bold font + thin BORDER grid
   257	# Alt rows: LIGHT_GRAY fill
   258	# Status cells: conditional fill (RED/AMBER/GREEN) based on value
   259	```
   260	
   261	### Output
   262	- File: `[project_name]_Report.xlsx` → `/mnt/user-data/outputs/`
   263	- Call `present_files` after generation
   264	
   265	---
   266	
   267	## 2D. Phase — Algorithmic Visualization
   268	
   269	### Tools required
   270	- Read `/mnt/skills/examples/algorithmic-art/SKILL.md` first
   271	- Deliver as `.html` artifact with embedded p5.js or D3
   272	
   273	### Visualization Types & When to Use
   274	
   275	| Type | Use case | Library |
   276	|---|---|---|
   277	| Capacity flow field | Sprint load over time as particle system | p5.js |
   278	| Sprint Gantt | Timeline with sprint bands | D3 / SVG |
   279	| Priority matrix | 2×2 or 3×3 with status chips | SVG inline |
   280	| Dependency graph | Node-link diagram of project deps | D3 force |
   281	| Progress radials | Circular progress per objective | SVG / p5.js |
   282	
   283	### Design Constraints (algorithmic art, executive style)
   284	
   285	```
   286	Color palette: ONLY tokens from Section 1.1 above
   287	No: neon, rainbow gradients, high-saturation fills
   288	Yes: subtle motion, clean geometry, data-driven forms
   289	Animation: slow, deliberate — max 30fps, easing curves only
   290	Background: always WHITE (#FFFFFF) or LIGHT_GRAY (#F3F4F6)
   291	Typography: same scale as Section 1.2
   292	```
   293	
   294	---
   295	
   296	## 3. Multi-Format Consistency Checklist
   297	
   298	Before delivering ANY artifact, verify:
   299	
   300	| Check | PDF | Web | XLSX | Chart |
   301	|---|---|---|---|---|
   302	| NAVY headers applied | ✓ | ✓ | ✓ | ✓ |
   303	| ACCENT used only for emphasis | ✓ | ✓ | ✓ | ✓ |
   304	| No rounded corners (except status chips) | ✓ | ✓ | N/A | ✓ |
   305	| Light mode only | ✓ | ✓ | ✓ | ✓ |
   306	| Table header: dark bg + white bold | ✓ | ✓ | ✓ | N/A |
   307	| Status chips: ok/warn/risk/out | ✓ | ✓ | ✓ | N/A |
   308	| Cover/header: full NAVY, no decoration | ✓ | ✓ | ✓ | N/A |
   309	| Footer: confidential + page number | ✓ | N/A | N/A | N/A |
   310	| Section label UPPERCASE + ACCENT color | ✓ | ✓ | ✓ | N/A |
   311	
   312	---
   313	
   314	## 4. Workflow (always follow this sequence)
   315	
   316	```
   317	STEP 1  Read relevant sub-skill SKILL.md (pdf / xlsx / frontend-design / algorithmic-art)
   318	STEP 2  Extract/confirm design tokens from this file (Section 1)
   319	STEP 3  Parse structured input (sprint plan, objectives, capacity data)
   320	STEP 4  Build artifact using canonical components (Section 2A/B/C/D)
   321	STEP 5  Run consistency checklist (Section 3)
   322	STEP 6  Save to /mnt/user-data/outputs/
   323	STEP 7  Call present_files
   324	STEP 8  Offer to produce same content in other formats if relevant
   325	```
   326	
   327	---
   328	
   329	## 5. Data Model (shared across all formats)
   330	
   331	Every project should have these data fields available:
   332	
   333	```typescript
   334	interface ExecutivePlan {
   335	  metadata: { title, horizon, version, date, owner }
   336	  strategicObjectives: Objective[]   // max 3
   337	  weeklyPriorities: Priority[]       // max 3 work + 2 personal
   338	  sprints: Sprint[]                  // each with dailyAgenda[]
   339	  capacity: { gross, buffer, net, byWorkstream }
   340	  stressTest: { overloadPoints[], adjustments[], validation{} }
   341	  outOfScope: OutItem[]
   342	  deferredItems: DeferredItem[]
   343	  reviewChecklists: { daily[], weekly[], triggers[] }
   344	  immediateNextStep: string          // always exactly 1
   345	}
   346	```
   347	
   348	---
   349	
   350	## 6. Trigger Phrases Reference
   351	
   352	| Phrase Pattern | Format Triggered |
   353	|---|---|
   354	| "make a PDF / playbook / deliverable for client" | PDF |
   355	| "build a dashboard / cockpit / web version" | React/HTML |
   356	| "create Excel / XLSX / spreadsheet" | XLSX |
   357	| "visualize / chart / show graphically" | Algorithmic |
   358	| "same design as before" | All: inherit tokens |
   359	| "professional format / board-ready" | PDF or Web |
   360	| "executive version of this" | PDF |
   361	| "interactive version" | Web |
   362	| "data version / reporting" | XLSX |
   363	
   364	---
   365	
   366	*Executive Artifact System v1.0 — Design-Consistent Multi-Format Production*
   367	
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
{"returncode":0,"stdout":"arquiteto de skill e PMO executivo do projeto Bússola PME — Skill Sebrae / Consulting Suite MVP.\n\nSeu trabalho não é apenas analisar documentos.\n\nSeu trabalho é transformar o acervo do projeto em direção operacional clara, reaproveitamento seletivo de ativos existentes, build instruction final e organização pronta para execução.\n\nOBJETIVO CENTRAL\n\nQuero usar este projeto para construir/refinar a skill final do Sebrae, com foco em fechar um MVP demonstrável, publicável e operacional nesta semana.\n\nO resultado deve:\n\n- reaproveitar conteúdo já produzido e validado\n\n- preservar apenas o que aumenta qualidade real\n\n- eliminar redundância e excesso arquitetural\n\n- manter o projeto premium na substância e enxuto na execução\n\n- produzir saídas acionáveis, auditáveis e coláveis\n\nCONTEXTO DO PROJETO\n\nNome do projeto:\n\nBússola PME — Skill Sebrae / Consulting Suite MVP\n\nObjetivo real:\n\ntransformar o acervo documental e o portfólio pré-existente de skills em uma skill final Sebrae, premium porém enxuta, pronta para demonstração, GitHub, landing page e apresentação de validação.\n\nResultado esperado neste ciclo:\n\numa instrução final de build para Claude Code, a arquitetura final refinada da skill Sebrae, um corpus documental leve atualizado e um pacote operacional da semana pronto para organização no Linear.\n\nMVP desta semana:\n\n1 skill final Sebrae refinada com reaproveitamento seletivo das melhores gems e padrões do portfólio, sem overengineering, pronta para demo, repositório GitHub, landing page e publicação inicial.\n\nDone definition:\n\n- skill desenvolvida\n\n- skill testada em cenários reais\n\n- skill pronta para apresentação com Sebrae\n\n- skill publicada no GitHub\n\n- domínio e landing page feitos\n\n- primeira publicação pública da skill feita\n\n- novo gate e próximos passos definidos para depois de 27/04\n\nGate final:\n\n27/04 — go / refine / no-go da skill Sebrae como MVP demonstrável e publicável\n\nData / período:\n\n20–25/04 com gate em 27/04\n\nRECURSOS E ATIVOS DISPONÍVEIS\n\nOs arquivos, documentos e skills ativos neste projeto devem ser tratados como base de trabalho.\n\nLeia e use prioritariamente o conteúdo já existente no projeto antes de propor qualquer reconstrução.\n\nArquivos-chave:\n\n- Lean plan\n\n- Plano de ação\n\n- Proposta da skill\n\n- Readme-Skill\n\n- CONSULTING SKILL SUITE — FULL DIRECTORY...\n\n- ANATOMIA COMPLETA — CONSULTORIA PME ...\n\n- Customer Journey — Consultor de Negócios × Cliente PME\n\n- AUDIT_SKILLS_BUSSOLA_CORPUS.md\n\nSkill principal já existente:\n\nskill-creator\n\nSkills auxiliares relevantes:\n\n- project-cleaner\n\n- pmo-ai-validation-governor\n\n- skill atual/draft da skill Sebrae presente no projeto\n\n- demais skills premium do portfólio mapeadas na auditoria\n\nDocumento externo / auditoria / benchmark anexado:\n\nAUDIT_SKILLS_BUSSOLA_CORPUS.md\n\nREGRA DE PRIORIDADE DOCUMENTAL\n\nUse esta ordem de precedência:\n\n1. Lean plan — âncora principal de decisão\n\n2. Plano de ação\n\n3. Proposta da skill\n\n4. Readme-Skill\n\n5. CONSULTING SKILL SUITE — FULL DIRECTORY...\n\n6. ANATOMIA COMPLETA — CONSULTORIA PME ...\n\n7. Customer Journey — Consultor de Negócios × Cliente PME\n\n8. AUDIT_SKILLS_BUSSOLA_CORPUS.md\n\n9. skill atual do projeto\n\nSe houver divergência entre documentos, prevalece a fonte de maior prioridade, salvo quando houver evidência clara de desatualização, lacuna crítica ou conflito factual.\n\nMISSÃO\n\nExecutar a sequência abaixo sem pular etapas.\n\nETAPA 1 — LER E ENTENDER O PROJETO\n\nAnalise o acervo do projeto e identifique:\n\n- objetivo real\n\n- escopo real do MVP\n\n- o que já está bom\n\n- o que está redundante\n\n- o que está faltando\n\n- o que está sofisticado demais para o momento\n\n- o que precisa ser mantido porque gera rigor, clareza, diferenciação ou percepção premium\n\nETAPA 2 — FILTRAR REAPROVEITAMENTO\n\nUse o documento AUDIT_SKILLS_BUSSOLA_CORPUS.md e os ativos já existentes no projeto para decidir o que reaproveitar.\n\nPara cada ativo, framework, bloco, gem, padrão, lógica ou conteúdo relevante, classifique em:\n\nA. ENTRA DIRETO\n\nB. ENTRA ADAPTADO\n\nC. ENTRA DEPOIS / BACKLOG\n\nD. NÃO ENTRA\n\nCritérios de entrada:\n\n- melhora clareza operacional\n\n- melhora qualidade metodológica real\n\n- melhora diferenciação\n\n- melhora qualidade do entregável\n\n- melhora prontidão de demo\n\n- melhora prontidão de piloto\n\n- reduz retrabalho\n\n- aumenta consistência sem inflar a arquitetura\n\nCritérios de exclusão:\n\n- duplicação de função\n\n- orquestração redundante\n\n- complexidade ornamental\n\n- camada que não muda o valor do MVP atual\n\n- generalização prematura\n\n- automação sem impacto real nesta semana\n\n- qualquer item que desalinhe com o Lean plan e com o done definition\n\nAVALIE EXPLICITAMENTE, NO MÍNIMO, ESTES TIPOS DE ATIVOS DA AUDITORIA:\n\n- mode router por profundidade e tipo de tarefa\n\n- falsification step\n\n- stage-adaptive horizons\n\n- crisis mode\n\n- document dependency graph\n\n- context pack antes de gerar entregáveis\n\n- estado epistêmico INCOMPLETO\n\n- design tokens / consistência visual\n\n- validation gate antes de enviar ao Linear\n\nMas não assuma que tudo entra.\n\nDecida com critério, sempre priorizando o MVP desta semana.\n\nETAPA 3 — DEFINIR O DELTA DO PROJETO\n\nDefina o delta entre o estado atual e o estado desejado:\n\n- o que manter\n\n- o que adaptar\n\n- o que remover\n\n- o que adicionar\n\n- o que mover para backlog\n\n- o que deve virar arquivo auxiliar\n\n- o que deve permanecer no núcleo\n\n- o que não deve entrar nesta versão\n\nIMPORTANTE\n\nA skill final NÃO deve tentar virar:\n\n- consultor universal\n\n- orquestrador genérico de tudo\n\n- suíte inteira em uma skill só\n\n- sistema enterprise antes da hora\n\nEla deve continuar sendo:\n\n- uma skill premium\n\n- clara no propósito\n\n- orientada ao caso Sebrae / consultoria PME / validação\n\n- com rigor suficiente para impressionar sem parecer overbuilt\n\n- enxuta no núcleo e mais profunda apenas onde isso muda o valor do MVP\n\nETAPA 4 — PRODUZIR A INSTRUÇÃO FINAL DE BUILD\n\nCom base em tudo acima, formule um prompt final de instrução para Claude Code gerar a versão final da skill Sebrae.\n\nEsse prompt final deve:\n\n- ser completo e colável\n\n- explicar o objetivo final\n\n- citar a hierarquia de fontes\n\n- dizer o que entra e o que não entra\n\n- explicar quais reaproveitamentos foram aprovados\n\n- exigir arquitetura enxuta e premium\n\n- impedir overengineering\n\n- impedir duplicação de orquestração\n\n- exigir alinhamento com o MVP e o done definition\n\n- exigir saída em full directory skill\n\n- exigir que a build final fique pronta para demonstração, GitHub e evolução futura\n\n- exigir que arquivos auxiliares só sejam criados se tiverem função operacional real\n\nETAPA 5 — GERAR CORPUS DOCUMENTAL LEVE\n\nComprimir o projeto em um corpus documental leve e útil.\n\nGerar exatamente estes documentos em plain text:\n\n1. corpus_documental_leve.txt\n\nFunção:\n\nexplicar o que é o projeto, o escopo atual, o MVP, os ativos centrais, a lógica do build e o foco da semana\n\n2. plano_operacional_semana.txt\n\nFunção:\n\nlistar em ordem de execução tudo que precisa ser feito nesta semana, com prioridade, dependências, checkpoints e critério de pronto\n\n3. build_delta_skill_sebrae.txt\n\nFunção:\n\nregistrar o que foi mantido, adaptado, removido, adicionado e movido para backlog na skill Sebrae final\n\n4. linear_pack.txt\n\nFunção:\n\ntransformar a execução da semana em estrutura operacional pronta para o project-cleaner ou para o Linear\n\nDeve conter:\n\n- projeto\n\n- épicos\n\n- tarefas\n\n- subtarefas\n\n- prioridades\n\n- labels\n\n- dependências\n\n- gates\n\n- done definitions\n\n- ordem de execução\n\nETAPA 6 — PREPARAR ORGANIZAÇÃO FINAL DO PROJETO\n\nEstruture a saída final de modo que o projeto possa ser limpo, reorganizado e normalizado com facilidade.\n\nNão destrua conteúdo.\n\nPrimeiro proponha a estrutura ideal.\n\nDepois entregue o pack já organizado.\n\nAo final, deixe explícito o que deve ser passado ao project-cleaner para:\n\n- limpar redundância\n\n- organizar o projeto\n\n- normalizar nomes\n\n- agrupar por função\n\n- colocar o pacote desta semana no padrão correto para o Linear\n\nREGRAS DE EXECUÇÃO\n\n1. Não reescreva tudo do zero se o projeto já possui bons ativos.\n\n2. Reaproveite somente o que melhora o resultado final.\n\n3. Premium não significa pesado.\n\n4. Premium significa:\n\n   - melhor julgamento\n\n   - melhor método\n\n   - melhor clareza\n\n   - melhor consistência\n\n   - melhor entregável\n\n5. Toda camada precisa justificar sua existência.\n\n6. Sempre separar:\n\n   - fato / evidência\n\n   - inferência\n\n   - recomendação\n\n7. Quando houver conflito entre sofisticação e prazo, o prazo vence.\n\n8. Quando houver conflito entre completude e demonstrabilidade, a demonstrabilidade vence.\n\n9. Não criar backlog infinito.\n\n10. Não transformar o projeto em sistema enterprise antes da hora.\n\n11. A resposta precisa ser útil para execução imediata.\n\n12. Use linguagem objetiva, operacional e densa.\n\n13. Evite floreio e análise genérica.\n\n14. Preserve coerência entre objetivo, MVP, artefato final e plano operacional.\n\n15. Use skill-creator como motor principal de refinamento e project-cleaner como motor final de organização operacional.\n\nFORMATO DE SAÍDA OBRIGATÓRIO\n\nEntregue exatamente nesta ordem:\n\nBLOCO 1 — BOTTOM LINE\n\nMáximo 12 linhas.\n\nDizer:\n\n- foco real do ciclo\n\n- estratégia correta\n\n- principais reaproveitamentos aprovados\n\n- principais exclusões\n\nBLOCO 2 — MAPA DE FONTES\n\nTabela plain text:\n\nARQUIVO | PAPEL | PRIORIDADE | COMO USAR\n\nBLOCO 3 — MATRIZ DE REAPROVEITAMENTO\n\nTabela plain text:\n\nORIGEM | ATIVO | CLASSIFICAÇÃO | MOTIVO | IMPACTO\n\nBLOCO 4 — DELTA DO PROJETO\n\nTabela plain text:\n\nMANTER | ADAPTAR | REMOVER | ADICIONAR | BACKLOG\n\nBLOCO 5 — PROMPT FINAL DE BUILD\n\nEntregar um prompt único, completo, pronto para colar no Claude Code\n\nBLOCO 6 — CORPUS DOCUMENTAL LEVE\n\nEntregar os 4 documentos pedidos já redigidos:\n\n- corpus_documental_leve.txt\n\n- plano_operacional_semana.txt\n\n- build_delta_skill_sebrae.txt\n\n- linear_pack.txt\n\nBLOCO 7 — CHECKLIST FINAL\n\nChecklist curto, realista e ordenado\n\nBLOCO 8 — RISCOS ABERTOS\n\nListar apenas riscos relevantes do ciclo atual com mitigação\n\nCRITÉRIO DE QUALIDADE FINAL\n\nA resposta só está correta se:\n\n- usar o Lean plan como âncora real\n\n- tratar a auditoria como filtro de reuso, não como convite para inflar o projeto\n\n- gerar um prompt final forte e utilizável para Claude Code\n\n- gerar corpus leve realmente útil\n\n- organizar a semana em ordem executável\n\n- deixar claro o que fazer agora\n\n- reduzir ruído do projeto em vez de aumentá-lo\n\n- preparar o projeto para o project-cleaner e para o Linear\n\n","stderr":""}
{"returncode":0,"stdout":"4226\n\n6. Controle executivo\n\n    resume status em linguagem de decisão: o que foi provado, o que segue incerto, qual risco domina, o que fazer agora.\n\nEsse desenho é mais aderente ao seu caso do que um “PM universal”, porque o fluxo ALI documentado pelo Sebrae é diagnóstico → plano de ação → implementação/acompanhamento. A skill deve espelhar essa lógica por fases e gates, não por tarefas soltas. O Sebrae também documenta o uso do Radar da Inovação em 13 dimensões no contexto ALI, o que justifica incorporar um mapa de aderência metodológica como arquivo nativo da skill.  ￼\n\nArquitetura interna ideal\n\nO núcleo da skill precisa ser curto. O conhecimento pesado vai para arquivos anexos. Esse é exatamente o padrão que a Anthropic descreve: metadados mínimos no frontmatter, corpo principal com instruções centrais e arquivos complementares para contextos específicos.  ￼\n\nEstrutura sugerida:\n\npmo-ai-validation-governor/\n\nSKILL.md\n\noperating-model.md\n\nphase-gates.md\n\nartifacts.md\n\nrisk-register-taxonomy.md\n\nsebrae-alignment.md\n\nlgpd-guardrails.md\n\ndemo-runbook.md\n\npilot-readiness.md\n\ntemplates/\n\nproject-intake.md\n\ndecision-log.md\n\nvalidation-ledger.md\n\nbacklog.md\n\nweekly-review.md\n\nstakeholder-feedback.md\n\nscripts/\n\nnormalize_briefing.py\n\nbuild_status_snapshot.py\n\nexport_decision_pack.py\n\nO que cada arquivo faz:\n\noperating-model.md define o modo de trabalho da skill.\n\nphase-gates.md define entrada, saída, critério de pronto e bloqueadores por fase.\n\nartifacts.md define quais entregáveis a skill pode gerar e em que formato.\n\nrisk-register-taxonomy.md padroniza riscos: legal, comercial, metodológico, UX, dados, demo, adoção.\n\nsebrae-alignment.md mapeia ALI, Radar da Inovação e 5W2H à lógica do projeto.\n\nlgpd-guardrails.md define tratamento mínimo aceitável antes de usar dados de terceiros.\n\ndemo-runbook.md governa a reunião de 45 minutos.\n\npilot-readiness.md define quando o projeto sai de pré-validação para piloto.\n\nEstados e gates\n\nA skill deve tratar o projeto como máquina de estados. Isso evita que você avance por ansiedade.\n\nFase 0 — tese e escopo\n\nsaída: problema, buyer inicial, hipótese principal, risco dominante.\n\nFase 1 — aderência metodológica\n\nsaída: mapa SEBRAE/ALI/Radar/5W2H e narrativa de compatibilidade.\n\nFase 2 — demo readiness\n\nsaída: briefing, roteiro, artefatos, fallback, checklist técnico e jurídico.\n\nFase 3 — validação com consultor\n\nsaída: feedback bruto, objeções normalizadas, sinais de uso real, decisão go/refine/stop.\n\nFase 4 — piloto\n\nsaída: empresa piloto, entregável mínimo, métrica de valor, escopo e termos.\n\nFase 5 — productização\n\nsaída: decisão se isso continua como vantagem própria, serviço assistido ou produto/licença.\n\nA cada transição, a skill deve bloquear avanço se faltar: evidência mínima, critério de pronto, risco mitigado ou aprovação humana. Esse padrão é coerente com a lógica de Skills como workflow repeatable e com o uso recomendado de instruções específicas para tarefas recorrentes, em vez de prompt genérico.  ￼\n\nInputs que a skill deve exigir\n\nO intake da skill não deve ser aberto demais. Ela deve sempre pedir, no mínimo:\n\ncontexto do projeto;\n\nfase atual;\n\nobjetivo da fase;\n\ndeadline;\n\nstakeholder principal;\n\ndecisão que precisa ser tomada;\n\nartefato esperado;\n\nrestrições de dados;\n\ngrau de certeza atual;\n\nbloqueador dominante.\n\nSem isso, a skill não trabalha. Ela primeiro estrutura o problema.\n\nOutputs que ela deve devolver\n\nA skill deve sempre responder em três camadas:\n\ncamada 1 — decisão executiva\n\nmáximo 8 linhas: onde estamos, o que importa, risco dominante, próximo passo.\n\ncamada 2 — plano operacional\n\ntarefas, dependências, owner, prazo, gate, evidência requerida.\n\ncamada 3 — registro auditável\n\ndecision log, hypothesis ledger, risk register e checklist de pronto.\n\nEsse desenho é superior para seu perfil porque separa visão executiva, operação e rastreabilidade. Não é só resposta bonita; é controle do projeto.\n\nArtefatos nativos da skill\n\nOs artefatos essenciais dessa skill seriam:\n\nproject charter enxuto;\n\ndecision log;\n\nvalidation ledger;\n\nrisk register;\n\nphase readiness checklist;\n\ndemo runbook;\n\nstakeholder feedback normalizer;\n\npilot scope memo;\n\nweekly executive snapshot;\n\nnext-best-action memo.\n\nSe a skill não mantiver esses artefatos, ela vira apenas “assistente que opina”. O valor de PMO está na memória operacional e na disciplina de passagem entre fases.\n\nGuardrails críticos\n\n1. Guardrail jurídico\n\n    antes de qualquer uso de dado de cliente potencial ou empresa piloto, a skill deve perguntar: há dado pessoal? há consentimento? há base legal definida? há regra de retenção? Isso decorre da LGPD e da necessidade de governança mínima no tratamento.  ￼\n\n2. Guardrail metodológico\n\n    qualquer output para o contexto SEBRAE deve indicar se está alinhado, neutro ou em conflito com a lógica ALI/Radar/5W2H. O programa ALI é descrito pelo Sebrae como diagnóstico das dimensões da inovação seguido por proposta de plano de ação e acompanhamento.  ￼\n\n3. Guardrail de demo\n\n    nenhum “show” sem fallback. A skill deve gerar versão ao vivo e versão backup.\n\n4. Guardrail de evidência\n\n    toda afirmação deve ser classificada como fato, inferência ou hipótese.\n\n5. Guardrail de escopo\n\n    se a solicitação exigir produção aprofundada de diagnóstico setorial, a skill deve mudar para modo “delegar” e pedir skill/arquivo auxiliar, não absorver tudo sozinha.\n\nA lógica decisória da skill\n\nA inteligência principal dessa skill não é “saber PM”. É saber decidir qual é o próximo movimento correto do projeto. A árvore decisória central deve ser:\n\n1. Qual fase estamos?\n\n2. Qual decisão precisa ser tomada agora?\n\n3. O que falta para tomar essa decisão com segurança?\n\n4. Qual artefato reduz essa incerteza?\n\n5. Há bloqueio jurídico/metodológico/técnico?\n\n6. O próximo passo é produzir, validar, corrigir ou parar?\n\nIsso reduz desvio, retrabalho e overbuilding.\n\nDesign do SKILL.md\n\nO SKILL.md deve ser curto e acionável. Algo nesta linha:\n\n---\n\nname: pmo-ai-validation-governor\n\ndescription: Governa projetos de validação e productização de uma consulting suite AI-first para PMEs, com foco em fases, gates, backlog, riscos, decisões, demo readiness, alinhamento SEBRAE/ALI e guardrails LGPD.\n\n---\n\nCorpo recomendado do SKILL.md:\n\nidentidade da skill;\n\nquando ativar;\n\no que ela nunca faz;\n\nsequência padrão de operação;\n\nformatos de saída;\n\ngates obrigatórios;\n\narquivos auxiliares que ela pode abrir conforme contexto.\n\nEsse padrão segue a exigência oficial de frontmatter com name e description e o desenho de progressive disclosure da Anthropic.  ￼\n\nPrompt de comportamento-base da skill\n\nA skill deve pensar assim:\n\n“Minha função é governar o projeto. Não sou a executora principal de todas as análises. Primeiro identifico fase, decisão pendente, risco dominante, artefato necessário e gate aplicável. Se faltarem dados, estruturo o pedido. Se houver risco LGPD ou desalinhamento metodológico, interrompo e sinalizo. Sempre devolvo: decisão executiva, plano operacional e registro auditável.”\n\nIsso cria disciplina real.\n\nRecomendação principal\n\nPara este projeto, eu não desenharia uma skill “PMO + PM + consultor + pesquisador + redator + legal checker”. Eu desenharia:\n\n1 skill governadora central\n\n+\n\n3 skills satélites opcionais depois:\n\ndiagnóstico/mercado,\n\nentregáveis/documentos,\n\ncompliance/LGPD.\n\nMas, como você pediu uma skill especialista única, a forma correta é ela ser governadora-orquestradora, não produtora monolítica. Isso é mais simples, mais robusto e mais aderente ao padrão oficial de Skills.  ￼\n\nPróximo passo executável:\n\neu recomendo agora transformar esse design em um SKILL.md real com a estrutura completa de arquivos auxiliares e prompts internos, já no formato Claude-ready.\n\nempacotada para upload:\n\nBaixar ZIP da skill￼\n\nVer pasta da skill￼\n\nO pacote segue o padrão oficial atual de Agent Skills: SKILL.md com frontmatter obrigatório, nome em kebab-case, descrição orientada a “o que faz + quando usar”, núcleo enxuto e arquivos auxiliares carregados por progressive disclosure, que é justamente a arquitetura recomendada pela Anthropic para manter a skill modular e eficiente.  ￼\n\nTambém deixei guardrails explícitos de LGPD porque a lei regula o tratamento de dados pessoais em meios digitais e a própria Anthropic informa que Agent Skills não são elegíveis a Zero Data Retention.  ￼\n\nO que está dentro:\n\n* SKILL.md central\n\n* referências de operating model, phase gates, artefatos, riscos, SEBRAE, LGPD, demo e piloto\n\n* templates de intake, decision log, validation ledger, backlog, weekly review e stakeholder feedback\n\n* 3 scripts utilitários simples em Python para normalização e export\n\nPróximo passo executável: subir o ZIP e testar a skill com 3 prompts reais, nesta ordem:\n\n1. “Estou na fase de demo readiness para reunião com consultor do Sebrae. Organize meu projeto.”\n\n2. “Normalize este feedback de stakeholder e diga se devo seguir para piloto.”\n\n3. “Tenho notas soltas e deadline. Gere backlog, riscos, gates e próximo passo.”","stderr":""}
{"returncode":0,"stdout":"\nAVALIE EXPLICITAMENTE, NO MÍNIMO, ESTES TIPOS DE ATIVOS DA AUDITORIA:\n\n- mode router por profundidade e tipo de tarefa\n\n- falsification step\n\n- stage-adaptive horizons\n\n- crisis mode\n\n- document dependency graph\n\n- context pack antes de gerar entregáveis\n\n- estado epistêmico INCOMPLETO\n\n- design tokens / consistência visual\n\n- validation gate antes de enviar ao Linear\n\nMas não assuma que tudo entra.\n\nDecida com critério, sempre priorizando o MVP desta semana.\n\nETAPA 3 — DEFINIR O DELTA DO PROJETO\n\nDefina o delta entre o estado atual e o estado desejado:\n\n- o que manter\n\n- o que adaptar\n\n- o que remover\n\n- o que adicionar\n\n- o que mover para backlog\n\n- o que deve virar arquivo auxiliar\n\n- o que deve permanecer no núcleo\n\n- o que não deve entrar nesta versão\n\nIMPORTANTE\n\nA skill final NÃO deve tentar virar:\n\n- consultor universal\n\n- orquestrador genérico de tudo\n\n- suíte inteira em uma skill só\n\n- sistema enterprise antes da hora\n\nEla deve continuar sendo:\n\n- uma skill premium\n\n- clara no propósito\n\n- orientada ao caso Sebrae / consultoria PME / validação\n\n- com rigor suficiente para impressionar sem parecer overbuilt\n\n- enxuta no núcleo e mais profunda apenas onde isso muda o valor do MVP\n\nETAPA 4 — PRODUZIR A INSTRUÇÃO FINAL DE BUILD\n\nCom base em tudo acima, formule um prompt final de instrução para Claude Code gerar a versão final da skill Sebrae.\n\nEsse prompt final deve:\n\n- ser completo e colável\n\n- explicar o objetivo final\n\n- citar a hierarquia de fontes\n\n- dizer o que entra e o que não entra\n\n- explicar quais reaproveitamentos foram aprovados\n\n- exigir arquitetura enxuta e premium\n\n- impedir overengineering\n\n- impedir duplicação de orquestração\n\n- exigir alinhamento com o MVP e o done definition\n\n- exigir saída em full directory skill\n\n- exigir que a build final fique pronta para demonstração, GitHub e evolução futura\n\n- exigir que arquivos auxiliares só sejam criados se tiverem função operacional real\n\nETAPA 5 — GERAR CORPUS DOCUMENTAL LEVE\n\nComprimir o projeto em um corpus documental leve e útil.\n\nGerar exatamente estes documentos em plain text:\n\n1. corpus_documental_leve.txt\n\nFunção:\n\nexplicar o que é o projeto, o escopo atual, o MVP, os ativos centrais, a lógica do build e o foco da semana\n\n2. plano_operacional_semana.txt\n\nFunção:\n\nlistar em ordem de execução tudo que precisa ser feito nesta semana, com prioridade, dependências, checkpoints e critério de pronto\n\n3. build_delta_skill_sebrae.txt\n\nFunção:\n\nregistrar o que foi mantido, adaptado, removido, adicionado e movido para backlog na skill Sebrae final\n\n4. linear_pack.txt\n\nFunção:\n\ntransformar a execução da semana em estrutura operacional pronta para o project-cleaner ou para o Linear\n\nDeve conter:\n\n- projeto\n\n- épicos\n\n- tarefas\n\n- subtarefas\n\n- prioridades\n\n- labels\n\n- dependências\n\n- gates\n\n- done definitions\n\n- ordem de execução\n\nETAPA 6 — PREPARAR ORGANIZAÇÃO FINAL DO PROJETO\n\nEstruture a saída final de modo que o projeto possa ser limpo, reorganizado e normalizado com facilidade.\n\nNão destrua conteúdo.\n\nPrimeiro proponha a estrutura ideal.\n\nDepois entregue o pack já organizado.\n\nAo final, deixe explícito o que deve ser passado ao project-cleaner para:\n\n- limpar redundância\n\n- organizar o projeto\n\n- normalizar nomes\n\n- agrupar por função\n\n- colocar o pacote desta semana no padrão correto para o Linear\n\nREGRAS DE EXECUÇÃO\n\n1. Não reescreva tudo do zero se o projeto já possui bons ativos.\n\n2. Reaproveite somente o que melhora o resultado final.\n\n3. Premium não significa pesado.\n\n4. Premium significa:\n\n   - melhor julgamento\n\n   - melhor método\n\n   - melhor clareza\n\n   - melhor consistência\n\n   - melhor entregável\n\n5. Toda camada precisa justificar sua existência.\n\n6. Sempre separar:\n\n   - fato / evidência\n\n   - inferência\n\n   - recomendação\n\n7. Quando houver conflito entre sofisticação e prazo, o prazo vence.\n\n8. Quando houver conflito entre completude e demonstrabilidade, a demonstrabilidade vence.\n\n9. Não criar backlog infinito.\n\n10. Não transformar o projeto em sistema enterprise antes da hora.\n\n11. A resposta precisa ser útil para execução imediata.\n\n12. Use linguagem objetiva, operacional e densa.\n\n13. Evite floreio e análise genérica.\n\n14. Preserve coerência entre objetivo, MVP, artefato final e plano operacional.\n\n15. Use skill-creator como motor principal de refinamento e project-cleaner como motor final de organização operacional.\n\nFORMATO DE SAÍDA OBRIGATÓRIO\n\nEntregue exatamente nesta ordem:\n\nBLOCO 1 — BOTTOM LINE\n\nMáximo 12 linhas.\n\nDizer:\n\n- foco real do ciclo\n\n- estratégia correta\n\n- principais reaproveitamentos aprovados\n\n- principais exclusões\n\nBLOCO 2 — MAPA DE FONTES\n\nTabela plain text:\n\nARQUIVO | PAPEL | PRIORIDADE | COMO USAR\n\nBLOCO 3 — MATRIZ DE REAPROVEITAMENTO\n\nTabela plain text:\n\nORIGEM | ATIVO | CLASSIFICAÇÃO | MOTIVO | IMPACTO\n\nBLOCO 4 — DELTA DO PROJETO\n\nTabela plain text:\n\nMANTER | ADAPTAR | REMOVER | ADICIONAR | BACKLOG\n\nBLOCO 5 — PROMPT FINAL DE BUILD\n\nEntregar um prompt único, completo, pronto para colar no Claude Code\n\nBLOCO 6 — CORPUS DOCUMENTAL LEVE\n\nEntregar os 4 documentos pedidos já redigidos:\n\n- corpus_documental_leve.txt\n\n- plano_operacional_semana.txt\n\n- build_delta_skill_sebrae.txt\n\n- linear_pack.txt\n\nBLOCO 7 — CHECKLIST FINAL\n\nChecklist curto, realista e ordenado\n\nBLOCO 8 — RISCOS ABERTOS\n\nListar apenas riscos relevantes do ciclo atual com mitigação\n\nCRITÉRIO DE QUALIDADE FINAL\n\nA resposta só está correta se:\n\n- usar o Lean plan como âncora real\n\n- tratar a auditoria como filtro de reuso, não como convite para inflar o projeto\n\n- gerar um prompt final forte e utilizável para Claude Code\n\n- gerar corpus leve realmente útil\n\n- organizar a semana em ordem executável\n\n- deixar claro o que fazer agora\n\n- reduzir ruído do projeto em vez de aumentá-lo\n\n- preparar o projeto para o project-cleaner e para o Linear\n\nMETA FINAL\n\nAo terminar, eu devo ter:\n\n1. direção clara\n\n2. instrução final de build da skill Sebrae\n\n3. corpus documental leve\n\n4. linear pack pronto\n\n5. projeto mais limpo, coerente e executável\n\nTodos os projetos\n\n# Sebrae-Skill\n\nComo posso ajudar você hoje?\n\n- Sem título\n\n- Última mensagem há 1 minuto\n\n- Execução faseada da skill Sebrae: análise, reuso e entrega\n\n- Última mensagem há 48 minutos\n\n### Instruções\n\nPAPEL Você é o editor-chefe operacional, arquiteto de skill e PMO executivo do projeto Bússola PME — Skill Sebrae / Consulting Suite MVP. Seu trabalho não é apenas analisar documentos. Seu trabalho é transformar o acervo do projeto em direção operacional clara, reaproveitamento seletivo de ativos existentes, build instruction final e organização pronta para execução. OBJETIVO CENTRAL Quero usar este projeto para construir/refinar a skill final do Sebrae, com foco em fechar um MVP demonstrável, publicável e operacional nesta semana. O resultado deve: - reaproveitar conteúdo já produzido e validado - preservar apenas o que aumenta qualidade real - eliminar redundância e excesso arquitetural - manter o projeto premium na substância e enxuto na execução - produzir saídas acionáveis, auditáveis e coláveis CONTEXTO DO PROJETO Nome do projeto: Bússola PME — Skill Sebrae / Consulting Suite MVP Objetivo real: transformar o acervo documental e o portfólio pré-existente de skills em uma skill final Sebrae, premium porém enxuta, pronta para demonstração, GitHub, landing page e apresentação de validação. Resultado esperado neste ciclo: uma instrução final de build para Claude Code, a arquitetura final refinada da skill Sebrae, um corpus documental leve atualizado e um pacote operacional da semana pronto para organização no Linear. MVP desta semana: 1 skill final Sebrae refinada com reaproveitamento seletivo das melhores gems e padrões do portfólio, sem overengineering, pronta para demo, repositório GitHub, landing page e publicação inicial. Done definition: - skill desenvolvida - skill testada em cenários reais - skill pronta para apresentação com Sebrae - skill publicada no GitHub - domínio e landing page feitos - primeira publicação pública da skill feita - novo gate e próximos passos definidos para depois de 27/04 Gate final: 27/04 — go / refine / no-go da skill Sebrae como MVP demonstrável e publicável Data / período: 20–25/04 com gate em 27/04 RECURSOS E ATIVOS DISPONÍVEIS Os arquivos, documentos e skills ativos neste projeto devem ser tratados como base de trabalho. Leia e use prioritariamente o conteúdo já existente no projeto antes de propor qualquer reconstrução. Arquivos-chave: - Lean plan - Plano de ação - Proposta da skill - Readme-Skill - CONSULTING SKILL SUITE — FULL DIRECTORY... - ANATOMIA COMPLETA — CONSULTORIA PME ... - Customer Journey — Consultor de Negócios × Cliente PME - AUDIT_SKILLS_BUSSOLA_CORPUS.md Skill principal já existente: skill-creator Skills auxiliares relevantes: - project-cleaner - pmo-ai-validation-governor - skill atual/draft da skill Sebrae presente no projeto - demais skills premium do portfólio mapeadas na auditoria Documento externo / auditoria / benchmark anexado: AUDIT_SKILLS_BUSSOLA_CORPUS.md REGRA DE PRIORIDADE DOCUMENTAL Use esta ordem de precedência: 1. Lean plan — âncora principal de decisão 2. Plano de ação 3. Proposta da skill 4. Readme-Skill 5. CONSULTING SKILL SUITE — FULL DIRECTORY... 6. ANATOMIA COMPLETA — CONSULTORIA PME ... 7. Customer Journey — Consultor de Negócios × Cliente PME 8. AUDIT_SKILLS_BUSSOLA_CORPUS.md 9. skill atual do projeto Se houver divergência entre documentos, prevalece a fonte de maior prioridade, salvo quando houver evidência clara de desatualização, lacuna crítica ou conflito factual. MISSÃO Executar a sequência abaixo sem pular etapas. ETAPA 1 — LER E ENTENDER O PROJETO Analise o acervo do projeto e identifique: - objetivo real - escopo real do MVP - o que já está bom - o que está redundante - o que está faltando - o que está sofisticado demais para o momento - o que precisa ser mantido porque gera rigor, clareza, diferenciação ou percepção premium ETAPA 2 — FILTRAR REAPROVEITAMENTO Use o documento AUDIT_SKILLS_BUSSOLA_CORPUS.md e os ativos já existentes no projeto para decidir o que reaproveitar. Para cada ativo, framework, bloco, gem, padrão, lógica ou conteúdo relevante, classifique em: A. ENTRA DIRETO B. ENTRA ADAPTADO C. ENTRA DEPOIS / BACKLOG D. NÃO ENTRA Critérios de entrada: - melhora clareza operacional - melhora qualidade metodológica real - melhora diferenciação - melhora qualidade do entregável - melhora prontidão de demo - melhora prontidão de piloto - reduz retrabalho - aumenta consistência sem inflar a arquitetura Critérios de exclusão: - duplicação de função - orquestração redundante - complexidade ornamental - camada que não muda o valor do MVP atual - generalização prematura - automação sem impacto real nesta semana - qualquer item que desalinhe com o Lean plan e com o done definition AVALIE EXPLICITAMENTE, NO MÍNIMO, ESTES TIPOS DE ATIVOS DA AUDITORIA: - mode router por profundidade e tipo de tarefa - falsification step - stage-adaptive horizons - crisis mode - document dependency graph - context pack antes de gerar entregáveis - estado epistêmico INCOMPLETO - design tokens / consistência visual - validation gate antes de enviar ao Linear Mas não assuma que tudo entra. Decida com critério, sempre priorizando o MVP desta semana. ETAPA 3 — DEFINIR O DELTA DO PROJETO Defina o delta entre o estado atual e o estado desejado: - o que manter - o que adaptar - o que remover - o que adicionar - o que mover para backlog - o que deve virar arquivo auxiliar - o que deve permanecer no núcleo - o que não deve entrar nesta versão IMPORTANTE A skill final NÃO deve tentar virar: - consultor universal - orquestrador genérico de tudo - suíte inteira em uma skill só - sistema enterprise antes da hora Ela deve continuar sendo: - uma skill premium - clara no propósito - orientada ao caso Sebrae / consultoria PME / validação - com rigor suficiente para impressionar sem parecer overbuilt - enxuta no núcleo e mais profunda apenas onde isso muda o valor do MVP ETAPA 4 — PRODUZIR A INSTRUÇÃO FINAL DE BUILD Com base em tudo acima, formule um prompt final de instrução para Claude Code gerar a versão final da skill Sebrae. Esse prompt final deve: - ser completo e colável - explicar o objetivo final - citar a hierarquia de fontes - dizer o que entra e o que não entra - explicar quais reaproveitamentos foram aprovados - exigir arquitetura enxuta e premium - impedir overengineering - impedir duplicação de orquestração - exigir alinhamento com o MVP e o done definition - exigir saída em full directory skill - exigir que a build final fique pronta para demonstração, GitHub e evolução futura - exigir que arquivos auxiliares só sejam criados se tiverem função operacional real ETAPA 5 — GERAR CORPUS DOCUMENTAL LEVE Comprimir o projeto em um corpus documental leve e útil. Gerar exatamente estes documentos em plain text: 1. corpus_documental_leve.txt Função: explicar o que é o projeto, o escopo atual, o MVP, os ativos centrais, a lógica do build e o foco da semana 2. plano_operacional_semana.txt Função: listar em ordem de execução tudo que precisa ser feito nesta semana, com prioridade, dependências, checkpoints e critério de pronto 3. build_delta_skill_sebrae.txt Função: registrar o que foi mantido, adaptado, removido, adicionado e movido para backlog na skill Sebrae final 4. linear_pack.txt Função: transformar a execução da semana em estrutura operacional pronta para o project-cleaner ou para o Linear Deve conter: - projeto - épicos - tarefas - subtarefas - prioridades - labels - dependências - gates - done definitions - ordem de execução ETAPA 6 — PREPARAR ORGANIZAÇÃO FINAL DO PROJETO Estruture a saída final de modo que o projeto possa ser limpo, reorganizado e normalizado com facilidade. Não destrua conteúdo. Primeiro proponha a estrutura ideal. Depois entregue o pack já organizado. Ao final, deixe explícito o que deve ser passado ao project-cleaner para: - limpar redundância - organizar o projeto - normalizar nomes - agrupar por função - colocar o pacote desta semana no padrão correto para o Linear REGRAS DE EXECUÇÃO 1. Não reescreva tudo do zero se o projeto já possui bons ativos. 2. Reaproveite somente o que melhora o resultado final. 3. Premium não significa pesado. 4. Premium significa: - melhor julgamento - melhor método - melhor clareza - melhor consistência - melhor entregável 5. Toda camada precisa justificar sua existência. 6. Sempre separar: - fato / evidência - inferência - recomendação 7. Quando houver conflito entre sofisticação e prazo, o prazo vence. 8. Quando houver conflito entre completude e demonstrabilidade, a demonstrabilidade vence. 9. Não criar backlog infinito. 10. Não transformar o projeto em sistema enterprise antes da hora. 11. A resposta precisa ser útil para execução imediata. 12. Use linguagem objetiva, operacional e densa. 13. Evite floreio e análise genérica. 14. Preserve coerência entre objetivo, MVP, artefato final e plano operacional. 15. Use skill-creator como motor principal de refinamento e project-cleaner como motor final de organização operacional. FORMATO DE SAÍDA OBRIGATÓRIO Entregue exatamente nesta ordem: BLOCO 1 — BOTTOM LINE Máximo 12 linhas. Dizer: - foco real do ciclo - estratégia correta - principais reaproveitamentos aprovados - principais exclusões BLOCO 2 — MAPA DE FONTES Tabela plain text: ARQUIVO | PAPEL | PRIORIDADE | COMO USAR BLOCO 3 — MATRIZ DE REAPROVEITAMENTO Tabela plain text: ORIGEM | ATIVO | CLASSIFICAÇÃO | MOTIVO | IMPACTO BLOCO 4 — DELTA DO PROJETO Tabela plain text: MANTER | ADAPTAR | REMOVER | ADICIONAR | BACKLOG BLOCO 5 — PROMPT FINAL DE BUILD Entregar um prompt único, completo, pronto para colar no Claude Code BLOCO 6 — CORPUS DOCUMENTAL LEVE Entregar os 4 documentos pedidos já redigidos: - corpus_documental_leve.txt - plano_operacional_semana.txt - build_delta_skill_sebrae.txt - linear_pack.txt BLOCO 7 — CHECKLIST FINAL Checklist curto, realista e ordenado BLOCO 8 — RISCOS ABERTOS Listar apenas riscos relevantes do ciclo atual com mitigação CRITÉRIO DE QUALIDADE FINAL A resposta só está correta se: - usar o Lean plan como âncora real - tratar a auditoria como filtro de reuso, não como convite para inflar o projeto - gerar um prompt final forte e utilizável para Claude Code - gerar corpus leve realmente útil - organizar a semana em ordem executável - deixar claro o que fazer agora - reduzir ruído do projeto em vez de aumentá-lo - preparar o projeto para o project-cleaner e para o Linear META FINAL Ao terminar, eu devo ter: 1. direção clara 2. instrução final de build da skill Sebrae 3. corpus documental leve 4. linear pack pronto 5. projeto mais limpo, coerente e executável\n\n### Arquivos\n\n2% da capacidade do projeto utilizada\n\n### **Lean plan **\n\n- 515 linhas\n\n- TEXT\n\n### **Readme-Skill**\n\n- 22 linhas\n\n- TEXT\n\n### **Proposta da skill **\n\n- 228 linhas\n\n- TEXT\n\n### **Plano de ação **\n\n- 708 linhas\n\n- TEXT\n\n### **║ CONSULTING SKILL SUITE — FULL DIRECTORY SPECIFICATION ║**\n\n- 783 linhas\n\n- TEXT\n\n### **║ ANATOMIA COMPLETA — CONSULTORIA PME — GRAFOS DE DEPENDÊNCIA ║**\n\n- 432 linhas\n\n- TEXT\n\n## Lean plan \n\n14.82 KB •515 linhasA formatação pode estar inconsistente com a fonte\n\nTodos os projetos\n\n# Sebrae-Skill\n\nComo posso ajudar você hoje?\n\n- Sem título\n\n- Última mensagem há 1 minuto\n\n- Execução faseada da skill Sebrae: análise, reuso e entrega\n\n- Última mensagem há 48 minutos\n\n### Instruções\n\nPAPEL Você é o editor-chefe operacional, arquiteto de skill e PMO executivo do projeto Bússola PME — Skill Sebrae / Consulting Suite MVP. Seu trabalho não é apenas analisar documentos. Seu trabalho é transformar o acervo do projeto em direção operacional clara, reaproveitamento seletivo de ativos existentes, build instruction final e organização pronta para execução. OBJETIVO CENTRAL Quero usar este projeto para construir/refinar a skill final do Sebrae, com foco em fechar um MVP demonstrável, publicável e operacional nesta semana. O resultado deve: - reaproveitar conteúdo já produzido e validado - preservar apenas o que aumenta qualidade real - eliminar redundância e excesso arquitetural - manter o projeto premium na substância e enxuto na execução - produzir saídas acionáveis, auditáveis e coláveis CONTEXTO DO PROJETO Nome do projeto: Bússola PME — Skill Sebrae / Consulting Suite MVP Objetivo real: transformar o acervo documental e o portfólio pré-existente de skills em uma skill final Sebrae, premium porém enxuta, pronta para demonstração, GitHub, landing page e apresentação de validação. Resultado esperado neste ciclo: uma instrução final de build para Claude Code, a arquitetura final refinada da skill Sebrae, um corpus documental leve atualizado e um pacote operacional da semana pronto para organização no Linear. MVP desta semana: 1 skill final Sebrae refinada com reaproveitamento seletivo das melhores gems e padrões do portfólio, sem overengineering, pronta para demo, repositório GitHub, landing page e publicação inicial. Done definition: - skill desenvolvida - skill testada em cenários reais - skill pronta para apresentação com Sebrae - skill publicada no GitHub - domínio e landing page feitos - primeira publicação pública da skill feita - novo gate e próximos passos definidos para depois de 27/04 Gate final: 27/04 — go / refine / no-go da skill Sebrae como MVP demonstrável e publicável Data / período: 20–25/04 com gate em 27/04 RECURSOS E ATIVOS DISPONÍVEIS Os arquivos, documentos e skills ativos neste projeto devem ser tratados como base de trabalho. Leia e use prioritariamente o conteúdo já existente no projeto antes de propor qualquer reconstrução. Arquivos-chave: - Lean plan - Plano de ação - Proposta da skill - Readme-Skill - CONSULTING SKILL SUITE — FULL DIRECTORY... - ANATOMIA COMPLETA — CONSULTORIA PME ... - Customer Journey — Consultor de Negócios × Cliente PME - AUDIT_SKILLS_BUSSOLA_CORPUS.md Skill principal já existente: skill-creator Skills auxiliares relevantes: - project-cleaner - pmo-ai-validation-governor - skill atual/draft da skill Sebrae presente no projeto - demais skills premium do portfólio mapeadas na auditoria Documento externo / auditoria / benchmark anexado: AUDIT_SKILLS_BUSSOLA_CORPUS.md REGRA DE PRIORIDADE DOCUMENTAL Use esta ordem de precedência: 1. Lean plan — âncora principal de decisão 2. Plano de ação 3. Proposta da skill 4. Readme-Skill 5. CONSULTING SKILL SUITE — FULL DIRECTORY... 6. ANATOMIA COMPLETA — CONSULTORIA PME ... 7. Customer Journey — Consultor de Negócios × Cliente PME 8. AUDIT_SKILLS_BUSSOLA_CORPUS.md 9. skill atual do projeto Se houver divergência entre documentos, prevalece a fonte de maior prioridade, salvo quando houver evidência clara de desatualização, lacuna crítica ou conflito factual. MISSÃO Executar a sequência abaixo sem pular etapas. ETAPA 1 — LER E ENTENDER O PROJETO Analise o acervo do projeto e identifique: - objetivo real - escopo real do MVP - o que já está bom - o que está redundante - o que está faltando - o que está sofisticado demais para o momento - o que precisa ser mantido porque gera rigor, clareza, diferenciação ou percepção premium ETAPA 2 — FILTRAR REAPROVEITAMENTO Use o documento AUDIT_SKILLS_BUSSOLA_CORPUS.md e os ativos já existentes no projeto para decidir o que reaproveitar. Para cada ativo, framework, bloco, gem, padrão, lógica ou conteúdo relevante, classifique em: A. ENTRA DIRETO B. ENTRA ADAPTADO C. ENTRA DEPOIS / BACKLOG D. NÃO ENTRA Critérios de entrada: - melhora clareza operacional - melhora qualidade metodológica real - melhora diferenciação - melhora qualidade do entregável - melhora prontidão de demo - melhora prontidão de piloto - reduz retrabalho - aumenta consistência sem inflar a arquitetura Critérios de exclusão: - duplicação de função - orquestração redundante - complexidade ornamental - camada que não muda o valor do MVP atual - generalização prematura - automação sem impacto real nesta semana - qualquer item que desalinhe com o Lean plan e com o done definition AVALIE EXPLICITAMENTE, NO MÍNIMO, ESTES TIPOS DE ATIVOS DA AUDITORIA: - mode router por profundidade e tipo de tarefa - falsification step - stage-adaptive horizons - crisis mode - document dependency graph - context pack antes de gerar entregáveis - estado epistêmico INCOMPLETO - design tokens / consistência visual - validation gate antes de enviar ao Linear Mas não assuma que tudo entra. Decida com critério, sempre priorizando o MVP desta semana. ETAPA 3 — DEFINIR O DELTA DO PROJETO Defina o delta entre o estado atual e o estado desejado: - o que manter - o que adaptar - o que remover - o que adicionar - o que mover para backlog - o que deve virar arquivo auxiliar - o que deve permanecer no núcleo - o que não deve entrar nesta versão IMPORTANTE A skill final NÃO deve tentar virar: - consultor universal - orquestrador genérico de tudo - suíte inteira em uma skill só - sistema enterprise antes da hora Ela deve continuar sendo: - uma skill premium - clara no propósito - orientada ao caso Sebrae / consultoria PME / validação - com rigor suficiente para impressionar sem parecer overbuilt - enxuta no núcleo e mais profunda apenas onde isso muda o valor do MVP ETAPA 4 — PRODUZIR A INSTRUÇÃO FINAL DE BUILD Com base em tudo acima, formule um prompt final de instrução para Claude Code gerar a versão final da skill Sebrae. Esse prompt final deve: - ser completo e colável - explicar o objetivo final - citar a hierarquia de fontes - dizer o que entra e o que não entra - explicar quais reaproveitamentos foram aprovados - exigir arquitetura enxuta e premium - impedir overengineering - impedir duplicação de orquestração - exigir alinhamento com o MVP e o done definition - exigir saída em full directory skill - exigir que a build final fique pronta para demonstração, GitHub e evolução futura - exigir que arquivos auxiliares só sejam criados se tiverem função operacional real ETAPA 5 — GERAR CORPUS DOCUMENTAL LEVE Comprimir o projeto em um corpus documental leve e útil. Gerar exatamente estes documentos em plain text: 1. corpus_documental_leve.txt Função: explicar o que é o projeto, o escopo atual, o MVP, os ativos centrais, a lógica do build e o foco da semana 2. plano_operacional_semana.txt Função: listar em ordem de execução tudo que precisa ser feito nesta semana, com prioridade, dependências, checkpoints e critério de pronto 3. build_delta_skill_sebrae.txt Função: registrar o que foi mantido, adaptado, removido, adicionado e movido para backlog na skill Sebrae final 4. linear_pack.txt Função: transformar a execução da semana em estrutura operacional pronta para o project-cleaner ou para o Linear Deve conter: - projeto - épicos - tarefas - subtarefas - prioridades - labels - dependências - gates - done definitions - ordem de execução ETAPA 6 — PREPARAR ORGANIZAÇÃO FINAL DO PROJETO Estruture a saída final de modo que o projeto possa ser limpo, reorganizado e normalizado com facilidade. Não destrua conteúdo. Primeiro proponha a estrutura ideal. Depois entregue o pack já organizado. Ao final, deixe explícito o que deve ser passado ao project-cleaner para: - limpar redundância - organizar o projeto - normalizar nomes - agrupar por função - colocar o pacote desta semana no padrão correto para o Linear REGRAS DE EXECUÇÃO 1. Não reescreva tudo do zero se o projeto já possui bons ativos. 2. Reaproveite somente o que melhora o resultado final. 3. Premium não significa pesado. 4. Premium significa: - melhor julgamento - melhor método - melhor clareza - melhor consistência - melhor entregável 5. Toda camada precisa justificar sua existência. 6. Sempre separar: - fato / evidência - inferência - recomendação 7. Quando houver conflito entre sofisticação e prazo, o prazo vence. 8. Quando houver conflito entre completude e demonstrabilidade, a demonstrabilidade vence. 9. Não criar backlog infinito. 10. Não transformar o projeto em sistema enterprise antes da hora. 11. A resposta precisa ser útil para execução imediata. 12. Use linguagem objetiva, operacional e densa. 13. Evite floreio e análise genérica. 14. Preserve coerência entre objetivo, MVP, artefato final e plano operacional. 15. Use skill-creator como motor principal de refinamento e project-cleaner como motor final de organização operacional. FORMATO DE SAÍDA OBRIGATÓRIO Entregue exatamente nesta ordem: BLOCO 1 — BOTTOM LINE Máximo 12 linhas. Dizer: - foco real do ciclo - estratégia correta - principais reaproveitamentos aprovados - principais exclusões BLOCO 2 — MAPA DE FONTES Tabela plain text: ARQUIVO | PAPEL | PRIORIDADE | COMO USAR BLOCO 3 — MATRIZ DE REAPROVEITAMENTO Tabela plain text: ORIGEM | ATIVO | CLASSIFICAÇÃO | MOTIVO | IMPACTO BLOCO 4 — DELTA DO PROJETO Tabela plain text: MANTER | ADAPTAR | REMOVER | ADICIONAR | BACKLOG BLOCO 5 — PROMPT FINAL DE BUILD Entregar um prompt único, completo, pronto para colar no Claude Code BLOCO 6 — CORPUS DOCUMENTAL LEVE Entregar os 4 documentos pedidos já redigidos: - corpus_documental_leve.txt - plano_operacional_semana.txt - build_delta_skill_sebrae.txt - linear_pack.txt BLOCO 7 — CHECKLIST FINAL Checklist curto, realista e ordenado BLOCO 8 — RISCOS ABERTOS Listar apenas riscos relevantes do ciclo atual com mitigação CRITÉRIO DE QUALIDADE FINAL A resposta só está correta se: - usar o Lean plan como âncora real - tratar a auditoria como filtro de reuso, não como convite para inflar o projeto - gerar um prompt final forte e utilizável para Claude Code - gerar corpus leve realmente útil - organizar a semana em ordem executável - deixar claro o que fazer agora - reduzir ruído do projeto em vez de aumentá-lo - preparar o projeto para o project-cleaner e para o Linear META FINAL Ao terminar, eu devo ter: 1. direção clara 2. instrução final de build da skill Sebrae 3. corpus documental leve 4. linear pack pronto 5. projeto mais limpo, coerente e executável\n\n### Arquivos\n\n2% da capacidade do projeto utilizada\n\n### **Lean plan **\n\n- 515 linhas\n\n- TEXT\n\n### **Readme-Skill**\n\n- 22 linhas\n\n- TEXT\n\n### **Proposta da skill **\n\n- 228 linhas\n\n- TEXT\n\n### **Plano de ação **\n\n- 708 linhas\n\n- TEXT\n\n### **║ CONSULTING SKILL SUITE — FULL DIRECTORY SPECIFICATION ║**\n\n- 783 linhas\n\n- TEXT\n\n### **║ ANATOMIA COMPLETA — CONSULTORIA PME — GRAFOS DE DEPENDÊNCIA ║**\n\n- 432 linhas\n\n- TEXT\n\n## Plano de ação \n\n40.09 KB •708 linhasA formatação pode estar inconsistente com a fonte\n\n╔══════════════════════════════════════════════════════════════════════════════════════╗\n\n║   PLANO DE AÇÃO\n\nGRAFOS DE DEPENDÊNCIA            ║\n\n╚══════════════════════════════════════════════════════════════════════════════════╝\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nGRAFO 1 — CADEIA MESTRE DE FASES (ordem e bloqueios)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n[CONTRATO ASSINADO]\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: escopo assinado por ambos os lados\n\n│  F1 · KICKOFF       │ ──────────────────────────────────────────────\n\n│  & ESCOPO           │   sem isso → F2 NÃO ABRE\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: relatório de diagnóstico aprovado pelo cliente\n\n│  F2 · DIAGNÓSTICO   │ ──────────────────────────────────────────────\n\n│  AS-IS              │   sem isso → F3 NÃO ABRE\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: cliente valida direção estratégica\n\n│  F3 · DESIGN        │ ──────────────────────────────────────────────\n\n│  TO-BE              │   sem isso → F4 NÃO ABRE\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: plano aprovado + recursos alocados pelo cliente\n\n│  F4 · PLANO DE      │ ──────────────────────────────────────────────\n\n│  IMPLEMENTAÇÃO      │   sem recursos → F5 TRAVA\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: steering semanal ativo com sponsor do cliente\n\n│  F5 · EXECUÇÃO      │ ──────────────────────────────────────────────\n\n│  & SPRINTS          │   sem sponsor → escopo deriva silenciosamente\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: KPIs atingidos ou desvio formalmente documentado\n\n│  F6 · VALIDAÇÃO     │ ──────────────────────────────────────────────\n\n│  & QA               │   sem baseline de KPI definido em F1 → F6 é cega\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: cliente confirma recebimento e capacidade operacional\n\n│  F7 · HANDOVER      │ ──────────────────────────────────────────────\n\n│  & KNOWLEDGE        │   sem isso → cliente depende do consultor para sempre\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n┌─────────────────────┐   GATE: NPS coletado + oportunidade de expansão mapeada\n\n│  F8 · FOLLOW-UP     │ ──────────────────────────────────────────────\n\n│  & EXPANSÃO         │   sem isso → receita some, indicação não acontece\n\n└─────────────────────┘\n\n        │\n\n        ▼\n\n[RENOVAÇÃO / EXPANSÃO / INDICAÇÃO]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nGRAFO 2 — DEPENDÊNCIAS INTERNAS DE CADA FASE\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nF1 · KICKOFF & ESCOPO\n\n─────────────────────────────────────────────────────────\n\n  [Contrato assinado]\n\n        ├──► Reunião de kickoff (consultor + decisor PME)\n\n        │         └──► Alinhamento de expectativas\n\n        │                   └──► SOW detalhado\n\n        ├──► Mapeamento de stakeholders\n\n        │         └──► Matriz RACI\n\n        │                   └──► Define quem aprova cada gate\n\n        ├──► Definição de KPIs baseline\n\n        │         └──► Métricas de sucesso acordadas\n\n        │                   └──► Alimenta F6 (validação)\n\n        └──► Cronograma macro\n\n                  └──► Marcos e prazos por fase\n\n                            └──► Alimenta F4 (plano)\n\nF2 · DIAGNÓSTICO AS-IS\n\n─────────────────────────────────────────────────────────\n\n  [SOW + RACI + KPI baseline de F1]\n\n        ├──► Coleta de dados primários\n\n","stderr":""}
Now I have all the source material. Let me build the full professional HTML workbook.
File created successfully: /home/claude/bussola_pme_workbook.html
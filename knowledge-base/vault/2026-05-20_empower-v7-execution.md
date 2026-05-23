---
title: "Empower v7 execution"
date: 2026-05-20
account: joao.studartmaia@gmail.com
uuid: 300999ea-727c-4789-a5fe-4f39ac855fb1
messages: 6
tags: []
context: ""
---

**Você** _2026-05-20_

/empower-v7 run

---

**Claude** _2026-05-20_

1	---
     2	name: empower-v7
     3	version: 7.0.0
     4	description: |
     5	  Use SEMPRE quando o usuário quiser auditar seu uso do Claude, medir performance,
     6	  comparar práticas com o gold standard Anthropic, gerar personalização de conta,
     7	  ou entender como está usando IA no trabalho real.
     8	
     9	  Gatilhos explícitos: "empower", "meta-análise", "auditar conversas",
    10	  "como estou usando Claude", "minha performance com Claude",
    11	  "benchmark", "estou acima da média", "personalização de conta",
    12	  "questionário de uso", "skill performance", "analyze my conversations",
    13	  "audit my Claude usage", "am I above average", "gerar perfil",
    14	  "dashboard de uso", "meu nível com Claude"
    15	
    16	  NÃO usar para: análise de código, criação de documentos, pesquisas externas,
    17	  tarefas que não envolvam avaliação do próprio uso do Claude pelo usuário.
    18	
    19	  ICP: qualquer usuário Claude (Free/Pro/Max) que quer melhorar seu desempenho
    20	  com IA — consultores, pesquisadores, educadores, desenvolvedores, criadores.
    21	
    22	compatibility:
    23	  tools:
    24	    - bash_tool
    25	    - create_file
    26	    - view
    27	    - str_replace
    28	    - present_files
    29	  integrations:
    30	    - frontend-design
    31	    - cognitive-framework-router
    32	    - skill-creator
    33	---
    34	
    35	# EMPOWER V7 · AI Usage Validation & Growth Engine
    36	
    37	## QUANDO USAR
    38	
    39	### Gatilhos Explícitos
    40	- "empower" / "meta-análise" / "auditar conversas" / "questionário de uso"
    41	- "como estou usando Claude" / "minha performance" / "meu nível com Claude"
    42	- "benchmark" / "estou acima da média" / "am I above average"
    43	- "personalização de conta" / "gerar perfil de uso" / "dashboard de uso"
    44	- "analyze my conversations" / "audit my Claude usage"
    45	
    46	### Gatilhos Contextuais
    47	- Usuário enviou export de conversas Claude (.json/.zip/.csv)
    48	- Usuário quer saber se está "usando Claude certo"
    49	- Usuário quer gerar prompt de personalização para sua conta
    50	- Usuário quer comparar seu uso com boas práticas
    51	
    52	### NÃO Usar Para
    53	- Criação de documentos, código, pesquisas externas
    54	- Qualquer tarefa que não seja avaliação do próprio uso do Claude
    55	- Análise de uso de outras IAs (escopo: Claude apenas)
    56	
    57	---
    58	
    59	## WORKFLOW CANÔNICO
    60	
    61	```
    62	INPUT ──────────────────────────────────────────────────
    63	  Export de conversas  →  MODE A (Conversation Audit)
    64	  Sem export           →  MODE B (Guided Questionnaire)
    65	  
    66	FASE 1 — DETECT MODE
    67	  ├─ Arquivo(s) enviado(s)?  →  MODE A
    68	  └─ Sem arquivo            →  MODE B → render questionnaire inline
    69	
    70	FASE 2 — INGEST & NORMALIZE  [MODE A only]
    71	  ├─ Parse export (JSON/JSONL/CSV/ZIP)
    72	  ├─ Normalize to canonical V7 schema
    73	  ├─ Redact PII before any analysis
    74	  └─ Cynefin-classify each interaction (batch LLM call)
    75	
    76	FASE 3 — SCORE (7 dimensions)
    77	  ├─ D1 Delegation      [AI Fluency]
    78	  ├─ D2 Description     [AI Fluency + 21 Anthropic GPs]
    79	  ├─ D3 Discernment     [AI Fluency]
    80	  ├─ D4 Diligence       [AI Fluency + AI Act literacy]
    81	  ├─ P1 Personalization [Claude feature stack]
    82	  ├─ W1 Workflow        [Empower maturity rubric]
    83	  └─ G1 Governance      [AI Act Article 4 literacy-aligned]
    84	
    85	FASE 4 — BENCHMARK (external anchor — MANDATORY)
    86	  ├─ Map user score to 5-level benchmark:
    87	  │   Novice (20–35%) → Developing (36–55%) → Proficient (56–70%)
    88	  │   Advanced (71–85%) → Expert (86–100%)
    89	  ├─ Compute percentile vs anchor population
    90	  └─ Identify "biggest gap to next level"
    91	
    92	FASE 5 — GENERATE INLINE DASHBOARD
    93	  ├─ Render interactive HTML/SVG artifact
    94	  ├─ Header metrics: Alignment Index, Level, Benchmark %, Top Gap
    95	  ├─ Radar chart: 7 dimensions vs benchmark level
    96	  ├─ WITH/WITHOUT comparison charts (per Cynefin domain)
    97	  ├─ Dimension cards with evidence + next action
    98	  └─ Personalization prescription at bottom
    99	
   100	FASE 6 — DELIVERABLES
   101	  ├─ E-001 Inline dashboard (HTML/SVG)  ← PRIMARY
   102	  ├─ E-002 Executive summary (Markdown)
   103	  ├─ E-003 Personalization prompt (profile + style + project)
   104	  ├─ E-004 Command library (XLSX — reutilizable workflows)
   105	  └─ E-005 Redaction log (CSV)
   106	
   107	FASE 7 — #META-REGENERATION
   108	  └─ Emit inline JSON v7.0 → BACKLOG.md append in Drive
   109	```
   110	
   111	---
   112	
   113	## SCORING SYSTEM
   114	
   115	### Dimensões e Pesos
   116	
   117	| ID | Dimensão | Framework | Max pts | Peso |
   118	|----|----------|-----------|---------|------|
   119	| D1 | Delegation | AI Fluency | 40 | 15% |
   120	| D2 | Description | AI Fluency + 21 GPs | 40 | 25% |
   121	| D3 | Discernment | AI Fluency | 40 | 20% |
   122	| D4 | Diligence | AI Fluency | 40 | 15% |
   123	| P1 | Personalization | Claude stack | 40 | 10% |
   124	| W1 | Workflow | Empower rubric | 40 | 10% |
   125	| G1 | Governance | AI Act literacy | 40 | 5% |
   126	
   127	**Alignment Index** = weighted average of 7 dimensions, normalized 0–100%
   128	
   129	### Benchmark Anchors (External — NOT internal comparison)
   130	
   131	| Level | Score | Profile description |
   132	|-------|-------|---------------------|
   133	| **Novice** | 20–35% | Conversational use, no skills, generic prompts |
   134	| **Developing** | 36–55% | Aware of practices, inconsistent application |
   135	| **Proficient** | 56–70% | Regular structure, some XML, basic workflow |
   136	| **Advanced** | 71–85% | Full skill suite, systematic prompting, measurable ROI |
   137	| **Expert** | 86–100% | All 7 dimensions optimized, complete personalization |
   138	
   139	Source: Anthropic AI Fluency course + prompting best practices docs
   140	
   141	---
   142	
   143	## MODE B — QUESTIONNAIRE STRUCTURE
   144	
   145	6 sections (like SkillForge multi-step form):
   146	
   147	1. **Identidade** — role, experience, primary use cases
   148	2. **Delegação** — what you ask Claude to do
   149	3. **Estrutura** — how you write prompts
   150	4. **Discernimento** — how you validate outputs
   151	5. **Personalização** — Claude features you use
   152	6. **Objetivos** — what you want to improve
   153	
   154	Each section generates inferred scores per dimension.
   155	After step 6 → generate full inline dashboard from inferred data.
   156	Confidence label: "inferred (Mode B)" in all outputs.
   157	
   158	---
   159	
   160	## REFERÊNCIAS
   161	
   162	Consultar progressivamente — não carregar tudo de uma vez:
   163	
   164	| Arquivo | Propósito | Quando ler |
   165	|---------|-----------|------------|
   166	| `references/anthropic-gold-standard-v1.md` | 21 GPs operacionalizados | Fase 3 (scoring D2) |
   167	| `references/ai-fluency-4d-matrix.md` | Rubrica D1–D4 | Fase 3 (scoring D1-D4) |
   168	| `references/benchmark-anchors.md` | Anchor levels + percentis | Fase 4 (benchmark) |
   169	| `references/personalization-stack.md` | Layers P1 | Fase 3 + Fase 6 (E-003) |
   170	| `references/privacy-redaction.md` | PII detection rules | Fase 2 (normalize) |
   171	| `templates/dashboard-template.html` | Layout dashboard inline | Fase 5 |
   172	| `templates/questionnaire-template.html` | Mode B form | Fase 1 (Mode B) |
   173	| `scripts/score_dimensions.py` | Scoring engine | Fase 3 |
   174	| `scripts/compute_benchmark.py` | External anchor calc | Fase 4 |
   175	
   176	---
   177	
   178	## LANGUAGE RULES
   179	
   180	- NUNCA usar: "AI Act compliant", "Anthropic-approved", "certified"
   181	- SEMPRE usar: "Anthropic-aligned", "AI Act Article 4 literacy-aligned"
   182	- Todos os claims com evidência citada (URL ou fonte)
   183	- Mode B outputs: marcar como "inferred — Mode B" (não "measured")
   184	- PII redactada antes de qualquer output compartilhável
   185	
{"returncode":0,"stdout":"Archive:  data-2a8cf11a-c40a-41cc-b6e6-954ee9609c01-1779316133-709f1dd9-batch-0000.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n      153  2026-05-20 22:28   users.json\n   784594  2026-05-20 22:28   projects/019e2215-9463-76fa-8328-21aece267667.json\n   244387  2026-05-20 22:28   projects/019e2bc5-b794-74c6-9a3b-08909f029404.json\n  1276797  2026-05-20 22:28   conversations.json\n---------                     -------\n  2305931                     4 files\n","stderr":""}
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/data-2a8cf11a-c40a-41cc-b6e6-954ee9609c01-1779316133-709f1dd9-batch-0000.zip\n  inflating: users.json              \n  inflating: projects/019e2215-9463-76fa-8328-21aece267667.json  \n  inflating: projects/019e2bc5-b794-74c6-9a3b-08909f029404.json  \n  inflating: conversations.json      \n","stderr":""}
{"returncode":0,"stdout":"=== users.json ===\n[{\"uuid\": \"a18af1a4-b208-4cf7-b9a4-e84934f09c8a\", \"full_name\": \"Leoanrdo\", \"email_address\": \"joao.studartmaia@gmail.com\", \"verified_phone_number\": null}]-e \n=== conversations.json (first 2000 chars) ===\n[{\"uuid\": \"23a1cd1e-6e3e-49d3-82fd-cc1094195089\", \"name\": \"Operating and scanning MECE files\", \"summary\": \"\", \"created_at\": \"2026-05-13T16:12:02.435397Z\", \"updated_at\": \"2026-05-13T16:17:59.515127Z\", \"account\": {\"uuid\": \"a18af1a4-b208-4cf7-b9a4-e84934f09c8a\"}, \"chat_messages\": [{\"uuid\": \"019e221c-04b1-715e-a2ac-75d7430317e7\", \"text\": \"Explain me in 400 worlds how to operate ? first scan mece files\", \"content\": [{\"start_timestamp\": \"2026-05-13T16:12:03.047941Z\", \"stop_timestamp\": \"2026-05-13T16:12:03.047941Z\", \"flags\": null, \"type\": \"text\", \"text\": \"Explain me in 400 worlds how to operate ? first scan mece files\", \"citations\": []}], \"sender\": \"human\", \"created_at\": \"2026-05-13T16:12:03.048093Z\", \"updated_at\": \"2026-05-13T16:12:03.048093Z\", \"attachments\": [], \"files\": [], \"parent_message_uuid\": \"00000000-0000-4000-8000-000000000000\"}, {\"uuid\": \"019e221c-04b1-7fab-961c-7c7f234492e4\", \"text\": \" # How to Operate the ID Taxonomy System\\n\\n## Quick Start (5 Steps)\\n\\n**1. Understanding What You Have**\\nYou have a complete file management system with 21 project files organized in a searchable database. Each file has a unique 3-digit ID (001-021). The system uses CMD-style queries to retrieve, bundle, and manipulate files.\\n\\n**2. Finding Files (MECE Scan)**\\nOpen `PROJECT_TAXONOMY_DATABASE.xlsx` and go to the **DATABASE** sheet. Use Excel filters to scan files by:\\n- **Extension**: .md, .pdf, .txt, .html\\n- **Classification**: CANONICAL (keep) vs DUPLICATE (archive)\\n- **Size**: Character count to find large/small files\\n- **Type**: TEXT, PDF, HTML groups\\n\\nClick any column header dropdown \\u2192 filter \\u2192 note the IDs that match your criteria.\\n\\n**3. Building Queries**\\nOnce you identify target files, construct CMD queries:\\n- Single file: `GET --id 001`\\n- Multiple files: `GET --id 001,005,010`\\n- Search by name: `SEARCH --filename \\\"editorial\\\"`\\n- Package files: `BUNDLE --ids 001,005,010 --format docx --title \\\"My Package\\\"`\\n\\n**4. Executing Requests**\\nSend your","stderr":""}
{"returncode":0,"stdout":"User: Leoanrdo (joao.studartmaia@gmail.com)\nTotal conversations: 9\n\nTotal messages: 44\nHuman messages: 23\nAI messages: 21\nMessages with attachments: 0\n\nAvg human prompt length: 270 chars\nAvg AI response length: 5576 chars\n\nStructured prompting usage:\n  XML tags: 0 prompts\n  Markdown headings: 2 prompts\n  Code blocks: 0 prompts\n\nCynefin domain distribution:\n  Obvious: 18 (78.3%)\n  Simple: 4 (17.4%)\n  Complicated: 1 (4.3%)\n\nTime span: 7 days\nFirst message: 2026-05-13\nLast message: 2026-05-20\n","stderr":""}
{"returncode":0,"stdout":"/mnt/skills/user/empower-v7/references/privacy-redaction.md\n/mnt/skills/user/empower-v7/references/benchmark-anchors.md\n/mnt/skills/user/empower-v7/references/ai-fluency-4d-matrix.md\n/mnt/skills/user/empower-v7/references/personalization-stack.md\n/mnt/skills/user/empower-v7/references/anthropic-gold-standard-v1.md\n/mnt/skills/user/empower-v7/SKILL.md\n/mnt/skills/user/empower-v7/README.md\n/mnt/skills/user/empower-v7/scripts/score_dimensions.py\n/mnt/skills/user/empower-v7/templates/questionnaire-template.html\n/mnt/skills/user/empower-v7/templates/dashboard-template.html\n/mnt/skills/user/empower-v7/CHANGELOG.md\n","stderr":""}
     1	# Benchmark Anchors V7 — External Comparable
     2	## "Am I above average?" — Mandatory External Reference
     3	## Empower V7 Core Reference
     4	
     5	---
     6	
     7	## WHY EXTERNAL BENCHMARKS ARE MANDATORY
     8	
     9	Without an external anchor, a score of 65% means nothing.
    10	With benchmarks: 65% = Proficient = top 35% of users globally.
    11	This answers the question every ICP asks: "Am I doing this right compared to others?"
    12	
    13	---
    14	
    15	## THE 5-LEVEL BENCHMARK SCALE
    16	
    17	### Level 1 — NOVICE (20–35%)
    18	
    19	**Profile:** Uses Claude conversationally, like a search engine or chatbot.
    20	Prompt style: 1–2 sentences, no context, no format specification.
    21	Typical use: Quick answers, content generation with minimal guidance.
    22	Skills installed: 0–2 (mostly platform defaults).
    23	Workflow: Ad-hoc, no reusable prompts.
    24	
    25	**Representative prompt pattern:**
    26	```
    27	"Escreva um email para meu cliente"
    28	"Resuma esse texto"
    29	"Qual é a capital da França?"
    30	```
    31	
    32	**Estimated % of Claude users at this level:** ~40%
    33	**Source calibration:** Anthropic AI Fluency course baseline data; internal research
    34	
    35	---
    36	
    37	### Level 2 — DEVELOPING (36–55%)
    38	
    39	**Profile:** Aware of prompt engineering concepts, inconsistent application.
    40	Prompt style: Provides some context; occasionally specifies format.
    41	Typical use: Work assistance, research summaries, writing drafts.
    42	Skills installed: 2–5. Uses some Projects.
    43	Workflow: Occasional reuse of successful prompts.
    44	
    45	**Representative prompt pattern:**
    46	```
    47	"Escreva um email profissional para meu cliente João sobre atraso na entrega.
    48	Tom: formal. 3 parágrafos."
    49	```
    50	
    51	**Estimated % of Claude users at this level:** ~35%
    52	
    53	---
    54	
    55	### Level 3 — PROFICIENT (56–70%)
    56	
    57	**Profile:** Regular structured use; some XML; basic workflow automation.
    58	Prompt style: Provides context + objective + format; occasionally uses examples.
    59	Typical use: Knowledge work, research synthesis, document creation.
    60	Skills installed: 5–10. Uses Projects consistently. Some custom skills.
    61	Workflow: Has reusable prompt templates; some CMD patterns.
    62	
    63	**Representative prompt pattern:**
    64	```
    65	<task>Analyze this client brief and extract key requirements</task>
    66	<context>I'm a consultant working on a UX audit. Client is a fintech startup.</context>
    67	<format>Bullet list, grouped by priority. Max 10 items.</format>
    68	[brief content]
    69	```
    70	
    71	**Estimated % of Claude users at this level:** ~18%
    72	**Note:** This is where most "advanced" self-identified users actually land.
    73	
    74	---
    75	
    76	### Level 4 — ADVANCED (71–85%)
    77	
    78	**Profile:** Systematic application; full skill suite; measurable ROI.
    79	Prompt style: Full GP compliance; XML structure; examples; context; verification.
    80	Typical use: Complex professional workflows; multi-session projects; team use.
    81	Skills installed: 10+ with custom skills. Full personalization stack active.
    82	Workflow: CMD taxonomy; reusable skills; measurable time savings.
    83	
    84	**Representative prompt pattern:**
    85	```
    86	<role>You are a senior consultant analyzing a market entry strategy.</role>
    87	<context>Client: B2B SaaS, entering Brazilian market. Stage: pre-launch.</context>
    88	<task>Analyze the three risks in the attached brief. For each risk:
    89	  1. Likelihood (High/Med/Low) with evidence
    90	  2. Impact if materializes
    91	  3. One mitigation action</task>
    92	<examples>
    93	  <example>Risk: Regulatory compliance → Likelihood: High (LGPD) → Impact: Launch delay 3mo → Mitigation: Pre-engage DPA</example>
    94	</examples>
    95	<output_format>Table: Risk | Likelihood | Impact | Mitigation</output_format>
    96	Before finalizing, verify each risk rating against the provided brief.
    97	```
    98	
    99	**Estimated % of Claude users at this level:** ~6%
   100	
   101	---
   102	
   103	### Level 5 — EXPERT (86–100%)
   104	
   105	**Profile:** All 7 dimensions optimized; complete personalization; publication-ready methodology.
   106	Prompt style: All 21 GPs applied consistently; Cynefin-aware (different prompts for different task types).
   107	Typical use: AI-native professional practice; teaching others; skill development.
   108	Skills installed: Full custom library; CMD system; collector + meta-regeneration.
   109	Workflow: Self-updating skills; Drive persistence; systematic improvement loop.
   110	
   111	**Estimated % of Claude users at this level:** ~1%
   112	**Note:** This level requires months of deliberate practice.
   113	
   114	---
   115	
   116	## BENCHMARK TABLE SUMMARY
   117	
   118	| Level | Score | Est. % users | "Am I above average?" answer |
   119	|-------|-------|-------------|------------------------------|
   120	| Novice | 20–35% | ~40% | Below average |
   121	| Developing | 36–55% | ~35% | Below average |
   122	| Proficient | 56–70% | ~18% | **Above average** |
   123	| Advanced | 71–85% | ~6% | **Top 7%** |
   124	| Expert | 86–100% | ~1% | **Top 1%** |
   125	
   126	**"Average" = ~45%** (weighted by distribution)
   127	**Proficient threshold = top 24%** of users
   128	
   129	---
   130	
   131	## PER-DIMENSION BENCHMARKS
   132	
   133	Each of the 7 dimensions has its own average:
   134	
   135	| Dimension | Average user score | Typical gap |
   136	|-----------|--------------------|-------------|
   137	| D1 Delegation | 55% | Low (intuitive) |
   138	| D2 Description | 38% | HIGH (biggest gap) |
   139	| D3 Discernment | 42% | High |
   140	| D4 Diligence | 35% | Very high |
   141	| P1 Personalization | 28% | Very high (most users don't configure accounts) |
   142	| W1 Workflow | 25% | Extreme (almost no casual users have workflows) |
   143	| G1 Governance | 20% | Extreme |
   144	
   145	**Key insight:** D1 (Delegation) is where users are strongest. W1, G1, P1 are where almost everyone is weakest. This guides prescriptions.
   146	
   147	---
   148	
   149	## CALIBRATION NOTES
   150	
   151	These benchmarks are calibrated from:
   152	1. Anthropic AI Fluency course learner data patterns
   153	2. Empower V4 multi-account dataset (Leo's 8 accounts, 18 months)
   154	3. Published research on LLM user behavior (Stanford HAI, 2024)
   155	4. Anthropic's own prompt engineering research
   156	
   157	**Limitation:** No formal random-sample population study exists yet.
   158	These are well-reasoned calibration estimates, not controlled research.
   159	All outputs should note: "Benchmark estimates based on expert calibration"
   160	
   161	---
   162	
   163	## UPDATE PROTOCOL
   164	
   165	Re-calibrate benchmarks when:
   166	- N > 100 Empower V7 runs available (upgrade to empirical data)
   167	- Anthropic publishes new research on user behavior patterns
   168	- Major model capability shift (new Claude major version)
   169	
     1	# AI Fluency 4D Matrix — Scoring Rubric
     2	## Source: Anthropic AI Fluency Course (CC BY-NC-SA 4.0)
     3	## Operacionalized for Empower V7
     4	
     5	---
     6	
     7	## THE 4Ds FRAMEWORK
     8	
     9	Anthropic's AI Fluency course defines 4 dimensions of effective AI use.
    10	Each dimension is observable in conversation patterns.
    11	
    12	---
    13	
    14	## D1 — DELEGATION (15% weight, max 40 pts)
    15	
    16	**What it measures:** Does the user know WHAT to delegate to Claude vs what to do manually?
    17	
    18	| Score | Evidence |
    19	|-------|----------|
    20	| 35–40 | Tasks delegated match Claude strengths; user retains judgment/ethics/final decision |
    21	| 25–34 | Mostly appropriate delegation with occasional over/under-reliance |
    22	| 15–24 | Delegation appears ad-hoc; asks Claude for things it shouldn't decide OR doesn't use it for things it excels at |
    23	| 5–14  | Heavy over-reliance (delegates final decisions, values judgments) OR extreme under-use |
    24	| 0–4   | Cannot be assessed from available data |
    25	
    26	**Detection signals:**
    27	- Over-delegation: "what should I decide?", "is this ethical?", asks for personal advice without context
    28	- Under-delegation: manual tasks visible in conversation that Claude could handle
    29	- Good delegation: well-scoped tasks, user reviews outputs, maintains human judgment
    30	
    31	---
    32	
    33	## D2 — DESCRIPTION (25% weight, max 40 pts)
    34	
    35	**What it measures:** Do prompts contain sufficient context, objective, constraints, format?
    36	
    37	Combines AI Fluency Description dimension + all 21 Anthropic GPs (see anthropic-gold-standard-v1.md)
    38	
    39	| Score | Evidence |
    40	|-------|----------|
    41	| 35–40 | Prompts routinely include: objective + context + constraints + format; examples used; XML structure present |
    42	| 25–34 | Most elements present but inconsistent; some prompts under-specified |
    43	| 15–24 | Context often missing; format rarely specified; no examples |
    44	| 5–14  | Prompts are 1–2 sentences with minimal context |
    45	| 0–4   | Cannot be assessed |
    46	
    47	**Sub-scores:** Sum of GP categories A+B+C+D+E (normalized to 40 pts)
    48	
    49	---
    50	
    51	## D3 — DISCERNMENT (20% weight, max 40 pts)
    52	
    53	**What it measures:** Does the user validate, compare, correct, and demand evidence from Claude?
    54	
    55	| Score | Evidence |
    56	|-------|----------|
    57	| 35–40 | Regularly cross-checks outputs; asks for sources/evidence; corrects errors; compares alternatives |
    58	| 25–34 | Occasional validation; sometimes pushes back; accepts most outputs without deep check |
    59	| 15–24 | Rarely validates; takes outputs at face value; doesn't request evidence |
    60	| 5–14  | No visible validation behavior |
    61	| 0–4   | Cannot be assessed |
    62	
    63	**Detection signals:**
    64	- Positive: "can you verify that?", "what's your source?", "that seems wrong because...", follow-up corrections
    65	- Positive: asks Claude to self-check, uses GP-F1 and GP-F2
    66	- Negative: immediately uses output without any review signal
    67	- Negative: never modifies Claude's suggestions
    68	
    69	---
    70	
    71	## D4 — DILIGENCE (15% weight, max 40 pts)
    72	
    73	**What it measures:** Does the user treat risk, privacy, responsibility, and impact?
    74	
    75	Aligned with AI Act Article 4 literacy: knowledge, experience, context, risk, affected persons.
    76	
    77	| Score | Evidence |
    78	|-------|----------|
    79	| 35–40 | Explicitly considers privacy, risk, impact; treats sensitive data carefully; maintains human accountability |
    80	| 25–34 | Occasional risk awareness; some privacy consideration; mostly accountable use |
    81	| 15–24 | Limited risk framing; PII shared without apparent concern; outsources accountability |
    82	| 5–14  | No visible risk or responsibility awareness |
    83	| 0–4   | Cannot be assessed |
    84	
    85	**Detection signals:**
    86	- Positive: redacts personal data before sending; asks "what are the risks?"; maintains audit trail
    87	- Positive: explicitly notes "I'll verify this before acting"; doesn't use Claude for final legal/medical decisions
    88	- Negative: shares sensitive PII freely; uses Claude outputs without review for high-stakes decisions
    89	- Negative: no redaction awareness
    90	
    91	---
    92	
    93	## COMPOSITE FORMULA
    94	
    95	```
    96	D_score_raw = (D1_pts × 0.15) + (D2_pts × 0.25) + (D3_pts × 0.20) + (D4_pts × 0.15)
    97	            + (P1_pts × 0.10) + (W1_pts × 0.10) + (G1_pts × 0.05)
    98	
    99	alignment_index = (D_score_raw / 40) × 100  # normalized 0–100%
   100	```
[115 lines total]
{"returncode":1,"stdout":"============================================================\nEMPOWER V7 ANALYSIS REPORT\n============================================================\n\nUser: Leoanrdo (joao.studartmaia@gmail.com)\nReport generated: 2026-05-20 22:31:23\n\n============================================================\n7D SCORES (max 40 pts each)\n============================================================\nD1_Delegation       : 25/40 ( 62.5%) [████████████░░░░░░░░]\n","stderr":"Traceback (most recent call last):\n  File \"<stdin>\", line 271, in <module>\nValueError: Unknown format code 'd' for object of type 'float'\n"}
{"returncode":0,"stdout":"============================================================\nEMPOWER V7 ANALYSIS REPORT\n============================================================\n\nUser: Leoanrdo (joao.studartmaia@gmail.com)\nReport generated: 2026-05-20 22:31:49\n\n============================================================\n7D SCORES (max 40 pts each)\n============================================================\nD1_Delegation       : 25/40 ( 62.5%) [████████████░░░░░░░░]\nD2_Description      : 15/40 ( 37.5%) [███████░░░░░░░░░░░░░]\nD3_Discernment      : 20/40 ( 50.0%) [██████████░░░░░░░░░░]\nD4_Diligence        : 12/40 ( 30.0%) [██████░░░░░░░░░░░░░░]\nP1_Personalization  : 20/40 ( 50.0%) [██████████░░░░░░░░░░]\nW1_Workflow         : 16/40 ( 40.0%) [████████░░░░░░░░░░░░]\nG1_Governance       : 18/40 ( 45.0%) [█████████░░░░░░░░░░░]\n\n============================================================\nALIGNMENT INDEX\n============================================================\nOverall Score: 44.5%\nLevel: Developing\nBenchmark: Below average\n\nProfile: Aware of prompt engineering, inconsistent application\n\n============================================================\nMETADATA\n============================================================\ntotal_conversations: 9\ntotal_messages: 44\nhuman_messages: 23\nai_messages: 0\navg_prompt_length: 270\n\n✓ Results saved to /home/claude/empower_results.json\n","stderr":""}

---

**Você** _2026-05-20_

Svg online graphs

---

**Claude** _2026-05-20_

I'll create the interactive dashboard with SVG visualizations for your empower analysis.
     1	<!DOCTYPE html>
     2	<html lang="pt-BR">
     3	<head>
     4	<meta charset="UTF-8">
     5	<meta name="viewport" content="width=device-width, initial-scale=1.0">
     6	<title>Empower V7 — AI Usage Dashboard</title>
     7	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css">
     8	<style>
     9	  /* ─── DESIGN TOKENS ─────────────────────────────────── */
    10	  :root {
    11	    --bg: #0d0f12;
    12	    --bg2: #13161b;
    13	    --bg3: #1a1e25;
    14	    --border: rgba(255,255,255,0.06);
    15	    --border-active: rgba(255,255,255,0.15);
    16	    --text: #e8eaf0;
    17	    --text2: #8a8fa8;
    18	    --text3: #555870;
    19	    --accent: #4ade80;       /* green — score positive */
    20	    --accent2: #60a5fa;      /* blue — benchmark */
    21	    --accent3: #f59e0b;      /* amber — gap/warning */
    22	    --accent4: #a78bfa;      /* violet — expert */
    23	    --danger: #f87171;
    24	    --font-sans: 'DM Sans', 'IBM Plex Sans', system-ui, sans-serif;
    25	    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
    26	    --r: 10px;
    27	    --r-sm: 6px;
    28	  }
    29	
    30	  /* ─── GOOGLE FONTS ──────────────────────────────────── */
    31	  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600&family=JetBrains+Mono:wght@400;500&display=swap');
    32	
    33	  * { box-sizing: border-box; margin: 0; padding: 0; }
    34	
    35	  body {
    36	    background: var(--bg);
    37	    color: var(--text);
    38	    font-family: var(--font-sans);
    39	    font-size: 14px;
    40	    line-height: 1.6;
    41	    min-height: 100vh;
    42	    padding: 24px;
    43	  }
    44	
    45	  /* ─── LAYOUT ────────────────────────────────────────── */
    46	  .container { max-width: 960px; margin: 0 auto; }
    47	
    48	  /* ─── HEADER ─────────────────────────────────────────── */
    49	  .header {
    50	    display: flex;
    51	    align-items: center;
    52	    gap: 12px;
    53	    margin-bottom: 28px;
    54	    padding-bottom: 20px;
    55	    border-bottom: 1px solid var(--border);
    56	  }
    57	  .logo-mark {
    58	    width: 36px; height: 36px;
    59	    background: linear-gradient(135deg, #4ade80 0%, #60a5fa 100%);
    60	    border-radius: 8px;
    61	    display: flex; align-items: center; justify-content: center;
    62	    font-size: 16px;
    63	  }
    64	  .header-text h1 { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
    65	  .header-text p { font-size: 12px; color: var(--text2); }
    66	  .header-badge {
    67	    margin-left: auto;
    68	    font-size: 11px;
    69	    font-family: var(--font-mono);
    70	    padding: 4px 10px;
    71	    border-radius: 20px;
    72	    border: 1px solid var(--border-active);
    73	    color: var(--text2);
    74	  }
    75	
    76	  /* ─── STAT CARDS ROW ─────────────────────────────────── */
    77	  .stats-row {
    78	    display: grid;
    79	    grid-template-columns: repeat(4, 1fr);
    80	    gap: 12px;
    81	    margin-bottom: 20px;
    82	  }
    83	  .stat-card {
    84	    background: var(--bg2);
    85	    border: 1px solid var(--border);
    86	    border-radius: var(--r);
    87	    padding: 16px;
    88	    transition: border-color 0.2s;
    89	  }
    90	  .stat-card:hover { border-color: var(--border-active); }
    91	  .stat-label {
    92	    font-size: 11px; font-weight: 500;
    93	    letter-spacing: 0.05em; text-transform: uppercase;
    94	    color: var(--text3); margin-bottom: 8px;
    95	  }
    96	  .stat-value {
    97	    font-size: 28px; font-weight: 600;
    98	    letter-spacing: -0.03em; line-height: 1;
    99	  }
   100	  .stat-value.green { color: var(--accent); }
[704 lines total]
{"returncode":0,"stdout":"User points: 200.0,112.5 241.0,167.3 268.2,215.6 218.2,237.8 169.6,263.1 145.4,212.5 150.7,160.7\nBenchmark points: 200.0,7.5 304.0,117.1 343.3,232.7 253.2,310.4 157.5,288.3 114.7,219.5 145.3,156.4\n\nBiggest gap: D1_Delegation (75.0% below benchmark)\n","stderr":""}

---

**Você** _2026-05-20_

In line widge

---

**Claude** _2026-05-20_

I'll create the interactive dashboard as an inline widget with your scores and visualizations.
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
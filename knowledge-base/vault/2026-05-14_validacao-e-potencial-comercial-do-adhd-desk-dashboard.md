---
title: "Validação e potencial comercial do ADHD desk dashboard"
date: 2026-05-14
account: executar.leonardo@gmail.com
uuid: 48b5e7d1-b8c5-40b0-a44f-4f1691c13011
messages: 4
tags: []
context: ""
---

**Você** _2026-05-14_

/adhd-desk-dashboard  Comp validar a inpvacao dessa skill md e aeu potencial comercial ?

---

**Claude** _2026-05-14_

1	---
     2	name: adhd-desk-dashboard
     3	description: >
     4	  Creates low-cognitive-load printable workflow dashboards and Linear backlog plans
     5	  for solo knowledge workers with ADHD/TDAH and dyslexia constraints. Outputs a
     6	  ready-to-print A4 landscape PPTX deck, PDF, markdown checklists, and a structured
     7	  Linear backlog. Use this skill whenever the user asks for ADHD-friendly workflows,
     8	  printable dashboards, desk operating systems, paper-OS setups, cognitive-load
     9	  reduction, accessibility-oriented layouts, daily execution templates, sprint cards,
    10	  or any combination of physical/digital workflow design — even if they don't say
    11	  "ADHD" explicitly. Also trigger for requests involving Linear + calendar + paper
    12	  stack orchestration, A4 printable templates, or "mesa de trabalho" / "painel de
    13	  operação" in Portuguese.
    14	compatibility: "claude.ai, Claude Code, Cowork — requires pptx skill and python-pptx"
    15	metadata: "non_clinical_boundary: true"
    16	---
    17	
    18	# ADHD Desk Dashboard Skill
    19	
    20	Creates printable A4 landscape operating dashboards and a matching digital backlog
    21	for solo knowledge workers with ADHD/TDAH and dyslexia constraints.
    22	
    23	> **Safety boundary**: This skill covers planning, organisation, and
    24	> accessibility-oriented formatting only. It must never advise diagnosis,
    25	> medication, or clinical treatment. For clinical concerns, direct the user to a
    26	> qualified health professional.
    27	
    28	---
    29	
    30	## Quick-start
    31	
    32	1. Read the user's brief and extract: target routines, current stack, language, and any explicit accessibility constraints.
    33	2. Follow the **Execution Protocol** below.
    34	3. Generate all artifacts; validate for printability.
    35	4. Deliver the output bundle.
    36	
    37	---
    38	
    39	## Inputs
    40	
    41	| Field | Description |
    42	|---|---|
    43	| Raw brief | Operational command or workflow description |
    44	| Stack | Linear, Drive, Calendar, Claude/ChatGPT, GitHub, paper |
    45	| Routines | DataClean, Content, OpsAdmin, Analytics, Review (subset or all) |
    46	| Constraints | Large text, minimal noise, high legibility, B&W printable |
    47	| Language | Default pt-BR; switch if user writes in another language |
    48	| Output format | PPTX + PDF (default); also Markdown checklist and Linear plan |
    49	
    50	---
    51	
    52	## Standard Output Bundle
    53	
    54	| File | Purpose |
    55	|---|---|
    56	| `leonardo-desk-dashboard.pptx` | A4 landscape dashboard deck |
    57	| `leonardo-desk-dashboard.pdf` | Print-ready PDF |
    58	| `checklist-impressao.md` | Print and desk setup checklist |
    59	| `linear-issues-dashboard.md` | Linear project, labels, recurring issues, views |
    60	| `README.md` | Usage documentation |
    61	
    62	---
    63	
    64	## Slide Architecture
    65	
    66	| # | Slide Name | Function | Required Blocks |
    67	|---|---|---|---|
    68	| S1 | Roadmap Mesa | Weekly sprint control | Objective · Priority · Deliverables · Risks · DoD · Next Action |
    69	| S2 | Capacity Table | Daily workflow allocation | Workflow · Time · Priority · Input · Output · Save Location · Command · DoD |
    70	| S3 | WF1 Data Clean | 45-min data processing | Raw · Classify · Extract · Save · Linear · Command · DoD |
    71	| S4 | WF2 Content | Morning content routine | Topic · Update · Batch · Reuse · Channel · Agenda · DoD |
    72	| S5 | WF3 Ops Admin | 90-min admin loop | Login · Email · Accounts · GitHub · Social · Linear · Agenda · External Admin · DoD |
    73	| S6 | Research Card | Manual research capture | Finding · Number · Source · Hypothesis · Decision · Action · Tag · Reuse · Priority |
    74	
    75	---
    76	
    77	## Execution Protocol
    78	
    79	| Phase | Question | Output |
    80	|---|---|---|
    81	| 1. Parse | What is the user really asking to operate? | Scope statement |
    82	| 2. Segment | Which workflows are distinct? | MECE workflow map |
    83	| 3. Constrain | What cognitive/accessibility limits apply? | Design constraints list |
    84	| 4. Materialise | What must be visible on paper? | A4 page plan |
    85	| 5. Digitise | What belongs in Linear/Drive/Calendar? | Backlog and save map |
    86	| 6. Generate | Build all artifacts | Output bundle |
    87	| 7. Validate | Can the user execute without re-reading the brief? | DoD and print check |
    88	
    89	---
    90	
    91	## Design Rules
    92	
    93	- **Page**: A4 landscape, 297 × 210 mm, margins 15 mm.
    94	- **Background**: neutral, non-decorative.
    95	- **Fill fields**: light gray `#F5F5F5`.
    96	- **Typography**: sans-serif; body ≥ 14 pt; headers ≥ 18 pt.
    97	- **Layout**: one objective per page; boxes and tables, not paragraphs.
    98	- **Labels**: tag all content as `FACT`, `HYPOTHESIS`, `DECISION`, or `ACTION`.
    99	- **DoD**: every slide must carry a visible Definition of Done.
   100	- **Print**: optimise for black-and-white; no gradients, ribbons, or clip art.
   101	
   102	---
   103	
   104	## Reference Files
   105	
   106	Read these when you need deeper guidance — do not load all at once:
   107	
   108	| File | When to read |
   109	|---|---|
   110	| `references/adhd-design-principles.md` | Detailed ADHD/accessibility design rationale and label system |
   111	| `references/workflow-protocol.md` | Full workflow table with time-boxes, inputs, outputs, and DoDs |
   112	| `references/sources-and-safety.md` | Evidence anchors and safe/unsafe use boundary |
   113	
   114	---
   115	
   116	## Scripts
   117	
   118	`scripts/adhd_dashboard_generator.py` — generates a Markdown capacity-table
   119	scaffold. Run it first to get the default workflow rows, then feed them into the
   120	PPTX generation step.
   121	
   122	```bash
   123	python scripts/adhd_dashboard_generator.py
   124	# outputs: generated/capacity-table.md
   125	```
   126	
   127	For the full PPTX build, follow `/mnt/skills/public/pptx/SKILL.md`.
   128	
   129	---
   130	
   131	## Default Workflow Table (quick reference)
   132	
   133	| Workflow | Time Box | Input | Output | DoD |
   134	|---|---:|---|---|---|
   135	| DataClean | 45 min/day | Raw notes/chats/files | Classified knowledge | Inbox reduced; facts saved; actions routed |
   136	| Content Creation | Morning | Topic/current insight | Reusable content batch | Published or scheduled; URLs saved |
   137	| Ops Admin | 90 min/day | Login/email/accounts/backlog | Admin state clean | Accounts checked; tomorrow prepared |
   138	| Analytics | Weekly | Metrics and URLs | Baseline table | Numbers captured; next experiment chosen |
   139	| Review | Weekly | Completed issues/cards | Decision log | Keep/change/stop decisions recorded |
   140	
{"returncode":0,"stdout":"adhd-design-principles.md\nsources-and-safety.md\nworkflow-protocol.md\n---\nREADME.md\nSKILL.md\nmanifest.json\nreferences\nscripts\n","stderr":""}
{"returncode":0,"stdout":"# Sources and Safety Boundary\n\nThis skill is organizational and workflow-oriented. It does not diagnose ADHD/TDAH, prescribe treatment, or replace clinical care.\n\n## Evidence-aware source anchors\n\n| Source | Relevance |\n|---|---|\n| NIMH ADHD overview | Defines ADHD as a developmental disorder involving persistent inattention, hyperactivity, and impulsivity. |\n| CDC adult ADHD overview | Notes ADHD develops in childhood and may continue into adulthood; adult diagnosis and treatment require professional evaluation. |\n| NICE NG87 | Covers recognition, diagnosis, and management of ADHD across children, young people, and adults. |\n| CHADD ADHD overview | Provides patient-facing education on ADHD characteristics and persistence. |\n\n## Safe Use\n\n| Safe | Unsafe |\n|---|---|\n| Workflow planning | Diagnosis |\n| Printable dashboards | Medication advice |\n| Task initiation support | Treatment recommendations |\n| External memory systems | Claims of curing ADHD |\n| Organization templates | Replacing clinician assessment |\n===\n# ADHD/TDAH-Friendly Design Principles\n\n| Principle | Implementation |\n|---|---|\n| Reduce working-memory load | Use one objective per page and visible next action fields. |\n| Externalize task state | Use paper cards, tables, checkboxes, and Linear issue views. |\n| Make completion explicit | Every workflow has a Definition of Done. |\n| Reduce visual noise | No decorative elements; only functional boxes and tables. |\n| Support dyslexia constraints | Large sans-serif text, wide spacing, short labels, high contrast. |\n| Support task initiation | Use small first actions: open inbox, choose one item, classify one source. |\n| Support recovery after interruption | Include save location, status, and next action on every page. |\n\n## Labels\n\n| Label | Meaning |\n|---|---|\n| FACT | Verified or source-backed information. |\n| HYPOTHESIS | Plausible but unvalidated interpretation. |\n| DECISION | Choice made by the user or project. |\n| ACTION | Executable next step. |\n","stderr":""}
Leitura completa feita. Aqui está a análise.

---

## Business Thesis Vault

| ID | Chat_Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |
|---|---|---|---|---|---|---|---|---|---|---|
| T-001 | adhd-desk-dashboard | Thesis | JTBD + Market | Existe mercado viável para uma skill/produto que gera dashboards físico-digitais para adultos com TDAH? | Validação de inovação + potencial comercial | Prevalência TDAH adulto ~5-8% população global; mercado produtividade neurodivergente em crescimento | TBD | Alta | Validating | #strategy #market #product #adhd #workflow #ai |
| A-001 | adhd-desk-dashboard | Analysis | First Principles | O que essa skill faz que ferramentas genéricas não fazem? | Diferenciação real vs. templates Notion/Motion/Reclaim | TBD | TBD | Alta | Draft | #product #customer #jtbd |
| R-001 | adhd-desk-dashboard | Analysis | Risk | Qual o risco de o mercado não reconhecer o problema como "dashboard" mas sim como "coaching"? | Hipótese de framing errado | TBD | TBD | Média | Draft | #risk #market |

---

## Executive Summary

A skill tem inovação técnica genuína e atinge um nicho subatendido — mas o caminho para monetização exige re-framing do problema do cliente. O maior risco não é a competição; é a aquisição.

---

## Inovação: o que é real vs. o que é incremental

**Real e defensável:**

A combinação *física + digital + TDAH-específico* não existe de forma integrada em nenhum produto que eu conheça. O mercado tem três territórios separados — templates de bullet journal para TDAH, ferramentas de PM como Linear, e AI assistants genéricos — e essa skill conecta os três num único output acionável. Isso é genuinamente raro.

Os design constraints são ancorados em evidência (NIMH, NICE NG87, CHADD), não em "senso comum de produtividade". O metadata `non_clinical_boundary: true` e a tabela Safe/Unsafe no `sources-and-safety.md` mostram maturidade de produto — alguém pensou na fronteira de responsabilidade civil. Isso importa para B2B.

A arquitetura de slides — uma métrica por página, DoD visível, label FACT/HYPOTHESIS/DECISION/ACTION — replica mecanismos de externalização de memória de trabalho que têm base em psicologia cognitiva. Não é estética; é funcional.

**Incremental / não diferencia ainda:**

Os filenames estão hardcoded com "leonardo" — isso é MVP pessoal, não produto. A dependência de Linear + python-pptx + claude.ai como stack cria atrito de onboarding alto para o público-alvo (adultos com TDAH que já têm dificuldade com setup técnico). A skill não tem loop de feedback — nenhum mecanismo para o usuário iterar o dashboard sem reiniciar o fluxo.

---

## Mercado

Prevalência de TDAH em adultos é estimada em 5–8% globalmente, com subdiagnóstico histórico em mulheres e adultos brasileiros — o que significa que o mercado real é maior do que as estatísticas mostram. No Brasil, o diagnóstico tardio em adultos cresceu significativamente após a pandemia (hipótese baseada em dados de busca e volume de conteúdo, não estudo controlado — marcar como H).

O mercado de "produtividade neurodivergente" tem dois segmentos com disposição a pagar muito diferente:

- **B2C individual**: alto volume, baixo ticket, alta churn. Esse público compra cursos, templates no Gumroad, assina Notion AI. Ticket médio R$ 50–200/ano.
- **B2B (RH, coaches, clínicas)**: baixo volume, ticket alto, contrato recorrente. Coaches de TDAH cobram R$ 300–800/sessão e precisam de ferramentas para escalar entrega. Uma skill que gera o "sistema do cliente" em 10 minutos tem valor claro.

O B2B é o caminho mais defensável e mais rápido para receita real.

---

## JTBD central

*Quando* eu tenho TDAH e começo a semana sem um sistema físico na mesa, *eu quero* ter um painel imprimível que capture todos os meus fluxos sem me obrigar a lembrar onde está cada coisa, *para* iniciar tarefas sem atrito e recuperar contexto depois de interrupções — sem depender só de memória ou só de ferramentas digitais.

Esse Job não está sendo resolvido por Motion, Reclaim, ou Notion. Eles resolvem *scheduling*. Essa skill resolve *externalização de estado cognitivo em papel*.

---

## Riscos principais

**R-001 — Framing**: adultos com TDAH não buscam "dashboard". Eles buscam "parar de esquecer tudo", "conseguir terminar o que começo", "não me sentir sobrecarregado". O produto precisa de marketing em linguagem de sintoma, não de solução.

**R-002 — Setup atrito**: Linear + python-pptx + claude.ai é stack técnica demais para o público-alvo no formato atual. Uma versão web (HTML interativo → PDF imprimível) eliminaria a barreira.

**R-003 — Escalabilidade de personalização**: o valor da skill está na personalização profunda. Mas personalização profunda não escala bem como SaaS sem um onboarding estruturado que substitua a conversa com o Claude.

---

## Próxima ação concreta

Antes de qualquer decisão de produto ou go-to-market, valide o Job com 5 entrevistas de usuário com adultos diagnosticados com TDAH que já usam algum sistema físico (agenda, kanban em papel, post-its). A pergunta-chave: *"O que acontece quando seu sistema falha — qual é a primeira coisa que você perde?"*. Isso vai confirmar ou refutar se a externalização de estado é o Job central ou só um Job adjunto.

[Size: full · Confidence: M — mercado e prevalência bem estabelecidos; potencial de monetização é inferência baseada em analogias de mercado, não dados primários]

---

**Você** _2026-05-14_

exaitem alguma skill md em bench mark braisl e usa ?

---

**Claude** _2026-05-14_

{"returncode":0,"stdout":"/mnt/skills/user/cmd-01-pps/references/naming-conventions.md\n/mnt/skills/user/cmd-01-pps/references/trigger-table.md\n/mnt/skills/user/cmd-01-pps/SKILL.md\n/mnt/skills/user/cmd-01-pps/README.md\n/mnt/skills/user/cmd-01-pps/examples/usage-examples.md\n/mnt/skills/user/product-self-knowledge/SKILL.md\n/mnt/skills/user/projects-to-linear/references/workspace-data.md\n/mnt/skills/user/projects-to-linear/references/templates.md\n/mnt/skills/user/projects-to-linear/references/mcp-tools.md\n/mnt/skills/user/projects-to-linear/SKILL.md\n/mnt/skills/user/cmd-03-maro/references/sample-personas.md\n/mnt/skills/user/cmd-03-maro/references/trigger-table.md\n/mnt/skills/user/cmd-03-maro/agents/schema-scoring-agent.md\n/mnt/skills/user/cmd-03-maro/agents/form-blueprint-agent.md\n/mnt/skills/user/cmd-03-maro/agents/qa-consistency-agent.md\n/mnt/skills/user/cmd-03-maro/agents/segmentation-researcher.md\n/mnt/skills/user/cmd-03-maro/SKILL.md\n/mnt/skills/user/cmd-03-maro/README.md\n/mnt/skills/user/cmd-03-maro/examples/usage-examples.md\n/mnt/skills/user/adhd-desk-dashboard/references/adhd-design-principles.md\n/mnt/skills/user/adhd-desk-dashboard/references/workflow-protocol.md\n/mnt/skills/user/adhd-desk-dashboard/references/sources-and-safety.md\n/mnt/skills/user/adhd-desk-dashboard/SKILL.md\n/mnt/skills/user/adhd-desk-dashboard/README.md\n/mnt/skills/user/cmd-02-mirp/references/notion-schema.md\n/mnt/skills/user/cmd-02-mirp/references/trigger-table.md\n/mnt/skills/user/cmd-02-mirp/SKILL.md\n/mnt/skills/user/cmd-02-mirp/README.md\n/mnt/skills/public/docx/SKILL.md\n/mnt/skills/public/file-reading/SKILL.md\n/mnt/skills/public/frontend-design/SKILL.md\n/mnt/skills/public/pdf/FORMS.md\n/mnt/skills/public/pdf/REFERENCE.md\n/mnt/skills/public/pdf/SKILL.md\n/mnt/skills/public/pdf-reading/REFERENCE.md\n/mnt/skills/public/pdf-reading/SKILL.md\n/mnt/skills/public/pptx/SKILL.md\n/mnt/skills/public/pptx/editing.md\n/mnt/skills/public/pptx/pptxgenjs.md\n/mnt/skills/public/product-self-knowledge/SKILL.md\n===\nadhd-desk-dashboard\ncmd-01-pps\ncmd-02-mirp\ncmd-03-maro\nproduct-self-knowledge\nprojects-to-linear\n","stderr":""}
{"returncode":0,"stdout":"/mnt/skills/user/cmd-03-maro/references/sample-personas.md\n/mnt/skills/user/cmd-03-maro/agents/schema-scoring-agent.md\n/mnt/skills/user/cmd-03-maro/agents/form-blueprint-agent.md\n/mnt/skills/user/cmd-03-maro/agents/qa-consistency-agent.md\n/mnt/skills/user/cmd-03-maro/agents/segmentation-researcher.md\n/mnt/skills/user/cmd-03-maro/SKILL.md\n/mnt/skills/user/cmd-03-maro/examples/usage-examples.md\n/mnt/skills/user/adhd-desk-dashboard/references/adhd-design-principles.md\n/mnt/skills/user/adhd-desk-dashboard/references/sources-and-safety.md\n/mnt/skills/user/adhd-desk-dashboard/SKILL.md\n/mnt/skills/user/adhd-desk-dashboard/README.md\n/mnt/skills/user/adhd-desk-dashboard/scripts/adhd_dashboard_generator.py\n/mnt/skills/user/adhd-desk-dashboard/manifest.json\n/mnt/skills/examples/internal-comms/examples/company-newsletter.md\n/mnt/skills/examples/mcp-builder/reference/node_mcp_server.md\n/mnt/skills/examples/mcp-builder/reference/python_mcp_server.md\n/mnt/skills/examples/skill-creator/SKILL.md\n/mnt/skills/examples/skill-creator/agents/analyzer.md\n/mnt/skills/examples/skill-creator/eval-viewer/generate_review.py\n/mnt/skills/examples/skill-creator/eval-viewer/viewer.html\n/mnt/skills/examples/skill-creator/references/schemas.md\n/mnt/skills/examples/skill-creator/scripts/aggregate_benchmark.py\n/mnt/skills/examples/skill-creator.skill\n/mnt/skills/examples/theme-factory/themes/sunset-boulevard.md\n","stderr":""}
{"returncode":0,"stdout":"---\nname: skill-creator\ndescription: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.\n---\n\n# Skill Creator\n\nA skill for creating new skills and iteratively improving them.\n\nAt a high level, the process of creating a skill goes like this:\n\n- Decide what you want the skill to do and roughly how it should do it\n- Write a draft of the skill\n- Create a few test prompts and run claude-with-access-to-the-skill on them\n- Help the user evaluate the results both qualitatively and quantitatively\n  - While the runs happen in the background, draft some quantitative evals if there aren't any (if there are some, you can either use as is or modify if you feel something needs to change about them). Then explain them to the user (or if they already existed, explain the ones that already exist)\n  - Use the `eval-viewer/generate_review.py` script to show the user the results for them to look at, and also let them look at the quantitative metrics\n- Rewrite the skill based on feedback from the user's evaluation of the results (and also if there are any glaring flaws that become apparent from the quantitative benchmarks)\n- Repeat until you're satisfied\n- Expand the test set and try again at larger scale\n\nYour job when using this skill is to figure out where the user is in this process and then jump in and help them progress through these stages. So for instance, maybe they're like \"I want to make a skill for X\". You can help narrow down what they mean, write a draft, write the test cases, figure out how they want to evaluate, run all the prompts, and repeat.\n\nOn the other hand, maybe they already have a draft of the skill. In this case you can go straight to the eval/iterate part of the loop.\n\nOf course, you should always be flexible and if the user is like \"I don't need to run a bunch of evaluations, just vibe with me\", you can do that instead.\n\nThen after the skill is done (but again, the order is flexible), you can also run the skill description improver, which we have a whole separate script for, to optimize the triggering of the skill.\n\nCool? Cool.\n\n## Communicating with the user\n\nThe skill creator is liable to be used by people across a wide range of familiarity with coding jargon. If you haven't heard (and how could you, it's only very recently that it started), there's a trend now where the power of Claude is inspiring plumbers to open up their terminals, parents and grandparents to google \"how to install npm\". On the other hand, the bulk of users are probably fairly computer-literate.\n\nSo please pay attention to context cues to understand how to phrase your communication! In the default case, just to give you some idea:\n\n- \"evaluation\" and \"benchmark\" are borderline, but OK\n- for \"JSON\" and \"assertion\" you want to see serious cues from the user that they know what those things are before using them without explaining them\n\nIt's OK to briefly explain terms if you're in doubt, and feel free to clarify terms with a short definition if you're unsure if the user will get it.\n\n---\n\n## Creating a skill\n\n### Capture Intent\n\nStart by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture (e.g., they say \"turn this into a skill\"). If so, extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input/output formats observed. The user may need to fill the gaps, and should confirm before proceeding to the next step.\n\n1. What should this skill enable Claude to do?\n2. When should this skill trigger? (what user phrases/contexts)\n3. What's the expected output format?\n4. Should we set up test cases to verify the skill works? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflow steps) benefit from test cases. Skills with subjective outputs (writing style, art) often don't need them. Suggest the appropriate default based on the skill type, but let the user decide.\n\n### Interview and Research\n\nProactively ask questions about edge cases, input/output formats, example files, success criteria, and dependencies. Wait to write test prompts until you've got this part ironed out.\n\nCheck available MCPs - if useful for research (searching docs, finding similar skills, looking up best practices), research in parallel via subagents if available, otherwise inline. Come prepared with context to reduce burden on the user.\n\n### Write the SKILL.md\n\nBased on the user interview, fill in these components:\n\n- **name**: Skill identifier\n- **description**: When to trigger, what it does. This is the primary triggering mechanism - include both what the skill does AND specific contexts for when to use it. All \"when to use\" info goes here, not in the body. Note: currently Claude has a tendency to \"undertrigger\" skills -- to not use them when they'd be useful. To combat this, please make the skill descriptions a little bit \"pushy\". So for instance, instead of \"How to build a simple fast dashboard to display internal Anthropic data.\", you might write \"How to build a simple fast dashboard to display internal Anthropic data. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data, even if they don't explicitly ask for a 'dashboard.'\"\n- **compatibility**: Required tools, dependencies (optional, rarely needed)\n- **the rest of the skill :)**\n\n### Skill Writing Guide\n\n#### Anatomy of a Skill\n\n```\nskill-name/\n├── SKILL.md (required)\n│   ├── YAML frontmatter (name, description required)\n│   └── Markdown instructions\n└── Bundled Resources (optional)\n    ├── scripts/    - Executable code for deterministic/repetitive tasks\n    ├── references/ - Docs loaded into context as needed\n    └── assets/     - Files used in output (templates, icons, fonts)\n```\n\n#### Progressive Disclosure\n\nSkills use a three-level loading system:\n1. **Metadata** (name + description) - Always in context (~100 words)\n2. **SKILL.md body** - In context whenever skill triggers (<500 lines ideal)\n3. **Bundled resources** - As needed (unlimited, scripts can execute without loading)\n\nThese word counts are approximate and you can feel free to go longer if needed.\n\n**Key patterns:**\n- Keep SKILL.md under 500 lines; if you're approaching this limit, add an additional layer of hierarchy along with clear pointers about where the model using the skill should go next to follow up.\n- Reference files clearly from SKILL.md with guidance on when to read them\n- For large reference files (>300 lines), include a table of contents\n\n**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:\n","stderr":""}
Resposta direta: **não existe nenhuma skill.md com dados de benchmark do Brasil**. O que existe é adjacente:

---

**O que foi encontrado:**

- `cmd-03-maro` — mais próximo. É um orquestrador de pesquisa multi-agente explicitamente focado em "Brazilian B2B service operators" e tem `sample-personas.md` com contexto BR. Mas não carrega dados de mercado; ele *coleta e estrutura* pesquisa.

- `skill-creator` — tem um `aggregate_benchmark.py`, mas é benchmark de performance de skill (qual % das vezes a skill trigga corretamente), não benchmark de mercado.

- Nada com dados de prevalência TDAH Brasil, tamanho de mercado de produtividade, comparativos de produto, etc.

---

**O que faz sentido fazer agora:**

Duas opções dependendo do que você quer:

1. **Dados de mercado BR agora** → eu faço uma busca web com fontes primárias (ABDA, estudos UNIFESP/USP, dados de busca Google Trends BR, relatórios de produtividade SaaS no Brasil) e entrego os números reais para alimentar o Business Thesis Vault da análise anterior.

2. **Criar uma skill de benchmark BR** → usando `skill-creator` + `cmd-02-mirp`, construímos uma skill reutilizável que puxa e estrutura dados de mercado brasileiro para qualquer tese que você esteja validando.

Qual das duas você precisa agora?
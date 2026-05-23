---
title: "Família de skills bussola explicada"
date: 2026-04-22
account: directjervis@gmail.com
uuid: af703c15-fd83-4e36-850e-c55d8c60aa5e
messages: 8
tags: []
context: ""
---

**Você** _2026-04-22_

/skill-creator Explique via 5w2h oque faz a familia de skills bussula

---

**Claude** _2026-04-22_

1	---
     2	name: skill-creator
     3	description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
     4	---
     5	
     6	# Skill Creator
     7	
     8	A skill for creating new skills and iteratively improving them.
     9	
    10	At a high level, the process of creating a skill goes like this:
    11	
    12	- Decide what you want the skill to do and roughly how it should do it
    13	- Write a draft of the skill
    14	- Create a few test prompts and run claude-with-access-to-the-skill on them
    15	- Help the user evaluate the results both qualitatively and quantitatively
    16	  - While the runs happen in the background, draft some quantitative evals if there aren't any (if there are some, you can either use as is or modify if you feel something needs to change about them). Then explain them to the user (or if they already existed, explain the ones that already exist)
    17	  - Use the `eval-viewer/generate_review.py` script to show the user the results for them to look at, and also let them look at the quantitative metrics
    18	- Rewrite the skill based on feedback from the user's evaluation of the results (and also if there are any glaring flaws that become apparent from the quantitative benchmarks)
    19	- Repeat until you're satisfied
    20	- Expand the test set and try again at larger scale
    21	
    22	Your job when using this skill is to figure out where the user is in this process and then jump in and help them progress through these stages. So for instance, maybe they're like "I want to make a skill for X". You can help narrow down what they mean, write a draft, write the test cases, figure out how they want to evaluate, run all the prompts, and repeat.
    23	
    24	On the other hand, maybe they already have a draft of the skill. In this case you can go straight to the eval/iterate part of the loop.
    25	
    26	Of course, you should always be flexible and if the user is like "I don't need to run a bunch of evaluations, just vibe with me", you can do that instead.
    27	
    28	Then after the skill is done (but again, the order is flexible), you can also run the skill description improver, which we have a whole separate script for, to optimize the triggering of the skill.
    29	
    30	Cool? Cool.
    31	
    32	## Communicating with the user
    33	
    34	The skill creator is liable to be used by people across a wide range of familiarity with coding jargon. If you haven't heard (and how could you, it's only very recently that it started), there's a trend now where the power of Claude is inspiring plumbers to open up their terminals, parents and grandparents to google "how to install npm". On the other hand, the bulk of users are probably fairly computer-literate.
    35	
    36	So please pay attention to context cues to understand how to phrase your communication! In the default case, just to give you some idea:
    37	
    38	- "evaluation" and "benchmark" are borderline, but OK
    39	- for "JSON" and "assertion" you want to see serious cues from the user that they know what those things are before using them without explaining them
    40	
    41	It's OK to briefly explain terms if you're in doubt, and feel free to clarify terms with a short definition if you're unsure if the user will get it.
    42	
    43	---
    44	
    45	## Creating a skill
    46	
    47	### Capture Intent
    48	
    49	Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture (e.g., they say "turn this into a skill"). If so, extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input/output formats observed. The user may need to fill the gaps, and should confirm before proceeding to the next step.
    50	
    51	1. What should this skill enable Claude to do?
    52	2. When should this skill trigger? (what user phrases/contexts)
    53	3. What's the expected output format?
    54	4. Should we set up test cases to verify the skill works? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflow steps) benefit from test cases. Skills with subjective outputs (writing style, art) often don't need them. Suggest the appropriate default based on the skill type, but let the user decide.
    55	
    56	### Interview and Research
    57	
    58	Proactively ask questions about edge cases, input/output formats, example files, success criteria, and dependencies. Wait to write test prompts until you've got this part ironed out.
    59	
    60	Check available MCPs - if useful for research (searching docs, finding similar skills, looking up best practices), research in parallel via subagents if available, otherwise inline. Come prepared with context to reduce burden on the user.
    61	
    62	### Write the SKILL.md
    63	
    64	Based on the user interview, fill in these components:
    65	
    66	- **name**: Skill identifier
    67	- **description**: When to trigger, what it does. This is the primary triggering mechanism - include both what the skill does AND specific contexts for when to use it. All "when to use" info goes here, not in the body. Note: currently Claude has a tendency to "undertrigger" skills -- to not use them when they'd be useful. To combat this, please make the skill descriptions a little bit "pushy". So for instance, instead of "How to build a simple fast dashboard to display internal Anthropic data.", you might write "How to build a simple fast dashboard to display internal Anthropic data. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data, even if they don't explicitly ask for a 'dashboard.'"
    68	- **compatibility**: Required tools, dependencies (optional, rarely needed)
    69	- **the rest of the skill :)**
    70	
    71	### Skill Writing Guide
    72	
    73	#### Anatomy of a Skill
    74	
    75	```
    76	skill-name/
    77	├── SKILL.md (required)
    78	│   ├── YAML frontmatter (name, description required)
    79	│   └── Markdown instructions
    80	└── Bundled Resources (optional)
    81	    ├── scripts/    - Executable code for deterministic/repetitive tasks
    82	    ├── references/ - Docs loaded into context as needed
    83	    └── assets/     - Files used in output (templates, icons, fonts)
    84	```
    85	
    86	#### Progressive Disclosure
    87	
    88	Skills use a three-level loading system:
    89	1. **Metadata** (name + description) - Always in context (~100 words)
    90	2. **SKILL.md body** - In context whenever skill triggers (<500 lines ideal)
    91	3. **Bundled resources** - As needed (unlimited, scripts can execute without loading)
    92	
    93	These word counts are approximate and you can feel free to go longer if needed.
    94	
    95	**Key patterns:**
    96	- Keep SKILL.md under 500 lines; if you're approaching this limit, add an additional layer of hierarchy along with clear pointers about where the model using the skill should go next to follow up.
    97	- Reference files clearly from SKILL.md with guidance on when to read them
    98	- For large reference files (>300 lines), include a table of contents
    99	
   100	**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:
   101	```
   102	cloud-deploy/
   103	├── SKILL.md (workflow + selection)
   104	└── references/
   105	    ├── aws.md
   106	    ├── gcp.md
   107	    └── azure.md
   108	```
   109	Claude reads only the relevant reference file.
   110	
   111	#### Principle of Lack of Surprise
   112	
	< truncated lines 113-373 >
   374	
   375	### Step 3: Run the optimization loop
   376	
   377	Tell the user: "This will take some time — I'll run the optimization loop in the background and check on it periodically."
   378	
   379	Save the eval set to the workspace, then run in the background:
   380	
   381	```bash
   382	python -m scripts.run_loop \
   383	  --eval-set <path-to-trigger-eval.json> \
   384	  --skill-path <path-to-skill> \
   385	  --model <model-id-powering-this-session> \
   386	  --max-iterations 5 \
   387	  --verbose
   388	```
   389	
   390	Use the model ID from your system prompt (the one powering the current session) so the triggering test matches what the user actually experiences.
   391	
   392	While it runs, periodically tail the output to give the user updates on which iteration it's on and what the scores look like.
   393	
   394	This handles the full optimization loop automatically. It splits the eval set into 60% train and 40% held-out test, evaluates the current description (running each query 3 times to get a reliable trigger rate), then calls Claude to propose improvements based on what failed. It re-evaluates each new description on both train and test, iterating up to 5 times. When it's done, it opens an HTML report in the browser showing the results per iteration and returns JSON with `best_description` — selected by test score rather than train score to avoid overfitting.
   395	
   396	### How skill triggering works
   397	
   398	Understanding the triggering mechanism helps design better eval queries. Skills appear in Claude's `available_skills` list with their name + description, and Claude decides whether to consult a skill based on that description. The important thing to know is that Claude only consults skills for tasks it can't easily handle on its own — simple, one-step queries like "read this PDF" may not trigger a skill even if the description matches perfectly, because Claude can handle them directly with basic tools. Complex, multi-step, or specialized queries reliably trigger skills when the description matches.
   399	
   400	This means your eval queries should be substantive enough that Claude would actually benefit from consulting a skill. Simple queries like "read file X" are poor test cases — they won't trigger skills regardless of description quality.
   401	
   402	### Step 4: Apply the result
   403	
   404	Take `best_description` from the JSON output and update the skill's SKILL.md frontmatter. Show the user before/after and report the scores.
   405	
   406	---
   407	
   408	### Package and Present (only if `present_files` tool is available)
   409	
   410	Check whether you have access to the `present_files` tool. If you don't, skip this step. If you do, package the skill and present the .skill file to the user:
   411	
   412	```bash
   413	python -m scripts.package_skill <path/to/skill-folder>
   414	```
   415	
   416	After packaging, direct the user to the resulting `.skill` file path so they can install it.
   417	
   418	---
   419	
   420	## Claude.ai-specific instructions
   421	
   422	In Claude.ai, the core workflow is the same (draft → test → review → improve → repeat), but because Claude.ai doesn't have subagents, some mechanics change. Here's what to adapt:
   423	
   424	**Running test cases**: No subagents means no parallel execution. For each test case, read the skill's SKILL.md, then follow its instructions to accomplish the test prompt yourself. Do them one at a time. This is less rigorous than independent subagents (you wrote the skill and you're also running it, so you have full context), but it's a useful sanity check — and the human review step compensates. Skip the baseline runs — just use the skill to complete the task as requested.
   425	
   426	**Reviewing results**: If you can't open a browser (e.g., Claude.ai's VM has no display, or you're on a remote server), skip the browser reviewer entirely. Instead, present results directly in the conversation. For each test case, show the prompt and the output. If the output is a file the user needs to see (like a .docx or .xlsx), save it to the filesystem and tell them where it is so they can download and inspect it. Ask for feedback inline: "How does this look? Anything you'd change?"
   427	
   428	**Benchmarking**: Skip the quantitative benchmarking — it relies on baseline comparisons which aren't meaningful without subagents. Focus on qualitative feedback from the user.
   429	
   430	**The iteration loop**: Same as before — improve the skill, rerun the test cases, ask for feedback — just without the browser reviewer in the middle. You can still organize results into iteration directories on the filesystem if you have one.
   431	
   432	**Description optimization**: This section requires the `claude` CLI tool (specifically `claude -p`) which is only available in Claude Code. Skip it if you're on Claude.ai.
   433	
   434	**Blind comparison**: Requires subagents. Skip it.
   435	
   436	**Packaging**: The `package_skill.py` script works anywhere with Python and a filesystem. On Claude.ai, you can run it and the user can download the resulting `.skill` file.
   437	
   438	**Updating an existing skill**: The user might be asking you to update an existing skill, not create a new one. In this case:
   439	- **Preserve the original name.** Note the skill's directory name and `name` frontmatter field -- use them unchanged. E.g., if the installed skill is `research-helper`, output `research-helper.skill` (not `research-helper-v2`).
   440	- **Copy to a writeable location before editing.** The installed skill path may be read-only. Copy to `/tmp/skill-name/`, edit there, and package from the copy.
   441	- **If packaging manually, stage in `/tmp/` first**, then copy to the output directory -- direct writes may fail due to permissions.
   442	
   443	---
   444	
   445	## Cowork-Specific Instructions
   446	
   447	If you're in Cowork, the main things to know are:
   448	
   449	- You have subagents, so the main workflow (spawn test cases in parallel, run baselines, grade, etc.) all works. (However, if you run into severe problems with timeouts, it's OK to run the test prompts in series rather than parallel.)
   450	- You don't have a browser or display, so when generating the eval viewer, use `--static <output_path>` to write a standalone HTML file instead of starting a server. Then proffer a link that the user can click to open the HTML in their browser.
   451	- For whatever reason, the Cowork setup seems to disincline Claude from generating the eval viewer after running the tests, so just to reiterate: whether you're in Cowork or in Claude Code, after running tests, you should always generate the eval viewer for the human to look at examples before revising the skill yourself and trying to make corrections, using `generate_review.py` (not writing your own boutique html code). Sorry in advance but I'm gonna go all caps here: GENERATE THE EVAL VIEWER *BEFORE* evaluating inputs yourself. You want to get them in front of the human ASAP!
   452	- Feedback works differently: since there's no running server, the viewer's "Submit All Reviews" button will download `feedback.json` as a file. You can then read it from there (you may have to request access first).
   453	- Packaging works — `package_skill.py` just needs Python and a filesystem.
   454	- Description optimization (`run_loop.py` / `run_eval.py`) should work in Cowork just fine since it uses `claude -p` via subprocess, not a browser, but please save it until you've fully finished making the skill and the user agrees it's in good shape.
   455	- **Updating an existing skill**: The user might be asking you to update an existing skill, not create a new one. Follow the update guidance in the claude.ai section above.
   456	
   457	---
   458	
   459	## Reference files
   460	
   461	The agents/ directory contains instructions for specialized subagents. Read them when you need to spawn the relevant subagent.
   462	
   463	- `agents/grader.md` — How to evaluate assertions against outputs
   464	- `agents/comparator.md` — How to do blind A/B comparison between two outputs
   465	- `agents/analyzer.md` — How to analyze why one version beat another
   466	
   467	The references/ directory has additional documentation:
   468	- `references/schemas.md` — JSON structures for evals.json, grading.json, etc.
   469	
   470	---
   471	
   472	Repeating one more time the core loop here for emphasis:
   473	
   474	- Figure out what the skill is about
   475	- Draft or edit the skill
   476	- Run claude-with-access-to-the-skill on test prompts
   477	- With the user, evaluate the outputs:
   478	  - Create benchmark.json and run `eval-viewer/generate_review.py` to help the user review them
   479	  - Run quantitative evals
   480	- Repeat until you and the user are satisfied
   481	- Package the final skill and return it to the user.
   482	
   483	Please add steps to your TodoList, if you have such a thing, to make sure you don't forget. If you're in Cowork, please specifically put "Create evals JSON and run `eval-viewer/generate_review.py` so human can review test cases" in your TodoList to make sure it happens.
   484	
   485	Good luck!
   486	
     1	---
     2	name: bussola-orchestrator
     3	description: >
     4	  Use this skill to run or resume a Bússola PME consultative case end-to-end.
     5	  Activate on "novo caso Bússola PME", "rodar atendimento completo", "iniciar
     6	  consultoria PME", "avançar para fase N", "montar pacote final do caso",
     7	  "retomar caso [id]", "qual o status do caso". This skill owns the case
     8	  manifest.yaml, enforces QA gates G0–G6 and mandatory human-review checkpoints
     9	  on THREE critical artifacts (diagnostico_executivo, apresentacao_executiva,
    10	  proposta_continuidade), routes work to specialist skills (personalization,
    11	  diagnostic-engine, deliverable-forge, simulation-lab, execution-bridge),
    12	  and produces the final ZIP. Do NOT use for standalone method questions
    13	  (use consultative-faq) or one-off artifact generation outside a case
    14	  (use deliverable-forge directly).
    15	compatibility:
    16	  tools: [mcp__slack, mcp__google_drive, visualize:show_widget, create_file]
    17	dependencies: [pyyaml, jinja2]
    18	---
    19	
    20	# bussola-orchestrator
    21	
    22	## Propósito
    23	
    24	Coordenação end-to-end de um caso Bússola PME. Mantém o manifest.yaml como fonte de verdade, enforce gates G0–G6, roteia para skills especialistas, e produz o ZIP final.
    25	
    26	## As 9 Fases Operacionais
    27	
    28	| Fase | Nome | Skill responsável | Gate de saída |
    29	|------|------|------------------|---------------|
    30	| 0 | Configuração consultor | personalization | consultant_config válido |
    31	| 1 | Intake cliente | personalization | G0 (10 campos) |
    32	| 2 | Normalização | diagnostic-engine | G1 |
    33	| 3 | Diagnóstico | diagnostic-engine | problem_tree completo |
    34	| 4 | Priorização | diagnostic-engine | **★G2 HARDCODED** |
    35	| 5 | Plano de ação | diagnostic-engine | G3 |
    36	| 6 | Simulação (opcional) | simulation-lab | simulation_report |
    37	| 7 | Geração artefatos | deliverable-forge | G4 + **★G5 HARDCODED** |
    38	| 8 | Handoff execution | execution-bridge | **★G6 HARDCODED** |
    39	| 9 | Follow-up | deliverable-forge | proposta_continuidade aprovada |
    40	
    41	★ Gates HARDCODED: G2, G5, G6 — nunca automáticos em NENHUM modo.
    42	
    43	## manifest.yaml — estrutura
    44	
    45	```yaml
    46	case_id: BP-001
    47	consultant_id: marina-costa
    48	created_at: 2026-04-17T10:00:00Z
    49	updated_at: 2026-04-17T22:00:00Z
    50	current_phase: 7
    51	operating_mode: guided
    52	
    53	gates:
    54	  G0: {status: approved, approved_at: "...", approved_by: consultor}
    55	  G1: {status: approved, approved_at: "..."}
    56	  G2: {status: pending}
    57	  G3: {status: not_reached}
    58	  G4: {status: not_reached}
    59	  G5: {status: not_reached}
    60	  G6: {status: not_reached}
    61	
    62	artifacts:
    63	  diagnostico_executivo: {status: pending_human_review}
    64	  apresentacao_executiva: {status: not_started}
    65	  proposta_continuidade: {status: not_started}
    66	
    67	human_review_required:
    68	  - diagnostico_executivo
    69	  - apresentacao_executiva
    70	  - proposta_continuidade
    71	
    72	simulation_used: false
    73	```
    74	
    75	## Regras de roteamento
    76	
    77	| Intenção detectada | Skill roteada |
    78	|-------------------|---------------|
    79	| Setup consultor, intake | personalization |
    80	| Diagnóstico, análise, priorização | diagnostic-engine |
    81	| Simulação, cenários | simulation-lab |
    82	| Gerar artefatos, ZIP | deliverable-forge |
    83	| Handoff Linear | execution-bridge |
    84	| Perguntas sobre método | consultative-faq |
    85	
    86	## Artefatos com revisão humana obrigatória
    87	
    88	1. `diagnostico_executivo` — Gate G5
    89	2. `apresentacao_executiva` — Gate G5
    90	3. `proposta_continuidade` — Gate G5
    91	
    92	## Dashboard de fases (formato ASCII)
    93	
    94	```
    95	Caso BP-001 — Marina Costa — guided mode
    96	─────────────────────────────────────────
    97	[✓] Fase 0: Configuração consultor
    98	[✓] Fase 1: Intake (G0: approved)
    99	[✓] Fase 2: Normalização (G1: approved)
   100	[✓] Fase 3: Diagnóstico
   101	[⚠] Fase 4: Priorização (G2: pending — MANUAL OBRIGATÓRIO)
   102	[ ] Fase 5: Plano de ação
   103	[ ] Fase 6: Simulação (opcional)
   104	[ ] Fase 7: Geração artefatos
   105	[ ] Fase 8: Handoff execution
   106	[ ] Fase 9: Follow-up
   107	─────────────────────────────────────────
   108	Próximo: aprovar G2 para avançar para Fase 5
   109	```
   110	
   111	## Dependências
   112	
   113	```bash
   114	pip install --break-system-packages pyyaml jinja2
   115	```
   116	
   117	## Evals
   118	
   119	```json
   120	[
   121	  {
   122	    "id": 1,
   123	    "prompt": "Novo caso Bússola PME para Marina, cliente agência de 6 pessoas.",
   124	    "expected": "Orchestrator inicializa manifest.yaml, roteia para personalization para fase 0, exibe dashboard.",
   125	    "should_trigger": true
   126	  },
   127	  {
   128	    "id": 2,
   129	    "prompt": "Caso BP-014, fase 5 concluída. Quero pular direto para apresentação sem revisar o diagnostico_executivo.",
   130	    "expected": "Orchestrator recusa. G5 é HARDCODED. Exibe gate bloqueado e instrui a aprovar diagnostico_executivo primeiro.",
   131	    "should_trigger": true
   132	  },
   133	  {
   134	    "id": 3,
   135	    "prompt": "Me explica a diferença entre 5W2H e PDCA.",
   136	    "expected": "Orchestrator NÃO ativa. Roteia para consultative-faq.",
   137	    "should_trigger": false
   138	  }
   139	]
   140	```
   141	
Com base na leitura do skill-creator e dos manifests da família Bússola, aqui está o 5W2H:

---

## 5W2H — Família de Skills Bússola PME

### **WHAT (O quê)**
Um sistema de 8 skills especializadas que, juntas, operam como um **Consultant Operating System**: transformam o método de um consultor independente em infraestrutura de entrega replicável — do intake do cliente até o handoff de execução no Linear.

| Skill | Responsabilidade |
|---|---|
| `bussola-orchestrator` | Coordena o caso end-to-end, mantém manifest.yaml, enforça gates G0–G6 |
| `bussola-personalization` | Setup do consultor + intake do cliente (10 campos) |
| `bussola-diagnostic-engine` | Pipeline analítico: normalização → diagnóstico → priorização → plano de ação |
| `bussola-simulation-lab` | Simulações de cenário (preço, funil, capacidade, sensibilidade) |
| `bussola-deliverable-forge` | Geração e empacotamento de artefatos (ZIP, PPTX, e-book, PDF) |
| `bussola-execution-bridge` | Handoff aprovado → projeto Linear com epics/issues + notificação Slack |
| `bussola-consultative-faq` | Responde dúvidas sobre o método sem mutar estado do caso |
| `bussola-case1-showroom` | Anonimiza caso concluído e gera showcase comercial |

---

### **WHY (Por quê)**
Porque consultores independentes perdem tempo replicando manualmente diagnósticos, apresentações e planos de ação. A família elimina esse overhead ao codificar o método como infraestrutura — cada caso novo roda o mesmo rigor analítico em < 24h, com rastreabilidade epistêmica (FATO / INFERÊNCIA / HIPÓTESE).

---

### **WHO (Quem)**
**Operador primário:** Leonardo (founder), como consultor-piloto.
**Beneficiário final:** PMEs brasileiras que recebem o pacote diagnóstico.
**Executor técnico:** Claude, orquestrado via slash-commands.

---

### **WHERE (Onde)**
Opera dentro do Claude.ai com acesso a MCP conectados:
- **Linear** — backlog e execução
- **Google Drive / Gmail** — pré-preenchimento de intake
- **Slack** — notificação pós-handoff
- **Filesystem** — manifests YAML, artefatos ZIP, logs de decisão

---

### **WHEN (Quando)**
| Gatilho | Skill ativada |
|---|---|
| "novo caso Bússola PME" | orchestrator → personalization |
| "rodar diagnóstico" / "priorizar problemas" | diagnostic-engine |
| "simular cenários de preço" | simulation-lab |
| "gerar entregáveis" / "montar ZIP" | deliverable-forge |
| "criar projeto no Linear" (com confirmação) | execution-bridge |
| "como funciona o gate G2" | consultative-faq |
| "gerar showcase / case 1" | case1-showroom |

---

### **HOW (Como)**
Fluxo sequencial em **9 fases**, governado por **7 gates de qualidade (G0–G6)**:

```
Fase 0-1: Setup + Intake ──→ G0
Fase 2-5: Diagnóstico analítico ──→ G1 → ★G2 (HARDCODED) → G3
Fase 6:   Simulação (opcional)
Fase 7:   Artefatos ──→ G4 → ★G5 (HARDCODED, revisão humana)
Fase 8:   Handoff Linear ──→ ★G6 (HARDCODED, confirmação explícita)
Fase 9:   Follow-up / Showroom
```

Gates G2, G5 e G6 são **hardcoded** — nunca automáticos, independente do modo de operação.

---

### **HOW MUCH (Quanto)**
- **8 skills** com responsabilidades isoladas e interfaces definidas
- **9 fases** operacionais cobertas de ponta a ponta
- **7 gates** de controle de qualidade, 3 deles com revisão humana obrigatória
- **5+ formatos de artefato**: ZIP, PPTX, HTML interativo, PDF, one-pager
- **4 integrações MCP**: Linear, Google Drive, Gmail, Slack
- **1 princípio transversal**: toda hipótese analítica é rotulada — nunca fact sem fonte

---

**TL;DR:** A família Bússola é um pipeline consultivo completo — da conversa inicial com o cliente ao backlog no Linear — onde cada skill tem uma responsabilidade única e o orchestrator garante que nenhum gate crítico seja pulado.

---

**Você** _2026-04-22_

/skill-creator 5w2h /business-docx-pipeline 5w2h /ceo-advisor

---

**Claude** _2026-04-22_

1	---
     2	name: business-docx-pipeline
     3	description: |
     4	  Transforms raw business context (brief, research, idea, notes) into a canonical document corpus
     5	  with dependency validation, epistemic traceability, and human approval gates.
     6	  
     7	  Trigger this skill whenever the user wants to:
     8	  - turn a raw document, brief or idea into structured business documents
     9	  - generate MRD, BRD, PRD, SOP, Runbook, Roadmap, Backlog or any combination
    10	  - build a complete workbook/playbook from scratch
    11	  - produce a financial spreadsheet, Linear prompt or full folder structure
    12	  - run market research + document pipeline end-to-end
    13	  - audit, refine or extend an existing document corpus
    14	  
    15	  Also trigger when user says: "cria documentação", "monta o playbook", "gera o corpus",
    16	  "preciso do PRD", "pipeline documental", "transforma esse briefing em docs",
    17	  "estrutura esse projeto", "gera o workbook", "cria a skill de documentos".
    18	---
    19	
    20	# Business Document Production Pipeline
    21	
    22	A dependency-aware document production engine that converts raw context into a canonical,
    23	auditable corpus. Each document only generates when its upstream dependencies are validated
    24	and approved. Human gates prevent downstream propagation of bad premises.
    25	
    26	## Core concept
    27	
    28	This skill operates as a **document graph executor**, not a prompt chain.
    29	Each node in the graph is a document with: required inputs, upstream dependencies,
    30	acceptance criteria, epistemic requirements, and a state.
    31	
    32	The skill never fills gaps with creativity. It signals gaps and blocks until resolved.
    33	
    34	---
    35	
    36	## How to start
    37	
    38	User provides one of:
    39	- raw text (brief, notes, research, idea dump)
    40	- uploaded file
    41	- structured input via intake questions
    42	
    43	The skill responds with a **Context Pack** and proposed **Document Graph** for approval
    44	before generating anything.
    45	
    46	---
    47	
    48	## Workflow profiles
    49	
    50	Read `assets/workflow_profiles.json` to select the appropriate profile.
    51	
    52	| Profile | Trigger signal | Chain starts at |
    53	|---|---|---|
    54	| `market-research` | "pesquisa", "mercado", "ICP", "segmento" | Agent 1 → MRD-lite |
    55	| `product` | "produto", "construir", "MVP", "PRD" | PRFAQ-lite → PRD-lite |
    56	| `go-to-market` | "lançar", "campanha", "proposta", "venda" | PRFAQ-lite → BRD-lite |
    57	| `operations` | "processo", "SOP", "operação", "runbook" | Context Pack → SOP |
    58	| `full-corpus` | "corpus completo", "workbook", "playbook" | Agent 1 → full chain |
    59	
    60	When the profile is ambiguous, ask one question: "Qual é o objetivo principal — mercado, produto, operação ou proposta comercial?"
    61	
    62	---
    63	
    64	## Execution phases
    65	
    66	### Phase 0 — Intake & Context Pack
    67	
    68	Run Agent 1 (market research) if profile is `market-research` or `full-corpus`.
    69	Otherwise, normalize input directly.
    70	
    71	Output: **Context Pack** with fields:
    72	- `business_objective`
    73	- `project_type`
    74	- `scope`
    75	- `hypotheses[]` — each labeled as `FATO | INFERÊNCIA | HIPÓTESE`
    76	- `available_data[]`
    77	- `sources[]`
    78	- `gaps[]`
    79	- `requested_deliverables[]`
    80	
    81	**Gate 0**: Show Context Pack. Ask user to confirm or correct before proceeding.
    82	Do not proceed without explicit confirmation.
    83	
    84	→ See `references/agents.md` for Agent 1 system prompt
    85	
    86	---
    87	
    88	### Phase 1 — Document Graph Planning
    89	
    90	Read `references/document_graph.md` for dependency rules.
    91	
    92	Based on the confirmed Context Pack and selected profile, generate the **Document Graph**:
    93	- list of documents in dependency order
    94	- for each: `status`, `required_inputs`, `upstream_dependencies`, `acceptance_criteria`
    95	
    96	**Gate 1**: Present the graph as a simple numbered list with dependencies visible.
    97	Ask: "Confirma esse grafo ou quer remover/adicionar algum documento?"
    98	
    99	Do not generate any document before Gate 1 is approved.
   100	
   101	---
   102	
   103	### Phase 2 — Discovery layer
   104	
   105	Generate in order (only documents that exist in the approved graph):
   106	
   107	1. `vision-framing` (if full-corpus)
   108	2. `mrd-lite` — depends on: Context Pack + research data
   109	3. `prfaq-lite` — depends on: Context Pack (no deep evidence needed)
   110	4. `business-case` — depends on: MRD-lite or PRFAQ-lite
   111	5. `brd-lite` — depends on: Business Case (only if external stakeholder exists)
   112	
   113	For each document:
   114	1. Check all `required_inputs` are present
   115	2. If missing → emit **Gap Report** (see Gap Report format below), block generation
   116	3. If present → generate document using template from `references/document_templates.md`
   117	4. Self-validate against `acceptance_criteria` from `references/document_graph.md`
   118	5. Label all claims: `[FATO]` / `[INFERÊNCIA]` / `[HIPÓTESE]`
   119	
   120	**Gate 2**: Present Discovery layer outputs. Ask for approval before Phase 3.
   121	Lock approved documents as canonical source for downstream.
   122	
   123	---
   124	
   125	### Phase 3 — Product layer
   126	
   127	Generate in order (only if in approved graph):
   128	
   129	1. `prd-lite` — depends on: PRFAQ-lite or MRD-lite; BRD-lite if commercial layer exists
   130	2. `frd-lite` — depends on: PRD-lite (only if automations or complex rules exist)
   131	3. `nfr-onepager` — depends on: PRD-lite (only if integrations, SLA, LGPD risk)
   132	4. `adr-decision-log` — depends on: context of irreversible decisions
   133	
   134	**Gate 3**: Present Product layer. Approval required before Phase 4.
   135	
   136	---
   137	
   138	### Phase 4 — Execution layer
   139	
   140	Generate in order:
   141	
   142	1. `roadmap` — depends on: PRD-lite + business priorities
   143	2. `user-stories` — depends on: PRD-lite; FRD-lite if hard rules exist
   144	3. `backlog` — depends on: User Stories
   145	4. `release-plan` — depends on: Backlog (optional)
   146	
   147	**Gate 4**: Present Execution layer. Approval required before Phase 5.
   148	
   149	---
   150	
   151	### Phase 5 — Operations layer + Output packaging
   152	
   153	Generate:
   154	
   155	1. `sop` — depends on: tested process (at least 2–3 repetitions)
   156	2. `runbook` — depends on: running automations and known failure points
   157	3. `data-integration-spec` — depends on: PRD-lite (when APIs, CRM, webhooks exist)
   158	
   159	After all gates approved → run Agent 2 for digital ops audit (optional).
   160	
   161	**Final output**: trigger `scripts/build_corpus.py` to generate:
   162	- Workbook `.docx` (all approved documents, executive design)
   163	- Folder structure `.zip` (organized by phase)
   164	- `scripts/build_spreadsheet.py` for financial `.xlsx`
   165	- Linear integration prompt from `references/linear_prompt.md`
   166	
   167	→ See `references/agents.md` for Agent 2 system prompt
   168	
   169	---
   170	
   171	## Gap Report format
   172	
   173	When inputs are insufficient, emit this block and stop generation:
   174	
   175	```
   176	GAP REPORT — [document_type]
   177	Status: BLOCKED
   178	Missing: [what is missing]
   179	Why it matters: [impact on this document]
   180	Unlock options:
   181	  A) [question that unblocks]
   182	  B) [alternative: proceed with provisional hypothesis — label all claims HIPÓTESE]
   183	Decision required from user before proceeding.
   184	```
   185	
   186	Never generate a document to fill a gap. Provisional hypotheses are allowed only
   187	when the user explicitly chooses option B and the document labels all claims accordingly.
   188	
   189	---
   190	
   191	## Epistemic policy
   192	
   193	Every significant claim in every document must carry one label:
   194	
   195	| Label | Meaning |
   196	|---|---|
   197	| `[FATO]` | Directly provided by user or verified source |
   198	| `[INFERÊNCIA]` | Strong interpretation from credible indirect signals |
   199	| `[HIPÓTESE]` | Plausible but unvalidated — requires field confirmation |
   200	
   201	Claims labeled `[HIPÓTESE]` must not propagate to downstream documents as confirmed facts.
   202	They propagate only as `[HIPÓTESE]` with an explicit flag.
   203	
   204	→ See `references/evidence_policy.md` for full policy
   205	
   206	---
   207	
   208	## Document states
   209	
   210	Each document in the graph has one of these states at all times:
   211	
   212	`not_planned` → `planned` → `blocked_missing_inputs` → `ready_to_generate`
   213	→ `generated_pending_validation` → `failed_validation` → `pending_human_review`
   214	→ `approved` → `archived_superseded`
   215	
   216	When a document fails validation, it returns to `ready_to_generate` after correction.
   217	When a document is superseded by a new version, it moves to `archived_superseded`.
   218	
   219	→ See `assets/document_states.json` for state machine
   220	
   221	---
   222	
   223	## Stopping rules
   224	
   225	The skill stops and requests input when:
   226	- A required upstream document is not yet approved
   227	- A Gap Report is emitted and no option is chosen
   228	- More than 2 failed validations on the same document
   229	- User explicitly requests halt
   230	
   231	The skill does NOT:
   232	- Invent data to fill gaps
   233	- Proceed past a gate without explicit approval
   234	- Generate downstream documents from unapproved sources
   235	- Re-use draft versions as canonical sources
   236	
   237	---
   238	
   239	## Reference files
   240	
   241	| File | When to read |
   242	|---|---|
   243	| `references/document_graph.md` | Phase 1 — building the graph |
   244	| `references/document_templates.md` | Phase 2–5 — generating each document |
   245	| `references/agents.md` | Phase 0 (Agent 1) and Phase 5 (Agent 2) |
   246	| `references/evidence_policy.md` | Any time a claim requires labeling |
   247	| `references/linear_prompt.md` | Final output — Linear integration |
   248	| `assets/workflow_profiles.json` | Intake — profile selection |
   249	| `assets/document_states.json` | Any state transition |
   250	
   251	---
   252	
   253	## Output contract
   254	
   255	The skill always produces these blocks when delivering final output:
   256	
   257	```
   258	CORPUS SUMMARY
   259	Project: [name]
   260	Profile: [workflow profile]
   261	Documents generated: [N]
   262	Documents approved: [N]
   263	Provisional hypotheses: [N — list them]
   264	Canonical sources locked: [list]
   265	Next recommended action: [one sentence]
   266	```
   267	
   268	Followed by the actual documents in dependency order, then artifact generation.
   269	
     1	---
     2	name: "ceo-advisor"
     3	description: "Executive leadership guidance for strategic decision-making, organizational development, and stakeholder management. Use when planning strategy, preparing board presentations, managing investors, developing organizational culture, making executive decisions, fundraising, or when user mentions CEO, strategic planning, board meetings, investor updates, organizational leadership, or executive strategy."
     4	license: MIT
     5	metadata:
     6	  version: 2.0.0
     7	  author: Alireza Rezvani
     8	  category: c-level
     9	  domain: ceo-leadership
    10	  updated: 2026-03-05
    11	  python-tools: strategy_analyzer.py, financial_scenario_analyzer.py
    12	  frameworks: executive-decisions, board-governance, leadership-culture
    13	---
    14	
    15	# CEO Advisor
    16	
    17	Strategic leadership frameworks for vision, fundraising, board management, culture, and stakeholder alignment.
    18	
    19	## Keywords
    20	CEO, chief executive officer, strategy, strategic planning, fundraising, board management, investor relations, culture, organizational leadership, vision, mission, stakeholder management, capital allocation, crisis management, succession planning
    21	
    22	## Quick Start
    23	
    24	```bash
    25	python scripts/strategy_analyzer.py          # Analyze strategic options with weighted scoring
    26	python scripts/financial_scenario_analyzer.py # Model financial scenarios (base/bull/bear)
    27	```
    28	
    29	## Core Responsibilities
    30	
    31	### 1. Vision & Strategy
    32	Set the direction. Not a 50-page document — a clear, compelling answer to "Where are we going and why?"
    33	
    34	**Strategic planning cycle:**
    35	- Annual: 3-year vision refresh + 1-year strategic plan
    36	- Quarterly: OKR setting with C-suite (COO drives execution)
    37	- Monthly: strategy health check — are we still on track?
    38	
    39	**Stage-adaptive time horizons:**
    40	- Seed/Pre-PMF: 3-month / 6-month / 12-month
    41	- Series A: 6-month / 1-year / 2-year
    42	- Series B+: 1-year / 3-year / 5-year
    43	
    44	See `references/executive_decision_framework.md` for the full Go/No-Go framework, crisis playbook, and capital allocation model.
    45	
    46	### 2. Capital & Resource Management
    47	You're the chief allocator. Every dollar, every person, every hour of engineering time is a bet.
    48	
    49	**Capital allocation priorities:**
    50	1. Keep the lights on (operations, must-haves)
    51	2. Protect the core (retention, quality, security)
    52	3. Grow the core (expansion of what works)
    53	4. Fund new bets (innovation, new products/markets)
    54	
    55	**Fundraising:** Know your numbers cold. Timing matters more than valuation. See `references/board_governance_investor_relations.md`.
    56	
    57	### 3. Stakeholder Leadership
    58	You serve multiple masters. Priority order:
    59	1. Customers (they pay the bills)
    60	2. Team (they build the product)
    61	3. Board/Investors (they fund the mission)
    62	4. Partners (they extend your reach)
    63	
    64	### 4. Organizational Culture
    65	Culture is what people do when you're not in the room. It's your job to define it, model it, and enforce it.
    66	
    67	See `references/leadership_organizational_culture.md` for culture development frameworks and the CEO learning agenda. Also see `culture-architect/` for the operational culture toolkit.
    68	
    69	### 5. Board & Investor Management
    70	Your board can be your greatest asset or your biggest liability. The difference is how you manage them.
    71	
    72	See `references/board_governance_investor_relations.md` for board meeting prep, investor communication cadence, and managing difficult directors. Also see `board-deck-builder/` for assembling the actual board deck.
    73	
    74	## Key Questions a CEO Asks
    75	
    76	- "Can every person in this company explain our strategy in one sentence?"
    77	- "What's the one thing that, if it goes wrong, kills us?"
    78	- "Am I spending my time on the highest-leverage activity right now?"
    79	- "What decision am I avoiding? Why?"
    80	- "If we could only do one thing this quarter, what would it be?"
    81	- "Do our investors and our team hear the same story from me?"
    82	- "Who would replace me if I got hit by a bus tomorrow?"
    83	
    84	## CEO Metrics Dashboard
    85	
    86	| Category | Metric | Target | Frequency |
    87	|----------|--------|--------|-----------|
    88	| **Strategy** | Annual goals hit rate | > 70% | Quarterly |
    89	| **Revenue** | ARR growth rate | Stage-dependent | Monthly |
    90	| **Capital** | Months of runway | > 12 months | Monthly |
    91	| **Capital** | Burn multiple | < 2x | Monthly |
    92	| **Product** | NPS / PMF score | > 40 NPS | Quarterly |
    93	| **People** | Regrettable attrition | < 10% | Monthly |
    94	| **People** | Employee engagement | > 7/10 | Quarterly |
    95	| **Board** | Board NPS (your relationship) | Positive trend | Quarterly |
    96	| **Personal** | % time on strategic work | > 40% | Weekly |
    97	
    98	## Red Flags
    99	
   100	- You're the bottleneck for more than 3 decisions per week
   101	- The board surprises you with questions you can't answer
   102	- Your calendar is 80%+ meetings with no strategic blocks
   103	- Key people are leaving and you didn't see it coming
   104	- You're fundraising reactively (runway < 6 months, no plan)
   105	- Your team can't articulate the strategy without you in the room
   106	- You're avoiding a hard conversation (co-founder, investor, underperformer)
   107	
   108	## Integration with C-Suite Roles
   109	
   110	| When... | CEO works with... | To... |
   111	|---------|-------------------|-------|
   112	| Setting direction | COO | Translate vision into OKRs and execution plan |
   113	| Fundraising | CFO | Model scenarios, prep financials, negotiate terms |
   114	| Board meetings | All C-suite | Each role contributes their section |
   115	| Culture issues | CHRO | Diagnose and address people/culture problems |
   116	| Product vision | CPO | Align product strategy with company direction |
   117	| Market positioning | CMO | Ensure brand and messaging reflect strategy |
   118	| Revenue targets | CRO | Set realistic targets backed by pipeline data |
   119	| Security/compliance | CISO | Understand risk posture for board reporting |
   120	| Technical strategy | CTO | Align tech investments with business priorities |
   121	| Hard decisions | Executive Mentor | Stress-test before committing |
   122	
   123	## Proactive Triggers
   124	
   125	Surface these without being asked when you detect them in company context:
   126	- Runway < 12 months with no fundraising plan → flag immediately
   127	- Strategy hasn't been reviewed in 2+ quarters → prompt refresh
   128	- Board meeting approaching with no prep → initiate board-prep flow
   129	- Founder spending < 20% time on strategic work → raise it
   130	- Key exec departure risk visible → escalate to CHRO
   131	
   132	## Output Artifacts
   133	
   134	| Request | You Produce |
   135	|---------|-------------|
   136	| "Help me think about strategy" | Strategic options matrix with risk-adjusted scoring |
   137	| "Prep me for the board" | Board narrative + anticipated questions + data gaps |
   138	| "Should we raise?" | Fundraising readiness assessment with timeline |
   139	| "We need to decide on X" | Decision framework with options, trade-offs, recommendation |
   140	| "How are we doing?" | CEO scorecard with traffic-light metrics |
   141	
   142	## Reasoning Technique: Tree of Thought
   143	
   144	Explore multiple futures. For every strategic decision, generate at least 3 paths. Evaluate each path for upside, downside, reversibility, and second-order effects. Pick the path with the best risk-adjusted outcome.
   145	
   146	**Stage-adaptive horizons:**
   147	- Seed: project 3m/6m/12m
   148	- Series A: project 6m/1y/2y
   149	- Series B+: project 1y/3y/5y
   150	
   151	## Communication
   152	
   153	All output passes the Internal Quality Loop before reaching the founder (see `agent-protocol/SKILL.md`).
   154	- Self-verify: source attribution, assumption audit, confidence scoring
   155	- Peer-verify: cross-functional claims validated by the owning role
   156	- Critic pre-screen: high-stakes decisions reviewed by Executive Mentor
   157	- Output format: Bottom Line → What (with confidence) → Why → How to Act → Your Decision
   158	- Results only. Every finding tagged: 🟢 verified, 🟡 medium, 🔴 assumed.
   159	
   160	## Context Integration
   161	
   162	- **Always** read `company-context.md` before responding (if it exists)
   163	- **During board meetings:** Use only your own analysis in Phase 2 (no cross-pollination)
   164	- **Invocation:** You can request input from other roles: `[INVOKE:role|question]`
   165	
   166	## Resources
   167	- `references/executive_decision_framework.md` — Go/No-Go framework, crisis playbook, capital allocation
   168	- `references/board_governance_investor_relations.md` — Board management, investor communication, fundraising
   169	- `references/leadership_organizational_culture.md` — Culture development, CEO routines, succession planning
   170	
Aqui estão os dois 5W2H:

---

## 5W2H — `/business-docx-pipeline`

### **WHAT (O quê)**
Um **motor de produção documental orientado a grafo** que transforma contexto bruto (brief, notas, ideia, arquivo) em um corpus de documentos de negócio canônico, auditável e com rastreabilidade epistêmica. Não é um gerador de templates — é um executor de dependências.

**Documentos que pode produzir:** Vision Framing, MRD-lite, PRFAQ-lite, BRD-lite, PRD-lite, FRD-lite, NFR, ADR, Roadmap, User Stories, Backlog, Release Plan, SOP, Runbook, Data Integration Spec + `.docx` workbook, `.xlsx` financeiro e prompt Linear.

---

### **WHY (Por quê)**
Porque documentos de negócio têm dependências reais — um PRD sem MRD gera premissas falsas que se propagam downstream. A skill enforce essa ordem e impede que hipóteses virem fatos por descuido. Resultado: corpus auditável onde cada claim é rastreável até sua fonte (FATO / INFERÊNCIA / HIPÓTESE).

---

### **WHO (Quem)**
**Operador:** Leonardo como founder/product strategist.
**Consumidores dos outputs:** investidores, times de produto, operações, Linear (backlog).

---

### **WHERE (Onde)**
Opera via Claude.ai + filesystem. Integrações de saída: `.docx` (python-docx), `.xlsx` (spreadsheet), Linear (via prompt gerado), Google Drive (opcional upload). Agentes internos: Agent 1 (pesquisa de mercado) e Agent 2 (auditoria de ops digitais).

---

### **WHEN (Quando)**
| Gatilho | Perfil ativado |
|---|---|
| "pesquisa", "mercado", "ICP" | `market-research` |
| "produto", "MVP", "PRD" | `product` |
| "lançar", "campanha", "proposta" | `go-to-market` |
| "processo", "SOP", "runbook" | `operations` |
| "corpus completo", "playbook" | `full-corpus` |

---

### **HOW (Como)**
Pipeline em **5 fases** com **5 gates humanos obrigatórios**:

```
Fase 0: Intake → Context Pack ──→ Gate 0 (confirmar premissas)
Fase 1: Document Graph Planning ──→ Gate 1 (aprovar grafo de deps)
Fase 2: Discovery Layer (MRD, PRFAQ, BRD) ──→ Gate 2
Fase 3: Product Layer (PRD, FRD, NFR, ADR) ──→ Gate 3
Fase 4: Execution Layer (Roadmap, Stories, Backlog) ──→ Gate 4
Fase 5: Operations Layer → build_corpus.py → ZIP + .docx + .xlsx
```

Quando falta input: emite **Gap Report** e bloqueia. Nunca inventa dado para preencher lacuna.

---

### **HOW MUCH (Quanto)**
- **13+ tipos de documento** cobrindo discovery → execução → operações
- **5 perfis** de workflow pré-configurados
- **5 gates** humanos — nenhum documento downstream gerado sem aprovação upstream
- **3 labels epistêmicos** em cada claim de cada documento
- **4 formatos de output**: `.docx`, `.xlsx`, `.zip`, prompt Linear
- **Regra dura**: hipótese nunca vira fato sem aprovação explícita do usuário

---
---

## 5W2H — `/ceo-advisor`

### **WHAT (O quê)**
Um advisor executivo de nível C que oferece frameworks de liderança estratégica em 5 domínios: **Vision & Strategy**, **Capital & Resource Management**, **Stakeholder Leadership**, **Organizational Culture**, e **Board & Investor Management**. Produz análises com scoring de risco, cenários financeiros e artefatos prontos para board.

---

### **WHY (Por quê)**
CEOs — especialmente founders solo — tomam decisões de alto impacto sem peer review executivo. A skill preenche esse gap como "Executive Mentor" disponível on-demand, aplicando Tree of Thought (mínimo 3 caminhos por decisão) e sinalizando proativamente red flags antes de virarem crises.

---

### **WHO (Quem)**
**Operador primário:** Leonardo como founder/CEO da Bússola PME.
**Personas secundárias:** qualquer founder em estágio Seed–Series B que precise de pensamento estratégico estruturado sem contratar um advisor externo.

---

### **WHERE (Onde)**
Opera inteiramente em contexto conversacional. Scripts opcionais: `strategy_analyzer.py` (scoring de opções estratégicas) e `financial_scenario_analyzer.py` (modelo base/bull/bear). Lê `company-context.md` se existir para personalizar respostas ao contexto da empresa.

---

### **WHEN (Quando)**
| Situação detectada | Ação proativa |
|---|---|
| Runway < 12 meses sem plano de fundraising | Flag imediato |
| Estratégia não revisada há 2+ quarters | Prompt de refresh |
| Board meeting próximo sem prep | Inicia board-prep flow |
| Founder < 20% do tempo em trabalho estratégico | Levanta o ponto |
| Risco de saída de exec-chave visível | Escalona para CHRO |

Ativa também em: "strategic planning", "board meeting", "investor update", "fundraising", "cultura organizacional", "decisão difícil".

---

### **HOW (Como)**
Usa **Tree of Thought** como técnica-base — toda decisão estratégica gera ≥ 3 caminhos avaliados por: upside, downside, reversibilidade e efeitos de segunda ordem. Output passa por **Internal Quality Loop**:

```
Self-verify (fontes, premissas, confidence score)
  → Peer-verify (claims cross-funcionais validados pelo role dono)
    → Critic pre-screen (decisões de alto risco passam pelo Executive Mentor)
      → Output: Bottom Line → What → Why → How to Act → Your Decision
```

Cada finding é taggeado: 🟢 verificado / 🟡 médio / 🔴 assumido.

**Horizontes adaptativos por estágio:**
- Seed/Pre-PMF → 3m / 6m / 12m
- Series A → 6m / 1a / 2a
- Series B+ → 1a / 3a / 5a

---

### **HOW MUCH (Quanto)**
- **5 domínios** de liderança executiva cobertos
- **9 stakeholder types** na matriz de integração C-suite
- **5 triggers proativos** monitorados sem necessidade de pergunta
- **7 artefatos de output** mapeados (scorecard, decision framework, board narrative, etc.)
- **9 métricas** no CEO Dashboard com frequência e target por categoria
- **1 princípio central**: resultados com atribuição de confiança — nunca análise sem tag de certeza

---

**Diferença crítica entre as duas skills:**

| Dimensão | `business-docx-pipeline` | `ceo-advisor` |
|---|---|---|
| **Natureza** | Motor de produção documental | Advisor de raciocínio estratégico |
| **Output principal** | Corpus de documentos (.docx/.zip) | Frameworks, matrizes, narrativas |
| **Gates** | 5 gates formais hardcoded | Nenhum gate — é consultivo |
| **Bloqueio** | Bloqueia se falta input | Sinaliza gaps, mas avança com hipóteses |
| **Uso típico** | "Preciso do PRD do Bússola" | "Devo levantar capital agora?" |

---

**Você** _2026-04-22_

5w2h /agent-spec-normalizer /executive-artifact-system /hunter4-1

---

**Claude** _2026-04-22_

1	---
     2	name: agent-spec-normalizer
     3	description: >
     4	  Convert messy, narrative, fragmented, or partially structured text into a clean,
     5	  agent-native operational spec, system instruction, workflow brief, or architecture-grade
     6	  prompt. Use this when a user asks to normalize, rewrite, harden, operationalize, or make
     7	  a prompt “more agent-native,” “more technical,” “more structured,” “copy-paste ready,” or
     8	  “ready for system instructions.” This skill preserves intent, removes noise, adds missing
     9	  structure, and routes the source material into the most appropriate execution format.
    10	when_to_use: >
    11	  Trigger when the request is about prompt normalization, agent prompt conversion,
    12	  system instruction hardening, workflow-spec formatting, architecture-spec restructuring,
    13	  or converting informal notes into a reusable operational instruction set.
    14	argument-hint: "[target-format optional]"
    15	---
    16	
    17	# Purpose
    18	
    19	Turn raw text into a rigorous, reusable instruction artifact without flattening the original intent.
    20	
    21	Use this skill when the user provides:
    22	- a messy prompt
    23	- narrative notes that should become an agent instruction
    24	- a PRD, workflow, or architecture draft that should become an operational spec
    25	- a document that needs to be converted into a stricter prompt format
    26	- a request for a “system prompt,” “agent-native prompt,” “spec,” “playbook,” or “copy-paste ready instruction”
    27	
    28	## Core operating rule
    29	
    30	Do not casually rewrite.
    31	Do not summarize away important meaning.
    32	Do not genericize specialized intent.
    33	
    34	Preserve the source intent, then normalize it into a clearer operational artifact with:
    35	- explicit objective
    36	- explicit scope
    37	- explicit rules
    38	- explicit outputs
    39	- reduced ambiguity
    40	- higher execution quality
    41	
    42	## Routing logic
    43	
    44	First classify the best destination format. Choose the tightest useful format, not the biggest one.
    45	
    46	Possible destination formats:
    47	1. system instruction
    48	2. agent prompt
    49	3. workflow spec
    50	4. architecture spec
    51	5. decomposition brief
    52	6. execution playbook
    53	7. policy-style instruction set
    54	8. communication prompt
    55	
    56	Use the routing matrix in [references/routing-matrix.md](references/routing-matrix.md) when the target format is ambiguous.
    57	
    58	## Normalization procedure
    59	
    60	### 1) Extract the real objective
    61	Separate:
    62	- the real objective
    63	- the proposed solution
    64	- the structural weaknesses of the source text
    65	
    66	### 2) Preserve intent
    67	Keep business logic, conceptual direction, and operational meaning unless the source is internally contradictory.
    68	
    69	If the source is contradictory:
    70	- resolve to the most coherent interpretation
    71	- keep the result faithful to the user’s likely intent
    72	- avoid noisy meta-commentary unless the user explicitly asks for analysis
    73	
    74	### 3) Remove noise
    75	Eliminate:
    76	- repetition
    77	- scattered narrative
    78	- rhetorical filler
    79	- duplicated instructions
    80	- ornamental explanation with no execution value
    81	
    82	### 4) Add missing structure
    83	Introduce only the structure needed for reliable execution.
    84	
    85	Common structure blocks:
    86	- `<role>`
    87	- `<mission>`
    88	- `<objective>`
    89	- `<scope>`
    90	- `<input_handling>`
    91	- `<operating_logic>`
    92	- `<required_outputs>`
    93	- `<work_phases>`
    94	- `<decision_rules>`
    95	- `<constraints>`
    96	- `<quality_bar>`
    97	- `<output_format>`
    98	- `<final_contract>`
    99	
   100	### 5) Make implicit requirements explicit
   101	Convert hidden expectations into explicit requirements when necessary for execution quality.
   102	
   103	### 6) Optimize for agent use
   104	The output should feel:
   105	- less like prose
   106	- less like commentary
   107	- more like a usable system instruction or operational spec
   108	
   109	## Output rules
   110	
   111	- Output the normalized artifact first.
   112	- Keep commentary minimal unless the user asks for explanation.
   113	- Preserve the source language unless the user asks for another target language.
   114	- Prefer dense, modular blocks over long narrative paragraphs.
   115	- Do not over-engineer sections that the source text does not need.
   116	- If the user asks for “full directory,” “Skill.md,” or “export-ready package,” follow the directory guidance in [references/anthropic-skills-guidelines.md](references/anthropic-skills-guidelines.md) and the templates in `templates/`.
   117	
   118	## Default output shape
   119	
   120	Unless the request strongly suggests another form, use:
   121	
   122	```xml
   123	<role>
   124	[who the agent is]
   125	</role>
   126	
   127	<mission>
   128	[what the agent must do]
   129	</mission>
   130	
   131	<objective>
   132	[real objective behind the instruction]
   133	</objective>
   134	
   135	<scope>
   136	[what is included and bounded]
   137	</scope>
   138	
   139	<input_handling>
   140	[how to read and interpret source material]
   141	</input_handling>
   142	
   143	<operating_logic>
   144	[how the agent should reason, classify, decide, or execute]
   145	</operating_logic>
   146	
   147	<required_outputs>
   148	[what must be produced]
   149	</required_outputs>
   150	
   151	<work_phases>
   152	[ordered stages if useful]
   153	</work_phases>
   154	
   155	<decision_rules>
   156	[what must be decided, compared, classified, or justified]
   157	</decision_rules>
   158	
   159	<constraints>
   160	[what must not be lost, changed, omitted, or generalized]
   161	</constraints>
   162	
   163	<quality_bar>
   164	[quality requirements]
   165	</quality_bar>
   166	
   167	<output_format>
   168	[language, formatting, structure, style]
   169	</output_format>
   170	
   171	<final_contract>
   172	[what makes the output acceptable]
   173	</final_contract>
   174	```
   175	
   176	## Additional resources
   177	
   178	- For Anthropic skill structure, frontmatter, invocation control, supporting files, and subagent patterns, see [references/anthropic-skills-guidelines.md](references/anthropic-skills-guidelines.md).
   179	- For routing logic by source-text type, see [references/routing-matrix.md](references/routing-matrix.md).
   180	- For normalization rules and transformation heuristics, see [references/normalization-rules.md](references/normalization-rules.md).
   181	- For ready-made output skeletons, see the files in [templates/](templates/).
   182	- For example conversions, see [examples/](examples/).
   183	
   184	## Final behavior
   185	
   186	Return a stricter, cleaner, more operational artifact than the source.
   187	Make it copy-paste ready.
   188	Make it reusable.
   189	Do not dilute the original intent.
   190	
Path not found: /mnt/skills/user/executive-artifact-system/SKILL.md
{"returncode":1,"stdout":"","stderr":""}
{"returncode":0,"stdout":"/mnt/skills/user\n/mnt/skills/user/projects-to-linear\n/mnt/skills/user/projects-to-linear/references\n/mnt/skills/user/bussola-consultative-faq\n/mnt/skills/user/bussola-consultative-faq/references\n/mnt/skills/user/bussola-consultative-faq/scripts\n/mnt/skills/user/bussola-consultative-faq/templates\n/mnt/skills/user/bussola-orchestrator\n/mnt/skills/user/bussola-orchestrator/references\n/mnt/skills/user/bussola-orchestrator/scripts\n/mnt/skills/user/bussola-orchestrator/templates\n/mnt/skills/user/agent-spec-normalizer\n/mnt/skills/user/agent-spec-normalizer/examples\n/mnt/skills/user/agent-spec-normalizer/references\n/mnt/skills/user/agent-spec-normalizer/scripts\n/mnt/skills/user/agent-spec-normalizer/templates\n/mnt/skills/user/bussola-case1-showroom\n/mnt/skills/user/bussola-case1-showroom/references\n/mnt/skills/user/bussola-case1-showroom/scripts\n/mnt/skills/user/bussola-case1-showroom/assets\n/mnt/skills/user/bussola-case1-showroom/assets/showcase_branding\n/mnt/skills/user/bussola-case1-showroom/templates\n/mnt/skills/user/bussola-deliverable-forge\n/mnt/skills/user/bussola-deliverable-forge/references\n/mnt/skills/user/bussola-deliverable-forge/scripts\n/mnt/skills/user/bussola-deliverable-forge/assets\n/mnt/skills/user/bussola-deliverable-forge/assets/branding_default\n/mnt/skills/user/bussola-deliverable-forge/templates\n/mnt/skills/user/bussola-simulation-lab\n/mnt/skills/user/bussola-simulation-lab/references\n","stderr":""}
{"returncode":0,"stdout":"/mnt/skills/user\n/mnt/skills/user\n/mnt/skills/user/projects-to-linear\n/mnt/skills/user/bussola-consultative-faq\n/mnt/skills/user/bussola-orchestrator\n/mnt/skills/user/agent-spec-normalizer\n/mnt/skills/user/bussola-case1-showroom\n/mnt/skills/user/bussola-deliverable-forge\n/mnt/skills/user/bussola-simulation-lab\n/mnt/skills/user/bussola-diagnostic-engine\n/mnt/skills/user/business-docx-pipeline\n/mnt/skills/user/bussola-personalization\n/mnt/skills/user/bussola-execution-bridge\n/mnt/skills/user/ceo-advisor\n","stderr":""}
{"returncode":0,"stdout":"/mnt/skills/examples/algorithmic-art/SKILL.md\n/mnt/skills/examples/brand-guidelines/SKILL.md\n/mnt/skills/examples/canvas-design/SKILL.md\n/mnt/skills/examples/doc-coauthoring/SKILL.md\n/mnt/skills/examples/internal-comms/SKILL.md\n/mnt/skills/examples/mcp-builder/SKILL.md\n/mnt/skills/examples/skill-creator/SKILL.md\n/mnt/skills/examples/slack-gif-creator/SKILL.md\n/mnt/skills/examples/theme-factory/SKILL.md\n/mnt/skills/examples/web-artifacts-builder/SKILL.md\n/mnt/skills/public/docx/SKILL.md\n/mnt/skills/public/file-reading/SKILL.md\n/mnt/skills/public/frontend-design/SKILL.md\n/mnt/skills/public/pdf-reading/SKILL.md\n/mnt/skills/public/pdf/SKILL.md\n/mnt/skills/public/pptx/SKILL.md\n/mnt/skills/public/product-self-knowledge/SKILL.md\n/mnt/skills/public/xlsx/SKILL.md\n/mnt/skills/user/agent-spec-normalizer/SKILL.md\n/mnt/skills/user/business-docx-pipeline/SKILL.md\n/mnt/skills/user/bussola-case1-showroom/SKILL.md\n/mnt/skills/user/bussola-consultative-faq/SKILL.md\n/mnt/skills/user/bussola-deliverable-forge/SKILL.md\n/mnt/skills/user/bussola-diagnostic-engine/SKILL.md\n/mnt/skills/user/bussola-execution-bridge/SKILL.md\n/mnt/skills/user/bussola-orchestrator/SKILL.md\n/mnt/skills/user/bussola-personalization/SKILL.md\n/mnt/skills/user/bussola-simulation-lab/SKILL.md\n/mnt/skills/user/ceo-advisor/SKILL.md\n/mnt/skills/user/projects-to-linear/SKILL.md\n","stderr":""}
`executive-artifact-system` e `hunter4-1` têm entradas em `available_skills` mas **seus arquivos `SKILL.md` não estão presentes no filesystem** — só as descrições de triggering existem. Faço o 5W2H do `agent-spec-normalizer` com leitura completa, e dos outros dois com base nas descrições disponíveis, marcando a limitação.

---

## 5W2H — `/agent-spec-normalizer`

### **WHAT (O quê)**
Um **conversor de intenção → instrução operacional**. Pega texto cru (narrativa, prompt bagunçado, notas de PRD, briefing) e produz um artefato rigoroso, copy-paste ready: system instruction, agent prompt, workflow spec, architecture spec, playbook ou policy instruction set.

Não resume. Não generaliza. Normaliza preservando intent.

---

### **WHY (Por quê)**
Prompts e specs mal estruturados geram execução inconsistente. A skill elimina ambiguidade estrutural sem perder o significado original — transforma "o que o usuário quis dizer" em "o que um agente consegue executar de forma confiável e repetível".

---

### **WHO (Quem)**
**Operador:** Leonardo construindo skills, system prompts e specs operacionais para Bússola PME e outros sistemas.
**Consumidor do output:** Claude (ou qualquer LLM) que vai executar a instrução normalizada.

---

### **WHERE (Onde)**
Opera inteiramente em contexto conversacional. Referências internas: `routing-matrix.md` (quando o formato de destino é ambíguo), `normalization-rules.md` (heurísticas de transformação), `anthropic-skills-guidelines.md` (para output em formato SKILL.md), `templates/` (skeletons prontos).

---

### **WHEN (Quando)**
| Gatilho | Ação |
|---|---|
| "normaliza esse prompt" | Classifica formato → normaliza |
| "deixa isso agent-native" | Aplica estrutura XML modular |
| "transforma em system instruction" | Rota para format 1 |
| "cria o SKILL.md disso" | Segue `anthropic-skills-guidelines.md` + templates |
| "reescreve mais técnico" | Remove ruído + explicita implícitos |
| Texto > 200 palavras com instrução dispersa | Detecção proativa |

---

### **HOW (Como)**
Pipeline de 6 passos em sequência:

```
1. Extrair objetivo real (separar: objetivo ≠ solução proposta ≠ fraquezas estruturais)
2. Preservar intent (lógica de negócio, direção conceitual)
3. Remover ruído (repetição, filler, ornamento sem valor de execução)
4. Adicionar estrutura faltante (apenas o necessário — não over-engineer)
5. Tornar implícitos explícitos (expectativas ocultas → requisitos declarados)
6. Otimizar para execução por agente (menos prosa, mais spec)
```

Output padrão: bloco XML com `<role>`, `<mission>`, `<objective>`, `<scope>`, `<operating_logic>`, `<constraints>`, `<quality_bar>`, `<final_contract>` — mais os blocos relevantes ao caso.

---

### **HOW MUCH (Quanto)**
- **8 formatos de destino** possíveis (system instruction → communication prompt)
- **13 blocos estruturais** no template XML padrão
- **4 arquivos de referência** + diretório de templates e exemplos
- **1 regra central**: output mais estrito, limpo e operacional que o input — sempre

---
---

## 5W2H — `/executive-artifact-system`
*⚠️ Baseado apenas na descrição de triggering — SKILL.md não encontrado no filesystem*

### **WHAT (O quê)**
Um sistema unificado de artefatos executivos com design consistente **McKinsey/PMO** aplicado a múltiplos formatos de saída: PDF playbooks, dashboards React/HTML, relatórios XLSX e visualizações algorítmicas. Garante mesma paleta, tipografia e hierarquia visual em todos os outputs.

### **WHY (Por quê)**
Entregáveis executivos produzidos por ferramentas diferentes perdem coerência visual e sinalizam amadorismo. A skill resolve isso impondo um design system compartilhado que funciona tanto para um PDF de board quanto para um dashboard interativo.

### **WHO (Quem)**
Leonardo produzindo entregáveis para clientes PME e investidores da Bússola PME, onde a consistência visual é parte do posicionamento premium do produto.

### **WHERE (Onde)**
Formatos de saída: `.pdf`, `.html`/React, `.xlsx`. Provável integração com scripts Python para geração dos arquivos.

### **WHEN (Quando)**
Ativa em: "make a PDF", "executive PDF", "build a dashboard", "execution cockpit", "McKinsey style", "board-ready", "consulting grade", "artefato executivo", "playbook", "cockpit", "mesmo design/estilo". Também quando um plano estruturado (sprints, objetivos, capacidade) precisa ser transformado em formato visual.

### **HOW (Como)**
*Não aferível sem o SKILL.md completo.* Pela descrição, opera como wrapper de design sobre outros geradores de artefato — aplica tokens de branding (paleta, fonte, hierarquia) como camada transversal.

### **HOW MUCH (Quanto)**
- **4 formatos** de output (PDF, React/HTML, XLSX, visualização)
- **1 design system** unificado aplicado a todos
- *Profundidade de cobertura não aferível — arquivo ausente*

---
---

## 5W2H — `/hunter4-1`
*⚠️ Baseado apenas na descrição de triggering — SKILL.md não encontrado no filesystem*

### **WHAT (O quê)**
Um **Decision Intelligence Operating System para ALTAS Habilidades.com** — sistema de tomada de decisão para founders em condições de alta ambiguidade e alto risco. Opera via 5 modos cognitivos: `EXPLORE`, `EVALUATE`, `DECIDE`, `EXECUTE`, `REVIEW`.

### **WHY (Por quê)**
Decisões de founder sob incerteza têm custo assimétrico: erro de execução é recuperável, erro de direção estratégica não é. Hunter 4.1 força o routing para o modo cognitivo mínimo suficiente — evita usar `DECIDE` onde `EXPLORE` era o que a situação pedia.

### **WHO (Quem)**
Leonardo como founder de Bússola PME, tomando decisões sobre: oportunidades de mercado, escolha de ICP, priorização de produto, seleção de canal, planejamento de execução, review de resultados reais.

### **WHERE (Onde)**
Opera em contexto conversacional. Não há evidência de integrações externas na descrição — foco em raciocínio estruturado, não em automações.

### **WHEN (Quando)**
Ativa em decisões **ambíguas + alto risco** do founder:
- Oportunidades de mercado
- Escolha de ICP
- Priorização / trade-offs
- Direção de produto
- Seleção de canal
- Planejamento de execução
- Review de resultados reais

**Não** é para decisões operacionais simples ou execução já definida.

### **HOW (Como)**
*Arquitetura interna não aferível sem SKILL.md.* Pela descrição, o fluxo é:
```
Detectar tipo de decisão → Rotear para modo mínimo suficiente
EXPLORE  → mapear espaço de possibilidades
EVALUATE → comparar opções com critérios explícitos
DECIDE   → commitar com raciocínio documentado
EXECUTE  → plano de ação derivado da decisão
REVIEW   → avaliar resultados reais vs hipóteses
```

### **HOW MUCH (Quanto)**
- **5 modos cognitivos** cobrindo o ciclo completo de decisão → execução → aprendizado
- **7+ domínios** de decisão cobertos
- *Profundidade de protocolos por modo não aferível — arquivo ausente*

---

## Diagnóstico de gaps no skill registry

| Skill | SKILL.md no filesystem | Análise disponível |
|---|---|---|
| `agent-spec-normalizer` | ✅ Completo | 100% |
| `executive-artifact-system` | ❌ Ausente | ~40% (só descrição) |
| `hunter4-1` | ❌ Ausente | ~40% (só descrição) |

**Recomendação:** Se essas duas skills existem instaladas em outro ambiente (ex: Claude Code local), vale exportar os SKILL.md para o filesystem de skills do Claude.ai para que o sistema as invoque com instrução completa — hoje elas disparam pelo trigger mas executam sem contexto interno.

---

**Você** _2026-04-22_

/skill-creator Use this stack above to desyng; Create a skill Go beyond the basics

---

**Claude** _2026-04-22_

60	Check available MCPs - if useful for research (searching docs, finding similar skills, looking up best practices), research in parallel via subagents if available, otherwise inline. Come prepared with context to reduce burden on the user.
    61	
    62	### Write the SKILL.md
    63	
    64	Based on the user interview, fill in these components:
    65	
    66	- **name**: Skill identifier
    67	- **description**: When to trigger, what it does. This is the primary triggering mechanism - include both what the skill does AND specific contexts for when to use it. All "when to use" info goes here, not in the body. Note: currently Claude has a tendency to "undertrigger" skills -- to not use them when they'd be useful. To combat this, please make the skill descriptions a little bit "pushy". So for instance, instead of "How to build a simple fast dashboard to display internal Anthropic data.", you might write "How to build a simple fast dashboard to display internal Anthropic data. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data, even if they don't explicitly ask for a 'dashboard.'"
    68	- **compatibility**: Required tools, dependencies (optional, rarely needed)
    69	- **the rest of the skill :)**
    70	
    71	### Skill Writing Guide
    72	
    73	#### Anatomy of a Skill
    74	
    75	```
    76	skill-name/
    77	├── SKILL.md (required)
    78	│   ├── YAML frontmatter (name, description required)
    79	│   └── Markdown instructions
    80	└── Bundled Resources (optional)
    81	    ├── scripts/    - Executable code for deterministic/repetitive tasks
    82	    ├── references/ - Docs loaded into context as needed
    83	    └── assets/     - Files used in output (templates, icons, fonts)
    84	```
    85	
    86	#### Progressive Disclosure
    87	
    88	Skills use a three-level loading system:
    89	1. **Metadata** (name + description) - Always in context (~100 words)
    90	2. **SKILL.md body** - In context whenever skill triggers (<500 lines ideal)
    91	3. **Bundled resources** - As needed (unlimited, scripts can execute without loading)
    92	
    93	These word counts are approximate and you can feel free to go longer if needed.
    94	
    95	**Key patterns:**
    96	- Keep SKILL.md under 500 lines; if you're approaching this limit, add an additional layer of hierarchy along with clear pointers about where the model using the skill should go next to follow up.
    97	- Reference files clearly from SKILL.md with guidance on when to read them
    98	- For large reference files (>300 lines), include a table of contents
    99	
   100	**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:
   101	```
   102	cloud-deploy/
   103	├── SKILL.md (workflow + selection)
   104	└── references/
   105	    ├── aws.md
   106	    ├── gcp.md
   107	    └── azure.md
   108	```
   109	Claude reads only the relevant reference file.
   110	
   111	#### Principle of Lack of Surprise
   112	
   113	This goes without saying, but skills must not contain malware, exploit code, or any content that could compromise system security. A skill's contents should not surprise the user in their intent if described. Don't go along with requests to create misleading skills or skills designed to facilitate unauthorized access, data exfiltration, or other malicious activities. Things like a "roleplay as an XYZ" are OK though.
   114	
   115	#### Writing Patterns
   116	
   117	Prefer using the imperative form in instructions.
   118	
   119	**Defining output formats** - You can do it like this:
   120	```markdown
[486 lines total]
Tenho o suficiente. Vou projetar a skill completa com full directory — SKILL.md + referências + assets.
File created successfully: /home/claude/sebrae-build-orchestrator/SKILL.md
File created successfully: /home/claude/sebrae-build-orchestrator/references/asset-types.md
File created successfully: /home/claude/sebrae-build-orchestrator/references/anti-patterns.md
File created successfully: /home/claude/sebrae-build-orchestrator/references/output-contracts.md
---
title: "Problemas na estrutura da skill criada"
date: 2026-04-26
account: adm.stdah@gmail.com
uuid: 482e25f8-5759-48b5-942f-068723bf309a
messages: 4
tags: []
context: ""
---

**Você** _2026-04-26_

/skill-creator Criei uma skill mas estou com problemas na estrryura scaneie e audite a /scripity veja a pasta que tenho oque tem de errado?

---

**Claude** _2026-04-26_

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
21K	/mnt/skills/user/scripity
17K	/mnt/skills/user/scripity/SKILL.md

{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/Scrpity_00.zip\n   creating: scripity_audit/Scrpity.00/\n   creating: scripity_audit/Scrpity.00/refrences/\n   creating: scripity_audit/Scrpity.00/skill/\n   creating: scripity_audit/Scrpity.00/tests/\n   creating: scripity_audit/Scrpity.00/scrpits/\n   creating: scripity_audit/Scrpity.00/templates/\n  inflating: scripity_audit/Scrpity.00/refrences/case_leonardo.yaml  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/refrences/._case_leonardo.yaml  \n  inflating: scripity_audit/Scrpity.00/refrences/case_maria_exemplo.yaml  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/refrences/._case_maria_exemplo.yaml  \n  inflating: scripity_audit/Scrpity.00/skill/Skill.md.md  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/skill/._Skill.md.md  \n  inflating: scripity_audit/Scrpity.00/tests/TODO_CORPUS-LEONARDOCASE.md  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/tests/._TODO_CORPUS-LEONARDOCASE.md  \n  inflating: scripity_audit/Scrpity.00/scrpits/scripity.py  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/scrpits/._scripity.py  \n  inflating: scripity_audit/Scrpity.00/scrpits/scripity.skill  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/scrpits/._scripity.skill  \n  inflating: scripity_audit/Scrpity.00/templates/metadata_template.yaml  \n  inflating: scripity_audit/__MACOSX/Scrpity.00/templates/._metadata_template.yaml  \n","stderr":""}
{"returncode":0,"stdout":"/tmp/scripity_audit/Scrpity.00\n/tmp/scripity_audit/Scrpity.00/refrences\n/tmp/scripity_audit/Scrpity.00/refrences/case_leonardo.yaml\n/tmp/scripity_audit/Scrpity.00/refrences/case_maria_exemplo.yaml\n/tmp/scripity_audit/Scrpity.00/scrpits\n/tmp/scripity_audit/Scrpity.00/scrpits/scripity.py\n/tmp/scripity_audit/Scrpity.00/scrpits/scripity.skill\n/tmp/scripity_audit/Scrpity.00/skill\n/tmp/scripity_audit/Scrpity.00/skill/Skill.md.md\n/tmp/scripity_audit/Scrpity.00/templates\n/tmp/scripity_audit/Scrpity.00/templates/metadata_template.yaml\n/tmp/scripity_audit/Scrpity.00/tests\n/tmp/scripity_audit/Scrpity.00/tests/TODO_CORPUS-LEONARDOCASE.md\n","stderr":""}
     1	---
     2	name: scripity
     3	description: >
     4	  Motor de geração de corpus documental de negócios em escala. Gera os 17 artefatos
     5	  (A01–A17) + análise de 19 frameworks (F1–F7) no padrão-ouro a partir de metadados
     6	  de qualquer produto/pessoa. ATIVE quando o usuário disser: "novo corpus", "gerar corpus
     7	  para [nome]", "rodar scripity", "criar 17 artefatos", "gerar corpus de [produto]",
     8	  "scripity para [pessoa]", "corpus completo de [produto]", "quero gerar meu corpus",
     9	  "gerar A01 a A17", "montar corpus padrão-ouro", "gerar documentação de produto completa".
    10	  ATIVE também quando o usuário colar um YAML de metadados e pedir para gerar o corpus.
    11	  NÃO ATIVE para perguntas isoladas sobre artefatos ou documentação avulsa.
    12	---
    13	
    14	# Scripity — Corpus Generator
    15	
    16	Você é o **engine Scripity**. Seu trabalho é pegar metadados de uma pessoa/produto e
    17	gerar o corpus documental completo no padrão-ouro: **17 artefatos (A01–A17) + análise
    18	de 19 frameworks (F1–F7)**, com o mesmo nível de granularidade, formato e profundidade
    19	do documento de referência.
    20	
    21	---
    22	
    23	## REGRA GOVERNANTE (nunca viole)
    24	
    25	```
    26	DONO DO CORPUS   → a pessoa cujos metadados foram fornecidos
    27	OBJETO PRIMÁRIO  → o produto/serviço/skill dessa pessoa
    28	FIXTURE          → caso de teste/demo — NÃO é cliente real nem dona dos artefatos
    29	PROIBIÇÃO        → gerar A01–A17 como documentos do negócio da fixture
    30	OBRIGAÇÃO        → todos os artefatos descrevem o produto do dono
    31	LIMITE MVP       → primeira execução: exatamente 3 outputs definidos nos metadados
    32	EPISTÊMICA       → separar sempre: FATO | HIPÓTESE | INFERÊNCIA | LACUNA | RECOMENDAÇÃO
    33	ANTI-ALUCINAÇÃO  → não inventar dados de mercado, números ou regras oficiais
    34	```
    35	
    36	---
    37	
    38	## FASE 0 — INTAKE
    39	
    40	Se os metadados ainda **não foram fornecidos**, conduza o intake conversacional.
    41	Faça as perguntas em blocos de 2-3 por vez (não tudo de uma vez):
    42	
    43	**Bloco A — Identidade:**
    44	1. Qual é o seu nome? (dono do corpus)
    45	2. Qual é o nome do produto/skill/serviço?
    46	3. Qual é a tagline do produto? (1 frase de posicionamento)
    47	
    48	**Bloco B — Usuários:**
    49	4. Quem são os usuários primários do produto? (quem usa a ferramenta)
    50	5. Quem são os clientes finais dos usuários? (quem recebe o resultado)
    51	
    52	**Bloco C — Fixture e contexto:**
    53	6. Qual é a fixture? (personagem fictício para demonstração — ex: "Ana, estúdio de beleza")
    54	7. Qual é o problema central que o produto resolve?
    55	8. Qual é a solução proposta?
    56	
    57	**Bloco D — Restrições (aceita defaults se usuário não souber):**
    58	9. Horizonte de tempo? (default: 90 dias)
    59	10. Quantos outputs na primeira execução? (default: 3) — e quais são eles?
    60	11. Contexto do founder? (objetivo estratégico pessoal, optional)
    61	
    62	Se o usuário fornecer um **YAML** diretamente, extraia os campos e confirme antes de gerar.
    63	
    64	Ao finalizar o intake, exiba um resumo dos metadados e aguarde confirmação:
    65	`"✅ Metadados confirmados. Posso iniciar a geração do corpus?"`
    66	
    67	---
    68	
    69	## FASE 1 — GERAÇÃO DOS 17 ARTEFATOS
    70	
    71	Gere os artefatos **em sequência**, respeitando dependências.
    72	Para cada artefato, produza a seção completa no formato abaixo.
    73	
    74	### FORMATO PADRÃO DE ARTEFATO
    75	
    76	```
    77	## A0X — [Nome]
    78	
    79	| Campo | Conteúdo preenchido |
    80	|---|---|
    81	| [Campo 1] | [Conteúdo específico e denso] |
    82	| [Campo 2] | [Conteúdo específico e denso] |
    83	...
    84	```
    85	
    86	Para ADR (A11): 4 colunas `| ID | Decisão | Racional | Consequência |`
    87	Para Roadmap (A12): 5 colunas `| Fase | Horizonte | Objetivo | Entregáveis | Gate |`
    88	Para Stories (A13): 4 colunas `| ID | Persona | Story | Acceptance criteria |`
    89	Para Backlog (A14): 4 colunas `| Prioridade | Tipo | Item | Status sugerido |`
    90	Para Release (A15): 4 colunas `| Release | Nome | Escopo | Critério de release |`
    91	
    92	**Regra de conteúdo:** Cada campo deve ter conteúdo denso e específico ao produto do dono.
    93	Nunca preencher com genéricos como "a ser definido" ou "conforme necessário".
    94	
    95	---
    96	
    97	### ESPECIFICAÇÃO DOS 17 ARTEFATOS
    98	
    99	**A01 — Vision** *(sem dependências)*
   100	Campos: Nome | Objeto | Pergunta-chave | North Star | Usuário primário | Cliente final |
   101	Problema central | Solução proposta | Horizonte de sucesso | Métricas de sucesso | Fora de escopo
   102	
   103	North Star = 1 frase memorável que captura a transformação do produto.
   104	
   105	---
   106	
   107	**A02 — MRD** *(depende de A01)*
   108	Campos: Nome | Objeto | Pergunta-chave | ICP primário | ICP secundário | Dor do usuário |
   109	Dor do cliente final | Requisito de mercado 1 a 7 | Lacunas a validar
   110	
   111	Gere exatamente 7 requisitos de mercado numerados.
   112	
   113	---
   114	
   115	**A03 — PRFAQ** *(depende de A01, A02)*
   116	Campos: Nome | Produto | Headline | Subheadline | Press release resumido |
   117	FAQ cliente 1–5 | FAQ interno 1–3
   118	
   119	Headline = estilo press release jornalístico. FAQ cliente = dúvida real do usuário.
   120	FAQ interno = dúvida estratégica do founder.
   121	
   122	---
   123	
   124	**A04 — Business Case** *(depende de A02, A03)*
   125	Campos: Nome | Pergunta-chave | Problema | Solução | Benefício estratégico |
   126	Benefício operacional | Benefício comercial | Benefício de carreira | Investimento principal |
   127	Modelo financeiro inicial | Hipótese comercial | Risco 1–4 (com mitigação) | Recomendação | Gate de avanço
   128	
   129	Recomendação = Go / No-Go / Go Controlado com justificativa.
   130	
   131	---
   132	
   133	**A05 — Charter** *(depende de A04)*
   134	Campos: Nome | Projeto | Sponsor | Papel do sponsor | Objetivo | Escopo IN | Escopo OUT |
   135	RACI | Milestone 1–5 | Gate 1–4 | Critério de sucesso
   136	
   137	RACI = Responsible / Accountable / Consulted / Informed explícitos.
   138	
   139	---
   140	
   141	**A06 — BRD** *(depende de A05, A02)*
   142	Campos: Nome | Objeto | BR-01 a BR-10 | Regras de negócio | Assumptions | Constraints
   143	
   144	Gere exatamente 10 requisitos de negócio (BR-01 a BR-10). Regras de negócio =
   145	proibições e obrigações explícitas.
   146	
   147	---
   148	
   149	**A07 — PRD** *(depende de A06, A05)*
   150	Campos: Nome | Produto | Persona 1–4 | Use case principal | Use case secundário |
   151	Feature 1–7 | Acceptance criteria | Non-goals | Métrica de produto
   152	
   153	Acceptance criteria no formato Dado/Quando/Então (Gherkin simplificado).
   154	4 personas distintas (founder, usuário, cliente final, avaliador externo).
   155	
   156	---
   157	
   158	**A08 — FRD** *(depende de A07, A06)*
   159	Campos: Nome | Função central | Input aceito | Pré-processamento |
   160	Etapa 1–9 | Edge case 1–5 | Output funcional | Output opcional futuro
   161	
   162	9 etapas de processamento + 5 edge cases obrigatórios.
   163	
   164	---
   165	
   166	**A09 — NFR** *(depende de A07, A06)*
   167	Formato: `| Dimensão | Requisito preenchido |`
   168	Dimensões: Simplicidade | Rastreabilidade | Segurança epistemológica | Anti-alucinação |
   169	LGPD / privacidade | Legal/contábil | Usabilidade | Performance operacional |
   170	Modularidade | Baixo custo | Portabilidade | Manutenibilidade
   171	
   172	---
   173	
   174	**A10 — ArchSpec** *(depende de A07, A09, A08)*
   175	Campos: Nome | Arquitetura | Camada 1–5 | Componentes | Fluxo de dados | Stack inicial |
   176	Integrações futuras | Estrutura sugerida | Modelo de deploy inicial | Segurança
   177	
   178	5 camadas modulares. Fluxo de dados = linear A → B → C.
   179	
   180	---
   181	
   182	**A11 — ADR** *(depende de A10, A06)*
   183	Formato 4 colunas: `| ID | Decisão | Racional | Consequência |`
   184	Gere exatamente 8 decisões: ADR-001 a ADR-008.
   185	
   186	---
   187	
   188	**A12 — Roadmap** *(depende de A07, A05, A04)*
   189	Formato 5 colunas: `| Fase | Horizonte | Objetivo | Entregáveis | Gate |`
   190	Fases: R0 | R1 | R2 | R3 | R4 | R5 | R6 | Dia [horizonte] (decisão/pivot)
   191	
   192	---
   193	
   194	**A13 — Stories** *(depende de A07, A08, A12)*
   195	Formato 4 colunas: `| ID | Persona | Story | Acceptance criteria |`
   196	Gere 8 user stories (US-001 a US-008). Formato: "Como [persona], quero [ação]."
   197	
   198	---
   199	
   200	**A14 — Backlog** *(depende de A13, A12, A09)*
   201	Formato 4 colunas: `| Prioridade | Tipo | Item | Status sugerido |`
   202	P0 = bloqueadores MVP (mínimo 4 itens). P1 = próximas entregas. P2 = pós-validação. P3 = escala.
   203	
   204	---
   205	
   206	**A15 — Release Plan** *(depende de A14, A12)*
   207	Formato 4 colunas: `| Release | Nome | Escopo | Critério de release |`
   208	Versões: v0.1 → v0.2 → v0.3 → v0.4 → v0.5 → v1.0 + regras Rollback | Comunicação | Risco
   209	
   210	---
   211	
   212	**A16 — SOP** *(depende de A07, A05, A10)*
   213	Campos: Nome | Objetivo | Pré-condição | Passo 1–11 |
   214	Gate de qualidade 1–4 | Encerramento | Novo escopo
   215	
   216	4 gates de qualidade = pergunta verificável + ação se negativo.
   217	
   218	---
   219	
   220	**A17 — Runbook** *(depende de A16, A10, A11, A15)*
   221	Campos: Nome | Dono | Sistema operado | Estado normal | Checklist normal |
   222	Operação normal 1–3 | Incidente 1–6 (com ação) | Recovery | Métricas operacionais | Próxima manutenção
   223	
   224	6 incidentes com ação de resposta documentada.
   225	
   226	---
   227	
   228	### PROTOCOLO DE GERAÇÃO — FASE 1
   229	
   230	Gere os artefatos em 3 lotes para manter contexto:
   231	- **Lote 1:** A01, A02, A03, A04, A05
   232	- **Lote 2:** A06, A07, A08, A09, A10
   233	- **Lote 3:** A11, A12, A13, A14, A15, A16, A17
   234	
   235	Entre lotes, exiba:
   236	`"📋 Lote X/3 concluído. Continuo com o próximo? [S para continuar]"`
   237	
   238	(Se o usuário ativou com "gerar tudo de uma vez", pule as pausas.)
   239	
   240	---
   241	
   242	## FASE 2 — FRAMEWORK STACK ANALYSIS (F1–F7)
   243	
   244	Após os 17 artefatos, gere a análise estratégica com os 19 frameworks organizados em 7 blocos.
   245	
   246	### FORMATO PADRÃO DE FRAMEWORK
   247	
   248	```
   249	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   250	FX — [NOME DO BLOCO]
   251	Frameworks: [FW1] | [FW2] | [FW3]
   252	Camada: [founder / consultant / product / operator]
   253	Pergunta do founder: [pergunta central]
   254	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   255	
   256	────────────────────────────────────────────────────────────────────────────────
   257	FRAMEWORK X.Y — [NOME]
   258	Aplicado a: [contexto específico do produto]
   259	────────────────────────────────────────────────────────────────────────────────
   260	
   261	┌──────────────────┬────────────────────────────────────────────────────────────┐
   262	│ [Elemento]       │ [Conteúdo extraído do corpus]                              │
   263	├──────────────────┼────────────────────────────────────────────────────────────┤
   264	│ ...              │ ...                                                        │
   265	└──────────────────┴────────────────────────────────────────────────────────────┘
   266	
   267	OUTPUT FUNDADOR (FX/[FRAMEWORK]):
   268	  → [insight 1]
   269	  → [insight 2]
   270	```
   271	
   272	---
   273	
   274	### 7 BLOCOS DO FRAMEWORK STACK
   275	
   276	**F1 — KICKOFF** | Frameworks: SCQA | BLUF | Cynefin
   277	Camada: founder + consultant
   278	Pergunta: O que exatamente estou construindo?
   279	
   280	- **SCQA:** Situation / Complication / Question / Answer aplicados à tese do produto
   281	- **BLUF:** Bottom Line Up Front — declaração executiva em 5 elementos
   282	- **Cynefin:** Classificar domínio (Simple/Complicated/Complex/Chaotic) + implicação
   283	
   284	---
   285	
   286	**F2 — DIAGNÓSTICO** | Frameworks: SWOT | 5Whys | Ishikawa | Porter | JTBD | TOC
   287	Camada: consultant + simulation (fixture)
   288	Pergunta: O sistema consegue pensar como consultor?
   289	
   290	- **SWOT:** Do produto (não do negócio da fixture)
   291	- **5Whys:** Causa raiz do problema que o produto resolve
   292	- **Ishikawa:** Diagrama de causa e efeito (texto estruturado)
   293	- **Porter:** 5 forças aplicadas ao mercado do produto
   294	- **JTBD:** Jobs-to-be-Done do usuário primário e cliente final
   295	- **TOC:** Teoria das Restrições — identificar gargalo principal
   296	
   297	---
   298	
   299	**F3 — PRIORIZAÇÃO** | Frameworks: GUT | Pareto | MECE
   300	Camada: product + consultant
   301	Pergunta: O que fazer primeiro para gerar mais impacto com menos esforço?
   302	
   303	- **GUT:** Gravidade / Urgência / Tendência dos problemas e decisões do backlog
   304	- **Pareto:** 20% de esforço que gera 80% do valor — identificar os itens P0 reais
   305	- **MECE:** Validar que o backlog é Mutually Exclusive, Collectively Exhaustive
   306	
   307	---
   308	
   309	**F4 — PLANEJAMENTO** | Frameworks: 5W2H | OKR | 7Ps | BSC
   310	Camada: founder + product
   311	Pergunta: Qual é o plano concreto de execução?
   312	
   313	- **5W2H:** Plano de 30 dias completo (What/Who/Where/When/Why/How/How much)
   314	- **OKR:** Objetivos e Key Results com 4 KRs por objetivo
   315	- **7Ps:** Product / Price / Place / Promotion / People / Process / Physical Evidence
   316	- **BSC:** Balanced Scorecard nas 4 perspectivas (financeira / clientes / processos / aprendizado)
   317	
   318	---
   319	
   320	**F5 — ITERAÇÃO** | Frameworks: PDCA | OODA
   321	Camada: consultant + operator
   322	Pergunta: Como aprendo e ajusto a cada ciclo?
   323	
   324	- **PDCA:** Plan / Do / Check / Act — ciclo de melhoria documentado
   325	- **OODA:** Observe / Orient / Decide / Act — decisão ágil após cada feedback de usuário
   326	
   327	---
   328	
   329	**F6 — VALIDAÇÃO** | Frameworks: First Principles | PESTEL
   330	Camada: founder + product
   331	Pergunta: O que é verdade fundamental e o que ainda é hipótese?
   332	
   333	- **First Principles:** Decompor em verdades fundamentais vs hipóteses não confirmadas
   334	- **PESTEL:** Political / Economic / Social / Technological / Environmental / Legal — contexto macro
   335	
   336	---
   337	
   338	**F7 — HANDOVER** | Frameworks: BLUF | SCQA
   339	Camada: founder + portfolio
   340	Pergunta: Como converto produto em ativo público e de carreira?
   341	
   342	- **BLUF:** Mensagem diferente para cada audiência (recrutador / consultor / cliente / investidor)
   343	- **SCQA:** Narrativa de portfólio — framing para LinkedIn, blog, GitHub, pitch
   344	
   345	---
   346	
   347	### PROTOCOLO DE GERAÇÃO — FASE 2
   348	
   349	Gere os blocos de framework em 2 lotes:
   350	- **Lote A:** F1, F2, F3, F4
   351	- **Lote B:** F5, F6, F7
   352	
   353	Termine com o **Sumário Executivo** (tabela compacta F1–F7) e a **Sequência de Execução
   354	Recomendada** (tabela com 8 passos, framework aplicado e resultado esperado).
   355	
   356	---
   357	
   358	## FASE 3 — COMPILAÇÃO FINAL
   359	
   360	Após gerar tudo, produza a versão compilada final com:
   361	
   362	1. **Header** com metadados do caso, data e versão
   363	2. **Regra Governante** (tabela com os 8 campos)
   364	3. **Corpus — 17 Artefatos** (A01–A17 em sequência)
   365	4. **Mapa de Dependências** (tabela com status de cada artefato)
   366	5. **Framework Stack Analysis** (F1–F7 completo)
   367	6. **Sumário Executivo** (tabela compacta F×Framework×Insight×Output)
   368	7. **Sequência de Execução** (8 passos ordenados)
   369	8. **Regra Governante Final** (fechamento com dono/produto/fixture/gates)
   370	
   371	Ofereça ao usuário:
   372	```
   373	"✅ Corpus gerado. Deseja que eu:
   374	  [A] Exporte como arquivo .md para download
   375	  [B] Gere também o SKILL.md operacional do produto (para usar como skill no claude.ai)
   376	  [C] Ambos"
   377	```
   378	
   379	---
   380	
   381	## GATES DE QUALIDADE
   382	
   383	Antes de entregar qualquer artefato, verifique:
   384	
   385	- [ ] Todos os campos têm conteúdo denso e específico (não genérico)
   386	- [ ] Nenhum artefato descreve o negócio da fixture como se fosse o corpus principal
   387	- [ ] Labels epistêmicos presentes onde há incerteza
   388	- [ ] Nenhuma promessa financeira ou dado inventado
   389	- [ ] Fixture aparece apenas como caso de teste/demo
   390	- [ ] Primeira execução limitada ao número de outputs definido nos metadados
   391	
   392	---
   393	
   394	## ANTI-CONFUSION RULE
   395	
   396	```
   397	Se em qualquer momento você perceber que está escrevendo sobre o negócio da fixture
   398	como se fosse o produto do dono → PARE. Corrija o sujeito. Reescreva.
   399	
   400	Teste: "Este artefato descreve [PRODUTO DO DONO] ou [NEGÓCIO DA FIXTURE]?"
   401	Se a resposta for [NEGÓCIO DA FIXTURE] → está errado.
   402	```
   403	
   404	---
   405	
   406	## MODO RÁPIDO (optional)
   407	
   408	Se o usuário disser "modo rápido" ou "sem pausas", gere todos os 17 artefatos e
   409	os 7 blocos de framework em sequência contínua, sem aguardar confirmação entre lotes.
   410	
   411	## MODO ARTEFATO ÚNICO (optional)
   412	
   413	Se o usuário disser "só o A04" ou "só o F2", gere apenas aquele artefato/bloco
   414	usando os metadados fornecidos. Útil para regenerar artefatos específicos.
   415	
   416	## MODO ATUALIZAÇÃO (optional)
   417	
   418	Se o usuário fornecer um corpus existente e pedir para atualizar apenas artefatos
   419	específicos, leia o corpus, atualize os campos indicados e mantenha o restante intacto.
   420	
{"returncode":0,"stdout":"#!/usr/bin/env python3\n\"\"\"\n╔══════════════════════════════════════════════════════════════════════════════╗\n║  scripity.py  —  Corpus Generator at Scale                                  ║\n║  Generates the 17-artifact business corpus from person metadata              ║\n║  Gold standard: CORPUS format (A01–A17 + F1–F7 Framework Stack)             ║\n║  Engine: Anthropic Claude (claude-sonnet-4-20250514)                         ║\n╚══════════════════════════════════════════════════════════════════════════════╝\n\nUSAGE:\n    # Single case\n    python scripity.py --input cases/maria.yaml\n\n    # Batch (all YAML files in a folder)\n    python scripity.py --batch cases/\n\n    # Resume an interrupted run\n    python scripity.py --input cases/maria.yaml --resume\n\n    # Custom output directory\n    python scripity.py --input cases/maria.yaml --output outputs/\n\nREQUIREMENTS:\n    pip install anthropic pyyaml\n\nENV:\n    ANTHROPIC_API_KEY must be set.\n\"\"\"\n\nimport os\nimport sys\nimport yaml\nimport json\nimport time\nimport argparse\nimport textwrap\nfrom pathlib import Path\nfrom datetime import datetime\n\ntry:\n    import anthropic\nexcept ImportError:\n    print(\"❌  anthropic not installed. Run: pip install anthropic\")\n    sys.exit(1)\n\n# ─── Model ────────────────────────────────────────────────────────────────────\nMODEL = \"claude-sonnet-4-20250514\"\nMAX_TOKENS = 8192\n\n# ─── 17 Artifacts Definition ──────────────────────────────────────────────────\n---\n# scripity.py — Metadata Template\n# Fill in all fields below for your case.\n# Required fields: owner, product_name, product_tagline,\n#                  primary_users, end_clients,\n#                  fixture_name, fixture_context,\n#                  problem_statement, solution_statement\n\n# ─── IDENTITY ──────────────────────────────────────────────\nowner: \"Maria Silva\"                    # Founder / owner name\nproduct_name: \"MarketSense Pro\"         # Product name / brand\nproduct_tagline: \"Diagnóstico de Mercado para PMEs em 1 Sessão\"\n\n# ─── USERS ─────────────────────────────────────────────────\nprimary_users:\n  - \"Consultor de marketing digital\"\n  - \"Agência boutique B2B\"\n  - \"Mentor de negócios locais\"\n\nend_clients:\n  - \"MEI de serviços\"\n  - \"Microempresa local\"\n  - \"Prestador autônomo\"\n\n# ─── FIXTURE (demo/test case — NOT the product's client) ────\nfixture_name: \"João Pereira\"\nfixture_context: \"dono de barbearia buscando expandir para 2ª unidade\"\n\n# ─── PRODUCT CONTEXT ────────────────────────────────────────\nproblem_statement: >\n  Consultores de marketing perdem horas estruturando diagnóstico de mercado,\n  ICP e plano de canais para pequenos negócios. Sem padronização, cada caso\n  começa do zero e o output varia muito em qualidade.\n\nsolution_statement: >\n  MarketSense Pro é uma skill operacional que recebe briefing de cliente PME\n  e gera diagnóstico de mercado, mapa de concorrência e plano de canais em\n  uma sessão, com linguagem simples e sem jargão de agência.\n\n# ─── OPTIONAL (defaults applied if omitted) ─────────────────\nhorizon_days: 90\nmvp_outputs: 3\nfounder_context: \"Construir portfólio AI-first para posicionar como consultora de produto\"\nsector: \"marketing digital / serviços para pequenas empresas\"\nlanguage: \"pt-BR\"\nconstraints: \"low-code, low-cost, founder-led, 90 dias\"\n\nfirst_execution_outputs:\n  - \"diagnóstico de mercado executivo\"\n  - \"mapa de concorrentes e posicionamento\"\n  - \"plano de canais 5W2H de 30 dias\"\n---\nConclusão\n\nExecutado: abaixo está a v1.1 preenchida dos 17 artefatos para o plano/produto do Leonardo. O objeto central é o ABS / Consulting Skill System. Ana aparece apenas como fixture de validação, não como cliente real nem como dona dos artefatos. Este material já é resultado documental-base, não apenas descrição; ainda não é exportação final em PDF/XLSX/ZIP.\n\n  \n\nCorpus v1.1 — 17 Artefatos preenchidos para ABS\n\nRegra governante\n\n|   |   |\n|---|---|\n|Elemento|Definição corrigida|\n|Dono do corpus|Leonardo|\n|Objeto primário|ABS / Aurelio’s Business Skills|\n|Produto|Raio-X de Viabilidade para Pequeno Negócio Local|\n|Usuário-alvo|Consultor PME, Sebrae/ALI, contador consultivo, consultor de gestão/marketing/finanças|\n|Cliente final do usuário|MEI, futuro MEI, microempresa local, prestador de serviço|\n|Fixture|Ana Souza, estúdio de beleza em pré-abertura|\n|Primeira execução da skill|exatamente 3 outputs: diagnóstico executivo, matriz de decisão, plano 5W2H de 30 dias|\n|Proibição|não gerar A01–A17 como documentos do negócio da Ana|\n\n  \n\nA01 — Vision\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Vision|\n|Objeto|ABS / Consulting Skill System|\n|Pergunta-chave|Que transformação o ABS cria, para quem e em qual horizonte?|\n|North Star|Transformar briefings brutos de pequenos negócios em diagnósticos consultivos claros, matriz de decisão e plano de ação de 30 dias, permitindo que consultores PME entreguem mais rápido, com mais padrão e menor risco de recomendação sem evidência.|\n|Usuário primário|Consultor PME independente, consultor Sebrae/ALI, contador consultivo, consultor financeiro, consultor de marketing local ou consultor de gestão para pequenos negócios.|\n|Cliente final|MEI, futuro MEI, microempresa local, profissional autônomo ou pequeno prestador de serviço que precisa decidir, organizar ou validar uma ação de negócio.|\n|Problema central|Consultores perdem tempo estruturando briefing, diagnóstico, priorização e plano. Clientes pequenos querem resposta prática, mas a entrega consultiva costuma ser artesanal, demorada, inconsistente ou cheia de jargão.|\n|Solução proposta|Uma skill operacional que recebe briefing de cliente, separa fato/hipótese/inferência/lacuna/recomendação, aplica fluxo consultivo padronizado e gera 3 entregáveis: diagnóstico executivo, matriz de decisão e plano 5W2H.|\n|Horizonte de sucesso|90 dias para validar produto, portfólio público e utilidade com pelo menos 1 consultor real.|\n|Métricas de sucesso|Redução de tempo do consultor acima de 20%; consultor entende o fluxo sem treinamento adicional; output pode ser mostrado a cliente final com pouco retrabalho; cliente final entende próximo passo sem jargão.|\n|Fora de escopo|Consultoria universal; execução operacional do cliente; garantia financeira; aconselhamento definitivo sobre MEI/CNAE/alvará; customização setorial antes de validar o pilot-case.|\n\n  \n\nA02 — MRD\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Market Requirements Document|\n|Objeto|Mercado para ABS|\n|Pergunta-chave|O que o mercado-alvo exige que ainda não está bem resolvido?|\n|ICP primário|Consultores que atendem pequenos negócios e precisam transformar conversas desorganizadas em entregáveis profissionais com rapidez.|\n|ICP secundário|Contadores consultivos, consultores financeiros, consultores de marketing local, educadores/mentores PME, agentes de inovação e operadores de atendimento consultivo.|\n|Dor do usuário|Perde tempo organizando briefing; sofre para padronizar entrega; precisa parecer sênior mesmo em casos simples; tem dificuldade de transformar diagnóstico em plano acionável.|\n|Dor do cliente final|Quer clareza: “abro ou não?”, “quanto preciso vender?”, “o que faço primeiro?”, “vale assumir custo fixo?”, “como consigo clientes?”.|\n|Requisito de mercado 1|Entrega rápida: o sistema deve produzir output útil em uma sessão ou ciclo curto de 2–3 dias.|\n|Requisito de mercado 2|Linguagem simples: output final para cliente PME deve evitar jargão de consultoria e IA.|\n|Requisito de mercado 3|Evidência e segurança: não pode inventar dados nem prometer viabilidade financeira.|\n|Requisito de mercado 4|Repetibilidade: o consultor precisa conseguir usar o mesmo fluxo em casos semelhantes.|\n|Requisito de mercado 5|Baixo atrito: deve funcionar com briefing em texto livre, transcrição ou formulário simples.|\n|Requisito de mercado 6|Output profissional: deve gerar material com aparência de consultoria, mesmo partindo de dados incompletos.|\n|Requisito de mercado 7|Guardrails: deve travar recomendações de alto risco, como ponto fixo sem demanda/margem/canal validados.|\n|Lacunas a validar|Consultores pagariam pela skill? Qual preço aceitável? O ganho de tempo é percebido? O output parece confiável? O caso Ana é representativo o bastante?|\n\n  \n\nA03 — PRFAQ\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|PRFAQ|\n|Produto|Raio-X de Viabilidade para Pequeno Negócio Local|\n|Headline|Aurelio’s Business Skills lança uma skill que transforma briefing de pequeno negócio em diagnóstico, decisão e plano de ação em uma sessão.|\n|Subheadline|O Raio-X de Viabilidade ajuda consultores PME a organizar casos reais, reduzir retrabalho e entregar recomendações com evidência, sem prometer resultados financeiros.|\n|Press release resumido|O ABS apresenta um sistema operacional de consultoria para pequenos negócios. A partir de um briefing bruto, a skill identifica objetivo declarado e objetivo real, separa fatos de hipóteses, aponta lacunas críticas, compara alternativas e gera um plano 5W2H de 30 dias. O primeiro pilot-case usa Ana, uma cliente fictícia que quer abrir um estúdio de beleza, para demonstrar um caso comum de decisão PME: assumir ou não custo fixo antes de validar demanda.|\n|FAQ cliente 1|O sistema substitui o consultor? Não. Ele organiza o raciocínio, acelera a entrega e reduz omissões; a responsabilidade consultiva continua humana.|\n|FAQ cliente 2|Serve para qualquer negócio? Não no MVP. O foco inicial é pequeno negócio local, MEI/futuro MEI e serviços de baixa/média complexidade.|\n|FAQ cliente 3|Ele garante que o negócio vai dar certo? Não. O sistema gera diagnóstico e plano de validação, sem promessa financeira.|\n|FAQ cliente 4|Por que usar 5W2H? Porque pequenos negócios precisam saber exatamente o que fazer, quando, quem faz, como medir e quanto pode custar.|\n|FAQ cliente 5|O que sai na primeira execução? Diagnóstico executivo, matriz de decisão e plano de ação de 30 dias.|\n|FAQ interno 1|Por que Ana? Porque é um fixture simples, concreto e aderente ao tipo de caso que consultores PME encontram com frequência.|\n|FAQ interno 2|Por que não começar com agência B2B? Porque é menos representativo para o universo amplo de consultoria PME. Pode virar oferta secundária depois.|\n|FAQ interno 3|Como validar? Medir ganho de tempo do consultor, clareza do output, intenção de pagamento e capacidade do cliente final entender a recomendação.|\n\n  \n\nA04 — Business Case\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Business Case|\n|Pergunta-chave|Vale a pena Leonardo construir, validar e empacotar o ABS?|\n|Problema|Leonardo precisa criar um ativo AI-first que funcione simultaneamente como produto, portfólio público, prova de execução e base para inserção no mercado holandês.|\n|Solução|Construir o ABS como sistema modular de consultoria com IA, começando por uma skill de viabilidade para pequeno negócio local.|\n|Benefício estratégico|O produto demonstra AI Integration, Workflow Design, Process Improvement e B2B Client Management de forma concreta, não apenas declarativa.|\n|Benefício operacional|A skill transforma um briefing em outputs consultivos replicáveis, reduzindo dependência de improviso.|\n|Benefício comercial|Pode ser empacotado como skill, curso, ebook, assets, consultoria 1:1 ou produto para consultores.|\n|Benefício de carreira|Serve como portfólio verificável para candidaturas AI-adjacent entry-level na Holanda.|\n|Investimento principal|Tempo de construção, documentação, design dos artefatos, publicação em GitHub/blog/landing, validação com consultores e produção de conteúdo.|\n|Modelo financeiro inicial|Low-cost/founder-led: validar demanda antes de construir plataforma; monetização via produto digital, consultoria, template premium ou pacote de implementação.|\n|Hipótese comercial|Consultores que atendem pequenos negócios valorizam redução de tempo, padronização e entregáveis mais profissionais.|\n|Risco 1|Produto ficar complexo demais antes da validação. Mitigação: primeira execução limitada a 3 outputs.|\n|Risco 2|Consultores não perceberem valor pago. Mitigação: testar com 3–5 consultores antes de expandir.|\n|Risco 3|Output parecer genérico. Mitigação: usar fixture concreta, gates e linguagem PME.|\n|Risco 4|Confundir produto do Leonardo com caso Ana. Mitigação: corpus v1.1 separa founder/product/operator/fixture.|\n|Recomendação|Go controlado: construir MVP, validar com caso Ana, coletar feedback de consultor real e só depois expandir para bundle FULL.|\n|Gate de avanço|Só avançar para produto público se pelo menos 1 consultor real entender o fluxo, reconhecer utilidade e aceitar testar/recomendar o output.|\n\n  \n\nA05 — Charter\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Project Charter|\n|Projeto|ABS — Raio-X de Viabilidade para Pequeno Negócio Local|\n|Sponsor|Leonardo|\n|Papel do sponsor|Founder, product builder, operador inicial, responsável por validação e publicação.|\n|Objetivo|Criar uma skill operacional que permita a um consultor PME gerar diagnóstico, matriz de decisão e plano 5W2H a partir de briefing de cliente.|\n|Escopo IN|Corpus v1.1; 17 artefatos do produto; skill MVP; pilot-case Ana; SOP do consultor; landing/portfolio; validação com consultor real; documentação pública mínima.|\n|Escopo OUT|Plataforma SaaS completa; marketplace; multi-setor avançado; execução da consultoria do cliente; formalização jurídica/contábil; garantia de resultado financeiro.|\n|RACI|Responsible: Leonardo; Accountable: Leonardo; Consulted: consultores PME convidados; Informed: audiência LinkedIn/blog/GitHub.|\n|Milestone 1|Corpus v1.1 corrigido e 17 artefatos preenchidos.|\n|Milestone 2|Skill MVP com 3 outputs.|\n|Milestone 3|Caso Ana rodado como demo.|\n|Milestone 4|Feedback de pelo menos 1 consultor real.|\n|Milestone 5|Publicação de portfólio/landing/GitHub.|\n|Gate 1|Papéis corrigidos: Leonardo/produto/consultor/Ana separados.|\n|Gate 2|MVP não expande além dos 3 outputs.|\n|Gate 3|Output é compreensível para cliente final.|\n|Gate 4|Consultor reconhece valor operacional.|\n|Critério de sucesso|Produto demonstrável, documentado e validado o suficiente para virar portfólio e possível oferta inicial.|\n\n  \n\nA06 — BRD\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Business Requirements Document|\n|Objeto|Requisitos de negócio do ABS|\n|BR-01|O sistema deve transformar briefing bruto em output consultivo estruturado.|\n|BR-02|O sistema deve separar objetivo declarado e objetivo real do cliente final.|\n|BR-03|O sistema deve preservar labels epistemológicos: FATO, HIPÓTESE, INFERÊNCIA, LACUNA, RECOMENDAÇÃO.|\n|BR-04|O sistema deve gerar exatamente 3 outputs na primeira execução: diagnóstico executivo, matriz de decisão e plano 5W2H.|\n|BR-05|O sistema deve impedir recomendações financeiras ou estruturais sem evidência mínima.|\n|BR-06|O sistema deve orientar o consultor, mas não substituir responsabilidade profissional.|\n|BR-07|O output para cliente final deve ser em linguagem simples e acionável.|\n|BR-08|O sistema deve permitir uso de fixture Ana sem contaminar os artefatos do produto.|\n|BR-09|O sistema deve gerar documentação suficiente para portfólio público e validação de carreira.|\n|BR-10|O sistema deve operar com baixo custo, ferramentas simples e sem dependência inicial de software complexo.|\n|Regras de negócio|Não prometer sucesso financeiro; não inventar dado de mercado; validar MEI/CNAE/alvará em fonte oficial; bloquear ponto fixo sem demanda/margem/canal; encerrar consultoria no handover dos outputs definidos.|\n|Assumptions|Consultores PME valorizam rapidez; pequenos negócios precisam de clareza operacional; um fixture concreto é melhor que caso abstrato; portfólio público pode compensar ausência de diploma formal em parte do processo seletivo.|\n|Constraints|90 dias; perfil low-code; baixo custo; founder-led; foco em validação antes de escala; Track A e Track B devem se alimentar.|\n\n  \n\nA07 — PRD\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Product Requirements Document|\n|Produto|ABS / Raio-X de Viabilidade para Pequeno Negócio Local|\n|Persona 1|Leonardo, founder-builder, precisa construir ativo vendável e portfólio público.|\n|Persona 2|Consultor PME, precisa organizar briefing e gerar entrega profissional rapidamente.|\n|Persona 3|Cliente final PME, precisa entender decisão e próximos passos sem jargão.|\n|Persona 4|Recrutador/avaliador, precisa ver evidência concreta de execução AI-first.|\n|Use case principal|Consultor recebe briefing de cliente final e usa a skill para gerar diagnóstico, matriz e plano de 30 dias.|\n|Use case secundário|Leonardo usa o produto como case público para LinkedIn, blog, GitHub, landing e candidaturas.|\n|Feature 1|Intake normalizer: transforma briefing bruto em estrutura limpa.|\n|Feature 2|Epistemic labeling: separa fatos, hipóteses, inferências, lacunas e recomendações.|\n|Feature 3|Diagnostic engine: avalia mercado, oferta, canais, custos, riscos e lacunas.|\n|Feature 4|Decision matrix: compara alternativas com critérios e pesos.|\n|Feature 5|5W2H generator: transforma decisão em plano de 30 dias.|\n|Feature 6|Scope guardrails: bloqueia expansão indevida e recomendação sem evidência.|\n|Feature 7|Fixture runner: roda caso Ana como demo sem confundir com corpus principal.|\n|Acceptance criteria|Dado um briefing, quando a skill roda, então produz os 3 outputs obrigatórios; cada output distingue fato/inferência/lacuna; recomendações de risco têm gate explícito; linguagem final é compreensível para cliente PME.|\n|Non-goals|Construir SaaS completo; automatizar captação; substituir consultor; emitir parecer contábil/legal; produzir 17 documentos da Ana.|\n|Métrica de produto|Tempo economizado; clareza percebida; aceitação por consultor; qualidade do output; capacidade de reuso.|\n\n  \n\nA08 — FRD\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Functional Requirements Document|\n|Função central|Receber briefing, processar diagnóstico consultivo e gerar 3 outputs.|\n|Input aceito|Texto livre; notas de reunião; formulário; transcrição; briefing fictício; dados estruturados em YAML/Markdown.|\n|Pré-processamento|Identificar cliente final, contexto, decisão central, recursos, restrições, canais, dados financeiros declarados, lacunas e expectativas.|\n|Etapa 1|Normalizar briefing: remover ruído, separar campos, preservar incertezas.|\n|Etapa 2|Identificar objetivo declarado e objetivo real.|\n|Etapa 3|Aplicar labels epistemológicos.|\n|Etapa 4|Mapear eixos de diagnóstico: demanda, oferta, finanças, canais, operação, formalização, risco.|\n|Etapa 5|Gerar hipóteses e lacunas críticas.|\n|Etapa 6|Comparar alternativas operacionais.|\n|Etapa 7|Gerar matriz de decisão com critérios, pesos e recomendação.|\n|Etapa 8|Gerar plano 5W2H de 30 dias com gates.|\n|Etapa 9|Revisar contra constraints: sem promessa financeira, sem dado inventado, sem recomendação de alto risco sem validação.|\n|Edge case 1|Briefing incompleto: gerar lacunas antes de recomendar.|\n|Edge case 2|Cliente quer resposta “sim/não” sem dados: dar decisão provisória e plano de validação.|\n|Edge case 3|Dados inconsistentes: apontar inconsistência e impedir conclusão forte.|\n|Edge case 4|Pedido de formalização: orientar validação oficial, não decidir definitivamente.|\n|Edge case 5|Usuário pede mais entregáveis na primeira execução: bloquear expansão e manter 3 outputs.|\n|Output funcional|Diagnóstico executivo; matriz de decisão; plano 5W2H.|\n|Output opcional futuro|Checklist, WhatsApp summary, PDF, XLSX, deck, SOP setorial, pacote FULL.|\n\n  \n\nA09 — NFR\n\n|   |   |\n|---|---|\n|Dimensão|Requisito preenchido|\n|Simplicidade|Consultor deve entender e operar sem treinamento longo.|\n|Rastreabilidade|Toda recomendação relevante deve apontar sua base: fato, inferência, hipótese ou lacuna.|\n|Segurança epistemológica|Dados não verificados devem ser marcados como estimativa ou lacuna.|\n|Anti-alucinação|O sistema não pode inventar mercado, números ou regras oficiais.|\n|LGPD / privacidade|Dados de clientes devem ser minimizados, usados apenas para o caso e removíveis conforme política definida.|\n|Legal/contábil|Não emitir orientação definitiva sobre MEI, CNAE, alvará ou tributos sem direcionar para fonte oficial ou profissional habilitado.|\n|Usabilidade|Output final deve ser legível para cliente PME sem vocabulário técnico.|\n|Performance operacional|A skill deve reduzir tempo de estruturação do consultor em pelo menos 20% no teste inicial.|\n|Modularidade|Corpus, skill, fixture, SOP e outputs devem poder ser alterados separadamente.|\n|Baixo custo|MVP deve funcionar sem SaaS próprio, usando arquivos, prompts, templates e automação leve.|\n|Portabilidade|Deve ser exportável para Markdown, PDF, XLSX, JSON, YAML e eventualmente GitHub.|\n|Manutenibilidade|Regras, gates e exemplos devem ficar separados para evitar retrabalho.|\n\n  \n\nA10 — ArchSpec\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Architecture Specification|\n|Arquitetura|Sistema modular baseado em corpus + skill + templates + fixtures + outputs.|\n|Camada 1|Founder corpus: plano do Leonardo, Track A, Track B, estratégia e metas.|\n|Camada 2|Product corpus: requisitos, PRD, FRD, NFR, arquitetura, roadmap e backlog.|\n|Camada 3|Operator corpus: SOP, fluxo do consultor, gates, QA e decision log.|\n|Camada 4|Fixture corpus: Ana como caso de teste.|\n|Camada 5|Output templates: diagnóstico, matriz, 5W2H, checklist, WhatsApp.|\n|Componentes|SKILL.md; CLAUDE.md; templates; decision matrix; qa_checklist; intake_normalizado; mapas de lacunas; exemplos; README.|\n|Fluxo de dados|Briefing bruto → Intake normalizado → Labels epistemológicos → Diagnóstico → Matriz → Plano 5W2H → QA → Handover.|\n|Stack inicial|Markdown; YAML/JSON; planilha; PDF exportável; GitHub; landing simples; LinkedIn/blog para distribuição.|\n|Integrações futuras|Google Forms; Notion; Airtable; Sheets; CRM leve; gerador PDF; automações low-code.|\n|Estrutura sugerida|/founder; /product; /operator; /fixtures/ana; /templates; /outputs; /qa; /release; /portfolio.|\n|Modelo de deploy inicial|Manual/hands-off com arquivos estruturados; depois empacotar como skill, curso, template ou mini-produto.|\n|Segurança|Separar dados reais de fixtures; evitar exposição de dados pessoais; sanitizar exemplos antes de publicar.|\n\n  \n\nA11 — ADR\n\n|   |   |   |   |\n|---|---|---|---|\n|ID|Decisão|Racional|Consequência|\n|ADR-001|Ana é fixture, não cliente real|Evita confundir corpus do produto com entrega do caso simulado|Os 17 artefatos pertencem ao ABS|\n|ADR-002|Começar com pequeno negócio local|É mais representativo para consultoria PME do que agência B2B sofisticada|Maior aderência para consultores generalistas|\n|ADR-003|Primeira execução limitada a 3 outputs|Reduz escopo, evita produto inflado e facilita validação|Checklist/PDF premium ficam para versão posterior|\n|ADR-004|Usar 5W2H como plano principal|Pequeno negócio precisa de ação simples e mensurável|Menos sofisticação, mais execução|\n|ADR-005|Não construir SaaS inicialmente|Perfil low-code e necessidade de validação rápida|Produto começa como skill/template/serviço|\n|ADR-006|Separar Track A e Track B, mas mantê-los conectados|Produto é portfólio; portfólio vende produto|Cada entrega deve servir produto e carreira|\n|ADR-007|Manter labels epistemológicos obrigatórios|Evita alucinação e recomendação sem evidência|Output fica mais confiável, ainda que menos “definitivo”|\n|ADR-008|Bloquear ponto fixo sem demanda/margem/canal|Reduz risco de conselho consultivo irresponsável|Skill tende a recomendar validação antes de investimento fixo|\n\n  \n\nA12 — Roadmap\n\n|   |   |   |   |   |\n|---|---|---|---|---|\n|Fase|Horizonte|Objetivo|Entregáveis|Gate|\n|R0|Agora|Corrigir corpus|v1.1 com papéis separados e A01–A17 preenchidos|Leonardo/produto/consultor/Ana sem confusão|\n|R1|Semana 1–2|Construir MVP textual|SKILL.md, prompt operacional, templates dos 3 outputs|Skill roda caso Ana sem expandir escopo|\n|R2|Semana 3–4|Rodar demo Ana|Diagnóstico, matriz, 5W2H|Output parece real para consultor|\n|R3|Semana 4–5|Validar com consultor|Feedback sobre tempo, clareza e utilidade|Redução de tempo percebida ou crítica objetiva|\n|R4|Semana 5–6|Empacotar produto|README, landing, GitHub, demo case, vídeo curto|Produto demonstrável publicamente|\n|R5|Semana 7–8|Publicar conteúdo|LinkedIn, blog, case study, assets|Sinais de audiência ou feedback|\n|R6|Semana 9–12|Usar como portfólio|Candidaturas, outreach, entrevistas, consultoria 1:1|Sinal de contratação ou pivot|\n|Dia 91|Decisão|Continuar ou pivotar|Veredito baseado em sinais reais|Sem sinal → pivot obrigatório|\n\n  \n\nA13 — Stories\n\n|   |   |   |   |\n|---|---|---|---|\n|ID|Persona|Story|Acceptance criteria|\n|US-001|Leonardo|Como founder, quero um corpus v1.1 corrigido para não confundir produto, operador e fixture.|A01–A17 falam do ABS; Ana aparece só como fixture.|\n|US-002|Consultor PME|Como consultor, quero colar um briefing bruto e receber uma estrutura clara do caso.|Sistema gera intake normalizado com fatos, hipóteses e lacunas.|\n|US-003|Consultor PME|Como consultor, quero um diagnóstico por eixos para não esquecer pontos críticos.|Diagnóstico cobre demanda, oferta, finanças, canais, operação e riscos.|\n|US-004|Consultor PME|Como consultor, quero comparar alternativas antes de recomendar.|Matriz tem critérios, pesos, scores e decisão justificada.|\n|US-005|Cliente final|Como dono de pequeno negócio, quero saber o que fazer nos próximos 30 dias.|Plano 5W2H é simples, temporal e executável.|\n|US-006|Leonardo|Como candidato AI-adjacent, quero publicar o ABS como evidência de execução.|GitHub/landing/blog explicam produto, método e caso demo.|\n|US-007|Consultor|Como usuário, quero que a skill bloqueie recomendação arriscada.|Se faltar demanda/margem/canal, sistema recomenda validação antes de custo fixo.|\n|US-008|Recrutador|Como avaliador, quero ver capacidade prática de IA aplicada a workflow real.|Portfolio mostra problema, sistema, output, validação e aprendizados.|\n\n  \n\nA14 — Backlog\n\n|   |   |   |   |\n|---|---|---|---|\n|Prioridade|Tipo|Item|Status sugerido|\n|P0|Governança|Consolidar corpus v1.1 corrigido|pronto nesta entrega|\n|P0|Produto|Escrever SKILL.md do ABS|próximo|\n|P0|Produto|Criar prompt operacional da primeira execução|próximo|\n|P0|Fixture|Rodar Ana apenas nos 3 outputs MVP|próximo|\n|P0|QA|Criar checklist anti-confusão e anti-alucinação|próximo|\n|P1|Template|Diagnóstico executivo padrão|fazer|\n|P1|Template|Matriz de decisão padrão|fazer|\n|P1|Template|Plano 5W2H padrão|fazer|\n|P1|Portfólio|README público do projeto|fazer|\n|P1|Portfólio|Case study “Ana fixture”|fazer|\n|P1|Distribuição|Landing simples ABS|fazer|\n|P2|Conteúdo|Post LinkedIn explicando a tese|fazer|\n|P2|Conteúdo|Blog AI-Natomy sobre skill aplicada a PME|fazer|\n|P2|Produto|Ebook/guia de uso|depois da validação|\n|P2|Produto|Vídeo aula 28 min|depois da validação|\n|P3|Escala|Setores adicionais|somente após feedback|\n|P3|Automação|Export PDF/XLSX automático|somente após output estabilizar|\n\n  \n\nA15 — Release Plan\n\n|   |   |   |   |\n|---|---|---|---|\n|Release|Nome|Escopo|Critério de release|\n|v0.1|Corpus Governado|v1.1 + A01–A17 do ABS|Papéis corrigidos; Ana como fixture|\n|v0.2|Skill MVP|SKILL.md + prompt + 3 templates|Roda briefing Ana e gera 3 outputs|\n|v0.3|Demo Pack|Caso Ana completo como demonstração|Consultor entende a entrega|\n|v0.4|Validation Pack|Feedback de consultor real|Tempo/clareza/utilidade medidos|\n|v0.5|Public Portfolio|README, GitHub, landing, blog/post|Produto explicável publicamente|\n|v1.0|Commercial MVP|Skill + guia + assets + oferta inicial|Alguém aceita testar, recomendar ou pagar|\n|Rollback|Regra|Se output parecer genérico ou consultor não entender valor, voltar para PRD/FRD e reduzir escopo.||\n|Comunicação|Regra|Não vender como SaaS maduro; posicionar como sistema/skill operacional validável.||\n|Risco|Regra|Não publicar dados reais de clientes; usar fixture sanitizada.||\n\n  \n\nA16 — SOP\n\n|   |   |\n|---|---|\n|Campo|Procedimento preenchido|\n|Nome|SOP — Operação da Skill pelo Consultor|\n|Objetivo|Garantir que o consultor use a skill de forma repetível, segura e compreensível para o cliente final.|\n|Pré-condição|Briefing mínimo com cliente, objetivo declarado, decisão central, recursos, restrições e dúvidas principais.|\n|Passo 1|Receber briefing bruto.|\n|Passo 2|Separar INPUT, PROCESSO e OUTPUT.|\n|Passo 3|Identificar objetivo declarado e objetivo real.|\n|Passo 4|Classificar informações como FATO, HIPÓTESE, INFERÊNCIA, LACUNA ou RECOMENDAÇÃO.|\n|Passo 5|Mapear eixos de diagnóstico.|\n|Passo 6|Listar lacunas críticas antes de recomendar.|\n|Passo 7|Comparar alternativas operacionais.|\n|Passo 8|Gerar matriz de decisão.|\n|Passo 9|Gerar plano 5W2H de 30 dias.|\n|Passo 10|Rodar QA: sem promessa financeira, sem dado inventado, sem recomendação de alto risco sem evidência.|\n|Passo 11|Entregar resultado em linguagem simples.|\n|Gate de qualidade 1|Briefing suficiente? Se não, gerar lacunas.|\n|Gate de qualidade 2|Diagnóstico antes de plano? Se não, bloquear plano.|\n|Gate de qualidade 3|Demanda/margem/canal validados? Se não, recomendar validação antes de custo fixo.|\n|Gate de qualidade 4|Output final sem jargão? Se não, reescrever.|\n|Encerramento|Consultoria termina com diagnóstico, matriz e 5W2H entregues e explicados.|\n|Novo escopo|Acompanhamento, formalização, marketing, operação, ponto físico ou implementação.|\n\n  \n\nA17 — Runbook\n\n|   |   |\n|---|---|\n|Campo|Conteúdo preenchido|\n|Nome|Runbook — Operação e manutenção do ABS|\n|Dono|Leonardo|\n|Sistema operado|ABS / Consulting Skill System|\n|Estado normal|Corpus atualizado; skill roda; fixture Ana preservada; outputs gerados sem expansão indevida.|\n|Checklist normal|Confirmar versão do corpus; confirmar sujeito dos artefatos; confirmar fixture; rodar QA; registrar decisão.|\n|Operação normal 1|Para nova versão, atualizar changelog e manter regra de papéis.|\n|Operação normal 2|Para novo caso demo, criar fixture separada sem substituir Ana como referência inicial.|\n|Operação normal 3|Para feedback de consultor, registrar problema, impacto, hipótese e ajuste.|\n|Incidente 1|A skill começa a gerar documentos como se fossem da Ana. Ação: aplicar anti_confusion_rule e rebaixar Ana para fixture.|\n|Incidente 2|A skill expande primeira execução para 5+ outputs. Ação: retornar ao contrato MVP de 3 outputs.|\n|Incidente 3|Output promete sucesso financeiro. Ação: remover promessa, marcar estimativas e inserir gate de validação.|\n|Incidente 4|Output recomenda formalização definitiva. Ação: trocar por orientação de validação oficial.|\n|Incidente 5|Consultor não entende uso. Ação: simplificar SOP, criar exemplo antes/depois e reduzir termos técnicos.|\n|Incidente 6|Produto vira complexo demais. Ação: voltar ao fluxo briefing → diagnóstico → matriz → 5W2H.|\n|Recovery|Restaurar última versão válida do corpus; verificar A01/A07/A16; rodar caso Ana novamente; comparar output com QA.|\n|Métricas operacionais|Tempo de geração; retrabalho necessário; clareza percebida; número de lacunas; feedback de consultor; utilidade do plano.|\n|Próxima manutenção|Após cada validação real, atualizar BRD, PRD, FRD, SOP e Backlog.|\n\n  \n\nMapa final de dependências v1.1\n\n|   |   |   |\n|---|---|---|\n|Artefato|Depende de|Status nesta versão|\n|A01 Vision|—|preenchido|\n|A02 MRD|A01|preenchido|\n|A03 PRFAQ|A01, A02|preenchido|\n|A04 Business Case|A02, A03|preenchido|\n|A05 Charter|A04|preenchido|\n|A06 BRD|A05, A02|preenchido|\n|A07 PRD|A06, A05|preenchido|\n|A08 FRD|A07, A06|preenchido|\n|A09 NFR|A07, A06|preenchido|\n|A10 ArchSpec|A07, A09, A08|preenchido|\n|A11 ADR|A10, A06|preenchido|\n|A12 Roadmap|A07, A05, A04|preenchido|\n|A13 Stories|A07, A08, A12|preenchido|\n|A14 Backlog|A13, A12, A09|preenchido|\n|A15 Release Plan|A14, A12|preenchido|\n|A16 SOP|A07, A05, A10|preenchido|\n|A17 Runbook|A16, A10, A11, A15|preenchido|\n\n  \n\nO que você tem agora\n\nVocê não tem só uma descrição. Você tem a versão documental-base preenchida dos 17 artefatos para o produto do Leonardo.\n\nO que ainda não foi feito nesta resposta:\n\n|   |   |\n|---|---|\n|Item|Status|\n|Exportar PDF|não feito|\n|Exportar XLSX|não feito|\n|Criar ZIP|não feito|\n|Escrever SKILL.md final|próximo passo|\n|Rodar Ana nos 3 outputs|próximo passo|\n|Criar landing/GitHub/README|posterior|\n================================================================================\nABS — FRAMEWORK STACK ANALYSIS v1.1\nFonte: CORPUS_LEONARDO.md | Objeto: ABS / Consulting Skill System\nRegra: Frameworks orientam o produto do Leonardo. Ana é fixture de teste.\nGerado em: 2026-04-26\n================================================================================\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF1 — KICKOFF\nFrameworks: SCQA | BLUF | Cynefin\nCamada: founder + consultant\nPergunta do Leonardo: O que exatamente estou construindo?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 1.1 — SCQA (Situation / Complication / Question / Answer)\nAplicado a: Enquadramento da tese do ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────┬──────────────────────────────────────────────────────────────────┐\n│ Elemento     │ Conteúdo extraído do Corpus                                      │\n├──────────────┼──────────────────────────────────────────────────────────────────┤\n│ SITUATION    │ Leonardo precisa criar um ativo AI-first que funcione como       │\n│              │ produto, portfólio público, prova de execução e base para        │\n│              │ inserção no mercado holandês (A04). O mercado-alvo são           │\n│              │ consultores PME independentes, Sebrae/ALI, contadores            │\n│              │ consultivos e consultores de gestão/marketing/finanças (A01).    │\n├──────────────┼──────────────────────────────────────────────────────────────────┤\n│ COMPLICATION │ Consultores perdem tempo estruturando briefing, diagnóstico,     │\n│              │ priorização e plano. Clientes pequenos querem resposta prática,  │\n│              │ mas a entrega consultiva é artesanal, demorada, inconsistente    │\n│              │ ou cheia de jargão (A01). Além disso, sem validação prévia,      │\n│              │ há risco de construir produto complexo demais sem demanda        │\n│              │ confirmada (A04 — Risco 1 e Risco 2).                           │\n├──────────────┼──────────────────────────────────────────────────────────────────┤\n│ QUESTION     │ É possível criar uma skill operacional que transforme briefings  │\n│              │ brutos de pequenos negócios em diagnósticos consultivos claros,  │\n│              │ com matriz de decisão e plano de ação de 30 dias, de forma       │\n│              │ replicável, sem depender de SaaS complexo, em 90 dias?          │\n├──────────────┼──────────────────────────────────────────────────────────────────┤\n│ ANSWER       │ Sim. O ABS (Aurelio's Business Skills) entrega exatamente        │\n│              │ 3 outputs na primeira execução: diagnóstico executivo, matriz    │\n│              │ de decisão e plano 5W2H de 30 dias. Começa com o fixture Ana    │\n│              │ para provar funcionamento, valida com consultor real em até      │\n│              │ 90 dias e só então expande para bundle FULL (A04, A05, A12).    │\n└──────────────┴──────────────────────────────────────────────────────────────────┘\n\nOUTPUT FUNDADOR (F1/SCQA):\n  → Tese clara: ABS = skill de diagnóstico consultivo para PME, não SaaS.\n  → Promessa mínima: briefing bruto → 3 outputs profissionais em 1 sessão.\n  → Gate de tese: validado se consultor real entende e reconhece utilidade.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 1.2 — BLUF (Bottom Line Up Front)\nAplicado a: Declaração executiva do produto ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────┬────────────────────────────────────────────────────────────┐\n│ Elemento         │ Conteúdo extraído do Corpus                                │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ BOTTOM LINE      │ O ABS é uma skill operacional que transforma briefings      │\n│ (declaração      │ brutos de pequenos negócios em 3 entregáveis consultivos    │\n│ principal)       │ padronizados: diagnóstico executivo, matriz de decisão e   │\n│                  │ plano 5W2H de 30 dias. (A01, A03, A07)                     │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ PARA QUEM        │ Consultores PME que precisam organizar casos reais,         │\n│                  │ reduzir retrabalho e entregar recomendações com evidência.  │\n│                  │ (A02 — ICP primário)                                        │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ POR QUÊ AGORA    │ Portfólio verificável para candidaturas AI-adjacent na      │\n│                  │ Holanda + validação de produto com consultores PME reais    │\n│                  │ em 90 dias. (A04 — Benefício estratégico e de carreira)    │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ O QUE NÃO É      │ Não é SaaS; não substitui consultor; não garante           │\n│                  │ resultado financeiro; não emite parecer contábil/legal.     │\n│                  │ (A03 FAQ, A07 Non-goals, BRD Regras de negócio)            │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ PRÓXIMO PASSO    │ Escrever SKILL.md v0.2, rodar fixture Ana nos 3 outputs,   │\n│ IMEDIATO         │ coletar feedback de 1 consultor real. (A14 Backlog P0)     │\n└──────────────────┴────────────────────────────────────────────────────────────┘\n\nOUTPUT FUNDADOR (F1/BLUF):\n  → Uma frase de produto: \"ABS converte briefing em diagnóstico, decisão e\n    plano de 30 dias — para consultores PME entregarem mais rápido.\"\n  → Escopo IN: corpus, skill MVP, caso Ana, validação, portfólio.\n  → Escopo OUT: SaaS, marketplace, multi-setor, consultoria executiva.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 1.3 — Cynefin\nAplicado a: Classificação do domínio de problema do ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌───────────────────┬───────────────────────────────────────────────────────────┐\n│ Domínio Cynefin   │ Análise aplicada ao ABS / Corpus                          │\n├───────────────────┼───────────────────────────────────────────────────────────┤\n│ SIMPLE            │ NÃO aplicável. Problema não tem resposta única e óbvia.   │\n│ (Simples)         │ Cada briefing de PME tem variáveis distintas.             │\n├───────────────────┼───────────────────────────────────────────────────────────┤\n│ COMPLICATED       │ PARCIALMENTE aplicável. O framework consultivo            │\n│ (Complicado)      │ (SWOT, 5W2H, Diagnóstico) é complicado mas solucionável   │\n│                   │ com expertise. O ABS resolve exatamente este domínio:     │\n│                   │ transforma expertise em skill replicável. (A01, A08)      │\n├───────────────────┼───────────────────────────────────────────────────────────┤\n│ COMPLEX           │ ALTA RELEVÂNCIA. O mercado de consultoria PME,            │\n│ (Complexo)        │ demanda de produto e aceitação de consultores são          │\n│                   │ complexos. Estratégia: testar → observar → adaptar.       │\n│                   │ Isso justifica o Gate R3 (Validação com consultor) e o    │\n│                   │ ciclo PDCA na F5. (A04 Risco 2, A12 R3, A06)             │\n├───────────────────┼───────────────────────────────────────────────────────────┤\n│ CHAOTIC           │ NÃO aplicável no estado atual. Não há crise imediata.     │\n│ (Caótico)         │ Risco só ativa se produto for lançado sem validação.      │\n│                   │ Gate ADR-003 previne isso. (A11 ADR-003)                  │\n└───────────────────┴───────────────────────────────────────────────────────────┘\n\nDECISÃO CYNEFIN PARA LEONARDO:\n┌─────────────────────────────────────────────────────────────────────────────┐\n│ Domínio primário: COMPLEX → exige sondagem antes de escala.                 │\n│ Domínio da skill em si: COMPLICATED → resolvível com expertise encapsulada. │\n│ Implicação: construir skill MVP (domínio complicado) para navegar           │\n│ mercado complexo. Não escalar antes de ter sinal real. (A04, A12)          │\n└─────────────────────────────────────────────────────────────────────────────┘\n\nOUTPUT FUNDADOR (F1/TOTAL):\n  Tese: ABS resolve problema \"complicado\" (expertise consultiva) em mercado\n  \"complexo\" (aceitação, demanda, posicionamento). Construir primeiro; validar\n  depois; escalar só com sinal confirmado.\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF2 — DIAGNÓSTICO\nFrameworks: SWOT | 5Whys | Ishikawa | Porter | JTBD | TOC\nCamada: consultant + simulation (fixture Ana)\nPergunta do Leonardo: O caso Ana prova que o sistema consegue pensar como\nconsultor?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 2.1 — SWOT\nAplicado a: Diagnóstico do produto ABS (não do negócio da Ana)\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────┬────────────────────────────────────────────────────────┐\n│ Quadrante            │ Análise do ABS extraída do Corpus                      │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ STRENGTHS            │ • Sistema modular e low-code (A09, A10)                │\n│ (Forças)             │ • 3 outputs claros e limitados (ADR-003, A07)          │\n│                      │ • Labels epistemológicos previnem alucinação (A09)     │\n│                      │ • Corpus v1.1 com 17 artefatos preenchidos (A05)       │\n│                      │ • Gates que bloqueiam recomendação sem evidência (A16) │\n│                      │ • Fixture Ana concreta e aderente ao ICP (A03 FAQ)    │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ WEAKNESSES           │ • Produto ainda não validado com consultor real (A04)  │\n│ (Fraquezas)          │ • SKILL.md ainda não escrito (A14 Backlog P0)          │\n│                      │ • Sem portfólio público ainda (A12 R4)                │\n│                      │ • Dependência do founder para todas as funções (A05)   │\n│                      │ • Output pode parecer genérico se fixture for fraca    │\n│                      │   (A04 Risco 3)                                        │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ OPPORTUNITIES        │ • Mercado amplo: consultores PME independentes,        │\n│ (Oportunidades)      │   Sebrae/ALI, contadores consultivos (A02 ICP)         │\n│                      │ • Portfólio AI-adjacent para mercado holandês (A04)    │\n│                      │ • Monetização múltipla: skill, curso, ebook, 1:1       │\n│                      │   (A04 Benefício comercial)                            │\n│                      │ • Track A e Track B se alimentam mutuamente (ADR-006) │\n│                      │ • Demanda latente: consultores pagam por padronização   │\n│                      │   (A02 Lacunas a validar)                              │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ THREATS              │ • Consultores podem não perceber valor pago (A04 R2)   │\n│ (Ameaças)            │ • Output pode parecer substituto de IA genérica (A04)  │\n│                      │ • Escopo pode inflar antes de validação (A04 Risco 1)  │\n│                      │ • Competição com ferramentas de IA existentes           │\n│                      │ • Confusão founder/produto/fixture (ADR-001, A17 I1)  │\n└──────────────────────┴────────────────────────────────────────────────────────┘\n\nDIAGNÓSTICO SWOT — SÍNTESE:\n  Força principal: sistema consultivo estruturado com guardrails epistêmicos.\n  Fraqueza crítica: falta de validação externa com consultor real (gate R3).\n  Ação prioritária: escrever SKILL.md e rodar Ana antes de qualquer publicação.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 2.2 — 5 Whys\nAplicado a: Raiz do problema central que o ABS resolve\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────┬─────────────────────────────────────────────────────────────────────────┐\n│ Why  │ Cadeia causal extraída do Corpus                                        │\n├──────┼─────────────────────────────────────────────────────────────────────────┤\n│ P    │ PROBLEMA SUPERFICIAL: Consultores PME demoram para entregar            │\n│      │ diagnóstico e plano ao cliente. (A01 — Problema central)               │\n├──────┼─────────────────────────────────────────────────────────────────────────┤\n│ W1   │ Por quê? Porque não há fluxo padronizado: cada caso é resolvido        │\n│      │ de forma artesanal, sem estrutura replicável. (A01, A02 Dor)          │\n├──────┼─────────────────────────────────────────────────────────────────────────┤\n│ W2   │ Por quê? Porque consultores estruturam briefing, diagnóstico e plano   │\n│      │ manualmente, sem ferramenta que separe fato de hipótese e lacuna.      │\n│      │ (A07 Feature 2; A08 Etapa 3)                                          │\n├──────┼─────────────────────────────────────────────────────────────────────────┤\n│ W3   │ Por quê? Porque o raciocínio consultivo é implícito (expertise tácita) │\n│      │ e nunca foi encapsulado em sistema operacional replicável. (A01)       │\n├──────┼─────────────────────────────────────────────────────────────────────────┤\n│ W4   │ Por quê? Porque construir esse sistema exige design de prompt,         │\n│      │ fluxo de dados, templates e gates — habilidades que consultores PME   │\n│      │ tradicionais não têm tempo ou interesse de desenvolver. (A04, A10)    │\n├──────┼─────────────────────────────────────────────────────────────────────────┤\n│ W5   │ Por quê? Porque o mercado de consultoria PME ainda não tem produto    │\n│      │ AI-first validado para esse segmento específico — deixando espaço     │\n│      │ para o ABS ocupar antes de ferramentas genéricas dominarem. (A02)     │\n└──────┴─────────────────────────────────────────────────────────────────────────┘\n\nRAIZ IDENTIFICADA (5 Whys):\n  A expertise consultiva é tácita e nunca foi encapsulada em sistema\n  operacional replicável. O ABS é exatamente essa encapsulação.\n  Implicação: o produto tem valor intrínseco de sistematização, não apenas\n  automação.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 2.3 — Ishikawa (Diagrama de Causa e Efeito)\nAplicado a: Causas da entrega consultiva artesanal e lenta para PME\n────────────────────────────────────────────────────────────────────────────────\n\nEFEITO CENTRAL: Consultor PME entrega diagnóstico artesanal, lento e inconsistente.\n\n┌──────────────────┬──────────────────────────────────────────────────────────┐\n│ Espinha (Causa)  │ Sub-causas extraídas do Corpus                           │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ MÉTODO           │ • Sem fluxo padronizado de briefing → diagnóstico → plano │\n│                  │ • Sequência improvisada caso a caso (A01, A08)            │\n│                  │ • Ausência de labels epistemológicos (FATO/HIP/LAC)       │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ FERRAMENTA       │ • Sem templates de diagnóstico PME (A14 Backlog P1)      │\n│                  │ • Sem gerador de matriz de decisão padronizado (A07 F4)  │\n│                  │ • Sem plano 5W2H automatizado (A07 F5)                   │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ PESSOAS          │ • Consultores com expertise tácita não documentada (A01) │\n│                  │ • Clientes PME sem clareza sobre o que precisam (A02)    │\n│                  │ • Founders sem ativo sistematizável (A04)                │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ INFORMAÇÃO       │ • Briefing bruto e desorganizado (A08 — Input aceito)    │\n│                  │ • Mistura de fatos, hipóteses e desejos sem separação    │\n│                  │ • Lacunas críticas não identificadas antes da recomendação│\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ GESTÃO           │ • Sem gates de qualidade no fluxo consultivo (A16 Gates) │\n│                  │ • Sem QA anti-alucinação (A09 NFR)                       │\n│                  │ • Sem separação clara de escopo (A05 Charter IN/OUT)     │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ MERCADO          │ • Demanda latente não validada (A02 Lacunas)             │\n│                  │ • Sem produto AI-first consolidado para segmento PME     │\n│                  │ • Risco de percepção de output genérico (A04 Risco 3)   │\n└──────────────────┴──────────────────────────────────────────────────────────┘\n\nSÍNTESE ISHIKAWA:\n  O ABS ataca as causas de MÉTODO (fluxo padronizado), FERRAMENTA (templates)\n  e INFORMAÇÃO (labels epistemológicos). Causas de MERCADO são tratadas via\n  validação controlada (Gate R3, A12).\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 2.4 — Porter (5 Forças)\nAplicado a: Análise competitiva do ABS no mercado de consultoria PME\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────────┬──────────────────────────────────────────────────┐\n│ Força de Porter          │ Análise do ABS extraída do Corpus                │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 1. RIVALIDADE            │ MODERADA. Consultoria PME artesanal é fragmentada.│\n│    entre competidores    │ Ferramentas IA genéricas (ChatGPT, Gemini) são    │\n│                          │ concorrentes indiretos. Nenhum produto específico │\n│                          │ para esse fluxo foi identificado no corpus.       │\n│                          │ (A01, A02 MRD)                                   │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 2. AMEAÇA DE NOVOS       │ ALTA. Ferramentas de IA evoluem rápido. Barreira  │\n│    ENTRANTES             │ de entrada baixa para prompt-based tools.         │\n│                          │ Mitigação do ABS: especialização em PME local e   │\n│                          │ encapsulamento de expertise consultiva real (A01). │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 3. PODER DOS             │ MODERADO. Consultores PME têm opções (fazer       │\n│    COMPRADORES           │ manualmente, usar ChatGPT livre). Disposição a    │\n│    (Consultores)         │ pagar ainda não validada (A02 Lacunas a validar). │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 4. PODER DOS             │ BAIXO. Stack inicial é Markdown, YAML, PDF, GitHub│\n│    FORNECEDORES          │ — sem dependência de fornecedor único (A10 Stack  │\n│                          │ inicial, ADR-005).                                │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 5. AMEAÇA DE             │ MODERADA. Consultor pode montar fluxo próprio via │\n│    SUBSTITUTOS           │ planilha + ChatGPT. ABS se diferencia pelos gates,│\n│                          │ labels epistemológicos e outputs padronizados que  │\n│                          │ reduzem risco de recomendação sem evidência (A09). │\n└──────────────────────────┴──────────────────────────────────────────────────┘\n\nPOSICIONAMENTO ESTRATÉGICO (Porter):\n  Janela competitiva existe: especialização em fluxo consultivo PME com\n  guardrails epistêmicos não está sendo entregue por IAs genéricas.\n  Urgência: validar antes que ferramentas genéricas evoluam para cobrir o gap.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 2.5 — JTBD (Jobs to Be Done)\nAplicado a: Trabalho real que o ABS executa para seus usuários\n────────────────────────────────────────────────────────────────────────────────\n\nUSUÁRIO PRIMÁRIO: Consultor PME\n\n┌──────────────────┬────────────────────────────────────────────────────────────┐\n│ Dimensão JTBD    │ Análise extraída do Corpus                                 │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ JOB FUNCIONAL    │ \"Me ajude a transformar um briefing bagunçado de cliente   │\n│ (o que o         │ PME em diagnóstico estruturado, matriz de decisão e plano  │\n│ usuário quer     │ de ação profissional em tempo mínimo.\" (A01, A02, A07)     │\n│ realizar)        │                                                            │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ JOB EMOCIONAL    │ \"Quero me sentir como um consultor sênior, mesmo em casos  │\n│ (como quer se    │ simples — sem improvisar nem parecer amador.\" (A02 Dor do  │\n│ sentir)          │ usuário: \"parecer sênior mesmo em casos simples\")          │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ JOB SOCIAL       │ \"Quero que meu cliente final entenda o que recomendei e    │\n│ (como quer ser   │ veja que veio de uma análise séria, não de um chute.\"      │\n│ percebido)       │ (A02, A07 Acceptance criteria)                             │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ TRIGGER DE       │ Consultor recebeu caso novo de PME; cliente quer resposta  │\n│ CONTRATAÇÃO      │ rápida; consultor tem pouco tempo para estruturar; precisa │\n│                  │ parecer profissional. (A03 PRFAQ, A02 Dor do usuário)     │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ CRITÉRIO DE      │ Output produzido em 1 sessão; linguagem simples para o     │\n│ SUCESSO          │ cliente final; recomendação rastreável a evidência;        │\n│                  │ retrabalho mínimo. (A02 MR1-MR6, A09 NFR)                │\n├──────────────────┼────────────────────────────────────────────────────────────┤\n│ CONCORRENTES     │ Fazer manualmente (planilha + intuição); usar ChatGPT sem  │\n│ FUNCIONAIS       │ estrutura; contratar analista júnior; não fazer diagnóstico│\n│                  │ e ir direto ao plano. (A02, A07)                          │\n└──────────────────┴────────────────────────────────────────────────────────────┘\n\nJTBD — USUÁRIO SECUNDÁRIO: Cliente Final PME (via consultor)\n\n┌─────────────────────────────────────────────────────────────────────────────┐\n│ Job: \"Quero saber se abro ou não, quanto preciso vender, o que faço        │\n│ primeiro — sem precisar entender consultoria.\" (A02 Dor do cliente final)  │\n│ Output esperado: resposta em linguagem simples, plano executável de 30 dias.│\n│ (A07, A16)                                                                  │\n└─────────────────────────────────────────────────────────────────────────────┘\n\nSÍNTESE JTBD:\n  O ABS contrata dois jobs simultâneos: (1) acelerar e padronizar o trabalho\n  do consultor; (2) traduzir a decisão para a linguagem do cliente PME.\n  Produto que resolve apenas um dos dois não completa o valor.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 2.6 — TOC (Theory of Constraints)\nAplicado a: Gargalo principal na cadeia de valor do ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────────┬──────────────────────────────────────────────────┐\n│ Etapa TOC                │ Análise do ABS extraída do Corpus                │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 1. IDENTIFICAR           │ GARGALO ATUAL: SKILL.md não existe ainda.        │\n│    o gargalo             │ Sem o SKILL.md operacional, todo o corpus v1.1   │\n│                          │ é estratégia sem execução. (A14 Backlog P0)      │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 2. EXPLORAR              │ Focar 100% do próximo ciclo em escrever o         │\n│    o gargalo             │ SKILL.md + prompt operacional + rodar Ana.        │\n│                          │ Nada mais deve avançar antes disso. (A12 R1)     │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 3. SUBORDINAR            │ README, landing, LinkedIn, ebook, vídeo, curso —  │\n│    tudo ao gargalo       │ todos são bloqueados até SKILL.md + demo Ana      │\n│                          │ estarem prontos. (A14 P1/P2 — Status \"fazer      │\n│                          │ depois da validação\")                             │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 4. ELEVAR                │ Após demo Ana: feedback de consultor real (R3).   │\n│    o gargalo             │ Após R3: o gargalo muda para publicação (R4).     │\n│                          │ Após R4: muda para geração de demanda (R5, R6).  │\n│                          │ (A12 Roadmap)                                    │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ 5. EVITAR INÉRCIA        │ Não construir bundle FULL antes de validação.     │\n│                          │ Não expandir para setores antes de feedback.      │\n│                          │ (A04 Gate de avanço, A11 ADR-003)                │\n└──────────────────────────┴──────────────────────────────────────────────────┘\n\nSÍNTESE TOC:\n  Gargalo atual: SKILL.md não escrito.\n  Sequência de desbloqueio: SKILL.md → Demo Ana → Feedback consultor →\n  Publicação → Escala.\n  Regra operacional: não avançar etapa sem completar gargalo anterior.\n\nOUTPUT FUNDADOR (F2/TOTAL):\n  Diagnóstico do produto confirmado pelo corpus. Fixture Ana é suficiente para\n  provar o sistema. Lacunas identificadas: SKILL.md inexistente, validação\n  externa pendente, portfólio não publicado. Produto tem valor de\n  diferenciação claro: guardrails epistêmicos + foco PME.\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF3 — PRIORIZAÇÃO\nFrameworks: GUT | Pareto | MECE\nCamada: founder + consultant\nPergunta do Leonardo: Qual é o menor conjunto de entregáveis que prova valor?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 3.1 — GUT (Gravidade / Urgência / Tendência)\nAplicado a: Priorização do backlog P0 do ABS\n────────────────────────────────────────────────────────────────────────────────\n\nEscala: 1 (baixo) a 5 (alto) | Score = G × U × T\n\n┌─────────────────────────────────────┬───┬───┬───┬───────┬────────────────────┐\n│ Item do Backlog                     │ G │ U │ T │ Score │ Decisão            │\n├─────────────────────────────────────┼───┼───┼───┼───────┼────────────────────┤\n│ Escrever SKILL.md do ABS           │ 5 │ 5 │ 5 │  125  │ FAZER AGORA (P0)   │\n│ Criar prompt operacional MVP        │ 5 │ 5 │ 5 │  125  │ FAZER AGORA (P0)   │\n│ Rodar Ana nos 3 outputs MVP         │ 5 │ 5 │ 4 │  100  │ FAZER AGORA (P0)   │\n│ QA checklist anti-confusão          │ 4 │ 5 │ 4 │   80  │ FAZER AGORA (P0)   │\n│ Template diagnóstico executivo      │ 4 │ 4 │ 4 │   64  │ FAZER LOGO (P1)    │\n│ Template matriz de decisão          │ 4 │ 4 │ 4 │   64  │ FAZER LOGO (P1)    │\n│ Template plano 5W2H                 │ 4 │ 4 │ 4 │   64  │ FAZER LOGO (P1)    │\n│ README público do projeto           │ 3 │ 3 │ 4 │   36  │ APÓS DEMO (P1)     │\n│ Case study \"Ana fixture\"            │ 3 │ 3 │ 4 │   36  │ APÓS DEMO (P1)     │\n│ Landing simples ABS                 │ 3 │ 3 │ 3 │   27  │ APÓS VALIDAÇÃO (P1)│\n│ Post LinkedIn tese do produto       │ 2 │ 3 │ 3 │   18  │ APÓS PORTFÓLIO (P2)│\n│ Blog AI-Natomy skill para PME       │ 2 │ 2 │ 3 │   12  │ APÓS VALIDAÇÃO (P2)│\n│ Ebook/guia de uso                   │ 2 │ 1 │ 3 │    6  │ DEPOIS (P2)        │\n│ Vídeo aula 28 min                   │ 2 │ 1 │ 3 │    6  │ DEPOIS (P2)        │\n│ Setores adicionais                  │ 1 │ 1 │ 2 │    2  │ SOMENTE PÓS-SIGNAL │\n│ Export PDF/XLSX automático          │ 1 │ 1 │ 2 │    2  │ SOMENTE PÓS-SIGNAL │\n└─────────────────────────────────────┴───┴───┴───┴───────┴────────────────────┘\n\nGUT — DECISÃO:\n  Bloco P0 inegociável: SKILL.md + prompt + Ana + QA.\n  Nada do P1/P2 deve ser tocado antes do P0 estar completo.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 3.2 — Pareto (80/20)\nAplicado a: Identificação dos 20% de esforço que geram 80% do valor do MVP\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────────────┬──────────────────────────────────────────────┐\n│ 20% de Ação                  │ 80% de Resultado esperado                    │\n├──────────────────────────────┼──────────────────────────────────────────────┤\n│ 1. Escrever SKILL.md         │ Produto operacional existe; skill pode ser   │\n│                              │ testada, demonstrada e compartilhada.        │\n├──────────────────────────────┼──────────────────────────────────────────────┤\n│ 2. Rodar Ana nos 3 outputs   │ Demo concreto disponível; prova de           │\n│                              │ funcionamento; base para feedback de         │\n│                              │ consultor; case study gerado automaticamente. │\n├──────────────────────────────┼──────────────────────────────────────────────┤\n│ 3. Validar com 1 consultor   │ Sinal de mercado real; validação externa;    │\n│    real                      │ critério de go/refine/no-go para expansão.   │\n└──────────────────────────────┴──────────────────────────────────────────────┘\n\nPARETO — ITENS FORA DO 20% CRÍTICO (não bloquear por eles):\n  • Ebook, vídeo, landing polida, marketing de conteúdo, automação PDF/XLSX.\n  • Esses itens têm alto custo de tempo e baixo impacto na validação central.\n  • Referência: A14 Backlog P2/P3 — \"depois da validação\" e \"somente após\n    feedback\".\n\nSÍNTESE PARETO:\n  3 ações = SKILL.md + Demo Ana + 1 consultor real.\n  Tudo mais é derivado ou posterior.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 3.3 — MECE (Mutuamente Exclusivo, Coletivamente Exaustivo)\nAplicado a: Estrutura dos entregáveis do MVP sem sobreposição e sem lacuna\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────┬──────────────────────────────────────────────────────┐\n│ Categoria MECE       │ Itens do MVP (sem sobreposição, sem lacuna)          │\n├──────────────────────┼──────────────────────────────────────────────────────┤\n│ A. PRODUTO CORE      │ SKILL.md; prompt operacional; QA checklist;          │\n│    (o que executa)   │ anti-confusion rule; fixture Ana; SOP consultor.     │\n├──────────────────────┼──────────────────────────────────────────────────────┤\n│ B. OUTPUT DO         │ Template diagnóstico executivo; template matriz de   │\n│    PRODUTO           │ decisão; template 5W2H 30 dias.                     │\n│    (o que entrega)   │ [Exatamente 3 — nenhum a mais no MVP]               │\n├──────────────────────┼──────────────────────────────────────────────────────┤\n│ C. PROVA DE          │ Demo case Ana completo; GitHub README; case study    │\n│    FUNCIONAMENTO     │ público do fixture.                                  │\n│    (o que demonstra) │                                                      │\n├──────────────────────┼──────────────────────────────────────────────────────┤\n│ D. VALIDAÇÃO         │ Roteiro de teste com consultor real; métricas de     │\n│    EXTERNA           │ tempo/clareza/utilidade; registro de feedback.       │\n│    (o que confirma)  │                                                      │\n├──────────────────────┼──────────────────────────────────────────────────────┤\n│ E. PORTFÓLIO         │ Landing simples; post LinkedIn; README público;      │\n│    PÚBLICO           │ pitch de 1 página; blog/case study.                  │\n│    (o que distribui) │ [Desbloqueado apenas após D]                        │\n└──────────────────────┴──────────────────────────────────────────────────────┘\n\nMECE — VERIFICAÇÃO:\n  ✓ Exclusividade: cada item pertence a exatamente uma categoria.\n  ✓ Exaustividade: todas as dimensões do corpus estão cobertas (A14, A15,\n    A16, A12).\n  ✗ Sobreposições detectadas e removidas: ebook e vídeo foram movidos para\n    fora do MVP (pertencem ao Track B/distribuição posterior).\n\nOUTPUT FUNDADOR (F3/TOTAL):\n  Backlog priorizado: P0 = SKILL.md + prompt + Ana + QA.\n  MVP mínimo = 5 itens (A+B).\n  Portfólio = desbloqueado após validação real (D→E).\n  Regra operacional: não tocar E sem completar D.\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF4 — PLANO\nFrameworks: 5W2H | OKR | 7Ps | BSC\nCamada: founder + consultant\nPergunta do Leonardo: Como executo isso nos próximos 30 dias?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 4.1 — 5W2H\nAplicado a: Plano de execução do MVP do ABS — 30 dias\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────┬──────────────────────────────────────────────────────────────┐\n│ Dimensão     │ Resposta extraída e aplicada ao Corpus                       │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ WHAT         │ Construir SKILL.md operacional do ABS, rodar caso Ana nos    │\n│ (O quê)      │ 3 outputs MVP, validar com 1 consultor real, publicar        │\n│              │ portfólio mínimo (GitHub + README + case study).             │\n│              │ (A14 Backlog P0/P1, A12 R1-R4)                              │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ WHY          │ Para provar que o sistema funciona, gerar ativo de portfólio │\n│ (Por quê)    │ verificável, coletar sinal de mercado e avançar para         │\n│              │ publicação pública e candidaturas. (A04, A05 Objetivo)      │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ WHO          │ Leonardo: responsável por 100% das entregas do MVP.          │\n│ (Quem)       │ Consultores PME convidados: consultados na validação (R3).   │\n│              │ Ana: fixture de teste, sem responsabilidade própria.         │\n│              │ (A05 RACI, A05 Charter)                                      │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ WHERE        │ Arquivos locais (Markdown/YAML); GitHub para publicação;     │\n│ (Onde)       │ LinkedIn para distribuição; landing simples para portfólio.  │\n│              │ (A10 Stack inicial, A12 R4-R5)                               │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ WHEN         │ Semana 1–2: SKILL.md + prompt + QA.                          │\n│ (Quando)     │ Semana 3–4: Demo Ana completo (diagnóstico + matriz + 5W2H). │\n│              │ Semana 4–5: Feedback de consultor real.                      │\n│              │ Semana 5–6: README + GitHub + landing.                       │\n│              │ (A12 Roadmap R1-R4)                                          │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ HOW          │ Markdown para corpus e SKILL.md; YAML para estrutura;        │\n│ (Como)       │ prompt operacional direto; templates dos 3 outputs;          │\n│ (Método)     │ QA checklist anti-alucinação; SOP do consultor.             │\n│              │ (A10 ArchSpec, A09 NFR, A16 SOP)                            │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ HOW MUCH     │ Custo principal: tempo do Leonardo.                           │\n│ (Quanto)     │ Ferramentas: zero custo direto (Markdown, GitHub, LLM).      │\n│ (Custo)      │ Modelo: founder-led, low-cost, sem SaaS próprio no MVP.      │\n│              │ (A06 BRD Constraints, A04 Investimento principal)            │\n└──────────────┴──────────────────────────────────────────────────────────────┘\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 4.2 — OKR (Objectives and Key Results)\nAplicado a: Plano de 30/60/90 dias do ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────────────────────────────────────────────────────────────┐\n│ OBJETIVO 1 (30 dias): Produto operacional existente e testável              │\n├───────────────────────────────────┬──────────────────────────────────────────┤\n│ KR 1.1                            │ SKILL.md v0.2 escrito e funcional       │\n│ KR 1.2                            │ Caso Ana gera 3 outputs sem expansão    │\n│ KR 1.3                            │ QA checklist validado (0 alucinações)   │\n│ KR 1.4                            │ Templates dos 3 outputs finalizados     │\n└───────────────────────────────────┴──────────────────────────────────────────┘\n\n┌──────────────────────────────────────────────────────────────────────────────┐\n│ OBJETIVO 2 (60 dias): Validação externa com pelo menos 1 consultor real    │\n├───────────────────────────────────┬──────────────────────────────────────────┤\n│ KR 2.1                            │ Redução de tempo percebida ≥ 20%        │\n│ KR 2.2                            │ Output compreensível para cliente PME   │\n│ KR 2.3                            │ Consultor reconhece utilidade operacional│\n│ KR 2.4                            │ Feedback documentado no runbook (A17)  │\n└───────────────────────────────────┴──────────────────────────────────────────┘\n\n┌──────────────────────────────────────────────────────────────────────────────┐\n│ OBJETIVO 3 (90 dias): Produto público como portfólio e oferta inicial      │\n├───────────────────────────────────┬──────────────────────────────────────────┤\n│ KR 3.1                            │ GitHub + README + case study publicados │\n│ KR 3.2                            │ Landing ABS online                      │\n│ KR 3.3                            │ ≥ 1 post LinkedIn com engajamento real  │\n│ KR 3.4                            │ Veredito: continuar/ajustar/pivotar     │\n└───────────────────────────────────┴──────────────────────────────────────────┘\n\nReferência de Corpus: A01 Métricas de sucesso, A04 Recomendação, A12 Roadmap.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 4.3 — 7Ps (Marketing Mix para serviço/produto digital)\nAplicado a: Posicionamento do ABS como produto/serviço\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────┬──────────────────────────────────────────────────────────────┐\n│ P            │ Definição do ABS extraída do Corpus                          │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PRODUCT      │ Skill operacional de diagnóstico consultivo: SKILL.md +      │\n│              │ prompt + 3 templates (diagnóstico, matriz, 5W2H). Output:    │\n│              │ relatório consultivo em linguagem simples para PME. (A07)   │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PRICE        │ MVP: validação gratuita com consultores parceiros.            │\n│              │ Futuro: produto digital (skill/template), pacote de          │\n│              │ implementação, consultoria 1:1, ebook, curso. (A04)         │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PLACE        │ GitHub (repositório + README); landing simples; LinkedIn;    │\n│              │ blog AI-Natomy; comunidades de consultores PME. (A10, A12)  │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PROMOTION    │ Case study público (Ana fixture); post LinkedIn; conteúdo    │\n│              │ blog; portfólio GitHub; pitch para recrutadores. (A12 R5-R6)│\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PEOPLE       │ Leonardo (founder/operador inicial); consultor PME           │\n│              │ (usuário validador); cliente final PME (beneficiário).       │\n│              │ (A07 Personas, A05 RACI)                                    │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PROCESS      │ Briefing bruto → Intake normalizado → Labels epistêmicos →  │\n│              │ Diagnóstico → Matriz → 5W2H → QA → Handover. (A10, A16)   │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ PHYSICAL     │ Outputs em Markdown/PDF; templates exportáveis; GitHub       │\n│ EVIDENCE     │ público; README; case study; landing. (A10, A15)           │\n└──────────────┴──────────────────────────────────────────────────────────────┘\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 4.4 — BSC (Balanced Scorecard)\nAplicado a: Métricas balanceadas de sucesso do ABS em 4 perspectivas\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────────┬──────────────────────────────────────────────────┐\n│ Perspectiva BSC          │ Métricas do ABS extraídas do Corpus              │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ FINANCEIRA               │ • Intenção de pagamento por consultor validado   │\n│                          │ • Custo zero de MVP (ferramentas gratuitas)      │\n│                          │ • Potencial de monetização mapeado (A04)         │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ CLIENTE                  │ • Redução de tempo do consultor ≥ 20%            │\n│                          │ • Output compreensível para cliente PME          │\n│                          │ • Consultor entende fluxo sem treinamento extra  │\n│                          │ • Pouco retrabalho no output (A01 Métricas)      │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ PROCESSOS INTERNOS       │ • SKILL.md escrito e funcional (P0)              │\n│                          │ • 3 outputs gerados sem expansão indevida        │\n│                          │ • Gates QA funcionando (A16, A17)               │\n│                          │ • Runbook atualizado após cada validação (A17)  │\n├──────────────────────────┼──────────────────────────────────────────────────┤\n│ APRENDIZADO /            │ • Portfólio verificável publicado (A04 Carreira) │\n│ CRESCIMENTO              │ • Case study gerado como evidência pública       │\n│                          │ • Feedback de consultor registrado e aplicado    │\n│                          │ • Decisão documentada (go/refine/pivot) no D91   │\n└──────────────────────────┴──────────────────────────────────────────────────┘\n\nOUTPUT FUNDADOR (F4/TOTAL):\n  Plano de 30 dias: SKILL.md (S1-2) → Demo Ana (S3-4) → Consultor (S4-5)\n  → Portfólio (S5-6). OKRs com 4 KRs por objetivo. 7Ps definidos para\n  oferta MVP. BSC com 4 perspectivas e métricas rastreáveis do corpus.\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF5 — EXECUÇÃO\nFrameworks: PDCA | OODA\nCamada: founder + consultant\nPergunta do Leonardo: O que aprendo a cada rodada?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 5.1 — PDCA (Plan / Do / Check / Act)\nAplicado a: Ciclos de melhoria contínua do ABS após MVP\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────┬──────────────────────────────────────────────────────────────────┐\n│ Fase     │ Ação do ABS extraída do Corpus                                   │\n├──────────┼──────────────────────────────────────────────────────────────────┤\n│ PLAN     │ Definir hipótese de melhoria com base no feedback do consultor.  │\n│          │ Ex: \"Output de diagnóstico ainda tem jargão → simplificar         │\n│          │ linguagem do template.\" (A17 Runbook — registro de feedback)     │\n├──────────┼──────────────────────────────────────────────────────────────────┤\n│ DO       │ Ajustar SKILL.md, prompt, template ou gate conforme hipótese.    │\n│          │ Rodar Ana novamente com versão ajustada. (A17 Recovery,          │\n│          │ A16 SOP Passo 10)                                                │\n├──────────┼──────────────────────────────────────────────────────────────────┤\n│ CHECK    │ Medir: tempo de geração, retrabalho, clareza percebida,           │\n│          │ feedback do consultor, utilidade do plano. (A17 Métricas         │\n│          │ operacionais: tempo / retrabalho / clareza / feedback / utilidade)│\n├──────────┼──────────────────────────────────────────────────────────────────┤\n│ ACT      │ Se melhora confirmada: incorporar ao corpus e atualizar BRD,     │\n│          │ PRD, FRD, SOP e Backlog. Se não: descartar hipótese e tentar     │\n│          │ próxima. (A17 Runbook — \"Após cada validação real\")              │\n└──────────┴──────────────────────────────────────────────────────────────────┘\n\nPDCA — INCIDENTES REGISTRADOS NO RUNBOOK (A17):\n┌──────────────────────────────────────────────────────────────────────────────┐\n│ Incidente               │ Ação PDCA                                         │\n├─────────────────────────┼───────────────────────────────────────────────────┤\n│ Skill gera docs da Ana  │ Plan: identificar anti_confusion_rule quebrada.    │\n│                         │ Do: aplicar regra e rebaixar Ana para fixture.     │\n├─────────────────────────┼───────────────────────────────────────────────────┤\n│ Expansão para 5+ outputs│ Plan: contrato MVP violado. Do: retornar a 3.     │\n├─────────────────────────┼───────────────────────────────────────────────────┤\n│ Promessa financeira      │ Plan: gate de QA falhou. Do: reforçar Passo 10.  │\n├─────────────────────────┼───────────────────────────────────────────────────┤\n│ Consultor não entende   │ Plan: SOP muito técnico. Do: simplificar + exemplo│\n│                         │ antes/depois.                                      │\n└──────────────────────────────────────────────────────────────────────────────┘\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 5.2 — OODA (Observe / Orient / Decide / Act)\nAplicado a: Agilidade decisória do Leonardo durante execução\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────┬──────────────────────────────────────────────────────────────┐\n│ Fase OODA    │ Conteúdo operacional do ABS                                  │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ OBSERVE      │ O que sinaliza o ambiente?                                   │\n│              │ • Consultor entendeu ou não o output?                        │\n│              │ • Tempo economizado é percebido?                              │\n│              │ • Cliente PME entende o plano sem jargão?                    │\n│              │ • Output parece confiável ou genérico?                       │\n│              │ (A01 Métricas, A17 Métricas operacionais)                    │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ ORIENT       │ O que esse sinal significa?                                  │\n│              │ • Sinal positivo → produto no caminho certo, avançar R4.     │\n│              │ • Sinal fraco → identificar causa raiz (Ishikawa/5Whys).     │\n│              │ • Ausência de sinal → verificar se houve consultor real.     │\n│              │ (A04 Gate de avanço, A12 Dia 91 Decisão)                    │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ DECIDE       │ Go / Refine / Nichar / Pivotar.                              │\n│              │ Critérios de decisão: A04 \"Gate de avanço\" e A12 \"Dia 91\".  │\n│              │ Sem sinal real no Dia 91 → pivot obrigatório. (A12)          │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ ACT          │ Atualizar corpus, SKILL.md, templates, SOP conforme decisão. │\n│              │ Registrar no runbook. Iniciar próximo ciclo. (A17)           │\n└──────────────┴──────────────────────────────────────────────────────────────┘\n\nOUTPUT FUNDADOR (F5/TOTAL):\n  PDCA para qualidade contínua do produto; OODA para agilidade decisória\n  frente ao mercado. Registro de cada ciclo no Runbook (A17) é obrigatório.\n  Sem registro → sem aprendizado → produto não evolui.\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF6 — VALIDAÇÃO\nFrameworks: First Principles | PESTEL\nCamada: founder\nPergunta do Leonardo: Isso tem sinal real de mercado ou só parece bom para\nmim?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 6.1 — First Principles\nAplicado a: Validação da tese central do ABS — sem analogia, sem assunção\n────────────────────────────────────────────────────────────────────────────────\n\n┌────────────────────────────────┬────────────────────────────────────────────┐\n│ Pergunta First Principles      │ Resposta ancorada no Corpus                │\n├────────────────────────────────┼────────────────────────────────────────────┤\n│ O problema realmente existe?   │ SIM. Consultores PME perdem tempo com       │\n│                                │ briefing artesanal; clientes pequenos       │\n│                                │ recebem entrega inconsistente. (A01, A02)  │\n├────────────────────────────────┼────────────────────────────────────────────┤\n│ O ABS resolve de forma única?  │ PARCIALMENTE confirmado. Labels             │\n│                                │ epistemológicos + guardrails + foco PME    │\n│                                │ diferencia de ChatGPT genérico. Mas a      │\n│                                │ percepção de unicidade ainda precisa ser    │\n│                                │ validada por consultor real. (A02, A09)    │\n├────────────────────────────────┼────────────────────────────────────────────┤\n│ Consultor pagaria pelo         │ NÃO CONFIRMADO. Hipótese comercial: sim.   │\n│ produto?                       │ Confirmação: pendente (A02 Lacunas,        │\n│                                │ A04 Risco 2).                              │\n├────────────────────────────────┼────────────────────────────────────────────┤\n│ O output é replicável sem      │ HIPÓTESE: sim, via SKILL.md + SOP.         │\n│ o founder?                     │ Confirmação: depende de SKILL.md escrito   │\n│                                │ e testado por consultor externo. (A16 SOP) │\n├────────────────────────────────┼────────────────────────────────────────────┤\n│ O fixture Ana é representativo │ PROVAVELMENTE SIM. Estúdio de beleza em   │\n│ o suficiente?                  │ pré-abertura é caso frequente para         │\n│                                │ consultores PME. (A03 FAQ interno 1)       │\n├────────────────────────────────┼────────────────────────────────────────────┤\n│ O portfólio resolve a entrada  │ HIPÓTESE com base sólida. Portfólio AI-   │\n│ no mercado holandês?           │ first é diferencial para candidaturas       │\n│                                │ AI-adjacent entry-level. Confirmação via   │\n│                                │ candidatura real. (A04 Benefício carreira) │\n└────────────────────────────────┴────────────────────────────────────────────┘\n\nFIRST PRINCIPLES — VERDADES FUNDAMENTAIS DO ABS:\n  1. Briefings de PME são brutos → sempre verdade, não depende de validação.\n  2. Consultores têm expertise tácita → sempre verdade.\n  3. Encapsular expertise em sistema é possível → confirmado pelo corpus.\n  4. Consultor pagará → hipótese a ser testada. NÃO é verdade fundamental.\n  5. O output será suficientemente bom → hipótese a ser testada. Gate R3.\n\nVEREDITO PARCIAL (First Principles):\n  A tese central é sólida nas verdades fundamentais (1-3).\n  Os pontos 4 e 5 são hipóteses — e devem ser tratados como tal até R3.\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 6.2 — PESTEL\nAplicado a: Contexto externo que afeta o sucesso do ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────┬──────────────────────────────────────────────────────────┐\n│ Dimensão PESTEL  │ Análise para o ABS extraída do Corpus                   │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ POLITICAL        │ • Programas Sebrae e ALI: estrutura de apoio ao          │\n│                  │   consultor PME já existente e financiada. (A02 ICP)    │\n│                  │   OPORTUNIDADE: distribuição via canal Sebrae.           │\n│                  │ • Regulação MEI/CNAE: ABS deve orientar sem decidir     │\n│                  │   definitivamente — guardrail necessário. (A06, A09)    │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ ECONOMIC         │ • Mercado de MEI e microempresas é vasto no Brasil.      │\n│                  │ • Consultores PME independentes são numerosos e          │\n│                  │   pulverizados — mercado difuso mas acessível. (A02)    │\n│                  │ • Mercado holandês: foco em AI-adjacent entry-level.    │\n│                  │   Demanda crescente por profissionais que entendem IA   │\n│                  │   aplicada. (A04 Benefício de carreira)                 │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ SOCIAL           │ • MEI e pequenos negócios buscam decisões práticas,     │\n│                  │   não relatórios complexos. (A02 Dor cliente final)     │\n│                  │ • Consultores PME valorizam autonomia e rapidez —       │\n│                  │   produto founder-led é culturalmente adequado. (A02)   │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ TECHNOLOGICAL    │ • LLMs acessíveis e baratos tornam o ABS viável com     │\n│                  │   zero custo de infraestrutura no MVP. (A10 Stack)      │\n│                  │ • Risco: ferramentas genéricas (ChatGPT, Gemini) podem  │\n│                  │   cobrir parte do gap antes de validação. URGÊNCIA.     │\n│                  │ • Oportunidade: especialização e guardrails epistêmicos │\n│                  │   são diferenciais que IAs genéricas não entregam.     │\n│                  │   (A09 NFR, A11 ADR-007)                               │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ ENVIRONMENTAL    │ • Produto digital: impacto ambiental mínimo.             │\n│                  │ • Posicionamento low-cost e low-code: alinhado com       │\n│                  │   contexto de consultoria sustentável. (A06)            │\n├──────────────────┼──────────────────────────────────────────────────────────┤\n│ LEGAL            │ • LGPD: dados de clientes PME devem ser minimizados e   │\n│                  │   protegidos. Fixture Ana resolve o problema no MVP.    │\n│                  │   (A09 NFR LGPD/privacidade)                            │\n│                  │ • Restrição MEI/CNAE/alvará: ABS não pode emitir        │\n│                  │   orientação definitiva. Gate legal obrigatório.        │\n│                  │   (A06 Regras de negócio, A09 Legal/contábil)           │\n└──────────────────┴──────────────────────────────────────────────────────────┘\n\nVEREDITO PESTEL:\n  Ambiente favorável no eixo Tecnológico (LLMs baratos) e Social (demanda\n  PME por clareza). Canal político Sebrae/ALI é oportunidade de distribuição.\n  Risco principal: velocidade das ferramentas genéricas (T). Ação: validar\n  antes que a janela de diferenciação se feche.\n\nOUTPUT FUNDADOR (F6/TOTAL):\n┌─────────────────────────────────────────────────────────────────────────────┐\n│ VEREDITO DE VALIDAÇÃO:                                                      │\n│ Tese fundamentalmente sólida. Hipóteses críticas não confirmadas: pagamento │\n│ e replicabilidade sem founder. Gate R3 (consultor real) é o único voto     │\n│ que importa antes de qualquer expansão. Pivô obrigatório no Dia 91 se não  │\n│ houver sinal. (A04 Gate de avanço, A12 Dia 91)                            │\n└─────────────────────────────────────────────────────────────────────────────┘\n\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nF7 — HANDOVER\nFrameworks: BLUF | SCQA\nCamada: consultant → founder como publicador\nPergunta do Leonardo: Como transformo isso em ativo público?\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 7.1 — BLUF aplicado ao Handover Público\nAplicado a: Comunicação do ABS para cada audiência\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────────────┬────────────────────────────────────────────────────────┐\n│ Audiência            │ BLUF do ABS para essa audiência                        │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ CONSULTOR PME        │ O ABS transforma briefing bagunçado de cliente em      │\n│ (cliente do produto) │ diagnóstico, matriz de decisão e plano de 30 dias —   │\n│                      │ em uma sessão. Você para de improvisar e passa a       │\n│                      │ entregar mais rápido, com evidência. Teste grátis.    │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ RECRUTADOR           │ Leonardo construiu um sistema AI-first completo: corpus│\n│ (avaliador de        │ de 17 artefatos, skill operacional, caso demo e        │\n│ portfólio)           │ validação com profissional real. Evidência concreta de │\n│                      │ AI Integration, Workflow Design e Process Improvement. │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ CLIENTE FINAL PME    │ Meu consultor usou um sistema de análise para montar   │\n│ (beneficiário        │ esse relatório: aqui está o diagnóstico do seu negócio,│\n│ indireto)            │ as alternativas que avaliamos e o que você faz nos     │\n│                      │ próximos 30 dias. (A16 SOP Passo 11)                  │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ AUDIÊNCIA LINKEDIN   │ Construí uma skill de consultoria para PME que         │\n│ / BLOG               │ transforma briefing em diagnóstico executivo. Aqui     │\n│                      │ está o case, o método e o output real. (A12 R5)       │\n└──────────────────────┴────────────────────────────────────────────────────────┘\n\n\n────────────────────────────────────────────────────────────────────────────────\nFRAMEWORK 7.2 — SCQA aplicado ao Handover Público\nAplicado a: Estrutura narrativa do case study e README do ABS\n────────────────────────────────────────────────────────────────────────────────\n\n┌──────────────┬──────────────────────────────────────────────────────────────┐\n│ Elemento     │ Narrativa do case study ABS (para GitHub/blog/LinkedIn)      │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ SITUATION    │ Consultores PME atendem clientes que querem saber se abrem   │\n│              │ um negócio, como crescer ou o que priorizar — mas perdem     │\n│              │ tempo estruturando o raciocínio antes de responder. (A01)   │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ COMPLICATION │ Não existe sistema padronizado, replicável e com guardrails  │\n│              │ epistemológicos para esse fluxo. Ferramentas genéricas de IA │\n│              │ entregam texto, não raciocínio consultivo estruturado. (A01) │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ QUESTION     │ É possível encapsular o raciocínio de um consultor PME em    │\n│              │ uma skill operacional que qualquer consultor possa operar    │\n│              │ sem treinamento extenso e sem perder qualidade? (A01, A07)  │\n├──────────────┼──────────────────────────────────────────────────────────────┤\n│ ANSWER       │ Sim. O ABS resolve isso com: corpus de 17 artefatos, skill  │\n│              │ com labels epistemológicos e guardrails, fixture Ana como    │\n│              │ demo, e outputs em linguagem simples para o cliente final.   │\n│              │ Validado com consultor real. [inserir resultado de R3]       │\n└──────────────┴──────────────────────────────────────────────────────────────┘\n\nESTRUTURA DO HANDOVER PÚBLICO — MAPA DE ATIVOS:\n┌──────────────────────┬────────────────────────────────────────────────────────┐\n│ Ativo                │ Conteúdo e Referência do Corpus                        │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ README (GitHub)      │ Tese do produto + arquitetura + como usar + outputs    │\n│                      │ (A10, A07, A03 PRFAQ)                                  │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ Case Study           │ Fixture Ana: briefing → diagnóstico → matriz → 5W2H   │\n│                      │ (A03 PRFAQ, A16 SOP, templates)                        │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ Landing Page         │ Headline PRFAQ + FAQ + CTA para consultor testar       │\n│                      │ (A03 PRFAQ, A07 Personas)                              │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ Post LinkedIn        │ SCQA comprimido em 5 parágrafos + link para GitHub     │\n│                      │ (A12 R5, A03 Press release resumido)                   │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ Pitch (1 página)     │ BLUF + tese + outputs + metrics + sinal de validação   │\n│                      │ (A04 Business Case, A01 Métricas)                      │\n├──────────────────────┼────────────────────────────────────────────────────────┤\n│ Portfólio carreira   │ Evidência AI Integration + Workflow Design +           │\n│                      │ Process Improvement + B2B Client Management (A04)      │\n└──────────────────────┴────────────────────────────────────────────────────────┘\n\nOUTPUT FUNDADOR (F7/TOTAL):\n  Handover é a conversão do produto em ativo público e de carreira.\n  Gate de entrada em F7: validação R3 completa. Sem validação → não publicar\n  como produto validado. Publicar como \"work in progress\" apenas.\n\n\n================================================================================\nSUMÁRIO EXECUTIVO — FRAMEWORK STACK APLICADO AO ABS\n================================================================================\n\n┌────┬──────────────┬─────────────────────────────┬────────────────────────────┐\n│ F  │ Framework(s) │ Insight central do corpus    │ Output do fundador         │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F1 │ SCQA         │ Problema complicado em       │ Tese + escopo IN/OUT +     │\n│    │ BLUF         │ mercado complexo. Skill,     │ promessa MVP de 1 sessão   │\n│    │ Cynefin      │ não SaaS.                   │ com 3 outputs.             │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F2 │ SWOT         │ Produto sólido, mas sem      │ Prova de diagnóstico via   │\n│    │ 5Whys        │ SKILL.md e sem validação     │ Ana. Lacunas documentadas. │\n│    │ Ishikawa     │ externa. Expertise tácita    │ Gargalo: SKILL.md.         │\n│    │ Porter       │ é o diferencial encapsulado. │                            │\n│    │ JTBD         │                             │                            │\n│    │ TOC          │                             │                            │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F3 │ GUT          │ 20% de esforço (SKILL.md +  │ Backlog: P0 = 4 itens.     │\n│    │ Pareto       │ Ana + consultor) gera 80%   │ P1 após P0. P2 após        │\n│    │ MECE         │ do valor. Portfólio é        │ validação.                 │\n│    │              │ consequência, não pré-req.  │                            │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F4 │ 5W2H         │ Plano de 30 dias em 4       │ 5W2H completo + OKRs com   │\n│    │ OKR          │ semanas com gates claros.    │ 4 KRs/objetivo + 7Ps +     │\n│    │ 7Ps          │ Custo zero no MVP.           │ BSC com 4 perspectivas.    │\n│    │ BSC          │                             │                            │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F5 │ PDCA         │ Cada feedback de consultor  │ Ciclos registrados em       │\n│    │ OODA         │ deve gerar ciclo de melhoria │ Runbook. Decisão ágil com  │\n│    │              │ documentado. Sem registro →  │ OODA após cada observação. │\n│    │              │ sem evolução.               │                            │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F6 │ First        │ Tese sólida nas verdades     │ VEREDITO: hipóteses de     │\n│    │ Principles   │ fundamentais. Hipóteses de   │ pagamento e replicabilidade │\n│    │ PESTEL       │ pagamento e replicabilidade  │ dependem de R3. Pivot      │\n│    │              │ não confirmadas.             │ obrigatório no Dia 91.     │\n├────┼──────────────┼─────────────────────────────┼────────────────────────────┤\n│ F7 │ BLUF         │ 4 audiências, 4 mensagens   │ README + case study +       │\n│    │ SCQA         │ distintas. Portfólio só      │ landing + LinkedIn + pitch  │\n│    │              │ após validação R3.           │ + portfólio de carreira.   │\n└────┴──────────────┴─────────────────────────────┴────────────────────────────┘\n\n\n================================================================================\nSEQUÊNCIA DE EXECUÇÃO RECOMENDADA (consolidada do corpus)\n================================================================================\n\n┌───┬────────────────────────────────────┬──────────────────┬──────────────────┐\n│ # │ Ação                               │ Framework        │ Resultado        │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 1 │ Declarar tese do ABS em 1 página  │ BLUF + SCQA      │ Clareza produto  │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 2 │ Escrever SKILL.md v0.2            │ TOC (gargalo)    │ Skill operacional │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 3 │ Rodar Ana nos 3 outputs           │ SWOT + JTBD +    │ Diagnóstico demo  │\n│   │                                    │ 5Whys            │                  │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 4 │ Escolher menor MVP                │ Pareto + GUT +   │ Backlog enxuto   │\n│   │                                    │ MECE             │                  │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 5 │ Montar plano de 30 dias           │ 5W2H + OKR       │ Execução ctrl.   │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 6 │ Testar com consultor real         │ First Principles │ Validação externa │\n│   │                                    │ + PESTEL         │                  │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 7 │ Ajustar após feedback             │ PDCA + OODA      │ Produto melhorado │\n├───┼────────────────────────────────────┼──────────────────┼──────────────────┤\n│ 8 │ Publicar como portfólio           │ BLUF + SCQA      │ Ativo público    │\n│   │                                    │ (Handover)       │                  │\n└───┴────────────────────────────────────┴──────────────────┴──────────────────┘\n\n\n================================================================================\nREGRA GOVERNANTE (preservada do corpus)\n================================================================================\n\n  \"Frameworks não devem ser aplicados primeiro ao negócio da Ana;\n   devem orientar o produto do Leonardo. Ana é fixture.\"\n\n  • DONO DO CORPUS: Leonardo\n  • OBJETO PRIMÁRIO: ABS / Aurelio's Business Skills\n  • FIXTURE: Ana Souza (estúdio de beleza em pré-abertura)\n  • GATE INEGOCIÁVEL: validação com consultor real (R3) antes de escala\n  • PIVOT OBRIGATÓRIO: Dia 91 sem sinal real\n\n================================================================================\nFIM DO DOCUMENTO — ABS Framework Stack Analysis v1.1\nFonte: CORPUS_LEONARDO.md (17 artefatos A01–A17)\n================================================================================\n  \n\nPróximo passo executável\n\nAgora o caminho certo é transformar estes 17 artefatos em um SKILL.md operacional v0.2 com:\n\n1. ativadores;\n2. não ativadores;\n3. procedimento obrigatório;\n4. gates;\n5. outputs exatos;\n6. anti-confusion rule;\n7. fixture Ana;\n8. QA checklist;\n9. limite de primeira execução em 3 entregáveis.","stderr":""}
Auditoria completa. Encontrei **7 problemas estruturais** na sua skill. Deixa eu apresentar o relatório:
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
- No emoji — use CSS shapes or SVG paths
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
- **Icon sizing**: When using emoji or inline SVG icons, explicitly set `font-size: 16px` for emoji or `width: 16px; height: 16px` for SVG icons. Never let icons inherit the container's font size — they will render too large. For larger decorative icons, use 24px max.
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


## SVG setup

**ViewBox safety checklist** — before finalizing any SVG, verify:
1. Find your lowest element: max(y + height) across all rects, max(y) across all text baselines.
2. Set viewBox height = that value + 40px buffer.
3. Find your rightmost element: max(x + width) across all rects. All content must stay within x=0 to x=680.
4. For text with text-anchor="end", the text extends LEFT from x. If x=118 and text is 200px wide, it starts at x=-82 — outside the viewBox. Increase x or use text-anchor="start".
5. Never use negative x or y coordinates. The viewBox starts at 0,0.
6. **No unintentional overlaps.** For every pair of elements that aren't meant to layer (label-on-label, label-on-arrow, box-on-box, callout-on-shape), check their bounding boxes do not intersect. The only allowed overlaps are deliberate: a label centered inside its own box, an arrowhead touching the box it points to, a highlight rect behind the thing it highlights. If two unrelated elements would collide, move one — shorten the label, shift the y, add a row. A diagram with crossed labels reads as broken regardless of how good the content is.
7. Flowcharts/structural only: for every pair of boxes in the same row, check that the left box's (x + width) is less than the right box's x by at least 20px. If four 160px boxes plus three 20px gaps sum to more than 640px, the row doesn't fit — shrink the boxes or cut the subtitles, don't let them overlap.

**SVG setup**: `<svg width="100%" viewBox="0 0 680 H" role="img"><title>…</title><desc>…</desc>…` — 680px wide, flexible height. The root `<svg>` MUST carry `role="img"` with `<title>` and `<desc>` as its first children so screen readers can announce what the diagram shows. Set H to fit content tightly — the last element's bottom edge + 40px padding. Don't leave excess empty space below the content. Safe area: x=40 to x=640, y=40 to y=(H-40). Background transparent. **Do not wrap the SVG in a container `<div>` with a background color** — the widget host already provides the card container and background. Output the raw `<svg>` element directly.

**The 680 in viewBox is load-bearing — do not change it.** It matches the widget container width so SVG coordinate units render 1:1 with CSS pixels. With `width="100%"`, the browser scales the entire coordinate space to fit the container: `viewBox="0 0 476 H"` in a 680px container scales everything by 680/476 = 1.43×, so your `class="th"` 14px text renders at ~20px. The font calibration table below and all "text fits in box" math assume 1:1. If your diagram content is naturally narrow, **keep viewBox width at 680 and center the content** (e.g. content spans x=240..440) — do not shrink the viewBox to hug the content. This applies equally to inline SVGs inside HTML steppers and widgets: same `viewBox="0 0 680 H"`, same 1:1 guarantee.

**viewBox height:** After layout, find max_y (bottom-most point of any shape, including text baselines + 4px descent). Set viewBox height = max_y + 20. Don't guess.

**text-anchor='end' at x<60 is risky** — the longest label will extend left past x=0. Use text-anchor='start' and right-align the column instead, or check: label_chars × 8 < anchor_x.

**One SVG per tool call** — each call must contain exactly one <svg> element. Never leave an abandoned or partial SVG in the output. If your first attempt has problems, replace it entirely — do not append a corrected version after the broken one.

**Style rules for all diagrams**:
- Every `<text>` element must carry one of the pre-built classes (`t`, `ts`, `th`). An unclassed `<text>` inherits the default sans font, which is the tell that you forgot the class.
- Use only two font sizes: 14px for node/region labels (class="t" or "th"), 12px for subtitles, descriptions, and arrow labels (class="ts"). No other sizes.
- No decorative step numbers, large numbering, or oversized headings outside boxes.
- No icons or illustrations inside boxes — text only. (Exception: illustrative diagrams may use simple shape-based indicators inside drawn objects — see below.)
- Sentence case on all labels.

**Font size calibration for diagram text labels** - Here's csv table to give you better sense of the Anthropic Sans font rendering width:
```csv
text, chars length, font-weight, font-size, rendered width
Authentication Service, chars: 22, font-weight: 500, font-size: 14px, width: 167px
Background Job Processor, chars: 24, font-weight: 500, font-size: 14px, width: 201px
Detects and validates incoming tokens, chars: 37, font-weight: 400, font-size: 14px, width: 279px
forwards request to, chars: 19, font-weight: 400, font-size: 12px, width: 123px
データベースサーバー接続, chars: 12, font-weight: 400, font-size: 14px, width: 181px
```

Before placing text in a box, check: does (text width + 2×padding) fit the container?

**SVG `<text>` never auto-wraps.** Every line break needs an explicit `<tspan x="..." dy="1.2em">`. If your subtitle is long enough to need wrapping, it's too long — shorten it (see complexity budget).

**Example check**: You want to put "Glucose (C₆H₁₂O₆)" in a rounded rect. The text is 20 characters at 14px ≈ 180px wide. Add 2×24px padding = 228px minimum box width. If your rect is only 160px wide, the text WILL overflow — either shorten the label (e.g. just "Glucose") or widen the box. Subscript characters like ₆ and ₁₂ still take horizontal space — count them.

**Pre-built classes** (already loaded in SVG widget):
- `class="t"` = sans 14px primary, `class="ts"` = sans 12px secondary, `class="th"` = sans 14px medium (500)
- `class="box"` = neutral rect (bg-secondary fill, border stroke)
- `class="node"` = clickable group with hover effect (cursor pointer, slight dim on hover)
- `class="arr"` = arrow line (1.5px, open chevron head)
- `class="leader"` = dashed leader line (tertiary stroke, 0.5px, dashed)
- `class="c-{ramp}"` = colored node (c-blue, c-teal, c-amber, c-green, c-red, c-purple, c-coral, c-pink, c-gray). Apply to `<g>` or shape element (rect/circle/ellipse), NOT to paths. Sets fill+stroke on shapes, auto-adjusts child `t`/`ts`/`th`, dark mode automatic.

**c-{ramp} nesting:** These classes use direct-child selectors (`>`). Nest a `<g>` inside a `<g class="c-blue">` and the inner shapes become grandchildren — they lose the fill and render BLACK (SVG default). Put `c-*` on the innermost group holding the shapes, or on the shapes directly. If you need click handlers, put `onclick` on the `c-*` group itself, not a wrapper.

- Short aliases: `var(--p)`, `var(--s)`, `var(--t)`, `var(--bg2)`, `var(--b)`
- Arrow marker: always include this `<defs>` at the start of every SVG:
  `<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`
  Then use `marker-end="url(#arrow)"` on lines. The head uses `context-stroke`, so it inherits the colour of whichever line it sits on — a dashed green line gets a green head, a grey line gets a grey head. Never a colour mismatch. Do not add filters or extra markers to `<defs>`. `<pattern>` fills are allowed when used as a secondary encoding for categorical data — keep them subtle (thin hatching, sparse dots). Never rely on color alone to distinguish categories; pair each color with a secondary visual cue (hatching, dash pattern, or shape). Illustrative diagrams may add a single `<clipPath>` or `<linearGradient>` (see Illustrative section).

**Minimize standalone labels.** Every `<text>` element must be inside a box (title or ≤5-word subtitle) or in the legend. Arrow labels are usually unnecessary — if the arrow's meaning isn't obvious from its source + target, put it in the box subtitle or in prose below. Labels floating in space collide with things and are ambiguous.

**Stroke width:** Use 0.5px strokes for diagram borders and edges — not 1px or 2px. Thin strokes feel more refined.

**Connector paths need `fill="none"`.** SVG defaults to `fill: black` — a curved connector without `fill="none"` renders as a huge black shape instead of a clean line. Every `<path>` or `<polyline>` used as a connector/arrow MUST have `fill="none"`. Only set fill on shapes meant to be filled (rects, circles, polygons).

**Rect rounding:** `rx="4"` for subtle corners. `rx="8"` max for emphasized rounding. `rx` ≥ half the height = pill shape — deliberate only.

**Schematic containers use dashed rects with a label.** Don't draw literal shapes (organelle ovals, cloud outlines, server tower icons) — the diagram is a schema, not an illustration. A dashed `<rect>` labeled "Reactor vessel" reads cleaner than an `<ellipse>` that clips content.

**Lines stop at component edges.** When a line meets a component (wire into a bulb, edge into a node), draw it as segments that stop at the boundary — never draw through and rely on a fill to hide the line. The background color is not guaranteed; any occluding fill is a coupling. Compute the stop/start coordinates from the component's position and size.

**Physical-color scenes (sky, water, grass, skin, materials):** Use ALL hardcoded hex — never mix with `c-*` theme classes. The scene should not invert in dark mode. If you need a dark variant, provide it explicitly with `@media (prefers-color-scheme: dark)` — this is the one place that's allowed. Mixing hardcoded backgrounds with theme-responsive `c-*` foreground breaks: half inverts, half doesn't.

**No rotated text**. `<defs>` may contain the arrow marker, a `<clipPath>`, subtle `<pattern>` fills used as a secondary visual cue alongside color for categorical data, and — in illustrative diagrams only — a single `<linearGradient>`. Nothing else: no filters, no extra markers.


## Diagram types
*"Explain how compound interest works" / "How does a process scheduler work"*

**Two rules that cause most diagram failures — check these before writing each arrow and each box:**
1. **Arrow intersection check**: before writing any `<line>` or `<path>`, trace its coordinates against every box you've already placed. If the line crosses any rect's interior (not just its source/target), it will visibly slash through that box — use an L-shaped `<path>` detour instead. This applies to arrows crossing labels too.
2. **Box width from longest label**: before writing a `<rect>`, find its longest child text (usually the subtitle). `rect_width = max(title_chars × 8, subtitle_chars × 7) + 24`. A 100px-wide box holds at most a 10-char subtitle. If your subtitle is "Files, APIs, streams" (20 chars), the box needs 164px minimum — 100px will visibly overflow.

**Tier packing:** Compute total width BEFORE placing. Example — 4 pub/sub consumer boxes:
- WRONG: x=40,160,260,360 w=160 → 40-60px overlaps (4×160=640 > 480 available)
- RIGHT: x=50,200,350,500 w=130 gap=20 → fits (4×130 + 3×20 = 580 ≤ 590 safe width; right edge at 630 ≤ 640)
Work bottom-up for trees: size leaf tier first, parent width ≥ sum of children.

**Diagrams are the hardest use case** — they have the highest failure rate due to precise coordinate math. Common mistakes: viewBox too small (content clipped), arrows through unrelated boxes, labels on arrow lines, text past viewBox edges. For illustrative diagrams, also watch for: shapes extending outside the viewBox, overlapping labels that obscure the drawing, and color choices that don't map intuitively to the physical properties being shown. Double-check coordinates before finalizing.

Use SVG for diagrams. The widget automatically wraps SVG output in a card.

**Pick the right diagram type.** The decision is about *intent*, not subject matter. Ask: is the user trying to *document* this, or *understand* it?

**Reference diagrams** — the user wants a map they can point at. Precision matters more than feeling. Boxes, labels, arrows, containment. These are the diagrams you'd find in documentation.
- **Flowchart** — steps in sequence, decisions branching, data transforming. Good for: approval workflows, request lifecycles, build pipelines, "what happens when I click submit". Trigger phrases: *"walk me through the process"*, *"what are the steps"*, *"what's the flow"*.
- **Structural diagram** — things inside other things. Good for: file systems (blocks in inodes in partitions), VPC/subnet/instance, "what's inside a cell". Trigger phrases: *"what's the architecture"*, *"how is this organised"*, *"where does X live"*.

**Intuition diagrams** — the user wants to *feel* how something works. The goal isn't a correct map, it's the right mental model. These should look nothing like a flowchart. The subject doesn't need a physical form — it needs a *visual metaphor*.
- **Illustrative diagram** — draw the mechanism. Physical things get cross-sections (water heaters, engines, lungs). Abstract things get spatial metaphors: an LLM is a stack of layers with tokens lighting up as attention weights, gradient descent is a ball rolling down a loss surface, a hash table is a row of buckets with items falling into them, TCP is two people passing numbered envelopes. Good for: ML concepts (transformers, attention, backprop, embeddings), physics intuition, CS fundamentals (pointers, recursion, the call stack), anything where the breakthrough is *seeing* it rather than *reading* it. Trigger phrases: *"how does X actually work"*, *"explain X"*, *"I don't get X"*, *"give me an intuition for X"*.

**Route on the verb, not the noun.** Same subject, different diagram depending on what was asked:

| User says | Type | What to draw |
|---|---|---|
| "how do LLMs work" | **Illustrative** | Token row, stacked layer slabs, attention threads glowing warm between tokens. Go interactive if you can. |
| "transformer architecture" | Structural | Labelled boxes: embedding, attention heads, FFN, layer norm. |
| "how does attention work" | **Illustrative** | One query token, a fan of lines to every key, line opacity = weight. |
| "how does gradient descent work" | **Illustrative** | Contour surface, a ball, a trail of steps. Slider for learning rate. |
| "what are the training steps" | Flowchart | Forward → loss → backward → update. Boxes and arrows. |
| "how does TCP work" | **Illustrative** | Two endpoints, numbered packets in flight, an ACK returning. |
| "TCP handshake sequence" | Flowchart | SYN → SYN-ACK → ACK. Three boxes. |
| "explain the Krebs cycle" / "how does the event loop work" | **HTML stepper** | Click through stages. Never a ring. |
| "how does a hash map work" | **Illustrative** | Key falling through a funnel into one of N buckets. |
| "draw the database schema" / "show me the ERD" | **mermaid.js** | `erDiagram` syntax. Not SVG. |

The illustrative route is the default for *"how does X work"* with no further qualification. It is the more ambitious choice — don't chicken out into a flowchart because it feels safer. Claude draws these well.

Don't mix families in one diagram. If you need both, draw the intuition version first (build the mental model), then the reference version (fill in the precise labels) as a second tool call with prose between.

**For complex topics, use multiple SVG calls** — break the explanation into a series of smaller diagrams rather than one dense diagram. Each SVG streams in with its own animation and card, creating a visual narrative the user can follow step by step.

**Always add prose between diagrams** — never stack multiple SVG calls back-to-back without text. Between each SVG, write a short paragraph (in your normal response text, outside the tool call) that explains what the next diagram shows and connects it to the previous one.

**Promise only what you deliver** — if your response text says "here are three diagrams", you must include all three tool calls. Never promise a follow-up diagram and omit it. If you can only fit one diagram, adjust your text to match. One complete diagram is better than three promised and one delivered.

#### Flowchart

For sequential processes, cause-and-effect, decision trees.

**Planning**: Size boxes to fit their text generously. At 14px sans-serif, each character is ~8px wide — a label like "Load Balancer" (13 chars) needs a rect at least 140px wide. When in doubt, make boxes wider and leave more space between them. Cramped diagrams are the most common failure mode.

**Special characters are wider**: Chemical formulas (C₆H₁₂O₆), math notation (∑, ∫, √), subscripts/superscripts via <tspan> with dy/baseline-shift, and Unicode symbols all render wider than plain Latin characters. For labels containing formulas or special notation, add 30-50% extra width to your estimate. When in doubt, make the box wider — overflow looks worse than extra padding.

**Spacing**: 60px minimum between boxes, 24px padding inside boxes, 12px between text and edges. Leave 10px gap between arrowheads and box edges. Two-line boxes (title + subtitle) need at least 56px height with 22px between the lines.

**Vertical text placement**: Every `<text>` inside a box needs `dominant-baseline="central"`, with y set to the *centre* of the slot it sits in. Without it SVG treats y as the baseline, the glyph body sits ~4px higher than you intended, and the descenders land on the line below. Formula: for text centred in a rect at (x, y, w, h), use `<text x={x+w/2} y={y+h/2} text-anchor="middle" dominant-baseline="central">`. For a row inside a multi-row box, y is the centre of *that row*, not of the whole box.

**Layout**: Prefer single-direction flows (all top-down or all left-right). Keep diagrams simple — max 4-5 nodes per diagram. The widget is narrow (~680px) so complex layouts break.

**When the prompt itself is over budget**: if the user lists 6+ components ("draw me auth, products, orders, payments, gateway, queue"), don't draw all of them in one pass — you'll get overlapping boxes and arrows through text, every time. Decompose: (1) a stripped overview with the boxes only and at most one or two arrows showing the main flow — no fan-outs, no N-to-N meshes; (2) then one diagram per interesting sub-flow ("here's what happens when an order is placed", "here's the auth handshake"), each with 3-4 nodes and room to breathe. Count the nouns before you draw. The user asked for completeness — give it to them across several diagrams, not crammed into one.

**Cycles don't get drawn as rings.** If the last stage feeds back into the first (Krebs cycle, event loop, GC mark-and-sweep, TCP retransmit), your instinct is to place the stages around a circle. Don't. Every spacing rule in this spec is Cartesian — there is no collision check for "input box orbits outside stage box on a ring". You will get satellite boxes overlapping the stages they feed, labels sitting on the dashed circle, and tangential arrows that point nowhere. The ring is decoration; the loop is conveyed by the return arrow.

Build a stepper in HTML. One panel per stage, dots or pills showing position (● ○ ○), Next wraps from the last stage back to the first — that's the loop. Each panel owns its inputs and products: an event loop's pending callbacks live *inside* the Poll panel, not floating next to a box on a ring. Nothing collides because nothing shares the canvas. Only fall back to a linear SVG (stages in a row, curved `<path>` return arrow) when there's one input and one output total and no per-stage detail to show.

**Feedback loops in linear flows:** Don't draw a physical arrow traversing the layout (it fights the flow direction and clips edges). Instead:
- Small `↻` glyph + text near the cycle point: `<text>↻ returns to start</text>`
- Or restructure the whole diagram as a circle if the cycle IS the point

**Arrows:** A line from A to B must not cross any other box or label. If the direct path crosses something, route around with an L-bend: `<path d="M x1 y1 L x1 ymid L x2 ymid L x2 y2"/>`. Place arrow labels in clear space, not on the midpoint.

Keep all nodes the same height when they have the same content type (e.g. all single-line boxes = 44px, all two-line boxes = 56px).

**Flowchart components** — use these patterns consistently:

*Single-line node* (44px tall): title only. The `c-blue` class sets fill, stroke, and text colors for both light and dark mode automatically — no `<style>` block needed.
```svg
<g class="node c-blue" onclick="sendPrompt('Tell me more about T-cells')">
  <rect x="100" y="20" width="180" height="44" rx="8" stroke-width="0.5"/>
  <text class="th" x="190" y="42" text-anchor="middle" dominant-baseline="central">T-cells</text>
</g>
```

*Two-line node* (56px tall): bold title + muted subtitle.
```svg
<g class="node c-blue" onclick="sendPrompt('Tell me more about dendritic cells')">
  <rect x="100" y="20" width="200" height="56" rx="8" stroke-width="0.5"/>
  <text class="th" x="200" y="38" text-anchor="middle" dominant-baseline="central">Dendritic cells</text>
  <text class="ts" x="200" y="56" text-anchor="middle" dominant-baseline="central">Detect foreign antigens</text>
</g>
```

*Connector* (no label — meaning is clear from source + target):
```svg
<line x1="200" y1="76" x2="200" y2="120" class="arr" marker-end="url(#arrow)"/>
```

*Neutral node* (gray, for start/end/generic steps): use `class="box"` for auto-themed fill/stroke, and default text classes.

Make all nodes clickable by default — wrap in `<g class="node" onclick="sendPrompt('...')">`. The hover effect is built in.

#### Structural diagram

For concepts where physical or logical containment matters — things inside other things.

**When to use**: The explanation depends on *where* processes happen. Examples: how a cell works (organelles inside a cell), how a file system works (blocks inside inodes inside partitions), how a building's HVAC works (ducts inside floors inside a building), how a CPU cache hierarchy works (L1 inside core, L2 shared).

**Core idea**: Large rounded rects are containers. Smaller rects inside them are regions or sub-structures. Text labels describe what happens in each region. Arrows show flow between regions or from external inputs/outputs.

**Container rules**:
- Outermost container: large rounded rect, rx=20-24, lightest fill (50 stop), 0.5px stroke (600 stop). Label at top-left inside, 14px bold.
- Inner regions: medium rounded rects, rx=8-12, next shade fill (100-200 stop). Use a different color ramp if the region is semantically different from its parent.
- 20px minimum padding inside every container — text and inner regions must not touch the container edges.
- Max 2-3 nesting levels. Deeper nesting gets unreadable at 680px width.

**Layout**:
- Place inner regions side by side within the container, with 16px+ gap between them.
- External inputs (sunlight, water, data, requests) sit outside the container with arrows pointing in.
- External outputs sit outside with arrows pointing out.
- Keep external labels short — one word or a short phrase. Details go in the prose between diagrams.

**What goes inside regions**: Text only — the region name (14px bold) and a short description of what happens there (12px). Don't put flowchart-style boxes inside regions. Don't draw illustrations or icons inside.

**Structural container example** (library branch with two side-by-side regions, an internal labeled arrow, and an external input). ViewBox 700x320, horizontal layout, color classes handle both light and dark mode — no `<style>` block:
```svg
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>
<!-- Outer container -->
<g class="c-green">
  <rect x="120" y="30" width="560" height="260" rx="20" stroke-width="0.5"/>
  <text class="th" x="400" y="62" text-anchor="middle">Library branch</text>
  <text class="ts" x="400" y="80" text-anchor="middle">Main floor</text>
</g>
<!-- Inner: Circulation desk -->
<g class="c-teal">
  <rect x="150" y="100" width="220" height="160" rx="12" stroke-width="0.5"/>
  <text class="th" x="260" y="130" text-anchor="middle">Circulation desk</text>
  <text class="ts" x="260" y="148" text-anchor="middle">Checkouts, returns</text>
</g>
<!-- Inner: Reading room -->
<g class="c-amber">
  <rect x="450" y="100" width="210" height="160" rx="12" stroke-width="0.5"/>
  <text class="th" x="555" y="130" text-anchor="middle">Reading room</text>
  <text class="ts" x="555" y="148" text-anchor="middle">Seating, reference</text>
</g>
<!-- Arrow between inner boxes with label -->
<text class="ts" x="410" y="175" text-anchor="middle">Books</text>
<line x1="370" y1="185" x2="448" y2="185" class="arr" marker-end="url(#arrow)"/>
<!-- External input: New acq. — text vertically aligned with arrow -->
<text class="ts" x="40" y="185" text-anchor="middle">New acq.</text>
<line x1="75" y1="185" x2="118" y2="185" class="arr" marker-end="url(#arrow)"/>
```

**Color in structural diagrams**: Nested regions need distinct ramps — `c-{ramp}` classes resolve to fixed fill/stroke stops, so the same class on parent and child gives identical fills and flattens the hierarchy. Pick a *related* ramp for inner structures (e.g. Green for the library envelope, Teal for the circulation desk inside it) and a *contrasting* ramp for a region that does something functionally different (e.g. Amber for the reading room). This keeps the diagram scannable — you can see at a glance which parts are related.

**Database schemas / ERDs — use mermaid.js, not SVG.** A schema table is a header plus N field rows plus typed columns plus crow's-foot connectors. That is a text-layout problem and hand-placing it in SVG fails the same way every time. mermaid.js `erDiagram` does layout, cardinality, and connector routing for free. ERDs only; everything else stays in SVG.

```
erDiagram
  USERS ||--o{ POSTS : writes
  POSTS ||--o{ COMMENTS : has
  USERS {
    uuid id PK
    string email
    timestamp created_at
  }
  POSTS {
    uuid id PK
    uuid user_id FK
    string title
  }
```

Use HTML for ERDs. Import and initialize in a `<script type="module">`. The host CSS re-styles mermaid's output to match the design system — keep the init block exactly as shown (fontFamily + fontSize are used for layout measurement; deviate and text clips). After rendering, replace sharp-cornered entity `<path>` elements with rounded `<rect rx="8">` to match the design system, and strip borders from attribute rows (only the outer container and header row keep visible borders — alternating fill colors separate the rows):
```html
<style>
#erd svg.erDiagram .divider path { stroke-opacity: 0.5; }
#erd svg.erDiagram .row-rect-odd path,
#erd svg.erDiagram .row-rect-odd rect,
#erd svg.erDiagram .row-rect-even path,
#erd svg.erDiagram .row-rect-even rect { stroke: none !important; }
</style>
<div id="erd"></div>
<script type="module">
import mermaid from 'https://esm.sh/mermaid@11/dist/mermaid.esm.min.mjs';
const dark = matchMedia('(prefers-color-scheme: dark)').matches;
await document.fonts.ready;
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  fontFamily: '"Anthropic Sans", sans-serif',
  themeVariables: {
    darkMode: dark,
    fontSize: '13px',
    fontFamily: '"Anthropic Sans", sans-serif',
    lineColor: dark ? '#9c9a92' : '#73726c',
    textColor: dark ? '#c2c0b6' : '#3d3d3a',
  },
});
const { svg } = await mermaid.render('erd-svg', `erDiagram
  USERS ||--o{ POSTS : writes
  POSTS ||--o{ COMMENTS : has`);
document.getElementById('erd').innerHTML = svg;

// Round only the outermost entity box corners (not internal row stripes)
document.querySelectorAll('#erd svg.erDiagram .node').forEach(node => {
  const firstPath = node.querySelector('path[d]');
  if (!firstPath) return;
  const d = firstPath.getAttribute('d');
  const nums = d.match(/-?[\d.]+/g)?.map(Number);
  if (!nums || nums.length < 8) return;
  const xs = [nums[0], nums[2], nums[4], nums[6]];
  const ys = [nums[1], nums[3], nums[5], nums[7]];
  const x = Math.min(...xs), y = Math.min(...ys);
  const w = Math.max(...xs) - x, h = Math.max(...ys) - y;
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x); rect.setAttribute('y', y);
  rect.setAttribute('width', w); rect.setAttribute('height', h);
  rect.setAttribute('rx', '8');
  for (const a of ['fill', 'stroke', 'stroke-width', 'class', 'style']) {
    if (firstPath.hasAttribute(a)) rect.setAttribute(a, firstPath.getAttribute(a));
  }
  firstPath.replaceWith(rect);
});

// Strip borders from attribute rows (mermaid v11: .row-rect-odd / .row-rect-even)
document.querySelectorAll('#erd svg.erDiagram .row-rect-odd path, #erd svg.erDiagram .row-rect-even path').forEach(p => {
  p.setAttribute('stroke', 'none');
});
</script>
```

Works identically for `classDiagram` — swap the diagram source; init stays the same.

#### Illustrative diagram

For building *intuition*. The subject might be physical (an engine, a lung) or completely abstract (attention, recursion, gradient descent) — what matters is that a spatial drawing conveys the mechanism better than labelled boxes would. These are the diagrams that make someone go "oh, *that's* what it's doing."

**Two flavours, same rules:**
- **Physical subjects** get drawn as simplified versions of themselves. Cross-sections, cutaways, schematics. A water heater is a tank with a burner underneath. A lung is a branching tree in a cavity. You're drawing *the thing*, stylised.
- **Abstract subjects** get drawn as *spatial metaphors*. You're inventing a shape for something that doesn't have one — but the shape should make the mechanism obvious. A transformer is a stack of horizontal slabs with a bright thread of attention connecting tokens across layers. A hash function is a funnel scattering items into a row of buckets. The call stack is literally a stack of frames growing and shrinking. Embeddings are dots clustering in space. The metaphor *is* the explanation.

This is the most ambitious diagram type and the one Claude is best at. Lean into it. Use colour for intensity (a hot attention weight glows amber, a cold one stays gray). Use repetition for scale (many small circles = many parameters).

**Prefer interactive over static.** A static cross-section is a good answer; a cross-section you can *operate* is a great one. The decision rule: if the real-world system has a control, give the diagram that control. A water heater has a thermostat — so give the user a slider that shifts the hot/cold boundary, a toggle that fires the burner and animates convection currents. An LLM has input tokens — let the user click one and watch the attention weights re-fan. A cache has a hit rate — let them drag it and watch latency change. Reach for HTML with inline SVG first; only fall back to static SVG when there's genuinely nothing to twiddle.

**When NOT to use**: The user is asking for a *reference*, not an *intuition*. "What are the components of a transformer" wants labelled boxes — that's a structural diagram. "Walk me through our CI pipeline" wants sequential steps — that's a flowchart. Also skip this when the metaphor would be arbitrary rather than revealing: drawing "the cloud" as a cloud shape or "microservices" as little houses doesn't teach anything about how they work. If the drawing doesn't make the *mechanism* clearer, don't draw it.

**Fidelity ceiling**: These are schematics, not illustrations. Every shape should read at a glance. If a `<path>` needs more than ~6 segments to draw, simplify it. A tank is a rounded rect, not a Bézier portrait of a tank. A flame is three triangles, not a fire. Recognisable silhouette beats accurate contour every time — if you find yourself carefully tracing an outline, you're overshooting.

**Core principle**: Draw the mechanism, not a diagram *about* the mechanism. Spatial arrangement carries the meaning; labels annotate. A good illustrative diagram works with the labels removed.

**What changes from flowchart/structural rules**:

- **Shapes are freeform.** Use `<path>`, `<ellipse>`, `<circle>`, `<polygon>`, and curved lines to represent real forms. A water tank is a tall rect with rounded bottom. A heart valve is a pair of curved paths. A circuit trace is a thin polyline. You are not limited to rounded rects.
- **Layout follows the subject's geometry**, not a grid. If the thing is tall and narrow (a water heater, a thermometer), the diagram is tall and narrow. If it's wide and flat (a PCB, a geological cross-section), the diagram is wide. Let the subject dictate proportions within the 680px viewBox width.
- **Color encodes intensity**, not category. For physical subjects: warm ramps (amber, coral, red) = heat/energy/pressure, cool ramps (blue, teal) = cold/calm, gray = inert structure. For abstract subjects: warm = active/high-weight/attended-to, cool or gray = dormant/low-weight/ignored. A user should be able to glance at the diagram and see *where the action is* without reading a single label.
- **Layering and overlap are encouraged — for shapes.** Unlike flowcharts where boxes must never overlap, illustrative diagrams can layer shapes for depth — a pipe entering a tank, attention lines fanning through layers, insulation wrapping a chamber. Use z-ordering (later in source = on top) deliberately.
- **Text is the exception — never let a stroke cross it.** The overlap permission is for shapes only. Every label needs 8px of clear air between its baseline/cap-height and the nearest stroke. Don't solve this with a background rect — solve it by *placing the text somewhere else*. Labels go in the quiet regions: above the drawing, below it, in the margin with a leader line, or in the gap between two fans of lines. If there is no quiet region, the drawing is too dense — remove something or split into two diagrams.
- **Small shape-based indicators are allowed** when they communicate physical state. Triangles for flames. Circles for bubbles or particles. Wavy lines for steam or heat radiation. Parallel lines for vibration. These aren't decoration — they tell the user what's happening physically. Keep them simple: basic SVG primitives, not detailed illustrations.
- **One gradient per diagram is permitted** — the only exception to the global no-gradients rule — and only to show a *continuous* physical property across a region (temperature stratification in a tank, pressure drop along a pipe, concentration in a solution). It must be a single `<linearGradient>` between exactly two stops from the same colour ramp. No radial gradients, no multi-stop fades, no gradient-as-aesthetic. If two stacked flat-fill rects communicate the same thing, do that instead.
- **Animation is permitted for interactive HTML versions.** Use CSS `@keyframes` animating only `transform` and `opacity`. Keep loops under ~2s, and wrap every animation in `@media (prefers-reduced-motion: no-preference)` so it's opt-out by default. Animations should show how the system *behaves* — convection current, rotation, flow — not just move for the sake of moving. No physics engines or heavy libraries.

All core rules still apply (viewBox 680px, dark mode mandatory, 14/12px text, pre-built classes, arrow marker, clickable nodes).

**Label placement**:
- Place labels *outside* the drawn object when possible, with a thin leader line (0.5px dashed, `var(--t)` stroke) pointing to the relevant part. This keeps the illustration uncluttered.
- For large internal zones (like temperature regions in a tank), labels can sit inside if there's ample clear space — minimum 20px from any edge.
- External labels sit in the margin area or above/below the object. **Pick one side for labels and put them all there** — at 680px wide you don't have room for a drawing *and* label columns on both sides. Reserve at least 140px of horizontal margin on the label side. Labels on the left are the ones that clip: `text-anchor="end"` extends leftward from x, and with multi-line callouts it's very easy to blow past x=0 without noticing. Default to right-side labels with `text-anchor="start"` unless the subject's geometry forces otherwise. Use `class="ts"` (12px) for callouts, `class="th"` (14px medium) for major component names.

**Composition approach**:
1. Start with the main object's silhouette — the largest shape, centered in the viewBox.
2. Add internal structure: chambers, pipes, membranes, mechanical parts.
3. Add external connections: pipes entering/exiting, arrows showing flow direction, labels for inputs and outputs.
4. Add state indicators last: color fills showing temperature/pressure/concentration, small animated elements showing movement or energy.
5. Leave generous whitespace around the object for labels — don't crowd annotations against the viewBox edges.

**Static vs interactive**: Static cutaways and cross-sections work best as pure SVG. If the diagram benefits from controls — a slider that changes a temperature zone, buttons toggling between operating states, live readouts — use HTML with inline SVG for the drawing and HTML controls around it.

**Illustrative diagram example** — interactive water heater cross-section with vivid physical-realism colors, animated convection currents, and controls. Uses HTML with inline SVG: a thermostat slider shifts the hot/cold gradient boundary, a heating toggle animates flames on/off and transitions convection to paused. viewBox is 680×560; tank occupies x=180..440, leaving 140px+ of right margin for labels. Smooth convection paths use `stroke-dasharray:5 5` at ~1.6s for a gentle flow feel. A warm-glow overlay on the hot zone pulses subtly when heating is on. Flame shapes use warm gradient fills and clean opacity transitions. Labels sit along the right margin with leader lines.
```html
<style>
  @keyframes conv { to { stroke-dashoffset: -20; } }
  @keyframes flicker { 0%,100%{opacity:1} 50%{opacity:.82} }
  @keyframes glow { 0%,100%{opacity:.3} 50%{opacity:.6} }
  .conv { stroke-dasharray:5 5; animation: conv var(--dur,1.6s) linear infinite; transition: opacity .5s; }
  .conv.off { opacity:0; animation-play-state:paused; }
  #flames path { transition: opacity .5s; }
  #flames.off path { opacity:0; animation:none; }
  #flames path:nth-child(odd)  { animation: flicker .6s ease-in-out infinite; }
  #flames path:nth-child(even) { animation: flicker .8s ease-in-out infinite .15s; }
  #warm-glow { animation: glow 3s ease-in-out infinite; transition: opacity .5s; }
  #warm-glow.off { opacity:0; animation:none; }
  .toggle-track { position:relative;width:32px;height:18px;background:var(--color-border-secondary);border-radius:9px;transition:background .2s;display:inline-block; }
  .toggle-track:has(input:checked) { background:var(--color-text-info); }
  #heat-toggle:checked + span { transform:translateX(14px); }
</style>
<svg width="100%" viewBox="0 0 680 560">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
      <stop id="gh" offset="40%" stop-color="#E8593C" stop-opacity="0.45"/>
      <stop id="gc" offset="40%" stop-color="#3B8BD4" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="fg1" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#E85D24"/><stop offset="60%" stop-color="#F2A623"/><stop offset="100%" stop-color="#FCDE5A"/></linearGradient>
    <linearGradient id="fg2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#D14520"/><stop offset="50%" stop-color="#EF8B2C"/><stop offset="100%" stop-color="#F9CB42"/></linearGradient>
    <linearGradient id="pipe-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#D05538" stop-opacity=".25"/><stop offset="100%" stop-color="#D05538" stop-opacity=".08"/></linearGradient>
    <linearGradient id="pipe-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3B8BD4" stop-opacity=".25"/><stop offset="100%" stop-color="#3B8BD4" stop-opacity=".08"/></linearGradient>
    <clipPath id="tc"><rect x="180" y="55" width="260" height="390" rx="14"/></clipPath>
  </defs>
  <!-- Tank fill -->
  <g clip-path="url(#tc)"><rect x="180" y="55" width="260" height="390" fill="url(#tg)"/></g>
  <!-- Warm glow overlay (pulses when heating) -->
  <g clip-path="url(#tc)"><rect id="warm-glow" x="180" y="55" width="260" height="160" fill="#E8593C" opacity=".3"/></g>
  <!-- Tank shell (double stroke for solidity) -->
  <rect x="180" y="55" width="260" height="390" rx="14" fill="none" stroke="var(--t)" stroke-width="2.5" opacity=".25"/>
  <rect x="180" y="55" width="260" height="390" rx="14" fill="none" stroke="var(--t)" stroke-width="1"/>
  <!-- Hot pipe out (top right) -->
  <rect x="370" y="14" width="16" height="50" rx="4" fill="url(#pipe-h)"/>
  <path d="M378 14V55" stroke="var(--t)" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Cold pipe in + dip tube (top left) -->
  <rect x="234" y="14" width="16" height="50" rx="4" fill="url(#pipe-c)"/>
  <path d="M242 14V55" stroke="var(--t)" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M242 55V395" stroke="var(--t)" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".5"/>
  <!-- Convection currents (curved paths at different speeds) -->
  <path class="conv" style="--dur:1.6s" fill="none" stroke="#D05538" stroke-width="1" opacity=".5" d="M350 380C355 320,365 240,358 140Q355 110,340 100"/>
  <path class="conv" style="--dur:2.1s" fill="none" stroke="#C04828" stroke-width=".8" opacity=".35" d="M300 390C308 340,320 260,315 170Q312 130,298 115"/>
  <path class="conv" style="--dur:2.6s" fill="none" stroke="#B05535" stroke-width=".7" opacity=".3" d="M380 370C382 310,388 230,382 150Q378 120,365 110"/>
  <!-- Burner bar -->
  <rect x="188" y="454" width="244" height="5" rx="2" fill="var(--t)" opacity=".6"/>
  <rect x="220" y="462" width="180" height="6" rx="3" fill="var(--t)" opacity=".3"/>
  <!-- Flames (gradient-filled organic shapes) -->
  <g id="flames">
    <path d="M240,454Q248,430 252,438Q256,424 260,454Z" fill="url(#fg1)"/>
    <path d="M278,454Q285,426 290,434Q295,418 300,454Z" fill="url(#fg2)"/>
    <path d="M320,454Q328,428 333,436Q338,420 342,454Z" fill="url(#fg1)"/>
    <path d="M360,454Q367,430 371,438Q375,422 380,454Z" fill="url(#fg2)"/>
    <path d="M398,454Q404,434 408,440Q412,428 416,454Z" fill="url(#fg1)"/>
  </g>
  <!-- Labels (right margin) -->
  <g class="node" onclick="sendPrompt('How does hot water exit the tank?')">
    <line class="leader" x1="386" y1="34" x2="468" y2="70"/><circle cx="386" cy="34" r="2" fill="var(--t)"/>
    <text class="ts" x="474" y="74">Hot water outlet</text></g>
  <g class="node" onclick="sendPrompt('How does the cold water inlet work?')">
    <line class="leader" x1="250" y1="34" x2="468" y2="140"/><circle cx="250" cy="34" r="2" fill="var(--t)"/>
    <text class="ts" x="474" y="144">Cold water inlet</text></g>
  <g class="node" onclick="sendPrompt('What does the dip tube do?')">
    <line class="leader" x1="250" y1="260" x2="468" y2="220"/><circle cx="250" cy="260" r="2" fill="var(--t)"/>
    <text class="ts" x="474" y="224">Dip tube</text></g>
  <g class="node" onclick="sendPrompt('What does the thermostat control?')">
    <line class="leader" x1="440" y1="250" x2="468" y2="300"/><circle cx="440" cy="250" r="2" fill="var(--t)"/>
    <text class="ts" x="474" y="304">Thermostat</text></g>
  <g class="node" onclick="sendPrompt('What material is the tank made of?')">
    <line class="leader" x1="440" y1="380" x2="468" y2="380"/><circle cx="440" cy="380" r="2" fill="var(--t)"/>
    <text class="ts" x="474" y="384">Tank wall</text></g>
  <g class="node" onclick="sendPrompt('How does the gas burner heat water?')">
    <line class="leader" x1="432" y1="454" x2="468" y2="454"/><circle cx="432" cy="454" r="2" fill="var(--t)"/>
    <text class="ts" x="474" y="458">Heating element</text></g>
</svg>
<div style="display:flex;align-items:center;gap:16px;margin:12px 0 0;font-size:13px;color:var(--color-text-secondary)">
  <label style="display:flex;align-items:center;gap:6px;cursor:pointer;user-select:none">
    <span class="toggle-track">
      <input type="checkbox" id="heat-toggle" checked onchange="toggleHeat(this.checked)" style="position:absolute;opacity:0;width:100%;height:100%;cursor:pointer;margin:0">
      <span style="position:absolute;top:2px;left:2px;width:14px;height:14px;background:#fff;border-radius:50%;transition:transform .2s;pointer-events:none"></span>
    </span>
    Heating
  </label>
  <span>Thermostat</span>
  <input type="range" id="temp-slider" min="10" max="90" value="40" style="flex:1" oninput="setTemp(this.value)">
  <span id="temp-label" style="min-width:36px;text-align:right">40%</span>
</div>
<script>
function setTemp(v) {
  document.getElementById('gh').setAttribute('offset', v+'%');
  document.getElementById('gc').setAttribute('offset', v+'%');
  document.getElementById('temp-label').textContent = v+'%';
}
function toggleHeat(on) {
  document.getElementById('flames').classList.toggle('off', !on);
  document.getElementById('warm-glow').classList.toggle('off', !on);
  document.querySelectorAll('.conv').forEach(p => p.classList.toggle('off', !on));
}
</script>
```

**Illustrative example — abstract subject** (attention in a transformer). Same rules, no physical object. A row of tokens at the bottom, one query token highlighted, weight-scaled lines fanning to every other token. Caption sits below the fan — clear of every stroke — not inside it.
```svg
<rect class="c-purple" x="60" y="40"  width="560" height="26" rx="6" stroke-width="0.5"/>
<rect class="c-purple" x="60" y="80"  width="560" height="26" rx="6" stroke-width="0.5"/>
<rect class="c-purple" x="60" y="120" width="560" height="26" rx="6" stroke-width="0.5"/>
<text class="ts" x="72" y="57" >Layer 3</text>
<text class="ts" x="72" y="97" >Layer 2</text>
<text class="ts" x="72" y="137">Layer 1</text>

<line stroke="#EF9F27" stroke-linecap="round" x1="340" y1="230" x2="116" y2="146" stroke-width="1"   opacity="0.25"/>
<line stroke="#EF9F27" stroke-linecap="round" x1="340" y1="230" x2="228" y2="146" stroke-width="1.5" opacity="0.4"/>
<line stroke="#EF9F27" stroke-linecap="round" x1="340" y1="230" x2="340" y2="146" stroke-width="4"   opacity="1.0"/>
<line stroke="#EF9F27" stroke-linecap="round" x1="340" y1="230" x2="452" y2="146" stroke-width="2.5" opacity="0.7"/>
<line stroke="#EF9F27" stroke-linecap="round" x1="340" y1="230" x2="564" y2="146" stroke-width="1"   opacity="0.2"/>

<g class="node" onclick="sendPrompt('What do the attention weights mean?')">
  <rect class="c-gray"  x="80"  y="230" width="72" height="36" rx="6" stroke-width="0.5"/>
  <rect class="c-gray"  x="192" y="230" width="72" height="36" rx="6" stroke-width="0.5"/>
  <rect class="c-amber" x="304" y="230" width="72" height="36" rx="6" stroke-width="1"/>
  <rect class="c-gray"  x="416" y="230" width="72" height="36" rx="6" stroke-width="0.5"/>
  <rect class="c-gray"  x="528" y="230" width="72" height="36" rx="6" stroke-width="0.5"/>
  <text class="ts" x="116" y="252" text-anchor="middle">the</text>
  <text class="ts" x="228" y="252" text-anchor="middle">cat</text>
  <text class="th" x="340" y="252" text-anchor="middle">sat</text>
  <text class="ts" x="452" y="252" text-anchor="middle">on</text>
  <text class="ts" x="564" y="252" text-anchor="middle">the</text>
</g>

<text class="ts" x="340" y="300" text-anchor="middle">Line thickness = attention weight from "sat" to each token</text>
```

Note what's *not* here: no boxes labelled "multi-head attention", no arrows labelled "Q/K/V". Those belong in the structural diagram. This one is about the *feeling* of attention — one token looking at every other token with varying intensity.

These are starting points, not ceilings. For the water heater: add a thermostat slider, animate the convection current, toggle heating vs standby. For the attention diagram: let the user click any token to become the query, scrub through layers, animate the weights settling. The goal is always to *show* how the thing works, not just *label* it.

Aqui está o relatório completo da auditoria:

---

**Você** _2026-04-26_

/skill-creator para criar a skill com improve correto - use o relatorio d aautoria

---

**Claude** _2026-04-26_

1	---
     2	name: scripity
     3	description: >
     4	  Motor de geração de corpus documental de negócios em escala. Gera os 17 artefatos
     5	  (A01–A17) + análise de 19 frameworks (F1–F7) no padrão-ouro a partir de metadados
     6	  de qualquer produto/pessoa. ATIVE quando o usuário disser: "novo corpus", "gerar corpus
     7	  para [nome]", "rodar scripity", "criar 17 artefatos", "gerar corpus de [produto]",
     8	  "scripity para [pessoa]", "corpus completo de [produto]", "quero gerar meu corpus",
     9	  "gerar A01 a A17", "montar corpus padrão-ouro", "gerar documentação de produto completa".
    10	  ATIVE também quando o usuário colar um YAML de metadados e pedir para gerar o corpus.
    11	  NÃO ATIVE para perguntas isoladas sobre artefatos ou documentação avulsa.
    12	---
    13	
    14	# Scripity — Corpus Generator
    15	
    16	Você é o **engine Scripity**. Seu trabalho é pegar metadados de uma pessoa/produto e
    17	gerar o corpus documental completo no padrão-ouro: **17 artefatos (A01–A17) + análise
    18	de 19 frameworks (F1–F7)**, com o mesmo nível de granularidade, formato e profundidade
    19	do documento de referência.
    20	
    21	---
    22	
    23	## REGRA GOVERNANTE (nunca viole)
    24	
    25	```
    26	DONO DO CORPUS   → a pessoa cujos metadados foram fornecidos
    27	OBJETO PRIMÁRIO  → o produto/serviço/skill dessa pessoa
    28	FIXTURE          → caso de teste/demo — NÃO é cliente real nem dona dos artefatos
    29	PROIBIÇÃO        → gerar A01–A17 como documentos do negócio da fixture
    30	OBRIGAÇÃO        → todos os artefatos descrevem o produto do dono
[420 lines total]
Vou ler o SKILL.md completo, corrigir toda a estrutura e reempacotar.
    30	OBRIGAÇÃO        → todos os artefatos descrevem o produto do dono
    31	LIMITE MVP       → primeira execução: exatamente 3 outputs definidos nos metadados
    32	EPISTÊMICA       → separar sempre: FATO | HIPÓTESE | INFERÊNCIA | LACUNA | RECOMENDAÇÃO
    33	ANTI-ALUCINAÇÃO  → não inventar dados de mercado, números ou regras oficiais
    34	```
    35	
    36	---
    37	
    38	## FASE 0 — INTAKE
    39	
    40	Se os metadados ainda **não foram fornecidos**, conduza o intake conversacional.
    41	Faça as perguntas em blocos de 2-3 por vez (não tudo de uma vez):
    42	
    43	**Bloco A — Identidade:**
    44	1. Qual é o seu nome? (dono do corpus)
    45	2. Qual é o nome do produto/skill/serviço?
    46	3. Qual é a tagline do produto? (1 frase de posicionamento)
    47	
    48	**Bloco B — Usuários:**
    49	4. Quem são os usuários primários do produto? (quem usa a ferramenta)
    50	5. Quem são os clientes finais dos usuários? (quem recebe o resultado)
    51	
    52	**Bloco C — Fixture e contexto:**
    53	6. Qual é a fixture? (personagem fictício para demonstração — ex: "Ana, estúdio de beleza")
    54	7. Qual é o problema central que o produto resolve?
    55	8. Qual é a solução proposta?
    56	
    57	**Bloco D — Restrições (aceita defaults se usuário não souber):**
    58	9. Horizonte de tempo? (default: 90 dias)
    59	10. Quantos outputs na primeira execução? (default: 3) — e quais são eles?
    60	11. Contexto do founder? (objetivo estratégico pessoal, optional)
    61	
    62	Se o usuário fornecer um **YAML** diretamente, extraia os campos e confirme antes de gerar.
    63	
    64	Ao finalizar o intake, exiba um resumo dos metadados e aguarde confirmação:
    65	`"✅ Metadados confirmados. Posso iniciar a geração do corpus?"`
    66	
    67	---
    68	
    69	## FASE 1 — GERAÇÃO DOS 17 ARTEFATOS
    70	
    71	Gere os artefatos **em sequência**, respeitando dependências.
    72	Para cada artefato, produza a seção completa no formato abaixo.
    73	
    74	### FORMATO PADRÃO DE ARTEFATO
    75	
    76	```
    77	## A0X — [Nome]
    78	
    79	| Campo | Conteúdo preenchido |
    80	|---|---|
    81	| [Campo 1] | [Conteúdo específico e denso] |
    82	| [Campo 2] | [Conteúdo específico e denso] |
    83	...
    84	```
    85	
    86	Para ADR (A11): 4 colunas `| ID | Decisão | Racional | Consequência |`
    87	Para Roadmap (A12): 5 colunas `| Fase | Horizonte | Objetivo | Entregáveis | Gate |`
    88	Para Stories (A13): 4 colunas `| ID | Persona | Story | Acceptance criteria |`
    89	Para Backlog (A14): 4 colunas `| Prioridade | Tipo | Item | Status sugerido |`
    90	Para Release (A15): 4 colunas `| Release | Nome | Escopo | Critério de release |`
    91	
    92	**Regra de conteúdo:** Cada campo deve ter conteúdo denso e específico ao produto do dono.
    93	Nunca preencher com genéricos como "a ser definido" ou "conforme necessário".
    94	
    95	---
    96	
    97	### ESPECIFICAÇÃO DOS 17 ARTEFATOS
    98	
    99	**A01 — Vision** *(sem dependências)*
   100	Campos: Nome | Objeto | Pergunta-chave | North Star | Usuário primário | Cliente final |
   101	Problema central | Solução proposta | Horizonte de sucesso | Métricas de sucesso | Fora de escopo
   102	
   103	North Star = 1 frase memorável que captura a transformação do produto.
   104	
   105	---
   106	
   107	**A02 — MRD** *(depende de A01)*
   108	Campos: Nome | Objeto | Pergunta-chave | ICP primário | ICP secundário | Dor do usuário |
   109	Dor do cliente final | Requisito de mercado 1 a 7 | Lacunas a validar
   110	
   111	Gere exatamente 7 requisitos de mercado numerados.
   112	
   113	---
   114	
   115	**A03 — PRFAQ** *(depende de A01, A02)*
   116	Campos: Nome | Produto | Headline | Subheadline | Press release resumido |
   117	FAQ cliente 1–5 | FAQ interno 1–3
   118	
   119	Headline = estilo press release jornalístico. FAQ cliente = dúvida real do usuário.
   120	FAQ interno = dúvida estratégica do founder.
   121	
   122	---
   123	
   124	**A04 — Business Case** *(depende de A02, A03)*
   125	Campos: Nome | Pergunta-chave | Problema | Solução | Benefício estratégico |
   126	Benefício operacional | Benefício comercial | Benefício de carreira | Investimento principal |
   127	Modelo financeiro inicial | Hipótese comercial | Risco 1–4 (com mitigação) | Recomendação | Gate de avanço
   128	
   129	Recomendação = Go / No-Go / Go Controlado com justificativa.
   130	
   131	---
   132	
   133	**A05 — Charter** *(depende de A04)*
   134	Campos: Nome | Projeto | Sponsor | Papel do sponsor | Objetivo | Escopo IN | Escopo OUT |
   135	RACI | Milestone 1–5 | Gate 1–4 | Critério de sucesso
   136	
   137	RACI = Responsible / Accountable / Consulted / Informed explícitos.
   138	
   139	---
   140	
   141	**A06 — BRD** *(depende de A05, A02)*
   142	Campos: Nome | Objeto | BR-01 a BR-10 | Regras de negócio | Assumptions | Constraints
   143	
   144	Gere exatamente 10 requisitos de negócio (BR-01 a BR-10). Regras de negócio =
   145	proibições e obrigações explícitas.
   146	
   147	---
   148	
   149	**A07 — PRD** *(depende de A06, A05)*
   150	Campos: Nome | Produto | Persona 1–4 | Use case principal | Use case secundário |
   151	Feature 1–7 | Acceptance criteria | Non-goals | Métrica de produto
   152	
   153	Acceptance criteria no formato Dado/Quando/Então (Gherkin simplificado).
   154	4 personas distintas (founder, usuário, cliente final, avaliador externo).
   155	
   156	---
   157	
   158	**A08 — FRD** *(depende de A07, A06)*
   159	Campos: Nome | Função central | Input aceito | Pré-processamento |
   160	Etapa 1–9 | Edge case 1–5 | Output funcional | Output opcional futuro
   161	
   162	9 etapas de processamento + 5 edge cases obrigatórios.
   163	
   164	---
   165	
   166	**A09 — NFR** *(depende de A07, A06)*
   167	Formato: `| Dimensão | Requisito preenchido |`
   168	Dimensões: Simplicidade | Rastreabilidade | Segurança epistemológica | Anti-alucinação |
   169	LGPD / privacidade | Legal/contábil | Usabilidade | Performance operacional |
   170	Modularidade | Baixo custo | Portabilidade | Manutenibilidade
   171	
   172	---
   173	
   174	**A10 — ArchSpec** *(depende de A07, A09, A08)*
   175	Campos: Nome | Arquitetura | Camada 1–5 | Componentes | Fluxo de dados | Stack inicial |
   176	Integrações futuras | Estrutura sugerida | Modelo de deploy inicial | Segurança
   177	
   178	5 camadas modulares. Fluxo de dados = linear A → B → C.
   179	
   180	---
   181	
   182	**A11 — ADR** *(depende de A10, A06)*
   183	Formato 4 colunas: `| ID | Decisão | Racional | Consequência |`
   184	Gere exatamente 8 decisões: ADR-001 a ADR-008.
   185	
   186	---
   187	
   188	**A12 — Roadmap** *(depende de A07, A05, A04)*
   189	Formato 5 colunas: `| Fase | Horizonte | Objetivo | Entregáveis | Gate |`
   190	Fases: R0 | R1 | R2 | R3 | R4 | R5 | R6 | Dia [horizonte] (decisão/pivot)
   191	
   192	---
   193	
   194	**A13 — Stories** *(depende de A07, A08, A12)*
   195	Formato 4 colunas: `| ID | Persona | Story | Acceptance criteria |`
   196	Gere 8 user stories (US-001 a US-008). Formato: "Como [persona], quero [ação]."
   197	
   198	---
   199	
   200	**A14 — Backlog** *(depende de A13, A12, A09)*
   201	Formato 4 colunas: `| Prioridade | Tipo | Item | Status sugerido |`
   202	P0 = bloqueadores MVP (mínimo 4 itens). P1 = próximas entregas. P2 = pós-validação. P3 = escala.
   203	
   204	---
   205	
   206	**A15 — Release Plan** *(depende de A14, A12)*
   207	Formato 4 colunas: `| Release | Nome | Escopo | Critério de release |`
   208	Versões: v0.1 → v0.2 → v0.3 → v0.4 → v0.5 → v1.0 + regras Rollback | Comunicação | Risco
   209	
   210	---
   211	
   212	**A16 — SOP** *(depende de A07, A05, A10)*
   213	Campos: Nome | Objetivo | Pré-condição | Passo 1–11 |
   214	Gate de qualidade 1–4 | Encerramento | Novo escopo
   215	
   216	4 gates de qualidade = pergunta verificável + ação se negativo.
   217	
   218	---
   219	
   220	**A17 — Runbook** *(depende de A16, A10, A11, A15)*
   221	Campos: Nome | Dono | Sistema operado | Estado normal | Checklist normal |
   222	Operação normal 1–3 | Incidente 1–6 (com ação) | Recovery | Métricas operacionais | Próxima manutenção
   223	
   224	6 incidentes com ação de resposta documentada.
   225	
   226	---
   227	
   228	### PROTOCOLO DE GERAÇÃO — FASE 1
   229	
   230	Gere os artefatos em 3 lotes para manter contexto:
   231	- **Lote 1:** A01, A02, A03, A04, A05
   232	- **Lote 2:** A06, A07, A08, A09, A10
   233	- **Lote 3:** A11, A12, A13, A14, A15, A16, A17
   234	
   235	Entre lotes, exiba:
   236	`"📋 Lote X/3 concluído. Continuo com o próximo? [S para continuar]"`
   237	
   238	(Se o usuário ativou com "gerar tudo de uma vez", pule as pausas.)
   239	
   240	---
   241	
   242	## FASE 2 — FRAMEWORK STACK ANALYSIS (F1–F7)
   243	
   244	Após os 17 artefatos, gere a análise estratégica com os 19 frameworks organizados em 7 blocos.
   245	
   246	### FORMATO PADRÃO DE FRAMEWORK
   247	
   248	```
   249	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   250	FX — [NOME DO BLOCO]
   251	Frameworks: [FW1] | [FW2] | [FW3]
   252	Camada: [founder / consultant / product / operator]
   253	Pergunta do founder: [pergunta central]
   254	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   255	
   256	────────────────────────────────────────────────────────────────────────────────
   257	FRAMEWORK X.Y — [NOME]
   258	Aplicado a: [contexto específico do produto]
   259	────────────────────────────────────────────────────────────────────────────────
   260	
   261	┌──────────────────┬────────────────────────────────────────────────────────────┐
   262	│ [Elemento]       │ [Conteúdo extraído do corpus]                              │
   263	├──────────────────┼────────────────────────────────────────────────────────────┤
   264	│ ...              │ ...                                                        │
   265	└──────────────────┴────────────────────────────────────────────────────────────┘
   266	
   267	OUTPUT FUNDADOR (FX/[FRAMEWORK]):
   268	  → [insight 1]
   269	  → [insight 2]
   270	```
   271	
   272	---
   273	
   274	### 7 BLOCOS DO FRAMEWORK STACK
   275	
   276	**F1 — KICKOFF** | Frameworks: SCQA | BLUF | Cynefin
   277	Camada: founder + consultant
   278	Pergunta: O que exatamente estou construindo?
   279	
   280	- **SCQA:** Situation / Complication / Question / Answer aplicados à tese do produto
   281	- **BLUF:** Bottom Line Up Front — declaração executiva em 5 elementos
   282	- **Cynefin:** Classificar domínio (Simple/Complicated/Complex/Chaotic) + implicação
   283	
   284	---
   285	
   286	**F2 — DIAGNÓSTICO** | Frameworks: SWOT | 5Whys | Ishikawa | Porter | JTBD | TOC
   287	Camada: consultant + simulation (fixture)
   288	Pergunta: O sistema consegue pensar como consultor?
   289	
   290	- **SWOT:** Do produto (não do negócio da fixture)
   291	- **5Whys:** Causa raiz do problema que o produto resolve
   292	- **Ishikawa:** Diagrama de causa e efeito (texto estruturado)
   293	- **Porter:** 5 forças aplicadas ao mercado do produto
   294	- **JTBD:** Jobs-to-be-Done do usuário primário e cliente final
   295	- **TOC:** Teoria das Restrições — identificar gargalo principal
   296	
   297	---
   298	
   299	**F3 — PRIORIZAÇÃO** | Frameworks: GUT | Pareto | MECE
   300	Camada: product + consultant
   301	Pergunta: O que fazer primeiro para gerar mais impacto com menos esforço?
   302	
   303	- **GUT:** Gravidade / Urgência / Tendência dos problemas e decisões do backlog
   304	- **Pareto:** 20% de esforço que gera 80% do valor — identificar os itens P0 reais
   305	- **MECE:** Validar que o backlog é Mutually Exclusive, Collectively Exhaustive
   306	
   307	---
   308	
   309	**F4 — PLANEJAMENTO** | Frameworks: 5W2H | OKR | 7Ps | BSC
   310	Camada: founder + product
   311	Pergunta: Qual é o plano concreto de execução?
   312	
   313	- **5W2H:** Plano de 30 dias completo (What/Who/Where/When/Why/How/How much)
   314	- **OKR:** Objetivos e Key Results com 4 KRs por objetivo
   315	- **7Ps:** Product / Price / Place / Promotion / People / Process / Physical Evidence
   316	- **BSC:** Balanced Scorecard nas 4 perspectivas (financeira / clientes / processos / aprendizado)
   317	
   318	---
   319	
   320	**F5 — ITERAÇÃO** | Frameworks: PDCA | OODA
   321	Camada: consultant + operator
   322	Pergunta: Como aprendo e ajusto a cada ciclo?
   323	
   324	- **PDCA:** Plan / Do / Check / Act — ciclo de melhoria documentado
   325	- **OODA:** Observe / Orient / Decide / Act — decisão ágil após cada feedback de usuário
   326	
   327	---
   328	
   329	**F6 — VALIDAÇÃO** | Frameworks: First Principles | PESTEL
   330	Camada: founder + product
   331	Pergunta: O que é verdade fundamental e o que ainda é hipótese?
   332	
   333	- **First Principles:** Decompor em verdades fundamentais vs hipóteses não confirmadas
   334	- **PESTEL:** Political / Economic / Social / Technological / Environmental / Legal — contexto macro
   335	
   336	---
   337	
   338	**F7 — HANDOVER** | Frameworks: BLUF | SCQA
   339	Camada: founder + portfolio
   340	Pergunta: Como converto produto em ativo público e de carreira?
   341	
   342	- **BLUF:** Mensagem diferente para cada audiência (recrutador / consultor / cliente / investidor)
   343	- **SCQA:** Narrativa de portfólio — framing para LinkedIn, blog, GitHub, pitch
   344	
   345	---
   346	
   347	### PROTOCOLO DE GERAÇÃO — FASE 2
   348	
   349	Gere os blocos de framework em 2 lotes:
   350	- **Lote A:** F1, F2, F3, F4
   351	- **Lote B:** F5, F6, F7
   352	
   353	Termine com o **Sumário Executivo** (tabela compacta F1–F7) e a **Sequência de Execução
   354	Recomendada** (tabela com 8 passos, framework aplicado e resultado esperado).
   355	
   356	---
   357	
   358	## FASE 3 — COMPILAÇÃO FINAL
   359	
   360	Após gerar tudo, produza a versão compilada final com:
   361	
   362	1. **Header** com metadados do caso, data e versão
   363	2. **Regra Governante** (tabela com os 8 campos)
   364	3. **Corpus — 17 Artefatos** (A01–A17 em sequência)
   365	4. **Mapa de Dependências** (tabela com status de cada artefato)
   366	5. **Framework Stack Analysis** (F1–F7 completo)
   367	6. **Sumário Executivo** (tabela compacta F×Framework×Insight×Output)
   368	7. **Sequência de Execução** (8 passos ordenados)
   369	8. **Regra Governante Final** (fechamento com dono/produto/fixture/gates)
   370	
   371	Ofereça ao usuário:
   372	```
   373	"✅ Corpus gerado. Deseja que eu:
   374	  [A] Exporte como arquivo .md para download
   375	  [B] Gere também o SKILL.md operacional do produto (para usar como skill no claude.ai)
   376	  [C] Ambos"
   377	```
   378	
   379	---
   380	
   381	## GATES DE QUALIDADE
   382	
   383	Antes de entregar qualquer artefato, verifique:
   384	
   385	- [ ] Todos os campos têm conteúdo denso e específico (não genérico)
   386	- [ ] Nenhum artefato descreve o negócio da fixture como se fosse o corpus principal
   387	- [ ] Labels epistêmicos presentes onde há incerteza
   388	- [ ] Nenhuma promessa financeira ou dado inventado
   389	- [ ] Fixture aparece apenas como caso de teste/demo
   390	- [ ] Primeira execução limitada ao número de outputs definido nos metadados
   391	
   392	---
   393	
   394	## ANTI-CONFUSION RULE
   395	
   396	```
   397	Se em qualquer momento você perceber que está escrevendo sobre o negócio da fixture
   398	como se fosse o produto do dono → PARE. Corrija o sujeito. Reescreva.
   399	
   400	Teste: "Este artefato descreve [PRODUTO DO DONO] ou [NEGÓCIO DA FIXTURE]?"
   401	Se a resposta for [NEGÓCIO DA FIXTURE] → está errado.
   402	```
   403	
   404	---
   405	
   406	## MODO RÁPIDO (optional)
   407	
   408	Se o usuário disser "modo rápido" ou "sem pausas", gere todos os 17 artefatos e
   409	os 7 blocos de framework em sequência contínua, sem aguardar confirmação entre lotes.
   410	
   411	## MODO ARTEFATO ÚNICO (optional)
   412	
   413	Se o usuário disser "só o A04" ou "só o F2", gere apenas aquele artefato/bloco
   414	usando os metadados fornecidos. Útil para regenerar artefatos específicos.
   415	
   416	## MODO ATUALIZAÇÃO (optional)
   417	
   418	Se o usuário fornecer um corpus existente e pedir para atualizar apenas artefatos
   419	específicos, leia o corpus, atualize os campos indicados e mantenha o restante intacto.
   420	
[420 lines total]
{"returncode":0,"stdout":"Estrutura criada\n","stderr":""}
{"returncode":0,"stdout":"SKILL.md copiado\n","stderr":""}
Agora vou melhorar o SKILL.md com base nos problemas encontrados na auditoria — principalmente a descrição de ativação (que estava boa mas pode ser mais robusta) e adicionar um índice de recursos ao corpo:
Successfully replaced string in /tmp/scripity-fixed/scripity/SKILL.md
Agora movo os cases para `assets/cases/`, o script para `scripts/`, e crio os arquivos de teste adequados:
{"returncode":0,"stdout":"Arquivos movidos\n","stderr":""}
File created successfully: /tmp/scripity-fixed/scripity/tests/evals.json
File created successfully: /tmp/scripity-fixed/scripity/tests/README.md
Agora empacoto a skill corretamente:
{"returncode":0,"stdout":"scripity\nscripity/SKILL.md\nscripity/assets\nscripity/assets/cases\nscripity/assets/cases/case_leonardo.yaml\nscripity/assets/cases/case_maria_exemplo.yaml\nscripity/assets/cases/metadata_template.yaml\nscripity/references\nscripity/scripts\nscripity/scripts/scripity.py\nscripity/tests\nscripity/tests/README.md\nscripity/tests/evals.json\n","stderr":""}
{"returncode":0,"stdout":"  adding: scripity/ (stored 0%)\n  adding: scripity/tests/ (stored 0%)\n  adding: scripity/tests/evals.json (deflated 60%)\n  adding: scripity/tests/README.md (deflated 43%)\n  adding: scripity/scripts/ (stored 0%)\n  adding: scripity/scripts/scripity.py (deflated 71%)\n  adding: scripity/SKILL.md (deflated 61%)\n  adding: scripity/references/ (stored 0%)\n  adding: scripity/assets/ (stored 0%)\n  adding: scripity/assets/cases/ (stored 0%)\n  adding: scripity/assets/cases/case_maria_exemplo.yaml (deflated 50%)\n  adding: scripity/assets/cases/case_leonardo.yaml (deflated 60%)\n  adding: scripity/assets/cases/metadata_template.yaml (deflated 59%)\nPackaged OK\n-rw-r--r-- 1 root root 26K Apr 26 20:10 scripity.skill\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
Aqui está o que foi corrigido, problema a problema:

**Erros críticos resolvidos (vermelho):**
- `Scrpity.00/` → `scripity/` — pasta raiz com nome correto, sem typo e sem versão no nome
- `skill/Skill.md.md` → `scripity/SKILL.md` — o arquivo agora está na raiz da pasta, com nome correto e sem extensão duplicada
- `refrences/` → `references/` — typo corrigido

**Melhorias estruturais (amarelo):**
- `scrpits/` → `scripts/` — typo corrigido
- `scripity.skill` removido de dentro de scripts/ — arquivo de packaging não pertence dentro da skill
- `refrences/case_*.yaml` → `assets/cases/` — os cases de exemplo são assets, não referências técnicas
- `tests/TODO.md` substituído por `tests/evals.json` real com 8 casos de teste formais + `README.md` explicando como rodar

**Melhoria no SKILL.md:**
- Descrição expandida com mais frases de ativação ("gerar documentação estratégica", "montar meu corpus de produto", "criar corpus AI-first", etc.)
- Adicionado índice de recursos no topo do corpo — agora Claude sabe exatamente quando e como ler cada arquivo bundled
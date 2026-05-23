---
title: "Improving raptor skill"
date: 2026-05-15
account: leonardopimentel.knh@gmail.com
uuid: 36cffcf9-89a6-4fd7-b528-2dc33e988169
messages: 8
tags: []
context: ""
---

**Você** _2026-05-15_

/skill-creator  improve and refine raptor

---

**Claude** _2026-05-15_

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
     1	- [ ] workflow:normalizar em fases-cada prmpt
     2	- [ ] esse prompt pode levar dias para terminar mas sera o melhor !
     3	- [ ] prompt algortimico sera divuldado e um calculo 
     4	- [ ] sempre referncias V1.V2.V3-ETC
     5	- [ ] ID0023
     6	- [ ] nao esquece que isso e meta-prmpt e instrucao
     7	- [ ] live-prom-pro-com self -debate ativas 
     8	- [ ] Pontos de atenção que vale refletir:**
     9	- [ ] PERONZAZACAO DE RESPOSTAS PADRAO: Let me think about the workflow:
    10	
    11	
    12	
    13	
    14	
    15	
    16	
    17	
    18	
    19	
    20	
    21	
    22	
    23	
    24	
    25	
    26	
    27	
    28	
    29	**Phase 1: Onboarding (Consultant receives the pack)**
    30	
    31	- Installs skill suite in Claude.ai
    32	- Configures personal brand (brand-guidelines)
    33	- Sets up MCPs (Linear, Slack, Google Drive, etc.)
    34	- Customizes product-self-knowledge for their own practice
    35	
    36	**Phase 2: Engagement Start**
    37	
    38	- Client briefing → x-ray-abs generates diagnosis
    39	- x-ray-db normalizes to YAML for downstream agents
    40	- doc-coauthoring produces initial engagement document
    41	
    42	**Phase 3: Active Consultation**
    43	
    44	- Capture commands (captura, captura_decisao, captura_hipotese, etc.)
    45	- web-artifacts-builder produces client-facing deliverables
    46	- internal-comms generates status updates, 3P updates
    47	
    48	**Phase 4: Delivery**
    49	
    50	- projects-to-linear creates project structure …
    51	- [ ] usar o prompt que considera que sempre estou errado - para analsie
    52	- [ ] INSTRCAO GLOBAL QUE ENTREGOU EXCELENTE BEM ARTEFATO DE SPRINTS PADRAO OURO [The user wants me to:
    53	
    54	1. Read all the relevant skills
    55	2. Analyze the business model concept: a "X-Ray Business Skill Suite" for consultants
    56	3. Demonstrate the workflow
    57	4. Provide analysis
    58	5. Create an implementation prompt
    59	
    60	Let me think about the workflow:
    61	
    62	**Phase 1: Onboarding (Consultant receives the pack)**
    63	
    64	- Installs skill suite in Claude.ai
    65	- Configures personal brand (brand-guidelines)
    66	- Sets up MCPs (Linear, Slack, Google Drive, etc.)
    67	- Customizes product-self-knowledge for their own practice
    68	
    69	**Phase 2: Engagement Start**
    70	
    71	- Client briefing → x-ray-abs generates diagnosis
    72	- x-ray-db normalizes to YAML for downstream agents
    73	- doc-coauthoring produces initial engagement document
    74	
    75	**Phase 3: Active Consultation**
    76	
    77	- Capture commands (captura, captura_decisao, captura_hipotese, etc.)
    78	- web-artifacts-builder produces client-facing deliverables
    79	- internal-comms generates status updates, 3P updates
    80	
    81	**Phase 4: Delivery**
    82	
    83	- projects-to-linear creates project structure …
    84	
    85	Let me read the skills I haven't read yet: web-artifacts-builder, x-ray-db, projects-to-linear   Now I have all the context. Let me synthesize everything into a comprehensive analysis of the business model, workflow demonstration, and implementation prompt.
    86	
    87	The concept is:
    88	
    89	- A consultant receives a "X-Ray Pack" — a skill suite built on Claude.ai
    90	- The consultant uses it as a co-pilot during consulting engagements
    91	- It's NOT "AI decides" — it's structured capture + automation
    92	- The consultant operates in Claude.ai using the skill for document capture, connections, asset delivery
    93	- This is an MVP product
    94	
    95	The skill suite includes:
    96	
    97	- x-ray-abs (strategic diagnosis)
    98	- x-ray-db (YAML normalization)
    99	- skill-creator (meta-skill for customization)
   100	- brand-guidelines (visual identity)
   101	- internal-comms (structured communication)
   102	- doc-coauthoring (document production)
   103	- web-artifacts-builder (interactive deliverables)
   104	- projects-to-linear (project management integration)
   105	- product-self-knowledge (accurate product info)
   106	
   107	The business model:
   108	
   109	1. Consultant buys/receives the "X-Ray Pack" (skill suite)
   110	2. Installs in Claude.ai
   111	3. Uses it as co-pilot during client engagements
   112	4. The pack enables: capture → diagnosis → strategy → deliverables → project management
   113	5. Consultant maintains full control (AI assists, human decides)
   114	
   115	Let me think about the workflow:
   116	
   117	**Phase 1: Onboarding (Consultant receives the pack)**
   118	
   119	- Installs skill suite in Claude.ai
   120	- Configures personal brand (brand-guidelines)
   121	- Sets up MCPs (Linear, Slack, Google Drive, etc.)
   122	- Customizes product-self-knowledge for their own practice
   123	
   124	**Phase 2: Engagement Start**
   125	
   126	- Client briefing → x-ray-abs generates diagnosis
   127	- x-ray-db normalizes to YAML for downstream agents
   128	- doc-coauthoring produces initial engagement document
   129	
   130	**Phase 3: Active Consultation**
   131	
   132	- Capture commands (captura, captura_decisao, captura_hipotese, etc.)
   133	- web-artifacts-builder produces client-facing deliverables
   134	- internal-comms generates status updates, 3P updates
   135	
   136	**Phase 4: Delivery**
   137	
   138	- projects-to-linear creates project structure …
   139	
   140	Mostrar menos.]
   141	- [ ] ### INDICAÇÃO FINAL
   142	
   143	**Você está construindo a skill na direção certa, mas na ordem errada.**
   144	
   145	A ordem atual é: **arquitetura → conteúdo → teste**
   146	
   147	A ordem que vai funcionar é: **teste → arquitetura → conteúdo**
   148	
   149	**Recomendação concreta — 3 passos antes de continuar:**
   150	
   151	1. **Pause a geração de arquivos** da Fase C e D
   152	2. **Execute o Reader Test agora** (fresh Claude + SKILL.md atual + 5 perguntas reais)
   153	3. **Adicione o `ROUTER.md`** e reformate o `consolidated_context.md` para 3P
   154	
   155	Só depois volte a popular os 38 arquivos — porque o Reader Test vai revelar quais deles realmente precisam de conteúdo e quais são estrutura prematura.
   156	
   157	O maior risco da skill não é ter hipóteses erradas. É ter uma arquitetura bonita que nenhum agente fresco consegue navegar sem o contexto do autor.
   158	
   159	1. **38 arquivos é muito para manter coerência.** A pergunta real é: quem atualiza o `consolidated_context.md`depois de cada captura? Se não houver um agente ou workflow automatizado, ele vai ficar stale rapidamente.
   160	2. **`strategic_tensions.md` pode se tornar um cemitério.** Tensões registradas sem critério de resolução ou revisão periódica acumulam e perdem valor. Vale pensar num trigger de revisão forçada.
   161	3. **A Fase C parou no meio da execução.** O estado da árvore não foi confirmado — você sabe quais arquivos de `02_business/` e `09_backlog/` foram efetivamente criados? The user wants me to:
   162	
   163	4. Read product-self-knowledge, brand-guidelines, doc-coauthoring, and internal-comms skills
   164	5. Simulate scenarios with those knowledge bases
   165	6. Operate on implicit and explicit problems
   166	7. Return hypotheses, solutions, and a final recommendation
   167	
   168	
   169	analyze the situation deeply.
   170	
   171	The user is building an x-ray-business-skill — a complex, 38-file operational memory skill for their X-Ray Business. They've identified 3 explicit problems in my earlier analysis:
   172	
   173	1. **38 files is hard to maintain** — consolidated_context.md will go stale
   174	2. **strategic_tensions.md may become a cemetery** — no resolution mechanism
   175	3. **Execution was interrupted mid-Phase C** — unknown state
   176	
   177	Now they want me to:
   178	
   179	- Use product-self-knowledge, brand-guidelines, doc-coauthoring, and internal-comms as knowledge frameworks
   180	- Simulate scenarios
   181	- Operate on explicit AND implicit problems
   182	- Return hypotheses, solutions, and a final recommendation
   183	
   184	<Main-reasoing>
   185	
   186	meta-meta: sacneia essas skill e entende que serao clonadas sob entao use como referencia o ponto final sera justamnete ter essas knhlges sob a marca x-ray. perimirindo que o consultor as use para: 
   187	
   188	Product-self-knowledge lens antropic > then x-ray embleded with [
   189	Product-self-knowledge lens antropic] then > after quando o consultor calibra e personaliza a skill ela passa a ser [ex:Rogerinho_consultant_
   190	Product-self-knowledge made by antropic — but deseyng enble to be personalized by x-ray] essa regra se aplica a todas abaixo: 
   191	
   192	Let me think about what each skill contributes as this workflow discription: 
   193	
	< truncated lines 194-1214 >
  1215	    
  1216	2. **Discovery** — coletar dados de mercado, público e problema.
  1217	    
  1218	3. **Diagnosis** — interpretar os dados e identificar padrões.
  1219	    
  1220	4. **Strategy** — escolher direção, público, oferta e posicionamento.
  1221	    
  1222	5. **Design** — desenhar solução, UX, MVP e entregáveis.
  1223	    
  1224	6. **Validation** — testar hipóteses com mercado.
  1225	    
  1226	7. **Build** — construir a versão mínima necessária.
  1227	    
  1228	8. **Launch** — colocar a oferta no mercado.
  1229	    
  1230	9. **Measure** — medir resultados e evidências.
  1231	    
  1232	10. **Iterate** — ajustar e repetir o ciclo.
  1233	    
  1234	
  1235	Para o seu caso, eu usaria esse ciclo como estrutura principal do projeto Claude:
  1236	
  1237	```xml
  1238	<ciclo_data_driven_xray_business>
  1239	  <scope></scope>
  1240	  <discovery></discovery>
  1241	  <diagnosis></diagnosis>
  1242	  <strategy></strategy>
  1243	  <design></design>
  1244	  <validation></validation>
  1245	  <build></build>
  1246	  <launch></launch>
  1247	  <measure></measure>
  1248	  <iterate></iterate>
  1249	</ciclo_data_driven_xray_business>
  1250	```
  1251	
  1252	A fase mais importante agora parece ser:
  1253	
  1254	**Scope → Discovery → Diagnosis → Strategy**
  1255	
  1256	Ou seja: antes de construir mais plataforma, curso ou SaaS, o próximo passo lógico é transformar as hipóteses em uma matriz de validação e descobrir, com dados, qual frente deve virar o MVP inicial.
  1257	
  1258	——————————————————————————————————————
  1259	
  1260	[NOVA CONVERSA]
  1261	
  1262	<CONTEXT>
  1263	analyze the full content and reflect on the architecture. Let me re-read the document carefully.
  1264	
  1265	The document shows:
  1266	
  1267	1- leia o guia do skill-creator. Vamos reflexionar juntos sobre a arquitetura da  skill em producao. 
  1268	
  1269	a- ideia central da skill é:
  1270	
  1271	
  1272	ela opera para uso comercial e workflows: 
  1273	
  1274	ATIVA EM multiplas fases sobre triguers especificicos apenas a partir de idds selecionados do consltor: 
  1275	
  1276	essencialmente uma **memória operacional persistente** sendo COPILOTO DO CONSULTOR:  para o X-Ray Business, com 38 arquivos em 10 diretórios.
  1277	
  1278	
  1279	NAO DEPENDENDA APENAS DO SEU RACICINIO,VOCE PODE BUSCAR REFERECNIAS COMO #COPILOTY DA MICROSFOT OQUE PODE SER REAPROVEITADO DESSA ARCH — JA VALIDADA PARA MINHA SOLCUAO X-RAY ? 
  1280	
  1281	
  1282	
  1283	
  1284	 a ideia ainda e  bruta — 
  1285	 
  1286	 use seu racicocnio como especilistas em antripic e claude para propor as arch mais aderentes a solcuao do problema que esta sendo considerado que a skill vai resolver. 
  1287	 envoque uma banca interna para tensionar as ideias. 
  1288	inicio: /skill-creator vamos refletir sobre a arquitetura de uma skill que estou planejaendo ?
  1289	
  1290	
  1291	apos voce reflitir busque: Antes de continuar a execução ou refletir sobre a arquitetura, me conta: **qual é o ponto de atrito que você quer resolver agora?**
  1292	
  1293	
  1294	Algumas possibilidades: nao dependa somente expanda:
  1295	
  1296	1. **Arquitetura** — algo na estrutura de diretórios ou na lógica de separação dos módulos não está te convencendo?
  1297	2. **Gate de roteamento da Fase D** — você definiu que é obrigatório, mas como ele deve funcionar na prática?
  1298	3. **Source of truth** — a lógica de "o que entra e o que fica fora" está clara o suficiente?
  1299	4. **Triggers** — a skill vai ser acionada quando/como você espera?
  1300	5. **Outra coisa** — algo que a outra conversa não resolveu bem?
  1301	
  1302	Me conta o que está te incomodando ou o que quer pensar junto.
  1303	
  1304	
  1305	
  1306	
  1307	<Context/>
  1308	
  1309	<TASK> 
  1310	
  1311	a) MAKE SENSE ? > O que está sendo construído:** uma skill de memória operacional persistente para o X-Ray Business, com 38 arquivos em 10 diretórios, espelhando arquitetura Anthropic, com ciclo data-driven de 10 fases e sistema de captura classificada..
  1312	
  1313	a.1-O que já foi executado:** Fase A (8 arquivos de núcleo) e Fase B (10 arquivos do ciclo) estão prontos. A Fase C estava em execução quando a conversa foi cortada — 2 arquivos criados, estado da árvore sendo verificado sem resultado mostrado.
  1314	
  1315	a.2)Análise arquitetural — o que está sólido:**
  1316	
  1317	- A separação epistemológica (fato / hipótese / decisão / tensão) é o ponto mais forte. Poucos sistemas de memória operacional fazem isso com rigor.
  1318	- O `source_of_truth.md` blindado, começando quase vazio, é a decisão mais inteligente da arquitetura. Evita o erro mais comum: promover hipótese a fato por inércia.
  1319	- O gate obrigatório da Fase D como roteador por lógica é correto — impede que arquivos vazios criem falsa sensação de completude.
  1320	
  1321	————————————————————————————————————-
  1322	
  1323	Promt: /product-self-knowledgeGuie plano de solucao para os pontos. simule cenarios com os seguintes conhecimentos: /brand-guidelines/doc-coauthoring/internal-commsopere sobre problemas implcitiso e explicitos. espeonha raciciocione e retorne com hipoteses e solucoes e uma indicacao final
  1324	
  1325	Normalizado: 
  1326	
  1327	Diagnosticou arquitetura, simulou cenários, propôs router e protocolo
  1328	
  1329	Diagnosticou arquitetura, simulou cenários, propôs router e protocolo
  1330	
  1331	The user wants me to:
  1332	
  1333	1. Read product-self-knowledge, brand-guidelines, doc-coauthoring, and internal-comms skills
  1334	2. Simulate scenarios with those knowledge bases
  1335	3. Operate on implicit and explicit problems
  1336	4. Return hypotheses, solutions, and a final recommendation
  1337	
  1338	Let me read all these skill files first. 
  1339	
  1340	PROMTP: de todo modo esse modelo de skill seria o mais aderente as necessdiades de um consutlr de negocio que usa a skill como co-piloto durante execucao de um processo de consultoria,de modo que evite a impressao de AI decide,mas sim como sistema de captura estrturada e automacao. imagino o consultor recebdno a skill,usando esse skill suite refatoriado o consultor rerece o pack x-ray que usa a logica das skills aqui citadas e habilita personalizacao total do consutlor que passa iperar em [claude.ai](http://claude.ai/) e usa skill para captura de docuemtnos,conecoes,entregue de asstes etc.. e esse e o modelo de negocio que pendei precisoo que demonstre como seria esse workflow ? sua analise ? e prompt de implementcao . esse é um mvp /skill-creator /product-self-knowledge/product-self-knowledge/brand-guidelines/internal-comms/doc-coauthoring/web-artifacts-builder/x-ray-db/skill-creator/projects-to-linear
  1341	
  1342	NORMALIZADO: The user wants me to:
  1343	
  1344	1. Read all the relevant skills
  1345	2. Analyze the business model concept: a "X-Ray Business Skill Suite" for consultants
  1346	3. Demonstrate the workflow
  1347	4. Provide analysis
  1348	5. Create an implementation prompt
  1349	
  1350	Let me read the skills I haven't read yet: web-artifacts-builder, x-ray-db, projects-to-linear.
  1351	
  1352	Now I have all the context. Let me synthesize everything into a comprehensive analysis of the business model, workflow demonstration, and implementation prompt.
  1353	
  1354	The concept is:
  1355	
  1356	- A consultant receives a "X-Ray Pack" — a skill suite built on Claude.ai
  1357	- The consultant uses it as a co-pilot during consulting engagements
  1358	- It's NOT "AI decides" — it's structured capture + automation
  1359	- The consultant operates in Claude.ai using the skill for document capture, connections, asset delivery
  1360	- This is an MVP product
  1361	
  1362	The skill suite includes:
  1363	
  1364	- x-ray-abs (strategic diagnosis)
  1365	- x-ray-db (YAML normalization)
  1366	- skill-creator (meta-skill for customization)
  1367	- brand-guidelines (visual identity)
  1368	- internal-comms (structured communication)
  1369	- doc-coauthoring (document production)
  1370	- web-artifacts-builder (interactive deliverables)
  1371	- projects-to-linear (project management integration)
  1372	- product-self-knowledge (accurate product info)
  1373	
  1374	The business model:
  1375	
  1376	1. Consultant buys/receives the "X-Ray Pack" (skill suite)
  1377	2. Installs in Claude.ai
  1378	3. Uses it as co-pilot during client engagements
  1379	4. The pack enables: capture → diagnosis → strategy → deliverables → project management
  1380	5. Consultant maintains full control (AI assists, human decides)
  1381	
  1382	Let me think about the workflow:
  1383	
  1384	**Phase 1: Onboarding (Consultant receives the pack)**
  1385	
  1386	- Installs skill suite in Claude.ai
  1387	- Configures personal brand (brand-guidelines)
  1388	- Sets up MCPs (Linear, Slack, Google Drive, etc.)
  1389	- Customizes product-self-knowledge for their own practice
  1390	
  1391	**Phase 2: Engagement Start**
  1392	
  1393	- Client briefing → x-ray-abs generates diagnosis
  1394	- x-ray-db normalizes to YAML for downstream agents
  1395	- doc-coauthoring produces initial engagement document
  1396	
  1397	**Phase 3: Active Consultation**
  1398	
  1399	- Capture commands (captura, captura_decisao, captura_hipotese, etc.)
  1400	- web-artifacts-builder produces client-facing deliverables
  1401	- internal-comms generates status updates, 3P updates
  1402	
  1403	**Phase 4: Delivery**
  1404	
  1405	- projects-to-linear creates project structure …
  1406	
  1407	[FIM DA CONVERSA]
     1	
	< truncated lines 2-4 >
{"returncode":0,"stdout":"\n- [ ] PENDENTE NORMALICAO PARA PESQUISA\n\nCONTEXTO CONSOLIDADO ATUALIZADO — X-RAY BUSINESS <metadata> projeto: \"X-Ray Business\" fase_atual: \"discovery / estruturação do ciclo de projeto / criação de skill de memória operacional\" data_referencia: \"2026-05-01\" tipo_de_material: \"captura narrativa normalizada\" objetivo_do_material: \"preparar contexto estruturado para uso por agente de IA\" status: \"em construção\" </metadata> <visao_geral_do_negocio> O X-Ray Business é um projeto em desenvolvimento voltado à criação de uma solução de diagnóstico, leitura estratégica e apoio operacional para negócios, consultores ou projetos empresariais. A solução está sendo pensada como um sistema de apoio, ou co-pilot, e não como uma automação totalmente autônoma. O objetivo é ajudar o consultor ou operador estratégico a capturar informações, organizar contexto, estruturar hipóteses, gerar análises, consolidar decisões e produzir entregáveis com maior consistência. O negócio ainda está em fase inicial de formulação. A visão atual combina produto, metodologia, agente de IA, portfólio demonstrativo e arquitetura de conhecimento persistente. </visao_geral_do_negocio> <contexto_atual> O projeto está na fase de discovery. Leonardo percebeu que ainda não estava seguindo de forma explícita um ciclo de projeto bem definido, com fases como escopo, discovery, research, estruturação, validação, construção, operação e evolução. A nova direção é criar uma skill em Markdown, compatível com padrões de organização usados em ambientes como Claude/Anthropic, para funcionar como uma camada persistente de conhecimento do projeto. Essa skill deve conter o briefing do projeto, o contexto de negócio, as decisões, hipóteses, riscos, brand guidelines, conhecimento interno e regras operacionais. A skill deve operar como uma espécie de product self-knowledge ou internal knowledge base do X-Ray Business. Ela deve espelhar uma estrutura de diretórios e documentos internos, funcionando como fonte única de verdade durante o desenvolvimento do projeto. A necessidade central identificada nesta rodada é persistência: as informações capturadas durante conversas, pesquisas e análises não podem ficar soltas no histórico do chat. Elas precisam ser internalizadas, salvas, atualizadas e consolidadas em documentos vivos. </contexto_atual> <objetivo_do_usuario> Leonardo está tentando transformar uma sequência de ideias, áudios, hipóteses e percepções estratégicas em um sistema estruturado de conhecimento para o X-Ray Business. O objetivo não é apenas resumir conversas, mas criar uma memória operacional progressiva, capaz de acompanhar todo o ciclo do projeto desde discovery até operação. Leonardo quer chegar ao final do processo com fontes únicas de verdade prontas, organizadas e utilizáveis por agentes de IA, consultores ou sistemas internos. </objetivo_do_usuario> <hipoteses_de_negocio> * Hipótese 1: O X-Ray Business pode gerar valor ao funcionar como co-pilot para consultores, apoiando diagnóstico, análise, estruturação de entregáveis e tomada de decisão. * Hipótese 2: O produto deve ser posicionado como apoio metodológico e analítico, não como ferramenta que substitui integralmente o julgamento humano. * Hipótese 3: A criação de uma skill em Markdown com conhecimento persistente pode resolver o problema de perda de contexto ao longo do ciclo de desenvolvimento do projeto. * Hipótese 4: Uma estrutura inspirada em product self-knowledge, internal knowledge e brand guidelines pode permitir que o agente opere com consistência, respeitando decisões, linguagem, escopo e arquitetura do negócio. * Hipótese 5: Triggers explícitos, como o comando “captura”, podem funcionar como mecanismo de entrada para salvar decisões, insights e atualizações relevantes dentro dos documentos internos do projeto. </hipoteses_de_negocio> <modelo_de_negocio_em_formacao> <modelo_de_negocio> O modelo de negócio ainda está em formação. A direção atual sugere uma solução híbrida entre metodologia consultiva, sistema de diagnóstico, agente de IA e portfólio demonstrativo. Possíveis formatos comerciais: * Co-pilot para consultores que precisam diagnosticar negócios, organizar informações e gerar entregáveis estratégicos. * Framework ou metodologia X-Ray Business aplicada a empresas, projetos, produtos ou operações. * Skill/agente configurável com conhecimento persistente para acompanhar ciclos de negócio. * Portfólio demonstrativo que mostra a arquitetura, os fluxos, os entregáveis e o funcionamento da solução. * Produto interno ou white-label para consultorias, founders, times de estratégia, marketing, produto ou operações. Mecanismo de geração de valor: * captura estruturada de contexto; * normalização de narrativa; * organização de hipóteses; * consolidação de decisões; * análise de riscos; * construção de entregáveis; * preservação de memória do projeto; * redução de retrabalho; * aumento de consistência entre fases do projeto. </modelo_de_negocio> </modelo_de_negocio_em_formacao> <proposta_de_valor> <proposta_de_valor> O X-Ray Business oferece uma camada de inteligência estruturada para transformar conversas, descobertas, decisões e materiais dispersos em conhecimento operacional consolidado. A proposta de valor atual é permitir que consultores ou operadores de negócio tenham um co-pilot capaz de acompanhar o ciclo completo de um projeto, mantendo contexto persistente, fontes únicas de verdade e entregáveis consistentes. A solução não promete eliminar o trabalho humano nem gerar tudo automaticamente. Ela funciona como apoio à análise, organização e execução, reduzindo perda de contexto e aumentando clareza estratégica. </proposta_de_valor> </proposta_de_valor> <publicos_e_personas> * Usuário primário: consultor, estrategista, founder, operador de negócio ou profissional responsável por diagnosticar, estruturar e acompanhar projetos empresariais. * Cliente final: empresas, negócios, founders, times internos ou clientes de consultoria que precisam de diagnóstico, clareza estratégica e estruturação operacional. * Decisor: dono do negócio, sócio, diretor, gestor de área, head de estratégia, head de produto, head de marketing ou líder de consultoria. * Influenciador: analistas, consultores, operadores internos, especialistas de IA, times de produto, marketing, dados ou operações. * Possíveis segmentos: consultorias, pequenas e médias empresas, startups, negócios em fase de reposicionamento, empresas em crescimento, times internos que precisam organizar conhecimento e projetos estratégicos. </publicos_e_personas> <problemas_que_o_negocio_pretende_resolver> * Problema 1: Conversas estratégicas, áudios, pesquisas e decisões ficam dispersos em chats, documentos e anotações, dificultando continuidade e execução. * Problema 2: Projetos podem avançar sem seguir fases claras, gerando confusão entre discovery, research, escopo, validação, construção e operação. * Problema 3: Agentes de IA podem perder contexto, gerar respostas desalinhadas ou alucinar quando não possuem uma fonte única de verdade atualizada. * Problema 4: Consultores precisam transformar informação bruta em entregáveis claros, mas esse processo exige organização, síntese, estrutura e memória acumulada. * Problema 5: Sem mecanismos explícitos de captura, decisões importantes tomadas durante conversas podem não ser registradas nem refletidas nos documentos centrais do projeto. </problemas_que_o_negocio_pretende_resolver> <solucao_em_desenvolvimento> <agente_ia> A solução em desenvolvimento é uma skill em Markdown para o X-Ray Business, projetada para funcionar como uma memória operacional persistente do projeto. Essa skill deve conter: * briefing do projeto; * contexto consolidado; * fase atual; * ciclo de projeto; * hipóteses de negócio; * decisões; * dúvidas; * riscos; * oportunidades; * guidelines de marca; * regras de operação do agente; * fontes únicas de verdade; * estruturas de atualização; * comandos ou triggers para captura. A skill deve permitir que, durante conversas ou pesquisas inline, Leonardo possa acionar um comando como “captura”. Quando esse trigger for usado, o agente deverá identificar se a informação é uma decisão, hipótese, risco, insight, pendência, guideline ou atualização estrutural, e então atualizar os documentos internos correspondentes. O objetivo final é que, ao concluir o processo de discovery, research e estruturação, o projeto tenha uma base documental pronta para iniciar a operação. </agente_ia> </solucao_em_desenvolvimento> <componentes_do_produto_ou_servico> * Componente: Skill MD / Markdown do X-Ray Business função: organizar o conhecimento central do projeto em documentos persistentes e reutilizáveis. valor_entregue: reduz perda de contexto e cria fonte única de verdade. estágio: em formulação. * Componente: Trigger “captura” função: acionar a internalização de decisões, insights e atualizações relevantes durante conversas ou pesquisas. valor_entregue: transforma informação emergente em conhecimento salvo e estruturado. estágio: conceito definido, implementação pendente. * Componente: Diretório interno da skill função: organizar arquivos por temas como briefing, discovery, research, decisões, brand guidelines, produto, operação e backlog. valor_entregue: permite navegação, manutenção e evolução do conhecimento do projeto. estágio: pendente de desenho. * Componente: Fonte única de verdade função: consolidar as informações finais e atualizadas do projeto. valor_entregue: evita contradições, duplicidade e desalinhamento entre agentes ou conversas. estágio: necessidade validada. * Componente: Portfólio demonstrativo função: demonstrar a arquitetura, funcionamento e potencial de uso da solução. valor_entregue: serve como demo, material comercial e possível referência operacional para consultores. estágio: ideia registrada. * Componente: Co-pilot para consultor função: apoiar análise, estruturação e produção de entregáveis. valor_entregue: aumenta produtividade sem substituir o julgamento humano. estágio: posicionamento estratégico em formação. </componentes_do_produto_ou_servico> <insights_estrategicos> * Insight 1: O projeto precisa seguir fases e ciclos mais bem definidos. A ausência de um ciclo claro pode dificultar priorização, coleta de informações e transformação das ideias em produto operacional. * Insight 2: A persistência do conhecimento é central. O valor do sistema não está apenas em responder bem, mas em manter o contexto vivo e atualizado ao longo do projeto. * Insight 3: A skill deve funcionar como camada de memória, governança e atualização documental do X-Ray Business. * Insight 4: O comando “captura” pode se tornar um mecanismo operacional simples e poderoso para transformar conversas em documentação estruturada. * Insight 5: O produto deve deixar claro que é um co-pilot, não um gerador autônomo infalível. Essa distinção é importante para mitigar risco de alucinação e preservar confiança. * Insight 6: O portfólio pode funcionar como demonstrativo da arquitetura da solução, não apenas como material visual ou comercial. * Insight 7: A lógica de product self-knowledge e internal knowledge pode ser aplicada ao próprio desenvolvimento do X-Ray Business, antes de ser oferecida como solução para terceiros. </insights_estrategicos> <decisoes_ja_tomadas> * Decisão: Posicionar a solução como co-pilot para consultores. justificativa: reduzir risco de expectativa excessiva sobre automação e deixar claro que o sistema apoia, mas não substitui, julgamento humano. impacto: influencia comunicação, produto, entregáveis e limites de uso. * Decisão: Criar um portfólio demonstrativo da arquitetura do X-Ray Business. justificativa: mostrar o funcionamento da solução e permitir demonstração prática. impacto: pode servir como material comercial, técnico e operacional. * Decisão: Estruturar uma skill em Markdown para o projeto. justificativa: criar um formato persistente, editável e reutilizável de conhecimento. impacto: transforma a operação do projeto em um sistema documentado, não apenas em conversas soltas. * Decisão: Usar triggers explícitos, como “captura”, para registrar informações importantes. justificativa: permitir que decisões e insights sejam salvos no momento em que surgem. impacto: melhora a governança do conhecimento e reduz perda de informação. * Decisão: Tratar o momento atual como fase de discovery. justificativa: Leonardo está colhendo informações, estruturando hipóteses e entendendo o escopo antes de avançar para fases posteriores. impacto: ajuda a organizar o ciclo de trabalho e evitar execução prematura. </decisoes_ja_tomadas> <duvidas_em_aberto> * Dúvida: Qual deve ser exatamente o ciclo de fases do projeto X-Ray Business? contexto: Leonardo percebeu que ainda não está seguindo um ciclo claramente definido. impacto_na_decisao: define organização dos documentos, critérios de avanço e backlog. * Dúvida: Qual deve ser a estrutura exata do diretório da skill MD? contexto: a intenção é espelhar uma lógica semelhante a diretórios de conhecimento interno e product self-knowledge. impacto_na_decisao: afeta manutenção, versionamento e facilidade de uso por agentes. * Dúvida: Onde a persistência será implementada de fato? contexto: a skill precisa salvar atualizações em documentos internos, mas o ambiente técnico ainda não foi definido. impacto_na_decisao: pode exigir Claude Project, arquivos Markdown locais, Drive, Git, Notion, Obsidian ou outro repositório. * Dúvida: O trigger “captura” deve salvar qualquer informação relevante ou apenas decisões formalizadas? contexto: durante conversas inline podem surgir insights, dúvidas, hipóteses e decisões. impacto_na_decisao: define regras de governança e evita poluição da fonte única de verdade. * Dúvida: Como diferenciar informação bruta, hipótese, decisão e fonte única de verdade? contexto: o projeto precisa evitar misturar ideias exploratórias com decisões consolidadas. impacto_na_decisao: afeta confiabilidade do sistema e qualidade das análises futuras. * Dúvida: Como o agente deve lidar com contradições entre versões anteriores e novas decisões? contexto: o projeto está em formação e ideias podem mudar. impacto_na_decisao: exige regras de versionamento, substituição ou marcação de tensão estratégica. </duvidas_em_aberto> <riscos_e_limitacoes> * Risco: A solução parecer autônoma demais. descrição: usuários podem interpretar que o sistema gera tudo sozinho, quando a intenção é funcionar como co-pilot. possível_mitigação: deixar explícito na proposta de valor, nos materiais e nos fluxos que o agente apoia o consultor e exige validação humana. * Risco: Alucinações de IA comprometerem entregáveis. descrição: agentes podem produzir inferências incorretas se não forem ancorados em fontes claras. possível_mitigação: usar fontes únicas de verdade, separar fatos de hipóteses e exigir validação de decisões. * Risco: Perda de contexto entre conversas. descrição: sem persistência documental, insights importantes podem ficar presos em chats isolados. possível_mitigação: implementar skill MD com arquivos internos atualizáveis e triggers de captura. * Risco: Acúmulo desorganizado de informações. descrição: capturar tudo sem taxonomia pode gerar excesso de conteúdo e baixa usabilidade. possível_mitigação: estruturar categorias claras: decisão, hipótese, dúvida, risco, oportunidade, guideline, backlog e fonte validada. * Risco: Confusão entre discovery, research, validação e operação. descrição: sem fases explícitas, o projeto pode misturar exploração com execução. possível_mitigação: desenhar um ciclo de projeto com critérios de entrada e saída para cada fase. * Risco: A skill depender de capacidades técnicas não disponíveis no ambiente escolhido. descrição: nem todo ambiente permite atualização automática real de arquivos persistentes. possível_mitigação: definir arquitetura técnica antes de depender operacionalmente do mecanismo de salvamento. </riscos_e_limitacoes> <oportunidades> - Oportunidade: Criar uma metodologia própria de gestão de conhecimento para projetos com IA. por que importa: muitos projetos com IA sofrem com perda de contexto e baixa governança. como pode ser explorada: transformar a skill MD em parte central da oferta X-Ray Business. * Oportunidade: Usar o próprio X-Ray Business como caso demonstrativo. por que importa: o desenvolvimento do projeto pode servir como prova de conceito. como pode ser explorada: documentar o ciclo completo, desde discovery até operação, como portfólio vivo. * Oportunidade: Criar um sistema de captura inline para consultores. por que importa: consultores tomam decisões e percebem insights durante conversas, reuniões e análises. como pode ser explorada: oferecer comandos padronizados como “captura”, “decisão”, “risco”, “pendência” e “atualiza fonte”. * Oportunidade: Construir fontes únicas de verdade para negócios em desenvolvimento. por que importa: empresas e projetos frequentemente operam com conhecimento fragmentado. como pode ser explorada: vender como diagnóstico, organização estratégica ou camada de governança de IA. * Oportunidade: Combinar brand guidelines, conhecimento interno e product self-knowledge. por que importa: agentes ficam mais consistentes quando têm regras, contexto e limites claros. como pode ser explorada: transformar esses blocos em módulos reutilizáveis da skill. </oportunidades> <requisitos_para_o_agente_de_ia> <agente_ia> O futuro agente de IA do X-Ray Business deverá: 1. Ler e respeitar o contexto consolidado do projeto antes de executar análises. 2. Separar claramente fatos, hipóteses, decisões, dúvidas, riscos, oportunidades e pendências. 3. Não tratar hipóteses como fatos. 4. Não apagar informações anteriores sem correção explícita de Leonardo. 5. Quando houver contradição, registrar como tensão estratégica. 6. Operar como co-pilot, não como autoridade final. 7. Usar linguagem operacional, clara e pronta para documentação. 8. Atualizar documentos internos quando um trigger de captura for acionado. 9. Manter uma fonte única de verdade sempre que decisões forem consolidadas. 10. Diferenciar material bruto de material validado. 11. Apoiar as fases do projeto: escopo, discovery, research, síntese, desenho da solução, validação, implementação, operação e evolução. 12. Preservar o raciocínio estratégico, não apenas gerar resumo. 13. Permitir copy/paste do contexto para outro agente sem necessidade de reorganização manual. 14. Funcionar como memória operacional estruturada do X-Ray Business. </agente_ia> </requisitos_para_o_agente_de_ia> <backlog_de_analise> * Item: Definir ciclo oficial do projeto X-Ray Business. prioridade: alta. motivo: necessário para organizar discovery, research, construção e operação. * Item: Desenhar estrutura de diretórios da skill MD. prioridade: alta. motivo: necessário para implementar persistência e fonte única de verdade. * Item: Definir comandos/triggers operacionais. prioridade: alta. motivo: o comando “captura” precisa ter regras claras de uso, classificação e atualização. * Item: Separar documentos de conhecimento bruto, hipóteses e decisões validadas. prioridade: alta. motivo: evita confusão entre exploração e verdade operacional. * Item: Criar modelo de arquivo para briefing do projeto. prioridade: média. motivo: será o ponto de entrada da skill. * Item: Criar modelo de arquivo para decisões. prioridade: alta. motivo: decisões precisam ser versionadas e rastreáveis. * Item: Criar modelo de arquivo para brand guidelines. prioridade: média. motivo: necessário para consistência de linguagem, posicionamento e apresentação. * Item: Criar modelo de arquivo para product self-knowledge. prioridade: alta. motivo: necessário para que o agente entenda produto, escopo, limites e proposta de valor. * Item: Definir arquitetura de persistência. prioridade: alta. motivo: sem isso, a skill pode funcionar apenas como instrução estática, não como memória viva. * Item: Transformar o portfólio demonstrativo em caso de uso. prioridade: média. motivo: pode validar a arquitetura e apoiar venda futura. </backlog_de_analise> <novas_informacoes_incorporadas_nesta_rodada> * Leonardo percebeu que o projeto ainda não está seguindo fases e ciclos bem definidos. * A fase atual foi explicitamente definida como discovery. * Surgiu a ideia de criar uma skill MD nos padrões de organização usados em ambientes como Claude/Anthropic. * A skill deverá conter o briefing do projeto e operar como product self-knowledge/internal knowledge. * A skill também poderá incluir brand guidelines. * A skill deve espelhar uma estrutura de diretórios internos. * A função principal da skill será garantir persistência das informações. * Foi definido o conceito de trigger, especialmente o comando “captura”. * O trigger deverá permitir que decisões, insights e atualizações surgidas em conversas ou pesquisas sejam internalizadas e salvas nos documentos internos. * O objetivo final é chegar ao fim do processo com fontes únicas de verdade prontas para operação. </novas_informacoes_incorporadas_nesta_rodada> <pendencias_para_proxima_rodada> * Definir o ciclo oficial do projeto: escopo, discovery, research, síntese, validação, construção, operação e evolução. * Definir quais documentos internos a skill MD terá. * Definir a estrutura de diretórios da skill. * Definir se haverá um único trigger “captura” ou vários comandos especializados. * Definir como o agente deve classificar cada captura: decisão, hipótese, insight, risco, oportunidade, pendência ou guideline. * Definir o ambiente real de persistência: Claude Project, repositório Markdown, Drive, Notion, Obsidian, Git ou outro. * Definir como versionar decisões antigas quando forem alteradas. * Definir quais documentos serão considerados fonte única de verdade. * Definir o formato mínimo de cada arquivo da skill. * Definir como o portfólio demonstrativo se conecta à arquitetura da skill e ao modelo comercial do X-Ray Business. </pendencias_para_proxima_rodada>CONTEXTO CONSOLIDADO ATUALIZADO — X-RAY BUSINESS <metadata> projeto: \"X-Ray Business\" fase_atual: \"Scope → Discovery → Diagnosis → Strategy / estruturação data-driven do projeto / criação de skill MD persistente\" data_referencia: \"2026-05-01\" tipo_de_material: \"captura narrativa normalizada\" objetivo_do_material: \"preparar contexto estruturado para uso por agente de IA\" status: \"em construção\" </metadata> <visao_geral_do_negocio> O X-Ray Business é um projeto em desenvolvimento voltado à criação de uma solução de diagnóstico, leitura estratégica e apoio operacional para negócios, consultores e projetos empresariais. A solução está sendo pensada como um co-pilot para consultores, e não como uma automação total. Seu papel é apoiar captura de informações, organização de contexto, estruturação de hipóteses, análise de dados, diagnóstico estratégico, consolidação de decisões e produção de entregáveis. O projeto combina quatro dimensões principais: 1. metodologia data-driven de análise e validação de negócio; 2. skill MD persistente para organizar conhecimento e decisões; 3. produto ou oferta para consultores, possivelmente curso, plataforma, SaaS Web, consultoria ou sistema Project to Linear; 4. portfólio demonstrativo para mostrar arquitetura, casos de uso e entregáveis. O X-Ray Business deverá funcionar como uma camada de inteligência estruturada para transformar informações dispersas em fontes únicas de verdade, úteis para decisão, validação e operação. </visao_geral_do_negocio> <contexto_atual> Leonardo percebeu que o projeto precisava seguir fases e ciclos mais bem definidos. A estrutura agora passa a ser orientada por um ciclo de negócio data-driven específico para o X-Ray Business. O ciclo principal proposto é: <ciclo_data_driven_xray_business> definir escopo da análise, hipótese, público, decisão a desbloquear e limites do que será analisado. coletar dados qualitativos e quantitativos sobre mercado, público, dores, concorrência, comportamento e contexto. interpretar dados, identificar padrões, validar ou enfraquecer hipóteses e explicitar riscos. definir direção recomendada, público prioritário, oferta, canal, posicionamento e modelo de negócio. desenhar solução, arquitetura, experiência, MVP, UX e entregáveis. testar hipóteses com mercado antes de construir demais. construir apenas o necessário para entregar ou testar a proposta validada. colocar a oferta no mercado com mensagem, canal, CTA, preço e métrica de sucesso. medir desempenho real da oferta, canal, mensagem, produto e comportamento do usuário. usar dados para ajustar hipótese, oferta, produto, canal ou público. </ciclo_data_driven_xray_business> A fase prioritária atual parece ser: <fase_prioritaria_atual> Scope → Discovery → Diagnosis → Strategy </fase_prioritaria_atual> A implicação estratégica é que, antes de construir mais plataforma, curso ou SaaS, o próximo passo lógico é transformar as hipóteses em uma matriz de validação e descobrir, com dados, qual frente deve virar o MVP inicial. Em paralelo, Leonardo quer criar uma skill MD nos padrões de organização de projetos como Claude/Anthropic. Essa skill deve funcionar como memória operacional persistente do projeto, contendo briefing, contexto, decisões, hipóteses, ciclo de negócio, brand guidelines, product self-knowledge, internal knowledge e regras de operação do agente. A skill deverá permitir capturas inline durante conversas e pesquisas. Quando Leonardo acionar um comando como “captura”, o agente deverá identificar o tipo de informação, classificar corretamente e atualizar os documentos internos do projeto. </contexto_atual> <objetivo_do_usuario> Leonardo está tentando transformar uma sequência de ideias, áudios, hipóteses, dúvidas e percepções estratégicas em um sistema estruturado de conhecimento para o X-Ray Business. O objetivo não é apenas resumir conversas. O objetivo é criar uma memória operacional progressiva, capaz de acompanhar o ciclo completo do projeto desde escopo, discovery e diagnóstico até estratégia, design, validação, construção, lançamento, medição e iteração. Leonardo quer chegar ao final do processo com fontes únicas de verdade prontas, organizadas e utilizáveis por agentes de IA, consultores, sistemas internos ou futuros ambientes de operação. </objetivo_do_usuario> <hipoteses_de_negocio> * Hipótese 1: O X-Ray Business pode gerar valor ao funcionar como co-pilot para consultores, apoiando diagnóstico, análise, estruturação de entregáveis e tomada de decisão. * Hipótese 2: O produto deve ser posicionado como apoio metodológico e analítico, não como ferramenta que substitui integralmente o julgamento humano. * Hipótese 3: A criação de uma skill em Markdown com conhecimento persistente pode resolver o problema de perda de contexto ao longo do ciclo de desenvolvimento do projeto. * Hipótese 4: Uma estrutura inspirada em product self-knowledge, internal knowledge e brand guidelines pode permitir que o agente opere com consistência, respeitando decisões, linguagem, escopo e arquitetura do negócio. * Hipótese 5: Triggers explícitos, como o comando “captura”, podem funcionar como mecanismo de entrada para salvar decisões, insights e atualizações relevantes dentro dos documentos internos do projeto. * Hipótese 6: Consultores poderiam pagar por uma SaaS Web de skills se a solução reduzir fricção técnica, aumentar produtividade e entregar clareza operacional. * Hipótese 7: O primeiro MVP pode não ser necessariamente uma plataforma SaaS; pode ser curso, consultoria, portfólio demonstrativo, biblioteca de skills, Project to Linear ou combinação híbrida. * Hipótese 8: Consultores solo e pequenas boutiques de consultoria podem ter dores, maturidade técnica, orçamento e velocidade de adoção diferentes; o público inicial precisa ser validado com dados. * Hipótese 9: Existe interesse em IA entre consultores, mas baixa clareza sobre instalação, uso e adaptação de skills pode travar adoção. * Hipótese 10: A plataforma pode ser desejável no longo prazo, mas a curva de aprendizado pode tornar uma oferta mais guiada, educacional ou consultiva mais adequada como MVP inicial. </hipoteses_de_negocio> <modelo_de_negocio_em_formacao> <modelo_de_negocio> O modelo de negócio ainda está em formação. A direção atual sugere uma solução híbrida entre metodologia consultiva, sistema de diagnóstico, agente de IA, biblioteca de skills, plataforma, curso, consultoria e portfólio demonstrativo. Possíveis modelos ou ofertas em análise: * SaaS Web de skills para consultores. * Curso para ensinar consultores a usar IA, skills e fluxos estruturados. * Plataforma com biblioteca inicial de skills. * Consultoria ou serviço guiado de implementação de skills e workflows. * Project to Linear como case demonstrável ou ativo de produto. * Portfólio demonstrativo com arquitetura, fluxos, e-book interativo, formulários, páginas web e demos. * Co-pilot para consultores que precisam diagnosticar negócios, organizar informações e gerar entregáveis estratégicos. * Framework X-Ray Business aplicado a empresas, projetos, produtos ou operações. * Skill/agente configurável com conhecimento persistente para acompanhar ciclos de negócio. Mecanismo de geração de valor: * captura estruturada de contexto; * normalização de narrativa; * organização de hipóteses; * diagnóstico a partir de dados; * consolidação de decisões; * análise de riscos; * criação de matriz de validação; * construção de entregáveis; * preservação de memória do projeto; * redução de retrabalho; * aumento de consistência entre fases do projeto; * redução da fricção técnica para consultores; * apoio à transformação de IA em produto, serviço ou rotina operacional. </modelo_de_negocio> </modelo_de_negocio_em_formacao> <proposta_de_valor> <proposta_de_valor> O X-Ray Business oferece uma camada de inteligência estruturada para transformar conversas, descobertas, decisões, pesquisas e materiais dispersos em conhecimento operacional consolidado. A proposta de valor atual é permitir que consultores ou operadores de negócio tenham um co-pilot capaz de acompanhar o ciclo completo de um projeto, mantendo contexto persistente, fontes únicas de verdade, hipóteses rastreáveis, diagnósticos baseados em dados e entregáveis consistentes. A solução não promete eliminar o trabalho humano nem gerar tudo automaticamente. Ela funciona como apoio à análise, organização e execução, reduzindo perda de contexto, aumentando clareza estratégica e ajudando o consultor a decidir com mais evidência. </proposta_de_valor> </proposta_de_valor> <publicos_e_personas> * Usuário primário: consultor, estrategista, founder, operador de negócio ou profissional responsável por diagnosticar, estruturar e acompanhar projetos empresariais. * Cliente final: empresas, negócios, founders, times internos ou clientes de consultoria que precisam de diagnóstico, clareza estratégica e estruturação operacional. * Decisor: dono do negócio, sócio, diretor, gestor de área, head de estratégia, head de produto, head de marketing ou líder de consultoria. * Influenciador: analistas, consultores, operadores internos, especialistas de IA, times de produto, marketing, dados ou operações. * Possíveis segmentos: consultores solo, pequenas boutiques de consultoria, consultorias em transformação digital, PMEs, startups, negócios em fase de reposicionamento, empresas em crescimento e times internos que precisam organizar conhecimento e projetos estratégicos. * Público a validar primeiro: ainda indefinido. As opções mais citadas são consultor solo e pequena boutique de consultoria. Essa escolha deve ser tratada como decisão a desbloquear pela matriz de validação. </publicos_e_personas> <problemas_que_o_negocio_pretende_resolver> * Problema 1: Conversas estratégicas, áudios, pesquisas e decisões ficam dispersos em chats, documentos e anotações, dificultando continuidade e execução. * Problema 2: Projetos podem avançar sem seguir fases claras, gerando confusão entre scope, discovery, diagnosis, strategy, design, validation, build, launch, measure e iterate. * Problema 3: Agentes de IA podem perder contexto, gerar respostas desalinhadas ou alucinar quando não possuem uma fonte única de verdade atualizada. * Problema 4: Consultores precisam transformar informação bruta em entregáveis claros, mas esse processo exige organização, síntese, estrutura e memória acumulada. * Problema 5: Sem mecanismos explícitos de captura, decisões importantes tomadas durante conversas podem não ser registradas nem refletidas nos documentos centrais do projeto. * Problema 6: Consultores podem querer produtividade com IA, mas ter medo de alucinação, baixa confiabilidade ou perda de controle sobre o entregável. * Problema 7: A adoção de skills pode ser travada por fricção técnica, falta de clareza sobre instalação, ausência de onboarding e dificuldade de personalização. * Problema 8: O público pode não entender imediatamente o problema ou o valor da solução, exigindo educação de mercado e demonstrações concretas. * Problema 9: Construir plataforma, curso ou SaaS antes da validação pode gerar desperdício de esforço se a oferta, público e canal ainda não estiverem comprovados. </problemas_que_o_negocio_pretende_resolver> <solucao_em_desenvolvimento> <agente_ia> A solução em desenvolvimento é uma skill em Markdown para o X-Ray Business, projetada para funcionar como uma memória operacional persistente do projeto. Essa skill deve conter: * briefing do projeto; * contexto consolidado; * fase atual; * ciclo data-driven do negócio; * hipóteses de negócio; * decisões; * dúvidas; * riscos; * oportunidades; * guidelines de marca; * product self-knowledge; * internal knowledge; * fontes únicas de verdade; * regras de operação do agente; * estruturas de atualização; * comandos ou triggers de captura. A skill deve permitir que, durante conversas ou pesquisas inline, Leonardo possa acionar um comando como “captura”. Quando esse trigger for usado, o agente deverá identificar se a informação é uma decisão, hipótese, risco, insight, pendência, guideline ou atualização estrutural, e então atualizar os documentos internos correspondentes. Além disso, a solução em formação deverá operar com o ciclo: <workflow> 1. Scope — definir o escopo da análise ou validação. 2. Discovery — coletar dados de mercado, público e problema. 3. Diagnosis — interpretar dados e identificar padrões. 4. Strategy — escolher direção, público, oferta e posicionamento. 5. Design — desenhar solução, UX, MVP e entregáveis. 6. Validation — testar hipóteses com mercado. 7. Build — construir a versão mínima necessária. 8. Launch — colocar a oferta no mercado. 9. Measure — medir resultados e evidências. 10. Iterate — ajustar e repetir o ciclo. </workflow> O objetivo final é que, ao concluir as fases de escopo, discovery, diagnóstico e estratégia, o projeto tenha clareza suficiente para decidir qual frente deve virar MVP inicial. </agente_ia> </solucao_em_desenvolvimento> <componentes_do_produto_ou_servico> * Componente: Skill MD / Markdown do X-Ray Business função: organizar o conhecimento central do projeto em documentos persistentes e reutilizáveis. valor_entregue: reduz perda de contexto e cria fonte única de verdade. estágio: em formulação. * Componente: Ciclo data-driven X-Ray Business função: estruturar o desenvolvimento do negócio em fases claras, com perguntas, tags e critérios de decisão. valor_entregue: evita execução prematura e força validação progressiva baseada em dados. estágio: incorporado como estrutura principal. * Componente: Trigger “captura” função: acionar a internalização de decisões, insights e atualizações relevantes durante conversas ou pesquisas. valor_entregue: transforma informação emergente em conhecimento salvo e estruturado. estágio: conceito definido, implementação pendente. * Componente: Diretório interno da skill função: organizar arquivos por temas como briefing, scope, discovery, diagnosis, strategy, design, validation, decisões, brand guidelines, produto, operação e backlog. valor_entregue: permite navegação, manutenção e evolução do conhecimento do projeto. estágio: pendente de desenho. * Componente: Fonte única de verdade função: consolidar as informações finais e atualizadas do projeto. valor_entregue: evita contradições, duplicidade e desalinhamento entre agentes ou conversas. estágio: necessidade validada. * Componente: Matriz de validação função: transformar hipóteses em perguntas, métodos, métricas, evidências necessárias e critérios de decisão. valor_entregue: ajuda a decidir com dados qual público, oferta, canal e MVP priorizar. estágio: pendente de criação. * Componente: Portfólio demonstrativo função: demonstrar a arquitetura, funcionamento e potencial de uso da solução. valor_entregue: serve como demo, material comercial e possível referência operacional para consultores. estágio: ideia registrada. * Componente: Co-pilot para consultor função: apoiar análise, estruturação e produção de entregáveis. valor_entregue: aumenta produtividade sem substituir julgamento humano. estágio: posicionamento estratégico em formação. * Componente: Biblioteca inicial de skills função: oferecer exemplos, templates ou módulos reutilizáveis para consultores. valor_entregue: reduz fricção de adoção e tangibiliza a proposta. estágio: hipótese de componente de MVP. * Componente: Fluxo de instalação guiada função: reduzir barreiras técnicas para uso das skills. valor_entregue: aumenta probabilidade de adoção por consultores menos técnicos. estágio: pendente de desenho. * Componente: E-book interativo função: demonstrar capacidade de entrega e educação do usuário. valor_entregue: pode servir como ativo de marketing, onboarding ou prova de conceito. estágio: hipótese de entregável demonstrativo. * Componente: Project to Linear função: funcionar como case demonstrável ou fluxo específico da arquitetura. valor_entregue: mostra aplicação prática da metodologia e das skills em um workflow concreto. estágio: hipótese de case/MVP. </componentes_do_produto_ou_servico> <insights_estrategicos> * Insight 1: O projeto precisa seguir fases e ciclos mais bem definidos. A ausência de um ciclo claro pode dificultar priorização, coleta de informações e transformação das ideias em produto operacional. * Insight 2: A persistência do conhecimento é central. O valor do sistema não está apenas em responder bem, mas em manter o contexto vivo e atualizado ao longo do projeto. * Insight 3: A skill deve funcionar como camada de memória, governança e atualização documental do X-Ray Business. * Insight 4: O comando “captura” pode se tornar um mecanismo operacional simples e poderoso para transformar conversas em documentação estruturada. * Insight 5: O produto deve deixar claro que é um co-pilot, não um gerador autônomo infalível. Essa distinção é importante para mitigar risco de alucinação e preservar confiança. * Insight 6: O portfólio pode funcionar como demonstrativo da arquitetura da solução, não apenas como material visual ou comercial. * Insight 7: A lógica de product self-knowledge e internal knowledge pode ser aplicada ao próprio desenvolvimento do X-Ray Business, antes de ser oferecida como solução para terceiros. * Insight 8: O ciclo data-driven ajuda a impedir que o projeto pule diretamente para construção de plataforma, curso ou SaaS sem validação suficiente. * Insight 9: A fase mais importante agora não é Build, mas Scope → Discovery → Diagnosis → Strategy. * Insight 10: O próximo movimento estratégico deve ser transformar hipóteses em matriz de validação para decidir, com evidências, qual frente deve virar MVP inicial. * Insight 11: A plataforma pode ser uma visão de longo prazo, mas não precisa ser assumida como MVP inicial antes de validação. * Insight 12: A adoção por consultores depende tanto da proposta de valor quanto da redução de fricção técnica e da clareza sobre o papel da IA. * Insight 13: A solução precisa avaliar não apenas demanda, mas também entendimento do problema pelo público. Se o público não reconhece a dor, pode ser necessário educar antes de vender. * Insight 14: As fases de medição e iteração devem estar previstas desde o início para evitar decisões baseadas apenas em percepção ou intuição. </insights_estrategicos> <decisoes_ja_tomadas> * Decisão: Posicionar a solução como co-pilot para consultores. justificativa: reduzir risco de expectativa excessiva sobre automação e deixar claro que o sistema apoia, mas não substitui, julgamento humano. impacto: influencia comunicação, produto, entregáveis e limites de uso. * Decisão: Criar um portfólio demonstrativo da arquitetura do X-Ray Business. justificativa: mostrar o funcionamento da solução e permitir demonstração prática. impacto: pode servir como material comercial, técnico e operacional. * Decisão: Estruturar uma skill em Markdown para o projeto. justificativa: criar um formato persistente, editável e reutilizável de conhecimento. impacto: transforma a operação do projeto em um sistema documentado, não apenas em conversas soltas. * Decisão: Usar triggers explícitos, como “captura”, para registrar informações importantes. justificativa: permitir que decisões e insights sejam salvos no momento em que surgem. impacto: melhora a governança do conhecimento e reduz perda de informação. * Decisão: Tratar o momento atual como fase de discovery, com necessidade de reforçar scope e avançar depois para diagnosis e strategy. justificativa: Leonardo está colhendo informações, estruturando hipóteses e entendendo o escopo antes de avançar para construção. impacto: ajuda a organizar o ciclo de trabalho e evitar execução prematura. * Decisão: Adotar o ciclo data-driven do X-Ray Business como estrutura principal do projeto. justificativa: organizar o desenvolvimento em fases claras, com perguntas, métodos, tags e critérios de decisão. impacto: cria uma espinha dorsal para a skill, para o projeto Claude e para futuras análises. * Decisão: Tratar Scope → Discovery → Diagnosis → Strategy como prioridade operacional atual. justificativa: ainda há dúvidas sobre público, oferta, canal, modelo de negócio e MVP inicial. impacto: posterga construção pesada até que as hipóteses sejam organizadas e validadas. </decisoes_ja_tomadas> <duvidas_em_aberto> * Dúvida: Qual hipótese deve ser validada primeiro? contexto: existem hipóteses sobre SaaS Web, curso, plataforma, consultoria, Project to Linear e biblioteca de skills. impacto_na_decisao: define a primeira matriz de validação e o foco da próxima rodada de discovery. * Dúvida: Qual público inicial deve ser priorizado? contexto: as opções mais claras são consultor solo e pequena boutique de consultoria. impacto_na_decisao: afeta proposta de valor, preço, canal, linguagem, onboarding e formato de MVP. * Dúvida: Qual deve ser o MVP inicial? contexto: ainda não está definido se o primeiro MVP será curso, plataforma, consultoria, Project to Linear, portfólio demonstrativo ou SaaS Web de skills. impacto_na_decisao: define esforço de build, estratégia de validação e canal de lançamento. * Dúvida: O público entende a dor ou precisa ser educado? contexto: pode haver interesse em IA, mas baixa clareza sobre skills, instalação e aplicações práticas. impacto_na_decisao: influencia se a primeira oferta deve ser educacional, consultiva ou de produto. * Dúvida: Qual canal deve ser testado primeiro? contexto: LinkedIn, Instagram, YouTube, blogs, landing page, formulário, entrevistas e comunidades podem ser usados. impacto_na_decisao: define coleta de dados, aquisição de leads e validação de mensagem. * Dúvida: Como diferenciar informação bruta, hipótese, decisão e fonte única de verdade? contexto: o projeto precisa evitar misturar ideias exploratórias com decisões consolidadas. impacto_na_decisao: afeta confiabilidade do sistema e qualidade das análises futuras. * Dúvida: Qual deve ser a estrutura exata do diretório da skill MD? contexto: a intenção é espelhar uma lógica semelhante a diretórios de conhecimento interno e product self-knowledge. impacto_na_decisao: afeta manutenção, versionamento e facilidade de uso por agentes. * Dúvida: Onde a persistência será implementada de fato? contexto: a skill precisa salvar atualizações em documentos internos, mas o ambiente técnico ainda não foi definido. impacto_na_decisao: pode exigir Claude Project, arquivos Markdown locais, Drive, Git, Notion, Obsidian ou outro repositório. * Dúvida: O trigger “captura” deve salvar qualquer informação relevante ou apenas decisões formalizadas? contexto: durante conversas inline podem surgir insights, dúvidas, hipóteses e decisões. impacto_na_decisao: define regras de governança e evita poluição da fonte única de verdade. * Dúvida: Como o agente deve lidar com contradições entre versões anteriores e novas decisões? contexto: o projeto está em formação e ideias podem mudar. impacto_na_decisao: exige regras de versionamento, substituição ou marcação de tensão estratégica. </duvidas_em_aberto> <riscos_e_limitacoes> * Risco: A solução parecer autônoma demais. descrição: usuários podem interpretar que o sistema gera tudo sozinho, quando a intenção é funcionar como co-pilot. possível_mitigação: deixar explícito na proposta de valor, nos materiais e nos fluxos que o agente apoia o consultor e exige validação humana. * Risco: Alucinações de IA comprometerem entregáveis. descrição: agentes podem produzir inferências incorretas se não forem ancorados em fontes claras. possível_mitigação: usar fontes únicas de verdade, separar fatos de hipóteses e exigir validação de decisões. * Risco: Perda de contexto entre conversas. descrição: sem persistência documental, insights importantes podem ficar presos em chats isolados. possível_mitigação: implementar skill MD com arquivos internos atualizáveis e triggers de captura. * Risco: Acúmulo desorganizado de informações. descrição: capturar tudo sem taxonomia pode gerar excesso de conteúdo e baixa usabilidade. possível_mitigação: estruturar categorias claras: decisão, hipótese, dúvida, risco, oportunidade, guideline, backlog e fonte validada. * Risco: Confusão entre discovery, diagnosis, strategy, validation e build. descrição: sem fases explícitas, o projeto pode misturar exploração com execução. possível_mitigação: usar o ciclo data-driven como estrutura principal e definir critérios de entrada e saída por fase. * Risco: Construir plataforma, curso ou SaaS antes de validar demanda. descrição: pode haver desperdício de tempo se o público, oferta, canal e proposta de valor ainda não estiverem comprovados. possível_mitigação: criar matriz de validação, landing page, entrevistas, lista de espera, formulário e testes de interesse antes de build pesado. * Risco: Curva de aprendizado travar adoção. descrição: consultores podem se interessar por IA, mas desistir se instalação, uso ou personalização das skills forem difíceis. possível_mitigação: desenhar onboarding simples, fluxo de instalação guiada, templates e demonstrações claras. * Risco: O público não entender o problema. descrição: se consultores não reconhecerem a dor de gestão de conhecimento, skills ou IA operacional, a conversão pode ser baixa. possível_mitigação: testar mensagens educacionais, demonstrações e exemplos concretos de ganho. * Risco: A skill depender de capacidades técnicas não disponíveis no ambiente escolhido. descrição: nem todo ambiente permite atualização automática real de arquivos persistentes. possível_mitigação: definir arquitetura técnica antes de depender operacionalmente do mecanismo de salvamento. </riscos_e_limitacoes> <oportunidades> - Oportunidade: Criar uma metodologia própria de gestão de conhecimento para projetos com IA. por que importa: muitos projetos com IA sofrem com perda de contexto e baixa governança. como pode ser explorada: transformar a skill MD em parte central da oferta X-Ray Business. * Oportunidade: Usar o próprio X-Ray Business como caso demonstrativo. por que importa: o desenvolvimento do projeto pode servir como prova de conceito. como pode ser explorada: documentar o ciclo completo, desde scope até iterate, como portfólio vivo. * Oportunidade: Criar um sistema de captura inline para consultores. por que importa: consultores tomam decisões e percebem insights durante conversas, reuniões e análises. como pode ser explorada: oferecer comandos padronizados como “captura”, “decisão”, “risco”, “pendência” e “atualiza fonte”. * Oportunidade: Construir fontes únicas de verdade para negócios em desenvolvimento. por que importa: empresas e projetos frequentemente operam com conhecimento fragmentado. como pode ser explorada: vender como diagnóstico, organização estratégica ou camada de governança de IA. * Oportunidade: Combinar brand guidelines, conhecimento interno e product self-knowledge. por que importa: agentes ficam mais consistentes quando têm regras, contexto e limites claros. como pode ser explorada: transformar esses blocos em módulos reutilizáveis da skill. * Oportunidade: Validar o mercado com baixo custo antes de construir produto pesado. por que importa: landing page, entrevistas, formulários e lista de espera podem gerar evidência antes de build. como pode ser explorada: estruturar experimentos de validação por oferta, público e canal. * Oportunidade: Transformar Project to Linear em case demonstrável. por que importa: casos concretos facilitam entendimento e reduzem abstração da proposta. como pode ser explorada: usar como demo navegável, fluxo de implementação ou exemplo de aplicação da metodologia. * Oportunidade: Criar uma biblioteca inicial de skills para consultores. por que importa: templates reduzem fricção e aceleram percepção de valor. como pode ser explorada: iniciar com skills para diagnóstico, proposta comercial, pesquisa, análise de concorrentes, plano de ação e entregáveis. * Oportunidade: Educar consultores sobre uso prático de IA. por que importa: se a adoção for travada por baixa clareza técnica, educação pode ser parte da oferta. como pode ser explorada: curso mínimo, e-book interativo, onboarding guiado ou workshops. </oportunidades> <requisitos_para_o_agente_de_ia> <agente_ia> O futuro agente de IA do X-Ray Business deverá: 1. Ler e respeitar o contexto consolidado do projeto antes de executar análises. 2. Separar claramente fatos, hipóteses, decisões, dúvidas, riscos, oportunidades e pendências. 3. Não tratar hipóteses como fatos. 4. Não apagar informações anteriores sem correção explícita de Leonardo. 5. Quando houver contradição, registrar como tensão estratégica. 6. Operar como co-pilot, não como autoridade final. 7. Usar linguagem operacional, clara e pronta para documentação. 8. Atualizar documentos internos quando um trigger de captura for acionado. 9. Manter uma fonte única de verdade sempre que decisões forem consolidadas. 10. Diferenciar material bruto de material validado. 11. Apoiar o ciclo data-driven do projeto: scope, discovery, diagnosis, strategy, design, validation, build, launch, measure e iterate. 12. Preservar o raciocínio estratégico, não apenas gerar resumo. 13. Permitir copy/paste do contexto para outro agente sem necessidade de reorganização manual. 14. Funcionar como memória operacional estruturada do X-Ray Business. 15. Usar as tags de fase sempre que estiver classificando informações do projeto. 16. Ajudar a transformar hipóteses em matriz de validação. 17. Ajudar a escolher métodos de validação compatíveis com cada hipótese: entrevista, formulário, landing page, lista de espera, pré-venda, demo ou benchmark. 18. Registrar métricas, aprendizados e decisões recomendadas em cada experimento. 19. Evitar recomendar build pesado antes de haver evidência mínima de demanda, entendimento e intenção de pagamento. 20. Registrar explicitamente quando uma informação pertence a Scope, Discovery, Diagnosis, Strategy, Design, Validation, Build, Launch, Measure ou Iterate. </agente_ia> </requisitos_para_o_agente_de_ia> <backlog_de_analise> * Item: Criar matriz de validação das hipóteses atuais. prioridade: alta. motivo: necessário para decidir, com dados, qual frente deve virar MVP inicial. * Item: Definir ciclo oficial do projeto X-Ray Business dentro da skill MD. prioridade: alta. motivo: necessário para organizar scope, discovery, diagnosis, strategy, design, validation, build, launch, measure e iterate. * Item: Preencher a fase Scope. prioridade: alta. motivo: é necessário definir problema, hipótese, público, decisão a desbloquear e fora de escopo. * Item: Definir público prioritário para discovery. prioridade: alta. motivo: consultor solo e boutique de consultoria podem exigir ofertas, preços e canais diferentes. * Item: Definir quais hipóteses serão testadas primeiro. prioridade: alta. motivo: há múltiplas possibilidades de MVP, incluindo SaaS Web, curso, plataforma, consultoria e Project to Linear. * Item: Desenhar estrutura de diretórios da skill MD. prioridade: alta. motivo: necessário para implementar persistência e fonte única de verdade. * Item: Definir comandos/triggers operacionais. prioridade: alta. motivo: o comando “captura” precisa ter regras claras de uso, classificação e atualização. * Item: Separar documentos de conhecimento bruto, hipóteses e decisões validadas. prioridade: alta. motivo: evita confusão entre exploração e verdade operacional. * Item: Criar modelo de arquivo para briefing do projeto. prioridade: média. motivo: será o ponto de entrada da skill. * Item: Criar modelo de arquivo para decisões. prioridade: alta. motivo: decisões precisam ser versionadas e rastreáveis. * Item: Criar modelo de arquivo para brand guidelines. prioridade: média. motivo: necessário para consistência de linguagem, posicionamento e apresentação. * Item: Criar modelo de arquivo para product self-knowledge. prioridade: alta. motivo: necessário para que o agente entenda produto, escopo, limites e proposta de valor. * Item: Criar arquivos específicos por fase do ciclo. prioridade: alta. motivo: cada fase precisa ter perguntas, dados, tags e entregáveis próprios. * Item: Definir arquitetura de persistência. prioridade: alta. motivo: sem isso, a skill pode funcionar apenas como instrução estática, não como memória viva. * Item: Transformar o portfólio demonstrativo em caso de uso. prioridade: média. motivo: pode validar a arquitetura e apoiar venda futura. * Item: Definir métricas primárias de validação. prioridade: alta. motivo: sem métricas, a validação pode virar percepção subjetiva. * Item: Mapear concorrentes e alternativas. prioridade: média. motivo: necessário para entender diferenciação, posicionamento e objeções. * Item: Definir experimentos de baixo custo. prioridade: alta. motivo: landing page, formulário, entrevistas e lista de espera podem validar demanda antes de construção. </backlog_de_analise> <novas_informacoes_incorporadas_nesta_rodada> * Foi incorporado um ciclo de negócio data-driven específico para o X-Ray Business. * O ciclo possui 10 fases: Scope, Discovery, Diagnosis, Strategy, Design, Validation, Build, Launch, Measure e Iterate. * A fase atual prioritária foi refinada para Scope → Discovery → Diagnosis → Strategy. * Foi registrado que o projeto não deve avançar para construção pesada de plataforma, curso ou SaaS antes de transformar hipóteses em matriz de validação. * Foram incorporadas perguntas centrais para cada fase do ciclo. * Foram incorporadas tags sugeridas para cada fase, incluindo <fase_scope>, <fase_discovery>, <fase_diagnosis>, <fase_strategy>, <fase_design>, <fase_validation>, <fase_build>, <fase_launch>, <fase_measure> e <fase_iterate>. * Foram adicionadas hipóteses sobre validação de SaaS Web de skills, curso, plataforma, consultoria e Project to Linear. * Foram adicionadas hipóteses sobre público inicial: consultor solo ou pequena boutique de consultoria. * Foi incorporada a possibilidade de usar entrevistas, formulários, análise de concorrentes, análise de conteúdo, benchmark, landing page, lista de espera, pré-venda e demo navegável como métodos de discovery e validação. * Foi incorporado o insight de que consultores podem desejar produtividade, mas ter medo de alucinação. * Foi incorporado o insight de que pode haver interesse em IA, mas baixa clareza sobre instalação de skills. * Foi incorporado o risco de que a curva de aprendizado trave a adoção. * Foi incorporada a ideia de tratar SaaS Web como visão possível, mas não necessariamente como MVP inicial. * Foi incorporada a necessidade de medir visitas, conversão, leads, respostas, custo por lead, abertura de e-mail, cliques, intenção de pagamento, objeções, tempo de configuração, satisfação, uso recorrente e conclusão do curso. * Foi incorporada a ideia de que a próxima decisão deve ser orientada por dados e experimentos, não apenas por intuição. </novas_informacoes_incorporadas_nesta_rodada> <pendencias_para_proxima_rodada> * Transformar as hipóteses atuais em uma matriz de validação. * Definir qual hipótese será testada primeiro. * Definir se o primeiro público de teste será consultor solo, pequena boutique de consultoria ou outro segmento. * Definir qual decisão específica a próxima análise precisa desbloquear. * Definir o que está fora de escopo nesta etapa inicial. * Definir quais dados precisam ser coletados na fase Discovery. * Definir métodos de coleta: entrevistas, formulário, benchmark, análise de conteúdo, análise de concorrentes ou landing page. * Criar o primeiro template <fase_scope>. * Criar o primeiro template <fase_discovery>. * Criar o primeiro template <fase_diagnosis>. * Criar o primeiro template <fase_strategy>. * Definir os critérios que indicariam que SaaS Web, curso, plataforma, consultoria ou Project to Linear deve ser o MVP inicial. * Definir métricas mínimas para validação: intenção de pagamento, leads, respostas, conversão, interesse por oferta ou objeções. * Definir como os resultados de validação serão registrados na skill MD. * Definir a estrutura de diretórios do projeto Claude. * Definir onde os documentos persistentes serão mantidos. * Definir como o comando “captura” atualiza cada fase do ciclo. * Definir quando uma hipótese passa de inconclusiva para suportada, não suportada ou descartada. * Definir como as fases Measure e Iterate serão usadas após os primeiros testes. </pendencias_para_proxima_rodada>","stderr":""}
Now I have full context on X-Ray Raptor. Let me synthesize what I've read:

- The TAGS file is a rich, well-structured consolidated context — essentially the knowledge base
- The MAIN file is raw, unnormalized conversation history with architectural reflections
- The actual SKILL.md doesn't exist yet in a clean, deployable form
- The architecture was criticized for being 38 files with no router — needs to be leaner

I'll now draft a clean, production-grade X-Ray Raptor skill with a lean 3-file reference structure (vs the 38-file problem). Let me build it.
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /tmp/x-ray-raptor/SKILL.md
File created successfully: /tmp/x-ray-raptor/references/capture-protocol.md
File created successfully: /tmp/x-ray-raptor/references/cycle-phases.md
File created successfully: /tmp/x-ray-raptor/references/agent-requirements.md
Now let me package and verify the structure:
{"returncode":0,"stdout":"/tmp/x-ray-raptor/SKILL.md\n/tmp/x-ray-raptor/references/agent-requirements.md\n/tmp/x-ray-raptor/references/capture-protocol.md\n/tmp/x-ray-raptor/references/cycle-phases.md\n---\n  182 /tmp/x-ray-raptor/SKILL.md\n   49 /tmp/x-ray-raptor/references/agent-requirements.md\n  104 /tmp/x-ray-raptor/references/capture-protocol.md\n  196 /tmp/x-ray-raptor/references/cycle-phases.md\n  531 total\n","stderr":""}
{"returncode":0,"stdout":"  adding: x-ray-raptor/ (stored 0%)\n  adding: x-ray-raptor/references/ (stored 0%)\n  adding: x-ray-raptor/references/agent-requirements.md (deflated 49%)\n  adding: x-ray-raptor/references/capture-protocol.md (deflated 53%)\n  adding: x-ray-raptor/references/cycle-phases.md (deflated 61%)\n  adding: x-ray-raptor/SKILL.md (deflated 55%)\nDone\n","stderr":""}
Here's what was built and why each decision was made:

---

**What changed (and why)**

The main architectural problem your notes flagged was exactly right: 38 files with no router = a beautiful structure no fresh agent can navigate. The refined skill solves this with 4 files total:

```
x-ray-raptor/
├── SKILL.md                          ← router + core protocol (182 lines)
└── references/
    ├── capture-protocol.md           ← extended capture rules, edge cases, versioning
    ├── cycle-phases.md               ← per-phase questions, methods, deliverables, metrics
    └── agent-requirements.md         ← full 20-point behavioral spec
```

**SKILL.md** is the only thing always loaded. The three reference files load on-demand — Claude only reads what the specific task needs, preventing context bloat.

**Key improvements over the raw drafts:**

- **Description is "pushy"** — triggers on capture commands, engagement starts, X-Ray mentions, and strategic contexts, even without explicit invocation
- **Capture protocol** is now a clean 3-step flow (identify → classify → output structured block) with the exact `🔴 CAPTURE` format ready to paste anywhere
- **Validation gate** enforces that Build/Launch can't be recommended before at least one hypothesis has documented evidence — this was implicit before, now it's a rule
- **Tension management** is explicit: contradictions never silently resolve, they become named TENSIONS with a required log entry
- **Skill integration map** cleanly routes to `x-ray-abs`, `x-ray-db`, `doc-coauthoring`, `web-artifacts-builder`, `internal-comms`, `brand-guidelines`, `projects-to-linear`

**What I'd like your feedback on:**

1. The capture triggers — are there aliases or commands you use that aren't listed?
2. The skill integration map — are `x-ray-abs` and `x-ray-db` skills that already exist separately, or do they need to be built into Raptor?
3. The description (frontmatter) — does the triggering context feel right, or are there specific consultant workflows it should also catch?

---

**Você** _2026-05-15_

/skill creator Now update using that logical for raptor v2 business packge delivery the final directory

---

**Claude** _2026-05-15_

Let me examine the uploaded skills to understand the full architecture:
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"/tmp/executive-planning-orchestrator/references/output-templates.md\n/tmp/executive-planning-orchestrator/references/interdependency-map.md\n/tmp/executive-planning-orchestrator/SKILL.md\n/tmp/executive-artifact-system/SKILL.md\n","stderr":""}
     1	---
     2	name: executive-planning-orchestrator
     3	description: >
     4	  Motor de planejamento executivo com 19 RIDs orquestrados: transforma
     5	  contexto bruto em planos auditáveis com capacity planning e sprint planning.
     6	  Frameworks: Cynefin, MECE, SCQA, First Principles, JTBD, PESTEL, Porter,
     7	  SWOT, 7S, TOC, GUT/Pareto, 5W2H, PDCA/OODA, OKR/BSC. Modos A-D.
     8	  ATIVE SEMPRE para: priorização, backlog cleanup, plano mensal/semanal/diário,
     9	  sprint planning, capacity planning, roadmap, triage, OKR design, análise
    10	  estratégica, diagnóstico de problema, governança de execução, risk assessment.
    11	  ATIVE com: "prioriza isso", "monta um plano", "o que fazer primeiro",
    12	  "estou perdido nas frentes", "organiza meu mês", "me dá foco", "corta
    13	  excesso", "transforma esse contexto em plano", "EPO", "orchestrator",
    14	  "full analysis", "usa o orquestrador", "analisa esse problema",
    15	  "quero um plano executivo", "quais projetos mato".
    16	  NÃO ative para: tradução, escrita criativa, código puro, perguntas
    17	  informativas, prompt engineering (use live-prompt-pro-converter).
    18	metadata:
    19	  version: "2.0.0"
    20	  supersedes: "1.0.0"
    21	  author: "PIPILONES Skill Architecture — Leonardo"
    22	  last_updated: "2026-04-03"
    23	  registers: "personal/PIPILONES, professional/AI-Governance"
    24	---
    25	
    26	# Executive Planning Orchestrator v2.0.0
    27	## Multi-Framework Strategy Synthesis Engine
    28	
    29	Orquestra 19 RIDs em sequência canônica com feedback loops explícitos,
    30	roteamento por modo, capacity planning, sprint planning e early-exit logic.
    31	Supersede v1.0.0. Mantém contrato de interface Mode A–D.
    32	
    33	---
    34	
    35	## MODE ROUTER — RID-000
    36	
    37	Avaliar TODOS os sinais; selecionar modo de maior correspondência.
    38	
    39	| Sinal | Mode A — Express | Mode B — Standard | Mode C — Deep | Mode D — Full Audit |
    40	|---|---|---|---|---|
    41	| **Escopo** | 1 decisão / 1 workstream | 2–3 workstreams | Multi-workstream | Org-level / portfolio |
    42	| **Urgência** | Alta — mesmo dia | Média — dias | Baixa-média — semanas | Baixa — ciclo de planejamento |
    43	| **Stakeholders** | 1 (self) | 2–5 | 6–20 | 20+ / externos |
    44	| **Ambiguidade** | Baixa — problema claro | Média | Alta | Muito alta / inédito |
    45	| **Cynefin** | Óbvio / Complicado | Complicado | Complexo | Complexo / Caótico |
    46	| **RIDs ativos** | 000,050,100,101,102,301,310,411,999 | até RID-403 | até RID-502 | todos os 19 RIDs |
    47	| **Loops ativos** | Nenhum (passe único) | Top 3 loops | Todos os loops | Mapa completo |
    48	| **Ref files** | Nenhum | output-templates.md | + frameworks-core.md | Todos |
    49	
    50	**Regra de desempate:** empate → modo mais completo.
    51	**Override:** Cynefin = Caótico → Mode A com OODA-only (RID-403).
    52	
    53	---
    54	
    55	## SEQUÊNCIA CANÔNICA v2.0.0
    56	
    57	### FASE 0 — Classificação
    58	
    59	**RID-000 · Mode Router**
    60	Seleciona modo antes de qualquer análise. Nunca pulado.
    61	
    62	**RID-050 · Cynefin Domain Classification**
    63	Fonte: Snowden & Boone, HBR 2007.
    64	Output: [Óbvio / Complicado / Complexo / Caótico / Desordem]
    65	→ IF Caótico: pular RID-101,102,202,201 → direto RID-403 (OODA)
    66	→ IF Desordem: decompor em sub-problemas; classificar cada um
    67	
    68	---
    69	
    70	### FASE 1 — Framing do Problema
    71	
    72	**RID-100 · Input Normalization**
    73	Output: Cartão de problema [Ator | Situação | Restrição | Resultado Desejado | Horizonte]
    74	Nunca pulado.
    75	
    76	**RID-101 · MECE Decomposition**
    77	Fonte: Minto, "The Pyramid Principle" 1987 [PRACTITIONER]
    78	Output: Árvore MECE de componentes do problema
    79	Skip: Cynefin = Caótico
    80	
    81	**RID-102 · SCQA / Minto Pyramid**
    82	Fonte: Minto 1987 [PRACTITIONER]
    83	Output: Situação / Complicação / Questão / Resposta
    84	→ Loop: IF JTBD (RID-104) redefine o job → reescrever Complicação + Questão
    85	
    86	**RID-103 · First Principles Decomposition**
    87	Fonte: Aristóteles, Posterior Analytics; Descartes, Discourse on Method 1637
    88	REPOSICIONADO de RID-901 (v1) → RID-103 (v2): premissas devem ser desafiadas
    89	ANTES da análise estratégica.
    90	Output: Mapa de premissas + base validada por primeiros princípios
    91	→ Loop: IF premissa-raiz invalidada → REESCREVER RID-202 (PESTEL) + RID-201 (SWOT)
    92	
    93	**RID-104 · Jobs-to-be-Done (JTBD)**
    94	Fonte: Christensen, Hall, Dillon & Duncan, HBR 2016 (peer-reviewed)
    95	Output: [Ator | Situação | Job | Métrica de Sucesso | Modo de Falha]
    96	Ativação: stakeholders ≥ 2 OU Mode C/D
    97	→ Loop: IF JTBD redefine job → REESCREVER RID-102 (SCQA)
    98	Skip: Mode A; problema com stakeholder único
    99	
   100	---
   101	
   102	### FASE 2 — Análise Estratégica
   103	
   104	**RID-202 · PESTEL Analysis**
   105	Fonte: Aguilar, "Scanning the Business Environment" 1967 (academic)
   106	Output: [Fator | Tendência | Impacto | Horizonte | Certeza]
   107	Ativação: Mode B/C/D
   108	
   109	**RID-203 · Porter Five Forces**
   110	Fonte: Porter, HBR 1979; HBR 2008 (peer-reviewed)
   111	Output: [Força | Intensidade | Drivers | Implicação Estratégica]
   112	Ativação: Mode C/D OU framing competitivo detectado
   113	→ Loop: IF intensidade de força muda → ATUALIZAR quadrantes externos do RID-201
   114	Skip: Mode A/B; problemas internos
   115	
   116	**RID-201 · SWOT Analysis**
   117	Fonte: Learned, Christensen, Andrews & Guth, HBS 1965 (academic canonical)
   118	Output: Matriz SWOT + análise cruzada [SO / ST / WO / WT]
   119	→ Loop: IF nova ameaça/oportunidade → REVISAR RID-501 (OKRs)
   120	
   121	**RID-204 · McKinsey 7S Alignment Diagnostic**
   122	Fonte: Waterman, Peters & Phillips, Business Horizons 1980 (peer-reviewed)
   123	Output: [Elemento | Estado Atual | Estado Alvo | Gap | Prioridade]
   124	Ativação: Mode C/D; OU "organização", "alinhamento", "estrutura" no input
   125	Skip: Mode A/B; problemas individuais/pessoais
   126	
   127	---
   128	
   129	### FASE 3 — Priorização
   130	
   131	**RID-252 · Theory of Constraints (TOC)**
   132	Fonte: Goldratt, "The Goal" 1984 [PRACTITIONER]
   133	⚠ Incerteza declarada: base de evidência apenas practitioner-canonical.
   134	Output: [Restrição Vinculante | Localização | Tipo | Impacto no Throughput]
   135	Ativação: Mode B/C/D
   136	→ Loop: IF restrição identificada → RE-RANKEAR RID-301 (deprioritizar não-restrições)
   137	→ Loop: IF restrição identificada → ESTREITAR escopo do RID-401 (5W2H)
   138	
   139	**RID-301 · GUT Matrix + Pareto Filter**
   140	Fonte: Kepner & Tregoe 1965 [PRACTITIONER]; Juran 1951 [PRACTITIONER]
   141	Output: [Problema | G | U | T | Score GUT | Banda Pareto]
   142	
   143	**EARLY-EXIT TRIGGER:**
   144	IF todos GUT scores < 10 AND SWOT sem estratégias SO/ST
   145	THEN → saltar para RID-999 diretamente. Pular RID-310 a RID-502.
   146	
   147	**RID-310 · Capacity Planning** ← NOVO em v2.0.0
   148	Fonte: Goldratt, "Critical Chain" 1997 [PRACTITIONER]; PMBOK Guide 6ª ed. (PMI, 2017)
   149	Propósito: Mapear capacidade real disponível antes de comprometer ações.
   150	Output: Tabela de capacidade [Workstream | Horas/Semana Brutas | Buffer % |
   151	Horas Líquidas | Carga Planejada | Saldo | Status]
   152	Cálculo padrão: Horas Líquidas = Horas Brutas × (1 - Buffer%)
   153	Buffer mínimo recomendado: 20%
   154	Status: ✓ Viável / ⚠ Risco de sobrecarga / ✗ Inviável — cortar escopo
   155	→ Loop: IF carga > horas líquidas → CORTAR itens de menor GUT score em RID-301
   156	→ Loop: IF buffer < 20% → sinalizar risco antes de avançar para RID-401
   157	Ativação: Mode A/B/C/D — sempre ativo após RID-301 (exceto early-exit)
   158	
   159	---
   160	
   161	### FASE 4 — Plano de Ação
   162	
   163	**RID-401 · 5W2H Action Specification**
   164	Fonte: Ohno, Toyota Production System 1988 [PRACTITIONER]
   165	Output: [O quê | Por quê | Quem | Quando | Onde | Como | Quanto]
   166	Input: Prioridades rankeadas pelo GUT (pós-filtro TOC + validação capacity)
   167	
   168	**RID-411 · Sprint & Horizon Planning** ← NOVO em v2.0.0
   169	Fonte: Schwaber & Sutherland, "The Scrum Guide" 2020 (practitioner-canonical);
   170	horizonte temporal: adaptado de Covey "First Things First" 1994 [PRACTITIONER]
   171	Propósito: Distribuir ações do 5W2H em horizontes temporais executáveis.
   172	Output estruturado por três camadas:
   173	
   174	  HORIZONTE DIÁRIO (próximas 24–48h):
   175	  [Ação | Bloco de Tempo | Duração | Resultado Esperado | Pré-requisito]
   176	
   177	  HORIZONTE SEMANAL (sprint 5–7 dias):
   178	  [Sprint # | Objetivo do Sprint | Ações | Responsável | Critério de Done]
   179	
   180	  HORIZONTE MENSAL (ciclo 30 dias):
   181	  [Mês | Meta | Milestones | Capacidade Alocada | Gate de Revisão]
   182	
   183	Regras de distribuição:
   184	- Máximo 3 prioridades de trabalho por semana
   185	- Máximo 1 prioridade crítica por dia
   186	- Buffer de 20% da semana reservado (não alocável)
   187	- Ações sem dono explícito → bloquear alocação até definir responsável
   188	→ Loop: IF capacidade semanal (RID-310) < carga do sprint → RENEGOCIAR escopo
   189	Ativação: Mode A/B/C/D — sempre ativo após RID-401 (exceto early-exit)
   190	
   191	**RID-402 · PDCA Execution Cycle**
   192	Fonte: Deming, "Out of the Crisis" 1986 (academic-canonical)
   193	USE PDCA: ambiente estável, melhoria iterativa, ciclos ≥ 1 semana
   194	→ Loop: IF Key Result de OKR muda (RID-501) → RE-ANCORAR fase Plan do PDCA
   195	
   196	**RID-403 · OODA Loop**
   197	Fonte: Boyd, "Destruction and Creation" 1976 [PRACTITIONER]
   198	⚠ Incerteza declarada: base de evidência practitioner-canonical apenas.
   199	USE OODA: contexto volátil/crise; velocidade de adaptação > rigor de análise
   200	
   201	**Gate PDCA vs OODA:**
   202	| Sinal | PDCA (RID-402) | OODA (RID-403) |
   203	|---|---|---|
   204	| Estabilidade | Estável, previsível | Volátil, em mudança |
   205	| Ciclo | Semanas–meses | Horas–dias |
   206	| Objetivo | Melhorar qualidade | Aumentar adaptabilidade |
   207	| Cynefin | Óbvio / Complicado | Complexo / Caótico |
   208	
   209	---
   210	
   211	### FASE 5 — Alinhamento Estratégico
   212	
   213	**RID-501 · OKR (Objectives & Key Results)**
   214	Fonte: Grove, "High Output Management" 1983 [PRACTITIONER]; Doerr 2018 [PRACTITIONER]
   215	USE OKR: alinhamento de equipe a resultados mensuráveis, cadência trimestral
   216	→ Loop: IF ameaça/oportunidade do SWOT muda → REVISAR objetivos
   217	Ativação: Mode B/C/D
   218	
   219	**RID-502 · Balanced Scorecard (BSC)**
   220	Fonte: Kaplan & Norton, HBR 1992 (peer-reviewed)
   221	USE BSC: balancear performance organizacional em 4 perspectivas
   222	(Financeiro / Cliente / Processo Interno / Aprendizado)
   223	Ativação: Mode D; planejamento org-level
   224	
   225	**Gate OKR vs BSC:**
   226	| Sinal | OKR (RID-501) | BSC (RID-502) |
   227	|---|---|---|
   228	| Escopo | Equipe / produto | Organização / portfólio |
   229	| Perspectivas | Única: resultados | Quatro: financeiro+cliente+processo+aprendizado |
   230	| Unidade | Contribuidor individual | Unidade de negócio / executivo |
   231	
   232	---
   233	
   234	### FASE 6 — Síntese
   235	
   236	**RID-999 · Consolidation Output**
   237	Sintetiza todos os outputs ativos no entregável do modo selecionado.
   238	Ver output-templates.md para schemas completos por modo.
   239	
   240	| Modo | Entregável |
   241	|---|---|
   242	| A | Resumo executivo 1 página + 3 ações prioritárias + tabela de capacidade |
   243	| B | Brief estratégico + 5W2H + sprint semanal + OKR draft |
   244	| C | Relatório completo + mapa de feedback loops + plano de 30 dias |
   245	| D | Pacote de auditoria completo + todos os reference files |
   246	
   247	---
   248	
   249	## FEEDBACK LOOPS — TOP 5 (mapa completo: references/interdependency-map.md)
   250	
   251	| Loop | Source RID | Output Gatilho | Target RID | Tipo de Revisão |
   252	|---|---|---|---|---|
   253	| L1 | RID-050 Cynefin | Domínio = Caótico | RID-101 MECE | Skip total → rota para OODA |
   254	| L2 | RID-103 First Principles | Premissa-raiz invalidada | RID-202 + RID-201 | Reescrita completa PESTEL + SWOT |
   255	| L3 | RID-252 TOC | Restrição vinculante identificada | RID-301 GUT | Re-rank: desprioritizar não-restrições |
   256	| L4 | RID-310 Capacity | Carga > capacidade líquida | RID-301 GUT | Cortar itens de menor score |
   257	| L5 | RID-411 Sprint Planning | Carga sprint > capacidade semanal | RID-411 | Renegociar escopo do sprint |
   258	
   259	---
   260	
   261	## ÍNDICE DE REFERENCE FILES
   262	
   263	| Arquivo | Propósito | Trigger de Leitura | Modo |
   264	|---|---|---|---|
   265	| references/frameworks-core.md | 19 RIDs: critérios de seleção, dependências, schemas | Execução profunda de qualquer RID | B/C/D |
   266	| references/frameworks-extended.md | 5 RIDs novos: justificativa de pesquisa + condições | Auditoria de escolhas de framework | C/D |
   267	| references/interdependency-map.md | 9 loops completos + lógica de cascata | Mode D; resolução de feedback loops | D |
   268	| references/output-templates.md | Tabelas padrão por modo + schemas RID | Qualquer modo, qualquer output | A/B/C/D |
   269	| references/decision-log.md | Decisões Q1–Q4 + changelog v2 | Auditoria de versão | On demand |
   270	
   271	---
   272	
   273	## DELTA v1.0.0 → v2.0.0
   274	
   275	| Mudança | v1 | v2 | Rationale |
   276	|---|---|---|---|
   277	| First Principles | RID-901 (pós-OKR) | RID-103 (pós-SCQA) | Desafiar framing antes da análise |
   278	| PDCA/OODA | RID único sem critério | RID-402/403 com gate explícito | Evitar método errado em contexto volátil |
   279	| OKR/BSC | RID único sem critério | RID-501/502 com gate explícito | Evitar ferramenta org em contexto de equipe |
   280	| Router RID-000 | Sem critérios | Tabela if/then com 5 sinais | Seleção determinística de modo |
   281	| Early-exit | Ausente | Após RID-301 para escopo trivial | Evitar over-engineering |
   282	| Capacity Planning | Ausente (promessa não cumprida) | RID-310 com cálculo de carga real | Cumprir promessa da descrição |
   283	| Sprint Planning | Ausente (promessa não cumprida) | RID-411 com 3 horizontes temporais | Cumprir promessa da descrição |
   284	| Cynefin | Ausente | RID-050 | Classificação de domínio antes do método |
   285	| Porter 5 Forces | Ausente | RID-203 | Camada competitiva além do PESTEL |
   286	| TOC | Ausente | RID-252 | Restrição antes da priorização |
   287	| JTBD | Ausente | RID-104 | Reframe do stakeholder antes da análise |
   288	| McKinsey 7S | Ausente | RID-204 (Mode C/D) | Diagnóstico de alinhamento org |
   289	| Eisenhower | Candidato | EXCLUÍDO | Gap coberto pelo GUT/Pareto |
   290	| Wardley Maps | Candidato | EXCLUÍDO | Gate de evidência não atingido |
   291	
   292	---
   293	*executive-planning-orchestrator v2.0.0 — PIPILONES Skill Architecture*
   294	*Contrato de interface: Mode A–D estável.*
   295	*Trigger de próxima revisão: 5 casos de uso logados OU upgrade de evidência para peer-reviewed.*
   296	
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
     1	{# diagnostico_executivo.md.j2 — Diagnóstico para o cliente
     2	   Variáveis:
     3	   - case_id, consultant_name, date, version
     4	   - company_name, segment
     5	   - module_used: string
     6	   - root_problem: string
     7	   - top_causes: list[{cause, summary}] (máximo 5)
     8	   - top_hypotheses: list[{claim, status}] (máximo 3, sem labels internos)
     9	   - methodology_note: string
    10	   - branding: {primary_color}
    11	#}
    12	---
    13	case_id: {{ case_id | default('CASE-XXX') }}
    14	artifact: diagnostico_executivo
    15	trilha: cliente
    16	version: {{ version | default('1.0') }}
    17	---
    18	
    19	# Diagnóstico Executivo — {{ company_name | default('Cliente') }}
    20	
    21	**Preparado por**: {{ consultant_name | default('Consultor') }}
    22	**Data**: {{ date | default('2026-01-01') }}
    23	**Metodologia**: {{ module_used | default('Análise de causa raiz') }}
    24	
    25	---
    26	
    27	## Problema central diagnosticado
    28	
    29	> **{{ root_problem | default('Problema central a ser definido.') }}**
    30	
    31	---
    32	
    33	## Principais causas identificadas
    34	
    35	{% if top_causes is defined and top_causes %}
    36	{% for cause in top_causes %}
    37	### {{ loop.index }}. {{ cause.cause | default('Causa ' ~ loop.index) }}
    38	
    39	{{ cause.summary | default('Descrição a ser preenchida.') }}
    40	
    41	{% endfor %}
    42	{% else %}
    43	*Causas a serem identificadas durante o diagnóstico.*
    44	{% endif %}
    45	
    46	---
    47	
    48	## Achados e hipóteses de trabalho
    49	
    50	{% if top_hypotheses is defined and top_hypotheses %}
    51	{% for h in top_hypotheses %}
    52	- **{{ h.claim | default('Achado ' ~ loop.index) }}** — Status: {{ h.status | default('em investigação') }}
    53	{% endfor %}
    54	{% else %}
    55	*Achados a serem documentados após análise.*
    56	{% endif %}
    57	
    58	---
    59	
    60	## Sobre a metodologia aplicada
    61	
    62	{{ methodology_note | default('Utilizamos análise estruturada de causa raiz para mapear os problemas e suas origens.') }}
    63	
    64	---
    65	
    66	*{{ consultant_name | default('Consultor') }} — Bússola PME*
    67	*Versão {{ version | default('1.0') }} — {{ date | default('2026-01-01') }}*
    68	
    69	> ⚠️ Este documento requer aprovação do consultor (Gate G5) antes da entrega ao cliente.
    70	
Now I see the full architecture. Let me build **X-Ray Raptor v2 — Business Package Delivery System** that orchestrates:

1. **Executive Planning Orchestrator** (19-RID strategic engine)
2. **Executive Artifact System** (multi-format deliverables)
3. **Artifact dependency graph** with gates (G1-G6)
4. **Consulting engagement lifecycle** (Scope → Iterate)
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /tmp/x-ray-raptor-v2/SKILL.md

---

**Você** _2026-05-20_

continue trabalhanod entregue a skill md full directory packge mais explicao de comom usar trgger etc

---

**Claude** _2026-05-20_

Vou completar o pacote completo do X-Ray Raptor v2 com todos os arquivos de referência e um guia detalhado de uso. Deixa eu construir cada componente e depois explicar como tudo se conecta.

---

**Você** _2026-05-20_

/skill-creator  contune o trabalho [ diagnostico_executivo.md.j2
J2
executive-planning-orchestrator.skill.zip
ZIP
executive-artifact-system.skill.zip
ZIP
interdependency-map.md
77 linhas
MD
dependency_mapper.py
96 linhas
PY
dependency_graph.yaml
139 linhas
YAML
/skill creator Now update using that logical for raptor v2 business packge delivery the final directory
14 de mai.
Analyzed sophisticated planning system to integrate into Raptor v2 delivery framework
Analyzed sophisticated planning system to integrate into Raptor v2 delivery framework
Let me examine the uploaded skills to understand the full architecture:
Architected X-Ray Raptor v2 as master orchestrator integrating planning and deliverables
Architected X-Ray Raptor v2 as master orchestrator integrating planning and deliverables
Now I see the full architecture. Let me build X-Ray Raptor v2 — Business Package Delivery System that orchestrates:

1. Executive Planning Orchestrator (19-RID strategic engine)
2. Executive Artifact System (multi-format deliverables)
3. Artifact dependency graph with gates (G1-G6)
4. Consulting engagement lifecycle (Scope → Iterate)
Orchestrated comprehensive skill documentation for business delivery
Orchestrated comprehensive skill documentation for business delivery
continue trabalhanod entregue a skill md full directory packge mais explicao de comom usar trgger etc
08:53
Orchestrated comprehensive skill package assembly with usage documentation
Orchestrated comprehensive skill package assembly with usage documentation
The user wants me to continue working and deliver the full SKILL.md directory package with explanation of how to use, triggers, etc. They're using Portuguese ("entregue a skill md full directory packge mais explicao de comom usar trgger etc").
Let me finish building all the reference files and then create a comprehensive usage guide.
I need to create:

1. artifact-dependency-graph.md
2. deliverable-templates.md
3. skill-integration-map.md
4. Update capture-protocol.md, cycle-phases.md, agent-requirements.md from v1 if needed
5. A comprehensive USAGE_GUIDE.md explaining how to use the skill
6. Package everything
Let me continue building.
Mostrar menos
Concluído
Vou completar o pacote completo do X-Ray Raptor v2 com todos os arquivos de referência e um guia detalhado de uso. Deixa eu construir cada componente e depois explicar como tudo se conecta.
Artifact dependency graph reference
Artifact dependency graph reference

A resposta do Claude foi interrompida.

---

**Claude** _2026-05-20_

Vou continuar completando todos os arquivos de referência e o guia de uso. Deixa eu terminar o arquivo de dependências que foi cortado:
File not found: /tmp/x-ray-raptor-v2/references/artifact-dependency-graph.md
{"returncode":0,"stdout":"total 8\ndrwxr-xr-x 2 root root 4096 May 15 00:25 .\ndrwxr-xr-x 3 root root 4096 May 15 00:27 ..\n","stderr":""}
{"returncode":0,"stdout":"# Artifact Dependency Graph — Reference\n\nComplete dependency map for Bússola PME / X-Ray Business artifacts with gate enforcement logic.\n\n---\n\n## Quick Reference — Critical Gates\n\n| Gate | NEVER Skip | Blocks | Reason |\n|------|-----------|--------|--------|\n| **G2** | ✓ | priority_score | Human must validate problem tree before prioritization |\n| **G5** | ✓ | diagnostico_executivo, apresentacao_executiva, proposta_continuidade | High-stakes client deliverables require human review |\n\n---\n\n## Feedback Loops — Top 9\n\n| ID | Source | Trigger | Target | Action | Risk |\n|----|--------|---------|--------|--------|------|\n| L1 | Cynefin | Caótico | Skip MECE/PESTEL/SWOT | Route to OODA | Low |\n| L2 | First Principles | Premissa inválida | PESTEL + SWOT | Rewrite | **HIGH** |\n| L3 | Porter 5 Forces | Força muda | SWOT O/T | Update | Medium |\n| L4 | SWOT | Nova ameaça/oportunidade | OKR | Review | Medium |\n| L5 | TOC | Restrição | GUT | Re-rank | Medium |\n| L6 | TOC | Restrição | 5W2H | Narrow scope | Low |\n| L7 | Capacity | Overload | GUT | Cut items | **HIGH** |\n| L8 | Sprint | Overload | Sprint | Rebalance | Low |\n| L9 | OKR | KR muda | PDCA | Re-anchor | Low |\n\n**High-Risk Cascade:** L2 → L4 → L9 can invalidate entire analysis chain.\n\n---\n\n## Trilha Rules\n\n**interna_only** — NEVER ship to client\n- diagnostic_working, hypotheses_log (raw), decision_log, simulation_report\n\n**cliente** — Require G4 (QA) + G5 (for critical ones)\n- diagnostico_executivo, apresentacao_executiva, plano_acao_cliente, playbook_operacional\n\n**mista** — Consultant decides\n- matriz_prioridades, relatorio_acompanhamento\n\n---\n\n## Dependency Validation Pseudocode\n\n```python\ndef can_produce(artifact, deps_done, gates_passed):\n    for dep in artifact.depends_on:\n        if dep not in deps_done:\n            return False, f\"Missing: {dep}\"\n    \n    if artifact.gate and artifact.gate not in gates_passed:\n        return False, f\"Gate {artifact.gate} not passed\"\n    \n    return True, None\n```\n\n---\n\nFor full details, see complete dependency chains below.\n","stderr":""}
{"returncode":0,"stdout":"total 20K\n-rw-r--r-- 1 root root 2.3K May 20 11:57 agent-requirements.md\n-rw-r--r-- 1 root root 2.1K May 20 11:57 artifact-dependency-graph.md\n-rw-r--r-- 1 root root 3.1K May 20 11:57 capture-protocol.md\n-rw-r--r-- 1 root root 5.9K May 20 11:57 cycle-phases.md\n","stderr":""}
File created successfully: /tmp/x-ray-raptor-v2/references/deliverable-templates.md
---
title: "Creating a custom skill"
date: 2026-04-03
account: adm.stdah@gmail.com
uuid: 47e3885e-28c7-41c7-98ac-2bc81500fd69
messages: 6
tags: []
context: ""
---

**Você** _2026-04-03_

Let's create a skill together using your skill-creator skill. First ask me what the skill should do

---

**Claude** _2026-04-03_

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
Great, I've got the lay of the land! Now I'm all ears — **what would you like this skill to do?**

Feel free to describe it however feels natural — a rough idea is totally fine, and we'll refine it together. For example: "I want a skill that helps Claude format data tables nicely" or "I want a skill for generating SQL queries from plain English descriptions."

---

**Claude** _2026-04-03_

{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/ai-risk-radar-linear.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-03-26 16:26   ai-risk-radar-linear/\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/ingestion/\n     3227  2026-03-26 16:26   ai-risk-radar-linear/src/ingestion/normalizer.ts\n      487  2026-03-26 16:26   ai-risk-radar-linear/src/ingestion/csv.ts\n      482  2026-03-26 16:26   ai-risk-radar-linear/src/ingestion/json.ts\n     1191  2026-03-26 16:26   ai-risk-radar-linear/src/ingestion/googleSheets.ts\n     1407  2026-03-26 16:26   ai-risk-radar-linear/src/ingestion/index.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/classification/\n     3640  2026-03-26 16:26   ai-risk-radar-linear/src/classification/ticketClassifier.ts\n     2997  2026-03-26 16:26   ai-risk-radar-linear/src/classification/operationalNarrator.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/risk-engine/\n     1814  2026-03-26 16:26   ai-risk-radar-linear/src/risk-engine/scoring.ts\n     5830  2026-03-26 16:26   ai-risk-radar-linear/src/risk-engine/analyzer.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/linear/\n     1120  2026-03-26 16:26   ai-risk-radar-linear/src/linear/graphql.ts\n     1044  2026-03-26 16:26   ai-risk-radar-linear/src/linear/stateStore.ts\n    10253  2026-03-26 16:26   ai-risk-radar-linear/src/linear/linearClient.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/pipeline/\n     2949  2026-03-26 16:26   ai-risk-radar-linear/src/pipeline/runPipeline.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/report/\n     5632  2026-03-26 16:26   ai-risk-radar-linear/src/report/summary.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/src/utils/\n      221  2026-03-26 16:26   ai-risk-radar-linear/src/utils/logger.ts\n     1478  2026-03-26 16:26   ai-risk-radar-linear/src/utils/retry.ts\n      152  2026-03-26 16:26   ai-risk-radar-linear/src/utils/hash.ts\n      911  2026-03-26 16:26   ai-risk-radar-linear/src/utils/fs.ts\n     2816  2026-03-26 16:26   ai-risk-radar-linear/src/utils/time.ts\n     2651  2026-03-26 16:26   ai-risk-radar-linear/src/types.ts\n     5268  2026-03-26 16:26   ai-risk-radar-linear/src/config.ts\n     1002  2026-03-26 16:26   ai-risk-radar-linear/src/cli.ts\n     1188  2026-03-26 16:26   ai-risk-radar-linear/src/server.ts\n        0  2026-03-26 16:26   ai-risk-radar-linear/data/\n     2285  2026-03-26 16:26   ai-risk-radar-linear/data/example-tickets.csv\n      782  2026-03-26 16:26   ai-risk-radar-linear/data/example-tickets.json\n        0  2026-03-26 16:26   ai-risk-radar-linear/state/\n        0  2026-03-26 16:26   ai-risk-radar-linear/output/\n        0  2026-03-26 16:26   ai-risk-radar-linear/output/summaries/\n      944  2026-03-26 16:26   ai-risk-radar-linear/package.json\n      503  2026-03-26 16:26   ai-risk-radar-linear/tsconfig.json\n       73  2026-03-26 16:26   ai-risk-radar-linear/.gitignore\n      664  2026-03-26 16:26   ai-risk-radar-linear/.env.example\n     9674  2026-03-26 16:26   ai-risk-radar-linear/README.md\n---------                     -------\n    72685                     43 files\n","stderr":""}
{"returncode":0,"stdout":"# AI Risk Radar → Linear\n\nBackend utilitário em Node.js 20 + TypeScript para transformar tickets operacionais em execução real no Linear. O pipeline aceita CSV local, JSON local e Google Sheets, classifica tickets sem categoria com OpenAI, calcula tendência por categoria e porto, gera síntese operacional e cria ou atualiza issues de forma idempotente no Linear.\n\nA implementação usa a API pública GraphQL do Linear, que a documentação descreve como a API oficial para consultar e mutar entidades, incluindo issues, comentários e projetos fileciteturn4file1. A documentação do Linear também deixa claro que issues pertencem sempre a um time e projetos agrupam grandes unidades de trabalho com issues associadas fileciteturn3file0 fileciteturn4file3.\n\n## Decisões técnicas já resolvidas\n\n1. **Integração Linear via GraphQL explícito**. Em vez de depender de métodos opacos do SDK, a camada `src/linear/` usa queries e mutations explícitas para `issueCreate`, `issueUpdate`, `commentCreate`, `projectCreate` e `issueLabelCreate`. Isso simplifica auditoria, retry e troubleshooting.\n2. **Idempotência real**. Cada risco gera uma chave determinística baseada em `porto + categoria + bucket de deduplicação`. Essa chave é:\n   - persistida localmente em `./state/linear-idempotency.json`;\n   - gravada na issue em um marcador HTML invisível na description.\n3. **Consolidação por porto + categoria**. Múltiplos tickets com a mesma causa operacional provável em um mesmo porto são agregados em um único `RiskSignal`. O Linear recebe uma issue agregada por grupo.\n4. **Dois modos de execução**. Batch por CLI e endpoint HTTP simples para webhook externo.\n5. **Dry-run completo**. O pipeline roda inteiro sem escrever no Linear quando `--dry-run` é usado.\n\n## Estrutura\n\n```text\nai-risk-radar-linear/\n├── .env.example\n├── .gitignore\n├── README.md\n├── package.json\n├── tsconfig.json\n├── data/\n│   ├── example-tickets.csv\n│   └── example-tickets.json\n├── output/\n│   └── summaries/\n├── state/\n└── src/\n    ├── cli.ts\n    ├── config.ts\n    ├── server.ts\n    ├── types.ts\n    ├── classification/\n    │   ├── operationalNarrator.ts\n    │   └── ticketClassifier.ts\n    ├── ingestion/\n    │   ├── csv.ts\n    │   ├── googleSheets.ts\n    │   ├── index.ts\n    │   ├── json.ts\n    │   └── normalizer.ts\n    ├── linear/\n    │   ├── graphql.ts\n    │   ├── linearClient.ts\n    │   └── stateStore.ts\n    ├── pipeline/\n    │   └── runPipeline.ts\n    ├── report/\n    │   └── summary.ts\n    ├── risk-engine/\n    │   ├── analyzer.ts\n    │   └── scoring.ts\n    └── utils/\n        ├── fs.ts\n        ├── hash.ts\n        ├── logger.ts\n        ├── retry.ts\n        └── time.ts\n```\n\n## Variáveis de ambiente\n\nVeja `.env.example`. As mínimas são:\n\n```env\nLINEAR_API_KEY=\nLINEAR_TEAM_ID=\nLINEAR_TEAM_KEY=\nLINEAR_PROJECT_NAME=AI Risk Radar\nOPENAI_API_KEY=\nDATA_SOURCE=csv\nGOOGLE_SHEETS_ID=\nGOOGLE_SERVICE_ACCOUNT_JSON=\nLOOKBACK_DAYS=7\nBASELINE_DAYS=28\nRISK_GROWTH_THRESHOLD=50\nMIN_TICKET_COUNT=3\nDEFAULT_TIMEZONE=America/Sao_Paulo\n```\n\nVariáveis adicionais recomendadas e já suportadas:\n- `LINEAR_CREATE_PROJECT_IF_MISSING=true`\n- `LINEAR_CREATE_LABELS_IF_MISSING=true`\n- `LINEAR_DEDUPE_WINDOW_DAYS=7`\n- `GOOGLE_SHEETS_RANGE=Tickets!A:H`\n- `OPENAI_CLASSIFICATION_MODEL=gpt-4.1-mini`\n- `OPENAI_SUMMARY_MODEL=gpt-4.1-mini`\n- `SUMMARY_OUTPUT_DIR=./output/summaries`\n- `STATE_DIR=./state`\n- `PORT=3000`\n\n## Instalação\n\n```bash\nnpm install\ncp .env.example .env\n```\n\nPreencha `.env`. Para teste local imediato, mantenha `DATA_SOURCE=csv` e use o dataset já incluído em `./data/example-tickets.csv`.\n\n## Execução em dry-run\n\n```bash\nnpm run dry-run\n```\n\nOu explicitamente:\n\n```bash\nnpm run batch -- --dry-run --source csv --reference-date 2026-03-26T10:00:00-03:00\n```\n\nEsse comando:\n1. carrega o dataset;\n2. classifica tickets sem categoria válida;\n3. calcula riscos por porto + categoria;\n4. gera síntese operacional;\n5. imprime resumo markdown no console;\n6. salva resumo em `./output/summaries/`.\n\n## Execução real\n\n```bash\nnpm run batch -- --source csv\n```\n\nEm modo real, para cada `RiskSignal` com `disposition=alert`, o sistema:\n\n1. resolve o time do Linear por `LINEAR_TEAM_ID` ou `LINEAR_TEAM_KEY`;\n2. encontra ou cria o projeto `AI Risk Radar`;\n3. encontra ou cria labels;\n4. verifica o estado local de idempotência;\n5. se já houver issue aberta para a mesma chave determinística, atualiza description + adiciona comentário;\n6. caso contrário, cria nova issue.\n\n## Modo webhook-ready\n\nSuba o servidor:\n\n```bash\nnpm run server\n```\n\nEndpoint:\n\n```bash\nPOST /trigger\nContent-Type: application/json\n```\n\nPayload exemplo:\n\n```json\n{\n  \"dryRun\": true,\n  \"sourceOverride\": \"csv\",\n  \"referenceDate\": \"2026-03-26T10:00:00-03:00\"\n}\n```\n\nHealthcheck:\n\n```bash\ncurl http://localhost:3000/health\n```\n\nTrigger:\n\n```bash\ncurl -X POST http://localhost:3000/trigger \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"dryRun\":true,\"sourceOverride\":\"csv\",\"referenceDate\":\"2026-03-26T10:00:00-03:00\"}'\n```\n\n## Regras de negócio implementadas\n\n- Se `Categoria_IA` já vier válida, o ticket **não é reclassificado**.\n- Se `Categoria_IA` vier vazia ou inválida, o ticket passa por **classificação IA**.\n- Se `growthPercent <= RISK_GROWTH_THRESHOLD`, o grupo fica como `ignore` e aparece só no resumo.\n- Se `growthPercent > threshold`, mas `recentCount < MIN_TICKET_COUNT`, o grupo vira `observation` e **não abre issue crítica**.\n- Se `growthPercent > threshold` e `recentCount >= MIN_TICKET_COUNT`, o grupo vira `alert` e é elegível para Linear.\n- Cada issue contém bloco de evidências com:\n  - contagem recente,\n  - média histórica,\n  - crescimento percentual,\n  - ticket IDs,\n  - janela de tempo,\n  - chave de deduplicação.\n\n## Fórmula de score de risco\n\nA fórmula está em `src/risk-engine/scoring.ts`.\n\n```text\nScore total (0..100) =\n  crescimento (0..40)\n+ severidade média (0..25)\n+ volume absoluto (0..20)\n+ concentração por porto (0..15)\n```\n\n### Componentes\n\n**1) Crescimento – 40 pontos máximos**\n\nO crescimento é comparado ao threshold configurado. Quando o crescimento alcança o dobro do threshold, esse componente satura em 40.\n\n```text\ngrowthComponent = clamp((growthPercent / (growthThreshold * 2)) * 40, 0, 40)\n```\n\n**2) Severidade média – 25 pontos máximos**\n\nEscala 1..5 normalizada para 0..25.\n\n```text\nseverityComponent = clamp(((meanSeverity - 1) / 4) * 25, 0, 25)\n```\n\n**3) Volume recente – 20 pontos máximos**\n\nEvita que um pico de 1 ou 2 tickets tenha o mesmo peso de uma massa operacional relevante.\n\n```text\nvolumeComponent = clamp((recentCount / (minTicketCount * 2)) * 20, 0, 20)\n```\n\n**4) Concentração por porto – 15 pontos máximos**\n\nMede a participação do porto dentro da categoria na janela recente.\n\n```text\nconcentrationComponent = clamp(portShareWithinCategory * 15, 0, 15)\n```\n\n## Exemplo de payload bruto\n\n```json\n{\n  \"Ticket_ID\": \"1002\",\n  \"Data\": \"2026-03-25\",\n  \"Porto\": \"Santos\",\n  \"Cliente\": \"ACME\",\n  \"Descrição\": \"Navio atrasado e fila de atracação acima do normal\",\n  \"Categoria_IA\": \"\",\n  \"Severidade\": 4,\n  \"Tendência\": \"\"\n}\n```\n\n## Exemplo de saída do motor de risco\n\n```json\n{\n  \"port\": \"Santos\",\n  \"category\": \"atraso logístico\",\n  \"disposition\": \"alert\",\n  \"level\": \"critical\",\n  \"score\": 89.67,\n  \"priority\": 1,\n  \"evidence\": {\n    \"recentCount\": 5,\n    \"baselineAverageWindowCount\": 1.75,\n    \"growthPercent\": 185.71,\n    \"meanSeverity\": 3.8,\n    \"recentTicketIds\": [\"1001\", \"1002\", \"1005\", \"1007\", \"1008\"]\n  }\n}\n```\n\n## Exemplo de issue markdown final enviada ao Linear\n\n```md\n<!-- AI_RISK_RADAR_KEY=9cc0...;BUCKET_START=2026-03-24T03:00:00.000Z;BUCKET_END=2026-03-30T02:59:59.999Z -->\n# [AI Risk Radar][Santos][atraso logístico] crescimento anormal de incidentes\n\n## Resumo executivo\nFoi identificado crescimento anormal de incidentes da categoria atraso logístico no porto Santos, com impacto operacional recorrente.\n\n## Evidências numéricas\n- Contagem recente: **5**\n- Média histórica equivalente: **1.75**\n- Crescimento percentual: **185.71%**\n- Severidade média: **3.80**\n- Score de risco: **89.67 / 100**\n- Nível de risco: **critical**\n- Janela recente: **2026-03-20T03:00:00.000Z → 2026-03-27T02:59:59.999Z**\n- Baseline: **2026-02-21T03:00:00.000Z → 2026-03-20T03:00:00.000Z**\n\n## Tickets impactados\n- 1001\n- 1002\n- 1005\n- 1007\n- 1008\n\n## Possível causa operacional\nOs relatos sugerem backlog no terminal, fila de atracação e saturação da janela operacional.\n\n## Recomendação operacional\nRevisar capacidade do terminal, coordenar janelas de atracação, acompanhar fila de liberação diariamente e abrir frente corretiva local.\n\n## Rastreabilidade do cálculo\n- Chave de idempotência: `9cc0...`\n- Bucket de deduplicação: `2026-03-24T03:00:00.000Z` até `2026-03-30T02:59:59.999Z`\n- Fórmula: crescimento + severidade média + volume absoluto + concentração por porto\n- Participação do porto na categoria: **83.33%**\n```\n\n## Observações importantes\n\nO código já está pronto para uso, mas a criação automática de projeto e labels foi implementada com **fallback seguro**:\n- se `LINEAR_CREATE_PROJECT_IF_MISSING=false`, o pipeline segue sem associar projeto;\n- se `LINEAR_CREATE_LABELS_IF_MISSING=false`, o pipeline segue sem criar labels ausentes.\n\nEsse comportamento evita falha total em workspaces mais restritos.\n","stderr":""}
This is a really interesting project! I can see it's a TypeScript pipeline that ingests operational tickets (from CSV, JSON, or Google Sheets), classifies them with AI, scores their risk level, and creates/updates issues in Linear — all centered around port operations (Santos, etc.).

Now I'm curious — what kind of skill do you want to build from this? A few possibilities come to mind:

- **A skill that helps Claude build or extend projects like this one** (e.g., "whenever someone wants an AI-powered risk pipeline, follow these patterns")
- **A skill that helps Claude operate/run this specific pipeline** (e.g., diagnose issues, run commands, interpret output)
- **A skill that captures the business logic here** so Claude can apply the same risk-scoring approach to other domains
- **Something else entirely** — maybe this was just context and you have a different skill in mind?

What's the vision? 🎯

---

**Você** _2026-04-03_

A skill that helps Claude operate/run this specific pipeline

---

**Claude** _2026-04-03_

Great choice! Let me dig into the code a bit more so I can ask smart questions rather than dumb ones.
{"returncode":0,"stdout":"import { Command } from \"commander\";\nimport { runPipeline } from \"./pipeline/runPipeline.js\";\n\nconst program = new Command();\n\nprogram\n  .name(\"ai-risk-radar\")\n  .description(\"Executa o pipeline batch do AI Risk Radar com integração ao Linear.\")\n  .option(\"--dry-run\", \"Executa o pipeline sem gravar no Linear\", false)\n  .option(\"--source <source>\", \"Sobrescreve a fonte de dados: csv | json | google-sheets\")\n  .option(\"--reference-date <iso>\", \"Data de referência ISO para testes reproduzíveis\")\n  .action(async (options) => {\n    const summary = await runPipeline({\n      dryRun: options.dryRun,\n      sourceOverride: options.source,\n      referenceDate: options.referenceDate,\n    });\n\n    console.log(summary.markdown);\n    console.log(`\\nResumo salvo em: ${summary.summaryPath}`);\n  });\n\nprogram.parseAsync(process.argv).catch((error: unknown) => {\n  const message = error instanceof Error ? error.stack ?? error.message : String(error);\n  console.error(message);\n  process.exitCode = 1;\n});\nimport dotenv from \"dotenv\";\nimport path from \"node:path\";\nimport { z } from \"zod\";\nimport type { DataSourceKind } from \"./types.js\";\n\ndotenv.config();\n\nconst envSchema = z\n  .object({\n    LINEAR_API_KEY: z.string().min(1),\n    LINEAR_TEAM_ID: z.string().optional(),\n    LINEAR_TEAM_KEY: z.string().optional(),\n    LINEAR_PROJECT_NAME: z.string().default(\"AI Risk Radar\"),\n    LINEAR_CREATE_PROJECT_IF_MISSING: z\n      .string()\n      .default(\"true\")\n      .transform((value) => value === \"true\"),\n    LINEAR_CREATE_LABELS_IF_MISSING: z\n      .string()\n      .default(\"true\")\n      .transform((value) => value === \"true\"),\n    OPENAI_API_KEY: z.string().min(1),\n    OPENAI_CLASSIFICATION_MODEL: z.string().default(\"gpt-4.1-mini\"),\n    OPENAI_SUMMARY_MODEL: z.string().default(\"gpt-4.1-mini\"),\n    DATA_SOURCE: z.enum([\"csv\", \"json\", \"google-sheets\"]).default(\"csv\"),\n    CSV_PATH: z.string().default(\"./data/example-tickets.csv\"),\n    JSON_PATH: z.string().default(\"./data/example-tickets.json\"),\n    GOOGLE_SHEETS_ID: z.string().optional(),\n    GOOGLE_SHEETS_RANGE: z.string().default(\"Tickets!A:H\"),\n    GOOGLE_SERVICE_ACCOUNT_JSON: z.string().optional(),\n    LOOKBACK_DAYS: z.coerce.number().int().positive().default(7),\n    BASELINE_DAYS: z.coerce.number().int().positive().default(28),\n    RISK_GROWTH_THRESHOLD: z.coerce.number().positive().default(50),\n    MIN_TICKET_COUNT: z.coerce.number().int().positive().default(3),\n    LINEAR_DEDUPE_WINDOW_DAYS: z.coerce.number().int().positive().default(7),\n    DEFAULT_TIMEZONE: z.string().default(\"America/Sao_Paulo\"),\n    SUMMARY_OUTPUT_DIR: z.string().default(\"./output/summaries\"),\n    STATE_DIR: z.string().default(\"./state\"),\n    PORT: z.coerce.number().int().positive().default(3000),\n    LOG_LEVEL: z.enum([\"fatal\", \"error\", \"warn\", \"info\", \"debug\", \"trace\"]).default(\"info\"),\n  })\n  .superRefine((env, ctx) => {\n    if (!env.LINEAR_TEAM_ID && !env.LINEAR_TEAM_KEY) {\n      ctx.addIssue({\n        code: z.ZodIssueCode.custom,\n        path: [\"LINEAR_TEAM_ID\"],\n        message: \"Defina LINEAR_TEAM_ID ou LINEAR_TEAM_KEY.\",\n      });\n    }\n\n    if (env.DATA_SOURCE === \"google-sheets\") {\n      if (!env.GOOGLE_SHEETS_ID) {\n        ctx.addIssue({\n          code: z.ZodIssueCode.custom,\n          path: [\"GOOGLE_SHEETS_ID\"],\n          message: \"GOOGLE_SHEETS_ID é obrigatório quando DATA_SOURCE=google-sheets.\",\n        });\n      }\n\n      if (!env.GOOGLE_SERVICE_ACCOUNT_JSON) {\n        ctx.addIssue({\n          code: z.ZodIssueCode.custom,\n          path: [\"GOOGLE_SERVICE_ACCOUNT_JSON\"],\n          message: \"GOOGLE_SERVICE_ACCOUNT_JSON é obrigatório quando DATA_SOURCE=google-sheets.\",\n        });\n      }\n    }\n\n    if (env.BASELINE_DAYS < env.LOOKBACK_DAYS) {\n      ctx.addIssue({\n        code: z.ZodIssueCode.custom,\n        path: [\"BASELINE_DAYS\"],\n        message: \"BASELINE_DAYS deve ser maior ou igual a LOOKBACK_DAYS.\",\n      });\n    }\n  });\n\nexport interface AppConfig {\n  linear: {\n    apiKey: string;\n    teamId?: string;\n    teamKey?: string;\n    projectName: string;\n    createProjectIfMissing: boolean;\n    createLabelsIfMissing: boolean;\n    dedupeWindowDays: number;\n  };\n  openai: {\n    apiKey: string;\n    classificationModel: string;\n    summaryModel: string;\n  };\n  data: {\n    source: DataSourceKind;\n    csvPath: string;\n    jsonPath: string;\n    googleSheetsId?: string;\n    googleSheetsRange: string;\n    googleServiceAccountJson?: string;\n  };\n  risk: {\n    lookbackDays: number;\n    baselineDays: number;\n    growthThreshold: number;\n    minTicketCount: number;\n    timezone: string;\n  };\n  output: {\n    summaryDir: string;\n    stateDir: string;\n  };\n  server: {\n    port: number;\n  };\n  logLevel: \"fatal\" | \"error\" | \"warn\" | \"info\" | \"debug\" | \"trace\";\n}\n\nlet cachedConfig: AppConfig | undefined;\n\nexport function loadConfig(): AppConfig {\n  if (cachedConfig) {\n    return cachedConfig;\n  }\n\n  const env = envSchema.parse(process.env);\n\n  cachedConfig = {\n    linear: {\n      apiKey: env.LINEAR_API_KEY,\n      teamId: env.LINEAR_TEAM_ID || undefined,\n      teamKey: env.LINEAR_TEAM_KEY || undefined,\n      projectName: env.LINEAR_PROJECT_NAME,\n      createProjectIfMissing: env.LINEAR_CREATE_PROJECT_IF_MISSING,\n      createLabelsIfMissing: env.LINEAR_CREATE_LABELS_IF_MISSING,\n      dedupeWindowDays: env.LINEAR_DEDUPE_WINDOW_DAYS,\n    },\n    openai: {\n      apiKey: env.OPENAI_API_KEY,\n      classificationModel: env.OPENAI_CLASSIFICATION_MODEL,\n      summaryModel: env.OPENAI_SUMMARY_MODEL,\n    },\n    data: {\n      source: env.DATA_SOURCE,\n      csvPath: path.resolve(env.CSV_PATH),\n      jsonPath: path.resolve(env.JSON_PATH),\n      googleSheetsId: env.GOOGLE_SHEETS_ID || undefined,\n      googleSheetsRange: env.GOOGLE_SHEETS_RANGE,\n      googleServiceAccountJson: env.GOOGLE_SERVICE_ACCOUNT_JSON || undefined,\n    },\n    risk: {\n      lookbackDays: env.LOOKBACK_DAYS,\n      baselineDays: env.BASELINE_DAYS,\n      growthThreshold: env.RISK_GROWTH_THRESHOLD,\n      minTicketCount: env.MIN_TICKET_COUNT,\n      timezone: env.DEFAULT_TIMEZONE,\n    },\n    output: {\n      summaryDir: path.resolve(env.SUMMARY_OUTPUT_DIR),\n      stateDir: path.resolve(env.STATE_DIR),\n    },\n    server: {\n      port: env.PORT,\n    },\n    logLevel: env.LOG_LEVEL,\n  };\n\n  return cachedConfig;\n}\nimport { loadConfig } from \"../config.js\";\nimport { TicketClassifier } from \"../classification/ticketClassifier.js\";\nimport { OperationalNarrator } from \"../classification/operationalNarrator.js\";\nimport { loadTickets } from \"../ingestion/index.js\";\nimport { LinearIntegrationService } from \"../linear/linearClient.js\";\nimport { analyzeRisks } from \"../risk-engine/analyzer.js\";\nimport { buildAndPersistBatchSummary, buildIssueCommentMarkdown, buildIssueMarkdown } from \"../report/summary.js\";\nimport type { PipelineSummary, RunPipelineOptions } from \"../types.js\";\nimport { logger } from \"../utils/logger.js\";\n\nexport async function runPipeline(options: RunPipelineOptions = {}): Promise<PipelineSummary> {\n  const config = loadConfig();\n  const startedAt = new Date().toISOString();\n\n  logger.info(\n    {\n      dryRun: Boolean(options.dryRun),\n      sourceOverride: options.sourceOverride,\n      referenceDate: options.referenceDate,\n    },\n    \"Iniciando pipeline AI Risk Radar\",\n  );\n\n  const { source, tickets } = await loadTickets(options.sourceOverride);\n  logger.info({ source, totalTickets: tickets.length }, \"Tickets carregados\");\n\n  const classifier = new TicketClassifier();\n  const { tickets: classifiedTickets, classifiedCount } = await classifier.classifyMissingCategories(tickets);\n  logger.info({ classifiedCount }, \"Classificação concluída\");\n\n  const risks = analyzeRisks(\n    classifiedTickets,\n    {\n      timezone: config.risk.timezone,\n      lookbackDays: config.risk.lookbackDays,\n      baselineDays: config.risk.baselineDays,\n      growthThreshold: config.risk.growthThreshold,\n      minTicketCount: config.risk.minTicketCount,\n      dedupeWindowDays: config.linear.dedupeWindowDays,\n    },\n    options.referenceDate,\n  );\n\n  logger.info({ detectedRisks: risks.length }, \"Motor de risco concluído\");\n\n  const narrator = new OperationalNarrator();\n  for (const risk of risks) {\n    if (risk.disposition === \"ignore\") {\n      continue;\n    }\n    risk.narrative = await narrator.buildNarrative(risk);\n  }\n\n  const linear = new LinearIntegrationService();\n  const linearResults = [];\n\n  for (const risk of risks) {\n    if (risk.disposition !== \"alert\") {\n      continue;\n    }\n\n    const issueMarkdown = buildIssueMarkdown(risk);\n    const commentMarkdown = buildIssueCommentMarkdown(risk);\n    const result = await linear.upsertRisk(risk, issueMarkdown, commentMarkdown, Boolean(options.dryRun));\n    linearResults.push(result);\n  }\n\n  const completedAt = new Date().toISOString();\n  const summary = await buildAndPersistBatchSummary({\n    source,\n    startedAt,\n    completedAt,\n    tickets: classifiedTickets,\n    classifiedCount,\n    risks,\n    linearResults,\n  });\n\n  logger.info(\n    {\n      risksDetected: summary.risksDetected,\n      issuesCreated: summary.issuesCreated,\n      issuesUpdated: summary.issuesUpdated,\n      summaryPath: summary.summaryPath,\n    },\n    \"Pipeline finalizado\",\n  );\n\n  return summary;\n}\n","stderr":""}
Good, I have a solid understanding of the pipeline now. Before I write the skill, a few quick questions:
{
  "questions": [
    {
      "question": "Which data sources will you realistically use?",
      "type": "multi_select",
      "options": [
        "CSV (local file)",
        "JSON (local file)",
        "Google Sheets"
      ]
    },
    {
      "question": "What operations should the skill cover?",
      "type": "multi_select",
      "options": [
        "Initial setup & .env config",
        "Running dry-run / batch",
        "Interpreting output & risk scores",
        "Debugging errors",
        "Running the webhook server"
      ]
    },
    {
      "question": "Where will you run the pipeline?",
      "type": "single_select",
      "options": [
        "Locally on my machine",
        "On a server / cloud VM",
        "Both"
      ]
    }
  ]
}
Enquanto aguardo suas respostas, quero ter certeza de cobrir o que é mais útil pra você. Pode selecionar as opções acima! 👆
---
title: "Building a custom skill together"
date: 2026-04-03
account: adm.stdah@gmail.com
uuid: 5860f481-03d5-4a9f-8a78-8cc69b08e01a
messages: 6
tags: []
context: ""
---

**Você** _2026-04-03_

Let's create a skill together using your skill-creator skill. First ask me what the skill should do.

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
Great, I'm ready to help build a skill with you! So — **what would you like this skill to do?**

Tell me as much or as little as you have in mind. It could be something like "help me generate invoices," "summarize meeting notes in a specific format," "analyze code for security issues," or anything else. We'll figure out the details together from there.

---

**Claude** _2026-04-03_

Uau, você já tem um skill muito bem elaborado! Deixa eu montá-lo na estrutura correta e empacotá-lo para você.
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
28K	/home/claude/projects-to-linear
11K	/home/claude/projects-to-linear/SKILL.md
13K	/home/claude/projects-to-linear/references
3.0K	/home/claude/projects-to-linear/references/mcp-tools.md
3.5K	/home/claude/projects-to-linear/references/templates.md
2.0K	/home/claude/projects-to-linear/references/workspace-data.md

{"returncode":0,"stdout":"LICENSE.txt\nSKILL.md\nagents\nassets\neval-viewer\nreferences\nscripts\n","stderr":""}
{"returncode":0,"stdout":"__init__.py\naggregate_benchmark.py\ngenerate_report.py\nimprove_description.py\npackage_skill.py\nquick_validate.py\nrun_eval.py\nrun_loop.py\nutils.py\n","stderr":""}
{"returncode":1,"stdout":"📦 Packaging skill: /home/claude/projects-to-linear\n\n🔍 Validating skill...\n❌ Validation failed: Unexpected key(s) in SKILL.md frontmatter: required_connectors. Allowed properties are: allowed-tools, compatibility, description, license, metadata, name\n   Please fix the validation errors before packaging.\n","stderr":""}
Successfully replaced string in /home/claude/projects-to-linear/SKILL.md
{"returncode":1,"stdout":"📦 Packaging skill: /home/claude/projects-to-linear\n\n🔍 Validating skill...\n❌ Validation failed: Description cannot contain angle brackets (< or >)\n   Please fix the validation errors before packaging.\n","stderr":""}
     1	---
     2	name: projects-to-linear
     3	description: >
     4	  Pipeline agentic que transforma escopos brutos de projeto em projetos
     5	  estruturados no Linear com decomposição Agile, hierarquia Epic→Issue,
     6	  dependências, e notificação Slack. Orquestra Linear + Slack + Notion +
     7	  Figma via MCP em pipeline unificado com validation gate humana.
     8	
     9	  ATIVE SEMPRE para: criação de projeto no Linear, decomposição de escopo
    10	  em issues, transformação de PRD/briefing em backlog, estruturação de
    11	  projeto com epics e issues, pipeline escopo→Linear, backlog building,
    12	  sprint setup a partir de escopo novo.
    13	
    14	  ATIVE com: "cria projeto no linear", "manda pro linear", "decompõe
    15	  esse escopo", "transforma em issues", "escopo para linear", "projects
    16	  to linear", "scope to issues", "cria epics e issues", "monta o
    17	  backlog", "estrutura esse projeto", "workflow completo", "do escopo ao
    18	  linear", "analisa esse escopo e cria no linear", "linear project".
    19	
    20	  TAMBÉM ative quando o usuário colar texto longo (>200 palavras) com
    21	  características de escopo (funcionalidades, requisitos, entregas) e
    22	  mencionar "projeto", "linear", "issues" ou "backlog". Ative mesmo se
    23	  o usuário não disser "Linear" explicitamente, se o contexto indicar
    24	  criação de projeto com decomposição Agile.
    25	
    26	  NÃO ative para: consultas de status de issues existentes, atualização
    27	  de issues individuais, queries de leitura no Linear, ou tarefas que
    28	  usem executive-planning-orchestrator (priorização/roadmap sem criação
    29	  no Linear). Se o input for lista de tarefas simples sem contexto de
    30	  projeto, redirecionar para task-intake.
[318 lines total]
O problema está na linha 20 — o `>200 palavras` tem um `>` literal no texto da description. Vou corrigir:
Successfully replaced string in /home/claude/projects-to-linear/SKILL.md
{"returncode":1,"stdout":"📦 Packaging skill: /home/claude/projects-to-linear\n\n🔍 Validating skill...\n❌ Validation failed: Description is too long (1500 characters). Maximum is 1024 characters.\n   Please fix the validation errors before packaging.\n","stderr":""}
A description está muito longa (1500 chars, máximo 1024). Vou condensar mantendo todos os gatilhos importantes:
Input validation errors occurred:
path: Field required
     1	---
     2	name: projects-to-linear
     3	description: >
     4	  Pipeline agentic que transforma escopos brutos de projeto em projetos
     5	  estruturados no Linear com decomposição Agile, hierarquia Epic→Issue,
     6	  dependências, e notificação Slack. Orquestra Linear + Slack + Notion +
     7	  Figma via MCP em pipeline unificado com validation gate humana.
     8	
     9	  ATIVE SEMPRE para: criação de projeto no Linear, decomposição de escopo
    10	  em issues, transformação de PRD/briefing em backlog, estruturação de
    11	  projeto com epics e issues, pipeline escopo→Linear, backlog building,
    12	  sprint setup a partir de escopo novo.
    13	
    14	  ATIVE com: "cria projeto no linear", "manda pro linear", "decompõe
    15	  esse escopo", "transforma em issues", "escopo para linear", "projects
    16	  to linear", "scope to issues", "cria epics e issues", "monta o
    17	  backlog", "estrutura esse projeto", "workflow completo", "do escopo ao
    18	  linear", "analisa esse escopo e cria no linear", "linear project".
    19	
    20	  TAMBÉM ative quando o usuário colar texto longo (mais de 200 palavras) com
    21	  características de escopo (funcionalidades, requisitos, entregas) e
    22	  mencionar "projeto", "linear", "issues" ou "backlog". Ative mesmo se
    23	  o usuário não disser "Linear" explicitamente, se o contexto indicar
    24	  criação de projeto com decomposição Agile.
    25	
    26	  NÃO ative para: consultas de status de issues existentes, atualização
    27	  de issues individuais, queries de leitura no Linear, ou tarefas que
    28	  usem executive-planning-orchestrator (priorização/roadmap sem criação
    29	  no Linear). Se o input for lista de tarefas simples sem contexto de
    30	  projeto, redirecionar para task-intake.
    31	
    32	compatibility:
    33	  connectors:
    34	    critical: Linear
    35	    recommended: Slack
    36	    optional: Notion, Figma
    37	
    38	metadata:
    39	  version: "1.0.0"
    40	  author: "PIPILONES Skill Architecture — Leonardo"
[318 lines total]
{"returncode":0,"stdout":"Done\n868 chars\n","stderr":""}
{"returncode":0,"stdout":"Done. Total chars: 10178\n","stderr":""}
{"returncode":1,"stdout":"📦 Packaging skill: /home/claude/projects-to-linear\n\n🔍 Validating skill...\n✅ Skill is valid!\n\n❌ Error creating .skill file: [Errno 30] Read-only file system: '/mnt/skills/examples/skill-creator/projects-to-linear.skill'\n","stderr":""}
{"returncode":1,"stdout":"📦 Packaging skill: /home/claude/projects-to-linear\n   Output directory: --output\n\n🔍 Validating skill...\n✅ Skill is valid!\n\nTraceback (most recent call last):\n  File \"<frozen runpy>\", line 198, in _run_module_as_main\n  File \"<frozen runpy>\", line 88, in _run_code\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 136, in <module>\n    main()\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 127, in main\n    result = package_skill(skill_path, output_dir)\n             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 83, in package_skill\n    output_path.mkdir(parents=True, exist_ok=True)\n  File \"/usr/lib/python3.12/pathlib.py\", line 1313, in mkdir\n    os.mkdir(self, mode)\nOSError: [Errno 30] Read-only file system: '/mnt/skills/examples/skill-creator/--output'\n","stderr":""}
{"returncode":1,"stdout":"Traceback (most recent call last):\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 17, in <module>\n    from scripts.quick_validate import validate_skill\nModuleNotFoundError: No module named 'scripts'\n","stderr":""}
{"returncode":0,"stdout":"  adding: projects-to-linear/ (stored 0%)\n  adding: projects-to-linear/SKILL.md (deflated 57%)\n  adding: projects-to-linear/references/ (stored 0%)\n  adding: projects-to-linear/references/workspace-data.md (deflated 46%)\n  adding: projects-to-linear/references/templates.md (deflated 51%)\n  adding: projects-to-linear/references/mcp-tools.md (deflated 55%)\nDone: -rw-r--r-- 1 claude root 9.3K Apr  3 12:51 /mnt/user-data/outputs/projects-to-linear.skill\n","stderr":""}
Seu skill está empacotado! Duas pequenas correções que precisei fazer no frontmatter:

1. **`required_connectors`** → movido para dentro de `compatibility` (que é o campo permitido pelo schema)
2. **`>200 palavras`** → virou `mais de 200 palavras` (o `>` literal no texto da description não é permitido)
3. **Description encurtada** de ~1500 para ~868 chars (limite é 1024), mantendo todos os gatilhos essenciais

A estrutura final ficou:
```
projects-to-linear/
├── SKILL.md
└── references/
    ├── mcp-tools.md
    ├── workspace-data.md
    └── templates.md
```

Quer que a gente rode alguns casos de teste para validar o comportamento da skill antes de considerar finalizada? Por exemplo, poderíamos testar com um escopo simples e ver se a skill executa o pipeline corretamente.

---

**Você** _2026-04-03_

Continuar

---

**Claude** _2026-04-03_

Ótimo! O próximo passo é testar a skill com alguns prompts reais para ver se ela se comporta como esperado. Vou propor 3 casos de teste que cobrem os cenários principais:

**Caso 1 — Gatilho direto com escopo completo**
> "Cria um projeto no Linear: quero construir um app de agendamento de consultas médicas. Stack: Next.js + Supabase. Time: só eu. Timeline: abril → junho. Sprint de 2 semanas."

**Caso 2 — Gatilho implícito (sem mencionar Linear)**
> "Preciso estruturar esse projeto em epics e issues pra começar o desenvolvimento. [escopo longo colado]"

**Caso 3 — Caso que NÃO deve ativar a skill**
> "Qual o status das minhas issues abertas no Linear?"

---

Quer que eu execute esses 3 testes agora (simulando o que a skill faria em cada caso) e depois a gente avalia juntos os resultados? 

Ou prefere ajustar os casos de teste primeiro para refletir melhor o seu uso real do dia a dia?
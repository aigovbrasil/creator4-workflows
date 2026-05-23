---
title: "Horácio research-to-decision agent skill"
date: 2026-05-08
account: on.26.leonardo@gmail.com
uuid: b2903836-2ab7-45ed-a857-e200aa4f08be
messages: 2
tags: []
context: ""
---

**Você** _2026-05-08_

/skill-creator improve and create a full directry skill : the name ints horacio make hiperdatacolec_perpelxty. **V-20260508-008 — Horácio Skill MD — #ai #workflow — Draft**
Criei o `SKILL.md` em dois formatos:
| Arquivo                                                                                            | Uso                                        |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [HORACIO_SKILL.md](sandbox:/mnt/data/HORACIO_SKILL.md)                                             | Markdown standalone para copiar/editar     |
| [horacio-research-to-decision-agent.zip](sandbox:/mnt/data/horacio-research-to-decision-agent.zip) | Pasta zipada pronta para upload como Skill |
Usei o formato de Claude Skills com `SKILL.md` obrigatório, frontmatter YAML e instruções internas; a documentação oficial descreve Skills como pastas com um `SKILL.md` e arquivos opcionais de suporte. ([Claude][1])
A skill criada cobre:
| Bloco              | Conteúdo                                                                       |
| ------------------ | ------------------------------------------------------------------------------ |
| Missão             | Horácio como Research-to-Decision Agent                                        |
| Trigger            | Quando ativar para RAG, CMD, Decision OS, sinais, dados e vault                |
| Output obrigatório | RAG Knowledge Pack, CMD Execution Plan, Executive Synthesis, Delivery Artifact |
| Schema             | IDs F/H/I/D/R/T/M/G/SIG/SRC                                                    |
| Workflow           | Intake → Retrieval → Normalize → Decide → Execute → Writeback                  |
| Quality Bar        | MECE, source-aware, execution-ready, storage-aware                             |
| Storage Target     | Master Index, Workflows, XLS, Decision Trace, GAPS                             |
[1]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview?utm_source=chatgpt.com "Agent Skills - Claude API Docs"

---

**Claude** _2026-05-08_

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
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/horacio-research-to-decision-agent.zip\n  inflating: horacio_extracted/horacio-research-to-decision-agent/SKILL.md  \n  inflating: horacio_extracted/horacio-research-to-decision-agent/README.md  \n---\nhoracio_extracted/horacio-research-to-decision-agent/README.md\nhoracio_extracted/horacio-research-to-decision-agent/SKILL.md\n","stderr":""}
{"returncode":0,"stdout":"---\nname: horacio-research-to-decision-agent\ndescription: Use this skill when the user wants to transform research, market signals, notes, files, web findings, dashboards, GA4/ETL data, or strategic fragments into a reusable Horácio Vault output: RAG Knowledge Pack, CMD Execution Plan, Executive Synthesis, Delivery Artifact, decisions, risks, metrics, and storage targets. TRIGGER when the user mentions Horácio, CMD, RAG, vault, Decision OS, agent, workflow intelligence, AI adoption, market validation, signals, business thesis, strategic report, knowledge base, execution plan, or asks to normalize/structure/extract/convert knowledge into action. SKIP for casual Q&A, generic writing, or tasks that do not require decision-ready knowledge structuring.\nversion: 1.0.0\nlanguage: pt-BR\nowner: Leonardo\nstatus: Draft\ntags:\n  - rag\n  - workflow\n  - decision-os\n  - strategy\n  - ai\n  - execution\n---\n\n# Horácio Research-to-Decision Agent Skill\n\n## 1. Mission\n\nOperate as **Horácio**, an Operational Intelligence Partner for Leonardo.\n\nYour job is to transform dispersed knowledge into reusable operational assets:\n\n- research → signals\n- signals → implications\n- implications → decisions\n- decisions → execution plans\n- execution plans → vault/writeback artifacts\n\nDo **not** behave as a generic assistant. Behave as a compact decision infrastructure for non-technical knowledge work.\n\n## 2. Core Thesis\n\nHorácio is not a prompt pack, course, document vault, or generic AI consultant.\n\nHorácio is an **Operational AI System for Non-Technical Knowledge Workers**, with a moat based on:\n\n1. decision architecture\n2. proprietary workflow layer\n3. source-aware knowledge reuse\n4. separation of fact, hypothesis, inference, decision, risk, task, and metric\n5. low-documentation / high-reuse operating discipline\n\n## 3. Activation Policy\n\nUse this skill when the task involves any of the following:\n\n| Trigger | Meaning |\n|---|---|\n| Horácio / CMD / RAG | User wants operational knowledge structuring |\n| Vault / Business Thesis Vault | User wants reusable table-first knowledge |\n| Decision OS / agent / workflow | User wants knowledge transformed into an agentic process |\n| Signals / market research / validation | User wants evidence converted into strategy |\n| GA4 / ETL / data / metrics | User wants data interpreted for action |\n| “normalize”, “structure”, “extract”, “convert” | User wants raw input transformed into schemas |\n| “o que fazer agora?” | User wants decision and execution guidance |\n\nSkip this skill when the user only needs:\n\n- casual conversation\n- generic explanation\n- translation without strategic structuring\n- pure code/debugging unrelated to Horácio\n- creative writing without vault/writeback need\n\n## 4. Non-Negotiable Output Contract\n\nEvery serious Horácio session must produce four deliverables:\n\n1. **RAG Knowledge Pack**\n2. **CMD Execution Plan**\n3. **Executive Synthesis**\n4. **Delivery Artifact**\n\nIf the user asks for a smaller output, compress the format but preserve the four-part logic internally.\n\n## 5. Default Chat Title Format\n\nStart new project outputs with:\n\n```text\nV-YYYYMMDD-### — Name — #main #secondary — Status\n```\n\nValid statuses:\n\n- Draft\n- Active\n- Validating\n- Decision\n- Archived\n\nValid types:\n\n- Idea\n- Thesis\n- Plan\n- Analysis\n- Decision\n- Task\n\nValid tags:\n\n```text\n#strategy #market #problem #customer #jtbd #finance #growth #ops #risk #validation #execution #data #ai #product #workflow #project #rag #decision-os #claude\n```\n\n## 6. Default Vault Schema\n\nUse this table unless a more specific schema is required:\n\n| ID | Chat Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |\n|---|---|---|---|---|---|---|---|---|---|---|\n| V-YYYYMMDD-### | TBD | TBD | TBD | TBD | TBD | TBD | Leonardo | TBD | Draft | TBD |\n\n## 7. Epistemic Discipline\n\nNever mix epistemic types.\n\nUse these IDs:\n\n| Prefix | Type | Definition |\n|---|---|---|\n| F-### | FATO | Extracted or verifiable fact |\n| H-### | HIPÓTESE | Assumption that needs validation |\n| I-### | INFERÊNCIA | Reasoned conclusion from facts/hypotheses |\n| D-### | DECISÃO | Explicit choice or recommendation |\n| R-### | RISCO | Uncertainty, threat, dependency, or failure mode |\n| T-### | TAREFA | Concrete next action |\n| M-### | MÉTRICA | Validation metric or KPI |\n| G-### | GAP | Missing information |\n| SIG-### | SIGNAL | Market, customer, data, or behavior signal |\n| SRC-### | SOURCE | Source registry item |\n\nWhen information is missing, do not invent. Create a **GAPS** table.\n\n## 8. Retrieval Order\n\nWhen using available memory, files, RAG, or project context, recover knowledge in this order:\n\n1. master thesis\n2. decision traces\n3. workflows\n4. signals\n5. research notes\n6. templates\n7. web search\n8. MCPs / external tools\n\nIf source quality matters, rank by:\n\n1. primary source\n2. official data / government / filings\n3. enterprise reports\n4. reputable journalism\n5. user notes\n6. inference\n\n## 9. Required Reasoning Workflow\n\nFor each task, execute the workflow below.\n\n### Step 1 — Intake\n\nClassify the input.\n\n| Dimension | Options |\n|---|---|\n| Input Type | research, signal, decision, workflow, note, file, data, metric, artifact |\n| Business Frame | strategy, market, product, finance, growth, ops, risk, validation, execution |\n| Output Need | synthesis, plan, decision, database row, prompt, agent spec, artifact |\n| Confidence | high, medium, low |\n| Missing Info | G-### |\n\n### Step 2 — Normalize\n\nConvert raw input into structured rows.\n\nRequired columns:\n\n| ID | Tipo Epistêmico | Statement | Source | Confidence | Implication | Next Action | Storage Target |\n|---|---|---|---|---|---|---|---|\n\n### Step 3 — Compress\n\nReduce noise using MECE grouping.\n\nDefault groups:\n\n- market demand\n- buyer pain\n- workflow gap\n- decision gap\n- pricing / monetization\n- competition / saturation\n- execution constraint\n- moat potential\n- risk / unknown\n- next action\n\n### Step 4 — Decide\n\nCreate a decision table.\n\n| ID | Decision | Rationale | Evidence | Go Condition | No-Go Condition | Owner | Status |\n|---|---|---|---|---|---|---|---|\n\n### Step 5 — Execute\n\nCreate a task plan.\n\n| ID | Task | Why | Output | Owner | Priority | Deadline | Status |\n|---|---|---|---|---|---|---|---|\n\n### Step 6 — Write Back\n\nAssign every useful output to a storage target.\n\n| Output | Storage Target | Format | Reason |\n|---|---|---|---|\n| Master thesis | `1_Master_Index.md` | markdown | central retrieval |\n| Workflow | `2_Horacio_Workflows.md` | markdown | operating process |\n| Structured rows | `3_CMD_Operations.xlsx` | table | filterable database |\n| Decision | `4_Decision_Trace_Log.md` | markdown/table | audit trail |\n| Prompt / skill / command | Project Instructions or `/skills/` | markdown | reuse |\n| Source | `REFERENCIAS_ABNT` | table | citation registry |\n| Gap | `GAPS` | table | missing info tracker |\n\n## 10. Standard Output Format\n\nPrefer this response structure:\n\n```markdown\n# V-YYYYMMDD-### — [Name] — #[main] #[secondary] — [Status]\n\n## 1. Executive Synthesis\n[5-10 lines max]\n\n## 2. Vault Entry\n| ID | Chat Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |\n|---|---|---|---|---|---|---|---|---|---|---|\n\n## 3. RAG Knowledge Pack\n| ID | Tipo Epistêmico | Statement | Source | Confidence | Implication | Next Action | Storage Target |\n|---|---|---|---|---|---|---|---|\n\n## 4. CMD Execution Plan\n| ID | Task | Why | Output | Owner | Priority | Status |\n|---|---|---|---|---|---|---|\n\n## 5. Decisions / Risks / Metrics\n| ID | Type | Statement | Trigger | Owner | Status |\n|---|---|---|---|---|---|\n\n## 6. Delivery Artifact\n[Prompt, spec, table, checklist, JSON, markdown, or command]\n```\n\n## 11. Framework Selection\n\nUse the minimum useful framework. Do not over-framework.\n\n| User Need | Preferred Frame |\n|---|---|\n| Business overview | Resumo Executivo |\n| Root cause | First Principles |\n| Market context | PESTEL / PASTEL |\n| Problem definition | Issue/Problem |\n| Offer design | 5P |\n| Execution | 5W2H |\n| Customer value | JTBD |\n| Data validation | Data/Metrics |\n| Unknowns | Risks/Unknowns |\n| Immediate work | Next Actions |\n\n## 12. Data and Signals Policy\n\nWhen handling data, dashboards, GA4, ETL, market reports, or metrics:\n\n1. Extract the metric.\n2. Identify the source.\n3. Record timeframe and geography.\n4. Separate observed fact from interpretation.\n5. Add strategic implication.\n6. Add next action.\n7. Define validation metric.\n8. Define storage target.\n\nUse this signal schema:\n\n| signal_id | source_id | category | signal_type | fact | metric | value | unit | timeframe | geography | reliability_score | relevance_score | implication | next_action |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n\n## 13. Agent Design Policy\n\nWhen the user asks to transform knowledge into an agent, design the agent as a closed operational loop:\n\n```text\ninput → retrieval → normalization → reasoning policy → decision → execution → writeback\n```\n\nDefault agent modes:\n\n| Mode | Responsibility |\n|---|---|\n| Intake Mode | classify input and objective |\n| Research Mode | recover relevant context and sources |\n| Decision Mode | separate fact/hypothesis/inference and recommend choices |\n| Execution Mode | generate plan, tasks, artifact |\n| Archive Mode | assign storage target and reusable schema |\n\nAvoid premature multi-agent systems unless the user explicitly needs them. Prefer one agent with internal modes first.\n\n## 14. Quality Bar\n\nA response passes only if it is:\n\n- MECE\n- tagged\n- source-aware\n- execution-ready\n- storage-aware\n- decision-relevant\n- reusable\n- concise enough to operate daily\n- explicit about missing information\n- separated by FATO / HIPÓTESE / INFERÊNCIA\n\nA response fails if it contains:\n\n- generic advice\n- no next action\n- no storage target\n- mixed facts and speculation\n- excessive documents\n- premature SaaS/system complexity\n- unclear decision relevance\n- invented missing content\n\n## 15. Constraints\n\n- Prefer tables.\n- Keep cells concise.\n- Use `TBD` for unknowns.\n- Use Portuguese-BR unless the user asks otherwise.\n- Do not create excessive documents.\n- Do not recommend SaaS before manual validation.\n- Do not hide uncertainty.\n- Do not invent source details.\n- Use web/search only when freshness, verification, or external evidence is required.\n- Use XLS/Obsidian/Markdown writeback before Supabase unless automation is explicitly required.\n\n## 16. Delivery Artifacts You Can Produce\n\nCommon artifacts:\n\n| Artifact | Use Case |\n|---|---|\n| `HORACIO_AGENT_SPEC.md` | Agent design |\n| `SKILL.md` | Claude Skill / reusable capability |\n| `CMD_RUNBOOK.md` | Operating workflow |\n| `RAG_KNOWLEDGE_PACK.md` | Knowledge extraction |\n| `DECISION_TRACE.md` | Audit trail |\n| `VAULT_IMPORT.csv` | Database import |\n| `SUPABASE_SCHEMA.sql` | Later-stage backend |\n| `PROMPT_CACHE.md` | Reusable project instruction |\n\n## 17. Quick Command\n\nWhen the user writes `#run-horacio-rag-cmd`, execute this pattern:\n\n```text\nContext: [user input]\nTags: #rag #workflow #[priority]\nRequired output:\n1. RAG Knowledge Pack\n2. CMD Execution Plan\n3. Executive Synthesis\n4. Delivery Artifact\nFormat: 5W2H + table + storage target\n```\n\n## 18. Minimal Response Mode\n\nIf the user asks for speed, return only:\n\n1. Executive Synthesis\n2. Decision Table\n3. Next Actions\n4. Storage Target\n\nDo not remove epistemic separation when reducing length.\n\n## 19. Example Micro-Output\n\n```markdown\n# V-20260508-### — Horácio Market Signal Intake — #strategy #validation — Draft\n\n## Executive Synthesis\nO sinal indica demanda crescente, mas ainda existe gap entre prioridade executiva e orçamento. A melhor resposta é validar um piloto manual de baixo CAPEX antes de propor SaaS.\n\n## RAG Knowledge Pack\n| ID | Tipo | Statement | Source | Confidence | Implication | Next Action | Storage Target |\n|---|---|---|---|---|---|---|---|\n| F-001 | FATO | Adoção de IA aumentou no setor analisado | SRC-001 | Alta | Mercado em maturação | Validar dor operacional específica | CENTRO_DADOS |\n| H-001 | HIPÓTESE | Cliente pagaria por implementação, não curso | Inferência | Média | Oferta deve ser serviço premium | Rodar 3 entrevistas | VAULT |\n\n## CMD Execution Plan\n| ID | Task | Why | Output | Owner | Priority | Status |\n|---|---|---|---|---|---|---|\n| T-001 | Mapear 3 workflows quebrados | Validar dor comprável | Lista priorizada | Leonardo | Alta | Draft |\n\n## Storage Target\nSalvar em `3_CMD_Operations.xlsx` + `4_Decision_Trace_Log.md`.\n```\n\n## 20. Final Rule\n\nIf the output does not help Leonardo **decide, execute, store, or reuse**, it failed.\n===README===\n# Horácio Research-to-Decision Agent Skill\n\nThis folder contains a Claude-compatible `SKILL.md` for operating Horácio as a Research-to-Decision Agent.\n\nUpload the folder as a ZIP or copy `SKILL.md` into your skill directory.\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /home/claude/horacio/SKILL.md
File created successfully: /home/claude/horacio/references/epistemic-schema.md
File created successfully: /home/claude/horacio/references/signal-schema.md
File created successfully: /home/claude/horacio/references/vault-schema.md
File created successfully: /home/claude/horacio/references/agent-modes.md
File created successfully: /home/claude/horacio/references/frameworks.md
File created successfully: /home/claude/horacio/README.md
{"returncode":0,"stdout":"horacio/README.md\nhoracio/SKILL.md\nhoracio/references/agent-modes.md\nhoracio/references/epistemic-schema.md\nhoracio/references/frameworks.md\nhoracio/references/signal-schema.md\nhoracio/references/vault-schema.md\n---\n  309 horacio/SKILL.md\n  103 horacio/references/agent-modes.md\n  108 horacio/references/epistemic-schema.md\n  118 horacio/references/frameworks.md\n  128 horacio/references/signal-schema.md\n  106 horacio/references/vault-schema.md\n  872 total\n","stderr":""}
{"returncode":0,"stdout":"  adding: horacio/ (stored 0%)\n  adding: horacio/references/ (stored 0%)\n  adding: horacio/references/frameworks.md (deflated 50%)\n  adding: horacio/references/epistemic-schema.md (deflated 55%)\n  adding: horacio/references/vault-schema.md (deflated 53%)\n  adding: horacio/references/agent-modes.md (deflated 52%)\n  adding: horacio/references/signal-schema.md (deflated 51%)\n  adding: horacio/SKILL.md (deflated 55%)\n  adding: horacio/README.md (deflated 45%)\n  adding: horacio/{references,scripts,assets}/ (stored 0%)\n-rw-r--r-- 1 root root 16K May  8 17:44 horacio-v2.skill\n","stderr":""}
HORÁCIO v2 — BUILD COMPLETO
├── Status: ✅ packaged → `horacio-v2.skill` (16KB)
└── Versão: 2.0.0 · hiperdatacolec_perplexty edition

ESTRUTURA GERADA
```
horacio/
├── SKILL.md                    ← 309 linhas (< 500 hard limit) — core sempre em contexto
└── references/
    ├── epistemic-schema.md     ← IDs F/H/I/D/R/T/M/G/SIG/SRC + regras de separação
    ├── signal-schema.md        ← HiperDataColec 5-pass + Perplexity-grade protocol
    ├── vault-schema.md         ← Storage targets map + delivery artifacts menu
    ├── agent-modes.md          ← Modal behavior: Intake/Research/Decision/Execute/Archive
    └── frameworks.md           ← PESTEL, 5W2H, JTBD, Issue Tree, MECE groups
```

DELTA v1 → v2
```
v1  ──  single file, 500+ linhas, sem separação por módulo
v2  ──  progressive disclosure
        ├── SKILL.md lean (triggers, contrato, workflow, quality gate)
        ├── 5 reference files carregados sob demanda
        ├── HiperDataColec mode explícito (5-pass protocol)
        ├── Trigger description mais agressivo (pushy — padrão skill-creator)
        └── Perplexity-grade source ranking + reliability scoring
```

INSTALAÇÃO
```bash
# Upload direto no Claude.ai → Settings → Skills → Add Skill
# Arquivo: horacio-v2.skill
# Tools recomendados: web_search + file_reading + Google Drive MCP
```
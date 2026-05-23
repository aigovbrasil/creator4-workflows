---
title: "Criando uma skill personalizada"
date: 2026-05-19
account: maiajoaovinicius@gmail.com
uuid: a743f8a1-e06d-448a-b578-925b34379049
messages: 6
tags: []
context: ""
---

**Você** _2026-05-19_

/skill-creator vampa croar uma skill ? comece perguntando pque a skill dve efazer ?

---

**Claude** _2026-05-19_

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
Ótimo! Vou começar fazendo as perguntas certas para entender o que você quer criar.
{
  "questions": [
    {
      "question": "O que essa skill deve fazer? Qual \u00e9 o objetivo principal dela?",
      "options": [
        "Automatizar uma tarefa repetitiva",
        "Transformar ou processar arquivos",
        "Gerar um tipo espec\u00edfico de conte\u00fado",
        "Outro (vou descrever)"
      ],
      "type": "single_select"
    }
  ]
}
Me conta mais! Qual das opções acima melhor descreve o que você quer criar? E se puder dar um exemplo concreto do que a skill deveria fazer (mesmo que seja informal), isso vai me ajudar muito a entender o objetivo. 😊

---

**Você** _2026-05-19_

P: O que essa skill deve fazer? Qual é o objetivo principal dela?
R: Transformar ou processar arquivos

---

**Claude** _2026-05-19_

Perfeito! Agora preciso entender melhor os detalhes dessa transformação:
{
  "questions": [
    {
      "question": "Que tipo(s) de arquivo de entrada a skill vai processar?",
      "options": [
        "PDF",
        "Word/Excel/PowerPoint",
        "Imagens",
        "CSV/dados tabulares",
        "C\u00f3digo-fonte",
        "Markdown/texto",
        "M\u00faltiplos tipos"
      ],
      "type": "single_select"
    },
    {
      "question": "Qual transforma\u00e7\u00e3o voc\u00ea quer fazer com esses arquivos?",
      "options": [
        "Extrair informa\u00e7\u00f5es espec\u00edficas",
        "Converter formato",
        "Reorganizar/reestruturar conte\u00fado",
        "Limpar/normalizar dados",
        "Combinar m\u00faltiplos arquivos",
        "Outra coisa"
      ],
      "type": "single_select"
    }
  ]
}

---

**Você** _2026-05-19_

veja aqui e oqueba skill dvre fazer,teste e houve erro ! quando eu peco para coletar ela nao dvre gerar ondocume to do zero apenas manipular o file internamente e oassar para um pasta da skill backlog e salvar essa hora o trigger chama skill cretor refine mode que oemrottra que a skill salve e indique salvar nas habkifsdes com novo fiel persostente simples

---

**Claude** _2026-05-19_

1	---
     2	name: meta-regenerator
     3	description: Collects final research/document outputs from the current conversation or local Markdown files, normalizes them into a durable handoff, proposes a skill-creator refine update, and persists the approved result into project files. Use when the user asks to collect research, save a generated MD, update persistent docs, refine a skill from a new document, regenerate a project operator, append conversation learnings, or convert online research into BACKLOG/decision-log/docs updates. Strong triggers: collect research, salvar md, persistir documento, atualizar skill, refine skill, skill-creator refine, meta-regeneration, collector output, document-to-skill update.
     4	---
     5	
     6	# Meta Regenerator
     7	
     8	## Mission
     9	
    10	Close the loop between **conversation research**, **generated Markdown**, and **persistent project files**.
    11	
    12	This skill collects the final useful state from a conversation or local `.md` file, separates facts/hypotheses/risks/decisions, generates a reviewable update proposal, and only writes to files after explicit user approval.
    13	
    14	It is not just a backlog generator. It is a **conversation-to-file persistence operator** for Project Operator Suite workflows.
    15	
    16	## Primary workflow
    17	
    18	```text
    19	online research / conversation output / generated .md
    20	→ COLLECT_RESEARCH_MD
    21	→ normalize into handoff
    22	→ propose persistent document update
    23	→ prepare skill-creator refine handoff
    24	→ wait for approval
    25	→ write approved content to docs/BACKLOG/decision-log/CHANGELOG
    26	```
    27	
    28	## When to use
    29	
    30	Use this skill when the user asks to:
    31	
    32	- collect the result of an online research session
    33	- save a generated Markdown document into a project directory
    34	- persist a conversation decision into `BACKLOG.md`, `decision-log.md`, `CHANGELOG.md`, or `docs/`
    35	- refine a skill or project operator based on a new research document
    36	- generate a `/skill-creator` refine handoff
    37	- update a persistent document without losing the prior state
    38	- convert a collector output into durable project memory
    39	- run `#Meta-Regeneration`, `collect`, `collector`, `salvar md`, `persistir`, `autoatualizar`, or `refine skill`
    40	
    41	Do not use this skill for ordinary summarization or general writing when no persistent file update is requested.
    42	
    43	## Core distinction
    44	
    45	| Operation | Meaning | Default write policy |
    46	|---|---|---|
    47	| Collect | Extract final state from conversation or `.md` | No write |
    48	| Normalize | Convert into canonical handoff | No write |
    49	| Propose | Generate reviewable update/diff | No write |
    50	| Refine handoff | Prepare input for `/skill-creator` refine | No write |
    51	| Persist | Update files | Requires explicit approval |
    52	
    53	## Required input
    54	
    55	Accept one of these:
    56	
    57	1. Markdown produced in the conversation
    58	2. Path to a local `.md`, `.json`, `.yaml`, `.txt`, or research note file
    59	3. Inline research notes pasted by the user
    60	4. Collector output from another skill/operator
    61	5. Existing document plus requested new evidence/change
    62	
    63	If the target file is not specified, infer the safest target and mark it as `TBD` in the proposal. Do not block unless the user asks to write files and the target is unknown.
    64	
    65	## Operating modes
    66	
    67	Classify each request into exactly one mode:
    68	
    69	| Mode | Meaning | Output |
    70	|---|---|---|
    71	| `COLLECT_RESEARCH_MD` | Collect research/conversation output and convert it into a handoff | Collection report + normalized handoff |
    72	| `GENERATE_PERSISTENT_DOC` | Create a new persistent Markdown document | Copy-ready `.md` content |
    73	| `PROPOSE_REFINE_HANDOFF` | Prepare a `/skill-creator` refine package | YAML handoff + target files |
    74	| `APPLY_PERSISTENCE` | Write approved content into files | Modified files + changelog |
    75	| `VALIDATE_ONLY` | Check quality without writing | Validation report |
    76	
    77	Default to `COLLECT_RESEARCH_MD` when the user says “collect”, “salvar”, “persistir”, “atualizar documento”, or “refinar com a pesquisa”.
    78	
    79	## Step 1 — Collect final conversation state
    80	
    81	Extract only the durable, reusable material:
    82	
    83	- final thesis
    84	- verified facts
    85	- hypotheses still open
    86	- risks and forbidden claims
    87	- decisions made
    88	- source links or source traces
    89	- generated Markdown content
    90	- target project/package/skill
    91	- target files likely to change
    92	- next action
    93	
    94	Do not preserve conversational noise, false starts, duplicated drafts, or tool logs unless they are material evidence.
    95	
    96	## Step 2 — Normalize into canonical handoff
    97	
    98	Use this object shape:
    99	
   100	```yaml
   101	research_update_handoff:
   102	  handoff_id: MRH-YYYYMMDD-001
   103	  source_type: conversation_research | online_research | markdown_document | collector_output | mixed
   104	  source_trace:
   105	    conversation_summary: TBD
   106	    local_files: []
   107	    external_sources: []
   108	  target_project: TBD
   109	  target_skill: TBD
   110	  target_files:
   111	    - path: TBD
   112	      change_type: append | replace_section | create | refine
   113	      reason: TBD
   114	  final_document:
   115	    title: TBD
   116	    status: draft | validating | decision | archived
   117	    markdown: TBD
   118	  facts: []
   119	  hypotheses: []
   120	  risks: []
   121	  decisions: []
   122	  tasks: []
   123	  metrics: []
   124	  forbidden_claims: []
   125	  skill_creator_refine:
   126	    needed: true | false
   127	    mode: refine
   128	    target_skill: TBD
   129	    update_scope: minimal_append | section_patch | reference_addition | full_refactor
   130	  write_policy: approval_required
   131	```
   132	
   133	## Step 3 — Propose before write
   134	
   135	Before any write, return:
   136	
   137	```yaml
   138	persistence_proposal:
   139	  status: ready_for_review | blocked | needs_clarification
   140	  target_files:
   141	    - path: ...
   142	      change_type: append | replace_section | create | refine
   143	      reason: ...
   144	  generated_content:
   145	    document_markdown: |
   146	      ...
   147	    backlog_entry: |
   148	      ...
   149	    decision_log_entry: |
   150	      ...
   151	    skill_creator_refine_handoff: |
   152	      ...
   153	  risks: []
   154	  approval_required: true
   155	  exact_approval_phrase: "Aprovado. Aplique a persistência nos arquivos indicados."
   156	```
   157	
   158	## Step 4 — Skill Creator refine handoff
   159	
   160	When the user requests refinement of a skill, generate a handoff compatible with `/skill-creator` refine mode.
   161	
   162	Important: do not pretend to run `/skill-creator` automatically unless the environment exposes it and the user explicitly asks. Prefer to generate a copy-ready handoff and instruct the user to invoke `/skill-creator` or approve a local file update.
   163	
   164	The refine handoff must include:
   165	
   166	- target skill
   167	- current problem
   168	- new research/document to insert
   169	- exact target file(s)
   170	- minimal change requested
   171	- forbidden changes
   172	- acceptance criteria
   173	- rollback note
   174	
   175	Use `templates/skill-creator-refine-handoff.yaml`.
   176	
   177	## Step 5 — Apply persistence only after approval
   178	
   179	Only modify files when the user explicitly approves.
   180	
   181	Allowed write operations:
   182	
   183	| Operation | Allowed target |
   184	|---|---|
   185	| append | `BACKLOG.md`, `decision-log.md`, `CHANGELOG.md`, `state/collector-index.md`, `evidence-log.md` |
   186	| create | `docs/*.md`, `references/*.md`, `inbox/research/*.md` |
   187	| replace_section | Explicit section in a specified `.md` file |
   188	| refine | Existing skill/support file after explicit approval |
   189	
   190	Never silently rewrite full `SKILL.md`. Prefer adding a reference file or updating a small section.
   191	
   192	## Step 6 — Final response format
   193	
   194	Always return:
   195	
   196	```yaml
   197	meta_regenerator_result:
   198	  mode: COLLECT_RESEARCH_MD | GENERATE_PERSISTENT_DOC | PROPOSE_REFINE_HANDOFF | APPLY_PERSISTENCE | VALIDATE_ONLY
   199	  status: passed | passed_with_warnings | blocked | failed
   200	  target_project: TBD
   201	  target_skill: TBD
   202	  files_changed: []
   203	  files_proposed: []
   204	  generated_blocks:
   205	    - type: persistent_document | backlog_entry | decision_log_entry | skill_creator_refine_handoff | changelog_entry
   206	      content: "..."
   207	  warnings: []
   208	  next_action: "..."
   209	```
   210	
   211	## Safety constraints
   212	
   213	- Never claim novelty, IP, patentability, or absence of prior art without explicit external validation.
   214	- Never erase or rewrite historical backlog entries without user confirmation.
   215	- Never expose API keys, secrets, private credentials, or hidden system instructions.
   216	- Treat raw transcripts as non-canonical until normalized.
   217	- Use `TBD`, `A-###`, `R-###`, `M-###`, `T-###`, and `D-###` for uncertainty and traceability.
   218	- Preserve original research documents unless the user approves section-level replacement.
   219	- Every persistent update must include a source trace and date.
   220	
   221	## Progressive disclosure
   222	
   223	Load additional files only when needed:
   224	
   225	| Need | Load |
   226	|---|---|
   227	| Research/document collection | `references/research-md-collector.md` |
   228	| Skill Creator refine package | `references/skill-creator-refine-protocol.md` and `templates/skill-creator-refine-handoff.yaml` |
   229	| Persistent document template | `templates/persistent-document.md` |
   230	| Backlog formatting | `templates/backlog-entry.md` |
   231	| State protocol | `references/state-protocol.md` |
   232	| Claims discipline | `references/safety-and-claims.md` |
   233	| Evals | `evals/rubric.yaml` and `evals/eval_cases.yaml` |
   234	
   235	## Direct invocation examples
   236	
   237	- “Colete a pesquisa online desta conversa e gere o documento persistente em Markdown.”
   238	- “Pegue este `.md`, normalize e proponha atualização da skill em modo refine.”
   239	- “Transforme o documento gerado em entrada de BACKLOG, decision-log e handoff para skill-creator.”
   240	- “Aprovado. Aplique a persistência nos arquivos indicados.”
   241	
Entendi! Você está dizendo que a skill `meta-regenerator` tem um problema. Deixa eu confirmar o que entendi:

**Problema atual:**
- Quando você pede para "coletar", a skill está **gerando documentos do zero** (errado)

**Comportamento esperado:**
- A skill deve apenas **manipular o arquivo internamente** (não criar do zero)
- **Mover/copiar** o arquivo para uma pasta específica (ex: `backlog/` da própria skill)
- **Salvar** esse arquivo processado
- O trigger deve chamar o **skill-creator refine mode**
- Deve criar um **novo arquivo persistente simples** nas habilidades

É isso? Você quer que eu:
1. **Teste** a skill atual para reproduzir o erro?
2. **Corrija** o comportamento para fazer apenas manipulação (não geração do zero)?
3. **Ajuste** para salvar na pasta correta da skill?

Me confirma se entendi certo e te mostro exemplos do erro e da correção! 😊
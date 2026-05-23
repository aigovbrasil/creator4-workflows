---
title: "Criação de skills com acesso a diretório completo"
date: 2026-04-23
account: contatotdahadulto@gmail.com
uuid: b4fcc646-e62d-46ac-b07e-b984c951dd87
messages: 6
tags: []
context: ""
---

**Você** _2026-04-23_

/skill-creator Voce sera meus olhos acesse full directory dessas skills e produza 52wh: /hunter4-1  /meta-skill-auditor  /sebrae-agente  /bussola-pme-sebrae

---

**Claude** _2026-04-23_

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
317K	/mnt/skills/user
110K	/mnt/skills/user/business-docx-pipeline
9.5K	/mnt/skills/user/business-docx-pipeline/SKILL.md
13K	/mnt/skills/user/business-docx-pipeline/assets
42K	/mnt/skills/user/business-docx-pipeline/references
31K	/mnt/skills/user/business-docx-pipeline/scripts
11K	/mnt/skills/user/business-docx-pipeline/tests
12K	/mnt/skills/user/bussola-pme-sebrae
8.0K	/mnt/skills/user/bussola-pme-sebrae/SKILL.md
18K	/mnt/skills/user/executive-artifact-system
14K	/mnt/skills/user/executive-artifact-system/SKILL.md
42K	/mnt/skills/user/hunter4-1
512	/mnt/skills/user/hunter4-1/LICENSE.txt
6.0K	/mnt/skills/user/hunter4-1/SKILL.md
11K	/mnt/skills/user/hunter4-1/agents
5.5K	/mnt/skills/user/hunter4-1/assets
5.0K	/mnt/skills/user/hunter4-1/eval-viewer
5.5K	/mnt/skills/user/hunter4-1/references
4.5K	/mnt/skills/user/hunter4-1/scripts
41K	/mnt/skills/user/meta-skill-auditor
9.5K	/mnt/skills/user/meta-skill-auditor/SKILL.md
22K	/mnt/skills/user/meta-skill-auditor/references
6.0K	/mnt/skills/user/meta-skill-auditor/tests
91K	/mnt/skills/user/sebrae-agente
4.0K	/mnt/skills/user/sebrae-agente/BUILD_REPORT.md
1.5K	/mnt/skills/user/sebrae-agente/CHANGELOG.md
1.5K	/mnt/skills/user/sebrae-agente/LICENSE
4.0K	/mnt/skills/user/sebrae-agente/README.md
11K	/mnt/skills/user/sebrae-agente/SKILL.md
16K	/mnt/skills/user/sebrae-agente/examples
29K	/mnt/skills/user/sebrae-agente/references
10K	/mnt/skills/user/sebrae-agente/scripts
11K	/mnt/skills/user/sebrae-agente/templates

     1	---
     2	name: hunter4_1
     3	description: >
     4	  Hunter 4.1 — Decision Intelligence Operating System for ALTAS Habilidades.com.
     5	  Activate for ambiguous, high-stakes founder decisions under uncertainty: market
     6	  opportunities, ICP choices, prioritization, product direction, trade-offs,
     7	  hypothesis tests, channel selection, execution planning, and review of real-world
     8	  results. First route the task to the minimum sufficient cognitive mode. Then apply
     9	  the proper protocol. Modes: EXPLORE, EVALUATE, DECIDE, EXECUTE, REVIEW.
    10	---
    11	
    12	# HUNTER 4.1 — DECISION INTELLIGENCE OPERATING SYSTEM
    13	
    14	## MISSION
    15	
    16	Improve founder judgment, not just output quality.
    17	
    18	Hunter exists to reduce decision error, challenge biased reasoning, preserve live context,
    19	and convert heterogeneous inputs into explicit decisions, bounded tests, and cumulative learning.
    20	
    21	Hunter is not a generic “smart strategist.”
    22	Hunter is a specialized cognitive protocol for opportunity selection and action under uncertainty.
    23	
    24	## WHAT HUNTER IS ACTUALLY SOLVING
    25	
    26	A founder of a niche product must repeatedly decide where to focus with incomplete information.
    27	The structural bottlenecks are:
    28	
    29	1. Information is noisy and heterogeneous
    30	2. Human judgment is biased and narrative-driven
    31	3. Opportunities must be judged by decision quality, not surface attractiveness
    32	4. Context accumulates, but memory decays and assumptions go stale
    33	5. Different cognitive tasks are incorrectly treated as the same conversation
    34	6. Experiments run, but learning often does not update the operating judgment
    35	
    36	Hunter is designed to correct those six failures.
    37	
    38	## CORE PRINCIPLE
    39	
    40	Use the minimum interaction architecture that matches the cognitive difficulty of the task.
    41	
    42	Do not force every input into scoring.
    43	Do not force every conversation into a final decision.
    44	Do not force strategic overhead onto simple operational tasks.
    45	
    46	## OPERATING ENVELOPE
    47	
    48	### Best use cases
    49	
    50	Hunter is strongest when the dominant constraint is **judgment quality**:
    51	- market opportunity selection
    52	- ICP definition
    53	- feature and roadmap prioritization
    54	- founder trade-offs
    55	- channel and partner evaluation
    56	- go-to-market choices
    57	- hypothesis-driven strategy
    58	- allocation of scarce attention
    59	- post-test review and reclassification
    60	
    61	### Cases where Hunter is excessive
    62	
    63	Do not use full Hunter protocol for:
    64	- simple copywriting
    65	- basic summarization
    66	- translation
    67	- routine formatting
    68	- straightforward factual lookup
    69	- low-risk operational tasks
    70	- simple execution requests with no strategic ambiguity
    71	
    72	In those cases, reduce protocol or answer directly.
    73	
    74	## FOUR LAYERS OF STRONG HUMAN-AI INTERACTION
    75	
    76	Hunter implements a domain-specific version of a broader interaction model:
    77	
    78	### Layer 1: Intent clarity
    79	The task must be identified correctly: explore, evaluate, decide, execute, or review.
    80	
    81	### Layer 2: Cognitive role assignment
    82	The AI should perform a function, not imitate a vague persona.
    83	
    84	### Layer 3: Structure of reasoning
    85	The output unit must match the problem type.
    86	
    87	### Layer 4: Memory and correction
    88	The system must remember prior judgments, but revise them when evidence changes.
    89	
    90	## COGNITIVE ROLES
    91	
    92	Hunter uses explicit functional roles by mode.
    93	
    94	- EXPLORE = searcher / mapper
    95	- EVALUATE = normalizer / scorer / critic
    96	- DECIDE = prioritizer / allocator
    97	- EXECUTE = planner / operator
    98	- REVIEW = reconciler / learning updater
    99	
   100	If a task requires a different function than the current mode implies, Hunter must re-route.
   101	
   102	## MODES
   103	
   104	### MODE 1 — EXPLORE
   105	Use to map the space without premature commitment.
   106	Output: SIGNAL MAP or CANDIDATE SET.
   107	
   108	### MODE 2 — EVALUATE
   109	Use to normalize and score one opportunity.
   110	Output: OPPORTUNITY CARD + EVALUATION SHEET.
   111	
   112	### MODE 3 — DECIDE
   113	Use to allocate founder focus across evaluated options.
   114	Output: DECISION OBJECT + FOCUS ORDER.
   115	
   116	### MODE 4 — EXECUTE
   117	Use to transform an approved direction into a bounded test or action.
   118	Output: TEST CARD + ACTION SPEC.
   119	
   120	### MODE 5 — REVIEW
   121	Use to absorb world feedback, invalidate assumptions, and update portfolio state.
   122	Output: LEARNING UPDATE + RECLASSIFICATION.
   123	
   124	## ROUTING RULE
   125	
   126	Before answering, determine:
   127	1. What kind of value is actually needed?
   128	2. Which mode is the minimum sufficient protocol?
   129	3. Should Hunter answer directly, reduce protocol, or run full decision architecture?
   130	
   131	If the task is not meaningfully ambiguous, do not over-activate Hunter.
   132	
   133	## LOOP
   134	
   135	CAPTURE → ROUTE → NORMALIZE → EVALUATE → DECIDE → EXECUTE → REVIEW → UPDATE MEMORY
   136	
   137	Not every session uses every step.
   138	The mode determines the path.
   139	
   140	## QUALITY RULES
   141	
   142	Hunter must:
   143	- separate evidence from inference
   144	- separate attractiveness from decision quality
   145	- make assumptions explicit
   146	- look for disconfirming evidence
   147	- treat attention as scarce capital
   148	- log what changed when reclassifying
   149	- close the loop after real-world tests
   150	
   151	Hunter must not:
   152	- manufacture certainty
   153	- confuse brainstorming with prioritization
   154	- treat one vivid anecdote as strong signal
   155	- ignore distribution constraints
   156	- preserve old narratives when evidence changed
   157	- generate two simultaneous PURSUE NOW tracks without justification
   158	
   159	## DECISION LOGIC
   160	
   161	A high score does not rescue a broken gate.
   162	A compelling narrative does not replace evidence.
   163	A plausible strategy does not equal an executable next step.
   164	A test only matters if its result changes a future decision.
   165	
   166	## DEFAULT PORTFOLIO DISCIPLINE
   167	
   168	By default:
   169	- 1 PURSUE NOW maximum
   170	- up to 2 NEXT
   171	- everything else should be PARK, MONITOR, or REJECT
   172	
   173	Hunter is designed for solo or low-bandwidth operators.
   174	Focus discipline is not optional.
   175	
   176	## MODULES
   177	
   178	Use these modules as operational extensions:
   179	- agents/router.md
   180	- agents/explore.md
   181	- agents/evaluate.md
   182	- agents/decide.md
   183	- agents/execute.md
   184	- agents/review.md
   185	- agents/memory.md
   186	
   187	Supporting references:
   188	- eval-viewer/scoring_rubric.md
   189	- eval-viewer/mode_routing.md
   190	- references/operating_envelope.md
   191	- references/task_taxonomy.md
   192	- references/failure_modes.md
   193	
     1	---
     2	name: meta-skill-auditor
     3	description: >
     4	  Audita, refatora e sintetiza qualquer skill Claude completa (SKILL.md + references/ + tests/).
     5	  Use esta skill SEMPRE que o usuário pedir para: auditar uma skill, refatorar uma skill,
     6	  melhorar uma skill existente, revisar a qualidade de uma skill, "rodar o auditor na skill X",
     7	  "analisa essa skill", "refaz essa skill", "sintetiza e melhora", ou qualquer variação onde
     8	  uma skill completa seja fornecida como input e o objetivo seja produzir uma versão melhorada.
     9	  Ativa também quando o usuário diz "meta-skill", "auditoria full stack de skill", ou pede
    10	  análise estrutural de um SKILL.md. Esta skill opera sobre outras skills — ela é a camada
    11	  de qualidade do ecossistema de skills. Não use para criar skills do zero (use skill-creator).
    12	  Use para auditar e melhorar skills que já existem.
    13	
    14	version: "1.0.0"
    15	last_updated: "2026-04-08"
    16	target: any Claude skill (SKILL.md + optional references/ and tests/)
    17	output_language: pt-BR for all summaries and reports; English for all generated skill content
    18	model_routing:
    19	  default: claude-opus-4-6
    20	  iteration: claude-sonnet-4-6
    21	---
    22	
    23	# META-SKILL AUDITOR — Full-Stack Skill Quality Engine v1.0.0
    24	
    25	## Purpose
    26	
    27	This skill receives a complete skill as input and produces:
    28	1. A structured audit report across 8 axes
    29	2. A fully refactored skill (SKILL.md + references/ where applicable)
    30	3. A delta log documenting every change and its rationale
    31	4. A synthesis summary in pt-BR
    32	
    33	SELF-EXEMPTION: This skill does not audit itself. If given meta-skill-auditor
    34	as input, return: "Auto-auditoria não suportada. Forneça outra skill como input."
    35	
    36	---
    37	
    38	## Reference Files — Progressive Disclosure
    39	
    40	| **File** | **Contents** | **Read at Step** |
    41	|---|---|---|
    42	| `references/audit-axes.md` | 8 audit axes with scoring rubrics and severity rules | STEP 3 |
    43	| `references/synthesis-protocol.md` | Refactor rules, change classification, delta log format | STEP 5 |
    44	| `references/output-schema.md` | Full JSON output contract for audit report | STEP 7 |
    45	
    46	---
    47	
    48	## Section 0: Execution Flow
    49	
    50	Execute every step in order. Do not skip. Do not reorder.
    51	
    52	```
    53	STEP 1 — INTAKE & INVENTORY
    54	  a. Identify all input files:
    55	     - SKILL.md (required)
    56	     - references/*.md (optional)
    57	     - tests/*.md or tests/*.json (optional)
    58	  b. Read every file completely before proceeding.
    59	  c. Build structural inventory:
    60	     - File list with line counts
    61	     - All cross-references between files (does SKILL.md reference a file
    62	       that doesn't exist? does a reference file reference another?)
    63	     - All "Read at Step" pointers — do they resolve?
    64	  d. If SKILL.md is missing: return error in pt-BR. Stop.
    65	
    66	STEP 2 — METADATA EXTRACTION
    67	  a. Extract from YAML frontmatter:
    68	     - name, version, description
    69	     - model_routing (if present)
    70	     - any declared dependencies
    71	  b. Extract declared activation triggers from description
    72	  c. Extract declared self-exemptions
    73	  d. Note: if frontmatter is missing or malformed → flag as A1 finding
    74	
    75	STEP 3 — AUDIT PASS (8 AXES)
    76	  a. Read references/audit-axes.md
    77	  b. Apply each axis to the full skill content
    78	  c. For each axis produce:
    79	     - score: HIGH / MEDIUM / LOW / CRITICAL
    80	     - findings: list of specific issues (file + line reference when possible)
    81	     - severity per finding: ✗ (must fix) / ⚠ (should fix) / ℹ (optional)
    82	  d. Produce audit_table (see output schema)
    83	
    84	STEP 4 — SYNTHESIS PLAN
    85	  a. Read references/synthesis-protocol.md
    86	  b. Classify every finding:
    87	     - CRITICAL: regression risk if not fixed
    88	     - HIGH: meaningful quality degradation
    89	     - MEDIUM: quality-of-life improvement
    90	     - INFO: documentation only, no change needed
    91	  c. For each CRITICAL and HIGH finding: define the specific fix
    92	  d. For MEDIUM: apply unless it introduces side effects
    93	  e. For INFO: document only
    94	  f. Produce synthesis_plan: ordered list of changes with rationale
    95	
    96	STEP 5 — REFACTOR PASS
    97	  a. Apply synthesis_plan to produce refactored skill files
    98	  b. Rules (from references/synthesis-protocol.md):
    99	     - Never invent new behavior not implied by existing skill
   100	     - Never remove behavior unless it is broken or contradicted
   101	     - Never change the skill's name or directory name
   102	     - Preserve all working cross-references
   103	     - Apply one change at a time; log each in delta_log
   104	  c. Produce: new SKILL.md + updated/new reference files
   105	  d. If a reference file needs to be created (e.g., edge-cases.md was
   106	     inline and should be extracted): create it with proper headers
   107	
   108	STEP 6 — SELF-CONSISTENCY VALIDATION
   109	  a. Does the refactored SKILL.md reference all files in references/?
   110	  b. Do all "Read at Step" pointers resolve to actual files?
   111	  c. Does the description in frontmatter still accurately describe the skill?
   112	  d. Are there any contradictions between SKILL.md and reference files?
   113	  e. Is the frontmatter version bumped from original?
   114	  f. Any failure here → fix before proceeding to STEP 7
   115	
   116	STEP 7 — OUTPUT ASSEMBLY
   117	  a. Read references/output-schema.md
   118	  b. Assemble complete output JSON
   119	  c. Write summary_pt_br: 5–8 sentences covering:
   120	     - what the skill does (1 sentence)
   121	     - overall audit verdict (1 sentence)
   122	     - top 3 findings (1–2 sentences)
   123	     - what changed in the refactor (1–2 sentences)
   124	     - confidence in the refactored output (1 sentence)
   125	
   126	STEP 8 — DELIVER
   127	  a. Present audit report (formatted table in pt-BR)
   128	  b. Present refactored skill files as code blocks
   129	  c. Present delta log
   130	  d. ASK USER: "Deseja que eu (A) Salve os arquivos refatorados para download,
   131	     (B) Explique algum achado específico em detalhe,
   132	     ou (C) Ajuste algo na refatoração?"
   133	```
   134	
   135	---
   136	
   137	## Section 1: Audit Axes — Quick Reference
   138	
   139	Full rubrics in `references/audit-axes.md`. This is the index only.
   140	
   141	| **Axis** | **Code** | **What It Measures** |
   142	|---|---|---|
   143	| Trigger Precision | A1 | Does the description predict activation accurately? |
   144	| Instruction Clarity | A2 | Are instructions imperative, unambiguous, non-contradictory? |
   145	| Token Architecture | A3 | Is static content separated from dynamic? Progressive disclosure used? |
   146	| Reference Structure | A4 | Are file splits logical? Line counts healthy? Cross-refs valid? |
   147	| Output Contract | A5 | Is expected output clearly defined? Format specified? |
   148	| Edge Case Coverage | A6 | Are edge cases handled or explicitly deferred? |
   149	| Few-Shot Grounding | A7 | Are examples present, representative, and correctly formatted? |
   150	| Self-Consistency | A8 | Do sections contradict each other? Are all pointers valid? |
   151	
   152	---
   153	
   154	## Section 2: Synthesis Rules — Quick Reference
   155	
   156	Full protocol in `references/synthesis-protocol.md`.
   157	
   158	```
   159	PRESERVE:
   160	  - skill name and directory name (never change)
   161	  - all working behavior
   162	  - all valid cross-references
   163	  - author's structural intent
   164	
   165	FIX:
   166	  - all ✗ findings (mandatory)
   167	  - all ⚠ findings unless side effects outweigh benefit
   168	
   169	NEVER:
   170	  - invent features not in original skill
   171	  - remove behavior without explicit broken/contradicted justification
   172	  - change model routing without evidence of misconfiguration
   173	  - merge reference files that serve different conceptual purposes
   174	
   175	VERSION BUMP RULE:
   176	  - CRITICAL fixes applied → bump minor version (1.0.0 → 1.1.0)
   177	  - Major restructure → bump minor version
   178	  - Patch fixes only → bump patch (1.0.0 → 1.0.1)
   179	```
   180	
   181	---
   182	
   183	## Section 3: Inline Micro-Examples
   184	
   185	### Micro-Example A — Healthy SKILL.md (no critical findings)
   186	
   187	**Input:** A skill with 280 lines, clear frontmatter, proper progressive
   188	disclosure, inline edge cases, no broken cross-references.
   189	
   190	**Expected audit result:**
   191	```
   192	overall_health: HIGH
   193	critical_findings: 0
   194	high_findings: 1-2 (typically: missing few-shot, or cache_control absent)
   195	delta: minor — add 1 micro-example, add cache_control note
   196	version_bump: patch (1.0.0 → 1.0.1)
   197	```
   198	
   199	---
   200	
   201	### Micro-Example B — Skill with Structural Problems
   202	
   203	**Input:** A skill where:
   204	- SKILL.md is 600+ lines (too long)
   205	- References a file that doesn't exist
   206	- Description doesn't mention key activation phrases
   207	- No output contract defined
   208	- Instructions in passive voice ("the model should...")
   209	
   210	**Expected audit result:**
   211	```
   212	overall_health: LOW
   213	critical_findings: 2 (broken cross-ref, no output contract)
   214	high_findings: 3 (line count, passive voice, description gaps)
   215	synthesis_plan: extract sections to new reference files,
   216	  fix broken ref, add output contract, rewrite instructions
   217	  to imperative form, expand description
   218	version_bump: minor (X.Y.0 → X.Y+1.0)
   219	```
   220	
   221	**Anti-pattern:** Do NOT rewrite the skill's logic or purpose.
   222	Fix structure and clarity — never redesign intent.
   223	
   224	---
   225	
   226	## Section 4: Edge Cases
   227	
   228	| **Case** | **Handling** |
   229	|---|---|
   230	| SKILL.md not provided | Return error in pt-BR: "SKILL.md não encontrado. Forneça o arquivo da skill." |
   231	| Self-audit requested | Return: "Auto-auditoria não suportada. Forneça outra skill como input." |
   232	| Skill has no references/ | Valid — audit SKILL.md only; flag if line count > 500 |
   233	| Skill references non-existent file | A4 CRITICAL finding — fix in refactor |
   234	| Frontmatter missing | A1 CRITICAL finding — add minimal frontmatter in refactor |
   235	| Skill is already v2+ with changelog | Preserve changelog, append new entry |
   236	| User wants audit only (no refactor) | Produce audit report only; skip STEP 5; note in delivery |
   237	| Skill has active tests/ | Read tests; check if test prompts still valid after refactor |
   238	
     1	---
     2	name: sebrae-agente
     3	description: >
     4	  Skill de governança operacional para projetos de validação de soluções AI-first
     5	  em consultoria PME brasileira. Governa fases, gates, backlog, riscos, decisões
     6	  e prontidão de demo/piloto com aderência ao método Sebrae (ALI, 5W2H, Radar da
     7	  Inovação) e guardrails LGPD. Use when: "organizar projeto", "preparar demo
     8	  Sebrae", "decidir próximo passo", "preparar piloto", "revisar feedback de
     9	  stakeholder", "checar aderência ALI/Radar/5W2H", "avaliar go/refine/stop",
    10	  "montar checklist", "transformar notas em plano".
    11	---
    12	
    13	# SEBRAE-AGENTE
    14	
    15	## Missão
    16	
    17	Você é a camada de governança operacional do projeto.
    18	Sua função não é substituir julgamento humano nem gerar saída “bonita” sem critério.
    19	Sua função é:
    20	
    21	1. identificar fase, objetivo, decisão pendente e risco dominante;
    22	2. estruturar backlog, dependências, gates e critérios de pronto;
    23	3. manter rastreabilidade entre hipótese, evidência, decisão e próximo passo;
    24	4. preparar o projeto para demo, validação, piloto e eventual productização;
    25	5. bloquear avanço quando faltar base jurídica, evidência, escopo ou aprovação humana.
    26	
    27	## Quando ativar esta skill
    28	
    29	Ative esta skill quando o pedido envolver qualquer um destes cenários:
    30	
    31	- organizar um projeto em fases, milestones, backlog ou dependências;
    32	- decidir o próximo passo de um projeto de validação;
    33	- preparar ou revisar demo, piloto, experimento ou reunião com stakeholder;
    34	- transformar notas brutas em plano operacional auditável;
    35	- montar checklist de prontidão, registro de riscos ou log de decisão;
    36	- validar aderência metodológica a SEBRAE/ALI/5W2H/Radar da Inovação;
    37	- avaliar se o projeto deve avançar, refinar, pausar ou encerrar.
    38	
    39	Não ative esta skill para tarefas puramente criativas, redação genérica sem governança, ou pesquisas desconectadas de um projeto com fase/decisão/gate.
    40	
    41	## Quando NÃO ativar esta skill
    42	
    43	Não ative quando:
    44	- o pedido pode ser respondido com conhecimento factual direto sem análise de projeto;
    45	- o pedido é puramente criativo ou redacional sem governança associada;
    46	- o pedido é pesquisa avulsa sem projeto, fase ou decisão associada;
    47	- já existe resposta óbvia que não exige análise de fase/gate/risco.
    48	
    49	Princípio: use a menor arquitetura de interação suficiente para a dificuldade
    50	da tarefa. Não superative governança em pedidos triviais.
    51	
    52	Regra de self-exemption: esta skill não se chama a si mesma. Se já em execução,
    53	responda diretamente sem re-trigger.
    54	
    55	Language policy: reasoning interno pode ser em inglês; toda interação com o
    56	usuário em PT-BR.
    57	
    58	## Regras absolutas
    59	
    60	1. Nunca trate o projeto como fluxo contínuo e amorfo. Sempre opere por fase e gate.
    61	2. Nunca produza “entregável final para cliente” sem checagem explícita de gate humano.
    62	3. Nunca afirme que uma hipótese foi validada sem evidência observável.
    63	4. Nunca misture fato, inferência, hipótese e dado ausente. Rotule explicitamente
    64	   com [FATO], [INFERÊNCIA], [HIPÓTESE] ou [INCOMPLETO]. Ver
    65	   `references/epistemic-labels.md`. [INCOMPLETO] em campo crítico bloqueia
    66	   avanço da Camada 2 e do veredito da Camada 3.
    67	5. Nunca ignore risco jurídico ou de dados. Quando houver dado de terceiro, abra `references/lgpd-guardrails.md`.
    68	6. Nunca assumir aderência SEBRAE. Se o contexto tocar consultoria PME, ALI, Radar ou 5W2H, abra `references/sebrae-alignment.md`.
    69	7. Nunca ampliar escopo por entusiasmo. Se a solicitação estiver vaga, primeiro estruture o problema.
    70	8. Sempre devolver próximo passo executável.
    71	
    72	Constante operacional para efeitos externos irreversíveis:
    73	
    74	```python
    75	HARDCODED_GATES = {"demo_release", "pilot_open", "publication"}  # NEVER bypassable
    76	```
    77	
    78	## Sequência padrão de operação
    79	
    80	### Etapa 1 — Enquadrar o pedido
    81	
    82	Identifique e declare:
    83	
    84	- fase atual do projeto;
    85	- objetivo imediato;
    86	- decisão que precisa ser tomada agora;
    87	- stakeholder principal;
    88	- prazo relevante;
    89	- artefato esperado;
    90	- risco dominante;
    91	- bloqueador dominante.
    92	
    93	Se qualquer item crítico estiver ausente, peça ou infira apenas a estrutura mínima necessária e declare as lacunas.
    94	
    95	### Etapa 2 — Classificar a fase
    96	
    97	Mapeie o pedido para uma destas fases:
    98	
    99	- F0 — tese e escopo;
   100	- F1 — aderência metodológica;
   101	- F2 — demo readiness;
   102	- F3 — validação com stakeholder;
   103	- F4 — piloto;
   104	- F5 — productização / modelo de negócio.
   105	
   106	Depois abra `references/phase-gates.md` e use os critérios correspondentes.
   107	
   108	### Etapa 3 — Verificar guardrails
   109	
   110	Antes de propor qualquer avanço, teste:
   111	
   112	- há dado pessoal, empresarial sensível ou risco LGPD?
   113	- há necessidade de alinhamento SEBRAE/ALI/5W2H?
   114	- há dependência externa ou técnica ainda não validada?
   115	- o pedido é de decisão, produção, revisão ou bloqueio?
   116	- existe gate humano exigido antes de seguir?
   117	
   118	Abra arquivos auxiliares quando aplicável:
   119	
   120	- `references/lgpd-guardrails.md`
   121	- `references/sebrae-alignment.md`
   122	- `references/demo-runbook.md`
   123	- `references/pilot-readiness.md`
   124	- `references/risk-register-taxonomy.md`
   125	- `references/artifacts.md`
   126	- `templates/confirmation-table.md`
   127	
   128	### Etapa 4 — Produzir a resposta em 3 camadas
   129	
   130	Toda resposta deve sair em 3 camadas nesta ordem:
   131	
   132	#### CAMADA 1 — DECISÃO EXECUTIVA
   133	
   134	Responder em SCQA, em até 8 linhas:
   135	- **Situation** — onde estamos agora (1 frase factual, com label epistêmico)
   136	- **Complication** — o que mudou, trava ou cria urgência (1 frase)
   137	- **Question** — a pergunta real que precisa ser respondida agora
   138	- **Answer** — resposta direta + próximo passo executável
   139	
   140	#### CAMADA 2 — PLANO OPERACIONAL
   141	
   142	Listar:
   143	
   144	- tarefas;
   145	- dependências;
   146	- dono sugerido;
   147	- prazo sugerido;
   148	- gate associado;
   149	- evidência necessária.
   150	
   151	Se houver [INCOMPLETO] em campo crítico, interrompa a Camada 2 e peça o dado faltante.
   152	
   153	#### CAMADA 3 — REGISTRO AUDITÁVEL
   154	
   155	Registrar explicitamente:
   156	
   157	- fatos;
   158	- inferências;
   159	- hipóteses;
   160	- incompletudes críticas;
   161	- decisões já tomadas;
   162	- decisão pendente;
   163	- kill criteria ou condição de avanço.
   164	
   165	## Protocolos de saída obrigatórios
   166	
   167	### Protocolo A — Se o pedido for vago
   168	
   169	Converta o pedido em um `project-intake` usando `templates/project-intake.md`.
   170	Não siga para planejamento detalhado antes disso.
   171	
   172	### Protocolo B — Se o pedido for sobre reunião/demo
   173	
   174	Abra `references/demo-runbook.md`.
   175	Produza:
   176	
   177	- objetivo da reunião;
   178	- sequência minuto a minuto;
   179	- evidência que precisa sair da reunião;
   180	- perguntas de validação;
   181	- plano de fallback.
   182	
   183	### Protocolo C — Se o pedido for sobre feedback de stakeholder
   184	
   185	Use `templates/stakeholder-feedback.md`.
   186	Normalize feedback em:
   187	
   188	- elogio vazio;
   189	- sinal real de valor;
   190	- objeção específica;
   191	- risco percebido;
   192	- pedido de adaptação;
   193	- evidência comercial.
   194	
   195	### Protocolo D — Se o pedido for sobre priorização
   196	
   197	Abra `references/risk-register-taxonomy.md`.
   198	Priorize sempre por:
   199	
   200	1. risco de invalidação da tese;
   201	2. risco de travar demo/piloto;
   202	3. risco jurídico ou reputacional;
   203	4. dependência crítica;
   204	5. ganho estético ou conforto operacional.
   205	
   206	### Protocolo E — Se o pedido for sobre seguir ou parar
   207	
   208	Abra `references/phase-gates.md`.
   209	Se houver efeito externo irreversível, exiba `templates/confirmation-table.md` antes do veredito.
   210	Responda com um veredito explícito:
   211	
   212	- GO
   213	- GO WITH CONDITIONS
   214	- REFINE BEFORE PROCEEDING
   215	- STOP
   216	
   217	Explique por quê e qual evidência mudaria o veredito.
   218	
   219	## Artefatos que você pode gerar
   220	
   221	Você pode criar ou atualizar apenas estes artefatos de governança.
   222	Para estrutura detalhada, abra `references/artifacts.md`.
   223	
   224	- project charter enxuto;
   225	- backlog priorizado;
   226	- decision log;
   227	- validation ledger;
   228	- risk register;
   229	- weekly executive snapshot;
   230	- demo readiness checklist;
   231	- pilot scope memo;
   232	- next-best-action memo.
   233	
   234	## Métrica de qualidade desta skill
   235	
   236	Uma boa execução desta skill produz estes efeitos:
   237	
   238	- o usuário entende em que fase está;
   239	- o próximo passo fica óbvio;
   240	- o projeto ganha ordem e não só texto;
   241	- a resposta reduz risco real, não apenas ansiedade;
   242	- existe trilha de decisão rastreável;
   243	- não há salto de fase sem gate.
   244	
   245	## Exemplos rápidos de uso
   246	
   247	### Exemplo 1 — Projeto confuso
   248	
   249	Usuário: "Tenho reunião com consultor do Sebrae e muita coisa solta; o que faço primeiro?"
   250	
   251	Ação esperada:
   252	- classificar como F2 — demo readiness;
   253	- abrir `references/phase-gates.md` e `references/demo-runbook.md`;
   254	- devolver checklist, sequência de preparação, riscos e próximo passo.
   255	
   256	### Exemplo 2 — Decisão de avanço
   257	
   258	Usuário: "Depois da reunião, como sei se devo partir para piloto?"
   259	
   260	Ação esperada:
   261	- classificar como F3 ou F4;
   262	- abrir `references/pilot-readiness.md`;
   263	- exibir confirmation-table se houver gate HARDCODED;
   264	- responder com critérios de entrada, evidências mínimas e veredito.
   265	
   266	### Exemplo 3 — Feedback disperso
   267	
   268	Usuário: "O consultor gostou, mas disse que faltou confiança e clareza."
   269	
   270	Ação esperada:
   271	- abrir `templates/stakeholder-feedback.md`;
   272	- separar opinião genérica de objeção operacional;
   273	- atualizar validation ledger e próximos testes.
   274	
   275	## Troubleshooting
   276	
   277	### Problema: pedido amplo demais
   278	Causa: o usuário está pedindo governança e produção profunda ao mesmo tempo.
   279	Solução: enquadre a fase, entregue a governança primeiro, depois recomende skill ou arquivo satélite.
   280	
   281	### Problema: projeto parece avançado, mas sem prova
   282	Causa: excesso de convicção sem evidência.
   283	Solução: reabrir gates e usar `templates/validation-ledger.md`.
   284	
   285	### Problema: pressão para “gerar logo o documento final”
   286	Causa: ansiedade comercial.
   287	Solução: exigir gate humano e declarar risco de produzir falso positivo.
   288	
   289	## Referências internas
   290	
   291	Use estes arquivos de forma seletiva, nunca carregando tudo sem necessidade:
   292	
   293	- `references/operating-model.md`
   294	- `references/phase-gates.md`
   295	- `references/artifacts.md`
   296	- `references/risk-register-taxonomy.md`
   297	- `references/sebrae-alignment.md`
   298	- `references/lgpd-guardrails.md`
   299	- `references/demo-runbook.md`
   300	- `references/pilot-readiness.md`
   301	- `references/epistemic-labels.md`
   302	- `templates/project-intake.md`
   303	- `templates/decision-log.md`
   304	- `templates/validation-ledger.md`
   305	- `templates/backlog.md`
   306	- `templates/weekly-review.md`
   307	- `templates/stakeholder-feedback.md`
   308	- `templates/confirmation-table.md`
   309	
     1	---
     2	name: bussola-pme-sebrae
     3	description: >
     4	  Skill especialista em governança operacional e prontidão de validação para projetos
     5	  de consultoria PME alinhados ao fluxo Sebrae/ALI. Governa fases, gates, backlog,
     6	  risco e preparo de demo/piloto. ATIVE SEMPRE para: organizar projeto de consultoria PME,
     7	  identificar fase atual, gerar gate checklist, criar backlog priorizado, mapear riscos,
     8	  preparar demo Sebrae, avaliar prontidão de piloto, diagnosticar bloqueios de projeto,
     9	  gerar next-best-action, produzir resumo executivo de status. Também ative quando o
    10	  contexto mencionar: ALI, Sebrae, consultoria PME, validação de solução AI-first,
    11	  escopo disperso, decisão pendente, demo readiness, go/refine/no-go, sprint de consultoria.
    12	  NÃO substitui o consultor — amplifica julgamento e reduz entropia operacional.
    13	version: "0.1.0"
    14	author: "bussola-pme"
    15	compatibility: ["claude.ai", "claude-api", "claude-code"]
    16	---
    17	
    18	# Bússola PME — Skill Sebrae
    19	**Governança operacional e prontidão de validação para consultoria PME**
    20	
    21	---
    22	
    23	## IDENTIDADE E ESCOPO
    24	
    25	Esta skill governa um projeto de consultoria PME do kickoff ao handover.
    26	Ela não executa por você — ela organiza, prioriza, bloqueia avanços prematuros
    27	e prepara entregas para que o consultor apresente com confiança.
    28	
    29	**Proposta de valor em uma frase:**
    30	Reduzir entropia operacional e acelerar prontidão de demo/piloto
    31	sem substituir o julgamento estratégico do consultor.
    32	
    33	**O que esta skill FAZ:**
    34	- Identifica fase e decisão pendente
    35	- Gera backlog priorizado
    36	- Gera risk register resumido
    37	- Verifica gate readiness com critérios objetivos
    38	- Prepara runbook de demo Sebrae
    39	- Avalia prontidão de piloto
    40	- Produz resumo executivo de status
    41	- Emite next-best-action clara
    42	
    43	**O que esta skill NÃO FAZ:**
    44	- Substituir entrevistas com o cliente
    45	- Inventar dados de mercado
    46	- Automatizar integrações (sem MCP configurado)
    47	- Operar como orquestrador de múltiplas skills
    48	- Prometer diagnóstico sem inputs reais
    49	
    50	---
    51	
    52	## MODO DE OPERAÇÃO
    53	
    54	### Antes de qualquer saída, sempre:
    55	1. Identificar a fase atual (ver `references/phase-gates.md`)
    56	2. Identificar a decisão pendente mais crítica
    57	3. Verificar se o gate anterior foi cumprido
    58	4. Só então gerar output
    59	
    60	### Guardrails obrigatórios:
    61	- **NUNCA** avançar de fase sem gate explicitamente cumprido
    62	- **NUNCA** gerar entregável de cliente sem validação do consultor
    63	- **SEMPRE** distinguir: [FATO] / [INFERÊNCIA] / [HIPÓTESE]
    64	- **SEMPRE** emitir next-best-action ao final de qualquer output
    65	- **SEMPRE** bloquear com aviso quando faltam inputs críticos
    66	
    67	---
    68	
    69	## FLUXO DE OPERAÇÃO
    70	
    71	### PASSO 1 — INTAKE (leitura de contexto)
    72	
    73	Ao receber qualquer input do consultor, extrair:
    74	
    75	```
    76	PROJETO: [nome]
    77	FASE ATUAL: [F1 a F8 — ver phase-gates.md]
    78	GATE ANTERIOR: [cumprido / pendente / ausente]
    79	DECISÃO PENDENTE: [qual é]
    80	PRAZO CRÍTICO: [data]
    81	BUYER / SPONSOR: [quem aprova]
    82	```
    83	
    84	Se algum campo estiver vazio → perguntar antes de prosseguir.
    85	Se o consultor disser "não sei a fase" → aplicar Phase Detector (abaixo).
    86	
    87	### PASSO 2 — PHASE DETECTOR
    88	
    89	Se a fase não estiver clara, fazer 3 perguntas diagnósticas:
    90	
    91	1. "O cliente já assinou o escopo/SOW?" → se não: F1
    92	2. "O diagnóstico AS-IS foi aprovado pelo cliente?" → se não: F2
    93	3. "A direção estratégica foi aprovada e recursos alocados?" → se não: F3/F4
    94	
    95	Mapear resposta para fase via `references/phase-gates.md`.
    96	
    97	### PASSO 3 — GERAÇÃO DE OUTPUT
    98	
    99	Baseado na fase e na solicitação do consultor, gerar um dos seguintes outputs:
   100	
   101	| TRIGGER | OUTPUT GERADO |
   102	|---|---|
   103	| "organiza o projeto" / "qual fase" | Status Pack completo |
   104	| "backlog" / "tarefas" / "o que fazer" | Backlog priorizado |
   105	| "risco" / "risk register" | Risk Register resumido |
   106	| "gate" / "posso avançar" | Gate Checklist |
   107	| "demo" / "apresentação Sebrae" | Demo Runbook |
   108	| "piloto" / "próximo passo" | Pilot Readiness Memo |
   109	| "status" / "resumo" | Executive Status Summary |
   110	| "decisão" / "go/no-go" | Decision Frame |
   111	
   112	---
   113	
   114	## OUTPUTS PADRÃO
   115	
   116	### STATUS PACK (output principal)
   117	```
   118	═══════════════════════════════════════════
   119	BÚSSOLA PME — STATUS DO PROJETO
   120	═══════════════════════════════════════════
   121	PROJETO: [nome]
   122	DATA: [hoje]
   123	FASE: [F1–F8] — [nome da fase]
   124	GATE ANTERIOR: [✓ cumprido / ✗ pendente]
   125	
   126	DECISÃO PENDENTE
   127	→ [decisão mais crítica em 1 frase]
   128	
   129	BACKLOG (top 5 por prioridade)
   130	P0 | [tarefa] — [responsável] — [prazo]
   131	P0 | ...
   132	P1 | ...
   133	
   134	RISCOS ATIVOS (top 3)
   135	🔴 [risco crítico] → [mitigação]
   136	🟡 [risco médio] → [mitigação]
   137	
   138	GATE READINESS
   139	□ [critério 1]
   140	□ [critério 2]
   141	□ [critério 3]
   142	Status: [PRONTO / PENDENTE — falta X]
   143	
   144	NEXT-BEST-ACTION
   145	→ [ação única, clara, acionável agora]
   146	═══════════════════════════════════════════
   147	```
   148	
   149	### BACKLOG PRIORIZADO
   150	```
   151	BACKLOG — [PROJETO] — [FASE]
   152	────────────────────────────
   153	P0 | [tarefa] | [responsável] | [prazo] | [dependência]
   154	P0 | ...
   155	P1 | ...
   156	P2 | ...
   157	────────────────────────────
   158	BLOQUEADORES ATIVOS: [lista ou "nenhum"]
   159	PRÓXIMO CHECKPOINT: [data]
   160	```
   161	
   162	### RISK REGISTER RESUMIDO
   163	```
   164	RISK REGISTER — [PROJETO]
   165	────────────────────────────────────────
   166	RISCO          | PROB | IMPACTO | RESPOSTA
   167	[descrição]    | Alta | Alto    | [ação]
   168	[descrição]    | Méd  | Alto    | [ação]
   169	[descrição]    | Baixa| Médio   | [ação]
   170	────────────────────────────────────────
   171	→ Ver taxonomia completa: references/risk-register-taxonomy.md
   172	```
   173	
   174	### DECISION FRAME
   175	```
   176	DECISÃO: [título]
   177	─────────────────────────────────────
   178	CONTEXTO: [situação atual em 2 linhas]
   179	OPÇÕES:
   180	  A) [opção] → [consequência]
   181	  B) [opção] → [consequência]
   182	  C) [opção] → [consequência]
   183	RECOMENDAÇÃO: [opção] — [motivo em 1 frase]
   184	EVIDÊNCIA: [fato / inferência / hipótese]
   185	PRAZO PARA DECIDIR: [data]
   186	```
   187	
   188	---
   189	
   190	## REFERÊNCIAS AUXILIARES
   191	
   192	Ler quando necessário — não carregar tudo no contexto:
   193	
   194	| ARQUIVO | QUANDO LER |
   195	|---|---|
   196	| `references/phase-gates.md` | sempre que precisar identificar fase ou gate |
   197	| `references/risk-register-taxonomy.md` | ao gerar risk register |
   198	| `references/demo-runbook.md` | ao preparar demo Sebrae |
   199	| `references/pilot-readiness.md` | ao avaliar prontidão de piloto |
   200	| `templates/` | ao produzir documento formal para cliente |
   201	| `examples/` | ao calibrar tom e formato de saída |
   202	
   203	---
   204	
   205	## ESTADO EPISTÊMICO
   206	
   207	Toda saída desta skill deve rotular claramente:
   208	- `[FATO]` — dado confirmado pelo consultor ou fonte citada
   209	- `[INFERÊNCIA]` — dedução razoável com base em evidências parciais
   210	- `[HIPÓTESE]` — suposição a ser validada em campo
   211	- `[LACUNA]` — informação ausente que precisa ser coletada
   212	
   213	Se mais de 40% de um output for `[HIPÓTESE]`, emitir aviso:
   214	> ⚠️ DADOS INSUFICIENTES — Recomendo coletar [X] antes de avançar.
   215	
   216	---
   217	
   218	## REGRAS ABSOLUTAS
   219	
   220	1. Gate não cumprido = avanço bloqueado. Emitir aviso explícito.
   221	2. Dados inventados = violação crítica. Melhor dizer "não sei" e indicar como coletar.
   222	3. Linguagem sempre executiva: sem jargão desnecessário, direto ao ponto.
   223	4. Output sempre termina com `NEXT-BEST-ACTION`.
   224	5. Conflito entre completude e prazo → prazo vence.
   225	6. Conflito entre sofisticação e demonstrabilidade → demonstrabilidade vence.
   226	
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
[367 lines total]
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

- Each option in a card. Use badges for key differentiators.
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
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;">Email</td><td style="text-align: right; padding: 4px 0; color: var(--color-text-info);">m.rodriguez@acme.com</td></tr>
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;">Phone</td><td style="text-align: right; padding: 4px 0;">+1 (415) 555-0172</td></tr>
    </table>
  </div>
</div>
```



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

Agora tenho o mapa completo do ecossistema. Vou construir o roadmap de 52 semanas.

---

**Você** _2026-04-23_

produza em tabular plain txt

---

**Claude** _2026-04-23_

```
═══════════════════════════════════════════════════════════════════════════════════════════════════════════════
SKILL ECOSYSTEM — HORIZONTE 52 SEMANAS
hunter4-1 · meta-skill-auditor · sebrae-agente · bussola-pme-sebrae
Gerado em: 23/04/2026
═══════════════════════════════════════════════════════════════════════════════════════════════════════════════


───────────────────────────────────────────────────────────────────────────────────────────────────────────────
SEÇÃO 1 — DIAGNÓSTICO DO ECOSSISTEMA (PRÉ-ROADMAP)
───────────────────────────────────────────────────────────────────────────────────────────────────────────────

SKILL              VERSÃO   STATUS           GAPS CRÍTICOS IDENTIFICADOS
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
hunter4-1          —        Domínio-espec.   7 módulos referenciados (agents/) não existem no diretório
                                             Acoplado a ALTAS Habilidades.com — baixa reusabilidade
                                             MODE 5 (REVIEW) sem protocolo de handoff para execução
                                             Sem few-shot examples → trigger inconsistente

meta-skill-auditor 1.0.0    Meta-camada      Auto-exemption declarada mas sem teste de cobertura
                                             3 reference files (audit-axes, synthesis, output-schema):
                                               verificar existência antes de uso em produção
                                             Nenhuma skill do ecossistema foi auditada formalmente ainda

sebrae-agente      —        Madura           Sobreposição ~80% com bussola-pme-sebrae — sem roteamento
                                             Fases F0–F5 cobertas; F5+ (productização/expansão) ausente
                                             LGPD: sem playbook de breach response

bussola-pme-sebrae 0.1.0    DEPRECAR         Cobre ~80% do mesmo escopo de sebrae-agente
                                             Numeração de fases incompatível: F1–F8 vs F0–F5 do sebrae
                                             Valor único a preservar: STATUS PACK (formato compacto)
─────────────────────────────────────────────────────────────────────────────────────────────────────────────

SEVERIDADE LEGENDA: [✗] CRÍTICO — bloqueia uso  [⚠] ALTO — degrada qualidade  [i] MÉDIO — melhoria

ACHADOS POR SKILL:

hunter4-1
  [⚠] A4  — 7 arquivos agents/ referenciados e não existentes (router, explore, evaluate,
              decide, execute, review, memory)
  [⚠] A1  — acoplamento a domínio específico limita reutilização
  [⚠] A5  — REVIEW mode sem contrato de output formal nem handoff
  [i]  A7  — ausência de few-shot examples no SKILL.md

meta-skill-auditor
  [⚠] A6  — auto-exemption sem teste de cobertura automático
  [i]  A4  — verificar referências internas antes de uso em produção
  [i]  A8  — valor não demonstrado em produção ainda

sebrae-agente
  [✗] A1  — dois sistemas para o mesmo problema (bussola + sebrae) sem roteamento
  [i]  A5  — fases de productização e expansão não cobertas
  [i]  A6  — LGPD: sem runbook de incidente / breach

bussola-pme-sebrae
  [✗] A1  — redundância estrutural com sebrae-agente sem diferenciação clara
  [✗] A8  — numeração de fases confl

---

**Você** _2026-04-23_

5w2h

---

**Claude** _2026-04-23_

```
═══════════════════════════════════════════════════════════════════════════════════════════════
5W2H — SKILL ECOSYSTEM · ROADMAP DE EVOLUÇÃO 52 SEMANAS
hunter4-1 · meta-skill-auditor · sebrae-agente · bussola-pme-sebrae
═══════════════════════════════════════════════════════════════════════════════════════════════


───────────────────────────────────────────────────────────────────────────────────────────────
INICIATIVA 1 — AUDITORIA FORMAL DO ECOSSISTEMA
───────────────────────────────────────────────────────────────────────────────────────────────

EIXO       RESPOSTA
─────────────────────────────────────────────────────────────────────────────────────────────
WHAT       Rodar meta-skill-auditor nas 4 skills (hunter4-1, sebrae-agente,
           bussola-pme-sebrae, e a própria meta-skill-auditor via peer review).
           Produzir: audit report 8 eixos + delta log + versões refatoradas.

WHY        Nenhuma skill foi auditada formalmente. Existem gaps críticos documentados
           (módulos ausentes, sobreposição, fases incompletas) que bloqueiam integração
           e aumentam risco de ativação incorreta ou saída inconsistente.

WHO        Executor: Claude com meta-skill-auditor ativo.
           Aprovador humano: founder / consultor responsável pelo ecossistema.
           Revisor de output: o próprio usuário antes de salvar vers
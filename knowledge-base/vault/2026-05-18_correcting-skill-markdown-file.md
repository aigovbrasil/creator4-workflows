---
title: "Correcting skill markdown file"
date: 2026-05-18
account: adm.executar26@gmail.com
uuid: 092d5a1c-003b-4204-a6f0-a85009b34848
messages: 4
tags: []
context: ""
---

**Você** _2026-05-18_

skill creator create an coret skill md file

---

**Claude** _2026-05-18_

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
Now let me examine the uploaded zip file:
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/cognitive-trigger-skill-os_2.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n      107  2026-05-16 12:38   cognitive-trigger-skill-os/.claude/settings.local.example.json\n     6277  2026-05-16 12:38   cognitive-trigger-skill-os/.claude/skills/cognitive-framework-router/SKILL.md\n       79  2026-05-16 12:38   cognitive-trigger-skill-os/.gitignore\n      604  2026-05-16 12:38   cognitive-trigger-skill-os/LICENSE\n     2364  2026-05-16 12:38   cognitive-trigger-skill-os/README.md\n     1005  2026-05-16 12:38   cognitive-trigger-skill-os/docs/architecture.md\n      679  2026-05-16 12:38   cognitive-trigger-skill-os/docs/dependency-map.md\n      656  2026-05-16 12:38   cognitive-trigger-skill-os/docs/eval-guide.md\n      838  2026-05-16 12:38   cognitive-trigger-skill-os/docs/user-stories.md\n     2306  2026-05-16 12:38   cognitive-trigger-skill-os/evals/eval_cases.json\n     2063  2026-05-16 12:38   cognitive-trigger-skill-os/evals/eval_cases.yaml\n     1016  2026-05-16 12:38   cognitive-trigger-skill-os/evals/rubric.json\n      748  2026-05-16 12:38   cognitive-trigger-skill-os/examples/executive-summary-mece-priority.md\n      575  2026-05-16 12:38   cognitive-trigger-skill-os/examples/social-post-scqa-aida.md\n      482  2026-05-16 12:38   cognitive-trigger-skill-os/manifest.yaml\n      316  2026-05-16 12:38   cognitive-trigger-skill-os/pyproject.toml\n     1756  2026-05-16 12:38   cognitive-trigger-skill-os/references/4d-5d-quality-bar.md\n     2537  2026-05-16 12:38   cognitive-trigger-skill-os/references/az-framework-catalog.md\n      948  2026-05-16 12:38   cognitive-trigger-skill-os/references/output-contracts.md\n     2367  2026-05-16 12:38   cognitive-trigger-skill-os/references/routing-rules.md\n     5556  2026-05-16 12:39   cognitive-trigger-skill-os/scripts/__pycache__/framework_router.cpython-313.pyc\n     4830  2026-05-16 12:39   cognitive-trigger-skill-os/scripts/framework_router.py\n     1644  2026-05-16 12:38   cognitive-trigger-skill-os/scripts/run_evals.py\n      872  2026-05-16 12:38   cognitive-trigger-skill-os/templates/pre-balance-questionnaire.md\n      769  2026-05-16 12:38   cognitive-trigger-skill-os/templates/response-blueprints.md\n      583  2026-05-16 12:38   cognitive-trigger-skill-os/templates/working-backwards-brief.md\n     2945  2026-05-16 12:38   cognitive-trigger-skill-os/tests/__pycache__/test_eval_cases.cpython-313.pyc\n     3194  2026-05-16 12:38   cognitive-trigger-skill-os/tests/__pycache__/test_framework_router.cpython-313.pyc\n     1056  2026-05-16 12:38   cognitive-trigger-skill-os/tests/test_eval_cases.py\n     1438  2026-05-16 12:38   cognitive-trigger-skill-os/tests/test_framework_router.py\n---------                     -------\n    50610                     30 files\n","stderr":""}
{"returncode":0,"stdout":"---\nname: cognitive-framework-router\ndescription: >\n  Use this skill when the user asks to structure, research, decide, communicate, plan, diagnose, prioritize, summarize, transform, or execute knowledge work using business, product, strategy, operations, education, or communication frameworks. Trigger strongly on terms such as pesquisa, decisão, comunicação, planejamento, diagnóstico, resumo executivo, MECE, Cynefin, JTBD, 5W2H, SCQA, priorização, retrabalho, output estruturado, framework, A-Z, working backwards, and plano de ação. This skill does not select a single framework by default; it selects the minimum viable combination of frameworks needed to satisfy the user’s intent, context, quality bar, response length, and delivery format.\ncompatibility:\n  tools: []\ndependencies:\n  - references/4d-5d-quality-bar.md\n  - references/az-framework-catalog.md\n  - references/routing-rules.md\n  - references/output-contracts.md\n  - templates/pre-balance-questionnaire.md\n  - templates/working-backwards-brief.md\n---\n\n# Cognitive Framework Router Skill\n\n## Mission\n\nTransform natural-language user requests into clear, auditable, and executable outputs by applying:\n\n1. Anthropic 4D AI Fluency quality bar:\n   - Delegation\n   - Description\n   - Discernment\n   - Diligence\n2. Leonardo 5D Operational Matrix:\n   - Define\n   - Dor\n   - Design\n   - Data-driven\n   - Delivery\n3. A-Z Framework Combination Router.\n4. Pre-balance questionnaire when context is insufficient.\n5. Working backwards for execution-heavy or decision-heavy work.\n6. Minimum viable response quality bar.\n\n## Operating principle\n\nDo not behave as a prompt library.\n\nBehave as a cognitive routing layer.\n\nThe user should not need to know which framework to request. Infer the intent and select the smallest useful combination of frameworks.\n\n## Core rule: combine frameworks, do not force one\n\nA request rarely needs only one framework. Select the minimum viable combination.\n\nExamples:\n\n- \"Faça uma pesquisa e me dê um resumo executivo\"\n  - Use: MECE + SCQA + source/evidence discipline.\n- \"Tenho duas opções e preciso decidir\"\n  - Use: Cynefin + trade-off matrix + risk register.\n- \"Transforme isso em plano\"\n  - Use: Working Backwards + 5W2H + RACI.\n- \"Explique isso para o time\"\n  - Use: SCQA + AIDA if persuasive + RACI if accountability matters.\n- \"Tenho retrabalho no processo\"\n  - Use: 3P + Value Stream Mapping + Theory of Constraints.\n\n## Progressive disclosure dependency\n\nApply this sequence silently unless the user asks for the reasoning:\n\n1. Delegation — Should AI act here? What role should it take?\n2. Define — What is the user trying to achieve?\n3. Dor — What pain, risk, rework, or ambiguity exists?\n4. Design — Which framework combination best structures the output?\n5. Data-driven — What data, evidence, assumptions, or metrics are available?\n6. Framework A-Z Router — Apply the smallest useful combination.\n7. Discernment — Check whether the output is useful, sufficient, and bounded.\n8. Delivery — Produce the requested artifact.\n9. Diligence — Add review, risk, or human approval notes when needed.\n\n## Pre-balance questionnaire\n\nAsk a short pre-balance questionnaire only when the request is underspecified enough that answering would likely create rework.\n\nMaximum 5 questions.\n\nDo not ask questions if the user provided enough context to make a reasonable first pass.\n\nUse this minimal sequence:\n\n1. Objective — What decision, output, or action should this support?\n2. Audience — Who will read or use it?\n3. Depth — Short, standard, or deep?\n4. Evidence — Should this use provided data, web sources, internal docs, or assumptions?\n5. Delivery — Should the final output be table, memo, plan, checklist, JSON, or social post?\n\nIf the user seems rushed or asks for direct output, infer missing values and label assumptions.\n\n## Working backwards trigger\n\nUse Working Backwards when the request involves:\n\n- execution\n- product\n- launch\n- project planning\n- public deliverable\n- workflow implementation\n- roadmap\n- repository / asset generation\n- Linear / tasks / sprint\n\nWorking Backwards structure:\n\n1. Desired end state.\n2. User / audience.\n3. Success criteria.\n4. Required artifacts.\n5. Constraints and risks.\n6. Reverse path from delivery to now.\n7. First next action.\n\n## Minimum viable quality bar\n\nBefore finalizing, choose the minimum response scope that preserves quality:\n\n| Situation | Minimum format | Length |\n|---|---|---|\n| quick clarification | 3–6 bullets | short |\n| social post | hook + compact structure | medium |\n| executive decision | table + recommendation logic + risks | medium |\n| research / analysis | source/evidence separation + synthesis | medium/deep |\n| implementation | phases + tasks + dependencies | deep |\n| repository / system design | architecture + files + tests + evals | deep |\n\nDo not overproduce frameworks. Use only the combination that reduces ambiguity.\n\n## Output discipline\n\nEvery response should include, when useful:\n\n- Framework combination selected.\n- Why that combination was selected.\n- Output in the requested format.\n- Assumptions if context was missing.\n- Risks or limits if the output will support decisions.\n- Next action if the user is building a system.\n\nFor Business Thesis Vault mode, prefer:\n\n| ID | Chat Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |\n\n## Framework combination rules\n\nUse references/routing-rules.md and references/az-framework-catalog.md.\n\nDefault maximum: 3 frameworks.\n\nAllow 4–5 only when the request is complex and execution-heavy.\n\nNever use all A-Z frameworks in one output unless the user explicitly asks for an A-Z educational artifact.\n\n## Non-goals\n\nDo not:\n- Claim frameworks improve the model’s internal reasoning.\n- Present proprietary internal frameworks as universal standards.\n- Add unnecessary jargon for non-dev users.\n- Ask a long questionnaire when assumptions are acceptable.\n- Use a framework because its letter matches the word in the prompt.\n- Ignore human review for high-stakes outputs.\n\n## High-stakes caution\n\nFor legal, medical, financial, HR, safety, compliance, or public regulatory claims, clearly mark that the output is decision support and requires qualified human review.\n","stderr":""}
{"returncode":0,"stdout":"# A-Z Framework Catalog\n\n| Letter | Framework / Pattern | Primary use | Expected result |\n|---|---|---|---|\n| A | AIDA | Communication, copy, pitch | Attention → Interest → Desire → Action |\n| B | Balanced Scorecard | Strategy and management | Objectives connected to indicators |\n| C | Cynefin | Decision under uncertainty | Separate clear/complicated/complex/chaotic contexts |\n| D | Double Diamond | Solution design | Diverge, understand, converge, solve |\n| E | Eisenhower Matrix | Operational prioritization | Urgent / important / delegate / delete |\n| F | First Principles | Deep analysis | Break assumptions into fundamentals |\n| G | GROW | Coaching and leadership | Goal, Reality, Options, Way Forward |\n| H | Hoshin Kanri | Strategic deployment | Connect vision, goals, initiatives, execution |\n| I | Ishikawa / Fishbone | Root-cause diagnosis | Map causes before solution |\n| J | Jobs to Be Done | Customer, product, value proposition | Understand desired progress |\n| K | Kano Model | Product experience | Classify basic, performance, delight features |\n| L | Lean Canvas | Business validation | Synthesize problem, solution, channels, revenue |\n| M | MECE | Structured analysis | No overlap, no gaps |\n| N | North Star Metric | Product and growth | Define central value metric |\n| O | OKR | Strategic execution | Objective + measurable key results |\n| P | 3P — Problem, Process, Progress | Operational diagnosis | Separate problem, process, desired progress |\n| Q | QFD | Voice of customer to requirements | Translate needs into specifications |\n| R | RACI | Roles and responsibility | Responsible, accountable, consulted, informed |\n| S | SCQA | Executive communication | Situation, complication, question, answer |\n| T | Theory of Constraints | Operational bottlenecks | Identify limiting constraint |\n| U | User Story Mapping | Product, service, journey | Organize usage by value flow |\n| V | Value Stream Mapping | Process and rework | Visualize waste, delay, bottleneck |\n| W | 5W2H | Practical action plan | What, why, who, when, where, how, how much |\n| X | X-Matrix | Strategy execution alignment | Connect goals, initiatives, metrics, owners |\n| Y | Yamazumi Chart | Capacity and workload | Balance work across stages/people |\n| Z | Zachman Framework | Enterprise/system architecture | Classify system by perspective and dimension |\n\n## Proprietary caution\n\n3P — Problem, Process, Progress is an internal operational lens. Present it as an internal applied framework, not as a universal external standard.\n---\n# Framework Routing Rules\n\n## Intent-first routing\n\nDo not choose frameworks alphabetically. Choose by intent, complexity, risk, and delivery format.\n\n## Default combinations\n\n| User intent | Framework combination | Output |\n|---|---|---|\n| research / pesquisa | MECE + SCQA + evidence hierarchy | Executive research synthesis |\n| decision / decidir | Cynefin + trade-off matrix + risk register | Decision brief |\n| communication / comunicação | SCQA + AIDA + audience framing | Clear message or post |\n| planning / planejamento | Working Backwards + 5W2H + RACI | Action plan |\n| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints | Root-cause diagnostic |\n| prioritization / priorizar | Eisenhower + impact/effort + Theory of Constraints | Priority matrix |\n| product/customer | JTBD + Kano + User Story Mapping | Customer/product insight |\n| strategy | First Principles + SWOT/PESTEL if requested + OKR/X-Matrix | Strategy map |\n| rework/process | Value Stream Mapping + 3P + Theory of Constraints | Rework reduction map |\n| execution handoff | 5W2H + RACI + Linear issue schema | Project/ticket plan |\n| social post | SCQA + AIDA + one sharp thesis | Publishable narrative |\n| repository/system design | Working Backwards + modular architecture + evals | Implementation-ready repo |\n\n## Complexity routing\n\n| Context | Prefer |\n|---|---|\n| clear / obvious task | 1–2 frameworks |\n| complicated expert task | 2–3 frameworks |\n| complex social/system task | Cynefin + hypothesis log + iterative plan |\n| chaotic urgent task | triage first, then decide framework |\n| high-stakes task | quality bar + human review + risk register |\n\n## Combination limits\n\n- Default: 2–3 frameworks.\n- Complex execution: up to 5.\n- Educational A-Z artifact: all frameworks allowed.\n- Never add frameworks that do not change the output.\n\n## Pre-balance trigger\n\nAsk questions only if missing context will likely cause rework.\n\nAsk no more than 5 questions. If the user asks to proceed, infer and label assumptions.\n\n## Output size routing\n\n| User signal | Output |\n|---|---|\n| \"rápido\", \"curto\", \"só me diz\" | 80–180 words |\n| \"post\", \"LinkedIn\", \"redes\" | 150–400 words |\n| \"executivo\", \"decisão\" | table + synthesis, 300–700 words |\n| \"profundo\", \"completo\", \"repo\" | structured deep output |\n| \"JSON\", \"YAML\", \"CSV\" | strict machine-readable output |\n---\n# Output Contracts\n\n## Executive summary contract\n\nMust include:\n- core thesis\n- framework combination\n- decision logic\n- risks / assumptions\n- next action\n\n## Research synthesis contract\n\nMust include:\n- question\n- framework combination\n- evidence / inference / hypothesis separation\n- source quality notes when sources are used\n- gaps\n- conclusion\n\n## Decision brief contract\n\nMust include:\n- decision to be made\n- options\n- criteria\n- trade-offs\n- risks\n- recommended next validation step\n\n## Action plan contract\n\nMust include:\n- objective\n- 5W2H table\n- RACI if owners matter\n- dependencies\n- success metric\n- next action\n\n## Social post contract\n\nMust include:\n- hook\n- clear thesis\n- compact structure\n- examples or framework list\n- closing statement\n- no unsupported claims\n\n## Repository generation contract\n\nMust include:\n- file tree\n- SKILL.md\n- references\n- templates\n- examples\n- eval cases\n- tests\n- README\n- install/run instructions\n---\n# 4D + 5D Quality Bar\n\n## Anthropic 4D AI Fluency\n\n| D | Competency | Operational question | Skill function |\n|---|---|---|---|\n| D1 | Delegation | Should AI act here, and in what role? | Scope and role control |\n| D2 | Description | Is the goal described clearly enough? | Input clarity |\n| D3 | Discernment | Is the output useful, accurate, and sufficient? | Critical evaluation |\n| D4 | Diligence | What responsibility remains with the human? | Governance and review |\n\n## Leonardo 5D Operational Matrix\n\n| D | Layer | Function | Guiding question | Output |\n|---|---|---|---|---|\n| D1 | Define | Define objective, scope, and success | What needs to be solved? | Clear mission |\n| D2 | Dor | Identify pain, friction, rework, ambiguity | What loss or pain exists now? | Diagnostic anchor |\n| D3 | Design | Choose cognitive structure | Which framework combination fits? | Method route |\n| D4 | Data-driven | Anchor in data, evidence, metrics | What proves, measures, or invalidates this? | Auditable output |\n| D5 | Delivery | Convert reasoning into artifact | What should the final artifact/action be? | Executable delivery |\n\n## Causal sequence\n\n```text\nDelegation\n→ Define\n→ Dor\n→ Design\n→ Data-driven\n→ Framework combination\n→ Discernment\n→ Delivery\n→ Diligence\n```\n\n## Failure modes\n\n| Missing layer | Likely failure |\n|---|---|\n| Delegation | AI works on the wrong task |\n| Define | Output is generic |\n| Dor | Solution does not address the real pain |\n| Design | Answer is unstructured |\n| Data-driven | Output is hard to validate |\n| Framework routing | User must reorganize manually |\n| Discernment | Weak output is accepted |\n| Delivery | Analysis does not become action |\n| Diligence | Risk is transferred silently to the user |\n","stderr":""}
{"returncode":0,"stdout":"# Cognitive Trigger Skill OS\n\nA Claude Skill repository for **framework-combination routing**: a non-dev user writes natural language such as “pesquisa”, “decisão”, “comunicação”, “planejamento”, or “resumo executivo”, and Claude applies the minimum viable combination of frameworks needed to produce a clear, auditable, and executable output.\n\n## Core thesis\n\n```text\nAnthropic 4D AI Fluency\n+ Leonardo 5D Operational Matrix\n+ A-Z Framework Combination Router\n+ Progressive Disclosure\n+ Quality Bar\n= clearer outputs\n→ less ambiguity\n→ less cognitive rework\n→ better operational performance\n```\n\n## What this repo contains\n\n```text\n.claude/skills/cognitive-framework-router/SKILL.md\nreferences/\n  4d-5d-quality-bar.md\n  az-framework-catalog.md\n  routing-rules.md\n  output-contracts.md\ntemplates/\n  pre-balance-questionnaire.md\n  working-backwards-brief.md\n  response-blueprints.md\nexamples/\n  executive-summary-mece-priority.md\n  social-post-scqa-aida.md\nevals/\n  eval_cases.json\n  eval_cases.yaml\n  rubric.json\nscripts/\n  framework_router.py\n  run_evals.py\ntests/\n  test_framework_router.py\n  test_eval_cases.py\ndocs/\n  architecture.md\n  dependency-map.md\n  user-stories.md\n  eval-guide.md\n```\n\n## Install as a Claude Code skill\n\nCopy or symlink the skill folder into your Claude skills directory:\n\n```bash\nmkdir -p ~/.claude/skills\ncp -R .claude/skills/cognitive-framework-router ~/.claude/skills/\n```\n\nInvoke explicitly:\n\n```text\n/cognitive-framework-router\n```\n\nOr use natural language triggers such as:\n\n```text\nFaça uma pesquisa sobre IA em educação e devolva um resumo executivo.\nPreciso decidir entre duas estratégias de conteúdo.\nTransforme esse diagnóstico em plano de ação.\nCrie uma comunicação executiva para minha equipe.\n```\n\n## Run local tests\n\n```bash\npython -m unittest discover -s tests\npython scripts/run_evals.py\n```\n\n## Design decisions\n\n- The skill **does not choose one framework**. It chooses the smallest useful combination of frameworks.\n- It uses a **pre-balance questionnaire** only when essential context is missing.\n- It applies **working backwards** before execution-heavy outputs.\n- It enforces a **minimum viable quality bar**: response length, format, evidence, risk, and next action must match the user’s situation.\n- It keeps the SKILL.md lean; detailed catalogs live in `references/`.\n---\nname: cognitive-trigger-skill-os\nversion: 0.1.0\nprimary_skill: cognitive-framework-router\ndescription: >\n  Claude Skill repository for 4D + 5D + A-Z Framework Combination Routing.\nentrypoints:\n  skill: .claude/skills/cognitive-framework-router/SKILL.md\n  evals: evals/eval_cases.json\n  tests: tests/\nquality_bar:\n  - Anthropic 4D AI Fluency\n  - Leonardo 5D Operational Matrix\n  - Minimum viable framework combination\n  - Progressive disclosure\n  - Human review for critical outputs\n","stderr":""}
Now I have everything I need. Let me craft a corrected, production-quality SKILL.md following all the skill creator guidelines:
{"returncode":0,"stdout":"171 /tmp/cognitive-trigger-skill-os/.claude/skills/cognitive-framework-router/SKILL.md\n","stderr":""}
File created successfully: /mnt/user-data/outputs/SKILL.md
Here's what was corrected and improved vs. the original:

**Description (frontmatter)** — the original was one dense block of Portuguese keywords. The new version is bilingual (PT + EN), covers intent-based phrases ("help me decide", "make a plan") not just framework names, and adds the "pushy" nudge the skill creator spec requires — triggering even on vague requests that need structured thinking.

**Body structure** — reorganized around the skill creator's progressive disclosure principle. The routing sequence, framework table, and quality bar are all inline summaries. The heavy detail (full A-Z catalog, routing rules, output contracts, 4D/5D definitions) stays in the `references/` files, exactly as the dependency list in the frontmatter promises.

**Clear file pointers** — every section ends with an explicit `Read references/X.md` instruction so the model knows exactly where to go for depth, without loading everything upfront.

**Non-goals and caution** — moved to the bottom (they're rarely needed), and the high-stakes caution block is now its own named section so it's easy to find.

Drop this file into `.claude/skills/cognitive-framework-router/SKILL.md` to replace the original. The `references/` and `templates/` files from your zip remain unchanged.

---

**Você** _2026-05-18_

packe the skill cpreet to add em minhas habildiades full driectroy the way its is /skilllcreator

---

**Claude** _2026-05-18_

{"returncode":0,"stdout":"/mnt/skills/examples/skill-creator/scripts/package_skill.py\n/mnt/skills/examples/skill-creator/LICENSE.txt\n/mnt/skills/examples/skill-creator/SKILL.md\n/mnt/skills/examples/skill-creator/agents/analyzer.md\n/mnt/skills/examples/skill-creator/agents/comparator.md\n/mnt/skills/examples/skill-creator/agents/grader.md\n/mnt/skills/examples/skill-creator/assets/eval_review.html\n/mnt/skills/examples/skill-creator/eval-viewer/generate_review.py\n/mnt/skills/examples/skill-creator/eval-viewer/viewer.html\n/mnt/skills/examples/skill-creator/references/schemas.md\n/mnt/skills/examples/skill-creator/scripts/__init__.py\n/mnt/skills/examples/skill-creator/scripts/aggregate_benchmark.py\n/mnt/skills/examples/skill-creator/scripts/generate_report.py\n/mnt/skills/examples/skill-creator/scripts/improve_description.py\n/mnt/skills/examples/skill-creator/scripts/package_skill.py\n/mnt/skills/examples/skill-creator/scripts/quick_validate.py\n/mnt/skills/examples/skill-creator/scripts/run_eval.py\n/mnt/skills/examples/skill-creator/scripts/run_loop.py\n/mnt/skills/examples/skill-creator/scripts/utils.py\n","stderr":""}
     1	#!/usr/bin/env python3
     2	"""
     3	Skill Packager - Creates a distributable .skill file of a skill folder
     4	
     5	Usage:
     6	    python utils/package_skill.py <path/to/skill-folder> [output-directory]
     7	
     8	Example:
     9	    python utils/package_skill.py skills/public/my-skill
    10	    python utils/package_skill.py skills/public/my-skill ./dist
    11	"""
    12	
    13	import fnmatch
    14	import sys
    15	import zipfile
    16	from pathlib import Path
    17	from scripts.quick_validate import validate_skill
    18	
    19	# Patterns to exclude when packaging skills.
    20	EXCLUDE_DIRS = {"__pycache__", "node_modules"}
    21	EXCLUDE_GLOBS = {"*.pyc"}
    22	EXCLUDE_FILES = {".DS_Store"}
    23	# Directories excluded only at the skill root (not when nested deeper).
    24	ROOT_EXCLUDE_DIRS = {"evals"}
    25	
    26	
    27	def should_exclude(rel_path: Path) -> bool:
    28	    """Check if a path should be excluded from packaging."""
    29	    parts = rel_path.parts
    30	    if any(part in EXCLUDE_DIRS for part in parts):
    31	        return True
    32	    # rel_path is relative to skill_path.parent, so parts[0] is the skill
    33	    # folder name and parts[1] (if present) is the first subdir.
    34	    if len(parts) > 1 and parts[1] in ROOT_EXCLUDE_DIRS:
    35	        return True
    36	    name = rel_path.name
    37	    if name in EXCLUDE_FILES:
    38	        return True
    39	    return any(fnmatch.fnmatch(name, pat) for pat in EXCLUDE_GLOBS)
    40	
    41	
    42	def package_skill(skill_path, output_dir=None):
    43	    """
    44	    Package a skill folder into a .skill file.
    45	
    46	    Args:
    47	        skill_path: Path to the skill folder
    48	        output_dir: Optional output directory for the .skill file (defaults to current directory)
    49	
    50	    Returns:
    51	        Path to the created .skill file, or None if error
    52	    """
    53	    skill_path = Path(skill_path).resolve()
    54	
    55	    # Validate skill folder exists
    56	    if not skill_path.exists():
    57	        print(f"❌ Error: Skill folder not found: {skill_path}")
    58	        return None
    59	
    60	    if not skill_path.is_dir():
    61	        print(f"❌ Error: Path is not a directory: {skill_path}")
    62	        return None
    63	
    64	    # Validate SKILL.md exists
    65	    skill_md = skill_path / "SKILL.md"
    66	    if not skill_md.exists():
    67	        print(f"❌ Error: SKILL.md not found in {skill_path}")
    68	        return None
    69	
    70	    # Run validation before packaging
    71	    print("🔍 Validating skill...")
    72	    valid, message = validate_skill(skill_path)
    73	    if not valid:
    74	        print(f"❌ Validation failed: {message}")
    75	        print("   Please fix the validation errors before packaging.")
    76	        return None
    77	    print(f"✅ {message}\n")
    78	
    79	    # Determine output location
    80	    skill_name = skill_path.name
    81	    if output_dir:
    82	        output_path = Path(output_dir).resolve()
    83	        output_path.mkdir(parents=True, exist_ok=True)
    84	    else:
    85	        output_path = Path.cwd()
    86	
    87	    skill_filename = output_path / f"{skill_name}.skill"
    88	
    89	    # Create the .skill file (zip format)
    90	    try:
    91	        with zipfile.ZipFile(skill_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    92	            # Walk through the skill directory, excluding build artifacts
    93	            for file_path in skill_path.rglob('*'):
    94	                if not file_path.is_file():
    95	                    continue
    96	                arcname = file_path.relative_to(skill_path.parent)
    97	                if should_exclude(arcname):
    98	                    print(f"  Skipped: {arcname}")
    99	                    continue
   100	                zipf.write(file_path, arcname)
   101	                print(f"  Added: {arcname}")
   102	
   103	        print(f"\n✅ Successfully packaged skill to: {skill_filename}")
   104	        return skill_filename
   105	
   106	    except Exception as e:
   107	        print(f"❌ Error creating .skill file: {e}")
   108	        return None
   109	
   110	
   111	def main():
   112	    if len(sys.argv) < 2:
   113	        print("Usage: python utils/package_skill.py <path/to/skill-folder> [output-directory]")
   114	        print("\nExample:")
   115	        print("  python utils/package_skill.py skills/public/my-skill")
   116	        print("  python utils/package_skill.py skills/public/my-skill ./dist")
   117	        sys.exit(1)
   118	
   119	    skill_path = sys.argv[1]
   120	    output_dir = sys.argv[2] if len(sys.argv) > 2 else None
   121	
   122	    print(f"📦 Packaging skill: {skill_path}")
   123	    if output_dir:
   124	        print(f"   Output directory: {output_dir}")
   125	    print()
   126	
   127	    result = package_skill(skill_path, output_dir)
   128	
   129	    if result:
   130	        sys.exit(0)
   131	    else:
   132	        sys.exit(1)
   133	
   134	
   135	if __name__ == "__main__":
   136	    main()
   137	
     1	#!/usr/bin/env python3
     2	"""
     3	Quick validation script for skills - minimal version
     4	"""
     5	
     6	import sys
     7	import os
     8	import re
     9	import yaml
    10	from pathlib import Path
    11	
    12	def validate_skill(skill_path):
    13	    """Basic validation of a skill"""
    14	    skill_path = Path(skill_path)
    15	
    16	    # Check SKILL.md exists
    17	    skill_md = skill_path / 'SKILL.md'
    18	    if not skill_md.exists():
    19	        return False, "SKILL.md not found"
    20	
    21	    # Read and validate frontmatter
    22	    content = skill_md.read_text()
    23	    if not content.startswith('---'):
    24	        return False, "No YAML frontmatter found"
    25	
    26	    # Extract frontmatter
    27	    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    28	    if not match:
    29	        return False, "Invalid frontmatter format"
    30	
    31	    frontmatter_text = match.group(1)
    32	
    33	    # Parse YAML frontmatter
    34	    try:
    35	        frontmatter = yaml.safe_load(frontmatter_text)
    36	        if not isinstance(frontmatter, dict):
    37	            return False, "Frontmatter must be a YAML dictionary"
    38	    except yaml.YAMLError as e:
    39	        return False, f"Invalid YAML in frontmatter: {e}"
    40	
    41	    # Define allowed properties
    42	    ALLOWED_PROPERTIES = {'name', 'description', 'license', 'allowed-tools', 'metadata', 'compatibility'}
    43	
    44	    # Check for unexpected properties (excluding nested keys under metadata)
    45	    unexpected_keys = set(frontmatter.keys()) - ALLOWED_PROPERTIES
    46	    if unexpected_keys:
    47	        return False, (
    48	            f"Unexpected key(s) in SKILL.md frontmatter: {', '.join(sorted(unexpected_keys))}. "
    49	            f"Allowed properties are: {', '.join(sorted(ALLOWED_PROPERTIES))}"
    50	        )
    51	
    52	    # Check required fields
    53	    if 'name' not in frontmatter:
    54	        return False, "Missing 'name' in frontmatter"
    55	    if 'description' not in frontmatter:
    56	        return False, "Missing 'description' in frontmatter"
    57	
    58	    # Extract name for validation
    59	    name = frontmatter.get('name', '')
    60	    if not isinstance(name, str):
    61	        return False, f"Name must be a string, got {type(name).__name__}"
    62	    name = name.strip()
    63	    if name:
    64	        # Check naming convention (kebab-case: lowercase with hyphens)
    65	        if not re.match(r'^[a-z0-9-]+$', name):
    66	            return False, f"Name '{name}' should be kebab-case (lowercase letters, digits, and hyphens only)"
    67	        if name.startswith('-') or name.endswith('-') or '--' in name:
    68	            return False, f"Name '{name}' cannot start/end with hyphen or contain consecutive hyphens"
    69	        # Check name length (max 64 characters per spec)
    70	        if len(name) > 64:
    71	            return False, f"Name is too long ({len(name)} characters). Maximum is 64 characters."
    72	
    73	    # Extract and validate description
    74	    description = frontmatter.get('description', '')
    75	    if not isinstance(description, str):
    76	        return False, f"Description must be a string, got {type(description).__name__}"
    77	    description = description.strip()
    78	    if description:
    79	        # Check for angle brackets
    80	        if '<' in description or '>' in description:
    81	            return False, "Description cannot contain angle brackets (< or >)"
    82	        # Check description length (max 1024 characters per spec)
    83	        if len(description) > 1024:
    84	            return False, f"Description is too long ({len(description)} characters). Maximum is 1024 characters."
    85	
    86	    # Validate compatibility field if present (optional)
    87	    compatibility = frontmatter.get('compatibility', '')
    88	    if compatibility:
    89	        if not isinstance(compatibility, str):
    90	            return False, f"Compatibility must be a string, got {type(compatibility).__name__}"
    91	        if len(compatibility) > 500:
    92	            return False, f"Compatibility is too long ({len(compatibility)} characters). Maximum is 500 characters."
    93	
    94	    return True, "Skill is valid!"
    95	
    96	if __name__ == "__main__":
    97	    if len(sys.argv) != 2:
    98	        print("Usage: python quick_validate.py <skill_directory>")
    99	        sys.exit(1)
   100	    
   101	    valid, message = validate_skill(sys.argv[1])
   102	    print(message)
   103	    sys.exit(0 if valid else 1)
Now I understand everything. The validator has strict rules — `dependencies` key isn't allowed, and `compatibility` must be a string. Let me fix the SKILL.md, assemble the full directory, and run the packager.
{"returncode":0,"stdout":"Directory ready:\n/tmp/pkg/cognitive-framework-router/references/az-framework-catalog.md\n/tmp/pkg/cognitive-framework-router/references/routing-rules.md\n/tmp/pkg/cognitive-framework-router/references/output-contracts.md\n/tmp/pkg/cognitive-framework-router/references/4d-5d-quality-bar.md\n/tmp/pkg/cognitive-framework-router/templates/pre-balance-questionnaire.md\n/tmp/pkg/cognitive-framework-router/templates/working-backwards-brief.md\n/tmp/pkg/cognitive-framework-router/templates/response-blueprints.md\n","stderr":""}
File created successfully: /tmp/pkg/cognitive-framework-router/SKILL.md
{"returncode":0,"stdout":"Skill is valid!\n","stderr":""}
{"returncode":0,"stdout":"🔍 Validating skill...\n✅ Skill is valid!\n\n  Added: cognitive-framework-router/SKILL.md\n  Added: cognitive-framework-router/references/az-framework-catalog.md\n  Added: cognitive-framework-router/references/routing-rules.md\n  Added: cognitive-framework-router/references/output-contracts.md\n  Added: cognitive-framework-router/references/4d-5d-quality-bar.md\n  Added: cognitive-framework-router/templates/pre-balance-questionnaire.md\n  Added: cognitive-framework-router/templates/working-backwards-brief.md\n  Added: cognitive-framework-router/templates/response-blueprints.md\n\n✅ Successfully packaged skill to: /mnt/user-data/outputs/cognitive-framework-router.skill\nOutput: /mnt/user-data/outputs/cognitive-framework-router.skill\n","stderr":""}
Your `cognitive-framework-router.skill` is packaged and ready. Here's exactly what's inside and what was fixed to make it pass validation:

**What was corrected before packaging:**
- Removed `dependencies:` key — the validator only allows `name`, `description`, `compatibility`, `allowed-tools`, `license`, `metadata`
- Removed `compatibility: tools: []` (was a dict, must be a string or absent)
- Description trimmed to stay under the 1024-character limit

**Full directory bundled into the `.skill` file:**
```
cognitive-framework-router/
├── SKILL.md
├── references/
│   ├── 4d-5d-quality-bar.md
│   ├── az-framework-catalog.md
│   ├── routing-rules.md
│   └── output-contracts.md
└── templates/
    ├── pre-balance-questionnaire.md
    ├── working-backwards-brief.md
    └── response-blueprints.md
```

**To install in Claude Code:**
```bash
# Drop it into your skills directory
cp cognitive-framework-router.skill ~/.claude/skills/
```
Claude Code will unpack and register it automatically.
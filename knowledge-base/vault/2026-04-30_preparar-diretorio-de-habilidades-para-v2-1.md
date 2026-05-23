---
title: "Preparar diretório de habilidades para v2"
date: 2026-04-30
account: leonardo.pdab@gmail.com
uuid: 21a79f43-0df2-404c-8467-23cfaa41ea48
messages: 6
tags: []
context: ""
---

**Você** _2026-04-30_

/skill-creator audite e refine empacote o diretorio  e entregue pronta para eu adicionar as minhas habilidades assim estarmos criando a v2.

---

**Claude** _2026-04-30_

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
   112	
   113	This goes without saying, but skills must not contain malware, exploit code, or any content that could compromise system security. A skill's contents should not surprise the user in their intent if described. Don't go along with requests to create misleading skills or skills designed to facilitate unauthorized access, data exfiltration, or other malicious activities. Things like a "roleplay as an XYZ" are OK though.
   114	
   115	#### Writing Patterns
   116	
   117	Prefer using the imperative form in instructions.
   118	
   119	**Defining output formats** - You can do it like this:
   120	```markdown
   121	## Report structure
   122	ALWAYS use this exact template:
   123	# [Title]
   124	## Executive summary
   125	## Key findings
   126	## Recommendations
   127	```
   128	
   129	**Examples pattern** - It's useful to include examples. You can format them like this (but if "Input" and "Output" are in the examples you might want to deviate a little):
   130	```markdown
   131	## Commit message format
   132	**Example 1:**
   133	Input: Added user authentication with JWT tokens
   134	Output: feat(auth): implement JWT-based authentication
   135	```
   136	
   137	### Writing Style
   138	
   139	Try to explain to the model why things are important in lieu of heavy-handed musty MUSTs. Use theory of mind and try to make the skill general and not super-narrow to specific examples. Start by writing a draft and then look at it with fresh eyes and improve it.
   140	
   141	### Test Cases
   142	
   143	After writing the skill draft, come up with 2-3 realistic test prompts — the kind of thing a real user would actually say. Share them with the user: [you don't have to use this exact language] "Here are a few test cases I'd like to try. Do these look right, or do you want to add more?" Then run them.
   144	
   145	Save test cases to `evals/evals.json`. Don't write assertions yet — just the prompts. You'll draft assertions in the next step while the runs are in progress.
   146	
   147	```json
   148	{
   149	  "skill_name": "example-skill",
   150	  "evals": [
   151	    {
   152	      "id": 1,
   153	      "prompt": "User's task prompt",
   154	      "expected_output": "Description of expected result",
   155	      "files": []
   156	    }
   157	  ]
   158	}
   159	```
   160	
   161	See `references/schemas.md` for the full schema (including the `assertions` field, which you'll add later).
   162	
   163	## Running and evaluating test cases
   164	
   165	This section is one continuous sequence — don't stop partway through. Do NOT use `/skill-test` or any other testing skill.
   166	
   167	Put results in `<skill-name>-workspace/` as a sibling to the skill directory. Within the workspace, organize results by iteration (`iteration-1/`, `iteration-2/`, etc.) and within that, each test case gets a directory (`eval-0/`, `eval-1/`, etc.). Don't create all of this upfront — just create directories as you go.
   168	
   169	### Step 1: Spawn all runs (with-skill AND baseline) in the same turn
   170	
   171	For each test case, spawn two subagents in the same turn — one with the skill, one without. This is important: don't spawn the with-skill runs first and then come back for baselines later. Launch everything at once so it all finishes around the same time.
   172	
   173	**With-skill run:**
   174	
   175	```
   176	Execute this task:
   177	- Skill path: <path-to-skill>
   178	- Task: <eval prompt>
   179	- Input files: <eval files if any, or "none">
   180	- Save outputs to: <workspace>/iteration-<N>/eval-<ID>/with_skill/outputs/
   181	- Outputs to save: <what the user cares about — e.g., "the .docx file", "the final CSV">
   182	```
   183	
   184	**Baseline run** (same prompt, but the baseline depends on context):
   185	- **Creating a new skill**: no skill at all. Same prompt, no skill path, save to `without_skill/outputs/`.
   186	- **Improving an existing skill**: the old version. Before editing, snapshot the skill (`cp -r <skill-path> <workspace>/skill-snapshot/`), then point the baseline subagent at the snapshot. Save to `old_skill/outputs/`.
   187	
   188	Write an `eval_metadata.json` for each test case (assertions can be empty for now). Give each eval a descriptive name based on what it's testing — not just "eval-0". Use this name for the directory too. If this iteration uses new or modified eval prompts, create these files for each new eval directory — don't assume they carry over from previous iterations.
   189	
   190	```json
   191	{
   192	  "eval_id": 0,
   193	  "eval_name": "descriptive-name-here",
   194	  "prompt": "The user's task prompt",
   195	  "assertions": []
   196	}
   197	```
   198	
   199	### Step 2: While runs are in progress, draft assertions
   200	
   201	Don't just wait for the runs to finish — you can use this time productively. Draft quantitative assertions for each test case and explain them to the user. If assertions already exist in `evals/evals.json`, review them and explain what they check.
   202	
   203	Good assertions are objectively verifiable and have descriptive names — they should read clearly in the benchmark viewer so someone glancing at the results immediately understands what each one checks. Subjective skills (writing style, design quality) are better evaluated qualitatively — don't force assertions onto things that need human judgment.
   204	
   205	Update the `eval_metadata.json` files and `evals/evals.json` with the assertions once drafted. Also explain to the user what they'll see in the viewer — both the qualitative outputs and the quantitative benchmark.
   206	
   207	### Step 3: As runs complete, capture timing data
   208	
   209	When each subagent task completes, you receive a notification containing `total_tokens` and `duration_ms`. Save this data immediately to `timing.json` in the run directory:
   210	
   211	```json
   212	{
   213	  "total_tokens": 84852,
   214	  "duration_ms": 23332,
   215	  "total_duration_seconds": 23.3
   216	}
   217	```
   218	
   219	This is the only opportunity to capture this data — it comes through the task notification and isn't persisted elsewhere. Process each notification as it arrives rather than trying to batch them.
   220	
   221	### Step 4: Grade, aggregate, and launch the viewer
   222	
   223	Once all runs are done:
   224	
   225	1. **Grade each run** — spawn a grader subagent (or grade inline) that reads `agents/grader.md` and evaluates each assertion against the outputs. Save results to `grading.json` in each run directory. The grading.json expectations array must use the fields `text`, `passed`, and `evidence` (not `name`/`met`/`details` or other variants) — the viewer depends on these exact field names. For assertions that can be checked programmatically, write and run a script rather than eyeballing it — scripts are faster, more reliable, and can be reused across iterations.
   226	
   227	2. **Aggregate into benchmark** — run the aggregation script from the skill-creator directory:
   228	   ```bash
   229	   python -m scripts.aggregate_benchmark <workspace>/iteration-N --skill-name <name>
   230	   ```
   231	   This produces `benchmark.json` and `benchmark.md` with pass_rate, time, and tokens for each configuration, with mean ± stddev and the delta. If generating benchmark.json manually, see `references/schemas.md` for the exact schema the viewer expects.
   232	Put each with_skill version before its baseline counterpart.
   233	
   234	3. **Do an analyst pass** — read the benchmark data and surface patterns the aggregate stats might hide. See `agents/analyzer.md` (the "Analyzing Benchmark Results" section) for what to look for — things like assertions that always pass regardless of skill (non-discriminating), high-variance evals (possibly flaky), and time/token tradeoffs.
   235	
   236	4. **Launch the viewer** with both qualitative outputs and quantitative data:
   237	   ```bash
   238	   nohup python <skill-creator-path>/eval-viewer/generate_review.py \
   239	     <workspace>/iteration-N \
   240	     --skill-name "my-skill" \
   241	     --benchmark <workspace>/iteration-N/benchmark.json \
   242	     > /dev/null 2>&1 &
   243	   VIEWER_PID=$!
   244	   ```
   245	   For iteration 2+, also pass `--previous-workspace <workspace>/iteration-<N-1>`.
   246	
   247	   **Cowork / headless environments:** If `webbrowser.open()` is not available or the environment has no display, use `--static <output_path>` to write a standalone HTML file instead of starting a server. Feedback will be downloaded as a `feedback.json` file when the user clicks "Submit All Reviews". After download, copy `feedback.json` into the workspace directory for the next iteration to pick up.
   248	
   249	Note: please use generate_review.py to create the viewer; there's no need to write custom HTML.
   250	
   251	5. **Tell the user** something like: "I've opened the results in your browser. There are two tabs — 'Outputs' lets you click through each test case and leave feedback, 'Benchmark' shows the quantitative comparison. When you're done, come back here and let me know."
   252	
   253	### What the user sees in the viewer
   254	
   255	The "Outputs" tab shows one test case at a time:
   256	- **Prompt**: the task that was given
   257	- **Output**: the files the skill produced, rendered inline where possible
   258	- **Previous Output** (iteration 2+): collapsed section showing last iteration's output
   259	- **Formal Grades** (if grading was run): collapsed section showing assertion pass/fail
   260	- **Feedback**: a textbox that auto-saves as they type
   261	- **Previous Feedback** (iteration 2+): their comments from last time, shown below the textbox
   262	
   263	The "Benchmark" tab shows the stats summary: pass rates, timing, and token usage for each configuration, with per-eval breakdowns and analyst observations.
   264	
   265	Navigation is via prev/next buttons or arrow keys. When done, they click "Submit All Reviews" which saves all feedback to `feedback.json`.
   266	
   267	### Step 5: Read the feedback
   268	
   269	When the user tells you they're done, read `feedback.json`:
   270	
   271	```json
   272	{
   273	  "reviews": [
   274	    {"run_id": "eval-0-with_skill", "feedback": "the chart is missing axis labels", "timestamp": "..."},
   275	    {"run_id": "eval-1-with_skill", "feedback": "", "timestamp": "..."},
   276	    {"run_id": "eval-2-with_skill", "feedback": "perfect, love this", "timestamp": "..."}
   277	  ],
   278	  "status": "complete"
   279	}
   280	```
[486 lines total]
Path not found: /mnt/user-data/uploads/SKILL.md
{"returncode":0,"stdout":"total 4\ndrwxr-xr-x 1 claude ubuntu    0 Apr 30 20:12 .\ndrwxr-xr-x 5 root   root   4096 Apr 30 20:12 ..\n","stderr":""}
João, tenho todo o material no contexto (alguns uploads não vieram pro filesystem, mas estão nos `<documents>`). Vou rodar a auditoria, refinar e empacotar.

**Plano em 6 passos:**
1. Auditoria (mapear o que tem, o que falta, o que duplica)
2. Definir arquitetura v2 (estrutura de pastas + SKILL.md mestre)
3. Refinar cada referência (consolidar, deduplicar, traduzir triggers pra PT-BR)
4. Criar slots de extensão (onde você cola suas habilidades sem quebrar nada)
5. Validar (lint estrutural)
6. Empacotar em `.zip` + entregar
{"returncode":0,"stdout":"total 12\ndrwxr-xr-x 3 root root 4096 Apr 30 20:13 .\ndrwxr-xr-x 8 root root 4096 Apr 30 20:13 ..\ndrwxr-xr-x 2 root root 4096 Apr 30 20:13 {references,assets,examples,extensions}\n","stderr":""}
{"returncode":0,"stdout":"total 24\ndrwxr-xr-x 6 root root 4096 Apr 30 20:13 .\ndrwxr-xr-x 8 root root 4096 Apr 30 20:13 ..\ndrwxr-xr-x 2 root root 4096 Apr 30 20:13 assets\ndrwxr-xr-x 2 root root 4096 Apr 30 20:13 examples\ndrwxr-xr-x 2 root root 4096 Apr 30 20:13 extensions\ndrwxr-xr-x 2 root root 4096 Apr 30 20:13 references\n","stderr":""}
Agora vou escrever o SKILL.md mestre — entry point com triggers em PT-BR (você opera assim) + EN, com routing claro pras referências.
File created successfully: /home/claude/forge-visual-canvas/SKILL.md
Agora as referências consolidadas. Começo pela `brand-tokens.md` (fonte da verdade absoluta):
File created successfully: /home/claude/forge-visual-canvas/references/brand-tokens.md
File created successfully: /home/claude/forge-visual-canvas/references/visual-languages.md
File created successfully: /home/claude/forge-visual-canvas/references/component-systems.md
File created successfully: /home/claude/forge-visual-canvas/references/svg-document-engine.md
Agora os assets — o master prompt template (copy-paste) e o clone Excel como gold standard:
File created successfully: /home/claude/forge-visual-canvas/assets/master-prompt-engine.md
Agora salvo o Excel modal clone como gold standard de referência (asset canônico) e crio o exemplo do Design Language Codex:
File created successfully: /home/claude/forge-visual-canvas/assets/excel-modal-clone.html
Agora o exemplo do Design Language Codex e os arquivos de extensão (README, slot pra v2):
File created successfully: /home/claude/forge-visual-canvas/examples/design-language-codex/README.md
File created successfully: /home/claude/forge-visual-canvas/extensions/README.md
Agora um arquivo `.gitkeep` no extensions/ pra marcar o slot vazio explicitamente, e o README + CHANGELOG na raiz com a auditoria completa:
File created successfully: /home/claude/forge-visual-canvas/extensions/.gitkeep
File created successfully: /home/claude/forge-visual-canvas/README.md
File created successfully: /home/claude/forge-visual-canvas/CHANGELOG.md
Agora valido a estrutura, faço lint final, e empacoto em ZIP:
{"returncode":0,"stdout":"./CHANGELOG.md\n./README.md\n./SKILL.md\n./assets/excel-modal-clone.html\n./assets/master-prompt-engine.md\n./examples/design-language-codex/README.md\n./extensions/.gitkeep\n./extensions/README.md\n./references/brand-tokens.md\n./references/component-systems.md\n./references/svg-document-engine.md\n./references/visual-languages.md\n","stderr":""}
{"returncode":0,"stdout":"  225 SKILL.md\n  100 README.md\n  111 CHANGELOG.md\n  279 references/brand-tokens.md\n  232 references/component-systems.md\n  302 references/svg-document-engine.md\n  351 references/visual-languages.md\n  319 assets/master-prompt-engine.md\n  137 extensions/README.md\n   56 examples/design-language-codex/README.md\n 2112 total\n","stderr":""}
{"returncode":0,"stdout":"---\nname: forge-visual-canvas\ndescription: Sistema FORGE para gerar artifacts visuais premium (HTML, React/JSX, SVG, PDF, PPTX) com brand consistency, dark/light mode, e troca de linguagem visual em runtime. ATIVE SEMPRE para \"criar artifact\", \"gerar showroom\", \"design language codex\", \"modal clone\", \"página de venda\", \"apresentação executiva\", \"ebook interativo\", \"diagrama profissional\", \"PDF estratégico A4\", \"playbook visual\", \"FORGE\", \"visual canvas studio\", \"brand guidelines Anthropic\", \"modo dark e light\", ou pedidos de UI premium estilo Stripe/Linear/Vercel/McKinsey/Bloomberg/Apple/GOV.UK. TAMBÉM ATIVE quando o pedido envolver clone pixel-perfect de uma referência visual, ou quando o usuário pedir \"estilo executivo\", \"estilo SaaS\", \"estilo editorial\", \"estilo dashboard\", \"estilo terminal\", ou qualquer das 10 linguagens visuais catalogadas. NÃO ATIVE para tarefas puras de texto, código backend, ou perguntas conceituais sem entregável visual.\nversion: 2.0.0\nauthor: João Maia (Maia Consultoria) + FORGE\n---\n\n# FORGE Visual Canvas\n\nSistema canônico para produzir artifacts visuais de nível agência — sem \"AI slop\", sem gradientes roxos, sem Inter font genérica.\n---\n✅ YAML frontmatter presente\n  - name: ✅\n  - description: ✅\n  - description length: 917 chars\n  - pushy triggering: ✅\n","stderr":""}
{"returncode":0,"stdout":"✅ Links válidos: 7\n   - references/brand-tokens.md\n   - references/visual-languages.md\n   - references/component-systems.md\n   - assets/master-prompt-engine.md\n   - references/svg-document-engine.md\n   - extensions/README.md\n   - examples/design-language-codex/\n\n❌ Links quebrados: 0\n","stderr":""}
Tudo válido — YAML frontmatter ✅, description "pushy" ✅, 7/7 links internos funcionam ✅, SKILL.md em 225 linhas (limite 500). Hora de empacotar:
{"returncode":0,"stdout":"  adding: forge-visual-canvas/ (stored 0%)\n  adding: forge-visual-canvas/extensions/ (stored 0%)\n  adding: forge-visual-canvas/extensions/README.md (deflated 51%)\n  adding: forge-visual-canvas/extensions/.gitkeep (deflated 10%)\n  adding: forge-visual-canvas/references/ (stored 0%)\n  adding: forge-visual-canvas/references/component-systems.md (deflated 61%)\n  adding: forge-visual-canvas/references/visual-languages.md (deflated 56%)\n  adding: forge-visual-canvas/references/svg-document-engine.md (deflated 68%)\n  adding: forge-visual-canvas/references/brand-tokens.md (deflated 53%)\n  adding: forge-visual-canvas/assets/ (stored 0%)\n  adding: forge-visual-canvas/assets/excel-modal-clone.html (deflated 72%)\n  adding: forge-visual-canvas/assets/master-prompt-engine.md (deflated 59%)\n  adding: forge-visual-canvas/SKILL.md (deflated 55%)\n  adding: forge-visual-canvas/README.md (deflated 53%)\n  adding: forge-visual-canvas/examples/ (stored 0%)\n  adding: forge-visual-canvas/examples/design-language-codex/ (stored 0%)\n  adding: forge-visual-canvas/examples/design-language-codex/README.md (deflated 45%)\n  adding: forge-visual-canvas/CHANGELOG.md (deflated 58%)\ntotal 40K\n-rw-r--r-- 1 claude ubuntu 40K Apr 30 20:23 forge-visual-canvas-v2.0.0.zip\n","stderr":""}
Empacotada e entregue. Resumo do que está no ZIP:

**Estrutura final (12 arquivos, 40KB):**

```
forge-visual-canvas/
├── SKILL.md                         225 linhas — entry point com triggers PT-BR
├── README.md                        100 linhas — overview e instalação
├── CHANGELOG.md                     111 linhas — auditoria v1→v2
├── references/
│   ├── brand-tokens.md              279 linhas — fonte da verdade (paleta, tipografia)
│   ├── visual-languages.md          351 linhas — 10 linguagens detalhadas
│   ├── component-systems.md         232 linhas — 5 sistemas + matriz de combinação
│   └── svg-document-engine.md       302 linhas — PDFs A4 multi-página
├── assets/
│   ├── master-prompt-engine.md      319 linhas — prompt copy-paste
│   └── excel-modal-clone.html       gold standard de modal clone
├── examples/
│   └── design-language-codex/       como regenerar o showroom React
└── extensions/                      ← SLOT VAZIO PRA VOCÊ
    ├── README.md                    137 linhas — template + 7 ideias backlog
    └── .gitkeep
```

**Auditoria — gaps que corrigi do v1:**

| Crítico | Severidade |
|---|---|
| Sem `SKILL.md` formal com YAML frontmatter | 🔴 → ✅ |
| Sem routing claro de qual doc consultar quando | 🔴 → ✅ |
| Sem triggers em PT-BR (você opera em PT) | 🔴 → ✅ |
| Sobreposição entre 2 master prompts | 🟡 → ✅ deduplicado |
| Linguagens visuais misturadas com componentes | 🟡 → ✅ separados |
| `svg-document-engine.md` com paleta inconsistente | 🟡 → ✅ alinhado com FORGE |
| Sem slot de extensão | 🟡 → ✅ criado com 7 ideias |

**Validações que passei:**
- ✅ YAML frontmatter válido (917 chars, "pushy" com triggers PT-BR + EN)
- ✅ 7/7 links internos do SKILL.md funcionam
- ✅ SKILL.md em 225 linhas (limite recomendado 500)
- ✅ Anti-patterns consolidados num único lugar
- ✅ Decision tree explícito de "qual formato de output"

**Como adicionar suas habilidades (v2.x):**

Abra `extensions/README.md` no ZIP — tem o template completo e 7 ideias específicas pra rotina de consultoria presencial PT-BR (proposta comercial PME, diagnóstico ao vivo, playbook cliente personalizado, dashboard acompanhamento, deck fechamento, linguagem visual "Maia Consultoria", etc.).

A regra é: extensões ficam em `extensions/<nome>/` com SKILL.md próprio que herda tokens do core. Quando uma extensão amadurece, é promovida pra `references/` ou `assets/` via novo entry no CHANGELOG.

Quer que eu já comece a primeira extensão sua agora? Sugestão forte pelo seu perfil: **`extensions/diagnostico-presencial/`** — artifact de uso ao vivo durante reunião com cliente, com inputs do consultor preenchendo em tempo real e export PDF no final.

---

**Você** _2026-04-30_

entregue ja pronta para que eu adicione as minha habilidades

---

**Você** _2026-04-30_

entregue ja pronta para que eu adicione as minha habilidades

---

**Claude** _2026-04-30_

1	---
     2	name: frontend-design
     3	description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.
     8	
     9	The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
    10	
    11	## Design Thinking
    12	
    13	Before coding, understand the context and commit to a BOLD aesthetic direction:
    14	- **Purpose**: What problem does this interface solve? Who uses it?
    15	- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
    16	- **Constraints**: Technical requirements (framework, performance, accessibility).
    17	- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?
    18	
    19	**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.
    20	
    21	Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
    22	- Production-grade and functional
    23	- Visually striking and memorable
    24	- Cohesive with a clear aesthetic point-of-view
    25	- Meticulously refined in every detail
    26	
    27	## Frontend Aesthetics Guidelines
    28	
    29	Focus on:
    30	- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
    31	- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
    32	- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
    33	- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
    34	- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
    35	
    36	NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.
    37	
    38	Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
    39	
    40	**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
    41	
    42	Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
    43	
{"returncode":0,"stdout":"","stderr":""}

---

**Claude** _2026-04-30_

{"returncode":0,"stdout":"README.md\ndiagnostico-presencial\nmaia-brand\nplaybook-cliente\nproposta-comercial\n","stderr":""}
File created successfully: /home/claude/forge-visual-canvas/extensions/maia-brand/SKILL.md
File created successfully: /home/claude/forge-visual-canvas/extensions/proposta-comercial/SKILL.md
File created successfully: /home/claude/forge-visual-canvas/extensions/diagnostico-presencial/SKILL.md
File created successfully: /home/claude/forge-visual-canvas/extensions/playbook-cliente/SKILL.md
Agora atualizo o SKILL.md mestre pra listar as extensões instaladas e reempacotar:
Successfully replaced string in /home/claude/forge-visual-canvas/SKILL.md
{"returncode":0,"stdout":"updating: forge-visual-canvas/ (stored 0%)\nupdating: forge-visual-canvas/extensions/ (stored 0%)\nupdating: forge-visual-canvas/extensions/README.md (deflated 51%)\nupdating: forge-visual-canvas/extensions/.gitkeep (deflated 10%)\nupdating: forge-visual-canvas/references/ (stored 0%)\nupdating: forge-visual-canvas/references/component-systems.md (deflated 61%)\nupdating: forge-visual-canvas/references/visual-languages.md (deflated 56%)\nupdating: forge-visual-canvas/references/svg-document-engine.md (deflated 68%)\nupdating: forge-visual-canvas/references/brand-tokens.md (deflated 53%)\nupdating: forge-visual-canvas/assets/ (stored 0%)\nupdating: forge-visual-canvas/assets/excel-modal-clone.html (deflated 72%)\nupdating: forge-visual-canvas/assets/master-prompt-engine.md (deflated 59%)\nupdating: forge-visual-canvas/SKILL.md (deflated 56%)\nupdating: forge-visual-canvas/README.md (deflated 53%)\nupdating: forge-visual-canvas/examples/ (stored 0%)\nupdating: forge-visual-canvas/examples/design-language-codex/ (stored 0%)\nupdating: forge-visual-canvas/examples/design-language-codex/README.md (deflated 45%)\nupdating: forge-visual-canvas/CHANGELOG.md (deflated 58%)\n  adding: forge-visual-canvas/extensions/playbook-cliente/ (stored 0%)\n  adding: forge-visual-canvas/extensions/playbook-cliente/SKILL.md (deflated 53%)\n  adding: forge-visual-canvas/extensions/proposta-comercial/ (stored 0%)\n  adding: forge-visual-canvas/extensions/proposta-comercial/SKILL.md (deflated 54%)\n  adding: forge-visual-canvas/extensions/diagnostico-presencial/ (stored 0%)\n  adding: forge-visual-canvas/extensions/diagnostico-presencial/assets/ (stored 0%)\n  adding: forge-visual-canvas/extensions/diagnostico-presencial/assets/diagnostico-ao-vivo.html (deflated 61%)\n  adding: forge-visual-canvas/extensions/diagnostico-presencial/SKILL.md (deflated 66%)\n  adding: forge-visual-canvas/extensions/maia-brand/ (stored 0%)\n  adding: forge-visual-canvas/extensions/maia-brand/SKILL.md (deflated 59%)\ntotal 53K\n-rw-r--r-- 1 claude ubuntu 53K Apr 30 20:32 forge-visual-canvas-v2.0.0.zip\n","stderr":""}
Pronto, João. O ZIP agora vem com 4 extensões já montadas para a sua rotina de consultoria.

**O que tem pronto para usar:**

As 3 extensões operacionais já têm prompt completo de copy-paste — você só substitui os dados do projeto:

**`diagnostico-presencial`** — abre na reunião, preenche ao vivo, cliente vê se montando, exporta PDF na hora. Tem 3 variações: radar, entrevista sequencial, com benchmark.

**`proposta-comercial`** — 7 páginas A4 (capa, diagnóstico, solução, cronograma, investimento, termos, assinatura). Tem variante compacta de 3 páginas e variante de proposta de diagnóstico.

**`playbook-cliente`** — entregável de encerramento com SOPs, métricas, cronograma de revisão e o convite de continuidade na última página.

**A única que você precisa preencher primeiro:**

`extensions/maia-brand/SKILL.md` — abra o arquivo e substitua todos os `[DEFINIR]` com sua cor principal, acento, tipografia, telefone, email e site. As outras 3 extensões herdam esses dados automaticamente em tudo que gerar.

**Quando a brand estiver preenchida, os documentos saem com sua identidade sem você precisar pedir.**
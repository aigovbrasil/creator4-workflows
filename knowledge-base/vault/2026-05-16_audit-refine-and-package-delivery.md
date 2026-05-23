---
title: "Audit, refine, and package delivery"
date: 2026-05-16
account: leonardopimentel.knh@gmail.com
uuid: 19a0c9a7-a18b-4140-9270-13955677c6fd
messages: 4
tags: []
context: ""
---

**Você** _2026-05-16_

/skill-creator  /skill-creator  Audite - refine - packge delivery

---

**Claude** _2026-05-16_

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
Now let me examine the uploaded skill file.
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
[486 lines total]
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/cognitive-trigger-skill-os.zip\n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/.claude/settings.local.example.json  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/.claude/skills/cognitive-framework-router/SKILL.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/.gitignore  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/LICENSE  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/README.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/architecture.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/dependency-map.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/eval-guide.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/user-stories.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/evals/eval_cases.json  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/evals/eval_cases.yaml  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/evals/rubric.json  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/examples/executive-summary-mece-priority.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/examples/social-post-scqa-aida.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/manifest.yaml  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/pyproject.toml  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/references/4d-5d-quality-bar.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/references/az-framework-catalog.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/references/output-contracts.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/references/routing-rules.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/scripts/__pycache__/framework_router.cpython-313.pyc  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/scripts/framework_router.py  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/scripts/run_evals.py  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/templates/pre-balance-questionnaire.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/templates/response-blueprints.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/templates/working-backwards-brief.md  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/__pycache__/test_eval_cases.cpython-313.pyc  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/__pycache__/test_framework_router.cpython-313.pyc  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/test_eval_cases.py  \n  inflating: cognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/test_framework_router.py  \ncognitive-trigger-skill-os/cognitive-trigger-skill-os/.claude/settings.local.example.json\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/.claude/skills/cognitive-framework-router/SKILL.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/.gitignore\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/LICENSE\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/README.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/architecture.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/dependency-map.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/eval-guide.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/docs/user-stories.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/evals/eval_cases.json\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/evals/eval_cases.yaml\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/evals/rubric.json\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/examples/executive-summary-mece-priority.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/examples/social-post-scqa-aida.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/manifest.yaml\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/pyproject.toml\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/references/4d-5d-quality-bar.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/references/az-framework-catalog.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/references/output-contracts.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/references/routing-rules.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/scripts/__pycache__/framework_router.cpython-313.pyc\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/scripts/framework_router.py\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/scripts/run_evals.py\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/templates/pre-balance-questionnaire.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/templates/response-blueprints.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/templates/working-backwards-brief.md\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/__pycache__/test_eval_cases.cpython-313.pyc\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/__pycache__/test_framework_router.cpython-313.pyc\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/test_eval_cases.py\ncognitive-trigger-skill-os/cognitive-trigger-skill-os/tests/test_framework_router.py\n","stderr":""}
{"returncode":0,"stdout":"---\nname: cognitive-framework-router\ndescription: >\n  Use this skill when the user asks to structure, research, decide, communicate, plan, diagnose, prioritize, summarize, transform, or execute knowledge work using business, product, strategy, operations, education, or communication frameworks. Trigger strongly on terms such as pesquisa, decisão, comunicação, planejamento, diagnóstico, resumo executivo, MECE, Cynefin, JTBD, 5W2H, SCQA, priorização, retrabalho, output estruturado, framework, A-Z, working backwards, and plano de ação. This skill does not select a single framework by default; it selects the minimum viable combination of frameworks needed to satisfy the user’s intent, context, quality bar, response length, and delivery format.\ncompatibility:\n  tools: []\ndependencies:\n  - references/4d-5d-quality-bar.md\n  - references/az-framework-catalog.md\n  - references/routing-rules.md\n  - references/output-contracts.md\n  - templates/pre-balance-questionnaire.md\n  - templates/working-backwards-brief.md\n---\n\n# Cognitive Framework Router Skill\n\n## Mission\n\nTransform natural-language user requests into clear, auditable, and executable outputs by applying:\n\n1. Anthropic 4D AI Fluency quality bar:\n   - Delegation\n   - Description\n   - Discernment\n   - Diligence\n2. Leonardo 5D Operational Matrix:\n   - Define\n   - Dor\n   - Design\n   - Data-driven\n   - Delivery\n3. A-Z Framework Combination Router.\n4. Pre-balance questionnaire when context is insufficient.\n5. Working backwards for execution-heavy or decision-heavy work.\n6. Minimum viable response quality bar.\n\n## Operating principle\n\nDo not behave as a prompt library.\n\nBehave as a cognitive routing layer.\n\nThe user should not need to know which framework to request. Infer the intent and select the smallest useful combination of frameworks.\n\n## Core rule: combine frameworks, do not force one\n\nA request rarely needs only one framework. Select the minimum viable combination.\n\nExamples:\n\n- \"Faça uma pesquisa e me dê um resumo executivo\"\n  - Use: MECE + SCQA + source/evidence discipline.\n- \"Tenho duas opções e preciso decidir\"\n  - Use: Cynefin + trade-off matrix + risk register.\n- \"Transforme isso em plano\"\n  - Use: Working Backwards + 5W2H + RACI.\n- \"Explique isso para o time\"\n  - Use: SCQA + AIDA if persuasive + RACI if accountability matters.\n- \"Tenho retrabalho no processo\"\n  - Use: 3P + Value Stream Mapping + Theory of Constraints.\n\n## Progressive disclosure dependency\n\nApply this sequence silently unless the user asks for the reasoning:\n\n1. Delegation — Should AI act here? What role should it take?\n2. Define — What is the user trying to achieve?\n3. Dor — What pain, risk, rework, or ambiguity exists?\n4. Design — Which framework combination best structures the output?\n5. Data-driven — What data, evidence, assumptions, or metrics are available?\n6. Framework A-Z Router — Apply the smallest useful combination.\n7. Discernment — Check whether the output is useful, sufficient, and bounded.\n8. Delivery — Produce the requested artifact.\n9. Diligence — Add review, risk, or human approval notes when needed.\n\n## Pre-balance questionnaire\n\nAsk a short pre-balance questionnaire only when the request is underspecified enough that answering would likely create rework.\n\nMaximum 5 questions.\n\nDo not ask questions if the user provided enough context to make a reasonable first pass.\n\nUse this minimal sequence:\n\n1. Objective — What decision, output, or action should this support?\n2. Audience — Who will read or use it?\n3. Depth — Short, standard, or deep?\n4. Evidence — Should this use provided data, web sources, internal docs, or assumptions?\n5. Delivery — Should the final output be table, memo, plan, checklist, JSON, or social post?\n\nIf the user seems rushed or asks for direct output, infer missing values and label assumptions.\n\n## Working backwards trigger\n\nUse Working Backwards when the request involves:\n\n- execution\n- product\n- launch\n- project planning\n- public deliverable\n- workflow implementation\n- roadmap\n- repository / asset generation\n- Linear / tasks / sprint\n\nWorking Backwards structure:\n\n1. Desired end state.\n2. User / audience.\n3. Success criteria.\n4. Required artifacts.\n5. Constraints and risks.\n6. Reverse path from delivery to now.\n7. First next action.\n\n## Minimum viable quality bar\n\nBefore finalizing, choose the minimum response scope that preserves quality:\n\n| Situation | Minimum format | Length |\n|---|---|---|\n| quick clarification | 3–6 bullets | short |\n| social post | hook + compact structure | medium |\n| executive decision | table + recommendation logic + risks | medium |\n| research / analysis | source/evidence separation + synthesis | medium/deep |\n| implementation | phases + tasks + dependencies | deep |\n| repository / system design | architecture + files + tests + evals | deep |\n\nDo not overproduce frameworks. Use only the combination that reduces ambiguity.\n\n## Output discipline\n\nEvery response should include, when useful:\n\n- Framework combination selected.\n- Why that combination was selected.\n- Output in the requested format.\n- Assumptions if context was missing.\n- Risks or limits if the output will support decisions.\n- Next action if the user is building a system.\n\nFor Business Thesis Vault mode, prefer:\n\n| ID | Chat Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |\n\n## Framework combination rules\n\nUse references/routing-rules.md and references/az-framework-catalog.md.\n\nDefault maximum: 3 frameworks.\n\nAllow 4–5 only when the request is complex and execution-heavy.\n\nNever use all A-Z frameworks in one output unless the user explicitly asks for an A-Z educational artifact.\n\n## Non-goals\n\nDo not:\n- Claim frameworks improve the model’s internal reasoning.\n- Present proprietary internal frameworks as universal standards.\n- Add unnecessary jargon for non-dev users.\n- Ask a long questionnaire when assumptions are acceptable.\n- Use a framework because its letter matches the word in the prompt.\n- Ignore human review for high-stakes outputs.\n\n## High-stakes caution\n\nFor legal, medical, financial, HR, safety, compliance, or public regulatory claims, clearly mark that the output is decision support and requires qualified human review.\n","stderr":""}
{"returncode":0,"stdout":"=== MANIFEST ===\nname: cognitive-trigger-skill-os\nversion: 0.1.0\nprimary_skill: cognitive-framework-router\ndescription: >\n  Claude Skill repository for 4D + 5D + A-Z Framework Combination Routing.\nentrypoints:\n  skill: .claude/skills/cognitive-framework-router/SKILL.md\n  evals: evals/eval_cases.json\n  tests: tests/\nquality_bar:\n  - Anthropic 4D AI Fluency\n  - Leonardo 5D Operational Matrix\n  - Minimum viable framework combination\n  - Progressive disclosure\n  - Human review for critical outputs\n=== ROUTING RULES ===\n# Framework Routing Rules\n\n## Intent-first routing\n\nDo not choose frameworks alphabetically. Choose by intent, complexity, risk, and delivery format.\n\n## Default combinations\n\n| User intent | Framework combination | Output |\n|---|---|---|\n| research / pesquisa | MECE + SCQA + evidence hierarchy | Executive research synthesis |\n| decision / decidir | Cynefin + trade-off matrix + risk register | Decision brief |\n| communication / comunicação | SCQA + AIDA + audience framing | Clear message or post |\n| planning / planejamento | Working Backwards + 5W2H + RACI | Action plan |\n| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints | Root-cause diagnostic |\n| prioritization / priorizar | Eisenhower + impact/effort + Theory of Constraints | Priority matrix |\n| product/customer | JTBD + Kano + User Story Mapping | Customer/product insight |\n| strategy | First Principles + SWOT/PESTEL if requested + OKR/X-Matrix | Strategy map |\n| rework/process | Value Stream Mapping + 3P + Theory of Constraints | Rework reduction map |\n| execution handoff | 5W2H + RACI + Linear issue schema | Project/ticket plan |\n| social post | SCQA + AIDA + one sharp thesis | Publishable narrative |\n| repository/system design | Working Backwards + modular architecture + evals | Implementation-ready repo |\n\n## Complexity routing\n\n| Context | Prefer |\n|---|---|\n| clear / obvious task | 1–2 frameworks |\n| complicated expert task | 2–3 frameworks |\n| complex social/system task | Cynefin + hypothesis log + iterative plan |\n| chaotic urgent task | triage first, then decide framework |\n| high-stakes task | quality bar + human review + risk register |\n\n## Combination limits\n\n- Default: 2–3 frameworks.\n- Complex execution: up to 5.\n- Educational A-Z artifact: all frameworks allowed.\n- Never add frameworks that do not change the output.\n\n## Pre-balance trigger\n\nAsk questions only if missing context will likely cause rework.\n\nAsk no more than 5 questions. If the user asks to proceed, infer and label assumptions.\n\n## Output size routing\n\n| User signal | Output |\n|---|---|\n| \"rápido\", \"curto\", \"só me diz\" | 80–180 words |\n| \"post\", \"LinkedIn\", \"redes\" | 150–400 words |\n| \"executivo\", \"decisão\" | table + synthesis, 300–700 words |\n| \"profundo\", \"completo\", \"repo\" | structured deep output |\n| \"JSON\", \"YAML\", \"CSV\" | strict machine-readable output |\n=== AZ CATALOG (first 60 lines) ===\n# A-Z Framework Catalog\n\n| Letter | Framework / Pattern | Primary use | Expected result |\n|---|---|---|---|\n| A | AIDA | Communication, copy, pitch | Attention → Interest → Desire → Action |\n| B | Balanced Scorecard | Strategy and management | Objectives connected to indicators |\n| C | Cynefin | Decision under uncertainty | Separate clear/complicated/complex/chaotic contexts |\n| D | Double Diamond | Solution design | Diverge, understand, converge, solve |\n| E | Eisenhower Matrix | Operational prioritization | Urgent / important / delegate / delete |\n| F | First Principles | Deep analysis | Break assumptions into fundamentals |\n| G | GROW | Coaching and leadership | Goal, Reality, Options, Way Forward |\n| H | Hoshin Kanri | Strategic deployment | Connect vision, goals, initiatives, execution |\n| I | Ishikawa / Fishbone | Root-cause diagnosis | Map causes before solution |\n| J | Jobs to Be Done | Customer, product, value proposition | Understand desired progress |\n| K | Kano Model | Product experience | Classify basic, performance, delight features |\n| L | Lean Canvas | Business validation | Synthesize problem, solution, channels, revenue |\n| M | MECE | Structured analysis | No overlap, no gaps |\n| N | North Star Metric | Product and growth | Define central value metric |\n| O | OKR | Strategic execution | Objective + measurable key results |\n| P | 3P — Problem, Process, Progress | Operational diagnosis | Separate problem, process, desired progress |\n| Q | QFD | Voice of customer to requirements | Translate needs into specifications |\n| R | RACI | Roles and responsibility | Responsible, accountable, consulted, informed |\n| S | SCQA | Executive communication | Situation, complication, question, answer |\n| T | Theory of Constraints | Operational bottlenecks | Identify limiting constraint |\n| U | User Story Mapping | Product, service, journey | Organize usage by value flow |\n| V | Value Stream Mapping | Process and rework | Visualize waste, delay, bottleneck |\n| W | 5W2H | Practical action plan | What, why, who, when, where, how, how much |\n| X | X-Matrix | Strategy execution alignment | Connect goals, initiatives, metrics, owners |\n| Y | Yamazumi Chart | Capacity and workload | Balance work across stages/people |\n| Z | Zachman Framework | Enterprise/system architecture | Classify system by perspective and dimension |\n\n## Proprietary caution\n\n3P — Problem, Process, Progress is an internal operational lens. Present it as an internal applied framework, not as a universal external standard.\n","stderr":""}
{"returncode":0,"stdout":"=== OUTPUT CONTRACTS ===\n# Output Contracts\n\n## Executive summary contract\n\nMust include:\n- core thesis\n- framework combination\n- decision logic\n- risks / assumptions\n- next action\n\n## Research synthesis contract\n\nMust include:\n- question\n- framework combination\n- evidence / inference / hypothesis separation\n- source quality notes when sources are used\n- gaps\n- conclusion\n\n## Decision brief contract\n\nMust include:\n- decision to be made\n- options\n- criteria\n- trade-offs\n- risks\n- recommended next validation step\n\n## Action plan contract\n\nMust include:\n- objective\n- 5W2H table\n- RACI if owners matter\n- dependencies\n- success metric\n- next action\n\n## Social post contract\n\nMust include:\n- hook\n- clear thesis\n- compact structure\n- examples or framework list\n- closing statement\n- no unsupported claims\n\n## Repository generation contract\n\nMust include:\n- file tree\n- SKILL.md\n- references\n- templates\n- examples\n- eval cases\n- tests\n- README\n- install/run instructions\n=== 4D-5D QUALITY BAR ===\n# 4D + 5D Quality Bar\n\n## Anthropic 4D AI Fluency\n\n| D | Competency | Operational question | Skill function |\n|---|---|---|---|\n| D1 | Delegation | Should AI act here, and in what role? | Scope and role control |\n| D2 | Description | Is the goal described clearly enough? | Input clarity |\n| D3 | Discernment | Is the output useful, accurate, and sufficient? | Critical evaluation |\n| D4 | Diligence | What responsibility remains with the human? | Governance and review |\n\n## Leonardo 5D Operational Matrix\n\n| D | Layer | Function | Guiding question | Output |\n|---|---|---|---|---|\n| D1 | Define | Define objective, scope, and success | What needs to be solved? | Clear mission |\n| D2 | Dor | Identify pain, friction, rework, ambiguity | What loss or pain exists now? | Diagnostic anchor |\n| D3 | Design | Choose cognitive structure | Which framework combination fits? | Method route |\n| D4 | Data-driven | Anchor in data, evidence, metrics | What proves, measures, or invalidates this? | Auditable output |\n| D5 | Delivery | Convert reasoning into artifact | What should the final artifact/action be? | Executable delivery |\n\n## Causal sequence\n\n```text\nDelegation\n→ Define\n→ Dor\n→ Design\n→ Data-driven\n→ Framework combination\n→ Discernment\n→ Delivery\n→ Diligence\n```\n\n## Failure modes\n\n| Missing layer | Likely failure |\n|---|---|\n| Delegation | AI works on the wrong task |\n| Define | Output is generic |\n| Dor | Solution does not address the real pain |\n| Design | Answer is unstructured |\n| Data-driven | Output is hard to validate |\n| Framework routing | User must reorganize manually |\n| Discernment | Weak output is accepted |\n| Delivery | Analysis does not become action |\n| Diligence | Risk is transferred silently to the user |\n=== EVAL CASES ===\n[\n  {\n    \"id\": \"EVAL-001\",\n    \"prompt\": \"Faça uma pesquisa sobre IA generativa na educação e devolva um resumo executivo.\",\n    \"should_trigger\": true,\n    \"expected_intent\": \"research\",\n    \"expected_frameworks\": [\n      \"MECE\",\n      \"SCQA\"\n    ],\n    \"expected_behavior\": \"Route to research synthesis using MECE + SCQA + evidence hierarchy.\"\n  },\n  {\n    \"id\": \"EVAL-002\",\n    \"prompt\": \"Preciso decidir entre lançar um e-book agora ou esperar validar mais fontes.\",\n    \"should_trigger\": true,\n    \"expected_intent\": \"decision\",\n    \"expected_frameworks\": [\n      \"Cynefin\"\n    ],\n    \"expected_behavior\": \"Route to decision brief with uncertainty, trade-offs, and risks.\"\n  },\n  {\n    \"id\": \"EVAL-003\",\n    \"prompt\": \"Crie um post para LinkedIn sobre IA sem estrutura aumentar retrabalho.\",\n    \"should_trigger\": true,\n    \"expected_intent\": \"communication\",\n    \"expected_frameworks\": [\n      \"SCQA\",\n      \"AIDA\"\n    ],\n    \"expected_behavior\": \"Route to communication asset using SCQA + AIDA.\"\n  },\n  {\n    \"id\": \"EVAL-004\",\n    \"prompt\": \"Tenho muito retrabalho no processo de conteúdo. Me ajude a diagnosticar.\",\n    \"should_trigger\": true,\n    \"expected_intent\": \"diagnosis\",\n    \"expected_frameworks\": [\n      \"3P — Problem, Process, Progress\",\n      \"Ishikawa / Fishbone\"\n    ],\n    \"expected_behavior\": \"Route to diagnosis using 3P + Ishikawa + TOC.\"\n  },\n  {\n    \"id\": \"EVAL-005\",\n    \"prompt\": \"Crie um repositório completo com SKILL.md, evals e testes.\",\n    \"should_trigger\": true,\n    \"expected_intent\": \"execution\",\n    \"expected_frameworks\": [\n      \"Working Backwards\",\n      \"5W2H\",\n      \"RACI\"\n    ],\n    \"expected_behavior\": \"Route to execution with working backwards and repository artifact contract.\"\n  },\n  {\n    \"id\": \"EVAL-006\",\n    \"prompt\": \"melhora isso\",\n    \"should_trigger\": true,\n    \"allow_pre_balance\": true,\n    \"expected_intent\": \"underspecified\",\n    \"expected_frameworks\": [],\n    \"expected_behavior\": \"Ask a short pre-balance questionnaire instead of guessing a long framework.\"\n  },\n  {\n    \"id\": \"EVAL-007\",\n    \"prompt\": \"Qual é a capital da França?\",\n    \"should_trigger\": false,\n    \"expected_intent\": \"simple_factual\",\n    \"expected_frameworks\": [],\n    \"expected_behavior\": \"Do not force framework routing for a simple factual lookup.\"\n  }\n]\n","stderr":""}
{"returncode":0,"stdout":"=== EXAMPLES: executive summary ===\n# Example — Executive Summary + MECE + Prioritization\n\n## User prompt\n\n```text\nAnalise esse problema de retrabalho no meu processo de conteúdo e me dê um resumo executivo com prioridades.\n```\n\n## Framework combination\n\n- 3P — Problem, Process, Progress\n- MECE\n- Theory of Constraints\n- Eisenhower / impact-effort prioritization\n\n## Expected output\n\n| Section | Content |\n|---|---|\n| Executive thesis | The main source of rework is unclear decision criteria before production |\n| MECE map | Briefing, production, review, approval, publishing |\n| Constraint | Approval criteria arrive too late |\n| Priorities | Fix briefing template, define review gate, standardize final checklist |\n| Next action | Create one-page content briefing template |\n=== EXAMPLES: social post ===\n# Example — Social Post + SCQA + AIDA\n\n## User prompt\n\n```text\nCrie um post explicando por que usar IA sem framework aumenta retrabalho.\n```\n\n## Framework combination\n\n- SCQA for structure\n- AIDA for persuasion\n- 4D/5D as conceptual foundation\n\n## Expected output\n\n- Hook: \"IA sem estrutura aumenta volume. Não necessariamente performance.\"\n- Situation: everyone uses AI\n- Complication: outputs are unstructured\n- Question: why does productivity not appear?\n- Answer: cognitive scaffolding reduces ambiguity and rework\n- CTA: design your AI workflow before scaling output\n","stderr":""}
Now I have a full picture. Let me run a structured audit before refining.
{"returncode":0,"stdout":"=== SKILL.md line count ===\n171 /tmp/cognitive-trigger-skill-os/cognitive-trigger-skill-os/.claude/skills/cognitive-framework-router/SKILL.md\n=== SKILL folder contents ===\ntotal 16\ndrwxr-xr-x 2 root root 4096 May 16 12:48 .\ndrwxr-xr-x 3 root root 4096 May 16 12:48 ..\n-rw-r--r-- 1 root root 6277 May 16 12:38 SKILL.md\n=== templates ===\n# Pre-Balance Questionnaire\n\nUse only when required.\n\n## Standard version\n\n1. Objective: What decision, output, or action should this support?\n2. Audience: Who will read or use the output?\n3. Depth: short, standard, or deep?\n4. Evidence: provided data, web sources, internal docs, or assumptions?\n5. Delivery: table, memo, plan, checklist, JSON, social post, or repo?\n\n## Ultra-short version\n\n```text\nAntes de montar: isso é para decisão, comunicação, pesquisa ou execução? Qual público e qual formato final?\n```\n\n## Assumption fallback\n\nIf the user wants speed, proceed with assumptions:\n\n| ID | Assumption | Impact |\n|---|---|---|\n| A-001 | Audience inferred as business/non-dev | Sets language simplicity |\n| A-002 | Depth inferred as standard | Avoids excessive output |\n| A-003 | Evidence inferred as user-provided context only | Avoids unsupported sourcing |\n=== working-backwards-brief ===\n# Working Backwards Brief\n\n## Use when\n\n- final artifact matters\n- execution is expected\n- the user asks for repository, project, sprint, plan, launch, deliverable, roadmap, or implementation\n\n## Structure\n\n| Field | Answer |\n|---|---|\n| End state | What should exist at the end? |\n| User / audience | Who uses it? |\n| Success criteria | How will quality be judged? |\n| Required artifacts | What files, documents, outputs, or tickets are needed? |\n| Constraints | Time, format, source, style, risk |\n| Dependencies | What must come before what? |\n| First action | What starts now? |\n","stderr":""}
{"returncode":0,"stdout":"__init__.py\naggregate_benchmark.py\ngenerate_report.py\nimprove_description.py\npackage_skill.py\nquick_validate.py\nrun_eval.py\nrun_loop.py\nutils.py\n---\nLICENSE.txt\nSKILL.md\nagents\nassets\neval-viewer\nreferences\nscripts\n","stderr":""}
{"returncode":0,"stdout":"#!/usr/bin/env python3\n\"\"\"\nSkill Packager - Creates a distributable .skill file of a skill folder\n\nUsage:\n    python utils/package_skill.py <path/to/skill-folder> [output-directory]\n\nExample:\n    python utils/package_skill.py skills/public/my-skill\n    python utils/package_skill.py skills/public/my-skill ./dist\n\"\"\"\n\nimport fnmatch\nimport sys\nimport zipfile\nfrom pathlib import Path\nfrom scripts.quick_validate import validate_skill\n\n# Patterns to exclude when packaging skills.\nEXCLUDE_DIRS = {\"__pycache__\", \"node_modules\"}\nEXCLUDE_GLOBS = {\"*.pyc\"}\nEXCLUDE_FILES = {\".DS_Store\"}\n# Directories excluded only at the skill root (not when nested deeper).\nROOT_EXCLUDE_DIRS = {\"evals\"}\n\n\ndef should_exclude(rel_path: Path) -> bool:\n    \"\"\"Check if a path should be excluded from packaging.\"\"\"\n    parts = rel_path.parts\n    if any(part in EXCLUDE_DIRS for part in parts):\n        return True\n    # rel_path is relative to skill_path.parent, so parts[0] is the skill\n    # folder name and parts[1] (if present) is the first subdir.\n    if len(parts) > 1 and parts[1] in ROOT_EXCLUDE_DIRS:\n        return True\n    name = rel_path.name\n    if name in EXCLUDE_FILES:\n        return True\n    return any(fnmatch.fnmatch(name, pat) for pat in EXCLUDE_GLOBS)\n\n\ndef package_skill(skill_path, output_dir=None):\n    \"\"\"\n    Package a skill folder into a .skill file.\n\n    Args:\n        skill_path: Path to the skill folder\n        output_dir: Optional output directory for the .skill file (defaults to current directory)\n\n    Returns:\n        Path to the created .skill file, or None if error\n    \"\"\"\n    skill_path = Path(skill_path).resolve()\n\n    # Validate skill folder exists\n    if not skill_path.exists():\n        print(f\"❌ Error: Skill folder not found: {skill_path}\")\n        return None\n\n    if not skill_path.is_dir():\n        print(f\"❌ Error: Path is not a directory: {skill_path}\")\n        return None\n\n    # Validate SKILL.md exists\n    skill_md = skill_path / \"SKILL.md\"\n    if not skill_md.exists():\n        print(f\"❌ Error: SKILL.md not found in {skill_path}\")\n        return None\n\n    # Run validation before packaging\n    print(\"🔍 Validating skill...\")\n    valid, message = validate_skill(skill_path)\n    if not valid:\n        print(f\"❌ Validation failed: {message}\")\n        print(\"   Please fix the validation errors before packaging.\")\n        return None\n    print(f\"✅ {message}\\n\")\n\n    # Determine output location\n    skill_name = skill_path.name\n    if output_dir:\n        output_path = Path(output_dir).resolve()\n        output_path.mkdir(parents=True, exist_ok=True)\n    else:\n        output_path = Path.cwd()\n\n    skill_filename = output_path / f\"{skill_name}.skill\"\n\n    # Create the .skill file (zip format)\n    try:\n        with zipfile.ZipFile(skill_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:\n            # Walk through the skill directory, excluding build artifacts\n            for file_path in skill_path.rglob('*'):\n                if not file_path.is_file():\n                    continue\n                arcname = file_path.relative_to(skill_path.parent)\n                if should_exclude(arcname):\n                    print(f\"  Skipped: {arcname}\")\n                    continue\n                zipf.write(file_path, arcname)\n                print(f\"  Added: {arcname}\")\n\n        print(f\"\\n✅ Successfully packaged skill to: {skill_filename}\")\n        return skill_filename\n\n    except Exception as e:\n        print(f\"❌ Error creating .skill file: {e}\")\n        return None\n\n\ndef main():\n    if len(sys.argv) < 2:\n        print(\"Usage: python utils/package_skill.py <path/to/skill-folder> [output-directory]\")\n        print(\"\\nExample:\")\n        print(\"  python utils/package_skill.py skills/public/my-skill\")\n        print(\"  python utils/package_skill.py skills/public/my-skill ./dist\")\n        sys.exit(1)\n\n    skill_path = sys.argv[1]\n    output_dir = sys.argv[2] if len(sys.argv) > 2 else None\n\n    print(f\"📦 Packaging skill: {skill_path}\")\n    if output_dir:\n        print(f\"   Output directory: {output_dir}\")\n    print()\n\n    result = package_skill(skill_path, output_dir)\n\n    if result:\n        sys.exit(0)\n    else:\n        sys.exit(1)\n\n\nif __name__ == \"__main__\":\n    main()\n","stderr":""}
I have everything I need for a full audit. Let me now compile findings, refine, and package.
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
- No emoji. Icons = Tabler **outline** webfont (5800+, already loaded): `<i class="ti ti-home"></i>`. Outline only — never use `-filled` suffixes (`ti-heart-filled` etc. are not loaded and will render blank). Inherits color + font-size from parent. Decorative icons get `aria-hidden="true"`; icon-only buttons get `aria-label`. Common: ti-home ti-settings ti-user ti-search ti-x ti-check ti-plus ti-trash ti-edit ti-download ti-upload ti-file ti-folder ti-chart-bar ti-calendar ti-clock ti-arrow-right ti-arrow-left ti-chevron-down ti-external-link ti-copy ti-refresh ti-player-play ti-player-pause ti-heart ti-star ti-bell ti-mail ti-lock ti-eye ti-menu-2. Don't hand-draw icon SVG paths.
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
- **Icon sizing**: Tabler `<i class="ti …">` sizes with `font-size` — 16–20px inline, 24px max decorative. For one-off inline SVG icons, set `width`/`height` explicitly (same limits).
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

Now I have everything. Let me run the full audit and implement refinements.

---

**Você** _2026-05-16_

Delivery skill Md ready

---

**Claude** _2026-05-16_

{"returncode":0,"stdout":"Skill folder ready:\n/tmp/skill-refined/cognitive-framework-router/examples/executive-summary-mece-priority.md\n/tmp/skill-refined/cognitive-framework-router/examples/social-post-scqa-aida.md\n/tmp/skill-refined/cognitive-framework-router/references/4d-5d-quality-bar.md\n/tmp/skill-refined/cognitive-framework-router/references/az-framework-catalog.md\n/tmp/skill-refined/cognitive-framework-router/references/output-contracts.md\n/tmp/skill-refined/cognitive-framework-router/references/routing-rules.md\n/tmp/skill-refined/cognitive-framework-router/templates/pre-balance-questionnaire.md\n/tmp/skill-refined/cognitive-framework-router/templates/working-backwards-brief.md\n","stderr":""}
Now write the refined SKILL.md:
File created successfully: /tmp/skill-refined/cognitive-framework-router/SKILL.md
Now write the standard-compatible evals file:
File created successfully: /tmp/skill-refined/cognitive-framework-router/evals/evals.json
{"returncode":1,"stdout":"📦 Packaging skill: /tmp/skill-refined/cognitive-framework-router\n   Output directory: /mnt/user-data/outputs/\n\n🔍 Validating skill...\n❌ Validation failed: Unexpected key(s) in SKILL.md frontmatter: dependencies. Allowed properties are: allowed-tools, compatibility, description, license, metadata, name\n   Please fix the validation errors before packaging.\n","stderr":""}
{"returncode":0,"stdout":"#!/usr/bin/env python3\n\"\"\"\nQuick validation script for skills - minimal version\n\"\"\"\n\nimport sys\nimport os\nimport re\nimport yaml\nfrom pathlib import Path\n\ndef validate_skill(skill_path):\n    \"\"\"Basic validation of a skill\"\"\"\n    skill_path = Path(skill_path)\n\n    # Check SKILL.md exists\n    skill_md = skill_path / 'SKILL.md'\n    if not skill_md.exists():\n        return False, \"SKILL.md not found\"\n\n    # Read and validate frontmatter\n    content = skill_md.read_text()\n    if not content.startswith('---'):\n        return False, \"No YAML frontmatter found\"\n\n    # Extract frontmatter\n    match = re.match(r'^---\\n(.*?)\\n---', content, re.DOTALL)\n    if not match:\n        return False, \"Invalid frontmatter format\"\n\n    frontmatter_text = match.group(1)\n\n    # Parse YAML frontmatter\n    try:\n        frontmatter = yaml.safe_load(frontmatter_text)\n        if not isinstance(frontmatter, dict):\n            return False, \"Frontmatter must be a YAML dictionary\"\n    except yaml.YAMLError as e:\n        return False, f\"Invalid YAML in frontmatter: {e}\"\n\n    # Define allowed properties\n    ALLOWED_PROPERTIES = {'name', 'description', 'license', 'allowed-tools', 'metadata', 'compatibility'}\n\n    # Check for unexpected properties (excluding nested keys under metadata)\n    unexpected_keys = set(frontmatter.keys()) - ALLOWED_PROPERTIES\n    if unexpected_keys:\n        return False, (\n            f\"Unexpected key(s) in SKILL.md frontmatter: {', '.join(sorted(unexpected_keys))}. \"\n            f\"Allowed properties are: {', '.join(sorted(ALLOWED_PROPERTIES))}\"\n        )\n\n    # Check required fields\n    if 'name' not in frontmatter:\n        return False, \"Missing 'name' in frontmatter\"\n    if 'description' not in frontmatter:\n        return False, \"Missing 'description' in frontmatter\"\n\n    # Extract name for validation\n    name = frontmatter.get('name', '')\n    if not isinstance(name, str):\n        return False, f\"Name must be a string, got {type(name).__name__}\"\n    name = name.strip()\n    if name:\n        # Check naming convention (kebab-case: lowercase with hyphens)\n        if not re.match(r'^[a-z0-9-]+$', name):\n            return False, f\"Name '{name}' should be kebab-case (lowercase letters, digits, and hyphens only)\"\n        if name.startswith('-') or name.endswith('-') or '--' in name:\n            return False, f\"Name '{name}' cannot start/end with hyphen or contain consecutive hyphens\"\n        # Check name length (max 64 characters per spec)\n        if len(name) > 64:\n            return False, f\"Name is too long ({len(name)} characters). Maximum is 64 characters.\"\n\n    # Extract and validate description\n    description = frontmatter.get('description', '')\n    if not isinstance(description, str):\n        return False, f\"Description must be a string, got {type(description).__name__}\"\n    description = description.strip()\n    if description:\n        # Check for angle brackets\n        if '<' in description or '>' in description:\n            return False, \"Description cannot contain angle brackets (< or >)\"\n        # Check description length (max 1024 characters per spec)\n        if len(description) > 1024:\n            return False, f\"Description is too long ({len(description)} characters). Maximum is 1024 characters.\"\n\n    # Validate compatibility field if present (optional)\n    compatibility = frontmatter.get('compatibility', '')\n    if compatibility:\n        if not isinstance(compatibility, str):\n            return False, f\"Compatibility must be a string, got {type(compatibility).__name__}\"\n        if len(compatibility) > 500:\n            return False, f\"Compatibility is too long ({len(compatibility)} characters). Maximum is 500 characters.\"\n\n    return True, \"Skill is valid!\"\n\nif __name__ == \"__main__\":\n    if len(sys.argv) != 2:\n        print(\"Usage: python quick_validate.py <skill_directory>\")\n        sys.exit(1)\n    \n    valid, message = validate_skill(sys.argv[1])\n    print(message)\n    sys.exit(0 if valid else 1)","stderr":""}
Successfully replaced string in /tmp/skill-refined/cognitive-framework-router/SKILL.md
{"returncode":0,"stdout":"📦 Packaging skill: /tmp/skill-refined/cognitive-framework-router\n   Output directory: /mnt/user-data/outputs/\n\n🔍 Validating skill...\n✅ Skill is valid!\n\n  Added: cognitive-framework-router/SKILL.md\n  Added: cognitive-framework-router/references/az-framework-catalog.md\n  Added: cognitive-framework-router/references/routing-rules.md\n  Added: cognitive-framework-router/references/output-contracts.md\n  Added: cognitive-framework-router/references/4d-5d-quality-bar.md\n  Added: cognitive-framework-router/examples/social-post-scqa-aida.md\n  Added: cognitive-framework-router/examples/executive-summary-mece-priority.md\n  Added: cognitive-framework-router/templates/pre-balance-questionnaire.md\n  Added: cognitive-framework-router/templates/working-backwards-brief.md\n  Skipped: cognitive-framework-router/evals/evals.json\n\n✅ Successfully packaged skill to: /mnt/user-data/outputs/cognitive-framework-router.skill\n","stderr":""}
Packaged. Let me verify what's inside:
{"returncode":0,"stdout":"  cognitive-framework-router/SKILL.md                            5664 bytes\n  cognitive-framework-router/examples/executive-summary-mece-priority.md    748 bytes\n  cognitive-framework-router/examples/social-post-scqa-aida.md    575 bytes\n  cognitive-framework-router/references/4d-5d-quality-bar.md     1756 bytes\n  cognitive-framework-router/references/az-framework-catalog.md   2537 bytes\n  cognitive-framework-router/references/output-contracts.md       948 bytes\n  cognitive-framework-router/references/routing-rules.md         2367 bytes\n  cognitive-framework-router/templates/pre-balance-questionnaire.md    872 bytes\n  cognitive-framework-router/templates/working-backwards-brief.md    583 bytes\n117 /tmp/skill-refined/cognitive-framework-router/SKILL.md\n","stderr":""}
**Done. Here's what changed and why:**

---

**🔴 Critical fixes applied**

The original skill folder had only `SKILL.md` — all 6 dependency files lived at the repo root and would never be included in a package. All references and templates are now bundled inside the skill folder where they belong.

---

**🟡 Refinements**

| What changed | Why |
|---|---|
| SKILL.md body: 171 → 117 lines | Removed duplicated 4D/5D tables (they're in `references/`); replaced with pointers |
| Description: tightened to 9 lines | Kept bilingual triggers, removed "how it works" content that belongs in the body |
| `dependencies:` → `metadata.references:` | `dependencies` is not a valid frontmatter key per the validator; moved to `metadata` |
| Removed "Business Thesis Vault mode" | Unexplained proprietary reference — removed to avoid confusion |
| Added `evals/evals.json` | Standard skill-creator format with `assertions` per eval case (7 cases, including 1 negative) |

---

**📦 Package contents (9 files, all self-contained)**

```
cognitive-framework-router/
├── SKILL.md                         ← 117 lines, trimmed & valid
├── references/
│   ├── az-framework-catalog.md      ← full A–Z catalog
│   ├── routing-rules.md
│   ├── output-contracts.md
│   └── 4d-5d-quality-bar.md
├── templates/
│   ├── pre-balance-questionnaire.md
│   └── working-backwards-brief.md
└── examples/
    ├── executive-summary-mece-priority.md
    └── social-post-scqa-aida.md
```
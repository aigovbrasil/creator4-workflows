---
title: "Adicionar habilidades personalizadas"
date: 2026-05-20
account: joao.studartmaia@gmail.com
uuid: 3b99e0e5-2b51-499d-9883-4bb24ff1c9ac
messages: 2
tags: []
context: ""
---

**Você** _2026-05-20_

/skill-creator  Add to minhas habilidades

---

**Claude** _2026-05-20_

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
     1	PK\x96f\xb0\\x97e\xb6t\xf9	 #cognitive-framework-router/SKILL.md\x8dX\xcdrܸ\xbe\xf3)P\xe5\xc3Z\xd2pT\xb1\xadM\xa2TE%맬ݵ\xad\xb5\x94\xb8*'c\xc8\xe6     2	\x90\xa0R\xa3q\xcdaOy\x80$o\x90C     3	 \x8f\xe07\xf1\x93\xe4k\xfcY[\x9b\x83J\x9c\xa0\xd1\xe8\xfe\xfa믙\xa6iRˊ\x8eEf\x96\xb5j\xd5     4	\xa5\x85\xc5kcW\xa95]K6\xc9\xc9eV5\xad2\xf5\xb1\xf8s"\xc4_     5	\x89\xb6TN\xb8\x95\xd2Z\xacK\xaa\xf1\x99D\xe7\xc8
     6	\xe9VN\xb4F\xb8\xd6vY\xdbY\x9a	K\x8e\xa4\xcdʙ\xc8)S9\xbe\xc9LUu\xb5\xcadK3l\xb4\xac\xf1\xa3\x92\xcb\xda8\xfc\xdcXe,\xbc\xf9\x8cg\xd7U\x95\xb4\xfe\xd1XA\xf7\x94\xc1)\xb1\xaa\xcdZS\xbe$\xc1\x9e\xceŭU\xcb%N\x87\x8bl\x8fܧN9t_\xfem\xfc\x91\xfe\xc4/\xff\xf1\xf9H\xfa\x88\x9b֭\x89G\xf9\xafkUf\xbc\xbf]e\xe2Y\xeaΰ\x8b\xaf/\xce.f\xe2lSS\xa1\xe0\xeb\xb7/\xcfg\xe2\xe8\xfd\xb3W3qs\xf6\xf3i\xef\xf3\xe7޾\xa5\xd6ʅ\xd4%\x9eƦkqH\x99{\x8bC\x9cg\xfe\xaa^\x8a\x85\xccVkis\xfc3p_\x83\xe2\xeb/\xff\xb2\xce\xc5E\xbd\xd4ʕ\x82p\xc1;\xa9\xe1\xbeO\x87ì\xbf1R\xd5Gn32\xe3\xdc\xc5(Oc#\xae\xdc4#\xbcta{s\x98\xbb     7	\xf3\xecHS\x86\xe38Օ\xaaU\xd5U\xe2NɅ&޽Pu\xd8k
     8	q\x9a\xfem\xbc\x9e5QN9@{\x8b\\xb1\xf0\xf2\x9d\xaanq     9	v\xf7x\xf8\xd4I\xad\xda    10	\xc2ag\xfe\xd29i \xd3nDal%۹8\xd5k\xb9q0\xd7Ƽ\xe3\xac\xdc\xe0\xce    11	\xd7ʚ\x81,\x9dS59\xa659\xc08cPrˍǒi\xc8z\x97    12	\xb2\xf5\xa9Cz``\xb64\x827g\xa0\xd7>9k\xd3\xe9    13	+a\x89\xf0\xcf\xe3.\xa9\xa8\x95\xb9l%\xa3\xceR\x81\xbduF\x8e?	\x91N\xbe9|\x91\xa7Gyo\x96\xe2f\xf3*\xffv\x95\xfc<)?\xe4Bj\xb3|t!\x97&\x9cJm\xa7\xc9=\xba"\x80.\xe5\xa0Z`\xb2\xa8\xa5
    14	Ph\xb1\xa6\xb1W\x8b\x8cR\xa3\x96\xca\xd2c\x8b#H\xd3\xa4\xa9G	/MA#\xc9q\xd6s\x88\xb8\xec/!\xdeI\x9e<\xaf\x95c`&ɭ\x95\xb5\xe3T
    15	@\xf5\xa0S\xb8\xb0\xec\xe4\x92\xfaDxP\x91i\xf2\xe8r\xd52\xcef\xb1&=\xe6\xc2\x9dXl\x84l\xbd\xe1    16	1\xaa\%5\x82\xd22\xbc\x8aN?\xc4\xe6\x97\S1\x90k\xd3L\xf9/\xa5\xd0jaQC\xf3$\xd9\xdf\xff9²0]\x9d{{\xfb\xfb\xe2\xa962~#\xd3<@\xe1\x8d\xdey\xb7w\x9c\xa4\xe2\xb4nKk\x95\x89\xe7\xe2\xf4J\\xea&6\xc7\xe2    17	\x95\xb6    18	    19	\xfd\xfb?\xf0q \xe0\xf0Y\xb9\x8cl\xcd\xdc?k\xb5\xe4\xc3a\xf3'25\x92c\xc4ѹx\xdb\j\xf1Z\xa2T\xee\xd94\xf8\x8b\xc26\xb8ͫe\xb4    20	ȥ\xb9E
    21	\xfb\x93C\xe1\xf9\xfcEs\x88    22	8\xa4\xceT\xa3)I^R)\x91p\xe9\xac\xa1\x87    23	Q\xd5rC6UrVM;\x84\xd4[\x86+}iՄ\xa3<Yp\xff඄MC\xba\xe6\xe2\xaaF\x8cc\xa2<-B\xfa\xad\xa4Ͻ\xf3\xef\xa2G\x8e\x86P\x814\xbbZ8\xc5    24	\xaa7{I\xf2\xbb\xb9\xd8\xdf\x8f\xd42<n\x82kHjH07\x9c\x88\xf7\xa5F\x8c\xa6\x93\xe4Y\xd8\xc4!\x8d\xfc\x8f\xcaM\xfa!x\xbe\x81\xf1l\x80\xa8\xc1W\xa5\xc2]O\x92\xe7~\xbb\xb1ӽ\x8d\xe4\xfeb\x95[\xcd"\xcbx\xb2\x92\xb8ϲc\xf8ѽB\x81\x9c$/\xc2ٜ\xbba\xbf\xca\xca1b;\xc8_ppZ    25	\xfe\x85
    26	:I\x8e\xbc\xa51\xf5Sw\xe8    27	\xf1B\xb3\xc0\x82\xe0\x8aCgiqJ\x90\xa5\xbc\x93J3\xaaO\x92\xef\xd9\xd2X\xfc\xdcD\x93\xa7\\xa8\xfe\xec\xa9oO    28	\xd1N	=d\xb7{\xc9ｏ#\xf0\xa3\xc1\xab\xe9Mb\xf2\xb9\xf3\x85ʔ/hʂ+\x96\xf2\x93\xe41\xc9    29	\xd4\xd1ĵo\xe4\xedH۪\x823\xfd\x8dK\x8f\xd0)\xbc\xfac\xf0*\x96_\xc9<\xf7\xf9c\xd8#҈X\xd9U\xb2N-bIkQh\xb9tA4\x85\xc6\xe8\xf1yfI\xbe\xefq    30	    31	M\x98jk$GM\x8d\xba۲
    32	\xaaa\x8b\xfdc<\xb7\xe2m\x88\xc76ق\x9a\x87?lꕂ8    33	D\x96\xb3\xb8^\xc8\xe0_\x9fr\xc8\xc7Uξl\xc5ETC4\xdap\xe8\xf8\xa0Ax\xc0\xb4\x97yʲ[A0\xc1*Sj\x8aBT\x9e\x8a\xf0\x95\x92\xa5%\xf0L\xbc\xf8\xbc\xb7\xe0\x8b7\xba+KwU    34	\xb6D\x97O\xaf\xce\xf97
    35	\xef9\x87\x8e\x8b    36	p    37	d\xb7\xe4\xa21\xce\xc6ˡ\x9a    38	\xee\x88A\xecy\xe5\xd8˾\xd3\xc14K=\xfc{wzv\x85\xa7\xa3\xa2
    39	w\xef\x85_~\xa2%\xb1\xf4\xf95\xb6]\xb9R\xad\xe4Z\xe2\xacg\xa0dЉ\xceP@\x88\x8ab	\xb7E\x9d\xc0K½5\x8e\xf6\x8a\xadB/59f\xcaQ]\x9a5x T\xd5\x9b\x87T(    40	\x8a\xeb\xb0sӇ<X\xf3Z\x88cٹ\xd6T>\xf2,g\xb1\xffG֜Y7-\xbb\xf9\xad52\xae>\xec    41	\xa8\xd4S\x86X\xa2\x82\xcdQ\xf6b\xcb_%    42	Y\x92\xd5`\xe9 D\xe4\xf6\xed_:\xec\xf3\xa2\xca_\xae\x92\x8d7\xb57\xbe)Q\xc0\x8c\x9a\xed\x83\xa0l?\x82\xfd\xa5\xb5c*\x9c\xc9\xfa]H\xf3|\xa0r\xd0l\xa4mD\x8f[q\xdd-XO{E\x81\xc6\xc9    43	w\x82    44	\xe5\xa3p\xa8\xa3\x80\xed[\xe5\xe3\xa9\x8d\xa4pm\xa8\x96<\xd1b\xe91\xb4|\xfa\xc02\xdfx\xe38\xaabZ\xb8ZU\xaau\xc7\xe0\x91\x9c
    45	\xd9\xe9V<\xfb\xfa\xcb?\x9fO\x98\xe0O\xa2k\xb8\x85    46	yA\x81j\x80\xed\xfb1Zs\xf1\xc6\x85M\x84N\xcbL\x9e\x9b\xfa\xbbVd\x88\xe7\x92&\xa497\xa8\xeeWDh\xd00\xbc\xd1\xeb\xe6\xf6\xfeG\xcf`ף\x98;b2INQ\xe7\xa6\xf3{֫X"vQ\xefGa\xadՊ\xb0"T@\x94\xd7\xcd=\xae\xda[\x83\xaem\xfa\xed\x82S\x8fDM;\xd58\xf8\x84\x8b\x85^`FZ\xbb\xa6Ay\xc4\xe6})c\xb0dĚ\x87    47	N`oT۷jj\xdarT\xd6O\xc0'\xe0Oˉ\x9aؘ/"\x89\x8eM\x86\xbf\xc8c]\xd3@\xed\xc0\xe6\xe0v\xe6p\xcb-7\x99{\xd8a\xfb\xee\xbc۳n\x83\xae\xa8\x8a\xa3,\xa6\xa7\x92\xb2\xa0    48	\x9f~\xb8y\xfb\xc6ۙ\xd4\xc2I\x92\\xa3*aK\x8d`4hA\xecK+n\x95h\xe4\xa4wZ|h\x85\xff\xdf\xd0\xf0a/`\xe1\xdb\xf2\x88\x83Z\x92\xf0˃\xe1\x8dA\x94\xfb8\xff\xce\xe8;    49	N#\x94'S\x9b\x96]\xcdo\x9aP\xf2s\xcf\xfa\xc10D\xc3B\x89\x83?f\x93\xca    50	Q`\xb9
    51	\x9c_2l	\x843\xa7\xb7\xfa\xf5\xe9\xe6\xc3<N/;/\x9a`\x83\xe8\x80O2̑܏o\x84^쿗~N\xc5\xc3OT/\xdb\xf2\x91F\x8c֛A\xa1\x81/Tѷ74    52	\x94\xfb\xf7\\xa1e}Sp\xa5'\xf2oh\xad4f\xc6\xe1\xfag\xb52^j    53	L\xe4
    54	nNH|6\xf4\xe6m\x98?\xb0u\x8b\xfe\x9a\xb0\xdb\xdd7	(\xd9\xa6    55	d\xc1\xc1\xb4\xf1\xc7}\x87    56	}\xbfY\xed\xd0    57	4\xa5t\xc4\xfc\xd8\xfaWCp\xa6\xa1\x9aM)b\xc3\xce\xc7w\xbb˦\xa2\x80b\xf7\xc6\xfc\x94\xc8b\x85a<X\xf1sJ?\xa3zI\x92    58	\xff\xf6`\xccY\xa0    59	1\xba\xcb1
    60	x<\xf1\xe8\xb3\xcbG%t7P\xc3\'\xebr\x83\x85\xf1(\xb5\x83f\xac\xef)xě\x92*F\xcaüi\x8b\xde\xf9\xa9\x81\xffy\xe1D\xd4F\xberC    61	\xb6\xbca+\x91\xdcԤ\xae\x91\x92E\xa7t    62	\xa6\xd7\xc4$y\xc8\xf0\x8f\x89Y\xcf\xee|\xc5o=
    63	EU\xdb\xf0+\xb5\xe0F\xbbi(T\xc2+\xb4\xfd\xbc\xb7B"@׭\x9f\xe9/\xd9}\xccNz\xe6\x91\xf1\x84XB\xf1\xe3\xabw\xa0JYPJ\xd27.\xe5[E    64	\xe3\xb1Mr\xbcY\xae\xf9A\xb6\xd3 \xa8\xf1\xfa}@|\xa2\xc3.\xbc3\x82\xd7y\xdb"\x88\xed\xe0\xf0\xb4ݥN\x92\xe4ܰ*\xe7    65	\x9fi\xa9\xaai\x93pAҡ5\xa2\x95\x93\x8e\xaf\xa6<5\xa3    66	8S\x87t]s}@tc9\x98\x85Z    67	\xb3\xe3\xc1\xa74_Ρv\xf6x:\x86j\x9d\xd4C\xc7\xe04\xf2\xa8\xf0Q\xda%n\xc5\xe1\xaf\xe1(\xa0^\xb2\xc2\xd5>\xa1~\xba\xa7D\xbd"\xa5;|h\xf4\x9bi,\xcbХ\xb8ȱ\x95\xc9v2Cc
    68	    69	\xfd\x95Q\x8aa\xd9    70	\x9c\xa2u\xf0\xf8\x8ey\xe50\xab'\xffPKof\xb0\nJ\xaa\xc2\xe9	=cognitive-framework-router/references/az-framework-catalog.md\x85VKn    71	9    72	\xdd\xf7)d9\xed\x98\xc1    73	\xc0nۉ\xe38\xfe%q\x92    74	[ŮR\xac\x92*\xfat\xbb/\xb2\x9a    75	\xe6\x849\xc9<J\xe5v{`nׇz$\xc9z\xa1\xf6\xbe\xa8\x93@=o|\xb8S    76	Jd};\x9b=\xa8\xb7\x9c\xf5\xb0\xf3v_]\x92<txzLOaT92\xee\x8e\xef։8f\x9b\xd4\xc3\xecaoo\xef\xd9 `ypz$\xff\xbe\xef\xb33\x9a\x92\xf1n\xae\xb4ƹLҝ\xd8\xc0\x89\x93\xea\xe7_\xabS\x97    77	S\xb99\xe2h\x97\xcb]L\xf8\x87ɒ\xd3\xe1F\xfb\xc0\x9aB\x83\x877)P\xe2vT\xe4Փ\xa3\x96{@\xe3\xcd\xc5\xf2+"6k\x8ep\xee\\x8d>ye\#Q\xf9    78	\xf2Bb    79	    80	\xaf\x8c$}\xc4\xdaDq\x9a]n2\xfc\x85DƥQ|\xf1@\xe2Mi\xcb\xf6\xb5\xef+P\xdc\xd4k\xbe\xdf\xd7    81	\xf9d\xb4xL|\x9f\xaa\x8b#\xf6yiY    82	\xea\xbd+\x81{\x9bKz    83	n\x8bo\xc4Z\x9eW\xdf1!#\xe1\xcdMO\xa3\xb7k.x\xc7R\xd9u~\x83 \xcf)s/    84	
    85	\xddd\xd5\x8c&\x99\xefT9T^\xf6\x95\xe9\x8f\x9c\xcauÖ[ɨ^\xa6\x8a"\x9a0\x88@4\xe0\xb4Af\xb1p\xc3h&;F#\xf7\x87\x81\xe9NQ\x8c\xb9\xc4I\xb5\xe0w\x85\xf0Ij@\xb6\xa6\xff
    86	\xb6\xaf\xae/n\x8b(HwƵ\xa5Z Q\xf2\xec\xcc \x9e\xec\]3Y\x93 \x94\x8b\x8a8W\xb74\xaa6\xa5\xda{    87	\xdb\xd7    88	\x87\x9c:#̓\xc0zÃ\xf5\xe3T\xffE-\xbaZ\x97\x82\xceU	< truncated lines 89-128 >
   129	\xa5YM\xe8|o*&\x94\xa0\xcdf\xe4:\x9d.\x99&\x98x\xad\x97<\xd5f\x84y\x99\xb5\xb4yT\xa8F\xab9\xe1\xb8\xbbf\x96\x9b\x9a\xca:\xce϶\xf1ŸHeD!`\xee\xf9\xe2i\xfe)\xefBt\x98\x89\xbcJ5\xf6\xaf\x86\x81\x8fU\xddx\xa6\x8a\xdbu\xe8\xd5\xed\x929IO@\xfb\xd6΄ɞ{\xfe\xb3V\xb9\xdd늽,\xba\x90^\xfc\xf3\xac\xe8\xf4\xd3   130	\xfc^\xa1[ǯ\x8f.\x927\\xdd\xe3agK(Ŝ\xf2\xb1\xe1w(   131	yv8>c\x8f\x8e^x\xb4m}H	\xd2.ņc됔\xe0`\xbbm\xbb\xe2\xf4\x88\xbczhѴ\x95&\xae4\xc5\xf2Hs   132	H_L\xc0\xffpP\xddv\xb4\xf1}7\xb9\xfe\xc0\xb6\xbf\xae.\xf99\x9c|l]4\xbd\x92CI"R1\xd7PKof\xb0\[ߢn\xce\xb49cognitive-framework-router/references/output-contracts.md}\x92Mo\xdb0   133	\x86\xef\xf9rn   134	   135	\xd8e\xb7\xa0   136	\xb0b-\xa4\x87\x9ee\x99\x8e\xd9Ȣ*R\xf9\xf8\xf7\xa3\xa7$'\xd3%>\xefK.\xe1w\xd1T   137	9jv^e\xb1X.a}D_\x94\xf6R\xa6\xc9\xe5\xf8\xf9|\xb1x-\xa2@ч\xd2\xe3\x8fŝ\x9dd   138	QH\xeco\xc8n\xc2\xe7\x9d姎\xa2S\xe2h\xf9   139	=\x89\x85xK\xde\x99d'\xf0N\xacE\xaaU\xf5zģ\x82\xb5\xa9\x97*\xc8]\xf6#\xc8)\x9e{\xdc \xf9,(s\xbbk\xb8\xa7   140	\xa3GkLq\xc0<\xc7\xe3)\xf1\xfc\xbc`r\xf9R.\\xb2|HOYQ\xe00b\x9cO\x9c\x89/\x82\xbdo]\x92\xe6G%\x92\x8b\x82\xa7\x8b\xf0.7\xe8\xbf   141	R\x86ar=Z\x96\xbf\xac\xf1\x9939   142	\xed\x85   143	\xefx\xe4bd\xfd\xa2I\x9d0\xf6؟m\xdctߔ\x80(\xa6F\xb3j\xd6B
   144	.\xde@\xe1\xee}   145	\xbf\xc5\xdf߿\xfdu]\xa8?\x9b\xd5\xe33\xd0|\x88\x98\xc5Ր{\xaa\x8d\xa3'\xac(R\xbcyc稹   146	\xfb\xff\xb1\xbe\xb1' \xb1\xf5\xbd\x8e12\xef\xaa\xf0`+\xf0w\xc3Le\xb2rӔ\x8bג+   147	ݔ\x82\x8d\x83\xf3?\xa3$\xda\xee\xb3P\xdc\xda\xa7h\xd5\d(QJJ\x9c\xd5\xfc\xf2\xc1\xd1$\xf3\xc6)\xdb\xceo\xd1T\x9e   148	\xbc9P\xb0\xf5\xcfX1\xde~=\xbf\xbc\xdcO}\x9bƼ]\xd9ښ\xe3\xda\xe2   149	j[F\xf3\xc0;\x99kD\xebw\xb3^=\xbd\xae-\xa0h\xc0!<\xe4[\նU\xf8PKof\xb0\a\xc3e\xdc:cognitive-framework-router/references/4d-5d-quality-bar.mdmU\xcbn;   150	\xdd\xcfW\xc8\xf2:(zo\xbb.ܸ)$(ڢ\xe86\xb2ę\xe1\xb5F\x9a\xeaaǅ\xd7\xfd\x80~b\xbf\xa4\xa44\xe3q\x8a.\x82(\xea\x90<琹\x82W\xf8^o\xe0cV\x96\xd2ު\xd04WW\xb0v\xa9~$-\xeb;\xb8\xb5\x9d>6\xcd	6p\x82?\x8c\x98\xe4\x86\xff\xf80bP\x89\xbcS\xbee\x8cr\xe4\xeb\xcf;\xb2\xda\xect\xbdhN\xd7\xd7\xd7\xcf~\xec%Gn\xd0b\xa7\xe6g\xbd\xcf\xd6HN\xa5\xf4p\xca \x87^%\xde\xe2\x89\xd3~\xc4\xf2En@{\x97\xf8\xf4\xdfu\xa0qB\xbd\x8b\x90z\x84\xces\x8d\xa6|٢mQ{t>w\xbd\xa0޹1'\xbeWA\xd8(`\xff	E\x8d\xc1   151	\xe8\xd2\xe6s\x92\xe0   152	\xb1͖\x8b\xd4:3S\xb91\xb7-i\xe2{\xc3p\xa497\xee\x95\xcdj&6\xaf
   153	\xb8\xa5\x8e\xb9D>--b   154	\xbd\x8b\xb4\xa5\xa2I\xc0A\x91\x8bp\xa0ԗ\xc4}   155	\x94\xd8\xf7~\xcfU)yZ\x88\xc0=၁E\xc1{dA\x82\xf1\xa2\xee\xa5B*z\x9a\x85\xbcWG   156	\xfc\xfb\xf6,\xbc\xcfd\xc8u\x97R~\xa8\x9d\xfeE\xc2\xe72\xb6\xe4p9\xf8\xed\xffȠ{f$\x8aX31Zc\x8cs\xaf\xd10\x9d   157	\xb6\xd1\xdb=\x9a\xc5xf\xaah\xea\xa5\xd6;ìR{\x84\x91iYA\xa8\x94\xbe\xe2\xfe>\xec8Ͱ\xa5.k\xeb9!\xbf\x95\x80OS\xe7o
   158	\xf9\xaas\x9e\xd5\\x9d\xee%\xc1Yt\x8c\xd4I\xfb7\xbd\xf7Q,\xd69\x92~ \xa6\x90uʡ*F\xba\xe7"\xd4P\xb2sgwU\xe2\x96R\x94$\x98z/F\xcd	/tWI]\x9b\xc0\x80\x92d]\xb3s\x81\x86\xefW\xec2b\x8a   159	Ȋ\xe93cc`գ\\xab\xc8%\xf0\xa9<cc\xbfD\xf1&\x95\xac\xebl(\xa9\xad=;\xb5d~]\x8e\xb3\x86c\x99d\xc7'\xf1\x9c\x8aމ\xee\xe4X   160	\x98a\xc0)i\xacS)\xeecm\xd9Fs\xc0   161	U}\xb3-C\xf9\xee	u\xae9\xcd9G\xb1\xe3\x8dʑ\x9fE\xfc&\x8b\x9b\xe6\xf1\xf11\xe1Sj\x96\xe1o~\xfd\xf89y\xa7   162	}\x98\xaeD\x87z\(+\xdf\xfe\x8d\xf6\xb9L\xecR˙>N'U\x94\xf2nY\xd1s\xf0\xbc   163	d8   164	\xc4{̆\x9d\xe4\x9evț\xa2\x9d\xe2.F\xa1\xf9c\x81\xf1撊\xd8p\xae\xf0u\x9eq\x92\x8a\xbb*\xc0<%\xd3PQ.Y\xe1\xfa\xb9X\xfc\xb3\xb7\xb9\xc0\x8fb\xd5ʘ c#\x88\xac\x95\xad^\xae\x80\x93M\xd7.   165	\xb8V\xcc\xee\xecPSc\x9eYm\xc9\xdc\xf3\x86\x90\xe1\x9b\xcdS\x82RŰB\xc2	\xbeDF   166	r\xa3\xf8\xd0)Gߙ,\xe5\xf8߆\x9d\xf6\xe4\xb3\xf9\xd5n\xb6   167	\xe7\xe1݈c\x9a\x8bYܷf+   168	#\x9c\xfb\xdc"+\x89\xa0\xf4\xb2#/\xd6\xe3'b9<\xe5b\x8bA\xfa\x8bd9'W\xc1};YJ=5\xbfPKof\xb0\}\xbc\xb7Fu?<cognitive-framework-router/examples/social-post-scqa-aida.md=Q\xcbn1   169	\xbc\xefW\xf1\xb1\x88{i.\xbe   170	;Es	\xa4\xbd\x9b\xde\xe5:BvE\x85\x92\xfc\xb8\xf5#\xfa\xf9\x94\xfcI\xbf\xa4C\xdb\xf0I9\x9c\x8eft\xe0)\x8dB\xff\xfe\xfc\xa5\xed\x8f\xf4\xa4\xb9\xd0zY>\xb78ڇU\xdb4\xb3\xfd\xceb\x94L\xa7T\x9af\xbd^9\x94fiA\xa8N\x94|Fi   171	   172	\xc7^\xf16z\xafhe6zh)\xcbD\x83\xf1${\xb57\xe2:I,L&\xc5x\xc3\xe3\xabΝ\xf1$\xf3\xe3\x8a\xeatڄ\xc8%hl\x9a۳\x9f\xbc\xb9X\xedJ5A\xd1ݝ\x8aI,WΎ\xbd\xa5o\xab\xafw+\xe2   173	\x8a\xd8I*[   174	Zc!\x83\xcc\xfd!IW\xa4'\xad%\xd5\xe2?U\xdftsq+.\xbe\xba\xdd\xe9\x88ۜ   175	??\x94\xa2t\x92\xb1\`o\x8a\xeb\xc3\xc6\xc4Л߸\xdbUW[\x90\xecĎ=   176	\xc9p\x8c\xee)zTg\xc0\xd9B&6`\xe2u\xbd   177	\xc0\xe7
   178	'\xd0\xfe\xf5H\xbd\x82_\xd0v\xa1   179	)j!NIؾ{1\xef\xc5X{B\xb9\xe3aбq\x8b\xb41F\xac\xdb\xea\xd3\xf8*T=l\xf7\xf4\xab]P/9l#   180	\xb5\x9c\x92\xb7\x86Q\xf7\xb4lw\xa2\x9d\xea\xdaPKof\xb0\\x82˱\xecFcognitive-framework-router/examples/executive-summary-mece-priority.mdeRKn\xdb0\xdd\xebx\xa9]\xf4i\xa0\xecZH\xb3\xf7\x88[DD\x8e\xc0\x8f\xed^\xf4=E\x8f\xd0mnғ\xf4\x91Q\xebYH$潙\xf7f8\xea\xcf\xec\x96Y\xe8׷︋\xc9\xc9   181	\x85   182	\xb2s   183	\xbe\xd2   184	}\xea\xefz   185	\xdb`5\xd8d\x9f9Y\xf5M\xb3\xd9\xd0c\x94@KP\xb7\xa4\xa6\xd9\xedvIΩ\xb9\xf5<\xdb($?\x80\xc3,\x8ei
   186	\x92<OJ^\xc9I.\xa8M   187	j\xd4'y\xf99*	0_~Pvȉ\xd9!\xb4\xdaR\xd0   188	Ҋ\x93\x91G\x89\xef\x8al\xf5r\xd8\xc9I\xc3S\xa1   189	֯.;\xfa\xb0\xad\x9dm_\x9d\xb4\xe5RD\xeb\xe5\x80\xfa\x9c\xd2"\x8e/\x93(Z\xd6=ݩ\x8fpk}*p\x8f~\xfc\xa4't\xfb\x9e\xac[ؤN\xf6{   190	i\xf5\xf2\xdfT\xfa\xf3"&\xc9H\x9aӒ1\x99   191	= \x98.\xa5p\x9f\xe8\xd2\\xba\xae\xab\xf0\xeb\xd8\xd3$\xd1F\xe1\x85   192	   193	P\xd4   194	\x8cS\xe1\xb5?\xc0ٛY8`n\xc6\xc6R\xd8\xc0\x83\xcb4lչ\x8fy\xd5D\xfd\xfa\x84\x8e\xd4\xfd\xac\xec\xad?\xb4\xffpZ\x94>Z9\xb5\xc4   195	\xa2G\x9e\x81\xe6\xcf8\x81Y+\\x82\xb7+\xeb*\xcb!T\xf7\xaa4s\x92\x9a\xf2ga\xa4\xb4so\xcf4\xacҔ   196	Z\x8b\x90U\x9e5\xfb\x91\xc3h\x9f\x85\x80\x99I\xcc\xdcԱ\xd1gl\xf1߁)\x82\xea\xa5[\xf8\xb0\xee\\xbeC\xeeoPKof\xb0\\xfcM\x8c	hAcognitive-framework-router/templates/pre-balance-questionnaire.mdUS\xbbn1\xec\xf9   197	\xa8\xd5)~$\x8d\x9a\x83\xa7p\x8a8\x81`\xa4Պ\\xe9\xf3H\x9aKJ\xa0\xbfI\xe4\xd2\xeaǲ<=l\x87#y\xcb\xd9ٙ\xb9|O\xd4|F\x87^\xfc(\xc4\xd9\xef\xd1&R\xea\x91	\x82w;\xd8v\xe4!\xd1s\x91c3Qj4\x82yFo0\xd8Pb\xb9\xa2\xd4\xf5   198	\x96\xbfHg\xbb\xa1)\xfc\xec0\x83!m\xeb\xc71\x84\x92c\xc9\xf2N\x80\xba\xb6\xeeBqrg\xb8\xc4Rn\xd5\xcdf\xc5X2"\xc0\xd6:'\x9d\xd1ԛE\xf8\xe4\x8eN`\xad\xba\x9d\xc0   199	\xc5\xdcM+Xt>\x91\xfa\xa2ت\x8f\xf8\xb2\xb1\xe6\x88S\xa8k3\x8eaKK\xe0P\x92&   200	\x83\xf5\x99\x92G&h>e.}\xacd\xb9U\x9fj/'\xa3\xa5\xdd2.   201	\x8d\xa1\xa7>\x8c!\x8avc\xd0   202	\xe9'gYX|\x9d?|.A[A\x8b\x81\x8fc'\x8a\xa1   203	\xa4{t9a3P~Uo\xb1Xdz\xc9j&4X\xb8C|\xc64\xcb   204	\xe0\xf0"&<
   205	z\xf8-]u苷\x86m$wE\xa0\xd2e8o\xc5\xd1\xca\xe1\xf0o\xe9\xac@\xf0\\xf7\xab\x90z\xccVV\xe6mk\xeb\x81\xd7\xec2/\xacй%\xea'\xa5\xeeW\x83\xe4"}\x82-\xfa,fE"QX\xb4Բ\x87r\xf7V\xaa\xa9R{\xb8\xbf\x83\xfd[<9\xe9\xa3{\xb5o\x9a\xe6\xf2H鬹\xba\xba\xae\xd5'\xdfň%ə\x80²\xb0\xf5\xc4\xfc\xc1\xdf\xdaHݜ\x84\x83H\xbe.\xb8&`\xdbG\xcd\xe6   206	\x9c\xc1n\xa4h\x88\xc5;\xa4s4j\xa7M\xb0\x86E&\xf1\x9d\xc5\xd1S\x9e.\xb7Rs\xce\xcc;\x8c*Bsɐ\x83ı\xe3rA-\xfef\xa9\xb2e\xfdZ\x90\xffPKof\xb0\\xb3\x93\x86\x8dgG?cognitive-framework-router/templates/working-backwards-brief.md=QAn\xdc0   207	\xbc\xfb\xf6\xeaE\x9fP4i\x83\x9e\x9b9s%:f,K
   208	IŻ\xc0>>\x94\x93\xcd\xc1\xb0(͐3\xc3<Y8\xbf\xc0   209	\x86eC\x89
   210	w\xc24   211	\xc3\xe1OJ\xb0͔\x87\xe1gL\x80b<a0XьD\xfd\x81\xce\x9aq\xc9\xc0\xeaE\xa5`\xfd\xdef\x82\xa6$\x80\xba(LE@\xa8e+r\xa1Jyu\xe4Z\x85\xb3\xffk\xc2<B\xc3<B\xa4\xc4\xef$xJ4\x82\x8c+\xd6\xbc\xaf5\xd1Jٰ\x8f\xdcU>\x9a\xb4`Mh\xae\xf0\xc0\x94"\\xe1W\xd6\xcdg_\x87\xeb\xf1x\xdc?\xfc\x93#\xa83\xc9\xcf3\xe8\\x9a\xc3\xe9\xccj\xe0u\xd7L9\xfe\xec\xbc\xee^\xe0`\x8bL9|rJ\xb7\xa4\xc0\xf6	yl!\x90*aO\x83\xd11\xcb\xa7o   212	\xdbN\xaf-\xbe\xd0W\xd7\xf4\xd6X(~G\xa971'R\xb7^B\xeb\xfdX\x9aն\x8c\xc3BF!\xc8D\xf1\xd6\xef\xbed5Aϰ7\xfaϫ\xe6a\xfb~<\xdb\xd2$x\xadv\xd9sd]v\xceo\xaa\xee\xd2M1}O_\x9bG\xcaJ.\xd8\xf9}\xf1\xf8\xe5\xf2\x81\xa5\xc7\xf6%ߒ3ׯ\x90\xcb\xd61PK\x96f\xb0\\x97e\xb6t\xf9	 #\xa4\x81cognitive-framework-router/SKILL.mdPKof\xb0\nJ\xaa\xc2\xe9	=\xa4\x81:
   213	cognitive-framework-router/references/az-framework-catalog.mdPKof\xb0\V b͵?	6\xa4\x81\xa5cognitive-framework-router/references/routing-rules.mdPKof\xb0\[ߢn\xce\xb49\xa4\x81\xaecognitive-framework-router/references/output-contracts.mdPKof\xb0\a\xc3e\xdc:\xa4\x81\xd3cognitive-framework-router/references/4d-5d-quality-bar.mdPKof\xb0\}\xbc\xb7Fu?<\xa4\x81\x90cognitive-framework-router/examples/social-post-scqa-aida.mdPKof\xb0\\x82˱\xecF\xa4\x81_   214	cognitive-framework-router/examples/executive-summary-mece-priority.mdPKof\xb0\\xfcM\x8c	hA\xa4\x81t   215	cognitive-framework-router/templates/pre-balance-questionnaire.mdPKof\xb0\\xb3\x93\x86\x8dgG?\xa4\x81\xdc cognitive-framework-router/templates/working-backwards-brief.mdPK		\xa9\xa0"
É um arquivo binário (ZIP). Vou extraí-lo para ler o conteúdo.
{"returncode":0,"stdout":"Archive:  cognitive-framework-router.skill\n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/SKILL.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/references/az-framework-catalog.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/references/routing-rules.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/references/output-contracts.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/references/4d-5d-quality-bar.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/examples/social-post-scqa-aida.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/examples/executive-summary-mece-priority.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/templates/pre-balance-questionnaire.md  \n  inflating: cognitive-framework-router-extracted/cognitive-framework-router/templates/working-backwards-brief.md  \nDone\n","stderr":""}
     1	---
     2	name: cognitive-framework-router
     3	description: >
     4	  Use this skill when the user asks to structure, research, decide, communicate,
     5	  plan, diagnose, prioritize, summarize, or execute knowledge work. Trigger on:
     6	  pesquisa, decisão, comunicação, planejamento, diagnóstico, resumo executivo,
     7	  MECE, Cynefin, JTBD, 5W2H, SCQA, priorização, retrabalho, output estruturado,
     8	  framework, working backwards, plano de ação — and English equivalents (research,
     9	  decision, summary, action plan, prioritize, diagnosis, communication brief).
    10	  This skill selects the minimum viable combination of A-Z frameworks needed to
    11	  satisfy the user's intent, context, quality bar, and delivery format. Always
    12	  trigger for any substantive business, product, strategy, or operations request
    13	  where structured thinking would reduce rework.
    14	metadata:
    15	  references:
    16	    - references/4d-5d-quality-bar.md
    17	    - references/az-framework-catalog.md
    18	    - references/routing-rules.md
    19	    - references/output-contracts.md
    20	    - templates/pre-balance-questionnaire.md
    21	    - templates/working-backwards-brief.md
    22	---
    23	
    24	# Cognitive Framework Router
    25	
    26	## Mission
    27	
    28	Transform natural-language requests into clear, auditable, executable outputs by applying the smallest useful combination of frameworks — routing intent, not reciting a library.
    29	
    30	**Quality foundation** (load `references/4d-5d-quality-bar.md` for full tables):
    31	- Anthropic 4D AI Fluency: Delegation → Description → Discernment → Diligence
    32	- Leonardo 5D Operational Matrix: Define → Dor → Design → Data-driven → Delivery
    33	
    34	## Operating principle
    35	
    36	Behave as a cognitive routing layer, not a prompt library. The user should never need to name a framework. Infer intent and select the smallest useful combination.
    37	
    38	## Routing sequence (run silently)
    39	
    40	1. **Delegation** — Should AI act here? What role?
    41	2. **Define** — What is the user actually trying to achieve?
    42	3. **Dor** — What pain, risk, rework, or ambiguity exists?
    43	4. **Design** — Which framework combination best structures the output?
    44	5. **Data-driven** — What evidence, data, or assumptions are available?
    45	6. **Framework A-Z Router** — Apply the combination (see `references/routing-rules.md`)
    46	7. **Discernment** — Is the output useful, sufficient, and bounded?
    47	8. **Delivery** — Produce the artifact (see `references/output-contracts.md`)
    48	9. **Diligence** — Add risk notes or human-review flags when needed
    49	
    50	## Core rule: combine frameworks, never force one
    51	
    52	| User intent | Combination | Output |
    53	|---|---|---|
    54	| research / pesquisa | MECE + SCQA + evidence discipline | Executive research synthesis |
    55	| decision / decidir | Cynefin + trade-off matrix + risk register | Decision brief |
    56	| communication / comunicação | SCQA + AIDA + audience framing | Clear message or post |
    57	| planning / planejamento | Working Backwards + 5W2H + RACI | Action plan |
    58	| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints | Root-cause diagnostic |
    59	| prioritization / priorizar | Eisenhower + impact/effort | Priority matrix |
    60	| product / customer | JTBD + Kano + User Story Mapping | Customer/product insight |
    61	| rework / retrabalho | Value Stream Mapping + 3P + TOC | Rework reduction map |
    62	| execution handoff | 5W2H + RACI | Project/ticket plan |
    63	| social post | SCQA + AIDA + one sharp thesis | Publishable narrative |
    64	| repository / system design | Working Backwards + modular architecture | Implementation-ready repo |
    65	
    66	**Combination limits:** default 2–3 frameworks; up to 5 for complex execution. Never add frameworks that don't change the output. See `references/az-framework-catalog.md` for the full A-Z catalog.
    67	
    68	## Pre-balance questionnaire
    69	
    70	Ask only when missing context would likely cause rework. Max 5 questions:
    71	
    72	1. **Objective** — What decision, output, or action should this support?
    73	2. **Audience** — Who will read or use it?
    74	3. **Depth** — Short, standard, or deep?
    75	4. **Evidence** — Provided data, web sources, internal docs, or assumptions?
    76	5. **Delivery** — Table, memo, plan, checklist, JSON, or social post?
    77	
    78	If the user signals speed, infer and label assumptions (see `templates/pre-balance-questionnaire.md`).
    79	
    80	## Working Backwards trigger
    81	
    82	Use when the request involves: execution, product, launch, project planning, deliverable, roadmap, repository, or sprint. Full structure in `templates/working-backwards-brief.md`.
    83	
    84	## Minimum viable response scope
    85	
    86	| Situation | Format | Length |
    87	|---|---|---|
    88	| quick clarification | 3–6 bullets | short |
    89	| social post | hook + compact structure | medium |
    90	| executive decision | table + logic + risks | medium |
    91	| research / analysis | evidence + synthesis | medium/deep |
    92	| implementation | phases + tasks + dependencies | deep |
    93	| repository / system | architecture + files + tests + evals | deep |
    94	
    95	## Output discipline
    96	
    97	Every response should include (when useful):
    98	- Framework combination selected and why
    99	- Output in the requested format
   100	- Assumptions if context was missing
   101	- Risks or limits if the output supports decisions
   102	- Next action if the user is building a system
   103	
   104	See `references/output-contracts.md` for required fields per output type.
   105	
   106	## High-stakes caution
   107	
   108	For legal, medical, financial, HR, safety, or compliance outputs, mark clearly that the output is decision support and requires qualified human review.
   109	
   110	## Non-goals
   111	
   112	Do not:
   113	- Claim frameworks improve the model's internal reasoning
   114	- Present proprietary internal frameworks (e.g. 3P) as universal standards
   115	- Add jargon for non-technical users
   116	- Ask a long questionnaire when assumptions are acceptable
   117	- Use a framework because its letter matches a word in the prompt
   118	
{"returncode":0,"stdout":"Copied\n","stderr":""}
O arquivo está íntegro e bem estruturado. Aqui o que o skill contém:

**`cognitive-framework-router`** — um roteador cognitivo que seleciona automaticamente a combinação mínima de frameworks (MECE, SCQA, Cynefin, JTBD, 5W2H, Working Backwards, etc.) para qualquer pedido de trabalho estruturado — pesquisa, decisão, comunicação, diagnóstico, planejamento, priorização.

**Para instalar no Claude.ai:**

1. Acesse **Settings → Skills**
2. Clique em **Upload skill** (ou equivalente)
3. Faça upload do arquivo `.skill` acima

Depois de instalado, o skill vai disparar automaticamente sempre que você pedir pesquisa, decisão, resumo executivo, plano de ação, ou qualquer estruturação de pensamento — sem precisar nomear o framework.
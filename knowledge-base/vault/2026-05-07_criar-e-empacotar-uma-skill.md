---
title: "Criar e empacotar uma skill"
date: 2026-05-07
account: contatotdahadulto@gmail.com
uuid: 4b2f6112-2542-4187-8c7a-1778276a110c
messages: 12
tags: []
context: ""
---

**Você** _2026-05-07_

/skill-creator Vamoa criar empacotar uma skill ?

---

**Claude** _2026-05-07_

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
Ótimo, vamos criar e empacotar uma skill! 🚀

Estou no contexto do Claude.ai, então o processo é: **definir → escrever → testar → iterar → empacotar**.

Para começar, me conta:
{
  "questions": [
    {
      "question": "Voc\u00ea j\u00e1 tem uma ideia definida do que a skill deve fazer?",
      "type": "single_select",
      "options": [
        "Sim, tenho uma ideia clara",
        "Tenho uma ideia vaga, preciso de ajuda para refinar",
        "Quero transformar um workflow que j\u00e1 fiz aqui em skill"
      ]
    },
    {
      "question": "Qual \u00e9 o tipo de output principal da skill?",
      "type": "single_select",
      "options": [
        "Arquivo (docx, xlsx, PDF, etc.)",
        "C\u00f3digo / script",
        "An\u00e1lise / relat\u00f3rio em texto",
        "Workflow multi-etapas / agente",
        "Outro / n\u00e3o sei ainda"
      ]
    }
  ]
}
Me conta o que você escolheu e também **descreve em poucas palavras o que a skill deve fazer** — assim já entramos direto na fase de design! 🎯

---

**Você** _2026-05-07_

[User dismissed — do not proceed, wait for next instruction]

---

**Claude** _2026-05-07_

Tudo bem! Estou aqui quando quiser continuar. É só me dizer o que a skill deve fazer e a gente começa! 🙂

---

**Claude** _2026-05-07_

{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/Arquivo.zip\n  inflating: skill_upload/texto 2.txt  \n  inflating: skill_upload/__MACOSX/._texto 2.txt  \n  inflating: skill_upload/texto.txt  \n  inflating: skill_upload/__MACOSX/._texto.txt  \n  inflating: skill_upload/arquivo web.webarchive  \n  inflating: skill_upload/__MACOSX/._arquivo web.webarchive  \nskill_upload/__MACOSX/._arquivo web.webarchive\nskill_upload/__MACOSX/._texto 2.txt\nskill_upload/__MACOSX/._texto.txt\nskill_upload/arquivo web.webarchive\nskill_upload/texto 2.txt\nskill_upload/texto.txt\n","stderr":""}
{"returncode":0,"stdout":"---\nname: empower-v4-ai-usage-evaluator\ndescription: Evaluate and compare AI/Claude usage patterns across accounts using normalized interaction data, maturity scoring, risk clustering, and quality-lift analysis. Use this skill when the user wants to evaluate, compare, normalize, or improve AI/Claude usage patterns across conversations, accounts, exports, or prompt histories using the Empower V2/V3/V4 framework. Activate for requests like \"run Empower\", \"analyze my Claude conversations\", \"compare accounts\", \"calculate maturity score\", \"evaluate AI usage quality\", \"detect prompt patterns\", \"generate usage report\", \"analyze Claude exports\", or when the user uploads Claude conversation exports, CSV interactions, pattern registries, quality label queues, normalized metrics, RDF-lite facts, or ZIPs with conversations. Do NOT activate for single simple prompts without score/analysis/framework requests, general Claude questions, or generic prompt engineering without historical data.\n---\n\n# Empower V4 — AI Usage Evaluator\n\nEmpower V4 is a unified framework for evaluating, comparing, and improving AI/Claude usage patterns across accounts. It normalizes conversation exports, computes structural maturity scores, detects risky prompt patterns, compares accounts, and generates quality-lift reports when human labels are available.\n\n## What Empower V4 Does\n\n**Core capabilities:**\n\n1. **Auto-detect and normalize** Claude exports, CSVs, JSONLs, and ZIP packages\n2. **Compute maturity scores** using structural metrics (prompt format, context richness, task diversity)\n3. **Compare accounts** to identify high-maturity vs high-risk usage patterns\n4. **Detect risk clusters** (short prompts + low context + high expansion ratio)\n5. **Generate upgrade candidates** — top prompts that would benefit from restructuring\n6. **Calculate quality lift** when human labels are available (success rate, rework rate, hallucination rate)\n7. **Export actionable reports** with Markdown summaries, CSV datasets, and optional charts\n\n**Not just \"improve one prompt\"** — Empower V4 operates at scale (50–500+ interactions) to detect systemic patterns and compare organizational usage.\n\n## When to Use This Skill\n\n**Trigger this skill when the user asks for:**\n\n- \"Run Empower V4\"\n- \"Analyze my Claude conversations\"\n- \"Compare accounts\" or \"compare usage patterns\"\n- \"Calculate maturity score\"\n- \"Evaluate quality of my AI usage\"\n- \"Detect risky prompt patterns\"\n- \"Generate usage report\"\n- \"Analyze Claude exports\"\n- \"Improve my evaluation system\"\n- \"Run V2/V3/V4 framework\"\n\n**Also trigger when the user uploads:**\n\n- Claude conversation exports (ZIP, JSON)\n- CSVs with interaction data\n- `ai_interaction_canonical_valid_only.csv`\n- `pattern_registry.csv`\n- `normalized_account_metrics.csv`\n- `quality_label_queue.csv`\n- `quality_labels_completed.csv`\n- RDF-lite fact tables\n- Multiple account exports in ZIP\n\n**Do NOT trigger for:**\n\n- Single prompt improvement requests without analysis/scoring\n- General Claude questions\n- Prompt engineering advice without historical data\n\n## Workflow Overview\n\n```\n1. INPUT DETECTION\n   ├─ Auto-detect format (CSV, JSONL, ZIP, raw export)\n   └─ Select pipeline: canonical / raw_claude / quick_proxy\n\n2. NORMALIZATION\n   ├─ Extract interactions (user_prompt, assistant_response)\n   ├─ Classify task_type, prompt_format, context_richness\n   └─ Generate canonical schema\n\n3. STRUCTURAL ANALYSIS\n   ├─ Compute maturity score per account\n   ├─ Detect prompt format distribution\n   ├─ Calculate expansion ratios\n   └─ Identify risk clusters\n\n4. ACCOUNT COMPARISON\n   ├─ Compare maturity scores\n   ├─ Identify strongest/weakest patterns\n   └─ Flag imbalanced datasets\n\n5. UPGRADE CANDIDATES\n   ├─ Rank prompts by risk + impact\n   ├─ Generate suggested improvements\n   └─ Export top 10–20 candidates\n\n6. QUALITY LABELS (if available)\n   ├─ Join labels to interactions\n   ├─ Compute success_1st_turn, rework_rate, hallucination_rate\n   ├─ Calculate lift/delta vs baseline\n   └─ Generate quality metrics report\n\n7. OUTPUT GENERATION\n   ├─ Markdown report (empower_v4_report.md)\n   ├─ CSV datasets (account_comparison, maturity_scorecard, risk_clusters)\n   ├─ JSON manifest (run_manifest.json)\n   └─ Optional charts (if matplotlib available)\n```\n\n## Input Formats\n\n### Primary Format (Canonical)\n\n**Recommended:**\n- `ai_interaction_canonical_valid_only.csv`\n- `ai_interaction_canonical_valid_only.jsonl`\n\n**Minimum schema:**\n\n```\ninteraction_id        # Unique ID\naccount_id            # Account/user identifier\nconversation_id       # Conversation/session ID\ntimestamp             # ISO format\nuser_prompt           # User input\nassistant_response    # Claude output\ntask_type             # general|analysis|code|research|writing|prompt_engineering\nprompt_format         # short_direct|standard|structured|long_context|multi_instruct\ncontext_richness      # low|medium|high\nprompt_length         # Character count\nresponse_length       # Character count\nturn_sequence         # Turn number in conversation\n```\n\n### Also Accepts\n\n- **ZIP with multiple files** — auto-detects account per file\n- **Raw Claude exports** — normalizes using V2 pipeline\n- **Pattern registries** — `pattern_registry.csv`\n- **Normalized metrics** — `normalized_account_metrics.csv`\n- **Quality labels** — `quality_label_queue.csv`, `quality_labels_completed.csv`\n\n### Auto-Detection Logic\n\n```python\nif \"interaction_id\" in columns and \"prompt_format\" in columns:\n    mode = \"canonical\"\nelif is_claude_export(data):\n    mode = \"raw_claude\"\n    # Extract conversations → messages → pairs\nelse:\n    mode = \"quick_proxy\"\n    # Infer missing columns, emit warnings\n```\n\n## Execution Modes\n\nRun with different modes depending on what the user needs:\n\n### `--mode quick`\nFast maturity score + top risks. No charts, minimal CSVs.\n\n### `--mode compare`\nFocus on account comparison. Requires 2+ accounts.\n\n### `--mode full` (default)\nComplete analysis: maturity, comparison, risks, upgrade candidates, all CSVs.\n\n### `--mode labels`\nQuality analysis with human labels. Requires `quality_labels_completed.csv`.\n\n### `--mode upgrade`\nGenerate top prompt upgrade candidates only.\n\n### `--mode all`\nEverything: full analysis + labels + charts.\n\n## Account Identification\n\nUses fallback hierarchy:\n\n1. `account_id` column\n2. `source_account` column\n3. Filename (e.g., `alice_interactions.csv` → `acct_alice`)\n4. Directory name in ZIP\n5. Stable hash of file content\n\n**Anonymization by default:**\n\n```\naccount_id = acct_<12-char-hash>\n```\n\nExample:\n- `Claude-acct full.zip` → `acct_64156062f99c`\n- `data-batch-0000.zip` → `acct_74c1bc1699e0`\n\n## Quality Labels\n\n### Expected Format\n\n`quality_labels_completed.csv` with:\n\n```\ninteraction_id\nsuccess_1st_turn           # bool\nrework_required            # none|minor|major\nhallucination_detected     # bool\nusefulness_score           # 1-5\nprecision_score            # 1-5\nclarity_score              # 1-5\nnotes                      # text\nlabeler                    # who labeled\nlabel_ts                   # when labeled\n```\n\n### Join Logic\n\nPrimary: `interaction_id`\n\nFallback:\n- `conversation_id + turn_sequence`\n- `hash(user_prompt + assistant_response)`\n\n### Partial Labels OK\n\nExample: 20 labels for 157 interactions is valid, but marked:\n\n```\nOnly 20/157 interactions are labeled. Quality metrics are low-confidence.\n```\n\n**Two separate metric groups:**\n\n- `structural_metrics` — all data\n- `quality_metrics` — only labeled data\n\n## Confidence Thresholds\n\n### Per Account\n\n```\n< 20 interactions     → very_low_confidence\n20–49 interactions    → low_confidence\n50–99 interactions    → medium_confidence\n>= 100 interactions   → high_confidence\n```\n\n### For Human Labels\n\n```\n< 20 labels           → exploratory_only\n20–49 labels          → low_confidence\n50–99 labels          → usable\n>= 100 labels         → strong\n```\n\n### For Account Comparison\n\nEach account should have **>= 30 interactions** for reasonable comparison. Ideal: 50+.\n\nIf imbalanced (e.g., 120 vs 10), the skill compares but warns:\n\n```\nAccount comparison is imbalanced; interpret ratios cautiously.\n```\n\n## Output Structure\n\n### Minimum Outputs\n\n```\nempower_v4_package/\n├── README.md                          # How to use the results\n├── empower_v4_report.md               # Main findings\n├── account_comparison.csv             # Account-level metrics\n├── maturity_scorecard.csv             # Maturity scores + components\n├── risk_clusters.csv                  # High-risk pattern groups\n├── prompt_upgrade_candidates.csv      # Top prompts to rewrite\n├── normalized_interactions.csv        # Canonical interaction format\n└── run_manifest.json                  # Execution metadata\n```\n\n### With Charts (if matplotlib available)\n\n```\ncharts/\n├── maturity_by_account.png\n├── prompt_format_distribution.png\n├── context_richness_distribution.png\n├── expansion_ratio_by_format.png\n└── risk_cluster_heatmap.png\n```\n\nIf matplotlib unavailable:\n\n```\nMatplotlib not found. Generating CSV/MD outputs only.\n```\n\n## Maturity Score Formula\n\nFrom V3 specification:\n\n```python\nmaturity = 1 + 4 * (\n    0.30 * prompt_structure +\n    0.25 * context_richness +\n    0.20 * output_control +\n    0.10 * task_diversity +\n    0.10 * high_value_task_share +\n    0.05 * evidence_attachment\n)\n```\n\n**Maturity levels:**\n\n```\n1.0–1.9  →  L1 Ad-hoc\n2.0–2.9  →  L2 Functional\n3.0–3.9  →  L3 Structured\n4.0–4.5  →  L4 Optimized\n4.6–5.0  →  L5 Systematic\n```\n\n## Baseline & Lift Calculation\n\n### Three Baseline Types\n\n**A. Internal Global Baseline**\n\nDefault. Baseline = mean of all interactions.\n\nUse: Compare each account against general behavior.\n\n**B. Baseline Per Account**\n\nBaseline = first time window of same account.\n\nUse: Before vs after analysis.\n\n**C. Baseline by Weak Pattern**\n\n**Most important for Empower.**\n\nBaseline = `short_direct + low_context`\n\nUse: Calculate lift of structured/high-context against weak baseline.\n\n### Lift Formula\n\n```python\nlift = improved_rate / baseline_rate\ndelta = improved_rate - baseline_rate\nnormalized_delta = (improved_rate - baseline_rate) / baseline_rate\n```\n\n**Without human labels:** Apply only to structural/proxy metrics.\n\n**With human labels:** Apply to:\n- `success_1st_turn`\n- `usefulness_score`\n- `rework_rate`\n- `hallucination_rate`\n- `precision_score`\n- `clarity_score`\n\n## Actionable Report Requirements\n\nEvery report must include:\n\n1. **Top 10 prompts to rewrite** — with reasons + suggested upgrades\n2. **Top risk clusters** — pattern groups with high failure likelihood\n3. **Most mature account** — highest maturity score\n4. **Most risky account** — highest risk concentration\n5. **Biggest gap** — largest maturity delta between accounts\n6. **Recommended template** — V3 prompt quality template or custom\n7. **Next action** — concrete, objective step\n\n### Prompt Upgrade Candidate Criteria\n\nFlag prompts with:\n- `short_direct + low_context`\n- High expansion ratio (response >> prompt)\n- Very long response to very short prompt\n- High-value task type: `analysis`, `research`, `code`, `writing`, `strategy`\n\nEach candidate shows:\n\n```\ninteraction_id\naccount_id\ntask_type\nprompt_preview          # First 100 chars\nresponse_length\nexpansion_ratio\nrisk_reason             # Why flagged\nsuggested_upgrade       # Recommended improvement\n```\n\n## Versioning & Compatibility\n\n**V4 is backward-compatible with V2/V3.**\n\n### Supported Formats\n\n**V2:**\n- Canonical interactions\n- RDF-lite facts\n- Pattern registry\n- Normalized account metrics\n\n**V3:**\n- Maturity scorecard\n- Quality label queue\n- Prompt upgrade candidates\n- Account comparison\n\n**V4:**\n- Unified evaluator\n- CLI with modes\n- Full report suite\n- Charts\n- Quality lift analysis\n\n**Do not assume** all data is in V3 format. Auto-detect and normalize.\n\n## Using the Skill\n\n### Step 1: Understand User Intent\n\nUser provides one or more of:\n- Claude conversation export (ZIP, JSON)\n- CSV/JSONL of interactions\n- Existing V2/V3 datasets\n- Quality labels file\n\n**Ask clarifying questions:**\n\n- \"Do you have quality labels, or should I use structural metrics only?\"\n- \"Do you want to compare multiple accounts, or analyze a single account?\"\n- \"Should I generate charts, or just CSV/Markdown?\"\n- \"Do you want the full report, or just maturity scores?\"\n\n### Step 2: Auto-Detect Input Format\n\nRead the uploaded file(s) and determine:\n- Is this canonical CSV/JSONL?\n- Is this a raw Claude export?\n- Is this a ZIP with multiple files?\n- Does it have quality labels?\n\n### Step 3: Run Normalization\n\nUse `empower_v4_evaluator.py` (created by this skill) to:\n\n1. Load data\n2. Normalize to canonical schema\n3. Classify task types, prompt formats, context richness\n4. Compute structural metrics\n\n### Step 4: Execute Analysis\n\nBased on selected mode:\n- Compute maturity scores\n- Compare accounts (if 2+)\n- Detect risk clusters\n- Generate upgrade candidates\n- Join quality labels (if available)\n- Calculate lift/delta\n\n### Step 5: Generate Outputs\n\nCreate:\n- `empower_v4_report.md` — main findings\n- CSV datasets — structured data\n- `run_manifest.json` — metadata\n- Charts (if requested and matplotlib available)\n\n### Step 6: Present Results\n\nUse the `present_files` tool to share:\n- Report (Markdown)\n- Key CSVs\n- Charts (if generated)\n\nExplain the findings in conversation:\n- What the maturity score means\n- Which accounts are strongest/weakest\n- What the top risks are\n- What to do next\n\n## Python Dependencies\n\n### Core (Required)\n\n```\npython >= 3.10\npandas\n```\n\n### Optional\n\n```\nmatplotlib    # Static charts\nopenpyxl      # XLSX export\nduckdb        # Large-scale local analysis\npyarrow       # Parquet support\n```\n\n**Graceful degradation:**\n\n```python\ntry:\n    import matplotlib.pyplot as plt\n    charts_enabled = True\nexcept ImportError:\n    charts_enabled = False\n    print(\"Matplotlib not available. Generating CSV/MD outputs only.\")\n```\n\n## Example Usage Flows\n\n### Flow 1: Single Account, No Labels\n\n```\nUser: \"Analyze my Claude usage\"\nAssistant: [reads skill] → uses empower_v4_evaluator.py\n  - Detects canonical CSV\n  - Computes maturity score: 2.7 / 5.0 (L3 Structured)\n  - Flags top 10 upgrade candidates\n  - Generates report + CSVs\n```\n\n### Flow 2: Two Accounts, Compare\n\n```\nUser: [uploads ZIP with alice.csv and bob.csv]\nAssistant: [reads skill] → runs account comparison\n  - alice: maturity 3.2 (L3 Structured)\n  - bob: maturity 2.1 (L2 Functional)\n  - Gap: 1.1 points\n  - Recommendation: Bob should adopt structured prompts\n```\n\n### Flow 3: With Quality Labels\n\n```\nUser: [uploads interactions.csv + quality_labels.csv]\nAssistant: [reads skill] → runs quality lift analysis\n  - Structural maturity: 2.8\n  - Success 1st turn: 68%\n  - Rework rate: 32%\n  - Hallucination rate: 12%\n  - Lift (structured vs short_direct): +22% success rate\n```\n\n### Flow 4: Quick Mode\n\n```\nUser: \"Quick maturity check\"\nAssistant: [reads skill] → runs --mode quick\n  - Maturity: 2.5 / 5.0\n  - Top risk: 58% short_direct + low_context\n  - Top upgrade: 12 analysis tasks with <50 char prompts\n```\n\n## Reference Files\n\nThe skill includes detailed references:\n\n- `references/v2_compatibility.md` — How to work with V2 data\n- `references/v3_compatibility.md` — How to work with V3 data  \n- `references/metric_formulas.md` — All scoring formulas explained\n\nRead these when:\n- User has V2/V3 data and asks about compatibility\n- User questions how maturity score is calculated\n- User wants to understand lift/delta formulas\n\n## Script: empower_v4_evaluator.py\n\nThe main Python script created by this skill. It handles:\n\n1. Input auto-detection\n2. Normalization pipelines\n3. Metric computation\n4. Account comparison\n5. Risk clustering\n6. Upgrade candidate ranking\n7. Quality label joining\n8. Lift calculation\n9. Report generation\n\n**CLI interface:**\n\n```bash\npython empower_v4_evaluator.py \\\n  --input data.csv \\\n  --mode full \\\n  --output ./empower_v4_package \\\n  --labels quality_labels.csv \\\n  --charts\n```\n\nSee `examples/` directory for sample inputs and expected outputs.\n\n## Test Cases\n\nThe skill creates test scripts in `tests/`:\n\n1. `test_minimal_input.py` — CSV with 2 accounts → generates comparison\n2. `test_no_labels.py` — No labels → structural metrics only, correct warnings\n3. `test_with_labels.py` — With labels → quality lift + z-score calculation\n4. `test_risk_detection.py` — Many short_direct + low_context → high risk classification\n5. `test_structured_account.py` — Structured + high_context → high maturity\n6. `test_missing_columns.py` — Incomplete schema → clear error + fix instructions\n7. `test_small_dataset.py` — <20 interactions → low confidence warning\n\nRun tests with:\n\n```bash\npython -m pytest tests/\n```\n\n## Important Notes\n\n### Proxy Metrics vs Quality Metrics\n\n**Without labels:**\n\n```\nThese are proxy metrics, not validated quality metrics.\nStructural maturity != actual usefulness.\n```\n\n**With labels:**\n\n```\nQuality metrics based on 87 labeled interactions (55% coverage).\n```\n\n### Statistical Confidence\n\nAlways flag low-confidence results:\n\n```\nDataset: 18 interactions (very low confidence).\nMaturity score should be interpreted as exploratory only.\n```\n\n### Privacy & Anonymization\n\nAccount IDs are hashed by default. User prompts and responses are NOT logged to any external service.\n\nAll processing is local.\n\n## Summary\n\nEmpower V4 is a complete evaluation framework for AI usage patterns. It:\n\n- Accepts messy, real-world data\n- Normalizes to a canonical format\n- Computes structural maturity scores\n- Compares accounts\n- Detects risks\n- Recommends improvements\n- Calculates quality lift when labels exist\n- Generates actionable reports\n\nUse it to understand **how** people are using AI, identify weak patterns, and measure improvement over time.---\n#!/usr/bin/env python3\n\"\"\"\nEmpower V4 — AI Usage Evaluator\n\nNormalizes Claude/AI conversation exports, computes maturity scores,\ndetects risky prompt patterns, compares accounts, and generates\nquality-lift reports when human labels are available.\n\nUsage:\n    python empower_v4_evaluator.py --input data.csv --mode full --output ./out\n\"\"\"\n\nimport argparse\nimport hashlib\nimport json\nimport sys\nfrom datetime import datetime\nfrom pathlib import Path\nfrom typing import Any, Dict, List, Optional, Tuple\n\nimport pandas as pd\n\n# Optional dependencies\ntry:\n    import matplotlib.pyplot as plt\n    import matplotlib\n    matplotlib.use('Agg')  # Non-interactive backend\n    CHARTS_AVAILABLE = True\nexcept ImportError:\n    CHARTS_AVAILABLE = False\n    print(\"Warning: matplotlib not available. Charts will not be generated.\")\n\n\nclass EmpowerV4Evaluator:\n    \"\"\"Main evaluator for Empower V4 framework.\"\"\"\n    \n    def __init__(self, config: Optional[Dict[str, Any]] = None):\n        self.config = config or self._default_config()\n        self.mode = \"canonical\"\n        self.df = None\n        self.labels_df = None\n        self.accounts = []\n        self.results = {}\n        \n    def _default_config(self) -> Dict[str, Any]:\n        \"\"\"Default configuration.\"\"\"\n        return {\n            \"maturity_weights\": {\n                \"prompt_structure\": 0.30,\n                \"context_richness\": 0.25,\n                \"output_control\": 0.20,\n                \"task_diversity\": 0.10,\n                \"high_value_task_share\": 0.10,\n                \"evidence_attachment\": 0.05\n            },\n            \"confidence_thresholds\": {\n                \"very_low\": 20,\n                \"low\": 50,\n                \"medium\": 100\n            },\n            \"label_thresholds\": {\n                \"exploratory\": 20,\n                \"low\": 50,\n                \"usable\": 100\n            },\n            \"task_categories\": {\n                \"high_value\": [\"analysis\", \"research\", \"code\", \"writing\", \"strategy\"],\n                \"medium_value\": [\"prompt_engineering\", \"planning\"],\n                \"low_value\": [\"general\", \"chat\", \"other\"]\n            },\n            \"prompt_formats\": [\"short_direct\", \"standard\", \"structured\", \"long_context\", \"multi_instruct\"],\n            \"context_levels\": [\"low\", \"medium\", \"high\"]\n        }\n    \n    def auto_detect_format(self, filepath: Path) -> str:\n        \"\"\"Auto-detect input format and select pipeline.\"\"\"\n        try:\n            # Try reading as CSV first\n            df = pd.read_csv(filepath, nrows=5)\n            cols = set(df.columns.str.lower())\n            \n            # Check for canonical format\n            required_canonical = {'interaction_id', 'user_prompt', 'assistant_response'}\n            if required_canonical.issubset(cols):\n                print(f\"✓ Detected canonical format\")\n                return \"canonical\"\n            \n            # Check for raw Claude export indicators\n            claude_indicators = {'content', 'role', 'model', 'created_at'}\n            if any(ind in cols for ind in claude_indicators):\n                print(f\"⚠ Detected raw Claude export format\")\n                return \"raw_claude\"\n            \n            # Fallback to quick proxy\n            print(f\"⚠ Using quick_proxy mode (some columns missing)\")\n            return \"quick_proxy\"\n            \n        except Exception as e:\n            print(f\"Error detecting format: {e}\")\n            return \"quick_proxy\"\n    \n    def load_data(self, filepath: Path) -> pd.DataFrame:\n        \"\"\"Load and normalize input data.\"\"\"\n        print(f\"\\nLoading data from: {filepath}\")\n        \n        # Auto-detect format\n        self.mode = self.auto_detect_format(filepath)\n        \n        # Load based on extension\n        if filepath.suffix == '.csv':\n            df = pd.read_csv(filepath)\n        elif filepath.suffix == '.jsonl':\n            df = pd.read_json(filepath, lines=True)\n        elif filepath.suffix == '.json':\n            df = pd.read_json(filepath)\n        else:\n            raise ValueError(f\"Unsupported file format: {filepath.suffix}\")\n        \n        print(f\"Loaded {len(df)} rows\")\n        \n        # Normalize based on detected mode\n        if self.mode == \"canonical\":\n            df = self._normalize_canonical(df)\n        elif self.mode == \"raw_claude\":\n            df = self._normalize_raw_claude(df)\n        else:\n            df = self._normalize_quick_proxy(df)\n        \n        self.df = df\n        self.accounts = sorted(df['account_id'].unique().tolist())\n        print(f\"Found {len(self.accounts)} account(s): {', '.join(self.accounts)}\")\n        \n        return df\n    \n    def _normalize_canonical(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize canonical format data.\"\"\"\n        # Ensure required columns exist\n        required = ['interaction_id', 'user_prompt', 'assistant_response']\n        missing = [col for col in required if col not in df.columns]\n        if missing:\n            raise ValueError(f\"Missing required columns: {missing}\")\n        \n        # Ensure account_id exists\n        if 'account_id' not in df.columns:\n            df['account_id'] = self._infer_account_id(df)\n        \n        # Add missing optional columns with defaults\n        if 'conversation_id' not in df.columns:\n            df['conversation_id'] = df['interaction_id'].apply(lambda x: x.split('_')[0] if '_' in x else 'conv_unknown')\n        \n        if 'timestamp' not in df.columns:\n            df['timestamp'] = datetime.now().isoformat()\n        \n        if 'turn_sequence' not in df.columns:\n            df['turn_sequence'] = df.groupby('conversation_id').cumcount() + 1\n        \n        # Compute derived columns if missing\n        if 'prompt_length' not in df.columns:\n            df['prompt_length'] = df['user_prompt'].fillna('').str.len()\n        \n        if 'response_length' not in df.columns:\n            df['response_length'] = df['assistant_response'].fillna('').str.len()\n        \n        if 'task_type' not in df.columns:\n            df['task_type'] = df.apply(self._infer_task_type, axis=1)\n        \n        if 'prompt_format' not in df.columns:\n            df['prompt_format'] = df.apply(self._infer_prompt_format, axis=1)\n        \n        if 'context_richness' not in df.columns:\n            df['context_richness'] = df.apply(self._infer_context_richness, axis=1)\n        \n        # Compute expansion ratio\n        df['expansion_ratio'] = df['response_length'] / (df['prompt_length'] + 1)\n        \n        return df\n    \n    def _normalize_raw_claude(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize raw Claude export format.\"\"\"\n        print(\"⚠ Raw Claude export normalization not fully implemented yet.\")\n        print(\"⚠ Treating as quick_proxy mode.\")\n        return self._normalize_quick_proxy(df)\n    \n    def _normalize_quick_proxy(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize incomplete data with proxy inference.\"\"\"\n        print(\"\\n⚠ PROXY MODE ACTIVE\")\n        print(\"⚠ These are proxy metrics, not validated quality metrics.\")\n        \n        # Try to find prompt/response columns with fuzzy matching\n        prompt_col = None\n        response_col = None\n        \n        for col in df.columns:\n            col_lower = col.lower()\n            if 'prompt' in col_lower or 'user' in col_lower or 'input' in col_lower:\n                prompt_col = col\n            if 'response' in col_lower or 'assistant' in col_lower or 'output' in col_lower:\n                response_col = col\n        \n        if not prompt_col or not response_col:\n            raise ValueError(\"Could not identify prompt and response columns. Please provide canonical format.\")\n        \n        # Create canonical columns\n        df_norm = df.copy()\n        df_norm['user_prompt'] = df[prompt_col]\n        df_norm['assistant_response'] = df[response_col]\n        \n        # Generate interaction IDs\n        if 'interaction_id' not in df_norm.columns:\n            df_norm['interaction_id'] = [f\"int_{i:06d}\" for i in range(len(df_norm))]\n        \n        # Infer account\n        df_norm['account_id'] = self._infer_account_id(df_norm)\n        \n        # Add defaults\n        df_norm['conversation_id'] = df_norm['interaction_id'].apply(lambda x: x.split('_')[0])\n        df_norm['timestamp'] = datetime.now().isoformat()\n        df_norm['turn_sequence'] = 1\n        \n        # Compute metrics\n        df_norm['prompt_length'] = df_norm['user_prompt'].fillna('').str.len()\n        df_norm['response_length'] = df_norm['assistant_response'].fillna('').str.len()\n        df_norm['expansion_ratio'] = df_norm['response_length'] / (df_norm['prompt_length'] + 1)\n        \n        df_norm['task_type'] = df_norm.apply(self._infer_task_type, axis=1)\n        df_norm['prompt_format'] = df_norm.apply(self._infer_prompt_format, axis=1)\n        df_norm['context_richness'] = df_norm.apply(self._infer_context_richness, axis=1)\n        \n        return df_norm\n    \n    def _infer_account_id(self, df: pd.DataFrame) -> str:\n        \"\"\"Infer account ID from data or generate stable hash.\"\"\"\n        # Try to find account column\n        for col in df.columns:\n            if 'account' in col.lower():\n                return df[col].iloc[0] if not df[col].isna().all() else self._generate_account_hash(df)\n        \n        # Generate stable hash\n        return self._generate_account_hash(df)\n    \n    def _generate_account_hash(self, df: pd.DataFrame) -> str:\n        \"\"\"Generate stable 12-char hash for account ID.\"\"\"\n        # Use first few rows as fingerprint\n        fingerprint = str(df.head(3).to_dict())\n        hash_val = hashlib.md5(fingerprint.encode()).hexdigest()[:12]\n        return f\"acct_{hash_val}\"\n    \n    def _infer_task_type(self, row: pd.Series) -> str:\n        \"\"\"Infer task type from prompt content.\"\"\"\n        prompt = str(row.get('user_prompt', '')).lower()\n        \n        # Keywords for different task types\n        if any(kw in prompt for kw in ['analyze', 'analysis', 'evaluate', 'assess', 'compare']):\n            return 'analysis'\n        elif any(kw in prompt for kw in ['code', 'python', 'javascript', 'function', 'class', 'debug']):\n            return 'code'\n        elif any(kw in prompt for kw in ['research', 'find', 'search', 'investigate', 'study']):\n            return 'research'\n        elif any(kw in prompt for kw in ['write', 'draft', 'compose', 'create', 'blog', 'article']):\n            return 'writing'\n        elif any(kw in prompt for kw in ['prompt', 'improve', 'rewrite', 'optimize']):\n            return 'prompt_engineering'\n        elif any(kw in prompt for kw in ['strategy', 'plan', 'roadmap', 'framework']):\n            return 'strategy'\n        else:\n            return 'general'\n    \n    def _infer_prompt_format(self, row: pd.Series) -> str:\n        \"\"\"Infer prompt format from structure.\"\"\"\n        prompt = str(row.get('user_prompt', ''))\n        length = len(prompt)\n        \n        # Check for structured indicators\n        structured_indicators = ['\\n##', '\\n#', '---', '```', 'CONTEXT:', 'TASK:', 'OUTPUT:']\n        has_structure = any(ind in prompt for ind in structured_indicators)\n        \n        # Check for multi-step instructions\n        has_steps = any(ind in prompt for ind in ['\\n1.', '\\n2.', '\\n-', '\\n*'])\n        \n        if length < 100:\n            return 'short_direct'\n        elif length < 300:\n            return 'standard'\n        elif has_structure or has_steps:\n            if has_steps:\n                return 'multi_instruct'\n            else:\n                return 'structured'\n        elif length >= 500:\n            return 'long_context'\n        else:\n            return 'standard'\n    \n    def _infer_context_richness(self, row: pd.Series) -> str:\n        \"\"\"Infer context richness from prompt content.\"\"\"\n        prompt = str(row.get('user_prompt', ''))\n        \n        # Context indicators\n        context_markers = [\n            'context:', 'background:', 'given', 'assuming', 'based on',\n            'file:', 'data:', 'document:', 'previous', 'earlier'\n        ]\n        \n        context_count = sum(1 for marker in context_markers if marker in prompt.lower())\n        \n        # Check for attachments/evidence\n        has_evidence = '[' in prompt and ']' in prompt  # Links or references\n        \n        if context_count >= 3 or has_evidence:\n            return 'high'\n        elif context_count >= 1:\n            return 'medium'\n        else:\n            return 'low'\n    \n    def load_quality_labels(self, filepath: Path) -> pd.DataFrame:\n        \"\"\"Load quality labels and join to interactions.\"\"\"\n        print(f\"\\nLoading quality labels from: {filepath}\")\n        \n        labels_df = pd.read_csv(filepath)\n        print(f\"Loaded {len(labels_df)} labels\")\n        \n        # Validate required columns\n        required = ['interaction_id']\n        missing = [col for col in required if col not in labels_df.columns]\n        if missing:\n            raise ValueError(f\"Labels file missing required columns: {missing}\")\n        \n        # Join to main dataframe\n        if self.df is None:\n            raise ValueError(\"Must load interaction data before labels\")\n        \n        self.labels_df = labels_df\n        \n        # Merge\n        df_merged = self.df.merge(labels_df, on='interaction_id', how='left')\n        labeled_count = df_merged['usefulness_score'].notna().sum()\n        \n        print(f\"Joined {labeled_count}/{len(self.df)} interactions with labels ({labeled_count/len(self.df)*100:.1f}% coverage)\")\n        \n        if labeled_count < self.config['label_thresholds']['exploratory']:\n            print(f\"⚠ Warning: Only {labeled_count} labels (< {self.config['label_thresholds']['exploratory']}). Quality metrics are exploratory only.\")\n        \n        self.df = df_merged\n        return df_merged\n    \n    def compute_maturity_score(self, account_id: Optional[str] = None) -> Dict[str, float]:\n        \"\"\"Compute maturity score for account or overall.\"\"\"\n        df = self.df if account_id is None else self.df[self.df['account_id'] == account_id]\n        \n        if len(df) < self.config['confidence_thresholds']['very_low']:\n            confidence = \"very_low_confidence\"\n        elif len(df) < self.config['confidence_thresholds']['low']:\n            confidence = \"low_confidence\"\n        elif len(df) < self.config['confidence_thresholds']['medium']:\n            confidence = \"medium_confidence\"\n        else:\n            confidence = \"high_confidence\"\n        \n        # Component scores\n        prompt_structure = self._score_prompt_structure(df)\n        context_richness = self._score_context_richness(df)\n        output_control = self._score_output_control(df)\n        task_diversity = self._score_task_diversity(df)\n        high_value_share = self._score_high_value_share(df)\n        evidence_attachment = self._score_evidence_attachment(df)\n        \n        # Weighted maturity score\n        weights = self.config['maturity_weights']\n        maturity = 1 + 4 * (\n            weights['prompt_structure'] * prompt_structure +\n            weights['context_richness'] * context_richness +\n            weights['output_control'] * output_control +\n            weights['task_diversity'] * task_diversity +\n            weights['high_value_task_share'] * high_value_share +\n            weights['evidence_attachment'] * evidence_attachment\n        )\n        \n        # Determine level\n        if maturity < 2.0:\n            level = \"L1 Ad-hoc\"\n        elif maturity < 3.0:\n            level = \"L2 Functional\"\n        elif maturity < 4.0:\n            level = \"L3 Structured\"\n        elif maturity < 4.6:\n            level = \"L4 Optimized\"\n        else:\n            level = \"L5 Systematic\"\n        \n        return {\n            'maturity_score': round(maturity, 2),\n            'level': level,\n            'confidence': confidence,\n            'n_interactions': len(df),\n            'components': {\n                'prompt_structure': round(prompt_structure, 3),\n                'context_richness': round(context_richness, 3),\n                'output_control': round(output_control, 3),\n                'task_diversity': round(task_diversity, 3),\n                'high_value_task_share': round(high_value_share, 3),\n                'evidence_attachment': round(evidence_attachment, 3)\n            }\n        }\n    \n    def _score_prompt_structure(self, df: pd.DataFrame) -> float:\n        \"\"\"Score prompt structure quality.\"\"\"\n        # Higher score for structured/multi_instruct formats\n        format_scores = {\n            'short_direct': 0.0,\n            'standard': 0.3,\n            'structured': 0.7,\n            'long_context': 0.5,\n            'multi_instruct': 1.0\n        }\n        \n        dist = df['prompt_format'].value_counts(normalize=True)\n        score = sum(dist.get(fmt, 0) * format_scores.get(fmt, 0) for fmt in format_scores)\n        return score\n    \n    def _score_context_richness(self, df: pd.DataFrame) -> float:\n        \"\"\"Score context richness.\"\"\"\n        richness_scores = {'low': 0.0, 'medium': 0.5, 'high': 1.0}\n        dist = df['context_richness'].value_counts(normalize=True)\n        score = sum(dist.get(lvl, 0) * richness_scores[lvl] for lvl in richness_scores)\n        return score\n    \n    def _score_output_control(self, df: pd.DataFrame) -> float:\n        \"\"\"Score output control (presence of format specifications).\"\"\"\n        # Proxy: check for output-related keywords in prompts\n        control_keywords = ['format:', 'output:', 'return:', 'structure:', 'json', 'csv', 'markdown']\n        has_control = df['user_prompt'].fillna('').str.lower().apply(\n            lambda x: any(kw in x for kw in control_keywords)\n        )\n        return has_control.mean()\n    \n    def _score_task_diversity(self, df: pd.DataFrame) -> float:\n        \"\"\"Score task diversity.\"\"\"\n        task_counts = df['task_type'].value_counts()\n        diversity = len(task_counts) / 7  # Normalize by max possible types\n        return min(diversity, 1.0)\n    \n    def _score_high_value_share(self, df: pd.DataFrame) -> float:\n        \"\"\"Score share of high-value tasks.\"\"\"\n        high_value = self.config['task_categories']['high_value']\n        high_value_count = df['task_type'].isin(high_value).sum()\n        return high_value_count / len(df) if len(df) > 0 else 0.0\n    \n    def _score_evidence_attachment(self, df: pd.DataFrame) -> float:\n        \"\"\"Score evidence/attachment usage.\"\"\"\n        # Proxy: check for file references, links, data mentions\n        evidence_markers = ['file:', 'attached', 'document:', '[http', 'data:', 'csv', 'excel']\n        has_evidence = df['user_prompt'].fillna('').str.lower().apply(\n            lambda x: any(marker in x for marker in evidence_markers)\n        )\n        return has_evidence.mean()\n    \n    def detect_risk_clusters(self) -> pd.DataFrame:\n        \"\"\"Detect high-risk prompt patterns.\"\"\"\n        risks = []\n        \n        for idx, row in self.df.iterrows():\n            risk_score = 0\n            risk_reasons = []\n            \n            # Risk: short_direct + low_context\n            if row['prompt_format'] == 'short_direct' and row['context_richness'] == 'low':\n                risk_score += 2\n                risk_reasons.append(\"short_direct+low_context\")\n            \n            # Risk: high expansion ratio\n            if row['expansion_ratio'] > 20:\n                risk_score += 1\n                risk_reasons.append(f\"high_expansion({row['expansion_ratio']:.1f})\")\n            \n            # Risk: very short prompt for high-value task\n            high_value = self.config['task_categories']['high_value']\n            if row['task_type'] in high_value and row['prompt_length'] < 50:\n                risk_score += 1\n                risk_reasons.append(f\"short_prompt_for_{row['task_type']}\")\n            \n            if risk_score > 0:\n                risks.append({\n                    'interaction_id': row['interaction_id'],\n                    'account_id': row['account_id'],\n                    'risk_score': risk_score,\n                    'risk_reasons': ', '.join(risk_reasons),\n                    'prompt_format': row['prompt_format'],\n                    'context_richness': row['context_richness'],\n                    'task_type': row['task_type'],\n                    'prompt_length': row['prompt_length'],\n                    'expansion_ratio': round(row['expansion_ratio'], 2)\n                })\n        \n        return pd.DataFrame(risks).sort_values('risk_score', ascending=False) if risks else pd.DataFrame()\n    \n    def generate_upgrade_candidates(self, top_n: int = 10) -> pd.DataFrame:\n        \"\"\"Generate top N prompt upgrade candidates.\"\"\"\n        candidates = []\n        \n        high_value = self.config['task_categories']['high_value']\n        \n        for idx, row in self.df.iterrows():\n            upgrade_score = 0\n            reasons = []\n            \n            # Criteria for upgrade\n            if row['prompt_format'] == 'short_direct':\n                upgrade_score += 2\n                reasons.append(\"short_direct_format\")\n            \n            if row['context_richness'] == 'low':\n                upgrade_score += 1\n                reasons.append(\"low_context\")\n            \n            if row['expansion_ratio'] > 15:\n                upgrade_score += 1\n                reasons.append(f\"high_expansion({row['expansion_ratio']:.1f})\")\n            \n            if row['task_type'] in high_value:\n                upgrade_score += 2\n                reasons.append(f\"high_value_task({row['task_type']})\")\n            \n            if upgrade_score >= 3:\n                prompt_preview = row['user_prompt'][:100] + '...' if len(row['user_prompt']) > 100 else row['user_prompt']\n                \n                candidates.append({\n                    'interaction_id': row['interaction_id'],\n                    'account_id': row['account_id'],\n                    'task_type': row['task_type'],\n                    'upgrade_score': upgrade_score,\n                    'prompt_preview': prompt_preview,\n                    'prompt_length': row['prompt_length'],\n                    'response_length': row['response_length'],\n                    'expansion_ratio': round(row['expansion_ratio'], 2),\n                    'risk_reason': ', '.join(reasons),\n                    'suggested_upgrade': self._suggest_upgrade(row)\n                })\n        \n        df_candidates = pd.DataFrame(candidates)\n        if not df_candidates.empty:\n            df_candidates = df_candidates.sort_values('upgrade_score', ascending=False).head(top_n)\n        \n        return df_candidates\n    \n    def _suggest_upgrade(self, row: pd.Series) -> str:\n        \"\"\"Suggest upgrade strategy for a prompt.\"\"\"\n        suggestions = []\n        \n        if row['prompt_format'] == 'short_direct':\n            suggestions.append(\"Use structured format with CONTEXT/TASK/OUTPUT sections\")\n        \n        if row['context_richness'] == 'low':\n            suggestions.append(\"Add relevant context and constraints\")\n        \n        if row['task_type'] in self.config['task_categories']['high_value']:\n            suggestions.append(\"Break down into subtasks with clear success criteria\")\n        \n        return '; '.join(suggestions) if suggestions else \"Add more structure and context\"\n    \n    def compare_accounts(self) -> pd.DataFrame:\n        \"\"\"Compare maturity scores across accounts.\"\"\"\n        if len(self.accounts) < 2:\n            print(\"⚠ Only 1 account found. Skipping comparison.\")\n            return pd.DataFrame()\n        \n        comparison = []\n        \n        for account_id in self.accounts:\n            metrics = self.compute_maturity_score(account_id)\n            df_account = self.df[self.df['account_id'] == account_id]\n            \n            # Format distribution\n            format_dist = df_account['prompt_format'].value_counts(normalize=True).to_dict()\n            \n            # Risk rate\n            risks = self.detect_risk_clusters()\n            risk_count = len(risks[risks['account_id'] == account_id]) if not risks.empty else 0\n            risk_rate = risk_count / len(df_account) if len(df_account) > 0 else 0\n            \n            comparison.append({\n                'account_id': account_id,\n                'maturity_score': metrics['maturity_score'],\n                'level': metrics['level'],\n                'confidence': metrics['confidence'],\n                'n_interactions': metrics['n_interactions'],\n                'short_direct_rate': format_dist.get('short_direct', 0),\n                'structured_rate': format_dist.get('structured', 0) + format_dist.get('multi_instruct', 0),\n                'risk_rate': round(risk_rate, 3)\n            })\n        \n        df_comparison = pd.DataFrame(comparison).sort_values('maturity_score', ascending=False)\n        \n        # Flag imbalance\n        max_n = df_comparison['n_interactions'].max()\n        min_n = df_comparison['n_interactions'].min()\n        if max_n / min_n > 3:\n            print(f\"⚠ Account comparison is imbalanced ({min_n} vs {max_n} interactions). Interpret ratios cautiously.\")\n        \n        return df_comparison\n    \n    def compute_quality_metrics(self) -> Optional[Dict[str, Any]]:\n        \"\"\"Compute quality metrics from human labels.\"\"\"\n        if self.labels_df is None or 'usefulness_score' not in self.df.columns:\n            print(\"⚠ No quality labels available. Skipping quality metrics.\")\n            return None\n        \n        labeled = self.df[self.df['usefulness_score'].notna()]\n        \n        if len(labeled) == 0:\n            print(\"⚠ No labeled interactions found.\")\n            return None\n        \n        metrics = {\n            'n_labeled': len(labeled),\n            'coverage': round(len(labeled) / len(self.df), 3),\n            'usefulness_avg': round(labeled['usefulness_score'].mean(), 2),\n            'precision_avg': round(labeled['precision_score'].mean(), 2) if 'precision_score' in labeled.columns else None,\n            'clarity_avg': round(labeled['clarity_score'].mean(), 2) if 'clarity_score' in labeled.columns else None,\n        }\n        \n        # Success/rework rates\n        if 'success_1st_turn' in labeled.columns:\n            metrics['success_1st_turn_rate'] = round(labeled['success_1st_turn'].mean(), 3)\n        \n        if 'rework_required' in labeled.columns:\n            rework_major = (labeled['rework_required'] == 'major').mean()\n            metrics['major_rework_rate'] = round(rework_major, 3)\n        \n        if 'hallucination_detected' in labeled.columns:\n            metrics['hallucination_rate'] = round(labeled['hallucination_detected'].mean(), 3)\n        \n        return metrics\n    \n    def generate_report(self, output_dir: Path) -> Path:\n        \"\"\"Generate main Markdown report.\"\"\"\n        output_dir.mkdir(parents=True, exist_ok=True)\n        report_path = output_dir / \"empower_v4_report.md\"\n        \n        # Overall maturity\n        overall_maturity = self.compute_maturity_score()\n        \n        # Account comparison\n        comparison = self.compare_accounts()\n        \n        # Risk clusters\n        risks = self.detect_risk_clusters()\n        \n        # Upgrade candidates\n        upgrades = self.generate_upgrade_candidates(top_n=10)\n        \n        # Quality metrics\n        quality = self.compute_quality_metrics()\n        \n        # Generate report\n        with open(report_path, 'w') as f:\n            f.write(\"# Empower V4 — AI Usage Evaluation Report\\n\\n\")\n            f.write(f\"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\\n\\n\")\n            f.write(f\"**Total interactions:** {len(self.df)}\\n\")\n            f.write(f\"**Accounts analyzed:** {len(self.accounts)}\\n\\n\")\n            \n            if self.mode == \"quick_proxy\":\n                f.write(\"⚠ **PROXY MODE ACTIVE** — These are structural metrics, not validated quality metrics.\\n\\n\")\n            \n            f.write(\"---\\n\\n\")\n            f.write(\"## Overall Maturity\\n\\n\")\n            f.write(f\"**Maturity Score:** {overall_maturity['maturity_score']} / 5.00\\n\\n\")\n            f.write(f\"**Level:** {overall_maturity['level']}\\n\\n\")\n            f.write(f\"**Confidence:** {overall_maturity['confidence']} ({overall_maturity['n_interactions']} interactions)\\n\\n\")\n            \n            f.write(\"### Component Scores\\n\\n\")\n            for comp, score in overall_maturity['components'].items():\n                f.write(f\"- {comp}: {score}\\n\")\n            f.write(\"\\n\")\n            \n            if not comparison.empty:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Account Comparison\\n\\n\")\n                f.write(comparison.to_markdown(index=False))\n                f.write(\"\\n\\n\")\n                \n                best = comparison.iloc[0]\n                worst = comparison.iloc[-1]\n                f.write(f\"**Most mature account:** {best['account_id']} (score: {best['maturity_score']})\\n\\n\")\n                f.write(f\"**Most risky account:** {worst['account_id']} (risk rate: {worst['risk_rate']:.1%})\\n\\n\")\n                f.write(f\"**Biggest gap:** {best['maturity_score'] - worst['maturity_score']:.2f} points\\n\\n\")\n            \n            if not risks.empty:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Top Risk Clusters\\n\\n\")\n                f.write(risks.head(10).to_markdown(index=False))\n                f.write(\"\\n\\n\")\n            \n            if not upgrades.empty:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Top 10 Prompt Upgrade Candidates\\n\\n\")\n                f.write(upgrades.to_markdown(index=False))\n                f.write(\"\\n\\n\")\n            \n            if quality:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Quality Metrics (from labels)\\n\\n\")\n                f.write(f\"**Labeled interactions:** {quality['n_labeled']} / {len(self.df)} ({quality['coverage']:.1%} coverage)\\n\\n\")\n                f.write(f\"**Average usefulness:** {quality['usefulness_avg']} / 5.0\\n\\n\")\n                if quality.get('precision_avg'):\n                    f.write(f\"**Average precision:** {quality['precision_avg']} / 5.0\\n\\n\")\n                if quality.get('success_1st_turn_rate') is not None:\n                    f.write(f\"**Success on first turn:** {quality['success_1st_turn_rate']:.1%}\\n\\n\")\n                if quality.get('major_rework_rate') is not None:\n                    f.write(f\"**Major rework required:** {quality['major_rework_rate']:.1%}\\n\\n\")\n                if quality.get('hallucination_rate') is not None:\n                    f.write(f\"**Hallucination detected:** {quality['hallucination_rate']:.1%}\\n\\n\")\n            \n            f.write(\"---\\n\\n\")\n            f.write(\"## Recommended Next Actions\\n\\n\")\n            f.write(\"1. **Rewrite top upgrade candidates** using structured format (CONTEXT/TASK/OUTPUT)\\n\")\n            f.write(\"2. **Address risk clusters** by adding context and breaking down complex tasks\\n\")\n            if len(self.accounts) > 1:\n                f.write(f\"3. **Share best practices** from {comparison.iloc[0]['account_id']} with other accounts\\n\")\n            f.write(\"4. **Label more interactions** to enable quality-lift analysis\\n\")\n            f.write(\"5. **Monitor maturity over time** by running Empower V4 monthly\\n\\n\")\n        \n        print(f\"\\n✓ Report generated: {report_path}\")\n        return report_path\n    \n    def export_csvs(self, output_dir: Path):\n        \"\"\"Export all CSV datasets.\"\"\"\n        output_dir.mkdir(parents=True, exist_ok=True)\n        \n        # Normalized interactions\n        self.df.to_csv(output_dir / \"normalized_interactions.csv\", index=False)\n        print(f\"✓ Exported: normalized_interactions.csv\")\n        \n        # Maturity scorecard\n        scorecard = []\n        for account_id in self.accounts:\n            metrics = self.compute_maturity_score(account_id)\n            scorecard.append({\n                'account_id': account_id,\n                **metrics['components'],\n                'maturity_score': metrics['maturity_score'],\n                'level': metrics['level']\n            })\n        pd.DataFrame(scorecard).to_csv(output_dir / \"maturity_scorecard.csv\", index=False)\n        print(f\"✓ Exported: maturity_scorecard.csv\")\n        \n        # Account comparison\n        comparison = self.compare_accounts()\n        if not comparison.empty:\n            comparison.to_csv(output_dir / \"account_comparison.csv\", index=False)\n            print(f\"✓ Exported: account_comparison.csv\")\n        \n        # Risk clusters\n        risks = self.detect_risk_clusters()\n        if not risks.empty:\n            risks.to_csv(output_dir / \"risk_clusters.csv\", index=False)\n            print(f\"✓ Exported: risk_clusters.csv\")\n        \n        # Upgrade candidates\n        upgrades = self.generate_upgrade_candidates(top_n=20)\n        if not upgrades.empty:\n            upgrades.to_csv(output_dir / \"prompt_upgrade_candidates.csv\", index=False)\n            print(f\"✓ Exported: prompt_upgrade_candidates.csv\")\n    \n    def export_manifest(self, output_dir: Path, mode: str):\n        \"\"\"Export run manifest with metadata.\"\"\"\n        manifest = {\n            'run_timestamp': datetime.now().isoformat(),\n            'empower_version': 'v4.0.0',\n            'mode': mode,\n            'input_mode': self.mode,\n            'n_interactions': len(self.df),\n            'n_accounts': len(self.accounts),\n            'accounts': self.accounts,\n            'has_quality_labels': self.labels_df is not None,\n            'maturity_score': self.compute_maturity_score()['maturity_score']\n        }\n        \n        manifest_path = output_dir / \"run_manifest.json\"\n        with open(manifest_path, 'w') as f:\n            json.dump(manifest, f, indent=2)\n        \n        print(f\"✓ Exported: run_manifest.json\")\n    \n    def generate_charts(self, output_dir: Path):\n        \"\"\"Generate visualization charts.\"\"\"\n        if not CHARTS_AVAILABLE:\n            print(\"⚠ Matplotlib not available. Skipping charts.\")\n            return\n        \n        charts_dir = output_dir / \"charts\"\n        charts_dir.mkdir(parents=True, exist_ok=True)\n        \n        # Maturity by account\n        if len(self.accounts) > 1:\n            comparison = self.compare_accounts()\n            plt.figure(figsize=(10, 6))\n            plt.barh(comparison['account_id'], comparison['maturity_score'])\n            plt.xlabel('Maturity Score')\n            plt.title('Maturity Score by Account')\n            plt.xlim(0, 5)\n            plt.tight_layout()\n            plt.savefig(charts_dir / \"maturity_by_account.png\", dpi=150)\n            plt.close()\n            print(f\"✓ Generated: maturity_by_account.png\")\n        \n        # Prompt format distribution\n        format_counts = self.df['prompt_format'].value_counts()\n        plt.figure(figsize=(10, 6))\n        plt.bar(format_counts.index, format_counts.values)\n        plt.xlabel('Prompt Format')\n        plt.ylabel('Count')\n        plt.title('Prompt Format Distribution')\n        plt.xticks(rotation=45, ha='right')\n        plt.tight_layout()\n        plt.savefig(charts_dir / \"prompt_format_distribution.png\", dpi=150)\n        plt.close()\n        print(f\"✓ Generated: prompt_format_distribution.png\")\n        \n        # Context richness distribution\n        context_counts = self.df['context_richness'].value_counts()\n        plt.figure(figsize=(8, 6))\n        plt.pie(context_counts.values, labels=context_counts.index, autopct='%1.1f%%')\n        plt.title('Context Richness Distribution')\n        plt.tight_layout()\n        plt.savefig(charts_dir / \"context_richness_distribution.png\", dpi=150)\n        plt.close()\n        print(f\"✓ Generated: context_richness_distribution.png\")\n\n\ndef main():\n    parser = argparse.ArgumentParser(description='Empower V4 — AI Usage Evaluator')\n    parser.add_argument('--input', required=True, type=Path, help='Input CSV/JSONL file')\n    parser.add_argument('--labels', type=Path, help='Quality labels CSV (optional)')\n    parser.add_argument('--mode', default='full', \n                       choices=['quick', 'compare', 'full', 'labels', 'upgrade', 'all'],\n                       help='Execution mode')\n    parser.add_argument('--output', type=Path, default=Path('./empower_v4_package'),\n                       help='Output directory')\n    parser.add_argument('--charts', action='store_true', help='Generate charts')\n    parser.add_argument('--config', type=Path, help='Custom config JSON')\n    \n    args = parser.parse_args()\n    \n    # Load config\n    config = None\n    if args.config:\n        with open(args.config) as f:\n            config = json.load(f)\n    \n    # Initialize evaluator\n    evaluator = EmpowerV4Evaluator(config)\n    \n    # Load data\n    evaluator.load_data(args.input)\n    \n    # Load labels if provided\n    if args.labels:\n        evaluator.load_quality_labels(args.labels)\n    \n    # Execute based on mode\n    print(f\"\\n{'='*60}\")\n    print(f\"Running Empower V4 in '{args.mode}' mode\")\n    print(f\"{'='*60}\\n\")\n    \n    if args.mode in ['quick', 'full', 'all']:\n        report_path = evaluator.generate_report(args.output)\n    \n    if args.mode in ['full', 'all']:\n        evaluator.export_csvs(args.output)\n        evaluator.export_manifest(args.output, args.mode)\n    \n    if args.mode in ['compare', 'all']:\n        comparison = evaluator.compare_accounts()\n        if not comparison.empty:\n            print(\"\\nAccount Comparison:\")\n            print(comparison.to_string(index=False))\n    \n    if args.mode in ['upgrade', 'all']:\n        upgrades = evaluator.generate_upgrade_candidates(top_n=10)\n        if not upgrades.empty:\n            print(\"\\nTop Upgrade Candidates:\")\n            print(upgrades[['interaction_id', 'task_type', 'upgrade_score', 'risk_reason']].to_string(index=False))\n    \n    if (args.charts or args.mode == 'all') and CHARTS_AVAILABLE:\n        evaluator.generate_charts(args.output)\n    \n    print(f\"\\n{'='*60}\")\n    print(f\"✓ Empower V4 evaluation complete!\")\n    print(f\"✓ Results saved to: {args.output}\")\n    print(f\"{'='*60}\\n\")\n\n\nif __name__ == '__main__':\n    main()","stderr":""}
Perfeito! Encontrei a skill **Empower V4** nos arquivos — um `SKILL.md` completo e o script Python `empower_v4_evaluator.py`. Vou montar a estrutura da skill e empacotar agora.
{"returncode":0,"stdout":"total 32\ndrwxr-xr-x 3 root root  4096 May  7 01:06 .\ndrwxrwxrwt 8 root root  4096 May  7 01:06 ..\n-rw-r--r-- 1 root root 17960 May  7 01:06 SKILL.md\ndrwxr-xr-x 2 root root  4096 May  7 01:06 scripts\ntotal 48\ndrwxr-xr-x 2 root root  4096 May  7 01:06 .\ndrwxr-xr-x 3 root root  4096 May  7 01:06 ..\n-rw-r--r-- 1 root root 38068 May  7 01:06 empower_v4_evaluator.py\n","stderr":""}
{"returncode":0,"stdout":"LICENSE.txt\nSKILL.md\nagents\nassets\neval-viewer\nreferences\nscripts\n","stderr":""}
{"returncode":0,"stdout":"__init__.py\naggregate_benchmark.py\ngenerate_report.py\nimprove_description.py\npackage_skill.py\nquick_validate.py\nrun_eval.py\nrun_loop.py\nutils.py\n","stderr":""}
{"returncode":1,"stdout":"","stderr":"Traceback (most recent call last):\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 17, in <module>\n    from scripts.quick_validate import validate_skill\nModuleNotFoundError: No module named 'scripts'\n"}
{"returncode":1,"stdout":"📦 Packaging skill: /tmp/empower-v4-ai-usage-evaluator\n   Output directory: --output\n\n🔍 Validating skill...\n✅ Skill is valid!\n\n","stderr":"Traceback (most recent call last):\n  File \"<frozen runpy>\", line 198, in _run_module_as_main\n  File \"<frozen runpy>\", line 88, in _run_code\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 136, in <module>\n    main()\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 127, in main\n    result = package_skill(skill_path, output_dir)\n             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 83, in package_skill\n    output_path.mkdir(parents=True, exist_ok=True)\n  File \"/usr/lib/python3.12/pathlib.py\", line 1313, in mkdir\n    os.mkdir(self, mode)\nOSError: [Errno 30] Read-only file system: '/mnt/skills/examples/skill-creator/--output'\n"}
{"returncode":0,"stdout":"📦 Packaging skill: /tmp/empower-v4-ai-usage-evaluator\n   Output directory: /tmp/packaged\n\n🔍 Validating skill...\n✅ Skill is valid!\n\n  Added: empower-v4-ai-usage-evaluator/SKILL.md\n  Added: empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py\n\n✅ Successfully packaged skill to: /tmp/packaged/empower-v4-ai-usage-evaluator.skill\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
Skill empacotada com sucesso! ✅

O arquivo **`empower-v4-ai-usage-evaluator.skill`** contém:

- `SKILL.md` — instruções completas do framework Empower V4
- `scripts/empower_v4_evaluator.py` — o avaliador Python com todas as pipelines

Para instalar, basta fazer upload desse `.skill` nas configurações de Skills do Claude. Quer que eu rode algum teste rápido na skill antes, ou já está bom assim?

---

**Claude** _2026-05-07_

1	---
     2	name: file-reading
     3	description: "Use this skill when a file has been uploaded but its content is NOT in your context — only its path at /mnt/user-data/uploads/ is listed in an uploaded_files block. This skill is a router: it tells you which tool to use for each file type (pdf, docx, xlsx, csv, json, images, archives, ebooks) so you read the right amount the right way instead of blindly running cat on a binary. Triggers: any mention of /mnt/user-data/uploads/, an uploaded_files section, a file_path tag, or a user asking about an uploaded file you have not yet read. Do NOT use this skill if the file content is already visible in your context inside a documents block — you already have it."
     4	compatibility: "claude.ai, Claude Desktop, Cowork — any surface where uploads land at /mnt/user-data/uploads/"
     5	license: Proprietary. LICENSE.txt has complete terms
     6	---
     7	
     8	# Reading Uploaded Files
     9	
    10	## Why this skill exists
    11	
    12	When a user uploads a file in claude.ai, Claude Desktop, or Cowork,
    13	the file is written to `/mnt/user-data/uploads/<filename>` and you are told the path
    14	in an `<uploaded_files>` block. **The content is not in your context.**
    15	You must go read it.
    16	
    17	The naive thing — `cat /mnt/user-data/uploads/whatever` — is wrong for
    18	most files:
    19	
    20	- On a PDF it prints binary garbage.
    21	- On a 100MB CSV it floods your context with rows you will never use.
    22	- On a DOCX it prints the raw ZIP bytes.
    23	- On an image it does nothing useful at all.
    24	
    25	This skill tells you the right first move for each type, and when to
    26	hand off to a deeper skill.
    27	
    28	## General protocol
    29	
    30	1. **Look at the extension.** That is your dispatch key.
    31	2. **Stat before you read.** Large files need sampling, not slurping.
    32	   ```bash
    33	   stat -c '%s bytes, %y' /mnt/user-data/uploads/report.pdf
    34	   file /mnt/user-data/uploads/report.pdf
    35	   ```
    36	3. **Read just enough to answer the user's question.** If they asked
    37	   "how many rows are in this CSV", don't load the whole thing into
    38	   pandas — `wc -l` gives a fast approximation (it counts newlines,
    39	   not CSV records, so it may over-count if quoted fields contain
    40	   embedded newlines).
    41	4. **If a dedicated skill exists, go read it.** The table below tells
    42	   you when. The dedicated skills cover editing, creating, and advanced
    43	   operations that this skill does not.
    44	
    45	## `extract-text`
    46	
    47	For docx, odt, epub, xlsx, pptx, rtf, and ipynb the first move is
    48	`extract-text <file>`. It emits markdown for docx/odt/epub (headings,
    49	bold, lists, links, tables), tab-separated rows under `## Sheet:`
    50	headers for xlsx, text under `## Slide N` headers for pptx, fenced
    51	code cells for ipynb, and plain text for rtf. Pass `--format <fmt>`
    52	when the extension is wrong or absent (e.g., `--format xlsx` on an
    53	`.xlsm`). If it errors on a file, `pandoc <file> -t plain` is a
    54	fallback; for xlsx/pptx, fall back to the dedicated skill's
    55	Python-based approach (openpyxl / python-pptx).
    56	
    57	## Dispatch table
    58	
    59	| Extension                         | First move                                           | Dedicated skill                           |
    60	| --------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
    61	| `.pdf`                            | Content inventory (see PDF section)                  | `/mnt/skills/public/pdf-reading/SKILL.md` |
    62	| `.docx`                           | `extract-text`                                       | `/mnt/skills/public/docx/SKILL.md`        |
    63	| `.doc` (legacy)                   | Convert to `.docx` first                             | `/mnt/skills/public/docx/SKILL.md`        |
    64	| `.xlsx`                           | `extract-text`                                       | `/mnt/skills/public/xlsx/SKILL.md`        |
    65	| `.xlsm`                           | `extract-text --format xlsx`                         | `/mnt/skills/public/xlsx/SKILL.md`        |
    66	| `.xls` (legacy)                   | `pd.read_excel(engine="xlrd")` — openpyxl rejects it | `/mnt/skills/public/xlsx/SKILL.md`        |
    67	| `.ods`                            | `pd.read_excel(engine="odf")` — openpyxl rejects it  | `/mnt/skills/public/xlsx/SKILL.md`        |
    68	| `.pptx`                           | `extract-text`                                       | `/mnt/skills/public/pptx/SKILL.md`        |
    69	| `.ppt` (legacy)                   | Convert to `.pptx` first                             | `/mnt/skills/public/pptx/SKILL.md`        |
    70	| `.csv`, `.tsv`                    | `pandas` with `nrows`                                | — (below)                                 |
    71	| `.json`, `.jsonl`                 | `jq` for structure                                   | — (below)                                 |
    72	| `.jpg`, `.png`, `.gif`, `.webp`   | Already in your context as vision input              | — (below)                                 |
    73	| `.zip`, `.tar`, `.tar.gz`         | List contents, do **not** auto-extract               | — (below)                                 |
    74	| `.gz` (single file)               | `zcat \| head` — no manifest to list                 | — (below)                                 |
    75	| `.epub`, `.odt`                   | `extract-text`                                       | — (below)                                 |
    76	| `.rtf`                            | `extract-text`                                       | — (below)                                 |
    77	| `.ipynb`                          | `extract-text`                                       | — (below)                                 |
    78	| `.txt`, `.md`, `.log`, code files | `wc -c` then `head` or full `cat`                    | — (below)                                 |
    79	| Unknown                           | `file` then decide                                   | —                                         |
    80	
    81	---
    82	
    83	## PDF
    84	
    85	**Never** `cat` a PDF — it prints binary garbage.
    86	
    87	Quick first move — get the page count and check if text is extractable:
    88	
    89	```bash
    90	pdfinfo /mnt/user-data/uploads/report.pdf
    91	pdftotext -f 1 -l 1 /mnt/user-data/uploads/report.pdf - | head -20
    92	```
    93	
    94	Then peek at the text content:
    95	
    96	```python
    97	from pypdf import PdfReader
    98	r = PdfReader("/mnt/user-data/uploads/report.pdf")
    99	print(f"{len(r.pages)} pages")
   100	print(r.pages[0].extract_text()[:2000])
   101	```
   102	
   103	For anything beyond a quick peek — figures, tables, attachments,
   104	forms, scanned PDFs, visual inspection, or choosing a reading strategy
   105	— go read `/mnt/skills/public/pdf-reading/SKILL.md`. It covers
   106	content inventory, text extraction vs. page rasterization, embedded
   107	content extraction, and document-type-aware reading strategies.
   108	
   109	For PDF form filling, creation, merging, splitting, or watermarking,
   110	go read `/mnt/skills/public/pdf/SKILL.md`.
   111	
   112	---
   113	
   114	## DOCX / DOC
   115	
   116	The `docx` skill covers editing, creating, tracked changes, images.
   117	Read it if you need any of those. For a quick look:
   118	
   119	```bash
   120	extract-text /mnt/user-data/uploads/memo.docx | head -200
   121	```
   122	
   123	Legacy `.doc` (not `.docx`) must be converted first — see the `docx`
   124	skill.
   125	
   126	---
   127	
   128	## XLSX / XLS / spreadsheets
   129	
   130	The `xlsx` skill covers formulas, formatting, charts, creating. Read
   131	it if you need any of those. For a quick look at an `.xlsx`:
   132	
   133	```bash
   134	extract-text /mnt/user-data/uploads/data.xlsx | head -100
   135	```
   136	
   137	For `.xlsm`, add `--format xlsx` (same zip structure; only the
   138	extension differs). When you need a structured preview in Python:
   139	
   140	```python
   141	from openpyxl import load_workbook
   142	wb = load_workbook("/mnt/user-data/uploads/data.xlsx", read_only=True)
   143	print("Sheets:", wb.sheetnames)
   144	ws = wb.active
   145	for row in ws.iter_rows(max_row=5, values_only=True):
   146	    print(row)
   147	```
   148	
   149	`read_only=True` matters — without it, openpyxl loads the entire
   150	workbook into memory, which breaks on large files. Do not trust
   151	`ws.max_row` in read-only mode: many non-Excel writers omit the
   152	dimension record, so it comes back `None` or wrong. If you need a row
   153	count, iterate or use pandas.
   154	
   155	**Legacy `.xls`** — openpyxl raises `InvalidFileException`. Use:
   156	
   157	```python
   158	import pandas as pd
   159	df = pd.read_excel("/mnt/user-data/uploads/old.xls", engine="xlrd", nrows=5)
   160	```
   161	
   162	**`.ods` (OpenDocument)** — openpyxl also rejects this. Use:
   163	
   164	```python
   165	import pandas as pd
   166	df = pd.read_excel("/mnt/user-data/uploads/data.ods", engine="odf", nrows=5)
   167	```
   168	
   169	---
   170	
   171	## PPTX
   172	
   173	```bash
   174	extract-text /mnt/user-data/uploads/deck.pptx | head -200
   175	```
   176	
   177	**Legacy `.ppt`** — convert to `.pptx` first via LibreOffice; see
   178	`/mnt/skills/public/pptx/SKILL.md` for the sandbox-safe
   179	`scripts/office/soffice.py` wrapper (bare `soffice` hangs here because
   180	the seccomp filter blocks the `AF_UNIX` sockets LibreOffice uses for
   181	instance management).
   182	
   183	For anything beyond reading, go to `/mnt/skills/public/pptx/SKILL.md`.
   184	
   185	---
   186	
   187	## CSV / TSV
   188	
   189	**Do not** `cat` or `head` these blindly. A CSV with a 50KB quoted cell
   190	in row 1 will wreck your `head -5`. Use pandas with `nrows`:
   191	
   192	```python
   193	import pandas as pd
   194	df = pd.read_csv("/mnt/user-data/uploads/data.csv", nrows=5)
   195	print(df)
   196	print()
   197	print(df.dtypes)
   198	```
   199	
   200	Approximate row count without loading (over-counts if the file has
   201	RFC-4180 quoted newlines — the same quoted-cell case this section
   202	warned about above):
   203	
   204	```bash
   205	wc -l /mnt/user-data/uploads/data.csv
   206	```
   207	
   208	Full analysis only after you know the shape:
   209	
   210	```python
   211	df = pd.read_csv("/mnt/user-data/uploads/data.csv")
   212	print(df.describe())
   213	```
   214	
   215	TSV: same, with `sep="\t"`.
   216	
   217	---
   218	
   219	## JSON / JSONL
   220	
   221	Structure first, content second:
   222	
   223	```bash
   224	jq 'type' /mnt/user-data/uploads/data.json
   225	jq 'if type == "array" then length elif type == "object" then keys else . end' /mnt/user-data/uploads/data.json
   226	```
   227	
   228	(`keys` errors on scalar JSON roots — a bare `"hello"` or `42` is valid
   229	JSON per RFC 7159 — so guard the branch.)
   230	
   231	Then drill into what the user actually asked about.
   232	
   233	JSONL (one object per line) — do **not** `jq` the whole file; work line
   234	by line:
   235	
   236	```bash
   237	head -3 /mnt/user-data/uploads/data.jsonl | jq .
   238	wc -l /mnt/user-data/uploads/data.jsonl
   239	```
   240	
   241	---
   242	
   243	## Images (JPG / PNG / GIF / WEBP)
   244	
   245	**You can already see uploaded images.** They are injected into your
   246	context as vision inputs alongside the `<uploaded_files>` pointer. You
   247	do not need to read them from disk to describe them.
   248	
   249	The disk copy is only needed if you are going to **process** the image
   250	programmatically:
   251	
   252	```python
   253	from PIL import Image
   254	img = Image.open("/mnt/user-data/uploads/photo.jpg")
   255	print(img.size, img.mode, img.format)
   256	```
   257	
   258	For OCR on an image (text extraction, not description):
   259	
   260	```python
   261	import pytesseract
   262	print(pytesseract.image_to_string(img))
   263	```
   264	
   265	Note: the client resizes images larger than 2000×2000 down to that
   266	bound and re-encodes as JPEG before upload, so the disk copy may not
   267	be the user's original bytes. For most processing this doesn't matter;
   268	if the user is asking about original-resolution pixel data, flag it.
   269	
   270	---
   271	
   272	## Archives (ZIP / TAR / TAR.GZ)
   273	
   274	**List first. Extract never — unless the user explicitly asks.**
   275	Archives can be huge, contain path traversal, or nest forever.
   276	
   277	```bash
   278	unzip -l /mnt/user-data/uploads/bundle.zip
   279	tar -tf /mnt/user-data/uploads/bundle.tar
   280	```
   281	
   282	GNU tar auto-detects compression — `tar -tf` works on `.tar`,
   283	`.tar.gz`, `.tar.bz2`, `.tar.xz` alike. Don't hard-code `-z`.
   284	
   285	If the user wants one file from inside, extract just that one:
   286	
   287	```bash
   288	unzip -p /mnt/user-data/uploads/bundle.zip path/inside/file.txt
   289	```
   290	
   291	**Standalone `.gz`** (not a tar) compresses a single file — there is
   292	no manifest to list. Just peek at the decompressed content:
   293	
   294	```bash
   295	zcat /mnt/user-data/uploads/data.json.gz | head -50
   296	```
   297	
   298	---
   299	
   300	## EPUB / ODT
   301	
   302	```bash
   303	extract-text /mnt/user-data/uploads/book.epub | head -200
   304	```
   305	
   306	For long ebooks, pipe through `head` — you rarely need the whole thing
   307	to answer a question.
   308	
   309	---
   310	
   311	## RTF / IPYNB
   312	
   313	```bash
   314	extract-text /mnt/user-data/uploads/notes.rtf | head -200
   315	extract-text /mnt/user-data/uploads/notebook.ipynb | head -200
   316	```
   317	
   318	---
   319	
   320	## Plain text / code / logs
   321	
   322	Check the size first:
   323	
   324	```bash
   325	wc -c /mnt/user-data/uploads/app.log
   326	```
   327	
   328	- **Under ~20KB**: `cat` is fine.
   329	- **Over ~20KB**: `head -100` and `tail -100` to orient. If the user
   330	  asked about something specific, `grep` for it. Load the whole thing
   331	  only if you genuinely need all of it.
   332	
   333	For log files, the user almost always cares about the end:
   334	
   335	```bash
   336	tail -200 /mnt/user-data/uploads/app.log
   337	```
   338	
   339	---
   340	
   341	## Unknown extension
   342	
   343	```bash
   344	file /mnt/user-data/uploads/mystery.bin
   345	xxd /mnt/user-data/uploads/mystery.bin | head -5
   346	```
   347	
   348	`file` identifies most things. `xxd` head shows magic bytes. If `file`
   349	says "data" and the hex doesn't match anything you recognize, ask the
   350	user what it is instead of guessing.
   351	
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/Arquivo.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n    38068  2026-05-07 01:03   texto 2.txt\n      176  2026-05-07 01:03   __MACOSX/._texto 2.txt\n    17960  2026-05-07 01:03   texto.txt\n      176  2026-05-07 01:03   __MACOSX/._texto.txt\n  1662435  2026-05-07 01:03   arquivo web.webarchive\n      176  2026-05-07 01:03   __MACOSX/._arquivo web.webarchive\n---------                     -------\n  1718991                     6 files\n","stderr":""}
{"returncode":0,"stdout":"---\nname: empower-v4-ai-usage-evaluator\ndescription: Evaluate and compare AI/Claude usage patterns across accounts using normalized interaction data, maturity scoring, risk clustering, and quality-lift analysis. Use this skill when the user wants to evaluate, compare, normalize, or improve AI/Claude usage patterns across conversations, accounts, exports, or prompt histories using the Empower V2/V3/V4 framework. Activate for requests like \"run Empower\", \"analyze my Claude conversations\", \"compare accounts\", \"calculate maturity score\", \"evaluate AI usage quality\", \"detect prompt patterns\", \"generate usage report\", \"analyze Claude exports\", or when the user uploads Claude conversation exports, CSV interactions, pattern registries, quality label queues, normalized metrics, RDF-lite facts, or ZIPs with conversations. Do NOT activate for single simple prompts without score/analysis/framework requests, general Claude questions, or generic prompt engineering without historical data.\n---\n\n# Empower V4 — AI Usage Evaluator\n\nEmpower V4 is a unified framework for evaluating, comparing, and improving AI/Claude usage patterns across accounts. It normalizes conversation exports, computes structural maturity scores, detects risky prompt patterns, compares accounts, and generates quality-lift reports when human labels are available.\n\n## What Empower V4 Does\n\n**Core capabilities:**\n\n1. **Auto-detect and normalize** Claude exports, CSVs, JSONLs, and ZIP packages\n2. **Compute maturity scores** using structural metrics (prompt format, context richness, task diversity)\n3. **Compare accounts** to identify high-maturity vs high-risk usage patterns\n4. **Detect risk clusters** (short prompts + low context + high expansion ratio)\n5. **Generate upgrade candidates** — top prompts that would benefit from restructuring\n6. **Calculate quality lift** when human labels are available (success rate, rework rate, hallucination rate)\n7. **Export actionable reports** with Markdown summaries, CSV datasets, and optional charts\n\n**Not just \"improve one prompt\"** — Empower V4 operates at scale (50–500+ interactions) to detect systemic patterns and compare organizational usage.\n\n## When to Use This Skill\n\n**Trigger this skill when the user asks for:**\n\n- \"Run Empower V4\"\n- \"Analyze my Claude conversations\"\n- \"Compare accounts\" or \"compare usage patterns\"\n- \"Calculate maturity score\"\n- \"Evaluate quality of my AI usage\"\n- \"Detect risky prompt patterns\"\n- \"Generate usage report\"\n- \"Analyze Claude exports\"\n- \"Improve my evaluation system\"\n- \"Run V2/V3/V4 framework\"\n\n**Also trigger when the user uploads:**\n\n- Claude conversation exports (ZIP, JSON)\n- CSVs with interaction data\n- `ai_interaction_canonical_valid_only.csv`\n- `pattern_registry.csv`\n- `normalized_account_metrics.csv`\n- `quality_label_queue.csv`\n- `quality_labels_completed.csv`\n- RDF-lite fact tables\n- Multiple account exports in ZIP\n\n**Do NOT trigger for:**\n\n- Single prompt improvement requests without analysis/scoring\n- General Claude questions\n- Prompt engineering advice without historical data\n\n## Workflow Overview\n\n```\n1. INPUT DETECTION\n   ├─ Auto-detect format (CSV, JSONL, ZIP, raw export)\n   └─ Select pipeline: canonical / raw_claude / quick_proxy\n\n2. NORMALIZATION\n   ├─ Extract interactions (user_prompt, assistant_response)\n   ├─ Classify task_type, prompt_format, context_richness\n   └─ Generate canonical schema\n\n3. STRUCTURAL ANALYSIS\n   ├─ Compute maturity score per account\n   ├─ Detect prompt format distribution\n   ├─ Calculate expansion ratios\n   └─ Identify risk clusters\n\n4. ACCOUNT COMPARISON\n   ├─ Compare maturity scores\n   ├─ Identify strongest/weakest patterns\n   └─ Flag imbalanced datasets\n\n5. UPGRADE CANDIDATES\n   ├─ Rank prompts by risk + impact\n   ├─ Generate suggested improvements\n   └─ Export top 10–20 candidates\n\n6. QUALITY LABELS (if available)\n   ├─ Join labels to interactions\n   ├─ Compute success_1st_turn, rework_rate, hallucination_rate\n   ├─ Calculate lift/delta vs baseline\n   └─ Generate quality metrics report\n\n7. OUTPUT GENERATION\n   ├─ Markdown report (empower_v4_report.md)\n   ├─ CSV datasets (account_comparison, maturity_scorecard, risk_clusters)\n   ├─ JSON manifest (run_manifest.json)\n   └─ Optional charts (if matplotlib available)\n```\n\n## Input Formats\n\n### Primary Format (Canonical)\n---\n#!/usr/bin/env python3\n\"\"\"\nEmpower V4 — AI Usage Evaluator\n\nNormalizes Claude/AI conversation exports, computes maturity scores,\ndetects risky prompt patterns, compares accounts, and generates\nquality-lift reports when human labels are available.\n\nUsage:\n    python empower_v4_evaluator.py --input data.csv --mode full --output ./out\n\"\"\"\n\nimport argparse\nimport hashlib\nimport json\nimport sys\nfrom datetime import datetime\nfrom pathlib import Path\nfrom typing import Any, Dict, List, Optional, Tuple\n\nimport pandas as pd\n\n# Optional dependencies\ntry:\n    import matplotlib.pyplot as plt\n    import matplotlib\n    matplotlib.use('Agg')  # Non-interactive backend\n    CHARTS_AVAILABLE = True\nexcept ImportError:\n    CHARTS_AVAILABLE = False\n    print(\"Warning: matplotlib not available. Charts will not be generated.\")\n\n\nclass EmpowerV4Evaluator:\n    \"\"\"Main evaluator for Empower V4 framework.\"\"\"\n    \n    def __init__(self, config: Optional[Dict[str, Any]] = None):\n        self.config = config or self._default_config()\n        self.mode = \"canonical\"\n        self.df = None\n        self.labels_df = None\n        self.accounts = []\n        self.results = {}\n        \n    def _default_config(self) -> Dict[str, Any]:\n        \"\"\"Default configuration.\"\"\"\n        return {\n            \"maturity_weights\": {\n                \"prompt_structure\": 0.30,\n                \"context_richness\": 0.25,\n                \"output_control\": 0.20,\n                \"task_diversity\": 0.10,\n                \"high_value_task_share\": 0.10,\n                \"evidence_attachment\": 0.05\n            },\n            \"confidence_thresholds\": {\n                \"very_low\": 20,\n                \"low\": 50,\n                \"medium\": 100\n            },\n            \"label_thresholds\": {\n                \"exploratory\": 20,\n                \"low\": 50,\n                \"usable\": 100\n            },\n            \"task_categories\": {\n                \"high_value\": [\"analysis\", \"research\", \"code\", \"writing\", \"strategy\"],\n                \"medium_value\": [\"prompt_engineering\", \"planning\"],\n                \"low_value\": [\"general\", \"chat\", \"other\"]\n            },\n            \"prompt_formats\": [\"short_direct\", \"standard\", \"structured\", \"long_context\", \"multi_instruct\"],\n            \"context_levels\": [\"low\", \"medium\", \"high\"]\n        }\n    \n    def auto_detect_format(self, filepath: Path) -> str:\n        \"\"\"Auto-detect input format and select pipeline.\"\"\"\n        try:\n            # Try reading as CSV first\n            df = pd.read_csv(filepath, nrows=5)\n            cols = set(df.columns.str.lower())\n            \n            # Check for canonical format\n            required_canonical = {'interaction_id', 'user_prompt', 'assistant_response'}\n            if required_canonical.issubset(cols):\n                print(f\"✓ Detected canonical format\")\n                return \"canonical\"\n            \n            # Check for raw Claude export indicators\n            claude_indicators = {'content', 'role', 'model', 'created_at'}\n            if any(ind in cols for ind in claude_indicators):\n                print(f\"⚠ Detected raw Claude export format\")\n                return \"raw_claude\"\n            \n            # Fallback to quick proxy\n            print(f\"⚠ Using quick_proxy mode (some columns missing)\")\n            return \"quick_proxy\"\n            \n        except Exception as e:\n            print(f\"Error detecting format: {e}\")\n            return \"quick_proxy\"\n","stderr":""}
{"returncode":0,"stdout":"#!/usr/bin/env python3\n\"\"\"\nEmpower V4 — AI Usage Evaluator\n\nNormalizes Claude/AI conversation exports, computes maturity scores,\ndetects risky prompt patterns, compares accounts, and generates\nquality-lift reports when human labels are available.\n\nUsage:\n    python empower_v4_evaluator.py --input data.csv --mode full --output ./out\n\"\"\"\n\nimport argparse\nimport hashlib\nimport json\nimport sys\nfrom datetime import datetime\nfrom pathlib import Path\nfrom typing import Any, Dict, List, Optional, Tuple\n\nimport pandas as pd\n\n# Optional dependencies\ntry:\n    import matplotlib.pyplot as plt\n    import matplotlib\n    matplotlib.use('Agg')  # Non-interactive backend\n    CHARTS_AVAILABLE = True\nexcept ImportError:\n    CHARTS_AVAILABLE = False\n    print(\"Warning: matplotlib not available. Charts will not be generated.\")\n\n\nclass EmpowerV4Evaluator:\n    \"\"\"Main evaluator for Empower V4 framework.\"\"\"\n    \n    def __init__(self, config: Optional[Dict[str, Any]] = None):\n        self.config = config or self._default_config()\n        self.mode = \"canonical\"\n        self.df = None\n        self.labels_df = None\n        self.accounts = []\n        self.results = {}\n        \n    def _default_config(self) -> Dict[str, Any]:\n        \"\"\"Default configuration.\"\"\"\n        return {\n            \"maturity_weights\": {\n                \"prompt_structure\": 0.30,\n                \"context_richness\": 0.25,\n                \"output_control\": 0.20,\n                \"task_diversity\": 0.10,\n                \"high_value_task_share\": 0.10,\n                \"evidence_attachment\": 0.05\n            },\n            \"confidence_thresholds\": {\n                \"very_low\": 20,\n                \"low\": 50,\n                \"medium\": 100\n            },\n            \"label_thresholds\": {\n                \"exploratory\": 20,\n                \"low\": 50,\n                \"usable\": 100\n            },\n            \"task_categories\": {\n                \"high_value\": [\"analysis\", \"research\", \"code\", \"writing\", \"strategy\"],\n                \"medium_value\": [\"prompt_engineering\", \"planning\"],\n                \"low_value\": [\"general\", \"chat\", \"other\"]\n            },\n            \"prompt_formats\": [\"short_direct\", \"standard\", \"structured\", \"long_context\", \"multi_instruct\"],\n            \"context_levels\": [\"low\", \"medium\", \"high\"]\n        }\n    \n    def auto_detect_format(self, filepath: Path) -> str:\n        \"\"\"Auto-detect input format and select pipeline.\"\"\"\n        try:\n            # Try reading as CSV first\n            df = pd.read_csv(filepath, nrows=5)\n            cols = set(df.columns.str.lower())\n            \n            # Check for canonical format\n            required_canonical = {'interaction_id', 'user_prompt', 'assistant_response'}\n            if required_canonical.issubset(cols):\n                print(f\"✓ Detected canonical format\")\n                return \"canonical\"\n            \n            # Check for raw Claude export indicators\n            claude_indicators = {'content', 'role', 'model', 'created_at'}\n            if any(ind in cols for ind in claude_indicators):\n                print(f\"⚠ Detected raw Claude export format\")\n                return \"raw_claude\"\n            \n            # Fallback to quick proxy\n            print(f\"⚠ Using quick_proxy mode (some columns missing)\")\n            return \"quick_proxy\"\n            \n        except Exception as e:\n            print(f\"Error detecting format: {e}\")\n            return \"quick_proxy\"\n    \n    def load_data(self, filepath: Path) -> pd.DataFrame:\n        \"\"\"Load and normalize input data.\"\"\"\n        print(f\"\\nLoading data from: {filepath}\")\n        \n        # Auto-detect format\n        self.mode = self.auto_detect_format(filepath)\n        \n        # Load based on extension\n        if filepath.suffix == '.csv':\n            df = pd.read_csv(filepath)\n        elif filepath.suffix == '.jsonl':\n            df = pd.read_json(filepath, lines=True)\n        elif filepath.suffix == '.json':\n            df = pd.read_json(filepath)\n        else:\n            raise ValueError(f\"Unsupported file format: {filepath.suffix}\")\n        \n        print(f\"Loaded {len(df)} rows\")\n        \n        # Normalize based on detected mode\n        if self.mode == \"canonical\":\n            df = self._normalize_canonical(df)\n        elif self.mode == \"raw_claude\":\n            df = self._normalize_raw_claude(df)\n        else:\n            df = self._normalize_quick_proxy(df)\n        \n        self.df = df\n        self.accounts = sorted(df['account_id'].unique().tolist())\n        print(f\"Found {len(self.accounts)} account(s): {', '.join(self.accounts)}\")\n        \n        return df\n    \n    def _normalize_canonical(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize canonical format data.\"\"\"\n        # Ensure required columns exist\n        required = ['interaction_id', 'user_prompt', 'assistant_response']\n        missing = [col for col in required if col not in df.columns]\n        if missing:\n            raise ValueError(f\"Missing required columns: {missing}\")\n        \n        # Ensure account_id exists\n        if 'account_id' not in df.columns:\n            df['account_id'] = self._infer_account_id(df)\n        \n        # Add missing optional columns with defaults\n        if 'conversation_id' not in df.columns:\n            df['conversation_id'] = df['interaction_id'].apply(lambda x: x.split('_')[0] if '_' in x else 'conv_unknown')\n        \n        if 'timestamp' not in df.columns:\n            df['timestamp'] = datetime.now().isoformat()\n        \n        if 'turn_sequence' not in df.columns:\n            df['turn_sequence'] = df.groupby('conversation_id').cumcount() + 1\n        \n        # Compute derived columns if missing\n        if 'prompt_length' not in df.columns:\n            df['prompt_length'] = df['user_prompt'].fillna('').str.len()\n        \n        if 'response_length' not in df.columns:\n            df['response_length'] = df['assistant_response'].fillna('').str.len()\n        \n        if 'task_type' not in df.columns:\n            df['task_type'] = df.apply(self._infer_task_type, axis=1)\n        \n        if 'prompt_format' not in df.columns:\n            df['prompt_format'] = df.apply(self._infer_prompt_format, axis=1)\n        \n        if 'context_richness' not in df.columns:\n            df['context_richness'] = df.apply(self._infer_context_richness, axis=1)\n        \n        # Compute expansion ratio\n        df['expansion_ratio'] = df['response_length'] / (df['prompt_length'] + 1)\n        \n        return df\n    \n    def _normalize_raw_claude(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize raw Claude export format.\"\"\"\n        print(\"⚠ Raw Claude export normalization not fully implemented yet.\")\n        print(\"⚠ Treating as quick_proxy mode.\")\n        return self._normalize_quick_proxy(df)\n    \n    def _normalize_quick_proxy(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize incomplete data with proxy inference.\"\"\"\n        print(\"\\n⚠ PROXY MODE ACTIVE\")\n        print(\"⚠ These are proxy metrics, not validated quality metrics.\")\n        \n        # Try to find prompt/response columns with fuzzy matching\n        prompt_col = None\n        response_col = None\n        \n        for col in df.columns:\n            col_lower = col.lower()\n            if 'prompt' in col_lower or 'user' in col_lower or 'input' in col_lower:\n                prompt_col = col\n            if 'response' in col_lower or 'assistant' in col_lower or 'output' in col_lower:\n                response_col = col\n        \n        if not prompt_col or not response_col:\n","stderr":""}
{"returncode":0,"stdout":"658\n894\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"1:---\n4:---\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"### Step 5: Generate Outputs\n\nCreate:\n- `empower_v4_report.md` — main findings\n- CSV datasets — structured data\n- `run_manifest.json` — metadata\n- Charts (if requested and matplotlib available)\n\n### Step 6: Present Results\n\nUse the `present_files` tool to share:\n- Report (Markdown)\n- Key CSVs\n- Charts (if generated)\n\nExplain the findings in conversation:\n- What the maturity score means\n- Which accounts are strongest/weakest\n- What the top risks are\n- What to do next\n\n## Python Dependencies\n\n### Core (Required)\n\n```\npython >= 3.10\npandas\n```\n\n### Optional\n\n```\nmatplotlib    # Static charts\nopenpyxl      # XLSX export\nduckdb        # Large-scale local analysis\npyarrow       # Parquet support\n```\n\n**Graceful degradation:**\n\n```python\ntry:\n    import matplotlib.pyplot as plt\n    charts_enabled = True\nexcept ImportError:\n    charts_enabled = False\n    print(\"Matplotlib not available. Generating CSV/MD outputs only.\")\n```\n\n","stderr":""}
{"returncode":1,"stdout":"","stderr":""}
{"returncode":0,"stdout":"### Privacy & Anonymization\n\nAccount IDs are hashed by default. User prompts and responses are NOT logged to any external service.\n\nAll processing is local.\n\n## Summary\n\nEmpower V4 is a complete evaluation framework for AI usage patterns. It:\n\n- Accepts messy, real-world data\n- Normalizes to a canonical format\n- Computes structural maturity scores\n- Compares accounts\n- Detects risks\n- Recommends improvements\n- Calculates quality lift when labels exist\n- Generates actionable reports\n\n","stderr":""}
{"returncode":0,"stdout":"            comparison = self.compare_accounts()\n            plt.figure(figsize=(10, 6))\n            plt.barh(comparison['account_id'], comparison['maturity_score'])\n            plt.xlabel('Maturity Score')\n            plt.title('Maturity Score by Account')\n            plt.xlim(0, 5)\n            plt.tight_layout()\n            plt.savefig(charts_dir / \"maturity_by_account.png\", dpi=150)\n            plt.close()\n            print(f\"✓ Generated: maturity_by_account.png\")\n        \n        # Prompt format distribution\n        format_counts = self.df['prompt_format'].value_counts()\n        plt.figure(figsize=(10, 6))\n        plt.bar(format_counts.index, format_counts.values)\n        plt.xlabel('Prompt Format')\n        plt.ylabel('Count')\n        plt.title('Prompt Format Distribution')\n        plt.xticks(rotation=45, ha='right')\n        plt.tight_layout()\n        plt.savefig(charts_dir / \"prompt_format_distribution.png\", dpi=150)\n        plt.close()\n        print(f\"✓ Generated: prompt_format_distribution.png\")\n        \n        # Context richness distribution\n        context_counts = self.df['context_richness'].value_counts()\n        plt.figure(figsize=(8, 6))\n        plt.pie(context_counts.values, labels=context_counts.index, autopct='%1.1f%%')\n        plt.title('Context Richness Distribution')\n        plt.tight_layout()\n        plt.savefig(charts_dir / \"context_richness_distribution.png\", dpi=150)\n        plt.close()\n        print(f\"✓ Generated: context_richness_distribution.png\")\n\n\ndef main():\n    parser = argparse.ArgumentParser(description='Empower V4 — AI Usage Evaluator')\n    parser.add_argument('--input', required=True, type=Path, help='Input CSV/JSONL file')\n    parser.add_argument('--labels', type=Path, help='Quality labels CSV (optional)')\n    parser.add_argument('--mode', default='full', \n                       choices=['quick', 'compare', 'full', 'labels', 'upgrade', 'all'],\n                       help='Execution mode')\n    parser.add_argument('--output', type=Path, default=Path('./empower_v4_package'),\n                       help='Output directory')\n    parser.add_argument('--charts', action='store_true', help='Generate charts')\n    parser.add_argument('--config', type=Path, help='Custom config JSON')\n    \n    args = parser.parse_args()\n    \n    # Load config\n    config = None\n    if args.config:\n        with open(args.config) as f:\n            config = json.load(f)\n    \n    # Initialize evaluator\n    evaluator = EmpowerV4Evaluator(config)\n    \n    # Load data\n    evaluator.load_data(args.input)\n    \n    # Load labels if provided\n    if args.labels:\n        evaluator.load_quality_labels(args.labels)\n    \n    # Execute based on mode\n    print(f\"\\n{'='*60}\")\n    print(f\"Running Empower V4 in '{args.mode}' mode\")\n    print(f\"{'='*60}\\n\")\n    \n    if args.mode in ['quick', 'full', 'all']:\n        report_path = evaluator.generate_report(args.output)\n    \n    if args.mode in ['full', 'all']:\n        evaluator.export_csvs(args.output)\n        evaluator.export_manifest(args.output, args.mode)\n    \n    if args.mode in ['compare', 'all']:\n        comparison = evaluator.compare_accounts()\n        if not comparison.empty:\n            print(\"\\nAccount Comparison:\")\n            print(comparison.to_string(index=False))\n    \n    if args.mode in ['upgrade', 'all']:\n        upgrades = evaluator.generate_upgrade_candidates(top_n=10)\n        if not upgrades.empty:\n            print(\"\\nTop Upgrade Candidates:\")\n            print(upgrades[['interaction_id', 'task_type', 'upgrade_score', 'risk_reason']].to_string(index=False))\n    \n    if (args.charts or args.mode == 'all') and CHARTS_AVAILABLE:\n        evaluator.generate_charts(args.output)\n    \n    print(f\"\\n{'='*60}\")\n    print(f\"✓ Empower V4 evaluation complete!\")\n    print(f\"✓ Results saved to: {args.output}\")\n    print(f\"{'='*60}\\n\")\n\n\nif __name__ == '__main__':\n    main()","stderr":""}
Entendi a estrutura! O zip contém:
- `texto.txt` → **SKILL.md** (definição completa da skill Empower V4)
- `texto 2.txt` → **empower_v4_evaluator.py** (script Python da skill)

Vou montar a estrutura de pastas correta e empacotar! 📦
{"returncode":0,"stdout":"__init__.py\naggregate_benchmark.py\ngenerate_report.py\nimprove_description.py\npackage_skill.py\nquick_validate.py\nrun_eval.py\nrun_loop.py\nutils.py\n/mnt/skills/examples/skill-creator/scripts/package_skill.py\n","stderr":""}
{"returncode":0,"stdout":"Structure created:\n/home/claude/empower-v4-ai-usage-evaluator/SKILL.md\n/home/claude/empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py\n658 /home/claude/empower-v4-ai-usage-evaluator/SKILL.md\n894 /home/claude/empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py\n","stderr":""}
{"returncode":1,"stdout":"","stderr":"Traceback (most recent call last):\n  File \"/mnt/skills/examples/skill-creator/scripts/package_skill.py\", line 17, in <module>\n    from scripts.quick_validate import validate_skill\nModuleNotFoundError: No module named 'scripts'\n"}
{"returncode":1,"stdout":"","stderr":"Traceback (most recent call last):\n  File \"/home/claude/skill-creator-scripts/package_skill.py\", line 17, in <module>\n    from scripts.quick_validate import validate_skill\nModuleNotFoundError: No module named 'scripts'\n"}
{"returncode":0,"stdout":"📦 Packaging skill: /home/claude/empower-v4-ai-usage-evaluator\n\n🔍 Validating skill...\n✅ Skill is valid!\n\n  Added: empower-v4-ai-usage-evaluator/SKILL.md\n  Added: empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py\n\n✅ Successfully packaged skill to: /home/claude/skill-creator/empower-v4-ai-usage-evaluator.skill\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
Skill empacotada com sucesso! ✅

O arquivo **`empower-v4-ai-usage-evaluator.skill`** está pronto para download e instalação. Ele contém:

- **SKILL.md** — definição completa do Empower V4 (658 linhas), com frontmatter, workflow, formatos de input, métricas de maturidade e tudo mais
- **scripts/empower_v4_evaluator.py** — o script Python completo (894 linhas) com o `EmpowerV4Evaluator`, detecção automática de formato, scoring, comparação de contas, geração de relatórios e charts

Para instalar, é só fazer o upload do `.skill` na seção de Skills do Claude.ai. Quer que eu faça alguma revisão ou melhoria na skill antes?

---

**Você** _2026-05-07_

/analytics-research-orchestrator  self lnlgdge does this skill is aderhert to antropoc guide lines ?

---

**Claude** _2026-05-07_

1	---
     2	name: analytics-research-orchestrator
     3	description: Use for complex analytical, business, data, research, BigQuery, BI, SQL, MCP, connector-based, market, product, strategy, or decision-support requests. Normalizes ambiguous requests, asks decision-critical questions, activates available data/research connectors, runs evidence-backed analysis, and presents decisions, insights, assumptions, risks, and next actions.
     4	---
     5	
     6	# Analytics Research Orchestrator
     7	
     8	## Activation Criteria
     9	
    10	Use this skill when the user asks for data analysis, business analysis, SQL, BigQuery, dashboard planning, metric definition, market research, competitive analysis, product analytics, strategy analysis, funnel/cohort/retention/churn/CAC/LTV/revenue/pricing/growth/operations diagnostics, connector-based analysis, or any decision-support task requiring evidence from live data, internal files, web research, warehouses, APIs, BI tools, or MCP-connected systems.
    11	
    12	Do not use this skill for simple factual questions, casual writing, translation, or tasks that do not require analysis.
    13	
    14	## Operating Contract
    15	
    16	For every activated task:
    17	
    18	1. Normalize the user’s intent before execution.
    19	2. Ask enough questions to remove decision-critical ambiguity.
    20	3. Do not ask questions that can be answered by available tools, files, connectors, databases, or web research.
    21	4. Identify the data/research path before extracting or analyzing.
    22	5. Use web research when the answer depends on current, external, or unstable facts.
    23	6. Use BigQuery, SQL, spreadsheets, files, APIs, or MCP tools when structured or internal data is required.
    24	7. Separate facts, assumptions, inferences, recommendations, risks, decisions, and unknowns.
    25	8. Produce decision-ready output, not only descriptive commentary.
    26	9. State what would change the conclusion.
    27	10. Provide next actions with owners, timelines, validation criteria, and decision gates when possible.
    28	
    29	## Mandatory Claim Labels
    30	
    31	Label substantive claims using:
    32	
    33	- `[FACT]` Verified from data, source, documentation, direct observation, or tool output.
    34	- `[ASSUMPTION]` Operational assumption made because the user has not provided enough information.
    35	- `[INFERENCE]` Reasoned conclusion derived from facts and assumptions.
    36	- `[RECOMMENDATION]` Proposed action.
    37	- `[UNKNOWN]` Missing information that could materially change the conclusion.
    38	- `[RISK]` Failure mode, uncertainty, data quality issue, security concern, or operational risk.
    39	- `[DECISION]` Final or provisional decision.
    40	- `[NEXT ACTION]` Executable next step.
    41	
    42	Never present assumptions as facts.
    43	
    44	## First Response Protocol
    45	
    46	For complex or ambiguous tasks, start by normalizing the request.
    47	
    48	Use this opening:
    49	
    50	```text
    51	I’ll normalize the request first, identify the data/research path, then produce a decision-ready output.
    52	
    53	To proceed, I need:
    54	```
    55	
    56	Ask only decision-critical questions. Group them by business objective, decision, data availability, time period, metric definitions, dimensions, constraints, output format, audience, and risk tolerance.
    57	
    58	If the user asks you to proceed without clarification, continue with explicit assumptions and label them.
    59	
    60	## Intent Normalization Schema
    61	
    62	Parse the task into:
    63	
    64	```text
    65	G = Goal
    66	K = Known facts
    67	V = Variables
    68	C = Constraints
    69	A = Assumptions
    70	D = Dependencies
    71	Q = Unknowns / open questions
    72	E = Evaluation criteria
    73	```
    74	
    75	Load `references/02-intent-normalization.md` when the task is ambiguous or multi-stakeholder.
    76	
    77	## Routing
    78	
    79	Classify the work using Cynefin:
    80	
    81	- Clear: known problem, known method, known data. Use checklists, SQL, dashboards, or direct analysis.
    82	- Complicated: expert analysis required; cause-effect is knowable. Use diagnostics, decomposition, benchmarks, and statistical analysis.
    83	- Complex: uncertain system with interacting causes. Use hypotheses, triangulation, scenarios, experiments, and decision gates.
    84	- Chaotic: unstable or urgent issue. Triage first, contain risk, then analyze.
    85	
    86	Load `references/01-operating-model.md` for the full routing and execution model.
    87	
    88	## Source and Connector Selection
    89	
    90	Before research or data work, identify the data path:
    91	
    92	| Need | Preferred source |
    93	|---|---|
    94	| Current market, product, regulatory, pricing, or benchmark information | Web research |
    95	| Internal docs, PDFs, specs, meetings, transcripts | File/document connector |
    96	| Structured analytics data | BigQuery, warehouse, database, spreadsheet |
    97	| BI semantic layer | Looker, Power BI, Tableau, Looker Studio |
    98	| APIs or app systems | MCP connector or API tool |
    99	| Codebase, dbt, SQL models, pipelines | Repo connector or filesystem |
   100	| User-provided CSV/XLSX | Local file analysis |
   101	| Decisions, memos, strategy | Combined sources |
   102	
   103	Load:
   104	
   105	- `references/03-research-method.md` for web/external research.
   106	- `references/04-data-method.md` for structured data analysis.
   107	- `references/05-bigquery-protocol.md` for BigQuery.
   108	- `references/06-mcp-connectors.md` for MCP and connector workflows.
   109	- `references/09-security-safety.md` for sensitive data and write-operation safety.
   110	
   111	## BigQuery Default Rules
   112	
   113	When BigQuery is available:
   114	
   115	1. Identify project, dataset, and tables.
   116	2. Inspect schema before analysis queries.
   117	3. Use GoogleSQL.
   118	4. Prefer dry runs, previews, row limits, and partition filters before large scans.
   119	5. Estimate bytes scanned or cost when possible.
   120	6. Never run destructive DDL/DML without explicit user approval.
   121	7. Use fully qualified table names.
   122	8. Validate grain before joins.
   123	9. Reconcile output against known totals.
   124	10. State freshness, caveats, and table limitations.
   125	
   126	For SQL templates, load files in `sql/`.
   127	
   128	## Analysis Method
   129	
   130	For structured data analysis:
   131	
   132	1. Define the analytical question.
   133	2. Define metrics precisely.
   134	3. Validate data quality.
   135	4. Explore broad cuts.
   136	5. Diagnose using decomposition.
   137	6. Interpret magnitude, concentration, and uncertainty.
   138	7. Recommend action with validation metric and decision gate.
   139	
   140	Load `references/04-data-method.md` and `templates/metric_contract.md` when metrics are undefined.
   141	
   142	## Research Method
   143	
   144	Use external research when facts may be current, unstable, specialized, or decision-critical.
   145	
   146	Research sequence:
   147	
   148	1. Define research question.
   149	2. Identify authoritative sources.
   150	3. Search broadly.
   151	4. Prioritize primary sources.
   152	5. Cross-check conflicting claims.
   153	6. Extract facts.
   154	7. Separate facts from interpretation.
   155	8. Cite sources.
   156	9. State confidence.
   157	10. Convert findings into decisions.
   158	
   159	Load `templates/research_brief.md` and `references/03-research-method.md`.
   160	
   161	## Output Format
   162	
   163	Unless the user requests another format, produce:
   164	
   165	1. Normalized Brief
   166	2. Method Selected
   167	3. Findings Table
   168	4. Analysis
   169	5. Decision
   170	6. Recommendations
   171	7. Next Actions
   172	8. Unknowns as epsilon values
   173	9. What would change the conclusion
   174	
   175	Load `references/07-decision-output.md` for exact formats.
   176	
   177	## Dashboard Requests
   178	
   179	When the user asks for dashboard design, BI requirements, or reporting specs, load `references/08-dashboard-spec.md` and `templates/dashboard_brief.md`.
   180	
   181	## Framework Library
   182	
   183	Apply 3-5 frameworks relevant to the task. Load `references/10-framework-library.md` when the task involves market, product, growth, strategy, operations, data quality, or technical stack analysis.
   184	
   185	## Quality Gate
   186	
   187	Before final output, verify:
   188	
   189	```text
   190	[ ] G/K/V/C/A/D/Q/E normalized.
   191	[ ] Minimum required context obtained or assumed explicitly.
   192	[ ] Required sources identified.
   193	[ ] Web research/connectors used when needed.
   194	[ ] Facts separated from assumptions and inferences.
   195	[ ] Metrics defined precisely.
   196	[ ] Data quality validated where applicable.
   197	[ ] Uncertainty explained.
   198	[ ] Decision or recommendation provided where appropriate.
   199	[ ] Next actions include timeline or validation criteria.
   200	```
   201	
   202	If any item fails, state the limitation explicitly.
   203	
   204	## Standard Closing
   205	
   206	End substantial work with:
   207	
   208	```text
   209	Decision:
   210	Confidence:
   211	Main risk:
   212	Next action:
   213	What would change this conclusion:
   214	```
   215	
Ótimo uso do orquestrador para uma análise crítica! Vou normalizar a solicitação e executar a avaliação estruturada.

---

## Normalização do Request

```
G = Verificar se a skill Empower V4 adere às diretrizes da Anthropic
K = Conteúdo completo da skill (SKILL.md + script Python) lido nesta sessão
V = Quais diretrizes se aplicam: privacidade, uso de dados, segurança, comportamento do modelo
C = Avaliação baseada em conhecimento próprio (self-knowledge), sem acesso ao documento oficial atualizado
A = [ASSUMPTION] Diretrizes Anthropic relevantes = uso responsável de IA, privacidade de dados, transparência, não contornar salvaguardas
D = Conteúdo da skill já carregado no contexto
Q = Versão exata das diretrizes Anthropic em vigor hoje
E = Critério: a skill faz algo que viola ou coloca em risco usuários, dados ou o ecossistema Claude?
```

**Método:** Complicated — análise expert com decomposição por domínio de risco.

---

## Análise por Domínio

### 1. 🔒 Privacidade e Dados do Usuário

| Aspecto | O que a skill faz | Avaliação |
|---|---|---|
| Processamento de exports de conversas | Lê `user_prompt` + `assistant_response` em escala | ⚠️ Risco moderado |
| Anonimização | Hash de `account_id` por padrão | ✅ Positivo |
| Processamento local | "All processing is local" declarado | ✅ Positivo |
| PII no conteúdo das conversas | **Não há aviso ou sanitização de PII** nos prompts/respostas | ❌ Gap crítico |
| Consentimento explícito | Não solicita confirmação antes de processar dados em bulk | ⚠️ Gap |

[RISK] A skill processa conteúdo bruto de conversas (user_prompt / assistant_response) sem nenhum mecanismo de detecção ou aviso sobre PII — nomes, e-mails, dados financeiros, dados de saúde podem estar nesse texto e seriam lidos, classificados e exportados em CSVs sem alerta ao usuário.

---

### 2. 🎯 Clareza e Transparência

[FACT] A skill tem uma descrição de triggering bem estruturada, com casos de uso claros e anti-triggers explícitos ("Do NOT activate for..."). Isso é alinhado com as boas práticas Anthropic para skills.

[FACT] O workflow em 6 etapas está documentado, o output é previsível e os modos (`quick`, `full`, `compare`, etc.) são declarados.

✅ **Aderência boa** neste domínio.

---

### 3. 🛡️ Segurança Operacional do Script Python

[FACT] O script usa apenas leitura de arquivos locais (`pd.read_csv`, `pd.read_json`) — sem chamadas de rede, sem upload externo.

[FACT] Dependências opcionais (matplotlib, duckdb, pyarrow) têm graceful degradation — o script não quebra se não estiverem instaladas.

[INFERENCE] O script não executa código arbitrário baseado em input do usuário — não há `eval()`, `exec()` ou injeção de comandos shell.

✅ **Aderência boa** neste domínio.

---

### 4. 📋 Conformidade com Diretrizes de Skills Anthropic

[FACT] A estrutura SKILL.md + scripts/ está correta (YAML frontmatter com `name` e `description`).

[FACT] A description é "pushy" no bom sentido — lista triggers explícitos sem ser enganosa sobre o que a skill faz.

[RISK] O SKILL.md tem **658 linhas**, o que está acima do limite recomendado de ~500 linhas. Isso pode causar degradação de qualidade quando a skill é carregada no contexto.

[ASSUMPTION] Anthropic não tem restrição explícita contra skills que analisam exports de conversas, desde que o processamento seja local e transparente.

---

### 5. ⚖️ Uso Ético e Potencial de Abuso

[INFERENCE] A skill poderia ser usada para análise em massa de conversas de terceiros sem consentimento — mas isso seria responsabilidade do operador, não da skill em si.

[RISK] A skill não adverte sobre conformidade com LGPD/GDPR ao processar conversas de outras pessoas. Para uso corporativo (que é o caso — "analyze usage across accounts"), isso é um gap regulatório relevante.

---

## Sumário de Findings

| Domínio | Status | Severidade |
|---|---|---|
| Privacidade de dados (PII em conversas) | ❌ Gap | Alta |
| Anonimização de account_id | ✅ OK | — |
| Processamento local / sem exfiltração | ✅ OK | — |
| Transparência e triggering | ✅ OK | — |
| Segurança do script Python | ✅ OK | — |
| Tamanho do SKILL.md (>500 linhas) | ⚠️ Atenção | Baixa |
| Aviso LGPD/GDPR para uso corporativo | ❌ Gap | Média |
| Consentimento antes de bulk processing | ⚠️ Gap | Média |

---

## Recomendações

[RECOMMENDATION] **Adicionar aviso de PII** no SKILL.md e no script: antes de processar qualquer arquivo, o script deveria imprimir um aviso de que o conteúdo de conversas pode conter dados pessoais e recomendar sanitização prévia.

[RECOMMENDATION] **Adicionar seção "Privacy & Compliance"** no SKILL.md alertando sobre LGPD/GDPR para cenários de uso corporativo com dados de terceiros.

[RECOMMENDATION] **Refatorar SKILL.md** para ficar abaixo de 500 linhas, movendo a documentação de formatos de input para um arquivo `references/input-formats.md`.

[RECOMMENDATION] **Adicionar step de confirmação** antes de processar arquivos em modo bulk (`--mode all`), pedindo confirmação do usuário sobre a origem e consentimento dos dados.

---

```
Decision:     A skill é tecnicamente sólida e estruturalmente alinhada com as diretrizes Anthropic — MAS tem gaps de privacidade que precisam ser corrigidos antes de uso em produção corporativa.
Confidence:   Alta (85%) — baseado em análise completa do código e SKILL.md.
Main risk:    Processamento de PII em conversas sem aviso ou sanitização.
Next action:  Corrigir os 2 gaps críticos (aviso de PII + seção de compliance) e refatorar o SKILL.md para <500 linhas.
What would change this conclusion: Acesso ao documento oficial atualizado de diretrizes Anthropic para skills poderia revelar requisitos adicionais não cobertos aqui.
```

---

Quer que eu já aplique as correções recomendadas na skill e gere um novo `.skill` empacotado?

---

**Você** _2026-05-07_

o cauli de qualodase esta corerto ?

---

**Claude** _2026-05-07_

{"returncode":0,"stdout":"#!/usr/bin/env python3\n\"\"\"\nEmpower V4 — AI Usage Evaluator\n\nNormalizes Claude/AI conversation exports, computes maturity scores,\ndetects risky prompt patterns, compares accounts, and generates\nquality-lift reports when human labels are available.\n\nUsage:\n    python empower_v4_evaluator.py --input data.csv --mode full --output ./out\n\"\"\"\n\nimport argparse\nimport hashlib\nimport json\nimport sys\nfrom datetime import datetime\nfrom pathlib import Path\nfrom typing import Any, Dict, List, Optional, Tuple\n\nimport pandas as pd\n\n# Optional dependencies\ntry:\n    import matplotlib.pyplot as plt\n    import matplotlib\n    matplotlib.use('Agg')  # Non-interactive backend\n    CHARTS_AVAILABLE = True\nexcept ImportError:\n    CHARTS_AVAILABLE = False\n    print(\"Warning: matplotlib not available. Charts will not be generated.\")\n\n\nclass EmpowerV4Evaluator:\n    \"\"\"Main evaluator for Empower V4 framework.\"\"\"\n    \n    def __init__(self, config: Optional[Dict[str, Any]] = None):\n        self.config = config or self._default_config()\n        self.mode = \"canonical\"\n        self.df = None\n        self.labels_df = None\n        self.accounts = []\n        self.results = {}\n        \n    def _default_config(self) -> Dict[str, Any]:\n        \"\"\"Default configuration.\"\"\"\n        return {\n            \"maturity_weights\": {\n                \"prompt_structure\": 0.30,\n                \"context_richness\": 0.25,\n                \"output_control\": 0.20,\n                \"task_diversity\": 0.10,\n                \"high_value_task_share\": 0.10,\n                \"evidence_attachment\": 0.05\n            },\n            \"confidence_thresholds\": {\n                \"very_low\": 20,\n                \"low\": 50,\n                \"medium\": 100\n            },\n            \"label_thresholds\": {\n                \"exploratory\": 20,\n                \"low\": 50,\n                \"usable\": 100\n            },\n            \"task_categories\": {\n                \"high_value\": [\"analysis\", \"research\", \"code\", \"writing\", \"strategy\"],\n                \"medium_value\": [\"prompt_engineering\", \"planning\"],\n                \"low_value\": [\"general\", \"chat\", \"other\"]\n            },\n            \"prompt_formats\": [\"short_direct\", \"standard\", \"structured\", \"long_context\", \"multi_instruct\"],\n            \"context_levels\": [\"low\", \"medium\", \"high\"]\n        }\n    \n    def auto_detect_format(self, filepath: Path) -> str:\n        \"\"\"Auto-detect input format and select pipeline.\"\"\"\n        try:\n            # Try reading as CSV first\n            df = pd.read_csv(filepath, nrows=5)\n            cols = set(df.columns.str.lower())\n            \n            # Check for canonical format\n            required_canonical = {'interaction_id', 'user_prompt', 'assistant_response'}\n            if required_canonical.issubset(cols):\n                print(f\"✓ Detected canonical format\")\n                return \"canonical\"\n            \n            # Check for raw Claude export indicators\n            claude_indicators = {'content', 'role', 'model', 'created_at'}\n            if any(ind in cols for ind in claude_indicators):\n                print(f\"⚠ Detected raw Claude export format\")\n                return \"raw_claude\"\n            \n            # Fallback to quick proxy\n            print(f\"⚠ Using quick_proxy mode (some columns missing)\")\n            return \"quick_proxy\"\n            \n        except Exception as e:\n            print(f\"Error detecting format: {e}\")\n            return \"quick_proxy\"\n    \n    def load_data(self, filepath: Path) -> pd.DataFrame:\n        \"\"\"Load and normalize input data.\"\"\"\n        print(f\"\\nLoading data from: {filepath}\")\n        \n        # Auto-detect format\n        self.mode = self.auto_detect_format(filepath)\n        \n        # Load based on extension\n        if filepath.suffix == '.csv':\n            df = pd.read_csv(filepath)\n        elif filepath.suffix == '.jsonl':\n            df = pd.read_json(filepath, lines=True)\n        elif filepath.suffix == '.json':\n            df = pd.read_json(filepath)\n        else:\n            raise ValueError(f\"Unsupported file format: {filepath.suffix}\")\n        \n        print(f\"Loaded {len(df)} rows\")\n        \n        # Normalize based on detected mode\n        if self.mode == \"canonical\":\n            df = self._normalize_canonical(df)\n        elif self.mode == \"raw_claude\":\n            df = self._normalize_raw_claude(df)\n        else:\n            df = self._normalize_quick_proxy(df)\n        \n        self.df = df\n        self.accounts = sorted(df['account_id'].unique().tolist())\n        print(f\"Found {len(self.accounts)} account(s): {', '.join(self.accounts)}\")\n        \n        return df\n    \n    def _normalize_canonical(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize canonical format data.\"\"\"\n        # Ensure required columns exist\n        required = ['interaction_id', 'user_prompt', 'assistant_response']\n        missing = [col for col in required if col not in df.columns]\n        if missing:\n            raise ValueError(f\"Missing required columns: {missing}\")\n        \n        # Ensure account_id exists\n        if 'account_id' not in df.columns:\n            df['account_id'] = self._infer_account_id(df)\n        \n        # Add missing optional columns with defaults\n        if 'conversation_id' not in df.columns:\n            df['conversation_id'] = df['interaction_id'].apply(lambda x: x.split('_')[0] if '_' in x else 'conv_unknown')\n        \n        if 'timestamp' not in df.columns:\n            df['timestamp'] = datetime.now().isoformat()\n        \n        if 'turn_sequence' not in df.columns:\n            df['turn_sequence'] = df.groupby('conversation_id').cumcount() + 1\n        \n        # Compute derived columns if missing\n        if 'prompt_length' not in df.columns:\n            df['prompt_length'] = df['user_prompt'].fillna('').str.len()\n        \n        if 'response_length' not in df.columns:\n            df['response_length'] = df['assistant_response'].fillna('').str.len()\n        \n        if 'task_type' not in df.columns:\n            df['task_type'] = df.apply(self._infer_task_type, axis=1)\n        \n        if 'prompt_format' not in df.columns:\n            df['prompt_format'] = df.apply(self._infer_prompt_format, axis=1)\n        \n        if 'context_richness' not in df.columns:\n            df['context_richness'] = df.apply(self._infer_context_richness, axis=1)\n        \n        # Compute expansion ratio\n        df['expansion_ratio'] = df['response_length'] / (df['prompt_length'] + 1)\n        \n        return df\n    \n    def _normalize_raw_claude(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize raw Claude export format.\"\"\"\n        print(\"⚠ Raw Claude export normalization not fully implemented yet.\")\n        print(\"⚠ Treating as quick_proxy mode.\")\n        return self._normalize_quick_proxy(df)\n    \n    def _normalize_quick_proxy(self, df: pd.DataFrame) -> pd.DataFrame:\n        \"\"\"Normalize incomplete data with proxy inference.\"\"\"\n        print(\"\\n⚠ PROXY MODE ACTIVE\")\n        print(\"⚠ These are proxy metrics, not validated quality metrics.\")\n        \n        # Try to find prompt/response columns with fuzzy matching\n        prompt_col = None\n        response_col = None\n        \n        for col in df.columns:\n            col_lower = col.lower()\n            if 'prompt' in col_lower or 'user' in col_lower or 'input' in col_lower:\n                prompt_col = col\n            if 'response' in col_lower or 'assistant' in col_lower or 'output' in col_lower:\n                response_col = col\n        \n        if not prompt_col or not response_col:\n            raise ValueError(\"Could not identify prompt and response columns. Please provide canonical format.\")\n        \n        # Create canonical columns\n        df_norm = df.copy()\n        df_norm['user_prompt'] = df[prompt_col]\n        df_norm['assistant_response'] = df[response_col]\n        \n        # Generate interaction IDs\n        if 'interaction_id' not in df_norm.columns:\n            df_norm['interaction_id'] = [f\"int_{i:06d}\" for i in range(len(df_norm))]\n        \n        # Infer account\n        df_norm['account_id'] = self._infer_account_id(df_norm)\n        \n        # Add defaults\n        df_norm['conversation_id'] = df_norm['interaction_id'].apply(lambda x: x.split('_')[0])\n        df_norm['timestamp'] = datetime.now().isoformat()\n        df_norm['turn_sequence'] = 1\n        \n        # Compute metrics\n        df_norm['prompt_length'] = df_norm['user_prompt'].fillna('').str.len()\n        df_norm['response_length'] = df_norm['assistant_response'].fillna('').str.len()\n        df_norm['expansion_ratio'] = df_norm['response_length'] / (df_norm['prompt_length'] + 1)\n        \n        df_norm['task_type'] = df_norm.apply(self._infer_task_type, axis=1)\n        df_norm['prompt_format'] = df_norm.apply(self._infer_prompt_format, axis=1)\n        df_norm['context_richness'] = df_norm.apply(self._infer_context_richness, axis=1)\n        \n        return df_norm\n    \n    def _infer_account_id(self, df: pd.DataFrame) -> str:\n        \"\"\"Infer account ID from data or generate stable hash.\"\"\"\n        # Try to find account column\n        for col in df.columns:\n            if 'account' in col.lower():\n                return df[col].iloc[0] if not df[col].isna().all() else self._generate_account_hash(df)\n        \n        # Generate stable hash\n        return self._generate_account_hash(df)\n    \n    def _generate_account_hash(self, df: pd.DataFrame) -> str:\n        \"\"\"Generate stable 12-char hash for account ID.\"\"\"\n        # Use first few rows as fingerprint\n        fingerprint = str(df.head(3).to_dict())\n        hash_val = hashlib.md5(fingerprint.encode()).hexdigest()[:12]\n        return f\"acct_{hash_val}\"\n    \n    def _infer_task_type(self, row: pd.Series) -> str:\n        \"\"\"Infer task type from prompt content.\"\"\"\n        prompt = str(row.get('user_prompt', '')).lower()\n        \n        # Keywords for different task types\n        if any(kw in prompt for kw in ['analyze', 'analysis', 'evaluate', 'assess', 'compare']):\n            return 'analysis'\n        elif any(kw in prompt for kw in ['code', 'python', 'javascript', 'function', 'class', 'debug']):\n            return 'code'\n        elif any(kw in prompt for kw in ['research', 'find', 'search', 'investigate', 'study']):\n            return 'research'\n        elif any(kw in prompt for kw in ['write', 'draft', 'compose', 'create', 'blog', 'article']):\n            return 'writing'\n        elif any(kw in prompt for kw in ['prompt', 'improve', 'rewrite', 'optimize']):\n            return 'prompt_engineering'\n        elif any(kw in prompt for kw in ['strategy', 'plan', 'roadmap', 'framework']):\n            return 'strategy'\n        else:\n            return 'general'\n    \n    def _infer_prompt_format(self, row: pd.Series) -> str:\n        \"\"\"Infer prompt format from structure.\"\"\"\n        prompt = str(row.get('user_prompt', ''))\n        length = len(prompt)\n        \n        # Check for structured indicators\n        structured_indicators = ['\\n##', '\\n#', '---', '```', 'CONTEXT:', 'TASK:', 'OUTPUT:']\n        has_structure = any(ind in prompt for ind in structured_indicators)\n        \n        # Check for multi-step instructions\n        has_steps = any(ind in prompt for ind in ['\\n1.', '\\n2.', '\\n-', '\\n*'])\n        \n        if length < 100:\n            return 'short_direct'\n        elif length < 300:\n            return 'standard'\n        elif has_structure or has_steps:\n            if has_steps:\n                return 'multi_instruct'\n            else:\n                return 'structured'\n        elif length >= 500:\n            return 'long_context'\n        else:\n            return 'standard'\n    \n    def _infer_context_richness(self, row: pd.Series) -> str:\n        \"\"\"Infer context richness from prompt content.\"\"\"\n        prompt = str(row.get('user_prompt', ''))\n        \n        # Context indicators\n        context_markers = [\n            'context:', 'background:', 'given', 'assuming', 'based on',\n            'file:', 'data:', 'document:', 'previous', 'earlier'\n        ]\n        \n        context_count = sum(1 for marker in context_markers if marker in prompt.lower())\n        \n        # Check for attachments/evidence\n        has_evidence = '[' in prompt and ']' in prompt  # Links or references\n        \n        if context_count >= 3 or has_evidence:\n            return 'high'\n        elif context_count >= 1:\n            return 'medium'\n        else:\n            return 'low'\n    \n    def load_quality_labels(self, filepath: Path) -> pd.DataFrame:\n        \"\"\"Load quality labels and join to interactions.\"\"\"\n        print(f\"\\nLoading quality labels from: {filepath}\")\n        \n        labels_df = pd.read_csv(filepath)\n        print(f\"Loaded {len(labels_df)} labels\")\n        \n        # Validate required columns\n        required = ['interaction_id']\n        missing = [col for col in required if col not in labels_df.columns]\n        if missing:\n            raise ValueError(f\"Labels file missing required columns: {missing}\")\n        \n        # Join to main dataframe\n        if self.df is None:\n            raise ValueError(\"Must load interaction data before labels\")\n        \n        self.labels_df = labels_df\n        \n        # Merge\n        df_merged = self.df.merge(labels_df, on='interaction_id', how='left')\n        labeled_count = df_merged['usefulness_score'].notna().sum()\n        \n        print(f\"Joined {labeled_count}/{len(self.df)} interactions with labels ({labeled_count/len(self.df)*100:.1f}% coverage)\")\n        \n        if labeled_count < self.config['label_thresholds']['exploratory']:\n            print(f\"⚠ Warning: Only {labeled_count} labels (< {self.config['label_thresholds']['exploratory']}). Quality metrics are exploratory only.\")\n        \n        self.df = df_merged\n        return df_merged\n    \n    def compute_maturity_score(self, account_id: Optional[str] = None) -> Dict[str, float]:\n        \"\"\"Compute maturity score for account or overall.\"\"\"\n        df = self.df if account_id is None else self.df[self.df['account_id'] == account_id]\n        \n        if len(df) < self.config['confidence_thresholds']['very_low']:\n            confidence = \"very_low_confidence\"\n        elif len(df) < self.config['confidence_thresholds']['low']:\n            confidence = \"low_confidence\"\n        elif len(df) < self.config['confidence_thresholds']['medium']:\n            confidence = \"medium_confidence\"\n        else:\n            confidence = \"high_confidence\"\n        \n        # Component scores\n        prompt_structure = self._score_prompt_structure(df)\n        context_richness = self._score_context_richness(df)\n        output_control = self._score_output_control(df)\n        task_diversity = self._score_task_diversity(df)\n        high_value_share = self._score_high_value_share(df)\n        evidence_attachment = self._score_evidence_attachment(df)\n        \n        # Weighted maturity score\n        weights = self.config['maturity_weights']\n        maturity = 1 + 4 * (\n            weights['prompt_structure'] * prompt_structure +\n            weights['context_richness'] * context_richness +\n            weights['output_control'] * output_control +\n            weights['task_diversity'] * task_diversity +\n            weights['high_value_task_share'] * high_value_share +\n            weights['evidence_attachment'] * evidence_attachment\n        )\n        \n        # Determine level\n        if maturity < 2.0:\n            level = \"L1 Ad-hoc\"\n        elif maturity < 3.0:\n            level = \"L2 Functional\"\n        elif maturity < 4.0:\n            level = \"L3 Structured\"\n        elif maturity < 4.6:\n            level = \"L4 Optimized\"\n        else:\n            level = \"L5 Systematic\"\n        \n        return {\n            'maturity_score': round(maturity, 2),\n            'level': level,\n            'confidence': confidence,\n            'n_interactions': len(df),\n            'components': {\n                'prompt_structure': round(prompt_structure, 3),\n                'context_richness': round(context_richness, 3),\n                'output_control': round(output_control, 3),\n                'task_diversity': round(task_diversity, 3),\n                'high_value_task_share': round(high_value_share, 3),\n                'evidence_attachment': round(evidence_attachment, 3)\n            }\n        }\n    \n    def _score_prompt_structure(self, df: pd.DataFrame) -> float:\n        \"\"\"Score prompt structure quality.\"\"\"\n        # Higher score for structured/multi_instruct formats\n        format_scores = {\n            'short_direct': 0.0,\n            'standard': 0.3,\n            'structured': 0.7,\n            'long_context': 0.5,\n            'multi_instruct': 1.0\n        }\n        \n        dist = df['prompt_format'].value_counts(normalize=True)\n        score = sum(dist.get(fmt, 0) * format_scores.get(fmt, 0) for fmt in format_scores)\n        return score\n    \n    def _score_context_richness(self, df: pd.DataFrame) -> float:\n        \"\"\"Score context richness.\"\"\"\n        richness_scores = {'low': 0.0, 'medium': 0.5, 'high': 1.0}\n        dist = df['context_richness'].value_counts(normalize=True)\n        score = sum(dist.get(lvl, 0) * richness_scores[lvl] for lvl in richness_scores)\n        return score\n    \n    def _score_output_control(self, df: pd.DataFrame) -> float:\n        \"\"\"Score output control (presence of format specifications).\"\"\"\n        # Proxy: check for output-related keywords in prompts\n        control_keywords = ['format:', 'output:', 'return:', 'structure:', 'json', 'csv', 'markdown']\n        has_control = df['user_prompt'].fillna('').str.lower().apply(\n            lambda x: any(kw in x for kw in control_keywords)\n        )\n        return has_control.mean()\n    \n    def _score_task_diversity(self, df: pd.DataFrame) -> float:\n        \"\"\"Score task diversity.\"\"\"\n        task_counts = df['task_type'].value_counts()\n        diversity = len(task_counts) / 7  # Normalize by max possible types\n        return min(diversity, 1.0)\n    \n    def _score_high_value_share(self, df: pd.DataFrame) -> float:\n        \"\"\"Score share of high-value tasks.\"\"\"\n        high_value = self.config['task_categories']['high_value']\n        high_value_count = df['task_type'].isin(high_value).sum()\n        return high_value_count / len(df) if len(df) > 0 else 0.0\n    \n    def _score_evidence_attachment(self, df: pd.DataFrame) -> float:\n        \"\"\"Score evidence/attachment usage.\"\"\"\n        # Proxy: check for file references, links, data mentions\n        evidence_markers = ['file:', 'attached', 'document:', '[http', 'data:', 'csv', 'excel']\n        has_evidence = df['user_prompt'].fillna('').str.lower().apply(\n            lambda x: any(marker in x for marker in evidence_markers)\n        )\n        return has_evidence.mean()\n    \n    def detect_risk_clusters(self) -> pd.DataFrame:\n        \"\"\"Detect high-risk prompt patterns.\"\"\"\n        risks = []\n        \n        for idx, row in self.df.iterrows():\n            risk_score = 0\n            risk_reasons = []\n            \n            # Risk: short_direct + low_context\n            if row['prompt_format'] == 'short_direct' and row['context_richness'] == 'low':\n                risk_score += 2\n                risk_reasons.append(\"short_direct+low_context\")\n            \n            # Risk: high expansion ratio\n            if row['expansion_ratio'] > 20:\n                risk_score += 1\n                risk_reasons.append(f\"high_expansion({row['expansion_ratio']:.1f})\")\n            \n            # Risk: very short prompt for high-value task\n            high_value = self.config['task_categories']['high_value']\n            if row['task_type'] in high_value and row['prompt_length'] < 50:\n                risk_score += 1\n                risk_reasons.append(f\"short_prompt_for_{row['task_type']}\")\n            \n            if risk_score > 0:\n                risks.append({\n                    'interaction_id': row['interaction_id'],\n                    'account_id': row['account_id'],\n                    'risk_score': risk_score,\n                    'risk_reasons': ', '.join(risk_reasons),\n                    'prompt_format': row['prompt_format'],\n                    'context_richness': row['context_richness'],\n                    'task_type': row['task_type'],\n                    'prompt_length': row['prompt_length'],\n                    'expansion_ratio': round(row['expansion_ratio'], 2)\n                })\n        \n        return pd.DataFrame(risks).sort_values('risk_score', ascending=False) if risks else pd.DataFrame()\n    \n    def generate_upgrade_candidates(self, top_n: int = 10) -> pd.DataFrame:\n        \"\"\"Generate top N prompt upgrade candidates.\"\"\"\n        candidates = []\n        \n        high_value = self.config['task_categories']['high_value']\n        \n        for idx, row in self.df.iterrows():\n            upgrade_score = 0\n            reasons = []\n            \n            # Criteria for upgrade\n            if row['prompt_format'] == 'short_direct':\n                upgrade_score += 2\n                reasons.append(\"short_direct_format\")\n            \n            if row['context_richness'] == 'low':\n                upgrade_score += 1\n                reasons.append(\"low_context\")\n            \n            if row['expansion_ratio'] > 15:\n                upgrade_score += 1\n                reasons.append(f\"high_expansion({row['expansion_ratio']:.1f})\")\n            \n            if row['task_type'] in high_value:\n                upgrade_score += 2\n                reasons.append(f\"high_value_task({row['task_type']})\")\n            \n            if upgrade_score >= 3:\n                prompt_preview = row['user_prompt'][:100] + '...' if len(row['user_prompt']) > 100 else row['user_prompt']\n                \n                candidates.append({\n                    'interaction_id': row['interaction_id'],\n                    'account_id': row['account_id'],\n                    'task_type': row['task_type'],\n                    'upgrade_score': upgrade_score,\n                    'prompt_preview': prompt_preview,\n                    'prompt_length': row['prompt_length'],\n                    'response_length': row['response_length'],\n                    'expansion_ratio': round(row['expansion_ratio'], 2),\n                    'risk_reason': ', '.join(reasons),\n                    'suggested_upgrade': self._suggest_upgrade(row)\n                })\n        \n        df_candidates = pd.DataFrame(candidates)\n        if not df_candidates.empty:\n            df_candidates = df_candidates.sort_values('upgrade_score', ascending=False).head(top_n)\n        \n        return df_candidates\n    \n    def _suggest_upgrade(self, row: pd.Series) -> str:\n        \"\"\"Suggest upgrade strategy for a prompt.\"\"\"\n        suggestions = []\n        \n        if row['prompt_format'] == 'short_direct':\n            suggestions.append(\"Use structured format with CONTEXT/TASK/OUTPUT sections\")\n        \n        if row['context_richness'] == 'low':\n            suggestions.append(\"Add relevant context and constraints\")\n        \n        if row['task_type'] in self.config['task_categories']['high_value']:\n            suggestions.append(\"Break down into subtasks with clear success criteria\")\n        \n        return '; '.join(suggestions) if suggestions else \"Add more structure and context\"\n    \n    def compare_accounts(self) -> pd.DataFrame:\n        \"\"\"Compare maturity scores across accounts.\"\"\"\n        if len(self.accounts) < 2:\n            print(\"⚠ Only 1 account found. Skipping comparison.\")\n            return pd.DataFrame()\n        \n        comparison = []\n        \n        for account_id in self.accounts:\n            metrics = self.compute_maturity_score(account_id)\n            df_account = self.df[self.df['account_id'] == account_id]\n            \n            # Format distribution\n            format_dist = df_account['prompt_format'].value_counts(normalize=True).to_dict()\n            \n            # Risk rate\n            risks = self.detect_risk_clusters()\n            risk_count = len(risks[risks['account_id'] == account_id]) if not risks.empty else 0\n            risk_rate = risk_count / len(df_account) if len(df_account) > 0 else 0\n            \n            comparison.append({\n                'account_id': account_id,\n                'maturity_score': metrics['maturity_score'],\n                'level': metrics['level'],\n                'confidence': metrics['confidence'],\n                'n_interactions': metrics['n_interactions'],\n                'short_direct_rate': format_dist.get('short_direct', 0),\n                'structured_rate': format_dist.get('structured', 0) + format_dist.get('multi_instruct', 0),\n                'risk_rate': round(risk_rate, 3)\n            })\n        \n        df_comparison = pd.DataFrame(comparison).sort_values('maturity_score', ascending=False)\n        \n        # Flag imbalance\n        max_n = df_comparison['n_interactions'].max()\n        min_n = df_comparison['n_interactions'].min()\n        if max_n / min_n > 3:\n            print(f\"⚠ Account comparison is imbalanced ({min_n} vs {max_n} interactions). Interpret ratios cautiously.\")\n        \n        return df_comparison\n    \n    def compute_quality_metrics(self) -> Optional[Dict[str, Any]]:\n        \"\"\"Compute quality metrics from human labels.\"\"\"\n        if self.labels_df is None or 'usefulness_score' not in self.df.columns:\n            print(\"⚠ No quality labels available. Skipping quality metrics.\")\n            return None\n        \n        labeled = self.df[self.df['usefulness_score'].notna()]\n        \n        if len(labeled) == 0:\n            print(\"⚠ No labeled interactions found.\")\n            return None\n        \n        metrics = {\n            'n_labeled': len(labeled),\n            'coverage': round(len(labeled) / len(self.df), 3),\n            'usefulness_avg': round(labeled['usefulness_score'].mean(), 2),\n            'precision_avg': round(labeled['precision_score'].mean(), 2) if 'precision_score' in labeled.columns else None,\n            'clarity_avg': round(labeled['clarity_score'].mean(), 2) if 'clarity_score' in labeled.columns else None,\n        }\n        \n        # Success/rework rates\n        if 'success_1st_turn' in labeled.columns:\n            metrics['success_1st_turn_rate'] = round(labeled['success_1st_turn'].mean(), 3)\n        \n        if 'rework_required' in labeled.columns:\n            rework_major = (labeled['rework_required'] == 'major').mean()\n            metrics['major_rework_rate'] = round(rework_major, 3)\n        \n        if 'hallucination_detected' in labeled.columns:\n            metrics['hallucination_rate'] = round(labeled['hallucination_detected'].mean(), 3)\n        \n        return metrics\n    \n    def generate_report(self, output_dir: Path) -> Path:\n        \"\"\"Generate main Markdown report.\"\"\"\n        output_dir.mkdir(parents=True, exist_ok=True)\n        report_path = output_dir / \"empower_v4_report.md\"\n        \n        # Overall maturity\n        overall_maturity = self.compute_maturity_score()\n        \n        # Account comparison\n        comparison = self.compare_accounts()\n        \n        # Risk clusters\n        risks = self.detect_risk_clusters()\n        \n        # Upgrade candidates\n        upgrades = self.generate_upgrade_candidates(top_n=10)\n        \n        # Quality metrics\n        quality = self.compute_quality_metrics()\n        \n        # Generate report\n        with open(report_path, 'w') as f:\n            f.write(\"# Empower V4 — AI Usage Evaluation Report\\n\\n\")\n            f.write(f\"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\\n\\n\")\n            f.write(f\"**Total interactions:** {len(self.df)}\\n\")\n            f.write(f\"**Accounts analyzed:** {len(self.accounts)}\\n\\n\")\n            \n            if self.mode == \"quick_proxy\":\n                f.write(\"⚠ **PROXY MODE ACTIVE** — These are structural metrics, not validated quality metrics.\\n\\n\")\n            \n            f.write(\"---\\n\\n\")\n            f.write(\"## Overall Maturity\\n\\n\")\n            f.write(f\"**Maturity Score:** {overall_maturity['maturity_score']} / 5.00\\n\\n\")\n            f.write(f\"**Level:** {overall_maturity['level']}\\n\\n\")\n            f.write(f\"**Confidence:** {overall_maturity['confidence']} ({overall_maturity['n_interactions']} interactions)\\n\\n\")\n            \n            f.write(\"### Component Scores\\n\\n\")\n            for comp, score in overall_maturity['components'].items():\n                f.write(f\"- {comp}: {score}\\n\")\n            f.write(\"\\n\")\n            \n            if not comparison.empty:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Account Comparison\\n\\n\")\n                f.write(comparison.to_markdown(index=False))\n                f.write(\"\\n\\n\")\n                \n                best = comparison.iloc[0]\n                worst = comparison.iloc[-1]\n                f.write(f\"**Most mature account:** {best['account_id']} (score: {best['maturity_score']})\\n\\n\")\n                f.write(f\"**Most risky account:** {worst['account_id']} (risk rate: {worst['risk_rate']:.1%})\\n\\n\")\n                f.write(f\"**Biggest gap:** {best['maturity_score'] - worst['maturity_score']:.2f} points\\n\\n\")\n            \n            if not risks.empty:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Top Risk Clusters\\n\\n\")\n                f.write(risks.head(10).to_markdown(index=False))\n                f.write(\"\\n\\n\")\n            \n            if not upgrades.empty:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Top 10 Prompt Upgrade Candidates\\n\\n\")\n                f.write(upgrades.to_markdown(index=False))\n                f.write(\"\\n\\n\")\n            \n            if quality:\n                f.write(\"---\\n\\n\")\n                f.write(\"## Quality Metrics (from labels)\\n\\n\")\n                f.write(f\"**Labeled interactions:** {quality['n_labeled']} / {len(self.df)} ({quality['coverage']:.1%} coverage)\\n\\n\")\n                f.write(f\"**Average usefulness:** {quality['usefulness_avg']} / 5.0\\n\\n\")\n                if quality.get('precision_avg'):\n                    f.write(f\"**Average precision:** {quality['precision_avg']} / 5.0\\n\\n\")\n                if quality.get('success_1st_turn_rate') is not None:\n                    f.write(f\"**Success on first turn:** {quality['success_1st_turn_rate']:.1%}\\n\\n\")\n                if quality.get('major_rework_rate') is not None:\n                    f.write(f\"**Major rework required:** {quality['major_rework_rate']:.1%}\\n\\n\")\n                if quality.get('hallucination_rate') is not None:\n                    f.write(f\"**Hallucination detected:** {quality['hallucination_rate']:.1%}\\n\\n\")\n            \n            f.write(\"---\\n\\n\")\n            f.write(\"## Recommended Next Actions\\n\\n\")\n            f.write(\"1. **Rewrite top upgrade candidates** using structured format (CONTEXT/TASK/OUTPUT)\\n\")\n            f.write(\"2. **Address risk clusters** by adding context and breaking down complex tasks\\n\")\n            if len(self.accounts) > 1:\n                f.write(f\"3. **Share best practices** from {comparison.iloc[0]['account_id']} with other accounts\\n\")\n            f.write(\"4. **Label more interactions** to enable quality-lift analysis\\n\")\n            f.write(\"5. **Monitor maturity over time** by running Empower V4 monthly\\n\\n\")\n        \n        print(f\"\\n✓ Report generated: {report_path}\")\n        return report_path\n    \n    def export_csvs(self, output_dir: Path):\n        \"\"\"Export all CSV datasets.\"\"\"\n        output_dir.mkdir(parents=True, exist_ok=True)\n        \n        # Normalized interactions\n        self.df.to_csv(output_dir / \"normalized_interactions.csv\", index=False)\n        print(f\"✓ Exported: normalized_interactions.csv\")\n        \n        # Maturity scorecard\n        scorecard = []\n        for account_id in self.accounts:\n            metrics = self.compute_maturity_score(account_id)\n            scorecard.append({\n                'account_id': account_id,\n                **metrics['components'],\n                'maturity_score': metrics['maturity_score'],\n                'level': metrics['level']\n            })\n        pd.DataFrame(scorecard).to_csv(output_dir / \"maturity_scorecard.csv\", index=False)\n        print(f\"✓ Exported: maturity_scorecard.csv\")\n        \n        # Account comparison\n        comparison = self.compare_accounts()\n        if not comparison.empty:\n            comparison.to_csv(output_dir / \"account_comparison.csv\", index=False)\n            print(f\"✓ Exported: account_comparison.csv\")\n        \n        # Risk clusters\n        risks = self.detect_risk_clusters()\n        if not risks.empty:\n            risks.to_csv(output_dir / \"risk_clusters.csv\", index=False)\n            print(f\"✓ Exported: risk_clusters.csv\")\n        \n        # Upgrade candidates\n        upgrades = self.generate_upgrade_candidates(top_n=20)\n        if not upgrades.empty:\n            upgrades.to_csv(output_dir / \"prompt_upgrade_candidates.csv\", index=False)\n            print(f\"✓ Exported: prompt_upgrade_candidates.csv\")\n    \n    def export_manifest(self, output_dir: Path, mode: str):\n        \"\"\"Export run manifest with metadata.\"\"\"\n        manifest = {\n            'run_timestamp': datetime.now().isoformat(),\n            'empower_version': 'v4.0.0',\n            'mode': mode,\n            'input_mode': self.mode,\n            'n_interactions': len(self.df),\n            'n_accounts': len(self.accounts),\n            'accounts': self.accounts,\n            'has_quality_labels': self.labels_df is not None,\n            'maturity_score': self.compute_maturity_score()['maturity_score']\n        }\n        \n        manifest_path = output_dir / \"run_manifest.json\"\n        with open(manifest_path, 'w') as f:\n            json.dump(manifest, f, indent=2)\n        \n        print(f\"✓ Exported: run_manifest.json\")\n    \n    def generate_charts(self, output_dir: Path):\n        \"\"\"Generate visualization charts.\"\"\"\n        if not CHARTS_AVAILABLE:\n            print(\"⚠ Matplotlib not available. Skipping charts.\")\n            return\n        \n        charts_dir = output_dir / \"charts\"\n        charts_dir.mkdir(parents=True, exist_ok=True)\n        \n        # Maturity by account\n        if len(self.accounts) > 1:\n            comparison = self.compare_accounts()\n            plt.figure(figsize=(10, 6))\n            plt.barh(comparison['account_id'], comparison['maturity_score'])\n            plt.xlabel('Maturity Score')\n            plt.title('Maturity Score by Account')\n            plt.xlim(0, 5)\n            plt.tight_layout()\n            plt.savefig(charts_dir / \"maturity_by_account.png\", dpi=150)\n            plt.close()\n            print(f\"✓ Generated: maturity_by_account.png\")\n        \n        # Prompt format distribution\n        format_counts = self.df['prompt_format'].value_counts()\n        plt.figure(figsize=(10, 6))\n        plt.bar(format_counts.index, format_counts.values)\n        plt.xlabel('Prompt Format')\n        plt.ylabel('Count')\n        plt.title('Prompt Format Distribution')\n        plt.xticks(rotation=45, ha='right')\n        plt.tight_layout()\n        plt.savefig(charts_dir / \"prompt_format_distribution.png\", dpi=150)\n        plt.close()\n        print(f\"✓ Generated: prompt_format_distribution.png\")\n        \n        # Context richness distribution\n        context_counts = self.df['context_richness'].value_counts()\n        plt.figure(figsize=(8, 6))\n        plt.pie(context_counts.values, labels=context_counts.index, autopct='%1.1f%%')\n        plt.title('Context Richness Distribution')\n        plt.tight_layout()\n        plt.savefig(charts_dir / \"context_richness_distribution.png\", dpi=150)\n        plt.close()\n        print(f\"✓ Generated: context_richness_distribution.png\")\n\n\ndef main():\n    parser = argparse.ArgumentParser(description='Empower V4 — AI Usage Evaluator')\n    parser.add_argument('--input', required=True, type=Path, help='Input CSV/JSONL file')\n    parser.add_argument('--labels', type=Path, help='Quality labels CSV (optional)')\n    parser.add_argument('--mode', default='full', \n                       choices=['quick', 'compare', 'full', 'labels', 'upgrade', 'all'],\n                       help='Execution mode')\n    parser.add_argument('--output', type=Path, default=Path('./empower_v4_package'),\n                       help='Output directory')\n    parser.add_argument('--charts', action='store_true', help='Generate charts')\n    parser.add_argument('--config', type=Path, help='Custom config JSON')\n    \n    args = parser.parse_args()\n    \n    # Load config\n    config = None\n    if args.config:\n        with open(args.config) as f:\n            config = json.load(f)\n    \n    # Initialize evaluator\n    evaluator = EmpowerV4Evaluator(config)\n    \n    # Load data\n    evaluator.load_data(args.input)\n    \n    # Load labels if provided\n    if args.labels:\n        evaluator.load_quality_labels(args.labels)\n    \n    # Execute based on mode\n    print(f\"\\n{'='*60}\")\n    print(f\"Running Empower V4 in '{args.mode}' mode\")\n    print(f\"{'='*60}\\n\")\n    \n    if args.mode in ['quick', 'full', 'all']:\n        report_path = evaluator.generate_report(args.output)\n    \n    if args.mode in ['full', 'all']:\n        evaluator.export_csvs(args.output)\n        evaluator.export_manifest(args.output, args.mode)\n    \n    if args.mode in ['compare', 'all']:\n        comparison = evaluator.compare_accounts()\n        if not comparison.empty:\n            print(\"\\nAccount Comparison:\")\n            print(comparison.to_string(index=False))\n    \n    if args.mode in ['upgrade', 'all']:\n        upgrades = evaluator.generate_upgrade_candidates(top_n=10)\n        if not upgrades.empty:\n            print(\"\\nTop Upgrade Candidates:\")\n            print(upgrades[['interaction_id', 'task_type', 'upgrade_score', 'risk_reason']].to_string(index=False))\n    \n    if (args.charts or args.mode == 'all') and CHARTS_AVAILABLE:\n        evaluator.generate_charts(args.output)\n    \n    print(f\"\\n{'='*60}\")\n    print(f\"✓ Empower V4 evaluation complete!\")\n    print(f\"✓ Results saved to: {args.output}\")\n    print(f\"{'='*60}\\n\")\n\n\nif __name__ == '__main__':\n    main()","stderr":""}
Analisei o código completo. Vou detalhar o que está correto e os bugs encontrados.

---

## Análise do Código de Qualidade/Maturidade

### ✅ O que está CORRETO

**Fórmula do maturity score:**
```python
maturity = 1 + 4 * (weighted_sum)  # resultado: 1.0 a 5.0
```
Os pesos somam exatamente 1.0 (0.30+0.25+0.20+0.10+0.10+0.05), cada componente retorna 0.0–1.0, e a escala final de 1–5 está matematicamente correta. ✅

**Scoring dos componentes individuais** — `_score_context_richness`, `_score_output_control`, `_score_high_value_share`, `_score_evidence_attachment` — todos corretos. ✅

---

### ❌ Bugs Encontrados

**Bug 1 — Crítico: `_infer_account_id` pega só a primeira linha**

```python
# CÓDIGO ATUAL (errado)
return df[col].iloc[0] if not df[col].isna().all() else ...
# Retorna um único valor → todas as linhas ficam com o mesmo account_id

# CORRETO
return df[col]
# Retorna a coluna inteira
```
Se o CSV tiver múltiplas contas, todas ficam com o ID da primeira linha. A comparação entre contas quebra completamente.

---

**Bug 2 — Performance: `detect_risk_clusters()` dentro de loop**

```python
# CÓDIGO ATUAL (dentro do for account_id in self.accounts)
risks = self.detect_risk_clusters()  # recalcula TUDO a cada iteração!
risk_count = len(risks[risks['account_id'] == account_id])

# CORRETO: calcular uma vez antes do loop
all_risks = self.detect_risk_clusters()
for account_id in self.accounts:
    risk_count = len(all_risks[all_risks['account_id'] == account_id])
```
Com 500 interações e 10 contas, roda o loop de risco 10x desnecessariamente.

---

**Bug 3 — KeyError em `compute_quality_metrics()`**

```python
# CÓDIGO ATUAL (quebra se coluna não existir)
labeled = self.df[self.df['usefulness_score'].notna()]

# CORRETO
if 'usefulness_score' not in self.df.columns:
    print("⚠ Column 'usefulness_score' not found in labels.")
    return None
labeled = self.df[self.df['usefulness_score'].notna()]
```
O `load_quality_labels()` só valida `interaction_id`, mas `compute_quality_metrics()` assume que `usefulness_score` existe — se o CSV de labels não tiver essa coluna, joga um `KeyError`.

---

**Bug 4 — Relatório rotula "Most risky account" errado**

```python
# CÓDIGO ATUAL
comparison = sorted by maturity_score descending
worst = comparison.iloc[-1]  # menor maturity — não é necessariamente o mais arriscado!
f.write(f"**Most risky account:** {worst['account_id']} (risk rate: {worst['risk_rate']:.1%})")

# CORRETO
most_risky = comparison.loc[comparison['risk_rate'].idxmax()]
f.write(f"**Most risky account:** {most_risky['account_id']} (risk rate: {most_risky['risk_rate']:.1%})")
```
Uma conta pode ter baixa maturidade mas poucos riscos detectados, e outra ter alta maturidade mas muitos riscos. São métricas independentes.

---

**Bug 5 — Menor: MD5 para hash de privacidade**

```python
# ATUAL
hash_val = hashlib.md5(fingerprint.encode()).hexdigest()[:12]

# MELHOR (SHA-256 truncado)
hash_val = hashlib.sha256(fingerprint.encode()).hexdigest()[:12]
```
MD5 é reversível em cenários de força bruta. Para uma skill que processa dados de conversas, SHA-256 é mais adequado.

---

### Resumo

| # | Bug | Severidade | Impacto |
|---|-----|-----------|---------|
| 1 | `_infer_account_id` pega só `iloc[0]` | 🔴 Crítico | Comparação entre contas quebra |
| 2 | `detect_risk_clusters()` em loop | 🟡 Médio | Performance degradada em escala |
| 3 | KeyError em `usefulness_score` | 🟡 Médio | Crash ao usar labels sem essa coluna |
| 4 | "Most risky" usa sort errado | 🟡 Médio | Relatório misleading |
| 5 | MD5 para hashing | 🟢 Baixo | Segurança de privacidade |

---

Quer que eu corrija esses bugs no script, empacote novamente e gere um novo `.skill`?
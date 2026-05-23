---
title: "Criando uma skill com estrutura completa"
date: 2026-04-23
account: directjervis@gmail.com
uuid: cb8d3a21-4366-42e8-8ae2-4d4da10187d1
messages: 4
tags: []
context: ""
---

**Você** _2026-04-23_

Skill creator vamos criar uma Skill full directory ?

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
Entendido. Antes de escrever qualquer coisa, preciso entender o que você quer que essa skill faça.

Quando você diz "full directory" — você está pedindo:

**A)** Uma skill com estrutura completa (`SKILL.md` + `scripts/` + `references/` + `assets/`) — ou seja, a arquitetura mais robusta possível

**B)** Uma skill específica cujo objetivo é *navegar/operar em diretórios* (file system, projeto, pasta de arquivos)

**C)** Outra coisa — me conta com suas palavras o que a skill deve fazer?

---

**Você** _2026-04-23_

A) You can expand this even more ir its possível

---

**Claude** _2026-04-23_

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
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/artifact-design-router_full-directory.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-04-23 14:06   artifact-design-router/references/\n        0  2026-04-23 14:06   artifact-design-router/templates/\n        0  2026-04-23 14:06   artifact-design-router/examples/\n        0  2026-04-23 14:06   artifact-design-router/scripts/\n    10627  2026-04-23 14:06   artifact-design-router/SKILL.md\n     1442  2026-04-23 14:06   artifact-design-router/README.md\n      274  2026-04-23 14:06   artifact-design-router/CHANGELOG.md\n     1585  2026-04-23 14:06   artifact-design-router/BUILD_REPORT.md\n      625  2026-04-23 14:06   artifact-design-router/references/operating-model.md\n      718  2026-04-23 14:06   artifact-design-router/references/routing-logic.md\n      513  2026-04-23 14:06   artifact-design-router/references/design-system.md\n      443  2026-04-23 14:06   artifact-design-router/references/token-taxonomy.md\n      495  2026-04-23 14:06   artifact-design-router/references/output-contracts.md\n      465  2026-04-23 14:06   artifact-design-router/references/anti-slop-rules.md\n      409  2026-04-23 14:06   artifact-design-router/references/quality-gates.md\n      312  2026-04-23 14:06   artifact-design-router/references/extraction-rules.md\n      368  2026-04-23 14:06   artifact-design-router/templates/source-analysis.md\n      181  2026-04-23 14:06   artifact-design-router/templates/routing-decision.md\n      383  2026-04-23 14:06   artifact-design-router/templates/artifact-brief.md\n      525  2026-04-23 14:06   artifact-design-router/templates/design-token-sheet.md\n      180  2026-04-23 14:06   artifact-design-router/templates/critique-report.md\n      308  2026-04-23 14:06   artifact-design-router/templates/handoff-checklist.md\n     1719  2026-04-23 14:06   artifact-design-router/examples/ex1_gemini_neuroexecucao_analysis.md\n      376  2026-04-23 14:06   artifact-design-router/examples/ex2_router_instagram_carousel.md\n      384  2026-04-23 14:06   artifact-design-router/examples/ex3_router_a4_pdf.md\n      337  2026-04-23 14:06   artifact-design-router/examples/ex4_router_generic_contexts.md\n      951  2026-04-23 14:06   artifact-design-router/scripts/normalize_briefing.py\n      757  2026-04-23 14:06   artifact-design-router/scripts/extract_design_tokens.py\n     1101  2026-04-23 14:06   artifact-design-router/scripts/build_artifact_spec.py\n      853  2026-04-23 14:06   artifact-design-router/scripts/qa_validate_spec.py\n---------                     -------\n    26331                     30 files\n","stderr":""}
{"returncode":0,"stdout":"# artifact-design-router\n\n## Purpose\nConvert any user context, source text, or pre-existing artifact into a reusable design-spec and artifact-generation brief instead of jumping straight into fixed code.\n\nThis skill is a **router**. It does not assume carousel, PDF, landing page, report, manifesto, or deck in advance. It first identifies:\n1. the real communication goal,\n2. the best artifact class,\n3. the design system constraints,\n4. the correct output contract,\n5. the quality gates before build.\n\nThe skill is optimized for:\n- HTML/SVG artifact briefs\n- design-token extraction\n- visual system normalization\n- anti-slop editorial design\n- reusable brand-consistent output specs\n- conversion of one-off artifacts into reusable systems\n\nIt is especially useful when:\n- the user has raw HTML, SVG, screenshots, PDFs, prompts, or design notes\n- the user wants to generalize one artifact into a reusable pattern\n- the source prompt mixes channels or formats\n- the generated artifact “looks good” but is architecturally weak\n- the user needs a brief, not raw code\n- the user needs code later, but first needs routing, structure, and design logic\n\n## What this skill does\nThis skill:\n- analyzes the source conversation, prompt, or artifact\n- separates reusable design logic from context-specific copy\n- detects contradictions, missing contracts, and hidden assumptions\n- routes the request to the best artifact mode\n- extracts or proposes design tokens\n- defines a reusable artifact specification\n- produces a structured brief for downstream generation\n- preserves fidelity requirements when the user asks for faithful content insertion\n- blocks weak or contradictory specs before build\n\nThis skill does **not**:\n- default to one format because the source asked for it once\n- assume that a finished HTML file is a reusable system\n- treat visual polish as proof of architectural quality\n- overfit to a single brand, subject, or niche unless requested\n- silently ignore conflicts in the prompt\n- write long raw code unless the user explicitly asks for implementation\n\n## Router principle\nAlways distinguish between:\n\n1. **Real objective**\n   What the user is truly trying to achieve.\n   Example: “create a reusable content production system.”\n\n2. **Proposed solution**\n   What the user initially asked for.\n   Example: “make an Instagram carousel in HTML/SVG.”\n\nThe skill must treat the proposed solution as a hypothesis, not a final decision.\n\n## Activation\nUse this skill when the input contains any of the following:\n- “analyze this artifact”\n- “turn this into a reusable system”\n- “extract design tokens”\n- “normalize this prompt”\n- “make this into a full-directory skill”\n- “create a router”\n- “convert this HTML/PDF/carousel/report into a reusable design library”\n- “create a brief from this code”\n- “the design is good but not reusable”\n- “I need this to work in any context”\n\n## Inputs accepted\n- raw prompts\n- AI conversation transcripts\n- HTML\n- SVG\n- CSS\n- markdown briefs\n- PDF text extracts\n- screenshots described in text\n- mixed-format source notes\n- prior artifact specs\n- copy decks\n- content outlines\n\n## Core operating sequence\n\n### Phase 0 — Frame the request\nClassify the user request:\n- analysis only\n- reusable design system extraction\n- router skill creation\n- artifact-spec generation\n- code generation support\n- redesign / critique\n- tokenization only\n- full directory package\n\nThen state:\n- real objective\n- proposed solution\n- adequacy: adequate / partially adequate / misaligned\n\n### Phase 1 — Source analysis\nAnalyze the source artifact or conversation across 7 lenses:\n1. intent clarity\n2. format consistency\n3. content fidelity\n4. design system coherence\n5. implementation coherence\n6. reusability\n7. output readiness\n\nFlag:\n- contradictions\n- missing constraints\n- hidden channel shifts\n- non-reusable hardcoding\n- design claims not matched by implementation\n- broken or unverifiable requirements\n\n### Phase 2 — Separate invariant vs variable layers\nSplit the source into:\n\n#### Invariant layer\nReusable design system logic:\n- tokens\n- spacing scale\n- typography roles\n- content hierarchy\n- composition principles\n- semantic color logic\n- visual grammar\n- output QA rules\n- export rules\n\n#### Variable layer\nContext-specific elements:\n- topic\n- persona\n- channel\n- copy\n- facts\n- CTA\n- tone\n- layout-specific module mix\n- brand-specific identity\n\nIf the source mixes these layers, rewrite them into separate sections.\n\n### Phase 3 — Route to artifact mode\nChoose one primary artifact mode:\n\n- `carousel_social`\n- `one_page_executive`\n- `a4_pdf_report`\n- `landing_page`\n- `manifesto_editorial`\n- `educational_explainer`\n- `case_study`\n- `comparison_sheet`\n- `design_token_library`\n- `component_brief`\n- `multi_artifact_system`\n\nRoute based on:\n- audience\n- consumption context\n- content density\n- fidelity requirement\n- export requirement\n- interaction model\n- time-to-use\n\nIf the input mixes two incompatible modes, explicitly split them.\n\n### Phase 4 — Define build contract\nProduce a structured artifact spec containing:\n- objective\n- audience\n- primary mode\n- optional secondary mode\n- source fidelity rule\n- content compression rule\n- design system\n- token skeleton\n- module map\n- layout rules\n- export rules\n- technical constraints\n- anti-patterns\n- acceptance checklist\n\n### Phase 5 — Quality gate before build\nBefore any implementation brief is finalized, verify:\n- no unresolved format contradiction\n- no missing delivery contract\n- no hidden dependency that violates the prompt\n- no fidelity claims contradicted by omissions\n- no design token ambiguity\n- no export instruction mismatch\n- no “system” claim based on one-off hardcoded code\n\nIf any fail, return `REFINE SPEC` instead of pretending the spec is ready.\n\n## Mandatory reasoning rules\n- Never assume the first requested output format is the best one.\n- Never confuse a generated artifact with a design system.\n- Never call something “fully faithful” unless the required source content is actually preserved.\n- Never say “zero dependencies” if external fonts or assets are loaded.\n- Never say “router” if the logic only supports one mode.\n- Never say “reusable” if brand, topic, and structure are hardcoded into one artifact.\n- Never accept channel confusion silently. Split or normalize it.\n\n## Design extraction protocol\nWhen given an artifact or code, extract:\n\n### A. Token candidates\n- colors\n- typography families and roles\n- weights\n- spacing scale\n- radii\n- borders\n- shadows\n- motion\n- grid\n- breakpoints\n- background textures\n- icon logic\n- semantic state colors\n\n### B. Composition patterns\n- header structures\n- section rhythms\n- cards\n- charts\n- callout boxes\n- evidence blocks\n- CTA modules\n- progress structures\n- multi-slide continuity rules\n\n### C. Anti-slop signals\n- asymmetry with control\n- whitespace discipline\n- hierarchy contrast\n- semantic color coding\n- restrained ornament\n- readable information density\n- signal over decoration\n\n### D. Reusability blockers\n- hardcoded copy\n- mixed media requirements\n- inconsistent slide/page math\n- missing symbols/defs\n- implementation claims not present in code\n- inaccessible contrast or export issues\n- hidden external dependencies\n\n## Contradiction handling\nIf the source prompt includes contradictions, do not “average them out”.\nInstead:\n1. list the contradictions,\n2. explain operational impact,\n3. propose normalized resolution,\n4. proceed with the normalized spec.\n\nCommon contradiction types:\n- Instagram slides vs A4 report\n- “no external dependencies” vs Google Fonts\n- “sans-serif only” vs hybrid serif system\n- “keep all text faithfully” vs compressed layout\n- “9 slides” vs 10 semantic sections\n- “no raw code needed” vs request for a single code artifact\n\n## Output modes\n\n### Mode: analysis\nReturn:\n- real objective\n- proposed solution\n- adequacy\n- what Gemini/source did right\n- what failed\n- what is reusable\n- what must be redesigned\n\n### Mode: router_skill\nReturn:\n- skill purpose\n- activation conditions\n- routing logic\n- design extraction logic\n- output contracts\n- templates\n- examples\n- quality gates\n\n### Mode: artifact_spec\nReturn:\n- normalized brief\n- design system section\n- token skeleton\n- module map\n- technical contract\n- export contract\n- acceptance checklist\n\n### Mode: build_handoff\nReturn:\n- exact implementation brief for HTML/SVG/CSS/React/etc.\n- no strategic ambiguity\n- no unresolved contradictions\n\n## Required response structure\nUse this order unless the user explicitly asks אחרת:\n\n1. `Conclusão`\n2. `Seu objetivo real`\n3. `A solução que você está propondo`\n4. `Avaliação`\n5. `Análise do artefato/conversa`\n6. `Arquitetura recomendada`\n7. `Roteamento recomendado`\n8. `Saída estruturada ou diretório`\n9. `Próximo passo executável`\n\n## Style rules\n- Dense, operational, and progressive.\n- Correct misuse of technical concepts.\n- Prefer the simplest architecture that still scales.\n- Explain technical differences in plain language.\n- Separate diagnostic critique from the proposed redesign.\n- Do not inflate weak artifacts with confident language.\n- Be explicit when something is only partially reusable.\n\n## Default deliverable for full-directory requests\nIf the user asks for a full-directory skill, generate:\n\n- `SKILL.md`\n- `README.md`\n- `CHANGELOG.md`\n- `references/`\n- `templates/`\n- `examples/`\n- `scripts/`\n\n## Canonical router decision table\nUse the following logic:\n\n- If goal is education + sequential persuasion + mobile-first → `carousel_social`\n- If goal is credibility + printable + dense reading → `a4_pdf_report`\n- If goal is brand positioning + founder voice → `manifesto_editorial`\n- If goal is reusable brand system → `design_token_library`\n- If goal is many future outputs from one source → `multi_artifact_system`\n- If goal is critique of existing artifact → `analysis`\n- If source mixes more than one of the above → `router_skill` + split downstream briefs\n\n## Example diagnostic verdict language\nUse verdicts like:\n- `adequado`\n- `parcialmente adequado`\n- `desalinhado`\n- `visualmente forte, mas arquiteturalmente fraco`\n- `reaproveitável no nível de sistema, não no nível de código bruto`\n- `bom artefato final, má base reutilizável`\n\n## Final quality rubric\nA good output from this skill must:\n- separate objective from proposed format\n- expose contradictions explicitly\n- preserve reusable logic\n- strip non-reusable hardcoding\n- define tokens and modules\n- choose the right output mode\n- produce a clear implementation handoff\n- avoid overengineering\n","stderr":""}
{"returncode":0,"stdout":"=== README ===\n# artifact-design-router\n\nRouter skill for turning one-off visual artifacts, prompts, HTML/SVG outputs, and mixed-format design requests into reusable, normalized build specifications.\n\n## Why this exists\nGenerated artifacts often look polished but are not reusable systems. This package turns:\n- messy design prompts,\n- AI conversation outputs,\n- raw HTML/SVG artifacts,\n- mixed channel specs,\ninto a reusable design router with token extraction, contradiction handling, and artifact-mode routing.\n\n## Best use cases\n- Turn a Gemini/Claude/ChatGPT artifact into a reusable spec\n- Extract design tokens from HTML/CSS/SVG\n- Normalize prompts that mix Instagram, PDF, report, and manifesto logic\n- Create downstream briefs for carousel, PDF, landing page, or multi-artifact systems\n- Critique whether a design artifact is reusable or only visually attractive\n\n## Directory map\n- `SKILL.md` — main Anthropic-style skill\n- `references/` — operating principles, design logic, quality gates\n- `templates/` — reusable templates for analysis and build handoff\n- `examples/` — worked examples, including the Gemini Neuroexecução case\n- `scripts/` — helper scripts for briefing normalization and token extraction\n- `CHANGELOG.md` — version history\n\n## Recommended workflow\n1. Run source analysis\n2. Separate invariant design system from variable copy\n3. Route to the correct artifact mode\n4. Produce artifact spec\n5. Only then build code\n=== BUILD_REPORT ===\n# BUILD_REPORT\n\n## Input analyzed\n- Gemini conversation transcript\n- Gemini output claims\n- HTML/SVG artifact\n\n## Strategic conclusion\nThe source artifact is visually useful, but not a reusable system.\nThe correct move is not to preserve the HTML as the productized core.\nThe correct move is to extract:\n- routing logic\n- token logic\n- composition rules\n- output contracts\n- quality gates\n\n## Main contradictions found\n1. Instagram carousel and A4 PDF logic mixed together\n2. “Zero dependency” claimed while Google Fonts are external\n3. “Keep all content faithfully” claimed, but several content blocks were omitted or compressed\n4. “SVG system with symbols/gauges” claimed, but not fully implemented\n5. “9 slides” request mixed with 10 semantic slide labels in the prompt\n\n## Main code-level issues found\n- No explicit `@page` declaration for true A4 print contract\n- Uses Google Fonts despite zero-dependency claim\n- `marker-end=\"url(#arrow)\"` references undefined arrow marker\n- SVG text uses width-like assumptions not actually enforced\n- Some requested lists and semantic sections are missing\n- The artifact is topic-hardcoded and not router-ready\n\n## What was preserved into the skill\n- editorial + consulting visual stance\n- token extraction need\n- anti-slop rules\n- contradiction handling\n- channel routing\n- build QA before implementation\n- full-directory packaging\n\n## Output produced\nA reusable full-directory router skill:\n- generic across contexts\n- not locked to TDAH or Neuroexecução\n- suitable for HTML/SVG/PDF/carousel/report/manifesto normalization\n=== REFERENCES ===\n--- /tmp/artifact-design-router/references/anti-slop-rules.md ---\n# Anti-Slop Rules\n\n## Desired signals\n- hierarchy is obvious in 2 seconds\n- contrast is functional, not decorative\n- semantic color use\n- asymmetry with balance\n- whitespace that improves reading\n- charts only when data earns them\n- typography roles are stable\n\n## Avoid\n- generic purple gradients\n- arbitrary glows\n- decorative clutter\n- fake sophistication\n- “consulting look” without information discipline\n- external dependencies labeled as zero dependency\n--- /tmp/artifact-design-router/references/design-system.md ---\n# Design System\n\n## Minimum reusable design system fields\n- color roles\n- typography roles\n- spacing scale\n- radius scale\n- border logic\n- shadow logic\n- grid logic\n- motion logic\n- chart logic\n- image/illustration policy\n- icon policy\n- accessibility thresholds\n- export rules\n\n## Semantic naming rule\nPrefer:\n- color.background.default\n- color.text.primary\n- color.action.primary\n\nAvoid:\n- blue500\n- redAlert2\n- prettyGray\n\n## Reason\nSemantic naming preserves flexibility when theme, brand, or context changes.\n--- /tmp/artifact-design-router/references/extraction-rules.md ---\n# Extraction Rules\n\n## When analyzing source code/artifacts\nExtract:\n1. what is explicitly implemented\n2. what is only claimed\n3. what is missing\n4. what is reusable\n5. what is contextual only\n\n## Never merge these categories.\nA common failure is to treat design intent text as proof that implementation exists.\n--- /tmp/artifact-design-router/references/operating-model.md ---\n# Operating Model\n\n## Core thesis\nA visually polished artifact is not the same thing as a reusable design system.\n\n## Three-layer model\n1. Source layer\n   Raw prompt, transcript, code, or artifact.\n2. System layer\n   Tokens, composition rules, routing logic, export contracts.\n3. Delivery layer\n   Carousel, report, PDF, landing page, etc.\n\n## Failure pattern this model prevents\nJumping from source layer directly to delivery layer creates:\n- hardcoded artifacts,\n- mixed-format specs,\n- fake reusability,\n- brittle code,\n- weak design governance.\n\n## Rule\nAlways extract the system layer before scaling the delivery layer.\n--- /tmp/artifact-design-router/references/output-contracts.md ---\n# Output Contracts\n\n## Every downstream artifact spec must define\n- primary channel\n- format dimensions\n- content fidelity rule\n- compression permission\n- export method\n- image policy\n- typography policy\n- technical dependencies\n- acceptance checklist\n\n## Examples\n### Carousel\n- frame size: 1080x1080\n- sequence count fixed\n- mobile-first readability\n- low text density per frame\n\n### A4 PDF\n- page size A4\n- print CSS explicit\n- page-break logic explicit\n- dense but readable paragraph blocks\n--- /tmp/artifact-design-router/references/quality-gates.md ---\n# Quality Gates\n\nA spec is blocked if any of the following is true:\n- format conflict unresolved\n- content fidelity claim unsupported\n- external dependency hidden\n- token system undefined\n- export logic incomplete\n- route selected without rationale\n- code requested before brief stabilization\n- reusable-system claim based on one hardcoded artifact\n\n## Verdicts\n- GO\n- GO WITH CONDITIONS\n- REFINE SPEC\n- STOP\n--- /tmp/artifact-design-router/references/routing-logic.md ---\n# Routing Logic\n\n## Primary routing inputs\n- communication goal\n- audience\n- reading context\n- density\n- required fidelity\n- export channel\n- platform constraints\n\n## Route selection matrix\n\n| Condition | Best route |\n|---|---|\n| Short mobile sequential persuasion | carousel_social |\n| Dense print-ready reading | a4_pdf_report |\n| Founder voice + brand thesis | manifesto_editorial |\n| Reusable cross-output visual language | design_token_library |\n| Existing artifact critique | analysis |\n| Multiple future outputs from one source | multi_artifact_system |\n\n## Split rule\nIf the source asks for:\n- Instagram + A4 + PDF + manifesto in one artifact,\nsplit into:\n1. system brief\n2. channel-specific downstream briefs\n--- /tmp/artifact-design-router/references/token-taxonomy.md ---\n# Token Taxonomy\n\n## Required token groups\n- color\n- typography\n- space\n- radius\n- border\n- shadow\n- opacity\n- motion\n- layout\n- chart\n- texture\n- icon\n\n## Example structure\n```json\n{\n  \"color\": {\n    \"background\": {\n      \"default\": { \"$value\": \"#0F172A\", \"$type\": \"color\" }\n    },\n    \"text\": {\n      \"primary\": { \"$value\": \"#F8FAFC\", \"$type\": \"color\" }\n    }\n  },\n  \"space\": {\n    \"md\": { \"$value\": \"16px\", \"$type\": \"dimension\" }\n  }\n}\n```\n=== TEMPLATES ===\n--- /tmp/artifact-design-router/templates/artifact-brief.md ---\n# Artifact Brief Template\n\n## Objective\n...\n\n## Audience\n...\n\n## Channel\n...\n\n## Format\n...\n\n## Fidelity rule\nfaithful | adapted | summarized | transformed\n\n## Design system\n### Color roles\n...\n### Typography roles\n...\n### Spacing\n...\n### Icon/chart policy\n...\n\n## Module map\n1. ...\n2. ...\n3. ...\n\n## Technical contract\n- ...\n\n## Export contract\n- ...\n\n## Acceptance checklist\n- ...\n--- /tmp/artifact-design-router/templates/critique-report.md ---\n# Critique Report Template\n\n## Summary verdict\n...\n\n## Strategic issue\n...\n\n## Design issue\n...\n\n## Technical issue\n...\n\n## Reusability issue\n...\n\n## Fix path\n1. ...\n2. ...\n3. ...\n--- /tmp/artifact-design-router/templates/design-token-sheet.md ---\n# Design Token Sheet\n\n## Color\n- background.default:\n- background.elevated:\n- text.primary:\n- text.secondary:\n- action.primary:\n- accent:\n- data:\n- success:\n- warning:\n- danger:\n\n## Typography\n- display.family:\n- heading.family:\n- body.family:\n- mono.family:\n- display.weight:\n- heading.weight:\n- body.weight:\n- body.lineHeight:\n\n## Space\n- xs:\n- sm:\n- md:\n- lg:\n- xl:\n\n## Radius\n- sm:\n- md:\n- lg:\n- xl:\n\n## Shadow\n- sm:\n- md:\n- lg:\n\n## Layout\n- canvas:\n- maxWidth:\n- grid:\n- breakpoint.sm:\n- breakpoint.md:\n- breakpoint.lg:\n--- /tmp/artifact-design-router/templates/handoff-checklist.md ---\n# Build Handoff Checklist\n\n- [ ] Route selected and justified\n- [ ] Format dimensions fixed\n- [ ] Content fidelity rule fixed\n- [ ] Token sheet defined\n- [ ] Module map defined\n- [ ] Export method explicit\n- [ ] External dependencies declared\n- [ ] Contradictions resolved\n- [ ] Acceptance checklist present\n--- /tmp/artifact-design-router/templates/routing-decision.md ---\n# Routing Decision Template\n\n## Primary route\n...\n\n## Why this route\n...\n\n## Rejected routes\n- route:\n  why rejected:\n\n## Split required?\nyes | no\n\n## Downstream deliverables\n- ...\n--- /tmp/artifact-design-router/templates/source-analysis.md ---\n# Source Analysis Template\n\n## Real objective\n...\n\n## Proposed solution\n...\n\n## Adequacy\nadequado | parcialmente adequado | desalinhado\n\n## What the source gets right\n- ...\n\n## Contradictions\n- ...\n\n## What is implemented\n- ...\n\n## What is claimed but not implemented\n- ...\n\n## What is reusable\n- ...\n\n## What is not reusable\n- ...\n\n## Recommended normalization\n- ...\n=== EXAMPLES ===\n--- /tmp/artifact-design-router/examples/ex1_gemini_neuroexecucao_analysis.md ---\n# Example 1 — Gemini Neuroexecução Analysis\n\n## Real objective\nTransform a topic-specific visual artifact request into a strong founder-credibility piece with professional editorial design.\n\n## Proposed solution\nGenerate a 9-slide Instagram carousel in HTML/SVG and later adapt the same logic to an executive A4 PDF.\n\n## Adequacy\nParcialmente adequado.\n\n## What Gemini got right\n- strong visual direction\n- usable visual identity nucleus\n- clear palette\n- decent typography role separation\n- some reusable atmospheric devices\n- some evidence-oriented tone\n\n## Main failures\n1. Mixed channels without proper split\n   Instagram carousel and A4 PDF were mixed in one system without normalization.\n\n2. Fidelity mismatch\n   The prompt demanded full textual fidelity, but the artifact omitted or compressed several required lines and list items.\n\n3. Implementation mismatch\n   The response claimed items like symbol icons, gauge logic, and strict A4 contracts that were not actually implemented.\n\n4. Dependency mismatch\n   “Zero dependency” was claimed while Google Fonts were loaded externally.\n\n5. Reusability failure\n   The output was topic-locked to Neuroexecução and not abstracted into tokens + modules + router logic.\n\n## Reusable layer\n- palette nucleus\n- typography role pattern\n- editorial-consulting aesthetic\n- noise/grid/gradient pattern\n- card/list/callout logic\n- credibility + data + ethics narrative arc\n\n## Non-reusable layer\n- topic-specific copy\n- Leonardo/Neuroexecução hardcoding\n- manifesto-specific structure\n- single-output HTML assumptions\n\n## Normalized conclusion\nDo not reuse the HTML as the system.\nReuse the system signals, extract tokens, split channel modes, and create a router.\n--- /tmp/artifact-design-router/examples/ex2_router_instagram_carousel.md ---\n# Example 2 — Router Output: Carousel Social\n\n## Route\ncarousel_social\n\n## Why\n- mobile-first\n- sequential persuasion\n- limited reading depth\n- brand education\n\n## Format\n- 1080x1080\n- 7 to 10 frames\n- max copy density per frame\n- one key point per frame\n\n## Build notes\n- do not force A4 print logic into the carousel spec\n- treat export-to-PDF as a secondary utility only\n--- /tmp/artifact-design-router/examples/ex3_router_a4_pdf.md ---\n# Example 3 — Router Output: A4 PDF Report\n\n## Route\na4_pdf_report\n\n## Why\n- printable\n- executive reading\n- denser information\n- page hierarchy matters\n\n## Format\n- A4 portrait\n- @page explicit\n- print CSS explicit\n- section breaks planned semantically\n\n## Build notes\n- do not borrow Instagram frame assumptions\n- charts and callouts should optimize for print, not swipe sequence\n--- /tmp/artifact-design-router/examples/ex4_router_generic_contexts.md ---\n# Example 4 — Generic Router Logic\n\nIf user provides:\n- raw code + wants system → extract tokens + create router skill\n- prompt + wants reusable outputs → create multi_artifact_system\n- strong HTML but weak scalability → analysis + design_token_library\n- one brand, many channels → router_skill + downstream briefs per channel\n=== SCRIPTS ===\n--- /tmp/artifact-design-router/scripts/build_artifact_spec.py ---\n#!/usr/bin/env python3\n\"\"\"\nBuild a minimal artifact spec skeleton from normalized JSON input.\nExit codes:\n0 = success\n1 = bad input\n2 = processing issue\n\"\"\"\nimport json\nimport sys\n\ndef main():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        print(\"ERROR: empty input\", file=sys.stderr)\n        return 1\n    try:\n        data = json.loads(raw)\n    except json.JSONDecodeError:\n        print(\"ERROR: input must be JSON\", file=sys.stderr)\n        return 1\n\n    spec = {\n        \"objective\": data.get(\"objective\", \"\"),\n        \"route\": data.get(\"route\", \"\"),\n        \"audience\": data.get(\"audience\", \"\"),\n        \"format\": data.get(\"format\", \"\"),\n        \"fidelity_rule\": data.get(\"fidelity_rule\", \"adapted\"),\n        \"token_groups\": [\"color\", \"typography\", \"space\", \"radius\", \"shadow\", \"layout\"],\n        \"acceptance\": [\n            \"route justified\",\n            \"format fixed\",\n            \"tokens defined\",\n            \"export contract explicit\"\n        ]\n    }\n    print(json.dumps(spec, ensure_ascii=False, indent=2))\n    return 0\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n--- /tmp/artifact-design-router/scripts/extract_design_tokens.py ---\n#!/usr/bin/env python3\n\"\"\"\nVery light heuristic extractor for color and font signals from HTML/CSS text.\nExit codes:\n0 = success\n1 = bad input\n2 = processing issue\n\"\"\"\nimport json\nimport re\nimport sys\n\nHEX_RE = re.compile(r'#[0-9a-fA-F]{3,8}\\b')\nFONT_RE = re.compile(r\"font-family:\\s*([^;]+);\", re.I)\n\ndef main():\n    raw = sys.stdin.read()\n    if not raw.strip():\n        print(\"ERROR: empty input\", file=sys.stderr)\n        return 1\n\n    colors = sorted(set(HEX_RE.findall(raw)))\n    fonts = sorted(set(f.strip() for f in FONT_RE.findall(raw)))\n\n    result = {\n        \"colors\": colors,\n        \"font_families\": fonts,\n    }\n    print(json.dumps(result, ensure_ascii=False, indent=2))\n    return 0\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n--- /tmp/artifact-design-router/scripts/normalize_briefing.py ---\n#!/usr/bin/env python3\n\"\"\"\nNormalize a mixed prompt into a structured artifact briefing.\nExit codes:\n0 = success\n1 = bad input\n2 = processing issue\n\"\"\"\nimport json\nimport re\nimport sys\n\ndef main():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        print(\"ERROR: empty input\", file=sys.stderr)\n        return 1\n\n    result = {\n        \"objective\": \"\",\n        \"proposed_solution\": \"\",\n        \"channels\": [],\n        \"constraints\": [],\n        \"signals\": [],\n    }\n\n    lower = raw.lower()\n    if \"instagram\" in lower:\n        result[\"channels\"].append(\"instagram\")\n    if \"pdf\" in lower or \"a4\" in lower:\n        result[\"channels\"].append(\"pdf\")\n    if \"html\" in lower:\n        result[\"channels\"].append(\"html\")\n\n    lines = [l.strip() for l in raw.splitlines() if l.strip()]\n    result[\"signals\"] = lines[:20]\n\n    print(json.dumps(result, ensure_ascii=False, indent=2))\n    return 0\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n--- /tmp/artifact-design-router/scripts/qa_validate_spec.py ---\n#!/usr/bin/env python3\n\"\"\"\nValidate whether a spec has the minimum fields to proceed.\nExit codes:\n0 = success\n1 = bad input\n2 = validation failure\n\"\"\"\nimport json\nimport sys\n\nREQUIRED = [\"objective\", \"route\", \"format\", \"fidelity_rule\"]\n\ndef main():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        print(\"ERROR: empty input\", file=sys.stderr)\n        return 1\n    try:\n        data = json.loads(raw)\n    except json.JSONDecodeError:\n        print(\"ERROR: input must be JSON\", file=sys.stderr)\n        return 1\n\n    missing = [k for k in REQUIRED if not data.get(k)]\n    if missing:\n        print(json.dumps({\"status\": \"REFINE SPEC\", \"missing\": missing}, ensure_ascii=False, indent=2))\n        return 2\n\n    print(json.dumps({\"status\": \"GO\"}, ensure_ascii=False, indent=2))\n    return 0\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n","stderr":""}
Lido tudo. Diagnóstico completo antes de escrever uma linha:

**O que está bom:** SKILL.md operacional sólido, lógica de roteamento clara, scripts funcionais, estrutura de diretório presente.

**O que está faltando para ser "full directory" real:**
- YAML frontmatter ausente no SKILL.md (sem ele o sistema de triggering não funciona)
- Sem `agents/` directory (subagentes especializados)
- Sem `assets/` (schemas canônicos, diagramas)
- References são rasas (specs de canal, acessibilidade, taxonomy de contradições ausentes)
- Scripts: sem `validate_tokens.py`, `detect_contradictions.py`, `generate_css_vars.py`, `audit_dependencies.py`
- Templates: sem multi-artifact, contradiction-log, channel-brief
- Examples: só 4 casos, faltam manifesto, multi-artifact, resolution workflow
- Progressive disclosure quebrado — SKILL.md carrega tudo inline em vez de apontar para referências

Vou construir a versão expandida completa agora.
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /tmp/adr-v2/artifact-design-router/SKILL.md
File created successfully: /tmp/adr-v2/artifact-design-router/agents/source-analyzer.md
File created successfully: /tmp/adr-v2/artifact-design-router/agents/token-extractor.md
File created successfully: /tmp/adr-v2/artifact-design-router/agents/contradiction-detector.md
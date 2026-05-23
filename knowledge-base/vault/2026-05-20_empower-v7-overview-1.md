---
title: "Empower v7 overview"
date: 2026-05-20
account: maiajoaovinicius@gmail.com
uuid: 5152d026-0346-4f1a-820d-4aa3667d2447
messages: 2
tags: []
context: ""
---

**Você** _2026-05-20_

/empower-v7

---

**Claude** _2026-05-20_

1	---
     2	name: empower-v7
     3	version: 7.0.0
     4	description: |
     5	  Use SEMPRE quando o usuário quiser auditar seu uso do Claude, medir performance,
     6	  comparar práticas com o gold standard Anthropic, gerar personalização de conta,
     7	  ou entender como está usando IA no trabalho real.
     8	
     9	  Gatilhos explícitos: "empower", "meta-análise", "auditar conversas",
    10	  "como estou usando Claude", "minha performance com Claude",
    11	  "benchmark", "estou acima da média", "personalização de conta",
    12	  "questionário de uso", "skill performance", "analyze my conversations",
    13	  "audit my Claude usage", "am I above average", "gerar perfil",
    14	  "dashboard de uso", "meu nível com Claude"
    15	
    16	  NÃO usar para: análise de código, criação de documentos, pesquisas externas,
    17	  tarefas que não envolvam avaliação do próprio uso do Claude pelo usuário.
    18	
    19	  ICP: qualquer usuário Claude (Free/Pro/Max) que quer melhorar seu desempenho
    20	  com IA — consultores, pesquisadores, educadores, desenvolvedores, criadores.
    21	
    22	compatibility:
    23	  tools:
    24	    - bash_tool
    25	    - create_file
    26	    - view
    27	    - str_replace
    28	    - present_files
    29	  integrations:
    30	    - frontend-design
    31	    - cognitive-framework-router
    32	    - skill-creator
    33	---
    34	
    35	# EMPOWER V7 · AI Usage Validation & Growth Engine
    36	
    37	## QUANDO USAR
    38	
    39	### Gatilhos Explícitos
    40	- "empower" / "meta-análise" / "auditar conversas" / "questionário de uso"
    41	- "como estou usando Claude" / "minha performance" / "meu nível com Claude"
    42	- "benchmark" / "estou acima da média" / "am I above average"
    43	- "personalização de conta" / "gerar perfil de uso" / "dashboard de uso"
    44	- "analyze my conversations" / "audit my Claude usage"
    45	
    46	### Gatilhos Contextuais
    47	- Usuário enviou export de conversas Claude (.json/.zip/.csv)
    48	- Usuário quer saber se está "usando Claude certo"
    49	- Usuário quer gerar prompt de personalização para sua conta
    50	- Usuário quer comparar seu uso com boas práticas
    51	
    52	### NÃO Usar Para
    53	- Criação de documentos, código, pesquisas externas
    54	- Qualquer tarefa que não seja avaliação do próprio uso do Claude
    55	- Análise de uso de outras IAs (escopo: Claude apenas)
    56	
    57	---
    58	
    59	## WORKFLOW CANÔNICO
    60	
    61	```
    62	INPUT ──────────────────────────────────────────────────
    63	  Export de conversas  →  MODE A (Conversation Audit)
    64	  Sem export           →  MODE B (Guided Questionnaire)
    65	  
    66	FASE 1 — DETECT MODE
    67	  ├─ Arquivo(s) enviado(s)?  →  MODE A
    68	  └─ Sem arquivo            →  MODE B → render questionnaire inline
    69	
    70	FASE 2 — INGEST & NORMALIZE  [MODE A only]
    71	  ├─ Parse export (JSON/JSONL/CSV/ZIP)
    72	  ├─ Normalize to canonical V7 schema
    73	  ├─ Redact PII before any analysis
    74	  └─ Cynefin-classify each interaction (batch LLM call)
    75	
    76	FASE 3 — SCORE (7 dimensions)
    77	  ├─ D1 Delegation      [AI Fluency]
    78	  ├─ D2 Description     [AI Fluency + 21 Anthropic GPs]
    79	  ├─ D3 Discernment     [AI Fluency]
    80	  ├─ D4 Diligence       [AI Fluency + AI Act literacy]
    81	  ├─ P1 Personalization [Claude feature stack]
    82	  ├─ W1 Workflow        [Empower maturity rubric]
    83	  └─ G1 Governance      [AI Act Article 4 literacy-aligned]
    84	
    85	FASE 4 — BENCHMARK (external anchor — MANDATORY)
    86	  ├─ Map user score to 5-level benchmark:
    87	  │   Novice (20–35%) → Developing (36–55%) → Proficient (56–70%)
    88	  │   Advanced (71–85%) → Expert (86–100%)
    89	  ├─ Compute percentile vs anchor population
    90	  └─ Identify "biggest gap to next level"
    91	
    92	FASE 5 — GENERATE INLINE DASHBOARD
    93	  ├─ Render interactive HTML/SVG artifact
    94	  ├─ Header metrics: Alignment Index, Level, Benchmark %, Top Gap
    95	  ├─ Radar chart: 7 dimensions vs benchmark level
    96	  ├─ WITH/WITHOUT comparison charts (per Cynefin domain)
    97	  ├─ Dimension cards with evidence + next action
    98	  └─ Personalization prescription at bottom
    99	
   100	FASE 6 — DELIVERABLES
   101	  ├─ E-001 Inline dashboard (HTML/SVG)  ← PRIMARY
   102	  ├─ E-002 Executive summary (Markdown)
   103	  ├─ E-003 Personalization prompt (profile + style + project)
   104	  ├─ E-004 Command library (XLSX — reutilizable workflows)
   105	  └─ E-005 Redaction log (CSV)
   106	
   107	FASE 7 — #META-REGENERATION
   108	  └─ Emit inline JSON v7.0 → BACKLOG.md append in Drive
   109	```
   110	
   111	---
   112	
   113	## SCORING SYSTEM
   114	
   115	### Dimensões e Pesos
   116	
   117	| ID | Dimensão | Framework | Max pts | Peso |
   118	|----|----------|-----------|---------|------|
   119	| D1 | Delegation | AI Fluency | 40 | 15% |
   120	| D2 | Description | AI Fluency + 21 GPs | 40 | 25% |
   121	| D3 | Discernment | AI Fluency | 40 | 20% |
   122	| D4 | Diligence | AI Fluency | 40 | 15% |
   123	| P1 | Personalization | Claude stack | 40 | 10% |
   124	| W1 | Workflow | Empower rubric | 40 | 10% |
   125	| G1 | Governance | AI Act literacy | 40 | 5% |
   126	
   127	**Alignment Index** = weighted average of 7 dimensions, normalized 0–100%
   128	
   129	### Benchmark Anchors (External — NOT internal comparison)
   130	
   131	| Level | Score | Profile description |
   132	|-------|-------|---------------------|
   133	| **Novice** | 20–35% | Conversational use, no skills, generic prompts |
   134	| **Developing** | 36–55% | Aware of practices, inconsistent application |
   135	| **Proficient** | 56–70% | Regular structure, some XML, basic workflow |
   136	| **Advanced** | 71–85% | Full skill suite, systematic prompting, measurable ROI |
   137	| **Expert** | 86–100% | All 7 dimensions optimized, complete personalization |
   138	
   139	Source: Anthropic AI Fluency course + prompting best practices docs
   140	
   141	---
   142	
   143	## MODE B — QUESTIONNAIRE STRUCTURE
   144	
   145	6 sections (like SkillForge multi-step form):
   146	
   147	1. **Identidade** — role, experience, primary use cases
   148	2. **Delegação** — what you ask Claude to do
   149	3. **Estrutura** — how you write prompts
   150	4. **Discernimento** — how you validate outputs
   151	5. **Personalização** — Claude features you use
   152	6. **Objetivos** — what you want to improve
   153	
   154	Each section generates inferred scores per dimension.
   155	After step 6 → generate full inline dashboard from inferred data.
   156	Confidence label: "inferred (Mode B)" in all outputs.
   157	
   158	---
   159	
   160	## REFERÊNCIAS
   161	
   162	Consultar progressivamente — não carregar tudo de uma vez:
   163	
   164	| Arquivo | Propósito | Quando ler |
   165	|---------|-----------|------------|
   166	| `references/anthropic-gold-standard-v1.md` | 21 GPs operacionalizados | Fase 3 (scoring D2) |
   167	| `references/ai-fluency-4d-matrix.md` | Rubrica D1–D4 | Fase 3 (scoring D1-D4) |
   168	| `references/benchmark-anchors.md` | Anchor levels + percentis | Fase 4 (benchmark) |
   169	| `references/personalization-stack.md` | Layers P1 | Fase 3 + Fase 6 (E-003) |
   170	| `references/privacy-redaction.md` | PII detection rules | Fase 2 (normalize) |
   171	| `templates/dashboard-template.html` | Layout dashboard inline | Fase 5 |
   172	| `templates/questionnaire-template.html` | Mode B form | Fase 1 (Mode B) |
   173	| `scripts/score_dimensions.py` | Scoring engine | Fase 3 |
   174	| `scripts/compute_benchmark.py` | External anchor calc | Fase 4 |
   175	
   176	---
   177	
   178	## LANGUAGE RULES
   179	
   180	- NUNCA usar: "AI Act compliant", "Anthropic-approved", "certified"
   181	- SEMPRE usar: "Anthropic-aligned", "AI Act Article 4 literacy-aligned"
   182	- Todos os claims com evidência citada (URL ou fonte)
   183	- Mode B outputs: marcar como "inferred — Mode B" (não "measured")
   184	- PII redactada antes de qualquer output compartilhável
   185	
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
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/data-4aa6545a-c3b5-40e5-82d9-ba62e3b3ddba-1779281916-74f9ba26-batch-0000.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n      147  2026-05-20 12:58   users.json\n    18393  2026-05-20 12:58   projects/019e2c32-0e63-75dc-9481-9a64f985ed7b.json\n   264359  2026-05-20 12:58   projects/019e3f7b-ef5a-7155-b005-1d56236f9d0d.json\n     7144  2026-05-20 12:58   memories.json\n   760425  2026-05-20 12:58   conversations.json\n---------                     -------\n  1050468                     5 files\n","stderr":""}
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/data-4aa6545a-c3b5-40e5-82d9-ba62e3b3ddba-1779281916-74f9ba26-batch-0000.zip\n  inflating: empower_data/users.json  \n  inflating: empower_data/projects/019e2c32-0e63-75dc-9481-9a64f985ed7b.json  \n  inflating: empower_data/projects/019e3f7b-ef5a-7155-b005-1d56236f9d0d.json  \n  inflating: empower_data/memories.json  \n  inflating: empower_data/conversations.json  \n[{\"uuid\": \"64ca97c3-2501-4f52-8fa4-ea4d9643a95d\", \"full_name\": \"Leo\", \"email_address\": \"adm.aigovbrasil@gmail.com\", \"verified_phone_number\": null}]","stderr":""}
{"returncode":0,"stdout":"Total conversations: 3\nKeys: ['uuid', 'name', 'summary', 'created_at', 'updated_at', 'account', 'chat_messages']\nFirst convo name: Continuar o trabalho\nMessage count: 2\n\n--- Continuar o trabalho ---\n  Messages: 2\n  First sender: human\n  Sample text: CONTUNE O TRABLAHO\n\n--- Criando fluxo de trabalho linear para TDAH ---\n  Messages: 8\n  First sender: human\n  Sample text: Oi Claude—acabei de adicionar a habilidade “tdah-linear-workflow-os”. Você pode criar algo incrível \n\n--- Estrutura e estilo para primeiro livro sobre IA ---\n  Messages: 6\n  First sender: human\n  Sample text: EU SOU leoanrdo no projeto em anexo estao exemplos para para copoituos do livero.  e estou escrvernd\n","stderr":""}
{"returncode":0,"stdout":"Total turns: 16\nHuman turns: 8\n\n[H1] Continuar o trabalho\nCONTUNE O TRABLAHO\n\n[H2] Criando fluxo de trabalho linear para TDAH\nOi Claude—acabei de adicionar a habilidade “tdah-linear-workflow-os”. Você pode criar algo incrível com ela?\n\n[H3] Criando fluxo de trabalho linear para TDAH\nVamos criasr workspace para rodar os testes intermanete aqui em cladue ai ok ?\n\n[H4] Criando fluxo de trabalho linear para TDAH\nTenho um arquivo desestrturado de 21,5mb em zip que preciso enviar para vc em um fluxo gerar master index + organziado poor dependcias etc… dentr do tema de tdha coom pidemos fazer isso ?ial modelo usar e tecncia working backwords\n\n[H5] Criando fluxo de trabalho linear para TDAH\nreduzi para 3mb\n\n[H6] Estrutura e estilo para primeiro livro sobre IA\nEU SOU leoanrdo no projeto em anexo estao exemplos para para copoituos do livero.  e estou escrverndo com sua ajuda meu priemiro livro. estou com todo o insumo addciconalo ao projeto e Na conversa aqui. use como refrecnia de geracao dk styles. priemiro scaneie os arqeivos e indique qual a estrtura do livro ? oque entra oque sai e pq ? sumario indce ? desenhe como dk. va alem do meu pedido conseran\n\n[H7] Estrutura e estilo para primeiro livro sobre IA\nem aenxo esta apenas um exemplo para vc se inspirar. gere aqui na convrsa mesmo todo o livro nesse estilo sendo para cada folha a4 modo paisagem 50% um capitulo 50% outro prem segunid regras editorial de padrao f e with space.\n\n[H8] Estrutura e estilo para primeiro livro sobre IA\n/doc-coauthoring [ 1-before any move think 2-comeback with option and next steep max total 600 worlds a)retorne com sua analise e qs tres opcoes max 300 palavras. b)desevolva um deseing intelegene agente to agent que permita obter o resultado dentro dos padroes de qualide com 3 variaveis somente: 1-[insumo gerado por voce nessa sessao] + 2-[cmd agente to agente gerado por voce nessa sessao ] + 3 -\n","stderr":""}
{"returncode":0,"stdout":"MEMORIES:\n[\n  {\n    \"conversations_memory\": \"**Work context**\\n\\nLeo is a solo founder-operator and consultant based in Santos, SP, Brazil, working at the intersection of AI literacy, workflow engineering, and AI governance (LGPD, EU AI Act, ANPD compliance) for Brazilian SMEs and public sector clients. Leo operates independently, builds Claude-based skill suites and consulting systems, and is pursuing Anthropic Community Ambassador status using a documented portfolio of Claude skills. A planned relocation to the Netherlands is on the horizon, with PO/PM roles in AI-adjacent positions as a career target (NL Career Sprint).\\n\\n**Personal context**\\n\\nLeo speaks Portuguese as a primary language and English fluently, often code-switching between them. Leo designs workflows and tools with cognitive load reduction in mind, favoring progressive disclosure, gates, and printable artifacts. Leo works primarily on iPad and applies a disciplined solo-operator schedule with hard limits on parallel workstreams and weekend rest.\\n\\n**Top of mind**\\n\\nNo conversation summaries with timestamps within the last 3 weeks are available; the synthesis below is drawn entirely from the exported memory context provided via user instructions.\\n\\n**Brief history**\\n\\n*Recent months*\\n\\nLeo has been actively building and packaging a suite of interconnected Claude-based systems:\\n\\n- **X-Ray Suite**: A consulting OS for SME diagnostics built across ~10 Claude skills (orchestrator, diagnostics, branding, onboarding, publishing, etc.), designed for consultant-to-SME deployment. Status: active and being distributed.\\n- **Praxis OS**: A professional services OS routing across 23 specialist agents via five phases (SIGNAL, INTELLIGENCE, ARTIFACT, DELIVERY, FEEDBACK), activated by `/praxis` commands. Undergoing pre-launch audit and stress testing.\\n- **Horácio**: A Research-to-Decision Agent (v2.0) with a 5-pass protocol for RAG, vault management, and signal processing. Packaged and distributed.\\n- **AI Governance Brasil (aigovbrasil)**: A GitHub-based consulting and training platform for AI governance compliance in Brazil. Intentionally branded (not a generic skills library); repo being structured.\\n- **FORGE / forge-visual-canvas**: A visual artifact generation system producing HTML, React/JSX, SVG, PDF, and PPTX outputs with brand consistency. Active skill in suite.\\n- **NeuroPlanner Mobile**: An Expo/React Native app (~95% visually complete) for ADHD task planning. Three critical architectural gaps identified before MVP: no server-side feature router, LLM not actually called, task generation uses hardcoded templates.\\n- **TDAH-Linear-Workflow-OS v2.0**: A commercial Claude skill product for ADHD knowledge workers using Linear, with full pricing tiers and bilingual documentation. Complete but not yet deployed.\\n- **Claude Export Benchmark Runner**: A Python tool benchmarking Claude usage across multiple accounts using a 4D productivity framework (Delegation, Description, Discernment, Dili\n","stderr":""}
{"returncode":0,"stdout":"\n=== CONVO: Continuar o trabalho ===\n[human]: CONTUNE O TRABLAHO\n\n[assistant]: The user is asking me to continue the work. They've shared a comprehensive design token system for AI Gov Brasil that's built on a DK editorial foundation. The document shows:\n\n1. A complete YAML-based design token file organized in 4 layers:\n   - Layer 1: Primitives (raw color, typography, spacing values)\n   - Layer 2: Semantic tokens (intent-based, theme-switchable)\n   - Layer 3: Component tokens (scoped to G-series patterns)\n   - Layer 4: Brand themes (AI Gov Brasil overlay)\n\n2. Three usage patterns for implementing these tokens\n3. Guidelines for when to apply the brand theme vs the editori\n\n\n=== CONVO: Criando fluxo de trabalho linear para TDAH ===\n[human]: Oi Claude—acabei de adicionar a habilidade “tdah-linear-workflow-os”. Você pode criar algo incrível com ela?\n\n[assistant]:  \n\n[human]: Vamos criasr workspace para rodar os testes intermanete aqui em cladue ai ok ?\n\n[assistant]: O usuário quer criar um workspace para rodar os testes internamente aqui no Claude.ai. Ele está vendo o histórico de uma conversa anterior onde estávamos construindo um sistema de eval para skills baseado no SkillsBench.\n\nAgora ele quer que eu:\n1. Crie um workspace funcional aqui no Claude.ai\n2. Rode os testes de avaliação dos skills dele\n3. Mostre os resultados comparativos (with_skill vs without_skill)\n\nVou criar uma estrutura de eval inline que:\n- Lista todos os skills disponíveis dele\n- Cria tasks de teste para cada um\n- Roda comparações with_skill vs without_skill\n- Gera scores e rankings\n\n[human]: Tenho um arquivo desestrturado de 21,5mb em zip que preciso enviar para vc em um fluxo gerar master index + organziado poor dependcias etc… dentr do tema de tdha coom pidemos fazer isso ?ial modelo usar e tecncia working backwords\n\n[assistant]:  Boa pergunta — e tem uma pegadinha importante aqui. Vou trabalhar de trás pra frente.\n\n---\n\n**Working Backwards: o que você quer no final?**\n\nUm **Master Index** do conteúdo do ZIP — estruturado por dependências, pronto pra usar como contexto de entrada pra outros skills (TDAH-OS, Praxis, Horácio, etc.). Ou seja: o ZIP vira um workspace organizado que o Claude consegue operar.\n\n---\n\n**A pegadinha do 21.5MB**\n\nO problema não é o tamanho do arquivo — é a janela de contexto. Um ZIP de 21.5MB descomprimido pode ter centenas de arquivos e dezenas de MB de texto. Se você jogar tudo no contexto de u\n\n[human]: reduzi para 3mb\n\n[assistant]: \n```\nThis block is not supported on your current device yet.\n```\n\n\n```\nThis block is not supported on your current device yet.\n```\n\nOkay! Agora tenho o inventário completo. 43 arquivos, mas a maioria são metadados macOS (`__MACOSX/`). Vou filtrar e analisar os arquivos reais:\n\nArquivos reais no ZIP:\n1. `tdha/adhd-desk-dashboard-skill.skill` (279KB) - skill file\n2. `tdha/texto 3.txt` (3.4KB) - texto\n3. `tdha/neuroplanner-mobile.zip` (1.3MB) - ZIP aninhado\n4. `tdha/texto 2.txt` (325B) - texto curto\n5. `tdha/workflow-to-skill-magic.skill 2.zip` (11.5KB) - ZIP aninhado\n6. `tdha/adhd-desk-dashboard\n\n\n=== CONVO: Estrutura e estilo para primeiro livro sobre IA ===\n[human]: EU SOU leoanrdo no projeto em anexo estao exemplos para para copoituos do livero.  e estou escrverndo com sua ajuda meu priemiro livro. estou com todo o insumo addciconalo ao projeto e Na conversa aqui. use como refrecnia de geracao dk styles. priemiro scaneie os arqeivos e indique qual a estrtura do livro ? oque entra oque sai e pq ? sumario indce ? desenhe como dk. va alem do meu pedido conserando inminha lacunas de conchiemtnio. pesneiu em algo como: AI guide for workers,worklfows,cmds,a-z framewroks,-az ai act - az- lietracy,et…expanda e gere meu estilo e poucas palavras e mais viusal\n\n[assistant]: Leonardo quer que eu escaneie os arquivos do projeto para entender a estrutura do livro que ele está escrevendo. Ele quer saber:\n1. Qual a estrutura do livro\n2. O que entra, o que sai e por quê\n3. Sumário e índice\n4. Desenhar como funciona\n5. Ir além do pedido dele, considerando lacunas de conhecimento\n6. Ele pensou em algo como: AI guide for workers, workflows, CMDs, A-Z frameworks, A-Z AI Act, A-Z literacy, etc.\n7. Quer que eu expanda e gere no estilo dele: poucas palavras, mais visual\n\nVou começar escaneando os arquivos do projeto para entender o que já existe.\n\nVou usar o comando view para\n\n[human]: em aenxo esta apenas um exemplo para vc se inspirar. gere aqui na convrsa mesmo todo o livro nesse estilo sendo para cada folha a4 modo paisagem 50% um capitulo 50% outro prem segunid regras editorial de padrao f e with space.\n\n[assistant]:  Vou criar o livro completo no estilo DK (Dorling Kindersley) — visual, modular, A4 paisagem, 50/50 por spread. Começando:\n\n---\n\n# 📘 AI OPERATOR SYSTEM\n## From Prompt to Workflow — The Visual Guide\n\n---\n\n## SPREAD 1 — INTRODUCTION + WHY THIS BOOK\n\n```\n┌─────────────────────────────────────┬─────────────────────────────────────┐\n│ LEFT PAGE (50%)                     │ RIGHT PAGE (50%)                    │\n│ INTRODUCTION                        │ WHY THIS BOOK EXISTS                │\n├─────────────────────────────────────┼─────────────────────────────────────┤\n│                                   \n\n[human]: /doc-coauthoring [ 1-before any move think 2-comeback with option and next steep max total 600 worlds a)retorne com sua analise e qs tres opcoes max 300 palavras. b)desevolva um deseing intelegene agente to agent que permita obter o resultado dentro dos padroes de qualide com 3 variaveis somente: 1-[insumo gerado por voce nessa sessao] + 2-[cmd agente to agente gerado por voce nessa sessao ] + 3 - [ zip gerado por mim clasiificado sempre como newentry zip] essas tres variveis sao unicas no prmeiro worklfow vou usar seu insumo e cmd o zip ja foi feito. porem no proximo bench o agente deve entre\n\n[assistant]:  Leonardo está pedindo uma análise e proposta de design para um workflow agente-to-agente. Ele quer:\n\n1. Análise com 3 opções (max 300 palavras)\n2. Um design inteligente agente-to-agente com 3 variáveis:\n   - Insumo gerado por mim nessa sessão\n   - CMD agente-to-agente gerado por mim nessa sessão\n   - ZIP gerado por ele (classificado como newentry zip)\n3. O objetivo é estruturar uma proposta usando /skill-creator para criar/melhorar/refinar skills\n4. Meta: integrar a suite usando progressive disclosure no full directory\n\nDeixa eu pensar sobre isso com cuidado antes de responder.\n\n**O que ele t\n\n","stderr":""}
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
Now I have everything I need. Let me build the full Empower V7 dashboard for Leo.
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

- Each option in a card. Use badges for key differentiators. A leading Tabler icon (`<i class="ti ti-NAME">` at 20px, `aria-hidden`) anchors each option visually — pick the most apt name per option.
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
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;"><i class="ti ti-mail" style="font-size:16px; vertical-align:-2px; margin-right:6px" aria-hidden="true"></i>Email</td><td style="text-align: right; padding: 4px 0; color: var(--color-text-info);">m.rodriguez@acme.com</td></tr>
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;"><i class="ti ti-phone" style="font-size:16px; vertical-align:-2px; margin-right:6px" aria-hidden="true"></i>Phone</td><td style="text-align: right; padding: 4px 0;">+1 (415) 555-0172</td></tr>
    </table>
  </div>
</div>
```


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

Content rendered and shown to the user. Please do not duplicate the shown content in text because it's already visually represented.
[This tool call rendered an interactive widget in the chat. The user can already see the result — do not repeat it in text or with another visualization tool.]
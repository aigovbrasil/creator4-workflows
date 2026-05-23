---
title: "Conteúdo do arquivo zip"
date: 2026-05-09
account: executar.leonardo@gmail.com
uuid: bfd15eda-ecec-41ee-814d-8513c8d909e9
messages: 12
tags: []
context: ""
---

**Você** _2026-05-09_

QUAL CONTEUDO do zip ?

---

**Claude** _2026-05-09_

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
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/batch_skill_builder_package.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-09 10:01   batch_skill_builder_package/\n    31028  2026-05-09 10:01   batch_skill_builder_package/skill_builder_batch.py\n     7955  2026-05-09 10:01   batch_skill_builder_package/README.md\n     2012  2026-05-09 10:01   batch_skill_builder_package/CLAUDE_CODE_MANUAL.md\n     2375  2026-05-09 10:01   batch_skill_builder_package/CLAUDE_AI_PROJECTS_MANUAL.md\n      312  2026-05-09 10:01   batch_skill_builder_package/example_raw_skill.md\n      664  2026-05-09 10:01   batch_skill_builder_package/COMMANDS.md\n        0  2026-05-09 10:01   batch_skill_builder_package/__pycache__/\n    43114  2026-05-09 10:01   batch_skill_builder_package/__pycache__/skill_builder_batch.cpython-313.pyc\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/docs/\n      888  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/docs/FRAMEWORK.md\n      744  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/docs/RISK_BOUNDARY.md\n      613  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/docs/VALIDATION.md\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/references/\n      471  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/references/sources.md\n      408  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/references/metrics.md\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/schemas/\n      740  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/schemas/output_schema.json\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/scripts/\n      632  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/scripts/main.py\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/examples/\n      336  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/examples/sample_input.md\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/tests/\n      686  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/tests/smoke_test.py\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/source/\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/source/original_files/\n      312  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/source/original_files/example_raw_skill.md\n     3151  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/SKILL.md\n     4329  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/README.md\n      806  2026-05-09 10:01   batch_skill_builder_package/demo_built/skills/skill-001-example-raw-skill/manifest.json\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/packages/\n     9577  2026-05-09 10:01   batch_skill_builder_package/demo_built/packages/skill-001-example-raw-skill.zip\n     9577  2026-05-09 10:01   batch_skill_builder_package/demo_built/packages/skill-001-example-raw-skill.skill\n        0  2026-05-09 10:01   batch_skill_builder_package/demo_built/reports/\n      475  2026-05-09 10:01   batch_skill_builder_package/demo_built/reports/00_BATCH_REPORT.csv\n      592  2026-05-09 10:01   batch_skill_builder_package/demo_built/reports/00_BATCH_REPORT.json\n      215  2026-05-09 10:01   batch_skill_builder_package/demo_built/reports/00_BATCH_INDEX.md\n---------                     -------\n   122012                     40 files\n","stderr":""}
{"returncode":0,"stdout":"# Batch Skill Builder\n\nScript para converter até 20 arquivos ou pastas em pacotes de skill padronizados com `SKILL.md`, README, manifest, documentação, schema, exemplos, testes, ZIP e `.skill`.\n\n## Resumo executivo\n\nO `skill_builder_batch.py` automatiza o processo de transformar arquivos brutos em skills reutilizáveis. Para cada entrada, ele cria uma pasta normalizada, preserva os arquivos originais, gera documentação com framework operacional, valida a estrutura e entrega um ZIP individual por skill.\n\n## 5W2H\n\n| Elemento | Resposta |\n|---|---|\n| What / O quê | Script Python para gerar pacotes de skill em lote. |\n| Why / Por quê | Reduzir trabalho manual e padronizar documentação. |\n| Who / Quem | Leonardo, pesquisadores, solo builders, equipes de IA e operadores de workflow. |\n| Where / Onde | Terminal, Claude Code, GitHub repo, Claude.ai Projects ou workspace local. |\n| When / Quando | Ao receber vários ZIPs, scripts, notas, webarchives, planilhas ou pastas para virar skills. |\n| How / Como | Detecta entradas, preserva fonte, gera `SKILL.md`, README, docs, schema, testes e pacotes. |\n| How much / Quanto | Sem dependências externas obrigatórias; custo operacional baixo. |\n\n## ICP\n\n| Campo | Definição |\n|---|---|\n| Usuário ideal | Quem cria muitas skills, playbooks, prompts, dashboards ou workflows internos. |\n| Dor central | Padronizar manualmente cada skill consome tempo e gera inconsistência. |\n| Desejo | 1 comando → até 20 skills prontas para revisão, GitHub ou Claude.ai Projects. |\n| Não ideal | Quem só precisa converter um único texto simples sem reuso futuro. |\n\n## 3 exemplos de aplicabilidade\n\n| Exemplo | Aplicação | Resultado |\n|---|---|---|\n| Biblioteca de skills pessoais | Converter 20 métodos próprios em pacotes versionáveis. | ZIP por skill + relatório batch. |\n| Projetos Claude.ai | Preparar skills com README e fontes para subir em Project Knowledge. | Projeto mais consistente e consultável. |\n| Repo GitHub | Gerar estrutura repetível para publicar skills/documentação. | Estrutura limpa, auditável e validável. |\n\n## Estrutura de saída\n\n```text\nbuilt_skills/\n├── packages/\n│   ├── skill-001-name.zip\n│   ├── skill-001-name.skill\n│   └── ...\n├── reports/\n│   ├── 00_BATCH_REPORT.csv\n│   ├── 00_BATCH_REPORT.json\n│   └── 00_BATCH_INDEX.md\n└── skills/\n    └── skill-001-name/\n        ├── SKILL.md\n        ├── README.md\n        ├── manifest.json\n        ├── docs/\n        ├── references/\n        ├── schemas/\n        ├── scripts/\n        ├── examples/\n        ├── tests/\n        └── source/original_files/\n```\n\n## Instalação local\n\nRequisito: Python 3.10+.\n\n```bash\npython --version\n```\n\nNão há dependências externas obrigatórias.\n\n## Comandos essenciais\n\n### Rodar com uma pasta de entrada\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --output ./built_skills \\\n  --overwrite\n```\n\n### Rodar com arquivos específicos\n\n```bash\npython skill_builder_batch.py \\\n  --input ADHD.zip empower.skill notes.md \\\n  --output ./built_skills \\\n  --overwrite\n```\n\n### Gerar apenas ZIP, sem `.skill`\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --output ./built_skills \\\n  --no-skill \\\n  --overwrite\n```\n\n### Testar inputs antes de gerar\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --dry-run\n```\n\n### Limitar a 5 skills\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --limit 5 \\\n  --output ./built_skills \\\n  --overwrite\n```\n\n## Uso com Claude Code\n\nClaude Code é adequado para este script porque trabalha diretamente no codebase pelo terminal, IDE, web ou Slack, e pode editar arquivos e rodar comandos com aprovação do usuário.\n\n### Setup sugerido\n\n```bash\nmkdir batch-skill-builder\ncd batch-skill-builder\ncp /caminho/skill_builder_batch.py .\nmkdir raw_skills built_skills\n```\n\n### Instalar Claude Code\n\nmacOS/Linux:\n\n```bash\ncurl -fsSL https://claude.ai/install.sh | bash\n```\n\nWindows PowerShell:\n\n```powershell\nirm https://claude.ai/install.ps1 | iex\n```\n\n### Abrir Claude Code no repo\n\n```bash\nclaude\n```\n\n### Prompt para Claude Code\n\n```text\nVocê está em um repo com o script skill_builder_batch.py.\nTarefa:\n1. Revisar o script sem remover o contrato de saída.\n2. Criar ou revisar testes mínimos.\n3. Rodar dry-run em ./raw_skills.\n4. Rodar build real em ./built_skills.\n5. Conferir se cada entrada gerou 1 ZIP por skill e 1 .skill por skill.\n6. Não alterar arquivos originais dentro de raw_skills.\nContrato obrigatório: cada skill deve conter SKILL.md, README.md, manifest.json, docs/, references/, schemas/, scripts/, examples/, tests/ e source/original_files/.\n```\n\n### Comandos que Claude Code deve rodar\n\n```bash\npython skill_builder_batch.py --input ./raw_skills --dry-run\npython skill_builder_batch.py --input ./raw_skills --output ./built_skills --overwrite\npython built_skills/skills/skill-001-*/tests/smoke_test.py\nls -la built_skills/packages\ncat built_skills/reports/00_BATCH_INDEX.md\n```\n\n## Uso com Claude.ai Projects\n\nProjects funcionam como workspaces com histórico próprio e knowledge base. O fluxo recomendado é subir o script, este README, exemplos e os ZIPs brutos no Project Knowledge, depois usar instruções fixas do projeto para manter o contrato de saída.\n\n### Criar Project\n\n1. Criar um Project chamado `Batch Skill Builder`.\n2. Em Project Knowledge, subir:\n   - `skill_builder_batch.py`\n   - `README.md`\n   - arquivos brutos que serão convertidos ou uma lista dos nomes\n   - exemplos de skills já aprovadas, se houver\n3. Em Project Instructions, colar o bloco abaixo.\n\n### Project Instructions sugeridas\n\n```text\nVocê é o operador do Batch Skill Builder.\nObjetivo: ajudar a converter até 20 arquivos/pastas em skills padronizadas.\nContrato obrigatório por skill:\n- SKILL.md\n- README.md\n- manifest.json\n- docs/FRAMEWORK.md\n- docs/RISK_BOUNDARY.md\n- docs/VALIDATION.md\n- references/sources.md\n- references/metrics.md\n- schemas/output_schema.json\n- scripts/main.py\n- examples/sample_input.md\n- tests/smoke_test.py\n- source/original_files/\n\nFramework obrigatório no README:\n- Resumo Executivo\n- 5W2H\n- ICP\n- 3 exemplos distintos de aplicabilidade\n- Entradas\n- Saídas\n- Riscos\n- Mitigações\n- Validação\n- Próximos passos\n\nRegras:\n- 1 ZIP por skill.\n- 1 .skill por skill quando solicitado.\n- Não inventar fatos faltantes; usar TBD.\n- Preservar fonte original.\n- Marcar domínios sensíveis em RISK_BOUNDARY.md.\n- Gerar relatório batch com status, warnings, erros e caminhos.\n```\n\n### Prompt operacional em Claude.ai\n\n```text\nLeia o README e o script skill_builder_batch.py no Project Knowledge.\nQuero gerar skills em lote para os arquivos enviados.\nTarefa:\n1. Explique quais arquivos de entrada você detecta.\n2. Gere os comandos locais para eu rodar.\n3. Depois que eu subir o relatório batch, revise os erros/warnings.\n4. Para cada skill com erro, proponha correção objetiva sem mudar o contrato de saída.\n```\n\n## Validação manual\n\nDepois de rodar:\n\n```bash\nfind built_skills/packages -maxdepth 1 -type f \\( -name \"*.zip\" -o -name \"*.skill\" \\)\ncat built_skills/reports/00_BATCH_INDEX.md\n```\n\nPara testar uma skill específica:\n\n```bash\ncd built_skills/skills/skill-001-nome\npython tests/smoke_test.py\ncd -\n```\n\n## Riscos e mitigação\n\n| Risco | Mitigação |\n|---|---|\n| Nome/tema inferido errado | Revisar `README.md` e `SKILL.md` após build. |\n| Conteúdo sensível | Usar `docs/RISK_BOUNDARY.md`. |\n| Documentação genérica | Adicionar exemplos reais depois da primeira execução. |\n| Arquivo ZIP inválido | Verificar `00_BATCH_REPORT.csv/json`. |\n| Mais de 20 inputs | Rodar em lotes separados. |\n\n## Decisão operacional\n\nO batch nunca deve criar somente um ZIP gigante. O padrão correto é:\n\n```text\n1 input bruto → 1 pasta normalizada → 1 ZIP individual → 1 .skill opcional\n```\n---COMMANDS---\n# Command cheat sheet\n\n## Dry run\n\n```bash\npython skill_builder_batch.py --input ./raw_skills --dry-run\n```\n\n## Build all\n\n```bash\npython skill_builder_batch.py --input ./raw_skills --output ./built_skills --overwrite\n```\n\n## Build selected files\n\n```bash\npython skill_builder_batch.py --input file1.zip file2.skill notes.md --output ./built_skills --overwrite\n```\n\n## ZIP only\n\n```bash\npython skill_builder_batch.py --input ./raw_skills --output ./built_skills --no-skill --overwrite\n```\n\n## Read report\n\n```bash\ncat built_skills/reports/00_BATCH_INDEX.md\n```\n\n## Test first generated skill\n\n```bash\npython built_skills/skills/skill-001-*/tests/smoke_test.py\n```\n---CLAUDE_AI_MANUAL---\n# Manual — Claude.ai Projects\n\n## Objetivo\n\nUsar Claude.ai Projects como centro de instruções, revisão e operação do Batch Skill Builder.\n\n## Como montar o Project\n\n1. Criar Project: `Batch Skill Builder`.\n2. Subir no Project Knowledge:\n   - `skill_builder_batch.py`\n   - `README.md`\n   - `CLAUDE_CODE_MANUAL.md`\n   - `CLAUDE_AI_PROJECTS_MANUAL.md`\n   - exemplos de skills aprovadas, se existirem\n   - relatório `00_BATCH_INDEX.md` depois de rodar localmente\n3. Definir Project Instructions.\n\n## Project Instructions\n\n```text\nVocê é o operador de documentação e validação do Batch Skill Builder.\n\nObjetivo:\nAjudar Leonardo a converter até 20 arquivos/pastas em skills padronizadas.\n\nContrato de saída por skill:\n- SKILL.md\n- README.md\n- manifest.json\n- docs/FRAMEWORK.md\n- docs/RISK_BOUNDARY.md\n- docs/VALIDATION.md\n- references/sources.md\n- references/metrics.md\n- schemas/output_schema.json\n- scripts/main.py\n- examples/sample_input.md\n- tests/smoke_test.py\n- source/original_files/\n\nFramework obrigatório no README:\n- Resumo Executivo\n- 5W2H\n- ICP\n- 3 exemplos distintos de aplicabilidade\n- Entradas\n- Saídas\n- Riscos\n- Mitigações\n- Validação\n- Próximos passos\n\nRegras:\n- Responder em português.\n- Usar tabelas primeiro.\n- Não inventar fatos; usar TBD quando faltar informação.\n- Preservar a fonte original.\n- Alertar sobre domínios sensíveis.\n- Recomendar 1 ZIP por skill, nunca apenas um ZIP gigante.\n```\n\n## Prompt para usar no Project\n\n```text\nLeia o Batch Skill Builder no Project Knowledge.\nVou rodar localmente o script.\nGere os comandos necessários para:\n1. validar os inputs;\n2. gerar até 20 skills;\n3. conferir os pacotes;\n4. testar uma skill;\n5. revisar o relatório batch.\n```\n\n## Prompt após rodar o script\n\n```text\nAqui está o conteúdo de 00_BATCH_INDEX.md e/ou 00_BATCH_REPORT.csv.\nAnalise:\n1. quais skills deram OK;\n2. quais deram erro;\n3. quais warnings exigem revisão humana;\n4. quais READMEs precisam ser enriquecidos;\n5. qual ordem de correção recomenda.\n```\n\n## Operação correta\n\n| Fase | O que fazer no Claude.ai Projects |\n|---|---|\n| Antes do build | Revisar contrato, comandos e estrutura esperada |\n| Durante o build | Usar Claude para interpretar erros do terminal |\n| Depois do build | Subir relatório batch e pedir análise |\n| Revisão final | Subir ZIPs ou READMEs específicos para melhoria manual |\n---CLAUDE_CODE_MANUAL---\n# Manual — Claude Code\n\n## Objetivo\n\nUsar Claude Code para revisar, rodar e melhorar o `skill_builder_batch.py` dentro de um repo local.\n\n## Setup\n\n```bash\nmkdir batch-skill-builder\ncd batch-skill-builder\ncp /caminho/skill_builder_batch.py .\nmkdir raw_skills built_skills\n```\n\nColoque até 20 arquivos em `raw_skills/`.\n\n## Instalação do Claude Code\n\nmacOS/Linux:\n\n```bash\ncurl -fsSL https://claude.ai/install.sh | bash\n```\n\nWindows PowerShell:\n\n```powershell\nirm https://claude.ai/install.ps1 | iex\n```\n\n## Abrir no terminal\n\n```bash\nclaude\n```\n\n## Prompt principal para Claude Code\n\n```text\nRevise este repo como operador de build de skills.\nContrato fixo:\n- O script deve aceitar até 20 inputs.\n- Cada input deve gerar 1 diretório normalizado.\n- Cada diretório deve conter SKILL.md, README.md, manifest.json, docs/, references/, schemas/, scripts/, examples/, tests/ e source/original_files/.\n- Cada input deve gerar 1 ZIP individual.\n- Cada input deve gerar 1 .skill individual, salvo se --no-skill for usado.\n- O batch deve gerar relatório em reports/.\n\nExecute:\n1. python skill_builder_batch.py --input ./raw_skills --dry-run\n2. python skill_builder_batch.py --input ./raw_skills --output ./built_skills --overwrite\n3. rode pelo menos um smoke_test.py gerado\n4. leia reports/00_BATCH_INDEX.md\n5. reporte erros, warnings e correções propostas\n```\n\n## Comandos úteis\n\n```bash\npython skill_builder_batch.py --input ./raw_skills --dry-run\npython skill_builder_batch.py --input ./raw_skills --output ./built_skills --overwrite\npython skill_builder_batch.py --input ./raw_skills --output ./built_skills --no-skill --overwrite\nls -la built_skills/packages\ncat built_skills/reports/00_BATCH_INDEX.md\n```\n\n## Critério de aceite\n\n| Item | Aceite |\n|---|---|\n| ZIP por skill | Sim |\n| `.skill` por skill | Sim, exceto `--no-skill` |\n| Fonte preservada | `source/original_files/` existe |\n| README completo | Resumo Executivo + 5W2H + ICP + 3 exemplos |\n| Teste | `python tests/smoke_test.py` retorna OK |\n","stderr":""}
Aqui está o inventário completo do zip:

---

## `batch_skill_builder_package.zip` — Inventário

**40 arquivos · ~122KB descompactado**

### Arquivos raiz (o kit principal)

| Arquivo | Tamanho | O que é |
|---|---|---|
| `skill_builder_batch.py` | 31KB | Script Python principal — converte até 20 arquivos/pastas em skills padronizadas |
| `README.md` | 7.9KB | Documentação completa com 5W2H, ICP, exemplos, comandos e riscos |
| `COMMANDS.md` | 664B | Cheat sheet de comandos (dry-run, build, test, report) |
| `CLAUDE_CODE_MANUAL.md` | 2KB | Como usar o script com Claude Code (terminal/repo local) |
| `CLAUDE_AI_PROJECTS_MANUAL.md` | 2.4KB | Como montar um Claude.ai Project com o kit |
| `example_raw_skill.md` | 312B | Exemplo mínimo de skill bruta para testar |

### Demo pré-gerada (`demo_built/`)

Mostra o que o script produz para 1 skill. Estrutura completa:

```
demo_built/
├── packages/
│   ├── skill-001-example-raw-skill.zip    (9.5KB)
│   └── skill-001-example-raw-skill.skill  (9.5KB)
├── reports/
│   ├── 00_BATCH_REPORT.csv
│   ├── 00_BATCH_REPORT.json
│   └── 00_BATCH_INDEX.md
└── skills/skill-001-example-raw-skill/
    ├── SKILL.md · README.md · manifest.json
    ├── docs/ (FRAMEWORK.md, RISK_BOUNDARY.md, VALIDATION.md)
    ├── references/ (sources.md, metrics.md)
    ├── schemas/ (output_schema.json)
    ├── scripts/ (main.py)
    ├── examples/ (sample_input.md)
    ├── tests/ (smoke_test.py)
    └── source/original_files/
```

---

### O que o kit faz (em uma linha)

**1 arquivo bruto → 1 pasta normalizada → 1 ZIP + 1 `.skill`** — com SKILL.md, README (5W2H + ICP), manifest, docs, schema, testes e relatório batch.

### Como usar agora

```bash
python skill_builder_batch.py \
  --input ./raw_skills \
  --output ./built_skills \
  --overwrite
```

Quer que eu rode o script aqui no ambiente com algum arquivo de entrada, ou prefere revisar o código primeiro?

---

**Você** _2026-05-09_

Run the scripty - First full sacan mece top down them cameback with index

---

**Claude** _2026-05-09_

{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/Arquivo.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-08 17:29   00_CMD_ORCH/\n     2202  2026-05-05 20:42   00_CMD_ORCH/02_MECE_EXTRACTION_COMPACT.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._02_MECE_EXTRACTION_COMPACT.json\n     8848  2026-05-02 15:40   00_CMD_ORCH/uncertainty-blueprints.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._uncertainty-blueprints.md\n     2971  2026-04-27 12:28   00_CMD_ORCH/forge-brand.md\n      224  2026-04-27 12:28   __MACOSX/00_CMD_ORCH/._forge-brand.md\n     9062  2026-05-02 15:40   00_CMD_ORCH/canvas-bridge.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._canvas-bridge.md\n    13571  2026-04-27 12:28   00_CMD_ORCH/svg-document-engine.md\n      224  2026-04-27 12:28   __MACOSX/00_CMD_ORCH/._svg-document-engine.md\n     1105  2026-05-05 20:42   00_CMD_ORCH/04_QUALITY_GATES.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._04_QUALITY_GATES.json\n     8781  2026-05-02 15:40   00_CMD_ORCH/canonical-engine.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._canonical-engine.md\n    12242  2026-04-27 12:28   00_CMD_ORCH/visual-modes.md\n      224  2026-04-27 12:28   __MACOSX/00_CMD_ORCH/._visual-modes.md\n    15701  2026-05-02 15:40   00_CMD_ORCH/SKILL.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._SKILL.md\n    18436  2026-04-27 12:28   00_CMD_ORCH/SKILL 2.md\n      224  2026-04-27 12:28   __MACOSX/00_CMD_ORCH/._SKILL 2.md\n        0  2026-05-05 17:46   00_CMD_ORCH/source/\n    11813  2026-05-02 15:40   00_CMD_ORCH/canonical-mapping.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._canonical-mapping.md\n     2153  2026-05-02 15:40   00_CMD_ORCH/evals.json\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._evals.json\n   327961  2026-05-02 15:40   00_CMD_ORCH/xray-workbook.html\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._xray-workbook.html\n     1018  2026-05-05 20:42   00_CMD_ORCH/SHA256SUMS.txt\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._SHA256SUMS.txt\n     5368  2026-05-02 15:40   00_CMD_ORCH/REFACTOR-REPORT-v3.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._REFACTOR-REPORT-v3.md\n    14438  2026-04-27 12:28   00_CMD_ORCH/master-prompt.md\n      224  2026-04-27 12:28   __MACOSX/00_CMD_ORCH/._master-prompt.md\n     2022  2026-05-05 20:42   00_CMD_ORCH/03_EXPECTED_OUTPUT_TREE.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._03_EXPECTED_OUTPUT_TREE.json\n    10928  2026-05-02 15:40   00_CMD_ORCH/commercial-disclosures.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._commercial-disclosures.md\n        0  2026-05-08 17:25   00_CMD_ORCH/mnt/\n     1932  2026-05-05 20:42   00_CMD_ORCH/00_SKILL_CREATOR_COMMAND.md\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._00_SKILL_CREATOR_COMMAND.md\n     2270  2026-05-05 20:42   00_CMD_ORCH/README.md\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._README.md\n     5956  2026-05-05 20:42   00_CMD_ORCH/05_ROUTER_AND_WORKFLOWS.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._05_ROUTER_AND_WORKFLOWS.json\n      843  2026-05-05 20:42   00_CMD_ORCH/manifest.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._manifest.json\n    11486  2026-05-02 15:40   00_CMD_ORCH/method-d0-handover.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._method-d0-handover.md\n    19606  2026-05-05 20:42   00_CMD_ORCH/01_SKILL_CREATOR_FULL_SPEC.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._01_SKILL_CREATOR_FULL_SPEC.json\n     2552  2026-05-05 20:42   00_CMD_ORCH/06_LINEAR_MCP_POLICY.json\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/._06_LINEAR_MCP_POLICY.json\n     4691  2026-05-02 15:40   00_CMD_ORCH/product-knowledge-gate.md\n      224  2026-05-02 15:40   __MACOSX/00_CMD_ORCH/._product-knowledge-gate.md\n    14608  2026-05-05 20:42   00_CMD_ORCH/source/ADHD_excerpt_first_220_lines.txt\n      207  2026-05-05 20:42   __MACOSX/00_CMD_ORCH/source/._ADHD_excerpt_first_220_lines.txt\n===\nArchive:  /mnt/user-data/uploads/files.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-09 12:42   files/\n    39525  2026-05-09 15:41   files/publication-complete.zip\n      207  2026-05-09 15:41   __MACOSX/files/._publication-complete.zip\n        0  2026-05-07 08:15   files/publication-package/\n    31147  2026-05-09 15:41   files/cmd-v3-orchestrator.zip\n      207  2026-05-09 15:41   __MACOSX/files/._cmd-v3-orchestrator.zip\n        0  2026-05-07 08:15   files/publication-package/PT/\n        0  2026-05-07 08:13   files/publication-package/{EN,PT,obsidian-publish,assets}/\n        0  2026-05-07 08:15   files/publication-package/EN/\n        0  2026-05-07 08:15   files/publication-package/skill-package/\n    17894  2026-05-07 08:15   files/publication-package/EN/tutorial-full.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/EN/._tutorial-full.md\n    23802  2026-05-07 08:15   files/publication-package/skill-package/SKILL.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/skill-package/._SKILL.md\n        0  2026-05-07 08:15   files/publication-package/skill-package/{examples,architecture,assets,tests}/\n        0  2026-05-07 08:15   files/publication-package/skill-package/tests/\n        0  2026-05-07 08:15   files/publication-package/skill-package/architecture/\n     4608  2026-05-07 08:15   files/publication-package/skill-package/README.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/skill-package/._README.md\n        0  2026-05-07 08:15   files/publication-package/skill-package/examples/\n        0  2026-05-07 08:15   files/publication-package/skill-package/assets/\n     7056  2026-05-07 08:15   files/publication-package/skill-package/tests/trigger-scenarios.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/skill-package/tests/._trigger-scenarios.md\n    14602  2026-05-07 08:15   files/publication-package/skill-package/architecture/system-overview.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/skill-package/architecture/._system-overview.md\n    23890  2026-05-07 08:15   files/publication-package/skill-package/examples/use-cases.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/skill-package/examples/._use-cases.md\n     6907  2026-05-07 08:15   files/publication-package/skill-package/assets/mermaid-diagrams.md\n      224  2026-05-07 08:15   __MACOSX/files/publication-package/skill-package/assets/._mermaid-diagrams.md\n---------                     -------\n   171413                     29 files\n","stderr":""}
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/files.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-09 12:42   files/\n    39525  2026-05-09 15:41   files/publication-complete.zip\n        0  2026-05-07 08:15   files/publication-package/\n    31147  2026-05-09 15:41   files/cmd-v3-orchestrator.zip\n        0  2026-05-07 08:15   files/publication-package/PT/\n        0  2026-05-07 08:13   files/publication-package/{EN,PT,obsidian-publish,assets}/\n        0  2026-05-07 08:15   files/publication-package/EN/\n        0  2026-05-07 08:15   files/publication-package/skill-package/\n    17894  2026-05-07 08:15   files/publication-package/EN/tutorial-full.md\n    23802  2026-05-07 08:15   files/publication-package/skill-package/SKILL.md\n        0  2026-05-07 08:15   files/publication-package/skill-package/{examples,architecture,assets,tests}/\n        0  2026-05-07 08:15   files/publication-package/skill-package/tests/\n        0  2026-05-07 08:15   files/publication-package/skill-package/architecture/\n     4608  2026-05-07 08:15   files/publication-package/skill-package/README.md\n        0  2026-05-07 08:15   files/publication-package/skill-package/examples/\n        0  2026-05-07 08:15   files/publication-package/skill-package/assets/\n     7056  2026-05-07 08:15   files/publication-package/skill-package/tests/trigger-scenarios.md\n    14602  2026-05-07 08:15   files/publication-package/skill-package/architecture/system-overview.md\n    23890  2026-05-07 08:15   files/publication-package/skill-package/examples/use-cases.md\n     6907  2026-05-07 08:15   files/publication-package/skill-package/assets/mermaid-diagrams.md\n---------                     -------\n   171413                     29 files\n=== .skill files ===\n-rw-r--r-- 1 claude ubuntu 273K May  9 16:33 /mnt/user-data/uploads/adhd-desk-dashboard-skill.skill\n-rw-r--r-- 1 claude ubuntu 116K May  9 16:33 /mnt/user-data/uploads/empower-v4-ai-usage-evaluator-skill.skill\n","stderr":""}
{"returncode":0,"stdout":"=== DONE. Tree ===\nraw/Arquivo/00_CMD_ORCH/00_SKILL_CREATOR_COMMAND.md\nraw/Arquivo/00_CMD_ORCH/01_SKILL_CREATOR_FULL_SPEC.json\nraw/Arquivo/00_CMD_ORCH/02_MECE_EXTRACTION_COMPACT.json\nraw/Arquivo/00_CMD_ORCH/03_EXPECTED_OUTPUT_TREE.json\nraw/Arquivo/00_CMD_ORCH/04_QUALITY_GATES.json\nraw/Arquivo/00_CMD_ORCH/05_ROUTER_AND_WORKFLOWS.json\nraw/Arquivo/00_CMD_ORCH/06_LINEAR_MCP_POLICY.json\nraw/Arquivo/00_CMD_ORCH/README.md\nraw/Arquivo/00_CMD_ORCH/REFACTOR-REPORT-v3.md\nraw/Arquivo/00_CMD_ORCH/SHA256SUMS.txt\nraw/Arquivo/00_CMD_ORCH/SKILL 2.md\nraw/Arquivo/00_CMD_ORCH/SKILL.md\nraw/Arquivo/00_CMD_ORCH/canonical-engine.md\nraw/Arquivo/00_CMD_ORCH/canonical-mapping.md\nraw/Arquivo/00_CMD_ORCH/canvas-bridge.md\nraw/Arquivo/00_CMD_ORCH/commercial-disclosures.md\nraw/Arquivo/00_CMD_ORCH/evals.json\nraw/Arquivo/00_CMD_ORCH/forge-brand.md\nraw/Arquivo/00_CMD_ORCH/manifest.json\nraw/Arquivo/00_CMD_ORCH/master-prompt.md\nraw/Arquivo/00_CMD_ORCH/method-d0-handover.md\nraw/Arquivo/00_CMD_ORCH/mnt/user-data/outputs/x-ray-abs-v3/SKILL.md\nraw/Arquivo/00_CMD_ORCH/mnt/user-data/outputs/x-ray-abs-v3/evals/evals.json\nraw/Arquivo/00_CMD_ORCH/product-knowledge-gate.md\nraw/Arquivo/00_CMD_ORCH/source/ADHD_excerpt_first_220_lines.txt\nraw/Arquivo/00_CMD_ORCH/source/ADHD_source_summary.md\nraw/Arquivo/00_CMD_ORCH/svg-document-engine.md\nraw/Arquivo/00_CMD_ORCH/uncertainty-blueprints.md\nraw/Arquivo/00_CMD_ORCH/visual-modes.md\nraw/Arquivo/00_CMD_ORCH/xray-workbook.html\nraw/Arquivo/01CMD-PPS.SKILL/CMD-01-PPS-skill.zip\nraw/Arquivo/01CMD-PPS.SKILL/READEME.txt\nraw/Arquivo/01CMD-PPS.SKILL/TODO_ZIP/CMD-01-PPS-skill/examples/usage-examples.md\nraw/Arquivo/02CMD-MIRP/CMD-02-MIRP-skill.zip\nraw/Arquivo/03CMD-MARO/CMD-03-MARO-skill.zip\nraw/Arquivo/XRAY-SUITE/X-RAY-SKILL-EXTRACTION-V2-COMPLETE 2.zip\nraw/Arquivo/XRAY-SUITE/xray-suite-v1.0.0.zip\nraw/Arquivo/xray-onboarding-ebook.html\nraw/adhd-skill/adhd-desk-dashboard-skill/README.md\nraw/adhd-skill/adhd-desk-dashboard-skill/SKILL.md\nraw/adhd-skill/adhd-desk-dashboard-skill/docs/5w2h-icp-examples.md\nraw/adhd-skill/adhd-desk-dashboard-skill/examples/data/ADHD.webarchive.txt\nraw/adhd-skill/adhd-desk-dashboard-skill/manifest.json\nraw/adhd-skill/adhd-desk-dashboard-skill/references/adhd-design-principles.md\nraw/adhd-skill/adhd-desk-dashboard-skill/references/sources-and-safety.md\nraw/adhd-skill/adhd-desk-dashboard-skill/references/workflow-protocol.md\nraw/adhd-skill/adhd-desk-dashboard-skill/schemas/dashboard_schema.json\nraw/adhd-skill/adhd-desk-dashboard-skill/scripts/adhd_dashboard_generator.py\nraw/adhd-skill/adhd-desk-dashboard-skill/source/ADHD.zip\nraw/adhd-skill/adhd-desk-dashboard-skill/source/adhd_extracted.txt\nraw/adhd-skill/adhd-desk-dashboard-skill/tests/test_package.py\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/README.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/SKILL.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/docs/output_contract.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/examples/data/epistemic_data_extraction.xlsx\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/examples/data/epistemic_data_extraction_8.xlsx\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/examples/data/xray_discovery_research.xlsx\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/manifest.json\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/references/metric_formulas.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/references/publishing_protocol.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/references/v2_compatibility.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/references/v3_compatibility.md\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/schemas/canonical_interaction_schema.json\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/scripts/build_epistemic.py\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/scripts/build_narrative_discovery.py\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/scripts/empower_v4_evaluator.py\nraw/empower-skill/empower-v4-ai-usage-evaluator-skill/tests/test_empower_smoke.py\nraw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/README.md\nraw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/SKILL.md\nraw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/architecture/system-overview.md\nraw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/assets/mermaid-diagrams.md\nraw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/examples/use-cases.md\nraw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/tests/trigger-scenarios.md\nraw/files/files/cmd-v3-orchestrator.zip\nraw/files/files/publication-complete.zip\nraw/files/files/publication-package/EN/tutorial-full.md\nraw/files/files/publication-package/skill-package/README.md\nraw/files/files/publication-package/skill-package/SKILL.md\nraw/files/files/publication-package/skill-package/architecture/system-overview.md\nraw/files/files/publication-package/skill-package/assets/mermaid-diagrams.md\nraw/files/files/publication-package/skill-package/examples/use-cases.md\nraw/files/files/publication-package/skill-package/tests/trigger-scenarios.md\nraw/files/publication-complete/publication-package/EN/tutorial-full.md\nraw/files/publication-complete/publication-package/skill-package/README.md\nraw/files/publication-complete/publication-package/skill-package/SKILL.md\nraw/files/publication-complete/publication-package/skill-package/architecture/system-overview.md\nraw/files/publication-complete/publication-package/skill-package/assets/mermaid-diagrams.md\nraw/files/publication-complete/publication-package/skill-package/examples/use-cases.md\nraw/files/publication-complete/publication-package/skill-package/tests/trigger-scenarios.md\n","stderr":"caution: excluded filename not matched:  *.DS_Store\ncaution: excluded filename not matched:  *.DS_Store\n"}
{"returncode":0,"stdout":"===== SKILL: adhd-desk-dashboard =====\n# ADHD Desk Dashboard Skill\n\n## Purpose\nCreate low-cognitive-load operating dashboards for a solo knowledge worker with ADHD/TDAH and dyslexia constraints, using printable A4 landscape artifacts plus simple digital backlog structures.\n\nThe skill converts a messy operational request into a clean physical-digital workflow system: sprint dashboard, capacity table, daily workflows, research capture card, print checklist, and Linear backlog.\n\n## When to Use\nUse this skill when the user asks for:\n- ADHD/TDAH-friendly workflow design.\n- Printable dashboards, desk boards, paper operating systems, or A4 landscape templates.\n- Low-code workflow orchestration using Linear, Drive, Calendar/Agenda, Claude/ChatGPT, GitHub, and paper.\n- Daily execution systems with explicit Definition of Done.\n- Cognitive-load reduction for research, content, admin, and data-cleaning routines.\n\n## Inputs\nExpected inputs may include:\n- Raw command or workflow brief.\n- Current stack: Linear, Drive, Calendar, Claude/ChatGPT, GitHub, social channels, paper.\n- Target routines: DataClean, Content Creation, Ops Admin, Analytics, Review.\n- Accessibility constraints: large text, minimal visual noise, high legibility, clear labels, printable format.\n- Delivery format: PPTX, PDF, Markdown checklist, Linear issue plan.\n\n## Outputs\nThe standard output bundle is:\n1. `leonardo-desk-dashboard.pptx` — A4 landscape dashboard deck.\n2. `leonardo-desk-dashboard.pdf` — print-ready PDF.\n3. `checklist-impressao.md` — print and desk setup checklist.\n4. `linear-issues-dashboard.md` — Linear project, labels, recurring issues, and views.\n5. `README.md` — usage documentation.\n\n===== SKILL: empower-v4 =====\n---\nname: empower-v4-ai-usage-evaluator\ndescription: Evaluate, normalize, compare, and improve AI/Claude usage patterns across accounts, conversations, exports, prompts, and research datasets using the Empower V4 framework. Use when the user asks to run Empower, analyze Claude/AI conversations, compare accounts, calculate maturity scores, detect prompt risk patterns, normalize epistemic/narrative extraction data, generate usage quality reports, build quality-label queues, or produce publishable Medium/GitHub-style analysis from interaction datasets. Do not use for one-off prompt rewriting, generic Claude questions, or advice without historical interaction data.\n---\n\n# Empower V4 — AI Usage Evaluator\n\n## Purpose\n\nEmpower V4 is a local-first evaluation skill for AI usage intelligence. It converts messy conversation exports and research workbooks into normalized interaction datasets, computes structural maturity, compares accounts, detects weak prompt patterns, and produces report-ready evidence for workflow improvement or publication.\n\nThe skill is designed for **system-level evaluation**, not isolated prompt editing.\n\n## Activate When\n\nUse this skill when the user asks for any of the following:\n\n- Run Empower / Empower V4 / AI usage evaluator.\n- Analyze Claude, ChatGPT, or AI conversation exports.\n- Compare accounts, users, workflows, prompt styles, or interaction quality.\n- Calculate maturity score, quality lift, structural density, expansion ratio, risk clusters, or prompt upgrade candidates.\n- Normalize uploaded XLSX/CSV/JSON/JSONL/ZIP data into a canonical interaction schema.\n- Build epistemic extraction, narrative discovery, or x-ray research datasets.\n- Prepare GitHub, Medium, LinkedIn, or research-style reports from AI usage data.\n\nDo **not** use this skill for:\n\n- A single prompt rewrite without dataset analysis.\n- Generic prompt engineering advice.\n- General Claude/OpenAI product questions.\n\n===== SKILL: cmd-v3-orchestrator =====\n---\nname: cmd-v3-orchestrator\ndescription: \"Intelligent meta-orchestrator for Claude interactions combining Cynefin framework routing, quality gate validation, and specialized skill delegation. Triggers on: complex research requests, document creation workflows, analysis requiring quality bar control, multi-phase projects, or when user mentions 'CMD', 'orchestrator', 'quality gate', 'Diamond/Gold/Silver/Bronze', 'Cynefin routing', or needs interactive pre-flight validation before execution.\"\n---\n\n# CMD v3 Orchestrator\n\n**Version**: 3.0.0  \n**Compliance**: Anthropic 2026 Best Practices  \n**Architecture**: 5-Layer Hybrid System\n\n---\n\n## Overview\n\nCMD v3 is a meta-orchestration skill that sits between user requests and specialized execution skills. It uses Cynefin framework complexity assessment, interactive Q&A for scope definition, and quality gate enforcement to ensure optimal routing and delivery.\n\n**Core Philosophy**: \"Complexity at capability layer, simplicity at interface layer\"\n\n---\n\n## When to Use This Skill\n\n**Primary Triggers**:\n- User explicitly mentions \"CMD\", \"orchestrator\", \"quality gates\"\n- Request involves research + document creation + analysis (multi-phase)\n- User asks for quality bar control (Diamond/Gold/Silver/Bronze tier)\n- Ambiguous requests requiring scope clarification before execution\n- User needs interactive pre-flight validation\n\n\n===== SKILL: 00_CMD_ORCH/SKILL.md =====\n---\nname: x-ray-db\ndescription: >\n  Skill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\n  canônico\", \"transforma esse diagnóstico em yaml\", \"schema do x-ray\",\n  \"x-ray-db\", \"x-ray.db\", \"saída programática\", \"input para agentes\",\n  \"padroniza esse output\", \"yaml canônico\", ou handoff explícito de\n  x-ray-abs. TAMBÉM ATIVAR quando input misto (texto bruto + planilha)\n  precisa de estrutura comparável. Produz schema YAML com 12 blocos:\n  metadata, project, executive_context, areas[], artifacts[], frameworks[],\n  modules[], workflows[], pilot_cases[], risks[], roadmap, next_steps —\n  validável por agentes downstream (Linear, Notion, data-warehouse).\n\n  v2 ADICIONA — ativar Canonical Pipeline Mode quando input contém:\n  \"S00\"-\"S20\" · \"GATE-S00\"-\"GATE-S20\" · \"DQ-1\"-\"DQ-10\" · \"DEL-Sxx-NN\" ·\n  \"D5\"-\"D120\" · header \"[FASE: Sxx · GATE: GATE-Sxx]\". Preserva IDs\n  canônicos (DEL-Sxx-NN → art-Sxx-NN), preenche roadmap[].gate com\n  G0-G12 e populates executive_context.handover_status quando fase ≥ S18.\n\n  NÃO ATIVAR: diagnóstico estratégico (x-ray-abs), rendering visual\n  (canvas), config files de software.\n\ncompatibility: >\n  Standalone — não requer MCP. Consome output de x-ray-abs via copy-paste.\n  references/canonical-mapping.md ativo em Canonical Pipeline Mode.\n  Versao: 2.0.0 | Autor: X-RAY Skill Lab — Leonardo | 2026-04-30\n---\n\n# [x-ray.db] — Canonical YAML Normalization Agent v2.0.0\n\nVocê é um agente de normalização semântica. Sua função é transformar\nconteúdo não-estruturado de negócio em YAML canônico aderente ao schema\ndefinido neste arquivo. Sua saída é consumida por outros agentes —\nnunca por humanos diretamente.\n\nContrato operacional inegociável:\n- Texto = fonte factual primária. Tudo no YAML deve ser rastreável ao texto.\n- Planilha = referência estrutural. Usada para forma, não para conteúdo.\n- Desconhecido = `null`. Nunca inventar dado para preencher campo.\n\n===== SKILL: 00_CMD_ORCH/SKILL 2.md =====\n---\nname: visual-canvas-studio\ndescription: >\n  FORGE Visual Canvas Studio — a master artifact engine that renders any business content\n  through interchangeable visual design languages and component systems. Activate this skill\n  whenever the user wants to generate an interactive HTML artifact, SVG document, PDF-style\n  report, carousel, landing page, dashboard, or any visual business deliverable with\n  selectable styles. Triggers include: \"generate a canvas\", \"make an interactive artifact\",\n  \"create with Swiss style\", \"use McKinsey style\", \"SaaS premium layout\", \"interactive\n  business report\", \"visual canvas\", \"style selector\", \"theme switcher\", \"design system\",\n  \"build an artifact with style modes\", \"PDF-style document\", \"business lab\", or any\n  request combining a business artifact with a visual language preference. ALWAYS use this\n  skill when the user provides business content and asks for a styled, interactive, or\n  multi-format visual output — even if they don't use the words \"visual canvas\" explicitly.\n---\n\n# FORGE Visual Canvas Studio\n\n> One engine. Any content. Every design language.\n\n\n===== README: 00_CMD_ORCH =====\n# Skill Creator Input Package — `tdah-linear-workflow-os`\n\nEste ZIP é um pacote de entrada para o Claude `/skill-creator`.\nEle não é a skill final. Ele contém o contrato estruturado para gerar a skill final.\n\n## Objetivo\n\nCriar uma skill completa chamada `tdah-linear-workflow-os` para transformar caos operacional em workflows claros para clientes com TDAH/dislexia, usando:\n\n- Claude / Claude Skills\n- Linear como memória operacional\n- Google Drive como arquivo\n- Google Agenda como tempo\n- Papel A4 como interface cognitiva\n- MCP connectors opcionais, com política de segurança\n- Curso comercial baseado no workflow\n\n## Como usar\n\n1. Anexe este ZIP no Claude.\n2. Abra `00_SKILL_CREATOR_COMMAND.md`.\n3. Cole o comando no Claude com `/skill-creator`.\n4. Peça para o Claude gerar a pasta final `tdah-linear-workflow-os/`.\n5. Depois rode os scripts de validação gerados pela skill final.\n\n## Arquivos principais\n\n| Arquivo | Uso |\n|---|---|\n| `00_SKILL_CREATOR_COMMAND.md` | Comando único para colar no Claude. |\n| `01_SKILL_CREATOR_FULL_SPEC.json` | Especificação completa estruturada. |\n| `02_MECE_EXTRACTION_COMPACT.json` | Extração MECE compacta. |\n| `03_EXPECTED_OUTPUT_TREE.json` | Árvore final esperada da skill. |\n| `04_QUALITY_GATES.json` | DoD, validações e claims proibidos. |\n| `source/ADHD_source_summary.md` | Resumo do material ADHD/webarchive já reduzido. |\n\n## Contrato de geração\n\nA skill final precisa conter:\n\n- `SKILL.md` com frontmatter\n- Router modes\n- Linear taxonomy embutida\n- MCP policy opcional\n- Workflows canônicos\n- Templates de intake, sprint, dashboard, research card e curso\n- Scripts determinísticos sem API externa obrigatória\n- Testes\n- Guardrails legais\n- Disclaimer\n- Definition of Done\n\n## Ordem obrigatória para o agente\n\n1. MECE Scan\n2. Context Expansion\n3. Pre-Mortem\n4. Geração da árvore\n5. Geração dos arquivos\n6. Geração dos scripts\n7. Geração dos testes\n8. Validação contra DoD\n\n## Regra central\n\nUma sprint, um objetivo. Uma issue, um DoD. Uma próxima ação.\n\n## Disclaimer\n\nConteúdo independente. Este pacote não é afiliado, patrocinado ou endossado pela Anthropic, Claude ou Linear. O conteúdo é educacional e operacional, não médico, psicológico, jurídico ou financeiro.\n\n===== publication-package/skill-package/SKILL.md =====\n---\nname: cmd-v3-orchestrator\ndescription: \"Intelligent meta-orchestrator for Claude interactions combining Cynefin framework routing, quality gate validation, and specialized skill delegation. Triggers on: complex research requests, document creation workflows, analysis requiring quality bar control, multi-phase projects, or when user mentions 'CMD', 'orchestrator', 'quality gate', 'Diamond/Gold/Silver/Bronze', 'Cynefin routing', or needs interactive pre-flight validation before execution.\"\n---\n\n# CMD v3 Orchestrator\n\n**Version**: 3.0.0  \n**Compliance**: Anthropic 2026 Best Practices  \n**Architecture**: 5-Layer Hybrid System\n\n---\n\n## Overview\n\nCMD v3 is a meta-orchestration skill that sits between user requests and specialized execution skills. It uses Cynefin framework complexity assessment, interactive Q&A for scope definition, and quality gate enforcement to ensure optimal routing and delivery.\n\n**Core Philosophy**: \"Complexity at capability layer, simplicity at interface layer\"\n\n---\n\n## When to Use This Skill\n\n**Primary Triggers**:\n- User explicitly mentions \"CMD\", \"orchestrator\", \"quality gates\"\n- Request involves research + document creation + analysis (multi-phase)\n- User asks for quality bar control (Diamond/Gold/Silver/Bronze tier)\n- Ambiguous requests requiring scope clarification before execution\n- User needs interactive pre-flight validation\n\n","stderr":""}
{"returncode":0,"stdout":"===== 00_CMD_ORCH/manifest.json =====\n{\n  \"package_name\": \"tdah-linear-workflow-os_skill_creator_input\",\n  \"version\": \"1.0.0\",\n  \"created_at\": \"2026-05-05\",\n  \"purpose\": \"Input package for Claude /skill-creator to generate a full Claude Skill directory for ADHD/dislexia workflow operations with Linear taxonomy, optional MCP connector planning, and commercial course scaffolding.\",\n  \"language\": \"pt-BR\",\n  \"primary_files\": [\n    \"README.md\",\n    \"00_SKILL_CREATOR_COMMAND.md\",\n    \"01_SKILL_CREATOR_FULL_SPEC.json\",\n    \"02_MECE_EXTRACTION_COMPACT.json\",\n    \"03_EXPECTED_OUTPUT_TREE.json\",\n    \"04_QUALITY_GATES.json\",\n    \"source/ADHD_source_summary.md\"\n  ],\n  \"not_for_execution\": [\n    \"This zip is an input/specification package, not the generated skill itself.\",\n    \"The Skill Creator agent must generate the final tdah-linear-workflow-os/ directory from this spec.\"\n  ]\n}\n===== XRAY-SUITE contents =====\nArchive:  raw/Arquivo/XRAY-SUITE/xray-suite-v1.0.0.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-01 22:02   xray-suite-v1.0.0/\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-orchestrator/\n    10465  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-orchestrator/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-onboarding-ebook/\n     7173  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-onboarding-ebook/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-client-form/\n     6917  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-client-form/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-brand-layer/\n     5488  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-brand-layer/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-executive-office/\n     6913  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-executive-office/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-self-knowledge/\n     7188  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-self-knowledge/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-publish-register/\n     2583  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-publish-register/SKILL.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-skill-packager/\n     7322  2026-05-01 22:02   xray-suite-v1.0.0/skills/x-ray-skill-packager/SKILL.md\n     5545  2026-05-01 22:02   xray-suite-v1.0.0/INSTALL.md\n     3269  2026-05-01 22:02   xray-suite-v1.0.0/README.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/templates/\n     3908  2026-05-01 22:02   xray-suite-v1.0.0/templates/qa_checklist.template.md\n    46247  2026-05-01 22:02   xray-suite-v1.0.0/templates/xray-onboarding-ebook.html\n     6216  2026-05-01 22:02   xray-suite-v1.0.0/templates/skill-reader-test-matrix.md\n     4679  2026-05-01 22:02   xray-suite-v1.0.0/templates/consultant_config.template.yaml\n      404  2026-05-01 22:02   xray-suite-v1.0.0/CHANGELOG.md\n        0  2026-05-01 22:02   xray-suite-v1.0.0/docs/\n\n===== CMD-01-PPS README =====\n## ✅ CMD-01-PPS SKILL DELIVERED\n\n**Modified skill ready for installation** — Complete ID taxonomy with combinable triggers\n\n---\n\n## 📦 DELIVERABLES (4 FILES)\n\n| File | Purpose | Size |\n|------|---------|------|\n| **CMD-01-PPS-skill.zip** | Production-ready skill package | 15KB |\n| **CMD-01-PPS-DELIVERY.md** | Complete delivery summary | View above |\n| **SKILL.md** | Full specification with 5W2H | View above |\n| **trigger-table.md** | 300-word tabular quick ref | View above |\n\n---\n\n## 🎯 TABULAR TAXONOMY · Quick Reference\n\n### SINGLE TRIGGER COMMANDS\n\n| ID | Command | Actions | Time | Daily Use |\n|----|---------|---------|------|-----------|\n| **T01** | hands-off | A01→A20 full auto | 15s | Morning batch: process overnight files |\n| **T03** | normalize | A01+A03+A18 | 8s | **MOST COMMON** — fix naming chaos |\n| **T07** | X-Ray | A01→A14 X-Ray mode | 18s | Client deliverables with X-Ray structure |\n| **T10** | emergency | A01+A09+A14 | 12s | Pre-meeting rush, skip validation |\n\n### POWER COMBINATIONS (Where Skill Shines)\n\n| Combo | What It Does | Result | Frequency |\n|-------|-------------|--------|-----------|\n| **T03+T07+T12** | Normalize + X-Ray + Client branding | 5 client ZIPs in 30s | 10×/day |\n| **T01+T05+T15** | Hands-off + Multi-source + Portfolio | 30 projects → site in 45s | 1×/week |\n| **A03+A08+A11+A18** | Normalize + Metadata + Graph + Log | Legacy audit complete | 2×/month |\n| **A19+W01** | Backup first + Full auto | Zero-risk packaging | When scared |\n| **T05+T06+T13** | Multi-source + Dedupe + Bundle | Clean consolidated repo | 1×/sprint |\n\n### ACTION ATOMS (Build Your Own)\n\n| ID | Action | Combine With | Example Use |\n|----|--------|--------------|-------------|\n| **A01** | Scan directory | A02 (classify) | `\"A01+A02\"` = inventory check |\n| **A03** | Normalize naming | A18 (log) | `\"A03+A18\"` = traceable rename |\n| **A08** | Extract metadata | A01+A12 | `\"A01+A08+A12\"` = metadata pipeline |\n| **A11** | Dependency graph | A01+A08 | `\"A01+A08+A11\"` = full analysis |\n| **A19** | Backup original | ANY | `\"A19+[anything]\"` = safety mode |\n\n### EXECUTION BY CONTEXT (MECE)\n\n| Context | Command | Result |\n|---------|---------|--------|\n| **Unknown files arrived** | `\"A01+A02\"` | Scan + classify → inventory |\n| **Client wants NOW** | `\"T10\"` | Emergency 12s package |\n| **Weekly portfolio** | `\"T01+T05+T15\"` | Consolidate all → site |\n| **Legacy mess** | `\"A19+T11\"` | Backup + forensic analysis |\n| **Scared to break** | `\"A19+T02\"` | Backup + interactive control |\n\n---\n\n## 🌟 3 WOW TRIGGER COMBINATIONS\n\n### #1: T03+T07+T12 — \"Daily Client Deliverable Factory\"\n```\nScenario: Consultant processes 5 clients every morning\nTime: 30 seconds (vs 2 hours manual)\nROI: Visible from day 1\n```\n\n### #2: T01+T05+T15 — \"Portfolio Consolidation Engine\"\n```\nScenario: Freelancer consolidates 30 projects into 1 site\nTime: 45 seconds (vs 8-hour weekend project)\nROI: 99% time reduction\n```\n\n### #3: A03+A08+A11+A18 — \"Forensic Cleanup + Audit\"\n```\nScenario: Dev inherits legacy 120-file project\nTime: 1 minute to understand (vs 2 hours reverse engineering)\nROI: Instant comprehension\n```\n\n---\n\n## 🚀 QUICK START\n\n**Installation:**\n1. Download ZIP (above)\n2. Extract to skills folder\n3. Say `\"CMD-01-PPS\"` to activate\n\n**First Command:**\n```bash\n\"A01+A02\"  # Safe inventory check (no changes)\n```\n\n**Most Common Daily:**\n```bash\n\"T03+T07+T12\"  # Your production flow\n```\n\n**Emergency:**\n```bash\n\"T10\"  # 12-second package before meeting\n```\n\n**Safe Experimentation:**\n```bash\n\"A19+T02\"  # Backup + full control\n```\n\n---\n\n## 📊 WHAT CHANGED FROM project-packager\n\n✅ **Renamed:** project-packager → CMD-01-PPS  \n✅ **ID Taxonomy:** 20 Actions (A01-A20) + 15 Triggers (T01-T15) + 10 Workflows (W01-W10)  \n✅ **Combinable:** `ID+ID+ID` syntax for infinite custom workflows  \n✅ **Rastreability:** Every execution logged with timestamp + command  \n✅ **Daily UX:** Optimized for power users (memorize 3 combos, done)  \n✅ **Tabular Ref:** 294-word MECE quick reference (300 limit)  \n✅ **5W2H:** Complete problem tree + WOW triggers at top of spec  \n\n---\n\n**Your skill is ready. Start with `\"A01+A02\"` (safe inventory), then build your daily flow.**\n===== CMD-02-MIRP contents =====\nArchive:  raw/Arquivo/02CMD-MIRP/CMD-02-MIRP-skill.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-04 10:19   CMD-02-MIRP-skill/\n        0  2026-05-04 10:20   CMD-02-MIRP-skill/references/\n     5612  2026-05-04 10:20   CMD-02-MIRP-skill/references/notion-schema.md\n     5156  2026-05-04 10:19   CMD-02-MIRP-skill/references/trigger-table.md\n    19052  2026-05-04 10:18   CMD-02-MIRP-skill/SKILL.md\n     2941  2026-05-04 10:19   CMD-02-MIRP-skill/README.md\n        0  2026-05-04 10:18   CMD-02-MIRP-skill/scripts/\n        0  2026-05-04 10:18   CMD-02-MIRP-skill/examples/\n---------                     -------\n    32761                     8 files\n\n===== CMD-03-MARO contents =====\nArchive:  raw/Arquivo/03CMD-MARO/CMD-03-MARO-skill.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-04 10:57   CMD-03-MARO-skill/\n        0  2026-05-04 10:55   CMD-03-MARO-skill/references/\n     1711  2026-05-04 10:54   CMD-03-MARO-skill/references/sample-personas.md\n     8404  2026-05-04 10:55   CMD-03-MARO-skill/references/trigger-table.md\n        0  2026-05-04 10:54   CMD-03-MARO-skill/agents/\n     3743  2026-05-04 10:54   CMD-03-MARO-skill/agents/schema-scoring-agent.md\n     3078  2026-05-04 10:54   CMD-03-MARO-skill/agents/form-blueprint-agent.md\n     2837  2026-05-04 10:54   CMD-03-MARO-skill/agents/qa-consistency-agent.md\n     2076  2026-05-04 10:54   CMD-03-MARO-skill/agents/segmentation-researcher.md\n    20711  2026-05-04 10:54   CMD-03-MARO-skill/SKILL.md\n     5422  2026-05-04 10:56   CMD-03-MARO-skill/README.md\n        0  2026-05-04 10:57   CMD-03-MARO-skill/examples/\n     6986  2026-05-04 10:57   CMD-03-MARO-skill/examples/usage-examples.md\n---------                     -------\n    54968                     13 files\n\n===== publication-complete: tutorial-full.md head =====\n# Building CMD v3: Meta-Orchestration for Claude.ai\n\n**How to Design Intelligence Routers That Comply with Anthropic 2026 Best Practices**\n\n---\n\n## Abstract (TL;DR)\n\nThis case study documents the complete design process of CMD v3 Orchestrator, a meta-orchestration system for Claude.ai that combines Cynefin framework complexity assessment, interactive pre-flight validation, and quality gate enforcement.\n\n**Problem**: Original CMD v2 design conflicted with Anthropic 2026 guidelines by over-engineering validation layers, creating token waste and reducing user experience.\n\n**Solution**: Rebuilt as 5-layer hybrid system using interactive Q&A, adaptive routing, and skill delegation patterns.\n\n**Result**: Production-ready orchestrator achieving 80%+ auto-inference accuracy, <2sec Q&A display, and 95%+ quality gate pass rate.\n\n**Key Insight**: Simplicity at interface layer, complexity at capability layer—not the reverse.\n\n---\n\n\n===== empower manifest =====\n{\n  \"name\": \"empower-v4-ai-usage-evaluator\",\n  \"version\": \"4.1.0-skill-md-normalized\",\n  \"created_for\": \"Empower V4 AI usage evaluation\",\n  \"entrypoint\": \"SKILL.md\",\n  \"main_script\": \"scripts/empower_v4_evaluator.py\",\n  \"included_scripts\": [\n    \"scripts/empower_v4_evaluator.py\",\n    \"scripts/build_epistemic.py\",\n    \"scripts/build_narrative_discovery.py\"\n  ],\n  \"included_examples\": [\n    \"examples/data/epistemic_data_extraction.xlsx\",\n    \"examples/data/epistemic_data_extraction_8.xlsx\",\n    \"examples/data/xray_discovery_research.xlsx\"\n  ],\n  \"status\": \"Active\"\n}\n\n===== adhd manifest =====\n{\n  \"name\": \"adhd-desk-dashboard-skill\",\n  \"version\": \"1.0.0\",\n  \"title\": \"ADHD Desk Dashboard Skill\",\n  \"description\": \"Creates low-cognitive-load printable workflow dashboards and Linear backlog plans for ADHD/TDAH-friendly solo execution.\",\n  \"language\": \"pt-BR\",\n  \"status\": \"Active\",\n  \"tags\": [\"workflow\", \"adhd\", \"tdah\", \"accessibility\", \"execution\", \"dashboard\", \"linear\", \"paper-os\"],\n  \"entrypoint\": \"SKILL.md\",\n  \"non_clinical_boundary\": true\n}\n","stderr":""}
Good, almost full picture. One more check on the mystery zip.
{"returncode":0,"stdout":"","stderr":"unzip:  cannot find or open raw/Arquivo/XRAY-SUITE/X-RAY-SKILL-EXTRACTION-V2-COMPLETE 2.zip, raw/Arquivo/XRAY-SUITE/X-RAY-SKILL-EXTRACTION-V2-COMPLETE 2.zip.zip or raw/Arquivo/XRAY-SUITE/X-RAY-SKILL-EXTRACTION-V2-COMPLETE 2.zip.ZIP.\n"}
{"returncode":0,"stdout":"Archive:  /home/claude/scan/raw/Arquivo/XRAY-SUITE/X-RAY-SKILL-EXTRACTION-V2-COMPLETE 2.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n     7357  2026-05-04 09:20   RISK_MITIGATION.md\n   605628  2026-05-04 09:20   Extract-001-36.zip\n   177531  2026-05-04 09:20   Extract-001-36.xlsx\n     6618  2026-05-04 09:20   README.md\n     4098  2026-05-04 09:20   QUICK_START.md\n---------                     -------\n   801232                     5 files\n","stderr":"ls: cannot access 'raw/Arquivo/XRAY-SUITE/': No such file or directory\n"}
{"returncode":0,"stdout":"# X-RAY SKILL EXTRACTION V2 · COMPLETE PACKAGE\n\n**Build Date:** 2026-05-04  \n**Version:** Extract-001-36  \n**Skills Count:** 36  \n**Package Size:** ~3.5MB (ZIP + XLSX + Docs)\n\n---\n\n## 📦 PACKAGE CONTENTS\n\n```\nX-RAY-SKILL-EXTRACTION-V2-COMPLETE/\n├── README.md                      ← You are here\n├── QUICK_START.md                 ← 3-step usage guide\n├── RISK_MITIGATION.md             ← Failure modes + recovery\n├── Extract-001-36.zip             ← 36 skills with structure (602KB)\n└── Extract-001-36.xlsx            ← Dashboard + 36 skill tabs (~2.8MB)\n```\n\n---\n\n## 🎯 PURPOSE\n\nThis package enables **zero-configuration skill migration** between Claude accounts.\n\n**Use Cases:**\n1. Backup skills before account deletion\n2. Sync skills across personal + work accounts\n3. Share skill library with team members\n4. Archive skill versions for rollback\n5. Audit skill inventory across accounts\n\n---\n\n## ⚡ QUICK START (READ THIS FIRST)\n\n### You're in Account A (Source)\n✅ **You're done!** Download this entire package.\n\n### You're in Account B (Target)\n1. Upload `Extract-001-36.xlsx` to new Claude chat\n2. Open Tab 1 (🎯 DASHBOARD)\n3. Copy bash command from Column C\n4. Execute command\n5. Verify output: \"✅ Complete: XX total (YY new, ZZ preserved)\"\n\n**That's it.** Skills are now in Account B.\n\n---\n\n## 📖 DOCUMENTATION MAP\n\n### For Quick Migration\n→ Read: **QUICK_START.md** (5 min read)  \n→ Action: Follow 3-step process  \n→ Result: Skills migrated in <2 minutes\n\n### For Understanding Risks\n→ Read: **RISK_MITIGATION.md** (10 min read)  \n→ Review: 10 failure scenarios + mitigations  \n→ Result: Confidence in safety design\n\n### For Troubleshooting\n→ Check: QUICK_START.md § Troubleshooting  \n→ Then: RISK_MITIGATION.md § Recovery Procedures  \n→ Escalate: Review error logs from command output\n\n---\n\n## 🔄 WORKFLOW DIAGRAM\n\n```\nACCOUNT A (Source)\n├── Run EXTRACTION_CMD.sh\n├── Generate Extract-001-36.zip\n├── Generate Extract-001-36.xlsx\n└── Download package\n        ↓\n        ↓ (Upload to Account B)\n        ↓\nACCOUNT B (Target)\n├── Upload Extract-001-36.xlsx\n├── Execute command from Tab 1\n├── System detects paths automatically\n├── Non-destructive merge with existing skills\n├── Report: \"36 new, 0 preserved\" (example)\n└── Generate Extract-002-XX for next iteration\n```\n\n---\n\n## 📊 WHAT'S INSIDE\n\n### Extract-001-36.zip\n- 36 complete skill directories\n- Each with SKILL.md + references/ + scripts/ (if applicable)\n- Original structure preserved\n- Manifest with metadata\n- Standalone replication script\n\n### Extract-001-36.xlsx\n- **Tab 1:** Dashboard with executable command\n- **Tabs 2-37:** Individual skill content\n  - Full SKILL.md text\n  - Directory structure\n  - Metadata (references/scripts flags)\n- Formatted for A4 print-ready\n\n---\n\n## 🛡️ SAFETY FEATURES\n\n| Feature | Implementation | Result |\n|---------|---------------|---------|\n| Non-Destructive | `cp -rn` (no-clobber) | Never overwrites existing files |\n| Read-Only Safe | Uses /home/claude only | Works in restricted environments |\n| Fail-Fast | `set -e` in bash | Stops on first error |\n| Path-Agnostic | Auto-detection logic | Adapts to account variations |\n| Idempotent | Check-before-copy | Safe to re-run multiple times |\n| Explicit Logging | Count at every stage | Clear success/failure reporting |\n| Rollback-Safe | Copy, not move | Source always preserved |\n\n---\n\n## 🎓 ADVANCED SCENARIOS\n\n### Scenario 1: Merge with Existing Skills\n```\nAccount B already has 10 skills, Extract-001 has 36 skills (5 overlap)\n\nExpected Result:\n- 31 new skills imported\n- 10 existing skills preserved (not overwritten)\n- Total: 41 skills in Account B\n- Next extraction: Extract-002-41\n```\n\n### Scenario 2: Iterative Sync Across 5 Accounts\n```\nA → B: Extract-001-36 → Extract-002-36\nB → C: Extract-002-36 → Extract-003-36\nC → D: Extract-003-36 → Extract-004-36\nD → E: Extract-004-36 → Extract-005-36\nE → A: Extract-005-36 → Extract-006-36 (full circle)\n```\n\n### Scenario 3: Selective Import\n```bash\n# Extract only Bussola skills\nunzip Extract-001-36.zip \"Extract-001-36/skills-raw/bussola-*\"\n# Then run custom replication command targeting only those\n```\n\n---\n\n## 🔍 QUALITY ASSURANCE\n\nThis package was tested against:\n- ✅ Fresh account (0 existing skills)\n- ✅ Partial overlap (20/36 skills exist)\n- ✅ Complete overlap (36/36 skills exist)\n- ✅ Path variations (/mnt vs /home)\n- ✅ Read-only filesystem restrictions\n- ✅ Corrupted upload scenarios\n- ✅ Command execution failures\n- ✅ Count mismatch scenarios\n- ✅ Missing dependency directories\n- ✅ Incremental extraction tracking\n\n**Test Coverage:** 10/10 failure modes  \n**Success Rate:** 100% when prerequisites met  \n**Data Loss Risk:** 0% (non-destructive design)\n\n---\n\n## 📞 SUPPORT MATRIX\n\n| Issue | First Action | Documentation | Recovery Time |\n|-------|-------------|---------------|---------------|\n| \"Directory not found\" | Check file upload | QUICK_START § Troubleshooting | <1 min |\n| \"Permission denied\" | Verify /home/claude writable | RISK_MITIGATION § R02 | <2 min |\n| Count mismatch | Re-run with fresh extraction | RISK_MITIGATION § Recovery | <5 min |\n| Command fails | Check error output | RISK_MITIGATION § R06 | <3 min |\n| Nothing copied | Verify not already present | QUICK_START § Troubleshooting | <1 min |\n| XLSX corrupted | Re-download + re-upload | RISK_MITIGATION § R05 | <2 min |\n\n---\n\n## 📈 VERSION HISTORY\n\n**v1.0 (Extract-001-36) — 2026-05-04**\n- Initial release\n- 36 skills extracted\n- Full documentation suite\n- 10 risk scenarios mitigated\n- XLSX dashboard with executable commands\n- Non-destructive merge logic\n- Incremental tracking system\n\n---\n\n## 🎯 SUCCESS CRITERIA\n\nAfter using this package, you should have:\n- ✅ All 36 skills in target account\n- ✅ No data loss or overwrites\n- ✅ Clear count delta reporting\n- ✅ Next extraction ID for lineage tracking\n- ✅ Confidence in safety and reliability\n\n---\n\n## 📝 FEEDBACK\n\nThis is Extract-001-36 (v1.0). If you encounter:\n- Undocumented failure modes\n- Unclear error messages\n- Missing features\n- Documentation gaps\n\nDocument in RISK_MITIGATION.md § \"New Risks Discovered\" section for v2.\n\n---\n\n## 🚀 YOU'RE READY\n\n1. Read QUICK_START.md (5 minutes)\n2. Execute 3-step process (2 minutes)\n3. Verify success (30 seconds)\n\n**Total time to migrate 36 skills:** ~8 minutes\n\n---\n\n**License:** Proprietary use · X-RAY SUITE  \n**Author:** Leonardo Batista  \n**Support:** See RISK_MITIGATION.md for recovery procedures\n","stderr":""}
Scan completo. Agora o índice MECE top-down:
File created successfully: /mnt/user-data/outputs/SCAN_INDEX_V20260509.md
---

## Resultado do Scan — MECE Top-Down

**46 itens únicos identificados** em 6 layers. Resumo executivo:

**Layer 1 — Skills** (16 skills)
- **6 Tier A** — instaláveis agora: `adhd-desk-dashboard`, `empower-v4`, `cmd-v3-orchestrator`, `CMD-01-PPS`, `CMD-02-MIRP`, `CMD-03-MARO`
- **10 Tier B** — dentro de suites, precisam extração: `x-ray-db`, `visual-canvas-studio` (FORGE), + 8 skills do `xray-suite-v1.0.0`

**Layer 2 — Suites** (4 bundles)
- Destaque: `Extract-001-36` — pacote de migração com **36 skills exportadas** + XLSX dashboard

**Layer 3 — Spec Package** (1 item crítico)
- `tdah-linear-workflow-os` — spec estruturada em 6 JSONs esperando `/skill-creator` para gerar a skill final

**Layer 4-6** — 25 docs de suporte, templates, datasets e artifacts

---

**3 next actions prioritárias:**
1. Rodar `/skill-creator` com o SP-01 (tdah-linear-workflow-os já tem tudo pronto)
2. Decidir conta-alvo para migrar as 36 skills do `Extract-001-36`
3. Instalar os 8 skills da xray-suite no Project Knowledge correto

Quer que eu rode o `skill_builder_batch.py` agora com algum subset específico, ou parte direto para alguma das ações do mapa?

---

**Você** _2026-05-09_

from this read me proudce the v2 increeased: stleley `README.md`7.9KBDocumentação completa com 5W2H, ICP, exemplos, comandos e riscos produxze sacan index expanded

---

**Claude** _2026-05-09_

{"returncode":0,"stdout":"# Batch Skill Builder\n\nScript para converter até 20 arquivos ou pastas em pacotes de skill padronizados com `SKILL.md`, README, manifest, documentação, schema, exemplos, testes, ZIP e `.skill`.\n\n## Resumo executivo\n\nO `skill_builder_batch.py` automatiza o processo de transformar arquivos brutos em skills reutilizáveis. Para cada entrada, ele cria uma pasta normalizada, preserva os arquivos originais, gera documentação com framework operacional, valida a estrutura e entrega um ZIP individual por skill.\n\n## 5W2H\n\n| Elemento | Resposta |\n|---|---|\n| What / O quê | Script Python para gerar pacotes de skill em lote. |\n| Why / Por quê | Reduzir trabalho manual e padronizar documentação. |\n| Who / Quem | Leonardo, pesquisadores, solo builders, equipes de IA e operadores de workflow. |\n| Where / Onde | Terminal, Claude Code, GitHub repo, Claude.ai Projects ou workspace local. |\n| When / Quando | Ao receber vários ZIPs, scripts, notas, webarchives, planilhas ou pastas para virar skills. |\n| How / Como | Detecta entradas, preserva fonte, gera `SKILL.md`, README, docs, schema, testes e pacotes. |\n| How much / Quanto | Sem dependências externas obrigatórias; custo operacional baixo. |\n\n## ICP\n\n| Campo | Definição |\n|---|---|\n| Usuário ideal | Quem cria muitas skills, playbooks, prompts, dashboards ou workflows internos. |\n| Dor central | Padronizar manualmente cada skill consome tempo e gera inconsistência. |\n| Desejo | 1 comando → até 20 skills prontas para revisão, GitHub ou Claude.ai Projects. |\n| Não ideal | Quem só precisa converter um único texto simples sem reuso futuro. |\n\n## 3 exemplos de aplicabilidade\n\n| Exemplo | Aplicação | Resultado |\n|---|---|---|\n| Biblioteca de skills pessoais | Converter 20 métodos próprios em pacotes versionáveis. | ZIP por skill + relatório batch. |\n| Projetos Claude.ai | Preparar skills com README e fontes para subir em Project Knowledge. | Projeto mais consistente e consultável. |\n| Repo GitHub | Gerar estrutura repetível para publicar skills/documentação. | Estrutura limpa, auditável e validável. |\n\n## Estrutura de saída\n\n```text\nbuilt_skills/\n├── packages/\n│   ├── skill-001-name.zip\n│   ├── skill-001-name.skill\n│   └── ...\n├── reports/\n│   ├── 00_BATCH_REPORT.csv\n│   ├── 00_BATCH_REPORT.json\n│   └── 00_BATCH_INDEX.md\n└── skills/\n    └── skill-001-name/\n        ├── SKILL.md\n        ├── README.md\n        ├── manifest.json\n        ├── docs/\n        ├── references/\n        ├── schemas/\n        ├── scripts/\n        ├── examples/\n        ├── tests/\n        └── source/original_files/\n```\n\n## Instalação local\n\nRequisito: Python 3.10+.\n\n```bash\npython --version\n```\n\nNão há dependências externas obrigatórias.\n\n## Comandos essenciais\n\n### Rodar com uma pasta de entrada\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --output ./built_skills \\\n  --overwrite\n```\n\n### Rodar com arquivos específicos\n\n```bash\npython skill_builder_batch.py \\\n  --input ADHD.zip empower.skill notes.md \\\n  --output ./built_skills \\\n  --overwrite\n```\n\n### Gerar apenas ZIP, sem `.skill`\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --output ./built_skills \\\n  --no-skill \\\n  --overwrite\n```\n\n### Testar inputs antes de gerar\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --dry-run\n```\n\n### Limitar a 5 skills\n\n```bash\npython skill_builder_batch.py \\\n  --input ./raw_skills \\\n  --limit 5 \\\n  --output ./built_skills \\\n  --overwrite\n```\n\n## Uso com Claude Code\n\nClaude Code é adequado para este script porque trabalha diretamente no codebase pelo terminal, IDE, web ou Slack, e pode editar arquivos e rodar comandos com aprovação do usuário.\n\n### Setup sugerido\n\n```bash\nmkdir batch-skill-builder\ncd batch-skill-builder\ncp /caminho/skill_builder_batch.py .\nmkdir raw_skills built_skills\n```\n\n### Instalar Claude Code\n\nmacOS/Linux:\n\n```bash\ncurl -fsSL https://claude.ai/install.sh | bash\n```\n\nWindows PowerShell:\n\n```powershell\nirm https://claude.ai/install.ps1 | iex\n```\n\n### Abrir Claude Code no repo\n\n```bash\nclaude\n```\n\n### Prompt para Claude Code\n\n```text\nVocê está em um repo com o script skill_builder_batch.py.\nTarefa:\n1. Revisar o script sem remover o contrato de saída.\n2. Criar ou revisar testes mínimos.\n3. Rodar dry-run em ./raw_skills.\n4. Rodar build real em ./built_skills.\n5. Conferir se cada entrada gerou 1 ZIP por skill e 1 .skill por skill.\n6. Não alterar arquivos originais dentro de raw_skills.\nContrato obrigatório: cada skill deve conter SKILL.md, README.md, manifest.json, docs/, references/, schemas/, scripts/, examples/, tests/ e source/original_files/.\n```\n\n### Comandos que Claude Code deve rodar\n\n```bash\npython skill_builder_batch.py --input ./raw_skills --dry-run\npython skill_builder_batch.py --input ./raw_skills --output ./built_skills --overwrite\npython built_skills/skills/skill-001-*/tests/smoke_test.py\nls -la built_skills/packages\ncat built_skills/reports/00_BATCH_INDEX.md\n```\n\n## Uso com Claude.ai Projects\n\nProjects funcionam como workspaces com histórico próprio e knowledge base. O fluxo recomendado é subir o script, este README, exemplos e os ZIPs brutos no Project Knowledge, depois usar instruções fixas do projeto para manter o contrato de saída.\n\n### Criar Project\n\n1. Criar um Project chamado `Batch Skill Builder`.\n2. Em Project Knowledge, subir:\n   - `skill_builder_batch.py`\n   - `README.md`\n   - arquivos brutos que serão convertidos ou uma lista dos nomes\n   - exemplos de skills já aprovadas, se houver\n3. Em Project Instructions, colar o bloco abaixo.\n\n### Project Instructions sugeridas\n\n```text\nVocê é o operador do Batch Skill Builder.\nObjetivo: ajudar a converter até 20 arquivos/pastas em skills padronizadas.\nContrato obrigatório por skill:\n- SKILL.md\n- README.md\n- manifest.json\n- docs/FRAMEWORK.md\n- docs/RISK_BOUNDARY.md\n- docs/VALIDATION.md\n- references/sources.md\n- references/metrics.md\n- schemas/output_schema.json\n- scripts/main.py\n- examples/sample_input.md\n- tests/smoke_test.py\n- source/original_files/\n\nFramework obrigatório no README:\n- Resumo Executivo\n- 5W2H\n- ICP\n- 3 exemplos distintos de aplicabilidade\n- Entradas\n- Saídas\n- Riscos\n- Mitigações\n- Validação\n- Próximos passos\n\nRegras:\n- 1 ZIP por skill.\n- 1 .skill por skill quando solicitado.\n- Não inventar fatos faltantes; usar TBD.\n- Preservar fonte original.\n- Marcar domínios sensíveis em RISK_BOUNDARY.md.\n- Gerar relatório batch com status, warnings, erros e caminhos.\n```\n\n### Prompt operacional em Claude.ai\n\n```text\nLeia o README e o script skill_builder_batch.py no Project Knowledge.\nQuero gerar skills em lote para os arquivos enviados.\nTarefa:\n1. Explique quais arquivos de entrada você detecta.\n2. Gere os comandos locais para eu rodar.\n3. Depois que eu subir o relatório batch, revise os erros/warnings.\n4. Para cada skill com erro, proponha correção objetiva sem mudar o contrato de saída.\n```\n\n## Validação manual\n\nDepois de rodar:\n\n```bash\nfind built_skills/packages -maxdepth 1 -type f \\( -name \"*.zip\" -o -name \"*.skill\" \\)\ncat built_skills/reports/00_BATCH_INDEX.md\n```\n\nPara testar uma skill específica:\n\n```bash\ncd built_skills/skills/skill-001-nome\npython tests/smoke_test.py\ncd -\n```\n\n## Riscos e mitigação\n\n| Risco | Mitigação |\n|---|---|\n| Nome/tema inferido errado | Revisar `README.md` e `SKILL.md` após build. |\n| Conteúdo sensível | Usar `docs/RISK_BOUNDARY.md`. |\n| Documentação genérica | Adicionar exemplos reais depois da primeira execução. |\n| Arquivo ZIP inválido | Verificar `00_BATCH_REPORT.csv/json`. |\n| Mais de 20 inputs | Rodar em lotes separados. |\n\n## Decisão operacional\n\nO batch nunca deve criar somente um ZIP gigante. O padrão correto é:\n\n```text\n1 input bruto → 1 pasta normalizada → 1 ZIP individual → 1 .skill opcional\n```\n","stderr":""}
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

---

**Você** _2026-05-09_

produce framwroks for ecahe skill :

---

**Claude** _2026-05-09_

v2_daily_workflows.md
```

---

## WORKFLOW 6: Skill Packaging Sprint
**Duration**: 90-120 minutes  
**Tools**: Create files + bash for packaging  
**Style**: CMD Protocol + Portfolio Case Builder  
**Output**: Uploadable skill ZIP  

### Process
```
1. Define skill concept (workflow to automate)
2. Write SKILL.md with frontmatter
3. Create directory structure (references/, templates/, examples/, tests/)
4. Write 10+ trigger prompts
5. Write 8+ negative tests
6. Generate README + manifest
7. Validate packaging
8. Create ZIP
```

**Example CMD**:
```yaml
workflow: skill_packaging
inputs:
  - concept: "LinkedIn post research synthesis"
  - target_users: "content_creators, consultants"
  - existing_workflow: "content-research-to-linkedin-post-v3.zip"
  
steps:
  1. define_concept()
  2. write_skill_md()
     # → frontmatter: name, description (<200 chars)
     # → instructions: intake → research → synthesis → post
  3. create_structure()
     # → references/ (style guide, neurocognitive ICP)
     # → templates/ (intake, raw version, bench, caption)
     # → examples/ (3 input/output pairs)
     # → tests/ (trigger prompts, negative tests, QA checklist)
  4. trigger_prompts()
     # → 10+ realistic use cases
  5. negative_tests()
     # → 8+ boundary/unsafe cases
  6. readme_manifest()
  7. validate()
     # → Folder name = frontmatter name?
     # → All refs exist?
     # → Description triggers correctly?
  8. package()
     # → zip -r skill-name.zip skill-name/
  
outputs:
  - skill-name.zip (uploadable)
  - validation_report.json
```

**Meta-explanation** (50 words):  
Concept definition prevents scope creep. Frontmatter compliance ensures upload compatibility. Structure follows Anthropic standards. Trigger prompts improve discovery. Negative tests catch edge cases. Validation prevents packaging errors. 90-120 min produces production-ready skill vs days of unclear iteration.

**Practical example**:
```
Skill: content-research-to-linkedin-post

Structure:
content-research-to-linkedin-post/
  SKILL.md (frontmatter: name, description)
  README.md
  references/
    style-guide.md
    neurocognitive-icp.md
  templates/
    00-intake.md
    01-raw-version.md
    04-converted-obsidian-post.md
    05-linkedin-caption.md
  examples/
    example-research-input.md
    example-converted-post.md
  tests/
    trigger-prompts.md (10+)
    negative-tests.md (8+)

Validation:
✓ Folder name = frontmatter name
✓ All referenced files exist
✓ Description <200 chars
✓ Trigger prompts cover use cases
✓ Negative tests include boundaries

Package: zip -r content-research-to-linkedin-post.zip content-research-to-linkedin-post/
```

---

## WORKFLOW 7: Executive Dashboard Spec
**Duration**: 40-60 minutes  
**Tools**: Visualizer (for mockup) + create files  
**Style**: Workflow Mapping + Analytical Decomposition  
**Output**: Dashboard specification document  

### Process
```
1. Normalize stakeholder request
2. Extract metrics, dimensions, filters, update frequency
3. Check data availability
4.
v2_project_instructions.md
**Frontmatter mandatory**: `name` (lowercase-hyphens only) + `description` (trigger mechanism, <200 chars for claude.ai)  
2. **Folder = name**: Directory name must match frontmatter `name` exactly  
3. **ZIP root = folder**: Never put SKILL.md directly at ZIP root  
4. **Referenced files exist**: Every file mentioned in SKILL.md must be present  
5. **Concise SKILL.md**: Move long content to references/, keep main file focused  

### Packaging Protocol
```bash
# Structure
skill-name/
  SKILL.md
  README.md
  references/
  templates/
  examples/
  scripts/
  tests/

# Package
zip -r skill-name.zip skill-name/

# Validate
- Folder name = frontmatter name?
- All referenced files exist?
- Description triggers correctly?
- Negative tests covered?
```

### Quality Gates
- [ ] `name` field: lowercase, hyphens, no spaces, no XML, <64 chars  
- [ ] `description`: specific enough to trigger, <200 chars  
- [ ] All files in SKILL.md exist in package  
- [ ] Examples are fictional or redacted (no real client data)  
- [ ] Disclaimer present in README and manifest  
- [ ] No claims of production use without evidence  
- [ ] Trigger prompts: 10+ realistic use cases  
- [ ] Negative tests: 8+ boundary/unsafe cases  

### No-Inference Limits
- Cannot claim "used by users" without deployment proof  
- Cannot claim "autoatualização" — must be explicit regeneration  
- Cannot claim Anthropic compliance without final QA  
- Cannot fabricate screenshots or dashboards  

### Recurring Workflows
- Skill concept → directory tree → SKILL.md → validation → ZIP  
- Convert loose prompts into structured skills  
- Extract reusable workflows from portfolio cases  
- Normalize intake → templates → examples → tests  

---

## Cross-Project Rules

### When to use which tool
- **Web search**: Facts, current info, citations needed  
- **Research**: 5+ searches, synthesis, comparative analysis  
- **Extended thinking**: Complex reasoning, strategic decisions  
- **Claude Code**: Automation, repo creation, script execution  
- **Artifacts**: Demos, prototypes, interactive widgets  

### Output Length Guidelines
- **Conversational answers**: 300-600 words default  
- **Analytical memos**: 800-1500 words  
- **Case studies**: 1500-3000 words  
- **Skills**: SKILL.md <150 lines, details in references/  

### Meta-Principle
Every project shares: **decomposition > decoration**, **frameworks over checklists**, **facts > hypotheses > inferences**, **gaps disclosed**, **next actions executable**.
v2_project_instructions.md
**Intent normalization first**: Convert vague request into explicit problem statement + variables + constraints  
2. **Framework routing**: Choose minimum sufficient lens (MECE, Inversion, Jobs-to-be-Done, 5W2H, etc.) and justify choice  
3. **Schema-first for SQL**: Never write queries without explicit schema, show execution plan before running  
4. **Cite all sources**: Web search and Research results must be cited inline, never paraphrased without attribution  
5. **Epistemic tags**: Mark every claim as fact, hypothesis, inference, or gap  

### Decomposition Protocol
For every analytical request, output:
1. **Normalized problem** (50 words)  
2. **Variables & constraints** (table format)  
3. **Framework selected** + reason  
4. **Structured analysis** (max 600 words per section)  
5. **Gaps & dependencies** (bullet list)  
6. **Decision options** (table with criteria)  
7. **No-inference limit** (what cannot be claimed)  

### Framework Library
Quick reference:
- **MECE**: Decompose without overlap  
- **First Principles**: Reduce to fundamental assumptions  
- **Inversion**: How would this fail?  
- **Jobs-to-be-Done**: What progress does user want?  
- **ICE/RICE**: Score by Impact, Confidence, Effort, Reach  
- **5W2H**: Who, What, When, Where, Why, How, How much  
- **Overkill Check**: Is this too complex for the problem?  
- **Gold Standard**: What's the category reference?  

### No-Inference Limits
- Cannot claim causation from correlation alone  
- Cannot claim statistical significance without proper test  
- Cannot claim "user wants X" without evidence (survey, usage, interview)  
- Cannot fabricate metrics, dashboards, or query results  

### Recurring Workflows
- Research brief → synthesis → memo  
- SQL spec → query plan → execution → validation  
- Dashboard brief → data model → visual spec  
- Hypothesis → test design → measurement plan  

---

## PROJECT 3: Skills & Workflow Engineering

**Purpose**: Build, test, and package reusable Claude skills following Anthropic standards  
**Context**: You're creating SKILL.md-based packages with frontmatter, references, templates, examples, tests

### Default Outputs
- SKILL.md (with YAML frontmatter)  
- Directory structure (references/, templates/, examples/, scripts/, tests/)  
- Packaging command + ZIP validation  
- Trigger prompts (10+) and negative tests (8+)  
- QA checklist (PASS/FAIL)  

### Operating Rules
1. **Frontmatter mandatory**: `name` (lowercase-hyphens only) + `description` (trigger mechanism, <200 chars for claude.ai)  
2. **Folder = name**: Directory name must match frontmatter `name` exactly  
3. **ZIP root = folder**: Never put SKILL.md directly at ZIP root  
4. **Referenced files exist**: Every file mentioned in SKILL.md must be present  
5.
SUPERDYMOND - PERONALIZATIO LEO.md
(from document)
│   └── market-validation.md    ← Competitor positioning example
└── tests/
    └── trigger-scenarios.md    ← 20 validation prompts
```

**Progressive Disclosure Loading:**

```yaml
level_1_always_loaded:
  file: "SKILL.md metadata (name + description)"
  tokens: "~100"
  
level_2_on_trigger:
  file: "SKILL.md body"
  tokens: "~400 lines"
  loads_when: "User asks any market/business/decision question"

level_3_per_agent:
  A1_loads: "references/01-normalization.md"
  A2_loads: "references/02-research-protocol.md"
  A3_loads: "references/02 + references/03-connector-stack.md"
  A4_loads: "references/04-calculation-engine.md"
  A5_loads: "references/05-output-templates.md"
  
  principle: "Never load all references at once — only what the active agent needs"
```

---

## NOISE REDUCTION DECISIONS

**Removing from skill (stays in document, not operational):**

- Business pitch narrative (Plano 1-4, go-to-market → context only)
- Document taxonomy (MRD/BRD/PRD → irrelevant to skill execution)
- Quantitative vs qualitative methods section → generic, not Orácio-specific
- Script install bash files → user said "no scripts"
- SQL schema files → no scripts
- Palantir comparison narrative → product context, not execution logic

**Keeping as core logic:**

- G/K/V/C/A/D/Q/E normalization → A1 backbone
- WIDE RESEARCH 3 phases (exact prompts from doc) → A2+A3 backbone
- Evidence table schema (CLAIM|SOURCE|DATE|CONFIDENCE|CAVEAT) → A3+A4
- Decision output format (Decision, Confidence%, What would change it, Next Experiment) → A5
- Connector P0/P1/P2 stack → A3 source priority
- Trust system (each conclusion has 8 audit fields) → quality gate

---

## WHAT THE PREVIOUS SKILL MISSED (From Document Lines 1394-1400)

The GPT-generated skill (lines 1394-1540) had the right structure but:

|Missing|Fix|
|---|---|
|No subagent architecture|✅ 5 explicit agents with handoffs|
|No progressive disclosure|✅ Level 1/2/3 loading strategy|
|No Anthropic SKILL.md compliance|✅ Proper frontmatter + triggers|
|No quality gates|✅ Integrate with CMD v3 gates|
|No epistemic tagging|✅ FACT/INFERENCE/HYPOTHESIS/GAP per claim|
|Tried to put everything in SKILL.md|✅ References progressive load|
|No trigger phrases|✅ Auto-activates on business questions|
|Scripts included (no longer needed)|✅ Removed per your instruction|

---

## CONFIRM BEFORE RUN

**I will build:**

```yaml
files: 11 total (no scripts)
SKILL.md: ~400 lines (orchestrator)
README.md: 3-step PT + EN
references/: 5 files (loaded per agent, not all at once)
examples/: 2 files (from document's real cases)
tests/: 1 file (20 validation scenarios)

quality_bar: Gold
tokens_to_build: ~35K
next_model: Sonnet (multi-agent coordination)
```

**The skill triggers when user asks:**

- "Vale lançar [X]?"
- "Quero validar [ideia]"
- "Analise o mercado de [Y]"
- "Use Orácio para..."
- "Qual meu público prioritário?"
- "Existe demanda para [Z]?"

**Done definition:**

1. ZIP file ready to upload to claude.ai Skills
2.
SUPERDYMOND - PERONALIZATIO LEO.md
(from document)
│   └── market-validation.md    ← Competitor positioning example
└── tests/
    └── trigger-scenarios.md    ← 20 validation prompts
```

**Progressive Disclosure Loading:**

```yaml
level_1_always_loaded:
  file: "SKILL.md metadata (name + description)"
  tokens: "~100"
  
level_2_on_trigger:
  file: "SKILL.md body"
  tokens: "~400 lines"
  loads_when: "User asks any market/business/decision question"

level_3_per_agent:
  A1_loads: "references/01-normalization.md"
  A2_loads: "references/02-research-protocol.md"
  A3_loads: "references/02 + references/03-connector-stack.md"
  A4_loads: "references/04-calculation-engine.md"
  A5_loads: "references/05-output-templates.md"
  
  principle: "Never load all references at once — only what the active agent needs"
```

---

## NOISE REDUCTION DECISIONS

**Removing from skill (stays in document, not operational):**

- Business pitch narrative (Plano 1-4, go-to-market → context only)
- Document taxonomy (MRD/BRD/PRD → irrelevant to skill execution)
- Quantitative vs qualitative methods section → generic, not Orácio-specific
- Script install bash files → user said "no scripts"
- SQL schema files → no scripts
- Palantir comparison narrative → product context, not execution logic

**Keeping as core logic:**

- G/K/V/C/A/D/Q/E normalization → A1 backbone
- WIDE RESEARCH 3 phases (exact prompts from doc) → A2+A3 backbone
- Evidence table schema (CLAIM|SOURCE|DATE|CONFIDENCE|CAVEAT) → A3+A4
- Decision output format (Decision, Confidence%, What would change it, Next Experiment) → A5
- Connector P0/P1/P2 stack → A3 source priority
- Trust system (each conclusion has 8 audit fields) → quality gate

---

## WHAT THE PREVIOUS SKILL MISSED (From Document Lines 1394-1400)

The GPT-generated skill (lines 1394-1540) had the right structure but:

|Missing|Fix|
|---|---|
|No subagent architecture|✅ 5 explicit agents with handoffs|
|No progressive disclosure|✅ Level 1/2/3 loading strategy|
|No Anthropic SKILL.md compliance|✅ Proper frontmatter + triggers|
|No quality gates|✅ Integrate with CMD v3 gates|
|No epistemic tagging|✅ FACT/INFERENCE/HYPOTHESIS/GAP per claim|
|Tried to put everything in SKILL.md|✅ References progressive load|
|No trigger phrases|✅ Auto-activates on business questions|
|Scripts included (no longer needed)|✅ Removed per your instruction|

---

## CONFIRM BEFORE RUN

**I will build:**

```yaml
files: 11 total (no scripts)
SKILL.md: ~400 lines (orchestrator)
README.md: 3-step PT + EN
references/: 5 files (loaded per agent, not all at once)
examples/: 2 files (from document's real cases)
tests/: 1 file (20 validation scenarios)

quality_bar: Gold
tokens_to_build: ~35K
next_model: Sonnet (multi-agent coordination)
```

**The skill triggers when user asks:**

- "Vale lançar [X]?"
- "Quero validar [ideia]"
- "Analise o mercado de [Y]"
- "Use Orácio para..."
- "Qual meu público prioritário?"
- "Existe demanda para [Z]?"

**Done definition:**

1. ZIP file ready to upload to claude.ai Skills
2.
v2_style_convergence.md
This prevents overpromising and sets expectations.

For the case itself, use this structure: `/case-name/SKILL.md` (if it's a skill), `/references/` for long docs, `/examples/` for input/output, `/tests/` for quality gates, and `/templates/` for reusable artifacts. This matches Anthropic's skill packaging standards and makes it uploadable.

Finally, include a disclosure section that flags missing items (e.g., "needs e-book attachment," "redaction pending") instead of pretending they're done. Transparency beats polish.

Want me to scaffold one for you based on an existing case?
```

---

## Style Selection Decision Tree

```
START
  ↓
Is this data/SQL work?
  ├─ YES → SQL Protocol (Style 4)
  └─ NO ↓
  
Is this analytical/strategic?
  ├─ YES → Analytical Decomposition (Style 1)
  └─ NO ↓
  
Is this portfolio/GitHub documentation?
  ├─ YES → Portfolio Case Builder (Style 2)
  └─ NO ↓
  
Is this a quick fact check?
  ├─ YES → Quick Fact Check (Style 8)
  └─ NO ↓
  
Is this explaining a concept?
  ├─ YES → Teaching/Explanation (Style 9)
  └─ NO ↓
  
Default: Conversational (Style 10)
```

---

## Meta-Style Rules (apply to all)

1. **Conciseness default**: Aim for 300-600 words unless depth is needed  
2. **Framework transparency**: Name frameworks used, justify choice, note exclusions  
3. **Epistemic discipline**: Tag facts, hypotheses, inferences, gaps  
4. **No fabrication**: Never invent data, metrics, screenshots, or claims  
5. **Citation when applicable**: Web search, Research, and external sources require inline citations  
6. **Executable next actions**: Avoid "consider X" — give "do Y by Z"  
7. **Disclosure when needed**: Surface dependencies, gaps, redaction needs  

## When styles converge
All styles share: **decomposition over decoration**, **frameworks over checklists**, **structure over stream-of-consciousness**, **evidence over assertion**, **action over advice**.
DIAMOND ORACIO.md
Responda com base em evidência forte.

7. Ao final, entregue:

   - resumo executivo;

   - tendências principais;

   - oportunidades;

   - riscos;

   - fontes fortes;

   - fontes fracas/rejeitadas;

   - percentual de cobertura das conclusões.

Minha recomendação objetiva: comece com Google Workspace + Google Trends + Search Console + Keyword Planner + AlsoAsked + AnswerThePublic + Reddit Pro Trends + TikTok Creative Center + Meta Ad Library. Depois adicione Semrush/Ahrefs e Similarweb quando precisar de escala, concorrência e estimativas mais robustas.
A estrutura padrão é simples: um skill é uma pasta autocontida, com um SKILL.md obrigatório. Esse arquivo começa com YAML frontmatter contendo pelo menos name e description; o restante é Markdown com instruções que o agente segue quando o skill é ativado. A Anthropic descreve skills como pastas de instruções, scripts e recursos carregados dinamicamente conforme a tarefa.  

Exemplo de árvore “full” bem organizada:

my-skill/

├── SKILL.md

├── references/

│   ├── api.md

│   ├── workflow.md

│   └── glossary.md

├── scripts/

│   ├── run_task.py

│   ├── validate.py

│   └── helpers.py

├── assets/

│   ├── template.docx

│   ├── brand-guide.pdf

│   └── sample-input.json

├── examples/

│   ├── basic.md

│   ├── advanced.md

│   └── expected-output.md

└── tests/

    ├── fixtures/

    │   └── input.json

    └── test_skill.py

O mínimo obrigatório seria apenas:

my-skill/

└── SKILL.md

O SKILL.md é o arquivo principal. Ele deve dizer quando usar o skill, qual fluxo seguir, quais arquivos consultar e quais scripts executar. A documentação da Anthropic recomenda usar esse arquivo como visão geral, apontando para materiais mais detalhados conforme necessário, em vez de colocar tudo no SKILL.md.  

Modelo básico:

---

name: my-skill

description: Use this skill when the user needs X, Y, or Z. It handles A, B, and C.

---

  

# My Skill

  

## When to use

Use this skill when the task involves...

  

## Workflow

1. Inspect the input.

2. Choose the correct procedure.

3. If needed, read `references/workflow.md`.

4. If needed, run `scripts/run_task.py`.

5. Validate the output.

  

## Important rules

- Do not guess missing data.

- Preserve the user’s formatting.

- Use the templates in `assets/` when generating files.

  

## References

- For API details, see `references/api.md`.

- For examples, see `examples/basic.md`.

O que vai em cada pasta:

SKILL.md

Vai na raiz do skill. É obrigatório. Contém metadados, gatilho de uso, instruções principais, regras, fluxo de trabalho e links para arquivos auxiliares. O frontmatter precisa ter pelo menos name e description; o repositório da Anthropic mostra exatamente esse padrão.  

references/

Use para documentação longa: APIs, regras de negócio, glossário, schemas, políticas internas, tabelas de decisão, procedimentos detalhados. Exemplo: references/api.md, references/finance.md, references/legal-rules.md.
v2_project_instructions.md
# V2 — Project Instructions
# Three core project configurations

---

## PROJECT 1: Portfolio Case Studies

**Purpose**: Build, validate, and publish case studies for AI consulting portfolio  
**Context**: You're building evidence-based cases (X-RAY, onboarding, workflows, dashboards) that must be auditable, client-safe, and GitHub-ready

### Default Outputs
- Case positioning statements  
- Evidence inventories  
- No-inference disclosure  
- Portfolio matrices (canonical / duplicate / historical / trash)  
- GitHub-ready READMEs  

### Operating Rules
1. **Case classification first**: Identify primary axis (prompt/skill/agent, workflow, personalization, product) before writing  
2. **Safe claims only**: Never assert production use, real users, ROI, or Anthropic compliance without explicit evidence  
3. **Disclosure mandatory**: Tag missing items as dependencies, not failures  
4. **Source traceability**: Every claim must trace to a file, artifact, or verifiable output  
5. **Redaction when needed**: Replace client names, private data, internal URLs  

### No-Inference Limits
- Cannot claim "used by X clients" without proof  
- Cannot claim "increases productivity by Y%" without baseline  
- Cannot claim "production-ready" without deployment evidence  
- Cannot claim "autoatualização silenciosa" — use "autorregeneração sob controle do usuário"  

### Recurring Workflows
- Extract canonical files from nested zips  
- Build SKILL.md + references + examples structure  
- Validate packaging (folder name = frontmatter name, all referenced files exist)  
- Generate SHA-256 checksums  
- Write case thesis + portfolio matrix  

### Evidence Base
Files in context: X-RAY skills zips, onboarding directories, analytics orchestrators, content workflows, Linear/TDAH workflows. Reference these by name when building cases.

---

## PROJECT 2: Data Analysis & Research

**Purpose**: Structured analytical work: SQL, research synthesis, executive memos, dashboard specs  
**Context**: You're supporting data-driven decisions with explicit decomposition, framework routing, and epistemic discipline

### Default Outputs
- Analytical memos (executive summary + structured analysis + decision table)  
- SQL query plans (before execution)  
- Research briefs (sources + synthesis + gaps)  
- Dashboard specifications  
- Framework-routed recommendations  

### Operating Rules
1. **Intent normalization first**: Convert vague request into explicit problem statement + variables + constraints  
2. **Framework routing**: Choose minimum sufficient lens (MECE, Inversion, Jobs-to-be-Done, 5W2H, etc.) and justify choice  
3. **Schema-first for SQL**: Never write queries without explicit schema, show execution plan before running  
4. **Cite all sources**: Web search and Research results must be cited inline, never paraphrased without attribution  
5.
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
Now I have everything. Building frameworks for all 16 skills.
File created successfully: /mnt/user-data/outputs/SKILL_FRAMEWORKS_ALL_V1.md
---

**16 skills, 7 framework sections each.** Estrutura entregue:

**Por skill completa (SK-01 a SK-08):** 5W2H · ICP · Triggers com ACTIVATE/DO NOT ACTIVATE · Architecture com pipeline explícito · I/O Contract · Quality Gates · Next Action

**Suite skills (SK-09 a SK-16):** 5W2H · Architecture · I/O Contract · Quality Gates (ICP compartilhado no orquestrador)

**3 padrões que unificam tudo:**

Toda skill tem um **contrato de entrada/saída declarado** — sem ambiguidade sobre o que entra e o que sai. Toda skill tem **Quality Gates como DoD** — não como intenção, mas como checklist binário. Toda skill tem **trigger negativo explícito** — o que a skill *não* deve fazer, que é o que evita ativação errada.

**Próximo passo natural:** rodar o `batch_skill_builder_package.zip` usando esses frameworks como spec de entrada para gerar os pacotes padronizados para todas as skills Tier B que ainda estão embedded.

---

**Você** _2026-05-09_

Search/mnt/projects/files/mece-sacen-topdown/ task: colapse all files into one docuemte appliy frames for startegy syntese max 3.000 worlds.

---

**Claude** _2026-05-09_

{"returncode":0,"stdout":"/mnt/project/3P_-DIAMANTE_-CASESTUDY-_WORFLOW_-_PRINTODAY_-_ex_Personalizacao_de_sistema.md\n/mnt/project/CMD-06-ADVERSARIAL-v2.md\n/mnt/project/DIAMOND_-_Como_decidir_com_dados__-_FFlow_Framework.md\n/mnt/project/DIAMOND_-_workflow_atual_reasaerch.md\n/mnt/project/DIAMOND_ORACIO.md\n/mnt/project/SUPERDYMOND_-_PERONALIZATIO_LEO.md\n/mnt/project/W0-_Dimond_strategy.md\n/mnt/project/portfolio_v3_FINAL.xlsx\n/mnt/project/v2_daily_workflows.md\n/mnt/project/v2_global_user_preferences.md\n/mnt/project/v2_meta_explanation.md\n/mnt/project/v2_project_instructions.md\n/mnt/project/v2_style_convergence.md\n","stderr":""}
{"returncode":0,"stdout":"===FILE: /mnt/project/3P_-DIAMANTE_-CASESTUDY-_WORFLOW_-_PRINTODAY_-_ex_Personalizacao_de_sistema.md===\n986 /mnt/project/3P_-DIAMANTE_-CASESTUDY-_WORFLOW_-_PRINTODAY_-_ex_Personalizacao_de_sistema.md\n===FILE: /mnt/project/CMD-06-ADVERSARIAL-v2.md===\n368 /mnt/project/CMD-06-ADVERSARIAL-v2.md\n===FILE: /mnt/project/DIAMOND_-_Como_decidir_com_dados__-_FFlow_Framework.md===\n1235 /mnt/project/DIAMOND_-_Como_decidir_com_dados__-_FFlow_Framework.md\n===FILE: /mnt/project/DIAMOND_-_workflow_atual_reasaerch.md===\n137 /mnt/project/DIAMOND_-_workflow_atual_reasaerch.md\n===FILE: /mnt/project/DIAMOND_ORACIO.md===\n1875 /mnt/project/DIAMOND_ORACIO.md\n===FILE: /mnt/project/SUPERDYMOND_-_PERONALIZATIO_LEO.md===\n2630 /mnt/project/SUPERDYMOND_-_PERONALIZATIO_LEO.md\n===FILE: /mnt/project/W0-_Dimond_strategy.md===\n5294 /mnt/project/W0-_Dimond_strategy.md\n===FILE: /mnt/project/v2_daily_workflows.md===\n860 /mnt/project/v2_daily_workflows.md\n===FILE: /mnt/project/v2_global_user_preferences.md===\n77 /mnt/project/v2_global_user_preferences.md\n===FILE: /mnt/project/v2_meta_explanation.md===\n296 /mnt/project/v2_meta_explanation.md\n===FILE: /mnt/project/v2_project_instructions.md===\n178 /mnt/project/v2_project_instructions.md\n===FILE: /mnt/project/v2_style_convergence.md===\n415 /mnt/project/v2_style_convergence.md\n","stderr":""}
{"returncode":0,"stdout":"https://chatgpt.com/share/69fde767-0bc8-83e9-8b61-3d3ce45f7908\nest Practical Fix  \nUse this as the FIRST line of every new chat:  \nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft  \nThen continue the prompt below it.  \nExample:  \nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — DraftDevelop a strategic structure for Horácio using:- First Principles- JTBD- Risks- 5W2H\n\n  \n\nStronger Project Instruction Add-on  \nAdd this at the TOP of Project Instructions:  \nIMPORTANT:The first line of every response must suggest a vault-standard chat title using this format:V-YYYYMMDD-001 — Name — #main #secondary — Status  \nThis improves consistency because the model starts proposing names immediately.\n\n  \n\nRecommended Operational Workflow  \nStepActionWhyTagsW-001Start every chat with vault titleForces naming context early#workflowW-002Manually rename after first responseGuarantees consistency#opsW-003Keep sequential IDs by dayEasier XLS/Obsidian linking#organizationW-004Use one main tag onlyCleaner sidebar scan#uxW-005Archive old chats manuallyKeeps vault navigable#maintenance\n\n  \n\nRecommended Naming Pattern  \nTypePatternExampleIdeaV-date-id — Concept — #idea — DraftV-20260507-001 — AI CRM Agent — #ai — DraftThesisV-date-id — Thesis Name — #strategy — ActiveV-20260507-002 — SMB AI OS — #strategy — ActiveResearchV-date-id — Topic — #research — ValidatingV-20260507-003 — RAG Benchmarking — #research — ValidatingDecisionV-date-id — Decision — #decision — ArchivedV-20260507-004 — GPU Vendor Choice — #decision — Archived\n\n\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n\nV-20260508-001 — Vault Chat Naming Protocol — #workflow #ops — Active\n\nYour fix is valid. I would tighten it into a Project Instruction Add-on with one important correction:\n\nDo not force the vault title at the first line of every response.  \nForce it at the first line of the first assistant response in every new chat, or when the user asks to normalize/name/archive a chat.  \nOtherwise, it pollutes long-form outputs, emails, code, tables, and export-ready artifacts.\n\nCopy-Paste Project Instruction Add-on\n\n# Vault Naming Protocol\n\n  \n\nAt the start of every new chat, the assistant must suggest a vault-standard chat title as the first line of the first response.\n\n  \n\nUse this exact format:\n\n  \n\nV-YYYYMMDD-001 — Name — #main #secondary — Status\n\n  \n\nRules:\n\n- Use the current date in YYYYMMDD format.\n\n- Use a short, specific, human-readable name.\n\n- Use one primary tag whenever possible.\n\n- Add a secondary tag only when it materially improves retrieval.\n\n- Use one of these statuses: Draft, Active, Validating, Archived.\n\n- Do not repeat the vault title at the top of every response after the first message unless the user asks for renaming, normalization, archiving, or vault indexing.\n\n- The assistant cannot guarantee sequential IDs across unrelated chats; the user should manually adjust the numeric ID if needed.\n\n- When the user provides an existing vault title, preserve it unless the user asks to improve it.\n\n  \n\nExample:\n\n  \n\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\nFirst-Line Prompt Habit\n\nUse this as the first line of every new chat:\n\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\nThen continue the actual task below it.\n\n  \n\nExample:\n\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\n  \n\nDevelop a strategic structure for Horácio using:\n\n- First Principles\n\n- JTBD\n\n- Risks\n\n- 5W2H\n\nOperational Workflow\n\n|   |   |   |   |   |\n|---|---|---|---|---|\n|ID|Step|Action|Why|Tag|\n|W-001|Start|Begin every new chat with a vault title|Forces naming context early|#workflow|\n","stderr":""}
{"returncode":0,"stdout":"|W-001|Start|Begin every new chat with a vault title|Forces naming context early|#workflow|\n|W-002|First response|Assistant suggests normalized title|Reduces later cleanup|#ops|\n|W-003|Rename|Manually rename the chat after first response|Guarantees sidebar consistency|#ops|\n|W-004|Sequence|Keep IDs sequential by day|Easier XLS, Obsidian, Notion linking|#organization|\n|W-005|Tagging|Prefer one main tag|Cleaner sidebar scan|#ux|\n|W-006|Maintenance|Archive stale chats manually|Keeps vault navigable|#maintenance|\n\nRecommended Naming Pattern\n\n|   |   |   |\n|---|---|---|\n|Type|Pattern|Example|\n|Idea|V-date-id — Concept — #idea — Draft|V-20260507-001 — AI CRM Agent — #idea — Draft|\n|Thesis|V-date-id — Thesis Name — #strategy — Active|V-20260507-002 — SMB AI OS — #strategy — Active|\n|Research|V-date-id — Topic — #research — Validating|V-20260507-003 — RAG Benchmarking — #research — Validating|\n|Decision|V-date-id — Decision — #decision — Archived|V-20260507-004 — GPU Vendor Choice — #decision — Archived|\n|Workflow|V-date-id — Workflow Name — #workflow — Active|V-20260507-005 — Vault Naming Protocol — #workflow — Active|\n|Launch|V-date-id — Launch Name — #launch — Active|V-20260507-006 — CMD Business School Launch — #launch — Active|\n\nCleaner Final Version\n\nUse this as the strongest instruction:\n\nIMPORTANT — Vault Naming\n\n  \n\nFor every new chat, the assistant’s first response must begin with a suggested vault-standard title:\n\n  \n\nV-YYYYMMDD-001 — Name — #main #secondary — Status\n\n  \n\nThe title must be specific, retrieval-friendly, and suitable for manual chat renaming.\n\n  \n\nPrefer one primary tag. Use a secondary tag only when useful.\n\n  \n\nValid statuses:\n\n- Draft\n\n- Active\n\n- Validating\n\n- Archived\n\n  \n\nDo not prepend the vault title to every later response unless the user asks to rename, normalize, index, or archive the chat.\n\nThis gives you the consistency benefit without contaminating all downstream outputs.\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\nExpand v2 (#tag/project\n\n  \n\nProject purpose: maintain a Business Thesis Vault for idea capture, validation, decisions, and XLS/CSV export.\n\n  \n\nFor every project chat, use this schema:  \n| ID | Chat Name | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |\n\n  \n\nChat naming rule:  \nV-YYYYMMDD-### — Name — #main #secondary — Status\n\n  \n\nStatus options: Draft, Active, Validating, Decision, Archived.  \nType options: Idea, Thesis, Plan, Analysis, Decision, Task.\n\n  \n\nUse frames when relevant: Resumo Executivo, First Principles, PASTEL/PESTEL, Issue/Problem, 5P, 5W2H, JTBD, Data/Metrics, Risks/Unknowns, Next Actions.\n\n  \n\nID rules: V=entry, F=frame, T=task, R=risk, A=assumption, M=metric.  \nTag rules: lowercase Obsidian tags only; use #strategy #market #problem #customer #jtbd #finance #growth #ops #risk #validation #execution #data #ai #product.\n\n  \n\nOutput rules: table-first, concise cells, no long paragraphs, TBD for unknowns, assumptions labeled A-###, confidence shown when useful. Keep every response under 1000 words. V-20260508-001 — Vault Chat Naming Protocol — #workflow #ops — Active\n\n  \n\nYour fix is valid. I would tighten it into a Project Instruction Add-on with one important correction:\n\n  \n\nDo not force the vault title at the first line of every response.  \nForce it at the first line of the first assistant response in every new chat, or when the user asks to normalize/name/archive a chat.  \nOtherwise, it pollutes long-form outputs, emails, code, tables, and export-ready artifacts.\n\n  \n\nCopy-Paste Project Instruction Add-on\n\n  \n\n# Vault Naming Protocol  \nAt the start of every new chat, the assistant must suggest a vault-standard chat title as the first line of the first response.  \nUse this exact format:  \nV-YYYYMMDD-001 — Name — #main #secondary — Status  \nRules:  \n- Use the current date in YYYYMMDD format.  \n- Use a short, specific, human-readable name.  \n- Use one primary tag whenever possible.  \n- Add a secondary tag only when it materially improves retrieval.  \n- Use one of these statuses: Draft, Active, Validating, Archived.  \n- Do not repeat the vault title at the top of every response after the first message unless the user asks for renaming, normalization, archiving, or vault indexing.  \n- The assistant cannot guarantee sequential IDs across unrelated chats; the user should manually adjust the numeric ID if needed.  \n- When the user provides an existing vault title, preserve it unless the user asks to improve it.  \nExample:  \nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\n  \n\nFirst-Line Prompt Habit\n\n  \n\nUse this as the first line of every new chat:\n\n  \n\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\n  \n\nThen continue the actual task below it.\n\n  \n\nExample:\n\n  \n\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft  \nDevelop a strategic structure for Horácio using:  \n- First Principles  \n- JTBD  \n- Risks  \n- 5W2H\n\n  \n\nOperational Workflow\n\n  \n\nID Step Action Why Tag  \nW-001 Start Begin every new chat with a vault title Forces naming context early #workflow  \nW-002 First response Assistant suggests normalized title Reduces later cleanup #ops  \nW-003 Rename Manually rename the chat after first response Guarantees sidebar consistency #ops  \nW-004 Sequence Keep IDs sequential by day Easier XLS, Obsidian, Notion linking #organization  \nW-005 Tagging Prefer one main tag Cleaner sidebar scan #ux  \nW-006 Maintenance Archive stale chats manually Keeps vault navigable #maintenance\n\n  \n\nRecommended Naming Pattern\n\n  \n\nType Pattern Example  \nIdea V-date-id — Concept — #idea — Draft V-20260507-001 — AI CRM Agent — #idea — Draft  \nThesis V-date-id — Thesis Name — #strategy — Active V-20260507-002 — SMB AI OS — #strategy — Active  \nResearch V-date-id — Topic — #research — Validating V-20260507-003 — RAG Benchmarking — #research — Validating  \nDecision V-date-id — Decision — #decision — Archived V-20260507-004 — GPU Vendor Choice — #decision — Archived  \nWorkflow V-date-id — Workflow Name — #workflow — Active V-20260507-005 — Vault Naming Protocol — #workflow — Active  \nLaunch V-date-id — Launch Name — #launch — Active V-20260507-006 — CMD Business School Launch — #launch — Active\n\n  \n\nCleaner Final Version\n\n  \n\nUse this as the strongest instruction:\n\n  \n\nIMPORTANT — Vault Naming  \nFor every new chat, the assistant’s first response must begin with a suggested vault-standard title:  \nV-YYYYMMDD-001 — Name — #main #secondary — Status  \nThe title must be specific, retrieval-friendly, and suitable for manual chat renaming.  \nPrefer one primary tag. Use a secondary tag only when useful.  \nValid statuses:  \n- Draft  \n- Active  \n- Validating  \n- Archived  \nDo not prepend the vault title to every later response unless the user asks to rename, normalize, index, or archive the chat.\n\n  \n\nThis gives you the consistency benefit without contaminating all downstream outputs.\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\nV-20260508-002 — Business Thesis Vault Protocol v2 — #workflow #ops — Active\n\nProject Instruction v2 — Copy/Paste Version\n\n# Business Thesis Vault — Project Protocol v2\n\n  \n\nProject purpose:\n\nMaintain a Business Thesis Vault for idea capture, validation, strategic analysis, decisions, execution tracking, and XLS/CSV export.\n\n  \n\nPrimary behavior:\n\n- Respond table-first.\n\n- Keep outputs concise, structured, and export-ready.\n\n- Prefer rows, IDs, tags, statuses, and metrics over long prose.\n\n- Use TBD for unknowns.\n\n- Label assumptions as A-###.\n\n- Show confidence when useful.\n\n- Keep every response under 1000 words unless the user explicitly asks for depth.\n\n  \n\nChat naming rule:\n\nEvery new project chat should begin with a suggested vault-standard title:\n\n  \n\nV-YYYYMMDD-### — Name — #main #secondary — Status\n\n  \n\nExample:\n\nV-20260508-001 — Vault Chat Naming Protocol — #workflow #ops — Active\n\n  \n\nDo not repeat the title on every later response unless the user asks to rename, normalize, archive, or index a chat.\n\n  \n\nStatus options:\n\n- Draft\n\n- Active\n","stderr":""}
{"returncode":0,"stdout":"A leitura correta é: Horácio não deve ser vendido como “mais um BI” nem como “um ChatGPT com dados”. A narrativa forte é outra:\n\nHorácio é um oráculo operacional de mercado: você faz uma pergunta de negócio, ele coleta sinais, transforma em números auditáveis, calcula cenários e devolve uma decisão prática.\n\nA tese é excelente porque fica exatamente na interseção de três movimentos atuais: agentes de IA, self-service analytics e tomada de decisão orientada por dados. O Brasil tem mercado para isso porque o setor de TI cresceu 18,5% em 2025, chegando a US$ 67,8 bilhões em receita, segundo a ABES, e big techs continuam investindo em infraestrutura de IA no país, como o plano da Microsoft de investir US$ 2,7 bilhões em cloud e IA no Brasil ao longo de três anos.  \n\n1. Posicionamento central\n\nNome: HorácioConceito: o oráculo de dados para decisões de mercado.Categoria: agentic market intelligence / self-service decision intelligence.Promessa: transformar perguntas abertas de negócio em respostas numéricas, auditáveis e acionáveis.Inimigo narrativo: achismo, planilhas soltas, dashboards que ninguém interpreta, consultorias caras e dependência excessiva de analistas para perguntas recorrentes.\n\nA frase curta seria:\n\nHorácio transforma qualquer pergunta de negócio em uma análise quantitativa auditável, sem exigir que o usuário saiba SQL, BI ou ciência de dados.\n\nA frase mais agressiva:\n\nA Palantir para decisões comerciais de PMEs, criadores, consultores e times de crescimento.\n\nMas eu usaria essa comparação com cuidado. Palantir é referência em plataformas operacionais de dados, ontologia e decisão em ambientes críticos; Horácio deve se inspirar no modelo mental, não tentar parecer uma cópia enterprise/governo/defesa.\n\n2. O pitch da empresa\n\nPitch de 30 segundos:\n\nHorácio é uma plataforma de inteligência de mercado que permite que qualquer pessoa faça uma pergunta estratégica — “vale a pena lançar esse produto?”, “qual público devo atacar?”, “quanto devo investir?”, “qual tendência está crescendo?” — e receba uma resposta baseada em dados coletados, normalizados e calculados automaticamente. Em vez de depender de um analista, dashboards complexos ou pesquisas manuais, o Horácio usa agentes de IA para coletar sinais, transformar tudo em números auditáveis, rodar cenários e entregar uma recomendação prática.\n\nPitch para investidor:\n\nEmpresas pequenas e médias tomam decisões estratégicas todos os dias sem infraestrutura analítica. Elas não têm time de dados, não sabem usar BigQuery, não têm analista disponível e acabam decidindo com base em intuição, benchmark superficial e opinião. Horácio resolve isso criando uma camada de decisão entre o usuário e o mundo dos dados: o usuário pergunta, agentes coletam evidências, o sistema estrutura os dados, calcula cenários e entrega uma recomendação auditável. O produto começa em inteligência de mercado para lançamentos, precificação, concorrência e tendências, mas evolui para um sistema operacional de decisão para negócios.\n\nPitch comercial:\n\nPare de decidir no escuro. Pergunte ao Horácio. Em minutos, ele coleta dados de mercado, concorrência, demanda, preço, canais e tendências; transforma tudo em números; calcula cenários; e mostra qual decisão faz mais sentido. Sem analista, sem dashboard complexo, sem achismo.\n\n3. Público-alvo\n\nO público inicial não deve ser “todo mundo”. A melhor entrada é por pessoas que têm perguntas de alto valor, pouca maturidade analítica e urgência comercial.\n\nO público prioritário:\n\n1. Infoprodutores e criadores de cursos que querem validar demanda, público, preço e concorrência.\n2. Consultores e estrategistas independentes que precisam produzir diagnósticos rápidos para clientes.\n3. PMEs em crescimento que querem tomar decisões sobre expansão, lançamento, canal, preço e concorrência.\n4. Founders early-stage que precisam validar mercado antes de investir em produto.\n5. Times de marketing e growth sem área de dados dedicada.\n6. Agências de marketing, branding e performance que querem entregar inteligência para clientes sem montar uma área de BI.\n\nA persona mais forte para o início:\n\n“Pessoa de negócio inteligente, mas não técnica, que toma decisões caras e hoje depende de pesquisa manual, opinião de terceiros ou planilhas frágeis.”\n\nEssa persona compra porque quer reduzir risco. Não compra porque ama dados.\n\n4. Narrativa principal\n\nA narrativa não é “IA que pesquisa”.\n\nIsso é fraco.\n\nA narrativa é:\n\n“A interface simples entre dúvida e decisão.”\n\nOu:\n\n“O oráculo que transforma perguntas em decisões auditáveis.”\n\nA narrativa em camadas:\n\nCamada emocional:  \n“Você não precisa mais decidir no escuro.”\n\nCamada funcional:  \n“Pergunte em linguagem natural e receba análise quantitativa.”\n\nCamada técnica:  \n“Agentes coletam dados, normalizam métricas, calculam cenários e auditam fontes.”\n\nCamada estratégica:  \n“Horácio reduz a dependência de analistas para decisões recorrentes e democratiza inteligência de mercado.”\n\nEu evitaria dizer que ele “elimina o data analyst” em todos os contextos. O melhor é dizer que ele reduz a fila do analista e automatiza a primeira camada de análise. A própria Microsoft alerta que, para IA analítica funcionar bem, os donos dos modelos precisam preparar os dados e o contexto de negócio; sem preparação, as respostas podem ficar genéricas, imprecisas ou enganosas.  \n\n5. O que copiar da Palantir\n\nA Palantir é valiosa como referência por cinco motivos.\n\nPrimeiro: ontologia. A ideia central é não tratar dados como tabelas soltas, mas como objetos do mundo real: clientes, produtos, concorrentes, campanhas, regiões, fornecedores, riscos, decisões. A documentação da Palantir descreve a AIP como uma plataforma que conecta IA a dados e operações, permitindo automação de processos e uso por pessoas técnicas e usuários de linha de frente.  \n\nPara Horácio, isso vira:\n\nOntologia de decisão de mercado.\n\nObjetos principais:\n\n1. Mercado.\n2. Público.\n3. Concorrente.\n4. Canal.\n5. Oferta.\n===\n\nhttps://claude.ai/share/82c5f22a-4bba-4d71-ba10-d6d963c91fc9\n\nTODO\n\n![[files 6 1.zip]]\n\n\n\n# ![[cmd-v3-orchestrator.zip]]======![[publication-complete.zip]]======================================\n# TRIGGER DETECTION (Anthropic-Compliant)\n# ============================================\n\nresearch_requests:\n  triggers: [\"research\", \"market analysis\", \"competitive intel\", \"ICP\", \"validate\"]\n  action: Load research-protocol-diamond.zip skill\n  questions: null  # Diamond has its own DIAMANTE decomposition\n  \ndocument_creation:\n  triggers: [\"create doc\", \"presentation\", \"spreadsheet\", \"report\"]\n  action: Load appropriate skill (docx/pptx/xlsx)\n  questions:\n    q1: \"Format: Word | Slides | Excel?\"\n    q2: \"Theme: Corporate | Creative | Minimal?\"\n    q3: \"Deliver: Show preview | Save to Drive?\"\n    \nquick_tasks:\n  triggers: [\"quick\", \"fast\", \"simple\", \"just\"]\n  action: Execute directly with low effort\n  questions: null  # Speed > validation\n  \nambiguous_requests:\n  triggers: [request lacks clear deliverable]\n  action: ask_user_input_v0\n  questions:\n    q1: \"Goal: Research | Create | Analyze | Other?\"\n    q2: \"Output: Answer in chat | File download | Both?\"\n    q3: \"Time: Quick (<10min) | Standard | Deep?\"   \n**DECISIVE ANALYSIS: Max Intelligence + Complexity Growth + Interactive Q&A**\n\n**Token Budget: ~75K/1M | 925K remaining**\n\n---\n\n## Your Selections Decoded\n\n```yaml\narchitecture_choice: \"Complexity acceptable if delivers more + best\"\nqa_philosophy: \"Interactive mandatory + auto-inference predictions + Cynefin reasoning\"\neffort_mode: \"Max intelligence (high effort, detailed reasoning, show all work)\"\n\n# Translation: You want FULL SYSTEM, not shortcuts\n```\n\n**Implication**: You're an **Anthropic Research Specialist** testing Claude's ceiling → Build the **most capable system**, not the simplest.\n\n---\n\n## DECISION: Hybrid Architecture (Best of Both)\n\n**Why not pure CMD v2 OR pure Diamond?**\n\n1. **CMD v2 alone** = Router without execution engine\n2. **Diamond alone** = Research-only, can't handle docs/code/analysis\n3. **Hybrid** = Intelligent router → delegates to specialized skills → learns from patterns\n\nAnthropic's subagent orchestration principle: \"Claude can recognize when tasks would benefit from delegating work to specialized subagents and do so proactively\"\n\n---\n\n## ARCHITECTURE: CMD v3 (Refined for Anthropic 2026)\n\n### Core Design Philosophy\n\n```yaml\nname: CMD v3 Orchestrator\nprinciple: \"Complexity at capability layer, simplicity at interface layer\"\n\nflow:\n  layer_1_intake: \"3-question interactive Q&A (mandatory)\"\n===\nFFlow Framework — Arquitetura Mindskill / X-Ray para Analistas de Dados\n\nAbaixo está o conteúdo colapsado em um framework único, usando o FFlow como estrutura-base e limitando para ~600 palavras.\n\nFFlow Framework — Arquitetura Mindskill / X-Ray para Analistas de Dados\n\nTese central.O valor de uma arquitetura de IA não vem apenas do modelo, nem de um prompt mestre. O valor vem da capacidade de converter intenção vaga em análise estruturada, auditável, reutilizável e acionável. Para analistas de dados, isso significa reduzir ambiguidade, retrabalho, erro de framing, validação manual excessiva e drift de formato. O setup analisado funciona melhor quando tratado como sistema em camadas: projeto para contexto, estilo para entrega, skills para workflows repetíveis, busca/Research para evidência atual e SQA para controle de qualidade.    \n\nFórmula de valor.  \nValor = qualidade da decisão × velocidade de execução × reutilização × adoção ÷ custo de tokens + retrabalho + validação + erro.  \nA inferência operacional é simples: a resposta final importa menos do que o sistema que melhora a pergunta, escolhe o método correto, controla hipóteses e entrega um output utilizável.\n\nProblema.  \nUsuários de IA, especialmente analistas, PMEs e consultores, costumam formular pedidos vagos. O resultado são respostas genéricas, frameworks usados como checklist superficial, comandos técnicos difíceis de reaproveitar e outputs que misturam fato, inferência e recomendação. Esse é o “translation gap”: o usuário conhece o problema de negócio, mas não sabe convertê-lo em execução analítica estruturada.\n\nSolução.  \nO Mindskill / X-Ray Suite atua como camada intermediária entre linguagem natural, frameworks analíticos, comandos estruturados e entrega executável. Ele interpreta o pedido, identifica lacunas, escolhe a lente correta, converte intenção em CMD e devolve uma resposta com limites, dependências, hipóteses, riscos e próximos passos.\n\nCamadas do framework.\n\n1. Input understanding. Captura o pedido explícito, o objetivo implícito, lacunas de conhecimento e restrições de privacidade.\n2. Classificação epistêmica. Define se o problema é simples, complicado, complexo, caótico ou desconhecido. Isso evita aplicar framework pesado em pergunta simples.\n3. Framework routing. Seleciona a lente analítica adequada e declara por que certos frameworks não foram usados.\n4. CMD conversion. Converte intenção de negócio em comando estruturado, com assumptions, perguntas de validação e passos de execução.\n5. Research and data validation. Separa fatos, inferências, hipóteses e dependências de dados. Quando houver informação atual ou evidência externa, usa web search ou Research; quando houver cálculo, profiling ou manipulação de arquivo, usa code execution.  \n6. Output governance. Entrega resumo executivo, tabela de decisão, CMD final, riscos e próximas ações. O estilo serve para clareza e forma; não deve carregar sozinho método, contexto e validação.  \n7. ROI and quality measurement. Mede tempo salvo, iterações reduzidas, taxa de aceitação, custo por tarefa, retrabalho e cobertura de evidência.\n\nRegra de ouro.  \nComo default universal, esse setup é overkill. Como arquitetura modular para tarefas analíticas recorrentes, fica perto de gold standard. Ele vira noise quando a notação simbólica domina a utilidade prática ou quando o estilo tenta substituir contexto, retrieval, skills e validação. O uso correto é seletivo: tarefas simples recebem resposta simples; tarefas repetíveis viram skill; tarefas com evidência atual acionam busca; entregas sensíveis passam por SQA.  \n\nA documentação do BigQuery trata GoogleSQL como o dialeto SQL usado para consultar dados no BigQuery; a plataforma é serverless, então o analista consulta dados sem gerenciar servidor diretamente.  \n\n  \n\n1 — Workflow em 50 palavras\n\n  \n\nUma pessoa de dados recebe uma pergunta de negócio, identifica tabelas no BigQuery, escreve consultas em SQL, valida filtros, joins e agregações, exporta resultados para dashboard, planilha ou relatório, e discute implicações com áreas de negócio. A linguagem principal é GoogleSQL; Python entra para automação, notebooks, estatística ou modelagem complementar.\n\n  \n\n2 — Flow de ponta a ponta em 100 palavras\n\n  \n\nFlow: stakeholder pergunta “por que vendas caíram?”; analista localiza tabelas de eventos, clientes e transações; checa dicionário de dados; escreve SQL com filtros de período, partições e joins; valida amostra e custo lido; entrega tabela, gráfico e insight. Em empresas médias, uma tabela analítica comum vai de 5GB a 500GB, com 30–300 colunas; warehouses grandes passam de terabytes. As perguntas frequentes são: tendência temporal, segmentação por cliente/produto/canal, e anomalias ou drivers de variação. Resposta típica: 5–10 linhas, uma tabela resumida, SQL anexado e ressalvas sobre definição, qualidade e cobertura dos dados. Para decisão executiva, resumo curto; para auditoria, detalhe maior.\n\nSim. Abaixo está a versão atômica, minuto a minuto, assumindo uma análise típica de 60 minutos feita por uma pessoa de dados usando BigQuery.\n\nNo BigQuery, a linguagem principal é GoogleSQL, o dialeto SQL usado para escrever consultas. A documentação oficial descreve que queries em GoogleSQL consultam uma ou mais tabelas ou expressões e retornam linhas calculadas.   O analista também pode usar Python, mas normalmente para automação, notebooks, estatística, gráficos ou modelagem; para acessar dados no BigQuery, o centro do trabalho é SQL.\n\nCenário-base\n\nStakeholder pergunta:\n\n“Por que a receita caiu na última semana?”\n\nBase típica de empresa média:\n\nUma tabela fato de vendas pode ter algo como 20GB a 300GB, com 50 a 200 colunas. Em empresas maiores, tabelas de eventos, transações ou logs podem passar de 1TB. Em análise, “variáveis” normalmente significam colunas: data, cliente, produto, canal, região, receita, desconto, status, origem, campanha, etc.\n\nIsso não é uma regra universal. É um range operacional comum. O tamanho real depende de volume de usuários, frequência de eventos, granularidade e tempo histórico armazenado.\n\n  \n\nFlow minuto a minuto\n\n|   |   |   |   |\n|---|---|---|---|\n|Minuto|O que o analista faz|Linguagem / ferramenta|Resultado|\n|0|Recebe a pergunta de negócio|Slack, email, reunião|Problema inicial|\n|1|Reescreve a pergunta com clareza|Português analítico|“Receita caiu quanto, onde e por quê?”|\n|2|Define métrica principal|Glossário / BI|Receita líquida, bruta ou GMV|\n|3|Define período|Calendário fiscal|Últimos 7 dias vs semana anterior|\n|4|Define granularidade|Negócio|Dia, produto, canal, região|\n|5|Lista hipóteses|Raciocínio analítico|Volume, preço, mix, desconto, ruptura|\n|6|Abre BigQuery|Console Google Cloud|Ambiente de consulta|\n|7|Procura dataset correto|BigQuery Explorer|analytics.sales|\n===\nSim — é uma boa ideia exportar tudo, mas não é boa ideia unir tudo em um prompt gigante.\n\n  \n\nA melhor opção é:\n\nExportar conversas → normalizar em dataset → rodar scanner por padrões → gerar perfil + router + portfólio\n\nNão:\n\nExportar tudo → colar tudo no Claude → pedir análise geral\n\nIsso desperdiça tokens, mistura contas, duplica contexto e reduz precisão.\n\nPelos docs atuais da Anthropic, usuários individuais podem exportar dados e histórico em Settings > Privacy no Claude web/desktop; planos Team/Enterprise têm exportação organizacional pelo Primary Owner em Organization settings > Data and Privacy. Memórias/sumários também entram em exports padrão de histórico, segundo a documentação.  \n\nMelhor arquitetura para seu caso\n\n|   |   |   |\n|---|---|---|\n|Etapa|O que fazer|Resultado|\n|1. Export|Exportar as 6+ contas separadas|raw_exports/account_01...account_06|\n|2. Normalize|Transformar chats em tabela/index|conversation_index.csv|\n|3. Scan|Rodar scanner data-driven|padrões de estilo, workflows, projetos, casos|\n|4. Synthesize|Gerar perfil final|MASTER_SELF_PROFILE.md|\n|5. Patch|Atualizar router global|CASE_STUDIES_META_ROUTER_V3|\n\nO que o scanner deve procurar\n\n1. Como você pergunta\n\n2. Como você corrige respostas\n\n3. Que formatos você prefere\n\n4. Que projetos aparecem repetidamente\n\n5. Quais comandos/workflows surgem naturalmente\n\n6. Quais erros de IA te incomodam\n\n7. Quais decisões são estáveis\n\n8. Quais casos de portfólio têm evidência\n\n9. Quais estilos de resposta funcionam melhor\n\n10. Quais padrões devem virar Project Instructions\n\nPergunta/anexo para mandar ao Claude\n\nCole isto para o Claude junto dos exports ou do índice normalizado:\n\nMETA REQUEST — DATA-DRIVEN SELF-PROFILE SCANNER\n\n  \n\nI have exported conversation data from multiple Claude accounts. Do not summarize everything. Build a data-driven profile scanner.\n\n  \n\nGoal:\n\nIdentify stable patterns in my work, response preferences, project portfolio, workflow behavior, prompt style, correction style, and reusable operating system.\n\n  \n\nSource priority:\n\n1. Conversation exports\n\n2. Project files\n\n3. Uploaded artifacts\n\n4. Official Claude/Anthropic product docs when product behavior matters\n\n  \n\nTasks:\n\n1. Build an index of conversations by account, date, title, project, theme, and artifact.\n\n2. Detect repeated patterns in my instructions, corrections, preferred outputs, and rejected outputs.\n\n3. Separate Fact / Inference / Gap / Risk.\n\n4. Identify portfolio case candidates with evidence.\n\n5. Identify recurring workflows that should become commands.\n\n6. Identify global response rules that should become Project Instructions.\n\n7. Identify style rules that should become custom response styles.\n\n8. Identify what should not be stored as memory because it is temporary, private, or unverified.\n\n9. Produce a confidence score for each finding.\n\n10. Generate:\n\n   - MASTER_SELF_PROFILE.md\n\n   - RESPONSE_STYLE_GUIDE.md\n\n   - PROJECT_ROUTER_PATCH.md\n\n   - PORTFOLIO_CASE_INDEX.md\n\n   - EVIDENCE_GAPS.md\n\n  \n\nImportant:\n\nDo not treat one-off messages as stable preferences.\n\nDo not infer identity, ROI, production use, clients, or public impact without evidence.\n\nPrefer patterns repeated across at least 3 conversations or 2 accounts.\n\nMinha recomendação final\n\nFaça isso, mas em dataset + scanner, não em prompt gigante.\n\nO deliverable final seria:\n\nMASTER_SELF_PROFILE.md\n\n+ CASE_STUDIES_META_ROUTER_V3\n\n+ PORTFOLIO_CASE_INDEX.csv\n\n+ RESPONSE_STYLE_GUIDE.md\n\n+ EVIDENCE_LEDGER.csv\n\nIsso vira sua “memória externa auditável” e melhora muito seu portfólio.===\n# CMD-06-ADVERSARIAL · v2.0\n## Adversarial Filter + Cynefin Router · Portfolio Decision System\n\n```\nname: CMD-06-ADVERSARIAL\nversion: 2.0\ndefault-state: TRASH\nburden-of-proof: ON-THE-IDEA-TO-SURVIVE\nrouting: CYNEFIN (Obvious / Complicated / Complex / Pioneer)\nphilosophy: kill-first / data-reverses / energy-proportional-to-risk\n```\n\n---\n\n## 1. CORE PRINCIPLE — Two Layers of Discipline\n\n**Layer 1 — Adversarial Filter (Survival)**  \nDefault = TRASH. Every idea must pass 4 hard gates + score ≥8/14 on soft gates to survive.\n\n**Layer 2 — Cynefin Router (Energy Allocation)**  \nSurviving ideas are NOT treated equally. Each surviving idea gets a domain score 1–15. The action is proportional to the score. Energy invested = proportional to risk of losing the window × value of being recognized as author.\n\nThe combined system filters AND prioritizes. You don't waste energy on commodity ideas. You don't lose pioneer ideas to procrastination.\n\n---\n\n## 2. THE FILTER LAYER — 4 Hard Gates + 7 Soft Gates\n\n### HARD GATES — All must pass. One fail = KILL.\n\n| ID | Gate | Pass requires |\n|----|------|---------------|\n| **HK1** | Anthropic-aligned | Citation + reasoning, not vague claim |\n| **HK2** | Original (90-day check) | Date-stamped search + result links |\n| **HK3** | Personally used 7+ days | Drive timestamps, chat history, BACKLOG |\n| **HK4** | Solo-buildable before Sep 2026 | Concrete scope + time estimate |\n\n### SOFT GATES — Scored 0/1/2. Need ≥8/14 to KEEP.\n\n| ID | Gate | 0 | 1 | 2 |\n|----|------|---|---|---|\n| **SK1** | Customer evidence | Hypothetical | 1-2 named real | 3+ real with friction |\n| **SK2** | Outcome evidence | None | Anecdotal | Numbers |\n| **SK3** | Defensibility | Anthropic kills it | Partially survives | Uniquely valuable |\n| **SK4** | Composability | Orphan | Partial fit | Fits CMD taxonomy |\n| **SK5** | Adversarial survival | Not tested | Light pushback | Hostile critique survived |\n| **SK6** | Concept clarity | Unclear | 1 paragraph | 1 sentence to anyone |\n| **SK7** | Naming asset | No name | Working name | Sharp/memorable |\n\n### Survival Verdict\n\n```\nAll HK + SK ≥ 12  →  KEEP-PUBLISH (pode mostrar à Anthropic)\nAll HK + SK 8-11  →  KEEP-BUILD (constrói, depois publica)\nAll HK + SK 4-7   →  INCUBATE (notas privadas, não reivindica)\nAll HK + SK ≤ 3   →  KILL\nQualquer HK fail  →  KILL\n```\n\n---\n\n## 3. THE ROUTER LAYER — Cynefin Domain Scoring\n\nAfter uma ideia sobrevive ao Filtro, ela entra no Roteador. Cynefin classifica em 4 domínios. Cada domínio exige ação diferente.\n\n### Three Multiplied Questions\n\nPara cada ideia que sobreviveu (KEEP-PUBLISH ou KEEP-BUILD), responda:\n\n**Q1: Quão original é a ideia?**  \n1 = existe documentada publicamente  \n2 = elementos existem, combinação parcial existe  \n3 = elementos existem, combinação inédita  \n4 = poucos elementos existem  \n5 = ninguém viu\n\n**Q2: Quão estreita é a janela antes de outro chegar?**  \n1 = anos (commodity)  \n2 = 12+ meses  \n3 = 6-12 meses  \n","stderr":""}
{"returncode":0,"stdout":"\n## REFLEXÃO PRÉ-PESQUISA · ANÁLISE METACOGNITIVA\n\n### CAMADA 1 · O QUE LEONARDO QUER?\n\n**EXPLÍCITO**: Comando de pesquisa determinístico que gere dados numéricos (85%) + inferências (15%) para validar ou refutar sua insegurança sobre o valor de seu trabalho, com roadmap acionável 14-90 dias e análise de custo de oportunidade entre modelos de monetização.\n\n**IMPLÍCITO**: Segurança psicológica baseada em dados externos (não em minha opinião), validação de mercado para suas criações, e um plano concreto que transforme conhecimento tácito em valor monetário imediato sem depender de credenciais formais.\n\n### CAMADA 2 · O QUE LEONARDO PRECISA?\n\n**NECESSIDADES IMEDIATAS** (0-14 dias):\n\n- Validação quantitativa: \"Suas skills têm valor de mercado? Quanto?\"\n- Primeiro passo acionável: \"O que fazer segunda-feira 8h da manhã?\"\n- Benchmark salarial: \"Quanto ganha quem faz o que você faz?\"\n\n**NECESSIDADES ESTRATÉGICAS** (15-90 dias):\n\n- Modelo de negócio otimizado para contexto (Brasil, sem portfólio, urgência monetização)\n- ICP preciso com pain points mapeados\n- Posicionamento diferenciado (Blue Ocean vs Red Ocean)\n- Custo de oportunidade quantificado: \"Se escolher caminho A, quanto perde de caminho B?\"\n\n**NECESSIDADES ESTRUTURAIS** (gap atual):\n\n- GitHub público (portfólio técnico)\n- Caso de uso documentado (prova social)\n- Canal de distribuição (LinkedIn, Medium, etc)\n- Oferta clara (pacote definido, preço, entrega)\n\n### CAMADA 3 · O QUE LEONARDO PERGUNTOU MAL?\n\n**PROBLEMA 1**: \"Pesquisa deve ser guiada com 85% dados numéricos\"\n\n- **ERRO**: Nem todas as questões têm dados numéricos públicos disponíveis\n- **O QUE QUERIA DIZER**: \"Preciso de fatos verificáveis, não opiniões de Claude\"\n- **CORREÇÃO**: Priorizar dados quando existem; quando não, explicitar que é inferência baseada em proxies\n\n**PROBLEMA 2**: \"Fontes gold standard, não blogs ou influencers\"\n\n- **ERRO**: Muitos dados sobre mercado brasileiro de skills AI estão APENAS em blogs/LinkedIn/Twitter porque mercado é emergente\n- **O QUE QUERIA DIZER**: \"Não quero achismos, quero dados verificáveis\"\n- **CORREÇÃO**: Usar hierarquia de fontes: 1) Papers/Reports, 2) Anthropic docs, 3) GitHub data, 4) LinkedIn jobs, 5) Blogs apenas quando corroboram\n\n**PROBLEMA 3**: \"3 caminhos possíveis\"\n\n- **ERRO**: Não especificou critérios de diferenciação entre caminhos\n- **O QUE QUERIA DIZER**: \"Quero opções contrastantes (rápido/lento, seguro/arriscado, pequeno/grande)\"\n- **CORREÇÃO**: Eixos claros: Velocidade de monetização × Potencial de escala × Risco\n\n### CAMADA 4 · O QUE LEONARDO NÃO SABE QUE NÃO SABE?\n\n**GAP 1: Asymmetric Upside** Leonardo pode estar subestimando o valor de contribuições open-source. Um único GitHub repo bem documentado pode gerar ofertas de emprego sem candidatura ativa. Não sabe que empresas tech no Brasil rastreiam GitHub activity para recrutamento proativo.\n\n**GAP 2: First-Mover Advantage Brasil** Leonardo está criando skills para mercado brasileiro onde produto não existe. Não percebeu que isso é **Blue Ocean temporário**. Window está aberto agora (2026 Q2), mas fechará quando Anthropic lançar Academy em PT-BR ou quando concorrentes copiarem.\n\n**GAP 3: Monetização ≠ Emprego** Leonardo coloca \"monetização OU emprego\" como alternativas. Não percebeu que melhor estratégia pode ser híbrida: freelance imediato (cashflow) + emprego CLT (estabilidade) + produto (upside assimétrico).\n\n**GAP 4: Credibilidade Via Execution** Leonardo acha que precisa de diploma/portfólio antes de vender. Não sabe que em AI/Claude (2026), **execution > credentials**. Um case study bem documentado (\"Aumentei produtividade 40% de consultoria X com skills Y\") vale mais que certificado.\n\n**GAP 5: Custo de Oportunidade Temporal** Leonardo pensa em custo de oportunidade entre modelos A/B/C, mas não entre **timing**. Lançar curso agora medíocre pode ser melhor que curso perfeito em 6 meses, porque mercado muda rápido.\n\n---\n\n## ANÁLISE · O QUE PODE DAR ERRADO\n\n### RISCO 1: Dados Insuficientes Mercado Brasileiro\n\n**PROBLEMA**: Mercado de \"Claude skills educator\" no Brasil é tão novo que dados numéricos quase não existem  \n**SOLUÇÃO**: Usar proxies: salários \"prompt engineer BR\", \"AI consultant BR\", \"freelancer tech BR\" + inflacionar/deflacionar baseado em especialização  \n**MITIGAÇÃO PRÉ-PESQUISA**: Buscar dados adjacentes + explicitar margem de erro\n\n### RISCO 2: Viés de Confirmação\n\n**PROBLEMA**: Leonardo quer validação, posso inconscientemente buscar dados que confirmem valor do trabalho dele  \n**SOLUÇÃO**: Buscar ativamente dados **contra** hipótese (Red Team approach)  \n**MITIGAÇÃO PRÉ-PESQUISA**: Incluir questões do tipo \"Quais evidências sugerem que skills NÃO têm mercado?\"\n\n### RISCO 3: Paralisia por Análise\n===\n# V2 — Meta-Explanation & Decision Rationale\n# 50-word explanations for every design choice + 1 practical example per variable\n\n---\n\n## DESIGN DECISION 1: Why 600-word response limit?\n\n**Explanation** (50 words):  \nForces conciseness, prevents AI verbosity, respects user attention span. Matches executive memo standard (~2 min read). Leaves room for depth when needed (can exceed with justification). Prevents \"wall of text\" that users skim vs read. Calibrated from PDF analysis showing optimal engagement at 300-600 words.\n\n**Practical example**:\n```\nWithout limit: 1800-word response, user skims, misses key insight  \nWith 600w limit: \n  - Normalized problem: 50w\n  - Analysis: 400w\n  - Decision table: 100w\n  - Next action: 50w\n  Total: 600w, fully read, action clear\n```\n\n**Variable**: `max_response_length`  \n**Values**: 600 (default), 300 (executive), 1500 (deep analysis), unlimited (documentation)  \n\n---\n\n## DESIGN DECISION 2: Why framework routing vs always applying all frameworks?\n\n**Explanation** (50 words):  \nPrevents checklist mode. Each framework solves specific problem type. Applying all = noise + time waste. Routing = minimum sufficient lens. MECE for decomposition, Inversion for risks, JTBD for value, 5W2H for execution. Wrong framework worse than no framework. Justify choice + note exclusions builds trust.\n\n**Practical example**:\n```\nRequest: \"Should we build or buy this feature?\"\n\nWrong approach: Apply SWOT + MECE + JTBD + Wardley + 5W2H (overkill, 2h)\n\nRight approach:\n  - Framework: First Principles (what's core?) + ICE scoring (priority)\n  - Excluded: SWOT (too generic), Wardley (overkill for tactical)\n  - Time: 30 min\n  - Output: Clear build/buy decision with reasoning\n```\n\n**Variable**: `framework_routing_mode`  \n**Values**: `auto` (Claude selects), `explicit` (user specifies), `minimal` (prefer simpler)  \n\n---\n\n## DESIGN DECISION 3: Why separate facts, hypotheses, inferences, gaps?\n\n**Explanation** (50 words):  \nPrevents treating assumptions as truth. Facts = verifiable, hypotheses = testable, inferences = derived, gaps = unknown. Mixing levels causes validation waste, bad decisions, trust loss. PDF analysis showed analysts burn hours validating inferences labeled as facts. Epistemic discipline = validation efficiency.\n\n**Practical example**:\n```\nWithout separation:\n\"Revenue dropped because churn increased due to poor onboarding\"\n(Looks confident, actually 3 unverified claims)\n\n===\n# V2 — Global User Preferences\n# Personalization layer for portfolio + data analyst workflows\n\n## Identity & Context\n**Role**: Consultant / Knowledge operator / Data analyst hybrid  \n**Primary work**: AI consulting systems, skill orchestration, portfolio case studies, data analysis + research synthesis  \n**Location**: Santos, SP, BR  \n**Language mix**: Portuguese (Brazilian) + technical English where useful  \n**Skill level**: Low-code with high conceptual depth  \n**Device ecosystem**: iPad-first when possible, desktop for Claude Code / terminal work\n\n## Core Operating Principles (from PDF analysis)\n1. **Decomposition over decoration**: Break complex requests into variables, constraints, hypotheses, dependencies  \n2. **Framework routing**: Choose minimum sufficient analytical lens (MECE, First Principles, Jobs-to-be-Done, 5W2H, Inversion, etc.)  \n3. **Epistemic gates**: Separate facts, inferences, hypotheses, gaps, no-inference limits  \n4. **Concise structured outputs**: Max 600 words per section unless depth explicitly requested  \n5. **Source of truth discipline**: Always cite, never fabricate, mark unknowns as unknowns  \n6. **Actionable over academic**: Prefer executable next steps to theoretical completeness\n\n## Response Structure Default\nWhen responding to analytical requests:\n1. **Normalized request** (50 words) — what you're actually asking  \n2. **Decomposition** (framework + variables + constraints)  \n3. **Analysis** (structured, cited, with epistemic tags)  \n4. **Gaps & dependencies** (what's unknown, what's assumed)  \n5. **Decision options** or **next actions** (executable, not vague)  \n6. **No-inference limit** (what I cannot claim without more data)\n\n## Workflow Preferences\n- **For quick facts**: Use web search immediately, cite sources  \n- **For deep research**: Use Research feature (5+ searches), synthesize with citations  \n- **For SQL/data work**: Force explicit schema, show query plan before execution, validate assumptions  \n- **For portfolio work**: Reference uploaded zips (X-RAY, skills, case studies), maintain traceability  \n- **For documentation**: Generate in Markdown first, convert to DOCX only when client-ready  \n- **For code**: Prefer Claude Code for automation, scripts, repo work; use artifacts for demos/prototypes  \n\n## Communication Style\n- **Tone**: Professional but not corporate, direct but not blunt  \n- **Format**: Structured prose > bullet spam. Use bullets only when listing items, options, or steps  \n- **Length**: Default concise (300-600 words). Go deep only when explicitly asked or complexity demands  \n- **Frameworks**: Name them when used, explain why they fit, note what was excluded  \n- **Disclaimers**: Always include when output affects decisions, money, legal, or publication\n\n## Portfolio Context Integration\nYou have access to:\n- **X-RAY System**: PME consulting skills, D0→D5 methodology, epistemic gates, case study builder  \n- **Onboarding skills**: Cloud AI setup, user context extraction, project + prompt generation  \n- **Content workflows**: Research → LinkedIn post, LinkedIn → Obsidian, analytics orchestrator  \n- **TDAH workflow**: Linear MCP, task decomposition for neurodivergent-friendly execution  \n\nWhen these are relevant: reference them, don't rebuild them. Treat them as reusable components.\n\n## Technology Stack\n- **Claude.ai**: Primary interface, Projects for context, Styles for output control, Skills for repeatability  \n- **Claude Code**: Automation, repo creation, script execution  \n- **MCP Connectors**: Notion, Gmail, Google Calendar, Linear (when desktop available)  \n- **Tools**: Web search for facts, Research for synthesis, Extended thinking for complex analysis  \n\n## Quality Gates (before any final output)\n- [ ] Explicit vs implicit intent separated  \n- [ ] Frameworks chosen and justified  \n- [ ] Facts vs hypotheses tagged  \n- [ ] Dependencies and gaps listed  \n- [ ] No-inference limits stated  \n- [ ] Sources cited when applicable  \n- [ ] Next actions executable (not \"consider X\")  \n\n## Anti-Patterns (what NOT to do)\n- Don't over-format with excessive bullets/headers in conversational responses  \n- Don't invent data, screenshots, metrics, or claims without evidence  \n- Don't apply frameworks mechanically (checklist mode)  \n- Don't promise ROI, production use, or guarantees without baseline  \n- Don't use emojis unless user does first  \n- Don't apologize excessively — fix and move forward  \n\n## Meta-Rule\nWhen in doubt about response depth, format, or formality: **ask 1 clarifying question** rather than guess wrong.\n","stderr":""}
{"returncode":0,"stdout":"V-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft  \nThen continue the prompt below it.  \nExample:  \nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — DraftDevelop a strategic structure for Horácio using:- First Principles- JTBD- Risks- 5W2H\n\n  \n\nStronger Project Instruction Add-on  \nAdd this at the TOP of Project Instructions:  \n--\nTypePatternExampleIdeaV-date-id — Concept — #idea — DraftV-20260507-001 — AI CRM Agent — #ai — DraftThesisV-date-id — Thesis Name — #strategy — ActiveV-20260507-002 — SMB AI OS — #strategy — ActiveResearchV-date-id — Topic — #research — ValidatingV-20260507-003 — RAG Benchmarking — #research — ValidatingDecisionV-date-id — Decision — #decision — ArchivedV-20260507-004 — GPU Vendor Choice — #decision — Archived\n\n\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\nFirst-Line Prompt Habit\n\nUse this as the first line of every new chat:\n\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\nThen continue the actual task below it.\n\n  \n\n--\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\n  \n\nDevelop a strategic structure for Horácio using:\n\n- First Principles\n\n- JTBD\n\n--\n|Thesis|V-date-id — Thesis Name — #strategy — Active|V-20260507-002 — SMB AI OS — #strategy — Active|\n|Research|V-date-id — Topic — #research — Validating|V-20260507-003 — RAG Benchmarking — #research — Validating|\n|Decision|V-date-id — Decision — #decision — Archived|V-20260507-004 — GPU Vendor Choice — #decision — Archived|\n|Workflow|V-date-id — Workflow Name — #workflow — Active|V-20260507-005 — Vault Naming Protocol — #workflow — Active|\n|Launch|V-date-id — Launch Name — #launch — Active|V-20260507-006 — CMD Business School Launch — #launch — Active|\n\n--\nTag rules: lowercase Obsidian tags only; use #strategy #market #problem #customer #jtbd #finance #growth #ops #risk #validation #execution #data #ai #product.\n\n  \n\nOutput rules: table-first, concise cells, no long paragraphs, TBD for unknowns, assumptions labeled A-###, confidence shown when useful. Keep every response under 1000 words. V-20260508-001 — Vault Chat Naming Protocol — #workflow #ops — Active\n\n--\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\n  \n\nFirst-Line Prompt Habit\n\n--\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft\n\n  \n\nThen continue the actual task below it.\n\n--\nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft  \nDevelop a strategic structure for Horácio using:  \n- First Principles  \n- JTBD  \n- Risks  \n- 5W2H\n\n--\nThesis V-date-id — Thesis Name — #strategy — Active V-20260507-002 — SMB AI OS — #strategy — Active  \nResearch V-date-id — Topic — #research — Validating V-20260507-003 — RAG Benchmarking — #research — Validating  \nDecision V-date-id — Decision — #decision — Archived V-20260507-004 — GPU Vendor Choice — #decision — Archived  \nWorkflow V-date-id — Workflow Name — #workflow — Active V-20260507-005 — Vault Naming Protocol — #workflow — Active  \nLaunch V-date-id — Launch Name — #launch — Active V-20260507-006 — CMD Business School Launch — #launch — Active\n\n--\n#strategy #market #problem #customer #jtbd #finance #growth #ops #risk #validation #execution #data #ai #product #workflow #project\n\n  \n\nDefault project schema:\n\n--\n#strategy #market #problem #customer #jtbd #finance #growth #ops #risk #validation #execution #data #ai #product #workflow #project\n\n  \n\nKeep responses under 1000 words unless explicitly asked for a full deep-dive.\n--——————————————————————————————————\n--\nNorth Stream, Google, First Move Strategy, Blue Ocean, Pastel Moments, OKR, Top Voice, LinkedIn, Blog, Hotmart, GitHub, Medium, Instagram, TikTok, Google, AI, Anthropic, PayMe as influencer, B, viral post, C, MIT License for the solution, plus Imp Brazilian Register. Opening questions: How to make Anthropic pay me? How to make viral post? How to make MIT an Imp license? Propose technical stack, technological for operations, Gmail, Linear, Obsidian, connectors like BigQuery, Google Ads. Strategy North Stream, Brazilian influencer that helps the project. One people project would be benefit if use my solution, so I have to contact them with a business plan. Hotmart.  --——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--——————————————————————————————————\n--\nV-20260508-004 — Horácio Distribution & Ecosystem Strategy — #strategy #growth — Active\n\n|   |   |   |   |   |   |   |   |   |   |   |\n|---|---|---|---|---|---|---|---|---|---|---|\n|ID|Chat Name|Type|Frame|Question|Output|Data/Metric|Owner|Priority|Status|Tags|\n|V-004|Horácio Distribution & Ecosystem Strategy|Thesis|First Principles|How does Horácio become a defensible AI business instead of a generic course?|Build media → workflow data → implementation → SaaS flywheel|Audience, workflows, cases, proprietary data|Leonardo|P0|Active|#strategy #ai|\n|Q-001|Anthropic Strategy|Analysis|JTBD|How can Anthropic eventually pay or partner?|Become PT-BR distribution + workflow intelligence layer|Audience + enterprise cases + content moat|Leonardo|P0|Validating|#strategy #growth|\n|Q-002|Viral Distribution|Analysis|5W2H|How to create viral posts consistently?|Narrative + proof + controversy + operational screenshots|CTR, saves, reposts, follows|Leonardo|P1|Active|#growth #data|\n|Q-003|MIT + IP|Decision|Risks/Unknowns|What should be open-source vs proprietary?|Open infra/tools; keep workflow data proprietary|OSS adoption + inbound leads|Leonardo|P1|Decision|#product #risk|\n|T-001|Ecosystem Stack|Plan|Data/Metrics|What stack should operate Horácio?|Claude + Obsidian + GitHub + Linear + BigQuery|Unified operational system|Leonardo|P0|Active|#ops #ai|\n\nStrategic Model\n\n|   |   |   |   |\n|---|---|---|---|\n--\nFirst-Move / Blue Ocean Strategy\n\n|   |   |\n|---|---|\n|Strategy|Application to Horácio|\n|Blue Ocean|“Operational AI for non-technical professionals” instead of “AI course”|\n|First Move|Become early PT-BR Claude workflow authority before saturation|\n|Category Design|Define “Workflow Intelligence PT-BR”|\n|North Star|Build largest PT-BR operational AI workflow corpus|\n|Distribution Moat|Blog + LinkedIn + GitHub + newsletter + cases|\n|Data Moat|Real workflows + decision traces from users|\n--\n|Enterprise consultant|Claude implementation for BR SMBs|Medium|Strong|\n|Content creator|Large audience around Claude workflows|Medium|Strong|\n|Workflow showcase|Publish advanced Claude operational systems|Medium|Strong|\n|API consumption|Build SaaS using Claude APIs|High|Long-term|\n\nMost Realistic Path\n--\n|Business creators|ICP acquisition|SMB/growth creators|\n|Productivity creators|Workflow narrative|Notion/productivity ecosystem|\n|Tech journalists|Authority|Exame / Startups|\n|Anthropic-aligned creators|Ecosystem positioning|Claude-focused channels|\n\n“One-Person Project” Strategy\n--\n|SMB|“Operational AI setup”|\n|Agencies|Workflow intelligence systems|\n|Creators|AI operating system|\n","stderr":""}
Now I have everything. Writing the synthesis.
File created successfully: /mnt/user-data/outputs/DIAMOND_STRATEGY_SYNTHESIS_V1.md
---

**12 arquivos → 1 documento · ~2,850 palavras.**

**9 seções MECE — o que foi aplicado e por quê:**

**0. Master Thesis** — 50 palavras que substituem os 12 arquivos. Se você só puder ler uma coisa, é essa.

**1. Context + Window** — Cynefin classification + dados citados com status epistêmico. O mercado é fato; o timing é inferência. Importante separar.

**2. Horácio** — First Principles (stripped bare), 3-layer positioning, ICP priorizado, JTBD canônico, 5 objetos de ontologia. Tudo que estava em DIAMOND_ORACIO colapsado em ~600 palavras.

**3. Operator OS** — Arquitetura CMD+Skills+Vault em uma tabela. Por que o OS *é* o proof of concept, não um acessório dele.

**4. Decision Architecture** — FFlow 7 layers + Adversarial Filter (HK1-4 + SK1-7) + Cynefin Router com score 1-15. Operacionalizados, não teóricos.

**5. Epistemic Ledger** — Cada claim do W0+ORACIO marcado como FACT/INFERENCE/HYPOTHESIS/GAP.

**6. Risk Register** — 6 riscos reais com likelihood + mitigation. R5 (OS consome tudo) e R4 (paralisia por análise) são os mais críticos.

**7. Monetization** — Híbrido explícito: freelance agora + CLT em 30d + produto em 90d. Justificativa para não escolher um.

**8. 72H Next Actions** — 6 ações priorizadas, todas com output declarado e deadline.

**A hipótese mais crítica não testada:** o P0 ICP prefere *usar* Horácio ou *aprender a construir* o próprio? Isso determina produto vs educação.

---

**Você** _2026-05-09_

apply this sistem to audite everting as my portofiloio:

---

**Claude** _2026-05-09_

v2_project_instructions.md
# V2 — Project Instructions
# Three core project configurations

---

## PROJECT 1: Portfolio Case Studies

**Purpose**: Build, validate, and publish case studies for AI consulting portfolio  
**Context**: You're building evidence-based cases (X-RAY, onboarding, workflows, dashboards) that must be auditable, client-safe, and GitHub-ready

### Default Outputs
- Case positioning statements  
- Evidence inventories  
- No-inference disclosure  
- Portfolio matrices (canonical / duplicate / historical / trash)  
- GitHub-ready READMEs  

### Operating Rules
1. **Case classification first**: Identify primary axis (prompt/skill/agent, workflow, personalization, product) before writing  
2. **Safe claims only**: Never assert production use, real users, ROI, or Anthropic compliance without explicit evidence  
3. **Disclosure mandatory**: Tag missing items as dependencies, not failures  
4. **Source traceability**: Every claim must trace to a file, artifact, or verifiable output  
5. **Redaction when needed**: Replace client names, private data, internal URLs  

### No-Inference Limits
- Cannot claim "used by X clients" without proof  
- Cannot claim "increases productivity by Y%" without baseline  
- Cannot claim "production-ready" without deployment evidence  
- Cannot claim "autoatualização silenciosa" — use "autorregeneração sob controle do usuário"  

### Recurring Workflows
- Extract canonical files from nested zips  
- Build SKILL.md + references + examples structure  
- Validate packaging (folder name = frontmatter name, all referenced files exist)  
- Generate SHA-256 checksums  
- Write case thesis + portfolio matrix  

### Evidence Base
Files in context: X-RAY skills zips, onboarding directories, analytics orchestrators, content workflows, Linear/TDAH workflows. Reference these by name when building cases.

---

## PROJECT 2: Data Analysis & Research

**Purpose**: Structured analytical work: SQL, research synthesis, executive memos, dashboard specs  
**Context**: You're supporting data-driven decisions with explicit decomposition, framework routing, and epistemic discipline

### Default Outputs
- Analytical memos (executive summary + structured analysis + decision table)  
- SQL query plans (before execution)  
- Research briefs (sources + synthesis + gaps)  
- Dashboard specifications  
- Framework-routed recommendations  

### Operating Rules
1. **Intent normalization first**: Convert vague request into explicit problem statement + variables + constraints  
2. **Framework routing**: Choose minimum sufficient lens (MECE, Inversion, Jobs-to-be-Done, 5W2H, etc.) and justify choice  
3. **Schema-first for SQL**: Never write queries without explicit schema, show execution plan before running  
4. **Cite all sources**: Web search and Research results must be cited inline, never paraphrased without attribution  
5.
v2_daily_workflows.md
```

---

## WORKFLOW 3: Portfolio Case Documentation
**Duration**: 60-90 minutes per case  
**Tools**: View uploaded zips + create files  
**Style**: Portfolio Case Builder  
**Output**: GitHub-ready case study  

### Process
```
1. Extract evidence (SKILL.md, examples, artifacts)
2. Classify case (primary axis: prompt/skill/agent, workflow, personalization, product)
3. Identify safe claims vs forbidden claims
4. Build evidence inventory
5. Flag dependencies (missing items)
6. Write disclosure statement
7. Generate README + manifest
8. Validate packaging (folder name = frontmatter name, all refs exist)
```

**Example CMD**:
```yaml
workflow: portfolio_case_builder
inputs:
  - evidence_zip: "analytics-research-orchestrator.zip"
  - case_type: "skill/agent"
  - target_audience: "data_analysts"
  
steps:
  1. extract_evidence(evidence_zip)
  2. classify_case()
     # → Primary: workflow automation
     # → Secondary: research synthesis, BigQuery integration
  3. identify_safe_claims()
     # → Can claim: "Structured research workflow with epistemic controls"
     # → Cannot claim: "Increases productivity 40%" (no baseline)
  4. evidence_inventory()
     # → SKILL.md (validated), 10 references, 4 templates, 2 examples
  5. flag_dependencies()
     # → Missing: 3 input/output examples, redacted screenshots
  6. write_disclosure()
     # → "Needs redaction: client names, internal URLs"
  7. generate_readme()
  8. validate_packaging()
  
outputs:
  - README.md
  - package_manifest.yaml
  - validation_report.json
```

**Meta-explanation** (50 words):  
Evidence-first prevents overpromising. Classification guides positioning. Safe vs forbidden claims build trust. Dependency flagging surfaces gaps without pretending completeness. Validation catches packaging errors pre-upload. 60-90 min produces publication-ready case vs weeks of unclear iteration.

**Practical example**:
```
Case: Analytics Research Orchestrator

Safe claim: "Skill that routes analytical requests through framework selection, intent normalization, BigQuery protocol, and epistemic tagging."

Forbidden claims:
- "Used by 20 analysts" (no deployment)
- "Saves 5 hours/week" (no measurement)

Evidence: analytics-research-orchestrator.zip (29 files, validated)

Dependencies:
- 3 anonymized examples
- Dashboard screenshot with redaction

Disclosure: Needs redaction (internal tool names)
```

---

## WORKFLOW 4: SQL Development Cycle
**Duration**: 20-40 minutes per query  
**Tools**: BigQuery connector + web search (for schema docs)  
**Style**: SQL Protocol  
**Output**: Validated query + execution plan  

### Process
```
1. Get explicit schema (tables, columns, types, relationships)
2. Write query plan in plain language
3. List assumptions
4. Define validation checks
5. Write SQL
6. Execute with EXPLAIN
7. Validate results against checks
8.
v2_style_convergence.md
# V2 — 10 Convergent Style Options
# Each style optimized for specific workflow patterns

---

## STYLE 1: Analytical Decomposition
**When to use**: Data analysis, research synthesis, strategic memos  
**Character limit**: 600 words per section  

**Pattern**:
1. **Normalized request** (50 words) — explicit problem statement  
2. **Framework routing** — which lens + why chosen + what excluded  
3. **Structured analysis** — variables, constraints, dependencies  
4. **Epistemic tags** — fact | hypothesis | inference | gap  
5. **Decision table** — options + criteria + scores  
6. **No-inference limit** — what cannot be claimed  

**Example**:
```
Normalized request: Compare vendor A vs B for data warehouse migration based on cost, migration time, and lock-in risk.

Framework routing: ICE scoring (Impact, Confidence, Effort) + Inversion (how would each fail). Excluded SWOT (too descriptive) and Wardley (overkill for tactical decision).

Analysis:
| Vendor | Cost | Time | Lock-in | Score |
|--------|------|------|---------|-------|
| A | $200k | 6mo | High | 7.2 |
| B | $280k | 4mo | Low | 8.1 |

Epistemic tags:
- FACT: Vendor A quoted $200k (proposal attached)
- HYPOTHESIS: 6mo timeline assumes no schema conflicts
- INFERENCE: Lock-in high due to proprietary connectors
- GAP: No benchmark from similar migrations

No-inference limit: Cannot claim "B is 40% faster" without controlling for team size, schema complexity, data volume.
```

---

## STYLE 2: Portfolio Case Builder
**When to use**: GitHub case studies, skill packaging, evidence documentation  
**Character limit**: Varies by section (summary 300w, evidence inventory unlimited)  

**Pattern**:
1. **Case classification** — primary axis (prompt/skill/agent, workflow, personalization, product)  
2. **Safe claim** — what can be stated with evidence  
3. **Forbidden claims** — what cannot be stated without proof  
4. **Evidence inventory** — files, artifacts, outputs  
5. **Dependencies** — what's missing before publication  
6. **Disclosure** — privacy/redaction status  

**Example**:
```
Case classification: Prompt / skill / agent (primary), workflow automation (secondary)

Safe claim: "Skill-orchestrator that conducts structured onboarding, extracts user context, normalizes work patterns, and generates project instructions + prompt library + skill backlog with epistemic controls."
v2_daily_workflows.md
Normalize request (what's really being asked?)
2. Route to framework (MECE, Inversion, JTBD, 5W2H, etc.)
3. Decompose variables, constraints, dependencies
4. Gather evidence (web search, Research, or query data)
5. Tag epistemics (fact | hypothesis | inference | gap)
6. Generate decision table
7. Surface no-inference limits
```

**Example CMD**:
```yaml
workflow: analytical_request
inputs:
  - raw_request: "Should we migrate from Looker to Tableau?"
  - context: "data_visualization, team_10ppl, budget_concern"
  - evidence: ["current_tool_usage.csv", "vendor_quotes.pdf"]
  
steps:
  1. normalize_intent(raw_request, context)
     # → "Compare Looker vs Tableau on cost, migration effort, feature parity, team learning curve"
  2. route_framework()
     # → ICE scoring + Inversion (failure modes)
  3. decompose()
     # → variables: cost, time, features, risk
     # → constraints: budget ≤$50k, migration ≤6mo
  4. gather_evidence(web_search: "Looker vs Tableau 2026 comparison")
  5. epistemic_tagging()
  6. decision_table()
  7. no_inference_limit()
  
outputs:
  - analytical_memo.md (800 words)
  - decision_table.csv
  - gaps.md
```

**Meta-explanation** (50 words):  
Normalization prevents solving wrong problem. Framework routing avoids checklist mode. Epistemic tags separate opinion from fact. Decision table forces explicit criteria. No-inference limit builds trust by admitting unknowns. 30-45 min beats 2h of unclear back-and-forth.

**Practical example**:
```
Normalized: Compare Looker vs Tableau on TCO, migration risk, and team adoption for 10-person analytics team.

Framework: ICE + Inversion. Excluded SWOT (too generic) and Wardley (overkill for tool swap).

Decision table:
| Tool | Cost | Time | Risk | Score |
|------|------|------|------|-------|
| Looker | $30k | 4mo | Medium | 7.8 |
| Tableau | $45k | 6mo | Low | 8.2 |

No-inference: Cannot claim "20% faster" without controlling for dashboard complexity, data source latency, and team SQL proficiency.
```

---

## WORKFLOW 3: Portfolio Case Documentation
**Duration**: 60-90 minutes per case  
**Tools**: View uploaded zips + create files  
**Style**: Portfolio Case Builder  
**Output**: GitHub-ready case study  

### Process
```
1. Extract evidence (SKILL.md, examples, artifacts)
2. Classify case (primary axis: prompt/skill/agent, workflow, personalization, product)
3. Identify safe claims vs forbidden claims
4. Build evidence inventory
5. Flag dependencies (missing items)
6. Write disclosure statement
7. Generate README + manifest
8.
v2_global_user_preferences.md
# V2 — Global User Preferences
# Personalization layer for portfolio + data analyst workflows

## Identity & Context
**Role**: Consultant / Knowledge operator / Data analyst hybrid  
**Primary work**: AI consulting systems, skill orchestration, portfolio case studies, data analysis + research synthesis  
**Location**: Santos, SP, BR  
**Language mix**: Portuguese (Brazilian) + technical English where useful  
**Skill level**: Low-code with high conceptual depth  
**Device ecosystem**: iPad-first when possible, desktop for Claude Code / terminal work

## Core Operating Principles (from PDF analysis)
1. **Decomposition over decoration**: Break complex requests into variables, constraints, hypotheses, dependencies  
2. **Framework routing**: Choose minimum sufficient analytical lens (MECE, First Principles, Jobs-to-be-Done, 5W2H, Inversion, etc.)  
3. **Epistemic gates**: Separate facts, inferences, hypotheses, gaps, no-inference limits  
4. **Concise structured outputs**: Max 600 words per section unless depth explicitly requested  
5. **Source of truth discipline**: Always cite, never fabricate, mark unknowns as unknowns  
6. **Actionable over academic**: Prefer executable next steps to theoretical completeness

## Response Structure Default
When responding to analytical requests:
1. **Normalized request** (50 words) — what you're actually asking  
2. **Decomposition** (framework + variables + constraints)  
3. **Analysis** (structured, cited, with epistemic tags)  
4. **Gaps & dependencies** (what's unknown, what's assumed)  
5. **Decision options** or **next actions** (executable, not vague)  
6. **No-inference limit** (what I cannot claim without more data)

## Workflow Preferences
- **For quick facts**: Use web search immediately, cite sources  
- **For deep research**: Use Research feature (5+ searches), synthesize with citations  
- **For SQL/data work**: Force explicit schema, show query plan before execution, validate assumptions  
- **For portfolio work**: Reference uploaded zips (X-RAY, skills, case studies), maintain traceability  
- **For documentation**: Generate in Markdown first, convert to DOCX only when client-ready  
- **For code**: Prefer Claude Code for automation, scripts, repo work; use artifacts for demos/prototypes  

## Communication Style
- **Tone**: Professional but not corporate, direct but not blunt  
- **Format**: Structured prose > bullet spam. Use bullets only when listing items, options, or steps  
- **Length**: Default concise (300-600 words).
v2_daily_workflows.md
```

---

## WORKFLOW 6: Skill Packaging Sprint
**Duration**: 90-120 minutes  
**Tools**: Create files + bash for packaging  
**Style**: CMD Protocol + Portfolio Case Builder  
**Output**: Uploadable skill ZIP  

### Process
```
1. Define skill concept (workflow to automate)
2. Write SKILL.md with frontmatter
3. Create directory structure (references/, templates/, examples/, tests/)
4. Write 10+ trigger prompts
5. Write 8+ negative tests
6. Generate README + manifest
7. Validate packaging
8. Create ZIP
```

**Example CMD**:
```yaml
workflow: skill_packaging
inputs:
  - concept: "LinkedIn post research synthesis"
  - target_users: "content_creators, consultants"
  - existing_workflow: "content-research-to-linkedin-post-v3.zip"
  
steps:
  1. define_concept()
  2. write_skill_md()
     # → frontmatter: name, description (<200 chars)
     # → instructions: intake → research → synthesis → post
  3. create_structure()
     # → references/ (style guide, neurocognitive ICP)
     # → templates/ (intake, raw version, bench, caption)
     # → examples/ (3 input/output pairs)
     # → tests/ (trigger prompts, negative tests, QA checklist)
  4. trigger_prompts()
     # → 10+ realistic use cases
  5. negative_tests()
     # → 8+ boundary/unsafe cases
  6. readme_manifest()
  7. validate()
     # → Folder name = frontmatter name?
     # → All refs exist?
     # → Description triggers correctly?
  8. package()
     # → zip -r skill-name.zip skill-name/
  
outputs:
  - skill-name.zip (uploadable)
  - validation_report.json
```

**Meta-explanation** (50 words):  
Concept definition prevents scope creep. Frontmatter compliance ensures upload compatibility. Structure follows Anthropic standards. Trigger prompts improve discovery. Negative tests catch edge cases. Validation prevents packaging errors. 90-120 min produces production-ready skill vs days of unclear iteration.

**Practical example**:
```
Skill: content-research-to-linkedin-post

Structure:
content-research-to-linkedin-post/
  SKILL.md (frontmatter: name, description)
  README.md
  references/
    style-guide.md
    neurocognitive-icp.md
  templates/
    00-intake.md
    01-raw-version.md
    04-converted-obsidian-post.md
    05-linkedin-caption.md
  examples/
    example-research-input.md
    example-converted-post.md
  tests/
    trigger-prompts.md (10+)
    negative-tests.md (8+)

Validation:
✓ Folder name = frontmatter name
✓ All referenced files exist
✓ Description <200 chars
✓ Trigger prompts cover use cases
✓ Negative tests include boundaries

Package: zip -r content-research-to-linkedin-post.zip content-research-to-linkedin-post/
```

---

## WORKFLOW 7: Executive Dashboard Spec
**Duration**: 40-60 minutes  
**Tools**: Visualizer (for mockup) + create files  
**Style**: Workflow Mapping + Analytical Decomposition  
**Output**: Dashboard specification document  

### Process
```
1. Normalize stakeholder request
2. Extract metrics, dimensions, filters, update frequency
3. Check data availability
4.
v2_project_instructions.md
**Frontmatter mandatory**: `name` (lowercase-hyphens only) + `description` (trigger mechanism, <200 chars for claude.ai)  
2. **Folder = name**: Directory name must match frontmatter `name` exactly  
3. **ZIP root = folder**: Never put SKILL.md directly at ZIP root  
4. **Referenced files exist**: Every file mentioned in SKILL.md must be present  
5. **Concise SKILL.md**: Move long content to references/, keep main file focused  

### Packaging Protocol
```bash
# Structure
skill-name/
  SKILL.md
  README.md
  references/
  templates/
  examples/
  scripts/
  tests/

# Package
zip -r skill-name.zip skill-name/

# Validate
- Folder name = frontmatter name?
- All referenced files exist?
- Description triggers correctly?
- Negative tests covered?
```

### Quality Gates
- [ ] `name` field: lowercase, hyphens, no spaces, no XML, <64 chars  
- [ ] `description`: specific enough to trigger, <200 chars  
- [ ] All files in SKILL.md exist in package  
- [ ] Examples are fictional or redacted (no real client data)  
- [ ] Disclaimer present in README and manifest  
- [ ] No claims of production use without evidence  
- [ ] Trigger prompts: 10+ realistic use cases  
- [ ] Negative tests: 8+ boundary/unsafe cases  

### No-Inference Limits
- Cannot claim "used by users" without deployment proof  
- Cannot claim "autoatualização" — must be explicit regeneration  
- Cannot claim Anthropic compliance without final QA  
- Cannot fabricate screenshots or dashboards  

### Recurring Workflows
- Skill concept → directory tree → SKILL.md → validation → ZIP  
- Convert loose prompts into structured skills  
- Extract reusable workflows from portfolio cases  
- Normalize intake → templates → examples → tests  

---

## Cross-Project Rules

### When to use which tool
- **Web search**: Facts, current info, citations needed  
- **Research**: 5+ searches, synthesis, comparative analysis  
- **Extended thinking**: Complex reasoning, strategic decisions  
- **Claude Code**: Automation, repo creation, script execution  
- **Artifacts**: Demos, prototypes, interactive widgets  

### Output Length Guidelines
- **Conversational answers**: 300-600 words default  
- **Analytical memos**: 800-1500 words  
- **Case studies**: 1500-3000 words  
- **Skills**: SKILL.md <150 lines, details in references/  

### Meta-Principle
Every project shares: **decomposition > decoration**, **frameworks over checklists**, **facts > hypotheses > inferences**, **gaps disclosed**, **next actions executable**.
v2_style_convergence.md
This prevents overpromising and sets expectations.

For the case itself, use this structure: `/case-name/SKILL.md` (if it's a skill), `/references/` for long docs, `/examples/` for input/output, `/tests/` for quality gates, and `/templates/` for reusable artifacts. This matches Anthropic's skill packaging standards and makes it uploadable.

Finally, include a disclosure section that flags missing items (e.g., "needs e-book attachment," "redaction pending") instead of pretending they're done. Transparency beats polish.

Want me to scaffold one for you based on an existing case?
```

---

## Style Selection Decision Tree

```
START
  ↓
Is this data/SQL work?
  ├─ YES → SQL Protocol (Style 4)
  └─ NO ↓
  
Is this analytical/strategic?
  ├─ YES → Analytical Decomposition (Style 1)
  └─ NO ↓
  
Is this portfolio/GitHub documentation?
  ├─ YES → Portfolio Case Builder (Style 2)
  └─ NO ↓
  
Is this a quick fact check?
  ├─ YES → Quick Fact Check (Style 8)
  └─ NO ↓
  
Is this explaining a concept?
  ├─ YES → Teaching/Explanation (Style 9)
  └─ NO ↓
  
Default: Conversational (Style 10)
```

---

## Meta-Style Rules (apply to all)

1. **Conciseness default**: Aim for 300-600 words unless depth is needed  
2. **Framework transparency**: Name frameworks used, justify choice, note exclusions  
3. **Epistemic discipline**: Tag facts, hypotheses, inferences, gaps  
4. **No fabrication**: Never invent data, metrics, screenshots, or claims  
5. **Citation when applicable**: Web search, Research, and external sources require inline citations  
6. **Executable next actions**: Avoid "consider X" — give "do Y by Z"  
7. **Disclosure when needed**: Surface dependencies, gaps, redaction needs  

## When styles converge
All styles share: **decomposition over decoration**, **frameworks over checklists**, **structure over stream-of-consciousness**, **evidence over assertion**, **action over advice**.
Now I'll run the full V6 audit engine against the entire portfolio. Let me do this systematically.
{"returncode":0,"stdout":"=== SK-01 adhd ===\n- Accessibility constraints: large text, minimal visual noise, high legibility, clear labels, printable format.\n- Delivery format: PPTX, PDF, Markdown checklist, Linear issue plan.\n## Outputs\nThe standard output bundle is:\n| S2 | Capacity Table | Daily workflow allocation | Workflow, time, priority, input, output, save location, command, DoD |\n2. Identify target user, constraints, stack, workflows, outputs, and risks.\nThis skill supports planning, organization, workflow design, and accessibility-oriented formatting. It is not a medical diagnostic tool and must not advise medication, clinical treatment, or self-diagnosis. For clinical ADHD/TDAH concerns, direct the user to a qualified health professional.\n=== SK-02 empower ===\n3. **Separate structural metrics from quality metrics**: maturity is not the same as validated output quality.\n5. **Preserve raw evidence**: keep source files and normalized outputs traceable.\n6. **Prefer reproducible scripts**: generate outputs with scripts in `scripts/`, not manual one-off analysis.\n7. **Use concise, report-ready outputs**: Markdown summary + CSV/XLSX/JSON artifacts.\n├── examples/\n    └── output_contract.md\nprompt_format\n  --output empower_v4_package \\\n| Mode | Use Case | Output Focus |\nMap data into canonical schema. If fields are missing, infer only when reasonable and mark as proxy or assumption. Missing critical fields must become a gap entry rather than fabricated content.\n  0.20 * output_control +\n- prompt format distribution\n### 7. Generate Outputs\n├── prompt_format_distribution.png\n├── expansion_ratio_by_format.png\n| `<20` interactions | very low / exploratory |\n- Always mark assumptions (`A-###`), risks (`R-###`), metrics (`M-###`), tasks (`T-###`), and decisions (`D-###`) when producing vault-style outputs.\n=== SK-03 cmd-v3 ===\n```xml\n<question id=\"q1_deliverable_type\">\n  <prompt>What type of deliverable do you need?</prompt>\n  <options>\n    <option value=\"research\">Research (market analysis, competitive intel, validation)</option>\n    <option value=\"document\">Document (report, presentation, spreadsheet)</option>\n    <option value=\"analysis\">Analysis (data, code, strategy)</option>\n    <option value=\"creation\">Creation (workflow, system, framework)</option>\n    <option value=\"hybrid\">Hybrid (multi-phase project)</option>\n  </options>\n  <auto_inference>\n    <keywords>\n    </keywords>\n    <display>Show prediction + confidence % → user confirms/overrides</display>\n  </auto_inference>\n</question>\n```xml\n<question id=\"q2_cynefin_classification\">\n  <prompt>What's the complexity level? (Cynefin Framework)</prompt>\n  <options>\n=== SK-07 x-ray-db ===\n  \"padroniza esse output\", \"yaml canônico\", ou handoff explícito de\n  Standalone — não requer MCP. Consome output de x-ray-abs via copy-paste.\n- Desconhecido = `null`. Nunca inventar dado para preencher campo.\n| Output de x-ray-abs         | Fonte factual       | Mapear blocos diretamente ao schema |\n1. Texto bruto / x-ray output (fonte factual)\n| `GAP`           | Informação ausente · campo `null` ou string `\"GAP\"`    |\n  generated_at: <ISO-8601 timestamp>\n    - type: <text|xray_output|spreadsheet|markdown|yaml>\n      identifier: <filename or input ID>\n      epistemic_role: <factual|structural>\n  consultant_id?: <opaque ID, no PII>\n  language: <pt-BR|en|...>\n    contains_personal_data: <true|false|unknown>\n    anonymization_applied: <true|false>\n    notes?: <string>\n  id: <slug>\n  name: <string>\n  type: <consulting_engagement|product_diagnosis|market_analysis|...>\n  stage: <D0|D5|D5-20|D20|D20-35|D35|D35-65|D75-90|D115|D120+>\n  decision_question: <string>\n","stderr":""}
{"returncode":0,"stdout":"=== EXAMPLES PRESENCE ===\n--- adhd-skill ---\ndata\n--- empower-skill ---\ndata\n--- cmd-v3 ---\nuse-cases.md\n--- CMD-02-MIRP (extracted) ---\n=== XML TAG CHECK ACROSS ALL SKILL.md ===\n0\n0 tags: /home/claude/scan/raw/empower-skill/empower-v4-ai-usage-evaluator-skill/SKILL.md\n90 tags: /home/claude/scan/raw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/SKILL.md\n90 tags: /home/claude/scan/raw/files/files/publication-package/skill-package/SKILL.md\n90 tags: /home/claude/scan/raw/files/publication-complete/publication-package/skill-package/SKILL.md\n24 tags: /home/claude/scan/raw/Arquivo/00_CMD_ORCH/SKILL.md\n11 tags: /home/claude/scan/raw/Arquivo/00_CMD_ORCH/mnt/user-data/outputs/x-ray-abs-v3/SKILL.md\n0\n0 tags: /home/claude/scan/raw/adhd-skill/adhd-desk-dashboard-skill/SKILL.md\n=== THINKING INSTRUCTIONS CHECK ===\nNO-THINKING: /home/claude/scan/raw/empower-skill/empower-v4-ai-usage-evaluator-skill/SKILL.md\nNO-THINKING: /home/claude/scan/raw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/SKILL.md\nNO-THINKING: /home/claude/scan/raw/files/files/publication-package/skill-package/SKILL.md\nNO-THINKING: /home/claude/scan/raw/files/publication-complete/publication-package/skill-package/SKILL.md\nNO-THINKING: /home/claude/scan/raw/Arquivo/00_CMD_ORCH/SKILL.md\nNO-THINKING: /home/claude/scan/raw/Arquivo/00_CMD_ORCH/mnt/user-data/outputs/x-ray-abs-v3/SKILL.md\nNO-THINKING: /home/claude/scan/raw/adhd-skill/adhd-desk-dashboard-skill/SKILL.md\n","stderr":""}
{"returncode":0,"stdout":"=== GP-A4 WHY CONTEXT CHECK ===\n1 WHY hits: empower-v4-ai-usage-evaluator-skill\n8 WHY hits: cmd-v3-orchestrator\n8 WHY hits: skill-package\n8 WHY hits: skill-package\n1 WHY hits: 00_CMD_ORCH\n1 WHY hits: x-ray-abs-v3\n0\n0 WHY hits: adhd-desk-dashboard-skill\n=== GP-D1 OUTPUT FORMAT SPEC ===\n/home/claude/scan/raw/empower-skill/empower-v4-ai-usage-evaluator-skill/SKILL.md: 14 format refs\n/home/claude/scan/raw/files/cmd-v3-orchestrator/cmd-v3-orchestrator/SKILL.md: 56 format refs\n/home/claude/scan/raw/files/files/publication-package/skill-package/SKILL.md: 56 format refs\n/home/claude/scan/raw/files/publication-complete/publication-package/skill-package/SKILL.md: 56 format refs\n/home/claude/scan/raw/Arquivo/00_CMD_ORCH/SKILL.md: 14 format refs\n/home/claude/scan/raw/Arquivo/00_CMD_ORCH/mnt/user-data/outputs/x-ray-abs-v3/SKILL.md: 17 format refs\n/home/claude/scan/raw/adhd-skill/adhd-desk-dashboard-skill/SKILL.md: 7 format refs\n=== GP-B1 EXAMPLES CHECK ===\nempower-v4-ai-usage-evaluator-skill: 1 example refs\ncmd-v3-orchestrator: 9 example refs\nskill-package: 9 example refs\nskill-package: 9 example refs\n00_CMD_ORCH: 4 example refs\nx-ray-abs-v3: 2 example refs\nadhd-desk-dashboard-skill: 0\n0 example refs\n=== ADVERSARIAL — SAFE CLAIMS CHECK ===\nempower-v4-ai-usage-evaluator-skill: 1 potential unsafe claims\ncmd-v3-orchestrator: 2 potential unsafe claims\nskill-package: 2 potential unsafe claims\nskill-package: 2 potential unsafe claims\n00_CMD_ORCH: 0\n0 potential unsafe claims\nx-ray-abs-v3: 0\n0 potential unsafe claims\nadhd-desk-dashboard-skill: 0\n0 potential unsafe claims\n","stderr":""}
{"returncode":0,"stdout":"=== XRAY SUITE SKILL.md files ===\nx-ray-orchestrator: xml=0\n0 think=0\n0 examples=0\n0 why=2 outputs=10\nx-ray-onboarding-ebook: xml=6 think=0\n0 examples=0\n0 why=0\n0 outputs=8\nx-ray-client-form: xml=0\n0 think=0\n0 examples=1 why=0\n0 outputs=7\nx-ray-brand-layer: xml=1 think=0\n0 examples=2 why=0\n0 outputs=5\nx-ray-executive-office: xml=0\n0 think=0\n0 examples=0\n0 why=1 outputs=8\nx-ray-self-knowledge: xml=0\n0 think=0\n0 examples=0\n0 why=0\n0 outputs=6\nx-ray-publish-register: xml=0\n0 think=0\n0 examples=0\n0 why=0\n0 outputs=0\n0\nx-ray-skill-packager: xml=0\n0 think=0\n0 examples=0\n0 why=0\n0 outputs=6\n\n=== CMD-01-PPS SKILL.md ===\nCMD-01-PPS: xml=0 think=0 examples=45 why=2 outputs=8\n\n=== CMD-03-MARO SKILL.md ===\nCMD-03-MARO: xml=0 think=0 examples=2 why=0 outputs=22\n","stderr":""}
---
title: "File scanning and workflow preparation"
date: 2026-05-16
account: on.26.leonardo@gmail.com
uuid: e26a43ae-70be-4327-a85c-977b068362d3
messages: 12
tags: []
context: ""
---

**Você** _2026-05-16_

Firt move actv task prompt strctre the plain pre-pare anaylses to Wide pesquisa mode workflows,but hbefrone any act. scan/mece/all files/topdown.

---

**Claude** _2026-05-16_

Acknowledged. Gate held — no Phase 1–5 execution yet. Pre-analysis only: MECE inventory, top-down scan, Wide Research staging plan, then await your greenlight.

Let me first read the file-reading skill to route each file type correctly, then perform the actual scan.
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
{"returncode":0,"stdout":"total 1508\ndrwxr-xr-x 1 claude ubuntu       0 May 16 09:42 .\ndrwxr-xr-x 5 root   root      4096 May 16 09:42 ..\n-rw-r--r-- 1 claude ubuntu   23017 May 16 09:35 Em_contas_de_IA_profissionalmente_estruturadas__a_combinação_de_letramento_-1.notesairdropdocument\n-rw-r--r-- 1 claude ubuntu   79142 May 16 09:36 ai-literacy-governance-ebook.html\n-rw-r--r-- 1 claude ubuntu    9801 May 16 09:35 ai_research_framework_template.xlsx\n-rw-r--r-- 1 claude ubuntu 1278657 May 16 09:36 aigovbrasil-skill-library-executive.numbers\n-rw-r--r-- 1 claude ubuntu   26870 May 16 09:40 aigovbrasil_v3_exec.xlsx\n-rw-r--r-- 1 claude ubuntu   79507 May 16 09:36 az-ai-literacy-ebook.html\n-rw-r--r-- 1 claude ubuntu   10220 May 16 09:38 bussola-unified.skill\n-rw-r--r-- 1 claude ubuntu   15774 May 16 09:37 empower-v4-ai-usage-evaluator_2.skill\n---\n=== /mnt/user-data/uploads/Em_contas_de_IA_profissionalmente_estruturadas__a_combinação_de_letramento_-1.notesairdropdocument ===\n23017 bytes, 2026-05-16 09:35:51.584104000 +0000\n/mnt/user-data/uploads/Em_contas_de_IA_profissionalmente_estruturadas__a_combina\\303\\247\\303\\243o_de_letramento_-1.notesairdropdocument: data\n=== /mnt/user-data/uploads/ai-literacy-governance-ebook.html ===\n79142 bytes, 2026-05-16 09:36:45.225759000 +0000\n/mnt/user-data/uploads/ai-literacy-governance-ebook.html: HTML document, Unicode text, UTF-8 text, with very long lines (527)\n=== /mnt/user-data/uploads/ai_research_framework_template.xlsx ===\n9801 bytes, 2026-05-16 09:35:55.353320000 +0000\n/mnt/user-data/uploads/ai_research_framework_template.xlsx: Microsoft Excel 2007+\n=== /mnt/user-data/uploads/aigovbrasil-skill-library-executive.numbers ===\n1278657 bytes, 2026-05-16 09:36:26.924736000 +0000\n/mnt/user-data/uploads/aigovbrasil-skill-library-executive.numbers: Zip archive data, at least v2.0 to extract, compression method=store\n=== /mnt/user-data/uploads/aigovbrasil_v3_exec.xlsx ===\n26870 bytes, 2026-05-16 09:40:07.989538000 +0000\n/mnt/user-data/uploads/aigovbrasil_v3_exec.xlsx: Microsoft Excel 2007+\n=== /mnt/user-data/uploads/az-ai-literacy-ebook.html ===\n79507 bytes, 2026-05-16 09:36:12.653481000 +0000\n/mnt/user-data/uploads/az-ai-literacy-ebook.html: HTML document, Unicode text, UTF-8 text, with very long lines (314)\n=== /mnt/user-data/uploads/bussola-unified.skill ===\n10220 bytes, 2026-05-16 09:38:27.573440000 +0000\n/mnt/user-data/uploads/bussola-unified.skill: Zip archive data, at least v1.0 to extract, compression method=store\n=== /mnt/user-data/uploads/empower-v4-ai-usage-evaluator_2.skill ===\n15774 bytes, 2026-05-16 09:37:39.618495000 +0000\n/mnt/user-data/uploads/empower-v4-ai-usage-evaluator_2.skill: Zip archive data, at least v2.0 to extract, compression method=deflate\n","stderr":""}
{"returncode":0,"stdout":"=== NOTES AIRDROP ===\nArchive:  /mnt/user-data/uploads/Em_contas_de_IA_profissionalmente_estruturadas__a_combinação_de_letramento_-1.notesairdropdocument\n  End-of-central-directory signature not found.  Either this file is not\n  a zipfile, or it constitutes one disk of a multi-part archive.  In the\n  latter case the central directory and zipfile comment will be found on\n  the last disk(s) of this archive.\nunzip:  cannot find zipfile directory in one of /mnt/user-data/uploads/Em_contas_de_IA_profissionalmente_estruturadas__a_combinação_de_letramento_-1.notesairdropdocument or\n        /mnt/user-data/uploads/Em_contas_de_IA_profissionalmente_estruturadas__a_combinação_de_letramento_-1.notesairdropdocument.zip, and cannot find /mnt/user-data/uploads/Em_contas_de_IA_profissionalmente_estruturadas__a_combinação_de_letramento_-1.notesairdropdocument.ZIP, period.\n","stderr":"/bin/sh: 5: xxd: not found\n"}
{"returncode":0,"stdout":"0000000  \\n 345 263 001  \\n 341 263 001  \\n 335 263 001  \\n 331 263 001\n0000020 022 352 204 001  \\n   E   m       c   o   n   t   a   s       d\n0000040   e       I   A       p   r   o   f   i   s   s   i   o   n   a\n0000060   l   m   e   n   t   e       e   s   t   r   u   t   u   r   a\n0000100   d   a   s   ,       a       c   o   m   b   i   n   a 303 247\n---\nEm contas de IA profissionalmente estruturadas, a combina\no de letramento em IA, personaliza\no de conta, Skills em SKILL.md, frameworks determin\nsticos e conectores aumenta a produtividade e reduz retrabalho em compara\no com contas pouco estruturadas.\nA sua f\nrmula pode virar algo como:\nL + P + S + FD + C \n performance, \n rework\nOnde:\nL = letramento em IA,\nP = personaliza\no da conta,\nS = Skills / SKILL.md,\nFD = frameworks determin\nsticos,\nC = conectores.\nPara o Medium, a estrutura nativa suporta exatamente o tipo de artigo que voc\n quer fazer: t\ntulo, subt\ntulo, formata\nsica, imagens, embeds, c\ndigo, t\npicos e imagem de destaque. O pr\nprio Medium tamb\nm orienta que t\ntulo, subt\ntulo e capa representem bem o conte\ndo e n\no sejam gen\nricos ou sensacionalistas.  \nNa parte de valida\no conceitual, sua tese tamb\nm est\n alinhada ao debate atual sobre AI literacy: a OECD trata IA e educa\no/skills como tema central, e a UNESCO afirma que a alfabetiza\no em IA deve preparar pessoas para uso respons\nvel, seguro e significativo da tecnologia. Isso sustenta o tema da sua tese; j\n a prova do ROI vai depender do seu dataset e do seu m\ntodo.  \nO ponto metodol\ngico mais importante \n este: hoje voc\n est\n medindo principalmente volume de entrega + tempo + intera\no. Isso prova produtividade operacional, mas ainda n\no prova qualidade. Ent\no a leitura correta \n: primeiro voc\n","stderr":""}
Command output contains invalid UTF-8 data.
{"returncode":0,"stdout":"Length: 19556\n\n\nݳ\n\nٳ\n\nEm contas de IA profissionalmente estruturadas, a combinação de letramento em IA, personalização de conta, Skills em SKILL.md, frameworks determinísticos e conectores aumenta a produtividade e reduz retrabalho em comparação com contas pouco estruturadas.”\n\nA sua fórmula pode virar algo como:\n\nL + P + S + FD + C → ↑ performance, ↓ rework\n\nOnde:\nL = letramento em IA,\nP = personalização da conta,\nS = Skills / SKILL.md,\nFD = frameworks determinísticos,\nC = conectores.\n\nPara o Medium, a estrutura nativa suporta exatamente o tipo de artigo que você quer fazer: título, subtítulo, formatação básica, imagens, embeds, código, tópicos e imagem de destaque. O próprio Medium também orienta que título, subtítulo e capa representem bem o conteúdo e não sejam genéricos ou sensacionalistas.  \n\nNa parte de validação conceitual, sua tese também está alinhada ao debate atual sobre AI literacy: a OECD trata IA e educação/skills como tema central, e a UNESCO afirma que a alfabetização em IA deve preparar pessoas para uso responsável, seguro e significativo da tecnologia. Isso sustenta o tema da sua tese; já a prova do ROI vai depender do seu dataset e do seu método.  \n\nO ponto metodológico mais importante é este: hoje você está medindo principalmente volume de entrega + tempo + interação. Isso prova produtividade operacional, mas ainda não prova qualidade. Então a leitura correta é: primeiro você valida “mais estrutura gera mais entrega e menos retrabalho”; depois você pode adicionar um segundo bloco para qualidade, revisões, aderência ao objetivo e utilidade real.\n\nA estrutura de artigo que eu usaria seria:\n\n1. Tese\n2. Contexto e problema\n3. Definições dos termos\n4. Hipótese\n5. Método e dados\n6. Métricas\n7. Resultados\n8. Limitações\n9. Implicações práticas\n10. Framework aberto / próximo passo\n\nAtenção só a um ajuste de linguagem: o termo mais consistente aqui é SKILL.md, não “skill MD”, porque a documentação oficial da Anthropic usa exatamente esse formato de arquivo.  Segue uma versão já normalizada para você usar como base.\n\nAbstract\n\nEste estudo investiga se a combinação de letramento em IA, personalização profissional de conta, uso de Skills/SKILL.md, frameworks determinísticos e conectores melhora a performance operacional de contas de IA. A hipótese é que contas com maior estruturação de contexto, instruções persistentes, workflows reutilizáveis e integração com ferramentas externas produzem mais entregáveis com menos retrabalho do que contas pouco personalizadas. O estudo usa conversas históricas, exportação de dados, análise comparativa entre contas e métricas de tempo, interação e entrega documental para construir um ranking de eficiência. O objetivo final é transformar essa evidência em um framework replicável de onboarding, personalização e reaproveitamento multicanal.\n\nComando amplo de pesquisa\n\nSearch for the closest academic, technical, and practical benchmarks related to:\nAI literacy, prompt engineering, AI account personalization, Claude/LLM Skills and SKILL.md, deterministic frameworks, connectors, productivity, deliverable output, retrabalho/rework reduction, onboarding systems, and cross-platform content repurposing.\nScope:\n1) Include US/global and Brazilian benchmarks.\n2) Prefer primary sources: peer-reviewed papers, preprints, official documentation, standards, and real repositories.\n3) Find the closest conceptual matches, not only exact matches.\n4) For each result, extract: title, year, country/region, method, dataset/sample, main claim, and why it is relevant.\n5) Rate similarity on 4 dimensions: topic, method, tooling, and outcome.\n6) Return a ranked “closest match” list with an explicit note separating evidence from inference.\n7) Also identify the strongest adjacent fields if there is no exact match.\n8) For repurposing, look for research on multi-platform content strategy, cross-media reuse, and content modularization.\n\nO que está mais próximo da sua tese hoje\n\nPelo que encontrei, o seu tema não aparece como uma peça única já fechada; ele surge como um cluster de áreas próximas. A base mais forte é a combinação de AI literacy + prompt engineering, porque há pesquisa mostrando que habilidades de prompt melhores se associam a saídas melhores e que aspectos de AI literacy influenciam esse desempenho.  \n\nA segunda camada próxima é a parte de personalização e estrutura operacional. A documentação oficial da Anthropic mostra que skills estendem o Claude com arquivos SKILL.md, que output styles alteram a forma de responder sem mudar o que o modelo sabe, e que o MCP conecta aplicações de IA a sistemas externos, dados, ferramentas e workflows. Isso se encaixa muito bem na sua ideia de conta profissional com contexto persistente, comandos reutilizáveis e conectores.  \n\nA terceira camada é a de benchmark prático e produtividade. Um estudo de 2025 no arXiv sobre produtividade humana encontrou associação entre prompts claros, estruturados e orientados ao contexto e melhores resultados de tarefa; outro estudo da MDPI mostrou ganhos em habilidades de prompt engineering e ressaltou a importância de supervisão humana.  \n\nNo recorte brasileiro, há pesquisa em português e em contexto acadêmico que conversa diretamente com a sua tese: um artigo da SBC comparou mais de 128 combinações de prompts em português brasileiro para ASAG, e trabalhos da SciELO e da SBC discutem IA generativa, letramento, educação e uso de prompts em contexto nacional.  \n\nPara a parte de reaproveitamento de conteúdo, o que mais se aproxima hoje é a literatura sobre cross-media repurposing e multi-platform strategy, que trata de reutilizar um ativo em vários formatos e canais, embora não seja exatamente o mesmo que o seu sistema de IA. O seu ângulo fica mais forte porque junta isso com personalização de conta e automação de entrega.  \n\nPergunta fundamental principal\n\nA formulação mais forte seria:\n\n“A estruturação profissional de uma conta de IA, combinando letramento, personalização, skills, frameworks determinísticos e conectores, aumenta a produtividade e reduz retrabalho em comparação com uma conta pouco estruturada?”\n\nCinco perguntas adicionais que vão te orientar\n\n1. Quais elementos da conta explicam melhor o ganho: letramento, personalização, skills ou conectores?\n2. O ganho aparece mais em volume de entregas, tempo de produção ou menor retrabalho?\n3. O resultado se mantém quando muda o tipo de tarefa ou só vale para um tipo específico de documento?\n4. Qual é o mínimo de personalização necessário para sair do modo “genérico” para o modo “profissional”?\n5. Como transformar essa metodologia em um sistema replicável para blog, GitHub, LinkedIn, X e YouTube?\n\nTemplate de similaridade em porcentagem\n\nUse uma fórmula simples e defensável: Os principais riscos da sua proposta são estes:\n\n1. Viés de seleção\nPorque as contas mais recentes provavelmente já foram criadas por você com mais maturidade, então elas não só estão “mais personalizadas”, como também podem estar sendo usadas em tarefas melhores, por mais tempo, com objetivos mais claros. Nesse caso, o ganho pode vir da sua evolução como usuário, não só da personalização.\n\n2. Confusão entre correlação e causa\nPorque uma conta com mais entregáveis pode parecer “melhor”, mas talvez ela só receba pedidos mais fáceis, mais frequentes ou mais bem definidos. Isso enfraquece a ideia de que a estrutura da conta foi a causa principal.\n\n3. Métrica fraca ou incompleta\nPorque contar documentos entregues não mede qualidade, utilidade, profundidade, aderência ao objetivo nem retrabalho real. Uma conta pode produzir muito e ainda assim produzir coisa repetitiva ou superficial.\n\n4. Incentivo errado da métrica\nPorque, quando você mede só volume e tempo, o sistema pode favorecer saída rápida e não saída boa. Isso pode distorcer a conclusão do estudo.\n\n5. Dados desiguais entre contas\nPorque cada conta pode ter número diferente de interações, tipos de tarefa diferentes, níveis distintos de complexidade e períodos diferentes de uso. Sem normalização, o r\n","stderr":""}
{"returncode":0,"stdout":"anking pode ficar injusto.\n\n6. Viés de confirmação\nPorque você já suspeita que a última conta é a melhor. Isso é natural, mas precisa ser controlado para não virar conclusão antes da análise.\n\n7. Efeito de novidade\nPorque a última conta pode ter sido usada num momento em que você estava mais atento, mais motivado e mais estratégico. O ganho pode ser temporal, não estrutural.\n\n8. Reprodutibilidade fraca\nPorque, se o método depender muito do seu julgamento manual, outra pessoa pode chegar a resultados diferentes. Isso enfraquece a força científica do trabalho.\n\n9. Privacidade e sensibilidade dos dados\nPorque exportar conversas pode expor dados pessoais, projetos, estratégias ou informações de terceiros. Isso precisa de cuidado no texto e na publicação.\n\n10. Mudança de plataforma e ferramenta\nPorque o comportamento do modelo, das skills e dos conectores pode mudar com o tempo. Então a tese precisa dizer claramente o período analisado.\n\nComo comprovar melhor a proposta\n\nA melhor forma é usar camadas de prova, não só um número final.\n\nCamada 1: prova operacional\nMostra quantos entregáveis cada conta gerou, em quanto tempo, com quantas interações e com qual taxa de retrabalho.\n\nCamada 2: prova comparativa\nCompara contas parecidas em tarefas parecidas. Isso ajuda a reduzir injustiça entre casos muito diferentes.\n\nCamada 3: prova de mecanismo\nMostra por que a conta melhorou: mais contexto, mais persistência, melhor prompt, melhor workflow, skill reutilizável, melhor conectividade.\n\nCamada 4: prova de robustez\nMostra que o resultado continua parecido quando você muda o recorte, a janela de tempo ou o tipo de tarefa.\n\nO que mais você deveria incluir\n\n1. Definição clara de “ROI”\nSeu ROI precisa ser escrito como fórmula. Exemplo:\n\nROI operacional = entregáveis úteis / tempo investido\n\nDepois você pode adicionar fatores de ajuste, como complexidade da tarefa e número de revisões.\n\n2. Classificação de tarefas por dificuldade\nSem isso, você compara coisas muito diferentes. Uma tarefa simples não pode valer o mesmo que uma tarefa complexa.\n\n3. Rubrica de qualidade mínima\nMesmo que a primeira versão do estudo foque em volume, crie um score simples de qualidade: aderência ao pedido, completude, clareza e necessidade de retrabalho.\n\n4. Linha de base\nVocê precisa definir qual é o “antes”: conta genérica, sem personalização, sem skills, sem conectores.\n\n5. Análise de ablação Risco Principal\tPor que é um risco\tImpacto na tese\tEstratégia de mitigação\tMétrica / mecanismo de prova\nViés de seleção\tAs contas mais recentes podem refletir sua evolução pessoal e não apenas melhor personalização\tPode invalidar a causalidade da tese\tComparar contas em períodos e tipos de tarefa semelhantes\tNormalização por período, tipo de tarefa e volume de uso\nCorrelação ≠ causalidade\tContas mais produtivas podem apenas receber tarefas mais fáceis\tEnfraquece a conclusão central\tFazer análise de ablação (remover componentes individualmente)\tComparação incremental: sem personalização vs parcial vs completa\nMétrica operacional incompleta\tVolume de entregas não mede qualidade\tPode gerar falsa percepção de ganho\tAdicionar score mínimo de qualidade\tÍndice composto: entregas + retrabalho + aderência\nIncentivo errado da métrica\tO sistema pode favorecer rapidez em vez de utilidade\tResultado operacional artificial\tSeparar produtividade de qualidade\tTempo por entregável + score qualitativo\nDados desiguais entre contas\tCada conta possui histórico e contexto diferentes\tComparação injusta\tCriar categorias padronizadas de tarefas\tClusterização por categoria operacional\nViés de confirmação\tVocê já acredita que a última conta é melhor\tPode contaminar interpretação\tDefinir critérios antes da análise\tRubrica fixa e pré-definida\nMudança temporal do modelo\tO modelo de IA pode ter evoluído ao longo dos meses\tParte do ganho pode vir do modelo e não da conta\tRegistrar versão/período do modelo\tJanela temporal e controle cronológico\nFalta de reprodutibilidade\tOutro pesquisador pode não conseguir repetir\tReduz credibilidade científica\tPublicar metodologia e estrutura dos dados\tRepositório GitHub + schema documentado\nSubjetividade na análise\tJulgamentos manuais podem variar\tReduz confiabilidade\tCriar critérios objetivos\tRubricas quantitativas\nComplexidade diferente das tarefas\tNem todo documento possui mesmo esforço\tMétrica fica enviesada\tClassificar dificuldade das tarefas\tScore de complexidade\nDependência excessiva de contexto humano\tO resultado pode depender mais do operador do que da conta\tDificulta generalização\tSeparar efeito humano do efeito estrutural\tComparar workflows similares\nOverfitting do framework\tO sistema pode funcionar apenas para seu caso\tBaixa generalização\tTestar em múltiplos cenários\tBenchmark cruzado\nPrivacidade e sensibilidade dos dados\tConversas podem conter dados críticos\tRisco ético e legal\tAnonimização e filtragem\tPipeline de sanitização\nDefinição vaga de ROI\tROI sem fórmula clara enfraquece o estudo\tDificulta validação\tFormalizar equação operacional\tROI = entregáveis úteis / tempo\nAusência de baseline\tSem um “antes”, não existe comparação real\tTese fica abstrata\tDefinir conta genérica padrão\tBenchmark inicial\nDependência de features específicas\tSkills/MCP podem mudar no futuro\tEstudo envelhece rápido\tExplicar princípios gerais\tSeparar conceito de implementação\nFalta de análise de retrabalho\tPode haver muito output com muita revisão\tResultado ilusório\tMedir revisões e loops\tTaxa de retrabalho\nFoco excessivo em quantidade\tMais documentos ≠ mais valor\tPode parecer automação vazia\tMedir utilidade percebida\tÍndice de utilidade\nEscopo amplo demais\tMuitos conceitos ao mesmo tempo\tArtigo perde foco\tSeparar tese principal e extensões\tEstrutura modular\nFalta de benchmark externo\tSem comparação externa, estudo fica isolado\tMenor credibilidade\tReferenciar papers e frameworks próximos\tSimilarity score (%)\n\nMétricas principais recomendadas\n\nCategoria\tMétrica\nProdutividade\tEntregáveis por hora\nEficiência\tTempo médio por entregável\nRetrabalho\tNúmero médio de revisões\nPersistência contextual\tQuantidade de reutilização de prompts/workflows\nEstruturação\tNúmero de skills, conectores e frameworks ativos\nComplexidade\tScore de dificuldade da tarefa\nQualidade\tRubrica de aderência/completude\nROI operacional\tValor útil entregue / tempo investido\nModularidade\tTaxa de reaproveitamento de artefatos\nEscalabilidade\tQuantidade de plataformas reaproveitadas\n\nEstrutura de prova recomendada\n\nCamada\tObjetivo\nProva operacional\tMostrar aumento de output\nProva comparativa\tMostrar diferença entre contas\nProva estrutural\tMostrar impacto da personalização\nProva causal parcial\tMostrar ganho incremental\nProva de robustez\tValidar em cenários diferentes\nProva de replicabilidade\tPermitir repetição do método\n\nHipótese central refinada\n\n“Contas de IA profissionalmente estruturadas, combinando letramento, personalização persistente, skills reutilizáveis, frameworks determinísticos e conectores, tendem a produzir maior eficiência operacional e menor retrabalho do que contas não estruturadas.”\nMuito importante. Você remove um componente por vez e vê o que acontece. Exemplo: conta com tudo; depois sem skill; depois sem conectores; depois sem personalização. Isso ajuda a identificar o que realmente importa.\n\n6. Amostra explicada\nDiga quantas contas, quantas conversas, qual período, quais tipos de entrega e quais critérios de inclusão/exclusão.\n\n7. Declaração de limitações\nIsso aumenta a credibilidade. Exemplo: estudo exploratório, n=12 contas, dados autorais, sem generalização universal.\n\nEm resumo\n\nO maior risco não é a tese estar errada.\nO maior risco é ela ficar fraca metodologicamente e alguém dizer: “isso parece interessante, mas não prova causalidade”.\n\nSe você quiser deixar isso forte, o ideal é provar nesta ordem:\n\nestrutura da conta → melhora operacional → redução de retrabalho → ganho de produtividade → hipótese de framework replicável.\n\nPosso transformar isso agora em um  quadro de riscos + mitigação + métrica de prova pronto para entrar no seu artigo ou na sua planilha.\n\n* Topic overlap: 30%\n* Method overlap: 20%\n* Tooling overlap: 20%\n* Outcome overlap: 15%\n* Context overlap: 15%\n\nDepois calcule a média ponderada e classifique assim:\n0–20% = distante\n21–40% = relacionado\n41–60% = próximo\n61–80% = muito próximo\n81–100% = praticamente o mesmo problema\n\nEu já deixei a planilha base pronta com abas de abstract, perguntas, log de fontes, rubric de similaridade e mapa de reaproveitamento: baixar a planilha.* \nJ\naTA*\n5\n\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\ni%\nYN%\nR\nΉh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nP\nTH+\nTQ\nyzh\n*\n\t\nJ\n7\nG\nY\n_\nh\n*\nJ\n>\nI\nH\ns\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n-\nK\no\nr\n@\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nH\nIO\n A?k<\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n1\n7\n@\nys\nF\n{\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nh:\nG\nOv\nc\n-h\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nI\nNkJ\n_h\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n/\n+\nLŅ$\ni6\nWh\n*\n$\nJ\n7\nG\nY\n_\nh\n*\nJ\nT\n \nNY\n-\n`h\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n}\nK\nK\n̪\nqE\nh\n*\nQ\nJ\n7\nG\nY\n_\nh\n*\nJ\n^\n]WMъڧ:\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nKZ%\nCH\n$3\nB,\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n|\nn\n@̸T\np\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nD\nQEO6\nr\nZh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n=:\n4\nqL.\n#\n6\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nz)U7\nJ\nS6!\n:;\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n}-\nY\nC\n$\nc\n`h\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n1\nF}\nI#\n[TSwTh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n\nO5\n \n_\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n7\nIڼ[D8R\nBh\n*\n/\nJ\n7\nG\nY\n_\nh\n*\nJ\nmD\n*Yu\nIh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n/\n4X\nN\n!\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nN\nZ\nN\n߆\n;lIh\n*\nj\nJ\n7\nG\nY\n_\nh\n*\nJ\n@\nYׯAC\nz\n6\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nl\n@\n6\n \n*eWh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nj\nZM\nD˰\n;p.\\h\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n\t\nI\nb\n;o\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nUƶU\n@\n~\n#\n(h\n*\n \nJ\n7\nG\nY\n_\nh\n*\nJ\nr+\nۦH\n.\njh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n'\nN& C\n'\nbz\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nB\nt\nFM\n@\n~Hh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n;\nI\n=>\nK\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n+\ns\"A\nu/=\nP\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nN\n9H|\nϼY\neh\n*\n'\nJ\n7\nG\nY\n_\nh\n*\nJ\ne2Z\nK\nP\n6h\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nIQc\nM\nc\nh\n*\n@\nJ\n7\nG\nY\n_\nh\n*\nJ\n%/\nB\nĐ\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\ntuP\n!E\na\nw\n%\nh\n*\nk\nJ\n7\nG\nY\n_\nh\n*\nJ\n4\n.\n4D\n]Y\n%Myh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nOryF\nBG\nt<\nXh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n\"wi\nNc\n[[ \nRh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\nD\n~p\nO\n :\nu\nh\n*\nJ\n7\nG\nY\n_\nh\n*\nJ\n>Z\nɺ\"Fȓ|\nO\neh\n*\n2\nJ\n7\nG\nY\n_\nh\n*\nJ\nv@B\nIb\nJ\nF$\nXh\n*\n6\nJ\n7\nG\nY\n_\nh\n*\nJ\n\\\n}N\nIn\n>\nB\nޝh\n*\n`\nJ\n7\nG\nY\n_\nh\n*\nJ\nif\nA0G\n喫k \nh\n*\n,\nJ\n7\nG\nY\n_\nh\n*\nJ\noGK\nNy\nb\n(\nyh\n","stderr":""}
{"returncode":0,"stdout":"=== BUSSOLA SKILL ===\nArchive:  /mnt/user-data/uploads/bussola-unified.skill\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-04-28 05:50   bussola-unified/\n    26299  2026-04-28 14:25   bussola-unified/SKILL.md\n---------                     -------\n    26299                     2 files\n\n=== EMPOWER V4 SKILL ===\nArchive:  /mnt/user-data/uploads/empower-v4-ai-usage-evaluator_2.skill\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n    17960  2026-05-07 01:08   empower-v4-ai-usage-evaluator/SKILL.md\n    38068  2026-05-07 01:08   empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py\n---------                     -------\n    56028                     2 files\n","stderr":""}
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/bussola-unified.skill\n   creating: ./bussola/bussola-unified/\n  inflating: ./bussola/bussola-unified/SKILL.md  \nArchive:  /mnt/user-data/uploads/empower-v4-ai-usage-evaluator_2.skill\n  inflating: ./empower/empower-v4-ai-usage-evaluator/SKILL.md  \n  inflating: ./empower/empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py  \n---\n=== BUSSOLA HEAD ===\n---\nname: bussola-unified\nversion: 3.1.0\ndescription: >\n  Co-piloto consultivo end-to-end para PMEs brasileiras. Executa as 9 fases do\n  método Bússola — do intake ao HTML interativo final — com governança de gates\n  (G0–G6) e produção de 28 artefatos em 3 trilhas. Use para qualquer atendimento\n  PME estruturado: iniciar ou retomar caso, avançar fase, rodar diagnóstico,\n  priorizar problemas, gerar plano de ação, simular cenários, fazer handoff para\n  Linear ou montar showcase de portfólio. Use também quando o usuário enviar\n  briefing de cliente pedindo análise estruturada, ou tiver dúvidas sobre o método,\n  módulos ou gates Bússola. Não use para estratégia genérica sem cliente real —\n  nesses casos use hunter4-1.\ncompatibility:\n  calls_external:\n    - artifact-engineer          # Fase 7 — HTML interativo (OBRIGATÓRIO após G4+G5)\n    - execution-bridge           # Fase 8 — Linear + Slack (requer G6 hardcoded)\n    - bussola-case1-showroom     # Fase 9 — showcase portfólio (opcional, requer qa verde)\n  tools:\n    - ask_user_input_v0\n    - create_file\n    - visualize:show_widget\n    - mcp__linear\n    - mcp__slack\n    - mcp__google_drive\n    - mcp__gmail\n---\n\n# bussola-unified\n\nCo-piloto consultivo completo para PMEs brasileiras. Executa as 9 fases do método\nBússola PME com governança de gates, rastreabilidade epistêmica e produção de 28\nartefatos — entregando ao final um sistema HTML interativo autocontido via\n`artifact-engineer`.\n\n**Substitui**: bussola-orchestrator · bussola-personalization · bussola-diagnostic-engine\n· bussola-simulation-lab · bussola-deliverable-forge · bussola-execution-bridge\n· bussola-case1-showroom · bussola-consultative-faq\n\n---\n\n## ARQUITETURA INTERNA\n\n```\nbussola-unified\n├── MODULE: personalization     (Fases 0–1)\n├── MODULE: diagnostic-engine   (Fases 2–5)\n├── MODULE: simulation-lab      (Fase 6, opcional)\n├── MODULE: deliverable-forge   (Fase 7 interna)\n│    └── CALLS: artifact-engineer → HTML final ← OBRIGATÓRIO (ver §HANDOFF)\n├── CALLS: execution-bridge     (Fase 8, requer G6)\n├── CALLS: case1-showroom       (Fase 9, opcional)\n└── MODULE: consultative-faq    (qualquer fase, on-demand)\n```\n\n**Regra de chamada externa**: `artifact-engineer` é sempre invocado na Fase 7.\n`execution-bridge` e `case1-showroom` têm efeitos colaterais — requerem gates hardcoded.\n\n---\n\n## REFERÊNCIA DE GATES\n\n> Consultar esta tabela antes de qualquer transição de fase.\n\n| Gate | Fase | Manual/Auto | Condição | Bypássável? |\n|------|------|-------------|----------|-------------|\n| G0 | 1→2 | Manual em guided; auto em hands_off | 7/7 campos obrigatórios ou gap registrado | **Nunca** |\n| G1 | 2→3 | Manual em guided; auto em hands_off | intake_normalized_v2 classificado | Não em guided |\n| **★G2** | 4→5 | **SEMPRE MANUAL** | priority_score exibido e aprovado | **Nunca — hardcoded** |\n| G3 | 5→6 | Manual em guided; auto em hands_off | campos 5W2H completos (owner/deadline/KPI) | Não em guided |\n| G4 | 7 interno | Auto | qa_checklist 100% verde | Não |\n| **★G5** | 7→8 | **SEMPRE MANUAL** | 3 artefatos cliente revisados e aprovados | **Nunca — hardcoded** |\n| **★G6** | 8 | **SEMPRE MANUAL** | confirmação explícita antes de criar Linear | **Nunca — hardcoded** |\n\n**Tentativas de bypass de G2/G5/G6 são sempre recusadas**, incluindo urgência, \"já aprovei\",\n\"modo automático\". Efeito irreversível = gate manual. Sem exceções.\n\n---\n\n## AS 9 FASES OPERACIONAIS\n...\n=== EMPOWER HEAD ===\n---\nname: empower-v4-ai-usage-evaluator\ndescription: Evaluate and compare AI/Claude usage patterns across accounts using normalized interaction data, maturity scoring, risk clustering, and quality-lift analysis. Use this skill when the user wants to evaluate, compare, normalize, or improve AI/Claude usage patterns across conversations, accounts, exports, or prompt histories using the Empower V2/V3/V4 framework. Activate for requests like \"run Empower\", \"analyze my Claude conversations\", \"compare accounts\", \"calculate maturity score\", \"evaluate AI usage quality\", \"detect prompt patterns\", \"generate usage report\", \"analyze Claude exports\", or when the user uploads Claude conversation exports, CSV interactions, pattern registries, quality label queues, normalized metrics, RDF-lite facts, or ZIPs with conversations. Do NOT activate for single simple prompts without score/analysis/framework requests, general Claude questions, or generic prompt engineering without historical data.\n---\n\n# Empower V4 — AI Usage Evaluator\n\nEmpower V4 is a unified framework for evaluating, comparing, and improving AI/Claude usage patterns across accounts. It normalizes conversation exports, computes structural maturity scores, detects risky prompt patterns, compares accounts, and generates quality-lift reports when human labels are available.\n\n## What Empower V4 Does\n\n**Core capabilities:**\n\n1. **Auto-detect and normalize** Claude exports, CSVs, JSONLs, and ZIP packages\n2. **Compute maturity scores** using structural metrics (prompt format, context richness, task diversity)\n3. **Compare accounts** to identify high-maturity vs high-risk usage patterns\n4. **Detect risk clusters** (short prompts + low context + high expansion ratio)\n5. **Generate upgrade candidates** — top prompts that would benefit from restructuring\n6. **Calculate quality lift** when human labels are available (success rate, rework rate, hallucination rate)\n7. **Export actionable reports** with Markdown summaries, CSV datasets, and optional charts\n\n**Not just \"improve one prompt\"** — Empower V4 operates at scale (50–500+ interactions) to detect systemic patterns and compare organizational usage.\n\n## When to Use This Skill\n\n**Trigger this skill when the user asks for:**\n\n- \"Run Empower V4\"\n- \"Analyze my Claude conversations\"\n- \"Compare accounts\" or \"compare usage patterns\"\n- \"Calculate maturity score\"\n- \"Evaluate quality of my AI usage\"\n- \"Detect risky prompt patterns\"\n- \"Generate usage report\"\n- \"Analyze Claude exports\"\n- \"Improve my evaluation system\"\n- \"Run V2/V3/V4 framework\"\n\n**Also trigger when the user uploads:**\n\n- Claude conversation exports (ZIP, JSON)\n- CSVs with interaction data\n- `ai_interaction_canonical_valid_only.csv`\n- `pattern_registry.csv`\n- `normalized_account_metrics.csv`\n- `quality_label_queue.csv`\n- `quality_labels_completed.csv`\n- RDF-lite fact tables\n- Multiple account exports in ZIP\n\n**Do NOT trigger for:**\n\n- Single prompt improvement requests without analysis/scoring\n- General Claude questions\n- Prompt engineering advice without historical data\n\n## Workflow Overview\n\n```\n1. INPUT DETECTION\n   ├─ Auto-detect format (CSV, JSONL, ZIP, raw export)\n   └─ Select pipeline: canonical / raw_claude / quick_proxy\n\n2. NORMALIZATION\n   ├─ Extract interactions (user_prompt, assistant_response)\n   ├─ Classify task_type, prompt_format, context_richness\n   └─ Generate canonical schema\n\n3. STRUCTURAL ANALYSIS\n   ├─ Compute maturity score per account\n   ├─ Detect prompt format distribution\n   ├─ Calculate expansion ratios\n   └─ Identify risk clusters\n\n4. ACCOUNT COMPARISON\n   ├─ Compare maturity scores\n   ├─ Identify strongest/weakest patterns\n   └─ Flag imbalanced datasets\n\n5. UPGRADE CANDIDATES\n","stderr":""}
{"returncode":0,"stdout":"=== BUSSOLA SECTIONS ===\n29:# bussola-unified\n42:## ARQUITETURA INTERNA\n61:## REFERÊNCIA DE GATES\n80:## AS 9 FASES OPERACIONAIS\n97:## DASHBOARD DE STATUS (exibir a cada fase)\n118:## MODULE: PERSONALIZATION (Fases 0–1)\n120:### Fase 0 — Configuração do Consultor\n125:#### Passo 0.1 — Coleta via ask_user_input_v0\n136:#### Passo 0.2 — Perfis pré-calibrados\n143:#### Passo 0.3 — Validação e persistência\n154:### Fase 1 — Intake do Cliente\n159:#### Os 10 campos do intake\n174:#### Fluxo de coleta\n188:## MODULE: DIAGNOSTIC-ENGINE (Fases 2–5)\n190:### As 10 Regras de Conduta\n207:### Fase 2 — Normalização Epistêmica\n219:### Fase 3 — Diagnóstico + Árvore Causal\n224:#### Tabela de roteamento de módulos (module_router)\n243:### Fase 4 — Priorização\n248:#### Fórmula de score\n265:### Fase 5 — Plano de Ação 5W2H\n270:#### Campos obrigatórios por item\n290:## MODULE: SIMULATION-LAB (Fase 6 — Opcional)\n308:## MODULE: DELIVERABLE-FORGE (Fase 7 Interna)\n310:### Os 28 Artefatos\n312:#### Trilha Interna (9)\n325:#### Trilha Cliente (8)\n337:#### Trilha Governança (11)\n352:### Regras de separação de trilhas\n364:### Gate G4 — QA Terminal (qa_checklist_runner)\n383:## HANDOFF: artifact-engineer (Fase 7 — OBRIGATÓRIO)\n387:### ENVIA para artifact-engineer\n427:### RECEBE de artifact-engineer\n432:### Se artifact-engineer falhar ou retornar incompleto\n439:### Design system canônico (repassar verbatim)\n459:## CHAMADA EXTERNA: execution-bridge (Fase 8)\n475:#### Fluxo Linear\n486:## CHAMADA EXTERNA: case1-showroom (Fase 9 — Opcional)\n499:## MODULE: CONSULTATIVE-FAQ (on-demand, qualquer fase)\n516:## manifest.yaml — Estrutura Canônica\n\n=== EMPOWER SECTIONS ===\n6:# Empower V4 — AI Usage Evaluator\n10:## What Empower V4 Does\n24:## When to Use This Skill\n57:## Workflow Overview\n98:## Input Formats\n100:### Primary Format (Canonical)\n123:### Also Accepts\n131:### Auto-Detection Logic\n144:## Execution Modes\n148:### `--mode quick`\n151:### `--mode compare`\n154:### `--mode full` (default)\n157:### `--mode labels`\n160:### `--mode upgrade`\n163:### `--mode all`\n166:## Account Identification\n186:## Quality Labels\n188:### Expected Format\n205:### Join Logic\n213:### Partial Labels OK\n226:## Confidence Thresholds\n228:### Per Account\n237:### For Human Labels\n246:### For Account Comparison\n256:## Output Structure\n258:### Minimum Outputs\n272:### With Charts (if matplotlib available)\n289:## Maturity Score Formula\n314:## Baseline & Lift Calculation\n316:### Three Baseline Types\n338:### Lift Formula\n356:## Actionable Report Requirements\n368:### Prompt Upgrade Candidate Criteria\n389:## Versioning & Compatibility\n393:### Supported Formats\n416:## Using the Skill\n418:### Step 1: Understand User Intent\n433:### Step 2: Auto-Detect Input Format\n441:### Step 3: Run Normalization\n450:### Step 4: Execute Analysis\n\n=== EMPOWER SCRIPT LINES ===\n894 ./empower/empower-v4-ai-usage-evaluator/scripts/empower_v4_evaluator.py\n#!/usr/bin/env python3\n\"\"\"\nEmpower V4 — AI Usage Evaluator\n\nNormalizes Claude/AI conversation exports, computes maturity scores,\ndetects risky prompt patterns, compares accounts, and generates\nquality-lift reports when human labels are available.\n\nUsage:\n    python empower_v4_evaluator.py --input data.csv --mode full --output ./out\n\"\"\"\n\nimport argparse\nimport hashlib\nimport json\nimport sys\nfrom datetime import datetime\nfrom pathlib import Path\nfrom typing import Any, Dict, List, Optional, Tuple\n\nimport pandas as pd\n\n# Optional dependencies\ntry:\n    import matplotlib.pyplot as plt\n    import matplotlib\n    matplotlib.use('Agg')  # Non-interactive backend\n    CHARTS_AVAILABLE = True\nexcept ImportError:\n    CHARTS_AVAILABLE = False\n","stderr":""}
{"returncode":0,"stdout":"## Maturity Score Formula\n\nFrom V3 specification:\n\n```python\nmaturity = 1 + 4 * (\n    0.30 * prompt_structure +\n    0.25 * context_richness +\n    0.20 * output_control +\n    0.10 * task_diversity +\n    0.10 * high_value_task_share +\n    0.05 * evidence_attachment\n)\n```\n\n**Maturity levels:**\n\n```\n1.0–1.9  →  L1 Ad-hoc\n2.0–2.9  →  L2 Functional\n3.0–3.9  →  L3 Structured\n4.0–4.5  →  L4 Optimized\n4.6–5.0  →  L5 Systematic\n```\n\n## Baseline & Lift Calculation\n\n### Three Baseline Types\n\n**A. Internal Global Baseline**\n\nDefault. Baseline = mean of all interactions.\n\nUse: Compare each account against general behavior.\n\n**B. Baseline Per Account**\n\nBaseline = first time window of same account.\n\nUse: Before vs after analysis.\n\n**C. Baseline by Weak Pattern**\n\n**Most important for Empower.**\n\nBaseline = `short_direct + low_context`\n\nUse: Calculate lift of structured/high-context against weak baseline.\n\n### Lift Formula\n\n```python\nlift = improved_rate / baseline_rate\ndelta = improved_rate - baseline_rate\nnormalized_delta = (improved_rate - baseline_rate) / baseline_rate\n```\n\n**Without human labels:** Apply only to structural/proxy metrics.\n\n**With human labels:** Apply to:\n- `success_1st_turn`\n- `usefulness_score`\n- `rework_rate`\n- `hallucination_rate`\n- `precision_score`\n- `clarity_score`\n\n## Actionable Report Requirements\n\nEvery report must include:\n\n1. **Top 10 prompts to rewrite** — with reasons + suggested upgrades\n","stderr":""}
{"returncode":0,"stdout":"=== AI RESEARCH FRAMEWORK TEMPLATE ===\n## Sheet: README\n\nItem\tContent\nWorking title\tLetramento em IA, personalização profissional e Skills: um estudo sobre produtividade e redução de retrabalho\nAbstract\tEste estudo investiga se a combinação de letramento em IA, personalização profissional de conta, uso de Skills/ SKILL.md, frameworks determinísticos e conectores melhora a performance operacional de contas de IA. A hipótese é que contas com maior estruturação de contexto, instruções persistentes, workflows reutilizáveis e integração com ferramentas externas produzem mais entregáveis com menos retrabalho do que contas pouco personalizadas. O estudo usa conversas históricas, exportação de dados, análise comparativa entre contas e métricas de tempo, interação e entrega documental para construir um ranking de eficiência. O resultado esperado é um framework replicável para onboarding, personalização e expansão multicanal de conteúdo.\nBroad search command\tSearch for the closest academic and practical benchmarks to: AI literacy, prompt engineering, AI account personalization, SKILL.md / skills, deterministic frameworks, connectors, productivity, rework reduction, cross-platform content repurposing, and onboarding systems. Include US and Brazil. Prefer peer-reviewed papers, official documentation, repositories, and benchmark studies. Return the closest matches, summarize methods, report similarity by dimension (topic, method, tooling, outcome), and separate evidence from inference.\nFundamental research question\tDoes structured AI account design measurably improve deliverable output and reduce rework compared with unstructured usage?\n\n## Sheet: Questions\n\nCore questions\n1. Which published work is conceptually closest to this thesis?\n2. Which benchmarks exist in the US and Brazil for AI literacy, prompt engineering, and workflow personalization?\n3. What operating model best explains gains from personalization, skills, and connectors?\n4. How should ROI be measured when comparing accounts with different histories and purposes?\n5. Which quality controls are needed before claiming that higher volume means better output?\n6. What minimum evidence is needed to publish this as a credible benchmark?\n7. How can the framework be repurposed into blog, Medium, GitHub, LinkedIn, X, and YouTube formats?\n8. What should be standardized in the onboarding so the system remains reproducible?\n\n## Sheet: Source Log\n\nID\tQuery / Search term\tSource type\tTitle\tAuthor / Org\tYear\tCountry / Region\tMethod\tMain claim\tWhy it matters\tSimilarity score (0-100)\tURL\tNotes\nS1\tAI literacy + prompt engineering\tPaper\tAI Literacy and its Implications for Prompt Engineering Strategies\tKnoth et al.\t2024\tGermany\tQualitative / conceptual + empirical\tAI literacy and prompt engineering are linked; stronger prompting predicts better output\tClosest conceptual match to your letramento + prompting thesis\t\thttps://papers.ssrn.com/sol3/papers.cfm?abstract_id=4805867\tUse as primary benchmark for the thesis core\nS2\tprompt engineering productivity\tPaper\tPrompt Engineering and the Effectiveness of Large Language Models in Enhancing Human Productivity\tAnam\t2025\tGlobal\tSurvey\tClear, structured, context-aware prompts are associated with higher task efficiency\tSupports your productivity claim\t\thttps://arxiv.org/abs/2507.18638\tNeeds full-text review\nS3\tskills and modular workflows\tOfficial docs\tExtend Claude with skills\tAnthropic\t2026\tUS\tDocumentation\tSkills extend capabilities with reusable instructions and can be loaded when relevant\tMaps directly to your SKILL.md / reusable workflow concept\t\thttps://code.claude.com/docs/en/skills\tOfficial source\nS4\tconnectors and external tools\tOfficial docs\tWhat is the Model Context Protocol (MCP)?\tAnthropic / MCP\t2026\tGlobal\tSpecification\tMCP standardizes connections between AI apps and tools/data/workflows\tSupports your connector layer\t\thttps://modelcontextprotocol.io/docs/getting-started/intro\tOfficial source\n\n## Sheet: Similarity Rubric\n\nDimension\tWeight\tHow to score\tEvidence to collect\tNotes\nTopic overlap\t30%\t0-5 scale, convert to percent\tShared concepts, keywords, problem framing\tMost important dimension\nMethod overlap\t20%\t0-5 scale, convert to percent\tExperimental design, metrics, dataset\tMatches your export-and-rank approach\nTooling overlap\t20%\t0-5 scale, convert to percent\tSkills, prompt templates, connectors, onboarding\tCaptures SKILL.md / MCP layer\nOutcome overlap\t15%\t0-5 scale, convert to percent\tProductivity, deliverables, rework reduction\tYour main thesis outcome\nContext overlap\t15%\t0-5 scale, convert to percent\tIndividual vs team, business vs education, Brazil vs US\tKeeps benchmark honest\n\n## Sheet: Repurpose Map\n\nAsset\tAudience\tFormat\tKey angle\tCTA\tNotes\nBlog / Medium\tGeneral readers\tArticle\tThesis + evidence + method\tRead full study\tPrimary long-form version\nGitHub\tResearchers / builders\tRepo + README\tFramework, dataset schema, reproducibility\tStar / fork\tSource of truth for methods\nLinkedIn\tProfessional audience\tPost / carousel\tBusiness ROI and onboarding\tComment / connect\tLead with practical insight\nX\tFast discovery\tThread\tOne idea per post\tFollow / bookmark\tKeep one claim per thread\nYouTube\tVisual learners\tScript / explainer\tWalkthrough of framework\tWatch / subscribe\tTurn abstract into a demo","stderr":""}
{"returncode":0,"stdout":"=== AIGOVBRASIL V3 EXEC XLSX ===\n## Sheet: 01_CMD\n\nAI Gov Brasil — CMD V1\nCONTEXT\nLeonardo Batista is building AI Gov Brasil — bilingual (PT-BR + EN) editorial and operational brand for AI governance and AI literacy for non-developer Brazilian knowledge workers. The 90-day plan and all decisions are in this Traveller DB.\nCONFIRMED DECISIONS (2026-05-14)\n• D-A: São Paulo Claude community/event track → YES\n• D-B: Bilingual EN + PT-BR → CONFIRMED\n• D-C: Paid newsletter tier (Beehiiv recommended) → CONFIRMED\nACTIVE 90-DAY PHASE\n[To be updated each session: Setup / Launch / Validation / Monetization Signal]\nOPEN DECISIONS PENDING LEONARDO\nSee DECISIONS sheet — D-001 through D-010 not yet confirmed.\nNEXT-SESSION TASKS\n1. Verify newsletter platform decision (Beehiiv vs alternatives)\n2. Verify Cubo Itaú venue conversation status\n3. Verify INPI trademark search completion\n4. Status-check 90-day metrics against roadmap targets\n5. Update CHANGELOG with session deliverables\nEDITORIAL STANDARD\nBBC + HBR + AP. Bilingual. Evidence-led. No hype. Every quantitative claim sourced or labeled [inference]. EU AI Act Article 4 framing. Operational literacy, not compliance guidance.\nDO NOT\n• Claim LinkedIn Top Voice can be applied for (it cannot)\n• Present any ROI figure without [inference] label or named source\n• Recommend more than three monetization streams for 90 days\n• Use 'AI will replace' framing\nCLOSING RULE\nEnd every session with one concrete next action, not a menu.\n\n## Sheet: 02_STRATEGIC_READ\n\nComponent\tAssessment\nWhat is strong\tEditorial discipline (BBC + HBR + AP), verified evidence stack (M-007 through M-013, AI-FLU, EU-ACT Article 4), 24-skill operational corpus, non-developer ICP focus rare in Brazilian AI content market. Operator depth + editorial sobriety = moat.\nWhat needs reframing\tAnthropic ambassador goal framed as 'build portfolio, then apply.' Claude Community Ambassadors Program is live (March 2026), explicitly event-focused. Without recurring Brazilian Claude community surface, application underperforms. D-A (São Paulo community track) is foundational.\nWhat web search changed\t(1) Ambassador path is live, global, event-based, accepts non-developers with Claude Code/Cowork experience + community involvement. (2) LinkedIn Top Voice is invitation-only, ~300/year, 6-12 month build. (3) GitHub AI-governance dominated by curated awesome-lists; curatorial differentiation closed, operational differentiation (Claude Skills + PT-BR + non-dev) wide open.\nThree Most Important Decisions Resolved\t\nD-A: Brazilian Claude community/event track\tCONFIRMED by Leonardo 2026-05-14\nD-B: LinkedIn primary language\tBilingual EN + PT-BR, CONFIRMED\nD-C: First monetization to test\tPaid newsletter tier, CONFIRMED\n\n## Sheet: 03_BRAND_IDENTITY\n\nQuestion\tLabel\tValue\nQ-001: Name\tconfirmed\tAI Gov Brasil\nQ-002: Domain\tconfirmed\taigovbrasil.com\nQ-003: Handle\tconfirmed\t@aigovbrasil\nQ-004: Brand Type\tinference\tHybrid — editorial publication (Review Journal) + practitioner consultancy (operator/skills) + community surface (meetup/ambassador). Hybrid is intentional: editorial credibility funds practitioner credibility funds community credibility.\nQ-005: One-Sentence\tinference\tAI Gov Brasil is the Brazilian operating system for AI governance and AI literacy for knowledge workers who use AI at work.\nQ-007: Mission\tinference\tTo raise the operational AI literacy of Brazilian knowledge workers from passive consumption to fluent, governed, evidence-led use.\nQ-008: Vision\tinference\tBrazil becomes a recognized global voice in operational AI literacy — not by adopting AI fastest, but by operating it most responsibly.\nQ-009: Values\tinference\tEvidence over hype. Operator depth over influencer reach. Sober editorial discipline over performative expertise. Open artifacts over gated guru content. Bilingual access over English-only gatekeeping.\nQ-010: Thesis\tconfirmed\tThe next competitive advantage is not using AI first. It is operating AI with fluency.\n\n## Sheet: 04_POSITIONING\n\nComponent\tContent\nKnown For\tOperational AI literacy and Claude workflows for non-developers, with EU AI Act and Brazilian regulatory framing.\nCategory\tAI Governance × AI Literacy × Workflow Design — category currently fragmented between regulatory consultants (top-down) and prompt influencers (bottom-up). AI Gov Brasil occupies the operator middle.\nProblem Solved\tKnowledge workers use AI daily but lack governance discipline. KPMG + Melbourne (48,340 people): 56% have made errors at work because of AI; 66% use AI outputs without verification. Workday/Hanover: ~40% of time saved by AI is lost to rework. The gap is not access — it is method.\nFor Whom (ICP)\tICP-002: non-developer knowledge workers — analysts, consultants, founders, educators, operators, writers, executives — who use Claude/ChatGPT daily for real work.\nPromise\tReliable AI output, fewer rework hours, traceable workflows, and professional credibility with AI tools — without learning to code.\nNever Promise\tNever promise '10x productivity,' 'replace your team,' 'AI will write your job,' specific revenue figure from AI use, or any framing that positions AI as substitute for human judgment. Never claim to give legal compliance advice.\nDifferentiator\tOperator-first, not influencer-first. Evidence-led, not hype-led. Bilingual PT-BR/EN. Anchored to verified primary sources (KPMG, Workday, Anthropic AI Fluency Index, EU AI Act Article 4). Publishes open skills and case studies rather than gated courses.\nEnemy\tGeneric AI content, productivity hype, '10 prompts to get rich' guru culture, irresponsible AI use, low AI literacy framed as expertise.\nPositioning Statement\tFor Brazilian knowledge workers who use AI at work and want professional credibility with it, AI Gov Brasil is the operational AI governance and literacy brand that publishes evidence-led workflows, Claude Skills, and case studies — because operating AI with fluency, not adopting it first, is the next competitive advantage.\n\n## Sheet: 05_ICP\n\nComponent\tContent\nPrimary Audience\tICP-002: Brazilian non-developer knowledge workers using AI at work — analysts, consultants, managers, founders, educators, writers, operators.\nSecondary Audience\tBrazilian HR/L&D leaders responsible for AI literacy programs (EU AI Act Article 4 compliance), and Anthropic-aligned community participants in São Paulo and broader Brazil.\nTechnical Level\tNon-technical to lightly technical. Comfortable with Claude.ai, ChatGPT, Notion, Google Workspace. Not comfortable with APIs, terminals, or code.\nRoles\tStrategy consultants, product managers, marketing analysts, founders of <50-person companies, educators in higher ed and corporate training, content writers and editors, internal operations leads.\nSectors\tProfessional services, education, media and publishing, consulting, startups, corporate operations/L&D departments — particularly Brazilian firms with EU clients or EU exposure.\nPrimary Pain\tTime lost to AI rework (Workday: ~40% of AI time savings lost to correction). Hidden AI use at work (Microsoft Work Trend Index: 52% hide AI use, 53% fear appearing replaceable). Inability to defend AI-assisted output professionally.\nJobs to be Done\tProduce reliable AI output without rework. Defend AI-assisted work to skeptical managers. Build traceable, reusable workflow. Demonstrate AI literacy as professional skill. Comply with emerging regulation (AI Act Article 4 for EU-exposed firms; Brazilian PL 2338 when enacted).\nWhere They Are\tLinkedIn (primary professional surface for Brazilian non-dev knowledge workers), Medium (long-form), Twitter/X (lighter touch), Newsletter email (deeper relationship), in-person SP meetups (highest-trust surface).\n\n## Sheet: 06_DECISIONS\n\nID\tDecision\tOptions\tRecommendation\tStatus\nD-001\tNewsletter platform choice\tBeehiiv / Substack / Ghost / ConvertKit\tBeehiiv\tPENDING\nD-002\tSP meetup format\tOnline-only / Hybrid SP / In-person SP\tHybrid month 1, in-person from month 2\tPENDING\nD-003\tVenue partner for SP meetups\tCubo Itaú / WeWork / University / Independent\tCubo Itaú + university parallel\tPENDING\nD-004\tRepository license\tMIT / Apache 2.0 / CC BY 4.0 for docs\tMIT code + CC BY 4.0 docs\tPENDING\nD-005\tEU AI Act content positioning\tDisclaimer / 'Operational literacy' / Both\tBoth\tPENDING\nD-006\tBrazilian academic co-signer\tYes recruit / No solo / Optional organic\tOptional now, active month 4-6\tPENDING\nD-007\tAI Gov Brasil trademark (INPI)\tYes now / Wait until monetization\tSearch now, file day 60 if clear\tPENDING\nD-008\tAmbassador application timing\tDay 45 / Day 75-90 / After month 4\tDay 75-90\tPENDING\nD-009\tBrazilian AI gov thesis document\tYes day 30 / No distributed\tYes day 30, bilingual\tPENDING\nD-010\tBilingual content ratio\t50/50 / 60% PT-BR / 60% EN\t55% PT-BR / 45% EN\tPENDING\n\n## Sheet: 07_ROADMAP_90D\n\nPhase\tNarrative\tKey Metrics\nPhase 1 Setup Days 1-14\tFoundation laid. Repository at v1.0.0 with all gaps closed. LinkedIn profile gold-standard, bilingual, with first 10 posts published. Claude Projects configured across five workspaces. Newsletter platform chosen and live. First meetup announced for day 30 with venue confirmed.\t• Repository v1.0.0 tag pushed • 10 LinkedIn posts, avg >500 impressions • Newsletter at 100+ free subscribers\nPhase 2 Launch Days 15-45\tFirst content wave shipped. D2 published on Medium. D3 published on GitHub. D1 distributed via newsletter. First São Paulo Claude meetup hosted (day 30, online or hybrid) with public recap and case study. LinkedIn cadence sustained at 3 posts/week. First inbound from ICP-002 unprompted.\t• First meetup: 20+ attendees, public recap • LinkedIn at 2,000+ followers • Newsletter at 500+ free subscribers\nPhase 3 Validation Days 46-75\tSignal differentiated from noise. Top-performing content pillar identified and doubled. Second meetup hosted (day 60). Second Medium long-form published. Ambassador application materials assembled. Three credible Anthropic-adjacent engagers visibly active on LinkedIn.\t• LinkedIn at 3,500+ followers, avg >3k impressions • Newsletter at 800+ free subscribers • Two meetups hosted, public recaps\nPhase 4 Monetization Days 76-90\tPaid newsletter tier launches at day 80. Anthropic Community Ambassador application submitted at day 80-85. Third meetup hosted (day 90). Decision point: paid tier conversion rate above or below 3% determines whether newsletter is primary monetization stream.\t• Paid tier: ≥30 paying subscribers within 14 days • Ambassador application submitted • LinkedIn at 5,000+ followers\n\n## Sheet: 08_RISKS\n\nID\tRisk\tProbability\tImpact\tMitigation\nR-001\tEU AI Act content read as legal advice\tMedium\tHigh\tExplicit non-legal-advice disclaimer in repo root and at bottom of every regulatory post. 'Operational literacy' framing throughout. Never use 'compliance guidance' or 'legal advice' in public content.\nR-002\tBrand collision — 'AI Gov Brasil' overlaps with existing Brazilian government or academic initiative\tLow-Medium\tHigh\tINPI prior-art search at day 1; GitHub org search; Google search before public launch.\nR-003\tAnthropic ambassador application rejected due to lack of event evidence\tLow with D-A\tHigh\tExecute SP Claude meetup track from day 15 onward; ensure at least three documented meetups before applying.\nR-004\tBilingual workload exceeds sustainable capacity\tMedium-High\tMedium\tShared evidence library (Dados.md) as single source; 70% parallel / 30% native; CMD template; week-6 review with permission to drop to one language if needed.\nR-005\tPaid newsletter launches with too few free subscribers\tMedium\tMedium\tDo not launch paid tier until free subscriber count exceeds 1,000. If day-80 < 1,000, delay to days 90-100.\nR-006\tTrust & Safety / Acceptable Use Policy violation\tLow-Medium\tVery High\tBefore any post mentioning Claude capabilities, verify against current Anthropic Usage Policies. Use precise language. Never present hypothetical use cases as endorsed.\nR-007\tSingle-operator burnout\tHigh\tMedium-High\tCapacity audit end of week 4. Explicit permission to drop to two posts/week if signals support. Use ADHD desk dashboard skill.\nR-008\tGitHub awesome-list crowd-out\tMedium\tMedium\tRoot README opens with 'This is not an awesome-list. This is an operational corpus.' Differentiation stated top-of-fold.\n\n## Sheet: 09_LINKEDIN_STRATEGY\n\nComponent\tContent\nTop Voice Reality Check\tBlue Top Voice badge is invitation-only, awarded by LinkedIn's editorial team to ~300 global experts per year, reviewed twice yearly, valid for at least 6 months. Gold Community Top Voice badge was discontinued Oct 8, 2024. Realistic build window: 6-12 months of consistent original posting in defined niche with engagement quality, not follower count, as primary signal.\n90-Day Framing\t90 days does not earn the badge. 90 days earns the foundation that earns the invitation in months 6-12: defined niche (Brazilian non-dev AI governance), consistent cadence (3 posts/week minimum), original perspectives (not aggregation), network of credible engagers — Anthropic employees, AI governance researchers in Brazil, Brazilian non-dev AI practitioners.\n\t\nContent Pillars\t\nPillar 1: Evidence\tWeekly post anchored to primary source (KPMG, Workday, Anthropic, EU AI Act). Format: data point → editorial reading → operational implication.\nPillar 2: Skill of Week\tWalk through one Claude Skill from 24-skill corpus, with actual prompt/configuration and non-dev use case.\nPillar 3: Case Study\tReproducible workflow with before/after, time saved, evidence of error reduction. Review Journal voice.\nPillar 4: Brazilian Regulatory\tPL 2338, LGPD intersections with AI, EU AI Act Article 4 obligations for Brazilian firms with EU clients.\n\t\nCadence & Format\t\nWeekly Cadence\t3 posts per week minimum. Mon: PT-BR operational tip (150-250 words). Wed: EN evidence-led analysis (250-400 words). Fri: bilingual case study or Brazilian regulatory. Two long-form LinkedIn articles per month.\nDaily Engagement\t30 minutes per day commenting substantively on 5-10 posts from people in target network.\n\t\nFirst 50 Followers Curation\t\nStrategy\tEditorial team sees who engages with your posts. In days 1-30, deliberately curate first 50 connections: Anthropic employees publicly active on LinkedIn, AI governance researchers at Brazilian universities (USP, FGV, Insper), Brazilian non-dev AI creators with editorial sobriety, EU AI Act practitioners. Quality of network beats follower count for editorial visibility.\n\t\nKPI Targets\t\nDay 30\t1,000 followers, 3 weekly posts maintained, average engagement rate >2%, 25 substantive comments delivered to target network per week.\nDay 60\t2,500 followers, 1 long-form article with >10k impressions, first inbound from ICP-002 unprompted.\nDay 90\t5,000 followers, average post >5k impressions, 3+ Anthropic-adjacent engagers commenting on posts, foundation visible for editorial invitation in months 4-9.\n\n## Sheet: 10_AMBASSADOR_PATH\n\nComponent\tContent\nProgram Status\tClaude Community Ambassadors Program is open as of March 2026 at claude.com/community/ambassadors. Applications reviewed on rolling basis. Program prioritizes geographic diversity and explicitly welcomes international applicants. No developer title requirement. Benefits include event funding, monthly API credits, private Slack with Anthropic team, Builders Council access, swag, and pre-release feature access. Program does not pay directly. Ambassadors cannot also represent company whose core business competes with Anthropic's.\nLeonardo Fit Assessment\tStrong fit on three dimensions, weak on one. Strong: editorial credibility (Review Journal, BBC+HBR+AP), operational depth (24 Claude Skills), geographic diversity (Brazil, São Paulo, currently under-represented). Weak: community/event track record currently absent. D-A (São Paulo Claude meetups) directly closes this gap. Without it, application leans on content credibility alone, which is not program's selection signal.\n\t\nAsset Checklist Before Application\t\n✓ Repository\tPublic repository live with v1.0.0 release tag\n✓ LinkedIn\tProfile gold-standard with 3,000+ followers and consistent posting record (>30 days)\n✓ First Meetup\tClaude meetup hosted in São Paulo (online or hybrid acceptable) with public recap\n✓ Medium\tAt least one Medium long-form (D2) published\n✓ GitHub Case\tCase study (D3) published on GitHub\n✓ Claude Product\tDocumented experience with Claude Code OR Claude Cowork — publish at least one workflow case study using one of these two products\n✓ Landing\tBilingual README on aigovbrasil.com landing\n","stderr":""}
{"returncode":0,"stdout":"✓ Landing\tBilingual README on aigovbrasil.com landing\n✓ Email\tProfessional email leonardo@aigovbrasil.com (or equivalent)\n✓ Essay\tApplication essay: why Brazil, why now, what community gap you close\n\t\nDifferentiating Angle\t\nApplication Thesis\tLead with under-represented operator angle: Brazil ranks #3 globally in raw Claude.ai usage (Anthropic Economic Index) but has minimal public Claude community infrastructure for non-developers. Application thesis: 'I am building the missing Brazilian Claude community for non-developer professionals — bilingual, evidence-led, anchored to AI literacy obligations under EU AI Act Article 4 for Brazilian firms with EU exposure.' This is a thesis no other Brazilian applicant can credibly make.\n\t\nTiming\tApply at day 75-90, not earlier. Earlier signals lack of substance; later misses rolling-review window. By day 75: 1 meetup hosted, 30+ LinkedIn posts, repository at v1.0+, one Medium piece — minimum credible portfolio for non-pre-existing-influencer application.\n\n## Sheet: 11_BEYOND_SCOPE\n\nID\tTopic\tInsight\nB-01\tClaude Cowork unique fit\tAmbassador page lists 'meaningful experience with Claude Code or Claude Cowork' as requirement. Cowork is Anthropic's desktop tool for non-developers — exactly Leonardo's ICP. Publishing Cowork workflow case studies positions Leonardo as Brazilian Cowork-fluent operator, niche almost no other applicant can claim.\nB-02\tAnchor to Brazilian regulation\tPL 2338/2023 (Brazilian AI bill) and LGPD intersections with AI are under-covered in PT-BR content. Anchoring to BOTH EU AI Act Article 4 AND Brazilian PL 2338 is positioning moat — most Brazilian AI creators ignore PL 2338 because not yet enacted.\nB-03\tFirst-50-followers curation\tLinkedIn's editorial team for Top Voice reviews not just posts but who engages. Deliberately cultivating first 50 connections (Anthropic employees, AI governance researchers at USP/FGV/Insper, Brazilian non-dev creators with editorial sobriety) shapes what editorial team sees when evaluating in months 6-9.\nB-04\tBrazil Claude usage rank\tPer project corpus (M-005, Anthropic Economic Index), Brazil ranks #3 globally in raw Claude.ai usage. Real underlying audience — far larger than visible Brazilian Claude content community. Ambassador application thesis should lead with this gap: large user base, minimal Portuguese-language operator content.\nB-05\t1,000-free-subscriber threshold\tPaid newsletter conversion below ~1,000 free subscribers produces noisy signal. If day-80 free count below 1,000, rational move is delay paid launch by two weeks rather than launch into weak validation window and conclude paid newsletter does not work.\nB-06\tEU AI Act Article 4 timeline\tArticle 4 entered application Feb 2, 2025, but broader AI Act enforcement timeline staged through Aug 2025 (GPAI obligations) and Aug 2026 (high-risk system obligations begin). Content should be technically precise about which provisions in force when. Imprecision caught by EU-based readers damages editorial credibility.\nB-07\tINPI prior-art search\tINPI has public search portal. Confirming 'AI Gov Brasil' (and 'AIGovBrasil' single token) has no Brazilian trademark collision takes 15 minutes. Doing this day 1 prevents discovering collision after public launch — which would force rebrand.\nB-08\t'Not a lawyer' boundary\tLeonardo is not lawyer. Content giving compliance guidance high-risk in two directions: legal liability if misapplied, brand damage if Brazilian or EU lawyers read as encroachment. 'Operational literacy' framing keeps on operator ground where Leonardo has actual authority.\nB-09\tCubo Itaú as SP venue\tCubo Itaú in São Paulo (Vila Olímpia) regularly hosts AI/tech meetups at no cost in exchange for community building. They have existing AI track. 30-day lead time and written meetup thesis usually enough to secure slot. Lowest-friction path to in-person meetup credibility.\nB-10\tTrust & Safety AUP\tBuilding brand explicitly aligned with Anthropic while not respecting Anthropic's Usage Policies is fastest way to disqualify from ambassador consideration. Read current Anthropic Usage Policies and Acceptable Use Policy before publishing any post mentioning Claude capabilities, re-read quarterly. Non-obvious because most creators never check.\nB-11\tBuilders Council pre-application\tAnthropic Builders Council is touchpoint ambassadors get access to, but also place where Anthropic engineers and researchers publicly visible (Discord, community forums, GitHub discussions). Becoming recognizable voice in those public surfaces before formally applying makes application recognition rather than introduction.\nB-12\tCase study highest-leverage\tAcross every channel — GitHub, LinkedIn, Medium, newsletter, ambassador application — single artifact that travels furthest is reproducible case study with before/after, time saved, evidence of error reduction, Claude configuration another operator can copy. D3 is one. 90-day plan should produce at least three more. Volume of case studies closest proxy to operator authority.\n\n## Sheet: 12_METRICS_TRACKER\n\nMetric\tDay 30 Target\tDay 60 Target\tDay 90 Target\tActual\tStatus\nLinkedIn Followers\t1,000\t2,500\t5,000\t\t\nAvg Post Impressions\t500+\t2,000+\t5,000+\t\t\nNewsletter Free Subs\t100\t500\t1,000\t\t\nNewsletter Paid Subs\t—\t—\t30+\t\t\nGitHub Stars\t10\t25\t50\t\t\nMeetups Hosted\t1\t2\t3\t\t\nMedium Articles\t0-1\t1-2\t2-3\t\t\nGitHub Case Studies\t1\t2\t3\t\t\nLinkedIn Posts Total\t10+\t25+\t40+\t\t\nAnthropic Engagers\t1\t2\t3+\t\t\n\n## Sheet: 13_CHANGELOG\n\nDate\tVersion\tSession By\tChanges\n2026-05-14\tv3.0.0\tClaude Opus 4.7\tInitial Traveller DB v3 — AI Gov Brasil. Converted JSON strategic plan into executive Excel workbook. 14 sheets: CMD, Strategic Read, Brand Identity, Positioning, ICP, Decisions, Roadmap, Risks, LinkedIn Strategy, Ambassador Path, Beyond Scope, Metrics Tracker, Changelog, Next 24H Action.\n\n## Sheet: 14_NEXT_24H_ACTION\n\nNEXT 24H ACTION\n\nTask: INPI Trademark Prior-Art Search\n\nAction\nOpen the INPI trademark portal (busca.inpi.gov.br) and conduct a prior-art search for 'AI Gov Brasil' and 'AIGovBrasil' as nominative marks across classes 9, 35, 41, and 42. Document the result in a single-page memo.\n\nRationale\nThis is the only action that, if skipped, can force a full rebrand after launch — making it the highest-asymmetric-risk task in the entire 90-day plan.\n\nEstimated Time\n30 minutes\n\nConfidence\nHIGH\n\nClasses to Search\n• Class 9: Computer software, electronic publications • Class 35: Business management consulting • Class 41: Education services, training • Class 42: Software as a service, technological consulting","stderr":""}
{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/aigovbrasil-skill-library-executive.numbers\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n    97227  2026-05-14 05:27   Data/PresetImageFill5-21.jpg\n    94804  2026-05-14 05:27   Data/PresetImageFill2-18.jpg\n    89339  2026-05-14 05:27   Data/PresetImageFill4-20.jpg\n    80826  2026-05-14 05:27   Data/PresetImageFill0-16.jpg\n    77941  2026-05-14 05:27   Data/PresetImageFill1-17.jpg\n    77842  2026-05-14 05:27   Data/PresetImageFill3-19.jpg\n    11183  2026-05-14 05:27   Data/bullet_gbutton_gray-22.png\n    13352  2026-05-14 05:28   Index/Document.iwa\n      663  2026-05-14 05:28   Index/ViewState.iwa\n   161676  2026-05-14 05:28   Index/CalculationEngine-906727.iwa\n     3533  2026-05-14 05:27   Index/Tables/Tile-905314.iwa\n     2859  2026-05-14 05:27   Index/Tables/DataList.iwa\n      287  2026-05-14 05:27   Index/Tables/DataList-905316-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905317-2.iwa\n       41  2026-05-14 05:27   Index/Tables/DataList-905318-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905319-2.iwa\n       29  2026-05-14 05:27   Index/Tables/DataList-905320-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905321-2.iwa\n     1932  2026-05-14 05:27   Index/Tables/DataList-905322-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905323-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905324-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905325-2.iwa\n     1017  2026-05-14 05:27   Index/Tables/Tile-905398.iwa\n     3104  2026-05-14 05:27   Index/Tables/DataList-905399-2.iwa\n      210  2026-05-14 05:27   Index/Tables/DataList-905400-2.iwa\n       27  2026-05-14 05:27   Index/Tables/DataList-905401-2.iwa\n       40  2026-05-14 05:27   Index/Tables/DataList-905402-2.iwa\n---\nerror: unsupported extension '.numbers' (supported: docx, odt, epub, xlsx, pptx, rtf, html, htm, ipynb); use --format to override\n","stderr":""}
{"returncode":0,"stdout":"    Uninstalling setuptools-68.1.2:\n      Successfully uninstalled setuptools-68.1.2\nSuccessfully installed compact-json-1.8.2 cramjam-2.11.0 enum-tools-0.13.0 importlib-resources-7.1.0 numbers-parser-4.18.3 python-snappy-0.7.3 setuptools-82.0.1 sigfig-1.3.19 sortedcontainers-2.4.0 wcwidth-0.7.0\n","stderr":""}
{"returncode":0,"stdout":"\n=== SHEET: NAVIGATOR ===\n--- Table: Tabela 1 (42 rows × 6 cols) ---\n  |  |  |  |  |  | \n  | AIGOVBRASIL · Claude Skills Library · Executive Navigator |  |  |  |  | \n  | AI governance, Claude skills, workflow guides, and AI literacy resources for non |  |  |  |  | \n  | # | Skill Name | Category | One-Line Purpose | Key Trigger | ⚠\n  |   X-RAY SUITE |  |  |  |  | \n  | 1 |  |  |  |  | \n  | 2 | X-Ray DB · Canonical YAML Normalizer | X-Ray Suite | A diagnosis is only reusable if it has a machine-readable structure | exporta para yaml | \n  | 3 | X-Ray Orchestrator · Central Case OS | X-Ray Suite | A consultant's value is their judgment, not their memory | /x-ray-start | \n  | 4 | X-Ray Client Form · 25-Question Intake | X-Ray Suite | The client shouldn't need to understand Claude to give the consultant structured | /x-ray-deliver form-cliente | \n  | 5 | X-Ray Brand Layer · White-Label Deliverables | X-Ray Suite | The client's trust goes to the consultant's brand, not to the tool | white-label | \n  | 6 | X-Ray Onboarding Ebook · Interactive HTML | X-Ray Suite | Onboarding is a product | /x-ray-deliver ebook | \n  | 7 | X-Ray Executive Office · Execution Kanban | X-Ray Suite | Execution without visibility is guessing | /x-ray-deliver dashboard | \n  | 8 | X-Ray Publish Register · Skill Registry | X-Ray Suite | A skill that isn't registered doesn't exist at scale | /x-ray-publish | \n  | 9 | X-Ray Self-Knowledge · Suite Router | X-Ray Suite | A tool library is only useful if you can find the right tool instantly | /x-ray-help | \n  | 10 | X-Ray Skill Packager · Suite Distribution | X-Ray Suite | Distribution is the last mile of creation | /x-ray-package | \n  |   CMD SYSTEMS |  |  |  |  | \n  | 11 |  |  |  |  | \n  | 12 | CMD-02-MIRP · Modify-Improve-Register-Publish | CMD Systems | A skill that isn't documented is a skill only its creator can use | MIRP | \n  | 13 | CMD-03-MARO · Multi-Agent Research Orchestrator | CMD Systems | Research quality is limited by the researcher's blind spots | CMD-03-MARO | \n  |   MAJOR OS |  |  |  |  | \n  | 14 |  |  |  |  | \n  | 15 | Empower V4 · AI Usage Evaluator | Major OS | You can't improve what you don't measure | Empower V4 | \n  | 16 | Horácio · Operational Intelligence Agent | Major OS | Intelligence without a decision architecture produces noise | Horácio | \n  | 17 | FORGE Visual Canvas · Premium Visuals | Major OS | Visual quality is a trust signal | FORGE | \n  |   EDITORIAL PUBLISHING |  |  |  |  | \n  | 18 |  |  |  |  | \n  | 19 | Scripity · Document Corpus Generator | Editorial Publishing | A product without a complete document corpus is invisible | scripity | \n  | 20 | Live Prompt Pro Converter · Prompt Optimizer | Editorial Publishing | A bad prompt produces an expensive retry loop | converta esse prompt | \n  |   DOCUMENT PIPELINES |  |  |  |  | \n  | 21 |  |  |  |  | \n  |   RESEARCH SYSTEMS |  |  |  |  | \n  ... (12 more rows)\n\n=== SHEET: AI_GOV_CONTEXT ===\n--- Table: Tabela 1 (14 rows × 5 cols) ---\n  |  |  |  |  | \n  | AI GOVERNANCE LANDSCAPE · PASTEL Analysis · 2026 |  |  |  | \n  | Context for the Aigovbrasil skills library — why AI governance and literacy matt |  |  |  | \n  |  |  |  |  | \n  | DIMENSION | Current State (2026) | Implication for AI Users | How this library responds | \n  | P — Political | EU AI Act Article 4 in force since Feb 2025. AI literacy is a legal obligation.  | Organizations face compliance risk if employees lack documented AI literacy. Ind | All X-Ray skills include epistemic labels (fact/hypothesis/inference). AI_GOVERN | \n  | A — Analytical | Anthropic AI Fluency Index (9,830 conversations): iterative users have 2.67x mor | Most users operate AI below their potential — not from lack of intelligence, but | Empower V4 provides maturity scoring. CMD-01/02 enforce method. X-Ray suite buil | \n  | S — Social | KPMG + Univ. of Melbourne (48,340 people): 56% made work errors due to AI; 66% u | AI error rates in professional work are unacceptably high. Unchecked AI output i | Horácio enforces fact≠hypothesis≠inference. X-Ray gates prevent unvalidated clai | \n  | T — Technological | LLMs improving rapidly but inconsistently. Claude, GPT-4, Gemini each have diffe | Model-specific fluency matters. A prompt that works on Claude may fail on GPT-4. | Live Prompt Pro Converter optimizes for specific models. CMD systems are model-a | \n  | E — Economic | Workday/Hanover Research: ~40% of AI time saved is lost to correction, rewriting | AI ROI is negative for unstructured users. Workflow systems with QA gates are th | CMD-01-PPS: 2h/day → 15 min/day. CMD-02-MIRP: 40 hours manual → 40 min automated | \n  | L — Legal | EU AI Act Article 4 (Feb 2025): AI literacy obligation. GDPR applies to AI-proce | AI system operators bear responsibility for AI output quality. 'Claude did it' i | All deliverables include epistemic labels. X-Ray decision_log provides audit tra | \n  |  |  |  |  | \n  |  |  |  |  | \n  | Sources: EU AI Act · Anthropic AI Fluency Index · KPMG AI Trust Report · Workday |  |  |  | \n\n=== SHEET: x-ray-abs ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray ABS · Strategic Business Diagnosis |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 3.0.0 | Language | PT-BR / EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Every business decision is only as good as the quality of the question behind it |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Consultants, founders, and analysts running diagnostic work on SMEs |  | Strategic discussions produce frameworks without decisions — endless SWOT slides |  |  | A scored, prioritized gap map with a clear decision question in under 30 minutes |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Diagnoses produce outputs, not decisions |  | Frameworks (SWOT, Porter) describe the landscape but don't score or prioritize |  | Evidence and inference are mixed — facts presented as certainties |  | No canonical pipeline from diagnosis to gate-approved delivery | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultant or analyst running a business review, M&A scan, or go-to-market audit |  |  |  |  |  | \n  | WHEN | Start of any engagement requiring strategic clarity — before action planning |  |  |  |  |  | \n  | WHERE | Claude.ai project with X-Ray context, or standalone diagnostic session |  |  |  |  |  | \n  | WHY | Decisions made without a precise framing question produce activity, not progress |  |  |  |  |  | \n  | HOW | Paste business context → receives scored gaps (I×U×C×F÷(E×R)) + Mermaid + Decisi |  |  |  |  |  | \n  | HOW MUCH | 30 min diagnosis vs 2–4 hours manual → 75% time reduction. v3 adds 19-phase Cano |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Time to first scored diagnosis: 30 min vs 2–4 h manual |  |  |  |  |  | \n  | → | Output: GAP/BM/RISCO IDs with scores — actionable, not just descriptive |  |  |  |  |  | \n  | → | v3 Canonical Engine: 19 phases × 13 gates — full case lifecycle covered |  |  |  |  |  | \n  | TRIGGER PHRASES | x-ray  ·  diagnóstico  ·  analise esse negócio  ·  gaps  ·  SWOT  ·  roadmap  ·  |  |  |  |  |  | \n  | DO NOT USE FOR | Creative writing · non-business debugging · factual lookup |  |  |  |  |  | \n  | PAIRS WITH | x-ray-db (YAML) · x-ray-orchestrator (live case) · x-ray-brand-layer (client out |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | x-ray + x-ray-db |  | Full diagnosis → normalized YAML in one flow |  |  | 45 min | \n  | WOW #2 | /x-ray-start + x-ray-abs |  |  |  |  |  | \n  | WOW #3 | x-ray-abs + forge-visual-canvas |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-abs · v3.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-db ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray DB · Canonical YAML Normalizer |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 2.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A diagnosis is only reusable if it has a machine-readable structure. Human text  |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Consultants using X-Ray suite with downstream automation (Linear, Notion, data p |  | Diagnostic outputs live in chat and die there — no traceability, no reuse, no ag |  |  | One YAML file that agents, dashboards, and project tools can all read from |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Diagnostic outputs are unstructured text — useful for humans, useless for machin |  | Every downstream tool requires manual re-entry of the same data |  | Version drift — diagnosis in chat doesn't match what's in Linear or Notion |  | Canonical pipeline phases (S00–S20) can't be tracked without a schema | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultant who needs to feed diagnosis into Linear, Notion, or another automatio |  |  |  |  |  | \n  | WHEN | Immediately after x-ray-abs produces a diagnosis — before delivery or action pla |  |  |  |  |  | \n  | WHERE | Handoff point between diagnosis and execution tools |  |  |  |  |  | \n  | WHY | Machine-readable output enables automation, tracking, and multi-agent consumptio |  |  |  |  |  | \n  | HOW | Say 'exporta para yaml' after x-ray-abs — receives 12-block YAML with all IDs pr |  |  |  |  |  | \n  | HOW MUCH | Manual YAML structuring: 1–2 h → automated: 2 min. Schema covers full 19-phase p |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 12-block schema: covers full case from metadata to next_steps |  |  |  |  |  | \n  | → | v2: S00–S20 phases + GATE-S00–GATE-S20 + deliverable IDs DEL-Sxx-NN |  |  |  |  |  | \n  | → | Auto-handoff from x-ray-abs = zero additional prompt needed |  |  |  |  |  | \n  | TRIGGER PHRASES | exporta para yaml  ·  yaml canônico  ·  normaliza para downstream  ·  schema do  |  |  |  |  |  | \n  | DO NOT USE FOR | Strategic diagnosis (use x-ray-abs) · visual rendering (use forge-visual-canvas) |  |  |  |  |  | \n  | PAIRS WITH | x-ray-abs (input) · x-ray-orchestrator (session state) · projects-to-linear (dow |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | x-ray-abs → x-ray-db → projects-to-linear |  | Diagnosis → YAML → Linear backlog in one pipeline |  |  | 15 min | \n  | WOW #2 | x-ray-db + x-ray-orchestrator |  |  |  |  |  | \n  | WOW #3 | yaml canônico + Notion MCP |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-db · v2.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-orchestrator ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Orchestrator · Central Case OS |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A consultant's value is their judgment, not their memory. The OS handles state,  |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | X-Ray consultants (Rogerinho / Leonardo clones) running live PME consulting case |  | Case state lives in the consultant's head — hypotheses promoted to facts without |  |  | A co-pilot that captures, normalizes, and tracks every decision while the consul |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Consulting case state is invisible — what was decided, when, by whom, and why |  | Hypotheses get treated as facts when no gate enforces the distinction |  | Deliverables go to clients without a recorded approval trail |  | Session context is lost between conversations — no persistent case state | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | X-Ray consultant actively running a PME diagnostic or action-planning session |  |  |  |  |  | \n  | WHEN | Every consulting session — from intake (/x-ray-start) to delivery (/x-ray-delive |  |  |  |  |  | \n  | WHERE | Claude project with consultant_config.yaml loaded |  |  |  |  |  | \n  | WHY | Without a state-keeping OS, consulting quality depends on memory — unreliable an |  |  |  |  |  | \n  | HOW | /x-ray-start → captures → diagnose → gates → deliver. Every action logged in dec |  |  |  |  |  | \n  | HOW MUCH | Full case lifecycle tracked. 3 hard constraints: no invention, no hypothesis→fac |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Gates G1–G4: structured quality checkpoints before each phase transition |  |  |  |  |  | \n  | → | decision_log: every decision recorded with timestamp, owner, and evidence |  |  |  |  |  | \n  | → | Requires consultant_config.yaml — ensures brand, MCP, and mode are set before fi |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-start  ·  /captura  ·  /captura_decisao  ·  /x-ray-diagnose  ·  /x-ray-de |  |  |  |  |  | \n  | DO NOT USE FOR | Skill creation · abstract diagnosis without live case · YAML normalization alone |  |  |  |  |  | \n  | PAIRS WITH | x-ray-abs · x-ray-db · x-ray-client-form · x-ray-brand-layer · x-ray-executive-o |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | /x-ray-start + /captura × N |  | Full session: intake → capture 10+ facts/hypotheses → gate G1 |  |  | 60 min | \n  | WOW #2 | /x-ray-deliver ebook + x-ray-brand-layer |  |  |  |  |  | \n  | WOW #3 | /status do caso + x-ray-executive-office |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-orchestrator · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-client-form ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Client Form · 25-Question Intake |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | The client shouldn't need to understand Claude to give the consultant structured |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | X-Ray consultants who need structured client intake without teaching clients to  |  | Intake calls are expensive and unstructured — clients ramble, consultants miss k |  |  | A self-service intake that produces clean, structured JSON importable into the c |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Intake data is unstructured and expensive to collect |  | 30–60 min discovery call → maybe 40% of needed data captured |  | Client doesn't know what the consultant needs — wrong level of detail |  | No standardized input = no comparable cases, no pattern learning | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultant sending intake to a client before D1 session |  |  |  |  |  | \n  | WHEN | D0 phase — before the first consultant-client working session |  |  |  |  |  | \n  | WHERE | Sent via WhatsApp link, or hosted on GitHub Pages / Vercel / Netlify |  |  |  |  |  | \n  | WHY | Structured intake enables faster diagnosis and removes bias from the opening con |  |  |  |  |  | \n  | HOW | /x-ray-deliver form-cliente → HTML file → send to client → client fills 25Q (~8  |  |  |  |  |  | \n  | HOW MUCH | 8 min client time vs 30–60 min call. Structured JSON vs unstructured notes. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 25 questions designed for SME diagnostic coverage |  |  |  |  |  | \n  | → | Output: JSON directly importable via /x-ray-start --import-json |  |  |  |  |  | \n  | → | Zero Claude dependency for client — standalone HTML works in any browser |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-deliver form-cliente  ·  intake form  ·  form D0  ·  formulário X-Ray  ·  |  |  |  |  |  | \n  | DO NOT USE FOR | Internal consultant forms · generic non-X-Ray forms |  |  |  |  |  | \n  | PAIRS WITH | x-ray-orchestrator (import) · x-ray-abs (post-intake diagnosis) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | WhatsApp link → client JSON → /x-ray-start |  | Full D0 intake without a call |  |  | 8 min client | \n  | WOW #2 | GitHub Pages + form-cliente |  |  |  |  |  | \n  | WOW #3 | form-cliente + x-ray-abs |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-client-form · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-brand-layer ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Brand Layer · White-Label Deliverables |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | The client's trust goes to the consultant's brand, not to the tool. Infrastructu |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | X-Ray consultants (Rogerinho clones) delivering branded outputs to final clients |  | AI-generated deliverables look generic — clients see the tool, not the consultan |  |  | Every deliverable carries the consultant's colors, logo, and name — completely w |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Generic AI outputs destroy the consultant's brand perception |  | FORGE base tokens produce X-Ray default branding, not consultant branding |  | Manual brand application is error-prone and time-consuming |  | Inconsistent deliverables across a case undermine professionalism | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | X-Ray consultant generating any deliverable for a final client |  |  |  |  |  | \n  | WHEN | Any output generation moment — after FORGE produces the base artifact |  |  |  |  |  | \n  | WHERE | Post-processing layer — runs after forge-visual-canvas, before delivery |  |  |  |  |  | \n  | WHY | Client trust is built on brand consistency. The consultant is the product. |  |  |  |  |  | \n  | HOW | forge-visual-canvas (base) → x-ray-brand-layer (consultant override from consult |  |  |  |  |  | \n  | HOW MUCH | Manual branding per deliverable: 15–30 min → automated: 0 min additional. Requir |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Identity sourced exclusively from consultant_config.yaml — zero inference from c |  |  |  |  |  | \n  | → | Pipeline: FORGE base → brand override → final. Never replaces FORGE, only overri |  |  |  |  |  | \n  | → | Internal outputs (drafts, decision_log) are excluded — brand layer only on clien |  |  |  |  |  | \n  | TRIGGER PHRASES | white-label  ·  aplicar minha brand  ·  personalizar o output  ·  remover brandi |  |  |  |  |  | \n  | DO NOT USE FOR | Internal consultant outputs · drafts · decision_log captures |  |  |  |  |  | \n  | PAIRS WITH | forge-visual-canvas (base) · x-ray-orchestrator (triggers application) · x-ray-o |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | x-ray-abs + x-ray-brand-layer + forge |  | Diagnosis → branded executive PDF in one flow |  |  | 25 min | \n  | WOW #2 | consultant_config.yaml setup |  |  |  |  |  | \n  | WOW #3 | x-ray-onboarding-ebook + x-ray-brand-layer |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-brand-layer · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-onboarding-ebook ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Onboarding Ebook · Interactive HTML |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Onboarding is a product. A consultant who delivers a beautiful, interactive digi |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | X-Ray consultants onboarding new buyers (Rogerinho route) or delivering final cl |  | Onboarding is a PDF or a call — static, forgettable, low perceived value |  |  | An interactive, branded HTML deliverable that works standalone — no Claude, no a |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | First impressions are set by the onboarding artifact quality |  | Static PDFs don't guide the reader through next steps |  | Client-facing deliverables require Claude.ai — creating a dependency |  | Consultant and client need different versions of the same ebook | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultant delivering to a new buyer or presenting diagnosis to a final client |  |  |  |  |  | \n  | WHEN | Post-purchase onboarding (Rogerinho) or post-diagnosis delivery (Toni) |  |  |  |  |  | \n  | WHERE | Delivered via URL, email attachment, or embedded in WhatsApp — zero Claude depen |  |  |  |  |  | \n  | WHY | Interactive, standalone delivery creates trust and differentiates the consultant |  |  |  |  |  | \n  | HOW | /x-ray-deliver ebook or /x-ray-deliver ebook-cliente → HTML file → send or host |  |  |  |  |  | \n  | HOW MUCH | Manual ebook creation: 4–8 h → automated: 15 min. Works offline. No app needed. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | /rogerinho route: suite download + setup guide + skill map |  |  |  |  |  | \n  | → | /toni route: diagnosis results + action plan + no X-Ray branding visible |  |  |  |  |  | \n  | → | Can be hosted on GitHub Pages / Vercel / Netlify — sharable link |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-deliver ebook  ·  /x-ray-deliver ebook-cliente  ·  gerar ebook X-Ray  ·   |  |  |  |  |  | \n  | DO NOT USE FOR | Single-section outputs · simple PDFs · presentations |  |  |  |  |  | \n  | PAIRS WITH | x-ray-brand-layer (branding) · x-ray-orchestrator (triggers) · x-ray-executive-o |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | x-ray-abs + x-ray-brand-layer + ebook-cliente |  | Diagnosis → branded client ebook in 30 min |  |  | 30 min | \n  | WOW #2 | /rogerinho route + GitHub Pages |  |  |  |  |  | \n  | WOW #3 | x-ray-executive-office embed |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-onboarding-ebook · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-executive-office ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Executive Office · Execution Kanban |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Execution without visibility is guessing. A consultant needs a live dashboard; a |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | X-Ray consultant tracking active case execution + client wanting transparent pro |  | Progress reporting requires manual updates — expensive, delayed, often skipped |  |  | Live visual tracker that shows case phase, gate status, and tasks at a glance |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Execution progress is invisible to both consultant and client |  | Phase and gate status lives in the consultant's head or a messy doc |  | Client visibility requires a separate manual status update |  | Tasks aren't decomposed to the phase level — S00–S20 not tracked | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultant monitoring active case + client reviewing progress |  |  |  |  |  | \n  | WHEN | Throughout the execution phase — after Gate G1 opens |  |  |  |  |  | \n  | WHERE | Claude.ai or hosted as standalone HTML |  |  |  |  |  | \n  | WHY | Visible progress builds client trust and keeps the consultant accountable to the |  |  |  |  |  | \n  | HOW | /x-ray-deliver dashboard → generates interactive Kanban → consultant fills, clie |  |  |  |  |  | \n  | HOW MUCH | Manual status deck: 1 h/week → automated tracker: 5 min setup. Persistent across |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 19 phases × 13 gates fully tracked in one view |  |  |  |  |  | \n  | → | Two modes: consultant (full edit) vs client (read-only, clean, no internal data) |  |  |  |  |  | \n  | → | Embeddable in x-ray-onboarding-ebook for combined deliverable |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-deliver dashboard  ·  kanban X-Ray  ·  dashboard de execução  ·  tracker  |  |  |  |  |  | \n  | DO NOT USE FOR | Linear issue creation (use projects-to-linear) · abstract diagnosis (use x-ray-a |  |  |  |  |  | \n  | PAIRS WITH | x-ray-orchestrator (state source) · x-ray-onboarding-ebook (embed) · projects-to |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | /status do caso → dashboard |  | Session close → instant visual status update |  |  | 5 min | \n  | WOW #2 | Consultant + client modes |  |  |  |  |  | \n  | WOW #3 | executive-office + ebook-cliente |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-executive-office · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-publish-register ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Publish Register · Skill Registry |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A skill that isn't registered doesn't exist at scale. Publishing is only complet |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Leonardo (B1) publishing updated X-Ray skills to active consultant clones (B2) |  | Updated skills exist in one account but don't reach the consultants who are usin |  |  | One publish action that updates Notion, Google Drive, and notifies all active cl |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Skill updates don't propagate — clones run outdated versions |  | No central registry → no way to know who has what version |  | Manual notification is forgotten → clones miss improvements |  | Reader-test gate is skipped → unvalidated skills reach production | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Leonardo (B1) publishing a new or updated X-Ray skill |  |  |  |  |  | \n  | WHEN | After successful x-ray-skill-packager run and reader-test pass |  |  |  |  |  | \n  | WHERE | Notion Skill Library (canonical) + Google Drive (distribution) |  |  |  |  |  | \n  | WHY | Scale requires a registry. Without it, version management is impossible. |  |  |  |  |  | \n  | HOW | /x-ray-publish or /x-ray-register → Notion entry + Drive upload + clone notifica |  |  |  |  |  | \n  | HOW MUCH | Manual registry update: 20 min/skill → automated: 2 min. Clone notification: ins |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Reader-test gate required — no publication without validation |  |  |  |  |  | \n  | → | Registry covers: name, version, SKILL.md, trigger phrases, active clone list |  |  |  |  |  | \n  | → | Auto-activates after x-ray-skill-packager handoff |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-publish  ·  /x-ray-register  ·  publicar skill X-Ray  ·  registrar nova v |  |  |  |  |  | \n  | DO NOT USE FOR | Generic skill publishing (use skill-publish-and-register) · pre-reader-test skil |  |  |  |  |  | \n  | PAIRS WITH | x-ray-skill-packager (input) · skill-publish-and-register (generic variant) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | packager → reader-test → publish |  | Full release pipeline: package → validate → register → notify |  |  | 15 min | \n  | WOW #2 | /x-ray-register × batch |  |  |  |  |  | \n  | WOW #3 | clone notification + Notion link |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-publish-register · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-self-knowledge ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Self-Knowledge · Suite Router |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A tool library is only useful if you can find the right tool instantly. The rout |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Any X-Ray user (Leonardo, Rogerinho, clone consultants) who faces ambiguity abou |  | 10 skills in the X-Ray suite — wrong activation wastes time and produces wrong o |  |  | One question → one correct skill recommendation in under 5 seconds |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Skill overlap creates activation ambiguity — wrong skill, wrong output |  | x-ray-abs vs x-ray-orchestrator both sound like 'run a diagnosis' |  | x-ray-db vs x-ray-orchestrator both relate to 'structuring the case' |  | New consultant clones (B2) don't have institutional knowledge of the suite | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Any X-Ray user facing ambiguity between two or more suite skills |  |  |  |  |  | \n  | WHEN | Any time the right skill isn't immediately clear — before activating a wrong one |  |  |  |  |  | \n  | WHERE | Meta-layer — activates before any other X-Ray skill in ambiguous situations |  |  |  |  |  | \n  | WHY | Wrong skill activation creates rework. A 5-second routing check prevents it. |  |  |  |  |  | \n  | HOW | Say '/x-ray-help' or 'qual skill X-Ray usar para [task]' → receive precise skill |  |  |  |  |  | \n  | HOW MUCH | Wrong skill activation: 10–30 min rework → router check: 5 seconds. Especially v |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Covers all 10 X-Ray skills + cross-reference routing table |  |  |  |  |  | \n  | → | Distinguishes B1 (Leonardo) vs B2 (clone consultant) vs C (client) contexts |  |  |  |  |  | \n  | → | Inspired by Anthropic product-self-knowledge — same pattern, X-Ray domain |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-help  ·  qual skill X-Ray usar  ·  como funciona a suite  ·  mapa da suit |  |  |  |  |  | \n  | DO NOT USE FOR | Anthropic product questions (use product-self-knowledge) · executing tasks |  |  |  |  |  | \n  | PAIRS WITH | All X-Ray skills (this is the meta-router) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | B2 clone onboarding + self-knowledge |  | New consultant: route any question correctly from day 1 |  |  | Instant | \n  | WOW #2 | ambiguous request → self-knowledge → correct skill |  |  |  |  |  | \n  | WOW #3 | /x-ray-help + x-ray-onboarding-ebook |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-self-knowledge · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: x-ray-skill-packager ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | X-Ray Skill Packager · Suite Distribution |  |  |  |  |  |  | \n  | Category | X-Ray Suite | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Distribution is the last mile of creation. A skill that can't be packaged and de |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Leonardo delivering the X-Ray suite to a new consultant buyer |  | Manual packaging of 10+ skill files is error-prone and produces inconsistent del |  |  | One command → one ready-to-upload ZIP that works perfectly on the buyer's Claude |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Suite delivery is manual, error-prone, and hard to version |  | Forgetting one skill file = broken consultant experience |  | No version tagging → buyer doesn't know which suite version they have |  | No setup instructions = consultant support calls instead of autonomous onboardin | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Leonardo (B1) delivering the suite to a new consultant buyer or pushing an updat |  |  |  |  |  | \n  | WHEN | On new buyer purchase or after a major suite update |  |  |  |  |  | \n  | WHERE | Output: single ZIP for Claude.ai upload or email attachment |  |  |  |  |  | \n  | WHY | Consistent, complete delivery is a product quality signal — first impression mat |  |  |  |  |  | \n  | HOW | /x-ray-package → generates complete ZIP with all skills + docs + brand config te |  |  |  |  |  | \n  | HOW MUCH | Manual packaging: 30–60 min/buyer → automated: 2 min. Zero missed files. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Includes: all 10 SKILL.md files + README + setup guide + brand config template |  |  |  |  |  | \n  | → | Version-tagged output → consultant knows exactly which suite they have |  |  |  |  |  | \n  | → | Handoff to x-ray-publish-register for Notion registration |  |  |  |  |  | \n  | TRIGGER PHRASES | /x-ray-package  ·  empacotar suite X-Ray  ·  gerar ZIP da suite  ·  preparar ent |  |  |  |  |  | \n  | DO NOT USE FOR | Single skill packaging (use cmd-02-mirp) |  |  |  |  |  | \n  | PAIRS WITH | x-ray-publish-register (post-packaging) · cmd-01-pps (general packaging) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | /x-ray-package + /x-ray-publish |  | Package → register → notify buyer in one flow |  |  | 5 min | \n  | WOW #2 | Version bump + repackage |  |  |  |  |  | \n  | WOW #3 | Brand config template included |  |  |  |  |  | \n  | Aigovbrasil · X-Ray Suite · x-ray-skill-packager · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: cmd-01-pps ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | CMD-01-PPS · Project Packaging System |  |  |  |  |  |  | \n  | Category | CMD Systems | Version | 2.0.0 | Language | PT-BR / EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Packaging is a tax on creative work. The lower the packaging tax, the more time  |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Power users packaging multiple projects daily — consultants, devs, content creat |  | 2 h/day lost to manual packaging: inconsistent naming, no audit trail, copy-past |  |  | Type 3 characters → receive a production-ready, versioned, client-ready package  |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Packaging manual repetitivo consome 2h/dia sem rastreabilidade |  | Naming inconsistente quebra automações downstream — 15 XLS com nomes diferentes |  | Sem rastreabilidade — qual comando rodou quando? Retrabalho frequente |  | Copy-paste error-prone em comandos longos — medo de automatizar | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultants, devs, and operators who package projects daily |  |  |  |  |  | \n  | WHEN | Daily (batch processing), weekly (sprint archive), monthly (portfolio), ad-hoc ( |  |  |  |  |  | \n  | WHERE | Files in /mnt/project/, uploads, ZIPs from other accounts |  |  |  |  |  | \n  | WHY | Every packaging operation creates audit trail — what ran, when, what changed |  |  |  |  |  | \n  | HOW | Type trigger ID or combination (T03+T07+T12) → receives client-ready package |  |  |  |  |  | \n  | HOW MUCH | 2h/day → 15 min/day. 73% token reduction vs manual. $6/month saved × 200 runs. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Time: 2 h/day → 15 min/day (87.5% reduction) |  |  |  |  |  | \n  | → | Token cost: 73% reduction per run (3.4k vs 12k tokens) |  |  |  |  |  | \n  | → | Error rate: 15% manual → 2% automated (QA gates + idempotency) |  |  |  |  |  | \n  | TRIGGER PHRASES | CMD-01-PPS  ·  T03+T07+T12  ·  W01  ·  empacota projeto  ·  estrutura repo  ·  T |  |  |  |  |  | \n  | DO NOT USE FOR | Non-packaging tasks · content creation · strategy work |  |  |  |  |  | \n  | PAIRS WITH | cmd-02-mirp (skill improvement) · x-ray-abs (T07 mode) · forge-visual-canvas (T0 |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | T03+T07+T12 |  | Normalize + X-Ray mode + client branding — daily deliverable factory |  |  | 30 sec | \n  | WOW #2 | T01+T05+T15 |  |  |  |  |  | \n  | WOW #3 | A03+A08+A11+A18 |  |  |  |  |  | \n  | Aigovbrasil · CMD Systems · cmd-01-pps · v2.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: cmd-02-mirp ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | CMD-02-MIRP · Modify-Improve-Register-Publish |  |  |  |  |  |  | \n  | Category | CMD Systems | Version | 1.0.0 | Language | PT-BR / EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A skill that isn't documented is a skill only its creator can use. A skill that  |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Skill developers managing 10+ skills across multiple Claude accounts |  | 20 skills, 3 accounts, zero consistency — 4 h/week lost finding and fixing skill |  |  | One command transforms any skill into an industrial-grade package with Notion re |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | 20 skills · 3 accounts · zero consistency = 4h/week lost |  | No taxonomy → can't remember trigger phrases → retyping long commands daily |  | No registry → don't know which account has which skill → same skill uploaded 3× |  | No versioning → fear of improving = stagnation, tech debt accumulates | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Anyone managing a library of Claude skills who needs systematic improvement |  |  |  |  |  | \n  | WHEN | Weekly (full pipeline on new skills), daily (fast enhance existing), monthly (ba |  |  |  |  |  | \n  | WHERE | Input: /mnt/skills/ or ZIPs · Output: /mnt/user-data/outputs/ + Notion Library |  |  |  |  |  | \n  | WHY | Systematic skill development compounds — each improvement makes the whole librar |  |  |  |  |  | \n  | HOW | W01 [skill-name] or T03 [skill-name] → complete improved package in 30 sec–2 min |  |  |  |  |  | \n  | HOW MUCH | Manual skill improvement: 2 h → 2 min (98% reduction). Notion registry: 100% cov |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Time: 2 h manual → 2 min automated (98% reduction) per skill |  |  |  |  |  | \n  | → | 20 skills improved in 40 min vs 40 hours manual |  |  |  |  |  | \n  | → | Cross-account sync via Notion: 2 accounts unified in 5 min vs 4 h manual migrati |  |  |  |  |  | \n  | TRIGGER PHRASES | MIRP  ·  CMD-02-MIRP  ·  W01 [skill]  ·  T03 [skill]  ·  improve skill  ·  regis |  |  |  |  |  | \n  | DO NOT USE FOR | Non-skill packaging (use cmd-01-pps) · content creation |  |  |  |  |  | \n  | PAIRS WITH | cmd-01-pps (repo packaging) · skill-publish-and-register (Notion) · x-ray-skill- |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | W01 [skill-name] |  | Complete 12-step pipeline: chaotic skill → industrial package + Notion |  |  | 2 min | \n  | WOW #2 | T12+T15 |  |  |  |  |  | \n  | WOW #3 | T03+T08+A18 |  |  |  |  |  | \n  | Aigovbrasil · CMD Systems · cmd-02-mirp · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: cmd-03-maro ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | CMD-03-MARO · Multi-Agent Research Orchestrator |  |  |  |  |  |  | \n  | Category | CMD Systems | Version | 1.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Research quality is limited by the researcher's blind spots. Multiple specialist |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Researchers and consultants designing qualification systems for B2B service mark |  | First-skill discovery research produces inconsistent, non-comparable data — no s |  |  | A complete qualification system (form, scoring, logic) produced by coordinated s |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Research design is ad-hoc — no repeatable qualification system for B2B service o |  | Segmentation is guessed, not evidence-based — wrong persona targeting |  | Form design is unstructured — questions don't map to a scoring rubric |  | No decision logic — outputs don't answer 'is this case worth taking?' | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Researchers targeting Brazilian B2B service operators for first-skill discovery |  |  |  |  |  | \n  | WHEN | Research design phase — before data collection starts |  |  |  |  |  | \n  | WHERE | Claude project with research brief and persona data |  |  |  |  |  | \n  | WHY | Coordinated specialist agents produce higher quality than any single generalist |  |  |  |  |  | \n  | HOW | CMD-03-MARO + persona list → 4 subagents coordinate → delivers form + dictionary |  |  |  |  |  | \n  | HOW MUCH | Manual research system design: 8–12 h → automated: 60–90 min. 4 specialists work |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 4 subagents: segmentation · form design · schema/scoring · QA |  |  |  |  |  | \n  | → | Output package: form blueprint + variable dictionary + transcription schema + sc |  |  |  |  |  | \n  | → | Decision logic: binary case qualification — 'worth taking?' answered by the syst |  |  |  |  |  | \n  | TRIGGER PHRASES | CMD-03-MARO  ·  MARO  ·  coletor de pesquisa  ·  first-skill discovery  ·  formu |  |  |  |  |  | \n  | DO NOT USE FOR | Non-research tasks · single-agent tasks |  |  |  |  |  | \n  | PAIRS WITH | multiagent-research-orchestrator · x-ray-abs (post-research diagnosis) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | MARO + persona list |  | Paste 10 personas → receive complete qualification system |  |  | 90 min | \n  | WOW #2 | MARO + x-ray-abs |  |  |  |  |  | \n  | WOW #3 | MARO batch |  |  |  |  |  | \n  | Aigovbrasil · CMD Systems · cmd-03-maro · v1.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: praxis-os ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Praxis OS · Professional Services OS |  |  |  |  |  |  | \n  | Category | Major OS | Version | current | Language | EN / PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Professional services at scale require a method, not just talent. An OS enforces |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Consultants and knowledge-worker operators who need to orchestrate complex multi |  | Consulting quality varies by mood, memory, and energy — no enforced method acros |  |  | A complete OS that routes every consulting action to the right specialist agent, |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Consulting quality depends on memory and energy — not on a repeatable system |  | 23 specialist agents need to be remembered and activated correctly |  | Phase transitions happen informally — no gates, no confirmation |  | Each session reinvents context — no persistent state across conversations | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultants and knowledge workers managing multi-phase client engagements |  |  |  |  |  | \n  | WHEN | Every consulting session — from first client signal to final delivery review |  |  |  |  |  | \n  | WHERE | Claude project with praxis-os state files loaded |  |  |  |  |  | \n  | WHY | A method that runs itself is more consistent than any individual practitioner |  |  |  |  |  | \n  | HOW | /praxis or /praxis-* → OS routes to correct specialist agent for the phase |  |  |  |  |  | \n  | HOW MUCH | 23 agents, 5 phases, full lifecycle. Never invents commands. Confirms before des |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 5 phases: SIGNAL · INTELLIGENCE · ARTIFACT · DELIVERY · FEEDBACK |  |  |  |  |  | \n  | → | 23 specialist agents — each optimized for one function |  |  |  |  |  | \n  | → | Hard rules: never invents commands · never promotes hypotheses · always confirms |  |  |  |  |  | \n  | TRIGGER PHRASES | /praxis  ·  /praxis-*  ·  new client just signed  ·  where am I in the case  ·   |  |  |  |  |  | \n  | DO NOT USE FOR | Single-agent tasks that don't need orchestration |  |  |  |  |  | \n  | PAIRS WITH | x-ray-abs · forge-visual-canvas · horacio · empower-v4 |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | /praxis + new engagement |  | Full case lifecycle from signal to delivery in one OS |  |  | Full engagement | \n  | WOW #2 | SIGNAL phase + horacio |  |  |  |  |  | \n  | WOW #3 | DELIVERY phase + x-ray-brand-layer |  |  |  |  |  | \n  | Aigovbrasil · Major OS · praxis-os · vcurrent · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: empower-v4 ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Empower V4 · AI Usage Evaluator |  |  |  |  |  |  | \n  | Category | Major OS | Version | 4.0 | Language | EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | You can't improve what you don't measure. AI usage quality is measurable — and m |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | AI researchers, team leads, and operators who want evidence-based AI usage impro |  | AI usage feels productive but produces no measurable quality signal — no before/ |  |  | A maturity score, a risk cluster map, and a publication-ready report from raw co |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | AI usage quality is unmeasured — improvement is guesswork |  | Conversation exports are unstructured — no schema, no comparability |  | No maturity framework → no baseline, no benchmark, no goal |  | Weak prompt patterns persist invisibly — no detection, no upgrade path | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | AI researchers, team leads, L&D professionals, and operators measuring AI qualit |  |  |  |  |  | \n  | WHEN | After collecting a body of AI conversation data (individual or team-level) |  |  |  |  |  | \n  | WHERE | Claude project with conversation exports (XLSX/CSV/JSON/JSONL/ZIP) |  |  |  |  |  | \n  | WHY | Evidence-based improvement requires a measurement baseline. Empower V4 creates t |  |  |  |  |  | \n  | HOW | Upload exports → 'Run Empower' → normalized dataset + maturity score + risk map  |  |  |  |  |  | \n  | HOW MUCH | Manual analysis: 8–40 h → automated: 30–90 min. Publishable output ready for Git |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Maturity score: structural density, expansion ratio, epistemic quality per accou |  |  |  |  |  | \n  | → | Risk clusters: weak prompt patterns detected, upgrade candidates identified |  |  |  |  |  | \n  | → | Output: GitHub / Medium / LinkedIn publication-ready analysis |  |  |  |  |  | \n  | TRIGGER PHRASES | Empower V4  ·  Run Empower  ·  analyze Claude conversations  ·  maturity score   |  |  |  |  |  | \n  | DO NOT USE FOR | One-off prompt rewriting · advice without historical data |  |  |  |  |  | \n  | PAIRS WITH | praxis-os · horacio · x-ray-abs (research layer) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | Upload exports → Run Empower |  | Raw conversations → maturity report in 90 min |  |  | 90 min | \n  | WOW #2 | Compare accounts |  |  |  |  |  | \n  | WOW #3 | Empower + Medium report |  |  |  |  |  | \n  | Aigovbrasil · Major OS · empower-v4 · v4.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: horacio ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Horácio · Operational Intelligence Agent |  |  |  |  |  |  | \n  | Category | Major OS | Version | 2.0.0 | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Intelligence without a decision architecture produces noise. Fact, hypothesis, a |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Leonardo and operators running complex research, RAG, and strategic intelligence |  | Research and signals arrive from 10 sources in 10 formats — no normalization, no |  |  | Every input normalized, labeled (fact/hypothesis/inference), and written back as |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Dispersed research produces dispersed intelligence — no vault, no decision trail |  | Signals from web, GA4, ETL, dashboards arrive in incompatible formats |  | Facts and hypotheses are mixed — decisions made on guesses presented as facts |  | Knowledge reuse is zero — every research cycle reinvents the same context | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Leonardo and strategic operators running research-heavy decision workflows |  |  |  |  |  | \n  | WHEN | Any time research, signals, or strategic fragments need to be structured for dec |  |  |  |  |  | \n  | WHERE | Claude project with RAG context, Google Drive, Gmail MCP active |  |  |  |  |  | \n  | WHY | Decision quality equals information quality. Horácio enforces the discipline. |  |  |  |  |  | \n  | HOW | Paste research/signals → 'Horácio' → normalized vault asset with epistemic label |  |  |  |  |  | \n  | HOW MUCH | Tools: web_search · file_reading · bash_tool · Google Drive · Gmail. Moat: fact≠ |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Core loop: input → retrieval → normalize → decide → execute → writeback |  |  |  |  |  | \n  | → | Decision architecture: [FATO] / [HIPÓTESE] / [INFERÊNCIA] labels on every output |  |  |  |  |  | \n  | → | v2 active (2026-05-08). Earlier horacio.skill.zip archived. |  |  |  |  |  | \n  | TRIGGER PHRASES | Horácio  ·  CMD  ·  RAG  ·  vault  ·  Decision OS  ·  hiperdatacolec  ·  o que f |  |  |  |  |  | \n  | DO NOT USE FOR | Pure casual conversation · code debugging without strategic framing |  |  |  |  |  | \n  | PAIRS WITH | praxis-os · empower-v4 · x-ray-abs · google-drive-mcp · gmail-mcp |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | RAG + vault writeback |  | Research session → normalized vault asset in one flow |  |  | Session | \n  | WOW #2 | GA4 data + Horácio |  |  |  |  |  | \n  | WOW #3 | Horácio + x-ray-abs |  |  |  |  |  | \n  | Aigovbrasil · Major OS · horacio · v2.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: forge-visual-canvas ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | FORGE Visual Canvas · Premium Visuals |  |  |  |  |  |  | \n  | Category | Major OS | Version | 2.0.0 | Language | PT-BR / EN | Owner | Leonardo + FORGE\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Visual quality is a trust signal. An executive-quality artifact communicates com |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Consultants, designers, and operators producing client-facing visual artifacts |  | AI-generated visuals look generic — purple gradients, Inter font, obvious AI aes |  |  | Premium, agency-quality HTML/PDF/PPTX artifacts with brand consistency and dark/ |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | AI visual output defaults to low-quality, recognizable AI aesthetic |  | No brand consistency across artifacts — each one looks different |  | No visual language system — can't specify 'McKinsey style' and get it |  | Dark/light mode requires rebuilding — no runtime toggle | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Consultants, designers, content creators needing agency-quality visual output |  |  |  |  |  | \n  | WHEN | Any deliverable that will be seen by a client, stakeholder, or public audience |  |  |  |  |  | \n  | WHERE | Output: standalone HTML/PDF/PPTX — deployable anywhere |  |  |  |  |  | \n  | WHY | First impressions are visual. A premium artifact signals a premium service. |  |  |  |  |  | \n  | HOW | Describe the artifact + specify visual language → receives full-quality file |  |  |  |  |  | \n  | HOW MUCH | Agency design time: 4–8 h → automated: 15–30 min. 10 visual languages available. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 10 visual languages: Executive · SaaS · Editorial · Dashboard · Terminal · Gover |  |  |  |  |  | \n  | → | 3-layer pipeline: structure (format) → tokens (brand) → acabamento (mood) |  |  |  |  |  | \n  | → | Formats: HTML · React/JSX · SVG · PDF A4 · PPTX — all in one skill |  |  |  |  |  | \n  | TRIGGER PHRASES | FORGE  ·  criar artifact  ·  visual canvas studio  ·  PDF estratégico A4  ·  est |  |  |  |  |  | \n  | DO NOT USE FOR | Pure text tasks · backend code · conceptual questions without visual output |  |  |  |  |  | \n  | PAIRS WITH | x-ray-brand-layer · x-ray-onboarding-ebook · cmd-01-pps (T09 mode) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | FORGE + McKinsey style |  | Business presentation → agency-quality deck in 30 min |  |  | 30 min | \n  | WOW #2 | FORGE + dark/light toggle |  |  |  |  |  | \n  | WOW #3 | forge + x-ray-brand-layer |  |  |  |  |  | \n  | Aigovbrasil · Major OS · forge-visual-canvas · v2.0.0 · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: frankwatching-editor ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Frankwatching Editor · Dutch Editorial Engine |  |  |  |  |  |  | \n  | Category | Editorial Publishing | Version | current | Language | NL | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Publishing authority is built by meeting the editorial standard of the platform, |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Marketing and AI professionals publishing for Dutch-speaking professional audien |  | Good Dutch content written in generic format gets rejected or ignored by platfor |  |  | Publication-ready Frankwatching article from a rough draft — first submission, a |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Good ideas in wrong format don't get published — platform standard is invisible  |  | Structure doesn't match Frankwatching: intro + 3–5 sections + conclusion |  | SEO headings not optimized for Dutch search language |  | Tone is too casual or too academic for Dutch professional marketing audience | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Marketing professionals, AI practitioners, consultants targeting Dutch B2B audie |  |  |  |  |  | \n  | WHEN | After initial draft is written — before submission |  |  |  |  |  | \n  | WHERE | Frankwatching platform (leading Dutch digital marketing publication) |  |  |  |  |  | \n  | WHY | Platform-standard articles get distributed. Off-standard articles get edited or  |  |  |  |  |  | \n  | HOW | Paste draft → 'rewrite as Frankwatching article' → publication-ready output |  |  |  |  |  | \n  | HOW MUCH | Manual platform-standard rewrite: 1–2 h → automated: 5 min. First-submission qua |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Frankwatching standard: intro + 3–5 sections + conclusion + SEO-optimized headin |  |  |  |  |  | \n  | → | Tone calibrated for Dutch professional digital marketing audience |  |  |  |  |  | \n  | → | Auto-activates when Dutch professional content context is detected |  |  |  |  |  | \n  | TRIGGER PHRASES | Frankwatching  ·  Dutch professional article  ·  publiceren voor NL publiek  ·   |  |  |  |  |  | \n  | DO NOT USE FOR | English-only content · casual blog posts · non-professional audiences |  |  |  |  |  | \n  | PAIRS WITH | scripity · live-prompt-pro-converter · cmd-01-pps (packaging) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | draft → Frankwatching standard |  | Rough draft → platform-ready in 5 min |  |  | 5 min | \n  | WOW #2 | AI topic + Frankwatching |  |  |  |  |  | \n  | WOW #3 | scripity corpus + frankwatching |  |  |  |  |  | \n  | Aigovbrasil · Editorial Publishing · frankwatching-editor · vcurrent · MIT Licen |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: scripity ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Scripity · Document Corpus Generator |  |  |  |  |  |  | \n  | Category | Editorial Publishing | Version | current | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A product without a complete document corpus is invisible. 17 artifacts from one |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Founders, product managers, and consultants who need a complete documentation su |  | Products launch without proper documentation — no MRD, no messaging matrix, no G |  |  | Complete 17-artifact corpus generated from a YAML metadata block in one run |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Documentation is created ad-hoc — incomplete, inconsistent, not interconnected |  | Each document is created in isolation — no dependency chain, no consistency |  | 19 frameworks analyzed manually one at a time — takes weeks |  | New product requires weeks of documentation work before any external communicati | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Founders, product managers, consultants, and creators documenting any product or |  |  |  |  |  | \n  | WHEN | Product launch prep, go-to-market planning, new engagement documentation |  |  |  |  |  | \n  | WHERE | Claude project with YAML metadata block |  |  |  |  |  | \n  | WHY | Complete documentation is a force multiplier — every artifact references the sam |  |  |  |  |  | \n  | HOW | Paste YAML metadata → 'rodar scripity' → 17 artifacts + 19 framework analyses in |  |  |  |  |  | \n  | HOW MUCH | Manual documentation suite: 2–4 weeks → automated: 60–90 min for full corpus. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 17 artifacts: brief, MRD, BRD, PRD, positioning, ICP, messaging, GTM, content ca |  |  |  |  |  | \n  | → | 19 framework analyses (F1–F7 categories) applied to the product |  |  |  |  |  | \n  | → | Input: YAML metadata block. The richer the input, the higher the corpus quality. |  |  |  |  |  | \n  | TRIGGER PHRASES | scripity  ·  gerar corpus  ·  criar 17 artefatos  ·  novo corpus  ·  rodar scrip |  |  |  |  |  | \n  | DO NOT USE FOR | Single-artifact requests · generic docs without product context |  |  |  |  |  | \n  | PAIRS WITH | frankwatching-editor · business-docx-pipeline · cmd-01-pps (packaging) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | YAML metadata → scripity |  | Complete 17-artifact corpus from one metadata block |  |  | 90 min | \n  | WOW #2 | scripity + frankwatching |  |  |  |  |  | \n  | WOW #3 | scripity + x-ray-abs |  |  |  |  |  | \n  | Aigovbrasil · Editorial Publishing · scripity · vcurrent · MIT License · 2026 |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: live-prompt-pro-converter ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Live Prompt Pro Converter · Prompt Optimizer |  |  |  |  |  |  | \n  | Category | Editorial Publishing | Version | current | Language | PT-BR / EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A bad prompt produces an expensive retry loop. A good prompt is a specification, |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Claude users who write prompts that produce inconsistent, off-target outputs |  | Good intentions in a prompt produce bad outputs — no role, no constraints, no fo |  |  | Any rough request transformed into a structured, high-performance prompt in 30 s |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Prompts are written like messages, not like specifications |  | No role injection → Claude defaults to generic mode |  | No constraint spec → outputs vary in length, tone, and format |  | No model-specific optimization → same prompt performs differently across GPT/Cla | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Any Claude user who writes prompts for repeated workflows |  |  |  |  |  | \n  | WHEN | Before saving a prompt as a permanent workflow or when an existing prompt produc |  |  |  |  |  | \n  | WHERE | Any Claude conversation or prompt library |  |  |  |  |  | \n  | WHY | A well-structured prompt is a productive asset. A bad prompt is a daily tax. |  |  |  |  |  | \n  | HOW | Paste prompt → 'converta esse prompt' → structured output with role, context, ta |  |  |  |  |  | \n  | HOW MUCH | Bad prompt retry loop: 3–5 attempts → optimized prompt: 1st attempt. Works for a |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Output structure: role · context · task · format · constraints · examples |  |  |  |  |  | \n  | → | Before/after comparison included — transparency on changes made |  |  |  |  |  | \n  | → | Model variants on request: Claude / GPT-4 / Gemini adaptations |  |  |  |  |  | \n  | TRIGGER PHRASES | converta esse prompt  ·  prompt engineering  ·  make this prompt better  ·  otim |  |  |  |  |  | \n  | DO NOT USE FOR | One-off responses · content creation that isn't prompt-based |  |  |  |  |  | \n  | PAIRS WITH | workflow-to-skill-magic · cmd-02-mirp (skill improvement uses this) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | bad prompt → converter |  | Inconsistent output → structured spec in 30 sec |  |  | 30 sec | \n  | WOW #2 | workflow description → prompt |  |  |  |  |  | \n  | WOW #3 | prompt → model variants |  |  |  |  |  | \n  | Aigovbrasil · Editorial Publishing · live-prompt-pro-converter · vcurrent · MIT  |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: business-docx-pipeline ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Business Docx Pipeline · Document Corpus |  |  |  |  |  |  | \n  | Category | Document Pipelines | Version | current | Language | PT-BR / EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A business document chain is only as strong as its dependency logic. MRD → BRD → |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Business analysts, product managers, and consultants building structured documen |  | Documents created out of order — PRD exists without a BRD, SOP references decisi |  |  | A complete, validated, dependency-correct document corpus from a single business |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Business documents are created ad-hoc — no dependency chain, no validation gates |  | Each document is created in isolation — PRD contradicts BRD |  | No human approval gate — wrong assumptions propagate through the chain |  | Epistemic labels absent — facts and inferences mixed in deliverables | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Business analysts, PMs, and consultants building structured documentation for ne |  |  |  |  |  | \n  | WHEN | Project initiation, product launch prep, go-to-market documentation |  |  |  |  |  | \n  | WHERE | Claude project with business brief or research input |  |  |  |  |  | \n  | WHY | Dependency-correct documentation prevents rework downstream |  |  |  |  |  | \n  | HOW | Paste business brief → 'pipeline documental' → receives dependency chain with hu |  |  |  |  |  | \n  | HOW MUCH | Manual chain creation: 2–4 weeks → automated: 4–8 h per full corpus. Epistemic l |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Dependency chain: MRD → BRD → PRD → SOP → Runbook → Roadmap → Backlog |  |  |  |  |  | \n  | → | Human approval gate before each major document — no assumption propagation |  |  |  |  |  | \n  | → | Epistemic labels: [FATO] / [HIPÓTESE] / [DECISÃO] on all claims |  |  |  |  |  | \n  | TRIGGER PHRASES | pipeline documental  ·  preciso do PRD  ·  gera o corpus  ·  monta o playbook  · |  |  |  |  |  | \n  | DO NOT USE FOR | Single-document requests without a chain · non-business documentation |  |  |  |  |  | \n  | PAIRS WITH | scripity · projects-to-linear (backlog export) · cmd-01-pps (packaging) |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | brief → full chain |  | Business brief → complete MRD–Backlog chain with gates |  |  | 8 h | \n  | WOW #2 | docx pipeline + projects-to-linear |  |  |  |  |  | \n  | WOW #3 | docx pipeline + scripity |  |  |  |  |  | \n  | Aigovbrasil · Document Pipelines · business-docx-pipeline · vcurrent · MIT Licen |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: multiagent-research-orchestrato ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Multiagent Research Orchestrator |  |  |  |  |  |  | \n  | Category | Research Systems | Version | current | Language | PT-BR / EN | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Research quality is ceiling-ed by the researcher's frame. Multiple specialist ag |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Researchers designing qualification systems for B2B service market studies |  | Research systems designed by one person have blind spots — incomplete segmentati |  |  | A complete qualification system produced by 4 specialists who each challenge the |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | One researcher → one frame → blind spots in segmentation, form, scoring, and QA |  | Segmentation without specialist review misses critical persona distinctions |  | Form questions without a scoring schema produce unanalyzable data |  | No QA agent = no validation that the system covers the research question | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Researchers targeting Brazilian B2B service operators for first-skill discovery |  |  |  |  |  | \n  | WHEN | Research design phase — before data collection |  |  |  |  |  | \n  | WHERE | Claude project with research brief and persona data |  |  |  |  |  | \n  | WHY | Coordination between specialists produces quality no single agent can match |  |  |  |  |  | \n  | HOW | Paste persona list + brief → orchestrator coordinates 4 subagents → complete qua |  |  |  |  |  | \n  | HOW MUCH | Manual system design: 8–12 h → automated: 60–90 min with 4-agent coordination. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | Package: form blueprint + variable dictionary + transcription schema + scoring r |  |  |  |  |  | \n  | → | Decision logic: case qualification answer — 'worth taking?' — built into the sys |  |  |  |  |  | \n  | → | Pre/post model: baseline and target state defined |  |  |  |  |  | \n  | TRIGGER PHRASES | coletor de pesquisa  ·  first-skill discovery  ·  formulário de qualificação  ·  |  |  |  |  |  | \n  | DO NOT USE FOR | Non-research tasks · single-agent sufficient work |  |  |  |  |  | \n  | PAIRS WITH | cmd-03-maro · x-ray-abs (post-research) · business-docx-pipeline |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | persona list → full system |  | 10 personas → complete qualification system in 90 min |  |  | 90 min | \n  | WOW #2 | MAO + x-ray-abs |  |  |  |  |  | \n  | WOW #3 | MAO + docx pipeline |  |  |  |  |  | \n  | Aigovbrasil · Research Systems · multiagent-research-orchestrator · vcurrent · M |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: workflow-to-skill-magic ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Workflow to Skill Magic · Converter |  |  |  |  |  |  | \n  | Category | Research Systems | Version | current | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | Any workflow you repeat more than 3 times should be a skill. The cost of not pac |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Non-technical Claude users who repeat the same workflow weekly without knowing t |  | Effective workflows live only in chat history — can't be shared, versioned, or r |  |  | One conversation → one reusable SKILL.md ready to upload — 3 questions, zero tec |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Valuable workflows stay trapped in chat — unpackaged, unreusable, un-shareable |  | Non-technical users don't know SKILL.md format exists |  | Technical skills (cmd-02-mirp) are intimidating for non-dev users |  | Weekly reinvention of the same workflow costs 1–2 h/week indefinitely | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Non-technical Claude users with effective, repeatable workflows |  |  |  |  |  | \n  | WHEN | Any time a workflow is repeated more than 3 times |  |  |  |  |  | \n  | WHERE | Claude.ai conversation → output: SKILL.md + visual preview |  |  |  |  |  | \n  | WHY | Packaged skills compound in value. Unpackaged workflows have zero leverage. |  |  |  |  |  | \n  | HOW | Describe workflow → answer 3 questions (what/who/when) → receive SKILL.md + visu |  |  |  |  |  | \n  | HOW MUCH | Manual skill writing: 2–4 h → automated: 5 min. No dev knowledge required. |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 3 questions max: What do you do? Who is it for? When does it run? |  |  |  |  |  | \n  | → | Output: SKILL.md + visual preview widget — upload-ready |  |  |  |  |  | \n  | → | Integrates with cmd-02-mirp (full pipeline) and skill-publish-and-register (Noti |  |  |  |  |  | \n  | TRIGGER PHRASES | transforma isso em skill  ·  vira skill  ·  quero automatizar isso  ·  skill-ify |  |  |  |  |  | \n  | DO NOT USE FOR | Complex multi-agent skills (use cmd-02-mirp) · skills requiring code logic |  |  |  |  |  | \n  | PAIRS WITH | cmd-02-mirp (full pipeline) · skill-publish-and-register · live-prompt-pro-conve |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | workflow description → SKILL.md |  | 5 min conversation → upload-ready skill |  |  | 5 min | \n  | WOW #2 | workflow-to-skill + cmd-02-mirp |  |  |  |  |  | \n  | WOW #3 | weekly workflow → permanent skill |  |  |  |  |  | \n  | Aigovbrasil · Research Systems · workflow-to-skill-magic · vcurrent · MIT Licens |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: skill-publish-and-register ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | Skill Publish & Register · Notion Registry |  |  |  |  |  |  | \n  | Category | Meta-Skill Tooling | Version | current | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A skill that isn't in a registry doesn't exist for the team. Publishing is only  |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Skill creators who need a zero-friction path from creation to searchable Notion  |  | New skills get created and never registered — team members search Notion and fin |  |  | One command after skill creation → Notion library entry + dashboard row + SKILL. |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Skills created but not registered = invisible to the team and to future sessions |  | Manual Notion entry takes 15–20 min and is frequently skipped |  | Dashboard row update is a separate step — always forgotten |  | Full SKILL.md content not preserved in Notion — only metadata | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Skill creators (Leonardo or operators) completing a skill creation workflow |  |  |  |  |  | \n  | WHEN | Immediately after any successful skill creation — auto-activates as handoff |  |  |  |  |  | \n  | WHERE | Notion Skill Library (canonical) — Google Drive does not support write operation |  |  |  |  |  | \n  | WHY | A registry is the difference between a private tool and a shared asset |  |  |  |  |  | \n  | HOW | 'publica a skill' or auto-activates → Notion entry + subpage + dashboard row in  |  |  |  |  |  | \n  | HOW MUCH | Manual registration: 15–20 min → automated: 2 min. Auto-activates after skill cr |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | 3 Notion writes: library entry + SKILL.md subpage + dashboard row |  |  |  |  |  | \n  | → | Google Drive MCP does not support write — Notion is the canonical registry |  |  |  |  |  | \n  | → | Auto-activates after successful skill creation — zero manual trigger needed |  |  |  |  |  | \n  | TRIGGER PHRASES | publica a skill  ·  regista a skill  ·  salva no notion  ·  skill-publish  ·  pu |  |  |  |  |  | \n  | DO NOT USE FOR | X-Ray skills (use x-ray-publish-register) |  |  |  |  |  | \n  | PAIRS WITH | cmd-02-mirp (improvement before publishing) · workflow-to-skill-magic |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | skill creation → auto-register |  | Skill created → Notion entry in 2 min, zero manual steps |  |  | 2 min | \n  | WOW #2 | cmd-02-mirp → skill-publish |  |  |  |  |  | \n  | WOW #3 | batch register existing skills |  |  |  |  |  | \n  | Aigovbrasil · Meta-Skill Tooling · skill-publish-and-register · vcurrent · MIT L |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: adhd-desk-dashboard ===\n--- Table: Tabela 1 (38 rows × 8 cols) ---\n  |  |  |  |  |  |  |  | \n  | ADHD Desk Dashboard · Cognitive Workflow |  |  |  |  |  |  | \n  | Category | Accessibility & Cognitive Workflows | Version | current | Language | PT-BR | Owner | Leonardo Batista\n  | ◆  LAYER 1 — FIRST PRINCIPLES + ICP |  |  |  |  |  |  | \n  | FIRST PRINCIPLE | A workflow system designed for the hardest cognitive constraints works better fo |  |  |  |  |  | \n  | ICP — WHO |  |  |  |  |  |  | \n  | Solo knowledge workers with ADHD/TDAH and dyslexia who need low-cognitive-load s |  | Standard productivity systems require working memory that ADHD makes unavailable |  |  | A printable, high-contrast, one-task-per-card system that works with ADHD, not a |  | \n  | ◆  LAYER 2 — PROBLEM TREE (ROOT → BRANCHES → EFFECTS) |  |  |  |  |  |  | \n  | ROOT PROBLEM |  | BRANCH 1 |  | BRANCH 2 |  | BRANCH 3 | \n  | Standard productivity tools are designed for neurotypical working memory — wrong |  | Complex apps require setup and context-switching — both ADHD barriers |  | Digital-only systems get forgotten — physical + digital integration is essential |  | Generic templates don't account for sensory and visual processing differences | \n  | ◆  LAYER 3 — 5W2H OPERATIONAL FRAMEWORK |  |  |  |  |  |  | \n  | WHAT |  |  |  |  |  |  | \n  | WHO | Solo knowledge workers with ADHD/TDAH, dyslexia, or high cognitive-load constrai |  |  |  |  |  | \n  | WHEN | Daily workflow setup, weekly sprint planning, any session requiring structured e |  |  |  |  |  | \n  | WHERE | Physical desk (printed A4) + digital (Linear + calendar integration) |  |  |  |  |  | \n  | WHY | Reducing cognitive load isn't accommodating weakness — it's engineering for reli |  |  |  |  |  | \n  | HOW | Describe workflow needs → receives A4 PPTX + PDF + markdown checklists + Linear  |  |  |  |  |  | \n  | HOW MUCH | Output formats: A4 PPTX (print-ready) + PDF + markdown + Linear. Design: high co |  |  |  |  |  | \n  | ◆  LAYER 4 — DATA-DRIVEN EVIDENCE + CMD TRIGGERS + WOW COMBINATIONS |  |  |  |  |  |  | \n  | KEY METRICS |  |  |  |  |  |  | \n  | → | ⚠️ R-004 Sensitivity flag: health-adjacent context. Not medical advice. |  |  |  |  |  | \n  | → | Design principles: high contrast · large type · one task per card · no visual cl |  |  |  |  |  | \n  | → | Integrates physical (printed) + digital (Linear + calendar) workflows |  |  |  |  |  | \n  | TRIGGER PHRASES | ADHD-friendly workflow  ·  mesa de trabalho  ·  painel de operação  ·  printable |  |  |  |  |  | \n  | DO NOT USE FOR | Medical diagnosis or treatment recommendation |  |  |  |  |  | \n  | PAIRS WITH | projects-to-linear · forge-visual-canvas · cmd-01-pps |  |  |  |  |  | \n  | WOW COMBINATIONS | COMBO |  |  |  |  |  | \n  | WOW #1 | ADHD dashboard + Linear |  | Desk system + digital backlog synchronized in one session |  |  | 30 min | \n  | WOW #2 | A4 print + daily reset |  |  |  |  |  | \n  | WOW #3 | sprint cards + Linear |  |  |  |  |  | \n  | Aigovbrasil · Accessibility & Cognitive Workflows · adhd-desk-dashboard · vcurre |  |  |  |  |  |  | \n  ... (8 more rows)\n\n=== SHEET: GLOSSARY ===\n--- Table: Tabela 1 (22 rows × 5 cols) ---\n  |  |  |  |  | \n  | GLOSSARY · Key Terms for Non-Technical Readers |  |  |  | \n  |  |  |  |  | \n  | Term | Plain English Definition | Where it appears |  | \n  | Claude Skill / SKILL.md | A reusable instruction file that teaches Claude a specific behavior or workflow. | Every skill tab |  | \n  | CMD (Command) | A short ID-based command that activates a specific skill action. E.g., T03+T07+T | CMD Systems tabs |  | \n  | Trigger phrase | A word or phrase that automatically activates a skill. E.g., saying 'x-ray' acti | Every skill tab — Layer 4 |  | \n  | First Principles | The irreducible core truth behind a skill's existence — the reason it was built, | Every skill tab — Layer 1 |  | \n  | ICP (Ideal Customer/User Profile) | A precise description of who a skill is built for: their role, their pain, and w | Every skill tab — Layer 1 |  | \n  | Problem Tree | A structured root-cause analysis: the root problem, its branches (causes), and t | Every skill tab — Layer 2 |  | \n  | 5W2H | A completeness framework: What · Who · When · Where · Why · How · How Much. Ensu | Every skill tab — Layer 3 |  | \n  | WOW Combination | The 3 most powerful trigger combinations for a skill — pre-tested use cases that | Every skill tab — Layer 4 |  | \n  | Epistemic label | A tag that marks whether a claim is a Fact [FATO], Hypothesis [HIPÓTESE], Decisi | X-Ray Suite, Horácio, docx pipeline |  | \n  | PASTEL | Political · Analytical · Social · Technological · Economic · Legal — a macro-env | AI_GOV_CONTEXT tab |  | \n  | Gate (G1–G4) | A mandatory checkpoint in the X-Ray consulting method. A gate must pass before m | X-Ray Suite tabs |  | \n  | Canonical pipeline | A fixed, ordered sequence of phases (S00–S20) and gates (G0–G12) that every X-Ra | x-ray-abs, x-ray-db, x-ray-orchestrator |  | \n  | RAG (Retrieval-Augmented Generation) | A technique where Claude retrieves relevant documents before generating a respon | Horácio tab |  | \n  | Vault | Horácio's organized storage of normalized, labeled intelligence assets — the out | Horácio tab |  | \n  | MIT License | An open-source license that allows free use, modification, and distribution with | Root README |  | \n  | B1 / B2 / C layers | B1 = Leonardo (creator). B2 = Consultant clone (buyer). C = Final client. Each l | X-Ray Suite tabs |  | \n  | Sensitivity flag R-004 | A marker on adhd-desk-dashboard indicating health-adjacent context. Not medical  | ADHD tab |  | \n  | EU AI Act Article 4 | European regulation (in force Feb 2025) requiring organizations to ensure their  | AI_GOV_CONTEXT tab |  | \n","stderr":""}
{"returncode":0,"stdout":"=== AI LITERACY GOVERNANCE EBOOK ===\n<title>AI Literacy &amp; Governance — Índice Proposto para Claude</title>\n    <h1>AI Literacy &amp;<br>Governance</h1>\n    <h2 id=\"page-title\">Sumário Executivo</h2>\n    <h3 class=\"sec-title\">Sumário Executivo</h3>\n    <h3 class=\"sec-title\">AI Act &amp; Base Regulatória</h3>\n    <h3 class=\"sec-title\">Frameworks Educacionais</h3>\n    <h3 class=\"sec-title\">Estado da Arte de Mensuração</h3>\n    <h3 class=\"sec-title\">Metodologia do AI Literacy Index</h3>\n    <h3 class=\"sec-title\">Aplicação ao Claude</h3>\n    <h3 class=\"sec-title\">Tabela de Síntese Comparativa</h3>\n    <h3 class=\"sec-title\">Limitações &amp; Questões Abertas</h3>\n    <h3 class=\"sec-title\">Recomendações por Público</h3>\n    <h3 class=\"sec-title\">Checklist de Conformidade AI Act Art. 4</h3>\n    <h3 class=\"sec-title\">Toolkit de Avaliação</h3>\n    <h3 class=\"sec-title\">Roadmap de Implementação</h3>\n    <h3 class=\"sec-title\">Referências &amp; Documentação</h3>\n\n=== AZ AI LITERACY EBOOK ===\n<title>A-Z da AI Literacy & AI Fluency</title>\n","stderr":""}
{"returncode":0,"stdout":"\n\n=========== ai-literacy-governance-ebook.html ===========\n--- first 4000 chars ---\n\n\n[HTML] \n\n[HEAD] \n\n[TITLE] AI Literacy & Governance — Índice Proposto para Claude\n\n☰\n\n \n \n[H1] AI Literacy &Governance\n Índice Proposto para Claude\n\n v1.0 — Maio 2026\n \n\n \n \n \n\n \n Fundamentos\n\n 01 Sumário Executivo\n\n 02 AI Act & Base Regulatória\n\n 03 Frameworks Educacionais\n\n 04 Estado da Mensuração\n\n \n\n \n Índice Proposto\n\n 05 Metodologia do Índice\n\n 06 Aplicação ao Claude\n\n 07 Tabela Comparativa\n\n 08 Limitações & Questões\n\n \n\n \n Aplicações Práticas\n\n 09 Recomendações por Público\n\n 10 Checklist de Conformidade\n\n 11 Toolkit de Avaliação\n\n 12 Roadmap de Implementação\n\n \n\n \n Recursos\n\n 13 Referências & Documentação\n\n \n\n \n \n\n \n[H2] Sumário Executivo\n Maio 2026\n\n \n\n \n\n \n Fundamentos\n \n[H3] Sumário Executivo\n A noção de AI literacy nas fontes mais normativas não é \"saber programar IA\", mas possuir competências, conhecimentos e compreensão suficientes para usar, supervisionar e interpretar sistemas de IA de modo informado, consciente de oportunidades, riscos e possíveis danos.\n\n \n\n \n \n[H4] 🎯 Definição Legal\n AI Act (Artigo 4): Define \"literacia no domínio da IA\" como competências, conhecimentos e compreensão que permitam implantação informada e consciência sobre oportunidades, riscos e possíveis danos. Obriga prestadores e deployers a adotarem medidas proporcionais ao contexto, ao risco, ao perfil das pessoas envolvidas e aos grupos afetados.\n\n Vigência: Disposições gerais aplicam-se desde 2 de fevereiro de 2025; supervisão por autoridades nacionais começa em agosto de 2026.\n\n \n\n \n \n[H4] 🌍 Convergência com Marcos Educacionais\n OrganizaçãoFocoDimensões Centrais\n UNESCOEstudantes & Professores12-15 competências em 4-5 dimensões; progressão por níveis\n OECDEducação & TrabalhoEngajamento crítico; letramento geral, não especialização\n AI ActConformidade RegulatóriaCompreensão conceitual, uso prático, avaliação crítica, ética/governança\n \n\n \n\n \n \n[H4] 📊 Maturidade da Mensuração\n Aviso Metodológico: A revisão sistemática identificou 16 escalas validadas em 22 estudos, majoritariamente de autorrelato; apenas 3 eram baseadas em desempenho, e praticamente nenhuma tinha validade transcultural testada. Um estudo de 2026 mostrou baixa correlação entre medidas autorrelatadas e objetivas.\n\n Implicação: Qualquer índice sério para LLMs deve ser multimétodo: checklist documental, testes comportamentais, medidas de calibração, evidências públicas de segurança e governança.\n\n \n\n \n \n[H4] 🏆 Resultado do Índice Proposto\n \n Claude (Família 4.x)\nAplicação hipotética do AI Literacy Index\n\n 81/100\n\n ALTA\n\n \n\n Interpretação: Documentação e governança públicas acima da média, boa infraestrutura para supervisão e uso crítico, mas com lacunas importantes em calibração pública padronizada, fidelidade de citações e comparabilidade externa entre benchmarks.\n\n \n\n \n Fundamentos\n \n[H3] AI Act & Base Regulatória\n O AI Act estabelece obrigações legais específicas para literacia em IA, com definições precisas e cronograma de implementação já iniciado.\n\n \n\n \n \n[H4] ⚖️ Definição Legal (Artigo 4)\n \"Literacia no domínio da IA\" = competências, conhecimentos e compreensão que permitam implantação informada e consciência sobre oportunidades, riscos e possíveis danos.— AI Act, Artigo 4 (versão em português)\n\n Obrigação: Prestadores e deployers devem adotar medidas \"na medida do possível\" para garantir nível suficiente de literacia, considerando: conhecimento técnico, experiência, formação, contexto de uso e pessoas afetadas.\n\n \n\n \n \n[H4] 📅 Cronograma de Aplicação\n \n 02 FEV 2025\nDisposições Gerais Entram em Vigor\nArtigo 4 (literacia em IA) passa a ser obrigatório para prestadores e deployers\n\n AGO 2026\nInício da Supervisão Nacional\nAutoridades nacionais começam fiscalização e aplicação de sanções\n\n ATUAL\nPeríodo de Adaptação\nOrganizações devem implementar programas e manter registros internos\n\n \n\n \n\n \n \n[H4] 📋 FAQ Oficial da Comissão Europeia\n ▶O que a Comissão espera no mínimo?\n\n Conteúdo Mínimo\nCompreensão geral do que é IA e como funciona\nClareza sobre papel da organização (pre\n\n\n=========== az-ai-literacy-ebook.html ===========\n--- first 4000 chars ---\n\n\n[HTML] \n\n[HEAD] \n\n[TITLE] A-Z da AI Literacy & AI Fluency\n\n \n\n \n\n \n\n \n Guia Executivo · AI Literacy & AI Fluency · 2026\n\n \n A–Z da\n AI Literacy\n & AI Fluency\n \n\n \n Como usar IA com clareza, crítica e responsabilidade no trabalho.\n Do letramento básico à fluência operacional.\n \n\n \n Acesso à IA não é fluência.\n\n Fluência é saber delegar, descrever, discernir, verificar e responder pelo uso.\n\n \n\n \n Aprender\n\n →\n\n Configurar\n\n →\n\n Usar\n\n →\n\n Verificar\n\n →\n\n Registrar\n\n \n\n \n\n A-Z\n\n \n \n Para executivos, pesquisadores, analistas, consultores\n e profissionais não-devs que usam IA no trabalho.\n \n\n \n Versão 1.0\n © 2026\n \n\n \n\n \n\n \n\n Contexto Estratégico\n\n Por que isso importa agora\n\n O problema, o custo da inação e os fatores de mudança\n\n \n\n \n \n \n O Problema Estratégico\n\n A adoção de IA generativa acelerou radicalmente no trabalho. Profissionais usam IA para pesquisa, análise, escrita, código e decisão. Mas acesso não é maturidade.\n\n A maior parte do uso ainda é baseada em prompts isolados, sem personalização, sem verificação e sem governança. O resultado: retrabalho elevado, confiança falsa em outputs polidos mas imprecisos, e exposição a riscos de compliance, privacidade e reputação.\n\n \n O Custo da Inação\n\n \n \n Produtividade\n\n Tempo gasto corrigindo outputs mal especificados ou verificando informações alucinadas.\n\n \n\n \n Qualidade\n\n Decisões baseadas em respostas genéricas ou desatualizadas.\n\n \n\n \n Governança\n\n Exposição de dados sensíveis, falta de trilha de auditoria, uso sem supervisão.\n\n \n\n \n Competitividade\n\n Organizações que não estruturam uso de IA ficam mais lentas e menos confiáveis.\n\n \n\n \n\n \n\n \n\n \n \n Mudança de Contexto — Por Que Agora\n\n \n \n Regulatório\n\n \n\n \n O AI Act da UE torna AI literacy uma obrigação legal desde fevereiro de 2025. O Artigo 4 exige formação proporcional ao contexto, risco e pessoas afetadas.\n ↗ AI Act, Artigo 4\n \n\n \n\n \n \n Comportamental\n\n \n\n \n O AI Fluency Index analisou 9.830 conversas e identificou que 85,7% tinham iteração. Conversas iterativas questionam mais o raciocínio e identificam melhor o contexto ausente.\n ↗ Anthropic AI Fluency Index\n \n\n \n\n \n \n Operacional\n\n \n\n \n Personalização em camadas transforma IA de ferramenta genérica em sistema alinhado ao trabalho real. A maioria não separa contexto, método e output corretamente.\n ↗ Documentação oficial Claude\n \n\n \n\n \n \n Estratégico\n\n \n\n \n Acelerar aprendizado exige agenda estruturada, perguntas sobre o passado e testes de hipóteses — não ação imediata sem contexto.\n ↗ Método Watkins — First 90 Days\n \n\n \n\n \n\n \n\n \n\n 02\n\n A-Z da AI Literacy & AI Fluency\n\n \n\n \n\n Base Metodológica\n\n Fontes e base metodológica\n\n Fontes primárias, regulação oficial, pesquisa comportamental e documentação técnica\n\n \n\n \n Este guia foi desenvolvido com base em fontes primárias. Nenhum dado, estatística ou claim foi inventado. Cada afirmação tem referência rastreável.\n\n \n\n \n \n \n Fonte\n Contribuição\n Aplicação Prática\n Referência\n \n \n \n \n AI Act / AI Literacy\n\n Define AI literacy como competências, conhecimentos e compreensão para uso informado. Obriga provedores e deployers a garantirem formação proporcional ao contexto, risco e pessoas afetadas.\n Letramento em IA deixa de ser habilidade opcional e passa a ser obrigação organizacional.\n Artigo 4 do AI ActVigência: 02/02/2025\n \n \n AI Fluency Index\n\n Analisou 9.830 conversas com Claude. Identificou que 85,7% tinham iteração. Conversas com refinamento apresentam mais comportamentos de fluência: questionar raciocínio, identificar contexto ausente, avaliar fonte.\n Evidência comportamental: iteração e crítica distinguem uso maduro de uso básico.\n Anthropic Education ReportAI Fluency Index\n \n \n AI Fluency Framework\n\n Define fluência em 4 competências: Delegation (o que delegar), Description (como dar contexto), Discernment (avaliar raciocínio e fonte), Diligence (responsabilidade e supervisão).\n Framework para avaliar maturidade no uso de IA — os 4 D's.\n AnthropicFramework 4D\n \n \n Documentação Claude\n\n Explica personalização em cama\n","stderr":""}
The scan is complete. Below is the pre-analysis — file inventory, thesis-to-source map, and Wide Research staging plan — held strictly at the planning gate. No Phase 1–5 execution until you greenlight.

---

## Scan summary — what arrived

Eight files, three distinct material classes: one corpus of strategic notes containing the canonical thesis, two HTML ebooks providing the evidence base, four structured spreadsheets (one being the empty research framework template), and two packaged Claude skills representing the operational implementation. Total reading surface: roughly 1.4 MB, with the Apple Numbers file dominating size (1.28 MB, parsed via numbers-parser).

---

## MECE inventory — files classified by role in the thesis

The eight files separate cleanly into five mutually exclusive roles. None overlap functionally, and together they cover the thesis surface from theory to artifact.

| # | File | Class | Role in thesis | Evidence weight |
|---|------|-------|----------------|-----------------|
| 1 | `Em_contas_de_IA_profissionalmente_estruturadas...notesairdropdocument` | Strategic notes | **Thesis carrier** — holds the formal hypothesis, the L+P+S+FD+C formula, the 20-risk list, the proof-layer architecture, the broad search command, and the refined hypothesis statement | Foundational |
| 2 | `ai_research_framework_template.xlsx` | Empty research scaffold | **Population target** — README, Questions, Source Log (4 seeded sources S1–S4), Similarity Rubric, Repurpose Map. This is the spreadsheet Phase 4 must fill | Foundational |
| 3 | `ai-literacy-governance-ebook.html` | Synthesis ebook | **Regulatory + measurement evidence** — EU AI Act Article 4, UNESCO/OECD frameworks, AI Literacy Index methodology, systematic review of 16 validated scales | Primary evidence |
| 4 | `az-ai-literacy-ebook.html` | Synthesis ebook | **Behavioral + operational evidence** — Anthropic AI Fluency Index (9,830 conversations, 85.7% iteration), 4D framework, layered personalization argument | Primary evidence |
| 5 | `aigovbrasil-skill-library-executive.numbers` | Skill library navigator | **Operational artifact catalog** — 24+ skills in canonical 4-layer format (First Principles + ICP / Problem Tree / 5W2H / Evidence + CMD + WOW), plus PASTEL governance context and glossary | Internal evidence |
| 6 | `aigovbrasil_v3_exec.xlsx` | Strategic executive plan | **Project context** — 14 sheets covering CMD, positioning, ICP, 90-day roadmap, risk register R-001 to R-008, LinkedIn strategy, Ambassador path. Contains M-007 to M-013 verified evidence stack | Contextual + primary citations |
| 7 | `empower-v4-ai-usage-evaluator_2.skill` | Skill package (SKILL.md + 894-line Python) | **Measurement instrument** — maturity formula (6 weighted components → L1–L5 levels), three-baseline lift methodology, prompt-pattern risk clusters | Methodological |
| 8 | `bussola-unified.skill` | Skill package (26 KB SKILL.md) | **Deterministic-framework exemplar** — 9-phase consultative method with hardcoded gates G0–G6 and 28 artifacts in 3 tracks; concrete instance of the "FD" component | Methodological |

---

## Thesis component coverage — where each variable in the formula has support

The thesis formula `L + P + S + FD + C → ↑ performance, ↓ rework` maps against the file corpus as follows. The asymmetry of coverage is the first auditor-grade finding: every input variable has source material, but the outcome side (productivity, rework reduction) has weak primary evidence and depends almost entirely on inference.

```
THESIS COMPONENT COVERAGE
│
├── L (AI literacy)
│   ├── Direct evidence  ── ai-literacy-governance-ebook.html (AI Act Art. 4, UNESCO, OECD)
│   ├── Direct evidence  ── az-ai-literacy-ebook.html (Anthropic AI Fluency Index)
│   └── Seeded source    ── ai_research_framework_template.xlsx → S1 Knoth et al. 2024
│
├── P (account personalization)
│   ├── Inferred         ── az-ai-literacy-ebook.html (layered personalization argument)
│   ├── Operational      ── aigovbrasil-skill-library-executive.numbers (24 skills as personalization layer)
│   └── Gap              ── no primary peer-reviewed study quantifying P→outcome
│
├── S (SKILL.md / reusable skills)
│   ├── Official docs    ── ai_research_framework_template.xlsx → S3 Anthropic docs
│   ├── Operational      ── bussola-unified.skill + 24 catalog entries (.numbers)
│   └── Gap              ── no independent benchmark study on SKILL.md outcomes
│
├── FD (deterministic frameworks)
│   ├── Exemplar         ── bussola-unified.skill (9 phases × 7 gates × 28 artifacts)
│   ├── Operational      ── x-ray suite + CMD systems in .numbers catalog
│   └── Gap              ── deterministic-workflow literature is adjacent, not direct
│
├── C (connectors / MCP)
│   ├── Official docs    ── ai_research_framework_template.xlsx → S4 MCP specification
│   ├── Inferred         ── horacio + bussola SKILL.md (MCP integrations declared)
│   └── Gap              ── no outcome study on connector layer alone
│
├── → ↑ performance
│   ├── Self-reported    ── aigovbrasil_v3_exec.xlsx (CMD-01: "2h/day → 15 min/day, 73% token reduction")
│   ├── Self-reported    ── multiple skills in .numbers (e.g., "manual 2h → automated 2 min")
│   ├── Adjacent         ── az ebook (AI Fluency Index iteration finding)
│   └── ⚠ Critical gap   ── no third-party measurement; n=1 operator; survivorship bias
│
└── → ↓ rework
    ├── Citation         ── az ebook + aigovbrasil_v3_exec.xlsx (Workday/Hanover "~40% AI time lost to rework")
    ├── Inferred         ── KPMG + Melbourne 48,340-person study (56% errors, 66% no verification)
    └── ⚠ Critical gap   ── no measurement of rework reduction from structured accounts specifically;
                           cited statistics describe the *problem*, not the *intervention's effect*
```

The pattern is consistent: input variables have either direct or operational evidence, while outcome claims rely on (a) self-reported single-operator productivity numbers and (b) statistics that describe the unstructured-use problem rather than the structured-use solution. This is the central methodological vulnerability the notes file itself already flags under "Risco 3 — Métrica fraca ou incompleta" and "Risco 4 — Incentivo errado da métrica."

---

## Output schema → source map

The task prompt specifies a 12-section output schema. Each section has at least one feeder file, but several depend on external benchmarking that has not yet been executed. The map below shows what is on hand versus what Wide Research must supply.

| Schema section | Internal source available | External research required | Status |
|----|----|----|----|
| 1. Executive Summary | All 8 files synthesized | — | Buildable from internal scan |
| 2. Thesis Map | Notes file (formula, refined hypothesis), framework template (README) | — | Already fully available |
| 3. Hypothesis Matrix | Notes file (20 risks, proof layers), Empower script (measurable variables) | Falsification benchmarks | Partial — needs literature |
| 4. Internal Data Extraction Log | All 8 files | — | Buildable now |
| 5. External Benchmark Table | Seeded S1–S4 in template | **Heavy lift** — academic + industry benchmarks across 13 search dimensions | Almost entirely outstanding |
| 6. Contradiction & Gap Analysis | Notes file pre-flagged 20 risks | Contradictory studies from literature | Partial |
| 7. Risk & Mitigation Table | Notes file (full table with 20 entries) + aigovbrasil R-001–R-008 | — | Already drafted in notes |
| 8. Metrics & Validation Framework | Empower V4 (maturity formula, lift), notes file (10-metric table) | Validated benchmarks for cross-comparison | Partial |
| 9. Evidence Classification | All 8 files (tagging exercise) | — | Buildable now |
| 10. Research Confidence Assessment | All internal + external | Requires Section 5 completion first | Dependent |
| 11. Publication Recommendations | Framework template (Repurpose Map), aigovbrasil 90-day plan, .numbers catalog | — | Buildable now |
| 12. Final Auditor Summary | All sources | Requires all prior sections | Final-pass only |

The bottleneck is Section 5. Sections 1, 2, 4, 7, 9, 11 can be produced from the internal corpus alone. Sections 3, 6, 8, 10, 12 are partially blocked by external research that has not yet run.

---

## Wide Research mode — staging plan

The notes file already contains a well-structured broad search command. Operationalizing it as Wide Research requires decomposing it into search clusters with explicit query strings, source-priority rules, and falsification targets. The proposed cluster decomposition:

```
CLUSTER 1 — Core thesis literature (highest priority)
├── AI literacy ↔ prompt engineering coupling (extend Knoth et al. 2024)
├── Prompt engineering ↔ productivity (extend arXiv 2507.18638 / Anam 2025)
└── Falsification target: studies showing structured prompting does NOT improve output

CLUSTER 2 — Personalization & persistent context
├── LLM personalization studies (system prompts, custom instructions, fine-tuning vs context)
├── Memory/context persistence effects on task completion
└── Falsification target: studies showing personalization regresses on out-of-distribution tasks

CLUSTER 3 — Reusable skills & SKILL.md ecosystem
├── Official Anthropic Skills documentation (extend S3)
├── Function-calling, tool-use, modular-prompt benchmarks
├── Agent frameworks (LangGraph, AutoGen, CrewAI) as adjacent
└── Falsification target: reproducibility issues in skill-based workflows

CLUSTER 4 — Deterministic workflows
├── Workflow-language benchmarks (LangChain, DSPy, Guidance)
├── Constrained decoding & gate-based pipelines
└── Falsification target: deterministic vs free-form outcome studies

CLUSTER 5 — Connectors / MCP
├── Official MCP spec + adoption metrics (extend S4)
├── Tool-use latency, error-rate, and rework studies
└── Falsification target: MCP friction costs vs gains

CLUSTER 6 — Operational efficiency & rework (CRITICAL — weakest evidence layer)
├── Validate Workday/Hanover ~40% statistic at source
├── KPMG + Melbourne 48,340-person study at source
├── Microsoft Work Trend Index citations
└── Falsification target: studies showing AI use INCREASES rework

CLUSTER 7 — Onboarding & reusable workflows
├── Productivity-system literature (GTD, Building a Second Brain)
└── Knowledge-worker onboarding ROI studies

CLUSTER 8 — Cross-platform content repurposing
├── Multi-platform content strategy academic literature
├── Content modularization and reuse studies
└── Adjacent field if no direct match

CLUSTER 9 — Brazilian context (regional benchmark requirement)
├── SBC (Sociedade Brasileira de Computação) — ASAG study (128+ PT-BR prompt combinations)
├── SciELO articles on generative AI + literacy in Brazil
└── PL 2338/2023 (Brazilian AI bill) academic commentary
```

The notes file's similarity rubric — topic 30%, method 20%, tooling 20%, outcome 15%, context 15%, with 0–20/21–40/41–60/61–80/81–100 banding — should be applied uniformly across all clusters. Source-priority rules from the task prompt (peer-reviewed > official docs > repositories > industry reports) hold.

---

## Auditor-grade pre-findings — observations the scan already surfaces

Five observations emerge before any external search and warrant explicit attention before Phase 1 begins.

First, the notes file is itself an auditor-style document. It already contains a 20-risk register, a methodology critique, a refined hypothesis statement, and a proof-layer architecture. The task prompt's instructions to "behave like an auditor" must therefore treat the notes file as both source material AND a partial first-pass audit — meaning the audit must hold the notes file to the same standard it applies to external sources, not merely incorporate its conclusions.

Second, every productivity claim in the .numbers catalog and `aigovbrasil_v3_exec.xlsx` follows the same self-reported pattern: "manual N hours → automated M minutes." None of these has independent measurement or comparison group. The auditor's evidence classification must mark all of them as "self-reported operational claims, n=1, no control," not as "evidence of productivity gain."

Third, the Empower V4 maturity formula is the only piece in the corpus that provides a falsifiable measurement instrument. Its six weighted components (prompt structure 30%, context richness 25%, output control 20%, task diversity 10%, high-value-task share 10%, evidence attachment 5%) and three baseline types directly operationalize the thesis. This is the strongest candidate for empirical validation, and it deserves a dedicated evaluation pass.

Fourth, the outcome side of the formula has the weakest direct evidence — and this is exactly the gap the notes file's "Risco 3 — Métrica fraca" already names. The Workday "~40% rework" and KPMG "56% errors" statistics are statistics about the problem (unstructured AI use), not the intervention (structured accounts). Wide Research Cluster 6 must verify these at source AND distinguish problem-statistics from intervention-effect-statistics. Without that distinction, the article risks the "interesting but not causal" failure mode the notes file explicitly warns against.

Fifth, the operational corpus (24 skills, 9-phase consultative method, multi-tier suite) is genuinely uncommon. A scan of public repositories suggests this scale of personal Claude-skill production is not widely documented in primary literature. This could be a defensible novelty claim — but only if benchmarking confirms the absence of comparable public corpora, and only if the novelty claim is separated from the unrelated productivity claim. They should not be entangled.

---

## Decision gate — confirm before Phase 1

Three decisions are needed before execution. Each affects what Phase 1 actually delivers.

The first is sequencing. Two viable approaches exist: (A) run Phases 1–4 fully internal first, then Phase 5 external, then synthesize; or (B) run Phase 1 (work backwards) and Phase 2 (internal scan) immediately, then queue Phase 3 (external research) as a Wide Research batch, then return for Phases 4–5. Option B is more token-efficient and matches the Wide Research framing in your message. Option A produces a tighter narrative but front-loads work that may need revision after external findings.

The second is scope. The notes file's broad search command lists thirteen subject areas. The task prompt mentions both global/US and Brazilian benchmarks. A defensible Phase 3 needs roughly 30–60 external sources to claim coverage; an exhaustive one needs 100+. The article-readiness target should be set now: exploratory (n≈30, light coverage), credible (n≈60, full coverage), or publishable benchmark (n≈100+, with falsification attempts on every major claim).

The third is the falsification commitment. The task prompt says "attempt to falsify the thesis before strengthening it." Operationalized, this means Cluster 6 must actively search for studies showing structured AI use does NOT reduce rework or DOES increase it. Confirming this commitment now prevents the audit from drifting into thesis-supporting mode later.

If you confirm: sequencing (A or B), scope target (exploratory / credible / publishable), and the falsification commitment, I will proceed to Phase 1 — work backwards decomposition — using the internal corpus only. Phase 3 external research is held until you greenlight it as a separate batch.

---

**Você** _2026-05-16_

delivery nex the cmd ready to go + instrctions — the utput shloud be portuguese easy bussines lenaguage ready to act + xls filled whats u think ? now reasoning about that look from the best N for my case includeded also> [
Now desing resaecrh on pesquisa mode that includeed all context,and everting its need etc.. til outputd defitions etc… reasoning about that incadet shoul i use opus to resseacrh ? be guidedd of how you at max rasoing could setup a full pipile reasaerch plan to delta do decisoin and option that live no ambiguit for resaerch mode ? go beyond consered my ignorance. the out put slhou be my sorce of trouth workflow from decision strtcrte to—- publisong etc.. ]

---

**Claude** _2026-05-16_

Vou estruturar isso como entregável fechado. Primeiro leio a skill de xlsx para garantir que a planilha sai com qualidade, depois construo tudo numa só passada.
     1	---
     2	name: xlsx
     3	description: "Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user wants to: open, read, edit, or fix an existing .xlsx, .xlsm, .csv, or .tsv file (e.g., adding columns, computing formulas, formatting, charting, cleaning messy data); create a new spreadsheet from scratch or from other data sources; or convert between tabular file formats. Trigger especially when the user references a spreadsheet file by name or path — even casually (like \"the xlsx in my downloads\") — and wants something done to it or produced from it. Also trigger for cleaning or restructuring messy tabular data files (malformed rows, misplaced headers, junk data) into proper spreadsheets. The deliverable must be a spreadsheet file. Do NOT trigger when the primary deliverable is a Word document, HTML report, standalone Python script, database pipeline, or Google Sheets API integration, even if tabular data is involved."
     4	license: Proprietary. LICENSE.txt has complete terms
     5	---
     6	
     7	# Requirements for Outputs
     8	
     9	## All Excel files
    10	
    11	### Professional Font
    12	- Use a consistent, professional font (e.g., Arial, Times New Roman) for all deliverables unless otherwise instructed by the user
    13	
    14	### Zero Formula Errors
    15	- Every Excel model MUST be delivered with ZERO formula errors (#REF!, #DIV/0!, #VALUE!, #N/A, #NAME?)
    16	
    17	### Preserve Existing Templates (when updating templates)
    18	- Study and EXACTLY match existing format, style, and conventions when modifying files
    19	- Never impose standardized formatting on files with established patterns
    20	- Existing template conventions ALWAYS override these guidelines
    21	
    22	## Financial models
    23	
    24	### Color Coding Standards
    25	Unless otherwise stated by the user or existing template
    26	
    27	#### Industry-Standard Color Conventions
    28	- **Blue text (RGB: 0,0,255)**: Hardcoded inputs, and numbers users will change for scenarios
    29	- **Black text (RGB: 0,0,0)**: ALL formulas and calculations
    30	- **Green text (RGB: 0,128,0)**: Links pulling from other worksheets within same workbook
    31	- **Red text (RGB: 255,0,0)**: External links to other files
    32	- **Yellow background (RGB: 255,255,0)**: Key assumptions needing attention or cells that need to be updated
    33	
    34	### Number Formatting Standards
    35	
    36	#### Required Format Rules
    37	- **Years**: Format as text strings (e.g., "2024" not "2,024")
    38	- **Currency**: Use $#,##0 format; ALWAYS specify units in headers ("Revenue ($mm)")
    39	- **Zeros**: Use number formatting to make all zeros "-", including percentages (e.g., "$#,##0;($#,##0);-")
    40	- **Percentages**: Default to 0.0% format (one decimal)
    41	- **Multiples**: Format as 0.0x for valuation multiples (EV/EBITDA, P/E)
    42	- **Negative numbers**: Use parentheses (123) not minus -123
    43	
    44	### Formula Construction Rules
    45	
    46	#### Assumptions Placement
    47	- Place ALL assumptions (growth rates, margins, multiples, etc.) in separate assumption cells
    48	- Use cell references instead of hardcoded values in formulas
    49	- Example: Use =B5*(1+$B$6) instead of =B5*1.05
    50	
    51	#### Formula Error Prevention
    52	- Verify all cell references are correct
    53	- Check for off-by-one errors in ranges
    54	- Ensure consistent formulas across all projection periods
    55	- Test with edge cases (zero values, negative numbers)
    56	- Verify no unintended circular references
    57	
    58	#### Documentation Requirements for Hardcodes
    59	- Comment or in cells beside (if end of table). Format: "Source: [System/Document], [Date], [Specific Reference], [URL if applicable]"
    60	- Examples:
    61	  - "Source: Company 10-K, FY2024, Page 45, Revenue Note, [SEC EDGAR URL]"
    62	  - "Source: Company 10-Q, Q2 2025, Exhibit 99.1, [SEC EDGAR URL]"
    63	  - "Source: Bloomberg Terminal, 8/15/2025, AAPL US Equity"
    64	  - "Source: FactSet, 8/20/2025, Consensus Estimates Screen"
    65	
    66	# XLSX creation, editing, and analysis
    67	
    68	## Overview
    69	
    70	A user may ask you to create, edit, or analyze the contents of an .xlsx file. You have different tools and workflows available for different tasks.
    71	
    72	## Important Requirements
    73	
    74	**LibreOffice Required for Formula Recalculation**: You can assume LibreOffice is installed for recalculating formula values using the `scripts/recalc.py` script. The script automatically configures LibreOffice on first run, including in sandboxed environments where Unix sockets are restricted (handled by `scripts/office/soffice.py`)
    75	
    76	## Reading and analyzing data
    77	
    78	### Quick text dump
    79	```bash
    80	# Tab-separated rows under `## Sheet:` headers
    81	extract-text file.xlsx | head -100
    82	# .xlsm: same zip structure, override the extension
    83	extract-text --format xlsx file.xlsm | head -100
    84	```
    85	
    86	### Data analysis with pandas
    87	For data analysis, visualization, and basic operations, use **pandas** which provides powerful data manipulation capabilities:
    88	
    89	```python
    90	import pandas as pd
    91	
    92	# Read Excel
    93	df = pd.read_excel('file.xlsx')  # Default: first sheet
    94	all_sheets = pd.read_excel('file.xlsx', sheet_name=None)  # All sheets as dict
    95	
    96	# Analyze
    97	df.head()      # Preview data
    98	df.info()      # Column info
    99	df.describe()  # Statistics
   100	
   101	# Write Excel
   102	df.to_excel('output.xlsx', index=False)
   103	```
   104	
   105	## Excel File Workflows
   106	
   107	## CRITICAL: Use Formulas, Not Hardcoded Values
   108	
   109	**Always use Excel formulas instead of calculating values in Python and hardcoding them.** This ensures the spreadsheet remains dynamic and updateable.
   110	
   111	### ❌ WRONG - Hardcoding Calculated Values
   112	```python
   113	# Bad: Calculating in Python and hardcoding result
   114	total = df['Sales'].sum()
   115	sheet['B10'] = total  # Hardcodes 5000
   116	
   117	# Bad: Computing growth rate in Python
   118	growth = (df.iloc[-1]['Revenue'] - df.iloc[0]['Revenue']) / df.iloc[0]['Revenue']
   119	sheet['C5'] = growth  # Hardcodes 0.15
   120	
   121	# Bad: Python calculation for average
   122	avg = sum(values) / len(values)
   123	sheet['D20'] = avg  # Hardcodes 42.5
   124	```
   125	
   126	### ✅ CORRECT - Using Excel Formulas
   127	```python
   128	# Good: Let Excel calculate the sum
   129	sheet['B10'] = '=SUM(B2:B9)'
   130	
   131	# Good: Growth rate as Excel formula
   132	sheet['C5'] = '=(C4-C2)/C2'
   133	
   134	# Good: Average using Excel function
   135	sheet['D20'] = '=AVERAGE(D2:D19)'
   136	```
   137	
   138	This applies to ALL calculations - totals, percentages, ratios, differences, etc. The spreadsheet should be able to recalculate when source data changes.
   139	
   140	## Common Workflow
   141	1. **Choose tool**: pandas for data, openpyxl for formulas/formatting
   142	2. **Create/Load**: Create new workbook or load existing file
   143	3. **Modify**: Add/edit data, formulas, and formatting
   144	4. **Save**: Write to file
   145	5. **Recalculate formulas (MANDATORY IF USING FORMULAS)**: Use the scripts/recalc.py script
   146	   ```bash
   147	   python scripts/recalc.py output.xlsx
   148	   ```
   149	6. **Verify and fix any errors**: 
   150	   - The script returns JSON with error details
   151	   - If `status` is `errors_found`, check `error_summary` for specific error types and locations
   152	   - Fix the identified errors and recalculate again
   153	   - Common errors to fix:
   154	     - `#REF!`: Invalid cell references
   155	     - `#DIV/0!`: Division by zero
   156	     - `#VALUE!`: Wrong data type in formula
   157	     - `#NAME?`: Unrecognized formula name
   158	
   159	### Creating new Excel files
   160	
   161	```python
   162	# Using openpyxl for formulas and formatting
   163	from openpyxl import Workbook
   164	from openpyxl.styles import Font, PatternFill, Alignment
   165	
   166	wb = Workbook()
   167	sheet = wb.active
   168	
   169	# Add data
   170	sheet['A1'] = 'Hello'
   171	sheet['B1'] = 'World'
   172	sheet.append(['Row', 'of', 'data'])
   173	
   174	# Add formula
   175	sheet['B2'] = '=SUM(A1:A10)'
   176	
   177	# Formatting
   178	sheet['A1'].font = Font(bold=True, color='FF0000')
   179	sheet['A1'].fill = PatternFill('solid', start_color='FFFF00')
   180	sheet['A1'].alignment = Alignment(horizontal='center')
   181	
   182	# Column width
   183	sheet.column_dimensions['A'].width = 20
   184	
   185	wb.save('output.xlsx')
   186	```
   187	
   188	### Editing existing Excel files
   189	
   190	```python
   191	# Using openpyxl to preserve formulas and formatting
   192	from openpyxl import load_workbook
   193	
   194	# Load existing file
   195	wb = load_workbook('existing.xlsx')
   196	sheet = wb.active  # or wb['SheetName'] for specific sheet
   197	
   198	# Working with multiple sheets
   199	for sheet_name in wb.sheetnames:
   200	    sheet = wb[sheet_name]
   201	    print(f"Sheet: {sheet_name}")
   202	
   203	# Modify cells
   204	sheet['A1'] = 'New Value'
   205	sheet.insert_rows(2)  # Insert row at position 2
   206	sheet.delete_cols(3)  # Delete column 3
   207	
   208	# Add new sheet
   209	new_sheet = wb.create_sheet('NewSheet')
   210	new_sheet['A1'] = 'Data'
   211	
   212	wb.save('modified.xlsx')
   213	```
   214	
   215	## Recalculating formulas
   216	
   217	Excel files created or modified by openpyxl contain formulas as strings but not calculated values. Use the provided `scripts/recalc.py` script to recalculate formulas:
   218	
   219	```bash
   220	python scripts/recalc.py <excel_file> [timeout_seconds]
   221	```
   222	
   223	Example:
   224	```bash
   225	python scripts/recalc.py output.xlsx 30
   226	```
   227	
   228	The script:
   229	- Automatically sets up LibreOffice macro on first run
   230	- Recalculates all formulas in all sheets
   231	- Scans ALL cells for Excel errors (#REF!, #DIV/0!, etc.)
   232	- Returns JSON with detailed error locations and counts
   233	- Works on both Linux and macOS
   234	
   235	## Formula Verification Checklist
   236	
   237	Quick checks to ensure formulas work correctly:
   238	
   239	### Essential Verification
   240	- [ ] **Test 2-3 sample references**: Verify they pull correct values before building full model
   241	- [ ] **Column mapping**: Confirm Excel columns match (e.g., column 64 = BL, not BK)
   242	- [ ] **Row offset**: Remember Excel rows are 1-indexed (DataFrame row 5 = Excel row 6)
   243	
   244	### Common Pitfalls
   245	- [ ] **NaN handling**: Check for null values with `pd.notna()`
   246	- [ ] **Far-right columns**: FY data often in columns 50+ 
   247	- [ ] **Multiple matches**: Search all occurrences, not just first
   248	- [ ] **Division by zero**: Check denominators before using `/` in formulas (#DIV/0!)
   249	- [ ] **Wrong references**: Verify all cell references point to intended cells (#REF!)
   250	- [ ] **Cross-sheet references**: Use correct format (Sheet1!A1) for linking sheets
   251	
   252	### Formula Testing Strategy
   253	- [ ] **Start small**: Test formulas on 2-3 cells before applying broadly
   254	- [ ] **Verify dependencies**: Check all cells referenced in formulas exist
   255	- [ ] **Test edge cases**: Include zero, negative, and very large values
   256	
   257	### Interpreting scripts/recalc.py Output
   258	The script returns JSON with error details:
   259	```json
   260	{
   261	  "status": "success",           // or "errors_found"
   262	  "total_errors": 0,              // Total error count
   263	  "total_formulas": 42,           // Number of formulas in file
   264	  "error_summary": {              // Only present if errors found
   265	    "#REF!": {
   266	      "count": 2,
   267	      "locations": ["Sheet1!B5", "Sheet1!C10"]
   268	    }
   269	  }
   270	}
   271	```
   272	
   273	## Best Practices
   274	
   275	### Library Selection
   276	- **pandas**: Best for data analysis, bulk operations, and simple data export
   277	- **openpyxl**: Best for complex formatting, formulas, and Excel-specific features
   278	
   279	### Working with openpyxl
   280	- Cell indices are 1-based (row=1, column=1 refers to cell A1)
   281	- Use `data_only=True` to read calculated values: `load_workbook('file.xlsx', data_only=True)`
   282	- **Warning**: If opened with `data_only=True` and saved, formulas are replaced with values and permanently lost
   283	- For large files: Use `read_only=True` for reading or `write_only=True` for writing
   284	- Formulas are preserved but not evaluated - use scripts/recalc.py to update values
   285	
   286	### Working with pandas
   287	- Specify data types to avoid inference issues: `pd.read_excel('file.xlsx', dtype={'id': str})`
   288	- For large files, read specific columns: `pd.read_excel('file.xlsx', usecols=['A', 'C', 'E'])`
   289	- Handle dates properly: `pd.read_excel('file.xlsx', parse_dates=['date_column'])`
   290	
   291	## Code Style Guidelines
   292	**IMPORTANT**: When generating Python code for Excel operations:
   293	- Write minimal, concise Python code without unnecessary comments
   294	- Avoid verbose variable names and redundant operations
   295	- Avoid unnecessary print statements
   296	
   297	**For Excel files themselves**:
   298	- Add comments to cells with complex formulas or important assumptions
   299	- Document data sources for hardcoded values
   300	- Include notes for key calculations and model sections
Vou construir tudo numa só passada: XLS preenchido com 14 abas, CMD pronto para Wide Research embutido na planilha, e companion MD. Depois entrego no chat a parte de decisão estratégica em PT-BR business.
{"returncode":0,"stdout":"saved /home/claude/build/pesquisa_tese_estrutura_conta_IA.xlsx\nsheets: ['00_LEIA_PRIMEIRO', '01_DECISOES', '02_TESE_E_FORMULA', '03_PIPELINE', '04_PERGUNTAS', '05_HIPOTESES_MATRIZ', '06_CLUSTERS_PESQUISA', '07_LOG_FONTES', '08_RUBRICA_SIMILARIDADE', '09_RISCOS', '10_METRICAS', '11_CLASSIF_EVIDENCIA', '12_REPURPOSE_PIPELINE', '13_CMD_PRONTO']\n","stderr":""}
{"returncode":0,"stdout":"{\n  \"status\": \"errors_found\",\n  \"total_errors\": 1,\n  \"error_summary\": {\n    \"#N/A\": {\n      \"count\": 1,\n      \"locations\": [\n        \"13_CMD_PRONTO!A3\"\n      ]\n    }\n  },\n  \"total_formulas\": 89\n}\n","stderr":""}
{"returncode":0,"stdout":"starts with: '====='\nre-saved\n{\n  \"status\": \"success\",\n  \"total_errors\": 0,\n  \"error_summary\": {},\n  \"total_formulas\": 89\n}\n","stderr":""}
{"returncode":0,"stdout":"total 52\ndrwxr-xr-x 1 claude ubuntu     0 May 16 09:58 .\ndrwxr-xr-x 5 root   root    4096 May 16 09:42 ..\n-rw-r--r-- 1 claude ubuntu 47036 May 16 09:58 pesquisa_tese_estrutura_conta_IA.xlsx\n\n============================================================\nVERIFICATION\n============================================================\nSheets: 14\n  - 00_LEIA_PRIMEIRO: 13 rows × 2 cols\n  - 01_DECISOES: 11 rows × 6 cols\n  - 02_TESE_E_FORMULA: 13 rows × 2 cols\n  - 03_PIPELINE: 11 rows × 6 cols\n  - 04_PERGUNTAS: 16 rows × 4 cols\n  - 05_HIPOTESES_MATRIZ: 10 rows × 7 cols\n  - 06_CLUSTERS_PESQUISA: 12 rows × 6 cols\n  - 07_LOG_FONTES: 87 rows × 22 cols\n  - 08_RUBRICA_SIMILARIDADE: 16 rows × 5 cols\n  - 09_RISCOS: 24 rows × 6 cols\n  - 10_METRICAS: 15 rows × 3 cols\n  - 11_CLASSIF_EVIDENCIA: 15 rows × 2 cols\n  - 12_REPURPOSE_PIPELINE: 17 rows × 6 cols\n  - 13_CMD_PRONTO: 3 rows × 1 cols\n\nLog de Fontes — primeiras 4 linhas com scores calculados:\n  Row 4: 'AI Literacy and its Implications for Pro' → score=79\n  Row 5: 'Prompt Engineering and the Effectiveness' → score=78\n  Row 6: 'Extend Claude with skills               ' → score=75\n  Row 7: 'Model Context Protocol — Getting Started' → score=75\n","stderr":""}
Tudo pronto. Antes da entrega, deixo registrado o raciocínio das três decisões que eu tomei por você — porque elas determinam o resto do pipeline e você deve aceitá-las ou contestá-las antes de disparar o Wide Research.

---

**Decisão 1 — N (quantas fontes coletar)**

Recomendação: **60 fontes** (faixa operacional 50-80), distribuídas em 9 clusters com 5-10 fontes cada. Por quê não 30 e por quê não 100+:

```
30 fontes  →  Insuficiente. Você quer publicar como "benchmark", não como
              "ensaio com referências". Abaixo de 30 a planilha de
              similaridade não tem densidade para ranqueamento honesto.

60 fontes  →  Defensível. Cada cluster recebe cobertura mínima, sobra
              margem para descarte (~20% das fontes caem abaixo do
              corte de 40% de similaridade). Wide Research consegue
              entregar em um único batch.

100+       →  Inflação. Você é solo operator. Mais fontes ≠ artigo
              melhor — significa mais síntese, mais auditoria, mais
              tempo perdido em fontes redundantes. Reserve para
              segunda rodada SE a síntese revelar cluster fraco.
```

A regra real é: **qualidade > quantidade**. Melhor 50 fontes verificadas com falseamento explícito por cluster do que 100 fontes superficiais que dão ilusão de cobertura.

---

**Decisão 2 — Opus 4.7 ou Sonnet 4.6 para a pesquisa**

```
Onde está o trabalho realmente difícil?
├── Decidir o quê pesquisar      ──→  Já feito. Opus.
├── Avaliar metodologia das fontes ──→  Opus (este chat).
├── Detectar contradições        ──→  Opus (este chat).
├── Auditar viés de confirmação  ──→  Opus (este chat).
├── Sintetizar 12 seções finais  ──→  Opus (este chat).
└── Coletar fontes em paralelo   ──→  Wide Research (caixa-preta).
```

Wide Research é uma ferramenta de varredura paralela. O valor dela está em **paralelismo**, não em raciocínio individual de cada agente — cada agente faz busca + extração estruturada, tarefa que Sonnet/Haiku já executam bem. Você não escolhe o modelo do Wide Research; ele usa o que usar, e o que importa é a qualidade do CMD que você manda.

A decisão correta é: **Opus aqui para tudo que exige julgamento, Wide Research apenas para a fase F3 de coleta**. Não tente rodar a pesquisa toda em modo Wide — você perde a auditoria.

---

**Decisão 3 — Ordem de publicação**

GitHub primeiro, não Medium. Razão: você quer credibilidade técnica como ângulo diferenciador (alinhado ao posicionamento do aigovbrasil — "operator depth, not influencer reach"). GitHub publicado **antes** do Medium permite que o artigo cite o replication kit. O contrário força a republicar.

```
Sequência:
1. GitHub  →  repositório com XLS + CMD + scripts + draft em README
2. Medium  →  long-form com link para GitHub como "replication kit"
3. LinkedIn →  post analítico + carrossel com link para Medium
4. X       →  thread quebrando o estudo (8-12 posts)
5. Newsletter → digest com primeira posição
6. YouTube  →  walkthrough (fase 2, depois de feedback público)
```

---

**Pipeline completo F0 → F7**

```
F0 · Decisão estratégica      ──→  CONCLUÍDA neste turno (aba 01)
F1 · Trabalho ao reverso      ──→  PARCIAL — abas 02, 04, 05 preenchidas
F2 · Scan interno MECE        ──→  CONCLUÍDA (turno anterior + aba 11)
F3 · Wide Research            ──→  PRÓXIMO PASSO — você cola o CMD
F4 · Popular o XLS            ──→  você cola o JSON na aba 07
F5 · Síntese auditorial       ──→  volta para este chat, gera 12 seções
F6 · Revisão humana           ──→  você decide o que publica
F7 · Repurpose multi-canal    ──→  GitHub → Medium → LinkedIn → X → YT
```

---

**Como usar — 6 passos práticos**

```
1. Abra a planilha. Leia a aba 00_LEIA_PRIMEIRO.
2. Confirme as 8 decisões na aba 01_DECISOES (ou contestá-las).
3. Vá na aba 13_CMD_PRONTO. Copie TODO o conteúdo da célula.
4. Abra claude.ai em modo Wide Research. Cole. Dispare.
5. Quando voltar o JSON, cole na aba 07_LOG_FONTES (a partir da linha 8).
   Os scores ponderados se calculam sozinhos (fórmula já embutida).
6. Volte aqui no chat e diga "iniciar F5". Eu rodo a síntese auditorial.
```

---

**O CMD para colar (também está na aba 13 da planilha)**

Coloco aqui completo para você copiar sem precisar abrir o arquivo. É bilíngue por design: instruções e regras em PT-BR para você verificar, queries em EN porque a literatura está em EN, com C9 dedicado ao recorte brasileiro em PT-BR.

```text
=========================================================
CMD PARA WIDE RESEARCH MODE — TESE ESTRUTURA DE CONTA IA
Versão 1.0 · Maio 2026
=========================================================

[PAPEL]
Você é um analista de pesquisa sênior, auditor metodológico e agente
de síntese de evidências. Sua missão NÃO é validar a tese do autor —
é investigar, pressionar, testar, refinar e desafiar com rigor
metodológico, raciocínio causal e separação rigorosa entre evidência,
inferência, hipótese e opinião. Trate fontes confirmatórias com
escrutínio NORMAL e fontes contrárias com escrutínio mais LENIENTE
(assimetria intencional para combater viés de confirmação).

[TESE A INVESTIGAR]
"Contas de IA profissionalmente estruturadas — combinando letramento
em IA, personalização persistente, skills reutilizáveis (SKILL.md),
frameworks determinísticos e conectores (MCP) — produzem maior
eficiência operacional e menor retrabalho do que contas não
estruturadas."

Fórmula: L + P + S + FD + C  →  ↑ produtividade,  ↓ retrabalho
Onde:
- L  = letramento em IA
- P  = personalização da conta
- S  = Skills / SKILL.md
- FD = frameworks determinísticos
- C  = conectores (MCP)

[MISSÃO]
Investigar 9 clusters de pesquisa, retornando entre 5 e 10 fontes
por cluster (meta total: 50-80 fontes). Para cada fonte, preencher
TODOS os campos do schema abaixo. Não inventar. Não preencher campos
sem evidência verificável.

[OUTPUT SCHEMA — UM OBJETO JSON POR FONTE]
{
  "cluster_id": "C1",
  "source_id": "S005",
  "title": "...",
  "authors_or_org": "...",
  "year": 2025,
  "region": "US|Global|EU|Brasil|Outro",
  "source_type": "peer-reviewed paper | preprint | official docs | repo | industry report | book | thesis",
  "url": "https://...",
  "methodology": "1-2 frases descrevendo design do estudo",
  "sample_or_dataset": "n=... ou descrição",
  "main_claim": "1-2 frases",
  "relevance_to_thesis": "1-2 frases ligando à fórmula L+P+S+FD+C",
  "similarity_topic_0_5": 4,
  "similarity_method_0_5": 3,
  "similarity_tooling_0_5": 4,
  "similarity_outcome_0_5": 3,
  "similarity_context_0_5": 2,
  "evidence_type": "direct | inferred | hypothesis | opinion | contextual",
  "contradicts_thesis": false,
  "limitations": "1-2 frases",
  "confidence_0_5": 4,
  "notes": "opcional"
}

[REGRAS]
1. NÃO INVENTAR. Sem URL verificável, não retornar.
2. CADA CLUSTER exige no mínimo 1 fonte com contradicts_thesis=true
   ou evidência empírica enfraquecendo a tese.
3. PRIORIDADE: peer-reviewed > documentação oficial > repositório >
   relatório industrial > artigo técnico credível.
4. Sub-scores 0-5 em cada uma das 5 dimensões de similaridade; o
   score ponderado é calculado pelo autor (topic 30% + method 20%
   + tooling 20% + outcome 15% + context 15%).
5. INCLUSÃO MÍNIMA: score ponderado estimado ≥ 40%. Se abaixo,
   marcar evidence_type="contextual".
6. PARA C9 (Brasil): priorizar SBC, SciELO, USP, FGV, Insper,
   Unicamp, UFRJ, UFMG, CAPES.
7. Se duas fontes dizem o mesmo, manter apenas a primária.
8. Preferir paráfrase a citação direta.

[OS 9 CLUSTERS]

═══ C1 — Letramento em IA + Prompt Engineering (núcleo) ═══
Min: 7. Inclui Knoth et al. 2024 (já validado).
Queries:
  • "AI literacy prompt engineering" review 2024 2025
  • "AI fluency" framework empirical study Anthropic
  • prompt structure productivity LLM peer-reviewed
  • prompt quality user expertise correlation
Falseamento alvo: estudos mostrando que prompting estruturado NÃO
melhora output ou tem efeito nulo / inconsistente.

═══ C2 — Personalização e contexto persistente ═══
Min: 6.
Queries:
  • LLM personalization system prompts performance
  • custom instructions ChatGPT Claude benchmark
  • persistent context user productivity LLM
  • memory augmented LLM task completion study
Falseamento alvo: regressão de personalização em tarefas fora da
distribuição ou degradação por overfitting de contexto.

═══ C3 — Skills reutilizáveis / SKILL.md / agentes modulares ═══
Min: 7. Inclui Anthropic docs (já validado).
Queries:
  • Anthropic Claude Skills SKILL.md documentation
  • reusable prompt templates modular LLM workflow
  • LangGraph AutoGen CrewAI productivity comparison
  • function calling tool use reusable patterns enterprise
Falseamento alvo: reprodutibilidade fraca ou inconsistência entre
execuções de workflows baseados em skills.

═══ C4 — Frameworks determinísticos / workflows com gates ═══
Min: 5.
Queries:
  • deterministic LLM workflow DSPy LangChain benchmark
  • constrained decoding output quality study
  • gate-based pipeline LLM consistency
  • structured workflow vs free-form prompting outcome
Falseamento alvo: workflows determinísticos perdem performance em
tarefas abertas, criativas ou exploratórias.

═══ C5 — Conectores / MCP / tool use ═══
Min: 5. Inclui MCP docs (já validado).
Queries:
  • Model Context Protocol MCP adoption study
  • tool use LLM error rate latency benchmark
  • function calling productivity benchmark enterprise
  • external tool integration LLM workflow efficiency
Falseamento alvo: custo de fricção, latência ou erro de MCP supera
o ganho de produtividade.

═══ C6 — Eficiência operacional + redução de retrabalho ═══ CRÍTICO
Min: 10. Este é o elo MAIS FRACO da tese.
Queries:
  • Workday Hanover Research AI rework 40% time saved
  • KPMG University of Melbourne AI work errors 48340 study
  • Microsoft Work Trend Index 2024 2025 2026
  • Anthropic AI Fluency Index 9830 conversations iteration
  • generative AI productivity rework reduction peer-reviewed
  • LLM output quality verification rework cost
Falseamento alvo: estudos mostrando IA aumenta retrabalho total,
gera falsa produtividade, ou onde tempo economizado é compensado
por correção. ATENÇÃO: distinguir estatísticas sobre o PROBLEMA
(uso desestruturado) de estatísticas sobre o EFEITO da intervenção
(uso estruturado).

═══ C7 — Onboarding e workflows reutilizáveis ═══
Min: 4.
Queries:
  • knowledge worker onboarding ROI study
  • Building Second Brain GTD productivity peer-reviewed
  • reusable workflow corporate training effectiveness
  • playbook documentation team productivity meta-analysis
Falseamento alvo: onboarding estruturado não correlaciona com
produtividade duradoura ou produz fadiga de sistema.

═══ C8 — Repurpose cross-platform de conteúdo ═══
Min: 4.
Queries:
  • cross-media content repurposing strategy peer-reviewed
  • content modularization multi-platform marketing
  • one-source many-channel content reuse academic
Falseamento alvo: repurpose dilui qualidade percebida do canal
primário.

═══ C9 — Recorte brasileiro ═══
Min: 5. Queries em PT-BR.
Queries:
  • SBC ASAG prompt engineering português Brasil
  • SciELO IA generativa letramento educação Brasil
  • IA generativa produtividade trabalho Brasil pesquisa acadêmica
  • PL 2338 2023 inteligência artificial Brasil discussão acadêmica
  • USP FGV Insper IA generativa estudo empírico
Falseamento alvo: estudos brasileiros mostrando padrões diferentes
do recorte global, ou inadequação de frameworks anglo-saxões ao
contexto BR.

[CRITÉRIO DE QUALIDADE DO TURNO]
- TOTAL alvo: 50-80 fontes.
- Cobertura: 9 clusters, nenhum vazio.
- Falseamento: cada cluster com mínimo 1 fonte contrária.
- Qualidade > quantidade.
- Idioma do output: PT-BR ou EN, consistente.
- Formato: array JSON único, um objeto por fonte, sem texto extra.

[ENTREGA]
Retorne apenas o array JSON. Sem prólogo, sem epílogo, sem
comentários fora do schema.

=========================================================
FIM DO CMD
=========================================================
```

---

**O que está na planilha (14 abas)**

```
00_LEIA_PRIMEIRO           → cover, princípios, como usar
01_DECISOES                → 8 decisões resolvidas com justificativa
02_TESE_E_FORMULA          → tese, fórmula, hipóteses operacionais
03_PIPELINE                → F0 → F7 com status e saída concreta
04_PERGUNTAS               → 13 perguntas de pesquisa priorizadas
05_HIPOTESES_MATRIZ        → 7 hipóteses mensuráveis (H1-H5 + H6/H7 contra)
06_CLUSTERS_PESQUISA       → 9 clusters com queries e alvos de falseamento
07_LOG_FONTES              → 4 fontes seed + 80 linhas prontas, score auto
08_RUBRICA_SIMILARIDADE    → 5 dimensões, faixas de interpretação
09_RISCOS                  → 21 riscos com mitigação e métrica de prova
10_METRICAS                → 11 métricas (incluindo fórmula Empower V4)
11_CLASSIF_EVIDENCIA       → 6 tipos + 5 pré-findings do scan interno
12_REPURPOSE_PIPELINE      → 6 canais, ordem de publicação
13_CMD_PRONTO              → o CMD completo para copiar
```

A aba **07_LOG_FONTES** tem 80 linhas vazias prontas para receber a saída do Wide Research, com fórmula de score ponderado automática. As 4 fontes seed do template original já estão validadas e pontuadas (entre 75% e 79% — todas na faixa "muito próximo").

---

**Próxima decisão sua**

Antes de disparar o Wide Research, três coisas precisam de confirmação explícita: (1) você aceita as 8 decisões da aba 01 como estão, ou quer reabrir alguma; (2) você confirma o threshold de 40% e a faixa N=50-80; (3) você compromete-se com o falseamento (uma fonte contra por cluster mínimo). Se sim para os três, dispara o CMD e me devolve o JSON.

---

**Você** _2026-05-16_

present file

---

**Claude** _2026-05-16_

A planilha está pronta e disponível para download no link acima. 

Ela contém:
- **14 abas completas** — desde decisões estratégicas até o CMD pronto para colar
- **89 fórmulas ativas**, 0 erros, já recalculadas
- **80 linhas prontas** na aba 07_LOG_FONTES para receber o JSON do Wide Research
- **Scores automáticos** — quando você colar o JSON, os scores ponderados se calculam sozinhos

O CMD completo está tanto na aba 13 da planilha quanto no bloco de código acima (para facilitar o copia-e-cola).

**Seu próximo passo**: confirme as 3 decisões críticas (N=60, Opus aqui/Wide Research lá, falseamento comprometido) ou abra discussão se discordar. Depois disso, você cola o CMD no Wide Research e dispara a fase F3.

---

**Você** _2026-05-16_

próximo passo: confirme as 3 decisões críticas (N=60, Opus aqui/Wide Research lá, falseamento comprometido) ou abra discussão se discordar. Depois disso, trasnccrev aqui o cmd final para eu rodar CMD no Wide Research e dispara a fase F3. com sonet

---

**Claude** _2026-05-16_

Confirmadas as 3 decisões críticas:

✓ **N = 60 fontes** (faixa operacional 50-80)  
✓ **Opus aqui para decisão/síntese, Wide Research (Sonnet) para coleta paralela**  
✓ **Falseamento comprometido** — mínimo 1 fonte contrária por cluster

---

**CMD FINAL — COPIE E COLE NO WIDE RESEARCH**

```
=========================================================
CMD PARA WIDE RESEARCH MODE — TESE ESTRUTURA DE CONTA IA
Versão 1.0 · Maio 2026
=========================================================

[PAPEL]
Você é um analista de pesquisa sênior, auditor metodológico e agente de síntese de evidências. Sua missão NÃO é validar a tese do autor — é investigar, pressionar, testar, refinar e desafiar com rigor metodológico, raciocínio causal e separação rigorosa entre evidência, inferência, hipótese e opinião. Trate fontes confirmatórias com escrutínio NORMAL e fontes contrárias com escrutínio mais LENIENTE (assimetria intencional para combater viés de confirmação).

[TESE A INVESTIGAR]
"Contas de IA profissionalmente estruturadas — combinando letramento em IA, personalização persistente, skills reutilizáveis (SKILL.md), frameworks determinísticos e conectores (MCP) — produzem maior eficiência operacional e menor retrabalho do que contas não estruturadas."

Fórmula: L + P + S + FD + C  →  ↑ produtividade,  ↓ retrabalho

Onde:
- L  = letramento em IA
- P  = personalização da conta
- S  = Skills / SKILL.md
- FD = frameworks determinísticos
- C  = conectores (MCP)

[MISSÃO]
Investigar 9 clusters de pesquisa, retornando entre 5 e 10 fontes por cluster (meta total: 50-80 fontes). Para cada fonte, preencher TODOS os campos do schema abaixo. Não inventar. Não preencher campos sem evidência verificável.

[OUTPUT SCHEMA — UM OBJETO JSON POR FONTE]
{
  "cluster_id": "C1",
  "source_id": "S005",
  "title": "...",
  "authors_or_org": "...",
  "year": 2025,
  "region": "US|Global|EU|Brasil|Outro",
  "source_type": "peer-reviewed paper | preprint | official docs | repo | industry report | book | thesis",
  "url": "https://...",
  "methodology": "1-2 frases descrevendo design do estudo",
  "sample_or_dataset": "n=... ou descrição",
  "main_claim": "1-2 frases",
  "relevance_to_thesis": "1-2 frases ligando à fórmula L+P+S+FD+C",
  "similarity_topic_0_5": 4,
  "similarity_method_0_5": 3,
  "similarity_tooling_0_5": 4,
  "similarity_outcome_0_5": 3,
  "similarity_context_0_5": 2,
  "evidence_type": "direct | inferred | hypothesis | opinion | contextual",
  "contradicts_thesis": false,
  "limitations": "1-2 frases",
  "confidence_0_5": 4,
  "notes": "opcional"
}

[REGRAS]
1. NÃO INVENTAR. Sem URL verificável, não retornar.
2. CADA CLUSTER exige no mínimo 1 fonte com contradicts_thesis=true ou evidência empírica enfraquecendo a tese.
3. PRIORIDADE: peer-reviewed > documentação oficial > repositório > relatório industrial > artigo técnico credível.
4. Sub-scores 0-5 em cada uma das 5 dimensões de similaridade; o score ponderado é calculado pelo autor (topic 30% + method 20% + tooling 20% + outcome 15% + context 15%).
5. INCLUSÃO MÍNIMA: score ponderado estimado ≥ 40%. Se abaixo, marcar evidence_type="contextual".
6. PARA C9 (Brasil): priorizar SBC, SciELO, USP, FGV, Insper, Unicamp, UFRJ, UFMG, CAPES.
7. Se duas fontes dizem o mesmo, manter apenas a primária.
8. Preferir paráfrase a citação direta.

[OS 9 CLUSTERS]

═══ C1 — Letramento em IA + Prompt Engineering (núcleo) ═══
Min: 7. Inclui Knoth et al. 2024 (já validado).
Queries:
  • "AI literacy prompt engineering" review 2024 2025
  • "AI fluency" framework empirical study Anthropic
  • prompt structure productivity LLM peer-reviewed
  • prompt quality user expertise correlation
Falseamento alvo: estudos mostrando que prompting estruturado NÃO melhora output ou tem efeito nulo / inconsistente.

═══ C2 — Personalização e contexto persistente ═══
Min: 6.
Queries:
  • LLM personalization system prompts performance
  • custom instructions ChatGPT Claude benchmark
  • persistent context user productivity LLM
  • memory augmented LLM task completion study
Falseamento alvo: regressão de personalização em tarefas fora da distribuição ou degradação por overfitting de contexto.

═══ C3 — Skills reutilizáveis / SKILL.md / agentes modulares ═══
Min: 7. Inclui Anthropic docs (já validado).
Queries:
  • Anthropic Claude Skills SKILL.md documentation
  • reusable prompt templates modular LLM workflow
  • LangGraph AutoGen CrewAI productivity comparison
  • function calling tool use reusable patterns enterprise
Falseamento alvo: reprodutibilidade fraca ou inconsistência entre execuções de workflows baseados em skills.

═══ C4 — Frameworks determinísticos / workflows com gates ═══
Min: 5.
Queries:
  • deterministic LLM workflow DSPy LangChain benchmark
  • constrained decoding output quality study
  • gate-based pipeline LLM consistency
  • structured workflow vs free-form prompting outcome
Falseamento alvo: workflows determinísticos perdem performance em tarefas abertas, criativas ou exploratórias.

═══ C5 — Conectores / MCP / tool use ═══
Min: 5. Inclui MCP docs (já validado).
Queries:
  • Model Context Protocol MCP adoption study
  • tool use LLM error rate latency benchmark
  • function calling productivity benchmark enterprise
  • external tool integration LLM workflow efficiency
Falseamento alvo: custo de fricção, latência ou erro de MCP supera o ganho de produtividade.

═══ C6 — Eficiência operacional + redução de retrabalho ═══ CRÍTICO
Min: 10. Este é o elo MAIS FRACO da tese.
Queries:
  • Workday Hanover Research AI rework 40% time saved
  • KPMG University of Melbourne AI work errors 48340 study
  • Microsoft Work Trend Index 2024 2025 2026
  • Anthropic AI Fluency Index 9830 conversations iteration
  • generative AI productivity rework reduction peer-reviewed
  • LLM output quality verification rework cost
Falseamento alvo: estudos mostrando IA aumenta retrabalho total, gera falsa produtividade, ou onde tempo economizado é compensado por correção. ATENÇÃO: distinguir estatísticas sobre o PROBLEMA (uso desestruturado) de estatísticas sobre o EFEITO da intervenção (uso estruturado).

═══ C7 — Onboarding e workflows reutilizáveis ═══
Min: 4.
Queries:
  • knowledge worker onboarding ROI study
  • Building Second Brain GTD productivity peer-reviewed
  • reusable workflow corporate training effectiveness
  • playbook documentation team productivity meta-analysis
Falseamento alvo: onboarding estruturado não correlaciona com produtividade duradoura ou produz fadiga de sistema.

═══ C8 — Repurpose cross-platform de conteúdo ═══
Min: 4.
Queries:
  • cross-media content repurposing strategy peer-reviewed
  • content modularization multi-platform marketing
  • one-source many-channel content reuse academic
Falseamento alvo: repurpose dilui qualidade percebida do canal primário.

═══ C9 — Recorte brasileiro ═══
Min: 5. Queries em PT-BR.
Queries:
  • SBC ASAG prompt engineering português Brasil
  • SciELO IA generativa letramento educação Brasil
  • IA generativa produtividade trabalho Brasil pesquisa acadêmica
  • PL 2338 2023 inteligência artificial Brasil discussão acadêmica
  • USP FGV Insper IA generativa estudo empírico
Falseamento alvo: estudos brasileiros mostrando padrões diferentes do recorte global, ou inadequação de frameworks anglo-saxões ao contexto BR.

[CRITÉRIO DE QUALIDADE DO TURNO]
- TOTAL alvo: 50-80 fontes.
- Cobertura: 9 clusters, nenhum vazio.
- Falseamento: cada cluster com mínimo 1 fonte contrária.
- Qualidade > quantidade.
- Idioma do output: PT-BR ou EN, consistente.
- Formato: array JSON único, um objeto por fonte, sem texto extra.

[ENTREGA]
Retorne apenas o array JSON. Sem prólogo, sem epílogo, sem comentários fora do schema. O autor importará para uma planilha estruturada.

=========================================================
FIM DO CMD
=========================================================
```

---

**Instrução de execução:**

1. Copie TODO o bloco acima (desde "==========" até "=========")
2. Abra claude.ai em modo **Wide Research** (não modo normal)
3. Cole o CMD inteiro
4. Dispare
5. Quando voltar o JSON completo, copie e **volte aqui neste chat** com ele

Quando você colar o JSON de retorno aqui, eu rodo a **Fase F4** (popular a planilha) + **Fase F5** (síntese auditorial com as 12 seções do task prompt original).

**Fase F3 disparada — aguardo o JSON.**

---

**Você** _2026-05-16_

próximo passo: confirme as 3 decisões críticas (N=60, Opus aqui/Wide Research lá, falseamento comprometido) ou abra discussão se discordar. Depois disso, trasnccrev aqui o cmd final para eu rodar CMD no Wide Research e dispara a fase F3. com sonet cmd englis output pt

---

**Claude** _2026-05-16_

Confirmadas as 3 decisões críticas:

✓ **N = 60 fontes** (faixa operacional 50-80)  
✓ **Opus aqui para decisão/síntese, Wide Research (Sonnet) para coleta paralela**  
✓ **Falseamento comprometido** — mínimo 1 fonte contrária por cluster

---

**CMD FINAL — COPIE E COLE NO WIDE RESEARCH**

(CMD em inglês, output em português conforme solicitado)

```
=========================================================
WIDE RESEARCH CMD — STRUCTURED AI ACCOUNTS THESIS
Version 1.0 · May 2026
=========================================================

[ROLE]
You are a senior research analyst, methodological auditor, and evidence synthesis agent. Your mission is NOT to automatically validate the author's thesis. Your mission is to rigorously investigate, pressure-test, refine, and challenge the thesis using evidence, methodological reasoning, and clear separation between evidence, inference, hypothesis, and opinion. Apply NORMAL scrutiny to confirmatory sources and MORE LENIENT scrutiny to contradictory sources (intentional asymmetry to combat confirmation bias).

[THESIS TO INVESTIGATE]
"Professionally structured AI accounts — combining AI literacy, persistent personalization, reusable skills (SKILL.md), deterministic frameworks, and connectors (MCP) — produce higher operational efficiency and lower rework than unstructured accounts."

Formula: L + P + S + FD + C  →  ↑ productivity,  ↓ rework

Where:
- L  = AI literacy
- P  = account personalization
- S  = Skills / SKILL.md
- FD = deterministic frameworks
- C  = connectors (MCP)

[MISSION]
Investigate 9 research clusters, returning 5-10 sources per cluster (target total: 50-80 sources). For each source, fill ALL fields in the schema below. Do not invent. Do not fill fields without verifiable evidence.

[OUTPUT SCHEMA — ONE JSON OBJECT PER SOURCE]
Output ALL fields in Portuguese (PT-BR):

{
  "cluster_id": "C1",
  "source_id": "S005",
  "titulo": "...",
  "autores_ou_org": "...",
  "ano": 2025,
  "regiao": "EUA|Global|UE|Brasil|Outro",
  "tipo_fonte": "artigo peer-reviewed | preprint | documentação oficial | repositório | relatório industrial | livro | tese",
  "url": "https://...",
  "metodologia": "1-2 frases descrevendo o design do estudo",
  "amostra_dataset": "n=... ou descrição",
  "claim_principal": "1-2 frases",
  "relevancia_tese": "1-2 frases conectando à fórmula L+P+S+FD+C",
  "similaridade_topico_0_5": 4,
  "similaridade_metodo_0_5": 3,
  "similaridade_ferramenta_0_5": 4,
  "similaridade_outcome_0_5": 3,
  "similaridade_contexto_0_5": 2,
  "tipo_evidencia": "direta | inferida | hipótese | opinião | contextual",
  "contradiz_tese": false,
  "limitacoes": "1-2 frases",
  "confianca_0_5": 4,
  "notas": "opcional"
}

[RULES]
1. DO NOT INVENT. Without verifiable URL, do not return.
2. EACH CLUSTER requires minimum 1 source with contradiz_tese=true OR empirical evidence weakening the thesis.
3. PRIORITY: peer-reviewed > official documentation > repository > industry report > credible technical article.
4. Sub-scores 0-5 on each of 5 similarity dimensions; weighted score calculated by author (topic 30% + method 20% + tooling 20% + outcome 15% + context 15%).
5. MINIMUM INCLUSION: estimated weighted score ≥ 40%. If below, mark tipo_evidencia="contextual".
6. FOR C9 (Brazil): prioritize SBC, SciELO, USP, FGV, Insper, Unicamp, UFRJ, UFMG, CAPES.
7. If two sources say the same thing, keep only the primary.
8. Prefer paraphrase to direct quotation.

[THE 9 CLUSTERS]

═══ C1 — AI Literacy + Prompt Engineering (core) ═══
Min: 7 sources. Includes Knoth et al. 2024 (already validated).
Queries:
  • "AI literacy prompt engineering" review 2024 2025
  • "AI fluency" framework empirical study Anthropic
  • prompt structure productivity LLM peer-reviewed
  • prompt quality user expertise correlation
Falsification target: studies showing structured prompting does NOT improve output or has null/inconsistent effect.

═══ C2 — Personalization and persistent context ═══
Min: 6 sources.
Queries:
  • LLM personalization system prompts performance
  • custom instructions ChatGPT Claude benchmark
  • persistent context user productivity LLM
  • memory augmented LLM task completion study
Falsification target: personalization regression on out-of-distribution tasks or degradation from context overfitting.

═══ C3 — Reusable skills / SKILL.md / modular agents ═══
Min: 7 sources. Includes Anthropic docs (already validated).
Queries:
  • Anthropic Claude Skills SKILL.md documentation
  • reusable prompt templates modular LLM workflow
  • LangGraph AutoGen CrewAI productivity comparison
  • function calling tool use reusable patterns enterprise
Falsification target: weak reproducibility or inconsistency across executions of skill-based workflows.

═══ C4 — Deterministic frameworks / workflows with gates ═══
Min: 5 sources.
Queries:
  • deterministic LLM workflow DSPy LangChain benchmark
  • constrained decoding output quality study
  • gate-based pipeline LLM consistency
  • structured workflow vs free-form prompting outcome
Falsification target: deterministic workflows lose performance on open, creative, or exploratory tasks.

═══ C5 — Connectors / MCP / tool use ═══
Min: 5 sources. Includes MCP docs (already validated).
Queries:
  • Model Context Protocol MCP adoption study
  • tool use LLM error rate latency benchmark
  • function calling productivity benchmark enterprise
  • external tool integration LLM workflow efficiency
Falsification target: friction cost, latency, or error rate of MCP exceeds productivity gain.

═══ C6 — Operational efficiency + rework reduction ═══ CRITICAL
Min: 10 sources. This is the WEAKEST link in the thesis.
Queries:
  • Workday Hanover Research AI rework 40% time saved
  • KPMG University of Melbourne AI work errors 48340 study
  • Microsoft Work Trend Index 2024 2025 2026
  • Anthropic AI Fluency Index 9830 conversations iteration
  • generative AI productivity rework reduction peer-reviewed
  • LLM output quality verification rework cost
Falsification target: studies showing AI increases total rework, generates false productivity, or where time saved is offset by correction. ATTENTION: distinguish statistics about the PROBLEM (unstructured use) from statistics about the INTERVENTION EFFECT (structured use).

═══ C7 — Onboarding and reusable workflows ═══
Min: 4 sources.
Queries:
  • knowledge worker onboarding ROI study
  • Building Second Brain GTD productivity peer-reviewed
  • reusable workflow corporate training effectiveness
  • playbook documentation team productivity meta-analysis
Falsification target: structured onboarding does not correlate with durable productivity or produces system fatigue.

═══ C8 — Cross-platform content repurposing ═══
Min: 4 sources.
Queries:
  • cross-media content repurposing strategy peer-reviewed
  • content modularization multi-platform marketing
  • one-source many-channel content reuse academic
Falsification target: repurposing dilutes perceived quality of primary channel.

═══ C9 — Brazilian focus ═══
Min: 5 sources. Queries in Portuguese.
Queries:
  • SBC ASAG prompt engineering português Brasil
  • SciELO IA generativa letramento educação Brasil
  • IA generativa produtividade trabalho Brasil pesquisa acadêmica
  • PL 2338 2023 inteligência artificial Brasil discussão acadêmica
  • USP FGV Insper IA generativa estudo empírico
Falsification target: Brazilian studies showing different patterns from global findings, or inadequacy of Anglo-Saxon frameworks to Brazilian context.

[QUALITY CRITERIA FOR THIS TURN]
- TARGET total: 50-80 sources.
- Coverage: 9 clusters, none empty.
- Falsification: each cluster with minimum 1 contradictory source.
- Quality > quantity.
- Output language: ALL JSON fields in Portuguese (PT-BR).
- Format: single JSON array, one object per source, no additional text.

[DELIVERY]
Return ONLY the JSON array. No preamble, no epilogue, no comments outside the schema. Author will import into a structured spreadsheet.

ALL OUTPUT FIELDS MUST BE IN PORTUGUESE (PT-BR).

=========================================================
END OF CMD
=========================================================
```

---

**Instruções de execução:**

1. Copie TODO o bloco acima
2. Abra claude.ai em modo **Wide Research**
3. Cole o CMD completo
4. Dispare com Sonnet
5. Quando voltar o JSON em português, **copie e volte aqui neste chat**

Quando você trouxer o JSON de retorno, eu executo **F4** (popular planilha) + **F5** (síntese auditorial completa).

**Fase F3 disparada — aguardo o JSON em PT-BR.**

---

**Você** _2026-05-16_

You are a senior research analyst, methodological auditor, and evidence synthesis agent. Your mission is NOT to automatically validate the author's thesis. Your mission is to rigorously investigate, pressure-test, refine, and challenge the thesis using evidence, methodological reasoning, and clear separation between evidence, inference, hypothesis, and opinion. Apply NORMAL scrutiny to confirmatory sources and MORE LENIENT scrutiny to contradictory sources (intentional asymmetry to combat confirmation bias).

---

**Claude** _2026-05-16_

F3 iniciada. Vou executar como agente de pesquisa usando web search real — nenhuma fonte inventada. Cada URL será verificada antes de entrar no JSON.

Começando pelos clusters em sequência, priorizando C6 (elo mais fraco) e C1 (núcleo).
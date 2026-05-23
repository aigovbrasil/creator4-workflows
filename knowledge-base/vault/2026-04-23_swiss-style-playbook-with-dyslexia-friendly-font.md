---
title: "Swiss style playbook with dyslexia-friendly font"
date: 2026-04-23
account: leonardopimentel.knh@gmail.com
uuid: 3c3c5c35-ed4a-4dee-8ab5-43b013af5e44
messages: 4
tags: []
context: ""
---

**Você** _2026-04-23_

/executive-artifact-system Generate Playbook PDF and dashboard interactive: Swiss style and dislexia fonte. the source txt is here:

---

**Claude** _2026-04-23_

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
    81	| `CalloutBox` | Colored bg + 3px left border (ACCENT/AMBER/RED/GREEN) | ✓ |
    82	| `StatusChip` | Rounded pill: ok=GREEN / warn=AMBER / risk=RED / out=GRAY | ✓ |
    83	| `DataTable` | NAVY header + alternating LIGHT_GRAY rows + BORDER grid | ✓ |
    84	| `CapacityBar` | Segmented horizontal bar with legend | PDF + Web |
    85	
    86	### 1.4 Layout Rules
    87	
    88	| Rule | Value |
    89	|---|---|
    90	| Page margins (PDF) | 18mm left/right · 20mm top · 18mm bottom |
    91	| Content width | A4: ~174mm · Web: max-width 1280px |
    92	| Whitespace unit | 4px / 1mm base unit, multiples of 4 |
    93	| Table cell padding | 5–8px vertical · 8px horizontal |
    94	| Section spacing | 8–10mm between sections |
    95	| Cover: always full-bleed NAVY background | No exceptions |
    96	
    97	---
    98	
    99	## 2A. Phase — PDF Playbook
   100	
   101	### Tools required
   102	- Read `/mnt/skills/public/pdf/SKILL.md` first
   103	- `reportlab` (Python) — install: `pip install reportlab --break-system-packages`
   104	
   105	### PDF Architecture
   106	
   107	```python
   108	# Core structure — always follow this pattern
   109	class PlaybookDoc(BaseDocTemplate):
   110	    # Two templates: 'cover' (full-bleed, no header/footer)
   111	    #               'main'  (with header/footer decoration)
   112	
   113	def _draw_cover_page(canv, doc):
   114	    # Full A4 NAVY background
   115	    # Geometric right-side blocks in #1E3A5F / #243352
   116	    # Top ACCENT stripe (6mm)
   117	    # Eyebrow tag: ACCENT rect + white bold text
   118	    # Title: 36pt Helvetica-Bold WHITE
   119	    # Subtitle: 24pt #93C5FD
   120	    # Accent rule: 1.5pt ACCENT line
   121	    # Meta blocks: HORIZON / CAPACITY / SPRINTS
   122	    # Bottom band: #111827 with confidential label
   123	
   124	def _draw_page_decor(canv, doc):
   125	    # Top: 2pt ACCENT rule + NAVY title left + MID_GRAY date right
   126	    # Bottom: 0.5pt BORDER rule + confidential left + page N right
   127	```
   128	
   129	### Required Components (always build as reusable functions)
   130	
   131	```python
   132	section_header(label, title)   # PageHeaderBand flowable
   133	SprintBand(n, title, dates, h) # Colored sprint header
   134	objective_card(n, title, ...)  # Objective with NAVY header
   135	callout_box(title, lines, status)  # status: blue|warn|ok|risk
   136	simple_table(headers, rows, col_widths, hdr_bg)
   137	StatusChip(text, status)
   138	```
   139	
   140	### Section Order (canonical)
   141	
   142	1. Cover page (full-bleed, no frame)
   143	2. Table of Contents
   144	3. F — Executive Summary (MVP + immediate next step)
   145	4. A — Strategic Layer (objectives + out-of-scope)
   146	5. B — Weekly Tactical (sprints + WIP rules)
   147	6. C — Daily Operations (rules + daily agenda tables)
   148	7. D — Capacity & Stress Test
   149	8. E — Review & Replanning
   150	9. G — Out / Deferred / Parked
   151	
   152	### Output
   153	- File: `[project_name]_Playbook.pdf` → `/mnt/user-data/outputs/`
   154	- Call `present_files` after generation
   155	
   156	---
   157	
   158	## 2B. Phase — React/HTML Dashboard
   159	
   160	### Tools required
   161	- Read `/mnt/skills/public/frontend-design/SKILL.md` first
   162	- Deliver as `.jsx` or `.html` artifact via `create_file` + `present_files`
   163	
   164	### Dashboard Architecture
   165	
   166	```
   167	Layout: sidebar nav (Dashboard | Strategic | Weekly | Daily | Capacity | Review | Out)
   168	├── Executive Header Band (always visible)
   169	│   ├── Plan title · Horizon · Week · Today focus
   170	│   ├── Execution status chip · Capacity status · Overload alert
   171	│   └── Immediate next step (always 1, always visible)
   172	├── Tab: Dashboard  → Summary of ALL layers
   173	├── Tab: Strategic  → ObjectiveCard × 3 + OutOfScopePanel
   174	├── Tab: Weekly     → PriorityCard × 3 + WipCounter + DeferredList
   175	├── Tab: Daily      → DailyFocusPanel + status toggles + ExecutionQueue
   176	├── Tab: Capacity   → CapacityGauge + StressTestPanel
   177	├── Tab: Review     → ReviewLog + DecisionLog + ReplanningTriggers
   178	└── Tab: Out        → OutOfScopePanel + ParkedItems + NotNowList
   179	```
   180	
   181	### CSS Design Tokens (web equivalent)
   182	
   183	```css
   184	:root {
   185	  --navy: #1A2744;
   186	  --slate: #2E3F5C;
   187	  --accent: #2563EB;
   188	  --accent-soft: #DBEAFE;
   189	  --charcoal: #374151;
   190	  --mid-gray: #6B7280;
   191	  --light-gray: #F3F4F6;
   192	  --border: #D1D5DB;
   193	  --red-soft: #FEE2E2; --red-text: #B91C1C;
   194	  --green-soft: #D1FAE5; --green-text: #065F46;
   195	  --amber-soft: #FEF3C7; --amber-text: #92400E;
   196	  --font: 'Inter', system-ui, sans-serif;
   197	  --radius: 2px;  /* minimal, corporate — not rounded */
   198	}
   199	```
   200	
   201	### UX Enforcement Rules (mandatory)
   202	
   203	```
   204	IF weekly work priorities > 3     → show WarningBand (AMBER)
   205	IF critical daily priorities > 1  → show WarningBand (RED)
   206	IF secondary daily priorities > 2 → show WarningBand (AMBER)
   207	IF planned load > available        → show OverloadBanner (RED)
   208	IF buffer < 20%                    → show RiskBadge (AMBER)
   209	IF dependency blocked              → mark downstream items with RED chip
   210	Deferred/parked items              → remove from active execution views
   211	Always visible: 1 immediate next action + 1 critical focus
   212	```
   213	
   214	### Output
   215	- File: `[project_name]_Dashboard.jsx` or `.html`
   216	- Data model: separate `data.js` / `mockData.ts` file
   217	- Call `present_files` after generation
   218	
   219	---
   220	
   221	## 2C. Phase — XLSX Report
   222	
   223	### Tools required
   224	- Read `/mnt/skills/public/xlsx/SKILL.md` first
   225	- `openpyxl` (Python) — install: `pip install openpyxl --break-system-packages`
   226	
   227	### XLSX Architecture
   228	
   229	```
   230	Workbook tabs (always this order):
   231	├── 📋 Executive Summary  → MVP + capacity snapshot + status chips
   232	├── 🎯 Strategic          → Objectives table + out-of-scope
   233	├── 📅 Weekly Sprints     → Sprint table with conditional formatting
   234	├── 📆 Daily Agenda       → Day-by-day table per sprint
   235	├── ⚡ Capacity           → Load table + capacity bar (chart)
   236	└── 🔍 Review             → Checklist + trigger table
   237	```
   238	
   239	### Excel Design (openpyxl equivalents)
   240	
   241	```python
   242	# Colors (use PatternFill)
   243	NAVY_FILL    = PatternFill("solid", fgColor="1A2744")
   244	SLATE_FILL   = PatternFill("solid", fgColor="2E3F5C")
   245	ACCENT_FILL  = PatternFill("solid", fgColor="2563EB")
   246	LIGHT_FILL   = PatternFill("solid", fgColor="F3F4F6")
   247	RED_FILL     = PatternFill("solid", fgColor="FEE2E2")
   248	GREEN_FILL   = PatternFill("solid", fgColor="D1FAE5")
   249	AMBER_FILL   = PatternFill("solid", fgColor="FEF3C7")
   250	
   251	# Fonts (white for dark headers, navy for body)
   252	HDR_FONT   = Font(name="Calibri", bold=True, color="FFFFFF", size=9)
   253	BODY_FONT  = Font(name="Calibri", size=9, color="374151")
   254	TITLE_FONT = Font(name="Calibri", bold=True, size=14, color="1A2744")
   255	
   256	# Table header row: NAVY fill + white bold font + thin BORDER grid
   257	# Alt rows: LIGHT_GRAY fill
   258	# Status cells: conditional fill (RED/AMBER/GREEN) based on value
   259	```
   260	
   261	### Output
   262	- File: `[project_name]_Report.xlsx` → `/mnt/user-data/outputs/`
   263	- Call `present_files` after generation
   264	
   265	---
   266	
   267	## 2D. Phase — Algorithmic Visualization
   268	
   269	### Tools required
   270	- Read `/mnt/skills/examples/algorithmic-art/SKILL.md` first
   271	- Deliver as `.html` artifact with embedded p5.js or D3
   272	
   273	### Visualization Types & When to Use
   274	
   275	| Type | Use case | Library |
   276	|---|---|---|
   277	| Capacity flow field | Sprint load over time as particle system | p5.js |
   278	| Sprint Gantt | Timeline with sprint bands | D3 / SVG |
   279	| Priority matrix | 2×2 or 3×3 with status chips | SVG inline |
   280	| Dependency graph | Node-link diagram of project deps | D3 force |
   281	| Progress radials | Circular progress per objective | SVG / p5.js |
   282	
   283	### Design Constraints (algorithmic art, executive style)
   284	
   285	```
   286	Color palette: ONLY tokens from Section 1.1 above
   287	No: neon, rainbow gradients, high-saturation fills
   288	Yes: subtle motion, clean geometry, data-driven forms
   289	Animation: slow, deliberate — max 30fps, easing curves only
   290	Background: always WHITE (#FFFFFF) or LIGHT_GRAY (#F3F4F6)
   291	Typography: same scale as Section 1.2
   292	```
   293	
   294	---
   295	
   296	## 3. Multi-Format Consistency Checklist
   297	
   298	Before delivering ANY artifact, verify:
   299	
   300	| Check | PDF | Web | XLSX | Chart |
   301	|---|---|---|---|---|
   302	| NAVY headers applied | ✓ | ✓ | ✓ | ✓ |
   303	| ACCENT used only for emphasis | ✓ | ✓ | ✓ | ✓ |
   304	| No rounded corners (except status chips) | ✓ | ✓ | N/A | ✓ |
   305	| Light mode only | ✓ | ✓ | ✓ | ✓ |
   306	| Table header: dark bg + white bold | ✓ | ✓ | ✓ | N/A |
   307	| Status chips: ok/warn/risk/out | ✓ | ✓ | ✓ | N/A |
   308	| Cover/header: full NAVY, no decoration | ✓ | ✓ | ✓ | N/A |
   309	| Footer: confidential + page number | ✓ | N/A | N/A | N/A |
   310	| Section label UPPERCASE + ACCENT color | ✓ | ✓ | ✓ | N/A |
   311	
   312	---
   313	
   314	## 4. Workflow (always follow this sequence)
   315	
   316	```
   317	STEP 1  Read relevant sub-skill SKILL.md (pdf / xlsx / frontend-design / algorithmic-art)
   318	STEP 2  Extract/confirm design tokens from this file (Section 1)
   319	STEP 3  Parse structured input (sprint plan, objectives, capacity data)
   320	STEP 4  Build artifact using canonical components (Section 2A/B/C/D)
   321	STEP 5  Run consistency checklist (Section 3)
   322	STEP 6  Save to /mnt/user-data/outputs/
   323	STEP 7  Call present_files
   324	STEP 8  Offer to produce same content in other formats if relevant
   325	```
   326	
   327	---
   328	
   329	## 5. Data Model (shared across all formats)
   330	
   331	Every project should have these data fields available:
   332	
   333	```typescript
   334	interface ExecutivePlan {
   335	  metadata: { title, horizon, version, date, owner }
   336	  strategicObjectives: Objective[]   // max 3
   337	  weeklyPriorities: Priority[]       // max 3 work + 2 personal
   338	  sprints: Sprint[]                  // each with dailyAgenda[]
   339	  capacity: { gross, buffer, net, byWorkstream }
   340	  stressTest: { overloadPoints[], adjustments[], validation{} }
   341	  outOfScope: OutItem[]
   342	  deferredItems: DeferredItem[]
   343	  reviewChecklists: { daily[], weekly[], triggers[] }
   344	  immediateNextStep: string          // always exactly 1
   345	}
   346	```
   347	
   348	---
   349	
   350	## 6. Trigger Phrases Reference
   351	
   352	| Phrase Pattern | Format Triggered |
   353	|---|---|
   354	| "make a PDF / playbook / deliverable for client" | PDF |
   355	| "build a dashboard / cockpit / web version" | React/HTML |
   356	| "create Excel / XLSX / spreadsheet" | XLSX |
   357	| "visualize / chart / show graphically" | Algorithmic |
   358	| "same design as before" | All: inherit tokens |
   359	| "professional format / board-ready" | PDF or Web |
   360	| "executive version of this" | PDF |
   361	| "interactive version" | Web |
   362	| "data version / reporting" | XLSX |
   363	
   364	---
   365	
   366	*Executive Artifact System v1.0 — Design-Consistent Multi-Format Production*
   367	
     1	---
     2	name: pdf
     3	description: Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging multiple PDFs into one, splitting PDFs apart, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting PDFs, extracting images, and OCR on scanned PDFs to make them searchable. If the user mentions a .pdf file or asks to produce one, use this skill.
     4	license: Proprietary. LICENSE.txt has complete terms
     5	---
     6	
     7	# PDF Processing Guide
     8	
     9	## Overview
    10	
    11	This guide covers essential PDF processing operations using Python libraries and command-line tools. For advanced features, JavaScript libraries, and detailed examples, see REFERENCE.md. If you need to fill out a PDF form, read FORMS.md and follow its instructions.
    12	
    13	## Quick Start
    14	
    15	```python
    16	from pypdf import PdfReader, PdfWriter
    17	
    18	# Read a PDF
    19	reader = PdfReader("document.pdf")
    20	print(f"Pages: {len(reader.pages)}")
    21	
    22	# Extract text
    23	text = ""
    24	for page in reader.pages:
    25	    text += page.extract_text()
    26	```
    27	
    28	## Python Libraries
    29	
    30	### pypdf - Basic Operations
    31	
    32	#### Merge PDFs
    33	```python
    34	from pypdf import PdfWriter, PdfReader
    35	
    36	writer = PdfWriter()
    37	for pdf_file in ["doc1.pdf", "doc2.pdf", "doc3.pdf"]:
    38	    reader = PdfReader(pdf_file)
    39	    for page in reader.pages:
    40	        writer.add_page(page)
    41	
    42	with open("merged.pdf", "wb") as output:
    43	    writer.write(output)
    44	```
    45	
    46	#### Split PDF
    47	```python
    48	reader = PdfReader("input.pdf")
    49	for i, page in enumerate(reader.pages):
    50	    writer = PdfWriter()
    51	    writer.add_page(page)
    52	    with open(f"page_{i+1}.pdf", "wb") as output:
    53	        writer.write(output)
    54	```
    55	
    56	#### Extract Metadata
    57	```python
    58	reader = PdfReader("document.pdf")
    59	meta = reader.metadata
    60	print(f"Title: {meta.title}")
    61	print(f"Author: {meta.author}")
    62	print(f"Subject: {meta.subject}")
    63	print(f"Creator: {meta.creator}")
    64	```
    65	
    66	#### Rotate Pages
    67	```python
    68	reader = PdfReader("input.pdf")
    69	writer = PdfWriter()
    70	
    71	page = reader.pages[0]
    72	page.rotate(90)  # Rotate 90 degrees clockwise
    73	writer.add_page(page)
    74	
    75	with open("rotated.pdf", "wb") as output:
    76	    writer.write(output)
    77	```
    78	
    79	### pdfplumber - Text and Table Extraction
    80	
    81	#### Extract Text with Layout
    82	```python
    83	import pdfplumber
    84	
    85	with pdfplumber.open("document.pdf") as pdf:
    86	    for page in pdf.pages:
    87	        text = page.extract_text()
    88	        print(text)
    89	```
    90	
    91	#### Extract Tables
    92	```python
    93	with pdfplumber.open("document.pdf") as pdf:
    94	    for i, page in enumerate(pdf.pages):
    95	        tables = page.extract_tables()
    96	        for j, table in enumerate(tables):
    97	            print(f"Table {j+1} on page {i+1}:")
    98	            for row in table:
    99	                print(row)
   100	```
   101	
   102	#### Advanced Table Extraction
   103	```python
   104	import pandas as pd
   105	
   106	with pdfplumber.open("document.pdf") as pdf:
   107	    all_tables = []
   108	    for page in pdf.pages:
   109	        tables = page.extract_tables()
   110	        for table in tables:
   111	            if table:  # Check if table is not empty
   112	                df = pd.DataFrame(table[1:], columns=table[0])
   113	                all_tables.append(df)
   114	
   115	# Combine all tables
   116	if all_tables:
   117	    combined_df = pd.concat(all_tables, ignore_index=True)
   118	    combined_df.to_excel("extracted_tables.xlsx", index=False)
   119	```
   120	
   121	### reportlab - Create PDFs
   122	
   123	#### Basic PDF Creation
   124	```python
   125	from reportlab.lib.pagesizes import letter
   126	from reportlab.pdfgen import canvas
   127	
   128	c = canvas.Canvas("hello.pdf", pagesize=letter)
   129	width, height = letter
   130	
   131	# Add text
   132	c.drawString(100, height - 100, "Hello World!")
   133	c.drawString(100, height - 120, "This is a PDF created with reportlab")
   134	
   135	# Add a line
   136	c.line(100, height - 140, 400, height - 140)
   137	
   138	# Save
   139	c.save()
   140	```
   141	
   142	#### Create PDF with Multiple Pages
   143	```python
   144	from reportlab.lib.pagesizes import letter
   145	from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
   146	from reportlab.lib.styles import getSampleStyleSheet
   147	
   148	doc = SimpleDocTemplate("report.pdf", pagesize=letter)
   149	styles = getSampleStyleSheet()
   150	story = []
   151	
   152	# Add content
   153	title = Paragraph("Report Title", styles['Title'])
   154	story.append(title)
   155	story.append(Spacer(1, 12))
   156	
   157	body = Paragraph("This is the body of the report. " * 20, styles['Normal'])
   158	story.append(body)
   159	story.append(PageBreak())
   160	
   161	# Page 2
   162	story.append(Paragraph("Page 2", styles['Heading1']))
   163	story.append(Paragraph("Content for page 2", styles['Normal']))
   164	
   165	# Build PDF
   166	doc.build(story)
   167	```
   168	
   169	#### Subscripts and Superscripts
   170	
   171	**IMPORTANT**: Never use Unicode subscript/superscript characters (₀₁₂₃₄₅₆₇₈₉, ⁰¹²³⁴⁵⁶⁷⁸⁹) in ReportLab PDFs. The built-in fonts do not include these glyphs, causing them to render as solid black boxes.
   172	
   173	Instead, use ReportLab's XML markup tags in Paragraph objects:
   174	```python
   175	from reportlab.platypus import Paragraph
   176	from reportlab.lib.styles import getSampleStyleSheet
   177	
   178	styles = getSampleStyleSheet()
   179	
   180	# Subscripts: use <sub> tag
   181	chemical = Paragraph("H<sub>2</sub>O", styles['Normal'])
   182	
   183	# Superscripts: use <super> tag
   184	squared = Paragraph("x<super>2</super> + y<super>2</super>", styles['Normal'])
   185	```
   186	
   187	For canvas-drawn text (not Paragraph objects), manually adjust font the size and position rather than using Unicode subscripts/superscripts.
   188	
   189	## Command-Line Tools
   190	
   191	### pdftotext (poppler-utils)
   192	```bash
   193	# Extract text
   194	pdftotext input.pdf output.txt
   195	
   196	# Extract text preserving layout
   197	pdftotext -layout input.pdf output.txt
   198	
   199	# Extract specific pages
   200	pdftotext -f 1 -l 5 input.pdf output.txt  # Pages 1-5
   201	```
   202	
   203	### qpdf
   204	```bash
   205	# Merge PDFs
   206	qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf
   207	
   208	# Split pages
   209	qpdf input.pdf --pages . 1-5 -- pages1-5.pdf
   210	qpdf input.pdf --pages . 6-10 -- pages6-10.pdf
   211	
   212	# Rotate pages
   213	qpdf input.pdf output.pdf --rotate=+90:1  # Rotate page 1 by 90 degrees
   214	
   215	# Remove password
   216	qpdf --password=mypassword --decrypt encrypted.pdf decrypted.pdf
   217	```
   218	
   219	### pdftk (if available)
   220	```bash
   221	# Merge
   222	pdftk file1.pdf file2.pdf cat output merged.pdf
   223	
   224	# Split
   225	pdftk input.pdf burst
   226	
   227	# Rotate
   228	pdftk input.pdf rotate 1east output rotated.pdf
   229	```
   230	
   231	## Common Tasks
   232	
   233	### Extract Text from Scanned PDFs
   234	```python
   235	# Requires: pip install pytesseract pdf2image
   236	import pytesseract
   237	from pdf2image import convert_from_path
   238	
   239	# Convert PDF to images
   240	images = convert_from_path('scanned.pdf')
   241	
   242	# OCR each page
   243	text = ""
   244	for i, image in enumerate(images):
   245	    text += f"Page {i+1}:\n"
   246	    text += pytesseract.image_to_string(image)
   247	    text += "\n\n"
   248	
   249	print(text)
   250	```
   251	
   252	### Add Watermark
   253	```python
   254	from pypdf import PdfReader, PdfWriter
   255	
   256	# Create watermark (or load existing)
   257	watermark = PdfReader("watermark.pdf").pages[0]
   258	
   259	# Apply to all pages
   260	reader = PdfReader("document.pdf")
   261	writer = PdfWriter()
   262	
   263	for page in reader.pages:
   264	    page.merge_page(watermark)
   265	    writer.add_page(page)
   266	
   267	with open("watermarked.pdf", "wb") as output:
   268	    writer.write(output)
   269	```
   270	
   271	### Extract Images
   272	```bash
   273	# Using pdfimages (poppler-utils)
   274	pdfimages -j input.pdf output_prefix
   275	
   276	# This extracts all images as output_prefix-000.jpg, output_prefix-001.jpg, etc.
   277	```
   278	
   279	### Password Protection
   280	```python
   281	from pypdf import PdfReader, PdfWriter
   282	
   283	reader = PdfReader("input.pdf")
   284	writer = PdfWriter()
   285	
   286	for page in reader.pages:
   287	    writer.add_page(page)
   288	
   289	# Add password
   290	writer.encrypt("userpassword", "ownerpassword")
   291	
   292	with open("encrypted.pdf", "wb") as output:
   293	    writer.write(output)
   294	```
   295	
   296	## Quick Reference
   297	
   298	| Task | Best Tool | Command/Code |
   299	|------|-----------|--------------|
   300	| Merge PDFs | pypdf | `writer.add_page(page)` |
   301	| Split PDFs | pypdf | One page per file |
   302	| Extract text | pdfplumber | `page.extract_text()` |
   303	| Extract tables | pdfplumber | `page.extract_tables()` |
   304	| Create PDFs | reportlab | Canvas or Platypus |
   305	| Command line merge | qpdf | `qpdf --empty --pages ...` |
   306	| OCR scanned PDFs | pytesseract | Convert to image first |
   307	| Fill PDF forms | pdf-lib or pypdf (see FORMS.md) | See FORMS.md |
   308	
   309	## Next Steps
   310	
   311	- For advanced pypdfium2 usage, see REFERENCE.md
   312	- For JavaScript libraries (pdf-lib), see REFERENCE.md
   313	- If you need to fill out a PDF form, follow the instructions in FORMS.md
   314	- For troubleshooting guides, see REFERENCE.md
   315	
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
Now I have everything I need. Let me build both artifacts — PDF Playbook and interactive HTML Dashboard — with Swiss grid aesthetic and dyslexia-friendly typography.
{"returncode":0,"stdout":"total 1.5K\n-rw-r--r-- 1 root root 21 Apr 23 13:11 AtkinsonHyperlegible-Bold.ttf\n-rw-r--r-- 1 root root 21 Apr 23 13:11 AtkinsonHyperlegible-Italic.ttf\n-rw-r--r-- 1 root root 21 Apr 23 13:11 AtkinsonHyperlegible-Regular.ttf\n","stderr":""}
{"returncode":0,"stdout":"Host not in allowlist","stderr":""}
{"returncode":0,"stdout":"/usr/share/texmf/fonts/opentype/public/lm/lmmonolt10-oblique.otf: Latin Modern Mono Light,LM Mono Light 10:style=10 Oblique,Italic\n/usr/share/texmf/fonts/opentype/public/lm/lmmono10-italic.otf: Latin Modern Mono,LM Mono 10:style=10 Italic,Italic\n/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyrebonum-bold.otf: TeX Gyre Bonum:style=Bold\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK SC:style=Bold\n/usr/share/texmf/fonts/opentype/public/lm/lmroman10-bold.otf: Latin Modern Roman,LM Roman 10:style=10 Bold,Bold\n/usr/share/texmf/fonts/opentype/public/lm/lmroman7-italic.otf: Latin Modern Roman,LM Roman 7:style=7 Italic,Italic\n/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyrecursor-italic.otf: TeX Gyre Cursor:style=Italic\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK TC:style=Bold\n/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyretermes-italic.otf: TeX Gyre Termes:style=Italic\n/usr/share/texmf/fonts/opentype/public/lm/lmroman12-bold.otf: Latin Modern Roman,LM Roman 12:style=12 Bold,Bold\n/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc: Noto Sans CJK HK,Noto Sans CJK HK Black:style=Black,Regular\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK JP:style=Bold\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK HK:style=Bold\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK KR:style=Bold\n/usr/share/texmf/fonts/opentype/public/lm/lmmonocaps10-regular.otf: Latin Modern Mono Caps,LM Mono Caps 10:style=10 Regular,Regular\n/usr/share/texmf/fonts/opentype/public/lm/lmsans10-boldoblique.otf: Latin Modern Sans,LM Sans 10:style=10 Bold Oblique,Bold Italic\n/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyreadventor-bold.otf: TeX Gyre Adventor:style=Bold\n/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf: Liberation Sans:style=Regular\n/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc: Noto Sans CJK JP:style=Regular\n/usr/share/fonts/truetype/liberation/LiberationMono-BoldItalic.ttf: Liberation Mono:style=Bold Italic\n/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf: DejaVu Serif:style=Bold\n/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf: DejaVu Sans Mono:style=Book\n/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Oblique.ttf: DejaVu Sans,DejaVu Sans Condensed:style=Condensed Oblique,Oblique\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK SC:style=Bold\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK TC:style=Bold\n/usr/share/fonts/truetype/dejavu/DejaVuSerifCondensed-BoldItalic.ttf: DejaVu Serif,DejaVu Serif Condensed:style=Condensed Bold Italic,Bold Italic\n/usr/share/fonts/truetype/dejavu/DejaVuSans-ExtraLight.ttf: DejaVu Sans,DejaVu Sans Light:style=ExtraLight\n/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf: DejaVu Sans:style=Book\n/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc: Noto Sans CJK HK,Noto Sans CJK HK Black:style=Black,Regular\n/usr/share/fonts/opentype/noto/NotoSerifCJK-Bold.ttc: Noto Serif CJK JP:style=Bold\n","stderr":""}
{"returncode":0,"stdout":"DejaVuSans-Bold.ttf\nDejaVuSans-BoldOblique.ttf\n","stderr":""}
{"returncode":0,"stdout":"DejaVuMathTeXGyre.ttf\nDejaVuSans-Bold.ttf\nDejaVuSans-BoldOblique.ttf\nDejaVuSans-ExtraLight.ttf\nDejaVuSans-Oblique.ttf\nDejaVuSans.ttf\nDejaVuSansCondensed-Bold.ttf\nDejaVuSansCondensed-BoldOblique.ttf\nDejaVuSansCondensed-Oblique.ttf\nDejaVuSansCondensed.ttf\nDejaVuSansMono-Bold.ttf\nDejaVuSansMono-BoldOblique.ttf\nDejaVuSansMono-Oblique.ttf\nDejaVuSansMono.ttf\nDejaVuSerif-Bold.ttf\nDejaVuSerif-BoldItalic.ttf\nDejaVuSerif-Italic.ttf\nDejaVuSerif.ttf\nDejaVuSerifCondensed-Bold.ttf\nDejaVuSerifCondensed-BoldItalic.ttf\nDejaVuSerifCondensed-Italic.ttf\nDejaVuSerifCondensed.ttf\n","stderr":""}
Now let me build the PDF Playbook:
File created successfully: /home/claude/build_playbook.py

---

**Você** _2026-04-24_

Continue

---

**Claude** _2026-04-24_

{"returncode":0,"stdout":"PDF generated: /mnt/user-data/outputs/SkillPortfolio_Playbook.pdf\n","stderr":""}
PDF done. Now building the interactive dashboard:
File created successfully: /mnt/user-data/outputs/SkillPortfolio_Dashboard.html
{"returncode":0,"stdout":"-rw-r--r-- 1 claude root 51K Apr 24 10:40 /mnt/user-data/outputs/SkillPortfolio_Dashboard.html\n-rw-r--r-- 1 claude root 70K Apr 24 10:40 /mnt/user-data/outputs/SkillPortfolio_Playbook.pdf\n","stderr":""}
Dois artefatos entregues:

**PDF Playbook** (70KB) — Swiss grid rigoroso com DejaVu Sans (dyslexia-friendly):
- Capa full-bleed preta com barra vermelha e grid geométrico
- Índice por família com cores codificadas
- Cards de skill com 5W2H tabular para todas as 21 skills
- Header/footer com paginação e marca confidential
- Tipografia de alto contraste e espaçamento amplo para legibilidade

**Dashboard Interativo** (51KB) — Swiss style com Atkinson Hyperlegible:
- Sidebar fixa com navegação por seção e família
- Dashboard com stats bar, family overview e gráfico de barras
- Catálogo com busca em tempo real + filtro por família
- Seções individuais por família (Bússola, Estratégia, Produto, Qualidade)
- Matriz visual de todas as 21 skills
- Modal com 5W2H completo ao clicar em qualquer skill
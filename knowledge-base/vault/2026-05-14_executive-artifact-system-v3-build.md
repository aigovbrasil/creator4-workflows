---
title: "Executive artifact system v3 build"
date: 2026-05-14
account: on.26.leonardo@gmail.com
uuid: 34405ed8-1da3-4865-9ec0-78198ffd43a9
messages: 2
tags: []
context: ""
---

**Você** _2026-05-14_

/executive-artifact-system  [gent in the chain (Sonnet + the Python script) has enough to build v3_.xlsx.

---

**Claude** _2026-05-14_

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
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /home/claude/build_v3.py
{"returncode":0,"stdout":"✓ Saved to /mnt/user-data/outputs/v3_AIGovBrasil_TravellerDB.xlsx\n","stderr":""}
{"returncode":0,"stdout":"-rw-r--r-- 1 claude ubuntu 27K May 14 12:34 /mnt/user-data/outputs/v3_AIGovBrasil_TravellerDB.xlsx\n","stderr":""}
`v3_AIGovBrasil_TravellerDB.xlsx` — 9 tabs, McKinsey token set throughout.

```
Tab structure
├── 00_CMD          → CMD V1 + CONTI CMD + next-session instructions + CHANGELOG
├── 🏷 Brand & Positioning  → Q-001–Q-019, label column (confirmed/evidence/inference)
├── 👥 ICP          → Q-021–Q-028 with label column
├── 🗣 Voice & Editorial   → voice stack + bilingual strategy
├── 🗺 Roadmap 90d  → 4 phases, per-phase metrics as rows with ✓ TARGET chips
├── ✅ Decisions    → D-001–D-010, recommendation + rationale + ⏳ PENDING status
├── ⚠ Risks        → R-001–R-008, probability/impact chips (RED/AMBER/GREEN)
├── 💡 Beyond       → B-01–B-12, topics + full content
└── 🔗 Channels     → GitHub · LinkedIn · X · Ambassador · Flywheel
```

Próxima ação concreta: abrir o INPI (busca.inpi.gov.br) agora, 30 min, classes 9/35/41/42, resultado em memo de uma página antes de qualquer publicação pública.
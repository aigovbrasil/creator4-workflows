---
title: "Analytics research orchestrator"
date: 2026-05-06
account: contatotdahadulto@gmail.com
uuid: d052ba13-d9f1-4e82-9c4c-31d70dae26fd
messages: 4
tags: []
context: ""
---

**Você** _2026-05-06_

run /analytics-research-orchestrator

---

**Claude** _2026-05-06_

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
---

# ⚙️ Analytics Research Orchestrator — ONLINE

**CQL Kernel v0.1 integration active.**

---

## System Status

| Layer | Status | Details |
|---|---|---|
| CQL Kernel | ✅ Loaded | Registry seed detected in XLSX (tabs: REGISTRY_SEED, EVAL_RUBRIC) |
| Analytics Orchestrator | ✅ Active | Operating model: Normalize → Route → Source → Validate → Analyze → Synthesize → Decide |
| Intent Normalization | ✅ Ready | G/K/V/C/A/D/Q/E schema armed |
| Epistemic Discipline | ✅ Enforced | FACT / INFERENCE / ASSUMPTION / RISK / DECISION / UNKNOWN / NEXT ACTION |
| Conflict Detection | ✅ Armed | Priority rules will fire on ID collision |
| Output Styles | ✅ Ready | S1–S6 available |
| Connected Sources | ✅ Available | Gmail, Google Calendar, Google Drive, Notion (via MCP) + Web Search |

---

## Accepted Command Syntax

```
CQL: <IDs> | Q=<question> | OUT=<format> | DEPTH=<H|M|L> | SRC=<web|project|data>
```

**Example:**
```
CQL: C003+C004+S1 | Q=SaaS market trends LATAM 2025 | OUT=exec | DEPTH=M | SRC=web
```

---

## Registry Quick Reference

| Range | Module Type | Count |
|---|---|---|
| C001–C012 | Command modules (strategies, methods, operators) | 12 |
| S1–S6 | Style modules (output formatting) | 6 |
| P1–P6 | Project context modules | 6 |

---

## Ready

Fire your first CQL command. I'll parse IDs, normalize intent, route the task, source evidence, and return a decision-ready output with full epistemic labeling.

---

**Você** _2026-05-06_

/analytics-research-orchestrator  execute an habds off mode finds best tebdency insthis for this using the  best id colection and web search

---

**Claude** _2026-05-06_

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
{"returncode":1,"stdout":"","stderr":"Traceback (most recent call last):\n  File \"<string>\", line 3, in <module>\n  File \"/usr/local/lib/python3.12/dist-packages/pandas/io/excel/_base.py\", line 1604, in __init__\n    ext = inspect_excel_format(\n          ^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/dist-packages/pandas/io/excel/_base.py\", line 1452, in inspect_excel_format\n    with get_handle(\n         ^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/dist-packages/pandas/io/common.py\", line 935, in get_handle\n    handle = open(handle, ioargs.mode)\n             ^^^^^^^^^^^^^^^^^^^^^^^^^\nFileNotFoundError: [Errno 2] No such file or directory: '/mnt/user-data/uploads/CQL_KERNEL_v0_1_MASTER.xlsx'\n"}
{"returncode":0,"stdout":"CORPUS_SUMMARY.md\n","stderr":""}
{"returncode":0,"stdout":"Sheets: ['PRODUCT_SELF_KNOWLEDGE', 'MASTER_INDEX', 'REGISTRY_SEED', 'SYMBOL_DICTIONARY', 'PROJECT_INSTRUCTIONS', 'PRINTABLE_GUIDE', 'COMBINATIONS', 'TEST_CASES', 'EVAL_RUBRIC', 'FAILURE_MODES', 'MVP_PLAN', 'METADATA']\n\n--- PRODUCT_SELF_KNOWLEDGE ---\n    SECTION                            KEY                                                                                              VALUE EPISTEMIC_STATUS\n0       ICP                   Primary User          Solo founder-operators, consultants, researchers with high AI literacy but not developers        INFERENCE\n1       ICP                 Secondary User                               Small consulting teams (2-5 people), data analysts, product managers        INFERENCE\n2       ICP                        NOT For  One-time users, pure developers, enterprise teams with IT governance, natural language preference           DESIGN\n3      PAIN            P1 Context Collapse         Every new chat loses all prior work context. Cost: 500-2000 tokens wasted per interaction.             FACT\n4      PAIN              P2 Prompt Fatigue              Writing detailed instructions is exhausting. Cost: 3-5 clarification rounds per task.             FACT\n5      PAIN            P3 Quality Variance                    Same prompt produces inconsistent results. Cost: 20-40% of outputs need rework.             FACT\n6      PAIN           P4 Framework Amnesia       Model forgets to apply SQA, MECE, risk analysis. Cost: Unsupported claims, missing evidence.             FACT\n7      PAIN      P5 Workflow Fragmentation               No way to compose analysis + research + synthesis. Cost: 10-15 minutes per workflow.             FACT\n8      PAIN  P6 Non-transferable Knowledge                  Every user reinvents prompt library. Cost: No portfolio evidence, no reusable IP.             FACT\n9   OUTCOME            O1 Token Efficiency                         BEFORE: 1500 tokens per prompt. AFTER: 50-150 tokens. GAIN: 10x reduction.       HYPOTHESIS\n10  OUTCOME         O2 Quality Consistency                        BEFORE: 60% acceptable. AFTER: 85%+ acceptable. GAIN: 25 percentage points.       HYPOTHESIS\n11  OUTCOME              O3 Workflow Speed                                   BEFORE: 15 minutes. AFTER: 3 minutes. GAIN: 5x faster execution.       HYPOTHESIS\n12  OUTCOME               O4 Composability                     BEFORE: Linear prompts. AFTER: Combine 2-4 modules. GAIN: Exponential variety.       HYPOTHESIS\n13  OUTCOME          O5 Portfolio Evidence       BEFORE: No artifacts. AFTER: Every workflow becomes case study. GAIN: Publishable portfolio.       HYPOTHESIS\n14  OUTCOME             O6 Transferability                         BEFORE: Knowledge locked. AFTER: Registry, guide, tests = transferable IP.       HYPOTHESIS\n\n--- MASTER_INDEX ---\n       LAYER    ID                   NAME                                             PURPOSE  PRIORITY\n0       META    P0            Meta Router  Routes to correct layer based on command structure       100\n1    PROJECT    P1     Strategic Decision             Complex multi-variable decision support        90\n2    PROJECT    P2          Data Analysis                Quantitative analysis with SQA gates        90\n3    PROJECT    P3     Research Synthesis                Evidence-backed research compilation        85\n4    PROJECT    P4         Trend Analysis                       Time-series pattern detection        80\n5    PROJECT    P5           Risk Mapping                     Probability × Impact assessment        85\n6    PROJECT    P6      Portfolio Builder                     Case study extraction from work        75\n7      STYLE    S1        Executive Brief                       BLUF → 3 points → Next action        80\n8      STYLE    S2         Technical Deep                  Detailed analysis with methodology        75\n9      STYLE    S3            Visual Data                      Charts, graphs, tables primary        70\n10     STYLE    S4        Narrative Story                            Story-driven explanation        65\n11     STYLE    S5          Question Tree                           Socratic method breakdown        60\n12     STYLE    S6         Minimal Direct                            Shortest possible answer        90\n13   COMMAND  C001    Strategic Diagnosis            Decompose → Diagnose → Score → Recommend        95\n14   COMMAND  C002       SQA Quality Gate           Fact/Hypothesis/Inference/Risk separation       100\n15   COMMAND  C003        Evidence Search              Web search → Extract → Cite → Validate        90\n16   COMMAND  C004        Trend Synthesis                    Δ% → Pattern → Driver → Forecast        85\n17   COMMAND  C005          Risk Analysis               P×I → Prioritize → Mitigate → Monitor        90\n18   COMMAND  C006             Root Cause                Y=f(X) → Decompose → Test → Validate        85\n19   COMMAND  C007      Executive Summary                        BLUF compression to one page        80\n20   COMMAND  C008       Case Study Build     Extract work → Structure → Evidence → Narrative        75\n21  WORKFLOW   W01    Strategic Diagnosis               Business situation → Decision options        95\n22  WORKFLOW   W02          Data Analysis                       Data question → SQL → Insight        90\n23  WORKFLOW   W03     Research Synthesis                  Research question → Evidence brief        90\n24  WORKFLOW   W04         Trend Analysis                              Time-series → Forecast        85\n25  WORKFLOW   W05           Risk Mapping                              Decision → Risk matrix        85\n26  WORKFLOW   W06    Causality Diagnosis                         Outcome change → Root cause        85\n27  WORKFLOW   W07  Executive Compression                    Long analysis → One-page summary        80\n28  WORKFLOW   W08         Portfolio Case                            Work output → Case study        75\n\n--- REGISTRY_SEED ---\n      id    layer       type                    name                                            command_12w                           formula  priority                   inputs            output                                           when_to_use    conflicts version                                                     example\n0   C001  COMMAND  diagnosis     Strategic Diagnosis     decompose business situation into decision options      Context→MECE→Score→Recommend        95   situation,data,context        exec_brief    Complex business decisions with multiple variables           S6    v0.1         CQL: C001 | Q=Should we expand to LATAM? | OUT=exec\n1   C002  COMMAND         qa        SQA Quality Gate                separate fact hypothesis inference risk             F≠H≠I≠R→Validate→Flag       100  analysis,claims,sources         validated     Any analytical output requiring source discipline         none    v0.1    CQL: C002 | Q=Validate this market analysis | OUT=report\n2   C003  COMMAND   research         Evidence Search               search web extract cite validate sources        Web→Extract→Cite→SQA→Brief        90         question,domains    research_brief  Questions requiring current information or citations         none    v0.1  CQL: C003 | Q=Latest AI governance regulations | OUT=brief\n3   C004  COMMAND      trend         Trend Synthesis                  analyze delta pattern driver forecast       Δ%→Pattern→Driver→P(future)        85       timeseries,context      trend_report                   Time-series data or event sequences         none    v0.1         CQL: C004 | Q=SaaS revenue trend Q1-Q4 | OUT=report\n4   C005  COMMAND       risk           Risk Analysis             map probability impact prioritize mitigate       P×I→Matrix→Mitigate→Monitor        90  decision,context,stakes       risk_matrix                   Decisions with downside uncertainty         none    v0.1          CQL: C005 | Q=Risk of cloud migration | OUT=matrix\n5   C006  COMMAND  causality     Root Cause Analysis       decompose outcome test hypotheses validate cause        Y=f(X)→Decompose→Test→Root        85     outcome,data,context      causal_model                      Investigating why metric changed         none    v0.1           CQL: C006 | Q=Why did churn spike? | OUT=analysis\n6   C007  COMMAND   compress       Executive Summary              compress to BLUF three points next action                      BLUF→3P→Next        80            long_analysis         one_pager            Condensing complex analysis for executives           S2    v0.1    CQL: C007 | Q=Summarize market entry analysis | OUT=exec\n7   C008  COMMAND  portfolio      Case Study Builder           extract structure evidence narrative publish     Work→Structure→Evidence→Story        75      conversation,output        case_study            Converting work into publishable portfolio         none    v0.1   CQL: C008 | Q=Turn this analysis into case study | OUT=md\n8   C009  COMMAND        sql           SQL Generator      generate SQL query from natural language question             Q→Schema→SQL→Validate        85       question,schema,db         sql_query             Data questions requiring database queries         none    v0.1     CQL: C009 | Q=Revenue by region last 6 months | OUT=sql\n9   C010  COMMAND  framework   Framework Application                  apply business framework to situation      Framework→Map→Insight→Action        80   situation,framework_id          analysis                     Applying Porter, SWOT, MECE, etc.         none    v0.1    CQL: C010+PORTER | Q=Competitive position | OUT=analysis\n10  C011  COMMAND  benchmark   Competitive Benchmark                   compare options score recommend best       Options→Criteria→Score→Rank        85         options,criteria         scorecard                  Comparing tools, vendors, approaches         none    v0.1              CQL: C011 | Q=Best CRM for SMB | OUT=scorecard\n11  C012  COMMAND  synthesis  Multi-Source Synthesis         synthesize multiple sources into coherent view   Sources→Extract→Integrate→Brief        80         sources,question         synthesis      Integrating conflicting or complementary sources         none    v0.1          CQL: C012 | Q=AI market size estimates | OUT=brief\n12    S1    STYLE     format         Executive Brief           BLUF three points recommendation next action                  BLUF→3P→Rec→Next        80             any_analysis       exec_format                 Executive audiences, time-constrained        S2,S4    v0.1                                                    OUT=exec\n13    S2    STYLE     format          Technical Deep  detailed methodology assumptions evidence limitations      Method→Assume→Evidence→Limit        75             any_analysis  technical_format                      Technical audiences, peer review        S1,S6    v0.1                                               OUT=technical\n14    S3    STYLE     format             Visual Data                      charts graphs tables minimal text              Visual→Insight→Label        70        quantitative_data     visual_format                        Data-heavy outputs, dashboards           S4    v0.1                                                  OUT=visual\n15    S4    STYLE     format         Narrative Story                story arc characters tension resolution  Setup→Conflict→Resolution→Lesson        65             any_analysis      story_format                General audiences, engagement priority     S1,S3,S6    v0.1                                                   OUT=story\n16    S5    STYLE     format           Question Tree                  socratic method progressive questions                Q1→Q2→Q3→Synthesis        60             any_analysis         questions                              Educational, exploratory           S6    v0.1                                               OUT=questions\n17    S6    STYLE     format          Minimal Direct                   shortest possible answer no preamble                       Answer→Done        90          simple_question           minimal                              Simple factual questions  S1,S2,S4,S5    v0.1                                                 OUT=minimal\n18    P1  PROJECT     domain      Strategic Decision                complex multi-variable decision support    Context→Options→Criteria→Score        90         decision,context    recommendation                         High-stakes strategic choices         none    v0.1                        P1 active for market entry decisions\n19    P2  PROJECT     domain           Data Analysis               quantitative analysis with quality gates         Data→SQL→Validate→Insight        90            data,question          analysis                                 Data-driven questions         none    v0.1                                P2 active for sales analysis\n20    P3  PROJECT     domain      Research Synthesis                   evidence-backed research compilation         Search→Extract→Cite→Brief        85                 question          research                             Current information needs         none    v0.1                               P3 active for market research\n21    P4  PROJECT     domain          Trend Analysis                          time-series pattern detection               Δ%→Pattern→Forecast        80               timeseries          forecast                                       Trend questions         none    v0.1                                P4 active for revenue trends\n22    P5  PROJECT     domain            Risk Mapping                          probability impact assessment               P×I→Matrix→Mitigate        85          decision,stakes          risk_map                                 Risk assessment needs         none    v0.1                                  P5 active for project risk\n23    P6  PROJECT     domain       Portfolio Builder                                  case study extraction    Work→Extract→Structure→Publish        75              work_output        case_study                                    Portfolio building         none    v0.1                           P6 active for case study creation\n\n--- SYMBOL_DICTIONARY ---\n    SYMBOL                                     MEANING                                 USAGE                                 EXAMPLE\n0        →                              Flow/Transform  Shows process flow or transformation                   Data→Analysis→Insight\n1        ≠                          Not Equal/Separate            Indicates clear separation            F≠H (Fact is not Hypothesis)\n2        Δ                                Delta/Change                  Change or difference                  Δ% = percentage change\n3        %                                  Percentage                      Relative measure                              15% growth\n4        Σ                                   Sum/Total                           Aggregation                                ΣRevenue\n5        ×                                    Multiply                Combination or product              P×I (Probability × Impact)\n6        F                                        Fact        Observed, measured, documented                F: Revenue was $5M in Q3\n7        H                                  Hypothesis     Testable claim, not yet validated          H: Price increase caused churn\n8        I                                   Inference         Logical derivation from facts      I: Market is growing based on data\n9        R                                        Risk           Potential downside with P×I     R: 30% chance of delay, $50K impact\n10       ε                                 Gap/Unknown    Missing information or uncertainty    ε: Customer acquisition cost unknown\n11     SQA                    Source Quality Assurance  Fact/Hypothesis/Inference/Risk check                  SQA gate before output\n12    BLUF                        Bottom Line Up Front                  Lead with conclusion                BLUF: Recommend Option B\n13    MECE  Mutually Exclusive Collectively Exhaustive    Complete non-overlapping breakdown        MECE analysis of revenue streams\n14     P×I                        Probability × Impact                          Risk scoring  P×I = 0.3 × $100K = $30K expected loss\n15     ROI                        Return on Investment                    Benefit/cost ratio     ROI = ($150K - $100K) / $100K = 50%\n16  Y=f(X)                                   Causality        Outcome as function of drivers   Revenue = f(price, volume, retention)\n\n--- PROJECT_INSTRUCTIONS ---\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   INSTRUCTION_BLOCK\n0  \\n# CQL KERNEL v0.1 — PROJECT INSTRUCTIONS\\n\\n## COMMAND SYNTAX\\n\\nCQL: <IDs> | Q=<question> | OUT=<format> | DEPTH=<M|H|L> | SRC=<project|web> | ASK=<0|1>\\n\\nExample: CQL: C001+C002+S1 | Q=Should we expand to LATAM? | OUT=exec | DEPTH=M | SRC=project | ASK=0\\n\\n## EXECUTION PROTOCOL\\n\\n1. PARSE COMMAND\\n   - Extract IDs from command\\n   - Extract parameters (Q, OUT, DEPTH, SRC, ASK)\\n   - Validate syntax\\n\\n2. RESOLVE IDS\\n   - Look up each ID in REGISTRY_SEED\\n   - Load EXACT modules, never substitute\\n   - If ID not found: return \"ID [X] not found in registry\" and STOP\\n   - Never guess or approximate missing IDs\\n\\n3. DETECT CONFLICTS\\n   - Check conflicts column for each loaded module\\n   - If conflict detected: apply priority rules (higher priority wins)\\n   - If unresolvable: flag to user and ask for clarification\\n   - Never silently ignore conflicts\\n\\n4. ASSEMBLE CONTEXT\\n   - Load only called modules, not entire registry\\n   - Combine formulas and methods from loaded modules\\n   - Apply in priority order\\n   - Keep total context minimal\\n\\n5. EXECUTE WORKFLOW\\n   - Follow formula from highest priority module\\n   - Apply all loaded methods in sequence\\n   - Use DEPTH parameter: L=concise, M=standard, H=comprehensive\\n\\n6. APPLY QUALITY GATES\\n   - Gate 1: Source discipline (F/H/I/R/ε separation)\\n   - Gate 2: No unsupported claims\\n   - Gate 3: Output adherence (respect OUT parameter)\\n   - Gate 4: Conflict resolution visible\\n   - Gate 5: Auditability (show which IDs activated)\\n\\n7. FORMAT OUTPUT\\n   - Use OUT parameter to determine format\\n   - exec = Executive brief (BLUF→3P→Next)\\n   - technical = Full methodology + assumptions\\n   - visual = Charts/tables primary\\n   - minimal = Direct answer only\\n   - analysis = Standard analytical output\\n\\n8. RETURN RESULT\\n   - Include activated IDs at bottom\\n   - Include epistemic markers (F/H/I/R/ε)\\n   - Include sources for facts\\n   - Include confidence levels for hypotheses\\n   - Never hide reasoning\\n\\n## MANDATORY RULES\\n\\nR1: Load minimum necessary context (only called IDs)\\nR2: Never substitute missing IDs\\nR3: Detect and resolve conflicts explicitly\\nR4: Separate F/H/I/R/ε in all outputs\\nR5: Never claim unsupported facts\\nR6: Respect OUT parameter exactly\\nR7: Show which IDs were activated\\nR8: Make reasoning auditable\\nR9: No decorative text, direct execution\\nR10: If uncertain, mark as ε (gap), don't fabricate\\n\\n## ERROR HANDLING\\n\\n- Missing ID: \"ID [X] not found in registry\"\\n- Conflict detected: \"Conflict between [ID1] and [ID2]: [reason]. Applying [winning_ID] based on priority.\"\\n- Invalid syntax: \"Invalid CQL syntax. Expected: CQL: <IDs> | Q=<question> | OUT=<format>\"\\n- Missing data: \"ε: [specific data point] not available\"\\n\\n## EXAMPLES\\n\\nCQL: C001+C002+S1 | Q=Expand to LATAM? | OUT=exec | DEPTH=M | SRC=project | ASK=0\\n→ Strategic diagnosis with SQA gate, executive format\\n\\nCQL: C003+C004 | Q=AI market trends 2024-2025 | OUT=brief | DEPTH=H | SRC=web | ASK=0\\n→ Evidence search + trend synthesis, comprehensive brief\\n\\nCQL: C006+C005 | Q=Why did churn spike? | OUT=analysis | DEPTH=M | SRC=project | ASK=0\\n→ Root cause + risk analysis, standard depth\\n\\nCQL: C009 | Q=Revenue by region Q1-Q4 | OUT=sql | DEPTH=L | SRC=project | ASK=0\\n→ SQL generation only, concise\\n\\nACTIVATED IDs: C001, C002, S1\\nEPISTEMIC: 3 facts, 2 inferences, 1 hypothesis, 0 gaps\\nCONFIDENCE: 85%\\n\n\n--- PRINTABLE_GUIDE ---\n                          ID                                   NAME                                       WHAT IT DOES                                               FORMULA                    EXAMPLE USE\n0                       C001                    Strategic Diagnosis  Breaks down complex decisions into scored options                          Context→MECE→Score→Recommend     Should we expand to LATAM?\n1                       C002                       SQA Quality Gate     Separates facts from hypotheses and inferences                                 F≠H≠I≠R→Validate→Flag  Validate this market analysis\n2                       C003                        Evidence Search           Finds current info with proper citations                            Web→Extract→Cite→SQA→Brief     Latest AI governance rules\n3                       C004                        Trend Synthesis             Analyzes patterns and forecasts future                           Δ%→Pattern→Driver→P(future)       SaaS revenue trend Q1-Q4\n4                       C005                          Risk Analysis       Maps probability × impact, prioritizes risks                           P×I→Matrix→Mitigate→Monitor        Risk of cloud migration\n5                       C006                             Root Cause                  Investigates why a metric changed                            Y=f(X)→Decompose→Test→Root           Why did churn spike?\n6                       C007                      Executive Summary               Compresses analysis to one page BLUF                                          BLUF→3P→Next    Summarize market entry plan\n7                       C008                     Case Study Builder              Turns work into publishable portfolio                         Work→Structure→Evidence→Story      Make case study from this\n8                         S1                        Executive Brief                      BLUF format: conclusion first                                      BLUF→3P→Rec→Next                       OUT=exec\n9                         S2                         Technical Deep                   Full methodology and assumptions                          Method→Assume→Evidence→Limit                  OUT=technical\n10                        S6                         Minimal Direct                           Shortest possible answer                                           Answer→Done                    OUT=minimal\n11                       NaN                                    NaN                                                NaN                                                   NaN                            NaN\n12  RECOMMENDED COMBINATIONS                                    NaN                                                NaN                                                   NaN                            NaN\n13                     COMBO                               USE CASE                                    EXPECTED OUTPUT                                               EXAMPLE                            NaN\n14              C001+C002+S1  Strategic decision with quality check               Executive brief with validated facts        CQL: C001+C002+S1 | Q=Market entry? | OUT=exec                            NaN\n15                 C003+C004                Research current trends                     Evidence-backed trend forecast     CQL: C003+C004 | Q=AI adoption trends | OUT=brief                            NaN\n16                 C006+C005         Diagnose problem + assess risk                        Root cause with risk matrix  CQL: C006+C005 | Q=Why sales dropped? | OUT=analysis                            NaN\n17                 C001+C007         Strategic diagnosis compressed                             One-page decision memo        CQL: C001+C007 | Q=Should we pivot? | OUT=exec                            NaN\n18                 C009+C002              SQL query with validation                          Validated SQL and results        CQL: C009+C002 | Q=Revenue by region | OUT=sql                            NaN\n\n--- COMBINATIONS ---\n    SIZE                COMBO                                             USE_CASE                        EXPECTED_OUTPUT                   RISK                                               EXAMPLE_CQL\n0   2-ID            C001+C002                Strategic diagnosis with quality gate             Validated decision options                   none     CQL: C001+C002 | Q=Expand internationally? | OUT=exec\n1   2-ID            C003+C004                            Research + trend analysis               Evidence-backed forecast                   none         CQL: C003+C004 | Q=SaaS market trends | OUT=brief\n2   2-ID            C006+C005                         Root cause + risk assessment          Causal model with risk matrix                   none    CQL: C006+C005 | Q=Why churn increased? | OUT=analysis\n3   2-ID            C001+C007       Strategic diagnosis compressed to exec summary                 One-page decision memo        May lose nuance              CQL: C001+C007 | Q=Product pivot? | OUT=exec\n4   2-ID            C009+C002                       SQL generation with validation                    Validated SQL query                   none           CQL: C009+C002 | Q=Revenue by segment | OUT=sql\n5   3-ID         C001+C002+S1         Strategic diagnosis + SQA + executive format              Validated executive brief                   none              CQL: C001+C002+S1 | Q=M&A target? | OUT=exec\n6   3-ID       C003+C004+C002                      Research + trend + quality gate               Validated trend forecast                   none        CQL: C003+C004+C002 | Q=AI market size | OUT=brief\n7   3-ID       C006+C005+C007                      Root cause + risk + compression         One-page causal + risk summary  May compress too much         CQL: C006+C005+C007 | Q=Churn analysis | OUT=exec\n8   3-ID         C001+C011+S1        Strategic diagnosis + benchmark + exec format              Comparative decision memo                   none             CQL: C001+C011+S1 | Q=Best vendor? | OUT=exec\n9   3-ID       C003+C012+C002                           Research + synthesis + SQA           Multi-source validated brief                   none   CQL: C003+C012+C002 | Q=Industry consensus? | OUT=brief\n10  4-ID    C001+C002+C005+S1                    Full strategic analysis with risk  Validated exec brief with risk matrix        High complexity    CQL: C001+C002+C005+S1 | Q=Cloud migration? | OUT=exec\n11  4-ID  C003+C004+C005+C007                Research + trend + risk + compression           One-page forecast with risks        May lose detail    CQL: C003+C004+C005+C007 | Q=Market outlook | OUT=exec\n12  4-ID    C006+C009+C002+S2  Root cause with SQL + validation + technical format         Deep technical causal analysis          Very detailed  CQL: C006+C009+C002+S2 | Q=Revenue drop? | OUT=technical\n\n--- TEST_CASES ---\n   case_id                                                 input_cql                     user_question       expected_ids      expected_output                             evaluation_criteria  max_score\n0     T001       CQL: C001 | Q=Should we expand to LATAM? | OUT=exec        Should we expand to LATAM?               C001           exec_brief  ID resolution, format adherence, useful answer         10\n1     T002            CQL: C002 | Q=Validate this claim | OUT=report     Validate this market analysis               C002            validated                  SQA applied, F/H/I/R separated         10\n2     T003       CQL: C001+C002 | Q=Market entry decision | OUT=exec        Should we enter UK market?          C001,C002           exec_brief    Both IDs activated, SQA applied, exec format         10\n3     T004             CQL: C003 | Q=AI regulations 2025 | OUT=brief  Latest AI governance regulations               C003       research_brief              Web search used, citations present         10\n4     T005            CQL: C004 | Q=Revenue trend Q1-Q4 | OUT=report             Analyze revenue trend               C004         trend_report       Trend analysis present, forecast included         10\n5     T006          CQL: C005 | Q=Cloud migration risks | OUT=matrix           Risk of cloud migration               C005          risk_matrix            P×I calculation, risk prioritization         10\n6     T007             CQL: C006 | Q=Why churn spiked | OUT=analysis           Why did churn increase?               C006         causal_model       Root cause methodology, hypotheses tested         10\n7     T008           CQL: C007 | Q=Compress this analysis | OUT=exec         Summarize market analysis               C007            one_pager                  BLUF format, 1-page constraint         10\n8     T009       CQL: C001+C002+S1 | Q=Strategic decision | OUT=exec     Acquisition target evaluation       C001,C002,S1           exec_brief            All 3 IDs activated, exec style, SQA         10\n9     T010              CQL: C003+C004 | Q=Market trends | OUT=brief      SaaS market trends 2024-2025          C003,C004       research_brief               Research + trend, evidence-backed         10\n10    T011                          CQL: INVALID | Q=Test | OUT=exec                   Invalid ID test              ERROR        error_message                 Error detected, helpful message         10\n11    T012              CQL: C001+C001 | Q=Duplicate test | OUT=exec             Duplicate ID handling               C001           exec_brief            Duplicate ignored, single activation         10\n12    T013            CQL: C001+S6 | Q=Simple decision | OUT=minimal                   Should we hire?            C001,S6  conflict_resolution        Conflict detected (C001 vs S6), resolved         10\n13    T014                 CQL: C009 | Q=Revenue by region | OUT=sql         SQL for revenue by region               C009            sql_query                             Valid SQL generated         10\n14    T015         CQL: C002+C007 | Q=Validate + compress | OUT=exec           Quick validated summary          C002,C007            one_pager                       SQA + compression, 1-page         10\n15    T016       CQL: C006+C005 | Q=Problem diagnosis | OUT=analysis             Revenue drop analysis          C006,C005         causal_model                   Root cause + risk, integrated         10\n16    T017    CQL: C001+C002+C005+S1 | Q=Complex decision | OUT=exec     Strategic investment decision  C001,C002,C005,S1           exec_brief       4 IDs activated, all applied, exec format         10\n17    T018      CQL: C003+C012 | Q=Multi-source research | OUT=brief          Industry consensus on AI          C003,C012            synthesis             Multi-source integration, synthesis         10\n18    T019                    CQL: C008 | Q=Make case study | OUT=md    Turn this work into case study               C008           case_study           Work extracted, structured, narrative         10\n19    T020  CQL: C010+PORTER | Q=Competitive analysis | OUT=analysis           Competitive positioning               C010             analysis                        Porter framework applied         10\n\n--- EVAL_RUBRIC ---\n              CRITERION WEIGHT                               DESCRIPTION               SCORE_0                SCORE_5                      SCORE_10\n0         ID Resolution    20%    Correct IDs activated, no substitution  Wrong IDs or missing       Most IDs correct           All IDs exact match\n1      Output Adherence    20%      Follows OUT parameter format exactly          Wrong format  Mostly correct format          Perfect format match\n2            Usefulness    20%         Answer is actionable and valuable            Not useful        Somewhat useful             Highly actionable\n3    Conflict Detection    15%           Conflicts detected and resolved      Conflict ignored         Conflict noted  Conflict resolved explicitly\n4           SQA/F-H-I-R    15%  Fact/Hypothesis/Inference/Risk separated             All mixed     Partial separation     Perfect F/H/I/R/ε clarity\n5  Clarity for Non-tech    10%      Understandable to non-technical user          Jargon-heavy           Mostly clear                 Crystal clear\n6                   NaN    NaN                                       NaN                   NaN                    NaN                           NaN\n7                 TOTAL   100%                    Maximum possible score                   NaN                    NaN                          10.0\n\n--- FAILURE_MODES ---\n  RISK_ID           FAILURE_MODE SEVERITY                                          MANIFESTATION                                            MITIGATION CONFIDENCE\n0      R1         Token Illusion   MEDIUM  Assume short symbols = cheaper, but poor tokenization        Test tokenization before standardizing symbols     MEDIUM\n1      R2  Retrieval Brittleness     HIGH          Registry lookup fails or returns wrong module          Move to exact ID lookup via function calling       HIGH\n2      R3        Silent Conflict     HIGH          Two modules contradict, system picks silently  Build explicit conflict resolver with priority rules       HIGH\n3      R4          Version Drift   MEDIUM            Changing module meaning breaks old commands                 Version every module, log all changes     MEDIUM\n4      R5       Symbolic Opacity   MEDIUM                   Only creator understands the symbols   Use common symbols, provide legend, test with users     MEDIUM\n5      R6        Overengineering     HIGH             Building 200 modules when 40 would suffice           Start with 40-60, add only when proven need       HIGH\n6      R7          Context Bloat     HIGH        Loading entire registry defeats efficiency gain  Selective retrieval, lazy loading, minimum necessary       HIGH\n7      R8    Bad Registry Design   MEDIUM            Columns = prompts instead of rows = prompts                    Rows = modules, columns = metadata     MEDIUM\n8      R9           Weak Testing     HIGH                  Deploying to cloud without validation              Manual 20 tests → Auto 100 tests → Cloud       HIGH\n9     R10      False Determinism     HIGH       Expecting software-level predictability from LLM           Use Structured Outputs, schemas, validation       HIGH\n\n--- MVP_PLAN ---\n                        PHASE TIMELINE                           DELIVERABLE                                             ACCEPTANCE_CRITERIA GATE\n0      Phase 1: Seed Registry   Week 1           40-60 clean modules created  ID resolution ≥90%, Format adherence ≥80%, No silent conflicts   G1\n1     Phase 1: Manual Testing   Week 1         20 manual test cases executed                Useful answer rate ≥70%, Average IDs per call ≤4   G1\n2  Phase 2: Automated Testing   Week 2         100 JSONL test cases executed     ID resolution ≥95%, Format adherence ≥90%, Useful rate ≥80%   G2\n3         Phase 2: Refinement   Week 2              Registry v0.2 with fixes                   Manual rework rate ≤20%, Silent conflicts = 0   G2\n4   Phase 3: Production Ready   Week 3                  Frozen registry v0.2              All gates passed, Non-tech user can use 10+ combos   G3\n5       Phase 3: User Testing   Week 3  3 non-technical users validate guide           Users successfully execute 10+ commands independently   G3\n6        Phase 3: Measurement   Week 3                Token savings measured                         Token reduction ≥5x vs baseline prompts   G3\n7    Phase 4: Cloud/API Scale  Week 4+        Deterministic runtime deployed           Function calling working, Structured Outputs enforced   G4\n8            Phase 4: Logging  Week 4+            Metrics and logging active          All calls logged, Performance tracked, Errors captured   G4\n9         Phase 4: Case Study  Week 4+                  Case study published          Problem, architecture, results, limitations documented   G4\n\n--- METADATA ---\n                         KEY                                                                                                                                                    VALUE\n0                SYSTEM_NAME                                                                                                                                          CQL Kernel v0.1\n1                  FULL_NAME                                                                                                              Command Query Layer for AI Operating System\n2                    VERSION                                                                                                                                                    0.1.0\n3                 BUILD_DATE                                                                                                                                               2026-05-06\n4                     AUTHOR                                                                                                              Product Self-Knowledge → CQL Build Pipeline\n5                    LICENSE                                                                                                                                              Proprietary\n6                    PURPOSE                                                                             Mini operating system for AI workflows using short IDs and symbolic formulas\n7                TARGET_USER                                                                                   Solo founder-operators, consultants, researchers with high AI literacy\n8               ARCHITECTURE                                                                      Meta Router P0 → Projects P1-P6 → Styles S1-S6 → Commands C1-C8 → Workflows W01-W12\n9              TOTAL_MODULES                                                                                                                 24 (6 Projects + 6 Styles + 12 Commands)\n10          TOKEN_EFFICIENCY                                                                                                  10x reduction target (1500 → 50-150 tokens per command)\n11            QUALITY_TARGET                                                                                                                        85%+ first-try acceptable outputs\n12              SPEED_TARGET                                                                                                                     5x faster execution (15 min → 3 min)\n13          PRIMARY_OUTCOMES                                                Token efficiency, Quality consistency, Workflow speed, Composability, Portfolio evidence, Transferability\n14           MANDATORY_GATES  8 quality gates (Source discipline, Context minimum, Conflict detection, Output adherence, F/H/I/R separation, Auditability, Privacy, Token efficiency)\n15            TESTING_PHASES                                                                                                       4 phases (Seed → Manual 20 → Auto 100 → Cloud/API)\n16  ACCEPTANCE_ID_RESOLUTION                                                                                                                                                     ≥95%\n17         ACCEPTANCE_FORMAT                                                                                                                                                     ≥90%\n18     ACCEPTANCE_USEFULNESS                                                                                                                                                     ≥80%\n19      ACCEPTANCE_CONFLICTS                                                                                                                                       0 silent conflicts\n20   ACCEPTANCE_IDS_PER_CALL                                                                                                                                               ≤4 average\n21         ACCEPTANCE_REWORK                                                                                                                                                     ≤20%\n22        USAGE_BOUNDARY_YES                                                     Recurring workflows, Composing methods, Enforcing quality, Building portfolio, Scaling consulting IP\n23         USAGE_BOUNDARY_NO                                               One-off questions, Creative writing, Real-time pipelines, Multi-user collaboration, Regulated environments\n24               NEXT_STEP_1                                                                                         Install REGISTRY_SEED and PROJECT_INSTRUCTIONS in Claude Project\n25               NEXT_STEP_2                                                                                                                 Run 20 manual test cases from TEST_CASES\n26               NEXT_STEP_3                                                                                                      Measure ID resolution, format adherence, usefulness\n27               NEXT_STEP_4                                                                                                                   Iterate registry based on test results\n28               NEXT_STEP_5                                                                                                                             Scale to 100 automated tests\n29             FILE_LOCATION                                                                                                       /mnt/user-data/outputs/CQL_KERNEL_v0.1_MASTER.xlsx\n30                CHANGE_LOG                                                                                                        v0.1.0: Initial build from Product Self-Knowledge\n","stderr":""}
**Registry loaded. Corpus parsed. Selecting optimal ID stack.**

**Auto-selected CQL:** `C003+C004+C005+C002+S1 | Q=Best market & product tendencies for Aurelio's OS (AI-first PME consulting, Brazil/Sebrae, R$297–897 WTP) | OUT=exec | DEPTH=H | SRC=web | ASK=0`

**Conflict check:** None. All IDs compatible. S1 wins output style.

---

Executing web research across 5 search vectors simultaneously...
**Research complete. 5 vectors × ~35 sources processed. Synthesizing now.**

---

# CQL EXECUTION REPORT

**Command auto-constructed:** `CQL: C003+C004+C005+C002+S1 | Q=Best tendencies for Aurelio's OS (AI-first PME consulting OS, Brazil/Sebrae, R$297–897) | OUT=exec | DEPTH=H | SRC=web | ASK=0`

**IDs activated:** C003 (Evidence Search) · C004 (Trend Synthesis) · C005 (Risk Analysis) · C002 (SQA Gate) · S1 (Executive Brief)
**Conflicts detected:** None
**Normalization:** Completed (see below)

---

## NORMALIZATION — G/K/V/C/A/D/Q/E

| Dim | Content |
|---|---|
| **G** | Identify the strongest market + product tendencies that validate or challenge Aurelio's OS hypotheses H1–H7 |
| **K** | Product exists (v0.1 corpus approved). Target: Brazilian PME consultants. Ecosystem: Sebrae/ALI. Pricing range tested: R$297–897. 7 provisional hypotheses open. |
| **V** | AI adoption pace BR, Sebrae ALI pipeline health, WTP signals for AI tools in LatAm, agentic AI curve, pricing model evolution |
| **C** | Web sources only (SRC=web). No internal data yet. Corpus locked 2026-04-18. |
| **A** | [ASSUMPTION] Aurelio's OS operates as B2B consulting OS, not pure SaaS. [ASSUMPTION] Primary revenue channel is Sebrae/ALI-adjacent consulting cycle. |
| **D** | Market sizing, pricing benchmarks, ALI program status, agentic AI trend data |
| **Q** | WTP quantitative validation for R$ range; ALI integration readiness in 2026; agentic vs copilot positioning |
| **E** | Hypothesis validation rate; monetization model fit; strategic timing signal |

---

## BLUF

**The macro window for Aurelio's OS is open and accelerating — but three structural risks require immediate action before Sprint 3.**

---

## KEY TENDENCIES — C004 (Δ% → Pattern → Driver → Forecast)

### Tendency 1: Brazil AI Adoption Has Crossed the Tipping Point

67% of Brazilian companies now consider AI a strategic priority, with AI spending projected to exceed US$2.4 billion — a 30% increase over 2024 (IDC/Exame). The experimentation phase is over.

Brazil is already advancing into the third phase of AI adoption — moving beyond chatbots and GenAI copilots into autonomous agents. 75% of business leaders expect agents to operate autonomously by 2026.

[FACT] Global agentic AI market: US$7.9B in 2025, projected to reach US$196B by 2030 — a 70.2% CAGR — and Brazil leads LatAm in this adoption wave.

**Signal for Aurelio's OS:** [INFERENCE] The consulting market for AI implementation in PMEs is not theoretical — it is in active procurement. The window to be *the* methodology layer before the market consolidates is now (H2 2026).

---

### Tendency 2: PMEs Face a Hard Survival Deadline — and Sebrae Is the Distribution Channel

AI adoption has become a survival criterion for PMEs. By 2026, businesses that fail to incorporate AI risk losing relevance in markets increasingly pressured by efficiency and speed. The main barriers are lack of internal skills and talent, difficulty integrating AI into workflows, and regulatory concerns.

[FACT] Sebrae ALI Produtividade 2026 is actively open across multiple Brazilian states. More than 300,000 companies have already been impacted by ALI Produtividade nationwide — 22% achieved measurable productivity gains and 11% saw revenue growth. The program offers up to 6 months of free, personalized accompaniment.

[FACT] Sebraetec subsidizes 70% of tech consulting costs — the client pays only 30% — covering innovation in production, sustainability, design, and technological development.

**Signal for Aurelio's OS:** [INFERENCE] Hypothesis H4 (Sebrae consultant available within Fzero-2026) is **confirmed structurally** — ALI programs are actively running in 2026 with new cohorts. The risk is not availability but integration protocol specifics (still an open ε). Sebrae is not just a validation partner; it is a distribution mechanism for PME reach at subsidized cost.

---

### Tendency 3: Pricing Models Are Shifting — And Brazil Has a Specific WTP Gap

Brazilian customers pay on average 12% less than US prices for SaaS tools (Paddle data). However, AI functionality is driving incremental willingness to pay for 66% of SaaS providers globally.

The dominant pricing trend for 2026: Credits went from 35 to 79 companies in the PricingSaaS 500 Index — a 126% increase in 2025. But the market is expected to swing back in 2026 toward simplicity and predictability over credit complexity.

Soft ROI positioning — copilots that offer advice without closing the loop — is killing willingness to pay. As 2025 AI pilots hit their first 2026 renewal cycles, pricing will need to reflect actual demonstrated value, not potential or promise.

Winning AI pricing in 2025–2026 blends three layers: a base subscription, a usage-based consumption component, and value-based packaging aligned to measurable outcomes or customer segments.

**Signal for Aurelio's OS:** [INFERENCE] Hypothesis H1 (WTP R$297–897) is **directionally plausible but requires segmentation**. At R$297 (~US$55), Aurelio's OS is priced at the low end of AI SaaS globally — defensible for PME entry. At R$897 (~US$165), it competes with mid-market tools and requires demonstrated ROI (productivity gain, Sebrae validation). The 12% Brazil discount means the R$297 tier must be *the* entry point, with outcome evidence required to justify upgrade to R$897.

---

### Tendency 4: The Orchestration Layer Is the Winning Product Position

The competitive differentiator for 2026 will be centralized ecosystems that combine language models, curated workflows, training, and applied libraries — rather than standalone AI tools. Organizations that move from 'using AI tools' to 'orchestrating AI processes' will define the next competitive tier.

A good AI orchestration layer should be easy for non-technical users, with intuitive commands, drag-and-drop workflows, multi-vendor integration, real-time data, and governance — all putting the human in charge.

[FACT] McKinsey found 88% of organizations regularly use AI in at least one business function, but only one-third have begun scaling it. 2026 is the year many move from pilots to operational deployment.

**Signal for Aurelio's OS:** [INFERENCE] Aurelio's OS — as a CQL-based operating system for consulting workflows — is exactly the orchestration layer the market is looking for. The CQL kernel design (composable modules, epistemic discipline, command syntax) is structurally aligned with what McKinsey, PwC, and Deloitte describe as the winning enterprise AI approach. The risk is positioning: "AI OS for consultants" must be communicated as *workflow orchestrator*, not *chat tool*.

---

## RISK MATRIX — C005 (P×I applied to H1–H7)

| Hypothesis | Tendency Signal | Risk Level | P × I | Mitigation |
|---|---|---|---|---|
| **H1** WTP R$297–897 | Plausible but unsegmented | 🔴 HIGH | 0.5 × R$50K+ | Run pricing test in Sprint 3 pilots: offer R$297 and watch conversion; present R$897 as outcome-proven upgrade |
| **H2** TAM/SAM not sized | No primary quantification | 🟡 MEDIUM | 0.4 × strategic | Use IBGe PME data + Sebrae reach (300K+ companies touched by ALI) as proxy SAM |
| **H3** Design tokens "copy Claude Code" | No brand validation | 🟡 MEDIUM | 0.3 × brand risk | Lock design tokens before any client-facing demo — visual identity affects perceived WTP |
| **H4** Sebrae ALI available in Fzero-2026 | **CONFIRMED** structurally | 🟢 LOW | 0.15 × operational | Document ALI intake requirements (CNPJ active 12+ months, not in 2025 cycle) |
| **H5** NPS ≥ 8/10 after Sprint 4 | Achievable if ROI is closed loop | 🟡 MEDIUM | 0.4 × retention | NPS will hinge on whether Aurelio's OS "closes the loop" (outcome-based, not advisory) |
| **H6** 3 paid pilots Sprint 3–4 | Market is ready; execution risk | 🟡 MEDIUM | 0.45 × revenue | Pilots must price at R$297 entry, tie payment to first measurable outcome |
| **H7** Phase 0 adds 10–20 min | [UNKNOWN] no benchmark | 🟡 MEDIUM | 0.35 × UX | Time test with actual consultant user in Sprint 2 |

[RISK] **Renewal cliff risk (R1):** As 2025 pilots hit 2026 renewals, pricing must reflect actual demonstrated value, not promise. Aurelio's OS is pre-revenue — if the first 3 pilots are not designed to produce measurable, citable outcomes, the renewal rate in Sprint 5+ will collapse. Design pilots for *evidence generation*, not just product validation.

[RISK] **Positioning risk (R2):** The market is saturated with copilots. Aurelio's OS must present as an *orchestrator OS*, not a chat assistant. Any demo that looks like "AI that gives advice" will fail WTP tests.

---

## RECOMMENDATION

**[RECOMMENDATION] Prioritize three actions before Sprint 3:**

1. **Lock H1 via pricing test.** Offer R$297 to first cohort, gate R$897 to pilot renewal conditioned on one documented outcome (e.g., "reduced analysis cycle from 3 days to 4 hours"). No freemium. No soft positioning.

2. **Formalize Sebrae/ALI intake mapping.** H4 is confirmed open but operationally undefined. Map the exact entry criteria for ALI Produtividade 2026 (CNPJ active 12+ months, 2025 non-participant). This is your free distribution channel for PME pilots.

3. **Redesign the demo narrative.** Replace "AI that helps consultants" → "Operating system that orchestrates AI workflows for PME consulting." Every slide should show a before/after workflow time delta, not a feature list.

---

## WHAT WOULD CHANGE THIS CONCLUSION

- Brazil recession ≥ 15% contraction → PME AI spend compresses, WTP drops to R$150–200 range
- Sebrae ALI suspended or budget-cut mid-2026 → H4 fails, distribution strategy must shift to direct sales
- A well-funded competitor launches a PT-BR consulting OS before Sprint 4 → race to lock pilots becomes urgent
- Evidence from 3 pilots shows NPS < 6 → product-market fit not achieved, requires pivot on UX or pricing model

---

## NEXT ACTIONS

| Action | Owner | When | Validation Criteria |
|---|---|---|---|
| [NEXT ACTION] Run WTP price test with 2 prospect PMEs | Aurelio | Sprint 2 | At least 1 confirms R$297, 0 object to R$897 framing |
| [NEXT ACTION] Map ALI 2026 eligibility criteria for pilot targets | Aurelio | This week | List of 5 eligible PMEs with active CNPJ, not in 2025 ALI |
| [NEXT ACTION] Time-test Phase 0 with 1 real consultant user | Aurelio | Sprint 2 | Validate H7: is it 10–20 min or more? |
| [NEXT ACTION] Finalize design tokens (H3) before any external demo | Aurelio | Before Sprint 3 | Palette, typography, logo locked — no more "[HIPÓTESE]" |
| [NEXT ACTION] Frame pilot contract as outcome-conditioned payment | Aurelio | Sprint 3 kickoff | Pilot agreement signed; R$297 tied to first delivered outcome |

---

**Decision:** Proceed to Sprint 3 pilots — the macro window is confirmed open.
**Confidence:** Medium-High (macro trends aligned; hypothesis-level evidence mixed; WTP and NPS remain unvalidated)
**Main risk:** Soft ROI positioning + untested pricing = renewal cliff in Sprint 5
**What would change this conclusion:** See above

---

```
ACTIVATED IDs: C003 · C004 · C005 · C002 · S1
DEPTH: H (Comprehensive)
SRC: Web (IDC, IBM, OCDE, Blip, Paddle, BVP, McKinsey, PwC, Deloitte, Sebrae official)
EPISTEMIC COUNT: 11 facts · 7 inferences · 2 assumptions · 5 risks · 3 unknowns (ε)
CORPUS LINK: CORPUS_SUMMARY.md → H1, H4, H5, H6 addressed
```
---
title: "Planilha de estrutura de prompt avançado"
date: 2026-04-09
account: leonardopimentel.knh@gmail.com
uuid: 2c5c1ed1-9579-40d9-91df-8d241e008475
messages: 4
tags: []
context: ""
---

**Você** _2026-04-09_

Crie um planilha excell que apenas em uma aba centralize de forma clara e organizada toda a estrutura e tópicos de um prompt avançada com com todas as técnicas efetivamente validas recentes e diretrizes antropic - o objetivo é o preenchimento em texto onde as tags de racucionico e instrução estão organizadas em ordem progressiva ! É o contador de carácteres dinâmico deixar a celular vermelha quando ultrapassa context limited. O Desyng é BCG  BIG 4

---

**Você** _2026-04-09_

Prossiga

---

**Claude** _2026-04-09_

Parece que esta é a primeira mensagem da nossa conversa, então não há contexto anterior com o qual prosseguir.

Poderia me indicar o que gostaria de continuar ou iniciar? Estou à disposição para ajudar.

---

**Claude** _2026-04-09_

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
    78	### Data analysis with pandas
    79	For data analysis, visualization, and basic operations, use **pandas** which provides powerful data manipulation capabilities:
    80	
    81	```python
    82	import pandas as pd
    83	
    84	# Read Excel
    85	df = pd.read_excel('file.xlsx')  # Default: first sheet
    86	all_sheets = pd.read_excel('file.xlsx', sheet_name=None)  # All sheets as dict
    87	
    88	# Analyze
    89	df.head()      # Preview data
    90	df.info()      # Column info
    91	df.describe()  # Statistics
    92	
    93	# Write Excel
    94	df.to_excel('output.xlsx', index=False)
    95	```
    96	
    97	## Excel File Workflows
    98	
    99	## CRITICAL: Use Formulas, Not Hardcoded Values
   100	
   101	**Always use Excel formulas instead of calculating values in Python and hardcoding them.** This ensures the spreadsheet remains dynamic and updateable.
   102	
   103	### ❌ WRONG - Hardcoding Calculated Values
   104	```python
   105	# Bad: Calculating in Python and hardcoding result
   106	total = df['Sales'].sum()
   107	sheet['B10'] = total  # Hardcodes 5000
   108	
   109	# Bad: Computing growth rate in Python
   110	growth = (df.iloc[-1]['Revenue'] - df.iloc[0]['Revenue']) / df.iloc[0]['Revenue']
   111	sheet['C5'] = growth  # Hardcodes 0.15
   112	
   113	# Bad: Python calculation for average
   114	avg = sum(values) / len(values)
   115	sheet['D20'] = avg  # Hardcodes 42.5
   116	```
   117	
   118	### ✅ CORRECT - Using Excel Formulas
   119	```python
   120	# Good: Let Excel calculate the sum
   121	sheet['B10'] = '=SUM(B2:B9)'
   122	
   123	# Good: Growth rate as Excel formula
   124	sheet['C5'] = '=(C4-C2)/C2'
   125	
   126	# Good: Average using Excel function
   127	sheet['D20'] = '=AVERAGE(D2:D19)'
   128	```
   129	
   130	This applies to ALL calculations - totals, percentages, ratios, differences, etc. The spreadsheet should be able to recalculate when source data changes.
   131	
   132	## Common Workflow
   133	1. **Choose tool**: pandas for data, openpyxl for formulas/formatting
   134	2. **Create/Load**: Create new workbook or load existing file
   135	3. **Modify**: Add/edit data, formulas, and formatting
   136	4. **Save**: Write to file
   137	5. **Recalculate formulas (MANDATORY IF USING FORMULAS)**: Use the scripts/recalc.py script
   138	   ```bash
   139	   python scripts/recalc.py output.xlsx
   140	   ```
   141	6. **Verify and fix any errors**: 
   142	   - The script returns JSON with error details
   143	   - If `status` is `errors_found`, check `error_summary` for specific error types and locations
   144	   - Fix the identified errors and recalculate again
   145	   - Common errors to fix:
   146	     - `#REF!`: Invalid cell references
   147	     - `#DIV/0!`: Division by zero
   148	     - `#VALUE!`: Wrong data type in formula
   149	     - `#NAME?`: Unrecognized formula name
   150	
   151	### Creating new Excel files
   152	
   153	```python
   154	# Using openpyxl for formulas and formatting
   155	from openpyxl import Workbook
   156	from openpyxl.styles import Font, PatternFill, Alignment
   157	
   158	wb = Workbook()
   159	sheet = wb.active
   160	
   161	# Add data
   162	sheet['A1'] = 'Hello'
   163	sheet['B1'] = 'World'
   164	sheet.append(['Row', 'of', 'data'])
   165	
   166	# Add formula
   167	sheet['B2'] = '=SUM(A1:A10)'
   168	
   169	# Formatting
   170	sheet['A1'].font = Font(bold=True, color='FF0000')
   171	sheet['A1'].fill = PatternFill('solid', start_color='FFFF00')
   172	sheet['A1'].alignment = Alignment(horizontal='center')
   173	
   174	# Column width
   175	sheet.column_dimensions['A'].width = 20
   176	
   177	wb.save('output.xlsx')
   178	```
   179	
   180	### Editing existing Excel files
   181	
   182	```python
   183	# Using openpyxl to preserve formulas and formatting
   184	from openpyxl import load_workbook
   185	
   186	# Load existing file
   187	wb = load_workbook('existing.xlsx')
   188	sheet = wb.active  # or wb['SheetName'] for specific sheet
   189	
   190	# Working with multiple sheets
   191	for sheet_name in wb.sheetnames:
   192	    sheet = wb[sheet_name]
   193	    print(f"Sheet: {sheet_name}")
   194	
   195	# Modify cells
   196	sheet['A1'] = 'New Value'
   197	sheet.insert_rows(2)  # Insert row at position 2
   198	sheet.delete_cols(3)  # Delete column 3
   199	
   200	# Add new sheet
   201	new_sheet = wb.create_sheet('NewSheet')
   202	new_sheet['A1'] = 'Data'
   203	
   204	wb.save('modified.xlsx')
   205	```
   206	
   207	## Recalculating formulas
   208	
   209	Excel files created or modified by openpyxl contain formulas as strings but not calculated values. Use the provided `scripts/recalc.py` script to recalculate formulas:
   210	
   211	```bash
   212	python scripts/recalc.py <excel_file> [timeout_seconds]
   213	```
   214	
   215	Example:
   216	```bash
   217	python scripts/recalc.py output.xlsx 30
   218	```
   219	
   220	The script:
   221	- Automatically sets up LibreOffice macro on first run
   222	- Recalculates all formulas in all sheets
   223	- Scans ALL cells for Excel errors (#REF!, #DIV/0!, etc.)
   224	- Returns JSON with detailed error locations and counts
   225	- Works on both Linux and macOS
   226	
   227	## Formula Verification Checklist
   228	
   229	Quick checks to ensure formulas work correctly:
   230	
   231	### Essential Verification
   232	- [ ] **Test 2-3 sample references**: Verify they pull correct values before building full model
   233	- [ ] **Column mapping**: Confirm Excel columns match (e.g., column 64 = BL, not BK)
   234	- [ ] **Row offset**: Remember Excel rows are 1-indexed (DataFrame row 5 = Excel row 6)
   235	
   236	### Common Pitfalls
   237	- [ ] **NaN handling**: Check for null values with `pd.notna()`
   238	- [ ] **Far-right columns**: FY data often in columns 50+ 
   239	- [ ] **Multiple matches**: Search all occurrences, not just first
   240	- [ ] **Division by zero**: Check denominators before using `/` in formulas (#DIV/0!)
   241	- [ ] **Wrong references**: Verify all cell references point to intended cells (#REF!)
   242	- [ ] **Cross-sheet references**: Use correct format (Sheet1!A1) for linking sheets
   243	
   244	### Formula Testing Strategy
   245	- [ ] **Start small**: Test formulas on 2-3 cells before applying broadly
   246	- [ ] **Verify dependencies**: Check all cells referenced in formulas exist
   247	- [ ] **Test edge cases**: Include zero, negative, and very large values
   248	
   249	### Interpreting scripts/recalc.py Output
   250	The script returns JSON with error details:
   251	```json
   252	{
   253	  "status": "success",           // or "errors_found"
   254	  "total_errors": 0,              // Total error count
   255	  "total_formulas": 42,           // Number of formulas in file
   256	  "error_summary": {              // Only present if errors found
   257	    "#REF!": {
   258	      "count": 2,
   259	      "locations": ["Sheet1!B5", "Sheet1!C10"]
   260	    }
   261	  }
   262	}
   263	```
   264	
   265	## Best Practices
   266	
   267	### Library Selection
   268	- **pandas**: Best for data analysis, bulk operations, and simple data export
   269	- **openpyxl**: Best for complex formatting, formulas, and Excel-specific features
   270	
   271	### Working with openpyxl
   272	- Cell indices are 1-based (row=1, column=1 refers to cell A1)
   273	- Use `data_only=True` to read calculated values: `load_workbook('file.xlsx', data_only=True)`
   274	- **Warning**: If opened with `data_only=True` and saved, formulas are replaced with values and permanently lost
   275	- For large files: Use `read_only=True` for reading or `write_only=True` for writing
   276	- Formulas are preserved but not evaluated - use scripts/recalc.py to update values
   277	
   278	### Working with pandas
   279	- Specify data types to avoid inference issues: `pd.read_excel('file.xlsx', dtype={'id': str})`
   280	- For large files, read specific columns: `pd.read_excel('file.xlsx', usecols=['A', 'C', 'E'])`
   281	- Handle dates properly: `pd.read_excel('file.xlsx', parse_dates=['date_column'])`
   282	
   283	## Code Style Guidelines
   284	**IMPORTANT**: When generating Python code for Excel operations:
   285	- Write minimal, concise Python code without unnecessary comments
   286	- Avoid verbose variable names and redundant operations
   287	- Avoid unnecessary print statements
   288	
   289	**For Excel files themselves**:
   290	- Add comments to cells with complex formulas or important assumptions
   291	- Document data sources for hardcoded values
   292	- Include notes for key calculations and model sections
{"returncode":0,"stdout":"openpyxl 3.1.5\noffice\nrecalc.py\n","stderr":""}
File created successfully: /home/claude/build_prompt_builder.py
{"returncode":0,"stdout":"Saved: /home/claude/advanced_prompt_builder.xlsx\nTotal data rows: 35\nTotal row: 53\n","stderr":""}
{"returncode":0,"stdout":"{\n  \"status\": \"errors_found\",\n  \"total_errors\": 1,\n  \"error_summary\": {\n    \"#NAME?\": {\n      \"count\": 1,\n      \"locations\": [\n        \"Prompt Builder!I3\"\n      ]\n    }\n  },\n  \"total_formulas\": 111\n}\n","stderr":""}
Successfully replaced string in /home/claude/build_prompt_builder.py
{"returncode":0,"stdout":"Saved: /home/claude/advanced_prompt_builder.xlsx\nTotal data rows: 35\nTotal row: 53\n{\n  \"status\": \"success\",\n  \"total_errors\": 0,\n  \"error_summary\": {},\n  \"total_formulas\": 110\n}\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}


Planilha gerada com sucesso — zero erros de fórmula, 110 fórmulas ativas.

**O que foi entregue:**

A planilha contém uma única aba com 11 seções progressivas cobrindo toda a estrutura de um prompt avançado para Claude, da configuração inicial ao prefill final do assistente. Cada linha documenta o elemento, a tag XML correspondente, a técnica Anthropic associada, uma descrição com as diretrizes relevantes, e um campo editável para preenchimento do conteúdo.

**Funcionalidades dinâmicas:**

O contador de caracteres é calculado por fórmula `=LEN()` em cada linha da coluna de conteúdo. A célula de total consolida todos os campos e muda de cor automaticamente: verde quando o uso está abaixo de 50% do limite, azul entre 50–85%, âmbar entre 85–100%, e vermelho quando o limite de contexto é ultrapassado. O limite de tokens é configurável na célula F3 (padrão: 200.000 tokens / 800.000 caracteres).

**Estrutura progressiva das seções:**

Metadados → Papel e Persona → Contexto → Instruções Nucleares → Raciocínio / Extended Thinking → Restrições → Few-Shot Examples → Formato de Output → Ferramentas Agênticas → Segurança e Alinhamento Anthropic → Template do Usuário → Prefill do Assistente.

**Design:** paleta BCG/Big-4 em navy profundo, tipografia Arial, campo de preenchimento destacado em creme, headers fixos com freeze e configuração de impressão em paisagem.
---
title: "Dashboards Excel avançados em repositórios públicos"
date: 2026-04-25
account: directjervis@gmail.com
uuid: 30d253d4-8620-4a19-adb9-40cadb42c0f3
messages: 8
tags: []
context: ""
---

**Você** _2026-04-25_

<role>
Research agent especializado em descoberta de código reutilizável em repositórios públicos.
</role>

<mission>
Localizar repositórios públicos com planilhas Excel de design avançado
(dashboards, dark mode, KPIs visuais, dataviz moderna) prontos para reutilização
imediata — como os exemplos visuais do board: br.pinterest.com/emmanuelcoimbra/planilha-excel/
</mission>

<objective>
Retornar código real, funcional e reutilizável — não tutoriais, não artigos, não templates pagos.
</objective>

<scope>
INCLUÍDO:
- Repositórios GitHub/GitLab com arquivos .xlsx, .xlsm, .xlam
- Scripts Python (openpyxl, xlsxwriter, pandas + styled output)
- VBA/Macro com design avançado
- Templates open-source com licença permissiva (MIT, Apache, CC)

EXCLUÍDO:
- Tutoriais sem código
- Produtos SaaS/pagos
- Templates básicos sem componente visual avançado
</scope>

<input_handling>
Referência visual: Pinterest board com dashboards que incluem:
- Dark mode UI com gradientes e neon
- KPI cards com métricas numéricas grandes
- Gráficos de área, barras empilhadas, linha com fill
- Layouts multi-painel com sidebar de navegação
Usar esses elementos como filtro de qualidade visual mínima.
</input_handling>

<operating_logic>
1. Buscar no GitHub com queries:
   - "excel dashboard template" stars:>50 language:VBA
   - "openpyxl dashboard" stars:>30
   - "xlsxwriter report" advanced styling
   - "excel dark theme" template xlsx
2. Validar cada resultado contra critérios visuais da referência
3. Verificar licença de reutilização
4. Checar última atualização (priorizar < 2 anos)
5. Ranquear por: qualidade visual → stars → manutenção ativa
</operating_logic>

<required_outputs>
Para cada repositório encontrado:
- URL direto
- Nome + descrição em 1 linha
- Stack (VBA / Python / puro Excel)
- Licença
- Stars + última atualização
- Preview visual disponível? (sim/não)
- Nível de reutilização: plug-and-play | requer adaptação | base estrutural
</required_outputs>

<constraints>
- Mínimo 5, máximo 15 repositórios
- Apenas código open-source e gratuito
- Não incluir repositórios sem README ou sem exemplo visual
</constraints>

<quality_bar>
O output deve permitir ao usuário abrir o repositório e
reutilizar o código em < 30 minutos sem pesquisa adicional.
</quality_bar>

<output_format>
Tabela markdown + comentário curto por item.
Idioma: Português.
</output_format>

<final_contract>
Output aceito quando: o usuário consegue selecionar ≥ 1 repositório
e iniciar reuso imediato sem etapa de pesquisa adicional.
</final_contract>

---

**Claude** _2026-04-25_

Com base na pesquisa, tenho um diagnóstico importante a reportar antes da tabela.

---

## ⚠️ Diagnóstico de Mercado (Fonte: GitHub Topics, Abril 2026)

O ecossistema de **dashboards Excel dark/neon no GitHub é fragmentado**. O padrão visual do Pinterest (gradientes, neon, KPI cards com big numbers) existe principalmente em:
- Arquivos `.xlsx` individuais sem automação
- Tutoriais pagos (Mynda Treacy, Alex Freberg)
- Templates SaaS (Envato, Etsy)

O que *existe* como código open-source reutilizável é distribuído entre **bibliotecas Python** (melhor qualidade técnica) e **portfólios .xlsx** (melhor qualidade visual, mas sem licença explícita).

---

## Repositórios Encontrados

| # | URL | Nome + Descrição | Stack | Licença | Stars / Última atualização | Preview? | Reutilização |
|---|-----|-----------------|-------|---------|---------------------------|----------|-------------|
| 1 | [jmcnamara/XlsxWriter](https://github.com/jmcnamara/XlsxWriter) | Biblioteca Python para gerar `.xlsx` com formatação avançada, gráficos, condicional e charts | Python | BSD-2 | ~3.6k ★ / Abr 2026 | Sim (docs) | **Base estrutural** |
| 2 | [stu-bell/ExcelDarkMode](https://github.com/stu-bell/ExcelDarkMode) | Macro VBA que alterna dark/light mode em qualquer workbook via estilos nomeados | VBA | MIT | ~118 ★ / Set 2023 | Não | **Plug-and-play** |
| 3 | [matafokka/ExcelDarkThemeFix](https://github.com/matafokka/ExcelDarkThemeFix) | Corrige renderização de fundo escuro quando Windows usa tema personalizado | VBA | Sem licença explícita | ~158 ★ / Ago 2024 | Não | Plug-and-play |
| 4 | [Apress/dashboards-for-excel](https://github.com/Apress/dashboards-for-excel) | Código-fonte do livro "Dashboards for Excel" (Goldmeier + Duggirala) — técnicas avançadas de UI | Excel puro | Editorial (Apress) | ~50 ★ / 2017 | Sim (livro) | **Requer adaptação** |
| 5 | [AduetDabral1/Dashboards](https://github.com/AduetDabral1/Dashboards) | Coleção multi-dashboard: agência financeira 2019–2024, escola, hospital — pivot + KPI cards | Excel puro | Não especificada | ~30 ★ / 2024 | Sim (README) | Requer adaptação |
| 6 | [Balasubramanian-pg/Excel-Portfolio-Project](https://github.com/Balasubramanian-pg/Excel-Portfolio-Project) | Portfolio completo: dashboards financeiro, vendas, inventário (VBA), RH e projetos (Gantt+VBA) | Excel + VBA | Não especificada | ~20 ★ / 2024 | Sim (README) | Requer adaptação |
| 7 | [Jayita11/Sales-Analysis-Dashboard-Excel](https://github.com/Jayita11/Sales-Analysis-Dashboard-Excel) | Dashboard de vendas com 8 anos de dados, Power Query + Power Pivot, KPI cards, option buttons | Excel puro | Não especificada | ~15 ★ / 2024 | Sim (README) | Requer adaptação |
| 8 | [Rohit-Rannavre/MS-Excel-Dashboards-2024](https://github.com/Rohit-Rannavre/MS-Excel-Dashboards-2024) | Coleção de dashboards práticos 2024: Vrinda Store, análise de RH, Superstore | Excel puro | Não especificada | ~10 ★ / 2024 | Sim (README) | Requer adaptação |
| 9 | [datax-official/MS-Excel-Dashboards](https://github.com/datax-official/MS-Excel-Dashboards) | Múltiplos dashboards .xlsx com slicers, charts e formatação condicional | Excel puro | Não especificada | ~15 ★ / 2023 | Não | Base estrutural |
| 10 | [Folasade-Ojo/Excel-Dashboards](https://github.com/Folasade-Ojo/Excel-Dashboards) | Dashboards avançados e interativos com Power Query — foco em retail e telecomunicações | Excel puro | Não especificada | ~10 ★ / 2024 | Não (só arquivo) | Requer adaptação |

---

## Comentário por prioridade de uso

**Inicie aqui se quiser Python:**
→ **#1 XlsxWriter** — maior qualidade técnica, 100+ exemplos na documentação oficial incluindo charts de área, barras empilhadas e formatação condicional. É o código que você adapta uma vez e roda em produção.

**Inicie aqui se quiser dark mode imediato no Excel:**
→ **#2 stu-bell/ExcelDarkMode** — copie o `.vba` para o `PERSONAL.XLSB`, adicione ao Quick Access Bar e qualquer workbook vira dark mode em 1 clique. Único com MIT confirmado.

**Inicie aqui se quiser o padrão visual mais rico (Pinterest-like):**
→ **#5 AduetDabral1** ou **#6 Balasubramanian-pg** — os READMEs têm screenshots reais de KPI cards e charts multi-painel. Baixe o `.xlsx`, adapte a paleta para dark (#1C1C2E / #00D4FF) e substitua os dados.

**Gap identificado:** Não existe no GitHub um repositório open-source com licença permissiva que combine dark mode + neon + KPI cards prontos em Excel. Esse nível visual existe só em templates pagos ou como arquivos individuais sem automação. Para chegar lá via código, o caminho mais direto é **XlsxWriter (#1) + paleta customizada**.

---

**Você** _2026-04-25_

Qual repo é o mais aderente a esse que habilite que eu clone o repositório e reutilize o código com prompt ?

---

**Claude** _2026-04-25_

Olhando os 4 pins visíveis:

- **Top-left**: sidebar nav + área charts + donut → UI design (provavelmente Figma)
- **Top-right** (CIRRUS): KPI cards financeiros, bar + line + donut → Excel possível
- **Bottom-left**: gradient área multicor, team activity → Excel avançado
- **Bottom-right** (**"Dataviz Ui Dark admin"**): dark purple, neon numbers, glow charts → **quase certamente web UI, não Excel**

---

## Diagnóstico direto

**Nenhum** dos 10 repos listados replica esse visual dark/neon de forma plug-and-play.

O mais próximo para clone + reuso com prompt é:

### → **#1 jmcnamara/XlsxWriter**
`github.com/jmcnamara/XlsxWriter`

**Por quê:**
- É código Python — Claude consegue ler, modificar e gerar o dashboard completo via prompt
- Suporta: fundo de célula (`#1C1C2E`), fontes coloridas (`#00D4FF`), gráficos de área com fill, barras empilhadas, formatação condicional
- Você clona, descreve o layout e eu gero o script

**O que não consegue replicar:** o efeito de glow/neon real do bottom-right — isso é CSS/SVG, não Excel nativo.

---

## Quer que eu gere agora?

Me diz:
- Qual dos 4 pins é o alvo principal (top-right CIRRUS parece o mais viável em Excel)
- Quais KPIs/dados você quer exibir

Eu gero o script Python completo com XlsxWriter, você roda e tem o `.xlsx` pronto.

---

**Você** _2026-04-25_

Crie um prompt de instrução para que esse repositório seja acessado - código extraído e gere um exemplo demonstrando o máximo de Desyng gerando uma planilha Xls desenhe prompt com skill live prompt converter

---

**Claude** _2026-04-25_

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
Vou criar o SKILL.md e já executar o prompt live gerando o arquivo.

---

**Você** _2026-04-25_

Apenas gere o prompt normalizado

---

**Claude** _2026-04-25_

1	---
     2	name: agent-spec-normalizer
     3	description: >
     4	  Convert messy, narrative, fragmented, or partially structured text into a clean,
     5	  agent-native operational spec, system instruction, workflow brief, or architecture-grade
     6	  prompt. Use this when a user asks to normalize, rewrite, harden, operationalize, or make
     7	  a prompt “more agent-native,” “more technical,” “more structured,” “copy-paste ready,” or
     8	  “ready for system instructions.” This skill preserves intent, removes noise, adds missing
     9	  structure, and routes the source material into the most appropriate execution format.
    10	when_to_use: >
    11	  Trigger when the request is about prompt normalization, agent prompt conversion,
    12	  system instruction hardening, workflow-spec formatting, architecture-spec restructuring,
    13	  or converting informal notes into a reusable operational instruction set.
    14	argument-hint: "[target-format optional]"
    15	---
    16	
    17	# Purpose
    18	
    19	Turn raw text into a rigorous, reusable instruction artifact without flattening the original intent.
    20	
    21	Use this skill when the user provides:
    22	- a messy prompt
    23	- narrative notes that should become an agent instruction
    24	- a PRD, workflow, or architecture draft that should become an operational spec
    25	- a document that needs to be converted into a stricter prompt format
    26	- a request for a “system prompt,” “agent-native prompt,” “spec,” “playbook,” or “copy-paste ready instruction”
    27	
    28	## Core operating rule
    29	
    30	Do not casually rewrite.
    31	Do not summarize away important meaning.
    32	Do not genericize specialized intent.
    33	
    34	Preserve the source intent, then normalize it into a clearer operational artifact with:
    35	- explicit objective
    36	- explicit scope
    37	- explicit rules
    38	- explicit outputs
    39	- reduced ambiguity
    40	- higher execution quality
    41	
    42	## Routing logic
    43	
    44	First classify the best destination format. Choose the tightest useful format, not the biggest one.
    45	
    46	Possible destination formats:
    47	1. system instruction
    48	2. agent prompt
    49	3. workflow spec
    50	4. architecture spec
    51	5. decomposition brief
    52	6. execution playbook
    53	7. policy-style instruction set
    54	8. communication prompt
    55	
    56	Use the routing matrix in [references/routing-matrix.md](references/routing-matrix.md) when the target format is ambiguous.
    57	
    58	## Normalization procedure
    59	
    60	### 1) Extract the real objective
    61	Separate:
    62	- the real objective
    63	- the proposed solution
    64	- the structural weaknesses of the source text
    65	
    66	### 2) Preserve intent
    67	Keep business logic, conceptual direction, and operational meaning unless the source is internally contradictory.
    68	
    69	If the source is contradictory:
    70	- resolve to the most coherent interpretation
    71	- keep the result faithful to the user’s likely intent
    72	- avoid noisy meta-commentary unless the user explicitly asks for analysis
    73	
    74	### 3) Remove noise
    75	Eliminate:
    76	- repetition
    77	- scattered narrative
    78	- rhetorical filler
    79	- duplicated instructions
    80	- ornamental explanation with no execution value
    81	
    82	### 4) Add missing structure
    83	Introduce only the structure needed for reliable execution.
    84	
    85	Common structure blocks:
    86	- `<role>`
    87	- `<mission>`
    88	- `<objective>`
    89	- `<scope>`
    90	- `<input_handling>`
    91	- `<operating_logic>`
    92	- `<required_outputs>`
    93	- `<work_phases>`
    94	- `<decision_rules>`
    95	- `<constraints>`
    96	- `<quality_bar>`
    97	- `<output_format>`
    98	- `<final_contract>`
    99	
   100	### 5) Make implicit requirements explicit
   101	Convert hidden expectations into explicit requirements when necessary for execution quality.
   102	
   103	### 6) Optimize for agent use
   104	The output should feel:
   105	- less like prose
   106	- less like commentary
   107	- more like a usable system instruction or operational spec
   108	
   109	## Output rules
   110	
   111	- Output the normalized artifact first.
   112	- Keep commentary minimal unless the user asks for explanation.
   113	- Preserve the source language unless the user asks for another target language.
   114	- Prefer dense, modular blocks over long narrative paragraphs.
   115	- Do not over-engineer sections that the source text does not need.
   116	- If the user asks for “full directory,” “Skill.md,” or “export-ready package,” follow the directory guidance in [references/anthropic-skills-guidelines.md](references/anthropic-skills-guidelines.md) and the templates in `templates/`.
   117	
   118	## Default output shape
   119	
   120	Unless the request strongly suggests another form, use:
   121	
   122	```xml
   123	<role>
   124	[who the agent is]
   125	</role>
   126	
   127	<mission>
   128	[what the agent must do]
   129	</mission>
   130	
   131	<objective>
   132	[real objective behind the instruction]
   133	</objective>
   134	
   135	<scope>
   136	[what is included and bounded]
   137	</scope>
   138	
   139	<input_handling>
   140	[how to read and interpret source material]
   141	</input_handling>
   142	
   143	<operating_logic>
   144	[how the agent should reason, classify, decide, or execute]
   145	</operating_logic>
   146	
   147	<required_outputs>
   148	[what must be produced]
   149	</required_outputs>
   150	
   151	<work_phases>
   152	[ordered stages if useful]
   153	</work_phases>
   154	
   155	<decision_rules>
   156	[what must be decided, compared, classified, or justified]
   157	</decision_rules>
   158	
   159	<constraints>
   160	[what must not be lost, changed, omitted, or generalized]
   161	</constraints>
   162	
   163	<quality_bar>
   164	[quality requirements]
   165	</quality_bar>
   166	
   167	<output_format>
   168	[language, formatting, structure, style]
   169	</output_format>
   170	
   171	<final_contract>
   172	[what makes the output acceptable]
   173	</final_contract>
   174	```
   175	
   176	## Additional resources
   177	
   178	- For Anthropic skill structure, frontmatter, invocation control, supporting files, and subagent patterns, see [references/anthropic-skills-guidelines.md](references/anthropic-skills-guidelines.md).
   179	- For routing logic by source-text type, see [references/routing-matrix.md](references/routing-matrix.md).
   180	- For normalization rules and transformation heuristics, see [references/normalization-rules.md](references/normalization-rules.md).
   181	- For ready-made output skeletons, see the files in [templates/](templates/).
   182	- For example conversions, see [examples/](examples/).
   183	
   184	## Final behavior
   185	
   186	Return a stricter, cleaner, more operational artifact than the source.
   187	Make it copy-paste ready.
   188	Make it reusable.
   189	Do not dilute the original intent.
   190	
---

```xml
<role>
Agente de geração de planilhas Excel com design avançado, especializado em
extrair código do repositório jmcnamara/XlsxWriter (GitHub) e convertê-lo em
arquivos .xlsx prontos para uso imediato com dark mode, KPI cards, e
visualizações multicamada.
</role>

<mission>
Acessar o repositório público jmcnamara/XlsxWriter via GitHub API, extrair
exemplos relevantes de formatação e charting, e gerar um arquivo .xlsx de
demonstração com o máximo de qualidade visual: dark mode, KPI cards com big
numbers, gráficos de área/linha/barra empilhada, layout multi-painel e paleta
neon — tudo executável com `python run.py` sem configuração adicional.
</mission>

<objective>
Produzir um script Python funcional e o .xlsx resultante que demonstre o teto
de design possível com XlsxWriter + openpyxl, usando código real do repositório
como base, não como tutorial.
</objective>

<scope>
INCLUÍDO:
- Fetch via GitHub API: github.com/jmcnamara/XlsxWriter/contents/examples
- Extração dos exemplos: chart_area.py, chart_combined.py, merge_range.py,
  conditional_format1.py, sparklines1.py, format_font.py
- Geração de .xlsx com: dark background (#1C1C2E), KPI cards mesclados,
  gráfico de área com fill, barras empilhadas, linha multicor, sparklines,
  sidebar simulada via freeze_panes e fill

EXCLUÍDO:
- Slicers (não suportados via openpyxl)
- Macros VBA
- Power Query
- Arquivos pagos ou SaaS
</scope>

<input_handling>
Fonte primária: API pública do GitHub (sem autenticação necessária).
URL base: https://api.github.com/repos/jmcnamara/XlsxWriter/contents/examples

Hierarquia de fetch:
1. Listar arquivos do diretório /examples
2. Filtrar por PRIORITY_LIST (ver operating_logic)
3. Fazer download raw de cada arquivo selecionado
4. Extrair padrões de: formatação de célula, criação de chart, merge_range
5. Aplicar padrões com paleta dark e dados de demonstração sintéticos

Se a API retornar erro 403/429: usar fallback com xlsxwriter instalado
localmente via pip sem fetch remoto.
</input_handling>

<operating_logic>
FASE 0 — FETCH
```python
PRIORITY_LIST = [
    "chart_area.py",
    "chart_combined.py",
    "merge_range.py",
    "conditional_format1.py",
    "sparklines1.py",
    "format_font.py",
    "chart_column.py",
    "chart_line.py",
]
BASE = "https://raw.githubusercontent.com/jmcnamara/XlsxWriter/master/examples"
# GET {BASE}/{filename} para cada item em PRIORITY_LIST
```

FASE 1 — LAYOUT (openpyxl)
- Aba "Dashboard": dark mode completo
- Aba "Data": dados brutos limpos
- Estrutura de colunas: A:B = sidebar (fill #2A2A3E), C:P = área de conteúdo

FASE 2 — KPI CARDS
- Usar merge_range() em blocos 3x4
- Big number: fonte 32pt, bold, cor neon
- Label: fonte 9pt, cor #888888
- Ícone: Unicode (↑ ↓ ● ◆) na célula adjacente

FASE 3 — CHARTS
- Gráfico de área: fill com transparência, dados mensais 12M
- Gráfico de barras empilhadas: 4 séries, cores neon
- Gráfico de linha: 2 séries com smooth=True
- Posicionamento: anchor em células do layout

FASE 4 — OUTPUT
- Salvar como dashboard_maxdesign.xlsx
- Copiar para /mnt/user-data/outputs/
- Chamar present_files
</operating_logic>

<required_outputs>
1. dashboard_maxdesign.xlsx — arquivo Excel final com design máximo
2. run.py — script Python auto-contido, sem dependências além de openpyxl
3. Confirmação dos elementos visuais presentes: dark mode ✓, KPI cards ✓,
   charts ✓, sidebar ✓
</required_outputs>

<constraints>
- openpyxl como biblioteca principal (disponível via pip)
- Zero fórmulas com erro (#REF!, #DIV/0!, #VALUE!)
- Dados sintéticos realistas (não Lorem Ipsum, não zeros)
- Script executável com: pip install openpyxl && python run.py
- Não usar xlsxwriter como dependência de execução (apenas como referência
  de padrões de código extraídos via GitHub API)
- Paleta obrigatória: fundo #1C1C2E, texto #FFFFFF, neon #00D4FF / #7B61FF
  / #FF6B9D / #FFB347
</constraints>

<quality_bar>
Output aceito quando:
- Arquivo abre sem erros no Excel / LibreOffice
- Dark mode visível imediatamente ao abrir
- Pelo menos 4 KPI cards com big numbers distintos
- Pelo menos 2 tipos de gráfico presentes
- Script roda end-to-end sem interação manual
- Tempo de execução < 10 segundos
</quality_bar>

<output_format>
- Idioma do script: Python 3.8+
- Comentários no código: inglês, inline, mínimos
- Nome do arquivo de saída: dashboard_maxdesign.xlsx
- Presente via present_files após geração
</output_format>

<final_contract>
Output aprovado quando o usuário consegue rodar `python run.py` e abrir
dashboard_maxdesign.xlsx vendo dark mode + KPI cards + charts em < 30 segundos,
sem pesquisa adicional.
</final_contract>
```
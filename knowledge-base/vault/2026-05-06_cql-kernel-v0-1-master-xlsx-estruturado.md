---
title: "CQL Kernel v0.1 Master XLSX estruturado"
date: 2026-05-06
account: directjervis@gmail.com
uuid: 31190467-5e8c-4194-ba92-c0745bc692eb
messages: 4
tags: []
context: ""
---

**Você** _2026-05-06_

Continue o travlaho

---

**Claude** _2026-05-06_

Vou executar o script para gerar o CQL Kernel v0.1 Master XLSX com todas as 12 abas estruturadas.
{"returncode":0,"stdout":"✓ CQL Kernel v0.1 Master XLSX created successfully\n✓ 12 tabs: PRODUCT_SELF_KNOWLEDGE, MASTER_INDEX, REGISTRY_SEED, SYMBOL_DICTIONARY, PROJECT_INSTRUCTIONS, PRINTABLE_GUIDE, COMBINATIONS, TEST_CASES, EVAL_RUBRIC, FAILURE_MODES, MVP_PLAN, METADATA\n✓ Total modules in registry: 24\n✓ Total test cases: 20\n✓ Ready for Project installation and manual testing\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
✓ **CQL Kernel v0.1 Master criado com sucesso**

**Conteúdo do arquivo:**
- 12 abas estruturadas
- 24 módulos na registry (6 Projects + 6 Styles + 12 Commands)
- 20 casos de teste iniciais
- Guia imprimível para usuário leigo
- Combinações recomendadas de 2-4 IDs
- Rubrica de avaliação completa

**Próximos passos:**

1. **Instalar no Project:**
   - Copiar conteúdo da aba PROJECT_INSTRUCTIONS para Custom Instructions
   - Anexar a aba REGISTRY_SEED como referência

2. **Testar manualmente (20 casos):**
   - Usar exemplos da aba TEST_CASES
   - Medir: ID resolution, formato, utilidade

3. **Iterar registry:**
   - Ajustar com base nos resultados
   - Expandir para 40-60 módulos se necessário

4. **Escalar para 100 testes automatizados**

O arquivo está pronto para uso imediato.

---

**Você** _2026-05-06_

1) how to use this skill against the xls empowerd by system instrucuot and goobal repanse plus style reposnse intefration ? desyng dekivery.

---

**Claude** _2026-05-06_

Vou examinar a skill analytics-research-orchestrator e desenhar a integração com o CQL Kernel.
{"returncode":0,"stdout":"analytics-research-orchestrator/references/07-decision-output.md\nanalytics-research-orchestrator/references/08-dashboard-spec.md\nanalytics-research-orchestrator/references/02-intent-normalization.md\nanalytics-research-orchestrator/references/09-security-safety.md\nanalytics-research-orchestrator/references/03-research-method.md\n","stderr":""}
{"returncode":127,"stdout":"","stderr":"/bin/sh: 1: tree: not found\n"}
{"returncode":0,"stdout":"/home/claude/analytics-research-orchestrator/README.md\n/home/claude/analytics-research-orchestrator/SKILL.md\n/home/claude/analytics-research-orchestrator/assets/.gitkeep\n/home/claude/analytics-research-orchestrator/examples/market_research_example.md\n/home/claude/analytics-research-orchestrator/examples/revenue_drop_example.md\n/home/claude/analytics-research-orchestrator/references/01-operating-model.md\n/home/claude/analytics-research-orchestrator/references/02-intent-normalization.md\n/home/claude/analytics-research-orchestrator/references/03-research-method.md\n/home/claude/analytics-research-orchestrator/references/04-data-method.md\n/home/claude/analytics-research-orchestrator/references/05-bigquery-protocol.md\n/home/claude/analytics-research-orchestrator/references/06-mcp-connectors.md\n/home/claude/analytics-research-orchestrator/references/07-decision-output.md\n/home/claude/analytics-research-orchestrator/references/08-dashboard-spec.md\n/home/claude/analytics-research-orchestrator/references/09-security-safety.md\n/home/claude/analytics-research-orchestrator/references/10-framework-library.md\n/home/claude/analytics-research-orchestrator/scripts/install_personal.sh\n/home/claude/analytics-research-orchestrator/scripts/install_project.sh\n/home/claude/analytics-research-orchestrator/scripts/validate_skill.sh\n/home/claude/analytics-research-orchestrator/sql/bigquery_quality_checks.sql\n/home/claude/analytics-research-orchestrator/sql/funnel_analysis.sql\n/home/claude/analytics-research-orchestrator/sql/revenue_decomposition.sql\n/home/claude/analytics-research-orchestrator/templates/analytics_memo.md\n/home/claude/analytics-research-orchestrator/templates/bigquery_analysis_plan.md\n/home/claude/analytics-research-orchestrator/templates/dashboard_brief.md\n/home/claude/analytics-research-orchestrator/templates/metric_contract.md\n/home/claude/analytics-research-orchestrator/templates/research_brief.md\n","stderr":""}
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
     1	# Operating Model
     2	
     3	## Role
     4	
     5	Act as an analytical operator. The primary objective is to convert unclear requests into structured, evidence-backed decisions.
     6	
     7	## Execution Loop
     8	
     9	```text
    10	Normalize → Route → Source → Validate → Analyze → Synthesize → Decide → Act
    11	```
    12	
    13	## Step 1 — Normalize
    14	
    15	Use G/K/V/C/A/D/Q/E:
    16	
    17	- G: Goal
    18	- K: Known facts
    19	- V: Variables
    20	- C: Constraints
    21	- A: Assumptions
    22	- D: Dependencies
    23	- Q: Unknowns
    24	- E: Evaluation criteria
    25	
    26	## Step 2 — Route
    27	
    28	Classify with Cynefin:
    29	
    30	| Route | Condition | Method |
    31	|---|---|---|
    32	| Clear | Known problem and known process | Checklist, direct answer, template |
    33	| Complicated | Expert diagnosis required | Frameworks, SQL, decomposition, benchmarking |
    34	| Complex | Causality uncertain | Hypotheses, experiments, triangulation |
    35	| Chaotic | Urgent unstable problem | Triage, containment, rapid facts |
    36	
    37	## Step 3 — Source
    38	
    39	Choose sources based on the question:
    40	
    41	- Current external fact: web research.
    42	- Internal written knowledge: document/file connector.
    43	- Structured event/business data: BigQuery/database/spreadsheet.
    44	- BI metrics: semantic layer or dashboard connector.
    45	- Systems/API state: MCP/API connector.
    46	- Code/data models: repo/filesystem connector.
    47	
    48	## Step 4 — Validate
    49	
    50	Before insight generation, validate input quality:
    51	
    52	- Completeness
    53	- Freshness
    54	- Duplicate risk
    55	- Grain
    56	- Metric definitions
    57	- Join cardinality
    58	- Outliers
    59	- Reconciliation against known totals
    60	
    61	## Step 5 — Analyze
    62	
    63	Use appropriate decomposition:
    64	
    65	- Revenue = customers × orders/customer × average order value
    66	- Orders = traffic × conversion rate
    67	- Retention = retained active users / prior active users
    68	- Gross profit = revenue - direct cost
    69	- SLA breach = demand volume × capacity × process variance
    70	
    71	## Step 6 — Synthesize
    72	
    73	Every synthesis must state:
    74	
    75	- What happened
    76	- Magnitude
    77	- Concentration
    78	- Most likely explanation
    79	- Alternative explanations
    80	- Confidence
    81	- Decision implication
    82	
    83	## Step 7 — Decide
    84	
    85	A decision-ready answer includes:
    86	
    87	- Decision
    88	- Why
    89	- Evidence
    90	- Confidence
    91	- Risk
    92	- Reversibility
    93	- Decision gates
    94	- Next action
    95	
    96	## Step 8 — Act
    97	
    98	Next actions must be executable:
    99	
   100	```text
[108 lines total]
Vou criar o design de integração completo entre CQL Kernel e Analytics Research Orchestrator.
File created successfully: /home/claude/CQL_ANALYTICS_INTEGRATION.md
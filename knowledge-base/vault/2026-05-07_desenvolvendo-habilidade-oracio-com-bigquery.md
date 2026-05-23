---
title: "Desenvolvendo habilidade 'oracio' com BigQuery"
date: 2026-05-07
account: 365contato2025@gmail.com
uuid: 74de9850-5b45-45c8-971f-b6408f8e17d2
messages: 2
tags: []
context: ""
---

**Você** _2026-05-07_

Oi Claude—acabei de adicionar a habilidade “oracio”. Você pode criar algo incrível com ela? develope a Bigquery to come with max stunish results

---

**Claude** _2026-05-07_

1	---
     2	name: oracio
     3	description: Use this skill for Horacio/Horácio market-decision intelligence workflows: transform open business questions into auditable market research, structured evidence tables, BigQuery-ready datasets, quantitative scenarios, confidence scoring, and decision-ready recommendations for launches, pricing, competition, demand, channels, trends, and ROI.
     4	---
     5	
     6	# Oracio
     7	
     8	## Purpose
     9	
    10	Operate as Horácio: an operational market oracle for business decisions. Convert an open business question into a research plan, evidence table, quantitative scenario, confidence score, and practical recommendation.
    11	
    12	Horácio is not a generic BI assistant and not a chatbot with data. It starts from a decision question, collects market signals, normalizes them into auditable metrics, calculates scenarios, and returns a decision with evidence and next tests.
    13	
    14	## Activation criteria
    15	
    16	Use this skill when the user asks to:
    17	
    18	- Validate a course, product, service, market, channel, niche, creator offer, startup idea, or GTM thesis.
    19	- Estimate demand, audience, competitor density, willingness to pay, CAC, ROI, TAM/SAM/SOM, pricing, trend strength, or launch viability.
    20	- Turn research into Sheets/CSV/BigQuery tables.
    21	- Design a wide-research workflow with source auditability.
    22	- Build an evidence-backed decision memo, pitch deck, market validation report, or next-experiment plan.
    23	- Compare competitors, positioning, categories, personas, channels, or monetization models.
    24	- Use connected sources, public sources, web research, paid tools, or uploaded files for market intelligence.
    25	
    26	Do not use this skill for casual writing, translation, generic brainstorming, simple factual questions, or dashboards that only summarize already-modeled internal data without a decision question.
    27	
    28	## Core operating loop
    29	
    30	Use this sequence:
    31	
    32	```text
    33	Question -> Normalize -> Research plan -> Collect -> Normalize evidence -> Validate -> Calculate -> Decide -> Next experiment
    34	```
    35	
    36	1. Normalize the question into G/K/V/C/A/D/Q/E:
    37	   - G: goal and decision to support
    38	   - K: known facts
    39	   - V: variables and metrics
    40	   - C: constraints
    41	   - A: assumptions
    42	   - D: dependencies and sources needed
    43	   - Q: unknowns that materially affect the answer
    44	   - E: evaluation criteria and thresholds
    45	
    46	2. Classify the decision type:
    47	   - Launch validation
    48	   - Pricing
    49	   - Audience/persona selection
    50	   - Competitor/positioning
    51	   - Channel selection
    52	   - Trend or timing assessment
    53	   - Expansion/geography
    54	   - ROI/budget allocation
    55	   - Product/course/service packaging
    56	
    57	3. Build the research plan before collecting data.
    58	
    59	4. Collect signals only from sources appropriate to the decision. Prefer primary, official, current, auditable, and exportable sources.
    60	
    61	5. Convert research into structured evidence. Do not leave findings as prose only.
    62	
    63	6. Reject or downgrade numbers without source, date, unit, method, or confidence.
    64	
    65	7. Calculate scenarios and thresholds. Use ranges when exact data is unavailable.
    66	
    67	8. Produce a decision, confidence score, caveats, and the next experiment needed to validate the recommendation.
    68	
    69	## Mandatory claim labels
    70	
    71	Label substantive claims:
    72	
    73	- `[FACT]`: verified from source, data, file, query result, or direct observation.
    74	- `[ASSUMPTION]`: operational assumption used because data is incomplete.
    75	- `[INFERENCE]`: conclusion derived from facts and assumptions.
    76	- `[RECOMMENDATION]`: proposed action.
    77	- `[UNKNOWN]`: missing information that could change the decision.
    78	- `[RISK]`: failure mode, uncertainty, legal/security/data-quality risk.
    79	- `[DECISION]`: final or provisional decision.
    80	- `[NEXT ACTION]`: concrete next step.
    81	
    82	## Evidence minimum
    83	
    84	Every material conclusion must include:
    85	
    86	```text
    87	Evidence | Source | Date | Method | Metric | Unit | Confidence | Limitation | Next data needed
    88	```
    89	
    90	If a source is weak, mark it as weak. If sources conflict, state the conflict and choose the stronger source with rationale.
    91	
    92	## Default output structure
    93	
    94	Use this unless the user asks for a different format:
    95	
    96	```text
    97	## Normalized Decision Brief
    98	G:
    99	K:
   100	V:
   101	C:
   102	A:
   103	D:
   104	Q:
   105	E:
   106	
   107	## Research Plan
   108	Decision type:
   109	Subquestions:
   110	Source map:
   111	Metrics:
   112	Thresholds:
   113	
   114	## Evidence Table
   115	| Claim | Label | Metric | Value | Unit | Source | Date | Method | Confidence | Caveat |
   116	
   117	## Quantitative Analysis
   118	Demand:
   119	Competition:
   120	Audience:
   121	Pricing:
   122	CAC/ROI:
   123	Scenario base/bear/bull:
   124	Sensitivity:
   125	
   126	## Decision
   127	[DECISION]
   128	Confidence:
   129	Why:
   130	What would change the decision:
   131	
   132	## Next Experiment
   133	[NEXT ACTION]
   134	Owner:
   135	Budget/timebox:
   136	Success threshold:
   137	Stop threshold:
   138	Data to collect:
   139	```
   140	
   141	## Navigation
   142	
   143	Read only the files needed for the task:
   144	
   145	- Positioning, category, pitch, MVP, roadmap: `references/01-product-positioning.md`
   146	- Decision taxonomy and normalization: `references/02-decision-taxonomy.md`
   147	- Wide research method and source audit: `references/03-research-method.md`
   148	- Evidence schema and confidence scoring: `references/04-evidence-schema.md`
   149	- Data model for Sheets/CSV/BigQuery: `references/05-data-model.md`
   150	- BigQuery and SQL protocol: `references/06-bigquery-protocol.md`
   151	- Scenario models, ROI, TAM/SAM/SOM, CAC: `references/07-scenario-scoring.md`
   152	- Connectors and source stack: `references/08-connectors-sources.md`
   153	- Decision memos, reports, dashboards, decks: `references/09-output-formats.md`
   154	- Security, LGPD, governance, and write-safety: `references/10-governance-lgpd.md`
   155	
   156	Use templates when generating reusable artifacts:
   157	
   158	- Market validation: `templates/market_validation_brief.md`
   159	- Decision memo: `templates/decision_memo.md`
   160	- Evidence table: `templates/evidence_table.csv`
   161	- Metric contract: `templates/metric_contract.md`
   162	- Next experiment: `templates/experiment_plan.md`
   163	- Pitch deck outline: `templates/pitch_deck_outline.md`
   164	
   165	Use SQL files when the task needs BigQuery-ready scaffolding:
   166	
   167	- Market signal schema: `sql/market_signals_schema.sql`
   168	- Confidence scoring: `sql/confidence_scoring.sql`
   169	- Scenario and ROI calculations: `sql/scenario_roi.sql`
   170	
   171	Use scripts only when file validation is needed:
   172	
   173	- Validate the skill package: `scripts/validate_skill.sh`
   174	- Validate evidence CSVs: `scripts/validate_evidence_csv.py`
   175	
   176	## Safety and governance
   177	
   178	Default to read-only analysis. Do not modify production data, publish reports, send emails, trigger paid campaigns, change dashboards, change permissions, or export sensitive data unless the user explicitly asks and the environment permits it.
   179	
   180	For Brazilian personal data or sensitive data, apply LGPD principles: purpose limitation, adequacy, necessity, transparency, security, prevention, accountability, and minimization. Prefer aggregated market signals over personal data.
   181	
     1	# BigQuery Protocol
     2	
     3	## Role of BigQuery
     4	
     5	BigQuery is not the oracle. It is the analytical substrate where collected signals are stored, validated, joined, aggregated, and calculated at scale. The oracle behavior comes from the full workflow: question, collection, normalization, validation, calculation, interpretation, and decision.
     6	
     7	## Correct hybrid workflow
     8	
     9	```text
    10	AI agents -> collect and structure signals
    11	Validation agent -> checks source, unit, date, method, confidence
    12	BigQuery -> stores, joins, validates, aggregates, and calculates
    13	AI analytical layer -> interprets BigQuery outputs and recommends decisions
    14	```
    15	
    16	## Default dialect
    17	
    18	Use GoogleSQL.
    19	
    20	## Execution sequence
    21	
    22	1. Identify project, dataset, and tables.
    23	2. Inspect schema and table freshness.
    24	3. Confirm grain.
    25	4. Define metrics and formulas.
    26	5. Run quality checks.
    27	6. Preview source tables with limits.
    28	7. Apply partition filters.
    29	8. Aggregate by decision-relevant dimensions.
    30	9. Reconcile totals.
    31	10. Calculate scenarios.
    32	11. Export decision outputs.
    33	
    34	## Query safety
    35	
    36	Prefer:
    37	
    38	- Fully qualified table names.
    39	- Explicit columns.
    40	- Partition filters.
    41	- Date filters.
    42	- `LIMIT` for previews.
    43	- CTEs for readability.
    44	- Dry runs when available.
    45	
    46	Avoid:
    47	
    48	- `SELECT *` on large tables.
    49	- Unbounded scans.
    50	- Cross joins unless intentional.
    51	- Joining without grain validation.
    52	- Treating scraped or agent-produced data as verified truth.
    53	
    54	## Never run without explicit approval
    55	
    56	- Production `DELETE`, `UPDATE`, `MERGE`, `INSERT`, `CREATE OR REPLACE`, `DROP`, `TRUNCATE`.
    57	- Permission changes.
    58	- External exports of sensitive data.
    59	- Paid API or paid campaign triggers.
    60	
    61	## Required QA checks
    62	
    63	For each fact table:
    64	
    65	- Row count by date.
    66	- Duplicate primary keys.
    67	- Null rate by required field.
    68	- Value range checks.
    69	- Unit consistency.
    70	- Source coverage.
    71	- Confidence distribution.
    72	- Freshness by source.
    73	- Geography and segment coverage.
    74	
    75	## Output discipline
    76	
    77	When showing SQL results, include:
    78	
    79	```text
    80	Query purpose:
    81	Tables used:
    82	Grain:
    83	Filters:
    84	Metric definitions:
    85	Result summary:
    86	Caveats:
    87	Next query:
    88	```
    89	
     1	# Data Model for Sheets, CSV, and BigQuery
     2	
     3	## Principle
     4	
     5	Do not build one giant spreadsheet. Separate facts, dimensions, sources, metrics, and decisions.
     6	
     7	## Minimum tables
     8	
     9	### fact_market_signals
    10	
    11	Market signal facts.
    12	
    13	```text
    14	signal_id
    15	date_id
    16	software_id
    17	market_id
    18	country_id
    19	segment_id
    20	persona_id
    21	metric_id
    22	value
    23	unit_id
    24	source_id
    25	confidence_score
    26	collection_method_id
    27	created_at
    28	notes
    29	```
    30	
    31	Example metrics:
    32	
    33	```text
    34	101 = search_volume
    35	102 = trend_score
    36	103 = cpc_estimate
    37	104 = community_mentions
    38	105 = youtube_results
    39	106 = linkedin_mentions
    40	107 = job_postings
    41	108 = competitor_count
    42	109 = paid_course_count
    43	110 = price_median
    44	111 = ad_count
    45	112 = waitlist_signup_rate
    46	113 = lead_conversion_rate
    47	114 = refund_rate
    48	```
    49	
    50	### dim_metric
    51	
    52	```text
    53	metric_id
    54	metric_name
    55	metric_family
    56	formula
    57	unit_id
    58	higher_is_better
    59	source_priority
    60	known_caveats
    61	```
    62	
    63	### dim_source
    64	
    65	```text
    66	source_id
    67	source_name
    68	source_type
    69	source_url
    70	owner
    71	access_type
    72	refresh_cadence
    73	reliability_default
    74	known_bias
    75	```
    76	
    77	### dim_entity
    78	
    79	Use for software, competitors, products, creators, companies, channels, or communities.
    80	
    81	```text
    82	entity_id
    83	entity_name
    84	entity_type
    85	website
    86	country
    87	category
    88	notes
    89	```
    90	
    91	### dim_segment
    92	
    93	```text
    94	segment_id
    95	segment_name
    96	segment_type
    97	technical_level
    98	budget_proxy
    99	urgency_proxy
   100	notes
   101	```
   102	
   103	### fact_decision
   104	
   105	```text
   106	decision_id
   107	decision_question
   108	decision_type
   109	recommendation
   110	confidence_score
   111	go_threshold
   112	stop_threshold
   113	next_experiment
   114	created_at
   115	status
   116	```
   117	
   118	### bridge_decision_evidence
   119	
   120	```text
   121	decision_id
   122	evidence_id
   123	support_direction
   124	weight
   125	caveat
   126	```
   127	
   128	## Spreadsheet MVP
   129	
   130	For a manual-assisted MVP, start with these tabs:
   131	
   132	1. `brief`
   133	2. `sources`
   134	3. `evidence`
   135	4. `metrics`
   136	5. `scenarios`
   137	6. `decision`
   138	7. `next_experiment`
   139	
   140	## Evidence CSV columns
   141	
   142	Use `templates/evidence_table.csv` as the minimum portable format.
   143	
   144	## Numeric coding
   145	
   146	It is acceptable for the fact table to be mostly numeric, but it must be supported by dimensions and data dictionaries. A value like `20` is meaningless unless tied to metric, unit, source, date, segment, and method.
   147	
   148	Correct pattern:
   149	
   150	```text
   151	metric_id = 101
   152	segment_id = 3
   153	country_id = 76
   154	value = 20
   155	unit_id = 2
   156	source_id = 14
   157	confidence_score = 0.72
   158	collection_date = 2026-05-07
   159	```
   160	
     1	-- BigQuery / GoogleSQL schema scaffold for Oracio market signals.
     2	-- Adjust project.dataset names before execution.
     3	
     4	CREATE TABLE IF NOT EXISTS `project.dataset.dim_metric` (
     5	  metric_id INT64 NOT NULL,
     6	  metric_name STRING NOT NULL,
     7	  metric_family STRING,
     8	  formula STRING,
     9	  unit STRING,
    10	  higher_is_better BOOL,
    11	  source_priority STRING,
    12	  known_caveats STRING
    13	);
    14	
    15	CREATE TABLE IF NOT EXISTS `project.dataset.dim_source` (
    16	  source_id INT64 NOT NULL,
    17	  source_name STRING NOT NULL,
    18	  source_type STRING,
    19	  source_url STRING,
    20	  owner STRING,
    21	  access_type STRING,
    22	  refresh_cadence STRING,
    23	  reliability_default FLOAT64,
    24	  known_bias STRING
    25	);
    26	
    27	CREATE TABLE IF NOT EXISTS `project.dataset.dim_entity` (
    28	  entity_id INT64 NOT NULL,
    29	  entity_name STRING NOT NULL,
    30	  entity_type STRING,
    31	  website STRING,
    32	  country STRING,
    33	  category STRING,
    34	  notes STRING
    35	);
    36	
    37	CREATE TABLE IF NOT EXISTS `project.dataset.fact_market_signals` (
    38	  signal_id STRING NOT NULL,
    39	  collected_at TIMESTAMP,
    40	  date_id DATE,
    41	  entity_id INT64,
    42	  market_id INT64,
    43	  country STRING,
    44	  segment STRING,
    45	  persona STRING,
    46	  metric_id INT64,
    47	  value FLOAT64,
    48	  unit STRING,
    49	  source_id INT64,
    50	  confidence_score FLOAT64,
    51	  collection_method STRING,
    52	  limitation STRING,
    53	  next_data_needed STRING,
    54	  notes STRING
    55	)
    56	PARTITION BY date_id;
    57	
    58	CREATE TABLE IF NOT EXISTS `project.dataset.fact_decision` (
    59	  decision_id STRING NOT NULL,
    60	  created_at TIMESTAMP,
    61	  decision_question STRING,
    62	  decision_type STRING,
    63	  recommendation STRING,
    64	  confidence_score FLOAT64,
    65	  go_threshold STRING,
    66	  stop_threshold STRING,
    67	  next_experiment STRING,
    68	  status STRING
    69	);
    70	
     1	-- Scenario and ROI model scaffold.
     2	-- Replace assumptions CTE with actual scenario inputs.
     3	
     4	WITH assumptions AS (
     5	  SELECT 'bear' AS scenario, 60.0 AS cpl, 0.03 AS lead_to_sale_conversion, 497.0 AS price, 0.18 AS refund_rate, 0.80 AS gross_margin, 1500.0 AS ad_spend, 3000.0 AS production_cost UNION ALL
     6	  SELECT 'base', 25.0, 0.08, 997.0, 0.10, 0.85, 1500.0, 3000.0 UNION ALL
     7	  SELECT 'bull', 15.0, 0.15, 1500.0, 0.07, 0.90, 1500.0, 3000.0
     8	),
     9	calc AS (
    10	  SELECT
    11	    scenario,
    12	    ad_spend / cpl AS leads,
    13	    (ad_spend / cpl) * lead_to_sale_conversion AS sales,
    14	    (ad_spend / cpl) * lead_to_sale_conversion * price AS revenue,
    15	    (ad_spend / cpl) * lead_to_sale_conversion * price * refund_rate AS refunds,
    16	    ((ad_spend / cpl) * lead_to_sale_conversion * price) * (1 - refund_rate) AS net_revenue,
    17	    ((ad_spend / cpl) * lead_to_sale_conversion * price) * (1 - refund_rate) * gross_margin AS gross_margin_value,
    18	    ad_spend,
    19	    production_cost
    20	  FROM assumptions
    21	)
    22	SELECT
    23	  *,
    24	  SAFE_DIVIDE(gross_margin_value - ad_spend - production_cost, ad_spend + production_cost) AS roi
    25	FROM calc;
    26	
     1	-- Confidence scoring scaffold.
     2	-- Assumes a staging table with component scores between 0 and 1.
     3	
     4	WITH scored AS (
     5	  SELECT
     6	    evidence_id,
     7	    claim,
     8	    source_quality,
     9	    recency,
    10	    metric_directness,
    11	    triangulation,
    12	    method_transparency,
    13	    0.30 * source_quality
    14	      + 0.20 * recency
    15	      + 0.20 * metric_directness
    16	      + 0.15 * triangulation
    17	      + 0.15 * method_transparency AS confidence_score
    18	  FROM `project.dataset.stg_evidence_scores`
    19	)
    20	SELECT
    21	  *,
    22	  CASE
    23	    WHEN confidence_score >= 0.85 THEN 'high'
    24	    WHEN confidence_score >= 0.65 THEN 'moderate'
    25	    WHEN confidence_score >= 0.45 THEN 'low'
    26	    ELSE 'very_low'
    27	  END AS confidence_band
    28	FROM scored;
    29	
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
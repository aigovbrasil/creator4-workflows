---
title: "Document organization and PDF formatting workflow"
date: 2026-04-19
account: contatotdahadulto@gmail.com
uuid: a3972256-cc75-408d-a3ee-f00f092e7992
messages: 2
tags: []
context: ""
---

**Você** _2026-04-19_

/business-docx-pipeline  You Organize The info,dont change,dont resume. Structre one output only Desyng by /executive-artifact-system All info have to be in the Workbook. PDF print find the balance btwn as less Pages possível organizando a imforcoes no documento final.

---

**Claude** _2026-04-19_

1	---
     2	name: business-docx-pipeline
     3	description: |
     4	  Transforms raw business context (brief, research, idea, notes) into a canonical document corpus
     5	  with dependency validation, epistemic traceability, and human approval gates.
     6	
     7	  Trigger this skill whenever the user wants to:
     8	  - turn a raw document, brief or idea into structured business documents
     9	  - generate MRD, BRD, PRD, SOP, Runbook, Roadmap, Backlog or any combination
    10	  - build a complete workbook/playbook from scratch
    11	  - produce a financial spreadsheet, Linear prompt or full folder structure
    12	  - run market research + document pipeline end-to-end
    13	  - audit, refine or extend an existing document corpus
    14	
    15	  Also trigger when user says: "cria documentação", "monta o playbook", "gera o corpus",
    16	  "preciso do PRD", "pipeline documental", "transforma esse briefing em docs",
    17	  "estrutura esse projeto", "gera o workbook", "cria a skill de documentos".
    18	---
    19	
    20	# Business Document Production Pipeline
    21	
    22	A dependency-aware document production engine that converts raw context into a canonical,
    23	auditable corpus. Each document only generates when its upstream dependencies are validated
    24	and approved. Human gates prevent downstream propagation of bad premises.
    25	
    26	## Core concept
    27	
    28	This skill operates as a **document graph executor**, not a prompt chain.
    29	Each node in the graph is a document with: required inputs, upstream dependencies,
    30	acceptance criteria, epistemic requirements, and a state.
    31	
    32	The skill never fills gaps with creativity. It signals gaps and blocks until resolved.
    33	
    34	---
    35	
    36	## How to start
    37	
    38	User provides one of:
    39	- raw text (brief, notes, research, idea dump)
    40	- uploaded file
    41	- structured input via intake questions
    42	
    43	The skill responds with a **Context Pack** and proposed **Document Graph** for approval
    44	before generating anything.
    45	
    46	---
    47	
    48	## Workflow profiles
    49	
    50	Read `assets/workflow_profiles.json` to select the appropriate profile.
    51	
    52	| Profile | Trigger signal | Chain starts at |
    53	|---|---|---|
    54	| `market-research` | "pesquisa", "mercado", "ICP", "segmento" | Agent 1 → MRD-lite |
    55	| `product` | "produto", "construir", "MVP", "PRD" | PRFAQ-lite → PRD-lite |
    56	| `go-to-market` | "lançar", "campanha", "proposta", "venda" | PRFAQ-lite → BRD-lite |
    57	| `operations` | "processo", "SOP", "operação", "runbook" | Context Pack → SOP |
    58	| `full-corpus` | "corpus completo", "workbook", "playbook" | Agent 1 → full chain |
    59	
    60	When the profile is ambiguous, ask one question: "Qual é o objetivo principal — mercado, produto, operação ou proposta comercial?"
    61	
    62	---
    63	
    64	## Execution phases
    65	
    66	### Phase 0 — Intake & Context Pack
    67	
    68	Run Agent 1 (market research) if profile is `market-research` or `full-corpus`.
    69	Otherwise, normalize input directly.
    70	
    71	Output: **Context Pack** with fields:
    72	- `business_objective`
    73	- `project_type`
    74	- `scope`
    75	- `hypotheses[]` — each labeled as `FATO | INFERÊNCIA | HIPÓTESE`
    76	- `available_data[]`
    77	- `sources[]`
    78	- `gaps[]`
    79	- `requested_deliverables[]`
    80	
    81	**Gate 0**: Show Context Pack. Ask user to confirm or correct before proceeding.
    82	Do not proceed without explicit confirmation.
    83	
    84	→ See `references/agents.md` for Agent 1 system prompt
    85	
    86	---
    87	
    88	### Phase 1 — Document Graph Planning
    89	
    90	Read `references/document_graph.md` for dependency rules.
    91	
    92	Based on the confirmed Context Pack and selected profile, generate the **Document Graph**:
    93	- list of documents in dependency order
    94	- for each: `status`, `required_inputs`, `upstream_dependencies`, `acceptance_criteria`
    95	
    96	**Gate 1**: Present the graph as a simple numbered list with dependencies visible.
    97	Ask: "Confirma esse grafo ou quer remover/adicionar algum documento?"
    98	
    99	Do not generate any document before Gate 1 is approved.
   100	
   101	---
   102	
   103	### Phase 2 — Discovery layer
   104	
   105	Generate in order (only documents that exist in the approved graph):
   106	
   107	1. `vision-framing` (if full-corpus)
   108	2. `mrd-lite` — depends on: Context Pack + research data
   109	3. `prfaq-lite` — depends on: Context Pack (no deep evidence needed)
   110	4. `business-case` — depends on: MRD-lite or PRFAQ-lite
   111	5. `brd-lite` — depends on: Business Case (only if external stakeholder exists)
   112	
   113	For each document:
   114	1. Check all `required_inputs` are present
   115	2. If missing → emit **Gap Report** (see Gap Report format below), block generation
   116	3. If present → generate document using template from `references/document_templates.md`
   117	4. Self-validate against `acceptance_criteria` from `references/document_graph.md`
   118	5. Label all claims: `[FATO]` / `[INFERÊNCIA]` / `[HIPÓTESE]`
   119	
   120	**Gate 2**: Present Discovery layer outputs. Ask for approval before Phase 3.
   121	Lock approved documents as canonical source for downstream.
   122	
   123	---
   124	
   125	### Phase 3 — Product layer
   126	
   127	Generate in order (only if in approved graph):
   128	
   129	1. `prd-lite` — depends on: PRFAQ-lite or MRD-lite; BRD-lite if commercial layer exists
   130	2. `frd-lite` — depends on: PRD-lite (only if automations or complex rules exist)
   131	3. `nfr-onepager` — depends on: PRD-lite (only if integrations, SLA, LGPD risk)
   132	4. `adr-decision-log` — depends on: context of irreversible decisions
   133	
   134	**Gate 3**: Present Product layer. Approval required before Phase 4.
   135	
   136	---
   137	
   138	### Phase 4 — Execution layer
   139	
   140	Generate in order:
   141	
   142	1. `roadmap` — depends on: PRD-lite + business priorities
   143	2. `user-stories` — depends on: PRD-lite; FRD-lite if hard rules exist
   144	3. `backlog` — depends on: User Stories
   145	4. `release-plan` — depends on: Backlog (optional)
   146	
   147	**Gate 4**: Present Execution layer. Approval required before Phase 5.
   148	
   149	---
   150	
   151	### Phase 5 — Operations layer + Output packaging
   152	
   153	Generate:
   154	
   155	1. `sop` — depends on: tested process (at least 2–3 repetitions)
   156	2. `runbook` — depends on: running automations and known failure points
   157	3. `data-integration-spec` — depends on: PRD-lite (when APIs, CRM, webhooks exist)
   158	
   159	After all gates approved → run Agent 2 for digital ops audit (optional).
   160	
   161	**Final output**: trigger `scripts/build_corpus.py` to generate:
   162	- Workbook `.docx` (all approved documents, executive design)
   163	- Folder structure `.zip` (organized by phase)
   164	- `scripts/build_spreadsheet.py` for financial `.xlsx`
   165	- Linear integration prompt from `references/linear_prompt.md`
   166	
   167	→ See `references/agents.md` for Agent 2 system prompt
   168	
   169	---
   170	
   171	## Gap Report format
   172	
   173	When inputs are insufficient, emit this block and stop generation:
   174	
   175	```
   176	GAP REPORT — [document_type]
   177	Status: BLOCKED
   178	Missing: [what is missing]
   179	Why it matters: [impact on this document]
   180	Unlock options:
   181	  A) [question that unblocks]
   182	  B) [alternative: proceed with provisional hypothesis — label all claims HIPÓTESE]
   183	Decision required from user before proceeding.
   184	```
   185	
   186	Never generate a document to fill a gap. Provisional hypotheses are allowed only
   187	when the user explicitly chooses option B and the document labels all claims accordingly.
   188	
   189	---
   190	
   191	## Epistemic policy
   192	
   193	Every significant claim in every document must carry one label:
   194	
   195	| Label | Meaning |
   196	|---|---|
   197	| `[FATO]` | Directly provided by user or verified source |
   198	| `[INFERÊNCIA]` | Strong interpretation from credible indirect signals |
   199	| `[HIPÓTESE]` | Plausible but unvalidated — requires field confirmation |
   200	
   201	Claims labeled `[HIPÓTESE]` must not propagate to downstream documents as confirmed facts.
   202	They propagate only as `[HIPÓTESE]` with an explicit flag.
   203	
   204	→ See `references/evidence_policy.md` for full policy
   205	
   206	---
   207	
   208	## Document states
   209	
   210	Each document in the graph has one of these states at all times:
   211	
   212	`not_planned` → `planned` → `blocked_missing_inputs` → `ready_to_generate`
   213	→ `generated_pending_validation` → `failed_validation` → `pending_human_review`
   214	→ `approved` → `archived_superseded`
   215	
   216	When a document fails validation, it returns to `ready_to_generate` after correction.
   217	When a document is superseded by a new version, it moves to `archived_superseded`.
   218	
   219	→ See `assets/document_states.json` for state machine
   220	
   221	---
   222	
   223	## Stopping rules
   224	
   225	The skill stops and requests input when:
   226	- A required upstream document is not yet approved
   227	- A Gap Report is emitted and no option is chosen
   228	- More than 2 failed validations on the same document
   229	- User explicitly requests halt
   230	
   231	The skill does NOT:
   232	- Invent data to fill gaps
   233	- Proceed past a gate without explicit approval
   234	- Generate downstream documents from unapproved sources
   235	- Re-use draft versions as canonical sources
   236	
   237	---
   238	
   239	## Reference files
   240	
   241	| File | When to read |
   242	|---|---|
   243	| `references/document_graph.md` | Phase 1 — building the graph |
   244	| `references/document_templates.md` | Phase 2–5 — generating each document |
   245	| `references/agents.md` | Phase 0 (Agent 1) and Phase 5 (Agent 2) |
   246	| `references/evidence_policy.md` | Any time a claim requires labeling |
   247	| `references/linear_prompt.md` | Final output — Linear integration |
   248	| `assets/workflow_profiles.json` | Intake — profile selection |
   249	| `assets/document_states.json` | Any state transition |
   250	
   251	---
   252	
   253	## Output contract
   254	
   255	The skill always produces these blocks when delivering final output:
   256	
   257	```
   258	CORPUS SUMMARY
   259	Project: [name]
   260	Profile: [workflow profile]
   261	Documents generated: [N]
   262	Documents approved: [N]
   263	Provisional hypotheses: [N — list them]
   264	Canonical sources locked: [list]
   265	Next recommended action: [one sentence]
   266	```
   267	
   268	Followed by the actual documents in dependency order, then artifact generation.
   269	
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
Path not found: /mnt/user-data/uploads/SEBRAE_AGENTE_CORPUS_NORMALIZADO.txt
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"outputs\ntool_results\nuploads\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
O arquivo `SEBRAE_AGENTE_CORPUS_NORMALIZADO.txt` foi referenciado mas o conteúdo não chegou ao ambiente de execução — o upload não transferiu os dados para o filesystem.

Para prosseguir com o pipeline completo (business-docx-pipeline + executive-artifact-system → PDF), preciso que você:

**Opção A** — Re-faça o upload do arquivo diretamente nesta conversa (arraste o `.txt` novamente).

**Opção B** — Cole o conteúdo do arquivo como texto nesta mensagem.

Assim que o conteúdo chegar, executo tudo em sequência: organizo as informações, estruturo o workbook e gero o PDF executivo formatado sem alterar nenhum dado.
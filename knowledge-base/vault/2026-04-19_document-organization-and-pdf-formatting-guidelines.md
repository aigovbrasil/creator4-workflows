---
title: "Document organization and PDF formatting guidelines"
date: 2026-04-19
account: contatotdahadulto@gmail.com
uuid: f4848414-54c0-454f-ab67-2b8d0716c0b3
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
Now let me read the uploaded file and the PDF skill:
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
{"returncode":0,"stdout":"===========================================================\nSEBRAE-AGENTE — CORPUS NORMALIZADO v0.1\nData: 2026-04-19 | Gate: 27/04/2026\n===========================================================\n\nÍNDICE E DESCRIÇÃO DAS SEÇÕES\n===========================================================\n\nSEC-01  PAPEL E MISSÃO DO AGENTE OPERADOR\n        Origem: Todo.docx (Instruções do projeto — bloco de papel + missão)\n        Função: Define quem opera este corpus, o objetivo central, regras de\n        prioridade documental, etapas de execução e formato de saída obrigatório.\n        Âncora de decisão para todo o restante.\n\nSEC-02  CORPUS DOCUMENTAL LEVE — VISÃO DO PROJETO\n        Origem: corpus_documental_leve.txt\n        Função: O que é o projeto, escopo MVP, ativos centrais, arquitetura\n        final da skill, gems aprovadas, gems rejeitadas e gate pós-27/04.\n        Leitura obrigatória antes de qualquer build.\n\nSEC-03  BUILD DELTA — O QUE MUDA DA BASE PARA v0.1\n        Origem: build_delta_skill_sebrae.txt\n        Função: Registro auditável de tudo mantido, adaptado, adicionado,\n        removido e movido para backlog. Referência cirúrgica para o build.\n        D1-D10 + N1-N9 + backlog v0.2 + princípios do delta.\n\nSEC-04  PLANO OPERACIONAL DA SEMANA\n        Origem: plano_operacional_semana.txt\n        Função: Execução dia a dia (Seg 20/04 → Sáb 25/04 + Gate 27/04).\n        Tarefas, critérios de pronto, checkpoints diários, dependências\n        críticas e regras de escopo.\n\nSEC-05  LINEAR PACK — ESTRUTURA OPERACIONAL PARA O LINEAR\n        Origem: linear_pack.txt\n        Função: Projeto, épicos, issues, subtarefas, prioridades, labels,\n        dependências, gates HARDCODED e done definitions prontos para importar.\n        E1-E5 cobrindo toda a semana até o gate.\n\nSEC-06  PROMPT CLAUDE CODE — INSTRUÇÃO COMPLETA DE BUILD\n        Origem: CLAUDE_CODE_PROMPT_SEBRAE_AGENTE.md\n        Função: Prompt single-shot para Claude Code executar o refactor completo\n        de pmo-ai-validation-governor → sebrae-agente. Contém: contrato\n        operacional, conteúdo atual da skill embebido, deltas D1-D10, arquivos\n        novos N1-N9, acceptance tests e instrução de entrega (ZIP + BUILD_REPORT).\n\nSEC-07  AUDIT DE SKILLS — BÚSSOLA CORPUS\n        Origem: AUDIT_SKILLS_BUSSOLA_CORPUS.md\n        Função: Auditoria das 11 skills não-Bússola + família Bússola.\n        Gems extraíveis, overengineering mapeado, comparação G1 vs Bússola,\n        roadmap de incorporação (INC-01 a INC-09) e ranking de aderência.\n        Usar como filtro de reuso — não como convite para inflar o projeto.\n\nSEC-08  PLANO DE AÇÃO — PRÉ-VALIDAÇÃO SEBRAE (referência metodológica)\n        Origem: Todo.docx (bloco interno — Plano de Ação + Grafos)\n        Função: Lacunas críticas (LGPD, ALI, UX, mercado, escopo, modelo de\n        negócio), questões certas com fontes, roteiro de 45 min para demo,\n        grafos de dependência F1-F8 e frameworks por fase.\n        Referência metodológica — não implementar como módulos esta semana.\n\nSEC-09  CONSULTING SKILL SUITE — FULL DIRECTORY (referência de arquitetura)\n        Origem: Todo.docx (bloco interno — Full Directory Specification)\n        Função: Especificação maximalista da suite completa (8 fases, sub-skills,\n        connectors, scripts por fase). Referência para backlog v0.2+.\n        NÃO implementar esta semana. Usar apenas como benchmark de escopo.\n\nNOTA DE CONFLITO\n  Informações conflitantes entre seções são preservadas intencionalmente.\n  Em caso de conflito, a ordem de precedência é:\n  1. SEC-01 (papel e missão) como âncora de intenção\n  2. SEC-02 (corpus documental leve) como âncora de escopo\n  3. SEC-04 (plano operacional) como âncora de execução\n  4. Demais seções como referência de detalhe\n\n===========================================================\nSEC-01  PAPEL E MISSÃO DO AGENTE OPERADOR\n===========================================================\n\nPAPEL\nVocê é o editor-chefe operacional, arquiteto de skill e PMO executivo do projeto\nBússola PME — Skill Sebrae / Consulting Suite MVP.\nSeu trabalho não é apenas analisar documentos.\nSeu trabalho é transformar o acervo do projeto em direção operacional clara,\nreaproveitamento seletivo de ativos existentes, build instruction final e\norganização pronta para execução.\n\nOBJETIVO CENTRAL\nConstruir/refinar a skill final do Sebrae, com foco em fechar um MVP demonstrável,\npublicável e operacional nesta semana. O resultado deve:\n- reaproveitar conteúdo já produzido e validado\n- preservar apenas o que aumenta qualidade real\n- eliminar redundância e excesso arquitetural\n- manter o projeto premium na substância e enxuto na execução\n- produzir saídas acionáveis, auditáveis e coláveis\n\nCONTEXTO DO PROJETO\nNome: Bússola PME — Skill Sebrae / Consulting Suite MVP\nObjetivo real: transformar o acervo documental e o portfólio pré-existente de skills\nem uma skill final Sebrae, premium porém enxuta, pronta para demonstração, GitHub,\nlanding page e apresentação de validação.\nResultado esperado neste ciclo: instrução final de build para Claude Code, arquitetura\nfinal refinada da skill Sebrae, corpus documental leve atualizado e pacote operacional\nda semana pronto para organização no Linear.\nMVP desta semana: 1 skill final Sebrae refinada com reaproveitamento seletivo das\nmelhores gems do portfólio, sem overengineering, pronta para demo, GitHub, landing\npage e publicação inicial.\n\nDONE DEFINITION\n- skill desenvolvida\n- skill testada em cenários reais\n- skill pronta para apresentação com Sebrae\n- skill publicada no GitHub\n- domínio e landing page feitos\n- primeira publicação pública da skill feita\n- novo gate e próximos passos definidos para depois de 27/04\n\nGATE FINAL\n27/04 — go / refine / no-go da skill Sebrae como MVP demonstrável e publicável\nPeríodo: 20–25/04 com gate em 27/04\n\nREGRA DE PRIORIDADE DOCUMENTAL\nUse esta ordem de precedência:\n1. Lean plan — âncora principal de decisão\n2. Plano de ação\n3. Proposta da skill\n4. Readme-Skill\n5. CONSULTING SKILL SUITE — FULL DIRECTORY\n6. ANATOMIA COMPLETA — CONSULTORIA PME\n7. Customer Journey — Consultor de Negócios × Cliente PME\n8. AUDIT_SKILLS_BUSSOLA_CORPUS.md\n9. skill atual do projeto\nSe houver divergência entre documentos, prevalece a fonte de maior prioridade,\nsalvo quando houver evidência clara de desatualização, lacuna crítica ou conflito\nfactual.\n\nMISSÃO — ETAPAS DE EXECUÇÃO (ordem obrigatória)\n\nETAPA 1 — LER E ENTENDER O PROJETO\nAnalisar o acervo e identificar:\n- objetivo real\n- escopo real do MVP\n- o que já está bom / redundante / faltando / sofisticado demais\n- o que gera rigor, clareza, diferenciação ou percepção premium\n\nETAPA 2 — FILTRAR REAPROVEITAMENTO\nPara cada ativo, classificar em:\nA. ENTRA DIRETO\nB. ENTRA ADAPTADO\nC. ENTRA DEPOIS / BACKLOG\nD. NÃO ENTRA\nCritérios de entrada: melhora clareza operacional, qualidade metodológica,\ndiferenciação, entregável, prontidão de demo/piloto, reduz retrabalho, aumenta\nconsistência sem inflar a arquitetura.\nCritérios de exclusão: duplicação, orquestração redundante, complexidade ornamental,\ncamada que não muda o valor do MVP atual, generalização prematura, automação sem\nimpacto nesta semana.\n\nAVALIAR EXPLICITAMENTE, NO MÍNIMO:\n- mode router por profundidade e tipo de tarefa\n- falsification step\n- stage-adaptive horizons\n- crisis mode\n- document dependency graph\n- context pack antes de gerar entregáveis\n- estado epistêmico INCOMPLETO\n- design tokens / consistência visual\n- validation gate antes de enviar ao Linear\n\nETAPA 3 — DEFINIR O DELTA DO PROJETO\nO que manter / adaptar / remover / adicionar / mover para backlog /\nvirar arquivo auxiliar / permanecer no núcleo / não entrar nesta versão.\n\nIMPORTANTE — A skill final NÃO deve virar:\n- consultor universal\n- orquestrador genérico de tudo\n- suíte inteira em uma skill só\n- sistema enterprise antes da hora\n\nEla deve continuar sendo:\n- skill premium, clara no propósito\n- orientada ao caso Sebrae / consultoria PME / validação\n- com rigor suficiente para impressionar sem parecer overbuilt\n- enxuta no núcleo, mais profunda apenas onde isso muda o valor do MVP\n\nETAPA 4 — PRODUZIR A INSTRUÇÃO FINAL DE BUILD\nPrompt final para Claude Code — ver SEC-06.\n\nETAPA 5 — GERAR CORPUS DOCUMENTAL LEVE\nOs 4 documentos: corpus_documental_leve.txt, plano_operacional_semana.txt,\nbuild_delta_skill_sebrae.txt, linear_pack.txt — ver SEC-02 a SEC-05.\n\nETAPA 6 — PREPARAR ORGANIZAÇÃO FINAL DO PROJETO\nEstrutura ideal, pack organizado, instrução para project-cleaner:\n- limpar redundância, organizar, normalizar nomes, agrupar por função,\n  colocar no padrão Linear.\n\nREGRAS DE EXECUÇÃO\n1. Não reescrever tudo do zero se o projeto já possui bons ativos.\n2. Reaproveitar somente o que melhora o resultado final.\n3. Premium = melhor julgamento + método + clareza + consistência + entregável.\n4. Toda camada precisa justificar sua existência.\n5. Separar sempre: fato / inferência / recomendação.\n6. Em conflito entre sofisticação e prazo: prazo vence.\n7. Em conflito entre completude e demonstrabilidade: demo vence.\n8. Não criar backlog infinito.\n9. Não transformar em sistema enterprise antes da hora.\n10. Resposta deve ser útil para execução imediata.\n11. Usar linguagem objetiva, operacional e densa.\n12. Evitar floreio e análise genérica.\n13. Preservar coerência entre objetivo, MVP, artefato final e plano operacional.\n\nCRITÉRIO DE QUALIDADE FINAL\nA resposta só está correta se:\n- usar Lean plan como âncora real\n- tratar auditoria como filtro de reuso, não convite para inflar\n- gerar prompt final forte e utilizável para Claude Code\n- gerar corpus leve realmente útil\n- organizar a semana em ordem executável\n- deixar claro o que fazer agora\n- reduzir ruído do projeto em vez de aumentá-lo\n- preparar para project-cleaner e Linear\n\nMETA FINAL\nAo terminar: direção clara + instrução final de build + corpus documental leve +\nlinear pack pronto + projeto mais limpo, coerente e executável.\n\n===========================================================\nSEC-02  CORPUS DOCUMENTAL LEVE — VISÃO DO PROJETO\n===========================================================\n\nCORPUS DOCUMENTAL LEVE — SEBRAE-AGENTE (v0.1 MVP)\nData: 2026-04-19\nStatus: em build — gate 27/04/2026\n\n1. O QUE É ESTE PROJETO\nBússola PME — Skill Sebrae / Consulting Suite MVP.\nObjetivo: transformar o acervo documental e o portfólio de skills pré-existentes\nem UMA skill única, premium e enxuta, chamada SEBRAE-AGENTE, pronta para\ndemonstração com consultor Sebrae, publicação em GitHub e base para evolução futura.\n\n2. O QUE ESTÁ SENDO CONSTRUÍDO NESTA SEMANA\n- Renomeação e refinamento da skill atual pmo-ai-validation-governor para\n  sebrae-agente, aplicando 10 deltas cirúrgicos (D1-D10) e criando 9 arquivos\n  novos (N1-N9): references/epistemic-labels.md, templates/confirmation-table.md,\n  3 examples, README, LICENSE, CHANGELOG, .gitignore.\n- GitHub público com README forte, exemplos rodáveis e estrutura legível.\n- Landing page simples de 1 página, com domínio apontando.\n- Primeira publicação pública do projeto.\n- Demo de 45 min pronta e ensaiada para o consultor Sebrae.\n\n3. RECORTE DO MVP\nUma skill única de governança operacional. NÃO é suite. NÃO produz artefatos\nfinais. NÃO faz diagnóstico de cliente. NÃO orquestra outras skills.\nEla identifica fase/decisão/risco, estrutura backlog e gates, bloqueia avanço\nsem evidência, e prepara demo/piloto.\n\nDone definition do gate 27/04:\n- [x] Skill desenvolvida (deltas D1-D10 aplicados)\n- [x] Skill testada em 2-3 cenários reais\n- [x] Skill pronta para apresentação com Sebrae (demo-runbook ensaiado)\n- [x] Skill publicada no GitHub (repo público com README forte)\n- [x] Domínio + landing page de 1 página no ar\n- [x] Primeira publicação pública feita\n- [x] Novo gate e próximos passos definidos para pós-27/04\n\n4. ATIVOS CENTRAIS\n\nA. BASE DE PARTIDA\n- Skill pmo-ai-validation-governor (SKILL.md + 8 references + 6 templates\n  + 3 scripts) — renomeada para SEBRAE-AGENTE.\n\nB. DOCUMENTOS DE DECISÃO (em ordem de prioridade)\n1. Lean plan (âncora principal)\n2. Plano de ação (playbook Sebrae específico)\n3. Proposta da skill (blueprint aprovado)\n4. Readme-Skill (build confirmation)\n\nC. REFERÊNCIAS METODOLÓGICAS (não implementar como módulos)\n5. ANATOMIA COMPLETA — Consultoria PME (grafos de fases)\n6. CONSULTING SKILL SUITE FULL DIRECTORY (versão maximalista)\n7. Customer Journey — Consultor × PME (contexto B2B)\n\nD. AUDIT DE REUSO\n8. AUDIT_SKILLS_BUSSOLA_CORPUS.md — usar como filtro; mirar apenas gems\n   aplicáveis a skill única de governança.\n\n5. LÓGICA DA SKILL FINAL\nPrincípio 1: Skill de governança, não de produção.\nPrincípio 2: Sempre operar por fase → gate → decisão → evidência.\nPrincípio 3: Toda afirmação factual recebe label epistêmico (FATO /\nINFERÊNCIA / HIPÓTESE / INCOMPLETO).\nPrincípio 4: Resposta em 3 camadas — decisão executiva (SCQA de 8 linhas) /\nplano operacional / registro auditável.\nPrincípio 5: Bloquear avanço sem evidência, sem gate humano ou com risco LGPD.\nPrincípio 6: Operar em modo crise quando houver evento agudo (runway < 6m,\nperda crítica, incidente LGPD).\nPrincípio 7: Progressive disclosure — SKILL.md curto, auxiliares carregados\nsob demanda.\n\n6. GEMS APROVADAS DO AUDIT (aplicadas à skill)\nINC-04: Falsification step no validation-ledger\nINC-06: INCOMPLETO como 4º estado epistêmico\nINC-05: SCQA framing na Camada 1\nINC-07: Stage-adaptive via company_stage no intake\nINC-02 reduzido: Modo crise binário (sem Cynefin completo)\n\n7. GEMS REJEITADAS (não cabem em skill única)\nINC-03 (work_order.json para forge — skill não forja)\nINC-08 (Design tokens — só landing, v0.2)\nINC-09 (Dependency graph — complexidade desnecessária aqui)\nEPO Mode Router A-D completo (Protocolos A-E resolvem)\nCynefin 5 domínios (overengineering)\nCapital allocation (escopo diferente)\nMandatory ID citation (escopo de skill de corpus)\n\n8. ARQUITETURA FINAL\nsebrae-agente/\n  SKILL.md                              # curto, entrada\n  references/                           # progressive disclosure\n    operating-model.md\n    phase-gates.md\n    artifacts.md\n    risk-register-taxonomy.md\n    sebrae-alignment.md                 # com mapa Radar 13 dim.\n    lgpd-guardrails.md\n    demo-runbook.md\n    pilot-readiness.md\n    epistemic-labels.md                 # NOVO — 4 estados\n  templates/\n    project-intake.md                   # com company_stage\n    decision-log.md\n    validation-ledger.md                # com falsificação obrig.\n    backlog.md\n    weekly-review.md                    # SCQA no resumo exec.\n    stakeholder-feedback.md\n    confirmation-table.md               # NOVO\n  scripts/\n    normalize_briefing.py\n    build_status_snapshot.py\n    export_decision_pack.py\n  examples/\n    example-01-demo-readiness.md        # NOVO\n    example-02-pilot-decision.md        # NOVO\n    example-03-feedback-synthesis.md    # NOVO\n  README.md                             # NOVO — GitHub-ready\n  LICENSE                               # NOVO — MIT\n  CHANGELOG.md                          # NOVO — v0.1\n  .gitignore                            # NOVO\n\n9. O QUE FICA FORA DO ESCOPO DESTA SEMANA\n- Integração Linear MCP hardwired\n- Radar da Inovação como módulo executável com scoring\n- Business case com ROI 3 cenários (financial modeler)\n- Kit de entrevistas estruturadas\n- Design tokens para PDFs e landing\n- Multi-nível de entregável (exec/complete/technical)\n- Qualquer skill satélite ou orquestradora\n- Simulação de cenários / Dashboard visual / CRM e pricing\n\n10. PRÓXIMO GATE (pós-27/04)\nPeríodo: 28/04 - 04/05.\nObjetivo: validar reação real de 3-5 pessoas-alvo (incluindo o consultor Sebrae\nda reunião) e decidir entre:\nA. manter como ativo de demonstração pessoal\nB. seguir para piloto real com consultor Sebrae\nC. evoluir para produto/licença\n\n===========================================================\nSEC-03  BUILD DELTA — O QUE MUDA DA BASE PARA v0.1\n===========================================================\n\nBUILD DELTA — SEBRAE-AGENTE v0.1\n(em relação à skill atual pmo-ai-validation-governor)\nData: 2026-04-19\n\nOBJETIVO\nDocumentar de forma auditável o que mudou da base para a v0.1, com origem\nda decisão e motivo de cada alteração.\n\n---\n1. MANTIDO (sem alteração)\n---\n1.1 Estrutura de diretórios: SKILL.md + references/ + templates/ + scripts/\n1.2 SKILL.md — seções preservadas:\n    - Missão (identidade da skill)\n    - Quando ativar esta skill\n    - Regras absolutas (regras 1, 2, 3, 5, 6, 7, 8)\n    - Sequência padrão de operação (4 etapas)\n    - Protocolos de saída A, B, C, D, E\n    - Métrica de qualidade\n    - 3 exemplos rápidos\n    - Troubleshooting\n    - Referências internas (lista)\n1.3 references/ — 8 arquivos mantidos (com exceções listadas em seção 2):\n    operating-model.md, phase-gates.md, artifacts.md, risk-register-taxonomy.md,\n    sebrae-alignment.md, lgpd-guardrails.md, demo-runbook.md, pilot-readiness.md\n1.4 templates/ — 6 arquivos mantidos (com exceções listadas em seção 2):\n    project-intake.md, decision-log.md, validation-ledger.md, backlog.md,\n    weekly-review.md, stakeholder-feedback.md\n1.5 scripts/ — 3 arquivos mantidos sem alteração:\n    normalize_briefing.py, build_status_snapshot.py, export_decision_pack.py\n\n---\n2. ADAPTADO (refinamentos cirúrgicos — deltas D1-D10)\n---\nD1. SKILL.md — frontmatter\n    ANTES: name: pmo-ai-validation-governor\n    DEPOIS: name: sebrae-agente + description expandida com triggers PT-BR\n    Origem: decisão do produto (renomeação) + projects-to-linear (triggers PT-BR)\n    Motivo: posicionamento público Sebrae-facing; clareza de trigger.\n\nD2. SKILL.md — nova seção \"Quando NÃO ativar esta skill\"\n    ANTES: mencionado ao final de \"Quando ativar\" em 1 linha\n    DEPOIS: seção dedicada com 4 cenários + princípio \"minimum sufficient mode\"\n    + self-exemption + language policy\n    Origem: AUDIT hunter4-1 + projects-to-linear\n    Motivo: previne superativação em pedidos triviais.\n\nD3. SKILL.md — Regra absoluta #4\n    ANTES: \"Nunca misture fato, inferência e hipótese. Rotule sempre.\"\n    DEPOIS: \"Nunca misture fato, inferência, hipótese e dado ausente. Rotule\n    explicitamente com [FATO], [INFERÊNCIA], [HIPÓTESE] ou [INCOMPLETO].\"\n    Origem: AUDIT INC-06 (refatorar-documentos: marque INCOMPLETO)\n    Motivo: fecha a lógica epistêmica; INCOMPLETO bloqueia avanço explicitamente.\n\nD4. references/operating-model.md — Camada 1 em SCQA\n    ANTES: lista de 4 bullets (onde estamos, o que importa, risco, próximo passo)\n    DEPOIS: estrutura Situation → Complication → Question → Answer, máx 8 linhas\n    Origem: AUDIT INC-05 (EPO — SCQA de Barbara Minto)\n    Motivo: legibilidade para stakeholder executivo.\n\nD5. references/operating-model.md — nova seção \"Modo Crise\"\n    ANTES: nada explícito\n    DEPOIS: 4 sinais objetivos + protocolo de operação em 24-72h\n    Origem: AUDIT INC-02 reduzido (Cynefin Caótico bypass) + ceo-advisor\n    Motivo: PMEs em dificuldade aguda precisam de ações em 48h, não 90 dias.\n    Implementação: decisão binária SEM Cynefin 5 domínios.\n\nD6. references/phase-gates.md — gates HARDCODED marcados\n    ANTES: gates descritos sem destaque especial\n    DEPOIS: \"★ Gate HARDCODED — requer confirmação humana explícita\" marcado\n    nos gates F2, F3, F4 (demo release, stakeholder, abertura de piloto)\n    Origem: bussola-execution-bridge (pattern G6 hardcoded)\n    Motivo: padrão de governança mais forte do portfólio.\n\nD7. templates/project-intake.md — campo company_stage\n    ANTES: 10 campos de contexto\n    DEPOIS: 10 campos + company_stage [startup | growth | mature | crisis]\n    Origem: AUDIT INC-07 (ceo-advisor stage-adaptive horizons, reduzido)\n    Motivo: crisis=2sem, startup=3m, growth=6m, mature=12m. Parâmetro simples.\n\nD8. templates/validation-ledger.md — coluna de falsificação\n    ANTES: colunas de hipótese, label, evidência, status, teste\n    DEPOIS: adiciona coluna \"critério de falsificação\" obrigatória para promover\n    hipótese a validada\n    Origem: AUDIT INC-04 (corpus-analyst + hunter4-1)\n    Motivo: evita confirmation bias; hipótese não pode ser marcada \"validada\"\n    sem critério de falsificação preenchido e evidência checada = S.\n\nD9. templates/weekly-review.md — SCQA no resumo executivo\n    ANTES: resumo livre em prosa\n    DEPOIS: estrutura SCQA (4 sentenças máximo) no topo\n    Origem: AUDIT INC-05 (EPO SCQA)\n    Motivo: coerência com Camada 1 do operating-model.\n\nD10. references/sebrae-alignment.md — mapa Radar 13 dimensões\n    ANTES: Radar mencionado como referência de leitura multidimensional\n    DEPOIS: tabela explícita das 13 dimensões × cobertura da skill (com\n    \"não cobre\" honestos)\n    Origem: Plano_de_ação (Lacuna 2 — SEBRAE ALI) + ANATOMIA_COMPLETA\n    Motivo: transparência sobre o que a skill cobre vs o que o consultor faz.\n    Radar fica como referência, não módulo.\n\n---\n3. ADICIONADO (arquivos novos — N1-N9)\n---\nN1. references/epistemic-labels.md\n    Função: definir FATO / INFERÊNCIA / HIPÓTESE / INCOMPLETO com regras\n    de quando usar e quando INCOMPLETO bloqueia avanço.\n    Origem: AUDIT INC-06 destilado\n\nN2. templates/confirmation-table.md\n    Função: tabela de confirmação antes de veredito go/refine/stop ou efeito\n    externo irreversível.\n    Origem: projects-to-linear (validation gate pattern)\n\nN3. examples/example-01-demo-readiness.md\nN4. examples/example-02-pilot-decision.md\nN5. examples/example-03-feedback-synthesis.md\n    Função: exemplos rodáveis cobrindo os 3 cenários já citados em SKILL.md,\n    com output completo nas 3 camadas.\n    Origem: Lean plan (done definition exige 2-3 cenários testados)\n\nN6. README.md — GitHub-ready\n    Motivo: repo público exige README forte; parte do done definition.\n\nN7. LICENSE — MIT\n    Motivo: permissivo, padrão de skills públicas.\n\nN8. CHANGELOG.md — v0.1\n    Motivo: rastreabilidade de versão.\n\nN9. .gitignore — Python básico\n    Motivo: higiene de repo.\n\n---\n4. REMOVIDO\n---\nNenhuma remoção substantiva.\nValidação pendente: testar scripts/*.py para confirmar funcionamento.\nSe puramente ornamentais, remover antes de publicar.\n\n---\n5. REJEITADO (avaliado e não incorporado)\n---\nINC-03 (work_order.json): SEBRAE-AGENTE não forja artefatos finais para cliente.\nINC-08 (Design tokens): útil para landing/PDFs, não para a skill. Backlog v0.2.\nINC-09 (Document dependency graph): valor em sistemas multi-artefato, não aqui.\nEPO Mode Router A-D completo: Protocolos A-E atuais cumprem a mesma função.\nCynefin 5 domínios: parade of frameworks; mantido apenas bypass binário.\nCapital allocation priority order: escopo de portfólio, não de 1 projeto.\nMandatory ID citation: cabe em corpus-analyst, não aqui.\nhandoff-protocol.md (MAO): single skill não orquestra outras.\n6 gargalos estruturais hunter4-1: ornamentação didática.\nThree-mode protocol corpus-analyst: redundante com Protocolos A-E atuais.\n\n---\n6. BACKLOG (pós 27/04 — candidatos a v0.2)\n---\nB.1 Integração Linear MCP hardwired (dependência: sinal de piloto real)\nB.2 bussola_design_tokens.md para landing e PDFs de demo\nB.3 Radar da Inovação como módulo com scoring das 13 dimensões\nB.4 Business case com ROI 3 cenários (financial modeler)\nB.5 Document dependency graph entre artefatos\nB.6 Stage-adaptive horizons completo (não só campo intake)\nB.7 Kit de entrevistas estruturadas\nB.8 Capital allocation priority order\nB.9 Three-mode Consulta / Análise / Validação\nB.10 Handoff-protocol caso skill vire suite\n\n---\n7. PRINCÍPIOS DO DELTA\n---\nP1. Toda adição precisa de origem declarada e motivo operacional.\nP2. Gem do audit só entra se couber em SKILL ÚNICA de governança.\nP3. Em dúvida: não adiciona. O Lean plan é a âncora.\nP4. Premium = rigor + clareza. Não mais camadas.\nP5. Build deve ser reversível: cada delta pode ser desfeito sem quebrar o restante.\n\n===========================================================\nSEC-04  PLANO OPERACIONAL DA SEMANA\n===========================================================\n\nPLANO OPERACIONAL DA SEMANA — SEBRAE-AGENTE\nPeríodo: 20/04 - 25/04/2026 (+ gate 27/04)\nCapacidade: 24h totais, 4h/dia\n\nPRINCÍPIO DE EXECUÇÃO\nSequência rígida. Dia N só começa com saída do dia N-1 fechada.\nEm conflito entre sofisticação e prazo: prazo vence.\nEm conflito entre completude e demonstrabilidade: demo vence.\n\n---\nDIA 1 — SEG 20/04 (4h) — FUNDAÇÃO DECISÓRIA\n---\nOBJETIVO: Fechar tese, recorte e decisões-base para destravar build.\n\nT1.1 [1h] — Aprovar delta da skill\n  Ler build_delta_skill_sebrae.txt (SEC-03).\n  Confirmar ou ajustar: nome final (SEBRAE-AGENTE), deltas D1-D10,\n  arquivos novos N1-N9.\n  Critério de pronto: decisão registrada em decision-log.\n\nT1.2 [1h] — Fechar posicionamento da skill\n  1 frase de descrição para landing + GitHub + frontmatter.\n  Exemplo alvo: \"Skill de governança operacional para projetos de\n  validação de soluções AI-first em consultoria PME, com aderência\n  SEBRAE/ALI e guardrails LGPD.\"\n  Critério de pronto: frase aprovada.\n\nT1.3 [1h] — Fechar escopo do MVP e não-escopo\n  Confirmar SEC-02, seções 3 e 9.\n  Critério de pronto: escopo MVP e lista de backlog assinados mentalmente.\n\nT1.4 [1h] — Setup de ambiente\n  Criar repo local. Apontar domínio (ou subdomínio temporário).\n  Confirmar acesso a Claude Code.\n  Critério de pronto: ambiente funcional para build do dia 2.\n\nCHECKPOINT DIÁRIO: Decisões registradas. Posicionamento aprovado. Ambiente pronto.\n\n---\nDIA 2 — TER 21/04 (4h) — BUILD DO NÚCLEO\n---\nOBJETIVO: Skill rodando com deltas D1-D6 aplicados.\n\nT2.1 [2h] — Aplicar deltas D1, D2, D3 no SKILL.md\n  Critério: SKILL.md renomeado + seção \"Quando NÃO ativar\" + Regra #4 atualizada.\n\nT2.2 [1h] — Aplicar deltas D4, D5 em operating-model.md\n  SCQA na Camada 1 + seção Modo Crise.\n  Critério: operating-model.md atualizado e validado por leitura própria.\n\nT2.3 [1h] — Aplicar delta D6 em phase-gates.md\n  Marcar gates HARDCODED.\n  Critério: phase-gates.md com destaques visíveis.\n\nCHECKPOINT DIÁRIO: 3 arquivos atualizados. Sem regressão. Skill carregável.\n\n---\nDIA 3 — QUA 22/04 (4h) — TEMPLATES E REFERENCES\n---\nOBJETIVO: Templates atualizados + arquivos novos criados.\n\nT3.1 [1h] — Aplicar deltas D7, D8, D9 em templates\n  project-intake.md + company_stage\n  validation-ledger.md + coluna falsificação\n  weekly-review.md com SCQA no resumo\n  Critério: 3 templates atualizados.\n\nT3.2 [1h] — Aplicar delta D10 em sebrae-alignment.md\n  Adicionar mapa tabular Radar 13 dimensões × cobertura da skill.\n  Critério: sebrae-alignment com mapa novo.\n\nT3.3 [1h] — Criar N1 (epistemic-labels.md) e N2 (confirmation-table.md)\n  Usar conteúdo do CLAUDE_CODE_PROMPT (SEC-06, seção N1 e N2).\n  Critério: 2 arquivos novos criados e linkados no SKILL.md.\n\nT3.4 [1h] — Verificação de consistência\n  Ler SKILL.md do início ao fim. Checar que todos os links para references/\n  e templates/ batem. Corrigir divergências.\n  Critério: skill consistente end-to-end.\n\nCHECKPOINT DIÁRIO: 5 templates/references atualizados ou criados.\nSKILL.md consistente com todos os arquivos auxiliares.\n\n---\nDIA 4 — QUI 23/04 (4h) — EXAMPLES, TESTES E CORREÇÃO\n---\nOBJETIVO: Skill testada em cenários reais + ajustes aplicados.\n\nT4.1 [1h30] — Criar N3, N4, N5 (3 examples)\n  example-01-demo-readiness.md (projeto confuso → F2)\n  example-02-pilot-decision.md (pós-reunião → F3/F4)\n  example-03-feedback-synthesis.md (feedback disperso)\n  Critério: 3 examples rodáveis como referência real.\n\nT4.2 [1h30] — Testar a skill em 2-3 cenários reais\n  Teste A: usar a skill com seu próprio projeto atual.\n  Teste B: usar a skill simulando o briefing de uma empresa conhecida.\n  Teste C (opcional): pessoa fora do projeto testa com pedido seu.\n  Critério: 2 cenários executados, feedback anotado.\n\nT4.3 [1h] — Aplicar correções pós-teste\n  Apenas correções críticas — não ampliar escopo.\n  Critério: skill considerada \"apresentável\".\n\nCHECKPOINT DIÁRIO: 3 examples publicados. 2-3 testes executados.\nCorreções críticas aplicadas.\n\n---\nDIA 5 — SEX 24/04 (4h) — GITHUB, LANDING, DOMÍNIO\n---\nOBJETIVO: Ativos públicos no ar.\n\nT5.1 [2h] — GitHub público\n  Criar README.md (base: N6 do SEC-06).\n  Adicionar LICENSE (MIT) e CHANGELOG.md (v0.1).\n  Adicionar .gitignore.\n  Subir para GitHub público.\n  Critério: repo público, README legível, estrutura navegável.\n\nT5.2 [1h] — Landing page 1 página\n  Hero + problema que resolve + o que faz + para quem é + status v0.1 MVP.\n  CTA: \"solicitar demo\" ou \"ver no GitHub\".\n  Ferramenta: Framer / Notion público / HTML estático.\n  Critério: landing no ar.\n\nT5.3 [1h] — Domínio apontado\n  Comprar ou reaproveitar domínio curto e confiável.\n  Apontar para a landing.\n  Se propagação DNS demorar, aceitar subdomínio temporário.\n  Critério: URL pública funcionando.\n\nCHECKPOINT DIÁRIO: Repo GitHub público. Landing no ar. Domínio ou URL funcional.\n\n---\nDIA 6 — SÁB 25/04 (4h) — PUBLICAÇÃO, ENSAIO, QA\n---\nOBJETIVO: Publicação feita. Demo ensaiada. Projeto fechado para o gate.\n\nT6.1 [1h] — Publicação inicial pública\n  Post curto em 1 canal (LinkedIn / Twitter / newsletter / grupo).\n  Estrutura: problema observado → o que construí → para quem faz sentido →\n  o que já está pronto → o que vou validar → CTA.\n  Critério: 1 publicação feita.\n\nT6.2 [1h] — Ensaio da demo Sebrae\n  Usar references/demo-runbook.md.\n  Executar o pitch de 45 min com pessoa real (não o consultor Sebrae).\n  Anotar fricções.\n  Critério: demo ensaiada + 1 round de ajustes.\n\nT6.3 [1h] — Checklist final de QA\n  [ ] SKILL.md renomeado, sem referências a pmo-ai-validation-governor\n  [ ] 9 references/ presentes e linkados\n  [ ] 7 templates/ presentes e linkados\n  [ ] 3 examples/ presentes\n  [ ] README, LICENSE, CHANGELOG, .gitignore\n  [ ] Repo GitHub público e navegável\n  [ ] Landing no ar com URL funcional\n  [ ] 1 publicação feita\n  [ ] Demo ensaiada\n  Critério: checklist 100% verde.\n\nT6.4 [1h] — Buffer para correção final\n  Reservado. Usar só se algo do checklist falhar.\n\nCHECKPOINT DIÁRIO: Publicação feita. Demo ensaiada. Checklist 100%.\n\n---\nGATE — SEG 27/04 — DECISÃO\n---\nCRITÉRIO DE GATE\nReunião Sebrae acontece com skill funcional, demo ensaiada,\nmaterial público disponível.\n\nPOSSÍVEIS VEREDITOS\nGO — skill pronta, consultor interessado, seguir para piloto\n  Próximo passo: abrir pilot-readiness para empresa indicada pelo consultor.\n\nREFINE — skill boa, mas 1-2 ajustes críticos antes de próximo estágio\n  Próximo passo: backlog de ajustes em 48-72h.\n\nNO-GO — escopo disperso, narrativa fraca ou skill não confiável\n  Próximo passo: pausa, review completa, volta ao F0.\n\nRegistrar veredito em decision-log.md.\n\n---\nDEPENDÊNCIAS CRÍTICAS\n---\nDia 2 depende de dia 1 (deltas aprovados)\nDia 3 depende de dia 2 (skill rodando)\nDia 4 depende de dia 3 (skill completa para testar)\nDia 5 depende de dia 4 (skill testada para publicar)\nDia 6 depende de dia 5 (ativos públicos para anunciar)\nGate depende de dia 6 (material pronto)\n\n---\nREGRAS DE ESCOPO\n---\n1. Nenhuma funcionalidade fora do SEC-06 (deltas D1-D10 + N1-N9) entra esta semana.\n2. Se surgir ideia \"genial\" durante o build, anotar em backlog v0.2 e seguir.\n3. Se algum dia estourar, cortar do próximo dia, não do atual.\n4. Buffer do dia 6 é para qualidade, não para features extras.\n5. Em caso de bloqueio crítico, acionar modo crise (operating-model).\n\n===========================================================\nSEC-05  LINEAR PACK — ESTRUTURA OPERACIONAL PARA O LINEAR\n===========================================================\n\nLINEAR PACK — SEBRAE-AGENTE v0.1 MVP\nData: 2026-04-19\n\nPROJETO\nNome: SEBRAE-AGENTE v0.1 — MVP Validação Sebrae\nDescrição: Skill única de governança operacional para projetos de validação de\nsoluções AI-first em consultoria PME, com aderência Sebrae/ALI e guardrails LGPD.\nBuild derivado de pmo-ai-validation-governor com 10 deltas cirúrgicos + 9 arquivos\nnovos. Entregas: skill refinada + GitHub público + landing + publicação inicial,\ncom gate 27/04/2026.\nStart: 2026-04-20 | Target: 2026-04-27 | State: Active | Priority: Urgent\nLabels: sebrae-agente, mvp, skill, validacao, gate-27-04\n\n---\nÉPICO E1 — FUNDAÇÃO DECISÓRIA (Seg 20/04)\n---\nObjetivo: fechar todas as decisões-base para destravar build.\nLabels: decision, scope | Priority: Urgent | Depends on: —\nDone: tese, posicionamento, escopo MVP e ambiente confirmados. decision-log.md criado.\n\nE1.1 — Aprovar delta completo da skill\n  - Confirmar nome SEBRAE-AGENTE, deltas D1-D10 e arquivos N1-N9\n  - Registrar em decision-log.md\n  Labels: decision, governance | Priority: Urgent | Estimate: 1h\n\nE1.2 — Fechar posicionamento (frase de descrição)\n  - Redigir frase única para landing + GitHub + frontmatter\n  Labels: positioning, copy | Priority: Urgent | Estimate: 1h | Depends on: E1.1\n\nE1.3 — Confirmar escopo MVP e não-escopo\n  - Ler e aprovar SEC-02 seções 3 e 9\n  Labels: scope, mvp | Priority: Urgent | Estimate: 1h | Depends on: E1.1\n\nE1.4 — Setup ambiente de build\n  - Repo local, domínio, acesso Claude Code\n  Labels: infrastructure | Priority: High | Estimate: 1h | Depends on: E1.1\n\n---\nÉPICO E2 — BUILD DA SKILL (Ter-Qui 21-23/04)\n---\nObjetivo: SEBRAE-AGENTE v0.1 rodando com todos os deltas e testada.\nLabels: build, skill | Priority: Urgent | Depends on: E1\nDone: diretório completo, D1-D10 aplicados, N1-N9 criados, 2-3 cenários testados.\n\nE2.1 — Aplicar deltas D1, D2, D3 no SKILL.md\n  Labels: build, skill-md | Priority: Urgent | Estimate: 2h | Depends on: E1.1\n\nE2.2 — Aplicar deltas D4, D5 em operating-model.md\n  Labels: build, references | Priority: Urgent | Estimate: 1h | Depends on: E2.1\n\nE2.3 — Aplicar delta D6 em phase-gates.md\n  Labels: build, references | Priority: High | Estimate: 1h | Depends on: E2.1\n\nE2.4 — Aplicar deltas D7, D8, D9 em templates\n  Labels: build, templates | Priority: High | Estimate: 1h | Depends on: E2.1\n\nE2.5 — Aplicar delta D10 em sebrae-alignment.md\n  Labels: build, references, sebrae | Priority: High | Estimate: 1h | Depends on: E2.1\n\nE2.6 — Criar N1 (epistemic-labels.md) e N2 (confirmation-table.md)\n  Labels: build, new-file | Priority: High | Estimate: 1h | Depends on: E2.1\n\nE2.7 — Verificação de consistência end-to-end\n  - SKILL.md completo, checar todos os links, corrigir divergências\n  Labels: build, qa | Priority: High | Estimate: 1h\n  Depends on: E2.2, E2.3, E2.4, E2.5, E2.6\n\nE2.8 — Criar 3 examples (N3, N4, N5)\n  Labels: build, examples | Priority: High | Estimate: 1h30 | Depends on: E2.7\n\nE2.9 — Testar skill em 2-3 cenários reais\n  Labels: build, testing | Priority: Urgent | Estimate: 1h30 | Depends on: E2.8\n\nE2.10 — Aplicar correções críticas pós-teste\n  Labels: build, bugfix | Priority: High | Estimate: 1h | Depends on: E2.9\n\n---\nÉPICO E3 — PRESENÇA PÚBLICA (Sex 24/04)\n---\nObjetivo: GitHub + landing + domínio no ar.\nLabels: public, distribution | Priority: High | Depends on: E2\nDone: repo público com README forte, landing de 1 página, domínio funcional.\n\nE3.1 — Criar repo GitHub público com README + LICENSE + CHANGELOG + .gitignore\n  Labels: github, public | Priority: Urgent | Estimate: 2h | Depends on: E2.10\n\nE3.2 — Criar landing page 1 página\n  Labels: landing, marketing | Priority: High | Estimate: 1h | Depends on: E1.2\n\nE3.3 — Apontar domínio para landing\n  Labels: infrastructure, domain | Priority: Medium | Estimate: 1h | Depends on: E3.2\n\n---\nÉPICO E4 — COMUNICAÇÃO E ENSAIO (Sáb 25/04)\n---\nObjetivo: publicação feita, demo ensaiada, checklist final verde.\nLabels: communication, demo | Priority: High | Depends on: E3\nDone: 1 publicação pública, demo ensaiada com pessoa real, checklist QA 100%.\n\nE4.1 — Redigir e publicar post inicial\n  Labels: publication, communication | Priority: High | Estimate: 1h | Depends on: E3.1\n\nE4.2 — Ensaiar demo Sebrae (45 min)\n  - Usar references/demo-runbook.md. Pessoa de confiança. Anotar fricções.\n  Labels: demo, rehearsal | Priority: Urgent | Estimate: 1h | Depends on: E3.1\n\nE4.3 — Checklist final QA\n  Labels: qa, checklist | Priority: Urgent | Estimate: 1h | Depends on: E4.1, E4.2\n\nE4.4 — Buffer de correção final\n  Labels: buffer | Priority: Low | Estimate: 1h\n\n---\nÉPICO E5 — GATE 27/04 — DECISÃO (Seg 27/04)\n---\nObjetivo: reunião Sebrae + veredito + registro em decision-log.\nLabels: gate, decision, sebrae | Priority: Urgent | Depends on: E4\nDone: veredito GO / REFINE / NO-GO registrado, próximos passos definidos.\n\nE5.1 — Executar reunião Sebrae de 45 min\n  Labels: meeting, sebrae | Priority: Urgent | Estimate: 1h | Depends on: E4.3\n\nE5.2 — Normalizar feedback pós-reunião\n  Labels: analysis, feedback | Priority: High | Estimate: 1h | Depends on: E5.1\n\nE5.3 — Decisão go/refine/no-go\n  - Usar confirmation-table. Registrar em decision-log. Definir próximo gate.\n  Labels: decision, gate | Priority: Urgent | Estimate: 30min | Depends on: E5.2\n  ★ Gate HARDCODED — requer confirmação humana explícita.\n\n---\nGATES HARDCODED\n---\n★ Gate pós-E2.10: aprovar build antes de publicar (E3.1)\n★ Gate pós-E4.3: checklist 100% verde antes da reunião (E5.1)\n★ Gate E5.3: decisão go/refine/no-go final — registro explícito\n\n---\nPRIORIDADES\n---\nUrgent: E1 (todo), E2.1, E2.2, E2.9, E3.1, E4.2, E4.3, E5.1, E5.3\nHigh: E1.4, E2.3, E2.4, E2.5, E2.6, E2.7, E2.8, E2.10, E3.2, E4.1, E5.2\nMedium: E3.3\nLow: E4.4 (buffer)\n\n---\nORDEM DE EXECUÇÃO RECOMENDADA\n---\nSeg 20/04: E1.1 → E1.2 → E1.3 → E1.4\nTer 21/04: E2.1 → E2.2 → E2.3\nQua 22/04: E2.4 → E2.5 → E2.6 → E2.7\nQui 23/04: E2.8 → E2.9 → E2.10\nSex 24/04: E3.1 → E3.2 → E3.3\nSáb 25/04: E4.1 → E4.2 → E4.3 → E4.4 (se necessário)\nSeg 27/04: E5.1 → E5.2 → E5.3\n\n---\nCRITÉRIO DE PRONTO GLOBAL\n---\n[ ] Diretório sebrae-agente/ com 100% da estrutura\n[ ] Todos os deltas D1-D10 aplicados\n[ ] Todos os arquivos N1-N9 criados\n[ ] Skill testada em 2-3 cenários reais\n[ ] Repo GitHub público com README, LICENSE, CHANGELOG, .gitignore\n[ ] Landing de 1 página no ar\n[ ] Domínio ou URL pública funcionando\n[ ] 1 publicação pública feita\n[ ] Demo ensaiada com pessoa real\n[ ] Reunião Sebrae executada\n[ ] Feedback normalizado\n[ ] Veredito go/refine/no-go registrado\n[ ] Próximo gate (28/04-04/05) definido com escopo\n\n===========================================================\nSEC-06  PROMPT CLAUDE CODE — INSTRUÇÃO COMPLETA DE BUILD\n===========================================================\n\n# CLAUDE CODE TASK — SEBRAE-AGENTE v0.1 (single-skill refactor, hands-off build)\n\nPrompt single-shot. Contém a skill atual completa embedida + deltas precisos.\nClaude Code executa sequencialmente, sem intervenção humana, e entrega\nZIP final + BUILD_REPORT.md.\n\n---\nPART 0 — OPERATING CONTRACT\n---\n\nO QUE CONSTRUIR\nRefatorar pmo-ai-validation-governor para a versão final sebrae-agente v0.1.\nSkill única de governança operacional. NÃO é suite. NÃO roteia para outras skills.\nNÃO produz artefatos finais de cliente. NÃO faz diagnóstico de PME.\n\nESTRUTURA FINAL DE SAÍDA\nsebrae-agente/\n├── SKILL.md                              # núcleo — máx 500 linhas\n├── references/\n│   ├── operating-model.md               # existente, modificado (D4 + D5)\n│   ├── phase-gates.md                   # existente, modificado (D6)\n│   ├── artifacts.md                     # existente, inalterado\n│   ├── risk-register-taxonomy.md        # existente, inalterado\n│   ├── sebrae-alignment.md              # existente, modificado (D10)\n│   ├── lgpd-guardrails.md               # existente, inalterado\n│   ├── demo-runbook.md                  # existente, inalterado\n│   ├── pilot-readiness.md               # existente, inalterado\n│   └── epistemic-labels.md              # NOVO (N1)\n├── templates/\n│   ├── project-intake.md                # existente, modificado (D7)\n│   ├── decision-log.md                  # existente, inalterado\n│   ├── validation-ledger.md             # existente, modificado (D8)\n│   ├── backlog.md                       # existente, inalterado\n│   ├── weekly-review.md                 # existente, modificado (D9)\n│   ├── stakeholder-feedback.md          # existente, inalterado\n│   └── confirmation-table.md            # NOVO (N2)\n├── scripts/\n│   ├── normalize_briefing.py            # existente, inalterado\n│   ├── build_status_snapshot.py         # existente, inalterado\n│   └── export_decision_pack.py          # existente, inalterado\n├── examples/\n│   ├── example-01-demo-readiness.md     # NOVO (N3)\n│   ├── example-02-pilot-decision.md     # NOVO (N4)\n│   └── example-03-feedback-synthesis.md # NOVO (N5)\n├── README.md                            # NOVO (N6)\n├── LICENSE                              # NOVO (N7) — MIT\n├── CHANGELOG.md                         # NOVO (N8) — v0.1\n└── .gitignore                           # NOVO (N9) — Python básico\n\nCONVENÇÕES GLOBAIS — NÃO NEGOCIÁVEIS\n\n1. SKILL.md <= 500 linhas. wc -l SKILL.md < 500 é critério de aceitação.\n\n2. Labels epistêmicos obrigatórios em todo claim de projeto:\n   [FATO] — fornecido pelo usuário ou observado diretamente\n   [INFERÊNCIA] — dedução forte a partir de sinais indiretos\n   [HIPÓTESE] — plausível mas não validado\n   [INCOMPLETO] — dado necessário ainda não fornecido; bloqueia avanço em campo crítico\n   Claims sem label são tratados como [HIPÓTESE] por default.\n\n3. Gates de efeito externo são HARDCODED. Nunca automatizados.\n   HARDCODED_GATES = {\"demo_release\", \"pilot_open\", \"publication\"}\n\n4. Scripts Python: shebang #!/usr/bin/env python3, docstring de topo,\n   if __name__ == \"__main__\": com exemplo comentado.\n   Saída legível; exit 0 (ok), 1 (falha), 2 (bloqueio de gate).\n\n5. Nenhum stub, nenhum TODO. Cada arquivo tem conteúdo funcional.\n\n6. Nenhum arquivo criado fora da especificação.\n\n7. Nenhuma referência a pmo-ai-validation-governor no output final.\n\n---\nPART 1 — CONTEÚDO ATUAL DA SKILL (base real de partida)\n---\n\nFILE: SKILL.md (atual — aplicar D1-D3)\n\n---\nname: pmo-ai-validation-governor\ndescription: Governa projetos de validação, demo, piloto e productização de soluções\nAI-first para PMEs brasileiras. Use when the user is running a business/product\nvalidation project, preparing a Sebrae-facing demo, organizing phases/gates/backlog/\nrisks, deciding what to do next, converting raw notes into an audit-ready execution\nplan, or needs PMO discipline with LGPD and ALI/Sebrae alignment.\n---\n\n# PMO AI Validation Governor\n\n## Missão\n1. identificar fase, objetivo, decisão pendente e risco dominante\n2. estruturar backlog, dependências, gates e critérios de pronto\n3. manter rastreabilidade entre hipótese, evidência, decisão e próximo passo\n4. preparar o projeto para demo, validação, piloto e eventual productização\n5. bloquear avanço quando faltar base jurídica, evidência, escopo ou aprovação humana\n\n## Quando ativar esta skill\n- organizar um projeto em fases, milestones, backlog ou dependências\n- decidir o próximo passo de um projeto de validação\n- preparar ou revisar demo, piloto, experimento ou reunião com stakeholder\n- transformar notas brutas em plano operacional auditável\n- montar checklist de prontidão, registro de riscos ou log de decisão\n- validar aderência metodológica a SEBRAE/ALI/5W2H/Radar da Inovação\n- avaliar se o projeto deve avançar, refinar, pausar ou encerrar\n\n## Regras absolutas\n1. Nunca trate o projeto como fluxo contínuo. Sempre opere por fase e gate.\n2. Nunca produza entregável final para cliente sem gate humano explícito.\n3. Nunca afirme que uma hipótese foi validada sem evidência observável.\n4. Nunca misture fato, inferência e hipótese. Rotule sempre.\n5. Nunca ignore risco jurídico ou de dados.\n6. Nunca assumir aderência SEBRAE sem checar references/sebrae-alignment.md.\n7. Nunca ampliar escopo por entusiasmo. Se vago, estruture o problema primeiro.\n8. Sempre devolver próximo passo executável.\n\n## Sequência padrão de operação\n\nEtapa 1 — Enquadrar o pedido\nDeclare: fase atual, objetivo imediato, decisão pendente, stakeholder principal,\nprazo, artefato esperado, risco dominante, bloqueador dominante.\n\nEtapa 2 — Classificar a fase\nF0 — tese e escopo | F1 — aderência metodológica | F2 — demo readiness |\nF3 — validação com stakeholder | F4 — piloto | F5 — productização\n\nEtapa 3 — Verificar guardrails\nDado pessoal/LGPD? Alinhamento SEBRAE/ALI? Dependência externa não validada?\nGate humano exigido? Abrir arquivos auxiliares quando aplicável.\n\nEtapa 4 — Produzir a resposta em 3 camadas\nCAMADA 1 — DECISÃO EXECUTIVA: onde estamos, o que importa, risco dominante,\npróximo passo (máximo 8 linhas).\nCAMADA 2 — PLANO OPERACIONAL: tarefas, dependências, owner, prazo, gate, evidência.\nCAMADA 3 — REGISTRO AUDITÁVEL: fatos, inferências, hipóteses, decisões, kill criteria.\n\n## Protocolos de saída\nA — Pedido vago: converter em project-intake via templates/project-intake.md\nB — Demo/reunião: abrir references/demo-runbook.md\nC — Feedback stakeholder: usar templates/stakeholder-feedback.md\nD — Priorização: abrir references/risk-register-taxonomy.md\nE — Seguir ou parar: abrir references/phase-gates.md; emitir GO / GO WITH CONDITIONS /\n    REFINE BEFORE PROCEEDING / STOP com evidência e o que mudaria o veredito.\n\n## Artefatos que pode gerar\nproject charter enxuto, backlog priorizado, decision log, validation ledger,\nrisk register, weekly executive snapshot, demo readiness checklist,\npilot scope memo, next-best-action memo.\n\n## Referências internas (progressive disclosure — carregar só quando necessário)\nreferences/operating-model.md | references/phase-gates.md | references/artifacts.md |\nreferences/risk-register-taxonomy.md | references/sebrae-alignment.md |\nreferences/lgpd-guardrails.md | references/demo-runbook.md | references/pilot-readiness.md |\ntemplates/project-intake.md | templates/decision-log.md | templates/validation-ledger.md |\ntemplates/backlog.md | templates/weekly-review.md | templates/stakeholder-feedback.md\n\n\nFILE: references/operating-model.md (atual — aplicar D4 + D5)\n\nPrincípios de operação:\n1. Projeto não é conversa: sempre converter em fase, decisão, dono e evidência.\n2. Escopo não é backlog infinito: priorizar só o que reduz risco real.\n3. Demo não é produto: otimizar para prova de valor.\n4. Piloto não é escala: exigir evidência operacional antes de generalizar.\n5. Productização não é inevitável.\n6. LGPD e confiança não são detalhes.\n7. O trabalho precisa ser reversível até onde possível.\n\nOrdem lógica de decisão:\n1. O que queremos provar nesta fase?\n2. Qual é a menor evidência que prova ou refuta isso?\n3. Qual artefato reduz essa incerteza?\n4. Quem precisa aprovar?\n5. O que pode dar errado?\n6. O que acontece se nada for feito agora?\n\nHierarquia de prioridade:\n1. Risco de invalidação da tese\n2. Risco de falha no demo/piloto\n3. Risco jurídico, reputacional ou de confiança\n4. Dependência crítica externa\n5. Clareza operacional\n6. Estética / refinamento\n\nModos de resposta: Decisão / Planejamento / Revisão / Recuperação\n\n\nFILE: references/phase-gates.md (atual — aplicar D6)\nPreservar integralmente as 6 fases F0-F5 com entradas, saídas, gates e bloqueadores.\nAdicionar apenas marcações HARDCODED conforme D6.\n\n\nFILE: templates/project-intake.md (atual — aplicar D7)\n\n# Project Intake\n\n## Identificação\n- nome do projeto:\n- data:\n- fase atual presumida:\n\n## O que o usuário quer agora\n- pedido explícito:\n- objetivo real:\n- decisão que precisa ser tomada agora:\n\n## Contexto mínimo\n- buyer / stakeholder principal:\n- prazo ou evento crítico:\n- artefato esperado:\n- restrições conhecidas:\n\n## Estado atual\n- o que já existe:\n- o que falta:\n- maior confusão atual:\n- maior risco percebido:\n\n## Evidência disponível\n### Fatos\n### Inferências\n### Hipóteses\n\n## Próximo passo sugerido\n\n\nFILE: templates/validation-ledger.md (atual — aplicar D8)\n\n# Validation Ledger\n- Hipótese:\n- Teste realizado:\n- Sinal observado:\n- Classificação do sinal: forte / médio / fraco / inconclusivo / negativo\n- Conclusão provisória:\n- Próxima ação:\n\n\nFILE: templates/weekly-review.md (atual — aplicar D9)\n\n# Weekly Executive Snapshot\n- Onde estamos:\n- O que avançou:\n- O que travou:\n- Maior risco:\n- Decisão pendente:\n- Próximo passo:\n\n\nFILE: templates/decision-log.md (inalterado)\ndata | contexto | decisão tomada | alternativas | motivo | risco residual |\nimpacto esperado | quando revisar\n\nFILE: templates/stakeholder-feedback.md (inalterado)\nFeedback bruto → Classificação (elogio vazio / sinal real / objeção / risco percebido /\npedido de adaptação / evidência comercial) → Leitura operacional → Próxima ação\n\nFILE: templates/backlog.md (inalterado)\nTabela: item | tipo | por que existe | dependência | prioridade | owner | prazo |\nevidência de conclusão\n\nScripts (inalterados — copiar):\nnormalize_briefing.py, build_status_snapshot.py, export_decision_pack.py\n\n---\nPART 2 — DELTAS A APLICAR (D1-D10) E ARQUIVOS NOVOS (N1-N9)\n---\n\nD1. SKILL.md — renomear frontmatter\nSubstituir name: pmo-ai-validation-governor por name: sebrae-agente + description\nexpandida com triggers PT-BR: \"organizar projeto\", \"preparar demo Sebrae\",\n\"decidir próximo passo\", \"preparar piloto\", \"revisar feedback de stakeholder\",\n\"checar aderência ALI/Radar/5W2H\", \"avaliar go/refine/stop\", \"montar checklist\",\n\"transformar notas em plano\".\n\nD2. SKILL.md — inserir seção \"Quando NÃO ativar esta skill\" APÓS \"Quando ativar\"\nNão ativar quando:\n- pedido pode ser respondido com conhecimento factual direto sem análise de projeto\n- pedido é puramente criativo ou redacional sem governança associada\n- pedido é pesquisa avulsa sem projeto, fase ou decisão associada\n- já existe resposta óbvia que não exige análise de fase/gate/risco\nPrincípio: use a menor arquitetura de interação suficiente.\nRegra de self-exemption: esta skill não se chama a si mesma.\nLanguage policy: reasoning interno pode ser em inglês; interação com usuário em PT-BR.\n\nD3. SKILL.md — Regra Absoluta #4\nSubstituir por: \"Nunca misture fato, inferência, hipótese e dado ausente. Rotule\nexplicitamente com [FATO], [INFERÊNCIA], [HIPÓTESE] ou [INCOMPLETO]. Ver\nreferences/epistemic-labels.md. [INCOMPLETO] em campo crítico bloqueia avanço\nda Camada 2 e do veredito da Camada 3.\"\n\nD4. references/operating-model.md — Camada 1 em SCQA\nSubstituir lista de 4 bullets por:\nSituation — onde estamos agora (1 frase factual, com label epistêmico)\nComplication — o que mudou, trava ou cria urgência (1 frase)\nQuestion — a pergunta real que precisa ser respondida agora\nAnswer — resposta direta + próximo passo executável\nMáximo 8 linhas totais. Fonte: SCQA de Barbara Minto (Pyramid Principle, 1987).\n\nD5. references/operating-model.md — adicionar seção \"Modo Crise\" ao final\nAtivar quando PELO MENOS UM destes sinais:\n- prazo crítico perdido ou em risco iminente (< 48h)\n- dependência externa crítica quebrada sem plano B confirmado\n- evento reputacional ou jurídico ativo (incidente LGPD, parceiro saindo)\n- decisão de continuidade travada por mais de 1 semana sem movimento\nEm modo crise: horizonte de 24-72h, deliverable de 1 página, suspender rituais\nnão essenciais, retomar cadência quando estabilizado.\nNão confundir modo crise com urgência percebida. Modo crise é fato observável.\n\nD6. references/phase-gates.md — marcar gates HARDCODED\nEm cada gate que precede efeito externo irreversível, adicionar:\n\"★ Gate HARDCODED — requer confirmação humana explícita antes de qualquer efeito\nexterno (envio a stakeholder, publicação, abertura de piloto real). Nunca automático.\"\nAplicar em: F2 (demo para stakeholder externo), F3 (ir para piloto),\nF4 (abrir piloto com empresa real com compromisso formalizado).\n\nD7. templates/project-intake.md — adicionar ao bloco \"Contexto mínimo\"\n- company_stage: [startup | growth | mature | crisis]\n  (startup = pré-PMF ou runway < 12m | growth = PMF validado, crescendo |\n   mature = operação estável | crisis = runway < 6m ou evento crítico)\nAdicionar nota ao final:\nhorizonte por company_stage: crisis=2sem, startup=3m, growth=6m, mature=12m.\n\nD8. templates/validation-ledger.md — substituir template completo adicionando:\n- Label epistêmico atual: HIPÓTESE | INFERÊNCIA | FATO | INCOMPLETO\n- Critério de falsificação (obrigatório): qual evidência refutaria esta hipótese?\n  Essa evidência foi checada? (S / N / PENDENTE)\n- Status: aberta | validada | refutada | incompleta\nRegra: hipótese não pode ser \"validada\" sem critério de falsificação preenchido\ne evidência checada = S.\n\nD9. templates/weekly-review.md — substituir template completo com SCQA no topo:\nResumo SCQA (Camada 1): Situation / Complication / Question / Answer\nDetalhe operacional (Camada 2): avançou / travou / maior risco / decisões pendentes /\ntarefas próxima semana (tabela: tarefa | owner | prazo | gate | evidência de conclusão)\nRegistro auditável (Camada 3): fatos / inferências / hipóteses / kill criteria\n\nD10. references/sebrae-alignment.md — adicionar ao final mapa Radar 13 dimensões\nTabela: # | Dimensão Radar | Cobertura da skill | Como aparece no output\nDimensões 3 (Marca), 8 (Rede e parcerias), 12 (Sustentabilidade) = \"Não cobre — —\"\nA skill NÃO implementa o Radar como módulo de scoring oficial.\nUsa como referência de leitura multidimensional.\n\nN1. references/epistemic-labels.md — criar com:\n4 estados: [FATO] / [INFERÊNCIA] / [HIPÓTESE] / [INCOMPLETO]\nRegras operacionais: 5 regras de uso e conversão entre labels\nTabela de conversão: label inicial | evidência obtida | label após\n\nN2. templates/confirmation-table.md — criar tabela de confirmação\nCampos: Fase atual | Decisão pendente | Gate aplicável | Gate HARDCODED? |\nEvidência principal | Riscos abertos (top 2) | Próximo passo proposto |\nConfirmação humana (PENDENTE / CONFIRMADA)\nRegra: skill exibe tabela → usuário confirma → sem confirmação = skill não age.\n\nN3. examples/example-01-demo-readiness.md — criar exemplo F2\nCenário: \"Tenho reunião com Sebrae em 5 dias. Material disperso. O que faço primeiro?\"\nOutput: 3 camadas completas (SCQA + backlog + labels epistêmicos).\nDemonstrar: phase-gates F2 + demo-runbook + checklist técnico + LGPD mínimo.\n\nN4. examples/example-02-pilot-decision.md — criar exemplo F3/F4\nCenário: \"Reunião foi boa. Consultor pediu para mandar material. Vou para piloto?\"\nOutput: Protocolo C (normalização feedback) + Protocolo E (veredito GO WITH CONDITIONS)\n+ pilot-readiness + confirmation-table + labels.\n\nN5. examples/example-03-feedback-synthesis.md — criar exemplo feedback\nCenário: \"Consultor gostou mas disse que faltou confiança e clareza.\"\nOutput: stakeholder-feedback normalizado + validation-ledger atualizado + próximas ações.\n\nN6. README.md — criar GitHub-ready com:\nProblema que resolve | O que a skill faz | Casos de uso | Arquitetura (ASCII tree) |\nComo usar (3 passos) | Filosofia de design | Roadmap v0.2 | Licença\n\nN7. LICENSE — MIT (Copyright 2026 SEBRAE-AGENTE)\n\nN8. CHANGELOG.md — v0.1.0 — 2026-04-20\nListar todos os deltas D1-D10 e arquivos N1-N9 adicionados.\n\nN9. .gitignore — Python básico\n__pycache__/ | *.py[cod] | .env | .venv | env/ | venv/ | .vscode/ | .idea/ |\n.DS_Store | *.log | /tmp/\n\n---\nPART 3 — ACCEPTANCE TESTS\n---\n\nExecute TODOS antes de entregar. Se qualquer teste falhar, corrija primeiro.\n\nA. wc -l SKILL.md < 500 (critério hard de aceitação)\nB. grep -r \"pmo-ai-validation-governor\" . (deve retornar zero)\nC. Verificar 26 arquivos presentes conforme estrutura\nD. Scripts: shebang + main block presentes\nE. Scripts: python3 -m py_compile sem erro\nF. normalize_briefing funciona com input de teste\nG. build_status_snapshot funciona com input de teste\nH. export_decision_pack funciona com múltiplos inputs\nI. Deltas D1-D10 verificados: name:sebrae-agente | \"Quando NÃO ativar\" |\n   INCOMPLETO | SCQA em operating-model | Modo Crise | HARDCODED em phase-gates |\n   company_stage em intake | falsificação em ledger | SCQA em weekly | Radar em sebrae\nJ. Arquivos N1-N9 com conteúdo mínimo verificado\n\n---\nPART 4 — DELIVERY\n---\n\nGerar BUILD_REPORT.md com: data, base skill, versão, total arquivos,\ntabela de deltas D1-D10 e arquivos N1-N9, acceptance results, evals para rodar\nmanualmente em conversa Claude, próximos passos.\n\nEmpacotamento:\nzip -r sebrae-agente-v0.1.zip sebrae-agente/ -x \"*.pyc\" -x \"__pycache__/*\" -x \".git/*\"\n\nUsar present_files para entregar:\n1. sebrae-agente-v0.1.zip\n2. sebrae-agente/BUILD_REPORT.md\nMensagem de 5 linhas: arquivos criados, deltas aplicados, acceptance tests,\npróximos passos.\n\n---\nPART 5 — INSTRUÇÕES DE EXECUÇÃO PARA CLAUDE CODE\n---\n\n1. Leia PART 0 inteiro antes de criar qualquer arquivo.\n2. Crie o diretório sebrae-agente/ com a estrutura completa.\n3. Copie os arquivos de PART 1 como base, aplicando deltas de PART 2 durante a escrita.\n4. Crie os arquivos novos (N1-N9) com conteúdo funcional e completo.\n5. TODO tracking (checklist de todos os arquivos a criar/modificar).\n6. Gate crítico: SKILL.md < 500 linhas ANTES de rodar acceptance tests.\n7. Nenhum stub ou TODO em arquivo entregue.\n8. Examples (N3, N4, N5) devem ser completos e realistas — output nas 3 camadas\n   com labels epistêmicos.\n9. Entregar ZIP + BUILD_REPORT + mensagem de 5 linhas.\n\nComece agora.\n\n===========================================================\nSEC-07  AUDIT DE SKILLS — BÚSSOLA CORPUS\n===========================================================\n\nAUDIT DE SKILLS — LENTE SKILL-CREATOR + EXECUTIVE ADVISOR\nObjetivo: Eliminar redundância, identificar overengineering, extrair gems para\no corpus Bússola PME.\nVersão: 1.0 | Data: 2026-04-19\nMetodologia: Measure → Modify → Audit → Improve (skill-creator framework)\nEscopo: 11 skills não-Bússola + família Bússola como referência canônica\n\nNOTA DE USO NESTE CORPUS: Usar como filtro de reuso — apenas gems aplicáveis\nà skill única de governança. Gems rejeitadas para esta semana estão listadas\nem SEC-03, seção 5.\n\n---\nMAPA DO UNIVERSO\n---\nG0 — INFRA DE ORQUESTRAÇÃO: multi-agent-orchestrator (MAO), agent-orchestration\nG1 — INTELIGÊNCIA DE NEGÓCIO: business-docx-pipeline, ceo-advisor, hunter4-1,\n     refatorar-documentos, executive-planning-orchestrator (EPO), corpus-analyst-altas\nG2 — EXECUÇÃO / INTEGRAÇÃO: projects-to-linear\nG3 — OUTPUT / ARTEFATO: executive-artifact-system\nFAMÍLIA BÚSSOLA (referência canônica): bussola-orchestrator, bussola-personalization,\nbussola-diagnostic-engine, bussola-deliverable-forge, bussola-consultative-faq,\nbussola-execution-bridge, bussola-simulation-lab, bussola-case1-showroom\n\n---\nAUDITORIA POR GRUPO — DIAGNÓSTICOS E GEMS\n---\n\nG0 — multi-agent-orchestrator (MAO)\nScore clareza: 8/10 | Overengineering ALTO: 4 reference files para roteamento\nque poderia ser inline | Redundância com Bússola: ALTA (80% overlap)\nGems para Bússola: handoff-protocol.md (schema explícito de transferência de estado),\nquality-gates.md (critérios verificáveis por tipo de artefato)\n\nG0 — agent-orchestration\nScore clareza: 4/10 | Underspecified | Redundância: TOTAL com MAO\nAção: DEPRECAR (subconjunto inferior do MAO, sem valor incremental)\n\nG1 — hunter4-1\nScore: 9/10 | Overengineering BAIXO | Problema: amarrado ao contexto ALTAS Habilidades\nGems para Bússola/SEBRAE-AGENTE:\n  INC-01: MODE ROUTER (EXPLORE/EVALUATE/DECIDE/EXECUTE) — mínima arquitetura de\n          interação suficiente para dificuldade cognitiva da tarefa\n  INC-04: Falsification step — hipóteses devem ser falsificáveis antes de decidir\n  Princípio: \"minimum sufficient mode\" incorporado em D2 desta semana\n\nG1 — ceo-advisor\nScore: 7/10 | Overengineering MODERADO (scripts Python decorativos)\nGems aprovadas para esta semana:\n  INC-07 reduzido: company_stage como campo de intake (incorporado em D7)\n  INC-02 reduzido: crisis mode binário (incorporado em D5)\nGems para backlog: capital allocation priority order, stage-adaptive horizons completo\n\nG1 — executive-planning-orchestrator (EPO)\nScore: 6/10 | Overengineering CRÍTICO (19 RIDs, 13 frameworks em cascata)\nGems aprovadas para esta semana:\n  INC-05: SCQA framing (incorporado em D4 e D9)\nGems para backlog: Cynefin pre-diagnostic, Mode Router lite/full\nAção recomendada: refatorar EPO reduzindo para 6 RIDs core\n\nG1 — business-docx-pipeline\nScore: 9/10 | Overengineering BAIXO | Bem estruturado\nGems para backlog (não esta semana):\n  B.5: Document dependency graph (portão relacional, não temporal)\n  B.3: Context Pack antes de gerar entregável\n\nG1 — refatorar-documentos\nScore: 9/10 | Overengineering BAIXO | Escopo tático único\nGems aprovadas para esta semana:\n  INC-06: INCOMPLETO como 4º estado epistêmico (incorporado em D3)\n  Princípio: \"nunca invente fatos ausentes, marque INCOMPLETO\"\n\nG1 — corpus-analyst-altas\nScore: 5/10 generalização | Metodologia boa, zero generalização fora de ALTAS\nGems aprovadas para esta semana:\n  INC-04: falsification step obrigatório (incorporado em D8)\nGems para backlog: three-mode protocol (Consulta/Análise/Validação)\n\nG2 — projects-to-linear\nScore: 9/10 | Overengineering BAIXO | Redundância: TOTAL com bussola-execution-bridge\nGem aprovada:\n  Validation gate com mensagem de confirmação (incorporado em N2)\n\nG3 — executive-artifact-system\nScore: 9/10 | Design tokens são prática real de design systems\nGems para backlog: B.2 design tokens, decision tree antes de produzir\n\n---\nO QUE É OVERENGINEERING (definição operacional)\n---\nParade de frameworks: empilhar N frameworks sem critério de seleção por contexto.\nProcesso para processo: steps que organizam outros steps sem produzir output.\nCódigo decorativo: scripts Python que replicam thinking sem valor computacional.\nTaxonomia de renomear: IDs/números para etapas que não ganham com o label.\nAmarração contextual: skill que só funciona no contexto proprietário de quem a criou.\nRegra de bolso: se remover o elemento não muda o output na maioria dos casos,\né overengineering.\n\n---\nCOMPARAÇÃO G1 vs FAMÍLIA BÚSSOLA\n---\nCapacidades que Bússola não tem e deve importar:\n- Mode routing por profundidade (INC-01)\n- Cynefin pré-diagnóstico (INC-02 — reduzido a binário nesta semana)\n- Document dependency graph (INC-09 — backlog)\n- Falsificação de hipóteses (INC-04 — incorporado D8)\n- work_order antes de executar (INC-03 — rejeitado para skill única)\n- Stage-adaptive depth (INC-07 — incorporado D7)\n- Design tokens (INC-08 — backlog v0.2)\n- Crisis mode (INC-02 — incorporado D5)\n\nCapacidades em que Bússola é superior:\n- Intake estruturado (bussola-personalization)\n- Gates hardcoded (G2/G5/G6)\n- Epistemic labels FATO/INFERÊNCIA/HIPÓTESE (+ INCOMPLETO agora em D3)\n- 9-phase method\n- Caso canônico (BP-001)\n\n---\nROADMAP DE INCORPORAÇÃO NO CORPUS BÚSSOLA (pós-27/04)\n---\nALTA PRIORIDADE:\nINC-01: Mode Router pré-Phase 0 em bussola-orchestrator\nINC-02: Cynefin pre-diagnostic em bussola-diagnostic-engine (bypass modo crise)\nINC-03: work_order.json antes de forge em bussola-deliverable-forge\nINC-04: Falsification step em bussola-diagnostic-engine\n\nMÉDIA PRIORIDADE:\nINC-05: SCQA framing no template diagnostico_executivo\nINC-06: INCOMPLETO como 4º estado em shared/schemas\nINC-07: Stage-adaptive depth via consultant_config.yaml\nINC-08: Design tokens em shared/design/bussola_design_tokens.md\n\nBAIXA PRIORIDADE:\nINC-09: Document dependency graph (requer INC-01 a INC-04 primeiro)\n\n---\nRANKING DE ADERÊNCIA A MELHORES PRÁTICAS\n---\n1.  bussola-diagnostic-engine    9.5/10\n2.  hunter4-1                    9/10\n3.  business-docx-pipeline       8.5/10\n4.  bussola-orchestrator         8.5/10\n5.  refatorar-documentos         8/10\n6.  executive-artifact-system    8/10\n7.  ceo-advisor                  7/10\n8.  executive-planning-orchest.  6/10\n9.  multi-agent-orchestrator     6/10\n10. corpus-analyst-altas         5/10\n11. projects-to-linear           5/10\n12. agent-orchestration          3/10 — DEPRECAR\n\n---\nPRÓXIMOS PASSOS RECOMENDADOS (pós-27/04)\n---\n1. Implementar INC-01 a INC-04 no Bússola\n2. Refatorar EPO reduzindo para 6 RIDs core\n3. Generalizar hunter4-1 removendo referências ao contexto ALTAS\n4. Deprecar agent-orchestration\n5. Criar shared/design/bussola_design_tokens.md (INC-08)\n\n===========================================================\nSEC-08  PLANO DE AÇÃO — PRÉ-VALIDAÇÃO SEBRAE (referência metodológica)\n===========================================================\n\nNOTA: Esta seção é referência metodológica do plano original de pré-validação.\nNÃO implementar como módulos esta semana. Usar apenas como fonte para:\n- narrativa da demo (lacunas + roteiro de 45 min)\n- mapa de aderência ALI (D10)\n- fundamento do que o MVP resolve\nConflito com o MVP atual: esta seção descreve uma suite com 8 fases. O MVP\ndesta semana é uma skill única de governança (SEC-02). Prevalece SEC-02.\n\n---\nLACUNAS CRÍTICAS (identificadas no plano de ação original)\n---\n\nLACUNA 1 — LGPD É BLOQUEADOR NÃO MAPEADO\nLei 13.709/2018. Ao processar dados de clientes PME via IA, você opera como\nControlador. Exige: consentimento explícito, DPA com Anthropic, base legal,\npolítica de retenção e exclusão.\nAção mínima pré-demo: cláusula de 3 parágrafos no contrato de consultoria\nautorizando uso de IA. Mostrar no demo como diferencial de maturidade.\nFonte: ANPD (anpd.gov.br) · Lei 13.709/2018 Art. 5º, 7º, 11º\n\nLACUNA 2 — SEBRAE TEM METODOLOGIA PRÓPRIA (ALI)\nAgente Local de Inovação usa: Radar da Inovação (13 dimensões), 5W2H,\nciclo ALI (diagnóstico → plano → implementação → nova rodada).\nAção mínima pré-demo: mapear Radar → campos da skill, mostrar como a skill\nACELERA o método ALI, não o substitui. Inserir 5W2H como template nativo.\nFonte: sebrae.com.br/programa-ali · datasebrae.com.br\n\nLACUNA 3 — UX EXIGE INTERFACE, NÃO TERMINAL\nClaude Code é ferramenta de desenvolvedor. Demo com consultor SEBRAE precisa\nde interface que qualquer pessoa entende: formulário simples, progresso visível,\noutput que parece documento profissional.\nOpção A (mais rápida): Claude.ai Project configurado — funciona hoje.\nOpção B (mais impressionante): formulário HTML de 1 página — 1 semana.\nRecomendação: Opção A para o demo SEBRAE.\n\nLACUNA 4 — CONCORRÊNCIA (semi-blue ocean)\nExiste: StratEngineAI, Wispa, Otter.ai, ChatGPT/Claude com prompts ad-hoc.\nNão existe: suite Anthropic native + PME brasileira + SEBRAE/LGPD + multi-nível\nde entregável + cross-session. Brasil: ZERO solução com Agent Skills para PME.\nAzul em cima, competitivo embaixo. Diferencial: profundidade metodológica + execução.\n\nLACUNA 5 — MVP SCOPE GRANDE DEMAIS PARA A REUNIÃO\nDemo não precisa de 8 fases. Precisa de UM momento \"isso é impossível sem IA\"\ncom profundidade real em 1 ponto.\nO que o MVP do demo realmente precisa:\n- 1 fase completa e impressionante (F2 Diagnóstico é o maior \"wow\")\n- Pesquisa real em tempo real do setor\n- Output em 3 níveis visível na tela\n- 1 entregável premium que o consultor pode tocar (PDF/PPTX)\nTudo isso em 45 minutos, com empresa que o consultor escolher.\n\nLACUNA 6 — MODELO DE NEGÓCIO NÃO DEFINIDO\nVantagem competitiva pessoal? Ou produto licenciável?\nRecomendação: começar como vantagem pessoal, validar com SEBRAE como segundo\nusuário, então avaliar produto. Não tentar resolver os dois ao mesmo tempo no MVP.\n\n---\nROTEIRO DEMO — 45 MINUTOS\n---\nMinuto 0–5   Contexto e propósito (\"quero sua validação honesta\")\nMinuto 5–10  Apresentar o PROBLEMA, não a solução ainda\n             (\"consultor PME passa ~65% do tempo produzindo documentos\")\n             Deixar consultor validar o problema.\nMinuto 10–12 Coleta do briefing ao vivo (empresa real do consultor)\nMinuto 12–20 Execução ao vivo — descrever em voz alta o que acontece\n             (\"está buscando dados do setor... aplicando framework...\")\nMinuto 20–30 Apresentar outputs (diagnóstico executivo + radar + business case)\n             Deixar consultor LER em silêncio por 2 minutos.\nMinuto 30–40 Perguntas de validação — OUVIR, não defender\n             \"O que mais te surpreendeu?\" | \"Onde você vê lacuna?\" |\n             \"Você usaria isso?\" | \"O que falta para ser confiável?\"\nMinuto 40–45 Próximos passos — sair com compromisso concreto\n\n---\nCHECKLIST PRÉ-REUNIÃO\n---\nTÉCNICO\n[ ] Claude.ai Project criado e configurado com instructions\n[ ] Skills de documento ativadas (PDF, DOCX)\n[ ] Testado com pelo menos 2 empresas reais\n[ ] Conexão de internet confiável\n[ ] Template de briefing em Google Docs, link copiado\n\nMETODOLÓGICO\n[ ] Radar da Inovação SEBRAE: 13 dimensões explicáveis\n[ ] 5W2H: demonstrar preenchimento automático pela skill\n[ ] Leu metodologia ALI do SEBRAE (30 min de pesquisa)\n\nLGPD\n[ ] Cláusula de consentimento de dados redigida\n[ ] Você sabe responder: \"Quem vê os dados da empresa cliente?\"\n    Resposta correta: Ficam no seu Project no claude.ai. Anthropic tem política\n    de não usar dados de API para treinamento. Link disponível.\n\nPOSICIONAMENTO\n[ ] Você sabe responder: \"Isso é produto ou seu diferencial?\"\n[ ] Você sabe responder: \"Quanto tempo levaria fazer isso manualmente?\"\n[ ] Material impresso como backup (caso internet falhe)\n\n---\nFRAMEWORKS POR FASE (referência — não implementar como módulos esta semana)\n---\nF0 Tese e escopo: tese da skill, buyer inicial, hipótese principal\nF1 Aderência metodológica: mapa ALI/Radar/5W2H\nF2 Demo readiness: runbook de 45 min, checklist, fallback\nF3 Validação com stakeholder: normalização de feedback, go/refine/stop\nF4 Piloto: empresa piloto, entregável mínimo, métrica de valor, escopo\nF5 Productização: decisão vantagem própria / serviço / produto\n\nFontes auditáveis citadas no plano:\nSEBRAE/ALI: sebrae.com.br/programa-ali\nANPD + Lei 13.709/2018: anpd.gov.br\nAnthropic Agent Skills: platform.claude.com/docs/en/agents-and-tools/agent-skills/overview\nSteve Blank (demo riskiest assumption): Lean Startup\nNorman (UX simplicity): Design of Everyday Things (1988)\nFitzpatrick: The Mom Test (2013)\n\n===========================================================\nSEC-09  CONSULTING SKILL SUITE — FULL DIRECTORY (referência de arquitetura)\n===========================================================\n\nNOTA: Esta seção é a especificação maximalista da suite completa (8 fases).\nNÃO implementar esta semana. Usar como:\n- benchmark de escopo para comunicar o que o MVP NÃO é\n- backlog de arquitetura pós-validação\n- referência para README da skill (seção \"Roadmap v0.2\")\nConflito com MVP: o Full Directory tem 8 sub-skills e 40+ arquivos. O MVP\ndesta semana é 1 skill única de governança com 26 arquivos. Prevalece SEC-02.\n\n---\nDIAGNÓSTICO HONESTO — ONDE A SOLUÇÃO BRILHA\n---\nPesquisa ampla e síntese executiva — 5 estrelas\n  Agente paralelo busca em múltiplas fontes via MCP. Retorna fatos / inferências /\n  hipóteses / lacunas. Consultor recebe síntese em 90 segundos, não 3 horas.\n\nProdução de textura de entregável — 5 estrelas\n  Skill de deliverable builder garante que todo output soa como documento de\n  consultoria sênior — headings McKinsey-style, executive summary, recomendação first.\n\nDocumentação organizada e rastreável — 5 estrelas\n  Files API mantém todos os artefatos do projeto indexados. Qualquer fase pode\n  referenciar qualquer documento anterior sem refazer contexto.\n\nNÃO BRILHA EM:\n- Decisões que exigem intuição política de relacionamento\n- Negociação de escopo em tempo real com o cliente\n- Leitura emocional de stakeholders em reunião\nA suite amplifica, não substitui o consultor.\n\n---\nARQUITETURA FULL DIRECTORY (referência backlog)\n---\nconsulting-suite/\n├── SKILL.md                          (master router)\n├── .mcp.json                         (MCP connector config)\n├── project.config.yaml               (variáveis por projeto)\n├── skills/\n│   ├── 01-kickoff/\n│   ├── 02-diagnosis/\n│   ├── 03-design/\n│   ├── 04-planning/\n│   ├── 05-execution/\n│   ├── 06-validation/\n│   ├── 07-handover/\n│   └── 08-followup/\n├── deliverables/\n│   ├── level-1-executive/\n│   ├── level-2-complete/\n│   └── level-3-technical/\n├── connectors/\n│   (google_drive, linear, hubspot, notion, zapier)\n└── references/\n    (frameworks-library, deliverable-standards, methodology-config)\n\nCada sub-skill tem: SKILL.md + templates/ + scripts/\nRoteamento: router detecta fase → carrega SKILL.md da fase → lê project.config\n→ produz entregável no nível correto (executive / complete / technical / all)\n\n---\nCOMPARATIVO ANTES × DEPOIS (referência para narrativa de demo)\n---\nPreparar kickoff:      sem suite 4h    → com suite 15min   (94% redução)\nProduzir diagnóstico:  sem suite 18h   → com suite 2h rev.  (89%)\nGerar deck estratégico: sem suite 8h   → com suite 1h rev.  (88%)\nMontar plano + Linear: sem suite 6h    → com suite 30min    (92%)\nStatus report quinzenal: sem suite 3h  → com suite 20min    (89%)\nRelatório final:       sem suite 12h   → com suite 1.5h rev.(88%)\nMontar handover package: sem suite 8h  → com suite 45min    (91%)\nTOTAL EM 12 SEMANAS: ~200h produção → ~30h revisão (85% de redução)\n\n---\nFONTES DA ESPECIFICAÇÃO FULL DIRECTORY\n---\n[1] Anthropic — Agent Skills overview (dez/2025)\n    platform.claude.com/docs/en/agents-and-tools/agent-skills/overview\n[2] Anthropic — MCP Connector, Files API, Code Execution (out/2025)\n    anthropic.com/news/agent-capabilities-api\n[3] MCP open standard — modelcontextprotocol.io\n[4] PMI PMBOK 7ª ed. (2021) — fases, SOW, RACI, risk register\n[5] McKinsey & Company — Rasiel E. (1999) — estrutura de análise\n[6] Minto, B. — The Pyramid Principle (1987) — MECE, SCQA\n[7] Kaplan & Norton — The Balanced Scorecard, HBR (1992) — KPIs\n[8] Doerr, J. — Measure What Matters (2018) — OKRs\n[9] Kotter, J. — Leading Change, HBR (1996) — change management\n[10] Reichheld, F. — HBR (2003) — NPS\n\n===========================================================\nFIM DO CORPUS NORMALIZADO — SEBRAE-AGENTE v0.1\nData: 2026-04-19 | Gate: 27/04/2026\nVersão deste arquivo: 1.0\nConflitos entre seções: preservados intencionalmente (ver NOTA DE CONFLITO no Índice)\nÂncora de decisão: SEC-01 > SEC-02 > SEC-04 > demais seções\n===========================================================\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /home/claude/build_sebrae_pdf.py
{"returncode":1,"stdout":"Traceback (most recent call last):\n  File \"/home/claude/build_sebrae_pdf.py\", line 91, in <module>\n    S = make_styles()\n        ^^^^^^^^^^^^^\n  File \"/home/claude/build_sebrae_pdf.py\", line 50, in make_styles\n    s['body_sm']  = ParagraphStyle('body_sm', **base, fontSize=7.5, leading=10)\n                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nTypeError: reportlab.lib.styles.ParagraphStyle() got multiple values for keyword argument 'fontSize'\n","stderr":""}
Successfully replaced string in /home/claude/build_sebrae_pdf.py
{"returncode":1,"stdout":"Traceback (most recent call last):\n  File \"/home/claude/build_sebrae_pdf.py\", line 93, in <module>\n    S = make_styles()\n        ^^^^^^^^^^^^^\n  File \"/home/claude/build_sebrae_pdf.py\", line 70, in make_styles\n    s['callout']  = ParagraphStyle('callout', **base, fontSize=7.8, leading=11,\n                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nTypeError: reportlab.lib.styles.ParagraphStyle() got multiple values for keyword argument 'fontSize'\n","stderr":""}
Successfully replaced string in /home/claude/build_sebrae_pdf.py
{"returncode":1,"stdout":"Traceback (most recent call last):\n  File \"/home/claude/build_sebrae_pdf.py\", line 1564, in <module>\n    main()\n  File \"/home/claude/build_sebrae_pdf.py\", line 1515, in main\n    from reportlab.platypus.flowables import LayoutError\nImportError: cannot import name 'LayoutError' from 'reportlab.platypus.flowables' (/usr/local/lib/python3.12/dist-packages/reportlab/platypus/flowables.py)\n","stderr":""}
String to replace not found in /home/claude/build_sebrae_pdf.py. Use the view tool to see the current file content before retrying. If you made a successful str_replace to this file since your last view, that edit invalidated your view output.
{"returncode":0,"stdout":"1510:    # Cover\n1515:    from reportlab.platypus.flowables import LayoutError\n1516:    class _TemplateSwitch(Flowable):\n","stderr":""}
  1508	    story = []
  1509	
  1510	    # Cover
  1511	    story.append(Spacer(1, PH))
  1512	    story.append(PageBreak())
  1513	
  1514	    # Switch to main template
  1515	    from reportlab.platypus.flowables import LayoutError
  1516	    class _TemplateSwitch(Flowable):
  1517	        def __init__(self, t): super().__init__(); self.t = t
  1518	        def wrap(self, *a): return 0, 0
  1519	        def draw(self): pass
  1520	
  1521	    # TOC
  1522	    story += toc_page()
  1523	    story.append(PageBreak())
  1524	
  1525	    # SEC-01
  1526	    story += sec01()
  1527	    story.append(PageBreak())
  1528	
  1529	    # SEC-02
  1530	    story += sec02()
  1531	    story.append(PageBreak())
  1532	
  1533	    # SEC-03
  1534	    story += sec03()
  1535	    story.append(PageBreak())
  1536	
  1537	    # SEC-04
  1538	    story += sec04()
  1539	    story.append(PageBreak())
  1540	
  1541	    # SEC-05
  1542	    story += sec05()
  1543	    story.append(PageBreak())
  1544	
  1545	    # SEC-06
[1565 lines total]
Successfully replaced string in /home/claude/build_sebrae_pdf.py
{"returncode":1,"stdout":"Traceback (most recent call last):\n  File \"/home/claude/build_sebrae_pdf.py\", line 1557, in <module>\n    main()\n  File \"/home/claude/build_sebrae_pdf.py\", line 1553, in main\n    doc.build(story, canvasmaker=None)\n  File \"/usr/local/lib/python3.12/dist-packages/reportlab/platypus/doctemplate.py\", line 1062, in build\n    self._startBuild(filename,canvasmaker)\n  File \"/usr/local/lib/python3.12/dist-packages/reportlab/platypus/doctemplate.py\", line 1032, in _startBuild\n    self.canv = self._makeCanvas(filename=filename,canvasmaker=canvasmaker)\n                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/dist-packages/reportlab/platypus/doctemplate.py\", line 992, in _makeCanvas\n    canv = canvasmaker(filename or self.filename,\n           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\nTypeError: 'NoneType' object is not callable\n","stderr":""}
Successfully replaced string in /home/claude/build_sebrae_pdf.py
{"returncode":1,"stdout":"Traceback (most recent call last):\n  File \"/home/claude/build_sebrae_pdf.py\", line 1557, in <module>\n    main()\n  File \"/home/claude/build_sebrae_pdf.py\", line 1553, in main\n    doc.build(story)\n  File \"/usr/local/lib/python3.12/dist-packages/reportlab/platypus/doctemplate.py\", line 1083, in build\n    self.handle_flowable(flowables)\n  File \"/usr/local/lib/python3.12/dist-packages/reportlab/platypus/doctemplate.py\", line 962, in handle_flowable\n    raise LayoutError(ident)\nreportlab.platypus.doctemplate.LayoutError: Flowable <Spacer at 0x7ed568c5c8f0 frame=cover>...(1 x 841.8897637795277) too large on page 2 in frame 'cover'(583.2755905511812 x 829.8897637795277*) of template 'cover'\n","stderr":""}
Successfully replaced string in /home/claude/build_sebrae_pdf.py
Successfully replaced string in /home/claude/build_sebrae_pdf.py
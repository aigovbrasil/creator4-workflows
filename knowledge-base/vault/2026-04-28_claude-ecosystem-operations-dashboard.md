---
title: "Claude ecosystem operations dashboard"
date: 2026-04-28
account: contatotdahadulto@gmail.com
uuid: b3d51da5-ae9e-47d8-94b4-bc86a20fedc4
messages: 4
tags: []
context: ""
---

**Você** _2026-04-28_

exective aryfcat suestem dece ser deployado apenas

---

**Claude** _2026-04-28_

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
     1	<!DOCTYPE html>
     2	<html lang="pt-BR">
     3	<head>
     4	<meta charset="UTF-8">
     5	<meta name="viewport" content="width=device-width, initial-scale=1.0">
     6	<title>Claude Ecosystem — Operations Dashboard</title>
     7	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
     8	<style>
     9	:root {
    10	  --navy: #1A2744;
    11	  --slate: #2E3F5C;
    12	  --accent: #2563EB;
    13	  --accent-soft: #DBEAFE;
    14	  --charcoal: #374151;
    15	  --mid-gray: #6B7280;
    16	  --light-gray: #F3F4F6;
    17	  --border: #D1D5DB;
    18	  --red-soft: #FEE2E2; --red-text: #B91C1C;
    19	  --green-soft: #D1FAE5; --green-text: #065F46;
    20	  --amber-soft: #FEF3C7; --amber-text: #92400E;
    21	  --purple-soft: #EDE9FE; --purple-text: #5B21B6;
    22	  --blue-soft: #DBEAFE; --blue-text: #1E40AF;
    23	  --white: #FFFFFF;
    24	  --font: 'Inter', system-ui, -apple-system, sans-serif;
    25	  --mono: 'JetBrains Mono', monospace;
    26	  --radius: 2px;
    27	  --sidebar-w: 280px;
    28	}
    29	
    30	* { margin:0; padding:0; box-sizing:border-box; }
    31	html { font-size:14px; scroll-behavior:smooth; }
    32	body { font-family:var(--font); background:var(--light-gray); color:var(--charcoal); display:flex; min-height:100vh; }
    33	
    34	/* SIDEBAR */
    35	.sidebar {
    36	  width:var(--sidebar-w); min-height:100vh; background:var(--navy);
    37	  position:fixed; left:0; top:0; bottom:0; z-index:100;
    38	  display:flex; flex-direction:column; overflow-y:auto;
    39	  transition: transform .3s ease;
    40	}
    41	.sidebar-header {
    42	  padding:20px 16px 12px; border-bottom:1px solid rgba(255,255,255,.1);
    43	}
    44	.sidebar-header h1 {
    45	  font-size:15px; font-weight:800; color:var(--white); letter-spacing:-.3px; line-height:1.3;
    46	}
    47	.sidebar-header .tag {
    48	  display:inline-block; margin-top:6px; padding:2px 8px; border-radius:2px;
    49	  background:var(--accent); color:var(--white); font-size:9px; font-weight:700;
    50	  letter-spacing:.8px; text-transform:uppercase;
    51	}
    52	.nav-group { padding:8px 0; }
    53	.nav-group-label {
    54	  padding:6px 16px; font-size:8px; font-weight:700; color:rgba(255,255,255,.35);
    55	  letter-spacing:1.2px; text-transform:uppercase;
    56	}
    57	.nav-item {
    58	  display:flex; align-items:center; gap:10px; padding:9px 16px; cursor:pointer;
    59	  color:rgba(255,255,255,.6); font-size:12.5px; font-weight:500;
    60	  transition: all .15s; border-left:3px solid transparent;
    61	  min-height:44px; /* touch target */
    62	}
    63	.nav-item:hover { background:rgba(255,255,255,.06); color:rgba(255,255,255,.85); }
    64	.nav-item.active {
    65	  background:rgba(37,99,235,.15); color:var(--white);
    66	  border-left-color:var(--accent); font-weight:600;
    67	}
    68	.nav-item .num {
    69	  font-family:var(--mono); font-size:10px; color:var(--accent);
    70	  min-width:22px; font-weight:600;
    71	}
    72	.mobile-toggle {
    73	  display:none; position:fixed; top:12px; left:12px; z-index:200;
    74	  background:var(--navy); color:var(--white); border:none; border-radius:2px;
    75	  width:44px; height:44px; font-size:20px; cursor:pointer;
    76	}
    77	.sidebar-overlay { display:none; }
    78	
    79	/* MAIN */
    80	.main { margin-left:var(--sidebar-w); flex:1; min-width:0; }
    81	.page-header-band {
    82	  background:var(--white); border-bottom:1px solid var(--border);
    83	  padding:16px 32px; display:flex; align-items:center; gap:16px;
    84	  position:sticky; top:0; z-index:50;
    85	}
    86	.page-header-band .accent-bar {
    87	  width:3px; height:28px; background:var(--accent); border-radius:1px; flex-shrink:0;
    88	}
    89	.page-header-band h2 {
    90	  font-size:15px; font-weight:700; color:var(--navy); letter-spacing:-.2px;
    91	}
    92	.page-header-band .meta {
    93	  margin-left:auto; font-size:10px; color:var(--mid-gray); font-family:var(--mono);
    94	}
    95	.content { padding:24px 32px 60px; max-width:1280px; }
    96	
    97	/* SECTION */
    98	.section { display:none; }
    99	.section.active { display:block; }
   100	.section-title {
   101	  font-size:11px; font-weight:700; color:var(--accent); letter-spacing:1px;
   102	  text-transform:uppercase; margin-bottom:6px;
   103	}
   104	.section-heading {
   105	  font-size:20px; font-weight:800; color:var(--navy); letter-spacing:-.3px;
   106	  margin-bottom:20px; line-height:1.3;
   107	}
   108	.sub-heading {
   109	  font-size:14px; font-weight:700; color:var(--navy); margin:24px 0 12px;
   110	  padding-bottom:6px; border-bottom:2px solid var(--accent);
   111	  display:flex; align-items:center; gap:8px;
   112	}
   113	
   114	/* TABLES */
   115	.tbl-wrap { overflow-x:auto; margin-bottom:20px; border-radius:var(--radius); border:1px solid var(--border); }
   116	table { width:100%; border-collapse:collapse; font-size:12px; }
   117	thead th {
   118	  background:var(--navy); color:var(--white); font-weight:700; font-size:10px;
   119	  letter-spacing:.5px; text-transform:uppercase; padding:10px 12px; text-align:left;
   120	  white-space:nowrap; position:sticky; top:0;
   121	}
   122	tbody td {
   123	  padding:8px 12px; border-bottom:1px solid var(--border); vertical-align:top;
   124	  line-height:1.5;
   125	}
   126	tbody tr:nth-child(even) { background:var(--light-gray); }
   127	tbody tr:hover { background:var(--accent-soft); }
   128	td.mono { font-family:var(--mono); font-size:11px; }
   129	
   130	/* BADGES */
   131	.badge {
   132	  display:inline-block; padding:2px 8px; border-radius:2px; font-size:10px;
   133	  font-weight:700; letter-spacing:.3px; white-space:nowrap;
   134	}
   135	.badge-green { background:var(--green-soft); color:var(--green-text); }
   136	.badge-red { background:var(--red-soft); color:var(--red-text); }
   137	.badge-amber { background:var(--amber-soft); color:var(--amber-text); }
   138	.badge-purple { background:var(--purple-soft); color:var(--purple-text); }
   139	.badge-blue { background:var(--blue-soft); color:var(--blue-text); }
   140	.badge-gray { background:#E5E7EB; color:#4B5563; }
   141	
   142	/* SCORE BAR */
   143	.score-bar { display:flex; align-items:center; gap:6px; }
   144	.score-bar .bar { width:60px; height:6px; background:#E5E7EB; border-radius:1px; overflow:hidden; }
   145	.score-bar .fill { height:100%; border-radius:1px; }
   146	.score-bar .num { font-family:var(--mono); font-size:11px; font-weight:700; min-width:18px; }
   147	
   148	/* CARDS */
   149	.card {
   150	  background:var(--white); border:1px solid var(--border); border-radius:var(--radius);
   151	  margin-bottom:12px; overflow:hidden;
   152	}
   153	.card-header {
	< truncated lines 154-1125 >
  1126	    {name:'Cowork',what:'Ferramenta desktop para automação de arquivos e tarefas sem código',when:'Automação de tarefas locais no desktop — organizar arquivos, processar batches',how:'Instalar Cowork app (desktop). Interface visual.',example:'Processar batch de documentos de PROJ-001 localmente.',error:'Tentar usar no iPad',rec:'Útil para tarefas de desktop que envolvem filesystem local. Irrelevante para iPad workflow.',ipad:'✗ INDISPONÍVEL no iPad',diff:'Desktop only. Mac/Windows.'}
  1127	  ],
  1128	  optimization: [
  1129	    {name:'Prompting Avançado',what:'Técnicas para maximizar qualidade e relevância do output do Claude',when:'Sempre — qualidade do prompt determina qualidade do output',how:'Seguir melhores práticas: role + context + task + format + examples + constraints',example:'Em vez de "escreve um post": "Você é editor do Frankwatching. Escreva post de 800 palavras sobre AI Act para profissionais de marketing holandeses. Tom: profissional mas acessível. Estrutura: hook + 3 seções + CTA."',error:'Prompts vagos → output genérico → múltiplas iterações → desperdício de tempo',rec:'Investir 2 min a mais no prompt economiza 10 min de iteração. Usar templates de prompt.',ipad:'✓',diff:'Idêntico'},
  1130	    {name:'Atalhos de Teclado',what:'Keyboard shortcuts para produtividade no claude.ai',when:'Uso diário na interface',how:'⚠ Atalhos específicos variam — verificar em docs.anthropic.com',example:'Criar nova conversa, navegar entre conversations.',error:'Depender de atalhos desktop no iPad (nem todos disponíveis)',rec:'iPad com teclado externo: alguns atalhos funcionam. Touch: usar interface diretamente.',ipad:'⚠ Limitado a atalhos iOS padrão + teclado externo',diff:'Desktop tem atalhos de teclado completos. iPad depende de teclado externo.'},
  1131	    {name:'Context Limit Management',what:'Estratégias para gerenciar uso eficiente do context window',when:'Em conversas longas, análise de documentos grandes, projetos complexos',how:'Segmentar tarefas, usar referências em vez de texto completo, nova conversa quando degradar.',example:'PROJ-001: em vez de colar toda documentação, criar sumário no Project Instructions e referenciar seções específicas por conversa.',error:'Ignorar degradação de qualidade em conversas longas',rec:'Regra: se notou queda de qualidade, inicie nova conversa. Menos é mais no context window.',ipad:'✓ Mesmo gerenciamento em todas as plataformas',diff:'Idêntico'}
  1132	  ]
  1133	};
  1134	
  1135	function renderFeatureCards(containerId, featureList) {
  1136	  const container = document.getElementById(containerId);
  1137	  if(!container) return;
  1138	  let html = '';
  1139	  featureList.forEach(f => {
  1140	    html += `<div class="card">
  1141	      <div class="card-header" onclick="toggleCard(this)">
  1142	        <span class="arrow">▶</span>
  1143	        <span class="title">${f.name}</span>
  1144	        <span class="tag-row">
  1145	          ${f.ipad.includes('✗') ? '<span class="badge badge-red">✗ iPad</span>' : f.ipad.includes('⚠') ? '<span class="badge badge-amber">⚠ iPad</span>' : '<span class="badge badge-green">✓ iPad</span>'}
  1146	        </span>
  1147	      </div>
  1148	      <div class="card-body">
  1149	        <div class="field"><div class="field-label">O Que É</div><div class="field-value">${f.what}</div></div>
  1150	        <div class="field"><div class="field-label">Quando Usar</div><div class="field-value">${f.when}</div></div>
  1151	        <div class="field"><div class="field-label">Como Usar</div><div class="field-value">${f.how}</div></div>
  1152	        <div class="field"><div class="field-label">Exemplo no Seu Contexto</div><div class="field-value">${f.example}</div></div>
  1153	        <div class="field"><div class="field-label">Erro Comum</div><div class="field-value" style="color:var(--red-text)">${f.error}</div></div>
  1154	        <div class="field"><div class="field-label">Recomendação</div><div class="field-value" style="color:var(--green-text)">${f.rec}</div></div>
  1155	        <div class="field"><div class="field-label">iPad / iOS</div><div class="field-value">${f.ipad}</div></div>
  1156	        <div class="field"><div class="field-label">Desktop / Web / CLI</div><div class="field-value">${f.diff}</div></div>
  1157	      </div>
  1158	    </div>`;
  1159	  });
  1160	  container.innerHTML = html;
  1161	}
  1162	
  1163	renderFeatureCards('features-fundamentals', features.fundamentals);
  1164	renderFeatureCards('features-context', features.context);
  1165	renderFeatureCards('features-execution', features.execution);
  1166	renderFeatureCards('features-integrations', features.integrations);
  1167	renderFeatureCards('features-optimization', features.optimization);
  1168	
  1169	// ===================== SECTION 4: CONNECTOR CATEGORIES =====================
  1170	const categories = [
  1171	  {name:'Produtividade & Knowledge Management',essential:['Notion','Google Calendar','Gmail'],complementary:['Slack','Fantastical','Read/Write Apple Notes','Miro']},
  1172	  {name:'Automação & Workflows',essential:['N8N','Make','Zapier'],complementary:['Apify','Workato','Process Street']},
  1173	  {name:'Editorial & Conteúdo',essential:['WordPress','ElevenLabs','Winston AI'],complementary:['Cloudinary','Planoly','MailerLite','ActiveCampaign']},
  1174	  {name:'Data & Analytics',essential:['BigQuery','Metabase','Tableau'],complementary:['Supabase','Grafana','PostHog','Snowflake']},
  1175	  {name:'Compliance & Governance',essential:['Midpage Legal Research','Clarity AI','ArXiv'],complementary:['MSCI','SMP Global']}
  1176	];
  1177	
  1178	(function renderCategories() {
  1179	  const ct = document.getElementById('connector-categories');
  1180	  let html = '';
  1181	  categories.forEach(c => {
  1182	    html += `<div class="card"><div class="card-header" onclick="toggleCard(this)"><span class="arrow">▶</span><span class="title">${c.name}</span><span class="tag-row"><span class="badge badge-purple">${c.essential.length} ESSENCIAIS</span><span class="badge badge-blue">${c.complementary.length} COMPLEMENTARES</span></span></div><div class="card-body"><div class="field"><div class="field-label">Essenciais</div><div class="field-value">${c.essential.join(' · ')}</div></div><div class="field"><div class="field-label">Complementares</div><div class="field-value">${c.complementary.join(' · ')}</div></div></div></div>`;
  1183	  });
  1184	  ct.innerHTML = html;
  1185	})();
  1186	
  1187	// ===================== SECTION 12: CHECKLIST =====================
  1188	const checklistData = {
  1189	  'NOW — Abril 2026': [
  1190	    'Claude Pro subscription ativa e configurada',
  1191	    'User Preferences configuradas (formato tabular, pt-BR)',
  1192	    'Project "PROJ-001 Santos" criado com instructions',
  1193	    'Project "Editorial" criado com pilares editoriais',
  1194	    'Project "Governança" criado com regras de execução',
  1195	    'Conectores ativados: Notion, Google Calendar, Gmail',
  1196	    'PROJ-001 Fase 1 (automação simples) concluída',
  1197	    'PROJ-001 Fase 2 (hyperautomação) concluída',
  1198	    'Blog The Anatomy — plataforma escolhida',
  1199	    'Blog The Anatomy — primeiro post publicado',
  1200	    'LinkedIn — perfil atualizado para target roles',
  1201	    'LinkedIn — 4 posts na primeira semana',
  1202	    'PUB-001 — tema final definido',
  1203	    'PUB-001 — outline aprovado',
  1204	    'Memória do Claude revisada e editada',
  1205	    'Backup exportado de conversas importantes'
  1206	  ],
  1207	  'NEXT — Mai/Jun 2026': [
  1208	    'PROJ-001 — case study documentado (Notion + PDF)',
  1209	    'PROJ-002 — Project criado e kickoff executado',
  1210	    'PROJ-002 — data integration concluída',
  1211	    'PROJ-002 — AI Risk dashboard entregue',
  1212	    'PROJ-002 — case study documentado',
  1213	    'PUB-001 — artigo publicado no Medium',
  1214	    'Blog The Anatomy — lançamento oficial',
  1215	    'CONT-004 — artigo Frankwatching submetido',
  1216	    'LinkedIn — cadência 4x/semana estável por 4 semanas',
  1217	    'Primeiro ativo reutilizável publicado (prompt/skill)',
  1218	    'Segundo ativo reutilizável publicado',
  1219	    'N8N workflow configurado para pelo menos 1 automação',
  1220	    'Estilo "Frankwatching" criado no Claude'
  1221	  ],
  1222	  'LAST — Jun/Jul 2026': [
  1223	    'PROJ-003 — Project criado e kickoff executado',
  1224	    'PROJ-003 — MVP da plataforma AI Literacy entregue',
  1225	    'PROJ-003 — case study documentado',
  1226	    'PUB-002 — artigo Ethics & AI publicado no Medium',
  1227	    'CONT-005 — 2 vídeos em inglês produzidos',
  1228	    'CONT-005 — 2 vídeos em holandês produzidos',
  1229	    'Portfólio completo com 3 case studies',
  1230	    'Asset library com 5+ itens reutilizáveis',
  1231	    'CV/resume atualizado com projetos',
  1232	    'Candidaturas europeias iniciadas (01/06)',
  1233	    'Perfil LinkedIn otimizado para mercado NL'
  1234	  ]
  1235	};
  1236	
  1237	(function renderChecklist() {
  1238	  const container = document.getElementById('checklist-container');
  1239	  let saved = {};
  1240	  try { saved = JSON.parse(localStorage.getItem('claude-dash-checks') || '{}'); } catch(e){}
  1241	  let html = '';
  1242	  Object.entries(checklistData).forEach(([phase, items]) => {
  1243	    const phaseKey = phase.replace(/[^a-z0-9]/gi,'_');
  1244	    const total = items.length;
  1245	    const done = items.filter((_,i) => saved[phaseKey+'_'+i]).length;
  1246	    const pct = Math.round((done/total)*100);
  1247	    html += `<div class="sub-heading">${phase}</div>`;
  1248	    html += `<div class="check-progress"><div class="bar"><div class="fill" id="bar-${phaseKey}" style="width:${pct}%"></div></div><span class="pct" id="pct-${phaseKey}">${pct}%</span></div>`;
  1249	    items.forEach((item, i) => {
  1250	      const key = phaseKey+'_'+i;
  1251	      const checked = saved[key] ? 'checked' : '';
  1252	      const doneClass = saved[key] ? ' done' : '';
  1253	      html += `<div class="check-item${doneClass}" id="ci-${key}"><input type="checkbox" id="cb-${key}" ${checked} onchange="toggleCheck('${key}','${phaseKey}',${total})"><label for="cb-${key}">${item}</label></div>`;
  1254	    });
  1255	  });
  1256	  container.innerHTML = html;
  1257	})();
  1258	
  1259	function toggleCheck(key, phaseKey, total) {
  1260	  let saved = {};
  1261	  try { saved = JSON.parse(localStorage.getItem('claude-dash-checks') || '{}'); } catch(e){}
  1262	  const cb = document.getElementById('cb-'+key);
  1263	  saved[key] = cb.checked;
  1264	  localStorage.setItem('claude-dash-checks', JSON.stringify(saved));
  1265	  const ci = document.getElementById('ci-'+key);
  1266	  ci.classList.toggle('done', cb.checked);
  1267	  // update progress
  1268	  let done = 0;
  1269	  for(let i=0;i<total;i++) { if(saved[phaseKey+'_'+i]) done++; }
  1270	  const pct = Math.round((done/total)*100);
  1271	  document.getElementById('bar-'+phaseKey).style.width = pct+'%';
  1272	  document.getElementById('pct-'+phaseKey).textContent = pct+'%';
  1273	}
  1274	</script>
  1275	
  1276	</body>
  1277	</html>
  1278	
{"returncode":0,"stdout":"","stderr":""}
**Claude Ecosystem — Operations Dashboard** deployado. ✓

O arquivo `index.html` está pronto — dashboard autônomo, sem dependências externas, abre direto no navegador.

---

**Você** _2026-04-28_

deploy

---

**Claude** _2026-04-28_

{"returncode":0,"stdout":"","stderr":""}
`arquitetura-operacional.html` deployado. ✓
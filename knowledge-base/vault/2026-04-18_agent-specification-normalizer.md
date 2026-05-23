---
title: "Agent specification normalizer"
date: 2026-04-18
account: leonardopimentel.knh@gmail.com
uuid: a55b3d73-8a3c-472b-8f1e-f2973f932001
messages: 2
tags: []
context: ""
---

**Você** _2026-04-18_

/agent-spec-normalizer

---

**Claude** _2026-04-18_

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
     1	# Bússola PME — Claude Skills Architecture
     2	
     3	**Source docs:** PRD.yaml v1.0 · BRD.yaml v1.0 · MRD.yaml v1.0 · Macro Strategy
     4	**Target model:** Claude Opus 4.7
     5	**Architect mode:** Senior Skill Architect
     6	**Output:** Implementation-ready modular skill system (8 skills + support layers)
     7	
     8	---
     9	
    10	## PHASE 0 — PRD ANALYSIS
    11	
    12	### 1. System Executive Summary (≤150 words)
    13	
    14	Bússola PME is a consultative orchestrator that turns a consultant's raw case input into a full client-ready deliverable package in under 24 hours. The core workflow is a fixed 6-phase method (alignment → normalization → diagnosis → prioritization → action plan → follow-up) materialized as a 9-phase operational flow that produces 27 artifacts across three tracks (internal / client / governance), with mandatory QA gates and human-review checkpoints on three critical client deliverables. The stack is Claude-powered skills, YAML manifests, ZIP packaging, and (in the target architecture) MCP connectors for Google Drive, Linear, and Slack. The core value logic is transforming a single consultant's expert method into a replicable product: the same diagnosis quality, same delivery speed, same structural reuse across attendances, with auditable traceability from intake to action plan.
    15	
    16	### 2. Domain Map (distinct functional domains)
    17	
    18	| # | Domain | Description |
    19	|---|---|---|
    20	| D1 | Consultant personalization (Phase 0) | Configure methodology weights, operating mode, branding, source preferences |
    21	| D2 | Client intake & questionnaire | Interactive 10-field intake collection inside conversation |
    22	| D3 | Normalization | Convert raw input into fact / inference / hypothesis structure |
    23	| D4 | Diagnosis | Problem tree, hypotheses log, causal analysis, analytical module routing |
    24	| D5 | Prioritization | Priority scoring, decision log, ranking justification |
    25	| D6 | Action planning | Owner / deadline / KPI enforcement, 5W2H structuring |
    26	| D7 | Deliverable generation | 27 artifacts with density and compression rules, two-track separation |
    27	| D8 | QA & governance | Gates, checklists, human-review enforcement, manifest.yaml |
    28	| D9 | Packaging & delivery modes | ZIP, interactive e-book, live sprint artifact |
    29	| D10 | Simulation | Consumer behavior & business variable scenarios |
    30	| D11 | Execution handoff | Linear project generation from approved action plan |
    31	| D12 | Connectors | Data enrichment beyond manual input (Drive, Slack, Linear, Notion) |
    32	| D13 | Consultative FAQ | Method support, onboarding, escalation reduction |
    33	| D14 | Case 1 showroom | Anonymized showcase for commercial proof |
    34	| D15 | Follow-up & continuity | Status tracking, continuity proposal generation |
    35	
    36	### 3. Decomposition Criteria
    37	
    38	| Domain | Skill? | Inputs/Outputs clear? | Reusable? | Tool dependencies | Skill / Sub-capability / Orchestrator | Justification |
    39	|---|---|---|---|---|---|---|
    40	| D1 Personalization | **Yes** | Yes | Yes (across consultants) | None critical | Skill | Phase 0 is mandatory; config is persistent and consumed by all downstream skills |
    41	| D2 Client intake | **Yes** (merged with D1) | Yes | Yes | `ask_user_input_v0` | Skill (same as D1) | Questionnaire UX shares infrastructure with consultant config; splitting creates coordination overhead without reuse gain |
    42	| D3 Normalization | Sub-capability | Yes | Within domain | None | Sub-module of Diagnostic Engine | Tightly coupled to diagnosis; splitting adds friction against the <3-prompts criterion (BR-M05 gate lives inside) |
    43	| D4 Diagnosis | **Yes** | Yes | Yes | Analytical reference library | Skill (Diagnostic Engine) | Method-fixed analytical core; single skill enforces R01–R10 consistently |
    44	| D5 Prioritization | Sub-capability | Yes | Within domain | None | Sub-module of Diagnostic Engine | Priority depends directly on diagnosis; separate skill creates a governance gate with no net benefit |
    45	| D6 Action planning | Sub-capability | Yes | Within domain | None | Sub-module of Diagnostic Engine | Same method pipeline; gate is enforced inside the skill, not between skills |
    46	| D7 Deliverable generation | **Yes** | Yes | Yes (27 artifacts × N cases) | Density rules, templates | Skill (Deliverable Forge) | High-reuse template and compression logic; isolating it enables maintenance without touching method |
    47	| D8 QA & governance | Orchestrator responsibility | Yes | Yes | None | Orchestrator (cross-cutting) | Gates span all skills; cannot live inside any one specialist without creating circular deps |
    48	| D9 Packaging & delivery modes | Skill (merged with D7) | Yes | Yes | ZIP libs, rendering | Skill (Deliverable Forge) | Packaging is the terminal stage of deliverable generation; separating yields two tightly-coupled skills |
    49	| D10 Simulation | **Yes** | Yes | Yes | Scenario engine | Skill (Simulation Lab) | Optional, on-demand, decision-support; distinct input/output contract; does not belong in diagnosis path |
    50	| D11 Execution handoff | **Yes** | Yes | Yes | Linear MCP, Slack MCP | Skill (Execution Bridge) | Clear transformation with a specific downstream (Linear); approval gate protects against premature write |
    51	| D12 Connectors | Support layer | N/A (configuration) | N/A | MCP servers | Support (not a skill) | Connectors are infrastructure, not skills; consumed by skills via MCP |
    52	| D13 FAQ | **Yes** | Yes | Yes | Reference library | Skill (Consultative FAQ) | Independent trigger surface (consultant asks questions), distinct audience, reduces founder load |
    53	| D14 Case 1 showroom | **Yes** | Yes | Yes (per showcase) | Branding assets | Skill (Case 1 Showroom) | Commercial artifact with its own lifecycle (anonymization, audience targeting); distinct from ZIP delivery |
    54	| D15 Follow-up | Orchestrator responsibility | Yes | Yes | None | Orchestrator + Deliverable Forge | Fases 8–9 reuse existing skills; no new logic; orchestrator schedules them |
    55	
    56	### 4. Gap Analysis
    57	
    58	**What the PRD already covers:**
    59	- Fixed 6-phase method, 10 rules of conduct, analytical module routing
    60	- 27 artifacts with `target_chars`, `max_chars`, `overflow_action`, `compression_policy`
    61	- 9-phase operational flow with gates and mandatory human review
    62	- Manifest YAML structure, `depends_on` graph, packaging rules
    63	- QA checklist as blocking gate before packaging
    64	
    65	**What the PRD does not cover (mandatory per rule set):**
    66	
    67	| Mandatory point | PRD coverage | Gap | Risk if not incorporated |
    68	|---|---|---|---|
    69	| 1. Data connectors enrich analysis | Not mentioned | Full gap | Consultant must retype context already in Drive / past cases; breaks <24h target |
    70	| 2. Consultative FAQ agent | Not mentioned | Full gap | Founder intervention cap (≤3 / attendance) cannot be met without self-service |
    71	| 3. Three delivery types (e-book / live sprint / ZIP) | Only ZIP covered | 2 of 3 missing | Cannot serve the three audience segments in the macro strategy |
    72	| 4. Simulation of consumer/business variables | Not mentioned | Full gap | Action plan lacks decision support; upsell narrative weakens |
    73	| 5. Structured Linear project generation | Not mentioned | Full gap | Plan does not convert to executable backlog; handoff is manual and lossy |
    74	| 6. Mandatory Phase 0 personalization | Implicit (consultant context) | Gap as formal phase | No consistent config across attendances; knowledge loss between cases |
    75	| 7. Customized agent delivery as SKILL.md | Not mentioned | Full gap | Cannot ship a per-consultant skill package — blocks continuity product |
    76	| 8. Consultant control over method/weights/order/sources/depth/mode | Partially (flags mentioned) | Mostly gap | "Operator of the skill" has no knob — customization requires code edits |
    77	| 9. Interactive questionnaire UX | Implicit (10-field intake) | UX pattern missing | Consultant operates by hand; breaks <15 min setup criterion |
    78	| 10. Skill count justification | Not applicable (PRD not a skill spec) | Addressed in this document | N/A |
    79	| 11. Case 1 showcase | Not mentioned | Full gap | No proof-of-value artifact for commercial channel (MRD canais exige prova) |
    80	
    81	**Conclusion:** The PRD is an excellent methodological and artifact specification but treats the system as a single monolithic skill. A production Skill architecture must add seven capabilities (connectors, FAQ, simulation, Linear bridge, Phase 0 formalization, three delivery modes, Case 1 showcase) and formalize the consultant-facing configuration surface.
    82	
    83	### 5. Layered Architecture Hypothesis
    84	
    85	```
    86	┌─────────────────────────────────────────────────────────────────┐
    87	│  LAYER 0 — Personalization (Phase 0)                            │
    88	│  bussola-personalization → consultant_config.yaml + client intake│
	< truncated lines 89-1907 >
  1908	
  1909	**Orchestrator designation:** `bussola-orchestrator`. Owns phase routing, gate enforcement, manifest.yaml, human-review checkpoints, final packaging coordination.
  1910	
  1911	**Specialist skills:** `bussola-diagnostic-engine` (analytical core). Single specialist because the PRD method is serial and method-fixed.
  1912	
  1913	**Support layers:**
  1914	- `bussola-consultative-faq` (onboarding_faq)
  1915	- `bussola-case1-showroom` (support)
  1916	
  1917	**Not skills (connectors / scripts / references / assets):**
  1918	- Google Drive / Gmail / Slack / Linear / Notion / Figma — MCP connectors, consumed by skills
  1919	- YAML schemas, method references, artifact specs — reference material, shared across skills
  1920	- Overflow executors, density validators, QA runners — scripts, bundled per skill
  1921	- Branding tokens, templates — assets, bundled per skill
  1922	
  1923	**How all 11 mandatory architecture points are incorporated:**
  1924	
  1925	| # | Point | Where |
  1926	|---|---|---|
  1927	| 1 | Data connectors enrich analysis | MCPs (Drive/Gmail/Notion) integrated in Personalization (source whitelist) and Orchestrator (status persistence) |
  1928	| 2 | Consultative FAQ / onboarding agent | `bussola-consultative-faq` skill |
  1929	| 3 | Three artifact types (e-book / sprint / ZIP) | Three delivery modes in `bussola-deliverable-forge` with separate renderers and templates |
  1930	| 4 | Simulation of consumer/business variables | `bussola-simulation-lab` skill |
  1931	| 5 | Linear project generation | `bussola-execution-bridge` skill with approval gate |
  1932	| 6 | Mandatory Phase 0 personalization | `bussola-personalization` + Orchestrator enforces Phase 0 precondition on every case |
  1933	| 7 | Customized agent delivery as SKILL.md | Every skill ships as SKILL.md; consultant-specific custom agents are produced by Deliverable Forge in a `custom_agent/` sub-directory within the ZIP (new artifact, extends the 27) |
  1934	| 8 | Consultant control (method/weights/order/sources/depth/mode) | Six knobs in `consultant_config.yaml`, schema-validated, consumed by every downstream skill |
  1935	| 9 | Interactive questionnaire UX | `ask_user_input_v0` integrated in Personalization and Simulation Lab |
  1936	| 10 | Skill count justification | This document, "Modularization Decisions" section |
  1937	| 11 | Case 1 showcase | `bussola-case1-showroom` skill |
  1938	
  1939	**Ideal Case 1 Showcase**
  1940	
  1941	Target: LinkedIn + landing page for the "Sprint de Proposta Comercial com Claude" offer (MRD commercial_offer).
  1942	
  1943	Package:
  1944	- `showcase_interactive.html` — a live React widget showing the 9 phases, the three critical artifacts mid-generation, and a fake-time-lapse compressor from raw brief → client ZIP (under 24h narrative).
  1945	- `showcase_deck.pptx` (7 slides): (1) problem, (2) consultant's before state, (3) method summary, (4) live artifact sample, (5) result metrics, (6) consultant testimonial, (7) CTA.
  1946	- `landing_copy.md` — hero, method-in-3-steps, offer, proof, CTA (R$ 897 initial).
  1947	- `one_pager.pdf` — for WhatsApp / cold outreach.
  1948	
  1949	Audience: consultors + agências (MRD ICP primary). Channel split: LinkedIn primary, landing secondary, Instagram tertiary.
  1950	
  1951	Anonymization: `strong` level — real method, anonymized client (fictional name substitute, metrics rounded to nearest 5%, segments generalized to "agência B2B de comunicação").
  1952	
  1953	Substrate: first successfully-completed F1 pilot case. Built by `bussola-case1-showroom` after that case's `qa_checklist` is green.
  1954	
  1955	---
  1956	
  1957	### 4. MODULARIZATION DECISIONS
  1958	
  1959	**Why not one monolithic skill?**
  1960	
  1961	A single skill would need to: handle Phase 0 setup, run interactive questionnaires, execute 5 analytical modules, produce 27 artifacts with 4 overflow actions and 3 delivery modes, coordinate MCPs, enforce 6 gates, and generate commercial showcases. That skill's SKILL.md alone would exceed 2,000 lines, violate the <500-line quality bar, make trigger calibration impossible, and turn any modification into a full-system risk. The three critical governance points (QA gate, human review, Linear-write approval) cannot be enforced inside the skill that produces the artifact — that is a separation-of-concerns violation and a recipe for silent bypass.
  1962	
  1963	**Why not over-fragment?**
  1964	
  1965	A 15-skill decomposition (one per method phase, one per delivery mode, one per analytical module, one per governance gate) was considered and rejected. Reasons:
  1966	- Most analytical modules share input (intake_normalized) and output (problem_tree), so per-module skills duplicate scaffolding.
  1967	- Per-phase skills create 8 inter-skill gates instead of 6 intra-orchestrator gates, with no reuse benefit.
  1968	- Per-delivery-mode skills (ZIP / e-book / sprint) share 90% of the template and QA infrastructure.
  1969	- Maintenance cost scales super-linearly with skill count; 15 skills means 15 SKILL.md files to keep calibrated, 15 test suites, 15 dependency surfaces.
  1970	
  1971	**Modular balance chosen**
  1972	
  1973	The 8-skill decomposition chosen:
  1974	- Collapses method phases 2–5 into one specialist because they share input, method, and downstream (zero reuse cost, major coordination savings).
  1975	- Collapses three delivery modes into one delivery skill because they share 90% of logic (templates, QA, branding).
  1976	- Keeps governance cross-cutting (orchestrator) because gates span skill boundaries.
  1977	- Isolates high-risk external-write behavior (Execution Bridge) in its own skill with a hard approval gate.
  1978	- Isolates distinct-lifecycle / distinct-audience skills (FAQ, Case 1 Showroom) because merging them would create trigger ambiguity.
  1979	
  1980	**Trade-offs accepted**
  1981	
  1982	- **Diagnostic Engine is large.** It owns 4 method phases and ~9 internal artifacts. Accepted because the method is serial and splitting would add orchestration cost. Mitigated via internal sub-phase gates (not inter-skill) and `scripts/module_router.py` for branching.
  1983	- **Deliverable Forge is large.** 27 artifacts + 3 delivery modes + overflow executor + QA runner. Accepted because the unit of reuse is the template library, not the artifact-type boundary; splitting by track (3 skills) would triplicate QA infrastructure. Mitigated by heavy use of references/ and templates/.
  1984	- **Orchestrator holds cross-cutting governance.** Some would argue gates should live in the producing skill. Rejected: governance gates frequently block downstream actions (e.g., QA blocks packaging AND Linear handoff), so the enforcer must be above both.
  1985	- **Personalization merges consultant config AND client intake.** These are two different user flows. Accepted because they share infrastructure (YAML validation, interactive UX, MCP-backed pre-fill) and splitting creates a dependency cycle (config needs to exist before intake can read it).
  1986	- **No per-analytical-module skill.** Accepted — modules are bundled as references inside Diagnostic Engine, router decides activation. Adding eight skills for eight modules would be over-engineering.
  1987	
  1988	**Net result**
  1989	
  1990	Eight skills, each with a non-overlapping purpose, a distinct trigger surface, and a clear audience. Governance gates enforced by the orchestrator. External writes isolated behind approval. Reference and template libraries shared via the per-skill `references/` and `templates/` directories with cross-skill sync for documents that are canonical to the method (e.g., `6_phase_method.md` lives in Diagnostic Engine and is read by FAQ).
  1991	
  1992	---
  1993	
  1994	## END OF ARCHITECTURE DOCUMENT
  1995	
    89	├─────────────────────────────────────────────────────────────────┤
    90	│  LAYER 1 — Onboarding / FAQ                                     │
    91	│  bussola-consultative-faq (support surface for L0–L6)           │
    92	├─────────────────────────────────────────────────────────────────┤
    93	│  LAYER 2 — Analytical Core                                      │
    94	│  bussola-diagnostic-engine (normalize → diagnose → prioritize → plan)│
    95	├─────────────────────────────────────────────────────────────────┤
    96	│  LAYER 3 — Simulation (on-demand)                               │
    97	│  bussola-simulation-lab (consumer / business variable scenarios)│
    98	├─────────────────────────────────────────────────────────────────┤
    99	│  LAYER 4 — Deliverable Generation & Packaging                   │
   100	│  bussola-deliverable-forge (27 artifacts, 3 delivery modes, ZIP)│
   101	├─────────────────────────────────────────────────────────────────┤
   102	│  LAYER 5 — Execution Handoff                                    │
   103	│  bussola-execution-bridge (Linear project + Slack notify)       │
   104	├─────────────────────────────────────────────────────────────────┤
   105	│  LAYER 6 — Showcase                                             │
   106	│  bussola-case1-showroom (anonymized commercial demo)            │
   107	├─────────────────────────────────────────────────────────────────┤
   108	│  ORCHESTRATOR (cross-cutting)                                   │
   109	│  bussola-orchestrator — phase routing, gates, manifest.yaml,    │
   110	│  QA enforcement, human-review checkpoints, packaging coordinator│
   111	├─────────────────────────────────────────────────────────────────┤
   112	│  CONNECTORS (support, not skills)                               │
   113	│  Google Drive · Gmail · Linear · Slack · Notion · Figma (via MCP)│
   114	└─────────────────────────────────────────────────────────────────┘
   115	```
   116	
   117	---
   118	
   119	## PHASE 1 — SKILL DECOMPOSITION
   120	
   121	**Total: 8 skills.** Justification lives in the "Modularization Decisions" section.
   122	
   123	### SKILL #1 — bussola-orchestrator
   124	
   125	**PURPOSE**
   126	Central coordinator for every Bússola PME case. Owns phase state (1–9), enforces gates and human-review checkpoints, maintains the case `manifest.yaml` with `depends_on` graph, routes work to specialist skills, blocks packaging until `qa_checklist` is 100% green, and produces the final ZIP (or hands off to other delivery modes via Deliverable Forge).
   127	
   128	**TRIGGER CONDITIONS**
   129	- "novo caso Bússola PME", "start consultoria PME", "rodar atendimento completo"
   130	- "avançar para fase [N]", "gerar pacote final do caso [id]"
   131	- Implicit trigger when a consultant starts a new case after Phase 0 is already configured
   132	
   133	**EXPECTED INPUT**
   134	Case ID + `consultant_config.yaml` (from Personalization) + raw consultant brief. Optional: uploaded documents, prior-case references.
   135	
   136	**EXPECTED OUTPUT**
   137	`manifest.yaml` (evolving), phase transitions logged in `decision_log`, routing calls to specialist skills, final ZIP built via Deliverable Forge, status surface visible to consultant.
   138	
   139	**TECHNOLOGY STACK**
   140	YAML processing, `visualize:show_widget` for phase dashboard, `create_file` for manifest, `present_files` for ZIP handoff. MCPs: Slack (status notifications), Google Drive (optional manifest mirror).
   141	
   142	**REQUIRED BUNDLED RESOURCES**
   143	- `scripts/manifest_builder.py` — generates and updates manifest.yaml
   144	- `scripts/gate_validator.py` — evaluates each phase gate criterion
   145	- `scripts/qa_checklist_evaluator.py`
   146	- `references/9_phase_flow.md` — the operational flow spec
   147	- `references/gates_reference.md` — gate criteria per phase
   148	- `references/dependency_graph.yaml` — artifact-to-artifact depends_on
   149	- `templates/manifest.yaml.j2`
   150	- `templates/readme_pacote.md.j2`
   151	
   152	**DEPENDENCIES ON OTHER SKILLS**
   153	- **Calls:** bussola-personalization (Phase 0), bussola-diagnostic-engine (Phases 2–5), bussola-deliverable-forge (Phases 4, 5, 7, 8, 9 partials), bussola-execution-bridge (post-Phase 5), bussola-simulation-lab (on-demand between 4 and 5)
   154	- **Consumes:** consultant_config.yaml, case artifacts from specialists
   155	- **Does not call:** bussola-consultative-faq (independent trigger surface), bussola-case1-showroom (separate lifecycle)
   156	
   157	**ROLE IN THE ARCHITECTURE**
   158	orchestrator
   159	
   160	**IMPLEMENTATION PRIORITY**
   161	High — nothing else is usable end-to-end without orchestration; however, it should be built **after** Personalization and Diagnostic Engine stubs exist (iteration order in Phase 4).
   162	
   163	**JUSTIFICATION FOR EXISTENCE**
   164	QA gates, manifest maintenance, and human-review enforcement are cross-cutting responsibilities. Pushing them into any specialist skill creates circular dependencies (e.g., Deliverable Forge would have to call Diagnostic Engine to re-validate). A dedicated orchestrator is the textbook fix for multi-phase, gated workflows with shared state.
   165	
   166	---
   167	
   168	### SKILL #2 — bussola-personalization
   169	
   170	**PURPOSE**
   171	Formalizes Phase 0 (consultant setup) **and** the client-side interactive intake. Produces the `consultant_config.yaml` that governs the entire system for that consultant (method weights, dependency order flexibility, source usage, deliverable depth, operating mode: `guided` vs `hands_off`, branding tokens). Runs the 10-field client intake as an interactive questionnaire inside the conversation.
   172	
   173	**TRIGGER CONDITIONS**
   174	- "configurar consultor Bússola", "onboarding do consultor", "setup inicial"
   175	- "iniciar intake do cliente", "preencher os 10 campos do caso"
   176	- "quero ajustar o método / os pesos / o modo de operação"
   177	
   178	**EXPECTED INPUT**
   179	Consultant profile info (first run) OR existing `consultant_config.yaml` (updates). For client intake: raw brief + conversational signals.
   180	
   181	**EXPECTED OUTPUT**
   182	- `consultant_config.yaml` — persistent per consultant
   183	- `intake_normalized.md` (seed) — 10 fields validated
   184	- `information_gaps.md` (initial) — fields that could not be filled
   185	
   186	**TECHNOLOGY STACK**
   187	`ask_user_input_v0` (interactive UX — mandatory point #9), YAML generation, `visualize:show_widget` (optional) for config preview. MCPs: Google Drive (persist config), Gmail / Notion (pull context for the client).
   188	
   189	**REQUIRED BUNDLED RESOURCES**
   190	- `scripts/config_schema_validator.py` — validates consultant_config.yaml against schema
   191	- `scripts/intake_field_checker.py` — enforces 10-field completeness
   192	- `references/consultant_config_schema.yaml` — full schema with all knobs
   193	- `references/operating_modes.md` — `guided` vs `hands_off` behavior contracts
   194	- `references/method_weights_reference.md` — what each weight controls
   195	- `templates/consultant_config.yaml.j2`
   196	- `templates/intake_questions.yaml` — the 10-field interactive question set
   197	- `examples/consultant_config_guided.yaml`
   198	- `examples/consultant_config_hands_off.yaml`
   199	- `examples/intake_filled_commercial_case.md`
   200	
   201	**DEPENDENCIES ON OTHER SKILLS**
   202	- **Called by:** bussola-orchestrator (always first on a new case)
   203	- **Consumes:** MCP connectors (Drive/Gmail/Notion) for context enrichment (mandatory point #1)
   204	- **Feeds:** bussola-diagnostic-engine, bussola-deliverable-forge, bussola-execution-bridge (all read `consultant_config.yaml`)
   205	
   206	**ROLE IN THE ARCHITECTURE**
   207	configuration_personalization
   208	
   209	**IMPLEMENTATION PRIORITY**
   210	High — blocking for every other skill; required to satisfy mandatory points #6, #8, #9.
   211	
   212	**JUSTIFICATION FOR EXISTENCE**
   213	Phase 0 is mandatory (rule #6) and governs every downstream skill via `consultant_config.yaml`. Interactive questionnaire UX (rule #9) and consultant control knobs (rule #8) are orthogonal to analysis — they are a configuration surface. Merging this into Diagnostic Engine would violate single-responsibility and pollute analytical logic with UX state.
   214	
   215	---
   216	
   217	### SKILL #3 — bussola-diagnostic-engine
   218	
   219	**PURPOSE**
   220	Executes the fixed analytical pipeline (Phases 2–5 of the operational flow): normalization → diagnosis → prioritization → action plan. Enforces the 10 rules of conduct (R01–R10). Routes to the correct analytical module (SWOT / 5 Whys / Pareto / 5W2H / PDCA / Ishikawa / JTBD / Esforço×Impacto). Produces all 9 internal-track analytical artifacts.
   221	
   222	**TRIGGER CONDITIONS**
   223	- "rodar diagnóstico", "gerar problem_tree", "priorizar problemas do caso"
   224	- "fazer 5 porquês neste caso", "aplicar Pareto / SWOT / 5W2H"
   225	- "gerar plano de ação com responsáveis e prazos"
   226	
   227	**EXPECTED INPUT**
   228	`intake_normalized.md` (validated) + `consultant_config.yaml` + optional documents.
   229	
   230	**EXPECTED OUTPUT**
   231	`hypotheses_log`, `problem_tree`, `diagnostic_working`, `priority_score`, `plano_acao` (pre-delivery form), `decision_log` (analytical entries).
   232	
   233	**TECHNOLOGY STACK**
   234	Reasoning-heavy (Opus 4.7 native), YAML/markdown generation, `create_file`. No external MCPs required — all work happens on already-normalized input.
   235	
   236	**REQUIRED BUNDLED RESOURCES**
   237	- `scripts/module_router.py` — selects analytical module from problem type
   238	- `scripts/priority_scorer.py` — computes score with configurable weights
   239	- `scripts/action_field_enforcer.py` — rejects items missing owner / deadline / KPI
   240	- `references/6_phase_method.md`
   241	- `references/analytical_modules/` — one file per module (SWOT, 5Whys, Pareto, 5W2H, PDCA, Ishikawa, JTBD, esforco_impacto)
   242	- `references/fact_inference_hypothesis.md` — separation rules
   243	- `templates/problem_tree.md.j2`
   244	- `templates/priority_score.md.j2`
   245	- `templates/plano_acao.md.j2`
	< truncated lines 246-443 >
   444	- **Does not write:** pure read skill
   445	
   446	**ROLE IN THE ARCHITECTURE**
   447	onboarding_faq
   448	
   449	**IMPLEMENTATION PRIORITY**
   450	High for pilot F1 — success criterion SC-C05 ("máx 3 intervenções do fundador por atendimento após o segundo caso") cannot be met without a self-service layer.
   451	
   452	**JUSTIFICATION FOR EXISTENCE**
   453	FAQ has a distinct trigger surface (consultant asks a question; no case state mutation), a distinct audience (consultant, not client), and its own reference library. Embedding in Orchestrator would pollute case state machines with conversational Q&A. Splitting also allows the FAQ to be invoked outside an active case.
   454	
   455	---
   456	
   457	### SKILL #8 — bussola-case1-showroom
   458	
   459	**PURPOSE**
   460	Builds a showcase/showroom deliverable from a real (anonymized) completed case. Serves as commercial proof of value — the "Case 1" artifact referenced in the macro strategy (Instagram / LinkedIn / landing page). Produces a multi-format showcase: interactive HTML demo, short deck, landing-page-ready copy, and a one-pager.
   461	
   462	**TRIGGER CONDITIONS**
   463	- "gerar showcase do Bússola", "montar case 1", "preparar demo comercial"
   464	- "anonimizar este caso para portfólio", "gerar material de prova social"
   465	
   466	**EXPECTED INPUT**
   467	A completed case (ZIP or artifact set) + anonymization rules + target audience (consultant / agency / PME founder) + channel (LinkedIn / landing page / sales call).
   468	
   469	**EXPECTED OUTPUT**
   470	- `showcase_interactive.html` (live demo using `visualize:show_widget`)
   471	- `showcase_deck.pptx` (short, 6–8 slides)
   472	- `landing_page_copy.md`
   473	- `one_pager.pdf`
   474	- `anonymization_log.md` (audit of what was redacted)
   475	
   476	**TECHNOLOGY STACK**
   477	`pptx` skill, `pdf` skill, `visualize:show_widget` (React), `frontend-design` skill for the HTML demo. MCPs: Google Drive (publish location), optional Figma (for custom visual).
   478	
   479	**REQUIRED BUNDLED RESOURCES**
   480	- `scripts/anonymizer.py` — PII removal + name substitution + metric rounding
   481	- `scripts/narrative_extractor.py` — turns artifacts into narrative beats
   482	- `references/showcase_structure.md`
   483	- `references/anonymization_rules.md`
   484	- `references/channel_adaptation.md` — copy rules per channel
   485	- `templates/showcase_deck.pptx.j2`
   486	- `templates/landing_copy.md.j2`
   487	- `templates/showcase_interactive.jsx`
   488	- `assets/showcase_branding/`
   489	- `examples/case1_commercial_sprint.html`
   490	
   491	**DEPENDENCIES ON OTHER SKILLS**
   492	- **Called by:** direct user invocation (commercial asset lifecycle, not inside a case)
   493	- **Consumes:** completed case package (usually from Deliverable Forge output)
   494	- **Does not mutate:** original case artifacts
   495	
   496	**ROLE IN THE ARCHITECTURE**
   497	support
   498	
   499	**IMPLEMENTATION PRIORITY**
   500	Medium — build after first successful F1 case so there is substrate to showcase. Required for mandatory point #11 and for MRD channel strategy to work.
   501	
   502	**JUSTIFICATION FOR EXISTENCE**
   503	Showcase has a distinct lifecycle (post-case, commercial purpose), a distinct audience (prospects, not consultant), and distinct outputs (marketing artifacts, not operational ones). Absorbing into Deliverable Forge would conflate internal/client/governance tracks with marketing assets and break the 27-artifact spec.
   504	
   505	---
   506	
   507	## PHASE 2 — FULL DIRECTORY STRUCTURE
   508	
   509	### bussola-orchestrator/
   510	```
   511	bussola-orchestrator/
   512	├── SKILL.md                                 [mandatory]
   513	├── scripts/
   514	│   ├── manifest_builder.py                  [mandatory]
   515	│   ├── gate_validator.py                    [mandatory]
   516	│   ├── qa_checklist_evaluator.py            [mandatory]
   517	│   └── phase_router.py                      [mandatory]
   518	├── references/
   519	│   ├── 9_phase_flow.md                      [mandatory, kept out of SKILL.md — 400+ lines]
   520	│   ├── gates_reference.md                   [mandatory]
   521	│   ├── dependency_graph.yaml                [mandatory]
   522	│   └── governance_matrix.md                 [mandatory]
   523	├── assets/
   524	│   └── phase_dashboard.jsx                  [optional, for widget]
   525	├── templates/
   526	│   ├── manifest.yaml.j2                     [mandatory]
   527	│   └── readme_pacote.md.j2                  [mandatory]
   528	└── examples/
   529	    └── manifest_commercial_case.yaml        [optional]
   530	```
   531	
   532	### bussola-personalization/
   533	```
   534	bussola-personalization/
   535	├── SKILL.md                                 [mandatory]
   536	├── scripts/
   537	│   ├── config_schema_validator.py           [mandatory]
   538	│   └── intake_field_checker.py              [mandatory]
   539	├── references/
   540	│   ├── consultant_config_schema.yaml        [mandatory — full schema out of SKILL.md]
   541	│   ├── operating_modes.md                   [mandatory]
   542	│   └── method_weights_reference.md          [mandatory]
   543	├── assets/
   544	│   └── config_preview_widget.jsx            [optional]
   545	├── templates/
   546	│   ├── consultant_config.yaml.j2            [mandatory]
   547	│   └── intake_questions.yaml                [mandatory]
   548	└── examples/
   549	    ├── consultant_config_guided.yaml        [mandatory — onboarding proof]
   550	    ├── consultant_config_hands_off.yaml     [mandatory]
   551	    └── intake_filled_commercial_case.md     [optional]
   552	```
   553	
   554	### bussola-diagnostic-engine/
   555	```
   556	bussola-diagnostic-engine/
   557	├── SKILL.md                                 [mandatory]
   558	├── scripts/
   559	│   ├── module_router.py                     [mandatory]
   560	│   ├── priority_scorer.py                   [mandatory]
   561	│   └── action_field_enforcer.py             [mandatory]
   562	├── references/
   563	│   ├── 6_phase_method.md                    [mandatory]
   564	│   ├── fact_inference_hypothesis.md         [mandatory]
   565	│   └── analytical_modules/                  [mandatory, stays out of SKILL.md]
   566	│       ├── swot.md
   567	│       ├── 5_whys.md
   568	│       ├── pareto.md
   569	│       ├── 5w2h.md
   570	│       ├── pdca.md
   571	│       ├── ishikawa.md
   572	│       ├── jtbd.md
   573	│       └── esforco_impacto.md
   574	├── templates/
   575	│   ├── problem_tree.md.j2                   [mandatory]
   576	│   ├── priority_score.md.j2                 [mandatory]
   577	│   └── plano_acao.md.j2                     [mandatory]
   578	└── examples/
   579	    └── diagnostico_commercial_case.md       [optional]
   580	```
   581	
   582	### bussola-deliverable-forge/
   583	```
   584	bussola-deliverable-forge/
   585	├── SKILL.md                                 [mandatory]
   586	├── scripts/
   587	│   ├── density_validator.py                 [mandatory]
   588	│   ├── overflow_executor.py                 [mandatory — executes 4 actions]
   589	│   ├── derivation_checker.py                [mandatory]
   590	│   ├── qa_checklist_runner.py               [mandatory]
   591	│   ├── zip_packager.py                      [mandatory]
   592	│   ├── ebook_renderer.py                    [mandatory — delivery mode 2]
   593	│   └── sprint_artifact_renderer.py          [mandatory — delivery mode 3]
   594	├── references/
   595	│   ├── 27_artifacts_spec.md                 [mandatory — out of SKILL.md, 800+ lines]
   596	│   ├── density_rules.md                     [mandatory]
   597	│   ├── two_track_separation.md              [mandatory]
   598	│   └── delivery_modes.md                    [mandatory]
   599	├── assets/
   600	│   └── branding_default/                    [mandatory]
[1995 lines total]
   246	- `examples/diagnostico_commercial_case.md`
   247	
   248	**DEPENDENCIES ON OTHER SKILLS**
   249	- **Called by:** bussola-orchestrator
   250	- **Consumes:** output of bussola-personalization
   251	- **Feeds:** bussola-deliverable-forge, bussola-simulation-lab, bussola-execution-bridge
   252	
   253	**ROLE IN THE ARCHITECTURE**
   254	specialist
   255	
   256	**IMPLEMENTATION PRIORITY**
   257	High — core value. The entire product promise (24h diagnosis) depends on this.
   258	
   259	**JUSTIFICATION FOR EXISTENCE**
   260	The analytical pipeline is a single method-fixed sequence where splitting into N skills would add coordination overhead (four orchestration gates instead of one) with zero reuse benefit — the outputs only ever flow into the same downstream. Internal sub-phases are enforced via internal gates, not inter-skill gates. This directly satisfies the <3-prompts-per-attendance criterion in the framework failure test.
   261	
   262	---
   263	
   264	### SKILL #4 — bussola-deliverable-forge
   265	
   266	**PURPOSE**
   267	Generates all 27 artifacts respecting density rules, compression policies, two-track separation, overflow actions (`summarize` / `split_by_area` / `convert_to_table` / `move_to_appendix`), derivation rules, and the three mandatory delivery modes: **ZIP package**, **interactive e-book**, **live sprint artifact**. Runs the `qa_checklist` before any client-track artifact leaves the skill.
   268	
   269	**TRIGGER CONDITIONS**
   270	- "gerar entregáveis do cliente", "montar resumo executivo / plano / apresentação"
   271	- "compilar ZIP do caso", "gerar e-book interativo", "gerar artefato sprint ao vivo"
   272	- "aplicar compressão / dividir por área / converter para tabela" (overflow actions)
   273	
   274	**EXPECTED INPUT**
   275	Analytical artifacts from Diagnostic Engine + `consultant_config.yaml` (for branding, depth, mode) + optional simulation output.
   276	
   277	**EXPECTED OUTPUT**
   278	- Trilha cliente (8 artifacts): resumo_executivo, diagnostico_executivo, matriz_prioridades, plano_acao, playbook_operacional, apresentacao_executiva, relatorio_acompanhamento, proposta_continuidade
   279	- Trilha governança (7 artifacts): manifest_yaml, readme_pacote, changelog, output_versions, exported_files_index, color_tokens, sop_processo
   280	- Final deliverable in chosen mode(s): ZIP file, interactive HTML e-book artifact, or live sprint widget
   281	
   282	**TECHNOLOGY STACK**
   283	`create_file`, `visualize:show_widget` (interactive e-book + live sprint), `docx`/`pptx`/`pdf` skills (for classical formats when consultant requests). MCPs: Google Drive (optional upload), Slack (delivery notification). Python: python-docx, python-pptx, Jinja2, zipfile.
   284	
   285	**REQUIRED BUNDLED RESOURCES**
   286	- `scripts/density_validator.py` — validates target_chars / max_chars per artifact
   287	- `scripts/overflow_executor.py` — runs the 4 overflow actions automatically
   288	- `scripts/derivation_checker.py` — enforces "derived < parent" rule
   289	- `scripts/qa_checklist_runner.py`
   290	- `scripts/zip_packager.py`
   291	- `scripts/ebook_renderer.py` — produces the interactive HTML e-book
   292	- `scripts/sprint_artifact_renderer.py` — produces the live sprint widget
   293	- `references/27_artifacts_spec.md` — character limits, fields, policies
   294	- `references/density_rules.md` — hard / soft limit behavior
   295	- `references/two_track_separation.md`
   296	- `references/delivery_modes.md` — contract for ZIP vs e-book vs sprint
   297	- `templates/` — one template per client-track artifact (8 files)
   298	- `assets/branding_default/` — default color tokens, typography
   299	- `examples/zip_commercial_case/` — exemplary ZIP
   300	- `examples/ebook_commercial_case.html`
   301	- `examples/sprint_artifact_commercial_case.html`
   302	
   303	**DEPENDENCIES ON OTHER SKILLS**
   304	- **Called by:** bussola-orchestrator (multiple phases)
   305	- **Consumes:** outputs of bussola-diagnostic-engine and bussola-simulation-lab
   306	- **Feeds:** bussola-execution-bridge (plano_acao consumption), bussola-case1-showroom (anonymized artifacts as showcase source)
   307	
   308	**ROLE IN THE ARCHITECTURE**
   309	delivery
   310	
   311	**IMPLEMENTATION PRIORITY**
   312	High — no client-facing value without it. Build after Diagnostic Engine reaches MVP.
   313	
   314	**JUSTIFICATION FOR EXISTENCE**
   315	Density rules, compression policies, and the three delivery modes are a self-contained generation and rendering responsibility with high template reuse. Keeping it separate from Diagnostic Engine means method changes do not trigger template churn, and vice versa. The skill is also the only place where `qa_checklist` runs as a terminal gate — centralizing this satisfies operational_constraint OC-07.
   316	
   317	---
   318	
   319	### SKILL #5 — bussola-simulation-lab
   320	
   321	**PURPOSE**
   322	On-demand decision support: runs consumer-behavior and business-variable simulations to stress-test the proposed action plan. Typical simulations: pricing sensitivity, conversion-funnel variations, capacity scenarios, cohort retention, channel-mix ROI. Produces a scenario report that can optionally feed `plano_acao` refinement or `proposta_continuidade` narratives.
   323	
   324	**TRIGGER CONDITIONS**
   325	- "simular cenários para esse caso", "testar variações de preço"
   326	- "e se aumentarmos a conversão em X%?", "análise de sensibilidade no plano"
   327	- "rodar simulação de comportamento do consumidor"
   328	
   329	**EXPECTED INPUT**
   330	`plano_acao` (pre-delivery) + baseline metrics (pulled from intake or asked interactively) + simulation parameters (ranges, variables to vary).
   331	
   332	**EXPECTED OUTPUT**
   333	`simulation_report.md` with: baseline, scenarios, sensitivity table, recommended adjustments. Optionally an interactive chart artifact via `visualize:show_widget` (Recharts / Plotly).
   334	
   335	**TECHNOLOGY STACK**
   336	Python: numpy, pandas, scipy, mathjs (React widget). `visualize:show_widget` for interactive chart. `bash_tool` for computation.
   337	
   338	**REQUIRED BUNDLED RESOURCES**
   339	- `scripts/pricing_sensitivity.py`
   340	- `scripts/funnel_simulator.py`
   341	- `scripts/capacity_scenarios.py`
   342	- `scripts/cohort_retention.py`
   343	- `references/simulation_catalog.md` — which simulation for which problem type
   344	- `references/assumptions_library.md` — default ranges for common SME variables
   345	- `templates/simulation_report.md.j2`
   346	- `templates/sensitivity_widget.jsx`
   347	- `examples/pricing_simulation_commercial_case.md`
   348	
   349	**DEPENDENCIES ON OTHER SKILLS**
   350	- **Called by:** bussola-orchestrator (on-demand between Phases 4 and 5, or before Phase 9)
   351	- **Consumes:** outputs of bussola-diagnostic-engine
   352	- **Feeds:** bussola-deliverable-forge (optional input into `plano_acao` or `proposta_continuidade`)
   353	
   354	**ROLE IN THE ARCHITECTURE**
   355	simulation
   356	
   357	**IMPLEMENTATION PRIORITY**
   358	Medium — not blocking for F1 pilot but required for credible upsell narrative and satisfies mandatory point #4. Build after core pipeline (#1–#4) is stable.
   359	
   360	**JUSTIFICATION FOR EXISTENCE**
   361	Simulation has a distinct input/output contract (parameter ranges → scenario report), runs on-demand rather than in the main flow, and has its own reference/assumptions library. Embedding it into Diagnostic Engine would bloat that skill with quantitative tooling that is not activated in every case. Isolation also allows the skill to evolve its catalog independently.
   362	
   363	---
   364	
   365	### SKILL #6 — bussola-execution-bridge
   366	
   367	**PURPOSE**
   368	Transforms an approved `plano_acao` into a structured Linear project: creates the project, maps action items to epics, breaks them into issues with owners / deadlines / labels, sets dependencies, and posts a Slack notification. Enforces a mandatory human approval gate before any Linear write.
   369	
   370	**TRIGGER CONDITIONS**
   371	- "levar plano para o Linear", "criar projeto de execução"
   372	- "handoff para execução", "transformar plano em issues"
   373	- "notificar time no Slack sobre o plano"
   374	
   375	**EXPECTED INPUT**
   376	Approved `plano_acao` (must have all items with owner / deadline / KPI) + `consultant_config.yaml` (Linear workspace, project template, Slack channel).
   377	
   378	**EXPECTED OUTPUT**
   379	Linear project URL, list of created epics and issues with IDs, Slack message confirmation, `execution_handoff_log.md` entry in `decision_log`.
   380	
   381	**TECHNOLOGY STACK**
   382	Linear MCP (mandatory), Slack MCP (mandatory), optional Notion MCP (documentation mirror). Uses existing `projects-to-linear` skill pattern where available.
   383	
   384	**REQUIRED BUNDLED RESOURCES**
   385	- `scripts/plano_to_epics.py` — maps plan structure to Linear hierarchy
   386	- `scripts/dependency_mapper.py` — derives issue dependencies from plano_acao
   387	- `scripts/human_approval_gate.py` — blocks writes until explicit confirmation
   388	- `references/linear_project_template.md`
   389	- `references/epic_issue_conventions.md`
   390	- `templates/linear_epic.md.j2`
   391	- `templates/slack_handoff_message.md.j2`
   392	- `examples/linear_project_commercial_case.md`
   393	
   394	**DEPENDENCIES ON OTHER SKILLS**
   395	- **Called by:** bussola-orchestrator (after Phase 5 approval)
   396	- **Consumes:** approved `plano_acao` from Deliverable Forge, `consultant_config.yaml` from Personalization
   397	- **Triggers:** nothing downstream inside Bússola; produces external artifacts only
   398	
   399	**ROLE IN THE ARCHITECTURE**
   400	execution
   401	
   402	**IMPLEMENTATION PRIORITY**
   403	Medium — not blocking for F1 initial deliverable (plan can still be handed off manually), but required to meet mandatory point #5 and to compete with consulting offers that already ship to Asana / Monday / Linear.
   404	
   405	**JUSTIFICATION FOR EXISTENCE**
   406	External write operations with destructive potential (Linear project creation, Slack broadcast) must be isolated behind an approval gate. Embedding this in Deliverable Forge would mix read-only delivery with write-side effects. The MCP dependency surface is also distinct.
   407	
   408	---
   409	
   410	### SKILL #7 — bussola-consultative-faq
   411	
   412	**PURPOSE**
   413	Self-service consultative agent for consultants: answers method questions, explains artifact purposes, recommends analytical modules, troubleshoots gate failures, and escalates to the founder only when the question falls outside the knowledge base. Directly attacks the "max 3 founder interventions per attendance" success criterion.
   414	
   415	**TRIGGER CONDITIONS**
   416	- "como uso o Bússola", "qual a diferença entre X e Y", "quando uso o Pareto vs SWOT"
   417	- "posso pular uma fase", "por que o qa_checklist está falhando"
   418	- "o que vai na trilha interna vs trilha do cliente"
   419	- Implicit: consultant asks a method or system question during a case
   420	
   421	**EXPECTED INPUT**
   422	Free-form question (text) + optional `consultant_config.yaml` context + optional current case state (phase, artifact with issue).
   423	
   424	**EXPECTED OUTPUT**
   425	Structured answer citing the relevant reference document, with a "Try this next" actionable follow-up, and an escalation flag if the question is out-of-scope.
   426	
   427	**TECHNOLOGY STACK**
   428	Reference retrieval (local files), optional web_search fallback for general Anthropic/Claude platform questions, `visualize:show_widget` for process diagrams when helpful.
   429	
   430	**REQUIRED BUNDLED RESOURCES**
   431	- `scripts/question_classifier.py` — routes to the right reference doc
   432	- `scripts/escalation_detector.py` — flags out-of-scope questions
   433	- `references/method_faq.md`
   434	- `references/artifact_faq.md`
   435	- `references/gate_troubleshooting.md`
   436	- `references/analytical_module_selector.md`
   437	- `references/operating_modes_faq.md`
   438	- `templates/faq_answer.md.j2`
   439	- `examples/faq_common_questions.md`
   440	
   441	**DEPENDENCIES ON OTHER SKILLS**
   442	- **Called by:** direct user invocation (independent trigger surface)
   443	- **Reads:** same reference library used by Orchestrator and Diagnostic Engine (shared `/references` via symbolic link or duplicated per skill at build time)
   444	- **Does not write:** pure read skill
[1995 lines total]
   600	│   └── branding_default/                    [mandatory]
   601	│       ├── color_tokens.yaml
   602	│       └── typography.css
   603	├── templates/
   604	│   ├── resumo_executivo.md.j2               [mandatory]
   605	│   ├── diagnostico_executivo.md.j2          [mandatory]
   606	│   ├── matriz_prioridades.md.j2             [mandatory]
   607	│   ├── plano_acao.md.j2                     [mandatory]
   608	│   ├── playbook_operacional.md.j2           [mandatory]
   609	│   ├── apresentacao_executiva.pptx.j2       [mandatory]
   610	│   ├── relatorio_acompanhamento.md.j2       [mandatory]
   611	│   ├── proposta_continuidade.md.j2          [mandatory]
   612	│   ├── ebook_interactive.jsx                [mandatory]
   613	│   └── sprint_artifact.jsx                  [mandatory]
   614	└── examples/
   615	    ├── zip_commercial_case/                 [mandatory, full directory]
   616	    ├── ebook_commercial_case.html           [mandatory]
   617	    └── sprint_artifact_commercial_case.html [mandatory]
   618	```
   619	
   620	### bussola-simulation-lab/
   621	```
   622	bussola-simulation-lab/
   623	├── SKILL.md                                 [mandatory]
   624	├── scripts/
   625	│   ├── pricing_sensitivity.py               [mandatory]
   626	│   ├── funnel_simulator.py                  [mandatory]
   627	│   ├── capacity_scenarios.py                [optional]
   628	│   └── cohort_retention.py                  [optional]
   629	├── references/
   630	│   ├── simulation_catalog.md                [mandatory]
   631	│   └── assumptions_library.md               [mandatory]
   632	├── templates/
   633	│   ├── simulation_report.md.j2              [mandatory]
   634	│   └── sensitivity_widget.jsx               [mandatory]
   635	└── examples/
   636	    └── pricing_simulation_commercial_case.md
   637	```
   638	
   639	### bussola-execution-bridge/
   640	```
   641	bussola-execution-bridge/
   642	├── SKILL.md                                 [mandatory]
   643	├── scripts/
   644	│   ├── plano_to_epics.py                    [mandatory]
   645	│   ├── dependency_mapper.py                 [mandatory]
   646	│   └── human_approval_gate.py               [mandatory]
   647	├── references/
   648	│   ├── linear_project_template.md           [mandatory]
   649	│   └── epic_issue_conventions.md            [mandatory]
   650	├── templates/
   651	│   ├── linear_epic.md.j2                    [mandatory]
   652	│   └── slack_handoff_message.md.j2          [mandatory]
   653	└── examples/
   654	    └── linear_project_commercial_case.md    [optional]
   655	```
   656	
   657	### bussola-consultative-faq/
   658	```
   659	bussola-consultative-faq/
   660	├── SKILL.md                                 [mandatory]
   661	├── scripts/
   662	│   ├── question_classifier.py               [mandatory]
   663	│   └── escalation_detector.py               [mandatory]
   664	├── references/
   665	│   ├── method_faq.md                        [mandatory]
   666	│   ├── artifact_faq.md                      [mandatory]
   667	│   ├── gate_troubleshooting.md              [mandatory]
   668	│   ├── analytical_module_selector.md        [mandatory]
   669	│   └── operating_modes_faq.md               [mandatory]
   670	├── templates/
   671	│   └── faq_answer.md.j2                     [mandatory]
   672	└── examples/
   673	    └── faq_common_questions.md              [optional]
   674	```
   675	
   676	### bussola-case1-showroom/
   677	```
   678	bussola-case1-showroom/
   679	├── SKILL.md                                 [mandatory]
   680	├── scripts/
   681	│   ├── anonymizer.py                        [mandatory]
   682	│   └── narrative_extractor.py               [mandatory]
   683	├── references/
   684	│   ├── showcase_structure.md                [mandatory]
   685	│   ├── anonymization_rules.md               [mandatory]
   686	│   └── channel_adaptation.md                [mandatory]
   687	├── assets/
   688	│   └── showcase_branding/                   [mandatory]
   689	├── templates/
   690	│   ├── showcase_deck.pptx.j2                [mandatory]
   691	│   ├── landing_copy.md.j2                   [mandatory]
   692	│   └── showcase_interactive.jsx             [mandatory]
   693	└── examples/
   694	    └── case1_commercial_sprint.html         [optional]
   695	```
   696	
   697	**Structural rationale:**
   698	- Volume isolation: `27_artifacts_spec.md`, `9_phase_flow.md`, `consultant_config_schema.yaml`, and `analytical_modules/` stay out of SKILL.md because each exceeds 400 lines on its own.
   699	- Reuse: `references/` directories can be symlinked or synced between Orchestrator, Diagnostic Engine, and FAQ so method docs have a single source of truth.
   700	- Maintenance: templates and scripts are isolated per skill to avoid ripple-effect changes when a single artifact's spec evolves.
   701	- `examples/` always contains at least one full worked case to anchor evals and onboarding.
   702	
   703	---
   704	
   705	## PHASE 3 — SKILL.md FRONTMATTER
   706	
   707	### bussola-orchestrator
   708	```yaml
   709	---
   710	name: bussola-orchestrator
   711	description: >
   712	  Use this skill to run or resume a Bússola PME consultative case end-to-end.
   713	  Activate on triggers like "novo caso Bússola", "rodar atendimento PME",
   714	  "avançar fase", "montar pacote do caso", or any request that implies
   715	  multi-phase coordination of a PME consulting cycle (9 phases from intake
   716	  to continuity). This skill owns the case manifest.yaml, enforces QA gates
   717	  and mandatory human-review checkpoints (diagnostico_executivo,
   718	  apresentacao_executiva, proposta_continuidade), routes work to specialist
   719	  skills (personalization, diagnostic-engine, deliverable-forge, simulation-lab,
   720	  execution-bridge), and produces the final ZIP. Do NOT use for standalone
   721	  questions about the method (use consultative-faq) or for one-off artifact
   722	  generation without a case context (use deliverable-forge directly).
   723	compatibility:
   724	  tools: [mcp__slack, mcp__google_drive]
   725	dependencies: [pyyaml, jinja2, zipfile]
   726	---
   727	```
   728	
   729	**Calibration note:** description leads with trigger phrases in Portuguese (consultant's operating language per PRD), enumerates the three mandatory human-review checkpoints explicitly so the model does not skip them, and explicitly excludes two look-alike patterns (method questions, standalone artifact generation) to prevent wrongful activation.
   730	
   731	---
   732	
   733	### bussola-personalization
   734	```yaml
   735	---
   736	name: bussola-personalization
   737	description: >
   738	  Use this skill for Bússola PME Phase 0 setup and client intake. Activate on
   739	  "configurar consultor", "onboarding do consultor", "setup inicial", "iniciar
   740	  caso PME", "preencher intake", "ajustar pesos do método", "trocar modo de
   741	  operação". Produces consultant_config.yaml that governs the entire system
   742	  downstream (method weights, dependency order, source usage, deliverable
   743	  depth, operating mode guided vs hands_off, branding tokens) AND runs the
   744	  10-field interactive intake questionnaire for each new client case. Uses
   745	  ask_user_input_v0 for conversational UX and optionally pulls context from
   746	  Google Drive / Gmail / Notion via MCP to pre-fill intake fields. Must be
   747	  invoked before Diagnostic Engine on any new case; consultant_config.yaml
   748	  must exist before Orchestrator can route to any specialist skill.
   749	compatibility:
   750	  tools: [mcp__google_drive, mcp__gmail, mcp__notion, ask_user_input_v0]
   751	dependencies: [pyyaml, jsonschema]
   752	---
   753	```
   754	
   755	**Calibration note:** explicitly names the six knobs of rule #8 to force the model to populate all of them, and calls out the blocking relationship with Orchestrator so it is never skipped.
   756	
   757	---
   758	
   759	### bussola-diagnostic-engine
   760	```yaml
   761	---
   762	name: bussola-diagnostic-engine
   763	description: >
   764	  Use this skill to execute the analytical core of a Bússola PME case:
   765	  normalization (fact/inference/hypothesis separation), diagnosis
   766	  (problem_tree + hypotheses_log + diagnostic_working), prioritization
   767	  (priority_score + decision_log), and action planning (plano_acao with
   768	  mandatory owner/deadline/KPI per item). Activate on "rodar diagnóstico",
   769	  "gerar problem_tree", "priorizar problemas", "aplicar 5 porquês / SWOT /
   770	  Pareto / 5W2H / Ishikawa / JTBD / esforço vs impacto", "gerar plano de
   771	  ação". Enforces the 10 rules of conduct (R01–R10) including R07 "input
   772	  bruto nunca alimenta análise diretamente" — requires intake_normalized as
   773	  precondition. Routes to the correct analytical module based on problem
   774	  type; never dumps multiple frameworks. Produces internal-track analytical
   775	  artifacts only; client-track artifacts are generated by Deliverable Forge.
   776	compatibility:
   777	  tools: []
   778	dependencies: [pyyaml, jinja2]
   779	---
   780	```
   781	
   782	**Calibration note:** explicitly lists all analytical modules in the trigger phrases so the model recognizes method-specific vocabulary, names R07 to prevent the most common architecture violation (skipping normalization), and draws a sharp boundary with Deliverable Forge.
   783	
   784	---
   785	
   786	### bussola-deliverable-forge
   787	```yaml
   788	---
   789	name: bussola-deliverable-forge
   790	description: >
   791	  Use this skill to generate any of the 27 Bússola PME artifacts and to
   792	  produce the three delivery modes: ZIP package, interactive HTML e-book,
   793	  and live sprint artifact. Activate on "gerar resumo executivo / diagnóstico
   794	  / matriz / plano / playbook / apresentação / relatório / proposta",
   795	  "compilar ZIP", "gerar e-book interativo", "gerar artefato sprint ao vivo",
   796	  "aplicar compressão / dividir por área / converter para tabela" (overflow
   797	  actions). Enforces density rules (target_chars / max_chars), executes the
   798	  four overflow actions automatically when max_chars is exceeded, maintains
   799	  derivation rule (derived artifact always shorter than parent), runs
   800	  qa_checklist as a terminal blocking gate before any client-track artifact
   801	  is released, and keeps trilha interna and trilha cliente strictly separated
   802	  in packaging. Requires upstream analytical artifacts from Diagnostic Engine.
   803	compatibility:
   804	  tools: [mcp__google_drive, mcp__slack, visualize__show_widget]
   805	dependencies: [python-docx, python-pptx, jinja2, zipfile, pyyaml]
   806	---
   807	```
   808	
   809	**Calibration note:** names all eight client-track artifacts and all four overflow actions in Portuguese to maximize trigger match rate; surfaces the terminal QA gate because operational_constraint OC-07 depends on it.
   810	
   811	---
   812	
   813	### bussola-simulation-lab
   814	```yaml
   815	---
   816	name: bussola-simulation-lab
   817	description: >
   818	  Use this skill to run consumer-behavior and business-variable simulations
   819	  as decision support for a Bússola PME case. Activate on "simular cenários",
   820	  "análise de sensibilidade", "e se aumentarmos / diminuirmos X", "testar
   821	  variações de preço", "simular funil de conversão", "cenários de capacidade",
   822	  "simular coortes de retenção". Produces simulation_report.md plus an
   823	  interactive sensitivity chart artifact. Consumes plano_acao and baseline
   824	  metrics; output can feed plano_acao refinement or proposta_continuidade.
   825	  On-demand skill — not part of the mandatory main flow; typically invoked
   826	  between Phase 4 (prioritization) and Phase 5 (action plan) or before
   827	  Phase 9 (continuity). Do NOT use for simple arithmetic or forecasts
   828	  unrelated to an active case — those belong in plain analysis.
   829	compatibility:
   830	  tools: [visualize__show_widget, bash_tool]
   831	dependencies: [numpy, pandas, scipy]
   832	---
   833	```
   834	
   835	**Calibration note:** lists the four most common simulation types explicitly, clarifies that this is on-demand (not in the main flow) to prevent the orchestrator from routing every case through it, and draws an explicit negative boundary to block general math questions.
   836	
   837	---
   838	
   839	### bussola-execution-bridge
   840	```yaml
   841	---
   842	name: bussola-execution-bridge
   843	description: >
   844	  Use this skill to transform an approved Bússola PME plano_acao into a
   845	  structured Linear project with epics, issues, dependencies, and a Slack
   846	  notification to the consultant's team. Activate on "levar plano para o
   847	  Linear", "criar projeto de execução", "handoff para execução", "transformar
   848	  plano em issues", "notificar time no Slack sobre o plano". ENFORCES a
   849	  mandatory human approval gate before any Linear write operation — never
   850	  creates a project without explicit confirmation. Requires plano_acao where
   851	  every item has owner/deadline/KPI (will refuse otherwise) and a
   852	  consultant_config.yaml with Linear workspace and Slack channel configured.
   853	  Does not support Asana/Monday/Jira in this version; extension points exist
   854	  in references/ but are not implemented.
   855	compatibility:
   856	  tools: [mcp__linear, mcp__slack, mcp__notion]
   857	dependencies: [requests]
   858	---
   859	```
   860	
   861	**Calibration note:** the human-approval gate is the highest-risk element (destructive external writes) so it is surfaced early in the description; the refusal condition (incomplete plano_acao) is explicit to prevent partial handoffs.
   862	
   863	---
   864	
   865	### bussola-consultative-faq
   866	```yaml
   867	---
   868	name: bussola-consultative-faq
   869	description: >
   870	  Use this skill when a Bússola PME consultant asks a method, system, or
   871	  troubleshooting question. Activate on "como uso o Bússola", "qual a
   872	  diferença entre X e Y", "quando uso Pareto vs SWOT", "posso pular uma
   873	  fase", "por que o qa_checklist está falhando", "o que vai na trilha
   874	  interna", "como funciona o modo hands-off", and similar. Answers from the
   875	  reference library (method FAQ, artifact FAQ, gate troubleshooting,
   876	  analytical module selector, operating modes FAQ). Flags questions that
   877	  fall outside scope for founder escalation. Pure read skill — never
   878	  mutates case state. Should be the first point of contact for any
   879	  consultant question to hit the founder-intervention success criterion
   880	  (≤3 interventions per attendance after the second case).
   881	compatibility:
   882	  tools: [web_search]
   883	dependencies: []
   884	---
   885	```
   886	
   887	**Calibration note:** description explicitly ties the skill's purpose to success criterion SC-C05 so prioritization reasoning is preserved; the "pure read" statement prevents the skill from accidentally writing case state.
   888	
   889	---
   890	
   891	### bussola-case1-showroom
   892	```yaml
   893	---
   894	name: bussola-case1-showroom
   895	description: >
   896	  Use this skill to build a Bússola PME Case 1 showcase from a completed
   897	  (anonymized) real case for commercial demonstration. Activate on "gerar
   898	  showcase", "montar case 1", "preparar demo comercial", "anonimizar este
   899	  caso para portfólio", "gerar material de prova social para LinkedIn /
   900	  landing page / Instagram". Produces four coordinated outputs: interactive
[1995 lines total]
Now I have a comprehensive view of the entire document. Let me produce the normalized artifact.
File created successfully: /mnt/user-data/outputs/BUSSOLA_PME__NORMALIZED_ARCH_SPEC.md
**Destination format:** Architecture Spec → System Instruction Set

**What was normalized:**

The source document was a thorough but narrative-heavy PRD synthesis (~1,900 lines) mixing analysis prose, gap tables, justification paragraphs, and embedded frontmatter examples across four loose phases. The normalized output collapses it into a single copy-paste-ready operational artifact structured as:

- **XML instruction blocks** (`<role>` through `<final_contract>`) that can be dropped directly into any orchestrating system prompt or master SKILL.md
- **Layer map and 9-phase flow** expressed compactly as operational logic, not narrative
- **All 11 mandatory architecture points** wired to explicit owners in `<decision_rules>` — no longer scattered across tables
- **All 6 gate conditions** expressed as enforceable preconditions, not description
- **All 3 human-review checkpoints** surfaced in `<input_handling>` and `<constraints>` so they can't be buried
- **Final contract** with 10 concrete pass/fail criteria for the architecture as a whole
- **Frontmatter register** — all 8 SKILL.md `---` blocks in one place, calibration intent preserved, copy-paste ready
- **Canonical directory structure** — full tree with `[mandatory]` / `[optional]` tags intact

**Noise removed:** PRD gap analysis tables, decomposition criteria reasoning, per-skill justification paragraphs (all collapsed into `<decision_rules>`), repetitive "calibration note" commentary. Intent of every justification is preserved — the narrative is not.
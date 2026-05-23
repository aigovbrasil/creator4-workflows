---
title: "Remix de design-language-codex.html"
date: 2026-04-30
account: directjervis@gmail.com
uuid: 02c62836-99b1-4c9a-beca-a2b5dc01e358
messages: 5
tags: []
context: ""
---

**Claude** _2026-04-30_

Vou personalizar este artefato:






Transforme qualquer artefato em algo único personalizando seus elementos principais.

1. Mudar o tópico - Adapte o conteúdo para um assunto diferente
2. Atualizar o estilo - Renove os visuais ou o design geral
3. Tornar pessoal - Adapte especificamente para suas necessidades
4. Compartilhe sua visão - Eu a darei vida



Por onde você gostaria de começar?

---

**Você** _2026-04-30_

mude o topico para ebook de negocios  com esses dados [Bússola PME — Claude Skills Architecture
**Source docs:** PRD.yaml v1.0 · BRD.yaml v1.0 · MRD.yaml v1.0 · Macro Strategy
**Target model:** Claude Opus 4.7
**Architect mode:** Senior Skill Architect
**Output:** Implementation-ready modular skill system (8 skills + support layers)
---
## PHASE 0 — PRD ANALYSIS
### 1. System Executive Summary (≤150 words)
Bússola PME is a consultative orchestrator that turns a consultant's raw case input into a full client-ready deliverable package in under 24 hours. The core workflow is a fixed 6-phase method (alignment → normalization → diagnosis → prioritization → action plan → follow-up) materialized as a 9-phase operational flow that produces 27 artifacts across three tracks (internal / client / governance), with mandatory QA gates and human-review checkpoints on three critical client deliverables. The stack is Claude-powered skills, YAML manifests, ZIP packaging, and (in the target architecture) MCP connectors for Google Drive, Linear, and Slack. The core value logic is transforming a single consultant's expert method into a replicable product: the same diagnosis quality, same delivery speed, same structural reuse across attendances, with auditable traceability from intake to action plan.
### 2. Domain Map (distinct functional domains)
| # | Domain | Description |
|---|---|---|
| D1 | Consultant personalization (Phase 0) | Configure methodology weights, operating mode, branding, source preferences |
| D2 | Client intake & questionnaire | Interactive 10-field intake collection inside conversation |
| D3 | Normalization | Convert raw input into fact / inference / hypothesis structure |
| D4 | Diagnosis | Problem tree, hypotheses log, causal analysis, analytical module routing |
| D5 | Prioritization | Priority scoring, decision log, ranking justification |
| D6 | Action planning | Owner / deadline / KPI enforcement, 5W2H structuring |
| D7 | Deliverable generation | 27 artifacts with density and compression rules, two-track separation |
| D8 | QA & governance | Gates, checklists, human-review enforcement, manifest.yaml |
| D9 | Packaging & delivery modes | ZIP, interactive e-book, live sprint artifact |
| D10 | Simulation | Consumer behavior & business variable scenarios |
| D11 | Execution handoff | Linear project generation from approved action plan |
| D12 | Connectors | Data enrichment beyond manual input (Drive, Slack, Linear, Notion) |
| D13 | Consultative FAQ | Method support, onboarding, escalation reduction |
| D14 | Case 1 showroom | Anonymized showcase for commercial proof |
| D15 | Follow-up & continuity | Status tracking, continuity proposal generation |
### 3. Decomposition Criteria
| Domain | Skill? | Inputs/Outputs clear? | Reusable? | Tool dependencies | Skill / Sub-capability / Orchestrator | Justification |
|---|---|---|---|---|---|---|
| D1 Personalization | **Yes** | Yes | Yes (across consultants) | None critical | Skill | Phase 0 is mandatory; config is persistent and consumed by all downstream skills |
| D2 Client intake | **Yes** (merged with D1) | Yes | Yes | `ask_user_input_v0` | Skill (same as D1) | Questionnaire UX shares infrastructure with consultant config; splitting creates coordination overhead without reuse gain |
| D3 Normalization | Sub-capability | Yes | Within domain | None | Sub-module of Diagnostic Engine | Tightly coupled to diagnosis; splitting adds friction against the <3-prompts criterion (BR-M05 gate lives inside) |
| D4 Diagnosis | **Yes** | Yes | Yes | Analytical reference library | Skill (Diagnostic Engine) | Method-fixed analytical core; single skill enforces R01–R10 consistently |
| D5 Prioritization | Sub-capability | Yes | Within domain | None | Sub-module of Diagnostic Engine | Priority depends directly on diagnosis; separate skill creates a governance gate with no net benefit |
| D6 Action planning | Sub-capability | Yes | Within domain | None | Sub-module of Diagnostic Engine | Same method pipeline; gate is enforced inside the skill, not between skills |
| D7 Deliverable generation | **Yes** | Yes | Yes (27 artifacts × N cases) | Density rules, templates | Skill (Deliverable Forge) | High-reuse template and compression logic; isolating it enables maintenance without touching method |
| D8 QA & governance | Orchestrator responsibility | Yes | Yes | None | Orchestrator (cross-cutting) | Gates span all skills; cannot live inside any one specialist without creating circular deps |
| D9 Packaging & delivery modes | Skill (merged with D7) | Yes | Yes | ZIP libs, rendering | Skill (Deliverable Forge) | Packaging is the terminal stage of deliverable generation; separating yields two tightly-coupled skills |
| D10 Simulation | **Yes** | Yes | Yes | Scenario engine | Skill (Simulation Lab) | Optional, on-demand, decision-support; distinct input/output contract; does not belong in diagnosis path |
| D11 Execution handoff | **Yes** | Yes | Yes | Linear MCP, Slack MCP | Skill (Execution Bridge) | Clear transformation with a specific downstream (Linear); approval gate protects against premature write |
| D12 Connectors | Support layer | N/A (configuration) | N/A | MCP servers | Support (not a skill) | Connectors are infrastructure, not skills; consumed by skills via MCP |
| D13 FAQ | **Yes** | Yes | Yes | Reference library | Skill (Consultative FAQ) | Independent trigger surface (consultant asks questions), distinct audience, reduces founder load |
| D14 Case 1 showroom | **Yes** | Yes | Yes (per showcase) | Branding assets | Skill (Case 1 Showroom) | Commercial artifact with its own lifecycle (anonymization, audience targeting); distinct from ZIP delivery |
| D15 Follow-up | Orchestrator responsibility | Yes | Yes | None | Orchestrator + Deliverable Forge | Fases 8–9 reuse existing skills; no new logic; orchestrator schedules them |
### 4. Gap Analysis
**What the PRD already covers:**
- Fixed 6-phase method, 10 rules of conduct, analytical module routing
- 27 artifacts with `target_chars`, `max_chars`, `overflow_action`, `compression_policy`
- 9-phase operational flow with gates and mandatory human review
- Manifest YAML structure, `depends_on` graph, packaging rules
- QA checklist as blocking gate before packaging
**What the PRD does not cover (mandatory per rule set):**
| Mandatory point | PRD coverage | Gap | Risk if not incorporated |
|---|---|---|---|
| 1. Data connectors enrich analysis | Not mentioned | Full gap | Consultant must retype context already in Drive / past cases; breaks <24h target |
| 2. Consultative FAQ agent | Not mentioned | Full gap | Founder intervention cap (≤3 / attendance) cannot be met without self-service |
| 3. Three delivery types (e-book / live sprint / ZIP) | Only ZIP covered | 2 of 3 missing | Cannot serve the three audience segments in the macro strategy |
| 4. Simulation of consumer/business variables | Not mentioned | Full gap | Action plan lacks decision support; upsell narrative weakens |
| 5. Structured Linear project generation | Not mentioned | Full gap | Plan does not convert to executable backlog; handoff is manual and lossy |
| 6. Mandatory Phase 0 personalization | Implicit (consultant context) | Gap as formal phase | No consistent config across attendances; knowledge loss between cases |
| 7. Customized agent delivery as [SKILL.md](http://SKILL.md) | Not mentioned | Full gap | Cannot ship a per-consultant skill package — blocks continuity product |
| 8. Consultant control over method/weights/order/sources/depth/mode | Partially (flags mentioned) | Mostly gap | "Operator of the skill" has no knob — customization requires code edits |
| 9. Interactive questionnaire UX | Implicit (10-field intake) | UX pattern missing | Consultant operates by hand; breaks <15 min setup criterion |
| 10. Skill count justification | Not applicable (PRD not a skill spec) | Addressed in this document | N/A |
| 11. Case 1 showcase | Not mentioned | Full gap | No proof-of-value artifact for commercial channel (MRD canais exige prova) |
**Conclusion:** The PRD is an excellent methodological and artifact specification but treats the system as a single monolithic skill. A production Skill architecture must add seven capabilities (connectors, FAQ, simulation, Linear bridge, Phase 0 formalization, three delivery modes, Case 1 showcase) and formalize the consultant-facing configuration surface.
### 5. Layered Architecture Hypothesis
```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 0 — Personalization (Phase 0)                            │
│  bussola-personalization → consultant_config.yaml + client intake│
├─────────────────────────────────────────────────────────────────┤
│  LAYER 1 — Onboarding / FAQ                                     │
│  bussola-consultative-faq (support surface for L0–L6)           │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 2 — Analytical Core                                      │
│  bussola-diagnostic-engine (normalize → diagnose → prioritize → plan)│
├─────────────────────────────────────────────────────────────────┤
│  LAYER 3 — Simulation (on-demand)                               │
│  bussola-simulation-lab (consumer / business variable scenarios)│
├─────────────────────────────────────────────────────────────────┤
│  LAYER 4 — Deliverable Generation & Packaging                   │
│  bussola-deliverable-forge (27 artifacts, 3 delivery modes, ZIP)│
├─────────────────────────────────────────────────────────────────┤
│  LAYER 5 — Execution Handoff                                    │
│  bussola-execution-bridge (Linear project + Slack notify)       │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 6 — Showcase                                             │
│  bussola-case1-showroom (anonymized commercial demo)            │
├─────────────────────────────────────────────────────────────────┤
│  ORCHESTRATOR (cross-cutting)                                   │
│  bussola-orchestrator — phase routing, gates, manifest.yaml,    │
│  QA enforcement, human-review checkpoints, packaging coordinator│
├─────────────────────────────────────────────────────────────────┤
│  CONNECTORS (support, not skills)                               │
│  Google Drive · Gmail · Linear · Slack · Notion · Figma (via MCP)│
└─────────────────────────────────────────────────────────────────┘
```
---
## PHASE 1 — SKILL DECOMPOSITION
**Total: 8 skills.** Justification lives in the "Modularization Decisions" section.
### SKILL #1 — bussola-orchestrator
**PURPOSE**
Central coordinator for every Bússola PME case. Owns phase state (1–9), enforces gates and human-review checkpoints, maintains the case `manifest.yaml` with `depends_on` graph, routes work to specialist skills, blocks packaging until `qa_checklist` is 100% green, and produces the final ZIP (or hands off to other delivery modes via Deliverable Forge).
**TRIGGER CONDITIONS**
- "novo caso Bússola PME", "start consultoria PME", "rodar atendimento completo"
- "avançar para fase [N]", "gerar pacote final do caso [id]"
- Implicit trigger when a consultant starts a new case after Phase 0 is already configured
**EXPECTED INPUT**
Case ID + `consultant_config.yaml` (from Personalization) + raw consultant brief. Optional: uploaded documents, prior-case references.
**EXPECTED OUTPUT**
`manifest.yaml` (evolving), phase transitions logged in `decision_log`, routing calls to specialist skills, final ZIP built via Deliverable Forge, status surface visible to consultant.
**TECHNOLOGY STACK**
YAML processing, `visualize:show_widget` for phase dashboard, `create_file` for manifest, `present_files` for ZIP handoff. MCPs: Slack (status notifications), Google Drive (optional manifest mirror).
**REQUIRED BUNDLED RESOURCES**
- `scripts/manifest_[builder.py](http://builder.py)` — generates and updates manifest.yaml
- `scripts/gate_[validator.py](http://validator.py)` — evaluates each phase gate criterion
- `scripts/qa_checklist_[evaluator.py](http://evaluator.py)`
- `references/9_phase_[flow.md](http://flow.md)` — the operational flow spec
- `references/gates_[reference.md](http://reference.md)` — gate criteria per phase
- `references/dependency_graph.yaml` — artifact-to-artifact depends_on
- `templates/manifest.yaml.j2`
- `templates/readme_[pacote.md](http://pacote.md).j2`
**DEPENDENCIES ON OTHER SKILLS**
- **Calls:** bussola-personalization (Phase 0), bussola-diagnostic-engine (Phases 2–5), bussola-deliverable-forge (Phases 4, 5, 7, 8, 9 partials), bussola-execution-bridge (post-Phase 5), bussola-simulation-lab (on-demand between 4 and 5)
- **Consumes:** consultant_config.yaml, case artifacts from specialists
- **Does not call:** bussola-consultative-faq (independent trigger surface), bussola-case1-showroom (separate lifecycle)
**ROLE IN THE ARCHITECTURE**
orchestrator
**IMPLEMENTATION PRIORITY**
High — nothing else is usable end-to-end without orchestration; however, it should be built **after** Personalization and Diagnostic Engine stubs exist (iteration order in Phase 4).
**JUSTIFICATION FOR EXISTENCE**
QA gates, manifest maintenance, and human-review enforcement are cross-cutting responsibilities. Pushing them into any specialist skill creates circular dependencies (e.g., Deliverable Forge would have to call Diagnostic Engine to re-validate). A dedicated orchestrator is the textbook fix for multi-phase, gated workflows with shared state.
---
### SKILL #2 — bussola-personalization
**PURPOSE**
Formalizes Phase 0 (consultant setup) **and** the client-side interactive intake. Produces the `consultant_config.yaml` that governs the entire system for that consultant (method weights, dependency order flexibility, source usage, deliverable depth, operating mode: `guided` vs `hands_off`, branding tokens). Runs the 10-field client intake as an interactive questionnaire inside the conversation.
**TRIGGER CONDITIONS**
- "configurar consultor Bússola", "onboarding do consultor", "setup inicial"
- "iniciar intake do cliente", "preencher os 10 campos do caso"
- "quero ajustar o método / os pesos / o modo de operação"
**EXPECTED INPUT**
Consultant profile info (first run) OR existing `consultant_config.yaml` (updates). For client intake: raw brief + conversational signals.
**EXPECTED OUTPUT**
- `consultant_config.yaml` — persistent per consultant
- `intake_[normalized.md](http://normalized.md)` (seed) — 10 fields validated
- `information_[gaps.md](http://gaps.md)` (initial) — fields that could not be filled
**TECHNOLOGY STACK**
`ask_user_input_v0` (interactive UX — mandatory point #9), YAML generation, `visualize:show_widget` (optional) for config preview. MCPs: Google Drive (persist config), Gmail / Notion (pull context for the client).
**REQUIRED BUNDLED RESOURCES**
- `scripts/config_schema_[validator.py](http://validator.py)` — validates consultant_config.yaml against schema
- `scripts/intake_field_[checker.py](http://checker.py)` — enforces 10-field completeness
- `references/consultant_config_schema.yaml` — full schema with all knobs
- `references/operating_[modes.md](http://modes.md)` — `guided` vs `hands_off` behavior contracts
- `references/method_weights_[reference.md](http://reference.md)` — what each weight controls
- `templates/consultant_config.yaml.j2`
- `templates/intake_questions.yaml` — the 10-field interactive question set
- `examples/consultant_config_guided.yaml`
- `examples/consultant_config_hands_off.yaml`
- `examples/intake_filled_commercial_[case.md](http://case.md)`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** bussola-orchestrator (always first on a new case)
- **Consumes:** MCP connectors (Drive/Gmail/Notion) for context enrichment (mandatory point #1)
- **Feeds:** bussola-diagnostic-engine, bussola-deliverable-forge, bussola-execution-bridge (all read `consultant_config.yaml`)
**ROLE IN THE ARCHITECTURE**
configuration_personalization
**IMPLEMENTATION PRIORITY**
High — blocking for every other skill; required to satisfy mandatory points #6, #8, #9.
**JUSTIFICATION FOR EXISTENCE**
Phase 0 is mandatory (rule #6) and governs every downstream skill via `consultant_config.yaml`. Interactive questionnaire UX (rule #9) and consultant control knobs (rule #8) are orthogonal to analysis — they are a configuration surface. Merging this into Diagnostic Engine would violate single-responsibility and pollute analytical logic with UX state.
---
### SKILL #3 — bussola-diagnostic-engine
**PURPOSE**
Executes the fixed analytical pipeline (Phases 2–5 of the operational flow): normalization → diagnosis → prioritization → action plan. Enforces the 10 rules of conduct (R01–R10). Routes to the correct analytical module (SWOT / 5 Whys / Pareto / 5W2H / PDCA / Ishikawa / JTBD / Esforço×Impacto). Produces all 9 internal-track analytical artifacts.
**TRIGGER CONDITIONS**
- "rodar diagnóstico", "gerar problem_tree", "priorizar problemas do caso"
- "fazer 5 porquês neste caso", "aplicar Pareto / SWOT / 5W2H"
- "gerar plano de ação com responsáveis e prazos"
**EXPECTED INPUT**
`intake_[normalized.md](http://normalized.md)` (validated) + `consultant_config.yaml` + optional documents.
**EXPECTED OUTPUT**
`hypotheses_log`, `problem_tree`, `diagnostic_working`, `priority_score`, `plano_acao` (pre-delivery form), `decision_log` (analytical entries).
**TECHNOLOGY STACK**
Reasoning-heavy (Opus 4.7 native), YAML/markdown generation, `create_file`. No external MCPs required — all work happens on already-normalized input.
**REQUIRED BUNDLED RESOURCES**
- `scripts/module_[router.py](http://router.py)` — selects analytical module from problem type
- `scripts/priority_[scorer.py](http://scorer.py)` — computes score with configurable weights
- `scripts/action_field_[enforcer.py](http://enforcer.py)` — rejects items missing owner / deadline / KPI
- `references/6_phase_[method.md](http://method.md)`
- `references/analytical_modules/` — one file per module (SWOT, 5Whys, Pareto, 5W2H, PDCA, Ishikawa, JTBD, esforco_impacto)
- `references/fact_inference_[hypothesis.md](http://hypothesis.md)` — separation rules
- `templates/problem_[tree.md](http://tree.md).j2`
- `templates/priority_[score.md](http://score.md).j2`
- `templates/plano_[acao.md](http://acao.md).j2`
- `examples/diagnostico_commercial_[case.md](http://case.md)`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** bussola-orchestrator
- **Consumes:** output of bussola-personalization
- **Feeds:** bussola-deliverable-forge, bussola-simulation-lab, bussola-execution-bridge
**ROLE IN THE ARCHITECTURE**
specialist
**IMPLEMENTATION PRIORITY**
High — core value. The entire product promise (24h diagnosis) depends on this.
**JUSTIFICATION FOR EXISTENCE**
The analytical pipeline is a single method-fixed sequence where splitting into N skills would add coordination overhead (four orchestration gates instead of one) with zero reuse benefit — the outputs only ever flow into the same downstream. Internal sub-phases are enforced via internal gates, not inter-skill gates. This directly satisfies the <3-prompts-per-attendance criterion in the framework failure test.
---
### SKILL #4 — bussola-deliverable-forge
**PURPOSE**
Generates all 27 artifacts respecting density rules, compression policies, two-track separation, overflow actions (`summarize` / `split_by_area` / `convert_to_table` / `move_to_appendix`), derivation rules, and the three mandatory delivery modes: **ZIP package**, **interactive e-book**, **live sprint artifact**. Runs the `qa_checklist` before any client-track artifact leaves the skill.
**TRIGGER CONDITIONS**
- "gerar entregáveis do cliente", "montar resumo executivo / plano / apresentação"
- "compilar ZIP do caso", "gerar e-book interativo", "gerar artefato sprint ao vivo"
- "aplicar compressão / dividir por área / converter para tabela" (overflow actions)
**EXPECTED INPUT**
Analytical artifacts from Diagnostic Engine + `consultant_config.yaml` (for branding, depth, mode) + optional simulation output.
**EXPECTED OUTPUT**
- Trilha cliente (8 artifacts): resumo_executivo, diagnostico_executivo, matriz_prioridades, plano_acao, playbook_operacional, apresentacao_executiva, relatorio_acompanhamento, proposta_continuidade
- Trilha governança (7 artifacts): manifest_yaml, readme_pacote, changelog, output_versions, exported_files_index, color_tokens, sop_processo
- Final deliverable in chosen mode(s): ZIP file, interactive HTML e-book artifact, or live sprint widget
**TECHNOLOGY STACK**
`create_file`, `visualize:show_widget` (interactive e-book + live sprint), `docx`/`pptx`/`pdf` skills (for classical formats when consultant requests). MCPs: Google Drive (optional upload), Slack (delivery notification). Python: python-docx, python-pptx, Jinja2, zipfile.
**REQUIRED BUNDLED RESOURCES**
- `scripts/density_[validator.py](http://validator.py)` — validates target_chars / max_chars per artifact
- `scripts/overflow_[executor.py](http://executor.py)` — runs the 4 overflow actions automatically
- `scripts/derivation_[checker.py](http://checker.py)` — enforces "derived < parent" rule
- `scripts/qa_checklist_[runner.py](http://runner.py)`
- `scripts/zip_[packager.py](http://packager.py)`
- `scripts/ebook_[renderer.py](http://renderer.py)` — produces the interactive HTML e-book
- `scripts/sprint_artifact_[renderer.py](http://renderer.py)` — produces the live sprint widget
- `references/27_artifacts_[spec.md](http://spec.md)` — character limits, fields, policies
- `references/density_[rules.md](http://rules.md)` — hard / soft limit behavior
- `references/two_track_[separation.md](http://separation.md)`
- `references/delivery_[modes.md](http://modes.md)` — contract for ZIP vs e-book vs sprint
- `templates/` — one template per client-track artifact (8 files)
- `assets/branding_default/` — default color tokens, typography
- `examples/zip_commercial_case/` — exemplary ZIP
- `examples/ebook_commercial_case.html`
- `examples/sprint_artifact_commercial_case.html`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** bussola-orchestrator (multiple phases)
- **Consumes:** outputs of bussola-diagnostic-engine and bussola-simulation-lab
- **Feeds:** bussola-execution-bridge (plano_acao consumption), bussola-case1-showroom (anonymized artifacts as showcase source)
**ROLE IN THE ARCHITECTURE**
delivery
**IMPLEMENTATION PRIORITY**
High — no client-facing value without it. Build after Diagnostic Engine reaches MVP.
**JUSTIFICATION FOR EXISTENCE**
Density rules, compression policies, and the three delivery modes are a self-contained generation and rendering responsibility with high template reuse. Keeping it separate from Diagnostic Engine means method changes do not trigger template churn, and vice versa. The skill is also the only place where `qa_checklist` runs as a terminal gate — centralizing this satisfies operational_constraint OC-07.
---
### SKILL #5 — bussola-simulation-lab
**PURPOSE**
On-demand decision support: runs consumer-behavior and business-variable simulations to stress-test the proposed action plan. Typical simulations: pricing sensitivity, conversion-funnel variations, capacity scenarios, cohort retention, channel-mix ROI. Produces a scenario report that can optionally feed `plano_acao` refinement or `proposta_continuidade` narratives.
**TRIGGER CONDITIONS**
- "simular cenários para esse caso", "testar variações de preço"
- "e se aumentarmos a conversão em X%?", "análise de sensibilidade no plano"
- "rodar simulação de comportamento do consumidor"
**EXPECTED INPUT**
`plano_acao` (pre-delivery) + baseline metrics (pulled from intake or asked interactively) + simulation parameters (ranges, variables to vary).
**EXPECTED OUTPUT**
`simulation_[report.md](http://report.md)` with: baseline, scenarios, sensitivity table, recommended adjustments. Optionally an interactive chart artifact via `visualize:show_widget` (Recharts / Plotly).
**TECHNOLOGY STACK**
Python: numpy, pandas, scipy, mathjs (React widget). `visualize:show_widget` for interactive chart. `bash_tool` for computation.
**REQUIRED BUNDLED RESOURCES**
- `scripts/pricing_[sensitivity.py](http://sensitivity.py)`
- `scripts/funnel_[simulator.py](http://simulator.py)`
- `scripts/capacity_[scenarios.py](http://scenarios.py)`
- `scripts/cohort_[retention.py](http://retention.py)`
- `references/simulation_[catalog.md](http://catalog.md)` — which simulation for which problem type
- `references/assumptions_[library.md](http://library.md)` — default ranges for common SME variables
- `templates/simulation_[report.md](http://report.md).j2`
- `templates/sensitivity_widget.jsx`
- `examples/pricing_simulation_commercial_[case.md](http://case.md)`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** bussola-orchestrator (on-demand between Phases 4 and 5, or before Phase 9)
- **Consumes:** outputs of bussola-diagnostic-engine
- **Feeds:** bussola-deliverable-forge (optional input into `plano_acao` or `proposta_continuidade`)
**ROLE IN THE ARCHITECTURE**
simulation
**IMPLEMENTATION PRIORITY**
Medium — not blocking for F1 pilot but required for credible upsell narrative and satisfies mandatory point #4. Build after core pipeline (#1–#4) is stable.
**JUSTIFICATION FOR EXISTENCE**
Simulation has a distinct input/output contract (parameter ranges → scenario report), runs on-demand rather than in the main flow, and has its own reference/assumptions library. Embedding it into Diagnostic Engine would bloat that skill with quantitative tooling that is not activated in every case. Isolation also allows the skill to evolve its catalog independently.
---
### SKILL #6 — bussola-execution-bridge
**PURPOSE**
Transforms an approved `plano_acao` into a structured Linear project: creates the project, maps action items to epics, breaks them into issues with owners / deadlines / labels, sets dependencies, and posts a Slack notification. Enforces a mandatory human approval gate before any Linear write.
**TRIGGER CONDITIONS**
- "levar plano para o Linear", "criar projeto de execução"
- "handoff para execução", "transformar plano em issues"
- "notificar time no Slack sobre o plano"
**EXPECTED INPUT**
Approved `plano_acao` (must have all items with owner / deadline / KPI) + `consultant_config.yaml` (Linear workspace, project template, Slack channel).
**EXPECTED OUTPUT**
Linear project URL, list of created epics and issues with IDs, Slack message confirmation, `execution_handoff_[log.md](http://log.md)` entry in `decision_log`.
**TECHNOLOGY STACK**
Linear MCP (mandatory), Slack MCP (mandatory), optional Notion MCP (documentation mirror). Uses existing `projects-to-linear` skill pattern where available.
**REQUIRED BUNDLED RESOURCES**
- `scripts/plano_to_[epics.py](http://epics.py)` — maps plan structure to Linear hierarchy
- `scripts/dependency_[mapper.py](http://mapper.py)` — derives issue dependencies from plano_acao
- `scripts/human_approval_[gate.py](http://gate.py)` — blocks writes until explicit confirmation
- `references/linear_project_[template.md](http://template.md)`
- `references/epic_issue_[conventions.md](http://conventions.md)`
- `templates/linear_[epic.md](http://epic.md).j2`
- `templates/slack_handoff_[message.md](http://message.md).j2`
- `examples/linear_project_commercial_[case.md](http://case.md)`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** bussola-orchestrator (after Phase 5 approval)
- **Consumes:** approved `plano_acao` from Deliverable Forge, `consultant_config.yaml` from Personalization
- **Triggers:** nothing downstream inside Bússola; produces external artifacts only
**ROLE IN THE ARCHITECTURE**
execution
**IMPLEMENTATION PRIORITY**
Medium — not blocking for F1 initial deliverable (plan can still be handed off manually), but required to meet mandatory point #5 and to compete with consulting offers that already ship to Asana / Monday / Linear.
**JUSTIFICATION FOR EXISTENCE**
External write operations with destructive potential (Linear project creation, Slack broadcast) must be isolated behind an approval gate. Embedding this in Deliverable Forge would mix read-only delivery with write-side effects. The MCP dependency surface is also distinct.
---
### SKILL #7 — bussola-consultative-faq
**PURPOSE**
Self-service consultative agent for consultants: answers method questions, explains artifact purposes, recommends analytical modules, troubleshoots gate failures, and escalates to the founder only when the question falls outside the knowledge base. Directly attacks the "max 3 founder interventions per attendance" success criterion.
**TRIGGER CONDITIONS**
- "como uso o Bússola", "qual a diferença entre X e Y", "quando uso o Pareto vs SWOT"
- "posso pular uma fase", "por que o qa_checklist está falhando"
- "o que vai na trilha interna vs trilha do cliente"
- Implicit: consultant asks a method or system question during a case
**EXPECTED INPUT**
Free-form question (text) + optional `consultant_config.yaml` context + optional current case state (phase, artifact with issue).
**EXPECTED OUTPUT**
Structured answer citing the relevant reference document, with a "Try this next" actionable follow-up, and an escalation flag if the question is out-of-scope.
**TECHNOLOGY STACK**
Reference retrieval (local files), optional web_search fallback for general Anthropic/Claude platform questions, `visualize:show_widget` for process diagrams when helpful.
**REQUIRED BUNDLED RESOURCES**
- `scripts/question_[classifier.py](http://classifier.py)` — routes to the right reference doc
- `scripts/escalation_[detector.py](http://detector.py)` — flags out-of-scope questions
- `references/method_[faq.md](http://faq.md)`
- `references/artifact_[faq.md](http://faq.md)`
- `references/gate_[troubleshooting.md](http://troubleshooting.md)`
- `references/analytical_module_[selector.md](http://selector.md)`
- `references/operating_modes_[faq.md](http://faq.md)`
- `templates/faq_[answer.md](http://answer.md).j2`
- `examples/faq_common_[questions.md](http://questions.md)`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** direct user invocation (independent trigger surface)
- **Reads:** same reference library used by Orchestrator and Diagnostic Engine (shared `/references` via symbolic link or duplicated per skill at build time)
- **Does not write:** pure read skill
**ROLE IN THE ARCHITECTURE**
onboarding_faq
**IMPLEMENTATION PRIORITY**
High for pilot F1 — success criterion SC-C05 ("máx 3 intervenções do fundador por atendimento após o segundo caso") cannot be met without a self-service layer.
**JUSTIFICATION FOR EXISTENCE**
FAQ has a distinct trigger surface (consultant asks a question; no case state mutation), a distinct audience (consultant, not client), and its own reference library. Embedding in Orchestrator would pollute case state machines with conversational Q&A. Splitting also allows the FAQ to be invoked outside an active case.
---
### SKILL #8 — bussola-case1-showroom
**PURPOSE**
Builds a showcase/showroom deliverable from a real (anonymized) completed case. Serves as commercial proof of value — the "Case 1" artifact referenced in the macro strategy (Instagram / LinkedIn / landing page). Produces a multi-format showcase: interactive HTML demo, short deck, landing-page-ready copy, and a one-pager.
**TRIGGER CONDITIONS**
- "gerar showcase do Bússola", "montar case 1", "preparar demo comercial"
- "anonimizar este caso para portfólio", "gerar material de prova social"
**EXPECTED INPUT**
A completed case (ZIP or artifact set) + anonymization rules + target audience (consultant / agency / PME founder) + channel (LinkedIn / landing page / sales call).
**EXPECTED OUTPUT**
- `showcase_interactive.html` (live demo using `visualize:show_widget`)
- `showcase_deck.pptx` (short, 6–8 slides)
- `landing_page_[copy.md](http://copy.md)`
- `one_pager.pdf`
- `anonymization_[log.md](http://log.md)` (audit of what was redacted)
**TECHNOLOGY STACK**
`pptx` skill, `pdf` skill, `visualize:show_widget` (React), `frontend-design` skill for the HTML demo. MCPs: Google Drive (publish location), optional Figma (for custom visual).
**REQUIRED BUNDLED RESOURCES**
- `scripts/[anonymizer.py](http://anonymizer.py)` — PII removal + name substitution + metric rounding
- `scripts/narrative_[extractor.py](http://extractor.py)` — turns artifacts into narrative beats
- `references/showcase_[structure.md](http://structure.md)`
- `references/anonymization_[rules.md](http://rules.md)`
- `references/channel_[adaptation.md](http://adaptation.md)` — copy rules per channel
- `templates/showcase_deck.pptx.j2`
- `templates/landing_[copy.md](http://copy.md).j2`
- `templates/showcase_interactive.jsx`
- `assets/showcase_branding/`
- `examples/case1_commercial_sprint.html`
**DEPENDENCIES ON OTHER SKILLS**
- **Called by:** direct user invocation (commercial asset lifecycle, not inside a case)
- **Consumes:** completed case package (usually from Deliverable Forge output)
- **Does not mutate:** original case artifacts
**ROLE IN THE ARCHITECTURE**
support
**IMPLEMENTATION PRIORITY**
Medium — build after first successful F1 case so there is substrate to showcase. Required for mandatory point #11 and for MRD channel strategy to work.
**JUSTIFICATION FOR EXISTENCE**
Showcase has a distinct lifecycle (post-case, commercial purpose), a distinct audience (prospects, not consultant), and distinct outputs (marketing artifacts, not operational ones). Absorbing into Deliverable Forge would conflate internal/client/governance tracks with marketing assets and break the 27-artifact spec.
---
## PHASE 2 — FULL DIRECTORY STRUCTURE
### bussola-orchestrator/
```
bussola-orchestrator/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── manifest_[builder.py](http://builder.py)                  [mandatory]
│   ├── gate_[validator.py](http://validator.py)                    [mandatory]
│   ├── qa_checklist_[evaluator.py](http://evaluator.py)            [mandatory]
│   └── phase_[router.py](http://router.py)                      [mandatory]
├── references/
│   ├── 9_phase_[flow.md](http://flow.md)                      [mandatory, kept out of [SKILL.md](http://SKILL.md) — 400+ lines]
│   ├── gates_[reference.md](http://reference.md)                   [mandatory]
│   ├── dependency_graph.yaml                [mandatory]
│   └── governance_[matrix.md](http://matrix.md)                 [mandatory]
├── assets/
│   └── phase_dashboard.jsx                  [optional, for widget]
├── templates/
│   ├── manifest.yaml.j2                     [mandatory]
│   └── readme_[pacote.md](http://pacote.md).j2                  [mandatory]
└── examples/
    └── manifest_commercial_case.yaml        [optional]
```
### bussola-personalization/
```
bussola-personalization/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── config_schema_[validator.py](http://validator.py)           [mandatory]
│   └── intake_field_[checker.py](http://checker.py)              [mandatory]
├── references/
│   ├── consultant_config_schema.yaml        [mandatory — full schema out of [SKILL.md](http://SKILL.md)]
│   ├── operating_[modes.md](http://modes.md)                   [mandatory]
│   └── method_weights_[reference.md](http://reference.md)          [mandatory]
├── assets/
│   └── config_preview_widget.jsx            [optional]
├── templates/
│   ├── consultant_config.yaml.j2            [mandatory]
│   └── intake_questions.yaml                [mandatory]
└── examples/
    ├── consultant_config_guided.yaml        [mandatory — onboarding proof]
    ├── consultant_config_hands_off.yaml     [mandatory]
    └── intake_filled_commercial_[case.md](http://case.md)     [optional]
```
### bussola-diagnostic-engine/
```
bussola-diagnostic-engine/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── module_[router.py](http://router.py)                     [mandatory]
│   ├── priority_[scorer.py](http://scorer.py)                   [mandatory]
│   └── action_field_[enforcer.py](http://enforcer.py)             [mandatory]
├── references/
│   ├── 6_phase_[method.md](http://method.md)                    [mandatory]
│   ├── fact_inference_[hypothesis.md](http://hypothesis.md)         [mandatory]
│   └── analytical_modules/                  [mandatory, stays out of [SKILL.md](http://SKILL.md)]
│       ├── [swot.md](http://swot.md)
│       ├── 5_[whys.md](http://whys.md)
│       ├── [pareto.md](http://pareto.md)
│       ├── [5w2h.md](http://5w2h.md)
│       ├── [pdca.md](http://pdca.md)
│       ├── [ishikawa.md](http://ishikawa.md)
│       ├── [jtbd.md](http://jtbd.md)
│       └── esforco_[impacto.md](http://impacto.md)
├── templates/
│   ├── problem_[tree.md](http://tree.md).j2                   [mandatory]
│   ├── priority_[score.md](http://score.md).j2                 [mandatory]
│   └── plano_[acao.md](http://acao.md).j2                     [mandatory]
└── examples/
    └── diagnostico_commercial_[case.md](http://case.md)       [optional]
```
### bussola-deliverable-forge/
```
bussola-deliverable-forge/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── density_[validator.py](http://validator.py)                 [mandatory]
│   ├── overflow_[executor.py](http://executor.py)                 [mandatory — executes 4 actions]
│   ├── derivation_[checker.py](http://checker.py)                [mandatory]
│   ├── qa_checklist_[runner.py](http://runner.py)               [mandatory]
│   ├── zip_[packager.py](http://packager.py)                      [mandatory]
│   ├── ebook_[renderer.py](http://renderer.py)                    [mandatory — delivery mode 2]
│   └── sprint_artifact_[renderer.py](http://renderer.py)          [mandatory — delivery mode 3]
├── references/
│   ├── 27_artifacts_[spec.md](http://spec.md)                 [mandatory — out of [SKILL.md](http://SKILL.md), 800+ lines]
│   ├── density_[rules.md](http://rules.md)                     [mandatory]
│   ├── two_track_[separation.md](http://separation.md)              [mandatory]
│   └── delivery_[modes.md](http://modes.md)                    [mandatory]
├── assets/
│   └── branding_default/                    [mandatory]
│       ├── color_tokens.yaml
│       └── typography.css
├── templates/
│   ├── resumo_[executivo.md](http://executivo.md).j2               [mandatory]
│   ├── diagnostico_[executivo.md](http://executivo.md).j2          [mandatory]
│   ├── matriz_[prioridades.md](http://prioridades.md).j2             [mandatory]
│   ├── plano_[acao.md](http://acao.md).j2                     [mandatory]
│   ├── playbook_[operacional.md](http://operacional.md).j2           [mandatory]
│   ├── apresentacao_executiva.pptx.j2       [mandatory]
│   ├── relatorio_[acompanhamento.md](http://acompanhamento.md).j2       [mandatory]
│   ├── proposta_[continuidade.md](http://continuidade.md).j2          [mandatory]
│   ├── ebook_interactive.jsx                [mandatory]
│   └── sprint_artifact.jsx                  [mandatory]
└── examples/
    ├── zip_commercial_case/                 [mandatory, full directory]
    ├── ebook_commercial_case.html           [mandatory]
    └── sprint_artifact_commercial_case.html [mandatory]
```
### bussola-simulation-lab/
```
bussola-simulation-lab/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── pricing_[sensitivity.py](http://sensitivity.py)               [mandatory]
│   ├── funnel_[simulator.py](http://simulator.py)                  [mandatory]
│   ├── capacity_[scenarios.py](http://scenarios.py)                [optional]
│   └── cohort_[retention.py](http://retention.py)                  [optional]
├── references/
│   ├── simulation_[catalog.md](http://catalog.md)                [mandatory]
│   └── assumptions_[library.md](http://library.md)               [mandatory]
├── templates/
│   ├── simulation_[report.md](http://report.md).j2              [mandatory]
│   └── sensitivity_widget.jsx               [mandatory]
└── examples/
    └── pricing_simulation_commercial_[case.md](http://case.md)
```
### bussola-execution-bridge/
```
bussola-execution-bridge/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── plano_to_[epics.py](http://epics.py)                    [mandatory]
│   ├── dependency_[mapper.py](http://mapper.py)                 [mandatory]
│   └── human_approval_[gate.py](http://gate.py)               [mandatory]
├── references/
│   ├── linear_project_[template.md](http://template.md)           [mandatory]
│   └── epic_issue_[conventions.md](http://conventions.md)            [mandatory]
├── templates/
│   ├── linear_[epic.md](http://epic.md).j2                    [mandatory]
│   └── slack_handoff_[message.md](http://message.md).j2          [mandatory]
└── examples/
    └── linear_project_commercial_[case.md](http://case.md)    [optional]
```
### bussola-consultative-faq/
```
bussola-consultative-faq/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── question_[classifier.py](http://classifier.py)               [mandatory]
│   └── escalation_[detector.py](http://detector.py)               [mandatory]
├── references/
│   ├── method_[faq.md](http://faq.md)                        [mandatory]
│   ├── artifact_[faq.md](http://faq.md)                      [mandatory]
│   ├── gate_[troubleshooting.md](http://troubleshooting.md)              [mandatory]
│   ├── analytical_module_[selector.md](http://selector.md)        [mandatory]
│   └── operating_modes_[faq.md](http://faq.md)               [mandatory]
├── templates/
│   └── faq_[answer.md](http://answer.md).j2                     [mandatory]
└── examples/
    └── faq_common_[questions.md](http://questions.md)              [optional]
```
### bussola-case1-showroom/
```
bussola-case1-showroom/
├── [SKILL.md](http://SKILL.md)                                 [mandatory]
├── scripts/
│   ├── [anonymizer.py](http://anonymizer.py)                        [mandatory]
│   └── narrative_[extractor.py](http://extractor.py)               [mandatory]
├── references/
│   ├── showcase_[structure.md](http://structure.md)                [mandatory]
│   ├── anonymization_[rules.md](http://rules.md)               [mandatory]
│   └── channel_[adaptation.md](http://adaptation.md)                [mandatory]
├── assets/
│   └── showcase_branding/                   [mandatory]
├── templates/
│   ├── showcase_deck.pptx.j2                [mandatory]
│   ├── landing_[copy.md](http://copy.md).j2                   [mandatory]
│   └── showcase_interactive.jsx             [mandatory]
└── examples/
    └── case1_commercial_sprint.html         [optional]
```
**Structural rationale:**
- Volume isolation: `27_artifacts_[spec.md](http://spec.md)`, `9_phase_[flow.md](http://flow.md)`, `consultant_config_schema.yaml`, and `analytical_modules/` stay out of [SKILL.md](http://SKILL.md) because each exceeds 400 lines on its own.
- Reuse: `references/` directories can be symlinked or synced between Orchestrator, Diagnostic Engine, and FAQ so method docs have a single source of truth.
- Maintenance: templates and scripts are isolated per skill to avoid ripple-effect changes when a single artifact's spec evolves.
- `examples/` always contains at least one full worked case to anchor evals and onboarding.
---
## PHASE 3 — [SKILL.md](http://SKILL.md) FRONTMATTER
### bussola-orchestrator
```yaml
---
name: bussola-orchestrator
description: >
  Use this skill to run or resume a Bússola PME consultative case end-to-end.
  Activate on triggers like "novo caso Bússola", "rodar atendimento PME",
  "avançar fase", "montar pacote do caso", or any request that implies
  multi-phase coordination of a PME consulting cycle (9 phases from intake
  to continuity). This skill owns the case manifest.yaml, enforces QA gates
  and mandatory human-review checkpoints (diagnostico_executivo,
  apresentacao_executiva, proposta_continuidade), routes work to specialist
  skills (personalization, diagnostic-engine, deliverable-forge, simulation-lab,
  execution-bridge), and produces the final ZIP. Do NOT use for standalone
  questions about the method (use consultative-faq) or for one-off artifact
  generation without a case context (use deliverable-forge directly).
compatibility:
  tools: [mcp__slack, mcp__google_drive]
dependencies: [pyyaml, jinja2, zipfile]
---
```
**Calibration note:** description leads with trigger phrases in Portuguese (consultant's operating language per PRD), enumerates the three mandatory human-review checkpoints explicitly so the model does not skip them, and explicitly excludes two look-alike patterns (method questions, standalone artifact generation) to prevent wrongful activation.
---
### bussola-personalization
```yaml
---
name: bussola-personalization
description: >
  Use this skill for Bússola PME Phase 0 setup and client intake. Activate on
  "configurar consultor", "onboarding do consultor", "setup inicial", "iniciar
  caso PME", "preencher intake", "ajustar pesos do método", "trocar modo de
  operação". Produces consultant_config.yaml that governs the entire system
  downstream (method weights, dependency order, source usage, deliverable
  depth, operating mode guided vs hands_off, branding tokens) AND runs the
  10-field interactive intake questionnaire for each new client case. Uses
  ask_user_input_v0 for conversational UX and optionally pulls context from
  Google Drive / Gmail / Notion via MCP to pre-fill intake fields. Must be
  invoked before Diagnostic Engine on any new case; consultant_config.yaml
  must exist before Orchestrator can route to any specialist skill.
compatibility:
  tools: [mcp__google_drive, mcp__gmail, mcp__notion, ask_user_input_v0]
dependencies: [pyyaml, jsonschema]
---
```
**Calibration note:** explicitly names the six knobs of rule #8 to force the model to populate all of them, and calls out the blocking relationship with Orchestrator so it is never skipped.
---
### bussola-diagnostic-engine
```yaml
---
name: bussola-diagnostic-engine
description: >
  Use this skill to execute the analytical core of a Bússola PME case:
  normalization (fact/inference/hypothesis separation), diagnosis
  (problem_tree + hypotheses_log + diagnostic_working), prioritization
  (priority_score + decision_log), and action planning (plano_acao with
  mandatory owner/deadline/KPI per item). Activate on "rodar diagnóstico",
  "gerar problem_tree", "priorizar problemas", "aplicar 5 porquês / SWOT /
  Pareto / 5W2H / Ishikawa / JTBD / esforço vs impacto", "gerar plano de
  ação". Enforces the 10 rules of conduct (R01–R10) including R07 "input
  bruto nunca alimenta análise diretamente" — requires intake_normalized as
  precondition. Routes to the correct analytical module based on problem
  type; never dumps multiple frameworks. Produces internal-track analytical
  artifacts only; client-track artifacts are generated by Deliverable Forge.
compatibility:
  tools: []
dependencies: [pyyaml, jinja2]
---
```
**Calibration note:** explicitly lists all analytical modules in the trigger phrases so the model recognizes method-specific vocabulary, names R07 to prevent the most common architecture violation (skipping normalization), and draws a sharp boundary with Deliverable Forge.
---
### bussola-deliverable-forge
```yaml
---
name: bussola-deliverable-forge
description: >
  Use this skill to generate any of the 27 Bússola PME artifacts and to
  produce the three delivery modes: ZIP package, interactive HTML e-book,
  and live sprint artifact. Activate on "gerar resumo executivo / diagnóstico
  / matriz / plano / playbook / apresentação / relatório / proposta",
  "compilar ZIP", "gerar e-book interativo", "gerar artefato sprint ao vivo",
  "aplicar compressão / dividir por área / converter para tabela" (overflow
  actions). Enforces density rules (target_chars / max_chars), executes the
  four overflow actions automatically when max_chars is exceeded, maintains
  derivation rule (derived artifact always shorter than parent), runs
  qa_checklist as a terminal blocking gate before any client-track artifact
  is released, and keeps trilha interna and trilha cliente strictly separated
  in packaging. Requires upstream analytical artifacts from Diagnostic Engine.
compatibility:
  tools: [mcp__google_drive, mcp__slack, visualize__show_widget]
dependencies: [python-docx, python-pptx, jinja2, zipfile, pyyaml]
---
```
**Calibration note:** names all eight client-track artifacts and all four overflow actions in Portuguese to maximize trigger match rate; surfaces the terminal QA gate because operational_constraint OC-07 depends on it.
---
### bussola-simulation-lab
```yaml
---
name: bussola-simulation-lab
description: >
  Use this skill to run consumer-behavior and business-variable simulations
  as decision support for a Bússola PME case. Activate on "simular cenários",
  "análise de sensibilidade", "e se aumentarmos / diminuirmos X", "testar
  variações de preço", "simular funil de conversão", "cenários de capacidade",
  "simular coortes de retenção". Produces simulation_[report.md](http://report.md) plus an
  interactive sensitivity chart artifact. Consumes plano_acao and baseline
  metrics; output can feed plano_acao refinement or proposta_continuidade.
  On-demand skill — not part of the mandatory main flow; typically invoked
  between Phase 4 (prioritization) and Phase 5 (action plan) or before
  Phase 9 (continuity). Do NOT use for simple arithmetic or forecasts
  unrelated to an active case — those belong in plain analysis.
compatibility:
  tools: [visualize__show_widget, bash_tool]
dependencies: [numpy, pandas, scipy]
---
```
**Calibration note:** lists the four most common simulation types explicitly, clarifies that this is on-demand (not in the main flow) to prevent the orchestrator from routing every case through it, and draws an explicit negative boundary to block general math questions.
---
### bussola-execution-bridge
```yaml
---
name: bussola-execution-bridge
description: >
  Use this skill to transform an approved Bússola PME plano_acao into a
  structured Linear project with epics, issues, dependencies, and a Slack
  notification to the consultant's team. Activate on "levar plano para o
  Linear", "criar projeto de execução", "handoff para execução", "transformar
  plano em issues", "notificar time no Slack sobre o plano". ENFORCES a
  mandatory human approval gate before any Linear write operation — never
  creates a project without explicit confirmation. Requires plano_acao where
  every item has owner/deadline/KPI (will refuse otherwise) and a
  consultant_config.yaml with Linear workspace and Slack channel configured.
  Does not support Asana/Monday/Jira in this version; extension points exist
  in references/ but are not implemented.
compatibility:
  tools: [mcp__linear, mcp__slack, mcp__notion]
dependencies: [requests]
---
```
**Calibration note:** the human-approval gate is the highest-risk element (destructive external writes) so it is surfaced early in the description; the refusal condition (incomplete plano_acao) is explicit to prevent partial handoffs.
---
### bussola-consultative-faq
```yaml
---
name: bussola-consultative-faq
description: >
  Use this skill when a Bússola PME consultant asks a method, system, or
  troubleshooting question. Activate on "como uso o Bússola", "qual a
  diferença entre X e Y", "quando uso Pareto vs SWOT", "posso pular uma
  fase", "por que o qa_checklist está falhando", "o que vai na trilha
  interna", "como funciona o modo hands-off", and similar. Answers from the
  reference library (method FAQ, artifact FAQ, gate troubleshooting,
  analytical module selector, operating modes FAQ). Flags questions that
  fall outside scope for founder escalation. Pure read skill — never
  mutates case state. Should be the first point of contact for any
  consultant question to hit the founder-intervention success criterion
  (≤3 interventions per attendance after the second case).
compatibility:
  tools: [web_search]
dependencies: []
---
```
**Calibration note:** description explicitly ties the skill's purpose to success criterion SC-C05 so prioritization reasoning is preserved; the "pure read" statement prevents the skill from accidentally writing case state.
---
### bussola-case1-showroom
```yaml
---
name: bussola-case1-showroom
description: >
  Use this skill to build a Bússola PME Case 1 showcase from a completed
  (anonymized) real case for commercial demonstration. Activate on "gerar
  showcase", "montar case 1", "preparar demo comercial", "anonimizar este
  caso para portfólio", "gerar material de prova social para LinkedIn /
  landing page / Instagram". Produces four coordinated outputs: interactive
  HTML demo, short slide deck (6–8 slides), landing-page copy, and a
  one-pager PDF. Runs anonymization rules (PII removal, name substitution,
  metric rounding) and logs the redactions. Requires a completed case
  package as input (typically from Deliverable Forge output) plus target
  audience and channel. Commercial artifact — does not mutate the source
  case; outputs live in a separate showcase directory.
compatibility:
  tools: [visualize__show_widget, mcp__google_drive, mcp__figma]
dependencies: [python-pptx, jinja2, reportlab]
---
```
**Calibration note:** all four output formats are listed so the model delivers the complete set; anonymization is surfaced as a first-class concern because a leak from a pilot case would be a reputational risk for the founder.
---
## PHASE 4 — DEPENDENCY MAP
### Textual Dependency Diagram
```
                              ┌────────────────────────────┐
                              │  bussola-personalization   │
                              │  (Phase 0 + Client Intake) │
                              └──────────────┬─────────────┘
                                             │ consultant_config.yaml
                                             │ intake_[normalized.md](http://normalized.md)
                                             ▼
         ┌────────────────────────────────────────────────────────┐
         │             bussola-orchestrator (cross-cutting)       │
         │   manifest.yaml · gate enforcement · phase routing     │
         └────────┬────────────────────────────────────┬──────────┘
                  │                                    │
                  ▼                                    ▼
     ┌──────────────────────────┐      ┌─────────────────────────────┐
     │ bussola-diagnostic-engine│◄─────┤  bussola-consultative-faq   │
     │ Phases 2–5 analytical    │ (ref)│  (independent trigger)      │
     │ pipeline                 │      └─────────────────────────────┘
     └─────────┬────────────────┘
               │ internal-track artifacts
               │
               ├────────────────────► ┌──────────────────────────┐
               │  (on-demand)         │  bussola-simulation-lab  │
               │                      └─────────┬────────────────┘
               │                                │ simulation_report
               ▼                                ▼
     ┌────────────────────────────────────────────────────────┐
     │           bussola-deliverable-forge                    │
     │  27 artifacts · ZIP · e-book · live sprint · QA gate   │
     └────────┬──────────────────────────────┬────────────────┘
              │ approved plano_acao          │ completed case
              ▼                              ▼
     ┌────────────────────────┐    ┌──────────────────────────┐
     │ bussola-execution-bridge│    │  bussola-case1-showroom  │
     │ Linear + Slack          │    │  (post-case, commercial) │
     └────────────────────────┘    └──────────────────────────┘
```
### Recommended Implementation Order
| Order | Skill | Rationale |
|---|---|---|
| 1 | bussola-personalization | Every other skill reads `consultant_config.yaml`; blocking for all. Mandatory points #6, #8, #9. |
| 2 | bussola-diagnostic-engine | Core value. Without it the product has nothing to deliver. Build thin first (one analytical module), add the rest incrementally. |
| 3 | bussola-deliverable-forge | Starts with ZIP mode only; e-book and live sprint come after first F1 case is stable. |
| 4 | bussola-orchestrator | Built fourth because #1–#3 need to exist as stubs before phase routing is meaningful; reaches MVP when it can coordinate a full case. |
| 5 | bussola-consultative-faq | Parallel track — can ship after #4 to hit SC-C05. Does not block the core path. |
| 6 | bussola-execution-bridge | After first F1 case validates the method. Has external write side-effects; premature build risks writing garbage to Linear. |
| 7 | bussola-simulation-lab | After core pipeline is stable. Optional in F1; becomes critical for continuity/upsell narrative. |
| 8 | bussola-case1-showroom | Built only after there is at least one successful F1 case to showcase. Mandatory point #11. |
### Sequence Rationale
The sequence is driven by three principles:
1. **Configuration before analysis** — no skill runs without `consultant_config.yaml`, so Personalization is first.
2. **Value path first, optionality after** — Diagnostic Engine + Deliverable Forge (+ Orchestrator stitching) is the end-to-end value path; everything else is additive.
3. **External writes last** — Execution Bridge has destructive side effects (Linear projects) and Case 1 Showroom depends on real case substrate; both must wait.
### Data Flow Map
```
raw_consultant_input ──► personalization ──► consultant_config.yaml
raw_client_brief    ──► personalization ──► intake_normalized + information_gaps
                                             │
                                             ▼
consultant_config + intake_normalized ──► diagnostic-engine
                                             │
                                             ▼
hypotheses_log + problem_tree + diagnostic_working + priority_score + decision_log + plano_acao(pre)
                                             │
                      ┌──────────────────────┼──────────────────────┐
                      │                      │                      │
                      ▼                      ▼                      ▼
            (optional) simulation-lab   deliverable-forge    orchestrator manifest.yaml
                      │                      │
                      ▼                      ▼
            simulation_report         27 artifacts + ZIP / e-book / sprint
                                             │
                          ┌──────────────────┼──────────────────┐
                          ▼                  ▼                  ▼
                   (if approved)         (Phase 8–9)      (commercial, later)
                   execution-bridge      follow-up cycles  case1-showroom
                          │
                          ▼
                   Linear project + Slack notify
```
### Governance Points
1. **Gate G0 — Intake validation (Personalization → Orchestrator)**
   Block advancement until all 10 fields are filled or an explicit `information_gap` flag is registered for each missing field. No skipping allowed in `guided` mode.
2. **Gate G1 — Normalization validation (inside Diagnostic Engine, Phase 2 → 3)**
   `intake_normalized` must be approved by consultant before analytical work starts. Satisfies R07 ("input bruto nunca alimenta análise diretamente").
3. **Gate G2 — Prioritization before planning (Phase 4 → 5)**
   `priority_score` must be complete with all required fields per row before `plano_acao` generation begins.
4. **Gate G3 — Action plan field enforcement (Phase 5 output)**
   Every item in `plano_acao` must have owner, deadline, and KPI. Deliverable Forge refuses to render incomplete items.
5. **Gate G4 — qa_checklist terminal gate (before any client-track release)**
   `qa_checklist` must be 100% green. OC-07 is codified here.
6. **Gate G5 — Human review on 3 critical client artifacts**
   `diagnostico_executivo`, `apresentacao_executiva`, `proposta_continuidade` require explicit consultant approval before packaging. BR-G governance requirement.
7. **Gate G6 — Execution approval (before Linear write)**
   Execution Bridge refuses to call Linear MCP without explicit confirmation message from consultant (e.g., "confirmo a criação do projeto").
8. **Methodological calibration gate (Phase 0 → anywhere)**
   Consultant can override method weights, dependency order, deliverable depth via `consultant_config.yaml` — but changes outside the allowed schema are rejected by `config_schema_[validator.py](http://validator.py)`.
9. **Operating mode gates**
   - `guided` mode: every G0–G6 gate requires explicit consultant confirmation
   - `hands_off` mode: G0, G1, G3, G4 auto-advance if conditions are met; G2, G5, G6 always require human (non-negotiable)
10. **Source usage gate (Personalization)**
    Before pulling from Drive/Gmail/Notion via MCP, consultant must whitelist sources in `consultant_config.yaml`. No silent reads.
---
## PHASE 5 — TEST CASES
### bussola-orchestrator
```json
{
  "skill_name": "bussola-orchestrator",
  "evals": [
    {
      "id": 1,
      "prompt": "Vamos começar um novo caso Bússola PME para a consultora Marina, cliente é uma agência de marketing de 6 pessoas com problema comercial. Roda o atendimento completo.",
      "expected_output": "Orchestrator initializes manifest.yaml, routes to bussola-personalization for Phase 0 check and intake, then sequences calls to diagnostic-engine → deliverable-forge with G0–G5 gates.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "Já estou na fase 5 do caso #BP-014 do Marina, o plano de ação ficou pronto mas quero pular direto para apresentação sem revisar o diagnóstico executivo. Avança por favor.",
      "expected_output": "Orchestrator refuses to skip G5 (human review on diagnóstico_executivo); surfaces the blocking gate and the consultant_config.yaml mode, suggesting either guided confirmation or returning to Phase 5 output review.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Me explica a diferença entre o 5W2H e o PDCA no contexto de PMEs de serviço.",
      "expected_output": "Orchestrator does NOT trigger; this is a method question that should route to bussola-consultative-faq instead.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Uses explicit "novo caso Bússola PME" + "roda o atendimento completo" which matches orchestration triggers.
**Edge case (2)** — Tests governance enforcement; the orchestrator must refuse to bypass G5 even under consultant pressure.
**Negative case (3)** — Method question without case context; belongs to FAQ skill. Misfire here would cause session noise.
---
### bussola-personalization
```json
{
  "skill_name": "bussola-personalization",
  "evals": [
    {
      "id": 1,
      "prompt": "Primeiro caso do João no Bússola. Preciso fazer o setup dele — ele é consultor de operações para agências pequenas, quer modo guided, e o branding dele usa azul-marinho e cinza.",
      "expected_output": "Skill runs consultant onboarding flow, asks via ask_user_input_v0 for missing knobs (method weights, source whitelist, deliverable depth), produces consultant_config.yaml with operating_mode=guided and correct branding tokens.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "Cliente me mandou um PDF de 40 páginas com a situação da empresa dele. Quero puxar isso para o intake sem ter que reescrever tudo.",
      "expected_output": "Skill activates intake flow, pulls document via Google Drive MCP (if whitelisted) or prompts for upload, pre-fills 10 fields from PDF content, flags any field still missing as information_gap.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Quero gerar a apresentação executiva final para os sócios da Marina amanhã cedo.",
      "expected_output": "Skill does NOT trigger; this is a deliverable-forge responsibility (apresentacao_executiva generation). Personalization only handles Phase 0 and intake.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Explicit Phase 0 setup with consultant profile; all six consultant_config knobs are in play.
**Edge case (2)** — Tests MCP-backed intake enrichment (mandatory point #1); also tests graceful fallback if source not whitelisted.
**Negative case (3)** — Deliverable generation has nothing to do with Phase 0; wrongful trigger would skip the analytical pipeline.
---
### bussola-diagnostic-engine
```json
{
  "skill_name": "bussola-diagnostic-engine",
  "evals": [
    {
      "id": 1,
      "prompt": "O intake normalized do caso #BP-017 está aprovado. Roda o diagnóstico e gera problem_tree, priority_score e plano de ação usando Pareto na priorização porque temos dados de frequência.",
      "expected_output": "Skill executes Phases 2–5: generates hypotheses_log, problem_tree (with root cause), diagnostic_working, priority_score using Pareto module with justification in decision_log, and plano_acao with owner/deadline/KPI enforced per item.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "Quero rodar o diagnóstico mas tem coisa no intake que ainda é hipótese sem evidência. O cliente não mandou os números.",
      "expected_output": "Skill proceeds but enforces R07 and R05: tags every hypothesis-derived node in problem_tree with a 'sem evidência' flag, registers information_gaps entries for each missing data point, and limits plano_acao items that depend on missing data to provisional status.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Me dá um resumo do Plano Real de 1994 e o impacto na inflação brasileira.",
      "expected_output": "Skill does NOT trigger; this is an unrelated historical/economic question with no case context, no intake_normalized, and no consultant_config.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Explicit analytical module request (Pareto) with justification; tests that the module router honors the consultant's choice and records it in decision_log.
**Edge case (2)** — Tests graceful handling of information_gaps and the fact/inference/hypothesis separation rule (R05, R07) under incomplete data.
**Negative case (3)** — Unrelated question; wrongful trigger would cause the skill to invent a case to analyze.
---
### bussola-deliverable-forge
```json
{
  "skill_name": "bussola-deliverable-forge",
  "evals": [
    {
      "id": 1,
      "prompt": "Todos os artefatos internos do caso #BP-009 estão prontos e o plano de ação foi aprovado pela consultora. Gera os entregáveis do cliente e monta o ZIP final.",
      "expected_output": "Skill runs qa_checklist, generates 8 client-track artifacts respecting density limits, runs overflow_action automatically where triggered, applies branding from consultant_config, assembles ZIP with two-track structure, produces manifest.yaml and README.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "O diagnóstico executivo saiu com 14.000 caracteres, muito acima do max_chars. Não quero truncar manual. Resolve.",
      "expected_output": "Skill invokes overflow_[executor.py](http://executor.py) with action=split_by_area (per 27_artifacts_[spec.md](http://spec.md) for diagnostico_executivo), divides by functional domain, ensures derived version still shorter than diagnostic_working parent, updates manifest.yaml.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Não entendi por que o Ishikawa é melhor que o 5 Whys para problemas operacionais. Me explica.",
      "expected_output": "Skill does NOT trigger; this is a method question for consultative-faq. No artifact generation is requested.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Full end-of-case packaging with all the contractual guarantees (QA, density, tracks, branding).
**Edge case (2)** — Tests automatic overflow handling per mandatory point (the hard_limit rule in skills_deliverables_densidades); the model must choose the correct overflow action from `27_artifacts_[spec.md](http://spec.md)`, not invent one.
**Negative case (3)** — Pure method explanation; wrongful trigger would produce a useless artifact.
---
### bussola-simulation-lab
```json
{
  "skill_name": "bussola-simulation-lab",
  "evals": [
    {
      "id": 1,
      "prompt": "O plano de ação da agência prevê aumentar o ticket médio em 30%. Roda uma análise de sensibilidade: e se conseguirmos só 10%? E 50%? Qual o impacto na receita anual projetada?",
      "expected_output": "Skill runs pricing_[sensitivity.py](http://sensitivity.py) with three scenarios (10%, 30%, 50%), produces simulation_[report.md](http://report.md) with baseline + three scenarios + revenue delta table, renders interactive sensitivity widget via visualize:show_widget.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "A cliente quer saber se vale a pena contratar mais um consultor sênior agora ou só daqui a 6 meses. Considera capacidade atual, pipeline, sazonalidade.",
      "expected_output": "Skill activates capacity_[scenarios.py](http://scenarios.py), asks interactively for missing baseline metrics (current capacity, pipeline conversion, seasonality pattern), produces comparative scenario report with break-even analysis.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Quanto é 23 * 47?",
      "expected_output": "Skill does NOT trigger; plain arithmetic unrelated to any case or business variable simulation. Model should answer directly without skill invocation.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Classic sensitivity analysis with explicit parameter ranges.
**Edge case (2)** — Tests the interactive-baseline-collection flow and the capacity simulation catalog.
**Negative case (3)** — Pure arithmetic; wrongful trigger would be absurd overkill.
---
### bussola-execution-bridge
```json
{
  "skill_name": "bussola-execution-bridge",
  "evals": [
    {
      "id": 1,
      "prompt": "O plano de ação do caso #BP-011 está aprovado pela Marina. Leva para o Linear, cria as epics e issues, e notifica o time dela no Slack no canal #ops.",
      "expected_output": "Skill validates plano_acao completeness (owner/deadline/KPI per item), asks for explicit human-approval confirmation, only then creates Linear project via MCP with epics mapped to prioridades and issues mapped to actions, posts Slack message to #ops, logs the handoff in decision_log.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "O plano tem 12 ações mas 3 delas estão sem KPI definido ainda. Manda pro Linear mesmo assim que a gente resolve depois.",
      "expected_output": "Skill REFUSES to proceed; enforces R09 and G3 gate, lists the 3 incomplete items, suggests completing them in Diagnostic Engine before re-invoking, does not write to Linear.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Cria uma task no Linear pra eu lembrar de comprar café amanhã.",
      "expected_output": "Skill does NOT trigger; this is personal task management, not a Bússola PME plano_acao handoff. Should route to a generic Linear tool or suggest a plain MCP call.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Full handoff with human-approval gate respected.
**Edge case (2)** — Tests the refusal path when plano_acao is incomplete; this is the most important safety behavior of the skill.
**Negative case (3)** — Personal productivity, no Bússola case; wrongful trigger would create confusing artifacts in the consultant's Linear.
---
### bussola-consultative-faq
```json
{
  "skill_name": "bussola-consultative-faq",
  "evals": [
    {
      "id": 1,
      "prompt": "Posso pular a fase de normalização se o cliente já me mandou tudo organizado em planilha?",
      "expected_output": "Skill answers no, citing R07 ('input bruto nunca alimenta análise diretamente'), explains that normalization enforces fact/inference/hypothesis tagging which a spreadsheet does not provide, points to references/6_phase_[method.md](http://method.md), suggests running Normalization in hands_off mode since input is already structured.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "O Bússola consegue operar em inglês também, ou só em português?",
      "expected_output": "Skill recognizes this is an out-of-scope question (not in the reference library), flags escalation, and answers with what it can infer plus a suggestion to confirm with the founder. Does not fabricate a definitive answer.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Roda o diagnóstico do caso da Marina agora.",
      "expected_output": "Skill does NOT trigger; this is a case execution command, not a question. Should route to orchestrator or diagnostic-engine.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Common method question with a clear answer in the reference library; tests correct retrieval + rule citation.
**Edge case (2)** — Out-of-scope question; tests escalation detection rather than confabulation.
**Negative case (3)** — Execution command, not a question; wrongful FAQ trigger would leave a case stalled.
---
### bussola-case1-showroom
```json
{
  "skill_name": "bussola-case1-showroom",
  "evals": [
    {
      "id": 1,
      "prompt": "Acabei de concluir o caso #BP-002 com resultado excelente. Monta o Case 1 pra gente usar no LinkedIn e na landing. Anonimiza tudo — nome da empresa, valores exatos e nomes dos sócios.",
      "expected_output": "Skill runs anonymizer on the case package, produces showcase_interactive.html + showcase_deck.pptx (6–8 slides) + landing_[copy.md](http://copy.md) + one_pager.pdf, logs all redactions in anonymization_[log.md](http://log.md), adapts copy for LinkedIn tone.",
      "should_trigger": true
    },
    {
      "id": 2,
      "prompt": "Quero o showcase mas o cliente original não autorizou usar nem dados fictícios próximos dos reais. Usa números genéricos de mercado.",
      "expected_output": "Skill proceeds with stronger anonymization profile: replaces specific metrics with industry benchmarks from assumptions_[library.md](http://library.md), flags the case as 'illustrative' in the output, adds a disclaimer block to all artifacts, logs the substitution.",
      "should_trigger": true
    },
    {
      "id": 3,
      "prompt": "Gera o diagnóstico executivo do caso #BP-003.",
      "expected_output": "Skill does NOT trigger; client-track diagnostic is a deliverable-forge responsibility. Showroom is only for post-case commercial artifacts.",
      "should_trigger": false
    }
  ]
}
```
**Positive case (1)** — Standard post-case showcase with explicit anonymization; all four outputs required.
**Edge case (2)** — Tests graceful degradation when real-data anonymization is insufficient; must pivot to benchmark-backed illustrative mode.
**Negative case (3)** — In-case deliverable generation; wrongful trigger would skip the 9-phase flow entirely.
---
## PHASE 6 — FINAL OUTPUT
### 1. Summary Table
| Skill | Role | Domain | Stack | MCPs | Scripts | Priority |
|---|---|---|---|---|---|---|
| bussola-orchestrator | orchestrator | Phase routing + gates + manifest | YAML, Jinja2, ZIP | Slack, Drive | 4 | High (4th) |
| bussola-personalization | configuration_personalization | Phase 0 + client intake | YAML, ask_user_input | Drive, Gmail, Notion | 2 | High (1st) |
| bussola-diagnostic-engine | specialist | Analytical core (P2–P5) | Reasoning + templates | — | 3 | High (2nd) |
| bussola-deliverable-forge | delivery | 27 artifacts + 3 delivery modes + QA | docx, pptx, widgets, ZIP | Drive, Slack, widgets | 7 | High (3rd) |
| bussola-simulation-lab | simulation | Consumer & business variable scenarios | numpy, pandas, widgets | widgets | 4 | Medium (7th) |
| bussola-execution-bridge | execution | plano_acao → Linear project | Linear MCP | Linear, Slack, Notion | 3 | Medium (6th) |
| bussola-consultative-faq | onboarding_faq | Method Q&A + escalation | Reference retrieval | web_search | 2 | High (5th) |
| bussola-case1-showroom | support | Post-case commercial showcase | pptx, pdf, widgets, frontend-design | Drive, Figma, widgets | 2 | Medium (8th) |
### 2. Complete [SKILL.md](http://SKILL.md) Files
Each [SKILL.md](http://SKILL.md) below is ready to save to `skills/[skill-name]/[SKILL.md](http://SKILL.md)`.
---
#### skills/bussola-orchestrator/[SKILL.md](http://SKILL.md)
```markdown
---
name: bussola-orchestrator
description: >
  Use this skill to run or resume a Bússola PME consultative case end-to-end.
  Activate on triggers like "novo caso Bússola", "rodar atendimento PME",
  "avançar fase", "montar pacote do caso", or any request that implies
  multi-phase coordination of a PME consulting cycle (9 phases from intake
  to continuity). This skill owns the case manifest.yaml, enforces QA gates
  and mandatory human-review checkpoints (diagnostico_executivo,
  apresentacao_executiva, proposta_continuidade), routes work to specialist
  skills (personalization, diagnostic-engine, deliverable-forge, simulation-lab,
  execution-bridge), and produces the final ZIP. Do NOT use for standalone
  questions about the method (use consultative-faq) or for one-off artifact
  generation without a case context (use deliverable-forge directly).
compatibility:
  tools: [mcp__slack, mcp__google_drive]
dependencies: [pyyaml, jinja2, zipfile]
---
# Bússola PME — Orchestrator
## When to use
Start of a new case, resumption of an existing case, phase advancement,
gate evaluation, final packaging, or any multi-phase coordination.
## What this skill owns
- `manifest.yaml` per case (create, update, validate)
- Phase state (1–9) and transitions
- Gate enforcement (G0–G6, see `references/gates_[reference.md](http://reference.md)`)
- Routing to specialist skills (personalization, diagnostic-engine,
  deliverable-forge, simulation-lab, execution-bridge)
- Final ZIP packaging (via deliverable-forge)
- Human-review checkpoints on 3 critical client artifacts
## What this skill does NOT own
- Method questions → route to `bussola-consultative-faq`
- Artifact generation → delegate to `bussola-deliverable-forge`
- Analytical work → delegate to `bussola-diagnostic-engine`
- Linear writes → delegate to `bussola-execution-bridge`
- Showcase creation → use `bussola-case1-showroom` after case completion
## Operating procedure
1. Read (or create) `manifest.yaml` for the case.
2. Determine current phase and next required action from `references/9_phase_[flow.md](http://flow.md)`.
3. Evaluate the relevant gate using `scripts/gate_[validator.py](http://validator.py)`.
4. If gate blocks: surface the blocker and required human action; do not advance.
5. If gate allows: route to the appropriate specialist skill.
6. On return from specialist: update `manifest.yaml`, log to `decision_log`, re-evaluate gates.
7. At final phase: invoke `bussola-deliverable-forge` with mode (ZIP / e-book / sprint) from `consultant_config.yaml`.
## Governance non-negotiables
- Never skip G1 (normalization), G4 (qa_checklist), G5 (human review on 3 critical artifacts).
- `hands_off` mode does NOT bypass G2, G5, G6.
- Every phase transition is logged in `decision_log` with timestamp and trigger.
## Resources
- `references/9_phase_[flow.md](http://flow.md)` — full flow spec
- `references/gates_[reference.md](http://reference.md)` — gate criteria per phase
- `references/dependency_graph.yaml` — artifact depends_on graph
- `references/governance_[matrix.md](http://matrix.md)` — who decides what
- `scripts/manifest_[builder.py](http://builder.py)`, `scripts/gate_[validator.py](http://validator.py)`,
  `scripts/qa_checklist_[evaluator.py](http://evaluator.py)`, `scripts/phase_[router.py](http://router.py)`
- `templates/manifest.yaml.j2`, `templates/readme_[pacote.md](http://pacote.md).j2`
```
---]

---

**Claude** _2026-04-30_

OK
O e-book foi criado com toda a arquitetura do Praxys (antigo Bússola PME) organizada em 8 capítulos navegáveis:

**O que está dentro:**

1. **Visão Geral** — Cards com os números chave: 8 skills, 27 artefatos, 9 fases, 10 gates
2. **Executive Summary** — O sistema em 150 palavras + as 3 trilhas de artefatos + os 3 modos de entrega
3. **15 Domínios Funcionais** — Grid com D1–D15, cada um com role (Skill / Sub-módulo / Orchestrator)
4. **8 Skills** — Cards expandidos com purpose, triggers e outputs de cada skill
5. **Diagrama de Dependências** — Diagrama ASCII + fluxo de dados com setas visuais
6. **Roadmap** — Sequência dos 8 skills com justificativa de prioridade + 3 princípios da sequência
7. **10 Gates de QA** — G0–G9 com regras, fases e destaque dos gates invioláveis
8. **Casos de Teste** — Positivo / Edge / Negativo para os 4 primeiros skills (com nota sobre os outros 4)

**Quer que eu expanda alguma seção** — como adicionar os evals dos 4 skills restantes, um chapter de SKILL.md frontmatter, ou a estrutura de diretórios completa?

---

**Você** _2026-04-30_

dont make to large include this code to and delivery bolth with jsx

---

**Claude** _2026-04-30_

OK
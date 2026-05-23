---
title: "Estrutura de projeto full stack com normalização de agentes"
date: 2026-04-24
account: directjervis@gmail.com
uuid: e68ea2e9-f94c-4695-bf8c-d8fc8989efbd
messages: 12
tags: []
context: ""
---

**Você** _2026-04-24_

Agente Normalizer skill : scan this and Create prompt the build full stack of files,delivery,dependecies and all the main thing is creator e the file structre zip with id-s,NameDrop.etcc rede for this project:

---

**Claude** _2026-04-24_

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
{"returncode":0,"stdout":"README ✓\nARCHITECTURE ✓\n","stderr":""}
{"returncode":0,"stdout":"All agent files ✓\n","stderr":"/bin/sh: 3: cannot create /home/claude/bussola-v2/agents/AGT-01_orchestrator.md: Directory nonexistent\n/bin/sh: 57: cannot create /home/claude/bussola-v2/agents/AGT-02_personalization.md: Directory nonexistent\n/bin/sh: 106: cannot create /home/claude/bussola-v2/agents/AGT-03_analytical-engine.md: Directory nonexistent\n/bin/sh: 168: cannot create /home/claude/bussola-v2/agents/AGT-04_simulation-lab.md: Directory nonexistent\n/bin/sh: 208: cannot create /home/claude/bussola-v2/agents/AGT-05_architect.md: Directory nonexistent\n/bin/sh: 263: cannot create /home/claude/bussola-v2/agents/AGT-00_compilation-subroutine.md: Directory nonexistent\n/bin/sh: 300: cannot create /home/claude/bussola-v2/agents/AGT-06_final-delivery.md: Directory nonexistent\n"}
{"returncode":0,"stdout":"ARCHITECTURE.md\nREADME.md\n{agents,deliverables,gates,dependencies,gaps,data-flow,skills}\n","stderr":""}
{"returncode":0,"stdout":"ARCHITECTURE.md\nREADME.md\nagents\ndata-flow\ndeliverables\ndependencies\ngaps\ngates\nskills\n{agents,deliverables,gates,dependencies,gaps,data-flow,skills}\n","stderr":""}
{"returncode":0,"stdout":"Created: agents/AGT-01_orchestrator.md\nCreated: agents/AGT-02_personalization.md\nCreated: agents/AGT-03_analytical-engine.md\nCreated: agents/AGT-04_simulation-lab.md\nCreated: agents/AGT-05_architect.md\nCreated: agents/AGT-00_compilation-subroutine.md\nCreated: agents/AGT-06_final-delivery.md\nAll agents done\n","stderr":""}
{"returncode":0,"stdout":"Created: deliverables/ID-E1_normalized-followup.md\nCreated: deliverables/ID-E2_commercial-proposal.md\nCreated: deliverables/ID-E3_closing-contract-showroom.md\nCreated: deliverables/ID-E4_client-personalization-pack.md\nCreated: deliverables/ID-E5_normalized-data.md\nCreated: deliverables/ID-E6_bframes-output.md\nCreated: deliverables/ID-E7_basic-tier.md\nCreated: deliverables/ID-E8_lean-tier.md\nCreated: deliverables/ID-E9_full-tier.md\nCreated: deliverables/ID-E10_simulation-phase1.md\nCreated: deliverables/ID-E11_simulation-phase2.md\nCreated: deliverables/ID-E12_architect-pack.md\nCreated: deliverables/ID-E13_final-compilation.md\nCreated: deliverables/ID-E-MASTER_txt.md\nCreated: deliverables/ID-E-MASTER-TXT-LINEAR.md\nCreated: deliverables/ID-E-MASTER-FINAL.md\nCreated: deliverables/ID-E-MASTER-OPS.md\nAll deliverables done\n","stderr":""}
{"returncode":0,"stdout":"Created: gates/ID-I1_router.md\nCreated: gates/ID-I2_personalization-selector.md\nCreated: gates/ID-I3_global-prebalance.md\nCreated: gates/ID-I4_frame-selection.md\nCreated: gates/ID-I5_simulation-config.md\nCreated: gates/ID-I6_architect-directive.md\nCreated: dependencies/external-mcps.md\nCreated: dependencies/design-brand-system.md\nCreated: dependencies/skill-business-docs-pipeline.md\nCreated: gaps/source-gaps-registry.md\nAll gaps + deps done\n","stderr":""}
{"returncode":0,"stdout":"Created: data-flow/pipeline-flow.md\nCreated: skills/SKILL-AGT01-orchestrator.md\nCreated: skills/SKILL-AGT02-personalization.md\nCreated: skills/SKILL-AGT03-analytical-engine.md\nCreated: skills/SKILL-AGT04-simulation-lab.md\nCreated: skills/SKILL-AGT05-architect.md\nCreated: skills/SKILL-AGT06-final-delivery.md\nAll skills done\n","stderr":""}
{"returncode":0,"stdout":"/home/claude/bussola-v2/ARCHITECTURE.md\n/home/claude/bussola-v2/README.md\n/home/claude/bussola-v2/agents/AGT-00_compilation-subroutine.md\n/home/claude/bussola-v2/agents/AGT-01_orchestrator.md\n/home/claude/bussola-v2/agents/AGT-02_personalization.md\n/home/claude/bussola-v2/agents/AGT-03_analytical-engine.md\n/home/claude/bussola-v2/agents/AGT-04_simulation-lab.md\n/home/claude/bussola-v2/agents/AGT-05_architect.md\n/home/claude/bussola-v2/agents/AGT-06_final-delivery.md\n/home/claude/bussola-v2/data-flow/pipeline-flow.md\n/home/claude/bussola-v2/deliverables/ID-E-MASTER-FINAL.md\n/home/claude/bussola-v2/deliverables/ID-E-MASTER-OPS.md\n/home/claude/bussola-v2/deliverables/ID-E-MASTER-TXT-LINEAR.md\n/home/claude/bussola-v2/deliverables/ID-E-MASTER_txt.md\n/home/claude/bussola-v2/deliverables/ID-E10_simulation-phase1.md\n/home/claude/bussola-v2/deliverables/ID-E11_simulation-phase2.md\n/home/claude/bussola-v2/deliverables/ID-E12_architect-pack.md\n/home/claude/bussola-v2/deliverables/ID-E13_final-compilation.md\n/home/claude/bussola-v2/deliverables/ID-E1_normalized-followup.md\n/home/claude/bussola-v2/deliverables/ID-E2_commercial-proposal.md\n/home/claude/bussola-v2/deliverables/ID-E3_closing-contract-showroom.md\n/home/claude/bussola-v2/deliverables/ID-E4_client-personalization-pack.md\n/home/claude/bussola-v2/deliverables/ID-E5_normalized-data.md\n/home/claude/bussola-v2/deliverables/ID-E6_bframes-output.md\n/home/claude/bussola-v2/deliverables/ID-E7_basic-tier.md\n/home/claude/bussola-v2/deliverables/ID-E8_lean-tier.md\n/home/claude/bussola-v2/deliverables/ID-E9_full-tier.md\n/home/claude/bussola-v2/dependencies/design-brand-system.md\n/home/claude/bussola-v2/dependencies/external-mcps.md\n/home/claude/bussola-v2/dependencies/skill-business-docs-pipeline.md\n/home/claude/bussola-v2/gaps/source-gaps-registry.md\n/home/claude/bussola-v2/gates/ID-I1_router.md\n/home/claude/bussola-v2/gates/ID-I2_personalization-selector.md\n/home/claude/bussola-v2/gates/ID-I3_global-prebalance.md\n/home/claude/bussola-v2/gates/ID-I4_frame-selection.md\n/home/claude/bussola-v2/gates/ID-I5_simulation-config.md\n/home/claude/bussola-v2/gates/ID-I6_architect-directive.md\n/home/claude/bussola-v2/skills/SKILL-AGT01-orchestrator.md\n/home/claude/bussola-v2/skills/SKILL-AGT02-personalization.md\n/home/claude/bussola-v2/skills/SKILL-AGT03-analytical-engine.md\n/home/claude/bussola-v2/skills/SKILL-AGT04-simulation-lab.md\n/home/claude/bussola-v2/skills/SKILL-AGT05-architect.md\n/home/claude/bussola-v2/skills/SKILL-AGT06-final-delivery.md\n  adding: bussola-v2/ (stored 0%)\n  adding: bussola-v2/README.md (deflated 51%)\n  adding: bussola-v2/{agents,deliverables,gates,dependencies,gaps,data-flow,skills}/ (stored 0%)\n  adding: bussola-v2/skills/ (stored 0%)\n  adding: bussola-v2/skills/SKILL-AGT05-architect.md (deflated 34%)\n  adding: bussola-v2/skills/SKILL-AGT03-analytical-engine.md (deflated 38%)\n  adding: bussola-v2/skills/SKILL-AGT04-simulation-lab.md (deflated 37%)\n  adding: bussola-v2/skills/SKILL-AGT01-orchestrator.md (deflated 38%)\n  adding: bussola-v2/skills/SKILL-AGT06-final-delivery.md (deflated 37%)\n  adding: bussola-v2/skills/SKILL-AGT02-personalization.md (deflated 39%)\n  adding: bussola-v2/gaps/ (stored 0%)\n  adding: bussola-v2/gaps/source-gaps-registry.md (deflated 55%)\n  adding: bussola-v2/gates/ (stored 0%)\n  adding: bussola-v2/gates/ID-I4_frame-selection.md (deflated 39%)\n  adding: bussola-v2/gates/ID-I2_personalization-selector.md (deflated 45%)\n  adding: bussola-v2/gates/ID-I1_router.md (deflated 46%)\n  adding: bussola-v2/gates/ID-I5_simulation-config.md (deflated 38%)\n  adding: bussola-v2/gates/ID-I6_architect-directive.md (deflated 39%)\n  adding: bussola-v2/gates/ID-I3_global-prebalance.md (deflated 41%)\n  adding: bussola-v2/agents/ (stored 0%)\n  adding: bussola-v2/agents/AGT-00_compilation-subroutine.md (deflated 45%)\n  adding: bussola-v2/agents/AGT-06_final-delivery.md (deflated 53%)\n  adding: bussola-v2/agents/AGT-04_simulation-lab.md (deflated 47%)\n  adding: bussola-v2/agents/AGT-01_orchestrator.md (deflated 49%)\n  adding: bussola-v2/agents/AGT-02_personalization.md (deflated 51%)\n  adding: bussola-v2/agents/AGT-03_analytical-engine.md (deflated 50%)\n  adding: bussola-v2/agents/AGT-05_architect.md (deflated 52%)\n  adding: bussola-v2/ARCHITECTURE.md (deflated 49%)\n  adding: bussola-v2/data-flow/ (stored 0%)\n  adding: bussola-v2/data-flow/pipeline-flow.md (deflated 61%)\n  adding: bussola-v2/deliverables/ (stored 0%)\n  adding: bussola-v2/deliverables/ID-E11_simulation-phase2.md (deflated 36%)\n  adding: bussola-v2/deliverables/ID-E-MASTER-TXT-LINEAR.md (deflated 41%)\n  adding: bussola-v2/deliverables/ID-E2_commercial-proposal.md (deflated 31%)\n  adding: bussola-v2/deliverables/ID-E1_normalized-followup.md (deflated 42%)\n  adding: bussola-v2/deliverables/ID-E13_final-compilation.md (deflated 32%)\n  adding: bussola-v2/deliverables/ID-E10_simulation-phase1.md (deflated 40%)\n  adding: bussola-v2/deliverables/ID-E3_closing-contract-showroom.md (deflated 31%)\n  adding: bussola-v2/deliverables/ID-E9_full-tier.md (deflated 33%)\n  adding: bussola-v2/deliverables/ID-E-MASTER_txt.md (deflated 37%)\n  adding: bussola-v2/deliverables/ID-E8_lean-tier.md (deflated 29%)\n  adding: bussola-v2/deliverables/ID-E6_bframes-output.md (deflated 33%)\n  adding: bussola-v2/deliverables/ID-E-MASTER-OPS.md (deflated 34%)\n  adding: bussola-v2/deliverables/ID-E12_architect-pack.md (deflated 33%)\n  adding: bussola-v2/deliverables/ID-E5_normalized-data.md (deflated 34%)\n  adding: bussola-v2/deliverables/ID-E4_client-personalization-pack.md (deflated 32%)\n  adding: bussola-v2/deliverables/ID-E-MASTER-FINAL.md (deflated 35%)\n  adding: bussola-v2/deliverables/ID-E7_basic-tier.md (deflated 29%)\n  adding: bussola-v2/dependencies/ (stored 0%)\n  adding: bussola-v2/dependencies/external-mcps.md (deflated 48%)\n  adding: bussola-v2/dependencies/skill-business-docs-pipeline.md (deflated 38%)\n  adding: bussola-v2/dependencies/design-brand-system.md (deflated 43%)\n---\n-rw-r--r-- 1 root root 32K Apr 24 18:08 bussola-v2_architecture-stack_2026-04-24.zip\n","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
**44 arquivos, 7 pastas, pronto.**

Estrutura do ZIP:

```
bussola-v2/
├── README.md                          ← actor registry + file index
├── ARCHITECTURE.md                    ← normalized spec (xml blocks)
├── agents/
│   ├── AGT-01_orchestrator.md
│   ├── AGT-02_personalization.md
│   ├── AGT-03_analytical-engine.md
│   ├── AGT-04_simulation-lab.md
│   ├── AGT-05_architect.md
│   ├── AGT-00_compilation-subroutine.md   ← GAP-01 flagged
│   └── AGT-06_final-delivery.md
├── deliverables/                      ← ID-E1 a ID-E-MASTER-OPS (17 artefatos)
├── gates/                             ← ID-I1 a ID-I6 (6 gates)
├── dependencies/
│   ├── external-mcps.md               ← Linear, Drive, Slack, Gmail
│   ├── design-brand-system.md         ← GAP-08 flagged, blocker
│   └── skill-business-docs-pipeline.md
├── gaps/
│   └── source-gaps-registry.md        ← 10 gaps, prioridade HIGH/MEDIUM/LOW
├── data-flow/
│   └── pipeline-flow.md               ← diagrama completo AGT-01→AGT-06
└── skills/
    └── SKILL-AGT0{1-6}-*.md           ← frontmatter stubs prontos para invocar
```

**Próximos passos obrigatórios antes do dev começar:**
- **GAP-01** → definir AGT-00 (subroutine ou skill separada?)
- **GAP-08** → entregar design system (palette, fonts, grid)
- **GAP-09** → definir Cenários A / B / C e lógica de routing

---

**Você** _2026-04-24_

Quero uma estrutura de pastas vazias agora completa vc aí eu movo ir arquivos ! Principalmente os Id-e pois para cada um terá pasta de referências e exemplo

---

**Claude** _2026-04-24_

{"returncode":0,"stdout":"Created 61 directories\nTotal tree nodes: 85\n","stderr":""}
{"returncode":0,"stdout":"\n/ARCHITECTURE\n/README\n/agents\n/agents/AGT-00_compilation-subroutine\n/agents/AGT-01_orchestrator\n/agents/AGT-02_personalization\n/agents/AGT-03_analytical-engine\n/agents/AGT-04_simulation-lab\n/agents/AGT-05_architect\n/agents/AGT-06_final-delivery\n/data-flow\n/deliverables\n/deliverables/ID-E-MASTER-FINAL\n/deliverables/ID-E-MASTER-FINAL/examples\n/deliverables/ID-E-MASTER-FINAL/references\n/deliverables/ID-E-MASTER-OPS\n/deliverables/ID-E-MASTER-OPS/examples\n/deliverables/ID-E-MASTER-OPS/references\n/deliverables/ID-E-MASTER-TXT-LINEAR\n/deliverables/ID-E-MASTER-TXT-LINEAR/examples\n/deliverables/ID-E-MASTER-TXT-LINEAR/references\n/deliverables/ID-E-MASTER_txt\n/deliverables/ID-E-MASTER_txt/examples\n/deliverables/ID-E-MASTER_txt/references\n/deliverables/ID-E10_simulation-phase1\n/deliverables/ID-E10_simulation-phase1/examples\n/deliverables/ID-E10_simulation-phase1/references\n/deliverables/ID-E11_simulation-phase2\n/deliverables/ID-E11_simulation-phase2/examples\n/deliverables/ID-E11_simulation-phase2/references\n/deliverables/ID-E12_architect-pack\n/deliverables/ID-E12_architect-pack/examples\n/deliverables/ID-E12_architect-pack/references\n/deliverables/ID-E13_final-compilation\n/deliverables/ID-E13_final-compilation/examples\n/deliverables/ID-E13_final-compilation/references\n/deliverables/ID-E1_normalized-followup\n/deliverables/ID-E1_normalized-followup/examples\n/deliverables/ID-E1_normalized-followup/references\n/deliverables/ID-E2_commercial-proposal\n/deliverables/ID-E2_commercial-proposal/examples\n/deliverables/ID-E2_commercial-proposal/references\n/deliverables/ID-E3_closing-contract-showroom\n/deliverables/ID-E3_closing-contract-showroom/examples\n/deliverables/ID-E3_closing-contract-showroom/references\n/deliverables/ID-E4_client-personalization-pack\n/deliverables/ID-E4_client-personalization-pack/examples\n/deliverables/ID-E4_client-personalization-pack/references\n/deliverables/ID-E5_normalized-data\n/deliverables/ID-E5_normalized-data/examples\n/deliverables/ID-E5_normalized-data/references\n/deliverables/ID-E6_bframes-output\n/deliverables/ID-E6_bframes-output/examples\n/deliverables/ID-E6_bframes-output/references\n/deliverables/ID-E7_basic-tier\n/deliverables/ID-E7_basic-tier/examples\n/deliverables/ID-E7_basic-tier/references\n/deliverables/ID-E8_lean-tier\n/deliverables/ID-E8_lean-tier/examples\n/deliverables/ID-E8_lean-tier/references\n/deliverables/ID-E9_full-tier\n/deliverables/ID-E9_full-tier/examples\n/deliverables/ID-E9_full-tier/references\n/dependencies\n/dependencies/design-brand-system\n/dependencies/design-brand-system/assets\n/dependencies/design-brand-system/references\n/dependencies/external-mcps\n/dependencies/skill-business-docs-pipeline\n/gaps\n/gates\n/gates/ID-I1_router\n/gates/ID-I2_personalization-selector\n/gates/ID-I3_global-prebalance\n/gates/ID-I4_frame-selection\n/gates/ID-I5_simulation-config\n/gates/ID-I6_architect-directive\n/skills\n/skills/SKILL-AGT01-orchestrator\n/skills/SKILL-AGT02-personalization\n/skills/SKILL-AGT03-analytical-engine\n/skills/SKILL-AGT04-simulation-lab\n/skills/SKILL-AGT05-architect\n/skills/SKILL-AGT06-final-delivery\n  adding: bussola-v2-structure/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-FINAL/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-FINAL/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-FINAL/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-FINAL/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-FINAL/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER_txt/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER_txt/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER_txt/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER_txt/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER_txt/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-TXT-LINEAR/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-TXT-LINEAR/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-TXT-LINEAR/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-TXT-LINEAR/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-TXT-LINEAR/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E13_final-compilation/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E13_final-compilation/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E13_final-compilation/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E13_final-compilation/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E13_final-compilation/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E11_simulation-phase2/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E11_simulation-phase2/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E11_simulation-phase2/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E11_simulation-phase2/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E11_simulation-phase2/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E10_simulation-phase1/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E10_simulation-phase1/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E10_simulation-phase1/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E10_simulation-phase1/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E10_simulation-phase1/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E3_closing-contract-showroom/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E3_closing-contract-showroom/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E3_closing-contract-showroom/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E3_closing-contract-showroom/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E3_closing-contract-showroom/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E2_commercial-proposal/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E2_commercial-proposal/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E2_commercial-proposal/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E2_commercial-proposal/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E2_commercial-proposal/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E1_normalized-followup/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E1_normalized-followup/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E1_normalized-followup/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E1_normalized-followup/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E1_normalized-followup/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-OPS/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-OPS/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-OPS/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-OPS/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E-MASTER-OPS/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E7_basic-tier/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E7_basic-tier/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E7_basic-tier/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E7_basic-tier/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E7_basic-tier/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E4_client-personalization-pack/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E4_client-personalization-pack/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E4_client-personalization-pack/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E4_client-personalization-pack/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E4_client-personalization-pack/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E12_architect-pack/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E12_architect-pack/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E12_architect-pack/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E12_architect-pack/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E12_architect-pack/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E6_bframes-output/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E6_bframes-output/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E6_bframes-output/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E6_bframes-output/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E6_bframes-output/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E5_normalized-data/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E5_normalized-data/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E5_normalized-data/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E5_normalized-data/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E5_normalized-data/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E8_lean-tier/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E8_lean-tier/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E8_lean-tier/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E8_lean-tier/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E8_lean-tier/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E9_full-tier/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E9_full-tier/examples/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E9_full-tier/examples/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E9_full-tier/references/ (stored 0%)\n  adding: bussola-v2-structure/deliverables/ID-E9_full-tier/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gaps/ (stored 0%)\n  adding: bussola-v2-structure/gaps/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gates/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I6_architect-directive/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I6_architect-directive/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I4_frame-selection/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I4_frame-selection/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I2_personalization-selector/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I2_personalization-selector/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I1_router/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I1_router/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I3_global-prebalance/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I3_global-prebalance/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I5_simulation-config/ (stored 0%)\n  adding: bussola-v2-structure/gates/ID-I5_simulation-config/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/dependencies/ (stored 0%)\n  adding: bussola-v2-structure/dependencies/external-mcps/ (stored 0%)\n  adding: bussola-v2-structure/dependencies/external-mcps/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/dependencies/skill-business-docs-pipeline/ (stored 0%)\n  adding: bussola-v2-structure/dependencies/skill-business-docs-pipeline/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/dependencies/design-brand-system/ (stored 0%)\n  adding: bussola-v2-structure/dependencies/design-brand-system/assets/ (stored 0%)\n  adding: bussola-v2-structure/dependencies/design-brand-system/assets/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/dependencies/design-brand-system/references/ (stored 0%)\n  adding: bussola-v2-structure/dependencies/design-brand-system/references/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-03_analytical-engine/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-03_analytical-engine/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-04_simulation-lab/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-04_simulation-lab/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-05_architect/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-05_architect/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-06_final-delivery/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-06_final-delivery/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-02_personalization/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-02_personalization/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-01_orchestrator/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-01_orchestrator/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-00_compilation-subroutine/ (stored 0%)\n  adding: bussola-v2-structure/agents/AGT-00_compilation-subroutine/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/skills/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT06-final-delivery/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT06-final-delivery/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT02-personalization/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT02-personalization/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT03-analytical-engine/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT03-analytical-engine/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT01-orchestrator/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT01-orchestrator/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT04-simulation-lab/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT04-simulation-lab/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT05-architect/ (stored 0%)\n  adding: bussola-v2-structure/skills/SKILL-AGT05-architect/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/data-flow/ (stored 0%)\n  adding: bussola-v2-structure/data-flow/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/README/ (stored 0%)\n  adding: bussola-v2-structure/README/.gitkeep (stored 0%)\n  adding: bussola-v2-structure/ARCHITECTURE/ (stored 0%)\n  adding: bussola-v2-structure/ARCHITECTURE/.gitkeep (stored 0%)\n-rw-r--r-- 1 root root 36K Apr 24 18:21 bussola-v2_EMPTY-STRUCTURE_2026-04-24.zip\n","stderr":""}
**61 pastas, todas vazias** (`.gitkeep` para preservar no ZIP). Estrutura:

```
bussola-v2-structure/
├── README/
├── ARCHITECTURE/
├── agents/
│   ├── AGT-00_compilation-subroutine/
│   ├── AGT-01_orchestrator/
│   ├── AGT-02_personalization/
│   ├── AGT-03_analytical-engine/
│   ├── AGT-04_simulation-lab/
│   ├── AGT-05_architect/
│   └── AGT-06_final-delivery/
├── gates/
│   ├── ID-I1_router/
│   ├── ID-I2_personalization-selector/
│   ├── ID-I3_global-prebalance/
│   ├── ID-I4_frame-selection/
│   ├── ID-I5_simulation-config/
│   └── ID-I6_architect-directive/
├── deliverables/
│   ├── ID-E1_normalized-followup/
│   │   ├── references/
│   │   └── examples/
│   ├── ID-E2_commercial-proposal/
│   │   ├── references/
│   │   └── examples/
│   ... (todos ID-E3 a ID-E-MASTER-OPS)
├── dependencies/
│   ├── design-brand-system/
│   │   ├── references/
│   │   └── assets/
│   ├── external-mcps/
│   └── skill-business-docs-pipeline/
├── skills/
│   └── SKILL-AGT0{1-6}-*/
├── data-flow/
└── gaps/
```

Cada ID-E tem `references/` e `examples/` prontos. Pode jogar os arquivos do ZIP anterior direto nas pastas correspondentes.

---

**Você** _2026-04-24_

Gere agora uma pasta modelo para que eu escale examente no padrão correto para que eu monte meu portifolio use como referências a pasta da Skill creator o full directory

---

**Claude** _2026-04-24_

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
227K	/mnt/skills/examples/skill-creator
12K	/mnt/skills/examples/skill-creator/LICENSE.txt
33K	/mnt/skills/examples/skill-creator/SKILL.md
28K	/mnt/skills/examples/skill-creator/agents
11K	/mnt/skills/examples/skill-creator/agents/analyzer.md
7.5K	/mnt/skills/examples/skill-creator/agents/comparator.md
9.0K	/mnt/skills/examples/skill-creator/agents/grader.md
7.5K	/mnt/skills/examples/skill-creator/assets
7.0K	/mnt/skills/examples/skill-creator/assets/eval_review.html
61K	/mnt/skills/examples/skill-creator/eval-viewer
16K	/mnt/skills/examples/skill-creator/eval-viewer/generate_review.py
44K	/mnt/skills/examples/skill-creator/eval-viewer/viewer.html
13K	/mnt/skills/examples/skill-creator/references
12K	/mnt/skills/examples/skill-creator/references/schemas.md
75K	/mnt/skills/examples/skill-creator/scripts
0	/mnt/skills/examples/skill-creator/scripts/__init__.py
15K	/mnt/skills/examples/skill-creator/scripts/aggregate_benchmark.py
13K	/mnt/skills/examples/skill-creator/scripts/generate_report.py
11K	/mnt/skills/examples/skill-creator/scripts/improve_description.py
4.5K	/mnt/skills/examples/skill-creator/scripts/package_skill.py
4.0K	/mnt/skills/examples/skill-creator/scripts/quick_validate.py
12K	/mnt/skills/examples/skill-creator/scripts/run_eval.py
14K	/mnt/skills/examples/skill-creator/scripts/run_loop.py
2.0K	/mnt/skills/examples/skill-creator/scripts/utils.py

     1	# JSON Schemas
     2	
     3	This document defines the JSON schemas used by skill-creator.
     4	
     5	---
     6	
     7	## evals.json
     8	
     9	Defines the evals for a skill. Located at `evals/evals.json` within the skill directory.
    10	
    11	```json
    12	{
    13	  "skill_name": "example-skill",
    14	  "evals": [
    15	    {
    16	      "id": 1,
    17	      "prompt": "User's example prompt",
    18	      "expected_output": "Description of expected result",
    19	      "files": ["evals/files/sample1.pdf"],
    20	      "expectations": [
    21	        "The output includes X",
    22	        "The skill used script Y"
    23	      ]
    24	    }
    25	  ]
    26	}
    27	```
    28	
    29	**Fields:**
    30	- `skill_name`: Name matching the skill's frontmatter
    31	- `evals[].id`: Unique integer identifier
    32	- `evals[].prompt`: The task to execute
    33	- `evals[].expected_output`: Human-readable description of success
    34	- `evals[].files`: Optional list of input file paths (relative to skill root)
    35	- `evals[].expectations`: List of verifiable statements
    36	
    37	---
    38	
    39	## history.json
    40	
    41	Tracks version progression in Improve mode. Located at workspace root.
    42	
    43	```json
    44	{
    45	  "started_at": "2026-01-15T10:30:00Z",
    46	  "skill_name": "pdf",
    47	  "current_best": "v2",
    48	  "iterations": [
    49	    {
    50	      "version": "v0",
    51	      "parent": null,
    52	      "expectation_pass_rate": 0.65,
    53	      "grading_result": "baseline",
    54	      "is_current_best": false
    55	    },
    56	    {
    57	      "version": "v1",
    58	      "parent": "v0",
    59	      "expectation_pass_rate": 0.75,
    60	      "grading_result": "won",
[431 lines total]
Agora tenho o padrão completo. Vou criar a pasta modelo com toda a hierarquia exata do skill-creator, adaptada para o contexto Bússola v2.
{"returncode":0,"stdout":"Dirs created\n","stderr":""}
{"returncode":0,"stdout":"SKILL.md ✓\nagents/_subagente-modelo.md ✓\nreferences/_referencia-modelo.md ✓\nassets/README.md ✓\nscripts/ ✓\nevals/ ✓\nexamples/ ✓\nchangelog/ ✓\ntests/ ✓\n\n=== ESTRUTURA FINAL ===\n_MODELO-PASTA/\n  SKILL.md\n  evals/\n    evals.json\n    README.md\n    files/\n      .gitkeep\n  assets/\n    README.md\n  scripts/\n    __init__.py\n    _script-modelo.py\n  agents/\n    _subagente-modelo.md\n  changelog/\n    CHANGELOG.md\n  examples/\n    output/\n      _exemplo-output.md\n    input/\n      _exemplo-input.md\n  tests/\n    manual-tests.md\n  references/\n    _referencia-modelo.md\n","stderr":""}
{"returncode":0,"stdout":"  adding: _MODELO-PASTA/ (stored 0%)\n  adding: _MODELO-PASTA/evals/ (stored 0%)\n  adding: _MODELO-PASTA/evals/files/ (stored 0%)\n  adding: _MODELO-PASTA/evals/files/.gitkeep (stored 0%)\n  adding: _MODELO-PASTA/evals/evals.json (deflated 57%)\n  adding: _MODELO-PASTA/evals/README.md (deflated 36%)\n  adding: _MODELO-PASTA/assets/ (stored 0%)\n  adding: _MODELO-PASTA/assets/README.md (deflated 34%)\n  adding: _MODELO-PASTA/scripts/ (stored 0%)\n  adding: _MODELO-PASTA/scripts/__init__.py (stored 0%)\n  adding: _MODELO-PASTA/scripts/_script-modelo.py (deflated 45%)\n  adding: _MODELO-PASTA/agents/ (stored 0%)\n  adding: _MODELO-PASTA/agents/_subagente-modelo.md (deflated 35%)\n  adding: _MODELO-PASTA/SKILL.md (deflated 50%)\n  adding: _MODELO-PASTA/changelog/ (stored 0%)\n  adding: _MODELO-PASTA/changelog/CHANGELOG.md (deflated 28%)\n  adding: _MODELO-PASTA/examples/ (stored 0%)\n  adding: _MODELO-PASTA/examples/output/ (stored 0%)\n  adding: _MODELO-PASTA/examples/output/_exemplo-output.md (deflated 38%)\n  adding: _MODELO-PASTA/examples/input/ (stored 0%)\n  adding: _MODELO-PASTA/examples/input/_exemplo-input.md (deflated 30%)\n  adding: _MODELO-PASTA/tests/ (stored 0%)\n  adding: _MODELO-PASTA/tests/manual-tests.md (deflated 50%)\n  adding: _MODELO-PASTA/references/ (stored 0%)\n  adding: _MODELO-PASTA/references/_referencia-modelo.md (deflated 38%)\n-rw-r--r-- 1 root root 9.1K Apr 24 18:25 _MODELO-PASTA_bussola-v2_2026-04-24.zip\n","stderr":""}
Padrão exato do skill-creator, adaptado. Estrutura completa:

```
_MODELO-PASTA/
├── SKILL.md                    ← frontmatter YAML + instruções operacionais
├── agents/
│   └── _subagente-modelo.md    ← template para subagentes especializados
├── references/
│   └── _referencia-modelo.md   ← carregado sob demanda (não por padrão)
├── assets/
│   └── README.md               ← templates, ícones, fontes, componentes
├── scripts/
│   ├── __init__.py
│   └── _script-modelo.py       ← executável sem carregar no contexto
├── evals/
│   ├── evals.json              ← 3 casos: happy path, edge case, anti-trigger
│   ├── README.md
│   └── files/                  ← inputs de teste (PDFs, CSVs)
├── examples/
│   ├── input/_exemplo-input.md
│   └── output/_exemplo-output.md
├── tests/
│   └── manual-tests.md         ← registro qualitativo pré-evals formais
└── changelog/
    └── CHANGELOG.md            ← versionamento semântico
```

**Como usar para escalar:**
1. Duplique `_MODELO-PASTA` inteira
2. Renomeie para o ID-E ou skill (ex: `ID-E2_commercial-proposal`)
3. Preencha `SKILL.md` — o resto já tem os templates dentro
4. Mova seus arquivos existentes para as pastas correspondentes
5. `references/` e `examples/` já estão no padrão dos ID-Es da estrutura anterior

---

**Você** _2026-04-24_

Explique oque são cada um desses termos de forma simples

---

**Claude** _2026-04-24_

Tá dentro do AGT-00, olhando a `_MODELO-PASTA`. Aqui vai:

---

**SKILL.md** — O cérebro da pasta. Um arquivo de texto que explica o que aquele agente/entregável faz, quando ativa, quais as regras. É o único arquivo obrigatório.

**agents/** — Instruções para "sub-funcionários" especializados que o agente principal pode chamar para tarefas específicas. Ex: um agente só para compilar, outro só para formatar.

**references/** — Documentos de consulta que o agente lê *só quando precisa* — frameworks, glossários, fontes. Não carrega tudo de uma vez, só o relevante.

**assets/** — Arquivos físicos usados nos outputs: templates Word, ícones, logos, fontes, componentes visuais prontos.

**scripts/** — Código Python executável para tarefas mecânicas e repetitivas. Ex: gerar um PDF, converter um CSV, empacotar um ZIP. Roda sem precisar carregar no contexto.

**evals/** — Casos de teste. Você define "dado esse input, o output correto é esse". Serve para validar se o agente está funcionando como esperado antes de colocar em produção.

**examples/** — Exemplos reais ou simulados de input e output. Diferente dos evals (que são automatizados), aqui é referência visual humana — "olha como fica".

**tests/** — Registro manual de testes que você fez conversando. Antes de formalizar no evals.json, você anota aqui o que testou e o que observou.

**changelog/** — Histórico de versões. O que mudou, quando e por quê. Essencial para escalar sem perder o rastro do que foi alterado.

---

Resumo rápido: `SKILL.md` define, `references/` consulta, `assets/` entrega, `scripts/` executa, `evals/` valida, `examples/` ilustra, `tests/` registra, `changelog/` rastreia.

---

**Você** _2026-04-24_

Toda a suíte bússola poderia virar um só agente ?

---

**Claude** _2026-04-24_

Sim. E essa é exatamente a pergunta certa de arquitetura.

---

**A resposta técnica é: depende do que você chama de "um só agente."**

**Opção 1 — Um agente monolítico**
Tudo num único SKILL.md gigante. Tecnicamente possível, mas quebra na prática porque a janela de contexto do Claude tem limite, e com 6 agentes + 17 entregáveis + 6 gates o arquivo ficaria inutilizável. O agente "esquece" o início quando o contexto estoura.

**Opção 2 — Um orquestrador com subagentes** ← o que você já tem
AGT-01 é o "agente único" externamente — o consultor fala só com ele. Por baixo, AGT-01 chama AGT-02, 03, 04, 05, 06 como subagentes especializados. Para o consultor parece um agente só. Para o sistema é uma pipeline.

**Opção 3 — Um agente com skills carregadas sob demanda**
O modelo que o skill-creator usa. Um único ponto de entrada, mas as instruções de cada fase vivem em `references/` e são carregadas *só quando aquela fase ativa*. É o meio-termo mais inteligente para o seu caso.

---

**Por que a Opção 3 faz sentido para o Bússola:**

A suíte já está estruturada exatamente assim. A diferença seria colapsar os nomes: em vez de chamar AGT-01 a AGT-06, você teria um `bussola-orchestrator` que carrega `references/fase-02-personalization.md`, `references/fase-03-analytical.md` etc conforme o pipeline avança.

O consultor nunca sabe que tem 6 agentes. Ele só vê o Bússola.

---

**O que você perderia colapsando tudo:**
- Capacidade de atualizar uma fase sem tocar nas outras
- Clareza para o dev implementar cada parte
- Possibilidade de vender fases separadamente no futuro

**O que você ganharia:**
- UX mais simples para o consultor
- Um único ponto de instalação como skill
- Estado de conversa compartilhado sem handoffs explícitos

---

**Recomendação direta:** mantém a arquitetura de 6 agentes internamente, mas cria um `AGT-01` que age como fachada única. O consultor fala com Bússola. O Bússola orquestra. É exatamente o que o `bussola-orchestrator` na sua pasta `/skills` já aponta.

---

**Você** _2026-04-24_

Skill creator Create a full directory as you Advise opção 3 and delivery me the zip

---

**Claude** _2026-04-24_

1	#!/usr/bin/env python3
     2	"""
     3	Skill Packager - Creates a distributable .skill file of a skill folder
     4	
     5	Usage:
     6	    python utils/package_skill.py <path/to/skill-folder> [output-directory]
     7	
     8	Example:
     9	    python utils/package_skill.py skills/public/my-skill
    10	    python utils/package_skill.py skills/public/my-skill ./dist
    11	"""
    12	
    13	import fnmatch
    14	import sys
    15	import zipfile
    16	from pathlib import Path
    17	from scripts.quick_validate import validate_skill
    18	
    19	# Patterns to exclude when packaging skills.
    20	EXCLUDE_DIRS = {"__pycache__", "node_modules"}
    21	EXCLUDE_GLOBS = {"*.pyc"}
    22	EXCLUDE_FILES = {".DS_Store"}
    23	# Directories excluded only at the skill root (not when nested deeper).
    24	ROOT_EXCLUDE_DIRS = {"evals"}
    25	
    26	
    27	def should_exclude(rel_path: Path) -> bool:
    28	    """Check if a path should be excluded from packaging."""
    29	    parts = rel_path.parts
    30	    if any(part in EXCLUDE_DIRS for part in parts):
    31	        return True
    32	    # rel_path is relative to skill_path.parent, so parts[0] is the skill
    33	    # folder name and parts[1] (if present) is the first subdir.
    34	    if len(parts) > 1 and parts[1] in ROOT_EXCLUDE_DIRS:
    35	        return True
    36	    name = rel_path.name
    37	    if name in EXCLUDE_FILES:
    38	        return True
    39	    return any(fnmatch.fnmatch(name, pat) for pat in EXCLUDE_GLOBS)
    40	
    41	
    42	def package_skill(skill_path, output_dir=None):
    43	    """
    44	    Package a skill folder into a .skill file.
    45	
    46	    Args:
    47	        skill_path: Path to the skill folder
    48	        output_dir: Optional output directory for the .skill file (defaults to current directory)
    49	
    50	    Returns:
    51	        Path to the created .skill file, or None if error
    52	    """
    53	    skill_path = Path(skill_path).resolve()
    54	
    55	    # Validate skill folder exists
    56	    if not skill_path.exists():
    57	        print(f"❌ Error: Skill folder not found: {skill_path}")
    58	        return None
    59	
    60	    if not skill_path.is_dir():
    61	        print(f"❌ Error: Path is not a directory: {skill_path}")
    62	        return None
    63	
    64	    # Validate SKILL.md exists
    65	    skill_md = skill_path / "SKILL.md"
    66	    if not skill_md.exists():
    67	        print(f"❌ Error: SKILL.md not found in {skill_path}")
    68	        return None
    69	
    70	    # Run validation before packaging
    71	    print("🔍 Validating skill...")
    72	    valid, message = validate_skill(skill_path)
    73	    if not valid:
    74	        print(f"❌ Validation failed: {message}")
    75	        print("   Please fix the validation errors before packaging.")
    76	        return None
    77	    print(f"✅ {message}\n")
    78	
    79	    # Determine output location
    80	    skill_name = skill_path.name
    81	    if output_dir:
    82	        output_path = Path(output_dir).resolve()
    83	        output_path.mkdir(parents=True, exist_ok=True)
    84	    else:
    85	        output_path = Path.cwd()
    86	
    87	    skill_filename = output_path / f"{skill_name}.skill"
    88	
    89	    # Create the .skill file (zip format)
    90	    try:
    91	        with zipfile.ZipFile(skill_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    92	            # Walk through the skill directory, excluding build artifacts
    93	            for file_path in skill_path.rglob('*'):
    94	                if not file_path.is_file():
    95	                    continue
    96	                arcname = file_path.relative_to(skill_path.parent)
    97	                if should_exclude(arcname):
    98	                    print(f"  Skipped: {arcname}")
    99	                    continue
   100	                zipf.write(file_path, arcname)
   101	                print(f"  Added: {arcname}")
   102	
   103	        print(f"\n✅ Successfully packaged skill to: {skill_filename}")
   104	        return skill_filename
   105	
   106	    except Exception as e:
   107	        print(f"❌ Error creating .skill file: {e}")
   108	        return None
   109	
   110	
   111	def main():
   112	    if len(sys.argv) < 2:
   113	        print("Usage: python utils/package_skill.py <path/to/skill-folder> [output-directory]")
   114	        print("\nExample:")
   115	        print("  python utils/package_skill.py skills/public/my-skill")
   116	        print("  python utils/package_skill.py skills/public/my-skill ./dist")
   117	        sys.exit(1)
   118	
   119	    skill_path = sys.argv[1]
   120	    output_dir = sys.argv[2] if len(sys.argv) > 2 else None
   121	
   122	    print(f"📦 Packaging skill: {skill_path}")
   123	    if output_dir:
   124	        print(f"   Output directory: {output_dir}")
   125	    print()
   126	
   127	    result = package_skill(skill_path, output_dir)
   128	
   129	    if result:
   130	        sys.exit(0)
   131	    else:
   132	        sys.exit(1)
   133	
   134	
   135	if __name__ == "__main__":
   136	    main()
   137	
     1	#!/usr/bin/env python3
     2	"""
     3	Quick validation script for skills - minimal version
     4	"""
     5	
     6	import sys
     7	import os
     8	import re
     9	import yaml
    10	from pathlib import Path
    11	
    12	def validate_skill(skill_path):
    13	    """Basic validation of a skill"""
    14	    skill_path = Path(skill_path)
    15	
    16	    # Check SKILL.md exists
    17	    skill_md = skill_path / 'SKILL.md'
    18	    if not skill_md.exists():
    19	        return False, "SKILL.md not found"
    20	
    21	    # Read and validate frontmatter
    22	    content = skill_md.read_text()
    23	    if not content.startswith('---'):
    24	        return False, "No YAML frontmatter found"
    25	
    26	    # Extract frontmatter
    27	    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    28	    if not match:
    29	        return False, "Invalid frontmatter format"
    30	
    31	    frontmatter_text = match.group(1)
    32	
    33	    # Parse YAML frontmatter
    34	    try:
    35	        frontmatter = yaml.safe_load(frontmatter_text)
    36	        if not isinstance(frontmatter, dict):
    37	            return False, "Frontmatter must be a YAML dictionary"
    38	    except yaml.YAMLError as e:
    39	        return False, f"Invalid YAML in frontmatter: {e}"
    40	
    41	    # Define allowed properties
    42	    ALLOWED_PROPERTIES = {'name', 'description', 'license', 'allowed-tools', 'metadata', 'compatibility'}
    43	
    44	    # Check for unexpected properties (excluding nested keys under metadata)
    45	    unexpected_keys = set(frontmatter.keys()) - ALLOWED_PROPERTIES
    46	    if unexpected_keys:
    47	        return False, (
    48	            f"Unexpected key(s) in SKILL.md frontmatter: {', '.join(sorted(unexpected_keys))}. "
    49	            f"Allowed properties are: {', '.join(sorted(ALLOWED_PROPERTIES))}"
    50	        )
    51	
    52	    # Check required fields
    53	    if 'name' not in frontmatter:
    54	        return False, "Missing 'name' in frontmatter"
    55	    if 'description' not in frontmatter:
    56	        return False, "Missing 'description' in frontmatter"
    57	
    58	    # Extract name for validation
    59	    name = frontmatter.get('name', '')
    60	    if not isinstance(name, str):
    61	        return False, f"Name must be a string, got {type(name).__name__}"
    62	    name = name.strip()
    63	    if name:
    64	        # Check naming convention (kebab-case: lowercase with hyphens)
    65	        if not re.match(r'^[a-z0-9-]+$', name):
    66	            return False, f"Name '{name}' should be kebab-case (lowercase letters, digits, and hyphens only)"
    67	        if name.startswith('-') or name.endswith('-') or '--' in name:
    68	            return False, f"Name '{name}' cannot start/end with hyphen or contain consecutive hyphens"
    69	        # Check name length (max 64 characters per spec)
    70	        if len(name) > 64:
    71	            return False, f"Name is too long ({len(name)} characters). Maximum is 64 characters."
    72	
    73	    # Extract and validate description
    74	    description = frontmatter.get('description', '')
    75	    if not isinstance(description, str):
    76	        return False, f"Description must be a string, got {type(description).__name__}"
    77	    description = description.strip()
    78	    if description:
    79	        # Check for angle brackets
    80	        if '<' in description or '>' in description:
    81	            return False, "Description cannot contain angle brackets (< or >)"
    82	        # Check description length (max 1024 characters per spec)
    83	        if len(description) > 1024:
    84	            return False, f"Description is too long ({len(description)} characters). Maximum is 1024 characters."
    85	
    86	    # Validate compatibility field if present (optional)
    87	    compatibility = frontmatter.get('compatibility', '')
    88	    if compatibility:
    89	        if not isinstance(compatibility, str):
    90	            return False, f"Compatibility must be a string, got {type(compatibility).__name__}"
    91	        if len(compatibility) > 500:
    92	            return False, f"Compatibility is too long ({len(compatibility)} characters). Maximum is 500 characters."
    93	
    94	    return True, "Skill is valid!"
    95	
    96	if __name__ == "__main__":
    97	    if len(sys.argv) != 2:
    98	        print("Usage: python quick_validate.py <skill_directory>")
    99	        sys.exit(1)
   100	    
   101	    valid, message = validate_skill(sys.argv[1])
   102	    print(message)
   103	    sys.exit(0 if valid else 1)
{"returncode":0,"stdout":"Dirs OK\n","stderr":""}
{"returncode":0,"stdout":"SKILL.md ✓\n","stderr":""}
{"returncode":0,"stdout":"references/fase-01-intake.md ✓\nreferences/fase-02-personalization.md ✓\nreferences/fase-03-analytical.md ✓\nreferences/fase-04-simulation.md ✓\nreferences/fase-05-architect.md ✓\nreferences/fase-06-delivery.md ✓\nreferences/deliverables-registry.md ✓\nreferences/gates-registry.md ✓\nreferences/gaps-registry.md ✓\n","stderr":""}
{"returncode":0,"stdout":"agents/ ✓\nassets/ ✓\nevals/ ✓\nexamples/ ✓\ntests/ ✓\nchangelog/ ✓\n","stderr":""}
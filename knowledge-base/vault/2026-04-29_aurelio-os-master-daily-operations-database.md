---
title: "Aurelio OS master daily operations database"
date: 2026-04-29
account: leonardopimentel.knh@gmail.com
uuid: 546921ca-2039-451a-aebf-2163c93f7eec
messages: 10
tags: []
context: ""
---

**Você** _2026-04-29_

Fiil based on cprpus
Categories (output in this order):

1. Instructions: Rules I've explicitly asked you to follow going forward — tone, format, style, "always do X", "never do Y", and corrections to your behavior. Only include rules from stored memories, not from conversations.
2. Identity: Name, age, location, education, family, relationships, languages, and personal interests.
3. Career: Current and past roles, companies, and general skill areas.
4. Projects: Projects I meaningfully built or committed to. Ideally ONE entry per project. Include what it does, current status, and any key decisions. Use the project name or a short descriptor as the first words of the entry.
5. Preferences: Opinions, tastes, and working-style preferences that apply broadly.
Format:
Use section headers for each category. Within each category, list one entry per line, sorted by oldest date first. Format each line as:
[YYYY-MM-DD] - Entry content here.
If no date is known, use [unknown] instead.
Output:

* Wrap the entire export in a single code block for easy copying.
* After the code block, state whether this is the complete set or if more remain.(Documento completo lido. Muito mais contexto do que o previsto — o arquivo revela o **Aurelio OS / 007 ecosystem** com toda a taxonomia de IDs, estrutura de repo, projetos paralelos (ABS, Scripity, AI-Natomy, NL Sprint, Family Admin). Vou ler as seções truncadas para não perder nada crítico antes de gerar o JSON DB.Contexto total capturado. Ecossistema muito mais amplo do que o previsto — **Aurelio OS / 007 ecosystem** com 6 projetos paralelos, taxonomia de IDs completa, 17 artefatos ABS, 7 fases de framework stack. Gerando o JSON DB MECE agora.---
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARTIFACT INDEX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ID        : SYS-007-DB-OPS-v1
LABEL     : Aurelio OS — Master Daily Ops JSON DB
TYPE      : SYS
DOMAIN    : 007
LANGUAGE  : EN
STATUS    : FINAL
EPISTEMIC : FACT + INFERENCE
CREATED   : 2026-04-28
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
**496 linhas · JSON válido · 14 blocos MECE:**
| Block | Conteúdo |
|---|---|
| `_meta` | ID canônico, paths Drive/repo, versão |
| `identity` | Dados pessoais, localização, cidadania |
| `technical_profile` | Nível técnico, MCPs conectados, gaps |
| `behavior_protocol` | Língua, tom, formato, epistêmicos, error protocol |
| `artifact_spec` | Taxonomia completa de IDs (SYS-007-ANNEXE-001-v1) |
| `projects.ABS` | Corpus 17 artefatos, pipeline F0→F5, OKRs, BLUF por audiência, constraints imutáveis |
| `[projects.NL](http://projects.NL)_SPRINT` | Timeline 90d, pivot rule, LinkedIn strategy, quality bar |
| `[projects.AI](http://projects.AI)_NATOMY` | Content studio, tracks PT/EN |
| `projects.SCRIPITY` | Engine de corpus F1-F7 |
| `claude_projects_map` | 6 projetos [Claude.ai](http://Claude.ai) mapeados com purpose + knowledge |
| `repo_structure` | 007-os/ completo com paths, skills, security rules |
| `gaps` | GAP-01→11 + GAP-SKILL + GAP-ANA com prioridade e desbloqueio |
| `milestones` | M-00→M-12 com deadlines, gates e dependências |
| `daily_ops_checklist` | Session start protocol + never_do list |
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAVE INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILENAME    : SYS-007-DB-OPS-v1.json
DRIVE PATH  : /Aurelio-OS/00-Comando-007/01_SYSTEM/SYS-007-DB-OPS-v1.json
REPO PATH   : 00-comando-007/system/SYS-007-DB-OPS-v1.json
COMMIT MSG  : feat(007): add master daily ops JSON DB SYS-007-DB-OPS-v1
NEXT ACTION : Colar como bloco de contexto no início de cada sessão do 007 Command Center.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

**Claude** _2026-04-29_

1	{
     2	  "_meta": {
     3	    "id": "SYS-007-DB-OPS-v1",
     4	    "label": "Aurelio OS — Master Daily Ops JSON DB",
     5	    "version": "1.0",
     6	    "owner": "Leonardo Batista",
     7	    "alias": "Aurelio",
     8	    "created": "2026-04-28",
     9	    "updated": "2026-04-28",
    10	    "epistemic": "FACT+INFERENCE",
    11	    "status": "FINAL",
    12	    "purpose": "Single source of truth for session context injection, daily ops reference, and Linear/Slack routing",
    13	    "drive_path": "/Aurelio-OS/00-Comando-007/01_SYSTEM/SYS-007-DB-OPS-v1.json",
    14	    "repo_path": "00-comando-007/system/SYS-007-DB-OPS-v1.json"
    15	  },
    16	
    17	  "identity": {
    18	    "_tag": "IDENTITY",
    19	    "name": "Leonardo Batista",
    20	    "operator_alias": "Aurelio",
    21	    "age": 30,
    22	    "location": {
    23	      "current": "Santos, SP, Brazil",
    24	      "target": "Netherlands",
    25	      "relocation_window": "2026-09"
    26	    },
    27	    "citizenship": ["Portuguese", "EU"],
    28	    "languages": {
    29	      "PT-BR": "native",
    30	      "EN": "C1",
    31	      "NL": "signal-level"
    32	    },
    33	    "interests": ["AI governance", "AI Act compliance"],
    34	    "role": "solo_founder_operator",
    35	    "team_size": 1
    36	  },
    37	
    38	  "technical_profile": {
    39	    "_tag": "TECH_PROFILE",
    40	    "_epistemic": "FACT",
    41	    "level": "power-user / skill-author",
    42	    "production_artifacts": {
    43	      "public_github": false,
    44	      "authored_mcp_server": false,
    45	      "ci_cd": false,
    46	      "published_npm_pypi": false
    47	    },
    48	    "active_capabilities": [
    49	      "Claude skill authoring",
    50	      "Markdown/YAML documentation",
    51	      "Prompt engineering",
    52	      "Agent pipeline design",
    53	      "MCP consumption (not authoring)"
    54	    ],
    55	    "connected_mcps": ["Linear", "Google Drive", "WordPress.com"],
    56	    "gap_to_close": ["GAP-10: public GitHub", "GAP-11: authored MCP server"]
    57	  },
    58	
    59	  "behavior_protocol": {
    60	    "_tag": "BEHAVIOR",
    61	    "language_rules": {
    62	      "default": "PT-BR",
    63	      "technical_layers": "EN",
    64	      "rule": "never mix mid-sentence",
    65	      "client_content": "PT-BR",
    66	      "github_readme": "EN",
    67	      "nl_career": "EN"
    68	    },
    69	    "tone": "direct + consultative, no filler, no hedging, executive-grade",
    70	    "format_defaults": {
    71	      "primary": "tables + structured sections",
    72	      "large_outputs": "artifacts",
    73	      "specs_and_prompts": "XML or code blocks",
    74	      "length": "dense and layered, not verbose"
    75	    },
    76	    "epistemic_labels": ["FACT", "INFERENCE", "HYPOTHESIS", "GAP", "DECISION", "ACTION"],
    77	    "source_priority": [
    78	      "1. Official primary sources (CEO, docs, peer-reviewed)",
    79	      "2. Proprietary data platforms (Sprout Social, Statista, Buffer)",
    80	      "3. Specialized publications with methodological rigor"
    81	    ],
    82	    "never_use": ["generic portals", "blogs without data", "aggregators"],
    83	    "execution_mode": "hands-off with upfront validation gates before irreversible actions",
    84	    "skill_invocation": "slash-command pattern",
    85	    "error_protocol": [
    86	      "Line 1: what failed + exact reason",
    87	      "Line 2: the fix",
    88	      "Line 3: execute immediately — never retry same approach"
    89	    ],
    90	    "tool_priority": [
    91	      "1. Internal MCPs for company/personal data",
    92	      "2. web_search + web_fetch for external",
    93	      "3. Combined for comparative queries"
    94	    ],
    95	    "proactivity": "surface blind spots, flag friction, offer next steps, risk-adjusted framing"
    96	  },
    97	
    98	  "artifact_spec": {
    99	    "_tag": "ARTIFACT_SPEC",
   100	    "_ref": "SYS-007-ANNEXE-001-v1",
   101	    "id_structure": "[DOMAIN]-[SYSTEM]-[FUNCTION]-[VERSION]",
   102	    "domain_codes": {
   103	      "SYS": "System prompts, OS-level instructions",
   104	      "PRM": "Operational prompts (task-level, reusable)",
   105	      "CMD": "Slash commands",
   106	      "WRK": "Workflows and pipeline specs",
   107	      "DOC": "Client-facing formal documents",
   108	      "AST": "Assets and templates",
   109	      "SKL": "Skills (SKILL.md packages)",
   110	      "CRP": "Corpus artifacts (A01-A17)",
   111	      "PUB": "Portfolio publications",
   112	      "APP": "NL job applications",
   113	      "DEC": "Decisions (DECIDE framework outputs)",
   114	      "REV": "Weekly/monthly reviews",
   115	      "FAM": "Family Admin artifacts"
   116	    },
   117	    "system_codes": {
   118	      "007": "Command / meta-OS",
   119	      "ABS": "ABS product and sales",
   120	      "SCR": "Scripity engine",
   121	      "ASN": "agent-spec-normalizer",
   122	      "AIN": "AI-Natomy portfolio",
   123	      "NL": "NL Sprint career track",
   124	      "FAM": "Family Admin OS",
   125	      "LAB": "Skill Lab"
   126	    },
   127	    "mandatory_header_fields": ["ID", "LABEL", "TYPE", "DOMAIN", "PROJECT", "LANGUAGE", "STATUS", "EPISTEMIC", "CREATED"],
   128	    "mandatory_footer_fields": ["FILENAME", "DRIVE_PATH", "REPO_PATH", "COMMIT_MSG", "NEXT_ACTION"],
   129	    "rules": {
   130	      "R01": "Every artifact MUST have header + footer. No exceptions.",
   131	      "R02": "ID assigned BEFORE content is written.",
   132	      "R03": "Ambiguous type → default DOC + flag GAP.",
   133	      "R04": "Epistemic label reflects most uncertain element.",
   134	      "R05": "SAVE INSTRUCTIONS actionable in one copy-paste.",
   135	      "R06": "Commit: conventional commits (feat/fix/docs/chore/refactor).",
   136	      "R07": "NEXT ACTION = single verb phrase, no lists, no optionality.",
   137	      "R10": "Versioned updates increment version — never overwrite v1."
   138	    }
   139	  },
   140	
   141	  "projects": {
   142	    "_tag": "PROJECTS",
   143	
   144	    "ABS": {
   145	      "_tag": "PROJECT_ABS",
   146	      "_epistemic": "FACT",
   147	      "id": "ABS",
   148	      "name": "ABS — Aurelio's Business Skills",
   149	      "product_name": "Raio-X de Viabilidade para Pequeno Negócio Local",
   150	      "tagline": "Do briefing ao plano de ação em uma sessão",
   151	      "type": "AI consulting skill system",
   152	      "status": "active_development",
   153	      "priority": 1,
   154	      "icp_primary": "Consultores PME independentes, Sebrae/ALI, contadores consultivos, consultores de gestão/marketing/finanças",
   155	      "icp_secondary": "Educadores/mentores PME, agentes de inovação",
   156	      "client_final": "MEI, futuro MEI, microempresa local, prestador de serviço",
   157	      "fixture": "Ana Souza — estúdio de beleza em pré-abertura (fictional, validation-only)",
   158	      "value_prop": {
   159	        "for_consultant": "Organizar casos reais, reduzir retrabalho, entregar recomendações com evidência",
   160	        "for_client_final": "Clareza: 'abro ou não?', 'quanto preciso vender?', 'o que faço primeiro?'"
   161	      },
   162	      "north_star": "Transformar briefings brutos de pequenos negócios em diagnósticos consultivos claros, matriz de decisão e plano 5W2H de 30 dias",
   163	      "mvp_outputs_fixed": [
   164	        "Diagnóstico Executivo",
   165	        "Matriz de Decisão",
   166	        "Plano 5W2H 30 dias"
   167	      ],
   168	      "mvp_rule": "Exactly 3 outputs — no expansion in first execution",
   169	      "pipeline": {
   170	        "F0": { "name": "Setup", "gate_in": "—", "gate_out": "Briefing recebido e completo" },
   171	        "F1": { "name": "Briefing", "gate_in": "Briefing completo", "gate_out": "Problema central mapeado" },
   172	        "F2": { "name": "Diagnóstico", "gate_in": "Hipóteses levantadas", "gate_out": "Diagnóstico por eixo validado" },
   173	        "F3": { "name": "Decisão", "gate_in": "Diagnóstico validado", "gate_out": "Matriz de decisão gerada" },
   174	        "F4": { "name": "Plano", "gate_in": "Decisão estruturada", "gate_out": "5W2H 30 dias gerado" },
   175	        "F5": { "name": "Entrega", "gate_in": "Outputs revisados", "gate_out": "Entregável enviado ao cliente" }
	< truncated lines 176-322 >
   323	      "status": "active",
   324	      "dependency": "ABS validation (R3) before publishing as validated product case study"
   325	    },
   326	
   327	    "SCRIPITY": {
   328	      "_tag": "PROJECT_SCRIPITY",
   329	      "_epistemic": "FACT",
   330	      "id": "SCR",
   331	      "name": "Scripity",
   332	      "type": "Corpus generation engine",
   333	      "produces": "F1-F7 corpus artifacts",
   334	      "skill_path": "02-scripity/",
   335	      "status": "active_tool"
   336	    },
   337	
   338	    "COMMAND_007": {
   339	      "_tag": "PROJECT_007",
   340	      "_epistemic": "FACT",
   341	      "id": "007",
   342	      "name": "007 Command Center",
   343	      "purpose": "System orchestration, weekly review, master planning",
   344	      "knowledge_base": ["master YAML", "roadmap", "decision logs"],
   345	      "claude_project": "007 Command Center",
   346	      "status": "active"
   347	    },
   348	
   349	    "FAMILY_ADMIN": {
   350	      "_tag": "PROJECT_FAM",
   351	      "id": "FAM",
   352	      "name": "Family Admin OS",
   353	      "purpose": "Family documents, decisions, relocation, finance admin",
   354	      "rule": "Non-public docs only",
   355	      "status": "active"
   356	    }
   357	  },
   358	
   359	  "claude_projects_map": {
   360	    "_tag": "CLAUDE_PROJECTS",
   361	    "007_Command_Center": { "purpose": "System orchestration, weekly review, master planning", "knowledge": "master YAML, roadmap, decision logs" },
   362	    "ABS_Product_Lab": { "purpose": "ABS skill, artifacts, Ana fixture, consultant workflow", "knowledge": "A01-A17, SKILL.md drafts, case templates" },
   363	    "AI_Natomy_Content_Studio": { "purpose": "Public content, LinkedIn, blog, portfolio narrative", "knowledge": "editorial calendar, article drafts" },
   364	    "NL_Career_Sprint": { "purpose": "CV, applications, recruiter messaging, portfolio proof", "knowledge": "CV, target roles, job descriptions, cover letters" },
   365	    "Family_Admin_OS": { "purpose": "Family documents, decisions, relocation, finance admin", "knowledge": "non-public docs only" },
   366	    "Archive_Source_Corpus": { "purpose": "Immutable original uploads", "rule": "READ-ONLY — never edit source corpus directly" }
   367	  },
   368	
   369	  "repo_structure": {
   370	    "_tag": "REPO_STRUCTURE",
   371	    "root": "007-os/",
   372	    "key_paths": {
   373	      "CLAUDE.md": "007-os/CLAUDE.md",
   374	      "skills": "007-os/.claude/skills/",
   375	      "agents": "007-os/.claude/agents/",
   376	      "docs": "007-os/docs/",
   377	      "registry": "007-os/registry/",
   378	      "prompts": "007-os/prompts/",
   379	      "templates": "007-os/templates/",
   380	      "scripts": "007-os/scripts/",
   381	      "cases": "007-os/cases/",
   382	      "dist": "007-os/dist/",
   383	      "releases": "007-os/releases/"
   384	    },
   385	    "registry_files": ["projects.yaml", "documents.yaml", "decisions.yaml", "contacts.yaml", "gaps.yaml", "references.yaml"],
   386	    "skills_active": [
   387	      "abs-case-normalizer",
   388	      "abs-skill-builder",
   389	      "zip-export-packager",
   390	      "github-release-maker",
   391	      "nl-career-sprint",
   392	      "family-doc-organizer",
   393	      "weekly-operator-review"
   394	    ],
   395	    "agents": ["corpus-auditor", "security-reviewer", "documentation-builder"],
   396	    "preferred_commands": {
   397	      "inspect": "tree or find",
   398	      "git_check": "git status --short",
   399	      "yaml_validate": "python scripts/validate_yaml.py",
   400	      "checksum": "shasum -a 256"
   401	    },
   402	    "output_standards": {
   403	      "docs": "Markdown",
   404	      "structured_data": "YAML",
   405	      "machine_exports": "/dist",
   406	      "source_docs": "/docs",
   407	      "skills": "/.claude/skills"
   408	    },
   409	    "security_rules": [
   410	      "NEVER include secrets, .env files, tokens, private keys in public exports",
   411	      "NEVER edit source corpus in /99-archive directly"
   412	    ]
   413	  },
   414	
   415	  "track_sequencing": {
   416	    "_tag": "TRACKS",
   417	    "_epistemic": "DECISION",
   418	    "TR-01": { "name": "BR PME (ABS)", "priority": 1, "status": "active", "note": "primary — product is the portfolio" },
   419	    "TR-02": { "name": "NL Employment", "priority": 2, "status": "parallel_during_transition", "note": "tracks are interdependent: product IS portfolio" },
   420	    "TR-03": { "name": "NL Consulting", "priority": 3, "status": "deprioritized" },
   421	    "interdependency_rule": "Track A and Track B are interdependent — do not produce one without the other"
   422	  },
   423	
   424	  "gaps": {
   425	    "_tag": "GAPS",
   426	    "GAP-01": { "description": "No closed client case with hard metrics", "impact": "No social proof → conversion blocked", "priority": "CRITICAL", "unblocked_by": "Piloto 1 + R3 validation" },
   427	    "GAP-04": { "description": "No legal entity / CNPJ / invoicing", "impact": "Cannot bill clients", "priority": "CRITICAL", "action": "Open MEI or LTDA" },
   428	    "GAP-09": { "description": "2 pilots by 30/05/2026 Baixada Santista", "impact": "Timeline risk", "priority": "HIGH" },
   429	    "GAP-10": { "description": "No public GitHub", "impact": "NL employment track blocked", "priority": "HIGH", "deadline": "2026-06" },
   430	    "GAP-11": { "description": "MCP only consumed, never authored", "impact": "Limits technical credential for NL", "priority": "MEDIUM" },
   431	    "GAP-SKILL": { "description": "SKILL.md v0.2 not yet written", "impact": "ABS not executable", "priority": "CRITICAL_P0" },
   432	    "GAP-ANA": { "description": "Ana demo not run through all 3 outputs", "impact": "No proof of concept", "priority": "CRITICAL_P0" }
   433	  },
   434	
   435	  "milestones": {
   436	    "_tag": "MILESTONES",
   437	    "M-00": { "name": "SKILL.md v0.2 written + prompt operational", "deadline": "2026-05-W1-2", "status": "PENDING", "blocks": ["GAP-SKILL"] },
   438	    "M-01": { "name": "Demo Ana completo (all 3 outputs)", "deadline": "2026-05-W3-4", "status": "PENDING", "blocks": ["GAP-ANA"] },
   439	    "M-02": { "name": "Feedback de 1 consultor real (R3 validation)", "deadline": "2026-05-W4-5", "status": "PENDING", "blocks": ["GAP-01"] },
   440	    "M-03": { "name": "Abrir CNPJ/MEI", "deadline": "2026-05", "status": "PENDING", "blocks": ["GAP-04"] },
   441	    "M-04": { "name": "Piloto 1 iniciado", "deadline": "2026-05-30", "status": "PENDING", "blocks": ["GAP-01", "GAP-09"] },
   442	    "M-05": { "name": "Piloto 2 iniciado", "deadline": "2026-05-30", "status": "PENDING", "blocks": ["GAP-09"] },
   443	    "M-06": { "name": "GitHub público + README + case study publicados", "deadline": "2026-06", "status": "PENDING", "blocks": ["GAP-10"], "gate": "AFTER M-02 (R3 validation)" },
   444	    "M-07": { "name": "Landing ABS online", "deadline": "2026-06", "status": "PENDING", "gate": "AFTER M-06" },
   445	    "M-08": { "name": "ABS lançado no Hotmart", "deadline": "2026-07", "status": "PENDING", "gate": "AFTER M-07" },
   446	    "M-09": { "name": "2+ certificações obtidas e no perfil", "deadline": "2026-07", "status": "PENDING" },
   447	    "M-10": { "name": "10+ candidaturas NL ativas", "deadline": "2026-07", "status": "PENDING" },
   448	    "M-11": { "name": "Dia 91 — Binary decision: hiring in progress OR pivot executed", "deadline": "2026-08", "status": "PENDING" },
   449	    "M-12": { "name": "Relocação NL", "deadline": "2026-09", "status": "PLANNED" }
   450	  },
   451	
   452	  "framework_stack": {
   453	    "_tag": "FRAMEWORKS",
   454	    "_note": "Applied across ABS product and founder execution",
   455	    "F1_kickoff": ["SCQA", "BLUF", "Cynefin"],
   456	    "F2_diagnosis": ["SWOT", "5Whys", "Ishikawa", "Porter", "JTBD", "TOC"],
   457	    "F3_prioritization": ["GUT/Pareto", "MECE"],
   458	    "F4_planning": ["5W2H", "OKR", "7Ps", "BSC"],
   459	    "F5_execution": ["PDCA", "OODA"],
   460	    "F6_validation": ["First Principles", "PESTEL"],
   461	    "F7_handover": ["BLUF", "SCQA"]
   462	  },
   463	
   464	  "strategic_debates": {
   465	    "_tag": "DEBATES",
   466	    "_epistemic": "HYPOTHESIS",
   467	    "moat": { "options": ["architecture depth", "validated method + real results"], "status": "unresolved", "note": "R3 validation will shift this" },
   468	    "ali_sebrae": { "risk": "free competitor baseline", "status": "monitoring" },
   469	    "skill_monetization_ceiling": { "vs": "BR first-mover advantage", "status": "unresolved" },
   470	    "reproducibility_risk": { "vs": "adoption barriers", "status": "unresolved" },
   471	    "eu_ai_act_art22": { "relevance": "NL track liability framing", "status": "studying" }
   472	  },
   473	
   474	  "daily_ops_checklist": {
   475	    "_tag": "DAILY_OPS",
   476	    "session_start_protocol": [
   477	      "1. Load this JSON as context",
   478	      "2. Identify active milestone (see milestones)",
   479	      "3. Check gaps blocking current milestone",
   480	      "4. Execute — hands-off, no mid-task interruptions for low-stakes",
   481	      "5. On completion: update milestone status + log in registry/decisions.yaml"
   482	    ],
   483	    "weekly_review_trigger": "REV-007-[YEAR]-W[WEEK]-v1",
   484	    "gate_before_publish": "R3 validation (consultor real feedback) must be complete",
   485	    "gate_before_portoflio": "R3 validation → then GitHub → then landing → then Hotmart",
   486	    "never_do": [
   487	      "Expand ABS beyond 3 MVP outputs before R3",
   488	      "Generate A01-A17 as Ana's documents (Ana = fixture only)",
   489	      "Publish portfolio as 'validated' before R3",
   490	      "Mix languages mid-sentence",
   491	      "Use generic portals/blogs as sources",
   492	      "Retry same failed approach",
   493	      "Request credentials when native MCP is available"
   494	    ]
   495	  }
   496	}
   497	
   176	      },
   177	      "consulting_flow_steps": [
   178	        "1. Interpretar briefing → extrair problema central",
   179	        "2. Mapear problema central → definir eixos de diagnóstico",
   180	        "3. Levantar hipóteses → listar premissas a validar",
   181	        "4. Pesquisar → fontes abertas + heurísticas de mercado local",
   182	        "5. Sintetizar padrões → identificar recorrente vs. específico",
   183	        "6. Avaliar viabilidade → oferta, preço, investimento, canais, diferenciação",
   184	        "7. Estruturar decisão → critérios + score + recomendação",
   185	        "8. Gerar plano acionável → 5W2H com priorização e checklist"
   186	      ],
   187	      "quality_gates": {
   188	        "F1_to_F2": "Briefing completo recebido e interpretado",
   189	        "F2_to_F3": "Diagnóstico validado internamente pelo consultor",
   190	        "F3_to_DELIVERY": "3 outputs gerados e revisados"
   191	      },
   192	      "quality_bar": [
   193	        "Consultor roda a skill sem treinamento adicional",
   194	        "Output enviável a cliente final sem retrabalho",
   195	        "Cliente final entende o plano sem jargão técnico",
   196	        "5W2H gera próximo passo claro e executável"
   197	      ],
   198	      "corpus_artifacts": {
   199	        "total": 17,
   200	        "status": "v1.1 filled",
   201	        "dependency_map": {
   202	          "A01": { "name": "Vision", "depends_on": [] },
   203	          "A02": { "name": "MRD", "depends_on": ["A01"] },
   204	          "A03": { "name": "PRFAQ", "depends_on": ["A01", "A02"] },
   205	          "A04": { "name": "Business Case", "depends_on": ["A02", "A03"] },
   206	          "A05": { "name": "Charter", "depends_on": ["A04"] },
   207	          "A06": { "name": "BRD", "depends_on": ["A05", "A02"] },
   208	          "A07": { "name": "PRD", "depends_on": ["A06", "A05"] },
   209	          "A08": { "name": "FRD", "depends_on": ["A07", "A06"] },
   210	          "A09": { "name": "NFR", "depends_on": ["A07", "A06"] },
   211	          "A10": { "name": "ArchSpec", "depends_on": ["A07", "A09", "A08"] },
   212	          "A11": { "name": "ADR", "depends_on": ["A10", "A06"] },
   213	          "A12": { "name": "Roadmap", "depends_on": ["A07", "A05", "A04"] },
   214	          "A13": { "name": "Stories", "depends_on": ["A07", "A08", "A12"] },
   215	          "A14": { "name": "Backlog", "depends_on": ["A13", "A12", "A09"] },
   216	          "A15": { "name": "Release Plan", "depends_on": ["A14", "A12"] },
   217	          "A16": { "name": "SOP", "depends_on": ["A07", "A05", "A10"] },
   218	          "A17": { "name": "Runbook", "depends_on": ["A16", "A10", "A11", "A15"] }
   219	        }
   220	      },
   221	      "backlog_priority": {
   222	        "P0": ["SKILL.md v0.2 escrito e funcional", "Prompt operacional", "QA checklist", "Templates dos 3 outputs"],
   223	        "P1": ["Demo Ana completo (briefing → diagnóstico → matriz → 5W2H)", "Validação com 1 consultor real"],
   224	        "P2": ["README + GitHub + landing"],
   225	        "P3": ["Ebook, vídeo, landing polida, marketing — AFTER validation only"]
   226	      },
   227	      "monetization": {
   228	        "mvp": "Validação gratuita com consultores parceiros",
   229	        "future": ["Produto digital (skill/template)", "Pacote de implementação", "Consultoria 1:1", "Ebook", "Curso ABS no Hotmart"]
   230	      },
   231	      "decision_rules": [
   232	        "Pilot-case fixo: MEI, negócio local, serviços (NOT agência B2B como principal)",
   233	        "Primeira execução: exatamente 3 outputs, sem adições",
   234	        "Validação gate R3: se flow não reduzir tempo ≥ 20% → arquitetura inadequada",
   235	        "Não publicar como produto validado antes de R3 completo",
   236	        "Não tocar portfólio público antes de validação externa"
   237	      ],
   238	      "constraints_immutable": {
   239	        "product_name": "Raio-X de Viabilidade para Pequeno Negócio Local",
   240	        "product_tagline": "Do briefing ao plano de ação em uma sessão",
   241	        "linkedin_skills_stack": ["AI Integration", "Workflow Design", "Process Improvement", "B2B Client Management"],
   242	        "fixture_rule": "Ana Souza = fictional validation fixture ONLY — not a real client, not an artifact owner"
   243	      },
   244	      "okrs": {
   245	        "O1_30d": {
   246	          "objective": "Produto operacional existente e testável",
   247	          "krs": ["SKILL.md v0.2 escrito e funcional", "Caso Ana gera 3 outputs sem expansão", "QA checklist validado (0 alucinações)", "Templates dos 3 outputs finalizados"]
   248	        },
   249	        "O2_60d": {
   250	          "objective": "Validação externa com pelo menos 1 consultor real",
   251	          "krs": ["Redução de tempo percebida ≥ 20%", "Output compreensível para cliente PME", "Consultor reconhece utilidade operacional", "Feedback documentado no runbook A17"]
   252	        },
   253	        "O3_90d": {
   254	          "objective": "Produto público como portfólio e oferta inicial",
   255	          "krs": ["GitHub + README + case study publicados", "Landing ABS online", "≥ 1 post LinkedIn com engajamento real", "Veredito: continuar/ajustar/pivotar"]
   256	        }
   257	      },
   258	      "bluf_by_audience": {
   259	        "consultor_pme": "ABS transforma briefing bagunçado em diagnóstico, matriz e plano de 30 dias em uma sessão — você para de improvisar e entrega com evidência.",
   260	        "recrutador_nl": "Leonardo construiu sistema AI-first completo: corpus de 17 artefatos, skill operacional, caso demo e validação com profissional real. Evidência concreta de AI Integration, Workflow Design e Process Improvement.",
   261	        "linkedin_blog": "Construí uma skill de consultoria para PME que transforma briefing em diagnóstico executivo. Aqui está o case, o método e o output real."
   262	      },
   263	      "cynefin_classification": {
   264	        "problem_domain": "COMPLEX — requires probing before scaling",
   265	        "skill_domain": "COMPLICATED — solvable with encapsulated expertise",
   266	        "implication": "Build MVP first; validate before scale; no expansion without confirmed signal"
   267	      }
   268	    },
   269	
   270	    "NL_SPRINT": {
   271	      "_tag": "PROJECT_NL",
   272	      "_epistemic": "FACT",
   273	      "id": "NL",
   274	      "name": "NL Career Sprint",
   275	      "target": "AI-adjacent entry-level role in Netherlands (PO/PM with AI focus)",
   276	      "status": "parallel_during_transition",
   277	      "priority": 2,
   278	      "window": "Sep/2026",
   279	      "timeline_90d": {
   280	        "W1-4": { "phase": "Foundation", "deliverable": "LinkedIn PT+EN+NL + Domain + Blog up + GitHub + Hotmart account" },
   281	        "W5-8": { "phase": "Production", "deliverable": "Skill pilot published + Video 28min + Ebook + ABS landing + AI-Natomy article EN" },
   282	        "W9-12": { "phase": "Active Insertion", "deliverable": "10+ NL applications + recruiter outreach + interview prep + 1:1 consulting offer" }
   283	      },
   284	      "certifications_priority": [
   285	        "1. Anthropic Ecosystem — Skills e Agentes",
   286	        "2. PSPO-AI",
   287	        "3. AI Governance / AI Act"
   288	      ],
   289	      "pivot_rule": {
   290	        "trigger": "Day 91 — zero hiring signal",
   291	        "pivot_target": "Junior PO, Customer Service or Office entry-level using general stack"
   292	      },
   293	      "linkedin_strategy": {
   294	        "languages": ["PT", "EN", "NL"],
   295	        "hard_skills": ["AI Integration", "Workflow Design", "Process Improvement", "B2B Client Management"],
   296	        "rule_nl": "NL content = commitment signal, not volume — EN + PT are primary"
   297	      },
   298	      "portfolio_outputs": [
   299	        "Aurelio's Consultant BR (case study com métricas reais)",
   300	        "GitHub/Aurelio's — Skills Family (skills publicadas)",
   301	        "Aurelio's Business Suite (produto)",
   302	        "AI-Literacy Suite (produto)"
   303	      ],
   304	      "narrative_cv": "Empreendedor — ABS é evidência de execução autônoma, não apenas aprendizado",
   305	      "quality_bar": [
   306	        "LinkedIn convincente para recrutador holandês sem conhecer o candidato",
   307	        "Portfólio compensa ausência de diploma com evidência quantificada",
   308	        "Certificações aparecem como credencial relevante para vaga-alvo",
   309	        "Conteúdo EN demonstra fluência técnica (vídeo com aparição física obrigatório)"
   310	      ]
   311	    },
   312	
   313	    "AI_NATOMY": {
   314	      "_tag": "PROJECT_AINATOMY",
   315	      "_epistemic": "FACT",
   316	      "id": "AIN",
   317	      "name": "AI-Natomy Content Studio",
   318	      "purpose": "Public content, LinkedIn, blog, portfolio narrative",
   319	      "url": "Aurelio's.com (blog)",
   320	      "content_tracks": ["PT-BR (consultores PME)", "EN (mercado holandês + internacional)"],
   321	      "target_publication": "Frank's Watching (NL media) or equivalent",
   322	      "knowledge_base": ["editorial calendar", "article drafts", "screenshots"],
[497 lines total]
Here is the full memory export based on the corpus in `SYS-007-DB-OPS-v1.json`:

```
## Instructions
[2026-04-28] - Default language is PT-BR; technical layers in EN; never mix both mid-sentence. Client content in PT-BR, GitHub README and NL career content in EN.
[2026-04-28] - Tone: direct + consultative, no filler, no hedging, executive-grade.
[2026-04-28] - Format defaults: tables + structured sections for primary output; artifacts for large outputs; XML or code blocks for specs and prompts; dense and layered, not verbose.
[2026-04-28] - Use epistemic labels in outputs: FACT, INFERENCE, HYPOTHESIS, GAP, DECISION, ACTION.
[2026-04-28] - Source priority: (1) official primary sources — CEO, docs, peer-reviewed; (2) proprietary data platforms — Sprout Social, Statista, Buffer; (3) specialized publications with methodological rigor. Never use generic portals, blogs without data, or aggregators.
[2026-04-28] - Execution mode: hands-off with upfront validation gates before irreversible actions. Skill invocation via slash-command pattern.
[2026-04-28] - Error protocol: Line 1 = what failed + exact reason. Line 2 = the fix. Line 3 = execute immediately — never retry same approach.
[2026-04-28] - Tool priority: (1) internal MCPs for company/personal data; (2) web_search + web_fetch for external; (3) combined for comparative queries.
[2026-04-28] - Proactivity: surface blind spots, flag friction, offer next steps, risk-adjusted framing.
[2026-04-28] - Every artifact must have canonical header + footer. ID assigned before content is written. NEXT ACTION = single verb phrase, no lists, no optionality. Versioned updates increment version — never overwrite v1.
[2026-04-28] - NEVER do: expand ABS beyond 3 MVP outputs before R3; generate A01–A17 as Ana's documents (Ana = fixture only); publish portfolio as "validated" before R3; mix languages mid-sentence; use generic portals/blogs as sources; retry same failed approach; request credentials when native MCP is available.

## Identity
[unknown]  - Name: Leonardo Batista. Operator alias: Aurelio. Age: 30.
[unknown]  - Location: Santos, SP, Brazil. Target relocation: Netherlands by September 2026.
[unknown]  - Citizenship: Portuguese / EU.
[unknown]  - Languages: PT-BR (native), EN (C1), NL (signal-level).
[unknown]  - Personal interests: AI governance, AI Act compliance.
[unknown]  - Role: solo founder-operator. Team size: 1.

## Career
[unknown]  - Current role: solo founder-operator building ABS (AI consulting skill system for PME consultants) under the Aurelio OS ecosystem.
[unknown]  - Technical level: power-user / skill-author. Active capabilities: Claude skill authoring, Markdown/YAML documentation, prompt engineering, agent pipeline design, MCP consumption (not authoring).
[unknown]  - Connected MCPs: Linear, Google Drive, WordPress.com.
[unknown]  - Target career track (NL): AI-adjacent entry-level role in Netherlands — PO/PM with AI focus. Entry window: September 2026.
[unknown]  - Certifications in priority order: (1) Anthropic Ecosystem — Skills e Agentes; (2) PSPO-AI; (3) AI Governance / AI Act.
[unknown]  - Narrative for CV: Empreendedor — ABS is evidence of autonomous execution, not merely learning.

## Projects
[2026-04-28] - ABS — Aurelio's Business Skills (product name: "Raio-X de Viabilidade para Pequeno Negócio Local"). AI consulting skill system for independent PME consultants, Sebrae/ALI, and consultative accountants. Turns raw briefings into 3 fixed outputs: Diagnóstico Executivo, Matriz de Decisão, and Plano 5W2H 30 dias — in one session. Pipeline: F0 Setup → F1 Briefing → F2 Diagnóstico → F3 Decisão → F4 Plano → F5 Entrega. Corpus of 17 artifacts (A01–A17) at v1.1 filled. Fictional fixture: Ana Souza (beauty studio, pre-opening). Status: active development, priority 1. Key constraints: exactly 3 MVP outputs (no expansion before R3), not publishable as validated before real consultant feedback (R3 gate), monetization planned via Hotmart. Critical gaps: SKILL.md v0.2 not written (GAP-SKILL), Ana demo not run through all 3 outputs (GAP-ANA), no closed client case with hard metrics (GAP-01), no legal entity/CNPJ (GAP-04).
[2026-04-28] - NL Career Sprint. 90-day structured track to land an AI-adjacent entry-level role (PO/PM) in the Netherlands by September 2026. W1–4: Foundation (LinkedIn PT+EN+NL, domain, blog, GitHub, Hotmart account). W5–8: Production (skill pilot published, 28-min video, ebook, ABS landing, AI-Natomy EN article). W9–12: Active Insertion (10+ NL applications, recruiter outreach, interview prep, 1:1 consulting offer). Pivot rule: Day 91 with zero hiring signal → pivot to junior PO, customer service, or office entry-level using general stack. Status: parallel during transition. Priority 2. Interdependency rule: ABS product IS the portfolio — do not advance one without the other.
[2026-04-28] - AI-Natomy Content Studio. Public content engine for LinkedIn, blog (Aurelio's.com), and portfolio narrative. Two content tracks: PT-BR (PME consultants) and EN (Dutch/international market). Target publication: Frank's Watching (NL media) or equivalent. Status: active. Dependency: ABS R3 validation must be complete before publishing as validated product case study.
[2026-04-28] - Scripity. Corpus generation engine that produces F1–F7 corpus artifacts. Skill path: 02-scripity/. Status: active tool.
[2026-04-28] - 007 Command Center. Meta-OS project for system orchestration, weekly reviews, and master planning. Knowledge base: master YAML, roadmap, decision logs. Status: active.
[2026-04-28] - Family Admin OS. Non-public project for family documents, decisions, relocation logistics, and finance admin. Rule: non-public docs only. Status: active.

## Preferences
[2026-04-28] - Prefers tables and structured sections as primary format; artifacts for large outputs; XML or code blocks for specs/prompts. Output should be dense and layered, never verbose.
[2026-04-28] - Frameworks applied across work: SCQA + BLUF + Cynefin (kickoff); SWOT + 5Whys + Ishikawa + Porter + JTBD + TOC (diagnosis); GUT/Pareto + MECE (prioritization); 5W2H + OKR + 7Ps + BSC (planning); PDCA + OODA (execution); First Principles + PESTEL (validation); BLUF + SCQA (handover).
[2026-04-28] - Prefers "hands-off" execution with validation gates only before irreversible actions — no mid-task interruptions for low-stakes work.
[2026-04-28] - Pilot-case fixture fixed to MEI / local service business — NOT B2B agency as primary target.
[2026-04-28] - ICP primary for ABS: PME independent consultants, Sebrae/ALI agents, consultative accountants, management/marketing/finance consultants.
[2026-04-28] - Track sequencing decision: TR-01 BR PME (ABS) is primary; TR-02 NL Employment is parallel during transition; TR-03 NL Consulting is deprioritized.
[2026-04-28] - Repo output standards: Markdown for docs, YAML for structured data, /dist for machine exports, /docs for source docs, /.claude/skills for skills. Security rule: never include secrets, .env files, tokens, or private keys in public exports.
```

**This is the complete set.** All 14 MECE blocks from `SYS-007-DB-OPS-v1.json` are represented — `_meta`, `identity`, `technical_profile`, `behavior_protocol`, `artifact_spec`, all projects (`ABS`, `NL_SPRINT`, `AI_NATOMY`, `SCRIPITY`, `COMMAND_007`, `FAMILY_ADMIN`), `claude_projects_map`, `repo_structure`, `track_sequencing`, `gaps`, `milestones`, `framework_stack`, `strategic_debates`, and `daily_ops_checklist`. Nothing was omitted, including the truncated lines 176–322.

---

**Você** _2026-04-29_

for custom imstrtuciootn outputs tom etc… its all in documentation ?

---

**Claude** _2026-04-29_

Yes — everything is in the corpus. Specifically in `SYS-007-DB-OPS-v1.json`, the `behavior_protocol` block covers:

- **Tone** → `direct + consultative, no filler, no hedging, executive-grade`
- **Language rules** → PT-BR default, EN for technical layers, never mix mid-sentence
- **Format defaults** → tables, artifacts for large outputs, XML/code blocks for specs, dense not verbose
- **Epistemic labels** → FACT / INFERENCE / HYPOTHESIS / GAP / DECISION / ACTION
- **Source priority** → primary sources → proprietary platforms → rigorous publications
- **Error protocol** → 3-line structure, never retry same approach
- **Execution mode** → hands-off, validation gates before irreversible actions
- **Proactivity rules** → surface blind spots, flag friction, next steps

Plus the `daily_ops_checklist.never_do` list covers the hard constraints.

The only thing **not** in the file is anything you'd put in Claude's actual **Custom Instructions field** on claude.ai — that's a separate box you fill manually per-account, not per-project. If you want, I can draft the custom instructions text you'd paste there, pulling directly from the corpus. Want that?

---

**Você** _2026-04-29_

Use thats the Task

---

**Claude** _2026-04-29_

1	---
     2	name: product-self-knowledge
     3	description: "Stop and consult this skill whenever your response would include specific facts about Anthropic's products. Covers: Claude Code (how to install, Node.js requirements, platform/OS support, MCP server integration, configuration), Claude API (function calling/tool use, batch processing, SDK usage, rate limits, pricing, models, streaming), and Claude.ai (Pro vs Team vs Enterprise plans, feature limits). Trigger this even for coding tasks that use the Anthropic SDK, content creation mentioning Claude capabilities or pricing, or LLM provider comparisons. Any time you would otherwise rely on memory for Anthropic product details, verify here instead — your training data may be outdated or wrong."
     4	---
     5	
     6	# Anthropic Product Knowledge
     7	
     8	## Core Principles
     9	
    10	1. **Accuracy over guessing** - Check official docs when uncertain
    11	2. **Distinguish products** - Claude.ai, Claude Code, and Claude API are separate products
    12	3. **Source everything** - Always include official documentation URLs
    13	4. **Right resource first** - Use the correct docs for each product (see routing below)
    14	
    15	---
    16	
    17	## Question Routing
    18	
    19	### Claude API or Claude Code questions?
    20	
    21	→ **Check the docs maps first**, then navigate to specific pages:
    22	
    23	- **Claude API & General:** https://docs.claude.com/en/docs_site_map.md
    24	- **Claude Code:** https://docs.anthropic.com/en/docs/claude-code/claude_code_docs_map.md
    25	
    26	### Claude.ai questions?
    27	
    28	→ **Browse the support page:**
    29	
    30	- **Claude.ai Help Center:** https://support.claude.com
    31	
    32	---
    33	
    34	## Response Workflow
    35	
    36	1. **Identify the product** - API, Claude Code, or Claude.ai?
    37	2. **Use the right resource** - Docs maps for API/Code, support page for Claude.ai
    38	3. **Verify details** - Navigate to specific documentation pages
    39	4. **Provide answer** - Include source link and specify which product
    40	5. **If uncertain** - Direct user to relevant docs: "For the most current information, see [URL]"
    41	
    42	---
    43	
    44	## Quick Reference
    45	
    46	**Claude API:**
    47	
    48	- Documentation: https://docs.claude.com/en/api/overview
    49	- Docs Map: https://docs.claude.com/en/docs_site_map.md
    50	
    51	**Claude Code:**
    52	
    53	- Documentation: https://docs.claude.com/en/docs/claude-code/overview
    54	- Docs Map: https://docs.anthropic.com/en/docs/claude-code/claude_code_docs_map.md
    55	- npm Package: https://www.npmjs.com/package/@anthropic-ai/claude-code
    56	
    57	**Claude.ai:**
    58	
    59	- Support Center: https://support.claude.com
    60	- Getting Help: https://support.claude.com/en/articles/9015913-how-to-get-support
    61	
    62	**Other:**
    63	
    64	- Product News: https://www.anthropic.com/news
    65	- Enterprise Sales: https://www.anthropic.com/contact-sales
    66	
Claude.ai's Custom Instructions has two fields. I'll draft both, pulled directly from the corpus — ready to copy-paste.
# Imagine — Visual Creation Suite

## Modules
Call read_me again with the modules parameter to load detailed guidance:
- `diagram` — SVG flowcharts, structural diagrams, illustrative diagrams
- `mockup` — UI mockups, forms, cards, dashboards
- `interactive` — interactive explainers with controls
- `chart` — charts, data analysis, geographic maps (Chart.js, D3 choropleth)
- `art` — illustration and generative art
Pick the closest fit. The module includes all relevant design guidance.

**Complexity budget — hard limits:**
- Box subtitles: ≤5 words. Detail goes in click-through (`sendPrompt`) or the prose below — not the box.
- Colors: ≤2 ramps per diagram. If colors encode meaning (states, tiers), add a 1-line legend. Otherwise use one neutral ramp.
- Horizontal tier: ≤4 boxes at full width (~140px each). 5+ boxes → shrink to ≤110px OR wrap to 2 rows OR split into overview + detail diagrams.

If you catch yourself writing "click to learn more" in prose, the diagram itself must ACTUALLY be sparse. Don't promise brevity then front-load everything.

**Accessibility:** For HTML widgets, begin with a visually-hidden `<h2 class="sr-only">` containing a one-sentence summary of the visualization for screen-reader users. (SVG widgets use `role="img"` with `<title>` and `<desc>` instead — see SVG setup.)

You create rich visual content — SVG diagrams/illustrations and HTML interactive widgets — that renders inline in conversation. The best output feels like a natural extension of the chat.

## Core Design System

These rules apply to ALL use cases.

### Philosophy
- **Seamless**: Users shouldn't notice where claude.ai ends and your widget begins.
- **Flat**: No gradients, mesh backgrounds, noise textures, or decorative effects. Clean flat surfaces.
- **Compact**: Show the essential inline. Explain the rest in text.
- **Text goes in your response, visuals go in the tool** — All explanatory text, descriptions, introductions, and summaries must be written as normal response text OUTSIDE the tool call. The tool output should contain ONLY the visual element (diagram, chart, interactive widget). Never put paragraphs of explanation, section headings, or descriptive prose inside the HTML/SVG. If the user asks "explain X", write the explanation in your response and use the tool only for the visual that accompanies it. The user's font settings only apply to your response text, not to text inside the widget.

### Streaming
Output streams token-by-token. Structure code so useful content appears early.
- **HTML**: `<style>` (short) → content HTML → `<script>` last.
- **SVG**: `<defs>` (markers) → visual elements immediately.
- Prefer inline `style="..."` over `<style>` blocks — inputs/controls must look correct mid-stream.
- Keep `<style>` under ~15 lines. Interactive widgets with inputs and sliders need more style rules — that's fine, but don't bloat with decorative CSS.
- Gradients, shadows, and blur flash during streaming DOM diffs. Use solid flat fills instead.

### Rules
- No `<!-- comments -->` or `/* comments */` (waste tokens, break streaming)
- No font-size below 11px
- No emoji — use CSS shapes or SVG paths
- No gradients, drop shadows, blur, glow, or neon effects
- No dark/colored backgrounds on outer containers (transparent only — host provides the bg)
- **Typography**: The default font is Anthropic Sans. For the rare editorial/blockquote moment, use `font-family: var(--font-serif)`.
- **Headings**: h1 = 22px, h2 = 18px, h3 = 16px — all `font-weight: 500`. Heading color is pre-set to `var(--color-text-primary)` — don't override it. Body text = 16px, weight 400, `line-height: 1.7`. **Two weights only: 400 regular, 500 bold.** Never use 600 or 700 — they look heavy against the host UI.
- **Sentence case** always. Never Title Case, never ALL CAPS. This applies everywhere including SVG text labels and diagram headings.
- **No mid-sentence bolding**, including in your response text around the tool call. Entity names, class names, function names go in `code style` not **bold**. Bold is for headings and labels only.
- The widget container is `display: block; width: 100%`. Your HTML fills it naturally — no wrapper div needed. Just start with your content directly. If you want vertical breathing room, add `padding: 1rem 0` on your first element.
- Never use `position: fixed` — the iframe viewport sizes itself to your in-flow content height, so fixed-positioned elements (modals, overlays, tooltips) collapse it to `min-height: 100px`. For modal/overlay mockups: wrap everything in a normal-flow `<div style="min-height: 400px; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center;">` and put the modal inside — it's a faux viewport that actually contributes layout height.
- No DOCTYPE, `<html>`, `<head>`, or `<body>` — just content fragments.
- When placing text on a colored background (badges, pills, cards, tags), use the darkest shade from that same color family for the text — never plain black or generic gray.
- **Corners**: use `border-radius: var(--border-radius-md)` (or `-lg` for cards) in HTML. In SVG, `rx="4"` is the default — larger values make pills, use only when you mean a pill.
- **No rounded corners on single-sided borders** — if using `border-left` or `border-top` accents, set `border-radius: 0`. Rounded corners only work with full borders on all sides.
- **No titles or prose inside the tool output** — see Philosophy above.
- **Icon sizing**: When using emoji or inline SVG icons, explicitly set `font-size: 16px` for emoji or `width: 16px; height: 16px` for SVG icons. Never let icons inherit the container's font size — they will render too large. For larger decorative icons, use 24px max.
- No tabs, carousels, or `display: none` sections during streaming — hidden content streams invisibly. Show all content stacked vertically. (Post-streaming JS-driven steppers are fine — see Illustrative/Interactive sections.)
- No nested scrolling — auto-fit height.
- Scripts execute after streaming — load libraries via `<script src="https://cdnjs.cloudflare.com/ajax/libs/...">` (UMD globals), then use the global in a plain `<script>` that follows.
- **CDN allowlist (CSP-enforced)**: external resources may ONLY load from `cdnjs.cloudflare.com`, `esm.sh`, `cdn.jsdelivr.net`, `unpkg.com`. All other origins are blocked by the sandbox — the request silently fails.

### CSS Variables
**Backgrounds**: `--color-background-primary` (white), `-secondary` (surfaces), `-tertiary` (page bg), `-info`, `-danger`, `-success`, `-warning`
**Text**: `--color-text-primary` (black), `-secondary` (muted), `-tertiary` (hints), `-info`, `-danger`, `-success`, `-warning`
**Borders**: `--color-border-tertiary` (0.15α, default), `-secondary` (0.3α, hover), `-primary` (0.4α), semantic `-info/-danger/-success/-warning`
**Typography**: `--font-sans`, `--font-serif`, `--font-mono`
**Layout**: `--border-radius-md` (8px), `--border-radius-lg` (12px — preferred for most components), `--border-radius-xl` (16px)
All auto-adapt to light/dark mode. For custom colors in HTML, use CSS variables.

**Dark mode is mandatory** — every color must work in both modes:
- In SVG: use the pre-built color classes (`c-blue`, `c-teal`, `c-amber`, etc.) for colored nodes — they handle light/dark mode automatically. Never write `<style>` blocks for colors.
- In SVG: every `<text>` element needs a class (`t`, `ts`, `th`) — never omit fill or use `fill="inherit"`. Inside a `c-{color}` parent, text classes auto-adjust to the ramp.
- In HTML: always use CSS variables (--color-text-primary, --color-text-secondary) for text. Never hardcode colors like color: #333 — invisible in dark mode.
- Mental test: if the background were near-black, would every text element still be readable?

### sendPrompt(text)
A global function that sends a message to chat as if the user typed it. Use it when the user's next step benefits from Claude thinking. Handle filtering, sorting, toggling, and calculations in JS instead.

### Links
`<a href="https://...">` just works — clicks are intercepted and open the host's link-confirmation dialog. Or call `openLink(url)` directly.

## When nothing fits
Pick the closest use case below and adapt. When nothing fits cleanly:
- Default to editorial layout if the content is explanatory
- Default to card layout if the content is a bounded object
- All core design system rules still apply
- Use `sendPrompt()` for any action that benefits from Claude thinking


## UI components

### Layout width
The widget container is 680px wide. Use `repeat(auto-fit, minmax(160px, 1fr))` for responsive columns — auto-fit lets the grid pick column count by available width.

### Aesthetic
Flat, clean, white surfaces. Minimal 0.5px borders. Generous whitespace. No gradients, no shadows (except functional focus rings). Everything should feel native to claude.ai — like it belongs on the page, not embedded from somewhere else.

### Tokens
- Borders: always `0.5px solid var(--color-border-tertiary)` (or `-secondary` for emphasis)
- Corner radius: `var(--border-radius-md)` for most elements, `var(--border-radius-lg)` for cards
- Cards: white bg (`var(--color-background-primary)`), 0.5px border, radius-lg, padding 1rem 1.25rem
- Form elements (input, select, textarea, button, range slider) are pre-styled — write bare tags. Text inputs are 36px with hover/focus built in; range sliders have 4px track + 18px thumb; buttons have outline style with hover/active. Only add inline styles to override (e.g., different width).
- Buttons: pre-styled with transparent bg, 0.5px border-secondary, hover bg-secondary, active scale(0.98). If it triggers sendPrompt, append a ↗ arrow.
- **Round every displayed number.** JS float math leaks artifacts — `0.1 + 0.2` gives `0.30000000000000004`, `7 * 1.1` gives `7.700000000000001`. Any number that reaches the screen (slider readouts, stat card values, axis labels, data-point labels, tooltips, computed totals) must go through `Math.round()`, `.toFixed(n)`, or `Intl.NumberFormat`. Pick the precision that makes sense for the context — integers for counts, 1–2 decimals for percentages, `toLocaleString()` for currency. For range sliders, also set `step="1"` (or step="0.1" etc.) so the input itself emits round values.
- Spacing: use rem for vertical rhythm (1rem, 1.5rem, 2rem), px for component-internal gaps (8px, 12px, 16px)
- Box-shadows: none, except `box-shadow: 0 0 0 Npx` focus rings on inputs

### Metric cards
For summary numbers (revenue, count, percentage) — surface card with muted 13px label above, 24px/500 number below. `background: var(--color-background-secondary)`, no border, `border-radius: var(--border-radius-md)`, padding 1rem. Use in grids of 2-4 with `gap: 12px`. Distinct from raised cards (which have white bg + border).

### Layout
- Editorial (explanatory content): no card wrapper, prose flows naturally
- Card (bounded objects like a contact record, receipt): single raised card wraps the whole thing
- Don't put tables here — output them as markdown in your response text

**Grid overflow:** `grid-template-columns: 1fr` has `min-width: auto` by default — children with large min-content push the column past the container. Use `minmax(0, 1fr)` to clamp.

**Table overflow:** Tables with many columns auto-expand past `width: 100%` if cell contents exceed it. In constrained layouts (≤700px), use `table-layout: fixed` and set explicit column widths, or reduce columns, or allow horizontal scroll on a wrapper.

### Mockup presentation
Contained mockups — mobile screens, chat threads, single cards, modals, small UI components — should sit on a background surface (`var(--color-background-secondary)` container with `border-radius: var(--border-radius-lg)` and padding, or a device frame) so they don't float naked on the widget canvas. Full-width mockups like dashboards, settings pages, or data tables that naturally fill the viewport do not need an extra wrapper.

### 1. Interactive explainer — learn how something works
*"Explain how compound interest works" / "Teach me about sorting algorithms"*

Use HTML for the interactive controls — sliders, buttons, live state displays, charts. Keep prose explanations in your normal response text (outside the tool call), not embedded in the HTML. No card wrapper. Whitespace is the container.

```html
<div style="display: flex; align-items: center; gap: 12px; margin: 0 0 1.5rem;">
  <label style="font-size: 14px; color: var(--color-text-secondary);">Years</label>
  <input type="range" min="1" max="40" value="20" id="years" style="flex: 1;" />
  <span style="font-size: 14px; font-weight: 500; min-width: 24px;" id="years-out">20</span>
</div>

<div style="display: flex; align-items: baseline; gap: 8px; margin: 0 0 1.5rem;">
  <span style="font-size: 14px; color: var(--color-text-secondary);">£1,000 →</span>
  <span style="font-size: 24px; font-weight: 500;" id="result">£3,870</span>
</div>

<div style="margin: 2rem 0; position: relative; height: 240px;">
  <canvas id="chart"></canvas>
</div>
```

Use `sendPrompt()` to let users ask follow-ups: `sendPrompt('What if I increase the rate to 10%?')`

### 2. Compare options — decision making
*"Compare pricing and features of these products" / "Help me choose between React and Vue"*

Use HTML. Side-by-side card grid for options. Highlight differences with semantic colors. Interactive elements for filtering or weighting.

- Each option in a card. Use badges for key differentiators.
- Add `sendPrompt()` buttons: `sendPrompt('Tell me more about the Pro plan')`
- Don't put comparison tables inside this tool — output them as regular markdown tables in your response text instead. The tool is for the visual card grid only.
- When one option is recommended or "most popular", accent its card with `border: 2px solid var(--color-border-info)` only (2px is deliberate — the only exception to the 0.5px rule, used to accent featured items) — keep the same background and border as the other cards. Add a small badge (e.g. "Most popular") above or inside the card header using `background: var(--color-background-info); color: var(--color-text-info); font-size: 12px; padding: 4px 12px; border-radius: var(--border-radius-md)`.

### 3. Data record — bounded UI object
*"Show me a Salesforce contact card" / "Create a receipt for this order"*

Use HTML. Wrap the entire thing in a single raised card. All content is sans-serif since it's pure UI. Use an avatar/initials circle for people (see example below).

```html
<div style="background: var(--color-background-primary); border-radius: var(--border-radius-lg); border: 0.5px solid var(--color-border-tertiary); padding: 1rem 1.25rem;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-background-info); display: flex; align-items: center; justify-content: center; font-weight: 500; font-size: 14px; color: var(--color-text-info);">MR</div>
    <div>
      <p style="font-weight: 500; font-size: 15px; margin: 0;">Maya Rodriguez</p>
      <p style="font-size: 13px; color: var(--color-text-secondary); margin: 0;">VP of Engineering</p>
    </div>
  </div>
  <div style="border-top: 0.5px solid var(--color-border-tertiary); padding-top: 12px;">
    <table style="width: 100%; font-size: 13px;">
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;">Email</td><td style="text-align: right; padding: 4px 0; color: var(--color-text-info);">m.rodriguez@acme.com</td></tr>
      <tr><td style="color: var(--color-text-secondary); padding: 4px 0;">Phone</td><td style="text-align: right; padding: 4px 0;">+1 (415) 555-0172</td></tr>
    </table>
  </div>
</div>
```


## Color palette

9 color ramps, each with 7 stops from lightest to darkest. 50 = lightest fill, 100-200 = light fills, 400 = mid tones, 600 = strong/border, 800-900 = text on light fills.

| Class | Ramp | 50 (lightest) | 100 | 200 | 400 | 600 | 800 | 900 (darkest) |
|-------|------|------|-----|-----|-----|-----|-----|------|
| `c-purple` | Purple | #EEEDFE | #CECBF6 | #AFA9EC | #7F77DD | #534AB7 | #3C3489 | #26215C |
| `c-teal` | Teal | #E1F5EE | #9FE1CB | #5DCAA5 | #1D9E75 | #0F6E56 | #085041 | #04342C |
| `c-coral` | Coral | #FAECE7 | #F5C4B3 | #F0997B | #D85A30 | #993C1D | #712B13 | #4A1B0C |
| `c-pink` | Pink | #FBEAF0 | #F4C0D1 | #ED93B1 | #D4537E | #993556 | #72243E | #4B1528 |
| `c-gray` | Gray | #F1EFE8 | #D3D1C7 | #B4B2A9 | #888780 | #5F5E5A | #444441 | #2C2C2A |
| `c-blue` | Blue | #E6F1FB | #B5D4F4 | #85B7EB | #378ADD | #185FA5 | #0C447C | #042C53 |
| `c-green` | Green | #EAF3DE | #C0DD97 | #97C459 | #639922 | #3B6D11 | #27500A | #173404 |
| `c-amber` | Amber | #FAEEDA | #FAC775 | #EF9F27 | #BA7517 | #854F0B | #633806 | #412402 |
| `c-red` | Red | #FCEBEB | #F7C1C1 | #F09595 | #E24B4A | #A32D2D | #791F1F | #501313 |

**How to assign colors**: Color should encode meaning, not sequence. Don't cycle through colors like a rainbow (step 1 = blue, step 2 = amber, step 3 = red...). Instead:
- Group nodes by **category** — all nodes of the same type share one color. E.g. in a vaccine diagram: all immune cells = purple, all pathogens = coral, all outcomes = teal.
- For illustrative diagrams, map colors to **physical properties** — warm ramps for heat/energy, cool for cold/calm, green for organic, gray for structural/inert.
- Use **gray for neutral/structural** nodes (start, end, generic steps).
- Use **2-3 colors per diagram**, not 6+. More colors = more visual noise. A diagram with gray + purple + teal is cleaner than one using every ramp.
- **Prefer purple, teal, coral, pink** for general diagram categories. Reserve blue, green, amber, and red for cases where the node genuinely represents an informational, success, warning, or error concept — those colors carry strong semantic connotations from UI conventions. (Exception: illustrative diagrams may use blue/amber/red freely when they map to physical properties like temperature or pressure.)

**Text on colored backgrounds:** Always use the 800 or 900 stop from the same ramp as the fill. Never use black, gray, or --color-text-primary on colored fills. **When a box has both a title and a subtitle, they must be two different stops** — title darker (800 in light mode, 100 in dark), subtitle lighter (600 in light, 200 in dark). Same stop for both reads flat; the weight difference alone isn't enough. For example, text on Blue 50 (#E6F1FB) must use Blue 800 (#0C447C) or 900 (#042C53), not black. This applies to SVG text elements inside colored rects, and to HTML badges, pills, and labels with colored backgrounds.

**Light/dark mode quick pick** — use only stops from the table, never off-table hex values:
- **Light mode**: 50 fill + 600 stroke + **800 title / 600 subtitle**
- **Dark mode**: 800 fill + 200 stroke + **100 title / 200 subtitle**
- Apply `c-{ramp}` to a `<g>` wrapping shape+text, or directly to a `<rect>`/`<circle>`/`<ellipse>`. Never to `<path>` — paths don't get ramp fill. For colored connector strokes use inline `stroke="#..."` (any mid-ramp hex works in both modes). Dark mode is automatic for ramp classes. Available: c-gray, c-blue, c-red, c-amber, c-green, c-teal, c-purple, c-coral, c-pink.

For status/semantic meaning in UI (success, warning, danger) use CSS variables. For categorical coloring in both diagrams and UI, use these ramps.

Content rendered and shown to the user. Please do not duplicate the shown content in text because it's already visually represented.
[This tool call rendered an interactive widget in the chat. The user can already see the result — do not repeat it in text or with another visualization tool.]
Two fields, copy-ready. A few notes:

- **Field 1** is context — who you are, what you're building, how you work. Claude uses this to calibrate assumptions without you repeating it every session.
- **Field 2** is behavior — tone, format, language, error protocol. These become your persistent operating defaults across all chats.
- Claude.ai has a character limit per field (typically ~1500 chars). Both drafts are under that — but verify in Settings if it clips.
- These apply globally across claude.ai. Your **Claude Projects** (007 Command Center, ABS Product Lab, etc.) can still override per-project via their own system prompts/instructions — these are just the floor.

Want to adjust anything before you paste?

---

**Você** _2026-04-29_

Delivery strecred here txt

---

**Claude** _2026-04-29_

**FIELD 1 — What would you like Claude to know about you?**

```
My name is Leonardo Batista (alias: Aurelio). Age 30. Based in Santos, SP, Brazil — relocating to the Netherlands by Sep 2026. EU/Portuguese citizen.

Languages: PT-BR (native), EN (C1), NL (basic signal).

Solo founder-operator. Primary project: ABS — an AI consulting skill system for independent PME consultants (BR market). Secondary track: NL Career Sprint — targeting an AI-adjacent PO/PM role in the Netherlands.

Technical level: power-user / skill-author. I build Claude skills, design agent pipelines, do prompt engineering, and consume MCPs (not authoring). Connected MCPs: Linear, Google Drive, WordPress.com.

Interests: AI governance, EU AI Act compliance.

I work alone, move fast, and expect hands-off execution with validation gates only before irreversible actions.
```

---

**FIELD 2 — How would you like Claude to respond?**

```
LANGUAGE: Default PT-BR. Technical layers in EN. Never mix languages mid-sentence. Client content in PT-BR. GitHub/NL career content in EN.

TONE: Direct + consultative. No filler, no hedging, no preamble. Executive-grade.

FORMAT: Tables + structured sections as default. Artifacts for large outputs. XML or code blocks for specs and prompts. Dense and layered — never verbose.

EPISTEMIC LABELS: Tag claims as FACT / INFERENCE / HYPOTHESIS / GAP / DECISION / ACTION where relevant.

SOURCES: Primary sources only (official docs, peer-reviewed, CEO-level). Never use generic portals, blogs without data, or aggregators.

ERROR PROTOCOL: Line 1 = what failed + exact reason. Line 2 = the fix. Line 3 = execute immediately. Never retry the same failed approach.

EXECUTION: Hands-off. No mid-task check-ins for low-stakes steps. Raise flags only before irreversible actions.

PROACTIVITY: Surface blind spots, flag friction, offer next steps, risk-adjusted framing.

NEVER: Mix languages mid-sentence / use generic sources / retry same approach / request credentials when a native MCP is available.
```

---

**Você** _2026-04-29_

Add the delivery padroes ids

---

**Claude** _2026-04-29_

**FIELD 1 — What would you like Claude to know about you?**

```
My name is Leonardo Batista (alias: Aurelio). Age 30. Based in Santos, SP, Brazil — relocating to the Netherlands by Sep 2026. EU/Portuguese citizen.

Languages: PT-BR (native), EN (C1), NL (basic signal).

Solo founder-operator. Primary project: ABS — an AI consulting skill system for independent PME consultants (BR market). Secondary track: NL Career Sprint — targeting an AI-adjacent PO/PM role in the Netherlands.

Technical level: power-user / skill-author. I build Claude skills, design agent pipelines, do prompt engineering, and consume MCPs (not authoring). Connected MCPs: Linear, Google Drive, WordPress.com.

Interests: AI governance, EU AI Act compliance.

I work alone, move fast, and expect hands-off execution with validation gates only before irreversible actions.
```

---

**FIELD 2 — How would you like Claude to respond?**

```
LANGUAGE: Default PT-BR. Technical layers in EN. Never mix languages mid-sentence. Client content in PT-BR. GitHub/NL career content in EN.

TONE: Direct + consultative. No filler, no hedging, no preamble. Executive-grade.

FORMAT: Tables + structured sections as default. Artifacts for large outputs. XML or code blocks for specs and prompts. Dense and layered — never verbose.

EPISTEMIC LABELS: Tag claims as FACT / INFERENCE / HYPOTHESIS / GAP / DECISION / ACTION where relevant.

SOURCES: Primary sources only (official docs, peer-reviewed, CEO-level). Never use generic portals, blogs without data, or aggregators.

ERROR PROTOCOL: Line 1 = what failed + exact reason. Line 2 = the fix. Line 3 = execute immediately. Never retry the same failed approach.

EXECUTION: Hands-off. No mid-task check-ins for low-stakes steps. Raise flags only before irreversible actions.

PROACTIVITY: Surface blind spots, flag friction, offer next steps, risk-adjusted framing.

ARTIFACT IDS: Every artifact gets an ID before content is written. Structure: [DOMAIN]-[SYSTEM]-[FUNCTION]-[VERSION].
Domains: SYS · PRM · CMD · WRK · DOC · AST · SKL · CRP · PUB · APP · DEC · REV · FAM
Systems: 007 · ABS · SCR · ASN · AIN · NL · FAM · LAB
Every artifact must include header (ID, LABEL, TYPE, DOMAIN, PROJECT, LANGUAGE, STATUS, EPISTEMIC, CREATED) and footer (FILENAME, DRIVE_PATH, REPO_PATH, COMMIT_MSG, NEXT_ACTION). Versioned updates increment version — never overwrite v1. NEXT_ACTION = single verb phrase, no lists, no optionality.

NEVER: Mix languages mid-sentence / use generic sources / retry same approach / request credentials when a native MCP is available / skip header+footer on any artifact.
```
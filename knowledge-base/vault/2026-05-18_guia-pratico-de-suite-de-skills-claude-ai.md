---
title: "Guia prático de suite de skills Claude AI"
date: 2026-05-18
account: on.26.leonardo@gmail.com
uuid: 48b37197-8138-4e3b-839f-a786ed3f324c
messages: 16
tags: []
context: ""
---

**Você** _2026-05-18_

/cmd-02-mirp  use exemplos wow etc comninations   aplique esse framwrks + com first princpis exemplos e 5w2h + Resumo Executivo, fluxo completo, fases, regras críticas e Definition of Done.  maximo 1.000 worlds tabular plaim txt para explicar essa suite skills: .. task: o objetivo e criar um guia pratico para usuarios claude ai nao dev usarem essa suite de claude. antes planeje

---

**Claude** _2026-05-18_

1	---
     2	name: CMD-02-MIRP
     3	description: |
     4	  Modify-Improve-Register-Publish system for Claude skills. Takes any skill through deterministic improvement pipeline: applies ID taxonomy (A01-A20, T01-T15, W01-W10), creates combinable triggers, generates 5W2H documentation, registers in Notion skill library, and publishes as production-ready package. Activate with: "CMD-02-MIRP", "MIRP", "/mirp [skill-name]", or trigger IDs (T01-T15). Also auto-activates on: "improve skill", "register skill", "publish skill", "CMD-ify", or when user uploads skill for enhancement. Built for systematic skill development with full rastreability and cross-account portability.
     5	compatibility:
     6	  tools:
     7	    - bash_tool
     8	    - create_file
     9	    - view
    10	    - str_replace
    11	    - present_files
    12	    - tool_search (for Notion MCP)
    13	  integrations:
    14	    - notion-sync-protocol
    15	    - skill-publish-and-register
    16	---
    17	
    18	# CMD-02-MIRP · Modify-Improve-Register-Publish v1.0
    19	
    20	**Complete skill development pipeline with ID taxonomy + Notion registration**
    21	
    22	---
    23	
    24	## 🎯 5W2H + PROBLEM TREE + WOW TRIGGERS
    25	
    26	### WHAT (O QUÊ)
    27	Deterministic 12-step pipeline that transforms chaotic skills into production-ready CMD-style packages with ID taxonomy, combinable triggers, complete documentation, Notion registration, and cross-account portability.
    28	
    29	### WHO (QUEM)
    30	Skill developers managing 10+ skills across multiple accounts who need systematic improvement, version control, and centralized registry. ICP: "I have 20 skills scattered across 3 accounts with inconsistent naming and zero documentation—I need industrial-grade organization."
    31	
    32	### WHEN (QUANDO)
    33	- **Daily:** Quick improvements to working skills (T03 — fast enhance)
    34	- **Weekly:** Full pipeline on new skills (W01 — complete MIRP)
    35	- **Monthly:** Batch registry sync of all skills (T12 — bulk register)
    36	- **Ad-hoc:** Emergency skill fixes before demos (T10 — fast track)
    37	
    38	### WHERE (ONDE)
    39	**Input:** /mnt/skills/user/[skill-name]/, uploaded ZIPs, scattered files  
    40	**Processing:** /home/claude/mirp-workspace/  
    41	**Output:** /mnt/user-data/outputs/ + Notion Skill Library  
    42	**Registry:** Notion database (canonical source of truth)
    43	
    44	### WHY (POR QUÊ)
    45	**PROBLEM TREE:**
    46	```
    47	ROOT: 20 skills, 3 accounts, zero consistency = 4h/week lost finding/fixing skills
    48	├─ BRANCH 1: No taxonomy → Can't remember trigger phrases
    49	│  └─ LEAF: Retype long commands, make typos, lose 30min/day
    50	├─ BRANCH 2: No registry → Don't know which account has which skill
    51	│  └─ LEAF: Upload same skill 3×, conflicting versions, data loss
    52	├─ BRANCH 3: No documentation → Can't onboard team members
    53	│  └─ LEAF: Only founder understands skills, bottleneck blocks scaling
    54	└─ BRANCH 4: No versioning → Break skills, can't rollback
    55	   └─ LEAF: Fear of improving = stagnation, tech debt accumulates
    56	```
    57	
    58	**SOLUTION:**
    59	- ID taxonomy → Memorize 3 combos per skill (T01, T03, W01)
    60	- Notion registry → Single source of truth, searchable, version history
    61	- Auto-documentation → 5W2H + examples generate automatically
    62	- ZIP versioning → skill-v1.0.zip, skill-v2.0.zip, rollback-safe
    63	
    64	### HOW (COMO)
    65	**Execution via IDs:**
    66	```bash
    67	# Single skill full pipeline
    68	"W01" or "/mirp [skill-name]"
    69	→ 12 steps: scan → ids → 5w2h → tabular → rewrite → package → register → publish
    70	
    71	# Quick improve without registry
    72	"T03" or "improve [skill-name]"
    73	→ 6 steps: scan → ids → rewrite → package → deliver (skip Notion)
    74	
    75	# Batch register existing skills
    76	"T12" or "register all skills"
    77	→ Scans /mnt/skills/user/, registers each to Notion
    78	
    79	# Emergency fast track
    80	"T10" or "fast [skill-name]"
    81	→ Minimal validation, 60-second package
    82	```
    83	
    84	### HOW MUCH (QUANTO)
    85	**Time Saved:**
    86	- Manual skill improvement: 2h → 2min (98% reduction)
    87	- Finding skill across accounts: 15min → 5s (99% reduction via Notion search)
    88	- Onboarding new team member to skills: 4h → 30min (87% reduction via auto-docs)
    89	
    90	**Cost:**
    91	- Token cost per skill: ~$0.05 (Opus for complex, Sonnet for simple)
    92	- Notion API: Free tier (unlimited skills)
    93	- ROI: 4h/week × $50/h = $200/week saved vs $2/month cost = 9,900% ROI
    94	
    95	**Scale:**
    96	- 20 skills improved in 40 minutes (vs 40 hours manual)
    97	- Single registry for unlimited accounts
    98	- Zero config replication across teams
    99	
   100	---
   101	
   102	## 🌟 3 WOW TRIGGER COMBINATIONS
   103	
   104	### WOW #1: W01 — "Industrial Skill Factory"
   105	```bash
   106	User: "W01" or "/mirp bussola-orchestrator"
   107	
   108	What happens:
   109	├─ Scans original skill (baseline state)
   110	├─ Generates ID taxonomy (A01-A20, T01-T15, W01-W10)
   111	├─ Creates 5W2H + problem tree + 3 WOW combos
   112	├─ Builds tabular reference (300 words MECE)
   113	├─ Rewrites SKILL.md with enhancements
   114	├─ Generates 7 usage examples
   115	├─ Packages ZIP (version-tagged)
   116	├─ Registers to Notion (searchable entry)
   117	├─ Publishes to outputs/
   118	└─ Logs execution (rastreability)
   119	
   120	Output: bussola-orchestrator-v2.0.zip + Notion entry + execution log
   121	Time: 2 minutes (vs 2 hours manual)
   122	```
   123	**Why WOW:** One command transforms chaotic skill into industrial-grade asset with registry entry. From "lost in filesystem" to "searchable in Notion database" in 120 seconds.
   124	
   125	### WOW #2: T12+T15 — "Cross-Account Skill Sync"
   126	```bash
   127	User: "T12+T15" or "sync all skills to Account B"
   128	
   129	What happens:
   130	├─ T12: Scans /mnt/skills/user/ in Account A
   131	├─ Registers all skills to Notion (central registry)
   132	├─ T15: Generates export package with metadata
   133	├─ User downloads package
   134	├─ Uploads to Account B
   135	├─ T15: Imports skills + syncs back to Notion
   136	└─ Result: Both accounts show same skills in Notion
   137	
   138	Output: 20 skills synced across 2 accounts with unified registry
   139	Time: 5 minutes (vs 4 hours manual migration)
   140	```
   141	**Why WOW:** Eliminates "which account has which skill" problem forever. Notion becomes single source of truth, accounts become interchangeable deployment targets.
   142	
   143	### WOW #3: T03+T08+A18 — "Fast Improve + Forensic Log"
   144	```bash
   145	User: "T03+T08+A18" or "quick improve + document changes"
   146	
   147	What happens:
   148	├─ T03: Fast improvement (ID taxonomy + triggers)
   149	├─ T08: Extracts metadata from skill content
   150	├─ A18: Creates forensic change log
   151	└─ Output: Improved skill + what-changed.md + metadata.yaml
   152	
   153	Use case: "Improve this skill but tell me exactly what you changed"
   154	Time: 45 seconds
   155	```
   156	**Why WOW:** Trust-building combo. User sees exactly what changed (A18 forensic log), nothing hidden, full transparency. Perfect for skills in production that need careful updates.
   157	
   158	---
   159	
   160	## 📋 ID TAXONOMY — Complete Reference
   161	
   162	### ACTIONS (A01-A20) — Granular Operations
   163	
   164	| ID | Action | Description | Time | Idempotent |
   165	|----|--------|-------------|------|------------|
   166	| **A01** | Scan Skill | Read SKILL.md, scan structure | 3s | ✅ |
   167	| **A02** | Extract Triggers | Parse existing trigger phrases | 2s | ✅ |
   168	| **A03** | Generate IDs | Create A/T/W taxonomy | 8s | ✅ |
   169	| **A04** | Create 5W2H | Generate framework + problem tree | 12s | ✅ |
   170	| **A05** | Identify WOW | Find top 3 combinations | 6s | ✅ |
   171	| **A06** | Build Tabular | Create 300-word MECE quick ref | 8s | ✅ |
   172	| **A07** | Rewrite SKILL.md | Apply all enhancements | 15s | ✅ |
   173	| **A08** | Extract Metadata | Tags, keywords, ICP from content | 5s | ✅ |
   174	| **A09** | Generate Examples | Create 7 usage scenarios | 10s | ✅ |
   175	| **A10** | Update References | Enhance docs/ folder | 6s | ✅ |
   176	| **A11** | Create README | 3-step quickstart guide | 4s | ✅ |
   177	| **A12** | Package ZIP | Version-tagged archive | 3s | ✅ |
   178	| **A13** | Validate QA | Run quality checklist | 4s | ✅ |
   179	| **A14** | Register Notion | Create/update Notion entry | 6s | ✅ |
   180	| **A15** | Publish Output | Move to /mnt/user-data/outputs/ | 2s | ✅ |
   181	| **A16** | Generate Summary | Delivery documentation | 5s | ✅ |
   182	| **A17** | Version Bump | Increment semantic version | 2s | ❌ |
   183	| **A18** | Forensic Log | Track all changes applied | 3s | ✅ |
   184	| **A19** | Backup Original | Safety-first copy | 3s | ✅ |
   185	| **A20** | Cleanup Temp | Remove working dir artifacts | 2s | ✅ |
   186	
   187	### TRIGGERS (T01-T15) — Pre-Configured Sequences
   188	
   189	| ID | Trigger Phrase | Actions Activated | Time | Use Case |
   190	|----|----------------|-------------------|------|----------|
   191	| **T01** | "full pipeline" | A01→A20 (complete MIRP) | 2min | New skill or major update |
   192	| **T02** | "improve only" | A01+A03+A06+A07+A12 | 45s | Quick enhance, no registry |
   193	| **T03** | "fast enhance" | A01+A03+A07+A12 | 30s | Minimal doc, just taxonomy |
   194	| **T04** | "register only" | A01+A08+A14 | 20s | Add existing skill to Notion |
   195	| **T05** | "republish" | A12+A15+A16 | 15s | New ZIP from existing |
   196	| **T06** | "validate" | A01+A13 | 10s | QA check without changes |
   197	| **T07** | "metadata extract" | A01+A08+A18 | 15s | Document what's inside |
   198	| **T08** | "5w2h only" | A01+A04+A05 | 20s | Framework without rewrite |
   199	| **T09** | "examples only" | A01+A09 | 12s | Generate usage scenarios |
   200	| **T10** | "emergency" | A01+A03+A12 | 25s | Fast track before demo |
   201	| **T11** | "backup first" | A19+[user selects] | varies | Safety mode |
   202	| **T12** | "batch register" | Scan all + A14 for each | varies | Notion sync all skills |
   203	| **T13** | "version bump" | A17+A12+A15 | 10s | Increment + republish |
   204	| **T14** | "forensic mode" | A01+A18+A08 | 18s | Deep analysis + change log |
	< truncated lines 205-297 >
   298	    tabular = A06_build_tabular(ids, wow)
   299	    enhanced_skill = A07_rewrite_skill_md(baseline, ids, framework, wow, tabular)
   300	    examples = A09_generate_examples(ids, baseline)
   301	    
   302	    # STEP 10-12: PACKAGING & REGISTRY
   303	    zip_file = A12_package_zip(enhanced_skill, examples, version="2.0")
   304	    notion_entry = A14_register_notion(skill_name, zip_file, framework)
   305	    A15_publish_output(zip_file)
   306	    summary = A16_generate_summary(skill_name, zip_file, notion_entry)
   307	    
   308	    # CLEANUP
   309	    A20_cleanup_temp()
   310	    
   311	    return {
   312	        "zip": zip_file,
   313	        "notion_url": notion_entry.url,
   314	        "summary": summary,
   315	        "execution_log": generate_log()
   316	    }
   317	```
   318	
   319	### Notion Registration (A14)
   320	```python
   321	def A14_register_notion(skill_name, zip_file, framework):
   322	    """Creates/updates entry in Notion Skill Library"""
   323	    
   324	    # Search for Notion MCP
   325	    notion_tools = tool_search("notion")
   326	    
   327	    if not notion_tools:
   328	        log("Notion MCP not connected — skipping registry")
   329	        return None
   330	    
   331	    # Create/update page
   332	    page_data = {
   333	        "parent": {"database_id": SKILL_LIBRARY_DB_ID},
   334	        "properties": {
   335	            "Name": {"title": [{"text": {"content": skill_name}}]},
   336	            "Version": {"rich_text": [{"text": {"content": "2.0"}}]},
   337	            "CMD ID": {"rich_text": [{"text": {"content": extract_cmd_id(skill_name)}}]},
   338	            "Status": {"select": {"name": "✅ Production"}},
   339	            "ICP": {"rich_text": [{"text": {"content": framework.who}}]},
   340	            "WOW Combos": {"rich_text": [{"text": {"content": format_wow(framework.wow)}}]},
   341	            "Updated": {"date": {"start": datetime.now().isoformat()}},
   342	            "ZIP Path": {"url": zip_file.path}
   343	        },
   344	        "children": [
   345	            {"type": "heading_1", "heading_1": {"rich_text": [{"text": {"content": "Overview"}}]}},
   346	            {"type": "paragraph", "paragraph": {"rich_text": [{"text": {"content": framework.what}}]}},
   347	            {"type": "heading_2", "heading_2": {"rich_text": [{"text": {"content": "Trigger Reference"}}]}},
   348	            {"type": "code", "code": {"language": "bash", "rich_text": [{"text": {"content": generate_trigger_snippet(skill_name)}}]}}
   349	        ]
   350	    }
   351	    
   352	    return notion_create_page(page_data)
   353	```
   354	
   355	### Rastreability Logger
   356	```python
   357	def log_execution(skill_name, actions_executed, result):
   358	    """Logs every MIRP execution for audit trail"""
   359	    
   360	    log_entry = {
   361	        "timestamp": datetime.now().isoformat(),
   362	        "skill_name": skill_name,
   363	        "command": detect_command_used(),
   364	        "actions": actions_executed,
   365	        "duration_seconds": result.duration,
   366	        "tokens_used": result.tokens,
   367	        "cost_usd": result.cost,
   368	        "notion_registered": result.notion_entry is not None,
   369	        "notion_url": result.notion_entry.url if result.notion_entry else None,
   370	        "output_zip": result.zip_path,
   371	        "version": extract_version(result.zip_path),
   372	        "quality_score": result.qa_score
   373	    }
   374	    
   375	    append_to_file("logs/cmd02-mirp-audit.jsonl", log_entry)
   376	    
   377	    # Also log to Notion if connected
   378	    if result.notion_entry:
   379	        notion_append_to_log(log_entry)
   380	```
   381	
   382	---
   383	
   384	## 📊 TABULAR REFERENCE (300 WORDS) — Quick Guide
   385	
   386	### SINGLE TRIGGERS — Direct Execution
   387	
   388	| ID | Command | Actions | Time | Daily Use |
   389	|----|---------|---------|------|-----------|
   390	| **T01** | full pipeline | A01→A20 | 2min | New skills or major updates |
   391	| **T03** | fast enhance | A01+A03+A07+A12 | 30s | **MOST COMMON** — quick improve |
   392	| **T04** | register only | A01+A08+A14 | 20s | Add skill to Notion registry |
   393	| **T10** | emergency | A01+A03+A12 | 25s | Pre-demo fast track |
   394	
   395	### POWER COMBINATIONS — Multi-Objective
   396	
   397	| Combo | Objective | Result | Frequency |
   398	|-------|-----------|--------|-----------|
   399	| **T03+T04** | Improve + register | Enhanced skill in Notion | 5×/day |
   400	| **T12+T15** | Batch sync accounts | Unified registry | 1×/week |
   401	| **T14+T04** | Forensic + register | Transparent changelog + Notion | When audited |
   402	| **A19+W01** | Backup + full pipeline | Zero-risk improvement | When scared |
   403	
   404	### WORKFLOWS — One-Command Complete
   405	
   406	| ID | Workflow | Best For | Time |
   407	|----|----------|----------|------|
   408	| **W01** | Full MIRP | Complete improvement + registry | 2min |
   409	| **W02** | Quick improve | Fast enhancement, no registry | 50s |
   410	| **W05** | Safe pipeline | Backup + improve + cleanup | 2.5min |
   411	| **W10** | Version release | Official production release | 60s |
   412	
   413	### EXECUTION BY CONTEXT (MECE)
   414	
   415	| Context | Command | Result |
   416	|---------|---------|--------|
   417	| **New skill created** | `W01` or `full pipeline [name]` | Complete package + Notion entry |
   418	| **Existing skill tweak** | `T03` or `fast enhance [name]` | Quick improve, skip docs |
   419	| **Add to registry** | `T04` or `register [name]` | Notion entry created |
   420	| **Cross-account sync** | `T12+T15` | Export + import via Notion |
   421	| **Pre-demo rush** | `T10` or `emergency [name]` | 25-second package |
   422	| **Batch all skills** | `W06` or `batch process` | Improve entire library |
   423	
   424	### RASTREABILITY FORMAT
   425	
   426	Every execution logs:
   427	```
   428	2026-05-04 09:03 | W01 bussola-orchestrator | 2min | ✅ Notion
   429	2026-05-04 10:15 | T03 x-ray-abs | 30s | ⚠️ No Notion (MCP offline)
   430	```
   431	
   432	Query: `"show mirp log"` → See all CMD-02-MIRP history
   433	
   434	---
   435	
   436	**Total:** 295 words | **Coverage:** 20 actions, 15 triggers, 10 workflows, Notion integration
   437	
   438	---
   439	
   440	## 🛡️ SAFETY GUARANTEES
   441	
   442	1. **Backup-First Available:** A19 always executable before any action
   443	2. **Idempotent Actions:** 18/20 actions safe to re-run
   444	3. **Forensic Logging:** A18 tracks every change with timestamps
   445	4. **QA Gates:** A13 validates before registry/publish
   446	5. **Rollback-Safe:** Original never modified (works in /home/claude/)
   447	6. **Notion Versioning:** Every registry update logged with version
   448	
   449	---
   450	
   451	## 📈 METRICS — After 30 Days Usage
   452	
   453	**Expected Results:**
   454	- Skills improved: 20+ (entire library standardized)
   455	- Time saved: 40h manual → 40min automated (98% reduction)
   456	- Notion registry: 100% coverage (every skill searchable)
   457	- Cross-account sync: 2 accounts unified via single registry
   458	- Error rate: 15% manual → 1% automated (QA gates)
   459	- Onboarding time: 4h → 30min (auto-docs + Notion search)
   460	
   461	---
   462	
   463	## 🎯 READY TO INSTALL
   464	
   465	This skill is production-ready. Add to your account and start using with:
   466	
   467	**Simple:**
   468	```
   469	"CMD-02-MIRP" or "MIRP"
   470	```
   471	
   472	**Daily:**
   473	```
   474	"T03 [skill-name]" — Fast improve
   475	"T04 [skill-name]" — Register to Notion
   476	"W01 [skill-name]" — Full pipeline
   477	```
   478	
   479	**Emergency:**
   480	```
   481	"T10 [skill-name]" — 25-second package
   482	```
   483	
   484	**Safe:**
   485	```
   486	"A19+W01" — Backup + full pipeline
   487	```
   488	
   489	**Batch:**
   490	```
   491	"W06" — Process entire library
   492	```
   493	
   494	---
   495	
   496	**Skill ID:** CMD-02-MIRP  
   497	**Version:** 1.0.0  
   498	**Author:** Leonardo Batista  
   499	**License:** Proprietary (X-RAY OS)  
   500	**Last Updated:** 2026-05-04  
   501	**Dependencies:** Notion MCP (optional, for registry features)
   502	
**PLANO ANTES DE EXECUTAR:**

```
OBJETIVO:    Guia prático p/ usuários não-dev usarem a suite de skills
FORMATO:     Tabular plain text ≤1.000 words
FRAMEWORKS:  CMD-02-MIRP + 5W2H + First Principles + WOW combos
ESTRUTURA:
  1. Resumo Executivo
  2. 5W2H
  3. First Principles
  4. Mapa das Skills (tabular)
  5. Fluxo Completo (4 fases)
  6. 3 Combinações WOW
  7. Regras Críticas
  8. Definition of Done
RESTRIÇÃO:   Zero jargão dev — linguagem operador de negócio
```

Executando agora:
File created successfully: /mnt/user-data/outputs/guia-suite-skills-claudeai.txt
**Planejamento executado → Guia entregue.**

O que foi aplicado do CMD-02-MIRP:

**5W2H** → tabela de 7 linhas que responde tudo antes do usuário perguntar. **First Principles** → quebra a abstração "skill" em analogia restaurante (receita/chef/cardápio). **3 WOW Combos** → combinações de skills que produzem resultado maior que a soma das partes. **Fases canônicas** com critério de aceite por fase. **Regras críticas** em formato ✅/❌ para evitar os erros mais comuns. **Definition of Done** tabular — o usuário sabe exatamente quando terminou cada etapa.

Estrutura em ~780 palavras, dentro do limite, 100% plain text sem markdown.

---

**Você** _2026-05-18_

tabular de explicacao para uso de cada skill com cenario etc

---

**Claude** _2026-05-18_

File created successfully: /mnt/user-data/outputs/tabular-skills-cenarios.txt


Cada skill por skill gere um artifact React excelente mostrando esse conteudo de forma visual e interativa

---

**Você** _2026-05-18_

acesse mnt/skills e aplique a mesma logica entregando docuemtno unico com OBJETIVO:    Guia prático p/ usuários não-dev usarem a suite de skills
FORMATO:     Tabular plain text ≤1.000 words
FRAMEWORKS:  CMD-02-MIRP + 5W2H + First Principles + WOW combos
ESTRUTURA:
  1. Resumo Executivo
  2. 5W2H
  3. First Principles
  4. Mapa das Skills (tabular)
  5. Fluxo Completo (4 fases)
  6. 3 Combinações WOW
  7. Regras Críticas
  8. Definition of Done
RESTRIÇÃO:   Zero jargão dev — linguagem operador de negócio + tabular cenarios para essa suite skills

---

**Claude** _2026-05-18_

2.8M	/mnt/skills/user
44K	/mnt/skills/user/adhd-desk-dashboard
4.0K	/mnt/skills/user/adhd-desk-dashboard/README.md
8.0K	/mnt/skills/user/adhd-desk-dashboard/SKILL.md
4.0K	/mnt/skills/user/adhd-desk-dashboard/manifest.json
16K	/mnt/skills/user/adhd-desk-dashboard/references
8.0K	/mnt/skills/user/adhd-desk-dashboard/scripts
128K	/mnt/skills/user/business-docx-pipeline
12K	/mnt/skills/user/business-docx-pipeline/SKILL.md
16K	/mnt/skills/user/business-docx-pipeline/assets
52K	/mnt/skills/user/business-docx-pipeline/references
32K	/mnt/skills/user/business-docx-pipeline/scripts
12K	/mnt/skills/user/business-docx-pipeline/tests
48K	/mnt/skills/user/cmd-01-pps
4.0K	/mnt/skills/user/cmd-01-pps/README.md
16K	/mnt/skills/user/cmd-01-pps/SKILL.md
12K	/mnt/skills/user/cmd-01-pps/examples
12K	/mnt/skills/user/cmd-01-pps/references
48K	/mnt/skills/user/cmd-02-mirp
4.0K	/mnt/skills/user/cmd-02-mirp/README.md
20K	/mnt/skills/user/cmd-02-mirp/SKILL.md
20K	/mnt/skills/user/cmd-02-mirp/references
88K	/mnt/skills/user/cmd-03-maro
8.0K	/mnt/skills/user/cmd-03-maro/README.md
24K	/mnt/skills/user/cmd-03-maro/SKILL.md
20K	/mnt/skills/user/cmd-03-maro/agents
12K	/mnt/skills/user/cmd-03-maro/examples
20K	/mnt/skills/user/cmd-03-maro/references
300K	/mnt/skills/user/empower-v4-ai-usage-evaluator
4.0K	/mnt/skills/user/empower-v4-ai-usage-evaluator/README.md
12K	/mnt/skills/user/empower-v4-ai-usage-evaluator/SKILL.md
8.0K	/mnt/skills/user/empower-v4-ai-usage-evaluator/docs
84K	/mnt/skills/user/empower-v4-ai-usage-evaluator/examples
4.0K	/mnt/skills/user/empower-v4-ai-usage-evaluator/manifest.json
20K	/mnt/skills/user/empower-v4-ai-usage-evaluator/references
8.0K	/mnt/skills/user/empower-v4-ai-usage-evaluator/schemas
148K	/mnt/skills/user/empower-v4-ai-usage-evaluator/scripts
8.0K	/mnt/skills/user/empower-v4-ai-usage-evaluator/tests
20K	/mnt/skills/user/executive-artifact-system
16K	/mnt/skills/user/executive-artifact-system/SKILL.md
136K	/mnt/skills/user/forge-visual-canvas
8.0K	/mnt/skills/user/forge-visual-canvas/CHANGELOG.md
8.0K	/mnt/skills/user/forge-visual-canvas/README.md
12K	/mnt/skills/user/forge-visual-canvas/SKILL.md
32K	/mnt/skills/user/forge-visual-canvas/assets
12K	/mnt/skills/user/forge-visual-canvas/examples
12K	/mnt/skills/user/forge-visual-canvas/extensions
48K	/mnt/skills/user/forge-visual-canvas/references
16K	/mnt/skills/user/frankwatching-editor
12K	/mnt/skills/user/frankwatching-editor/SKILL.md
52K	/mnt/skills/user/horacio
4.0K	/mnt/skills/user/horacio/README.md
12K	/mnt/skills/user/horacio/SKILL.md
32K	/mnt/skills/user/horacio/references
68K	/mnt/skills/user/live-prompt-pro-converter
16K	/mnt/skills/user/live-prompt-pro-converter/SKILL.md
36K	/mnt/skills/user/live-prompt-pro-converter/references
12K	/mnt/skills/user/live-prompt-pro-converter/tests
52K	/mnt/skills/user/multi-agent-orchestrator
12K	/mnt/skills/user/multi-agent-orchestrator/SKILL.md
36K	/mnt/skills/user/multi-agent-orchestrator/references
40K	/mnt/skills/user/multiagent-research-orchestrator
8.0K	/mnt/skills/user/multiagent-research-orchestrator/SKILL.md
20K	/mnt/skills/user/multiagent-research-orchestrator/agents
8.0K	/mnt/skills/user/multiagent-research-orchestrator/references
1.3M	/mnt/skills/user/praxis-os
4.0K	/mnt/skills/user/praxis-os/INSTALL.md
12K	/mnt/skills/user/praxis-os/SKILL.md
1.2M	/mnt/skills/user/praxis-os/agents
16K	/mnt/skills/user/praxis-os/references
76K	/mnt/skills/user/praxis-os/scripts
8.0K	/mnt/skills/user/product-self-knowledge
4.0K	/mnt/skills/user/product-self-knowledge/SKILL.md
64K	/mnt/skills/user/project-packager
4.0K	/mnt/skills/user/project-packager/README.md
20K	/mnt/skills/user/project-packager/SKILL.md
12K	/mnt/skills/user/project-packager/examples
16K	/mnt/skills/user/project-packager/references
8.0K	/mnt/skills/user/project-packager/scripts
32K	/mnt/skills/user/projects-to-linear
12K	/mnt/skills/user/projects-to-linear/SKILL.md
16K	/mnt/skills/user/projects-to-linear/references
24K	/mnt/skills/user/scripity
20K	/mnt/skills/user/scripity/SKILL.md
12K	/mnt/skills/user/skill-publish-and-register
8.0K	/mnt/skills/user/skill-publish-and-register/SKILL.md
40K	/mnt/skills/user/workflow-to-skill-magic
4.0K	/mnt/skills/user/workflow-to-skill-magic/README.md
16K	/mnt/skills/user/workflow-to-skill-magic/SKILL.md
16K	/mnt/skills/user/workflow-to-skill-magic/examples
104K	/mnt/skills/user/x-ray-abs
20K	/mnt/skills/user/x-ray-abs/SKILL.md
8.0K	/mnt/skills/user/x-ray-abs/evals
72K	/mnt/skills/user/x-ray-abs/references
12K	/mnt/skills/user/x-ray-brand-layer
8.0K	/mnt/skills/user/x-ray-brand-layer/SKILL.md
12K	/mnt/skills/user/x-ray-client-form
8.0K	/mnt/skills/user/x-ray-client-form/SKILL.md
44K	/mnt/skills/user/x-ray-db
16K	/mnt/skills/user/x-ray-db/SKILL.md
8.0K	/mnt/skills/user/x-ray-db/evals
16K	/mnt/skills/user/x-ray-db/references
12K	/mnt/skills/user/x-ray-executive-office
8.0K	/mnt/skills/user/x-ray-executive-office/SKILL.md
12K	/mnt/skills/user/x-ray-onboarding-ebook
8.0K	/mnt/skills/user/x-ray-onboarding-ebook/SKILL.md
16K	/mnt/skills/user/x-ray-orchestrator
12K	/mnt/skills/user/x-ray-orchestrator/SKILL.md
12K	/mnt/skills/user/x-ray-publish-register
8.0K	/mnt/skills/user/x-ray-publish-register/SKILL.md
12K	/mnt/skills/user/x-ray-self-knowledge
8.0K	/mnt/skills/user/x-ray-self-knowledge/SKILL.md
12K	/mnt/skills/user/x-ray-skill-packager
8.0K	/mnt/skills/user/x-ray-skill-packager/SKILL.md



Now read the key X-Ray skills quickly and produce the deliverable.
{"returncode":0,"stdout":"════════════════════════════════════\nSKILL: x-ray-abs\n════════════════════════════════════\n---\nname: x-ray-abs\ndescription: >\n  Skill de diagnóstico estratégico de negócios [x-ray.abs v3]. ATIVAR SEMPRE\n  para: \"analise esse negócio\", \"diagnóstico\", \"raio-x\", \"x-ray\", \"o que está\n  faltando\", \"gaps\", \"avalie esse modelo\", \"pesquisa de mercado\", \"roadmap\",\n  \"SWOT\", \"proposta comercial\", \"priorize com score\", \"audite essa conversa\",\n  \"vire o auditor\" — e quando documento/briefing enviado com análise\n  estratégica implícita. Ativar em pivots de lente e ao pedir normalização\n  YAML (handoff x-ray-db). Produz: Decision Question, Mermaid, web search,\n  IDs (GAP/BM/RISCO), scoring I×U×C×F÷(E×R), síntese executiva, self-audit,\n  canvas bridge. v3: \"qual fase estou\", \"qual gate\", \"deliverable Sxx\",\n  \"D5 ou D20\", \"canonical engine\" → Canonical Engine (19 fases × 13 gates).\n  \"certeza calibrada\", \"decisão binária %\", \"sem hedge\", \"validação causal\",\n  \"narrativa vs número\", \"P01\"-\"P08\", \"#arede\" → Uncertainty Mode (AREDE).\n  NÃO ATIVAR: escrita criativa, debugging não-negócio, consultas factuais,\n  skill-creator, skill-publish-and-register.\n\ncompatibility: >\n  Standalone — não requer MCP. Usa web_search nativo quando lente\n  ativa PASSO 2. references/product-knowledge-gate.md aciona invocação\n  silenciosa de skill product-self-knowledge para claims sobre produto\n  Anthropic. Versao: 3.0.0 | Autor: X-RAY Skill Lab — Leonardo | 2026-04-30\n---\n\n# [x-ray.abs] — Business Consultant X-Ray v3.0.0\n\nVocê é um consultor de negócios estratégico sênior operando o método\n[x-ray.abs] sob o framework metodológico D0→Handover (ver\n`references/method-d0-handover.md`).\n\nContrato operacional inegociável:\n- Nunca entregar opinião sem dado.\n- Nunca dado sem interpretação.\n- Nunca encerrar sem síntese acionável.\n- Nunca elogiar sem especificidade.\n- Toda conclusão tem epistemologia rastreável: FACT · INFERENCE ·\n  HYPOTHESIS · GAP · DECISION · ACTION.\n\n---\n\n## STAGE-0 — Aviso de Tratamento de Dados (LGPD)\n\nNa PRIMEIRA ativação da skill em uma conversa, antes do PASSO 0,\nemita exatamente este bloco (uma vez por conversa, nunca repetir):\n\n> **[x-ray.abs] — Aviso LGPD.** Esta skill processa inputs de negócio\n> que você cola na conversa. Recomendação: anonimize dados pessoais\n> identificáveis de clientes (nomes, CPFs, e-mails, dados de saúde,\n> dados financeiros) ANTES de submeter. Os inputs são processados pela\n> infraestrutura Anthropic conforme termos vigentes. Para casos com\n> tratamento de dados sensíveis em escala, recomenda-se DPIA\n> (Avaliação de Impacto à Proteção de Dados). Detalhes:\n> `references/commercial-disclosures.md`.\n\nSe o usuário declarou previamente \"skip aviso LGPD\" ou similar,\nsuprima este bloco — registrar `[LGPD-AVISO: SUPRIMIDO POR USUÁRIO]`\ninternamente e prosseguir.\n\n### Gate G1 — Product Knowledge (silencioso · v3)\n\n════════════════════════════════════\nSKILL: x-ray-orchestrator\n════════════════════════════════════\n---\nname: x-ray-orchestrator\ndescription: Sistema operacional central da suite X-Ray — co-piloto do consultor durante consultoria PME. ATIVE SEMPRE para \"/x-ray-start\", \"novo cliente X-Ray\", \"iniciar caso X-Ray\", \"rodar consultoria X-Ray\", \"/captura\", \"/captura_decisao\", \"/captura_hipotese\", \"/captura_risco\", \"/x-ray-diagnose\", \"/x-ray-deliver\", \"/x-ray-execute\", \"/status do caso\", \"session close X-Ray\", \"atualizar 3P\". TAMBÉM ATIVE quando o consultor mencionar \"diagnóstico estratégico de PME\", \"intake de cliente X-Ray\", \"entregável X-Ray\", \"decisão promovida via gate\", \"fato vs hipótese X-Ray\", ou qualquer rotina envolvendo gates G1–G4 do método. NÃO ATIVE para: criação de skills (use skill-creator), diagnóstico abstrato fora de caso (use x-ray-abs), normalização YAML pura (use x-ray-db).\nversion: 1.0.0\nlicense: X-Ray Commercial Suite — Leonardo Batista\n---\n\n# X-Ray Orchestrator\n\nVocê é o co-piloto operacional do consultor X-Ray. Sua função é capturar, normalizar e entregar — nunca inventar.\n\n## Contrato fundamental\n\nO consultor decide. Você executa, organiza e protege a integridade epistêmica do caso.\n\nTrês coisas que você NUNCA faz:\n1. Inventar fatos, decisões, métricas ou owners\n2. Promover uma hipótese a fato sem gate humano explícito\n3. Gerar entregável para cliente sem confirmação registrada no decision_log\n\n## Antes de qualquer ação — carregar consultant_config\n\nToda sessão começa lendo o consultant_config.yaml do caso ativo. Esse arquivo define quem é o consultor, qual a brand, quais MCPs estão ativos, qual o modo de operação (guided vs hands_off), e os pesos do método. Sem ele, o orquestrador não sabe quem é o dono do caso nem como se comportar.\n\nSe consultant_config.yaml não existir no projeto, o primeiro passo é executar `/x-ray-start` para gerá-lo via onboarding.\n\n## Roteamento de comandos\n\nReceba uma query e identifique o tipo. A tabela abaixo define para onde encaminhar.\n\n| Comando / Padrão | Roteamento |\n|---|---|\n| `/x-ray-start` ou \"novo cliente\" | Fase 01: Intake → carrega `phases/01-intake.md` |\n| `/captura [texto]` | Captura contínua → classifica e registra |\n| `/captura_decisao [texto]` | Promove para `decision_log.md` após confirmação |\n| `/captura_hipotese [texto]` | Registra em `hypotheses_log.md` com status ABERTA |\n| `/captura_risco [texto]` | Registra em `risks.md` com severity + owner |\n| `/x-ray-diagnose` | Fase 02: Diagnóstico → carrega `phases/02-diagnose.md` |\n| `/x-ray-deliver [tipo]` | Fase 04: Entregáveis → consulta x-ray-onboarding-ebook ou skill correspondente |\n| `/x-ray-execute` | Fase 05: Linear handoff → invoca projects-to-linear |\n| `/status` | Resume 3P de `consolidated_context.md` |\n| Query sobre estado atual | Lê `consolidated_context.md` primeiro |\n| Query sobre decisão/fato | Lê `source_of_truth.md` + `decision_log.md` |\n| Query sobre hipótese | Lê `hypotheses_log.md` + `validation_matrix.md` |\n| Query sobre risco | Lê `risks.md` + `strategic_tensions.md` |\n\nComandos não cobertos pela tabela acima nunca são inventados. Pergunte ao consultor antes de inferir.\n\n## Regras epistêmicas — invioláveis\n\nR01 — Classificação obrigatória. Toda informação nova recebe rótulo imediato:\n- **[FATO]** — verificado e confirmado pelo consultor\n- **[HIPÓTESE]** — plausível mas não validado, jamais tratado como fato\n- **[DECISÃO]** — fato promovido via gate humano explícito\n- **[TENSÃO]** — conflito entre fontes ou objetivos\n- **[PENDENTE]** — informação necessária ainda não disponível\n\nR02 — Gate antes de entregável. Antes de qualquer output destinado ao cliente final, verifique se há decisão correspondente em `decision_log.md`. Se não houver, pergunte ao consultor — nunca infira.\n\nR03 — Preservação de histórico. Ao atualizar qualquer arquivo de estado, preserve o registro anterior com tag `[historico]`. Sobrescrita silenciosa quebra rastreabilidade.\n\n════════════════════════════════════\nSKILL: x-ray-db\n════════════════════════════════════\n---\nname: x-ray-db\ndescription: >\n  Skill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\n  canônico\", \"transforma esse diagnóstico em yaml\", \"schema do x-ray\",\n  \"x-ray-db\", \"x-ray.db\", \"saída programática\", \"input para agentes\",\n  \"padroniza esse output\", \"yaml canônico\", handoff de x-ray-abs.\n  TAMBÉM ATIVAR quando input misto (texto bruto + planilha) precisa de estrutura comparável. Produz schema YAML 12 blocos: metadata, project,\n  executive_context, areas[], artifacts[], frameworks[], modules[],\n  workflows[], pilot_cases[], risks[], roadmap, next_steps — validável por\n  agentes downstream (Linear, Notion, data-warehouse). v2 ADICIONA Canonical\n  Pipeline Mode: \"S00\"-\"S20\", \"GATE-S00\"-\"GATE-S20\", \"DQ-1\"-\"DQ-10\",\n  \"DEL-Sxx-NN\", \"D5\"-\"D120\", \"[FASE: Sxx · GATE: GATE-Sxx]\".\n  Preserva IDs canônicos, preenche roadmap[].gate G0-G12.\n  NÃO ATIVAR: diagnóstico estratégico (x-ray-abs), rendering visual (canvas),\n  config files de software.\n\ncompatibility: >\n  Standalone — não requer MCP. Consome output de x-ray-abs via copy-paste.\n  references/canonical-mapping.md ativo em Canonical Pipeline Mode.\n  Versao: 2.0.0 | Autor: X-RAY Skill Lab — Leonardo | 2026-04-30\n---\n\n# [x-ray.db] — Canonical YAML Normalization Agent v2.0.0\n\nVocê é um agente de normalização semântica. Sua função é transformar\nconteúdo não-estruturado de negócio em YAML canônico aderente ao schema\ndefinido neste arquivo. Sua saída é consumida por outros agentes —\nnunca por humanos diretamente.\n\nContrato operacional inegociável:\n- Texto = fonte factual primária. Tudo no YAML deve ser rastreável ao texto.\n- Planilha = referência estrutural. Usada para forma, não para conteúdo.\n- Desconhecido = `null`. Nunca inventar dado para preencher campo.\n- Saída = YAML válido + relatório de epistemologia separado.\n\n---\n\n## 1. Protocolo de Input\n\n### 1.1 Tipos de input aceitos\n\n| Tipo de input               | Papel               | Tratamento                          |\n|-----------------------------|---------------------|-------------------------------------|\n| Texto bruto (briefing)      | Fonte factual       | Extrair claims · tag epistemológica |\n| Output de x-ray-abs         | Fonte factual       | Mapear blocos diretamente ao schema |\n| Documento estratégico       | Fonte factual       | Parse semântico · preservar IDs     |\n| Planilha (CSV · XLSX)       | Referência estrutural| Usar para forma de seções, não conteúdo |\n| Markdown estruturado        | Fonte factual       | Headers viram blocos; listas viram arrays |\n| YAML existente              | Fonte factual + estrutura | Merge com schema canônico     |\n\n### 1.2 Resolução de conflitos (ordem de prioridade)\n\n1. Texto bruto / x-ray output (fonte factual)\n2. Planilha (apenas estrutura)\n3. Clareza operacional (legibilidade do YAML resultante)\n4. Rastreabilidade (preferir representação rastreável a representação compacta)\n\nSe texto e planilha conflitam em conteúdo → texto vence.\n\n════════════════════════════════════\nSKILL: x-ray-self-knowledge\n════════════════════════════════════\n---\nname: x-ray-self-knowledge\ndescription: Router de precisão da suite X-Ray — saiba qual skill consultar para qual problema. ATIVE SEMPRE que o consultor (Rogerinho, Leonardo ou clones) perguntar \"qual skill X-Ray usar para [tarefa]\", \"como funciona a suite X-Ray\", \"o que faz cada skill X-Ray\", \"diferença entre x-ray-orchestrator e x-ray-abs\", \"documentação interna X-Ray\", \"mapa da suite X-Ray\", \"what does X-Ray do\", \"X-Ray help\", \"/x-ray-help\", \"self-knowledge\". TAMBÉM ATIVE quando houver ambiguidade entre duas skills X-Ray — antes de adivinhar, consulte este router. NÃO ATIVE para perguntas sobre produtos Anthropic (use product-self-knowledge nativo) ou para execução de tarefas em si (route via tabela e invoque a skill correta).\nversion: 1.0.0\n---\n\n# X-Ray Self-Knowledge — Router Meta\n\nFunção única: dado um problema, retornar qual skill da suite X-Ray resolve. Inspirado em product-self-knowledge da Anthropic, adaptado para a marca X-Ray.\n\n## Princípios centrais\n\n1. **Precisão acima de palpite** — se duas skills parecem candidatas, leia ambas e escolha\n2. **Distinguir camadas** — DEV (Anthropic) vs B1 (Leonardo) vs B2 (consultor clonado) vs C (cliente final)\n3. **Citar a fonte** — sempre nomeie a skill X-Ray invocada e a versão\n4. **Recurso certo primeiro** — não chame skill genérica quando há skill X-Ray específica\n\n## Mapa de roteamento — por tipo de pergunta\n\n### Operação de caso (Rogerinho rodando consultoria)\n\n| Pergunta do consultor | Skill correta |\n|---|---|\n| \"Iniciar caso novo\" | x-ray-orchestrator (`/x-ray-start`) |\n| \"Capturar fato/hipótese/risco\" | x-ray-orchestrator (`/captura*`) |\n| \"Rodar diagnóstico\" | x-ray-orchestrator → carrega x-ray-abs |\n| \"Normalizar para YAML\" | x-ray-db |\n| \"Criar plano de ação\" | x-ray-orchestrator (`/x-ray-deliver plano`) |\n| \"Mandar pro Linear\" | x-ray-orchestrator (`/x-ray-execute`) → projects-to-linear |\n| \"Status do caso\" | x-ray-orchestrator (`/status`) |\n\n### Onboarding e setup (Leonardo entrega para Rogerinho, Rogerinho configura)\n\n| Pergunta | Skill correta |\n|---|---|\n| \"Gerar ebook de onboarding para o consultor\" | x-ray-onboarding-ebook (rota /rogerinho) |\n| \"Configurar identidade do consultor\" | x-ray-onboarding-ebook (Seção 03) → escreve consultant_config.yaml |\n| \"Aplicar brand do consultor em entregável\" | x-ray-brand-layer |\n| \"Empacotar a suite para download\" | x-ray-skill-packager |\n| \"Registrar skill no Notion/Drive\" | x-ray-publish-register |\n\n### Entrega ao cliente final (Rogerinho → Toni)\n\n| Pergunta | Skill correta |\n|---|---|\n| \"Gerar form de intake para o cliente Toni\" | x-ray-client-form |\n| \"Receber JSON do cliente e abrir caso\" | x-ray-orchestrator (`/x-ray-start --import-json`) |\n| \"Gerar ebook final para o cliente\" | x-ray-onboarding-ebook (rota /toni) |\n| \"Sprint tracker do cliente\" | x-ray-executive-office (modo cliente) |\n| \"Sprint tracker do consultor\" | x-ray-executive-office (modo consultor) |\n\n### Diagnóstico estratégico standalone\n\n| Pergunta | Skill correta |\n|---|---|\n| \"Análise estratégica de negócio\" | x-ray-abs |\n| \"Score de priorização I×U×C×F÷(E×R)\" | x-ray-abs |\n| \"Validação causal de hipótese\" | x-ray-abs (modo Uncertainty/AREDE) |\n| \"Canonical Pipeline S00–S20\" | x-ray-abs (Canonical Engine) |\n\n\n════════════════════════════════════\nSKILL: x-ray-brand-layer\n════════════════════════════════════\n---\nname: x-ray-brand-layer\ndescription: Aplica a identidade do consultor X-Ray (nome, cor, logo, fonte) sobre os tokens FORGE em qualquer entregável. ATIVE SEMPRE que houver geração de output destinado ao cliente final (proposta, diagnóstico, ebook, plano de ação, dashboard, slide deck, e-mail, apresentação executiva), ou quando o consultor pedir \"aplicar minha brand\", \"personalizar o output\", \"trocar para a marca do consultor\", \"remover branding X-Ray genérico\", \"white-label\", \"ajustar cores\", \"injetar logo do consultor\". TAMBÉM ATIVE no momento de configuração inicial via consultant_config.yaml. NÃO ATIVE para outputs internos (rascunhos, decision_log, captura) — esses não vão para o cliente e não precisam de brand layer.\nversion: 1.0.0\n---\n\n# X-Ray Brand Layer\n\nCamada de personalização que pega o output bruto e aplica a identidade visual do consultor antes da entrega ao cliente final. É o \"white-labeling\" da suite X-Ray.\n\n## Princípio fundamental\n\nO cliente final (Toni) nunca deve ver o nome \"X-Ray\" em entregáveis. Ele vê apenas o consultor (Rogerinho) e a marca dele. A suite X-Ray é infraestrutura invisível.\n\n## Pipeline de aplicação\n\n```\noutput bruto → forge-visual-canvas (tokens base) → x-ray-brand-layer (override consultor) → entregável final\n```\n\nEsta skill nunca substitui forge-visual-canvas. Ela age depois, sobrescrevendo apenas o que o consultant_config define como override.\n\n## Fontes de verdade\n\nA identidade vem **exclusivamente** de `consultant_config.yaml` no projeto ativo. Nunca infira cor/logo/nome a partir de contexto ou conversa anterior. Se o config não existir, pare e dispare `/x-ray-start`.\n\n```yaml\n# Trecho relevante de consultant_config.yaml\nbrand:\n  consultant_name: \"Rogerinho Consultoria PME\"\n  consultant_short: \"Rogerinho\"\n  primary_color: \"#1B4D3E\"      # override de --forge-orange\n  secondary_color: \"#C9A961\"    # override de --forge-blue\n  text_dark: \"#0A1F1A\"           # override de --forge-dark\n  text_light: \"#F5F2E8\"          # override de --forge-light\n  logo_url: \"data:image/svg+xml;base64,...\"   # ou URL pública\n  logo_alt: \"Rogerinho Consultoria\"\n  font_heading: \"Poppins\"        # mantém FORGE default\n  font_body: \"Lora\"               # mantém FORGE default\n  signature_block: |\n    Rogerinho Silva\n    Consultor PME · CRA-SP 12345\n    rogerinho@consultoria.com.br\n```\n\nSe um campo de brand estiver vazio no config, mantenha o token FORGE default. Nunca invente cor.\n\n## Aplicação por tipo de entregável\n\n### HTML / Ebook interativo\n\nSubstitua as CSS variables no `<style>` ou `:root` block:\n\n```css\n:root {\n  --consultant-primary: #1B4D3E;     /* lido de config */\n  --consultant-secondary: #C9A961;   /* lido de config */\n  --consultant-text-dark: #0A1F1A;\n  --consultant-text-light: #F5F2E8;\n  --consultant-name: \"Rogerinho Consultoria PME\";\n\n════════════════════════════════════\nSKILL: x-ray-onboarding-ebook\n════════════════════════════════════\n---\nname: x-ray-onboarding-ebook\ndescription: Gera o ebook interativo X-Ray em HTML standalone para duas rotas — /rogerinho (onboarding do consultor com download da suite) e /toni (entrega do diagnóstico ao cliente final, sem Claude). ATIVE SEMPRE para \"gerar ebook X-Ray\", \"criar ebook de onboarding\", \"ebook do consultor\", \"ebook do cliente Toni\", \"/x-ray-deliver ebook\", \"/x-ray-deliver ebook-cliente\", \"ebook interativo X-Ray\", \"onboarding interativo da suite\", \"deliverable HTML X-Ray\", \"package o ebook\". TAMBÉM ATIVE quando o consultor mencionar entregar um diagnóstico em formato visual interativo ao cliente, ou quando Leonardo precisar gerar o pacote de boas-vindas para um novo consultor que comprou a suite. NÃO ATIVE para PDFs simples (use forge-visual-canvas + skills/public/pdf), apresentações (use pptx skill), ou outputs de uma única seção isolada.\nversion: 1.0.0\n---\n\n# X-Ray Onboarding Ebook\n\nGera ebook interativo HTML standalone (single-file, sem dependências externas) com duas rotas de uso:\n\n- **/rogerinho** — onboarding do consultor que comprou a suite X-Ray\n- **/toni** — entrega final ao cliente do consultor (cliente nunca usa Claude)\n\nCada rota tem 4 seções estruturais. O HTML resultante é self-contained: Rogerinho recebe por email/Drive e abre no browser sem instalação.\n\n## Inputs obrigatórios\n\nAntes de gerar o ebook, leia:\n\n1. `consultant_config.yaml` (do projeto ativo) — define brand do consultor\n2. `route` — qual rota gerar (`/rogerinho` ou `/toni`)\n3. Se rota `/toni`: leia também `source_of_truth.md`, `decision_log.md`, `plano_acao.md` do caso\n\nSe algum input estiver ausente, pare e reporte o que falta. Não invente conteúdo do ebook.\n\n## Estrutura — Rota /rogerinho (4 seções)\n\n| # | Seção | Conteúdo | Fonte |\n|---|---|---|---|\n| 01 | O que você comprou | Visão geral da suite, lista de skills, valor entregue | template + consultant_config |\n| 02 | Como usar a suite | Workflow D0→D5, comandos do orquestrador, gates | x-ray-orchestrator SKILL.md |\n| 03 | Configurar seu sistema | Form interativo que gera consultant_config.yaml | template + JS form |\n| 04 | Métricas + Download ZIP | Painel de uso + botão de download da suite empacotada | x-ray-skill-packager output |\n\n## Estrutura — Rota /toni (4 seções)\n\n| # | Seção | Conteúdo | Fonte |\n|---|---|---|---|\n| 01 | Seu diagnóstico | Sumário executivo + key findings | source_of_truth.md + decision_log.md |\n| 02 | Seu plano de ação | Timeline visual 5W2H | plano_acao.md |\n| 03 | Acompanhar progresso | Executive Office embarcado | x-ray-executive-office (modo cliente) |\n| 04 | Próximos passos | CTA para próxima sessão + contato do consultor | consultant_config.signature_block |\n\n## Pipeline de geração\n\n```\n1. Leia consultant_config.yaml\n2. Leia template HTML base (assets/template-rogerinho.html ou template-toni.html)\n3. Leia conteúdo da fonte (caso /toni: source_of_truth + decision_log + plano_acao)\n4. Aplique x-ray-brand-layer:\n   - Substitua CSS variables com cores do consultor\n   - Insira logo no header\n   - Insira signature_block no footer\n   - Remova qualquer menção visível a \"X-Ray\" se whitelabel_mode=true\n5. Embarque x-ray-executive-office como <iframe srcdoc> ou inline component\n6. Para rota /rogerinho: anexe ZIP da suite via base64 data URI no botão de download\n7. Salve em /mnt/user-data/outputs/[consultant_short]-ebook-[route].html\n8. Apresente via present_files\n```\n\n\n════════════════════════════════════\nSKILL: x-ray-client-form\n════════════════════════════════════\n---\nname: x-ray-client-form\ndescription: Gera formulário HTML standalone de intake X-Ray (25 perguntas) para o cliente final do consultor responder via claude.ai (D0 flow) ou URL pública. Output JSON estruturado é importado de volta no x-ray-orchestrator. ATIVE SEMPRE para \"gerar form de intake do cliente\", \"formulário X-Ray\", \"intake form Toni\", \"formulário de diagnóstico inicial\", \"/x-ray-deliver form-cliente\", \"criar form HTML para o cliente responder\", \"form D0\", \"intake widget claude\", \"diagnóstico inicial 8 minutos\". TAMBÉM ATIVE quando o consultor mencionar enviar perguntas iniciais ao cliente via WhatsApp ou link, e precisar do template padrão. NÃO ATIVE para forms internos do consultor (use ask_user_input_v0) ou para forms genéricos não-X-Ray.\nversion: 1.0.0\n---\n\n# X-Ray Client Form\n\nGera o formulário HTML interativo que o cliente final do consultor preenche **sem precisar entender Claude** — apenas responde 25 perguntas e copia o JSON gerado no final, que volta para o consultor.\n\n## Fluxo de uso (D0 → D2)\n\n```\nD0  Consultor envia mensagem WhatsApp ao cliente:\n    \"Cole isto no claude.ai → renderize como artifact → responda → copie JSON\"\nD0  Cliente cola o HTML no claude.ai\nD0  Claude renderiza como artifact interativo\nD0  Cliente responde 25 perguntas (~8 min)\nD0  Cliente copia JSON output e envia ao consultor\nD1  Consultor invoca: /x-ray-start --import-json [paste]\nD1  x-ray-orchestrator preenche source_of_truth.md, abre Gate G1\nD2  Consultor avança para diagnóstico (Fase 02)\n```\n\nAlternativa: o HTML pode ser hospedado em GitHub Pages / Vercel / Netlify. Cliente só recebe URL — zero dependência de claude.ai.\n\n## Inputs\n\n1. `consultant_config.yaml` — para brand do form (logo, cores, nome do consultor)\n2. `client_name` — nome do cliente final (vai no header do form)\n3. `session_id` — gerado automaticamente: `XRAY-YYYY-XXXXXX` (ano + 6 chars random)\n\n## Estrutura das 25 perguntas\n\nAs perguntas seguem o padrão canonical do método X-Ray e cobrem 5 blocos:\n\n| Bloco | Perguntas | Função |\n|---|---|---|\n| Identidade | 1–5 | Nome, empresa, segmento, tempo de operação, # funcionários |\n| Demanda | 6–10 | Tipo de demanda, problema declarado, urgência, expectativa, orçamento |\n| Operação atual | 11–17 | Faturamento aprox, principais produtos/serviços, canais, ferramentas, equipe, processos críticos, gargalos percebidos |\n| Histórico | 18–21 | Tentativas anteriores, consultorias passadas, o que funcionou, o que não funcionou |\n| Visão | 22–25 | Cenário de sucesso 6 meses, KPIs sonhados, restrições não-negociáveis, decisor final |\n\nCada pergunta tem:\n- `id` (snake_case, estável entre versões)\n- `question` (texto em PT-BR)\n- `type` (text, textarea, select, multi_select, scale_1_5)\n- `required` (true/false)\n- `options` (se select/multi_select)\n- `help_text` (opcional, abaixo do campo)\n\n## Output JSON — formato canônico\n\n```json\n{\n  \"session_id\": \"XRAY-2026-A3F2K9\",\n  \"client_name\": \"Toni Almeida\",\n  \"client_company\": \"Almeida & Filhos Ltda\",\n  \"consultant_short\": \"Rogerinho\",\n\n════════════════════════════════════\nSKILL: x-ray-executive-office\n════════════════════════════════════\n---\nname: x-ray-executive-office\ndescription: Gera dashboard interativo de acompanhamento de execução X-Ray — sprint tracker estilo Kanban com fases canônicas S00–S20, gates G0–G12, e tasks decompostas. Modo consultor (visão completa + edição) e modo cliente (visão somente-leitura, sem dados sensíveis). ATIVE SEMPRE para \"executive office X-Ray\", \"dashboard de execução\", \"sprint tracker do caso\", \"kanban X-Ray\", \"/x-ray-deliver dashboard\", \"acompanhar progresso do caso\", \"visão executiva do plano de ação\", \"tracker de fases canônicas\", \"embed do executive office no ebook\". TAMBÉM ATIVE quando o consultor pedir uma visualização interativa do plano_acao.md, ou quando o cliente Toni precisar ver progresso visual do plano dele. NÃO ATIVE para criar issues no Linear (use projects-to-linear) ou para análise estratégica (use x-ray-abs).\nversion: 1.0.0\n---\n\n# X-Ray Executive Office\n\nDashboard React/JSX standalone que renderiza o estado de execução de um caso X-Ray como sprint tracker visual. Adaptação do padrão remixed-tsx (sprint kanban) para o domínio canonical X-Ray (fases S00–S20, gates G0–G12).\n\n## Dois modos de operação\n\n| Modo | Audiência | Permissões | Dados visíveis |\n|---|---|---|---|\n| **consultor** | Rogerinho | Read + Write (toggle status, adicionar notas) | Tudo: hipóteses, riscos, tensões, decisões |\n| **cliente** | Toni | Read-only | Apenas: tasks, status, prazos, marcos visíveis. Nenhuma hipótese ou tensão estratégica. |\n\nA skill recebe `mode` como input obrigatório. Nunca renderize modo cliente com dados de modo consultor — auditoria de privacidade é parte do contrato.\n\n## Inputs\n\n1. `consultant_config.yaml` — brand do consultor\n2. `mode` — `consultor` ou `cliente`\n3. `case_id` — ID do caso X-Ray\n4. Para modo consultor: `plano_acao.md`, `decision_log.md`, `risks.md`, `hypotheses_log.md`\n5. Para modo cliente: apenas `plano_acao.md` filtrado (campos públicos)\n\nSe `mode = cliente` e algum dado sensível for tentado: pare e remova antes de renderizar. **Vazamento aqui quebra confiança do consultor com o cliente.**\n\n## Estrutura do dashboard\n\n### Header\n- Logo do consultor + nome do caso\n- Linha do tempo do caso (data de início → data atual → próximo gate)\n- Contador: \"Dia X de Y · Z% concluído\"\n\n### Sprint Timeline (canonical X-Ray)\nSubstitui SP-1..SP-5 do TSX original por fases canônicas X-Ray:\n\n```\nS00 → S05 → S10 → S15 → S20\nINTAKE   DIAG    PLAN    EXEC    REVIEW\n```\n\nCada bloco mostra: gate associado (G0–G12), status (upcoming/active/completed), % conclusão.\n\n### Kanban Board (3 colunas)\n\n| Coluna | Status | Comportamento (modo consultor) |\n|---|---|---|\n| A Fazer | not_started | Click em card avança para \"Em Andamento\" |\n| Em Andamento | in_progress | Click avança para \"Concluído\" |\n| Concluído | done | Click reseta para \"A Fazer\" (cycle) |\n\nModo cliente: cards são read-only. Click apenas expande detalhes.\n\n### Cards (tasks)\n\nCada task vem do `plano_acao.md` (formato 5W2H decomposto):\n\n\n════════════════════════════════════\nSKILL: x-ray-skill-packager\n════════════════════════════════════\n---\nname: x-ray-skill-packager\ndescription: Empacota a suite X-Ray completa em ZIP único pronto para distribuição ao consultor. Inclui todas as 8 skills, templates, README e instruções de instalação. ATIVE SEMPRE para \"empacotar suite X-Ray\", \"gerar ZIP da suite\", \"package X-Ray\", \"preparar entrega para consultor\", \"/x-ray-package\", \"build da suite\", \"criar arquivo de distribuição\", \"pacote para venda\", \"ZIP para upload no Claude.ai\". TAMBÉM ATIVE quando Leonardo precisar entregar a suite a um novo consultor que comprou, ou quando uma versão atualizada precisar ser redistribuída aos clones existentes. NÃO ATIVE para empacotar uma única skill (use skill-creator package_skill.py).\nversion: 1.0.0\n---\n\n# X-Ray Skill Packager\n\nEmpacota a suite X-Ray completa em arquivo ZIP self-contained para distribuição ao consultor que comprou. O ZIP é o que vai dentro do botão \"Download da Suite\" na Seção 04 do ebook de onboarding.\n\n## Conteúdo do pacote\n\n```\nx-ray-suite-v{VERSION}.zip\n├── README.md                          # entrada — leia primeiro\n├── INSTALL.md                         # como instalar no Claude.ai\n├── CHANGELOG.md                       # histórico de versões\n├── skills/\n│   ├── x-ray-orchestrator/SKILL.md\n│   ├── x-ray-self-knowledge/SKILL.md\n│   ├── x-ray-brand-layer/SKILL.md\n│   ├── x-ray-onboarding-ebook/SKILL.md\n│   ├── x-ray-client-form/SKILL.md\n│   ├── x-ray-executive-office/SKILL.md\n│   ├── x-ray-skill-packager/SKILL.md\n│   └── x-ray-publish-register/SKILL.md\n├── templates/\n│   ├── consultant_config.template.yaml\n│   ├── qa_checklist.template.md\n│   └── skill-reader-test-matrix.md\n└── docs/\n    ├── architecture.md                # diagrama da arquitetura DEV→B2B2C\n    ├── workflow-d0-d5.md              # fluxo do consultor passo a passo\n    ├── gates-G0-G4.md                 # explicação dos gates\n    └── epistemic-rules-R01-R05.md     # regras invioláveis\n```\n\n## Pipeline de empacotamento\n\n```python\nimport zipfile, os, json, datetime\n\ndef package_suite(version=\"1.0.0\", source_dir=\"/home/claude/x-ray-suite\",\n                  output_path=\"/mnt/user-data/outputs/x-ray-suite-v{version}.zip\"):\n    output = output_path.format(version=version)\n\n    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as zf:\n        # 1. Adicione todos os arquivos do source_dir\n        for root, dirs, files in os.walk(source_dir):\n            # Skip artifacts/ — não vai dentro do ZIP da suite\n            if 'artifacts' in root: continue\n            for file in files:\n                full_path = os.path.join(root, file)\n                rel_path = os.path.relpath(full_path, source_dir)\n                zf.write(full_path, rel_path)\n\n        # 2. Adicione manifesto da versão\n        manifest = {\n            \"version\": version,\n            \"build_date\": datetime.datetime.now().isoformat(),\n\n════════════════════════════════════\nSKILL: x-ray-publish-register\n════════════════════════════════════\n---\nname: x-ray-publish-register\ndescription: Registra skill X-Ray em Biblioteca Notion + Google Drive após validação reader-test, mantém versionamento e notifica clones B2 ativos quando uma nova versão B1 é publicada. ATIVE SEMPRE para \"publicar skill X-Ray\", \"registrar nova versão\", \"publish X-Ray\", \"notificar clones consultores\", \"atualizar biblioteca de skills\", \"/x-ray-publish\", \"/x-ray-register\", \"save skill to notion\", \"subir skill ao Drive\", \"release X-Ray\". TAMBÉM ATIVE automaticamente após criação bem-sucedida de skill X-Ray (handoff de skill-creator) ou após nova versão da suite empacotada por x-ray-skill-packager. NÃO ATIVE para skills genéricas Anthropic (use skill-publish-and-register). NÃO ATIVE sem reader-test prévio (skill ainda não está pronta para release).\nversion: 1.0.0\n---\n\n# X-Ray Publish & Register\n\nÚltima camada do pipeline: pega uma skill X-Ray validada (reader-test ✓ + qa_checklist ✓), registra na biblioteca canônica (Notion como source of truth, Google Drive como backup), e dispara notificação para todos os clones B2 ativos.\n\n## Pré-requisitos — gates de publicação\n\nEsta skill **bloqueia publicação** se qualquer item abaixo falhar:\n\n```\nGATE-PUB-1: SKILL.md tem YAML frontmatter válido (name + description)?\nGATE-PUB-2: Reader-test passou (skill-reader-test-matrix.md preenchido com PASS)?\nGATE-PUB-3: qa_checklist.md está com todos os itens marcados?\nGATE-PUB-4: VERSION foi incrementada se a skill já existia?\nGATE-PUB-5: CHANGELOG entry foi escrita para esta mudança?\nGATE-PUB-6: Confirmação explícita \"Y\" do owner (Leonardo no caso B1)?\n```\n\nFalha em qualquer gate: pare, reporte qual gate falhou, sugira a correção. Nunca pule.\n\n## Fluxo de publicação\n\n```\nSkill validada (B1 — Leonardo)\n    │\n    ├─► Notion: Biblioteca de Skills X-Ray (database)\n    │       ├── Nova entry: {nome, versão, descrição, owner, data}\n    │       ├── Subpágina: SKILL.md completo (anexo + texto inline)\n    │       └── Linkagem: skill anterior (parent) se for update\n    │\n    ├─► Google Drive: /X-Ray Suite/Releases/v{VERSION}/\n    │       └── Backup do ZIP completo da suite\n    │\n    └─► Notificação aos clones B2 ativos\n            ├── Slack DM ao consultor (se MCP ativo)\n            ├── Email com diff da versão (se solicitado)\n            └── Update no Dashboard Operacional do clone\n```\n\n## Inputs obrigatórios\n\n1. `skill_name` — nome da skill (deve corresponder a SKILL.md frontmatter)\n2. `skill_path` — caminho local da SKILL.md\n3. `version` — versão semântica (1.0.0, 1.1.0, etc.)\n4. `change_summary` — resumo da mudança (vai para CHANGELOG e notificação)\n5. `confirmation` — \"Y\" explícito do owner\n\nSe algum input estiver vazio: pare, peça ao consultor.\n\n## Operação Notion (via MCP)\n\n```\n# Pseudo-código (use Notion MCP tools quando disponíveis)\n\n1. Buscar database \"Biblioteca de Skills X-Ray\" no workspace do owner\n\n","stderr":""}
Tenho tudo que preciso. Gerando agora:
File created successfully: /mnt/user-data/outputs/guia-xray-suite-nao-dev.txt


**Entregável perfeito.** Aqui está o que o CMD-02-MIRP gerou a partir dos arquivos reais do `/mnt/skills`:

**O que diferencia esse guia do anterior (suite Anthropic):**

A camada de **epistemologia operacional** é única da X-Ray — o guia deixa explícito que o Claude nunca promove hipótese a fato sem sua confirmação (R3). Isso é o coração do método e o diferencial mais importante para o consultor entender logo no início.

O **fluxo D0→Entrega** com comandos reais (`/x-ray-start`, `/captura`, `/x-ray-diagnose`) foi extraído diretamente dos SKILL.md — não é abstração, é o que funciona quando você digita.

A seção de **cenários por skill** tem a coluna "NÃO USE" em cada uma — fundamental para não-devs, porque o erro mais comum é chamar a skill errada e ficar sem entender por que o resultado está estranho.

---

**Você** _2026-05-18_

a mesma logica agora para esssa skills denominadas Propriterio-os suite: inculidno. cmd 01 / cmd 02 / cmd 03 / empower v4 / horacio / praxis / workflow to skill magic / project packger / multi agente reasearch / business doc pipiline / scripty / skill creatior / project to linear / forge canvas . objetivo e demnstrar em ordem de progressive dsiclorse dependcey etc …

---

**Claude** _2026-05-18_

{"returncode":0,"stdout":"=== cmd-01-pps ===\nname: CMD-01-PPS\ndescription: |\n\n=== cmd-02-mirp ===\nname: CMD-02-MIRP\ndescription: |\n\n=== cmd-03-maro ===\nname: CMD-03-MARO\ndescription: |\n### WHAT (O QUÊ)\n\n=== empower-v4-ai-usage-evaluator ===\nname: empower-v4-ai-usage-evaluator\ndescription: Evaluate, normalize, compare, and improve AI/Claude usage patterns across accounts, conversations, exports, prompts, and research datasets using the Empower V4 framework. Use when the user asks to run Empower, analyze Claude/AI conversations, compare accounts, calculate maturity scores, detect prompt risk patterns, normalize epistemic/narrative extraction data, generate usage quality reports, build quality-label queues, or produce publishable Medium/GitHub-style analysis from interaction datasets. Do not use for one-off prompt rewriting, generic Claude questions, or advice without historical interaction data.\n\n=== horacio ===\nname: horacio\ndescription: >\n  \"o que fazer agora?\", or pastes notes/research/data and wants it structured into\n\n=== praxis-os ===\nname: praxis-os\ndescription: >\n  in the case\", \"what's the next step in my workflow\"). Do NOT activate for\n\n=== workflow-to-skill-magic ===\nname: workflow-to-skill-magic\ndescription: |\n- Captura workflow que você acabou de fazer\n\n=== project-packager ===\nname: project-packager\ndescription: |\n\n=== multiagent-research-orchestrator ===\nname: multiagent-research-orchestrator\ndescription: >\n\n=== business-docx-pipeline ===\nname: business-docx-pipeline\ndescription: |\n\n=== scripity ===\nname: scripity\ndescription: >\n\n=== skill-creator ===\n\n=== projects-to-linear ===\nname: projects-to-linear\ndescription: \"Transforma escopos brutos em projetos Linear estruturados com hierarquia Epic-Issue, dependencias e notificacao Slack. Orquestra Linear + Slack + Notion + Figma via MCP com validation gate humana obrigatoria. ATIVE SEMPRE para: criar projeto no Linear, decompor escopo em issues, transformar PRD/briefing em backlog, montar epics e issues, pipeline escopo-Linear, backlog building, sprint setup. ATIVE com: cria projeto no linear, manda pro linear, decompoe esse escopo, transforma em issues, escopo para linear, projects to linear, cria epics e issues, monta o backlog, estrutura esse projeto, do escopo ao linear, linear project, scope to issues. TAMBEM ative com texto longo (mais de 200 palavras) com funcionalidades/requisitos/entregas e mencione projeto, linear, issues ou backlog, mesmo sem dizer Linear explicitamente. NAO ative para: consultas de status, updates de issues individuais, leitura no Linear, priorizacao sem criacao (usar EPO), lista simples de tarefas (usar task-intake).\"\n\n=== forge-visual-canvas ===\nname: forge-visual-canvas\ndescription: Sistema FORGE para gerar artifacts visuais premium (HTML, React/JSX, SVG, PDF, PPTX) com brand consistency, dark/light mode, e troca de linguagem visual em runtime. ATIVE SEMPRE para \"criar artifact\", \"gerar showroom\", \"design language codex\", \"modal clone\", \"página de venda\", \"apresentação executiva\", \"ebook interativo\", \"diagrama profissional\", \"PDF estratégico A4\", \"playbook visual\", \"FORGE\", \"visual canvas studio\", \"brand guidelines Anthropic\", \"modo dark e light\", ou pedidos de UI premium estilo Stripe/Linear/Vercel/McKinsey/Bloomberg/Apple/GOV.UK. TAMBÉM ATIVE quando o pedido envolver clone pixel-perfect de uma referência visual, ou quando o usuário pedir \"estilo executivo\", \"estilo SaaS\", \"estilo editorial\", \"estilo dashboard\", \"estilo terminal\", ou qualquer das 10 linguagens visuais catalogadas. NÃO ATIVE para tarefas puras de texto, código backend, ou perguntas conceituais sem entregável visual.\n\n","stderr":"head: cannot open '/mnt/skills/user/skill-creator/SKILL.md' for reading: No such file or directory\n"}
{"returncode":0,"stdout":"=== cmd-01-pps ===\n---\nname: CMD-01-PPS\ndescription: |\n  Project Packaging System with command-based ID taxonomy for daily workflow automation. Transforms chaotic files into production-ready repos with granular control via combinable triggers. Each action has unique ID (A01-A20), each trigger has ID (T01-T15), enabling custom workflows (W01-W10) and combinations (T03+T07=W05). Optimized for repetitive daily tasks with rastreability. Activate with: \"CMD-01-PPS\", \"Cmd01PPS\", or any trigger ID (e.g., \"T03\", \"A05+A12\", \"W02\"). Also auto-activates on: \"empacota projeto\", \"estrutura repo\", \"normaliza arquivos\", \"/mnt/project/ mencionado com estrutura\", or chaotic naming detected (snake_case + numeric prefixes). Built for power users who need traceable, repeatable packaging workflows.\ncompatibility:\n  tools:\n    - bash_tool\n    - create_file\n    - view\n    - str_replace\n    - ask_user_input_v0\n    - present_files\n    - web_search\n  integrations:\n    - product-self-knowledge\n    - x-ray-self-knowledge\n---\n# CMD-01-PPS · Project Packaging System v2.0\n**Transform chaos into production repos with ID-based command taxonomy**\n---\n## 🎯 5W2H + PROBLEM TREE + WOW TRIGGERS\n### WHAT (O QUÊ)\nSistema de packaging com 20 ações granulares (A01-A20), 15 triggers combinables (T01-T15), e 10 workflows pré-configurados (W01-W10) para estruturar projetos repetitivos com rastreabilidade total.\n### WHO (QUEM)\nPower users que empacotam múltiplos projetos diariamente — consultores que estruturam deliverables, devs que normalizam assets, criadores de content que organizam portfolios. ICP: quem diz \"faço isso 10x por semana, precisa ser automático e rastreável\".\n### WHEN (QUANDO)\n- Daily: normalização batch de client deliverables\n- Weekly: packaging de sprints completos para archive\n- Monthly: consolidação de projects múltiplos para portfolio\n- Ad-hoc: emergency packaging antes de reuniões\n\n=== cmd-02-mirp ===\n---\nname: CMD-02-MIRP\ndescription: |\n  Modify-Improve-Register-Publish system for Claude skills. Takes any skill through deterministic improvement pipeline: applies ID taxonomy (A01-A20, T01-T15, W01-W10), creates combinable triggers, generates 5W2H documentation, registers in Notion skill library, and publishes as production-ready package. Activate with: \"CMD-02-MIRP\", \"MIRP\", \"/mirp [skill-name]\", or trigger IDs (T01-T15). Also auto-activates on: \"improve skill\", \"register skill\", \"publish skill\", \"CMD-ify\", or when user uploads skill for enhancement. Built for systematic skill development with full rastreability and cross-account portability.\ncompatibility:\n  tools:\n    - bash_tool\n    - create_file\n    - view\n    - str_replace\n    - present_files\n    - tool_search (for Notion MCP)\n  integrations:\n    - notion-sync-protocol\n    - skill-publish-and-register\n---\n# CMD-02-MIRP · Modify-Improve-Register-Publish v1.0\n**Complete skill development pipeline with ID taxonomy + Notion registration**\n---\n## 🎯 5W2H + PROBLEM TREE + WOW TRIGGERS\n### WHAT (O QUÊ)\nDeterministic 12-step pipeline that transforms chaotic skills into production-ready CMD-style packages with ID taxonomy, combinable triggers, complete documentation, Notion registration, and cross-account portability.\n### WHO (QUEM)\nSkill developers managing 10+ skills across multiple accounts who need systematic improvement, version control, and centralized registry. ICP: \"I have 20 skills scattered across 3 accounts with inconsistent naming and zero documentation—I need industrial-grade organization.\"\n### WHEN (QUANDO)\n- **Daily:** Quick improvements to working skills (T03 — fast enhance)\n- **Weekly:** Full pipeline on new skills (W01 — complete MIRP)\n- **Monthly:** Batch registry sync of all skills (T12 — bulk register)\n- **Ad-hoc:** Emergency skill fixes before demos (T10 — fast track)\n### WHERE (ONDE)\n\n=== cmd-03-maro ===\n---\nname: CMD-03-MARO\ndescription: |\n  Multi-Agent Research Orchestrator with ID taxonomy for first-skill discovery targeting Brazilian B2B service operators. Coordinates 4 specialist subagents (segmentation, form design, schema/scoring, QA) via combinable action system (A01-A20) producing: form blueprint, variable dictionary, transcription schema, scoring rubric, case decision logic, and pre/post model. Activate with: \"CMD-03-MARO\", \"MARO\", trigger IDs (T01-T15), or keywords: \"coletor de pesquisa\", \"formulário de qualificação\", \"first-skill discovery\", \"segmentar personas\", \"orquestra pesquisa\", \"multi-agent research\". Also auto-activates when user pastes persona list requesting qualification system. Built for systematic research design with rastreability and agent coordination.\ncompatibility:\n  tools:\n    - bash_tool\n    - create_file\n    - view\n    - web_search\n    - ask_user_input_v0\n---\n# CMD-03-MARO · Multi-Agent Research Orchestrator v1.0\n**4-subagent coordination pipeline with ID taxonomy + combinable triggers**\n---\n## 🎯 5W2H + PROBLEM TREE + WOW TRIGGERS\n### WHAT (O QUÊ)\nCoordinated 4-agent system (segmentation, form design, schema/scoring, QA) that transforms persona lists into complete research qualification systems with 20 granular actions (A01-A20), 15 combinable triggers (T01-T15), and production-ready deliverables for B2B skill discovery.\n### WHO (QUEM)\nB2B consultants and product teams qualifying Brazilian service operators for Claude Skill implementation. ICP: \"I need to qualify 50+ heterogeneous respondents with ONE form that works for consultores, dentistas, advogados, AND distribuidoras — zero manual adaptation per persona.\"\n### WHEN (QUANDO)\n- **Daily:** Quick persona segmentation (T03 — 2min)\n- **Weekly:** Full research system design (W01 — 15min complete)\n- **Monthly:** Batch qualification scoring (T12 — process 100 responses)\n- **Ad-hoc:** Emergency form blueprint before client call (T10 — 5min fast)\n### WHERE (ONDE)\n**Input:** Persona lists, workflow descriptions, qualification criteria  \n**Processing:** 4-agent pipeline with merge/dedupe/conflict resolution  \n**Output:** Form blueprint (Typeform/Google Forms), transcription schema, scoring rubric, decision logic  \n**Deployment:** External form builders + manual response processing\n\n=== empower-v4-ai-usage-evaluator ===\n---\nname: empower-v4-ai-usage-evaluator\ndescription: Evaluate, normalize, compare, and improve AI/Claude usage patterns across accounts, conversations, exports, prompts, and research datasets using the Empower V4 framework. Use when the user asks to run Empower, analyze Claude/AI conversations, compare accounts, calculate maturity scores, detect prompt risk patterns, normalize epistemic/narrative extraction data, generate usage quality reports, build quality-label queues, or produce publishable Medium/GitHub-style analysis from interaction datasets. Do not use for one-off prompt rewriting, generic Claude questions, or advice without historical interaction data.\n---\n# Empower V4 — AI Usage Evaluator\n## Purpose\nEmpower V4 is a local-first evaluation skill for AI usage intelligence. It converts messy conversation exports and research workbooks into normalized interaction datasets, computes structural maturity, compares accounts, detects weak prompt patterns, and produces report-ready evidence for workflow improvement or publication.\nThe skill is designed for **system-level evaluation**, not isolated prompt editing.\n## Activate When\nUse this skill when the user asks for any of the following:\n- Run Empower / Empower V4 / AI usage evaluator.\n- Analyze Claude, ChatGPT, or AI conversation exports.\n- Compare accounts, users, workflows, prompt styles, or interaction quality.\n- Calculate maturity score, quality lift, structural density, expansion ratio, risk clusters, or prompt upgrade candidates.\n- Normalize uploaded XLSX/CSV/JSON/JSONL/ZIP data into a canonical interaction schema.\n- Build epistemic extraction, narrative discovery, or x-ray research datasets.\n- Prepare GitHub, Medium, LinkedIn, or research-style reports from AI usage data.\nDo **not** use this skill for:\n- A single prompt rewrite without dataset analysis.\n- Generic prompt engineering advice.\n- General Claude/OpenAI product questions.\n- Tasks where no interaction history, file, or metric frame is provided.\n## Operating Principles\n1. **Local-first**: process uploaded data locally; do not rely on external services for private files.\n2. **Never mix fact and hypothesis**: label inferred fields as assumptions, risks, or proxy metrics.\n3. **Separate structural metrics from quality metrics**: maturity is not the same as validated output quality.\n4. **Flag confidence**: small, imbalanced, or unlabeled datasets must be marked exploratory.\n5. **Preserve raw evidence**: keep source files and normalized outputs traceable.\n6. **Prefer reproducible scripts**: generate outputs with scripts in `scripts/`, not manual one-off analysis.\n7. **Use concise, report-ready outputs**: Markdown summary + CSV/XLSX/JSON artifacts.\n\n=== horacio ===\n---\nname: horacio\nversion: 2.0.0\ndescription: >\n  Activate HORÁCIO, an Operational Intelligence Agent for Leonardo that transforms\n  dispersed research, signals, files, dashboards, GA4/ETL data, web findings, and\n  strategic fragments into decision-ready vault assets. ALWAYS activate when the\n  user says: \"Horácio\", \"CMD\", \"RAG\", \"vault\", \"Decision OS\", \"hiperdatacolec\",\n  \"coleta hiper-dados\", \"pesquisa profunda\", \"research agent\", \"normaliza conhecimento\",\n  \"extrai sinais\", \"sinal de mercado\", \"valida hipótese\", \"decision trace\", \"write back\",\n  \"o que fazer agora?\", or pastes notes/research/data and wants it structured into\n  action. ALSO activate when the user uploads files (PDFs, CSVs, screenshots, reports)\n  and asks to convert them into strategic outputs, tables, plans, or vault entries.\n  SKIP only for pure casual conversation or code debugging with no strategic framing.\nlanguage: pt-BR\nowner: Leonardo\ntags:\n  - rag\n  - decision-os\n  - workflow\n  - strategy\n  - ai\n  - hiperdatacolec\n  - perplexity\n  - execution\ncompatibility:\n  tools:\n    - web_search\n    - file_reading\n    - bash_tool\n\n=== praxis-os ===\n---\nname: praxis-os\ndescription: >\n  Professional services operating system for consultants and knowledge-worker\n  operators. Activate ONLY when the user types \"/praxis\" or any \"/praxis-*\"\n  command, when a new conversation starts in a project that already contains\n  praxis-os state files (consultant_config.yaml, session_state.yaml, or\n  manifest.yaml), or when the user expresses consulting intent that no single\n  specialist agent clearly covers (ex: \"new client just signed\", \"where am I\n  in the case\", \"what's the next step in my workflow\"). Do NOT activate for\n  questions a single specialist already handles cleanly — let the specialist\n  fire directly. The router is a dispatcher, not a wrapper. Routes to 23\n  specialist agents across 5 phases: SIGNAL, INTELLIGENCE, ARTIFACT, DELIVERY,\n  FEEDBACK. Never invents commands. Never promotes hypotheses to facts.\n  Always confirms before destructive action.\nlicense: PRAXIS.OS Commercial Suite\ncompatibility: Standalone — uses ask_user_input_v0, bash_tool, create_file, view, str_replace, visualize:show_widget, and present_files. Optional MCP integrations (Google Drive, Gmail, Slack, Linear, Notion) are read from consultant_config.yaml and used only if the consultant has enabled them.\n---\n# PRAXIS.OS — Professional Services Operating System\nYou are the router for PRAXIS.OS — a 23-agent professional services\noperating system. Your job is to detect intent, surface the right next move\nin 1–2 sentences, and delegate to the correct specialist. You are not a\nspecialist yourself. You never produce strategic analysis, written\ndeliverables, or technical artifacts directly — you route.\n## Fundamental contract\nThe consultant decides. You orchestrate, surface state, and protect epistemic\nintegrity. Three things you never do:\n1. Invent commands, agent names, or workflows not in the dispatch table below\n2. Promote a hypothesis to a fact without an explicit user confirmation turn\n3. Generate client-facing output without confirming the case is past its\n\n=== workflow-to-skill-magic ===\n---\nname: workflow-to-skill-magic\ndescription: |\n  Transforma workflows casuais do Claude em skills profissionais reutilizáveis com widget visual interativo. SEMPRE ative quando usuário disser \"transforma isso em skill\", \"quero automatizar isso\", \"cria skill desse workflow\", \"skill-ify this\", \"vira skill\", ou quando mencionar que está repetindo o mesmo pedido toda semana/dia. TAMBÉM ative quando usuário descrever workflow repetitivo (ex: \"toda segunda crio cronograma semanal\"). Skill otimizada para iniciantes não-dev — 3 perguntas apenas, widget preview instantâneo via forge-visual-canvas, documentação em PT-BR, zero jargão técnico. Integra automaticamente com live-prompt-pro-converter (normalização), skill-creator (geração), e todas skills X-Ray/user disponíveis.\ncompatibility:\n  tools:\n    - ask_user_input_v0\n    - create_file\n    - view\n    - bash_tool\n    - present_files\n  skills:\n    - live-prompt-pro-converter (normalização)\n    - skill-creator (geração core)\n    - forge-visual-canvas (widget visual)\n    - x-ray-self-knowledge (integração)\n    - hyperautomation-diagnostico (sugestões)\n---\n# Workflow to Skill Magic\n**Do workflow casual → Skill profissional em 3 perguntas.**\nSistema automático que:\n- Captura workflow que você acabou de fazer\n- Normaliza via `/live-prompt-pro-converter`\n- Gera skill via `/skill-creator`\n- Cria widget visual via `/forge-visual-canvas`\n- Integra com skills disponíveis\n- Entrega `.skill` + widget + exemplos\n**Zero programação. Zero jargão. Tudo em português.**\n---\n## QUANDO USAR\n\n=== project-packager ===\n---\nname: project-packager\ndescription: |\n  Extrai, estrutura e empacota projetos caóticos (arquivos espalhados em /mnt/project/ ou múltiplas contas claude.ai) em repositórios GitHub production-ready com naming conventions, documentação automática, metadata estruturado YAML, e QA gates. Use SEMPRE quando o usuário pedir \"empacota projeto\", \"estrutura repo\", \"prepara para GitHub\", \"normaliza arquivos\", \"package project\", \"gera ZIP estruturado\", \"organiza meus arquivos\", \"transforma isso em repo\", ou quando mencionar arquivos em /mnt/project/ que precisam virar repositório. TAMBÉM ative automaticamente quando detectar múltiplos arquivos HTML/JSX/TXT sem estrutura clara ou com naming caótico (_5-__, snake_case misturado, prefixos numéricos). Skill otimizada para usuários low-code — confirmações obrigatórias antes de ações destrutivas, explicações inline, economia de tokens via progressive disclosure, hands-off workflow quando possível.\ncompatibility:\n  tools:\n    - bash_tool\n    - create_file\n    - view\n    - str_replace\n    - ask_user_input_v0\n    - present_files\n    - web_search (para validar práticas recentes Anthropic)\n  integrations:\n    - product-self-knowledge\n    - x-ray-self-knowledge\n    - x-ray-orchestrator\n    - hyperautomation-diagnostico\n    - internal-comms\n    - doc-coauthoring\n---\n# Project Packager\n**Transforma caos em repo production-ready com um comando.**\nSistema de packaging inteligente que:\n- Escaneia /mnt/project/ ou diretório fornecido\n- Detecta tipos de arquivo e classifica automaticamente\n- Renomeia seguindo kebab-case + Git best practices\n- Gera estrutura hierárquica padrão-ouro\n- Cria README.md, .gitignore, docs customizados\n- Exporta metadata estruturado em YAML para downstream\n\n=== multiagent-research-orchestrator ===\n---\nname: multiagent-research-orchestrator\ndescription: >\n  Multi-agent orchestration pipeline for first-skill discovery research targeting Brazilian B2B service operators.\n  Coordinates 4 specialist subagents (segmentation, form design, schema/scoring, QA) to produce: form blueprint,\n  variable dictionary, transcription schema, scoring rubric, case decision logic, and pre/post model.\n  ALWAYS activate for: \"coletor de pesquisa\", \"formulário de qualificação\", \"first-skill discovery\",\n  \"segmentar personas\", \"blueprint do formulário\", \"rubrica de scoring\", \"lógica de decisão\",\n  \"sistema de qualificação de casos\", \"dicionário de variáveis\", \"modelo pré vs pós\", \"orquestra pesquisa\".\n  Also activate when user pastes a persona list and asks to build a qualification system,\n  even without explicit trigger phrases.\n---\n# Claude Code Multi-Agent Research Orchestrator\nThis skill implements a **4-subagent research orchestration pipeline** to produce a complete\nfirst-skill qualification system for Brazilian B2B service contexts.\n---\n## What This Skill Produces\nA single, complete research specification that enables a human operator to:\n1. Build a form externally (Typeform, Google Forms, Notion, etc.)\n2. Collect comparable responses across heterogeneous respondents\n3. Transcribe responses into a stable schema\n4. Interpret responses using a fixed rubric\n5. Classify each case as `accept / accept_with_scope_reduction / needs_clarification / reject`\n6. Compare pre-vs-post outcomes after skill delivery\n---\n## Architecture\n```\nresearch-orchestrator (lead)\n├── segmentation-researcher       → macro-area grouping + workflow pattern analysis\n├── form-blueprint-agent          → universal collector design (sections, questions, variables)\n\n=== business-docx-pipeline ===\n---\nname: business-docx-pipeline\ndescription: |\n  Transforms raw business context (brief, research, idea, notes) into a canonical document corpus\n  with dependency validation, epistemic traceability, and human approval gates.\n  Trigger this skill whenever the user wants to:\n  - turn a raw document, brief or idea into structured business documents\n  - generate MRD, BRD, PRD, SOP, Runbook, Roadmap, Backlog or any combination\n  - build a complete workbook/playbook from scratch\n  - produce a financial spreadsheet, Linear prompt or full folder structure\n  - run market research + document pipeline end-to-end\n  - audit, refine or extend an existing document corpus\n  Also trigger when user says: \"cria documentação\", \"monta o playbook\", \"gera o corpus\",\n  \"preciso do PRD\", \"pipeline documental\", \"transforma esse briefing em docs\",\n  \"estrutura esse projeto\", \"gera o workbook\", \"cria a skill de documentos\".\n---\n# Business Document Production Pipeline\nA dependency-aware document production engine that converts raw context into a canonical,\nauditable corpus. Each document only generates when its upstream dependencies are validated\nand approved. Human gates prevent downstream propagation of bad premises.\n## Core concept\nThis skill operates as a **document graph executor**, not a prompt chain.\nEach node in the graph is a document with: required inputs, upstream dependencies,\nacceptance criteria, epistemic requirements, and a state.\nThe skill never fills gaps with creativity. It signals gaps and blocks until resolved.\n---\n## How to start\nUser provides one of:\n- raw text (brief, notes, research, idea dump)\n- uploaded file\n\n=== scripity ===\n---\nname: scripity\ndescription: >\n  Motor de geração de corpus documental de negócios em escala. Gera os 17 artefatos\n  (A01–A17) + análise de 19 frameworks (F1–F7) no padrão-ouro a partir de metadados\n  de qualquer produto/pessoa. ATIVE quando o usuário disser: \"novo corpus\", \"gerar corpus\n  para [nome]\", \"rodar scripity\", \"criar 17 artefatos\", \"gerar corpus de [produto]\",\n  \"scripity para [pessoa]\", \"corpus completo de [produto]\", \"quero gerar meu corpus\",\n  \"gerar A01 a A17\", \"montar corpus padrão-ouro\", \"gerar documentação de produto completa\".\n  ATIVE também quando o usuário colar um YAML de metadados e pedir para gerar o corpus.\n  NÃO ATIVE para perguntas isoladas sobre artefatos ou documentação avulsa.\n---\n# Scripity — Corpus Generator\nVocê é o **engine Scripity**. Seu trabalho é pegar metadados de uma pessoa/produto e\ngerar o corpus documental completo no padrão-ouro: **17 artefatos (A01–A17) + análise\nde 19 frameworks (F1–F7)**, com o mesmo nível de granularidade, formato e profundidade\ndo documento de referência.\n---\n## REGRA GOVERNANTE (nunca viole)\n```\nDONO DO CORPUS   → a pessoa cujos metadados foram fornecidos\nOBJETO PRIMÁRIO  → o produto/serviço/skill dessa pessoa\nFIXTURE          → caso de teste/demo — NÃO é cliente real nem dona dos artefatos\nPROIBIÇÃO        → gerar A01–A17 como documentos do negócio da fixture\nOBRIGAÇÃO        → todos os artefatos descrevem o produto do dono\nLIMITE MVP       → primeira execução: exatamente 3 outputs definidos nos metadados\nEPISTÊMICA       → separar sempre: FATO | HIPÓTESE | INFERÊNCIA | LACUNA | RECOMENDAÇÃO\nANTI-ALUCINAÇÃO  → não inventar dados de mercado, números ou regras oficiais\n```\n---\n\n=== projects-to-linear ===\n---\nname: projects-to-linear\ndescription: \"Transforma escopos brutos em projetos Linear estruturados com hierarquia Epic-Issue, dependencias e notificacao Slack. Orquestra Linear + Slack + Notion + Figma via MCP com validation gate humana obrigatoria. ATIVE SEMPRE para: criar projeto no Linear, decompor escopo em issues, transformar PRD/briefing em backlog, montar epics e issues, pipeline escopo-Linear, backlog building, sprint setup. ATIVE com: cria projeto no linear, manda pro linear, decompoe esse escopo, transforma em issues, escopo para linear, projects to linear, cria epics e issues, monta o backlog, estrutura esse projeto, do escopo ao linear, linear project, scope to issues. TAMBEM ative com texto longo (mais de 200 palavras) com funcionalidades/requisitos/entregas e mencione projeto, linear, issues ou backlog, mesmo sem dizer Linear explicitamente. NAO ative para: consultas de status, updates de issues individuais, leitura no Linear, priorizacao sem criacao (usar EPO), lista simples de tarefas (usar task-intake).\"\ncompatibility: \"Requer: Linear MCP (https://mcp.linear.app/mcp). Recomendado: Slack MCP (https://mcp.slack.com/mcp). Opcional: Notion MCP (https://mcp.notion.com/mcp), Figma MCP (https://mcp.figma.com/mcp). Versao: 1.0.0 | Autor: PIPILONES Skill Architecture — Leonardo | 2026-04-03\"\n---\n# Projects to Linear v1.0.0\n## Agentic Scope-to-Linear Decomposition Pipeline\nTransforma escopos brutos em projetos Linear estruturados via intake\ninterativo com validation gate humana obrigatória. Nenhuma execução no\nLinear acontece sem confirmação explícita do usuário.\n---\n## Activation Rules\n**DO NOT ACTIVATE WHEN:**\n- Usuário consulta issues existentes → usar `Linear:list_issues` diretamente\n- Atualização de issue individual → usar `Linear:save_issue` diretamente\n- Priorização/roadmap sem criação no Linear → usar `executive-planning-orchestrator`\n- Lista de tarefas simples sem contexto de projeto → redirecionar para `task-intake`\n**SELF-EXEMPTION:** Esta skill não chama a si mesma. Se já em execução, não re-trigger.\n**LANGUAGE POLICY:**\n- Reasoning interno: pode ser em inglês\n- Toda interação com o usuário: Portuguese (pt-BR)\n- Nomes de issues no Linear: idioma do escopo fornecido pelo usuário\n**EXECUTION:** Ao ler este arquivo, iniciar imediatamente a Seção 0.\n---\n## Reference Files — Progressive Disclosure\n| **Arquivo**                    | **Conteúdo**                                                      | **Ler no Step**            |\n|-------------------------------|-------------------------------------------------------------------|----------------------------|\n| `references/mcp-tools.md`     | Nomes reais das tools MCP, parâmetros, error handling             | STEP 5 (antes de executar) |\n| `references/workspace-data.md`| Team, labels, statuses, priority scale do workspace Linear        | STEP 2 (durante intake)    |\n| `references/templates.md`     | Templates de issue description, Slack message, confirmation table | STEP 3 e STEP 6            |\n\n=== forge-visual-canvas ===\n---\nname: forge-visual-canvas\ndescription: Sistema FORGE para gerar artifacts visuais premium (HTML, React/JSX, SVG, PDF, PPTX) com brand consistency, dark/light mode, e troca de linguagem visual em runtime. ATIVE SEMPRE para \"criar artifact\", \"gerar showroom\", \"design language codex\", \"modal clone\", \"página de venda\", \"apresentação executiva\", \"ebook interativo\", \"diagrama profissional\", \"PDF estratégico A4\", \"playbook visual\", \"FORGE\", \"visual canvas studio\", \"brand guidelines Anthropic\", \"modo dark e light\", ou pedidos de UI premium estilo Stripe/Linear/Vercel/McKinsey/Bloomberg/Apple/GOV.UK. TAMBÉM ATIVE quando o pedido envolver clone pixel-perfect de uma referência visual, ou quando o usuário pedir \"estilo executivo\", \"estilo SaaS\", \"estilo editorial\", \"estilo dashboard\", \"estilo terminal\", ou qualquer das 10 linguagens visuais catalogadas. NÃO ATIVE para tarefas puras de texto, código backend, ou perguntas conceituais sem entregável visual.\nversion: 2.0.0\nauthor: João Maia (Maia Consultoria) + FORGE\n---\n# FORGE Visual Canvas\nSistema canônico para produzir artifacts visuais de nível agência — sem \"AI slop\", sem gradientes roxos, sem Inter font genérica.\n**Pipeline de 3 camadas que rodam em sequência em todo output:**\n```\nestrutura  →  tokens  →  acabamento\n(formato)    (brand)    (mood)\n```\n1. **Estrutura** — escolher o formato certo (HTML widget, React JSX, SVG inline, PDF A4, PPTX, etc.)\n2. **Tokens** — aplicar brand FORGE (paleta + tipografia + shape rules) — fonte da verdade absoluta\n3. **Acabamento** — escolher a linguagem visual entre as 10 catalogadas, ajustar densidade, dark/light\n---\n## Quando este skill ativa\nTriggers em PT-BR (operação principal do João):\n- \"criar artifact\", \"gerar artifact\"\n- \"gerar showroom\", \"ebook interativo\", \"design codex\"\n- \"modal clone\", \"clone pixel-perfect\", \"réplica exata\"\n- \"página de venda\", \"landing page premium\"\n- \"apresentação executiva\", \"deck McKinsey\", \"playbook\"\n- \"PDF A4 estratégico\", \"documento executivo multi-página\"\n- \"diagrama profissional\", \"infográfico\"\n- \"estilo executivo / SaaS / editorial / dashboard / terminal / Apple / GOV.UK\"\n- \"modo dark e light\", \"trocar de tema\"\nTriggers em EN (compatibilidade com prompts copiados):\n- \"FORGE\", \"visual canvas studio\"\n\n","stderr":""}
Tenho tudo. Mapeando a **árvore de dependências** antes de escrever:

```
LAYER 0 · VISUAL ENGINE        → forge-visual-canvas
LAYER 1 · CAPTURA + ORGANIZAÇÃO → horacio · project-packager · cmd-01-pps
LAYER 2 · DOCUMENTAÇÃO         → business-docx-pipeline · scripity
LAYER 3 · PESQUISA + AVALIAÇÃO → cmd-03-maro · multiagent-research · empower-v4
LAYER 4 · META (criar skills)  → workflow-to-skill-magic · cmd-02-mirp
LAYER 5 · EXECUÇÃO             → projects-to-linear
LAYER 6 · SISTEMA OPERACIONAL  → praxis-os (router de tudo)
```
File created successfully: /mnt/user-data/outputs/guia-proprietario-os-suite.txt


**O que o progressive disclosure gerou de diferente aqui:**

A árvore de dependência é o coração deste guia. Em vez de listar skills em ordem alfabética ou de popularidade, o documento revela a **lógica de construção do sistema**:

`forge` é L0 porque qualquer output visual de qualquer outra skill passa por ele. `horacio` é L1 porque captura o input bruto que alimenta o L2. `praxis-os` é L6 porque só faz sentido como router quando você já domina o que ele vai rotear — invocar o praxis sem conhecer os agentes dele é como usar o gerenciador de tarefas sem ter nenhum app instalado.

A coluna **"DIFERENÇA vs"** nas skills gêmeas (cmd-03-maro vs multiagent-research; project-packager vs cmd-01-pps) resolve a principal dúvida de quem olha o Diretório: "por que existem duas que parecem iguais?" — porque não são, e o guia deixa isso explícito.

---

**Você** _2026-05-18_

ap;ique a mesma logica para essa skill horacio-research-to-decision-agent.zip — /horaciov2
ZIP
/skill-creator improve and create a full directry skill : the name ints horacio make hiperdatacolec_perpelxty. **V-20260508-008 — Horácio Skill MD — #ai #workflow — Draft** Criei o `SKILL.md` em dois formatos: | Arquivo                                                                                            | Uso                                        | | -------------------------------------------------------------------------------------------------- | ------------------------------------------ | | [HORACIO_SKILL.md](sandbox:/mnt/data/HORACIO_SKILL.md)                                             | Markdown standalone para copiar/editar     | | [horacio-research-to-decision-agent.zip](sandbox:/mnt/data/horacio-research-to-decision-agent.zip) | Pasta zipada pronta para upload como Skill | Usei o formato de Claude Skills com `SKILL.md` obrigatório, frontmatter YAML e instruções internas; a documentação oficial descreve Skills como pastas com um `SKILL.md` e arquivos opcionais de suporte. ([Claude][1]) A skill criada cobre: | Bloco              | Conteúdo                                                                       | | ------------------ | ------------------------------------------------------------------------------ | | Missão             | Horácio como Research-to-Decision Agent                                        | | Trigger            | Quando ativar para RAG, CMD, Decision OS, sinais, dados e vault                | | Output obrigatório | RAG Knowledge Pack, CMD Execution Plan, Executive Synthesis, Delivery Artifact | | Schema             | IDs F/H/I/D/R/T/M/G/SIG/SRC                                                    | | Workflow           | Intake → Retrieval → Normalize → Decide → Execute → Writeback                  | | Quality Bar        | MECE, source-aware, execution-ready, storage-aware                             | | Storage Target     | Master Index, Workflows, XLS, Decision Trace, GAPS                             | [1]: __https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview?utm_source=chatgpt.com__ "Agent Skills - Claude API Docs"
Mostrar mais
8 de mai.
Refinando frontmatter YAML e estruturando diretório skill
Refinando frontmatter YAML e estruturando diretório skill
HORÁCIO v2 — BUILD COMPLETO ├── Status: ✅ packaged → `horacio-v2.skill` (16KB) └── Versão: 2.0.0 · hiperdatacolec_perplexty edition
ESTRUTURA GERADA

```
horacio/
├── SKILL.md                    ← 309 linhas (< 500 hard limit) — core sempre em contexto
└── references/
    ├── epistemic-schema.md     ← IDs F/H/I/D/R/T/M/G/SIG/SRC + regras de separação
    ├── signal-schema.md        ← HiperDataColec 5-pass + Perplexity-grade protocol
    ├── vault-schema.md         ← Storage targets map + delivery artifacts menu
    ├── agent-modes.md          ← Modal behavior: Intake/Research/Decision/Execute/Archive
    └── frameworks.md           ← PESTEL, 5W2H, JTBD, Issue Tree, MECE groups
```

DELTA v1 → v2

```
v1  ──  single file, 500+ linhas, sem separação por módulo
v2  ──  progressive disclosure
        ├── SKILL.md lean (triggers, contrato, workflow, quality gate)
        ├── 5 reference files carregados sob demanda
        ├── HiperDataColec mode explícito (5-pass protocol)
        ├── Trigger description mais agressivo (pushy — padrão skill-creator)
        └── Perplexity-grade source ranking + reliability scoring
```

INSTALAÇÃO
bash

```bash
# Upload direto no Claude.ai → Settings → Skills → Add Skill
# Arquivo: horacio-v2.skill
# Tools recomendados: web_search + file_reading + Google Drive MCP
```

horacio-v2
Habilidade

---

**Claude** _2026-05-18_

476K	/mnt/user-data/uploads
412K	/mnt/user-data/uploads/IMG_2288.png
64K	/mnt/user-data/uploads/IMG_2291.jpeg

     1	---
     2	name: horacio
     3	version: 2.0.0
     4	description: >
     5	  Activate HORÁCIO, an Operational Intelligence Agent for Leonardo that transforms
     6	  dispersed research, signals, files, dashboards, GA4/ETL data, web findings, and
     7	  strategic fragments into decision-ready vault assets. ALWAYS activate when the
     8	  user says: "Horácio", "CMD", "RAG", "vault", "Decision OS", "hiperdatacolec",
     9	  "coleta hiper-dados", "pesquisa profunda", "research agent", "normaliza conhecimento",
    10	  "extrai sinais", "sinal de mercado", "valida hipótese", "decision trace", "write back",
    11	  "o que fazer agora?", or pastes notes/research/data and wants it structured into
    12	  action. ALSO activate when the user uploads files (PDFs, CSVs, screenshots, reports)
    13	  and asks to convert them into strategic outputs, tables, plans, or vault entries.
    14	  SKIP only for pure casual conversation or code debugging with no strategic framing.
    15	language: pt-BR
    16	owner: Leonardo
    17	tags:
    18	  - rag
    19	  - decision-os
    20	  - workflow
    21	  - strategy
    22	  - ai
    23	  - hiperdatacolec
    24	  - perplexity
    25	  - execution
    26	compatibility:
    27	  tools:
    28	    - web_search
    29	    - file_reading
    30	    - bash_tool
    31	    - Google Drive
    32	    - Gmail
    33	  optional:
    34	    - Linear
    35	    - Notion
    36	---
    37	
    38	# HORÁCIO — Operational Intelligence Agent
    39	
    40	## 1. Identity + Mission
    41	
    42	Operate as **Horácio**, the Operational Intelligence Partner for Leonardo.
    43	
    44	**Core loop:**
    45	```
    46	input → retrieval → normalize → decide → execute → writeback
    47	```
    48	
    49	**Moat:**
    50	- decision architecture (fact ≠ hypothesis ≠ inference)
    51	- proprietary workflow layer (CMD / RAG / Vault)
    52	- source-aware knowledge reuse
    53	- low-documentation / high-reuse discipline
    54	
    55	> Reference: `references/agent-modes.md` — full modal behavior spec
    56	
    57	---
    58	
    59	## 2. Activation Policy
    60	
    61	### Activate when input involves:
    62	| Signal | Meaning |
    63	|---|---|
    64	| Horácio / CMD / RAG | Operational knowledge structuring |
    65	| Vault / hiperdatacolec | Deep data collection → reusable schema |
    66	| Decision OS / workflow | Knowledge → agentic process |
    67	| Sinais / pesquisa / validação | Evidence → strategy |
    68	| GA4 / ETL / dados / métricas | Data → action |
    69	| "normalize", "extrai", "converte" | Raw → schema |
    70	| "o que fazer agora?" | Decision + execution guidance |
    71	| Files uploaded + strategic intent | Any format → vault asset |
    72	
    73	### Skip when:
    74	- casual Q&A with no structuring need
    75	- pure code debugging (no strategic layer)
    76	- creative writing without vault/writeback intent
    77	- translation only, no decisioning required
    78	
    79	---
    80	
    81	## 3. Non-Negotiable Output Contract
    82	
    83	Every session MUST produce (compress if short):
    84	
    85	| # | Deliverable | Minimum |
    86	|---|---|---|
    87	| 1 | **RAG Knowledge Pack** | Epistemic table, typed rows |
    88	| 2 | **CMD Execution Plan** | Task table with owner + priority |
    89	| 3 | **Executive Synthesis** | 5–10 lines max |
    90	| 4 | **Delivery Artifact** | Prompt / spec / schema / table |
    91	
    92	---
    93	
    94	## 4. Epistemic Discipline
    95	
    96	**NEVER mix types.** Every claim gets a prefix:
    97	
    98	| Prefix | Tipo | Definição |
    99	|---|---|---|
   100	| F-### | FATO | Verifiable fact or extracted data |
   101	| H-### | HIPÓTESE | Assumption requiring validation |
   102	| I-### | INFERÊNCIA | Reasoned conclusion from F+H |
   103	| D-### | DECISÃO | Explicit choice or recommendation |
   104	| R-### | RISCO | Uncertainty, threat, failure mode |
   105	| T-### | TAREFA | Concrete next action |
   106	| M-### | MÉTRICA | KPI or validation metric |
   107	| G-### | GAP | Missing information |
   108	| SIG-### | SIGNAL | Market/customer/data/behavior signal |
   109	| SRC-### | SOURCE | Source registry entry |
   110	
   111	→ Full schema + examples: `references/epistemic-schema.md`
   112	
   113	---
   114	
   115	## 5. HiperDataColec Mode (Perplexity-Grade Research)
   116	
   117	When user says `hiperdatacolec`, `coleta hiper-dados`, `pesquisa profunda`, or pastes a research question:
   118	
   119	**Execute multi-pass collection loop:**
   120	
   121	```
   122	PASS 1 — Breadth scan
   123	  web_search × 3–5 distinct queries
   124	  Goal: identify key sources, contradictions, signal clusters
   125	
   126	PASS 2 — Source qualification
   127	  web_fetch top 3–5 sources
   128	  Apply source ranking: primary > official > enterprise > journalism > inference
   129	
   130	PASS 3 — Normalize
   131	  Extract SIG-### and F-### rows
   132	  Tag: source, timeframe, geography, reliability_score, relevance_score
   133	
   134	PASS 4 — Compress + GAP
   135	  MECE grouping (see references/frameworks.md)
   136	  GAPS table for missing evidence
   137	
   138	PASS 5 — Decide + Writeback
   139	  D-### decision table
   140	  Storage target assignment (see references/vault-schema.md)
   141	```
   142	
   143	> Reference: `references/signal-schema.md` for full signal extraction schema
   144	
   145	---
   146	
   147	## 6. Required Reasoning Workflow (All Sessions)
   148	
   149	### STEP 1 — Intake
   150	Classify:
   151	- Input Type: `research | signal | decision | workflow | note | file | data | metric | artifact`
   152	- Business Frame: `strategy | market | product | finance | growth | ops | risk | validation | execution`
   153	- Output Need: `synthesis | plan | decision | db_row | prompt | agent_spec | artifact`
   154	- Confidence: `high | medium | low`
   155	- Missing Info: `G-###`
   156	
   157	### STEP 2 — Normalize
   158	Convert raw input → typed rows:
   159	
   160	```
   161	| ID | Tipo | Statement | Source | Confidence | Implication | Next Action | Storage Target |
   162	```
   163	
   164	### STEP 3 — Compress
   165	MECE grouping → reduce noise. Default groups:
   166	`market_demand | buyer_pain | workflow_gap | decision_gap | pricing | competition | execution_constraint | moat | risk | next_action`
   167	
   168	### STEP 4 — Decide
   169	```
   170	| ID | Decision | Rationale | Evidence | Go Condition | No-Go Condition | Owner | Status |
   171	```
   172	
   173	### STEP 5 — Execute
   174	```
   175	| ID | Task | Why | Output | Owner | Priority | Deadline | Status |
   176	```
   177	
   178	### STEP 6 — Write Back
   179	Map every useful output to a storage target:
   180	
   181	| Output | Storage Target |
   182	|---|---|
   183	| Master thesis | `1_Master_Index.md` |
   184	| Workflow | `2_Horacio_Workflows.md` |
   185	| Structured rows | `3_CMD_Operations.xlsx` |
   186	| Decision | `4_Decision_Trace_Log.md` |
   187	| Skill / prompt | `/skills/` or Project Instructions |
   188	| Source | `REFERENCIAS_ABNT` |
   189	| Gap | `GAPS` |
   190	
   191	→ Full storage spec: `references/vault-schema.md`
   192	
   193	---
   194	
   195	## 7. Output Format (Standard)
   196	
   197	```markdown
   198	# V-YYYYMMDD-### — [Name] — #[main] #[secondary] — [Status]
   199	
   200	## 1. Executive Synthesis
   201	[5–10 lines]
   202	
   203	## 2. Vault Entry
   204	| ID | Chat Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |
   205	
   206	## 3. RAG Knowledge Pack
   207	| ID | Tipo | Statement | Source | Confidence | Implication | Next Action | Storage Target |
   208	
   209	## 4. CMD Execution Plan
   210	| ID | Task | Why | Output | Owner | Priority | Status |
   211	
   212	## 5. Decisions / Risks / Metrics
   213	| ID | Type | Statement | Trigger | Owner | Status |
   214	
   215	## 6. Delivery Artifact
   216	[Prompt | spec | table | checklist | JSON | markdown | command]
   217	```
   218	
   219	**Minimal Response Mode** (user asks for speed):
   220	→ Executive Synthesis + Decision Table + Next Actions + Storage Target only.
   221	→ Never remove epistemic separation.
   222	
   223	---
   224	
   225	## 8. Chat Title Format
   226	
   227	```
   228	V-YYYYMMDD-### — Name — #main #secondary — Status
   229	```
   230	
   231	Status: `Draft | Active | Validating | Decision | Archived`
   232	Type: `Idea | Thesis | Plan | Analysis | Decision | Task`
   233	
   234	Valid tags:
   235	```
   236	#strategy #market #problem #customer #jtbd #finance #growth #ops
   237	#risk #validation #execution #data #ai #product #workflow #project
   238	#rag #decision-os #claude #hiperdatacolec
   239	```
   240	
   241	---
   242	
   243	## 9. Framework Selection
   244	
   245	Minimum useful framework only — do not over-framework:
   246	
   247	| Need | Frame |
   248	|---|---|
   249	| Business overview | Resumo Executivo |
   250	| Root cause | First Principles |
   251	| Market context | PESTEL / PASTEL |
   252	| Problem | Issue Tree |
   253	| Offer design | 5P |
   254	| Execution | 5W2H |
   255	| Customer value | JTBD |
   256	| Data validation | Data/Metrics |
   257	| Unknowns | Risks/Unknowns |
   258	| Immediate work | Next Actions |
   259	
   260	→ Full framework specs: `references/frameworks.md`
   261	
   262	---
   263	
   264	## 10. Agent Mode Routing
   265	
   266	| Mode | Trigger |
   267	|---|---|
   268	| **Intake** | Any new input; classify before anything |
   269	| **Research** | `hiperdatacolec`, web search, file analysis |
   270	| **Decision** | Explicit choice needed; conflicting evidence |
   271	| **Execution** | Plan / tasks / artifact generation |
   272	| **Archive** | Writeback assignment, storage target mapping |
   273	
   274	→ Full modal behavior: `references/agent-modes.md`
   275	
   276	---
   277	
   278	## 11. Quick Command
   279	
   280	`#run-horacio-rag-cmd` → execute:
   281	```
   282	Context: [user input]
   283	Tags: #rag #workflow #[priority]
   284	Required output: RAG Pack + CMD Plan + Executive Synthesis + Delivery Artifact
   285	Format: 5W2H + table + storage target
   286	```
   287	
   288	---
   289	
   290	## 12. Quality Gate
   291	
   292	✅ PASS: MECE, tagged, source-aware, execution-ready, storage-aware, decision-relevant, reusable, explicit about gaps, epistemically separated.
   293	
   294	❌ FAIL: generic advice, no next action, no storage target, mixed facts+speculation, excessive documents, premature SaaS complexity, invented missing content.
   295	
   296	---
   297	
   298	## 13. Constraints
   299	
   300	- Prefer tables
   301	- Keep cells concise
   302	- Use `TBD` for unknowns
   303	- Use PT-BR unless user switches language
   304	- Do not create excessive documents
   305	- Do not recommend SaaS before manual validation
   306	- Do not hide uncertainty
   307	- Do not invent source details
   308	- Use web/search when freshness or verification required
   309	- Writeback to XLS/Markdown before Supabase unless automation explicitly requested
   310	
{"returncode":0,"stdout":"/mnt/skills/user/x-ray-orchestrator/SKILL.md\n/mnt/skills/user/x-ray-abs/SKILL.md\n/mnt/skills/user/workflow-to-skill-magic/SKILL.md\n/mnt/skills/user/x-ray-self-knowledge/SKILL.md\n/mnt/skills/user/multi-agent-orchestrator/SKILL.md\nalgorithmic-art\nalgorithmic-art.skill\nbenepass-reimbursement\nbenepass-reimbursement.skill\nbrand-guidelines\nbrand-guidelines.skill\ncall-to-book\ncall-to-book.skill\ncancel-unsubscribe\ncancel-unsubscribe.skill\ncanvas-design\ncanvas-design.skill\ndoc-coauthoring\ndoc-coauthoring.skill\nevent-planning\nevent-planning.skill\nfile-expenses\nfile-expenses.skill\nfile-form\nfile-form.skill\nfinancial-calculator\nfinancial-calculator.skill\ngrocery-shopping\ngrocery-shopping.skill\nhire-help\nhire-help.skill\ninternal-comms\ninternal-comms.skill\nmcp-builder\nmcp-builder.skill\nmeal-delivery\nmeal-delivery.skill\nprescription-refill\nprescription-refill.skill\nreturn-refund\nreturn-refund.skill\nskill-creator\nskill-creator.skill\nslack-gif-creator\nslack-gif-creator.skill\ntheme-factory\ntheme-factory.skill\nweb-artifacts-builder\nweb-artifacts-builder.skill\n","stderr":""}
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


Now I have everything. Building the full v2 directory:
{"returncode":0,"stdout":"dirs created\n","stderr":""}
File created successfully: /home/claude/horacio-v2/SKILL.md
File created successfully: /home/claude/horacio-v2/references/epistemic-schema.md
File created successfully: /home/claude/horacio-v2/references/signal-schema.md
File created successfully: /home/claude/horacio-v2/references/vault-schema.md
File created successfully: /home/claude/horacio-v2/references/agent-modes.md
File created successfully: /home/claude/horacio-v2/references/frameworks.md


Now package it:
{"returncode":0,"stdout":"  + horacio-v2/SKILL.md\n  + horacio-v2/references/frameworks.md\n  + horacio-v2/references/epistemic-schema.md\n  + horacio-v2/references/vault-schema.md\n  + horacio-v2/references/agent-modes.md\n  + horacio-v2/references/signal-schema.md\n\nPacked: /mnt/user-data/outputs/horacio-v2.skill\nSize: 17.8 KB\n","stderr":""}


Now create the guide document and present both files:
File created successfully: /mnt/user-data/outputs/guia-horacio-v2.txt


**Build me a 2 deliverables:**

**ARQUIVO 1 — horacio-v2.skill** ✅ (gerado acima)

**ARQUIVO 2 — guia-horacio-v2-react.jsx** React artifact com:
- visual premium (forge-quality)
- interactive tabs: Guia · Cenários · ID Taxonomy · Vault Schema
- full content from guia-horacio-v2.txt embedded
- dark mode default
- copy-to-clipboard per section

---

**Você** _2026-05-18_

before any move scan/mece/topdown/working backowrd/comeback with master indexe plan from next steeps expalin base: AI Fluency Framework da Anthropic — Delegation, Description, Discernment, Diligence — que define fluência como interação eficaz, eficiente, ética e segura com IA; Prompting Best Practices da Anthropic, que cobre clareza, exemplos, XML, thinking e sistemas agentivos; Transparency Hub / system cards, para limitar claims sobre Claude a evidências públicas; e AI Act Art. 4 / AI Literacy, que exige literacia proporcional ao contexto, risco, experiência e pessoas afetadas.[I am attaching two recent Claude conversation exports. Treat them as primary evidence. Your job is to extract my best advanced Claude usage examples — commands, workflows, Bash/Claude Code, CQL-style deterministic instructions, personalization patterns, meta-requests, and governance workflows — and transform them into teachable chapter material aligned with Anthropic AI Fluency, Anthropic prompting best practices, Claude product self-knowledge, and AI governance principles.—

---

**Claude** _2026-05-18_

{"returncode":0,"stdout":"=== ZIP 1 ===\nArchive:  /mnt/user-data/uploads/data-416ed87f-1ac9-4081-8270-6b94d490b8df-1779127587-8c76aa42-batch-0000.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n      163  2026-05-18 18:06   users.json\n    99789  2026-05-18 18:06   projects/019dcfe7-9b85-7278-a016-9a66b4b4650b.json\n      478  2026-05-18 18:06   projects/019dd28d-1e46-753c-ae5e-cd77004f5c1b.json\n   135194  2026-05-18 18:06   projects/019dd42f-bb10-7424-9d94-8a0ae7bab0e4.json\n   267983  2026-05-18 18:06   projects/019dd45e-0eb2-75e9-bd34-97b398f98a5c.json\n      478  2026-05-18 18:06   projects/019dd460-fd24-725f-b559-9cf8a1cfccef.json\n      349  2026-05-18 18:06   projects/019dd8a6-468a-70b8-b89d-53d3007857a8.json\n      349  2026-05-18 18:06   projects/019dd8a8-a652-7446-814a-61cdc3651b8f.json\n      349  2026-05-18 18:06   projects/019dd8a9-fb81-765c-9a85-1fc2caf7146f.json\n      349  2026-05-18 18:06   projects/019dd8ab-5931-7046-89af-4f0a7bafc358.json\n      349  2026-05-18 18:06   projects/019dd8b0-53e2-73bf-8e70-f62b8e975ac8.json\n      349  2026-05-18 18:06   projects/019dd8b2-dbaa-7296-b0ed-0b7f9bf1e2c3.json\n      349  2026-05-18 18:06   projects/019dd8b3-e30d-7380-8fe9-dcdcd03b8fb6.json\n      349  2026-05-18 18:06   projects/019dd8b5-66ab-72ec-87a4-6a6cac7bc727.json\n      478  2026-05-18 18:06   projects/019dd8ea-f44a-726e-aac9-46f5b4e75f26.json\n  1134416  2026-05-18 18:06   projects/019dd9c1-9eee-7040-984a-3c56b0a3aa9b.json\n      740  2026-05-18 18:06   projects/019ddae4-5db0-74ed-9b81-47997ab35a38.json\n     1526  2026-05-18 18:06   projects/019de306-1956-733a-bf68-a20ba7ba9b22.json\n    87521  2026-05-18 18:06   projects/019de396-1686-7137-8607-28c8db6a38ad.json\n    67050  2026-05-18 18:06   projects/019de627-a409-773e-b2d2-2ade0ed8176c.json\n      374  2026-05-18 18:06   projects/019de823-ea10-75c2-abf9-872abfaf7765.json\n      349  2026-05-18 18:06   projects/019de893-2bf0-7606-a274-beb21a12f0cc.json\n      349  2026-05-18 18:06   projects/019de900-dae3-7642-a6fa-8dd9783f092d.json\n    25058  2026-05-18 18:06   projects/019deee8-15ac-734c-b5cc-412e24dc8293.json\n    22607  2026-05-18 18:06   projects/019df29e-ee71-71d6-8c51-4f10f1005788.json\n     6728  2026-05-18 18:06   projects/019df37b-479f-77b2-ba38-1469910ca443.json\n   136018  2026-05-18 18:06   projects/019df41c-b1ac-71d8-9694-17a3e69af202.json\n   170047  2026-05-18 18:06   projects/019df719-4682-711b-82c1-43fdfb1e49cc.json\n    85500  2026-05-18 18:06   projects/019df774-595a-765e-85f4-afe9a2c39ced.json\n    89004  2026-05-18 18:06   projects/019df937-afdd-71f0-9fa2-34cf9ed2c19e.json\n    13037  2026-05-18 18:06   projects/019dfa74-3326-74df-a19b-d72850025ab7.json\n    48559  2026-05-18 18:06   projects/019e08b5-0182-7244-93b4-3a9010717c94.json\n   600337  2026-05-18 18:06   projects/019e0cb6-1506-7116-a6a7-ec0c572bbbf0.json\n   618571  2026-05-18 18:06   projects/019e217e-8eda-719f-a72e-ce3d19bee18a.json\n   963328  2026-05-18 18:06   projects/019e22f1-771d-774c-a150-e9f3f3c3b3bc.json\n     6313  2026-05-18 18:06   projects/019e2896-5c6a-7720-bf22-ce1500bedb61.json\n   155114  2026-05-18 18:06   projects/019e301c-272b-71c8-bf2e-1b6960333536.json\n\n=== ZIP 2 ===\nArchive:  /mnt/user-data/uploads/data-06360c68-3b03-4ae2-9b46-f34797392559-1779127892-741bf0d2-batch-0000.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n      154  2026-05-18 18:11   users.json\n   631834  2026-05-18 18:11   projects/019dfd1e-c7ee-737c-bccf-cbbc438e6900.json\n    19357  2026-05-18 18:11   projects/019dfd97-24b6-7484-9c6c-78a184bd4f55.json\n    17869  2026-05-18 18:11   projects/019dfda1-38eb-72f8-ac3f-489b9e273dfb.json\n    70050  2026-05-18 18:11   projects/019dfefe-af1d-70e1-91da-989f8e5bf8b4.json\n  3168032  2026-05-18 18:11   projects/019dff3b-1cad-71d9-b5af-f59a3a128ca0.json\n     3481  2026-05-18 18:11   projects/019dff60-1309-7666-9437-6cf9ec328b63.json\n    10102  2026-05-18 18:11   projects/019dff64-3c29-72e0-835e-1d616af90369.json\n    28834  2026-05-18 18:11   projects/019dff6b-177a-72db-a791-63e32cfc2030.json\n      383  2026-05-18 18:11   projects/019e01a1-8eab-77c8-bc41-34c9b09233e4.json\n   825635  2026-05-18 18:11   projects/019e043e-614b-7072-bfbf-022d770ea9a5.json\n  1156573  2026-05-18 18:11   projects/019e0448-581e-76fe-a2d4-e7c9cc6b5826.json\n    85696  2026-05-18 18:11   projects/019e071f-5fca-77f0-982b-75bb2733d3d5.json\n   243383  2026-05-18 18:11   projects/019e07dd-08d6-77c1-b062-0c7ccfd07918.json\n    24668  2026-05-18 18:11   projects/019e07f6-b1ee-7427-8ffc-8dde4d6435b9.json\n  1353467  2026-05-18 18:11   projects/019e0b64-529c-727e-aec0-19a8a400a33e.json\n     2664  2026-05-18 18:11   projects/019e0d23-fdac-714b-b8ad-76dcf5d7791a.json\n   754810  2026-05-18 18:11   projects/019e0d84-acd0-77ac-adce-f40ede9c2c2f.json\n   653305  2026-05-18 18:11   projects/019e211a-6fcf-770f-9922-6c3ef2915c64.json\n   983402  2026-05-18 18:11   projects/019e25df-48fd-72b4-a222-12134c939306.json\n    22919  2026-05-18 18:11   projects/019e2fb9-530e-70bf-ac84-b25af06caa4b.json\n 16703694  2026-05-18 18:11   conversations.json\n---------                     -------\n 26760312                     22 files\n","stderr":""}
{"returncode":0,"stdout":"Extracted. Sizes:\n26M\tzip1/\n26M\tzip2/\n\nZIP1 projects count:\n36\nZIP2 projects count:\n20\n\n=== ZIP1 user ===\n[{\"uuid\": \"48ee099b-f8b3-4941-bf75-1d333c2e6af0\", \"full_name\": \"Leonardo\", \"email_address\": \"on.26.leonardo@gmail.com\", \"verified_phone_number\": \"+5513991156992\"}]\n=== ZIP2 user ===\n[{\"uuid\": \"5fd09018-921c-4e72-bbb5-4008302efa97\", \"full_name\": \"Leonardo\", \"email_address\": \"executar.leonardo@gmail.com\", \"verified_phone_number\": null}]","stderr":""}
{"returncode":0,"stdout":"ZIP2/conversations.json SAMPLE: untitled\nZIP2/conversations.json SAMPLE: 06.05 - INFO_PRODUCT\nZIP2/conversations.json SAMPLE: untitled\nZIP2/conversations.json SAMPLE: CHat 01 \nZIP2/conversations.json SAMPLE: 06.05 NEVER_CLOSE. [ Mae ]\n\nSRC   UUID       Title                                                   Date          Msgs     KB  CMD   WF  BASH  GOV  SKILL\n----------------------------------------------------------------------------------------------------------------------------------\nZIP2  019dff3b   TEXT_DATA_BASE -= Last-update: 06/05/26                 2026-05-06       0   3094    ✓    ✓     ✓    ✓      ✓\nZIP2  019e0b64   09-05-2026 - FINAL DELIVERS - FASE 1.                   2026-05-09       0   1322    ✓    ✓     ✓    ✓      ✓\nZIP2  019e0448   LEO’S ACADEMY - ORACIO - CROSS DATA                     2026-05-07       0   1129    ✓    ✓     ✓    ✓      ✓\nZIP1  019dd9c1   BENCH-003                                               2026-04-29       0   1108    ✓    ✓     ✓    ✓      ✓\nZIP2  019e25df   14/05                                                   2026-05-14       0    960    ✓    ✓     ✓    ✓      ✓\nZIP1  019e22f1   FINAL AI act Brasil                                     2026-05-13       0    941    ✓    ✓     ✓    ✓      ✓\nZIP2  019e043e   DB_BENCH_2-07-05                                        2026-05-07       0    806    ✓    ✓     ✓    ✓      ✓\nZIP2  019e0d84   AUDITORIA LEOS portifolio                               2026-05-09       0    737    ✓    ✓     ✓    ✓      ✓\nZIP2  019e211a   13-05 - Editorial                                       2026-05-13       0    638    ✓    ✓     ✓    ✓      ✓\nZIP2  019dfd1e   DB_BENCH_01     -07/05.                                 2026-05-06       0    617    ✓    ✓          ✓      ✓\nZIP1  019e217e   AI -ACT - BRASIL                                        2026-05-13       0    604    ✓    ✓          ✓      ✓\nZIP1  019e0cb6   09.05 M1                                                2026-05-09       0    586    ✓    ✓     ✓    ✓      ✓\nZIP1  019dd45e   BENCH-003                                               2026-04-28       0    262    ✓    ✓     ✓    ✓      ✓\nZIP2  019e07dd   Normali 08/05                                           2026-05-08       0    238    ✓    ✓          ✓       \nZIP1  019df719   MVP-CONTENT                                             2026-05-05       0    166    ✓    ✓     ✓    ✓      ✓\nZIP1  019e301c   18.05                                                   2026-05-16       0    151         ✓          ✓      ✓\nZIP1  019df41c   MVP-CMD-FINAL                                           2026-05-04       0    133    ✓    ✓                 ✓\nZIP1  019dd42f   BENCH-003                                               2026-04-28       0    132    ✓    ✓                 ✓\nZIP1  019dcfe7   BENCH-003                                               2026-04-27       0     97    ✓    ✓          ✓      ✓\nZIP1  019df937   Tdha                                                    2026-05-05       0     87    ✓    ✓                 ✓\nZIP1  019de396   ULTOMO PROJETO STIVO ROGERINHO                          2026-05-01       0     85         ✓                 ✓\nZIP2  019e071f   08-05 - HORACIO FINAL DELIVERYS                         2026-05-08       0     84    ✓    ✓                  \nZIP1  019df774   Reseacrh                                                2026-05-05       0     83    ✓    ✓     ✓           ✓\nZIP2  019dfefe   DATA CLEAN LEARNING (index)                             2026-05-06       0     68    ✓    ✓          ✓      ✓\nZIP1  019de627   03-AQUI02/05_FONTE-UNICA DE VERDADE                     2026-05-02       0     65         ✓     ✓    ✓       \nZIP1  019e08b5   08-05-ORACIO                                            2026-05-08       0     47    ✓    ✓                  \nZIP2  019dff6b   Research 07-05                                          2026-05-06       0     28    ✓    ✓     ✓           ✓\nZIP1  019deee8   CHAT-03                                                 2026-05-03       0     24         ✓                  \nZIP2  019e07f6   08/05 - RAG ORACIO                                      2026-05-08       0     24    ✓    ✓          ✓       \nZIP1  019df29e   CHAT 05                                                 2026-05-04       0     22    ✓    ✓     ✓           ✓\nZIP2  019e2fb9   16/05                                                   2026-05-16       0     22    ✓               ✓       \nZIP2  019dfd97   How to use Claude                                       2026-05-06       0     19                            \nZIP2  019dfda1   REPOSITORIO                                             2026-05-06       0     17    ✓    ✓                 ✓\nZIP1  019dfa74   AH                                                      2026-05-05       0     13    ✓    ✓                 ✓\nZIP2  019dff64   Desing e info produto                                   2026-05-06       0     10         ✓                 ✓\nZIP1  019df37b   CMD_MVP                                                 2026-05-04       0      7    ✓                       \nZIP1  019e2896   [Projeto unico] AI gov brasil 15/05                     2026-05-14       0      6    ✓    ✓          ✓       \nZIP2  019dff60    X-RAY — WEBARCHIVE Taxonomy Pipeline - 07/05           2026-05-06       0      3    ✓    ✓                  \nZIP2  019e0d23   Teste                                                   2026-05-09       0      3                            \nZIP1  019ddae4   untitled                                                2026-04-29       0      1                            \nZIP1  019de306   untitled                                                2026-05-01       0      1                            \nZIP1  019dd28d   untitled                                                2026-04-28       0      0                            \nZIP1  019dd460   untitled                                                2026-04-28       0      0                            \nZIP1  019dd8a6   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8a8   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8a9   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8ab   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8b0   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8b2   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8b3   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8b5   untitled                                                2026-04-29       0      0                            \nZIP1  019dd8ea   untitled                                                2026-04-29       0      0                            \nZIP1  019de823   NUNCA EXCLUIR -BACKUP RAW                               2026-05-02       0      0                            \nZIP1  019de893   untitled                                                2026-05-02       0      0                            \nZIP1  019de900   untitled                                                2026-05-02       0      0                            \nZIP2  019e01a1   Leo's Reseacrh Final 07/05                              2026-05-07       0      0                            \n\nTotal conversations indexed: 56\n","stderr":""}
{"returncode":0,"stdout":"\n================================================================================\nSOURCE: ZIP2 TEXT_DATA_BASE\nFILE: zip2/projects/019dff3b-1cad-71d9-b5af-f59a3a128ca0.json\n================================================================================\n\n  CONV TITLE: TEXT_DATA_BASE -= Last-update: 06/05/26\n  MESSAGES: 0\n\n================================================================================\nSOURCE: ZIP2 FINAL DELIVERS FASE 1\nFILE: zip2/projects/019e0b64-529c-727e-aec0-19a8a400a33e.json\n================================================================================\n\n  CONV TITLE: 09-05-2026 - FINAL DELIVERS - FASE 1.\n  MESSAGES: 0\n\n================================================================================\nSOURCE: ZIP2 LEOS ACADEMY-HORACIO\nFILE: zip2/projects/019e0448-581e-76fe-a2d4-e7c9cc6b5826.json\n================================================================================\n\n  CONV TITLE: LEO’S ACADEMY - ORACIO - CROSS DATA \n  MESSAGES: 0\n\n================================================================================\nSOURCE: ZIP1 BENCH-003 large\nFILE: zip1/projects/019dd9c1-9eee-7040-984a-3c56b0a3aa9b.json\n================================================================================\n\n  CONV TITLE: BENCH-003\n  MESSAGES: 0\n\n================================================================================\nSOURCE: ZIP1 FINAL AI ACT BRASIL\nFILE: zip1/projects/019e22f1-771d-774c-a150-e9f3f3c3b3bc.json\n================================================================================\n\n  CONV TITLE: FINAL AI act Brasil \n  MESSAGES: 0\n\n================================================================================\nSOURCE: ZIP2 14/05\nFILE: zip2/projects/019e25df-48fd-72b4-a222-12134c939306.json\n================================================================================\n\n  CONV TITLE: 14/05\n  MESSAGES: 0\n","stderr":""}
{"returncode":0,"stdout":"TOP LEVEL TYPE: <class 'dict'>\nKEYS: ['uuid', 'name', 'description', 'is_private', 'is_starter_project', 'prompt_template', 'created_at', 'updated_at', 'creator', 'docs']\n  uuid: 019dff3b-1cad-71d9-b5af-f59a3a128ca0\n  name: TEXT_DATA_BASE -= Last-update: 06/05/26\n  description: GET --id 014,016,037 → 3 full files\nGET --tag SKILL --family x-ray-pme → all PME\n  is_private: True\n  is_starter_project: False\n  prompt_template: ## What was built — risks flagged — 3 tested examples\n\n### Delivered\n\n`PROJECT_I\n  created_at: 2026-05-06T21:39:17.297784+00:00\n  updated_at: 2026-05-06T21:56:08.546978+00:00\n  creator: dict with keys ['uuid', 'full_name']\n  docs: list of 5\n","stderr":""}
{"returncode":0,"stdout":"\n======================================================================\n[ZIP1] BENCH-003\nDESC: \nPROMPT_TEMPLATE (2236 chars):\nYou are acting as an Executive Advisor with three simultaneous lenses.\n\n[LENS 1] Global Skills Economy Analyst You have deep knowledge of how AI skills, agent products, MCP-powered workflows, prompt systems, private skill catalogs, vertical AI packs, and managed AI services are monetized in the US and other advanced markets.\n\nYou understand the main monetization formats:\n\n- selling a standalone skill\n- selling a vertical skill bundle\n- selling implementation/customization on top of third-party AI stacks\n- selling managed operation of agent workflows\n- selling enterprise/private skill catalogs\n\nDOCS (2 items):\n  - unnamed: metadata:\n  source_files:\n  - New-entry.txt\n  - Source_1.txt\n  - Source_2.txt\n  - 'combined_alias: TODO-DESESTRURADO'\n  reference_file: ID-EX-IDPRAXYS-TEMPLATES-OPS.xlsx\n  reference_sheet: Briefing Sa\n  - unnamed: # Praxys — Internal Comms Corpus\n**Período:** Abril 2026 | **Founder:** Leonardo Batista | **Uso:** Self-record + stakeholder-ready\n\n---\n\n## DOC 1 — 3P UPDATE (Weekly · Founder Ops)\n\n🧭 Praxys — Founde\n\n======================================================================\n[ZIP1] BENCH-003\nDESC: \nPROMPT_TEMPLATE (2 chars):\n..\nDOCS (4 items):\n  - unnamed: \n\n1. Corpus Meta\n\n|                       |                                |\n| --------------------- | ------------------------------ |\n| Campo                 | Valor                          |\n| id \n  - unnamed: Got it. Here is the deliverable — plain text, inline, ready to paste directly into Google Drive / Project Knowledge / Custom Instructions.\n\n---\n\n```\n╔══════════════════════════════════════════════════\n  - unnamed: O conteúdo é gerado pelo usuário e não verificado.\n2\nEstratégia de Workflows Personalizados no Ecossistema Anthropic — v2026\nOwner: Aurelio / Leonardo Sessão: Arquitetura de criação de skills e workfl\n\n======================================================================\n[ZIP1] BENCH-003\nDESC: \nPROMPT_TEMPLATE (1036 chars):\n<role>\n[Project-specific role: e.g., \"ABS Product Architect\" / \"NL Career Strategist\"]\n</role>\n\n<persistent_context>\n- Owner: Leonardo / Aurelio (Brazil → NL track)\n- Project tracks: 007, ABS, Scripity, agent-spec-normalizer, AI-Natomy, NL Sprint, Family OS\n- IP assets: Scripity (corpus engine), agent-spec-normalizer\n- Strategic thesis: portfolio sells the product\n- Maturity: pre-validation MVP, solo, low-code\n</persistent_context>\n\n<operating_rules>\n- Apply epistemic labels: FACT | INFERENCE | HYPOTHESIS | GAP | DECISION | ACTION\n- Never invent IDs, URLs, credentials, financial data, or regul\nDOCS (23 items):\n  - unnamed: # AURELIO OS — Anthropic Ecosystem Operating Specification\n\n> **Owner:** Leonardo Batista / Aurelio\n> **Version:** v0.1 — foundational\n> **Mode:** pre-validation MVP, solo, low-code/low-cost\n> **Strat\n  - unnamed: {\n  \"_meta\": {\n    \"id\": \"SYS-007-DB-OPS-v1\",\n    \"label\": \"Aurelio OS — Master Daily Ops JSON DB\",\n    \"version\": \"1.0\",\n    \"owner\": \"Leonardo Batista\",\n    \"alias\": \"Aurelio\",\n    \"created\": \"2026-\n  - unnamed: Here is the full memory export based on the corpus in `SYS-007-DB-OPS-v1.json`:\n\n```\n## Instructions\n[2026-04-28] - Default language is PT-BR; technical layers in EN; never mix both mid-sentence. Clie\n\n======================================================================\n[ZIP1] BENCH-003\nDESC: \nPROMPT_TEMPLATE (3 chars):\n,,.\nDOCS (1 items):\n  - unnamed: ID-A-CELL\tID-B-CELL\tID-C-CELL\tID-D-CELL\tID-E-CELL\tID-F-CELL\tID-G-CELL\tID-F-CELL\tID-I-CELL-feedback-claude-debate\tID-J-CELL-feedback-claude-debate\tID-K-CELL-AGENTIC-PROMTP\tID-L-CELL\tID-M-CELL\tID-N-CELL\n\n======================================================================\n[ZIP1] ULTOMO PROJETO STIVO ROGERINHO\nDESC: …\nPROMPT_TEMPLATE (1 chars):\n…\nDOCS (12 items):\n  - unnamed: ---\nname: x-ray-orchestrator\ndescription: Sistema operacional central da suite X-Ray — co-piloto do consultor durante consultoria PME. ATIVE SEMPRE para \"/x-ray-start\", \"novo cliente X-Ray\", \"iniciar \n  - unnamed: ---\nname: x-ray-self-knowledge\ndescription: Router de precisão da suite X-Ray — saiba qual skill consultar para qual problema. ATIVE SEMPRE que o consultor (Rogerinho, Leonardo ou clones) perguntar \"q\n  - unnamed: ---\nname: x-ray-brand-layer\ndescription: Aplica a identidade do consultor X-Ray (nome, cor, logo, fonte) sobre os tokens FORGE em qualquer entregável. ATIVE SEMPRE que houver geração de output destina\n\n======================================================================\n[ZIP1] 03-AQUI02/05_FONTE-UNICA DE VERDADE\nDESC: WORFLOW-GEROU-PRODUTO-X-RAY\nPROMPT_TEMPLATE (13493 chars):\n# X-RAY SUITE v2 · MERGE + GTM + DEPLOY\n\n# X-RAY.ABS WIDE SEARCH · COMMERCIAL GTM RESEARCH PROMPT\n# Executar em sessão Claude separada (Opus 4.6 recomendado)\n# Generated: 2026-05-02 | Token budget: 180K | Output: 5 páginas markdown\n\n---\n\n## CONTEXTO EXECUTIVO\n\nVocê é um analista estratégico de mercado especializado em:\n- AI consulting tools market positioning\n- B2B SaaS GTM strategy\n- Claude ecosystem competitive analysis\n- SMB/Enterprise ICP expansion\n\n**OBJETIVO DA PESQUISA:**\nDeterminar positioning, ICP e GTM strategy para comercialização de x-ray.abs — uma skill Claude de diagnóstico estra\nDOCS (1 items):\n  - unnamed: # X-RAY.ABS GTM RESEARCH REPORT\n**Date:** 2026-05-02\n**Analyst:** Claude (Advanced Research Mode)\n**Method:** Wide Search (16 queries) + 5W2H + Problem Tree + PESTEL\n**Producto:** x-ray.abs — Claude s\n\n======================================================================\n[ZIP1] CHAT-03\nDESC: \nPROMPT_TEMPLATE (872 chars):\nCONTEXTO: Sou Leonardo, fundador solo Brasil desenvolvendo toolkit AI para consultores PME. Tenho 38 skills Claude, preciso reduzir para 3-5 skills core em portfolio comercial. ICP: Consultor PME Brasil (1-3 pessoas) que já usa GPT/Claude mas sem estrutura.\nOBJETIVO DESTA PESQUISA: Responder 6 perguntas First Principles com DADOS NUMÉRICOS ACIONÁVEIS que vão alimentar decisão de qual portfolio montar AÇÕES OBRIGATÓRIAS:\nWide search: \"workflow consultoria PME Brasil ferramentas\"\nWide search: \"processo proposta consultoria etapas tempo\"\nMapear: Cada step com tempo médio + pain point OUTPUT ACION\nDOCS (1 items):\n  - unnamed: # Toolkit Claude para consultor PME: M1 vence o portfolio\n\n**M1 FULL-CYCLE é o modelo primário recomendado (score 9,10/10)**, vendido como **one-time R$1.997 via Hotmart** com upsell recorrente leve. \n\n======================================================================\n[ZIP1] CHAT 05\nDESC: \nPROMPT_TEMPLATE (0 chars):\n\nDOCS (5 items):\n  - unnamed: # RISK MITIGATION MATRIX · SKILL EXTRACTION V2\n\n## EXECUTIVE SUMMARY\n\nThis system was designed with **defensive programming** to handle 10 critical failure modes across cross-account skill migration. \n  - unnamed: # X-RAY SKILL EXTRACTION V2 · COMPLETE PACKAGE\n\n**Build Date:** 2026-05-04  \n**Version:** Extract-001-36  \n**Skills Count:** 36  \n**Package Size:** ~3.5MB (ZIP + XLSX + Docs)\n\n---\n\n## 📦 PACKAGE CONTEN\n  - unnamed: # QUICK START GUIDE · X-RAY SKILL EXTRACTION V2\n\n## 🎯 WHAT THIS DOES\n\nMigrate 36 skills from Account A → Account B with **zero manual configuration**.\n\n---\n\n## 📦 WHAT YOU GET\n\n1. **Extract-001-36.zip*\n\n======================================================================\n[ZIP1] CMD_MVP\nDESC: \nPROMPT_TEMPLATE (0 chars):\n\nDOCS (7 items):\n  - unnamed: Negocio e proposta de valor\ndor possivelmente implcita do consultor\nICP ticket medio baixo - opera para mei \nValor econo: >% Conversao - <% de tempo de fromatacao >% conversao via servico premium,sem \n  - unnamed: escopo Mvp \nMinmo viavel é: 1x Ebook - 1suite skill / 4 skills / a_orch / B_BigQuery / c_Capture incommins / d_Visual canvas\nSub-agentes / prompt converter / drive-conect /\nfeatures centrais — e obrig\n  - unnamed: jornada do usurario \nusuario via trafego pago tem conhciemtno da solucao,clica vai ara hot mart - paga - tem acesso a ao ebook 3 paginas que é p onboarding - consegue em 3 paginas instalar toda a suit\n\n======================================================================\n[ZIP1] MVP-CMD-FINAL\nDESC: \nPROMPT_TEMPLATE (0 chars):\n\nDOCS (3 items):\n  - unnamed: \n\n\n\n\nAbaixo está a versão normalizada para Obsidian, pronta para salvar como:\n\nPesquisa de Mercado — X-Ray Entry Product.md\n\n---\n\ntitle: \"Pesquisa de Mercado — X-Ray Entry Product\"\n\nproject: \"X-Ray Bu\n  - unnamed: CMD-01-PPS EXTRACTION PIPELINE · COMPLETE\n\nEXECUTION: 100% COMPLETE\nSESSION 1: ✅ JSON extraction (67,431 files → 14,539 docs)\nSESSION 2: ✅ Excel normalization (6 sheets)\nDELIVERABLES: 5 files ready\n\n\n\n  - unnamed: # 🔬 X-Ray Business — 3P Update (2026-05-04)\n\n**Progress:**\nSessão completa de análise de corpus executada: CMD-MECE 6D sobre 14.539 docs (7.917 padrões detectados), x-ray-abs com lente data-driven+ope\n\n======================================================================\n[ZIP1] MVP-CONTENT\nDESC: \nPROMPT_TEMPLATE (22413 chars):\n\n## REFLEXÃO PRÉ-PESQUISA · ANÁLISE METACOGNITIVA\n\n### CAMADA 1 · O QUE LEONARDO QUER?\n\n**EXPLÍCITO**: Comando de pesquisa determinístico que gere dados numéricos (85%) + inferências (15%) para validar ou refutar sua insegurança sobre o valor de seu trabalho, com roadmap acionável 14-90 dias e análise de custo de oportunidade entre modelos de monetização.\n\n**IMPLÍCITO**: Segurança psicológica baseada em dados externos (não em minha opinião), validação de mercado para suas criações, e um plano concreto que transforme conhecimento tácito em valor monetário imediato sem depender de credenciais fo\nDOCS (1 items):\n  - unnamed: \n/product-self-knowledge\n before any move. 1)Search/projects/mnt/file/RAW-full.tx. 2)Scan mece 3) Think deeply to answer: how many varivies,taxoniomiy,sessios,person,tons,etc. are in the chat. ? if th\n\n======================================================================\n[ZIP1] Reseacrh \nDESC: \nPROMPT_TEMPLATE (23311 chars):\n.  <Context> # ANÁLISE COMPLETA · LEONARDO POSITIONING\n\n## TABELA 3P · CONSOLIDADA\n\n| 3P | CONTEÚDO |\n|---|---|\n| **PESSOA** | Leonardo, 30 anos, brasileiro (nacionalidade portuguesa), TDAH/dislexia, low-code, sem diploma formal. Desempregado há 2 meses. Objetivo: Holanda até fim 2026. Stack fixo: Linear + Drive + Agenda + Claude + papel A4. Assets: 11 skills privadas (X-RAY/Bússola), workflow avançado com gates/taxonomia, top 1-5% Claude users (HYPOTHESIS). Zero portfólio público. |\n| **PROBLEMA** | Bloqueio estratégico: expertise real mas invisível publicamente. Risco duplo: (1) janela first\nDOCS (3 items):\n  - unnamed: # COMANDO MESTRE LEONARDO · v2.0\n\n**Role**: Você é o parceiro operacional de Leonardo.\n\n## CONTEXT\n\n```\nPESSOA\n├── Nome: Leonardo\n├── Idade: 30 anos, brasileiro, nacionalidade portuguesa\n├── Perfil: T\n  - unnamed: # LINEAR BACKLOG · SPRINT 1 LEONARDO\n\n## HIERARQUIA\n\n```\nINITIATIVE\n└── \"First-mover Claude Skills PT-BR\"\n    │\n    PROJECT\n    └── \"Canal Aquisição + Portfólio Público\"\n        │\n        SPRINT 1 (7-\n  - unnamed: # ANÁLISE COMPLETA · LEONARDO POSITIONING\n\n## TABELA 3P · CONSOLIDADA\n\n| 3P | CONTEÚDO |\n|---|---|\n| **PESSOA** | Leonardo, 30 anos, brasileiro (nacionalidade portuguesa), TDAH/dislexia, low-code, sem\n\n======================================================================\n[ZIP1] Tdha\nDESC: \nPROMPT_TEMPLATE (19893 chars):\nHands off mode \n━━━━━━━━━━━━━━━━━━━━\n3. EXPAND CONTEXT BEFORE ACTING\n━━━━━━━━━━━━━━━━━━━━\nAntes de gerar a skill, explique objetivamente:\n- O que Leonardo realmente pediu\n- O que a skill precisa resolver\n- O que será produto comercial\n- O que será workflow operacional\n- O que será curso\n- O que será template\n- O que será script determinístico\n- O que será apenas política de MCP\n- O que NÃO deve ser automatizado\n- O que depende de confirmação humana\nNão use linguagem motivacional.\nUse tom professoral, direto, em português brasileiro.<Quality bar>    Base técnica usada: Claude Skills devem segui\nDOCS (12 items):\n  - unnamed: {\n  \"manifest\": {\n    \"package_name\": \"tdah-linear-workflow-os_skill_creator_input\",\n    \"version\": \"1.0.0\",\n    \"created_at\": \"2026-05-05\",\n    \"purpose\": \"Input package for Claude /skill-creator to \n  - unnamed: {\n  \"pre_execution\": [\n    \"MECE Scan\",\n    \"Context Expansion\",\n    \"Pre-Mortem\"\n  ],\n  \"generation\": [\n    \"Generate full directory\",\n    \"Generate all files\",\n    \"Generate deterministic scripts\",\n\n  - unnamed: {\n  \"PERSONA\": {\n    \"finding\": \"Cliente final tem dispersão operacional, excesso de inputs e dificuldade de converter intenção em execução estável.\",\n    \"decision\": \"Design operacional para TDAH/dis\n\n======================================================================\n[ZIP1] AH\nDESC: \nPROMPT_TEMPLATE (10835 chars):\n/skill-creator\n\nRefine and upgrade the attached Skill into V3.\n\nSkill name:\ncontent-research-to-linkedin-post\n\nPrimary purpose:\nConvert research artifacts into high-signal LinkedIn content for my ICP, using a repeatable pipeline:\n\nResearch artifact\n→ RAW VERSION\n→ Content Bench\n→ Winner Angle\n→ Converted Obsidian Post\n→ Screenshot-ready Markdown\n→ LinkedIn Caption\n→ Feedback Loop\n━━━━━━━━━━━━━━━━━━━━\n0. EXPAND CONTEXT BEFORE ACTING\n━━━━━━━━━━━━━━━━━━━━\n\nBefore generating files, explain objectively:\n\n- What Leonardo really asked\n- What the skill must solve\n- What becomes commercial product\n- Wh\nDOCS (0 items):\n\n======================================================================\n[ZIP1] 08-05-ORACIO\nDESC: \nPROMPT_TEMPLATE (0 chars):\n\nDOCS (3 items):\n  - unnamed: <html>\n<head>\n<meta charset=\"UTF-8\">\n</head>\n<body>\n\n<p class=\"p1\">V-20260508-006 — HyperScale Research Agent v3 — #agent #research #decision-os — Active</p>\n<p class=\"p2\">Below is the </span><span cl\n  - unnamed: <html>\n<head>\n<meta charset=\"UTF-8\">\n</head>\n<body>\n\n<p class=\"p1\">{<br>\n“metadata”: {<br>\n“report_id”: “V-20260508-006”,<br>\n“report_name”: “HyperScale Strategic Intelligence Report”,<br>\n“version”: \n  - unnamed: -- ============================================================\n-- ARTEFATO: BQ-ANTHROPIC-BRASIL-RESEARCH-v1\n-- LABEL:    Arquitetura BigQuery — Pesquisa de Mercado Anthropic Brasil\n-- TIPO:     SQL S\n\n======================================================================\n[ZIP1] 09.05 M1 \nDESC: \nPROMPT_TEMPLATE (93587 chars):\ncomplete.zip\nZIP\nCriei um exemplo de estrutura de de entregavel padrao. working bacworkds and delvery me an plan of how to crate eather an cmd,promtp,scriprty to add to an New porjct clleed: #The refactor — the idea is: having this delvery as qaulity bar and oput requirments to  convert other fammlis of skill and docuemnts to an structre like that befor publish\n05:23\nClaude respondeu: Now I have a deep read on every layer of the suite.\n\nMapeou estrutura padrão e projetou plano CMD para refatoração\nMapeou estrutura padrão e projetou plano CMD para refatoração\nNow I have a deep read on every lay\nDOCS (11 items):\n  - unnamed: \n```yaml\nname: CMD v3 Orchestrator\nprinciple: \"Complexity at capability layer, simplicity at interface layer\"\n\nflow:\n  layer_1_intake: \"3-question interactive Q&A (mandatory)\"\n  layer_2_routing: \"Cyne\n  - unnamed: \nhttps://claude.ai/share/82c5f22a-4bba-4d71-ba10-d6d963c91fc9\n\nTODO\n\n![[files 6 1.zip]]\n\n\n\n# ![[cmd-v3-orchestrator.zip]]======![[publication-complete.zip]]======================================\n# TRI\n  - unnamed: # SCAN INDEX — V-20260509\n> Full MECE top-down inventory · All uploaded archives + .skill files\n> Generated by: CMD-PORTFOLIO-ORGANIZER scan pass\n\n---\n\n## LAYER 0 — SOURCE FILES (what was uploaded)\n\n|\n\n======================================================================\n[ZIP1] AI -ACT - BRASIL\nDESC: \nPROMPT_TEMPLATE (5100 chars):\n# TAXONOMY PIPELINE TEMPLATE\n\n## Reusable workflow for processing file type groups into queryable databases\n\n-----\n\n## Phase Status\n\n|Group                        |Files|Chars|Status                        |Index File                     |Corpus File                 |\n|-----------------------------|-----|-----|------------------------------|-------------------------------|----------------------------|\n|TEXT (md/txt/yaml/py/json/sh)|186  |~1.4M|✅ DONE                        |`PROJECT_INSTRUCTIONS_INDEX.md`|`TEXT_CORPUS_FULL_CAPPED.md`|\n|WEBARCHIVE                   |8    |2.9M |🔄 NEXT          \nDOCS (14 items):\n  - unnamed: Agente Businnes editorial \n\nV-20260513-001 — eBook Executivo — #strategy #content — Draft\nID\tChat Name\tType\tFrame\tQuestion\tOutput\tData/Metric\tOwner\tPriority\tStatus\tTags\nT-001\teBook Executivo\tPlan\tThou\n  - unnamed: V-20260510-003 — Frameworks Determinísticos + Claude — #ai #workflow — Draft\n\nTÍTULO\n\nFrameworks determinísticos reduzem alucinação e aumentam performance no trabalho com Claude?\n\n  \n\nSUBTÍTULO\n\nProfi\n  - unnamed: V-20260510-002 — Formulário Stack Influencer — #workflow #growth — Active\n\n|   |   |   |   |   |   |   |   |   |   |   |\n|---|---|---|---|---|---|---|---|---|---|---|\n|ID|Chat Name|Type|Frame|Question\n\n======================================================================\n[ZIP1] FINAL AI act Brasil \nDESC: \nPROMPT_TEMPLATE (11398 chars):\n# PROJECT INSTRUCTIONS — Review Journal · Leonardo\n## Claude Operating Context v1.0 · 2026-05-13\n\n---\n\n## 0. WHO YOU ARE IN THIS PROJECT\n\nYou are the execution partner for Review Journal — Leonardo's editorial and AI literacy platform.\n\n**Your role:** Produce Gold-standard content assets using the files in this project as your operating context. You do not plan. You do not ask questions that can be answered from files. You execute and deliver.\n\n**Owner:** Leonardo | AI Workflow Researcher | LLM Governance Analyst\n**Brand:** Review Journal\n**Canonical thesis:** The next competitive advantage wi\nDOCS (8 items):\n  - unnamed: #\n| ID | Chat Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags |\n|---|---|---|---|---|---|---|---|---|---|---|\n| D-023 | Content Operating System 2027 | Analysi\n  - unnamed: [\n  {\n    \"id\": \"001\",\n    \"filename\": \"1_-Personalizacao_e_Frameworks.md\",\n    \"extension\": \"md\",\n    \"type\": \"TEXT\",\n    \"classification\": \"CANONICAL\",\n    \"chars\": 27131,\n    \"hash\": \"19b670f8\",\n  \n  - unnamed: <!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>PRAXIS.OS — Onboarding Workbook</title>\n<link rel=\"preconne\n\n======================================================================\n[ZIP1] [Projeto unico] AI gov brasil 15/05\nDESC: \nPROMPT_TEMPLATE (1515 chars):\nArquitetura do workbook\n│\n├─ 01_CMD ··························· Instruções operacionais para próxima sessão\n├─ 02_STRATEGIC_READ ················ Leitura estratégica: o que é forte, o que precisa reframe, 3 decisões confirmadas\n├─ 03_BRAND_IDENTITY ················ Q-001 a Q-010: nome, domínio, handle, tipo, missão, visão, valores, thesis\n├─ 04_POSITIONING ··················· Known for, categoria, problema, ICP, promessa, diferenciação, enemy, statement\n├─ 05_ICP ··························· Audiência primária/secundária, nível técnico, roles, setores, dores, JTBD, canais\n│\n├─ 06_DECISIONS ····\nDOCS (1 items):\n  - unnamed: Based on your 90-day editorial plan, your first three publications are:\nD1: Claude Configuration Guide (Day 1-7)\nFormat: Newsletter + GitHub READMETitle: “The 5-Layer Claude Setup for AI Governance Op\n\n======================================================================\n[ZIP1] 18.05\nDESC: \nPROMPT_TEMPLATE (4564 chars):\nTÍTULO: Workflow de pré-pesquisa, varredura de base e preenchimento de planilha para artigo científico-operacional\n\nPAPEL DO AGENTE\nVocê é um pesquisador sênior, analista de evidências e auditor metodológico. Sua missão é raciocinar por work backwards a partir do objetivo final do artigo e construir, validar, refinar e preencher a base de pesquisa com rigor de gold standard.\n\nOBJETIVO FINAL\nAjudar a construir um artigo baseado em evidências sobre a hipótese de que contas de IA profissionalmente estruturadas, com letramento em IA, personalização, Skills, frameworks determinísticos e conectores,\nDOCS (3 items):\n  - unnamed: \nEstrutura do artigo:\n\n1. Tese\n2. Contexto e problema\n3. Definições dos termos\n4. Hipótese\n5. Método e dados\n6. Métricas\n7. Resultados\n8. Limitações\n9. Implicações práticas\n10. Framework aberto / próx\n  - unnamed: A ilusao de performance. \n\nDoes structured AI account design measurably improve deliverable output and reduce rework compared with unstructured usage?\n\nKnowledge workers, educação, pesquisa, escrita, \n  - unnamed: <!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n<meta charset=\"UTF-8\"/>\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/>\n<title>A-Z da AI Literacy & AI Fluency</title>\n\n<!-- ══ THEME-FA\n\n======================================================================\n[ZIP2] DB_BENCH_01     -07/05. \nDESC: \nPROMPT_TEMPLATE (1303 chars):\n---\n\n## ✅ Delivered — Reusable CMD Workflow\n\n| File | Purpose | Use Case |\n|---|---|---|\n| **QUICK_START_CARD.md** | Your daily driver — exact message to send, files to upload, activation steps | Paste this into each new taxonomy project |\n| **TAXONOMY_PIPELINE_TEMPLATE.md** | Full pipeline spec — Extract → Classify → Delimit → Index → CMD-enable | Reference for understanding the workflow |\n\n---\n\n## How to Use (Next WEBARCHIVE Run)\n\n**1. Create new Project:** `X-RAY — WEBARCHIVE Taxonomy Pipeline`\n\n**2. Upload 2 files:**\n- Source ZIP with .webarchive files\n- `TAXONOMY_PIPELINE_TEMPLATE.md`\n\n**\nDOCS (19 items):\n  - unnamed: README \n\n\nI treated this as the primary portfolio slot Workflow / automação, with secondary evidence for product, code, cloud/architecture, prompt/agent, and documentation. The case demonstrates the c\n  - unnamed: README \n\n\n\n\n\n——————————————————————————————————————————————————————————\n\nSim — V2 incluído. Abaixo está o Case Study atualizado, já normalizado para portfólio, com análise MES = Mercado · Engenharia ·\n  - unnamed: Skill / agente topic:\nOrquestrador X-Ray para consultoria PME com gates epistêmicos\nUse este para o slot 4 — Prompt / skill / agente, porque é o mais forte como agente: tem comandos, roteamento, gates\n\n======================================================================\n[ZIP2] How to use Claude\nDESC: An example project that also doubles as a how-to guide for using Claude. Chat with it to learn more about how to get the\nPROMPT_TEMPLATE (0 chars):\n\nDOCS (1 items):\n  - unnamed: \n# Claude prompting guide\n\n## General tips for effective prompting\n\n### 1. Be clear and specific\n   - Clearly state your task or question at the beginning of your message.\n   - Provide context and det\n\n======================================================================\n[ZIP2] REPOSITORIO \nDESC: \nPROMPT_TEMPLATE (3235 chars):\nSim. Sua decisão está correta: um projeto só + arquivos separados + Project Instructions como router. Isso reduz contexto e evita trocar entre projetos.\n\nCole isto em Project Instructions:\n\nSYSTEM: CASE_STUDIES_ROUTER_V1\nDefault language: respond in the user’s language. Default length: max 600 words unless user asks for artifact/script. Always use concise framework thinking, MECE structure, and no-inference discipline.\nCORE RULE:\nDo not load or reason over all project knowledge by default. First route the request using IDs. Then search only the relevant project files, workflows, styles, and CM\nDOCS (10 items):\n  - unnamed: Fiz o processamento seguro do todo.zip usando a lógica de inventário → validação → extração em cópia.\n\nArquivo final reorganizado:\n\nBaixar ENVIAR_GPT_REORGANIZADO.zip￼\n\nResultado da auditoria:\n\nZips i\n  - unnamed: CMD_PROJECT: portfolio_case_studies_v2\n\nPurpose: Build evidence-based portfolio case studies for GitHub/publication.\n\nDefault behavior:\n1. Classify the case first: product, code, cloud architecture, p\n  - unnamed: CMD_PROJECT: skills_workflow_engineering_v2\n\nPurpose: Convert prompts, workflows, and methods into reusable Claude Skills, SOPs, and automation-ready packages.\n\nDefault behavior:\n1. Normalize loose in\n\n======================================================================\n[ZIP2] DATA CLEAN LEARNING (index)\nDESC: \nPROMPT_TEMPLATE (1 chars):\n…\nDOCS (6 items):\n  - unnamed: \n# This file is read automatically by Claude Code every time you run `claude` in this folder.\n# You never need to edit this file unless you want to change the workflow.\n\n## Who you are\nYou are an auto\n  - unnamed: # Canonical Matrix — X-RAY System\n\n## Summary\n\n| Metric | Value |\n|--------|-------|\n| Total files analyzed | 262 |\n| Total characters | 4,393,043 |\n| **Canonical** | 128 (48.9%) |\n| **Duplicate** | 9\n  - unnamed: # X-RAY CANONICAL INDEX\n## CMD syntax: GET --id N[,N] | GET --role ROLE --family FAM [--limit N] | BUNDLE --ids N,N,N --format md\n## ID | filename | ext | family | role | cls | chars\n001|SKILL.md|md|m\n\n======================================================================\n[ZIP2] TEXT_DATA_BASE -= Last-update: 06/05/26\nDESC: GET --id 014,016,037 → 3 full files\nGET --tag SKILL --family x-ray-pme → all PME skills\nGET --role template --limit 5 → \nPROMPT_TEMPLATE (9241 chars):\n## What was built — risks flagged — 3 tested examples\n\n### Delivered\n\n`PROJECT_INSTRUCTIONS_INDEX.md` — 7KB — ready to paste into Project Settings.\n\nIt contains the full compact index (133 canonical docs), CMD syntax spec, and the 3 examples below. Claude reads it in every conversation and knows the full ID→filename→family→role mapping without you re-uploading anything.\n\n**How to activate:** Go to Project Settings → Project Instructions → paste the file content. Then upload `TEXT_CORPUS_COMPACT.md` as a project knowledge file. That's the full setup.\n\n---\n\n### 3 tested examples (validated again\nDOCS (5 items):\n  - unnamed: # CORPUS GPT — X-RAY / RAW / OURO\n\nDeduplicado por hash de texto; use `text_inventory.csv` para rastreio.\n\n\n\n---\n\n## DOC 001 — expanded_unique_zip::claude-code-multiagent-research__566a4ecff75b/claude\n  - unnamed: \n### Daily workflow (2 steps)\n\n1. Open this project → type `GET --id 014,037,166`\n2. Claude finds the DOC blocks in the uploaded corpus and returns clean markdown\n\n\n\n## The Plan — 200 words\n\n**Core in\n  - unnamed: # Canonical Matrix — X-RAY System\n\n## Summary\n\n| Metric | Value |\n|--------|-------|\n| Total files analyzed | 262 |\n| Total characters | 4,393,043 |\n| **Canonical** | 128 (48.9%) |\n| **Duplicate** | 9\n\n======================================================================\n[ZIP2] Desing e info produto \nDESC: \nPROMPT_TEMPLATE (0 chars):\n\nDOCS (1 items):\n  - unnamed: # COPY-PASTE READY: Claude.ai Power User Setup\n# Tempo: 3h setup → ROI <1 semana → 250h/ano economizadas\n\n# ============================================\n# PASSO 1: PROFILE PREFS (15 min)\n# ===========\n\n======================================================================\n[ZIP2] Research 07-05\nDESC: Done def ?\nPROMPT_TEMPLATE (6700 chars):\n\n    \n    MANDATORY QUALITY BAR (Every response):\n    1. Decomposition over decoration - Variables, constraints, dependencies first\n    2. Framework routing - MECE, Inversion, JTBD, 5W2H (justify choice)\n    3. Epistemic discipline - Tag: FACT | HYPOTHESIS | INFERENCE | GAP\n    4. Concise structured - 300-600w default\n    5. Source of truth - Cite sources, mark unknowns\n    6. Actionable outputs - Executable steps, not vague advice\n    \n    ANTI-PATTERNS (Never do):\n    - Over-format with excessive bullets\n    - Invent data/metrics without evidence\n    - Apply frameworks mechanically\n    - Pro\nDOCS (3 items):\n  - unnamed: CMD: claude_ai_power_user_setup_v2\nVERSION: 2.0\nPURPOSE: Token-efficient daily Claude.ai configuration for power users\nSOURCE: Anthropic official docs + V2 personalization framework\n\n## DO: Token Effi\n  - unnamed: # V2 — Global User Preferences\n# Personalization layer for portfolio + data analyst workflows\n\n## Identity & Context\n**Role**: Consultant / Knowledge operator / Data analyst hybrid  \n**Primary work**:\n  - unnamed: CMD: claude_projects_naming_standardization_v1\nVERSION: 1.0\nPURPOSE: Padronizar nomes e estrutura de Projects no Claude.ai para max ROI\nSOURCE: Antropic docs + análise das suas 8+ Projects atuais\n\n## \n\n======================================================================\n[ZIP2] DB_BENCH_2-07-05\nDESC: \nPROMPT_TEMPLATE (1303 chars):\n---\n\n## ✅ Delivered — Reusable CMD Workflow\n\n| File | Purpose | Use Case |\n|---|---|---|\n| **QUICK_START_CARD.md** | Your daily driver — exact message to send, files to upload, activation steps | Paste this into each new taxonomy project |\n| **TAXONOMY_PIPELINE_TEMPLATE.md** | Full pipeline spec — Extract → Classify → Delimit → Index → CMD-enable | Reference for understanding the workflow |\n\n---\n\n## How to Use (Next WEBARCHIVE Run)\n\n**1. Create new Project:** `X-RAY — WEBARCHIVE Taxonomy Pipeline`\n\n**2. Upload 2 files:**\n- Source ZIP with .webarchive files\n- `TAXONOMY_PIPELINE_TEMPLATE.md`\n\n**\nDOCS (19 items):\n  - unnamed: Com base no texto, eu classificaria isso como Case 4 — Prompt / skill / agente, porque o valor principal está no método: checar alegações sobre modelos de IA contra documentação pública, separar versã\n  - unnamed: Use estas decisões como especificação final da Empower V4.\n\n1. Formato de input primário\n\nFormato canônico recomendado:\n\nCSV ou JSONL normalizado de interações\n\nNome esperado:\n\nai_interaction_canonica\n  - unnamed: Portfolio Thesis\n\nCrio workflows de IA seguros e avaliáveis que transformam prompts, imagens e automações em execução controlada sem desenvolver software.\n\n⸻\n\nCase sugerido\n\nSlot: 4 — Prompt / skill /\n\n======================================================================\n[ZIP2] LEO’S ACADEMY - ORACIO - CROSS DATA \nDESC: \nPROMPT_TEMPLATE (3736 chars):\npense passo a passo demostre raciocione para estrtura completa entre o plano em portgues ——— # CMD — Strategic Output Quality Bar\nYou are a Strategic Workflow Agent.\nYour job is to transform fragmented knowledge, documents, chats, and user intent into an executable, printable, data-driven plan.\n## 1. Core Mission\nDo not produce generic advice.\nProduce a plan the user can:\nPRINT → RUN → TRACK → ITERATE\n## 2. Mandatory Input Behavior\nBefore generating the plan, scan and structure all available inputs:\n- user goal\n- uploaded docs\n- screenshots\n- chat history\n- project files\n- `/mnt/skills`\n- avai\nDOCS (34 items):\n  - unnamed: Você diagnosticou bem o problema. O seu gargalo não é “saber promptar melhor”. É gestão de contexto, fontes, versões, evidências e ativação de workflows. Em 2026, isso é mais próximo de context engine\n  - unnamed: A leitura correta é: há oportunidade, mas ela não deve ser validada só pela hipótese “Anthropic vem ao Brasil, então haverá demanda”. Você precisa montar um funil de evidências: mercado → ICP → demand\n  - unnamed: Normalizando o pedido antes de executar.\nVocê tem três objetivos distintos aqui: (1) entender quem é o ICP real da Anthropic com dados verificáveis, (2) validar se existe oportunidade de curso no Bras\n\n======================================================================\n[ZIP2] 08-05 - HORACIO FINAL DELIVERYS \nDESC: course explmes: be guided with     /product-self-knowledge  mains knowldge is:  a) Claude.ai for dayle use,intelgent wor\nPROMPT_TEMPLATE (12909 chars):\nV-20260508-006 — Horácio Clone Source Instruction — #workflow #claude — Final\n\nV-20260508-006 — Horácio Clone Source Instruction — #workflow #claude — Final\n# CMD-HORACIO-000-CLONE-SOURCE-TRUTH\nRole:\nYou are Horácio Operating Partner running inside Claude/Opus.\nMode:\nPlan-first. Do not execute external actions yet. Do not create files yet. Do not call connectors yet. First normalize, structure, and deliver the complete operating plan.\nSource of truth:\nThis command is the root source of truth for the Horácio project. Everything must derive from this instruction unless the user explicitly supers\nDOCS (5 items):\n  - unnamed: course explmes: be guided with     /product-self-knowledge  mains knowldge is:  a) Claude.ai for dayle use,intelgent workflows - B) RAG persitent in mnt/projects  c) token’s strategy — d) best practic\n  - unnamed: V-20260508-005 — Horácio Final Normalized CMD — #workflow #agents — Final\n\ncmd:\n  id: \"CMD-HORACIO-000-SOURCE-TRUTH-V3\"\n  title: \"Horácio Final Normalized CMD\"\n  status: \"final\"\n  version: \"V3\"\n  lang\n  - unnamed: \nYou are Horácio Operating Partner running inside Claude/Opus.\nMode:\nPlan-first. Do not execute external actions yet. Do not create files yet. Do not call connectors yet. First normalize, structure, a\n\n======================================================================\n[ZIP2] Normali 08/05\nDESC: \nPROMPT_TEMPLATE (5081 chars):\nChat 04. - THINK DEEPLY - WORKBACKWORD - FULLY MECE SACN MANDATORY TOP DOWN. loop necessari. Now task: ansewr this fundamental straty question ? how reorganize without change strturint layers,of narrative,plain text,swot,tasks,tabular etc… in to an xls workbook. without changin. reprganizens info and strature knowlge ? think come bak with a porpuset . whats its the safety 3 steps workflows for that ?\n10:53\nClaude respondeu: V-20260508-023 — XLS Reorganization Strategy — #ops #workflow — Active\n\nArchitected taxonomy-based XLS migration preserving document structure layers safely\nArchitected tax\nDOCS (1 items):\n  - unnamed: https://chatgpt.com/share/69fde767-0bc8-83e9-8b61-3d3ce45f7908\nest Practical Fix  \nUse this as the FIRST line of every new chat:  \nV-20260507-001 — Horácio Strategic Structure — #strategy #ai — Draft \n\n======================================================================\n[ZIP2] 08/05 - RAG ORACIO \nDESC: \nPROMPT_TEMPLATE (11448 chars):\n# Horácio V3 — Project Instructions\n# CMD-HORACIO-000-SOURCE-TRUTH-V3 | V-20260508-007\n\n---\n\n## IDENTITY\n\nYou are **Horácio Operating Partner**.\n\nOperate as:\n- Executive strategist\n- Workflow architect\n- RAG normalizer\n- Decision intelligence analyst\n- Agent-to-agent handoff interpreter\n- Research synthesis partner\n- Content operating partner\n\nYour purpose is not to produce generic answers.\nYour purpose is to transform every input into **reusable operational intelligence**.\n\n---\n\n## CORE THESIS\n\n**Horácio = Operational AI System for Non-Technical Knowledge Workers.**\n\nThe moat is: decision arc\nDOCS (2 items):\n  - unnamed: # 1_Master_Index.md — Horácio Operating System\n# CMD-HORACIO-000-SOURCE-TRUTH-V3 | V-20260508-007\n# Status: FINAL | Update after every major session\n\n---\n\n## THESIS\n\n**Horácio = Operational AI System \n  - unnamed: # 4_Decision_Trace_Log.md — Horácio Decision Audit Trail\n# CMD-HORACIO-000-SOURCE-TRUTH-V3 | V-20260508-007\n# Trigger: #Decision-trace | Workflow: WF_04\n\n---\n\n## HOW TO USE\n\nEvery strategic decision g\n\n======================================================================\n[ZIP2] 09-05-2026 - FINAL DELIVERS - FASE 1.\nDESC: DESENVOLVER; A) MODEL PADRAO = #BLOG #MEDIUM #LINKEDIM #X #ETC.. MEU TOM MINHA LINGUAGEM — gerar srcipty para lote. !!!!\nPROMPT_TEMPLATE (77309 chars):\nxray-suite-v1-complete.zip\nZIP\nCriei um exemplo de estrutura de de entregavel padrao. working bacworkds and delvery me an plan of how to crate eather an cmd,promtp,scriprty to add to an New porjct clleed: #The refactor — the idea is: having this delvery as qaulity bar and oput requirments to  convert other fammlis of skill and docuemnts to an structre like that befor publish\n05:23\nClaude respondeu: Now I have a deep read on every layer of the suite.\n\nMapeou estrutura padrão e projetou plano CMD para refatoração\nMapeou estrutura padrão e projetou plano CMD para refatoração\nThe user uploaded a z\nDOCS (50 items):\n  - unnamed: \nV-20260508-026 — AI Workflow Evidence  Plan — #strategy #growth — Active\n\nDirect answer\n\nDo not monetize first as “content creator” or “Claude ambassador.” Monetize first as a productized AI workflow\n  - unnamed: V-20260508-024 — AI Workflow Evidence Lab v2 — #project #execution — Active\n\n  \n\nCreated a professional GitHub-ready v2 package with no Orácio/Horácio naming. The public repo name is:\n\nai-workflow-evi\n  - unnamed: NEED TO STRUCTRE : \n\n======================================================================\n[ZIP2] AUDITORIA LEOS portifolio \nDESC: \nPROMPT_TEMPLATE (4295 chars):\nV-20260509-001 — CMD Organização de Portfólio — #workflow #validation — Draft\n\nID\tChat Name\tType\tFrame\tQuestion\tOutput\tData/Metric\tOwner\tPriority\tStatus\tTags\nCMD-PORT-001\tPortfolio Router\tPlan\tCynefin + MECE\tComo organizar descobertas, skills e teses sem ruído?\tCMD operacional\tScore, risco, estágio\tLeonardo\tAlta\tDraft\t#workflow #strategy #validation\n\nCMD-PORTFOLIO-ORGANIZER · Portfolio Router\n\nObjetivo\n\nTransformar qualquer lote de ideias, skills, prompts, documentos, teses, descobertas ou workflows em um portfólio organizado, auditável e priorizado, sem preencher JSON manualmente.\n\nO sistema \nDOCS (13 items):\n  - unnamed: Sim — é uma boa ideia exportar tudo, mas não é boa ideia unir tudo em um prompt gigante.\n\n  \n\nA melhor opção é:\n\nExportar conversas → normalizar em dataset → rodar scanner por padrões → gerar perfil +\n  - unnamed: \n## REFLEXÃO PRÉ-PESQUISA · ANÁLISE METACOGNITIVA\n\n### CAMADA 1 · O QUE LEONARDO QUER?\n\n**EXPLÍCITO**: Comando de pesquisa determinístico que gere dados numéricos (85%) + inferências (15%) para valida\n  - unnamed: A leitura correta é: Horácio não deve ser vendido como “mais um BI” nem como “um ChatGPT com dados”. A narrativa forte é outra:\n\nHorácio é um oráculo operacional de mercado: você faz uma pergunta de n\n\n======================================================================\n[ZIP2] 13-05 - Editorial \nDESC: \nPROMPT_TEMPLATE (8846 chars):\n# PROJECT TAXONOMY AUTO-PROCESSOR CMD\n## Paste this into Project Instructions to auto-process all files\n\n---\n\n## CMD: /TAXONOMY-SCAN-ALL\n\n**Usage:** Type `/TAXONOMY-SCAN-ALL` in any new project to trigger full pipeline\n\n---\n\n## Phase 1: SCAN & CLASSIFY (Auto-detect all file types)\n\n**Actions:**\n1. **Scan `/mnt/project/`** — List all files recursively\n2. **Group by extension** — md, txt, yaml, html, webarchive, pdf, xml, json, py, sh, jsx, etc.\n3. **Count metrics** — File count, total chars, % of corpus per type\n4. **Classify each file:**\n   - **CANONICAL:** Unique content, >500 chars, primary \nDOCS (18 items):\n  - unnamed: Modelo 2 \n\n￼\n￼\n￼\n￼\n￼\n￼\n\n————————————————————————————————————————————————————————————————————————————————————————\n￼\n￼\n￼\n￼\n￼\n￼\n￼\n￼\n￼\nV-20260510-003-v2 — Frameworks Determinísticos + Claude — #ai #workfl\n  - unnamed: Agente Businnes editorial \n\nV-20260513-001 — eBook Executivo — #strategy #content — Draft\nID\tChat Name\tType\tFrame\tQuestion\tOutput\tData/Metric\tOwner\tPriority\tStatus\tTags\nT-001\teBook Executivo\tPlan\tThou\n  - unnamed: V-20260513-004 — Prompt OCR Cap. 2 Watkins — #workflow #data — Active\n\n|   |   |   |   |   |   |   |   |   |   |   |\n|---|---|---|---|---|---|---|---|---|---|---|\n|ID|Chat Name|Type|Frame|Question|Out\n\n======================================================================\n[ZIP2] 14/05\nDESC: \nPROMPT_TEMPLATE (10694 chars):\n# AI Gov Brasil — Opus Project Custom Instructions\n**Paste this into: Claude.ai → Project → Instructions**\n**Model: Claude Opus 4.6 · Extended Thinking ON · Web Search ON**\n\n---\n\n## WHO YOU ARE IN THIS PROJECT\n\nYou are the strategic architect and operating system designer for AI Gov Brasil — a brand, GitHub repository, content operation, and Anthropic ambassador candidate built by Leonardo Batista (Brazil).\n\nYou are not a form-filler. You are a reasoning partner with full access to the project corpus. Your job is to synthesize, challenge, expand, and deliver the highest-quality strategic outpu\nDOCS (13 items):\n  - unnamed: [\n  {\n    \"id\": \"001\",\n    \"filename\": \"1_-Personalizacao_e_Frameworks.md\",\n    \"extension\": \"md\",\n    \"type\": \"TEXT\",\n    \"classification\": \"CANONICAL\",\n    \"chars\": 27131,\n    \"hash\": \"19b670f8\",\n  \n  - unnamed: \n----- ID001_1_-Personalizacao_e_Frameworks.md_transcript.txt -----\n\nGlobal \n\nIMPORTANT — Business Thesis Vault Mode\n\nOperate as a table-first Business Thesis Vault assistant.\n\nEvery new project chat \n  - unnamed: Referências\n\nPara mais informações, acesse as referências abaixo:\n\n|   |   |   |\n|---|---|---|\n|Tema|Referência|Uso no texto|\n|AI Act / AI Literacy|Artigo 4 do AI Act e materiais sobre letramento em I\n\n======================================================================\n[ZIP2] 16/05 \nDESC: \nPROMPT_TEMPLATE (2724 chars):\n# AI Gov Brasil — Opus G22 Gate Analysis\n## Project Instructions · Claude Opus 4.6 · Extended Thinking ON · Web Search ON\n\n---\n\n## YOUR ROLE\n\nYou are the strategic auditor for the AI Gov Brasil ecosystem — 20 GitHub repositories, 100+ Claude Skills, and a solo creator-operator (Leonardo Batista, Brazil) who needs honest commercial and innovation assessment before going to market.\n\nYou are not a form-filler. You are a gate-sequenced reasoning partner. You stop at each gate, deliver output, and wait for Leonardo's approval before proceeding.\n\n## OPERATOR DESIGN RULES\n\n- Start with substance. No \nDOCS (1 items):\n  - unnamed: # V-20260516-001 — AI Gov Brasil GTM Sprint Structure\n## Interaction Log · Sonnet 4.6 · 2026-05-16\n## Status: Active · Owner: Leonardo · Type: Strategic Planning\n\n---\n\n## EXECUTIVE DIAGNOSIS (what is \n","stderr":""}
Tenho o mapeamento completo. Agora entrego o **Master Index Plan** — antes de qualquer execução.
File created successfully: /mnt/user-data/outputs/master-index-plan.txt
**Master Index Plan entregue. Gate pendente.** Aqui está o resumo do que o scan encontrou e o que está aguardando você antes do STEP 2:

**O que foi escaneado:** 56 projetos, ~50MB de JSON, 2 contas, período 27/04–18/05/2026. Os arquivos são Project Instructions + docs — não chat_messages (exceto ZIP2/conversations.json que tem 16MB e ainda não foi lido em profundidade).

**8 clusters MECE identificados:** System Design, CMD/Deterministic Commands, Workflow Engineering, Epistemic Discipline, Personalization Architecture, Skills Assets, Governance/AI Literacy, Research Pipelines.

**6 projetos GOLD sinalizados** para extração profunda: AURELIO OS (BENCH-003), Horácio V3 (3 projetos), TEXT_DATA_BASE (CMD syntax pura), FINAL AI ACT BRASIL, COMANDO MESTRE (Research), Quality Bar (Research 07-05).

**6 gates de decisão** antes do STEP 2 (D-001 a D-006 na Seção 8 do plano). O mais crítico: **D-002 — Rogerinho/Toni/Aurelio são personas fictícias ou clientes reais?** Isso define o nível de redação antes de qualquer publicação.

**Confirme os gates e o STEP 2 executa:** extração profunda dos 6 projetos GOLD com 30–50 candidatos brutos, scoring 8D, e seleção dos exemplos para os teaching cards.

---

**Você** _2026-05-18_

quais seriam os 3 framerks mais adequados para em 500 palavracrs descrevr: como leoanrdo usa claude,seu nivel,pq leoanrdo e avacando,suas tecnicas,exemplos,etc.. ?

---

**Claude** _2026-05-18_

Baseado no que li nos exports, aqui estão os 3 mais adequados — e o porquê de cada escolha:

---

**Framework 1 — AI Fluency 4D (Anthropic)**
*Delegation · Description · Discernment · Diligence*

É o âncora institucional. Leonardo demonstra os 4D de forma consistente: **Delegation** — sabe exatamente o que transfere ao Claude e o que retém para si; **Description** — usa `<role>`, `<context>`, `<rules>` com precisão cirúrgica; **Discernment** — separa FATO de HIPÓTESE em todo output, nunca aceita o primeiro rascunho como verdade; **Diligence** — quality gates, writeback, decision trace, revisão humana obrigatória antes de executar.

Usa para: posicionar o método dele dentro de vocabulário Anthropic-compatível. Legítimo, ensinável, publicável.

---

**Framework 2 — Dreyfus Model of Skill Acquisition**
*Novice → Advanced Beginner → Competent → Proficient → Expert*

É o melhor para explicar **nível e trajetória**. A maioria dos usuários de Claude está em *Competent* — consegue completar tarefas com prompts razoáveis. Leonardo opera em *Proficient → Expert*: não segue regras, reconhece padrões, adapta o sistema ao contexto.

O sinal mais claro: ele não "prompta" — ele **projeta sistemas**. O BENCH-003 com 23 docs, o Horácio V3 com 5 reference files carregados sob demanda, o CMD syntax com GET/BUNDLE/TAG — isso é Expert-level pattern recognition aplicado a design de agentes.

Usa para: mostrar onde Leonardo está na curva, por que avança mais rápido, e o que o leitor precisa percorrer para chegar lá.

---

**Framework 3 — DIKW Pyramid (Data → Information → Knowledge → Wisdom)**
*Rowley, 2007 — padrão em AI governance e knowledge management*

É o mais preciso para capturar a **disciplina epistêmica** que distingue Leonardo da maioria. Ele não para em *Data* (outputs do Claude) nem em *Information* (textos organizados). Ele empurra tudo até *Knowledge* (decisões rastreáveis, vault entries, decision trace) e às vezes até *Wisdom* (quando o método vira skill reutilizável para outros).

A evidência está no corpus: `1_Master_Index.md`, `4_Decision_Trace_Log.md`, `GAPS`, `REFERENCIAS_ABNT` — é uma arquitetura DIKW explícita. O Claude processa *Data → Information*; Leonardo cuida de *Information → Knowledge → Wisdom* com gates humanos obrigatórios.

Usa para: explicar por que o método dele é seguro e auditável — não é automação cega, é elevação epistêmica com revisão humana em cada transição.

---

**Por que esses 3 juntos funcionam em 500 palavras:**

| Framework | Responde | Parágrafo |
|-----------|----------|-----------|
| 4D Anthropic | *Como* ele usa / *quais técnicas* | 1 |
| Dreyfus | *Qual nível* / *por que avança* | 2 |
| DIKW | *Por que funciona* / *exemplos concretos* | 3 |

Estrutura sugerida: tese (50 palavras) + 1 parágrafo por framework (120 palavras cada) + síntese (90 palavras) = 500 exatos. Quer que eu escreva?

---

**Você** _2026-05-18_

sim

---

**Claude** _2026-05-18_

File created successfully: /mnt/user-data/outputs/leonardo-method-500w.md
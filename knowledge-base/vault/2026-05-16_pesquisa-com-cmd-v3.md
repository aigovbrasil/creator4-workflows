---
title: "Pesquisa com CMD V3"
date: 2026-05-16
account: executar.leonardo@gmail.com
uuid: d767f569-d532-4732-9a3f-bc8895c94870
messages: 12
tags: []
context: ""
---

**Claude** _2026-05-16_

Escopo claro e bem especificado — vou iniciar a pesquisa completa agora com o CMD V3 intacto.
{"task_id": "wf-dd7b329b-215b-474b-899c-8c1b3a4d5a68"}
Your evidence map for the V3 framework thesis is ready. It synthesizes 74 sources across 11 thematic clusters covering prompt engineering, persistent memory and personalization, Anthropic Skills/MultiSkill, cognitive scaffolding, multi-agent orchestration, semantic routing, human-in-the-loop gates, execution bridges (Jira/Atlassian), generative AI productivity RCTs, reusable playbooks, and the Brazilian labor-market context. Each source is coded for architecture layer (L0–L8), framework role, HITL support, multi-agent pattern, similarity dimensions, evidence type, and whether it supports or falsifies the thesis — surfacing strong falsification signals on universal prompt templates (S004, S005), persistent memory (S008, S012), multi-agent universalism (S029, S031–S034), auditability of chains (S033), naive HITL as "governance theater" (S043, S059), and inflated productivity narratives (S056–S058, S062), alongside direct support for scaffolded prompting (S003), semantic routing (S035–S036), orchestrator+specialist patterns (S027), and formal human gates (S040).
OK

---

**Você** _2026-05-20_

/cognitive-framework-router normalize essa pesquisa

---

**Claude** _2026-05-20_

1	---
     2	name: cognitive-framework-router
     3	description: >
     4	  Use this skill whenever the user wants to structure, research, decide, communicate,
     5	  plan, diagnose, prioritize, summarize, transform, or execute any knowledge work using
     6	  business, product, strategy, operations, or communication frameworks. Trigger on
     7	  natural-language phrases such as: "faça uma pesquisa", "preciso decidir", "monte um
     8	  plano", "resumo executivo", "transforme isso em", "comunicação para o time",
     9	  "diagnóstico", "priorização", "retrabalho", "plano de ação", as well as English
    10	  equivalents like "research this", "help me decide", "make a plan", "executive
    11	  summary", "prioritize", "structured output", or any mention of MECE, SCQA, JTBD,
    12	  Cynefin, OKR, 5W2H, RACI, AIDA, Eisenhower, Working Backwards, or A-Z framework.
    13	  Apply it also when the request is vague but clearly needs structured thinking — do
    14	  not wait for the user to name a framework.
    15	---
    16	
    17	# Cognitive Framework Router
    18	
    19	## Mission
    20	
    21	Transform natural-language user requests into clear, auditable, and executable outputs
    22	by silently applying the minimum viable combination of:
    23	
    24	1. **Anthropic 4D AI Fluency** — Delegation, Description, Discernment, Diligence
    25	2. **Leonardo 5D Operational Matrix** — Define, Dor, Design, Data-driven, Delivery
    26	3. **A-Z Framework Combination Router** — see `references/az-framework-catalog.md`
    27	4. **Pre-balance questionnaire** — only when missing context would cause rework
    28	5. **Working Backwards** — for execution-heavy or decision-heavy outputs
    29	6. **Minimum viable quality bar** — format, length, evidence, risk, next action
    30	
    31	## Reference Files
    32	
    33	Read these as needed — do not load all at once:
    34	
    35	| File | When to read |
    36	|---|---|
    37	| `references/4d-5d-quality-bar.md` | Always — defines the routing sequence and failure modes |
    38	| `references/az-framework-catalog.md` | When selecting frameworks from the A-Z catalog |
    39	| `references/routing-rules.md` | When choosing a framework combination for a given intent |
    40	| `references/output-contracts.md` | When finalizing the output format for any response type |
    41	| `templates/pre-balance-questionnaire.md` | When context is too thin to avoid rework |
    42	| `templates/working-backwards-brief.md` | When the request is execution- or decision-heavy |
    43	| `templates/response-blueprints.md` | When the user needs a specific artifact blueprint |
    44	
    45	## Operating Principle
    46	
    47	Act as a **cognitive routing layer**, not a prompt library.
    48	
    49	The user should never need to know which framework to request. Infer intent. Select the
    50	smallest useful combination. Do not overproduce frameworks — only add one if it changes
    51	the output.
    52	
    53	## Routing Sequence (apply silently)
    54	
    55	```
    56	Delegation → Define → Dor → Design → Data-driven
    57	→ Framework A-Z Router → Discernment → Delivery → Diligence
    58	```
    59	
    60	Full definitions and failure modes → `references/4d-5d-quality-bar.md`
    61	
    62	## Framework Selection
    63	
    64	Quick defaults (full table → `references/routing-rules.md`):
    65	
    66	| User intent | Combination |
    67	|---|---|
    68	| research / pesquisa | MECE + SCQA + evidence hierarchy |
    69	| decision / decidir | Cynefin + trade-off matrix + risk register |
    70	| communication / comunicação | SCQA + AIDA + audience framing |
    71	| planning / planejamento | Working Backwards + 5W2H + RACI |
    72	| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints |
    73	| prioritization / priorizar | Eisenhower + impact/effort + Theory of Constraints |
    74	| social post | SCQA + AIDA + one sharp thesis |
    75	| repository / system design | Working Backwards + modular architecture + evals |
    76	
    77	**Limits:** 2–3 frameworks default; up to 5 for complex execution. Never use all A-Z in
    78	one output unless the user asks for an educational A-Z artifact.
    79	
    80	Full A-Z catalog → `references/az-framework-catalog.md`
    81	
    82	## Pre-balance Questionnaire
    83	
    84	Ask **only** when missing context would produce rework. Max 5 questions.
    85	If the user asks to proceed, infer and label assumptions.
    86	
    87	```
    88	1. Objective — What decision, output, or action should this support?
    89	2. Audience — Who will read or use it?
    90	3. Depth — Short, standard, or deep?
    91	4. Evidence — Provided data, web sources, internal docs, or assumptions?
    92	5. Delivery — Table, memo, plan, checklist, JSON, or social post?
    93	```
    94	
    95	Full template → `templates/pre-balance-questionnaire.md`
    96	
    97	## Working Backwards Trigger
    98	
    99	Apply when the request involves: execution, product launch, project planning, public
   100	deliverable, workflow implementation, roadmap, repository generation, or sprint planning.
   101	
   102	Structure: desired end state → user/audience → success criteria → required artifacts →
   103	constraints and risks → reverse path → first next action.
   104	
   105	Full template → `templates/working-backwards-brief.md`
   106	
   107	## Output Quality Bar
   108	
   109	| Situation | Minimum format | Length |
   110	|---|---|---|
   111	| quick clarification | 3–6 bullets | short |
   112	| social post | hook + compact structure | 150–400 words |
   113	| executive decision | table + recommendation + risks | 300–700 words |
   114	| research / analysis | evidence + synthesis + gaps | medium/deep |
   115	| implementation | phases + tasks + dependencies | deep |
   116	| repository / system design | architecture + files + tests + evals | deep |
   117	
   118	## Output Discipline
   119	
   120	Every response must include, when relevant:
   121	
   122	- **Framework combination selected** and why
   123	- **Output** in the requested format
   124	- **Assumptions** if context was inferred
   125	- **Risks or limits** when output supports a decision
   126	- **Next action** if the user is building a system
   127	
   128	Output contracts per type → `references/output-contracts.md`
   129	
   130	## High-Stakes Caution
   131	
   132	For legal, medical, financial, HR, safety, compliance, or public regulatory outputs,
   133	mark clearly that the artifact is **decision support** and requires qualified human
   134	review before acting.
   135	
   136	## Non-Goals
   137	
   138	- Do not claim frameworks improve the model's internal reasoning
   139	- Do not present proprietary frameworks (e.g. 3P) as universal standards
   140	- Do not add jargon for non-developer users
   141	- Do not use a framework because its letter matches a word in the prompt
   142	- Do not ask a long questionnaire when assumptions are acceptable
   143	
     1	# Framework Routing Rules
     2	
     3	## Intent-first routing
     4	
     5	Do not choose frameworks alphabetically. Choose by intent, complexity, risk, and delivery format.
     6	
     7	## Default combinations
     8	
     9	| User intent | Framework combination | Output |
    10	|---|---|---|
    11	| research / pesquisa | MECE + SCQA + evidence hierarchy | Executive research synthesis |
    12	| decision / decidir | Cynefin + trade-off matrix + risk register | Decision brief |
    13	| communication / comunicação | SCQA + AIDA + audience framing | Clear message or post |
    14	| planning / planejamento | Working Backwards + 5W2H + RACI | Action plan |
    15	| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints | Root-cause diagnostic |
    16	| prioritization / priorizar | Eisenhower + impact/effort + Theory of Constraints | Priority matrix |
    17	| product/customer | JTBD + Kano + User Story Mapping | Customer/product insight |
    18	| strategy | First Principles + SWOT/PESTEL if requested + OKR/X-Matrix | Strategy map |
    19	| rework/process | Value Stream Mapping + 3P + Theory of Constraints | Rework reduction map |
    20	| execution handoff | 5W2H + RACI + Linear issue schema | Project/ticket plan |
    21	| social post | SCQA + AIDA + one sharp thesis | Publishable narrative |
    22	| repository/system design | Working Backwards + modular architecture + evals | Implementation-ready repo |
    23	
    24	## Complexity routing
    25	
    26	| Context | Prefer |
    27	|---|---|
    28	| clear / obvious task | 1–2 frameworks |
    29	| complicated expert task | 2–3 frameworks |
    30	| complex social/system task | Cynefin + hypothesis log + iterative plan |
    31	| chaotic urgent task | triage first, then decide framework |
    32	| high-stakes task | quality bar + human review + risk register |
    33	
    34	## Combination limits
    35	
    36	- Default: 2–3 frameworks.
    37	- Complex execution: up to 5.
    38	- Educational A-Z artifact: all frameworks allowed.
    39	- Never add frameworks that do not change the output.
    40	
    41	## Pre-balance trigger
    42	
    43	Ask questions only if missing context will likely cause rework.
    44	
    45	Ask no more than 5 questions. If the user asks to proceed, infer and label assumptions.
    46	
    47	## Output size routing
    48	
    49	| User signal | Output |
    50	|---|---|
    51	| "rápido", "curto", "só me diz" | 80–180 words |
    52	| "post", "LinkedIn", "redes" | 150–400 words |
    53	| "executivo", "decisão" | table + synthesis, 300–700 words |
    54	| "profundo", "completo", "repo" | structured deep output |
    55	| "JSON", "YAML", "CSV" | strict machine-readable output |
    56	
**Classificação do pedido:** research normalization → MECE + SCQA + evidence hierarchy

| ID | Tipo | Frame | Input | Output | Status |
|---|---|---|---|---|---|
| R-001 | Analysis | MECE + SCQA + Evidence Hierarchy | 74 fontes / 11 clusters JSON brutos | Mapa estruturado de suporte/falsificação por cluster | Active |

---

## Síntese Normalizada — Wide Research V3 (74 fontes / 11 clusters)

### Situação (S)
Você possui 74 fontes codificadas em schema JSON cobrindo os 11 clusters da Tese V3 do Cognitive Trigger Skill OS. O material está estruturado mas não sintetizado — falta a camada interpretativa que transforma JSON em argumento.

### Complicação (C)
A pesquisa revela tensão crítica: os clusters com **maior peso causal na tese** (C5 auditabilidade, C9 retrabalho) são exatamente os com **evidência mais fraca ou mais contraditória**. Os clusters de suporte mais fortes (C1 prompting, C6 roteamento semântico) suportam *inputs* do V3 mas não provam a *cadeia causal completa*.

### Questão (Q)
O que a evidência realmente sustenta, o que ela falsifica, e quais elos da cadeia causal V3 permanecem sem cobertura empírica adequada?

---

## Mapa MECE por Cluster

| Cluster | Fontes | Suporte | Falsificação | Evidência mais forte | Lacuna |
|---|---|---|---|---|---|
| **C1** Prompt Quality | S001–S007 | Parcial (6%–30% ganho, dependente de domínio) | S004, S005: inconsistência entre tarefas | S003 peer-reviewed médica | Sem RCT com métrica de retrabalho |
| **C2** Phase 0 / Persistência | S008–S013 | S009, S010, S013 (14% RCT) | **S008** (BenchPreS): misapplication em OOD; S012: memória indiscriminada propaga erros | S013 QJE RCT (Brynjolfsson) | Nenhum teste Phase0 isolado |
| **C3** Skills / SKILL.md | S014–S020 | S014–S018: documentação operacional sólida | **S019**: o próprio Anthropic aconselha "start simple" | Docs oficiais Anthropic | Zero benchmark de reprodutibilidade entre runs |
| **C4** Frameworks Cognitivos | S021–S026 | S021: scaffolding simbólico funciona | **S024**: falha em higher-order perspective-taking | S021 arXiv controlado | Nenhum estudo com MECE/5W2H/SCQA como intervenção explícita |
| **C5** Multi-Agent Orchestration | S027–S034 | S027 (100% vs 1.7% incidentes) | **S029, S031, S032, S033, S034**: cascata de erros; custo 2.3x; 41.8% falhas de spec; auditabilidade não resolvida | S029 NYU 10K SEC filings | Elo mais fraco — auditabilidade é *afirmada*, não demonstrada |
| **C6** Semantic Intent Detection | S035–S039 | S035, S036: ~50% redução latência | **S038, S039**: falha em queries ambíguas/aninhadas | S035 preprint controlado | Nenhum teste em contexto conhecimento-trabalho |
| **C7** HITL / Gates | S040–S046 | S040 (41→87% feasibility com gates formais) | **S043**: "governance theater"; S059: complacência | S040 arXiv formal MAS | Distinção gate formal vs rubber-stamp não operacionalizada |
| **C8** ExecBridge / Handoff | S047–S051 | S047–S050: artefatos operacionais existem | **S051**: AI output é ponto de partida, não entrega final | Atlassian docs | Nenhuma métrica de rework pós-handoff |
| **C9** Eficiência / Retrabalho | S052–S063 | S052–S055: 14–40% ganho (RCTs) | **S056–S060, S062**: 1.1% agregado; "workslop"; V&V overhead; Jagged Frontier | S058 CMR Berkeley meta-análise 37 estudos | **Elo mais fraco**: nenhum RCT compara V3 vs unstructured |
| **C10** Playbooks / Onboarding | S064–S067 | S064: overhead sem playbooks destrói produtividade | S065: maioria dos pilotos falha | Contextuais apenas | Sem ROI de playbook estruturado vs ad hoc |
| **C11** Brasil | S068–S074 | S072: 51.8% reportam ganhos, governança prioritária | **S069**: queda ocupação/renda jovens; frameworks anglo-saxões não testados no Brasil | S069 FGV IBRE PNAD | Nenhum estudo de AI literacy estruturada no Brasil |

---

## Síntese dos 4 Elos Causais V3

```
Phase0 + SemTrig → roteamento correto
   → framework adequado aplicado
   → output mais estruturado
   → gate humano valida com menor custo cognitivo
   → menos retrabalho → execução mais rápida
```

| Elo | Status evidencial | Fontes-chave |
|---|---|---|
| **L1** Phase0+SemTrig → roteamento correto | Suporte moderado com caveat | S035✅ S008⚠️ S038❌ |
| **L2** Framework aplicado → output estruturado | Suporte condicional (domínio-dependente) | S003✅ S004⚠️ S024❌ |
| **L3** Output estruturado → gate valida com menor custo | **Sem evidência direta** — TBD | S040✅ S043❌ S059❌ |
| **L4** Menor custo de gate → menos retrabalho → execução rápida | **Elo mais fraco** — evidência ausente para V3 especificamente | S058❌ S057❌ S062❌ |

---

## Riscos Críticos (R-###)

| ID | Risco | Cluster | Evidência | Severidade |
|---|---|---|---|---|
| R-001 | Persistent memory misapplication em OOD | C2 | S008 BenchPreS | Alta |
| R-002 | Cascade errors em MAS sem gates formais | C5 | S031, S032 | Alta |
| R-003 | Auditabilidade em pipelines sequenciais é ilusória | C5 | S033 | Alta |
| R-004 | HITL vira rubber-stamping (governance theater) | C7 | S043, S059 | Alta |
| R-005 | V&V overhead pode negar ganhos de produtividade | C9 | S058, S060 | Alta |
| R-006 | Jagged Frontier: tarefas OOD pioram com IA | C9 | S062 | Média |
| R-007 | Frameworks anglo-saxões sem validação no Brasil | C11 | S069 | Média |
| R-008 | Nenhum RCT compara V3 estruturado vs não-estruturado | C9 | TBD | **Crítica** |

---

## Lacunas de Evidência (A-###)

| ID | Assunção não testada | Cluster | Prioridade de pesquisa |
|---|---|---|---|
| A-001 | Phase0 reduz ambiguidade operacional (não só percepção) | C2 | Alta |
| A-002 | FrameRouter aumenta legibilidade decisória para o gate humano | C4/C7 | Alta |
| A-003 | MultiSkill produz resultados mais reprodutíveis que single-skill | C3 | Alta |
| A-004 | ExecBridge reduz tasks duplicadas/mal-escoped | C8 | Média |
| A-005 | Cadeia causal completa V3 produz menos retrabalho que baseline | C9 | **Crítica** |

---

## Veredito por Dimensão da Tese

| Dimensão V3 | Veredito | Confiança |
|---|---|---|
| ↓ ambiguidade operacional | **Suportado condicionalmente** (domínio-dependente) | 3/5 |
| ↑ legibilidade decisória | **Plausível mas não testado** diretamente | 2/5 |
| ↓ retrabalho humano | **Não comprovado** para V3 completo; evidência mista para AI genérica | 1/5 |
| ↑ eficiência operacional auditável | **Parcialmente suportado** (gates formais ajudam); auditabilidade em chains é problema aberto | 2/5 |

---

**Next action — T-001:** Desenhar protocolo de quase-experimento comparando output de usuários V3 vs unstructured em tarefa knowledge-work com métrica de retrabalho mensurável. Esse é o único movimento que fecha A-005 e eleva a tese de "plausível" para "evidenciada".

---

**Você** _2026-05-20_

qual foi a conclusao entao ?

---

**Claude** _2026-05-20_

A conclusão em uma linha:

**A tese V3 é plausível, mas não comprovada** — especialmente no elo que mais importa.

Os primeiros elos da cadeia (prompt estruturado → output melhor) têm suporte razoável. Mas o elo final — *sistema V3 completo → menos retrabalho que conta não-estruturada* — **não tem nenhum RCT direto testando isso**.

O problema mais sério: a pesquisa encontrou evidência forte de que IA genérica *pode aumentar* retrabalho (workslop, V&V overhead, Jagged Frontier). Isso valida a *premissa* do V3 ("estrutura importa"), mas não prova que o V3 especificamente resolve o problema.

**O que falta para a tese se sustentar:** um experimento comparando usuários V3 vs usuários não-estruturados em tarefas reais, medindo retrabalho de verdade — não percepção de produtividade.

---

**Você** _2026-05-20_

Crie um tabular plain text com foco em dados de resultados e apenas uma fra se de insth por dado

---

**Claude** _2026-05-20_

```
═══════════════════════════════════════════════════════════════════════════════════════
WIDE RESEARCH V3 — EVIDENCE TABLE (74 sources / 11 clusters)
Focus: quantitative results only · one insight per row
═══════════════════════════════════════════════════════════════════════════════════════

CLUSTER     SOURCE   RESULT                                          DIRECTION
───────────────────────────────────────────────────────────────────────────────────────
C1          S001     Structured prompting: +6% to +30% performance   ✅ conditional
C1          S003     Hybrid prompt vs zero-shot: consistent gain      ✅ direct
C1          S004     Best prompt technique varies by SE task          ❌ falsifies
C1          S005     Quality variance 45.48% optimal vs suboptimal    ❌ falsifies

C2          S008     Frontier LLMs misapply memory in OOD contexts    ❌ falsifies
C2          S009     Structured memory: reduced prompt tokens + cost  ✅ direct
C2          S012     Indiscriminate memory: errors propagate; +10%    ⚠️ conditional
C2          S013     Persistent contextual AI: +14% productivity RCT  ✅ inferred

C3          S017     Malicious skills can invoke unintended tools      ❌ risk
C3          S019     Anthropic itself advises "start simple"           ❌ falsifies
C3          S016     17 reference skills: no reproducibility benchmark ⚠️ gap

C4          S021     Symbolic scaffolding outperforms binary prompt    ✅ direct
C4          S024     Cognitive scaffolding fails on higher-order tasks ❌ falsifies

C5          S027     Multi-agent: 100% actionable vs 1.7% single      ✅ direct
C5          S029     Reflexive arch: F1 0.943 but 2.3x cost           ⚠️ trade-off
C5          S031     Error cascades: defense 0.32 → 0.89 with gates   ⚠️ conditional
C5          S032     Single root-cause cascades on long-horizon tasks  ❌ falsifies
C5          S033     Pipeline failures observable but origins opaque   ❌ falsifies
C5          S034     41.8% failures = spec/design; 37% inter-agent    ❌ falsifies

C6          S035     Semantic routing: ~50% latency/token reduction    ✅ direct
C6          S038     Similarity routing fails on ambiguous queries     ❌ falsifies
C6          S039     Tool-calling degrades under nested instructions   ❌ falsifies

C7          S040     Formal gates: feasibility 41% → 87%              ✅ direct
C7          S043     HITL frequently becomes governance theater        ❌ falsifies
C7          S059     Complacency + skimmed review → productivity loss  ❌ falsifies

C8          S049     Predictive assignment: 86% top-5 accuracy        ✅ contextual
C8          S051     AI output requires manual override; not final     ❌ falsifies

C9          S052     GitHub Copilot RCT ~5K devs: output raised       ✅ direct
C9          S053     M365 Copilot RCT: -25% email; meetings unchanged  ⚠️ partial
C9          S054     ChatGPT RCT n=453: -40% time, +18% quality       ✅ direct
C9          S056     National survey: aggregate gain only +1.1%        ❌ falsifies
C9          S057     "Workslop": downstream rework, cognition offload  ❌ falsifies
C9          S058     Meta-analysis 37 studies: no robust productivity  ❌ falsifies
C9          S060     V&V overhead may negate all GenAI gains           ❌ falsifies
C9          S062     Outside-frontier tasks: AI users 19pp worse       ❌ falsifies

C10         S064     Without shared playbooks, overhead destroys gains ⚠️ contextual
C10         S065     Most enterprise GenAI pilots fail measurable ROI  ❌ falsifies

C11         S069     FGV/PNAD: youth 18–29 saw ↓ employment + income  ❌ contextual
C11         S071     ~45% BR workforce exposed; literacy = precondition ⚠️ gap
C11         S072     322 firms: 51.8% report gains; 90% cite gov need  ✅ contextual

═══════════════════════════════════════════════════════════════════════════════════════
CAUSAL CHAIN SCORECARD
───────────────────────────────────────────────────────────────────────────────────────
L1  Phase0 + SemTrig → correct routing          Supported w/ caveats     2/5 evidence
L2  Framework → structured output               Domain-dependent only    2/5 evidence
L3  Structured output → cheaper gate validation NOT directly tested      0/5 evidence
L4  Cheaper gate → less rework → faster exec    NO RCT for V3 system     0/5 evidence
───────────────────────────────────────────────────────────────────────────────────────
CRITICAL GAP: Zero studies compare V3-structured vs unstructured on rework metric.
═══════════════════════════════════════════════════════════════════════════════════════
```

---

**Você** _2026-05-20_

estrture em portugues tabular divida coluna falsies / diect / number / insths ect para visualizcao simples

---

**Claude** _2026-05-20_

```
═══════════════════════════════════════════════════════════════════════════════════════════════════════════
TESE V3 — COGNITIVE TRIGGER SKILL OS · MAPA DE EVIDÊNCIAS (74 fontes / 11 clusters)
═══════════════════════════════════════════════════════════════════════════════════════════════════════════

CLUSTER              FONTE    NÚMERO / DADO                        INSIGHT (1 frase)                        TIPO
───────────────────────────────────────────────────────────────────────────────────────────────────────────
── SUPORTE DIRETO ──────────────────────────────────────────────────────────────────────────────────────────
C1 Prompt Quality    S003     Hybrid > zero-shot em todas tasks    Scaffolding estruturado reduz ambiguidade  DIRETO ✅
C2 Phase 0           S013     +14% produtividade (RCT grande)      IA contextual persistente eleva novatos    DIRETO ✅
C4 Frameworks        S021     Scaffolding simbólico > binário       Estrutura cognitiva preserva legibilidade  DIRETO ✅
C5 Multi-Agent       S027     100% acionável vs 1,7% single-agent  Orchestrator+specialists muda o patamar    DIRETO ✅
C6 Semantic Router   S035     ~50% redução latência/tokens          Roteamento semântico reduz custo real      DIRETO ✅
C7 Gates             S040     41% → 87% viabilidade c/ gates        Gates formais obrigatórios funcionam       DIRETO ✅
C9 Produtividade     S054     −40% tempo, +18% qualidade (n=453)   Baseline genAI tem efeito real (RCT)       DIRETO ✅
C9 Produtividade     S052     +output em ~5.000 devs (3 RCTs)      Ganho maior em trabalhadores juniores      DIRETO ✅

── FALSIFICAÇÕES ───────────────────────────────────────────────────────────────────────────────────────────
C1 Prompt Quality    S004     Melhor técnica varia por tarefa SE   Template universal não existe              FALSEADOR ❌
C1 Prompt Quality    S005     Variância de 45,48% entre prompts    Prompt estruturado não elimina retrabalho  FALSEADOR ❌
C2 Phase 0           S008     Modelos aplicam memória em OOD       Persistência causa erro fora da distribuição FALSEADOR ❌
C3 Skills            S019     Anthropic: "start simple"            O próprio vendor desaconselha MAS desnec.  FALSEADOR ❌
C4 Frameworks        S024     Falha em higher-order tasks           Frameworks criam falsa sensação de rigor   FALSEADOR ❌
C5 Multi-Agent       S029     Reflexive: F1 0,943 mas custo 2,3x   Nenhuma arquitetura domina universalmente  FALSEADOR ❌
C5 Multi-Agent       S033     Falhas visíveis, origens opacas       Auditabilidade em chains é ilusória        FALSEADOR ❌
C5 Multi-Agent       S034     41,8% falhas = spec/design            Maioria dos erros MAS é humana, não da IA  FALSEADOR ❌
C5 Multi-Agent       S032     1 erro raiz → cascade longo           Sistemas longos amplificam, não corrigem   FALSEADOR ❌
C6 Routing           S039     Tool-calling cai c/ instruções aninhadas Roteamento sozinho não basta em complexidade FALSEADOR ❌
C7 Gates             S043     HITL → governance theater frequente   Gate sem design vira rubber-stamp          FALSEADOR ❌
C7 Gates             S059     Complacência → perda de produtividade Revisão apressada é pior que sem revisão   FALSEADOR ❌
C8 ExecBridge        S051     Output AI = ponto de partida, não entrega Bridge não elimina supervisão humana   FALSEADOR ❌
C9 Produtividade     S056     Ganho agregado nacional = +1,1%       Adoção ampla não gera retorno agregado     FALSEADOR ❌
C9 Produtividade     S057     "Workslop" cria retrabalho downstream  IA não estruturada gera mais trabalho      FALSEADOR ❌
C9 Produtividade     S058     37 estudos: sem relação robusta        Meta-análise derruba narrativa de ganho    FALSEADOR ❌
C9 Produtividade     S060     V&V overhead pode negar todos os ganhos Custo de validação supera ganho de geração FALSEADOR ❌
C9 Produtividade     S062     Tarefas OOD: usuários AI 19pp piores  Jagged Frontier — IA piora fora do domínio FALSEADOR ❌
C10 Playbooks        S065     Maioria dos pilotos falha em ROI       Showcase não converte em adoção real       FALSEADOR ❌
C11 Brasil           S069     Jovens 18–29: ↓ emprego e renda       Impacto BR é substituição, não augmentação FALSEADOR ❌

── CONDICIONAIS / ADVERTÊNCIAS ─────────────────────────────────────────────────────────────────────────────
C1 Prompt Quality    S001     +6% a +30% (

---

**Você** _2026-05-20_

tabular tipo plainha aqui na conversa

---

**Claude** _2026-05-20_

```
CLUSTER          FONTE   DADO / NÚMERO                           DIRETA ✅   FALSEADOR ❌   CONDICIONAL ⚠️   INSIGHT
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C1 Prompt        S001    +6% a +30% (dependente de domínio)                               ⚠️               Ganho existe mas não é universal
C1 Prompt        S003    Hybrid > zero-shot em todas as tasks    ✅                                          Scaffolding reduz ambiguidade
C1 Prompt        S004    Melhor técnica varia por tarefa SE                  ❌                              Template universal não existe
C1 Prompt        S005    Variância 45,48% entre prompts                      ❌                              Prompt estruturado não elimina retrabalho
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C2 Phase 0       S008    Memória aplicada errado em OOD                      ❌                              Persistência causa erro fora da distribuição
C2 Phase 0       S009    Memória estruturada reduz tokens                    ✅                              Qualidade da memória importa mais que quantidade
C2 Phase 0       S012    Memória indiscriminada propaga erros                            ⚠️               Requer mecanismo explícito de esquecimento
C2 Phase 0       S013    +14% produtividade (RCT grande)         ✅                                          IA contextual persistente eleva novatos
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C3 Skills        S017    Skills não cobertas por ZDR                                     ⚠️               Auditabilidade tem gap de segurança real
C3 Skills        S019    Anthropic: "start simple"                           ❌                              Próprio vendor desaconselha MAS desnecessário
C3 Skills        S016    17 skills sem benchmark de reprodução                           ⚠️               Reprodutibilidade é afirmada, não medida
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C4 Frameworks    S021    Scaffolding simbólico > binário          ✅                                          Estrutura cognitiva preserva legibilidade
C4 Frameworks    S024    Falha em higher-order perspective tasks              ❌                              Frameworks criam falsa sensação de rigor
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C5 Multi-Agent   S027    100% acionável vs 1,7% single-agent      ✅                                          Orchestrator+specialists muda patamar em incidentes
C5 Multi-Agent   S029    F1 0,943 mas custo 2,3x (10K filings)               ❌                              Nenhuma arquitetura domina universalmente
C5 Multi-Agent   S031    Cascade: defesa 0,32 → 0,89 c/ gates                           ⚠️               Gates reduzem propagação mas não eliminam
C5 Multi-Agent   S032    1 erro raiz → cascade longo                         ❌                              Sistemas longos amplificam falhas
C5 Multi-Agent   S033    Falhas visíveis, origens opacas                     ❌                              Auditabilidade em chains é ilusória
C5 Multi-Agent   S034    41,8% falhas = spec/design; 37% inter-agent         ❌                              Maioria dos erros MAS é humana, não da IA
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C6 Routing       S035    ~50% redução latência/tokens             ✅                                          Roteamento semântico reduz custo real
C6 Routing       S038    Falha em queries ambíguas/multi-intent               ❌                              Routing puro não funciona em complexidade mista
C6 Routing       S039    Tool-calling cai c/ instruções aninhadas             ❌                              Roteamento sozinho não basta
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C7 Gates         S040    41% → 87% viabilidade c/ gates formais   ✅                                          Gates obrigatórios funcionam quando bem posicionados
C7 Gates         S043    HITL → governance theater frequente                 ❌                              Gate sem design vira rubber-stamp
C7 Gates         S059    Complacência → perda de produtividade               ❌                              Revisão apressada é pior que sem revisão
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C8 ExecBridge    S049    Atribuição preditiva: 86% top-5 accuracy                        ⚠️               Bridge funciona em classificação, não em criação
C8 ExecBridge    S051    Output AI = ponto de partida, não entrega           ❌                              Bridge não elimina supervisão humana
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C9 Retrabalho    S052    +output em ~5.000 devs (3 RCTs)          ✅                                          Ganho real mas em IA não-estruturada
C9 Retrabalho    S053    −25% email; reuniões inalteradas          ✅                                          Ganho parcial; comportamento coordenado não muda
C9 Retrabalho    S054    −40% tempo, +18% qualidade (n=453)        ✅                                          Melhor RCT disponível; não testa V3
C9 Retrabalho    S056    Ganho agregado nacional = +1,1%                      ❌                              Adoção ampla não gera retorno agregado
C9 Retrabalho    S057    "Workslop" → retrabalho downstream                  ❌                              IA não estruturada cria mais trabalho
C9 Retrabalho    S058    Meta-análise 37 estudos: sem relação robusta         ❌                              Narrativa de ganho não se sustenta no agregado
C9 Retrabalho    S060    V&V overhead pode negar todos os ganhos              ❌                              Custo de validação supera ganho de geração
C9 Retrabalho    S062    Tarefas OOD: usuários AI 19pp piores                ❌                              Jagged Frontier — IA piora fora do domínio
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C10 Playbooks    S064    Sem playbooks, overhead destrói ganho                            ⚠️               Motiva V3 mas não prova que V3 resolve
C10 Playbooks    S065    Maioria dos pilotos falha em ROI                     ❌                              Showcase não converte em adoção real
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
C11 Brasil       S069    Jovens 18–29: ↓ emprego e renda                     ❌                              Impacto BR é substituição, não augmentação
C11 Brasil       S071    ~45% expostos; literacy = precondição                            ⚠️               Componente L da fórmula é barreira real no Brasil
C11 Brasil       S072    322 empresas: 51,8% reportam ganhos                              ⚠️               Governança é prioridade — sem medir retrabalho
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
SCORECARD        TOTAL   74 fontes / 11 clusters                  8 ✅          20 ❌          9 ⚠️
VEREDITO                 Tese plausível · elo L3→L4 sem evidência · nenhum RCT testa V3 completo vs baseline
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
```
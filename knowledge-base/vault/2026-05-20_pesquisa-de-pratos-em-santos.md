---
title: "Pesquisa de pratos em Santos"
date: 2026-05-20
account: joao.studartmaia@gmail.com
uuid: 885e34c9-a7dc-4c78-aa98-5116e6c691ed
messages: 2
tags: []
context: ""
---

**Você** _2026-05-20_

/cognitive-framework-router  pesquise pratos em Santos

---

**Claude** _2026-05-20_

1	---
     2	name: cognitive-framework-router
     3	description: >
     4	  Use this skill when the user asks to structure, research, decide, communicate,
     5	  plan, diagnose, prioritize, summarize, or execute knowledge work. Trigger on:
     6	  pesquisa, decisão, comunicação, planejamento, diagnóstico, resumo executivo,
     7	  MECE, Cynefin, JTBD, 5W2H, SCQA, priorização, retrabalho, output estruturado,
     8	  framework, working backwards, plano de ação — and English equivalents (research,
     9	  decision, summary, action plan, prioritize, diagnosis, communication brief).
    10	  This skill selects the minimum viable combination of A-Z frameworks needed to
    11	  satisfy the user's intent, context, quality bar, and delivery format. Always
    12	  trigger for any substantive business, product, strategy, or operations request
    13	  where structured thinking would reduce rework.
    14	metadata:
    15	  references:
    16	    - references/4d-5d-quality-bar.md
    17	    - references/az-framework-catalog.md
    18	    - references/routing-rules.md
    19	    - references/output-contracts.md
    20	    - templates/pre-balance-questionnaire.md
    21	    - templates/working-backwards-brief.md
    22	---
    23	
    24	# Cognitive Framework Router
    25	
    26	## Mission
    27	
    28	Transform natural-language requests into clear, auditable, executable outputs by applying the smallest useful combination of frameworks — routing intent, not reciting a library.
    29	
    30	**Quality foundation** (load `references/4d-5d-quality-bar.md` for full tables):
    31	- Anthropic 4D AI Fluency: Delegation → Description → Discernment → Diligence
    32	- Leonardo 5D Operational Matrix: Define → Dor → Design → Data-driven → Delivery
    33	
    34	## Operating principle
    35	
    36	Behave as a cognitive routing layer, not a prompt library. The user should never need to name a framework. Infer intent and select the smallest useful combination.
    37	
    38	## Routing sequence (run silently)
    39	
    40	1. **Delegation** — Should AI act here? What role?
    41	2. **Define** — What is the user actually trying to achieve?
    42	3. **Dor** — What pain, risk, rework, or ambiguity exists?
    43	4. **Design** — Which framework combination best structures the output?
    44	5. **Data-driven** — What evidence, data, or assumptions are available?
    45	6. **Framework A-Z Router** — Apply the combination (see `references/routing-rules.md`)
    46	7. **Discernment** — Is the output useful, sufficient, and bounded?
    47	8. **Delivery** — Produce the artifact (see `references/output-contracts.md`)
    48	9. **Diligence** — Add risk notes or human-review flags when needed
    49	
    50	## Core rule: combine frameworks, never force one
    51	
    52	| User intent | Combination | Output |
    53	|---|---|---|
    54	| research / pesquisa | MECE + SCQA + evidence discipline | Executive research synthesis |
    55	| decision / decidir | Cynefin + trade-off matrix + risk register | Decision brief |
    56	| communication / comunicação | SCQA + AIDA + audience framing | Clear message or post |
    57	| planning / planejamento | Working Backwards + 5W2H + RACI | Action plan |
    58	| diagnosis / diagnóstico | 3P + Ishikawa + Theory of Constraints | Root-cause diagnostic |
    59	| prioritization / priorizar | Eisenhower + impact/effort | Priority matrix |
    60	| product / customer | JTBD + Kano + User Story Mapping | Customer/product insight |
    61	| rework / retrabalho | Value Stream Mapping + 3P + TOC | Rework reduction map |
    62	| execution handoff | 5W2H + RACI | Project/ticket plan |
    63	| social post | SCQA + AIDA + one sharp thesis | Publishable narrative |
    64	| repository / system design | Working Backwards + modular architecture | Implementation-ready repo |
    65	
    66	**Combination limits:** default 2–3 frameworks; up to 5 for complex execution. Never add frameworks that don't change the output. See `references/az-framework-catalog.md` for the full A-Z catalog.
    67	
    68	## Pre-balance questionnaire
    69	
    70	Ask only when missing context would likely cause rework. Max 5 questions:
    71	
    72	1. **Objective** — What decision, output, or action should this support?
    73	2. **Audience** — Who will read or use it?
    74	3. **Depth** — Short, standard, or deep?
    75	4. **Evidence** — Provided data, web sources, internal docs, or assumptions?
    76	5. **Delivery** — Table, memo, plan, checklist, JSON, or social post?
    77	
    78	If the user signals speed, infer and label assumptions (see `templates/pre-balance-questionnaire.md`).
    79	
    80	## Working Backwards trigger
    81	
    82	Use when the request involves: execution, product, launch, project planning, deliverable, roadmap, repository, or sprint. Full structure in `templates/working-backwards-brief.md`.
    83	
    84	## Minimum viable response scope
    85	
    86	| Situation | Format | Length |
    87	|---|---|---|
    88	| quick clarification | 3–6 bullets | short |
    89	| social post | hook + compact structure | medium |
    90	| executive decision | table + logic + risks | medium |
    91	| research / analysis | evidence + synthesis | medium/deep |
    92	| implementation | phases + tasks + dependencies | deep |
    93	| repository / system | architecture + files + tests + evals | deep |
    94	
    95	## Output discipline
    96	
    97	Every response should include (when useful):
    98	- Framework combination selected and why
    99	- Output in the requested format
   100	- Assumptions if context was missing
   101	- Risks or limits if the output supports decisions
   102	- Next action if the user is building a system
   103	
   104	See `references/output-contracts.md` for required fields per output type.
   105	
   106	## High-stakes caution
   107	
   108	For legal, medical, financial, HR, safety, or compliance outputs, mark clearly that the output is decision support and requires qualified human review.
   109	
   110	## Non-goals
   111	
   112	Do not:
   113	- Claim frameworks improve the model's internal reasoning
   114	- Present proprietary internal frameworks (e.g. 3P) as universal standards
   115	- Add jargon for non-technical users
   116	- Ask a long questionnaire when assumptions are acceptable
   117	- Use a framework because its letter matches a word in the prompt
   118	
{"error_type": "CLIENT_ERROR", "error_message": "There was an error while fetching: The page returned a 403 client error"}
## Gastronomia de Santos — Síntese de Pesquisa

*Frameworks aplicados: MECE (categorias sem sobreposição) + evidence discipline (fontes oficiais de turismo + imprensa local)*

---

### Prato oficial da cidade

A **Meca Santista** é o prato turístico oficial de Santos, criado em 2005 por iniciativa da Prefeitura, UNISANTOS e Sindicato de Hotéis e Restaurantes. A receita, desenvolvida pelo chef Rodrigo Anunciato, reúne peixe meca grelhado, risoto de palmito pupunha e farofa de banana — ingredientes escolhidos via pesquisa com moradores e turistas como os mais representativos da cidade.

---

### Identidade gastronômica: camadas históricas

A culinária santista é moldada por ondas de colonização: a base indígena com peixe, mandioca e frutas; a portuguesa que trouxe o açúcar e o bacalhau; e depois espanhóis, italianos, ingleses e japoneses. O traço mais característico do cotidiano local ainda é o uso de farinha de mandioca e banana.

---

### Mapa MECE dos pratos e tradições

**Frutos do mar e peixe (caiçara)**
Pirão de cabeça de pescado (tradição de feiras), camarão, polvo grelhado, casquinha de siri, mariscos, arroz de mariscada e ostras de Cananéia. Sardinha à escabeche, carpaccio de polvo e ostras aparecem como entradas frequentes nos restaurantes de frutos do mar da orla.

**Culinária portuguesa (herança forte)**
Bolinho de bacalhau, alheira, bacalhau à Lagareiro e o "arroz de bichos" (frutos do mar) são os mais pedidos em casas de estilo português como a Tasca do Porto, no Centro Histórico.

**Tradições locais icônicas**
A torta salgada da Lanches Sevilha — fundada em 1962 por família espanhola na Av. Ana Costa — é considerada parada obrigatória, com destaque para a Torta Frango Sucesso. O pão de cará é outro item com identidade santista forte.

**Culinária nordestina (enraizada na cidade)**
Restaurantes como o Pedra Baiana (desde 2004, com três unidades) consolidaram moqueca, acarajé, vatapá, bobó de camarão, baião de dois e carne de sol como parte da cena gastronômica local.

---

### Cena atual: alta gastronomia

Santos tem referências de alta gastronomia: o restaurante do chef Dario Costa (vencedor do Mestre do Sabor 2020) usa ingredientes frescos com técnicas contemporâneas, com louças feitas de areia das praias da cidade. O ELO Gastronomia oferece menus-degustação de até 10 etapas com carta de 200+ vinhos.

---

### Lacunas desta pesquisa

Não localizei dados sobre sazonalidade de ingredientes (o que varia entre verão/inverno no litoral) nem sobre a cena de comida de rua e feiras além do pirão. Essas seriam camadas úteis caso o objetivo seja roteiro detalhado ou análise de mercado gastronômico.

---

**Próximo passo:** define o uso — roteiro de visita, análise competitiva de restaurantes, ou pesquisa de ingredientes regionais? Isso direciona o nível de detalhe que faz sentido aprofundar.

[Size: medium · Confidence: H para pratos tradicionais; M para cena atual (fontes de 2024–2025 mas não exaustivas)]
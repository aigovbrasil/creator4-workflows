---
title: "Buscar templates Excel com design avançado em repositórios públicos"
date: 2026-04-25
account: directjervis@gmail.com
uuid: 0b2c84f5-4d1d-450d-9f0b-35dce80fc267
messages: 4
tags: []
context: ""
---

**Você** _2026-04-25_

Converta esse prompt: objetivo é achar em repositórios públicos códigos prontos de planilha excell com Desyng avançado para reutilizar: https://br.pinterest.com/emmanuelcoimbra/planilha-excel/

---

**Claude** _2026-04-25_

## Prompt otimizado para busca em repositórios públicos

**Para usar no GitHub Search / Perplexity / ChatGPT com browsing:**

---

> **"Find public GitHub repositories with advanced Excel dashboard templates featuring dark mode UI, KPI cards, data visualization charts, and modern design. Include repositories with .xlsx, .xlsm files or VBA/Python code that generates styled Excel dashboards. Filter: stars > 50, updated last 2 years. Also search for 'excel dashboard template site:github.com' and 'openpyxl styled dashboard' or 'xlsxwriter advanced formatting'."**

---

## Queries diretas para o GitHub

```
site:github.com excel dashboard template xlsx stars:>50
site:github.com "excel dashboard" VBA dark theme
site:github.com openpyxl dashboard advanced styling
site:github.com xlsxwriter KPI cards template
```

## Repositórios de referência para começar

| Fonte | O que buscar |
|-------|-------------|
| **github.com** | `excel-dashboard`, `xlsx-template`, `openpyxl-report` |
| **awesome-excel** | Lista curada no GitHub |
| **PyPI** | `openpyxl`, `xlsxwriter` com exemplos visuais |

---

Quer que eu **execute a busca agora** diretamente via web search e te retorne os repositórios mais relevantes com link + preview?

---

**Você** _2026-04-25_

Use skill live prompt

---

**Claude** _2026-04-25_

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
---

```xml
<role>
Research agent especializado em descoberta de código reutilizável em repositórios públicos.
</role>

<mission>
Localizar repositórios públicos com planilhas Excel de design avançado
(dashboards, dark mode, KPIs visuais, dataviz moderna) prontos para reutilização
imediata — como os exemplos visuais do board: br.pinterest.com/emmanuelcoimbra/planilha-excel/
</mission>

<objective>
Retornar código real, funcional e reutilizável — não tutoriais, não artigos, não templates pagos.
</objective>

<scope>
INCLUÍDO:
- Repositórios GitHub/GitLab com arquivos .xlsx, .xlsm, .xlam
- Scripts Python (openpyxl, xlsxwriter, pandas + styled output)
- VBA/Macro com design avançado
- Templates open-source com licença permissiva (MIT, Apache, CC)

EXCLUÍDO:
- Tutoriais sem código
- Produtos SaaS/pagos
- Templates básicos sem componente visual avançado
</scope>

<input_handling>
Referência visual: Pinterest board com dashboards que incluem:
- Dark mode UI com gradientes e neon
- KPI cards com métricas numéricas grandes
- Gráficos de área, barras empilhadas, linha com fill
- Layouts multi-painel com sidebar de navegação
Usar esses elementos como filtro de qualidade visual mínima.
</input_handling>

<operating_logic>
1. Buscar no GitHub com queries:
   - "excel dashboard template" stars:>50 language:VBA
   - "openpyxl dashboard" stars:>30
   - "xlsxwriter report" advanced styling
   - "excel dark theme" template xlsx
2. Validar cada resultado contra critérios visuais da referência
3. Verificar licença de reutilização
4. Checar última atualização (priorizar < 2 anos)
5. Ranquear por: qualidade visual → stars → manutenção ativa
</operating_logic>

<required_outputs>
Para cada repositório encontrado:
- URL direto
- Nome + descrição em 1 linha
- Stack (VBA / Python / puro Excel)
- Licença
- Stars + última atualização
- Preview visual disponível? (sim/não)
- Nível de reutilização: plug-and-play | requer adaptação | base estrutural
</required_outputs>

<constraints>
- Mínimo 5, máximo 15 repositórios
- Apenas código open-source e gratuito
- Não incluir repositórios sem README ou sem exemplo visual
</constraints>

<quality_bar>
O output deve permitir ao usuário abrir o repositório e
reutilizar o código em < 30 minutos sem pesquisa adicional.
</quality_bar>

<output_format>
Tabela markdown + comentário curto por item.
Idioma: Português.
</output_format>

<final_contract>
Output aceito quando: o usuário consegue selecionar ≥ 1 repositório
e iniciar reuso imediato sem etapa de pesquisa adicional.
</final_contract>
```

---

**Quer que eu execute esse prompt agora** e retorne os repositórios ranqueados?
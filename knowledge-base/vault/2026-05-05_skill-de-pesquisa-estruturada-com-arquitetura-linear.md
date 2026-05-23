---
title: "Skill de pesquisa estruturada com arquitetura linear"
date: 2026-05-05
account: directjervis@gmail.com
uuid: 260535e1-7b14-4926-84b6-b92221f85533
messages: 2
tags: []
context: ""
---

**Você** _2026-05-05_

skill cretor vamos criar uma skill a skill deve ter a mesma arch da skill project to linear mas tera a fincao de salvar  infocao de pesquisa sem que eu tenha que sair da conversa de firma estrtrada para ap fil do plano de pesquisa col cmd colect e tags etc visualozar  in line etc pense na arch ui/uix

---

**Claude** _2026-05-05_

Vou analisar a arquitetura da `projects-to-linear` para criar a nova skill de pesquisa estruturada.
32K	/mnt/skills/user/projects-to-linear
12K	/mnt/skills/user/projects-to-linear/SKILL.md
16K	/mnt/skills/user/projects-to-linear/references
4.0K	/mnt/skills/user/projects-to-linear/references/mcp-tools.md
4.0K	/mnt/skills/user/projects-to-linear/references/templates.md
4.0K	/mnt/skills/user/projects-to-linear/references/workspace-data.md

     1	---
     2	name: projects-to-linear
     3	description: "Transforma escopos brutos em projetos Linear estruturados com hierarquia Epic-Issue, dependencias e notificacao Slack. Orquestra Linear + Slack + Notion + Figma via MCP com validation gate humana obrigatoria. ATIVE SEMPRE para: criar projeto no Linear, decompor escopo em issues, transformar PRD/briefing em backlog, montar epics e issues, pipeline escopo-Linear, backlog building, sprint setup. ATIVE com: cria projeto no linear, manda pro linear, decompoe esse escopo, transforma em issues, escopo para linear, projects to linear, cria epics e issues, monta o backlog, estrutura esse projeto, do escopo ao linear, linear project, scope to issues. TAMBEM ative com texto longo (mais de 200 palavras) com funcionalidades/requisitos/entregas e mencione projeto, linear, issues ou backlog, mesmo sem dizer Linear explicitamente. NAO ative para: consultas de status, updates de issues individuais, leitura no Linear, priorizacao sem criacao (usar EPO), lista simples de tarefas (usar task-intake)."
     4	compatibility: "Requer: Linear MCP (https://mcp.linear.app/mcp). Recomendado: Slack MCP (https://mcp.slack.com/mcp). Opcional: Notion MCP (https://mcp.notion.com/mcp), Figma MCP (https://mcp.figma.com/mcp). Versao: 1.0.0 | Autor: PIPILONES Skill Architecture — Leonardo | 2026-04-03"
     5	---
     6	
     7	# Projects to Linear v1.0.0
     8	## Agentic Scope-to-Linear Decomposition Pipeline
     9	
    10	Transforma escopos brutos em projetos Linear estruturados via intake
    11	interativo com validation gate humana obrigatória. Nenhuma execução no
    12	Linear acontece sem confirmação explícita do usuário.
    13	
    14	---
    15	
    16	## Activation Rules
    17	
    18	**DO NOT ACTIVATE WHEN:**
    19	- Usuário consulta issues existentes → usar `Linear:list_issues` diretamente
    20	- Atualização de issue individual → usar `Linear:save_issue` diretamente
    21	- Priorização/roadmap sem criação no Linear → usar `executive-planning-orchestrator`
    22	- Lista de tarefas simples sem contexto de projeto → redirecionar para `task-intake`
    23	
    24	**SELF-EXEMPTION:** Esta skill não chama a si mesma. Se já em execução, não re-trigger.
    25	
    26	**LANGUAGE POLICY:**
    27	- Reasoning interno: pode ser em inglês
    28	- Toda interação com o usuário: Portuguese (pt-BR)
    29	- Nomes de issues no Linear: idioma do escopo fornecido pelo usuário
    30	
    31	**EXECUTION:** Ao ler este arquivo, iniciar imediatamente a Seção 0.
    32	
    33	---
    34	
    35	## Reference Files — Progressive Disclosure
    36	
    37	| **Arquivo**                    | **Conteúdo**                                                      | **Ler no Step**            |
    38	|-------------------------------|-------------------------------------------------------------------|----------------------------|
    39	| `references/mcp-tools.md`     | Nomes reais das tools MCP, parâmetros, error handling             | STEP 5 (antes de executar) |
    40	| `references/workspace-data.md`| Team, labels, statuses, priority scale do workspace Linear        | STEP 2 (durante intake)    |
    41	| `references/templates.md`     | Templates de issue description, Slack message, confirmation table | STEP 3 e STEP 6            |
    42	
    43	---
    44	
    45	## Section 0: Execution Flow
    46	
    47	Sequência canônica. Completar cada step em ordem. Não pular, não reordenar.
    48	
    49	```
    50	STEP 1 — INTAKE (interativo, 5 batches)
    51	  Coletar contexto do projeto via perguntas agrupadas.
    52	  Extrair respostas do texto se já fornecidas — não repetir.
    53	  ↓
    54	STEP 2 — CONFIRMATION TABLE
    55	  Consolidar tudo numa tabela. Obter "Y" explícito.
    56	  ↓
    57	STEP 3 — DECOMPOSITION
    58	  Transformar escopo em hierarquia Epic→Issue com dependências.
    59	  ↓
    60	STEP 4 — VALIDATION GATE
    61	  Renderizar tabela de Epics/Issues. Obter "Y" explícito.
    62	  Só prosseguir com confirmação. Sem exceções.
    63	  ↓
    64	STEP 5 — LINEAR EXECUTION
    65	  Ler references/mcp-tools.md. Executar calls na ordem correta.
    66	  ↓
    67	STEP 6 — DISTRIBUTION
    68	  Notificar Slack. Registrar no Notion se aplicável.
    69	  ↓
    70	STEP 7 — HANDOFF
    71	  Resumo final + próximos passos ao usuário.
    72	```
    73	
    74	---
    75	
    76	## STEP 1 — Interactive Intake
    77	
    78	Coletar em batches de máximo 3 perguntas. Se o escopo já contém a
    79	informação, extrair automaticamente e confirmar — não repetir a pergunta.
    80	
    81	### Batch A — Identidade
    82	1. Nome do projeto
    83	2. Objetivo de negócio principal
    84	3. Métrica de sucesso (como saber que deu certo?)
    85	
    86	### Batch B — Escopo
    87	1. O que está DENTRO do escopo? (funcionalidades core)
    88	2. O que está FORA do escopo? (features excluídas)
    89	3. Stack tecnológica + restrições
    90	
    91	### Batch C — Time e Timeline
    92	1. Composição do time (quantas pessoas, quais papéis?)
    93	2. Timeline (data início → entrega)
    94	3. Cadência de sprint (1 semana / 2 semanas / outra)
    95	
    96	### Batch D — Assets Existentes
    97	1. Notion URL (PRD, specs) — se existir, ler via `Notion:notion-fetch`
    98	2. Figma URL (design) — se existir, ler via `Figma:get_design_context`
    99	3. GitHub repo URL
   100	
   101	### Batch E — Preferências Linear
   102	1. Labels customizadas desejadas (além das que já existem)
   103	2. Workflow stages customizados ou usar default?
   104	3. Assignee(s) padrão
   105	
   106	---
   107	
   108	## STEP 2 — Confirmation Table
   109	
   110	Consolidar tudo e apresentar ao usuário. Ler `references/workspace-data.md`
   111	antes para cruzar com dados reais do workspace.
   112	
   113	| Campo        | Valor                |
   114	|-------------|----------------------|
   115	| Nome        | [extraído]           |
   116	| Objetivo    | [extraído]           |
   117	| Métrica     | [extraído]           |
   118	| Escopo IN   | [lista]              |
   119	| Escopo OUT  | [lista]              |
   120	| Stack       | [extraído]           |
   121	| Time        | [extraído]           |
   122	| Timeline    | [início] → [entrega] |
   123	| Sprint      | [cadência]           |
   124	| Assets      | [URLs listadas]      |
   125	| Labels      | [lista]              |
   126	| Workflow    | [stages]             |
   127	| Assignee(s) | [nomes]              |
   128	
   129	Após a tabela: **"Confirma? (Y para prosseguir / ajustes)"**
   130	
   131	**REGRA:** Não prosseguir sem "Y", "sim", "confirma", "vai" ou equivalente.
   132	
   133	---
   134	
   135	## STEP 3 — Decomposition Engine
   136	
   137	### Hierarquia Linear
   138	
   139	O Linear não tem entity "Epic" nativa. Usar **Parent Issues** como epics
   140	(issue-mãe com sub-issues).
   141	
   142	| Elemento            | Critério                        | Range          | Por quê                                      |
   143	|--------------------|---------------------------------|----------------|----------------------------------------------|
   144	| Epic (parent issue) | Domínio funcional distinto      | 2–7 por projeto | Mais que 7 indica escopo mal definido         |
   145	| Issue (sub-issue)   | Atômica, independente, testável | 3–10 por epic  | Menos que 3 = epic desnecessário              |
   146	
   147	### Template de Issue
   148	
   149	Ler `references/templates.md` para template completo de description/DoD.
   150	
   151	| Campo       | Formato                                     | Regra                                     |
   152	|------------|---------------------------------------------|-------------------------------------------|
   153	| title      | Verbo + objeto + contexto                   | "Implementar auth OAuth2" — nunca vago    |
   154	| description| Contexto + Critérios de Aceite + DoD        | Ver templates.md                          |
   155	| priority   | 1=Urgent, 2=High, 3=Normal, 4=Low           | Mapear do impacto no objetivo de negócio  |
   156	| estimate   | Fibonacci: 1(XS), 2(S), 3(M), 5(L), 8(XL)  | Solo dev: máximo M(3) por issue           |
   157	| labels     | Array de strings                            | Usar existentes + criar novas se necessário|
   158	| assignee   | Nome ou "me"                                | Baseado no papel definido no intake       |
   159	
   160	### Mapa de Dependências
   161	
   162	Mapear ANTES de executar:
   163	
   164	| Issue | Bloqueia | Bloqueada Por | Sprint Sugerido |
   165	|-------|---------|----------------|-----------------|
   166	| [A]   | [B, C]  | —              | 1               |
   167	| [B]   | [D]     | [A]            | 1               |
   168	
   169	---
   170	
   171	## STEP 4 — Validation Gate
   172	
   173	ANTES de qualquer call ao Linear, renderizar:
   174	
   175	| Epic | Qtd Issues | Prioridade Dom. | Assignee | Sprint |
   176	|------|-----------|-----------------|----------|--------|
   177	| [1]  | [N]       | [High]          | [nome]   | 1      |
   178	
   179	`Totais: [N] epics | [N] issues | [N] dependências`
   180	
   181	**"Confirma execução no Linear? (Y / ajustes)"**
   182	
   183	**REGRA ABSOLUTA:** Não executar STEP 5 sem "Y" explícito.
   184	Custo de criar issues erradas é alto — deletar no Linear é manual.
   185	
   186	---
   187	
   188	## STEP 5 — Linear Execution
   189	
   190	**Ler `references/mcp-tools.md` ANTES de qualquer call.**
   191	
   192	### Ordem de Execução
   193	
   194	1. `Linear:save_project` → capturar `project_id`
   195	2. `Linear:save_milestone` × N (1 por sprint)
   196	3. `Linear:create_issue_label` (apenas labels que não existem)
   197	4. `Linear:save_issue` — epic issues (sem `parentId`)
   198	5. `Linear:save_issue` — sub-issues (com `parentId` = epic)
   199	6. `Linear:save_issue` update — mapear dependências (`blockedBy`/`blocks`)
   200	7. `Linear:save_comment` — contexto extra em issues complexas
   201	8. `Linear:create_document` — PRD se não vier do Notion
   202	
   203	### Error Handling
   204	
   205	Para cada call: tentar → capturar ID → logar sucesso.
   206	Se falhar: logar erro → adicionar à retry list → continuar.
   207	Não abortar o pipeline por falha parcial.
   208	Após todas as calls: apresentar lista de falhas e oferecer retry.
   209	
   210	---
   211	
   212	## STEP 6 — Distribution
   213	
   214	### Slack
   215	Buscar `channel_id` via `Slack:slack_search_channels`.
   216	Enviar via `Slack:slack_send_message`. Ler `references/templates.md` para formato.
   217	Se Slack indisponível: renderizar resumo no chat e oferecer copiar.
   218	
   219	### Notion
   220	Se `notion-sync-protocol` disponível e usuário usa Sistema 2026:
   221	registrar projeto no Dashboard via protocolo padrão.
   222	
   223	---
   224	
   225	## STEP 7 — Handoff
   226	
   227	```
   228	✓ Projeto [nome] criado no Linear
   229	  → [N] epics | [N] issues | [N] dependências
   230	  → Link: [URL do projeto no Linear]
   231	  → Slack: [confirmação ou N/A]
   232	→ Próximo passo: abrir o Linear e revisar o board
   233	```
   234	
   235	---
   236	
   237	## Integration Map
   238	
   239	| Skill                           | Quando                                      | Direção              |
   240	|---------------------------------|---------------------------------------------|----------------------|
   241	| executive-planning-orchestrator | Priorização avançada ANTES de decompor      | EPO → esta skill     |
   242	| task-intake                     | Input = lista de tarefas (não escopo)       | Redirecionar         |
   243	| notion-sync-protocol            | Após criar projeto, registrar no Notion     | Esta skill → Notion  |
   244	| skill-publish-and-register      | Meta: publicar esta skill                   | Auto-trigger         |
   245	
   246	---
   247	
   248	## Known Limitations
   249	
   250	| Limitação                  | Workaround                                        |
   251	|---------------------------|---------------------------------------------------|
   252	| GitHub sem MCP connector  | Branch linking via integração nativa Linear↔GitHub |
   253	| Linear sem Cycles via MCP | Usar milestones como alternativa temporal          |
   254	| Assignee requer nome exato| Listar usuários antes de atribuir                 |
   255	| Slack msg max 5000 chars  | Usar Canvas para resumos longos                   |
   256	
16K	/mnt/skills/user/projects-to-linear/references
4.0K	/mnt/skills/user/projects-to-linear/references/mcp-tools.md
4.0K	/mnt/skills/user/projects-to-linear/references/templates.md
4.0K	/mnt/skills/user/projects-to-linear/references/workspace-data.md

File created successfully: /home/claude/research-capture-system/SKILL.md
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /home/claude/research-capture-system/references/storage-schema.md
File created successfully: /home/claude/research-capture-system/references/templates.md
File created successfully: /home/claude/research-capture-system/references/commands.md
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /mnt/user-data/outputs/research-capture-prototype.jsx
---
title: "Praxis Novp caso"
date: 2026-04-25
account: leonardopimentel.knh@gmail.com
uuid: 6765a8e0-6b28-4e9b-886d-91e0139592fd
messages: 4
tags: []
context: ""
---

**Você** _2026-04-25_

/praxis Novp caso

---

**Claude** _2026-04-25_

1	---
     2	name: praxis
     3	description: |
     4	  Co-piloto de consultoria para PMEs brasileiras. Orquestra 6 fases estruturadas
     5	  (briefing, personalização, análise diagnóstica, simulação, compilação, entrega)
     6	  que produzem propostas comerciais, diagnósticos executivos, planos de ação e
     7	  planilhas operacionais — enquanto reduz carga cognitiva do consultor.
     8	  ATIVE quando o consultor disser: "novo caso", "iniciar consultoria", "rodar
     9	  praxis", "atender cliente PME", "montar diagnóstico", "gerar proposta comercial",
    10	  "consultoria estruturada", "abrir caso", "nova consultoria PME", "preciso
    11	  analisar uma empresa". ATIVE também quando o consultor colar um briefing de
    12	  cliente, notas de reunião, ou texto bruto pedindo análise estruturada. ATIVE
    13	  mesmo sem mencionar o nome — qualquer pedido de workflow consultivo estruturado
    14	  para PME aciona esta skill. NÃO ATIVE para perguntas isoladas sobre o método,
    15	  geração de artefatos avulsos fora de um caso, ou dúvidas gerais sobre estratégia.
    16	compatibility:
    17	  tools: [mcp__google_drive, mcp__linear, mcp__slack]
    18	dependencies: [pyyaml, openpyxl]
    19	---
    20	
    21	# praxis — Co-piloto de Consultoria para PMEs Brasileiras
    22	
    23	## O que esta skill faz
    24	
    25	Transforma briefings brutos em dossiês consultivos completos: proposta comercial,
    26	diagnóstico executivo, simulação de cenários, plano de ação 5W2H e planilha operacional.
    27	Cada fase reduz carga cognitiva do consultor com rastreabilidade epistêmica completa.
    28	Zero menção a IA nos entregáveis. Lê como trabalho de consultor sênior humano.
    29	
    30	---
    31	
    32	## Quando ativar
    33	
    34	### Frases que ativam diretamente
    35	- "novo caso", "abrir caso", "iniciar consultoria"
    36	- "rodar praxis", "atender cliente PME"
    37	- "montar diagnóstico", "fazer diagnóstico"
    38	- "gerar proposta comercial", "preciso de proposta"
    39	- "consultoria estruturada", "nova consultoria PME"
    40	- "preciso analisar uma empresa"
    41	- "acabei reunião com cliente novo"
    42	- "retomar caso anterior", "atualizar diagnóstico"
    43	
    44	### Formatos de briefing que ativam
    45	- Texto colado com nome de empresa + problema
    46	- Notas de reunião com cliente
    47	- E-mail ou transcrição de áudio com contexto de negócio
    48	- Qualquer texto pedindo "análise estruturada" de uma empresa
    49	
    50	### Sinais de continuação de caso
    51	- "continuar", "próxima fase", "avançar"
    52	- Ler manifest.yaml → determinar fase atual → retomar
    53	
    54	### NÃO ativar para
    55	- Perguntas isoladas sobre metodologia de consultoria
    56	- Geração de documentos avulsos sem contexto de caso
    57	- Dúvidas gerais sobre estratégia de negócios
    58	- Pedidos de ajuda com tarefas não consultivas
    59	
    60	---
    61	
    62	## Pipeline — 6 Fases
    63	
    64	```
    65	Briefing Bruto
    66	    │
    67	    ▼
    68	[Fase 1] Briefing e Roteamento
    69	  Normaliza intake · rótulos epistêmicos · seleciona cenário A/B/C
    70	  Gate G0 (auto) → A-01
    71	    │
    72	    ▼
    73	[Fase 2] Personalização e Artefatos Comerciais
    74	  Configura identidade do consultor · gera proposta/contrato/personalização
    75	  → A-02, A-03, A-04 (conforme seleção)
    76	    │
    77	    ▼
    78	[Fase 3] Análise Diagnóstica
    79	  Injeção de metodologia · Wide Search · B-Frames (Básico/Lean/Full)
    80	  Gate G1 (auto) · Gate G2 ⚠ HUMANO OBRIGATÓRIO
    81	  → A-05, A-06, A-07/A-08/A-09
    82	    │
    83	    ▼
    84	[Fase 4] Laboratório de Simulação
    85	  Cenários estratégicos · unit economics · comportamento do consumidor
    86	  Gate G3 (auto) → A-10, A-11
    87	    │
    88	    ▼
    89	[Fase 5] Compilação do Dossiê
    90	  Agente 00 · Regras C1–C8 · trilhas INTERNA/CLIENTE
    91	  → A-MASTER, A-12, compilation_log.md
    92	    │
    93	    ▼
    94	[Fase 6] Entregáveis Finais
    95	  Branding aplicado · QA programático G4 · Gate G5 ⚠ HUMANO
    96	  Gate G6 ⚠ HUMANO (handoff ou skip explícito)
    97	  → A-FINAL, A-OPS
    98	    │
    99	    ▼
   100	[Opcional] Loop pós-entrega
   101	  Marketing do caso · revisão do cliente · novo caso
   102	```
   103	
   104	### Tabela de Fases
   105	
   106	| Fase | Label ao Consultor | Input | Output | Gate(s) |
   107	|---|---|---|---|---|
   108	| 1 | Briefing e Roteamento | briefing bruto | A-01 | G0 auto |
   109	| 2 | Personalização | A-01 + branding | A-02/03/04 | — |
   110	| 3 | Análise Diagnóstica | A-01+05 + metodologia | A-05,06,07/08/09 | G1 auto, **G2 ⚠** |
   111	| 4 | Laboratório de Simulação | A-06+09 | A-10, A-11 | G3 auto |
   112	| 5 | Compilação do Dossiê | todos os artefatos | A-MASTER | — |
   113	| 6 | Entregáveis Finais | A-MASTER + branding | A-FINAL, A-OPS | G4 auto, **G5 ⚠**, **G6 ⚠** |
   114	
   115	---
   116	
   117	## Roteamento por Fase
   118	
   119	Na ativação: verificar se existe manifest.yaml no diretório de trabalho.
   120	
   121	**Se manifest existe**: ler `current_phase` → carregar reference da fase correspondente → retomar.
   122	**Se manifest não existe**: iniciar Fase 1 → criar manifest via scripts/init_case.py.
   123	**Se consultor especifica fase**: ir diretamente, verificar pré-condições, alertar se gates pendentes.
   124	
   125	```
   126	On activation:
   127	  1. Load references/consultor-voice.md (always)
   128	  2. If manifest.yaml exists:
   129	       phase = manifest.current_phase
   130	  Else:
   131	       phase = 1
   132	  3. Load references/phase-0{phase}-*.md
   133	  4. Execute phase instructions
   134	```
   135	
   136	---
   137	
   138	## Gates (G0–G6)
   139	
   140	| Gate | Fase | Tipo | Condição |
   141	|---|---|---|---|
   142	| G0 | 1 | Auto | 7 campos obrigatórios presentes ou lacunas documentadas |
   143	| G1 | 3 | Auto | A-01 com rótulos epistêmicos em todas as afirmações |
   144	| G2 | 3 | **HUMANO ⚠** | Revisão do diagnóstico — NUNCA auto-avançar |
   145	| G3 | 4 | Auto | A-10 produzido, premissas rotuladas, scope confirmado |
   146	| G4 | 6 | Auto | validate_qa.py sai com código 0 (20/20 checks) |
   147	| G5 | 6 | **HUMANO ⚠** | Aprovação do pacote final — NUNCA auto-avançar |
   148	| G6 | 6 | **HUMANO ⚠** | Handoff de execução ou skip explícito — NUNCA auto-avançar |
   149	
   150	**G2, G5, G6 são HARDCODED. Nunca podem ser auto-avançados. Sem exceção.**
   151	Bloquear qualquer tentativa de avanço automático com mensagem explícita em português.
   152	
   153	---
   154	
   155	## Manifest — Máquina de Estado
   156	
   157	O manifest.yaml registra o estado completo do caso:
   158	- `current_phase`: fase ativa (1–6)
   159	- `scenario_selected`: A / B / C (definido ao final da Fase 1)
   160	- `artifacts_produced`: lista com path, fase e trilha de cada artefato
   161	- `gates_passed`: log de aprovações com approver e timestamp
   162	- `gates_pending`: gates ainda não aprovados
   163	- `client_identity.branding`: tokens de identidade do consultor
   164	
   165	Criação: `python scripts/init_case.py --consultant <id> --client <nome>`
   166	Avanço: `python scripts/advance_phase.py --gate <G0-G6> --approved-by <id>`
   167	
   168	---
   169	
   170	## Cenários de Entrada (seleção via G-I1 ao final da Fase 1)
   171	
   172	| Cenário | Quando usar | Pipeline | Duração | Tier padrão |
   173	|---|---|---|---|---|
   174	| A | Cliente novo, diagnóstico completo | Todas as 6 fases | 4–8h | Full (A-09) |
   175	| B | Cliente existente, revisão | Fases 1→3→5→6 | 1,5–3h | Lean (A-08) |
   176	| C | Proposta rápida pós-reunião | Fases 1→2→6 | 20–45 min | Não aplicável |
   177	
   178	---
   179	
   180	## Mapa de Divulgação Progressiva
   181	
   182	| Quando | Carregar |
   183	|---|---|
   184	| Em toda ativação | references/consultor-voice.md |
   185	| Fase 1 ativa | references/phase-01-intake.md |
   186	| Fase 2 ativa | references/phase-02-personalization.md |
   187	| Fase 3 ativa | references/phase-03-analytical.md |
   188	| Fase 3, frameworks analíticos | references/framework-library.md |
   189	| Fase 3, decisão estratégica | references/decision-modes.md |
   190	| Fase 3, qualquer rótulo sendo aplicado | references/epistemic-labels.md |
   191	| Fase 3, pesquisa de mercado | references/wide-search-catalog.md |
   192	| Fase 3, tier de análise selecionado | references/b-frames-tiers.md |
   193	| Fase 4 ativa | references/phase-04-simulation.md |
   194	| Fase 5 ativa | references/phase-05-architect.md |
   195	| Fase 5, compilação em execução | agents/document-compiler.md |
   196	| Fase 6 ativa | references/phase-06-delivery.md + references/cliente-voice.md |
   197	| Fase 6, QA em execução | references/qa-checklist.md |
   198	| Seleção de cenário (G-I1) | references/scenario-router.md |
   199	| Qualquer verificação de gate | references/gate-definitions.md |
   200	| Design de entregável | references/design-system.md |
   201	
   202	---
   203	
   204	## Cadeia de Artefatos
   205	
   206	| ID | Nome | Produzido por | Trilha |
   207	|---|---|---|---|
   208	| A-01 | Normalized Follow Up | Fase 1 | INTERNA |
   209	| A-02 | Proposta Comercial | Fase 2 | CLIENTE |
   210	| A-03 | Contrato de Fechamento + Showroom | Fase 2 | CLIENTE |
   211	| A-04 | Client Personalization Pack | Fase 2 | CLIENTE |
   212	| A-05 | Normalized Data (SVG + summary) | Fase 3 | INTERNA |
   213	| A-06 | B-Frames Output | Fase 3 | INTERNA |
   214	| A-07 | Basic-Tier Analysis | Fase 3 | INTERNA |
   215	| A-08 | Lean-Tier Analysis | Fase 3 | INTERNA |
   216	| A-09 | Full-Tier Analysis | Fase 3 | INTERNA |
   217	| A-10 | Simulation Phase 1 | Fase 4 | INTERNA |
   218	| A-11 | Simulation Phase 2 (Extended) | Fase 4 | INTERNA |
   219	| A-12 | Architect Pack | Fase 5 | AMBAS |
   220	| A-13 | Final Compilation Input (manifest) | Fase 5 | INTERNA |
   221	| A-MASTER | Master Document (.md) | Fase 5 (Agente 00) | AMBAS |
   222	| A-MASTER-LINEAR | Master (Linear/PM format) | Fase 5 | INTERNA |
   223	| A-FINAL | Final Designed Deliverable | Fase 6 | CLIENTE |
   224	| A-OPS | Executive Spreadsheet | Fase 6 | CLIENTE |
   225	
   226	**Trilha CLIENTE**: entregues ao cliente final. Nunca contêm IDs internos ou menção a IA.
   227	**Trilha INTERNA**: uso exclusivo do consultor. Incluídos no ZIP de auditoria.
   228	**Trilha AMBAS**: A-MASTER contém seções `[TRILHA_INTERNA]` e `[TRILHA_CLIENTE]` marcadas.
   229	
   230	---
   231	
   232	## Rótulos Epistêmicos (regra em toda análise)
   233	
   234	Toda afirmação em qualquer artefato analítico carrega um rótulo:
   235	- **[FATO]**: observado diretamente, declarado pelo cliente, ou de fonte primária verificada
   236	- **[INFERÊNCIA]**: deduzido de fatos disponíveis, com lógica clara
   237	- **[HIPÓTESE]**: premissa sem evidência atual, plausível mas não verificada
   238	
   239	Regra absoluta: hipóteses nunca propagam como fatos em artefatos downstream.
   240	Labels são preservados em toda compilação (Regra C5 do Agente 00).
   241	Apêndice B do A-MASTER lista todos os claims rotulados por seção.
   242	
   243	---
   244	
   245	## O que esta skill NÃO faz
   246	
   247	- Implementar ações recomendadas (apenas planejar)
   248	- Substituir julgamento do consultor em qualquer gate
   249	- Auto-avançar G2, G5 ou G6 — jamais
   250	- Entregar documentos com menção a Claude, Anthropic ou IA
   251	- Modificar casos concluídos sem nova seleção de cenário
   252	- Chamar outras skills ou serviços externos sem MCP disponível
   253	- Referenciar dados de outros clientes em um caso ativo
   254	
   255	---
   256	
   257	## Modos de Falha e Recuperação
   258	
   259	**1. Manifest ausente em retomada de caso**
   260	→ Perguntar: "Qual é o nome do cliente e em qual fase estamos?"
   261	→ Reconstruir estado mínimo. Oferecer reinicialização via init_case.py.
   262	
   263	**2. Briefing insuficiente (G0 falha)**
   264	→ Listar campos faltantes. Solicitar completude ou documentação explícita de lacuna.
   265	→ Nunca avançar sem 7 campos presentes OU gaps documentados.
   266	
   267	**3. G2 sendo tentado via auto-avanço**
   268	→ Bloquear com: "Gate G2 exige revisão humana explícita. Apresente o diagnóstico ao consultor e aguarde aprovação."
   269	
   270	**4. Branding não configurado na Fase 6**
   271	→ Usar defaults do design system. Alertar consultor: "Identidade não configurada — usando padrão."
   272	
   273	**5. validate_qa.py falha (G4)**
   274	→ Listar todos os problemas encontrados. Solicitar revisão. Nunca pular checks.
   275	→ Re-executar validate_qa.py após correções antes de apresentar ao consultor.
   276	
# **🎯 PRAXIS — Novo Caso Iniciado**

Ativando **Fase 1: Briefing e Roteamento**

Vou guiá-lo através de uma entrevista estruturada para capturar os dados essenciais da sua PME cliente. Isto criará a base para diagnóstico, proposta comercial e plano de ação.

---

## **Capture Inicial — 7 Campos Obrigatórios**

Responda com detalhes que você tem à mão. Campos em branco? Documentamos como "lacuna mapeada".
{
  "questions": [
    {
      "question": "Qual \u00e9 o **nome da empresa** (ou apelido/sigla)?",
      "options": [
        "Fornecer nome",
        "Ainda n\u00e3o tenho"
      ]
    },
    {
      "question": "Qual \u00e9 o **segmento/ind\u00fastria** principal? (Ex: tecnologia, varejo, servi\u00e7os, manufatura...)",
      "options": [
        "Fornecer segmento",
        "Ainda n\u00e3o mapeado"
      ]
    },
    {
      "question": "Qual \u00e9 o **principal desafio ou oportunidade** que traz o cliente at\u00e9 voc\u00ea?",
      "options": [
        "Desafio de crescimento/receita",
        "Opera\u00e7\u00e3o ou processos",
        "Mercado/posicionamento",
        "Estrutura/governan\u00e7a"
      ]
    }
  ]
}
Perfeito! Agora digite as informações do cliente para que eu **normalize o briefing** e prepare:

1. **A-01** — Normalized Follow Up (resumo executivo interno)
2. **Roteamento de cenário** (Diagnóstico Full, Lean ou Quick Proposal)
3. **Manifest.yaml** — rastreamento do caso

**Cole aqui:**
- Nome/contexto da empresa
- Desafio principal (tópico livre)
- Qualquer contexto adicional (receita, team size, histórico)

Ou use o formulário acima se preferir responder por caixas. 👇

---

**Você** _2026-04-25_

Continue

---

**Claude** _2026-04-25_

Entendido! Vamos para **modo de briefing aberto**.

---

## **Capture de Briefing Bruto**

Cole aqui tudo que você tem sobre o cliente — pode ser:
- **Notas da reunião** inicial
- **E-mail** do prospect
- **Contexto em parágrafo solto**
- **Dados estruturados** que você capturou

**Elementos ideais** (mas não obrigatórios):
- Nome da empresa / setor
- Tamanho aproximado (faturamento, equipe)
- Desafio/oportunidade principal
- Histórico ou contexto
- Expectativa do cliente (proposta? diagnóstico? roadmap?)

**Se não tiver tudo**, tudo bem — vou documentar as lacunas e avançamos.

---

### ⬇️ **Cole o briefing abaixo:**
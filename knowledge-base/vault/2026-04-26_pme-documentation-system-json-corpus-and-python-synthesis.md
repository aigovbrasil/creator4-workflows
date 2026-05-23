---
title: "PME documentation system JSON corpus and Python synthesis"
date: 2026-04-26
account: directjervis@gmail.com
uuid: ead6ad48-66b5-4feb-83eb-eee2384ced9b
messages: 2
tags: []
context: ""
---

**Você** _2026-04-26_

You are a senior knowledge architect operating in document distillation mode.-a)read all 7 project documents and produce a large structured JSON corpus plus a Python script. Let me read the documents first, then synthesize.
Let me read all the project files to get the full content. b)then synthesize everything and produce the JSON corpus + Python script.
Let me analyze the key data from all documents:
Source documents summary:

1. [ID-0-Normalized.md](http://ID-0-Normalized.md): Master plan - dual track system (Track A: Consulting Skill, Track B: Dutch market entry). Defines scope, phases F0→F5, gates, quality bars, constraints.
2. _ID-0-Main_plano_[final.md](http://final.md): Raw/bruto version - contains flow único normalizado (F0-F8), pilot case details, brief structure, deliverables for Ana case.
3. _ID-01ops-arquitetura_[cadeia-fases-gates.md](http://cadeia-fases-gates.md): Architecture chain - phases F1-F8 with gates, dependencies, frameworks per phase, stack, failure points, info flow, strategic gaps.
4. _ID-02_descritivo_[Piloto.md](http://Piloto.md): Pilot case description - MEI beauty studio case (Ana), ICP dual, what client asks, deliverables expected.
5. ID-04-SPECS-_CONSULTOR_[ANATOMIA.md](http://ANATOMIA.md): Consultant anatomy - deliverables for Ana (6 files), internal deliverables (7 files), workflow while Ana waits (T0→Day 3), research sources, decision rules, decision tree.
6. _ID-05-SKILL_CREATOR_[SPECS.md](http://SPECS.md): Skill creator specs + Ana's full deliverables - the complete output that the skill generates for the Ana pilot case.
7. ID0_Main_Plano_Final_ORGANIZADO.xlsx: Organized version (binary, content in other docs). Run [construct the 17 artifacts across 5 layers, plus Module A (CCSIB) and Module B (HOB).
The system prompt asks me to construct these from the source documents. The 17 artifacts are:
   * Layer 1: Vision, MRD, PRFAQ (A01, A02, A03)
   * Layer 2: Business Case, Charter, BRD (A04, A05, A06)
   * Layer 3: PRD, FRD, NFR, ArchSpec, ADR (A07, A08, A09, A10, A11)
   * Layer 4: Roadmap, Stories, Backlog, Release Plan (A12, A13, A14, A15)
   * Layer 5: SOP, Runbook (A16, A17)
Now let me build this JSON carefully, applying density rules D1-D8 and the necessary/sufficient test.] prompt [Your mission is to extract, compress, and synthesize their content into a single structured JSON corpus that preserves all logic and dependencies, eliminates narrative redundancy, YOU WILL CONSTRUCT the 17 canonical artifacts + Module A (CCSIB) + Module B (HOB), and applies "necessary and sufficient" density per element — not minimum, not maximum.The documents define a PME documentation system. CORE = 17 artifacts across 5 layers (Layer 1: Vision/MRD/PRFAQ; Layer 2: Business Case/Charter/BRD; Layer 3: PRD/FRD/NFR/ArchSpec/ADR; Layer 4: Roadmap/Stories/Backlog/Release Plan; Layer 5: SOP/Runbook). Module A = CCSIB 3-stage pipeline (raw → valid __[SKILL.md](http://SKILL.md)__ → Claude Code instruction; __[CLAUDE.md](http://CLAUDE.md)__ ≤200 lines hard limit). Module B = HOB hands-off bundle (FULL/CORE_PME/CUSTOM granularity; .md/.txt/.yaml/.json formats; 1 validation gate then zero interruptions). DENSITY RULES — apply per element, not globally: D1 Dependency entries: name + strong_deps[] + optional_deps[] + parallel_docs[] + reused_by[] only. No prose. D2 Artifact definitions: key_question (1 sentence) + conclusion_output (noun phrase) + epistemic_label + lite_format (1 line) + layer. No citations or rationale. D3 Operational rules: 1 imperative sentence each. IF-condition format when conditional. D4 Framework entries: name + function_class (F1–F7) + one_line + when_use (≤10 words) + when_not_use (≤10 words). D5 CCSIB stages: stage_id + input_type + process (1 sentence) + output_artifacts[]. D6 HOB options: option_name + values[] + default + validation_rule. D7 Anti-patterns: error + cause (≤8 words) + correction (imperative). D8 PME adaptations: dimension + adaptation (1 sentence). NECESSARY/SUFFICIENT TEST — apply sentence by sentence to every field value: "If I remove this, does the consuming agent lose the ability to correctly generate, validate, or sequence the artifact?" YES = keep. NO = cut.MANDATORY JSON SCHEMA — produce exactly these top-level keys, no additions or removals: corpus_meta | dependency_graph | artifacts | core_pme_profile | reasoning_frameworks | framework_stacks | anti_patterns | module_a_ccsib | module_b_hob | system_constraints | pme_adaptations SCHEMA DETAIL: artifacts array: objects with id (A01–A17), name, layer (1–5), key_question, conclusion_output, epistemic_label, lite_format, strong_deps[], optional_deps[], reused_by[], omit_condition, content_template {sections[], required_fields[], optional_fields[]}. reasoning_frameworks array: objects with name, function_class, function_label, one_line, when_use, when_not_use. (21 frameworks total: Cynefin/PESTEL/Porter/JTBD/SWOT/MECE/FirstPrinciples/OKR/BSC/TOC/Pareto/GUT/Ishikawa/5Whys/5W2H/PDCA/OODA/SCQA/BLUF/5Ps/7Ps) module_a_ccsib: description + hard_constraints[] + pipeline (exactly 3 stage objects) + claude_md_rules[] + full_directory_structure + activation_triggers[] + non_activation[]. module_b_hob: description + granularities (exactly 3: FULL/CORE_PME/CUSTOM) + output_formats[] + flow_steps[] + gate_g1_checklist[] + hard_constraints[]. dependency_graph: strong [{from,to}] + optional [{from,to,condition}] + parallel [{docs[],note}]. Encode ALL dependencies, not a summary. OUTPUT RULES: 1. Valid parseable JSON only. No markdown fences. No prose before or after the JSON. 2. Plain text inside all string values — no markdown. 3. No empty arrays — use null if no valid entries. 4. Do not invent data not present in source documents. 5. Do not omit any artifact. Exactly 17 objects in artifacts[]. 6. Epistemic labels per artifact and perframework_stack entry only. 7. content_template.sections = ordered headings a generating agent needs, not the content itself.EXECUTION SEQUENCE: (1) Read all 7 documents fully. (2) Apply D1–D8 density rules. (3) Apply necessary/sufficient test sentence by sentence. (4) Produce JSON. (5) Self-validate: 17 artifacts? you produce from the 7 doc’s and 3 CCSIB stages? 3 HOB granularities? Full dependency graph? (6) Produce Python script. (7) Output JSON then script. Nothing else. ————————————NOW RUN DOC’S ARE ACTIVE IN THE PROJECT

---

**Claude** _2026-04-26_

225K	/mnt/project
12K	/mnt/project/ID-0-Normalized.md
51K	/mnt/project/ID0_Main_Plano_Final_ORGANIZADO.xlsx
112K	/mnt/project/_ID-0-Main_plano_final.md
4.0K	/mnt/project/_ID-01ops-arquitetura_cadeia-fases-gates.md
14K	/mnt/project/_ID-02_descritivo_Piloto.md
6.5K	/mnt/project/_ID-04_-_SPECS_-_CONSULTOR_ANATOMIA.md
23K	/mnt/project/_ID-05-SKILL_CREATOR_SPECS.md

     1	ANEXO B — BRIEFING FICTÍCIO PRONTO PARA RODAR A SKILL
     2	
     3	B1. Briefing bruto da Ana
     4	
     5	CLIENTE: Ana Souza
     6	
     7	TIPO DE CASO: Pré-abertura de pequeno negócio local
     8	
     9	NEGÓCIO DESEJADO: Estúdio de beleza de bairro
    10	
    11	LOCAL: bairro residencial/comercial em cidade média de SP
    12	
    13	  
    14	
    15	CONTEXTO:
    16	
    17	Ana tem 34 anos e trabalha há aproximadamente 5 anos com serviços de beleza.
    18	
    19	Hoje atende principalmente por indicação, em casa ou na casa de clientes.
    20	
    21	Ela faz manicure, escova simples, design de sobrancelha e alguns pacotes combinados.
    22	
    23	Ela quer abrir um pequeno estúdio porque sente que atender de forma improvisada limita sua renda e passa menos profissionalismo.
    24	
    25	  
    26	
    27	OBJETIVO DECLARADO:
    28	
    29	“Quero abrir meu espaço e saber se vale a pena alugar uma sala pequena.”
    30	
    31	  
    32	
    33	OBJETIVO REAL A INVESTIGAR:
    34	
    35	Descobrir se Ana deve abrir ponto fixo agora ou validar demanda primeiro com um modelo mais leve.
    36	
    37	  
    38	
    39	DADOS DECLARADOS:
    40	
    41	- Clientes recorrentes atuais: entre 18 e 25 por mês.
    42	
    43	- Ticket médio aproximado: R$ 65 por atendimento.
    44	
    45	- Receita mensal estimada: R$ 2.000 a R$ 3.200.
    46	
    47	- Capital disponível para investir: entre R$ 8.000 e R$ 12.000.
    48	
    49	- Aluguel de salas vistas por Ana: entre R$ 1.500 e R$ 2.200 por mês.
    50	
    51	- Instagram atual: existe, mas com baixa frequência de postagem.
    52	
    53	- WhatsApp: principal canal de agendamento.
    54	
    55	- Indicação: principal fonte de clientes.
    56	
    57	- Equipe: Ana pretende começar sozinha.
    58	
    59	- Meta: faturar pelo menos R$ 6.000 por mês em até 6 meses.
    60	
    61	- Medo principal: assumir aluguel e não conseguir encher agenda.
    62	
    63	  
    64	
    65	SERVIÇOS INICIAIS:
    66	
    67	- Manicure simples
    68	
    69	- Pedicure
    70	
    71	- Escova
    72	
    73	- Design de sobrancelha
    74	
    75	- Combo mensal de beleza básica
    76	
    77	- Atendimento com hora marcada
    78	
    79	  
    80	
    81	RESTRIÇÕES:
    82	
    83	- Baixo capital.
    84	
    85	- Sem equipe fixa.
    86	
    87	- Sem controle financeiro formal.
    88	
    89	- Sem lista organizada de clientes.
    90	
    91	- Sem validação clara de demanda por bairro.
    92	
    93	- Sem definição final de preços.
    94	
    95	- Sem decisão sobre MEI/CNAE/alvará.
    96	
    97	  
    98	
    99	PERGUNTAS DA ANA:
   100	
   101	1. Vale a pena abrir agora?
   102	
   103	2. Começo em casa, sala compartilhada ou ponto fixo?
   104	
   105	3. Quanto preciso faturar por mês para compensar?
   106	
   107	4. O que devo vender primeiro?
   108	
   109	5. Como consigo mais clientes?
   110	
   111	6. O que preciso resolver antes de formalizar?
   112	
   113	7. O que faço nos próximos 30 dias?
   114	
   115	  
   116	
   117	ENTREGÁVEIS ESPERADOS:
   118	
   119	1. Diagnóstico executivo de viabilidade.
   120	
   121	2. Matriz de decisão comparando opções de operação.
   122	
   123	3. Plano 5W2H de 30 dias.
   124	
   125	4. Checklist de pré-abertura.
   126	
   127	5. Resumo simples para WhatsApp.
   128	
   129	  
   130	
   131	LIMITES:
   132	
   133	- Não garantir sucesso financeiro.
   134	
   135	- Não definir formalização final sem validação oficial.
   136	
   137	- Não recomendar aluguel de ponto sem evidência mínima de demanda.
   138	
   139	- Não inventar dados de mercado.
   140	
   141	- Marcar como estimativa tudo que não tiver fonte ou comprovação.
   142	
   143	  
   144	
   145	ANEXO C — INSTRUÇÃO PARA A SKILL/CONSULTOR RODAR O CASO
   146	
   147	TAREFA:
   148	
   149	Atue como consultor de pequenos negócios. Use o briefing da Ana para gerar uma consultoria curta de pré-abertura.
   150	
   151	  
   152	
   153	REGRA PRINCIPAL:
   154	
   155	Não prometa viabilidade. Não invente dados. Separe:
   156	
   157	[FATO DECLARADO]
   158	
   159	[HIPÓTESE]
   160	
   161	[INFERÊNCIA]
   162	
   163	[LACUNA]
   164	
   165	[RECOMENDAÇÃO]
   166	
   167	  
   168	
   169	PROCESSO:
   170	
   171	1. Normalize o briefing.
   172	
   173	2. Identifique objetivo declarado e objetivo real.
   174	
   175	3. Liste lacunas críticas antes da decisão.
   176	
   177	4. Pesquise/considere:
   178	
   179	   - formalização MEI em termos gerais;
   180	
   181	   - estrutura de plano de negócio;
   182	
   183	   - concorrência local;
   184	
   185	   - canais de aquisição;
   186	
   187	   - custos fixos;
   188	
   189	   - capacidade de agenda;
   190	
	< truncated lines 191-335 >
   336	|Posso ser MEI?|Checagem preliminar dos critérios, sem substituir contador/Sebrae|
   337	|O que faço primeiro?|Plano 5W2H de 30 dias|
   338	|Quando paro ou avanço?|Critérios de decisão com metas mínimas|
   339	
   340	Sobre MEI, o Gov.br informa limites e condições como faturamento anual de até R$ 81.000, não participar de outra empresa como titular/sócio/administrador, não ter filial e poder contratar no máximo um empregado dentro das condições permitidas. Isso entra no briefing como trava de realidade, não como parecer contábil final.  
   341	
   342	  
   343	---
   344	Conclusão
   345	
   346	A recomendação fiel à realidade é: Ana não deve alugar ponto próprio agora. O briefing tem demanda inicial, mas ainda tem lacunas críticas: receita declarada inconsistente com número de clientes, custos fixos não validados, preço sem margem calculada e canal de aquisição dependente de indicação. O melhor aconselhamento é uma validação operacional de 30 dias, com agenda estruturada, controle financeiro, oferta simples, teste de demanda e comparação entre casa, sala compartilhada, sublocação e ponto próprio. A consultoria termina com decisão orientada, plano de ação e critérios objetivos para avançar ou parar.
   347	
   348	  ——— 
   349	  # Delivrees ana 
   350	
   351	1-Diagnóstico executivo de viabilidade
   352	
   353	Caso analisado
   354	
   355	Ana Souza, 34 anos, profissional autônoma de beleza, quer abrir um pequeno estúdio no bairro. Hoje atende por indicação, WhatsApp e Instagram pouco estruturado. Declara 18 a 25 clientes recorrentes por mês, ticket médio aproximado de R$ 65, receita mensal estimada entre R$ 2.000 e R$ 3.200, capital disponível entre R$ 8.000 e R$ 12.000 e aluguel de salas entre R$ 1.500 e R$ 2.200.
   356	
   357	A metodologia usada segue o desenho do seu próprio flow: primeiro normalizar o caso, separar fato/inferência/hipótese, diagnosticar, priorizar e só então transformar em plano de ação. Esse encadeamento é coerente com a estrutura dos seus documentos, que definem a skill como motor consultivo com alinhamento, diagnóstico, normalização analítica, priorização, plano e acompanhamento, não como “gerador solto de documentos”  . Também preserva a lógica de diagnóstico antes de plano, com gates entre fases e entregáveis internos/externos  .
   358	
   359	2-Situação atual
   360	
   361	|   |   |
   362	|---|---|
   363	|Tipo|Evidência|
   364	|[FATO DECLARADO]|Ana já tem experiência, clientes recorrentes e canal de indicação.|
   365	|[FATO DECLARADO]|O capital disponível é limitado para assumir ponto fixo.|
   366	|[INCONSISTÊNCIA]|18 a 25 clientes × R$ 65 = R$ 1.170 a R$ 1.625 se cada cliente fizer 1 atendimento/mês. Para chegar a R$ 2.000–R$ 3.200, Ana precisa de mais atendimentos, maior ticket, combos ou clientes com recorrência maior.|
   367	|[LACUNA]|Não há lista organizada de clientes, frequência, margem por serviço, custo de insumos, ocupação da agenda ou concorrência mapeada.|
   368	|[LACUNA]|Não há validação se a atividade pretendida, faturamento e estrutura cabem no MEI.|
   369	
   370	Como referência de realidade, o MEI tem limite geral de faturamento anual de até R$ 81.000, precisa exercer atividade permitida, não pode ser titular/sócio/administrador de outra empresa, não pode ter filial e pode contratar no máximo um empregado dentro das regras aplicáveis. Isso deve ser verificado antes de formalização, não assumido como certo.  
   371	
   372	3-Problema central
   373	
   374	Ana está tentando tomar uma decisão de custo fixo — alugar ponto — antes de provar três coisas: demanda mínima, margem por serviço e capacidade de aquisição recorrente.
   375	
   376	A pergunta correta não é “vale abrir um estúdio?”. A pergunta correta é: Ana já tem demanda, margem e previsibilidade suficientes para assumir aluguel fixo sem comprometer o caixa?
   377	
   378	Resposta atual: ainda não há evidência suficiente.
   379	
   380	4-Diagnóstico por eixo
   381	
   382	|   |   |   |   |
   383	|---|---|---|---|
   384	|Eixo|Leitura|Risco|Status|
   385	|Demanda|Existe base inicial, mas pequena e pouco medida|Abrir ponto sem agenda cheia|Parcial|
   386	|Oferta|Serviços comuns: manicure, escova, sobrancelha, combos|Pouca diferenciação|Parcial|
   387	|Finanças|Receita e ticket informados não fecham matematicamente|Decisão baseada em percepção, não em números|Crítico|
   388	|Aquisição|Indicação e WhatsApp são fortes, Instagram fraco|Dependência de rede atual|Parcial|
   389	|Operação|Começaria sozinha|Sobrecarga operacional|Atenção|
   390	|Formalização|MEI é hipótese possível, não decisão fechada|Atividade/limite/regras precisam validação|Pendente|
   391	|Local|Salas vistas entre R$ 1.500 e R$ 2.200|Custo fixo alto para receita atual|Crítico|
   392	
   393	O Sebrae orienta que o plano de negócio ajude a levantar informações sobre ramo, produtos/serviços, clientes, concorrentes, fornecedores, pontos fortes/fracos e viabilidade da ideia; portanto, a decisão de ponto físico deve vir depois desse levantamento mínimo, não antes.  
   394	
   395	5-Recomendação principal
   396	
   397	Não alugar ponto próprio agora.
   398	
   399	A melhor decisão é executar uma validação de 30 dias com três metas:
   400	
   401	1. provar demanda: aumentar de 18–25 clientes/mês para pelo menos 35–45 atendimentos pagos/mês;
   402	2. provar margem: saber lucro aproximado por serviço e por pacote;
   403	3. provar canal: gerar clientes por WhatsApp, indicação estruturada, Instagram local e parcerias, não apenas por demanda espontânea.
   404	
   405	O melhor caminho operacional é: continuar sem ponto fixo por 30 dias, estruturar agenda e oferta, testar pacotes, registrar todos os números e avaliar sala compartilhada/sublocação como etapa intermediária.
   406	
   407	5-Critérios para avançar depois de 30 dias
   408	
   409	Ana só deve considerar sala compartilhada, sublocação ou ponto próprio se cumprir pelo menos 4 dos 5 critérios:
   410	
   411	|   |   |
   412	|---|---|
   413	|Critério|Meta mínima|
   414	|Agenda|35–45 atendimentos pagos no mês|
   415	|Receita bruta|Aproximação de R$ 4.000–R$ 5.000 antes de aluguel|
   416	|Recompra|Pelo menos 40% dos clientes retornando ou agendando próximo serviço|
   417	|Canal|Pelo menos 10 novos contatos qualificados gerados fora da base atual|
   418	|Controle|Registro simples de receita, custos, insumos, tempo e margem por serviço|
   419	
   420	  
   421	6- Matriz de decisão operacional
   422	
   423	Alternativas avaliadas
   424	
   425	|   |   |   |   |   |   |
   426	|---|---|---|---|---|---|
   427	|Opção|Custo fixo|Risco|Potencial|Quando faz sentido|Decisão agora|
   428	|A. Continuar em casa com agenda estruturada|Baixo|Baixo|Médio|Quando ainda faltam dados de demanda e margem|Recomendado para os primeiros 30 dias|
   429	|B. Atender em sala compartilhada por diária/horário|Médio-baixo|Médio-baixo|Médio|Quando já há clientes agendados para dias específicos|Testar depois de 2 semanas|
   430	|C. Sublocar cadeira/sala em salão existente|Médio|Médio|Médio-alto|Quando há parceria confiável e fluxo potencial|Avaliar, não fechar agora|
   431	|D. Alugar ponto próprio|Alto|Alto|Alto|Só com demanda comprovada, capital e margem|Não recomendado agora|
   432	
   433	7-Score de decisão
   434	
   435	Escala: 1 = ruim; 5 = forte.
   436	
   437	|   |   |   |   |   |   |
   438	|---|---|---|---|---|---|
   439	|Critério|Peso|Casa estruturada|Sala compartilhada|Sublocação|Ponto próprio|
   440	|Baixo risco financeiro|5|5|4|3|1|
   441	|Facilidade de começar|4|5|4|3|2|
   442	|Percepção profissional|3|2|4|4|5|
   443	|Controle da operação|3|4|3|3|5|
   444	|Flexibilidade|4|5|4|3|1|
   445	|Capacidade de testar demanda|5|5|4|3|2|
   446	|Custo compatível com receita atual|5|5|4|3|1|
   447	|Score ponderado|—|122|103|78|59|
   448	
   449	8-Decisão
   450	
   451	A melhor opção agora é A — continuar sem ponto fixo, mas com operação mais profissionalizada por 30 dias.
   452	
   453	A segunda opção é B — testar sala compartilhada por diária/horário, mas somente se Ana conseguir preencher horários antes de pagar pelo espaço.
   454	
   455	A opção D — ponto próprio deve ficar bloqueada até Ana provar demanda, margem, canal e capital de giro.
   456	
   457	Conselho direto para Ana
   458	
   459	“Ana, você tem sinais positivos, mas ainda não tem dados suficientes para assumir aluguel fixo. O próximo passo mais seguro é transformar esses 30 dias em um teste real: organizar agenda, medir receita, criar pacotes, ativar indicação, testar divulgação local e entender se existe demanda suficiente. Se os números baterem, você avança para sala compartilhada ou sublocação. Ponto próprio fica para uma fase posterior.”
   460	
   461	  
   462	
   463	9-Plano 5W2H de 30 dias
   464	
   465	O 5W2H é adequado aqui porque transforma uma decisão simples em plano executável, respondendo o que será feito, por quê, onde, quando, quem fará, como e quanto custará. O Sebrae descreve a ferramenta exatamente como uma forma prática de organizar ações e monitorar execução.  
   466	
   467	Objetivo dos 30 dias
   468	
   469	Validar se Ana tem demanda, margem e canal suficientes para avançar para uma estrutura física mais profissional sem assumir risco fixo prematuro.
   470	
   471	  
   472	
   473	Plano 5W2H
   474	
   475	|   |   |   |   |   |   |   |   |
   476	|---|---|---|---|---|---|---|---|
   477	|O quê|Por quê|Quem|Quando|Onde|Como|Quanto|KPI / Gate|
   478	|Organizar base de clientes atual|Saber quem compra, com que frequência e qual serviço|Ana|Dias 1–2|WhatsApp/planilha|Listar nome, serviço, valor pago, data, retorno esperado|R$ 0|100% dos clientes atuais cadastrados|
   479	|Corrigir os números do negócio|Resolver inconsistência entre clientes, ticket e receita|Ana + consultor|Dias 1–3|Planilha simples|Registrar últimos 30–60 dias: atendimentos, ticket, insumos, receita|R$ 0|Receita real validada|
   480	|Definir cardápio enxuto de serviços|Evitar oferta dispersa e facilitar venda|Ana|Dias 3–5|WhatsApp/Instagram|Criar 3 pacotes: serviço avulso, combo, pacote mensal|R$ 0–100|3 ofertas prontas e divulgáveis|
   481	|Criar meta de agenda para 30 dias|Testar demanda antes de aluguel|Ana|Dias 5–30|Agenda/WhatsApp|Abrir horários fixos, controlar ocupação e remarcações|R$ 0|35–45 atendimentos pagos|
   482	|Rodar campanha de indicação|Usar canal mais forte atual|Ana|Dias 5–20|WhatsApp|Mensagem para clientes atuais oferecendo benefício simples por indicação|R$ 100–300 em bônus/desconto|10 indicações recebidas|
   483	|Fazer pesquisa local de concorrência|Entender preço, posicionamento e diferenciação|Consultor + Ana|Dias 5–10|Google Maps, Instagram, bairro|Mapear 10 concorrentes: preço, serviços, avaliação, diferenciais|R$ 0|10 referências mapeadas|
   484	|Testar conteúdo local no Instagram|Melhorar aquisição sem tráfego pago|Ana|Dias 7–30|Instagram|3 posts/semana: antes/depois, bastidor, oferta, depoimento|R$ 0|12 posts + 20 conversas iniciadas|
   485	|Avaliar sala compartilhada|Testar ambiente profissional sem aluguel fixo|Ana|Dias 15–25|Salões/salas locais|Cotar diárias/horários e só reservar se houver clientes agendados|Variável|Pelo menos 1 teste com agenda paga|
   486	|Checar formalização MEI|Evitar erro de enquadramento|Ana|Dias 10–20|Gov.br/Sebrae/contador|Validar atividade permitida, limite de faturamento e obrigações|R$ 0–consultoria|Decisão: MEI agora ou depois|
   487	|Fazer reunião de decisão|Decidir próximo passo com base em dados|Ana + consultor|Dia 30|Online/presencial|Revisar KPIs e escolher: manter teste, sala compartilhada, sublocar ou ponto|Incluso|Decisão documentada|
   488	
   489	  
   490	
   491	10-Checklist de execução semanal
   492	
   493	|   |   |   |
   494	|---|---|---|
   495	|Semana|Foco|Entrega esperada|
   496	|Semana 1|Organizar dados e oferta|Base de clientes, números reais, serviços/pacotes|
   497	|Semana 2|Ativar demanda|Campanha de indicação, Instagram, concorrência local|
   498	|Semana 3|Testar operação profissional|Agenda mais cheia, possível sala compartilhada|
   499	|Semana 4|Medir e decidir|KPIs, matriz revisada, recomendação final|
   500	
   501	  
   502	
   503	11-Gates de decisão no dia 30
   504	
   505	|   |   |
   506	|---|---|
   507	|Resultado do teste|Decisão recomendada|
   508	|Menos de 25 atendimentos pagos|Não abrir ponto; ajustar oferta e aquisição|
   509	|25–35 atendimentos pagos|Continuar validação mais 30 dias|
   510	|35–45 atendimentos pagos com margem clara|Testar sala compartilhada ou sublocação|
   511	|45+ atendimentos, agenda recorrente, margem positiva e capital preservado|Avaliar ponto próprio com cautela|
   512	|Receita cresce, mas sem controle de custos|Não avançar até validar margem|
   513	
   514	  
   515	
   516	12-Mensagem final para Ana
   517	
   518	“Ana, o seu negócio tem sinais positivos porque você já tem clientes, experiência e demanda por indicação. Mas ainda não é seguro assumir aluguel fixo. O principal risco é transformar uma renda autônoma ainda pouco medida em uma estrutura com custo mensal obrigatório. O caminho mais prudente é fazer um teste de 30 dias com agenda, pacotes, indicação, controle financeiro e pesquisa local. Se os números mostrarem demanda recorrente e margem suficiente, a próxima etapa deve ser sala compartilhada ou sublocação. Ponto próprio só depois de comprovar tração.”
   519	
   520	  
   521	
   522	13-Encerramento da consultoria
   523	
   524	Esta consultoria acaba com três entregas: diagnóstico executivo, matriz de decisão e plano 5W2H de 30 dias. O escopo não inclui abrir CNPJ, escolher CNAE final, negociar aluguel, montar identidade visual, rodar tráfego pago ou acompanhar a execução. A próxima venda natural é um acompanhamento de 30 dias, com revisão semanal da agenda, receita, custos, clientes e decisão de avanço.
Now I have all 7 documents fully read. Let me construct the complete corpus JSON and Python script.
{"returncode":0,"stdout":"Filesystem      Size  Used Avail Use% Mounted on\nnone            9.9G  4.5M  9.9G   1% /\nPython 3.12.3\n","stderr":""}
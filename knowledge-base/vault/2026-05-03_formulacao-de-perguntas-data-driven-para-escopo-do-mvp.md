---
title: "Formulação de perguntas data-driven para escopo do MVP"
date: 2026-05-03
account: on.26.leonardo@gmail.com
uuid: 5046a924-c82a-4401-bca3-80a3e758ccc7
messages: 6
tags: []
context: ""
---

**Você** _2026-05-03_

Estamos em Cmd PRE-RESEARCH: ANALISE O ISUMO_BASE ADD ao projeto e formule o escopo de perguntas certa data-driven que habilitem leonardo a desenvolver a solucao correta,posicionamento,e obtenha projecao e clareza de potencial de negocio e uni ecomics para inciar o mvp road map a pesquisa sera com opus 4.7 com wide pesquisa e deve devolver reposta consisa e com plano acionavel. agora fromule as perguntas e dolva o cmd

---

**Claude** _2026-05-03_

## PRE-RESEARCH ANALYSIS · INSUMO-BASE → RESEARCH PROTOCOL

**TOKEN BUDGET**  
├── INSUMO-BASE: ~12K tokens lidos  
├── Análise: 3K tokens  
└── Comando estruturado: 2K tokens

---

## GAPS CRÍTICOS NO INSUMO-BASE

**HYPOTHESIS SEM VALIDAÇÃO NUMÉRICA:**
```yaml
H1_workflow_tempo:
  - proposta_horas: "4-8h" [HYPOTHESIS]
  - propostas_mes: "5-15" [HYPOTHESIS]  
  - diagnostico_horas: "8-40h típico" [INFERENCE Sebrae]
  - conversion_rate: "15-20%" [INFERENCE]
  
H2_wtp_real:
  - preco_aceito: R$1.997 [NÃO TESTADO]
  - elasticidade: R$997 vs R$1.497 vs R$1.997 [GAP]
  - preferencia_parcelamento: 12x vs à vista [GAP]
  
H3_early_adopter_profile:
  - penetracao_ai_pme: "18% usam IA estruturada" [FACT Sebrae]
  - mas_quantos_consultores_especificamente: [GAP]
  - ferramentas_atuais: ChatGPT? Claude? Gemini? [GAP]
  
H4_competitive_moat:
  - RDD/PunkMetrics_lancamento: "não vendem toolkit" [FACT jan/2025]
  - status_atual_maio_2026: [GAP - pode ter mudado]
  - anthropic_br_timeline: maio/2026 AI Festival [FACT]
  - mas_impacto_real_no_nicho: [GAP]
```

---

## COMANDO NORMALIZADO · OPUS 4.7 RESEARCH

```markdown
# RESEARCH PROTOCOL · Toolkit Claude PME Brasil

**CONTEXTO:**
Fundador solo BR (Leonardo) desenvolveu 38 skills Claude para consultores PME.
Precisa validar viabilidade comercial de M1 FULL-CYCLE (Bússola Toolkit) antes de MVP.
Pesquisa anterior identificou GAP competitivo e scoring M1=9,10/10, mas com números-chave em HYPOTHESIS.

**ICP DECLARADO:**
- Consultor PME Brasil (1-3 pessoas)
- Faturamento R$10-80k/mês
- Early AI adopter (já usa ChatGPT/Claude sem estrutura)
- Vertical: gestão, processos, estratégia PME

**OBJETIVO DESTA RESEARCH:**
Preencher 6 GAPS críticos com dados numéricos brasileiros maio/2026 que habilitem:
├── Validação de pricing R$1.997 vs alternativas
├── Calibração de ROI prometido (claim atual: +1.583%)
├── Mapeamento workflow real com tempos verificáveis
├── Confirmação do moat competitivo (RDD/PunkMetrics/novos players)
├── Sizing de mercado endereçável (quantos consultores PME AI-ready BR)
└── GTM roadmap data-driven (não baseado em suposições)

---

## PERGUNTAS OBRIGATÓRIAS · Wide Search Required

### Q1: WORKFLOW TEMPO REAL
**Wide searches obrigatórias:**
- "tempo médio proposta consultoria PME Brasil 2025 2026"
- "processo comercial consultoria etapas horas"
- "diagnóstico empresarial consultoria quanto tempo"
- "proposta comercial consultoria tempo elaboração"

**Output acionável Q1:**
```yaml
workflow_7_steps:
  step_1_primeiro_contato:
    tempo_medio: [X] minutos
    frequencia_mes: [Y] vezes
    pain_point_principal: "[descrição específica]"
    
  step_2_briefing_discovery:
    tempo_medio: [X] horas
    metodo_atual: "[manual/gravação/forms]"
    pain_point_principal: "[descrição específica]"
    
  step_3_diagnostico:
    tempo_medio: [X] horas
    ferramentas_usadas: "[Excel/Notion/manual]"
    pain_point_principal: "[descrição específica]"
    
  step_4_proposta:
    tempo_medio: [X] horas [CRÍTICO - validar 4-8h]
    propostas_mes: [Y] [CRÍTICO - validar 5-15]
    conversion_rate: [Z]% [CRÍTICO - validar 15-20%]
    
  step_5_apresentacao:
    tempo_medio: [X] horas
    formato_preferido: "[deck/doc/video]"
    
  step_6_execucao:
    duracao_tipica_projeto: [X] semanas
    entregas_intermediarias: [Y] por projeto
    
  step_7_entrega_final:
    tempo_medio: [X] horas
    formato_preferido: "[relatorio/apresentacao/dashboard]"

total_horas_ciclo_completo: [SOMA]
custo_oportunidade_mensal_R$: [CALCULO baseado R$150/h mediana]
```

---

### Q2: WTP E ELASTICIDADE DE PREÇO
**Wide searches obrigatórias:**
- "quanto custa ferramenta IA consultoria Brasil"
- "preço médio curso prompt engineering Hotmart 2026"
- "investimento software consultoria PME Brasil"
- "automação propostas consultoria preço Brasil"

**Output acionável Q2:**
```yaml
pricing_landscape_br_maio_2026:
  
  cursos_prompt_ia_hotmart:
    - nome: "[produto]"
      preco: R$ [valor]
      formato: "[one-time/recorrente/vitalício]"
      entregas: "[descrição]"
    # repetir para 5-8 produtos identificados
  
  ferramentas_proposta_ia:
    - nome: "[Fyrmo/Inner/outros]"
      preco_mensal: R$ [valor]
      preco_anual: R$ [valor]
      target: "[perfil cliente]"
    # repetir para produtos ativos maio/2026
  
  mentorias_premium:
    - nome: "[Daniel Monaco/outros]"
      preco: R$ [valor]
      formato: "[grupo/1-1/self-paced]"
    # repetir para 3-5 identificados
  
  analise_elasticidade:
    preco_medio_infoproduto_ia: R$ [mediana calculada]
    preco_medio_saas_consultoria: R$ [mediana calculada]
    gap_vs_m1_proposto: "[% acima/abaixo]"
    recomendacao_pricing: "[justificada com dados]"
```

---

### Q3: PERFIL EARLY ADOPTER REAL
**Wide searches obrigatórias:**
- "consultores PME Brasil usando Claude API 2026"
- "adoção inteligência artificial consultoria Brasil estatísticas"
- "ferramentas IA mais usadas consultores Brasil"
- "LinkedIn consultoria PME Brasil Claude ChatGPT"

**Output acionável Q3:**
```yaml
early_adopter_sizing:
  
  mercado_total:
    consultores_pme_brasil: [número estimado]
    fonte: "[URL]"
    criterio: "[1-10 pessoas / faturamento X]"
  
  penetracao_ia:
    percentual_usando_chatgpt: [X]%
    percentual_usando_claude: [Y]%
    percentual_usando_ia_estruturada: [Z]%
    fonte: "[Sebrae/outra]"
  
  tam_sam_som:
    tam_total_consultores: [número]
    sam_early_adopters_ia: [número × %penetração]
    som_target_12_meses: [número realista]
    revenue_potential_som: R$ [SOM × R$1.997]
  
  comportamento_atual:
    ferramentas_atuais_top3: "[lista]"
    pain_points_identificados: "[lista]"
    triggers_compra: "[lista]"
```

---

### Q4: COMPETITIVE MOAT MAIO/2026
**Wide searches obrigatórias:**
- "Roberto Dias Duarte Claude skills 2026"
- "Daniel Furtado PunkMetrics Claude toolkit"
- "skills Claude português Brasil marketplace"
- "Anthropic Brasil lançamento 2026 planos"

**Output acionável Q4:**
```yaml
competitive_landscape_update:
  
  rdd_status_maio_2026:
    produtos_lancados: "[sim/não - se sim, quais]"
    pricing_observado: R$ [se aplicável]
    posicionamento: "[descrição]"
    url_produto: "[se existir]"
  
  punkmetrics_status_maio_2026:
    produtos_lancados: "[sim/não - se sim, quais]"
    pricing_observado: R$ [se aplicável]
    posicionamento: "[descrição]"
  
  novos_players_identificados:
    - nome: "[player]"
      produto: "[descrição]"
      preco: R$ [valor]
      lancamento: "[data]"
      threat_level: "[baixo/médio/alto vs M1]"
    # repetir para todos identificados
  
  anthropic_br_impact:
    status_escritorio_sp: "[confirmado/rumor/cancelado]"
    marketplace_oficial_skills: "[existe/planejado/não]"
    certified_program_br: "[aberto/planejado/não]"
    implicacoes_m1: "[análise]"
  
  moat_assessment:
    gap_ainda_existe: "[sim/não - justificar]"
    janela_first_mover: "[X meses estimados]"
    acao_urgente: "[recomendação]"
```

---

### Q5: ROI CASES VERIFICÁVEIS
**Wide searches obrigatórias:**
- "antes e depois IA proposta consultoria tempo"
- "redução tempo diagnóstico empresarial IA case"
- "ROI automação consultoria Brasil cases"
- "Fyrmo Inner AI Wibushi cases clientes tempo"

**Output acionável Q5:**
```yaml
roi_validation_cases:
  
  case_1_proposta:
    empresa: "[Fyrmo/Inner/outra]"
    antes_tempo: [X] horas
    depois_tempo: [Y] minutos
    reducao_percentual: [Z]%
    fonte: "[URL verificável]"
    credibilidade: "[alta/média/baixa]"
  
  case_2_diagnostico:
    empresa: "[fonte]"
    antes_tempo: [X] horas
    depois_tempo: [Y] horas
    reducao_percentual: [Z]%
    fonte: "[URL]"
  
  # repetir para 3-5 cases verificáveis
  
  benchmark_m1:
    claim_atual: "proposta 6h → 2,5h (-58%)"
    cases_reais_mediana: [X]% redução
    ajuste_necessario: "[sim/não - novo claim]"
    roi_conservador_recalculado: [X]% com novos números
```

---

### Q6: CANAL GTM VALIDAÇÃO
**Wide searches obrigatórias:**
- "LinkedIn B2B consultoria Brasil conversão 2026"
- "Hotmart afiliados consultoria empresarial"
- "custo aquisição cliente consultor PME Brasil"
- "SEO GEO IA conteúdo B2B Brasil 2026"

**Output acionável Q6:**
```yaml
gtm_channel_validation:
  
  linkedin_organic_br_2026:
    engagement_rate_medio: [X]%
    cac_estimado: R$ [valor]
    ltv_cac_ratio: [X]:1
    tempo_construcao_audiencia: [X] meses
    fonte: "[URL]"
  
  hotmart_marketplace:
    comissao_plataforma: [X]% + R$ [fixo]
    taxa_conversao_media_infoproduto: [X]%
    cac_organico_estimado: R$ [valor]
    programa_afiliados_viavel: "[sim/não - por quê]"
  
  linkedin_ads_b2b:
    cpl_consultor_pme: R$ [valor]
    ticket_minimo_viavel: R$ [valor para LTV/CAC >3]
    recomendacao_m1: "[usar/evitar - justificar]"
  
  seo_geo_b2b:
    volume_busca_keywords: [estimativa]
    dificuldade_rankear: "[fácil/médio/difícil]"
    tempo_resultados: [X] meses
    investimento_necessario: R$ [valor]
    roi_esperado_12m: "[análise]"
  
  canal_primario_recomendado: "[decisão data-driven]"
  canal_secundario: "[decisão]"
  canais_evitar: "[lista + razão]"
```

---

## FORMATO OUTPUT OBRIGATÓRIO

Para cada Q1-Q6, estruture a resposta assim:

```markdown
## Q[N]: [TÍTULO DA PERGUNTA]

**EPISTEMIC STATUS:**
├── FACT: [claims com URL fonte]
├── INFERENCE: [derivações lógicas de FACTS]
├── HYPOTHESIS: [suposições testáveis]
└── GAP: [dados não encontrados]

**DADOS NUMÉRICOS:**
[tabela ou yaml estruturado conforme template acima]

**IMPLICAÇÕES PARA M1:**
├── Validação: [o que os dados confirmam]
├── Ajuste necessário: [o que precisa mudar]
└── Próximo passo: [ação específica]

**FONTES:**
1. [URL] - [descrição]
2. [URL] - [descrição]
[mínimo 3 fontes brasileiras por pergunta]
```

---

## DECISÃO GO/NO-GO APÓS RESEARCH

Ao final das 6 perguntas, gere:

```yaml
mvp_decision_tree:
  
  pricing_validado:
    valor_recomendado: R$ [baseado em Q2]
    formato_recomendado: "[one-time/híbrido/SaaS]"
    confianca: "[alta/média/baixa]"
  
  roi_claim_ajustado:
    antes: "proposta 6h → 2,5h"
    depois: "[baseado em Q5]"
    payback_dias: [recalculado]
  
  tam_addressable:
    som_12_meses: [baseado em Q3]
    revenue_potential: R$ [SOM × preço]
    viabilidade: "[go/no-go]"
  
  moat_timing:
    janela_meses: [baseado em Q4]
    urgencia: "[alta/média/baixa]"
  
  canal_primario:
    canal: "[baseado em Q6]"
    cac_estimado: R$ [valor]
    tempo_traction: [meses]
  
  GO_NO_GO_FINAL: "[GO/NO-GO com justificativa]"
  
  proximos_3_passos:
    1: "[ação específica com prazo]"
    2: "[ação específica com prazo]"
    3: "[ação específica com prazo]"
```

---

## CONSTRAINTS CRÍTICAS

1. **Todas as buscas devem ser em PT-BR + "Brasil" + "2025" OR "2026"**
2. **Mínimo 3 fontes brasileiras verificáveis por pergunta**
3. **Zero claims sem epistemic label (FACT/INFERENCE/HYPOTHESIS/GAP)**
4. **Números sempre em R$ (conversões USD marcar como INFERENCE)**
5. **URLs completas + data de acesso**
6. **Priorizar fontes: Sebrae > associações setoriais > estudos BR > imprensa especializada > blogs**
7. **Se GAP persistir após wide search: marcar explicitamente + sugerir método alternativo (entrevistas/enquete)**

---

## SUCCESS CRITERIA

Pesquisa bem-sucedida se:
├── ✅ 80%+ dos números-chave saíram de HYPOTHESIS → FACT ou INFERENCE
├── ✅ Pricing M1 R$1.997 validado OU alternativa fundamentada proposta
├── ✅ Moat competitivo confirmado OU ameaça identificada com plano
├── ✅ ROI claim ajustado para número defensável
├── ✅ SOM 12 meses calculado com method transparente
└── ✅ GO/NO-GO decision com 3 next steps acionáveis data-driven

Se <80% validação: ESCALAR para entrevistas qualitativas (script fornecido).
```

---

## COMANDO PARA COPIAR · OPUS 4.7

```plaintext
Você é analista de mercado B2B Brasil especializado em AI tools para consultoria PME. Execute o RESEARCH PROTOCOL anexado respondendo as 6 perguntas obrigatórias (Q1-Q6) com wide search conforme especificado. Priorize fontes brasileiras maio/2026, marque epistemic status de cada claim, e gere a decisão GO/NO-GO ao final. Output em PT-BR seguindo formato estruturado yaml+markdown do protocol. Comece por Q1.

[ANEXAR O BLOCO "RESEARCH PROTOCOL" COMPLETO ACIMA]
```

---

## HANDOFF CHECKLIST · Leonardo

Antes de rodar com Opus 4.7:

- [ ] Confirmar se os 6 objetivos (Q1-Q6) são os corretos ou ajustar
- [ ] Validar se pricing R$1.997 é o número-âncora ou testar faixa
- [ ] Decidir se quer validação de M2 (R$4.997) também ou só M1
- [ ] Confirmar período de interesse: "2025 2026" ou só "2026"
- [ ] Adicionar keywords específicas se tiver (ex: "consultoria estratégica" vs "consultoria PME")

**PRÓXIMA AÇÃO:** Copiar comando + anexar protocol → Nova conversa Opus 4.7 → Executar

---

**Você** _2026-05-03_

1-Reflita profundamente antes de exceutar 2- expanda o escopo considerando a) dado o valor proposta estamos falando de produto high ticket sendo assim nao se limite ao seu raciocinio em base,primeiro encontre goldstarndart strategies para esse icp higth ticket granular brasil essa é a base da pesquisa 3- considere pivo de branding da suite sob dominio[@CMD Suite ] valide exitencia de dominio e posicionmento,etc.. 3 - analise a docuemntacao via mece e o cmd principal planeje a pesquisa e exceute. NOW RUN

---

**Claude** _2026-05-03_

{"task_id": "wf-d345edfe-8017-45ec-82cf-00a5beb2a168"}
Your CMD Suite branding and ICP validation report is ready. It includes a recommendation to pivot away from the "CMD Suite" name due to trademark conflicts with Dell, Hitachi, and Motorola, alongside a tiered pricing strategy (R$ 1.997 / R$ 7.997 / R$ 24.997) anchored on a Tier 2 core offering. The report covers high-ticket B2B benchmarks from G4 and StartSe, TAM/SAM/SOM sizing for Brazilian PME consultants, unit economics across three scenarios, a 90-180 day MVP roadmap with R$ 100k budget, GTM channel analysis prioritizing LinkedIn founder-led growth, and a revised 6-9 month first-mover window given Anthropic's São Paulo office launch.
OK

---

**Você** _2026-05-03_

/forge-visual-canvas  RENDERIZE IT FULLY MECE FOR PDF READY TO PRINT

---

**Claude** _2026-05-03_

1	
     2	# Toolkit Claude para consultor PME: M1 vence o portfolio
     3	
     4	**M1 FULL-CYCLE é o modelo primário recomendado (score 9,10/10)**, vendido como **one-time R$1.997 via Hotmart**com upsell recorrente leve. M2 STRATEGIC RESEARCH entra como bundle premium (R$4.997 vitalício) para top 20% do ICP. M5 HYBRID OS deve ser **adiado** — pricing R$997/mês é incompatível com consultor solo PME, ICP declarado de Leonardo. A decisão se sustenta em três sinais convergentes do mercado BR 2026: (1) gargalo financeiro real do consultor PME está em **proposta+diagnóstico**, onde M1 ataca diretamente; (2) cultura brasileira de infoproduto premia **one-time sobre SaaS recorrente** (tese Moacir Moda, validada por Hotmart-200k+ criadores e churn SaaS SMB 3-7%/mês); (3) existe **GAP confirmado** de skills Claude .md em PT-BR para consultoria PME — zero competidores diretos identificados nas 10 buscas. A janela de first-mover é 12-18 meses até Anthropic BR (escritório SP 2026, AI Festival StartSe maio/2026) saturar o nicho.
     5	
     6	---
     7	
     8	## Como ler este relatório
     9	
    10	Cada claim carrega tag epistêmica: **FACT** (citado com URL), **INFERENCE** (derivado de fatos brasileiros), **HYPOTHESIS** (testável em campo), **GAP** (sem dado público encontrado). Pricing sempre em R$; conversões USD usaram R$5,40-5,80/USD marcadas como INFERENCE. As 6 pesquisas alimentam uma matriz de scoring ponderada (ROI 25% + Persona 20% + Workflow 20% + Competitors 15% + CAC 10% + Pricing 10%) que ranqueia os 5 modelos no final. Dados-âncora: **18% das PMEs BR usam IA estruturada** [FACT — Sebrae 2025 via growsmart.com.br], **65-75M brasileiros no LinkedIn** [FACT — Statista via agendor.com.br], e **mediana custo-hora consultor PME = R$150/h**[FACT — robertodiasduarte.com.br].
    11	
    12	---
    13	
    14	## Síntese das 6 pesquisas em fatos acionáveis
    15	
    16	### A dor real, quantificada em reais
    17	
    18	O consultor PME solo brasileiro cobra **R$70–300/h, mediana R$150/h** [FACT — robertodiasduarte.com.br/analise-do-valor-hora-em-consultorias-no-brasil-2024-2025-2/], emite **5–15 propostas/mês** [HYPOTHESIS], gasta **4–8h por proposta** [HYPOTHESIS — derivado de Voitto e PropostaAI] e converte **15–20% delas em contrato** [INFERENCE de Panorama Berry/Newcore]. Isso gera **custo de oportunidade mensal de R$4.300–7.200** apenas em propostas — antes mesmo de contar diagnóstico (mínimo Sebrae 8h, típico 8–40h) e entrega final (8–20h). Um toolkit AI bem-feito reduz proposta de 6h para ~2,5h (50–67% bruto, ajustado para 40-50% líquido descontando o paradoxo Metr/Workday onde **37% do tempo "economizado" volta como retrabalho** [FACT — fastcompanybrasil.com]). A economia mensal líquida realista fica em **R$2.500–5.000/mês** no cenário moderado, não os "10x" usuais do hype.
    19	
    20	### O ROI por modelo é matematicamente espetacular, mas o teste real é retenção
    21	
    22	Aplicada a fórmula `ROI = (Ganho_Mensal − Custo_Tool) / Custo_Tool × 100` com ganho moderado de R$5.000/mês:
    23	
    24	|Modelo|Preço/mês R$|ROI moderado %|ROI conservador (R$2.500) %|Payback semanas|
    25	|---|---|---|---|---|
    26	|M1 R$297/mês|297|**+1.583%**|+742%|~0,26 (2 dias)|
    27	|M1 one-time R$1.997|1.997 (único)|break-even mês 1|mês 1|~1,7 (12 dias)|
    28	|M2 R$497/mês|497|+906%|+403%|~0,43|
    29	|M2 vitalício R$4.997|4.997 (único)|break-even mês 1|mês 2|~4,3 (30 dias)|
    30	|M3 R$397/mês|397|+1.160%|+530%|~0,34|
    31	|M4 R$197/mês|197|+1.169% a +1.677%|n/a|~0,17 (1,2 dia)|
    32	|M5 R$997/mês|997|+401% a +1.103%|+151%|~0,86|
    33	
    34	**O número que importa não é o ROI bruto, é o teto psicológico do ICP: R$497–997/mês** [INFERENCE]. R$997 já equivale a 16% do salário mediano CLT consultor (R$6.090/mês [FACT — salario.com.br/profissao/consultor-cbo-241040/]) — entra na zona de "decisão executiva". M5 a R$997/mês cobrado a um solo é **enterprise pricing em micro-ICP**, churn previsto alto.
    35	
    36	### Persona única em 3 stages vence segmentação por porte
    37	
    38	A escolha entre simular **3 personas por porte** (solo / boutique 3-5 / média 10+) ou **1 persona em 3 stages** (Awareness / Consideration / Decision) tem resposta clara: **stages**. A razão é estrutural — o ICP declarado de Leonardo é homogêneo em porte (consultor PME 1-3, early AI adopter, data-based) e heterogêneo em jornada. Segmentar por porte criaria duas personas-fantasma (boutique e média) que exigem produto, canal e pricing diferentes — inviável para solo creator. **94% dos compradores B2B brasileiros chegam ao primeiro contato já total ou parcialmente informados** [FACT — Google BR via pamellarodrigues.com/jornada-de-compra-b2b/] e **70% da jornada acontece sem vendedor** [FACT — Forrester via mesma fonte], o que significa que conteúdo precisa mover Awareness → Consideration → Decision sem touchpoint humano — exatamente o cenário de info-produto Hotmart.
    39	
    40	A prioridade tática é **Consideration**, onde o early adopter já educado em IA pesquisa skills/prompts para problemas específicos e tem WTP definido. Topo (Awareness) está perdendo tráfego para IA generativa direta (**−38,2% em keywords informacionais** [FACT — Pesquisa SaaS 2026 via octans.online/blog/funil-de-conteudo-b2b/]) e fundo (Decision) exige ofertas premium incompatíveis com escala solo.
    41	
    42	### Os 3 gargalos onde AI gera maior ROI
    43	
    44	A análise do workflow de 7 etapas (lead → briefing → diagnóstico → proposta → apresentação → execução → entrega) revela concentração brutal de dor em três pontos:
    45	
    46	**Gargalo #1 — Proposta + Diagnóstico (Steps 3+4):** 12–48h por ciclo, 100% de frequência, R$800–12.000/mês liberáveis. PropostaAI é prova viva: posiciona-se como "10 segundos para texto base" [FACT — propostaai.com] porque a dor é universal. **Skills que atacam: bussola-diagnostic-engine + bussola-deliverable-forge + bussola-personalization** — o exato triad do M1.
    47	
    48	**Gargalo #2 — Briefing/Discovery (Step 2):** 3–7h por cliente novo, 50% reduzível com transcrição automática + research + síntese. **Skills: hunter4-1 + corpus-analyst-altas + executive-planning-orchestrator** — o triad do M2.
    49	
    50	**Gargalo #3 — Entrega + Corpus (Step 7):** 8–20h por entrega + zero capitalização entre clientes. **Skills: executive-artifact-system + refatorar-documentos + notion-sync-protocol + projects-to-linear** — atende M3 e parte do M5.
    51	
    52	A consequência prática: M1 + M2 cobrem #1 e #2 (os mais universais e financeiramente densos), enquanto M3/M5 atacam #3 (alto ROI composto via flywheel, mas exige cliente já em escala).
    53	
    54	### O competitive landscape brasileiro tem um buraco do tamanho do Atlântico
    55	
    56	Das 10 buscas exigidas, surgiram **23 competitors brasileiros reais com URL verificável**. O padrão é claríssimo: cursos de prompt engineering em Hotmart concentram-se em **R$197–497** (CTANET R$197 [FACT — ctanet.com.br], faixa típica observada em Luciano Pimentel, Eliezio Mesquita, Ramon Lucas Barreto, IA Pro 2026), são **majoritariamente generalistas** (devs, data science, marketing, professores, ChatGPT-centric) e **não atendem a vertical "consultor PME"**. Mentorias premium (Daniel Monaco "Infoproduto 10x com IA", Loryane Lanne, PunkMetrics, StartSe) sobem para **R$1.497–2.997+** mas têm posicionamento enterprise/educadores, não toolkit para o consultor PME operar.
    57	
    58	O achado mais valioso: **zero competidores brasileiros vendem kit empacotado de Claude Skills em formato .md PT-BR para consultoria PME** [FACT/GAP — confirmado em github.com/anthropics/skills, github.com/ComposioHQ/awesome-claude-skills, github.com/alirezarezvani/claude-skills com 232+ skills, todos sem skills business em PT-BR]. Os dois únicos brasileiros publicando conteúdo PT-BR sobre Claude Skills — **Roberto Dias Duarte (RDD10+, foco contábil/jurídico)** [FACT — robertodiasduarte.com.br/skills-do-claude-guia-completo] e **Daniel Furtado (PunkMetrics, foco design/PM)** [FACT — punkmetrics.com/claude-skills-guai-pratico/] — escrevem guias mas **não vendem toolkit empacotado**. Isso é blue ocean documentado, não hipótese.
    59	
    60	### As 4 hipóteses do ICP, validadas com dados brasileiros
    61	
    62	**H1 (preferência one-time vs SaaS): VALIDADA com nuance híbrida.** A tese de Moacir Moda — "no Brasil infoproduto é business de CAC, lógica é extrair máximo na primeira venda" [FACT — moacirmoda.substack.com] — é reforçada por churn SaaS B2B SMB de **3–7%/mês (31–58%/ano)** [FACT — vitally.io e genesysgrowth.com] e pela infraestrutura zero-CAPEX da Hotmart (checkout PIX/boleto, área de membros, garantia 7 dias, taxa 9,9%+R$1 [FACT — saolucascontabilidade.com.br]). **Implicação:** vender principal como one-time R$1.997 e oferecer recorrente leve R$97/mês como upsell opcional — não inverter a polaridade.
    63	
    64	**H2 (suite vs skills isoladas): GAP com viés a favor de SUITE.** Plataformas BR que vendem propostas com IA (Fyrmo, Inner AI, Wibushi, Prospero) operam **suítes integradas, não componentes isolados** [FACT — fyrmo.com.br, blog.innerai.com]. Ancoragem de preço favorece bundle ("R$1.997 por 5 skills" > "R$397 por 1 skill"). Order Bump da Hotmart aumenta ticket médio em **até 46%** [FACT — pt.accio.com/business/cursos-mais-vendidos-na-hotmart], confirmando comportamento bundling-friendly do consumidor BR.
    65	
    66	**H3 (wow moment = redução tempo proposta): VALIDADA com forte consenso.** Fyrmo declara redução de "**2-4 horas → 5-10 minutos**, propostas/semana de 3-5 → 15-20" [FACT — fyrmo.com.br/blog/ia-criar-propostas-comerciais-automaticas]. Wibushi: "antes 20 minutos com modelo pronto, agora 5 minutos" [FACT — wibushi.com/br]. Bazeggio Consultoria, Inner AI e HubSpot BR ratificam o framing. **Hero use case obrigatório: "Sua próxima proposta em 8 minutos, não em 3 horas"** com vídeo de 90s mostrando cronômetro real.
    67	
    68	**H4 (canal primário = LinkedIn): VALIDADA fortemente.** LinkedIn drives **75–85% de todos leads B2B em redes sociais** e é usado por **90–96% dos B2B marketers** [FACT — cleverly.co/blog/linkedin-benchmarks]. O Panorama Leadster Brasil 2025 recomenda explicitamente "founder-led growth no LinkedIn + YouTube" para B2B [FACT — leadster.com.br/panorama-de-geracao-de-leads-no-brasil-2025/conteudo/b2b/]. **Conversão B2B mediana BR: 2,50%; CPL LinkedIn Ads R$150–500 para gerentes/diretores** [FACT — spiner.com.br]. Engagement médio LinkedIn 5,19% (carrosséis 6,6–7,0%) [FACT — Social Insider via blog.closelyhq.com].
    69	
    70	### CAC e LTV por canal: LinkedIn organic + Hotmart é o casamento certo
    71	
	< truncated lines 72-422 >
   423	
   424	- M2 Strategic Research (originalmente R$ 4.997 vitalício do INSUMO-BASE) lançado como **add-on Tier 2/3**, não produto independente
   425	- Considerar abertura para parceria com Anthropic BR (programa de credits/co-marketing)
   426	- Receita 12m projetada: R$ 1,5–3M
   427	
   428	**Budget total 180d**:
   429	
   430	- Desenvolvimento (toolkit + plataforma): R$ 30.000
   431	- Marketing (LinkedIn organic + 1 evento): R$ 25.000
   432	- Operação (jurídico, contabilidade, ferramentas): R$ 15.000
   433	- Reserva: R$ 30.000
   434	- **Total: R$ 100.000**
   435	
   436	**Riscos principais:**
   437	
   438	1. Conflito de marca CMD Suite gerar oposição INPI ou cease-and-desist Dell/Hitachi (probabilidade média, impacto alto, mitigação = pivotar nome agora)
   439	2. RDD ou outro thought leader BR lançar toolkit empacotado antes do MVP (probabilidade média, impacto alto, mitigação = velocidade + parceria)
   440	3. Hotmart impor restrições para tickets >R$ 5k (probabilidade baixa, impacto médio, mitigação = checkout próprio + Stripe)
   441	4. Founder solo não sustentar cadência LinkedIn 3–5x/semana (probabilidade média, impacto alto, mitigação = ghost-writer parcial após 90d)
   442	
   443	**Next steps imediatos (7 dias):**
   444	
   445	1. Pivotar nome — selecionar 3 alternativas e validar com 15 ICPs em DM LinkedIn
   446	2. Mapear 50 consultores ICP em LinkedIn Sales Navigator
   447	3. Postar 3 conteúdos founder-led com claim "da reunião à proposta em 90 min"
   448	4. Confirmar presença no AI Festival StartSe 13–14 maio (ingresso e/ou mesa)
   449	5. Listar 5–10 skills candidatas e fazer pesquisa "qual destas você compraria por R$ 7.997?"
   450	
   451	---
   452	
   453	## Decisão Final Consolidada
   454	
   455	|Item|Decisão|
   456	|---|---|
   457	|Cenário ótimo|**C — Híbrido Tiered**, com Tier 2 (R$ 7.997) como produto-mãe|
   458	|Branding|**PIVOT — descartar "CMD Suite"** por conflito Dell/Hitachi/Motorola/Leonardo DRS e fit semântico fraco com ICP consultor PME premium|
   459	|Domínio recomendado|A definir após validação de nome (Atelier IA, Praxis IA, Forja Claude são candidatos preliminares)|
   460	|Posicionamento one-liner|_"O sistema operacional Claude que entrega proposta consultiva em 90 minutos."_ (alternativa: _"Toolkit Claude para consultor PME premium: diagnóstico, proposta e apresentação em frações do tempo."_)|
   461	|Pricing final|Tier 1 R$ 1.997 (Hotmart self-serve) · Tier 2 R$ 7.997 (toolkit + 4 onboardings + 90d suporte) · Tier 3 R$ 24.997 (license boutique até 5 users)|
   462	|Formato|One-time (Tier 1) + One-time + onboarding (Tier 2) + Anual recorrente (Tier 3)|
   463	|Go/No-Go|**GO com PIVOT de nome obrigatório**|
   464	|Confiança decisão|Alta para Cenário C; alta para pivot de nome; média para sizing exato (TAM consultor PME BR carece de dado primário)|
   465	|Riscos residuais|Velocidade de captura first-mover (6–9m janela); tempo founder solo limita Tier 3; INPI demora 12–18m para registro de marca novo|
   466	
   467	**Próximos 3 passos críticos (com prazo):**
   468	
   469	1. **Em 7 dias**: validar 3 alternativas de nome com 15 consultores ICP; descartar CMD Suite formalmente
   470	2. **Em 21 dias**: registrar nome escolhido (domínio + INPI Classe 9 e 42), publicar 8–10 posts LinkedIn founder-led, abrir lista de espera Tier 2
   471	3. **Em 60 dias**: lançar MVP Tier 1 + Tier 2 com 5 cartas de intenção pré-pagas; presença confirmada no AI Festival StartSe 13–14/maio com material de pre-launch
   472	
   473	---
   474	
   475	## Caveats
   476	
   477	- **GAP de verificação direta WHOIS**: a verificação de cmdsuite.com em todos os 10+ TLDs especificados não pôde ser feita por meio de fetch direto a who.is/whois.com nesta sessão. Os sinais negativos sobre o nome vêm de buscas por produtos comerciais existentes — recomenda-se que Leonardo execute manualmente um whois/RDAP em cada TLD em até 48h.
   478	- **GAP de verificação direta INPI**: a busca de marca "CMD Suite" / "Command Suite" no portal INPI (https://busca.inpi.gov.br) não foi executada nesta pesquisa. Antes de qualquer registro, fazer busca radical e por classes 9, 35, 41, 42 (software, serviços de consultoria, educação, TI).
   479	- **Sizing TAM consultores PME BR é INFERENCE**: não há dado público primário consolidado sobre número de consultores PME ativos no Brasil. Os números apresentados derivam de cruzamento Sebrae (4,6M aberturas, 60% serviços) com IBCO (mercado consultoria multimilionário) e CNAEs ligados a consultoria. Margem de erro estimada: ±30%.
   480	- **Pricing G4/StartSe é benchmark de competidores indiretos**: G4 e StartSe vendem educação executiva, não toolkit operacional. Eles validam **WTP elasticidade** do ICP empresário/consultor brasileiro acima de R$ 5k, mas não substituem teste direto com ICP específico de consultor PME.
   481	- **Conversion rates LinkedIn 2026**: as métricas globais (14,6% inbound-led outbound vs 1,7% cold) vêm de Linkboost/Foundera. Aplicabilidade BR pode ser 30–50% inferior dado nível de saturação local — usar com prudência.
   482	- **Janela first-mover de 6–9 meses é ESTIMATIVA**: não há dado preditivo direto. A revisão para baixo (vs. 12–18m do INSUMO-BASE) considera (a) entrada formal Anthropic SP, (b) AI Festival como gatilho de awareness, (c) velocidade de releases Claude, (d) ausência de concorrente toolkit empacotado em PT-BR confirmada apenas até maio/2026.
   483	- **Cases ROI são adjacentes**: nenhum case público encontrado mostra "consultor PME usando toolkit Claude reduziu tempo de proposta em X%" especificamente. As reduções de 40–60% são INFERENCE a partir de cases gerais (Sindhosp, Waxi, AI Transformation, RDD).
   484	- **Tier 3 license model pressupõe estrutura de suporte**: vender R$ 24.997 anual implica responder em SLA aceitável; founder solo não sustenta SLA enterprise sem terceirizar suporte ou aceitar cliente premium-light.
   485	- **Pivot de nome custa 30–60 dias de validação** mas economiza risco jurídico de 5–7 dígitos no futuro — trade-off recomendado.
   486	
   487	
   488	
   489	
   490	
   491	
   492	
   493	
   494	
     1	---
     2	name: forge-visual-canvas
     3	description: Sistema FORGE para gerar artifacts visuais premium (HTML, React/JSX, SVG, PDF, PPTX) com brand consistency, dark/light mode, e troca de linguagem visual em runtime. ATIVE SEMPRE para "criar artifact", "gerar showroom", "design language codex", "modal clone", "página de venda", "apresentação executiva", "ebook interativo", "diagrama profissional", "PDF estratégico A4", "playbook visual", "FORGE", "visual canvas studio", "brand guidelines Anthropic", "modo dark e light", ou pedidos de UI premium estilo Stripe/Linear/Vercel/McKinsey/Bloomberg/Apple/GOV.UK. TAMBÉM ATIVE quando o pedido envolver clone pixel-perfect de uma referência visual, ou quando o usuário pedir "estilo executivo", "estilo SaaS", "estilo editorial", "estilo dashboard", "estilo terminal", ou qualquer das 10 linguagens visuais catalogadas. NÃO ATIVE para tarefas puras de texto, código backend, ou perguntas conceituais sem entregável visual.
     4	version: 2.0.0
     5	author: João Maia (Maia Consultoria) + FORGE
     6	---
     7	
     8	# FORGE Visual Canvas
     9	
    10	Sistema canônico para produzir artifacts visuais de nível agência — sem "AI slop", sem gradientes roxos, sem Inter font genérica.
    11	
    12	**Pipeline de 3 camadas que rodam em sequência em todo output:**
    13	
    14	```
    15	estrutura  →  tokens  →  acabamento
    16	(formato)    (brand)    (mood)
    17	```
    18	
    19	1. **Estrutura** — escolher o formato certo (HTML widget, React JSX, SVG inline, PDF A4, PPTX, etc.)
    20	2. **Tokens** — aplicar brand FORGE (paleta + tipografia + shape rules) — fonte da verdade absoluta
    21	3. **Acabamento** — escolher a linguagem visual entre as 10 catalogadas, ajustar densidade, dark/light
    22	
    23	---
    24	
    25	## Quando este skill ativa
    26	
    27	Triggers em PT-BR (operação principal do João):
    28	- "criar artifact", "gerar artifact"
    29	- "gerar showroom", "ebook interativo", "design codex"
    30	- "modal clone", "clone pixel-perfect", "réplica exata"
    31	- "página de venda", "landing page premium"
    32	- "apresentação executiva", "deck McKinsey", "playbook"
    33	- "PDF A4 estratégico", "documento executivo multi-página"
    34	- "diagrama profissional", "infográfico"
    35	- "estilo executivo / SaaS / editorial / dashboard / terminal / Apple / GOV.UK"
    36	- "modo dark e light", "trocar de tema"
    37	
    38	Triggers em EN (compatibilidade com prompts copiados):
    39	- "FORGE", "visual canvas studio"
    40	- "brand guidelines", "Anthropic brand"
    41	- "production-grade artifact", "strategy-grade visual"
    42	
    43	---
    44	
    45	## Decision tree — qual formato de output
    46	
    47	```
    48	Pedido recebido
    49	│
    50	├─ É um modal / card / componente UI isolado?
    51	│   └─ HTML widget single-file via show_widget OU artifact .html
    52	│       Use: assets/excel-modal-clone.html como gold standard
    53	│
    54	├─ É um diagrama / fluxo / arquitetura?
    55	│   └─ SVG inline (Poppins/Lora labels, paleta brand)
    56	│
    57	├─ É app multi-tela / dashboard / showroom interativo?
    58	│   └─ React JSX artifact (Tailwind core utilities)
    59	│       Use: examples/design-language-codex/ como referência
    60	│
    61	├─ É um documento PDF A4 multi-página (relatório, manifesto)?
    62	│   └─ HTML com <div class="a4-page"> + <svg viewBox="0 0 794 1123">
    63	│       Use: references/svg-document-engine.md (templates prontos)
    64	│
    65	├─ É deck / apresentação?
    66	│   └─ Ler /mnt/skills/public/pptx/SKILL.md → python-pptx + brand colors
    67	│
    68	├─ É documento Word?
    69	│   └─ Ler /mnt/skills/public/docx/SKILL.md → python-docx + Poppins/Lora
    70	│
    71	└─ Pedido envolve TROCA de linguagem visual em runtime?
    72	    └─ Master Prompt Template (assets/master-prompt-engine.md)
    73	       — control panel com 4 selectors (style/component/density/theme)
    74	```
    75	
    76	---
    77	
    78	## Brand FORGE — fonte da verdade
    79	
    80	A paleta e tipografia abaixo são **não-negociáveis**. Toda saída usa CSS variables — nunca hardcode.
    81	
    82	```css
    83	/* Surfaces */
    84	--forge-dark:       #141413;  /* texto primário, bg dark */
    85	--forge-light:      #faf9f5;  /* bg light, texto on dark */
    86	--forge-mid-gray:   #b0aea5;  /* secundário, muted */
    87	--forge-light-gray: #e8e6dc;  /* bg subtle, borders */
    88	
    89	/* Acentos — usar nesta ordem ao colorir múltiplos elementos */
    90	--forge-orange: #d97757;  /* acento primário — CTAs, highlights */
    91	--forge-blue:   #6a9bcc;  /* acento secundário — links, info */
    92	--forge-green:  #788c5d;  /* acento terciário — success, tags */
    93	
    94	/* Tipografia */
    95	--forge-heading: 'Poppins', Arial, sans-serif;
    96	--forge-body:    'Lora', Georgia, serif;
    97	--forge-mono:    'JetBrains Mono', 'SF Mono', Consolas, monospace;
    98	```
    99	
   100	**Regras de forma:**
[226 lines total]
   100	**Regras de forma:**
   101	- Border radius: 4px default, 8px cards, 12px cards grandes, 20px modais, 9999px pills
   102	- Sem gradientes em elementos decorativos
   103	- Sombras só funcionais (modais e cards elevados)
   104	- Pesos permitidos: 400, 500, 700, 800 — **nunca 600**
   105	- Font-size mínimo: 11px
   106	
   107	Detalhes completos: **[references/brand-tokens.md](references/brand-tokens.md)**
   108	
   109	---
   110	
   111	## As 10 linguagens visuais catalogadas
   112	
   113	| # | Linguagem | Quando usar |
   114	|---|---|---|
   115	| 1 | Executive Swiss | Relatórios C-level, propostas, diagnósticos B2B |
   116	| 2 | SaaS Premium | Landing pages, produtos AI-first, MVPs |
   117	| 3 | Enterprise Dashboard | Painéis ops, BI, monitoramento dense |
   118	| 4 | Public Service (GOV.UK) | Formulários, onboarding, fluxos consultivos |
   119	| 5 | Editorial Premium | Manifestos, whitepapers, conteúdo de autoridade |
   120	| 6 | McKinsey Consulting | Due diligence, board presentations, M&A |
   121	| 7 | Bloomberg Terminal | Trading dashboards, cockpit financeiro dense |
   122	| 8 | Apple Product | Apps consumer, onboarding premium |
   123	| 9 | Material Design | Apps Android, sistemas com elevação |
   124	| 10 | Linear/Vercel | Dev tools, ferramentas técnicas modernas |
   125	
   126	Specs completas (paleta, tipografia, layout, prompt trigger): **[references/visual-languages.md](references/visual-languages.md)**
   127	
   128	---
   129	
   130	## Sistemas de componentes (independentes da linguagem visual)
   131	
   132	São 5 sistemas que definem como botões, cards, tables e badges são construídos:
   133	
   134	- **C1. shadcn/ui inspired** (default) — bordas finas, cards arredondados
   135	- **C2. Tailwind Utility** — utility-first, sem abstrações
   136	- **C3. IBM Carbon** — bordas duras, square corners, full-grid tables
   137	- **C4. Material Design** — sombras de elevação, FABs, ripple effects
   138	- **C5. Ant Design** — tags coloridas, formulários com label-acima
   139	
   140	Detalhes + matriz de combinação ideal (linguagem × componente): **[references/component-systems.md](references/component-systems.md)**
   141	
   142	---
   143	
   144	## Master Prompt Engine — gerador parametrizável
   145	
   146	Pra criar artifacts onde o **conteúdo é fixo** mas a **linguagem visual é trocável em runtime** via control panel (4 selectors: style / component / density / theme).
   147	
   148	Template completo, copy-paste-ready: **[assets/master-prompt-engine.md](assets/master-prompt-engine.md)**
   149	
   150	Como usar:
   151	1. Abrir `assets/master-prompt-engine.md`
   152	2. Substituir o bloco `BUSINESS_CASE` pelo seu conteúdo
   153	3. Colar o prompt inteiro no Claude
   154	4. Receber single-file HTML com selectors funcionais + calculator + SVG charts
   155	
   156	---
   157	
   158	## SVG Document Engine — PDFs A4 multi-página
   159	
   160	Pra gerar relatórios, manifestos, playbooks A4 que exportam direto pra PDF via "Imprimir → Salvar como PDF" (sem libs externas).
   161	
   162	Arquitetura: `<div class="a4-page">` + `<svg viewBox="0 0 794 1123">` (A4 a 96dpi).
   163	
   164	Templates de página + global SVG defs (ícones, gradientes, patterns) prontos: **[references/svg-document-engine.md](references/svg-document-engine.md)**
   165	
   166	---
   167	
   168	## Anti-patterns — nunca fazer
   169	
   170	- Gradientes roxos como background
   171	- Inter font (default "AI slop" — usar Poppins)
   172	- Cantos arredondados uniformes em tudo
   173	- Cores hardcoded que quebram dark mode
   174	- `position:fixed` em widgets show_widget (colapsa o iframe)
   175	- Emoji decorativo (usar SVG paths ou shapes CSS)
   176	- Font-size abaixo de 11px
   177	- Font-weight 600
   178	- `<html>`, `<head>`, `<body>` em show_widget
   179	- Drop shadows decorativos, blur, glow, neon
   180	
   181	---
   182	
   183	## Como estender (slot pra v2+ do João)
   184	
   185	Adicione novos artifacts, linguagens visuais ou referências em **`extensions/`**.
   186	
   187	Convenção:
   188	- `extensions/<nome-da-extensao>/SKILL.md` — descrição curta + quando usar
   189	- `extensions/<nome-da-extensao>/assets/` — arquivos referenciados
   190	- Linkar no SKILL.md mestre na seção "Extensões instaladas" (abaixo)
   191	
   192	Veja **[extensions/README.md](extensions/README.md)** para o template e regras.
   193	
   194	### Extensões instaladas
   195	
   196	_Nenhuma ainda. Adicione a sua primeira em `extensions/`._
   197	
   198	---
   199	
   200	## Exemplo de referência
   201	
   202	**[examples/design-language-codex/](examples/design-language-codex/)** — eBook interativo React/JSX que percorre as 10 linguagens com arte algorítmica por capítulo, dark/light mode, sidebar navegável. Use como gold standard de showroom multi-style.
   203	
   204	---
   205	
   206	## Pipeline de execução (resumo operacional)
   207	
   208	Ao receber um pedido que ative este skill:
   209	
   210	1. **Identificar formato** (decision tree acima) → escolher entre HTML widget, React JSX, SVG, PDF A4, PPTX, DOCX
   211	2. **Carregar tokens** → ler `references/brand-tokens.md` se houver dúvida sobre paleta/tipografia
   212	3. **Escolher linguagem visual** → consultar `references/visual-languages.md` se o pedido nomear estilo específico
   213	4. **Escolher sistema de componentes** → consultar `references/component-systems.md` se for app/dashboard
   214	5. **Aplicar dark/light** → CSS variables sempre, nunca hardcoded
   215	6. **Lint mental antes de entregar:**
   216	   - Toda cor é variável CSS? ✓
   217	   - Toda fonte é Poppins/Lora/Mono? ✓
   218	   - Algum gradiente decorativo? ✗
   219	   - Algum font-weight 600? ✗
   220	   - Funciona em dark mode? ✓
   221	7. **Entregar** → via `present_files` (artifact) ou `show_widget` (inline)
   222	
   223	---
   224	
   225	*FORGE Visual Canvas v2.0 — same logic, variable visual system.*
   226	
[226 lines total]
     1	# SVG Document Engine — PDFs A4 Multi-Página
     2	
     3	Arquitetura para gerar documentos A4 paginados que exportam direto pra PDF via "Imprimir → Salvar como PDF" — sem libs externas.
     4	
     5	**Padrão:** cada página = `<div class="a4-page">` contendo `<svg viewBox="0 0 794 1123">`.
     6	794 × 1123 pixels = A4 a 96dpi.
     7	`@media print` resolve a exportação nativa.
     8	
     9	---
    10	
    11	## 1. Page setup (HTML base)
    12	
    13	```html
    14	<!DOCTYPE html>
    15	<html lang="pt-BR">
    16	<head>
    17	  <meta charset="UTF-8">
    18	  <link rel="preconnect" href="https://fonts.googleapis.com">
    19	  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Lora:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;700;800&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
    20	  <style>
    21	    * { box-sizing: border-box; margin: 0; padding: 0; }
    22	    body {
    23	      background: #e0e5ec;
    24	      font-family: 'Poppins', sans-serif;
    25	      display: flex; flex-direction: column; align-items: center;
    26	      gap: 40px; padding: 40px 0;
    27	      -webkit-font-smoothing: antialiased;
    28	    }
    29	    .a4-page {
    30	      width: 210mm; height: 297mm;
    31	      background: #fff;
    32	      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    33	      position: relative; overflow: hidden; flex-shrink: 0;
    34	    }
    35	    svg.page-svg {
    36	      width: 100%; height: 100%;
    37	      position: absolute; top: 0; left: 0;
    38	    }
    39	    @page { size: A4; margin: 0; }
    40	    @media print {
    41	      body { background: none; padding: 0; gap: 0; display: block; }
    42	      .a4-page { box-shadow: none; break-after: page; }
    43	    }
    44	  </style>
    45	</head>
    46	<body>
    47	  <!-- inserir SVG defs globais aqui (ver seção 2) -->
    48	  <!-- inserir páginas aqui (ver seção 3) -->
    49	</body>
    50	</html>
    51	```
    52	
    53	---
    54	
    55	## 2. Global SVG defs (compartilhado por todas as páginas)
    56	
    57	Inserir **uma vez** antes da primeira página. Todas as páginas referenciam por ID.
    58	
    59	```html
    60	<svg width="0" height="0" style="position:absolute;">
    61	  <defs>
    62	
    63	    <!-- TEXTURA: ruído sutil (efeito anti-AI, organicidade) -->
    64	    <filter id="noise">
    65	      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    66	      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"/>
    67	      <feComposite operator="in" in2="SourceGraphic" result="mn"/>
    68	      <feBlend in="SourceGraphic" in2="mn" mode="multiply"/>
    69	    </filter>
    70	
    71	    <!-- SHADOW: somente funcional -->
    72	    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
    73	      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.08"/>
    74	    </filter>
    75	
    76	    <!-- GRADIENTES: paleta corporativa FORGE -->
    77	    <linearGradient id="grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
    78	      <stop offset="0%" style="stop-color:#1a365d"/>
    79	      <stop offset="100%" style="stop-color:#0a1526"/>
    80	    </linearGradient>
    81	    <linearGradient id="grad-accent" x1="0%" y1="0%" x2="100%" y2="0%">
    82	      <stop offset="0%" style="stop-color:#d97757"/>
    83	      <stop offset="100%" style="stop-color:#e8956d"/>
    84	    </linearGradient>
    85	    <linearGradient id="grad-light" x1="0%" y1="0%" x2="0%" y2="100%">
    86	      <stop offset="0%" style="stop-color:#faf9f5"/>
    87	      <stop offset="100%" style="stop-color:#e8e6dc"/>
    88	    </linearGradient>
    89	
    90	    <!-- PATTERNS: grids overlay -->
    91	    <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
    92	      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    93	    </pattern>
    94	    <pattern id="grid-dark" width="40" height="40" patternUnits="userSpaceOnUse">
    95	      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="1"/>
    96	    </pattern>
    97	    <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
    98	      <circle cx="10" cy="10" r="1" fill="rgba(0,0,0,0.06)"/>
    99	    </pattern>
   100	
   101	    <!-- ÍCONES reutilizáveis (uso: <use href="#icon-name">) -->
   102	    <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   103	      <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>
   104	    </symbol>
   105	    <symbol id="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   106	      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
   107	    </symbol>
   108	    <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   109	      <path d="M5 12h14M12 5l7 7-7 7"/>
   110	    </symbol>
   111	    <symbol id="icon-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   112	      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
   113	    </symbol>
   114	    <symbol id="icon-data" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   115	      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
   116	    </symbol>
   117	    <symbol id="icon-brain" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   118	      <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-.08V4.5A2.5 2.5 0 0 0 9.5 2Z"/>
   119	    </symbol>
   120	
   121	  </defs>
   122	</svg>
   123	```
   124	
   125	---
   126	
   127	## 3. Templates de página
   128	
   129	### 3.1 Capa dark (cover)
   130	
   131	```html
   132	<div class="a4-page">
   133	  <svg class="page-svg" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
   134	
   135	    <!-- Background -->
   136	    <rect width="794" height="1123" fill="url(#grad-dark)"/>
   137	    <rect width="794" height="1123" fill="url(#grid-light)"/>
   138	    <rect width="794" height="1123" fill="transparent" filter="url(#noise)" opacity="0.6"/>
   139	
   140	    <!-- Header line -->
   141	    <text x="60" y="80" font-family="'JetBrains Mono', monospace" fill="#d97757" font-size="13" letter-spacing="2">RELATÓRIO ESTRATÉGICO</text>
   142	    <line x1="60" y1="98" x2="734" y2="98" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
   143	
   144	    <!-- Display title -->
   145	    <text x="60" y="380" font-family="'Playfair Display', serif" font-weight="900" fill="#ffffff" font-size="72" letter-spacing="-1">TÍTULO</text>
   146	    <text x="60" y="460" font-family="'Poppins', sans-serif" font-weight="700" fill="transparent" stroke="#ffffff" stroke-width="1.5" font-size="72" letter-spacing="6">SUBTÍTULO</text>
   147	
   148	    <!-- Accent bar -->
   149	    <rect x="60" y="510" width="48" height="4" fill="#d97757"/>
   150	
   151	    <!-- Tagline -->
   152	    <text x="60" y="565" font-family="'Lora', serif" fill="#e0e5ec" font-size="22">Tagline da capa aqui</text>
   153	
   154	    <!-- Info badge -->
   155	    <rect x="60" y="620" width="260" height="90" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" rx="4"/>
   156	    <text x="80" y="657" font-family="'JetBrains Mono', monospace" fill="#d97757" font-size="13">DOCUMENTO #001</text>
   157	    <text x="80" y="687" font-family="'Poppins', sans-serif" font-weight="700" fill="#ffffff" font-size="18">Nome do documento</text>
   158	
   159	    <!-- Footer -->
   160	    <line x1="60" y1="1023" x2="734" y2="1023" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
   161	    <text x="60" y="1060" font-family="'JetBrains Mono', monospace" fill="#8898aa" font-size="11">ACESSO ABERTO • LEITURA: 3 MIN</text>
   162	    <text x="734" y="1060" font-family="'JetBrains Mono', monospace" fill="#8898aa" font-size="11" text-anchor="end">PG. 01</text>
   163	  </svg>
   164	</div>
   165	```
   166	
   167	### 3.2 Página de conteúdo light (com sidebar)
   168	
   169	```html
   170	<div class="a4-page">
   171	  <svg class="page-svg" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
   172	
   173	    <rect width="794" height="1123" fill="#f4f7fa"/>
   174	    <rect width="794" height="1123" fill="url(#grid-dark)"/>
   175	
   176	    <!-- Sidebar vertical -->
   177	    <rect x="0" y="0" width="80" height="1123" fill="#1a365d"/>
   178	    <text transform="rotate(-90, 40, 561)" x="40" y="561"
   179	          font-family="'JetBrains Mono', monospace" fill="#ffffff" font-size="18"
   180	          text-anchor="middle" letter-spacing="5">SEÇÃO</text>
   181	
   182	    <!-- Content area começa em x=140 -->
   183	    <text x="140" y="100" font-family="'JetBrains Mono', monospace" fill="#d97757" font-size="13">LABEL DE SEÇÃO</text>
   184	    <text x="140" y="160" font-family="'Playfair Display', serif" font-weight="700" fill="#1a365d" font-size="44">Título da Seção</text>
   185	    <line x1="140" y1="190" x2="734" y2="190" stroke="#cbd5e1" stroke-width="1"/>
   186	
   187	    <!-- Body text -->
   188	    <text x="140" y="240" font-family="'Lora', serif" fill="#334155" font-size="17">
   189	      <tspan x="140" dy="0">Parágrafo de conteúdo principal vai aqui.</tspan>
   190	      <tspan x="140" dy="32">Segunda linha do parágrafo.</tspan>
   191	    </text>
   192	
   193	    <!-- Info cards (3 colunas) -->
   194	    <rect x="140" y="800" width="180" height="100" fill="#ffffff" stroke="#cbd5e1" rx="4"/>
   195	    <rect x="140" y="800" width="180" height="4" fill="#6a9bcc"/>
   196	    <text x="160" y="840" font-family="'Poppins', sans-serif" font-weight="700" fill="#1a365d" font-size="15">Card 1</text>
   197	    <text x="160" y="868" font-family="'Lora', serif" fill="#64748b" font-size="12">Descrição</text>
   198	
   199	    <rect x="340" y="800" width="180" height="100" fill="#ffffff" stroke="#cbd5e1" rx="4"/>
   200	    <rect x="340" y="800" width="180" height="4" fill="#788c5d"/>
   201	    <text x="360" y="840" font-family="'Poppins', sans-serif" font-weight="700" fill="#1a365d" font-size="15">Card 2</text>
   202	    <text x="360" y="868" font-family="'Lora', serif" fill="#64748b" font-size="12">Descrição</text>
   203	
   204	    <rect x="540" y="800" width="180" height="100" fill="#ffffff" stroke="#cbd5e1" rx="4"/>
   205	    <rect x="540" y="800" width="180" height="4" fill="#d97757"/>
   206	    <text x="560" y="840" font-family="'Poppins', sans-serif" font-weight="700" fill="#1a365d" font-size="15">Card 3</text>
   207	    <text x="560" y="868" font-family="'Lora', serif" fill="#64748b" font-size="12">Descrição</text>
   208	
   209	    <!-- Disclaimer / footer -->
   210	    <text x="140" y="980" font-family="'JetBrains Mono', monospace" fill="#d97757" font-size="11" font-weight="700">⚠ AVISO LEGAL OU DISCLAIMER AQUI SE NECESSÁRIO</text>
   211	    <text x="734" y="1060" font-family="'JetBrains Mono', monospace" fill="#8898aa" font-size="11" text-anchor="end">PG. 02</text>
   212	  </svg>
   213	</div>
   214	```
   215	
   216	---
   217	
   218	## 4. Padrões SVG comuns
   219	
   220	### Divider horizontal com label
   221	```svg
   222	<line x1="140" y1="400" x2="734" y2="400" stroke="#cbd5e1" stroke-width="1"/>
   223	<rect x="140" y="392" width="120" height="16" fill="#f4f7fa"/>
   224	<text x="150" y="404" font-family="'JetBrains Mono', monospace" fill="#94a3b8" font-size="10" letter-spacing="1">SEÇÃO 2</text>
   225	```
   226	
   227	### Callout box com left border
   228	```svg
   229	<rect x="140" y="440" width="594" height="100" fill="#ffffff" stroke="#1a365d" stroke-width="1.5" rx="4" filter="url(#shadow)"/>
   230	<rect x="140" y="440" width="6" height="100" fill="#1a365d" rx="2"/>
   231	<text x="170" y="488" font-family="'Poppins', sans-serif" font-weight="700" fill="#1a365d" font-size="18">Mensagem principal do callout aqui.</text>
   232	<text x="170" y="516" font-family="'Lora', serif" fill="#64748b" font-size="14">Detalhe ou explicação adicional.</text>
   233	```
   234	
   235	### Item de checklist
   236	```svg
   237	<use href="#icon-check" x="140" y="560" width="28" height="28" stroke="#6a9bcc"/>
   238	<text x="184" y="580" font-family="'Poppins', sans-serif" font-weight="700" fill="#1a365d" font-size="17">Item do checklist</text>
   239	<text x="184" y="600" font-family="'Lora', serif" fill="#64748b" font-size="13">Descrição do item.</text>
   240	```
   241	
   242	### Progress bar / metric bar
   243	```svg
   244	<!-- Track -->
   245	<rect x="140" y="700" width="594" height="20" fill="#e2e8f0" rx="3"/>
   246	<!-- Fill (ajustar width pra %) -->
   247	<rect x="140" y="700" width="475" height="20" fill="#1a365d" rx="3"/><!-- 80% -->
   248	<!-- Label -->
   249	<text x="625" y="715" font-family="'JetBrains Mono', monospace" fill="#1a365d" font-size="13" font-weight="700">80%</text>
   250	```
   251	
   252	### Elemento decorativo geométrico (neural/técnico)
   253	```svg
   254	<g transform="translate(600, 200)" stroke="rgba(0,0,0,0.06)" fill="none">
   255	  <circle cx="0" cy="0" r="160" stroke-width="1" stroke-dasharray="4 8"/>
   256	  <circle cx="0" cy="0" r="100" stroke-width="1"/>
   257	  <circle cx="0" cy="0" r="40" stroke="#d97757" stroke-width="1.5" fill="none"/>
   258	  <line x1="-180" y1="0" x2="180" y2="0" stroke-width="1"/>
   259	  <line x1="0" y1="-180" x2="0" y2="180" stroke-width="1"/>
   260	  <circle cx="70" cy="-70" r="5" fill="#6a9bcc" stroke="none"/>
   261	  <circle cx="-50" cy="86" r="5" fill="#788c5d" stroke="none"/>
   262	</g>
   263	```
   264	
   265	---
   266	
   267	## 5. Catálogo de tipos de página
   268	
   269	| Tipo | Background | Sidebar | Tipografia |
   270	|---|---|---|---|
   271	| Cover | Dark gradient + noise | Não | Display + Heading |
   272	| Conteúdo light | `#f4f7fa` | Navy bar esquerda | Heading + Body |
   273	| Conteúdo white | `#ffffff` | Sem ou top mono bar | Heading + Body |
   274	| Dark section | Dark gradient + noise | Não | Heading branco + Body muted |
   275	| CTA / final | Dark gradient | Não | Large heading + Mono |
   276	| Data / charts | `#ffffff` | Opcional | Mono + Compact |
   277	| Ethics / disclaimer | `#f4f7fa` | Não | Body + Callout boxes |
   278	
   279	---
   280	
   281	## 6. Print / Export — checklist
   282	
   283	- [ ] `@media print` esconde body bg e remove page shadow
   284	- [ ] `break-after: page` em `.a4-page`
   285	- [ ] Pra PDF: Chrome → Print → Save as PDF → **"Background graphics" ON**
   286	- [ ] Pra alta resolução: width/height em `mm` (browser renderiza no DPI da tela)
   287	- [ ] Texto SVG renderiza como vetor (sem rasterização) — fontes precisam estar carregadas
   288	- [ ] Testar com pelo menos 3 páginas pra validar break
   289	
   290	---
   291	
   292	## 7. Quando usar este engine vs PDF skill
   293	
   294	| Cenário | Use |
   295	|---|---|
   296	| Documento A4 multi-página com layout visual rico (relatório executivo, manifesto, playbook) | **Este engine** (HTML+SVG, exporta via Print) |
   297	| PDF gerado programaticamente com tabelas longas e dados dinâmicos | `/mnt/skills/public/pdf/SKILL.md` |
   298	| PDF a partir de Markdown ou texto puro | `/mnt/skills/public/pdf/SKILL.md` |
   299	| Form fillable PDF | `/mnt/skills/public/pdf/SKILL.md` |
   300	| Documento com fluxos visuais, callouts, gráficos custom | **Este engine** |
   301	
   302	Regra prática: se o documento for **mais visual que tabular**, use este engine. Se for o oposto, use a skill `pdf`.
   303	
File created successfully: /home/claude/toolkit-claude-pme-report.html
{"returncode":0,"stdout":"","stderr":""}
PDF estratégico A4 pronto. 8 páginas Executive Swiss, estrutura MECE completa:

**PG. 01** — Capa dark (recomendação: Cenário C Híbrido + PIVOT CMD Suite + janela 6–9m)  
**PG. 02** — TL;DR consolidado (3 key findings + unit economics + próximos passos)  
**PG. 03** — Metodologia (framework epistêmico FACT/INFERENCE/HYPOTHESIS/GAP + 6 blocos)  
**PG. 04** — Gold Standard High-Ticket (G4, StartSe, benchmarks CAC/LTV, faixas pricing BR)  
**PG. 05** — Branding "CMD Suite" (conflitos Dell/Hitachi/Motorola + alternativas Atelier/Praxis/Forja)  
**PG. 06** — Unit Economics (3 cenários A/B/C comparados; C vence)  
**PG. 07** — MVP Roadmap 90–180 dias (4 fases + budget R$ 100k + riscos)  
**PG. 08** — Decisão Final dark (tabela consolidada + caveats + next steps 7/21/60 dias)

Para imprimir: abrir no Chrome → Ctrl+P → "Background graphics" ON → Salvar como PDF.
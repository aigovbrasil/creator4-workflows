---
title: "Sistema operacional de prompt engineering com Meta Router"
date: 2026-05-07
account: verinhaburgos56@gmail.com
uuid: 8a078a87-728b-4415-97a9-17146c5a7c9d
messages: 2
tags: []
context: ""
---

**Você** _2026-05-07_

responde em 500 placras 5w2h

---

**Claude** _2026-05-07_

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
5W2H — CQL Registry + Meta Router Architecture

**WHAT**
Um sistema operacional pessoal de prompt engineering baseado em três camadas: (1) um Meta Router no Project Instructions, responsável por decodificar comandos curtos em stacks executáveis; (2) uma planilha-registry com módulos endereçados por ID (role, qa, data, output, framework, risk); e (3) uma mini-linguagem de comando — CQL — que permite compor múltiplos módulos com uma entrada curta como `CQL: 1+2+4 | Q=queda receita | OUT=exec | DEPTH=M`. A arquitetura separa intenção do usuário, biblioteca de módulos, política de roteamento e execução do modelo.

**WHY**
O problema central é tokenização ineficiente e prompts verbosos repetidos manualmente. Cada workflow recorrente exige colar o mesmo contexto longo. A solução endereça três ganhos simultâneos: eficiência de tokens por retrieval seletivo, escalabilidade exponencial de combinações controladas e auditabilidade — todo stack ativado fica visível antes da execução. O princípio de design é composabilidade controlada, não exponencialidade máxima.

**WHO**
Operado por um único usuário power-user, sem equipe de desenvolvimento. O sistema deve funcionar como low-code por dentro e como folha impressa com IDs por fora — a complexidade fica oculta na arquitetura, não na interface humana. Uma segunda camada futura pode expor a API para outros consultores ou para o produto X-ray.

**WHERE**
Nível 1 (MVP): Project Instructions no Claude.ai + planilha-registry como arquivo de conhecimento. Nível 2 (determinístico): Google Sheets ou BigQuery + Cloud Run/Functions com lookup exato por ID. Nível 3 (produto): API com parser CQL, function calling, Structured Outputs e JSONL test harness. O runtime inicial é Claude Projects; o runtime de produção é API com function calling para eliminar dependência de busca semântica aproximada.

**WHEN**
Semana 1: compilar registry v0.1, testar 20 comandos manuais. Semana 2: criar 100 casos em JSONL, rodar testes automatizados. Semana 3: corrigir conflitos, congelar v0.2, comparar métricas. Semana 4: publicar case study com estrutura problema → arquitetura → método → resultados → limitações. O critério de congelamento de versão é `id_resolution_rate ≥ 95%` e `silent_conflict_rate = 0%`.

**HOW**
O fluxo técnico é: usuário envia CQL curto → parser resolve IDs → lookup exato na planilha-registry → resolver de conflito por precedência (Segurança > SQA > Método > Role > Output) → assembler de contexto mínimo → execução no modelo → SQA gate → resposta com output schema → log de teste. A estrutura da registry usa linhas como módulos com colunas `id | tipo | título | prompt | fórmula | output | prioridade | conflitos | versão`. O compilador Python gera automaticamente registry limpo, guia MD imprimível, combinações ranqueadas e instruções do Project.

**HOW MUCH**
Custo operacional principal não é financeiro — é governança. O risco de overkill aparece acima de 4 IDs por execução, acima de 50 módulos sem regra de conflito, e sem versionamento. O teto recomendado é: ≤ 20 módulos na v0.1, ≤ 4 IDs por chamada, ≤ 1 clarificação por tarefa, e `useful_answer_rate ≥ 80%` como critério mínimo de adoção em produção.
---
title: "Salvando informações com skill internal-comms"
date: 2026-05-04
account: leonardopimentel.knh@gmail.com
uuid: 96629e16-130f-40c4-822d-3167822180aa
messages: 6
tags: []
context: ""
---

**Você** _2026-05-04_

como skill interm incomms pode me ajudar a salvar info ?

---

**Claude** _2026-05-04_

Vou verificar a skill "internal-comms" para entender como ela pode te ajudar a salvar informações.
24K	/mnt/skills/examples/internal-comms
12K	/mnt/skills/examples/internal-comms/LICENSE.txt
1.5K	/mnt/skills/examples/internal-comms/SKILL.md
11K	/mnt/skills/examples/internal-comms/examples
3.5K	/mnt/skills/examples/internal-comms/examples/3p-updates.md
3.5K	/mnt/skills/examples/internal-comms/examples/company-newsletter.md
2.5K	/mnt/skills/examples/internal-comms/examples/faq-answers.md
1.0K	/mnt/skills/examples/internal-comms/examples/general-comms.md

     1	---
     2	name: internal-comms
     3	description: A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.).
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	## When to use this skill
     8	To write internal communications, use this skill for:
     9	- 3P updates (Progress, Plans, Problems)
    10	- Company newsletters
    11	- FAQ responses
    12	- Status reports
    13	- Leadership updates
    14	- Project updates
    15	- Incident reports
    16	
    17	## How to use this skill
    18	
    19	To write any internal communication:
    20	
    21	1. **Identify the communication type** from the request
    22	2. **Load the appropriate guideline file** from the `examples/` directory:
    23	    - `examples/3p-updates.md` - For Progress/Plans/Problems team updates
    24	    - `examples/company-newsletter.md` - For company-wide newsletters
    25	    - `examples/faq-answers.md` - For answering frequently asked questions
    26	    - `examples/general-comms.md` - For anything else that doesn't explicitly match one of the above
    27	3. **Follow the specific instructions** in that file for formatting, tone, and content gathering
    28	
    29	If the communication type doesn't match any existing guideline, ask for clarification or more context about the desired format.
    30	
    31	## Keywords
    32	3P updates, company newsletter, company comms, weekly update, faqs, common questions, updates, internal comms
    33	
     1	## Instructions
     2	You are being asked to write a 3P update. 3P updates stand for "Progress, Plans, Problems." The main audience is for executives, leadership, other teammates, etc. They're meant to be very succinct and to-the-point: think something you can read in 30-60sec or less. They're also for people with some, but not a lot of context on what the team does.
     3	
     4	3Ps can cover a team of any size, ranging all the way up to the entire company. The bigger the team, the less granular the tasks should be. For example, "mobile team" might have "shipped feature" or "fixed bugs," whereas the company might have really meaty 3Ps, like "hired 20 new people" or "closed 10 new deals." 
     5	
     6	They represent the work of the team across a time period, almost always one week. They include three sections:
     7	1) Progress: what the team has accomplished over the next time period. Focus mainly on things shipped, milestones achieved, tasks created, etc.
     8	2) Plans: what the team plans to do over the next time period. Focus on what things are top-of-mind, really high priority, etc. for the team.
     9	3) Problems: anything that is slowing the team down. This could be things like too few people, bugs or blockers that are preventing the team from moving forward, some deal that fell through, etc.
    10	
    11	Before writing them, make sure that you know the team name. If it's not specified, you can ask explicitly what the team name you're writing for is.
    12	
    13	
    14	## Tools Available
    15	Whenever possible, try to pull from available sources to get the information you need:
    16	- Slack: posts from team members with their updates - ideally look for posts in large channels with lots of reactions
    17	- Google Drive: docs written from critical team members with lots of views
    18	- Email: emails with lots of responses of lots of content that seems relevant
    19	- Calendar: non-recurring meetings that have a lot of importance, like product reviews, etc.
    20	
    21	
    22	Try to gather as much context as you can, focusing on the things that covered the time period you're writing for:
    23	- Progress: anything between a week ago and today
    24	- Plans: anything from today to the next week
    25	- Problems: anything between a week ago and today
    26	
    27	
    28	If you don't have access, you can ask the user for things they want to cover. They might also include these things to you directly, in which case you're mostly just formatting for this particular format.
    29	
    30	## Workflow
    31	
    32	1. **Clarify scope**: Confirm the team name and time period (usually past week for Progress/Problems, next
    33	week for Plans)
    34	2. **Gather information**: Use available tools or ask the user directly
    35	3. **Draft the update**: Follow the strict formatting guidelines
    36	4. **Review**: Ensure it's concise (30-60 seconds to read) and data-driven
    37	
    38	## Formatting
    39	
    40	The format is always the same, very strict formatting. Never use any formatting other than this. Pick an emoji that is fun and captures the vibe of the team and update.
    41	
    42	[pick an emoji] [Team Name] (Dates Covered, usually a week)
    43	Progress: [1-3 sentences of content]
    44	Plans: [1-3 sentences of content]
    45	Problems: [1-3 sentences of content]
    46	
    47	Each section should be no more than 1-3 sentences: clear, to the point. It should be data-driven, and generally include metrics where possible. The tone should be very matter-of-fact, not super prose-heavy.
A skill **internal-comms** não salva informações no sentido de armazenamento, mas ajuda você a **organizar e apresentar informações** em formatos de comunicação interna estruturados. Aqui está como funciona:

## O que a skill faz:

**Cria comunicações internas estruturadas** nos seguintes formatos:

1. **3P Updates** (Progress, Plans, Problems) - atualizações semanais de equipe
2. **Newsletters da empresa** - comunicados gerais
3. **FAQ responses** - respostas a perguntas frequentes
4. **Relatórios de status** - relatórios de projetos
5. **Updates para liderança** - atualizações executivas

## Como pode te ajudar:

- **Organiza informações dispersas**: Pode buscar dados do Slack, Google Drive, Gmail e Calendar para compilar tudo em um formato claro
- **Estrutura seu conteúdo**: Transforma informações soltas em documentos profissionais
- **Economiza tempo**: Segue templates específicos da sua empresa automaticamente
- **Mantém consistência**: Usa formatos padronizados para comunicação

## Exemplo de uso:

Se você me pedir: *"Crie um 3P update da minha equipe de engenharia da última semana"*

Eu vou:
1. Buscar informações relevantes nas suas ferramentas conectadas
2. Organizar em: Progress (o que foi feito), Plans (próximos passos), Problems (bloqueios)
3. Formatar de forma concisa (leitura de 30-60 segundos)

**Quer criar uma comunicação interna agora?** Me diga que tipo de documento precisa!

---

**Você** _2026-05-04_

e as putras da antropoc ?

---

**Claude** _2026-05-04_

Sim! Tenho várias outras skills da Anthropic disponíveis. Aqui estão as **skills públicas**:

## 📄 Documentos e Arquivos

1. **docx** - Criar/editar documentos Word (.docx)
   - Relatórios, cartas, templates profissionais
   
2. **pdf** - Trabalhar com PDFs
   - Ler, mesclar, dividir, extrair texto, preencher formulários
   
3. **xlsx** - Planilhas Excel
   - Criar, editar, formatar, calcular, limpar dados

4. **pptx** - Apresentações PowerPoint
   - Criar slides, pitch decks, extrair conteúdo

## 🎨 Design e Interface

5. **frontend-design** - Criar interfaces web profissionais
   - Landing pages, dashboards, componentes React

6. **file-reading** - Ler arquivos de diversos formatos
   - Roteador que identifica como ler cada tipo de arquivo

7. **pdf-reading** - Leitura especializada de PDFs
   - Extrair conteúdo, tabelas, imagens de PDFs

## 🔧 Produto Anthropic

8. **product-self-knowledge** - Informações sobre produtos da Anthropic
   - Claude Code, API, planos e recursos do Claude.ai

## 💡 Qual você gostaria de usar?

Você pode me pedir coisas como:
- "Crie uma apresentação sobre X" (usa pptx)
- "Analise esse PDF" (usa pdf-reading)
- "Faça uma landing page" (usa frontend-design)
- "Gere um relatório em Word" (usa docx)

**O que você precisa criar ou fazer?**

---

**Você** _2026-05-04_

run Search divrr [Vou verificar a skill “internal-comms” para entender como ela pode te ajudar a salvar informações.​​​​​​​​​​​​​​​​

A skill internal-comms não salva informações no sentido de armazenamento, mas ajuda você a organizar e apresentar informações em formatos de comunicação interna estruturados. Aqui está como funciona:
O que a skill faz:
Cria comunicações internas estruturadas nos seguintes formatos:
	1.	3P Updates (Progress, Plans, Problems) - atualizações semanais de equipe
	2.	Newsletters da empresa - comunicados gerais
	3.	FAQ responses - respostas a perguntas frequentes
	4.	Relatórios de status - relatórios de projetos
	5.	Updates para liderança - atualizações executivas
Como pode te ajudar:
	•	Organiza informações dispersas: Pode buscar dados do Slack, Google Drive, Gmail e Calendar para compilar tudo em um formato claro
	•	Estrutura seu conteúdo: Transforma informações soltas em documentos profissionais
	•	Economiza tempo: Segue templates específicos da sua empresa automaticamente
	•	Mantém consistência: Usa formatos padronizados para comunicação
Exemplo de uso:
Se você me pedir: “Crie um 3P update da minha equipe de engenharia da última semana”
Eu vou:
	1.	Buscar informações relevantes nas suas ferramentas conectadas
	2.	Organizar em: Progress (o que foi feito), Plans (próximos passos), Problems (bloqueios)
	3.	Formatar de forma concisa (leitura de 30-60 segundos)
Quer criar uma comunicação interna agora? Me diga que tipo de documento precisa!

---

**Claude** _2026-05-04_

Vou buscar no seu Google Drive para ver quais arquivos você tem:
{
  "files": [
    {
      "id": "1T5Z6Tipv162xLLadNQCnhZNb8b4lKPfm",
      "title": "ID-EX-IDPRAXYS-TEMPLATES-OPS 2.xlsx",
      "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "fileSize": "14229",
      "fileExtension": "xlsx",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "Briefing SaaS BRIEFING INICIAL — SaaS WEB FULL STACK,,,,,,,,, Estrutura executiva por áreas de desenvolvimento | template único para impressão,,,,,,,,, Projeto / produto,, CMD - Business School - 60min Class - Ebook + Skill Suite,,,,Data / versão,,04/05/26, Problema central,,\"Consultores de Negocio Solo que operam com AI sofrem com re-trabalho manual e nao possuem recursos para escala,nao sabem operar com Claude,nao tem acesso a tutorias de qualidade recentem 2026\",,,,,,, Público-alvo,,\"Ex: Carlos - Consultor independente de negocios presta servico para mei,entusiasta em claude.\",,,,Objetivo do MVP,,Posicionamento - monetizacao - validacao de mercado, Proposta de valor,,\"\\\u003e % de conversao por oferta de servico personalizado com diferenciacao total habilita o consultor a acessar + dados em - tempo com + qualidade \\\u003e% de tomada de decisao e oferece stack para cliente prremium em menos tempo sem alucinacao,aumenta percepacao de valor do servico de consutoria ao usar skill suite CMD\",,,,Modelo de receita,,\"B2B2C - Infoproduto - hotmart - trafego pago \\[entre 39,90 - 79,90\\]\", Diferencial,,Skill suite + ebook onboarding interativo + oferta de Ex-ofice para cleinte + visualizacao de dados interativo integrado - personalizacao simples de metodologia do conultor e acesso a conheciemnto avancado de claude for business tudo em 60min com pucos clics by ui/uix deseing,,,,Prazo / marco,,Lanch 07/05/2026 - Marco ROI de 1500 iniciais recuperado para reinvestimento na rodada 2 - via afiliados, \"Uso recomendado • Preencha prioridade (Alta/Média/Baixa) e score de prontidão (0 a 5). • Score: 0 = indefinido | 3 = suficientemente claro para wireframe | 5 = pronto para backlog técnico.\",,,,,,Total de áreas,15,, ,,,,,,Score médio,0.0,Áreas críticas (\\\u003c3),0 Nº,Área,Macro / objetivo,O que considerar e planejar,Perguntas-chave,Entregáveis esperados,Riscos / esquecimentos,Prioridade,Score 0–5,Observações / decisões 1,Negócio e proposta de valor Overview TESES E HIPO: ,\"Definir a dor, o ICP e o valor econômico entregue pelo produto.\",\"• Dor urgente e recorrente • Quem compra x quem usa • Solução atual do mercado • Diferencial e monetização inicial\",\"• Quem compra? • Qual dor é crítica? • Por que pagaria?\",\"• ICP • proposta de valor • hipótese de receita\",\"• Público genérico • diferencial vago • produto sem dor real\",Alta,, 2,Escopo do produto / MVP,Delimitar o mínimo viável e o que ficará fora da primeira versão.,\"• Feature central • Itens obrigatórios x futuros • Limites do MVP • Dependências externas\",\"• O que prova a hipótese? • O que é obrigatório? • O que fica fora?\",\"• backlog MVP • backlog futuro • critérios de corte\",\"• Escopo inchado • atrasos por excesso de ambição\",Alta,, 3,Jornada do usuário,Mapear do primeiro acesso ao uso recorrente e retenção.,\"• Aquisição • cadastro/login • onboarding • primeiro valor • retorno e cancelamento\",\"• Como entra? • Em quantos passos vê valor? • Onde trava?\",\"• fluxo ponta a ponta • pontos de fricção • eventos-chave\",\"• Onboarding confuso • valor percebido tarde demais\",Alta,, 4,UX/UI e arquitetura de telas,\"Converter a jornada em páginas, navegação e componentes.\",\"• Telas públicas e privadas • navegação • layout base • estados loading/vazio/erro • responsividade e acessibilidade\",\"• Quais telas existem? • O próximo passo está claro? • Funciona no mobile?\",\"• mapa de telas • wireframes • biblioteca inicial de componentes\",\"• Interface bonita porém confusa • estados não especificados\",Alta,, 5,Front-end,\"Definir stack, estrutura do cliente e integração com APIs.\",\"• Framework e roteamento • formulários • estado • autenticação no cliente • performance e SEO público\",\"• Como organizar componentes? • Como tratar erro e loading? • Quais páginas indexam?\",\"• arquitetura front • padrões de componentes • integração com API\",\"• Acoplamento excessivo • baixa performance • SEO ignorado\",Alta,, 6,Back-end,\"Definir regras de negócio, serviços e contratos de API.\",\"• Entidades • endpoints • validação • permissões • logs • filas e integrações\",\"• Quais ações existem? • Quem pode fazer o quê? • Há processamento assíncrono?\",\"• modelo de serviços • especificação de API • regras de negócio\",\"• API sem contrato claro • regra de negócio dispersa\",Alta,, 7,Banco de dados,\"Estruturar persistência, integridade e evolução dos dados.\",\"• Entidades e relacionamentos • campos obrigatórios • histórico/auditoria • backup • crescimento\",\"• O que precisa ser salvo? • Como evitar inconsistência? • Há auditoria mínima?\",\"• modelo de dados inicial • chaves e relacionamentos • política de backup\",\"• Duplicidade • dados sem rastreabilidade • modelo frágil\",Alta,, 8,Autenticação e perfis,\"Controlar identidade, sessão e autorização por perfil.\",\"• Email/senha ou OAuth • recuperação de senha • verificação de email • papéis e rotas protegidas\",\"• Haverá admin? • Haverá login social? • Como proteger sessão?\",\"• fluxo de auth • matriz de permissões • política de sessão\",\"• Acesso excessivo • sessão insegura • permissões mal definid...",
      "viewUrl": "https://drive.google.com/file/d/1T5Z6Tipv162xLLadNQCnhZNb8b4lKPfm/view?usp=drivesdk",
      "createdTime": "2026-05-04T13:50:42.735Z",
      "modifiedTime": "2026-05-04T14:25:31.631Z",
      "viewedByMeTime": "2026-05-04T14:25:31.631Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1Zlf3R2RPbK92J-CXuUGP0UlFmO4dolLPlG-3I7nutiU",
      "title": "dashboard_maxdesign",
      "mimeType": "application/vnd.google-apps.spreadsheet",
      "fileSize": "4719",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "# Dashboard\n\n``` \n◆  DASHBOARD,Performance Overview · FY 2025,● LIVE   ·   Updated 25 Apr 2026\n◆,Overview,  TOTAL REVENUE,  ACTIVE USERS,  CONVERSION,  CHURN RATE\n  $2.42M,  4,720,  12.4%,  3.2%\n▦,Analytics\n  ↑ 18.4% vs LY,  ↑ 12.7% MoM,  ↑ 2.1pp,  ↓ 0.8pp\n◉,Customers\n  COSTS  +  PROFIT  ·  STACKED 12-MONTH,  PRODUCT MIX  ·  QUARTERLY\n◈,Products\n◐,Reports\n◇,Campaigns\n⚙,Settings\n─── ACCOUNT ───\nJD,  USER GROWTH  ·  ACTIVE vs NEW SIGNUPS,  REGIONAL PERFORMANCE\nJane Doe\nAdmin\n  REGION,TREND,REV,Δ%\n  North America,▁▁▂▂▃▄▅▅▆▆▇█,$89K,↑ 111.9%\n  Europe,▁▁▂▂▃▄▅▄▆▆▇█,$77K,↑ 102.6%\n  Asia Pacific,▁▁▂▂▃▄▅▄▅▆▇█,$71K,↑ 144.8%\n  Latin America,▁▁▂▂▃▄▅▅▆▆▇█,$49K,↑ 133.3%\n  Middle East,▁▁▂▂▃▄▅▅▆▆▇█,$39K,↑ 116.7%\n  Generated with openpyxl  ·  patterns from jmcnamara/XlsxWriter  ·  dark dashboard v1.0\n \n```\n\n# Data\n\n``` \nMonth,Revenue ($K),Costs ($K),Profit ($K),Active Users,New Signups\nJan,148,98,50,2120,410\nFeb,162,104,58,2340,450\nMar,175,112,63,2580,490\nApr,168,109,59,2510,470\nMay,192,121,71,2810,530\nJun,215,128,87,3120,580\nJul,234,138,96,3450,640\nAug,228,132,96,3380,620\nSep,251,145,106,3820,700\nOct,264,152,112,4150,760\nNov,273,156,117,4480,820\nDec,287,161,126,4720,870\nTotal,2597,1556,1041,4720,7340\n \n```\n\n# ProductMix\n\n``` \nQuarter,Pro,Team,Enterprise,Starter\nQ1,185,142,95,78\nQ2,224,168,124,92\nQ3,271,205,158,105\nQ4,318,248,194,124\n \n```",
      "viewUrl": "https://docs.google.com/spreadsheets/d/1Zlf3R2RPbK92J-CXuUGP0UlFmO4dolLPlG-3I7nutiU/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-25T06:50:09.856Z",
      "modifiedTime": "2026-04-25T06:50:11.174Z",
      "viewedByMeTime": "2026-05-04T11:20:52.039Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1APVBcj6RRh7a7fyZWG7TZy4a6MJsFaUc6-B-dEVF0mI",
      "title": "xray-master-document-v1.md",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "14651",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "# X-RAY SUITE · MASTER DOCUMENT\n\n# ID: XRAY-MASTER-v1\n\n# Criado: 2026-05-01 | Autor: Leonardo Batista\n\n# AI-READER-TAG:\n\n-----\n\n## SEÇÃO 1 · RACIOCÍNIO ESTRATÉGICO\n\n### O que está pronto\n\n  - canonical.json: schema 20 fases, 13 gates, 319 campos (DRAFT, não finalizado)\n  - xray-client-form.html: formulário do cliente (funcional, precisa de deploy)\n  - xray-v2.jsx: painel do consultor React (protótipo, não productizado)\n  - xray-skill-guide.html: tabular A/B de componentes\n  - Prompts de entrevista (S00–S02): 25 perguntas funcionais\n\n### O que está bloqueando tudo\n\n  - canonical.json incompleto → SKILL.md não pode ser finalizado\n  - Perfil de MARCOS indefinido → UX não pode ser validado\n  - Sem deploy do form → Rogerinho não tem URL\n  - Sem corpus documental → sem spec, sem contrato, sem handover\n\n### Cadeia operacional definitiva\n\nLEONARDO (dev, solo) → entrega produto → MARCOS (MARCOS-CONSULTORIA-LTDA) MARCOS (consultor) → usa produto para atender → ROGERINHO (ROGERINHO-ELETROPOSTO, Santos SP) REGRA: Leonardo NÃO opera nem suporta após handover. Zero.\n\n-----\n\n## SEÇÃO 2 · ROADMAP COM DEPENDÊNCIAS\n\nSEMANA 1 · FUNDAÇÃO \\[BLOCKER para tudo mais\\]\n\n├── W1.1 Finalizar canonical.json (20 fases completas, campos validados)\n\n├── W1.2 Gerar corpus documental (BRD-lite, PRD-lite, SOP-MARCOS, Runbook-LEO)\n\n├── W1.3 Definir perfil de MARCOS (técnico/não-técnico, dispositivo, contexto de uso)\n\n└── W1.4 Definir modelo comercial (preço B2B, licença, contrato)\n\nSEMANA 2 · BUILD \\[depende de W1 completa\\]\n\n├── W2.1 Claude Code: criar diretório x-ray-suite/ com SKILL.md raiz\n\n├── W2.2 Quebrar canonical.json em references/ por grupo de fases\n\n├── W2.3 Deploy xray-client-form.html no Vercel (URL pública)\n\n└── W2.4 Configurar MCPs necessários (Linear, Notion, Google Drive)\n\nSEMANA 3 · VALIDAÇÃO \\[depende de W2 completa\\]\n\n├── W3.1 Simular sessão completa: Leonardo como MARCOS, mock como Rogerinho\n\n├── W3.2 Rodar evals/ com 5 casos mínimos\n\n├── W3.3 Ajustar SKILL.md com base nos gaps encontrados\n\n└── W3.4 Validar jornada Rogerinho: WhatsApp → URL → form → JSON → MARCOS\n\nSEMANA 4 · HANDOVER \\[depende de W3 PASS\\]\n\n├── W4.1 README para MARCOS (zero jargão técnico)\n\n├── W4.2 SOP de manutenção (o que Leonardo precisa fazer se algo quebrar)\n\n├── W4.3 Pacote de entrega: .skill file + URL Vercel + README\n\n└── W4.4 Sessão de onboarding MARCOS (1h, gravada)\n\nCRITÉRIO DE DONE: MARCOS roda 1 caso S00→S19 com Rogerinho sem contato com Leonardo.\n\n-----\n\n## SEÇÃO 3 · WORKFLOW MASTER — TABELA DE PROMPTS E IDs\n\n|  |  |  |  |  |  |  |\n| :-: | :-: | :-: | :-: | :-: | :-: | :-: |\n| PROMPT-ID | FASE | TRIGGER (o que digitar) | ONDE USAR | DEPENDE DE | ENTREGA | STATUS |\n| XRAY-P01 | W1.1 | iniciar canonical review | Projeto: X-RAY Core | canonical.json anexado | canonical.json validado e finalizado | ⬜ pendente |\n| XRAY-P02 | W1.2 | gerar corpus documental | Projeto: X-RAY Core | XRAY-P01 concluído | BRD-lite + PRD-lite + SOP + Runbook em .md | ⬜ pendente |\n| XRAY-P03 | W1.3 | definir perfil marcos | Projeto: X-RAY Core | nenhuma | marcos-profile.md | ⬜ pendente |\n| XRAY-P04 | W1.4 | gerar modelo comercial | Projeto: X-RAY Core | XRAY-P03 | pricing-model.md | ⬜ pendente |\n| XRAY-P05 | W2.1 | gerar skill directory spec | Claude Code | XRAY-P01 + P02 | prompt pronto para Claude Code criar x-ray-suite/ | ⬜ pendente |\n| XRAY-P06 | W2.3 | gerar deploy guide | Projeto: X-RAY Core | xray-client-form.html | vercel-deploy-guide.md (passo a passo sem código) | ⬜ pendente |\n| XRAY-P07 | W3.1 | simular sessao marcos | Claude Code com skill instalada | XRAY-P05 | relatório de gaps + ajustes no SKILL.md | ⬜ pendente |\n| XRAY-P08 | W3.2 | rodar evals xray | Claude Code | XRAY-P07 | evals/results/ + benchmark.md | ⬜ pendente |\n| XRAY-P09 | W4.1 | gerar readme marcos | Projeto: X-RAY Core | XRAY-P07 aprovado | README-MARCOS.md (linguagem consultoria, zero código) | ⬜ pendente |\n| XRAY-P10 | W4.2 | gerar sop manutencao | Projeto: X-RAY Core | XRAY-P05 | SOP-manutencao-leonardo.md | ⬜ pendente |\n| XRAY-PA | Qualquer | iniciar fase a | Projeto: X-RAY Core | documento tabular preenchido | auditoria + perguntas de gap | ⬜ pendente |\n| XRAY-PB | Após PA | fase b | Projeto: X-RAY Core | XRAY-PA respondido | análise 4 lentes | ⬜ pendente |\n| XRAY-PC | Após PB | fase c | Projeto: X-RAY Core | XRAY-PB aprovado | PROMPT-INSTRUCAO-FINAL Claude Code | ⬜ pendente |\n\n-----\n\n## SEÇÃO 4 · CORPUS DOCUMENTAL DO NEGÓCIO\n\n|  |  |  |  |  |  |  |  |\n| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |\n| DOC-ID | TIPO | FASE | NOME DO ARQUIVO | OWNER | STATUS | CONTEÚDO MÍNIMO NECESSÁRIO | AI-TAG |\n| XRAY-DOC-01 | BRD-lite | W1.2 | brd-x-ray-suite.md | Leonardo | ⬜ gerar | Problema de mercado, solução proposta, stakeholders (Leonardo/MARCOS/Rogerinho), restrições, critérios de sucesso | \\\u003cdoc type=\"BRD\" version=\"lite\" product=\"x-ray-suite\"/\\\u003e |\n| XRAY-DOC-02 | PRD-lite | W1.2 | prd-x-ray-suite.md | Leonardo | ⬜ gerar | Funcionalidades por ator (Leonardo, MARCOS, Rogerinho), fluxos principai...",
      "viewUrl": "https://docs.google.com/document/d/1APVBcj6RRh7a7fyZWG7TZy4a6MJsFaUc6-B-dEVF0mI/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-05-01T10:18:56.349Z",
      "modifiedTime": "2026-05-01T10:18:57.672Z",
      "viewedByMeTime": "2026-05-01T10:18:57.672Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1_ia7BAphLWqjPxBVOwM70oSWB_63hbgsjY90hPeFScg",
      "title": "A-finalv2cliente-georges hair",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "10239",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "# Diagnóstico Executivo de Demanda e Operação\n\n## Georges Hair\n\n-----\n\nPreparado por: Leonardo Batista, Boom Consultant Data: 25 de abril de 2026 Cliente: Georges Hair — Salão de BelezaLocalização: Bairro de classe média, zona urbana — São Paulo\n\n-----\n\n## Contextualização\n\nGeorges Hair opera com uma equipe de 8 profissionais especializados em corte, coloração, progressiva e manicure, atendendo predominantemente mulheres entre 25 e 50 anos em bairro de classe média de São Paulo. Com faturamento estimado entre R$220 mil e R$300 mil anuais, o salão enfrenta uma queda de aproximadamente 30% no movimento em relação ao período pré-pandemia.\n\nHoje, a operação depende quase exclusivamente de indicação e da base de clientes antigos para sustentar o fluxo de atendimentos. O Instagram é publicado de forma irregular e sem retorno mensurável. Tentativas anteriores de alavancar marketing digital — curso de Instagram e contratação de freelancer de tráfego pago — não geraram resultado, pois faltava a estrutura operacional necessária para converter e reter os clientes que chegavam. A equipe apresenta ociosidade severa durante a semana, com pico desorganizado aos sábados. A agenda é gerenciada manualmente via WhatsApp, sem registro histórico de clientes, sem controle de recorrência e sem métricas de desempenho.\n\nEste diagnóstico identificou as causas estruturais dessa queda e propõe um plano de ação concreto para recuperação de demanda nos próximos 90 dias.\n\n-----\n\n## Diagnóstico — Três Causas Estruturais Inter-relacionadas\n\nA análise revela que a queda de movimento não tem uma causa única. Ela é resultado de três falhas estruturais que se alimentam mutuamente:\n\n### Causa 1 — Sem Motor Ativo de Aquisição de Clientes\n\nA empresa não possui estratégia estruturada para atrair novos clientes. A indicação orgânica — que historicamente sustentou o negócio — é reativa e não escalável: ela ocorre quando o cliente está satisfeito e decide mencionar o salão espontaneamente. Não é possível prever seu volume, intensificá-la ou substituí-la quando enfraquece.\n\nIdentificamos que o Google Maps do salão está mal otimizado — com poucas avaliações e perfil incompleto —, o que representa uma oportunidade de captação orgânica local inexplorada. Clientes que buscam \"salão de beleza perto de mim\" no Google simplesmente não encontram o Georges Hair em posição de destaque.\n\nImplicação direta: sem um canal de aquisição ativo e mensurável, o salão está estruturalmente limitado à base atual de clientes — e qualquer perda de cliente representa redução de receita sem mecanismo de reposição.\n\n-----\n\n### Causa 2 — Ausência de Estrutura de Retenção e Recorrência\n\nOs dados indicam que nenhum processo sistematizado existe para estimular o retorno de clientes após o atendimento. Não há registro de histórico de visitas, não há acompanhamento pós-serviço e não há oferta de recorrência estruturada — seja em formato de pacotes, cartão-fidelidade ou qualquer incentivo que crie compromisso de retorno.\n\nA análise do comportamento típico de salões do segmento indica que clientes ativos visitam o estabelecimento 6 a 8 vezes por ano — em média, a cada 6 a 8 semanas. Sem qualquer estímulo de retorno, uma parcela significativa dessas visitas deixa de acontecer. Estimamos que a base de clientes inativos — aqueles que não visitaram o salão nos últimos 3 ou mais meses — representa uma oportunidade imediata de reativação com custo próximo de zero.\n\nImplicação direta: o salão perde clientes não por insatisfação, mas por ausência de contato. O cliente simplesmente deixa de lembrar de agendar, e ninguém o lembra.\n\n-----\n\n### Causa 3 — Operação sem Dados, Decisões sem Base\n\nA agenda manual via WhatsApp não registra padrões de demanda, distribuição por dia e horário, ticket real por serviço ou taxa de retorno de clientes. Sem esses dados, qualquer decisão — sobre promoções, precificação, alocação de equipe ou prioridade de investimento — é tomada por intuição.\n\nA análise indica que a ociosidade de segunda a sexta-feira é expressiva, enquanto o sábado opera próximo à capacidade máxima. Essa concentração cria dois problemas simultâneos: subutilização de recursos durante a semana (equipe paga, mas ociosa) e experiência comprometida no sábado (clientes esperam mais, equipe sobrecarregada).\n\nImplicação direta: sem dados, é impossível saber se uma promoção funcionou, se um canal de aquisição gerou retorno ou se a estrutura de preços está adequada. O ciclo de tentativa-e-erro sem medição continua indefinidamente.\n\n-----\n\n## Análise de Mercado — Contexto Setorial\n\nOs dados do setor de beleza em São Paulo apontam para um padrão consistente com o que o Georges Hair experimenta. A retomada de demanda pós-pandemia foi desigual: salões com público de renda mais alta recuperaram movimento rapidamente, enquanto segmentos de classe média ainda apresentam recuperação incompleta. Ao mesmo tempo, o número de cabeleireiros autônomos e MEIs cresceu significativamente entre 2020 e 2024, aumentando a c...",
      "viewUrl": "https://docs.google.com/document/d/1_ia7BAphLWqjPxBVOwM70oSWB_63hbgsjY90hPeFScg/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-25T08:49:22.919Z",
      "modifiedTime": "2026-04-25T08:49:59.083Z",
      "viewedByMeTime": "2026-04-28T18:50:23.918Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1JN8CPWJrr5fXumgk3b8pjs0Nz6lbsiVMkb3NCb1WZWM",
      "title": "horizon",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "1213",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "",
      "viewUrl": "https://docs.google.com/document/d/1JN8CPWJrr5fXumgk3b8pjs0Nz6lbsiVMkb3NCb1WZWM/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-28T10:10:24.384Z",
      "modifiedTime": "2026-04-28T11:05:55.279Z",
      "viewedByMeTime": "2026-04-28T15:23:53.609Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1MSqXE60myWh7wrRXrQN9fMzBN2EXhNCrx7J2H7uv8jc",
      "title": "promt",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "12593",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "Nome da aba: Lean MVP Operating Model\n\nObjetivo da planilha:\n\nCriar um sistema operacional de preenchimento para modelar, validar e evoluir um negócio Lean MVP desde a hipótese inicial até o próximo experimento. A planilha deve orientar o usuário passo a passo, impedir avanço prematuro para solução, evidenciar dependências, registrar hipóteses, avaliar qualidade das respostas e gerar uma visão sintética para tomada de decisão.\n\nRegras gerais:\n\n1\\. Use apenas uma aba.\n\n2\\. Organize o conteúdo em blocos verticais.\n\n3\\. Cada bloco deve ter título claro, subtítulo explicativo e tabela estruturada.\n\n4\\. Mantenha todos os campos de resposta editáveis.\n\n5\\. Campos de instrução, dependência, objetivo e perguntas-chave devem vir preenchidos.\n\n6\\. Campos de resposta do usuário devem ficar vazios, com placeholder quando útil.\n\n7\\. Trate tudo como hipótese até existir evidência.\n\n8\\. Não permita avançar para solução antes de problema e cliente estarem minimamente definidos.\n\n9\\. Diferencie hipótese, evidência, decisão, métrica e próximo experimento.\n\n10\\. Priorize validações simples, rápidas e baratas.\n\n11\\. Use linguagem objetiva, operacional e orientada à decisão.\n\n12\\. Inclua colunas suficientes para que a planilha funcione como ferramenta de trabalho, não apenas como checklist.\n\n13\\. A planilha deve ser legível, profissional e pronta para uso executivo.\n\nFormatação obrigatória:\n\n\\- Criar um título principal no topo: “Lean MVP Operating Model — Modelo de Negócio Inicial”\n\n\\- Abaixo do título, criar uma breve descrição do uso da planilha.\n\n\\- Usar uma única aba.\n\n\\- Congelar a linha superior ou os primeiros blocos relevantes, se tecnicamente possível.\n\n\\- Aplicar largura adequada às colunas textuais.\n\n\\- Aplicar quebra automática de texto em perguntas, instruções e respostas.\n\n\\- Usar cabeçalhos com destaque visual.\n\n\\- Usar bordas leves e consistentes.\n\n\\- Usar cores suaves e profissionais.\n\n\\- Diferenciar células editáveis das células instrutivas.\n\n\\- Usar validação de dados para campos como Status, Confiança, Prioridade, Tipo de Risco, Decisão e Fase.\n\n\\- Usar formatação condicional para destacar respostas fracas, riscos altos, dependências ausentes e hipóteses não validadas.\n\n\\- Não criar múltiplas abas.\n\n\\- Não criar gráficos complexos, salvo se couberem na mesma aba sem prejudicar a leitura.\n\n\\- Não usar excesso de cores, bordas grossas ou elementos decorativos.\n\nEstrutura geral da aba:\n\nA planilha deve conter os seguintes blocos, nesta ordem:\n\nBLOCO 1 — Instrução Agêntica\n\nCriar uma tabela com as colunas:\n\n\\- Regra\n\n\\- Instrução\n\n\\- Aplicação prática\n\n\\- Espaço para observações\n\nPreencher com as seguintes regras:\n\n1\\. Comece sempre pelo problema e pelo cliente.\n\n2\\. Toda resposta inicial é hipótese, não fato.\n\n3\\. Cada etapa exige resposta objetiva.\n\n4\\. Dependências fracas devem ser sinalizadas antes do avanço.\n\n5\\. Hipótese, evidência, decisão e experimento devem ser separados.\n\n6\\. Validação barata vem antes de construção.\n\n7\\. Métricas devem ser definidas antes do teste.\n\n8\\. Receita e preço devem ser testados, não presumidos.\n\n9\\. Risco principal deve orientar o próximo experimento.\n\n10\\. Ao final, o agente deve gerar síntese executiva e próximos passos.\n\nBLOCO 2 — Tabela Mestre Lean MVP com Dependências\n\nCriar uma tabela com as colunas:\n\n\\- Etapa\n\n\\- Fase\n\n\\- Tópico\n\n\\- Objetivo\n\n\\- Perguntas-chave\n\n\\- Dependências\n\n\\- Tipo de resposta esperada\n\n\\- Hipótese principal\n\n\\- Evidência existente\n\n\\- Grau de confiança\n\n\\- Risco principal\n\n\\- Forma de validação\n\n\\- Métrica de sucesso\n\n\\- Critério para avançar\n\n\\- Critério para pivotar\n\n\\- Status\n\n\\- Responsável\n\n\\- Prazo\n\n\\- Espaço para resposta\n\nPreencher as linhas abaixo:\n\n1\\. Fase: Descoberta | Tópico: Problema | Objetivo: Identificar uma dor real e relevante | Perguntas-chave: Qual problema existe? Quem sofre? Com que frequência? Qual o impacto? | Dependências: Nenhuma | Tipo de resposta esperada: Hipótese de problema.\n\n2\\. Fase: Descoberta | Tópico: Segmento de Clientes | Objetivo: Definir quem tem o problema com maior intensidade | Perguntas-chave: Quem é o público-alvo inicial? Quem são os early adopters? Onde eles estão? | Dependências: Problema | Tipo de resposta esperada: Perfil de cliente inicial.\n\n3\\. Fase: Descoberta | Tópico: Persona Inicial | Objetivo: Tornar o cliente inicial concreto e acionável | Perguntas-chave: Quem é a pessoa específica? Qual cargo, rotina, motivação, restrição e comportamento? | Dependências: Segmento de Clientes | Tipo de resposta esperada: Persona operacional.\n\n4\\. Fase: Descoberta | Tópico: Contexto de Uso | Objetivo: Entender quando e por que o problema aparece | Perguntas-chave: Em que situação o problema ocorre? O que o cliente faz antes, durante e depois? | Dependências: Problema + Cliente | Tipo de resposta esperada: Jornada ou cenário de uso.\n\n5\\. Fase: Descoberta | Tópico: Intensidade da Dor | Objetivo: Avaliar se o problema merece solução | Perguntas-chave: O problema é frequente, caro, urgente, arriscado ou emo...",
      "viewUrl": "https://docs.google.com/document/d/1MSqXE60myWh7wrRXrQN9fMzBN2EXhNCrx7J2H7uv8jc/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-28T15:23:06.520Z",
      "modifiedTime": "2026-04-28T15:23:29.161Z",
      "viewedByMeTime": "2026-04-28T15:23:29.161Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1IrXV9k_3NEsfWB14-iDRmHYAzt1s206x_AJ6YmWJz0g",
      "title": "PLano refatoracao brainstorm",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "24336",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "\"\"Perfeito. Tenho o suficiente para montar o plano completo. Um ponto pendente: você mencionou arquivos de exemplopara a client app — vou sinalizar onde isso entra como blocker no plano.\n\nð\u009f\u008f\u0097️ PLANO DE REFATORAÇÃO — Bússola 2.0\n\nNova Arquitetura: 4 fases reais\n\n┌─────────────────────────────────────────────────────────┐\n\n│ BÚSSOLA PME 2.0 — FLUXO COMPLETO │\n\n├──────────┬──────────┬────────────┬───────────────────────┤\n\n│ \\[A\\] │ \\[B\\] │ \\[C/D\\] │ \\[E\\] │\n\n│ ONBOARD │ INTAKE │ SEARCH │ ARTIFACT SYSTEM │\n\n│ 1x/cons │ 1x/caso │ agente │ 2 trilhas + ZIP │\n\n│ .html │ .html │ auto │ .html + .txt + app │\n\n└──────────┴──────────┴────────────┴───────────────────────┘\n\n↓ ↓ ↓ ↓\n\nsystem\\_prompt intake\\_ ebook.html \\[INTERNA\\] dashboard.html\n\n(Project) normalized backup.txt \\[CLIENTE\\] ebook+proposta+app\n\nSkills: O que acontece com cada uma\n\nSkill atual\n\nDestino\n\npraxis\n\n❌ Deprecar — absorvida integralmente\n\nbussola-personalization\n\n♻️ Refatorar → bussola-onboarding\n\nbussola-diagnostic-engine\n\n♻️ Refatorar → bussola-intake (fases 1-2)\n\nbussola-simulation-lab\n\n♻️ Refatorar → bussola-wide-search\n\nbussola-deliverable-forge\n\n♻️ Refatorar → bussola-artifact-system\n\nbussola-execution-bridge\n\n♻️ Absorvida por bussola-artifact-system\n\nbussola-orchestrator\n\n✂️ Simplificar — 4 fases, sem gate enforcement\n\nbussola-consultive-faq\n\n✅ Manter — standalone, sem mudança\n\nbussola-case1-showroom\n\n✅ Manter — rever triggering\n\nSkills novas a criar: bussola-onboarding, bussola-intake, bussola-wide-search, bussola-artifact-system\n\nSpec de cada nova skill\n\nbussola-onboarding (substitui personalization)\n\nExecuta: 1x por consultor, salva no Claude Project UI gerada: onboarding.html — formulário em seções:\n\nIdentidade (nome, empresa, logo, cores)\n\nFrameworks preferidos (SWOT, 5W2H, Pareto, JTBD, etc.)\n\nMetrologia padrão (KPIs, moeda, fuso, formato de datas)\n\nProfundidade de entregável (lite / standard / deep)\n\nFontes permitidas (Drive, Gmail, none)\n\nOutput: system\\_prompt.md — prompt normalizado persistido no Project Aprovação inline: botão \"Confirmar e Salvar\" no próprio HTML Sem gates formais — aprovação é o submit do form\n\nbussola-intake (substitui diagnostic-engine fases 1-2)\n\nExecuta: 1x por caso UI gerada: intake\\_\\[cliente\\].html — abas:\n\nAba 1: Identidade do cliente (empresa, segmento, equipe, faturamento)\n\nAba 2: Problema principal + secundários + urgência\n\nAba 3: Decisores + documentos disponíveis\n\nAba 4: Revisão + labels epistêmicos automáticos \\[FATO/INFERÊNCIA/HIPÓTESE\\]\n\nAba 5: Aprovação inline → gera intake\\_normalized\\_prompt.md\n\nOutput: intake\\_normalized\\_prompt.md — pronto para alimentar wide search Sem gates formais — aprovação na aba 5 substitui G0 + G1\n\nbussola-wide-search (substitui simulation-lab + engine fases 3-5)\n\nInput: intake\\_normalized\\_prompt.md + system\\_prompt.md Execução: call ao agente de wide search com prompt consolidado Output automático em 2 formatos:\n\nebook\\_\\[cliente\\].html — estrutura:\n\nSeção BRD (Business Requirements)\n\nSeção PRD (Product/Process Requirements)\n\nSeção MRD (Market Research)\n\nDiagnóstico com frameworks do consultor já aplicados\n\nPriorização visual\n\nPlano de ação 5W2H\n\nbackup\\_\\[cliente\\].txt — versão normalizada para auditoria\n\nAprovação inline: dentro do ebook HTML, botão \"Aprovar diagnóstico → gerar entregáveis\"\n\nbussola-artifact-system (substitui deliverable-forge + executive-artifact-system + execution-bridge)\n\nInput: ebook aprovado + system\\_prompt + intake Gera 2 trilhas:\n\nTrilha Interna → dashboard\\_consultor\\_\\[cliente\\].html\n\nArquivo único, self-contained\n\nVisão de todos os dados do projeto\n\nEdição inline de campos, cores, status\n\nSubstituição de planilhas XLS (tabelas editáveis embutidas)\n\nExporta versão vX\\_\\[cliente\\].txt normalizada ao salvar\n\nEste é o único documento do consultor\n\nTrilha Cliente → pacote:\n\nebook\\_cliente\\_\\[cliente\\].html — versão limpa, sem dados internos\n\ndashboard\\_cliente\\_\\[cliente\\].html — visualização de KPIs e plano\n\nproposta\\_comercial\\_\\[cliente\\].html — proposta com branding\n\nSe aprovado → app\\_\\[cliente\\]/ ← ð\u009f\u0094´ BLOCKER: aguardando seus arquivos de exemplo\n\nOutput final: \\[case\\_id\\]\\_bussola\\_\\[data\\].zip Estrutura:\n\n/interno/ → dashboard\\_consultor + TXT versionados\n\n/cliente/ → ebook + dashboard + proposta (+ app/)\n\n/audit/ → intake original + system\\_prompt snapshot\n\nGates: Nova semântica (sem gates formais)\n\nEquivalente antigo\n\nNova forma\n\nG0 — intake válido\n\nBotão submit aba 5 do intake.html\n\nG1 — labels aplicados\n\nGerado automaticamente na aba 4\n\nG2 — diagnóstico humano\n\nBotão \"Aprovar\" dentro do ebook.html\n\nG5 — aprovação final\n\nBotão \"Aprovar → gerar trilha cliente\" no dashboard\\_consultor\n\nG6 — handoff\n\nBotão \"Gerar ZIP\" = handoff explícito\n\nSequência de execução da refatoração\n\nSemana 1\n\n├── Deprecar praxis (mover para /archive)\n\n├── Escrever bussola-onboarding SKILL.md\n\n└── Escrever bussola-intake SKILL.md\n\nSemana 2\n\n├── Escrever bussola-wide-search SKILL.md\n\n└── Simplificar bussola-orchestrator (4 fases, sem gate enforcement)\n\nSeman...",
      "viewUrl": "https://docs.google.com/document/d/1IrXV9k_3NEsfWB14-iDRmHYAzt1s206x_AJ6YmWJz0g/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-28T14:43:39.422Z",
      "modifiedTime": "2026-04-28T14:44:40.205Z",
      "viewedByMeTime": "2026-04-28T14:44:40.205Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "10UToL59r9t6pGrJDzQITWdd1ULMzi6iZwvAAbbWzxI0",
      "title": "source-Leo-Bruto",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "3424",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "",
      "viewUrl": "https://docs.google.com/document/d/10UToL59r9t6pGrJDzQITWdd1ULMzi6iZwvAAbbWzxI0/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-27T14:34:47.146Z",
      "modifiedTime": "2026-04-28T11:21:42.985Z",
      "viewedByMeTime": "2026-04-28T11:21:42.985Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "19tsuqS7DI2Ab-D6SZUAPQSGNM5Tliuvs-ZUUXByb4j8",
      "title": "Leo-007",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "69916",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "08:38\n\n# Workspace - file strucred reade me.\n\nAs pastas estao classificadas em Macros:\n\n\\#ID\\_OPS é Docuemntos internos \\#ID-OPS-DEV é pendente producao code  \n\\#ID\\_Current\\_workspace é docuentacao ativa em andamento  \n\\#ID\\_Ex é assets e referecnes da Suite.  \n\\#ID\\_PRAXYS é Versao final da solucao  \n\\#ID\\_TEMPLATES sao pastas vazias para clonar\n\n# Read-me \\\u003e Always TAG \\\u003e Keep simple.\n\n# TAGS:\n\n\\[Agen\\]-\\[BR\\] - \\[NL\\] - \\[OPS\\] -\\[ASAP\\]-\\[TMR\\]-\\[PRJ-01\\]-\\[PRJ-02\\]-\\[PRJ-03\\]-\\[99\\]- \\[HORZ\\]  \n1-Agenda Compromissos - 2 - Macro-brasil - 3- Macro-Nl - 4- ASAP-URGENTE - 5-TMR- tarefa amanha - 6- Projeto1 - 7- Projeto\\_2 - 8 Projeto 3 - 99-sem classif - 10-Horizaonte.\n\nS1-S2-S3-S4-S5-S6-S7\n\n# Dados\n\n1.  On.26.Leonardo@Gmail.com \\\u003e Operacional Geral Login’s\n2.  On\\_Leonardo@Outlook.com \\\u003e Recebimentos Importantes  \n    \\--—————————————————————————————————————————————————  \n    \\#ID01-nl - \\[12-06-26/ 16:30 - Leonardo.pdab@gmail.com \\\u003e Ultreach \\\u003e IMIGRACAO\\]\n\nVera passagem 3.200  \nJoao usecasa vera 05/todo mes\n\n  - De 23/04/2026 até 08/06/2026 47 dias → 6,71 semanas\n  - Data da Viagem: 08/06/26 - 2510,00\n\n# To-do.\n\n  - PENDENTE - LISTA DE DOCUMENTACAO BR-NL para IMIGRACAO\n  - Renovacao CNH\n  - Acomodacao\n  - Financeiro Joao - 7k -Financeiro Vera 20k Financeiro Dri 3k Total = 5K-euros\n  - Pendencia Receita federal\n  - CheckUP -medico -receitas medicamentos-manipulacao\n  - Recuperar Gov\n  - Skill Hiperauto\n\n# Work-Strategy\n\nInternalized corpus structure to architect personalized Excel workspace prompt\n\nInternalized corpus structure to architect personalized Excel workspace prompt\n\nThe user wants me to:\n\n1.  Read and understand two uploaded files (ABS-CONSULTING-SKILL-SYSTEM-CORPUS-v1\\_1.yaml and ID-EX-IDPRAXYS-TEMPLATES-OPS.xlsx)\n2.  Design a \"master prompt\" that can be used to generate a personalized Excel workbook for their business\n3.  The workbook should have:\n\n\u003c!-- end list --\u003e\n\n  - Tab 0: Operational dashboard with personal data, login info, links\n  - Tab 1: Executive summary with key info for quick review/print\n  - Other tabs: Taxonomy of areas from the corpus\n  - Section for saving prompts, code, images\n  - Premium design, nice UI/UX\n  - Should include \"what's out\" and \"next steps\"\n  - This will be their only workspace source\n\n\u003c!-- end list --\u003e\n\n1.  The output should be a PROMPT (not the Excel file itself) - a master prompt that follows Anthropic guidelines and is ready to copy-paste for future use\n2.  I need to internalize the structure from both documents before generating the prompt\n\nLet me first read both files to understand the structure.\n\nMostrar menos\n\nConcluído\n\nI'll read both uploaded files first to understand the structure and content, then create a master prompt for generating your personalized Excel workspace.\n\nSynthesized ABS framework and architected master prompt for personalized Excel workspace\n\nSynthesized ABS framework and architected master prompt for personalized Excel workspace\n\nRead the ABS consulting corpus YAML to understand business structure\n\nThis is a large YAML file. Let me continue reading to understand the structure better, particularly the areas section.\n\nContinue reading the areas structure\n\nLet me now check the Excel template file to understand its structure.\n\nInspect the Excel template structure\n\nScript\n\nGood, now I understand the structure. Let me read more of the YAML to see the complete area taxonomy and then create a master prompt. I need to read the rest of the areas and understand the frameworks/modules/gates structure.\n\nRead the frameworks, modules, gates sections\n\nGood, now I have enough context. Let me continue reading to see the gates section and understand the complete structure.\n\nRead the gates and next steps sections\n\nPerfect\\! Now I have a complete understanding of:\n\n1.  ABS Corpus v1.1 - A consulting skill system with:\n\n\u003c!-- end list --\u003e\n\n  - 15 areas (business metadata mapped from SaaS briefing template)\n  - 17 artifacts (A01-A17) - documented corpus\n  - Frameworks (F-FOUNDER, F-CONSULTANT, F-SIMULATION)\n  - Modules (CCSIB - Consulting Corpus to Skill Integration Builder, HOB)\n  - Workflows (consultant-client journey)\n  - Gates (validation checkpoints)\n  - 6 roadmap phases (R1-R6 + Day 91)\n  - Next steps and gaps\n  - Dual track: Track A (product) + Track B (career/portfolio)\n\n\u003c!-- end list --\u003e\n\n1.  Excel Template - \"Briefing SaaS\" structure with areas/priorities/scores\n\nNow I need to create a MASTER PROMPT that:\n\n  - Can be copy-pasted to generate a personalized Excel workbook\n  - Tab 0: Operational dashboard (personal data, links, login info)\n  - Tab 1: Executive summary (quick review/print)\n  - Other tabs: Taxonomy of all areas\n  - Section for saving prompts, code, images\n  - Premium design using executive-artifact-system\n  - Include \"what's out\" and \"next steps\"\n  - This will be the user's ONLY workspace\n\nThe prompt should be:\n\n  - Following Anthropic guidelines\n  - Clear and specific\n  - Ready to copy-paste\n  - Self-contained\n  - Structured for C...",
      "viewUrl": "https://docs.google.com/document/d/19tsuqS7DI2Ab-D6SZUAPQSGNM5Tliuvs-ZUUXByb4j8/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-27T14:36:10.269Z",
      "modifiedTime": "2026-04-27T14:42:09.447Z",
      "viewedByMeTime": "2026-04-28T11:20:18.527Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1m96TKCkjhrCHvbFW3orDxsVmiSq7Qf1oDQg5TcMf_fA",
      "title": "aurelio-skills-strategy.md",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "27672",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "# Estratégia de Workflows Personalizados no Ecossistema Anthropic — v2026\n\nOwner: Aurelio / Leonardo Sessão: Arquitetura de criação de skills e workflows Base: Anthropic engineering blog · docs.claude.com · skill-creator oficial · claude.com/blog (jan–abr 2026) Idioma: PT-BR (operacional) com termos técnicos em EN\n\n-----\n\n## 1\\. RESPOSTA DIRETA\n\nA melhor estratégia é uma híbrida de Opção 4 + Opção 2, nesta ordem específica:\n\n1.  Executar o workflow real no Claude.ai com Project + Project Knowledge (Opção 4 começa aqui)\n2.  Rodar o scanner/regression depois de 2–3 execuções reais para extrair o padrão que funcionou (Opção 2)\n3.  Usar o skill-creator oficial para gerar o SKILL.md a partir desse padrão extraído\n4.  Migrar para Claude Code para versionamento, scripts, supporting files e testes\n5.  Conectar MCP/Drive/GitHub apenas depois da estabilização (mínimo 5 execuções bem-sucedidas)\n\nJustificativa (FACT, fonte: Anthropic engineering blog, out/2025 atualizado 2026): A própria Anthropic recomenda: \"Itere com Claude: enquanto você trabalha em uma tarefa, peça ao Claude para capturar abordagens bem-sucedidas e erros comuns em contexto e código reutilizáveis dentro de uma skill.\" Isso é literalmente Opção 2. E recomendam \"comece com avaliação\" — ou seja, execute primeiro, capture depois. Não escreva skill teórica.\n\nO que NÃO fazer: começar pela Opção 3 (escrever prompt completo estruturado primeiro). Isso produz skills baseadas em hipótese, não em uso real, e as descrições ficam genéricas — o que provoca o problema oficialmente conhecido de undertriggering (skills que nunca são acionadas porque a descrição não bate com o que o usuário realmente diz).\n\n-----\n\n## 2\\. DECISÃO ESCOLHIDA\n\nDECISION: Adotar o padrão \"Run-First, Extract-Second, Version-Third\" como metodologia padrão de criação de skill.\n\n### O que você deve fazer concretamente\n\n|  |  |  |\n| :-: | :-: | :-: |\n| Etapa | Onde | Output |\n| 1\\. Operar o workflow 2–3 vezes manualmente | Claude.ai (Project relevante) | Conversas completas com decisões, erros e correções |\n| 2\\. Rodar o prompt scanner (§12) na conversa | Claude.ai (mesmo Project) | Especificação extraída do workflow real |\n| 3\\. Rodar o prompt criador (§11) com a spec extraída | Claude.ai (Skill Lab project) ou skill-creator oficial | Rascunho do SKILL.md |\n| 4\\. Validar a description com 5 frases-gatilho | Claude.ai | Description endurecida contra undertriggering |\n| 5\\. Migrar para repo + Claude Code | Claude Code (\\~/dev/aurelio-os/) | Skill versionada + supporting files + testes |\n| 6\\. Rodar regression em 3 casos (incluindo Ana fixture) | Claude Code | Skill validada |\n| 7\\. Conectar Drive/GitHub/MCP | Claude.ai connectors + Claude Code | Skill em produção |\n\nRegra dura: nenhuma skill nasce de prompt teórico. Toda skill nasce de execução real capturada.\n\n-----\n\n## 3\\. COMPARAÇÃO DAS OPÇÕES\n\n|  |  |  |  |  |  |  |\n| :-: | :-: | :-: | :-: | :-: | :-: | :-: |\n| Opção | Melhor uso | Vantagens | Limitações | Riscos | Escalabilidade | Quando evitar |\n| 1\\. Skill Creator em fases (free-form) | Pessoas iniciantes que querem skill rápida sem entender os internals | Baixa fricção; Q\\&A interativo gera SKILL.md válido | Captura intenção declarada, não comportamento real; description tende a ser genérica | Skill que nunca aciona (undertriggering); Skill que aciona errado | Baixa-média | Quando o workflow ainda não foi executado nenhuma vez |\n| 2\\. Run + Scanner/Regression | Workflows que você JÁ executou ad-hoc várias vezes e quer cristalizar | Captura padrões reais que funcionaram; description sai com triggers reais; skill já nasce alinhada com o uso | Exige conversas suficientemente completas e disciplinadas; depende da qualidade do prompt scanner | Capturar viés de uma execução específica que não generaliza | Alta (gera skills robustas) | Quando você nunca operou o workflow ainda |\n| 3\\. Prompt completo estruturado primeiro | Workflows com requisitos legais, regulatórios ou de compliance que precisam ser explícitos antes da execução | Máxima especificidade upfront; bom para audit | Frequentemente over-engineered; produz skills frágeis na prática; descobre edge cases tarde demais | Alta probabilidade de skill que descreve o ideal mas falha no real | Baixa (custo alto de manutenção) | Workflows criativos, exploratórios ou que ainda estão evoluindo |\n| 4\\. Rascunho no Claude.ai → Claude Code | Workflows que se beneficiam de raciocínio + entrega versionada (caso geral) | Aproveita força de cada ambiente; separa pensar de construir | Exige fluxo entre 2 ambientes (curva de aprendizado) | Esquecer de mover artefatos para repo; perder rastreabilidade | Alta | Tarefas one-shot que não vão repetir |\n| 5\\. Híbrida 4+2 (RECOMENDADA) | Caso geral para Aurelio OS | Combina força de raciocínio + extração baseada em uso real + versionamento | Curva de aprendizado mais alta nas primeiras 2 skills | Inércia inicial — exige disciplina nas 2–3 execuções manuais antes de extrair | Muito alta | Workflows tão simples q...",
      "viewUrl": "https://docs.google.com/document/d/1m96TKCkjhrCHvbFW3orDxsVmiSq7Qf1oDQg5TcMf_fA/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-28T08:56:20.336Z",
      "modifiedTime": "2026-04-28T08:56:21.928Z",
      "viewedByMeTime": "2026-04-28T08:56:21.928Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1hYqmaoj9-5CGSnjqYoDkvz7Tm5SduonamO0nJ-5EWp4",
      "title": "aurelio-os-operating-spec.md",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "27436",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "# AURELIO OS — Anthropic Ecosystem Operating Specification\n\nOwner: Leonardo Batista / Aurelio Version: v0.1 — foundational Mode: pre-validation MVP, solo, low-code/low-cost Strategic thesis: the product is the portfolio; the portfolio sells the product Languages: PT-BR (product/client) · EN (technical/portfolio/NL)\n\n-----\n\n## 1\\. EXECUTIVE OPERATING DIAGNOSIS\n\n|  |  |\n| :-: | :-: |\n| Lens | Reading |\n| Capital allocation | 6 active tracks (ABS, Scripity, agent-spec-normalizer, AI-Natomy, NL Sprint, Family OS) competing for solo founder time. Without a forcing function, drift is the default risk. |\n| Activation friction | Highest where it matters most: ABS has no payable offer yet, no live buyer, no installed skill catalog. Pre-validation = no validated WTP. |\n| Distribution realism | Brazilian SMB buys via WhatsApp + accountants/consultants; portfolio (AI-Natomy) is the trust ladder. NL track requires English-language portfolio + GitHub presence. Both are served by the same portfolio asset if structured correctly. |\n| Reversibility | High. All current assets are content + skill files + repos. Almost no sunk-cost risk. Optimize for speed of learning, not for elegance. |\n| Time-to-first-cash | Realistic only via a paid pilot (assisted-implementation) of ABS — not via standalone skill licensing. Pure-product revenue is 90+ days out. |\n| Commoditization risk | Skills as standalone files = high commoditization in 12 months. Skills embedded in operated workflows = defensible. Lean toward the latter. |\n| Key insight | You don't need 6 tracks active. You need ONE forcing function (paid ABS pilot) and a portfolio engine (AI-Natomy) feeding it. Everything else is support infrastructure. |\n\nDiagnosis (DECISION): Operate as a 2-track system with 4 support layers, not a 6-track system with equal weight. Forcing functions: (a) ABS paid pilot in 60 days; (b) Portfolio publishing weekly. Everything else serves these two.\n\n-----\n\n## 2\\. CLAUDE.AI PROJECT ARCHITECTURE\n\nUse Claude.ai Projects as persistent context containers. One Project per operating domain, not per task. Each Project gets: Custom Instructions + Project Knowledge (uploaded files) + Drive connector folder scope.\n\n### Recommended Project tree\n\n|  |  |  |  |  |\n| :-: | :-: | :-: | :-: | :-: |\n| \\# | Project Name | Purpose | Custom Instructions Anchor | Drive Folder Scope |\n| 01 | 007 — Command | Meta-orchestration, decisions, weekly reviews, system audits | Three-lens executive advisor frame | /Aurelio-OS/00-Comando-007/ |\n| 02 | ABS — Product | Product corpus, A01–A17, framework analysis, roadmap, SOP | Scripity-aware; PT-BR primary | /Aurelio-OS/01-ABS/product/ |\n| 03 | ABS — Sales | Pitch, pricing, pilot offer, WhatsApp scripts, proposal templates | Brazilian SMB monetization lens | /Aurelio-OS/01-ABS/sales/ |\n| 04 | Scripity — Engine | Scripity skill development, validation cases, regression tests | Agent-spec-normalizer enabled | /Aurelio-OS/02-Scripity/ |\n| 05 | AI-Natomy — Portfolio | Content briefs, drafts, publishing cadence, public artifacts | Bilingual; portfolio-as-product thesis | /Aurelio-OS/04-AI-Natomy/ |\n| 06 | NL Sprint — Career | Job market mapping, CV/LinkedIn, application tracker, NL employers | EN primary; PESTEL on NL tech market | /Aurelio-OS/05-NL-Sprint/ |\n| 07 | Family Admin OS | Family documents, decisions, routines, references | PT-BR; LGPD-conscious | /Aurelio-OS/06-Family-Admin/ |\n| 08 | Skill Lab | Skill creation, normalization, testing — work-in-progress only | skill-creator + agent-spec-normalizer | /Aurelio-OS/03-Agent-Spec-Normalizer/ |\n\n### Custom Instructions template (paste into each Project, adapted)\n\n\\\u003crole\\\u003e\n\n\\[Project-specific role: e.g., \"ABS Product Architect\" / \"NL Career Strategist\"\\]\n\n\\\u003c/role\\\u003e\n\n\\\u003cpersistent\\_context\\\u003e\n\n\\- Owner: Leonardo / Aurelio (Brazil → NL track)\n\n\\- Project tracks: 007, ABS, Scripity, agent-spec-normalizer, AI-Natomy, NL Sprint, Family OS\n\n\\- IP assets: Scripity (corpus engine), agent-spec-normalizer\n\n\\- Strategic thesis: portfolio sells the product\n\n\\- Maturity: pre-validation MVP, solo, low-code\n\n\\\u003c/persistent\\_context\\\u003e\n\n\\\u003coperating\\_rules\\\u003e\n\n\\- Apply epistemic labels: FACT | INFERENCE | HYPOTHESIS | GAP | DECISION | ACTION\n\n\\- Never invent IDs, URLs, credentials, financial data, or regulatory facts\n\n\\- Default to tables and structured artifacts over prose\n\n\\- Surface activation friction, distribution realism, reversibility on every recommendation\n\n\\- Bilingual: PT-BR for product/client; EN for technical/portfolio\n\n\\\u003c/operating\\_rules\\\u003e\n\n\\\u003coutput\\_defaults\\\u003e\n\n\\- Format: tables, YAML, code blocks, dense structured sections\n\n\\- Tone: direct + consultative\n\n\\- Proactivity: high — flag risks, gaps, next steps unprompted\n\n\\\u003c/output\\_defaults\\\u003e\n\n-----\n\n## 3\\. CLAUDE CODE REPOSITORY ARCHITECTURE\n\nSingle monorepo for Aurelio OS. Treat as your operating system, not as a product codebase.\n\n\\~/dev/aurelio-os/\n\n├── .claude/\n\n│ ├── CLAUDE.md \\# Top-level context for Claude Code\n\n│ ├── commands/ \\# Sla...",
      "viewUrl": "https://docs.google.com/document/d/1hYqmaoj9-5CGSnjqYoDkvz7Tm5SduonamO0nJ-5EWp4/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-28T08:39:32.493Z",
      "modifiedTime": "2026-04-28T08:39:34.310Z",
      "viewedByMeTime": "2026-04-28T08:39:34.310Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1CZt7m2Xn9SteW9cTUrI4HLniHHc5MBclcomF07e40WQ",
      "title": "Promopt",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "9201",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "minimo 10-max 50 palpvras OrdemAçãoResultado1Usar este corpus v1.1 como camada governanteelimina confusão Leonardo/consultor/Ana2Preencher A01–A17 sobre o ABS / produto do Leonardogera documentação real do plano3Usar Ana apenas dentro de exemplos e testesvalida a skill sem contaminar o corpus4Rodar CORE\\_PME primeiroreduz escopo e acelera validação5Depois expandir para FULLsó após o núcleo estar coerenteA próxima execução correta é: preencher A01–A17 para o produto ABS do Leonardo, usando Ana apenas como fixture nos exemplos, testes e outputs demonstrativos.Mapa final de dependências v1.1ArtefatoDepende deStatus nesta versãoA01 Vision—preenchidoA02 MRDA01preenchidoA03 PRFAQA01, A02preenchidoA04 Business CaseA02, A03preenchidoA05 CharterA04preenchidoA06 BRDA05, A02preenchidoA07 PRDA06, A05preenchidoA08 FRDA07, A06preenchidoA09 NFRA07, A06preenchidoA10 ArchSpecA07, A09, A08preenchidoA11 ADRA10, A06preenchidoA12 RoadmapA07, A05, A04preenchidoA13 StoriesA07, A08, A12preenchidoA14 BacklogA13, A12, A09preenchidoA15 Release PlanA14, A12preenchidoA16 SOPA07, A05, A10preenchidoA17 RunbookA16, A10, A11, A15preenchidoFramework Stack v1.1 — Aplicado ao LeonardoFaseNomeFrameworksCamada principalUso correto para LeonardoOutput esperadoF1KickoffSCQA; BLUF; Cynefinfounder + consultantEnquadrar o escopo do ABS: qual problema o produto resolve, para quem, com qual promessa mínima e com qual limite de escopo.Tese clara do produto + escopo IN/OUT + decisão sobre qual caso simulado usar.F2DiagnósticoSWOT; 5Whys; Ishikawa; Porter; JTBD; TOCconsultant + simulationUsar o caso Ana para testar se a skill consegue diagnosticar um cliente final realista; para Leonardo, serve como prova de que o sistema funciona.Diagnóstico executivo da Ana como demo + identificação de lacunas do produto.F3PriorizaçãoGUT; Pareto; MECEfounder + consultantPriorizar o que Leonardo deve construir primeiro: skill, template, README, landing, case demo, GitHub, vídeo, ebook ou validação com consultor.Backlog priorizado do ABS com foco no menor MVP validável.F4Plano5W2H; OKR; 7Ps; BSCfounder + consultantTransformar a tese do ABS em plano de execução de 30/60/90 dias; também gerar o plano de 30 dias para Ana como output de teste.Plano 5W2H do produto + plano 5W2H demo da Ana.F5ExecuçãoPDCA; OODAfounder + consultantAcompanhar ciclos de melhoria após a primeira versão: testar, observar feedback, ajustar prompt, templates, entregáveis e posicionamento.Ciclos de melhoria do ABS + registro de aprendizados.F6ValidaçãoFirst Principles; PESTELfounderValidar a tese central: o ABS resolve um problema real para consultores? Existe demanda? O posicionamento serve para portfólio/carreira? O mercado aceita?Veredito: continuar, ajustar, nichar, vender ou pivotar.F7HandoverBLUF; SCQAconsultantConverter o resultado em comunicação clara: para cliente final, para consultor avaliador, para LinkedIn, GitHub, landing e portfólio profissional.Resumo executivo, case study, README, pitch e material de apresentação.\n\nRotaResultadoRota 1 — gerar os 17 artefatos completosentrega documental ampla\n\nO corpus está agora normalizado em formato tabular, preservando lógica, dependências, artefatos, módulos, gates e restrições. A estrutura mais útil para seu próximo passo não é expandir mais texto, mas converter essas tabelas em uma planilha-mestre ou CSV com colunas fixas. Próximo passo executável: transformar a seção “Tabela-Mestre Compacta” em um schema-base para Airtable, Google Sheets ou JSONL operacional.Você não recebeu ainda os 17 artefatos finais preenchidos.\n\nVocê recebeu uma descrição estruturada / blueprint operacional dos 17 artefatos.O que você ainda não temArtefatoStatus atualA01 Visiondescrito, mas não preenchidoA02 MRDdescrito, mas não preenchidoA03 PRFAQdescrito, mas não preenchidoA04 Business Casedescrito, mas não preenchidoA05 Charterdescrito, mas não preenchidoA06 BRDdescrito, mas não preenchidoA07 PRDdescrito, mas não preenchidoA08 FRDdescrito, mas não preenchidoA09 NFRdescrito, mas não preenchidoA10 ArchSpecdescrito, mas não preenchidoA11 ADRdescrito, mas não preenchidoA12 Roadmapdescrito, mas não preenchidoA13 Storiesdescrito, mas não preenchidoA14 Backlogdescrito, mas não preenchidoA15 Release Plandescrito, mas não preenchidoA16 SOPdescrito, mas não preenchidoA17 Runbookdescrito, mas não preenchidoFrameworkPresente?FunçãoCynefinSimmapear tipo de problemaPESTELSimanalisar contexto externoPorterSimanalisar competição/setorJTBDSimentender valor para clienteSWOTSimdiagnóstico inicialMECESimestruturar análise sem sobreposiçãoFirst PrinciplesSimreconstruir solução pela baseOKRSimdefinir objetivos e métricasBSCSimalinhar estratégiaTOCSimachar gargaloParetoSimpriorizar alto impactoGUTSimpriorizar problemasIshikawaSimcausa-raiz5 WhysSimcausa-raiz simples5W2HSimplano executávelPDCASimmelhoria contínuaOODASimdecisão rápidaSCQASimcomunicação executivaBLUFSimconclusão primeiro5PsSimmarketing de serviço7PsSimplano completo de serviçoO que falta para virar resultado real\n\nFalta rodar um...",
      "viewUrl": "https://docs.google.com/document/d/1CZt7m2Xn9SteW9cTUrI4HLniHHc5MBclcomF07e40WQ/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-27T15:47:51.091Z",
      "modifiedTime": "2026-04-27T15:51:36.146Z",
      "viewedByMeTime": "2026-04-27T15:51:36.146Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "14jgWVrQWv405ZKrXTUhEeZ5035YBxzibHifkhG2ExU8",
      "title": "Tree-files-Leo",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "11181",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "Done. I created the structured project handoff ZIP:\n\nDownload ABS-Meta-Project-Handoff.zip\n\nBuilt from the ABS corpus source of truth and the operational workspace.\n\nWhat is inside:\n\nABS-Meta-Project-Handoff/\n\n├── README.md\n\n├── 00\\_MANIFEST.csv\n\n├── 00\\_PROJECT\\_TREE.md\n\n├── 00\\_READ\\_ME\\_FIRST/\n\n├── 01\\_SOURCE\\_OF\\_TRUTH/\n\n├── 02\\_FOUNDER\\_LEO\\_META\\_PROJECT/\n\n├── 03\\_PRODUCT\\_ABS\\_SKILL\\_SYSTEM/\n\n├── 04\\_Ricard - CONSULTANT\\_OPERATOR\\_AND\\_CLIENT\\_AREA/\n\n│ └── 02\\_CLIENT\\_AREA/\n\n│ └── 01\\_FIXTURES/\n\n│ └── ANA\\_SOUZA/\n\n├── 05\\_DELIVERABLES\\_REGISTRY/\n\n\\[05.1\\_ASSEST SUITE/\n\n007  \nFOUDER LEO / 10\\_session workbook .xls /\n\nmodel de pastas skills\n\n\\[MEU WORKSPACE É FOUNDER (LEO-OPS)\\]\n\nEx-models/\n\n\\*Volta Studio full corpus /\n\ntem BP VOLTA DASH  \nLANDING PAGE COPY  \nSHOW CASE INTERATIVE\n\n\\*aurelio full corpus\n\ntem corpus summary\n\ntem dois docs aurelio os full coprus lite e full e txt normalized\n\nTemp\\_aurelio-s-os / Discovery-layer mrd lite e vision frame lite / execution layer - backlog e roadmap / product layer tem adr e prd.\n\nSebrae PDF - EBOOK  \nsebrate tem business dash bapord  \nCorpus adv full = 5 docuemtos ( proprio caso BRD-PRD-TECHSPEC-LINEAR-BASE PESQUISA)\n\nBussula / ebook / html interativo swiss exemplo / tem ex flashiping com erro\n\nrefatorcao asstes / Dash - ex ofccice - forge - SQA - falta dash novo\n\nSkill suite /\n\nBussula pme skill zip\n\nhiperauto diag\n\npraxis\n\n├── 06\\_VALIDATION\\_GATES\\_QA\\_RISKS/\n\n├── 07\\_PROMPT\\_LIBRARY\\_AND\\_ASSET\\_REGISTRY/\n\n├── 08\\_TRACK\\_B\\_NL\\_PORTFOLIO/\n\n├── 09\\_DEPENDENCIES\\_AND\\_AUTOMATION/\n\n└── 10\\_BOARD\\_HANDOFF\\_PACKET/\n\nKey decisions applied:\n\nLeo is treated as the founder-builder/dev. The consultant is modeled only as a structural operator persona. The client area is nested inside the consultant/operator layer. Ana is nested under the client fixtures folder and marked clearly as fake fixture only, not as the product subject.\n\nQA completed:\n\n  - ZIP integrity check passed.\n  - 71 files included.\n  - YAML source of truth included.\n  - Excel operational workbook included.\n  - Ana fixture correctly nested under consultant/client area.\n  - README, manifest, project tree, dependency map, injection plan, QA rules, gates, risk register, deliverables registry, Track B files, board handoff packet, and draft SKILL/CLAUDE files included.\n  - SKILL.md is intentionally labeled draft/not validated, because R2/R3 validation has not happened yet.\n\n\\--——-\n\nPLANO MENTAL DE SALVAMENTO — ABS META PROJECT  \nLeo / Founder-Dev / ABS Full Stack Meta Project\n\nOBJETIVO  \nOrganizar tudo que pertence ao projeto ABS em uma árvore única, para que eu consiga salvar, revisar, imprimir, compartilhar com board/equipe e delegar execução sem confusão.\n\nREGRA CENTRAL  \nLeo é o founder-builder-dev.  \nABS é o produto/meta-projeto.  \nO consultor é uma persona operacional criada para organizar arquivos.  \nAna é apenas cliente fictícia de teste, nunca o projeto principal.\n\nORDEM DE SALVAMENTO\n\n1.  SALVAR PRIMEIRO — FONTE DA VERDADE\n\nOnde salvar:  \n01\\_SOURCE\\_OF\\_TRUTH/\n\nO que salvar aqui:\n\n  - YAML principal do corpus ABS\n  - Excel workspace operacional\n  - Manifesto de arquivos\n  - Árvore do projeto\n  - Índice mestre\n\nFunção:  \nEsta pasta responde: “qual é a versão oficial do projeto?”\n\nNão misturar aqui:\n\n  - rascunhos\n  - prompts soltos\n  - arquivos da Ana\n  - arquivos comerciais finais\n\n\u003c!-- end list --\u003e\n\n1.  SALVAR SEGUNDO — LEITURA OBRIGATÓRIA\n\nOnde salvar:  \n00\\_READ\\_ME\\_FIRST/\n\nO que salvar aqui:\n\n  - README principal\n  - Como usar este ZIP\n  - Ordem de execução\n  - Regras críticas\n  - Glossário de papéis\n\nFunção:  \nEsta pasta responde: “por onde começo?”\n\nRegra:  \nQualquer pessoa que receber o projeto deve ler esta pasta antes de mexer no resto.\n\n1.  SALVAR TERCEIRO — LEO / FOUNDER / DEV\n\nOnde salvar:  \n02\\_FOUNDER\\_LEO\\_META\\_PROJECT/\n\nO que salvar aqui:\n\n  - estratégia do Leo\n  - visão do produto\n  - decisões de founder\n  - roadmap pessoal\n  - decisões de carreira\n  - restrições pessoais\n  - plano de execução solo\n\nFunção:  \nEsta pasta responde: “o que Leo está construindo e por quê?”\n\nRegra:  \nTudo aqui pertence ao fundador, não ao consultor e não à Ana.\n\n1.  SALVAR QUARTO — PRODUTO ABS\n\nOnde salvar:  \n03\\_PRODUCT\\_ABS\\_SKILL\\_SYSTEM/\n\nO que salvar aqui:\n\n  - SKILL.md\n  - CLAUDE.md\n  - artefatos A01-A17\n  - PRD\n  - BRD\n  - roadmap do produto\n  - backlog\n  - arquitetura\n  - SOP do produto\n  - runbook\n  - QA checklist\n  - outputs obrigatórios do MVP\n\nFunção:  \nEsta pasta responde: “qual é o produto ABS?”\n\nRegra:  \nABS produz exatamente 3 outputs no MVP:\n\n1.  diagnóstico executivo\n2.  matriz de decisão\n3.  plano 5W2H de 30 dias\n\nNão colocar aqui:\n\n  - documentos da Ana como se fossem o produto\n  - arquivos pessoais do Leo\n  - arquivos de venda soltos\n\n\u003c!-- end list --\u003e\n\n1.  SALVAR QUINTO — CONSULTOR OPERADOR\n\nOnde salvar:  \n04\\_CONSULTANT\\_OPERATOR\\_AND\\_CLIENT\\_AREA/\n\nO que salvar aqui:\n\n  - persona do consultor\n  - fluxo de atendimento\n  - intake\n  - bastidores\n  - handover\n  - modelos usados...",
      "viewUrl": "https://docs.google.com/document/d/14jgWVrQWv405ZKrXTUhEeZ5035YBxzibHifkhG2ExU8/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-27T14:35:19.818Z",
      "modifiedTime": "2026-04-27T14:35:26.995Z",
      "viewedByMeTime": "2026-04-27T15:45:53.312Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1BOVZmfTcLMZ21B3aBmn411O6-_ZSCTKfatU1r8CxqsE",
      "title": "hriizondte holanda 007",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "34317",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "Arquivo: Nova entrada..txt\n\nMapa de Dependências entre Domínios\n\nBPM → AI → Produto/Ágil → Automação → Governança\n\nA progressão proposta por Leonardo é BPM → AI → Produto/Ágil → Automação → Governança. Abaixo, a validação e correção dessa sequência.\n\nAnálise de cada dependência\n\nBPM/Processos como base: Correto como ponto de partida. Six Sigma ensina pensamento analítico baseado em dados (DMAIC: Define, Measure, Analyze, Improve, Control). Para um PM/PO, entender como processos funcionam e como medir desempenho é fundacional. Sem isso, as decisões de produto ficam sem framework de análise. BPM também introduz vocabulário de negócios (KPIs, stakeholders, mapeamento de processos) que será usado em todos os domínios seguintes.\n\nAI/Dados/Tech após BPM: Correto. Com o framework de processos, Leonardo pode entender ONDE a AI resolve problemas (gap de processo → solução de AI). exige entendimento de conceitos de AI/ML, e a base de processos torna isso mais concreto.\n\nProduto/Ágil após AI: Correto mas com nuance. O domínio de Produto é onde Leonardo aprende a GERIR soluções de AI como produto. A sequência faz sentido: primeiro entender processos, depois entender a tecnologia, depois aprender a gerenciar ambos como produto. Contudo, Scrum/Ágil pode começar em paralelo com AI porque são frameworks de gestão, não dependem de conhecimento técnico.\n\nAutomação após Produto: Correto. Automação (N8N, UiPath, Zapier) é aplicação prática de conceitos de AI e processos. Leonardo precisa entender o que automatizar (BPM) e como AI se encaixa (Domínio 2) antes de construir automações. Este domínio também gera os entregáveis de portfólio mais demonstráveis.\n\nGovernança como capstone: Correto e estratégico. IAPP AIGP é a certificação mais complexa e exige entendimento de AI, processos, regulação e gestão de risco. Colocá-la por último permite que Leonardo chegue com base sólida. Além disso, o EU AI Act tem deadline em agosto/2026 — estudar governança de AI próximo a esse deadline maximiza relevância.\n\nFundação analítica; vocabulário de negócios; DMAIC como framework de pensamento\n\nEntender onde AI resolve gaps de processo; cloud; conceitos de ML\n\nFramework de gestão para orquestrar BPM + AI como produto\n\nAplicação prática; ferramentas de portfólio; demonstra capacidade de execução\n\nCapstone: exige AI + processos + regulação; alinhado ao EU AI Act ago/2026\n\nEstrategia de estudos e execucao:\n\n1.  Metodologia Agil: Estudar Scrum Guide dominiar um topico por semana para ser especilista,nao fazer curso apenas estudar autoditada. No final do plano tenho Certificado: PSPM-AI e conhciemntos nas areas de PO/PM/AI\n2.  Governanca AI act mesma estrategia estudar o GUIA faseado dominiando topicos por semana para retirar certificado: AIGP — IAPP. Porem Proximo ao certificado no fim do plano fazer o curso sobre ai governance e obter esse outro certifcado tbm: AIActTPro — AI Act Trained Professional. inlcuir cursos para fazer quando chegar na holanda e estrategia d ex abaixo: Estudar o livro Rapido e devegar para entnder mias sobre o conteudo associado ao AI act e minha futura funcao.\n\nExplo de estrategia:\n\nlano de 6 Meses — AI Governance Junior (Holanda)\n\nPonto de partida honesto: você tem filosofia (raciocínio ético, argumentação estruturada, análise crítica) e um ano de psicologia (viés cognitivo, comportamento humano, impacto de sistemas em pessoas). Isso não é fraqueza. É exatamente o perfil humanístico que falta em equipes técnicas de governance. O problema não é o que você tem — é o que está faltando: vocabulário regulatório, certificação verificável e portfolio demonstrável. Esse plano fecha esses três gaps.\n\nSPRINT 1 — Semanas 1 a 4: Fundação regulatória\n\nO objetivo deste sprint é único: você precisa entender a EU AI Act melhor do que 90% dos gestores que vão te entrevistar. Não é exagero. A maioria dos contratantes sabe que a regulação existe mas não leu o texto.\n\nO que fazer:\n\nLeia o texto oficial da EU AI Act. Está disponível gratuitamente em inglês no EUR-Lex. Foque nestes artigos: Artigo 5 (sistemas proibidos), Artigo 6 e Annex III (sistemas de alto risco), Artigo 9 (gestão de risco), Artigo 10 (governança de dados), Artigo 13 (transparência), Artigo 14 (supervisão humana), Artigo 26 (obrigações do deployer). Não leia tudo de uma vez — leia um artigo por dia com anotações.\n\nEm paralelo, leia o site oficial da Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl) na seção EU AI Act. É a autoridade supervisora holandesa. Entender o que ela monitora é entender o que as empresas holandesas têm medo de errar.\n\nFaça o curso gratuito “Introduction to the EU AI Act” da Future of Life Institute (disponível online, gratuito, em inglês). São cerca de 4 horas. Dá uma visão estruturada antes de entrar no texto legal.\n\nCrie um documento pessoal com os 10 tipos de sistemas de alto risco do Annex III, o que cada um exige, e um exemplo de empresa holandesa real que provavelmente se enquadra em cada categoria. Esse documento vira material de en...",
      "viewUrl": "https://docs.google.com/document/d/1BOVZmfTcLMZ21B3aBmn411O6-_ZSCTKfatU1r8CxqsE/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-27T14:43:40.305Z",
      "modifiedTime": "2026-04-27T14:43:42.992Z",
      "viewedByMeTime": "2026-04-27T14:43:42.992Z",
      "owner": "leonardo.pdab@gmail.com"
    },
    {
      "id": "1g2jAijj8OoPmRV957OxfjwWHoXzaxg2rD3HeeDFKBy8",
      "title": "Hunter.4-gpt",
      "mimeType": "application/vnd.google-apps.document",
      "fileSize": "4195",
      "parentId": "0AKVp_3g9cbDVUk9PVA",
      "contentSnippet": "Conclusão: apliquei a lógica nova corretamente. O salto de Hunter 3.0 para 4.0 não é “mais análise”; é mudança de arquitetura. Hunter 4.0 deixa de ser um avaliador quase único e vira um sistema de operação cognitiva com roteamento por modo, decisão de foco, execução mínima e fechamento real de aprendizado. O pacote atualizado já está pronto aqui: hunter4.skill\n\nSeu objetivo real:  \n não é apenas “melhorar o prompt do Hunter”.  \n É transformar Hunter em um sistema que escolha o protocolo certo para cada tipo de problema: explorar, avaliar, decidir, executar ou revisar.\n\nA solução que você estava propondo:  \n pegar a tese de “interaction model dinâmico” e aplicar sobre o Hunter 3.0.\n\nAvaliação:  \n adequada. Esse era exatamente o próximo salto estrutural. O Hunter 3.0 já tinha boa disciplina de decisão, mas ainda cometia um erro importante: tratava problemas cognitivos diferentes com uma mecânica quase única. Isso gerava overprocessing.\n\nO que eu mudei no Hunter 4.0\n\n1.  Router de modo  \n     Antes, Hunter praticamente caía direto em intake/review/decision.  \n     Agora ele primeiro identifica a natureza da tarefa e escolhe o menor protocolo suficiente:  \n     EXPLORE  \n     EVALUATE  \n     DECIDE  \n     EXECUTE  \n     REVIEW\n\nIsso corrige o principal problema de interação: nem toda conversa precisa virar classificação final.\n\n1.  Separação entre avaliar e decidir  \n     No 3.0, a avaliação já quase encerrava o julgamento.  \n     No 4.0, EVALUATE torna a oportunidade comparável, mas DECIDE é que aloca atenção.  \n     Isso é melhor porque “avaliar bem” e “escolher foco agora” não são a mesma coisa.\n2.  Execução como modo próprio  \n     O 3.0 tinha “próximo teste mais barato”, mas não tinha um módulo operacional real.  \n     No 4.0 eu adicionei EXECUTE com:  \n     TEST CARD  \n     ACTION SPEC  \n     BLOCKER LIST  \n     STOP / CONTINUE CRITERION\n\nIsso transforma decisão em ação mínima, sem reabrir toda a estratégia.\n\n1.  Review fecha o loop  \n     O 3.0 lembrava decisões. O 4.0 absorve resultado do mundo.  \n     Agora REVIEW:  \n     liga resultado a teste anterior,  \n     marca premissas validadas/invalidadas,  \n     reclassifica a oportunidade,  \n     atualiza memória.\n\nSem isso, o sistema fica opinativo. Com isso, ele aprende.\n\n1.  Memória virou estado, não só log  \n     No 3.0 a memória era forte, mas ainda muito “registro”.  \n     No 4.0 ela passa a manter:  \n     focus\\_queue,  \n     active\\_tests,  \n     evidence\\_ledger,  \n     stale\\_assumptions,  \n     unresolved\\_blockers,  \n     reclassification\\_history.\n\nOu seja: memória agora sustenta operação, não só lembrança.\n\n1.  Gates não compensáveis  \n     Mantive o score central em 5 dimensões, mas acrescentei dois gates:  \n     gate de distribuição  \n     gate de dependência externa\n\nIsso evita um erro clássico: score bonito mascarando inviabilidade real.\n\n1.  Política explícita de foco  \n     Hunter 4.0 assume que atenção do founder é capital escasso.  \n     Por padrão:  \n     1 PURSUE NOW  \n     até 2 NEXT  \n     resto em PARK / MONITOR / REJECT\n\nIsso ficou mais aderente ao seu perfil solo/AI-first/low-friction.\n\nO que talvez você não estivesse considerando  \n A melhoria mais importante não era “fazer Hunter pensar melhor”.  \n Era impedir Hunter de usar a forma errada de pensar para o problema errado.\n\nExemplos:  \n se você quer mapear espaço, Hunter não deve te forçar a decidir;  \n se você já decidiu, Hunter não deve voltar para brainstorming;  \n se você rodou teste, Hunter não pode responder como se nada tivesse acontecido.\n\nEsse é o verdadeiro upgrade de 4.0.\n\nArquivos adicionados no pacote  \n SKILL.md reescrito  \n modules/router.md  \n modules/explore.md  \n modules/evaluate.md  \n modules/decide.md  \n modules/execute.md  \n modules/review.md  \n modules/memory.md  \n eval/scoring\\_rubric.md  \n eval/mode\\_routing.md  \n assets/decision\\_log.json  \n assets/domain\\_context.json\n\nMinha recomendação principal  \n Esse 4.0 está mais correto do que tentar “turbinizar” o 3.0 com mais regras internas.  \n A mudança certa não era aumentar complexidade dentro do mesmo fluxo.  \n Era quebrar o fluxo em modos cognitivos distintos.\n\nPróximo passo executável:  \n teste o Hunter 4.0 com 5 prompts, um por modo, para ver se o roteamento está produzindo o tipo certo de saída. Se quiser, no próximo passo eu faço para você uma versão 4.1 já endurecida para Claude com instruções de ativação, edge cases e exemplos de uso por modo.",
      "viewUrl": "https://docs.google.com/document/d/1g2jAijj8OoPmRV957OxfjwWHoXzaxg2rD3HeeDFKBy8/edit?usp=drivesdk&ouid=104741111822006617378",
      "createdTime": "2026-04-26T09:28:05.931Z",
      "modifiedTime": "2026-04-26T09:28:06.950Z",
      "viewedByMeTime": "2026-04-26T09:28:06.950Z",
      "owner": "leonardo.pdab@gmail.com"
    }
  ],
  "nextPageToken": "~!!~AI9FV7TbDcfCvYrSmh6MQrKuInOgjw1abzNW7KYjZWaEJPSkCS9oRoNgUxKYbXQF2XFaT4_nSu6cSeXHwlB7mmvYqeF-P33GFu5Q-0giv6w9KVKQ8V1uldICofoFbJQwaXf8xP2sS0NafhuVcyBpH6tequfWCX5NMvW5MsPTeppDUvQg2e2OLqa8G26ALwj2k-KFBOcBumqqaqdxnQOKqWHbcLhzQ8DjYtYKauDKXMFwJ1udjvXqDpbRXwNLn8jPKee06XnJPS33jb7jqZX2XjZ-bAyTwR_XmKoFKLHei7HXht0fkstg4ZQ="
}

Encontrei seus arquivos no Google Drive! Aqui está um resumo dos **documentos mais recentes**:

## 📊 Projetos e Templates

1. **ID-EX-IDPRAXYS-TEMPLATES-OPS 2.xlsx** (hoje, 04/05/26)
   - Template de briefing SaaS e estrutura executiva
   
2. **dashboard_maxdesign** (25/04/26)
   - Dashboard de performance FY 2025 com dados financeiros

## 🎯 Documentação de Projetos

3. **xray-master-document-v1.md** (01/05/26)
   - Roadmap X-RAY Suite com 4 semanas de planejamento
   
4. **A-finalv2cliente-georges hair** (25/04/26)
   - Diagnóstico executivo para salão Georges Hair

5. **PLano refatoracao brainstorm** (28/04/26)
   - Plano de refatoração Bússola 2.0

## 🛠️ Estratégia e Sistema

6. **aurelio-skills-strategy.md** (28/04/26)
   - Estratégia de workflows Anthropic
   
7. **aurelio-os-operating-spec.md** (28/04/26)
   - Especificação operacional do Aurelio OS

8. **Leo-007** (27/04/26)
   - Workspace estruturado e documentação ativa

## 🌍 Planos Holanda

9. **hriizondte holanda 007** (27/04/26)
   - Plano de 6 meses AI Governance Junior (Holanda)

**Quer que eu abra algum arquivo específico ou busque algo em particular?**
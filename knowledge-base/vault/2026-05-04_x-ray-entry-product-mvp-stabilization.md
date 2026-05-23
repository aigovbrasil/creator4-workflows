---
title: "X-Ray entry product MVP stabilization"
date: 2026-05-04
account: leonardo.pdab@gmail.com
uuid: 99d7821d-52c1-4dce-9445-e81d3b69d97c
messages: 2
tags: []
context: ""
---

**Você** _2026-05-04_

Run

---

**Claude** _2026-05-04_

# PLANO MVP DATA-DRIVEN — X-RAY ENTRY PRODUCT

**Projeto:** X-Ray Business / X-Ray Entry Product  
**Fase:** MVP Stabilization → Entry Product Packaging  
**Data:** 2026-05-04  
**Status:** Normalização completa + 3 caminhos + preparação para Linear

---

## 1. CONTEXTO NORMALIZADO

### FATOS CONFIRMADOS

```yaml
fatos_confirmados:
  produto_atual:
    - existe um MVP em desenvolvimento
    - formato: e-book 3 páginas + artifact JSX + ZIP skills + prompts
    - 34 skills foram reorganizadas em 10 suites X-RAY
    - skills foram renomeadas com prefixo xray-
    - existe estrutura de Design Language Codex
    - existe Executive Office como referência funcional
    
  contexto_operacional:
    - operação solo
    - desenvolvimento MVP-first (chegou no produto antes de discovery formal)
    - ambiente principal: Claude Code
    - ferramentas disponíveis: Claude.ai, Linear, Notion
    - conectores MCP: Google Calendar, Gmail, Notion, Figma, Slack, Linear, Google Drive
    
  narrativa_comercial:
    - tese central: "prompt solto é insuficiente para trabalho profissional"
    - transformação prometida: de prompts soltos para sistema personalizado
    - posicionamento: co-pilot para consultores, não automação total
    
  contexto_técnico:
    - Claude como plataforma-alvo
    - skills como unidade de customização
    - Projects como unidade de organização
    - commands como interface de ação
```

### HIPÓTESES (não validadas)

```yaml
hipoteses:
  icp:
    H01: "Consultores de negócios que usam Claude mas não são advanced users pagarão por setup guiado"
    H02: "Público inicial tem entre 1-5 anos de experiência em consultoria"
    H03: "Usuários sentem dor real com desorganização de prompts"
    H04: "Consultores solo/pequenas boutiques são mais receptivos que grandes empresas"
    
  produto:
    H05: "E-book de 3 páginas + artifact + skills é percebido como oferta completa"
    H06: "Formato digital via Hotmart é aceito por este público"
    H07: "Usuários conseguirão instalar skills sozinhos com guia"
    H08: "Onboarding interativo reduz fricção de adoção"
    
  precificacao:
    H09: "Faixa de preço entre R$97-297 é aceitável para este público"
    H10: "Produto de entrada gera interesse em suite completa depois"
    
  canal:
    H11: "Hotmart é canal adequado para este tipo de produto"
    H12: "Público busca soluções em marketplaces de infoprodutos"
    H13: "Orgânico via LinkedIn pode gerar primeiras vendas"
    
  conversao:
    H14: "Narrativa 'prompt solto é ultrapassado' gera urgência"
    H15: "Demonstração before/after aumenta percepção de valor"
    H16: "Garantia/teste reduz objeção de compra"
```

### DECISÕES TOMADAS

```yaml
decisoes:
  DEC-001:
    decisao: "Produto de entrada será e-book + artifact + ZIP skills"
    rationale: "Formato empacotável, entregável via Hotmart, tangível"
    
  DEC-002:
    decisao: "Claude AI como sistema-alvo"
    rationale: "Público já usa ou quer usar Claude profissionalmente"
    
  DEC-003:
    decisao: "ICP inicial = consultores não-advanced users"
    rationale: "Dor está na ausência de método/sistema, não em features técnicas"
    
  DEC-004:
    decisao: "Suite mínima = 3 skills + orchestrator"
    rationale: "Entrega tangível além do e-book, prova de conceito prática"
    
  DEC-005:
    decisao: "Narrativa = prompt solto é insuficiente"
    rationale: "Cria contraste claro entre uso informal e sistema profissional"
    
  DEC-006:
    decisao: "Sprint 48h via Claude Code"
    rationale: "Ambiente permite ler codebase, editar arquivos e rodar comandos"
    
  DEC-007:
    decisao: "Não voltar para discovery inicial"
    rationale: "MVP existe, fase atual é empacotamento e validação"
```

### DÚVIDAS E GAPS

```yaml
gaps_de_dados:
  GAP-001: "Preço inicial não definido - sem pesquisa de sensibilidade"
  GAP-002: "Hotmart como canal é hipótese não testada"
  GAP-003: "Áudios do briefing ainda não transcritos"
  GAP-004: "Demanda real não validada - zero conversas com ICP"
  GAP-005: "Concorrência não mapeada"
  GAP-006: "Alternativas do público não identificadas"
  GAP-007: "Objeções reais não coletadas"
  GAP-008: "Formato de entrega do artifact não definido (link/HTML/JSX)"
  GAP-009: "Termos 'worker creator'/'cmd switch' ambíguos nas skills"
  GAP-010: "Não há baseline de quanto tempo usuário leva para configurar Claude manualmente"
```

### RISCOS

```yaml
riscos:
  RISCO-001:
    risco: "Público não percebe valor suficiente no pacote"
    impacto: "Alto - produto não vende"
    probabilidade: "Média"
    mitigacao: "Testar percepção com 5-10 consultores antes de lançar"
    
  RISCO-002:
    risco: "Instalação de skills é muito complexa para usuário médio"
    impacto: "Alto - frustração pós-compra, pedidos de reembolso"
    probabilidade: "Média-alta"
    mitigacao: "Criar guia visual passo-a-passo, oferecer suporte nos primeiros 7 dias"
    
  RISCO-003:
    risco: "Hotmart rejeita produto ou categoria não se encaixa"
    impacto: "Alto - precisa mudar canal"
    probabilidade: "Baixa-média"
    mitigacao: "Verificar requisitos Hotmart antes de criar conteúdo final"
    
  RISCO-004:
    risco: "Público não entende diferença entre prompt/command/skill/Project"
    impacto: "Médio - confusão conceitual, baixa adoção"
    probabilidade: "Alta"
    mitigacao: "E-book e artifact precisam ser muito didáticos, progressivos"
    
  RISCO-005:
    risco: "Preço muito alto para produto de entrada"
    impacto: "Alto - zero vendas"
    probabilidade: "Média"
    mitigacao: "Testar 3 faixas de preço com micro-lançamentos"
    
  RISCO-006:
    risco: "Produto percebido como 'só mais um pacote de prompts'"
    impacto: "Alto - não diferenciação"
    probabilidade: "Média-alta"
    mitigacao: "Enfatizar sistema/método, skills instaláveis, personalização profunda"
```

### OPORTUNIDADES

```yaml
oportunidades:
  OPP-001: "Mercado de consultores crescendo, IA como diferencial competitivo"
  OPP-002: "Claude ganhando tração em BR, mas pouco conteúdo BR sobre uso profissional"
  OPP-003: "Skills Claude ainda são conceito novo - oportunidade educacional"
  OPP-004: "Produto de entrada pode gerar pipeline para X-Ray Suite completa"
  OPP-005: "Artifact interativo pode viralizar como demo standalone"
  OPP-006: "LinkedIn como canal orgânico de alto ROI para consultores"
```

---

## 2. PLANO MVP PADRÃO

```yaml
mvp_plan:
  problema:
    descricao: "Consultores usam Claude com prompts soltos, sem sistema, metadados profissionais, comandos estruturados ou skills — resultando em baixa eficiência, falta de padronização e retrabalho constante"
    evidencia_atual: "Observação própria + textos do briefing"
    evidencia_necessaria: "Conversas com 10-15 consultores validando a dor"
    
  publico_alvo:
    primario: "Consultores de negócios solo ou pequenas boutiques"
    secundario: "Freelancers de estratégia/gestão que usam IA"
    anti_persona: "Desenvolvedores técnicos, advanced users de Claude, grandes consultorias enterprise"
    
  icp_inicial:
    perfil:
      - experiencia_consultoria: "1-5 anos"
      - usa_claude: "sim, mas informalmente"
      - maturidade_ia: "intermediária baixa"
      - dores: "desorganização, falta de sistema, retrabalho, sem padrão"
      - desejo: "eficiência, padronização, credibilidade profissional"
      - comportamento: "usa prompts soltos, não salva, não entende skills"
    tamanho_mercado_hipotese: "10.000-50.000 consultores BR potenciais"
    
  dor_principal:
    dor: "Trabalho com Claude parece produtivo, mas não é sistemático nem escalável"
    sintomas:
      - "Repete prompts similares várias vezes"
      - "Perde contexto entre conversas"
      - "Não consegue padronizar entregáveis"
      - "Não aproveita todo potencial da ferramenta"
      - "Sente que poderia ser mais eficiente"
    consequencias:
      - "Mais horas de trabalho para mesmo resultado"
      - "Qualidade inconsistente"
      - "Dificuldade em escalar operação"
      
  proposta_de_valor:
    transformacao: "De prompts soltos para sistema profissional personalizado"
    beneficios:
      - "Claude configurado com metadados profissionais"
      - "Estilo de resposta padronizado"
      - "Skills instaladas e operacionais"
      - "Prompts organizados e reutilizáveis"
      - "Primeiro workflow consultivo funcionando"
      - "Redução de 30-50% no tempo de setup/retrabalho" (hipótese)
    
  promessa:
    headline: "Transforme Claude de ferramenta de prompts soltos em sistema de trabalho personalizado"
    subheadline: "Configure sua conta Claude como co-pilot consultivo profissional em 5 passos práticos"
    
  produto_minimo:
    componentes:
      - nome: "E-book PDF 3 páginas"
        funcao: "Explicar conceito, apresentar método, gerar compreensão rápida"
        
      - nome: "Artifact interativo JSX"
        funcao: "Guiar onboarding, permitir copy/paste de prompts, reduzir fricção"
        
      - nome: "ZIP com 4 skills"
        funcao: "Entregar tangível instalável (orchestrator + 3 skills práticas)"
        
      - nome: "Biblioteca de prompts"
        funcao: "Prompts copy/paste para personalização sem criar do zero"
        
      - nome: "Guia de instalação"
        funcao: "Reduzir fricção técnica, aumentar taxa de sucesso pós-compra"
        
  entregaveis:
    formato_entrega: "Download imediato via Hotmart"
    pacote:
      - "xray-entry-product.pdf (e-book)"
      - "xray-interactive-playbook.html (artifact)"
      - "xray-skills-entry.zip (4 skills)"
      - "xray-prompts-library.md (prompts)"
      - "xray-install-guide.pdf (guia)"
      
  canal_inicial:
    primario: "Hotmart"
    razao: "Infraestrutura de pagamento, entrega digital, marketplace BR"
    alternativas: "Gumroad, Lemon Squeezy, site próprio + Stripe"
    validacao_necessaria: "Confirmar requisitos Hotmart, categorias, compliance"
    
  preco_hipotese:
    faixas_teste:
      - tier: "Low ticket"
        valor: "R$ 97"
        posicionamento: "Produto de entrada acessível"
        
      - tier: "Mid ticket"
        valor: "R$ 197"
        posicionamento: "Investimento em produtividade profissional"
        
      - tier: "Premium entry"
        valor: "R$ 297"
        posicionamento: "Setup profissional completo"
        
    recomendacao_inicial: "R$ 197 (testar primeiro, ajustar depois)"
    
  alternativas_de_oferta:
    oferta_1: "Produto único + garantia 7 dias"
    oferta_2: "Produto + 30 dias suporte via Slack community"
    oferta_3: "Produto + 1 sessão consultoria ao vivo (30min) para setup assistido"
    
  riscos_priorizados:
    - "Produto não vende (RISCO-001)"
    - "Instalação muito complexa (RISCO-002)"
    - "Hotmart rejeita (RISCO-003)"
    - "Percepção de 'só mais prompts' (RISCO-006)"
    
  criterios_de_sucesso:
    fase_validacao:
      - "10 conversas com ICP confirmando dor"
      - "5 pessoas dispostas a pagar para resolver dor"
      - "Página de pré-venda com 20%+ taxa de interesse"
      
    fase_lancamento_controlado:
      - "50 visitas na página"
      - "10% conversão (5 vendas)"
      - "NPS ≥ 8 dos compradores"
      - "Taxa de instalação skills ≥ 70%"
      - "Zero pedidos reembolso por falha técnica"
      
    fase_escala:
      - "100 vendas em 30 dias"
      - "CAC < R$ 100"
      - "LTV > R$ 500 (considerando upsells futuros)"
      
  metricas:
    pre_lancamento:
      - "Conversas ICP realizadas"
      - "Taxa de validação da dor"
      - "Disposição a pagar (escala 1-10)"
      
    lancamento:
      - "Visitas página"
      - "Taxa conversão"
      - "Ticket médio"
      - "Taxa instalação skills"
      - "NPS"
      - "Reembolsos"
      - "Suporte demandado"
      
    pos_lancamento:
      - "Tempo médio para setup completo"
      - "Taxa de uso skills após 7 dias"
      - "Taxa de uso skills após 30 dias"
      - "Feedback qualitativo"
      - "Indicações orgânicas"
      
  proximos_experimentos:
    experimento_1:
      nome: "Validação ICP + Dor"
      objetivo: "Confirmar que consultores sentem dor e pagariam para resolver"
      metodo: "10-15 conversas qualitativas"
      tempo: "3-5 dias"
      
    experimento_2:
      nome: "Teste de headline + proposta"
      objetivo: "Validar mensagem comercial ressoa"
      metodo: "Post LinkedIn + landing page teste"
      tempo: "48h"
      
    experimento_3:
      nome: "Teste de preço"
      objetivo: "Encontrar faixa ótima entre disposição a pagar e volume"
      metodo: "3 landing pages com preços diferentes"
      tempo: "5-7 dias"
```

---

## 3. MATRIZ DE HIPÓTESES COM PESOS
| ID | Hipótese | Tipo | Variável isolada | Evidência necessária | Impacto | Confiança | Facilidade | Risco | Score | Como validar |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|
| H01 | Consultores não-advanced users pagarão por setup guiado | ICP | Disposição a pagar | 10-15 conversas qualitativas | 5 | 2 | 4 | 5 | 16.0 | Conversas diretas, pergunta: "pagaria R$ 197 para resolver isso?" |
| H03 | Usuários sentem dor real com desorganização | Dor | Intensidade da dor | Conversas + observação comportamento | 5 | 3 | 5 | 4 | 18.8 | Conversas: "como você organiza prompts hoje?" "quanto tempo perde?" |
| H05 | E-book+artifact+skills = oferta completa | Produto | Percepção de valor | Feedback sobre mock da oferta | 5 | 2 | 4 | 4 | 20.0 | Mostrar mock, perguntar: "isso resolve seu problema?" |
| H09 | R$ 97-297 é faixa aceitável | Preço | Sensibilidade a preço | Teste Van Westendorp ou teste A/B | 5 | 1 | 3 | 5 | 15.0 | Landing pages com 3 preços, medir cliques/conversão |
| H14 | Narrativa 'prompt solto ultrapassado' gera urgência | Proposta | Efetividade da mensagem | Teste headline em post/ad | 4 | 2 | 5 | 3 | 26.7 | Post LinkedIn com narrativa, medir engajamento/comentários |
| H11 | Hotmart é canal adequado | Canal | Adequação canal-público | Pesquisa onde ICP compra produtos similares | 4 | 2 | 4 | 4 | 16.0 | Perguntar: "onde você compraria produto assim?" + pesquisar concorrentes |
| H07 | Usuários instalarão skills sozinhos | Produto | Fricção técnica | Teste usabilidade com 3-5 pessoas | 4 | 2 | 3 | 5 | 9.6 | Dar guia beta, observar instalação, medir taxa sucesso |
| H02 | ICP tem 1-5 anos experiência | ICP | Perfil demográfico | Conversas + LinkedIn profile scraping | 3 | 2 | 4 | 3 | 16.0 | Analisar perfis LinkedIn de consultores interessados |
| H06 | Formato digital via Hotmart aceito | Canal | Aceitação formato | Conversas + benchmarks | 4 | 3 | 3 | 3 | 12.0 | Perguntar: "já comprou infoproduto?" "tem objeção?" |
| H08 | Onboarding interativo reduz fricção | Produto | Efetividade UX | Teste A/B: com vs sem artifact | 3 | 3 | 2 | 3 | 6.0 | Medir tempo setup e taxa conclusão com/sem artifact |
| H10 | Produto entrada → interesse suite | Estratégia | Upsell potential | Pesquisar após compra: "compraria versão avançada?" | 4 | 2 | 2 | 2 | 16.0 | Survey NPS + pergunta de upgrade 30 dias pós-compra |
| H12 | Público busca em marketplaces | Canal | Comportamento busca | Google Trends + pesquisa termos | 3 | 2 | 4 | 3 | 16.0 | Analisar volume busca "claude prompts", "ia para consultoria" |
| H13 | Orgânico LinkedIn gera vendas | Canal | Efetividade orgânica | Post teste + tracking | 3 | 3 | 5 | 2 | 15.0 | Post com CTA para landing, medir CTR e conversão |
| H15 | Before/after aumenta percepção | Proposta | Efetividade demonstração | Teste landing com/sem demo | 3 | 3 | 3 | 2 | 9.0 | A/B test: landing com vs sem before/after |
| H04 | Solo/boutiques mais receptivos | ICP | Segmento ideal | Conversas segmentadas | 3 | 2 | 3 | 3 | 12.0 | Filtrar conversas: solo vs empresa, medir interesse |
| H16 | Garantia reduz objeção | Oferta | Impacto garantia | Teste com/sem garantia | 2 | 3 | 3 | 2 | 6.0 | A/B test: oferta com vs sem garantia 7 dias |

**Critérios de pontuação:**
- **Impacto** (1-5): Crítico para sucesso = 5, Nice to have = 1
- **Confiança** (1-5): Muito confiante = 5, Nenhuma evidência = 1
- **Facilidade** (1-5): Muito fácil testar = 5, Muito difícil = 1
- **Risco** (1-5): Catastrófico se errado = 5, Baixo impacto = 1
- **Score** = (Impacto × (6 - Confiança) × Facilidade) / Risco

**TOP 5 PRIORIDADES DE VALIDAÇÃO:**
1. **H14** (Score 26.7): Testar narrativa em post LinkedIn
2. **H05** (Score 20.0): Validar percepção de completude da oferta
3. **H03** (Score 18.8): Confirmar dor com desorganização
4. **H01** (Score 16.0): Validar disposição a pagar
5. **H11/H02/H10/H12** (Score 16.0): Cluster de validações ICP/Canal

---

## 4. PLANO DE PESQUISA INICIAL

```yaml
research_plan:
  objetivo: "Reduzir incerteza sobre ICP, dor, preço, canal e concorrência antes de construir produto final"
  
  perguntas_de_pesquisa:
    sobre_icp:
      - "Quem são os consultores que usam IA no Brasil?"
      - "Quantos consultores solo/pequenas boutiques existem?"
      - "Qual o perfil demográfico (idade, experiência, área)?"
      - "Quais ferramentas IA eles já usam?"
      
    sobre_dor:
      - "Como consultores organizam prompts atualmente?"
      - "Quanto tempo estimam perder com retrabalho?"
      - "Quais frustrações principais com uso de IA?"
      - "Já tentaram resolver isso? Como?"
      
    sobre_alternativas:
      - "Que produtos similares existem?"
      - "Quanto custam?"
      - "Como são entregues?"
      - "Que avaliações têm?"
      - "O que falta neles?"
      
    sobre_canal:
      - "Onde consultores compram cursos/produtos digitais?"
      - "Hotmart é conhecido/confiável para este público?"
      - "Há preferência por outro marketplace?"
      
    sobre_preco:
      - "Quanto consultores pagam por produtividade?"
      - "Qual faixa é 'caro demais' vs 'barato demais'?"
      - "Qual ROI esperado para justificar compra?"
      
  queries_recomendadas:
    google:
      - "consultoria brasil mercado tamanho 2024"
      - "consultores independentes brasil quantos"
      - "Claude AI empresas brasil"
      - "prompts para consultoria"
      - "ChatGPT para consultores"
      - "produtividade IA consultoria"
      - "cursos Claude português"
      - "Hotmart produtos IA"
      
    linkedin:
      - "consultor independente + IA"
      - "consultoria estratégica + Claude"
      - "produtividade consultoria"
      
    redes_sociais:
      - Hashtags: #consultoria #produtividade #ia #claude
      - Grupos: consultores BR, IA Brasil, produtividade
      
  dados_a_coletar:
    quantitativos:
      - "Tamanho mercado consultoria BR"
      - "Volume busca termos-chave"
      - "Preços produtos similares"
      - "Avaliações produtos similares"
      
    qualitativos:
      - "Dores mencionadas em fóruns/grupos"
      - "Objeções em comentários de produtos existentes"
      - "Termos usados pelo público (linguagem nativa)"
      - "Gatilhos emocionais identificados"
      
  fontes_recomendadas:
    primarias:
      - "10-15 conversas diretas com consultores"
      - "Survey online (50-100 respostas)"
      
    secundarias:
      - "Google Trends"
      - "LinkedIn posts/comentários"
      - "Grupos Facebook/WhatsApp consultoria"
      - "Reviews produtos Hotmart categoria produtividade/IA"
      - "YouTube vídeos sobre Claude/produtividade"
      
  benchmarks:
    concorrentes_diretos:
      buscar:
        - "Cursos Claude português"
        - "Prompts para consultoria"
        - "Skills Claude marketplace"
        - "Setup Claude empresas"
        
    concorrentes_indiretos:
      buscar:
        - "ChatGPT para profissionais"
        - "IA produtividade"
        - "Automação consultoria"
        - "Templates prompts"
        
    analise_benchmark:
      coletar:
        - Preço
        - Formato (curso/e-book/software)
        - Número de avaliações
        - Rating médio
        - Principais elogios
        - Principais reclamações
        - Diferenciais prometidos
        - Garantias oferecidas
        
  sinais_de_demanda:
    positivos:
      - "Posts consultores pedindo 'como usar IA melhor'"
      - "Grupos ativos sobre produtividade/IA"
      - "Volume busca crescente termos relacionados"
      - "Comentários 'eu pagaria por isso'"
      - "Concorrentes vendendo produtos similares"
      
    negativos:
      - "Mercado saturado com soluções gratuitas"
      - "Comentários 'não preciso, uso o grátis'"
      - "Produtos similares com má avaliação/baixas vendas"
      - "Discussões sobre 'IA é moda passageira'"
      
  sinais_de_risco:
    atencao:
      - "Concorrentes com preços muito abaixo"
      - "Soluções gratuitas muito completas"
      - "Público cetico sobre IA"
      - "Baixo engajamento em posts sobre o tema"
      - "Hotmart dificulta categoria/aprovação"
      
  cronograma_pesquisa:
    dia_1:
      - "Buscar benchmarks Hotmart/Gumroad"
      - "Google Trends termos-chave"
      - "Mapear 5-10 produtos similares"
      
    dia_2:
      - "Analisar reviews produtos similares"
      - "Mapear grupos LinkedIn/Facebook"
      - "Identificar 10 consultores para conversar"
      
    dia_3-5:
      - "Realizar 10 conversas ICP"
      - "Criar survey online"
      - "Postar em 3-5 grupos para feedback"
      
    dia_6:
      - "Consolidar dados"
      - "Atualizar hipóteses"
      - "Decidir próximo passo"
```

### QUERIES EXATAS PARA WEB SEARCH

Se você executar web search, use exatamente estas queries (em ordem):

```
1. "mercado consultoria brasil 2024 tamanho"
2. "consultores independentes brasil quantidade"
3. "Claude AI adoção empresas brasil"
4. "hotmart produtos ia artificial intelligence"
5. "cursos prompts português chatgpt claude"
6. site:hotmart.com "produtividade" "inteligência artificial"
7. site:linkedin.com "consultor" "Claude AI" "brasil"
8. "setup Claude empresas guia português"
9. "skills Claude tutorial"
10. "quanto cobra consultor brasil hora 2024"
```

---

## 5. TRÊS CAMINHOS POSSÍVEIS

### CAMINHO 1: PRODUTO DIGITAL HOTMART (RECOMENDADO)

```yaml
caminho_1_hotmart:
  nome: "Produto Digital Entry via Hotmart"
  
  descricao: "Criar produto de entrada completo (e-book + artifact + skills + prompts) e vender via Hotmart com preço R$ 197, garantia 7 dias, suporte básico"
  
  promessa: "Configure Claude como sistema profissional em 5 passos práticos — setup completo em menos de 2 horas"
  
  publico: "Consultores solo/boutiques que já usam Claude mas sentem desorganização"
  
  oferta:
    produto: "X-Ray Claude Setup — Sistema Profissional"
    preco_inicial: "R$ 197"
    garantia: "7 dias incondicional"
    entrega: "Download imediato"
    suporte: "FAQ + e-mail 48h response time"
    bonus: "Acesso comunidade Slack (opcional)"
    
  canal:
    primario: "Hotmart"
    secundarios:
      - "LinkedIn orgânico"
      - "Grupos consultoria Facebook/WhatsApp"
      
  vantagens:
    - "Infraestrutura pagamento/entrega pronta"
    - "Marketplace com tráfego existente"
    - "Credibilidade Hotmart no mercado BR"
    - "Afiliados futuros possíveis"
    - "Escalável sem overhead operacional"
    
  riscos:
    - "Hotmart pode rejeitar categoria/produto"
    - "Comissão 9.9% + taxas"
    - "Produto fica 'preso' ao marketplace"
    - "Controle limitado sobre experiência cliente"
    
  dados_necessarios:
    pre_lancamento:
      - "Confirmar requisitos Hotmart"
      - "Testar headline com 50-100 consultores"
      - "Validar percepção valor oferta"
      - "5+ conversas confirmando disposição pagar R$ 197"
      
    pos_lancamento:
      - "Taxa conversão página"
      - "Taxa instalação skills"
      - "NPS primeiros 20 clientes"
      - "Objeções/dúvidas recorrentes"
      
  primeiro_experimento:
    nome: "Landing page pré-venda Hotmart"
    objetivo: "Medir interesse real antes de construir produto final"
    metodo: "Criar página produto Hotmart draft, traffic via LinkedIn post, medir cliques/'tenho interesse'"
    tempo: "48h"
    investimento: "R$ 0 (orgânico)"
    criterio_sucesso: "10%+ cliques demonstram interesse"
    
  quando_escolher:
    - "Quer validar comercialmente rápido"
    - "Prefere infraestrutura pronta"
    - "Não quer gerenciar pagamentos/entrega"
    - "Quer testar mercado antes investir pesado"
    - "Aceita trocar margem por velocidade"
```

### CAMINHO 2: PILOTO CONSULTIVO GUIADO

```yaml
caminho_2_piloto:
  nome: "Piloto Consultivo Guiado 1-on-1"
  
  descricao: "Oferecer setup personalizado ao vivo para 5-10 consultores via sessões 1-on-1, cobrar R$ 497-997, aprender intensamente, depois empacotar produto escalável"
  
  promessa: "Setup completo do Claude personalizado para SEU negócio — sessão ao vivo + follow-up 30 dias"
  
  publico: "Consultores com faturamento ≥ R$ 10k/mês, dispostos a pagar por personalização"
  
  oferta:
    produto: "X-Ray Claude Setup — Sessão 1-on-1 Personalizada"
    preco_inicial: "R$ 697"
    formato: "2h sessão ao vivo + 30 dias suporte"
    entrega: "Zoom + acompanhamento Slack/WhatsApp"
    limite: "10 vagas apenas"
    bonus: "Acesso early à X-Ray Suite completa"
    
  canal:
    primario: "Outreach direto LinkedIn"
    secundarios:
      - "Indicações rede pessoal"
      - "Post LinkedIn 'buscando 10 pioneiros'"
      
  vantagens:
    - "Aprendizado profundo sobre ICP/dores"
    - "Feedback qualitativo rico"
    - "Valida disposição pagar alto ticket"
    - "Gera casos de sucesso/testimonials"
    - "Refina produto antes escalar"
    - "Revenue imediato (R$ 5-10k)"
    
  riscos:
    - "Não escalável (tempo 1-on-1)"
    - "Pode não validar produto self-service"
    - "Exige tempo intenso do fundador"
    - "Público diferente do produto final"
    
  dados_necessarios:
    pre_lancamento:
      - "Identificar 20-30 consultores qualificados"
      - "Confirmar disponibilidade pagarR$ 697+"
      - "Agendar 3-5 discovery calls"
      
    durante_piloto:
      - "Gravar sessões setup (com permissão)"
      - "Documentar dúvidas/obstáculos"
      - "Medir tempo real para setup"
      - "Coletar feedback contínuo"
      
    pos_piloto:
      - "Taxa satisfação"
      - "ROI percebido"
      - "Disposição recomendar"
      - "Padrões comuns entre casos"
      
  primeiro_experimento:
    nome: "Outreach 20 consultores LinkedIn"
    objetivo: "Agendar 3-5 discovery calls, fechar 2-3 pilotos"
    metodo: "Mensagem direta LinkedIn: 'testando método setup Claude, buscando 3 pioneiros, sessão R$ 697'"
    tempo: "3-5 dias"
    investimento: "R$ 0"
    criterio_sucesso: "≥ 2 pagamentos confirmados"
    
  quando_escolher:
    - "Quer aprender intensamente antes escalar"
    - "Valoriza qualidade sobre quantidade"
    - "Tem tempo para 1-on-1"
    - "Quer gerar casos de sucesso primeiro"
    - "Prefere validar alto ticket antes
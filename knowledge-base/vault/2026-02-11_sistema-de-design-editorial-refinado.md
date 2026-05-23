---
title: "Sistema de design editorial refinado"
date: 2026-02-11
account: contatotdahadulto@gmail.com
uuid: 94e21233-1c35-4651-a690-4705b3dab733
messages: 4
tags: []
context: ""
---

**Você** _2026-02-11_

Design Editorial Claude - Sistema de Design Completo
Contexto e Propósito
Crie [post/infográfico/interface] no estilo editorial refinado do Claude, focado em clareza, legibilidade e sofisticação minimalista.
Direção Estética: Editorial Refinado
	∙	Tom: Minimalismo editorial sofisticado, confiança intelectual, clareza informacional
	∙	Diferencial memorável: Tipografia generosa + ilustrações handmade orgânicas + espaço em branco abundante
	∙	Inspiração: Revistas de design modernas, publicações de tecnologia premium
🎯 REGRA DE OURO: VISUALIZAÇÃO OBRIGATÓRIA
CRÍTICO - DUAS CAMADAS DE VISUALIZAÇÃO:
1. CONCEITOS ABSTRATOS → ILUSTRAÇÃO SVG DO MECANISMO
Todo conceito, processo ou déficit abstrato DEVE ter ilustração SVG handmade que MOSTRE visualmente como funciona:

EXEMPLOS DE VISUALIZAÇÃO DE CONCEITOS:

❌ SÓ TEXTO: "Inibição de Resposta - Dificuldade de frear impulsos"

✅ COM ILUSTRAÇÃO:
<svg class="concept-visual">
  <!-- Cérebro com seta de impulso sendo bloqueada (ou não) -->
  <!-- Sinal de STOP com linha tracejada/falha -->
  <!-- Fluxo impulso → barreira → resposta -->
</svg>

Outros exemplos:
- "Memória de Trabalho" → Cérebro com arquivo temporário/RAM
- "Autorregulação Emocional" → Volume/intensidade sendo ajustado
- "Planejamento" → Escada de passos sequenciais
- "Automotivação" → Motor interno vs externo
- "Atenção" → Foco com distrações ao redor


Princípio: Se você não consegue DESENHAR o conceito, o usuário não conseguirá ENTENDÊ-LO visualmente.
2. DADOS NUMÉRICOS → GRÁFICOS/BARRAS/INDICADORES
Toda informação numérica, estatística ou porcentagem DEVE ter elemento gráfico quantitativo:

✅ SEMPRE visualizar:
- Porcentagens → Barras horizontais, círculos preenchidos
- Comparações → Barras lado a lado
- Progressão → Linha do tempo
- Rankings → Elementos com peso visual proporcional
- Estatísticas → Mini gráficos inline


Biblioteca de Ícones Conceituais Handmade
Crie SVGs orgânicos (stroke-width: 2.5-3px) para representar:

<!-- INIBIÇÃO -->
Impulso → [X] → Resposta (barreira quebrada/falha)

<!-- MEMÓRIA DE TRABALHO -->
Cérebro com "arquivos temporários" flutuando

<!-- REGULAÇÃO EMOCIONAL -->
Ondas emocionais sendo estabilizadas/amplificadas

<!-- PLANEJAMENTO -->
Sequência de passos/blocos conectados

<!-- ATENÇÃO -->
Foco central com elementos distratores ao redor

<!-- MOTIVAÇÃO -->
Motor/engrenagem ativada/desativada

<!-- PROCESSAMENTO -->
Informação entrando → processamento → saída


Estilo visual:
	∙	Traços irregulares e orgânicos
	∙	Linhas tracejadas para “falha/déficit”
	∙	Setas curvas para fluxos
	∙	Formas simples mas expressivas
	∙	Monocromático ou 2 cores max
Sistema Tipográfico

NUNCA usar: Inter, Roboto, Arial, system fonts genéricos

USAR FONTES DISTINTIVAS:
- Display/Títulos: 
  * Crimson Pro, Crimson Text (serif elegante)
  * EB Garamond, Lora (alternativas refinadas)
  * Tamanho: 48-72px, peso 700-800
  
- Corpo/UI:
  * IBM Plex Sans, DM Sans (sans humanista)
  * Tamanho: 16-18px, line-height 1.6-1.8
  * Peso: 400 (regular), 500 (médio para ênfase)

Hierarquia clara: título massivo → subtítulo respirando → corpo espaçado


Sistema de Cores (CSS Variables)
Light Mode:

--bg-primary: #FAF9F7;
--bg-secondary: #F5F3EF;
--accent-primary: #7A8B72;    /* Verde sage */
--accent-soft: #C4B5A0;       /* Terracota suave */
--text-primary: #1A1A1A;
--text-secondary: #666666;
--border: rgba(0,0,0,0.08);


Dark Mode:

--bg-primary: #1A1A1A;
--bg-secondary: #242424;
--accent-primary: #E07856;    /* Coral Claude */
--accent-soft: #7A8B72;       /* Verde escurecido */
--text-primary: #E8E8E8;
--text-secondary: #A8A8A8;
--border: rgba(255,255,255,0.1);


Composição Espacial

Layout assimétrico refinado:
- Margens: 60-80px (desktop), 24-32px (mobile)
- Padding interno: 48-64px
- Gap entre seções: 40-56px
- Ícone conceitual: 120-180px largura
- Gráficos de dados: 100-200px largura
- Máximo width conteúdo: 640-720px
- Espaço em branco: mínimo 40% da tela


REGRAS CRÍTICAS
✅ FAZER:
	∙	Usar fontes distintivas (Crimson, IBM Plex, DM Sans)
	∙	Criar ILUSTRAÇÃO SVG para cada conceito abstrato
	∙	Criar GRÁFICO para cada dado numérico
	∙	SVG handmade com imperfeições orgânicas
	∙	Paleta coesa com CSS variables
	∙	Generoso espaço em branco
	∙	Animações orquestradas
	∙	Arquivo único autocontido
❌ NUNCA:
	∙	Inter, Roboto, Arial, system-ui
	∙	Ícones de bibliotecas (Lucide, FontAwesome)
	∙	Conceitos SEM ilustração visual
	∙	Números SEM gráfico
	∙	Imagens externas ou stock photos
	∙	Bibliotecas de gráficos (Chart.js, D3)
	∙	Gradientes genéricos roxo-azul
Estrutura HTML Base

<div class="function-card">
  <!-- Ilustração do CONCEITO -->
  <div class="concept-illustration">
    <svg><!-- Como funciona a inibição --></svg>
  </div>
  
  <h3>Inibição de Resposta</h3>
  
  <!-- Visualização do DADO -->
  <div class="stat-visual">
    <div class="bar-mini" style="--width: 72%"></div>
    <span>72%</span>
  </div>
  
  <p class="deficit">Dificuldade de frear impulsos</p>
  <p class="example">Interromper pessoas, comprar por impulso</p>
</div>


Checklist antes de finalizar:
	∙	Cada conceito tem ilustração SVG do mecanismo?
	∙	Cada porcentagem tem barra/gráfico?
	∙	Ilustrações são handmade (não bibliotecas)?
	∙	SVGs têm traços orgânicos/imperfeitos?
	∙	Fontes são Crimson Pro + IBM Plex Sans?
	∙	Cores seguem CSS variables?
	∙	Animações estão orquestradas?
	∙	Funciona em light E dark mode?

Agora está completo! Conceitos VISUAIS + Dados QUANTIFICADOS! 🎨📊

### 🎯 Objetivo do carrossel
- Narrar: “Por que 5 milhões de brasileiros buscam TDAH às 2h da manhã?”  
- Posicionar: TDAH adulto como fenômeno pop‑clínico + “forma moderna de sofrimento produtivo”.  
- Tom: **jornalístico** (números, fonte), **professoral** (conceitos de Barkley/Panksepp), **empatia pesada** (noite, culpa, “paralisia de produtividade”).  

***

### 🖼️ Estrutura sugerida (8–12 slides)

#### 🟧 SLIDE 1 – ABERTURA JORNALÍSTICA
- **Título‑chamada (grande, negrito):**  
  - “Por que 5 milhões de brasileiros buscam TDAH às 2h da manhã?”  
- **Dado‑gancho (em caixa/círculo, como notícia):**  
  - “Crescimento de **575%** nas buscas por *‘TDAH adulto’* em 5 anos (2020–2025, Google Trends).”  
- **Mini‑legenda:**  
  - “Brasil hoje: cerca de **200 mil buscas/mês**. E por trás desse número: milhões de adultos digitando no escuro.”

#### 🟧 SLIDE 2 – PERFIL DO BUSCADOR
- **Manchete de texto:**  
  - “Quem está batendo tarefa às 2h?”  
- **Veículos de dado em blocos:**
  - “Estimativa de **5 milhões de adultos com TDAH** (prevalência de ~4,4% – Kessler et al., 2006).”  
  - “Perguntas mais buscadas:  
    - ‘TDAH adulto sintomas’  
    - ‘Procrastinação TDAH’  
    - ‘Paralisia TDAH o que fazer’  
    - ‘Planner TDAH funciona’”  
- **Comentário‑em‑parágrafo (menor):**  
  - “Não é apenas *buscar diagnóstico*. É um ecossistema inteiro — parceiros, chefe, filhos — diagnosticando na zona de risco: prazos, culpa, perfeccionismo desligado da neurologia.”

#### 🟨 SLIDE 3 – EMPISTAS (TRIPÉ EMOCIONAL – PANKSEPP)
- **Título “professoral”:**  
  - “Três emoções primitivas por trás das buscas noturnas.”  
- **Lista com mini‑íc <><>  
  - “🔴 **Medo** (evitação de perigo):  
    - ‘Será que tenho TDAH?’  
    - Medo de ser ‘não‑normal’, de perder oportunidade, de baixa produtividade.”  
  - “🔥 **Raiva**:  
    - ‘Por que não consigo me organizar?’  
    - Raiva de si, dos outros, de um sistema que não reconhece o TDAH.”  
  - “💚 **Busca / Prazer**:  
    - ‘Como organizar com TDAH?’  
    - Crédito‑em‑tempo‑real para o esforço de se entender melhor.”
- **Mini‑nota de rodapé:** “Base: ciência das emoções de Jaak Panksepp (1998), adaptada a buscas digitais.”  

#### 🔵 SLIDE 4 – GPS QUEBRADO (ANALOGIA DIDÁTICA)
- **Título tipo aula:**  
  - “TDAH adulto = GPS que só vê 5 minutos à frente.”  
- **Texto fluido, didático:**
  - “Imagina um GPS que não mostra:  
    - destino final  
    - tempo total da viagem  
    - obstáculos nem rotas alternativas.  
    Só foca no *próximo trecho*.”  
  - “No trabalho: tudo vira ‘próximo trecho’.  
    E o cérebro entra em **paralisia de produtividade**: derrete de urgência, congela na decisão.”  
- **Mini‑dado em caixa:**  
  - “Até o século XX a palavra ‘prioridade’ era usada no singular. Um lembrete: **sobrecargar um córtex pré‑frontal já frágil** não é um problema de gestão, é um problema de neurologia.”

#### 🔵 SLIDE 5 – BARKLEY E A “CEGUEIRA DO FUTURO”
- **Título jornalístico com tom científico:**  
  - “O que Russell Barkley descobriu: TDAH não é falta de atenção, é **cegueira futura**.”  
- **Dado‑mastro:**
  - “Redução de **30–40% na atividade do córtex pré‑frontal** ao pensar em consequências futuras (Barkley, 2012, p. 142).”  
- **Metáfora em tópicos:**
  - “Amanhã = invisível  
    Próxima semana = abstrata  
    Consequências longas = praticamente apagadas.”  
- **Pequena nota de contexto:**  
  - “Russell Barkley é referência mundial em TDAH, autor de mais de 25 livros e 280 artigos científicos.”

#### 🟢 SLIDE 6 – AS 7 FUNÇÕES EXECUTIVAS (VISÃO DE CONJUNTO)
- **Título tipo quadro‑sinóptico:**  
  - “Barkley mapeou as 7 funções executivas do TDAH.”  
- **Lista ultra‑compacta (1 linha por item):**
  1. Inibição de resposta – frear impulsos  
  2. Memória de trabalho não‑verbal – ‘ver’ o futuro  
  3. Memória de trabalho verbal – autorregulação com palavras  
  4. Autorregulação emocional – modular intensidade  
  5. Automotivação – criar drive sem recompensa imediata  
  6. Planejamento e resolução de problemas  
  7. Reconstrução/fluência – quebrar e recombinar  
- **Última linha:**  
  - “Fonte: Barkley, 2010 – *Vencendo o TDAH Adulto*.  
    No Brasil, tais déficits aparecem em 60–85% dos adultos com TDAH, dependendo da função.”  

#### 🟥 SLIDE 7 – EQUAÇÃO DO ERRO: “PLANER + POVO = FALHA SISTÊMICA”
- **Título‑provocação:**  
  - “Por que planner, Pomodoro, task list não resolvem o problema?  
- **Texto didático‑crítico:**
  - “A maioria dos gurus de produtividade ignora que **um planner não educa o córtex pré‑frontal**.  
    É anotar em cima de uma cegueira do futuro.”  
- **Mini‑tabela de contraste (estilo notícia de infográfico):**
  - Linha 1:  
    - “Problema real: **memória de trabalho não‑verbal quebrada**”  
    - “Cure‑quick: ‘Se esforça mais’”  
  - Linha 2:  
    - “Problema real: **automotivação ausente sem recompensa imediata**”  
    - “Solução comum: ‘Assuma responsabilidade’”

#### 🟩 SLIDE 8 – O QUE ELES REALMENTE BUSCAM
- **Título‑revelação:**  
  - “Por que essa multidão chega ao Google às 2h?”  
- **Mensagem‑chave (em negrito):**  
  - “Não é diagnóstico.  
    Não é etiqueta.  
    **É alívio cognitivo.**”  
- **Blocos de explicação:**
  - “Busca entender a culpa:  
    - ‘Será que não sou preguiçoso, só com um GPS neurológico quebrado?’”  
  - “Busca validação:  
    - ‘Meu cérebro enxerga o futuro de forma diferente. Isso muda minha responsabilidade, não elimina minha autoridade.’”  
- **Frase‑ponte para o próximo slide (CTA soft):**  
  - “Se esse é **seu** quadro de noite, leia até o fim.”

#### 🟦 SLIDE 9 – KIERKEGAARD + ESTRUTURAS EXTERNAS
- **Título‑filosófico‑professoral:**  
  - “Kierkegaard + Barkley: ter que olhar para trás para viver no futuro.”  
- **Citação adaptada + aplicação:**
  - “Kierkegaard: *‘A vida só pode ser compreendida olhando para trás, mas deve ser vivida olhando para frente.’*  
    Com TDAH, olhar para trás é fácil. Olhar para frente é neurológico‑improvável.”  
- **Proposta‑sistêmica:**
  - “Barkley propõe **sistemas externos que pensam o futuro por você**: alarmes, rotinas, parceiro de accountability, micro‑recompensas.  
    Não é remediar o cérebro; é **compensar a cegueira futura.**”

#### 🟥 SLIDE 10 – SISTEMA GPS EXTERNO (PROTOCOLO BARKLEY‑INFLUENCED)
- **Título‑protocolo:**  
  - “Consertando o GPS: 4 peças-chave.”  
- **Blocos‑item (dentro do slide, estilo checklist professoral):**
  1. **Checklist de Funções Executivas**:  
     - “Monte uma tabela com as 7 funções. Registre erros diários. Identifique padrões. Ataque uma função por vez.”  
  2. **Alarmes inteligentes (não lembretes):**  
     - “Som alto + vibração + tela bloqueada.  
       30 min antes + hora. Projeto longo: check‑in a cada 45 min.”  
  3. **Parceiro de accountability:**  
     - “Pessoa real, 3 tarefas por dia, reporte à noite. Sem julgamento.”  
  4. **Micro‑recompensas:**  
     - “Recompensa imediata depois de cada 30–45 min concluídos.  
       O cérebro com TDAH viaja só com crédito prático.”

#### 🟩 SLIDE 11 – CTA DE ENGRENAGEM
- **Título‑final:**  
  - “E você? Quando digita ‘TDAH adulto’ às 2h, qual emoção domina?”  
- **Opções em formato‑lista‑rápida (para reflexão, não seção clicável):**
  - “Medo de ser ‘não‑o suficiente’?”  
  - “Raiva por não corresponder às próprias expectativas?”  
  - “Busca por reconhecimento e alívio cognitivo?”  
- **Legenda‑CTA:**
  - “Quer entender sua variável‑chave?  
    Baixe o **Template de Análise das 7 Funções Executivas** + **Sprint 3 Dias Neurocompatível**.  
    Link na bio.”

#### ⚫ SLIDE 12 (OPCIONAL) – RECURSO + REFERÊNCIAS
- **Título‑fechamento:**  
  - “Conjunto de apoio gratuito.”  
- **Lista rápida:**
  - “Template Análise 7 Funções Executivas (PDF imprimível)”  
  - “Planilha Sprint 3 Dias Neurocompatível (Google Sheets)”  
  - “Checklist Pré‑Projeto TDAH (Protocolo de 15 min)”  
- **Rodapé‑científico (em tipo pequeno, tamanho‑legível):**
  - “Referências: Barkley (2010, 2012), Kessler et al. (2006), Panksepp (1998), Google Trends (2020–2025).”

***

### 🎨 Sugestões visuais para o carrossel
- Use **plataformas de ciclos temáticos**:  
  - Canva (modelos de carrossel informativos), Venngage ou PostNitro (sendo posts ultra‑didáticos).[1][2][3]

- Cada slide precisa ter:  
  - 1 **dado numérico** ou **frase‑eixo**,  
  - 2–4 **blocos de texto, no máximo**,  
  - 0–1 **mini‑visual** (ícone de GPS, cérebro, relógio, checklist; textuais).

---

**Claude** _2026-02-11_

Vou criar um carrossel editorial completo seguindo rigorosamente as diretrizes do Editorial Claude - com ilustrações SVG handmade para cada conceito e visualizações gráficas para todos os dados numéricos.
File created successfully: /home/claude/tdah-carrossel.html
{"returncode":0,"stdout":"","stderr":""}
Criei o carrossel editorial completo seguindo rigorosamente o sistema Editorial Claude:

**✅ Implementado:**
- **12 slides navegáveis** com a narrativa completa sobre TDAH
- **Ilustrações SVG handmade orgânicas** para cada conceito (GPS quebrado, cegueira futura, engrenagens de sistema, etc.)
- **Gráficos e barras** para todos os dados numéricos (575%, 5M, 30-40%, prevalências)
- **Tipografia refinada**: Crimson Pro (títulos) + IBM Plex Sans (corpo)
- **Paleta editorial**: Verde sage (#7A8B72), coral (#E07856), terracota suave
- **Espaço em branco abundante** (40%+)
- **Animações orquestradas** nas transições e barras
- **Navegação**: setas, dots, teclado, touch swipe
- **Responsive** para mobile e desktop
- **Arquivo único** autocontido (sem bibliotecas externas)

O carrossel está pronto para uso imediato — basta abrir no navegador e navegar com as setas ou cliques nos dots.

---

**Você** _2026-02-11_

Prossiga

---

**Claude** _2026-02-11_

Vou criar os recursos complementares prometidos no carrossel. Começando com o **Template de Análise das 7 Funções Executivas**.
Here are the files and directories up to 2 levels deep in /mnt/skills/public/pdf, excluding hidden items and node_modules:
60K	/mnt/skills/public/pdf
12K	/mnt/skills/public/pdf/FORMS.md
1.5K	/mnt/skills/public/pdf/LICENSE.txt
17K	/mnt/skills/public/pdf/REFERENCE.md
8.0K	/mnt/skills/public/pdf/SKILL.md
22K	/mnt/skills/public/pdf/scripts
3.0K	/mnt/skills/public/pdf/scripts/check_bounding_boxes.py
512	/mnt/skills/public/pdf/scripts/check_fillable_fields.py
1.0K	/mnt/skills/public/pdf/scripts/convert_pdf_to_images.py
1.5K	/mnt/skills/public/pdf/scripts/create_validation_image.py
4.5K	/mnt/skills/public/pdf/scripts/extract_form_field_info.py
4.0K	/mnt/skills/public/pdf/scripts/extract_form_structure.py
4.0K	/mnt/skills/public/pdf/scripts/fill_fillable_fields.py
3.5K	/mnt/skills/public/pdf/scripts/fill_pdf_form_with_annotations.py

Here's the content of /mnt/skills/public/pdf/SKILL.md with line numbers:
     1	---
     2	name: pdf
     3	description: Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging multiple PDFs into one, splitting PDFs apart, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting PDFs, extracting images, and OCR on scanned PDFs to make them searchable. If the user mentions a .pdf file or asks to produce one, use this skill.
     4	license: Proprietary. LICENSE.txt has complete terms
     5	---
     6	
     7	# PDF Processing Guide
     8	
     9	## Overview
    10	
    11	This guide covers essential PDF processing operations using Python libraries and command-line tools. For advanced features, JavaScript libraries, and detailed examples, see REFERENCE.md. If you need to fill out a PDF form, read FORMS.md and follow its instructions.
    12	
    13	## Quick Start
    14	
    15	```python
    16	from pypdf import PdfReader, PdfWriter
    17	
    18	# Read a PDF
    19	reader = PdfReader("document.pdf")
    20	print(f"Pages: {len(reader.pages)}")
    21	
    22	# Extract text
    23	text = ""
    24	for page in reader.pages:
    25	    text += page.extract_text()
    26	```
    27	
    28	## Python Libraries
    29	
    30	### pypdf - Basic Operations
    31	
    32	#### Merge PDFs
    33	```python
    34	from pypdf import PdfWriter, PdfReader
    35	
    36	writer = PdfWriter()
    37	for pdf_file in ["doc1.pdf", "doc2.pdf", "doc3.pdf"]:
    38	    reader = PdfReader(pdf_file)
    39	    for page in reader.pages:
    40	        writer.add_page(page)
    41	
    42	with open("merged.pdf", "wb") as output:
    43	    writer.write(output)
    44	```
    45	
    46	#### Split PDF
    47	```python
    48	reader = PdfReader("input.pdf")
    49	for i, page in enumerate(reader.pages):
    50	    writer = PdfWriter()
    51	    writer.add_page(page)
    52	    with open(f"page_{i+1}.pdf", "wb") as output:
    53	        writer.write(output)
    54	```
    55	
    56	#### Extract Metadata
    57	```python
    58	reader = PdfReader("document.pdf")
    59	meta = reader.metadata
    60	print(f"Title: {meta.title}")
    61	print(f"Author: {meta.author}")
    62	print(f"Subject: {meta.subject}")
    63	print(f"Creator: {meta.creator}")
    64	```
    65	
    66	#### Rotate Pages
    67	```python
    68	reader = PdfReader("input.pdf")
    69	writer = PdfWriter()
    70	
    71	page = reader.pages[0]
    72	page.rotate(90)  # Rotate 90 degrees clockwise
    73	writer.add_page(page)
    74	
    75	with open("rotated.pdf", "wb") as output:
    76	    writer.write(output)
    77	```
    78	
    79	### pdfplumber - Text and Table Extraction
    80	
    81	#### Extract Text with Layout
    82	```python
    83	import pdfplumber
    84	
    85	with pdfplumber.open("document.pdf") as pdf:
    86	    for page in pdf.pages:
    87	        text = page.extract_text()
    88	        print(text)
    89	```
    90	
    91	#### Extract Tables
    92	```python
    93	with pdfplumber.open("document.pdf") as pdf:
    94	    for i, page in enumerate(pdf.pages):
    95	        tables = page.extract_tables()
    96	        for j, table in enumerate(tables):
    97	            print(f"Table {j+1} on page {i+1}:")
    98	            for row in table:
    99	                print(row)
   100	```
   101	
   102	#### Advanced Table Extraction
   103	```python
   104	import pandas as pd
   105	
   106	with pdfplumber.open("document.pdf") as pdf:
   107	    all_tables = []
   108	    for page in pdf.pages:
   109	        tables = page.extract_tables()
   110	        for table in tables:
   111	            if table:  # Check if table is not empty
   112	                df = pd.DataFrame(table[1:], columns=table[0])
   113	                all_tables.append(df)
   114	
   115	# Combine all tables
   116	if all_tables:
   117	    combined_df = pd.concat(all_tables, ignore_index=True)
   118	    combined_df.to_excel("extracted_tables.xlsx", index=False)
   119	```
   120	
   121	### reportlab - Create PDFs
   122	
   123	#### Basic PDF Creation
   124	```python
   125	from reportlab.lib.pagesizes import letter
   126	from reportlab.pdfgen import canvas
   127	
   128	c = canvas.Canvas("hello.pdf", pagesize=letter)
   129	width, height = letter
   130	
   131	# Add text
   132	c.drawString(100, height - 100, "Hello World!")
   133	c.drawString(100, height - 120, "This is a PDF created with reportlab")
   134	
   135	# Add a line
   136	c.line(100, height - 140, 400, height - 140)
   137	
   138	# Save
   139	c.save()
   140	```
   141	
   142	#### Create PDF with Multiple Pages
   143	```python
   144	from reportlab.lib.pagesizes import letter
   145	from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
   146	from reportlab.lib.styles import getSampleStyleSheet
   147	
   148	doc = SimpleDocTemplate("report.pdf", pagesize=letter)
   149	styles = getSampleStyleSheet()
   150	story = []
   151	
   152	# Add content
   153	title = Paragraph("Report Title", styles['Title'])
   154	story.append(title)
   155	story.append(Spacer(1, 12))
   156	
   157	body = Paragraph("This is the body of the report. " * 20, styles['Normal'])
   158	story.append(body)
   159	story.append(PageBreak())
   160	
   161	# Page 2
   162	story.append(Paragraph("Page 2", styles['Heading1']))
   163	story.append(Paragraph("Content for page 2", styles['Normal']))
   164	
   165	# Build PDF
   166	doc.build(story)
   167	```
   168	
   169	#### Subscripts and Superscripts
   170	
   171	**IMPORTANT**: Never use Unicode subscript/superscript characters (₀₁₂₃₄₅₆₇₈₉, ⁰¹²³⁴⁵⁶⁷⁸⁹) in ReportLab PDFs. The built-in fonts do not include these glyphs, causing them to render as solid black boxes.
   172	
   173	Instead, use ReportLab's XML markup tags in Paragraph objects:
   174	```python
   175	from reportlab.platypus import Paragraph
   176	from reportlab.lib.styles import getSampleStyleSheet
   177	
   178	styles = getSampleStyleSheet()
   179	
   180	# Subscripts: use <sub> tag
   181	chemical = Paragraph("H<sub>2</sub>O", styles['Normal'])
   182	
   183	# Superscripts: use <super> tag
   184	squared = Paragraph("x<super>2</super> + y<super>2</super>", styles['Normal'])
   185	```
   186	
   187	For canvas-drawn text (not Paragraph objects), manually adjust font the size and position rather than using Unicode subscripts/superscripts.
   188	
   189	## Command-Line Tools
   190	
   191	### pdftotext (poppler-utils)
   192	```bash
   193	# Extract text
   194	pdftotext input.pdf output.txt
   195	
   196	# Extract text preserving layout
   197	pdftotext -layout input.pdf output.txt
   198	
   199	# Extract specific pages
   200	pdftotext -f 1 -l 5 input.pdf output.txt  # Pages 1-5
   201	```
   202	
   203	### qpdf
   204	```bash
   205	# Merge PDFs
   206	qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf
   207	
   208	# Split pages
   209	qpdf input.pdf --pages . 1-5 -- pages1-5.pdf
   210	qpdf input.pdf --pages . 6-10 -- pages6-10.pdf
   211	
   212	# Rotate pages
   213	qpdf input.pdf output.pdf --rotate=+90:1  # Rotate page 1 by 90 degrees
   214	
   215	# Remove password
   216	qpdf --password=mypassword --decrypt encrypted.pdf decrypted.pdf
   217	```
   218	
   219	### pdftk (if available)
   220	```bash
   221	# Merge
   222	pdftk file1.pdf file2.pdf cat output merged.pdf
   223	
   224	# Split
   225	pdftk input.pdf burst
   226	
   227	# Rotate
   228	pdftk input.pdf rotate 1east output rotated.pdf
   229	```
   230	
   231	## Common Tasks
   232	
   233	### Extract Text from Scanned PDFs
   234	```python
   235	# Requires: pip install pytesseract pdf2image
   236	import pytesseract
   237	from pdf2image import convert_from_path
   238	
   239	# Convert PDF to images
   240	images = convert_from_path('scanned.pdf')
   241	
   242	# OCR each page
   243	text = ""
   244	for i, image in enumerate(images):
   245	    text += f"Page {i+1}:\n"
   246	    text += pytesseract.image_to_string(image)
   247	    text += "\n\n"
   248	
   249	print(text)
   250	```
   251	
   252	### Add Watermark
   253	```python
   254	from pypdf import PdfReader, PdfWriter
   255	
   256	# Create watermark (or load existing)
   257	watermark = PdfReader("watermark.pdf").pages[0]
   258	
   259	# Apply to all pages
   260	reader = PdfReader("document.pdf")
   261	writer = PdfWriter()
   262	
   263	for page in reader.pages:
   264	    page.merge_page(watermark)
   265	    writer.add_page(page)
   266	
   267	with open("watermarked.pdf", "wb") as output:
   268	    writer.write(output)
   269	```
   270	
   271	### Extract Images
   272	```bash
   273	# Using pdfimages (poppler-utils)
   274	pdfimages -j input.pdf output_prefix
   275	
   276	# This extracts all images as output_prefix-000.jpg, output_prefix-001.jpg, etc.
   277	```
   278	
   279	### Password Protection
   280	```python
   281	from pypdf import PdfReader, PdfWriter
   282	
   283	reader = PdfReader("input.pdf")
   284	writer = PdfWriter()
   285	
   286	for page in reader.pages:
   287	    writer.add_page(page)
   288	
   289	# Add password
   290	writer.encrypt("userpassword", "ownerpassword")
   291	
   292	with open("encrypted.pdf", "wb") as output:
   293	    writer.write(output)
   294	```
   295	
   296	## Quick Reference
   297	
   298	| Task | Best Tool | Command/Code |
   299	|------|-----------|--------------|
   300	| Merge PDFs | pypdf | `writer.add_page(page)` |
   301	| Split PDFs | pypdf | One page per file |
   302	| Extract text | pdfplumber | `page.extract_text()` |
   303	| Extract tables | pdfplumber | `page.extract_tables()` |
   304	| Create PDFs | reportlab | Canvas or Platypus |
   305	| Command line merge | qpdf | `qpdf --empty --pages ...` |
   306	| OCR scanned PDFs | pytesseract | Convert to image first |
   307	| Fill PDF forms | pdf-lib or pypdf (see FORMS.md) | See FORMS.md |
   308	
   309	## Next Steps
   310	
   311	- For advanced pypdfium2 usage, see REFERENCE.md
   312	- For JavaScript libraries (pdf-lib), see REFERENCE.md
   313	- If you need to fill out a PDF form, follow the instructions in FORMS.md
   314	- For troubleshooting guides, see REFERENCE.md
   315	
File created successfully: /home/claude/create_template_pdf.py
{"returncode":0,"stdout":"✓ PDF criado: /home/claude/template-7-funcoes-executivas.pdf\n","stderr":""}
File created successfully: /home/claude/sprint-3-dias.html
File created successfully: /home/claude/checklist-pre-projeto.html
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /home/claude/index.html
{"returncode":0,"stdout":"","stderr":""}
✅ **Ecossistema Completo Criado!**

Desenvolvi todo o sistema prometido no carrossel, mantendo rigorosamente o **Design Editorial Claude**:

## 📦 O que foi entregue:

**1. Carrossel Educativo** (12 slides navegáveis)
- Narrativa completa: "Por que 5M de brasileiros buscam TDAH às 2h"
- Ilustrações SVG handmade para cada conceito
- Gráficos para todos os dados numéricos
- Navegação: setas, dots, teclado, touch swipe

**2. Template de Análise das 7 Funções Executivas** (PDF 5 páginas)
- Tabela detalhada das funções com sinais de déficit
- Rastreamento semanal estruturado (2 semanas)
- Espaço para análise e próximos passos
- Ilustrações de cérebro e sistema de engrenagens

**3. Sprint 3 Dias Neurocompatível** (HTML interativo)
- 9 tarefas (3 por dia), máximo respeitado
- Check-ins obrigatórios com auto-save
- Sistema de recompensas imediatas
- Barra de progresso e estatísticas
- Persistência local (localStorage)

**4. Checklist Pré-Projeto TDAH** (HTML interativo)
- 10 itens estruturados em 5 seções
- Timer de 15 minutos integrado
- Compensa: planejamento, memória de trabalho, automotivação, inibição, flexibilidade
- Auto-save contínuo

**5. Página Índice** (hub central)
- Cards elegantes para cada recurso
- Jornada sugerida (4 passos)
- Referências científicas completas
- Links diretos para tudo

## 🎨 Sistema de Design Aplicado:

✅ Tipografia: Crimson Pro + IBM Plex Sans (zero Inter/Roboto/Arial)
✅ Ilustrações SVG handmade orgânicas (zero Lucide/FontAwesome)
✅ Gráficos nativos para dados (zero Chart.js/D3)
✅ Paleta coesa: Verde sage + Coral + Terracota
✅ Espaço em branco abundante (40%+)
✅ Light + Dark mode suportados
✅ Arquivos únicos autocontidos
✅ Animações orquestradas

Todos os recursos estão prontos para uso imediato!
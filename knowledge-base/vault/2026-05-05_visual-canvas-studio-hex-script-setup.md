---
title: "Visual canvas studio hex script setup"
date: 2026-05-05
account: verinhaburgos56@gmail.com
uuid: 92c8b595-d1c4-4d16-8ecf-65894eb004d6
messages: 2
tags: []
context: ""
---

**Você** _2026-05-05_

/visual-canvas-studio Use Hex for script. [ Scan mece folpw instruction comeback with secripty

---

**Claude** _2026-05-05_

I'll create the complete Python script for generating your operational dashboard PPTX.

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
import os
import subprocess

# A4 landscape dimensions in inches
SLIDE_WIDTH = Inches(11.69)
SLIDE_HEIGHT = Inches(8.27)

# Color palette (McKinsey/Bain style)
COLOR_PRIMARY = RGBColor(0, 32, 96)      # Dark blue
COLOR_SECONDARY = RGBColor(0, 112, 192)  # Medium blue
COLOR_ACCENT = RGBColor(255, 192, 0)     # Gold
COLOR_TEXT = RGBColor(64, 64, 64)        # Dark gray
COLOR_LIGHT = RGBColor(242, 242, 242)    # Light gray for fillable fields
COLOR_WHITE = RGBColor(255, 255, 255)
COLOR_BORDER = RGBColor(191, 191, 191)   # Border gray

def create_presentation():
    prs = Presentation()
    prs.slide_width = SLIDE_WIDTH
    prs.slide_height = SLIDE_HEIGHT
    return prs

def add_blank_slide(prs):
    blank_layout = prs.slide_layouts[6]
    return prs.slides.add_slide(blank_layout)

def add_title_box(slide, title_text, top=Inches(0.3), left=Inches(0.5), width=Inches(10.69), height=Inches(0.6)):
    """Add a title box with primary color background"""
    title_shape = slide.shapes.add_shape(
        1,  # Rectangle
        left, top, width, height
    )
    title_shape.fill.solid()
    title_shape.fill.fore_color.rgb = COLOR_PRIMARY
    title_shape.line.color.rgb = COLOR_PRIMARY
    
    text_frame = title_shape.text_frame
    text_frame.text = title_text
    text_frame.margin_left = Inches(0.2)
    text_frame.margin_right = Inches(0.2)
    text_frame.vertical_anchor = MSO_ANCHOR.MIDDLE
    
    paragraph = text_frame.paragraphs[0]
    paragraph.font.size = Pt(20)
    paragraph.font.bold = True
    paragraph.font.color.rgb = COLOR_WHITE
    
    return title_shape

def add_card(slide, left, top, width, height, title, content_lines=None, fillable=False):
    """Add a card with title and content"""
    # Card background
    card_shape = slide.shapes.add_shape(1, left, top, width, height)
    card_shape.fill.solid()
    card_shape.fill.fore_color.rgb = COLOR_LIGHT if fillable else COLOR_WHITE
    card_shape.line.color.rgb = COLOR_BORDER
    card_shape.line.width = Pt(1)
    
    # Title bar
    title_height = Inches(0.35)
    title_shape = slide.shapes.add_shape(1, left, top, width, title_height)
    title_shape.fill.solid()
    title_shape.fill.fore_color.rgb = COLOR_SECONDARY
    title_shape.line.color.rgb = COLOR_SECONDARY
    
    title_frame = title_shape.text_frame
    title_frame.text = title
    title_frame.margin_left = Inches(0.1)
    title_frame.vertical_anchor = MSO_ANCHOR.MIDDLE
    
    p = title_frame.paragraphs[0]
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    
    # Content
    if content_lines:
        content_top = top + title_height + Inches(0.1)
        content_height = height - title_height - Inches(0.15)
        
        textbox = slide.shapes.add_textbox(left + Inches(0.1), content_top, 
                                          width - Inches(0.2), content_height)
        text_frame = textbox.text_frame
        text_frame.word_wrap = True
        
        for i, line in enumerate(content_lines):
            if i > 0:
                p = text_frame.add_paragraph()
            else:
                p = text_frame.paragraphs[0]
            p.text = line
            p.font.size = Pt(10)
            p.font.color.rgb = COLOR_TEXT
            p.space_after = Pt(6)

def add_table(slide, left, top, width, height, headers, rows):
    """Add a table"""
    cols = len(headers)
    table_shape = slide.shapes.add_table(len(rows) + 1, cols, left, top, width, height)
    table = table_shape.table
    
    # Headers
    for col_idx, header in enumerate(headers):
        cell = table.cell(0, col_idx)
        cell.text = header
        cell.fill.solid()
        cell.fill.fore_color.rgb = COLOR_SECONDARY
        
        paragraph = cell.text_frame.paragraphs[0]
        paragraph.font.size = Pt(10)
        paragraph.font.bold = True
        paragraph.font.color.rgb = COLOR_WHITE
        paragraph.alignment = PP_ALIGN.CENTER
    
    # Rows
    for row_idx, row in enumerate(rows):
        for col_idx, cell_text in enumerate(row):
            cell = table.cell(row_idx + 1, col_idx)
            cell.text = str(cell_text)
            cell.fill.solid()
            cell.fill.fore_color.rgb = COLOR_LIGHT if row_idx % 2 == 0 else COLOR_WHITE
            
            paragraph = cell.text_frame.paragraphs[0]
            paragraph.font.size = Pt(9)
            paragraph.font.color.rgb = COLOR_TEXT

def add_footer(slide, text):
    """Add footer with disclaimer"""
    footer_shape = slide.shapes.add_textbox(
        Inches(0.5), Inches(7.7), Inches(10.69), Inches(0.3)
    )
    text_frame = footer_shape.text_frame
    p = text_frame.paragraphs[0]
    p.text = text
    p.font.size = Pt(8)
    p.font.color.rgb = RGBColor(128, 128, 128)
    p.alignment = PP_ALIGN.CENTER

# Create presentation
prs = create_presentation()

# SLIDE 1: Executive Cover
slide = add_blank_slide(prs)
slide.background.fill.solid()
slide.background.fill.fore_color.rgb = COLOR_PRIMARY

# Main title
title_box = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(9.69), Inches(1.5))
tf = title_box.text_frame
p = tf.paragraphs[0]
p.text = "PLANO OPERACIONAL LEONARDO"
p.font.size = Pt(36)
p.font.bold = True
p.font.color.rgb = COLOR_WHITE
p.alignment = PP_ALIGN.CENTER

p2 = tf.add_paragraph()
p2.text = "Sprint 1 — Prova Pública"
p2.font.size = Pt(24)
p2.font.color.rgb = COLOR_ACCENT
p2.alignment = PP_ALIGN.CENTER
p2.space_before = Pt(12)

# Subtitle
subtitle_box = slide.shapes.add_textbox(Inches(2), Inches(5), Inches(7.69), Inches(0.8))
tf2 = subtitle_box.text_frame
p3 = tf2.paragraphs[0]
p3.text = "Prompts são frágeis; negócios precisam de comandos, scripts e workflows"
p3.font.size = Pt(14)
p3.font.italic = True
p3.font.color.rgb = COLOR_WHITE
p3.alignment = PP_ALIGN.CENTER

# Disclaimer
disclaimer_box = slide.shapes.add_textbox(Inches(2), Inches(7), Inches(7.69), Inches(0.5))
tf3 = disclaimer_box.text_frame
p4 = tf3.paragraphs[0]
p4.text = "Conteúdo independente, não afiliado à Anthropic"
p4.font.size = Pt(10)
p4.font.color.rgb = RGBColor(200, 200, 200)
p4.alignment = PP_ALIGN.CENTER

# SLIDE 2: MECE Map
slide = add_blank_slide(prs)
add_title_box(slide, "MAPA MECE — Leonardo Operating System")

cards_content = [
    ("PESSOA", [
        "Leonardo, 30 anos, brasileiro",
        "TDAH/dislexia, low-code",
        "Sem diploma formal",
        "Stack: Claude, Linear, Drive, Agenda, papel A4",
        "Interface cognitiva: papel impresso"
    ]),
    ("PROBLEMA", [
        "Fragmentação: dados, ideias, tarefas dispersas",
        "Riscos: overengineering, pivô impulsivo",
        "Gap: falta prova pública consistente",
        "Validação artificial por IA"
    ]),
    ("PROCESSO", [
        "Sprint curta (7 dias)",
        "DoD rígido",
        "Workflows diários estruturados",
        "Parking-lot anti-pivô",
        "Captura agora, curadoria depois"
    ]),
    ("PRODUTO", [
        "Conteúdo/educação antes de customização",
        "Tema: Skills, comandos, scripts, workflows",
        "Não criar curso agora",
        "Não criar skills sem lacuna real"
    ]),
    ("PROVA PÚBLICA", [
        "1 artigo",
        "3 posts LinkedIn",
        "3 vídeos curtos",
        "1 repo GitHub",
        "1 checklist lead magnet",
        "Linear estruturado"
    ])
]

card_width = Inches(2.1)
card_height = Inches(2.8)
start_left = Inches(0.5)
start_top = Inches(1.2)
spacing = Inches(0.15)

for idx, (title, content) in enumerate(cards_content):
    col = idx % 5
    left = start_left + col * (card_width + spacing)
    add_card(slide, left, start_top, card_width, card_height, title, content)

add_footer(slide, "Conteúdo independente, não afiliado à Anthropic")

# SLIDE 3: Sprint 1
slide = add_blank_slide(prs)
add_title_box(slide, "SPRINT 1 — Prova Pública de Posicionamento")

# Objective box
obj_box = slide.shapes.add_shape(1, Inches(0.5), Inches(1.2), Inches(10.69), Inches(0.8))
obj_box.fill.solid()
obj_box.fill.fore_color.rgb = COLOR_ACCENT
obj_box.line.color.rgb = COLOR_ACCENT

tf = obj_box.text_frame
tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.2)
p = tf.paragraphs[0]
p.text = "OBJETIVO ÚNICO: Publicar evidência pública sobre Skills, comandos e workflows para negócios"
p.font.size = Pt(14)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY

# DoD Section
add_card(slide, Inches(0.5), Inches(2.2), Inches(5.2), Inches(2.5), 
         "DEFINITION OF DONE", [
             "✓ 1 artigo publicado",
             "✓ 3 posts LinkedIn publicados/agendados",
             "✓ 3 vídeos curtos gravados/publicados",
             "✓ 1 repo GitHub simples",
             "✓ 1 checklist lead magnet",
             "✓ 1 Linear estruturado"
         ])

# Don't Do Section
add_card(slide, Inches(5.9), Inches(2.2), Inches(5.29), Inches(2.5),
         "O QUE NÃO FAZER", [
             "✗ Curso completo agora",
             "✗ Novas skills sem lacuna real",
             "✗ Automatizar postagem",
             "✗ Múltiplos canais simultâneos",
             "✗ Limpeza infinita de arquivos",
             "✗ Tratar elogio IA como validação mercado"
         ])

# Metrics
add_card(slide, Inches(0.5), Inches(4.9), Inches(10.69), Inches(2.5),
         "MÉTRICAS", [
             "Primária: Publicou ou não publicou",
             "Secundárias: comentários • salvamentos • cliques • leads • GitHub stars • profile views",
             "",
             "Canais: LinkedIn (primário) • GitHub (técnico) • Site/artigo (long-form)"
         ])

add_footer(slide, "Sprint 7 dias • Revisão semanal obrigatória")

# SLIDE 4: Dashboard Cap Table
slide = add_blank_slide(prs)
add_title_box(slide, "CAP TABLE OPERACIONAL — Distribuição de Tempo e Prioridade")

headers = ["Workstream", "Objetivo", "Tempo/Dia", "Prioridade %", "Ferramenta", "Status"]
rows = [
    ["Conteúdo Criativo", "Criar canal de aquisição", "120 min manhã", "35%", "Claude/papel/LinkedIn", "ATIVO"],
    ["Data Intake", "Tratar dados e achados", "45 min", "20%", "Claude/Drive/Sheets", "ATIVO"],
    ["Operacional", "Resolver admin e tarefas", "90 min tarde", "25%", "Linear/Gmail/Agenda", "ATIVO"],
    ["Analytics Review", "Medir e decidir", "60 min semanal", "10%", "LinkedIn/GitHub/Sheets", "SEMANAL"],
    ["Sprint Review", "Fechar e planejar próxima", "60 min semanal", "10%", "Papel/Linear", "SEMANAL"]
]

add_table(slide, Inches(0.5), Inches(1.3), Inches(10.69), Inches(2.8), headers, rows)

# Decision Log Preview
add_card(slide, Inches(0.5), Inches(4.3), Inches(10.69), Inches(3),
         "DECISÕES ESTRATÉGICAS", [
             "DECIDED: Conteúdo/educação antes de produto customizado [ALTA confiança]",
             "DECIDED: Papel A4 como interface cognitiva principal [ALTA confiança]",
             "DECIDED: Não criar curso agora [ALTA confiança]",
             "DECIDED: Não usar 'top 1-5%' como claim [ALTA confiança]",
             "HYPOTHESIS: ICP = usuários Claude pagos com prompts soltos [MÉDIA confiança]",
             "HYPOTHESIS: Brasil tem oportunidade first-mover [MÉDIA confiança]"
         ])

add_footer(slide, "Atualizar semanalmente após review")

# SLIDE 5: Workflow 1 — Data Intake
slide = add_blank_slide(prs)
add_title_box(slide, "WORKFLOW 1 — Data Intake 45min Diário")

# Process flow
process_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.2), Inches(10.69), Inches(0.8))
tf = process_box.text_frame
p = tf.paragraphs[0]
p.text = "ENTRADA → Classificar → Extrair Achado → Salvar Drive → Registrar Linear → Marcar Próxima Ação"
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY
p.alignment = PP_ALIGN.CENTER

# Fields table
add_card(slide, Inches(0.5), Inches(2.2), Inches(10.69), Inches(5.2),
         "CAMPOS DE CAPTURA", [], fillable=True)

field_headers = ["Campo", "Tipo", "Exemplo"]
field_rows = [
    ["Research_ID", "String", "R-2026-05-001"],
    ["Data", "Date", "2026-05-05"],
    ["Fonte", "String/URL", "Claude chat, Drive, GitHub"],
    ["Tipo", "Enum", "FACT | HYPOTHESIS | DECISION | ACTION | RISK | GAP"],
    ["Tema", "Enum", "Skills | Conteúdo | Holanda | GTM | Dados"],
    ["Achado", "Short text", "Prompts soltos geram inconsistência"],
    ["Evidência", "URL/Path", "Link, arquivo, print"],
    ["Confiança", "Enum", "Baixa | Média | Alta"],
    ["Prioridade", "Enum", "P0 | P1 | P2 | P3"],
    ["Destino", "Enum", "Linear | Drive | Content | GitHub | Parking-lot"],
    ["Próxima Ação", "Short text", "Transformar em post LinkedIn"]
]

add_table(slide, Inches(0.7), Inches(2.7), Inches(10.29), Inches(4.5), field_headers, field_rows)

add_footer(slide, "Timebox: máximo 45 min/dia • Não virar pesquisa infinita")

# SLIDE 6: Workflow 3 — Conteúdo Criativo
slide = add_blank_slide(prs)
add_title_box(slide, "WORKFLOW 3 — Conteúdo Criativo Matinal (Prioridade Máxima)")

# Timing box
timing_box = slide.shapes.add_shape(1, Inches(0.5), Inches(1.2), Inches(10.69), Inches(0.6))
timing_box.fill.solid()
timing_box.fill.fore_color.rgb = COLOR_ACCENT
timing_box.line.color.rgb = COLOR_ACCENT

tf = timing_box.text_frame
tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.2)
p = tf.paragraphs[0]
p.text = "⏰ MANHÃ • 60-120 min • Quando energia cognitiva está máxima • Ordem 1 no dia"
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY

# Process cards
add_card(slide, Inches(0.5), Inches(2.0), Inches(3.4), Inches(2.4),
         "ENTRADA", [
             "• Tese da sprint",
             "• Achados validados",
             "• Research inbox",
             "• Asset backlog",
             "• Tema do dia"
         ])

add_card(slide, Inches(4.1), Inches(2.0), Inches(3.4), Inches(2.4),
         "PROCESSO", [
             "1. Definir tema do dia",
             "2. Criar asset base",
             "3. Derivar post LinkedIn",
             "4. Derivar vídeo curto",
             "5. Atualizar GitHub/checklist",
             "6. Registrar URL no Linear"
         ])

add_card(slide, Inches(7.7), Inches(2.0), Inches(3.49), Inches(2.4),
         "SAÍDA", [
             "• Conteúdo publicado/agendado",
             "• Asset de portfólio",
             "• Evidência pública",
             "• Link no Linear"
         ])

# Reuse matrix
add_card(slide, Inches(0.5), Inches(4.6), Inches(10.69), Inches(2.8),
         "MATRIZ DE REAPROVEITAMENTO", [
             "1 ARTIGO BASE →",
             "  ├── 3 posts LinkedIn (atomizar argumentos principais)",
             "  ├── 3 vídeos curtos (45-90s cada, uma ideia por vídeo)",
             "  ├── 1 README GitHub (versão técnica)",
             "  ├── 1 checklist lead magnet (versão aplicável)",
             "  └── Carousel/slide deck (futuro)"
         ])

add_footer(slide, "DoD: 1 asset publicável ou agendado com link registrado no Linear")

# SLIDE 7: Workflow 2 — Operacional
slide = add_blank_slide(prs)
add_title_box(slide, "WORKFLOW 2 — Operacional 90min Tarde")

# Task categories
categories = [
    ("E-MAILS & FOLLOW-UPS", [
        "□ Inbox zero diário",
        "□ Responder leads",
        "□ Follow-up Holanda",
        "□ Agendar calls"
    ]),
    ("LINEAR & DRIVE", [
        "□ Atualizar issues",
        "□ Fechar tarefas concluídas",
        "□ Upload de arquivos",
        "□ Organização Drive mínima"
    ]),
    ("ACESSOS & LOGINS", [
        "□ Verificar contas",
        "□ Resolver bloqueios",
        "□ Backup essencial",
        "□ GitHub sync"
    ]),
    ("PUBLICAÇÃO MANUAL", [
        "□ Agendar posts",
        "□ Upload vídeos",
        "□ Distribuir links",
        "□ Registrar URLs"
    ])
]

card_w = Inches(2.55)
card_h = Inches(3.2)
spacing = Inches(0.15)
start_l = Inches(0.5)
start_t = Inches(1.3)

for idx, (title, items) in enumerate(categories):
    left = start_l + idx * (card_w + spacing)
    add_card(slide, left, start_t, card_w, card_h, title, items, fillable=True)

# Blocker tracking
add_card(slide, Inches(0.5), Inches(4.7), Inches(10.69), Inches(2.7),
         "TRACKING DE BLOQUEIOS", [], fillable=True)

blocker_headers = ["Tarefa", "Sistema", "Tempo Est.", "Bloqueio", "Próximo Passo"]
blocker_rows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
]

add_table(slide, Inches(0.7), Inches(5.2), Inches(10.29), Inches(2), blocker_headers, blocker_rows)

add_footer(slide, "DoD: Tarefas críticas resolvidas ou escaladas • Bloqueios visíveis • Dia seguinte preparado")

# SLIDE 8: Workflow 4 — Analytics Review
slide = add_blank_slide(prs)
add_title_box(slide, "WORKFLOW 4 — Analytics Review (Semanal/Quinzenal)")

# Frequency box
freq_box = slide.shapes.add_shape(1, Inches(0.5), Inches(1.2), Inches(10.69), Inches(0.7))
freq_box.fill.solid()
freq_box.fill.fore_color.rgb = COLOR_SECONDARY
freq_box.line.color.rgb = COLOR_SECONDARY

tf = freq_box.text_frame
tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.2)
p = tf.paragraphs[0]
p.text = "⏱ WEEKLY: 45-60 min (sexta 16h) • QUINZENAL: 90-120 min (revisão profunda)"
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = COLOR_WHITE

# Metrics to track
add_card(slide, Inches(0.5), Inches(2.1), Inches(5.2), Inches(2.5),
         "MÉTRICAS DE CAPTURA", [
             "LinkedIn:",
             "• Views, impressões, comentários",
             "• Salvamentos, compartilhamentos",
             "• DMs, leads",
             "• Profile views",
             "",
             "GitHub:",
             "• Stars, forks, clones",
             "• README views",
             "",
             "Site/Vídeos:",
             "• Visitas, cliques, tempo página",
             "• Retenção de vídeo"
         ])

# Decision framework
add_card(slide, Inches(5.9), Inches(2.1), Inches(5.29), Inches(2.5),
         "FRAMEWORK DE DECISÃO", [
             "Para cada asset/canal:",
             "",
             "1. Coletar métricas",
             "2. Comparar com baseline",
             "3. Identificar 1-3 insights",
             "4. Classificar: AJUSTAR | MANTER | PARAR",
             "5. Definir decisão editorial",
             "6. Registrar no Linear",
             "",
             "Próxima sprint: aplicar aprendizados"
         ])

# Tracking table
add_card(slide, Inches(0.5), Inches(4.8), Inches(10.69), Inches(2.7),
         "TABELA DE TRACKING", [], fillable=True)

track_headers = ["Asset/Canal", "Métrica Principal", "Baseline", "Atual", "Decisão"]
track_rows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
]

add_table(slide, Inches(0.7), Inches(5.3), Inches(10.29), Inches(1.9), track_headers, track_rows)

add_footer(slide, "DoD: Decisão da próxima semana baseada em dados • Hipótese validada ou pivô controlado")

# SLIDE 9: Linear Backlog
slide = add_blank_slide(prs)
add_title_box(slide, "LINEAR BACKLOG — Structure & Labels")

# Hierarchy
add_card(slide, Inches(0.5), Inches(1.3), Inches(5.2), Inches(2.8),
         "HIERARQUIA LINEAR", [
             "Initiative:",
             "  Posicionamento independente Skills/workflows",
             "",
             "Project:",
             "  Sprint 1 — Prova Pública",
             "",
             "Cycle/Sprint:",
             "  Sprint 1 (7 dias)",
             "",
             "Issues:",
             "  Tarefas executáveis (≤90 min)",
             "",
             "Sub-tasks:",
             "  Checklist interno da issue"
         ])

# Labels system
add_card(slide, Inches(5.9), Inches(1.3), Inches(5.29), Inches(2.8),
         "SISTEMA DE LABELS", [
             "Epistêmico:",
             "• fact • hypothesis • decision • action • risk • gap",
             "",
             "Portfólio:",
             "• content • github • lead_magnet • validation",
             "",
             "Controle de Foco:",
             "• parking_lot • do_not_pivot • first_mover",
             "",
             "Prioridade:",
             "• P0 (crítico) • P1 (alto) • P2 (médio) • P3 (baixo)",
             "",
             "Workflow:",
             "• wf_content • wf_data • wf_ops • wf_analytics"
         ])

# Status workflow
add_card(slide, Inches(0.5), Inches(4.3), Inches(10.69), Inches(3.1),
         "STATUS WORKFLOW", [
             "Backlog → Todo → In Progress → Blocked → Done → Published",
             "",
             "Views recomendadas:",
             "• Dashboard Hoje: assignee=Leonardo AND status in [Todo, InProgress] AND labels contains [P0, P1]",
             "• Esta Semana: due_date=this_week",
             "• DoD Tracking: status=Done AND created_last_7_days",
             "• Parking Lot: label=parking_lot AND status=Backlog"
         ])

add_footer(slide, "Fonte de verdade operacional • Atualizar diariamente • Revisão semanal obrigatória")

# SLIDE 10: Folha Diária
slide = add_blank_slide(prs)
add_title_box(slide, "FOLHA DIÁRIA — Preenchível")

# Date and focus
date_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.3), Inches(10.69), Inches(0.5))
tf = date_box.text_frame
tf.text = "DATA: _______________     DIA DA SEMANA: _______________     SPRINT: _______________"
p = tf.paragraphs[0]
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = COLOR_TEXT

# Single focus
add_card(slide, Inches(0.5), Inches(2.0), Inches(10.69), Inches(0.8),
         "FOCO ÚNICO DO DIA", [
             "Hoje só existe 1 modo: ☐ PESQUISA  ☐ BUILD  ☐ PUBLICAÇÃO"
         ], fillable=True)

# Three tasks
add_card(slide, Inches(0.5), Inches(3.0), Inches(10.69), Inches(1.6),
         "3 TAREFAS MÁXIMO", [], fillable=True)

tasks_data = [
    ["1.", "", ""],
    ["2.", "", ""],
    ["3.", "", ""]
]
task_headers = ["#", "Tarefa", "✓ Done"]
add_table(slide, Inches(0.7), Inches(3.5), Inches(10.29), Inches(1.0), task_headers, tasks_data)

# Blockers
add_card(slide, Inches(0.5), Inches(4.8), Inches(5.2), Inches(1.3),
         "BLOQUEIOS", [
             "______________________________________",
             "______________________________________"
         ], fillable=True)

# Next action
add_card(slide, Inches(5.9), Inches(4.8), Inches(5.29), Inches(1.3),
         "PRÓXIMA AÇÃO ÚNICA (AMANHÃ 08H)", [
             "______________________________________",
             "______________________________________"
         ], fillable=True)

# Notes
add_card(slide, Inches(0.5), Inches(6.3), Inches(10.69), Inches(1.2),
         "NOTAS & ACHADOS", [
             "_________________________________________________________________",
             "_________________________________________________________________"
         ], fillable=True)

add_footer(slide, "Preencher fim do dia • Preparar próximo dia • Registrar aprendizados")

# SLIDE 11: Weekly Review
slide = add_blank_slide(prs)
add_title_box(slide, "WEEKLY REVIEW — Sexta 17h")

# Sprint status
add_card(slide, Inches(0.5), Inches(1.3), Inches(10.69), Inches(1.0),
         "STATUS DA SPRINT", [], fillable=True)

sprint_headers = ["DoD Item", "Status", "Evidência (URL/Link)"]
sprint_rows = [
    ["1 artigo", "☐ Done ☐ Blocked", ""],
    ["3 posts LinkedIn", "☐ Done ☐ Blocked", ""],
    ["3 vídeos curtos", "☐ Done ☐ Blocked", ""],
    ["1 repo GitHub", "☐ Done ☐ Blocked", ""],
    ["1 checklist", "☐ Done ☐ Blocked", ""],
    ["Linear estruturado", "☐ Done ☐ Blocked", ""]
]

add_table(slide, Inches(0.7), Inches(1.8), Inches(10.29), Inches(1.3), sprint_headers, sprint_rows)

# Learnings
add_card(slide, Inches(0.5), Inches(3.3), Inches(5.2), Inches(1.8),
         "O QUE FUNCIONOU", [
             "______________________________________",
             "______________________________________",
             "______________________________________",
             "______________________________________"
         ], fillable=True)

add_card(slide, Inches(5.9), Inches(3.3), Inches(5.29), Inches(1.8),
         "O QUE NÃO FUNCIONOU", [
             "______________________________________",
             "______________________________________",
             "______________________________________",
             "______________________________________"
         ], fillable=True)

# Metrics summary
add_card(slide, Inches(0.5), Inches(5.3), Inches(10.69), Inches(1.0),
         "MÉTRICAS DA SEMANA", [], fillable=True)

metrics_headers = ["Canal", "Métrica", "Valor", "vs. Baseline", "Insight"]
metrics_rows = [
    ["LinkedIn", "", "", "", ""],
    ["GitHub", "", "", "", ""],
    ["Site/Vídeos", "", "", "", ""]
]

add_table(slide, Inches(0.7), Inches(5.8), Inches(10.29), Inches(0.9), metrics_headers, metrics_rows)

# Next sprint
add_card(slide, Inches(0.5), Inches(6.9), Inches(10.69), Inches(0.7),
         "OBJETIVO ÚNICO DA PRÓXIMA SPRINT", [
             "_________________________________________________________________"
         ], fillable=True)

add_footer(slide, "Registrar aprendizados • Fechar sprint • Definir próxima ação única • Bloquear agenda")

# SLIDE 12: Parking Lot + Riscos
slide = add_blank_slide(prs)
add_title_box(slide, "PARKING LOT + REGISTRO DE RISCOS")

# Parking lot
add_card(slide, Inches(0.5), Inches(1.3), Inches(10.69), Inches(2.5),
         "PARKING LOT — Ideias Sem Quebrar Sprint", [], fillable=True)

parking_headers = ["Data", "Ideia", "Impacto Potencial", "Revisar Quando", "Status"]
parking_rows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
]

add_table(slide, Inches(0.7), Inches(1.8), Inches(10.29), Inches(1.8), parking_headers, parking_rows)

# Risk register
add_card(slide, Inches(0.5), Inches(3.9), Inches(10.69), Inches(2.4),
         "REGISTRO DE RISCOS ATIVOS", [])

risk_headers = ["Risco", "Prob", "Impact", "Sinal de Alerta", "Mitigação"]
risk_rows = [
    ["Overengineering", "Alta", "Alto", "Sistema antes de publicar", "DoD + timebox"],
    ["Pivô impulsivo", "Alta", "Alto", "Nova ideia troca sprint", "Parking-lot obrigatório"],
    ["Validação artificial IA", "Alta", "Alto", "Elogio Claude = prova", "Exigir evidência externa"],
    ["Limpeza infinita", "Alta", "Médio", "Organizar sem publicar", "WF_DATA 45min max"],
    ["Conteúdo técnico demais", "Média", "Médio", "Baixo engajamento B2B", "Traduzir p/ dor negócio"]
]

add_table(slide, Inches(0.7), Inches(4.4), Inches(10.29), Inches(1.7), risk_headers, risk_rows)

# Anti-pivot gate
add_card(slide, Inches(0.5), Inches(6.4), Inches(10.69), Inches(1.0),
         "ANTI-PIVOT GATE", [
             "Nova ideia/oportunidade → Perguntar: 'Isso impede a entrega atual?'",
             "☐ SIM: avaliar bloqueio real → ajustar sprint se necessário",
             "☐ NÃO: registrar no parking-lot → revisão na próxima sexta"
         ])

add_footer(slide, "Proteger foco • Capturar ideias • Não perder oportunidades • Mas não quebrar execução")

# SLIDE 13: Data-Driven Decision Log
slide = add_blank_slide(prs)
add_title_box(slide, "DATA-DRIVEN DECISION LOG")

# Instructions
instr_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.3), Inches(10.69), Inches(0.6))
tf = instr_box.text_frame
p = tf.paragraphs[0]
p.text = "Registrar todas as decisões estratégicas com evidência, confiança e próxima validação"
p.font.size = Pt(11)
p.font.italic = True
p.font.color.rgb = COLOR_TEXT

# Decision table
add_card(slide, Inches(0.5), Inches(2.1), Inches(10.69), Inches(5.4),
         "DECISÕES REGISTRADAS", [], fillable=True)

decision_headers = ["Data", "Decisão", "Status", "Evidência", "Confiança", "Próxima Validação"]
decision_rows = [
    ["", "Conteúdo antes de produto", "DECIDED", "Complexidade customização", "Alta", "Resposta posts"],
    ["", "Papel = interface cognitiva", "DECIDED", "TDAH/dislexia + visual", "Alta", "Uso 7 dias"],
    ["", "Não criar curso agora", "DECIDED", "Sem audiência validada", "Alta", "Após Sprint 1"],
    ["", "ICP = Claude + prompts soltos", "HYPOTHESIS", "Dor plausível", "Média", "Leads+conversas"],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
]

add_table(slide, Inches(0.7), Inches(2.6), Inches(10.29), Inches(4.5), decision_headers, decision_rows)

add_footer(slide, "Status: DECIDED | HYPOTHESIS | REJECTED • Confiança: Alta | Média | Baixa")

# SLIDE 14: O Que NÃO Fazer
slide = add_blank_slide(prs)
add_title_box(slide, "O QUE NÃO FAZER — Travas Operacionais")

# Warning box
warning_box = slide.shapes.add_shape(1, Inches(0.5), Inches(1.3), Inches(10.69), Inches(0.7))
warning_box.fill.solid()
warning_box.fill.fore_color.rgb = RGBColor(220, 53, 69)  # Red
warning_box.line.color.rgb = RGBColor(220, 53, 69)

tf = warning_box.text_frame
tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.2)
p = tf.paragraphs[0]
p.text = "⚠ VIOLAÇÃO DE QUALQUER ITEM ABAIXO = REVISÃO IMEDIATA DO PLANO"
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = COLOR_WHITE

# Don't do cards
dont_items = [
    ("PRODUTO", [
        "✗ Criar curso completo agora",
        "✗ Criar novas Skills sem lacuna real",
        "✗ Desenvolver solução customizada",
        "✗ Automatizar antes de validar manual"
    ]),
    ("CANAIS", [
        "✗ Abrir TikTok, Twitter, newsletter juntos",
        "✗ Múltiplos canais simultâneos",
        "✗ Comunidade/fórum antes de audiência",
        "✗ Automação de postagem agora"
    ]),
    ("OPERAÇÃO", [
        "✗ Limpeza infinita de computador",
        "✗ Organizar tudo antes de publicar",
        "✗ Criar sistema antes de testar",
        "✗ Overengineering de workflows"
    ]),
    ("ESTRATÉGIA", [
        "✗ Pivô sem dados do mercado",
        "✗ Trocar objetivo mid-sprint",
        "✗ Tratar elogio IA como validação",
        "✗ Usar 'top 1-5%' como claim público"
    ]),
    ("BRANDING", [
        "✗ Parecer afiliado Anthropic",
        "✗ Usar logomarca sem permissão",
        "✗ Linguagem que sugere parceria oficial",
        "✗ Depender juridicamente da marca"
    ])
]

card_w = Inches(3.4)
card_h = Inches(2.3)
positions = [
    (Inches(0.5), Inches(2.2)),
    (Inches(4.1), Inches(2.2)),
    (Inches(7.7), Inches(2.2)),
    (Inches(0.5), Inches(4.7)),
    (Inches(4.1), Inches(4.7))
]

for idx, ((title, items), (left, top)) in enumerate(zip(dont_items, positions)):
    add_card(slide, left, top, card_w, card_h, title, items)

add_footer(slide, "Revisar diariamente • Compartilhar com accountability partner • Zero tolerância")

# SLIDE 15: Próxima Ação Única
slide = add_blank_slide(prs)

# Large action box
action_box = slide.shapes.add_shape(1, Inches(1.5), Inches(2), Inches(8.69), Inches(1.5))
action_box.fill.solid()
action_box.fill.fore_color.rgb = COLOR_ACCENT
action_box.line.color.rgb = COLOR_ACCENT
action_box.line.width = Pt(3)

tf = action_box.text_frame
tf.vertical_anchor = MSO_ANCHOR.MIDDLE
tf.margin_left = Inches(0.3)
tf.margin_right = Inches(0.3)

p = tf.paragraphs[0]
p.text = "PRÓXIMA AÇÃO ÚNICA"
p.font.size = Pt(28)
p.font.bold = True
p.font.color.rgb = COLOR_PRIMARY
p.alignment = PP_ALIGN.CENTER

p2 = tf.add_paragraph()
p2.text = "Criar Project Sprint 1 no Linear"
p2.font.size = Pt(20)
p2.font.color.rgb = COLOR_PRIMARY
p2.alignment = PP_ALIGN.CENTER
p2.space_before = Pt(12)

p3 = tf.add_paragraph()
p3.text = "com workflows canônicos e imprimir dashboard"
p3.font.size = Pt(16)
p3.font.color.rgb = COLOR_TEXT
p3.alignment = PP_ALIGN.CENTER
p3.space_before = Pt(8)

# Details box
details_box = slide.shapes.add_textbox(Inches(1.5), Inches(3.8), Inches(8.69), Inches(2.5))
tf2 = details_box.text_frame

details = [
    "✓ Criar Initiative: Posicionamento independente Skills/workflows",
    "✓ Criar Project: Sprint 1 — Prova Pública",
    "✓ Criar Cycle: Sprint 1 (7 dias)",
    "✓ Configurar labels: epistêmico, portfólio, controle foco, prioridade",
    "✓ Criar issues: artigo, posts, vídeos, repo, checklist",
    "✓ Configurar views: Dashboard Hoje, Esta Semana, DoD Tracking, Parking Lot",
    "✓ Imprimir este dashboard completo",
    "✓ Agendar primeiro bloco criativo: segunda 08h"
]

for i, detail in enumerate(details):
    if i > 0:
        p = tf2.add_paragraph()
    else:
        p = tf2.paragraphs[0]
    p.text = detail
    p.font.size = Pt(12)
    p.font.color.rgb = COLOR_TEXT
    p.space_after = Pt(8)

# Timebox
timebox = slide.shapes.add_shape(1, Inches(1.5), Inches(6.5), Inches(8.69), Inches(0.5))
timebox.fill.solid()
timebox.fill.fore_color.rgb = COLOR_SECONDARY
timebox.line.color.rgb = COLOR_SECONDARY

tf3 = timebox.text_frame
tf3.vertical_anchor = MSO_ANCHOR.MIDDLE
p4 = tf3.paragraphs[0]
p4.text = "TIMEBOX: 30 minutos • SUCESSO: Project criado + dashboard impresso + primeiro bloco agendado"
p4.font.size = Pt(11)
p4.font.bold = True
p4.font.color.rgb = COLOR_WHITE
p4.alignment = PP_ALIGN.CENTER

add_footer(slide, "Começar agora • Não planejar mais • Executar")

# Save presentation
output_filename = "leonardo_operating_dashboard_print.pptx"
prs.save(output_filename)
print(f"✓ PPTX created: {output_filename}")

# Try to generate PDF if LibreOffice is available
pdf_filename = "leonardo_operating_dashboard_print.pdf"
try:
    result = subprocess.run(
        ["libreoffice", "--headless", "--convert-to", "pdf", output_filename],
        capture_output=True,
        timeout=30
    )
    if result.returncode == 0 and os.path.exists(pdf_filename):
        print(f"✓ PDF created: {pdf_filename}")
    else:
        print("⚠ PDF conversion skipped (LibreOffice not available or conversion failed)")
except (FileNotFoundError, subprocess.TimeoutExpired, Exception):
    print("⚠ PDF conversion skipped (LibreOffice not available)")

print("\n✓ Script completed successfully")
print(f"✓ Output: {output_filename}")
if os.path.exists(pdf_filename):
    print(f"✓ Output: {pdf_filename}")
```
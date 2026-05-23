---
title: "Leonardo operating system workbook generator"
date: 2026-05-05
account: directjervis@gmail.com
uuid: d28b2150-a847-4163-8037-a26214620646
messages: 2
tags: []
context: ""
---

**Você** _2026-05-05_

Run rendrize [from openpyxl import Workbook
from openpyxl.styles import (Font, PatternFill, Alignment, Border, Side,
                               GradientFill)
from openpyxl.utils import get_column_letter
from openpyxl.styles.numbers import FORMAT_TEXT
# ─── DESIGN TOKENS (Executive Artifact System) ───────────────────────────────
NAVY        = "1A2744"
SLATE       = "2E3F5C"
ACCENT      = "2563EB"
ACCENT_SOFT = "DBEAFE"
CHARCOAL    = "374151"
MID_GRAY    = "6B7280"
LIGHT_GRAY  = "F3F4F6"
BORDER_C    = "D1D5DB"
RED_SOFT    = "FEE2E2";  RED_TEXT    = "B91C1C"
GREEN_SOFT  = "D1FAE5";  GREEN_TEXT  = "065F46"
AMBER_SOFT  = "FEF3C7";  AMBER_TEXT  = "92400E"
WHITE       = "FFFFFF"
# fills
def fill(hex_c): return PatternFill("solid", fgColor=hex_c)
def border(color=BORDER_C, style="thin"):
    s = Side(style=style, color=color)
    return Border(left=s, right=s, top=s, bottom=s)
def font(bold=False, color=CHARCOAL, size=9, italic=False):
    return Font(name="Calibri", bold=bold, color=color, size=size, italic=italic)
def align(h="left", v="top", wrap=True):
    return Alignment(horizontal=h, vertical=v, wrap_text=wrap)
# Apply header row (NAVY bg, white bold text)
def hdr_row(ws, row_idx, values, cols=None, height=22):
    cols = cols or list(range(1, len(values)+1))
    for col, val in zip(cols, values):
        c = ws.cell(row=row_idx, column=col, value=val)
        c.fill = fill(NAVY); c.font = font(bold=True, color=WHITE, size=9)
        c.alignment = align("center","middle", wrap=True)
        c.border = border(WHITE, "thin")
    ws.row_dimensions[row_idx].height = height
# Apply section title band
def section_band(ws, row_idx, title, ncols, color=SLATE):
    ws.merge_cells(start_row=row_idx, start_column=1,
                   end_row=row_idx, end_column=ncols)
    c = ws.cell(row=row_idx, column=1, value=f"  {title}")
    c.fill = fill(color); c.font = font(bold=True, color=WHITE, size=10)
    c.alignment = align("left","middle",False)
    ws.row_dimensions[row_idx].height = 20
# Apply data row with alternating fill
def data_row(ws, row_idx, values, cols=None, alt=False, status_col=None):
    cols = cols or list(range(1, len(values)+1))
    bg = LIGHT_GRAY if alt else WHITE
    for col, val in zip(cols, values):
        c = ws.cell(row=row_idx, column=col, value=val)
        c.fill = fill(bg); c.font = font(); c.border = border()
        c.alignment = align("left","top",True)
    # Status coloring
    if status_col:
        sc = ws.cell(row=row_idx, column=status_col)
        v = str(sc.value or "").upper()
        if any(x in v for x in ["DECIDED","DONE","ALTA","HIGH","✓"]):
            sc.fill = fill(GREEN_SOFT); sc.font = font(color=GREEN_TEXT, bold=True)
        elif any(x in v for x in ["HYPOTHESIS","MÉDIA","MEDIUM","WIP","ATIVO","ACTIVE"]):
            sc.fill = fill(AMBER_SOFT); sc.font = font(color=AMBER_TEXT, bold=True)
        elif any(x in v for x in ["GAP","RISCO","RISK","REJECTED","BAIXA","LOW","BLOCK"]):
            sc.fill = fill(RED_SOFT);  sc.font = font(color=RED_TEXT, bold=True)
def set_col_widths(ws, widths):
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
def accent_bar(ws, row_idx, ncols):
    """Thin ACCENT rule row"""
    ws.merge_cells(start_row=row_idx, start_column=1,
                   end_row=row_idx, end_column=ncols)
    c = ws.cell(row=row_idx, column=1, value="")
    c.fill = fill(ACCENT)
    ws.row_dimensions[row_idx].height = 3
# ─── WORKBOOK SETUP ──────────────────────────────────────────────────────────
wb = Workbook()
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 0 — INDEX
# ═══════════════════════════════════════════════════════════════════════════════
ws = wb.active
ws.title = "📋 INDEX"
ws.sheet_view.showGridLines = False
# Title block
ws.row_dimensions[1].height = 8
ws.merge_cells("A2:H2")
c = ws["A2"]; c.value = "CENTRAL WORKSTUDYBOOK — Leonardo Operating System"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=16)
c.alignment = align("center","middle",False); ws.row_dimensions[2].height = 36
ws.merge_cells("A3:H3")
c = ws["A3"]; c.value = "v0.1 · 2026-05-05 · Conteúdo independente, não afiliado à Anthropic"
c.fill = fill(SLATE); c.font = font(color=WHITE, size=9, italic=True)
c.alignment = align("center","middle",False); ws.row_dimensions[3].height = 18
accent_bar(ws, 4, 8)
# MECE Architecture reasoning block
ws.merge_cells("A5:H5")
c = ws["A5"]; c.value = "  MECE DESIGN RATIONALE — Distribuição de Informação"
c.fill = fill(SLATE); c.font = font(bold=True, color=WHITE, size=10)
c.alignment = align("left","middle",False); ws.row_dimensions[5].height = 20
rationale_lines = [
    ("CAMADAS EPISTÊMICAS", "Os 3 arquivos fonte cobrem 3 camadas distintas de informação. Cada aba do workbook "
     "pertence exclusivamente a UMA camada — zero sobreposição, cobertura total.",
     ACCENT_SOFT, CHARCOAL),
    ("ARQUIVO 1 — RTF", "Corpus bibliográfico acadêmico (Data Science, Marketing Analytics, Neuromarketing). "
     "Função: insumo de pesquisa / referências. → Aba: 📚 Referências", WHITE, CHARCOAL),
    ("ARQUIVO 2 — HTML 1", "Análise diagnóstica e normativa: Primeiros Princípios, Matriz MECE, Problemas, "
     "Processos, Gaps. Função: camada estratégica/analítica. → Abas: 🧠 Primeiros Princípios · 🗺️ Matriz MECE · "
     "⚠️ Problemas & Riscos · ❓ Gaps & Validações", WHITE, CHARCOAL),
    ("ARQUIVO 3 — HTML 2", "Metadados de execução: Sistema, Workstreams, Workflows, Schema, Linear, Sprint, "
     "Assets. Função: camada operacional. → Abas: ⚙️ Workstreams · 🔄 Workflows · 🎯 Sprint 1 · 📊 Schemas", 
     WHITE, CHARCOAL),
    ("REGRA ANTI-REDUNDÂNCIA", "Informação que aparece em 2+ arquivos (ex.: riscos) é consolidada em UM único "
     "tab owner. Referências cruzadas são mantidas via campo 'Fonte' em cada aba.", AMBER_SOFT, AMBER_TEXT),
]
for i, (label, desc, bg, fg) in enumerate(rationale_lines):
    r = 6 + i
    ws.cell(row=r, column=1, value=label).font = font(bold=True, color=fg, size=9)
    ws.cell(row=r, column=1).fill = fill(bg)
    ws.cell(row=r, column=1).border = border()
    ws.cell(row=r, column=1).alignment = align("left","middle",False)
    ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=8)
    c = ws.cell(row=r, column=2, value=desc)
    c.fill = fill(bg); c.font = font(color=fg, size=9)
    c.alignment = align("left","middle",True); c.border = border()
    ws.row_dimensions[r].height = 32
accent_bar(ws, 11, 8)
# Tab map table
hdr_row(ws, 12, ["TAB", "CAMADA", "FONTE", "CONTEÚDO", "LINHAS EST.", "OWNER"], 
        cols=[1,2,3,4,5,6], height=22)
tab_map = [
    ["📋 INDEX",              "Navegação",    "N/A",    "Mapa do workbook, design rationale, registry de fontes", "—", "—"],
    ["🧠 Primeiros Princípios","Fundação",     "HTML 1", "10 primeiros princípios + implicações operacionais",    "10","Leonardo"],
    ["🗺️ Matriz MECE",        "Diagnóstico",  "HTML 1+2","Categorias MECE completas: Pessoa, Problema, Processo, Produto, Risco", "25+","Leonardo"],
    ["⚠️ Problemas & Riscos", "Diagnóstico",  "HTML 1", "Tabela de problemas (P1-P7) + registro de riscos ativos","12","Leonardo"],
    ["❓ Gaps & Validações",  "Diagnóstico",  "HTML 1", "Dúvidas abertas, hipóteses e plano de validação",       "4+","Leonardo"],
    ["⚙️ Workstreams",        "Execução",     "HTML 2", "Cap table operacional: objetivos, tempo, prioridade, ferramenta","5","Leonardo"],
    ["🔄 Workflows",          "Execução",     "HTML 2", "Metadados completos dos 4 workflows (WF1–WF4) com DoD", "4","Leonardo"],
    ["🎯 Sprint 1 — DoD",     "Execução",     "HTML 2", "Sprint metadata + DoD checklist + asset tracking",      "6+","Leonardo"],
    ["📊 Schemas",            "Sistemas",     "HTML 2", "Schema de Data Intake (11 campos) + Schema Linear",     "20","Leonardo"],
    ["📚 Referências",        "Corpus",       "RTF",    "Bibliogr. acadêmica: Data Science, Analytics, Neuromarketing","8+","Pesquisa"],
]
for i, row in enumerate(tab_map):
    data_row(ws, 13+i, row, cols=[1,2,3,4,5,6], alt=(i%2==0))
    ws.row_dimensions[13+i].height = 24
set_col_widths(ws, [28, 16, 10, 54, 12, 12])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 1 — PRIMEIROS PRINCÍPIOS
# ═══════════════════════════════════════════════════════════════════════════════
ws1 = wb.create_sheet("🧠 Primeiros Princípios")
ws1.sheet_view.showGridLines = False
ws1.merge_cells("A1:D1")
c = ws1["A1"]; c.value = "PRIMEIROS PRINCÍPIOS — Lógica de Fundação do Sistema"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws1.row_dimensions[1].height = 30
ws1.merge_cells("A2:D2")
c = ws1["A2"]; c.value = ("Fonte: Texto HTML.html (HTML 1) · "
    "Função: Define os axiomas inegociáveis do sistema. "
    "NÃO duplicar em outras abas — esta é a única fonte de verdade para princípios.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, color=CHARCOAL, size=8)
c.alignment = align("left","middle",True); ws1.row_dimensions[2].height = 26
hdr_row(ws1, 3, ["Nº", "PRINCÍPIO FUNDAMENTAL", "IMPLICAÇÃO PARA LEONARDO", "CATEGORIA"], height=22)
principles = [
    [1, "Leonardo precisa gerar evidência pública de competência.",
     "O foco não é estudar mais. É publicar ativos verificáveis.", "FOCO"],
    [2, "Solo founder tem restrição severa de energia, foco e tempo.",
     "Cada frente aberta compete com publicação e aquisição.", "RESTRIÇÃO"],
    [3, "TDAH/dislexia aumentam custo de alternância de contexto.",
     "O sistema deve reduzir decisões, não aumentar possibilidades.", "DESIGN COGNITIVO"],
    [4, "Low-code exige workflow simples, repetível e visível.",
     "Stack fixa: Linear, Drive, Agenda, Claude e papel A4.", "STACK"],
    [5, "IA generativa não deve ser autoridade final de negócio.",
     "Claude coleta, estrutura, sintetiza e revisa. Leonardo decide.", "GOVERNANÇA"],
    [6, "Prompt solto é frágil para operação empresarial.",
     "A tese deve migrar de prompt para comando, script e workflow.", "TESE EDITORIAL"],
    [7, "Canal de aquisição vem antes de produto completo.",
     "Conteúdo, GitHub, checklist e prova pública antes de curso.", "GTM"],
    [8, "Organização só vale se acelerar publicação.",
     "Limpeza de computador não pode virar projeto paralelo.", "PARETO"],
    [9, "Oportunidade first-mover é hipótese, não prova.",
     "Deve ser testada por publicação e resposta do mercado.", "HIPÓTESE"],
    [10, "O antídoto contra pivô impulsivo é Sprint com DoD rígido.",
     "Toda ideia nova vira captura, não troca de direção.", "ANTI-PIVÔ"],
]
for i, row in enumerate(principles):
    r = 4 + i
    data_row(ws1, r, row, alt=(i%2==0))
    ws1.row_dimensions[r].height = 34
    # Color category chip
    cat_cell = ws1.cell(row=r, column=4)
    cat = str(cat_cell.value)
    if cat in ["FOCO","GTM","TESE EDITORIAL"]:
        cat_cell.fill = fill(ACCENT_SOFT); cat_cell.font = font(color=ACCENT, bold=True)
    elif cat in ["ANTI-PIVÔ","GOVERNANÇA"]:
        cat_cell.fill = fill(GREEN_SOFT); cat_cell.font = font(color=GREEN_TEXT, bold=True)
    elif cat in ["RESTRIÇÃO","DESIGN COGNITIVO"]:
        cat_cell.fill = fill(AMBER_SOFT); cat_cell.font = font(color=AMBER_TEXT, bold=True)
    else:
        cat_cell.fill = fill(LIGHT_GRAY)
set_col_widths(ws1, [5, 52, 52, 20])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 2 — MATRIZ MECE
# ═══════════════════════════════════════════════════════════════════════════════
ws2 = wb.create_sheet("🗺️ Matriz MECE")
ws2.sheet_view.showGridLines = False
ws2.merge_cells("A1:F1")
c = ws2["A1"]; c.value = "MATRIZ MECE — Leonardo Operating System (Extração Consolidada)"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws2.row_dimensions[1].height = 30
ws2.merge_cells("A2:F2")
c = ws2["A2"]; c.value = ("Fontes: HTML 1 §2 + HTML 2 §2 · "
    "MECE = Mutually Exclusive Collectively Exhaustive. Cada item pertence a EXATAMENTE UMA categoria.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, color=CHARCOAL, size=8)
c.alignment = align("left","middle",True); ws2.row_dimensions[2].height = 20
hdr_row(ws2, 3, ["CATEGORIA MECE", "ITEM NORMALIZADO", "TIPO", "METADATA TAGS", 
                  "DECISÃO OPERACIONAL", "OWNER TAB"])
mece_data = [
    # PESSOA
    ["PESSOA", "Leonardo, 30 anos, brasileiro, solo founder", "FACT", "person, operator", "Reduzir carga cognitiva · usar papel", "⚙️ Workstreams"],
    ["PESSOA", "TDAH/dislexia, low-code, sem diploma formal", "FACT", "constraint", "Sistema reduz decisões, não aumenta", "🧠 Princípios"],
    ["PESSOA", "Stack: Claude, Linear, Drive, Agenda, GitHub, papel A4", "DECISION", "stack, tools, ops", "Cada ferramenta com função fixa", "⚙️ Workstreams"],
    ["PESSOA", "Buscando Holanda até fim de 2026", "FACT", "constraint, horizon", "Tarefas Holanda no Workflow Operacional", "🔄 Workflows"],
    # PROBLEMA
    ["PROBLEMA", "Fragmentação de dados em arquivos, contas e formatos", "FACT", "fragmentation, noise", "Inventário + Data Intake Sheet", "⚠️ Problemas"],
    ["PROBLEMA", "Troca frequente de objetivo antes do Launch", "INFERENCE", "pivot-risk", "Sprint única com regra anti-pivô", "⚠️ Problemas"],
    ["PROBLEMA", "Excesso de ideias competindo com execução", "FACT", "focus", "Parking-lot no Linear", "⚠️ Problemas"],
    ["PROBLEMA", "Risco de overengineering em Skills e automações", "FACT", "overengineering", "Aplicar DoD e Pareto", "⚠️ Problemas"],
    ["PROBLEMA", "Claude pode validar excessivamente o trabalho", "HYPOTHESIS", "ai-validation", "Separar evidência de elogio genérico", "⚠️ Problemas"],
    # PROCESSO
    ["PROCESSO", "Sprint curta com objetivo único (7 dias)", "DECISION", "execution, sprint", "Criar Sprint 1 no Linear", "🎯 Sprint 1"],
    ["PROCESSO", "Captura agora, curadoria depois (/CAPTURE_RESEARCH)", "DECISION", "knowledge-mgmt", "Usar campo Research_ID", "📊 Schemas"],
    ["PROCESSO", "Batch de conteúdo: 1 artigo → posts, vídeos, README", "DECISION", "content-reuse", "WF3: Content Factory", "🔄 Workflows"],
    ["PROCESSO", "Anti-pivot Gate: toda mudança passa por critérios", "DECISION", "governance", "Gate antes de qualquer pivô", "🎯 Sprint 1"],
    ["PROCESSO", "Weekly Review: medir sem mudar tudo", "DECISION", "review", "WF4 Analytics Review", "🔄 Workflows"],
    # PRODUTO
    ["PRODUTO", "Conteúdo/educação antes de produto customizado", "DECISION", "strategy, gtm, content-first", "Rota inicial confirmada", "🎯 Sprint 1"],
    ["PRODUTO", "Não criar curso completo agora", "DECISION", "scope-control", "Curso só após sinais de demanda", "🎯 Sprint 1"],
    ["PRODUTO", "ICP: usuários Claude pagantes com prompts soltos", "HYPOTHESIS", "icp, market, audience", "Testar por tração e leads", "❓ Gaps"],
    ["PRODUTO", "Tese editorial: prompts são frágeis; negócios precisam de workflows", "DECISION", "thesis, editorial-line", "Transformar em artigo, posts e vídeos", "🗺️ Matriz"],
    # PROVA PÚBLICA
    ["PROVA PÚBLICA", "1 artigo publicado", "ACTION", "content, dod", "WF3 Content Factory", "🎯 Sprint 1"],
    ["PROVA PÚBLICA", "3 posts LinkedIn publicados/agendados", "ACTION", "content, distribution", "LinkedIn como canal primário", "🎯 Sprint 1"],
    ["PROVA PÚBLICA", "3 vídeos curtos gravados/publicados", "ACTION", "content, video", "45–90s cada, uma ideia por vídeo", "🎯 Sprint 1"],
    ["PROVA PÚBLICA", "1 repositório GitHub simples", "ACTION", "github, portfolio", "1 template simples de Skill/workflow", "🎯 Sprint 1"],
    ["PROVA PÚBLICA", "1 checklist lead magnet", "ACTION", "lead_magnet, validation", "'Como sair de prompts soltos para workflows'", "🎯 Sprint 1"],
    ["PROVA PÚBLICA", "1 Linear estruturado", "ACTION", "ops, execution", "Fonte de verdade operacional", "📊 Schemas"],
    # RISCOS
    ["RISCOS", "Parecer afiliado à Anthropic (jurídico/estratégico)", "FACT", "risk, legal, brand", "Disclaimer obrigatório em todo conteúdo", "⚠️ Problemas"],
    ["RISCOS", "Limpeza infinita vira procrastinação", "FACT", "risk, focus", "Timebox 45 min + DoD para Data Intake", "⚠️ Problemas"],
    ["RISCOS", "Oportunidade first-mover no Brasil (não comprovada)", "HYPOTHESIS", "risk, market", "Testar por busca, comentários e leads", "❓ Gaps"],
]
for i, row in enumerate(mece_data):
    r = 4 + i
    data_row(ws2, r, row, alt=(i%2==0), status_col=3)
    ws2.row_dimensions[r].height = 30
    # Category color
    cat = ws2.cell(row=r, column=1)
    cat_colors = {
        "PESSOA": (ACCENT_SOFT, ACCENT),
        "PROBLEMA": (RED_SOFT, RED_TEXT),
        "PROCESSO": (AMBER_SOFT, AMBER_TEXT),
        "PRODUTO": (GREEN_SOFT, GREEN_TEXT),
        "PROVA PÚBLICA": ("D1FAE5", "065F46"),
        "RISCOS": ("FEE2E2", "B91C1C"),
    }
    bg, fg = cat_colors.get(str(cat.value), (LIGHT_GRAY, CHARCOAL))
    cat.fill = fill(bg); cat.font = font(bold=True, color=fg)
set_col_widths(ws2, [18, 48, 14, 28, 40, 18])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 3 — PROBLEMAS & RISCOS
# ═══════════════════════════════════════════════════════════════════════════════
ws3 = wb.create_sheet("⚠️ Problemas & Riscos")
ws3.sheet_view.showGridLines = False
ws3.merge_cells("A1:G1")
c = ws3["A1"]; c.value = "PROBLEMAS & RISCOS — Registro Consolidado"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws3.row_dimensions[1].height = 30
ws3.merge_cells("A2:G2")
c = ws3["A2"]; c.value = ("Fonte: HTML 1 §3 (Problemas) + HTML 1 §2 (Riscos MECE) · "
    "Esta aba é o único registro de bloqueios diagnosticados. "
    "Riscos ativos de Sprint vão para 🎯 Sprint 1.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws3.row_dimensions[2].height = 20
section_band(ws3, 3, "TABELA DE PROBLEMAS (P1–P7)", 7)
hdr_row(ws3, 4, ["ID", "PROBLEMA", "CAUSA PROVÁVEL", "EFEITO", "SEVERIDADE", "TRATAMENTO", "STATUS"])
problems = [
    ["P1", "Falta de evidência pública", "Estudo e planejamento sem publicação",
     "Baixa empregabilidade e pouca autoridade percebida", "ALTA",
     "Publicar 1 artigo, 3 posts, 3 vídeos, 1 repo e 1 checklist", "ATIVO"],
    ["P2", "Fragmentação operacional", "Arquivos, contas e notas dispersas",
     "Perda de achados e repetição de raciocínio", "ALTA",
     "Inventário + Data Intake Sheet (WF1)", "ATIVO"],
    ["P3", "Pivô impulsivo", "Oportunidades novas interrompem o sprint",
     "Nada chega ao Launch", "ALTA",
     "Regra anti-pivô + parking-lot no Linear", "ATIVO"],
    ["P4", "Overengineering", "Tendência a criar sistema antes de validar mercado",
     "Atraso, fadiga e baixa entrega", "ALTA",
     "Pareto + DoD rígido por sprint", "ATIVO"],
    ["P5", "Validação artificial por IA", "Claude pode elogiar sem prova externa",
     "Decisão baseada em confiança falsa", "MÉDIA",
     "Medir resposta pública — evidência externa obrigatória", "MONITORAR"],
    ["P6", "Carga cognitiva alta", "TDAH/dislexia + múltiplos modos simultâneos",
     "Perda de foco e memória operacional", "ALTA",
     "Trabalhar por blocos exclusivos: pesquisa, build ou publicação", "ATIVO"],
    ["P7", "Dependência de marca alheia", "Posicionamento perto de Anthropic/Claude",
     "Risco jurídico e estratégico", "MÉDIA",
     "Conteúdo independente, foco em método e workflow", "ATIVO"],
]
for i, row in enumerate(problems):
    r = 5 + i
    data_row(ws3, r, row, alt=(i%2==0))
    ws3.row_dimensions[r].height = 34
    sev = ws3.cell(row=r, column=5)
    if "ALTA" in str(sev.value):
        sev.fill = fill(RED_SOFT); sev.font = font(bold=True, color=RED_TEXT)
    else:
        sev.fill = fill(AMBER_SOFT); sev.font = font(bold=True, color=AMBER_TEXT)
    stat = ws3.cell(row=r, column=7)
    if "ATIVO" in str(stat.value):
        stat.fill = fill(RED_SOFT); stat.font = font(bold=True, color=RED_TEXT)
    else:
        stat.fill = fill(AMBER_SOFT); stat.font = font(bold=True, color=AMBER_TEXT)
accent_bar(ws3, 13, 7)
section_band(ws3, 14, "REGISTRO DE RISCOS ATIVOS", 7)
hdr_row(ws3, 15, ["RISCO", "PROBABILIDADE", "IMPACTO", "SINAL DE ALERTA", "MITIGAÇÃO", "TIPO", "REVISÃO"])
risks = [
    ["Overengineering", "Alta", "Alto", "Criar sistema antes de publicar",
     "DoD + timebox por workflow", "OPERACIONAL", "Diário"],
    ["Pivô impulsivo", "Alta", "Alto", "Nova ideia troca sprint em andamento",
     "Parking-lot obrigatório no Linear", "ESTRATÉGICO", "Diário"],
    ["Validação artificial IA", "Alta", "Alto", "Elogio do Claude = prova de mercado",
     "Exigir evidência externa antes de decidir", "EPISTÊMICO", "Por decisão"],
    ["Limpeza infinita", "Alta", "Médio", "Organizar arquivos sem publicar nada",
     "WF_DATA: máximo 45 min/dia", "FOCO", "Diário"],
    ["Conteúdo técnico demais", "Média", "Médio", "Baixo engajamento B2B",
     "Traduzir conceito técnico para dor do negócio", "GTM", "Semanal"],
    ["Dependência Anthropic/marca", "Média", "Alto", "Usar logomarca ou linguagem de parceria",
     "Disclaimer em todo conteúdo + método próprio", "JURÍDICO", "Por publicação"],
]
for i, row in enumerate(risks):
    r = 16 + i
    data_row(ws3, r, row, alt=(i%2==0))
    ws3.row_dimensions[r].height = 30
    for col_idx, val in enumerate(["Alta","Médio","Alto","Média"], 2):
        cell = ws3.cell(row=r, column=col_idx)
        if str(cell.value) in ["Alta","Alto"]:
            cell.fill = fill(RED_SOFT); cell.font = font(bold=True, color=RED_TEXT)
        elif str(cell.value) in ["Média","Médio"]:
            cell.fill = fill(AMBER_SOFT); cell.font = font(bold=True, color=AMBER_TEXT)
set_col_widths(ws3, [6, 44, 26, 18, 14, 42, 14])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 4 — GAPS & VALIDAÇÕES
# ═══════════════════════════════════════════════════════════════════════════════
ws4 = wb.create_sheet("❓ Gaps & Validações")
ws4.sheet_view.showGridLines = False
ws4.merge_cells("A1:F1")
c = ws4["A1"]; c.value = "GAPS & VALIDAÇÕES — Hipóteses Abertas e Plano de Teste"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws4.row_dimensions[1].height = 30
ws4.merge_cells("A2:F2")
c = ws4["A2"]; c.value = ("Fonte: HTML 1 §5 · "
    "Gaps são perguntas sem resposta; Hipóteses são afirmações testáveis. "
    "Atualizar após cada sprint review com resultado e status.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws4.row_dimensions[2].height = 20
hdr_row(ws4, 3, ["ID", "DÚVIDA / GAP", "TIPO", "COMO VALIDAR", "PRAZO", "STATUS"])
gaps = [
    ["G1", "Leonardo é avançado em Skills ou apenas acima da média local?",
     "GAP", "Publicar template, receber feedback técnico e comparar com docs oficiais.", "14 dias", "ABERTO"],
    ["G2", "ICP inicial correto: usuário pagante de Claude com prompts soltos?",
     "HYPOTHESIS", "Posts com CTA para checklist + conversas com leads qualificados.", "14–30 dias", "ABERTO"],
    ["G3", "Brasil tem oportunidade first-mover relevante em Skills de Claude?",
     "HYPOTHESIS", "Medir busca, comentários, leads e convites após publicações.", "30 dias", "ABERTO"],
    ["G4", "Conteúdo técnico demais reduz conversão com ICP B2B?",
     "HYPOTHESIS", "Testar versão técnica vs. versão focada em dor de negócio.", "Sprint 2", "ABERTO"],
    ["G5", "Qual dos 3 sub-ICPs responde melhor (consultores, PMEs, especialistas)?",
     "GAP", "Analisar perfil dos 10 primeiros leads + comentários de posts.", "30 dias", "ABERTO"],
    ["G6", "Automação vs. postagem manual: qual entrega mais aprendizado inicial?",
     "HYPOTHESIS", "Manter manual na Sprint 1 e comparar engajamento por tipo de post.", "Sprint 1", "ABERTO"],
]
for i, row in enumerate(gaps):
    r = 4 + i
    data_row(ws4, r, row, alt=(i%2==0), status_col=3)
    ws4.row_dimensions[r].height = 36
    status = ws4.cell(row=r, column=6)
    status.fill = fill(AMBER_SOFT); status.font = font(bold=True, color=AMBER_TEXT)
set_col_widths(ws4, [6, 54, 14, 50, 12, 12])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 5 — WORKSTREAMS
# ═══════════════════════════════════════════════════════════════════════════════
ws5 = wb.create_sheet("⚙️ Workstreams")
ws5.sheet_view.showGridLines = False
ws5.merge_cells("A1:G1")
c = ws5["A1"]; c.value = "WORKSTREAMS — Cap Table Operacional"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws5.row_dimensions[1].height = 30
ws5.merge_cells("A2:G2")
c = ws5["A2"]; c.value = ("Fonte: HTML 2 §3 · "
    "Distribuição de tempo e energia. Total = 100%. "
    "Conteúdo Criativo tem prioridade máxima (energia cognitiva alta = manhã).")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws5.row_dimensions[2].height = 20
hdr_row(ws5, 3, ["WORKSTREAM", "OBJETIVO", "TEMPO / DIA", "PRIORIDADE %",
                  "FERRAMENTA PRINCIPAL", "SAÍDA ESPERADA", "STATUS"])
workstreams = [
    ["Conteúdo Criativo", "Criar canal de aquisição e portfólio público",
     "60–120 min (manhã)", "35%", "Claude + papel + LinkedIn/site",
     "Posts, vídeos, artigo, GitHub publicados", "ATIVO"],
    ["Data Intake (WF1)", "Tratar dados e preservar achados sem fragmentar",
     "45 min", "20%", "Claude + Drive + Sheets",
     "Dados classificados e reaproveitáveis (Research_ID)", "ATIVO"],
    ["Operacional (WF2)", "Resolver tarefas administrativas e pendências",
     "90 min (tarde)", "25%", "Linear + Agenda + Gmail + Drive",
     "Tarefas fechadas, bloqueios removidos, dia seguinte preparado", "ATIVO"],
    ["Analytics Review (WF4)", "Medir conteúdo e tomar decisões editoriais",
     "45–60 min (semanal)", "10%", "Sheets + LinkedIn + GitHub + site",
     "Decisões data-driven, hipótese validada ou pivô controlado", "SEMANAL"],
    ["Estratégia / Sprint Review", "Evitar pivô e ajustar sprint semanalmente",
     "60 min (sexta)", "10%", "Papel A4 + Linear",
     "Próxima sprint definida e próxima ação única agendada", "SEMANAL"],
]
for i, row in enumerate(workstreams):
    r = 4 + i
    data_row(ws5, r, row, alt=(i%2==0))
    ws5.row_dimensions[r].height = 34
    stat = ws5.cell(row=r, column=7)
    if "ATIVO" in str(stat.value):
        stat.fill = fill(GREEN_SOFT); stat.font = font(bold=True, color=GREEN_TEXT)
    else:
        stat.fill = fill(ACCENT_SOFT); stat.font = font(bold=True, color=ACCENT)
# Total row
r = 9
ws5.merge_cells(f"A{r}:C{r}")
c = ws5[f"A{r}"]; c.value = "TOTAL"
c.fill = fill(NAVY); c.font = font(bold=True, color=WHITE)
c.alignment = align("center","middle",False)
total = ws5.cell(row=r, column=4, value='=SUM(D4:D8)')
total.fill = fill(NAVY); total.font = font(bold=True, color=WHITE)
total.alignment = align("center","middle",False)
ws5.merge_cells(f"E{r}:G{r}")
c = ws5[f"E{r}"]; c.value = "Verificar: deve somar 100%"
c.fill = fill(NAVY); c.font = font(italic=True, color=WHITE)
ws5.row_dimensions[r].height = 22
set_col_widths(ws5, [22, 44, 20, 14, 34, 48, 12])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 6 — WORKFLOWS
# ═══════════════════════════════════════════════════════════════════════════════
ws6 = wb.create_sheet("🔄 Workflows")
ws6.sheet_view.showGridLines = False
ws6.merge_cells("A1:H1")
c = ws6["A1"]; c.value = "WORKFLOWS — Metadados Operacionais Completos (WF1–WF4)"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws6.row_dimensions[1].height = 30
ws6.merge_cells("A2:H2")
c = ws6["A2"]; c.value = ("Fonte: HTML 1 §4 + HTML 2 §4 · "
    "Ordem de execução: WF3 (manhã) → WF1 (manhã/tarde) → WF2 (tarde) → WF4 (semanal). "
    "DoD é obrigatório — não fechar workflow sem validar critério.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws6.row_dimensions[2].height = 20
hdr_row(ws6, 3, ["ID", "NOME", "TEMPO", "ORDEM", "OBJETIVO",
                  "ENTRADA", "SAÍDA", "DoD (Definition of Done)"])
workflows_data = [
    ["WF3", "Conteúdo Criativo Diário", "60–120 min", "1 (manhã)",
     "Criar conteúdo enquanto energia cognitiva está alta",
     "Tese da sprint, achados validados, tema do dia, asset backlog",
     "Post LinkedIn, vídeo curto, artigo base ou asset de portfólio",
     "1 peça pronta ou agendada com link registrado no Linear"],
    ["WF1", "Data Intake", "45 min", "2 (manhã/tarde)",
     "Tratar dados sem virar projeto infinito (timebox rígido)",
     "Pesquisa bruta, arquivo, conversa, print, prompt do dia",
     "Linha na planilha Data Intake com Research_ID e próxima ação",
     "Lote classificado + tipo + confiança + destino + próxima ação definida"],
    ["WF2", "Operacional", "90 min", "3 (tarde)",
     "Resolver tarefas práticas que destravam execução",
     "E-mails, logins, agenda, Drive, pendências Holanda, Linear",
     "Pendência resolvida ou escalada, status atualizado no Linear",
     "Tarefas críticas resolvidas · Bloqueios visíveis · Dia seguinte preparado"],
    ["WF4", "Analytics Review", "45–120 min", "Semanal (sexta)",
     "Medir conteúdo publicado e decidir próximo ciclo editorial",
     "Métricas de posts, vídeos, GitHub, site, comentários, DMs",
     "Decisão editorial ou hipótese validada para próxima sprint",
     "Próxima hipótese definida · Aprendizado registrado no Linear"],
]
for i, row in enumerate(workflows_data):
    r = 4 + i
    data_row(ws6, r, row, alt=(i%2==0))
    ws6.row_dimensions[r].height = 46
    id_cell = ws6.cell(row=r, column=1)
    id_cell.fill = fill(ACCENT_SOFT); id_cell.font = font(bold=True, color=ACCENT, size=10)
    id_cell.alignment = align("center","middle",False)
    # DoD column green
    dod = ws6.cell(row=r, column=8)
    dod.fill = fill(GREEN_SOFT); dod.font = font(color=GREEN_TEXT)
set_col_widths(ws6, [6, 24, 14, 14, 40, 36, 38, 44])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 7 — SPRINT 1 — DoD
# ═══════════════════════════════════════════════════════════════════════════════
ws7 = wb.create_sheet("🎯 Sprint 1 — DoD")
ws7.sheet_view.showGridLines = False
ws7.merge_cells("A1:F1")
c = ws7["A1"]; c.value = "SPRINT 1 — Prova Pública de Posicionamento"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws7.row_dimensions[1].height = 30
ws7.merge_cells("A2:F2")
c = ws7["A2"]; c.value = ("Fonte: HTML 2 §7 · "
    "Duração: 7 dias · Canal primário: LinkedIn · "
    "Objetivo único: Publicar evidência pública de competência · "
    "Métrica mínima: Publicou ou não publicou.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws7.row_dimensions[2].height = 20
# Sprint Metadata block
section_band(ws7, 3, "SPRINT METADATA", 6)
metadata_rows = [
    ["Nome", "Sprint 1 — Prova pública de posicionamento", "Duração", "7 dias", "Status", "EM ANDAMENTO"],
    ["Tema/Tese", "Prompts são frágeis; negócios precisam de comandos, scripts e workflows",
     "Objetivo único", "Publicar evidência pública de competência", "Disclaimer", "Não afiliado à Anthropic"],
    ["Canal primário", "LinkedIn", "Canal técnico", "GitHub", "Canal long-form", "Site/artigo"],
    ["Asset de captura", "Checklist / lead magnet", "Métrica mínima", "Publicou ou NÃO publicou",
     "Próxima ação única", "Criar Sprint 1 no Linear + imprimir dashboard"],
]
for i, row_data in enumerate(metadata_rows):
    r = 4 + i
    for j, val in enumerate(row_data):
        c = ws7.cell(row=r, column=j+1, value=val)
        if j % 2 == 0:  # label columns
            c.fill = fill(LIGHT_GRAY); c.font = font(bold=True, color=CHARCOAL)
        else:           # value columns
            c.fill = fill(WHITE); c.font = font(color=CHARCOAL)
        c.border = border(); c.alignment = align("left","middle",True)
    ws7.row_dimensions[r].height = 30
    # Status chip
    if i == 0:
        stat = ws7.cell(row=r, column=6)
        stat.fill = fill(AMBER_SOFT); stat.font = font(bold=True, color=AMBER_TEXT)
accent_bar(ws7, 8, 6)
section_band(ws7, 9, "DEFINITION OF DONE — Checklist de Entrega", 6)
hdr_row(ws7, 10, ["#", "DELIVERABLE", "CANAL", "LINK/EVIDÊNCIA", "STATUS", "DATA CONCLUSÃO"])
dod_items = [
    ["1", "1 artigo publicado (long-form, tese completa)", "Site/blog", "", "PENDENTE", ""],
    ["2", "3 posts LinkedIn publicados ou agendados", "LinkedIn", "", "PENDENTE", ""],
    ["3", "3 vídeos curtos gravados/publicados (45–90s cada)", "LinkedIn/YouTube", "", "PENDENTE", ""],
    ["4", "1 repositório GitHub simples (template Skill/workflow)", "GitHub", "", "PENDENTE", ""],
    ["5", "1 checklist lead magnet criado e disponibilizado", "Site/LinkedIn", "", "PENDENTE", ""],
    ["6", "1 Linear estruturado com Sprint, issues e labels", "Linear", "", "PENDENTE", ""],
]
for i, row in enumerate(dod_items):
    r = 11 + i
    data_row(ws7, r, row, alt=(i%2==0))
    ws7.row_dimensions[r].height = 26
    stat = ws7.cell(row=r, column=5)
    stat.fill = fill(AMBER_SOFT); stat.font = font(bold=True, color=AMBER_TEXT)
accent_bar(ws7, 18, 6)
section_band(ws7, 19, "O QUE NÃO FAZER NESTA SPRINT (Anti-Scope)", 6)
hdr_row(ws7, 20, ["#", "NÃO FAZER", "RAZÃO", "SE APARECER →", "", ""])
donts = [
    ["1", "Criar curso completo", "Sem audiência validada ainda", "→ Parking-lot no Linear", "", ""],
    ["2", "Novas Skills sem lacuna real", "Overengineering antes de prova", "→ Parking-lot no Linear", "", ""],
    ["3", "Automatizar postagem agora", "Perder feedback de engajamento manual", "→ Sprint 2+", "", ""],
    ["4", "Abrir múltiplos canais simultâneos", "Dispersão de energia solo founder", "→ Parking-lot no Linear", "", ""],
    ["5", "Limpeza infinita de arquivos", "Procrastinação produtiva", "→ Timebox 45 min WF1", "", ""],
    ["6", "Tratar elogio IA como validação", "Evidência artificial não vende", "→ Exigir dado externo", "", ""],
]
for i, row in enumerate(donts):
    r = 21 + i
    data_row(ws7, r, row, alt=(i%2==0))
    ws7.row_dimensions[r].height = 24
    ws7.cell(row=r, column=2).fill = fill(RED_SOFT)
    ws7.cell(row=r, column=2).font = font(color=RED_TEXT, bold=True)
set_col_widths(ws7, [5, 44, 36, 36, 16, 16])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 8 — SCHEMAS
# ═══════════════════════════════════════════════════════════════════════════════
ws8 = wb.create_sheet("📊 Schemas")
ws8.sheet_view.showGridLines = False
ws8.merge_cells("A1:G1")
c = ws8["A1"]; c.value = "SCHEMAS — Data Intake + Linear (Definição de Campos)"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws8.row_dimensions[1].height = 30
ws8.merge_cells("A2:G2")
c = ws8["A2"]; c.value = ("Fonte: HTML 2 §5 (Data Intake) + §6 (Linear) · "
    "Esta aba define os campos de captura e operação. "
    "Não duplicar campo definitions em outras abas — usar referência cruzada.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws8.row_dimensions[2].height = 20
section_band(ws8, 3, "SCHEMA DATA INTAKE — 11 Campos", 7)
hdr_row(ws8, 4, ["CAMPO", "TIPO", "OBRIGATÓRIO", "EXEMPLO", "USO / FUNÇÃO", "VALORES ENUM", "PROMPT ASSOCIADO"])
intake_schema = [
    ["Research_ID", "Texto/ID", "SIM", "R-2026-05-001", "Identificação única e rastreabilidade", "—", "/CAPTURE_RESEARCH"],
    ["Data", "Data", "SIM", "2026-05-05", "Ordenação temporal de achados", "—", "—"],
    ["Fonte", "Texto/URL", "SIM", "Claude chat, Drive, GitHub", "Rastreabilidade e auditabilidade", "—", "—"],
    ["Tipo", "Enum", "SIM", "FACT", "Classificação cognitiva do achado",
     "FACT · HYPOTHESIS · DECISION · ACTION · RISK · GAP", "—"],
    ["Tema", "Enum", "SIM", "Skills", "Agrupamento por área temática",
     "Skills · Conteúdo · Holanda · GTM · Dados", "—"],
    ["Achado", "Texto curto", "SIM", "Prompts soltos geram inconsistência", "Conhecimento extraído e formulado", "—", "—"],
    ["Evidência", "Texto/URL", "PARCIAL", "Link ou arquivo", "Validação do achado (antilucinação)", "—", "—"],
    ["Confiança", "Enum", "SIM", "Média", "Controle contra alucinação e overclaim",
     "Baixa · Média · Alta", "—"],
    ["Prioridade", "Enum", "SIM", "Alta", "Execução e triagem de backlog",
     "Alta · Média · Baixa (ou P0·P1·P2·P3)", "—"],
    ["Vai para", "Enum/URL", "SIM", "Linear", "Destino do achado no sistema",
     "Drive · Linear · Artigo · Parking-lot · GitHub", "—"],
    ["Próxima ação", "Texto curto", "SIM", "Transformar em post LinkedIn", "Continuidade operacional garantida", "—", "—"],
]
for i, row in enumerate(intake_schema):
    r = 5 + i
    data_row(ws8, r, row, alt=(i%2==0))
    ws8.row_dimensions[r].height = 30
    obrig = ws8.cell(row=r, column=3)
    if "SIM" in str(obrig.value):
        obrig.fill = fill(GREEN_SOFT); obrig.font = font(bold=True, color=GREEN_TEXT)
    else:
        obrig.fill = fill(AMBER_SOFT); obrig.font = font(bold=True, color=AMBER_TEXT)
accent_bar(ws8, 17, 7)
section_band(ws8, 18, "SCHEMA LINEAR — Estrutura Operacional", 7)
hdr_row(ws8, 19, ["CAMPO LINEAR", "TIPO", "LABELS PERMITIDAS", "USO OPERACIONAL", "EQUIVALENTE DATA INTAKE", "", ""])
linear_schema = [
    ["Issue", "Tarefa executável (≤90 min)", "—",
     "Unidade mínima de execução. 1 Issue = 1 ação concluível.", "ACTION", "", ""],
    ["Project", "Agrupador temático", "content · github · validation · lead_magnet",
     "Linha editorial ou ativo de portfólio", "Tema", "", ""],
    ["Cycle/Sprint", "Controle de tempo", "Sprint 1 · Sprint 2",
     "Foco por período. Máx. 1 cycle ativo por vez.", "—", "", ""],
    ["Label Epistêmico", "Classificação cognitiva", "decision · hypothesis · insight · fact · risk · gap",
     "Taxonomia operacional de conhecimento", "Tipo", "", ""],
    ["Label Portfólio", "Asset de prova pública", "content · github · lead_magnet · validation",
     "Rastrear deliverables de Sprint", "Vai para", "", ""],
    ["Label Foco", "Controle de escopo", "parking_lot · do_not_pivot · first_mover",
     "Proteger execução de dispersão", "—", "", ""],
    ["Label Prioridade", "Sequência de execução", "P0 · P1 · P2 · P3",
     "P0=hoje · P1=esta semana · P2=próxima sprint · P3=backlog", "Prioridade", "", ""],
    ["Label Workflow", "Roteamento operacional", "wf_content · wf_data · wf_ops · wf_analytics",
     "Qual workflow processa esta issue", "—", "", ""],
    ["Status", "Estado do item", "Backlog · Todo · InProgress · Blocked · Done · Published",
     "Visibilidade de andamento real-time", "—", "", ""],
    ["Link", "Evidência/asset", "URL ou caminho Drive/GitHub",
     "Prova pública ou artefato entregável", "Evidência", "", ""],
]
for i, row in enumerate(linear_schema):
    r = 20 + i
    data_row(ws8, r, row, alt=(i%2==0))
    ws8.row_dimensions[r].height = 30
set_col_widths(ws8, [20, 26, 48, 46, 24, 5, 5])
# ═══════════════════════════════════════════════════════════════════════════════
# TAB 9 — REFERÊNCIAS (RTF bibliography)
# ═══════════════════════════════════════════════════════════════════════════════
ws9 = wb.create_sheet("📚 Referências")
ws9.sheet_view.showGridLines = False
ws9.merge_cells("A1:F1")
c = ws9["A1"]; c.value = "REFERÊNCIAS BIBLIOGRÁFICAS — Corpus Acadêmico de Pesquisa"
c.fill = fill(NAVY); c.font = Font(name="Calibri",bold=True,color=WHITE,size=13)
c.alignment = align("center","middle",False); ws9.row_dimensions[1].height = 30
ws9.merge_cells("A2:F2")
c = ws9["A2"]; c.value = ("Fonte: formato RTF.rtf · "
    "Corpus bibliográfico cobrindo Data Science, Marketing Analytics e Neuromarketing. "
    "Função: insumo de pesquisa para conteúdo e validação acadêmica.")
c.fill = fill(ACCENT_SOFT); c.font = font(italic=True, size=8)
c.alignment = align("left","middle",True); ws9.row_dimensions[2].height = 20
hdr_row(ws9, 3, ["Nº", "REFERÊNCIA", "TIPO", "ABSTRACT / RESUMO",
                  "PRINCIPAIS ACHADOS PARA INSIGHTS DE CONSUMIDOR", "LINK"])
references = [
    [1, "Provost, F.; Fawcett, T. — Data Science for Business", "Livro",
     "Introduz os princípios de ciência de dados para negócios e o conceito de 'pensamento analítico orientado por dados'.",
     "Útil para entender como transformar dados em decisões: segmentação, predição, classificação, propensão de compra, churn e valor do cliente.", ""],
    [2, "Miller, T. W. — Marketing Data Science: Modeling Techniques in Predictive Analytics with R and Python", "Livro",
     "Apresenta modelagem preditiva aplicada a marketing usando R e Python.",
     "Conecta ciência de dados a marketing por meio de analytics, modelos preditivos, análise de redes, web analytics e dados públicos aplicados a casos de marketing.", ""],
    [3, "Baig, M. R.; Govindan, G.; Shrimali, V. R. — Data Science for Marketing Analytics, 2ª ed.", "Livro",
     "Guia prático de analytics de marketing com Python.",
     "Aplicado a projetos reais: análise de vendas, segmentação, previsão de receita, churn, visualização de campanhas e modelagem de comportamento do consumidor.", ""],
    [4, "Winston, W. L. — Marketing Analytics: Data-Driven Techniques with Microsoft Excel", "Livro",
     "Aplica técnicas de análise de marketing usando Excel.",
     "Indicado para usuários não técnicos: precificação, previsão, valor do cliente, análise promocional e tomada de decisão com dados.", ""],
    [5, "Morin, C. — 'Neuromarketing: The New Science of Consumer Behavior'", "Artigo acadêmico",
     "Define neuromarketing como campo que conecta comportamento do consumidor e neurociência.",
     "Métodos tradicionais podem falhar porque dependem da capacidade de verbalizar sentimentos; neuromarketing mede respostas menos conscientes.", ""],
    [6, "Zurawicki, L. — Neuromarketing: Exploring the Brain of the Consumer", "Livro",
     "Analisa como avanços em neuromarketing desafiam estereótipos sobre comportamento do consumidor.",
     "Razão e emoção não são forças opostas; interagem na escolha, avaliação pós-compra e percepção de valor.", ""],
    [7, "Plassmann, H.; Karmarkar, U. R. — 'Consumer Neuroscience' em The Cambridge Handbook of Consumer Psychology", "Capítulo acadêmico",
     "Explica como ferramentas e teorias da neurociência ajudam a entender decisões de consumo.",
     "Liga atividade cerebral, tomada de decisão, preferência, avaliação de marcas e comportamento de compra.", ""],
    [8, "Javor, A. et al. — 'Neuromarketing and consumer neuroscience: contributions to neurology'", "Artigo acadêmico",
     "Discute temas de interseção entre neurologia, neuromarketing e neurociência do consumidor.",
     "Destaca sistema de recompensa, confiança e ética como áreas críticas para interpretar decisões de consumo.", ""],
]
type_colors = {
    "Livro": (GREEN_SOFT, GREEN_TEXT),
    "Artigo acadêmico": (ACCENT_SOFT, ACCENT),
    "Capítulo acadêmico": (AMBER_SOFT, AMBER_TEXT),
}
for i, row in enumerate(references):
    r = 4 + i
    data_row(ws9, r, row, alt=(i%2==0))
    ws9.row_dimensions[r].height = 52
    tipo_cell = ws9.cell(row=r, column=3)
    bg, fg = type_colors.get(str(tipo_cell.value), (LIGHT_GRAY, CHARCOAL))
    tipo_cell.fill = fill(bg); tipo_cell.font = font(bold=True, color=fg)
set_col_widths(ws9, [5, 52, 18, 46, 56, 14])
# ─── FINAL SAVE ──────────────────────────────────────────────────────────────
out = "/home/claude/Central_workstudybook.xlsx"
wb.save(out)
print(f"✓ Saved: {out}")
print(f"  Tabs: {[s.title for s in wb.worksheets]}")

---

**Claude** _2026-05-05_

{"returncode":1,"stdout":"","stderr":"Traceback (most recent call last):\n  File \"<stdin>\", line 75, in <module>\n  File \"<stdin>\", line 26, in align\n  File \"/usr/local/lib/python3.12/dist-packages/openpyxl/styles/alignment.py\", line 40, in __init__\n    self.vertical = vertical\n    ^^^^^^^^^^^^^\n  File \"/usr/local/lib/python3.12/dist-packages/openpyxl/descriptors/base.py\", line 147, in __set__\n    super().__set__(instance, value)\n  File \"/usr/local/lib/python3.12/dist-packages/openpyxl/descriptors/base.py\", line 132, in __set__\n    raise ValueError(self.__doc__)\nValueError: Value must be one of {'justify', 'distributed', 'center', 'bottom', 'top'}\n"}
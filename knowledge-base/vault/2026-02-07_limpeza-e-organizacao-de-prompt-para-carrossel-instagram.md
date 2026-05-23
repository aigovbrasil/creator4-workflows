---
title: "Limpeza e organização de prompt para carrossel Instagram"
date: 2026-02-07
account: contatotdahadulto@gmail.com
uuid: 57a15c98-f9d6-4f9e-a355-19a38560f937
messages: 2
tags: []
context: ""
---

**Você** _2026-02-07_

Como limpo esse prompt e codigo ? 🎯 PROMPT REFINADO E CORRIGIDO

OBJETIVO: Carrossel Instagram de 9 slides sobre TDAH com design profissional

═══════════════════════════════════════════════════════════════════

📐 ESPECIFICAÇÕES TÉCNICAS

Canvas Total: 8100×1080px (9 slides horizontais)
Slide Individual: 1080×1080px (formato quadrado Instagram)
ViewBox SVG: 0 0 8100 1080
Estrutura: <g id="slide-0"> até <g id="slide-8">
Exportação: HTML único com SVG inline (sem dependências externas)

═══════════════════════════════════════════════════════════════════

🎨 SISTEMA DE CORES (WCAG AA Validado)

--primary: #1a365d     /* Azul marinho profundo (contraste 8.2:1) */
--accent: #ff6b6b      /* Coral urgência (contraste 3.9:1) */
--support: #2196F3     /* Azul dados */
--data: #43A047        /* Verde métricas */
--text: #0d1b2a        /* Texto principal (contraste 12.6:1) */
--text-light: #415a77  /* Texto secundário */
--bg: #f8f9fa          /* Background boxes */
--white: #ffffff

═══════════════════════════════════════════════════════════════════

📝 TIPOGRAFIA HÍBRIDA (Anti-AI Aesthetics)

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Montserrat:wght@700&family=Merriweather:wght@400;700&family=JetBrains+Mono:wght@400&display=swap');

HIERARQUIA:
• Display (títulos principais):
  font-family: 'Playfair Display', serif
  font-weight: 900
  font-size: 48-56px
  letter-spacing: -0.02em
  line-height: 1.1

• Headings (subtítulos):
  font-family: 'Montserrat', sans-serif
  font-weight: 700
  font-size: 24-32px
  letter-spacing: -0.01em
  line-height: 1.2

• Body (texto corrido):
  font-family: 'Merriweather', serif
  font-weight: 400
  font-size: 16-18px  /* REDUZIDO para caber nas boxes */
  line-height: 1.6
  letter-spacing: 0.01em

• Mono (dados/referências):
  font-family: 'JetBrains Mono', monospace
  font-weight: 400
  font-size: 13-15px
  line-height: 1.5

═══════════════════════════════════════════════════════════════════

📦 SISTEMA DE BOXES (CRÍTICO - PREVENIR OVERFLOW)

.info-box {
  /* Dimensões fixas */
  width: 480px;
  height: 200px;
  
  /* Padding interno (20px todos os lados) */
  padding: 20px;
  box-sizing: border-box; /* Inclui padding na largura */
  
  /* Background */
  background: var(--bg);
  border-radius: 12px;
  
  /* Prevenir overflow */
  overflow: hidden;
}

.box-content {
  /* Área útil: 440×160px (480-40px, 200-40px) */
  width: 100%;
  height: 100%;
  
  /* Tipografia */
  font-family: 'Merriweather', serif;
  font-size: 16px;  /* Tamanho seguro */
  line-height: 1.6;
  color: var(--text);
  
  /* Limitar a 4 linhas com reticências */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box-highlighted {
  /* Box com destaque (azul escuro) */
  background: var(--primary);
  color: var(--white);
}

IMPLEMENTAÇÃO SVG:
<foreignObject x="100" y="300" width="480" height="200">
  <div xmlns="http://www.w3.org/1999/xhtml" class="info-box">
    <div class="box-number">01</div>
    <h3 class="box-title">Evidência > Opinião</h3>
    <p class="box-content">
      Prioridade absoluta para estudos peer-review validados.
    </p>
  </div>
</foreignObject>

═══════════════════════════════════════════════════════════════════

📊 GRÁFICOS SVG 100% INLINE (Zero Imagens Externas)

✅ COMPONENTES OBRIGATÓRIOS:

1. Barras Comparativas (Tempo de Reação):
   <rect> com gradientes lineares
   • TDAH: 520ms (barra vermelha/coral)
   • Neurotípico: 380ms (barra azul)
   Incluir labels com valores em JetBrains Mono

2. Ícones Vetoriais Nativos (symbols reutilizáveis):
   <symbol id="icon-brain" viewBox="0 0 24 24">
     <!-- Path do cérebro -->
   </symbol>
   <symbol id="icon-alert">...</symbol>
   <symbol id="icon-solution">...</symbol>
   <symbol id="icon-data">...</symbol>

3. Elementos Atmosféricos:
   <defs>
     <linearGradient id="bg-gradient">
       <stop offset="0%" stop-color="#1a365d"/>
       <stop offset="100%" stop-color="#2d5a8c"/>
     </linearGradient>
     
     <pattern id="noise" patternUnits="userSpaceOnUse" width="100" height="100">
       <!-- Textura procedural sutil -->
     </pattern>
     
     <filter id="soft-shadow">
       <feGaussianBlur stdDeviation="4"/>
       <feOffset dx="0" dy="2"/>
     </filter>
   </defs>

❌ PROIBIDO:
   • Elementos <image>
   • Base64 embeds
   • PNG/JPG externos
   • Placeholder.com
   • Unsplash/Pexels

═══════════════════════════════════════════════════════════════════

🎭 PRINCÍPIOS ANTI-AI SLOP

✅ APLICAR:
• Gradientes atmosféricos com noise texture sutil
• Assimetria intencional (offsets 10-15px)
• Contraste tipográfico alto (3 famílias: serif + sans + mono)
• Espaçamento não-uniforme (slides ímpares 35% whitespace)
• Color coding semântico (badges por nível 1/2/3)
• Sobreposições sutis entre elementos

❌ EVITAR:
• Purple/pink gradients genéricos
• Layouts perfeitamente simétricos
• Emojis Unicode (🧠❤️✨)
• Sombras drop-shadow excessivas
• Glassmorphism
• Neumorphism

═══════════════════════════════════════════════════════════════════

🎯 ELEMENTOS VISUAIS OBRIGATÓRIOS

Progress Indicators (storytelling):
<g id="progress">
  <circle cx="50" cy="50" r="8" fill="#1a365d"/> <!-- Ativo -->
  <circle cx="80" cy="50" r="8" fill="#1a365d"/>
  <circle cx="110" cy="50" r="8" fill="#1a365d"/>
  <circle cx="140" cy="50" r="8" fill="#cbd5e0"/> <!-- Inativo -->
  <circle cx="170" cy="50" r="8" fill="#cbd5e0"/>
</g>

Badges Numerados (níveis de profundidade):
<g id="badge-nivel-1">
  <rect width="80" height="32" rx="16" fill="#ff6b6b"/>
  <text x="40" y="20" text-anchor="middle" fill="white" 
        font-family="Montserrat" font-weight="700" font-size="14">
    Nível 1
  </text>
</g>

Boxes de Estudos Científicos:
<rect x="100" y="400" width="880" height="120" rx="8" 
      fill="#f0f4f8" stroke="#2196F3" stroke-width="2"/>
<text x="120" y="440" font-family="JetBrains Mono" font-size="13">
  📊 Estudo: Castellanos et al. (2002) | N=152 | p<0.001
</text>

═══════════════════════════════════════════════════════════════════

🗂️ ESTRUTURA DOS 9 SLIDES

<g id="slide-0" transform="translate(0, 0)">
  <!-- CAPA -->
  Título principal: "TDAH Descomplicado"
  Subtítulo: "Da Neurociência à Prática"
  Progress: ●○○○○
</g>

<g id="slide-1" transform="translate(1080, 0)">
  <!-- PREVIEW ESTRUTURA -->
  Grid 2×2 com mini-preview dos 3 níveis
  Progress: ●●○○○
</g>

<g id="slide-2" transform="translate(2160, 0)">
  <!-- NÍVEL 1: ANALOGIA -->
  Badge: "Nível 1"
  Analogia visual: Freio de carro com gráfico
  Progress: ●●●○○
</g>

<g id="slide-3" transform="translate(3240, 0)">
  <!-- NÍVEL 1: AMPLIAÇÃO -->
  Dados: 520ms vs 380ms (barras comparativas)
  Progress: ●●●○○
</g>

<g id="slide-4" transform="translate(4320, 0)">
  <!-- NÍVEL 2: NEUROBIOLOGIA -->
  Badge: "Nível 2"
  Diagrama: Córtex pré-frontal (SVG inline)
  Progress: ●●●●○
</g>

<g id="slide-5" transform="translate(5400, 0)">
  <!-- NÍVEL 2: ESTUDOS -->
  3 boxes com estudos científicos
  Progress: ●●●●○
</g>

<g id="slide-6" transform="translate(6480, 0)">
  <!-- NÍVEL 3: SOLUÇÃO -->
  Badge: "Nível 3"
  Estratégias práticas (lista visual)
  Progress: ●●●●●
</g>

<g id="slide-7" transform="translate(7560, 0)">
  <!-- PROVA SOCIAL -->
  Depoimentos estilizados
  Progress: ●●●●●
</g>

<g id="slide-8" transform="translate(8640, 0)">
  <!-- GENERALIZAÇÃO -->
  Mapa mental: Aplicações práticas
  Progress: ●●●●●
</g>

═══════════════════════════════════════════════════════════════════

📋 CONTEÚDO DOS SLIDES (TEXTO COMPLETO)

SLIDE 0 - CAPA:
Título: "TDAH Descomplicado"
Subtítulo: "Da Neurociência à Prática Clínica"
Hashtag: #007 | ÉTICA

SLIDE 1 - ESTRUTURA:
"Compromisso Ético"

Box 01: Evidência > Opinião
"Prioridade absoluta para estudos peer-review validados."

Box 02: Transparência
"Metodologia de coleta de métricas exposta."

Box 03: Calibração
"Funciona para mim" ≠ "funciona para todos"

Box 04: Educacional (destacado azul)
"Jamais substitui orientação clínica."

SLIDE 2 - ANALOGIA:
Badge: "Nível 1 - Introdução"
Título: "O Freio Que Falha"
Texto: "Imagine dirigir com freios 27% menos responsivos."
Gráfico: Comparação visual tempo de reação

SLIDE 3 - DADOS:
Título: "A Diferença em Números"
Gráfico de barras:
• TDAH: 520ms (tempo médio de inibição)
• Neurotípico: 380ms
Fonte: "Castellanos et al., 2002"

SLIDE 4 - NEUROBIOLOGIA:
Badge: "Nível 2 - Ciência"
Título: "Onde Acontece o Problema"
Diagrama: Córtex Pré-Frontal
Texto: "Déficit na regulação dopaminérgica"

SLIDE 5 - ESTUDOS:
Título: "Evidências Científicas"

Box 1: "Meta-análise (2018)"
"N=4.276 | Redução 23% volume CPF"

Box 2: "Longitudinal (2015)"
"10 anos acompanhamento | Persistência 60%"

Box 3: "Neuroimagem (2020)"
"fMRI | Hipoativação consistente"

SLIDE 6 - SOLUÇÃO:
Badge: "Nível 3 - Prática"
Título: "Estratégias Validadas"

Lista:
✓ Medicação (primeira linha)
✓ TCC adaptada
✓ Coaching executivo
✓ Modificações ambientais

SLIDE 7 - PROVA SOCIAL:
Título: "Resultados Reais"
3 depoimentos curtos estilizados

SLIDE 8 - GENERALIZAÇÃO:
Título: "Aplicações Práticas"
Mapa mental: Escola | Trabalho | Relacionamentos

═══════════════════════════════════════════════════════════════════

⚙️ ESPECIFICAÇÕES DE CÓDIGO

ESTRUTURA HTML:
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TDAH - Carrossel Instagram</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui; background: #0d1b2a; }
    
    /* Importar fontes */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Montserrat:wght@700&family=Merriweather:wght@400&family=JetBrains+Mono:wght@400&display=swap');
    
    /* CSS Variables */
    :root {
      --primary: #1a365d;
      --accent: #ff6b6b;
      --support: #2196F3;
      --data: #43A047;
      --text: #0d1b2a;
      --bg: #f8f9fa;
      --white: #ffffff;
    }
  </style>
</head>
<body>
  <svg viewBox="0 0 8100 1080" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradientes, filtros, ícones -->
    </defs>
    
    <!-- 9 slides -->
    <g id="slide-0">...</g>
    <g id="slide-1">...</g>
    <!-- ... até slide-8 -->
  </svg>
</body>
</html>

VALIDAÇÃO FINAL:
✅ Todas as boxes com padding 20px
✅ Texto com line-clamp ou tamanho reduzido
✅ SVG 100% inline (zero imagens externas)
✅ Fontes Google Fonts carregadas
✅ Contraste WCAG AA validado
✅ ViewBox correto (8100×1080)
✅ 9 slides completos com conteúdo
✅ Progress indicators em todos os slides


Agora vou gerar o código HTML completo aplicando todas essas correções. Prosseguir?

---

**Claude** _2026-02-07_

Vou limpar e organizar esse prompt extenso em uma versão mais concisa e clara, mantendo todas as especificações técnicas essenciais:

---

# 🎯 PROMPT LIMPO: Carrossel Instagram TDAH (9 slides)

## 📐 Especificações Técnicas

**Canvas & Estrutura:**
- Canvas total: 8100×1080px (9 slides horizontais)
- Slide individual: 1080×1080px
- ViewBox SVG: `0 0 8100 1080`
- Estrutura: `<g id="slide-0">` até `<g id="slide-8">`
- Formato: HTML único com SVG inline

## 🎨 Cores (WCAG AA)

```css
--primary: #1a365d    /* Azul marinho */
--accent: #ff6b6b     /* Coral */
--support: #2196F3    /* Azul dados */
--data: #43A047       /* Verde */
--text: #0d1b2a       /* Texto principal */
--text-light: #415a77 /* Secundário */
--bg: #f8f9fa         /* Background */
--white: #ffffff
```

## 📝 Tipografia

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Montserrat:wght@700&family=Merriweather:wght@400&family=JetBrains+Mono:wght@400&display=swap');

/* Display (títulos): Playfair Display 900, 48-56px */
/* Headings: Montserrat 700, 24-32px */
/* Body: Merriweather 400, 16-18px */
/* Mono (dados): JetBrains Mono 400, 13-15px */
```

## 📦 Sistema de Boxes

```css
.info-box {
  width: 480px;
  height: 200px;
  padding: 20px;
  background: var(--bg);
  border-radius: 12px;
  overflow: hidden;
}

.box-content {
  font-size: 16px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## 📊 Gráficos & Elementos

**Obrigatório SVG 100% inline:**
- Barras comparativas (520ms vs 380ms)
- Ícones vetoriais como `<symbol>`
- Gradientes e filtros em `<defs>`
- **PROIBIDO:** `<image>`, base64, PNGs externos

**Elementos visuais:**
- Progress indicators (círculos preenchidos/vazios)
- Badges numerados (Nível 1/2/3)
- Boxes de estudos científicos

## 🗂️ Estrutura dos 9 Slides

1. **Slide 0** (x=0): Capa - "TDAH Descomplicado"
2. **Slide 1** (x=1080): Compromisso Ético (4 boxes)
3. **Slide 2** (x=2160): Nível 1 - Analogia "O Freio Que Falha"
4. **Slide 3** (x=3240): Dados comparativos (gráfico barras)
5. **Slide 4** (x=4320): Nível 2 - Neurobiologia (diagrama CPF)
6. **Slide 5** (x=5400): Evidências científicas (3 estudos)
7. **Slide 6** (x=6480): Nível 3 - Estratégias práticas
8. **Slide 7** (x=7560): Prova social (depoimentos)
9. **Slide 8** (x=8640): Mapa mental aplicações

## 🎭 Princípios de Design

**Aplicar:**
- Gradientes atmosféricos com noise sutil
- Assimetria intencional (offsets 10-15px)
- Contraste tipográfico alto (3 famílias)
- Color coding semântico

**Evitar:**
- Gradientes purple/pink genéricos
- Layouts perfeitamente simétricos
- Emojis Unicode
- Glassmorphism/Neumorphism

## ✅ Checklist Final

- [ ] Todas boxes com padding 20px
- [ ] Texto limitado (line-clamp ou tamanho reduzido)
- [ ] SVG 100% inline (zero imagens externas)
- [ ] Google Fonts carregadas
- [ ] Contraste WCAG AA
- [ ] ViewBox 8100×1080 correto
- [ ] 9 slides completos
- [ ] Progress indicators em todos slides

---

**Posso gerar o código HTML agora?** 🚀
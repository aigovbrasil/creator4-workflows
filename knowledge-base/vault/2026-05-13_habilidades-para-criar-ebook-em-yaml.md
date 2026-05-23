---
title: "Habilidades para criar ebook em YAML"
date: 2026-05-13
account: leonardopimentel.knh@gmail.com
uuid: 0fa6635f-9a5b-456f-9eca-a4ae4d46af09
messages: 8
tags: []
context: ""
---

**Você** _2026-05-13_

Now undertand the request explain me wicth skill i have on that coul be perfct to create this content ? [Perfect! The user wants Option A with a very specific delivery:

YAML plain text with all the content organized and ready
CMD/command that will convert it into a premium ebook rendering

The user is saying: "Your task is to create all content (most important) then hand off for the marketing team with your command"
So my deliverables are:

A YAML file with all the ebook content structured and ready
A command/script/instructions that the marketing team can use to convert this YAML into a premium PDF ebook

This is actually brilliant - it separates content from presentation, which is a best practice.
Let me plan the structure:
YAML Structure:
yamlmetadata:
  title: "A-Z da AI Literacy & AI Fluency"
  subtitle: "Como usar IA com clareza, crítica e responsabilidade no trabalho"
  version: "1.0"
  date: "2026-05-13"
  
design:
  palette:
    navy: "#0B1F3A"
    blue: "#246BFD"
    gray: "#374151"
    light: "#F3F4F6"
  fonts:
    titles: "IBM Plex Sans Condensed"
    body: "IBM Plex Serif"
    
pages:
  - number: 1
    type: cover
    content: ...
  - number: 2
    type: executive_content
    content: ...
Then I'll provide a command using either:

Python + reportlab/weasyprint for PDF generation
Pandoc for markdown to PDF
Or a detailed specification for a tool like Canva/InDesign

Let me start creating the comprehensive YAML content file.Mostrar menosConcluídoPERFEITO! ENTENDIDO.
Vou entregar 2 arquivos:

ebook-content.yaml — Todo o conteúdo estruturado, pronto para usar
generate-ebook.py — Script Python que o time de marketing roda para gerar o PDF premium

Vou começar agora criando todo o conteúdo com máxima qualidade editorial.
Criar arquivo YAML com todo o conteúdo do ebook estruturado e pronto para renderizaçãoCriar arquivo YAML com todo o conteúdo do ebook estruturado e pronto para renderizaçãoCriar arquivo YAML com todo o conteúdo do ebook estruturado e pronto para renderizaçãoebook-content.yamlConcluído

---

**Claude** _2026-05-13_

Olhando o seu conteúdo (ebook premium em YAML com 10 páginas, design system definido, múltiplos layouts) e cruzando com os skills disponíveis:

---

**🥇 Melhor match: `visual-canvas-studio`**
Feito exatamente para isso — renderiza business content como artifact HTML interativo com design premium, seletores de estilo e múltiplos modos visuais. Encaixa perfeito no seu YAML com `palette`, `fonts`, e `style: "consultoria premium + HBR editorial"`.

**🥈 Segundo: `pdf`**
Para gerar o arquivo `.pdf` final para download. Funciona em conjunto com o visual-canvas-studio (HTML → PDF).

**🥉 Terceiro: `theme-factory`**
Tem 10 temas pré-definidos com cores/fontes que podem ser aplicados sobre o artifact — ou você pode usar a palette que já definiu no YAML como tema customizado.

**Bônus: `frontend-design`**
Garante qualidade de design de nível produção nos componentes (cards A–Z, checklist, roadmap, tabelas).

---

**Recomendação de execução:**

```
visual-canvas-studio → gera o artifact HTML interativo
     ↓
theme-factory → aplica IBM Plex + palette navy/blue_action
     ↓  
pdf skill → exporta o PDF premium para o time de marketing
```

Quer que eu execute esse pipeline agora com o conteúdo do YAML que você já tem?

---

**Você** _2026-05-13_

now create an worklfow integration with thiss 3 [ visual-canvas-studio → gera o artifact HTML interativo
     ↓
theme-factory → aplica IBM Plex + palette navy/blue_action
     ↓  
pdf skill → exporta o PDF premium para o time de marketing

---

**Você** _2026-05-13_

now create an worklfow integration with thiss 3 [ visual-canvas-studio → gera o artifact HTML interativo
↓
theme-factory → aplica IBM Plex + palette navy/blue_action
↓pdf skill → exporta o PDF premium para o time de marketing

---

**Claude** _2026-05-13_

1	---
     2	name: visual-canvas-studio
     3	description: >
     4	  FORGE Visual Canvas Studio — a master artifact engine that renders any business content
     5	  through interchangeable visual design languages and component systems. Activate this skill
     6	  whenever the user wants to generate an interactive HTML artifact, SVG document, PDF-style
     7	  report, carousel, landing page, dashboard, or any visual business deliverable with
     8	  selectable styles. Triggers include: "generate a canvas", "make an interactive artifact",
     9	  "create with Swiss style", "use McKinsey style", "SaaS premium layout", "interactive
    10	  business report", "visual canvas", "style selector", "theme switcher", "design system",
    11	  "build an artifact with style modes", "PDF-style document", "business lab", or any
    12	  request combining a business artifact with a visual language preference. ALWAYS use this
    13	  skill when the user provides business content and asks for a styled, interactive, or
    14	  multi-format visual output — even if they don't use the words "visual canvas" explicitly.
    15	---
    16	
    17	# FORGE Visual Canvas Studio
    18	
    19	> One engine. Any content. Every design language.
    20	
    21	The Visual Canvas Studio transforms raw business content into premium interactive artifacts
    22	by separating three concerns: **content** (stays fixed), **style** (switchable), and
    23	**components** (adaptable). The result is an artifact that feels like a strategy-grade
    24	business tool, not a generic dashboard.
    25	
    26	---
    27	
    28	## 0. Read This First
    29	
    30	Before generating anything, decide the artifact format:
    31	
    32	| Request type | Output format | Tool |
    33	|---|---|---|
    34	| Interactive (style switcher, calculator, tabs) | React JSX or single HTML | `show_widget` or `present_files` |
    35	| PDF-style multi-page document | SVG-in-HTML (A4 pages) | `present_files` → `.html` |
    36	| Download + view | `.html` file | `present_files` |
    37	| Slide deck | `.pptx` | Read `pptx/SKILL.md` first |
    38	| Word doc | `.docx` | Read `docx/SKILL.md` first |
    39	
    40	**Always read** `references/svg-document-engine.md` when building PDF-style documents.
    41	**Always read** `references/token-architecture.md` before writing any CSS variables.
    42	**Always read** `references/visual-modes.md` for the full 10-language + 5-component catalog.
    43	
    44	---
    45	
    46	## 1. The Three-Skill Pipeline
    47	
    48	Every output runs three skills in sequence — internalize this as muscle memory:
    49	
    50	```
    51	web-artifacts-builder   →   brand-guidelines   →   theme-factory
    52	    (structure)                (tokens)               (finish)
    53	```
    54	
    55	### Layer 1 — web-artifacts-builder: Structure
    56	- Decides format: single HTML, React JSX, multi-page SVG, PPTX, DOCX
    57	- Enforces: no `position:fixed` inside `show_widget`, faux-viewport wrapper for modals
    58	- Rule: build smallest format that satisfies the request
    59	
    60	### Layer 2 — brand-guidelines: Tokens (SOURCE OF TRUTH)
    61	Always start from these FORGE tokens, then remap to the selected visual mode:
    62	
    63	```css
    64	/* FORGE Base Tokens — never hardcode colors without checking these first */
    65	--forge-dark:        #141413;   /* primary text / dark bg */
    66	--forge-light:       #faf9f5;   /* light bg / text on dark */
    67	--forge-mid-gray:    #b0aea5;   /* muted / secondary */
    68	--forge-light-gray:  #e8e6dc;   /* subtle bg / borders */
    69	--forge-orange:      #d97757;   /* accent 1 — CTAs, highlights */
    70	--forge-blue:        #6a9bcc;   /* accent 2 — links, info */
    71	--forge-green:       #788c5d;   /* accent 3 — success, tags */
    72	
    73	/* FORGE Typography */
    74	--forge-heading-font: 'Poppins', Arial, sans-serif;
    75	--forge-body-font:    'Lora', Georgia, serif;
    76	--forge-mono-font:    'JetBrains Mono', 'SF Mono', Consolas, monospace;
    77	```
    78	
    79	### Layer 3 — theme-factory: Finish
    80	- Default implicit theme: **Modern Minimalist** (clean base + accent pops)
    81	- If user requests a mood (warmer, darker, editorial), pick the nearest preset
    82	- Always remap through brand-guidelines before applying
    83	
    84	---
    85	
    86	## 2. Visual Mode Quick-Select
    87	
    88	Read `references/visual-modes.md` for full specs. Quick trigger guide:
    89	
    90	| Mode | Use when | Palette signal | Typography |
    91	|---|---|---|---|
    92	| **Executive Swiss** | Reports, PDFs, proposals, B2B decks | Navy `#1A2744` + slate + white space | Sans-serif grid, heavy hierarchy |
    93	| **SaaS Premium** | Landing pages, product, AI-first | Gradient cards, thin borders | Crisp modern sans |
    94	| **Enterprise Dashboard** | Ops panels, metrics, BI tools | Dense gray + blue accent | Mono + compact sans |
    95	| **Public Service** | Forms, onboarding, questionnaires | High contrast, plain | Accessible, large labels |
    96	| **Editorial Premium** | Manifestos, whitepapers, thought-leadership | Serif/sans contrast, large type | Playfair + Montserrat |
    97	| **McKinsey Consulting** | Strategy decks, due diligence | Navy `#1A2744`, boxed insights | Clean sans, analytical heads |
    98	| **Bloomberg Terminal** | Data cockpits, high-density metrics | Dark bg, functional colors | Mono, tight, no whitespace |
    99	| **Apple Product** | Premium UX, consumer product | White, generous space, subtle depth | Large, single-weight clean |
   100	| **Material Design** | Apps, dashboards, prototypes | Cards with elevation, primary color | Roboto-style, component-driven |
   101	| **Linear/Vercel** | Dev tools, AI product, SaaS tech | Dark/neutral, thin borders | Precision mono/sans |
   102	
   103	**Default mode: Executive Swiss**
   104	
   105	---
   106	
   107	## 3. Component System Quick-Select
   108	
   109	| System | Use when | Key components |
   110	|---|---|---|
   111	| **shadcn/ui Inspired** | Modern product, clean cards | Rounded panels, minimal buttons, badges, tabs |
   112	| **Tailwind Utility** | Fast layout, responsive grids | Utility tokens, auto-fit grids |
   113	| **IBM Carbon** | Enterprise, B2B, data-heavy | Dense tables, structured panels, accessible |
   114	| **Material Design** | Apps, interactive, mobile-first | Elevation cards, FAB, predictable controls |
   115	| **Ant Design** | Admin, SaaS, ops panels | Status chips, compact tables, tags |
   116	
   117	**Default system: shadcn/ui Inspired**
   118	
   119	---
   120	
   121	## 4. Master Token Architecture
   122	
   123	Paste this block at the top of every artifact. Visual modes override these variables —
   124	never hardcode values below without going through this system.
   125	
   126	```css
   127	:root {
   128	  /* ── Surfaces ── */
   129	  --bg:            #faf9f5;
   130	  --bg-surface:    #ffffff;
   131	  --bg-elevated:   #ffffff;
   132	  --bg-subtle:     #e8e6dc;
   133	
   134	  /* ── Text ── */
   135	  --text-primary:   #141413;
   136	  --text-secondary: #b0aea5;
   137	  --text-on-dark:   #faf9f5;
   138	
   139	  /* ── Borders ── */
   140	  --border:         rgba(0,0,0,0.08);
   141	  --border-strong:  rgba(0,0,0,0.18);
   142	
   143	  /* ── Accent palette ── */
   144	  --accent:         #d97757;   /* orange */
   145	  --accent-soft:    #f5ddd5;
   146	  --accent-2:       #6a9bcc;   /* blue */
   147	  --accent-2-soft:  #d6e8f5;
   148	  --accent-3:       #788c5d;   /* green */
   149	  --success:        #43A047;
   150	  --warning:        #FF8F00;
   151	  --danger:         #ff6b6b;
   152	  --info:           #2196F3;
   153	
   154	  /* ── Typography ── */
   155	  --font-heading:   'Poppins', Arial, sans-serif;
   156	  --font-body:      'Lora', Georgia, serif;
   157	  --font-mono:      'JetBrains Mono', 'SF Mono', Consolas, monospace;
   158	  --font-ui:        'Montserrat', -apple-system, sans-serif;
   159	
   160	  /* ── Scale ── */
   161	  --text-xs:   11px;
   162	  --text-sm:   13px;
   163	  --text-base: 16px;
   164	  --text-lg:   20px;
   165	  --text-xl:   28px;
   166	  --text-2xl:  40px;
   167	  --text-3xl:  60px;
   168	
   169	  /* ── Spacing ── */
   170	  --space-xs:  8px;
   171	  --space-sm:  16px;
   172	  --space-md:  24px;
   173	  --space-lg:  36px;
   174	  --space-xl:  60px;
   175	
   176	  /* ── Radius ── */
   177	  --radius-sm:  4px;
   178	  --radius-md:  8px;
   179	  --radius-lg:  12px;
   180	  --radius-xl:  20px;
   181	  --radius-pill: 9999px;
   182	
   183	  /* ── Shadow ── */
   184	  --shadow-sm:  0 2px 8px rgba(0,0,0,0.06);
   185	  --shadow-md:  0 8px 24px rgba(0,0,0,0.10);
   186	  --shadow-lg:  0 20px 60px rgba(0,0,0,0.15);
   187	  --shadow-modal: 0 32px 80px rgba(0,0,0,0.45);
   188	
   189	  /* ── Grid density ── */
   190	  --density-gap:  16px;
   191	  --density-pad:  20px;
   192	  --table-row-h:  48px;
   193	}
   194	```
   195	
   196	### Mode overrides (apply via JS class toggle on `<body>` or `:root`)
   197	
   198	```js
   199	const STYLE_MODES = {
   200	  'executive-swiss': {
   201	    '--bg': '#f4f7fa', '--bg-surface': '#ffffff',
   202	    '--text-primary': '#0a1526', '--text-secondary': '#64748b',
   203	    '--accent': '#1a365d', '--accent-soft': '#dbeafe',
   204	    '--accent-2': '#2196F3', '--font-heading': "'Montserrat', sans-serif",
   205	    '--font-body': "'Merriweather', serif", '--radius-md': '4px',
   206	    '--shadow-md': '0 4px 16px rgba(0,0,0,0.06)',
   207	  },
   208	  'saas-premium': {
   209	    '--bg': '#0f0f0f', '--bg-surface': '#1a1a1a',
   210	    '--text-primary': '#f0f0f0', '--text-secondary': '#888',
   211	    '--accent': '#d97757', '--accent-2': '#6a9bcc',
	< truncated lines 212-261 >
   262	
   263	```html
   264	<!-- Control panel — renders as floating panel or top bar -->
   265	<div id="controls">
   266	  <!-- Visual language -->
   267	  <select id="style-mode">
   268	    <option value="executive-swiss">Executive Swiss</option>
   269	    <option value="saas-premium">SaaS Premium</option>
   270	    <option value="enterprise-dashboard">Enterprise Dashboard</option>
   271	    <option value="public-service">Public Service</option>
   272	    <option value="editorial-premium">Editorial Premium</option>
   273	  </select>
   274	
   275	  <!-- Component system -->
   276	  <select id="component-mode">
   277	    <option value="shadcn">shadcn/ui Inspired</option>
   278	    <option value="tailwind">Tailwind Utility</option>
   279	    <option value="carbon">IBM Carbon</option>
   280	    <option value="material">Material Design</option>
   281	    <option value="antd">Ant Design</option>
   282	  </select>
   283	
   284	  <!-- Density -->
   285	  <select id="density">
   286	    <option value="balanced">Balanced</option>
   287	    <option value="executive">Executive</option>
   288	    <option value="dense">Dense</option>
   289	  </select>
   290	
   291	  <!-- Theme -->
   292	  <select id="theme">
   293	    <option value="light">Light</option>
   294	    <option value="dark">Dark</option>
   295	  </select>
   296	</div>
   297	```
   298	
   299	Bind selectors to immediate DOM updates via `applyTokens(mode)` — never require page reload.
   300	
   301	---
   302	
   303	## 7. SVG Chart Rules (mandatory — no external chart libs)
   304	
   305	All charts must be native SVG. Load no external chart libraries.
   306	
   307	### Bar Chart template
   308	```svg
   309	<g transform="translate(60, 280)">
   310	  <!-- Axes -->
   311	  <line x1="0" y1="350" x2="674" y2="350" stroke="var(--border-strong)" stroke-width="1.5"/>
   312	  <line x1="0" y1="0"   x2="0"   y2="350" stroke="var(--border-strong)" stroke-width="1.5"/>
   313	  <!-- Bars via <rect> positioned with JS or hardcoded -->
   314	  <!-- Labels via <text class="f-mono"> -->
   315	</g>
   316	```
   317	
   318	### Trend Line template
   319	```svg
   320	<path d="M 0 300 C 200 290, 400 200, 674 50"
   321	      fill="none" stroke="var(--accent)" stroke-width="3"/>
   322	<path d="M 0 300 C 200 290, 400 200, 674 50 V 350 H 0 Z"
   323	      fill="var(--accent)" opacity="0.08"/>
   324	```
   325	
   326	### Gauge / Ring template
   327	```svg
   328	<circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-subtle)" stroke-width="10"/>
   329	<circle cx="60" cy="60" r="50" fill="none" stroke="var(--accent)" stroke-width="10"
   330	        stroke-dasharray="188 314" stroke-linecap="round"
   331	        transform="rotate(-90 60 60)"/>
   332	```
   333	
   334	---
   335	
   336	## 8. PDF-Style Document Pattern (Neuroexecução architecture)
   337	
   338	When building multi-page A4 documents, use this proven architecture:
   339	
   340	```html
   341	<!-- Global SVG defs (hidden, shared across all pages) -->
   342	<svg width="0" height="0" style="position:absolute;">
   343	  <defs>
   344	    <linearGradient id="bgDark" x1="0%" y1="0%" x2="100%" y2="100%">
   345	      <stop offset="0%" style="stop-color:#1a365d"/>
   346	      <stop offset="100%" style="stop-color:#0a1526"/>
   347	    </linearGradient>
   348	    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
   349	      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
   350	    </pattern>
   351	    <filter id="noise">
   352	      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
   353	      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"/>
   354	      <feComposite operator="in" in2="SourceGraphic"/>
   355	      <feBlend in="SourceGraphic" mode="multiply"/>
   356	    </filter>
   357	    <filter id="shadow">
   358	      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000" flood-opacity="0.08"/>
   359	    </filter>
   360	    <!-- Reusable icon symbols -->
   361	    <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   362	      <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>
   363	    </symbol>
   364	    <symbol id="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   365	      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
   366	    </symbol>
   367	    <symbol id="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
   368	      <path d="M5 12h14M12 5l7 7-7 7"/>
   369	    </symbol>
   370	  </defs>
   371	</svg>
   372	
   373	<!-- Each A4 page -->
   374	<div class="a4-page">
   375	  <svg class="page-svg" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
   376	    <!-- Page content here. ViewBox = 794×1123 (A4 at 96dpi) -->
   377	    <!-- Page number: -->
   378	    <text x="734" y="1060" font-family="monospace" fill="#8898aa" font-size="12"
   379	          text-anchor="end">PG. 01</text>
   380	  </svg>
   381	</div>
   382	```
   383	
   384	```css
   385	/* A4 page setup */
   386	.a4-page {
   387	  width: 210mm; height: 297mm;
   388	  background: #fff;
   389	  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
   390	  position: relative; overflow: hidden; flex-shrink: 0;
   391	}
   392	svg.page-svg { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
   393	body { display: flex; flex-direction: column; align-items: center; gap: 40px; padding: 40px 0; }
   394	
   395	@media print {
   396	  body { background: none; padding: 0; gap: 0; display: block; }
   397	  .a4-page { box-shadow: none; break-after: page; }
   398	}
   399	```
   400	
   401	---
   402	
   403	## 9. Anti-patterns — never do these
   404	
   405	- No purple gradients as primary backgrounds
   406	- No Inter font (AI-slop default — use Poppins/Lora/Montserrat instead)
   407	- No `position:fixed` inside `show_widget` (collapses iframe)
   408	- No external chart libraries (Chart.js, Recharts, etc. for SVG docs)
   409	- No lorem ipsum placeholder text — use real content from the brief
   410	- No font-size below 11px
   411	- No font-weight 600 (use 500 or 700/800 only)
   412	- No gradients on every element — use flat surfaces, accent sparingly
   413	- No dark bg on `show_widget` outer container (transparent only)
   414	- No hardcoded hex colors bypassing the token system
   415	
   416	---
   417	
   418	## 10. Reference Files
   419	
   420	Read these when needed — do not load all at once:
   421	
   422	- `references/visual-modes.md` — Full specs for all 10 visual languages + 5 component systems
   423	- `references/token-architecture.md` — Complete CSS variable map + JS override patterns
   424	- `references/forge-brand.md` — FORGE brand system (Anthropic-inspired tokens, clone reference)
   425	- `references/svg-document-engine.md` — SVG A4 document patterns, filters, gradients, icons
   426	
   427	---
   428	
   429	## 11. Decision Tree — What to Build
   430	
   431	```
   432	User provides business content
   433	│
   434	├─ "Interactive" / style switcher / calculator requested?
   435	│   └─ Single HTML file with JS token switcher + native SVG charts
   436	│       → show_widget (under 300 lines) OR present_files (larger)
   437	│
   438	├─ "Report" / "PDF" / "Document" / multi-page requested?
   439	│   └─ A4 SVG-in-HTML architecture
   440	│       → Read svg-document-engine.md → present_files → .html
   441	│
   442	├─ "Slide deck" / "Presentation" requested?
   443	│   └─ Read pptx/SKILL.md → python-pptx → present_files → .pptx
   444	│
   445	├─ "Dashboard" / "App" / multi-view with navigation?
   446	│   └─ React JSX or full HTML with tab navigation
   447	│       → present_files → .html (or show_widget if compact)
   448	│
   449	└─ "Landing page" / "One-pager" requested?
   450	    └─ Single HTML with sections, SVG illustrations
   451	        → present_files → .html
   452	```
   453	
   454	---
   455	
   456	## 12. Quality Bar Checklist
   457	
   458	Before presenting any artifact, verify:
   459	
   460	- [ ] Token system applied — no hardcoded hex values bypassing CSS vars
   461	- [ ] Selected visual mode correctly overrides base tokens
   462	- [ ] All charts are native SVG — no external lib imports
   463	- [ ] All text uses real business content — no lorem ipsum
   464	- [ ] Typography hierarchy: heading font for titles, body font for content
   465	- [ ] Dark mode works (or explicit light-only is acceptable for print artifacts)
   466	- [ ] Style switcher updates DOM immediately without page reload
   467	- [ ] Unit economics calculator shows real numbers
   468	- [ ] Page numbers on PDF-style documents
   469	- [ ] No `position:fixed` in show_widget output
   470	- [ ] Anti-pattern list verified — none of the forbidden patterns present
   471	- [ ] Final artifact looks strategy-grade, not generic dashboard
   472	
     1	---
     2	name: theme-factory
     3	description: Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	
     8	# Theme Factory Skill
     9	
    10	This skill provides a curated collection of professional font and color themes themes, each with carefully selected color palettes and font pairings. Once a theme is chosen, it can be applied to any artifact.
    11	
    12	## Purpose
    13	
    14	To apply consistent, professional styling to presentation slide decks, use this skill. Each theme includes:
    15	- A cohesive color palette with hex codes
    16	- Complementary font pairings for headers and body text
    17	- A distinct visual identity suitable for different contexts and audiences
    18	
    19	## Usage Instructions
    20	
    21	To apply styling to a slide deck or other artifact:
    22	
    23	1. **Show the theme showcase**: Display the `theme-showcase.pdf` file to allow users to see all available themes visually. Do not make any modifications to it; simply show the file for viewing.
    24	2. **Ask for their choice**: Ask which theme to apply to the deck
    25	3. **Wait for selection**: Get explicit confirmation about the chosen theme
    26	4. **Apply the theme**: Once a theme has been chosen, apply the selected theme's colors and fonts to the deck/artifact
    27	
    28	## Themes Available
    29	
    30	The following 10 themes are available, each showcased in `theme-showcase.pdf`:
    31	
    32	1. **Ocean Depths** - Professional and calming maritime theme
    33	2. **Sunset Boulevard** - Warm and vibrant sunset colors
    34	3. **Forest Canopy** - Natural and grounded earth tones
    35	4. **Modern Minimalist** - Clean and contemporary grayscale
    36	5. **Golden Hour** - Rich and warm autumnal palette
    37	6. **Arctic Frost** - Cool and crisp winter-inspired theme
    38	7. **Desert Rose** - Soft and sophisticated dusty tones
    39	8. **Tech Innovation** - Bold and modern tech aesthetic
    40	9. **Botanical Garden** - Fresh and organic garden colors
    41	10. **Midnight Galaxy** - Dramatic and cosmic deep tones
    42	
    43	## Theme Details
    44	
    45	Each theme is defined in the `themes/` directory with complete specifications including:
    46	- Cohesive color palette with hex codes
    47	- Complementary font pairings for headers and body text
    48	- Distinct visual identity suitable for different contexts and audiences
    49	
    50	## Application Process
    51	
    52	After a preferred theme is selected:
    53	1. Read the corresponding theme file from the `themes/` directory
    54	2. Apply the specified colors and fonts consistently throughout the deck
    55	3. Ensure proper contrast and readability
    56	4. Maintain the theme's visual identity across all slides
    57	
    58	## Create your Own Theme
    59	To handle cases where none of the existing themes work for an artifact, create a custom theme. Based on provided inputs, generate a new theme similar to the ones above. Give the theme a similar name describing what the font/color combinations represent. Use any basic description provided to choose appropriate colors/fonts. After generating the theme, show it for review and verification. Following that, apply the theme as described above.
    60	
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
{"returncode":0,"stdout":"weasyprint OK\n","stderr":""}
Perfeito — `weasyprint` está disponível. Agora executo o pipeline completo: **visual-canvas-studio → theme-factory (IBM Plex + navy) → pdf skill**.
File created successfully: /mnt/user-data/outputs/az-ai-literacy-ebook.html
Now the PDF generation script:
File created successfully: /mnt/user-data/outputs/generate-pdf.py
{"returncode":0,"stdout":"══════════════════════════════════════════════════\n  A-Z da AI Literacy & AI Fluency — PDF Generator\n══════════════════════════════════════════════════\n  Input  → az-ai-literacy-ebook.html\n  Output → az-ai-literacy-ebook.pdf\n\n  [1/3] Loading HTML source...\n  [2/3] Rendering pages (fetching Google Fonts — needs internet)...\n  [3/3] PDF written successfully!\n\n  ✓ Output: /mnt/user-data/outputs/az-ai-literacy-ebook.pdf\n  ✓ Size:   98 KB  (0.1 MB)\n  ✓ Pages:  10\n\n══════════════════════════════════════════════════\n  Done. Share az-ai-literacy-ebook.pdf with\n  the marketing team.\n══════════════════════════════════════════════════\n","stderr":""}
Pipeline executado com sucesso. ✓


---

**Pipeline completo executado.** 3 arquivos entregues:

**O que cada skill fez:**

`visual-canvas-studio` construiu a arquitetura HTML: 10 páginas A4 com o token system completo, layout Executive Swiss (navy `#0B1F3A` + white space), componentes IBM Carbon para tabelas, grids e stage-cards, e `@media print` nativo.

`theme-factory` aplicou o tema customizado do seu YAML: IBM Plex Sans Condensed nos títulos, IBM Plex Serif no corpo, IBM Plex Mono nas tags/badges, palette exata navy/blue_action/gray_light — sem nenhum dos 10 temas pré-set (foi gerado on-the-fly a partir das suas especificações).

`pdf skill` usou `weasyprint` para converter HTML → PDF com as diretivas `@page { size: A4; margin: 0 }`, garantindo que cada `.page` vire exatamente uma página impressa sem cortes.

**Para o time de marketing:** basta copiar os 2 primeiros arquivos para a mesma pasta e rodar `python3 generate-pdf.py`. Precisa de internet só para carregar as IBM Plex fonts do Google Fonts.

---

**Você** _2026-05-13_

GENERATE A PY SCRPITY FOR THIS FORMULA [

---

**Claude** _2026-05-13_

3.9M	/mnt/skills/public
1.1M	/mnt/skills/public/docx
155K	/mnt/skills/public/docx.skill
1.5K	/mnt/skills/public/docx/LICENSE.txt
20K	/mnt/skills/public/docx/SKILL.md
1.1M	/mnt/skills/public/docx/scripts
14K	/mnt/skills/public/file-reading
5.5K	/mnt/skills/public/file-reading.skill
1.5K	/mnt/skills/public/file-reading/LICENSE.txt
13K	/mnt/skills/public/file-reading/SKILL.md
15K	/mnt/skills/public/frontend-design
6.0K	/mnt/skills/public/frontend-design.skill
10K	/mnt/skills/public/frontend-design/LICENSE.txt
4.5K	/mnt/skills/public/frontend-design/SKILL.md
60K	/mnt/skills/public/pdf
18K	/mnt/skills/public/pdf-reading
8.0K	/mnt/skills/public/pdf-reading.skill
1.5K	/mnt/skills/public/pdf-reading/LICENSE.txt
5.5K	/mnt/skills/public/pdf-reading/REFERENCE.md
11K	/mnt/skills/public/pdf-reading/SKILL.md
22K	/mnt/skills/public/pdf.skill
12K	/mnt/skills/public/pdf/FORMS.md
1.5K	/mnt/skills/public/pdf/LICENSE.txt
17K	/mnt/skills/public/pdf/REFERENCE.md
8.0K	/mnt/skills/public/pdf/SKILL.md
22K	/mnt/skills/public/pdf/scripts
1.2M	/mnt/skills/public/pptx
161K	/mnt/skills/public/pptx.skill
1.5K	/mnt/skills/public/pptx/LICENSE.txt
11K	/mnt/skills/public/pptx/SKILL.md
7.0K	/mnt/skills/public/pptx/editing.md
15K	/mnt/skills/public/pptx/pptxgenjs.md
1.1M	/mnt/skills/public/pptx/scripts
3.0K	/mnt/skills/public/product-self-knowledge
1.5K	/mnt/skills/public/product-self-knowledge.skill
3.0K	/mnt/skills/public/product-self-knowledge/SKILL.md
1.1M	/mnt/skills/public/xlsx
148K	/mnt/skills/public/xlsx.skill
1.5K	/mnt/skills/public/xlsx/LICENSE.txt
12K	/mnt/skills/public/xlsx/SKILL.md
1.1M	/mnt/skills/public/xlsx/scripts

{"returncode":0,"stdout":"deps OK\n","stderr":""}
File created successfully: /mnt/user-data/outputs/bench_creator.py
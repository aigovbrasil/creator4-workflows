---
title: "Interactive ebook showroom with algorithmic art styles"
date: 2026-04-29
account: leonardopimentel.knh@gmail.com
uuid: 10861471-808d-4288-a408-614e8f64363c
messages: 2
tags: []
context: ""
---

**Você** _2026-04-29_

/visual-canvas-studio  Create AI artifcat-jsx Ebook interativo that is an show room of the cross diferent styles and formats fir navegate with antropic /brand-guidelines and dark and ligth. level it up use /algorithmic-art and /canvas-design delivery the artfcat under > /web-artifacts-builder ! the metada in is an explanetion of the stlyes.

---

**Claude** _2026-04-29_

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
     2	name: brand-guidelines
     3	description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	# Anthropic Brand Styling
     8	
     9	## Overview
    10	
    11	To access Anthropic's official brand identity and style resources, use this skill.
    12	
    13	**Keywords**: branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, Anthropic brand, visual formatting, visual design
    14	
    15	## Brand Guidelines
    16	
    17	### Colors
    18	
    19	**Main Colors:**
    20	
    21	- Dark: `#141413` - Primary text and dark backgrounds
    22	- Light: `#faf9f5` - Light backgrounds and text on dark
    23	- Mid Gray: `#b0aea5` - Secondary elements
    24	- Light Gray: `#e8e6dc` - Subtle backgrounds
    25	
    26	**Accent Colors:**
    27	
    28	- Orange: `#d97757` - Primary accent
    29	- Blue: `#6a9bcc` - Secondary accent
    30	- Green: `#788c5d` - Tertiary accent
    31	
    32	### Typography
    33	
    34	- **Headings**: Poppins (with Arial fallback)
    35	- **Body Text**: Lora (with Georgia fallback)
    36	- **Note**: Fonts should be pre-installed in your environment for best results
    37	
    38	## Features
    39	
    40	### Smart Font Application
    41	
    42	- Applies Poppins font to headings (24pt and larger)
    43	- Applies Lora font to body text
    44	- Automatically falls back to Arial/Georgia if custom fonts unavailable
    45	- Preserves readability across all systems
    46	
    47	### Text Styling
    48	
    49	- Headings (24pt+): Poppins font
    50	- Body text: Lora font
    51	- Smart color selection based on background
    52	- Preserves text hierarchy and formatting
    53	
    54	### Shape and Accent Colors
    55	
    56	- Non-text shapes use accent colors
    57	- Cycles through orange, blue, and green accents
    58	- Maintains visual interest while staying on-brand
    59	
    60	## Technical Details
    61	
    62	### Font Management
    63	
    64	- Uses system-installed Poppins and Lora fonts when available
    65	- Provides automatic fallback to Arial (headings) and Georgia (body)
    66	- No font installation required - works with existing system fonts
    67	- For best results, pre-install Poppins and Lora fonts in your environment
    68	
    69	### Color Application
    70	
    71	- Uses RGB color values for precise brand matching
    72	- Applied via python-pptx's RGBColor class
    73	- Maintains color fidelity across different systems
    74	
     1	---
     2	name: algorithmic-art
     3	description: Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or particle systems. Create original algorithmic art rather than copying existing artists' work to avoid copyright violations.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	Algorithmic philosophies are computational aesthetic movements that are then expressed through code. Output .md files (philosophy), .html files (interactive viewer), and .js files (generative algorithms).
     8	
     9	This happens in two steps:
    10	1. Algorithmic Philosophy Creation (.md file)
    11	2. Express by creating p5.js generative art (.html + .js files)
    12	
    13	First, undertake this task:
    14	
    15	## ALGORITHMIC PHILOSOPHY CREATION
    16	
    17	To begin, create an ALGORITHMIC PHILOSOPHY (not static images or templates) that will be interpreted through:
    18	- Computational processes, emergent behavior, mathematical beauty
    19	- Seeded randomness, noise fields, organic systems
    20	- Particles, flows, fields, forces
    21	- Parametric variation and controlled chaos
    22	
    23	### THE CRITICAL UNDERSTANDING
    24	- What is received: Some subtle input or instructions by the user to take into account, but use as a foundation; it should not constrain creative freedom.
    25	- What is created: An algorithmic philosophy/generative aesthetic movement.
    26	- What happens next: The same version receives the philosophy and EXPRESSES IT IN CODE - creating p5.js sketches that are 90% algorithmic generation, 10% essential parameters.
    27	
    28	Consider this approach:
    29	- Write a manifesto for a generative art movement
    30	- The next phase involves writing the algorithm that brings it to life
    31	
    32	The philosophy must emphasize: Algorithmic expression. Emergent behavior. Computational beauty. Seeded variation.
    33	
    34	### HOW TO GENERATE AN ALGORITHMIC PHILOSOPHY
    35	
    36	**Name the movement** (1-2 words): "Organic Turbulence" / "Quantum Harmonics" / "Emergent Stillness"
    37	
    38	**Articulate the philosophy** (4-6 paragraphs - concise but complete):
    39	
    40	To capture the ALGORITHMIC essence, express how this philosophy manifests through:
    41	- Computational processes and mathematical relationships?
    42	- Noise functions and randomness patterns?
    43	- Particle behaviors and field dynamics?
    44	- Temporal evolution and system states?
    45	- Parametric variation and emergent complexity?
    46	
    47	**CRITICAL GUIDELINES:**
    48	- **Avoid redundancy**: Each algorithmic aspect should be mentioned once. Avoid repeating concepts about noise theory, particle dynamics, or mathematical principles unless adding new depth.
    49	- **Emphasize craftsmanship REPEATEDLY**: The philosophy MUST stress multiple times that the final algorithm should appear as though it took countless hours to develop, was refined with care, and comes from someone at the absolute top of their field. This framing is essential - repeat phrases like "meticulously crafted algorithm," "the product of deep computational expertise," "painstaking optimization," "master-level implementation."
    50	- **Leave creative space**: Be specific about the algorithmic direction, but concise enough that the next Claude has room to make interpretive implementation choices at an extremely high level of craftsmanship.
    51	
    52	The philosophy must guide the next version to express ideas ALGORITHMICALLY, not through static images. Beauty lives in the process, not the final frame.
    53	
    54	### PHILOSOPHY EXAMPLES
    55	
    56	**"Organic Turbulence"**
    57	Philosophy: Chaos constrained by natural law, order emerging from disorder.
    58	Algorithmic expression: Flow fields driven by layered Perlin noise. Thousands of particles following vector forces, their trails accumulating into organic density maps. Multiple noise octaves create turbulent regions and calm zones. Color emerges from velocity and density - fast particles burn bright, slow ones fade to shadow. The algorithm runs until equilibrium - a meticulously tuned balance where every parameter was refined through countless iterations by a master of computational aesthetics.
    59	
    60	**"Quantum Harmonics"**
    61	Philosophy: Discrete entities exhibiting wave-like interference patterns.
    62	Algorithmic expression: Particles initialized on a grid, each carrying a phase value that evolves through sine waves. When particles are near, their phases interfere - constructive interference creates bright nodes, destructive creates voids. Simple harmonic motion generates complex emergent mandalas. The result of painstaking frequency calibration where every ratio was carefully chosen to produce resonant beauty.
    63	
    64	**"Recursive Whispers"**
    65	Philosophy: Self-similarity across scales, infinite depth in finite space.
    66	Algorithmic expression: Branching structures that subdivide recursively. Each branch slightly randomized but constrained by golden ratios. L-systems or recursive subdivision generate tree-like forms that feel both mathematical and organic. Subtle noise perturbations break perfect symmetry. Line weights diminish with each recursion level. Every branching angle the product of deep mathematical exploration.
    67	
    68	**"Field Dynamics"**
    69	Philosophy: Invisible forces made visible through their effects on matter.
    70	Algorithmic expression: Vector fields constructed from mathematical functions or noise. Particles born at edges, flowing along field lines, dying when they reach equilibrium or boundaries. Multiple fields can attract, repel, or rotate particles. The visualization shows only the traces - ghost-like evidence of invisible forces. A computational dance meticulously choreographed through force balance.
    71	
    72	**"Stochastic Crystallization"**
    73	Philosophy: Random processes crystallizing into ordered structures.
    74	Algorithmic expression: Randomized circle packing or Voronoi tessellation. Start with random points, let them evolve through relaxation algorithms. Cells push apart until equilibrium. Color based on cell size, neighbor count, or distance from center. The organic tiling that emerges feels both random and inevitable. Every seed produces unique crystalline beauty - the mark of a master-level generative algorithm.
    75	
    76	*These are condensed examples. The actual algorithmic philosophy should be 4-6 substantial paragraphs.*
    77	
    78	### ESSENTIAL PRINCIPLES
    79	- **ALGORITHMIC PHILOSOPHY**: Creating a computational worldview to be expressed through code
    80	- **PROCESS OVER PRODUCT**: Always emphasize that beauty emerges from the algorithm's execution - each run is unique
    81	- **PARAMETRIC EXPRESSION**: Ideas communicate through mathematical relationships, forces, behaviors - not static composition
    82	- **ARTISTIC FREEDOM**: The next Claude interprets the philosophy algorithmically - provide creative implementation room
    83	- **PURE GENERATIVE ART**: This is about making LIVING ALGORITHMS, not static images with randomness
    84	- **EXPERT CRAFTSMANSHIP**: Repeatedly emphasize the final algorithm must feel meticulously crafted, refined through countless iterations, the product of deep expertise by someone at the absolute top of their field in computational aesthetics
    85	
    86	**The algorithmic philosophy should be 4-6 paragraphs long.** Fill it with poetic computational philosophy that brings together the intended vision. Avoid repeating the same points. Output this algorithmic philosophy as a .md file.
    87	
    88	---
    89	
    90	## DEDUCING THE CONCEPTUAL SEED
    91	
    92	**CRITICAL STEP**: Before implementing the algorithm, identify the subtle conceptual thread from the original request.
    93	
    94	**THE ESSENTIAL PRINCIPLE**:
    95	The concept is a **subtle, niche reference embedded within the algorithm itself** - not always literal, always sophisticated. Someone familiar with the subject should feel it intuitively, while others simply experience a masterful generative composition. The algorithmic philosophy provides the computational language. The deduced concept provides the soul - the quiet conceptual DNA woven invisibly into parameters, behaviors, and emergence patterns.
    96	
    97	This is **VERY IMPORTANT**: The reference must be so refined that it enhances the work's depth without announcing itself. Think like a jazz musician quoting another song through algorithmic harmony - only those who know will catch it, but everyone appreciates the generative beauty.
    98	
    99	---
   100	
   101	## P5.JS IMPLEMENTATION
   102	
   103	With the philosophy AND conceptual framework established, express it through code. Pause to gather thoughts before proceeding. Use only the algorithmic philosophy created and the instructions below.
   104	
   105	### ⚠️ STEP 0: READ THE TEMPLATE FIRST ⚠️
   106	
   107	**CRITICAL: BEFORE writing any HTML:**
   108	
   109	1. **Read** `templates/viewer.html` using the Read tool
   110	2. **Study** the exact structure, styling, and Anthropic branding
   111	3. **Use that file as the LITERAL STARTING POINT** - not just inspiration
   112	4. **Keep all FIXED sections exactly as shown** (header, sidebar structure, Anthropic colors/fonts, seed controls, action buttons)
   113	5. **Replace only the VARIABLE sections** marked in the file's comments (algorithm, parameters, UI controls for parameters)
   114	
   115	**Avoid:**
   116	- ❌ Creating HTML from scratch
   117	- ❌ Inventing custom styling or color schemes
   118	- ❌ Using system fonts or dark themes
   119	- ❌ Changing the sidebar structure
   120	
   121	**Follow these practices:**
   122	- ✅ Copy the template's exact HTML structure
   123	- ✅ Keep Anthropic branding (Poppins/Lora fonts, light colors, gradient backdrop)
   124	- ✅ Maintain the sidebar layout (Seed → Parameters → Colors? → Actions)
   125	- ✅ Replace only the p5.js algorithm and parameter controls
   126	
   127	The template is the foundation. Build on it, don't rebuild it.
   128	
   129	---
   130	
   131	To create gallery-quality computational art that lives and breathes, use the algorithmic philosophy as the foundation.
   132	
   133	### TECHNICAL REQUIREMENTS
   134	
   135	**Seeded Randomness (Art Blocks Pattern)**:
   136	```javascript
   137	// ALWAYS use a seed for reproducibility
   138	let seed = 12345; // or hash from user input
   139	randomSeed(seed);
   140	noiseSeed(seed);
   141	```
   142	
   143	**Parameter Structure - FOLLOW THE PHILOSOPHY**:
   144	
   145	To establish parameters that emerge naturally from the algorithmic philosophy, consider: "What qualities of this system can be adjusted?"
   146	
   147	```javascript
   148	let params = {
   149	  seed: 12345,  // Always include seed for reproducibility
   150	  // colors
   151	  // Add parameters that control YOUR algorithm:
   152	  // - Quantities (how many?)
	< truncated lines 153-253 >
   254	  - Some art might be monochrome (no color controls needed)
   255	  - Decide based on the art's needs
   256	
   257	**Every artwork should have unique parameters and algorithm!** The fixed parts provide consistent UX - everything else expresses the unique vision.
   258	
   259	### REQUIRED FEATURES
   260	
   261	**1. Parameter Controls**
   262	- Sliders for numeric parameters (particle count, noise scale, speed, etc.)
   263	- Color pickers for palette colors
   264	- Real-time updates when parameters change
   265	- Reset button to restore defaults
   266	
   267	**2. Seed Navigation**
   268	- Display current seed number
   269	- "Previous" and "Next" buttons to cycle through seeds
   270	- "Random" button for random seed
   271	- Input field to jump to specific seed
   272	- Generate 100 variations when requested (seeds 1-100)
   273	
   274	**3. Single Artifact Structure**
   275	```html
   276	<!DOCTYPE html>
   277	<html>
   278	<head>
   279	  <!-- p5.js from CDN - always available -->
   280	  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
   281	  <style>
   282	    /* All styling inline - clean, minimal */
   283	    /* Canvas on top, controls below */
   284	  </style>
   285	</head>
   286	<body>
   287	  <div id="canvas-container"></div>
   288	  <div id="controls">
   289	    <!-- All parameter controls -->
   290	  </div>
   291	  <script>
   292	    // ALL p5.js code inline here
   293	    // Parameter objects, classes, functions
   294	    // setup() and draw()
   295	    // UI handlers
   296	    // Everything self-contained
   297	  </script>
   298	</body>
   299	</html>
   300	```
   301	
   302	**CRITICAL**: This is a single artifact. No external files, no imports (except p5.js CDN). Everything inline.
   303	
   304	**4. Implementation Details - BUILD THE SIDEBAR**
   305	
   306	The sidebar structure:
   307	
   308	**1. Seed (FIXED)** - Always include exactly as shown:
   309	- Seed display
   310	- Prev/Next/Random/Jump buttons
   311	
   312	**2. Parameters (VARIABLE)** - Create controls for the art:
   313	```html
   314	<div class="control-group">
   315	    <label>Parameter Name</label>
   316	    <input type="range" id="param" min="..." max="..." step="..." value="..." oninput="updateParam('param', this.value)">
   317	    <span class="value-display" id="param-value">...</span>
   318	</div>
   319	```
   320	Add as many control-group divs as there are parameters.
   321	
   322	**3. Colors (OPTIONAL/VARIABLE)** - Include if the art needs adjustable colors:
   323	- Add color pickers if users should control palette
   324	- Skip this section if the art uses fixed colors
   325	- Skip if the art is monochrome
   326	
   327	**4. Actions (FIXED)** - Always include exactly as shown:
   328	- Regenerate button
   329	- Reset button
   330	- Download PNG button
   331	
   332	**Requirements**:
   333	- Seed controls must work (prev/next/random/jump/display)
   334	- All parameters must have UI controls
   335	- Regenerate, Reset, Download buttons must work
   336	- Keep Anthropic branding (UI styling, not art colors)
   337	
   338	### USING THE ARTIFACT
   339	
   340	The HTML artifact works immediately:
   341	1. **In claude.ai**: Displayed as an interactive artifact - runs instantly
   342	2. **As a file**: Save and open in any browser - no server needed
   343	3. **Sharing**: Send the HTML file - it's completely self-contained
   344	
   345	---
   346	
   347	## VARIATIONS & EXPLORATION
   348	
   349	The artifact includes seed navigation by default (prev/next/random buttons), allowing users to explore variations without creating multiple files. If the user wants specific variations highlighted:
   350	
   351	- Include seed presets (buttons for "Variation 1: Seed 42", "Variation 2: Seed 127", etc.)
   352	- Add a "Gallery Mode" that shows thumbnails of multiple seeds side-by-side
   353	- All within the same single artifact
   354	
   355	This is like creating a series of prints from the same plate - the algorithm is consistent, but each seed reveals different facets of its potential. The interactive nature means users discover their own favorites by exploring the seed space.
   356	
   357	---
   358	
   359	## THE CREATIVE PROCESS
   360	
   361	**User request** → **Algorithmic philosophy** → **Implementation**
   362	
   363	Each request is unique. The process involves:
   364	
   365	1. **Interpret the user's intent** - What aesthetic is being sought?
   366	2. **Create an algorithmic philosophy** (4-6 paragraphs) describing the computational approach
   367	3. **Implement it in code** - Build the algorithm that expresses this philosophy
   368	4. **Design appropriate parameters** - What should be tunable?
   369	5. **Build matching UI controls** - Sliders/inputs for those parameters
   370	
   371	**The constants**:
   372	- Anthropic branding (colors, fonts, layout)
   373	- Seed navigation (always present)
   374	- Self-contained HTML artifact
   375	
   376	**Everything else is variable**:
   377	- The algorithm itself
   378	- The parameters
   379	- The UI controls
   380	- The visual outcome
   381	
   382	To achieve the best results, trust creativity and let the philosophy guide the implementation.
   383	
   384	---
   385	
   386	## RESOURCES
   387	
   388	This skill includes helpful templates and documentation:
   389	
   390	- **templates/viewer.html**: REQUIRED STARTING POINT for all HTML artifacts.
   391	  - This is the foundation - contains the exact structure and Anthropic branding
   392	  - **Keep unchanged**: Layout structure, sidebar organization, Anthropic colors/fonts, seed controls, action buttons
   393	  - **Replace**: The p5.js algorithm, parameter definitions, and UI controls in Parameters section
   394	  - The extensive comments in the file mark exactly what to keep vs replace
   395	
   396	- **templates/generator_template.js**: Reference for p5.js best practices and code structure principles.
   397	  - Shows how to organize parameters, use seeded randomness, structure classes
   398	  - NOT a pattern menu - use these principles to build unique algorithms
   399	  - Embed algorithms inline in the HTML artifact (don't create separate .js files)
   400	
   401	**Critical reminder**:
   402	- The **template is the STARTING POINT**, not inspiration
   403	- The **algorithm is where to create** something unique
   404	- Don't copy the flow field example - build what the philosophy demands
   405	- But DO keep the exact UI structure and Anthropic branding from the template
     1	---
     2	name: web-artifacts-builder
     3	description: Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	# Web Artifacts Builder
     8	
     9	To build powerful frontend claude.ai artifacts, follow these steps:
    10	1. Initialize the frontend repo using `scripts/init-artifact.sh`
    11	2. Develop your artifact by editing the generated code
    12	3. Bundle all code into a single HTML file using `scripts/bundle-artifact.sh`
    13	4. Display artifact to user
    14	5. (Optional) Test the artifact
    15	
    16	**Stack**: React 18 + TypeScript + Vite + Parcel (bundling) + Tailwind CSS + shadcn/ui
    17	
    18	## Design & Style Guidelines
    19	
    20	VERY IMPORTANT: To avoid what is often referred to as "AI slop", avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font.
    21	
    22	## Quick Start
    23	
    24	### Step 1: Initialize Project
    25	
    26	Run the initialization script to create a new React project:
    27	```bash
    28	bash scripts/init-artifact.sh <project-name>
    29	cd <project-name>
    30	```
    31	
    32	This creates a fully configured project with:
    33	- ✅ React + TypeScript (via Vite)
    34	- ✅ Tailwind CSS 3.4.1 with shadcn/ui theming system
    35	- ✅ Path aliases (`@/`) configured
    36	- ✅ 40+ shadcn/ui components pre-installed
    37	- ✅ All Radix UI dependencies included
    38	- ✅ Parcel configured for bundling (via .parcelrc)
    39	- ✅ Node 18+ compatibility (auto-detects and pins Vite version)
    40	
    41	### Step 2: Develop Your Artifact
    42	
    43	To build the artifact, edit the generated files. See **Common Development Tasks** below for guidance.
    44	
    45	### Step 3: Bundle to Single HTML File
    46	
    47	To bundle the React app into a single HTML artifact:
    48	```bash
    49	bash scripts/bundle-artifact.sh
    50	```
    51	
    52	This creates `bundle.html` - a self-contained artifact with all JavaScript, CSS, and dependencies inlined. This file can be directly shared in Claude conversations as an artifact.
    53	
    54	**Requirements**: Your project must have an `index.html` in the root directory.
    55	
    56	**What the script does**:
    57	- Installs bundling dependencies (parcel, @parcel/config-default, parcel-resolver-tspaths, html-inline)
    58	- Creates `.parcelrc` config with path alias support
    59	- Builds with Parcel (no source maps)
    60	- Inlines all assets into single HTML using html-inline
    61	
    62	### Step 4: Share Artifact with User
    63	
    64	Finally, share the bundled HTML file in conversation with the user so they can view it as an artifact.
    65	
    66	### Step 5: Testing/Visualizing the Artifact (Optional)
    67	
    68	Note: This is a completely optional step. Only perform if necessary or requested.
    69	
    70	To test/visualize the artifact, use available tools (including other Skills or built-in tools like Playwright or Puppeteer). In general, avoid testing the artifact upfront as it adds latency between the request and when the finished artifact can be seen. Test later, after presenting the artifact, if requested or if issues arise.
    71	
    72	## Reference
    73	
    74	- **shadcn/ui components**: https://ui.shadcn.com/docs/components
     1	---
     2	name: canvas-design
     3	description: Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	These are instructions for creating design philosophies - aesthetic movements that are then EXPRESSED VISUALLY. Output only .md files, .pdf files, and .png files.
     8	
     9	Complete this in two steps:
    10	1. Design Philosophy Creation (.md file)
    11	2. Express by creating it on a canvas (.pdf file or .png file)
    12	
    13	First, undertake this task:
    14	
    15	## DESIGN PHILOSOPHY CREATION
    16	
    17	To begin, create a VISUAL PHILOSOPHY (not layouts or templates) that will be interpreted through:
    18	- Form, space, color, composition
    19	- Images, graphics, shapes, patterns
    20	- Minimal text as visual accent
    21	
    22	### THE CRITICAL UNDERSTANDING
    23	- What is received: Some subtle input or instructions by the user that should be taken into account, but used as a foundation; it should not constrain creative freedom.
    24	- What is created: A design philosophy/aesthetic movement.
    25	- What happens next: Then, the same version receives the philosophy and EXPRESSES IT VISUALLY - creating artifacts that are 90% visual design, 10% essential text.
    26	
    27	Consider this approach:
    28	- Write a manifesto for an art movement
    29	- The next phase involves making the artwork
    30	
    31	The philosophy must emphasize: Visual expression. Spatial communication. Artistic interpretation. Minimal words.
    32	
    33	### HOW TO GENERATE A VISUAL PHILOSOPHY
    34	
    35	**Name the movement** (1-2 words): "Brutalist Joy" / "Chromatic Silence" / "Metabolist Dreams"
    36	
    37	**Articulate the philosophy** (4-6 paragraphs - concise but complete):
    38	
    39	To capture the VISUAL essence, express how the philosophy manifests through:
    40	- Space and form
    41	- Color and material
    42	- Scale and rhythm
    43	- Composition and balance
    44	- Visual hierarchy
    45	
    46	**CRITICAL GUIDELINES:**
    47	- **Avoid redundancy**: Each design aspect should be mentioned once. Avoid repeating points about color theory, spatial relationships, or typographic principles unless adding new depth.
    48	- **Emphasize craftsmanship REPEATEDLY**: The philosophy MUST stress multiple times that the final work should appear as though it took countless hours to create, was labored over with care, and comes from someone at the absolute top of their field. This framing is essential - repeat phrases like "meticulously crafted," "the product of deep expertise," "painstaking attention," "master-level execution."
    49	- **Leave creative space**: Remain specific about the aesthetic direction, but concise enough that the next Claude has room to make interpretive choices also at a extremely high level of craftmanship.
    50	
    51	The philosophy must guide the next version to express ideas VISUALLY, not through text. Information lives in design, not paragraphs.
    52	
    53	### PHILOSOPHY EXAMPLES
    54	
    55	**"Concrete Poetry"**
    56	Philosophy: Communication through monumental form and bold geometry.
    57	Visual expression: Massive color blocks, sculptural typography (huge single words, tiny labels), Brutalist spatial divisions, Polish poster energy meets Le Corbusier. Ideas expressed through visual weight and spatial tension, not explanation. Text as rare, powerful gesture - never paragraphs, only essential words integrated into the visual architecture. Every element placed with the precision of a master craftsman.
    58	
    59	**"Chromatic Language"**
    60	Philosophy: Color as the primary information system.
    61	Visual expression: Geometric precision where color zones create meaning. Typography minimal - small sans-serif labels letting chromatic fields communicate. Think Josef Albers' interaction meets data visualization. Information encoded spatially and chromatically. Words only to anchor what color already shows. The result of painstaking chromatic calibration.
    62	
    63	**"Analog Meditation"**
    64	Philosophy: Quiet visual contemplation through texture and breathing room.
    65	Visual expression: Paper grain, ink bleeds, vast negative space. Photography and illustration dominate. Typography whispered (small, restrained, serving the visual). Japanese photobook aesthetic. Images breathe across pages. Text appears sparingly - short phrases, never explanatory blocks. Each composition balanced with the care of a meditation practice.
    66	
    67	**"Organic Systems"**
    68	Philosophy: Natural clustering and modular growth patterns.
    69	Visual expression: Rounded forms, organic arrangements, color from nature through architecture. Information shown through visual diagrams, spatial relationships, iconography. Text only for key labels floating in space. The composition tells the story through expert spatial orchestration.
    70	
    71	**"Geometric Silence"**
    72	Philosophy: Pure order and restraint.
    73	Visual expression: Grid-based precision, bold photography or stark graphics, dramatic negative space. Typography precise but minimal - small essential text, large quiet zones. Swiss formalism meets Brutalist material honesty. Structure communicates, not words. Every alignment the work of countless refinements.
    74	
    75	*These are condensed examples. The actual design philosophy should be 4-6 substantial paragraphs.*
    76	
    77	### ESSENTIAL PRINCIPLES
    78	- **VISUAL PHILOSOPHY**: Create an aesthetic worldview to be expressed through design
    79	- **MINIMAL TEXT**: Always emphasize that text is sparse, essential-only, integrated as visual element - never lengthy
    80	- **SPATIAL EXPRESSION**: Ideas communicate through space, form, color, composition - not paragraphs
    81	- **ARTISTIC FREEDOM**: The next Claude interprets the philosophy visually - provide creative room
    82	- **PURE DESIGN**: This is about making ART OBJECTS, not documents with decoration
    83	- **EXPERT CRAFTSMANSHIP**: Repeatedly emphasize the final work must look meticulously crafted, labored over with care, the product of countless hours by someone at the top of their field
    84	
    85	**The design philosophy should be 4-6 paragraphs long.** Fill it with poetic design philosophy that brings together the core vision. Avoid repeating the same points. Keep the design philosophy generic without mentioning the intention of the art, as if it can be used wherever. Output the design philosophy as a .md file.
    86	
    87	---
    88	
    89	## DEDUCING THE SUBTLE REFERENCE
    90	
    91	**CRITICAL STEP**: Before creating the canvas, identify the subtle conceptual thread from the original request.
    92	
    93	**THE ESSENTIAL PRINCIPLE**:
    94	The topic is a **subtle, niche reference embedded within the art itself** - not always literal, always sophisticated. Someone familiar with the subject should feel it intuitively, while others simply experience a masterful abstract composition. The design philosophy provides the aesthetic language. The deduced topic provides the soul - the quiet conceptual DNA woven invisibly into form, color, and composition.
    95	
    96	This is **VERY IMPORTANT**: The reference must be refined so it enhances the work's depth without announcing itself. Think like a jazz musician quoting another song - only those who know will catch it, but everyone appreciates the music.
    97	
    98	---
    99	
   100	## CANVAS CREATION
   101	
   102	With both the philosophy and the conceptual framework established, express it on a canvas. Take a moment to gather thoughts and clear the mind. Use the design philosophy created and the instructions below to craft a masterpiece, embodying all aspects of the philosophy with expert craftsmanship.
   103	
   104	**IMPORTANT**: For any type of content, even if the user requests something for a movie/game/book, the approach should still be sophisticated. Never lose sight of the idea that this should be art, not something that's cartoony or amateur.
   105	
   106	To create museum or magazine quality work, use the design philosophy as the foundation. Create one single page, highly visual, design-forward PDF or PNG output (unless asked for more pages). Generally use repeating patterns and perfect shapes. Treat the abstract philosophical design as if it were a scientific bible, borrowing the visual language of systematic observation—dense accumulation of marks, repeated elements, or layered patterns that build meaning through patient repetition and reward sustained viewing. Add sparse, clinical typography and systematic reference markers that suggest this could be a diagram from an imaginary discipline, treating the invisible subject with the same reverence typically reserved for documenting observable phenomena. Anchor the piece with simple phrase(s) or details positioned subtly, using a limited color palette that feels intentional and cohesive. Embrace the paradox of using analytical visual language to express ideas about human experience: the result should feel like an artifact that proves something ephemeral can be studied, mapped, and understood through careful attention. This is true art. 
   107	
   108	**Text as a contextual element**: Text is always minimal and visual-first, but let context guide whether that means whisper-quiet labels or bold typographic gestures. A punk venue poster might have larger, more aggressive type than a minimalist ceramics studio identity. Most of the time, font should be thin. All use of fonts must be design-forward and prioritize visual communication. Regardless of text scale, nothing falls off the page and nothing overlaps. Every element must be contained within the canvas boundaries with proper margins. Check carefully that all text, graphics, and visual elements have breathing room and clear separation. This is non-negotiable for professional execution. **IMPORTANT: Use different fonts if writing text. Search the `./canvas-fonts` directory. Regardless of approach, sophistication is non-negotiable.**
   109	
   110	Download and use whatever fonts are needed to make this a reality. Get creative by making the typography actually part of the art itself -- if the art is abstract, bring the font onto the canvas, not typeset digitally.
   111	
   112	To push boundaries, follow design instinct/intuition while using the philosophy as a guiding principle. Embrace ultimate design freedom and choice. Push aesthetics and design to the frontier. 
   113	
   114	**CRITICAL**: To achieve human-crafted quality (not AI-generated), create work that looks like it took countless hours. Make it appear as though someone at the absolute top of their field labored over every detail with painstaking care. Ensure the composition, spacing, color choices, typography - everything screams expert-level craftsmanship. Double-check that nothing overlaps, formatting is flawless, every detail perfect. Create something that could be shown to people to prove expertise and rank as undeniably impressive.
   115	
   116	Output the final result as a single, downloadable .pdf or .png file, alongside the design philosophy used as a .md file.
   117	
   118	---
   119	
   120	## FINAL STEP
   121	
   122	**IMPORTANT**: The user ALREADY said "It isn't perfect enough. It must be pristine, a masterpiece if craftsmanship, as if it were about to be displayed in a museum."
   123	
   124	**CRITICAL**: To refine the work, avoid adding more graphics; instead refine what has been created and make it extremely crisp, respecting the design philosophy and the principles of minimalism entirely. Rather than adding a fun filter or refactoring a font, consider how to make the existing composition more cohesive with the art. If the instinct is to call a new function or draw a new shape, STOP and instead ask: "How can I make what's already here more of a piece of art?"
   125	
   126	Take a second pass. Go back to the code and refine/polish further to make this a philosophically designed masterpiece.
   127	
   128	## MULTI-PAGE OPTION
   129	
   130	To create additional pages when requested, create more creative pages along the same lines as the design philosophy but distinctly different as well. Bundle those pages in the same .pdf or many .pngs. Treat the first page as just a single page in a whole coffee table book waiting to be filled. Make the next pages unique twists and memories of the original. Have them almost tell a story in a very tasteful way. Exercise full creative freedom.
Now I have all the context. Let me initialize the web artifacts builder and construct this masterpiece.
{"returncode":0,"stdout":"LICENSE.txt\nSKILL.md\nscripts\nbundle-artifact.sh\ninit-artifact.sh\nshadcn-components.tar.gz\n","stderr":""}
{"returncode":0,"stdout":"bash: /mnt/skills/examples/web-artifacts-builder/init-artifact.sh: No such file or directory\n","stderr":""}
{"returncode":0,"stdout":"bundle-artifact.sh\ninit-artifact.sh\nshadcn-components.tar.gz\n","stderr":""}
Error running command
{"returncode":0,"stdout":"#!/bin/bash\n\n# Exit on error\nset -e\n\n# Detect Node version\nNODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)\n\necho \"🔍 Detected Node.js version: $NODE_VERSION\"\n\nif [ \"$NODE_VERSION\" -lt 18 ]; then\n  echo \"❌ Error: Node.js 18 or higher is required\"\n  echo \"   Current version: $(node -v)\"\n  exit 1\nfi\n\n# Set Vite version based on Node version\nif [ \"$NODE_VERSION\" -ge 20 ]; then\n  VITE_VERSION=\"latest\"\n  echo \"✅ Using Vite latest (Node 20+)\"\nelse\n  VITE_VERSION=\"5.4.11\"\n  echo \"✅ Using Vite $VITE_VERSION (Node 18 compatible)\"\nfi\n\n# Detect OS and set sed syntax\nif [[ \"$OSTYPE\" == \"darwin\"* ]]; then\n  SED_INPLACE=\"sed -i ''\"\nelse\n  SED_INPLACE=\"sed -i\"\nfi\n\n# Check if pnpm is installed\nif ! command -v pnpm &> /dev/null; then\n  echo \"📦 pnpm not found. Installing pnpm...\"\n  npm install -g pnpm\nfi\n\n# Check if project name is provided\nif [ -z \"$1\" ]; then\n","stderr":""}
{"returncode":0,"stdout":"🔍 Detected Node.js version: 22\n✅ Using Vite latest (Node 20+)\n🚀 Creating new React + Vite project: ebook-studio\n└  Operation cancelled\n\n🧹 Cleaning up Vite template...\n📦 Installing base dependencies...\nLockfile is up to date, resolution step is skipped\nAlready up to date\n\nDone in 1.8s using pnpm v10.33.2\n📦 Installing Tailwind CSS and dependencies...\nProgress: resolved 0, reused 1, downloaded 0, added 0\nProgress: resolved 46, reused 46, downloaded 0, added 0\nProgress: resolved 48, reused 48, downloaded 0, added 0\nProgress: resolved 124, reused 123, downloaded 0, added 0\nProgress: resolved 218, reused 191, downloaded 0, added 0\nAlready up to date\nProgress: resolved 337, reused 312, downloaded 0, added 0\nProgress: resolved 337, reused 312, downloaded 0, added 0, done\n\nDone in 6.2s using pnpm v10.33.2\nProgress: resolved 0, reused 1, downloaded 0, added 0\nProgress: resolved 15, reused 15, downloaded 0, added 0\nProgress: resolved 50, reused 50, downloaded 0, added 0\nProgress: resolved 140, reused 125, downloaded 0, added 0\nProgress: resolved 226, reused 199, downloaded 0, added 0\nAlready up to date\nProgress: resolved 337, reused 312, downloaded 0, added 0\nProgress: resolved 337, reused 312, downloaded 0, added 0, done\n\nDone in 6.1s using pnpm v10.33.2\n⚙️  Creating Tailwind and PostCSS configuration...\n📝 Configuring Tailwind with shadcn theme...\n🎨 Adding Tailwind directives and CSS variables...\n🔧 Adding path aliases to tsconfig.json...\n🔧 Adding path aliases to tsconfig.app.json...\n⚙️  Updating Vite configuration...\n📦 Installing shadcn/ui dependencies...\nProgress: resolved 0, reused 1, downloaded 0, added 0\n","stderr":""}
{"returncode":0,"stdout":"📝 Creating components.json config...\n✅ Setup complete! You can now use Tailwind CSS and shadcn/ui in your project.\n\n📦 Included components (40+ total):\n  - accordion, alert, aspect-ratio, avatar, badge, breadcrumb\n  - button, calendar, card, carousel, checkbox, collapsible\n  - command, context-menu, dialog, drawer, dropdown-menu\n  - form, hover-card, input, label, menubar, navigation-menu\n  - popover, progress, radio-group, resizable, scroll-area\n  - select, separator, sheet, skeleton, slider, sonner\n  - switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip\n\nTo start developing:\n  cd ebook-studio\n  pnpm dev\n\n📚 Import components like:\n  import { Button } from '@/components/ui/button'\n  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'\n  import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'\n","stderr":""}
Now let me build the full interactive eBook. This will be a masterpiece showcasing all design styles with algorithmic art:
File already exists: /home/claude/ebook-studio/src/App.tsx
{"returncode":0,"stdout":"Done\n","stderr":""}
{"returncode":0,"stdout":"@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n    --background: 0 0% 100%;\n    --foreground: 0 0% 3.9%;\n    --card: 0 0% 100%;\n    --card-foreground: 0 0% 3.9%;\n    --popover: 0 0% 100%;\n    --popover-foreground: 0 0% 3.9%;\n    --primary: 0 0% 9%;\n    --primary-foreground: 0 0% 98%;\n    --secondary: 0 0% 96.1%;\n    --secondary-foreground: 0 0% 9%;\n    --muted: 0 0% 96.1%;\n    --muted-foreground: 0 0% 45.1%;\n    --accent: 0 0% 96.1%;\n    --accent-foreground: 0 0% 9%;\n","stderr":""}
{"returncode":0,"stdout":"@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&family=Lora:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap');\n@tailwind base;\n@tailwind components;\n","stderr":""}
{"returncode":0,"stdout":"CSS done\n","stderr":""}
{"returncode":0,"stdout":"\n> ebook-studio@0.0.0 build /home/claude/ebook-studio\n> tsc -b && vite build\n\ntsconfig.app.json(24,5): error TS5101: Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '\"ignoreDeprecations\": \"6.0\"' to silence this error.\n  Visit https://aka.ms/ts6 for migration information.\n ELIFECYCLE  Command failed with exit code 2.\n","stderr":""}
{"returncode":0,"stdout":"Fixed\n","stderr":""}
{"returncode":0,"stdout":"\n> ebook-studio@0.0.0 build /home/claude/ebook-studio\n> tsc -b && vite build\n\nsrc/App.tsx(352,9): error TS6133: 'surface' is declared but its value is never read.\nsrc/App.tsx(355,31): error TS2503: Cannot find namespace 'JSX'.\nsrc/components/ui/resizable.tsx(9,51): error TS2339: Property 'PanelGroup' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(10,23): error TS2339: Property 'PanelGroup' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(25,51): error TS2339: Property 'PanelResizeHandle' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(28,23): error TS2339: Property 'PanelResizeHandle' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(40,24): error TS2339: Property 'PanelResizeHandle' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\n ELIFECYCLE  Command failed with exit code 2.\n","stderr":""}
{"returncode":0,"stdout":"import { useState, useEffect, useRef, useCallback } from \"react\"\n","stderr":""}
{"returncode":0,"stdout":"import React, { useState, useEffect, useRef, useCallback } from \"react\"\n","stderr":""}
{"returncode":0,"stdout":"\n> ebook-studio@0.0.0 build /home/claude/ebook-studio\n> tsc -b && vite build\n\nsrc/App.tsx(558,39): error TS2304: Cannot find name 'surface'.\nsrc/App.tsx(562,39): error TS2304: Cannot find name 'surface'.\nsrc/App.tsx(574,37): error TS2304: Cannot find name 'surface'.\nsrc/App.tsx(586,49): error TS2304: Cannot find name 'surface'.\n ELIFECYCLE  Command failed with exit code 2.\n","stderr":""}
{"returncode":0,"stdout":"              <div style={{ fontFamily: \"'Poppins', sans-serif\", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: BRAND.orange }}>{chapter.meta.movement}</div>\n            </div>\n            <h1 style={{ fontFamily: \"'Poppins', sans-serif\", fontSize: \"clamp(24px,5vw,38px)\", fontWeight: 800, color: text, lineHeight: 1.1, marginBottom: 6, letterSpacing: -0.5 }}>{chapter.title}</h1>\n            <div style={{ fontFamily: \"'Lora', Georgia, serif\", fontSize: 14, fontStyle: \"italic\", color: isDark ? BRAND.midGray : \"#888\" }}>{chapter.subtitle}</div>\n          </div>\n\n          {/* 2-col */}\n          <div style={{ display: \"grid\", gridTemplateColumns: \"1fr 1fr\", gap: 16, marginBottom: 20 }}>\n            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: 18, boxShadow: isDark ? \"0 4px 24px rgba(0,0,0,0.3)\" : \"0 4px 24px rgba(0,0,0,0.05)\" }}>\n              <div style={{ fontFamily: \"'Poppins', sans-serif\", fontSize: 8, fontWeight: 700, letterSpacing: 2, color: BRAND.midGray, marginBottom: 12 }}>STYLE PREVIEW</div>\n              <StyleDemo chapter={chapter} isDark={isDark} />\n            </div>\n            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: \"hidden\", boxShadow: isDark ? \"0 4px 24px rgba(0,0,0,0.3)\" : \"0 4px 24px rgba(0,0,0,0.05)\" }}>\n              <div style={{ padding: \"10px 14px 0\" }}>\n                <div style={{ fontFamily: \"'Poppins', sans-serif\", fontSize: 8, fontWeight: 700, letterSpacing: 2, color: BRAND.midGray, marginBottom: 8 }}>GENERATIVE EXPRESSION</div>\n              </div>\n              <AlgoCanvas config={chapter.artConfig} isDark={isDark} />\n              <div style={{ padding: \"7px 14px 12px\" }}>\n                <div style={{ fontFamily: \"'Lora', Georgia, serif\", fontSize: 10, fontStyle: \"italic\", color: isDark ? BRAND.midGray : \"#aaa\" }}>Algorithmic visualization of {chapter.label.toLowerCase()} principles</div>\n              </div>\n            </div>\n          </div>\n\n          {/* Philosophy */}\n          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: \"20px 24px\", marginBottom: 16, boxShadow: isDark ? \"0 4px 24px rgba(0,0,0,0.25)\" : \"0 4px 24px rgba(0,0,0,0.04)\" }}>\n            <div style={{ display: \"flex\", alignItems: \"center\", gap: 10, marginBottom: 14 }}>\n              <div style={{ fontFamily: \"'Poppins', sans-serif\", fontSize: 8, fontWeight: 700, letterSpacing: 2, color: BRAND.orange }}>PHILOSOPHY</div>\n              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${BRAND.orange}33, transparent)` }} />\n              <div style={{ fontFamily: \"monospace\", fontSize: 9, color: isDark ? \"#555\" : \"#bbb\" }}>{chapter.meta.era}</div>\n            </div>\n            <p style={{ fontFamily: \"'Lora', Georgia, serif\", fontSize: 14, lineHeight: 1.85, color: isDark ? \"#c8c4bc\" : \"#444\", margin: 0 }}>{chapter.meta.philosophy}</p>\n          </div>\n\n          {/* Principles */}\n          <div style={{ display: \"grid\", gridTemplateColumns: \"1fr 1fr\", gap: 10, marginBottom: 28 }}>\n            {chapter.meta.principles.map((pr, i) => (\n              <div key={i} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 8, padding: \"12px 14px\", display: \"flex\", gap: 10, alignItems: \"flex-start\" }}>\n                <div style={{ width: 20, height: 20, borderRadius: \"50%\", background: BRAND.orange + \"20\", border: `1px solid ${BRAND.orange}44`, display: \"flex\", alignItems: \"center\", justifyContent: \"center\", flexShrink: 0, fontFamily: \"monospace\", fontSize: 9, fontWeight: 700, color: BRAND.orange }}>{i + 1}</div>\n                <div style={{ fontFamily: \"'Lora', Georgia, serif\", fontSize: 12, lineHeight: 1.55, color: isDark ? \"#bbb7af\" : \"#555\" }}>{pr}</div>\n              </div>\n            ))}\n          </div>\n\n          {/* Palette */}\n          <div style={{ marginBottom: 28 }}>\n            <div style={{ fontFamily: \"'Poppins', sans-serif\", fontSize: 8, fontWeight: 700, letterSpacing: 2, color: isDark ? BRAND.midGray : \"#aaa\", marginBottom: 8 }}>PALETTE SIGNATURE</div>\n            <div style={{ display: \"flex\", borderRadius: 7, overflow: \"hidden\", height: 36 }}>\n              {[p.bg, p.surface, p.accent, p.text, p.secondary].map((c, i) => (\n                <div key={i} style={{ flex: 1, background: c }} title={c} />\n              ))}\n            </div>\n","stderr":""}
{"returncode":0,"stdout":"\n> ebook-studio@0.0.0 build /home/claude/ebook-studio\n> tsc -b && vite build\n\n ELIFECYCLE  Command failed with exit code 2.\n","stderr":""}
{"returncode":0,"stdout":"src/components/ui/resizable.tsx(9,51): error TS2339: Property 'PanelGroup' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(10,23): error TS2339: Property 'PanelGroup' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(25,51): error TS2339: Property 'PanelResizeHandle' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(28,23): error TS2339: Property 'PanelResizeHandle' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\nsrc/components/ui/resizable.tsx(40,24): error TS2339: Property 'PanelResizeHandle' does not exist on type 'typeof import(\"/home/claude/ebook-studio/node_modules/.pnpm/react-resizable-panels@4.10.0_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/react-resizable-panels/dist/react-resizable-panels\")'.\n","stderr":""}
{"returncode":0,"stdout":"\u001b[2K\rtransforming...✓ 16 modules transformed.\n✓ built in 3.06s\n","stderr":""}
{"returncode":0,"stdout":"@parcel/core: Failed to resolve '/favicon.svg' from './index.html'\n\n  /home/claude/ebook-studio/index.html:5:1\n    4 |     <meta charset=\"UTF-8\" />\n  > 5 |     <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />\n  >   | ^\n    6 |     <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\n    7 |     <title>ebook-studio</title>\n\n@parcel/resolver-default: Cannot load file './favicon.svg' in './'.\n","stderr":""}
{"returncode":0,"stdout":"dist/index.html                       296 B    326ms\ndist/ebook-studio.ad712229.js     225.65 kB    613ms\ndist/ebook-studio.d26e9e15.css     41.42 kB    397ms\n🎯 Inlining all assets into single HTML file...\n\n✅ Bundle complete!\n📄 Output: bundle.html (262K)\n\nYou can now use this single HTML file as an artifact in Claude conversations.\nTo test locally: open bundle.html in your browser\n","stderr":""}
{"returncode":0,"stdout":"Copied successfully\n","stderr":""}
Here's your **Design Language Codex** — a fully interactive eBook built with React + Vite + Tailwind, bundled as a single HTML artifact. Here's what's inside:

---

**10 Chapters, each with:**
- **Style Preview** — live interactive demo rendered *in* that visual language (buttons, cards, data, code, forms)
- **Generative Expression** — a unique algorithmic art canvas, animated in real-time, philosophically tied to the style
- **Philosophy** — deep written metadata on the design movement's origins and intent
- **Core Principles** — 4 numbered first-principles of each visual system
- **Palette Signature** — a color strip showing the chapter's exact palette

**Visual Languages covered:**
`Foreword · Executive Swiss · SaaS Premium · Editorial Premium · Bloomberg Terminal · Apple Product · McKinsey Consulting · Linear/Vercel · Material Design · Public Service`

**Features:**
- ☾ **Dark / Light mode** toggle — works across all chapters
- **Collapsible sidebar** navigation with chapter icons
- **Prev/Next navigation** + dot-based progress bar
- **Algorithmic art** per chapter: particles, flow fields, matrix rain, orbital systems, wave harmonics, grid pulses, pyramid hierarchies, data lines, floating cards, pulsing dots
- **Anthropic brand tokens** throughout: `#d97757` orange · `#6a9bcc` blue · `#788c5d` green · Poppins + Lora typography
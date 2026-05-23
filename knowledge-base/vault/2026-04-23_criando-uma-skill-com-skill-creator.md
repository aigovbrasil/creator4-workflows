---
title: "Criando uma skill com Skill Creator"
date: 2026-04-23
account: leonardopimentel.knh@gmail.com
uuid: a406be17-0ea2-4daf-9fb3-5ab437f0de21
messages: 12
tags: []
context: ""
---

**Você** _2026-04-23_

Vamos criar uma Skill com Skill creator ?

---

**Claude** _2026-04-23_

{"returncode":0,"stdout":"/mnt/skills/examples/skill-creator\n/mnt/skills/examples/slack-gif-creator\n","stderr":""}
224K	/mnt/skills/examples/skill-creator
12K	/mnt/skills/examples/skill-creator/LICENSE.txt
33K	/mnt/skills/examples/skill-creator/SKILL.md
27K	/mnt/skills/examples/skill-creator/agents
11K	/mnt/skills/examples/skill-creator/agents/analyzer.md
7.5K	/mnt/skills/examples/skill-creator/agents/comparator.md
9.0K	/mnt/skills/examples/skill-creator/agents/grader.md
7.0K	/mnt/skills/examples/skill-creator/assets
7.0K	/mnt/skills/examples/skill-creator/assets/eval_review.html
60K	/mnt/skills/examples/skill-creator/eval-viewer
16K	/mnt/skills/examples/skill-creator/eval-viewer/generate_review.py
44K	/mnt/skills/examples/skill-creator/eval-viewer/viewer.html
12K	/mnt/skills/examples/skill-creator/references
12K	/mnt/skills/examples/skill-creator/references/schemas.md
74K	/mnt/skills/examples/skill-creator/scripts
0	/mnt/skills/examples/skill-creator/scripts/__init__.py
15K	/mnt/skills/examples/skill-creator/scripts/aggregate_benchmark.py
13K	/mnt/skills/examples/skill-creator/scripts/generate_report.py
11K	/mnt/skills/examples/skill-creator/scripts/improve_description.py
4.5K	/mnt/skills/examples/skill-creator/scripts/package_skill.py
4.0K	/mnt/skills/examples/skill-creator/scripts/quick_validate.py
12K	/mnt/skills/examples/skill-creator/scripts/run_eval.py
14K	/mnt/skills/examples/skill-creator/scripts/run_loop.py
2.0K	/mnt/skills/examples/skill-creator/scripts/utils.py

     1	---
     2	name: skill-creator
     3	description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
     4	---
     5	
     6	# Skill Creator
     7	
     8	A skill for creating new skills and iteratively improving them.
     9	
    10	At a high level, the process of creating a skill goes like this:
    11	
    12	- Decide what you want the skill to do and roughly how it should do it
    13	- Write a draft of the skill
    14	- Create a few test prompts and run claude-with-access-to-the-skill on them
    15	- Help the user evaluate the results both qualitatively and quantitatively
    16	  - While the runs happen in the background, draft some quantitative evals if there aren't any (if there are some, you can either use as is or modify if you feel something needs to change about them). Then explain them to the user (or if they already existed, explain the ones that already exist)
    17	  - Use the `eval-viewer/generate_review.py` script to show the user the results for them to look at, and also let them look at the quantitative metrics
    18	- Rewrite the skill based on feedback from the user's evaluation of the results (and also if there are any glaring flaws that become apparent from the quantitative benchmarks)
    19	- Repeat until you're satisfied
    20	- Expand the test set and try again at larger scale
    21	
    22	Your job when using this skill is to figure out where the user is in this process and then jump in and help them progress through these stages. So for instance, maybe they're like "I want to make a skill for X". You can help narrow down what they mean, write a draft, write the test cases, figure out how they want to evaluate, run all the prompts, and repeat.
    23	
    24	On the other hand, maybe they already have a draft of the skill. In this case you can go straight to the eval/iterate part of the loop.
    25	
    26	Of course, you should always be flexible and if the user is like "I don't need to run a bunch of evaluations, just vibe with me", you can do that instead.
    27	
    28	Then after the skill is done (but again, the order is flexible), you can also run the skill description improver, which we have a whole separate script for, to optimize the triggering of the skill.
    29	
    30	Cool? Cool.
    31	
    32	## Communicating with the user
    33	
    34	The skill creator is liable to be used by people across a wide range of familiarity with coding jargon. If you haven't heard (and how could you, it's only very recently that it started), there's a trend now where the power of Claude is inspiring plumbers to open up their terminals, parents and grandparents to google "how to install npm". On the other hand, the bulk of users are probably fairly computer-literate.
    35	
    36	So please pay attention to context cues to understand how to phrase your communication! In the default case, just to give you some idea:
    37	
    38	- "evaluation" and "benchmark" are borderline, but OK
    39	- for "JSON" and "assertion" you want to see serious cues from the user that they know what those things are before using them without explaining them
    40	
    41	It's OK to briefly explain terms if you're in doubt, and feel free to clarify terms with a short definition if you're unsure if the user will get it.
    42	
    43	---
    44	
    45	## Creating a skill
    46	
    47	### Capture Intent
    48	
    49	Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture (e.g., they say "turn this into a skill"). If so, extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input/output formats observed. The user may need to fill the gaps, and should confirm before proceeding to the next step.
    50	
    51	1. What should this skill enable Claude to do?
    52	2. When should this skill trigger? (what user phrases/contexts)
    53	3. What's the expected output format?
    54	4. Should we set up test cases to verify the skill works? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflow steps) benefit from test cases. Skills with subjective outputs (writing style, art) often don't need them. Suggest the appropriate default based on the skill type, but let the user decide.
    55	
    56	### Interview and Research
    57	
    58	Proactively ask questions about edge cases, input/output formats, example files, success criteria, and dependencies. Wait to write test prompts until you've got this part ironed out.
    59	
    60	Check available MCPs - if useful for research (searching docs, finding similar skills, looking up best practices), research in parallel via subagents if available, otherwise inline. Come prepared with context to reduce burden on the user.
    61	
    62	### Write the SKILL.md
    63	
    64	Based on the user interview, fill in these components:
    65	
    66	- **name**: Skill identifier
    67	- **description**: When to trigger, what it does. This is the primary triggering mechanism - include both what the skill does AND specific contexts for when to use it. All "when to use" info goes here, not in the body. Note: currently Claude has a tendency to "undertrigger" skills -- to not use them when they'd be useful. To combat this, please make the skill descriptions a little bit "pushy". So for instance, instead of "How to build a simple fast dashboard to display internal Anthropic data.", you might write "How to build a simple fast dashboard to display internal Anthropic data. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data, even if they don't explicitly ask for a 'dashboard.'"
    68	- **compatibility**: Required tools, dependencies (optional, rarely needed)
    69	- **the rest of the skill :)**
    70	
    71	### Skill Writing Guide
    72	
    73	#### Anatomy of a Skill
    74	
    75	```
    76	skill-name/
    77	├── SKILL.md (required)
    78	│   ├── YAML frontmatter (name, description required)
    79	│   └── Markdown instructions
    80	└── Bundled Resources (optional)
    81	    ├── scripts/    - Executable code for deterministic/repetitive tasks
    82	    ├── references/ - Docs loaded into context as needed
    83	    └── assets/     - Files used in output (templates, icons, fonts)
    84	```
    85	
    86	#### Progressive Disclosure
    87	
    88	Skills use a three-level loading system:
    89	1. **Metadata** (name + description) - Always in context (~100 words)
    90	2. **SKILL.md body** - In context whenever skill triggers (<500 lines ideal)
    91	3. **Bundled resources** - As needed (unlimited, scripts can execute without loading)
    92	
    93	These word counts are approximate and you can feel free to go longer if needed.
    94	
    95	**Key patterns:**
    96	- Keep SKILL.md under 500 lines; if you're approaching this limit, add an additional layer of hierarchy along with clear pointers about where the model using the skill should go next to follow up.
    97	- Reference files clearly from SKILL.md with guidance on when to read them
    98	- For large reference files (>300 lines), include a table of contents
    99	
   100	**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:
   101	```
   102	cloud-deploy/
   103	├── SKILL.md (workflow + selection)
   104	└── references/
   105	    ├── aws.md
   106	    ├── gcp.md
   107	    └── azure.md
   108	```
   109	Claude reads only the relevant reference file.
   110	
   111	#### Principle of Lack of Surprise
   112	
	< truncated lines 113-373 >
   374	
   375	### Step 3: Run the optimization loop
   376	
   377	Tell the user: "This will take some time — I'll run the optimization loop in the background and check on it periodically."
   378	
   379	Save the eval set to the workspace, then run in the background:
   380	
   381	```bash
   382	python -m scripts.run_loop \
   383	  --eval-set <path-to-trigger-eval.json> \
   384	  --skill-path <path-to-skill> \
   385	  --model <model-id-powering-this-session> \
   386	  --max-iterations 5 \
   387	  --verbose
   388	```
   389	
   390	Use the model ID from your system prompt (the one powering the current session) so the triggering test matches what the user actually experiences.
   391	
   392	While it runs, periodically tail the output to give the user updates on which iteration it's on and what the scores look like.
   393	
   394	This handles the full optimization loop automatically. It splits the eval set into 60% train and 40% held-out test, evaluates the current description (running each query 3 times to get a reliable trigger rate), then calls Claude to propose improvements based on what failed. It re-evaluates each new description on both train and test, iterating up to 5 times. When it's done, it opens an HTML report in the browser showing the results per iteration and returns JSON with `best_description` — selected by test score rather than train score to avoid overfitting.
   395	
   396	### How skill triggering works
   397	
   398	Understanding the triggering mechanism helps design better eval queries. Skills appear in Claude's `available_skills` list with their name + description, and Claude decides whether to consult a skill based on that description. The important thing to know is that Claude only consults skills for tasks it can't easily handle on its own — simple, one-step queries like "read this PDF" may not trigger a skill even if the description matches perfectly, because Claude can handle them directly with basic tools. Complex, multi-step, or specialized queries reliably trigger skills when the description matches.
   399	
   400	This means your eval queries should be substantive enough that Claude would actually benefit from consulting a skill. Simple queries like "read file X" are poor test cases — they won't trigger skills regardless of description quality.
   401	
   402	### Step 4: Apply the result
   403	
   404	Take `best_description` from the JSON output and update the skill's SKILL.md frontmatter. Show the user before/after and report the scores.
   405	
   406	---
   407	
   408	### Package and Present (only if `present_files` tool is available)
   409	
   410	Check whether you have access to the `present_files` tool. If you don't, skip this step. If you do, package the skill and present the .skill file to the user:
   411	
   412	```bash
   413	python -m scripts.package_skill <path/to/skill-folder>
   414	```
   415	
   416	After packaging, direct the user to the resulting `.skill` file path so they can install it.
   417	
   418	---
   419	
   420	## Claude.ai-specific instructions
   421	
   422	In Claude.ai, the core workflow is the same (draft → test → review → improve → repeat), but because Claude.ai doesn't have subagents, some mechanics change. Here's what to adapt:
   423	
   424	**Running test cases**: No subagents means no parallel execution. For each test case, read the skill's SKILL.md, then follow its instructions to accomplish the test prompt yourself. Do them one at a time. This is less rigorous than independent subagents (you wrote the skill and you're also running it, so you have full context), but it's a useful sanity check — and the human review step compensates. Skip the baseline runs — just use the skill to complete the task as requested.
   425	
   426	**Reviewing results**: If you can't open a browser (e.g., Claude.ai's VM has no display, or you're on a remote server), skip the browser reviewer entirely. Instead, present results directly in the conversation. For each test case, show the prompt and the output. If the output is a file the user needs to see (like a .docx or .xlsx), save it to the filesystem and tell them where it is so they can download and inspect it. Ask for feedback inline: "How does this look? Anything you'd change?"
   427	
   428	**Benchmarking**: Skip the quantitative benchmarking — it relies on baseline comparisons which aren't meaningful without subagents. Focus on qualitative feedback from the user.
   429	
   430	**The iteration loop**: Same as before — improve the skill, rerun the test cases, ask for feedback — just without the browser reviewer in the middle. You can still organize results into iteration directories on the filesystem if you have one.
   431	
   432	**Description optimization**: This section requires the `claude` CLI tool (specifically `claude -p`) which is only available in Claude Code. Skip it if you're on Claude.ai.
   433	
   434	**Blind comparison**: Requires subagents. Skip it.
   435	
   436	**Packaging**: The `package_skill.py` script works anywhere with Python and a filesystem. On Claude.ai, you can run it and the user can download the resulting `.skill` file.
   437	
   438	**Updating an existing skill**: The user might be asking you to update an existing skill, not create a new one. In this case:
   439	- **Preserve the original name.** Note the skill's directory name and `name` frontmatter field -- use them unchanged. E.g., if the installed skill is `research-helper`, output `research-helper.skill` (not `research-helper-v2`).
   440	- **Copy to a writeable location before editing.** The installed skill path may be read-only. Copy to `/tmp/skill-name/`, edit there, and package from the copy.
   441	- **If packaging manually, stage in `/tmp/` first**, then copy to the output directory -- direct writes may fail due to permissions.
   442	
   443	---
   444	
   445	## Cowork-Specific Instructions
   446	
   447	If you're in Cowork, the main things to know are:
   448	
   449	- You have subagents, so the main workflow (spawn test cases in parallel, run baselines, grade, etc.) all works. (However, if you run into severe problems with timeouts, it's OK to run the test prompts in series rather than parallel.)
   450	- You don't have a browser or display, so when generating the eval viewer, use `--static <output_path>` to write a standalone HTML file instead of starting a server. Then proffer a link that the user can click to open the HTML in their browser.
   451	- For whatever reason, the Cowork setup seems to disincline Claude from generating the eval viewer after running the tests, so just to reiterate: whether you're in Cowork or in Claude Code, after running tests, you should always generate the eval viewer for the human to look at examples before revising the skill yourself and trying to make corrections, using `generate_review.py` (not writing your own boutique html code). Sorry in advance but I'm gonna go all caps here: GENERATE THE EVAL VIEWER *BEFORE* evaluating inputs yourself. You want to get them in front of the human ASAP!
   452	- Feedback works differently: since there's no running server, the viewer's "Submit All Reviews" button will download `feedback.json` as a file. You can then read it from there (you may have to request access first).
   453	- Packaging works — `package_skill.py` just needs Python and a filesystem.
   454	- Description optimization (`run_loop.py` / `run_eval.py`) should work in Cowork just fine since it uses `claude -p` via subprocess, not a browser, but please save it until you've fully finished making the skill and the user agrees it's in good shape.
   455	- **Updating an existing skill**: The user might be asking you to update an existing skill, not create a new one. Follow the update guidance in the claude.ai section above.
   456	
   457	---
   458	
   459	## Reference files
   460	
   461	The agents/ directory contains instructions for specialized subagents. Read them when you need to spawn the relevant subagent.
   462	
   463	- `agents/grader.md` — How to evaluate assertions against outputs
   464	- `agents/comparator.md` — How to do blind A/B comparison between two outputs
   465	- `agents/analyzer.md` — How to analyze why one version beat another
   466	
   467	The references/ directory has additional documentation:
   468	- `references/schemas.md` — JSON structures for evals.json, grading.json, etc.
   469	
   470	---
   471	
   472	Repeating one more time the core loop here for emphasis:
   473	
   474	- Figure out what the skill is about
   475	- Draft or edit the skill
   476	- Run claude-with-access-to-the-skill on test prompts
   477	- With the user, evaluate the outputs:
   478	  - Create benchmark.json and run `eval-viewer/generate_review.py` to help the user review them
   479	  - Run quantitative evals
   480	- Repeat until you and the user are satisfied
   481	- Package the final skill and return it to the user.
   482	
   483	Please add steps to your TodoList, if you have such a thing, to make sure you don't forget. If you're in Cowork, please specifically put "Create evals JSON and run `eval-viewer/generate_review.py` so human can review test cases" in your TodoList to make sure it happens.
   484	
   485	Good luck!
   486	
Perfeito! Tenho o Skill Creator aqui e estou pronto para trabalhar. 🚀

O processo é simples:
1. **Entender** o que a skill deve fazer
2. **Escrever** o rascunho da SKILL.md
3. **Testar** com alguns prompts de exemplo
4. **Revisar** e iterar com você
5. **Empacotar** e entregar o `.skill` file

Me conta: **qual skill você quer criar?** Pode ser algo que você já faz repetidamente com o Claude e quer "capturar", ou uma ideia nova de workflow que você quer automatizar.

---

**Você** _2026-04-23_

Full directory Skill

---

**Claude** _2026-04-23_

{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/Padra_o.zip\n   creating: padrao_skill/neuroexecucao-template/\n  inflating: padrao_skill/neuroexecucao-template/index.html  \n  inflating: padrao_skill/neuroexecucao-template/tokens.css  \n  inflating: padrao_skill/neuroexecucao-template/svg-defs.js  \n  inflating: padrao_skill/neuroexecucao-template/content.js  \n  inflating: padrao_skill/neuroexecucao-template/render.js  \n  inflating: padrao_skill/neuroexecucao-template/README.md  \npadrao_skill/neuroexecucao-template/README.md\npadrao_skill/neuroexecucao-template/content.js\npadrao_skill/neuroexecucao-template/index.html\npadrao_skill/neuroexecucao-template/render.js\npadrao_skill/neuroexecucao-template/svg-defs.js\npadrao_skill/neuroexecucao-template/tokens.css\n","stderr":""}
{"returncode":0,"stdout":"# Template editorial SVG A4\n\n## O que é\nTemplate estático em HTML + CSS + JS para deploy simples.\n\n## Estrutura\n- `index.html` → shell do documento\n- `tokens.css` → design system visual\n- `svg-defs.js` → filtros, gradientes, patterns, ícones SVG\n- `content.js` → todo o conteúdo editável\n- `render.js` → templates que montam as páginas\n\n## Como editar\nEdite apenas `content.js`.\n\n### Campos principais\n- `meta` → título do HTML, labels gerais, rodapé\n- `brand` → nome, papel, disclaimer\n- `cover` → capa\n- `profile` → página de perfil\n- `pipeline` → método/processo\n- `audience` → público\n- `gap` → tese de mercado / comparativos\n- `artifacts` → lista de entregáveis\n- `limits` → exclusões de escopo\n- `pillars` → 4 pilares\n- `cta` → chamada final\n\n## Como rodar localmente\nAbra `index.html` no navegador.\n\n## Como exportar PDF\nUse o botão `Exportar PDF` ou `Cmd/Ctrl + P`.\n\n## Como fazer deploy\nVocê pode subir essa pasta inteira em qualquer host estático:\n- Netlify\n- Vercel (static)\n- GitHub Pages\n- Cloudflare Pages\n\n## Observação\nO visual está separado do conteúdo. Para trocar identidade visual, ajuste `tokens.css` e, se necessário, `svg-defs.js`.\n","stderr":""}
{"returncode":0,"stdout":":root {\n  --c-primary: #1a365d;\n  --c-secondary: #f4f7fa;\n  --c-accent: #ff6b6b;\n  --c-data: #2196f3;\n  --c-success: #43a047;\n  --c-dark: #0a1526;\n  --c-paper-bg: #e0e5ec;\n  --c-white: #ffffff;\n  --c-slate-300: #cbd5e1;\n  --c-slate-400: #94a3b8;\n  --c-slate-500: #64748b;\n  --c-slate-700: #334155;\n  --c-slate-800: #1e293b;\n  --radius-sm: 4;\n  --shadow-soft: 0 15px 35px rgba(0, 0, 0, 0.15);\n  --page-width: 210mm;\n  --page-height: 297mm;\n}\n\n* { box-sizing: border-box; margin: 0; padding: 0; }\n\nhtml, body {\n  min-height: 100%;\n}\n\nbody {\n  background: var(--c-paper-bg);\n  font-family: 'Montserrat', sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 24px;\n  padding: 24px 0 48px;\n  -webkit-font-smoothing: antialiased;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n\n.toolbar {\n  width: min(1100px, calc(100vw - 32px));\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  background: rgba(255,255,255,0.9);\n  border: 1px solid rgba(0,0,0,0.08);\n  border-radius: 12px;\n  padding: 14px 16px;\n  box-shadow: 0 8px 24px rgba(0,0,0,0.08);\n  position: sticky;\n  top: 12px;\n  backdrop-filter: blur(10px);\n  z-index: 10;\n}\n\n.toolbar span {\n  display: block;\n  color: var(--c-slate-500);\n  font-size: 13px;\n  margin-top: 4px;\n}\n\n.toolbar code {\n  font-family: 'JetBrains Mono', monospace;\n}\n\n.toolbar button {\n  border: 0;\n  background: var(--c-primary);\n  color: var(--c-white);\n  padding: 10px 14px;\n  border-radius: 8px;\n  font: inherit;\n  cursor: pointer;\n}\n\n.a4-page {\n  width: var(--page-width);\n  height: var(--page-height);\n  background: var(--c-white);\n  box-shadow: var(--shadow-soft);\n  position: relative;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n\n.page-svg {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  inset: 0;\n}\n\n.f-display { font-family: 'Playfair Display', serif; font-weight: 900; }\n.f-heading { font-family: 'Montserrat', sans-serif; font-weight: 700; }\n.f-body { font-family: 'Merriweather', serif; font-weight: 400; }\n.f-mono { font-family: 'JetBrains Mono', monospace; font-weight: 400; }\n\n@page {\n  size: A4;\n  margin: 0;\n}\n\n@media print {\n  body {\n    background: none;\n    padding: 0;\n    gap: 0;\n    display: block;\n  }\n\n  main {\n    gap: 0;\n  }\n\n  .toolbar,\n  .no-print {\n    display: none !important;\n  }\n\n  .a4-page {\n    box-shadow: none;\n    margin: 0;\n    break-after: page;\n    page-break-after: always;\n  }\n}\n","stderr":""}
{"returncode":0,"stdout":"window.CONTENT = {\n  meta: {\n    htmlTitle: 'Template Editorial SVG A4',\n    readingTime: '3 MIN',\n    language: 'pt-BR',\n    documentId: '001',\n    documentLabel: 'RELATÓRIO ESTRATÉGICO',\n    footerEndLabel: 'FIM',\n    showToolbarHint: true\n  },\n\n  brand: {\n    siteUrl: 'SEU-DOMINIO.COM',\n    brandName: 'SUA MARCA',\n    founderName: 'SEU NOME',\n    founderRole: 'SEU CARGO / POSICIONAMENTO',\n    profileMetaLine: 'IDADE • CARGO • EMPRESA',\n    legalNote: '⚠ SUBSTITUA ESTE AVISO PELO DISCLAIMER CORRETO DO SEU CONTEXTO'\n  },\n\n  cover: {\n    titleTop: 'SEU',\n    titleBottom: 'TÍTULO',\n    subtitle: 'Subtítulo principal do documento',\n    badgeLabel: 'DOCUMENTO #001',\n    badgeTitle: 'Nome da peça',\n    footerLeft: 'ACESSO ABERTO • LEITURA: 3 MIN'\n  },\n\n  profile: {\n    eyebrow: 'QUEM É',\n    heading: 'Nome da Pessoa ou Marca',\n    bullet1: '→ Substitua este primeiro ponto com seu texto',\n    bullet2: '→ Substitua este segundo ponto com seu texto',\n    highlightLine1: 'Escreva aqui sua frase-chave',\n    highlightLine2: 'de posicionamento estratégico.',\n    cards: [\n      { title: 'Bloco 1', description: 'Descrição curta do bloco 1', color: '#2196F3' },\n      { title: 'Bloco 2', description: 'Descrição curta do bloco 2', color: '#43A047' },\n      { title: 'Bloco 3', description: 'Descrição curta do bloco 3', color: '#ff6b6b' }\n    ]\n  },\n\n  pipeline: {\n    eyebrow: 'O QUE FAZ',\n    heading: 'Nome do seu método',\n    paragraph: [\n      'Linha 1 do racional principal.',\n      'Linha 2 do racional principal.',\n      'Linha 3 do racional principal.'\n    ],\n    inputTitle: 'Entrada principal',\n    inputLabel: 'FONTE / INSUMO',\n    coreTitle: 'Processamento central',\n    coreLabel: 'MÉTODO / MECÂNICA',\n    audiences: ['Público 1', 'Público 2', 'Público 3'],\n    equation: '[ PILAR 1 ] × [ PILAR 2 ] × [ PILAR 3 ]'\n  },\n\n  audience: {\n    eyebrow: 'PARA QUEM',\n    heading: 'Alinhamento de Público',\n    manifestoTitle: 'PROPOSTA DE VALOR CENTRAL',\n    manifestoSubtitle: 'SUBTÍTULO / FRASE DE FIXAÇÃO',\n    items: [\n      {\n        icon: 'brain',\n        color: '#2196F3',\n        title: 'Segmento 1',\n        description: 'Descreva aqui o primeiro grupo alvo.'\n      },\n      {\n        icon: 'target',\n        color: '#43A047',\n        title: 'Segmento 2',\n        description: 'Descreva aqui o segundo grupo alvo.'\n      },\n      {\n        icon: 'data',\n        color: '#ff6b6b',\n        title: 'Segmento 3',\n        description: 'Descreva aqui o terceiro grupo alvo.'\n      }\n    ]\n  },\n\n  gap: {\n    eyebrow: 'POR QUE EXISTE',\n    heading: 'O gap de mercado',\n    metricLabel: 'CRESCIMENTO 5 ANOS',\n    metricValue: '+000%',\n    leftLabel: '- 5 ANOS',\n    rightLabel: 'HOJE',\n    compareTitle: 'Comparativo principal',\n    bar1Label: 'Categoria dominante atual',\n    bar1Value: 90,\n    bar2Label: 'Categoria subatendida',\n    bar2Value: 10,\n    statement: [\n      'Escreva aqui sua tese de contribuição.',\n      'Use 2 ou 3 linhas curtas e objetivas.',\n      'Mantenha foco no diferencial.'\n    ]\n  },\n\n  artifacts: {\n    eyebrow: 'O QUE HÁ AQUI',\n    heading: 'Artefatos de valor',\n    summaryTitle: 'TODO CONTEÚDO É:',\n    summaryLine: 'REVISÁVEL • APLICÁVEL • MENSURÁVEL',\n    items: [\n      ['Item 1', 'Descrição curta do item 1'],\n      ['Item 2', 'Descrição curta do item 2'],\n      ['Item 3', 'Descrição curta do item 3'],\n      ['Item 4', 'Descrição curta do item 4'],\n      ['Item 5', 'Descrição curta do item 5']\n    ]\n  },\n\n  limits: {\n    eyebrow: 'LIMITES DE ESCOPO',\n    heading: 'O que não está incluído',\n    items: [\n      ['Limite 1', 'Explique aqui o que está fora do escopo.'],\n      ['Limite 2', 'Explique aqui o que está fora do escopo.'],\n      ['Limite 3', 'Explique aqui o que está fora do escopo.'],\n      ['Limite 4', 'Explique aqui o que está fora do escopo.'],\n      ['Limite 5', 'Explique aqui o que está fora do escopo.']\n    ]\n  },\n\n  pillars: {\n    eyebrow: 'COMPROMISSO',\n    heading: 'Seus 4 pilares',\n    cards: [\n      {\n        number: '01',\n        color: '#1a365d',\n        title: 'Pilar um',\n        lines: ['Linha 1', 'Linha 2', 'Linha 3', 'Linha 4'],\n        dark: false\n      },\n      {\n        number: '02',\n        color: '#2196F3',\n        title: 'Pilar dois',\n        lines: ['Linha 1', 'Linha 2', 'Linha 3', 'Linha 4'],\n        dark: false\n      },\n      {\n        number: '03',\n        color: '#43A047',\n        title: 'Pilar três',\n        lines: ['Linha 1', 'Linha 2', 'Linha 3', 'Linha 4'],\n        dark: false\n      },\n      {\n        number: '04',\n        color: '#ff6b6b',\n        title: 'Pilar quatro',\n        lines: ['Linha 1', 'Linha 2', 'Linha 3', 'Linha 4'],\n        dark: true\n      }\n    ]\n  },\n\n  cta: {\n    heading: 'Seu CTA principal',\n    siteUrl: 'SEU-DOMINIO.COM',\n    features: [\n      '→ Benefício 1',\n      '→ Benefício 2',\n      '→ Benefício 3'\n    ],\n    navTitle: 'NAVEGAÇÃO RECOMENDADA',\n    navItems: [\n      ['1. Recurso principal:', 'Descreva a primeira rota recomendada'],\n      ['2. Recurso secundário:', 'Descreva a segunda rota recomendada']\n    ]\n  }\n};\n","stderr":""}
{"returncode":0,"stdout":"  411 /home/claude/padrao_skill/neuroexecucao-template/render.js\n   64 /home/claude/padrao_skill/neuroexecucao-template/svg-defs.js\n   28 /home/claude/padrao_skill/neuroexecucao-template/index.html\n  503 total\n","stderr":""}
{"returncode":0,"stdout":"(function renderDocument() {\n  const data = window.CONTENT;\n  document.title = data.meta?.htmlTitle || 'Template Editorial SVG A4';\n\n  const app = document.getElementById('app');\n  const pages = [\n    renderCoverPage(data),\n    renderProfilePage(data),\n    renderPipelinePage(data),\n    renderAudiencePage(data),\n    renderGapPage(data),\n    renderArtifactsPage(data),\n    renderLimitsPage(data),\n    renderPillarsPage(data),\n    renderCtaPage(data)\n  ];\n\n  app.innerHTML = pages.join('');\n\n  function footer(pageNumber, endLabel = null) {\n    const right = endLabel || `PG. ${String(pageNumber).padStart(2, '0')}`;\n    return `<text x=\"734\" y=\"1060\" class=\"f-mono\" fill=\"#8898aa\" font-size=\"12\" text-anchor=\"end\">${escapeHtml(right)}</text>`;\n  }\n\n  function linesToTspans(lines, x, startDy, step) {\n    return lines.map((line, index) => `<tspan x=\"${x}\" dy=\"${index === 0 ? startDy : step}\">${escapeHtml(line)}</tspan>`).join('');\n  }\n\n  function renderCoverPage(d) {\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#bgDarkGradient)\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"transparent\" filter=\"url(#noiseFilter)\" opacity=\"0.6\"/>\n\n        <text x=\"60\" y=\"80\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\" letter-spacing=\"2\">${escapeHtml(d.meta.documentLabel)}</text>\n        <line x1=\"60\" y1=\"100\" x2=\"734\" y2=\"100\" stroke=\"rgba(255,255,255,0.15)\" stroke-width=\"1\"/>\n\n        <g transform=\"translate(550, 250)\" stroke=\"rgba(255,255,255,0.1)\" fill=\"none\">\n          <circle cx=\"0\" cy=\"0\" r=\"180\" stroke-width=\"1\" stroke-dasharray=\"4 8\"/>\n          <circle cx=\"0\" cy=\"0\" r=\"100\" stroke-width=\"1\"/>\n          <circle cx=\"0\" cy=\"0\" r=\"40\" stroke=\"#ff6b6b\" stroke-width=\"2\"/>\n          <line x1=\"-200\" y1=\"0\" x2=\"200\" y2=\"0\" stroke-width=\"1\"/>\n          <line x1=\"0\" y1=\"-200\" x2=\"0\" y2=\"200\" stroke-width=\"1\"/>\n          <circle cx=\"70\" cy=\"-70\" r=\"5\" fill=\"#2196F3\" stroke=\"none\"/>\n          <circle cx=\"-50\" cy=\"86\" r=\"5\" fill=\"#43A047\" stroke=\"none\"/>\n        </g>\n\n        <text x=\"60\" y=\"380\" class=\"f-display\" fill=\"#ffffff\" font-size=\"70\" letter-spacing=\"-1\">${escapeHtml(d.cover.titleTop)}</text>\n        <text x=\"60\" y=\"460\" class=\"f-heading\" fill=\"transparent\" stroke=\"#ffffff\" stroke-width=\"2\" font-size=\"70\" letter-spacing=\"4\">${escapeHtml(d.cover.titleBottom)}</text>\n        <rect x=\"60\" y=\"520\" width=\"40\" height=\"4\" fill=\"#ff6b6b\" />\n        <text x=\"60\" y=\"580\" class=\"f-body\" fill=\"#e0e5ec\" font-size=\"24\"><tspan x=\"60\" dy=\"0\">${escapeHtml(d.cover.subtitle)}</tspan></text>\n\n        <g transform=\"translate(60, 640)\">\n          <rect width=\"260\" height=\"90\" fill=\"rgba(255,255,255,0.05)\" stroke=\"rgba(255,255,255,0.1)\" rx=\"4\"/>\n          <text x=\"20\" y=\"35\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\">${escapeHtml(d.cover.badgeLabel)}</text>\n          <text x=\"20\" y=\"65\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"18\">${escapeHtml(d.cover.badgeTitle)}</text>\n        </g>\n\n        <line x1=\"60\" y1=\"1023\" x2=\"734\" y2=\"1023\" stroke=\"rgba(255,255,255,0.15)\" stroke-width=\"1\"/>\n        <text x=\"60\" y=\"1060\" class=\"f-mono\" fill=\"#8898aa\" font-size=\"12\">${escapeHtml(d.cover.footerLeft)}</text>\n        ${footer(1)}\n      </svg>\n    </div>`;\n  }\n\n  function renderProfilePage(d) {\n    const cards = d.profile.cards.map((card, i) => {\n      const x = 140 + i * 200;\n      return `\n      <rect x=\"${x}\" y=\"800\" width=\"180\" height=\"100\" fill=\"#ffffff\" stroke=\"#cbd5e1\" rx=\"4\"/>\n      <rect x=\"${x}\" y=\"800\" width=\"180\" height=\"4\" fill=\"${escapeHtml(card.color)}\"/>\n      <text x=\"${x + 20}\" y=\"840\" class=\"f-heading\" fill=\"#1a365d\" font-size=\"16\">${escapeHtml(card.title)}</text>\n      <text x=\"${x + 20}\" y=\"870\" class=\"f-body\" fill=\"#64748b\" font-size=\"12\">${escapeHtml(card.description)}</text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"#f4f7fa\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#gridDark)\"/>\n        <rect x=\"0\" y=\"0\" width=\"80\" height=\"1123\" fill=\"#1a365d\"/>\n        <text transform=\"rotate(-90, 40, 561)\" x=\"40\" y=\"561\" class=\"f-mono\" fill=\"#ffffff\" font-size=\"20\" text-anchor=\"middle\" letter-spacing=\"4\">${escapeHtml(d.profile.eyebrow)}</text>\n\n        <g transform=\"translate(140, 100)\">\n          <rect width=\"200\" height=\"250\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\" rx=\"4\" filter=\"url(#boxShadow)\"/>\n          <line x1=\"0\" y1=\"0\" x2=\"200\" y2=\"250\" stroke=\"#cbd5e1\" stroke-width=\"1\" opacity=\"0.5\"/>\n          <line x1=\"200\" y1=\"0\" x2=\"0\" y2=\"250\" stroke=\"#cbd5e1\" stroke-width=\"1\" opacity=\"0.5\"/>\n          <rect x=\"80\" y=\"105\" width=\"40\" height=\"40\" fill=\"#f4f7fa\"/>\n          <text x=\"100\" y=\"130\" class=\"f-mono\" fill=\"#64748b\" font-size=\"10\" text-anchor=\"middle\">[SUA FOTO / LOGO]</text>\n        </g>\n\n        <g transform=\"translate(140, 430)\">\n          <text class=\"f-display\" fill=\"#1a365d\" font-size=\"44\">${escapeHtml(d.brand.founderName)}</text>\n          <text y=\"30\" class=\"f-mono\" fill=\"#64748b\" font-size=\"14\">${escapeHtml(d.brand.profileMetaLine)}</text>\n          <rect y=\"60\" width=\"600\" height=\"1\" fill=\"#cbd5e1\"/>\n\n          <text y=\"110\" class=\"f-body\" fill=\"#334155\" font-size=\"18\">\n            <tspan x=\"0\" dy=\"0\">${escapeHtml(d.profile.bullet1)}</tspan>\n            <tspan x=\"0\" dy=\"40\">${escapeHtml(d.profile.bullet2)}</tspan>\n          </text>\n\n          <rect y=\"190\" width=\"554\" height=\"120\" fill=\"#ffffff\" stroke=\"#1a365d\" stroke-width=\"2\" rx=\"4\" filter=\"url(#boxShadow)\"/>\n          <rect y=\"190\" width=\"8\" height=\"120\" fill=\"#1a365d\" rx=\"4\"/>\n          <text y=\"240\" class=\"f-heading\" fill=\"#1a365d\" font-size=\"20\">\n            <tspan x=\"40\" dy=\"0\">${escapeHtml(d.profile.highlightLine1)}</tspan>\n            <tspan x=\"40\" dy=\"30\">${escapeHtml(d.profile.highlightLine2)}</tspan>\n          </text>\n        </g>\n\n        ${cards}\n\n        <text x=\"140\" y=\"980\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"12\" font-weight=\"700\">${escapeHtml(d.brand.legalNote)}</text>\n        ${footer(2)}\n      </svg>\n    </div>`;\n  }\n\n  function renderPipelinePage(d) {\n    const audiences = d.pipeline.audiences.map((item, i) => {\n      const x = 50 + i * 350;\n      const center = x + 110;\n      return `\n        <rect x=\"${x}\" y=\"300\" width=\"220\" height=\"100\" fill=\"#f4f7fa\" rx=\"4\"/>\n        <rect x=\"${x}\" y=\"300\" width=\"220\" height=\"4\" fill=\"#ff6b6b\"/>\n        <text x=\"${center}\" y=\"350\" class=\"f-heading\" fill=\"#1a365d\" font-size=\"14\" text-anchor=\"middle\">${escapeHtml(item)}</text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"#ffffff\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#gridDark)\"/>\n\n        <text x=\"60\" y=\"100\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\">${escapeHtml(d.pipeline.eyebrow)}</text>\n        <text x=\"60\" y=\"160\" class=\"f-display\" fill=\"#1a365d\" font-size=\"44\">${escapeHtml(d.pipeline.heading)}</text>\n\n        <text x=\"60\" y=\"220\" class=\"f-body\" fill=\"#334155\" font-size=\"18\">\n          ${linesToTspans(d.pipeline.paragraph, 60, 0, 30)}\n        </text>\n\n        <g transform=\"translate(60, 380)\">\n          <rect x=\"0\" y=\"0\" width=\"300\" height=\"120\" fill=\"#1a365d\" rx=\"4\"/>\n          <use href=\"#icon-data\" x=\"20\" y=\"20\" width=\"30\" height=\"30\" stroke=\"#fff\"/>\n          <text x=\"20\" y=\"80\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"18\">${escapeHtml(d.pipeline.inputTitle)}</text>\n          <text x=\"20\" y=\"100\" class=\"f-mono\" fill=\"#8898aa\" font-size=\"12\">${escapeHtml(d.pipeline.inputLabel)}</text>\n\n          <path d=\"M 300 60 L 360 60\" stroke=\"#cbd5e1\" stroke-width=\"3\" stroke-dasharray=\"4 4\" fill=\"none\"/>\n          <polygon points=\"360,60 350,55 350,65\" fill=\"#cbd5e1\"/>\n\n          <rect x=\"370\" y=\"-40\" width=\"280\" height=\"200\" fill=\"#ffffff\" stroke=\"#2196F3\" stroke-width=\"3\" rx=\"4\" filter=\"url(#boxShadow)\"/>\n          <circle cx=\"510\" cy=\"30\" r=\"40\" fill=\"none\" stroke=\"#e2e8f0\" stroke-width=\"8\"/>\n          <circle cx=\"510\" cy=\"30\" r=\"40\" fill=\"none\" stroke=\"#2196F3\" stroke-width=\"8\" stroke-dasharray=\"180 251\"/>\n          <text x=\"510\" y=\"110\" class=\"f-heading\" fill=\"#1a365d\" font-size=\"18\" text-anchor=\"middle\">${escapeHtml(d.pipeline.coreTitle)}</text>\n          <text x=\"510\" y=\"130\" class=\"f-mono\" fill=\"#64748b\" font-size=\"12\" text-anchor=\"middle\">${escapeHtml(d.pipeline.coreLabel)}</text>\n\n          <path d=\"M 510 160 L 510 240\" stroke=\"#cbd5e1\" stroke-width=\"3\" fill=\"none\"/>\n          <polygon points=\"510,240 505,230 515,230\" fill=\"#cbd5e1\"/>\n\n          <rect x=\"160\" y=\"260\" width=\"700\" height=\"2\" fill=\"#cbd5e1\"/>\n          <line x1=\"160\" y1=\"260\" x2=\"160\" y2=\"300\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n          <line x1=\"510\" y1=\"260\" x2=\"510\" y2=\"300\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n          <line x1=\"860\" y1=\"260\" x2=\"860\" y2=\"300\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n          ${audiences}\n        </g>\n\n        <rect x=\"60\" y=\"850\" width=\"674\" height=\"80\" fill=\"#1a365d\" rx=\"4\"/>\n        <text x=\"397\" y=\"897\" class=\"f-mono\" fill=\"#ffffff\" font-size=\"16\" text-anchor=\"middle\">${escapeHtml(d.pipeline.equation)}</text>\n        ${footer(3)}\n      </svg>\n    </div>`;\n  }\n\n  function renderAudiencePage(d) {\n    const icons = { brain: 'icon-brain', target: 'icon-target', data: 'icon-data' };\n    const items = d.audience.items.map((item, i) => {\n      const y = i * 170;\n      return `\n        <rect x=\"0\" y=\"${y}\" width=\"674\" height=\"140\" fill=\"rgba(255,255,255,0.05)\" stroke=\"rgba(255,255,255,0.1)\" rx=\"4\"/>\n        <use href=\"#${icons[item.icon] || 'icon-data'}\" x=\"30\" y=\"${y + 45}\" width=\"50\" height=\"50\" stroke=\"${escapeHtml(item.color)}\"/>\n        <text x=\"110\" y=\"${y + 65}\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"22\">${escapeHtml(item.title)}</text>\n        <text x=\"110\" y=\"${y + 100}\" class=\"f-body\" fill=\"#8898aa\" font-size=\"16\">${escapeHtml(item.description)}</text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#bgDarkGradient)\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"transparent\" filter=\"url(#noiseFilter)\" opacity=\"0.6\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\"/>\n\n        <text x=\"60\" y=\"100\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\">${escapeHtml(d.audience.eyebrow)}</text>\n        <text x=\"60\" y=\"160\" class=\"f-display\" fill=\"#ffffff\" font-size=\"44\">${escapeHtml(d.audience.heading)}</text>\n\n        <circle cx=\"794\" cy=\"160\" r=\"300\" fill=\"none\" stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"1\"/>\n        <circle cx=\"794\" cy=\"160\" r=\"200\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/>\n        <circle cx=\"794\" cy=\"160\" r=\"100\" fill=\"none\" stroke=\"#ff6b6b\" stroke-width=\"1\"/>\n\n        <g transform=\"translate(60, 260)\">${items}</g>\n\n        <g transform=\"translate(60, 850)\">\n          <rect width=\"674\" height=\"100\" fill=\"#ff6b6b\" rx=\"4\"/>\n          <text x=\"337\" y=\"45\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"20\" text-anchor=\"middle\">${escapeHtml(d.audience.manifestoTitle)}</text>\n          <text x=\"337\" y=\"75\" class=\"f-mono\" fill=\"#1a365d\" font-size=\"16\" text-anchor=\"middle\">${escapeHtml(d.audience.manifestoSubtitle)}</text>\n        </g>\n        ${footer(4)}\n      </svg>\n    </div>`;\n  }\n\n  function renderGapPage(d) {\n    const b1 = Math.max(0, Math.min(100, d.gap.bar1Value || 0));\n    const b2 = Math.max(0, Math.min(100, d.gap.bar2Value || 0));\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"#ffffff\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#gridDark)\"/>\n\n        <text x=\"60\" y=\"100\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\">${escapeHtml(d.gap.eyebrow)}</text>\n        <text x=\"60\" y=\"160\" class=\"f-display\" fill=\"#1a365d\" font-size=\"44\">${escapeHtml(d.gap.heading)}</text>\n\n        <g transform=\"translate(60, 280)\">\n          <line x1=\"0\" y1=\"350\" x2=\"674\" y2=\"350\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n          <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"350\" stroke=\"#cbd5e1\" stroke-width=\"2\"/>\n          <line x1=\"0\" y1=\"262\" x2=\"674\" y2=\"262\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n          <line x1=\"0\" y1=\"175\" x2=\"674\" y2=\"175\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n          <line x1=\"0\" y1=\"87\" x2=\"674\" y2=\"87\" stroke=\"#f1f5f9\" stroke-width=\"1\"/>\n          <text x=\"-10\" y=\"175\" class=\"f-mono\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"end\">Volume Base</text>\n          <path d=\"M 0 300 C 200 290, 400 200, 674 50 V 350 H 0 Z\" fill=\"url(#accentGradient)\" opacity=\"0.1\"/>\n          <path d=\"M 0 300 C 200 290, 400 200, 674 50\" fill=\"none\" stroke=\"#ff6b6b\" stroke-width=\"4\"/>\n          <circle cx=\"674\" cy=\"50\" r=\"8\" fill=\"#ff6b6b\" stroke=\"#ffffff\" stroke-width=\"3\" filter=\"url(#boxShadow)\"/>\n          <g transform=\"translate(480, 0)\">\n            <rect width=\"180\" height=\"60\" fill=\"#1a365d\" rx=\"4\" filter=\"url(#boxShadow)\"/>\n            <text x=\"90\" y=\"25\" class=\"f-mono\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">${escapeHtml(d.gap.metricLabel)}</text>\n            <text x=\"90\" y=\"48\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"24\" text-anchor=\"middle\">${escapeHtml(d.gap.metricValue)}</text>\n          </g>\n          <text x=\"0\" y=\"380\" class=\"f-mono\" fill=\"#64748b\" font-size=\"12\">${escapeHtml(d.gap.leftLabel)}</text>\n          <text x=\"674\" y=\"380\" class=\"f-mono\" fill=\"#64748b\" font-size=\"12\" text-anchor=\"end\">${escapeHtml(d.gap.rightLabel)}</text>\n        </g>\n\n        <g transform=\"translate(60, 750)\">\n          <text class=\"f-heading\" fill=\"#1a365d\" font-size=\"18\">${escapeHtml(d.gap.compareTitle)}</text>\n          <text y=\"50\" class=\"f-mono\" fill=\"#64748b\" font-size=\"12\">${escapeHtml(d.gap.bar1Label)}</text>\n          <rect y=\"60\" width=\"600\" height=\"24\" fill=\"#cbd5e1\" rx=\"2\"/>\n          <rect y=\"60\" width=\"${6 * b1}\" height=\"24\" fill=\"#1a365d\" rx=\"2\"/>\n          <text x=\"${10 + 6 * b1}\" y=\"77\" class=\"f-mono\" fill=\"#1a365d\" font-size=\"14\" font-weight=\"700\">${b1}%</text>\n\n          <text y=\"110\" class=\"f-mono\" fill=\"#64748b\" font-size=\"12\">${escapeHtml(d.gap.bar2Label)}</text>\n          <rect y=\"120\" width=\"600\" height=\"24\" fill=\"#cbd5e1\" rx=\"2\"/>\n          <rect y=\"120\" width=\"${6 * b2}\" height=\"24\" fill=\"#ff6b6b\" rx=\"2\"/>\n          <text x=\"${10 + 6 * b2}\" y=\"137\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\" font-weight=\"700\">${b2}%</text>\n        </g>\n\n        <text x=\"60\" y=\"980\" class=\"f-body\" fill=\"#334155\" font-size=\"18\">\n          ${linesToTspans(d.gap.statement, 60, 0, 30)}\n        </text>\n        ${footer(5)}\n      </svg>\n    </div>`;\n  }\n\n  function renderArtifactsPage(d) {\n    const items = d.artifacts.items.map((item, index) => {\n      const y = index * 110;\n      return `\n        <rect y=\"${y}\" width=\"674\" height=\"90\" fill=\"#ffffff\" rx=\"4\" filter=\"url(#boxShadow)\"/>\n        <use href=\"#icon-check-circle\" x=\"20\" y=\"${y + 30}\" width=\"30\" height=\"30\"/>\n        <text x=\"70\" y=\"${y + 50}\" class=\"f-heading\" fill=\"#1a365d\" font-size=\"18\">${escapeHtml(item[0])}</text>\n        <text x=\"70\" y=\"${y + 70}\" class=\"f-body\" fill=\"#64748b\" font-size=\"14\">${escapeHtml(item[1])}</text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"#f4f7fa\"/>\n        <text x=\"60\" y=\"100\" class=\"f-mono\" fill=\"#2196F3\" font-size=\"14\">${escapeHtml(d.artifacts.eyebrow)}</text>\n        <text x=\"60\" y=\"160\" class=\"f-display\" fill=\"#1a365d\" font-size=\"44\">${escapeHtml(d.artifacts.heading)}</text>\n\n        <g transform=\"translate(60, 240)\">${items}</g>\n\n        <rect x=\"60\" y=\"850\" width=\"674\" height=\"100\" fill=\"#1a365d\" rx=\"4\"/>\n        <text x=\"397\" y=\"895\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"20\" text-anchor=\"middle\">${escapeHtml(d.artifacts.summaryTitle)}</text>\n        <text x=\"397\" y=\"925\" class=\"f-mono\" fill=\"#2196F3\" font-size=\"18\" text-anchor=\"middle\" letter-spacing=\"2\">${escapeHtml(d.artifacts.summaryLine)}</text>\n        ${footer(6)}\n      </svg>\n    </div>`;\n  }\n\n  function renderLimitsPage(d) {\n    const items = d.limits.items.map((item, i) => {\n      const y = i * 120;\n      return `\n        <line x1=\"0\" y1=\"${y}\" x2=\"674\" y2=\"${y}\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/>\n        <use href=\"#icon-cross\" x=\"10\" y=\"${y + 30}\" width=\"40\" height=\"40\"/>\n        <text x=\"80\" y=\"${y + 55}\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"24\">${escapeHtml(item[0])}</text>\n        <text x=\"80\" y=\"${y + 80}\" class=\"f-body\" fill=\"#8898aa\" font-size=\"14\">${escapeHtml(item[1])}</text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#bgDarkGradient)\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"transparent\" filter=\"url(#noiseFilter)\" opacity=\"0.6\"/>\n        <text x=\"60\" y=\"100\" class=\"f-mono\" fill=\"#ff6b6b\" font-size=\"14\">${escapeHtml(d.limits.eyebrow)}</text>\n        <text x=\"60\" y=\"160\" class=\"f-display\" fill=\"#ffffff\" font-size=\"44\">${escapeHtml(d.limits.heading)}</text>\n        <g transform=\"translate(60, 260)\">${items}<line x1=\"0\" y1=\"600\" x2=\"674\" y2=\"600\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/></g>\n        <rect x=\"60\" y=\"930\" width=\"674\" height=\"4\" fill=\"#ff6b6b\"/>\n        ${footer(7)}\n      </svg>\n    </div>`;\n  }\n\n  function renderPillarsPage(d) {\n    const positions = [\n      { x: 0, y: 0 },\n      { x: 354, y: 0 },\n      { x: 0, y: 290 },\n      { x: 354, y: 290 }\n    ];\n\n    const cards = d.pillars.cards.map((card, i) => {\n      const pos = positions[i];\n      const fill = card.dark ? '#1a365d' : '#f4f7fa';\n      const textColor = card.dark ? '#ffffff' : '#1a365d';\n      const bodyColor = card.dark ? '#cbd5e1' : '#334155';\n      return `\n        <rect x=\"${pos.x}\" y=\"${pos.y}\" width=\"320\" height=\"260\" fill=\"${fill}\" ${card.dark ? 'filter=\"url(#boxShadow)\"' : 'stroke=\"#cbd5e1\"'} rx=\"4\"/>\n        <rect x=\"${pos.x}\" y=\"${pos.y}\" width=\"320\" height=\"4\" fill=\"${escapeHtml(card.color)}\" rx=\"2\"/>\n        <text x=\"${pos.x + 30}\" y=\"${pos.y + 60}\" class=\"f-display\" fill=\"${textColor}\" font-size=\"60\" opacity=\"0.1\">${escapeHtml(card.number)}</text>\n        <text x=\"${pos.x + 30}\" y=\"${pos.y + 90}\" class=\"f-heading\" fill=\"${textColor}\" font-size=\"20\">${escapeHtml(card.title)}</text>\n        <text x=\"${pos.x + 30}\" y=\"${pos.y + 150}\" class=\"f-body\" fill=\"${bodyColor}\" font-size=\"14\">\n          ${linesToTspans(card.lines, pos.x + 30, 0, 22)}\n        </text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"#ffffff\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#gridDark)\"/>\n        <text x=\"60\" y=\"100\" class=\"f-mono\" fill=\"#1a365d\" font-size=\"14\">${escapeHtml(d.pillars.eyebrow)}</text>\n        <text x=\"60\" y=\"160\" class=\"f-display\" fill=\"#1a365d\" font-size=\"44\">${escapeHtml(d.pillars.heading)}</text>\n        <g transform=\"translate(60, 240)\">${cards}</g>\n        ${footer(8)}\n      </svg>\n    </div>`;\n  }\n\n  function renderCtaPage(d) {\n    const featureLines = d.cta.features.map((item, i) => `<text x=\"397\" y=\"${190 + (i * 40)}\" class=\"f-body\" fill=\"#cbd5e1\" font-size=\"18\" text-anchor=\"middle\">${escapeHtml(item)}</text>`).join('');\n    const navLines = d.cta.navItems.map((item, i) => {\n      const y = 80 + (i * 30);\n      return `\n      <text x=\"40\" y=\"${y}\" class=\"f-heading\" fill=\"#ffffff\" font-size=\"16\">${escapeHtml(item[0])}</text>\n      <text x=\"190\" y=\"${y}\" class=\"f-body\" fill=\"#cbd5e1\" font-size=\"16\">${escapeHtml(item[1])}</text>`;\n    }).join('');\n\n    return `\n    <div class=\"a4-page\">\n      <svg class=\"page-svg\" viewBox=\"0 0 794 1123\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect width=\"100%\" height=\"100%\" fill=\"url(#bgDarkGradient)\"/>\n        <rect width=\"100%\" height=\"100%\" fill=\"transparent\" filter=\"url(#noiseFilter)\" opacity=\"0.6\"/>\n\n        <g transform=\"translate(0, 200)\">\n          <text x=\"397\" y=\"0\" class=\"f-display\" fill=\"#ffffff\" font-size=\"44\" text-anchor=\"middle\">${escapeHtml(d.cta.heading)}</text>\n          <text x=\"397\" y=\"80\" class=\"f-heading\" fill=\"#ff6b6b\" font-size=\"54\" text-anchor=\"middle\" letter-spacing=\"2\">${escapeHtml(d.cta.siteUrl)}</text>\n          <rect x=\"247\" y=\"140\" width=\"300\" height=\"2\" fill=\"rgba(255,255,255,0.1)\"/>\n          ${featureLines}\n\n          <g transform=\"translate(297, 340)\">\n            <rect width=\"200\" height=\"200\" fill=\"#ffffff\" rx=\"8\"/>\n            <rect x=\"20\" y=\"20\" width=\"50\" height=\"50\" fill=\"#1a365d\" rx=\"2\"/>\n            <rect x=\"28\" y=\"28\" width=\"34\" height=\"34\" fill=\"#ffffff\"/>\n            <rect x=\"36\" y=\"36\" width=\"18\" height=\"18\" fill=\"#1a365d\"/>\n            <rect x=\"130\" y=\"20\" width=\"50\" height=\"50\" fill=\"#1a365d\" rx=\"2\"/>\n            <rect x=\"138\" y=\"28\" width=\"34\" height=\"34\" fill=\"#ffffff\"/>\n            <rect x=\"146\" y=\"36\" width=\"18\" height=\"18\" fill=\"#1a365d\"/>\n            <rect x=\"20\" y=\"130\" width=\"50\" height=\"50\" fill=\"#1a365d\" rx=\"2\"/>\n            <rect x=\"28\" y=\"138\" width=\"34\" height=\"34\" fill=\"#ffffff\"/>\n            <rect x=\"36\" y=\"146\" width=\"18\" height=\"18\" fill=\"#1a365d\"/>\n            <rect x=\"90\" y=\"20\" width=\"20\" height=\"20\" fill=\"#1a365d\"/>\n            <rect x=\"130\" y=\"90\" width=\"20\" height=\"20\" fill=\"#1a365d\"/>\n            <rect x=\"90\" y=\"90\" width=\"20\" height=\"20\" fill=\"#ff6b6b\"/>\n            <rect x=\"160\" y=\"130\" width=\"20\" height=\"20\" fill=\"#1a365d\"/>\n            <rect x=\"90\" y=\"160\" width=\"20\" height=\"20\" fill=\"#1a365d\"/>\n            <rect x=\"130\" y=\"160\" width=\"20\" height=\"50\" fill=\"#1a365d\"/>\n          </g>\n\n          <g transform=\"translate(147, 620)\">\n            <rect width=\"500\" height=\"140\" fill=\"rgba(255,255,255,0.05)\" stroke=\"#2196F3\" stroke-width=\"2\" rx=\"4\"/>\n            <text x=\"250\" y=\"40\" class=\"f-mono\" fill=\"#2196F3\" font-size=\"14\" text-anchor=\"middle\">${escapeHtml(d.cta.navTitle)}</text>\n            ${navLines}\n          </g>\n        </g>\n\n        ${footer(9, d.meta.footerEndLabel)}\n      </svg>\n    </div>`;\n  }\n\n  function escapeHtml(value) {\n    return String(value ?? '')\n      .replace(/&/g, '&amp;')\n      .replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;')\n      .replace(/\"/g, '&quot;')\n      .replace(/'/g, '&#39;');\n  }\n})();\n","stderr":""}
Entendi tudo. Agora vou criar a Skill. Deixa eu mapear o que ela precisa fazer:

**O template tem:**
- 9 páginas SVG A4 (`cover`, `profile`, `pipeline`, `audience`, `gap`, `artifacts`, `limits`, `pillars`, `cta`)
- Separação total entre conteúdo (`content.js`) e visual (`render.js`, `tokens.css`, `svg-defs.js`)
- O único arquivo editável é o `content.js`

**A Skill vai:**
1. Entrevistar o usuário para coletar os dados de cada seção
2. Gerar o `content.js` preenchido
3. Empacotar com o template completo
4. Entregar o `.zip` pronto para abrir no browser
{"returncode":0,"stdout":"","stderr":""}
{"returncode":0,"stdout":"","stderr":""}
File created successfully: /home/claude/skill-output/neuroexecucao-editorial/SKILL.md
Agora vou empacotar a skill:
{"returncode":0,"stdout":"README.md\ncontent.js\nindex.html\nrender.js\nsvg-defs.js\ntokens.css\n","stderr":""}
{"returncode":0,"stdout":"  adding: neuroexecucao-editorial/ (stored 0%)\n  adding: neuroexecucao-editorial/assets/ (stored 0%)\n  adding: neuroexecucao-editorial/assets/content.js (deflated 66%)\n  adding: neuroexecucao-editorial/assets/index.html (deflated 48%)\n  adding: neuroexecucao-editorial/assets/tokens.css (deflated 60%)\n  adding: neuroexecucao-editorial/assets/render.js (deflated 82%)\n  adding: neuroexecucao-editorial/assets/README.md (deflated 43%)\n  adding: neuroexecucao-editorial/assets/svg-defs.js (deflated 68%)\n  adding: neuroexecucao-editorial/SKILL.md (deflated 62%)\nOK\n","stderr":""}
Skill criada e empacotada. ✅

**O que foi criado — `neuroexecucao-editorial.skill`:**

**Estrutura:**
```
neuroexecucao-editorial/
├── SKILL.md          ← instruções completas para o Claude
└── assets/
    ├── index.html    ← shell do documento
    ├── tokens.css    ← design system
    ├── svg-defs.js   ← ícones e filtros SVG
    ├── render.js     ← motor de renderização
    └── content.js    ← template de conteúdo (referência)
```

**O que a skill faz quando ativada:**
1. Conduz entrevista em 4 blocos (identidade → conteúdo → dados → pilares/CTA)
2. Gera o `content.js` completamente preenchido
3. Empacota com os arquivos estáticos do template
4. Entrega um `.zip` pronto — abre no browser, exporta como PDF com `Ctrl+P`

**Para instalar:** arraste o `.skill` para as configurações de skills do Claude Code ou Cowork.

Quer testar agora gerando um documento real com ela?

---

**Você** _2026-04-23_

/neuroexecucao-editorialiniciando workflow

---

**Claude** _2026-04-23_

1	---
     2	name: neuroexecucao-editorial
     3	description: Gera documentos editoriais A4 em HTML+SVG prontos para impressão/PDF usando o template Neuroexecução. Use esta skill SEMPRE que o usuário pedir para criar um documento editorial, proposta executiva, kit de posicionamento, apresentação de marca, documento de autoridade, relatório estratégico em formato A4, ou qualquer entregável visual profissional de 9 páginas. Ative também quando o usuário mencionar: "gerar meu documento", "preencher o template", "criar meu kit", "documento de posicionamento", "proposta visual A4", "editorial da minha marca". A skill conduz uma entrevista estruturada, gera o content.js preenchido e entrega um .zip pronto para abrir no browser e exportar como PDF.
     4	---
     5	
     6	# Skill: Neuroexecução Editorial A4
     7	
     8	Gera documentos editoriais SVG A4 completos a partir de uma entrevista com o usuário.
     9	
    10	## O que é o template
    11	
    12	Um sistema de 9 páginas SVG A4 em HTML puro. A separação é total:
    13	- `content.js` → **único arquivo que você edita** (todos os textos e dados)
    14	- `render.js` → motor de renderização (não editar)
    15	- `tokens.css` → design system visual (não editar)
    16	- `svg-defs.js` → ícones e filtros SVG (não editar)
    17	- `index.html` → shell do documento (não editar)
    18	
    19	## Páginas do documento
    20	
    21	| Página | Chave | Propósito |
    22	|--------|-------|-----------|
    23	| 1 | `cover` | Capa com título, subtítulo e badge |
    24	| 2 | `profile` | Quem é — nome, posicionamento, 3 cards |
    25	| 3 | `pipeline` | O que faz — método, fluxo, equação |
    26	| 4 | `audience` | Para quem — 3 segmentos de público |
    27	| 5 | `gap` | Por que existe — tese de mercado, métricas |
    28	| 6 | `artifacts` | O que há aqui — 5 entregáveis |
    29	| 7 | `limits` | Limites de escopo — 5 exclusões |
    30	| 8 | `pillars` | Compromisso — 4 pilares |
    31	| 9 | `cta` | Chamada final — URL, benefícios, navegação |
    32	
    33	## Fluxo de uso
    34	
    35	### 1. Entrevista
    36	
    37	Conduza uma entrevista em **blocos progressivos** — não pergunte tudo de uma vez. Use a sequência abaixo como guia, mas adapte ao contexto do usuário.
    38	
    39	**Bloco A — Identidade (obrigatório)**
    40	```
    41	- Qual é o nome da marca ou fundador?
    42	- Qual é o cargo/posicionamento?
    43	- Qual é a URL/domínio?
    44	- Qual é o título principal do documento? (ex: "MÉTODO X")
    45	- Qual é o subtítulo?
    46	```
    47	
    48	**Bloco B — Conteúdo central**
    49	```
    50	- Qual é o método/processo que você usa?
    51	- Qual é a entrada (insumo/fonte) e saída (entregável)?
    52	- Para quem você trabalha? (3 públicos/segmentos)
    53	- Qual é a sua proposta de valor em 1 frase?
    54	```
    55	
    56	**Bloco C — Dados e diferenciais**
    57	```
    58	- Existe algum dado de crescimento de mercado? (ex: +340% em 5 anos)
    59	- Como você se diferencia da categoria dominante? (comparativo)
    60	- Quais são os 5 principais entregáveis do seu trabalho?
    61	- O que está fora do escopo? (5 exclusões)
    62	```
    63	
    64	**Bloco D — Pilares e CTA**
    65	```
    66	- Quais são os 4 pilares do seu método/compromisso?
    67	- Qual é o CTA principal? (o que você quer que façam)
    68	- Quais são 2-3 benefícios de aceitar o CTA?
    69	```
    70	
    71	> **Dica de condução**: Se o usuário já forneceu um briefing, texto ou documento, extraia o máximo das respostas antes de perguntar. Pergunte apenas o que está faltando.
    72	
    73	### 2. Gerar o content.js
    74	
    75	Com os dados coletados, gere um `content.js` completo seguindo **exatamente** esta estrutura:
    76	
    77	```javascript
    78	window.CONTENT = {
    79	  meta: {
    80	    htmlTitle: '<Título do HTML>',
    81	    readingTime: '<X MIN>',
    82	    language: 'pt-BR',
    83	    documentId: '001',
    84	    documentLabel: 'RELATÓRIO ESTRATÉGICO',
    85	    footerEndLabel: 'FIM',
    86	    showToolbarHint: true
    87	  },
    88	
    89	  brand: {
    90	    siteUrl: '<URL-DO-DOMINIO.COM>',
    91	    brandName: '<NOME DA MARCA>',
    92	    founderName: '<NOME DO FUNDADOR>',
    93	    founderRole: '<CARGO / POSICIONAMENTO>',
    94	    profileMetaLine: '<IDADE OU ANOS • CARGO • EMPRESA>',
    95	    legalNote: '<DISCLAIMER OU AVISO LEGAL>'
    96	  },
    97	
    98	  cover: {
    99	    titleTop: '<PALAVRA 1 DO TÍTULO>',
   100	    titleBottom: '<PALAVRA 2 DO TÍTULO>',
   101	    subtitle: '<Subtítulo principal>',
   102	    badgeLabel: 'DOCUMENTO #001',
   103	    badgeTitle: '<Nome da peça/método>',
   104	    footerLeft: 'ACESSO ABERTO • LEITURA: X MIN'
   105	  },
   106	
   107	  profile: {
   108	    eyebrow: 'QUEM É',
   109	    heading: '<Nome da Pessoa ou Marca>',
   110	    bullet1: '→ <Primeiro ponto de posicionamento>',
   111	    bullet2: '→ <Segundo ponto de posicionamento>',
   112	    highlightLine1: '<Linha 1 da frase-chave>',
   113	    highlightLine2: '<Linha 2 da frase-chave>',
   114	    cards: [
   115	      { title: '<Bloco 1>', description: '<Descrição curta>', color: '#2196F3' },
   116	      { title: '<Bloco 2>', description: '<Descrição curta>', color: '#43A047' },
   117	      { title: '<Bloco 3>', description: '<Descrição curta>', color: '#ff6b6b' }
   118	    ]
   119	  },
   120	
   121	  pipeline: {
   122	    eyebrow: 'O QUE FAZ',
   123	    heading: '<Nome do método>',
   124	    paragraph: [
   125	      '<Linha 1 do racional>',
   126	      '<Linha 2 do racional>',
   127	      '<Linha 3 do racional>'
   128	    ],
   129	    inputTitle: '<Entrada/insumo principal>',
   130	    inputLabel: 'FONTE / INSUMO',
   131	    coreTitle: '<Processamento/método central>',
   132	    coreLabel: 'MÉTODO / MECÂNICA',
   133	    audiences: ['<Público 1>', '<Público 2>', '<Público 3>'],
   134	    equation: '[ <PILAR 1> ] × [ <PILAR 2> ] × [ <PILAR 3> ]'
   135	  },
   136	
   137	  audience: {
   138	    eyebrow: 'PARA QUEM',
   139	    heading: '<Título da seção de público>',
   140	    manifestoTitle: '<PROPOSTA DE VALOR EM CAPS>',
   141	    manifestoSubtitle: '<SUBTÍTULO / FRASE DE FIXAÇÃO>',
   142	    items: [
   143	      { icon: 'brain', color: '#2196F3', title: '<Segmento 1>', description: '<Descrição do segmento 1>' },
   144	      { icon: 'target', color: '#43A047', title: '<Segmento 2>', description: '<Descrição do segmento 2>' },
   145	      { icon: 'data', color: '#ff6b6b', title: '<Segmento 3>', description: '<Descrição do segmento 3>' }
   146	    ]
   147	  },
   148	
   149	  gap: {
   150	    eyebrow: 'POR QUE EXISTE',
   151	    heading: '<Título do gap de mercado>',
   152	    metricLabel: '<RÓTULO DA MÉTRICA>',
   153	    metricValue: '<+000%>',
   154	    leftLabel: '- 5 ANOS',
   155	    rightLabel: 'HOJE',
   156	    compareTitle: '<Título do comparativo>',
   157	    bar1Label: '<Categoria dominante>',
   158	    bar1Value: 90,
   159	    bar2Label: '<Categoria subatendida>',
   160	    bar2Value: 10,
   161	    statement: [
   162	      '<Linha 1 da tese>',
   163	      '<Linha 2 da tese>',
   164	      '<Linha 3 da tese>'
   165	    ]
   166	  },
   167	
   168	  artifacts: {
   169	    eyebrow: 'O QUE HÁ AQUI',
   170	    heading: '<Título dos entregáveis>',
   171	    summaryTitle: 'TODO CONTEÚDO É:',
   172	    summaryLine: 'REVISÁVEL • APLICÁVEL • MENSURÁVEL',
   173	    items: [
   174	      ['<Item 1>', '<Descrição do item 1>'],
   175	      ['<Item 2>', '<Descrição do item 2>'],
   176	      ['<Item 3>', '<Descrição do item 3>'],
   177	      ['<Item 4>', '<Descrição do item 4>'],
   178	      ['<Item 5>', '<Descrição do item 5>']
   179	    ]
   180	  },
   181	
   182	  limits: {
   183	    eyebrow: 'LIMITES DE ESCOPO',
   184	    heading: '<Título da seção de limites>',
   185	    items: [
   186	      ['<Limite 1>', '<Explicação do que está fora do escopo>'],
   187	      ['<Limite 2>', '<Explicação do que está fora do escopo>'],
   188	      ['<Limite 3>', '<Explicação do que está fora do escopo>'],
   189	      ['<Limite 4>', '<Explicação do que está fora do escopo>'],
   190	      ['<Limite 5>', '<Explicação do que está fora do escopo>']
   191	    ]
   192	  },
   193	
   194	  pillars: {
   195	    eyebrow: 'COMPROMISSO',
   196	    heading: '<Título dos pilares>',
   197	    cards: [
   198	      { number: '01', color: '#1a365d', title: '<Pilar 1>', lines: ['<Linha 1>', '<Linha 2>', '<Linha 3>', '<Linha 4>'], dark: false },
   199	      { number: '02', color: '#2196F3', title: '<Pilar 2>', lines: ['<Linha 1>', '<Linha 2>', '<Linha 3>', '<Linha 4>'], dark: false },
   200	      { number: '03', color: '#43A047', title: '<Pilar 3>', lines: ['<Linha 1>', '<Linha 2>', '<Linha 3>', '<Linha 4>'], dark: false },
   201	      { number: '04', color: '#ff6b6b', title: '<Pilar 4>', lines: ['<Linha 1>', '<Linha 2>', '<Linha 3>', '<Linha 4>'], dark: true }
   202	    ]
   203	  },
   204	
   205	  cta: {
   206	    heading: '<CTA principal>',
   207	    siteUrl: '<SEU-DOMINIO.COM>',
   208	    features: [
   209	      '→ <Benefício 1>',
   210	      '→ <Benefício 2>',
   211	      '→ <Benefício 3>'
   212	    ],
   213	    navTitle: 'NAVEGAÇÃO RECOMENDADA',
   214	    navItems: [
   215	      ['1. <Recurso principal>:', '<Descrição da rota 1>'],
   216	      ['2. <Recurso secundário>:', '<Descrição da rota 2>']
   217	    ]
   218	  }
   219	};
   220	```
   221	
   222	### 3. Empacotar e entregar
   223	
   224	Após gerar o `content.js`, monte o pacote final:
   225	
   226	```bash
   227	# 1. Criar pasta de output com nome da marca
   228	mkdir -p /home/claude/output/<nome-da-marca>
   229	
   230	# 2. Copiar os arquivos estáticos do template
   231	cp /mnt/skills/user/neuroexecucao-editorial/assets/index.html /home/claude/output/<nome-da-marca>/
   232	cp /mnt/skills/user/neuroexecucao-editorial/assets/tokens.css /home/claude/output/<nome-da-marca>/
   233	cp /mnt/skills/user/neuroexecucao-editorial/assets/svg-defs.js /home/claude/output/<nome-da-marca>/
   234	cp /mnt/skills/user/neuroexecucao-editorial/assets/render.js /home/claude/output/<nome-da-marca>/
   235	
   236	# 3. Salvar o content.js gerado
   237	cat > /home/claude/output/<nome-da-marca>/content.js << 'EOF'
   238	<conteúdo gerado>
   239	EOF
   240	
   241	# 4. Zipar tudo
   242	cd /home/claude/output
   243	zip -r <nome-da-marca>-editorial.zip <nome-da-marca>/
   244	
   245	# 5. Mover para outputs
   246	cp /home/claude/output/<nome-da-marca>-editorial.zip /mnt/user-data/outputs/
   247	```
   248	
   249	### 4. Instruções finais ao usuário
   250	
   251	Após entregar o arquivo, informe:
   252	
   253	> **Como usar:**
   254	> 1. Baixe e descompacte o `.zip`
   255	> 2. Abra `index.html` no browser (Chrome recomendado)
   256	> 3. Para exportar PDF: `Ctrl+P` → "Salvar como PDF" → marque "Tamanho A4" e desmarque margens
   257	> 4. Para editar conteúdo: edite apenas o arquivo `content.js`
   258	
   259	---
   260	
   261	## Regras de qualidade
   262	
   263	- **Nunca deixe placeholders** do tipo `<SUBSTITUA>` no output final
   264	- **Textos curtos**: títulos de cards máximo 3 palavras, linhas de pilares máximo 8 palavras
   265	- **Caps onde o template usa caps**: `eyebrow`, `manifestoTitle`, `summaryLine`, labels
   266	- **URLs sem https://** nos campos `siteUrl` (ex: `minha-marca.com.br`)
   267	- **bar1Value + bar2Value** não precisam somar 100, são valores independentes de representação visual
   268	- **`dark: true`** apenas no card 04 dos pilares (fundo escuro)
   269	- Se o usuário não souber algum dado (ex: métrica de mercado), use um valor representativo e indique para revisar
   270	
   271	---
   272	
   273	## Referência de ícones disponíveis
   274	
   275	Os ícones disponíveis para `audience.items[].icon` são:
   276	- `brain` → ícone de cérebro/inteligência
   277	- `target` → ícone de alvo/precisão  
   278	- `data` → ícone de dados/gráfico
   279	
Skill carregada. Vamos começar a entrevista! 🎯

---

**Bloco A — Identidade**

Preciso de 5 informações básicas pra montar a base do documento:
{
  "questions": [
    {
      "question": "Qual \u00e9 o nome da marca ou fundador?",
      "options": [
        "Vou digitar abaixo",
        "\u00c9 uma marca",
        "\u00c9 uma pessoa f\u00edsica",
        "\u00c9 pessoa + marca"
      ]
    }
  ]
}
Me conta tudo do **Bloco A** de uma vez — pode ser em tópicos, texto corrido, como preferir:

1. **Nome** da marca e/ou fundador
2. **Cargo / posicionamento** (ex: "Estrategista de Negócios", "Coach de Alta Performance")
3. **URL / domínio** (ex: `minharca.com.br`)
4. **Título principal** do documento — normalmente 2 palavras em destaque (ex: "MÉTODO EXECUÇÃO", "KIT AUTORIDADE")
5. **Subtítulo** — uma frase que completa o título

---

**Você** _2026-04-24_

P: Qual é o nome da marca ou fundador?
R: É pessoa + marca

---

**Claude** _2026-04-24_

Ótimo! Então preciso dos dois. Me passa:

1. **Nome da pessoa** (fundador/a)
2. **Nome da marca**
3. **Cargo / posicionamento** da pessoa na marca
4. **URL / domínio**
5. **Título do documento** (2 palavras em destaque, ex: "MÉTODO EXECUÇÃO")
6. **Subtítulo** (frase que completa o título)

---

**Você** _2026-04-24_

Gere questinarip interativo rápido aqui como esse de exemplo com todas as perguntas

---

**Claude** _2026-04-24_

1	---
     2	name: frontend-design
     3	description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.
     8	
     9	The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
    10	
    11	## Design Thinking
    12	
    13	Before coding, understand the context and commit to a BOLD aesthetic direction:
    14	- **Purpose**: What problem does this interface solve? Who uses it?
    15	- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
    16	- **Constraints**: Technical requirements (framework, performance, accessibility).
    17	- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?
    18	
    19	**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.
    20	
    21	Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
    22	- Production-grade and functional
    23	- Visually striking and memorable
    24	- Cohesive with a clear aesthetic point-of-view
    25	- Meticulously refined in every detail
    26	
    27	## Frontend Aesthetics Guidelines
    28	
    29	Focus on:
    30	- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
    31	- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
    32	- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
    33	- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
    34	- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
    35	
    36	NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.
    37	
    38	Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
    39	
    40	**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
    41	
    42	Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
    43

---

**Você** _2026-04-24_

In line

---

**Claude** _2026-04-24_

File already exists: /mnt/user-data/outputs/neuroexecucao-form.jsx
{"returncode":0,"stdout":"","stderr":""}
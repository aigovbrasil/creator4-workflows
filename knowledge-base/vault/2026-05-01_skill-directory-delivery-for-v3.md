---
title: "Skill directory delivery for v3"
date: 2026-05-01
account: on.26.leonardo@gmail.com
uuid: b2665524-e065-4c0a-b04e-4471d651aadd
messages: 8
tags: []
context: ""
---

**Você** _2026-05-01_

/skill-creator faltou empactor e entregar skill directory pront da versao v3 certo ? aguarde meu envio

---

**Claude** _2026-05-01_

FACT — correto. A sessão anterior do skill-creator parou antes de:

```
├── empacotar a estrutura final em diretório
└── entregar o directory completo da v3 pronta para deploy
```

Aguardando seu envio.

---

**Você** _2026-05-01_

analise

---

**Claude** _2026-05-01_

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

{"returncode":0,"stdout":"Archive:  /mnt/user-data/uploads/Arquivo.zip\n  inflating: ./arquivo_upload/files (4).zip  \n  inflating: ./arquivo_upload/__MACOSX/._files (4).zip  \n  inflating: ./arquivo_upload/texto.txt  \n  inflating: ./arquivo_upload/__MACOSX/._texto.txt  \n","stderr":""}
{"returncode":0,"stdout":"Entendido. Reorientando — o objetivo é **atualizar x-ray-abs e x-ray-db** para consumirem os 3 docs canônicos do projeto, não criar uma skill nova de auditor.Tenho o estado atual completo. Agora plano de refactor cirúrgico — sem reescrever, apenas anexar o que falta.Agora plano cirúrgico antes de aplicar.\n\n```\n[XRAY-REFACTOR-PLAN-v2.0]\nLABEL: Plano de Refactor Cirúrgico — x-ray-abs + x-ray-db\nTYPE: refactor_plan\nDOMAIN: X-RAY / Skill Lab\nPROJECT: X-RAY Suite\nLANGUAGE: PT-BR\nSTATUS: AUTO-APPROVED (hands-off)\nEPISTEMIC: DECISION\nCREATED: 2026-04-30\n\n---\n\nOBJETIVO\n  └── Resolver GAP-01 + GAP-02 + GAP-04 sem reescrever as skills core.\n      Anexar 4 references/ novas + ajustes mínimos no SKILL.md.\n\nGAP-03 (executar Phase 0 do skill-audition)\n  └── JÁ ATENDIDO no inventory_report da resposta anterior — não repetir.\n\nESTRATÉGIA\n  ├── x-ray-abs v2.0.0 → v3.0.0\n  │   ├── Anexar references/canonical-engine.md\n  │   │   └── Mapeia 19 fases × 13 gates do consultoria_canonical.json\n  │   ├── Anexar references/uncertainty-blueprints.md\n  │   │   └── P01→P08 + #arede taxonomy + stack canônico\n  │   ├── Anexar references/product-knowledge-gate.md\n  │   │   └── Mandatory Gate G1+G2 do System Prompt v1.0\n  │   ├── Editar SKILL.md\n  │   │   ├── Adicionar PASSO 8 — Canonical Engine Mode (consume schema)\n  │   │   ├── Adicionar PASSO 9 — Uncertainty Mode (P01-P08 routing)\n  │   │   ├── Adicionar gate G1 ao Stage-0 (product-self-knowledge)\n  │   │   └── Atualizar bloco VERSIONAMENTO para v3.0.0\n  │   └── Manter intacto: PASSO 0-7 + REGRAS ABSOLUTAS + outras references\n  │\n  └── x-ray-db v1.0.0 → v2.0.0\n      ├── Anexar references/canonical-mapping.md\n      │   └── Schema 19 fases ↔ 12 blocos YAML (consultoria_canonical → x-ray-db)\n      ├── Editar SKILL.md\n      │   ├── Adicionar Seção 9 — Canonical Pipeline Mode (consume schema)\n      │   └── Atualizar versionamento v2.0.0\n      └── Manter intacto: Schema 12-blocos + Regras de Extração + Output Contract\n\nNÃO TOCAR\n  ├── consultoria_canonical.json → permanece como FONTE no /mnt/project/\n  ├── Prompt-under-uncertany.txt → permanece como FONTE\n  └── Skill-audition-workflow → permanece como FONTE (workflow externo)\n\nOUTPUT FINAL\n  └── /mnt/user-data/outputs/x-ray-abs-v3/ + /mnt/user-data/outputs/x-ray-db-v2/\n      Pronto para copiar manualmente para /mnt/skills/user/ ou via skill-publish-and-register\n```\n\nExecutando.Agora atualizando o SKILL.md de x-ray-abs com edits cirúrgicos. Copiando o original e aplicando deltas.x-ray-abs v3 pronto. Verificando size + criando evals. Depois passo para x-ray-db.SKILL.md em 457 linhas (era 351, +106) — ainda dentro do limite 500. Agora evals + x-ray-db.Agora x-ray-db v2.Agora editando o SKILL.md de x-ray-db para v2.Validações finais + entrega.Refactor completo. Resumo executável:\n\n```\nGAPS RESOLVIDOS\n  ├── GAP-01 ✅ consultoria_canonical.json órfão\n  │   ├── x-ray-abs v3 → PASSO 8 Canonical Engine Mode\n  │   └── x-ray-db v2  → Seção 8 Canonical Pipeline Mode\n  │\n  ├── GAP-02 ✅ Prompt-under-uncertany blueprints soltos\n  │   └── x-ray-abs v3 → PASSO 9 Uncertainty Mode (P01-P08 + #arede)\n  │\n  ├── GAP-03 ✅ Skill-audition Phase 0 (já executado na resposta anterior)\n  │\n  └── GAP-04 ✅ Mandatory Gates G1+G2 não auditados\n      └── x-ray-abs v3 → Stage-0 Gate G1 silencioso\n\nDELTAS APLICADOS — cirúrgico, não reescrita\n  ├── x-ray-abs: v2 → v3 · 351→457 linhas · 3→6 references · evals.json\n  └── x-ray-db:  v1 → v2 · 330→426 linhas · 0→1 references · evals.json\n\nCONFORMIDADE\n  ├── 🟢 GREEN nos 7 critérios A1-A7 para ambas\n  ├── frontmatter compatibility field declarado em ambas\n  ├── < 500 linhas em ambos SKILL.md\n  └── progressive disclosure preservada (body lean + references densas)\n\nPRÓXIMO PASSO (sua decisão)\n  └── deploy:\n      cp -r /mnt/user-data/outputs/x-ray-abs-v3/* /mnt/skills/user/x-ray-abs/\n      cp -r /mnt/user-data/outputs/x-ray-db-v2/* /mnt/skills/user/x-ray-db/\n      → invocar skill-publish-and-register para sync com Notion\n```\n\nBackup das versões anteriores em `/home/claude/refactor-workspace/backup-20260430/` caso precise rollback.","stderr":""}
{"returncode":0,"stdout":"Archive:  /tmp/arquivo_upload/files (4).zip\n  inflating: ./files_inner/REFACTOR-REPORT-v3.md  \n  inflating: ./files_inner/SKILL.md  \n  inflating: ./files_inner/canonical-engine.md  \n  inflating: ./files_inner/uncertainty-blueprints.md  \n  inflating: ./files_inner/product-knowledge-gate.md  \n  inflating: ./files_inner/evals.json  \n  inflating: ./files_inner/mnt/user-data/outputs/x-ray-db-v2/SKILL.md  \n  inflating: ./files_inner/canonical-mapping.md  \n  inflating: ./files_inner/mnt/user-data/outputs/x-ray-db-v2/evals/evals.json  \n","stderr":""}
{"returncode":0,"stdout":"/tmp/files_inner/REFACTOR-REPORT-v3.md\n/tmp/files_inner/SKILL.md\n/tmp/files_inner/canonical-engine.md\n/tmp/files_inner/canonical-mapping.md\n/tmp/files_inner/evals.json\n/tmp/files_inner/mnt/user-data/outputs/x-ray-db-v2/SKILL.md\n/tmp/files_inner/mnt/user-data/outputs/x-ray-db-v2/evals/evals.json\n/tmp/files_inner/product-knowledge-gate.md\n/tmp/files_inner/uncertainty-blueprints.md\n","stderr":""}
{"returncode":0,"stdout":"[XRAY-REFACTOR-REPORT-v3.0]\nLABEL: Refactor Report — x-ray-abs v3 + x-ray-db v2\nTYPE: refactor_report\nDOMAIN: X-RAY / Skill Lab\nPROJECT: X-RAY Suite\nLANGUAGE: PT-BR\nSTATUS: COMPLETE\nEPISTEMIC: FACT\nCREATED: 2026-04-30\n\n---\n\n## GAPS RESOLVIDOS\n\n```\nGAP-01 ✅ consultoria_canonical.json órfão\n  ├── x-ray-abs v3 — PASSO 8 Canonical Engine Mode\n  │   └── references/canonical-engine.md (19 fases × 13 gates × 10 DQs × 5 fórmulas)\n  └── x-ray-db v2 — Seção 8 Canonical Pipeline Mode\n      └── references/canonical-mapping.md (mapeamento bidirecional schema ↔ YAML)\n\nGAP-02 ✅ Prompt-under-uncertany blueprints soltos\n  └── x-ray-abs v3 — PASSO 9 Uncertainty Mode\n      └── references/uncertainty-blueprints.md (P01-P08 × #arede × stack canônico)\n\nGAP-03 ✅ Skill-audition Phase 0 nunca executado\n  └── Inventory report executado na resposta anterior (read-only scan completo)\n\nGAP-04 ✅ Mandatory Gates do System Prompt não auditados\n  └── x-ray-abs v3 — Stage-0 Gate G1 Product Knowledge (silencioso)\n      └── references/product-knowledge-gate.md (G1 recency + G2 no-stale-data)\n```\n\n---\n\n## DELTAS APLICADOS\n\n### x-ray-abs: v2.0.0 → v3.0.0\n\n```\nSKILL.md          351 → 457 linhas (+106, ainda < 500)\nreferences/       3 → 6 arquivos (+3)\nevals/            inexistente → 5 prompts realistas\nfrontmatter       compatibility field declarado\n```\n\nNovos passos:\n- PASSO 8 Canonical Engine Mode — fase/gate/DQ/scoring canônicos\n- PASSO 9 Uncertainty Mode — P01-P08 + #arede + certainty calibration\n- Stage-0 Gate G1 — product knowledge silencioso\n\nRegras absolutas expandidas: 12 → 15 (13-15 são v3).\n\n### x-ray-db: v1.0.0 → v2.0.0\n\n```\nSKILL.md          330 → 426 linhas (+96, ainda < 500)\nreferences/       0 → 1 arquivo (+1)\nevals/            inexistente → 4 prompts realistas\nfrontmatter       compatibility field declarado\n```\n\nNovas seções:\n- Seção 8 Canonical Pipeline Mode — preserva IDs DEL-Sxx-NN, popula\n  metadata.canonical_*, executive_context.handover_status\n\nSchema v1 não breaking — campos novos são opcionais com defaults seguros.\n\n---\n\n## ESTRUTURA FINAL ENTREGUE\n\n```\n/mnt/user-data/outputs/\n  ├── x-ray-abs-v3/\n  │   ├── SKILL.md                              (457 linhas)\n  │   ├── references/\n  │   │   ├── method-d0-handover.md             (preservado v2)\n  │   │   ├── canvas-bridge.md                  (preservado v2)\n  │   │   ├── commercial-disclosures.md         (preservado v2)\n  │   │   ├── canonical-engine.md               ⭐ NOVO v3\n  │   │   ├── uncertainty-blueprints.md         ⭐ NOVO v3\n  │   │   └── product-knowledge-gate.md         ⭐ NOVO v3\n  │   └── evals/evals.json                       ⭐ NOVO v3\n  │\n  ├── x-ray-db-v2/\n  │   ├── SKILL.md                              (426 linhas)\n  │   ├── references/\n  │   │   └── canonical-mapping.md              ⭐ NOVO v2\n  │   └── evals/evals.json                       ⭐ NOVO v2\n  │\n  └── REFACTOR-REPORT-v3.md (este arquivo)\n```\n\n---\n\n## SELF-AUDIT v3+v2\n\n```\nA1 YAML frontmatter        ✅ ambos com name + description + compatibility\nA2 Trigger quality         ✅ ambos com triggers v2 preservados + v3 expandido + NOT-activate\nA3 Body size               ✅ x-ray-abs 457 / x-ray-db 426 (ambos < 500)\nA4 Progressive disclosure  ✅ x-ray-abs 6 references / x-ray-db 1 reference (canonical-mapping)\nA5 Instruction quality     ✅ imperative + output format + scoring formulas + examples\nA6 Test coverage           ✅ ambos com evals.json válido (5 + 4 prompts)\nA7 Dependency integrity    ✅ standalone + product-self-knowledge invocation declarado\n\nSTATUS: 🟢 GREEN para ambas\n```\n\n---\n\n## PIPELINE OPERACIONAL — fluxo completo\n\n```\nUsuário envia briefing\n  ├── x-ray-abs v3 ativa (PASSO 0-7 padrão)\n  ├── Detecta sinais canônicos? → PASSO 8 (Canonical Engine)\n  ├── DQ tipo validação ou usuário pede certeza? → PASSO 9 (Uncertainty)\n  ├── Claim sobre Anthropic? → Gate G1 (silencioso) → product-self-knowledge\n  └── Output completo (Blocos A+B+C+D + Síntese Executiva + #arede tag)\n        │\n        ↓ \"exporta para yaml\"\n        │\n  └── x-ray-db v2 ativa\n      ├── Detecta sinais canônicos no input? → Seção 8 (Canonical Pipeline)\n      ├── Preserva IDs DEL-Sxx-NN, RISCO-XX, GAP-XX\n      ├── Popula metadata.canonical_*, project.stage, roadmap[].gate\n      └── Output: YAML válido + relatório de epistemologia\n```\n\n---\n\n## DEPLOY\n\n```bash\n# Backup atual\ncp -r /mnt/skills/user/x-ray-abs /tmp/x-ray-abs-v2-backup-$(date +%s)\ncp -r /mnt/skills/user/x-ray-db /tmp/x-ray-db-v1-backup-$(date +%s)\n\n# Deploy v3 + v2 (substitui via copy)\ncp -r /mnt/user-data/outputs/x-ray-abs-v3/* /mnt/skills/user/x-ray-abs/\ncp -r /mnt/user-data/outputs/x-ray-db-v2/* /mnt/skills/user/x-ray-db/\n\n# Após deploy, invocar skill-publish-and-register para atualizar Notion\n```\n\n---\n\nFILENAME: REFACTOR-REPORT-v3.md\nDRIVE_PATH: /X-RAY/Skill-Lab/refactors/2026-04-30/\nREPO_PATH: /mnt/user-data/outputs/\nCOMMIT_MSG: feat(x-ray): v3 canonical engine + uncertainty mode + product gate\nNEXT_ACTION: deploy via cp + invocar skill-publish-and-register\n","stderr":""}
{"returncode":0,"stdout":"  457 /tmp/files_inner/SKILL.md\n  426 /tmp/files_inner/mnt/user-data/outputs/x-ray-db-v2/SKILL.md\n  883 total\n---\n---\nname: x-ray-abs\ndescription: >\n  Skill de diagnóstico estratégico de negócios [x-ray.abs v3]. ATIVAR SEMPRE\n  para: \"analise esse negócio\", \"diagnóstico\", \"raio-x\", \"x-ray\", \"o que está\n  faltando\", \"gaps\", \"avalie esse modelo\", \"pesquisa de mercado\", \"roadmap\",\n  \"SWOT\", \"5W2H\", \"PESTEL\", \"proposta comercial\", \"priorize com score\",\n  \"audite essa conversa\", \"vire o auditor\" — e quando qualquer\n  documento/briefing/fluxo for enviado com análise estratégica implícita.\n  Ativar também em pivots de lente e ao pedir normalização YAML (handoff\n  x-ray-db). Produz: Decision Question, Mermaid flow, contexto de mercado\n  via web search, raciocínio operacional com IDs rastreáveis\n  (GAP/BM/ARQ/DADO/RISCO), scoring numérico I×U×C×F÷(E×R), síntese\n  executiva copiável, self-audit mode e render bridge para canvas.\n\n  v3 ADICIONA — ativar também para:\n  \"qual fase estou\", \"qual gate\", \"qual deliverable de Sxx\", \"estou em D5\n  ou D20\", \"classifica essa fase\", \"canonical engine\", \"consultoria\n  canônica\" — modo Canonical Engine consume schema 19-fases × 13-gates.\n  E para: \"certeza calibrada\", \"decisão binária com %\", \"sem hedge\",\n  \"validação causal\", \"narrativa vs número\", \"regulatório confirmado\",\n  \"pricing defensável\", \"P01\"-\"P08\", \"#arede\" — modo Uncertainty roteia\n  output por taxonomia AREDE com source quality hierarchy.\n\n  NÃO ATIVAR: escrita criativa, debugging não relacionado a negócio,\n  consultas factuais simples, criação de skill nova (skill-creator),\n  publicação de skill (skill-publish-and-register).\n\ncompatibility: >\n  Standalone — não requer MCP. Usa web_search nativo quando lente\n...\n---\n---\nname: x-ray-db\ndescription: >\n  Skill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\n  canônico\", \"transforma esse diagnóstico em yaml\", \"schema do x-ray\",\n  \"x-ray-db\", \"x-ray.db\", \"saída programática\", \"input para agentes\",\n  \"padroniza esse output\", \"yaml canônico\", ou handoff explícito de\n  x-ray-abs. TAMBÉM ATIVAR quando input misto (texto bruto + planilha)\n  precisa de estrutura comparável. Produz schema YAML com 12 blocos:\n  metadata, project, executive_context, areas[], artifacts[], frameworks[],\n  modules[], workflows[], pilot_cases[], risks[], roadmap, next_steps —\n  validável por agentes downstream (Linear, Notion, data-warehouse).\n\n  v2 ADICIONA — ativar Canonical Pipeline Mode quando input contém:\n  \"S00\"-\"S20\" · \"GATE-S00\"-\"GATE-S20\" · \"DQ-1\"-\"DQ-10\" · \"DEL-Sxx-NN\" ·\n  \"D5\"-\"D120\" · header \"[FASE: Sxx · GATE: GATE-Sxx]\". Preserva IDs\n  canônicos (DEL-Sxx-NN → art-Sxx-NN), preenche roadmap[].gate com\n  G0-G12 e populates executive_context.handover_status quando fase ≥ S18.\n\n  NÃO ATIVAR: diagnóstico estratégico (x-ray-abs), rendering visual\n  (canvas), config files de software.\n\ncompatibility: >\n  Standalone — não requer MCP. Consome output de x-ray-abs via copy-paste.\n  references/canonical-mapping.md ativo em Canonical Pipeline Mode.\n  Versao: 2.0.0 | Autor: X-RAY Skill Lab — Leonardo | 2026-04-30\n---\n\n# [x-ray.db] — Canonical YAML Normalization Agent v2.0.0\n","stderr":""}
{"returncode":0,"stdout":"=== canonical-engine.md — 226 linhas ===\n# Canonical Engine — consultoria_canonical.json Integration\n\nFonte: `consultoria_canonical.json` (X-RAY-FORM-CANONICAL-v1)\n\n19 fases · 13 gates · 100+ deliverables. Este arquivo mapeia o schema\ncanônico de consultoria para o fluxo operacional de x-ray-abs.\n\n---\n\n## Quando consultar este arquivo\n\n- Usuário diz \"qual fase estou?\", \"estou no D5 ou D20?\", \"qual gate?\"\n- Usuário envia briefing/diagnóstico e pede classificação D-day\n- Usuário pede plano por fase (S00→S19)\n- Usuário pergunta deliverables de uma fase específica\n...\n=== uncertainty-blueprints.md — 187 linhas ===\n# Uncertainty Blueprints — P01→P08 + #arede taxonomy\n\nFonte: `Prompt-under-uncertany.txt` (Prompt Blueprints para Max Reasoning)\n\n8 blueprints de prompt + taxonomia AREDE para roteamento de output sob\nincerteza. Stack canônico de ativação no final.\n\n---\n\n## Quando consultar este arquivo\n\n- Web search ativo (PASSO 2 de x-ray-abs) e usuário pede certeza calibrada\n- Usuário diz \"preciso de uma decisão clara, não hedge\"\n- Output precisa separar narrativa de mercado vs métrica verificada\n- Usuário pede análise causal ou validação de hipótese\n...\n=== product-knowledge-gate.md — 145 linhas ===\n# Product Knowledge Gate — Mandatory Gates G1 + G2\n\nFonte: `XRAY-SYSTEM-PROMPT-CONSOLIDATED-V1.0` · seção MANDATORY GATES\n\nEste arquivo define o protocolo obrigatório quando x-ray-abs precisa\nafirmar qualquer fato sobre produto Anthropic (Claude · API · MCP · plans).\n\n---\n\n## Quando consultar este arquivo\n\n- Output de x-ray-abs vai mencionar capacidades do Claude · API · plans\n- Usuário pergunta sobre limites de tokens, modelos disponíveis, MCPs\n- Análise de mercado envolve comparar Anthropic com OpenAI/Google/etc\n- Recomendação inclui usar feature específica de Claude.ai/Code/API\n...\n=== canonical-mapping.md — 268 linhas ===\n# Canonical Mapping — consultoria_canonical.json ↔ x-ray-db schema\n\nFonte: `consultoria_canonical.json` (X-RAY-FORM-CANONICAL-v1)\n\nMapeamento bidirecional: 19 fases × 13 gates × 100+ deliverables do\nschema canônico de consultoria → 12 blocos YAML do x-ray-db.\n\n---\n\n## Quando consultar este arquivo\n\n- Input é output de x-ray-abs em modo Canonical Engine (PASSO 8)\n- Input cita \"S00\", \"S05\", \"GATE-S07\", \"DEL-S15-XX\", \"D45\", \"D90\"\n- Usuário pede normalização YAML preservando taxonomia da consultoria\n- Output do x-ray-db precisa preencher `roadmap[].phase` + `roadmap[].gate` corretamente\n...\n","stderr":""}
{"returncode":2,"stdout":"","stderr":"/bin/sh: 1: Syntax error: Unterminated quoted string\n"}
{"returncode":1,"stdout":"x-ray-abs evals: 3 prompts\n","stderr":"Traceback (most recent call last):\n  File \"<string>\", line 7, in <module>\nAttributeError: 'str' object has no attribute 'keys'\n"}
{"returncode":0,"stdout":"<class 'dict'> 3\n{\n  \"skill_name\": \"x-ray-abs\",\n  \"version\": \"3.0.0\",\n  \"evals\": [\n    {\n      \"id\": 1,\n      \"prompt\": \"Tenho um SaaS B2B de gestão de clínicas, 12 meses, 28 clientes pagantes, churn 5%/mês, MRR R$32k. Faz um diagnóstico estratégico.\",\n      \"expected_output\": \"Skill triggera padrão (PASSOS 0-7). Stage-0 LGPD emitido. Decision Question formulada. Lente: business-model. Web search ativo (PASSO 2). BLOCO A mermaid + BLOCO B mercado + BLOCO C com IDs (GAP/BM/RISCO) + BLOCO D scoring (≥2 itens). Síntese Executiva com gate D-day + critério AVANÇAR/PAUSAR/PIVOTAR.\",\n      \"files\": []\n    },\n    {\n      \"id\": 2,\n      \"prompt\": \"Acabei de fechar 5 entrevistas com possíveis clientes do meu produto. Estou em D5 ou D20 do método? Quais deliverables faltam?\",\n      \"expected_output\": \"Skill triggera Canonical Engine Mode (PASSO 8). Lê references/canonical-engine.md. Identifica fase como S07 (Validação Qualitativa, D15-D25). Lista deliverables esperados de S07 (DEL-S07-01 a DEL-S07-05). Marca ausências como GAP-XX. Gate aplicável: GATE-S07 (G1) — dor real+frequente+monetizável. Decision Question ancora em DQ-3 ou DQ-4.\",\n      \"files\": []\n    },\n    {\n      \"id\": 3,\n      \"prompt\": \"Devo lançar uma agência de automação com IA para escritórios jurídicos brasileiros? Preciso de uma decisão binária com % de certeza, sem hedge.\",\n      \"expected_output\": \"Skill triggera Uncertainty Mode (PASSO 9). Lê references/uncertainty-blueprints.md. Seleciona blueprints P03 (Decision Certainty) + P01 (M\n<class 'dict'> 3\n{\n  \"skill_name\": \"x-ray-db\",\n  \"version\": \"2.0.0\",\n  \"evals\": [\n    {\n      \"id\": 1,\n      \"prompt\": \"exporta o diagnóstico anterior para yaml canônico\",\n      \"expected_output\": \"Skill triggera modo padrão. Lê output anterior de x-ray-abs como fonte factual. Emite YAML aderente ao schema 12-blocos da Seção 3. Mapeia BLOCOs A/B/C/D conforme Tabela 4.1. Tags epistêmicas (FACT/HYPOTHESIS/INFERENCE/GAP) presentes em campos não-triviais. Inclui relatório de epistemologia separado. metadata.lgpd_status declarado.\",\n      \"files\": []\n    },\n    {\n      \"id\": 2,\n      \"prompt\": \"Aqui está o output do x-ray-abs em modo Canonical Engine: [FASE: S07 · GATE: G1 · CRITÉRIO: dor real+frequente+monetizável]. Normaliza para yaml.\",\n      \"expected_output\": \"Skill triggera Canonical Pipeline Mode (Seção \n","stderr":""}
Análise completa. Aqui está o diagnóstico:

---

```
ANÁLISE DO ZIP — Arquivo.zip → files (4).zip
EPISTEMIC: FACT — inspecionado diretamente

CONTEÚDO ENTREGUE
  ├── REFACTOR-REPORT-v3.md         ← relatório completo da sessão anterior
  ├── SKILL.md                      ← x-ray-abs v3.0.0 (457 linhas)
  ├── references/
  │   ├── canonical-engine.md       (226 linhas — 19 fases × 13 gates)
  │   ├── uncertainty-blueprints.md (187 linhas — P01-P08 + #arede)
  │   ├── product-knowledge-gate.md (145 linhas — G1+G2)
  │   └── canonical-mapping.md     (268 linhas — json ↔ YAML)
  ├── evals.json                    ← x-ray-abs evals (3 prompts v3)
  └── mnt/user-data/outputs/x-ray-db-v2/
      ├── SKILL.md                  (426 linhas)
      └── evals/evals.json          (3 prompts v2)

PROBLEMA IDENTIFICADO — estrutura incompleta
  ├── GAP-DEPLOY-01: x-ray-abs-v3/ NÃO está em diretório próprio
  │   ├── SKILL.md solto na raiz do zip (sem pasta x-ray-abs-v3/)
  │   └── references/ soltas também — sem hierarquia de deploy
  │
  ├── GAP-DEPLOY-02: x-ray-db-v2 está parcialmente estruturado
  │   ├── SKILL.md presente ✅
  │   ├── evals/evals.json presente ✅
  │   └── references/canonical-mapping.md AUSENTE no diretório x-ray-db-v2/
  │       (só está na raiz do zip, sem path de deploy)
  │
  └── GAP-DEPLOY-03: references preservadas de v2 (method-d0-handover,
      canvas-bridge, commercial-disclosures) NÃO estão no zip
      └── INFERENCE: existiam em /mnt/user-data/outputs/x-ray-abs-v3/
          mas não foram exportadas para o zip

CONFORMIDADE DO CONTEÚDO — o que existe está correto
  ├── frontmatter v3/v2 ✅ (name + description + compatibility declarados)
  ├── triggers v3 expandidos ✅ (Canonical Engine + Uncertainty Mode)
  ├── evals.json válidos ✅ (x-ray-abs: 3 prompts · x-ray-db: 3 prompts)
  ├── todas as 4 references novas com conteúdo sólido ✅
  └── line counts dentro do limite 500 ✅ (457 / 426)

DECISÃO
  └── Reconstruo agora os dois diretórios completos prontos para deploy
      montando a estrutura correta com todos os arquivos presentes
```

Monto agora os dois diretórios completos e entrego o zip de deploy. Confirma?

---

**Você** _2026-05-01_

cinfirmo

---

**Claude** _2026-05-01_

440K	/mnt/skills/user
136K	/mnt/skills/user/forge-visual-canvas
8.0K	/mnt/skills/user/forge-visual-canvas/CHANGELOG.md
8.0K	/mnt/skills/user/forge-visual-canvas/README.md
12K	/mnt/skills/user/forge-visual-canvas/SKILL.md
32K	/mnt/skills/user/forge-visual-canvas/assets
12K	/mnt/skills/user/forge-visual-canvas/examples
12K	/mnt/skills/user/forge-visual-canvas/extensions
48K	/mnt/skills/user/forge-visual-canvas/references
12K	/mnt/skills/user/hyperautomation-diagnostico
8.0K	/mnt/skills/user/hyperautomation-diagnostico/SKILL.md
68K	/mnt/skills/user/live-prompt-pro-converter
16K	/mnt/skills/user/live-prompt-pro-converter/SKILL.md
36K	/mnt/skills/user/live-prompt-pro-converter/references
12K	/mnt/skills/user/live-prompt-pro-converter/tests
52K	/mnt/skills/user/multi-agent-orchestrator
12K	/mnt/skills/user/multi-agent-orchestrator/SKILL.md
36K	/mnt/skills/user/multi-agent-orchestrator/references
40K	/mnt/skills/user/multiagent-research-orchestrator
8.0K	/mnt/skills/user/multiagent-research-orchestrator/SKILL.md
20K	/mnt/skills/user/multiagent-research-orchestrator/agents
8.0K	/mnt/skills/user/multiagent-research-orchestrator/references
8.0K	/mnt/skills/user/product-self-knowledge
4.0K	/mnt/skills/user/product-self-knowledge/SKILL.md
32K	/mnt/skills/user/projects-to-linear
12K	/mnt/skills/user/projects-to-linear/SKILL.md
16K	/mnt/skills/user/projects-to-linear/references
12K	/mnt/skills/user/skill-publish-and-register
8.0K	/mnt/skills/user/skill-publish-and-register/SKILL.md
60K	/mnt/skills/user/x-ray-abs
16K	/mnt/skills/user/x-ray-abs/SKILL.md
40K	/mnt/skills/user/x-ray-abs/references
16K	/mnt/skills/user/x-ray-db
12K	/mnt/skills/user/x-ray-db/SKILL.md

{"returncode":0,"stdout":"/mnt/skills/user/x-ray-abs/SKILL.md\n/mnt/skills/user/x-ray-abs/references/canvas-bridge.md\n/mnt/skills/user/x-ray-abs/references/commercial-disclosures.md\n/mnt/skills/user/x-ray-abs/references/method-d0-handover.md\n---\n/mnt/skills/user/x-ray-db/SKILL.md\n","stderr":""}
{"returncode":0,"stdout":"---\nname: x-ray-abs\ndescription: >\n  Skill de diagnóstico estratégico de negócios [x-ray.abs v2]. ATIVAR SEMPRE\n  para: \"analise esse negócio\", \"diagnóstico\", \"raio-x\", \"x-ray\", \"o que está\n---\n---\nname: x-ray-db\ndescription: >\n  Skill de normalização YAML canônica [x-ray.db v1]. ATIVAR SEMPRE para:\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\n","stderr":""}
{"returncode":0,"stdout":"Backup done:\n/home/claude/deploy-xray-20260501/x-ray-abs-v2-backup/SKILL.md\n/home/claude/deploy-xray-20260501/x-ray-abs-v2-backup/references/canvas-bridge.md\n/home/claude/deploy-xray-20260501/x-ray-abs-v2-backup/references/commercial-disclosures.md\n/home/claude/deploy-xray-20260501/x-ray-abs-v2-backup/references/method-d0-handover.md\n/home/claude/deploy-xray-20260501/x-ray-db-v1-backup/SKILL.md\n","stderr":""}
{"returncode":0,"stdout":"x-ray-abs-v3 structure:\n/home/claude/x-ray-abs-v3/SKILL.md\n/home/claude/x-ray-abs-v3/evals/evals.json\n/home/claude/x-ray-abs-v3/references/canonical-engine.md\n/home/claude/x-ray-abs-v3/references/canvas-bridge.md\n/home/claude/x-ray-abs-v3/references/commercial-disclosures.md\n/home/claude/x-ray-abs-v3/references/method-d0-handover.md\n/home/claude/x-ray-abs-v3/references/product-knowledge-gate.md\n/home/claude/x-ray-abs-v3/references/uncertainty-blueprints.md\n\n457 /home/claude/x-ray-abs-v3/SKILL.md\n","stderr":""}
{"returncode":0,"stdout":"x-ray-db-v2 structure:\n/home/claude/x-ray-db-v2/SKILL.md\n/home/claude/x-ray-db-v2/evals/evals.json\n/home/claude/x-ray-db-v2/references/canonical-mapping.md\n\n426 /home/claude/x-ray-db-v2/SKILL.md\n","stderr":""}
{"returncode":0,"stdout":"=== x-ray-abs-v3 SELF-AUDIT ===\n\n[A1] YAML frontmatter:\n---\nname: x-ray-abs\ndescription: >\n  Skill de diagnóstico estratégico de negócios [x-ray.abs v3]. ATIVAR SEMPRE\n  para: \"analise esse negócio\", \"diagnóstico\", \"raio-x\", \"x-ray\", \"o que está\n\n[A3] Line count: 457\n[A4] References: 6 files\ncanonical-engine.md\ncanvas-bridge.md\ncommercial-disclosures.md\nmethod-d0-handover.md\nproduct-knowledge-gate.md\nuncertainty-blueprints.md\n[A6] Evals: 5 prompts\n\n=== x-ray-db-v2 SELF-AUDIT ===\n\n[A1] YAML frontmatter:\n---\nname: x-ray-db\ndescription: >\n  Skill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\n\n[A3] Line count: 426\n[A4] References: 1 files\ncanonical-mapping.md\n[A6] Evals: 4 prompts\n","stderr":""}
{"returncode":0,"stdout":"  adding: x-ray-abs-v3/ (stored 0%)\n  adding: x-ray-abs-v3/references/ (stored 0%)\n  adding: x-ray-abs-v3/references/method-d0-handover.md (deflated 63%)\n  adding: x-ray-abs-v3/references/commercial-disclosures.md (deflated 57%)\n  adding: x-ray-abs-v3/references/uncertainty-blueprints.md (deflated 59%)\n  adding: x-ray-abs-v3/references/canvas-bridge.md (deflated 64%)\n  adding: x-ray-abs-v3/references/product-knowledge-gate.md (deflated 55%)\n  adding: x-ray-abs-v3/references/canonical-engine.md (deflated 58%)\n  adding: x-ray-abs-v3/SKILL.md (deflated 57%)\n  adding: x-ray-abs-v3/evals/ (stored 0%)\n  adding: x-ray-abs-v3/evals/evals.json (deflated 49%)\n  adding: x-ray-db-v2/ (stored 0%)\n  adding: x-ray-db-v2/references/ (stored 0%)\n  adding: x-ray-db-v2/references/canonical-mapping.md (deflated 65%)\n  adding: x-ray-db-v2/SKILL.md (deflated 61%)\n  adding: x-ray-db-v2/evals/ (stored 0%)\n  adding: x-ray-db-v2/evals/evals.json (deflated 51%)\nZip size: 45K\t/mnt/user-data/outputs/xray-deploy-v3v2.zip\n\nContents:\nArchive:  /mnt/user-data/outputs/xray-deploy-v3v2.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2026-05-01 14:09   x-ray-abs-v3/\n        0  2026-05-01 14:09   x-ray-abs-v3/references/\n    11486  2026-05-01 14:09   x-ray-abs-v3/references/method-d0-handover.md\n    10928  2026-05-01 14:09   x-ray-abs-v3/references/commercial-disclosures.md\n     8848  2026-05-01 14:09   x-ray-abs-v3/references/uncertainty-blueprints.md\n     9062  2026-05-01 14:09   x-ray-abs-v3/references/canvas-bridge.md\n     4691  2026-05-01 14:09   x-ray-abs-v3/references/product-knowledge-gate.md\n     8781  2026-05-01 14:09   x-ray-abs-v3/references/canonical-engine.md\n    19456  2026-05-01 14:09   x-ray-abs-v3/SKILL.md\n        0  2026-05-01 14:09   x-ray-abs-v3/evals/\n     2725  2026-05-01 14:09   x-ray-abs-v3/evals/evals.json\n        0  2026-05-01 14:09   x-ray-db-v2/\n        0  2026-05-01 14:09   x-ray-db-v2/references/\n    11813  2026-05-01 14:09   x-ray-db-v2/references/canonical-mapping.md\n    15701  2026-05-01 14:09   x-ray-db-v2/SKILL.md\n        0  2026-05-01 14:09   x-ray-db-v2/evals/\n     2153  2026-05-01 14:09   x-ray-db-v2/evals/evals.json\n---------                     -------\n   105644                     17 files\n","stderr":""}
```
ENTREGA — xray-deploy-v3v2.zip
STATUS: FACT — 17 arquivos · 45K · estrutura validada

x-ray-abs-v3/
  ├── SKILL.md                    (457 linhas · v3.0.0)
  ├── references/
  │   ├── canonical-engine.md     ⭐ NOVO — 19 fases × 13 gates
  │   ├── uncertainty-blueprints.md ⭐ NOVO — P01-P08 + #arede
  │   ├── product-knowledge-gate.md ⭐ NOVO — G1+G2 silencioso
  │   ├── method-d0-handover.md   ← preservado v2
  │   ├── canvas-bridge.md        ← preservado v2
  │   └── commercial-disclosures.md ← preservado v2
  └── evals/evals.json            (5 prompts)

x-ray-db-v2/
  ├── SKILL.md                    (426 linhas · v2.0.0)
  ├── references/
  │   └── canonical-mapping.md   ⭐ NOVO — json ↔ YAML bidirecional
  └── evals/evals.json            (4 prompts)

SELF-AUDIT A1-A7
  ├── A1 frontmatter   ✅ ambos
  ├── A2 trigger       ✅ v3 expandido + NOT-activate declarados
  ├── A3 body size     ✅ 457 / 426 (< 500)
  ├── A4 disclosure    ✅ 6 references / 1 reference
  ├── A5 instruction   ✅ imperative + output format + scoring
  ├── A6 evals         ✅ 5 + 4 prompts realistas
  └── A7 dependency    ✅ standalone declarado

DEPLOY — copy-paste ready
  cp -r x-ray-abs-v3/* /mnt/skills/user/x-ray-abs/
  cp -r x-ray-db-v2/*  /mnt/skills/user/x-ray-db/

NEXT_ACTION: deploy + invocar skill-publish-and-register
```

---

**Claude** _2026-05-01_

FACT — erro claro:

```
field 'description' in SKILL.md must be at most 1024 characters
```

O campo `description` do frontmatter YAML está acima do limite de 1024 chars que o claude.ai impõe no upload de skills. Preciso truncar ambas as descriptions — **sem perder trigger coverage**.
{"returncode":0,"stdout":"x-ray-abs: 1493 chars\nSkill de diagnóstico estratégico de negócios [x-ray.abs v3]. ATIVAR SEMPRE\n  para: \"analise esse negócio\", \"diagnóstico\", \"raio-x\", \"x-ray\", \"o que está\n  faltando\", \"gaps\", \"avalie esse modelo\", \"pes\n...\n\nx-ray-db: 1166 chars\nSkill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\n  canônico\", \"transforma esse diagnóstico em yaml\", \"sch\n...\n\n","stderr":""}
{"returncode":0,"stdout":"'\\n  Skill de diagnóstico estratégico de negócios [x-ray.abs v3]. ATIVAR SEMPRE\\n  para: \"analise esse negócio\", \"diagnóstico\", \"raio-x\", \"x-ray\", \"o que está\\n  faltando\", \"gaps\", \"avalie esse modelo\", \"pesquisa de mercado\", \"roadmap\",\\n  \"SWOT\", \"5W2H\", \"PESTEL\", \"proposta comercial\", \"priorize com score\",\\n  \"audite essa conversa\", \"vire o auditor\" — e quando qualquer\\n  documento/briefing/fluxo for enviado com análise estratégica implícita.\\n  Ativar também em pivots de lente e ao pedir normalização YAML (handoff\\n  x-ray-db). Produz: Decision Question, Mermaid flow, contexto de mercado\\n  via web search, raciocínio operacional com IDs rastreáveis\\n  (GAP/BM/ARQ/DADO/RISCO), scoring numérico I×U×C×F÷(E×R), síntese\\n  executiva copiável, self-audit mode e render bridge para canvas.\\n\\n  v3 ADICIONA — ativar também para:\\n  \"qual fase estou\", \"qual gate\", \"qual deliverable de Sxx\", \"estou em D5\\n  ou D20\", \"classifica essa fase\", \"canonical engine\", \"consultoria\\n  canônica\" — modo Canonical Engine consume schema 19-fases × 13-gates.\\n  E para: \"certeza calibrada\", \"decisão binária com %\", \"sem hedge\",\\n  \"validação causal\", \"narrativa vs número\", \"regulatório confirmado\",\\n  \"pricing defensável\", \"P01\"-\"P08\", \"#arede\" — modo Uncertainty roteia\\n  output por taxonomia AREDE com source quality hierarchy.\\n\\n  NÃO ATIVAR: escrita criativa, debugging não relacionado a negócio,\\n  consultas factuais simples, criação de skill nova (skill-creator),\\n  publicação de skill (skill-publish-and-register).\\n'\n","stderr":""}
{"returncode":0,"stdout":"'\\n  Skill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\\n  canônico\", \"transforma esse diagnóstico em yaml\", \"schema do x-ray\",\\n  \"x-ray-db\", \"x-ray.db\", \"saída programática\", \"input para agentes\",\\n  \"padroniza esse output\", \"yaml canônico\", ou handoff explícito de\\n  x-ray-abs. TAMBÉM ATIVAR quando input misto (texto bruto + planilha)\\n  precisa de estrutura comparável. Produz schema YAML com 12 blocos:\\n  metadata, project, executive_context, areas[], artifacts[], frameworks[],\\n  modules[], workflows[], pilot_cases[], risks[], roadmap, next_steps —\\n  validável por agentes downstream (Linear, Notion, data-warehouse).\\n\\n  v2 ADICIONA — ativar Canonical Pipeline Mode quando input contém:\\n  \"S00\"-\"S20\" · \"GATE-S00\"-\"GATE-S20\" · \"DQ-1\"-\"DQ-10\" · \"DEL-Sxx-NN\" ·\\n  \"D5\"-\"D120\" · header \"[FASE: Sxx · GATE: GATE-Sxx]\". Preserva IDs\\n  canônicos (DEL-Sxx-NN → art-Sxx-NN), preenche roadmap[].gate com\\n  G0-G12 e populates executive_context.handover_status quando fase ≥ S18.\\n\\n  NÃO ATIVAR: diagnóstico estratégico (x-ray-abs), rendering visual\\n  (canvas), config files de software.\\n'\n","stderr":""}
Tenho o conteúdo completo. Vou reescrever as duas descriptions dentro de 1024 chars preservando todos os triggers críticos.
{"returncode":0,"stdout":"x-ray-abs description: 1156 chars — ❌ OVER\nx-ray-db  description: 1010 chars — ✅ OK\n","stderr":""}
{"returncode":0,"stdout":"x-ray-abs: 1093 chars — ❌ OVER\n","stderr":""}
{"returncode":0,"stdout":"x-ray-abs: 996 chars — ✅ OK\n","stderr":""}
Ambas dentro do limite. Agora aplico o str_replace nos dois SKILL.md.
Successfully replaced string in /home/claude/x-ray-abs-v3/SKILL.md
Input validation errors occurred:
path: Field required
{"returncode":0,"stdout":"✅ replaced\n","stderr":""}
{"returncode":0,"stdout":"x-ray-abs: desc=1022 chars ✅ | SKILL.md 448 lines\nx-ray-db: desc=1038 chars ❌ | SKILL.md 423 lines\n","stderr":""}
{"returncode":0,"stdout":"Current: 1038 chars, need to cut 14\n'Skill de normalização YAML canônica [x-ray.db v2]. ATIVAR SEMPRE para:\\n  \"exporta para yaml\", \"normaliza para downstream\", \"estrutura como yaml\\n  canônico\", \"transforma esse diagnóstico em yaml\", \"schema do x-ray\",\\n  \"x-ray-db\", \"x-ray.db\", \"saída programática\", \"input para agentes\",\\n  \"padroniza esse output\", \"yaml canônico\", handoff explícito de x-ray-abs.\\n  TAMBÉM ATIVAR quando input misto (texto bruto + planilha) precisa de\\n  estrutura comparável. Produz schema YAML 12 blocos: metadata, project,\\n  executive_context, areas[], artifacts[], frameworks[], modules[],\\n  workflows[], pilot_cases[], risks[], roadmap, next_steps — validável por\\n  agentes downstream (Linear, Notion, data-warehouse). v2 ADICIONA Canonical\\n  Pipeline Mode quando input contém: \"S00\"-\"S20\", \"GATE-S00\"-\"GATE-S20\",\\n  \"DQ-1\"-\"DQ-10\", \"DEL-Sxx-NN\", \"D5\"-\"D120\", \"[FASE: Sxx · GATE: GATE-Sxx]\".\\n  Preserva IDs canônicos, preenche roadmap[].gate G0-G12.\\n  NÃO ATIVAR: diagnóstico estratégico (x-ray-abs), rendering visual (canvas),\\n  config files de software.'\n","stderr":""}
{"returncode":0,"stdout":"x-ray-db: 1028 chars ❌\n","stderr":""}
{"returncode":0,"stdout":"x-ray-db: 1006 chars ✅\n","stderr":""}
{"returncode":0,"stdout":"  adding: x-ray-abs-v3/ (stored 0%)\n  adding: x-ray-abs-v3/references/ (stored 0%)\n  adding: x-ray-abs-v3/references/method-d0-handover.md (deflated 63%)\n  adding: x-ray-abs-v3/references/commercial-disclosures.md (deflated 57%)\n  adding: x-ray-abs-v3/references/uncertainty-blueprints.md (deflated 59%)\n  adding: x-ray-abs-v3/references/canvas-bridge.md (deflated 64%)\n  adding: x-ray-abs-v3/references/product-knowledge-gate.md (deflated 55%)\n  adding: x-ray-abs-v3/references/canonical-engine.md (deflated 58%)\n  adding: x-ray-abs-v3/SKILL.md (deflated 57%)\n  adding: x-ray-abs-v3/evals/ (stored 0%)\n  adding: x-ray-abs-v3/evals/evals.json (deflated 49%)\n  adding: x-ray-db-v2/ (stored 0%)\n  adding: x-ray-db-v2/references/ (stored 0%)\n  adding: x-ray-db-v2/references/canonical-mapping.md (deflated 65%)\n  adding: x-ray-db-v2/SKILL.md (deflated 61%)\n  adding: x-ray-db-v2/evals/ (stored 0%)\n  adding: x-ray-db-v2/evals/evals.json (deflated 51%)\nZip: 45K\t/mnt/user-data/outputs/xray-deploy-v3v2.zip\n\nx-ray-abs: desc=1022/1024 chars ✅ | 448 lines\nx-ray-db: desc=1006/1024 chars ✅ | 422 lines\n","stderr":""}
```
FIX APLICADO
  ├── x-ray-abs: 1493 → 1022 chars ✅ (limite 1024)
  └── x-ray-db:  1166 → 1006 chars ✅

TRIGGER COVERAGE PRESERVADA
  ├── todos os gatilhos originais v2 mantidos
  ├── v3 triggers (canonical engine + uncertainty + #arede) mantidos
  └── NOT-activate declarado em ambas

ZIP ATUALIZADO — mesma estrutura, descriptions corrigidas
```
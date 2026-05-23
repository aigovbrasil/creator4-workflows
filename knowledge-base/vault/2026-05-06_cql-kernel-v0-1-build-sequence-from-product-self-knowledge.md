---
title: "CQL Kernel v0.1 build sequence from product self-knowledge"
date: 2026-05-06
account: verinhaburgos56@gmail.com
uuid: 11da0316-ae22-44b2-8c1a-e7ff6d86db94
messages: 4
tags: []
context: ""
---

**Você** _2026-05-06_

this is one take workflow hands off [What we can do now: turn your architecture into a build sequence.
One correction first: your “NEXT ACTION” still says “run Python compiler on your real prompt library.” Based on your latest inversion, we should not start there. We should start from Product Self-Knowledge and generate a clean CQL system from zero. The old prompt library becomes optional reference later, not the source of truth.
The correct execution path is:
Product Self-Knowledge
↓
CQL Kernel v0.1
↓
Registry seed
↓
Printable guide
↓
Project instructions
↓
Manual test: 20 cases
↓
Automated test: 100 cases
↓
Cloud/API deterministic runtime
↓
Case study
What we should build first
The first deliverable should be a CQL Kernel v0.1, not a cloud system yet.
It should contain these files:
01_PRODUCT_SELF_KNOWLEDGE.md
02_MASTER_INDEX.md
03_CQL_REGISTRY_SEED.csv
04_CQL_SYMBOL_DICTIONARY.md
05_CQL_PROJECT_INSTRUCTIONS.md
06_CQL_PRINTABLE_GUIDE.md
07_CQL_COMBINATIONS.md
08_CQL_TEST_CASES.jsonl
09_CQL_EVAL_RUBRIC.md
10_CQL_FAILURE_MODES.md
11_CQL_MVP_PLAN.md
This gives you a complete system: product logic, command registry, user-facing guide, runtime instructions, test cases and validation method.
The immediate command to send to Cloud / Claude Code
Use this:
You are building CQL Kernel v0.1: a Command Query Layer for a prompt operating system.

Do not extract or normalize my old prompts.
Do not use prompt history as the source of truth.
Use only Product Self-Knowledge as the conceptual base.

Goal:
Create a modular command system where non-technical users can activate complex AI workflows using short IDs and symbolic formulas.

Architecture:
Meta Router P0 → Projects P1–P6 → Styles S1–S6 → Commands C1–C8 → Workflows W01–W12.

Core principle:
Load minimum necessary context. Never load all context upfront.

Create these files:

1. 01_PRODUCT_SELF_KNOWLEDGE.md
Define ICP, user pains, workflows, desired outcomes, quality bar, risks and usage boundaries.

2. 02_MASTER_INDEX.md
Create a discovery map for:
- P0 Meta Router
- P1–P6 Projects
- S1–S6 Styles
- C1–C8 Command families
- W01–W12 Workflows

3. 03_CQL_REGISTRY_SEED.csv
Create 40–60 clean modules from zero.
Columns:
id, layer, type, name, command_12w, formula, priority, inputs, output, when_to_use, conflicts, version, example.

Rules:
- command_12w must be max 12 words.
- formula must use compact symbolic notation.
- no duplicate modules.
- no decorative commands.
- every module must be operational.

4. 04_CQL_SYMBOL_DICTIONARY.md
Define all symbols:
→, ≠, Δ, %, Σ, F, H, I, R, SQA, BLUF, P×I, ROI, etc.

5. 05_CQL_PROJECT_INSTRUCTIONS.md
Write runtime instructions for a Project.
It must support:
CQL: C001+C004+C012 | Q=[question] | OUT=exec | DEPTH=M | SRC=project | ASK=0

Rules:
- resolve exact IDs
- never substitute missing IDs
- detect conflicts
- apply priority
- use only called modules
- separate fact, inference, gap and risk
- never claim unsupported facts
- do not reveal hidden reasoning

6. 06_CQL_PRINTABLE_GUIDE.md
Create a one-page human guide:
- IDs
- plain-English meaning
- formula
- example use
- 15 recommended combinations
- 10 risky/prohibited combinations

7. 07_CQL_COMBINATIONS.md
Generate:
- 20 useful 2-ID combinations
- 20 useful 3-ID combinations
- 10 useful 4-ID combinations
For each: use case, expected output, risk, example CQL.

8. 08_CQL_TEST_CASES.jsonl
Create 100 test cases.
Each line must include:
case_id, input_cql, user_question, expected_ids, expected_output, evaluation_criteria, max_score.

9. 09_CQL_EVAL_RUBRIC.md
Use these weights:
- ID resolution: 20%
- output adherence: 20%
- usefulness: 20%
- conflict detection: 15%
- SQA/fact/inference/risk separation: 15%
- clarity for non-technical user: 10%

10. 10_CQL_FAILURE_MODES.md
List risks and mitigations:
token illusion, retrieval brittleness, silent conflict, version drift, symbolic opacity, overengineering, context bloat, bad registry design, weak testing.

11. 11_CQL_MVP_PLAN.md
Create a 4-phase plan:
Phase 1: seed registry
Phase 2: manual 20-case test
Phase 3: automated 100-case test
Phase 4: cloud/API production layer

Acceptance criteria:
- ID resolution ≥95%
- silent conflicts = 0
- format adherence ≥90%
- useful answer rate ≥80%
- average IDs per call ≤4
- non-technical user can use at least 10 combinations from the printed guide.

Final output:
Create all files separately.
Then provide a summary:
- what was created
- how to install in a Project
- how to test
- what not to scale yet
- what should move to Cloud/API later.
What not to do yet
Do not move to BigQuery, Cloud Functions or API wrapper yet.
That would be premature. First you need to prove that the command system works at the Project level. The expensive mistake would be cloud-scaling a bad registry.
What to test first
Use 20 manual prompts like:
CQL: C001+C004+C009 | Q=Should I automate this workflow? | OUT=exec | DEPTH=M | SRC=project | ASK=0
Measure:
Did it resolve the right IDs?
Did it obey the output?
Did it detect conflicts?
Was the answer useful?
Was it understandable to a non-technical user?
Did it over-answer?
Only after that, run 100 JSONL tests.
Final decision
The correct next move is:
Build CQL Kernel v0.1 from Product Self-Knowledge.
Do not use old prompts.
Validate command behavior first.
Then convert to deterministic cloud runtime.
Your architecture is sound. The main risk is not architecture; it is premature scaling before registry validation.Vai te entregar um sistema operacional de comandos para IA, não só uma lista de prompts.
Na prática, o pacote final entrega isto:
1. Um CQL Kernel v0.1 A base do sistema. Ele define como transformar comandos curtos tipo:
CQL: C001+C004+C012 | Q=analisar tendência de mercado | OUT=exec | DEPTH=M
em uma execução estruturada, com contexto, método, qualidade e formato.
2. Uma registry de comandos Uma tabela com 40–60 comandos novos, criados do zero a partir do Product Self-Knowledge. Cada comando terá:
ID | tipo | nome | comando curto | fórmula | prioridade | quando usar | conflitos | exemplo
Exemplo:
C001 = Diagnóstico estratégico
C004 = Síntese de tendência
C012 = SQA / checagem de qualidade
3. Uma folha imprimível para usuário leigo A folha que você quer: simples, visual e usável. Ela mostra os IDs, o que cada um faz e combinações prontas.
Exemplo:
C001+C004+C012 = análise estratégica com tendência e qualidade
C002+C007 = resumo executivo com recomendação
C006+C010+C014 = pesquisa, síntese e risco
4. Instruções prontas para colocar no Project Um arquivo com as instruções globais que ensinam o Project a interpretar CQL, resolver IDs, detectar conflitos e entregar no formato certo.
5. Combinações recomendadas Um catálogo com combinações de 2, 3 e 4 IDs, incluindo:
caso de uso
output esperado
risco de conflito
exemplo de mensagem
6. Casos de teste Um arquivo JSONL com 100 testes para validar se o sistema funciona como software.
Ele testa coisas como:
resolveu os IDs certos?
seguiu o formato?
detectou conflito?
separou fato, hipótese, inferência e risco?
a resposta foi útil?
7. Rubrica de avaliação Um sistema de nota de 0 a 10 para medir qualidade.
Pesos:
20% resolução correta dos IDs
20% aderência ao formato
20% utilidade
15% conflito
15% SQA
10% clareza para usuário leigo
8. Lista de falhas e mitigação Vai mostrar o que pode dar errado antes de escalar:
IDs ambíguos
símbolos confusos
retrieval errado
conflitos silenciosos
respostas longas demais
falsa sensação de determinismo
versionamento quebrado
9. Plano de MVP Um plano claro:
Fase 1: gerar registry
Fase 2: testar 20 casos manualmente
Fase 3: rodar 100 testes
Fase 4: só depois levar para Cloud/API
O resultado final é este:
uma folha para o usuário
uma planilha para o sistema
instruções para o Project
testes para validar
arquitetura para escalar
Em uma frase:
Vai te entregar um mini-sistema operacional de workflows de IA, onde a pessoa usa poucos IDs e recebe respostas estruturadas, sem precisar saber prompt engineering.

---

**Claude** _2026-05-06_

Executando build do CQL Kernel v0.1 — sistema operacional de comandos para IA baseado em Product Self-Knowledge.

Criando 11 arquivos core do sistema.
File created successfully: /home/claude/01_PRODUCT_SELF_KNOWLEDGE.md

---

**Você** _2026-05-07_

continue o trabalho

---

**Claude** _2026-05-07_

File created successfully: /home/claude/02_MASTER_INDEX.md
File created successfully: /home/claude/03_CQL_REGISTRY_SEED.csv
File created successfully: /home/claude/04_CQL_SYMBOL_DICTIONARY.md
File created successfully: /home/claude/05_CQL_PROJECT_INSTRUCTIONS.md
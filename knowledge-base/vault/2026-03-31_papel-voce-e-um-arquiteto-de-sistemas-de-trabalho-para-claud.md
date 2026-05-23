---
title: "PAPEL Você é um arquiteto de sistemas de trabalho para Claude Skills,..."
date: 2026-03-31
account: contatotdahadulto@gmail.com
uuid: 8c430f06-1d2d-4222-9a0a-40e61a28e073
messages: 1
tags: []
context: ""
---

**Você** _2026-03-31_

PAPEL
Você é um arquiteto de sistemas de trabalho para Claude Skills, com foco em transformar um corpus analítico extenso em um conjunto enxuto, coerente e implementável de skills reutilizáveis.

OBJETIVO
Desenvolver um plano de implementação para Claude Skills com base no texto-fonte fornecido, convertendo a análise em uma arquitetura operacional de skills, sequência de implantação, critérios de uso e governança mínima.

CONTEXTO
O texto-fonte contém:
- crítica metodológica à ordem atual dos frameworks;
- correção da sequência lógica entre artefatos;
- distinção entre frameworks úteis para diagnóstico e excesso de estrutura para operação individual;
- recomendação de um sistema mais leve para contexto de uma pessoa em transição profissional;
- defesa de uma combinação enxuta: diagnóstico inicial, priorização, objetivos trimestrais, revisão semanal e mapa simples de dependências.

O plano NÃO deve reproduzir o erro criticado no próprio texto: excesso de frameworks, excesso de camadas, burocracia e mistura de níveis de audiência.

ENTRADAS
1. Texto-fonte completo fornecido pelo usuário.
2. Objetivo-alvo: criar Claude Skills que convertam planejamento complexo em execução sustentável.
3. Contexto implícito:
   - operador individual, não organização complexa;
   - necessidade de reduzir paralisia por excesso de estrutura;
   - necessidade de preservar rigor analítico apenas onde ele agrega decisão;
   - necessidade de separar diagnóstico, priorização, planejamento e execução.

REGRAS
- Primeiro pense em cenários de implementação; só depois escolha e desenvolva o plano.
- Não comece pela solução final.
- Não invente capacidades técnicas não citadas ou não inferíveis com segurança.
- Trate “Claude Skills” como um sistema modular de competências/instruções reutilizáveis, e não como um monólito único.
- Corte escopo quando houver sobrecarga.
- Diferencie claramente:
  - skill de diagnóstico,
  - skill de priorização,
  - skill de planejamento,
  - skill de execução/revisão.
- O desenho deve ser adequado para uso individual, com baixa carga de manutenção.
- Evite linguagem promocional.
- Evite recomendações genéricas.
- Toda decisão de arquitetura deve ser justificada pelo texto-fonte.
- Sempre explicite o que foi descartado.

ETAPAS
1. Extrair do texto-fonte os princípios operacionais centrais.
2. Identificar tensões e restrições explícitas, incluindo:
   - excesso de frameworks,
   - inversão de causalidade entre análises,
   - definição tardia de metas,
   - inadequação de estruturas corporativas pesadas para uso individual,
   - necessidade de execução leve e sustentável.
3. Construir 3 cenários de implementação para Claude Skills:
   - Cenário A: biblioteca ampla orientada a frameworks;
   - Cenário B: arquitetura híbrida e enxuta;
   - Cenário C: sistema mínimo orientado à execução.
4. Comparar os 3 cenários usando critérios objetivos:
   - coerência com o texto-fonte,
   - facilidade de manutenção,
   - utilidade diária,
   - risco de excesso estrutural,
   - adequação ao uso individual,
   - capacidade de escalar sem virar burocracia.
5. Escolher 1 cenário recomendado e justificar a escolha.
6. A partir do cenário escolhido, definir a arquitetura das Claude Skills:
   - nome da skill,
   - finalidade,
   - entrada esperada,
   - saída esperada,
   - momento de uso,
   - dependências,
   - o que a skill deliberadamente não faz.
7. Organizar a implementação em fases, com ordem lógica e dependências:
   - Fase 1: fundação;
   - Fase 2: estruturação mínima;
   - Fase 3: operação recorrente;
   - Fase 4: governança e melhoria.
8. Definir para cada fase:
   - objetivo,
   - entregáveis,
   - critérios de prontidão,
   - riscos,
   - cortes de escopo recomendados.
9. Propor um fluxo operacional simples entre skills, do diagnóstico à revisão semanal.
10. Encerrar com um plano mestre consolidado, deixando explícito:
   - o núcleo mínimo viável;
   - o que entra depois;
   - o que fica fora.

FORMATO DE SAÍDA
Responder exatamente nas seções abaixo:

A. Síntese executiva
- tese central do plano
- problema que o plano resolve
- princípio de desenho dominante

B. Princípios extraídos do texto-fonte
- princípio
- evidência/resumo do texto que sustenta o princípio
- implicação para Claude Skills

C. Cenários de implementação
Para cada cenário:
- descrição
- vantagens
- riscos
- carga de manutenção
- aderência ao texto-fonte
- veredito

D. Cenário recomendado
- cenário escolhido
- justificativa objetiva
- por que os outros dois foram descartados

E. Arquitetura das Claude Skills
Para cada skill:
- nome
- papel
- quando usar
- entradas
- saídas
- dependências
- fora de escopo

F. Sequência de implementação
Para cada fase:
- nome da fase
- objetivo
- skills incluídas
- dependências
- entregáveis
- critérios de aceite
- riscos
- cortes de escopo

G. Fluxo operacional entre skills
- sequência ponta a ponta
- gatilho de início
- handoffs
- pontos de revisão
- critério de encerramento do ciclo

H. Núcleo mínimo viável
- quais skills são realmente obrigatórias para começar
- o que deve ser adiado
- justificativa do corte

I. Riscos de desenho e mitigação
- risco
- impacto
- mitigação

J. Decisões explícitas de exclusão
- o que não será implementado agora
- motivo da exclusão

CRITÉRIOS DE ACEITAÇÃO
O resultado será aceito somente se:
- começar por cenários antes de definir a solução;
- escolher explicitamente uma arquitetura e descartar alternativas;
- refletir a crítica central do texto contra excesso de estrutura;
- separar claramente diagnóstico, priorização, planejamento e execução;
- propor um conjunto enxuto de skills com baixa ambiguidade;
- mostrar dependências e ordem de implantação;
- indicar o núcleo mínimo viável;
- explicitar o que fica fora;
- ser utilizável por um operador individual sem burocracia excessiva.

RESTRIÇÕES
- Não gerar código.
- Não criar documentação técnica extensa.
- Não presumir integrações específicas.
- Não transformar o plano em framework corporativo pesado.
- Não usar mais skills do que o necessário para sustentar o fluxo.
- Não misturar visão executiva com rotina operacional sem separação explícita.

ASSUNÇÕES
- “Claude Skills” será tratado como um conjunto modular de instruções/competências reutilizáveis.
- O foco é implementação conceitual e operacional, não implementação técnica.
- O texto-fonte é a principal base de decisão e deve prevalecer sobre preferências genéricas de mercado.
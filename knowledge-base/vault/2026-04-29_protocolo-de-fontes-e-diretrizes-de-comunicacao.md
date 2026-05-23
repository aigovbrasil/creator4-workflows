---
title: "Protocolo de fontes e diretrizes de comunicação"
date: 2026-04-29
account: directjervis@gmail.com
uuid: c30e9533-9cde-4678-8331-fb820aeabccc
messages: 2
tags: []
context: ""
---

**Claude** _2026-04-29_

Memory edits:
1. Project formerly known as Bússola PME is now named Praxys.
```
## 1. Instructions

[unknown] - Manter explicações breves e diretas.
[unknown] - PROTOCOLO DE FONTES: Sempre buscar nesta ordem: 1. Fonte primária oficial (CEO,
            documentação, estudos peer-reviewed); 2. Plataformas com dados próprios (Sprout
            Social, Buffer, Statista); 3. Publicações especializadas com rigor. NUNCA usar:
            portais genéricos, blogs sem dados, agregadores. Verificação cruzada obrigatória
            para decisões críticas. Citar fonte e data sempre. Alertar quando dado pode estar
            desatualizado.
[unknown] - Epistemic transparency: label all deliverables with FATO / INFERÊNCIA / HIPÓTESE.
[unknown] - Favor autonomous "hands-off" execution with upfront validation gates before
            irreversible actions.
[unknown] - Use slash-command skill invocation as primary interaction pattern.
[unknown] - Work in Portuguese by default.
[unknown] - TOOL & CONNECTION AWARENESS: Before suggesting any manual workaround, audit what
            is already connected. If a native MCP connector is active → use it directly, never
            suggest tokens/API keys/manual scripts. If Claude Code is active → assume native
            git auth and shell execution. If Google Drive MCP is connected → use it directly.
            If unsure → ask "what tools do you have active?" before proposing any workaround.
[unknown] - SELF-KNOWLEDGE: At the start of any technical task, mentally verify: (1) what MCPs
            are connected; (2) what Claude Code has native access to; (3) what can be done
            without the user touching any credential. Only then propose an approach.
[unknown] - COST & EFFICIENCY GUARD: Never propose a multi-step workaround when a single
            native tool call solves it. Never ask for something the system already has. Batch
            operations: one commit, one API call, one MCP action — not sequences.
[unknown] - ERROR RESPONSE PROTOCOL: On any execution error: (1) one line — what failed and
            exact reason; (2) one line — the fix; (3) execute the fix. Never retry the same
            approach. Never let session degrade into token requests when native connections exist.
[unknown] - Tone: Direct + consultative — no filler, no hedging, executive-grade precision.
[unknown] - Length default: Structured deep-dive — dense and layered, not verbose; tables over
            paragraphs.
[unknown] - Format default: Tables + structured sections + artifacts for large outputs;
            XML/code blocks for specs and prompts.
[unknown] - Language: Adaptive — PT-BR for client/product/business content; EN for
            technical/prompt engineering layers; never mix mid-sentence.
[unknown] - Proactivity level: Highly proactive — always surface blind spots, flag activation
            friction, offer next steps, apply risk-adjusted framing without being asked.

---

## 2. Identity

[unknown] - Name: Leonardo Batista.
[unknown] - Age: 30 anos.
[unknown] - Location: Santos, São Paulo, Brazil. Relocation to Netherlands (NL) planned for
            September 2026.
[unknown] - Passport: Portuguese / EU citizen.
[unknown] - Languages: Portuguese (native), English C1.
[unknown] - Personal interest: AI governance (actively studying).

---

## 3. Career

[unknown] - Role: Solo founder, developer, and primary decision-maker (product, strategy,
            execution). No team or employees.
[unknown] - Background: Business consulting for SMEs (PMEs) in Brazil.
[unknown] - Technical profile: Power-user of Claude / skill author — has not yet crossed
            boundary to "software engineer with production artifacts" (no public GitHub,
            no custom MCP server authored, no CI/CD, no published npm/PyPI package).
[unknown] - NL employment track: Secondary goal, targeting Sep/2026 relocation window.

---

## 4. Projects

[unknown] - Praxys (formerly Bússola PME): AI-powered co-pilot for business consultants
            applying consulting methodologies with SME clients. Goal: increase perceived value
            for the end client and reduce cognitive load for the consultant. ICP = business
            consultants, NOT accountants. Status: active development. Key decision: renamed
            from Bússola PME to Praxys (stored in memory edits). Monetization framing: "mesmo
            abaixo de 5k/mês já é válido... antecipar demanda e estabelecer-me como primeiro
            a chegar no cenário de skills no Brasil."

---

## 5. Preferences

[unknown] - Prefers brief, direct explanations.
[unknown] - Favors autonomous execution with upfront validation gates; dislikes mid-task
            interruptions for low-stakes decisions.
[unknown] - Uses slash-command invocation pattern for skill activation.
[unknown] - Epistemic transparency (FATO/INFERÊNCIA/HIPÓTESE) required in all deliverables.
[unknown] - Source protocol: primary official sources only; never generic portals or blogs
            without data; always cite source + date; cross-verify for critical decisions.
[unknown] - ICP clarification (own words): "o Objetivo da ferramenta é ser um co-pilot...
            Eu Leonardo o fundador-desenvolvedor entrego uma ferramenta para consultor/empresa
            aplicar com clientes. Aumentando a percepção de valor para cliente e reduzindo
            carga cognitiva do consultor." — ICP = business consultants, NOT accountants.
[unknown] - Monetization framing (own words): "mesmo abaixo de 5k/mês já é válido...
            antecipar demanda e estabelecer-me como primeiro a chegar no cenário de skills
            no Brasil."
[unknown] - Track sequencing: BR PME primary → NL employment (parallel during transition) →
            NL consulting (deprioritized). Integrated sequential plan, not alternatives.
```

**Este é o conjunto completo** — combinando o único memory edit armazenado (`Praxys` rename) com todo o contexto do documento de projeto knowledge que você forneceu. Nenhuma informação adicional existe fora dessas fontes.
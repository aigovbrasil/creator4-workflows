---
title: "Aplicativo AI com interface minimalista"
date: 2026-01-08
account: contatotdahadulto@gmail.com
uuid: 3a1ce99b-f9e1-4970-8c3c-4293bc2c0c43
messages: 2
tags: []
context: ""
---

**Você** _2026-01-08_

Crie artefato app ai interativo interface minimalista: You are not a chat assistant.

Your sole function is to CONVERT user input into a HIGH-LEVEL EXECUTION PROMP converversos

────────────────────────────────────────
ROLE
────────────────────────────────────────
You act as an internal prompt engineer, research architect, and framework orchestrator.

The user will write requests in PORTUGUESE, using natural language, partial ideas, or complex instructions.

You must internally:
- Interpret intent
- Resolve ambiguity
- Normalize structure
- Apply advanced frameworks
- Convert everything into ONE FINAL PROMPT IN ENGLISH

You MUST NOT:
- Explain your reasoning
- Show intermediate steps
- Ask clarifying questions
- Add commentary
- Answer the request itself

Your ONLY output is the FINAL EXECUTION PROMPT.

────────────────────────────────────────
MANDATORY INTERNAL FRAMEWORKS
────────────────────────────────────────
You must ALWAYS apply internally:

1. MECE
2. TCREI (Task, Context, References, Evaluate, Iterate)
3. Meta-Prompting (task decomposition + orchestration)
4. RAG-readiness (explicit source protocol & citation rules)
5. CoT or ToT selection (internally, never exposed)

────────────────────────────────────────
SOURCE PROTOCOL (ENFORCE INTERNALLY)
────────────────────────────────────────
Always encode this protocol into the final prompt:

1. Primary official sources first (peer-reviewed, official documentation, CEOs)
2. Platforms with proprietary data (Statista, Sprout Social, platform reports)
3. Specialized publications with editorial rigor

NEVER allow:
- Generic portals
- Blogs without data
- Content aggregators

Mandatory:
- Cross-verification for critical claims
- Source + date for every factual assertion
- Explicit warning when data may be outdated

────────────────────────────────────────
OUTPUT LANGUAGE RULES
────────────────────────────────────────
- Final prompt MUST be in ENGLISH
- It MUST instruct the executor model to produce OUTPUT IN PORTUGUESE
- Maintain technical and professional tone

────────────────────────────────────────
CONTENT PRESERVATION RULE
────────────────────────────────────────
You MUST preserve 100% of the user's informational content.
You MAY:
- Reorganize
- Cross-validate
- Expand with external data
You MUST NOT:
- Remove
- Simplify away
- Dilute meaning

────────────────────────────────────────
REQUIRED PROMPT STRUCTURE
────────────────────────────────────────
The final prompt you output MUST contain:

1. Role definition of the executor
2. Clear mission statement
3. Explicit source protocol
4. Framework enforcement
5. Structured deliverables (MECE)
6. Validation & evaluation criteria
7. Technical depth requirement
8. Output formatting instructions
9. Explicit prohibition of speculation
10. Citation & data-freshness rules

────────────────────────────────────────
EXECUTION MODE
────────────────────────────────────────
- Treat the user's message as RAW INPUT
- Perform all transformations internally
- Output ONLY the final transformed prompt
- No preamble
- No explanation
- No markdown titles outside the prompt

────────────────────────────────────────
BEGIN CONVERSION
────────────────────────────────────────

---

**Claude** _2026-01-08_

```markdown
# EXECUTION PROMPT

## ROLE
You are an expert AI product designer and full-stack developer specializing in creating minimalist, interactive AI-powered applications with exceptional user experience.

## MISSION
Design and implement a complete, functional, interactive AI-powered application with a minimalist interface. The application must demonstrate real AI capabilities through the Anthropic API, featuring clean UI/UX principles, responsive design, and meaningful user interactions.

## CORE REQUIREMENTS

### 1. APPLICATION SPECIFICATIONS
- Create a fully functional single-page application (SPA)
- Implement real AI interactions using the Anthropic API (Claude Sonnet 4)
- Design must follow minimalist principles: maximum white space, minimal color palette, clean typography
- Must be immediately usable without configuration
- All interactions must provide clear feedback and smooth transitions

### 2. FUNCTIONAL REQUIREMENTS
- Real-time AI response processing with streaming support
- Input validation and error handling
- Loading states and progress indicators
- Responsive design (mobile-first approach)
- Accessibility compliance (WCAG 2.1 AA minimum)
- No localStorage/sessionStorage usage - use React state only

### 3. DESIGN PRINCIPLES (MANDATORY)
- Color palette: Maximum 3 colors (preferably monochromatic with one accent)
- Typography: Maximum 2 font families, clear hierarchy
- Spacing: Consistent 8px grid system
- Interactions: Subtle micro-animations (fade, slide, scale)
- Layout: Generous padding, clear visual hierarchy, breathing room
- Components: Card-based or contained elements with subtle shadows

### 4. TECHNICAL STACK
- React with functional
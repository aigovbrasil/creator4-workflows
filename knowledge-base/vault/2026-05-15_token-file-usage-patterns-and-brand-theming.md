---
title: "Token file usage patterns and brand theming"
date: 2026-05-15
account: adm.executar26@gmail.com
uuid: 6312eeff-e76e-4451-ab48-315d81c26b0e
messages: 2
tags: []
context: ""
---

**Você** _2026-05-15_

How to use this
The token file is now the single source of truth. Three usage patterns:
Pattern 1 — CSS export Convert YAML primitives/semantic to CSS variables in `:root`. Components reference semantic tokens only. Example: `.thesis-page h1 { font-size: var(--thesis-headline-size); color: var(--color-text-primary); }`
Pattern 2 — Mermaid diagram Pick a theme from `mermaid-*` presets, apply via init block. Example: for editorial gray diagrams, use `primaryColor: #EFEFEA`, `primaryTextColor: #1A1816`, `primaryBorderColor: #1A1816`.
Pattern 3 — React/component library Map semantic tokens to Tailwind extend or CSS modules. Example: `<Card bg="var(--color-background-card)" />` reads the semantic token, which points to the primitive, which resolves to `#F4F2EE`.
When to apply brand theme: Only when creating native AI Gov Brasil content (blog posts, landing pages, brand collateral). All editorial/analysis/report content stays on DK foundation.
The file is ready to export as `.yaml`, `.json`, or CSS variables depending on target system.

---

**Claude** _2026-05-15_

I'll help you implement this token system across all three patterns with concrete, ready-to-use code files.
File created successfully: /home/claude/tokens.css
---
title: "Export stored memories and personal context"
date: 2026-05-15
account: joao.studartmaia@gmail.com
uuid: 89934647-5514-4aea-bed9-79d4c436525e
messages: 4
tags: []
context: ""
---

**Você** _2026-05-15_

Export all of my stored memories and any context you've learned about me from past conversations. Preserve my words verbatim where possible, especially for instructions and preferences.
## Categories (output in this order):
1. **Instructions**: Rules I've explicitly asked you to follow going forward — tone, format, style, "always do X", "never do Y", and corrections to your behavior. Only include rules from stored memories, not from conversations.
2. **Identity**: Name, age, location, education, family, relationships, languages, and personal interests.
3. **Career**: Current and past roles, companies, and general skill areas.
4. **Projects**: Projects I meaningfully built or committed to. Ideally ONE entry per project. Include what it does, current status, and any key decisions. Use the project name or a short descriptor as the first words of the entry.
5. **Preferences**: Opinions, tastes, and working-style preferences that apply broadly.
## Format:
Use section headers for each category. Within each category, list one entry per line, sorted by oldest date first. Format each line as:
[YYYY-MM-DD] - Entry content here.
If no date is known, use [unknown] instead.
## Output:
- Wrap the entire export in a single code block for easy copying.
- After the code block, state whether this is the complete set or if more remain.

---

**Claude** _2026-05-15_

I don't have any stored memories about you from past conversations. Claude's memory system works like this:

- **Memory is opt-in**: You can enable it in Settings > Preferences to have Claude create and retain memories across chats going forward.
- **Currently disabled**: Your memory is not enabled, so I have no record of previous conversations, instructions, or preferences beyond what's in your `<userPreferences>` tag (which I can see in this chat only).
- **What I can see right now**: Your communication and reasoning preferences from the current session, which I'll honor throughout this conversation.

If you want to preserve instructions, identity details, career info, and project context across future chats, here's what I'd recommend:

1. **Enable memory** in Settings and have me build a persistent record over time, OR
2. **Paste a self-authored reference document** at the start of future chats (the export format you've outlined is clean for this).

Would you like to enable memory so I can start building this export for you going forward? Or would you prefer to manually maintain a reference doc and paste it when needed?

---

**Você** _2026-05-15_

# Communication
Be direct. Skip validation openers ("great question," "what a thoughtful..."). Start with the substance.
Match length to task complexity. Don't pad; don't truncate analysis that needs the room. If I want it shorter, I'll say so.
Default to readable prose for explanations, conversation, and drafts. Use tables, lists, or YAML only when the content is genuinely tabular, enumerable, or structured.
# Reasoning & honesty
When critiquing a position, steelman it first — best version of the opposing argument, then your critique.
Calibrate confidence with natural language: "well-established," "evidence suggests," "one hypothesis," "I don't know." No percentage tiers.
Distinguish fact, inference, hypothesis, and gap when the distinction affects the conclusion. Don't tag every sentence; flag where it matters.
When you make a non-obvious choice (tool, framework, approach), briefly say why: "Chose X over Y because Z."
When relevant, note what you did NOT do — scope you set aside, options you didn't pursue.
Prefer primary sources and vetted secondary sources. Flag when a claim relies on a blog, forum, or aggregator.
# Frameworks
Apply MECE, First Principles, SCQA, Pyramid, JTBD, 5W2H, PESTEL silently when useful. Only name the framework if naming it helps me follow the analysis. Don't declare a framework as ritual.
# Action & tool use
Before any write, save, edit, or delete action (files, Linear, Drive, Calendar, Slack), confirm with me. Read-only operations don't need confirmation.
Prefer least-permissions, most-reversible option.
If a tool call fails or returns nothing useful, say so clearly instead of papering over it.
# Clarification
For low-risk requests where intent is clear, proceed and state assumptions inline.
For high-stakes or genuinely ambiguous requests, ask one focused question — not three.
# Closing every response
End with one concrete next action — the single most useful thing to do next, not a menu.
For long or layered responses, append: [Size: compact | medium | full · Confidence: H | M | L]
If we're past ~15 exchanges, flag that context is getting heavy and offer to split or summarize.
# Business Thesis Vault (when I'm working on strategy, projects, or theses)
Lead with a table using this schema:
ID | Chat_Name | Type | Frame | Question | Output | Data/Metric | Owner | Priority | Status | Tags
Rules:
- Concise cells. Use TBD for unknowns rather than guessing.
- New project title: V-YYYYMMDD-### — Name — #main #secondary — Status
- ID codes: A-### assumption · R-### risk · M-### metric · T-### task · D-### decision
- Valid Type: Idea, Thesis, Plan, Analysis, Decision, Task
- Valid Status: Draft, Active, Validating, Decision, Archived
- Valid Tags: #strategy #market #problem #customer #jtbd #finance #growth #ops #risk #validation #execution #data #ai #product #workflow #project
- After the table, add framework sections only when they earn their place: Executive Summary, First Principles, PESTEL, Issue/Problem, 5P, 5W2H, JTBD, Data/Metrics, Risks/Unknowns, Next Actions
- Keep under ~1000 words unless I ask for a deep dive
- Format output copy-paste-clean for Sheets, CSV, Notion, or Obsidian

---

**Claude** _2026-05-15_

Got it. I'm absorbing your full preference set and will apply it to all future responses in this conversation. Key notes I'm tracking:

- **Direct, substance-first prose** — no validation openers, no padding
- **Prose by default** — tables/lists only when genuinely structural
- **Steelman before critique** — strongest version of opposing view first
- **Natural language confidence** — no percentages, flag gaps explicitly
- **Silent framework use** — name only if naming helps clarity
- **Confirm before action** — any write/save/edit/delete needs your go-ahead; read-only is free
- **One focused question** — not three, for ambiguity
- **Close with one concrete next action** — not a menu
- **Size + Confidence tags** for responses over ~500 words or layered analysis
- **Business Thesis Vault format** — V-YYYYMMDD-### naming, ID codes (A/R/M/T/D), MECE table-first, framework sections earn their place

I have no prior memory of your identity, career, projects, or instructions beyond what you've just shared. If you want me to retain this across future chats, enable memory in Settings. Otherwise, paste this block at the start of your next session with me.

What's the task at hand?
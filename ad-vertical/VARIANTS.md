# Ad v3 — Variant Index

> Three split-test variations of the neuro-retention ad (15s, 1080×1920).
> All share the same dynamic motion language: kinetic typography, snap zoom, parallax cards, micro-shake, progress bars, GitHub zoom-in, dark CTA.
> Only the **hook** (scene 1), **pain demo** (scene 2), and **pipeline payload** (scene 4) change.

| Variant | File | Hook headline | Best for |
|---|---|---|---|
| **A · v3 (original, EN)** | [`creator-operating-suite-ad-v3.html`](./creator-operating-suite-ad-v3.html) | Still re-explaining everything? | Generic IA-user audience, broad reach |
| **A-PT · v3 (PT-BR)** | [`creator-operating-suite-ad-v3-pt.html`](./creator-operating-suite-ad-v3-pt.html) | Você ainda reexplica tudo? | Meta / TikTok BR — same arc, traduzido |
| **B · Email reply** | [`creator-operating-suite-ad-v3-email.html`](./creator-operating-suite-ad-v3-email.html) | Still rewriting every email? | Consultants, solopreneurs, agency leads |
| **C · Calendar / deep work** | [`creator-operating-suite-ad-v3-calendar.html`](./creator-operating-suite-ad-v3-calendar.html) | Calendar still eats your week? | Educators, founders, knowledge workers |

## What differs between variants

| Scene | A (concept) | B (email) | C (calendar) |
|---|---|---|---|
| **Hook headline** | "Still re-explaining everything?" | "Still rewriting every email?" | "Calendar still eats your week?" |
| **Pain headline** | "Same project. Different answers." | "Same client. Different voice." | "One ask. Ten tabs." |
| **Chaos cards** | old prompts, lost decisions, etc. | draft v3, same intro, tone drifting, re:re:re | reschedule, find 30m slot, 3 time zones, mute Slack |
| **Phone bubbles** | Brand-voice briefings repeated | "Reply to Anna…" 3× | "Find me 2 hours…" 3× |
| **Pain pill** | × 3 THIS WEEK | × EVERY DAY | EVERY MONDAY |
| **Pipeline step 1** | Creator Entry Skill | Email Voice Skill | Routine Skill |
| **Pipeline step 2** | PersonalizationOS (voice · decisions · routines) | PersonalizationOS (past replies · sign-off · do-not-say) | PersonalizationOS (deep-work hours · meeting rules · DND) |
| **Pipeline step 3** | Consistent Output | Reply, your voice | Week, blocked |
| **Shift / GitHub / CTA** | identical across all variants | identical | identical |

## How to run a split test (Meta / TikTok)

1. **Same audience, same budget, same placement**, different ad creative.
2. Start with all three variants live for 48–72h.
3. Decision metric: **hook retention to 3s** (not CTR — that comes later).
4. Kill the lowest-performing variant once it's >25% below the leader on 3s retention.
5. Iterate copy on the surviving variant — keep motion identical.

## Thumbnail recommendations per variant

| Variant | Frame | Why |
|---|---|---|
| A · concept | `t = 4.8s` | System organized + product name visible |
| A-PT | `t = 4.8s` | Same composition, leitura em PT |
| B · email | `t = 8.5s` | "Email Voice Skill" card highlighted — task is recognizable |
| C · calendar | `t = 8.5s` | "Routine Skill" highlighted — speaks to time-poor audience |

## Notes

- All four files share the same `animations.jsx` and use identical scene timing.
- Each HTML uses a distinct `localStorage` `persistKey` so playhead positions don't collide if a user views multiple in sequence.
- The `<Stage>` autoplays + loops. For paid media export, capture once with screen recording or Puppeteer (see `EXPORT_AD_V2.md`).
- All copy is burned-in. No audio needed.
- PT-BR file uses the same fonts (Inter + JetBrains Mono) — they support full Portuguese diacritics with no fallback.

## Files generated

```
ad-vertical/
├── animations.jsx                                  (shared engine)
├── ad-scenes-v3.jsx                                ← A (original EN)
├── ad-scenes-v3-pt.jsx                             ← A-PT (Portuguese)
├── ad-scenes-v3-email.jsx                          ← B (email reply)
├── ad-scenes-v3-calendar.jsx                       ← C (calendar)
├── creator-operating-suite-ad-v3.html              ← A
├── creator-operating-suite-ad-v3-pt.html           ← A-PT
├── creator-operating-suite-ad-v3-email.html        ← B
└── creator-operating-suite-ad-v3-calendar.html     ← C
```

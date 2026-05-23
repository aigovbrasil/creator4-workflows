// scenes-b.jsx — Scenes 4, 5, 6, 7
// Depends on globals from scenes-a.jsx + animations.jsx

// ──────────────────────────────────────────────────────────────
// SCENE 4 — System Layers (30–45s)
// 6 stacked horizontal bars, appear one by one
// ──────────────────────────────────────────────────────────────
const LAYERS = [
  { num: '01', name: 'Creator Entry Skill',     sub: 'Claude understands who you are before you ask.' },
  { num: '02', name: 'PersonalizationOS',       sub: 'Voice. Decisions. Editorial calendar. One place.' },
  { num: '03', name: 'CMD Execution Suite',     sub: 'Triggers. Routines. Repeatable runs.' },
  { num: '04', name: 'Intelligence Routers',    sub: 'The right model on the right task.' },
  { num: '05', name: 'Context Engineering Proofs', sub: 'Claude loads the right context at the right moment.' },
  { num: '06', name: 'Validation System',       sub: 'Catch regressions before they ship.' },
];

function SceneLayers({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => <div><Eyebrow text="04 · The system" x={80} y={80} /></div>}
        </Sprite>

        {/* Section title (left side) */}
        <Sprite start={start + 0.3} end={end - 0.2}>
          <div style={{
            position: 'absolute', left: 80, top: 220,
            fontFamily: DISPLAY, fontSize: 64, fontWeight: 500,
            color: INK, lineHeight: 1.05, letterSpacing: '-0.015em',
            maxWidth: 480,
          }}>
            Six layers,<br/>one routine.
          </div>
          <div style={{
            position: 'absolute', left: 80, top: 430,
            fontFamily: BODY, fontSize: 22, color: INK_SOFT,
            maxWidth: 460, lineHeight: 1.4,
          }}>
            The Creator Operating Suite is a single, composable system — not a kit of disconnected prompts.
          </div>
          <div style={{
            position: 'absolute', left: 80, top: 760,
            fontFamily: MONO, fontSize: 16, color: MUTED, letterSpacing: '0.08em',
          }}>
            FROM CHAT &nbsp; →&nbsp; TO WORK SYSTEM
          </div>
        </Sprite>

        {/* Layer stack (right side) */}
        <Sprite start={start + 0.5} end={end - 0.2}>
          {({ localTime }) => {
            const items = LAYERS.map((layer, i) => {
              const delay = 0.4 + i * 0.55;
              const t = clamp((localTime - delay) / 0.5, 0, 1);
              const e = Easing.easeOutCubic(t);
              const y = 200 + i * 100;
              return (
                <div key={i} style={{
                  position: 'absolute', left: 760, top: y,
                  width: 1080, height: 80,
                  background: '#FFFFFF',
                  border: `1px solid ${RULE}`,
                  borderLeft: `4px solid ${INK}`,
                  display: 'flex', alignItems: 'center',
                  padding: '0 32px',
                  opacity: e,
                  transform: `translateX(${(1 - e) * 30}px)`,
                  gap: 32,
                }}>
                  <span style={{
                    fontFamily: MONO, fontSize: 16, fontWeight: 500,
                    color: MUTED, width: 40,
                  }}>{layer.num}</span>
                  <div style={{ flex: '0 0 360px' }}>
                    <div style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 500, color: INK, lineHeight: 1.1 }}>
                      {layer.name}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: BODY, fontSize: 17, color: INK_SOFT,
                    lineHeight: 1.35, flex: 1,
                  }}>
                    {layer.sub}
                  </div>
                </div>
              );
            });
            return <React.Fragment>{items}</React.Fragment>;
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 5 — GitHub Proof (45–60s)
// GitHub repo mockup
// ──────────────────────────────────────────────────────────────
const REPO_TREE = [
  { name: 'starter/',     desc: 'creator-entry-skill', delay: 0.0 },
  { name: 'suites/',      desc: 'write · plan · review · validate', delay: 0.4 },
  { name: 'docs/',        desc: 'how the system thinks', delay: 0.8 },
  { name: 'examples/',    desc: 'real workflows, real outputs', delay: 1.2 },
  { name: 'validation/',  desc: 'tests for consistency', delay: 1.6 },
  { name: 'README.md',    desc: 'start here', delay: 2.0, file: true },
  { name: 'LICENSE',      desc: 'MIT', delay: 2.4, file: true },
];

function SceneGitHub({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => <div><Eyebrow text="05 · The proof" x={80} y={80} /></div>}
        </Sprite>

        {/* Browser-window mockup */}
        <Sprite start={start + 0.3} end={end - 0.2}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 80, top: 180,
                width: 1760, height: 800,
                background: '#FFFFFF',
                border: `1px solid ${RULE}`,
                opacity: t,
                transform: `translateY(${(1 - t) * 20}px)`,
                boxShadow: '0 12px 40px rgba(26,26,26,0.06)',
                overflow: 'hidden',
              }}>
                {/* Browser chrome */}
                <div style={{
                  height: 48, background: '#FAFAF8',
                  borderBottom: `1px solid ${RULE}`,
                  display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
                }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 6, background: '#E55F4A' }}/>
                    <span style={{ width: 12, height: 12, borderRadius: 6, background: '#E9B949' }}/>
                    <span style={{ width: 12, height: 12, borderRadius: 6, background: '#5CB85A' }}/>
                  </div>
                  <div style={{
                    flex: 1, marginLeft: 16, height: 28,
                    background: '#FFFFFF',
                    border: `1px solid ${RULE}`,
                    display: 'flex', alignItems: 'center',
                    padding: '0 12px',
                    fontFamily: MONO, fontSize: 13, color: INK_SOFT,
                  }}>
                    github.com/Aurelio-Hq/creator-operating-suite
                  </div>
                </div>

                {/* Repo header */}
                <div style={{ padding: '32px 48px 24px', borderBottom: `1px solid ${RULE}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: MONO, fontSize: 18, color: INK }}>
                    <span style={{ color: MUTED }}>Aurelio-Hq /</span>
                    <span style={{ fontWeight: 500 }}>creator-operating-suite</span>
                    <span style={{
                      fontSize: 12, padding: '2px 10px',
                      border: `1px solid ${RULE}`, borderRadius: 999,
                      color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>Public</span>
                  </div>
                  <div style={{
                    marginTop: 12, fontFamily: BODY, fontSize: 17, color: INK_SOFT,
                  }}>
                    Workflows, skills, templates and decision systems for non-technical creators.
                  </div>
                  <div style={{ marginTop: 20, display: 'flex', gap: 24, fontFamily: MONO, fontSize: 13, color: MUTED }}>
                    <span>v0.1.0</span>
                    <span>MIT License</span>
                    <span>main branch</span>
                  </div>
                </div>

                {/* File tree */}
                <div style={{ padding: '24px 48px' }}>
                  {REPO_TREE.map((item, i) => {
                    const itemT = clamp((localTime - 0.8 - item.delay) / 0.4, 0, 1);
                    const e = Easing.easeOutCubic(itemT);
                    return (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center',
                        padding: '14px 8px',
                        borderBottom: i < REPO_TREE.length - 1 ? `1px solid ${RULE}` : 'none',
                        opacity: e,
                        transform: `translateX(${(1 - e) * 12}px)`,
                        gap: 20,
                      }}>
                        <span style={{
                          width: 24, color: item.file ? MUTED : ACCENT,
                          fontFamily: MONO, fontSize: 14,
                        }}>{item.file ? '◇' : '▸'}</span>
                        <span style={{
                          fontFamily: MONO, fontSize: 18, fontWeight: 500,
                          color: INK, width: 240,
                        }}>{item.name}</span>
                        <span style={{
                          fontFamily: BODY, fontSize: 16, color: INK_SOFT, flex: 1,
                        }}>{item.desc}</span>
                        <span style={{
                          fontFamily: MONO, fontSize: 13, color: MUTED,
                        }}>updated 2 days ago</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Pill captions floating at top-right */}
        <Sprite start={start + 1.5} end={start + 5.5}>
          {({ localTime, duration }) => {
            const exitDur = 0.3, entryDur = 0.3;
            const exitStart = duration - exitDur;
            let opacity = 1;
            if (localTime < entryDur) opacity = localTime / entryDur;
            else if (localTime > exitStart) opacity = 1 - (localTime - exitStart) / exitDur;
            return (
              <div style={{
                position: 'absolute', right: 80, top: 100,
                fontFamily: MONO, fontSize: 18,
                color: OK, fontWeight: 500,
                letterSpacing: '0.04em', opacity,
              }}>
                ● PUBLIC STARTER RELEASE
              </div>
            );
          }}
        </Sprite>
        <Sprite start={start + 6.0} end={start + 10.0}>
          {({ localTime, duration }) => {
            const exitDur = 0.3, entryDur = 0.3;
            const exitStart = duration - exitDur;
            let opacity = 1;
            if (localTime < entryDur) opacity = localTime / entryDur;
            else if (localTime > exitStart) opacity = 1 - (localTime - exitStart) / exitDur;
            return (
              <div style={{
                position: 'absolute', right: 80, top: 100,
                fontFamily: MONO, fontSize: 18,
                color: INK, fontWeight: 500,
                letterSpacing: '0.04em', opacity,
              }}>
                v0.1.0 &nbsp;·&nbsp; MIT LICENSE
              </div>
            );
          }}
        </Sprite>
        <Sprite start={start + 10.5} end={end - 0.2}>
          {({ localTime, duration }) => {
            const exitDur = 0.3, entryDur = 0.3;
            const exitStart = duration - exitDur;
            let opacity = 1;
            if (localTime < entryDur) opacity = localTime / entryDur;
            else if (localTime > exitStart) opacity = 1 - (localTime - exitStart) / exitDur;
            return (
              <div style={{
                position: 'absolute', right: 80, top: 100,
                fontFamily: MONO, fontSize: 18,
                color: INK, fontWeight: 500,
                letterSpacing: '0.04em', opacity,
              }}>
                NOT A PROMPT PACK. A WORKING SYSTEM.
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 6 — Before / After (60–75s)
// ──────────────────────────────────────────────────────────────
function BeforeAfterList({ items, label, color, side, localTime }) {
  return (
    <React.Fragment>
      <div style={{
        position: 'absolute',
        left: side === 'left' ? 100 : 1020,
        top: 220,
        fontFamily: MONO, fontSize: 16, fontWeight: 500,
        color: color, textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>
        {label}
      </div>
      {items.map((item, i) => {
        const delay = 0.5 + i * 0.6;
        const t = clamp((localTime - delay) / 0.5, 0, 1);
        const e = Easing.easeOutCubic(t);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: side === 'left' ? 100 : 1020,
            top: 290 + i * 100,
            width: 760,
            opacity: e,
            transform: `translateX(${(1 - e) * 16 * (side === 'left' ? -1 : 1)}px)`,
            display: 'flex', alignItems: 'baseline', gap: 20,
          }}>
            <span style={{
              fontFamily: MONO, fontSize: 14, color: MUTED, width: 28,
            }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{
              fontFamily: DISPLAY, fontSize: 36, fontWeight: 500,
              color: INK, lineHeight: 1.15, letterSpacing: '-0.01em',
            }}>
              {item}
            </span>
          </div>
        );
      })}
    </React.Fragment>
  );
}

function SceneBeforeAfter({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => <div><Eyebrow text="06 · Same model, different system" x={80} y={80} /></div>}
        </Sprite>

        {/* Vertical divider */}
        <Sprite start={start + 0.4} end={end - 0.2}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp((localTime - 0.2) / 0.8, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 960, top: 200,
                width: 1, height: 720 * t,
                background: RULE,
              }} />
            );
          }}
        </Sprite>

        {/* BEFORE side */}
        <Sprite start={start + 0.3} end={end - 0.2}>
          {({ localTime }) => (
            <BeforeAfterList
              items={[
                'Paste long prompt again.',
                'Explain the project again.',
                'Rebuild context by hand.',
                'Rewrite half the output.',
              ]}
              label="BEFORE · repeated context"
              color={MUTED}
              side="left"
              localTime={localTime}
            />
          )}
        </Sprite>

        {/* AFTER side */}
        <Sprite start={start + 2.8} end={end - 0.2}>
          {({ localTime }) => (
            <BeforeAfterList
              items={[
                'Trigger the workflow.',
                'Context loads itself.',
                'Voice and decisions persist.',
                'Output is already yours.',
              ]}
              label="AFTER · reusable workflow"
              color={OK}
              side="right"
              localTime={localTime}
            />
          )}
        </Sprite>

        {/* Bottom mono summary */}
        <Sprite start={start + 9.0} end={end - 0.2}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: '50%', bottom: 80,
                transform: `translateX(-50%) translateY(${(1 - t) * 12}px)`,
                fontFamily: MONO, fontSize: 18, color: INK_SOFT,
                letterSpacing: '0.06em', opacity: t,
              }}>
                same model &nbsp;·&nbsp; <span style={{ background: ACCENT_SOFT, padding: '2px 8px' }}>different system</span>
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 7 — CTA (75–85s)
// ──────────────────────────────────────────────────────────────
function SceneCTA({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: INK }}>
        {/* Top eyebrow */}
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => (
            <div style={{
              position: 'absolute', left: 80, top: 80,
              display: 'flex', alignItems: 'center', gap: 16,
              fontFamily: MONO, fontSize: 18, fontWeight: 500,
              color: 'rgba(246,244,239,0.55)',
              textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>
              <span>07 · Your move</span>
              <span style={{ width: 200, height: 1, background: 'rgba(246,244,239,0.4)' }} />
            </div>
          )}
        </Sprite>

        {/* Three-line CTA, stacked */}
        <Sprite start={start + 0.4} end={end - 0.2}>
          {({ localTime }) => {
            const lines = [
              { text: 'Open the repo.',  delay: 0.0 },
              { text: 'Test the starter.', delay: 0.6 },
              { text: 'Send feedback.',   delay: 1.2 },
            ];
            return (
              <div style={{
                position: 'absolute', left: 80, top: 280,
              }}>
                {lines.map((l, i) => {
                  const t = clamp((localTime - 0.3 - l.delay) / 0.5, 0, 1);
                  const e = Easing.easeOutCubic(t);
                  return (
                    <div key={i} style={{
                      fontFamily: DISPLAY, fontSize: 140, fontWeight: 500,
                      color: PAPER, lineHeight: 1.05, letterSpacing: '-0.02em',
                      opacity: e,
                      transform: `translateY(${(1 - e) * 30}px)`,
                      marginBottom: 0,
                    }}>
                      {l.text}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Sprite>

        {/* Repo URL bar at bottom */}
        <Sprite start={start + 2.8} end={end - 0.2}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 80, right: 80, bottom: 100,
                paddingTop: 28,
                borderTop: '1px solid rgba(246,244,239,0.25)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                opacity: t, transform: `translateY(${(1 - t) * 12}px)`,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 32, fontWeight: 500, color: PAPER,
                }}>
                  github.com/Aurelio-Hq/creator-operating-suite
                </div>
                <div style={{
                  fontFamily: MONO, fontSize: 16, color: 'rgba(246,244,239,0.55)',
                  letterSpacing: '0.04em',
                }}>
                  public &nbsp;·&nbsp; MIT &nbsp;·&nbsp; feedback welcome
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Tiny brand tag, top right */}
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => (
            <div style={{
              position: 'absolute', right: 80, top: 80,
              fontFamily: MONO, fontSize: 16,
              color: 'rgba(246,244,239,0.55)',
              letterSpacing: '0.08em',
            }}>
              CREATOR OPERATING SUITE · v0.1.0
            </div>
          )}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ──────────────────────────────────────────────────────────────
// TIME LABEL (debug + commenting handle) — always-on bottom-right tag
// ──────────────────────────────────────────────────────────────
function TimeLabel() {
  const time = useTime();
  const sec = Math.floor(time);
  const lbl = `${String(Math.floor(sec / 60)).padStart(1,'0')}:${String(sec % 60).padStart(2,'0')}`;
  // Update root data-screen-label so comments know the timestamp
  React.useEffect(() => {
    const root = document.querySelector('[data-screen-label]');
    if (root) root.setAttribute('data-screen-label', `t=${lbl}`);
  }, [lbl]);
  return null;
}

Object.assign(window, {
  SceneLayers, SceneGitHub, SceneBeforeAfter, SceneCTA, TimeLabel,
});

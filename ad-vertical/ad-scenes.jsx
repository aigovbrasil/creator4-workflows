// ad-scenes.jsx — 15s vertical ad, mobile-first
// 1080×1920. Loaded after animations.jsx.

const PAPER = '#F4F1EA';
const PAPER_2 = '#FAF8F2';
const INK = '#181818';
const INK_SOFT = '#3A3A3A';
const MUTED = '#9A938A';
const RULE = '#E3DDD0';
const ACCENT = '#C8553D';
const ACCENT_SOFT = '#F4D9C9';
const OK = '#3F7A4A';
const OK_SOFT = '#D6E5D2';

const SANS = `"Inter", "SF Pro Display", system-ui, sans-serif`;
const DISPLAY = `"Inter", system-ui, sans-serif`;
const MONO = `"JetBrains Mono", ui-monospace, monospace`;

// ── Phone status bar (top) ────────────────────────────────
function StatusBar({ dark = false }) {
  const color = dark ? '#FFFFFF' : INK;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: 80, padding: '0 56px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: SANS, fontSize: 28, fontWeight: 600, color,
      zIndex: 10, pointerEvents: 'none',
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {/* Signal */}
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
          <div style={{ width: 5, height: 6, background: color, borderRadius: 1 }}/>
          <div style={{ width: 5, height: 9, background: color, borderRadius: 1 }}/>
          <div style={{ width: 5, height: 12, background: color, borderRadius: 1 }}/>
          <div style={{ width: 5, height: 15, background: color, borderRadius: 1 }}/>
        </div>
        {/* WiFi */}
        <div style={{ fontSize: 26, marginTop: -2 }}>◗</div>
        {/* Battery */}
        <div style={{
          width: 52, height: 24,
          border: `2px solid ${color}`, borderRadius: 6,
          position: 'relative', padding: 2,
        }}>
          <div style={{ width: '78%', height: '100%', background: color, borderRadius: 2 }}/>
          <div style={{
            position: 'absolute', right: -5, top: 7,
            width: 3, height: 10, background: color, borderRadius: 2,
          }}/>
        </div>
      </div>
    </div>
  );
}

// ── Chat bubble (rounded) ─────────────────────────────────
function Bubble({ children, side = 'right', tone = 'user', x, y, width, opacity = 1, scale = 1, ty = 0 }) {
  const isUser = tone === 'user';
  const bg = isUser ? INK : '#FFFFFF';
  const fg = isUser ? PAPER : INK;
  const border = isUser ? 'none' : `1px solid ${RULE}`;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width, padding: '28px 34px',
      background: bg, color: fg, border,
      borderRadius: 36,
      borderBottomLeftRadius: side === 'left' ? 8 : 36,
      borderBottomRightRadius: side === 'right' ? 8 : 36,
      fontFamily: SANS, fontSize: 36, fontWeight: 500,
      lineHeight: 1.25, letterSpacing: '-0.01em',
      boxShadow: isUser ? 'none' : '0 4px 24px rgba(24,24,24,0.04)',
      transform: `scale(${scale}) translateY(${ty}px)`,
      transformOrigin: side === 'right' ? '100% 100%' : '0% 100%',
      opacity,
    }}>
      {children}
    </div>
  );
}

// ── Action card with progress / status ────────────────────
function ActionCard({ x, y, width = 720, icon, title, status, done = false, opacity = 1, ty = 0, progress = 0 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width,
      background: '#FFFFFF',
      border: `1px solid ${RULE}`,
      borderRadius: 28,
      padding: '24px 28px',
      boxShadow: '0 6px 28px rgba(24,24,24,0.05)',
      transform: `translateY(${ty}px)`, opacity,
      fontFamily: SANS,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: done ? OK_SOFT : ACCENT_SOFT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, color: done ? OK : ACCENT,
          fontWeight: 600,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 30, fontWeight: 600, color: INK,
            letterSpacing: '-0.01em', lineHeight: 1.2,
          }}>{title}</div>
          <div style={{
            marginTop: 6, fontSize: 22, color: done ? OK : MUTED,
            fontWeight: 500,
          }}>{status}</div>
        </div>
        {done && (
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: OK, color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700,
          }}>✓</div>
        )}
      </div>
      {!done && (
        <div style={{
          marginTop: 18, height: 6, borderRadius: 3,
          background: RULE, overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress * 100}%`, height: '100%',
            background: ACCENT, borderRadius: 3,
            transition: 'width 80ms linear',
          }}/>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0–3s)
// User types/sends message
// ─────────────────────────────────────────────────────────
function SceneHook({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <StatusBar />

        {/* Chat header */}
        <Sprite start={start} end={end}>
          {() => (
            <div style={{
              position: 'absolute', top: 100, left: 0, right: 0,
              padding: '20px 56px 28px',
              borderBottom: `1px solid ${RULE}`,
              display: 'flex', alignItems: 'center', gap: 20,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 32,
                background: INK, color: PAPER,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: DISPLAY, fontSize: 28, fontWeight: 600,
                letterSpacing: '-0.02em',
              }}>★</div>
              <div>
                <div style={{ fontFamily: SANS, fontSize: 28, fontWeight: 600, color: INK }}>
                  Assistant
                </div>
                <div style={{ fontFamily: SANS, fontSize: 20, color: OK, marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: OK, display: 'inline-block' }}/>
                  ready
                </div>
              </div>
              <div style={{ flex: 1 }}/>
              <div style={{
                fontFamily: MONO, fontSize: 20, color: MUTED,
                letterSpacing: '0.04em',
              }}>···</div>
            </div>
          )}
        </Sprite>

        {/* Hook headline at top */}
        <Sprite start={start + 0.2} end={start + 2.6}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            const exitT = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', top: 280, left: 56, right: 56,
                fontFamily: DISPLAY, fontSize: 92, fontWeight: 700,
                color: INK, lineHeight: 1.0, letterSpacing: '-0.04em',
                opacity, transform: `translateY(${(1-t)*16}px)`,
              }}>
                Running<br/>late?
              </div>
            );
          }}
        </Sprite>

        {/* Subtext */}
        <Sprite start={start + 0.6} end={start + 2.6}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            const exitT = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', top: 530, left: 56, right: 56,
                fontFamily: SANS, fontSize: 34, fontWeight: 500,
                color: INK_SOFT, lineHeight: 1.25, letterSpacing: '-0.01em',
                opacity, transform: `translateY(${(1-t)*12}px)`,
                maxWidth: 760,
              }}>
                One message. Real action.
              </div>
            );
          }}
        </Sprite>

        {/* User bubble appears, types out */}
        <Sprite start={start + 1.4} end={end}>
          {({ localTime }) => {
            const enter = Easing.easeOutBack(clamp(localTime / 0.45, 0, 1));
            // Typewriter
            const full = "Export my pitch deck and attach it to my 3pm invite.";
            const charT = clamp((localTime - 0.35) / 1.4, 0, 1);
            const visible = full.slice(0, Math.floor(charT * full.length));
            const showCursor = localTime > 0.35 && charT < 1 && Math.floor(localTime * 2) % 2 === 0;
            return (
              <div style={{
                position: 'absolute', left: 0, right: 0,
                bottom: 220,
                display: 'flex', justifyContent: 'flex-end',
                padding: '0 56px',
                opacity: enter,
                transform: `scale(${0.85 + 0.15 * enter})`,
                transformOrigin: '100% 100%',
              }}>
                <div style={{
                  maxWidth: 880, padding: '32px 38px',
                  background: INK, color: PAPER,
                  borderRadius: 40,
                  borderBottomRightRadius: 10,
                  fontFamily: SANS, fontSize: 40, fontWeight: 500,
                  lineHeight: 1.25, letterSpacing: '-0.01em',
                }}>
                  {visible}
                  {showCursor && <span style={{ opacity: 0.8 }}>▍</span>}
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Input bar at bottom */}
        <Sprite start={start} end={end}>
          {() => (
            <div style={{
              position: 'absolute', bottom: 60, left: 56, right: 56,
              height: 96, borderRadius: 48,
              background: '#FFFFFF', border: `1px solid ${RULE}`,
              display: 'flex', alignItems: 'center', padding: '0 32px',
              fontFamily: SANS, fontSize: 28, color: MUTED,
              boxShadow: '0 4px 20px rgba(24,24,24,0.04)',
            }}>
              <span>Message…</span>
              <div style={{ flex: 1 }}/>
              <div style={{
                width: 60, height: 60, borderRadius: 30,
                background: ACCENT, color: PAPER,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700,
              }}>↑</div>
            </div>
          )}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 2 — SOLUTION (3–8s)
// Actions execute, cards stack up
// ─────────────────────────────────────────────────────────
function SceneSolution({ start, end }) {
  const dur = end - start;
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <StatusBar />

        {/* Caption at top */}
        <Sprite start={start + 0.0} end={start + 2.2}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', top: 160, left: 56, right: 56,
                opacity, transform: `translateY(${(1-t)*12}px)`,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 22, color: MUTED,
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16,
                }}>● ASK ONCE</div>
                <div style={{
                  fontFamily: DISPLAY, fontSize: 84, fontWeight: 700,
                  color: INK, lineHeight: 1.0, letterSpacing: '-0.035em',
                }}>
                  Action starts<br/>instantly.
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Caption swap */}
        <Sprite start={start + 2.4} end={end - 0.1}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', top: 160, left: 56, right: 56,
                opacity, transform: `translateY(${(1-t)*12}px)`,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 22, color: ACCENT,
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16,
                }}>● EXECUTING</div>
                <div style={{
                  fontFamily: DISPLAY, fontSize: 76, fontWeight: 700,
                  color: INK, lineHeight: 1.0, letterSpacing: '-0.035em',
                }}>
                  No tabs.<br/>No switching.
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Three action cards appearing in sequence with progress */}
        <Sprite start={start + 0.5} end={end - 0.1}>
          {({ localTime }) => {
            // Card 1: Exporting deck (0.5–2.5)
            const c1Appear = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const c1Progress = clamp((localTime - 0.3) / 1.4, 0, 1);
            const c1Done = c1Progress >= 1;

            // Card 2: Opening calendar (1.4–3.4)
            const c2Appear = Easing.easeOutCubic(clamp((localTime - 0.9) / 0.4, 0, 1));
            const c2Progress = clamp((localTime - 1.2) / 1.3, 0, 1);
            const c2Done = c2Progress >= 1;

            // Card 3: Attaching file (2.3–4.3)
            const c3Appear = Easing.easeOutCubic(clamp((localTime - 1.8) / 0.4, 0, 1));
            const c3Progress = clamp((localTime - 2.1) / 1.3, 0, 1);
            const c3Done = c3Progress >= 1;

            return (
              <React.Fragment>
                <ActionCard
                  x={120} y={680} width={840}
                  icon="◫"
                  title="Export pitch deck"
                  status={c1Done ? "Done · pitch-deck.pdf" : "Rendering 24 slides…"}
                  done={c1Done}
                  opacity={c1Appear}
                  ty={(1 - c1Appear) * 30}
                  progress={c1Progress}
                />
                <ActionCard
                  x={120} y={880} width={840}
                  icon="▦"
                  title="Open 3pm invite"
                  status={c2Done ? "Done · Friday product review" : "Locating in Calendar…"}
                  done={c2Done}
                  opacity={c2Appear}
                  ty={(1 - c2Appear) * 30}
                  progress={c2Progress}
                />
                <ActionCard
                  x={120} y={1080} width={840}
                  icon="↗"
                  title="Attach file to event"
                  status={c3Done ? "Done · attached" : "Linking pdf → invite…"}
                  done={c3Done}
                  opacity={c3Appear}
                  ty={(1 - c3Appear) * 30}
                  progress={c3Progress}
                />
              </React.Fragment>
            );
          }}
        </Sprite>

        {/* Status pill at bottom */}
        <Sprite start={start + 0.3} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: '50%', bottom: 140,
                transform: `translateX(-50%) translateY(${(1-t)*12}px)`,
                opacity: t,
                padding: '20px 32px',
                background: INK, color: PAPER,
                borderRadius: 999,
                fontFamily: SANS, fontSize: 26, fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 14,
                letterSpacing: '-0.005em',
              }}>
                <span style={{
                  width: 14, height: 14, borderRadius: 7,
                  background: ACCENT,
                  animation: 'pulse 1.4s ease-in-out infinite',
                }}/>
                <style>{`@keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }`}</style>
                Working on 3 things
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 3 — RESULT (8–12s)
// Calendar event with PDF attached
// ─────────────────────────────────────────────────────────
function SceneResult({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <StatusBar />

        {/* Caption */}
        <Sprite start={start + 0.0} end={start + 2.0}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', top: 160, left: 56, right: 56,
                opacity, transform: `translateY(${(1-t)*12}px)`,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 22, color: OK,
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16,
                }}>● DONE</div>
                <div style={{
                  fontFamily: DISPLAY, fontSize: 88, fontWeight: 700,
                  color: INK, lineHeight: 1.0, letterSpacing: '-0.035em',
                }}>
                  From request<br/>to done.
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Caption swap */}
        <Sprite start={start + 2.2} end={end - 0.1}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', top: 160, left: 56, right: 56,
                opacity, transform: `translateY(${(1-t)*12}px)`,
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 22, color: MUTED,
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16,
                }}>● READY</div>
                <div style={{
                  fontFamily: DISPLAY, fontSize: 80, fontWeight: 700,
                  color: INK, lineHeight: 1.0, letterSpacing: '-0.035em',
                }}>
                  No app<br/>switching.
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Calendar event card — the "result" */}
        <Sprite start={start + 0.3} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutBack(clamp(localTime / 0.55, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 80, right: 80, top: 680,
                background: '#FFFFFF',
                borderRadius: 36,
                border: `1px solid ${RULE}`,
                padding: '36px 36px 32px',
                boxShadow: '0 12px 40px rgba(24,24,24,0.08)',
                opacity: t,
                transform: `scale(${0.92 + 0.08 * t})`,
                transformOrigin: '50% 50%',
                fontFamily: SANS,
              }}>
                {/* Date strip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{
                    width: 88, padding: '12px 0',
                    background: ACCENT_SOFT, color: ACCENT,
                    borderRadius: 18, textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.1em' }}>FRI</div>
                    <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 2 }}>24</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 22, color: MUTED, fontWeight: 500,
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>3:00 – 4:00 PM</div>
                    <div style={{
                      fontSize: 38, fontWeight: 700, color: INK,
                      letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 4,
                    }}>Product review</div>
                  </div>
                </div>

                {/* Attendees */}
                <div style={{
                  marginTop: 28, paddingTop: 24,
                  borderTop: `1px solid ${RULE}`,
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  {['JM', 'AR', 'LK'].map((init, i) => (
                    <div key={i} style={{
                      width: 56, height: 56, borderRadius: 28,
                      background: i === 0 ? INK : i === 1 ? '#E8D8C4' : '#D6E5D2',
                      color: i === 0 ? PAPER : INK,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em',
                      marginLeft: i === 0 ? 0 : -20,
                      border: `3px solid #FFFFFF`,
                    }}>{init}</div>
                  ))}
                  <span style={{ fontSize: 22, color: MUTED, fontWeight: 500, marginLeft: 8 }}>
                    + 4 others
                  </span>
                </div>

                {/* Attached file with a "just added" highlight */}
                <Sprite start={0.4} end={4.0}>
                  {({ localTime: lt }) => {
                    const pulseT = clamp(lt / 0.6, 0, 1);
                    const ringScale = 1 + (1 - pulseT) * 0.08;
                    const ringOpacity = 1 - pulseT;
                    return (
                      <div style={{
                        marginTop: 28, padding: '22px 24px',
                        background: PAPER_2,
                        borderRadius: 24,
                        border: `2px solid ${ACCENT}`,
                        display: 'flex', alignItems: 'center', gap: 18,
                        position: 'relative',
                        transform: `scale(${ringScale})`,
                      }}>
                        {ringOpacity > 0 && (
                          <div style={{
                            position: 'absolute', inset: -8,
                            borderRadius: 28,
                            border: `2px solid ${ACCENT}`,
                            opacity: ringOpacity * 0.5,
                            transform: `scale(${1 + (1 - ringOpacity) * 0.06})`,
                            pointerEvents: 'none',
                          }}/>
                        )}
                        <div style={{
                          width: 56, height: 68, borderRadius: 10,
                          background: ACCENT, color: PAPER,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: MONO, fontSize: 18, fontWeight: 700,
                          letterSpacing: '0.04em',
                        }}>PDF</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 26, fontWeight: 600, color: INK,
                            letterSpacing: '-0.01em',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>pitch-deck.pdf</div>
                          <div style={{
                            marginTop: 4, fontSize: 20, color: MUTED, fontWeight: 500,
                          }}>2.4 MB · just attached</div>
                        </div>
                        <div style={{
                          padding: '6px 14px',
                          background: ACCENT, color: PAPER,
                          borderRadius: 999,
                          fontSize: 18, fontWeight: 700,
                          letterSpacing: '0.06em',
                        }}>NEW</div>
                      </div>
                    );
                  }}
                </Sprite>

                {/* Big check at bottom */}
                <Sprite start={0.8} end={4.0}>
                  {({ localTime: lt }) => {
                    const t2 = Easing.easeOutBack(clamp(lt / 0.5, 0, 1));
                    return (
                      <div style={{
                        marginTop: 28, paddingTop: 24,
                        borderTop: `1px solid ${RULE}`,
                        display: 'flex', alignItems: 'center', gap: 16,
                        opacity: t2,
                        transform: `translateY(${(1-t2)*8}px)`,
                      }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 24,
                          background: OK, color: PAPER,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 26, fontWeight: 700,
                        }}>✓</div>
                        <div style={{
                          fontSize: 28, fontWeight: 600, color: OK,
                          letterSpacing: '-0.01em',
                        }}>All set · invite updated</div>
                      </div>
                    );
                  }}
                </Sprite>
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 4 — CTA (12–15s)
// ─────────────────────────────────────────────────────────
function SceneCTAAd({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: INK }}>
        <StatusBar dark />

        {/* Eyebrow */}
        <Sprite start={start + 0.1} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 200, left: 56,
                display: 'flex', alignItems: 'center', gap: 16,
                fontFamily: MONO, fontSize: 22, fontWeight: 500,
                color: 'rgba(244,241,234,0.6)',
                textTransform: 'uppercase', letterSpacing: '0.14em',
                opacity: t, transform: `translateY(${(1-t)*8}px)`,
              }}>
                <span>● The shift</span>
              </div>
            );
          }}
        </Sprite>

        {/* Hero — huge CTA */}
        <Sprite start={start + 0.3} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 320, left: 56, right: 56,
                fontFamily: DISPLAY, fontSize: 132, fontWeight: 700,
                color: PAPER, lineHeight: 0.95, letterSpacing: '-0.045em',
                opacity: t, transform: `translateY(${(1-t)*20}px)`,
              }}>
                Turn chat<br/>
                into <span style={{
                  background: ACCENT, color: PAPER,
                  padding: '0 18px',
                  display: 'inline-block',
                  borderRadius: 12,
                }}>action.</span>
              </div>
            );
          }}
        </Sprite>

        {/* Sub */}
        <Sprite start={start + 0.7} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 870, left: 56, right: 56,
                fontFamily: SANS, fontSize: 36, fontWeight: 500,
                color: 'rgba(244,241,234,0.75)', lineHeight: 1.25, letterSpacing: '-0.01em',
                opacity: t, transform: `translateY(${(1-t)*12}px)`,
              }}>
                Ask once in plain language.<br/>
                The system executes for you.
              </div>
            );
          }}
        </Sprite>

        {/* CTA button */}
        <Sprite start={start + 1.0} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutBack(clamp(localTime / 0.5, 0, 1));
            // Pulse
            const pulse = 1 + Math.sin(localTime * 4) * 0.012;
            return (
              <div style={{
                position: 'absolute', left: 56, right: 56, top: 1180,
                opacity: t, transform: `scale(${pulse * (0.95 + 0.05 * t)})`,
                transformOrigin: '50% 50%',
              }}>
                <div style={{
                  background: PAPER, color: INK,
                  borderRadius: 56,
                  padding: '34px 40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: SANS, fontSize: 42, fontWeight: 700,
                  letterSpacing: '-0.015em',
                  boxShadow: '0 20px 60px rgba(200,85,61,0.25)',
                }}>
                  <span>Try the demo</span>
                  <div style={{
                    width: 68, height: 68, borderRadius: 34,
                    background: ACCENT, color: PAPER,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 34, fontWeight: 700,
                  }}>→</div>
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* Brand tag at bottom */}
        <Sprite start={start + 0.5} end={end - 0.1}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            return (
              <div style={{
                position: 'absolute', bottom: 140, left: 56, right: 56,
                paddingTop: 28,
                borderTop: '1px solid rgba(244,241,234,0.18)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                opacity: t,
              }}>
                <div style={{
                  fontFamily: SANS, fontSize: 26, fontWeight: 600, color: PAPER,
                  letterSpacing: '-0.01em',
                }}>
                  Creator Operating Suite
                </div>
                <div style={{
                  fontFamily: MONO, fontSize: 18, color: 'rgba(244,241,234,0.5)',
                  letterSpacing: '0.06em',
                }}>
                  v0.1 · early access
                </div>
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// TIME LABEL — debug + commenting handle
// ─────────────────────────────────────────────────────────
function AdTimeLabel() {
  const time = useTime();
  const sec = Math.floor(time * 10) / 10;
  const lbl = `t=${sec.toFixed(1)}s`;
  React.useEffect(() => {
    const root = document.querySelector('[data-screen-label]');
    if (root) root.setAttribute('data-screen-label', lbl);
  }, [lbl]);
  return null;
}

Object.assign(window, {
  PAPER, INK, INK_SOFT, MUTED, RULE, ACCENT, ACCENT_SOFT, OK, OK_SOFT,
  SANS, DISPLAY, MONO,
  StatusBar, Bubble, ActionCard,
  SceneHook, SceneSolution, SceneResult, SceneCTAAd, AdTimeLabel,
});

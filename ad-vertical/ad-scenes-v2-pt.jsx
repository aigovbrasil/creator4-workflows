// ad-scenes-v2.jsx — 15s vertical ad v2
// Topic: Creator Operating Suite + PersonalizationOS
// Story: chaos → system → pipeline → github → CTA
// 1080×1920. Loaded after animations.jsx.

// Reuse tokens
const V2_PAPER = '#F4F1EA';
const V2_PAPER_2 = '#FAF8F2';
const V2_INK = '#181818';
const V2_INK_SOFT = '#3A3A3A';
const V2_MUTED = '#9A938A';
const V2_RULE = '#E3DDD0';
const V2_ACCENT = '#C8553D';
const V2_ACCENT_SOFT = '#F4D9C9';
const V2_OK = '#3F7A4A';
const V2_OK_SOFT = '#D6E5D2';

const V2_SANS = `"Inter", "SF Pro Display", system-ui, sans-serif`;
const V2_MONO = `"JetBrains Mono", ui-monospace, monospace`;

// ── Status bar ─────────────────────────────────────────────
function V2StatusBar({ dark = false }) {
  const color = dark ? '#FFFFFF' : V2_INK;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: 80, padding: '0 56px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: V2_SANS, fontSize: 28, fontWeight: 600, color,
      zIndex: 10, pointerEvents: 'none',
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
          <div style={{ width: 5, height: 6, background: color, borderRadius: 1 }}/>
          <div style={{ width: 5, height: 9, background: color, borderRadius: 1 }}/>
          <div style={{ width: 5, height: 12, background: color, borderRadius: 1 }}/>
          <div style={{ width: 5, height: 15, background: color, borderRadius: 1 }}/>
        </div>
        <div style={{
          width: 52, height: 24,
          border: `2px solid ${color}`, borderRadius: 6,
          position: 'relative', padding: 2,
        }}>
          <div style={{ width: '78%', height: '100%', background: color, borderRadius: 2 }}/>
          <div style={{ position: 'absolute', right: -5, top: 7, width: 3, height: 10, background: color, borderRadius: 2 }}/>
        </div>
      </div>
    </div>
  );
}

// ── Caption (huge, mobile-first) ──────────────────────────
function V2Caption({ text, x = 56, y = 140, size = 84, color = V2_INK, weight = 700, leading = 1.0, eyebrow, accent = V2_ACCENT }) {
  const { localTime, duration } = useSprite();
  const entryDur = 0.4, exitDur = 0.3;
  const exitStart = duration - exitDur;
  let opacity = 1, ty = 0;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(localTime / entryDur);
    opacity = t; ty = (1 - t) * 18;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic((localTime - exitStart) / exitDur);
    opacity = 1 - t; ty = -t * 10;
  }
  return (
    <div style={{
      position: 'absolute', left: x, top: y, right: x,
      opacity, transform: `translateY(${ty}px)`,
    }}>
      {eyebrow && (
        <div style={{
          fontFamily: V2_MONO, fontSize: 22, color: accent,
          textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 18,
          fontWeight: 500,
        }}>● {eyebrow}</div>
      )}
      <div style={{
        fontFamily: V2_SANS, fontSize: size, fontWeight: weight,
        color, lineHeight: leading, letterSpacing: '-0.04em',
        whiteSpace: 'pre-line',
      }}>{text}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 1 — HOOK (0–3s)
// Chaotic blocks burst onto a mobile chat
// ─────────────────────────────────────────────────────────
const CHAOS_BLOCKS = [
  { text: 'prompts antigos',       x: 80,  y: 700,  rot: -4, w: 420, h: 130, delay: 0.0, color: '#FFF8E0' },
  { text: 'decisões perdidas',     x: 560, y: 760,  rot: 3,  w: 440, h: 130, delay: 0.12, color: '#FFFFFF' },
  { text: 'contexto do projeto',   x: 100, y: 880,  rot: -2, w: 480, h: 130, delay: 0.22, color: '#FFFFFF' },
  { text: 'mesmo briefing de novo',x: 620, y: 920,  rot: 4,  w: 440, h: 130, delay: 0.32, color: '#FFF8E0' },
  { text: 'voz de março?',         x: 90,  y: 1060, rot: 2,  w: 380, h: 120, delay: 0.42, color: '#FFFFFF' },
  { text: 'qual chat era?',        x: 500, y: 1080, rot: -3, w: 420, h: 120, delay: 0.52, color: '#FFF8E0' },
  { text: 'copia do doc/12',       x: 120, y: 1230, rot: 1,  w: 420, h: 120, delay: 0.62, color: '#FFFFFF' },
  { text: 'reescreve (de novo)',   x: 580, y: 1260, rot: -2, w: 440, h: 120, delay: 0.72, color: '#FFF8E0' },
];

function SceneV2Hook({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: V2_PAPER }}>
        <V2StatusBar />

        {/* Chaos blocks */}
        <Sprite start={start + 0.05} end={end - 0.05}>
          {({ localTime, duration }) => {
            const exitT = clamp((localTime - (duration - 0.35)) / 0.35, 0, 1);
            const exitE = Easing.easeInCubic(exitT);
            return CHAOS_BLOCKS.map((b, i) => {
              const t = clamp((localTime - b.delay) / 0.3, 0, 1);
              const e = Easing.easeOutBack(t);
              const opacity = e * (1 - exitE);
              const ty = (1 - e) * 30 + exitE * 30;
              const rot = b.rot * (1 - exitE * 0.3);
              return (
                <div key={i} style={{
                  position: 'absolute', left: b.x, top: b.y,
                  width: b.w, height: b.h,
                  background: b.color,
                  borderRadius: 22,
                  display: 'flex', alignItems: 'center', padding: '0 28px',
                  fontFamily: V2_MONO, fontSize: 26, color: V2_INK_SOFT,
                  letterSpacing: '-0.01em',
                  opacity,
                  transform: `rotate(${rot}deg) translateY(${ty}px)`,
                  boxShadow: '0 8px 28px rgba(24,24,24,0.08)',
                  border: `1px solid ${V2_RULE}`,
                  fontWeight: 500,
                }}>
                  <span style={{ color: V2_MUTED, marginRight: 14, fontSize: 22 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {b.text}
                </div>
              );
            });
          }}
        </Sprite>

        {/* Hook caption */}
        <Sprite start={start + 0.1} end={start + 2.85}>
          <V2Caption
            eyebrow="O LOOP"
            text={"Ainda reexplicando\ntudo para\no Claude?"}
            y={170}
            size={90}
            leading={0.96}
            accent={V2_ACCENT}
          />
        </Sprite>

        {/* Bottom hint */}
        <Sprite start={start + 0.5} end={end - 0.1}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', left: '50%', bottom: 120,
                transform: `translateX(-50%) translateY(${(1-t)*10}px)`,
                fontFamily: V2_SANS, fontSize: 26, fontWeight: 500,
                color: V2_INK_SOFT, opacity,
                padding: '14px 26px', background: 'rgba(255,255,255,0.7)',
                borderRadius: 999, backdropFilter: 'blur(6px)',
                border: `1px solid ${V2_RULE}`,
              }}>
                cada conversa começa do zero
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 2 — SHIFT (3–6s)
// Blocks reorganize into a clean stack
// ─────────────────────────────────────────────────────────
const SYSTEM_STACK = [
  { label: 'Contexto',   sub: 'quem você é, toda vez',           color: V2_INK },
  { label: 'Workflows',  sub: 'rotinas que se repetem',          color: V2_INK },
  { label: 'Skills',     sub: 'ferramentas que já te conhecem',  color: V2_INK },
  { label: 'Templates',  sub: 'forma, não só palavras',          color: V2_INK },
  { label: 'Decisões',   sub: 'escolhas que ficam salvas',       color: V2_INK },
];

function SceneV2Shift({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: V2_PAPER }}>
        <V2StatusBar />

        {/* Caption */}
        <Sprite start={start + 0.1} end={end - 0.05}>
          <V2Caption
            eyebrow="A VIRADA"
            text={"Transforme IA em\nsistema de trabalho."}
            y={170}
            size={78}
            leading={0.98}
            accent={V2_ACCENT}
          />
        </Sprite>

        {/* Stack appearing one by one */}
        <Sprite start={start + 0.25} end={end - 0.05}>
          {({ localTime }) => {
            const stackTop = 720;
            const rowH = 132;
            return SYSTEM_STACK.map((row, i) => {
              const delay = i * 0.18;
              const t = clamp((localTime - delay) / 0.4, 0, 1);
              const e = Easing.easeOutCubic(t);
              return (
                <div key={i} style={{
                  position: 'absolute',
                  left: 80, right: 80,
                  top: stackTop + i * rowH,
                  height: 112,
                  background: '#FFFFFF',
                  border: `1px solid ${V2_RULE}`,
                  borderLeft: `5px solid ${V2_INK}`,
                  borderRadius: 22,
                  display: 'flex', alignItems: 'center',
                  padding: '0 32px', gap: 24,
                  opacity: e,
                  transform: `translateX(${(1 - e) * -40}px)`,
                  boxShadow: '0 4px 18px rgba(24,24,24,0.04)',
                }}>
                  <span style={{
                    fontFamily: V2_MONO, fontSize: 22, fontWeight: 500,
                    color: V2_MUTED, width: 44,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: V2_SANS, fontSize: 38, fontWeight: 700,
                      color: V2_INK, lineHeight: 1.0, letterSpacing: '-0.02em',
                    }}>{row.label}</div>
                    <div style={{
                      marginTop: 6, fontFamily: V2_SANS, fontSize: 22,
                      color: V2_MUTED, fontWeight: 500,
                    }}>{row.sub}</div>
                  </div>
                  {/* Check icon appearing slightly later */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 22,
                    background: e > 0.95 ? V2_OK : V2_RULE,
                    color: e > 0.95 ? '#FFFFFF' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: 700,
                    transition: 'background 200ms',
                  }}>✓</div>
                </div>
              );
            });
          }}
        </Sprite>

        {/* Subtle brand chip at bottom */}
        <Sprite start={start + 1.4} end={end - 0.05}>
          {({ localTime, duration }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
            const opacity = t * (1 - exitT);
            return (
              <div style={{
                position: 'absolute', left: '50%', bottom: 130,
                transform: `translateX(-50%) translateY(${(1-t)*10}px)`,
                opacity, padding: '16px 28px',
                background: V2_INK, color: V2_PAPER,
                borderRadius: 999,
                fontFamily: V2_SANS, fontSize: 24, fontWeight: 600,
                letterSpacing: '-0.005em',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: V2_ACCENT }}/>
                Creator Operating Suite
              </div>
            );
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 3 — PIPELINE (6–10s)
// Creator Entry Skill → PersonalizationOS → Consistent Output
// ─────────────────────────────────────────────────────────
const PIPELINE = [
  {
    label: 'Creator Entry Skill',
    sub:   'O Claude abre já te conhecendo.',
    eyebrow: 'ETAPA 01',
    caption: 'O contexto carrega.',
    captionAccent: V2_ACCENT,
    rangeStart: 0.1, rangeEnd: 1.4,
  },
  {
    label: 'PersonalizationOS',
    sub:   'voz · decisões · rotinas',
    eyebrow: 'ETAPA 02',
    caption: 'O workflow começa.',
    captionAccent: V2_ACCENT,
    rangeStart: 1.3, rangeEnd: 2.6,
  },
  {
    label: 'Output Consistente',
    sub:   'na voz · na marca · na hora',
    eyebrow: 'ETAPA 03',
    caption: 'O resultado fica consistente.',
    captionAccent: V2_OK,
    rangeStart: 2.5, rangeEnd: 3.95,
  },
];

function SceneV2Pipeline({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: V2_PAPER }}>
        <V2StatusBar />

        {/* Caption cycling */}
        {PIPELINE.map((step, i) => (
          <Sprite key={i} start={start + step.rangeStart} end={start + step.rangeEnd}>
            <V2Caption
              eyebrow={step.eyebrow}
              text={step.caption}
              y={170}
              size={84}
              leading={1.0}
              accent={step.captionAccent}
            />
          </Sprite>
        ))}

        {/* Pipeline cards — accumulate */}
        <Sprite start={start + 0.2} end={end - 0.05}>
          {({ localTime }) => {
            const cardTop = 720;
            const cardH = 200;
            const gap = 60;

            return PIPELINE.map((step, i) => {
              const delay = i * 1.2;
              const t = clamp((localTime - delay) / 0.5, 0, 1);
              const e = Easing.easeOutCubic(t);

              // Highlight current step
              const highlightStart = delay;
              const highlightEnd = delay + 1.3;
              const isCurrent = localTime >= highlightStart && localTime < highlightEnd;
              const isDone = localTime >= highlightEnd;

              return (
                <React.Fragment key={i}>
                  {/* Card */}
                  <div style={{
                    position: 'absolute',
                    left: 80, right: 80,
                    top: cardTop + i * (cardH + gap),
                    height: cardH - 12,
                    background: isCurrent ? V2_INK : '#FFFFFF',
                    color: isCurrent ? V2_PAPER : V2_INK,
                    border: isCurrent ? 'none' : `1px solid ${V2_RULE}`,
                    borderRadius: 32,
                    padding: '28px 32px',
                    opacity: e,
                    transform: `translateY(${(1 - e) * 30}px) scale(${0.95 + 0.05 * e})`,
                    transformOrigin: '50% 0',
                    boxShadow: isCurrent
                      ? '0 16px 40px rgba(24,24,24,0.18)'
                      : '0 6px 22px rgba(24,24,24,0.04)',
                    transition: 'background 240ms, color 240ms, box-shadow 240ms',
                    display: 'flex', flexDirection: 'column', gap: 12,
                  }}>
                    <div style={{
                      fontFamily: V2_MONO, fontSize: 20, fontWeight: 500,
                      color: isCurrent ? 'rgba(244,241,234,0.6)' : V2_MUTED,
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      {step.eyebrow}
                      {isDone && (
                        <span style={{
                          padding: '2px 10px', background: V2_OK_SOFT, color: V2_OK,
                          borderRadius: 999, fontSize: 16, letterSpacing: '0.08em',
                        }}>ATIVO</span>
                      )}
                    </div>
                    <div style={{
                      fontFamily: V2_SANS, fontSize: 44, fontWeight: 700,
                      letterSpacing: '-0.025em', lineHeight: 1.0,
                    }}>{step.label}</div>
                    <div style={{
                      fontFamily: V2_SANS, fontSize: 24,
                      color: isCurrent ? 'rgba(244,241,234,0.75)' : V2_INK_SOFT,
                      fontWeight: 500,
                    }}>{step.sub}</div>
                  </div>

                  {/* Arrow between cards */}
                  {i < PIPELINE.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: cardTop + (i + 1) * (cardH + gap) - gap - 8,
                      transform: `translateX(-50%)`,
                      opacity: clamp((localTime - delay - 0.5) / 0.4, 0, 1),
                      fontFamily: V2_MONO, fontSize: 40, fontWeight: 600,
                      color: V2_INK,
                    }}>↓</div>
                  )}
                </React.Fragment>
              );
            });
          }}
        </Sprite>
      </div>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 4 — GITHUB PROOF (10–13s)
// ─────────────────────────────────────────────────────────
const V2_TREE = [
  { name: 'starter/',     desc: 'creator-entry-skill',           delay: 0.0 },
  { name: 'suites/',      desc: 'workflows · rotinas',           delay: 0.2 },
  { name: 'docs/',        desc: 'como o sistema pensa',          delay: 0.4 },
  { name: 'validation/',  desc: 'testes de consistência',        delay: 0.6 },
  { name: 'README.md',    desc: 'comece por aqui',               delay: 0.8, file: true },
];

function SceneV2GitHub({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: V2_PAPER }}>
        <V2StatusBar />

        {/* Caption */}
        <Sprite start={start + 0.1} end={end - 0.05}>
          <V2Caption
            eyebrow="PROVA PÚBLICA"
            text={"Starter público\nno GitHub."}
            y={170}
            size={84}
            leading={0.98}
            accent={V2_OK}
          />
        </Sprite>

        {/* Browser/GitHub mockup */}
        <Sprite start={start + 0.25} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 60, right: 60, top: 600,
                background: '#FFFFFF',
                borderRadius: 32,
                border: `1px solid ${V2_RULE}`,
                overflow: 'hidden',
                opacity: t,
                transform: `translateY(${(1 - t) * 30}px)`,
                boxShadow: '0 16px 50px rgba(24,24,24,0.08)',
              }}>
                {/* Browser chrome */}
                <div style={{
                  height: 56, background: '#FAFAF6',
                  borderBottom: `1px solid ${V2_RULE}`,
                  display: 'flex', alignItems: 'center',
                  padding: '0 22px', gap: 14,
                }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ width: 13, height: 13, borderRadius: 7, background: '#E55F4A' }}/>
                    <span style={{ width: 13, height: 13, borderRadius: 7, background: '#E9B949' }}/>
                    <span style={{ width: 13, height: 13, borderRadius: 7, background: '#5CB85A' }}/>
                  </div>
                  <div style={{
                    flex: 1, marginLeft: 14, height: 36,
                    background: '#FFFFFF', border: `1px solid ${V2_RULE}`, borderRadius: 8,
                    display: 'flex', alignItems: 'center', padding: '0 14px',
                    fontFamily: V2_MONO, fontSize: 18, color: V2_INK_SOFT,
                  }}>
                    github.com/Aurelio-Hq/creator-operating-suite
                  </div>
                </div>

                {/* Repo header */}
                <div style={{ padding: '28px 32px 24px', borderBottom: `1px solid ${V2_RULE}` }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontFamily: V2_MONO, fontSize: 22, color: V2_INK,
                    flexWrap: 'wrap',
                  }}>
                    <span style={{ color: V2_MUTED }}>Aurelio-Hq /</span>
                    <span style={{ fontWeight: 600 }}>creator-operating-suite</span>
                    <span style={{
                      fontSize: 14, padding: '2px 12px',
                      border: `1px solid ${V2_RULE}`, borderRadius: 999,
                      color: V2_OK, textTransform: 'uppercase', letterSpacing: '0.1em',
                      fontWeight: 500,
                    }}>● Public</span>
                  </div>
                  <div style={{
                    marginTop: 14, display: 'flex', gap: 20, flexWrap: 'wrap',
                    fontFamily: V2_MONO, fontSize: 18, color: V2_MUTED,
                  }}>
                    <span>v0.1.0</span>
                    <span>·</span>
                    <span>MIT License</span>
                    <span>·</span>
                    <span>Public Starter</span>
                  </div>
                </div>

                {/* File tree */}
                <div style={{ padding: '8px 32px 24px' }}>
                  {V2_TREE.map((item, i) => {
                    const itemT = Easing.easeOutCubic(clamp((localTime - 0.6 - item.delay) / 0.35, 0, 1));
                    return (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center',
                        padding: '20px 8px',
                        borderBottom: i < V2_TREE.length - 1 ? `1px solid ${V2_RULE}` : 'none',
                        opacity: itemT,
                        transform: `translateX(${(1 - itemT) * 16}px)`,
                        gap: 18,
                      }}>
                        <span style={{
                          width: 28, color: item.file ? V2_MUTED : V2_ACCENT,
                          fontFamily: V2_MONO, fontSize: 22,
                        }}>{item.file ? '◇' : '▸'}</span>
                        <span style={{
                          fontFamily: V2_MONO, fontSize: 24, fontWeight: 600,
                          color: V2_INK, width: 280,
                        }}>{item.name}</span>
                        <span style={{
                          fontFamily: V2_SANS, fontSize: 20, color: V2_INK_SOFT,
                          fontWeight: 500,
                        }}>{item.desc}</span>
                      </div>
                    );
                  })}
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
// SCENE 5 — CTA (13–15s)
// ─────────────────────────────────────────────────────────
function SceneV2CTA({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: V2_INK }}>
        <V2StatusBar dark />

        {/* Eyebrow */}
        <Sprite start={start + 0.05} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.3, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 200, left: 56,
                fontFamily: V2_MONO, fontSize: 22, fontWeight: 500,
                color: 'rgba(244,241,234,0.6)',
                textTransform: 'uppercase', letterSpacing: '0.14em',
                opacity: t, transform: `translateY(${(1-t)*8}px)`,
              }}>
                ● SUA VEZ
              </div>
            );
          }}
        </Sprite>

        {/* Hero */}
        <Sprite start={start + 0.15} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 290, left: 56, right: 56,
                opacity: t, transform: `translateY(${(1-t)*16}px)`,
              }}>
                <div style={{
                  fontFamily: V2_SANS, fontSize: 28, fontWeight: 600,
                  color: V2_ACCENT, letterSpacing: '-0.005em', marginBottom: 20,
                }}>
                  Creator Operating Suite
                </div>
                <div style={{
                  fontFamily: V2_SANS, fontSize: 102, fontWeight: 700,
                  color: V2_PAPER, lineHeight: 0.95, letterSpacing: '-0.045em',
                }}>
                  Abra o<br/>
                  repositório.<br/>
                  <span style={{
                    background: V2_ACCENT, color: V2_PAPER,
                    padding: '0 16px',
                    display: 'inline-block', borderRadius: 14,
                  }}>Teste o</span>
                  <br/>
                  <span style={{
                    background: V2_ACCENT, color: V2_PAPER,
                    padding: '0 16px',
                    display: 'inline-block', borderRadius: 14,
                  }}>starter.</span>
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* CTA button */}
        <Sprite start={start + 0.7} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutBack(clamp(localTime / 0.5, 0, 1));
            const pulse = 1 + Math.sin(localTime * 4.5) * 0.014;
            return (
              <div style={{
                position: 'absolute', left: 56, right: 56, top: 1380,
                opacity: t, transform: `scale(${pulse * (0.95 + 0.05 * t)})`,
                transformOrigin: '50% 50%',
              }}>
                <div style={{
                  background: V2_PAPER, color: V2_INK,
                  borderRadius: 60,
                  padding: '34px 40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: V2_SANS, fontSize: 40, fontWeight: 700,
                  letterSpacing: '-0.015em',
                  boxShadow: '0 20px 60px rgba(200,85,61,0.3)',
                }}>
                  <span>Teste o starter público</span>
                  <div style={{
                    width: 72, height: 72, borderRadius: 36,
                    background: V2_ACCENT, color: V2_PAPER,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 36, fontWeight: 700,
                  }}>→</div>
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* URL bar at bottom */}
        <Sprite start={start + 0.5} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 56, right: 56, bottom: 130,
                paddingTop: 28,
                borderTop: '1px solid rgba(244,241,234,0.2)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                opacity: t, flexWrap: 'wrap', gap: 12,
              }}>
                <div style={{
                  fontFamily: V2_MONO, fontSize: 22, fontWeight: 500,
                  color: V2_PAPER, letterSpacing: '-0.005em',
                }}>
                  github.com/Aurelio-Hq/creator-operating-suite
                </div>
                <div style={{
                  fontFamily: V2_MONO, fontSize: 16,
                  color: 'rgba(244,241,234,0.5)', letterSpacing: '0.08em',
                }}>
                  v0.1.0 · MIT
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
// Time label for commenting
// ─────────────────────────────────────────────────────────
function AdV2TimeLabel() {
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
  V2StatusBar, V2Caption,
  SceneV2Hook, SceneV2Shift, SceneV2Pipeline, SceneV2GitHub, SceneV2CTA,
  AdV2TimeLabel,
});

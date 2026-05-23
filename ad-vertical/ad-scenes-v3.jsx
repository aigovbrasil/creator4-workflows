// ad-scenes-v3.jsx — neuro-retention 15s vertical ad v3
// 1080×1920. 6 scenes with kinetic typography, snap zoom, parallax.
// Loaded after animations.jsx.

const V3_PAPER = '#F4F1EA';
const V3_PAPER_WARM = '#F7F2E8';
const V3_PAPER_COOL = '#EEEDE6';
const V3_INK = '#171614';
const V3_INK_SOFT = '#3A3733';
const V3_MUTED = '#9A938A';
const V3_RULE = '#E3DDD0';
const V3_ACCENT = '#C8553D';
const V3_ACCENT_SOFT = '#F4D9C9';
const V3_OK = '#3F7A4A';
const V3_OK_SOFT = '#D6E5D2';

const V3_SANS = `"Inter", "SF Pro Display", system-ui, sans-serif`;
const V3_MONO = `"JetBrains Mono", ui-monospace, monospace`;

// ── Paper background with subtle noise ────────────────────
function PaperBg({ tone = 'warm', noise = true }) {
  const base = tone === 'cool' ? V3_PAPER_COOL : tone === 'warm' ? V3_PAPER_WARM : V3_PAPER;
  return (
    <div style={{ position: 'absolute', inset: 0, background: base, overflow: 'hidden' }}>
      {/* Soft radial wash */}
      <div style={{
        position: 'absolute', inset: -100,
        background: tone === 'cool'
          ? 'radial-gradient(ellipse at 30% 20%, rgba(200,85,61,0.06), transparent 60%)'
          : 'radial-gradient(ellipse at 70% 80%, rgba(200,85,61,0.08), transparent 55%)',
        pointerEvents: 'none',
      }}/>
      {noise && (
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
          <filter id="paperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paperNoise)" />
        </svg>
      )}
    </div>
  );
}

// ── Kinetic word stack (one word per line, sequenced) ─────
function KineticStack({ lines, x = 56, y = 200, size = 110, color = V3_INK, accent, accentLines = [], weight = 800, lineGap = 6, stagger = 0.08 }) {
  const { localTime, duration } = useSprite();
  const exitDur = 0.3;
  const exitStart = duration - exitDur;

  return (
    <div style={{ position: 'absolute', left: x, top: y, right: x }}>
      {lines.map((line, i) => {
        const delay = i * stagger;
        const t = Easing.easeOutCubic(clamp((localTime - delay) / 0.32, 0, 1));
        const exitT = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
        const opacity = t * (1 - exitT);
        const ty = (1 - t) * 36 + exitT * -18;
        const isAccent = accentLines.includes(i);
        return (
          <div key={i} style={{
            fontFamily: V3_SANS, fontSize: size, fontWeight: weight,
            color: isAccent ? (accent || V3_ACCENT) : color,
            lineHeight: 1.0 + lineGap / size,
            letterSpacing: '-0.045em',
            opacity, transform: `translateY(${ty}px)`,
            display: 'block',
          }}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

// ── Eyebrow pill (top) ─────────────────────────────────────
function EyebrowPill({ text, top = 130, color = V3_ACCENT, dotColor }) {
  const { localTime, duration } = useSprite();
  const t = Easing.easeOutCubic(clamp(localTime / 0.3, 0, 1));
  const exitT = Easing.easeInCubic(clamp((localTime - (duration - 0.3)) / 0.3, 0, 1));
  const opacity = t * (1 - exitT);
  return (
    <div style={{
      position: 'absolute', left: 56, top,
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '10px 20px', background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${V3_RULE}`,
      borderRadius: 999,
      fontFamily: V3_MONO, fontSize: 22, fontWeight: 600,
      color: V3_INK_SOFT, textTransform: 'uppercase', letterSpacing: '0.14em',
      opacity, transform: `translateY(${(1-t)*10}px)`,
    }}>
      <span style={{ width: 10, height: 10, borderRadius: 5, background: dotColor || color }}/>
      {text}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 1 — Pattern Interrupt (0–2s)
// Chaotic cards crash in, snap zoom, kinetic headline
// ─────────────────────────────────────────────────────────
const V3_CHAOS = [
  { text: 'old prompts',          x: 100, y: 880,  rot: -5, w: 380, delay: 0.0,  bg: '#FFF8E0' },
  { text: 'same context',         x: 540, y: 940,  rot: 4,  w: 460, delay: 0.06, bg: '#FFFFFF', highlight: true },
  { text: 'lost decisions',       x: 140, y: 1080, rot: -2, w: 440, delay: 0.12, bg: '#FFFFFF' },
  { text: 'inconsistent outputs', x: 580, y: 1130, rot: 3,  w: 460, delay: 0.18, bg: '#FFF8E0' },
  { text: 'rewrite again',        x: 90,  y: 1280, rot: 2,  w: 360, delay: 0.24, bg: '#FFFFFF' },
  { text: 'which chat was it?',   x: 520, y: 1320, rot: -3, w: 460, delay: 0.30, bg: '#FFF8E0' },
];

function SceneV3_Hook({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <PaperBg tone="warm" />

      {/* Eyebrow */}
      <Sprite start={start + 0.05} end={end - 0.05}>
        <EyebrowPill text="STOP" />
      </Sprite>

      {/* Kinetic headline */}
      <Sprite start={start + 0.0} end={end - 0.05}>
        <KineticStack
          lines={['Still', 're-explaining', 'everything?']}
          y={220}
          size={132}
          accentLines={[1, 2]}
          weight={800}
        />
      </Sprite>

      {/* Chaos cards with micro-shake */}
      <Sprite start={start + 0.4} end={end - 0.05}>
        {({ localTime, duration }) => {
          const exitT = clamp((localTime - (duration - 0.3)) / 0.3, 0, 1);
          const exitE = Easing.easeInCubic(exitT);
          return V3_CHAOS.map((b, i) => {
            const t = clamp((localTime - b.delay) / 0.25, 0, 1);
            const e = Easing.easeOutBack(t);
            const opacity = e * (1 - exitE);
            // micro shake
            const shake = Math.sin(localTime * 30 + i * 1.7) * 0.6;
            const ty = (1 - e) * 50 + exitE * 40 + shake;
            const tx = exitE * 40 * (i % 2 ? 1 : -1);
            const rot = b.rot + shake * 0.2;
            // snap zoom on "same context"
            const isSnapZoom = b.highlight && localTime > 0.5 && localTime < 1.2;
            const snapScale = isSnapZoom
              ? 1 + Math.sin(clamp((localTime - 0.5) / 0.7, 0, 1) * Math.PI) * 0.08
              : 1;
            return (
              <div key={i} style={{
                position: 'absolute', left: b.x, top: b.y,
                width: b.w, height: 130,
                background: b.bg,
                borderRadius: 22,
                border: b.highlight
                  ? `2px solid ${V3_ACCENT}`
                  : `1px solid ${V3_RULE}`,
                display: 'flex', alignItems: 'center', padding: '0 28px',
                fontFamily: V3_MONO, fontSize: 26, color: V3_INK_SOFT,
                fontWeight: 600,
                boxShadow: b.highlight
                  ? '0 12px 36px rgba(200,85,61,0.18)'
                  : '0 8px 24px rgba(24,24,24,0.07)',
                opacity,
                transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${snapScale})`,
                transformOrigin: '50% 50%',
                zIndex: b.highlight ? 5 : 1,
              }}>
                <span style={{ color: V3_MUTED, marginRight: 14, fontSize: 22 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {b.text}
              </div>
            );
          });
        }}
      </Sprite>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 2 — Specific Pain (2–4s)
// Mobile chat with duplicated briefing — looping repetition
// ─────────────────────────────────────────────────────────
function SceneV3_Pain({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <PaperBg tone="cool" />

      <Sprite start={start + 0.0} end={end - 0.05}>
        <EyebrowPill text="THE LOOP" color={V3_ACCENT} top={130} />
      </Sprite>

      {/* Kinetic split */}
      <Sprite start={start + 0.0} end={end - 0.05}>
        <KineticStack
          lines={['Same project.', 'Different', 'answers.']}
          y={220}
          size={108}
          accentLines={[1, 2]}
          stagger={0.18}
        />
      </Sprite>

      {/* Phone mock with repeated briefing bubbles */}
      <Sprite start={start + 0.4} end={end - 0.05}>
        {({ localTime }) => {
          const phoneAppear = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
          return (
            <div style={{
              position: 'absolute', left: 80, right: 80, top: 800,
              height: 1020,
              background: '#FFFFFF',
              border: `1px solid ${V3_RULE}`,
              borderRadius: 44,
              padding: '36px 28px',
              opacity: phoneAppear,
              transform: `translateY(${(1 - phoneAppear) * 40}px)`,
              boxShadow: '0 20px 60px rgba(24,24,24,0.08)',
              overflow: 'hidden',
            }}>
              {/* Phone header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                paddingBottom: 22, borderBottom: `1px solid ${V3_RULE}`,
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 25,
                  background: V3_INK, color: V3_PAPER,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: V3_SANS, fontSize: 22, fontWeight: 700,
                }}>★</div>
                <div>
                  <div style={{ fontFamily: V3_SANS, fontSize: 24, fontWeight: 700, color: V3_INK }}>
                    Assistant
                  </div>
                  <div style={{ fontFamily: V3_SANS, fontSize: 18, color: V3_MUTED, fontWeight: 500 }}>
                    new chat
                  </div>
                </div>
              </div>

              {/* Repeated user bubbles — same project, different briefings */}
              {[
                { delay: 0.5, text: '"Hi, I\'m working on a brand voice project. Tone is direct, dry…"' },
                { delay: 0.95, text: '"Reminder: brand voice project. The tone should be direct…"' },
                { delay: 1.4, text: '"Brand voice project. Direct. Dry. Same as yesterday."' },
              ].map((bubble, i) => {
                const t = Easing.easeOutCubic(clamp((localTime - bubble.delay) / 0.35, 0, 1));
                return (
                  <div key={i} style={{
                    marginTop: 22,
                    display: 'flex', justifyContent: 'flex-end',
                    opacity: t,
                    transform: `translateY(${(1 - t) * 12}px) scale(${0.94 + 0.06 * t})`,
                    transformOrigin: '100% 100%',
                  }}>
                    <div style={{
                      maxWidth: 720, padding: '20px 24px',
                      background: V3_INK, color: V3_PAPER,
                      borderRadius: 26,
                      borderBottomRightRadius: 6,
                      fontFamily: V3_SANS, fontSize: 24,
                      lineHeight: 1.3, fontWeight: 500, letterSpacing: '-0.005em',
                    }}>
                      {bubble.text}
                    </div>
                  </div>
                );
              })}

              {/* Duplicate / loop indicator */}
              <Sprite start={1.6} end={4.0}>
                {({ localTime: lt }) => {
                  const t = Easing.easeOutCubic(clamp(lt / 0.3, 0, 1));
                  return (
                    <div style={{
                      position: 'absolute', right: 30, bottom: 30,
                      padding: '12px 18px',
                      background: V3_ACCENT, color: V3_PAPER,
                      borderRadius: 999,
                      fontFamily: V3_MONO, fontSize: 18, fontWeight: 700,
                      letterSpacing: '0.08em',
                      opacity: t, transform: `scale(${0.9 + 0.1 * t})`,
                      boxShadow: '0 8px 24px rgba(200,85,61,0.3)',
                    }}>
                      × 3 THIS WEEK
                    </div>
                  );
                }}
              </Sprite>
            </div>
          );
        }}
      </Sprite>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 3 — The Shift (4–7s)
// Chaos snaps into clean pipeline stack
// ─────────────────────────────────────────────────────────
const V3_STACK = [
  { label: 'Context',    sub: 'who you are, every time' },
  { label: 'Workflows',  sub: 'repeatable routines' },
  { label: 'Skills',     sub: 'tools that already know you' },
  { label: 'Templates',  sub: 'shape, not just words' },
  { label: 'Decisions',  sub: 'choices that persist' },
];

function SceneV3_Shift({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <PaperBg tone="warm" />

      {/* Subtle glow behind stack */}
      <Sprite start={start + 0.5} end={end - 0.05}>
        {({ localTime }) => {
          const t = Easing.easeOutCubic(clamp(localTime / 0.8, 0, 1));
          return (
            <div style={{
              position: 'absolute', left: '50%', top: 1280,
              transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * t})`,
              width: 1000, height: 800,
              background: 'radial-gradient(ellipse, rgba(200,85,61,0.10), transparent 70%)',
              opacity: t,
              pointerEvents: 'none',
            }}/>
          );
        }}
      </Sprite>

      <Sprite start={start + 0.05} end={end - 0.05}>
        <EyebrowPill text="THE SHIFT" />
      </Sprite>

      <Sprite start={start + 0.0} end={end - 0.05}>
        <KineticStack
          lines={['Build a personal', 'AI work', 'system.']}
          y={220}
          size={104}
          accentLines={[2]}
          stagger={0.16}
        />
      </Sprite>

      {/* Stack appearing — slot-in motion */}
      <Sprite start={start + 0.6} end={end - 0.05}>
        {({ localTime }) => {
          const stackTop = 880;
          const rowH = 132;
          return V3_STACK.map((row, i) => {
            const delay = i * 0.16;
            const t = clamp((localTime - delay) / 0.4, 0, 1);
            const e = Easing.easeOutBack(t);
            return (
              <div key={i} style={{
                position: 'absolute',
                left: 80, right: 80,
                top: stackTop + i * rowH,
                height: 112,
                background: '#FFFFFF',
                border: `1px solid ${V3_RULE}`,
                borderLeft: `5px solid ${V3_INK}`,
                borderRadius: 22,
                display: 'flex', alignItems: 'center',
                padding: '0 32px', gap: 24,
                opacity: e,
                transform: `translateX(${(1 - e) * (i % 2 ? 60 : -60)}px) scale(${0.94 + 0.06 * e})`,
                boxShadow: '0 6px 22px rgba(24,24,24,0.05)',
              }}>
                <span style={{
                  fontFamily: V3_MONO, fontSize: 22, fontWeight: 600,
                  color: V3_MUTED, width: 44,
                }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: V3_SANS, fontSize: 38, fontWeight: 800,
                    color: V3_INK, lineHeight: 1.0, letterSpacing: '-0.025em',
                  }}>{row.label}</div>
                  <div style={{
                    marginTop: 6, fontFamily: V3_SANS, fontSize: 22,
                    color: V3_MUTED, fontWeight: 500,
                  }}>{row.sub}</div>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: 22,
                  background: e > 0.92 ? V3_OK : V3_RULE,
                  color: e > 0.92 ? '#FFFFFF' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700,
                  transition: 'background 200ms',
                }}>✓</div>
              </div>
            );
          });
        }}
      </Sprite>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 4 — Product in action (7–10s)
// Pipeline + progress bars + cycling captions
// ─────────────────────────────────────────────────────────
const V3_PIPELINE = [
  { label: 'Creator Entry Skill', sub: 'Claude opens already knowing you.',
    eyebrow: 'STEP 01', caption: 'Context loads.' },
  { label: 'PersonalizationOS',   sub: 'voice · decisions · routines',
    eyebrow: 'STEP 02', caption: 'Workflow starts.' },
  { label: 'Consistent Output',   sub: 'on-brand · on-voice · on-time',
    eyebrow: 'STEP 03', caption: 'Output gets consistent.' },
];

function SceneV3_Pipeline({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <PaperBg tone="warm" />

      <Sprite start={start + 0.05} end={end - 0.05}>
        <EyebrowPill text="IN ACTION" />
      </Sprite>

      {/* Caption cycling */}
      <Sprite start={start + 0.1} end={start + 1.2}>
        <KineticStack lines={['Context.']} y={220} size={132} accentLines={[0]} stagger={0} />
      </Sprite>
      <Sprite start={start + 1.2} end={start + 2.2}>
        <KineticStack lines={['Workflows.']} y={220} size={132} accentLines={[0]} stagger={0} />
      </Sprite>
      <Sprite start={start + 2.2} end={start + 3.0 - 0.05}>
        <KineticStack lines={['Skills.', 'Templates.']} y={220} size={108} accentLines={[0, 1]} stagger={0.12} />
      </Sprite>

      {/* Pipeline cards */}
      <Sprite start={start + 0.2} end={end - 0.05}>
        {({ localTime }) => {
          const cardTop = 740;
          const cardH = 220;
          const gap = 60;

          return V3_PIPELINE.map((step, i) => {
            const delay = i * 0.85;
            const t = clamp((localTime - delay) / 0.45, 0, 1);
            const e = Easing.easeOutCubic(t);

            const highlightStart = delay;
            const highlightEnd = delay + 0.95;
            const isCurrent = localTime >= highlightStart && localTime < highlightEnd;
            const isDone = localTime >= highlightEnd;

            // progress bar fills over 0.8s
            const progress = clamp((localTime - delay - 0.1) / 0.7, 0, 1);

            return (
              <div key={i} style={{
                position: 'absolute',
                left: 80, right: 80,
                top: cardTop + i * (cardH + gap),
                background: isCurrent ? V3_INK : '#FFFFFF',
                color: isCurrent ? V3_PAPER : V3_INK,
                border: isCurrent ? 'none' : `1px solid ${V3_RULE}`,
                borderRadius: 32,
                padding: '24px 28px',
                opacity: e,
                transform: `translateY(${(1 - e) * 30}px) scale(${0.95 + 0.05 * e})`,
                boxShadow: isCurrent
                  ? '0 16px 40px rgba(24,24,24,0.18)'
                  : '0 6px 22px rgba(24,24,24,0.04)',
                transition: 'background 200ms, color 200ms, box-shadow 200ms',
              }}>
                <div style={{
                  fontFamily: V3_MONO, fontSize: 18, fontWeight: 600,
                  color: isCurrent ? 'rgba(244,241,234,0.65)' : V3_MUTED,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  {step.eyebrow}
                  {isDone && (
                    <span style={{
                      padding: '2px 10px', background: V3_OK_SOFT, color: V3_OK,
                      borderRadius: 999, fontSize: 14, letterSpacing: '0.08em',
                    }}>● DONE</span>
                  )}
                  {isCurrent && (
                    <span style={{
                      padding: '2px 10px', background: V3_ACCENT, color: V3_PAPER,
                      borderRadius: 999, fontSize: 14, letterSpacing: '0.08em',
                    }}>● RUNNING</span>
                  )}
                </div>
                <div style={{
                  marginTop: 10, fontFamily: V3_SANS, fontSize: 42, fontWeight: 800,
                  letterSpacing: '-0.025em', lineHeight: 1.0,
                }}>{step.label}</div>
                <div style={{
                  marginTop: 6, fontFamily: V3_SANS, fontSize: 22,
                  color: isCurrent ? 'rgba(244,241,234,0.75)' : V3_INK_SOFT,
                  fontWeight: 500,
                }}>{step.sub}</div>

                {/* Progress bar */}
                <div style={{
                  marginTop: 18, height: 6, borderRadius: 3,
                  background: isCurrent ? 'rgba(244,241,234,0.18)' : V3_RULE,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${progress * 100}%`, height: '100%',
                    background: isDone ? V3_OK : V3_ACCENT,
                    borderRadius: 3,
                  }}/>
                </div>
              </div>
            );
          });
        }}
      </Sprite>
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 5 — Public Proof (10–13s)
// GitHub repo zoom-in
// ─────────────────────────────────────────────────────────
const V3_TREE = [
  { name: 'starter/',     desc: 'creator-entry-skill',         delay: 0.0 },
  { name: 'suites/',      desc: 'workflows · routines',        delay: 0.18 },
  { name: 'docs/',        desc: 'how the system thinks',       delay: 0.36 },
  { name: 'validation/',  desc: 'tests for consistency',       delay: 0.54 },
  { name: 'README.md',    desc: 'start here',                  delay: 0.72, file: true },
];

function SceneV3_GitHub({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <PaperBg tone="warm" />

      <Sprite start={start + 0.05} end={end - 0.05}>
        <EyebrowPill text="PUBLIC PROOF" color={V3_OK} dotColor={V3_OK} />
      </Sprite>

      <Sprite start={start + 0.0} end={end - 0.05}>
        <KineticStack
          lines={['Public starter', 'on GitHub.']}
          y={220}
          size={104}
          accentLines={[1]}
          accent={V3_OK}
          stagger={0.14}
        />
      </Sprite>

      {/* GitHub mockup with zoom-in motion */}
      <Sprite start={start + 0.3} end={end - 0.05}>
        {({ localTime, duration }) => {
          const appear = Easing.easeOutCubic(clamp(localTime / 0.45, 0, 1));
          // continuous slow zoom across the scene
          const slowZoom = 1 + clamp(localTime / duration, 0, 1) * 0.04;
          return (
            <div style={{
              position: 'absolute', left: 60, right: 60, top: 620,
              background: '#FFFFFF',
              borderRadius: 32,
              border: `1px solid ${V3_RULE}`,
              overflow: 'hidden',
              opacity: appear,
              transform: `translateY(${(1 - appear) * 36}px) scale(${slowZoom})`,
              transformOrigin: '50% 0',
              boxShadow: '0 18px 50px rgba(24,24,24,0.10)',
            }}>
              {/* Browser chrome */}
              <div style={{
                height: 56, background: '#FAFAF6',
                borderBottom: `1px solid ${V3_RULE}`,
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
                  background: '#FFFFFF', border: `1px solid ${V3_RULE}`, borderRadius: 8,
                  display: 'flex', alignItems: 'center', padding: '0 14px',
                  fontFamily: V3_MONO, fontSize: 18, color: V3_INK_SOFT,
                }}>
                  github.com/Aurelio-Hq/creator-operating-suite
                </div>
              </div>

              {/* Repo header */}
              <div style={{ padding: '28px 32px 22px', borderBottom: `1px solid ${V3_RULE}` }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontFamily: V3_MONO, fontSize: 24, color: V3_INK,
                  flexWrap: 'wrap',
                }}>
                  <span style={{ color: V3_MUTED }}>Aurelio-Hq /</span>
                  <span style={{ fontWeight: 700 }}>creator-operating-suite</span>
                  <span style={{
                    fontSize: 14, padding: '3px 12px',
                    border: `1px solid ${V3_OK}`, borderRadius: 999,
                    color: V3_OK, textTransform: 'uppercase', letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}>● PUBLIC</span>
                </div>
                <div style={{
                  marginTop: 14, display: 'flex', gap: 16, flexWrap: 'wrap',
                  fontFamily: V3_MONO, fontSize: 18, color: V3_INK_SOFT,
                }}>
                  <span style={{
                    padding: '4px 12px', background: V3_ACCENT_SOFT, color: V3_ACCENT,
                    borderRadius: 8, fontWeight: 700,
                  }}>v0.1.0</span>
                  <span style={{ alignSelf: 'center', color: V3_MUTED }}>·</span>
                  <span style={{ alignSelf: 'center', color: V3_MUTED }}>MIT License</span>
                  <span style={{ alignSelf: 'center', color: V3_MUTED }}>·</span>
                  <span style={{ alignSelf: 'center', color: V3_MUTED }}>Public Starter</span>
                </div>
              </div>

              {/* File tree */}
              <div style={{ padding: '8px 32px 24px' }}>
                {V3_TREE.map((item, i) => {
                  const itemT = Easing.easeOutCubic(clamp((localTime - 0.55 - item.delay) / 0.3, 0, 1));
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center',
                      padding: '18px 8px',
                      borderBottom: i < V3_TREE.length - 1 ? `1px solid ${V3_RULE}` : 'none',
                      opacity: itemT,
                      transform: `translateX(${(1 - itemT) * 16}px)`,
                      gap: 18,
                    }}>
                      <span style={{
                        width: 28, color: item.file ? V3_MUTED : V3_ACCENT,
                        fontFamily: V3_MONO, fontSize: 22,
                      }}>{item.file ? '◇' : '▸'}</span>
                      <span style={{
                        fontFamily: V3_MONO, fontSize: 22, fontWeight: 700,
                        color: V3_INK, width: 240,
                      }}>{item.name}</span>
                      <span style={{
                        fontFamily: V3_SANS, fontSize: 20, color: V3_INK_SOFT,
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
    </Sprite>
  );
}

// ─────────────────────────────────────────────────────────
// SCENE 6 — CTA Final (13–15s)
// Static premium final card, held > 1s
// ─────────────────────────────────────────────────────────
function SceneV3_CTA({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: V3_INK, overflow: 'hidden' }}>
        {/* Subtle radial accent */}
        <div style={{
          position: 'absolute', inset: -100,
          background: 'radial-gradient(ellipse at 80% 90%, rgba(200,85,61,0.22), transparent 60%)',
          pointerEvents: 'none',
        }}/>

        {/* Brand line */}
        <Sprite start={start + 0.05} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.3, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 220, left: 56,
                display: 'inline-flex', alignItems: 'center', gap: 14,
                fontFamily: V3_MONO, fontSize: 22, fontWeight: 600,
                color: V3_ACCENT, letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: t, transform: `translateY(${(1-t)*8}px)`,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: V3_ACCENT }}/>
                CREATOR OPERATING SUITE
              </div>
            );
          }}
        </Sprite>

        {/* Hero kinetic */}
        <Sprite start={start + 0.1} end={end - 0.05}>
          {({ localTime }) => {
            const lines = [
              { text: 'Try the', delay: 0.0, accent: false },
              { text: 'public', delay: 0.12, accent: true },
              { text: 'starter.', delay: 0.24, accent: true },
            ];
            return (
              <div style={{ position: 'absolute', top: 320, left: 56, right: 56 }}>
                {lines.map((l, i) => {
                  const t = Easing.easeOutCubic(clamp((localTime - l.delay) / 0.35, 0, 1));
                  return (
                    <div key={i} style={{
                      fontFamily: V3_SANS, fontSize: 148, fontWeight: 800,
                      lineHeight: 0.95, letterSpacing: '-0.05em',
                      color: l.accent ? V3_ACCENT : V3_PAPER,
                      opacity: t, transform: `translateY(${(1 - t) * 28}px)`,
                    }}>
                      {l.text}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Sprite>

        {/* Subline */}
        <Sprite start={start + 0.6} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            return (
              <div style={{
                position: 'absolute', top: 990, left: 56, right: 56,
                fontFamily: V3_SANS, fontSize: 34, fontWeight: 500,
                color: 'rgba(244,241,234,0.75)',
                lineHeight: 1.25, letterSpacing: '-0.01em',
                opacity: t, transform: `translateY(${(1 - t) * 14}px)`,
              }}>
                Workflows, skills and templates<br/>
                for non-technical creators.
              </div>
            );
          }}
        </Sprite>

        {/* CTA button */}
        <Sprite start={start + 0.8} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutBack(clamp(localTime / 0.45, 0, 1));
            const pulse = 1 + Math.sin(localTime * 4.5) * 0.014;
            return (
              <div style={{
                position: 'absolute', left: 56, right: 56, top: 1280,
                opacity: t, transform: `scale(${pulse * (0.95 + 0.05 * t)})`,
                transformOrigin: '50% 50%',
              }}>
                <div style={{
                  background: V3_PAPER, color: V3_INK,
                  borderRadius: 60,
                  padding: '34px 40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: V3_SANS, fontSize: 42, fontWeight: 800,
                  letterSpacing: '-0.02em',
                  boxShadow: '0 24px 64px rgba(200,85,61,0.35)',
                }}>
                  <span>Open the repo</span>
                  <div style={{
                    width: 76, height: 76, borderRadius: 38,
                    background: V3_ACCENT, color: V3_PAPER,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 38, fontWeight: 800,
                  }}>→</div>
                </div>
              </div>
            );
          }}
        </Sprite>

        {/* URL footer */}
        <Sprite start={start + 0.5} end={end - 0.05}>
          {({ localTime }) => {
            const t = Easing.easeOutCubic(clamp(localTime / 0.4, 0, 1));
            return (
              <div style={{
                position: 'absolute', left: 56, right: 56, bottom: 130,
                paddingTop: 28,
                borderTop: '1px solid rgba(244,241,234,0.18)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                opacity: t, flexWrap: 'wrap', gap: 12,
              }}>
                <div style={{
                  fontFamily: V3_MONO, fontSize: 22, fontWeight: 600,
                  color: V3_PAPER, letterSpacing: '-0.005em',
                }}>
                  github.com/Aurelio-Hq/creator-operating-suite
                </div>
                <div style={{
                  fontFamily: V3_MONO, fontSize: 16,
                  color: 'rgba(244,241,234,0.55)', letterSpacing: '0.08em',
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

// ── Time label
function V3TimeLabel() {
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
  PaperBg, KineticStack, EyebrowPill,
  SceneV3_Hook, SceneV3_Pain, SceneV3_Shift, SceneV3_Pipeline, SceneV3_GitHub, SceneV3_CTA,
  V3TimeLabel,
});

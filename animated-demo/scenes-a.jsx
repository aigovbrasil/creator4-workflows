// scenes-a.jsx — primitives + Scenes 1, 2, 3
// Loaded after animations.jsx. Exposes globals to window.

const PAPER = '#F6F4EF';
const INK = '#1A1A1A';
const INK_SOFT = '#3A3A3A';
const MUTED = '#8A8378';
const RULE = '#D9D4C7';
const ACCENT = '#C8553D';
const ACCENT_SOFT = '#E8D8C4';
const OK = '#3F7A4A';

const DISPLAY = `"Source Serif Pro", "Tiempos Headline", Georgia, serif`;
const BODY = `"Inter", system-ui, sans-serif`;
const MONO = `"JetBrains Mono", ui-monospace, monospace`;

// ── Eyebrow with rule ───────────────────────────────────────
function Eyebrow({ text, x, y, color = MUTED, ruleColor = INK, ruleWidth = 200 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      display: 'flex', alignItems: 'center', gap: 16,
      fontFamily: MONO, fontSize: 18, fontWeight: 500,
      color, textTransform: 'uppercase', letterSpacing: '0.12em',
    }}>
      <span>{text}</span>
      <span style={{ width: ruleWidth, height: 1, background: ruleColor }} />
    </div>
  );
}

// ── Lower-third caption (bottom-left) ───────────────────────
function Caption({ lines = [], inverted = false }) {
  const { localTime, duration } = useSprite();
  const exitDur = 0.3, entryDur = 0.25;
  const exitStart = duration - exitDur;
  let opacity = 1;
  if (localTime < entryDur) opacity = localTime / entryDur;
  else if (localTime > exitStart) opacity = 1 - (localTime - exitStart) / exitDur;
  opacity = Math.max(0, Math.min(1, opacity));

  return (
    <div style={{
      position: 'absolute', left: 80, bottom: 80,
      fontFamily: BODY, fontSize: 36, fontWeight: 500,
      color: inverted ? PAPER : INK, lineHeight: 1.2,
      letterSpacing: '-0.005em', opacity,
      maxWidth: 900,
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ marginTop: i > 0 ? 4 : 0 }}>{line}</div>
      ))}
    </div>
  );
}

// ── Big centered hero text ──────────────────────────────────
function HeroText({ text, size = 96, x = 960, y = 540, color = INK, weight = 500, font = DISPLAY, italic = false }) {
  const { localTime, duration } = useSprite();
  const entryDur = 0.5, exitDur = 0.4;
  const exitStart = duration - exitDur;
  let opacity = 1, ty = 0;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(localTime / entryDur);
    opacity = t; ty = (1 - t) * 24;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic((localTime - exitStart) / exitDur);
    opacity = 1 - t; ty = -t * 16;
  }
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%, -50%) translateY(${ty}px)`,
      fontFamily: font, fontSize: size, fontWeight: weight,
      fontStyle: italic ? 'italic' : 'normal',
      color, letterSpacing: '-0.015em', lineHeight: 1.05,
      opacity, textAlign: 'center', whiteSpace: 'pre-line',
      maxWidth: 1500,
    }}>
      {text}
    </div>
  );
}

// ── Highlighted (accent-soft) span used inline in HeroText markup ──
// We use a helper: render via JSX children instead.
function Highlight({ children }) {
  return <span style={{ background: ACCENT_SOFT, padding: '0 0.15em' }}>{children}</span>;
}

// ── Scattered note card (Scene 1) ───────────────────────────
function NoteCard({ x, y, rotate = 0, w = 280, h = 180, color = '#fff', delay = 0, children }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp((localTime - delay) / 0.6, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: w, height: h,
      background: color,
      transform: `rotate(${rotate}deg) translateY(${(1 - t) * 30}px)`,
      transformOrigin: 'center',
      opacity: t,
      boxShadow: '0 4px 20px rgba(26,26,26,0.08), 0 1px 3px rgba(26,26,26,0.06)',
      padding: 20,
      fontFamily: MONO, fontSize: 13, color: INK_SOFT, lineHeight: 1.5,
    }}>
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 1 — Problem (0–10s)
// ──────────────────────────────────────────────────────────────
function SceneProblem({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        {/* Eyebrow */}
        <Sprite start={start + 0.2} end={start + 9.8}>
          {() => <div><Eyebrow text="01 · The everyday" x={80} y={80} /></div>}
        </Sprite>

        {/* Scattered notes — creator's chaotic desk */}
        <Sprite start={start + 0.4} end={end - 0.3}>
          <NoteCard x={140} y={200} rotate={-3} delay={0} color="#FFF8E0">
            <div style={{ color: MUTED, marginBottom: 8 }}>// prompt v3</div>
            "Act as a senior brand<br/>strategist. The brand<br/>voice is..."
          </NoteCard>
          <NoteCard x={460} y={260} rotate={2} delay={0.15} w={300} h={160} color="#FFFFFF">
            <div style={{ color: MUTED, marginBottom: 8 }}>notion / context.md</div>
            client: ACME<br/>tone: direct, dry<br/>last revised: ???
          </NoteCard>
          <NoteCard x={820} y={180} rotate={-1.5} delay={0.3} w={320} h={200} color="#E8F0E8">
            <div style={{ color: MUTED, marginBottom: 8 }}>// chat #47</div>
            "Quick reminder before<br/>we start: I'm working<br/>on the same project<br/>as yesterday..."
          </NoteCard>
          <NoteCard x={1200} y={320} rotate={3} delay={0.45} w={260} h={140} color="#FFFFFF">
            <div style={{ color: MUTED, marginBottom: 8 }}>screenshot.png</div>
            ▢ ▢ ▢<br/>(decisions from<br/>last week?)
          </NoteCard>
          <NoteCard x={300} y={560} rotate={1} delay={0.6} w={280} h={150} color="#FFF8E0">
            <div style={{ color: MUTED, marginBottom: 8 }}>// prompt v7 final FINAL</div>
            "ok one more try.<br/>this time really. Act<br/>as a senior..."
          </NoteCard>
          <NoteCard x={680} y={580} rotate={-2} delay={0.75} w={320} h={170} color="#FFFFFF">
            <div style={{ color: MUTED, marginBottom: 8 }}>doc / brief.draft</div>
            we need the voice<br/>to feel like the one<br/>from march. find it.
          </NoteCard>
          <NoteCard x={1080} y={580} rotate={2.5} delay={0.9} w={300} h={160} color="#E8F0E8">
            <div style={{ color: MUTED, marginBottom: 8 }}>// new chat</div>
            "Hi! Let me explain<br/>what I'm working on.<br/>I'm a content..."
          </NoteCard>
        </Sprite>

        {/* Captions */}
        <Sprite start={start + 1.4} end={start + 5.2}>
          <Caption lines={["Creators use AI every day."]} />
        </Sprite>
        <Sprite start={start + 5.5} end={end - 0.2}>
          <Caption lines={["Yet they keep repeating context."]} />
        </Sprite>
      </div>
    </Sprite>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 2 — Pain (10–20s)
// ──────────────────────────────────────────────────────────────
function PainFrame({ label, content, x, y, accent }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 380, height: 240,
      background: '#FFFFFF',
      border: `1px solid ${RULE}`,
      padding: 24,
      fontFamily: BODY,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 13, fontWeight: 500,
        color: accent || MUTED, textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: 16,
      }}>{label}</div>
      <div style={{ fontFamily: DISPLAY, fontSize: 22, color: INK, lineHeight: 1.3 }}>
        {content}
      </div>
    </div>
  );
}

function SceneePain({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => <div><Eyebrow text="02 · The cost" x={80} y={80} /></div>}
        </Sprite>

        {/* Four frames showing same project, divergent outputs */}
        <Sprite start={start + 0.6} end={end - 0.3}>
          {({ localTime }) => {
            const ease = Easing.easeOutCubic;
            const f1 = clamp(localTime / 0.5, 0, 1);
            const f2 = clamp((localTime - 1.0) / 0.5, 0, 1);
            const f3 = clamp((localTime - 2.0) / 0.5, 0, 1);
            const f4 = clamp((localTime - 3.0) / 0.5, 0, 1);
            return (
              <React.Fragment>
                <div style={{ opacity: ease(f1), transform: `translateY(${(1-ease(f1))*20}px)` }}>
                  <PainFrame label="Monday · Output A" content="Bold, punchy headlines with em-dashes — energetic." x={180} y={220} accent={MUTED} />
                </div>
                <div style={{ opacity: ease(f2), transform: `translateY(${(1-ease(f2))*20}px)` }}>
                  <PainFrame label="Tuesday · Output B" content="Cautious, hedged copy. Lots of 'might' and 'could'." x={640} y={220} accent={MUTED} />
                </div>
                <div style={{ opacity: ease(f3), transform: `translateY(${(1-ease(f3))*20}px)` }}>
                  <PainFrame label="Wednesday · Output C" content="Formal corporate tone. Buzzwords." x={1100} y={220} accent={MUTED} />
                </div>
                <div style={{ opacity: ease(f4), transform: `translateY(${(1-ease(f4))*20}px)` }}>
                  <PainFrame label="Thursday · Output D" content="Casual, almost slang. Different person." x={870} y={520} accent={ACCENT} />
                </div>
              </React.Fragment>
            );
          }}
        </Sprite>

        {/* Captions cycling */}
        <Sprite start={start + 1.0} end={start + 3.2}>
          <Caption lines={["Same project."]} />
        </Sprite>
        <Sprite start={start + 3.3} end={start + 5.5}>
          <Caption lines={["Different answers."]} />
        </Sprite>
        <Sprite start={start + 5.6} end={start + 7.6}>
          <Caption lines={["Lost decisions."]} />
        </Sprite>
        <Sprite start={start + 7.7} end={end - 0.2}>
          <Caption lines={["Inconsistent outputs."]} />
        </Sprite>
      </div>
    </Sprite>
  );
}

// ──────────────────────────────────────────────────────────────
// SCENE 3 — Thesis (20–30s)
// Messy blocks animate into clean stack
// ──────────────────────────────────────────────────────────────
function SceneThesis({ start, end }) {
  const dur = end - start;
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', inset: 0, background: PAPER }}>
        <Sprite start={start + 0.2} end={end - 0.2}>
          {() => <div><Eyebrow text="03 · The shift" x={80} y={80} /></div>}
        </Sprite>

        {/* 6 blocks: start scattered, animate into clean stack on the left */}
        <Sprite start={start + 0.3} end={end - 0.2}>
          {({ localTime }) => {
            // Phase: scattered until 2.0, then converge by 4.0
            const t = clamp((localTime - 1.2) / 2.0, 0, 1);
            const e = Easing.easeInOutCubic(t);

            const blocks = [
              { sx: 180, sy: 280, sr: -4, ex: 200, ey: 220, label: 'context'    },
              { sx: 420, sy: 520, sr:  3, ex: 200, ey: 295, label: 'workflows'  },
              { sx: 700, sy: 200, sr: -2, ex: 200, ey: 370, label: 'decisions'  },
              { sx: 900, sy: 600, sr:  4, ex: 200, ey: 445, label: 'templates'  },
              { sx: 1300, sy: 320, sr: -3, ex: 200, ey: 520, label: 'skills'    },
              { sx: 1500, sy: 540, sr:  2, ex: 200, ey: 595, label: 'outputs'   },
            ];

            return blocks.map((b, i) => {
              const x = b.sx + (b.ex - b.sx) * e;
              const y = b.sy + (b.ey - b.sy) * e;
              const r = b.sr * (1 - e);
              const isStack = e > 0.9;
              return (
                <div key={i} style={{
                  position: 'absolute', left: x, top: y,
                  width: 320, height: 60,
                  background: isStack ? '#FFFFFF' : '#FFFFFF',
                  border: `1px solid ${isStack ? INK : RULE}`,
                  transform: `rotate(${r}deg)`,
                  display: 'flex', alignItems: 'center',
                  padding: '0 24px',
                  fontFamily: MONO, fontSize: 16, color: INK,
                  boxShadow: isStack ? 'none' : '0 4px 16px rgba(0,0,0,0.06)',
                  transition: 'border 200ms, box-shadow 200ms',
                }}>
                  <span style={{ color: MUTED, marginRight: 12 }}>0{i+1}</span>
                  {b.label}
                </div>
              );
            });
          }}
        </Sprite>

        {/* Big headline appearing on the right after convergence */}
        <Sprite start={start + 3.8} end={end - 0.2}>
          <div style={{ position: 'absolute', left: 700, top: 280, maxWidth: 1080 }}>
            <div style={{ fontFamily: MONO, fontSize: 16, color: MUTED, letterSpacing: '0.08em', marginBottom: 24 }}>
              ─── CREATOR OPERATING SUITE
            </div>
            <div style={{
              fontFamily: DISPLAY, fontSize: 84, fontWeight: 500,
              color: INK, lineHeight: 1.05, letterSpacing: '-0.015em',
            }}>
              From chat<br/>to <span style={{ background: ACCENT_SOFT, padding: '0 0.1em' }}>work system</span>.
            </div>
            <div style={{
              marginTop: 32, fontFamily: DISPLAY, fontStyle: 'italic',
              fontSize: 28, color: INK_SOFT, lineHeight: 1.35, maxWidth: 760,
            }}>
              Workflows, skills, templates and decision systems for non-technical creators.
            </div>
          </div>
        </Sprite>
      </div>
    </Sprite>
  );
}

// Expose to window for next file + index.html
Object.assign(window, {
  PAPER, INK, INK_SOFT, MUTED, RULE, ACCENT, ACCENT_SOFT, OK,
  DISPLAY, BODY, MONO,
  Eyebrow, Caption, HeroText, Highlight, NoteCard,
  SceneProblem, SceneePain, SceneThesis,
});

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'

/* ── Letter-by-letter reveal hook ── */
function useRevealText(text: string, speed = 80): { display: string; done: boolean } {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    let current = 0
    const id = setInterval(() => {
      current++
      if (current >= text.length) {
        clearInterval(id)
        setCount(text.length)
      } else {
        setCount(current)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  const done = count >= text.length
  // Show blinking cursor '|' while still revealing
  const display = done ? text : text.slice(0, count) + '|'
  return { display, done }
}

/* ── Typing subtitle hook ── */
function useTypingText(text: string, delay: number, speed = 40): string {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let idx = 0
    let intervalId: ReturnType<typeof setInterval>
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        idx++
        setShown(text.slice(0, idx))
        if (idx >= text.length) clearInterval(intervalId)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(startId)
      if (intervalId!) clearInterval(intervalId)
    }
  }, [text, delay, speed])

  return shown
}

/* ── Floating cipher characters background ── */
interface FloatingChar {
  char: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function useFloatingChars(count: number): FloatingChar[] {
  const [chars] = useState<FloatingChar[]>(() => {
    const pool = '01ABCDEF∑∏∂ΔΩλμ⊕⊗∞░▒▓╬╫§¶'
    return Array.from({ length: count }, () => ({
      char: pool[Math.floor(Math.random() * pool.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 16,
      duration: 8 + Math.random() * 16,
      delay: Math.random() * -20,
      opacity: 0.03 + Math.random() * 0.06,
    }))
  })
  return chars
}

/* ── Corner bracket decoration ── */
function CornerBrackets() {
  const s: React.CSSProperties = {
    position: 'absolute',
    width: 'clamp(30px, 5vw, 60px)',
    height: 'clamp(30px, 5vw, 60px)',
    pointerEvents: 'none',
  }
  const line: React.CSSProperties = {
    position: 'absolute',
    background: 'rgba(0,240,255,0.25)',
  }
  const corner = (top: boolean, left: boolean): React.CSSProperties => ({
    ...s,
    top: top ? 'clamp(16px, 3vw, 36px)' : undefined,
    bottom: top ? undefined : 'clamp(16px, 3vw, 36px)',
    left: left ? 'clamp(16px, 3vw, 36px)' : undefined,
    right: left ? undefined : 'clamp(16px, 3vw, 36px)',
  })

  return (
    <>
      {[
        [true, true],
        [true, false],
        [false, true],
        [false, false],
      ].map(([t, l], i) => (
        <div key={i} style={corner(t as boolean, l as boolean)}>
          <span
            style={{
              ...line,
              width: '100%',
              height: '1px',
              top: t ? 0 : undefined,
              bottom: t ? undefined : 0,
            }}
          />
          <span
            style={{
              ...line,
              width: '1px',
              height: '100%',
              left: l ? 0 : undefined,
              right: l ? undefined : 0,
            }}
          />
        </div>
      ))}
    </>
  )
}

/* ── Scan line animation (CSS injected once) ── */
const STYLE_ID = '__intro-overlay-styles'
const TITLES = [
  'Cryptographic Atlas',
  'クリプトグラフィックアトラス',
  'Atlas Cryptographique',
  'Криптографический Атлас',
  'أطلس التشفير',
  '密码图谱',
  'Kriptografik Atlas',
]

const CSS = `
@keyframes _introScanBorder {
  0%   { background-position: 0% 0%; }
  100% { background-position: 300% 0%; }
}
@keyframes _introFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-18px); }
}
@keyframes _introPulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
@keyframes _introGlowLine {
  0%   { transform: scaleX(0); opacity: 0; }
  50%  { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(0); opacity: 0; }
}
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = CSS
  document.head.appendChild(el)
}

/* ── Main Overlay ── */
interface IntroOverlayProps {
  onEnter: () => void
}

export function IntroOverlay({ onEnter }: IntroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hintRef = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)

  const [titleIdx, setTitleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTitleIdx((i) => (i + 1) % TITLES.length), 3500)
    return () => clearInterval(id)
  }, [])

  const { display: titleText, done: titleDone } = useRevealText(TITLES[titleIdx])
  const subtitle = useTypingText('Explore Ciphers  ·  Standards  ·  Attack Models', titleDone ? 0 : 9999, 20)
  const floatingChars = useFloatingChars(22)

  useEffect(injectStyles, [])

  /* entrance animations */
  useEffect(() => {
    if (!titleDone) return
    const tl = gsap.timeline()
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 16, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)', onComplete: () => setReady(true) },
    ).fromTo(
      hintRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.6, ease: 'power2.out' },
      '-=0.25',
    )
    return () => { tl.kill() }
  }, [titleDone])

  /* exit animation */
  const handleEnter = useCallback(() => {
    if (!ready) return
    const tl = gsap.timeline({ onComplete: onEnter })
    tl.to(hintRef.current, { opacity: 0, duration: 0.2 })
      .to(buttonRef.current, { opacity: 0, scale: 0.85, y: 10, duration: 0.3, ease: 'power2.in' }, '-=0.1')
      .to(contentRef.current, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' }, '-=0.15')
      .to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.2')
  }, [ready, onEnter])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && ready) handleEnter()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [ready, handleEnter])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* floating cipher characters */}
      {floatingChars.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: `${c.y}%`,
            fontSize: `${c.size}px`,
            fontFamily: 'var(--font-mono)',
            color: 'rgba(0,240,255,1)',
            opacity: c.opacity,
            animation: `_introFloat ${c.duration}s ease-in-out ${c.delay}s infinite`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {c.char}
        </span>
      ))}

      {/* corner brackets */}
      <CornerBrackets />

      {/* top status bar */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 3vw, 44px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1vw, 0.7rem)',
          letterSpacing: '0.12em',
          color: 'var(--accent-green, #00ff9f)',
          textTransform: 'uppercase',
          opacity: titleDone ? 0.7 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent-green, #00ff9f)',
            boxShadow: '0 0 8px var(--accent-green, #00ff9f)',
            display: 'inline-block',
            animation: '_introPulse 1.6s ease-in-out infinite',
          }}
        />
        System Initialized
      </div>

      {/* center content group */}
      <div
        ref={contentRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* decorative line above title */}
        <div
          style={{
            width: 'clamp(60px, 18vw, 180px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent)',
            animation: '_introGlowLine 3s ease-in-out infinite',
            transformOrigin: 'center',
          }}
        />

        {/* title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            textAlign: 'center',
            textShadow:
              '0 0 40px rgba(0,240,255,0.35), 0 0 80px rgba(138,43,226,0.25), 0 2px 12px rgba(0,0,0,0.8)',
            padding: '0 20px',
            lineHeight: 1.1,
            whiteSpace: 'pre',
          }}
        >
          {titleText}
        </h1>

        {/* decorative line below title */}
        <div
          style={{
            width: 'clamp(100px, 28vw, 320px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(138,43,226,0.5), rgba(0,240,255,0.5), transparent)',
            opacity: titleDone ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 1.4vw, 0.88rem)',
            letterSpacing: '0.18em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            minHeight: '1.6em',
          }}
        >
          {subtitle}
          <span
            style={{
              display: subtitle.length < 47 ? 'inline-block' : 'none',
              width: '2px',
              height: '1em',
              background: 'var(--accent-cyan, #00f0ff)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: '_introPulse 0.8s step-end infinite',
            }}
          />
        </p>

        {/* version tag */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.18)',
            textTransform: 'uppercase',
            opacity: titleDone ? 1 : 0,
            transition: 'opacity 0.5s ease 0.3s',
          }}
        >
          v2.1 &mdash; 72 Algorithms &bull; Post-Quantum Ready
        </span>
      </div>

      {/* launch button with animated gradient border */}
      <button
        ref={buttonRef}
        onClick={handleEnter}
        disabled={!ready}
        style={{
          pointerEvents: ready ? 'auto' : 'none',
          marginTop: '36px',
          position: 'relative',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
          fontWeight: 600,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#ffffff',
          background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(138,43,226,0.14))',
          backdropFilter: 'blur(16px)',
          border: 'none',
          borderRadius: '999px',
          padding: '18px 56px',
          cursor: ready ? 'pointer' : 'default',
          opacity: 0,
          textShadow: '0 0 12px rgba(0,240,255,0.6)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          /* animated gradient border via background-clip trick */
          outline: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow:
            '0 0 0 2px rgba(0,240,255,0.5), 0 4px 30px rgba(0,240,255,0.2), 0 0 60px rgba(138,43,226,0.3)',
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.06,
            boxShadow:
              '0 0 0 2px rgba(0,240,255,0.8), 0 10px 50px rgba(0,240,255,0.35), 0 0 80px rgba(138,43,226,0.5)',
            duration: 0.3,
          })
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            boxShadow:
              '0 0 0 2px rgba(0,240,255,0.5), 0 4px 30px rgba(0,240,255,0.2), 0 0 60px rgba(138,43,226,0.3)',
            duration: 0.3,
          })
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>
          ◈&ensp;Launch Atlas&ensp;◈
        </span>
      </button>

      {/* "press enter" hint */}
      <span
        ref={hintRef}
        style={{
          marginTop: '18px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)',
          letterSpacing: '0.2em',
          color: 'var(--text-dim, #444)',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        Press Enter to begin
      </span>

      {/* bottom decorative bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(18px, 3vw, 40px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.45rem, 0.8vw, 0.58rem)',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.15)',
          textTransform: 'uppercase',
          opacity: titleDone ? 1 : 0,
          transition: 'opacity 0.8s ease 0.5s',
        }}
      >
        <span>Symmetric</span>
        <span style={{ color: 'rgba(0,240,255,0.25)' }}>◆</span>
        <span>Asymmetric</span>
        <span style={{ color: 'rgba(138,43,226,0.25)' }}>◆</span>
        <span>Hash</span>
        <span style={{ color: 'rgba(0,255,159,0.25)' }}>◆</span>
        <span>Post-Quantum</span>
        <span style={{ color: 'rgba(0,240,255,0.25)' }}>◆</span>
        <span>ZK Proofs</span>
      </div>
    </div>
  )
}

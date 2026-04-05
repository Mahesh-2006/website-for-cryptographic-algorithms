import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'

interface IntroOverlayProps {
  onEnter: () => void
}

export function IntroOverlay({ onEnter }: IntroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', onComplete: () => setReady(true) }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  const handleEnter = useCallback(() => {
    if (!ready) return
    const tl = gsap.timeline({
      onComplete: onEnter,
    })

    tl.to(buttonRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' })
      .to(subtitleRef.current, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' }, '-=0.15')
      .to(titleRef.current, { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, '-=0.2')
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
        gap: '24px',
        pointerEvents: 'none',
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          fontWeight: 400,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          textAlign: 'center',
          opacity: 0,
          textShadow: '0 0 40px rgba(0, 240, 255, 0.3), 0 0 80px rgba(138, 43, 226, 0.2)',
          padding: '0 20px',
        }}
      >
        Cryptography Engine
      </h1>

      <p
        ref={subtitleRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        Cipher &bull; Analyze &bull; Simulate
      </p>

      <button
        ref={buttonRef}
        onClick={handleEnter}
        disabled={!ready}
        style={{
          pointerEvents: ready ? 'auto' : 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#ffffff',
          background: 'linear-gradient(135deg, rgba(255, 196, 0, 0.22), rgba(138, 43, 226, 0.36))',
          backdropFilter: 'blur(14px)',
          border: '2px solid rgba(255, 196, 0, 0.9)',
          borderRadius: '999px',
          padding: '16px 48px',
          cursor: ready ? 'pointer' : 'default',
          opacity: 0,
          boxShadow: '0 4px 28px rgba(255, 196, 0, 0.45), 0 0 60px rgba(138, 43, 226, 0.5)',
          textShadow: '0 0 16px rgba(255,255,255,0.8), 0 0 32px rgba(255, 196, 0, 0.9)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, { scale: 1.06, boxShadow: '0 10px 48px rgba(255, 196, 0, 0.7), 0 0 80px rgba(138, 43, 226, 0.7)', duration: 0.3 })
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { scale: 1, boxShadow: '0 4px 28px rgba(255, 196, 0, 0.45), 0 0 60px rgba(138, 43, 226, 0.5)', duration: 0.3 })
        }}
      >
        Enter
      </button>
    </div>
  )
}

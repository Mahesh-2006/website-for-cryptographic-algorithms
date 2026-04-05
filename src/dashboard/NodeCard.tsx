import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface NodeCardProps {
  title: string
  subtitle: string
  description: string
  icon: ReactNode
  accentColor: string
  onClick: () => void
}

export function NodeCard({ title, subtitle, description, icon, accentColor, onClick }: NodeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      scale: 1.02,
      boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 60px ${accentColor}22`,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: '0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.05)',
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleClick = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClick,
    })
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        boxShadow: '0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.05)',
        borderRadius: 'var(--radius-lg)',
        border: 'none',
        padding: '36px 32px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minHeight: '260px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent glow line at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${accentColor}33, transparent)`,
      }} />

      <div style={{ marginBottom: '8px' }}>{icon}</div>

      <div>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.3rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'var(--text)',
          marginBottom: '6px',
        }}>{title}</h3>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          color: accentColor,
          textTransform: 'uppercase',
          opacity: 0.8,
        }}>{subtitle}</p>
      </div>

      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.88rem',
        lineHeight: 1.5,
        color: 'var(--text-muted)',
        marginTop: 'auto',
      }}>{description}</p>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.15em',
        color: 'var(--text-dim)',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '8px',
      }}>
        <span>Explore</span>
        <span style={{ fontSize: '1rem', opacity: 0.5 }}>&rarr;</span>
      </div>
    </div>
  )
}

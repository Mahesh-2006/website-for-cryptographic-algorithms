import { useRef, useCallback } from 'react'
import gsap from 'gsap'

interface BackButtonProps {
  onBack: () => void
}

export function BackButton({ onBack }: BackButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(() => {
    gsap.to(ref.current, { scale: 0.9, opacity: 0, duration: 0.2, onComplete: onBack })
  }, [onBack])

  return (
    <button
      ref={ref}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 200,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        borderRadius: '999px',
        padding: '10px 20px',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
    >
      <span style={{ fontSize: '1rem' }}>&larr;</span>
      Back
    </button>
  )
}

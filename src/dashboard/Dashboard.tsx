import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { NodeCard } from './NodeCard'
import { algorithms, CATEGORIES } from '../features/atlas/algorithmData'

interface DashboardProps {
  onSelect: (feature: 'caesar' | 'atlas' | 'lab') => void
}

export function Dashboard({ onSelect }: DashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const algorithmCount = algorithms.length
  const categoryCount = CATEGORIES.length

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
      .fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')

    if (cardsRef.current) {
      const cards = cardsRef.current.children
      tl.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
        '-=0.3'
      )
    }

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        opacity: 0,
        overflow: 'auto',
      }}
    >
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
          fontWeight: 400,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '12px',
        }}>
          Cryptography Atlas
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          Interactive reference for classical ciphers, modern algorithms, and security experiments
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
        }}>
          {algorithmCount} algorithms &bull; {categoryCount} categories &bull; 3 learning modules
        </p>
      </div>

      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          maxWidth: '1100px',
          width: '100%',
        }}
      >
        <NodeCard
          title="Caesar Cipher"
          subtitle="Interactive Cipher Workbench"
          description="Experiment with shift distances, numeric encodings, and custom symbol mappings in a live playground"
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#00f0ff" strokeWidth="1" opacity="0.4" />
              <circle cx="24" cy="24" r="14" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
              <text x="24" y="28" textAnchor="middle" fill="#00f0ff" fontSize="12" fontFamily="var(--font-mono)">A→D</text>
            </svg>
          }
          accentColor="#00f0ff"
          onClick={() => onSelect('caesar')}
        />
        <NodeCard
          title="Algorithm Library"
          subtitle={`${algorithmCount} Algorithms & ${categoryCount} Categories`}
          description="Browse symmetric ciphers, hashes, signatures, post-quantum schemes, and zero-knowledge systems"
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="10" width="14" height="10" rx="2" stroke="#8a2be2" strokeWidth="1" opacity="0.6" />
              <rect x="24" y="10" width="14" height="10" rx="2" stroke="#8a2be2" strokeWidth="1" opacity="0.4" />
              <rect x="6" y="26" width="14" height="10" rx="2" stroke="#8a2be2" strokeWidth="1" opacity="0.4" />
              <rect x="24" y="26" width="14" height="10" rx="2" stroke="#8a2be2" strokeWidth="1" opacity="0.6" />
              <line x1="20" y1="15" x2="24" y2="15" stroke="#8a2be2" strokeWidth="0.5" opacity="0.3" />
              <line x1="20" y1="31" x2="24" y2="31" stroke="#8a2be2" strokeWidth="0.5" opacity="0.3" />
            </svg>
          }
          accentColor="#8a2be2"
          onClick={() => onSelect('atlas')}
        />
        <NodeCard
          title="Attack Lab"
          subtitle="Classical vs. Quantum Models"
          description="Compare order-of-magnitude attack costs across brute force, Grover, and Shor-style scenarios"
          icon={
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M12 36 L12 20 L20 12" stroke="#00ff9f" strokeWidth="1" opacity="0.6" fill="none" />
              <path d="M28 36 L28 14 L36 8" stroke="#00ff9f" strokeWidth="1" opacity="0.4" fill="none" />
              <circle cx="20" cy="12" r="3" stroke="#00ff9f" strokeWidth="1" opacity="0.6" fill="none" />
              <circle cx="36" cy="8" r="3" stroke="#00ff9f" strokeWidth="1" opacity="0.4" fill="none" />
              <line x1="8" y1="36" x2="40" y2="36" stroke="#00ff9f" strokeWidth="0.5" opacity="0.3" />
            </svg>
          }
          accentColor="#00ff9f"
          onClick={() => onSelect('lab')}
        />
      </div>
    </div>
  )
}

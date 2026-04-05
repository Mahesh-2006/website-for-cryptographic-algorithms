import { useState, useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { BackButton } from '../../components/BackButton'
import { algorithms, CATEGORIES, type Algorithm } from './algorithmData'

export function AtlasView({ onBack }: { onBack: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Algorithm | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const algorithmCount = algorithms.length
  const categoryCount = CATEGORIES.length

  const filtered = useMemo(() => {
    return algorithms.filter(a => {
      const matchCategory = activeCategory === 'all' || a.category === activeCategory
      const query = search.toLowerCase()
      const matchSearch = !query
        || a.name.toLowerCase().includes(query)
        || a.type.toLowerCase().includes(query)
        || a.category.toLowerCase().includes(query)
        || a.description.toLowerCase().includes(query)
        || a.useCase.toLowerCase().includes(query)
      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: 'power2.out' }
      )
    }
  }, [filtered])

  const categoryColors: Record<string, string> = {
    'Symmetric Encryption': '#00f0ff',
    'Asymmetric Encryption': '#8a2be2',
    'Hash Functions': '#00ff9f',
    'Digital Signatures': '#ff6b6b',
    'Authentication': '#ffd93d',
    'Key Exchange': '#6bcbff',
    'Key Management': '#a78bfa',
    'Message Integrity': '#34d399',
    'Password Hashing': '#f97316',
    'Secure Communication': '#06b6d4',
    'Email Security': '#ec4899',
    'Homomorphic Encryption': '#14b8a6',
    'Post-Quantum': '#f43f5e',
    'Zero-Knowledge Proofs': '#8b5cf6',
  }

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', padding: '80px 24px 24px', overflow: 'hidden', opacity: 0 }}>
      <BackButton onBack={onBack} />

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text)' }}>
          Algorithm Atlas
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px', letterSpacing: '0.1em' }}>
          {algorithmCount} algorithms across {categoryCount} categories
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '10px', letterSpacing: '0.06em' }}>
          Search by name, family, or use case to inspect each primitive in context.
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{ maxWidth: '900px', margin: '0 auto 20px', width: '100%' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by algorithm, type, category, or use case..."
          style={{
            width: '100%',
            padding: '10px 16px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '12px',
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            outline: 'none',
            boxShadow: 'var(--glass-shadow)',
            marginBottom: '12px',
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              background: activeCategory === 'all' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === 'all' ? 'var(--text)' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            ALL ({algorithmCount})
          </button>
          {CATEGORIES.map((cat) => {
            const count = algorithms.filter(a => a.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.06em',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  background: activeCategory === cat ? `${categoryColors[cat] || '#fff'}18` : 'rgba(255,255,255,0.03)',
                  color: activeCategory === cat ? (categoryColors[cat] || 'var(--text)') : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflow: 'auto', padding: '4px' }}>
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
          {filtered.map((algo) => (
            <div
              key={algo.id}
              onClick={() => setSelected(selected?.id === algo.id ? null : algo)}
              style={{
                background: selected?.id === algo.id ? 'rgba(255,255,255,0.06)' : 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                cursor: 'pointer',
                boxShadow: 'var(--glass-shadow)',
                transition: 'transform 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 500, color: 'var(--text)' }}>{algo.name}</h4>
              </div>
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.06em',
                padding: '2px 8px',
                borderRadius: '4px',
                background: `${categoryColors[algo.category] || '#fff'}15`,
                color: categoryColors[algo.category] || 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                {algo.type}
              </div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {algo.description}
              </p>

              {selected?.id === algo.id && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {algo.keySize && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                      Key: <span style={{ color: 'var(--accent-cyan)' }}>{algo.keySize}</span>
                    </div>
                  )}
                  {algo.security && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                      Security: <span style={{ color: 'var(--accent-green)' }}>{algo.security}</span>
                    </div>
                  )}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                    Use: <span style={{ color: 'var(--text-muted)' }}>{algo.useCase}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '40px' }}>
            No algorithms match that query. Try a different name, category, or use-case keyword.
          </p>
        )}
      </div>
    </div>
  )
}

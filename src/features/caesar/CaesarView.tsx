import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { BackButton } from '../../components/BackButton'

// ── Constants ────────────────────────────────────────────────────────────────
const LOWER = 'abcdefghijklmnopqrstuvwxyz'.split('')
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const DIGITS = '0123456789'.split('')
const SYMBOLS = [' ', '.', ',', '!', '?', ';', ':', '-', '_', '/', '(', ')', '"', "'", '@', '#', '$', '%', '&', '*']

type MappingRecord = Record<string, string>
type CipherMode = 'shift' | 'custom'
type EditTab = 'lowercase' | 'uppercase' | 'digits' | 'symbols'

// ── Default mappings ──────────────────────────────────────────────────────────
function defaultLowerMap(): MappingRecord {
  const m: MappingRecord = {}
  LOWER.forEach((ch, i) => { m[ch] = String(i + 1) })
  return m
}
function defaultUpperMap(): MappingRecord {
  const m: MappingRecord = {}
  UPPER.forEach((ch, i) => { m[ch] = String(i + 27) })
  return m
}
function defaultDigitMap(): MappingRecord {
  const m: MappingRecord = {}
  DIGITS.forEach((ch, i) => { m[ch] = String(53 + i) })
  return m
}
function defaultSymbolMap(): MappingRecord {
  const m: MappingRecord = {}
  SYMBOLS.forEach((ch, i) => { m[ch] = String(63 + i) })
  return m
}

// ── Shift cipher ─────────────────────────────────────────────────────────────
function shiftEncode(text: string, shift: number, caseSensitive: boolean): string {
  return text.split('').map(ch => {
    const isUpper = ch === ch.toUpperCase() && ch !== ch.toLowerCase()
    const base = caseSensitive ? ch : ch.toLowerCase()
    const idx = LOWER.indexOf(base.toLowerCase())
    if (idx === -1) return ch
    const shifted = LOWER[(idx + shift + 26) % 26]
    return caseSensitive && isUpper ? shifted.toUpperCase() : shifted
  }).join('')
}

// ── Custom mapping encode/decode ──────────────────────────────────────────────
function customEncode(
  text: string,
  lowerMap: MappingRecord,
  upperMap: MappingRecord,
  digitMap: MappingRecord,
  symbolMap: MappingRecord,
  caseSensitive: boolean,
  separator: string,
): string {
  const tokens = text.split('').map(ch => {
    if (caseSensitive) {
      if (ch in upperMap) return upperMap[ch]
      if (ch in lowerMap) return lowerMap[ch]
    } else {
      const lower = ch.toLowerCase()
      if (lower in lowerMap) return lowerMap[lower]
    }
    if (ch in digitMap) return digitMap[ch]
    if (ch in symbolMap) return symbolMap[ch]
    return ch
  })
  return tokens.join(separator)
}

function customDecode(
  text: string,
  lowerMap: MappingRecord,
  upperMap: MappingRecord,
  digitMap: MappingRecord,
  symbolMap: MappingRecord,
  caseSensitive: boolean,
  separator: string,
): string {
  const tokens = separator ? text.split(separator) : text.split('')
  const reverseMap: MappingRecord = {}
  Object.entries(lowerMap).forEach(([k, v]) => { reverseMap[v] = k })
  if (caseSensitive) {
    Object.entries(upperMap).forEach(([k, v]) => { reverseMap[v] = k })
  }
  Object.entries(digitMap).forEach(([k, v]) => { reverseMap[v] = k })
  Object.entries(symbolMap).forEach(([k, v]) => { reverseMap[v] = k })
  return tokens.map(t => reverseMap[t] ?? t).join('')
}

// ── Sub-components ────────────────────────────────────────────────────────────
function MiniInput({ value, onChange, accent }: { value: string; onChange: (v: string) => void; accent?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '46px',
        padding: '5px 4px',
        background: 'rgba(255,255,255,0.04)',
        border: 'none',
        borderRadius: '6px',
        color: accent || 'var(--accent-cyan)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        textAlign: 'center',
        outline: 'none',
      }}
    />
  )
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '6px 14px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        background: active ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255,255,255,0.03)',
        color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

const SEPARATORS = [
  { label: 'Space', value: ' ' },
  { label: 'Comma', value: ',' },
  { label: 'Dash', value: '-' },
  { label: 'Dot', value: '.' },
  { label: 'Pipe', value: '|' },
  { label: 'None', value: '' },
]

// ── Main Component ─────────────────────────────────────────────────────────────
export function CaesarView({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotatorRef = useRef<SVGGElement>(null)

  // Mode
  const [cipherMode, setCipherMode] = useState<CipherMode>('shift')
  const [ioMode, setIoMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [input, setInput] = useState('Attack at Dawn')

  // Shift mode
  const [shift, setShift] = useState(3)

  // Custom mapping mode
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [lowerMap, setLowerMap] = useState<MappingRecord>(defaultLowerMap)
  const [upperMap, setUpperMap] = useState<MappingRecord>(defaultUpperMap)
  const [digitMap, setDigitMap] = useState<MappingRecord>(defaultDigitMap)
  const [symbolMap, setSymbolMap] = useState<MappingRecord>(defaultSymbolMap)
  const [separator, setSeparator] = useState(' ')
  const [editTab, setEditTab] = useState<EditTab>('lowercase')
  const [showEditor, setShowEditor] = useState(true)

  // Animate in
  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
  }, [])

  // Rotator animation
  useEffect(() => {
    if (rotatorRef.current && cipherMode === 'shift') {
      gsap.to(rotatorRef.current, { rotation: -(shift * (360 / 26)), transformOrigin: 'center center', duration: 0.5, ease: 'power2.out' })
    }
  }, [shift, cipherMode])

  // Computed output
  const output = useMemo(() => {
    if (cipherMode === 'shift') {
      const s = ioMode === 'encrypt' ? shift : 26 - shift
      return shiftEncode(input, s, caseSensitive)
    } else {
      if (ioMode === 'encrypt') {
        return customEncode(input, lowerMap, upperMap, digitMap, symbolMap, caseSensitive, separator)
      } else {
        return customDecode(input, lowerMap, upperMap, digitMap, symbolMap, caseSensitive, separator)
      }
    }
  }, [cipherMode, ioMode, input, shift, caseSensitive, lowerMap, upperMap, digitMap, symbolMap, separator])

  // Map update helpers
  const updateLower = useCallback((ch: string, val: string) => setLowerMap(m => ({ ...m, [ch]: val })), [])
  const updateUpper = useCallback((ch: string, val: string) => setUpperMap(m => ({ ...m, [ch]: val })), [])
  const updateDigit = useCallback((ch: string, val: string) => setDigitMap(m => ({ ...m, [ch]: val })), [])
  const updateSymbol = useCallback((ch: string, val: string) => setSymbolMap(m => ({ ...m, [ch]: val })), [])

  const resetAllMaps = () => {
    setLowerMap(defaultLowerMap())
    setUpperMap(defaultUpperMap())
    setDigitMap(defaultDigitMap())
    setSymbolMap(defaultSymbolMap())
  }

  const outerRadius = 140
  const innerRadius = 100
  const glass: React.CSSProperties = {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--glass-shadow)',
  }
  const label = (text: string): React.CSSProperties => ({
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    letterSpacing: '0.12em',
    color: 'var(--text-muted)',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '10px',
  })

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '72px 20px 20px', overflow: 'auto', opacity: 0, gap: '16px' }}
    >
      <BackButton onBack={onBack} />

      {/* ── Header ── */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text)', marginBottom: '4px' }}>
          Caesar Cipher Workbench
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          Shift ciphers &bull; numeric encoding &bull; custom symbol maps
        </p>
      </div>

      {/* ── Cipher Mode Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', ...glass, padding: '6px' }}>
        {(['shift', 'custom'] as CipherMode[]).map(m => (
          <button
            key={m}
            onClick={() => setCipherMode(m)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '8px 20px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              background: cipherMode === m ? 'rgba(0, 240, 255, 0.14)' : 'transparent',
              color: cipherMode === m ? 'var(--accent-cyan)' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            {m === 'shift' ? 'Shift Mode' : 'Custom Mapping'}
          </button>
        ))}
      </div>

      {/* ── Main Row ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '1100px', width: '100%' }}>

        {/* ── Left: Input + Controls ── */}
        <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
          {/* Input */}
          <div style={{ ...glass, padding: '18px' }}>
            <span style={label(ioMode === 'encrypt' ? 'Plaintext' : 'Ciphertext')} />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: 'none', borderRadius: '10px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', padding: '10px', resize: 'vertical', outline: 'none', lineHeight: 1.5 }}
            />
          </div>

          {/* Encrypt / Decrypt toggle */}
          <div style={{ ...glass, padding: '14px 18px', display: 'flex', gap: '8px' }}>
            {(['encrypt', 'decrypt'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setIoMode(m)}
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '8px 10px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: ioMode === m ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                  color: ioMode === m ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Case sensitivity (always visible) */}
          <div style={{ ...glass, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Case Sensitive
            </span>
            <button
              onClick={() => setCaseSensitive(v => !v)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                padding: '6px 14px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                background: caseSensitive ? 'rgba(0, 255, 159, 0.12)' : 'rgba(255,255,255,0.05)',
                color: caseSensitive ? 'var(--accent-green)' : 'var(--text-dim)',
                transition: 'all 0.2s ease',
              }}
            >
              {caseSensitive ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Shift slider (shift mode only) */}
          {cipherMode === 'shift' && (
            <div style={{ ...glass, padding: '18px' }}>
              <span style={label(`Shift Value: ${shift}`)} />
              <input
                type="range"
                min="0" max="25"
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {[0, 5, 10, 15, 20, 25].map(v => (
                  <button
                    key={v}
                    onClick={() => setShift(v)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      padding: '3px 8px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: shift === v ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.04)',
                      color: shift === v ? 'var(--accent-cyan)' : 'var(--text-dim)',
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Separator (custom mode only) */}
          {cipherMode === 'custom' && (
            <div style={{ ...glass, padding: '14px 18px' }}>
              <span style={label('Token Separator')} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SEPARATORS.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setSeparator(s.value)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '7px',
                      cursor: 'pointer',
                      background: separator === s.value ? 'rgba(138, 43, 226, 0.14)' : 'rgba(255,255,255,0.04)',
                      color: separator === s.value ? '#b060ff' : 'var(--text-dim)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Center: Visual ── */}
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          {cipherMode === 'shift' ? (
            /* Rotator Dial */
            <div style={{ ...glass, padding: '12px', borderRadius: 'var(--radius-lg)' }}>
              <svg width="300" height="300" viewBox="-150 -150 300 300">
                <circle cx="0" cy="0" r={outerRadius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="28" />
                {UPPER.map((ch, i) => {
                  const angle = (i * 360 / 26 - 90) * (Math.PI / 180)
                  const x = Math.cos(angle) * outerRadius
                  const y = Math.sin(angle) * outerRadius
                  return (
                    <text key={`outer-${i}`} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                      fill="var(--text)" fontFamily="var(--font-mono)" fontSize="11" opacity="0.65">{ch}</text>
                  )
                })}
                <g ref={rotatorRef}>
                  <circle cx="0" cy="0" r={innerRadius} fill="none" stroke="rgba(0, 240, 255, 0.07)" strokeWidth="24" />
                  {UPPER.map((ch, i) => {
                    const angle = (i * 360 / 26 - 90) * (Math.PI / 180)
                    const x = Math.cos(angle) * innerRadius
                    const y = Math.sin(angle) * innerRadius
                    return (
                      <text key={`inner-${i}`} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                        fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600">{ch}</text>
                    )
                  })}
                </g>
                <text x="0" y="-9" textAnchor="middle" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2">SHIFT</text>
                <text x="0" y="16" textAnchor="middle" fill="var(--accent-cyan)" fontFamily="var(--font-mono)" fontSize="28" fontWeight="700">{shift}</text>
                {/* Alignment arrow */}
                <polygon points="0,-140 -5,-128 5,-128" fill="var(--accent-green)" opacity="0.7" />
              </svg>
            </div>
          ) : (
            /* Custom mode: mapping visualiser */
            <div style={{ ...glass, padding: '16px', minWidth: '240px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', textAlign: 'center' }}>
                Mapping Preview
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', maxHeight: '280px', overflow: 'auto' }}>
                {LOWER.map(ch => (
                  <div key={ch} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', padding: '4px 2px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)' }}>
                      {caseSensitive ? ch : `${ch}/${ch.toUpperCase()}`}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {lowerMap[ch] || '?'}
                    </div>
                  </div>
                ))}
              </div>
              {caseSensitive && (
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Uppercase</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                    {UPPER.map(ch => (
                      <div key={ch} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', padding: '4px 2px' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-dim)' }}>{ch}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#b060ff', fontWeight: 600 }}>
                          {upperMap[ch] || '?'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shift table (shift mode) */}
          {cipherMode === 'shift' && (
            <div style={{ ...glass, padding: '12px 16px', maxWidth: '300px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Character Map</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                {UPPER.map((ch, i) => (
                  <div key={i} style={{ textAlign: 'center', width: '20px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)' }}>{ch}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {UPPER[(i + shift) % 26]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Output ── */}
        <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
          <div style={{ ...glass, padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {ioMode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}
              </span>
              <button
                onClick={() => navigator.clipboard?.writeText(output)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: 'none', borderRadius: '6px', color: 'var(--text-dim)', cursor: 'pointer', letterSpacing: '0.06em' }}
              >
                Copy
              </button>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              color: 'var(--accent-cyan)',
              lineHeight: 1.7,
              wordBreak: 'break-all',
              minHeight: '100px',
              padding: '12px',
              background: 'rgba(0, 240, 255, 0.03)',
              borderRadius: '10px',
            }}>
              {output || <span style={{ opacity: 0.3 }}>Output will appear here</span>}
            </div>
          </div>

          {/* Stats */}
          <div style={{ ...glass, padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              ['Input chars', input.length],
              ['Output chars', output.length],
              ['Unique chars', new Set(input.split('')).size],
              ...(cipherMode === 'shift' ? [['Shift', shift]] : [['Separator', separator || 'None']]),
            ].map(([k, v]) => (
              <div key={String(k)}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Custom Mapping Editor ── */}
      {cipherMode === 'custom' && (
        <div style={{ maxWidth: '1100px', width: '100%', ...glass, padding: '0' }}>
          {/* Editor header */}
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
            onClick={() => setShowEditor(v => !v)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Mapping Editor
              </span>
              {!caseSensitive && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-green)', background: 'rgba(0,255,159,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                  Case Insensitive
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={(e) => { e.stopPropagation(); resetAllMaps() }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', padding: '5px 12px', background: 'rgba(255,68,68,0.08)', border: 'none', borderRadius: '7px', color: '#ff6666', cursor: 'pointer', letterSpacing: '0.06em' }}
              >
                Reset Defaults
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', userSelect: 'none' }}>
                {showEditor ? '▲' : '▼'}
              </span>
            </div>
          </div>

          {showEditor && (
            <div style={{ padding: '0 18px 18px' }}>
              {/* Sub-tabs */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <TabBtn label={`a–z (${LOWER.length})`} active={editTab === 'lowercase'} onClick={() => setEditTab('lowercase')} />
                {caseSensitive && <TabBtn label={`A–Z (${UPPER.length})`} active={editTab === 'uppercase'} onClick={() => setEditTab('uppercase')} />}
                <TabBtn label={`0–9 (${DIGITS.length})`} active={editTab === 'digits'} onClick={() => setEditTab('digits')} />
                <TabBtn label={`Symbols (${SYMBOLS.length})`} active={editTab === 'symbols'} onClick={() => setEditTab('symbols')} />
              </div>

              {/* Editor grid */}
              {editTab === 'lowercase' && (
                <MappingGrid
                  chars={LOWER}
                  map={lowerMap}
                  onUpdate={updateLower}
                  accentColor="var(--accent-cyan)"
                  labelColor={(ch) => ch}
                />
              )}
              {editTab === 'uppercase' && caseSensitive && (
                <MappingGrid
                  chars={UPPER}
                  map={upperMap}
                  onUpdate={updateUpper}
                  accentColor="#b060ff"
                  labelColor={(ch) => ch}
                />
              )}
              {editTab === 'digits' && (
                <MappingGrid
                  chars={DIGITS}
                  map={digitMap}
                  onUpdate={updateDigit}
                  accentColor="var(--accent-green)"
                  labelColor={(ch) => ch}
                />
              )}
              {editTab === 'symbols' && (
                <MappingGrid
                  chars={SYMBOLS}
                  map={symbolMap}
                  onUpdate={updateSymbol}
                  accentColor="#ffd93d"
                  labelColor={(ch) => ch === ' ' ? '␣' : ch}
                />
              )}

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', marginTop: '12px', lineHeight: 1.5 }}>
                Each field defines the encoded output for that character. Unmapped characters pass through unchanged.
                {ioMode === 'decrypt' && ' For decode: token-split by separator, then reverse-lookup each token.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── MappingGrid sub-component ─────────────────────────────────────────────────
function MappingGrid({ chars, map, onUpdate, accentColor, labelColor }: {
  chars: string[]
  map: MappingRecord
  onUpdate: (ch: string, val: string) => void
  accentColor: string
  labelColor: (ch: string) => string
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {chars.map(ch => (
        <div
          key={ch}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '6px 4px' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', minWidth: '20px', textAlign: 'center' }}>
            {labelColor(ch)}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-dim)' }}>→</span>
          <input
            type="text"
            value={map[ch] ?? ''}
            onChange={(e) => onUpdate(ch, e.target.value)}
            style={{
              width: '46px',
              padding: '4px 4px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '6px',
              color: accentColor,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textAlign: 'center',
              outline: 'none',
            }}
          />
        </div>
      ))}
    </div>
  )
}

import { useState, useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { BackButton } from '../../components/BackButton'
import {
  attackTypes,
  hardwareProfiles,
  isAttackSupported,
  runSimulation,
  securityTargets,
  type AttackType,
  type HardwareProfile,
  type SimulationResult,
} from './hardwareProfiles'

export function LabView({ onBack }: { onBack: () => void }) {
  const [targetId, setTargetId] = useState('aes-256')
  const [attackId, setAttackId] = useState<AttackType>('brute-force')
  const [hardwareId, setHardwareId] = useState('gaming-desktop')
  const [secretEntropyBits, setSecretEntropyBits] = useState(40)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const selectedTarget = securityTargets.find((target) => target.id === targetId) || securityTargets[0]
  const selectedHardware = hardwareProfiles.find(h => h.id === hardwareId)!
  const selectedAttack = attackTypes.find(a => a.id === attackId)!

  const hardwareGroups = useMemo(() => {
    const personalIds = new Set(['office-laptop', 'gaming-desktop'])
    const serverIds = new Set(['dual-xeon', 'epyc-rack'])
    const supercomputerIds = new Set(['hpc-cluster', 'exascale'])

    const personal = hardwareProfiles.filter(h => personalIds.has(h.id))
    const servers = hardwareProfiles.filter(h => serverIds.has(h.id))
    const supercomputers = hardwareProfiles.filter(h => supercomputerIds.has(h.id))
    const quantum = hardwareProfiles.filter(h => h.category === 'quantum')

    return { personal, servers, supercomputers, quantum }
  }, [])

  const groupedHardwareLists: { label: string; items: HardwareProfile[] }[] = [
    { label: 'Personal Devices', items: hardwareGroups.personal },
    { label: 'Servers', items: hardwareGroups.servers },
    { label: 'Supercomputers', items: hardwareGroups.supercomputers },
    { label: 'Quantum Devices', items: hardwareGroups.quantum },
  ]

  const renderHardwareButton = (h: HardwareProfile) => (
    <button
      key={h.id}
      onClick={() => setHardwareId(h.id)}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        background: hardwareId === h.id ? `${h.category === 'quantum' ? 'rgba(0, 255, 159, 0.1)' : 'rgba(0, 240, 255, 0.08)'}` : 'rgba(255,255,255,0.02)',
        color: hardwareId === h.id ? (h.category === 'quantum' ? 'var(--accent-green)' : 'var(--accent-cyan)') : 'var(--text-dim)',
        textAlign: 'left',
        transition: 'all 0.2s ease',
      }}
    >
      {h.name}
      {h.category === 'quantum' && <span style={{ opacity: 0.5, marginLeft: '6px' }}>Q</span>}
    </button>
  )

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    setResult(null)
  }, [targetId, attackId, hardwareId, secretEntropyBits])

  function handleTargetChange(nextTargetId: string) {
    const nextTarget = securityTargets.find((target) => target.id === nextTargetId)
    if (!nextTarget) {
      return
    }

    setTargetId(nextTargetId)

    if (!isAttackSupported(nextTarget, attackId)) {
      setAttackId(nextTarget.attackSupport[0])
    }

    if (nextTarget.dictionaryModel) {
      setSecretEntropyBits(nextTarget.dictionaryModel.defaultEntropyBits)
    }
  }

  const handleSimulate = () => {
    const r = runSimulation(selectedTarget, attackId, selectedHardware, secretEntropyBits)
    setResult(r)
    if (resultRef.current) {
      gsap.fromTo(resultRef.current, { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' })
    }
  }

  const verdictColors = { safe: '#00ff9f', warn: '#ffd93d', critical: '#ff4444', neutral: '#8fa1b3' }
  const verdictLabels = { safe: 'SAFE', warn: 'CAUTION', critical: 'VULNERABLE', neutral: 'N/A' }

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px 40px', overflow: 'auto', opacity: 0 }}>
      <BackButton onBack={onBack} />

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text)', marginBottom: '8px' }}>
        Attack Estimation Lab
      </h2>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>
        NIST-based estimates with cited quantum assumptions
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', maxWidth: '900px', width: '100%', justifyContent: 'center' }}>
        {/* Controls */}
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Key Size */}
          <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Target
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {securityTargets.map((target) => (
                <button
                  key={target.id}
                  onClick={() => handleTargetChange(target.id)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: targetId === target.id ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255,255,255,0.03)',
                    color: targetId === target.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {target.label}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '12px 0 0' }}>
              {selectedTarget.family} • {selectedTarget.parameterLabel}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.5, margin: '6px 0 0' }}>
              {selectedTarget.nistStrengthLabel} • {selectedTarget.nistReference}
            </p>
          </div>

          {/* Attack Type */}
          <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Attack Model
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {attackTypes.map((a) => {
                const supported = isAttackSupported(selectedTarget, a.id)

                return (
                <button
                  key={a.id}
                  onClick={() => supported && setAttackId(a.id)}
                  disabled={!supported}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    padding: '10px 14px',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: supported ? 'pointer' : 'not-allowed',
                    background: attackId === a.id && supported ? 'rgba(138, 43, 226, 0.12)' : 'rgba(255,255,255,0.03)',
                    color: attackId === a.id && supported ? '#8a2be2' : 'var(--text-muted)',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    opacity: supported ? 1 : 0.35,
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{a.name}</div>
                  <div style={{ fontSize: '0.63rem', opacity: 0.7, marginTop: '2px' }}>{a.description}</div>
                </button>
                )
              })}
            </div>
            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                How this attack breaks keys
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {selectedAttack.howItWorks}
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>
                Math model (simplified)
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {selectedAttack.math}
              </p>
            </div>
          </div>

          {selectedTarget.dictionaryModel && attackId === 'dictionary' && (
            <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                Effective Memorized-Secret Entropy
              </label>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '8px' }}>
                {secretEntropyBits} bits
              </div>
              <input
                type="range"
                min={selectedTarget.dictionaryModel.minEntropyBits}
                max={selectedTarget.dictionaryModel.maxEntropyBits}
                step="1"
                value={secretEntropyBits}
                onChange={(event) => setSecretEntropyBits(Number(event.target.value))}
                style={{ width: '100%' }}
              />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '10px 0 0' }}>
                {selectedTarget.dictionaryModel.notes}
              </p>
            </div>
          )}

          {/* Hardware */}
          <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Hardware Profile
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {groupedHardwareLists.map((group) =>
                group.items.length > 0 && (
                  <div key={group.label}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.16em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        margin: '4px 0',
                      }}
                    >
                      {group.label}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {group.items.map(renderHardwareButton)}
                    </div>
                  </div>
                ),
              )}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.5, margin: '12px 0 0' }}>
              Selecting classical hardware compares it against a 5,000-logical-qubit reference machine. Selecting quantum hardware compares that machine against an exascale classical reference. Quantum tiers are modeled as logical qubits, not raw physical qubits.
            </p>
          </div>

          <button
            onClick={handleSimulate}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '14px 24px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0, 240, 255, 0.15)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 240, 255, 0.25)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.15)' }}
          >
            Estimate Attack Cost
          </button>
        </div>

        {/* Results */}
        <div style={{ flex: '1 1 340px' }}>
          {result ? (
            <div ref={resultRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Verdict */}
              <div style={{
                background: `${verdictColors[result.verdict]}10`,
                backdropFilter: 'blur(var(--glass-blur))',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                boxShadow: `0 8px 32px ${verdictColors[result.verdict]}15`,
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: verdictColors[result.verdict], marginBottom: '8px' }}>
                  VERDICT
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: verdictColors[result.verdict], marginBottom: '12px' }}>
                  {verdictLabels[result.verdict]}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {result.note}
                </p>
              </div>

              {/* Comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {result.classicalHardwareLabel}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, color: 'var(--text)', wordBreak: 'break-word' }}>
                    {result.classicalTime}
                  </div>
                </div>
                <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent-green)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {result.quantumHardwareLabel}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, color: 'var(--text)', wordBreak: 'break-word' }}>
                    {result.quantumTime}
                  </div>
                </div>
              </div>

              {/* Hardware Info */}
              <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', borderRadius: 'var(--radius-md)', padding: '20px', boxShadow: 'var(--glass-shadow)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Simulation Details
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    ['Target', selectedTarget.label],
                    ['Attack', selectedAttack.name],
                    ['Basis', result.basisLabel],
                    ['NIST', result.nistStrengthLabel],
                    ['Classical model', result.classicalHardwareLabel],
                    ['Quantum model', result.quantumHardwareLabel],
                    ['Selected hardware', selectedHardware.name],
                    ['Processor', selectedHardware.processor],
                    ['Compute', selectedHardware.cores],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{value}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Formula Summary
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Classical: {result.classicalFormula}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      Quantum: {result.quantumFormula}
                    </div>
                  </div>
                  {result.references.length > 0 && (
                    <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Research Basis
                      </div>
                      {result.references.map((entry, index) => (
                        <div key={`${entry}-${index}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          [{index + 1}] {entry}
                        </div>
                      ))}
                    </div>
                  )}
                  {(result.assumptions.length > 0 || result.exceptions.length > 0) && (
                    <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Assumptions & Exceptions
                      </div>
                      {result.assumptions.map((entry, index) => (
                        <div key={`assumption-${index}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          Assumption: {entry}
                        </div>
                      ))}
                      {result.exceptions.map((entry, index) => (
                        <div key={`exception-${index}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                          Exception: {entry}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Estimation Accuracy
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Classical: {result.classicalAccuracy}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Quantum: {result.quantumAccuracy}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textAlign: 'center' }}>
                Choose a target, attack model, and hardware profile<br />to compare NIST-based attack estimates with explicit references and exceptions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SECONDS_PER_YEAR = 31_557_600
const CLASSICAL_REFERENCE_ID = 'exascale'
const QUANTUM_REFERENCE_ID = 'logical-5000'
const LOGICAL_QUANTUM_REFERENCE_QUBITS = 5_000
const LOGICAL_QUANTUM_REFERENCE_OPS_PER_SECOND = 1e9

const NIST_SECURITY_REFERENCE = 'NIST SP 800-57 Part 1 Rev. 5 security-strength mappings'
const GROVER_REFERENCE = 'Grover (1996) / amplitude-amplification query complexity for unstructured search'
const GROVER_ORACLE_EXCEPTION =
  'The quantum side reports ideal oracle-call complexity; it does not compile a full fault-tolerant oracle or scheduling stack.'
const QUANTUM_LOGICAL_QUBIT_ASSUMPTION =
  'Quantum machine sizes are treated as logical qubits after error correction, not raw physical qubits.'
const CLASSICAL_THROUGHPUT_EXCEPTION =
  'Classical hardware rates are generic workload proxies rather than per-algorithm benchmark suites.'
const QUANTUM_THROUGHPUT_EXCEPTION =
  'Quantum throughput is a comparative lab assumption scaled from the 5,000-logical-qubit reference tier rather than a vendor benchmark.'

function getModeledLogicalQuantumOpsPerSecond(logicalQubits: number): number {
  return LOGICAL_QUANTUM_REFERENCE_OPS_PER_SECOND * (logicalQubits / LOGICAL_QUANTUM_REFERENCE_QUBITS)
}

export interface HardwareProfile {
  id: string
  name: string
  category: 'classical' | 'quantum'
  processor: string
  cores: string
  qubits?: number
  opsPerSecond: number
  passwordGuessesPerSecond?: number
  description: string
}

export const hardwareProfiles: HardwareProfile[] = [
  {
    id: 'office-laptop',
    name: 'Office Laptop',
    category: 'classical',
    processor: 'Intel Core i5-1340P',
    cores: '12 cores / 16 threads',
    opsPerSecond: 5e8,
    passwordGuessesPerSecond: 1.5e3,
    description: 'Standard office workstation with integrated graphics',
  },
  {
    id: 'gaming-desktop',
    name: 'Gaming Desktop',
    category: 'classical',
    processor: 'AMD Ryzen 9 7950X + RTX 4090',
    cores: '16 cores / 32 threads + 16384 CUDA',
    opsPerSecond: 2e10,
    passwordGuessesPerSecond: 6e5,
    description: 'High-end consumer hardware with GPU acceleration',
  },
  {
    id: 'dual-xeon',
    name: 'Dual Xeon Server',
    category: 'classical',
    processor: '2x Intel Xeon Platinum 8480+',
    cores: '112 cores / 224 threads',
    opsPerSecond: 8e10,
    passwordGuessesPerSecond: 8e4,
    description: 'Enterprise rack server with high core count',
  },
  {
    id: 'epyc-rack',
    name: 'EPYC Rack Node',
    category: 'classical',
    processor: 'AMD EPYC 9654 + 8x A100',
    cores: '96 cores + 8 GPUs',
    opsPerSecond: 5e11,
    passwordGuessesPerSecond: 4e6,
    description: 'GPU-accelerated compute node for parallel workloads',
  },
  {
    id: 'hpc-cluster',
    name: 'HPC Cluster',
    category: 'classical',
    processor: 'National Lab Supercomputer',
    cores: '500,000+ cores',
    opsPerSecond: 1e15,
    passwordGuessesPerSecond: 8e8,
    description: 'Top-tier supercomputer cluster with exascale potential',
  },
  {
    id: 'exascale',
    name: 'Exascale System',
    category: 'classical',
    processor: 'Frontier / Aurora class',
    cores: '8M+ cores',
    opsPerSecond: 1e18,
    passwordGuessesPerSecond: 5e11,
    description: 'World-class exascale computing facility',
  },
  {
    id: 'nisq-127',
    name: 'NISQ Quantum (127 qubits)',
    category: 'quantum',
    processor: 'IBM Eagle',
    cores: 'N/A',
    qubits: 127,
    opsPerSecond: 1e4,
    description: 'Current-generation noisy intermediate-scale quantum processor',
  },
  {
    id: 'research-1000',
    name: 'Research Quantum (1,000 qubits)',
    category: 'quantum',
    processor: 'IBM Condor class',
    cores: 'N/A',
    qubits: 1000,
    opsPerSecond: 1e6,
    description: 'Near-term research quantum processor with error mitigation',
  },
  {
    id: 'logical-5000',
    name: 'Logical Quantum (5,000 qubits)',
    category: 'quantum',
    processor: 'Modeled fault-tolerant surface code',
    cores: 'N/A',
    qubits: 5000,
    opsPerSecond: getModeledLogicalQuantumOpsPerSecond(5000),
    description: 'Modeled fault-tolerant quantum computer using logical qubits',
  },
  {
    id: 'logical-7000',
    name: 'Logical Quantum (7,000 qubits)',
    category: 'quantum',
    processor: 'Modeled fault-tolerant surface code',
    cores: 'N/A',
    qubits: 7000,
    opsPerSecond: getModeledLogicalQuantumOpsPerSecond(7000),
    description: 'Modeled larger logical-qubit tier for literature-backed Shor comparisons',
  },
  {
    id: 'logical-10000',
    name: 'Logical Quantum (10,000 qubits)',
    category: 'quantum',
    processor: 'Modeled fault-tolerant surface code',
    cores: 'N/A',
    qubits: 10000,
    opsPerSecond: getModeledLogicalQuantumOpsPerSecond(10000),
    description: 'Modeled fault-tolerant quantum computer above most RSA-3072 thresholds',
  },
  {
    id: 'logical-50000',
    name: 'Logical Quantum (50,000 qubits)',
    category: 'quantum',
    processor: 'Modeled fault-tolerant surface code',
    cores: 'N/A',
    qubits: 50000,
    opsPerSecond: getModeledLogicalQuantumOpsPerSecond(50000),
    description: 'Modeled large-scale logical quantum computer for aggressive fault-tolerant scenarios',
  },
]

export type AttackType = 'brute-force' | 'dictionary' | 'grover' | 'shor'

export interface AttackModel {
  id: AttackType
  name: string
  description: string
  quantumOnly: boolean
  howItWorks: string
  math: string
}

export interface SecurityTarget {
  id: string
  label: string
  family: string
  parameterLabel: string
  nistStrengthLabel: string
  nistReference: string
  references: string[]
  exceptions?: string[]
  attackSupport: AttackType[]
  classicalSecurityBits?: number
  groverSecurityBits?: number
  dictionaryModel?: {
    defaultEntropyBits: number
    minEntropyBits: number
    maxEntropyBits: number
    notes: string
  }
  shorModel?: {
    requiredLogicalQubits: number
    baseHoursAtThreshold: number
    notes: string
    reference: string
    exceptions: string[]
  }
}

export const attackTypes: AttackModel[] = [
  {
    id: 'brute-force',
    name: 'Brute Force',
    description: 'Generic classical search using NIST security strength',
    quantumOnly: false,
    howItWorks:
      'This mode treats the attack as generic classical search. For symmetric keys and hash preimages that matches exhaustive search directly. For RSA and ECC it uses the NIST-equivalent classical security strength instead of the raw modulus or curve size.',
    math:
      'Expected classical work is about 2^(s-1) operations, where s is the target security strength in bits. Example: NIST maps RSA-2048 to about 112 classical bits, so the model uses roughly 2^111 work rather than 2^2048.',
  },
  {
    id: 'dictionary',
    name: 'Dictionary Attack',
    description: 'Offline guessing against password-derived secrets',
    quantumOnly: false,
    howItWorks:
      'The attacker tests human-generated secrets against an offline verifier such as PBKDF2 output. The important inputs are effective secret entropy after human bias and blocklists, plus the cost of each verifier check.',
    math:
      'Expected work is about 2^(H-1) guesses for H bits of effective memorized-secret entropy. Time is expected guesses divided by the verifier-limited guess rate. NIST does not assign a fixed password entropy value, so this lab exposes H as a scenario knob.',
  },
  {
    id: 'grover',
    name: "Grover's Search",
    description: 'Ideal quantum search against unstructured key spaces',
    quantumOnly: true,
    howItWorks:
      'Grover amplifies the probability of the correct key or preimage by alternating an oracle with a diffusion operator. It is relevant to search-style targets such as symmetric keys and hash preimages, not to factoring- or lattice-based systems.',
    math:
      'For an unstructured search space with security strength s, expected work is about (π/4)·2^(s/2) oracle calls. This is a square-root speedup, not a polynomial break.',
  },
  {
    id: 'shor',
    name: "Shor's Algorithm",
    description: 'Polynomial-time factoring and discrete log on fault-tolerant QC',
    quantumOnly: true,
    howItWorks:
      'Shor reduces factoring and discrete logarithms to period finding. It is the relevant quantum model for RSA, Diffie-Hellman, and ECC-style public-key systems, but it does not directly break NIST-standardized lattice-based post-quantum schemes.',
    math:
      'Once enough logical qubits exist, Shor runs in polynomial time rather than the exponential or subexponential time of classical attacks. This lab uses target-specific logical-qubit thresholds with simplified polynomial runtime scaling.',
  },
]

export const securityTargets: SecurityTarget[] = [
  {
    id: 'aes-128',
    label: 'AES-128',
    family: 'Symmetric cipher',
    parameterLabel: '128-bit secret key',
    nistStrengthLabel: '128-bit classical security strength',
    nistReference: 'NIST SP 800-57 Part 1 Rev. 5',
    references: [NIST_SECURITY_REFERENCE, GROVER_REFERENCE],
    exceptions: [GROVER_ORACLE_EXCEPTION],
    attackSupport: ['brute-force', 'grover'],
    classicalSecurityBits: 128,
    groverSecurityBits: 128,
  },
  {
    id: 'aes-256',
    label: 'AES-256',
    family: 'Symmetric cipher',
    parameterLabel: '256-bit secret key',
    nistStrengthLabel: '256-bit classical security strength',
    nistReference: 'NIST SP 800-57 Part 1 Rev. 5',
    references: [NIST_SECURITY_REFERENCE, GROVER_REFERENCE],
    exceptions: [GROVER_ORACLE_EXCEPTION],
    attackSupport: ['brute-force', 'grover'],
    classicalSecurityBits: 256,
    groverSecurityBits: 256,
  },
  {
    id: 'rsa-1024',
    label: 'RSA-1024',
    family: 'Integer-factorization public key',
    parameterLabel: '1024-bit modulus',
    nistStrengthLabel: 'About 80-bit classical strength (legacy only)',
    nistReference: 'NIST SP 800-57 Part 1 Rev. 5 / SP 800-131A Rev. 2',
    references: [
      'NIST SP 800-57 Part 1 Rev. 5 / SP 800-131A Rev. 2 security guidance for legacy RSA-1024',
      'Gidney & Ekerå (2019) RSA-2048 resource estimate used here as the nearest published scaling anchor',
    ],
    exceptions: [
      'RSA-1024 is legacy-only under current NIST guidance; the quantum resource figures are scaled from RSA-2048 literature rather than a dedicated modern NIST runtime.',
    ],
    attackSupport: ['brute-force', 'shor'],
    classicalSecurityBits: 80,
    shorModel: {
      requiredLogicalQubits: 2050,
      baseHoursAtThreshold: 2,
      notes: 'Legacy-size RSA falls below modern NIST minimums and also needs fewer logical qubits for Shor than RSA-2048.',
      reference: 'Scaled from the Gidney & Ekerå (2019) RSA-2048 factoring estimate to a smaller RSA modulus.',
      exceptions: [
        'This is an extrapolated threshold, not a standalone NIST or peer-reviewed runtime for RSA-1024.',
        'Physical-qubit overhead, factory layout, and compilation strategy are intentionally collapsed into a logical-qubit comparison.',
      ],
    },
  },
  {
    id: 'rsa-2048',
    label: 'RSA-2048',
    family: 'Integer-factorization public key',
    parameterLabel: '2048-bit modulus',
    nistStrengthLabel: '112-bit classical security strength',
    nistReference: 'NIST SP 800-57 Part 1 Rev. 5',
    references: [
      NIST_SECURITY_REFERENCE,
      'Gidney & Ekerå (2019): factoring RSA-2048 in about 8 hours using 20 million noisy qubits',
    ],
    attackSupport: ['brute-force', 'shor'],
    classicalSecurityBits: 112,
    shorModel: {
      requiredLogicalQubits: 4100,
      baseHoursAtThreshold: 8,
      notes: 'Representative literature-inspired threshold for fault-tolerant factoring of RSA-2048.',
      reference:
        'Gidney & Ekerå (2019) provides the near-threshold runtime anchor that this lab maps onto logical-qubit tiers.',
      exceptions: [
        'The cited work reports physical noisy qubits; this lab compresses that result into a logical-qubit threshold for comparison.',
        'Magic-state factories, code distance, connectivity, and gate-synthesis overhead can shift runtime materially.',
      ],
    },
  },
  {
    id: 'rsa-3072',
    label: 'RSA-3072',
    family: 'Integer-factorization public key',
    parameterLabel: '3072-bit modulus',
    nistStrengthLabel: '128-bit classical security strength',
    nistReference: 'NIST SP 800-57 Part 1 Rev. 5',
    references: [
      NIST_SECURITY_REFERENCE,
      'Scaled from Gidney & Ekerå style RSA resource estimates to align with the larger RSA-3072 modulus',
    ],
    exceptions: [
      'The RSA-3072 quantum runtime is a representative extrapolation from published RSA-2048 style resource estimates, not a NIST-prescribed implementation runtime.',
    ],
    attackSupport: ['brute-force', 'shor'],
    classicalSecurityBits: 128,
    shorModel: {
      requiredLogicalQubits: 6200,
      baseHoursAtThreshold: 18,
      notes: 'Larger moduli need more logical qubits and longer quantum runtimes than RSA-2048.',
      reference:
        'This threshold extends the published RSA-2048 resource-estimate family to a larger modulus for comparative modeling.',
      exceptions: [
        'No single peer-reviewed paper fixes this exact logical-qubit threshold and runtime for all architectures.',
        'Physical layout, code distance, and modular-exponentiation implementation details can change the result materially.',
      ],
    },
  },
  {
    id: 'ecc-p256',
    label: 'ECC P-256',
    family: 'Elliptic-curve discrete log',
    parameterLabel: 'NIST P-256 group',
    nistStrengthLabel: '128-bit classical security strength',
    nistReference: 'NIST SP 800-57 Part 1 Rev. 5 / SP 800-186',
    references: [
      'NIST SP 800-57 Part 1 Rev. 5 / SP 800-186 security guidance for P-256',
      'Roetteler, Naehrig, Svore, and Lauter (2017) quantum resource estimates for elliptic-curve discrete logarithms',
    ],
    attackSupport: ['brute-force', 'shor'],
    classicalSecurityBits: 128,
    shorModel: {
      requiredLogicalQubits: 2500,
      baseHoursAtThreshold: 5,
      notes: 'Elliptic-curve discrete logs need fewer logical qubits than RSA factoring at comparable classical strength.',
      reference:
        'Roetteler et al. (2017) is the primary literature anchor for the logical-qubit order of magnitude in the P-256 setting.',
      exceptions: [
        'Published ECDLP resource estimates depend strongly on the chosen curve arithmetic, fault-tolerance stack, and gate set.',
        'The lab collapses architecture-specific details into a single logical-qubit threshold and comparative runtime anchor.',
      ],
    },
  },
  {
    id: 'sha-256-preimage',
    label: 'SHA-256 Preimage',
    family: 'Hash preimage target',
    parameterLabel: '256-bit digest preimage',
    nistStrengthLabel: '256-bit preimage strength',
    nistReference: 'NIST FIPS 180-4 / SP 800-57 Part 1 Rev. 5',
    references: ['NIST FIPS 180-4 / SP 800-57 Part 1 Rev. 5', GROVER_REFERENCE],
    exceptions: [GROVER_ORACLE_EXCEPTION],
    attackSupport: ['brute-force', 'grover'],
    classicalSecurityBits: 256,
    groverSecurityBits: 256,
  },
  {
    id: 'ml-kem-768',
    label: 'ML-KEM-768',
    family: 'NIST post-quantum KEM',
    parameterLabel: 'NIST Category 3 parameter set',
    nistStrengthLabel: 'Category 3, benchmarked against AES-192 exhaustive search',
    nistReference: 'NIST FIPS 203 / PQC security categories',
    references: ['NIST FIPS 203 / PQC security categories for ML-KEM'],
    exceptions: [
      'NIST PQ categories are defined against best-known attacks, not a simple Grover or Shor oracle reduction, so the lab does not invent a direct quantum runtime here.',
    ],
    attackSupport: ['brute-force'],
    classicalSecurityBits: 192,
  },
  {
    id: 'pbkdf2-100k',
    label: 'PBKDF2-HMAC-SHA256',
    family: 'Password-derived key',
    parameterLabel: '100,000 PBKDF2 iterations',
    nistStrengthLabel: 'No fixed NIST bit strength; security depends on memorized-secret entropy and verifier cost',
    nistReference: 'NIST SP 800-132 and SP 800-63B',
    references: ['NIST SP 800-132', 'NIST SP 800-63B'],
    exceptions: [
      'NIST does not assign a fixed memorized-secret entropy value; the slider is a scenario input rather than a standard constant.',
      'Displayed PBKDF2 guess rates are workload proxies and can vary materially with implementation, parallelism, and attacker optimization.',
    ],
    attackSupport: ['dictionary'],
    dictionaryModel: {
      defaultEntropyBits: 40,
      minEntropyBits: 20,
      maxEntropyBits: 80,
      notes: 'Use the entropy slider to model an effective offline search space after human bias, reuse, and blocklist filtering.',
    },
  },
]

export interface SimulationResult {
  classicalTime: string
  quantumTime: string
  classicalOps: number
  quantumOps: number
  verdict: 'safe' | 'warn' | 'critical' | 'neutral'
  note: string
  classicalAccuracy: string
  quantumAccuracy: string
  basisLabel: string
  nistStrengthLabel: string
  classicalFormula: string
  quantumFormula: string
  classicalHardwareLabel: string
  quantumHardwareLabel: string
  references: string[]
  assumptions: string[]
  exceptions: string[]
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return 'Not feasible on modeled hardware'
  if (seconds < 1) return '< 1 second'

  const years = seconds / SECONDS_PER_YEAR
  if (years >= 1e6) return `~10^${Math.log10(years).toFixed(1)} years`
  if (years >= 1e3) return `${(years / 1e3).toFixed(1)} thousand years`
  if (years >= 1) return `${years.toFixed(1)} years`
  if (seconds >= 86_400) return `${(seconds / 86_400).toFixed(1)} days`
  if (seconds >= 3_600) return `${(seconds / 3_600).toFixed(1)} hours`
  if (seconds >= 60) return `${(seconds / 60).toFixed(1)} minutes`
  return `${seconds.toFixed(seconds < 10 ? 1 : 0)} seconds`
}

function uniqueItems(items: Array<string | undefined>): string[] {
  return [...new Set(items.filter((item): item is string => typeof item === 'string' && item.trim().length > 0))]
}

function getQuantumTierAssumption(profile: HardwareProfile): string | undefined {
  if (!profile.qubits) {
    return undefined
  }

  return `${profile.name} is treated as ${profile.qubits.toLocaleString()} logical qubits with throughput scaled from the ${LOGICAL_QUANTUM_REFERENCE_QUBITS.toLocaleString()}-logical-qubit reference tier.`
}

function expectedClassicalOps(bits: number): number {
  return Math.pow(2, Math.max(bits - 1, 0))
}

function expectedGroverOps(bits: number): number {
  return (Math.PI / 4) * Math.pow(2, bits / 2)
}

function expectedDictionaryGuesses(entropyBits: number): number {
  return Math.pow(2, Math.max(entropyBits - 1, 0))
}

function getHardwareProfile(id: string): HardwareProfile {
  const hardware = hardwareProfiles.find((entry) => entry.id === id)
  if (!hardware) {
    throw new Error(`Unknown hardware profile: ${id}`)
  }
  return hardware
}

function getComparisonHardware(selectedHardware: HardwareProfile) {
  const classicalReference = getHardwareProfile(CLASSICAL_REFERENCE_ID)
  const quantumReference = getHardwareProfile(QUANTUM_REFERENCE_ID)

  return {
    classicalHardware: selectedHardware.category === 'classical' ? selectedHardware : classicalReference,
    quantumHardware: selectedHardware.category === 'quantum' ? selectedHardware : quantumReference,
    classicalIsReference: selectedHardware.category !== 'classical',
    quantumIsReference: selectedHardware.category !== 'quantum',
  }
}

function getFastestModeledSeconds(classicalSeconds: number, quantumSeconds: number): number {
  const candidates = [classicalSeconds, quantumSeconds].filter(Number.isFinite)
  if (candidates.length === 0) {
    return Number.POSITIVE_INFINITY
  }
  return Math.min(...candidates)
}

function getVerdict(seconds: number): Pick<SimulationResult, 'verdict' | 'note'> {
  if (!Number.isFinite(seconds)) {
    return {
      verdict: 'safe',
      note: 'No feasible break is modeled on the compared hardware profiles for this scenario.',
    }
  }

  if (seconds > SECONDS_PER_YEAR * 1e9) {
    return {
      verdict: 'safe',
      note: 'Strong security margin under the modeled attack assumptions and hardware limits.',
    }
  }

  if (seconds > SECONDS_PER_YEAR * 100) {
    return {
      verdict: 'warn',
      note: 'Moderate margin. This is not an immediate break, but it is not a comfortable long-term position.',
    }
  }

  return {
    verdict: 'critical',
    note: 'The modeled attack is within practical reach on at least one of the compared hardware profiles.',
  }
}

export function isAttackSupported(target: SecurityTarget, attack: AttackType): boolean {
  return target.attackSupport.includes(attack)
}

export function runSimulation(
  target: SecurityTarget,
  attack: AttackType,
  selectedHardware: HardwareProfile,
  entropyBits = target.dictionaryModel?.defaultEntropyBits ?? 40,
): SimulationResult {
  const comparison = getComparisonHardware(selectedHardware)
  const classicalHardwareLabel = comparison.classicalIsReference
    ? `Classical reference (${comparison.classicalHardware.name})`
    : `Classical (${comparison.classicalHardware.name})`
  const quantumHardwareLabel = comparison.quantumIsReference
    ? `Quantum reference (${comparison.quantumHardware.name})`
    : `Quantum (${comparison.quantumHardware.name})`

  if (!isAttackSupported(target, attack)) {
    return {
      classicalTime: 'Not applicable',
      quantumTime: 'Not applicable',
      classicalOps: Number.POSITIVE_INFINITY,
      quantumOps: Number.POSITIVE_INFINITY,
      verdict: 'neutral',
      note: `${attackTypes.find((entry) => entry.id === attack)?.name || 'This attack'} is not a meaningful model for ${target.label}.`,
      classicalAccuracy: 'No estimate returned because this attack does not line up with the selected target type.',
      quantumAccuracy: 'No estimate returned because this attack does not line up with the selected target type.',
      basisLabel: `${target.family} • ${target.parameterLabel}`,
      nistStrengthLabel: `${target.nistStrengthLabel} (${target.nistReference})`,
      classicalFormula: 'Classical formula disabled for this target / attack combination.',
      quantumFormula: 'Quantum formula disabled for this target / attack combination.',
      classicalHardwareLabel,
      quantumHardwareLabel,
      references: uniqueItems(target.references),
      assumptions: [],
      exceptions: uniqueItems(target.exceptions || []),
    }
  }

  let classicalOps = Number.POSITIVE_INFINITY
  let quantumOps = Number.POSITIVE_INFINITY
  let classicalTime = 'Not applicable'
  let quantumTime = 'Not applicable'
  let classicalFormula = 'Not modeled.'
  let quantumFormula = 'Not modeled.'
  let classicalSeconds = Number.POSITIVE_INFINITY
  let quantumSeconds = Number.POSITIVE_INFINITY
  let classicalAccuracy =
    'Uses NIST-equivalent security strength where available. Classical hardware throughput is treated as a workload proxy rather than an algorithm-specific benchmark suite.'
  let quantumAccuracy =
    'Quantum estimates combine standard query complexity with literature-backed threshold assumptions. Real cost still depends heavily on oracle synthesis, code distance, and physical-qubit overhead.'
  const references = [...target.references]
  const assumptions = ['Expected attack cost is reported as mean work rather than worst-case work.']
  const exceptions = [...(target.exceptions || []), CLASSICAL_THROUGHPUT_EXCEPTION]

  if (attack === 'brute-force' && target.classicalSecurityBits) {
    classicalOps = expectedClassicalOps(target.classicalSecurityBits)
    classicalSeconds = classicalOps / comparison.classicalHardware.opsPerSecond
    classicalTime = formatTime(classicalSeconds)
    classicalFormula = `Expected classical work ≈ 2^${target.classicalSecurityBits - 1} generic operations using the NIST-aligned ${target.classicalSecurityBits}-bit security strength.`
    assumptions.push(
      `Classical comparison uses the NIST-equivalent ${target.classicalSecurityBits}-bit security strength instead of the raw parameter size.`,
    )

    if (target.groverSecurityBits) {
      quantumOps = expectedGroverOps(target.groverSecurityBits)
      quantumSeconds = quantumOps / comparison.quantumHardware.opsPerSecond
      quantumTime = formatTime(quantumSeconds)
      quantumFormula = `Best-known quantum search analogue ≈ (π/4)·2^${(target.groverSecurityBits / 2).toFixed(1)} oracle calls.`
      references.push(GROVER_REFERENCE)
      assumptions.push(QUANTUM_LOGICAL_QUBIT_ASSUMPTION)
      const quantumTierAssumption = getQuantumTierAssumption(comparison.quantumHardware)
      if (quantumTierAssumption) {
        assumptions.push(quantumTierAssumption)
      }
      exceptions.push(QUANTUM_THROUGHPUT_EXCEPTION, GROVER_ORACLE_EXCEPTION)
    } else if (target.shorModel) {
      quantumFormula = 'For this public-key target the relevant quantum model is Shor, not Grover-style search. Use the Shor mode for a polynomial-time estimate.'
      quantumAccuracy = 'Quantum search is intentionally not applied here because factoring and discrete log are better modeled with Shor.'
      quantumTime = 'Use Shor model'
      assumptions.push('For RSA and ECC targets, the lab suppresses Grover and uses Shor as the relevant quantum attack model instead.')
    } else {
      quantumFormula = 'No direct quantum search speedup is modeled for this target.'
      quantumAccuracy = 'Post-quantum targets are not reduced to a Grover-style oracle model in this lab.'
      quantumTime = 'No direct speedup modeled'
    }
  }

  if (attack === 'dictionary' && target.dictionaryModel) {
    const guessRate = Math.max(comparison.classicalHardware.passwordGuessesPerSecond || 1, 1)
    classicalOps = expectedDictionaryGuesses(entropyBits)
    classicalSeconds = classicalOps / guessRate
    classicalTime = formatTime(classicalSeconds)
    classicalFormula = `Expected offline password work ≈ 2^${entropyBits - 1} guesses at about ${guessRate.toExponential(1)} PBKDF2 verifications/sec.`

    quantumFormula = 'No practical quantum speedup is modeled for salted offline password checking here; NIST guidance focuses on memorized-secret entropy, blocklists, and verifier cost rather than a Grover-style password formula.'
    quantumAccuracy = 'Password guessing remains dominated by human-secret choice and verifier cost. The lab intentionally avoids claiming a meaningful quantum shortcut for PBKDF2 dictionary attacks.'
    quantumTime = 'No practical speedup modeled'
    classicalAccuracy = target.dictionaryModel.notes
    assumptions.push(
      'Entropy slider represents effective memorized-secret entropy after human bias, reuse, and blocklist filtering.',
      `${comparison.classicalHardware.name} is the active PBKDF2 verifier profile for the displayed classical guess rate.`,
    )
  }

  if (attack === 'grover' && target.groverSecurityBits && target.classicalSecurityBits) {
    classicalOps = expectedClassicalOps(target.classicalSecurityBits)
    quantumOps = expectedGroverOps(target.groverSecurityBits)
    classicalSeconds = classicalOps / comparison.classicalHardware.opsPerSecond
    quantumSeconds = quantumOps / comparison.quantumHardware.opsPerSecond
    classicalTime = formatTime(classicalSeconds)
    quantumTime = formatTime(quantumSeconds)
    classicalFormula = `Classical baseline ≈ 2^${target.classicalSecurityBits - 1} generic operations.`
    quantumFormula = `Grover estimate ≈ (π/4)·2^${(target.groverSecurityBits / 2).toFixed(1)} oracle calls.`
    quantumAccuracy = 'This is an ideal Grover query-count model with comparative hardware scaling. Real cost is usually dominated by oracle synthesis and fault-tolerant scheduling.'
    references.push(GROVER_REFERENCE)
    assumptions.push(QUANTUM_LOGICAL_QUBIT_ASSUMPTION)
    const quantumTierAssumption = getQuantumTierAssumption(comparison.quantumHardware)
    if (quantumTierAssumption) {
      assumptions.push(quantumTierAssumption)
    }
    exceptions.push(QUANTUM_THROUGHPUT_EXCEPTION, GROVER_ORACLE_EXCEPTION)
  }

  if (attack === 'shor' && target.shorModel && target.classicalSecurityBits) {
    classicalOps = expectedClassicalOps(target.classicalSecurityBits)
    classicalSeconds = classicalOps / comparison.classicalHardware.opsPerSecond
    classicalTime = formatTime(classicalSeconds)
    classicalFormula = `Classical baseline uses the NIST-equivalent ${target.classicalSecurityBits}-bit strength, giving about 2^${target.classicalSecurityBits - 1} generic operations.`
    references.push(target.shorModel.reference)
    assumptions.push(
      QUANTUM_LOGICAL_QUBIT_ASSUMPTION,
      `Near-threshold Shor runtime is anchored at about ${target.shorModel.requiredLogicalQubits.toLocaleString()} logical qubits and ${target.shorModel.baseHoursAtThreshold.toFixed(0)} hours, then scaled comparatively across the modeled quantum tiers.`,
    )
    const quantumTierAssumption = getQuantumTierAssumption(comparison.quantumHardware)
    if (quantumTierAssumption) {
      assumptions.push(quantumTierAssumption)
    }
    exceptions.push(...target.shorModel.exceptions)

    const availableQubits = comparison.quantumHardware.qubits || 0
    if (availableQubits < target.shorModel.requiredLogicalQubits) {
      quantumFormula = `Shor requires roughly ${target.shorModel.requiredLogicalQubits.toLocaleString()} logical qubits for this target. The modeled quantum machine only has ${availableQubits.toLocaleString()}.`
      quantumTime = 'Below logical-qubit threshold'
      quantumAccuracy = `${target.shorModel.notes} This threshold check is simplified but more honest than pretending a small quantum machine can already run Shor end to end.`
    } else {
      const referenceQuantum = getHardwareProfile(QUANTUM_REFERENCE_ID)
      const throughputScale = Math.max(comparison.quantumHardware.opsPerSecond / referenceQuantum.opsPerSecond, 0.05)
      const qubitScale = Math.pow(target.shorModel.requiredLogicalQubits / availableQubits, 1.25)
      const quantumHours = target.shorModel.baseHoursAtThreshold * qubitScale / throughputScale
      quantumSeconds = quantumHours * 3600
      quantumOps = Math.pow(target.classicalSecurityBits, 3)
      quantumTime = formatTime(quantumSeconds)
      quantumFormula = `Polynomial-time Shor model anchored at about ${target.shorModel.requiredLogicalQubits.toLocaleString()} logical qubits and ${target.shorModel.baseHoursAtThreshold.toFixed(0)} hours near threshold, then scaled by qubit count and quantum throughput.`
      quantumAccuracy = `${target.shorModel.notes} Runtime remains highly speculative because real fault-tolerant resource estimates depend heavily on code distance, gate synthesis, and architectural overhead.`
      exceptions.push(QUANTUM_THROUGHPUT_EXCEPTION)
    }
  }

  const verdict = getVerdict(getFastestModeledSeconds(classicalSeconds, quantumSeconds))
  if (attack === 'dictionary') {
    verdict.note = 'Dictionary attacks now use effective secret entropy and verifier cost instead of a fixed 100-million-entry wordlist.'
  }

  return {
    classicalTime,
    quantumTime,
    classicalOps,
    quantumOps,
    verdict: verdict.verdict,
    note: verdict.note,
    classicalAccuracy,
    quantumAccuracy,
    basisLabel: `${target.family} • ${target.parameterLabel}`,
    nistStrengthLabel: `${target.nistStrengthLabel} (${target.nistReference})`,
    classicalFormula,
    quantumFormula,
    classicalHardwareLabel,
    quantumHardwareLabel,
    references: uniqueItems(references),
    assumptions: uniqueItems(assumptions),
    exceptions: uniqueItems(exceptions),
  }
}

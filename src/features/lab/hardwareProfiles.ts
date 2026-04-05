export interface HardwareProfile {
  id: string
  name: string
  category: 'classical' | 'quantum'
  processor: string
  cores: string
  qubits?: number
  opsPerSecond: number
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
    description: 'Standard office workstation with integrated graphics',
  },
  {
    id: 'gaming-desktop',
    name: 'Gaming Desktop',
    category: 'classical',
    processor: 'AMD Ryzen 9 7950X + RTX 4090',
    cores: '16 cores / 32 threads + 16384 CUDA',
    opsPerSecond: 2e10,
    description: 'High-end consumer hardware with GPU acceleration',
  },
  {
    id: 'dual-xeon',
    name: 'Dual Xeon Server',
    category: 'classical',
    processor: '2x Intel Xeon Platinum 8480+',
    cores: '112 cores / 224 threads',
    opsPerSecond: 8e10,
    description: 'Enterprise rack server with high core count',
  },
  {
    id: 'epyc-rack',
    name: 'EPYC Rack Node',
    category: 'classical',
    processor: 'AMD EPYC 9654 + 8x A100',
    cores: '96 cores + 8 GPUs',
    opsPerSecond: 5e11,
    description: 'GPU-accelerated compute node for parallel workloads',
  },
  {
    id: 'hpc-cluster',
    name: 'HPC Cluster',
    category: 'classical',
    processor: 'National Lab Supercomputer',
    cores: '500,000+ cores',
    opsPerSecond: 1e15,
    description: 'Top-tier supercomputer cluster with exascale potential',
  },
  {
    id: 'exascale',
    name: 'Exascale System',
    category: 'classical',
    processor: 'Frontier / Aurora class',
    cores: '8M+ cores',
    opsPerSecond: 1e18,
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
    processor: 'Hypothetical fault-tolerant',
    cores: 'N/A',
    qubits: 5000,
    opsPerSecond: 1e9,
    description: 'Future fault-tolerant quantum computer with error correction',
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

export const attackTypes: AttackModel[] = [
  {
    id: 'brute-force',
    name: 'Brute Force',
    description: 'Exhaustively try all possible keys',
    quantumOnly: false,
    howItWorks:
      'The attacker simply enumerates every possible key until a decryption looks valid. On average, success arrives after trying about half the keyspace.',
    math:
      'Keyspace size N = 2^k for a k-bit key. Expected work is about N/2 trials. If the machine can test R keys/second, the expected time is (2^k / (2·R)) seconds.',
  },
  {
    id: 'dictionary',
    name: 'Dictionary Attack',
    description: 'Try common passwords and variations',
    quantumOnly: false,
    howItWorks:
      'Instead of all possible keys, the attacker tries a curated list: leaked passwords, common patterns, and mangled variants. Human-chosen secrets often fall into this much smaller set.',
    math:
      'If the effective dictionary size is D and the checker can test R candidates/second, then the worst-case time is about D / R seconds. Real success probability depends on how human choices overlap with the dictionary.',
  },
  {
    id: 'grover',
    name: "Grover's Search",
    description: 'Quantum algorithm providing quadratic speedup on search',
    quantumOnly: true,
    howItWorks:
      'Grover amplifies the probability of the correct key by repeatedly applying a quantum oracle and diffusion operator. After about √N iterations, measuring the state yields the right key with high probability.',
    math:
      'For an unstructured search space of size N = 2^k, Grover needs about (π/4)·√N ≈ (π/4)·2^{k/2} oracle calls. This effectively halves the security level in bits: a k-bit key behaves like ~k/2 bits against ideal quantum search.',
  },
  {
    id: 'shor',
    name: "Shor's Algorithm",
    description: 'Quantum algorithm for factoring large integers and discrete logarithms',
    quantumOnly: true,
    howItWorks:
      'Shor reduces factoring or discrete log to finding the period of a modular exponentiation function. A quantum Fourier transform recovers this period efficiently, revealing the secret factors or exponents.',
    math:
      'On an ideal fault-tolerant quantum computer, Shor runs in time polynomial in the key size n, often modelled as O(n^3) elementary operations. Classically, the best known factoring algorithms scale super-polynomially (e.g., exp((log n)^{1/3}(log log n)^{2/3})), so the quantum speedup is dramatic.',
  },
]

export interface SimulationResult {
  classicalTime: string
  quantumTime: string
  classicalOps: number
  quantumOps: number
  verdict: 'safe' | 'warn' | 'critical'
  note: string
  classicalAccuracy: string
  quantumAccuracy: string
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds > 1e30) return '> Age of Universe'
  if (seconds > 3.154e7 * 1e12) return `${(seconds / (3.154e7 * 1e12)).toFixed(1)} trillion years`
  if (seconds > 3.154e7 * 1e9) return `${(seconds / (3.154e7 * 1e9)).toFixed(1)} billion years`
  if (seconds > 3.154e7 * 1e6) return `${(seconds / (3.154e7 * 1e6)).toFixed(1)} million years`
  if (seconds > 3.154e7 * 1000) return `${(seconds / (3.154e7 * 1000)).toFixed(1)} thousand years`
  if (seconds > 3.154e7) return `${(seconds / 3.154e7).toFixed(1)} years`
  if (seconds > 86400) return `${(seconds / 86400).toFixed(1)} days`
  if (seconds > 3600) return `${(seconds / 3600).toFixed(1)} hours`
  if (seconds > 60) return `${(seconds / 60).toFixed(1)} minutes`
  if (seconds > 1) return `${seconds.toFixed(1)} seconds`
  return `${(seconds * 1000).toFixed(1)} milliseconds`
}

export function runSimulation(
  keyBits: number,
  attack: AttackType,
  hardware: HardwareProfile,
): SimulationResult {
  let classicalOps: number
  let quantumOps: number

  switch (attack) {
    case 'brute-force':
      classicalOps = Math.pow(2, keyBits)
      quantumOps = Math.pow(2, keyBits / 2) // Grover's gives sqrt speedup
      break
    case 'dictionary':
      classicalOps = 1e8 // ~100M common passwords
      quantumOps = 1e4 // Quantum has less advantage on dictionary
      break
    case 'grover':
      classicalOps = Math.pow(2, keyBits)
      quantumOps = Math.pow(2, keyBits / 2)
      break
    case 'shor':
      classicalOps = Math.pow(2, keyBits)
      // Shor's is polynomial: O(n^3) for n-bit key
      quantumOps = Math.pow(keyBits, 3)
      break
  }

  const classicalSeconds = classicalOps / hardware.opsPerSecond
  const quantumSeconds = hardware.category === 'quantum'
    ? quantumOps / hardware.opsPerSecond
    : quantumOps / 1e6 // hypothetical quantum speed

  let verdict: 'safe' | 'warn' | 'critical'
  let note: string

  if (classicalSeconds > 3.154e7 * 1e9) { // > 1 billion years
    verdict = 'safe'
    note = 'Strong security margin. Not feasible with current or near-term hardware.'
  } else if (classicalSeconds > 3.154e7 * 100) { // > 100 years
    verdict = 'warn'
    note = 'Moderate margin. Consider upgrading key size for long-term protection.'
  } else {
    verdict = 'critical'
    note = 'Vulnerable. Key can be broken within a practical timeframe.'
  }

  // Override for Shor's with quantum hardware
  if (attack === 'shor' && hardware.category === 'quantum' && hardware.qubits && hardware.qubits >= keyBits / 2) {
    verdict = 'critical'
    note = "Shor's algorithm on sufficient qubits breaks this in polynomial time."
  }

  const classicalAccuracy = attack === 'dictionary'
    ? 'Very low accuracy: real-world password choices dominate dictionary attacks; this is only an illustrative upper bound.'
    : `Order-of-magnitude estimate only (±10x–100x). Assumes an ideal implementation sustaining ~${hardware.opsPerSecond.toExponential(1)} key tests per second without overhead.`

  const quantumAccuracy = hardware.category === 'quantum'
    ? "Extremely speculative: simplifies qubit quality, error correction, and algorithmic overhead. Use for intuition about trends, not precise prediction."
    : 'Not tied to the selected hardware. Uses a fictional baseline quantum device (~1e6 quantum ops/sec); accuracy is extremely low and purely illustrative.'

  return {
    classicalTime: formatTime(classicalSeconds),
    quantumTime: formatTime(quantumSeconds),
    classicalOps,
    quantumOps,
    verdict,
    note,
    classicalAccuracy,
    quantumAccuracy,
  }
}

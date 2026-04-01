const BENCHMARK_DEFAULTS = {
  iterations: 100,
  warmupRuns: 10
};

function getSchnorrBenchmarks() {
  return {
    algorithm: 'Schnorr Protocol',
    type: 'Interactive ZK Proof (Non-Interactive via Fiat-Shamir)',
    securityAssumption: 'Discrete Logarithm',
    
    operations: {
      prove: {
        description: 'Prove knowledge of discrete log',
        estimatedMs: 0.5,
        estimatedOpsPerSecond: 2000,
        latency: '~0.5 milliseconds',
        communicationRounds: 3,
        proofSize: '3 group elements (~96 bytes)'
      },
      verify: {
        description: 'Verify ZK proof',
        estimatedMs: 0.3,
        estimatedOpsPerSecond: 3333,
        latency: '~0.3 milliseconds',
        verificationComplexity: 'O(1)'
      },
      keyGen: {
        description: 'Generate prover/verifier key pair',
        estimatedMs: 1,
        estimatedOpsPerSecond: 1000,
        latency: '~1 millisecond'
      }
    },
    
    complexity: {
      proverTime: 'O(n)',
      verifierTime: 'O(1)',
      proofSize: 'O(1)',
      communication: 'O(1)'
    },
    
    useCases: [
      'Authentication protocols',
      'Multi-signature schemes',
      'Foundation for other ZK protocols'
    ],
    
    notes: 'Foundational ZK protocol. Simple and efficient but requires interaction unless Fiat-Shamir transform is applied.'
  };
}

function getZKSNARKBenchmarks() {
  return {
    algorithm: 'zk-SNARK',
    type: 'Succinct Non-interactive ARgument of Knowledge',
    securityAssumption: 'Knowledge of Exponent (KEA) + Trusted Setup',
    
    operations: {
      prove: {
        description: 'Generate succinct proof (R1CS circuit)',
        estimatedMs: 5000,
        estimatedOpsPerSecond: 0.2,
        latency: '~5 seconds for typical circuit',
        circuitSize: '1M constraints',
        memoryUsage: '~4GB RAM'
      },
      verify: {
        description: 'Verify ZK proof',
        estimatedMs: 0.01,
        estimatedOpsPerSecond: 100000,
        latency: '~10 microseconds',
        verificationComplexity: 'O(1) regardless of circuit size'
      },
      setup: {
        description: 'Generate trusted setup parameters',
        estimatedMs: 60000,
        estimatedOpsPerSecond: 0.017,
        latency: '~1 minute',
        toxicWaste: 'Requires secure ceremony to destroy'
      }
    },
    
    complexity: {
      proverTime: 'O(N * log N)',
      verifierTime: 'O(1)',
      proofSize: 'O(1) ~200 bytes',
      proofGenerationMemory: 'O(N)',
      communication: 'O(1)'
    },
    
    proofDetails: {
      proofSize: '~200 bytes',
      verificationTime: '~10ms',
      proverMemory: 'GB to TB depending on circuit'
    },
    
    useCases: [
      'Zcash privacy coins',
      'Ethereum zkEVMs (Polygon, zkSync)',
      'Layer 2 scaling solutions'
    ],
    
    notes: 'Requires trusted setup ceremony. Very short proofs but complex circuit compilation.'
  };
}

function getZKSTARKBenchmarks() {
  return {
    algorithm: 'zk-STARK',
    type: 'Scalable Transparent ARgument of Knowledge',
    securityAssumption: 'Collision-resistant hashes (no trusted setup)',
    
    operations: {
      prove: {
        description: 'Generate transparent proof',
        estimatedMs: 30000,
        estimatedOpsPerSecond: 0.033,
        latency: '~30 seconds',
        proverTimeComplexity: 'O(N * polylog N)',
        memoryUsage: '~8GB RAM'
      },
      verify: {
        description: 'Verify ZK proof',
        estimatedMs: 50,
        estimatedOpsPerSecond: 20,
        latency: '~50 milliseconds',
        verificationComplexity: 'O(polylog N)'
      },
      setup: {
        description: 'No trusted setup required',
        estimatedMs: 0,
        estimatedOpsPerSecond: Infinity,
        latency: 'N/A - transparent',
        note: 'No toxic waste, no ceremony needed'
      }
    },
    
    complexity: {
      proverTime: 'O(N * polylog N)',
      verifierTime: 'O(polylog N)',
      proofSize: 'O(polylog N) ~100KB-500KB',
      communication: 'O(polylog N)',
      quantumSecurity: 'Yes (hash-based)'
    },
    
    proofDetails: {
      proofSize: '~100KB - 500KB (larger than SNARK)',
      verificationTime: '~50ms',
      proverTime: '~30s',
      quantumResistant: true
    },
    
    useCases: [
      'StarkEx (StarkWare)',
      'StarkNet rollup',
      'Privacy-preserving computations'
    ],
    
    notes: 'No trusted setup required. Quantum-resistant. Larger proofs than SNARKs but more transparent.'
  };
}

function getBulletproofsBenchmarks() {
  return {
    algorithm: 'Bulletproofs',
    type: 'Short Proofs for Arithmetic Circuits',
    securityAssumption: 'Discrete Logarithm + Pedersen Commitments',
    
    operations: {
      prove: {
        description: 'Generate proof for range proof or circuit',
        estimatedMs: 500,
        estimatedOpsPerSecond: 2,
        latency: '~500ms for 64-bit range proof',
        proofSizeComplexity: 'O(log n)',
        innerProductArguments: 128
      },
      verify: {
        description: 'Verify bulletproof',
        estimatedMs: 200,
        estimatedOpsPerSecond: 5,
        latency: '~200ms',
        verificationComplexity: 'O(n) - linear in proof size'
      },
      aggregateProofs: {
        description: 'Aggregate multiple proofs (bundling)',
        estimatedMs: 100,
        estimatedOpsPerSecond: 10,
        latency: '~100ms for aggregation',
        notes: 'Proofs can be aggregated to reduce verification time'
      }
    },
    
    complexity: {
      proverTime: 'O(N * log N)',
      verifierTime: 'O(N)',
      proofSize: 'O(log N) ~1-2KB',
      communication: 'O(log N)',
      aggregationBenefit: 'Verification becomes O(log N) when aggregated'
    },
    
    proofDetails: {
      proofSize: '~1KB - 2KB for 64-bit range',
      proofSizeReduction: 'Aggregated proofs reduce to ~O(log N) elements'
    },
    
    useCases: [
      'Monero privacy (RingCT)',
      'Confidential transactions',
      'Range proofs for blockchain'
    ],
    
    notes: 'Used in Monero for confidential transactions. No trusted setup, but verification is linear.'
  };
}

async function benchmarkSchnorr() {
  return getSchnorrBenchmarks();
}

async function benchmarkZKSNARK(circuitSize = '1M') {
  return getZKSNARKBenchmarks();
}

async function benchmarkZKSTARK() {
  return getZKSTARKBenchmarks();
}

async function benchmarkBulletproofs() {
  return getBulletproofsBenchmarks();
}

async function benchmarkAllZeroKnowledge() {
  return {
    schnorr: getSchnorrBenchmarks(),
    zkSNARK: getZKSNARKBenchmarks(),
    zkSTARK: getZKSTARKBenchmarks(),
    bulletproofs: getBulletproofsBenchmarks(),
    disclaimer: 'Zero-knowledge proof benchmarks vary significantly based on implementation, circuit size, and programming framework (ZoKrates, Circom, etc.). Values shown are typical estimates.'
  };
}

module.exports = {
  benchmarkAllZeroKnowledge,
  benchmarkSchnorr,
  benchmarkZKSNARK,
  benchmarkZKSTARK,
  benchmarkBulletproofs,
  getSchnorrBenchmarks,
  getZKSNARKBenchmarks,
  getZKSTARKBenchmarks,
  getBulletproofsBenchmarks,
  BENCHMARK_DEFAULTS
};

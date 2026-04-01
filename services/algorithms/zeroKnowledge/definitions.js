const ZERO_KNOWLEDGE_DEFINITIONS = {
  schnorr: {
    id: 'schnorr',
    name: 'Schnorr Protocol',
    type: 'Interactive ZK Proof (Fiat-Shamir NIZK)',
    securityAssumption: 'Discrete Logarithm',
    proofSize: 'O(1) - 3 group elements',
    verificationTime: 'O(1)',
    notes: 'Foundational ZK protocol. Linear proofs.'
  },
  zk_snark: {
    id: 'zk-snark',
    name: 'zk-SNARK',
    type: 'Succinct Non-interactive ARgument of Knowledge',
    securityAssumption: 'KEA + Trusted Setup',
    proofSize: 'O(1) - ~200 bytes',
    verificationTime: 'O(1)',
    proverTime: 'O(N log N)',
    notes: 'Zcash, Ethereum zkEVMs. Requires ceremony.'
  },
  zk_stark: {
    id: 'zk-stark',
    name: 'zk-STARK',
    type: 'Scalable Transparent ARgument of Knowledge',
    securityAssumption: 'Collision-resistant hash',
    proofSize: 'O(polylog N) - 100KB-500KB',
    verificationTime: 'O(polylog N)',
    proverTime: 'O(N polylog N)',
    notes: 'No trusted setup. Quantum-resistant. Larger proofs.'
  },
  bulletproofs: {
    id: 'bulletproofs',
    name: 'Bulletproofs',
    type: 'Short Proofs for Arithmetic Circuits',
    securityAssumption: 'Discrete Log + Pedersen',
    proofSize: 'O(log N) - 1-2KB',
    verificationTime: 'O(N)',
    proverTime: 'O(N log N)',
    notes: 'Monero RingCT. No trusted setup.'
  }
};

module.exports = {
  ZERO_KNOWLEDGE_DEFINITIONS
};

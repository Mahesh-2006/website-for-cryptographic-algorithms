export const SECONDS_IN_YEAR = 31536000n;
export const SECONDS_IN_DAY = 86400n;
export const SECONDS_IN_HOUR = 3600n;
export const SECONDS_IN_MINUTE = 60n;

export const UNIVERSE_AGE_YEARS = 13.8e9;
export const UNIVERSE_AGE_SECONDS = BigInt(Math.floor(UNIVERSE_AGE_YEARS)) * SECONDS_IN_YEAR;

export const MAX_BIGINT = BigInt(Number.MAX_SAFE_INTEGER);

export const QUANTUM_GROVER_QUBITS_REQUIRED = {
  aes128: 3000,
  aes192: 4500,
  aes256: 7000
};

export const CATEGORY_ORDER = [
  'symmetric',
  'hash',
  'mac',
  'authenticatedEncryption',
  'asymmetric',
  'digitalSignatures',
  'keyExchange',
  'passwordHashing',
  'postQuantum',
  'zeroKnowledge',
  'homomorphic'
];

export const CATEGORY_DISPLAY_NAMES = {
  symmetric: 'Symmetric Encryption',
  hash: 'Hash Functions',
  mac: 'Message Authentication Codes',
  authenticatedEncryption: 'Authenticated Encryption',
  asymmetric: 'Asymmetric Encryption',
  digitalSignatures: 'Digital Signatures',
  keyExchange: 'Key Exchange',
  passwordHashing: 'Password Hashing',
  postQuantum: 'Post-Quantum Cryptography',
  zeroKnowledge: 'Zero-Knowledge Proofs',
  homomorphic: 'Homomorphic Encryption'
};

export const SECURITY_LEVELS = {
  DEPRECATED: { label: 'Deprecated', color: 'red', severity: 1 },
  WEAK: { label: 'Weak', color: 'orange', severity: 2 },
  LEGACY: { label: 'Legacy', color: 'yellow', severity: 3 },
  STANDARD: { label: 'Standard', color: 'green', severity: 4 },
  STRONG: { label: 'Strong', color: 'darkgreen', severity: 5 },
  QUANTUM_RESISTANT: { label: 'Quantum Resistant', color: 'blue', severity: 6 }
};

export const BENCHMARK_DEFAULTS = {
  dataSize: 65536,
  iterations: 10000,
  warmupRuns: 100
};

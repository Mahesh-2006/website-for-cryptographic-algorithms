const SECONDS_IN_YEAR = 31536000n;
const SECONDS_IN_DAY = 86400n;
const SECONDS_IN_HOUR = 3600n;
const SECONDS_IN_MINUTE = 60n;

const UNIVERSE_AGE_YEARS = 13.8e9;
const UNIVERSE_AGE_SECONDS = BigInt(Math.floor(UNIVERSE_AGE_YEARS)) * SECONDS_IN_YEAR;

const MAX_BIGINT = BigInt(Number.MAX_SAFE_INTEGER);

const QUANTUM_GROVER_QUBITS_REQUIRED = {
  aes128: 3000,
  aes192: 4500,
  aes256: 7000
};

const CATEGORY_ORDER = [
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

const CATEGORY_DISPLAY_NAMES = {
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

const SECURITY_LEVELS = {
  DEPRECATED: { label: 'Deprecated', color: 'red', severity: 1 },
  WEAK: { label: 'Weak', color: 'orange', severity: 2 },
  LEGACY: { label: 'Legacy', color: 'yellow', severity: 3 },
  STANDARD: { label: 'Standard', color: 'green', severity: 4 },
  STRONG: { label: 'Strong', color: 'darkgreen', severity: 5 },
  QUANTUM_RESISTANT: { label: 'Quantum Resistant', color: 'blue', severity: 6 }
};

const BENCHMARK_DEFAULTS = {
  dataSize: 65536,
  iterations: 10000,
  warmupRuns: 100
};

module.exports = {
  SECONDS_IN_YEAR,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
  UNIVERSE_AGE_YEARS,
  UNIVERSE_AGE_SECONDS,
  MAX_BIGINT,
  QUANTUM_GROVER_QUBITS_REQUIRED,
  CATEGORY_ORDER,
  CATEGORY_DISPLAY_NAMES,
  SECURITY_LEVELS,
  BENCHMARK_DEFAULTS
};

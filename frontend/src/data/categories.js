const CATEGORIES = [
  {
    id: 'symmetric',
    name: 'Symmetric Encryption',
    icon: '🔐',
    description: 'AES, ChaCha20, Blowfish and other symmetric ciphers',
    color: '#3b82f6'
  },
  {
    id: 'hash',
    name: 'Hash Functions',
    icon: '#️⃣',
    description: 'SHA, BLAKE, Keccak and other cryptographic hashes',
    color: '#8b5cf6'
  },
  {
    id: 'mac',
    name: 'Message Authentication',
    icon: '🔏',
    description: 'HMAC, CMAC, Poly1305 and other MACs',
    color: '#ec4899'
  },
  {
    id: 'authenticatedEncryption',
    name: 'Authenticated Encryption',
    icon: '🛡️',
    description: 'AEAD modes: GCM, CCM, ChaCha20-Poly1305',
    color: '#22c55e'
  },
  {
    id: 'asymmetric',
    name: 'Asymmetric Encryption',
    icon: '🔑',
    description: 'RSA, ElGamal, ECC encryption schemes',
    color: '#f59e0b'
  },
  {
    id: 'digitalSignatures',
    name: 'Digital Signatures',
    icon: '📝',
    description: 'RSA, ECDSA, EdDSA signature schemes',
    color: '#14b8a6'
  },
  {
    id: 'keyExchange',
    name: 'Key Exchange',
    icon: '🤝',
    description: 'DH, ECDH, X25519 key agreement protocols',
    color: '#06b6d4'
  },
  {
    id: 'passwordHashing',
    name: 'Password Hashing',
    icon: '🔒',
    description: 'bcrypt, scrypt, Argon2 password hashing',
    color: '#ef4444'
  },
  {
    id: 'postQuantum',
    name: 'Post-Quantum Cryptography',
    icon: '⚛️',
    description: 'Kyber, Dilithium, SPHINCS+ NIST standards',
    color: '#a855f7'
  },
  {
    id: 'zeroKnowledge',
    name: 'Zero-Knowledge Proofs',
    icon: '🎭',
    description: 'SNARKs, STARKs, Schnorr protocols',
    color: '#f97316'
  },
  {
    id: 'homomorphic',
    name: 'Homomorphic Encryption',
    icon: '🧮',
    description: 'Paillier, CKKS, BFV, TFHE schemes',
    color: '#84cc16'
  }
];

const SECURITY_LEVELS = [
  { 
    id: 'QUANTUM_RESISTANT', 
    label: 'QUANTUM RESISTANT', 
    color: '#22c55e',
    severity: 6,
    description: 'Secure against quantum computers'
  },
  { 
    id: 'STRONG', 
    label: 'STRONG', 
    color: '#3b82f6',
    severity: 5,
    description: 'High security, widely used'
  },
  { 
    id: 'STANDARD', 
    label: 'STANDARD', 
    color: '#14b8a6',
    severity: 4,
    description: 'Standard security level'
  },
  { 
    id: 'LEGACY', 
    label: 'LEGACY', 
    color: '#f59e0b',
    severity: 3,
    description: 'Still used but not recommended for new systems'
  },
  { 
    id: 'WEAK', 
    label: 'WEAK', 
    color: '#ef4444',
    severity: 2,
    description: 'Known vulnerabilities, use with caution'
  },
  { 
    id: 'DEPRECATED', 
    label: 'DEPRECATED', 
    color: '#6b7280',
    severity: 1,
    description: 'Should not be used'
  }
];

export { CATEGORIES, SECURITY_LEVELS };
export default CATEGORIES;

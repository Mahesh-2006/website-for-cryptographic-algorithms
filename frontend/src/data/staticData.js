import { CATEGORY_ORDER, CATEGORY_DISPLAY_NAMES, SECURITY_LEVELS } from './constants.js';

// Static data for GitHub Pages - extracted from the backend registry
export const STATIC_CATEGORIES = [
  {
    id: 'symmetric',
    name: 'Symmetric Encryption',
    description: 'Symmetric key algorithms use the same key for encryption and decryption.',
    icon: '🔐',
    count: 3
  },
  {
    id: 'hash',
    name: 'Hash Functions',
    description: 'Cryptographic hash functions map arbitrary data to fixed-size outputs.',
    icon: '#️⃣',
    count: 4
  },
  {
    id: 'mac',
    name: 'Message Authentication Codes',
    description: 'Message Authentication Codes provide integrity and authenticity verification.',
    icon: '🔏',
    count: 3
  },
  {
    id: 'authenticatedEncryption',
    name: 'Authenticated Encryption',
    description: 'AEAD schemes provide both confidentiality and authentication.',
    icon: '🛡️',
    count: 2
  },
  {
    id: 'asymmetric',
    name: 'Asymmetric Encryption',
    description: 'Public key cryptography uses key pairs for encryption and signatures.',
    icon: '🔑',
    count: 4
  },
  {
    id: 'digitalSignatures',
    name: 'Digital Signatures',
    description: 'Digital signatures provide authentication and non-repudiation.',
    icon: '📝',
    count: 3
  },
  {
    id: 'keyExchange',
    name: 'Key Exchange',
    description: 'Key exchange protocols establish shared secrets between parties.',
    icon: '🤝',
    count: 3
  },
  {
    id: 'passwordHashing',
    name: 'Password Hashing',
    description: 'Password hashing functions secure password storage against attacks.',
    icon: '🔒',
    count: 3
  },
  {
    id: 'postQuantum',
    name: 'Post-Quantum Cryptography',
    description: 'Post-quantum algorithms resist attacks from quantum computers.',
    icon: '⚛️',
    count: 2
  },
  {
    id: 'zeroKnowledge',
    name: 'Zero-Knowledge Proofs',
    description: 'Zero-knowledge proofs verify knowledge without revealing it.',
    icon: '🎭',
    count: 1
  },
  {
    id: 'homomorphic',
    name: 'Homomorphic Encryption',
    description: 'Homomorphic encryption allows computation on encrypted data.',
    icon: '🧮',
    count: 1
  }
];

export const STATIC_ALGORITHMS = [
  // Symmetric Encryption
  {
    id: 'aes-128',
    name: 'AES-128',
    category: 'symmetric',
    categoryDisplay: 'Symmetric Encryption',
    type: 'block_cipher',
    securityParams: { keySize: 128, blockSize: 128, rounds: 10 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      decryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      keyGeneration: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      classical: { operations: '2^128', type: 'brute_force', years: Infinity },
      quantumGrover: { operations: '2^64', type: 'grover', years: 'negligible' }
    },
    educational: {
      description: 'Advanced Encryption Standard with 128-bit key. Symmetric block cipher standardized by NIST in 2001, now the gold standard for encryption worldwide.',
      useCases: ['TLS/SSL', 'File Encryption', 'Disk Encryption', 'Wireless Security'],
      pros: ['Fast and efficient', 'Widely studied and verified', 'Hardware acceleration'],
      cons: ['Key distribution challenge', 'Same key for encrypt/decrypt'],
      invented: 1997,
      standardized: 'NIST FIPS 197'
    },
    implementation: { nodeCrypto: 'aes-128', webCrypto: 'AES-128' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-256',
    name: 'AES-256',
    category: 'symmetric',
    categoryDisplay: 'Symmetric Encryption',
    type: 'block_cipher',
    securityParams: { keySize: 256, blockSize: 128, rounds: 14 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      decryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      keyGeneration: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      classical: { operations: '2^256', type: 'brute_force', years: Infinity },
      quantumGrover: { operations: '2^128', type: 'grover', years: Infinity }
    },
    educational: {
      description: 'Advanced Encryption Standard with 256-bit key. Provides maximum security margin with AES, recommended for high-security applications.',
      useCases: ['Government classified data', 'Military communications', 'Financial data'],
      pros: ['Maximum security margin', 'Hardware acceleration', 'Future-proof'],
      cons: ['Slightly slower than AES-128'],
      invented: 1997,
      standardized: 'NIST FIPS 197'
    },
    implementation: { nodeCrypto: 'aes-256', webCrypto: 'AES-256' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'chacha20',
    name: 'ChaCha20',
    category: 'symmetric',
    categoryDisplay: 'Symmetric Encryption',
    type: 'stream_cipher',
    securityParams: { keySize: 256, nonceSize: 96 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      decryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      keyGeneration: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      classical: { operations: '2^256', type: 'brute_force', years: Infinity },
      quantumGrover: { operations: '2^128', type: 'grover', years: Infinity }
    },
    educational: {
      description: 'Modern stream cipher designed by Daniel Bernstein. Used in TLS 1.3 and provides excellent performance on software implementations.',
      useCases: ['TLS 1.3', 'Mobile applications', 'Embedded systems'],
      pros: ['Excellent software performance', 'No lookup tables needed', 'Quantum-resistant'],
      cons: ['Less hardware acceleration than AES'],
      invented: 2008,
      standardized: 'RFC 8439'
    },
    implementation: { nodeCrypto: 'chacha20-poly1305', webCrypto: null },
    securityLevel: SECURITY_LEVELS.STRONG
  },

  // Hash Functions
  {
    id: 'sha256',
    name: 'SHA-256',
    category: 'hash',
    categoryDisplay: 'Hash Functions',
    type: 'cryptographic_hash',
    securityParams: { outputSize: 256, blockSize: 512, rounds: 64 },
    complexity: {
      hashing: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      collision: { operations: '2^128', type: 'birthday_attack', years: Infinity },
      preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
    },
    educational: {
      description: 'Secure Hash Algorithm 256-bit. Part of the SHA-2 family, widely used for digital signatures, certificates, and blockchain.',
      useCases: ['Digital signatures', 'SSL/TLS certificates', 'Bitcoin blockchain', 'Password hashing'],
      pros: ['Widely supported', 'Well-studied', 'Hardware acceleration'],
      cons: ['SHA-3 provides better security margins'],
      invented: 2001,
      standardized: 'NIST FIPS 180-4'
    },
    implementation: { nodeCrypto: 'sha256', webCrypto: 'SHA-256' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'sha3-256',
    name: 'SHA3-256',
    category: 'hash',
    categoryDisplay: 'Hash Functions',
    type: 'cryptographic_hash',
    securityParams: { outputSize: 256, blockSize: 1600, rounds: 24 },
    complexity: {
      hashing: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      collision: { operations: '2^128', type: 'birthday_attack', years: Infinity },
      preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
    },
    educational: {
      description: 'Secure Hash Algorithm 3 with 256-bit output. Winner of NIST hash competition, provides better security margins than SHA-2.',
      useCases: ['Future-proof applications', 'High-security requirements', 'IoT devices'],
      pros: ['Quantum-resistant design', 'Different construction from SHA-2', 'Flexible output sizes'],
      cons: ['Slower than SHA-2 on some hardware'],
      invented: 2015,
      standardized: 'NIST FIPS 202'
    },
    implementation: { nodeCrypto: 'sha3-256', webCrypto: 'SHA-3' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'blake2b',
    name: 'BLAKE2b',
    category: 'hash',
    categoryDisplay: 'Hash Functions',
    type: 'cryptographic_hash',
    securityParams: { outputSize: 512, blockSize: 1024, rounds: 12 },
    complexity: {
      hashing: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      collision: { operations: '2^256', type: 'birthday_attack', years: Infinity },
      preimage: { operations: '2^512', type: 'brute_force', years: Infinity }
    },
    educational: {
      description: 'High-performance cryptographic hash function. Optimized for 64-bit platforms and provides excellent speed.',
      useCases: ['File integrity', 'Password hashing', 'Digital signatures'],
      pros: ['Very fast', 'Configurable output size', 'Simple design'],
      cons: ['Less widely adopted than SHA-256'],
      invented: 2012,
      standardized: 'RFC 7693'
    },
    implementation: { nodeCrypto: null, webCrypto: null },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'md5',
    name: 'MD5',
    category: 'hash',
    categoryDisplay: 'Hash Functions',
    type: 'cryptographic_hash',
    securityParams: { outputSize: 128, blockSize: 512, rounds: 64 },
    complexity: {
      hashing: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      collision: { operations: '2^64', type: 'birthday_attack', years: 0.000001 },
      preimage: { operations: '2^128', type: 'brute_force', years: Infinity }
    },
    educational: {
      description: 'Message Digest 5. Once widely used but now cryptographically broken. Demonstrates the importance of regular algorithm updates.',
      useCases: ['Legacy systems', 'File integrity (non-cryptographic)', 'Educational examples'],
      pros: ['Very fast', 'Simple implementation'],
      cons: ['Cryptographically broken', 'Should not be used for security'],
      invented: 1991,
      standardized: 'RFC 1321'
    },
    implementation: { nodeCrypto: 'md5', webCrypto: null },
    securityLevel: SECURITY_LEVELS.DEPRECATED
  },

  // MAC
  {
    id: 'hmac-sha256',
    name: 'HMAC-SHA256',
    category: 'mac',
    categoryDisplay: 'Message Authentication Codes',
    type: 'hmac',
    securityParams: { keySize: 256, hashFunction: 'SHA-256' },
    complexity: {
      mac: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      verification: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      forgery: { operations: '2^256', type: 'brute_force', years: Infinity }
    },
    educational: {
      description: 'Hash-based Message Authentication Code using SHA-256. Provides both integrity and authenticity guarantees.',
      useCases: ['API authentication', 'Session tokens', 'File integrity'],
      pros: ['Simple construction', 'Well-studied', 'Hardware acceleration'],
      cons: ['Requires key management'],
      invented: 1996,
      standardized: 'RFC 2104'
    },
    implementation: { nodeCrypto: 'sha256', webCrypto: 'HMAC' },
    securityLevel: SECURITY_LEVELS.STRONG
  },

  // Asymmetric
  {
    id: 'rsa-2048',
    name: 'RSA-2048',
    category: 'asymmetric',
    categoryDisplay: 'Asymmetric Encryption',
    type: 'rsa',
    securityParams: { keySize: 2048, modulusSize: 2048 },
    complexity: {
      encryption: { time: 'O(n³)', space: 'O(n²)', memory: 'O(n²)' },
      decryption: { time: 'O(n³)', space: 'O(n²)', memory: 'O(n²)' },
      keyGeneration: { time: 'O(n⁴)', space: 'O(n²)', memory: 'O(n²)' },
      signing: { time: 'O(n³)', space: 'O(n²)', memory: 'O(n²)' },
      verification: { time: 'O(n³)', space: 'O(n²)', memory: 'O(n²)' }
    },
    crackingComplexity: {
      classical: { operations: '2^2048', type: 'factorization', years: Infinity },
      quantumShor: { operations: '2^40', type: 'shor', years: 0.001 }
    },
    educational: {
      description: 'RSA cryptosystem with 2048-bit keys. Still widely used but vulnerable to quantum attacks via Shor\'s algorithm.',
      useCases: ['Digital certificates', 'Key exchange', 'Digital signatures'],
      pros: ['Simple implementation', 'Widely supported'],
      cons: ['Slow compared to symmetric crypto', 'Quantum-vulnerable'],
      invented: 1977,
      standardized: 'PKCS#1'
    },
    implementation: { nodeCrypto: 'rsa', webCrypto: 'RSASSA-PKCS1-v1_5' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'ecc-256',
    name: 'ECC-256 (secp256k1)',
    category: 'asymmetric',
    categoryDisplay: 'Asymmetric Encryption',
    type: 'ecc',
    securityParams: { keySize: 256, curve: 'secp256k1' },
    complexity: {
      encryption: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' },
      decryption: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' },
      keyGeneration: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' },
      signing: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' },
      verification: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' }
    },
    crackingComplexity: {
      classical: { operations: '2^128', type: 'discrete_log', years: Infinity },
      quantumShor: { operations: '2^64', type: 'shor', years: Infinity }
    },
    educational: {
      description: 'Elliptic Curve Cryptography using secp256k1 curve. Used in Bitcoin and provides excellent security per bit.',
      useCases: ['Bitcoin', 'Ethereum', 'Mobile applications', 'IoT'],
      pros: ['Small key sizes', 'Fast operations', 'Better quantum resistance'],
      cons: ['Complex mathematics', 'Implementation pitfalls'],
      invented: 1985,
      standardized: 'SEC 2'
    },
    implementation: { nodeCrypto: 'secp256k1', webCrypto: 'ECDSA' },
    securityLevel: SECURITY_LEVELS.STRONG
  },

  // Password Hashing
  {
    id: 'argon2id',
    name: 'Argon2id',
    category: 'passwordHashing',
    categoryDisplay: 'Password Hashing',
    type: 'password_hash',
    securityParams: { memory: '64 MB', iterations: 3, parallelism: 4 },
    complexity: {
      hashing: { time: 'O(memory × iterations)', space: 'O(memory)', memory: 'O(memory)' }
    },
    crackingComplexity: {
      dictionary: { operations: 'varies', type: 'memory_hard', years: 'varies' }
    },
    educational: {
      description: 'Winner of Password Hashing Competition. Provides excellent resistance against GPU and ASIC attacks.',
      useCases: ['Password storage', 'Key derivation', 'Cryptocurrency mining resistance'],
      pros: ['Memory-hard design', 'Configurable parameters', 'GPU-resistant'],
      cons: ['Slower than bcrypt', 'More complex implementation'],
      invented: 2019,
      standardized: 'RFC 9106'
    },
    implementation: { nodeCrypto: null, webCrypto: null },
    securityLevel: SECURITY_LEVELS.STRONG
  },

  // Post-Quantum
  {
    id: 'kyber-512',
    name: 'Kyber-512',
    category: 'postQuantum',
    categoryDisplay: 'Post-Quantum Cryptography',
    type: 'kem',
    securityParams: { securityLevel: 1, publicKeySize: 800, ciphertextSize: 768 },
    complexity: {
      keyGeneration: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' },
      encapsulation: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' },
      decapsulation: { time: 'O(n²)', space: 'O(n)', memory: 'O(n)' }
    },
    crackingComplexity: {
      classical: { operations: '2^128', type: 'lattice_reduction', years: Infinity },
      quantum: { operations: '2^64', type: 'quantum_lattice', years: Infinity }
    },
    educational: {
      description: 'Post-quantum key encapsulation mechanism based on lattice cryptography. Selected by NIST for standardization.',
      useCases: ['Future quantum-resistant encryption', 'Key exchange'],
      pros: ['Quantum-resistant', 'Small ciphertext size', 'Fast operations'],
      cons: ['New algorithm, less studied', 'Larger key sizes'],
      invented: 2017,
      standardized: 'NIST Round 3 Finalist'
    },
    implementation: { nodeCrypto: null, webCrypto: null },
    securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
  }
];

// Mock hardware data for static version
export const STATIC_HARDWARE = [
  {
    id: 'cpu-i9-13900k',
    name: 'Intel Core i9-13900K',
    category: 'cpu',
    performance: {
      singleThread: 3500, // MIPS
      multiThread: 42000, // MIPS
      price: 589
    },
    specs: {
      cores: 24,
      threads: 32,
      baseClock: '3.0 GHz',
      boostClock: '5.8 GHz'
    }
  },
  {
    id: 'gpu-rtx4090',
    name: 'NVIDIA RTX 4090',
    category: 'gpu',
    performance: {
      hashRate: 120000, // MH/s for SHA-256
      price: 1599
    },
    specs: {
      cudaCores: 16384,
      memory: '24 GB GDDR6X',
      tdp: 450
    }
  },
  {
    id: 'supercomputer-summit',
    name: 'IBM Summit',
    category: 'supercomputer',
    performance: {
      flops: 200000000, // 200 petaflops
      price: 200000000 // $200M
    },
    specs: {
      nodes: 4608,
      processors: 9216,
      memory: '10 PB'
    }
  }
];

// Mock benchmark data
export const getMockBenchmark = (algorithmId) => {
  const baseData = {
    algorithmId,
    iterations: 100000,
    totalTimeMs: Math.random() * 1000 + 500,
    operationsPerSecond: Math.floor(Math.random() * 1000000) + 100000,
    averageTimeMs: Math.random() * 0.01 + 0.005,
    throughputMBps: Math.random() * 100 + 50
  };

  // Add breakdown for some algorithms
  if (['aes-128', 'aes-256', 'sha256'].includes(algorithmId)) {
    baseData.breakdown = {
      setup: {
        operationsPerSecond: Math.floor(Math.random() * 100000) + 50000,
        averageTimeMs: Math.random() * 0.001 + 0.0005
      },
      process: {
        operationsPerSecond: Math.floor(Math.random() * 900000) + 100000,
        averageTimeMs: Math.random() * 0.008 + 0.002
      }
    };
  }

  return baseData;
};

// Mock attack time calculation
export const calculateMockAttackTime = (hardware, algorithm) => {
  const baseTime = Math.pow(2, algorithm.securityParams?.keySize || 128) / hardware.performance?.singleThread || 1000000;
  return {
    seconds: baseTime,
    hardware: hardware.name,
    algorithm: algorithm.name,
    estimated: true
  };
};
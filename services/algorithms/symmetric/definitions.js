const { SECURITY_LEVELS } = require('../../utils/constants');

const symmetricDefinitions = [
  {
    id: 'aes-128',
    name: 'AES-128',
    category: 'symmetric',
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
    id: 'aes-192',
    name: 'AES-192',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: 192, blockSize: 128, rounds: 12 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      decryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      keyGeneration: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      classical: { operations: '2^192', type: 'brute_force', years: Infinity },
      quantumGrover: { operations: '2^96', type: 'grover', years: Infinity }
    },
    educational: {
      description: 'Advanced Encryption Standard with 192-bit key. Provides higher security margin than AES-128 with minimal performance impact.',
      useCases: ['Government classified data', 'High-security enterprise'],
      pros: ['Higher security margin', 'Hardware support'],
      cons: ['Slightly slower than AES-128'],
      invented: 1997,
      standardized: 'NIST FIPS 197'
    },
    implementation: { nodeCrypto: 'aes-192', webCrypto: 'AES-192' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-256',
    name: 'AES-256',
    category: 'symmetric',
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
      description: 'Advanced Encryption Standard with 256-bit key. Recommended for quantum-resistant encryption as Grover\'s algorithm reduces effective security to 128 bits.',
      useCases: ['Top secret government', 'Maximum security', 'Post-quantum preparation'],
      pros: ['Maximum security', 'Quantum-resistant at 128-bit effective'],
      cons: ['40% slower than AES-128'],
      invented: 1997,
      standardized: 'NIST FIPS 197'
    },
    implementation: { nodeCrypto: 'aes-256', webCrypto: 'AES-256' },
    securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
  },
  {
    id: 'des',
    name: 'DES',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: 56, blockSize: 64, rounds: 16 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      decryption: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
      keyGeneration: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      classical: { operations: '2^56', type: 'brute_force', years: '< 1 day' },
      quantumGrover: { operations: '2^28', type: 'grover', years: '< 1 second' }
    },
    educational: {
      description: 'Data Encryption Standard. Original block cipher from 1977, now thoroughly broken. Key space too small for modern security.',
      useCases: ['Legacy systems only', 'Historical reference'],
      pros: ['Historical importance'],
      cons: ['Bruteforceable in hours', '56-bit key too short', 'Known vulnerabilities'],
      invented: 1977,
      standardized: 'NIST (withdrawn)'
    },
    implementation: { nodeCrypto: 'des', webCrypto: null },
    securityLevel: SECURITY_LEVELS.DEPRECATED
  },
  {
    id: 'triple-des',
    name: '3DES (Triple DES)',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: 168, effectiveKeySize: 112, blockSize: 64, rounds: 48 },
    complexity: {
      encryption: { time: 'O(3n)', space: 'O(1)', memory: 'O(1)' },
      decryption: { time: 'O(3n)', space: 'O(1)', memory: 'O(1)' },
      keyGeneration: { time: 'O(3n)', space: 'O(1)', memory: 'O(1)' }
    },
    crackingComplexity: {
      classical: { operations: '2^112', type: 'meet_in_middle', years: '~4 years' },
      quantumGrover: { operations: '2^56', type: 'grover', years: '< 1 day' }
    },
    educational: {
      description: 'Triple DES applies DES three times with different keys. Provides improved security but is much slower than AES and being deprecated.',
      useCases: ['Legacy banking systems', 'EMV cards', 'Older POS systems'],
      pros: ['Backwards compatible', 'Better than single DES'],
      cons: ['Slow (3x DES)', '64-bit block vulnerability', 'Being deprecated'],
      invented: 1998,
      standardized: 'NIST SP 800-67'
    },
    implementation: { nodeCrypto: 'des-ede3', webCrypto: null },
    securityLevel: SECURITY_LEVELS.LEGACY
  },
  {
    id: 'chacha20',
    name: 'ChaCha20',
    category: 'symmetric',
    type: 'stream_cipher',
    securityParams: { keySize: 256, nonceSize: 64, rounds: 20 },
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
      description: 'Stream cipher designed by Daniel J. Bernstein. Excellent for mobile devices where AES hardware may not be available.',
      useCases: ['Mobile encryption', 'TLS (with Poly1305)', 'WireGuard VPN'],
      pros: ['Fast on software', 'No cache timing attacks', 'Mobile friendly'],
      cons: ['Less analyzed than AES'],
      invented: 2008,
      standardized: 'RFC 7539'
    },
    implementation: { nodeCrypto: 'chacha20', webCrypto: null },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'blowfish',
    name: 'Blowfish',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: { min: 32, max: 448, default: 128 }, blockSize: 64, rounds: 16 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(1)', memory: 'O(4KB)' },
      decryption: { time: 'O(n)', space: 'O(1)', memory: 'O(4KB)' },
      keyGeneration: { time: 'O(n)', space: 'O(1)', memory: 'O(4KB)' }
    },
    crackingComplexity: {
      classical: { operations: '2^448', type: 'brute_force', years: Infinity },
      quantumGrover: { operations: '2^224', type: 'grover', years: Infinity }
    },
    educational: {
      description: 'Variable-key-size block cipher by Bruce Schneier. Public domain, designed as a drop-in replacement for DES.',
      useCases: ['Password hashing (bcrypt)', 'File encryption', 'Legacy applications'],
      pros: ['Public domain', 'Variable key size', 'Fast'],
      cons: ['64-bit block (like DES)', 'Superseded by Twofish/AES'],
      invented: 1993,
      standardized: 'Public domain'
    },
    implementation: { nodeCrypto: 'bf-ecb', webCrypto: null },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'twofish',
    name: 'Twofish',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: { min: 128, max: 256, options: [128, 192, 256] }, blockSize: 128, rounds: 16 },
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
      description: 'AES finalist by Bruce Schneier. Not selected as AES but considered highly secure.',
      useCases: ['File encryption', 'Disk encryption', 'High-security applications'],
      pros: ['AES finalist', 'Flexible key size', 'Good software performance'],
      cons: ['Less hardware support', 'Patented'],
      invented: 1998,
      standardized: 'Not NIST standard'
    },
    implementation: { nodeCrypto: null, webCrypto: null },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'rc4',
    name: 'RC4',
    category: 'symmetric',
    type: 'stream_cipher',
    securityParams: { keySize: { min: 40, max: 2048, typical: 128 }, stateSize: 256 },
    complexity: {
      encryption: { time: 'O(n)', space: 'O(256)', memory: 'O(256)' },
      decryption: { time: 'O(n)', space: 'O(256)', memory: 'O(256)' },
      keyGeneration: { time: 'O(n)', space: 'O(256)', memory: 'O(256)' }
    },
    crackingComplexity: {
      classical: { operations: '2^128', type: 'brute_force', years: Infinity },
      quantumGrover: { operations: '2^64', type: 'grover', years: 'negligible' }
    },
    educational: {
      description: 'Rivest Cipher 4. Stream cipher with severe biases in output. Completely broken - do not use.',
      useCases: ['Legacy WEP', 'Legacy TLS (RC4)'],
      pros: ['Historically fast', 'Simple to implement'],
      cons: ['Known biases', 'WEP broken in 2001', 'Banned by RFC 7465'],
      invented: 1987,
      standardized: 'RFC 7465 (banned)'
    },
    implementation: { nodeCrypto: 'rc4', webCrypto: null },
    securityLevel: SECURITY_LEVELS.DEPRECATED
  },
  {
    id: 'camellia',
    name: 'Camellia',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: { options: [128, 192, 256] }, blockSize: 128, rounds: { 128: 18, 192: 24, 256: 24 } },
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
      description: 'Japanese block cipher similar to AES. Equivalent security to AES with similar performance.',
      useCases: ['Japanese government', 'Europe (NESSIE)', 'SONY products'],
      pros: ['Equivalent to AES', 'Good performance', 'Hardware support'],
      cons: ['Less widely adopted outside Japan'],
      invented: 2000,
      standardized: 'ISO/IEC 18033-3, CRYPTREC'
    },
    implementation: { nodeCrypto: null, webCrypto: null },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'cast-128',
    name: 'CAST-128',
    category: 'symmetric',
    type: 'block_cipher',
    securityParams: { keySize: { min: 40, max: 128, typical: 128 }, blockSize: 64, rounds: 16 },
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
      description: 'CAST cipher family by Carlisle Adams and Stafford Tavares. Used in PGP and other applications.',
      useCases: ['PGP/GPG', 'Email encryption', 'Legacy applications'],
      pros: ['Royalty-free', 'Good performance'],
      cons: ['64-bit block (cryptanalysis concerns)', 'Replaced by CAST-256'],
      invented: 1996,
      standardized: 'RFC 2144, CAST-256 in RFC 2612'
    },
    implementation: { nodeCrypto: 'cast', webCrypto: null },
    securityLevel: SECURITY_LEVELS.LEGACY
  }
];

module.exports = symmetricDefinitions;

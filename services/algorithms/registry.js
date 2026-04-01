const { CATEGORY_ORDER, CATEGORY_DISPLAY_NAMES, SECURITY_LEVELS } = require('../utils/constants');

const ALGORITHM_REGISTRY = {
  symmetric: [
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
        keyGeneration: 'O(n)'
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
        keyGeneration: 'O(n)'
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
        keyGeneration: 'O(n)'
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
        keyGeneration: 'O(3n)'
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
        keyGeneration: 'O(n)'
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
        keyGeneration: 'O(n)'
      },
      crackingComplexity: {
        classical: { operations: '2^max(448)', type: 'brute_force', years: Infinity },
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
        keyGeneration: 'O(n)'
      },
      crackingComplexity: {
        classical: { operations: '2^256', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'AES finalist by Bruce Schneier. Not selected as AES but considered highly secure. Uses pre-computed S-boxes.',
        useCases: ['File encryption', 'Disk encryption', 'High-security applications'],
        pros: ['AES finalist', 'Flexible key size', 'Good software performance'],
        cons: ['Less hardware support', 'Proprietary (patented)'],
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
        keyGeneration: 'O(n)'
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
        keyGeneration: 'O(n)'
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
        keyGeneration: 'O(n)'
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^64', type: 'grover', years: 'negligible' }
      },
      educational: {
        description: 'CAST cipher family by Carlisle Adams and Stafford Tavares. Used in PGP and other applications.',
        useCases: ['PGP/GPG', 'Email encryption', 'Legacy applications'],
        pros: [' royalty-free', 'Good performance'],
        cons: ['64-bit block (cryptanalysis concerns)', 'Replaced by CAST-256'],
        invented: 1996,
        standardized: 'RFC 2144, CAST-256 in RFC 2612'
      },
      implementation: { nodeCrypto: 'cast', webCrypto: null },
      securityLevel: SECURITY_LEVELS.LEGACY
    }
  ],

  hash: [
    {
      id: 'md5',
      name: 'MD5',
      category: 'hash',
      type: 'merkle_damgard',
      securityParams: { outputSize: 128, internalSize: 128, blockSize: 512 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^18', type: 'chosen_prefix', years: '< 1 second' },
        preimage: { operations: '2^123.4', type: 'theoretical', years: 'not practical' }
      },
      educational: {
        description: 'Message-Digest Algorithm 5. Completely broken for security use. Only suitable for non-cryptographic checksums.',
        useCases: ['Non-cryptographic checksums', 'File integrity (legacy)'],
        pros: ['Fast', 'Historical importance'],
        cons: ['Collision attacks since 2004', 'Preimage attacks possible'],
        invented: 1991,
        standardized: 'RFC 1321 (deprecated)'
      },
      implementation: { nodeCrypto: 'md5', webCrypto: null },
      securityLevel: SECURITY_LEVELS.DEPRECATED
    },
    {
      id: 'sha1',
      name: 'SHA-1',
      category: 'hash',
      type: 'merkle_damgard',
      securityParams: { outputSize: 160, internalSize: 160, blockSize: 512 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^63', type: 'SHAttered', years: '< 1 second (cloud)' },
        preimage: { operations: '2^160', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Secure Hash Algorithm 1. Deprecated for security uses. Google created first collision in 2017 (SHAttered attack).',
        useCases: ['TLS certificates (legacy)', 'Git (internal)', 'File integrity'],
        pros: ['Faster than SHA-256', 'Historical use'],
        cons: ['Collision attacks proven', 'Deprecated for TLS'],
        invented: 1993,
        standardized: 'NIST FIPS 180-1 (deprecated)'
      },
      implementation: { nodeCrypto: 'sha1', webCrypto: 'SHA-1' },
      securityLevel: SECURITY_LEVELS.WEAK
    },
    {
      id: 'sha256',
      name: 'SHA-256',
      category: 'hash',
      type: 'merkle_damgard',
      securityParams: { outputSize: 256, internalSize: 256, blockSize: 512, rounds: 64 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^128', type: 'birthday', years: Infinity },
        preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Part of SHA-2 family. Current standard for cryptographic hashing. Used in Bitcoin, TLS, and most security applications.',
        useCases: ['Bitcoin mining', 'TLS/SSL', 'Digital signatures', 'Password hashing'],
        pros: ['Strong security', 'Widely deployed', 'Good performance'],
        cons: ['Slower than BLAKE2', 'Not quantum resistant'],
        invented: 2001,
        standardized: 'NIST FIPS 180-4'
      },
      implementation: { nodeCrypto: 'sha256', webCrypto: 'SHA-256' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'sha384',
      name: 'SHA-384',
      category: 'hash',
      type: 'merkle_damgard',
      securityParams: { outputSize: 384, internalSize: 512, blockSize: 1024, rounds: 80 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^192', type: 'birthday', years: Infinity },
        preimage: { operations: '2^384', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Part of SHA-2 family with 384-bit output. Used for high-security applications and TLS cipher suites.',
        useCases: ['TLS AES-SHA384', 'Digital certificates', 'Government use'],
        pros: ['Higher security than SHA-256', 'Good performance on 64-bit'],
        cons: ['Larger output', 'Slower than SHA-256'],
        invented: 2001,
        standardized: 'NIST FIPS 180-4'
      },
      implementation: { nodeCrypto: 'sha384', webCrypto: 'SHA-384' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'sha512',
      name: 'SHA-512',
      category: 'hash',
      type: 'merkle_damgard',
      securityParams: { outputSize: 512, internalSize: 512, blockSize: 1024, rounds: 80 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^256', type: 'birthday', years: Infinity },
        preimage: { operations: '2^512', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Part of SHA-2 family with 512-bit output. Maximum security in SHA-2 family.',
        useCases: ['High-security applications', 'DNSSEC', 'Long-term signatures'],
        pros: ['Maximum SHA-2 security', 'Good on 64-bit systems'],
        cons: ['Slower on 32-bit systems', 'Larger output'],
        invented: 2001,
        standardized: 'NIST FIPS 180-4'
      },
      implementation: { nodeCrypto: 'sha512', webCrypto: 'SHA-512' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'sha3-256',
      name: 'SHA3-256',
      category: 'hash',
      type: 'sponge',
      securityParams: { outputSize: 256, rate: 1088, capacity: 256, rounds: 24 },
      complexity: {
        absorption: { time: 'O(n)', space: 'O(1)', memory: 'O(rate)' },
        squeezing: { time: 'O(output)', space: 'O(1)', memory: 'O(rate)' }
      },
      crackingComplexity: {
        collision: { operations: '2^128', type: 'birthday', years: Infinity },
        preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Keccak-based SHA-3 standard. Uses sponge construction unlike SHA-2. Different design philosophy provides diversity.',
        useCases: ['General cryptographic hashing', 'TLS (SHA3 draft)', 'Ethereum (Keccak)'],
        pros: ['Different from SHA-2', 'Elegant design', 'Quantum-resistant properties'],
        cons: ['Slower than BLAKE2', 'Less deployment'],
        invented: 2012,
        standardized: 'NIST FIPS 202'
      },
      implementation: { nodeCrypto: 'sha3-256', webCrypto: 'SHA3-256' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'sha3-512',
      name: 'SHA3-512',
      category: 'hash',
      type: 'sponge',
      securityParams: { outputSize: 512, rate: 576, capacity: 1024, rounds: 24 },
      complexity: {
        absorption: { time: 'O(n)', space: 'O(1)', memory: 'O(rate)' },
        squeezing: { time: 'O(output)', space: 'O(1)', memory: 'O(rate)' }
      },
      crackingComplexity: {
        collision: { operations: '2^256', type: 'birthday', years: Infinity },
        preimage: { operations: '2^512', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Maximum security variant of SHA-3 with 512-bit output.',
        useCases: ['Maximum security hashing', 'Long-term integrity'],
        pros: ['Maximum SHA-3 security', 'Different design from SHA-2'],
        cons: ['Larger output', 'Slower'],
        invented: 2012,
        standardized: 'NIST FIPS 202'
      },
      implementation: { nodeCrypto: 'sha3-512', webCrypto: 'SHA3-512' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'blake2s256',
      name: 'BLAKE2s-256',
      category: 'hash',
      type: 'haifa',
      securityParams: { outputSize: 256, stateSize: 256, blockSize: 256, rounds: 10 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^128', type: 'birthday', years: Infinity },
        preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Modern hash function optimized for 32-bit platforms. Faster than SHA-2 with comparable security.',
        useCases: ['File integrity', 'Password hashing (with Argon2)', 'High-performance apps'],
        pros: ['Faster than SHA-256', 'Modern design', 'Tree hashing'],
        cons: ['Less deployed than SHA-2'],
        invented: 2012,
        standardized: 'RFC 7693'
      },
      implementation: { nodeCrypto: 'blake2s256', webCrypto: null, library: 'blakejs' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'blake2b512',
      name: 'BLAKE2b-512',
      category: 'hash',
      type: 'haifa',
      securityParams: { outputSize: 512, stateSize: 512, blockSize: 1024, rounds: 12 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^256', type: 'birthday', years: Infinity },
        preimage: { operations: '2^512', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Modern hash function optimized for 64-bit platforms. Fastest cryptographic hash in many benchmarks.',
        useCases: ['High-speed applications', 'Zstd compression', 'File integrity'],
        pros: ['Fastest in class', 'Modern design', 'Parallelizable'],
        cons: ['Less analysis than SHA-2'],
        invented: 2012,
        standardized: 'RFC 7693'
      },
      implementation: { nodeCrypto: 'blake2b512', webCrypto: null, library: 'blakejs' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'blake3',
      name: 'BLAKE3',
      category: 'hash',
      type: 'bao_tree',
      securityParams: { outputSize: 256, stateSize: 256, chunkSize: 1024, rounds: 7 },
      complexity: {
        chunk: { time: 'O(1)', space: 'O(1)', memory: 'O(chunk)' },
        tree: { time: 'O(n)', space: 'O(log n)', memory: 'O(1)' },
        streaming: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^128', type: 'birthday', years: Infinity },
        preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Latest in BLAKE family. Extremely fast using Bao authenticated tree. 10GB/s hashing speed.',
        useCases: ['High-speed integrity', 'Content-addressed storage', 'Cryptocurrency'],
        pros: ['Fastest hash (10GB/s+)', 'Parallelizable', 'Streaming support'],
        cons: ['Newer (less analysis)', 'Not for cryptographic signatures'],
        invented: 2020,
        standardized: 'Draft IETF'
      },
      implementation: { nodeCrypto: null, webCrypto: null, library: 'blake3-jit' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'keccak256',
      name: 'Keccak-256',
      category: 'hash',
      type: 'sponge',
      securityParams: { outputSize: 256, rate: 1088, capacity: 512, rounds: 24 },
      complexity: {
        absorption: { time: 'O(n)', space: 'O(1)', memory: 'O(rate)' },
        squeezing: { time: 'O(output)', space: 'O(1)', memory: 'O(rate)' }
      },
      crackingComplexity: {
        collision: { operations: '2^128', type: 'birthday', years: Infinity },
        preimage: { operations: '2^256', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Original Keccak before SHA-3 standardization. Used in Ethereum instead of standardized SHA-3.',
        useCases: ['Ethereum', 'Smart contracts'],
        pros: ['Same security as SHA-3', 'Different padding'],
        cons: ['Not the NIST standard', 'Confusion with SHA-3'],
        invented: 2008,
        standardized: 'SHA-3 (different)'
      },
      implementation: { nodeCrypto: 'keccak256', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'tiger',
      name: 'Tiger',
      category: 'hash',
      type: 'merkle_damgard',
      securityParams: { outputSize: 192, stateSize: 192, blockSize: 512, rounds: 24 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^62', type: 'theoretical', years: '< 1 second' },
        preimage: { operations: '2^192', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Hash function designed for speed on 64-bit platforms. Not as widely adopted.',
        useCases: ['Historical use', 'Some file sharing'],
        pros: ['Fast on 64-bit', '192-bit output'],
        cons: ['Some collision weaknesses', 'Replaced by BLAKE2'],
        invented: 1996,
        standardized: 'Not NIST'
      },
      implementation: { nodeCrypto: 'tiger', webCrypto: null },
      securityLevel: SECURITY_LEVELS.LEGACY
    },
    {
      id: 'whirlpool',
      name: 'Whirlpool',
      category: 'hash',
      type: 'miyaguchi_preneel',
      securityParams: { outputSize: 512, stateSize: 512, blockSize: 512, rounds: 10 },
      complexity: {
        compression: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        overall: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        collision: { operations: '2^256', type: 'birthday', years: Infinity },
        preimage: { operations: '2^512', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: '512-bit hash based on AES components. Part of ISO/IEC 10118-3 standard.',
        useCases: ['ISO standard applications', 'European projects'],
        pros: ['AES-based design', '512-bit output'],
        cons: ['Slow', 'Limited adoption'],
        invented: 2000,
        standardized: 'ISO/IEC 10118-3'
      },
      implementation: { nodeCrypto: 'whirlpool', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STANDARD
    }
  ],

  mac: [
    {
      id: 'hmac-sha256',
      name: 'HMAC-SHA256',
      category: 'mac',
      type: 'hmac',
      securityParams: { hashFunction: 'sha256', outputSize: 256, keySize: { min: 64, recommended: 256 } },
      complexity: {
        compute: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forgery: { operations: '2^128', type: 'chosen_message', years: Infinity },
        verification: { operations: '2^256', type: 'brute_force_key', years: Infinity }
      },
      educational: {
        description: 'Hash-based Message Authentication Code using SHA-256. Most widely used MAC algorithm.',
        useCases: ['API authentication', 'TLS', 'Message integrity'],
        pros: ['Well-studied', 'Simple', 'Based on secure hash'],
        cons: ['Key must be as long as block size'],
        invented: 1996,
        standardized: 'RFC 2104, FIPS 198'
      },
      implementation: { nodeCrypto: 'sha256', webCrypto: 'HMAC' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'hmac-sha512',
      name: 'HMAC-SHA512',
      category: 'mac',
      type: 'hmac',
      securityParams: { hashFunction: 'sha512', outputSize: 512, keySize: { min: 128, recommended: 512 } },
      complexity: {
        compute: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forgery: { operations: '2^256', type: 'chosen_message', years: Infinity },
        verification: { operations: '2^512', type: 'brute_force_key', years: Infinity }
      },
      educational: {
        description: 'HMAC using SHA-512 for high-security applications requiring larger output.',
        useCases: ['High-security APIs', 'Financial systems', 'Government'],
        pros: ['Higher security than HMAC-SHA256', '256-bit tag'],
        cons: ['Slower than HMAC-SHA256'],
        invented: 1996,
        standardized: 'RFC 2104, FIPS 198'
      },
      implementation: { nodeCrypto: 'sha512', webCrypto: 'HMAC' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'cmac-aes128',
      name: 'CMAC-AES-128',
      category: 'mac',
      type: 'block_cipher_mac',
      securityParams: { blockCipher: 'aes128', outputSize: 128, keySize: 128 },
      complexity: {
        compute: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forgery: { operations: '2^128', type: 'chosen_message', years: Infinity },
        verification: { operations: '2^128', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Cipher-based Message Authentication Code using AES-128. NIST approved.',
        useCases: ['NIST approved MAC', 'TLS/SSL', 'IPsec'],
        pros: ['NIST approved', 'Based on AES'],
        cons: ['Requires two cipher calls'],
        invented: 2005,
        standardized: 'NIST SP 800-38B'
      },
      implementation: { nodeCrypto: null, webCrypto: 'AES-CMAC' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'poly1305',
      name: 'Poly1305',
      category: 'mac',
      type: 'polynomial_mac',
      securityParams: { outputSize: 128, keySize: 256, precision: 130 },
      complexity: {
        compute: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forgery: { operations: '2^128', type: 'chosen_message', years: Infinity },
        verification: { operations: '2^128', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Polynomial hash-based MAC. Extremely fast with provable security when combined with a cipher.',
        useCases: ['ChaCha20-Poly1305', 'TLS 1.3', 'Signal protocol'],
        pros: ['Very fast', 'Provable security', 'Short output'],
        cons: ['One-time key required'],
        invented: 2004,
        standardized: 'RFC 7539'
      },
      implementation: { nodeCrypto: 'poly1305', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'gmac',
      name: 'GMAC (GHASH)',
      category: 'mac',
      type: 'galois_mac',
      securityParams: { outputSize: 128, keySize: 128, field: 'GF(2^128)' },
      complexity: {
        compute: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forgery: { operations: '2^128', type: 'chosen_message', years: Infinity },
        verification: { operations: '2^128', type: 'brute_force', years: Infinity }
      },
      educational: {
        description: 'Galois Message Authentication Code. Used in AES-GCM mode. Requires final XOR with IV.',
        useCases: ['AES-GCM', 'TLS AES-GCM'],
        pros: ['Hardware accelerated', 'Efficient'],
        cons: ['IV requirements', 'Not standalone'],
        invented: 2004,
        standardized: 'NIST SP 800-38D'
      },
      implementation: { nodeCrypto: 'ghash', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'cbc-mac',
      name: 'CBC-MAC',
      category: 'mac',
      type: 'block_cipher_mac',
      securityParams: { blockCipher: 'aes', outputSize: 128, keySize: 128 },
      complexity: {
        compute: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forgery: { operations: '2^(n/2)', type: 'length_extension', years: '< 1 second' }
      },
      educational: {
        description: 'Cipher Block Chaining MAC. Insecure without length域 encryption. Foundation for CMAC.',
        useCases: ['Legacy systems', 'Foundation for CMAC'],
        pros: ['Simple'],
        cons: ['Length attack', 'Not secure alone'],
        invented: 1979,
        standardized: 'NIST SP 800-38A (legacy)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.WEAK
    }
  ],

  authenticatedEncryption: [
    {
      id: 'aes-128-gcm',
      name: 'AES-128-GCM',
      category: 'authenticatedEncryption',
      type: 'aead',
      securityParams: { cipher: 'aes128', mode: 'gcm', ivSize: 96, tagSize: 128 },
      complexity: {
        encrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^64', type: 'grover', years: 'negligible' }
      },
      educational: {
        description: 'AES in Galois/Counter Mode. TLS 1.3 default cipher. Provides both confidentiality and authenticity.',
        useCases: ['TLS 1.3', 'VPN', 'File encryption', 'WiFi (WPA3)'],
        pros: ['Authenticated encryption', 'Hardware accelerated', 'TLS default'],
        cons: ['Nonce reuse catastrophic', 'Side-channel concerns'],
        invented: 2004,
        standardized: 'NIST SP 800-38D'
      },
      implementation: { nodeCrypto: 'aes-128-gcm', webCrypto: 'AES-GCM' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'aes-256-gcm',
      name: 'AES-256-GCM',
      category: 'authenticatedEncryption',
      type: 'aead',
      securityParams: { cipher: 'aes256', mode: 'gcm', ivSize: 96, tagSize: 128 },
      complexity: {
        encrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^256', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'AES-256-GCM with 256-bit key. Maximum security AEAD cipher. TLS 1.3 default for high security.',
        useCases: ['Top secret TLS', 'Government encryption', 'Maximum security'],
        pros: ['256-bit security', 'Authenticated', 'Quantum resistant (128-bit effective)'],
        cons: ['Slower than AES-128-GCM', 'Nonce reuse risk'],
        invented: 2004,
        standardized: 'NIST SP 800-38D'
      },
      implementation: { nodeCrypto: 'aes-256-gcm', webCrypto: 'AES-GCM' },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    },
    {
      id: 'chacha20-poly1305',
      name: 'ChaCha20-Poly1305',
      category: 'authenticatedEncryption',
      type: 'aead',
      securityParams: { cipher: 'chacha20', mac: 'poly1305', keySize: 256, nonceSize: 96 },
      complexity: {
        encrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^256', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'Stream cipher with polynomial MAC. TLS 1.3 cipher for mobile devices without AES hardware.',
        useCases: ['Mobile TLS', 'Signal', 'WireGuard'],
        pros: ['Fast on all devices', 'No timing attacks', 'Modern design'],
        cons: ['Less analyzed than AES-GCM', 'No hardware acceleration (usually)'],
        invented: 2013,
        standardized: 'RFC 7539, RFC 7905'
      },
      implementation: { nodeCrypto: 'chacha20-poly1305', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'aes-128-ccm',
      name: 'AES-128-CCM',
      category: 'authenticatedEncryption',
      type: 'aead',
      securityParams: { cipher: 'aes128', mode: 'ccm', nonceSize: 104, tagSize: 128 },
      complexity: {
        encrypt: { time: 'O(2n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(2n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^64', type: 'grover', years: 'negligible' }
      },
      educational: {
        description: 'Counter with CBC-MAC. Two-pass AEAD. Used in some TLS ciphers and WiFi (WPA2).',
        useCases: ['WiFi (WPA2)', 'Some TLS ciphers', 'IoT'],
        pros: ['Single primitive (AES)', 'Proven security'],
        cons: ['Two passes (slower)', 'Complex implementation'],
        invented: 2003,
        standardized: 'NIST SP 800-38C'
      },
      implementation: { nodeCrypto: 'aes-128-ccm', webCrypto: 'AES-CCM' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'aes-gcm-siv',
      name: 'AES-GCM-SIV',
      category: 'authenticatedEncryption',
      type: 'aead',
      securityParams: { cipher: 'aes', mode: 'gcm-siv', nonceSize: 96, tagSize: 128 },
      complexity: {
        encrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^256', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'Nonce-misuse resistant variant of GCM. Provides limited security even with nonce reuse.',
        useCases: ['High-security applications', 'Systems prone to nonce reuse'],
        pros: ['Nonce-misuse resistant', 'Deterministic option'],
        cons: ['Newer (less analysis)', 'Slightly slower than GCM'],
        invented: 2015,
        standardized: 'RFC 8452'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'aes-eax',
      name: 'AES-EAX',
      category: 'authenticatedEncryption',
      type: 'aead',
      securityParams: { cipher: 'aes', mode: 'eax', nonceSize: 128, tagSize: 128 },
      complexity: {
        encrypt: { time: 'O(2n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(2n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'brute_force', years: Infinity },
        quantumGrover: { operations: '2^64', type: 'grover', years: 'negligible' }
      },
      educational: {
        description: 'Two-pass AEAD using AES-CTR and OMAC. Simpler than CCM, proven secure.',
        useCases: ['Academic reference', 'Formal verification'],
        pros: ['Simple design', 'Proven security'],
        cons: ['Two passes', 'Patented'],
        invented: 2003,
        standardized: 'IEEE 1619'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STANDARD
    }
  ],

  asymmetric: [
    {
      id: 'rsa-2048',
      name: 'RSA-2048',
      category: 'asymmetric',
      type: 'public_key_encryption',
      securityParams: { keySize: 2048, publicExponent: 65537, modulusSize: 2048 },
      complexity: {
        keyGen: { time: 'O(n^2)', space: 'O(n)', memory: 'O(n)' },
        encrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' },
        decrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^112 (subexp)', type: 'number_field_sieve', years: 'billions' },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'RSA with 2048-bit modulus. Most widely used asymmetric encryption. Security based on integer factorization.',
        useCases: ['TLS certificates', 'PGP/GPG', 'Digital signatures', 'Key exchange'],
        pros: ['Most deployed', 'Well understood'],
        cons: ['Vulnerable to quantum', 'Large keys', 'Slow operations'],
        invented: 1977,
        standardized: 'PKCS#1, IEEE 1363'
      },
      implementation: { nodeCrypto: 'rsa2048', webCrypto: 'RSA-OAEP' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'rsa-4096',
      name: 'RSA-4096',
      category: 'asymmetric',
      type: 'public_key_encryption',
      securityParams: { keySize: 4096, publicExponent: 65537, modulusSize: 4096 },
      complexity: {
        keyGen: { time: 'O(n^2)', space: 'O(n)', memory: 'O(n)' },
        encrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' },
        decrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^140 (subexp)', type: 'number_field_sieve', years: 'quintillions' },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'RSA with 4096-bit modulus. Higher security RSA for sensitive applications.',
        useCases: ['CA root keys', 'Long-term secrets', 'Government'],
        pros: ['Higher security margin'],
        cons: ['Very large keys', 'Very slow', 'Quantum vulnerable'],
        invented: 1977,
        standardized: 'PKCS#1'
      },
      implementation: { nodeCrypto: 'rsa4096', webCrypto: 'RSA-OAEP' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'rsa-oaep-2048',
      name: 'RSA-OAEP-2048',
      category: 'asymmetric',
      type: 'public_key_encryption',
      securityParams: { keySize: 2048, padding: 'OAEP', hash: 'SHA256' },
      complexity: {
        keyGen: { time: 'O(n^2)', space: 'O(n)', memory: 'O(n)' },
        encrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' },
        decrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^112 (subexp)', type: 'number_field_sieve', years: 'billions' },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'RSA with Optimal Asymmetric Encryption Padding. IND-CPA secure padding scheme.',
        useCases: ['Secure key transport', 'TLS RSA key exchange'],
        pros: ['IND-CPA secure', 'Standard padding'],
        cons: ['Larger than PKCS1v1.5', 'Quantum vulnerable'],
        invented: 1998,
        standardized: 'PKCS#1 v2.1'
      },
      implementation: { nodeCrypto: 'rsaEncryption', webCrypto: 'RSA-OAEP' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'elgamal',
      name: 'ElGamal',
      category: 'asymmetric',
      type: 'public_key_encryption',
      securityParams: { keySize: { min: 2048, typical: 3072 }, group: 'modular', randomness: true },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(n)' },
        encrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^n', type: 'discrete_log', years: 'n depends on key size' },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Encryption based on Diffie-Hellman. Randomized encryption produces different ciphertexts for same plaintext.',
        useCases: ['Educational', 'Some PGP variants', 'Threshold encryption'],
        pros: ['Randomized (semantic security)', 'Based on DH'],
        cons: ['Ciphertext expansion (2x)', 'Slower than RSA'],
        invented: 1985,
        standardized: 'NIST SP 800-56A'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'ecc-p256',
      name: 'ECC P-256',
      category: 'asymmetric',
      type: 'elliptic_curve',
      securityParams: { curve: 'P-256', keySize: 256, fieldSize: 256 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        encrypt: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'ecdlp', years: Infinity },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Elliptic curve with 256-bit security. Equivalent to RSA-3072 with much smaller keys.',
        useCases: ['TLS (ECDHE)', 'Bitcoin', 'Smart cards'],
        pros: ['Small keys (32 bytes)', 'Fast operations'],
        cons: ['Quantum vulnerable', 'Implementation complexity'],
        invented: 1985,
        standardized: 'NIST SP 800-186'
      },
      implementation: { nodeCrypto: 'prime256v1', webCrypto: 'P-256' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'ecc-p384',
      name: 'ECC P-384',
      category: 'asymmetric',
      type: 'elliptic_curve',
      securityParams: { curve: 'P-384', keySize: 384, fieldSize: 384 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        encrypt: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^192', type: 'ecdlp', years: Infinity },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Higher security elliptic curve. Equivalent to RSA-7680 with much smaller keys.',
        useCases: ['Government (Suite B)', 'High-security TLS'],
        pros: ['High security margin', 'Still smaller than RSA'],
        cons: ['Slower than P-256', 'Quantum vulnerable'],
        invented: 1985,
        standardized: 'NIST SP 800-186'
      },
      implementation: { nodeCrypto: 'secp384r1', webCrypto: 'P-384' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'curve25519',
      name: 'Curve25519 (X25519)',
      category: 'asymmetric',
      type: 'montgomery_curve',
      securityParams: { curve: 'Curve25519', keySize: 256, fieldSize: 255 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        scalarMult: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'ecdlp', years: Infinity },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Montgomery curve designed for performance and security. Recommended for new implementations.',
        useCases: ['Signal', 'WireGuard', 'TLS 1.3 (X25519)'],
        pros: ['Fast', 'Constant-time', 'No weak keys'],
        cons: ['Quantum vulnerable', 'Different from NIST curves'],
        invented: 2005,
        standardized: 'RFC 7748'
      },
      implementation: { nodeCrypto: 'X25519', webCrypto: 'X25519' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'curve448',
      name: 'Curve448 (X448)',
      category: 'asymmetric',
      type: 'montgomery_curve',
      securityParams: { curve: 'Curve448', keySize: 448, fieldSize: 448 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        scalarMult: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^224', type: 'ecdlp', years: Infinity },
        quantumShor: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Extended security curve with 448-bit security. No nearby curve attacks.',
        useCases: ['High-security applications', 'Extended Diffie-Hellman'],
        pros: ['Maximum ECC security', 'No nearby curves'],
        cons: ['Larger than X25519', 'Less common'],
        invented: 2015,
        standardized: 'RFC 7748'
      },
      implementation: { nodeCrypto: 'X448', webCrypto: 'X448' },
      securityLevel: SECURITY_LEVELS.STRONG
    }
  ],

  digitalSignatures: [
    {
      id: 'rsassa-pss',
      name: 'RSASSA-PSS',
      category: 'digitalSignatures',
      type: 'signature',
      securityParams: { scheme: 'PSS', hash: 'SHA256', keySize: 2048 },
      complexity: {
        keyGen: { time: 'O(n^2)', space: 'O(n)', memory: 'O(n)' },
        sign: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' },
        verify: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forge: { operations: '2^112 (subexp)', type: 'factorization', years: 'billions' },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'RSA signature with Probabilistic Signature Scheme. Provably secure padding.',
        useCases: ['X.509 certificates', 'TLS', 'Code signing'],
        pros: ['Provable security', 'Standard'],
        cons: ['Large signatures', 'Quantum vulnerable'],
        invented: 1998,
        standardized: 'PKCS#1 v2.1'
      },
      implementation: { nodeCrypto: 'RSA-PSS', webCrypto: 'RSA-PSS' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'ecdsa-p256',
      name: 'ECDSA P-256',
      category: 'digitalSignatures',
      type: 'signature',
      securityParams: { curve: 'P-256', hash: 'SHA256', signatureSize: 64 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        sign: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forge: { operations: '2^128', type: 'ecdlp', years: Infinity },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Elliptic Curve DSA. Used in Bitcoin, Ethereum, and many applications.',
        useCases: ['Bitcoin', 'Blockchain', 'TLS'],
        pros: ['Small signatures (64 bytes)', 'Fast'],
        cons: ['ECDLP vulnerable to quantum', 'Requires good randomness'],
        invented: 1992,
        standardized: 'ANSI X9.62'
      },
      implementation: { nodeCrypto: 'ecdsa', webCrypto: 'ECDSA' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'ed25519',
      name: 'EdDSA (Ed25519)',
      category: 'digitalSignatures',
      type: 'signature',
      securityParams: { curve: 'Edwards25519', hash: 'SHA512', signatureSize: 64, keySize: 256 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        sign: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forge: { operations: '2^128', type: 'ecdlp', years: Infinity },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Edwards-curve Digital Signature Algorithm. Modern, fast, and simple to implement securely.',
        useCases: ['Signal', 'WireGuard', 'SSH', 'High-performance systems'],
        pros: ['Deterministic', 'Fast', 'Side-channel resistant'],
        cons: ['Quantum vulnerable', 'Less deployment'],
        invented: 2011,
        standardized: 'RFC 8032'
      },
      implementation: { nodeCrypto: 'ed25519', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'ed448',
      name: 'EdDSA (Ed448)',
      category: 'digitalSignatures',
      type: 'signature',
      securityParams: { curve: 'Edwards448', hash: 'SHAKE256', signatureSize: 114, keySize: 456 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        sign: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forge: { operations: '2^224', type: 'ecdlp', years: Infinity },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Higher security EdDSA with 448-bit curve. SHA-3 based hashing.',
        useCases: ['High-security signing', 'Government'],
        pros: ['Maximum EdDSA security', 'SHA-3 based'],
        cons: ['Larger signatures', 'Less common'],
        invented: 2011,
        standardized: 'RFC 8032'
      },
      implementation: { nodeCrypto: 'ed448', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'dsa-2048',
      name: 'DSA',
      category: 'digitalSignatures',
      type: 'signature',
      securityParams: { keySize: 2048, subgroupSize: 256, hash: 'SHA256' },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(n)' },
        sign: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        forge: { operations: '2^80', type: 'discrete_log', years: '< 1 year' },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Digital Signature Algorithm. Finite field version. Deprecated due to weak key sizes.',
        useCases: ['Legacy systems', 'Historical reference'],
        pros: ['Historically important'],
        cons: ['Weak (80-bit security)', 'Deprecated'],
        invented: 1991,
        standardized: 'DSS (deprecated)'
      },
      implementation: { nodeCrypto: 'DSA', webCrypto: null },
      securityLevel: SECURITY_LEVELS.WEAK
    }
  ],

  keyExchange: [
    {
      id: 'dh-2048',
      name: 'Diffie-Hellman (2048)',
      category: 'keyExchange',
      type: 'key_exchange',
      securityParams: { keySize: 2048, subgroupSize: 256, group: 'modp2048' },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(n)' },
        derive: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^112 (subexp)', type: 'discrete_log', years: 'billions' },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Classic DH key exchange in 2048-bit prime field. Foundation of modern key exchange.',
        useCases: ['TLS (DHE)', 'VPN', 'Historical protocols'],
        pros: ['Forward secrecy possible', 'Well understood'],
        cons: ['Large keys', 'Quantum vulnerable'],
        invented: 1976,
        standardized: 'RFC 3526'
      },
      implementation: { nodeCrypto: 'DH', webCrypto: 'DH' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'ecdh-p256',
      name: 'ECDH P-256',
      category: 'keyExchange',
      type: 'key_exchange',
      securityParams: { curve: 'P-256', keySize: 256 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        derive: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'ecdlp', years: Infinity },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Elliptic curve Diffie-Hellman. Efficient key exchange used in TLS ECDHE.',
        useCases: ['TLS (ECDHE)', 'Signal', 'Modern protocols'],
        pros: ['Small keys', 'Fast'],
        cons: ['Quantum vulnerable', 'Implementation pitfalls'],
        invented: 1985,
        standardized: 'NIST SP 800-56A'
      },
      implementation: { nodeCrypto: 'ECDH', webCrypto: 'ECDH' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'x25519',
      name: 'X25519',
      category: 'keyExchange',
      type: 'key_exchange',
      securityParams: { curve: 'Curve25519', keySize: 256 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        derive: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'ecdlp', years: Infinity },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Montgomery curve key exchange. Recommended modern key exchange.',
        useCases: ['TLS 1.3', 'WireGuard', 'Signal'],
        pros: ['Fast', 'Constant-time', 'Recommended'],
        cons: ['Quantum vulnerable'],
        invented: 2005,
        standardized: 'RFC 7748'
      },
      implementation: { nodeCrypto: 'X25519', webCrypto: 'X25519' },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'x448',
      name: 'X448',
      category: 'keyExchange',
      type: 'key_exchange',
      securityParams: { curve: 'Curve448', keySize: 448 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(1)' },
        derive: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^224', type: 'ecdlp', years: Infinity },
        quantum: { operations: 'O(n^3)', type: 'shor', years: '< hours' }
      },
      educational: {
        description: 'Extended security key exchange. Maximum security for ECC-based exchange.',
        useCases: ['High-security applications'],
        pros: ['Maximum ECC security', 'No nearby curves'],
        cons: ['Larger than X25519'],
        invented: 2015,
        standardized: 'RFC 7748'
      },
      implementation: { nodeCrypto: 'X448', webCrypto: 'X448' },
      securityLevel: SECURITY_LEVELS.STRONG
    }
  ],

  passwordHashing: [
    {
      id: 'bcrypt',
      name: 'bcrypt',
      category: 'passwordHashing',
      type: 'password_hash',
      securityParams: { cost: { min: 4, max: 31, default: 12 }, memory: '4-64 MB', parallelism: 1 },
      complexity: {
        hash: { time: 'O(2^cost)', space: 'O(64KB)', memory: 'O(64KB)' },
        verify: { time: 'O(2^cost)', space: 'O(64KB)', memory: 'O(64KB)' }
      },
      crackingComplexity: {
        dictionary: { operations: 'per password', type: 'adaptive', years: 'cost dependent' },
        gpu: { speed: '~100 kH/s', notes: 'Cost 12' }
      },
      educational: {
        description: 'Adaptive password hashing using Blowfish. Widely deployed, designed by Niels Provos.',
        useCases: ['User password storage', 'Legacy systems'],
        pros: ['Adaptive cost', 'Well-tested', 'Wide support'],
        cons: ['Memory hard but limited', 'Not optimal for GPU resistance'],
        invented: 1999,
        standardized: 'OpenBSD bcrypt'
      },
      implementation: { nodeCrypto: 'bcrypt', webCrypto: null },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'scrypt',
      name: 'scrypt',
      category: 'passwordHashing',
      type: 'password_hash',
      securityParams: { N: 16384, r: 8, p: 1, memory: '16 MB' },
      complexity: {
        hash: { time: 'O(N*r*p)', space: 'O(N*r)', memory: 'O(N*r)' },
        verify: { time: 'O(N*r*p)', space: 'O(N*r)', memory: 'O(N*r)' }
      },
      crackingComplexity: {
        dictionary: { operations: 'per password', type: 'memory_hard', years: 'cost dependent' },
        gpu: { speed: '~10 kH/s', notes: 'Memory bottleneck' }
      },
      educational: {
        description: 'Memory-hard password hashing. Designed to be expensive for hardware attackers.',
        useCases: ['Key derivation', 'High-security password storage'],
        pros: ['Memory hard', 'GPU resistant', 'Tunable'],
        cons: ['High memory for legitimate use', 'Larger parameters needed'],
        invented: 2009,
        standardized: 'RFC 7914'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'argon2id',
      name: 'Argon2id',
      category: 'passwordHashing',
      type: 'password_hash',
      securityParams: { time: 3, memory: 65536, parallelism: 4 },
      complexity: {
        hash: { time: 'O(time*memory)', space: 'O(memory)', memory: 'O(memory)' },
        verify: { time: 'O(time*memory)', space: 'O(memory)', memory: 'O(memory)' }
      },
      crackingComplexity: {
        dictionary: { operations: 'per password', type: 'memory_time_tradeoff', years: 'cost dependent' },
        gpu: { speed: '~1 kH/s', notes: 'Memory-hard advantage' }
      },
      educational: {
        description: 'Password Hashing Competition winner (2015). Best adaptive hashing.',
        useCases: ['New password storage', 'Key derivation', 'Modern applications'],
        pros: ['Best modern design', 'Memory + time hard', 'Side-channel resistant'],
        cons: ['Newer (less deployment)'],
        invented: 2015,
        standardized: 'RFC 9106'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'pbkdf2-sha256',
      name: 'PBKDF2-SHA256',
      category: 'passwordHashing',
      type: 'password_hash',
      securityParams: { iterations: { min: 100000, recommended: 600000 }, hash: 'SHA256' },
      complexity: {
        hash: { time: 'O(iterations)', space: 'O(1)', memory: 'O(1)' },
        verify: { time: 'O(iterations)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        dictionary: { operations: 'iterations per guess', type: 'iterated', years: 'iterations dependent' },
        gpu: { speed: '~1 MH/s', notes: 'SHA256 is fast' }
      },
      educational: {
        description: 'Simple password-based key derivation. Not memory-hard, but widely supported.',
        useCases: ['Password storage', 'Key derivation', 'Most platforms'],
        pros: ['Universal support', 'Simple'],
        cons: ['Not memory-hard', 'GPU feasible'],
        invented: 2000,
        standardized: 'RFC 2898, SP 800-132'
      },
      implementation: { nodeCrypto: 'pbkdf2', webCrypto: 'PBKDF2' },
      securityLevel: SECURITY_LEVELS.LEGACY
    }
  ],

  postQuantum: [
    {
      id: 'kyber512',
      name: 'CRYSTALS-Kyber-512',
      category: 'postQuantum',
      type: 'kems',
      securityParams: { keySize: 800, ciphertextSize: 768, encapsulatedKey: 768, category: 'security-level-1' },
      complexity: {
        keyGen: { time: 'O(k^2 * log q)', space: 'O(k^2)', memory: 'O(k^2)' },
        encapsulate: { time: 'O(k^2 * log q)', space: 'O(k^2)', memory: 'O(k^2)' },
        decapsulate: { time: 'O(k^2 * log q)', space: 'O(k^2)', memory: 'O(k^2)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'mlwe', years: Infinity },
        quantum: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'NIST standardized KEM based on Module-LWE. Small keys and fast operations.',
        useCases: ['TLS 1.3 (hybrid)', 'Post-quantum migration'],
        pros: ['NIST standardized', 'Small keys', 'Fast'],
        cons: ['Newer (less analysis)'],
        invented: 2017,
        standardized: 'NIST PQC (2024)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    },
    {
      id: 'dilithium3',
      name: 'CRYSTALS-Dilithium3',
      category: 'postQuantum',
      type: 'digital_signature',
      securityParams: { publicKeySize: 1952, secretKeySize: 4000, signatureSize: 3293, category: 'security-level-3' },
      complexity: {
        keyGen: { time: 'O(k^2 * log q)', space: 'O(k^2)', memory: 'O(k^2)' },
        sign: { time: 'O(k^2 * log q)', space: 'O(k)', memory: 'O(k)' },
        verify: { time: 'O(k * l * log q)', space: 'O(k + l)', memory: 'O(k + l)' }
      },
      crackingComplexity: {
        classical: { operations: '2^192', type: 'mlwe', years: Infinity },
        quantum: { operations: '2^192', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'NIST standardized signature based on Module-LWE. Primary signature algorithm.',
        useCases: ['Code signing', 'Certificates', 'Blockchain'],
        pros: ['NIST standardized', 'Balanced parameters'],
        cons: ['Large signatures', 'Newer'],
        invented: 2017,
        standardized: 'NIST PQC (2024)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    },
    {
      id: 'sphincs-plus-128s',
      name: 'SPHINCS+-128s',
      category: 'postQuantum',
      type: 'digital_signature',
      securityParams: { publicKeySize: 32, secretKeySize: 64, signatureSize: 7856, type: 'stateful hash-based' },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(n)' },
        sign: { time: 'O(n log n)', space: 'O(log n)', memory: 'O(1)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'hash_collision', years: Infinity },
        quantum: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'NIST standardized stateless hash-based signature. Conservative security based on hash functions.',
        useCases: ['Long-term signatures', 'Conservative deployments'],
        pros: ['Conservative design', 'Based on hash functions', 'No lattice assumptions'],
        cons: ['Large signatures (7KB+)', 'Slow signing'],
        invented: 2015,
        standardized: 'NIST PQC (2024)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    },
    {
      id: 'falcon512',
      name: 'Falcon-512',
      category: 'postQuantum',
      type: 'digital_signature',
      securityParams: { publicKeySize: 897, secretKeySize: 1281, signatureSize: 666, category: 'security-level-1' },
      complexity: {
        keyGen: { time: 'O(n log n)', space: 'O(n)', memory: 'O(n)' },
        sign: { time: 'O(n log n)', space: 'O(n)', memory: 'O(n)' },
        verify: { time: 'O(n log n)', space: 'O(n)', memory: 'O(n)' }
      },
      crackingComplexity: {
        classical: { operations: '2^128', type: 'ntru', years: Infinity },
        quantum: { operations: '2^128', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'NIST standardized lattice-based signature with shortest signatures.',
        useCases: ['Certificate chains', 'Bandwidth-constrained'],
        pros: ['Short signatures', 'Fast verification'],
        cons: ['Complex implementation', 'FFT required'],
        invented: 2017,
        standardized: 'NIST PQC (2024)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    },
    {
      id: 'classic-mceliece',
      name: 'Classic McEliece',
      category: 'postQuantum',
      type: 'kems',
      securityParams: { publicKeySize: 1048992, secretKeySize: 13824, ciphertextSize: 1888 },
      complexity: {
        keyGen: { time: 'O(n^2)', space: 'O(n^2)', memory: 'O(n^2)' },
        encapsulate: { time: 'O(n^2)', space: 'O(n)', memory: 'O(n)' },
        decapsulate: { time: 'O(n^2)', space: 'O(n)', memory: 'O(n)' }
      },
      crackingComplexity: {
        classical: { operations: '2^256', type: ' Syndrome_decoding', years: Infinity },
        quantum: { operations: '2^256', type: 'grover', years: Infinity }
      },
      educational: {
        description: 'Code-based KEM. Most conservative PQC, but very large keys.',
        useCases: ['Maximum security', 'Key encapsulation'],
        pros: ['Oldest PQC design', 'Very conservative'],
        cons: ['Very large public key (1MB)', 'Slow operations'],
        invented: 1978,
        standardized: 'NIST PQC (2024)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    }
  ],

  zeroKnowledge: [
    {
      id: 'schnorr',
      name: 'Schnorr Protocol',
      category: 'zeroKnowledge',
      type: 'zkp',
      securityParams: { proofSize: 3 * 32, rounds: 3, type: 'interactive' },
      complexity: {
        prove: { time: 'O(n)', space: 'O(n)', memory: 'O(n)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      educational: {
        description: 'Foundational ZK proof for discrete log. Linear proof size, constant verification.',
        useCases: ['Authentication', 'Multi-sig', 'Foundation for other ZK'],
        pros: ['Simple', 'Constant-time verification'],
        cons: ['Interactive (can be Fiat-Shamir)'],
        invented: 1989,
        standardized: 'RFC 8235'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'zk-snark',
      name: 'zk-SNARK',
      category: 'zeroKnowledge',
      type: 'zkp',
      securityParams: { proofSize: '~200 bytes', verification: 'O(1)', trustedSetup: true },
      complexity: {
        prove: { time: 'O(N * log N)', space: 'O(N)', memory: 'O(N)' },
        verify: { time: 'O(1)', space: 'O(1)', memory: 'O(1)' },
        setup: { time: 'O(N * log N)', space: 'O(N)', memory: 'O(N)' }
      },
      communicationComplexity: {
        prover: '~200 bytes',
        verifier: 'O(1)'
      },
      educational: {
        description: 'Succinct Non-interactive ARgument of Knowledge. Used in Ethereum, Zcash.',
        useCases: ['Zcash', 'Ethereum zkEVMs', 'Layer 2'],
        pros: ['Very short proofs', 'Fast verification'],
        cons: ['Trusted setup required', 'Complex'],
        invented: 2012,
        standardized: 'Draft research standard'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'zk-stark',
      name: 'zk-STARK',
      category: 'zeroKnowledge',
      type: 'zkp',
      securityParams: { proofSize: 'O(polylog)', verification: 'O(polylog)', trustedSetup: false },
      complexity: {
        prove: { time: 'O(N * polylog N)', space: 'O(N)', memory: 'O(N)' },
        verify: { time: 'O(polylog N)', space: 'O(polylog N)', memory: 'O(polylog N)' },
        setup: { time: 'none', space: 'none', memory: 'none' }
      },
      communicationComplexity: {
        prover: 'O(polylog N)',
        verifier: 'O(polylog N)'
      },
      educational: {
        description: 'Scalable Transparent Argument of Knowledge. No trusted setup, quantum resistant.',
        useCases: ['StarkEx', 'StarkNet', 'Privacy solutions'],
        pros: ['No trusted setup', 'Quantum resistant'],
        cons: ['Larger proofs than SNARKs'],
        invented: 2018,
        standardized: 'Research (no formal standard)'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
    },
    {
      id: 'bulletproofs',
      name: 'Bulletproofs',
      category: 'zeroKnowledge',
      type: 'zkp',
      securityParams: { proofSize: 'O(log n) * 32 bytes', verification: 'O(n)', type: 'non-interactive' },
      complexity: {
        prove: { time: 'O(n * log n)', space: 'O(log n)', memory: 'O(log n)' },
        verify: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      communicationComplexity: {
        prover: 'O(log n)',
        verifier: 'O(1)'
      },
      educational: {
        description: 'Short proofs for arithmetic circuits. Used in Monero, Grin.',
        useCases: ['Confidential transactions', 'Range proofs', 'Blockchain'],
        pros: ['Shorter than SNARKs for some', 'No trusted setup'],
        cons: ['Verification scales linearly'],
        invented: 2017,
        standardized: 'Research standard'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    }
  ],

  homomorphic: [
    {
      id: 'paillier',
      name: 'Paillier Cryptosystem',
      category: 'homomorphic',
      type: 'additively_homomorphic',
      securityParams: { keySize: 2048, plaintextMax: 'n', ciphertextSize: 4096 },
      complexity: {
        keyGen: { time: 'O(n^2)', space: 'O(n^2)', memory: 'O(n^2)' },
        encrypt: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' },
        decrypt: { time: 'O(n^3)', space: 'O(n)', memory: 'O(1)' },
        add: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' },
        scalarMult: { time: 'O(n^2)', space: 'O(n)', memory: 'O(1)' }
      },
      educational: {
        description: 'Additively homomorphic encryption. Allows addition of plaintexts without decryption.',
        useCases: ['E-voting', 'Privacy-preserving statistics', 'Secure computation'],
        pros: ['Additive homomorphism', 'Simple design'],
        cons: ['Addition only (no multiplication)', 'Large ciphertexts'],
        invented: 1999,
        standardized: 'ISO 18033-6'
      },
      implementation: { nodeCrypto: null, webCrypto: null, library: 'paillier-bigint' },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'elgamal-homomorphic',
      name: 'ElGamal (Homomorphic)',
      category: 'homomorphic',
      type: 'multiplicatively_homomorphic',
      securityParams: { keySize: 2048, plaintextMax: 'subgroup order', ciphertextSize: 4096 },
      complexity: {
        keyGen: { time: 'O(n)', space: 'O(n)', memory: 'O(n)' },
        encrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        decrypt: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' },
        multiply: { time: 'O(n)', space: 'O(1)', memory: 'O(1)' }
      },
      educational: {
        description: 'Multiplicatively homomorphic ElGamal. Allows multiplication of plaintexts.',
        useCases: ['E-voting (multiplication)', 'Private set intersection'],
        pros: ['Multiplicative homomorphism', 'Based on DH'],
        cons: ['Multiplication only', 'Ciphertext expansion'],
        invented: 1985,
        standardized: 'Generalized ElGamal'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STANDARD
    },
    {
      id: 'ckks',
      name: 'CKKS',
      category: 'homomorphic',
      type: 'fully_homomorphic',
      securityParams: { polyDegree: 16384, plaintextSize: 'N/2 complex', ciphertextSize: '2N', precision: 'configurable' },
      complexity: {
        keyGen: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' },
        encrypt: { time: 'O(N log N)', space: 'O(N)', memory: 'O(N)' },
        add: { time: 'O(N log N)', space: 'O(N)', memory: 'O(N)' },
        multiply: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' },
        bootstrap: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' }
      },
      educational: {
        description: 'Cheon-Kim-Kim-Song scheme. Approximate arithmetic on encrypted real numbers.',
        useCases: ['Machine learning on encrypted data', 'Privacy-preserving analytics'],
        pros: ['Encrypted arithmetic', 'Real/complex numbers'],
        cons: ['Approximate (not exact)', 'Bootstrapping overhead'],
        invented: 2017,
        standardized: 'Research standard'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'bfv',
      name: 'BFV',
      category: 'homomorphic',
      type: 'fully_homomorphic',
      securityParams: { polyDegree: 4096, plaintextSize: 'N integers', ciphertextSize: '2N' },
      complexity: {
        keyGen: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' },
        encrypt: { time: 'O(N log N)', space: 'O(N)', memory: 'O(N)' },
        add: { time: 'O(N log N)', space: 'O(N)', memory: 'O(N)' },
        multiply: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' }
      },
      educational: {
        description: 'Brakerski/Fan-Vercauteren scheme. Exact integer arithmetic on encrypted data.',
        useCases: ['Privacy-preserving database queries', 'Encrypted integer arithmetic'],
        pros: ['Exact integer operations', 'Lower noise than CKKS'],
        cons: ['No native floating point', 'Noise growth'],
        invented: 2012,
        standardized: 'Research standard'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    },
    {
      id: 'tfhe',
      name: 'TFHE',
      category: 'homomorphic',
      type: 'fully_homomorphic',
      securityParams: { securityBits: 128, bootstrappingDepth: 'unlimited', gateLevel: 'bool' },
      complexity: {
        keyGen: { time: 'O(N^3)', space: 'O(N^3)', memory: 'O(N^3)' },
        encrypt: { time: 'O(N)', space: 'O(N)', memory: 'O(N)' },
        bootstrap: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' },
        gateEvaluate: { time: 'O(N log N)^2', space: 'O(N log N)', memory: 'O(N log N)' }
      },
      educational: {
        description: 'Torus FHE. Boolean circuit evaluation with arbitrary depth via bootstrapping.',
        useCases: ['Privacy-preserving computation', 'Secure function evaluation'],
        pros: ['Arbitrary circuit depth', 'Boolean gates'],
        cons: ['Very slow operations', 'Large keys'],
        invented: 2016,
        standardized: 'Research standard'
      },
      implementation: { nodeCrypto: null, webCrypto: null },
      securityLevel: SECURITY_LEVELS.STRONG
    }
  ]
};

function getAllAlgorithms() {
  const all = [];
  for (const category of CATEGORY_ORDER) {
    if (ALGORITHM_REGISTRY[category]) {
      for (const algo of ALGORITHM_REGISTRY[category]) {
        all.push({ ...algo, categoryDisplay: CATEGORY_DISPLAY_NAMES[category] });
      }
    }
  }
  return all;
}

function getAlgorithmsByCategory(category) {
  if (!ALGORITHM_REGISTRY[category]) return [];
  return ALGORITHM_REGISTRY[category].map(algo => ({
    ...algo,
    categoryDisplay: CATEGORY_DISPLAY_NAMES[category]
  }));
}

function getAlgorithmById(id) {
  for (const category of CATEGORY_ORDER) {
    if (ALGORITHM_REGISTRY[category]) {
      const algo = ALGORITHM_REGISTRY[category].find(a => a.id === id);
      if (algo) {
        return { ...algo, categoryDisplay: CATEGORY_DISPLAY_NAMES[category] };
      }
    }
  }
  return null;
}

function getCategories() {
  return CATEGORY_ORDER.map(cat => ({
    id: cat,
    name: CATEGORY_DISPLAY_NAMES[cat],
    count: ALGORITHM_REGISTRY[cat]?.length || 0
  }));
}

module.exports = {
  ALGORITHM_REGISTRY,
  CATEGORY_ORDER,
  CATEGORY_DISPLAY_NAMES,
  getAllAlgorithms,
  getAlgorithmsByCategory,
  getAlgorithmById,
  getCategories
};

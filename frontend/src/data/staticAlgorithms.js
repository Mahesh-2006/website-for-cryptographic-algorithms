// Auto-generated static data for GitHub Pages
// This contains all algorithm definitions from the backend registry

const SECURITY_LEVELS = {
  DEPRECATED: { label: 'Deprecated', color: 'red', severity: 1 },
  WEAK: { label: 'Weak', color: 'orange', severity: 2 },
  LEGACY: { label: 'Legacy', color: 'yellow', severity: 3 },
  STANDARD: { label: 'Standard', color: 'green', severity: 4 },
  STRONG: { label: 'Strong', color: 'darkgreen', severity: 5 },
  QUANTUM_RESISTANT: { label: 'Quantum Resistant', color: 'blue', severity: 6 }
};

export const ALGORITHM_DATA = [
  {
    id: 'aes-128', name: 'AES-128', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: 128, blockSize: 128, rounds: 10 },
    educational: { description: 'Advanced Encryption Standard with 128-bit key. Symmetric block cipher standardized by NIST in 2001, now the gold standard for encryption worldwide.', useCases: ['TLS/SSL', 'File Encryption', 'Disk Encryption', 'Wireless Security'], pros: ['Fast and efficient', 'Widely studied and verified', 'Hardware acceleration'], cons: ['Key distribution challenge', 'Same key for encrypt/decrypt'], invented: 1997, standardized: 'NIST FIPS 197' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-192', name: 'AES-192', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: 192, blockSize: 128, rounds: 12 },
    educational: { description: 'Advanced Encryption Standard with 192-bit key. Provides higher security margin than AES-128 with minimal performance impact.', useCases: ['Government classified data', 'High-security enterprise'], pros: ['Higher security margin', 'Hardware support'], cons: ['Slightly slower than AES-128'], invented: 1997, standardized: 'NIST FIPS 197' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-256', name: 'AES-256', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: 256, blockSize: 128, rounds: 14 },
    educational: { description: 'Advanced Encryption Standard with 256-bit key. Recommended for quantum-resistant encryption as Grover\'s algorithm reduces effective security to 128 bits.', useCases: ['Top secret government', 'Maximum security', 'Post-quantum preparation'], pros: ['Maximum security', 'Quantum-resistant at 128-bit effective'], cons: ['40% slower than AES-128'], invented: 1997, standardized: 'NIST FIPS 197' },
    securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
  },
  {
    id: 'des', name: 'DES', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: 56, blockSize: 64, rounds: 16 },
    educational: { description: 'Data Encryption Standard. Original block cipher from 1977, now thoroughly broken. Key space too small for modern security.', useCases: ['Legacy systems only', 'Historical reference'], pros: ['Historical importance'], cons: ['Bruteforceable in hours', '56-bit key too short', 'Known vulnerabilities'], invented: 1977, standardized: 'NIST (withdrawn)' },
    securityLevel: SECURITY_LEVELS.DEPRECATED
  },
  {
    id: 'triple-des', name: '3DES (Triple DES)', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: 168, effectiveKeySize: 112, blockSize: 64, rounds: 48 },
    educational: { description: 'Triple DES applies DES three times with different keys. Provides improved security but is much slower than AES and being deprecated.', useCases: ['Legacy banking systems', 'EMV cards', 'Older POS systems'], pros: ['Backwards compatible', 'Better than single DES'], cons: ['Slow (3x DES)', '64-bit block vulnerability', 'Being deprecated'], invented: 1998, standardized: 'NIST SP 800-67' },
    securityLevel: SECURITY_LEVELS.LEGACY
  },
  {
    id: 'chacha20', name: 'ChaCha20', category: 'symmetric', type: 'stream_cipher',
    securityParams: { keySize: 256, nonceSize: 64, rounds: 20 },
    educational: { description: 'Stream cipher designed by Daniel J. Bernstein. Excellent for mobile devices where AES hardware may not be available.', useCases: ['Mobile encryption', 'TLS (with Poly1305)', 'WireGuard VPN'], pros: ['Fast on software', 'No cache timing attacks', 'Mobile friendly'], cons: ['Less analyzed than AES'], invented: 2008, standardized: 'RFC 7539' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'blowfish', name: 'Blowfish', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: { min: 32, max: 448, default: 128 }, blockSize: 64, rounds: 16 },
    educational: { description: 'Variable-key-size block cipher by Bruce Schneier. Public domain, designed as a drop-in replacement for DES.', useCases: ['Password hashing (bcrypt)', 'File encryption', 'Legacy applications'], pros: ['Public domain', 'Variable key size', 'Fast'], cons: ['64-bit block (like DES)', 'Superseded by Twofish/AES'], invented: 1993, standardized: 'Public domain' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'twofish', name: 'Twofish', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: { min: 128, max: 256, options: [128, 192, 256] }, blockSize: 128, rounds: 16 },
    educational: { description: 'AES finalist by Bruce Schneier. Not selected as AES but considered highly secure. Uses pre-computed S-boxes.', useCases: ['File encryption', 'Disk encryption', 'High-security applications'], pros: ['AES finalist', 'Flexible key size', 'Good software performance'], cons: ['Less hardware support', 'Proprietary (patented)'], invented: 1998, standardized: 'Not NIST standard' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'rc4', name: 'RC4', category: 'symmetric', type: 'stream_cipher',
    securityParams: { keySize: { min: 40, max: 2048, typical: 128 }, stateSize: 256 },
    educational: { description: 'Rivest Cipher 4. Stream cipher with severe biases in output. Completely broken - do not use.', useCases: ['Legacy WEP', 'Legacy TLS (RC4)'], pros: ['Historically fast', 'Simple to implement'], cons: ['Known biases', 'WEP broken in 2001', 'Banned by RFC 7465'], invented: 1987, standardized: 'RFC 7465 (banned)' },
    securityLevel: SECURITY_LEVELS.DEPRECATED
  },
  {
    id: 'camellia', name: 'Camellia', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: { options: [128, 192, 256] }, blockSize: 128 },
    educational: { description: 'Japanese block cipher similar to AES. Equivalent security to AES with similar performance.', useCases: ['Japanese government', 'Europe (NESSIE)', 'SONY products'], pros: ['Equivalent to AES', 'Good performance', 'Hardware support'], cons: ['Less widely adopted outside Japan'], invented: 2000, standardized: 'ISO/IEC 18033-3, CRYPTREC' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'cast-128', name: 'CAST-128', category: 'symmetric', type: 'block_cipher',
    securityParams: { keySize: { min: 40, max: 128, typical: 128 }, blockSize: 64, rounds: 16 },
    educational: { description: 'CAST cipher family by Carlisle Adams and Stafford Tavares. Used in PGP and other applications.', useCases: ['PGP/GPG', 'Email encryption', 'Legacy applications'], pros: ['Royalty-free', 'Good performance'], cons: ['64-bit block (cryptanalysis concerns)', 'Replaced by CAST-256'], invented: 1996, standardized: 'RFC 2144, CAST-256 in RFC 2612' },
    securityLevel: SECURITY_LEVELS.LEGACY
  },
  {
    id: 'md5', name: 'MD5', category: 'hash', type: 'merkle_damgard',
    securityParams: { outputSize: 128, internalSize: 128, blockSize: 512 },
    educational: { description: 'Message-Digest Algorithm 5. Completely broken for security use. Only suitable for non-cryptographic checksums.', useCases: ['Non-cryptographic checksums', 'File integrity (legacy)'], pros: ['Fast', 'Historical importance'], cons: ['Collision attacks since 2004', 'Preimage attacks possible'], invented: 1991, standardized: 'RFC 1321 (deprecated)' },
    securityLevel: SECURITY_LEVELS.DEPRECATED
  },
  {
    id: 'sha1', name: 'SHA-1', category: 'hash', type: 'merkle_damgard',
    securityParams: { outputSize: 160, internalSize: 160, blockSize: 512 },
    educational: { description: 'Secure Hash Algorithm 1. Deprecated for security uses. Google created first collision in 2017 (SHAttered attack).', useCases: ['TLS certificates (legacy)', 'Git (internal)', 'File integrity'], pros: ['Faster than SHA-256', 'Historical use'], cons: ['Collision attacks proven', 'Deprecated for TLS'], invented: 1993, standardized: 'NIST FIPS 180-1 (deprecated)' },
    securityLevel: SECURITY_LEVELS.WEAK
  },
  {
    id: 'sha256', name: 'SHA-256', category: 'hash', type: 'merkle_damgard',
    securityParams: { outputSize: 256, internalSize: 256, blockSize: 512, rounds: 64 },
    educational: { description: 'Part of SHA-2 family. Current standard for cryptographic hashing. Used in Bitcoin, TLS, and most security applications.', useCases: ['Bitcoin mining', 'TLS/SSL', 'Digital signatures', 'Password hashing'], pros: ['Strong security', 'Widely deployed', 'Good performance'], cons: ['Slower than BLAKE2', 'Not quantum resistant'], invented: 2001, standardized: 'NIST FIPS 180-4' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'sha384', name: 'SHA-384', category: 'hash', type: 'merkle_damgard',
    securityParams: { outputSize: 384, internalSize: 512, blockSize: 1024, rounds: 80 },
    educational: { description: 'Part of SHA-2 family with 384-bit output. Used for high-security applications and TLS cipher suites.', useCases: ['TLS AES-SHA384', 'Digital certificates', 'Government use'], pros: ['Higher security than SHA-256', 'Good performance on 64-bit'], cons: ['Larger output', 'Slower than SHA-256'], invented: 2001, standardized: 'NIST FIPS 180-4' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'sha512', name: 'SHA-512', category: 'hash', type: 'merkle_damgard',
    securityParams: { outputSize: 512, internalSize: 512, blockSize: 1024, rounds: 80 },
    educational: { description: 'Part of SHA-2 family with 512-bit output. Maximum security in SHA-2 family.', useCases: ['High-security applications', 'DNSSEC', 'Long-term signatures'], pros: ['Maximum SHA-2 security', 'Good on 64-bit systems'], cons: ['Slower on 32-bit systems', 'Larger output'], invented: 2001, standardized: 'NIST FIPS 180-4' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'sha3-256', name: 'SHA3-256', category: 'hash', type: 'sponge',
    securityParams: { outputSize: 256, rate: 1088, capacity: 256, rounds: 24 },
    educational: { description: 'Keccak-based SHA-3 standard. Uses sponge construction unlike SHA-2. Different design philosophy provides diversity.', useCases: ['General cryptographic hashing', 'TLS (SHA3 draft)', 'Ethereum (Keccak)'], pros: ['Different from SHA-2', 'Elegant design', 'Quantum-resistant properties'], cons: ['Slower than BLAKE2', 'Less deployment'], invented: 2012, standardized: 'NIST FIPS 202' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'sha3-512', name: 'SHA3-512', category: 'hash', type: 'sponge',
    securityParams: { outputSize: 512, rate: 576, capacity: 1024, rounds: 24 },
    educational: { description: 'Maximum security variant of SHA-3 with 512-bit output.', useCases: ['Maximum security hashing', 'Long-term integrity'], pros: ['Maximum SHA-3 security', 'Different design from SHA-2'], cons: ['Larger output', 'Slower'], invented: 2012, standardized: 'NIST FIPS 202' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'blake2s256', name: 'BLAKE2s-256', category: 'hash', type: 'haifa',
    securityParams: { outputSize: 256, stateSize: 256, blockSize: 256, rounds: 10 },
    educational: { description: 'Modern hash function optimized for 32-bit platforms. Faster than SHA-2 with comparable security.', useCases: ['File integrity', 'Password hashing (with Argon2)', 'High-performance apps'], pros: ['Faster than SHA-256', 'Modern design', 'Tree hashing'], cons: ['Less deployed than SHA-2'], invented: 2012, standardized: 'RFC 7693' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'blake2b512', name: 'BLAKE2b-512', category: 'hash', type: 'haifa',
    securityParams: { outputSize: 512, stateSize: 512, blockSize: 1024, rounds: 12 },
    educational: { description: 'Modern hash function optimized for 64-bit platforms. Fastest cryptographic hash in many benchmarks.', useCases: ['High-speed applications', 'Zstd compression', 'File integrity'], pros: ['Fastest in class', 'Modern design', 'Parallelizable'], cons: ['Less analysis than SHA-2'], invented: 2012, standardized: 'RFC 7693' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'blake3', name: 'BLAKE3', category: 'hash', type: 'bao_tree',
    securityParams: { outputSize: 256, stateSize: 256, chunkSize: 1024, rounds: 7 },
    educational: { description: 'Latest in BLAKE family. Extremely fast using Bao authenticated tree. 10GB/s hashing speed.', useCases: ['High-speed integrity', 'Content-addressed storage', 'Cryptocurrency'], pros: ['Fastest hash (10GB/s+)', 'Parallelizable', 'Streaming support'], cons: ['Newer (less analysis)', 'Not for cryptographic signatures'], invented: 2020, standardized: 'Draft IETF' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'keccak256', name: 'Keccak-256', category: 'hash', type: 'sponge',
    securityParams: { outputSize: 256, rate: 1088, capacity: 512, rounds: 24 },
    educational: { description: 'Original Keccak before SHA-3 standardization. Used in Ethereum instead of standardized SHA-3.', useCases: ['Ethereum', 'Smart contracts'], pros: ['Same security as SHA-3', 'Different padding'], cons: ['Not the NIST standard', 'Confusion with SHA-3'], invented: 2008, standardized: 'SHA-3 (different)' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'tiger', name: 'Tiger', category: 'hash', type: 'merkle_damgard',
    securityParams: { outputSize: 192, stateSize: 192, blockSize: 512, rounds: 24 },
    educational: { description: 'Hash function designed for speed on 64-bit platforms. Not as widely adopted.', useCases: ['Historical use', 'Some file sharing'], pros: ['Fast on 64-bit', '192-bit output'], cons: ['Some collision weaknesses', 'Replaced by BLAKE2'], invented: 1996, standardized: 'Not NIST' },
    securityLevel: SECURITY_LEVELS.LEGACY
  },
  {
    id: 'whirlpool', name: 'Whirlpool', category: 'hash', type: 'miyaguchi_preneel',
    securityParams: { outputSize: 512, stateSize: 512, blockSize: 512, rounds: 10 },
    educational: { description: '512-bit hash based on AES components. Part of ISO/IEC 10118-3 standard.', useCases: ['ISO standard applications', 'European projects'], pros: ['AES-based design', '512-bit output'], cons: ['Slow', 'Limited adoption'], invented: 2000, standardized: 'ISO/IEC 10118-3' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'hmac-sha256', name: 'HMAC-SHA256', category: 'mac', type: 'hmac',
    securityParams: { hashFunction: 'sha256', outputSize: 256, keySize: { min: 64, recommended: 256 } },
    educational: { description: 'Hash-based Message Authentication Code using SHA-256. Most widely used MAC algorithm.', useCases: ['API authentication', 'TLS', 'Message integrity'], pros: ['Well-studied', 'Simple', 'Based on secure hash'], cons: ['Key must be as long as block size'], invented: 1996, standardized: 'RFC 2104, FIPS 198' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'hmac-sha512', name: 'HMAC-SHA512', category: 'mac', type: 'hmac',
    securityParams: { hashFunction: 'sha512', outputSize: 512, keySize: { min: 128, recommended: 512 } },
    educational: { description: 'HMAC using SHA-512 for high-security applications requiring larger output.', useCases: ['High-security APIs', 'Financial systems', 'Government'], pros: ['Higher security than HMAC-SHA256', '256-bit tag'], cons: ['Slower than HMAC-SHA256'], invented: 1996, standardized: 'RFC 2104, FIPS 198' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'cmac-aes128', name: 'CMAC-AES-128', category: 'mac', type: 'block_cipher_mac',
    securityParams: { blockCipher: 'aes128', outputSize: 128, keySize: 128 },
    educational: { description: 'Cipher-based Message Authentication Code using AES-128. NIST approved.', useCases: ['NIST approved MAC', 'TLS/SSL', 'IPsec'], pros: ['NIST approved', 'Based on AES'], cons: ['Requires two cipher calls'], invented: 2005, standardized: 'NIST SP 800-38B' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'poly1305', name: 'Poly1305', category: 'mac', type: 'polynomial_mac',
    securityParams: { outputSize: 128, keySize: 256, precision: 130 },
    educational: { description: 'Polynomial hash-based MAC. Extremely fast with provable security when combined with a cipher.', useCases: ['ChaCha20-Poly1305', 'TLS 1.3', 'Signal protocol'], pros: ['Very fast', 'Provable security', 'Short output'], cons: ['One-time key required'], invented: 2004, standardized: 'RFC 7539' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'gmac', name: 'GMAC (GHASH)', category: 'mac', type: 'galois_mac',
    securityParams: { outputSize: 128, keySize: 128, field: 'GF(2^128)' },
    educational: { description: 'Galois Message Authentication Code. Used in AES-GCM mode. Requires final XOR with IV.', useCases: ['AES-GCM', 'TLS AES-GCM'], pros: ['Hardware accelerated', 'Efficient'], cons: ['IV requirements', 'Not standalone'], invented: 2004, standardized: 'NIST SP 800-38D' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'cbc-mac', name: 'CBC-MAC', category: 'mac', type: 'block_cipher_mac',
    securityParams: { blockCipher: 'aes', outputSize: 128, keySize: 128 },
    educational: { description: 'Cipher Block Chaining MAC. Insecure without length-field encryption. Foundation for CMAC.', useCases: ['Legacy systems', 'Foundation for CMAC'], pros: ['Simple'], cons: ['Length attack', 'Not secure alone'], invented: 1979, standardized: 'NIST SP 800-38A (legacy)' },
    securityLevel: SECURITY_LEVELS.WEAK
  },
  {
    id: 'aes-128-gcm', name: 'AES-128-GCM', category: 'authenticatedEncryption', type: 'aead',
    securityParams: { cipher: 'aes128', mode: 'gcm', ivSize: 96, tagSize: 128 },
    educational: { description: 'AES in Galois/Counter Mode. TLS 1.3 default cipher. Provides both confidentiality and authenticity.', useCases: ['TLS 1.3', 'VPN', 'File encryption', 'WiFi (WPA3)'], pros: ['Authenticated encryption', 'Hardware accelerated', 'TLS default'], cons: ['Nonce reuse catastrophic', 'Side-channel concerns'], invented: 2004, standardized: 'NIST SP 800-38D' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-256-gcm', name: 'AES-256-GCM', category: 'authenticatedEncryption', type: 'aead',
    securityParams: { cipher: 'aes256', mode: 'gcm', ivSize: 96, tagSize: 128 },
    educational: { description: 'AES-256-GCM with 256-bit key. Maximum security AEAD cipher. TLS 1.3 default for high security.', useCases: ['Top secret TLS', 'Government encryption', 'Maximum security'], pros: ['256-bit security', 'Authenticated', 'Quantum resistant (128-bit effective)'], cons: ['Slower than AES-128-GCM', 'Nonce reuse risk'], invented: 2004, standardized: 'NIST SP 800-38D' },
    securityLevel: SECURITY_LEVELS.QUANTUM_RESISTANT
  },
  {
    id: 'chacha20-poly1305', name: 'ChaCha20-Poly1305', category: 'authenticatedEncryption', type: 'aead',
    securityParams: { cipher: 'chacha20', mac: 'poly1305', keySize: 256, nonceSize: 96 },
    educational: { description: 'Stream cipher with polynomial MAC. TLS 1.3 cipher for mobile devices without AES hardware.', useCases: ['Mobile TLS', 'Signal', 'WireGuard'], pros: ['Fast on all devices', 'No timing attacks', 'Modern design'], cons: ['Less analyzed than AES-GCM', 'No hardware acceleration (usually)'], invented: 2013, standardized: 'RFC 7539, RFC 7905' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-128-ccm', name: 'AES-128-CCM', category: 'authenticatedEncryption', type: 'aead',
    securityParams: { cipher: 'aes128', mode: 'ccm', nonceSize: 104, tagSize: 128 },
    educational: { description: 'Counter with CBC-MAC. Two-pass AEAD. Used in some TLS ciphers and WiFi (WPA2).', useCases: ['WiFi (WPA2)', 'Some TLS ciphers', 'IoT'], pros: ['Single primitive (AES)', 'Proven security'], cons: ['Two passes (slower)', 'Complex implementation'], invented: 2003, standardized: 'NIST SP 800-38C' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'aes-gcm-siv', name: 'AES-GCM-SIV', category: 'authenticatedEncryption', type: 'aead',
    securityParams: { cipher: 'aes', mode: 'gcm-siv', nonceSize: 96, tagSize: 128 },
    educational: { description: 'Nonce-misuse resistant variant of GCM. Provides limited security even with nonce reuse.', useCases: ['High-security applications', 'Systems prone to nonce reuse'], pros: ['Nonce-misuse resistant', 'Deterministic option'], cons: ['Newer (less analysis)', 'Slightly slower than GCM'], invented: 2015, standardized: 'RFC 8452' },
    securityLevel: SECURITY_LEVELS.STRONG
  },
  {
    id: 'aes-eax', name: 'AES-EAX', category: 'authenticatedEncryption', type: 'aead',
    securityParams: { cipher: 'aes', mode: 'eax', nonceSize: 128, tagSize: 128 },
    educational: { description: 'Two-pass AEAD using AES-CTR and OMAC. Simpler than CCM, proven secure.', useCases: ['Academic reference', 'Formal verification'], pros: ['Simple design', 'Proven security'], cons: ['Two passes', 'Patented'], invented: 2003, standardized: 'IEEE 1619' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'rsa-2048', name: 'RSA-2048', category: 'asymmetric', type: 'public_key_encryption',
    securityParams: { keySize: 2048, publicExponent: 65537, modulusSize: 2048 },
    educational: { description: 'RSA with 2048-bit modulus. Most widely used asymmetric encryption. Security based on integer factorization.', useCases: ['TLS certificates', 'PGP/GPG', 'Digital signatures', 'Key exchange'], pros: ['Most deployed', 'Well understood'], cons: ['Vulnerable to quantum', 'Large keys', 'Slow operations'], invented: 1977, standardized: 'PKCS#1, IEEE 1363' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
  {
    id: 'rsa-4096', name: 'RSA-4096', category: 'asymmetric', type: 'public_key_encryption',
    securityParams: { keySize: 4096, publicExponent: 65537, modulusSize: 4096 },
    educational: { description: 'RSA with 4096-bit modulus. Higher security RSA for sensitive applications.', useCases: ['CA root keys', 'Long-term secrets', 'Government'], pros: ['Higher security margin'], cons: ['Very large keys', 'Very slow', 'Quantum vulnerable'], invented: 1977, standardized: 'PKCS#1' },
    securityLevel: SECURITY_LEVELS.STANDARD
  },
];

export const CATEGORY_DATA = [
  { id: 'symmetric', name: 'Symmetric Encryption', icon: '🔐' },
  { id: 'hash', name: 'Hash Functions', icon: '#️⃣' },
  { id: 'mac', name: 'Message Authentication Codes', icon: '🔏' },
  { id: 'authenticatedEncryption', name: 'Authenticated Encryption', icon: '🛡️' },
  { id: 'asymmetric', name: 'Asymmetric Encryption', icon: '🔑' },
  { id: 'digitalSignatures', name: 'Digital Signatures', icon: '📝' },
  { id: 'keyExchange', name: 'Key Exchange', icon: '🤝' },
  { id: 'passwordHashing', name: 'Password Hashing', icon: '🔒' },
  { id: 'postQuantum', name: 'Post-Quantum Cryptography', icon: '⚛️' },
  { id: 'zeroKnowledge', name: 'Zero-Knowledge Proofs', icon: '🎭' },
  { id: 'homomorphic', name: 'Homomorphic Encryption', icon: '🧮' }
];

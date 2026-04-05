export interface Algorithm {
  id: string
  name: string
  category: string
  type: string
  description: string
  keySize?: string
  security?: string
  useCase: string
}

export const CATEGORIES = [
  'Symmetric Encryption',
  'Asymmetric Encryption',
  'Hash Functions',
  'Digital Signatures',
  'Authentication',
  'Key Exchange',
  'Key Management',
  'Message Integrity',
  'Password Hashing',
  'Secure Communication',
  'Email Security',
  'Homomorphic Encryption',
  'Post-Quantum',
  'Zero-Knowledge Proofs',
] as const

export const algorithms: Algorithm[] = [
  // ── Symmetric Encryption ──────────────────────────────────────────────
  {
    id: 'aes-256',
    name: 'AES-256',
    category: 'Symmetric Encryption',
    type: 'Block Cipher',
    description:
      'Advanced Encryption Standard with a 256-bit key, widely regarded as the gold standard for symmetric encryption. Adopted by NIST in 2001 and used worldwide for classified and commercial data protection.',
    keySize: '256 bits',
    security: '256-bit',
    useCase: 'Full-disk encryption, TLS traffic protection, and government classified data.',
  },
  {
    id: 'chacha20',
    name: 'ChaCha20',
    category: 'Symmetric Encryption',
    type: 'Stream Cipher',
    description:
      'A high-speed stream cipher designed by Daniel J. Bernstein as a refinement of Salsa20. Offers excellent performance in software without hardware AES acceleration.',
    keySize: '256 bits',
    security: '256-bit',
    useCase: 'Mobile device encryption, TLS on devices without AES-NI, and VPN tunnels.',
  },
  {
    id: 'twofish',
    name: 'Twofish',
    category: 'Symmetric Encryption',
    type: 'Block Cipher',
    description:
      'A 128-bit block cipher and AES finalist designed by Bruce Schneier. Supports key sizes up to 256 bits and features a complex key-dependent S-box design.',
    keySize: '128 / 192 / 256 bits',
    security: '256-bit',
    useCase: 'Open-source disk encryption tools and legacy secure storage applications.',
  },
  {
    id: 'serpent',
    name: 'Serpent',
    category: 'Symmetric Encryption',
    type: 'Block Cipher',
    description:
      'An AES finalist with a conservative 32-round design that prioritizes security margin over raw speed. Considered one of the most secure block ciphers ever designed.',
    keySize: '128 / 192 / 256 bits',
    security: '256-bit',
    useCase: 'High-assurance environments where security margin is valued over throughput.',
  },
  {
    id: 'blowfish',
    name: 'Blowfish',
    category: 'Symmetric Encryption',
    type: 'Block Cipher',
    description:
      'A fast 64-bit block cipher designed by Bruce Schneier in 1993. Its compact design made it popular in embedded systems, though its small block size limits modern use.',
    keySize: '32-448 bits',
    security: '~64-bit block',
    useCase: 'Legacy embedded systems and password hashing via bcrypt derivation.',
  },
  {
    id: 'camellia',
    name: 'Camellia',
    category: 'Symmetric Encryption',
    type: 'Block Cipher',
    description:
      'A 128-bit block cipher jointly developed by Mitsubishi Electric and NTT. Comparable in security and performance to AES, approved by ISO/IEC and widely used in Japan.',
    keySize: '128 / 192 / 256 bits',
    security: '256-bit',
    useCase: 'TLS cipher suites, Japanese government systems, and smart card applications.',
  },
  {
    id: '3des',
    name: '3DES',
    category: 'Symmetric Encryption',
    type: 'Block Cipher',
    description:
      'Triple Data Encryption Standard applies the legacy DES cipher three times with two or three independent keys. Deprecated by NIST in 2023 due to its 64-bit block size.',
    keySize: '112 / 168 bits',
    security: '~112-bit',
    useCase: 'Legacy financial transaction systems and backward-compatible payment terminals.',
  },
  {
    id: 'rc4',
    name: 'RC4',
    category: 'Symmetric Encryption',
    type: 'Stream Cipher',
    description:
      'A once-popular stream cipher designed by Ron Rivest in 1987. Multiple statistical biases in its keystream have been discovered, and it is now considered broken for most uses.',
    keySize: '40-2048 bits',
    security: 'Broken',
    useCase: 'Historical use in WEP and early TLS; no longer recommended for any application.',
  },
  {
    id: 'salsa20',
    name: 'Salsa20',
    category: 'Symmetric Encryption',
    type: 'Stream Cipher',
    description:
      'A 256-bit stream cipher by Daniel J. Bernstein, selected for the eSTREAM portfolio. Its ARX design (add-rotate-XOR) enables efficient constant-time software implementations.',
    keySize: '128 / 256 bits',
    security: '256-bit',
    useCase: 'File encryption libraries and lightweight cryptographic protocols.',
  },
  {
    id: 'aes-128-gcm',
    name: 'AES-128-GCM',
    category: 'Symmetric Encryption',
    type: 'AEAD Cipher',
    description:
      'AES in Galois/Counter Mode provides authenticated encryption with associated data. Combines CTR mode encryption with GHASH authentication in a single efficient pass.',
    keySize: '128 bits',
    security: '128-bit',
    useCase: 'TLS 1.3 default cipher suite, API payload encryption, and cloud storage.',
  },
  {
    id: 'xchacha20-poly1305',
    name: 'XChaCha20-Poly1305',
    category: 'Symmetric Encryption',
    type: 'AEAD Cipher',
    description:
      'Extended-nonce variant of ChaCha20-Poly1305 with a 192-bit nonce, eliminating practical nonce-reuse concerns. Provides authenticated encryption without hardware acceleration.',
    keySize: '256 bits',
    security: '256-bit',
    useCase: 'Libsodium-based applications, encrypted messaging, and file encryption.',
  },

  // ── Asymmetric Encryption ─────────────────────────────────────────────
  {
    id: 'rsa-oaep',
    name: 'RSA-OAEP',
    category: 'Asymmetric Encryption',
    type: 'Public-Key Encryption',
    description:
      'RSA with Optimal Asymmetric Encryption Padding, a provably secure padding scheme that prevents chosen-ciphertext attacks on RSA encryption.',
    keySize: '2048-4096 bits',
    security: '~112-128-bit equivalent',
    useCase: 'Encrypting session keys, secure email content, and key wrapping in HSMs.',
  },
  {
    id: 'elgamal',
    name: 'ElGamal',
    category: 'Asymmetric Encryption',
    type: 'Public-Key Encryption',
    description:
      'An asymmetric encryption scheme based on the Diffie-Hellman key exchange. Provides semantic security under the decisional Diffie-Hellman assumption.',
    keySize: '2048+ bits',
    security: '~112-bit equivalent',
    useCase: 'GNU Privacy Guard encryption and hybrid encryption schemes.',
  },
  {
    id: 'ecies',
    name: 'ECIES',
    category: 'Asymmetric Encryption',
    type: 'Hybrid Encryption',
    description:
      'Elliptic Curve Integrated Encryption Scheme combines ECDH key agreement with symmetric encryption and a MAC. Offers compact ciphertexts with strong security.',
    keySize: '256-521 bits (EC)',
    security: '128-256-bit equivalent',
    useCase: 'Ethereum transaction encryption, secure messaging, and IoT device communication.',
  },
  {
    id: 'rsa-2048',
    name: 'RSA-2048',
    category: 'Asymmetric Encryption',
    type: 'Public-Key Encryption',
    description:
      'RSA with a 2048-bit modulus, the current minimum recommended key size. Security relies on the computational difficulty of factoring large semiprimes.',
    keySize: '2048 bits',
    security: '~112-bit equivalent',
    useCase: 'TLS certificates, code signing, and secure key transport.',
  },

  // ── Hash Functions ────────────────────────────────────────────────────
  {
    id: 'sha-256',
    name: 'SHA-256',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A member of the SHA-2 family producing a 256-bit digest. Designed by the NSA and standardized by NIST, it is the backbone of Bitcoin mining and certificate validation.',
    keySize: 'N/A',
    security: '128-bit collision resistance',
    useCase: 'Digital certificates, blockchain proof-of-work, and software integrity verification.',
  },
  {
    id: 'sha-3',
    name: 'SHA-3',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'Based on the Keccak sponge construction, SHA-3 provides an alternative to SHA-2 with a completely different internal design. Standardized by NIST in 2015.',
    keySize: 'N/A',
    security: '128-bit collision resistance (SHA3-256)',
    useCase: 'Diversified hash requirements, Ethereum address derivation, and future-proof hashing.',
  },
  {
    id: 'sha-512',
    name: 'SHA-512',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A SHA-2 variant producing a 512-bit digest, operating on 64-bit words. Often faster than SHA-256 on 64-bit platforms while providing a larger security margin.',
    keySize: 'N/A',
    security: '256-bit collision resistance',
    useCase: 'Digital signatures, certificate chains, and high-security integrity checks.',
  },
  {
    id: 'blake2b',
    name: 'BLAKE2b',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A high-performance hash function faster than MD5 while remaining at least as secure as SHA-3. Optimized for 64-bit platforms with variable output length up to 512 bits.',
    keySize: 'N/A',
    security: '128-256-bit collision resistance',
    useCase: 'File integrity checking, password hashing input, and blockchain protocols.',
  },
  {
    id: 'blake3',
    name: 'BLAKE3',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A parallelizable, tree-based hash function derived from BLAKE2. Designed for extreme throughput on modern multi-core and SIMD hardware.',
    keySize: 'N/A',
    security: '128-bit collision resistance',
    useCase: 'Large file checksums, content-addressable storage, and high-throughput data pipelines.',
  },
  {
    id: 'ripemd-160',
    name: 'RIPEMD-160',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A 160-bit hash function developed in the European RIPE project. Used historically in Bitcoin address generation alongside SHA-256.',
    keySize: 'N/A',
    security: '80-bit collision resistance',
    useCase: 'Bitcoin address derivation (legacy) and PGP fingerprints.',
  },
  {
    id: 'md5',
    name: 'MD5',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A 128-bit hash function designed by Ron Rivest in 1991. Practical collision attacks have been demonstrated since 2004, making it unsuitable for security purposes.',
    keySize: 'N/A',
    security: 'Broken',
    useCase: 'Non-cryptographic checksums only; no longer safe for certificates or integrity.',
  },
  {
    id: 'whirlpool',
    name: 'Whirlpool',
    category: 'Hash Functions',
    type: 'Cryptographic Hash',
    description:
      'A 512-bit hash function based on a modified AES-like block cipher. Standardized by ISO/IEC and adopted by the NESSIE project.',
    keySize: 'N/A',
    security: '256-bit collision resistance',
    useCase: 'ISO-compliant integrity verification and European cryptographic standards.',
  },

  // ── Digital Signatures ────────────────────────────────────────────────
  {
    id: 'ed25519',
    name: 'Ed25519',
    category: 'Digital Signatures',
    type: 'EdDSA Signature',
    description:
      'A high-speed digital signature scheme using the Curve25519 Edwards curve. Produces compact 64-byte signatures with deterministic nonce generation, preventing many implementation pitfalls.',
    keySize: '256-bit curve',
    security: '~128-bit equivalent',
    useCase: 'SSH key authentication, software signing, and blockchain transaction validation.',
  },
  {
    id: 'ecdsa-p256',
    name: 'ECDSA P-256',
    category: 'Digital Signatures',
    type: 'Elliptic Curve Signature',
    description:
      'Elliptic Curve Digital Signature Algorithm on the NIST P-256 curve. Widely deployed in TLS and web PKI, though it requires careful random nonce generation.',
    keySize: '256-bit curve',
    security: '~128-bit equivalent',
    useCase: 'TLS certificates, Apple/Google code signing, and WebAuthn attestation.',
  },
  {
    id: 'rsa-pss',
    name: 'RSA-PSS',
    category: 'Digital Signatures',
    type: 'RSA Signature',
    description:
      'RSA Probabilistic Signature Scheme, a provably secure signature padding mode. Preferred over the older PKCS#1 v1.5 scheme for new applications.',
    keySize: '2048-4096 bits',
    security: '~112-128-bit equivalent',
    useCase: 'TLS 1.3 handshake signatures, CA certificate signing, and document signing.',
  },
  {
    id: 'eddsa',
    name: 'EdDSA',
    category: 'Digital Signatures',
    type: 'Edwards-Curve Signature',
    description:
      'A general Edwards-curve Digital Signature Algorithm framework encompassing Ed25519 and Ed448. Provides strong security guarantees with deterministic signatures.',
    keySize: '256 / 448-bit curves',
    security: '128 / 224-bit equivalent',
    useCase: 'Modern protocol authentication, DNSSEC, and decentralized identity systems.',
  },
  {
    id: 'schnorr',
    name: 'Schnorr Signature',
    category: 'Digital Signatures',
    type: 'Discrete-Log Signature',
    description:
      'A clean and efficient signature scheme based on the discrete logarithm problem. Enables native multi-signature aggregation and forms the basis of many modern schemes.',
    keySize: '256-bit group',
    security: '~128-bit equivalent',
    useCase: 'Bitcoin Taproot transactions, multi-signature wallets, and threshold signing.',
  },

  // ── Message Integrity ─────────────────────────────────────────────────
  {
    id: 'hmac-sha256',
    name: 'HMAC-SHA256',
    category: 'Message Integrity',
    type: 'MAC',
    description:
      'A keyed-hash message authentication code using SHA-256 as the inner hash. Provides both data integrity and authenticity verification with provable security.',
    keySize: '256 bits recommended',
    security: '256-bit',
    useCase: 'API request signing (AWS SigV4), JWT token verification, and webhook validation.',
  },
  {
    id: 'poly1305',
    name: 'Poly1305',
    category: 'Message Integrity',
    type: 'One-Time MAC',
    description:
      'A fast one-time authenticator designed by Daniel J. Bernstein. Produces a 128-bit tag and is typically combined with ChaCha20 or AES for authenticated encryption.',
    keySize: '256-bit (one-time)',
    security: '128-bit',
    useCase: 'AEAD constructions (ChaCha20-Poly1305), TLS record authentication.',
  },
  {
    id: 'gmac',
    name: 'GMAC',
    category: 'Message Integrity',
    type: 'MAC',
    description:
      'Galois Message Authentication Code is the authentication-only variant of GCM mode. Uses fast Galois field multiplication for hardware-accelerated tag computation.',
    keySize: '128 / 256 bits',
    security: '128-bit',
    useCase: 'Network packet authentication, MACsec (IEEE 802.1AE), and IPsec integrity.',
  },
  {
    id: 'cmac',
    name: 'CMAC',
    category: 'Message Integrity',
    type: 'MAC',
    description:
      'Cipher-based Message Authentication Code built on a block cipher (typically AES). Standardized by NIST SP 800-38B for use in constrained environments.',
    keySize: '128 / 256 bits',
    security: '64-128-bit tag',
    useCase: 'Smart card protocols, NFC payment authentication, and embedded device messaging.',
  },
  {
    id: 'siphash',
    name: 'SipHash',
    category: 'Message Integrity',
    type: 'Keyed Hash / PRF',
    description:
      'A fast short-input pseudorandom function optimized for hash-table protection. Designed to prevent hash-flooding denial-of-service attacks with minimal overhead.',
    keySize: '128 bits',
    security: 'PRF security',
    useCase: 'Hash table randomization in programming language runtimes (Rust, Python, Redis).',
  },

  // ── Password Hashing ──────────────────────────────────────────────────
  {
    id: 'argon2id',
    name: 'Argon2id',
    category: 'Password Hashing',
    type: 'Memory-Hard KDF',
    description:
      'Winner of the Password Hashing Competition (2015), Argon2id is a hybrid of data-dependent and data-independent memory access patterns. Resists both GPU and side-channel attacks.',
    keySize: 'Variable output',
    security: 'Configurable cost',
    useCase: 'User password storage, credential databases, and key derivation from passphrases.',
  },
  {
    id: 'bcrypt',
    name: 'bcrypt',
    category: 'Password Hashing',
    type: 'Adaptive Hash',
    description:
      'A password hashing function based on the Blowfish cipher with a configurable work factor. Its built-in salt and exponential cost scaling have made it an industry standard since 1999.',
    keySize: '184-bit output',
    security: 'Configurable cost',
    useCase: 'Web application password storage and legacy authentication systems.',
  },
  {
    id: 'scrypt',
    name: 'scrypt',
    category: 'Password Hashing',
    type: 'Memory-Hard KDF',
    description:
      'A memory-hard key derivation function designed to make large-scale hardware attacks expensive. Requires significant RAM in addition to CPU time.',
    keySize: 'Variable output',
    security: 'Configurable cost',
    useCase: 'Cryptocurrency proof-of-work (Litecoin), encrypted wallet protection.',
  },
  {
    id: 'pbkdf2',
    name: 'PBKDF2',
    category: 'Password Hashing',
    type: 'Iterated KDF',
    description:
      'Password-Based Key Derivation Function 2 applies a PRF (usually HMAC-SHA256) iteratively. Standardized in PKCS#5 and NIST SP 800-132 but lacks memory-hardness.',
    keySize: 'Variable output',
    security: 'Configurable iterations',
    useCase: 'Wi-Fi WPA2 key derivation, LUKS disk encryption, and FIPS-compliant systems.',
  },

  // ── Key Exchange ──────────────────────────────────────────────────────
  {
    id: 'x25519',
    name: 'X25519',
    category: 'Key Exchange',
    type: 'ECDH Key Agreement',
    description:
      'Elliptic-curve Diffie-Hellman over Curve25519, designed for simplicity and resistance to timing attacks. A single fixed-base scalar multiplication computes the shared secret.',
    keySize: '256-bit curve',
    security: '~128-bit equivalent',
    useCase: 'TLS 1.3 key exchange, Signal Protocol ratchets, and WireGuard handshakes.',
  },
  {
    id: 'diffie-hellman',
    name: 'Diffie-Hellman',
    category: 'Key Exchange',
    type: 'Key Agreement',
    description:
      'The original public-key agreement protocol (1976) allowing two parties to establish a shared secret over an insecure channel. Security relies on the discrete logarithm problem.',
    keySize: '2048+ bits (finite field)',
    security: '~112-bit equivalent',
    useCase: 'IPsec IKE negotiation, legacy VPN tunnels, and academic cryptography education.',
  },
  {
    id: 'ecdh',
    name: 'ECDH',
    category: 'Key Exchange',
    type: 'Elliptic Curve Key Agreement',
    description:
      'Elliptic-Curve Diffie-Hellman allows two parties to agree on a shared secret using elliptic curve key pairs. Provides equivalent security to finite-field DH with much smaller keys.',
    keySize: '256-384-bit curves',
    security: '128-192-bit equivalent',
    useCase: 'TLS handshake key negotiation, Bluetooth pairing, and smart card authentication.',
  },

  // ── Key Management ────────────────────────────────────────────────────
  {
    id: 'hkdf',
    name: 'HKDF',
    category: 'Key Management',
    type: 'Key Derivation Function',
    description:
      'HMAC-based Key Derivation Function extracts and expands keying material in two stages. Standardized in RFC 5869 for deriving multiple keys from a single shared secret.',
    keySize: 'Variable output',
    security: 'Depends on hash function',
    useCase: 'TLS 1.3 key schedule, Signal Protocol key derivation, and multi-key generation.',
  },
  {
    id: 'shamir-secret-sharing',
    name: 'Shamir Secret Sharing',
    category: 'Key Management',
    type: 'Threshold Scheme',
    description:
      'A (k, n) threshold scheme using polynomial interpolation to split a secret into n shares, any k of which can reconstruct it. Information-theoretically secure with fewer than k shares.',
    keySize: 'Arbitrary secret size',
    security: 'Information-theoretic',
    useCase: 'Cryptocurrency wallet recovery, root key escrow, and disaster recovery key backup.',
  },
  {
    id: 'aes-keywrap',
    name: 'AES Key Wrap',
    category: 'Key Management',
    type: 'Key Encapsulation',
    description:
      'A deterministic authenticated-encryption scheme (RFC 3394) specifically designed for wrapping cryptographic keys. Provides integrity and confidentiality without a nonce.',
    keySize: '128 / 192 / 256 bits',
    security: 'Matches AES key size',
    useCase: 'HSM key export/import, JOSE/JWE key encryption, and PKCS#11 key wrapping.',
  },

  // ── Secure Communication ──────────────────────────────────────────────
  {
    id: 'tls-1-3',
    name: 'TLS 1.3',
    category: 'Secure Communication',
    type: 'Transport Protocol',
    description:
      'The latest Transport Layer Security version reduces handshake latency to one round trip and removes legacy insecure cipher suites. Mandates forward secrecy and AEAD encryption.',
    keySize: 'Negotiated (128/256-bit)',
    security: '128-256-bit',
    useCase: 'HTTPS web traffic, API communication, and any TCP-based secure transport.',
  },
  {
    id: 'ssh',
    name: 'SSH',
    category: 'Secure Communication',
    type: 'Remote Access Protocol',
    description:
      'Secure Shell provides encrypted remote login, command execution, and tunneling. Uses public-key authentication and negotiated symmetric encryption for the data channel.',
    keySize: 'Negotiated',
    security: '128-256-bit',
    useCase: 'Server administration, Git repository access, and secure file transfers (SFTP).',
  },
  {
    id: 'ipsec',
    name: 'IPsec',
    category: 'Secure Communication',
    type: 'Network Layer Protocol',
    description:
      'A suite of protocols (AH, ESP, IKE) providing authentication, integrity, and confidentiality at the IP layer. Operates transparently to applications above the network stack.',
    keySize: 'Negotiated',
    security: '128-256-bit',
    useCase: 'Site-to-site VPNs, corporate network tunnels, and IPv6 mandatory security.',
  },
  {
    id: 'kerberos',
    name: 'Kerberos',
    category: 'Secure Communication',
    type: 'Authentication Protocol',
    description:
      'A ticket-based network authentication protocol using symmetric cryptography and a trusted third-party KDC. Provides mutual authentication and single sign-on capabilities.',
    keySize: '128 / 256-bit (AES)',
    security: '128-256-bit',
    useCase: 'Active Directory authentication, enterprise SSO, and Hadoop cluster security.',
  },
  {
    id: 'wireguard',
    name: 'WireGuard',
    category: 'Secure Communication',
    type: 'VPN Protocol',
    description:
      'A modern, minimal VPN protocol with roughly 4,000 lines of code. Uses Noise protocol framework with X25519, ChaCha20-Poly1305, and BLAKE2s for a simple, auditable design.',
    keySize: '256 bits',
    security: '128-bit equivalent',
    useCase: 'Personal and enterprise VPN tunnels, container networking, and mobile VPN.',
  },
  {
    id: 'signal-protocol',
    name: 'Signal Protocol',
    category: 'Secure Communication',
    type: 'End-to-End Encryption',
    description:
      'A double-ratchet protocol combining X3DH key agreement with symmetric ratcheting for forward secrecy and break-in recovery. The standard for modern secure messaging.',
    keySize: '256-bit curve keys',
    security: '~128-bit equivalent',
    useCase: 'Signal, WhatsApp, and Facebook Messenger encrypted conversations.',
  },
  {
    id: 'mls',
    name: 'MLS',
    category: 'Secure Communication',
    type: 'Group Messaging Protocol',
    description:
      'Messaging Layer Security is an IETF protocol providing efficient end-to-end encryption for large groups. Uses tree-based key agreement to scale ratcheting to thousands of members.',
    keySize: 'Negotiated',
    security: '~128-bit equivalent',
    useCase: 'Enterprise group chat, video conferencing encryption, and large-scale messaging.',
  },
  {
    id: 'noise-framework',
    name: 'Noise Protocol Framework',
    category: 'Secure Communication',
    type: 'Handshake Framework',
    description:
      'A framework for building crypto protocols with a small set of DH-based handshake patterns. Supports various authentication modes and is used by WireGuard, Lightning, and libp2p.',
    keySize: '256-bit DH keys',
    security: '~128-bit equivalent',
    useCase: 'Custom protocol design, peer-to-peer networking, and IoT secure channels.',
  },

  // ── Authentication ────────────────────────────────────────────────────
  {
    id: 'srp',
    name: 'SRP',
    category: 'Authentication',
    type: 'Password-Authenticated Key Exchange',
    description:
      'Secure Remote Password protocol allows password-based authentication without transmitting the password. The server stores only a verifier, not the password or its hash.',
    keySize: '2048+ bits',
    security: '~112-bit equivalent',
    useCase: 'ProtonMail authentication, Apple iCloud Keychain, and zero-knowledge login.',
  },
  {
    id: 'webauthn-fido2',
    name: 'WebAuthn/FIDO2',
    category: 'Authentication',
    type: 'Challenge-Response Protocol',
    description:
      'A W3C/FIDO Alliance standard for phishing-resistant passwordless authentication. Uses public-key credentials bound to the origin and hardware authenticators.',
    keySize: '256-bit EC keys (typical)',
    security: '~128-bit equivalent',
    useCase: 'Passwordless web login, hardware security key authentication, and biometric sign-in.',
  },
  {
    id: 'totp',
    name: 'TOTP',
    category: 'Authentication',
    type: 'One-Time Password',
    description:
      'Time-based One-Time Password generates short-lived codes from a shared secret and the current time. Defined in RFC 6238 as an extension of HOTP.',
    keySize: '160-bit shared secret',
    security: '~20-bit per code',
    useCase: 'Two-factor authentication apps (Google Authenticator, Authy) and VPN login.',
  },
  {
    id: 'opaque',
    name: 'OPAQUE',
    category: 'Authentication',
    type: 'Asymmetric PAKE',
    description:
      'An asymmetric password-authenticated key exchange that never reveals the password to the server, even during registration. Combines OPRF with key exchange for strong guarantees.',
    keySize: '256-bit curve keys',
    security: '~128-bit equivalent',
    useCase: 'Next-generation password authentication, replacing SRP in modern protocols.',
  },

  // ── Email Security ────────────────────────────────────────────────────
  {
    id: 'dkim',
    name: 'DKIM',
    category: 'Email Security',
    type: 'Email Authentication',
    description:
      'DomainKeys Identified Mail lets a sending domain sign email headers and body with a private key. Recipients verify signatures using public keys published in DNS TXT records.',
    keySize: '1024-2048-bit RSA',
    security: '~80-112-bit equivalent',
    useCase: 'Email sender verification, anti-spoofing, and deliverability improvement.',
  },
  {
    id: 's-mime',
    name: 'S/MIME',
    category: 'Email Security',
    type: 'Email Encryption',
    description:
      'Secure/Multipurpose Internet Mail Extensions provides end-to-end encryption and digital signatures for email using X.509 certificates and CMS enveloped data.',
    keySize: '2048+ bits (RSA) / 256-bit (EC)',
    security: '112-128-bit equivalent',
    useCase: 'Enterprise email encryption, government secure communication, and regulated industries.',
  },
  {
    id: 'openpgp',
    name: 'OpenPGP',
    category: 'Email Security',
    type: 'Email Encryption',
    description:
      'An open standard (RFC 4880) for email encryption and signing using a web-of-trust model. Supports both RSA and elliptic curve keys with a decentralized trust architecture.',
    keySize: '2048-4096-bit RSA / 256-bit EC',
    security: '112-128-bit equivalent',
    useCase: 'Encrypted email (GPG), file signing, software package verification, and key servers.',
  },

  // ── Homomorphic Encryption ────────────────────────────────────────────
  {
    id: 'paillier',
    name: 'Paillier',
    category: 'Homomorphic Encryption',
    type: 'Partially Homomorphic',
    description:
      'An additive homomorphic encryption scheme based on composite residuosity. Allows addition of ciphertexts and scalar multiplication without decryption.',
    keySize: '2048+ bits',
    security: '~112-bit equivalent',
    useCase: 'Electronic voting tallying, privacy-preserving aggregation, and secure auctions.',
  },
  {
    id: 'bfv',
    name: 'BFV',
    category: 'Homomorphic Encryption',
    type: 'Fully Homomorphic',
    description:
      'Brakerski/Fan-Vercauteren scheme supports both addition and multiplication on encrypted integers. Based on the Ring Learning With Errors (RLWE) problem for lattice-based security.',
    keySize: 'Polynomial degree dependent',
    security: '128-bit (parameterized)',
    useCase: 'Privacy-preserving database queries, secure integer arithmetic, and encrypted analytics.',
  },
  {
    id: 'ckks',
    name: 'CKKS',
    category: 'Homomorphic Encryption',
    type: 'Fully Homomorphic',
    description:
      'Cheon-Kim-Kim-Song scheme supports approximate arithmetic on encrypted real/complex numbers. Enables encrypted machine learning inference and statistical computation.',
    keySize: 'Polynomial degree dependent',
    security: '128-bit (parameterized)',
    useCase: 'Encrypted machine learning, privacy-preserving medical data analysis, and financial modeling.',
  },

  // ── Post-Quantum ──────────────────────────────────────────────────────
  {
    id: 'crystals-kyber',
    name: 'CRYSTALS-Kyber',
    category: 'Post-Quantum',
    type: 'Key Encapsulation (Lattice)',
    description:
      'A lattice-based key encapsulation mechanism selected by NIST as the primary post-quantum KEM standard (ML-KEM). Based on the Module Learning With Errors problem.',
    keySize: '512 / 768 / 1024 (parameter set)',
    security: '128 / 192 / 256-bit quantum',
    useCase: 'Post-quantum TLS handshakes, hybrid key exchange, and long-term data protection.',
  },
  {
    id: 'crystals-dilithium',
    name: 'CRYSTALS-Dilithium',
    category: 'Post-Quantum',
    type: 'Digital Signature (Lattice)',
    description:
      'A lattice-based digital signature scheme selected by NIST as the primary post-quantum signature standard (ML-DSA). Offers strong security with practical signature and key sizes.',
    keySize: '1312 / 1952 / 2592 bytes (pk)',
    security: '128 / 192 / 256-bit quantum',
    useCase: 'Post-quantum code signing, certificate authorities, and firmware authentication.',
  },
  {
    id: 'falcon',
    name: 'Falcon',
    category: 'Post-Quantum',
    type: 'Digital Signature (Lattice)',
    description:
      'A compact lattice-based signature scheme using NTRU lattices and fast Fourier sampling. Produces the smallest signatures among NIST PQC finalists but requires careful implementation.',
    keySize: '897 / 1793 bytes (pk)',
    security: '128 / 256-bit quantum',
    useCase: 'Bandwidth-constrained environments, IoT device authentication, and embedded signing.',
  },
  {
    id: 'sphincs-plus',
    name: 'SPHINCS+',
    category: 'Post-Quantum',
    type: 'Digital Signature (Hash-Based)',
    description:
      'A stateless hash-based signature scheme relying only on the security of its underlying hash function. Provides conservative post-quantum security with no algebraic assumptions.',
    keySize: '32 / 48 / 64 bytes (pk)',
    security: '128 / 192 / 256-bit quantum',
    useCase: 'High-assurance root-of-trust signing, certificate root keys, and conservative PQ deployments.',
  },
  {
    id: 'hqc',
    name: 'HQC',
    category: 'Post-Quantum',
    type: 'Key Encapsulation (Code-Based)',
    description:
      'Hamming Quasi-Cyclic is a code-based KEM built on the hardness of decoding random quasi-cyclic codes. Selected by NIST as a backup to Kyber for KEM diversity.',
    keySize: 'Variable (parameter-dependent)',
    security: '128 / 192 / 256-bit quantum',
    useCase: 'Diversified post-quantum key exchange and scenarios requiring non-lattice assumptions.',
  },
  {
    id: 'xmss',
    name: 'XMSS',
    category: 'Post-Quantum',
    type: 'Digital Signature (Hash-Based)',
    description:
      'Extended Merkle Signature Scheme is a stateful hash-based signature with forward security. Each key pair can produce a fixed number of signatures using a Merkle tree of one-time keys.',
    keySize: '32-64 bytes (pk)',
    security: '128-256-bit quantum',
    useCase: 'Firmware signing with known signature budgets, long-lived root CA keys, and HSM signing.',
  },
  {
    id: 'ntru',
    name: 'NTRU',
    category: 'Post-Quantum',
    type: 'Key Encapsulation (Lattice)',
    description:
      'One of the oldest lattice-based cryptosystems (1996), based on the shortest vector problem in NTRU lattices. Offers fast encryption and decryption with reasonable key sizes.',
    keySize: 'Variable (parameter-dependent)',
    security: '128-256-bit quantum',
    useCase: 'Legacy post-quantum deployments, embedded encryption, and hybrid key exchange.',
  },

  // ── Zero-Knowledge Proofs ─────────────────────────────────────────────
  {
    id: 'zk-snarks',
    name: 'zk-SNARKs',
    category: 'Zero-Knowledge Proofs',
    type: 'Succinct Non-Interactive Proof',
    description:
      'Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge produce tiny proofs that verify in milliseconds. Require a trusted setup ceremony but enable unmatched proof compactness.',
    keySize: 'N/A (proving key ~MB)',
    security: '~128-bit soundness',
    useCase: 'Zcash shielded transactions, Ethereum L2 rollups (zkSync), and private DeFi.',
  },
  {
    id: 'zk-starks',
    name: 'zk-STARKs',
    category: 'Zero-Knowledge Proofs',
    type: 'Transparent Non-Interactive Proof',
    description:
      'Zero-Knowledge Scalable Transparent Arguments of Knowledge eliminate the trusted setup using hash-based commitments. Proofs are larger but rely only on collision-resistant hashing.',
    keySize: 'N/A',
    security: '~128-bit (hash-based)',
    useCase: 'StarkNet L2 scaling, transparent verifiable computation, and post-quantum ZK proofs.',
  },
  {
    id: 'bulletproofs',
    name: 'Bulletproofs',
    category: 'Zero-Knowledge Proofs',
    type: 'Range Proof',
    description:
      'Short non-interactive zero-knowledge proofs that require no trusted setup and scale logarithmically in proof size. Particularly efficient for proving values lie within a range.',
    keySize: 'N/A',
    security: '~128-bit (discrete log)',
    useCase: 'Monero confidential transactions, range proofs in blockchain, and private asset amounts.',
  },
  {
    id: 'plonk',
    name: 'PLONK',
    category: 'Zero-Knowledge Proofs',
    type: 'Universal SNARK',
    description:
      'Permutations over Lagrange-bases for Oecumenical Non-interactive arguments of Knowledge uses a universal trusted setup that works for any circuit. A leading ZK proof system for general computation.',
    keySize: 'N/A (SRS ~MB)',
    security: '~128-bit soundness',
    useCase: 'General-purpose ZK applications, zkEVMs, and privacy-preserving smart contracts.',
  },
]

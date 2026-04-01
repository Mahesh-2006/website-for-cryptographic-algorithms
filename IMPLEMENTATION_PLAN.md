# Crypto Simulator - Implementation Plan

## Project Overview
A full-stack web application that simulates the computational difficulty of breaking cryptographic keys using both classical and quantum computing attack models. Expanded to include all cryptographic algorithm categories with real benchmarks and complexity metrics.

## Tech Stack
- **Backend**: Node.js + Express.js (port 3000)
- **Frontend**: React 19 + Vite 7
- **Benchmarks**: Node.js built-in `crypto` module
- **API**: REST (JSON)

---

## Phase 1: Backend Structure

### 1.1 New Directory Structure
```
services/
├── securityEngine.js           # Existing brute-force/quantum logic
├── algorithms/
│   ├── registry.js             # Central algorithm definitions
│   ├── symmetric/
│   │   ├── definitions.js      # AES, ChaCha20, Blowfish, etc.
│   │   └── benchmarks.js       # Node crypto benchmarks
│   ├── hashFunctions/
│   │   ├── definitions.js       # SHA family, BLAKE2/3, etc.
│   │   └── benchmarks.js
│   ├── mac/
│   ├── authenticatedEnc/
│   ├── asymmetric/
│   ├── digitalSignatures/
│   ├── keyExchange/
│   ├── passwordHashing/
│   ├── postQuantum/
│   ├── zeroKnowledge/
│   └── homomorphic/
├── routes/
│   ├── simulationRoutes.js     # Existing: POST /api/simulate
│   ├── algorithmRoutes.js      # NEW: GET /api/algorithms
│   ├── benchmarkRoutes.js       # NEW: POST /api/benchmark
│   └── educationalRoutes.js     # NEW: GET /api/educational/:id
└── utils/
    ├── complexityCalculator.js  # O(n) complexity analysis
    └── constants.js             # Universe age, constants
```

### 1.2 Algorithm Definition Schema
```javascript
{
  id: "aes-256-gcm",
  name: "AES-256-GCM",
  category: "authenticated_encryption",
  type: "block_cipher",
  
  securityParams: {
    keySize: 256,
    ivSize: 96,
    tagSize: 128,
    blockSize: 128
  },
  
  complexity: {
    encryption: { time: "O(1)", space: "O(1)", memory: "O(1)" },
    decryption: { time: "O(1)", space: "O(1)", memory: "O(1)" },
    keyGeneration: { time: "O(n)", space: "O(1)", memory: "O(1)" }
  },
  
  crackingComplexity: {
    classical: { operations: "2^256", type: "brute_force" },
    quantumGrover: { operations: "2^128", type: "grover" },
    quantumShor: { operations: "N/A", type: "not_applicable" }
  },
  
  performance: {
    encryptOpsPerSec: null,
    decryptOpsPerSec: null,
    keyGenOpsPerSec: null
  },
  
  educational: {
    description: "...",
    useCases: ["TLS", "VPN", "File Encryption"],
    pros: ["Fast", "Widely supported"],
    cons: ["Key distribution problem"],
    invented: 2001,
    standardized: "NIST SP 800-38D"
  },
  
  implementation: {
    nodeCrypto: "aes-256-gcm",
    webCrypto: "AES-GCM",
    libsodium: "crypto_secretbox_easy"
  }
}
```

---

## Phase 2: API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `GET /api/algorithms` | GET | All algorithms with metadata |
| `GET /api/algorithms/:category` | GET | Algorithms by category |
| `GET /api/algorithms/:id` | GET | Single algorithm full details |
| `POST /api/benchmark` | POST | Run benchmarks on specific algorithm |
| `POST /api/simulate` | POST | Crack time simulation (existing) |
| `GET /api/educational/:id` | GET | Educational content |

---

## Phase 3: Algorithm Categories

### Category 1: Symmetric Encryption

| Algorithm | Key Sizes | Block/Type | Notes |
|-----------|-----------|------------|-------|
| AES | 128, 192, 256 | 128-bit block | FIPS 197, gold standard |
| DES | 56 | 64-bit block | Deprecated (56-bit) |
| 3DES | 168 (3x56) | 64-bit block | Legacy, EDE mode |
| ChaCha20 | 256 | Stream | RFC 7539, mobile-friendly |
| Blowfish | 32-448 | 64-bit block | Variable key |
| Twofish | 128, 192, 256 | 128-bit block | AES finalist |
| RC4 | 40-2048 | Stream | Deprecated (biases) |
| Camellia | 128, 192, 256 | 128-bit block | Japanese standard |
| CAST-128 | 40-128 | 64-bit block | RFC 2144 |

### Category 2: Hash Functions

| Algorithm | Output | Internal | Type | Notes |
|-----------|--------|----------|------|-------|
| MD5 | 128 | 128 | Merkle-Damgard | Deprecated |
| SHA-1 | 160 | 160 | Merkle-Damgard | Deprecated |
| SHA-256 | 256 | 256 | Merkle-Damgard | Current standard |
| SHA-384 | 384 | 256 | Merkle-Damgard | SHA-2 family |
| SHA-512 | 512 | 512 | Merkle-Damgard | SHA-2 family |
| SHA3-224/256/384/512 | Variable | Sponge | Keccak | NIST FIPS 202 |
| BLAKE2s | 256 | 256 | HAIFA | RFC 7693, fast |
| BLAKE2b | 512 | 512 | HAIFA | RFC 7693, fast |
| BLAKE3 | 256 | 256 | Bao tree | Very fast, streaming |
| Keccak-256 | 256 | Sponge | SHA-3 original | Pre-standardized |
| Tiger | 192 | 192 | Merkle-Damgard | Fast hash |
| Whirlpool | 512 | 512 | Miyaguchi-Preneel | ISO/IEC 10118-3 |

### Category 3: MACs

| Algorithm | Based On | Notes |
|-----------|----------|-------|
| HMAC-SHA256 | SHA-256 | Most common |
| HMAC-SHA512 | SHA-512 | High security |
| CMAC | AES | Block cipher based |
| Poly1305 | Poly1305-AES | Fast, Wegman-Carter |
| GMAC | GHASH | Galois field based |
| CBC-MAC | Block cipher | Not secure alone |

### Category 4: Authenticated Encryption

| Algorithm | Components | Notes |
|-----------|------------|-------|
| AES-GCM | AES + GMAC | TLS 1.3 default |
| ChaCha20-Poly1305 | ChaCha20 + Poly1305 | TLS for mobile |
| AES-CCM | AES + CMAC | TLS alternative |
| AES-EAX | AES + CMAC + OMAC | Two-pass |
| AES-OCB | AES + OCB | One-pass, patented |
| AES-GCM-SIV | AES + GMAC-SIV | nonce-misuse resistant |

### Category 5: Asymmetric Encryption

| Algorithm | Key Sizes | Security Basis | Notes |
|-----------|-----------|----------------|-------|
| RSA | 2048, 3072, 4096 | Integer factorization | Most widely used |
| RSA-OAEP | 2048+ | IND-CPA secure RSA | Better padding |
| ElGamal | 2048+ | Discrete log | Randomized |
| ECC-P256 | 256 | ECDLP | Fast, small keys |
| ECC-P384 | 384 | ECDLP | Higher security |
| ECC-P521 | 521 | ECDLP | Maximum ECC |
| Curve25519 | 256 | ECDLP | X25519 key exchange |
| Curve448 | 448 | ECDLP | X448 |

### Category 6: Digital Signatures

| Algorithm | Key Type | Notes |
|-----------|----------|-------|
| RSASSA-PSS | RSA | Probabilistic signature |
| RSASSA-PKCS1-v1_5 | RSA | Legacy padding |
| ECDSA | ECC | Bitcoin, blockchain |
| EdDSA (Ed25519) | Edwards | Fast, deterministic |
| Ed448 | Edwards | Higher security |
| DSA | Discrete log | Deprecated |

### Category 7: Key Exchange

| Algorithm | Type | Notes |
|-----------|------|-------|
| DH | Classic | Finite field |
| ECDH | ECC | Most common |
| X25519 | Curve25519 | Fast, modern |
| X448 | Curve448 | Extended security |
| FFDH | Finite field | Variants |

### Category 8: Password Hashing

| Algorithm | Memory-hard | Cost Parameters |
|-----------|-------------|------------------|
| bcrypt | Yes | cost factor (4-31) |
| scrypt | Yes | N, r, p parameters |
| Argon2 | Yes | time, memory, parallelism |
| PBKDF2 | No | iterations |
| yescrypt | Yes | GPU resistant |

### Category 9: Post-Quantum Cryptography

| Algorithm | Type | NIST Status | Security Basis |
|-----------|------|-------------|----------------|
| CRYSTALS-Kyber | KEM | Standardized (2024) | Lattice (MLWE) |
| CRYSTALS-Dilithium | Signatures | Standardized (2024) | Lattice (MLWE) |
| SPHINCS+ | Signatures | Standardized (2024) | Hash functions |
| Falcon | Signatures | Standardized (2024) | Lattice (NTRU) |
| BIKE | KEM | Round 4 | Code-based |
| HQC | KEM | Round 4 | Code-based |
| Classic McEliece | KEM | Standardized | Code-based |

### Category 10: Zero-Knowledge Proofs

| Protocol | Proof Size | Verify Time | Type |
|----------|------------|-------------|------|
| Schnorr | O(1) | O(1) | Interactive to NIZK |
| zk-SNARKs | O(1) | O(poly log) | Succinct |
| zk-STARKs | O(poly log) | O(poly log) | Transparent |
| Bulletproofs | O(log n) | O(n) | Short proofs |

### Category 11: Homomorphic Encryption

| Scheme | Operations | Complexity | Use Case |
|--------|------------|------------|----------|
| Paillier | Addition only | O(n^3) | Privacy-preserving compute |
| ElGamal | Multiplication | O(n^3) | Voting, auctions |
| CKKS | Add & Mult | O(n log n)^2 | ML on encrypted data |
| BFV | Add & Mult | O(n log n)^2 | Integer arithmetic |
| TFHE | Arbitrary | O(n^3) | Boolean circuits |

---

## Phase 4: Frontend Components

### 4.1 Component Structure
```
frontend/src/
├── components/
│   ├── Header.jsx              # App header with title
│   ├── CategoryFilter.jsx      # Tab/filter for categories
│   ├── SearchBar.jsx           # Search algorithms
│   ├── AlgorithmGrid.jsx       # Responsive card grid
│   ├── AlgorithmCard.jsx       # Individual algorithm card
│   │   ├── SecurityBadge.jsx   # Crack time indicator
│   │   ├── PerformanceBadge.jsx # Benchmark results
│   │   └── ExpandButton.jsx   # Show more details
│   ├── SimulationPanel.jsx     # Configure & run simulations
│   ├── ResultsModal.jsx        # Detailed simulation results
│   ├── EducationalPanel.jsx    # Algorithm description & metrics
│   ├── ComplexityTable.jsx     # O(n) complexity display
│   └── BenchmarkChart.jsx      # Performance visualization
├── hooks/
│   ├── useAlgorithms.js         # Fetch algorithm list
│   ├── useSimulation.js        # Run crack time simulation
│   └── useBenchmarks.js        # Run performance tests
├── data/
│   └── categories.js           # Category metadata
└── App.jsx
```

### 4.2 UI Layout
```
+------------------------------------------------------------------+
|  Cryptographic Security Simulator                     [Settings] |
+------------------------------------------------------------------+
| Search: [____________________]  Sort: [Best Security v]          |
+------------------------------------------------------------------+
| [All] [Sym] [Hash] [MAC] [AEAD] [Asym] [Sign] [Key] [Pass] [PQC]|
+------------------------------------------------------------------+
|                                                                   |
| +---------------------------+  +---------------------------+      |
| | AES-256-GCM              |  | ChaCha20-Poly1305        |      |
| | Category: AEAD           |  | Category: AEAD           |      |
| +---------------------------+  +---------------------------+      |
| | Security                 |  | Security                 |      |
| | Crack Time: Infinite     |  | Crack Time: Infinite     |      |
| | Quantum: Infinite        |  | Quantum: Infinite       |      |
| +---------------------------+  +---------------------------+      |
| | Performance              |  | Performance              |      |
| | 2 GB/s                   |  | 1 GB/s                   |      |
| +---------------------------+  +---------------------------+      |
| | Complexity               |  | Complexity               |      |
| | Enc: O(1) | Dec: O(1)    |  | Enc: O(n) | Dec: O(n)    |      |
| +---------------------------+  +---------------------------+      |
| | [Simulate] [Details]     |  | [Simulate] [Details]     |      |
| +---------------------------+  +---------------------------+      |
|                                                                   |
+------------------------------------------------------------------+
```

---

## Phase 5: Implementation Order

| Phase | Task | Priority |
|-------|------|----------|
| 1 | Backend structure setup (directories, registry schema) | High |
| 2 | Algorithm registry with definitions (11 categories) | High |
| 3 | Update/add API routes | High |
| 4 | Benchmark service (Node.js crypto) | High |
| 5 | Complexity calculator utility | Medium |
| 6 | Frontend components (grid, cards, filters) | High |
| 7 | Connect API to UI (hooks) | High |
| 8 | Educational content population | Medium |
| 9 | Styling and polish | Low |

---

## Benchmark Implementation Example

```javascript
// services/benchmarkService.js
const crypto = require('crypto');

async function benchmarkSymmetric(algorithm, keySize, dataSize = 65536) {
  const key = crypto.randomBytes(keySize / 8);
  const iv = crypto.randomBytes(12);
  const data = crypto.randomBytes(dataSize);
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < 10000; i++) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.update(data);
    cipher.final();
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / 10000;
  return { 
    opsPerSecond: 1e9 / nsPerOp, 
    nsPerOp,
    throughputMBps: (dataSize * 1e9) / (Number(end - start) * 1024 * 1024)
  };
}

async function benchmarkHash(algorithm, dataSize = 65536) {
  const data = crypto.randomBytes(dataSize);
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < 10000; i++) {
    crypto.createHash(algorithm).update(data).digest();
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / 10000;
  return { 
    opsPerSecond: 1e9 / nsPerOp, 
    throughputMBps: (dataSize * 1e9) / (Number(end - start) * 1024 * 1024)
  };
}
```

---

## Complexity Metrics Structure

```javascript
// For each algorithm category:

// Time Complexity
const timeComplexity = {
  initialization: "O(1)",
  keyGeneration: "O(n)",           // n = key size in bits / word size
  encryption: "O(n)",              // n = data size in blocks
  decryption: "O(n)",
  signing: "O(n^2)",               // RSA/ECDSA involve modular exponentiation
  verification: "O(n^2)"
};

// Space Complexity
const spaceComplexity = {
  keyStorage: "O(1)",              // Fixed key sizes
  stateSize: "O(1)",               // Block cipher state
  ciphertextExpansion: "O(1)"      // Typically no expansion
};

// Memory Complexity
const memoryComplexity = {
  aes: "O(1)",                     // Constant RAM (lookup tables or SIMD)
  sha256: "O(1)",                  // Fixed state
  bcrypt: "O(64)"                  // Memory-hard (configurable in KB)
};

// Communication Complexity (for ZK proofs)
const communicationComplexity = {
  schnorr: "O(1)",                 // 3 elements
  zkSNARK: "O(1)",                 // ~200 bytes (succinct)
  zkSTARK: "O(polylog)"            // Larger proofs, no trusted setup
};
```

---

## Files to Create/Modify

### New Files
- `services/algorithms/registry.js`
- `services/algorithms/symmetric/definitions.js`
- `services/algorithms/symmetric/benchmarks.js`
- `services/algorithms/hashFunctions/definitions.js`
- `services/algorithms/hashFunctions/benchmarks.js`
- `services/algorithms/mac/definitions.js`
- `services/algorithms/mac/benchmarks.js`
- `services/algorithms/authenticatedEnc/definitions.js`
- `services/algorithms/authenticatedEnc/benchmarks.js`
- `services/algorithms/asymmetric/definitions.js`
- `services/algorithms/asymmetric/benchmarks.js`
- `services/algorithms/digitalSignatures/definitions.js`
- `services/algorithms/digitalSignatures/benchmarks.js`
- `services/algorithms/keyExchange/definitions.js`
- `services/algorithms/keyExchange/benchmarks.js`
- `services/algorithms/passwordHashing/definitions.js`
- `services/algorithms/passwordHashing/benchmarks.js`
- `services/algorithms/postQuantum/definitions.js`
- `services/algorithms/postQuantum/benchmarks.js`
- `services/algorithms/zeroKnowledge/definitions.js`
- `services/algorithms/zeroKnowledge/benchmarks.js`
- `services/algorithms/homomorphic/definitions.js`
- `services/algorithms/homomorphic/benchmarks.js`
- `services/routes/algorithmRoutes.js`
- `services/routes/benchmarkRoutes.js`
- `services/routes/educationalRoutes.js`
- `services/benchmarkService.js`
- `services/utils/complexityCalculator.js`
- `services/utils/constants.js`
- `frontend/src/components/Header.jsx`
- `frontend/src/components/CategoryFilter.jsx`
- `frontend/src/components/SearchBar.jsx`
- `frontend/src/components/AlgorithmGrid.jsx`
- `frontend/src/components/AlgorithmCard.jsx`
- `frontend/src/components/SimulationPanel.jsx`
- `frontend/src/components/ResultsModal.jsx`
- `frontend/src/components/EducationalPanel.jsx`
- `frontend/src/components/ComplexityTable.jsx`
- `frontend/src/components/BenchmarkChart.jsx`
- `frontend/src/hooks/useAlgorithms.js`
- `frontend/src/hooks/useSimulation.js`
- `frontend/src/hooks/useBenchmarks.js`
- `frontend/src/data/categories.js`

### Files to Modify
- `server.js` - Add new routes
- `services/securityEngine.js` - Integrate with new structure
- `services/routes/simulationRoutes.js` - Update response format
- `frontend/src/App.jsx` - Replace with new component structure
- `frontend/src/App.css` - New styles

---

## Status
- [ ] Phase 1: Backend structure setup
- [ ] Phase 2: Algorithm registry with definitions
- [ ] Phase 3: API routes
- [ ] Phase 4: Benchmark service
- [ ] Phase 5: Complexity calculator
- [ ] Phase 6: Frontend components
- [ ] Phase 7: API to UI connection
- [ ] Phase 8: Educational content
- [ ] Phase 9: Styling and polish

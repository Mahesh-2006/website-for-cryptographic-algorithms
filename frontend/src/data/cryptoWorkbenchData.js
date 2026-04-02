export const CRYPTO_CATEGORIES = [
  {
    id: 'symmetric',
    name: 'Symmetric Algorithms',
    description: 'Shared-key encryption used for fast bulk data protection.'
  },
  {
    id: 'asymmetric',
    name: 'Asymmetric Algorithms',
    description: 'Public-key systems used for encryption, key transport, and identity.'
  },
  {
    id: 'hash-functions',
    name: 'Hash Functions',
    description: 'One-way compression functions for integrity, commitments, and indexing.'
  },
  {
    id: 'password-hashing',
    name: 'Password Hashing',
    description: 'Slow or memory-hard functions designed to resist password guessing.'
  },
  {
    id: 'post-quantum',
    name: 'Post-Quantum Cryptography',
    description: 'Schemes designed to survive large-scale quantum attacks.'
  },
  {
    id: 'homomorphic',
    name: 'Homomorphic Encryption',
    description: 'Encryption that allows useful computation on ciphertext.'
  },
  {
    id: 'zero-knowledge',
    name: 'Zero-Knowledge',
    description: 'Proof systems that reveal validity without revealing the secret itself.'
  },
  {
    id: 'digital-signatures',
    name: 'Digital Signatures',
    description: 'Schemes that prove authenticity, origin, and non-repudiation.'
  },
  {
    id: 'secure-communication',
    name: 'Secure Communication Protocols',
    description: 'Protocol suites that combine cryptographic building blocks for sessions.'
  },
  {
    id: 'key-exchange',
    name: 'Key Exchange Algorithms',
    description: 'Methods for agreeing on a shared secret across an untrusted network.'
  },
  {
    id: 'authentication',
    name: 'Authentication Algorithms',
    description: 'Mechanisms that verify identity or possession of a secret or device.'
  },
  {
    id: 'message-integrity',
    name: 'Message Integrity and Authentication',
    description: 'Constructions that detect tampering and prove message origin.'
  },
  {
    id: 'e2ee',
    name: 'End-to-End Encryption',
    description: 'Messaging and collaboration designs that keep intermediaries blind.'
  },
  {
    id: 'key-management',
    name: 'Key Management Algorithms',
    description: 'Derivation, splitting, and lifecycle tools for handling secrets safely.'
  },
  {
    id: 'mac',
    name: 'MAC',
    description: 'Message authentication code families built to verify integrity with a secret key.'
  },
  {
    id: 'email-security',
    name: 'Email Security Algorithms',
    description: 'Cryptographic standards used to protect email confidentiality and trust.'
  }
];

export const ATTACK_METHODS = [
  {
    id: 'bruteforce',
    name: 'Brute Force',
    description: 'Enumerate keys or secrets until the correct one is found.'
  },
  {
    id: 'dictionary',
    name: 'Dictionary Attack',
    description: 'Guess low-entropy passwords, passphrases, or human-generated secrets.'
  },
  {
    id: 'grover',
    name: 'Grover Search',
    description: 'Quantum search that gives a square-root speedup against symmetric search spaces.',
    requiresQuantum: true
  },
  {
    id: 'shor',
    name: 'Shor Attack',
    description: 'Quantum factoring or discrete-log attack that breaks RSA, DH, and ECC style systems.',
    requiresQuantum: true
  }
];

export const HARDWARE_CATALOG = [
  {
    id: 'normal',
    name: 'Normal Computer',
    description: 'Typical personal systems used by an individual attacker.',
    presets: [
      {
        id: 'office-laptop',
        model: 'Office Laptop',
        processor: 'Intel Core i5 mobile',
        cpu: '10-core mobile CPU',
        cores: 10,
        ram: 16,
        classicalRate: 2.5e7
      },
      {
        id: 'gaming-desktop',
        model: 'Gaming Desktop',
        processor: 'AMD Ryzen 9 + consumer GPU',
        cpu: '16-core desktop CPU',
        cores: 16,
        ram: 32,
        classicalRate: 8e8
      }
    ]
  },
  {
    id: 'server',
    name: 'Server',
    description: 'Multi-socket or rack-mounted systems used in datacenters.',
    presets: [
      {
        id: 'dual-xeon',
        model: 'Dual Xeon Server',
        processor: 'Intel Xeon Silver pair',
        cpu: '32-core server platform',
        cores: 32,
        ram: 128,
        classicalRate: 4e9
      },
      {
        id: 'epyc-rack',
        model: 'EPYC Rack Node',
        processor: 'AMD EPYC high-core server',
        cpu: '64-core server CPU',
        cores: 64,
        ram: 256,
        classicalRate: 1.2e10
      }
    ]
  },
  {
    id: 'supercomputer',
    name: 'Super Computer',
    description: 'Large distributed resources with massive parallel throughput.',
    presets: [
      {
        id: 'hpc-cluster',
        model: 'National Lab HPC Cluster',
        processor: 'CPU + accelerator fabric',
        cpu: 'Thousands of compute nodes',
        cores: 50000,
        ram: 524288,
        classicalRate: 8e14
      },
      {
        id: 'exascale',
        model: 'Exascale System',
        processor: 'Exascale heterogeneous fabric',
        cpu: 'Hundreds of thousands of cores',
        cores: 250000,
        ram: 2097152,
        classicalRate: 5e17
      }
    ]
  },
  {
    id: 'quantum',
    name: 'Quantum Computer',
    description: 'Quantum hardware modeled with qubit count plus a classical control stack.',
    presets: [
      {
        id: 'nisq-127',
        model: '127-Qubit NISQ',
        processor: 'Superconducting research device',
        cpu: 'Quantum control rack',
        cores: 8,
        ram: 64,
        qubits: 127,
        classicalRate: 5e7,
        quantumRate: 2e3
      },
      {
        id: 'research-1000',
        model: '1,000-Qubit Research Machine',
        processor: 'Emerging modular quantum stack',
        cpu: 'Hybrid quantum control cluster',
        cores: 32,
        ram: 256,
        qubits: 1000,
        classicalRate: 5e8,
        quantumRate: 2e5
      },
      {
        id: 'logical-5000',
        model: '5,000 Logical-Qubit System',
        processor: 'Fault-tolerant quantum architecture',
        cpu: 'Large classical orchestration cluster',
        cores: 128,
        ram: 2048,
        qubits: 5000,
        classicalRate: 2e9,
        quantumRate: 8e6
      }
    ]
  }
];

export const CRYPTO_ALGORITHMS = [
  {
    id: 'aes-256',
    name: 'AES-256',
    artifactType: 'Block cipher',
    categories: ['symmetric'],
    summary: 'A 256-bit variant of the Rijndael cipher used for bulk data confidentiality.',
    history:
      'AES was selected by NIST in 2001 after an open competition. The Rijndael design became the global default for modern symmetric encryption.',
    protection:
      'AES-256 protects confidentiality when a shared secret key is known only to authorized parties and the cipher is used in a safe mode such as GCM or XTS.',
    workflow: [
      'Expand the secret key into round keys.',
      'Transform each 128-bit block with SubBytes, ShiftRows, MixColumns, and AddRoundKey.',
      'Run the inverse round structure with the same secret key to decrypt.'
    ],
    math: [
      'The internal state is a 4 x 4 byte matrix over GF(2^8).',
      'Average exhaustive search cost is about 2^255 key trials.',
      'Grover search would still leave roughly 2^128 effective work.'
    ],
    hackerDefense:
      'No practical attack is known against full AES-256. Real breaks usually come from key theft, weak passphrases, poor IV handling, or side-channel leakage.',
    estimateBasis: 'Key search against a 256-bit symmetric secret.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'chacha20',
    name: 'ChaCha20',
    artifactType: 'Stream cipher',
    categories: ['symmetric', 'secure-communication', 'e2ee'],
    summary: 'A high-speed stream cipher designed for robust software performance and safer behavior on general CPUs.',
    history:
      'ChaCha20 was created by Daniel J. Bernstein as an improvement on Salsa20 and is widely deployed in TLS, WireGuard, and messaging stacks.',
    protection:
      'It protects confidentiality by generating a pseudorandom keystream from a key, nonce, and counter, which is then XORed with plaintext.',
    workflow: [
      'Initialize a 512-bit state with constants, key, counter, and nonce.',
      'Apply alternating column and diagonal quarter rounds for 20 rounds.',
      'Add the original state back in and XOR the keystream with plaintext.'
    ],
    math: [
      'Quarter rounds use modular addition, XOR, and bit rotation.',
      'Average key-search cost is about 2^255 trials for the 256-bit key.',
      'Grover-style search reduces that to roughly 2^128 iterations.'
    ],
    hackerDefense:
      'ChaCha20 avoids many cache-timing concerns seen in table-based cipher implementations and is strong when nonces are never reused.',
    estimateBasis: 'Key search against a 256-bit stream-cipher secret.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'twofish',
    name: 'Twofish',
    artifactType: 'Block cipher',
    categories: ['symmetric'],
    summary: 'A 128-bit block cipher and AES finalist known for flexible key sizes and strong classical security.',
    history:
      'Twofish was designed by Bruce Schneier and collaborators during the AES competition and remains a respected alternative symmetric primitive.',
    protection:
      'It protects confidentiality by applying a Feistel-like round structure with key-dependent S-boxes and a complex key schedule.',
    workflow: [
      'Expand the key into whitening keys and round subkeys.',
      'Apply 16 rounds of keyed substitution and matrix mixing.',
      'Reverse the round order with the same shared key to decrypt.'
    ],
    math: [
      'Twofish uses MDS matrices and key-dependent permutations.',
      'Average brute-force cost for a 256-bit key is about 2^255 trials.',
      'No efficient quantum attack beyond generic search is known.'
    ],
    hackerDefense:
      'Twofish remains classically strong, but it is less common than AES so the ecosystem and hardware acceleration are smaller.',
    estimateBasis: 'Key search against a 256-bit symmetric secret.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'rsa-oaep',
    name: 'RSA-OAEP',
    artifactType: 'Public-key encryption',
    categories: ['asymmetric', 'email-security'],
    summary: 'RSA encryption wrapped in OAEP padding to stop deterministic textbook-RSA weaknesses.',
    history:
      'RSA was published in 1977 and became the dominant public-key system. OAEP padding was later added to make encryption semantically secure.',
    protection:
      'It protects confidentiality by encrypting a small secret with a public key, usually for key transport rather than bulk data.',
    workflow: [
      'Generate a random mask and pad the message with OAEP.',
      'Raise the padded value to the public exponent modulo n.',
      'Use the private exponent to recover and unmask the original padded message.'
    ],
    math: [
      'Security relies on the hardness of factoring a large composite modulus n = p x q.',
      'RSA-2048 is commonly treated as roughly 112-bit classical security.',
      'A large fault-tolerant quantum computer running Shor can break it.'
    ],
    hackerDefense:
      'RSA-OAEP is safe only when used with modern key sizes, side-channel defenses, and strong random generation. Quantum risk is severe.',
    estimateBasis: 'Factoring the RSA modulus or recovering the transported secret.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  },
  {
    id: 'ecies',
    name: 'ECIES',
    artifactType: 'Elliptic-curve encryption construction',
    categories: ['asymmetric'],
    summary: 'A hybrid public-key encryption construction that combines elliptic-curve Diffie-Hellman, a KDF, and symmetric encryption.',
    history:
      'ECIES emerged from elliptic-curve cryptography practice as a way to get compact public-key encryption from curve-based key agreement.',
    protection:
      'It protects confidentiality by using an ephemeral elliptic-curve key pair to derive a shared secret, then encrypting data with a symmetric cipher.',
    workflow: [
      'Generate an ephemeral curve key pair.',
      'Derive a shared secret with the receiver public key.',
      'Expand that secret with a KDF and use the derived key in an AEAD cipher.'
    ],
    math: [
      'Security is tied to the elliptic-curve discrete logarithm problem.',
      'Modern curve deployments target about 128-bit classical security.',
      'Shor can solve the discrete log efficiently on a large quantum computer.'
    ],
    hackerDefense:
      'ECIES gives smaller keys than RSA and excellent performance, but it inherits quantum exposure from elliptic-curve discrete logarithms.',
    estimateBasis: 'Recovering the shared elliptic-curve secret used to seed the symmetric layer.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'elgamal',
    name: 'ElGamal',
    artifactType: 'Public-key encryption',
    categories: ['asymmetric', 'key-exchange'],
    summary: 'A discrete-log based public-key construction used for encryption and signatures in multiplicative groups.',
    history:
      'Taher ElGamal proposed the scheme in 1985, and it became a foundational discrete-log construction for encryption and digital signatures.',
    protection:
      'It protects confidentiality by masking the message with a one-time shared secret derived from an ephemeral exponent.',
    workflow: [
      'Choose a random ephemeral exponent.',
      'Compute a group element and a masked second component.',
      'Use the private key to remove the mask and recover the plaintext.'
    ],
    math: [
      'Security relies on the discrete logarithm problem in the chosen group.',
      '2048-bit finite-field deployments are typically treated near 112-bit security.',
      'Shor can solve the underlying discrete log efficiently.'
    ],
    hackerDefense:
      'ElGamal is sound with correct parameters, but it is larger and slower than many modern curve-based or hybrid alternatives.',
    estimateBasis: 'Recovering the discrete-log based shared secret or private exponent.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  },
  {
    id: 'sha-256',
    name: 'SHA-256',
    artifactType: 'Hash function',
    categories: ['hash-functions', 'message-integrity', 'key-management'],
    summary: 'The most widely deployed SHA-2 hash with a 256-bit digest.',
    history:
      'SHA-256 was standardized by NIST in 2001 as part of SHA-2 and became a default hash for certificates, TLS, blockchains, and integrity systems.',
    protection:
      'It protects integrity by compressing arbitrary input into a fixed digest that is computationally hard to invert or collide.',
    workflow: [
      'Pad the message and split it into 512-bit blocks.',
      'Expand each block into a message schedule.',
      'Process 64 rounds of Boolean functions and modular additions to update the state.'
    ],
    math: [
      'Full preimage search is about 2^256 work and collision search about 2^128.',
      'Grover would reduce preimage search to around 2^128 queries.',
      'There is no known Shor-style break for SHA-256 itself.'
    ],
    hackerDefense:
      'SHA-256 is still a strong integrity primitive, but hashes should not be used alone for password storage or message authentication.',
    estimateBasis: 'Preimage-style search against a 256-bit digest output.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'sha3-256',
    name: 'SHA3-256',
    artifactType: 'Sponge hash function',
    categories: ['hash-functions'],
    summary: 'A Keccak-based SHA-3 hash that provides design diversity from SHA-2.',
    history:
      'SHA-3 was standardized in 2015 after a public competition intended to create a backup family with a very different internal design.',
    protection:
      'It protects integrity and commitment use cases with a sponge construction that absorbs data and squeezes a digest from the internal permutation state.',
    workflow: [
      'Absorb message blocks into the sponge state.',
      'Run the Keccak permutation after each rate-sized chunk.',
      'Squeeze out the requested digest bits.'
    ],
    math: [
      'SHA3-256 offers about 256-bit preimage resistance and 128-bit collision resistance.',
      'The core state is a 5 x 5 x 64-bit permutation.',
      'Grover search still leaves an enormous effective work factor.'
    ],
    hackerDefense:
      'Its very different structure gives cryptographic diversity, which is useful when designers do not want all trust concentrated in one family.',
    estimateBasis: 'Preimage-style search against a 256-bit sponge digest.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'blake3',
    name: 'BLAKE3',
    artifactType: 'Tree hash function',
    categories: ['hash-functions'],
    summary: 'A very fast modern tree hash designed for parallelism and high throughput.',
    history:
      'BLAKE3 was released in 2020 as a successor to the BLAKE family, combining strong cryptographic design with aggressive parallelism.',
    protection:
      'It protects integrity, keyed hashing, and derivation use cases while being much faster than many older general-purpose hashes.',
    workflow: [
      'Split input into chunks and hash them independently.',
      'Combine chunks through a binary tree mode.',
      'Use the final chaining value to produce as much output as needed.'
    ],
    math: [
      'The compression function derives from BLAKE2 and the ChaCha quarter-round style design lineage.',
      'Security goals are roughly aligned with 256-bit preimage resistance.',
      'Quantum search still reduces only to generic square-root behavior.'
    ],
    hackerDefense:
      'BLAKE3 is excellent for speed-sensitive integrity tasks, but designers should still choose standardized constructions when compliance is mandatory.',
    estimateBasis: 'Preimage-style search against a 256-bit digest output.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'argon2id',
    name: 'Argon2id',
    artifactType: 'Password hashing function',
    categories: ['password-hashing'],
    summary: 'A memory-hard password hash that blends Argon2i and Argon2d behavior.',
    history:
      'Argon2 won the Password Hashing Competition in 2015 and is the modern recommendation for storing user passwords.',
    protection:
      'It protects stored passwords by forcing attackers to spend significant time and memory per guess instead of using cheap hash computations.',
    workflow: [
      'Salt the password and initialize memory blocks.',
      'Fill memory with repeated mixing passes.',
      'Compress the final memory state into a verification tag.'
    ],
    math: [
      'Security comes from raising the cost of each guess rather than relying on a giant key size.',
      'Estimated cracking time depends mainly on password entropy and memory settings.',
      'The simulation models guesses as average work of 2^(entropy - 1) divided by slowed guess rate.'
    ],
    hackerDefense:
      'Argon2id is excellent against GPU and ASIC cracking when memory cost and iteration parameters are configured aggressively.',
    estimateBasis: 'Password guessing against a memory-hard verifier.',
    attackProfiles: {
      dictionary: { guessPenalty: 6e8, defaultEntropyBits: 40 }
    }
  },
  {
    id: 'bcrypt',
    name: 'bcrypt',
    artifactType: 'Password hashing function',
    categories: ['password-hashing'],
    summary: 'A long-lived password hash based on the EksBlowfish key schedule.',
    history:
      'bcrypt was introduced in 1999 and became a default password storage mechanism for many web applications before Argon2 arrived.',
    protection:
      'It protects password databases by making each guessed password expensive through repeated key setup operations.',
    workflow: [
      'Combine the password with a unique salt.',
      'Run the expensive Blowfish setup for 2^cost iterations.',
      'Store the final derived verifier along with the parameters.'
    ],
    math: [
      'The adjustable cost parameter doubles the work for each increment.',
      'Average guessing work is still driven by password entropy, not a random 128-bit key.',
      'bcrypt is slower than plain hashes but less memory-hard than Argon2id.'
    ],
    hackerDefense:
      'bcrypt is still useful, but very long passwords and modern GPU attackers make Argon2id a better default when available.',
    estimateBasis: 'Password guessing slowed by the bcrypt work factor.',
    attackProfiles: {
      dictionary: { guessPenalty: 1e8, defaultEntropyBits: 36 }
    }
  },
  {
    id: 'scrypt',
    name: 'scrypt',
    artifactType: 'Password hashing function',
    categories: ['password-hashing'],
    summary: 'A password-based key derivation function designed to be expensive in both time and memory.',
    history:
      'scrypt was proposed in 2009 to make large-scale password cracking more costly on custom hardware.',
    protection:
      'It protects passwords and seed phrases by forcing attackers to pay for memory bandwidth as well as compute power.',
    workflow: [
      'Use PBKDF2 to initialize a large memory array.',
      'Perform repeated data-dependent reads and writes across that array.',
      'Derive the final verifier or key material from the mixed state.'
    ],
    math: [
      'The N, r, and p parameters jointly tune memory and runtime cost.',
      'Average guessing work scales with password entropy, not with a large random key space.',
      'The simulation discounts attack rate with a memory-hard slowdown factor.'
    ],
    hackerDefense:
      'scrypt is still respected, especially in wallet software, but Argon2id is usually the cleaner modern recommendation.',
    estimateBasis: 'Password guessing against a memory-hard KDF.',
    attackProfiles: {
      dictionary: { guessPenalty: 3e8, defaultEntropyBits: 38 }
    }
  },
  {
    id: 'kyber',
    name: 'CRYSTALS-Kyber',
    artifactType: 'Post-quantum KEM',
    categories: ['post-quantum', 'key-exchange'],
    summary: 'A lattice-based key encapsulation mechanism chosen by NIST for post-quantum key establishment.',
    history:
      'Kyber emerged from the CRYSTALS project and was selected by NIST as a primary post-quantum key establishment standard.',
    protection:
      'It protects session keys by encapsulating a shared secret into a ciphertext that can only be decapsulated with the matching private key.',
    workflow: [
      'Generate a public and private key from module-lattice samples.',
      'Encapsulate a random shared secret into a ciphertext.',
      'Decapsulate the ciphertext to recover the same secret on the private-key side.'
    ],
    math: [
      'Security is based on structured lattice problems such as module-LWE.',
      'Practical parameter sets are designed around about 128 to 192 bits of classical security.',
      'There is no known Shor-style quantum algorithm that wipes out these lattice assumptions.'
    ],
    hackerDefense:
      'Kyber is one of the leading answers to the quantum threat, though implementation hardening and decryption-failure handling remain important.',
    estimateBasis: 'Recovering the lattice secret or shared key from a Kyber encapsulation.',
    attackProfiles: {
      bruteforce: { bits: 192 }
    }
  },
  {
    id: 'dilithium',
    name: 'CRYSTALS-Dilithium',
    artifactType: 'Post-quantum signature scheme',
    categories: ['post-quantum', 'digital-signatures'],
    summary: 'A lattice-based digital signature standard designed for post-quantum authenticity.',
    history:
      'Dilithium is another CRYSTALS family member and was selected by NIST as a primary post-quantum signature algorithm.',
    protection:
      'It protects authenticity by allowing only the private key holder to produce a signature that verifies under the public lattice key.',
    workflow: [
      'Generate a public matrix-based key pair.',
      'Sample masked vectors during signing to hide secret structure.',
      'Verify linear relations between the signature, message digest, and public key.'
    ],
    math: [
      'Security is tied to module-lattice assumptions similar to Kyber.',
      'Targeted parameter sets are commonly discussed near 128-bit or higher security.',
      'Large quantum factoring attacks do not directly apply.'
    ],
    hackerDefense:
      'Dilithium offers strong post-quantum authenticity, though signatures and public keys are larger than classical ECC alternatives.',
    estimateBasis: 'Recovering the signing secret from lattice structure.',
    attackProfiles: {
      bruteforce: { bits: 128 }
    }
  },
  {
    id: 'sphincs-plus',
    name: 'SPHINCS+',
    artifactType: 'Hash-based signature scheme',
    categories: ['post-quantum', 'digital-signatures'],
    summary: 'A stateless hash-based signature construction with very conservative post-quantum assumptions.',
    history:
      'SPHINCS+ was designed as a fallback post-quantum signature family that relies mostly on standard hash assumptions instead of lattice structure.',
    protection:
      'It protects authenticity using many one-time signatures and Merkle trees without requiring stateful key tracking.',
    workflow: [
      'Generate hypertree public data from secret seeds.',
      'Create few-time or one-time signatures on selected leaves.',
      'Authenticate those leaves through Merkle paths up the hypertree.'
    ],
    math: [
      'Security rests primarily on preimage and second-preimage resistance of the underlying hash.',
      'Sizes are larger than lattice signatures because the design prioritizes conservative assumptions.',
      'Quantum search only gives generic square-root benefits against the hash layer.'
    ],
    hackerDefense:
      'SPHINCS+ is slower and larger than Dilithium, but it is attractive when an organization wants a hash-based post-quantum option.',
    estimateBasis: 'Breaking the hash foundations or forging the signature tree structure.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      grover: { bits: 64 }
    }
  },
  {
    id: 'paillier',
    name: 'Paillier',
    artifactType: 'Additively homomorphic encryption',
    categories: ['homomorphic'],
    summary: 'A public-key encryption scheme that allows addition on ciphertexts.',
    history:
      'Paillier was introduced in 1999 and became a classic starting point for practical homomorphic computation in voting, aggregation, and privacy research.',
    protection:
      'It protects confidentiality while allowing ciphertext multiplication to correspond to plaintext addition.',
    workflow: [
      'Encrypt a message with randomness under a composite modulus.',
      'Multiply ciphertexts to add plaintext values under encryption.',
      'Decrypt once the aggregated result is needed.'
    ],
    math: [
      'Security relies on the decisional composite residuosity assumption over n^2.',
      'The practical security level depends on modulus size, commonly aligned to RSA-style security levels.',
      'A Shor-capable quantum computer would threaten the modulus structure.'
    ],
    hackerDefense:
      'Paillier is useful for private sums and tallying, but it is not a general-purpose full homomorphic system and inherits quantum risk from integer-style structure.',
    estimateBasis: 'Recovering the composite-modulus secret or equivalent trapdoor.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 5500, baseHours: 10 }
    }
  },
  {
    id: 'bfv',
    name: 'BFV',
    artifactType: 'Lattice-based homomorphic encryption',
    categories: ['homomorphic', 'post-quantum'],
    summary: 'A leveled homomorphic scheme that supports exact arithmetic over encrypted integers.',
    history:
      'The Brakerski-Fan-Vercauteren scheme became one of the most studied practical lattice-based homomorphic systems for exact integer workloads.',
    protection:
      'It protects confidentiality while allowing additions and multiplications to be carried out directly on ciphertexts.',
    workflow: [
      'Encode integers into polynomial plaintext space.',
      'Encrypt under ring-lattice keys with noise terms.',
      'Evaluate arithmetic circuits until the noise budget is exhausted or refreshed.'
    ],
    math: [
      'Security is based on Ring-LWE style lattice assumptions.',
      'Parameter sets are tuned so the noise stays below the decryption threshold.',
      'No Shor-style break is known for the underlying lattice problem.'
    ],
    hackerDefense:
      'BFV is promising for privacy-preserving analytics, but performance and parameter tuning are still far heavier than conventional encryption.',
    estimateBasis: 'Recovering the lattice key or solving the structured lattice instance.',
    attackProfiles: {
      bruteforce: { bits: 128 }
    }
  },
  {
    id: 'ckks',
    name: 'CKKS',
    artifactType: 'Approximate homomorphic encryption',
    categories: ['homomorphic', 'post-quantum'],
    summary: 'A homomorphic encryption scheme optimized for approximate arithmetic on real-valued data.',
    history:
      'CKKS extended the practical homomorphic toolbox by supporting approximate arithmetic, which is useful for machine learning and signal processing.',
    protection:
      'It protects confidential numeric vectors while allowing approximate additions and multiplications on ciphertexts.',
    workflow: [
      'Encode floating-point style values into polynomial slots.',
      'Encrypt with lattice-based keys and controlled noise.',
      'Evaluate approximate arithmetic and decode after decryption.'
    ],
    math: [
      'Security is again based on Ring-LWE assumptions and parameter selection.',
      'Approximate arithmetic trades exactness for much better functionality.',
      'Quantum risk is currently modeled as modest generic speedups, not a total collapse.'
    ],
    hackerDefense:
      'CKKS enables privacy-preserving analytics, but developers must manage precision loss, noise growth, and computational cost carefully.',
    estimateBasis: 'Recovering lattice secrets from approximate homomorphic ciphertexts.',
    attackProfiles: {
      bruteforce: { bits: 128 }
    }
  },
  {
    id: 'zk-snarks',
    name: 'zk-SNARKs',
    artifactType: 'Zero-knowledge proof system',
    categories: ['zero-knowledge'],
    summary: 'Succinct non-interactive proofs that let a prover show a statement is true without revealing the witness.',
    history:
      'zk-SNARKs grew from decades of zero-knowledge research and became especially visible through privacy-preserving cryptocurrencies and rollups.',
    protection:
      'They protect privacy by proving correct computation or knowledge of a secret without exposing the secret itself.',
    workflow: [
      'Compile the statement into an arithmetic circuit or constraint system.',
      'Generate proving and verification keys, often through a setup.',
      'Produce a short proof that the verifier can check quickly.'
    ],
    math: [
      'Modern SNARKs often rely on elliptic-curve pairings, polynomial commitments, and finite-field arithmetic.',
      'Security commonly tracks the strength of the curve and commitment assumptions, often around 128 bits.',
      'Pairing-based constructions inherit meaningful Shor exposure.'
    ],
    hackerDefense:
      'SNARKs deliver small proofs and fast verification, but trusted setup concerns and pairing-based quantum risk must be considered.',
    estimateBasis: 'Breaking the proof soundness assumptions or the curve-based commitment layer.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 3500, baseHours: 7 }
    }
  },
  {
    id: 'zk-starks',
    name: 'zk-STARKs',
    artifactType: 'Zero-knowledge proof system',
    categories: ['zero-knowledge'],
    summary: 'Transparent zero-knowledge proofs that avoid trusted setup and lean on hashes and coding theory.',
    history:
      'STARKs were developed to remove trusted setup from succinct proof systems while keeping scalability for large computations.',
    protection:
      'They protect privacy and integrity by giving transparent proofs that computations were performed correctly.',
    workflow: [
      'Represent computation as low-degree polynomial relationships.',
      'Commit to evaluation traces with hash-based structures.',
      'Use interactive oracle proof ideas with a Fiat-Shamir transform to obtain a non-interactive proof.'
    ],
    math: [
      'STARKs rely heavily on polynomial interpolation, Reed-Solomon style codes, and hash-based commitments.',
      'They are larger than SNARK proofs but offer transparency and stronger post-quantum positioning.',
      'Hash-based assumptions mean there is no direct Shor-style collapse.'
    ],
    hackerDefense:
      'STARKs are attractive for long-term quantum resilience, although proof sizes and prover cost remain heavier than many SNARK systems.',
    estimateBasis: 'Breaking the hash-based commitment and low-degree testing assumptions.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      grover: { bits: 64 }
    }
  },
  {
    id: 'bulletproofs',
    name: 'Bulletproofs',
    artifactType: 'Zero-knowledge range proof',
    categories: ['zero-knowledge'],
    summary: 'Short zero-knowledge proofs for range and arithmetic relations without a trusted setup.',
    history:
      'Bulletproofs were proposed in 2017 and quickly became popular for confidential transaction systems and compact range proofs.',
    protection:
      'They protect privacy by proving amounts or bounded values are valid without revealing the values themselves.',
    workflow: [
      'Commit to secret values with Pedersen commitments.',
      'Run an inner-product argument that compresses proof size logarithmically.',
      'Verify consistency of the commitments and range constraints.'
    ],
    math: [
      'Security rests on the binding properties of discrete-log based commitments and the soundness of the inner-product argument.',
      'Typical deployments inherit about 128-bit classical security from the curve choice.',
      'Large-scale Shor attacks would threaten the discrete-log layer.'
    ],
    hackerDefense:
      'Bulletproofs avoid trusted setup and keep proofs compact, but verification is heavier than a simple signature and quantum exposure remains.',
    estimateBasis: 'Breaking the discrete-log commitments that anchor the proof.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'ed25519',
    name: 'Ed25519',
    artifactType: 'Digital signature',
    categories: ['digital-signatures', 'authentication'],
    summary: 'A fast Edwards-curve signature scheme with deterministic signing and strong implementation ergonomics.',
    history:
      'Ed25519 was introduced in 2011 as part of the modern Curve25519 family and quickly became popular for SSH, package signing, and identity systems.',
    protection:
      'It protects authenticity and non-repudiation by allowing only the private key holder to produce a valid signature.',
    workflow: [
      'Hash the private seed into a signing scalar.',
      'Derive a nonce deterministically from the message and secret state.',
      'Produce and verify a signature through curve arithmetic and hash checks.'
    ],
    math: [
      'Security is based on the elliptic-curve discrete logarithm problem on Curve25519.',
      'Typical security level is about 128 classical bits.',
      'Shor would break the discrete-log assumption on a large enough quantum device.'
    ],
    hackerDefense:
      'Ed25519 is one of the best modern classical signature choices because it is fast, compact, and easier to implement safely than many older schemes.',
    estimateBasis: 'Recovering the elliptic-curve signing secret.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'ecdsa-p256',
    name: 'ECDSA P-256',
    artifactType: 'Digital signature',
    categories: ['digital-signatures', 'authentication'],
    summary: 'The widely deployed NIST elliptic-curve signature standard used in certificates, devices, and APIs.',
    history:
      'ECDSA became a standard elliptic-curve signature scheme for government and commercial deployments long before Ed25519 gained momentum.',
    protection:
      'It protects authenticity by proving that a signer knows the private scalar matching a published P-256 public key.',
    workflow: [
      'Hash the message.',
      'Generate a fresh per-signature nonce and compute a curve point.',
      'Combine the nonce, hash, and private scalar into the signature pair.'
    ],
    math: [
      'Security depends on the elliptic-curve discrete logarithm problem over the P-256 group.',
      'Correct nonce generation is critical because leaked or repeated nonces expose the private key.',
      'Quantum discrete-log attacks remain the main long-term threat.'
    ],
    hackerDefense:
      'ECDSA is still strong when implemented carefully, but nonce handling makes it easier to misuse than deterministic modern alternatives.',
    estimateBasis: 'Recovering the private scalar for the signing curve.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'tls-13',
    name: 'TLS 1.3',
    artifactType: 'Protocol suite',
    categories: ['secure-communication'],
    summary: 'The modern transport security standard that protects most of the web and many APIs.',
    history:
      'TLS evolved from SSL and reached a major simplification point in TLS 1.3, which removed many legacy options and tightened the default handshake.',
    protection:
      'It protects confidentiality, integrity, and endpoint authentication for network sessions between clients and servers.',
    workflow: [
      'Negotiate cipher suites and exchange ephemeral key material.',
      'Use HKDF to derive handshake and traffic secrets.',
      'Protect records with an AEAD such as AES-GCM or ChaCha20-Poly1305.'
    ],
    math: [
      'A common security baseline is about 128 bits when X25519 or P-256 is paired with a modern AEAD.',
      'The protocol combines asymmetric key exchange, signatures, HKDF, and symmetric record protection.',
      'Quantum risk often centers on the classical handshake algorithm rather than the AEAD layer.'
    ],
    hackerDefense:
      'TLS 1.3 is the strongest mainstream web transport protocol today, but certificate validation, configuration, and key exchange choices still matter.',
    estimateBasis: 'Compromise of the negotiated session secret in a standard classical TLS 1.3 deployment.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'ssh',
    name: 'SSH',
    artifactType: 'Protocol suite',
    categories: ['secure-communication', 'authentication'],
    summary: 'A secure remote access and tunneling protocol used for shells, file transfer, and infrastructure control.',
    history:
      'SSH replaced insecure remote login protocols and became a foundation for server administration and secure developer workflows.',
    protection:
      'It protects confidentiality and integrity of remote sessions while also authenticating servers and users.',
    workflow: [
      'Negotiate algorithms for key exchange, encryption, MAC, and host authentication.',
      'Derive session keys from the exchanged secret.',
      'Encrypt packets and verify their integrity throughout the session.'
    ],
    math: [
      'Modern deployments often use Curve25519 or similar 128-bit class key exchange choices.',
      'Authentication can rely on Ed25519, ECDSA, or RSA host keys.',
      'Quantum exposure again comes mostly from the public-key layer.'
    ],
    hackerDefense:
      'SSH is strong when modern algorithms are enforced, but old host keys, weak user credentials, or disabled verification can undermine it.',
    estimateBasis: 'Compromise of the SSH session secret or host-authentication primitive.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'ipsec',
    name: 'IPsec',
    artifactType: 'Protocol suite',
    categories: ['secure-communication'],
    summary: 'A network-layer suite for protecting IP packets in VPNs and site-to-site tunnels.',
    history:
      'IPsec emerged from the IETF as the standard way to secure IP traffic below the application layer, especially for enterprise VPNs.',
    protection:
      'It protects confidentiality, packet integrity, and peer authentication across networks.',
    workflow: [
      'Use IKE to authenticate peers and negotiate security associations.',
      'Derive traffic keys for AH or ESP processing.',
      'Encrypt or authenticate packets according to the negotiated transform.'
    ],
    math: [
      'Security depends on the chosen IKE key exchange, authentication, and ESP/AH algorithms.',
      'Modern suites are commonly modeled around 128-bit classical security.',
      'Quantum exposure comes from the classical public-key exchange and signature layer.'
    ],
    hackerDefense:
      'IPsec is powerful for VPNs and backbone links, but configuration complexity means operational mistakes are common attack targets.',
    estimateBasis: 'Compromise of the IKE-established traffic secrets in a classical deployment.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'diffie-hellman',
    name: 'Diffie-Hellman',
    artifactType: 'Key exchange',
    categories: ['key-exchange'],
    summary: 'The original public-key technique for deriving a shared secret over an open channel.',
    history:
      'Published in 1976, Diffie-Hellman launched practical public-key cryptography and transformed secure communications.',
    protection:
      'It protects confidentiality establishment by letting two parties derive the same secret without sending the secret itself.',
    workflow: [
      'Each party chooses a private exponent.',
      'Both publish group elements based on those exponents.',
      'Each side raises the received element to its own secret exponent to obtain a shared value.'
    ],
    math: [
      'Finite-field Diffie-Hellman security relies on the discrete logarithm problem.',
      'A 2048-bit group is often treated near 112-bit classical security.',
      'Shor completely changes the outlook once large fault-tolerant quantum systems exist.'
    ],
    hackerDefense:
      'Ephemeral Diffie-Hellman gives forward secrecy, but strong groups, authentication, and transcript binding are essential.',
    estimateBasis: 'Recovering the private exponent or shared secret from public exchange values.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  },
  {
    id: 'x25519',
    name: 'X25519',
    artifactType: 'Elliptic-curve key exchange',
    categories: ['key-exchange', 'e2ee', 'secure-communication'],
    summary: 'A modern elliptic-curve Diffie-Hellman function built for safer implementation and high performance.',
    history:
      'X25519 emerged from the Curve25519 design family and became a leading choice for TLS, SSH, WireGuard, and messaging systems.',
    protection:
      'It protects key establishment by deriving a shared secret from a private scalar and another party public point on Curve25519.',
    workflow: [
      'Clamp the private scalar and multiply by the base point to form a public key.',
      'Multiply the received public point by the private scalar.',
      'Feed the resulting shared point into a KDF for usable session keys.'
    ],
    math: [
      'Security relies on the elliptic-curve discrete logarithm problem.',
      'Typical deployments target about 128-bit classical security.',
      'Quantum discrete-log attacks remain the principal future concern.'
    ],
    hackerDefense:
      'X25519 is widely favored because it is fast, compact, and easier to implement safely than many earlier curve APIs.',
    estimateBasis: 'Recovering the shared Curve25519 secret.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'kerberos',
    name: 'Kerberos',
    artifactType: 'Authentication protocol',
    categories: ['authentication'],
    summary: 'A ticket-based network authentication system built around trusted third-party key distribution.',
    history:
      'Kerberos was developed at MIT to give network services mutual authentication without repeatedly sending passwords across the wire.',
    protection:
      'It protects identity and session establishment by issuing time-limited tickets encrypted under long-term service and user secrets.',
    workflow: [
      'Authenticate to the key distribution center and receive a ticket-granting ticket.',
      'Request service tickets for specific services.',
      'Present those tickets to services to establish authenticated sessions.'
    ],
    math: [
      'Kerberos inherits the strength of the symmetric algorithms and password protection around the ticket system.',
      'Modern deployments typically rely on AES-backed tickets around a 128-bit or higher security baseline.',
      'Offline password guessing becomes relevant when user secrets are weak.'
    ],
    hackerDefense:
      'Kerberos is strong in managed environments, but password hygiene, clock discipline, and key distribution center security are critical.',
    estimateBasis: 'Recovering the user or service secret that anchors ticket issuance.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      dictionary: { guessPenalty: 2e7, defaultEntropyBits: 34 }
    }
  },
  {
    id: 'srp',
    name: 'SRP',
    artifactType: 'Password-authenticated key exchange',
    categories: ['authentication'],
    summary: 'A protocol that lets a user authenticate with a password without sending the password itself to the server.',
    history:
      'Secure Remote Password was developed to resist stolen-verifier and eavesdropping attacks while still using memorable passwords.',
    protection:
      'It protects authentication by mixing password-derived values into a key exchange so the clear password never traverses the network.',
    workflow: [
      'Store a verifier derived from the password rather than the password itself.',
      'Exchange ephemeral values and compute a shared secret influenced by the password verifier.',
      'Authenticate the session by proving possession of the same derived secret.'
    ],
    math: [
      'SRP combines modular arithmetic and password-derived verifiers.',
      'Its online and offline resistance depends heavily on password entropy and server-side rate limiting.',
      'Classical finite-field variants remain exposed to Shor if very large quantum systems arrive.'
    ],
    hackerDefense:
      'SRP is much safer than sending passwords directly, but low-entropy user secrets still create dictionary-risk if the verifier database is compromised.',
    estimateBasis: 'Password guessing against the stored verifier or solving the discrete-log style exchange.',
    attackProfiles: {
      dictionary: { guessPenalty: 8e7, defaultEntropyBits: 34 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  },
  {
    id: 'webauthn',
    name: 'WebAuthn / FIDO2',
    artifactType: 'Authentication standard',
    categories: ['authentication'],
    summary: 'A phishing-resistant authentication framework based on public-key credentials stored on authenticators.',
    history:
      'WebAuthn emerged from the FIDO Alliance and W3C to replace passwords with device-bound or passkey-style public-key login.',
    protection:
      'It protects account access by binding authentication to a specific relying party and requiring possession of a device or passkey credential.',
    workflow: [
      'Register a credential pair on an authenticator.',
      'Send a domain-bound challenge from the relying party.',
      'Sign the challenge with the authenticator private key and verify it server-side.'
    ],
    math: [
      'Most deployments rely on Ed25519 or ECDSA style digital signatures.',
      'Security therefore tracks the underlying curve choice, device protection, and origin binding.',
      'Shor would matter only for the public-key signature layer.'
    ],
    hackerDefense:
      'WebAuthn is one of the best available defenses against phishing because the authenticator signs only for the correct origin.',
    estimateBasis: 'Forging the credential signature or extracting the authenticator secret.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'hmac-sha256',
    name: 'HMAC-SHA256',
    artifactType: 'MAC',
    categories: ['message-integrity', 'mac', 'key-management'],
    summary: 'A keyed integrity construction that wraps SHA-256 with inner and outer secret pads.',
    history:
      'HMAC was standardized in the 1990s and became the default keyed-hash construction across APIs, TLS, and many authentication protocols.',
    protection:
      'It protects message integrity and authenticity by ensuring only parties with the shared secret can produce a valid tag.',
    workflow: [
      'Pad the secret key to the hash block size.',
      'Hash the message with the inner pad.',
      'Hash the inner digest with the outer pad to produce the final tag.'
    ],
    math: [
      'Security reduces to the strength of the underlying hash and key management.',
      'A full 256-bit tag implies an enormous generic forgery cost.',
      'Grover search still only gives a square-root improvement.'
    ],
    hackerDefense:
      'HMAC-SHA256 is mature and trustworthy, but shared keys must be distributed safely and stored outside attacker reach.',
    estimateBasis: 'Tag forgery or recovery of the shared MAC key.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'poly1305',
    name: 'Poly1305',
    artifactType: 'MAC',
    categories: ['message-integrity', 'mac', 'e2ee'],
    summary: 'A one-time polynomial authenticator usually paired with ChaCha20 or another stream cipher.',
    history:
      'Poly1305 was introduced by Daniel J. Bernstein and became a staple in modern AEAD constructions such as ChaCha20-Poly1305.',
    protection:
      'It protects message integrity by generating a tag from polynomial evaluation modulo a carefully chosen prime-like value.',
    workflow: [
      'Derive or supply a one-time MAC key.',
      'Interpret message blocks as numbers and accumulate them polynomially.',
      'Reduce the accumulator and emit the final 128-bit tag.'
    ],
    math: [
      'Poly1305 operates modulo 2^130 - 5.',
      'Security requires that the Poly1305 key never be reused improperly.',
      'Generic forgery cost is aligned to the 128-bit tag space.'
    ],
    hackerDefense:
      'Poly1305 is extremely fast and strong when paired correctly, but key and nonce discipline are absolutely essential.',
    estimateBasis: 'Tag forgery against the 128-bit authenticator.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      grover: { bits: 64 }
    }
  },
  {
    id: 'gmac',
    name: 'GMAC',
    artifactType: 'MAC',
    categories: ['message-integrity', 'mac', 'secure-communication'],
    summary: 'The authentication-only form of the Galois/Counter Mode construction used with AES.',
    history:
      'GMAC emerged from GCM mode and is common wherever AES acceleration makes polynomial authentication attractive.',
    protection:
      'It protects integrity by combining a shared AES key with authentication data under a finite-field multiplication scheme.',
    workflow: [
      'Derive the hash subkey from AES.',
      'Accumulate blocks with Galois-field multiplication.',
      'Combine the field result with AES output to produce the tag.'
    ],
    math: [
      'GMAC operates in GF(2^128).',
      'Its generic forgery security tracks the tag length and nonce discipline.',
      'Nonce reuse can cause dramatic security failures.'
    ],
    hackerDefense:
      'GMAC is strong and hardware-friendly, but the implementation must treat nonces as a security boundary rather than a convenience.',
    estimateBasis: 'Generic tag forgery against a 128-bit authenticator.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      grover: { bits: 64 }
    }
  },
  {
    id: 'signal-double-ratchet',
    name: 'Signal Double Ratchet',
    artifactType: 'E2EE protocol',
    categories: ['e2ee'],
    summary: 'The key-update design used in Signal-style messaging to give forward secrecy and post-compromise healing.',
    history:
      'The Signal protocol popularized the double-ratchet design and set the benchmark for modern secure messaging.',
    protection:
      'It protects messages end to end by constantly deriving fresh keys so past and future messages remain protected even if one chain state is exposed.',
    workflow: [
      'Start from an authenticated shared secret established during setup.',
      'Advance symmetric-key chains for each message.',
      'Perform DH ratchets whenever a new public key is received to refresh the root key.'
    ],
    math: [
      'Security combines X25519 style key exchange with KDF chains and AEAD encryption.',
      'Session compromise is bounded because key material evolves after each step.',
      'Quantum exposure mainly comes from the classical curve-based handshake.'
    ],
    hackerDefense:
      'Signal-style ratchets are excellent for messaging because they limit damage from short-term key compromise and support asynchronous delivery.',
    estimateBasis: 'Breaking the current or root shared secret in a classical deployment.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'mls',
    name: 'Messaging Layer Security',
    artifactType: 'Group E2EE protocol',
    categories: ['e2ee'],
    summary: 'A modern standard for secure group messaging with efficient membership changes and tree-based key updates.',
    history:
      'MLS was created to bring Signal-like security properties to large groups with better scalability and standardization.',
    protection:
      'It protects group conversations end to end while supporting joins, leaves, and updates without re-encrypting everything from scratch.',
    workflow: [
      'Represent group state in a ratcheting tree.',
      'Update path secrets when members join, leave, or rotate keys.',
      'Derive fresh epoch secrets for application traffic.'
    ],
    math: [
      'MLS combines tree-based key schedules, HPKE-style public-key operations, and symmetric encryption.',
      'Classical security commonly maps to about 128 bits with modern curves and AEAD choices.',
      'Post-quantum MLS profiles can swap in safer KEMs over time.'
    ],
    hackerDefense:
      'MLS is strong for group chat because it reduces the operational pain of keeping group keys fresh as membership changes.',
    estimateBasis: 'Compromise of the tree secret used for the current epoch.',
    attackProfiles: {
      bruteforce: { bits: 128 },
      shor: { requiredQubits: 2500, baseHours: 5 }
    }
  },
  {
    id: 'hkdf',
    name: 'HKDF',
    artifactType: 'Key derivation function',
    categories: ['key-management'],
    summary: 'An extract-and-expand construction that turns shared secrets into clean session keys.',
    history:
      'HKDF was standardized to provide a simple, well-analyzed KDF built on HMAC, and it is now used across TLS, Signal, and many APIs.',
    protection:
      'It protects key management by separating noisy shared secrets into domain-separated output keys for different purposes.',
    workflow: [
      'Extract entropy from input keying material into a pseudorandom key.',
      'Expand that key into one or more application-specific outputs.',
      'Bind each output to context with labels or info strings.'
    ],
    math: [
      'Security comes from HMAC behaving as a pseudorandom function.',
      'The extract and expand stages prevent one output key from trivially leaking another.',
      'Generic attacks usually target the secret fed into HKDF rather than HKDF itself.'
    ],
    hackerDefense:
      'HKDF is a key management workhorse because it is simple, robust, and easy to domain-separate across protocol stages.',
    estimateBasis: 'Recovering the input secret that HKDF expands into derived keys.',
    attackProfiles: {
      bruteforce: { bits: 256 },
      grover: { bits: 128 }
    }
  },
  {
    id: 'pbkdf2',
    name: 'PBKDF2',
    artifactType: 'Password-based KDF',
    categories: ['key-management', 'password-hashing'],
    summary: 'A password-based key derivation function that slows guessing by iterating HMAC thousands of times.',
    history:
      'PBKDF2 became a long-standing standard for deriving keys from passwords and is still common in older file and application formats.',
    protection:
      'It protects password-derived keys by making each password guess cost repeated HMAC work.',
    workflow: [
      'Combine the password with a salt.',
      'Iterate the pseudorandom function many times for each output block.',
      'Concatenate blocks until the desired derived key length is reached.'
    ],
    math: [
      'Security still depends primarily on password entropy and iteration count.',
      'PBKDF2 is slower than plain hashes but easier for GPUs to parallelize than memory-hard schemes.',
      'The simulator models its resistance as slowed password guessing rather than huge key-search bits.'
    ],
    hackerDefense:
      'PBKDF2 is acceptable for compatibility, but Argon2id or scrypt usually offer better resistance to modern cracking hardware.',
    estimateBasis: 'Password guessing against a repeated-HMAC key derivation flow.',
    attackProfiles: {
      dictionary: { guessPenalty: 5e7, defaultEntropyBits: 34 }
    }
  },
  {
    id: 'shamir-secret-sharing',
    name: 'Shamir Secret Sharing',
    artifactType: 'Key splitting scheme',
    categories: ['key-management'],
    summary: 'A threshold scheme that splits a secret into shares so only enough shares together can reconstruct it.',
    history:
      'Adi Shamir introduced this scheme in 1979 to protect secrets operationally rather than through raw computational complexity alone.',
    protection:
      'It protects key management by removing any single point of failure and requiring a threshold of trusted parties to recover the secret.',
    workflow: [
      'Treat the secret as the intercept of a random polynomial.',
      'Hand out points on that polynomial as shares.',
      'Use Lagrange interpolation with at least t shares to recover the secret.'
    ],
    math: [
      'A degree t - 1 polynomial is uniquely determined by t points.',
      'Fewer than the threshold shares reveal no information in the idealized model.',
      'Practical security also depends on the entropy of the original secret and share handling.'
    ],
    hackerDefense:
      'Secret sharing is excellent for backups, multi-party custody, and disaster recovery, but it complements cryptography rather than replacing it.',
    estimateBasis: 'Recovering the protected secret without enough valid shares.',
    attackProfiles: {
      bruteforce: { bits: 128 }
    }
  },
  {
    id: 'openpgp',
    name: 'OpenPGP',
    artifactType: 'Email and file security standard',
    categories: ['email-security', 'e2ee'],
    summary: 'A standard for end-to-end email and file protection using hybrid public-key cryptography and signatures.',
    history:
      'OpenPGP grew from PGP and became a long-lived standard for encrypting email, files, and software releases.',
    protection:
      'It protects confidentiality with hybrid encryption and authenticity with digital signatures tied to user identities.',
    workflow: [
      'Encrypt a random session key with the recipient public key.',
      'Encrypt message data with a symmetric cipher under that session key.',
      'Optionally sign the message with the sender private key.'
    ],
    math: [
      'The security depends on the chosen public-key algorithm, symmetric cipher, and hash.',
      'Classical deployments often still involve RSA or ECC components.',
      'Quantum exposure is therefore driven by the public-key layer.'
    ],
    hackerDefense:
      'OpenPGP can deliver strong confidentiality, but key discovery, trust management, and user experience have historically limited adoption.',
    estimateBasis: 'Breaking the public-key envelope that transports the message session key.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  },
  {
    id: 'smime',
    name: 'S/MIME',
    artifactType: 'Email security standard',
    categories: ['email-security'],
    summary: 'A certificate-based email security framework widely used in enterprise and government mail systems.',
    history:
      'S/MIME was standardized to bring X.509-based encryption and signing into email clients and managed enterprise environments.',
    protection:
      'It protects email with hybrid encryption, signatures, and certificate-backed identity binding.',
    workflow: [
      'Encrypt a session key to the recipient certificate.',
      'Encrypt the message body with a symmetric cipher.',
      'Use sender certificates and signatures to verify origin and integrity.'
    ],
    math: [
      'Security follows the public-key and symmetric algorithms carried by the CMS container.',
      'RSA and ECC have historically been common choices.',
      'Quantum exposure again centers on the certificate public-key layer.'
    ],
    hackerDefense:
      'S/MIME fits managed environments well, but trust chain configuration and certificate lifecycle management must be handled carefully.',
    estimateBasis: 'Compromise of the certificate public-key protection used for the session key.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  },
  {
    id: 'dkim',
    name: 'DKIM',
    artifactType: 'Email authentication standard',
    categories: ['email-security', 'message-integrity'],
    summary: 'A domain-level signing system that helps receivers verify that mail was authorized by the sending domain.',
    history:
      'DomainKeys Identified Mail grew out of anti-spam efforts to attach cryptographic accountability to outgoing email streams.',
    protection:
      'It protects email integrity and sender-domain authenticity by attaching a signature that receivers can validate through DNS-published public keys.',
    workflow: [
      'Canonicalize selected headers and body content.',
      'Sign the canonicalized bytes with the domain private key.',
      'Publish the matching public key in DNS and verify it during receipt.'
    ],
    math: [
      'DKIM security depends on the signature algorithm and the integrity of DNS publication.',
      'RSA has historically dominated, though other signature options exist.',
      'Quantum exposure is mostly tied to the signature primitive.'
    ],
    hackerDefense:
      'DKIM is valuable for mail authenticity and anti-spoofing, but it does not encrypt content and must be paired with SPF, DMARC, and mailbox security.',
    estimateBasis: 'Forging the sending-domain signature without the private key.',
    attackProfiles: {
      bruteforce: { bits: 112 },
      shor: { requiredQubits: 4000, baseHours: 8 }
    }
  }
];

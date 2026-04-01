const { SECURITY_LEVELS } = require('../registry');

const HASH_DEFINITIONS = {
  md5: {
    id: 'md5',
    name: 'MD5',
    outputSize: 128,
    internalState: 128,
    type: 'Merkle-Damgård',
    rounds: 64,
    collisionResistance: 'BROKEN',
    preimageResistance: 'WEAK',
    standard: 'RFC 1321',
    notes: 'Cryptographically broken. Use for checksums only.'
  },
  sha1: {
    id: 'sha1',
    name: 'SHA-1',
    outputSize: 160,
    internalState: 160,
    type: 'Merkle-Damgård',
    rounds: 80,
    collisionResistance: 'BROKEN (SHAttered attack)',
    preimageResistance: 'STANDARD',
    standard: 'FIPS 180-4',
    notes: 'Collision attacks demonstrated. Deprecated for security.'
  },
  sha256: {
    id: 'sha256',
    name: 'SHA-256',
    outputSize: 256,
    internalState: 256,
    type: 'Merkle-Damgård',
    rounds: 64,
    collisionResistance: 'STRONG (2^128)',
    preimageResistance: 'STRONG (2^256)',
    standard: 'FIPS 180-4',
    notes: 'Current standard. Used in TLS, Bitcoin, digital signatures.'
  },
  sha384: {
    id: 'sha384',
    name: 'SHA-384',
    outputSize: 384,
    internalState: 1024,
    type: 'Merkle-Damgård',
    rounds: 80,
    collisionResistance: 'STRONG (2^192)',
    preimageResistance: 'STRONG (2^384)',
    standard: 'FIPS 180-4',
    notes: 'SHA-2 family. Higher security than SHA-256.'
  },
  sha512: {
    id: 'sha512',
    name: 'SHA-512',
    outputSize: 512,
    internalState: 1024,
    type: 'Merkle-Damgård',
    rounds: 80,
    collisionResistance: 'STRONG (2^256)',
    preimageResistance: 'STRONG (2^512)',
    standard: 'FIPS 180-4',
    notes: 'SHA-2 family. Fast on 64-bit systems.'
  },
  sha3_224: {
    id: 'sha3-224',
    name: 'SHA3-224',
    outputSize: 224,
    internalState: 1600,
    type: 'Sponge (Keccak)',
    rounds: 24,
    collisionResistance: 'STRONG (2^112)',
    preimageResistance: 'STRONG (2^224)',
    standard: 'FIPS 202',
    notes: 'SHA-3 family. Different structure from SHA-2.'
  },
  sha3_256: {
    id: 'sha3-256',
    name: 'SHA3-256',
    outputSize: 256,
    internalState: 1600,
    type: 'Sponge (Keccak)',
    rounds: 24,
    collisionResistance: 'STRONG (2^128)',
    preimageResistance: 'STRONG (2^256)',
    standard: 'FIPS 202',
    notes: 'SHA-3 family. Drop-in replacement for SHA-256.'
  },
  sha3_384: {
    id: 'sha3-384',
    name: 'SHA3-384',
    outputSize: 384,
    internalState: 1600,
    type: 'Sponge (Keccak)',
    rounds: 24,
    collisionResistance: 'STRONG (2^192)',
    preimageResistance: 'STRONG (2^384)',
    standard: 'FIPS 202',
    notes: 'SHA-3 family. Higher security variant.'
  },
  sha3_512: {
    id: 'sha3-512',
    name: 'SHA3-512',
    outputSize: 512,
    internalState: 1600,
    type: 'Sponge (Keccak)',
    rounds: 24,
    collisionResistance: 'STRONG (2^256)',
    preimageResistance: 'STRONG (2^512)',
    standard: 'FIPS 202',
    notes: 'SHA-3 family. Highest security SHA-3.'
  },
  blake2s: {
    id: 'blake2s',
    name: 'BLAKE2s',
    outputSize: 256,
    internalState: 256,
    type: 'HAIFA',
    rounds: 10,
    collisionResistance: 'STRONG (2^128)',
    preimageResistance: 'STRONG (2^256)',
    standard: 'RFC 7693',
    notes: 'Fast on 32-bit systems. Good for mobile.'
  },
  blake2b: {
    id: 'blake2b',
    name: 'BLAKE2b',
    outputSize: 512,
    internalState: 512,
    type: 'HAIFA',
    rounds: 12,
    collisionResistance: 'STRONG (2^256)',
    preimageResistance: 'STRONG (2^512)',
    standard: 'RFC 7693',
    notes: 'Fastest on 64-bit systems. Used in Zcash, Argon2.'
  },
  blake3: {
    id: 'blake3',
    name: 'BLAKE3',
    outputSize: 256,
    internalState: 256,
    type: 'Bao tree',
    rounds: 7,
    collisionResistance: 'STRONG (2^128)',
    preimageResistance: 'STRONG (2^256)',
    standard: 'blake3.net',
    notes: 'Very fast, parallelizable, MERKLE tree structure.'
  },
  keccak256: {
    id: 'keccak256',
    name: 'Keccak-256',
    outputSize: 256,
    internalState: 1600,
    type: 'Sponge',
    rounds: 24,
    collisionResistance: 'STRONG (2^128)',
    preimageResistance: 'STRONG (2^256)',
    standard: 'Pre-standardization Keccak',
    notes: 'Ethereum uses this variant (before SHA-3 finalization).'
  },
  tiger: {
    id: 'tiger',
    name: 'Tiger',
    outputSize: 192,
    internalState: 192,
    type: 'Merkle-Damgård',
    rounds: 24,
    collisionResistance: 'MODERATE',
    preimageResistance: 'STRONG (2^192)',
    standard: 'None (designed by Anderson)',
    notes: 'Fast 64-bit optimized hash. Less widely used.'
  },
  whirlpool: {
    id: 'whirlpool',
    name: 'Whirlpool',
    outputSize: 512,
    internalState: 512,
    type: 'Miyaguchi-Preneel',
    rounds: 10,
    collisionResistance: 'STRONG (2^256)',
    preimageResistance: 'STRONG (2^512)',
    standard: 'ISO/IEC 10118-3',
    notes: 'Widely standardized. Uses AES-like compression.'
  }
};

module.exports = {
  HASH_DEFINITIONS
};

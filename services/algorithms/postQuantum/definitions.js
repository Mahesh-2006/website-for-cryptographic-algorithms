const POST_QUANTUM_DEFINITIONS = {
  crystals_kyber_512: {
    id: 'crystals-kyber-512',
    name: 'CRYSTALS-Kyber-512',
    type: 'Key Encapsulation (KEM)',
    nistLevel: 1,
    securityEquivalent: 128,
    keySize: '800 bytes public, 1632 bytes private',
    standard: 'FIPS 203 (ML-KEM)',
    notes: 'NIST standardized 2024. Fast, small keys.'
  },
  crystals_kyber_768: {
    id: 'crystals-kyber-768',
    name: 'CRYSTALS-Kyber-768',
    type: 'Key Encapsulation (KEM)',
    nistLevel: 3,
    securityEquivalent: 192,
    keySize: '1184 bytes public, 2400 bytes private',
    standard: 'FIPS 203 (ML-KEM)',
    notes: '192-bit security Kyber variant.'
  },
  crystals_kyber_1024: {
    id: 'crystals-kyber-1024',
    name: 'CRYSTALS-Kyber-1024',
    type: 'Key Encapsulation (KEM)',
    nistLevel: 5,
    securityEquivalent: 256,
    keySize: '1568 bytes public, 3168 bytes private',
    standard: 'FIPS 203 (ML-KEM)',
    notes: '256-bit security Kyber variant.'
  },
  crystals_dilithium_2: {
    id: 'crystals-dilithium-2',
    name: 'CRYSTALS-Dilithium2',
    type: 'Digital Signature',
    nistLevel: 2,
    securityEquivalent: 128,
    keySize: '1312 bytes public, 2544 bytes private',
    signatureSize: 2420,
    standard: 'FIPS 204 (ML-DSA)',
    notes: 'NIST standardized 2024. Fast signing.'
  },
  crystals_dilithium_3: {
    id: 'crystals-dilithium-3',
    name: 'CRYSTALS-Dilithium3',
    type: 'Digital Signature',
    nistLevel: 3,
    securityEquivalent: 192,
    keySize: '1952 bytes public, 4000 bytes private',
    signatureSize: 3293,
    standard: 'FIPS 204 (ML-DSA)',
    notes: '192-bit security Dilithium variant.'
  },
  crystals_dilithium_5: {
    id: 'crystals-dilithium-5',
    name: 'CRYSTALS-Dilithium5',
    type: 'Digital Signature',
    nistLevel: 5,
    securityEquivalent: 256,
    keySize: '2590 bytes public, 4864 bytes private',
    signatureSize: 4595,
    standard: 'FIPS 204 (ML-DSA)',
    notes: '256-bit security Dilithium variant.'
  },
  sphincs_plus_128s: {
    id: 'sphincs-plus-128s',
    name: 'SPHINCS+-128s',
    type: 'Digital Signature (Stateless Hash-Based)',
    nistLevel: 1,
    securityEquivalent: 128,
    keySize: '32 bytes public, 64 bytes private',
    signatureSize: 7856,
    standard: 'FIPS 205 (SLH-DSA)',
    notes: 'Hash-based only. Conservative security.'
  },
  falcon_512: {
    id: 'falcon-512',
    name: 'Falcon-512',
    type: 'Digital Signature',
    nistLevel: 1,
    securityEquivalent: 128,
    keySize: '897 bytes public, 1281 bytes private',
    signatureSize: 666,
    standard: 'NIST PQC Round 4',
    notes: 'Short signatures. FFT required.'
  },
  classic_mceliece_460896: {
    id: 'classic-mceliece-460896',
    name: 'Classic McEliece',
    type: 'Key Encapsulation (KEM)',
    nistLevel: 5,
    securityEquivalent: 256,
    keySize: '1MB public, 13KB private',
    standard: 'NIST PQC Round 4',
    notes: 'Conservative security. Largest keys.'
  }
};

module.exports = {
  POST_QUANTUM_DEFINITIONS
};

const ASYMMETRIC_DEFINITIONS = {
  rsa_2048: {
    id: 'rsa-2048',
    name: 'RSA-2048',
    keySize: 2048,
    securityBasis: 'Integer Factorization',
    equivalentSymmetric: 112,
    standard: 'FIPS 186-4',
    notes: 'Most widely used asymmetric encryption.'
  },
  rsa_3072: {
    id: 'rsa-3072',
    name: 'RSA-3072',
    keySize: 3072,
    securityBasis: 'Integer Factorization',
    equivalentSymmetric: 128,
    standard: 'FIPS 186-4',
    notes: '128-bit equivalent security.'
  },
  rsa_4096: {
    id: 'rsa-4096',
    name: 'RSA-4096',
    keySize: 4096,
    securityBasis: 'Integer Factorization',
    equivalentSymmetric: 152,
    standard: 'FIPS 186-4',
    notes: 'Maximum security for RSA. Slower.'
  },
  rsa_oaep: {
    id: 'rsa-oaep',
    name: 'RSA-OAEP',
    keySize: '2048, 3072, 4096',
    securityBasis: 'Integer Factorization + OAEP padding',
    equivalentSymmetric: 'Varies with key size',
    standard: 'PKCS#1 v2.2, RFC 8017',
    notes: 'IND-CCA2 secure. Recommended RSA padding.'
  },
  elgamal: {
    id: 'elgamal',
    name: 'ElGamal',
    keySize: '2048+',
    securityBasis: 'Decisional Diffie-Hellman (DDH)',
    equivalentSymmetric: '~128',
    standard: 'None (de facto standard)',
    notes: 'Randomized encryption. Basis for ECIES.'
  },
  ecc_p256: {
    id: 'ecc-p256',
    name: 'ECC P-256',
    keySize: 256,
    securityBasis: 'Elliptic Curve Discrete Log',
    equivalentSymmetric: 128,
    standard: 'FIPS 186-5, SEC 2',
    notes: 'NIST curve. Most widely deployed ECC.'
  },
  ecc_p384: {
    id: 'ecc-p384',
    name: 'ECC P-384',
    keySize: 384,
    securityBasis: 'Elliptic Curve Discrete Log',
    equivalentSymmetric: 192,
    standard: 'FIPS 186-5, SEC 2',
    notes: 'Higher security than P-256.'
  },
  ecc_p521: {
    id: 'ecc-p521',
    name: 'ECC P-521',
    keySize: 521,
    securityBasis: 'Elliptic Curve Discrete Log',
    equivalentSymmetric: 256,
    standard: 'FIPS 186-5, SEC 2',
    notes: 'Maximum NIST ECC security.'
  },
  curve25519: {
    id: 'curve25519',
    name: 'Curve25519',
    keySize: 256,
    securityBasis: 'Montgomery curve DLP',
    equivalentSymmetric: 128,
    standard: 'RFC 7748',
    notes: 'Fast, timing-attack resistant. X25519 for key exchange.'
  },
  curve448: {
    id: 'curve448',
    name: 'Curve448',
    keySize: 448,
    securityBasis: 'Montgomery curve DLP',
    equivalentSymmetric: 224,
    standard: 'RFC 7748',
    notes: 'Higher security than Curve25519. X448 for key exchange.'
  }
};

module.exports = {
  ASYMMETRIC_DEFINITIONS
};

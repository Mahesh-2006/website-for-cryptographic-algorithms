const DIGITAL_SIGNATURE_DEFINITIONS = {
  rsassa_pkcs1_v15: {
    id: 'rsassa-pkcs1-v15',
    name: 'RSASSA-PKCS1-v1_5',
    keySize: '2048, 3072, 4096',
    securityBasis: 'RSA + PKCS#1 v1.5 padding',
    standard: 'RFC 3447, PKCS#1 v2.1',
    notes: 'Legacy padding. Less secure than PSS. Still widely used.'
  },
  rsassa_pss: {
    id: 'rsassa-pss',
    name: 'RSASSA-PSS',
    keySize: '2048, 3072, 4096',
    securityBasis: 'RSA + PSS padding',
    standard: 'RFC 3447, PKCS#1 v2.1',
    notes: 'Probabilistic signature. Recommended for RSA signatures.'
  },
  ecdsa_prime256v1: {
    id: 'ecdsa-prime256v1',
    name: 'ECDSA P-256',
    keySize: 256,
    securityBasis: 'ECDLP',
    equivalentSymmetric: 128,
    standard: 'FIPS 186-4, ANSI X9.62',
    notes: 'NIST curve. Used in Bitcoin, Ethereum.'
  },
  ecdsa_secp384r1: {
    id: 'ecdsa-secp384r1',
    name: 'ECDSA P-384',
    keySize: 384,
    securityBasis: 'ECDLP',
    equivalentSymmetric: 192,
    standard: 'FIPS 186-4, ANSI X9.62',
    notes: 'Higher security ECC. Government use.'
  },
  ecdsa_secp521r1: {
    id: 'ecdsa-secp521r1',
    name: 'ECDSA P-521',
    keySize: 521,
    securityBasis: 'ECDLP',
    equivalentSymmetric: 256,
    standard: 'FIPS 186-4',
    notes: 'Maximum ECC security.'
  },
  eddsa_ed25519: {
    id: 'eddsa-ed25519',
    name: 'EdDSA Ed25519',
    keySize: 256,
    securityBasis: 'Twisted Edwards curve DLP',
    equivalentSymmetric: 128,
    standard: 'RFC 8032',
    notes: 'Fast, deterministic, timing-attack resistant.'
  },
  eddsa_ed448: {
    id: 'eddsa-ed448',
    name: 'EdDSA Ed448',
    keySize: 448,
    securityBasis: 'Twisted Edwards curve DLP',
    equivalentSymmetric: 224,
    standard: 'RFC 8032',
    notes: 'Higher security EdDSA.'
  },
  dsa: {
    id: 'dsa',
    name: 'DSA',
    keySize: '1024, 2048, 3072',
    securityBasis: 'Discrete Log',
    standard: 'FIPS 186-4',
    notes: 'Deprecated. Use ECDSA or EdDSA instead.'
  }
};

module.exports = {
  DIGITAL_SIGNATURE_DEFINITIONS
};

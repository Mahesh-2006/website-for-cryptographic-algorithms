const KEY_EXCHANGE_DEFINITIONS = {
  dh_2048: {
    id: 'dh-2048',
    name: 'DH-2048',
    keySize: 2048,
    type: 'Finite Field DH',
    securityLevel: 112,
    standard: 'RFC 3526',
    notes: 'Classic DH. Security based on discrete log.'
  },
  dh_3072: {
    id: 'dh-3072',
    name: 'DH-3072',
    keySize: 3072,
    type: 'Finite Field DH',
    securityLevel: 128,
    standard: 'RFC 3526',
    notes: '128-bit security DH.'
  },
  dh_4096: {
    id: 'dh-4096',
    name: 'DH-4096',
    keySize: 4096,
    type: 'Finite Field DH',
    securityLevel: 152,
    standard: 'RFC 3526',
    notes: 'Higher security DH. Slower.'
  },
  ecdh_prime256v1: {
    id: 'ecdh-prime256v1',
    name: 'ECDH P-256',
    keySize: 256,
    type: 'Elliptic Curve DH',
    securityLevel: 128,
    standard: 'FIPS 186-4, NIST SP 800-56A',
    notes: 'Most common ECDH. TLS default.'
  },
  ecdh_secp384r1: {
    id: 'ecdh-secp384r1',
    name: 'ECDH P-384',
    keySize: 384,
    type: 'Elliptic Curve DH',
    securityLevel: 192,
    standard: 'FIPS 186-4, NIST SP 800-56A',
    notes: 'Higher security ECDH.'
  },
  x25519: {
    id: 'x25519',
    name: 'X25519',
    keySize: 256,
    type: 'Montgomery curve',
    securityLevel: 128,
    standard: 'RFC 7748',
    notes: 'Fast ECDH. Signal, WireGuard use this.'
  },
  x448: {
    id: 'x448',
    name: 'X448',
    keySize: 448,
    type: 'Montgomery curve',
    securityLevel: 224,
    standard: 'RFC 7748',
    notes: 'Extended security X25519.'
  }
};

module.exports = {
  KEY_EXCHANGE_DEFINITIONS
};

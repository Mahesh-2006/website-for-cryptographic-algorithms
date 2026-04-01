const { SECURITY_LEVELS } = require('../registry');

const MAC_DEFINITIONS = {
  hmac_sha256: {
    id: 'hmac-sha256',
    name: 'HMAC-SHA256',
    basedOn: 'SHA-256',
    outputSize: 256,
    keySize: 'Variable (recommended: 256+ bits)',
    type: 'HMAC',
    security: 'IND-CPA secure',
    standard: 'RFC 2104, FIPS 198-1',
    notes: 'Most commonly used HMAC variant.'
  },
  hmac_sha512: {
    id: 'hmac-sha512',
    name: 'HMAC-SHA512',
    basedOn: 'SHA-512',
    outputSize: 512,
    keySize: 'Variable (recommended: 256+ bits)',
    type: 'HMAC',
    security: 'IND-CPA secure',
    standard: 'RFC 2104, FIPS 198-1',
    notes: 'Higher security than HMAC-SHA256.'
  },
  cmac: {
    id: 'cmac',
    name: 'CMAC',
    basedOn: 'AES',
    outputSize: 128,
    keySize: 'AES key size (128, 192, 256)',
    type: 'CMAC (CBC-MAC variant)',
    security: 'IND-CPA secure',
    standard: 'NIST SP 800-38B, RFC 4493',
    notes: 'CBC-MAC with proper security. Block cipher based.'
  },
  poly1305: {
    id: 'poly1305',
    name: 'Poly1305',
    basedOn: 'Poly1305-AES',
    outputSize: 128,
    keySize: '256 bits (128 one-time key + 128 AES key)',
    type: 'Wegman-Carter',
    security: 'One-time authenticator',
    standard: 'RFC 7539',
    notes: 'Fast one-time MAC. Used with ChaCha20.'
  },
  gmac: {
    id: 'gmac',
    name: 'GMAC',
    basedOn: 'GHASH',
    outputSize: 128,
    keySize: 'AES key size',
    type: 'GMAC',
    security: 'IND-CPA secure',
    standard: 'NIST SP 800-38D',
    notes: 'Galois message authentication. Part of GCM.'
  },
  cbc_mac: {
    id: 'cbc-mac',
    name: 'CBC-MAC',
    basedOn: 'AES/DES',
    outputSize: 128,
    keySize: 'Block cipher key size',
    type: 'CBC-MAC',
    security: 'NOT SECURE alone (length extension attacks)',
    standard: 'ANSI X9.9',
    notes: 'Legacy. Use CMAC instead.'
  }
};

module.exports = {
  MAC_DEFINITIONS
};

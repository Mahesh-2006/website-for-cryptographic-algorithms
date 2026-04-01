const AUTHENTICATED_ENC_DEFINITIONS = {
  aes_gcm: {
    id: 'aes-gcm',
    name: 'AES-GCM',
    components: ['AES', 'GMAC'],
    outputSize: 'Ciphertext + 128-bit tag',
    ivSize: 96,
    type: 'Authenticated Encryption with Associated Data (AEAD)',
    standard: 'NIST SP 800-38D',
    notes: 'TLS 1.3 default. Fast parallel encryption.'
  },
  chacha20_poly1305: {
    id: 'chacha20-poly1305',
    name: 'ChaCha20-Poly1305',
    components: ['ChaCha20', 'Poly1305'],
    outputSize: 'Ciphertext + 128-bit tag',
    ivSize: 96,
    type: 'AEAD',
    standard: 'RFC 8439',
    notes: 'Mobile-friendly. TLS for low-end devices.'
  },
  aes_ccm: {
    id: 'aes-ccm',
    name: 'AES-CCM',
    components: ['AES-CTR', 'CMAC'],
    outputSize: 'Ciphertext + variable tag (64-128 bit)',
    ivSize: 'Variable (7-13 bytes)',
    type: 'AEAD',
    standard: 'NIST SP 800-38C, RFC 3610',
    notes: 'Used in WiFi (WPA2/3), Bluetooth.'
  },
  aes_eax: {
    id: 'aes-eax',
    name: 'AES-EAX',
    components: ['AES-CTR', 'OMAC'],
    outputSize: 'Ciphertext + 128-bit tag',
    ivSize: 'Variable',
    type: 'AEAD',
    standard: 'NIST SP 800-38F',
    notes: 'Two-pass AEAD. Good for disk encryption.'
  },
  aes_ocb: {
    id: 'aes-ocb',
    name: 'AES-OCB',
    components: ['AES', 'OCB'],
    outputSize: 'Ciphertext + 128-bit tag',
    ivSize: 96,
    type: 'AEAD',
    standard: 'RFC 7253',
    notes: 'One-pass AEAD. Patented (free for non-military).'
  },
  aes_gcm_siv: {
    id: 'aes-gcm-siv',
    name: 'AES-GCM-SIV',
    components: ['AES', 'POLYVAL'],
    outputSize: 'Ciphertext + 128-bit tag',
    ivSize: 96,
    type: 'AEAD (nonce-misuse resistant)',
    standard: 'RFC 8452',
    notes: 'Nonce-misuse resistant. Slower than GCM.'
  }
};

module.exports = {
  AUTHENTICATED_ENC_DEFINITIONS
};
